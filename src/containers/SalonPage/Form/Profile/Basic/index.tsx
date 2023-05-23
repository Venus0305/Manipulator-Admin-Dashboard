import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import TextInput from 'components/Form/TextInput';
import type { SalonEditContextType } from 'containers/SalonPage/Edit';
import { useMutate } from 'hooks';
import salonQuery from 'models/salon';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import type { SalonProfileBasicInfoInputFields } from './schema';
import schema from './schema';

const SalonProfileBasicForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isFetching, data } = useOutletContext<SalonEditContextType>();
  const { id } = useParams();

  const defaultValues: SalonProfileBasicInfoInputFields = {
    editMode: true,
    name: data.name,
    nameKana: data.nameKana,
    email: data.email,
    phone: Number(data.phone),
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SalonProfileBasicInfoInputFields>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  const { mutateAsync: updateSalon, isLoading: isUpdating } = useMutate(salonQuery.update(id));

  const onSubmit = (values: SalonProfileBasicInfoInputFields, isDirty: boolean) => {
    if (isDirty) {
      updateSalon(
        { ...values, phone: `${values.phone}` },
        {
          onSuccess: () => {
            navigate(-1);
          },
          onError: (e) => {
            console.log(e);
          },
        },
      );
    } else {
      navigate(-1);
    }
  };

  return (
    <Form
      className=" bg-white w-full rounded p-6"
      layout="vertical"
      onFinish={handleSubmit((d) => onSubmit(d, isDirty))}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          control={control}
          label={t('salon:name')}
          name="name"
          required
          className="max-w-[450px]"
        />
        <TextInput
          control={control}
          label={t('salon:nameKana')}
          name="nameKana"
          required
          className="max-w-[450px]"
        />
        <TextInput
          control={control}
          label={t('salon:email')}
          name="email"
          required
          className="max-w-[450px]"
        />
        <TextInput
          control={control}
          label={t('salon:phone')}
          name="phone"
          required
          className="max-w-[450px]"
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-xs  "
          htmlType="submit"
          loading={isFetching || isUpdating}
          size="large"
          type="primary"
        >
          {t('global:update')}
        </Button>
      </div>
    </Form>
  );
};

export default SalonProfileBasicForm;
