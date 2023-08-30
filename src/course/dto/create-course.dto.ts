import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Category, Status } from '../schemas/course.schema';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'title must be greater than 3 characters!' })
  @MaxLength(64, { message: 'title must be lower than 64 characters!' })
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'description must be greater than 3 characters!' })
  @MaxLength(254, { message: 'description must be lower than 254 characters!' })
  readonly description: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Select the valid category!' })
  readonly category: Category;

  @IsOptional()
  @IsEnum(Status, { message: 'Status not valid!' })
  readonly status: Status;
}
