import { Test, TestingModule } from '@nestjs/testing';
import { BillsItemsService } from './bills-items.service';

describe('BillsItemsService', () => {
  let service: BillsItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsItemsService],
    }).compile();

    service = module.get<BillsItemsService>(BillsItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
