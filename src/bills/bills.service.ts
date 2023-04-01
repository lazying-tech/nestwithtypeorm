import { HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateBillDto } from './dto/create-bill.dto';

import { Bill } from './entities/bill.entity';
import { MSG } from 'src/message';

@Injectable({ scope: Scope.REQUEST })
export class BillsService {
  constructor(
    private accountService: AccountsService,
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,

    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const employeeId = Object.values(this.request.user)[0];

    const userFound = await this.accountService.findOne(createBillDto.userId);
    if (!userFound) {
      return MSG(
        'User not found to create bill',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }

    const newBill = this.billRepository.create({
      status: 'Chưa xử lý',
      totalPrice: createBillDto.totalPrice,
      employee: { id: employeeId },
      user: { id: createBillDto.userId },
    });

    return await this.billRepository.save(newBill);
  }

  async findAll() {
    return await this.billRepository.find({ relations: ['billProducts'] });
  }

  async findOne(id: number) {
    return await this.billRepository.findOne({
      where: { id: id },
      relations: ['billProducts'],
    });
  }

  async verify(id: number) {
    const billFound = await this.billRepository.findOne({ where: { id: id } });
    if (!billFound) {
      return MSG('Bill not found to verify', null, null, HttpStatus.NOT_FOUND);
    }
    if (billFound.status == 'Đã xóa') {
      return MSG('Bill is deleted', null, null, HttpStatus.NOT_ACCEPTABLE);
    }
    const verifyBill = Object.assign(billFound, { status: 'Đã xử lý' });
    const save = await this.billRepository.save(verifyBill);
    return MSG('Verified completed', save, null, HttpStatus.OK);
  }

  async remove(id: number) {
    const billFound = await this.billRepository.findOne({ where: { id: id } });
    if (!billFound) {
      return MSG('Bill not found to verify', null, null, HttpStatus.NOT_FOUND);
    }
    const verifyBill = Object.assign(billFound, { status: 'Đã xóa' });
    const save = await this.billRepository.save(verifyBill);
    return MSG('Delete completed', save, null, HttpStatus.OK);
  }
}
