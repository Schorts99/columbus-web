type emailValidationErrors = {
  required?: string,
  pattern: string
}

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function emailValidation(
  value: string,
  required: boolean,
  errors: emailValidationErrors,
): string | null | undefined {
  if (required && !errors.required) {
    throw new Error('You need to specify error message for required.');
  }

  if (required && (!value || value === '')) {
    return errors.required;
  }

  if (!value || value === '') {
    return null;
  }

  if (!EMAIL_PATTERN.test(value)) {
    return errors.pattern;
  }

  return null;
}
