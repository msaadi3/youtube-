export default function calculateTimeDifference(publishedDate) {
    const currentDate = new Date();
    const published = new Date(publishedDate);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - published;

    // Convert milliseconds to seconds, minutes, hours, days, weeks, months, and years
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;
    const millisecondsPerMonth = millisecondsPerDay * 30.436875; // Approximate number of days in a month
    const millisecondsPerYear = millisecondsPerDay * 365.25; // Approximate number of days in a year

    const secondsAgo = Math.floor(timeDifference / millisecondsPerSecond);
    const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
    const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
    const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
    const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
    const monthsAgo = Math.floor(timeDifference / millisecondsPerMonth);
    const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);

    // Prioritize based on age
    if (yearsAgo >= 1) {
        return yearsAgo > 1 ? `${yearsAgo} years ago` : `${yearsAgo} year ago`;
    } else if (monthsAgo >= 1) {
        return monthsAgo > 1 ? `${monthsAgo} months ago` : `${monthsAgo} month ago`;
    } else if (weeksAgo >= 1) {
        return weeksAgo > 1 ? `${weeksAgo} weeks ago` : `${weeksAgo} week ago`;
    } else if (daysAgo >= 1) {
        return daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`;
    } else if (hoursAgo >= 1) {
        return hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
    } else if (minutesAgo >= 1) {
        return minutesAgo > 1 ? `${minutesAgo} minutes ago` : `${minutesAgo} minute ago`;
    } else {
        return secondsAgo > 1 ? `${secondsAgo} seconds ago` : `${secondsAgo} second ago`;
    }
}
