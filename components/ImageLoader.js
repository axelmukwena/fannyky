const ImageLoader = function ImageLoader({ src, width, quality }) {
  console.log(src, width, quality);
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default ImageLoader;
