import { generateQRCodeSVG } from "../services/qrCodeService.js";
import { createViewData } from "../utils/viewHelpers.js";
import { ERROR_MESSAGES } from "../config/constants.js";
import { isWithinByteLimit } from "../utils/validation.js";

export function showQRCodeForm(req, res) {
  res.render("index", createViewData());
}

export function handleQRCodeGeneration(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.render(
        "index",
        createViewData(ERROR_MESSAGES.EMPTY_INPUT, null, text || "")
      );
    }

    if (!isWithinByteLimit(text)) {
      return res.render(
        "index",
        createViewData(ERROR_MESSAGES.BYTE_LIMIT_EXCEEDED, null, text)
      );
    }

    const svgCode = generateQRCodeSVG(text);

    res.render("index", createViewData(null, svgCode, text));
  } catch (error) {
    res.render(
      "index",
      createViewData(
        error.message || ERROR_MESSAGES.GENERATION_FAILED,
        null,
        req.body.text || ""
      )
    );
  }
}
