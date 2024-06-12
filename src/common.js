function zero(el) {
  return el < 10 ? "0" + el : el;
}

export function toMMSS(secs) {
  return (zero(Math.floor(secs / 60)) + ":" + zero(secs % 60)).substring(0, 5);
}
