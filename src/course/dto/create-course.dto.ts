import { Category, Status } from '../schemas/course.schema';

export class CreateCourseDto {
  readonly title: string;
  readonly description: string;
  readonly category: Category;
  readonly status: Status;
}
