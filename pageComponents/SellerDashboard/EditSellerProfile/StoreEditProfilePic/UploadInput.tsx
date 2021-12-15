import React from "react";
// Material UI
import Typography from "@mui/material/Typography";
import LoadingBar from "components/LoadingBar";
// Media uploader
import { IInputProps } from "components/DropzoneUploader/Dropzone";

import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { BorderRadius, Colors } from "layout/AppTheme";



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
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BorderRadius,
      }}
    >
      <Typography variant="body2" className={classes.button}
      >
        <span className={
          props.errorMessage
            ? classes.redText
            : classes.normalText
        }>
          {text}
        </span>
        <span className={
          props.errorMessage
            ? classes.redText
            : classes.hideText
        }>*</span>
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
    </label>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  errorMessage?: string;
  loading?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  button: {
    position: 'relative',
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    color: Colors.gradientUniswapBlue1,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      color: Colors.blue,
    },
  },
  redText: {
    color: Colors.lightRed,
    fontWeight: 700,
    opacity: 1,
    height: '16px',
  },
  hideText: {
    color: Colors.lightRed,
    fontWeight: 700,
    opacity: 0
  },
  normalText: {
    fontWeight: 700,
  },
})



export default withStyles(styles)(UploadInput);
