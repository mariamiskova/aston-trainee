enum PictureSizes {
  "small" = 300,
  "normal" = 400,
}

export const imgLoader = (id: string, size: "small" | "normal") => {
  return `https://www.artic.edu/iiif/2/${id}/full/${PictureSizes[size]},/0/default.jpg`;
};
