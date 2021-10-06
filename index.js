//Framework
const express = require("express");

//Database
const database =require("./database/index")

// Initializing express
const bookapi=express();

//configurations
bookapi.use(express.json());

/*
Route                   /
Description           get all books
Acccess               PUBLIC
Parameters            NONE
Method                GET
*/
bookapi.get("/",(request,response) => {
    return response.json({books: database.books});
});


/*
Route                   /is
Description           get specific books based on ISBN
Acccess               PUBLIC
Parameters            isbn
Method                GET
*/
bookapi.get("/is/:isbn",(req,res) => {
    const getSpecificbook = database.books.filter((book) =>
        book.ISBN === req.params.isbn
    );
    if( getSpecificbook.length === 0 ) {
        return res.json({error:`No Specific book of ISBN of ${req.params.isbn}`})
    }
    return res.json({books: getSpecificbook});
});

/*
Route                   /category
Description           get specific books based on category
Acccess               PUBLIC
Parameters            category
Method                GET
*/

bookapi.get("/c/:category",(req,res) => {
    const getSpecificbooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
);
if( getSpecificbooks.length === 0 ) {
    return res.json({error:`No Specific book of category of ${req.params.category}`})
}
return res.json({books: getSpecificbooks});
});

/*
Route                   /a
Description           get specific books based on authors
Acccess               PUBLIC
Parameters            author
Method                GET
*/

bookapi.get("/a/:author",(req,res) => {
    const getauthorSpecificbooks = database.books.filter((book) =>
     book.authors.includes(parseInt(req.params.author))
);
if( getauthorSpecificbooks.length === 0 ) {
    return res.json({error:`No Specific book of author of ${req.params.author}`})
}
return res.json({books: getauthorSpecificbooks});
});

/*
Route                   /author
Description           get all AUTHORS
Acccess               PUBLIC
Parameters            NONE
Method                GET
*/

bookapi.get("/author",(request,response) => {
    return response.json({authors: database.authors});
});

/*
Route                   /author/a
Description           get all specific AUTHORS based on id
Acccess               PUBLIC
Parameters            id
Method                GET
*/

bookapi.get("/author/a/:Id",(req,res) => {
    const getSpecificauthor = database.authors.filter((author) =>
    author.id === parseInt(req.params.Id)
    );
    if( getSpecificauthor.length === 0 ) {
        return res.json({error:`No Specific author of ${req.params.Id}`})
    }
    return res.json({authors: getSpecificauthor});
});

/*
Route                 /author/b
Description           get all AUTHORS based on books
Acccess               PUBLIC
Parameters            isbn
Method                GET
*/

bookapi.get("/author/b/:isbn" , (req,res) => {
    const getSpecificauthors = database.authors.filter((author) =>
        author.books.includes(req.params.isbn)
    );
    if( getSpecificauthors.length === 0 ) {
        return res.json({error:`No Specific book of author of ${req.params.isbn}`})
    }
    return res.json({authors: getSpecificauthors});
});

/*
Route                 /p
Description           get all publications
Acccess               PUBLIC
Parameters            publication
Method                GET
*/

bookapi.get("/:publication",(request,response) => {
    return response.json({publications: database.publications});
});

/*
Route                 /publication
Description           get all publications BASED ON id
Acccess               PUBLIC
Parameters            Id
Method                GET
*/

bookapi.get("/publication/:Id",(req,res) => {
    const getSpecificpublication = database.publications.filter((publication) =>
    publication.id === parseInt(req.params.Id)
    );
    if( getSpecificpublication.length === 0 ) {
        return res.json({error:`No Specific publication of ${req.params.Id}`})
    }
    return res.json({publication: getSpecificpublication});
});

/*
Route                 /publication/p
Description           get all publications based on books
Acccess               PUBLIC
Parameters            isbn
Method                GET
*/

bookapi.get("/publication/p/:isbn" , (req,res) => {
    const getSpecificpublications = database.publications.filter((publication) =>
    publication.books.includes(req.params.isbn)
    );
    if( getSpecificpublications.length === 0 ) {
        return res.json({error:`No Specific publication of books of ${req.params.isbn}`})
    }
    return res.json({publication: getSpecificpublications});
});

/*
Route                 /book/new
Description           add new books
Acccess               PUBLIC
Parameters            none
Method                POST
*/

bookapi.post("/book/new", (req,res) => {
   const { newBook } = req.body;

   database.books.push(newBook);

   return res.json({books:database.books , message :"Book was added"})
});

/*
Route                 /author/new
Description           add new authors
Acccess               PUBLIC
Parameters            none
Method                POST
*/

bookapi.post("/author/new", (req,res) => {
    const { newAuthor } = req.body;
 
    database.authors.push(newAuthor);
 
    return res.json({books:database.authors , message :"Author was added"})
 })

 /*
Route                 /publication/new
Description           add new publication
Acccess               PUBLIC
Parameters            none
Method                POST
*/

bookapi.post("/publication/new", (req,res) => {
    const { newPublication } = req.body;
 
    database.publications.push(newPublication);
 
    return res.json({books:database.publications , message :"publications was added"})
 });

 /*
Route                 /book/update
Description           Update title of book
Acccess               PUBLIC
Parameters            isbn
Method                PUT
*/

bookapi.put("/book/update/:isbn",(req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            book.title = req.body.bookTitle ;
            return ;
        }
    });
    return res.json({books:database.books})
});

/*
Route                 /book/author/update
Description           Update or add author
Acccess               PUBLIC
Parameters            isbn
Method                PUT
*/

bookapi.put("/book/author/update/:isbn",(req,res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            return book.authors.push(req.body.newAuthor) ;
        }
    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor)
        {
            return author.books.push(req.params.isbn) ;
        }
    });
    
    return res.json({books:database.books ,authors: database.authors , message : "Author added"})
});

/*
Route                 /author/update
Description           Update author details
Acccess               PUBLIC
Parameters            Id
Method                PUT
*/
bookapi.put("/author/update/:Id" , (req,res) => {
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.Id))
        {
           author.name = req.body.authorname;
           return;
        }
    });
    return res.json({authors:database.authors})
});

/*
Route                 /publication/update
Description           Update publication details
Acccess               PUBLIC
Parameters            Id
Method                PUT
*/

bookapi.put("/publication/update/:Id" , (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.Id))
        {
            publication.name = req.body.publicationname;
           return;
        }
    });
    return res.json({publications:database.publications})
});

/*
Route                 /books/publication/update
Description           Update or add publication
Acccess               PUBLIC
Parameters            isbn
Method                PUT
*/

bookapi.put("/book/publication/update/:isbn",(req,res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn)
        {
            return book.publication = req.body.newpublication;
        }
    });
    //update publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.newpublication)
        {
            return publication.books.push(req.params.isbn) ;
        }
    });
    
    return res.json({books:database.books ,publications: database.publications , message : "Author added"})
});



bookapi.listen(3000,() => console.log ("Server is running"));