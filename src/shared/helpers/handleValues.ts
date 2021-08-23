function formatValue(value: number): number {
  const valueString = String(value);
  const splitV = valueString.split('.');
  if (splitV.length > 1) {
    if (splitV[1].length > 1) {
      return Number(splitV[0] + splitV[1]);
    }
    return Number(`${splitV[0] + splitV[1]}0`);
  }
  return Number(`${splitV[0]}00`);
}
export default formatValue;
