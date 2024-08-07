import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Topic } from 'src/topics/topics.entity';

@Entity()
export class UserCompletedTopic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: Topic;

  @CreateDateColumn()
  completed_at: Date;
}
