import {Injectable} from '@angular/core';
import {Account} from './account';
import {AccountDatabase} from './accountdatabase';

declare var getTokencountfromBlockchain: any;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private publicKey: string;
  private privateKey: string;
  private Tokencount: number;
  private Accounts: Array<Account> = AccountDatabase;

  constructor() {
  }

  public login(name: string, password: string): boolean {
    for (const entry of this.Accounts) {
      if (name === entry.name && password === entry.password) {
        this.publicKey = entry.publickey;

        this.privateKey = entry.privatekey;
        this.updatedTokencount();
        return true;
      }
    }
    return false;
  }

  public getprivateKey(): string {
    return this.privateKey;
  }

  public getPublicKey(): string {
    return this.publicKey;
  }

  public getTokenCount(): number {
    return this.Tokencount;
  }

  public updatedTokencount(): number {
    return getTokencountfromBlockchain().then((result) => {
      this.Tokencount = result;
      // console.log('LOGIN: ' + this.Tokencount);
      return result;

    });
    // this.Tokencount = getTokencountfromBlockchain();
  }



}
