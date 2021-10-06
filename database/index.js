const books = [
    {
        ISBN: "12345ONE",
        title: "Getting started with MERN",
        authors: [1, 3],
        language: "en",
        pubdate: "2021-07-07",
        nopage: 220,
        category: ["fiction", "tech"],
        publication :1,
    },
    {
        ISBN: "12345TWO",
        title: "Getting started with MERN",
        authors: [2, 3],
        language: "en",
        pubdate: "2021-07-07",
        nopage: 220,
        category: ["fiction", "tech"],
        publication :1,
    }];

const authors = [
    {
        id: 1,
        name: "Aneesh",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "Avneesh",
        books: ["12345TWO"],
    }];

const publications = [
    {
        id:1,
        name:"Chakra",
        books:["12345ONE"],
    },
    {
        id:2,
        name:"CB",
        books:["12345TWO"],
    }];

    module.exports={books,authors,publications};