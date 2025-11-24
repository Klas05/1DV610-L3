import express from "express";
import {
  showQRCodeForm,
  handleQRCodeGeneration,
} from "../controllers/qrController.js";

const router = express.Router();

router.get("/", showQRCodeForm);

router.post("/generate", handleQRCodeGeneration);

export default router;
