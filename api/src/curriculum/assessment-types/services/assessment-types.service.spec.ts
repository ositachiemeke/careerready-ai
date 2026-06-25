import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentTypesService } from './assessment-types.service';

describe('AssessmentTypesService', () => {
  let service: AssessmentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentTypesService],
    }).compile();

    service = module.get<AssessmentTypesService>(AssessmentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
