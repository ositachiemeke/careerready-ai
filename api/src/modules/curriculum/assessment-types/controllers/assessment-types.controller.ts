import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Delete,
  } from '@nestjs/common';
  import { AssessmentTypesService } from '../services/assessment-types.service';
  import { CreateAssessmentTypeDto } from '../dto/create-assessment-type.dto';
  import { UpdateAssessmentTypeDto } from '../dto/update-assessment-type.dto';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Assessment Types')
  @Controller('curriculum/assessment-types')
  export class AssessmentTypesController {
    constructor(
      private readonly assessmentTypesService: AssessmentTypesService,
    ) {}
  
    @Post()
    create(
      @Body()
      dto: CreateAssessmentTypeDto,
    ) {
      return this.assessmentTypesService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.assessmentTypesService.findAll();
    }
  
    @Get(':id')
    findOne(
      @Param('id', ParseUUIDPipe)
      id: string,
    ) {
      return this.assessmentTypesService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe)
      id: string,
  
      @Body()
      dto: UpdateAssessmentTypeDto,
    ) {
      return this.assessmentTypesService.update(id, dto);
    }
  
    @Delete(':id')
    remove(
      @Param('id', ParseUUIDPipe)
      id: string,
    ) {
      return this.assessmentTypesService.remove(id);
    }
  }