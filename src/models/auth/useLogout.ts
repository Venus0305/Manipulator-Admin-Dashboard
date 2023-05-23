import { Modal } from 'antd';
import { useAuth } from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import queryClient from 'utils/queryClient';

const useLogout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modal, context] = Modal.useModal();
  const { logout: AuthLogout } = useAuth();

  const logout = () => {
    try {
      AuthLogout();
    } finally {
      queryClient
        .getQueryCache()
        .findAll(['currentUser'])
        .forEach((query) => query.reset());
      navigate('/', { replace: true });
    }
  };

  const showConfirmLogout = () => {
    modal.confirm({
      title: t('confirmation:logout.title'),
      onOk: logout,
      content: t('confirmation:logout.message'),
    });
  };
  return { logout: showConfirmLogout, context };
};

export default useLogout;
