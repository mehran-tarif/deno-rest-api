import { readJsonSync } from "https://deno.land/std/fs/mod.ts";

const articles = readJsonSync("./db.json");

export { articles }