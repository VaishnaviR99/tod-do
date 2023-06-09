const mongoose=require("mongoose")

const DB= "mongodb+srv://ralegaonkarvaishnavi:nWRyqxJW6Jo2Rspt@cluster0.n5dxfdr.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndexes: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection
