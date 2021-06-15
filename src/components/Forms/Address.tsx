/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { AddressType } from '../../types/Address';
import Input from '../Input';
import Button from '../Button';
import { textValidation, TEXT_PATTERNS } from '../../utils/validations';
import { createAddress } from '../../api';

type AddressFormProps = {
  cancel: any,
  onSuccess: Function,
  address?: AddressType,
}

type AddressFormErrors = {
  name: string | null | undefined,
  address: string | null | undefined,
  country: string | null | undefined,
  suburb: string | null | undefined,
  state: string | null | undefined,
  // eslint-disable-next-line camelcase
  postal_code: string | null | undefined,
  city: string | null | undefined,
}

export default function AddressForm({
  cancel,
  onSuccess,
  address,
}: AddressFormProps) {
  const { t } = useTranslation(['common']);
  const [state, setState] = useState(address || {
    name: '',
    address: '',
    country: '',
    state: '',
    suburb: '',
    postal_code: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddressFormErrors>({
    name: null,
    address: null,
    country: null,
    suburb: null,
    state: null,
    // eslint-disable-next-line camelcase
    postal_code: null,
    city: null,
  });

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [target.name]: target.value });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      name: textValidation(state.name, {
        required: true,
        minLength: 1,
        maxLength: 30,
      }, {
        required: t('name_required_error'),
        minLength: t('name_min_length_error'),
        maxLength: t('name_max_length_error'),
      }),
      address: textValidation(state.address, {
        required: true,
        minLength: 1,
        maxLength: 100,
      }, {
        required: t('address_required_error'),
        minLength: t('address_min_length_error'),
        maxLength: t('address_max_length_error'),
      }),
      country: textValidation(state.country, {
        required: true,
        minLength: 1,
        maxLength: 30,
      }, {
        required: t('country_required_error'),
        minLength: t('country_min_length_error'),
        maxLength: t('country_max_length_error'),
      }),
      suburb: textValidation(state.suburb, {
        required: false,
        minLength: 1,
        maxLength: 30,
      }, {
        minLength: t('suburb_min_length_error'),
        maxLength: t('suburb_max_length_error'),
      }),
      state: textValidation(state.state, {
        required: true,
        minLength: 1,
        maxLength: 30,
      }, {
        required: t('state_required_error'),
        minLength: t('state_min_length_error'),
        maxLength: t('state_max_length_error'),
      }),
      city: textValidation(state.city, {
        required: true,
        minLength: 1,
        maxLength: 30,
      }, {
        required: t('city_required_error'),
        minLength: t('city_min_length_error'),
        maxLength: t('city_max_length_error'),
      }),
      postal_code: textValidation(state.postal_code, {
        required: true,
        minLength: 1,
        maxLength: 30,
        pattern: TEXT_PATTERNS.ONLY_NUMBERS_PATTERN,
      }, {
        required: t('postal_code_required_error'),
        minLength: t('postal_code_min_length_error'),
        maxLength: t('postal_code_max_length_error'),
        pattern: t('postal_code_pattern_error'),
      }),
    };

    setErrors(newErrors);

    const error = Object.values(newErrors).filter((newError) => newError !== null).length !== 0;

    if (!error) {
      setLoading(true);
      createAddress(state)
        .then((res) => {
          if (res.ok) {
            onSuccess();
            cancel();
          }
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="name"
        label={t('name')}
        placeholder={t('address_name_placeholder')}
        onChange={onChange}
        value={state.name}
        autoComplete="address-line1"
        required
        error={errors.name}
        disabled={loading}
      />
      <Input
        name="address"
        label={t('address')}
        placeholder={t('address_placeholder')}
        onChange={onChange}
        value={state.address}
        autoComplete="address-line1"
        required
        error={errors.address}
        disabled={loading}
      />
      <Input
        name="suburb"
        label={t('suburb')}
        placeholder={t('suburb_placeholder')}
        onChange={onChange}
        value={state.suburb || ''}
        autoComplete="address-line1"
        error={errors.suburb}
        disabled={loading}
      />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <Input
            label={t('city')}
            name="city"
            onChange={onChange}
            placeholder={t('city_placeholder')}
            value={state.city}
            error={errors.city}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Input
            label={t('postal_code')}
            name="postal_code"
            onChange={onChange}
            placeholder={t('postal_code_placeholder')}
            value={state.postal_code}
            autoComplete="postal-code"
            error={errors.postal_code}
            required
            disabled={loading}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-3">
        <Input
          label={t('state')}
          name="state"
          onChange={onChange}
          placeholder={t('state_placeholder')}
          value={state.state}
          error={errors.state}
          required
          disabled={loading}
        />
        <Input
          label={t('country')}
          name="country"
          onChange={onChange}
          placeholder={t('country_placeholder')}
          value={state.country}
          error={errors.country}
          required
          disabled={loading}
        />
      </div>
      <Button label={t('add_address')} submit loading={loading} />
      <div className="flex justify-center mt-2 mb-1">
        <p
          className="text-sm text-gray-800 cursor-pointer hover:text-black"
          onClick={() => {
            if (!loading) {
              cancel();
            }
          }}
        >
          {t('cancel')}
        </p>
      </div>
    </form>
  );
}

AddressForm.defaultProps = {
  address: null,
};
