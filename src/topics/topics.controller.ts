import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from 'src/DTOs/topic.dto';
import { JwtAuthGuard } from 'src/auth/auth.guards';
import { User } from 'src/auth/auth.decorator';

@UseGuards(JwtAuthGuard)
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':subjectId')
  findAllBySubjectId(@Param('subjectId') subjectId: string) {
    return this.topicsService.findAllBySubjectId(subjectId);
  }

  @Get('/:subjectId/with-completion-status/')
  async findTopicsWithCompletionStatus(
    @User() user: any,
    @Param('subjectId') subjectId: string,
  ): Promise<any[]> {
    return this.topicsService.findTopicsWithCompletionStatus(
      user.userId,
      subjectId,
    );
  }

  @Get('/:subjectId/ranking')
  findRankingBySubjectId(@Param('subjectId') subjectId: string) {
    return this.topicsService.findRankingBySubjectId(subjectId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOneById(id);
  }
  @Post(':id/complete')
  completeTopic(@Param('id') id: string, @User() user: any) {
    return this.topicsService.completeTopic(id, user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }
}
