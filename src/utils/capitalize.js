function capitalize(str) {
  let arr = str.split(" ");

  const words = arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
}

export default capitalize;
