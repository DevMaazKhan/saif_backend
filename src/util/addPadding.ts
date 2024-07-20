function addPadding(num: number, size: number, paddingChr: string) {
  let s = `${num}`;
  while (s.length < size) s = paddingChr + s;
  return s;
}

export default addPadding;
