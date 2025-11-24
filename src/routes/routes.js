import express from "express";
import { renderHomePage, generateQRCode } from "../controllers/qrController.js";

const router = express.Router();

router.get("/", renderHomePage);

router.post("/generate", generateQRCode);

export default router;
