export default function CustomSlice(string, end) {
  return string.length > end ? string.slice(0, end) + ".." : string;
}
