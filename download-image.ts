import axios from "axios";
import fs from "fs";

export const main = async (parsedImages : string[]) => {
  for (let i = 0; i < parsedImages.length; i++) {
    axios.get(parsedImages[i], { responseType: "stream" }).then((response) => {
      response.data
        .pipe(fs.createWriteStream(`./medusa-admin/public/${i}.jpg`))
        .on("error", (err: any) => {
          console.log(err);
        })
        .once("close", () => {
          console.log("done");
        });
    });
  }
};
