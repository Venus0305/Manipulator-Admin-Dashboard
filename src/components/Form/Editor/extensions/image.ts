import { Image } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/react';

export const MyImage = Image.extend({
  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    return [
      'div',
      { style },
      ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },
});
