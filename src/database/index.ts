import "../loadEnv.js";
import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("commenteitor-api:db:root");

const connectDB = async (connectionString: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Error on connecting to database: ", error.message));
        reject();
        return;
      }

      debug(chalk.green("Connected to database"));
      resolve(null);
    });
  });

export default connectDB;
