import { Topic } from 'src/topics/topics.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('varchar')
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];
}
