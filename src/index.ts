import {
  InversifyHonoHttpAdapter,
} from "@inversifyjs/http-hono";
import "reflect-metadata";
import { Container } from "inversify";
import { buildProviderModule } from "@inversifyjs/binding-decorators";
import "./routes"
import { contextStorage, CrossOrigin, reqLimiter } from "./middleware";


const container = new Container()

container.loadAsync(buildProviderModule())

const adapter = new InversifyHonoHttpAdapter(container, {
  logger: false,
});


adapter.applyGlobalMiddleware(CrossOrigin)
adapter.applyGlobalMiddleware(reqLimiter)


const app = await adapter.build();

app.use(contextStorage())

export default app;
