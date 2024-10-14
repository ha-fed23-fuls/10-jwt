const loginButton = document.querySelector('#login-button')
const showBooksButton = document.querySelector('#show-books')
const resultsElement = document.querySelector('.books-result')

loginButton.addEventListener('click', async () => {
	const username = document.querySelector('#username').value
	const password = document.querySelector('#password').value
	const data = { username, password }
	console.log('Skickar inloggningsuppgifter till servern: ', data)
	const response = await fetch('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	})
	const jwt = await response.json()
	localStorage.setItem(LS_KEY, jwt.jwt)
	resultsElement.innerText = 'Thank you for loggin in.'
})
const LS_KEY = 'JWT-DEMO--TOKEN'


showBooksButton.addEventListener('click', async () => {
	// skicka request till backend
	// hantera eventuellt fel
	// visa datan

	const response = await fetch('/protected', {
		headers: {
			Authorization: localStorage.getItem(LS_KEY)
		}
	})
	if( response.status !== 200 ) {
		resultsElement.innerText = 'Please login to view your books!'
		return
	}
	
	const data = await response.json()
	// Lista med böcker: title, author, owner
	resultsElement.innerHTML = ''
	console.log('Data: ', data)
	data.forEach(book => {
		console.log('Book: ', book)
		const p = document.createElement('p')
		p.innerText = `${book.title} by ${book.author}`
		resultsElement.append(p)
	})
	console.log('Färdig!')
})