import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  import { ConceptMapper } from '../mappers/concept.mapper';
  
  import { ConceptRepository } from '../repositories/concept.repository';
  import { TopicRepository } from '../../topics/repositories/topic.repository';
  
  import { CreateConceptDto } from '../dto/create-concept.dto';
  import { UpdateConceptDto } from '../dto/update-concept.dto';
  
  @Injectable()
  export class ConceptsService {
    constructor(
      private readonly repository: ConceptRepository,
  
      private readonly topicRepository: TopicRepository,
    ) {}
  
    async create(
      dto: CreateConceptDto,
    ) {
      await this.ensureTopicExists(dto.topicId);
  
      await this.ensureUniqueCode(dto.code);
  
      await this.ensureUniqueSlug(dto.slug);
  
      return this.repository.create(
        ConceptMapper.toCreate(dto),
      );
    }
  
    async findAll() {
      return this.repository.findMany();
    }
  
    async findOne(
      id: string,
    ) {
      return this.ensureConceptExists(id);
    }
  
    async update(
      id: string,
      dto: UpdateConceptDto,
    ) {
      const concept =
        await this.ensureConceptExists(id);
  
      if (
        dto.topicId &&
        dto.topicId !== concept.topicId
      ) {
        await this.ensureTopicExists(
          dto.topicId,
        );
      }
  
      if (
        dto.code &&
        dto.code !== concept.code
      ) {
        await this.ensureUniqueCode(dto.code);
      }
  
      if (
        dto.slug &&
        dto.slug !== concept.slug
      ) {
        await this.ensureUniqueSlug(dto.slug);
      }
  
      return this.repository.update(
        id,
        ConceptMapper.toUpdate(dto),
      );
    }
  
    async remove(
      id: string,
    ) {
      await this.ensureConceptExists(id);
  
      return this.repository.softDelete(id);
    }
  
    async restore(
      id: string,
    ) {
      const concept =
        await this.repository.findByIdIncludingDeleted(
          id,
        );
  
      if (!concept) {
        throw new NotFoundException(
          'Concept not found.',
        );
      }
  
      return this.repository.restore(id);
    }
  
    private async ensureTopicExists(
      topicId: string,
    ) {
      const topic =
        await this.topicRepository.findById(
          topicId,
        );
  
      if (!topic) {
        throw new BadRequestException(
          'Topic does not exist.',
        );
      }
  
      return topic;
    }
  
    private async ensureUniqueCode(
      code: string,
    ) {
      const existing =
        await this.repository.findByCode(
          code,
        );
  
      if (existing) {
        throw new BadRequestException(
          'Concept code already exists.',
        );
      }
    }
  
    private async ensureUniqueSlug(
      slug: string,
    ) {
      const existing =
        await this.repository.findBySlug(
          slug,
        );
  
      if (existing) {
        throw new BadRequestException(
          'Concept slug already exists.',
        );
      }
    }
  
    private async ensureConceptExists(
      id: string,
    ) {
      const concept =
        await this.repository.findById(id);
  
      if (!concept) {
        throw new NotFoundException(
          'Concept not found.',
        );
      }
  
      return concept;
    }
  }