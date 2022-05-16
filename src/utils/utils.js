export const checkValueIn = (obj, value) => {
  const key = Object.keys(obj).find((key) => obj[key] === value);
  return obj[key] === value;
};
