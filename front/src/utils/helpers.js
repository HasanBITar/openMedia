
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


export function extractFilename(formattedString,removeExtension=false) {
    try {
        // Find the position of the first double underscore
        const firstUnderscoreIndex = formattedString.indexOf('__');
        
        // Extract the filename starting from the character after the double underscore
        let filename = formattedString.substring(firstUnderscoreIndex + 2);
        
       
        // Find the position of the last dot to remove the extension
        if(removeExtension)
            {

                const lastDotIndex = filename.lastIndexOf('.');
                if (lastDotIndex !== -1) {
                    filename = filename.substring(0, lastDotIndex);
                }
            }
                
        return filename;
    } catch (err) {
        console.error(err);
        return "unknown name";
    }
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

