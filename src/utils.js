import { ROOT_FONT_SIZE } from "./consts";

export const range = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start) / step) }, (v, i) => i * step + start);

export const cc = (...classNames) => classNames.join(" ");

export const withClass = givenClassName => Component => ({ className, ...props }) => (
  <Component className={cc(givenClassName, className)} {...props} />
);

export const pxToRem = px => `${px / ROOT_FONT_SIZE}rem`;

export const head = arr => (Array.isArray(arr) && arr.length > 0 ? arr[0] : null);
export const findFirstBy = (arr, predicate) => head(arr.filter(predicate));
