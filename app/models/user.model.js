const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
    
        {
            name: {
                type: String,
                required: true,

            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            role: {
                type: String,
            },
            email_verified_at: {
                type: String,
            },
            password: {
                type: String,
                required: true,
            },
            access_token: {
                type: String,
            },
        },
        { timestamps: true }

    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })
    schema.plugin(uniqueValidator)
    const User = mongoose.model("users", schema)
    return User

}