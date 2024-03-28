function convertFlutterToHexFormat(flutterColor) {
  flutterColor = flutterColor.replace("0xFF", "");

  const r = parseInt(flutterColor.substr(0, 2), 16);
  const g = parseInt(flutterColor.substr(2, 2), 16);
  const b = parseInt(flutterColor.substr(4, 2), 16);

  const hexColor = `#${("0" + r.toString(16)).slice(-2)}${(
    "0" + g.toString(16)
  ).slice(-2)}${("0" + b.toString(16)).slice(-2)}`;

  return hexColor;
}
export default convertFlutterToHexFormat;
