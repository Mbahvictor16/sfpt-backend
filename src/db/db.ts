import { injectable } from "inversify";
import { DataSource } from "typeorm";
import { getContext } from "hono/context-storage";
import { Env } from "../types";

const ctx = getContext<Env>()

@injectable()
export class Driver extends DataSource {
    constructor() {
        super({ url: ctx.env.spft_DB.connectionString, type: "postgres" })
    }

    async connect(): Promise<this> {
        return await this.initialize()
    }
}