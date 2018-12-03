const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const bouquetSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})
bouquetSchema.plugin(mongoosePaginate)
const Bouquet = mongoose.model('bouquet', bouquetSchema)



module.exports = Bouquet

module.exports.createFlower = (color, cb) => {
    user.save(cb)
}