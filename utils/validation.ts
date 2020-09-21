import * as Yup from 'yup';
import {
  imageIdRegex,
  fileIdRegex,
  productVariantIdRegex,
  productIdRegex,
  maxPrice,
  minPrice,
  maxLengthProductDescription,
  minLengthStoreName,
  maxLengthStoreName,
  minLengthProductTagline,
  maxLengthProductTagline,
  minLengthPassword,
  minLengthUsername,
  minLengthProductName,
  maxLengthProductName,
  minLengthTitle,
  maxLengthTitle,
} from "./limitsAndRules";



export const validationSchemas = {

  // Product Create Form
  ProductCreate:
    Yup.object().shape({
      title: Yup.string()
        .min(minLengthProductName, `Title must be longer than ${minLengthTitle} chars`)
        .max(maxLengthProductName, `title can't be longer than ${maxLengthTitle} chars`)
        .required('Title is required'),
      description: Yup.string()
        .required('Needs a description')
        .max(maxLengthProductDescription)
        .test("description", "Needs a description", function(value) {
          return value !== '<p></p>'
        }),
      condition: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a condition'),
      make: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a make'),
      model: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a model'),
      ammoType: Yup.string()
        .min(0)
        .max(100),
      actionType: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a actionType'),
      boreDiameter: Yup.string()
        .min(0)
        .max(100),
      serialNumber: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a serialNumber'),
      location: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a location'),
      dealer: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a dealer'),
      categoryId: Yup.string()
        .required("Pick a category"),
      tags: Yup.array().of(Yup.string())
        .nullable(),
      currentVariants: Yup.array().of(Yup.object({
          price: Yup.number().nullable()
            .min(minPrice, "Minimum price: $1")
            .max(maxPrice, "Max price: $10,000")
            .required('Add a price'),
          priceWas: Yup.number().nullable()
            .min(minPrice, "Minimum price: $1")
            .max(maxPrice, "Max price: $10,000")
            .test("priceWas", "Must exceed price (now)", function(value) {
              // console.log(">>>>>>>>>>>>", value, this)
              // this.path: the string path of the current validation
              // this.schema: the resolved schema object that the test is running against.
              // this.options: the options object that validate() or isValid() was called with
              // this.parent: in the case of nested schema, this is the value of the parent object
              // this.createError(Object: { path: String, message: String }):
              if (!!this.parent.priceWas) {
                return this.parent.price < value
              } else {
                return true
              }
            }),
          variantName: Yup.string()
            .required('Add a name'),
          variantDescription: Yup.string()
            .required('Add a description'),
          isDefault: Yup.boolean()
            .required("set default variant"),
          previewItems: Yup.array().of(
              Yup.object({
                id: Yup.string().nullable(),
                position: Yup.number().nullable(),
                // imageId: Yup.string().nullable().matches(imageIdRegex),
                imageId: Yup.string().nullable(),
                youTubeEmbedLink: Yup.string().nullable(),
              })
            )
            .min(1, "Must have at least 1 file attached"),
        })),
      isPublished: Yup.boolean()
        .required("Must set isPublished"),
    }),


  // Product Edit Form
  ProductEdit:
    Yup.object().shape({
      name: Yup.string()
        .min(minLengthProductName, `Name must be longer than ${minLengthProductName} chars`)
        .max(maxLengthProductName, `Name can't be longer than ${maxLengthProductName} chars`)
        .required('Product needs a name'),
      tagline: Yup.string()
        .min(minLengthProductTagline)
        .max(maxLengthProductTagline)
        .required('Needs a tagline'),
      description: Yup.string()
        .required('Needs a description')
        .max(maxLengthProductDescription)
        .test("description", "Needs a description", function(value) {
          return value !== '<p></p>'
        }),
      categoryId: Yup.string()
        .required("Pick a category"),
      tags: Yup.array().of(Yup.string())
        .nullable(),
      currentVariants: Yup.array().of(
          Yup.object({
            price: Yup.number().nullable(true)
              .min(minPrice, "Minimum price: $1")
              .max(maxPrice, "Max price: $10,000")
              .required('Add a price'),
            priceWas: Yup.number().nullable(true)
              .min(minPrice, "Minimum price: $1")
              .max(maxPrice, "Max price: $10,000")
              .test("priceWas", "Must exceed price (now)", function(value) {
                // this.path: the string path of the current validation
                // this.schema: the resolved schema object that the test is running against.
                // this.options: the options object that validate() or isValid() was called with
                // this.parent: in the case of nested schema, this is the value of the parent object
                // this.createError(Object: { path: String, message: String }):
                if (!!this.parent.priceWas) {
                  return this.parent.price < value
                } else {
                  return true
                }
              }),
            variantName: Yup.string()
              .required('Add a name'),
            variantDescription: Yup.string()
              .required('Add a description'),
            isDefault: Yup.boolean()
              .required("set default variant"),
            previewItems: Yup.array().of(
                Yup.object({
                  id: Yup.string().nullable(),
                  position: Yup.number().nullable(),
                  // imageId: Yup.string().nullable().matches(imageIdRegex),
                  imageId: Yup.string().nullable(),
                  youTubeEmbedLink: Yup.string().nullable(),
                })
              )
              .min(1, "Must have at least 1 file attached"),
            variantId: Yup.string()
              .nullable(), // null -> creates a variantId on the backend
          })
        ),
      isPublished: Yup.boolean()
        .required("Must choose yes or no"),
      productId: Yup.string()
        .required("Must have a productId")
        .matches(productIdRegex)
    }),

  // Create Store Promo Code
  CreateStorePromoCode:
    Yup.object().shape({
      promoCode: Yup.string()
        .min(3, 'Promo Code should be longer than 2 chars')
        .required('Promo Code needs a name'),
      valuePercentageOff: Yup.number().nullable()
        .min(0, 'percentage off cannot be negative')
        .max(100, 'percentage off cannot exceed 100%'),
      valueDollarsOff: Yup.number().nullable()
        .min(0, 'dollars off cannot be negative'),
      specificProductId: Yup.string().nullable()
        .test("specificProductId", "Invalid productId.", function(value) {
          if (!!value && typeof value === 'string') {
            return value.startsWith("prod")
          } else {
            return true
          }
        }),
      specificProductVariantId: Yup.string().nullable(),
      minimumPurchaseAmount: Yup.number().nullable(),
      minimumQuantity: Yup.number().nullable(),
      start: Yup.date().nullable(),
      end: Yup.date().nullable(),
      isDisabled: Yup.boolean()
        .required(),
    }),

  // Create Store
  CreateStore:
    Yup.object().shape({
      userId: Yup.string()
        .required('A userId is needed!'),
      storeId: Yup.string()
        .required('A storeId is needed!'),
      name: Yup.string()
        .nullable()
        .required('Name required!')
        .max(maxLengthStoreName)
        .min(minLengthStoreName, "Must be more than 3 letters!"),
      bio: Yup.string().nullable(),
      website: Yup.string().nullable(),
      profileId: Yup.string()
        .required('A profile pic is needed!'),
      coverId: Yup.string().nullable(),
      payoutEmail: Yup.string()
        .email("Not a valid email")
        .required('A payout email is needed!'),
    }),

  // Edit Store
  EditStore:
    Yup.object().shape({
      name: Yup.string().nullable()
        .required("Can't be empty")
        .min(3, "Must be more than 3 letters!"),
      bio: Yup.string().nullable(),
      website: Yup.string().nullable(),
      profileId: Yup.string().nullable(),
      coverId: Yup.string().nullable(),
      payoutEmail: Yup.string()
        .email("Not a valid email")
        .required('A payout email is needed!'),
    }),

  // Sign Up
  SignUp:
    Yup.object().shape({
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed'),
      password: Yup.string()
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`)
        .required('password is needed'),
    }),

  // Edit UserEmail form
  EditUserEmail:
    Yup.object().shape({
      firstName: Yup.string()
        .nullable(),
      lastName: Yup.string()
        .nullable(),
      email: Yup.string()
        .email("Not a valid email")
        .nullable(),
    }),

  // Password Reset
  PasswordReset:
    Yup.object().shape({
      currentPassword: Yup.string()
        .required('Current password required!')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`),
      newPassword: Yup.string()
        .required('Enter a new password')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`)
        .test("newPassword", "Can't be your old password", function(value) {
          // console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          return this.parent.currentPassword !== value
        }),
      newPasswordAgain: Yup.string()
        .required('please confirm your new password')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`)
        .test("newPasswordAgain", "Must be the same password", function(value) {
          // console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          return this.parent.newPassword === value
        }),
    }),

  // Password Reset Emailer
  PasswordResetEmail:
    Yup.object().shape({
      newPassword: Yup.string()
        .required('Enter a new password')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`)
        .test("newPassword", "Can't be your old password", function(value) {
          // console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          return this.parent.currentPassword !== value
        }),
      newPasswordAgain: Yup.string()
        .required('please confirm your new password')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`)
        .test("newPasswordAgain", "Must be the same password", function(value) {
          // console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          return this.parent.newPassword === value
        }),
    }),

  // Signup
  Signup:
    Yup.object().shape({
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed!'),
      password: Yup.string()
        .required('Password required!')
        .min(minLengthPassword, `Must be more than ${minLengthPassword} letters!`),
    }),

  // Change Payout  email
  ChangePayoutEmail:
    Yup.object().shape({
      newPayoutEmail: Yup.string()
        .email("Not a valid email")
        .required('Cannot leave email blank'),
    }),

  // Refunds
  Refund:
    Yup.object().shape({
      orderId: Yup.string()
        .required('orderId required'),
      refundOrderItems: Yup.array().of(
          Yup.object({
            orderItemId: Yup.string()
              .required('missing an orderItemId'),
            disableItem: Yup.boolean()
              .required('missing disableItem'),
            refundPayoutItems: Yup.array().of(
              Yup.object({
                payeeId: Yup.string()
                  .required('missing a payeeId (storeId or affiliateId)'),
                payeeType: Yup.string()
                  .required('missing a PayeeType (STORE or AFFILIATE)'),
                amount: Yup.number()
                  .required('Add an amount'),
              })
            )
          })
      ),
      chargeId: Yup.string()
        .required('chargeId required'),
      paymentIntentId: Yup.string() // Stripe Only
        .nullable(true)
        .test("paymentIntentId", "Must exist for Stripe transactions", function(value) {
          if (this.parent.paymentProcessor === "Stripe") {
            return !!value
          } else {
            // if Paypal, return true (passes validation check)
            return true
          }
        }),
      paypalInvoiceNumber: Yup.string()
        .nullable(true), // Paypal Only
      taxes: Yup.number()
        .required('taxes required'),
      paymentProcessingFee: Yup.number()
        .required('paymentProcessingFee required'),
      paymentProcessor: Yup.string()
        .required('paymentProcessor required'),
        // Stripe || Paypal
    }),


  // Creating Zendesk Support Ticket
  CreateSupportTicket:
    Yup.object().shape({
      name: Yup.string()
        .nullable(),
      lastName: Yup.string()
        .nullable(),
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed'),
      subject: Yup.string()
        .required('Subject is needed'),
      message: Yup.string()
        .required('A message is needed'),
    }),

}
