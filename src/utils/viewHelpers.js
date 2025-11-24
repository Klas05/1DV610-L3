export function createViewData(error = null, qrCode = null, inputText = "") {
  return {
    error,
    qrCode,
    inputText,
  };
}