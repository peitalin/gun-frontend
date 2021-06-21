

const s1 = 0.0175 // %1.75 Stripe domestic fee
const s2 = 0.0115 // %2.95 Stripe international fee, an extra %1.15
const g = 0.0175 // %1.75 gunmarketplace fee

// eq 1: y = (1 - s1 - s2 - g) * P * x
// eq 2: y = (1 - s1 - g) * P
// Simultaneous equations

// (1 - s1 - g) * P  = (1 - s1 - s2 - g) * P * x
// (1 - s1 - g) = (1 - s1 - s2 - g) * x
// x = (1 - s1 - g)/(1 - s1 - s2 - g)

const scaleRate = (1 - s1 - g) / (1 - s1 - s2 - g)

// additional fee to charge buyer:
// (international_price - original_price)
// = (scaleRate - 1) * original_price


export const calculateInternationalFee = (originalPrice: number) => {
	console.log("%1.206 scaleRate: ", scaleRate)
	return Math.ceil((scaleRate - 1) * originalPrice)
}