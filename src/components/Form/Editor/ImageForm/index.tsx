import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import TextInput from 'components/Form/TextInput';
import UploadField from 'components/Form/UploadInput';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { ImageFormTypes } from './schema';
import schema from './schema';

const ImageForm = ({ onSubmit }: { onSubmit: SubmitHandler<ImageFormTypes> }) => {
  const { control, handleSubmit } = useForm<ImageFormTypes>({
    resolver: yupResolver(schema),
  });
  return (
    <Form id="select-image-form" layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <UploadField
        accept="image/*"
        control={control}
        imageOnly
        label="URL"
        maxCount={1}
        name="url"
        required
      />
      <TextInput control={control} label="ALT" name="alt" />
    </Form>
  );
};

export default ImageForm;
