import { AddressInfo } from "net";
import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.use("/v1", router);

export const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running @ http://localhost:${address.port}`);
  } else {
    console.error(`Server run failed`);
  }
});
