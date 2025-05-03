import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { decodeUrl, encodeUrl } from "./url.controller";

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

export { router as urlRouter };
