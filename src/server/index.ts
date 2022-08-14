import "../loadEnv";
import app from "./server";

const initializeServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(true);
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

export default initializeServer;
