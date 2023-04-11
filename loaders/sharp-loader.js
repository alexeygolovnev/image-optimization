const sharp = require("sharp");
const path = require("path");

module.exports = function (source) {
  const callback = this.async();

  const options = this.getOptions();
  const { quality, sizes, outputDir } = options;

  const filename = path.basename(
    this.resourcePath,
    path.extname(this.resourcePath)
  );

  const urlPattern = /"(.*?)"/;
  const match = urlPattern.exec(source);
  const imageUrl = match ? `./src/${match[1]}` : null;

  const processImage = (size) => {
    const clone = sharp(imageUrl);
    const webpPromise = clone
      .resize(size)
      .webp({ quality })
      .toFile(`${outputDir}/${filename}-${size}.webp`)
      .catch((err) => {
        console.error(
          `Error processing ${filename} at size ${size} (WebP)`,
          err
        );
        return Promise.reject(err);
      });

    const jpegPromise = clone
      .jpeg({ quality })
      .toFile(`${outputDir}/${filename}-${size}.jpeg`)
      .catch((err) => {
        console.error(
          `Error processing ${filename} at size ${size} (JPEG)`,
          err
        );
        return Promise.reject(err);
      });

    return Promise.allSettled([webpPromise, jpegPromise]);
  };

  const promises = sizes.flatMap(processImage);

  Promise.allSettled(promises)
    .then(() => {
      callback(null, source);
    })
    .catch((err) => {
      callback(err);
    });
};
