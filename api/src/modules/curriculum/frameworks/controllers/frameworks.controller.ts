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
  
  import { FrameworksService } from '../services/frameworks.service';
  
  import { CreateFrameworkDto } from '../dto/create-framework.dto';
  import { UpdateFrameworkDto } from '../dto/update-framework.dto';
  
  @ApiTags('Frameworks')
  @Controller('curriculum/frameworks')
  export class FrameworksController {
    constructor(
      private readonly frameworksService: FrameworksService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary: 'Create Framework',
    })
    create(
      @Body()
      dto: CreateFrameworkDto,
    ) {
      return this.frameworksService.create(dto);
    }
  
    @Get()
    @ApiOperation({
      summary: 'List Frameworks',
    })
    findAll() {
      return this.frameworksService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Get Framework',
    })
    findOne(
      @Param('id')
      id: string,
    ) {
      return this.frameworksService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({
      summary: 'Update Framework',
    })
    update(
      @Param('id')
      id: string,
  
      @Body()
      dto: UpdateFrameworkDto,
    ) {
      return this.frameworksService.update(
        id,
        dto,
      );
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Delete Framework',
    })
    remove(
      @Param('id')
      id: string,
    ) {
      return this.frameworksService.remove(id);
    }
  
    @Patch(':id/restore')
    @ApiOperation({
      summary: 'Restore Framework',
    })
    restore(
      @Param('id')
      id: string,
    ) {
      return this.frameworksService.restore(id);
    }
  }