export const getSfTime = () => {
  const localDate = new Date();
  // SFTIME är UTC-08
  const sfOffsetSeconds = 60 * 8 * 60;
  const offsetSeoncds = localDate.getTimezoneOffset() * 60;

  // Om vi är i UTC+01, så får vi 480 - (-60) = 540. Om vi är i UTC-05, så får vi 480 - 300 = 180
  const deltaSecondsComparedToSF = sfOffsetSeconds - offsetSeoncds;

  const sfTimeInSeconds = localDate.getTime() / 1000 - deltaSecondsComparedToSF;

  let sfTime = new Date(sfTimeInSeconds * 1000);
  return sfTime; // SF tid uttryckt i vår lokala tidszon. Dvs, kl 09 i sverige --> 00 i sf fast utryckt i svensk tid.
};

export const getSfTimeOffsetSeconds = () => {
  const localDate = new Date();
  // SFTIME är UTC-08
  const sfOffsetSeconds = 60 * 8 * 60;
  const offsetSeoncds = localDate.getTimezoneOffset() * 60;

  // Om vi är i UTC+01, så får vi 480 - (-60) = 540. Om vi är i UTC-05, så får vi 480 - 300 = 180
  const deltaSecondsComparedToSF = sfOffsetSeconds - offsetSeoncds;

  return deltaSecondsComparedToSF;
};

export const getSfMostRecentMidnight = () => {
  const localDate = new Date();
  let getSfMostRecentMidnightSf = new Date(
    getSfTime(localDate).setHours(0, 0, 0, 0)
  );
  return getSfMostRecentMidnightSf;
};

export const getSfNextMidnight = () => {
  const nextMidnightInSf = getSfMostRecentMidnight();
  nextMidnightInSf.setDate(nextMidnightInSf.getDate() + 1);

  return nextMidnightInSf;
};
