const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const packingSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})
packingSchema.plugin(mongoosePaginate)
const Packing = mongoose.model('packing', packingSchema)



module.exports = Packing

module.exports.createFlower = (packing, cb) => {
    user.save(cb)
}