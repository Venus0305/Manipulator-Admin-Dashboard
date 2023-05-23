import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import CheckBoxGroup from 'components/Form/CheckBox';
import SelectInput from 'components/Form/SelectInput';
import TextAreaInput from 'components/Form/TextAreaInput';
import TextInput from 'components/Form/TextInput';
import UploadField from 'components/Form/UploadInput';
import type { SalonEditContextType } from 'containers/SalonPage/Edit';
import { useFetch, useMutate } from 'hooks';
import commonQuery from 'models/common';
import type { IFeature, IPrefecture } from 'models/common/types';
import salonQuery from 'models/salon';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import api from 'utils/api';

import type { SalonProfileSalonInfoInputFields } from './schema';
import schema from './schema';

type OptionType = { _id: string; name: string };

export type ISalonInfoRequestParamType = {
  photos: { name: string; status: string; uid: string; url: string }[];
  description: string;
  postalCode: string;
  addresses: {
    prefectureId: number;
    prefectureName: string;
    city: string;
    stationIds: number[];
    areaId: number;
    address: string;
    stations: { id: number; name: string }[];
  }[];
  access: string[];
  features: { id: number; name: string }[];
};

const SalonProfileSalonForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isFetching, data } = useOutletContext<SalonEditContextType>();

  const defaultPhotos = useMemo(() => {
    return data.photos.map((photo, index) => {
      return {
        uid: photo.uid ?? `${photo.url}-${index}`,
        url: photo.url,
        name: photo.name ?? photo.url,
        objectKey: photo.uid ?? photo.url,
        status: 'done',
      };
    });
  }, [data]);

  const defaultValues: SalonProfileSalonInfoInputFields = {
    editMode: true,
    postalCode: data.postalCode,
    prefecture: data.addresses[0]?.prefectureId || 0,
    city: data.addresses[0]?.areaId || 0,
    address: data.addresses[0]?.address || '',
    access: data.access[0] || '',
    features: data.features.map((item) => Number(item.id)),
    description: data.description,
    photos: [...defaultPhotos],
  };

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty },
  } = useForm<SalonProfileSalonInfoInputFields>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  const { mutateAsync: updateSalon, isLoading: isUpdating } = useMutate(salonQuery.update(id));
  const { data: featuresInfo } = useFetch<{ result: IFeature[] }>(commonQuery.features);
  const { data: prefecturesInfo } = useFetch<{ result: IPrefecture[] }>(commonQuery.prefectures);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);

  const fetchCities = async () => {
    try {
      const { result }: { result: { _id: string; name: string }[] } = (
        await api.get(`/salon/common-data/prefectures/${getValues('prefecture')}/areas`)
      ).data;

      if (result.length > 0) {
        setCityOptions(result.map((item) => ({ _id: item._id, name: item.name })));

        const currentBranchId = getValues('city');
        if (result[0] && result.findIndex((item) => item._id === `${currentBranchId}`) === -1) {
          const { _id: defaultBranchId } = result[0];
          setValue('city', Number(defaultBranchId));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const prefectureOptions = useMemo(() => {
    if (prefecturesInfo) {
      return prefecturesInfo.result.map((item) => ({
        _id: item.provinceId,
        name: item.provinceName,
      }));
    }
    return [];
  }, [prefecturesInfo]);

  const featureOptions = useMemo(() => {
    if (featuresInfo) {
      return featuresInfo.result.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    }
    return [];
  }, [featuresInfo]);

  const onSubmit = (values: SalonProfileSalonInfoInputFields) => {
    if (isDirty) {
      const addresses = [
        {
          ...data.addresses[0],
          address: values.address,
          areaId: values.city,
          city: cityOptions.find((item) => Number(item._id) === values.city)?.name,
          prefectureId: values.prefecture,
          prefectureName: prefectureOptions.find((item) => item._id === values.prefecture)?.name,
        },
      ];

      const access = [values.access];
      const features: { id: number; name: string }[] = [];

      featuresInfo?.result.forEach((item) => {
        if (values.features?.includes(item._id)) {
          features.push({ id: item._id, name: item.name });
        }
      });

      const { postalCode, description } = values;

      const photos = values.photos?.map((item) => ({
        ...item,
        type: 'defalut',
      }));

      updateSalon(
        { postalCode, addresses, access, description, features, photos },
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
    fetchCities();
  }, []);

  return (
    <Form
      className=" bg-white w-full rounded p-6"
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col">
          <TextInput
            control={control}
            label={t('salon:salonInfo:zipcode')}
            name="postalCode"
            required
            className="max-w-[450px]"
          />
          <SelectInput
            className="max-w-[450px]"
            control={control}
            data={prefectureOptions}
            onChange={fetchCities}
            label={t('salon:salonInfo:prefecture')}
            name="prefecture"
            required
          />
          <SelectInput
            className="max-w-[450px]"
            control={control}
            data={cityOptions}
            label={t('salon:salonInfo:city')}
            name="city"
            required
          />
          <TextInput
            control={control}
            label={t('salon:salonInfo:address')}
            name="address"
            required
            className="max-w-[450px]"
          />
          <TextInput
            control={control}
            label={t('salon:salonInfo:access')}
            name="access"
            required
            className="max-w-[450px]"
          />
        </div>
        <div className="flex flex-col">
          <TextAreaInput
            control={control}
            label={t('salon:salonInfo:about')}
            name="description"
            rows={3}
            className="max-w-[450px]"
          />
          <CheckBoxGroup
            control={control}
            label={t('salon:salonInfo:attribute')}
            name="features"
            data={featureOptions}
            className="max-w-[450px]"
          />
          <UploadField
            accept="image/*"
            control={control}
            imageOnly
            label={t('salon:salonInfo:photo')}
            maxCount={1}
            name="photos"
          />
        </div>
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

export default SalonProfileSalonForm;
