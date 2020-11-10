import React from "react";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import LoadingBar from "components/LoadingBar";
import Button from "@material-ui/core/Button";
// Media uploader
import { IInputProps } from "components/DropzoneUploader/Dropzone";

import { createStyles, Theme, WithStyles, withStyles, fade } from "@material-ui/core/styles";
import { fontFam, Colors, BorderRadius3x } from "layout/AppTheme";



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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    position: 'relative',
  },
  button: {
    border: `1px solid ${theme.colors.blue}`,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    borderRadius: BorderRadius3x,
  },
  uploadButtonTextDisabled: {
    color: theme.colors.uniswapGrey,
    fontSize: '0.9rem',
  },
  uploadButtonText: {
    color: theme.colors.blue,
    fontSize: '0.9rem',
  },
  uploadButtonTextLimit: {
    color: theme.colors.green,
    fontSize: '0.9rem',
  },
  subtitle: {
    color: theme.colors.uniswapMediumNavy,
    fontSize: '0.8rem',
  },
  youTubeInput: {
    fontSize: "0.8rem",
    fontWeight: 500,
    marginTop: '1rem',
    marginBottom: '0.25rem',
    color: theme.colors.uniswapDarkNavy,
    width: '100%',
  },
  youTubeSpan: {
    color: theme.colors.uniswapMediumNavy,
    marginLeft: '0.25rem',
  },
})



export default withStyles(styles)(UploadInput);
