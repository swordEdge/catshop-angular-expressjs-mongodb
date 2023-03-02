exports.customer = (err, res) => {
    let msg = '';

    if (err.code === 11000) {
        msg = 'Email that has already been used.'
    }

    if (err.reason) {
        msg = 'Not found this accout🥺';
    }

    res.status(400).send({
        error: msg
    });
}

exports.auth = (err, res) => {
    let msg = '';
    let code = 400;

    if (err.message === 'Unauthorized') {
        msg = 'Unauthorized.'
        code = 401;
    }

    if (err.message === 'Invalid token') {
        msg = 'Invalid token.';
        code = 401;
    }

    if (err.message === 'Invalid email or password.') {
        msg = 'Invalid email or password.';
        code = 400;
    }

    if (msg === '') {
        msg = 'Something went wrong.'
    }

    res.status(code).send({
        error: msg
    });
}