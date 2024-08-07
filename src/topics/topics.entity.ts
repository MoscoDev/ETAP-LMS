import { Subject } from 'src/subjects/subjects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  video_url: string;

  @ManyToOne(() => Subject, (subject) => subject.id)
  subject: Subject;
}
