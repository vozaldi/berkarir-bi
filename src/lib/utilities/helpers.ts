export const assets = (path: string) => {
  return `/assets/${path}`;
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function containsLaTeX(text = '') {
  const latexPattern = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/;

  return latexPattern.test(text);
};
