import {
  generateQRCode as generateMatrix,
  renderSVGMatrix,
  validateInput,
} from "@klas05/l2-qr-code-generator";
import { QR_CODE_CONFIG } from "../config/constants.js";

export function generateQRCodeSVG(text) {
  validateInput(text);

  const matrix = generateMatrix(text);
  const svgCode = renderSVGMatrix(matrix, QR_CODE_CONFIG.SVG_MODULE_SIZE);

  return svgCode;
}