import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import RadioField from 'components/Form/Radio';
import SelectInput from 'components/Form/SelectInput';
import TextInput from 'components/Form/TextInput';
import type { SalonEditContextType } from 'containers/SalonPage/Edit';
import { useFetch, useMutate } from 'hooks';
import commonQuery from 'models/common';
import type { IBank } from 'models/common/types';
import salonQuery from 'models/salon';
import type { IBankInfo } from 'models/salon/types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import api from 'utils/api';

import type { SalonProfileBankInfoInputFields } from './schema';
import schema from './schema';

type OptionType = { _id: string; name: string };

const SalonProfileBankForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFetching, data } = useOutletContext<SalonEditContextType>();
  const { id } = useParams();
  const { bankId, branchId, transferType, accountName, accountNumber } = data.bankInfo;
  const { data: banksInfo } = useFetch<{ result: IBank[] }>(commonQuery.banks);
  const [branchOptions, setBrahchOptions] = useState<OptionType[]>([]);

  const defaultValues: SalonProfileBankInfoInputFields = {
    editMode: true,
    bankName: bankId,
    branchName: branchId,
    transferType,
    accountName,
    accountNumber,
  };

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty },
  } = useForm<SalonProfileBankInfoInputFields>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  const { mutateAsync: updateSalon, isLoading: isUpdating } = useMutate<{ bankInfo: IBankInfo }>(
    salonQuery.update(id),
  );

  const bankOptions = useMemo(() => {
    if (banksInfo) {
      return banksInfo.result.map((item) => ({
        _id: item._id,
        name: item.bankName,
      }));
    }
    return [];
  }, [banksInfo]);

  const fetchBranches = async () => {
    try {
      const { result }: { result: { _id: string; branchName: string }[] } = (
        await api.get(`/salon/common-data/banks/${getValues('bankName')}/branches`)
      ).data;

      if (result.length > 0) {
        setBrahchOptions(result.map((item) => ({ _id: item._id, name: item.branchName })));

        const currentBranchId = getValues('branchName');
        if (result[0] && result.findIndex((item) => item._id === currentBranchId) === -1) {
          const { _id: defaultBranchId } = result[0];
          setValue('branchName', defaultBranchId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (values: SalonProfileBankInfoInputFields, isDirty: boolean) => {
    if (isDirty) {
      const {
        bankName: bankId,
        branchName: branchId,
        transferType,
        accountNumber,
        accountName,
      } = values;

      const bankName = bankOptions.find((item) => item._id === bankId)?.name || '';
      const branchName = branchOptions.find((item) => item._id === branchId)?.name || '';

      const bankInfo: IBankInfo = {
        ...data.bankInfo,
        bankId,
        branchId,
        bankName,
        branchName,
        transferType,
        accountName,
        accountNumber,
      };

      updateSalon(
        { bankInfo },
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

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <Form
      className=" bg-white w-full rounded p-6"
      layout="vertical"
      onFinish={handleSubmit((d) => onSubmit(d, isDirty))}
    >
      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          control={control}
          label={t('salon:bankInfo:bankName')}
          name="bankName"
          data={bankOptions}
          onChange={fetchBranches}
          required
          className="max-w-[450px]"
        />
        <TextInput
          control={control}
          label={t('salon:bankInfo:accountNumber')}
          name="accountNumber"
          required
          className="max-w-[450px]"
        />
        <SelectInput
          control={control}
          label={t('salon:bankInfo:branchName')}
          name="branchName"
          data={branchOptions}
          required
          className="max-w-[450px]"
        />
        <TextInput
          control={control}
          label={t('salon:bankInfo:name')}
          name="accountName"
          required
          className="max-w-[450px]"
        />
        <RadioField
          control={control}
          label={t('salon:bankInfo:type')}
          name="transferType"
          required
          data={[
            { _id: 0, name: 'Saving' },
            { _id: 1, name: 'Current' },
          ]}
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

export default SalonProfileBankForm;
