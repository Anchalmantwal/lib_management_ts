import * as express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = 8000;

app.use(express.json());
const bookschema = new mongoose.Schema(
{    book_name:{
        type: String,
        required: true,
        unique: true,
    },
    author_name:{
        type: String,
        required: true,
    },
    published_year:{
        type: Number,
        required: true,
    }}
)
const Book = mongoose.model("Book", bookschema);

mongoose.connect('mongodb://127.0.0.1:27017/book_collection')
.then(() => console.log("Mongodb connected"))
.catch((error) => console.log("There is an error",error));

app.post('/books_created', async(req ,res) => {
 const {book_name ,author_name ,published_year} = req.body;
 const newBook = new Book({
    book_name, author_name, published_year});
 const saveBook = await newBook.save();
 res.status(201).send(saveBook);
})

console.log(`The server is running on the port ${PORT}`);
