
import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReducerName } from "typings/dropzone";
// Media uploader
import {
  formatBytes,
  formatDuration,
  Preview,
  IPreviewProps,
} from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
// Typings
import { DzuPreviewItem } from "typings/dropzone";
// Carousel
import LinearProgress from '@material-ui/core/LinearProgress';
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../styles';
// Icons
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import RestartIcon from "@material-ui/icons/Cached";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";



const ImageUploadProgress = (props: ReactProps & ReduxProps) => {

  // const {
  //   className,
  //   imageClassName,
  //   style,
  //   imageStyle,
  //   // fileWithMeta,
  //   // meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError },
  //   isUpload,
  //   canCancel,
  //   canRemove,
  //   canRestart,
  //   extra: { minSizeBytes },
  //   // React Props
  //   previewId,
  //   // Styles
  //   classes,
  // } = props;

  const { classes, handleRemove, percent } = props;
  const dispatch = useDispatch();
  const actions = Actions[props.reducerName];

  const { fileWithMeta } = props.dzuPreview;
  const { name, size, previewUrl, status, duration } = props.dzuPreview;

  const handleRemoveWithRedux = () => {
    // remove DZU preview (redux) and previewItems in currentVariants
    console.log("removing preview item...", props.dzuPreview)
    if (fileWithMeta && fileWithMeta.cancel) {
      fileWithMeta.cancel()
    }
    handleRemove(props.dzuPreview.id)
    dispatch(actions.REMOVE_PREVIEW_ITEMS([props.dzuPreview.id]))
    dispatch(actions.REMOVE_DZU_PREVIEW_ORDER([props.dzuPreview.id]))
    if (fileWithMeta && fileWithMeta.remove) {
      fileWithMeta.remove()
    }
  }

  const handleCancel = () => {
    dispatch(actions.REMOVE_PREVIEW_ITEMS([props.dzuPreview.id]))
    if (fileWithMeta && fileWithMeta.cancel) {
      fileWithMeta.cancel()
    }
  }

  const handleRestart = () => {
    if (fileWithMeta && fileWithMeta.restart) {
      fileWithMeta.restart()
    }
  }

  // React.useEffect(() => {
  //   dispatch(actions.UPDATE_PREVIEW_ITEM({
  //     ...props.dzuPreview,
  //     percent: percent
  //   }))
  // }, [percent])

  // console.log('percent3:', percent)

  if (status === 'error_file_size' || status === 'error_validation') {
    return (
      <div>
        <span className="dzu-previewFileNameError">Error</span>
        <IconButton
          onClick={handleRemoveWithRedux}
          className={classes.previewIconButton}
          classes={{
            root: classes.iconButton
          }}
          size="small"
        >
          <ClearIcon classes={{ root: classes.svgIcon }}/>
        </IconButton>
      </div>
    )
  }


  return (
    <>
      {
        // status !== 'preparing' &&
        // status !== 'getting_upload_params' &&
        status !== 'uploading' &&
        // canRemove &&
        <IconButton
          onClick={handleRemoveWithRedux}
          className={classes.previewIconButton}
          classes={{
            root: classes.iconButton
          }}
          size="small"
        >
          <ClearIcon classes={{ root: classes.svgIcon }}/>
        </IconButton>
      }
      {
        status === 'uploading' &&
        // canRemove &&
        <IconButton
          onClick={handleRemoveWithRedux}
          className={classes.previewIconButton}
          classes={{
            root: classes.iconButton
          }}
          size="small"
        >
          <ClearIcon classes={{ root: classes.svgIcon }}/>
        </IconButton>
      }

      <div className={clsx(
        "dzu-previewStatusContainer",
        classes.progressContainer
      )}>
        <LinearProgress
          color="primary"
          classes={{
            barColorPrimary: classes.progressFilled,
            colorPrimary: classes.progressUnfilled,
          }}
          style={{ width: "100%" }}
          variant="determinate"
          value={status === 'done' || status === 'headers_received' ? 100 : percent}
        />
        {/* {
          ['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status) &&
          canRestart &&
          <IconButton
            onClick={handleRestart}
            className={classes.previewIconButton}
            classes={{ root: classes.iconButton }}
            size="small"
          >
            <RestartIcon/>
          </IconButton>
        } */}
      </div>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  previewId: React.ReactText | string;
  handleRemove?(id: React.ReactText | string): void;
  dzuPreview: DzuPreviewItem;
  percent: number;
  style?: any;
  reducerName: ReducerName;
}
interface ReduxProps {
}

export default withStyles(styles)(React.memo(
  (props: ReactProps & ReduxProps) => <ImageUploadProgress {...props}/>,
  (prevProps, nextProps) => {
    return prevProps.percent === nextProps.percent
    && prevProps.dzuPreview.status === nextProps.dzuPreview.status
  },
))