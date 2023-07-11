const mongoose = require("mongoose");


//createing publication schema(blueprint)

const AuthorSchema = mongoose.Schema(
    {
        id:String,
        name:String,
        books:[String]
    }

);
//model

const AuthorModel = mongoose.model("authors",AuthorSchema);//databse name and schema name

module.exports =AuthorModel;