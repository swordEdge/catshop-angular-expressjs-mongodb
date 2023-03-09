exports.customer = (err, res) => {
    let msg = '';
    console.log(err);

    if (err.message === 'Please fill complete body data🥺') {
        msg = 'Please fill complete body data🥺';
    }

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
    console.log(err);


    if (err.message === 'Please fill complete body data🥺') {
        msg = 'Please fill complete body data🥺';
    }

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

exports.product = (err, res) => {
    let msg = '';
    let code = 400;
    console.log(err);

    if (err.message === 'Not found products🥺') {
        msg = 'Not found products🥺';
    }

    if (err.message === 'Please fill complete body data🥺') {
        msg = 'Please fill complete body data🥺';
    }

    if (err.message === 'Quantity must be integer or positive number') {
        msg = 'Quantity must be integer or positive number';
    }

    if (err.message === 'Price must be integer or positive number') {
        msg = 'Price must be integer or positive number';
    }

    if (err.reason) {
        msg = 'Not found this product🥺';
    }

    if (err === 'Invalid request') {
        msg = 'Invalid request';
    }

    if (err === 'Seller not found.') {
        msg = 'Seller not found.';
    }

    if (msg === '') {
        msg = 'Something went wrong';
    }

    res.status(code).send({
        error: msg
    });
}

exports.seller = (err, res) => {
    let msg = '';
    let code = 400;
    console.log(err);


    if (err.message === 'Please fill complete body data🥺') {
        msg = 'Please fill complete body data🥺';
    }

    if (err.reason) {
        msg = 'Not found this seller🥺';
    }

    if (err.message === 'Customer can have 1 seller.') {
        msg = 'Customer can have 1 seller.';
    }

    if (err.code === 11000) {
        msg = 'Sell has exist';
    }

    if (msg === '') {
        msg = 'Something went wrong';
    }

    res.status(code).send({
        error: msg
    });
};

exports.order = (err, res) => {
    let msg = '';
    let code = 400;
    console.log(err);


    if (err.message === 'Please fill complete body data🥺') {
        msg = 'Please fill complete body data🥺';
    }

    if (err.message === 'Quantity must be integer or positive number') {
        msg = 'Quantity must be integer or positive number';
    }

    if (err.message === 'Not found seller.') {
        msg = 'Not found seller.';
    }

    if (msg === '') {
        msg = 'Something went wrong';
    }

    res.status(code).send({
        error: msg
    });
};