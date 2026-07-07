import { Injectable } from '@nestjs/common';

import { AssessmentTypeRepository } from '../repositories/assessment-type.repository';

import { CreateAssessmentTypeDto } from '../dto/create-assessment-type.dto';
import { UpdateAssessmentTypeDto } from '../dto/update-assessment-type.dto';

@Injectable()
export class AssessmentTypesService {
  constructor(
    private readonly repository: AssessmentTypeRepository,
  ) {}

  async create(dto: CreateAssessmentTypeDto) {
    return this.repository.create(dto);
  }

  async findAll() {
    return this.repository.findMany();
  }

  async findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    dto: UpdateAssessmentTypeDto,
  ) {
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    return this.repository.softDelete(id);
  }

  async restore(id: string) {
    return this.repository.restore(id);
  }
}