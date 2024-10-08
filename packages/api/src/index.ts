import { Hono } from "hono";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { getParsedAwesomeYasunori } from "./get-parsed-awesome-yasunori";

const app = new Hono();
app.use("*", poweredBy());
app.use("*", prettyJSON());
app.use("*", cors());

const parsedAwesomeYasunori = getParsedAwesomeYasunori();

const route = app
  .get("/", (c) => {
    return c.json({
      message:
        "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
    });
  })
  .get("/awesome", async (c) => {
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    return c.json(parsedAwesomeYasunori?.output.yasunori);
  });

export default app;
export type ApiRoute = typeof route;
