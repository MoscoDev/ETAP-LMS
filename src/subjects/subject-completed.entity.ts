import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subject } from './subjects.entity';

@Entity()
export class UserCompletedSubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.id)
  subject: Subject;

  @CreateDateColumn()
  completed_at: Date;
}
