const mongoose = require('mongoose')
const fetch =require('node-fetch')

const EstateSchema = new mongoose.Schema({
    address:{
        type: String,
        unique:true,
        required:true,
    },
    city:{
        type: String,
        required:true,
        validate:{
            validator: async function(city){
                var response = await fetch('https://api-colombia.com/api/v1/City');
                var cities = await response.json()
                return cities.some(object => object.name.toUpperCase().includes(city.toUpperCase()));
            },
            message: props =>`${props.value} no es un ciudad de Colombia!`
        }
    },
    state:{
        type: String,
        required:true,
        validate:{
            validator: async function(state){
                var response = await fetch('https://api-colombia.com/api/v1/Department');
                var departments = await response.json()
                return departments.some(departments => department.name.toUpperCase().includes(state.toUpperCase()));
            },
            message: props =>`${props.value} no es un departamento de Colombia!`
        }
    },
    size:{
        type: Number,
        required:true,
    },
    type:{
        type: String,
        required:true,
    },
    zipcode:{
        type: String,
        required:true,
    },
    rooms:{
        type: Number,
        require: true
    },
    bathrooms:{
        type: Number,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, 
    }

})
module.exports = mongoose.model('estate', EstateSchema) 