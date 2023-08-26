import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdatedCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async getAllBooks(): Promise<Course[]> {
    return this.courseService.findAllCourses();
  }

  @Get('/:id')
  async findBook(
    @Param('id')
    id: string,
  ): Promise<Course> {
    return this.courseService.findCourse(id);
  }

  @Post('/create')
  async createCourse(
    @Body()
    course: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.createCourse(course);
  }

  @Put('/update/:id')
  async updateCourse(
    @Param('id')
    id: string,

    @Body()
    course: UpdatedCourseDto,
  ): Promise<Course> {
    return this.courseService.updateById(id, course);
  }
}
