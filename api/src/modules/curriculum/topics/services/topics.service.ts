import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  import { TopicRepository } from '../repositories/topic.repository';
  import { AssessmentTypeRepository } from '../../../curriculum/assessment-types/repositories/assessment-type.repository';
  
  import { CreateTopicDto } from '../dto/create-topic.dto';
  import { UpdateTopicDto } from '../dto/update-topic.dto';
  
  import { TopicMapper } from '../mappers/topic.mapper';
  
  @Injectable()
  export class TopicsService {
    constructor(
      private readonly topicRepository: TopicRepository,
      private readonly assessmentTypeRepository: AssessmentTypeRepository,
    ) {}
  
    async create(createTopicDto: CreateTopicDto) {
      const assessmentType =
        await this.assessmentTypeRepository.findById(
          createTopicDto.assessmentTypeId,
        );
  
      if (!assessmentType) {
        throw new NotFoundException(
          'Assessment Type not found.',
        );
      }
  
      const existingCode =
        await this.topicRepository.findByCode(
          createTopicDto.code,
        );
  
      if (existingCode) {
        throw new ConflictException(
          'Topic code already exists.',
        );
      }
  
      const existingSlug =
        await this.topicRepository.findBySlug(
          createTopicDto.slug,
        );
  
      if (existingSlug) {
        throw new ConflictException(
          'Topic slug already exists.',
        );
      }
  
      const {
        assessmentTypeId,
        ...topicData
      } = createTopicDto;
      
      const topic =
        await this.topicRepository.create({
          ...topicData,
          assessmentType: {
            connect: {
              id: assessmentTypeId,
            },
          },
        });
  
      return TopicMapper.toResponse(topic);
    }
  
    async findAll() {
      const topics =
        await this.topicRepository.findMany();
  
      return TopicMapper.toResponseList(topics);
    }
  
    async findOne(id: string) {
      const topic =
        await this.topicRepository.findById(id);
  
      if (!topic) {
        throw new NotFoundException(
          'Topic not found.',
        );
      }
  
      return TopicMapper.toResponse(topic);
    }
  
    async update(
      id: string,
      updateTopicDto: UpdateTopicDto,
    ) {
      const topic =
        await this.topicRepository.findById(id);
  
      if (!topic) {
        throw new NotFoundException(
          'Topic not found.',
        );
      }
  
      if (updateTopicDto.code) {
        const existing =
          await this.topicRepository.findByCode(
            updateTopicDto.code,
          );
  
        if (
          existing &&
          existing.id !== id
        ) {
          throw new ConflictException(
            'Topic code already exists.',
          );
        }
      }
  
      if (updateTopicDto.slug) {
        const existing =
          await this.topicRepository.findBySlug(
            updateTopicDto.slug,
          );
  
        if (
          existing &&
          existing.id !== id
        ) {
          throw new ConflictException(
            'Topic slug already exists.',
          );
        }
      }
  
      const updated =
        await this.topicRepository.update(
          id,
          updateTopicDto,
        );
  
      return TopicMapper.toResponse(updated);
    }
  
    async remove(id: string) {
      const topic =
        await this.topicRepository.findById(id);
  
      if (!topic) {
        throw new NotFoundException(
          'Topic not found.',
        );
      }
  
      await this.topicRepository.softDelete(id);
    }
  
    async restore(id: string) {
      const topic =
        await this.topicRepository.findById(id);
  
      if (!topic) {
        throw new NotFoundException(
          'Topic not found.',
        );
      }
  
      const restored =
        await this.topicRepository.restore(id);
  
      return TopicMapper.toResponse(restored);
    }
  }