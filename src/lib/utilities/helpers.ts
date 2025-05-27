export const assets = (path: string) => {
  return `/assets/${path}`;
};

export const randomNumber = (min: number | `${string}%`, max: number | `${string}%`): number | `${string}%` => {
  const minNumber = 'string' === typeof min ? parseInt(min.replace('%', '')) : min;
  const maxNumber = 'string' === typeof max ? parseInt(max.replace('%', '')) : max;

  const result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  return 'string' === typeof min ? `${result}%` : result;
};

export function containsLaTeX(text = '') {
  const latexPattern = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/;

  return latexPattern.test(text);
};
