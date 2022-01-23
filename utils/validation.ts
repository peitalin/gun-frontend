import { ListingType } from 'typings/gqlTypes';
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
        .max(maxLengthProductName, `Title can't be longer than ${maxLengthTitle} chars`)
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
        .max(100)
        .required('Needs a caliber'),
      serialNumber: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a serial number'),
      location: Yup.string()
        .nullable()
        .max(100),
      magazineCapacity: Yup.string()
        .nullable()
        .max(100),
      barrelLength: Yup.string()
        .max(100)
        .nullable(),
      // dealerId: Yup.string()
      //   .required('Must choose a dealer'),
      // dealerRequired: Yup.boolean(),
      dealerId: Yup.string()
        .test("dealerId", "Pick a dealer for escrow listings", function(value) {
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          if (this.parent.listingType !== ListingType.CLASSIFIED) {
            // value = dealerId must be supplied
            return !!value
          } else {
            // no dealerid needed for classified Ads, return true
            return true
          }
        }),
      categoryId: Yup.string()
        .required("Pick a category"),
      sellerLicenseId: Yup.string()
        .required("Pick a license"),
      currentVariants: Yup.array().of(Yup.object({
          price: Yup.number().nullable()
            .min(minPrice, `Minimum price: \$${minPrice/100}`)
            .max(maxPrice, "Max price: $10,000")
            .required('Add a price'),
          priceWas: Yup.number().nullable()
            .min(minPrice, `Minimum price: \$${minPrice/100}`)
            .max(maxPrice, "Max price: $10,000"),
            // priceWas no longer less than price
            // since priceWas represents initialPrice when the product was created
          variantName: Yup.string()
            .nullable(),
          variantDescription: Yup.string()
            .nullable(),
          isDefault: Yup.boolean()
            .required("set default variant"),
          previewItems: Yup.array().of(
              Yup.object({
                id: Yup.string().nullable(),
                // imageId: Yup.string().nullable().matches(imageIdRegex),
                imageId: Yup.string().nullable(),
                youTubeEmbedLink: Yup.string().nullable(),
              })
            )
            .min(1, "Must have at least 1 file attached"),
        })),
      allowBids: Yup.boolean()
        .required("Must set allowBids"),
      isPublished: Yup.boolean()
        .required("Must set isPublished"),
      listingType: Yup.string()
        .required('Listing type required'),
      productType: Yup.string()
        .required('Product type required'),
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
        .max(100)
        .required('Needs a caliber'),
      serialNumber: Yup.string()
        .min(0)
        .max(100)
        .required('Needs a serial number'),
      location: Yup.string()
        .min(0)
        .max(100),
      magazineCapacity: Yup.string()
        .max(100)
        .nullable(),
      barrelLength: Yup.string()
        .max(100)
        .nullable(),
      // dealerId: Yup.string()
      //   .required('Must choose a dealer'),
      dealerId: Yup.string()
        .test("dealerId", "Pick a dealer for escrow listings", function(value) {
          // this.path: the string path of the current validation
          // this.schema: the resolved schema object that the test is running against.
          // this.options: the options object that validate() or isValid() was called with
          // this.parent: in the case of nested schema, this is the value of the parent object
          // this.createError(Object: { path: String, message: String }):
          if (this.parent.listingType !== ListingType.CLASSIFIED) {
            // value = dealerId must be supplied
            return !!value
          } else {
            // no dealerid needed for classified Ads, return true
            return true
          }
        }),
      categoryId: Yup.string()
        .required("Pick a category"),
      sellerLicenseId: Yup.string()
        .required("Pick a license"),
      currentVariants: Yup.array().of(
          Yup.object({
            price: Yup.number().nullable(true)
              .min(minPrice, `Minimum price: \$${minPrice/100}`)
              .max(maxPrice, "Max price: $10,000")
              .required('Add a price'),
            priceWas: Yup.number().nullable(true)
              .min(minPrice, `Minimum price: \$${minPrice/100}`)
              .max(maxPrice, "Max price: $10,000"),
              // priceWas no longer less than price
              // since priceWas represents initialPrice when the product was created
              // .test("priceWas", "Must exceed price (now)", function(value) {
              //   // this.path: the string path of the current validation
              //   // this.schema: the resolved schema object that the test is running against.
              //   // this.options: the options object that validate() or isValid() was called with
              //   // this.parent: in the case of nested schema, this is the value of the parent object
              //   // this.createError(Object: { path: String, message: String }):
              //   if (!!this.parent.priceWas) {
              //     return this.parent.price <= value
              //   } else {
              //     return true
              //   }
              // }),
            variantName: Yup.string()
              .nullable(),
            variantDescription: Yup.string()
              .nullable(),
            isDefault: Yup.boolean()
              .required("set default variant"),
            previewItems: Yup.array().of(
                Yup.object({
                  id: Yup.string().nullable(),
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
      allowBids: Yup.boolean()
        .required("Must set allowBids"),
      isPublished: Yup.boolean()
        .required("Must choose yes or no"),
      productId: Yup.string()
        .required("Must have a productId")
        .matches(productIdRegex),
      listingType: Yup.string()
        .required('Listing type required'),
      productType: Yup.string()
        .nullable(),
        // .required('Product type required'),
    }),


  // Create Store Payout
  CreateStorePayout:
    Yup.object().shape({
      // userId: Yup.string()
      //   .required('A userId is needed!'),
      // name: Yup.string()
      //   .nullable(),
      //   // .max(maxLengthStoreName)
      //   // .min(minLengthStoreName, "Must be more than 3 letters!"),
      // bio: Yup.string().nullable(),
      // website: Yup.string().nullable(),
      // profileId: Yup.string().nullable(),
      // coverId: Yup.string().nullable(),
      bsb: Yup.string()
        .min(6, "Min 6 digits!")
        .max(6, "Min 6 digits!")
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
      name: Yup.string().nullable(),
        // .required("Can't be empty")
        // .min(3, "Must be more than 3 letters!"),
      bio: Yup.string().nullable(),
      website: Yup.string().nullable(),
      profileId: Yup.string().nullable(),
      coverId: Yup.string().nullable(),
      bsb: Yup.string()
        .min(6, "Min 6 digits!")
        .max(6, "Min 6 digits!")
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

  // Dealer Profile deletions
  DeleteDealer:
    Yup.object().shape({
      dealerId: Yup.string()
        .required('dealerId required'),
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

  // Add or Edit UserLicense form
  AddOrEditUserLicense:
    Yup.object().shape({
      firstName: Yup.string()
        .min(2, "Must be at least 2 chars!")
        .max(20, "Must be less than 15 chars!")
        .required("required"),
      lastName: Yup.string()
        .min(2, "Must be at least 2 chars!")
        .max(20, "Must be less than 20 chars!")
        .required("required"),
      licenseNumber: Yup.string()
        .min(5, "Must be at least 5 digits!")
        .max(20, "Must be less than 20 digits!")
        .required("required"),
      licenseExpiry: Yup.date()
        .required("required"),
      licenseCategory: Yup.array().of(Yup.string())
        .test({ message: 'Choose a category', test: arr => arr.length > 0 })
        .required("required"),
      licenseState: Yup.string()
        .required("required"),
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


  // Change Payout  email
  ChangePayoutMethod:
    Yup.object().shape({
      bsb: Yup.string()
        .min(6, "Min 6 digits!")
        .max(6, "Min 6 digits!")
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

  // User email verify
  verifyEmail:
    Yup.object().shape({
      userId: Yup.string()
        .required('userId required'),
      verifyEmail: Yup.boolean(),
    }),

  // Suspend and unsuspend products
  SuspendUnsuspendProduct:
    Yup.object().shape({
      productId: Yup.string()
        .required('productId required'),
      isSuspended: Yup.boolean(),
    }),

  // Suspend and unsuspend store
  SuspendUnsuspendStore:
    Yup.object().shape({
      storeId: Yup.string()
        .required('storeId required'),
      isSuspended: Yup.boolean(),
    }),


  CreateInitialBid:
    Yup.object().shape({
      offerPrice: Yup.number().nullable()
        .min(minPrice, `Minimum price: \$${minPrice/100}`)
        .max(maxPrice, "Max price: $10,000")
        .required('Add a price'),
    }),


  SendBid:
    Yup.object().shape({
      offerPrice: Yup.number().nullable()
        .min(minPrice, `Minimum price: \$${minPrice/100}`)
        .max(maxPrice, "Max price: $10,000")
        .required('Add a price'),
      /// Graphql validates this, not frontend
      // chatRoomId: Yup.string()
      //   .required('chatRoomId missing'),
      // productId: Yup.string()
      //   .required('productId missing'),
      // productSnapshotId: Yup.string()
      //   .required('productSnapshotId missing'),
      // variantId: Yup.string()
      //   .required('variantId missing'),
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


  SaveSearch:
    Yup.object().shape({
      // searchTerm: Yup.string()
      //   .required('Search term required'),
      // categorySlug: Yup.string().nullable(),
      // dealerState: Yup.string().nullable(),
      make: Yup.string().nullable(),
      model: Yup.string().nullable(),
      caliber: Yup.string().nullable(),
    }),

  EditPromotedSlot:
    Yup.object().shape({
      promotedSlotId: Yup.string()
        .required('Promoted Slot ID required'),
      isAvailableForPurchase: Yup.boolean().nullable(),
      reservePrice: Yup.number().nullable(),
      durationInHours: Yup.number().nullable(),
    }),

  // Sign Up
  SignUpEmail:
    Yup.object().shape({
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed'),
      password: Yup.string()
        .min(6, "Must be at least 6 letters")
        .required('A password is needed'),
      claimId: Yup.string(),
    }),

  // Sign Up/Log In And Claim
  SignUpAndClaimItem:
    Yup.object().shape({
      claimId: Yup.string(),
      dealerId: Yup.string(),
      previewItems: Yup.array().of(
          Yup.object({
            id: Yup.string().nullable(),
            imageId: Yup.string().nullable(),
            youTubeEmbedLink: Yup.string().nullable(),
          })
        ).min(1, "Must have at least 1 image"),
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed'),
      password: Yup.string()
        .min(6, "Must be at least 6 letters")
        .required('A password is needed'),
      phoneNumber: Yup.string()
        .nullable(),
      countryCode: Yup.string()
        .nullable(),
      firstName: Yup.string()
        .min(2, "Must be at least 2 chars!")
        .max(20, "Must be less than 20 chars!")
        .required("required"),
      lastName: Yup.string()
        .min(2, "Must be at least 2 chars!")
        .max(20, "Must be less than 20 chars!")
        .required("required"),
      licenseNumber: Yup.string()
        .min(5, "Must be at least 5 digits!")
        .max(20, "Must be less than 20 digits!")
        .required("required"),
      licenseExpiry: Yup.date()
        .required("required"),
      licenseCategory: Yup.array().of(Yup.string())
        .required("required"),
      licenseState: Yup.string()
        .required("required"),
    }),
  // Log In And Claim
  LogInAndClaim:
    Yup.object().shape({
      claimId: Yup.string(),
      dealerId: Yup.string(),
      previewItems: Yup.array().of(
          Yup.object({
            id: Yup.string().nullable(),
            imageId: Yup.string().nullable(),
            youTubeEmbedLink: Yup.string().nullable(),
          })
        ),
        // allow 0 images
      email: Yup.string()
        .email("Not a valid email")
        .required('An email is needed'),
      password: Yup.string()
        .min(6, "Must be at least 6 letters")
        .required('A password is needed'),
    }),

  SwapImagesForExternalProduct:
    Yup.object().shape({
      claimId: Yup.string(),
      previewItems: Yup.array().of(
          Yup.object({
            id: Yup.string().nullable(),
            imageId: Yup.string().nullable(),
            youTubeEmbedLink: Yup.string().nullable(),
          })
        )
        // allow 0 images
    }),

}
