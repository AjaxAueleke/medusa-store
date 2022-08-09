import { launch } from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { main } from "./download-image";
let username = "osafda879";
let password = "X:$Xx6eHS9JKB!m";

let app: Express = express();
let PORT = 3000;
app.use(cors());
app.use(express.json());
app.post("/", async (req: Request, res: Response) => {
  console.log("[POST] : working");
  const url = req.body.url;
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
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
    // await page.click("button[type='button']");
    await page.waitForTimeout(5000);
  }
  await page.waitForTimeout(15000);

  const lastPosition = await scrollPageToBottom(page, {});
  await page.waitForTimeout(15000);
  let images = await page.evaluate(() => {
    const images = document.querySelectorAll("img");
    return [...images].map((img) => img.src);
  });
  console.log(images);
  console.log(lastPosition);
  console.log(images.length);
  page.close();
  browser.close();
  await main(images);
  return res.send({
    data: images,
  });
});

app.listen(PORT, () => console.log("Listening on port 3000"));
