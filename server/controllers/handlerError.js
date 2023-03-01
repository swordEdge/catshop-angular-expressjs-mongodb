exports.customer = (err, res) => {
    let msg = '';
    console.log(err);

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