module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String,
            email: String,
            role: Number,
            email_verified_at: Date,
            password: String,
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v,_id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("users",schema)
    return User

}