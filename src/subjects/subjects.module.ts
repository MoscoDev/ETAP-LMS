import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/topics/topics.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { Subject } from './subjects.entity';
import { UserCompletedSubject } from './subject-completed.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, Topic, UserCompletedSubject, User]),
  ],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
