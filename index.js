require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database
const database = require("./Database/Database");

//model
const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");


//initialise express
const BookishBliss = express();

BookishBliss.use(bodyParser.urlencoded({extended:true}));
BookishBliss.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL )
  .then(() => console.log('Connected!'));




/*
Route              /
Description        Get all the books
Access             PUBLIC
Parameter          NONE
Methods             GET
*/

BookishBliss.get("/",async(req,res)=>{

    const getAllBooks = await BookModel.find();
return res.json(getAllBooks);
});

/*
Route              /is
Description        Get specific book
Access             PUBLIC
Parameter          isbn
Methods            GET
*/

BookishBliss.get("/is/:isbn",async(req,res)=>{

    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});

    if(!getSpecificBook){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json({book:getSpecificBook});
});

/*
Route              /c
Description        Get specific  book based on category
Access             PUBLIC
Parameter          category
Methods             GET
*/

BookishBliss.get("/c/:category",async(req,res)=>{
    const getSpecificBook = await BookModel.findOne({category:req.params.category});

    if(!getSpecificBook){
        return res.json({error:`No book found for the category of ${req.params.category}`})
    }

    return res.json({book:getSpecificBook});
});

/*
Route              /l
Description        Get specific  book based on language
Access             PUBLIC
Parameter          language
Methods             GET
*/

BookishBliss.get("/l/:language",async(req,res)=>{
    const getSpecificBook = await BookModel.findOne({language:req.params.language});

    if(!getSpecificBook){
        return res.json({error:`No book found for the category of ${req.params.language}`})
    }

    return res.json({book:getSpecificBook});
});



/*
Route              /author
Description        Get authors
Access             PUBLIC
Parameter          NONE
Methods             GET
*/

BookishBliss.get("/author",async(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
   
});


/*
Route              /author/id/
Description        Get all authors based on id
Access             PUBLIC
Parameter          isbn
Methods            GET
*/

BookishBliss.get("/author/id/:isbn",async(req,res)=>{

    const getSpecificAuthor = await AuthorModel.findOne({id:req.params.isbn})

    if(!getSpecificAuthor){
        return res.json({error:`No author found for the book of ${req.params.isbn}`})
    }

    return res.json({author:getSpecificAuthor});
});





/*
Route              /author/book
Description        Get all authors based on books
Access             PUBLIC
Parameter          isbn
Methods            GET
*/

BookishBliss.get("/author/book/:isbn",async(req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({books:req.params.isbn})

    if(!getSpecificAuthor){
        return res.json({error:`No author found for the book of ${req.params.isbn}`})
    }
    return res.json({author:getSpecificAuthor});

});

/*
Route              /publication
Description        Get all publications
Access             PUBLIC
Parameter          NONE
Methods            GET
*/

BookishBliss.get("/publication",async(req,res)=>{

    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
   
});

/*
Route              /publication/id
Description        Get all publications
Access             PUBLIC
Parameter          isbn
Methods            GET
*/

BookishBliss.get("/publication/id/:isbn",async(req,res)=>{
    const getSpecificPublication = await PublicationModel.findOne({id:req.params.isbn});

    if(!getSpecificPublication){
        return res.json({error:`No publication found for the book of ${req.params.isbn}`})
    }

    return res.json({publication:getSpecificPublication});
});




/*
Route              /publication/book/
Description        Get all publications based on book
Access             PUBLIC
Parameter          isbn
Methods            GET
*/

BookishBliss.get("/publication/book/:isbn",async(req,res)=>{
    const getSpecificPublication = await PublicationModel.findOne({books:req.params.isbn});

    if(!getSpecificPublication){
        return res.json({error:`No publication found for the book of ${req.params.isbn}`})
    }
    return res.json({publication:getSpecificPublication});

});

/*
Route              /book/new
Description        Add new books
Access             PUBLIC
Parameter          NONE
Methods            POST
*/

BookishBliss.post("/book/new",async(req,res)=>{
        const {newBook} = req.body;
        const addNewBook = BookModel.create(newBook);
        return res.json({
            books:addNewBook,
            message:"Book was added"
        });
});

/*
Route              /author/new
Description        Add new authors
Access             PUBLIC
Parameter          NONE
Methods            POST
*/

BookishBliss.post("/author/new",async(req,res)=>{
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);

    return res.json({
        author:addNewAuthor,
        message:"Added new author"
    });

});

/*
Route              /publication/new
Description        Add new publications
Access             PUBLIC
Parameter          NONE
Methods            POST
*/

BookishBliss.post("/publication/new",async(req,res)=>{
    const {newPublication} = req.body;
const addNewPublication = PublicationModel.create(newPublication);

 return res.json({
    publication:addNewPublication,
    message:"Added new publication"
 });

});

//put//

/*
Route              /book/update/
Description        update book on isbn
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/

 BookishBliss.put("/book/update/:isbn",async(req,res)=>{
const updatedBook = await BookModel.findOneAndUpdate(
    {
    ISBN:req.params.isbn
    },
    {
        //what you want to update
        title:req.body.bookTitle
    },
    {
        //update the book on backend and show the new book on frontend
        new:true
    }
);

return res.json({books:updatedBook});

 });

/*
Route              /book/author/update
Description        update new author
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/

BookishBliss.put("/book/author/update/:isbn",async(req,res)=>{
//update book database
const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN:req.params.isbn
    },
    {
       $addToSet:{
        author:req.body.newAuthor
       }
    },
    {
        new:true
    }
    
);



// update the author database
 const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
          id:req.body.newAuthor
    },
    {
        $addToSet:{
          books:req.params.isbn
        }
    },
    {
        new:true
    }
 )
 return res.json({
    books:updatedBook,
    author:updatedAuthor,
    message:"new author was added"
 })
});







/*
Route              /publication/update/book
Description        Add/Update new publication
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/

BookishBliss.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publication.forEach((pub)=>{
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });

//update the book database
    database.books.forEach((book)=>{
       if(book.ISBN === req.params.isbn){
             book.publications = req.body.pubId;
             return;
    }
});
return res.json(
    {
    books:database.books,
    publications:database.publication,
    message:"Sucessfully update publication"
})
});

/*
Route              /book/delete
Description        Delete a book
Access             PUBLIC
Parameter          isbn
Methods            DELETE
*/

BookishBliss.delete("/book/delete/:isbn",async(req,res)=>{
const updateBookDatabse = await BookModel.findOneAndDelete(
    {
        ISBN:req.params.isbn
    },
    
);
return res.json({
    books:updateBookDatabse
});

});

/*
Route              /author/delete
Description        Delete a author
Access             PUBLIC
Parameter          authorId
Methods            DELETE
*/

BookishBliss.delete("/author/delete/:authorId", (req, res) => {
    const updateAuthorDatabase = database.author.filter((author) => author.id !== req.params.authorId);
    database.author = updateAuthorDatabase;
  
    return res.json({ author: database.author });
  });


  /*
Route              /book/delete/author
Description        Delete  author from book related book from author
Access             PUBLIC
Parameter          isbn,authorId
Methods            DELETE

*/

BookishBliss.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor)=>eachAuthor !== parseInt(req.params.authorId)

            );
            book.author = newAuthorList;
            return;
        }
    });

    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id === req.params.authorId){
            const newBookList = eachAuthor.books.filter(
                (book)=>book !== req.params.isbn

            );
            eachAuthor.books = newBookList;
            return;
        }
    });


return res.json({
    book:database.books,
    author:database.author,
    message:"Author was deleted"
});

});



BookishBliss.listen(3000,()=>{
    console.log("server 3000 is up and running");
});
