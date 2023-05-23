import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import SelectInput from 'components/Form/SelectInput';
import TextInput from 'components/Form/TextInput';
import { useMutate } from 'hooks';
import useList from 'hooks/useList';
import operatorQuery from 'models/operator';
import type { IRole } from 'models/operator/types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import type { OperatorInputFields } from './schema';
import schema from './schema';

const OperatorForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { list: rolesInfo } = useList<IRole>(operatorQuery.roles);

  const defaultValues: OperatorInputFields = {
    editMode: true,
    email: '',
    role: '',
  };

  const { control, handleSubmit, getValues, setValue } = useForm<OperatorInputFields>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  const { mutateAsync: createOperator, isLoading: isCreating } = useMutate(operatorQuery.create);

  const roleOptions = useMemo(() => {
    if (rolesInfo) {
      return rolesInfo.map((item) => ({
        _id: item.id,
        name: item.name,
      }));
    }

    return [];
  }, [rolesInfo]);

  useEffect(() => {
    if (!getValues('role')) {
      setValue('role', rolesInfo[0]?.id || '');
    }
  }, [rolesInfo]);

  const onSubmit = (values: OperatorInputFields) => {
    const { email, role } = values;

    const operatorInfo = {
      email,
      roleIds: [role],
    };

    createOperator(
      { ...operatorInfo },
      {
        onSuccess: () => {
          navigate('/operator');
        },
        onError: (e) => {
          console.log(e);
        },
      },
    );
  };

  return (
    <Form
      className=" bg-white w-full rounded p-6"
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          control={control}
          label={t('operator:email')}
          name="email"
          required
          className="max-w-[450px]"
        />

        <SelectInput
          control={control}
          label={t('operator:role')}
          name="role"
          data={roleOptions}
          required
          className="max-w-[450px]"
        />
      </div>
      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-xs  "
          htmlType="submit"
          loading={isCreating}
          size="large"
          type="primary"
        >
          {t('global:create')}
        </Button>
      </div>
    </Form>
  );
};

export default OperatorForm;
