import { AssessmentType, Topic } from '@prisma/client';

import {
  AssessmentTypeSummaryDto,
  TopicResponseDto,
} from '../dto/topic-response.dto';

export class TopicMapper {
  static toResponse(
    topic: Topic & {
      assessmentType: AssessmentType;
    },
  ): TopicResponseDto {
    return {
      id: topic.id,
      code: topic.code,
      name: topic.name,
      slug: topic.slug,
      description: topic.description ?? undefined,
      sortOrder: topic.sortOrder,
      assessmentType: {
        id: topic.assessmentType.id,
        code: topic.assessmentType.code,
        name: topic.assessmentType.name,
      },
    };
  }

  static toResponseList(
    topics: Array<
      Topic & {
        assessmentType: AssessmentType;
      }
    >,
  ): TopicResponseDto[] {
    return topics.map((topic) => this.toResponse(topic));
  }
}