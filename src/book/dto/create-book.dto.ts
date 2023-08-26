import { BookCategory } from '../schema/book.schema';

export class CreateBookDto {
  readonly name: string;
  readonly description: string;
  readonly category: BookCategory;
}
