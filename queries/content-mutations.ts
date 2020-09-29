import gql from "graphql-tag";
import { ImageFragment } from "./fragments";

// NOTE: These mutations are named in a flipped way relative to the actual graphQL mutation name
// because of problems with duplicated types being generated accidentally because some names end up the same.
// Eg RegisterUploadMutationResult is both a type explicitly called that on gateway, and another type
// that's just the "result" of the "mutation" on "registerUpload" = RegisterUploadMutationResult...

export const REGISTER_UPLOAD = gql`
  mutation registerUpload(
    $uploadType: UploadType!
    $mimeType: String!
    $fileSize: Int!
  ) {
    uploadRegister(
      uploadType: $uploadType
      mimeType: $mimeType
      fileSize: $fileSize
    ) {
      ... on UploadRegisterMutationResponse {
        uploadId
        putUrl
      }
    }
  }
`;

export const SAVE_IMAGE_UPLOAD = gql`
  mutation saveImageUpload(
    $uploadId: String!
    $description: String
    $tags: String
    $ownerIds: [String]
  ) {
    uploadSaveImage(
      uploadId: $uploadId
      description: $description
      tags: $tags
      ownerIds: $ownerIds
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

