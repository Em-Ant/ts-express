const exa = '0123456789abcdef';
const alphanum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getId = (n = 8, symbols = exa) => {
  const l = symbols.length;
  return [...Array(n).keys()]
    .map(() => symbols[Math.floor(Math.random() * l)])
    .join('');
};

export const getUUID = (): string =>
  `${getId(8)}-${getId(4)}-${getId(4)}-${getId(4)}-${getId(12)}`;

export const generateKey = (l = 32, symbols = alphanum): string => getId(l, symbols);