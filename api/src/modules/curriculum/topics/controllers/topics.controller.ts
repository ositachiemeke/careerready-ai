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
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { TopicsService } from '../services/topics.service';
  
  import { CreateTopicDto } from '../dto/create-topic.dto';
  import { UpdateTopicDto } from '../dto/update-topic.dto';
  
  @ApiTags('Topics')
  @Controller('topics')
  export class TopicsController {
    constructor(
      private readonly topicsService: TopicsService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary: 'Create Topic',
    })
    @ApiResponse({
      status: 201,
    })
    create(
      @Body()
      dto: CreateTopicDto,
    ) {
      return this.topicsService.create(dto);
    }
  
    @Get()
    @ApiOperation({
      summary: 'List Topics',
    })
    findAll() {
      return this.topicsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Get Topic',
    })
    findOne(
      @Param('id')
      id: string,
    ) {
      return this.topicsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({
      summary: 'Update Topic',
    })
    update(
      @Param('id')
      id: string,
  
      @Body()
      dto: UpdateTopicDto,
    ) {
      return this.topicsService.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Soft Delete Topic',
    })
    remove(
      @Param('id')
      id: string,
    ) {
      return this.topicsService.remove(id);
    }
  
    @Patch(':id/restore')
    @ApiOperation({
      summary: 'Restore Topic',
    })
    restore(
      @Param('id')
      id: string,
    ) {
      return this.topicsService.restore(id);
    }
  }