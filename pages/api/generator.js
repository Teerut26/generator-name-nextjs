// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
var qs = require("qs");
import path from "path";

const filePath = path.join(process.cwd(), `/public/font/THSarabunNew Bold.ttf`);

// const filePath = path.resolve('.', 'font/THSarabunNew Bold.ttf')
const { createCanvas, loadImage } = require("canvas");
const { registerFont } = require("canvas");
registerFont(filePath, {
  family: "THSarabunNew",
});

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default async function handler(req, res) {
  // res.send(__dirname)
  if (req.method === "POST") {
    // res.send(req.body.user);
    const width = 1400 * 3;
    const height = 630 * 3;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.fillStyle = "#FEFEFE";
    context.fillRect(0, 0, width, height);

    context.font = '160pt "THSarabunNew"';
    context.textAlign = "center";
    context.fillStyle = "#212529";

    const line1 =
      "ชื่อ " +
      req.body.mr +
      " " +
      req.body.fname +
      "  นามสกุล " +
      req.body.lname;
    context.fillText(line1, 2060, 300);

    const line2 = "ชั้น ม.5/" + req.body.room + " เลขที่ " + req.body.number;
    context.fillText(line2, 2060, 720);

    const line3 =
      "วิชา ฟิสิกส์ " + req.body.codeSubject + " " + req.body.typeNote;
    context.fillText(line3, 2060, 1200);

    const line4 = "ครูผู้สอน ธัญญารัตน์ โพธิ์ทอง";
    context.fillText(line4, 2060, 1650);
    context.strokeStyle = "#969696";
    context.strokeRect(0, 0, 4200, 1890);
    const filePath = path.join(process.cwd(), `/public/image/image2vector.svg`);
    let image = await loadImage(filePath);
    context.drawImage(image, 100, 100, 338, 424);
    const base64 = canvas.toDataURL("image/png");
    res.send({
      size: base64.length,
      size_show: formatBytes(base64.length),
      image: base64,
    });
  } else {
    res.send({ msg: "error" });
  }
}
