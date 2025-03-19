export default function FormateDate(date) {
  const dateNow = new Date(date);
  const year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  day < 10 ? (day = "0" + day) : "";
  month < 10 ? (month = "0" + month) : "";
  return `${year}-${month}-${day}`;
}
