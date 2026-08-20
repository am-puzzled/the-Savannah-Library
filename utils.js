
// If str is a number then there will be an error
 //convert everything into a string first b4 comparing
export function normalize(str) {
  return String(str).toLowerCase().replace(/\s+/g, "");
}