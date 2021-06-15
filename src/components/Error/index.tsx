import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

type ErrorProps = {
  title: string,
  retry: Function,
}

export default function Error({ title, retry }: ErrorProps) {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <p className="mb-4">
        {title}
      </p>
      <Button label={t('retry')} onClick={retry} />
    </div>
  );
}
