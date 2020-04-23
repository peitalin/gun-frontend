import * as React from "react";
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
import Dropzone, { IFileWithMeta, IUploadParams } from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import {
  google_storage_register,
  google_storage_save_image_to_db,
} from "queries/requests";
// Typings
import {
  ProductPreviewItemInput, Image, ID, UploadType
} from "typings/gqlTypes";
import { ProductCreateEditCommonInput } from "typings";
import { ReducerName } from "typings/dropzone";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
// DZU components
import UploadLayout from "./UploadLayout";
import UploadInput from "./UploadInput";
// Components
import { Formik, Form, FormikProps, ErrorMessage, FormikErrors } from 'formik';
import ErrorBounds from 'components/ErrorBounds';
import { useApolloClient } from "@apollo/react-hooks";



const PreviewItemUploader = (props: ReactProps & FormikProps<FormikFields>) => {

  const aClient = useApolloClient();

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
        "Cache-Control": "public, max-age=120",
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
      }
    }
  }

  const handleChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    //// called every time a file's `status` changes
    let { meta, file, xhr } = fileWithMeta;
    // console.info("status:", status, meta, file)

    if (status === "getting_upload_params") {
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
      dispatch(actions.ADD_PREVIEW_ITEMS([ optimisticPreview ]))
      let previewOrder = {
        id: meta.id,
        index: undefined, // assigned in redux reducer,
      }
      dispatch(actions.ADD_DZU_PREVIEW_ORDER([ previewOrder ]))
    }

    if (status === "done") {
      let googleUpload = googleUploads.find(g => g.metaId === meta.id);

      // Owner is going to be the store, but may also be the product if it already exists
      const ownerIds = [props.storeId];
      if (props.productId) {
        ownerIds.push(props.productId);
      }
      const description = null;
      const tags = [];
      google_storage_save_image_to_db(googleUpload.googleUploadId, description, tags, ownerIds, aClient)
        .then(image => {
          console.log("save_to_db response:", image.id)
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
          console.log("updating: ", newPreview.id)
          dispatch(actions.UPDATE_PREVIEW_ITEM( newPreview ))
          props.validateForm()
        })
        .catch(err => {
          console.log("err response:", err)
          dispatch(actions.REMOVE_PREVIEW_ITEMS([ meta.id ]))
          props.validateForm()
        })
    }
  }

  const { classes, productInput } = props;
  const actions = Actions[props.reducerName];
  const dispatch = useDispatch();
  const [googleUploads, setGoogleUploads] = React.useState<GoogleUpload[]>([]);

  React.useEffect(() => {
    props.setFieldValue("currentVariants", [
      ...option(props).values.currentVariants([]).map(v => {
        // merge fileIds and previewItems from redux
        return {
          ...v,
          previewItems: productInput.currentVariants[0].previewItems
        }
      })
    ])
    props.validateForm()
  }, [option(productInput).currentVariants[0].previewItems.length()])

  return (
    <ErrorBounds className={classes.fileUploadRoot}>
      <div className={classes.previewTitleBox}>
        <Typography variant="subtitle1" style={{ marginBottom: '0.25rem' }}>
          Product Images
        </Typography>
        <div className={classes.previewItemSubtitle}>
          Recommended size: 960 x 600.
          The first image will be used as a preview on Relay and social media.
        </div>
      </div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={React.memo((layProps) =>
          <UploadLayout
            reducerName={props.reducerName}
            {...layProps}
          />
        )}
        InputComponent={UploadInput as any}
        accept={"image/*"}
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
      {
        option(props).errors.currentVariants[0].previewItems() &&
        <div className={classes.errorMessage}>
          {option(props).errors.currentVariants[0].previewItems()}
        </div>
      }
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName;
  productInput: ProductCreateEditCommonInput;
  storeId: ID;
  productId?: ID;
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


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <PreviewItemUploader {...props}/>,
  (prevProps, nextProps) => {
    /// formik errors
    let prevErrorVariants = option(prevProps).errors.currentVariants([]);
    let nextErrorVariants = option(nextProps).errors.currentVariants([]);
    // variants
    let prevVariants = option(prevProps).productInput.currentVariants([]);
    let nextVariants = option(nextProps).productInput.currentVariants([]);

    const shouldReRender =
      option(prevVariants)[0].previewItems.length()
      === option(nextVariants)[0].previewItems.length()
      && option(prevErrorVariants)[0].previewItems()
      ===  option(nextErrorVariants)[0].previewItems()

    return shouldReRender
  },
));

