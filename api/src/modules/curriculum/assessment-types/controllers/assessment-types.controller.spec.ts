import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentTypesController } from './assessment-types.controller';

describe('AssessmentTypesController', () => {
  let controller: AssessmentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentTypesController],
    }).compile();

    controller = module.get<AssessmentTypesController>(AssessmentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
