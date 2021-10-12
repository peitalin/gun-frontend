
import {
  ID,
  PaymentProcessor,
  UploadSaveFileMutationResponse,
  Product,
  ProductEditInput,
  Image_Parents,
  BlankMutationResponse,
  UploadType,
} from "typings/gqlTypes";
import { Actions } from "reduxStore/actions";
import { Dispatch } from "redux";
// ENV variables
import getConfig from 'next/config'
import { ApolloClient } from "@apollo/client";
import {
  UPLOAD_STEP1_REGISTER_GOOGLE_URL,
  UPLOAD_SAVE_IMAGE,
  UPLOAD_SAVE_FILE,
} from "./content-mutations";
import { EDIT_PRODUCT } from "./products-mutations";
import { LOGOUT } from "queries/user-mutations";
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
      (route.includes('/download') && !route.includes('/orders')) ||
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
      route.includes('/admin') ||
      route.includes('/dealers') ||
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

  localStorage.removeItem("gm-login-valid-until");

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
  aClient: ApolloClient<object>,
  claimId?: string,
): Promise<GSRegisterResponse> => {

  interface Mvar {
    uploadType: UploadType;
    mimeType: string;
    fileSize: number;
    claimId?: string,
  }
  interface Mdata {
    uploadRegisterGoogleUrl: {
      uploadId: string,
      putUrl: string
    }
  }

  const response = await aClient.mutate<Mdata, Mvar>({
    mutation: UPLOAD_STEP1_REGISTER_GOOGLE_URL,
    variables: {
      uploadType: uploadType,
      mimeType: mimeType,
      fileSize: fileSize,
      claimId: claimId
    }
  });
  const result = response.data.uploadRegisterGoogleUrl
  return {
    uploadId: result.uploadId,
    uploadUrl: result.putUrl
  }
}

interface GSRegisterResponse {
  uploadId: string;
  uploadUrl: string;
}

// 2 (image)
export const google_storage_save_image_to_db = async(
  uploadId: string,
  description: string | null,
  tags: string,
  ownerIds: string[],
  aClient: ApolloClient<object>,
  claimId?: string,
): Promise<Image_Parents> => {

  interface Mvar {
    uploadId: string;
    description?: string;
    tags?: string;
    ownerIds?: string[]
    claimId?: string,
  }
  interface Mdata {
    uploadSaveImage: {
      image: Image_Parents
    }
  }

  const response = await aClient.mutate<Mdata, Mvar>({
    mutation: UPLOAD_SAVE_IMAGE,
    variables: {
      uploadId: uploadId,
      description: description,
      tags: tags,
      ownerIds: ownerIds,
      claimId: claimId
    }
  });
  console.log("response ........", response)
  const result = response.data.uploadSaveImage;
  return result.image
}

// 3 (file)
export const google_storage_save_file_to_db = async(
  uploadId: string,
  fileName: string,
  ownerIds: string[],
  aClient: ApolloClient<object>
): Promise<ID> => {

  interface SaveFileUploadVars {
    uploadId: string
    fileName: string
    ownerIds: string[]
  }
  interface SaveFileUploadData {
    uploadSaveFile: UploadSaveFileMutationResponse
  }

  const response = await aClient.mutate<SaveFileUploadData, SaveFileUploadVars>({
    mutation: UPLOAD_SAVE_FILE,
    variables: {
      uploadId: uploadId,
      fileName: fileName,
      ownerIds: ownerIds
    }
  });
  console.log("upload_save_file response: ", response)
  const result = response.data.uploadSaveFile;
  if (result.__typename === 'UploadSaveFileMutationResponse') {
    return result.fileId
  } else {
    throw new Error("GSSave Error");
  }
}
