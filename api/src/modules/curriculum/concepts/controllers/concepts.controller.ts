import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  
  import {
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { ConceptsService } from '../services/concepts.service';
  
  import { CreateConceptDto } from '../dto/create-concept.dto';
  import { UpdateConceptDto } from '../dto/update-concept.dto';
  
  @ApiTags('Concepts')
  @Controller('curriculum/concepts')
  export class ConceptsController {
    constructor(
      private readonly conceptsService: ConceptsService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary: 'Create Concept',
    })
    create(
      @Body()
      dto: CreateConceptDto,
    ) {
      return this.conceptsService.create(dto);
    }
  
    @Get()
    @ApiOperation({
      summary: 'List Concepts',
    })
    findAll() {
      return this.conceptsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Get Concept',
    })
    findOne(
      @Param('id')
      id: string,
    ) {
      return this.conceptsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({
      summary: 'Update Concept',
    })
    update(
      @Param('id')
      id: string,
  
      @Body()
      dto: UpdateConceptDto,
    ) {
      return this.conceptsService.update(
        id,
        dto,
      );
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Delete Concept',
    })
    remove(
      @Param('id')
      id: string,
    ) {
      return this.conceptsService.remove(id);
    }
  
    @Patch(':id/restore')
    @ApiOperation({
      summary: 'Restore Concept',
    })
    restore(
      @Param('id')
      id: string,
    ) {
      return this.conceptsService.restore(id);
    }
  }