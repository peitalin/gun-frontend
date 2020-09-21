import React from "react";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import LoadingBar from "components/LoadingBar";
import Button from "@material-ui/core/Button";
// Media uploader
import { IInputProps } from "components/DropzoneUploader/Dropzone";

import { createStyles, Theme, WithStyles, withStyles, fade } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";



const UploadInput = (props: IInputProps & ReactProps) => {

  const {
    accept,
    onFiles,
    files,
    getFilesFromEvent,
    maxFiles,
    numFiles,
    buttonText,
    disableButton,
    classes,
  } = props;

  const text = 'Upload Form10'
  let ref = React.useRef();

  let maxLimitReached = numFiles >= maxFiles

  return (
    // <label
    //   className={"dzu-upload-input"}
    //   // className={"fadeIn"}
    //   style={{
    //     color: "#222",
    //     cursor: "pointer",
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderRadius: 4,
    //   }}
    // >
    //   <Typography variant="body2" className={classes.button}
    //   >
    //     <span className={
    //       props.errorMessage
    //         ? classes.redText
    //         : classes.normalText
    //     }>
    //       {buttonText || text}
    //     </span>
    //     <span className={
    //       props.errorMessage
    //         ? classes.redText
    //         : classes.hideText
    //     }>*</span>
    //     {
    //       props.loading &&
    //       <LoadingBar
    //         absoluteTop
    //         color={Colors.magenta}
    //         height={4}
    //         width={'100vw'}
    //         loading={true}
    //       />
    //     }
    //   </Typography>
    //   <input
    //     style={{
    //       display: 'none'
    //     }}
    //     type="file"
    //     accept={accept}
    //     max={1}
    //     onChange={async(e) => {
    //       if (getFilesFromEvent) {
    //         onFiles(await getFilesFromEvent(e))
    //       } else if (files) {
    //         onFiles(files.map(f => f.file))
    //       } else {
    //         console.log("error.. in UploadInput component.")
    //       }
    //     }}
    //   />
    // </label>

    <label className={
      props.classes.label
    }>
      {
        props.loading &&
        <LoadingBar
          absoluteTop
          color={Colors.magenta}
          height={4}
          width={'100vw'}
          loading={true}
        />
      }
      <Button
        className={clsx(
          props.classes.button
        )}
        variant="outlined"
        disabled={disableButton}
        onMouseDown={(e) => {
          e.preventDefault()
          if (ref && ref.current) {
            (ref.current as any).click()
          }
        }}
      >
        <Typography variant="body1"
          className={
            disableButton
              ? props.classes.uploadButtonTextLimit
              : props.classes.uploadButtonText
          }
        >
          {
            maxLimitReached
            ? `Max Previews Reached (${maxFiles})`
            : buttonText || text
          }
        </Typography>
      </Button>


      <input
        ref={ref} // important! store a ref to this elem
        // so that onMouseDown can programmatically click this.
        // due to a bug in handleBlur (formik) that swallows onClick events.
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        onChange={async(e) => {
          if (getFilesFromEvent) {
            onFiles(await getFilesFromEvent(e))
          } else if (files) {
            onFiles(files.map(f => f.file))
          } else {
            console.log("error.. in UploadInput component.")
          }
        }}
      />
    </label>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  errorMessage?: string;
  loading?: boolean;
  disableButton?: boolean;
  buttonText?: string;
  numFiles?: number
}

export const styles = (theme: Theme) => createStyles({
  label: {
    color: "#222",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    position: 'relative',
  },
  button: {
    border: `1px solid ${Colors.blue}`,
    // "&:hover": {
    //   backgroundColor: 'rgb(230, 240, 255)', // baby blue
    // },
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    borderRadius: '4px',
  },
  uploadButtonTextDisabled: {
    color: Colors.grey,
    fontSize: '0.9rem',
  },
  uploadButtonText: {
    color: Colors.blue,
    fontSize: '0.9rem',
  },
  uploadButtonTextLimit: {
    color: Colors.green,
    fontSize: '0.9rem',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: '0.8rem',
  },
  youTubeInput: {
    fontSize: "0.8rem",
    fontWeight: 500,
    marginTop: '1rem',
    marginBottom: '0.25rem',
    color: Colors.darkGrey,
    width: '100%',
  },
  youTubeSpan: {
    color: Colors.mediumGrey,
    marginLeft: '0.25rem',
  },
})



export default withStyles(styles)(UploadInput);
