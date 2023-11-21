export function getNiceDataString(date) {
    const dateFromFb = new Date(date.seconds * 1000);

    const currentSfTime = new Date();

    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;

    const elapsed = currentSfTime - dateFromFb;

    if (elapsed < milliSecondsPerMinute) {
      return "< 1 minute ago";
    } else if (elapsed < milliSecondsPerHour) {
      const minutes = Math.round(elapsed / milliSecondsPerMinute);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (elapsed < milliSecondsPerDay) {
      const hours = Math.round(elapsed / milliSecondsPerHour);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.round(elapsed / milliSecondsPerDay);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }