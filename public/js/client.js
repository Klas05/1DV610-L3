const DOM_SELECTORS = {
  TEXT_INPUT: "text",
  CHAR_COUNT: "char-count",
  DOWNLOAD_BTN: "download-btn",
  QR_DISPLAY_SVG: "#qr-display svg",
};

const DOWNLOAD_CONFIG = {
  FILE_PREFIX: "qrcode-",
  FILE_EXTENSION: ".svg",
  MIME_TYPE: "image/svg+xml",
};

const MESSAGES = {
  NO_QR_CODE: "No QR code to download",
};

function updateCharacterCount(inputElement, countElement) {
  countElement.textContent = inputElement.value.length;
}

function initializeCharacterCounter() {
  const textInput = document.getElementById(DOM_SELECTORS.TEXT_INPUT);
  const charCount = document.getElementById(DOM_SELECTORS.CHAR_COUNT);

  if (textInput && charCount) {
    textInput.addEventListener("input", () => {
      updateCharacterCount(textInput, charCount);
    });
  }
}

function getSVGElement() {
  return document.querySelector(DOM_SELECTORS.QR_DISPLAY_SVG);
}

function serializeSVG(svgElement) {
  return new XMLSerializer().serializeToString(svgElement);
}

function createDownloadLink(svgData) {
  const blob = new Blob([svgData], { type: DOWNLOAD_CONFIG.MIME_TYPE });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${DOWNLOAD_CONFIG.FILE_PREFIX}${Date.now()}${DOWNLOAD_CONFIG.FILE_EXTENSION}`;

  return { link, url };
}

function triggerDownload(link, url) {
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleQRCodeDownload() {
  const svgElement = getSVGElement();

  if (!svgElement) {
    alert(MESSAGES.NO_QR_CODE);
    return;
  }

  const svgData = serializeSVG(svgElement);
  const { link, url } = createDownloadLink(svgData);
  triggerDownload(link, url);
}

function initializeDownloadButton() {
  const downloadBtn = document.getElementById(DOM_SELECTORS.DOWNLOAD_BTN);

  if (downloadBtn) {
    downloadBtn.addEventListener("click", handleQRCodeDownload);
  }
}

function initializeApp() {
  initializeCharacterCounter();
  initializeDownloadButton();
}

document.addEventListener("DOMContentLoaded", initializeApp);
