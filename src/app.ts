import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

class App {
  constructor(port: number) {
    this.init();
    this.middlewares();
    this.routes();
    this.listenServer(port);
  }

  init(): void {}

  middlewares(): void {
    app.enable("trust proxy");
    app.use(helmet({ crossOriginResourcePolicy: false }));
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  routes(): void {
    app.use("/", router);
  }

  listenServer(port: number): void {
    app.listen(port, () => {
      console.log("App is running on port", port);
    });
  }
}

export default App;
