export const formatTime = (rawTime: number, digits: number): string => {
  // let formattedTime = "";
  const seconds = rawTime / 1000;
  const toFix = seconds.toFixed(digits);
  // formattedTime = rawTime === 0 ? "0.00" : String(rawTime / 1000);
  return toFix;
};
