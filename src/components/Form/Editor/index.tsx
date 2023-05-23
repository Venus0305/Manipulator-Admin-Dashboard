import './styles.css';

import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';
import { MyImage } from './extensions/image';
import Toolbar from './Toolbar';

export interface EditorProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  helperText?: string;
}

const EditorInput = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  helperText,
}: EditorProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      MyImage,
      Link,
    ],
    content: field.value || '',
    onUpdate: ({ editor: editorState }) => {
      field.onChange(editorState.getHTML());
    },
    onBlur: () => field.onBlur(),
  });

  if (!editor) {
    return null;
  }

  return (
    <Form.Item
      className={className}
      colon={false}
      help={<HelperText error={error?.message} helperText={helperText} value={field.value} />}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <div
        className={`border border-solid p-2 rounded-lg ${
          error ? 'border-[#db5a42]' : 'border-[#666]'
        }`}
      >
        <Toolbar editor={editor} />
        <EditorContent className="editor-content" editor={editor} />
      </div>
    </Form.Item>
  );
};

export default EditorInput;
