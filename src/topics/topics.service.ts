import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topics.entity';
import { CreateTopicDto, UpdateTopicDto } from 'src/DTOs/topic.dto';
import { UserCompletedTopic } from './user-completed.entity';

// import { UserCompletedTopic } from 'src/user-completed-topics/user-completed.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    @InjectRepository(UserCompletedTopic)
    private userCompletedTopicRepository: Repository<UserCompletedTopic>,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const { subjectId, ...topicData } = createTopicDto;
    const topic = this.topicsRepository.create({
      ...topicData,
      subject: { id: subjectId },
    });
    return this.topicsRepository.save(topic);
  }

  findAll(): Promise<Topic[]> {
    return this.topicsRepository.find();
  }

  async findAllBySubjectId(
    subjectId: string,
  ): Promise<{ error: boolean; message: string; topics: Topic[] }> {
    const topics = await this.topicsRepository.find({
      where: { subject: { id: subjectId } },
    });
    return { error: false, message: 'Topics retrieved successfully', topics };
  }

  findOneById(id: string): Promise<Topic> {
    return this.topicsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    await this.topicsRepository.update(id, updateTopicDto);
    return this.topicsRepository.findOne({ where: { id } });
  }

  async findTopicsWithCompletionStatus(
    userId: string,
    subjectId: string,
  ): Promise<any> {
    const topics = await this.topicsRepository.find({
      where: { subject: { id: subjectId } },
    });
    const completedTopics = await this.userCompletedTopicRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'topic'],
    });
    const completedTopicIds = new Set(completedTopics.map((ct) => ct.topic.id));
    const topicsWithCompletionStatus = topics.map((topic) => {
      const isCompleted = completedTopicIds.has(topic.id);
      return {
        ...topic,
        isCompleted,
      };
    });
    return {
      error: false,
      message: 'Topics retrieved successfully',
      topics: topicsWithCompletionStatus,
    };
  }

  /**
   * Retrieves the ranking of users by subject ID, with no pagination.
   *
   * @param subjectId - The ID of the subject.
   * @returns An object containing the ranking of users and information about the ranking.
   */
  async findRankingBySubjectId(subjectId: string): Promise<{
    error: boolean;
    message: string;
    ranking: {
      username: string;
      noTopicsCompleted: number;
      noTopicsRemaining: number;
      percentageCompletion: number;
      rank: number;
    }[];
    total: number;
  }> {
    // get list of user completed topics
    const completedTopics = await this.userCompletedTopicRepository.find({
      where: {
        topic: { subject: { id: subjectId } },
        user: { role: 'learner' },
      },
      relations: ['user', 'topic'],
    });

    // calculate the subject's total number of topics
    const totalTopics: number = (
      await this.topicsRepository.find({
        where: { subject: { id: subjectId } },
      })
    ).length;

    // aggregate user progress
    const userProgress: {
      [userId: string]: {
        userId: string;
        username: string;
        rank: number;
        noTopicsCompleted: number;
        noTopicsRemaining: number;
        percentageCompletion: number;
      };
    } = {};

    completedTopics.forEach((topic) => {
      const userId = topic.user.id;
      if (!userProgress[userId]) {
        userProgress[userId] = {
          userId,
          rank: 0,
          username: topic.user.username,
          noTopicsCompleted: 0,
          noTopicsRemaining: 0,
          percentageCompletion: 0,
        };
      }
      userProgress[userId].noTopicsCompleted += 1;
    });

    Object.values(userProgress).forEach((user) => {
      user.noTopicsRemaining = totalTopics - user.noTopicsCompleted;
      user.percentageCompletion =
        (user.noTopicsCompleted / totalTopics) * 100 || 0;
    });

    // convert to array and sort by number of completed topics
    const sortedUsers = Object.values(userProgress).sort(
      (a, b) => b.noTopicsCompleted - a.noTopicsCompleted,
    );

    // assign ranks
    let currentRank = 1;
    let previousCompleted = sortedUsers[0]?.noTopicsCompleted || 0;

    sortedUsers.forEach((user, index) => {
      if (user.noTopicsCompleted < previousCompleted) {
        currentRank = index + 1;
      }
      user.rank = currentRank;
      previousCompleted = user.noTopicsCompleted;
    });

    // return the ranking
    return {
      error: false,
      message: 'Ranking retrieved successfully',
      ranking: sortedUsers,
      total: sortedUsers.length,
    };
  }

  async completeTopic(topicId: string, userId: string) {
    const userCompletedTopic =
      await this.userCompletedTopicRepository.findOneBy({
        topic: { id: topicId },
        user: { id: userId },
      });
    if (userCompletedTopic) {
      return;
    }
    const newTopic = this.userCompletedTopicRepository.create({
      topic: { id: topicId },
      user: { id: userId },
    });
    await this.userCompletedTopicRepository.save(newTopic);
  }
  async remove(id: number): Promise<void> {
    await this.topicsRepository.delete(id);
  }
}
