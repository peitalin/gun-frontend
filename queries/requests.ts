
import {
  ID,
  User,
  PaymentProcessor,
  RegisterUploadMutationResult,
  RegisterUploadMutationVariables,
  UploadType,
  RegisterUploadMutation,
  UploadRegisterMutationResponse,
  SaveImageUploadMutation,
  SaveImageUploadMutationVariables,
  Product,
  ProductEditInput,
  Image_Parents,
  BlankMutationResponse
} from "typings/gqlTypes";
import { Actions } from "reduxStore/actions";
import { Dispatch } from "redux";
// ENV variables
import getConfig from 'next/config'
import { ApolloClient } from "@apollo/client";
import {
  REGISTER_UPLOAD,
  SAVE_IMAGE_UPLOAD,
} from "./content-mutations";
import { EDIT_PRODUCT } from "./products-mutations";
// import { EDIT_STORE_PROMO_CODE } from "./discounts-mutations";
import { LOGOUT } from "queries/user-mutations";
import Router from "next/router";
import { EDIT_STORE } from "./store-mutations";


export const logout = (
  aClient: ApolloClient<object>,
  dispatch: Dispatch<any>
) =>
async(route?: string): Promise<BlankMutationResponse> => {

  dispatch(Actions.reduxLogin.CLEAR_USER())

  const { errors, data } = await aClient.mutate({
    mutation: LOGOUT,
  });

  if (route) {
    if (
      (route.includes('/download') && !route.includes('/my-orders')) ||
      route.includes('/categories') ||
      route.includes('/stores') ||
      route.includes('/s') ||
      route.includes('/become-a-seller') ||
      route.includes('/password-reset') ||
      route.includes('/contact-us') ||
      route.includes('/faq') ||
      route.includes('/terms-of-service') ||
      route.includes('/privacy-policy') ||
      route.includes('/refund-policy') ||
      (route.includes('/sell') && !route.includes('/seller')) ||
      route === '/'
    ) {
      console.log("hard refreshing")
      window.location.reload()
    } else {
      console.log("redirecting to / and hard refreshing")
      window.location.replace("/")
      // back to public product gallery page
    }
  } else {
    console.log("redirecting to / and hard refreshing")
    window.location.replace("/")
    // back to public product gallery page
  }

  localStorage.removeItem("efc-login-valid-until");

  return data
}




// uploadType: "IMAGE", // "PRODUCT_FILE"
// mimeType: "image/jpeg",
// fileSize: 12391823
// 1
export const google_storage_register = async (
  uploadType: UploadType,
  mimeType: string,
  fileSize: number,
  aClient: ApolloClient<object>
): Promise<GSRegisterResponse> => {

  const response = await aClient.mutate<RegisterUploadMutation, RegisterUploadMutationVariables>({
    mutation: REGISTER_UPLOAD,
    variables: {
      uploadType: uploadType,
      mimeType: mimeType,
      fileSize: fileSize
    }
  });
  const result = response.data.uploadRegister;
  return {
    uploadId: result.uploadId,
    uploadUrl: result.putUrl
  }
}

interface GSRegisterResponse {
  uploadId: string;
  uploadUrl: string;
}

// 3 (file)
export const google_storage_save_image_to_db = async(
  uploadId: string,
  description: string | null,
  tags: string,
  ownerIds: string[],
  aClient: ApolloClient<object>
): Promise<Image_Parents> => {
  const response = await aClient.mutate<SaveImageUploadMutation, SaveImageUploadMutationVariables>({
    mutation: SAVE_IMAGE_UPLOAD,
    variables: {
      uploadId: uploadId,
      description: description,
      tags: tags,
      ownerIds: ownerIds
    }
  });
  console.log("response ........", response)
  const result = response.data.uploadSaveImage;
  return result.image as any
}


export const unpublishProduct = async(
  productEditInput: ProductEditInput,
  aClient: ApolloClient<object>,
) => {
  const response = await aClient.mutate<MutationDataPublishProduct, MutationVarPublishProduct>({
    mutation: EDIT_PRODUCT,
    variables: {
      productEditInput: {
        ...productEditInput,
        isPublished: false,
      }
    }
  });
  return response
}


export const publishProduct = async(
  productEditInput: ProductEditInput,
  aClient: ApolloClient<object>,
) => {
  const response = await aClient.mutate<MutationDataPublishProduct, MutationVarPublishProduct>({
    mutation: EDIT_PRODUCT,
    variables: {
      productEditInput: {
        ...productEditInput,
        isPublished: true,
      }
    }
  });
  return response
}

interface MutationDataPublishProduct {
  editProduct: { product: Product }
}
interface MutationVarPublishProduct {
  productEditInput: ProductEditInput
}

