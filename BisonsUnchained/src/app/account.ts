export class Account {
  name: string;
  password: string;
  publickey: string;
  privatekey: string;

  constructor(name: string, password: string, publickey: string, privatekey: string) {
    this.name = name;
    this.password = password;
    this.publickey = publickey;
    this.privatekey = privatekey;
  }


}
