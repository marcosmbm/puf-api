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
router.get("/login", users.login);

export { router };
