import { Context as HonoContext, HonoRequest, Input, Next } from "hono";
import { rateLimiter, UnstorageStore } from "hono-rate-limiter";
import CloudflareKVBinding from "unstorage/drivers/cloudflare-kv-binding"
import { Env } from "../types";
import { createStorage } from "unstorage";
import { HonoMiddleware } from "@inversifyjs/http-hono";
import { provide } from "@inversifyjs/binding-decorators";

@provide()
export class reqLimiter implements HonoMiddleware {
    async execute(_req: HonoRequest<"/", {}>, ctx: HonoContext<any, any, {}>, next: Next): Promise<Response | undefined> {
        const limiter = rateLimiter<Env>({
            windowMs: 15 * 60 * 1000,
            limit: 20000,
            keyGenerator: function (ctx: HonoContext<Env>): string {
                return ctx.req.header('cf-connecting-ip') ?? ''
            },
            standardHeaders: 'draft-7',
            store: new UnstorageStore({
                storage: createStorage({
                    driver: CloudflareKVBinding({
                        binding: ctx.env.spft_reqLimiter
                    })
                })
            })
        })

        await limiter(ctx, next);
        await next()
        return ctx.res ?? undefined
    }

}