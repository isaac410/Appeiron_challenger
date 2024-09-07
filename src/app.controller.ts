import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get('/health')
  async checkHealth() {
    try {
      return {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      };
    } catch (error) {
      return { message: error };
    }
  }
}
