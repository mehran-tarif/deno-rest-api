import { Router } from "https://deno.land/x/oak/mod.ts";
import {
	articlesList,
	articleDetail,
	articleAdd,
	articleUpdate,
	articleDelete
} from './controllers.js'

const router = new Router();
router
	.get("/", articlesList)
	.get("/:id", articleDetail)
	.post("/", articleAdd)
	.put("/:id", articleUpdate)
	.delete("/:id", articleDelete)

export { router }