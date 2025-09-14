import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/users/users.entity';
import { LocalAuthGuard } from './guards/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: { user: UserWithoutPassword }) {
    return this.authService.generateToken(req.user);
  }
}
