const User = require('./model/userSchema');//parent
const resolvers ={
    Query:{
        getUsers: async(_,{id})=>{return await User.findById(id);}
    },
    Mutation:{
        createUser: async (_,{input})=>{
            const {name,email,password}=input;
            try{
                if(!name || !email || !password){
                    throw new Error('Enter all fields');
                }
                const newUser=new User({name,email,password});
                return await newUser.save();
            }catch(err){throw Error(err);}
        },
        changePass:async(_,{id,password})=>{
            try{
                const userNew= await User.findByIdAndUpdate(id,{password:password},{new:true});
                if(!userNew){
                    throw new Error('not found')
                }
                return userNew;
            }
            catch(err){throw Error(err)}
        },

},
    User:{
        email:(parent)=> parent.email || '',
        name:(parent)=> parent.name || '',
        password:(parent)=> parent.password || '',
    },
};module.exports=resolvers;//export resolvers