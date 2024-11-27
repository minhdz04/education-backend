import { Module } from '@nestjs/common';
import { TunController } from './tun.controller';

@Module({
  controllers: [TunController]
})
export class TunModule {}
