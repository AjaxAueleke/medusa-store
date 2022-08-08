import axios from "axios";
import fs from "fs";

const main = async () => {
  const images = fs.readFileSync("./images.json", "utf-8");
  const parsedImages = JSON.parse(images);
  for (let i = 0; i < parsedImages.length; i++) {
    axios.get(parsedImages[i], { responseType: "stream" }).then((response) => {
      response.data
        .pipe(fs.createWriteStream(`images/${i}.jpg`))
        .on("error", (err: any) => {
          console.log(err);
        })
        .once("close", () => {
          console.log("done");
        });
    });
  }
};
main();
