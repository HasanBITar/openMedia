/**
 * A higher-order function to execute a given function with error handling.
 * @param {Function} funcToRun - The function to execute.
 * @param {Object} res - The response object to send error responses.
 */
const errorRespone = (err, res) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
        stack: err.stack,
        errorObj: { err }
    });
};


// convert snake_case to camelCase
function rename(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
            newObj[camelKey] = obj[key];
        }
    }
    return newObj;
}

module.exports = {
    errorRespone,
    rename,
};

