import { Test, TestingModule } from '@nestjs/testing';
import { BillsProductsService } from './bills_products.service';

describe('BillsProductsService', () => {
  let service: BillsProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsProductsService],
    }).compile();

    service = module.get<BillsProductsService>(BillsProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
