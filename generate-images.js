const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

(async () => {
  console.log(`Generating images...`);

  let inputDir = "./images";
  let outputDir = "./public/images";

  fs.readdir(inputDir, (_, files) => {
    files.forEach((file) => {
      Image(`${inputDir}/${file}`, {
        widths: [300],
        formats: ["avif", "webp", "jpeg"],
        outputDir,
        filenameFormat: (_, src, width, format) => {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          console.log(`Generated ${name}-${width}w.${format}`);
          return `${name}-${width}w.${format}`;
        },
      });
    });
  });
})();
