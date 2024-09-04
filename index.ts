import * as express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
const app = express.default();
const PORT = 8000;

app.use(express.json());
const bookschema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
    unique: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  published_year: {
    type: Number,
    required: true,
  },
});
const Book = mongoose.model("Book", bookschema);

mongoose
  .connect("mongodb://127.0.0.1:27017/book_collection")
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.log("There is an error", error));

app.listen(PORT, () => {
  console.log(`The server is running on the port ${PORT}`);
});

app.get("/", async(req: Request, res: Response) => {
  const getBook = await Book.find({});
  res.status(200).json(getBook);
});

app.get("/:_id", async(req: Request, res: Response) => {
    const id = req.params._id;
    const book = await Book.findById(id);
    res.status(200).json(book);
})

app.post("/books_created", async (req: Request, res: Response) => {
  const { book_name, author_name, published_year } = req.body;
  const newBook = new Book({
    book_name,
    author_name,
    published_year,
  });
  const saveBook = await newBook.save();
  res.status(201).send(saveBook);
});

app.patch("/books_update/:_id" , async (req: Request, res: Response) => {
    const { book_name, author_name, published_year } = req.body;
    const _id = req.params._id;
    const bookupdated = await Book.findByIdAndUpdate(
        _id, 
        {book_name, author_name, published_year}, 
        {new:true});
    res.status(200).send(bookupdated);
});

app.delete("/books_delete/:_id" , async(req: Request, res: Response) => {
    const { book_name, author_name, published_year } = req.body;
    const _id = req.params._id;
    const bookdeleted = await Book.findByIdAndDelete(
        _id
    );
    res.status(200).send(bookdeleted);
})
