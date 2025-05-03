import { Router } from "express";
const router = Router();
import { body, param } from "express-validator";
import { decodeUrl, encodeUrl, urlList, urlStatistic } from "./url.controller";

router.post(
  "/encode",
  [
    body("longUrl", "enter long url").trim().notEmpty(),
  ],
  encodeUrl
);

router.post(
    "/decode",
    [
      body("shortCode", "enter short code").trim().notEmpty(),
    ],
    decodeUrl
);

router.get(
    "/statistic/:url_path",
    [
      param("url_path", "invalid short code").trim().isLength({min: 6, max: 6}),
    ],
    urlStatistic
);

router.get(
    "/list",
    urlList
);

export { router as urlRouter };
