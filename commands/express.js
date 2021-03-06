function make({
	name,
	baseDir
} = {}) {
	const dependencies = ['express']

	const filesMap = new Map()

	filesMap.set('server.js', {
		text: (
`const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
	const server = express()

	// server.get('/a', (req, res) => {
	//   return app.render(req, res, '/b', req.query)
	// })

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) { throw err }
		console.log(\`> Ready on http://localhost:\${port}\`)
	})
})
`)
	})
	
	return {
		baseDir,
		filesMap,
		dependencies
	}
}

module.exports = make