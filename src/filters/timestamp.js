export default function (timeStamp) {
  const ts = new Date(timeStamp);
  const yyyy = ts.getFullYear().toString();
  let mm = ts.getMonth() + 1;
  if (mm.toString().length === 1) {
    mm = `0${mm}`;
  }
  let dd = ts.getDate().toString(); if (dd.length === 1) dd = `0${dd}`;
  let HH = ts.getHours().toString(); if (HH.length === 1) HH = `0${HH}`;
  let MM = ts.getMinutes().toString(); if (MM.length === 1) MM = `0${MM}`;
  if (typeof timeStamp === 'string') {
    return timeStamp;
  }
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}`;
}
