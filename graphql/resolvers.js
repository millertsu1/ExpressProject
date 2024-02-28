const UserSchema = require('../models/User')
const MessageSchema = require('../models/Message')

const resolvers ={
    hello:()=>{
        return "Hola Mundo!";
    },
    User: async(_, {id})=>{
        try{
            return user = await UserSchema.findById(id);
        }catch(e){
            console.log();
        }
    },
    Users: async()=> {
        try{
            return await UserSchema.find();
        }catch(e){
            console.log(e);
        }
    },
    UsersByFilter: async({_, filter})=>{
        try{
            let query = {};

            if(filter.name){
                query.name = {$regex: filter.name, $options: 'i'}
            }
            if(filter.email){
                query.email = {$regex: filter.email, $options: 'i'}
            }
            if(filter.lastname){
                query.lastname = {$regex: filter.lastname, $options: 'i'}
            }

            const users = await Schema4.find(query)
            return users;
        }catch(e){

        }
    }
}
module.exports = resolvers