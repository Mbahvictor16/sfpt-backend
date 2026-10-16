import { provide } from "@inversifyjs/binding-decorators";
import { Controller, Get } from "@inversifyjs/http-core";
import { Context } from "@inversifyjs/http-hono";
import { Context as HonoContext } from "hono";

@provide()
@Controller("/users")
class UserController {

    @Get()
    public async getUsers(@Context() ctx: HonoContext): Promise<Response> {
        return ctx.json({ user: [] })
    }
}