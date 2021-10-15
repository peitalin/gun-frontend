
import {
	NewsItem,
	External_Products,
	Product_Preview_Items,
	Product,
	ProductPreview,
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
	dealerState: string
	sellerLicenseVerified: boolean
}

export const transformNewsItemToFields = (
	newsItem: NewsItem
): NewsItemFields => {

	// NOTE: internalProduct has preference over externalProduct
	// will display internalProduct data first
  const externalProduct = newsItem?.externalProduct
  const internalProduct = newsItem?.product
	// ProductPreview is a lite version of newsItem product info
	const productPreview = newsItem.productPreview

	if (productPreview?.id) {
		return transformNewsItemToFieldsProductPreview(newsItem)
	} else {
		return transformExternalProductToFields({
			internalProduct,
			externalProduct,
			// newsItem specific fields
			newsItemSourceSite: newsItem.sourceSite,
			newsItemIsSuspended: newsItem.isSuspended,
		})
	}
}

export const transformExternalProductToFields = ({
	internalProduct,
	externalProduct,
	newsItemSourceSite,
	newsItemIsSuspended,
}:{
	internalProduct: Product,
	externalProduct: External_Products,
	// newsItem specific fields
	newsItemSourceSite: string,
	newsItemIsSuspended: boolean,
}): NewsItemFields => {

  const pSnapshot = internalProduct?.currentSnapshot
  const externalPSnapshot = externalProduct?.currentExternalProductSnapshot

  const featuredVariant = internalProduct?.featuredVariant
  const sellerLicense = internalProduct?.sellerLicense
	const sellerLicenseVerified = internalProduct?.sellerLicense?.verified

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

  const priceWas = internalProduct?.featuredVariant?.priceWas

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

	const sourceSiteUrl = isInternalProduct
		? "www.gunmarketplace.com.au"
		: externalProduct?.sourceSiteUrl

  const previewItems = isInternalProduct
		? featuredVariant?.previewItems
		: externalPSnapshot?.previewItems

  const featuredPreviewItem = previewItems?.[0]

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

  const dealerState = internalProduct?.currentSnapshot?.dealer?.state
    ?? externalProduct?.currentExternalProductSnapshot?.state

	// newsItem specific fields
  const sourceSite = newsItemSourceSite

	const isSuspended = newsItemIsSuspended
		|| internalProduct?.isSuspended

	const isSold = (
		internalProduct?.isSoldElsewhere ||
		internalProduct?.soldOutStatus === SoldOutStatus.SOLD_OUT ||
		externalProduct?.currentExternalProductSnapshot?.isSold
	) ? true
		: false


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
		dealerState,
		sellerLicenseVerified,
	}
}


export const transformNewsItemToFieldsProductPreview = (
	newsItem: NewsItem
): NewsItemFields => {

	let productPreview = newsItem?.productPreview
	let p = productPreview

	return {
		productId: p.id,
		externalProductId: undefined,
		make: p.make,
		model: p.model,
		caliber: p.caliber,
		barrelLength: undefined,
		action: p.actionType,
		state: p.dealerState,
		soldOutStatus: p.soldOutStatus,
		description: undefined,
		price: p.price,
		priceWas: p.priceWas,
		title: p.title,
		serialNumber: p.serialNumber,
		condition: p.condition,
		adType: p.adType,
		licenseNumber: p.sellerLicenseNumber,
		phoneNumber: undefined,
		sourceSite: newsItem.sourceSite,
		sourceSiteUrl: p.sourceSiteUrl,
		featuredPreviewItem: p.featuredPreview,
		previewItems: [],
		isInternalProduct: !!p.sourceSiteUrl?.match(/gunmarketplace/i),
		isSuspended: p.isSuspended || newsItem.isSuspended,
		categoryId: p.categoryId,
		createdAtSnapshot: undefined,
		createdAt: newsItem.createdAt,
		isSold: p.isSoldElsewhere || p.soldOutStatus === SoldOutStatus.SOLD_OUT,
		dealerState: p.dealerState,
		sellerLicenseVerified: p.sellerLicenseVerified,
	}
}
