import { QR_CODE_CONFIG } from "../config/constants.js";

export function getByteLength(text) {
  return new TextEncoder().encode(text).length;
}

export function isWithinByteLimit(text) {
  return getByteLength(text) <= QR_CODE_CONFIG.MAX_BYTE_LENGTH;
}