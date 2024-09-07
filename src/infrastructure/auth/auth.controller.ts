import {
  Get,
  Body,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SingInDto } from 'src/application/auth/sing-in.dto';
import { Public } from 'src/application/auth/public.decorator';
import { AuthService, Token } from 'src/application/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'login of user' })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SingInDto): Promise<Token> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @ApiOperation({ summary: 'refresh a token' })
  @Post('refresh')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refresh(@Request() req): Promise<Token> {
    //const refreshToken = req.cookies.refreshToken;
    const refreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzYWFjLm1lbmRvemEuY2NzQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sInN1YiI6IjY0ZGRhMzViOGQ2OWRmMTg4ODdiZmNjMSIsInJlZnJlc2giOnRydWUsImlhdCI6MTY5NDQ2MzEzNSwiZXhwIjoxNjk1MDY3OTM1fQ.BmL3R3eKP59IsjXiqWYNDs3CXnpg5DgV-l905MHhmPQ';
    return this.authService.refresh(refreshToken);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get a user profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
