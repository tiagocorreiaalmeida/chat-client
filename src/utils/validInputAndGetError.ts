import joi from '@hapi/joi';

export const validInputAndGetError = (
  validation: joi.ObjectSchema<any>,
  data: Record<string, any>,
): string | null => {
  const { error } = validation.validate(data);
  const errorMessage = error?.details?.[0]?.context?.label;

  return errorMessage || null;
};
