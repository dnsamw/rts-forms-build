import createHTTPService from "./http-client";

export interface User {
  id: number;
  name: string;
}

const userService = createHTTPService("/users");

export default userService;
