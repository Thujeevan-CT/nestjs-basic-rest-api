import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: mongoose.Model<Course>,
  ) {}

  async findAllCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find();
    return courses;
  }

  async createCourse(course: Course): Promise<Course> {
    const courseRes = await this.courseModel.create(course);
    return courseRes;
  }

  async findCourse(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found!');
    }

    return course;
  }

  async updateById(id: string, course: Course): Promise<Course> {
    const data = await this.courseModel.findById(id);
    if (!data) {
      throw new NotFoundException('Course not found!');
    }

    const updated = this.courseModel.findByIdAndUpdate(id, course, {
      new: true,
      runValidators: true,
    });

    return updated;
  }
}
