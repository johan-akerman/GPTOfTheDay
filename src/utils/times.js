export const getSfTime = (localDate) => {
  // SFTIME är UTC-08
  const sfOffsetSeconds = 60 * 8 * 60;
  const offsetSeoncds = localDate.getTimezoneOffset() * 60;

  // Om vi är i UTC+01, så får vi 480 - (-60) = 540. Om vi är i UTC-05, så får vi 480 - 300 = 180
  const deltaSecondsComparedToSF = sfOffsetSeconds - offsetSeoncds;

  const sfTimeInSeconds = localDate.getTime() / 1000 - deltaSecondsComparedToSF;

  //   const sfTimeString = new Date().toLocaleString("en-US", {
  //     timeZone: "America/Los_Angeles",
  //   });

  const sfTime = new Date(sfTimeInSeconds * 1000);
  return sfTime;
};
