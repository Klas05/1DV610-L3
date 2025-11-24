document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text");
  const charCount = document.getElementById("char-count");
  const downloadBtn = document.getElementById("download-btn");

  if (textInput && charCount) {
    textInput.addEventListener("input", (e) => {
      charCount.textContent = e.target.value.length;
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const svgElement = document.querySelector("#qr-display svg");

      if (!svgElement) {
        alert("No QR code to download");
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svgElement);

      const blob = new Blob([svgData], { type: "image/svg+xml" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${Date.now()}.svg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    });
  }
});
