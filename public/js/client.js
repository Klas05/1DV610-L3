const DOM_SELECTORS = {
  TEXT_INPUT: "text",
  CHAR_COUNT: "char-count",
  SUBMIT_BTN: "qr-form",
  DOWNLOAD_BTN: "download-btn",
  QR_DISPLAY_SVG: "#qr-display svg",
  CHAR_COUNTER: ".char-counter",
};

const DOWNLOAD_CONFIG = {
  FILE_PREFIX: "qrcode-",
  FILE_EXTENSION: ".svg",
  MIME_TYPE: "image/svg+xml",
};

const VALIDATION_CONFIG = {
  MAX_BYTE_LENGTH: 17,
};

const CSS_CLASSES = {
  OVER_LIMIT: "over-limit",
};

const MESSAGES = {
  NO_QR_CODE: "No QR code to download",
};

function getByteLength(text) {
  return new TextEncoder().encode(text).length;
}

function isOverByteLimit(byteLength) {
  return byteLength > VALIDATION_CONFIG.MAX_BYTE_LENGTH;
}

function updateSubmitButtonState(form, isDisabled) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = isDisabled;
  }
}

function updateVisualFeedback(charCounter, isOverLimit) {
  if (isOverLimit) {
    charCounter.classList.add(CSS_CLASSES.OVER_LIMIT);
  } else {
    charCounter.classList.remove(CSS_CLASSES.OVER_LIMIT);
  }
}

function validateInput(inputElement, countElement, form, charCounter) {
  const byteLength = getByteLength(inputElement.value);
  const isOverLimit = isOverByteLimit(byteLength);

  countElement.textContent = byteLength;
  updateSubmitButtonState(form, isOverLimit);
  updateVisualFeedback(charCounter, isOverLimit);
}

function initializeCharacterCounter() {
  const textInput = document.getElementById(DOM_SELECTORS.TEXT_INPUT);
  const charCount = document.getElementById(DOM_SELECTORS.CHAR_COUNT);
  const form = document.getElementById(DOM_SELECTORS.SUBMIT_BTN);
  const charCounter = document.querySelector(DOM_SELECTORS.CHAR_COUNTER);

  if (textInput && charCount && form && charCounter) {
    validateInput(textInput, charCount, form, charCounter);

    textInput.addEventListener("input", () => {
      validateInput(textInput, charCount, form, charCounter);
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
