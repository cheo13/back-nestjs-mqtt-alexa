import { PartialType } from '@nestjs/swagger';
import { CreateAdminBarDto } from './create-admin-bar.dto';

export class UpdateAdminBarDto extends PartialType(CreateAdminBarDto) {}
