const mongoose = require("mongoose");


//createing book schema(blueprint)

const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String ,
        pubDate: String,
        language: String,
        numPage: Number,
        author:[Number],
        publications:[Number],
        category:[String]
    }

);
//model

const BookModel = mongoose.model("books",BookSchema);//databse name and schema name

module.exports =BookModel;