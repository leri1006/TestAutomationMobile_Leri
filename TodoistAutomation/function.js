function generateRandomString(length) {
    let randomString = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomString;
}

module.exports = generateRandomString;