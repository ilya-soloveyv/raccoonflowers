const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const colorSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})
colorSchema.plugin(mongoosePaginate)
const Color = mongoose.model('color', colorSchema)



module.exports = Color

module.exports.createFlower = (color, cb) => {
    user.save(cb)
}