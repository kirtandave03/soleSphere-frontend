function convertHexToFlutterFormat(color) {
  // Remove the '#' from the beginning of the color string
  color = color.slice(1);

  // Extract the individual color components
  let red = parseInt(color.substring(0, 2), 16);
  let green = parseInt(color.substring(2, 4), 16);
  let blue = parseInt(color.substring(4, 6), 16);

  // Combine the color components into the Flutter format
  let flutterColor =
    "0x" +
    ("00" + red.toString(16)).slice(-2).toUpperCase() +
    ("00" + green.toString(16)).slice(-2).toUpperCase() +
    ("00" + blue.toString(16)).slice(-2).toUpperCase() +
    "FF"; // Alpha value (fully opaque)

  return flutterColor;
}
export default convertHexToFlutterFormat;
