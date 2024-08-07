import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subjects.entity';
import { JwtAuthGuard } from 'src/auth/auth.guards';
import { User } from 'src/auth/auth.decorator';
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.subjectsService.findAll(page, limit);
  }
  @Get('/top-picks')
  findTopSubjects() {
    return this.subjectsService.findTopSubjects();
  }

  @Get('/with-completion-status')
  async findCompletedSubjects(
    @User() user: any,
    @Param('subjectId') subjectId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.subjectsService.findSubjectsWithCompletionStatus(
      user.userId,
      subjectId,
      page,
      limit,
    );
  }
  @Post(':id/complete')
  completeTopic(@Param('id') id: string, @User() user: any) {
    return this.subjectsService.updateCompletionStatus(user.userId, id, true);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Post()
  create(@Body() subject: Partial<Subject>) {
    return this.subjectsService.create(subject);
  }
}
