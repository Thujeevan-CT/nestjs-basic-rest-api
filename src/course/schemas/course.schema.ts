import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  Tech = 'tech',
  Business = 'business',
  Health = 'health',
}
export enum Status {
  Active = 'active',
  InActive = 'inactive',
}

@Schema({
  timestamps: true,
})
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: Object.values(Category) })
  category: Category;

  @Prop({ default: Status.Active, enum: Object.values(Status) })
  status: Status;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
