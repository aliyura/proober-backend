import {
  Controller,
  Get,
  Headers,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from 'src/dtos/ApiResponse.dto';
import { Helpers } from 'src/helpers';
import { AppGuard } from 'src/services/auth/app.guard';
import { User } from 'src/schemas/user.schema';
import { ReportService } from '../../../services/report/report.service';
import { UserService } from 'src/services/user/user.service';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AppGuard)
  @Get('/unit/analytics')
  async getUnitTotalCredit(
    @Headers('Authorization') token: string,
  ): Promise<ApiResponse> {
    const authToken = token.substring(7);
    const userResponse = await this.userService.authenticatedUserByToken(
      authToken,
    );
    if (!userResponse.success)
      return Helpers.failedHttpResponse(
        userResponse.message,
        HttpStatus.UNAUTHORIZED,
      );

    const user = userResponse.data as User;
    const response = await this.reportService.getUnitAnalytics(
      user.businessId || user.uuid,
    );
    if (response.success) {
      return response;
    }
    return Helpers.failedHttpResponse(response.message, HttpStatus.NOT_FOUND);
  }

  @UseGuards(AppGuard)
  @Get('/resource/analytics')
  async getResourceAnalytics(
    @Headers('Authorization') token: string,
  ): Promise<ApiResponse> {
    const authToken = token.substring(7);
    const userResponse = await this.userService.authenticatedUserByToken(
      authToken,
    );
    if (!userResponse.success)
      return Helpers.failedHttpResponse(
        userResponse.message,
        HttpStatus.UNAUTHORIZED,
      );
    const user = userResponse.data as User;

    const response = await this.reportService.getResourceAnalytics(user);
    if (response.success && response.data) {
      return response;
    }
    return Helpers.failedHttpResponse(response.message, HttpStatus.NOT_FOUND);
  }
}
