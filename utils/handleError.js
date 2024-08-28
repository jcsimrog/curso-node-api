const handleHttpError = (res, message = 'Un error sucedio', code = 403) => {
    res.status(code);
    res.send({ error: message });
}

module.exports = { handleHttpError }