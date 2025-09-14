import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT 액세스 토큰' })
  accessToken: string;
}
