import { Injectable } from '@nestjs/common';
import { AssessmentTypeRepository } from '../repositories/assessment-type.repository';
import { CreateAssessmentTypeDto } from '../dto/create-assessment-type.dto';
import { UpdateAssessmentTypeDto } from '../dto/update-assessment-type.dto';

@Injectable()
export class AssessmentTypesService {
  constructor(
    private readonly repository: AssessmentTypeRepository,
  ) {}

  create(dto: CreateAssessmentTypeDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(
    id: string,
    dto: UpdateAssessmentTypeDto,
  ) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}