import { launch } from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
import download from "image-downloader";
import fs from "fs";
import axios from "axios";
import path from "path";
let username = "osafda879";
let password = "X:$Xx6eHS9JKB!m";
// // async function downloadImage(url: string, counter: number) {
// //   const filepath = path.join(__dirname, "images", `${counter}.jpg`);
// //   const response = await axios({
// //     url,
// //     method: "GET",
// //     responseType: "stream",
// //   });
// //   return new Promise(async (resolve, reject) => {
// //     response.data
// //       .pipe(fs.createWriteStream(filepath))
// //       .on("error", reject)
// //       .once("close", () => resolve(filepath));
// //   });
// }
const main = async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/camden.arte");
  await page.waitForTimeout(5000);
  try {
    await page.type("input[name='username']", username);
    await page.type("input[name='password']", password);
    await page.click("button[type='submit']");
    await page.waitForTimeout(5000);
  } catch (err) {
    await page.click("button[type='button']");
    await page.waitForTimeout(5000);
    await page.type("input[name='username']", username);
    await page.type("input[name='password']", password);
    await page.click("button[type='submit']");
    await page.waitForTimeout(5000);
  }
  try {
    await page.click("button[type='button']");
    await page.waitForTimeout(5000);
  } catch (err) {
    await page.click("button[type='button']");
    await page.waitForTimeout(5000);
  }
  await page.waitForTimeout(15000);

  const lastPosition = await scrollPageToBottom(page, {});
  await page.waitForTimeout(15000);
  let images = await page.evaluate(() => {
    const images = document.querySelectorAll("img");
    return [...images].map((img) => img.src);
  });
  fs.writeFileSync("images.json", JSON.stringify(images));
  console.log(images);
  console.log(lastPosition);
  console.log(images.length);
  let counter = 0;
  //   page.close();
  images.forEach(async (image) => {
    if (counter <= 10) {
      counter++;
      return;
    }
    console.log("running this");
    console.log(counter);
    try {
        await download.image({
            url : image,
            dest : path.join(__dirname, "images", `${counter}.jpg`)
        })
    } catch (err) {
      console.log(err);
    }
    counter++;
  });
  page.close();
  browser.close();
};

main();
