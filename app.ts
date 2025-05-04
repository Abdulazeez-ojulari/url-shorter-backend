require("dotenv").config();
require("./src/db/mongoconnection")();
import express from 'express';
import cors from 'cors';
import { urlRouter } from './src/url/url.routes';
import { appRouter } from './app.route';
import cookieParser from "cookie-parser"

const app = express();

app.use(cors());

app.set('trust proxy', true)

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.use("/", appRouter);

app.use(`${process.env.BASE_PATH}/`, urlRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));