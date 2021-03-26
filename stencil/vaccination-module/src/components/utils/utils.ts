export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export function todayStringDate() {
  let date = new Date();
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let stringDate;

  if(month < 10){
    stringDate = `${day}-0${month}-${year}`;
  }else{
     stringDate = `${day}-${month}-${year}`;
  }
  return stringDate;
}