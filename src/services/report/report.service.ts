import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/dtos/ApiResponse.dto';
import { UnitLogDocument, UnitLog } from '../../schemas/unite-logs.schema';
import { Helpers } from 'src/helpers';
import { Messages } from 'src/utils/messages/messages';
import { AccountType, UnitActivity } from 'src/enums';
import { User } from '../../schemas/user.schema';
import { ResourceDocument, Resource } from '../../schemas/resource.schema';
import { ResourceType } from '../../enums/enums';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(UnitLog.name) private unitLog: Model<UnitLogDocument>,
    @InjectModel(Resource.name) private resource: Model<ResourceDocument>,
  ) {}
  async getUnitAnalytics(uuid: string): Promise<ApiResponse> {
    try {
      const response = await this.unitLog.find({
        uuid,
      });

      if (response) {
        let totalDebit = 0;
        let totalCredit = 0;
        await response.forEach((transaction) => {
          if (transaction.activity === UnitActivity.CREDIT) {
            totalCredit += transaction.amount;
          } else {
            totalDebit += transaction.amount;
          }
        });

        const result = {
          totalDebit,
          totalCredit,
        };
        return Helpers.success(result);
      }
    } catch (ex) {
      console.log(Messages.ErrorOccurred, ex);
      return Helpers.fail(Messages.Exception);
    }
  }
  async getResourceAnalytics(authenticatedUser: User): Promise<ApiResponse> {
    try {
      const query = {} as any;

      if (authenticatedUser.accountType !== AccountType.ADMIN) {
        query.currentOwnerUuid =
          authenticatedUser.businessId || authenticatedUser.uuid;
      }

      const resources = await this.resource.find(query).sort({ createdAt: -1 });
      const analytic = {
        All: 0,
        Vehicles: 0,
        SmartDevices: 0,
        Houses: 0,
        Land: 0,
      };
      let counter = 0;

      if (resources.length)
        await resources.forEach((resource) => {
          counter++;
          analytic.All = counter;

          if (resource.type === ResourceType.SMARTDEVICE)
            analytic.SmartDevices += 1;
          if (resource.type === ResourceType.VEHICLE) analytic.Vehicles += 1;
          if (resource.type === ResourceType.HOUSE) analytic.Houses += 1;
          if (resource.type === ResourceType.LAND) analytic.Land += 1;
        });

      return Helpers.success(analytic);
    } catch (ex) {
      console.log(Messages.ErrorOccurred, ex);
      return Helpers.fail(Messages.Exception);
    }
  }
}
