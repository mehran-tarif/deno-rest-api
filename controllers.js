import { articles } from './models.js'
import { writeJsonSync } from "https://deno.land/std/fs/mod.ts";

const articlesList = (context) => {
	context.response.body = articles
}

const articleDetail = (context) => {
	const article = articles.find(a => a.id == context.params.id)

	if (article) {
		context.response.body = article
	} else {
		context.response.status = 404
		context.response.body = `Article with id: ${context.params.id} not found.`
	}
}

const articleAdd = async (context) => {
	const body = await context.request.body()
	if (body.type == "json") {
		const value = body.value
		value.id = articles.slice(-1)[0].id + 1

		if (value.title && value.content) {

			articles.push(value)
			writeJsonSync("./db.json", articles, { spaces: 4 })
			context.response.status = 201
			context.response.body = value

		} else {
			context.response.status = 400
			context.response.body = `"title" and "content" can't be empty.`
		}

	} else {
		context.response.status = 400
		context.response.body = `Data should be in Json.`
	}
}

const articleUpdate = async (context) => {
	const article = articles.find(a => a.id == context.params.id)

	if (article) {

		const body = await context.request.body()
		if (body.type == "json") {
			const value = body.value
			value.id = article.id

			if (value.title && value.content) {

				for (var i = articles.length - 1; i >= 0; i--) {
					if (articles[i].id == article.id) {
						articles[i] = value
						break
					}
				}

				writeJsonSync("./db.json", articles, { spaces: 4 })
				context.response.status = 200
				context.response.body = value

			} else {
				context.response.status = 400
				context.response.body = `"title" and "content" can't be empty.`
			}

		} else {
			context.response.status = 400
			context.response.body = `Data should be in Json.`
		}

	} else {
		context.response.status = 404
		context.response.body = `Article with id: ${context.params.id} not found.`
	}
}

const articleDelete = (context) => {
	const article = articles.find(a => a.id == context.params.id)

	if (article) {
		for (var i = articles.length - 1; i >= 0; i--) {
			if (articles[i].id == article.id) {
				articles.splice(i, 1)
				break
			}
		}

		writeJsonSync("./db.json", articles, { spaces: 4 })
		context.response.status = 200
		context.response.body = `Article with id: ${context.params.id} removed.`
	} else {
		context.response.status = 404
		context.response.body = `Article with id: ${context.params.id} not found.`
	}
}

export {
	articlesList,
	articleDetail,
	articleAdd,
	articleUpdate,
	articleDelete
}