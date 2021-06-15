const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

type passwordValidationErrors = {
  required: string,
  format: string,
}

export default function passwordValidation(
  value: string,
  errors: passwordValidationErrors,
): string | null | undefined {
  if (!value || value === '') {
    return errors.required;
  }

  if (!PASSWORD_PATTERN.test(value)) {
    return errors.format;
  }

  return null;
}
