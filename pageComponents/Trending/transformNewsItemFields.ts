
import {
	NewsItem,
	External_Products,
	Product_Preview_Items,
	Product,
	SoldOutStatus
} from "typings/gqlTypes"


export interface NewsItemFields {
	productId?: string
	externalProductId?: string
	model: string
	make: string
	caliber: string
	barrelLength: string
	action: string
	state: string
	soldOutStatus: string
	description: string
	price: number
	priceWas?: number
	title: string
	serialNumber: string
	condition: string
	adType: string
	licenseNumber: string
	phoneNumber: string
	sourceSite: string
	sourceSiteUrl: string
	featuredPreviewItem: Product_Preview_Items
	previewItems: Product_Preview_Items[]
	isInternalProduct: boolean
	isSuspended: boolean
	categoryId: string
	createdAt: Date
	createdAtSnapshot: Date
	isSold: boolean
}

export const transformNewsItemToFields = (
	newsItem: NewsItem
): NewsItemFields => {

  const externalProduct = newsItem?.externalProduct
  const internalProduct = newsItem?.product

  const pSnapshot = internalProduct?.currentSnapshot
  const externalPSnapshot = externalProduct?.currentExternalProductSnapshot

  const featuredVariant = internalProduct?.featuredVariant
  const sellerLicense = internalProduct?.sellerLicense

	const isInternalProduct = !!featuredVariant?.variantId

	const productId = internalProduct?.id
	const externalProductId = externalProduct?.id

  const model = isInternalProduct
		? pSnapshot?.model
		: externalPSnapshot?.model

  const make = isInternalProduct
		? pSnapshot?.make
		: externalPSnapshot?.make

  const caliber = isInternalProduct
		? pSnapshot?.caliber
		: externalPSnapshot?.caliber

  const barrelLength = isInternalProduct
		? pSnapshot?.barrelLength
		: externalPSnapshot?.barrelLength

  const action = isInternalProduct
		? pSnapshot?.actionType
		: externalPSnapshot?.action

  const state = isInternalProduct
		? pSnapshot?.dealer?.state
		: externalPSnapshot?.state

  const soldOutStatus = isInternalProduct
		? internalProduct?.soldOutStatus
		: externalPSnapshot?.soldText ?? SoldOutStatus.AVAILABLE

  const description = isInternalProduct
		? pSnapshot?.description
		: externalPSnapshot?.description

  const price = isInternalProduct
		? featuredVariant?.price
		: externalPSnapshot?.price

  const priceWas = newsItem?.product?.featuredVariant?.priceWas

  const title = isInternalProduct
		? pSnapshot?.title
		: externalPSnapshot?.title
		?? `${make} ${model} ${caliber}`

  const serialNumber = isInternalProduct
		? pSnapshot?.serialNumber
		: externalPSnapshot?.serialNumber

  const condition = isInternalProduct
		? pSnapshot?.condition
		: externalPSnapshot?.condition

  const adType = isInternalProduct
		? "Private Ad"
		: externalPSnapshot?.adType

  const licenseNumber = isInternalProduct
		? sellerLicense?.licenseNumber
		: externalPSnapshot?.licenseNumber

  const phoneNumber = isInternalProduct
		? "" // no number for on-platform products
		: externalPSnapshot?.phoneNumber

  const sourceSite = newsItem?.sourceSite

	const sourceSiteUrl = isInternalProduct
		? "www.gunmarketplace.com.au"
		: externalProduct?.sourceSiteUrl

  const previewItems = isInternalProduct
		? featuredVariant?.previewItems
		: externalPSnapshot?.previewItems

  const featuredPreviewItem = previewItems?.[0]

	const isSuspended = newsItem?.isSuspended
		|| internalProduct?.isSuspended

	const isSold = (
		newsItem?.product?.isSoldElsewhere ||
		newsItem?.product?.soldOutStatus === SoldOutStatus.SOLD_OUT ||
		newsItem.externalProduct?.currentExternalProductSnapshot?.isSold
	) ? true
		: false

	const categoryId = internalProduct?.categoryId
		?? externalProduct?.categoryId

	const createdAtSnapshot = internalProduct?.currentSnapshot?.createdAt
		? new Date(internalProduct?.currentSnapshot?.createdAt)
		: externalProduct?.currentExternalProductSnapshot?.createdAt
			? new Date(externalProduct?.currentExternalProductSnapshot?.createdAt)
			: undefined

	const createdAt = internalProduct?.createdAt
		? new Date(internalProduct?.createdAt)
		: externalProduct?.createdAt
			? new Date(externalProduct?.createdAt)
			: undefined

	return {
		productId,
		externalProductId,
		model,
		make,
		caliber,
		barrelLength,
		action,
		state,
		soldOutStatus,
		description,
		price,
		priceWas,
		title,
		serialNumber,
		condition,
		adType,
		licenseNumber,
		phoneNumber,
		sourceSite,
		sourceSiteUrl,
		featuredPreviewItem,
		previewItems,
		isInternalProduct,
		isSuspended,
		categoryId,
		createdAtSnapshot,
		createdAt,
		isSold,
	}
}


