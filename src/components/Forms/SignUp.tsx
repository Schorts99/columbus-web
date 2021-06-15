import React, { useState, ChangeEvent, useContext } from 'react';
import { TFunction } from 'react-i18next';
import { Link } from 'react-router-dom';
import Input from '../Input';
import InputSelect from '../Input/Select';
import Button from '../Button';
import {
  textValidation,
  TEXT_PATTERNS,
  numberValidation,
  emailValidation,
  passwordValidation,
} from '../../utils/validations';
import { signUp } from '../../api';
import UserContext from '../../contexts/User';

type SignUpFormProps = {
  t: TFunction<string[]>
}

type SignUpFormErrors = {
  name: string | null | undefined,
  age: string | null | undefined,
  sex: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined,
}

export default function SignUpForm({ t }: SignUpFormProps) {
  const { currentUserDispatch } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
    sex: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({
    name: null,
    age: null,
    sex: null,
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setInputs({ ...inputs, [target.name]: target.value });
  }

  function validatesStepOne() {
    const newErrors = {
      name: textValidation(inputs.name, {
        minLength: 3,
        maxLength: 50,
        required: true,
        pattern: TEXT_PATTERNS.ONLY_LETTERS_PATTERN,
      }, {
        required: t('name_required_error'),
        minLength: t('name_minLength_error'),
        maxLength: t('name_maxLength_error'),
        pattern: t('name_pattern_error'),
      }),
      age: numberValidation(inputs.age, {
        integer: true,
        max: 100,
        min: 18,
        required: true,
      }, {
        required: t('age_required_error'),
        format: t('age_format_error'),
        min: t('age_min_error'),
        max: t('age_max_error'),
      }),
      sex: inputs.sex !== '' ? null : t('sex_required_error'),
      email: null,
      password: null,
    };

    setErrors(newErrors);

    const error = Object.values(newErrors).filter((newError) => newError !== null).length !== 0;

    if (!error) {
      setStep(2);
    }
  }

  async function handleSubmit() {
    const newErrors = {
      name: null,
      age: null,
      sex: null,
      email: emailValidation(inputs.email, true, {
        required: t('email_required_error'),
        pattern: t('email_pattern_error'),
      }),
      password: passwordValidation(inputs.password, {
        required: t('password_required_error'),
        format: t('password_format_error'),
      }),
    };

    setErrors(newErrors);

    const error = Object.values(newErrors).filter((newError) => newError !== null).length !== 0;

    if (!error) {
      setLoading(true);
      const res = await signUp(inputs);
      const responseBody = await res.json();
      setLoading(false);

      if (res.ok) {
        const authToken = res.headers.get('Authorization');

        currentUserDispatch({
          type: 'LOGIN',
          token: authToken,
          user: responseBody.data.attributes,
        });
      } else {
        setErrors({
          ...errors,
          password: responseBody.errors[0].detail,
        });
      }
    }
  }

  return (
    <form className="shadow rounded px-5 py-4">
      <h1 className="text-2xl font-bold mb-5">
        {t('title')}
      </h1>
      {step === 1 ? (
        <>
          <Input
            label={t('name')}
            name="name"
            onChange={onChange}
            placeholder={t('name_placeholder')}
            value={inputs.name}
            required
            error={errors.name}
            autoComplete="name"
          />
          <div className="grid grid-cols-4 gap-5 mb-3">
            <div>
              <Input
                label={t('age')}
                name="age"
                onChange={onChange}
                value={inputs.age}
                type="number"
                min={18}
                max={100}
                placeholder={t('age_placeholder')}
                required
                error={errors.age}
              />
            </div>
            <div className="col-span-3">
              <InputSelect
                label={t('sex')}
                name="sex"
                onChange={onChange}
                value={inputs.sex}
                placeholder={t('sex_placeholder')}
                error={errors.sex}
                options={[
                  {
                    label: t('male'),
                    value: 'male',
                  },
                  {
                    label: t('female'),
                    value: 'female',
                  },
                ]}
              />
            </div>
          </div>
          <Button
            label={t('continue')}
            onClick={validatesStepOne}
          />
          <div className="flex justify-center mt-3">
            <Link to="/sign-in" className="text-sm text-gray-700">
              {t('sign_in')}
            </Link>
          </div>
        </>
      ) : (
        <>
          <Input
            label={t('email')}
            name="email"
            onChange={onChange}
            placeholder={t('email_placeholder')}
            value={inputs.email}
            required
            error={errors.email}
            type="email"
            autoComplete="email"
            disabled={loading}
          />
          <Input
            label={t('password')}
            name="password"
            onChange={onChange}
            placeholder={t('password_placeholder')}
            value={inputs.password}
            required
            error={errors.password}
            type="password"
            autoComplete="new-password"
            disabled={loading}
          />
          <Button
            label={t('submit')}
            loading={loading}
            onClick={handleSubmit}
          />
          <div className="flex justify-center mt-3">
            <button type="button" className="text-sm text-gray-700" onClick={() => setStep(1)}>
              {t('back')}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
