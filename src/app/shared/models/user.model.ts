export class User {
  id: number;
  name: string;
  password: string;
  email: string;
  admin: boolean;

  constructor({
    id = null,
    name = null,
    password = null,
    email = null,
    admin = false
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.admin = admin;
  }
}
