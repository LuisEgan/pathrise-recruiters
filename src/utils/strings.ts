export const capitalizeOnlyFirstLetter = (str = "") =>
  str.charAt(0).toUpperCase() + str.toLocaleLowerCase().slice(1);
