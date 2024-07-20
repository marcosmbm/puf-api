import "dotenv/config";

import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { router } from "@/routes";
import { errorMiddleware } from "@/middlewares/error";

const app = new Koa();
const port = Number(process.env.PORT);

app.use(errorMiddleware);

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
