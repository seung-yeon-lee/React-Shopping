export const formats = (num) =>
  "$" + Number(num.toFixed(1)).toLocaleString() + "";
