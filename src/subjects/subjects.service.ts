import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subjects.entity';
import { UserCompletedSubject } from './subject-completed.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(UserCompletedSubject)
    private readonly userCompletedSubjecRepository: Repository<UserCompletedSubject>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10) {
    try {
      const [subjects, total] = await this.subjectRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      const totalPages = Math.ceil(total / limit);
      return {
        error: false,
        message: 'subject list retrieved',
        subjects,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findTopSubjects() {
    try {
      const subjects = await this.subjectRepository.find({
        take: 20,
        order: {
          id: 'DESC',
        },
      });
      const randomSubjects = subjects
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      return {
        error: false,
        message: 'Top 6 random subjects retrieved',
        subjects: randomSubjects,
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string) {
    return this.subjectRepository.findOne({
      where: { id },
      relations: ['topics'],
    });
  }

  async create(subject: Partial<Subject>) {
    try {
      const existingSubject = await this.subjectRepository.findOne({
        where: { name: subject.name },
      });
      if (existingSubject) {
        throw new HttpException(
          'Subject with this name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newSubject = this.subjectRepository.create(subject);
      return await this.subjectRepository.save(newSubject);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findSubjectsWithCompletionStatus(
    userId: string,
    subjectId: string,
    page = 1,
    limit = 10,
  ) {
    try {
      const [subjects, total] = await this.subjectRepository.findAndCount({
        where: { id: subjectId },
        skip: (page - 1) * limit,
        take: limit,
      });
      const completedSubjects = await this.userCompletedSubjecRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'subject'],
      });
      const completedSubjectIds = new Set(
        completedSubjects.map((ct) => ct.subject.id),
      );
      const subjectsWithCompletionStatus = subjects.map((subject) => {
        const isCompleted = completedSubjectIds.has(subject.id);
        return {
          ...subject,
          isCompleted,
        };
      });
      const totalPages = Math.ceil(total / limit);
      return {
        error: false,
        message: 'Subjects retrieved successfully',
        subjects: subjectsWithCompletionStatus,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCompletionStatus(
    userId: string,
    subjectId: string,
    isCompleted: boolean,
  ) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const subject = await this.subjectRepository.findOneBy({ id: subjectId });
      if (!subject) {
        throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
      }

      const userCompletedSubject =
        await this.userCompletedSubjecRepository.findOneBy({
          user,
          subject,
        });

      if (userCompletedSubject && isCompleted) {
        return;
      }

      const newCompletedSubject = this.userCompletedSubjecRepository.create({
        user,
        subject,
      });

      if (isCompleted) {
        await this.userCompletedSubjecRepository.save(newCompletedSubject);
      } else {
        await this.userCompletedSubjecRepository.remove(newCompletedSubject);
      }
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
