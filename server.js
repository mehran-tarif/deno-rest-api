import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from './routes.js'

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started at: http://127.0.0.1:8000")
await app.listen({ port: 8000 });