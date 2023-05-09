import { Module } from '@nestjs/common';
import { HashingModule } from '@infrastructure/common';
import { InMemoryUserRepository } from './repositories';

@Module({
  imports: [HashingModule],
  controllers: [],
  providers: [InMemoryUserRepository],
  exports: [InMemoryUserRepository],
})
export class InMemoryDbModule {}
