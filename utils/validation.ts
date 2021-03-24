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
        .required('Needs an action type'),
      caliber: Yup.string()
        .min(0)
        .max(100),
      serialNumber: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a serial number'),
      location: Yup.string()
        .min(0)
        .max(100),
      magazineCapacity: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a magazine capacity'),
      barrelLength: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a barrelLength'),
      dealerId: Yup.string()
        .when('dealer', {
          is: (val) => {
            // console.log("dealer val: ", val)
            return val?.licenseNumber === undefined
              || val?.address === undefined
              || val?.name === undefined
          },
          then: Yup.string()
            .min(3)
            .max(100)
            .required("A dealer must be chosen"),
          otherwise: Yup.string().nullable(),
        }),

      dealer: Yup.object().shape({
          licenseNumber: Yup.string()
            .min(5, "Must be at least 5 digits!")
            .max(15, "Must be less than 15 digits!"),
          name: Yup.string()
            .min(0)
            .max(100),
          address: Yup.string()
            .min(0)
            .max(100),
          city: Yup.string()
            .min(0)
            .max(100),
          state: Yup.string()
            .min(0)
            .max(100),
          postCode: Yup.string()
            .min(0)
            .max(100),
        })
        .test("dealer", "Dealer license number needed", function(value) {
          let validatingDealerForm = !this.parent.dealerId && !!this.parent.dealer ;
          if (
            validatingDealerForm &&
            !this.parent.dealer?.licenseNumber
          ) {
            return false
          } else {
            return true
          }
        })
        .test("dealer", "Dealer address needed", function(value) {
          let validatingDealerForm = !this.parent.dealerId && !!this.parent.dealer ;
          if (
            validatingDealerForm &&
            !this.parent.dealer?.address
          ) {
            return false
          } else {
            return true
          }
        })
        .test("dealer", "Dealer name needed", function(value) {
          let validatingDealerForm = !this.parent.dealerId && !!this.parent.dealer ;
          if (
            validatingDealerForm &&
            !this.parent.dealer?.name
          ) {
            return false
          } else {
            return true
          }
        })
        .test("dealer", "A dealer must be chosen or inputted", function(value) {
          // console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          if (!!this.parent.dealerId) {
            return true
          }
          if (!this.parent.dealer && !this.parent.dealerId) {
            return false
          } else {
            return true
          }
        }),
      categoryId: Yup.string()
        .required("Pick a category"),
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
        .required('Needs an action type'),
      caliber: Yup.string()
        .min(0)
        .max(100),
      serialNumber: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a serial number'),
      location: Yup.string()
        .min(0)
        .max(100),
      magazineCapacity: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a magazine capacity'),
      barrelLength: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a barrelLength'),
      dealerId: Yup.string()
        .min(0)
        .max(100)
        .test("dealerId", "A dealer must be chosen", function(value) {
          // console.log("dealerId >>>>>>>>>>>>", value, this)
          if (!this.parent.dealerId && !this.parent.dealer?.licenseNumber) {
            return false
          } else {
            return true
          }
        }),
      dealer: Yup.object().shape({
          licenseNumber: Yup.string()
            .min(0)
            .max(100),
            // .required("licenseNumber required"),
          name: Yup.string()
            .min(0)
            .max(100),
            // .required("dealer name required"),
          address: Yup.string()
            .min(0)
            .max(100),
            // .required("address required"),
          city: Yup.string()
            .min(0)
            .max(100),
          state: Yup.string()
            .min(0)
            .max(100),
          postCode: Yup.string()
            .min(0)
            .max(100),
        })
        .test("dealer", "Dealer license number needed", function(value) {
          if (
            !this.parent.dealerId &&
            !!this.parent.dealer &&
            !this.parent.dealer?.licenseNumber
          ) {
            return false
          } else {
            return true
          }
        })
        .test("dealer", "A dealer must be chosen or inputted", function(value) {
          console.log(">>>>>>>>>>>>", value, this)
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          if (!!this.parent.dealerId) {
            return true
          }
          if (!this.parent.dealer && !this.parent.dealerId) {
            return false
          } else {
            return true
          }
        }),
      categoryId: Yup.string()
        .required("Pick a category"),
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
      profileId: Yup.string().nullable(),
      coverId: Yup.string().nullable(),
      bsb: Yup.string()
        .min(6, "Must 6 digits!")
        .max(6, "Must 6 digits!")
        .required('BSB number required.'),
      accountNumber: Yup.string()
        .min(6, "Must be 6-10 digits!")
        .max(10, "Must be 6-10 digits!")
        .required('bank account number required.'),
      accountName: Yup.string()
        .required('bank account name required.'),
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
      bsb: Yup.string()
        .min(6, "Must 6 digits!")
        .max(6, "Must 6 digits!")
        .required('BSB number required.'),
      accountNumber: Yup.string()
        .min(6, "Must be 6-10 digits!")
        .max(10, "Must be 6-10 digits!")
        .required('bank account number required.'),
      accountName: Yup.string()
        .required('bank account name required.'),
    }),

  // Edit Dealer
  EditDealer:
    Yup.object().shape({
      name: Yup.string().nullable()
        .required("Can't be empty")
        .min(3, "Must be more than 3 letters!"),
      address: Yup.string().nullable(),
      city: Yup.string().nullable(),
      postCode: Yup.string().nullable(),
      state: Yup.string().nullable()
        .required('A license number required.'),
      licenseNumber: Yup.string()
        .min(5, "Must be at least 5 digits!")
        .max(15, "Must be less than 15 digits!")
        .required('A license number required.'),
    }),

  // Create new Dealer
  CreateNewDealer:
    Yup.object().shape({
      name: Yup.string().nullable()
        .required("Can't be empty")
        .min(3, "Must be more than 3 letters!"),
      address: Yup.string().nullable(),
      city: Yup.string().nullable(),
      postCode: Yup.string().nullable(),
      state: Yup.string().nullable()
        .required('A license number required.'),
      licenseNumber: Yup.string()
        .min(5, "Must be at least 5 digits!")
        .max(15, "Must be less than 15 digits!")
        .required('A license number required.'),
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

  // Edit UserProfile form
  EditUserProfile:
    Yup.object().shape({
      firstName: Yup.string()
        .nullable(),
      lastName: Yup.string()
        .nullable(),
      email: Yup.string()
        .email("Not a valid email")
        .nullable(),
      phoneNumber: Yup.string()
        .nullable(),
      countryCode: Yup.string()
        .nullable(),
      areaCode: Yup.string()
        .nullable(),
    }),

  // Edit UserLicense form
  EditUserLicense:
    Yup.object().shape({
      licenseNumber: Yup.string()
        .min(5, "Must be at least 5 digits!")
        .max(15, "Must be less than 15 digits!")
        .required(),
      licenseExpiry: Yup.date()
        .required(),
      licenseCategory: Yup.array().of(Yup.string())
        .nullable(),
      licenseState: Yup.string()
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
  ChangePayoutMethod:
    Yup.object().shape({
      bsb: Yup.string()
        .min(6, "Must 6 digits!")
        .max(6, "Must 6 digits!")
        .required('A BSB number required.'),
      accountNumber: Yup.string()
        .min(6, "Must be 6-10 digits!")
        .max(10, "Must be 6-10 digits!")
        .required('bank account number required.'),
      accountName: Yup.string()
        .required('bank account name required.'),
    }),

  // Refunds
  Refund:
    Yup.object().shape({
      orderId: Yup.string()
        .required('orderId required'),
      reason: Yup.string()
        .required('reason required'),
      reasonDetails: Yup.string()
        .required('reasonDetails - bank refund ID required'),
    }),

  // Payment Intent Authorization Cancels
  PaymentCancel:
    Yup.object().shape({
      orderId: Yup.string()
        .required('orderId required'),
      markProductAbandoned: Yup.boolean(),
    }),

  // User license approvals
  ApproveUnapproveUserLicense:
    Yup.object().shape({
      userId: Yup.string()
        .required('userId required'),
      verified: Yup.boolean(),
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


  // Create Random Products
  RandomProductsConfig:
    Yup.object().shape({
      count: Yup.number()
        .required('count required'),
      alwaysPublish: Yup.boolean()
        .required("alwaysPublish required"),
      alwaysFewestPreviews: Yup.boolean()
        .required("alwaysFewestPreviews required"),
      alwaysGreatestPreviews: Yup.boolean()
        .required("alwaysGreatestPreviews required"),
    }),

  CreateDealer: Yup.object().shape({
      dealerId: Yup.string()
        .nullable(),
      dealer: Yup.object().shape({
        licenseNumber: Yup.string()
          .max(100)
          .nullable(),
        name: Yup.string()
          .max(100)
          .nullable(),
        address: Yup.string()
          .max(100)
          .nullable(),
        city: Yup.string()
          .max(100)
          .nullable(),
        state: Yup.string()
          .max(100)
          .nullable(),
        postCode: Yup.string()
          .max(100)
          .nullable(),
        }),
    }),
}
