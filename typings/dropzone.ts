
import {
  ID,
  ProductPreviewItemInput,
} from "typings/gqlTypes";
import { IFileWithMeta } from "components/DropzoneUploader/Dropzone";

export interface GoogleUpload {
  metaId: string;
  googleUploadId: string;
  googleUploadUrl: string;
}
export enum ReducerName {
  reduxProductCreate = "reduxProductCreate",
  reduxProductEdit = "reduxProductEdit",
  reduxProductClaim = "reduxProductClaim",
  reduxImageSwap = "reduxImageSwap",
}
// these names must match actions names in /reduxStore/actions

export interface DzuFilePreview {
  id: string;
  name: string;
  previewUrl: string;
  fileId: ID;
  percent: number;
  size: number;
  duration: number;
  fileWithMeta: IFileWithMeta;
}
// height: 1080
// id: "1568296960550-0"
// lastModifiedDate: "2019-09-03T10:14:07.572Z"
// name: "tumblingdown.jpg"
// percent: 100
// previewUrl: "blob:https://0.0.0.0:9000/73b4b632-e229-4185-b933-0e75cb278a3a"
// size: 161326
// status: "done"
// type: "image/jpeg"
// uploadedDate: "2019-09-12T14:02:40.550Z"
// width: 1920
export interface DzuPreviewItem extends ProductPreviewItemInput {
  id: string;
  name: string;
  previewUrl: string;
  fileId: ID;
  percent: number;
  size: number;
  status: string;
  duration: number;
  fileWithMeta: IFileWithMeta;
  youTubeVimeoEmbedLink: string;
}
// NOTE KEEP ORDER and PREVIEWS SEPARATE. PREVENT RERENDERS
// THIS IS PURELY FOR Sortable to keep track of draggable order
export interface DzuPreviewOrder {
  id: string;
  index: number; // position. sortable calls it index
}