import { Typography } from 'antd';
import { t } from 'i18n';
import { useState } from 'react';

const { Paragraph } = Typography;

const TextShowMore = ({ content }: { content: string }) => {
  const [expand, setExpand] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div key={counter} style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
        <Paragraph
          className="[&.ant-typography-ellipsis]:mb-0"
          ellipsis={{
            rows: 5,
            expandable: true,
            symbol: t('global:more'),
            onExpand: () => {
              setExpand(true);
              setCounter(!expand ? counter + 0 : counter + 1);
            },
          }}
        >
          {content}
        </Paragraph>
      </div>
      {expand && (
        <a
          onClick={() => {
            setExpand(false);
            setCounter(!expand ? counter + 0 : counter + 1);
          }}
        >
          {t('global:less')}
        </a>
      )}
    </>
  );
};
export default TextShowMore;
