import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesLogsService } from './inventories-logs.service';

describe('InventoriesLogsService', () => {
  let service: InventoriesLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoriesLogsService],
    }).compile();

    service = module.get<InventoriesLogsService>(InventoriesLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
