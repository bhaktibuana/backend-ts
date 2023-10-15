import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class Config {
  constructor() {
    if (this.nodeEnv === "development") {
      this.serverPort = 3000;
    }
  }
  
  public nodeEnv: string = process.env.NODE_ENV || "development";
  public serverPort: number = parseInt(process.env.SERVER_PORT || "3000");
}

export const config = new Config();
