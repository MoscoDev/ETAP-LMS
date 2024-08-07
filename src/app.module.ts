import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Topic } from './topics/topics.entity';
import { UserCompletedTopic } from './topics/user-completed.entity';
import { User } from './users/user.entity';
import { Subject } from './subjects/subjects.entity';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserCompletedSubject } from './subjects/subject-completed.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', ''),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', ''),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_DATABASE', ''),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [
          User,
          Subject,
          Topic,
          UserCompletedTopic,
          UserCompletedSubject,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Subject, Topic]),
    UsersModule,
    SubjectsModule,
    TopicsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
