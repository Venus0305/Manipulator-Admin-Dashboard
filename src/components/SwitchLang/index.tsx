import { SwapOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useGlobalState from 'hooks/useGlobalState';
import i18n from 'i18n';

const LANGUAGE_TEXT = {
  jp: 'English',
  en: '日本語',
};
const LngDropdown = () => {
  const { lng, setLng } = useGlobalState();
  return (
    <Button
      icon={<SwapOutlined />}
      onClick={() => {
        const switchedLanguage = lng === 'en' ? 'jp' : 'en';
        setLng(switchedLanguage);
        i18n.changeLanguage(switchedLanguage);
      }}
      type="primary"
    >
      {LANGUAGE_TEXT[lng as keyof typeof LANGUAGE_TEXT]}
    </Button>
  );
};

export default LngDropdown;
