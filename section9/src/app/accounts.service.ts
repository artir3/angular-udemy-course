import { LoggingService } from "./logging/logging.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountsService {
  private accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private logger: LoggingService) { }

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status })
    this.logger.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.logger.logStatusChange(status);
  }

  getAccounts() {
    return this.accounts;
  }
}