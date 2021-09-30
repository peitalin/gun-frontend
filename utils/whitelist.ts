
export const whitelist = [
	'uk9z253nha6hf', // peita@protonmail.com
	'u9q5bf6rp9veh', //	kelvin.cv.lo@gmail.com
	'uz1gf6r6e5f6q', //	marvinwong@live.com
	// 'u4cnfhmq1dwds', //	peita_lin@hotmail.com
	'uvhm5dagvrd4x', //	admin@gunmarketplace.com.au
	'unsqykrqepp29', //	cassidy.shorland@gmail.com
	// 'u1k5x4eyxhtmt', //	thomaspierce@gmail.com
	// 'uk5q2w2ak2rz4', //	thomaspierce@email.com

	// 'u32p6x2arxee7', // hehaijiang@gmail.com

	// 'u37sh3brbszbv', //	hellokunyang@gmail.com
	// 'up7awqcqzpsyh', //	johnsonzhang0207@hotmail.com
	// 'uf62cs2b5vbdt', //	micksands71@gmail.com
	// 'uredtdnymbm9w', //	Chinese@live.com.au
	// 'up28p2n7kb5vc', //	brettdrummond@gmail.com
	// 'u915ca16abrpb', //	chrisskearney@gmail.com
	// 'ufgwhvnn1e4hw', //	liu198061@hotmail.com
]

export const isWhitelisted = (userId: string) => {
	if (!userId) {
		false
	} else {
		return whitelist.includes(userId)
	}
}

