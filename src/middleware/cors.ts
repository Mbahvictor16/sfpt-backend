import { provide } from "@inversifyjs/binding-decorators";
import { CorsMiddleware } from "@inversifyjs/http-hono";


@provide()
export class CrossOrigin extends CorsMiddleware {
    constructor() {
        console.log("Middleware")
        super({
            origin: "http://localhost:8787",
            credentials: true,
        });
    }
}