import { UserPayload } from "../../API/Payload/users-payload";

export class UserPayloadInitializer {
  static init(empNumber?: number): UserPayload {
    let user: UserPayload = {
      username: "nadian" + Math.floor(Math.random() * 1000),
      password: "nadian123",
      status: true,
      userRoleId: 4,
      empNumber,
    };
    return user;
  }
}
