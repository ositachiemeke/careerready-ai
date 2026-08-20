import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  import { FrameworkRepository } from '../repositories/framework.repository';
  import { ConceptRepository } from '../../concepts/repositories/concept.repository';
  
  import { FrameworkMapper } from '../mappers/framework.mapper';
  
  import { CreateFrameworkDto } from '../dto/create-framework.dto';
  import { UpdateFrameworkDto } from '../dto/update-framework.dto';
  
  @Injectable()
  export class FrameworksService {
    constructor(
      private readonly frameworkRepository: FrameworkRepository,
  
      private readonly conceptRepository: ConceptRepository,
    ) {}
  
    async create(
      dto: CreateFrameworkDto,
    ) {
      const concept =
        await this.conceptRepository.findById(
          dto.conceptId,
        );
  
      if (!concept) {
        throw new NotFoundException(
          'Concept not found',
        );
      }
  
      const existingCode =
        await this.frameworkRepository.findByCode(
          dto.code,
        );
  
      if (existingCode) {
        throw new ConflictException(
          'Framework code already exists',
        );
      }
  
      const existingName =
        await this.frameworkRepository.findByConceptAndName(
          dto.conceptId,
          dto.name,
        );
  
      if (existingName) {
        throw new ConflictException(
          'Framework already exists for this concept',
        );
      }
  
      const framework =
        FrameworkMapper.toCreate(dto);
  
      const existingSlug =
        await this.frameworkRepository.findBySlug(
          framework.slug,
        );
  
      if (existingSlug) {
        throw new ConflictException(
          'Framework slug already exists',
        );
      }
  
      return this.frameworkRepository.create(
        framework,
      );
    }
  
    async findAll() {
      return this.frameworkRepository.findMany();
    }
  
    async findOne(id: string) {
      const framework =
        await this.frameworkRepository.findById(
          id,
        );
  
      if (!framework) {
        throw new NotFoundException(
          'Framework not found',
        );
      }
  
      return framework;
    }
  
    async update(
      id: string,
      dto: UpdateFrameworkDto,
    ) {
      const framework =
        await this.frameworkRepository.findById(
          id,
        );
  
      if (!framework) {
        throw new NotFoundException(
          'Framework not found',
        );
      }
  
      if (
        dto.conceptId &&
        dto.conceptId !== framework.conceptId
      ) {
        const concept =
          await this.conceptRepository.findById(
            dto.conceptId,
          );
  
        if (!concept) {
          throw new NotFoundException(
            'Concept not found',
          );
        }
      }
  
      if (
        dto.code &&
        dto.code !== framework.code
      ) {
        const existingCode =
          await this.frameworkRepository.findByCode(
            dto.code,
          );
  
        if (
          existingCode &&
          existingCode.id !== id
        ) {
          throw new ConflictException(
            'Framework code already exists',
          );
        }
      }
  
      if (dto.name) {
        const conceptId =
          dto.conceptId ??
          framework.conceptId;
  
        const existingName =
          await this.frameworkRepository.findByConceptAndName(
            conceptId,
            dto.name,
          );
  
        if (
          existingName &&
          existingName.id !== id
        ) {
          throw new ConflictException(
            'Framework already exists for this concept',
          );
        }
  
        const update =
          FrameworkMapper.toUpdate(dto);
  
        if (update.slug) {
          const existingSlug =
            await this.frameworkRepository.findBySlug(
              update.slug as string,
            );
  
          if (
            existingSlug &&
            existingSlug.id !== id
          ) {
            throw new ConflictException(
              'Framework slug already exists',
            );
          }
        }
  
        return this.frameworkRepository.update(
          id,
          update,
        );
      }
  
      return this.frameworkRepository.update(
        id,
        FrameworkMapper.toUpdate(dto),
      );
    }
  
    async remove(id: string) {
      const framework =
        await this.frameworkRepository.findById(
          id,
        );
  
      if (!framework) {
        throw new NotFoundException(
          'Framework not found',
        );
      }
  
      await this.frameworkRepository.softDelete(
        id,
      );
  
      return {
        message:
          'Framework deleted successfully',
      };
    }
  
    async restore(id: string) {
      const framework =
        await this.frameworkRepository.findByIdIncludingDeleted(
          id,
        );
  
      if (!framework) {
        throw new NotFoundException(
          'Framework not found',
        );
      }
  
      return this.frameworkRepository.restore(
        id,
      );
    }
  }