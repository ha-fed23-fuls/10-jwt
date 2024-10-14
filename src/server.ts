import express, { Express, Request, Response } from 'express'
import { validateLogin } from './users.js'

const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

// Logger middleware
app.use('/', (req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})
app.use('/', express.static('./frontend'))
app.use('/', express.json())

app.post('/login', (req: Request, res: Response) => {
	// Klar: middleware för att ta emot body
	// TODO: validera body
	// kontrollera om username+password matchar en befintlig användare
	// skicka tillbaka en JWT
	
	console.log('Body är: ', req.body)
	const userId = validateLogin(req.body.username, req.body.password)
	console.log('user id: ', userId)
	if( !userId ) {
		res.sendStatus(401)  // unauthorized
		return
	}

	// Make JWT
	res.send('"JWT"')
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})