export const transformExternalProductToFields = (
	internalProduct: Product,
	externalProduct?: External_Products,
): NewsItemFields => {


  const pSnapshot = internalProduct?.currentSnapshot
  const externalPSnapshot = externalProduct?.currentExternalProductSnapshot

  const featuredVariant = internalProduct?.featuredVariant
  const sellerLicense = internalProduct?.sellerLicense

	const isInternalProduct = !!featuredVariant?.variantId

	const productId = internalProduct?.id
	const externalProductId = externalProduct?.id

  const model = isInternalProduct
		? pSnapshot?.model
		: externalPSnapshot?.model

  const make = isInternalProduct
		? pSnapshot?.make
		: externalPSnapshot?.make

  const caliber = isInternalProduct
		? pSnapshot?.caliber
		: externalPSnapshot?.caliber

  const barrelLength = isInternalProduct
		? pSnapshot?.barrelLength
		: externalPSnapshot?.barrelLength

  const action = isInternalProduct
		? pSnapshot?.actionType
		: externalPSnapshot?.action

  const state = isInternalProduct
		? pSnapshot?.dealer?.state
		: externalPSnapshot?.state

  const soldOutStatus = isInternalProduct
		? internalProduct?.soldOutStatus
		: externalPSnapshot?.soldText ?? SoldOutStatus.AVAILABLE

  const description = isInternalProduct
		? pSnapshot?.description
		: externalPSnapshot?.description

  const price = isInternalProduct
		? featuredVariant?.price
		: externalPSnapshot?.price

  const priceWas = featuredVariant?.priceWas

  const title = isInternalProduct
		? pSnapshot?.title
		: externalPSnapshot?.title
		?? `${make} ${model} ${caliber}`

  const serialNumber = isInternalProduct
		? pSnapshot?.serialNumber
		: externalPSnapshot?.serialNumber

  const condition = isInternalProduct
		? pSnapshot?.condition
		: externalPSnapshot?.condition

  const adType = isInternalProduct
		? "Private Ad"
		: externalPSnapshot?.adType

  const licenseNumber = isInternalProduct
		? sellerLicense?.licenseNumber
		: externalPSnapshot?.licenseNumber

  const phoneNumber = isInternalProduct
		? "" // no number for on-platform products
		: externalPSnapshot?.phoneNumber

  const sourceSite = externalProduct?.sourceSite
		?? "gunmarketplace.com.au"

	const sourceSiteUrl = isInternalProduct
		? "gunmarketplace.com.au"
		: externalProduct?.sourceSiteUrl

  const previewItems = isInternalProduct
		? featuredVariant?.previewItems
		: externalPSnapshot?.previewItems

  const featuredPreviewItem = previewItems?.[0]

	const isSuspended = internalProduct?.isSuspended

	const isSold = (
		internalProduct?.isSoldElsewhere ||
		internalProduct?.soldOutStatus === SoldOutStatus.SOLD_OUT ||
		externalProduct?.currentExternalProductSnapshot?.isSold
	) ? true
		: false

	const categoryId = internalProduct?.categoryId
		?? externalProduct?.categoryId

	const createdAtSnapshot = internalProduct?.currentSnapshot?.createdAt
		? new Date(internalProduct?.currentSnapshot?.createdAt)
		: externalProduct?.currentExternalProductSnapshot?.createdAt
			? new Date(externalProduct?.currentExternalProductSnapshot?.createdAt)
			: undefined

	const createdAt = internalProduct?.createdAt
		? new Date(internalProduct?.createdAt)
		: externalProduct?.createdAt
			? new Date(externalProduct?.createdAt)
			: undefined

	return {
		productId,
		externalProductId,
		model,
		make,
		caliber,
		barrelLength,
		action,
		state,
		soldOutStatus,
		description,
		price,
		priceWas,
		title,
		serialNumber,
		condition,
		adType,
		licenseNumber,
		phoneNumber,
		sourceSite,
		sourceSiteUrl,
		featuredPreviewItem,
		previewItems,
		isInternalProduct,
		isSuspended,
		categoryId,
		createdAtSnapshot,
		createdAt,
		isSold,
	}
}