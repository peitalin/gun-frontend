import gql from "graphql-tag";
import { ImageFragment } from "./fragments";


export const UPLOAD_STEP1_REGISTER_GOOGLE_URL = gql`
  mutation uploadRegisterGoogleUrl(
    $uploadType: UploadType!
    $mimeType: String!
    $fileSize: Int!
    $claimId: String
  ) {
    uploadRegisterGoogleUrl(
      uploadType: $uploadType
      mimeType: $mimeType
      fileSize: $fileSize
      claimId: $claimId
    ) {
      ... on UploadRegisterMutationResponse {
        uploadId
        putUrl
      }
    }
  }
`;

export const UPLOAD_SAVE_IMAGE = gql`
  mutation uploadSaveImage(
    $uploadId: String!
    $description: String
    $tags: String
    $ownerIds: [String]
    $claimId: String
  ) {
    uploadSaveImage(
      uploadId: $uploadId
      description: $description
      tags: $tags
      ownerIds: $ownerIds
      claimId: $claimId
    ) {
      ... on UploadSaveImageMutationResponse {
        image {
          ...ImageFragment
        }
      }
    }
  }
  ${ImageFragment}
`;

export const UPLOAD_SAVE_FILE = gql`
  mutation uploadSaveFile(
    $uploadId: String!
    $fileName: String!
    $ownerIds: [String]
  ) {
    uploadSaveFile(
      uploadId: $uploadId
      fileName: $fileName
      ownerIds: $ownerIds
    ) {
      ... on UploadSaveFileMutationResponse {
        fileId
      }
    }
  }
`;
