import { Router } from "https://deno.land/x/oak/mod.ts";
import { articlesList, articleDetail } from './controllers.js'

const router = new Router();
router
	.get("/", articlesList)
	.get("/:id", articleDetail)

export { router }