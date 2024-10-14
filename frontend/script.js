const button = document.querySelector('#login-button')

button.addEventListener('click', async () => {
	const username = document.querySelector('#username').value
	const password = document.querySelector('#password').value
	const data = { username, password }
	console.log('Skickar inloggningsuppgifter till servern: ', data)
	fetch('/login', {
		method: 'POST',
		body: data
	})
})