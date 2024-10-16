const LS_KEY = 'JWT-DEMO--TOKEN'
const loginButton = document.querySelector('#login-button')
const logoutButton = document.querySelector('#logout-button')
const showBooksButton = document.querySelector('#show-books')
const resultsElement = document.querySelector('.books-result')

// Visa om vi är inloggade eller inte
refreshLoginStatus()


loginButton.addEventListener('click', async () => {
	const username = document.querySelector('#username').value
	const password = document.querySelector('#password').value
	const data = { username, password }

	// OBS! Ta bort den här utskriften när vi kör live
	console.log('Skickar inloggningsuppgifter till servern: ', data)

	const response = await fetch('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	})

	// Status för response behöver inte vara 200
	if( response.status !== 200 ) {
		resultsElement.innerText = 'Please login again.'
		return
	}

	const token = await response.json()
	localStorage.setItem(LS_KEY, token.jwt)
	resultsElement.innerText = 'Thank you for loggin in.'
})

logoutButton.addEventListener('click', () => {
	// Glöm JWT
	// Uppdatera gränssnittet
	localStorage.removeItem(LS_KEY)
	resultsElement.innerText = 'You are logged out.'
	refreshLoginStatus()
})

function refreshLoginStatus() {
	// Om det finns en JWT är vi inloggade
	// I en React-app kan vi använda en state-variabel eller (bättre) spara användar-info i Zustand
	if( localStorage.getItem(LS_KEY) !== null ) {
		loginButton.disabled = true
		logoutButton.disabled = false
	} else {
		loginButton.disabled = false
		logoutButton.disabled = true
	}
}


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
	// console.log('Data: ', data)
	data.forEach(book => {
		// console.log('Book: ', book)
		const p = document.createElement('p')
		p.innerText = `${book.title} by ${book.author}`
		resultsElement.append(p)
	})
})