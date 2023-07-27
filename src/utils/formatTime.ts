export const formatTime = (rawTime: number, digits: number): string => {
  // let formattedTime = "";
  const toFix = rawTime.toFixed(digits);
  // formattedTime = rawTime === 0 ? "0.00" : String(rawTime / 1000);
  return toFix;
};
