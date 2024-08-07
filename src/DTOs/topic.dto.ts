// create-topic.dto.ts
export class CreateTopicDto {
  name: string;
  description: string;
  subjectId: string;
  video_url: string;
}

// update-topic.dto.ts
export class UpdateTopicDto {
  name?: string;
  description?: string;
  subjectId?: string;
  video_url?: string;
}
