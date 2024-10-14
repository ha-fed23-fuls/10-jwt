export interface Book {
	title: string;
	author: string;
	owner: string;
}

export function getBooks(username: string): Book[] {
	return sciFiBooks.filter(b => b.owner === username)
}

const sciFiBooks: Book[] = [
	{ title: "Dune", author: "Frank Herbert", owner: "Greta" },
	{ title: "Foundation", author: "Isaac Asimov", owner: "Ludwig" },
	{ title: "Neuromancer", author: "William Gibson", owner: "Wall-E" },
	{ title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", owner: "Greta" },
	{ title: "Brave New World", author: "Aldous Huxley", owner: "Ludwig" },
	{ title: "Fahrenheit 451", author: "Ray Bradbury", owner: "Wall-E" },
	{ title: "2001: A Space Odyssey", author: "Arthur C. Clarke", owner: "Greta" },
	{ title: "The War of the Worlds", author: "H.G. Wells", owner: "Ludwig" },
	{ title: "The Stars My Destination", author: "Alfred Bester", owner: "Wall-E" },
	{ title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", owner: "Greta" },
	{ title: "The Time Machine", author: "H.G. Wells", owner: "Ludwig" },
	{ title: "The Moon is a Harsh Mistress", author: "Robert A. Heinlein", owner: "Wall-E" }
]
