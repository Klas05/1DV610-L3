import {
  generateQRCode as generateMatrix,
  renderSVGMatrix,
  validateInput,
} from "../../lib/1DV610-L2/src/index.js";

export function renderHomePage(req, res) {
  res.render("index", {
    error: null,
    qrCode: null,
    inputText: "",
  });
}

export function generateQRCode(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.render("index", {
        error: "Please enter some text to generate a QR code.",
        qrCode: null,
        inputText: text || "",
      });
    }

    validateInput(text);

    const matrix = generateMatrix(text);

    const svgCode = renderSVGMatrix(matrix, 10);

    res.render("index", {
      error: null,
      qrCode: svgCode,
      inputText: text,
    });
  } catch (error) {
    res.render("index", {
      error: error.message || "Failed to generate QR code. Please try again.",
      qrCode: null,
      inputText: req.body.text || "",
    });
  }
}
