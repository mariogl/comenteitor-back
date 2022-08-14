import "./loadEnv";
import chalk from "chalk";
import Debug from "debug";
import portfinder from "portfinder";
import initializeServer from "./server/index";
import connectDB from "./database/index";

const debug = Debug("commenteitor-api:root");

const port = process.env.PORT ?? 4000;
const connectionString = process.env.MONGO_CONNECTION;

(async () => {
  try {
    debug(chalk.green("Initializing..."));
    await connectDB(connectionString);
    await initializeServer(+port);
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      debug(chalk.red.bold(`Port ${port} in use. Looking for another port...`));
      const freePort = await portfinder.getPortPromise();
      await initializeServer(freePort);
      debug(chalk.green(`Server listening on http://localhost:${freePort}`));
    }
  }
})();
