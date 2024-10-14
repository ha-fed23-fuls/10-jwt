import express, { Express, Request, Response } from 'express'
import { validateLogin } from './users.js'
import jwt from 'jsonwebtoken'
const { sign, verify } = jwt

const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

// Logger middleware
app.use('/', express.json())
app.use('/', (req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})
app.use('/', express.static('./frontend'))

app.post('/login', (req: Request, res: Response) => {
	if( !process.env.SECRET ) {
		res.sendStatus(500)
		return
	}
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
	// res.send('"JWT"')
	const payload = {
		userId
	}
	const token: string = sign(payload, process.env.SECRET)
	res.send({ jwt: token })
})

// TODO: lägg till en skyddad route, t.ex. /protected
// app.get('/protected', ...)

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})