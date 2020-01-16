
import {
  ID,
  User,
  RegisterUploadMutationResult,
  RegisterUploadMutationVariables,
  UploadType,
  RegisterUploadMutation,
  SaveProductFileUploadMutation,
  SaveProductFileUploadMutationVariables,
  SaveImageUploadMutation,
  SaveImageUploadMutationVariables,
  GetProductFileDownloadLinkMutation,
  GetProductFileDownloadLinkMutationVariables,
  Product,
  ProductEditInput,
  Image,
  BlankMutationResponse
} from "typings/gqlTypes";
import { Actions } from "reduxStore/actions";
import { Dispatch } from "redux";
// ENV variables
import getConfig from 'next/config'
import ApolloClient from "apollo-client";
import {
  REGISTER_UPLOAD,
  SAVE_PRODUCT_FILE_UPLOAD,
  SAVE_IMAGE_UPLOAD,
  GET_PRODUCT_FILE_DOWNLOAD_LINK
} from "./content-mutations";
import { EDIT_PRODUCT } from "./products-mutations";
import { LOGOUT } from "queries/user-mutations";

export const logout = async(
  aClient: ApolloClient<object>,
  route?: string,
  dispatch?: Dispatch<any>
  ): Promise<BlankMutationResponse> => {

  const { errors, data } = await aClient.mutate({
    mutation: LOGOUT
  });
  localStorage.removeItem("efc-login-valid-until");

  if (dispatch) {
    dispatch(Actions.reduxLogin.CLEAR_USER())
  }

  if (route) {
    if (
      (route.includes('/download') && !route.includes('/my-downloads')) ||
      route.includes('/categories') ||
      route.includes('/stores') ||
      route.includes('/become-a-seller') ||
      route.includes('/password-reset') ||
      route.includes('/contact-us') ||
      route.includes('/faq') ||
      route.includes('/terms-of-service') ||
      route.includes('/privacy-policy') ||
      route.includes('/refund-policy') ||
      route.includes('/create-product') ||
      route === '/'
    ) {
      window.location.reload()
    } else {
      window.location.replace('/')
      // back to public product gallery page
    }
  } else {
    window.location.replace('/')
    // back to public product gallery page
  }
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

// 3 (image)
export const google_storage_save_file_to_db = async(
  uploadId: string,
  fileName: string,
  ownerIds: string[],
  aClient: ApolloClient<object>
): Promise<ID> => {
  const response = await aClient.mutate<SaveProductFileUploadMutation, SaveProductFileUploadMutationVariables>({
    mutation: SAVE_PRODUCT_FILE_UPLOAD,
    variables: {
      uploadId: uploadId,
      fileName: fileName,
      ownerIds: ownerIds
    }
  });
  const result = response.data.uploadSaveProductFile;
  if (result.__typename === 'UploadSaveProductFileMutationResponse') {
    return result.fileId
  } else {
    throw new Error("GSSave Error");
  }
}

// 3 (file)
export const google_storage_save_image_to_db = async(
  uploadId: string,
  description: string | null,
  tags: string[],
  ownerIds: string[],
  aClient: ApolloClient<object>
): Promise<any> => {
  const response = await aClient.mutate<SaveImageUploadMutation, SaveImageUploadMutationVariables>({
    mutation: SAVE_IMAGE_UPLOAD,
    variables: {
      uploadId: uploadId,
      description: description,
      tags: tags,
      ownerIds: ownerIds
    }
  });
  const result = response.data.uploadSaveImage;
  return result.image
}

export const google_storage_get_file_link = async(
  fileId: ID,
  orderItemId: ID,
  aClient: ApolloClient<object>
): Promise<GSFileLink> => {
  const response = await aClient.mutate<GetProductFileDownloadLinkMutation, GetProductFileDownloadLinkMutationVariables>({
    mutation: GET_PRODUCT_FILE_DOWNLOAD_LINK,
    variables: {
      id: fileId,
      orderItemId: orderItemId
    }
  });
  const result = response.data.generateProductFileDownloadLink;
  if (result.__typename === 'ProductFileLinkMutationResponse') {
    return result.downloadLink;
  } else {
    throw new Error("GSGenerateLink Error");
  }
}

export interface GSFileLink {
  expiresAt: number;
  productFileId: ID;
  url: string;
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


