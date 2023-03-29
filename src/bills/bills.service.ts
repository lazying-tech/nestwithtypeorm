import { HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { MSG } from 'src/message';

@Injectable({ scope: Scope.REQUEST })
export class BillsService {
  constructor(private accountService: AccountsService,
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    
    @Inject(REQUEST) private readonly request: Request,
    
  ) {}
  async create(createBillDto: CreateBillDto) {

   const employeeId=Object.values(this.request.user)[0];
  

    const userFound=await this.accountService.findOne(createBillDto.userId)
    if(!userFound)
    {
      return MSG(
        'User not found to create bill',
        null,
        null,
        HttpStatus.NOT_FOUND,
      );
    }
    
    const newBill=this.billRepository.create({
      status:createBillDto.status,
      totalPrice:createBillDto.totalPrice,
      employee:{id:employeeId},
      user:{id:createBillDto.userId},
      createAt:Date.now()

    })

    return await this.billRepository.save(newBill)

  }

  async findAll() {
    return await this.billRepository.find({relations:['billProducts']});
  }

  async findOne(id: number) {
    return await this.billRepository.findOne({where:{id:id},relations:['billProducts']});
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
