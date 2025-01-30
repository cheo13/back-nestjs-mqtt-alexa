import { PartialType } from '@nestjs/swagger';
import { CreatePortionServedDto } from './create-portion-served.dto';

export class UpdatePortionServedDto extends PartialType(
  CreatePortionServedDto,
) {}
