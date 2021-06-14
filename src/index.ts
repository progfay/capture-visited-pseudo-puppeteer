import path from "path";
import puppeteer from "puppeteer";
import { listenStaticFileServer } from "./listenStaticFileServer";

const PORT = 3000;

async function main(): Promise<void> {
  const server = await listenStaticFileServer(path.resolve("./public"), PORT);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${PORT}`);
  const navigation = page.waitForNavigation();
  await page.click(`a#visited`);
  await navigation;
  await page.goBack();

  await page.screenshot({
    path: path.resolve("capture.png"),
    clip: {
      x: 0,
      y: 0,
      width: 150,
      height: 60,
    },
  });

  server.close();
  process.exit(0);
}

main();
