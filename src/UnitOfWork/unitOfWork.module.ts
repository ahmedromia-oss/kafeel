import { forwardRef, Module } from '@nestjs/common';
import { UnitOfWork } from './unitOfWork.service';





@Module({
  imports: [],
  providers: [UnitOfWork],
  exports: [UnitOfWork] , 
})
export class SharedModule {}
