
type UserId = string

function validateLogin(username: string, password: string): UserId | null {
	const matchingUser = users.find(user => user.name === username && user.password === password)
	if( matchingUser ) {
		return matchingUser.id
	}
	return null
}

const users = [
	{ name: 'Greta', password: 'stekpanna', id: 'ab23' }
]

export { validateLogin }
