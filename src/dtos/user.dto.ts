import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsString() name: string;
  @IsString() accountType: string;
  @IsString() phoneNumber: string;
  @IsOptional() @IsString() businessType: string;
  @IsOptional() @IsString() state: string;
  @IsOptional() @IsString() lga: string;
  @IsOptional() @IsString() address: string;
  @IsOptional() @IsString() regNumber: string;
  @IsOptional() @IsString() nin: string;
  @IsOptional() @IsNumber() referee: number;
  @IsOptional() @IsString() businessTarget: string;
  @IsString() @IsString() password: string;
  @IsOptional() @IsString() role: string;
}

export class BusinessUserDto {
  @IsString() name: string;
  @IsString() phoneNumber: string;
  @IsOptional() @IsString() state: string;
  @IsOptional() @IsString() lga: string;
  @IsOptional() @IsString() address: string;
  @IsString() nin: string;
  @IsString() password: string;
}

export class UserBranchDto {
  @IsString() name: string;
  @IsString() phoneNumber: string;
  @IsOptional() @IsString() state: string;
  @IsOptional() @IsString() lga: string;
  @IsOptional() @IsString() address: string;
  @IsString() password: string;
}

export class ValidateUserDto {
  @IsString() username: string;
}
export class VerifyUserDto {
  @IsString() username: string;
  @IsString() otp: string;
}

export class ResetPasswordDto {
  @IsString() username: string;
  @IsString() password: string;
  @IsString() otp: string;
}

export class AuthUserDto {
  @IsString() username: string;
  @IsString() sub: string;
}

export class UserUpdateDto {
  @IsOptional() name: string;
  @IsOptional() alias: string;
  @IsOptional() color: string;
  @IsOptional() shortDescription: string;
  @IsOptional() description: string;
  @IsOptional() address: string;
  @IsOptional() dp: string;
  @IsOptional() map: string;
}

export class UserAuthDto {
  @IsString() username: string;
  @IsString() password: string;
}
