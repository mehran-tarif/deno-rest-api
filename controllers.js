import { articles } from './models.js'

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

export { articlesList, articleDetail }