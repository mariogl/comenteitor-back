import "./loadEnv.js";
import chalk from "chalk";
import Debug from "debug";
import portfinder from "portfinder";
import initializeServer from "./server/index.js";
import connectDB from "./database/index.js";

const debug = Debug("commenteitor-api:root");

const port = process.env.PORT ?? 4000;
const connectionString = process.env.MONGO_CONNECTION;

try {
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
