
import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
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



const UploadProgress = (props: ReactProps & ReduxProps) => {

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
  const actions = Actions.reduxProductCreate;

  const { fileWithMeta } = props.dzuPreviewItem;
  const { name, size, previewUrl, status, duration } = props.dzuPreviewItem;

  const handleRemove2 = () => {
    // remove DZU preview (redux) and previewItems in currentVariants
    console.log("removing preview item...", props.dzuPreviewItem)
    handleRemove(props.dzuPreviewItem.id)
    // dispatch(actions.REMOVE_PREVIEW_ITEMS([props.dzuPreviewItem.id]))
    dispatch(actions.REMOVE_DZU_PREVIEW_ORDER([props.dzuPreviewItem.id]))
    if (fileWithMeta && fileWithMeta.remove) {
      fileWithMeta.remove()
    }
  }

  const handleCancel = () => {
    dispatch(actions.REMOVE_PREVIEW_ITEMS([props.dzuPreviewItem.id]))
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
  //     ...props.dzuPreviewItem,
  //     percent: percent
  //   }))
  // }, [percent])

  // console.log('percent3:', percent)


  if (status === 'error_file_size' || status === 'error_validation') {
    return (
      <div>
        <span className="dzu-previewFileNameError">{name}</span>
        {/* {status === 'error_file_size' && <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>} */}
        {/* {
          canRemove &&
          <IconButton
            onClick={handleRemove}
            className={classes.previewIconButton}
            classes={{
              root: classes.iconButton
            }}
            size="small"
          >
            <ClearIcon/>
          </IconButton>
        } */}
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
          onClick={handleRemove2}
          className={classes.previewIconButton}
          classes={{ root: classes.iconButton }}
          size="small"
        >
          <ClearIcon classes={{ root: classes.svgIcon }}/>
        </IconButton>
      }
      {
        status === 'uploading' &&
        // canCancel &&
        <IconButton
          onClick={handleCancel}
          className={classes.previewIconButton}
          classes={{ root: classes.iconButton }}
          size="small"
        >
          <PauseIcon/>
        </IconButton>
      }

      <div className={clsx(
        "dzu-previewStatusContainer",
        classes.progressContainer
      )}>
        <LinearProgress
          color="primary"
          classes={{
            barColorPrimary: classes.blue1,
            colorPrimary: classes.blue2,
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
  dzuPreviewItem: DzuPreviewItem;
  percent: number;
  style?: any;
}
interface ReduxProps {
}

export default withStyles(styles)(React.memo(
  (props: ReactProps & ReduxProps) => <UploadProgress {...props}/>,
  (prevProps, nextProps) => {
    return prevProps.percent === nextProps.percent
  },
))