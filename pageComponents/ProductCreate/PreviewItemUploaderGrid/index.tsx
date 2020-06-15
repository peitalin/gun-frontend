import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles, fade } from "@material-ui/core/styles";
import { styles } from './styles';
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media uploader
import { IFileWithMeta, IUploadParams } from "components/DropzoneUploader/Dropzone";
import Dropzone from "components/DropzoneUploader/Dropzone";
import "components/DropzoneUploader/styles.css";

import {
  google_storage_register,
  google_storage_save_image_to_db,
} from "queries/requests";
// Typings
import {
  ProductPreviewItemInput, Image, ID, UploadType
} from "typings/gqlTypes";
import { ProductCreateEditCommonInput } from "typings";
import { ReducerName, DzuFilePreview } from "typings/dropzone";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
// DZU components
import UploadLayoutPreviews from "./UploadLayoutPreviews";
// Components
import { Formik, Form, FormikProps, ErrorMessage, FormikErrors } from 'formik';
import ErrorBounds from 'components/ErrorBounds';
import { useApolloClient } from "@apollo/react-hooks";
// validation
import { maxPreviewImages } from "utils/limitsAndRules";
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { useFocus } from "utils/hooks";
import { reduxToFormikCurrentVariants } from "../ProductCreatePage";



const PreviewItemUploaderGrid = (props: ReactProps & FormikProps<FormikFields>) => {

  //// Functions ////

  const getUploadParams = async({ file, meta }: IFileWithMeta): Promise<IUploadParams> => {
    // https://react-dropzone-uploader.js.org/docs/api

    let { uploadId, uploadUrl } = await google_storage_register(
      UploadType.IMAGE,
      meta.type,
      meta.size,
      aClient
    )

    setGoogleUploads(state => [
      ...state,
      {
        metaId: meta.id,
        googleUploadId: uploadId,
        googleUploadUrl: uploadUrl
      }
    ])
    // console.log("gs_register: ", uploadId, uploadUrl)
    // console.log("file: ", file)
    // console.log("meta: ", meta)
    return {
      body: file,
      url: uploadUrl,
      method: "PUT",
      headers: {
        "Content-Type": meta.type,
        "Cache-Control": "public, max-age=86400",
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
      }
    }
  }

  const handleChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    //// called every time a file's `status` changes
    let { meta, file, xhr } = fileWithMeta;
    // console.info("status:", status, meta, file)

    if (status === "getting_upload_params") {
      setLoading(true)
    }

    if (status === "uploading" && !!meta.previewUrl) {
      // Step 1.
      let optimisticPreview: DzuPreviewItem = {
        id: meta.id,
        name: meta.name,
        previewUrl: meta.previewUrl,
        fileId: "",
        percent: meta.percent,
        size: meta.size,
        status: meta.status,
        duration: meta.duration,
        fileWithMeta: fileWithMeta,
        youTubeVimeoEmbedLink: "", // image, not youtube link
      }
      let previewOrder = {
        id: meta.id,
        index: undefined, // assigned in redux reducer,
      }
      dispatch(actions.ADD_PREVIEW_ITEMS([ optimisticPreview ]))
      dispatch(actions.ADD_DZU_PREVIEW_ORDER([ previewOrder ]))
    }

    if (status === "error_upload_params") {
      setLoading(false)
      console.info("error_upload_params:", status, meta, file)
    }
    if (status === "exception_upload") {
      setLoading(false)
      console.info("exception_upload:", status, meta, file)
    }
    if (status === "error_upload") {
      setLoading(false)
      console.info("error_upload:", status, meta, file)
    }
    if (status === "rejected_max_files") {
      setLoading(false)
      console.info("rejected_max_files:", status, meta, file)
    }
    if (status === "aborted") {
      setLoading(false)
      console.info("aborted:", status, meta, file)
    }
    if (status === "removed") {
      setLoading(false)
      console.info("removed:", status, meta, file)
    }

    if (status === "done") {
      let googleUpload = googleUploads.find(g => g.metaId === meta.id);

      // Owner is going to be the store, but may also be the product if it already exists
      const ownerIds = [props.storeId];
      if (props.productId) {
        ownerIds.push(props.productId);
      }
      const description = null;
      const tags = "";

      google_storage_save_image_to_db(googleUpload.googleUploadId, description, tags, ownerIds, aClient)
        .then(image => {
          // console.log("save_to_db response:", image.id)
          let newPreview: DzuPreviewItem = {
            id: meta.id,
            name: meta.name,
            previewUrl: meta.previewUrl,
            fileId: image.id,
            percent: meta.percent,
            size: meta.size,
            status: meta.status,
            duration: meta.duration,
            fileWithMeta: fileWithMeta,
            youTubeVimeoEmbedLink: "", // image, not youtube link
          }
          // console.log("updating: ", newPreview.id)
          dispatch(actions.UPDATE_PREVIEW_ITEM( newPreview ))
          props.validateForm()
        })
        .catch(err => {
          console.log("err response:", err)
          dispatch(actions.REMOVE_PREVIEW_ITEMS([ meta.id ]))
          props.validateForm()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  //// Props and State ////

  const {
    classes,
    productInput,
    reducerName,
    storeId,
    productId,
    ...fprops
  } = props;

  const aClient = useApolloClient();
  const actions = Actions[props.reducerName];
  const dispatch = useDispatch();

  const ref = React.useRef(null);
  const focused = useFocus(ref);

  const [googleUploads, setGoogleUploads] = React.useState<GoogleUpload[]>([]);
  const [loading, setLoading] = React.useState(false);

  //// Effects ////

  React.useEffect(() => {
    // formik updates as a side effect after redux
    fprops.setFieldValue(
      "currentVariants",
      reduxToFormikCurrentVariants(
        productInput,
        props.dzuPreviewItems,
        props.dzuPreviewOrder,
      )
    );
    props.validateForm()

    setTimeout(() => {
      console.log('formik current variants updated!', fprops.values.currentVariants)
    }, 0)

    return () => {}
  }, [props.dzuPreviewItems, props.dzuPreviewOrder])


  return (
    <ErrorBounds className={classes.fileUploadRoot}>
      <div className={classes.previewTitleBox}>
        <Typography variant="subtitle1" style={{ marginBottom: '0.25rem' }}>
          Product Images
        </Typography>
        <div className={classes.previewItemSubtitle}>
          Recommended size: 16:10 landscape images.
          Add up to 10 images, GIFs, or videos.
          The first image will be the featured product image on the marketplace.
        </div>
      </div>

      <Dropzone
        uploaderType="image-uploader"
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        multiple={false}
        canCancel={false}
        canRestart={false}
        LayoutComponent={React.memo((layProps) =>
          <UploadLayoutPreviews
            reducerName={props.reducerName}
            {...layProps}
          />
        )}
        setTouched={() => {
          fprops.setFieldTouched('currentVariants[0].previewItems', true)
        }}
        reducerName={props.reducerName}
        // InputComponent={UploadInput as any}
        // imported directly to workaround handleBlur bug.
        // See comments in /components/ReactDropzone/Dropzone.tsx
        accept={"image/*"}
        maxFiles={maxPreviewImages}
        inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Images')}
        styles={{
          dropzoneReject: {
            borderColor: "#EE655F",
            backgroundColor: '#DAA'
          },
          dropzone: {
            border: "2px dashed rgb(221, 221, 221)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: '0.5rem',
            padding: "1rem",
            backgroundColor: "#fefefe",
          },
          dropzoneActive: {
            border: "2px dashed #2484FF",
            backgroundColor: fade(Colors.lightBlue, 0.2),
          },
          inputLabel: (files, extra) => (extra.reject ? { color: '#CD584F' } : {}),
        }}
      />

      <Loading fixed loading={loading}/>

      <ValidationErrorMsg
        touched={option(fprops).touched.currentVariants[0].previewItems()}
        focused={focused}
        errorMessage={option(fprops).errors.currentVariants[0].previewItems()}
        disableInitialValidationMessage={true}
      />

    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName;
  productInput: ProductCreateEditCommonInput;
  storeId: ID;
  productId?: ID;
  dzuPreviewItems: DzuPreviewItem[];
  dzuPreviewOrder: DzuPreviewOrder[],
}
interface FormikFields {
  currentVariants: {
    previewItems: ProductPreviewItemInput[];
  }[];
}
interface GoogleUpload {
  metaId: string;
  googleUploadId: string;
  googleUploadUrl: string;
}


export default withStyles(styles)( PreviewItemUploaderGrid );

