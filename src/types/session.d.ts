export declare module "express-session" {
  import {User} from "@prisma/client";

  interface SessionData {
        user : User
    }
}
