export const buildErrorResponse = (
  errors: { property: string; constraints: object }[]
) => {
  const formattedError = errors.map(({ property, constraints }) => {
    return { property, constraints: Object.keys(constraints || {}) };
  });

  return { errors: formattedError };
};

export const buildIsNotUniqueError = (message: string) => {
  const property = message.split(" ").slice(-1)[0].replace(/"/g, "");

  return [{ property, constraints: { isNotUnique: "" } }];
};
