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

  if (value.length < 6 || value.length > 20) {
    return errors.format;
  }

  return null;
}
