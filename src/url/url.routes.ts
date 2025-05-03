import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { encodeUrl } from "./url.controller";

router.post(
  "/encode",
  [
    body("longUrl", "enter long url").trim().notEmpty(),
  ],
  encodeUrl
);

export { router as urlRouter };
