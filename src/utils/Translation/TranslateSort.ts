export function TranslateSortToRussian(sort: string) {
	console.log(sort)
	switch (sort) {
		case 'asc':
			return 'По возрастающей';
		case 'desc':
			return 'По убывающей';
		default:
			return sort;
	}
}