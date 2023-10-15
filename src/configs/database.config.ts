import { config as dotenvConfig } from "dotenv";
import { Dialect } from "sequelize";
dotenvConfig();

class DbConfig {
  constructor() {}

  public host: string = process.env.DB_HOST || "";
  public username: string = process.env.DB_USER || "";
  public password: string = process.env.DB_PASSWORD || "";
  public database: string = process.env.DB_NAME || "";
  public port: number = parseInt(process.env.DB_PORT || "3306");
  public dialect: Dialect = "mysql";
}

const dbConfig = new DbConfig();
module.exports = { ...dbConfig }; // this line used for migration (can't use modular)
export default { ...dbConfig };
