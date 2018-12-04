const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})
sizeSchema.plugin(mongoosePaginate)
const Size = mongoose.model('size', sizeSchema)



module.exports = Size

module.exports.createFlower = (size, cb) => {
    user.save(cb)
}