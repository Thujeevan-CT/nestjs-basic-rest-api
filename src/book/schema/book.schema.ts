import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum BookCategory {
  Fiction = 'fiction',
  NonFiction = 'non-fiction',
}

@Schema({
  timestamps: false,
})
export class Book {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: Object.values(BookCategory) })
  category: BookCategory;
}

export const BookSchema = SchemaFactory.createForClass(Book);
