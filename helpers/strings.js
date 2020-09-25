module.exports.randomString = function(length = 'sm') {
    if (length == 'sm')
        return Math.random().toString(36).substring(2)
    else if (length == 'lg') {
        return Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2)
    } else {
        return Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2)
    }
}