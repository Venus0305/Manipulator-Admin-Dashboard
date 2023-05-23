import { PlusOutlined } from '@ant-design/icons';
import type { FormItemProps, UploadProps } from 'antd';
import { Form, message, Modal, Progress, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload';
import axios from 'axios';
import { useMutate } from 'hooks';
import sharingQuery from 'models/sharing';
import { useEffect, useRef, useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export interface UploadFieldProps<TFormValues extends FieldValues> extends UploadProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  imageOnly?: boolean;
  isDragger?: boolean;
  limitSize?: number;
  fileNameLimit?: number;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadField = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  imageOnly,
  limitSize,
  fileNameLimit,
  ...props
}: UploadFieldProps<TFormValues>) => {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const { mutateAsync: generateSignedObj } = useMutate<
    {
      signedUrls: {
        fileName: string;
        contentType: string;
        isPublic: boolean;
        group: string;
      }[];
    },
    { result: { key: string; url: string }[] }
  >(sharingQuery.generateSignedObj);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleBeforeUpload = (file: File) => {
    if (imageOnly) {
      const isImageFile = file.type.startsWith('image/');
      if (!isImageFile) {
        message.error('You can only upload Image file!');
        return false || Upload.LIST_IGNORE;
      }
      const isLimitSize = file.size / 1024 / 1024 < 5;
      if (!isLimitSize) {
        message.error('Image must smaller than 5MB!');
        return false || Upload.LIST_IGNORE;
      }
      return true;
    }
    if (fileNameLimit && file.name.length > fileNameLimit) {
      message.error(`Please change the file name less than ${fileNameLimit} chars`);
      return false || Upload.LIST_IGNORE;
    }
    if (limitSize) {
      const isLimitSize = file.size / 1024 / 1024 < limitSize;
      if (!isLimitSize) {
        message.error(`File must smaller than ${limitSize}MB!`);
        return false || Upload.LIST_IGNORE;
      }
    }
    return true;
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    let previeUrl = file.url;
    if (!file.url && !file.preview) {
      previeUrl = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (previeUrl as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const customRequest = ({ file }: { file: string | Blob | RcFile }) => {
    if (file instanceof File) {
      generateSignedObj(
        {
          signedUrls: [
            { fileName: file.name, contentType: file.type, isPublic: true, group: 'salon' },
          ],
        },
        {
          onSuccess: async (data) => {
            if (data.result) {
              const imgUrl = data.result[0]?.url || '';
              const imageKey = data.result[0]?.key || '';
              const urlObj = new URL(imgUrl);
              const url = `${urlObj.origin}${urlObj.pathname}`;
              await axios.put(imgUrl, file, {
                headers: {
                  'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                  if (progressEvent.total) {
                    const percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total,
                    );
                    setProgress(percentCompleted);
                    if (percentCompleted === 100) {
                      timeoutRef.current = window.setTimeout(() => setProgress(0), 1000);
                    }
                  }
                },
              });
              field.onChange([
                ...field.value,
                {
                  uid: imageKey,
                  url,
                  contentType: file.type,
                  name: file.name,
                  status: 'done',
                  objectKey: imageKey,
                },
              ]);
            }
          },
        },
      );
    }
  };

  return (
    <Form.Item
      className={className}
      colon={false}
      help={error?.message}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <Upload
        beforeUpload={handleBeforeUpload}
        customRequest={customRequest}
        onPreview={handlePreview}
        fileList={field.value}
        listType="picture-card"
        disabled={!!progress}
        maxCount={10}
        onRemove={(file) =>
          field.onChange(
            ((field.value as UploadFile<any>[]) || []).filter((i) => i.uid !== file.uid),
          )
        }
        {...props}
      >
        {!progress ? (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        ) : (
          <div>
            <div style={{ marginTop: 8 }}>Uploading</div>
            <Progress percent={progress} />
          </div>
        )}
      </Upload>

      <Modal
        open={previewOpen}
        width={1024}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Form.Item>
  );
};

export default UploadField;
