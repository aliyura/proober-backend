import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { UserController } from './api/v1/user/user.controller';
import { AuthController } from './api/v1/auth/auth.controller';
import { CryptoService } from './services/crypto/crypto.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './services/auth/auth.strategy';
import { ResourceController } from './api/v1/resource/resource.controller';
import { ResourceService } from './services/resource/resource.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { SmsService } from './services/sms/sms.service';
import { VerificationService } from './services/verification/verification.service';
import { Unit, UnitSchema } from './schemas/unit.schema';
import { UnitService } from './services/unit/unit.service';
import { UnitController } from './api/v1/unit/unit.controller';
import { AppController } from './api/v1/app/app.controller';
import { UnitLog, UnitLogSchema } from './schemas/unite-logs.schema';
import { FileService } from './services/file/file.service';
import { FileController } from './api/v1/file/file.controller';
import {
  ResourceOwnershipLog,
  ResourceOwnershipLogSchema,
} from './schemas/resource-ownership-logs.schema';
import { ReportController } from './api/v1/report/report.controller';
import { ReportService } from './services/report/report.service';
import { TrackingService } from './services/tracking/tracking.service';
import { TrackingController } from './api/v1/tracking/tracking.controller';
import { Tracking, TrackingSchema } from './schemas/tracking.schema';
import { ResourceTypeController } from './api/v1/resource-type/resource-type.controller';
import { ResourceTypeService } from './services/resource-type/resource-type.service';
import {
  UnitWithdrawal,
  UnitWithdrawalSchema,
} from './schemas/unit-withdrawal.schema';
import {
  ResourceType,
  ResourceTypeSchema,
} from './schemas/resource-type.schema';
import { Webhook, WebhookSchema } from './schemas/webhook.schema';
import { WebhookService } from './services/webhook/webhook.service';
import { WebhookController } from './api/v1/webhook/webhook.controller';
import { LogsService } from './services/logs/logs.service';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_ADDRESS),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
    ]),
    MongooseModule.forFeature([
      { name: Tracking.name, schema: TrackingSchema },
    ]),
    MongooseModule.forFeature([
      { name: ResourceType.name, schema: ResourceTypeSchema },
    ]),
    MongooseModule.forFeature([
      { name: ResourceOwnershipLog.name, schema: ResourceOwnershipLogSchema },
    ]),
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
    MongooseModule.forFeature([
      { name: UnitWithdrawal.name, schema: UnitWithdrawalSchema },
    ]),
    MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema }]),
    MongooseModule.forFeature([{ name: UnitLog.name, schema: UnitLogSchema }]),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '10000s' },
    }),
    PassportModule,
  ],
  controllers: [
    UserController,
    AuthController,
    ResourceController,
    UnitController,
    AppController,
    FileController,
    ResourceTypeController,
    ReportController,
    TrackingController,
    WebhookController,
  ],
  providers: [
    UserService,
    AuthService,
    AuthStrategy,
    CryptoService,
    ResourceService,
    SmsService,
    ResourceTypeService,
    VerificationService,
    UserService,
    UnitService,
    FileService,
    LogsService,
    ReportService,
    TrackingService,
    WebhookService,
  ],
})
export class AppModule {}
