import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PasteService } from './paste.service';
import { CreatePasteDto } from './dto/create-paste.dto';
import { RolesGuard } from 'src/guards/Roles/roles.guard';
import { Roles } from 'src/guards/Roles/roles.decorator';
import { Role } from 'src/guards/Roles/roles.enum';
import { Request } from 'express';

@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Roles(Role.Guest)
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() // new ZodValidationPipe(CreatePasteSchema)
    createPasteDto: CreatePasteDto,
    @Req() request: Request,
  ) {
    return this.pasteService.create(createPasteDto, request);
  }

  @Roles(Role.Guest)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('password') password: string,
    @Req() request: Request,
  ) {
    return this.pasteService.findOne(id, password, request);
  }
}
