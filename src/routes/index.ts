import Router from "@koa/router";

const router = new Router();

import * as users from "@/modules/users";

router.get("/", (ctx, next) => {
  ctx.body = {
    message: "Connected",
  };
});

router.get("/users", users.usersList);
router.post("/user", users.create);
router.get("/user/:id", users.find);
router.put("/user/:id", users.update);
router.delete("/user/:id", users.remove);

export { router };
