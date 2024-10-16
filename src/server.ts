import express, { Express, Request, Response } from 'express'
import { getUserData, UserId, validateLogin } from './users.js'
import jwt from 'jsonwebtoken'
import { getBooks } from './data.js'
const { sign, verify } = jwt

const port: number = Number(process.env.PORT || 1234)
const app: Express = express()

app.use('/', express.json())  // parse body - body finns i Request-objektet
app.use('/', (req, res, next) => {
	// Logger middleware
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})
app.use('/', express.static('./frontend'))  // serva statisk frontend


// Route handlers
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
		// Användaren skrev fel lösenord i login-formuläret
		// 401 Unauthorized
		res.status(401).send({
			"error": "Unauthorized",
			"message": "You are not authorized to access this resource."
		})
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


app.get('/protected', (req: Request, res: Response) => {
	if( !process.env.SECRET ) {
		res.sendStatus(500)
		return
	}
	// finns det en JWT?
	// är den giltig? verify
	// om giltig -> hämta användarens böcker
	let token = req.headers.authorization
	console.log('Header:', token)
	if( !token ) {
		res.sendStatus(401)
		return
	}
	let payload: Payload
	try {
		payload = verify(token, process.env.SECRET) as Payload
		console.log('Payload: ', payload)
	} catch(error) {
		res.sendStatus(400) // bad request
		return
	}
	let userId: UserId = payload.userId
	// Korrekt JWT! Nu kan vi leta upp användaren
	const user = getUserData(userId)
	if( !user ) {
		res.sendStatus(404) // not found
		return
	}
	const data = getBooks(user.name)
	res.send(data)
})
interface Payload {
	userId: string;
	iat: number;
}

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})