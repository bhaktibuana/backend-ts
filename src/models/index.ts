export { Op } from "sequelize";
export { default as sequelize } from "./connection";
import Role from "./role.model";
import User from "./user.model";

export const models = {
  Role,
  User,
};
