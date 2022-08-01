const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users

exports.findUser = async (email, password) => {
    var result = null;
    try {
        result = await User.findOne({
            email: email,
        })
    } catch (e) {

    }
    return result;
};