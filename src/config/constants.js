export const QR_CODE_CONFIG = {
  MAX_INPUT_LENGTH: 17,
  MAX_BYTE_LENGTH: 17,
  SVG_MODULE_SIZE: 10,
};

export const ERROR_MESSAGES = {
  EMPTY_INPUT: "Please enter some text to generate a QR code.",
  BYTE_LIMIT_EXCEEDED:
    "Input too large. Special characters (ö, ä, emoji, etc.) use more space. Try fewer characters.",
  GENERATION_FAILED: "Failed to generate QR code. Please try again.",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
};
