import { Body, Controller, Post } from "@nestjs/common";
import { CreateInventoriesDto } from "./dto/createInventoriesDto";

@Controller('inventories')
export class InventoriesController {
  @Post('/create')
  async createInventoriesController(@Body() createInventoriesDto: CreateInventoriesDto) {
    return createInventoriesDto
  }
}
