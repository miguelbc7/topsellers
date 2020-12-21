const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: 'Url es requerida'
    },
    ranking: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    summary:{
        positive:{
            treinta:{
                type:String,
                required: true
            },
            noventa:{
                type:String,
                required: true
            },
            anual:{
                type:String,
                required: true
            },
            vida:{
                type:String,
                required: true
            }
        },
        neutral:{
            treinta:{
                type:String,
                required: true
            },
            noventa:{
                type:String,
                required: true
            },
            anual:{
                type:String,
                required: true
            },
            vida:{
                type:String,
                required: true
            }
        },
        negative:{
            treinta:{
                type:String,
                required: true
            },
            noventa:{
                type:String,
                required: true
            },
            anual:{
                type:String,
                required: true
            },
            vida:{
                type:String,
                required: true
            }
        },
        count:{
            treinta:{
                type:String,
                required: true
            },
            noventa:{
                type:String,
                required: true
            },
            anual:{
                type:String,
                required: true
            },
            vida:{
                type:String,
                required: true
            }
        }

    }
});

module.exports = Seller = mongoose.model("sellers", SellerSchema);