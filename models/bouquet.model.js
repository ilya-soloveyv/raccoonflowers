const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const bouquetSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    uri: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    flower: [{
        type: Schema.Types.ObjectId,
        ref: 'flower'
    }],
    size: [{
        type: Schema.Types.ObjectId,
        ref: 'size'
    }]
})
bouquetSchema.plugin(mongoosePaginate)
const Bouquet = mongoose.model('bouquet', bouquetSchema)

module.exports = Bouquet

module.exports.createFlower = (color, cb) => {
    user.save(cb)
}