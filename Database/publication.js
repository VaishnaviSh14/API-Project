const mongoose = require("mongoose");


//createing publication schema(blueprint)

const PublicationSchema = mongoose.Schema(
    {
        id:String,
        name:String,
        books:[String]
    }

);
//model

const PublicationModel = mongoose.model("publications",PublicationSchema);//databse name and schema name

module.exports =PublicationModel;