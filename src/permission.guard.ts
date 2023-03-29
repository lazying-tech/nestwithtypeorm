/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Account } from './accounts/entities/account.entity';

export class PermissionGuard implements CanActivate {
  private rolePassed: string[];

  constructor(role: string[]) {
    this.rolePassed = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const account = context.switchToHttp().getRequest().user;

    return this.rolePassed.includes(account.permission);
  }
}
