
import moment from 'moment';

export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursFormatted = hours > 0 ? `${hours}:` : '';
    const minutesFormatted = hours > 0 || minutes > 0 ? `${String(minutes).padStart(2, '0')}:` : '0:';
    const secondsFormatted = String(secs).padStart(2, '0');

    return `${hoursFormatted}${minutesFormatted}${secondsFormatted}`;
}

export function formatDate(date) {
    date = moment(date, true);
    return '' + date.format('dddd, MMMM Do YYYY', moment.ISO_8601, true);
}

export function formatString(str, length = 35) {
    if (str?.length <= length)
        return str;
    else
        return str?.slice(0, length) + '...';
}


export function extractFilename(formattedString) {
    try {
        const firstUnderscoreIndex = formattedString.indexOf('__');
        const filename = formattedString.substring(firstUnderscoreIndex + 2);
        return filename;
    }
    catch (err) {
        console.error(err);
        return "unknow name";
    }
}

