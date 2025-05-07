export type ValueOf<T> = T[keyof T];

export type ErrorState<F> = {
  fields?: Array<keyof F>;
  message?: string;
};

export type LayoutRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  element?: HTMLElement;
};

export type ContentLayoutState = {
  [key: string]: Partial<LayoutRectangle> | undefined;
};

export type LayoutObject = ContentLayoutState;

export type AxiosAbortableCatch = undefined | {
  aborted?: boolean;
  [key: string]: unknown;
};

export type AbortControllerRef = {
  [key: string]: AbortController;
};
