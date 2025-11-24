export function renderHomePage(req, res) {
  res.render("index", {
    error: null,
    qrCode: null,
    inputText: "",
  });
}
