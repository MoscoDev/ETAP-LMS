import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic } from './topics.entity';
import { Subject } from 'src/subjects/subjects.entity';
import { User } from 'src/users/user.entity';
import { UserCompletedTopic } from './user-completed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic, Subject, User, UserCompletedTopic]),
  ],
  providers: [TopicsService],
  controllers: [TopicsController],
})
export class TopicsModule {}
