import { PartialType } from '@nestjs/swagger';
import { CreateRejectedBrandDto } from './create-rejected-brand.dto';

export class UpdateRejectedBrandDto extends PartialType(CreateRejectedBrandDto) {}
