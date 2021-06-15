type textValidationOptions = {
  required: boolean,
  minLength: number,
  maxLength: number,
  pattern?: RegExp
}

type textValidationErrors = {
  required?: string,
  minLength: string,
  maxLength: string,
  pattern?: string
}

const ONLY_LETTERS_PATTERN = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
const ONLY_NUMBERS_PATTERN = /^[0-9]+$/;

export default function textValidation(
  value: string | null | undefined,
  options: textValidationOptions,
  errors: textValidationErrors,
): string | null | undefined {
  if (options.required && (!value || value === '')) {
    return errors.required;
  }
  if (!value || value === '') {
    return null;
  }
  if (value.length < options.minLength) {
    return errors.minLength;
  }
  if (value.length > options.maxLength) {
    return errors.maxLength;
  }
  if (options.pattern && !options.pattern.test(value)) {
    return errors.pattern;
  }

  return null;
}

export const TEXT_PATTERNS = {
  ONLY_LETTERS_PATTERN,
  ONLY_NUMBERS_PATTERN,
};
