export const classNames = (elements: Array<string | undefined>) =>
  elements.filter((element) => element).join(' ');