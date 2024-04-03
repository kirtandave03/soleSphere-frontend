function convertHexToFlutterFormat(hexColor) {
  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  const flutterColor = `0xFF${("0" + r.toString(16).toUpperCase()).slice(-2)}${(
    "0" + g.toString(16).toUpperCase()
  ).slice(-2)}${("0" + b.toString(16).toUpperCase()).slice(-2)}`;

  return flutterColor;
}
export default convertHexToFlutterFormat;
