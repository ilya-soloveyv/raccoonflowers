const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const flowerSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})
flowerSchema.plugin(mongoosePaginate)
const Flower = mongoose.model('flower', flowerSchema)



module.exports = Flower

module.exports.createFlower = (flower, cb) => {
    user.save(cb)
}