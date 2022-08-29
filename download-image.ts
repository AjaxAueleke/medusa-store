import axios from "axios";
import fs from "fs";

const downloadImage = (url: string, path: string)  => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "stream",
    })
      .then((response) => {
        response.data.pipe(fs.createWriteStream(`./medusa-admin/public/${path}.jpg`));
        let error = null;
        response.data.on("end", () => {
          resolve(path);
        });
        response.data.on("error", (err : any) => {
          error = err;
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  })
}
export const main = async (parsedImages : string[])  : Promise<string[]> => {
  let data: string[] = [];
  for (let i = 0; i < parsedImages.length; i++) {
    try {

    data.push((await downloadImage(parsedImages[i], i.toString())) as string);
    } catch (e) {
      console.log(e)

    }
  }
  return data;
};
