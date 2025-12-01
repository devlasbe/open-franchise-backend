import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/users/users.entity';
import { LocalAuthGuard } from './guards/LocalAuthGuard';
import { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from './guards/JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '프로필 조회',
    description: '로그인된 사용자의 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
    type: UserWithoutPassword,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async getProfile(@Request() req) {
    const user = await this.authService.getProfile(req.user.id);
    return user;
  }

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
  async login(
    @Request() req: { user: UserWithoutPassword },
    @Response() res: ExpressResponse,
  ) {
    const { accessToken } = this.authService.generateToken(req.user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: '로그인 성공' });
  }

  @Post('logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃하고 쿠키를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  async logout(@Response() res: ExpressResponse) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.json({ message: '로그아웃 성공' });
  }
}
