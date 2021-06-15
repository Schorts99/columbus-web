import React, { useState, ChangeEvent, useContext } from 'react';
import { TFunction } from 'react-i18next';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import { emailValidation, passwordValidation } from '../../utils/validations';
import { signIn } from '../../api';
import UserContext from '../../contexts/User';

type SignInFormProps = {
  t: TFunction<string[]>
}

type SignInFormErrors = {
  email: string | null | undefined,
  password: string | null | undefined,
}

export default function SignInForm({ t }: SignInFormProps) {
  const { currentUserDispatch } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignInFormErrors>({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setInputs({ ...inputs, [target.name]: target.value });
  }

  async function handleSubmit() {
    const newErrors = {
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
      const res = await signIn(inputs);
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
          password: responseBody.error,
        });
      }
    }
  }

  return (
    <form className="shadow rounded px-5 py-4">
      <h1 className="text-2xl font-bold mb-5">
        {t('title')}
      </h1>
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
        autoComplete="current-password"
        disabled={loading}
      />
      <Button
        label={t('submit')}
        loading={loading}
        onClick={handleSubmit}
      />
      <div className="flex justify-center mt-3">
        <Link to="/" className="text-sm text-gray-700">
          {t('sign_up')}
        </Link>
      </div>
    </form>
  );
}
