import React from "react";
// Material UI
import Typography from "@material-ui/core/Typography";
import LoadingBar from "components/LoadingBar";
// Media uploader
import { IInputProps } from "react-dropzone-uploader";
import { createStyles, Theme, WithStyles, withStyles, fade } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";



const UploadInput = (props: IInputProps & ReactProps) => {

  const {
    accept,
    onFiles,
    files,
    getFilesFromEvent,
    classes,
  } = props;

  const text = 'Choose Photo'


  return (
    <label
      className={"dzu-upload-input"}
      // className={"fadeIn"}
      style={{
        color: "#222",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
      }}
    >
      <Typography variant="body2" className={classes.button}
      >
        {text}
        <span className={
          props.errorMessage
            ? classes.redText
            : classes.hideText
        }>*</span>
      </Typography>
      <input
        style={{
          display: 'none'
        }}
        type="file"
        accept={accept}
        max={1}
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
    </label>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  errorMessage?: string;
  loading?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  button: {
    border: `1px solid ${Colors.grey}`,
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    color: Colors.charcoal,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      color: Colors.blue,
    },
  },
  redText: {
    color: Colors.lightRed,
    opacity: 1
  },
  hideText: {
    color: Colors.lightRed,
    opacity: 0
  },
})



export default withStyles(styles)(UploadInput);
