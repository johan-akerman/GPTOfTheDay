export const getSfTime = (localDate) => {
  // SFTIME är UTC-08
  const sfOffsetSeconds = 60 * 8 * 60;
  const offsetSeoncds = localDate.getTimezoneOffset() * 60;

  // Om vi är i UTC+01, så får vi 480 - (-60) = 540. Om vi är i UTC-05, så får vi 480 - 300 = 180
  const deltaSecondsComparedToSF = sfOffsetSeconds - offsetSeoncds;

  const sfTimeInSeconds = localDate.getTime() / 1000 - deltaSecondsComparedToSF;

  let sfTime = new Date(sfTimeInSeconds * 1000);
  console.log("Sf time in current timezone: ", sfTime);
  return sfTime; // SF tid uttryckt i vår lokala tidszon. Dvs, kl 09 i sverige --> 00 i sf fast utryckt i svensk tid.
};

export const getSfMostRecentMidnight = (localDate) => {
  let getSfMostRecentMidnightSf = new Date(
    getSfTime(localDate).setHours(0, 0, 0, 0)
  );
  console.log("Most recent midnight in SF: ", getSfMostRecentMidnightSf);
  return getSfMostRecentMidnightSf;
};
