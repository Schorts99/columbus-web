type numberValidationOptions = {
  required: boolean,
  min: number,
  max: number,
  integer: boolean,
}

type numberValidationErrors = {
  required: string,
  min: string,
  max: string,
  format: string,
}

export default function numberValidation(
  value: string,
  options: numberValidationOptions,
  errors: numberValidationErrors,
): string | null | undefined {
  if (options.required && (!value || value === '')) {
    return errors.required;
  }

  if (!value || value === '') {
    return null;
  }

  let parsedNumber;

  if (options.integer) {
    parsedNumber = parseInt(value, 10);
  } else {
    parsedNumber = parseFloat(value);
  }

  if (!parsedNumber) {
    return errors.format;
  }

  if (parsedNumber < options.min) {
    return errors.min;
  }

  if (parsedNumber > options.max) {
    return errors.max;
  }

  return null;
}
