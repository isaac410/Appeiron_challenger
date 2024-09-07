import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginatorOrder } from 'src/domain/common/paginator-order.enum';

export class PaginatorFilterDto {
  @ApiPropertyOptional({ enum: PaginatorOrder, default: PaginatorOrder.ASC })
  @IsEnum(PaginatorOrder)
  @IsOptional()
  order?: PaginatorOrder = PaginatorOrder.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
