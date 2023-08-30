import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const newBook = await this.bookModel.create(book);
    return newBook;
  }
}
