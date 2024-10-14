
export type UserId = string

function validateLogin(username: string, password: string): UserId | null {
	const matchingUser = users.find(user => user.name === username && user.password === password)
	if( matchingUser ) {
		return matchingUser.id
	}
	return null
}
function getUserData(userId: UserId): User | null {
	const match = users.find(u => u.id === userId)
	return match || null
}

export interface User {
	name: string;
	password: string;
	id: UserId;
}
const users: User[] = [
	{ name: 'Greta', password: 'stekpanna', id: 'ab23' },
	{ name: 'Wall-E', password: '123', id: 'cd45' },
]

export { validateLogin, getUserData }
