import React from "react";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media uploader
import { IInputProps } from "components/DropzoneUploader/Dropzone";
// icon
import { Colors, BorderRadius } from "layout/AppTheme";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import LoadingBar from "components/LoadingBar";
import Form10PreviewCard from "./Form10PreviewCard";
import { Order } from "typings/gqlTypes";
import { cardDimensions } from "./Form10PreviewCard";



const UploadInput = (props: IInputProps & ReactProps) => {

  const {
    accept,
    onFiles,
    files,
    getFilesFromEvent,
    disableButton,
    buttonText,
    onChange,
  } = props;

  const text = 'Upload Form-10'

  let ref = React.useRef();
  // console.log("order UploadINput: ", props.order)

  return (
    <label className={props.classes.label}>

      <Form10PreviewCard
        order={props.order}
        onMouseDown={(e) => {
          // console.log("onMouseDown!")
          if (!disableButton) {
            e.preventDefault()
            if (ref && (ref as any).current) {
              ((ref as any).current).click()
            }
          }
        }}
      />

      <Button
        className={clsx(
          props.classes.uploadButton,
          disableButton
            ? props.classes.uploadButtonDisabled
            : props.classes.uploadButtonEnabled,
        )}
        variant="outlined"
        onMouseDown={(e) => {
          if (!disableButton) {
            e.preventDefault()
            if (ref && (ref as any).current) {
              ((ref as any).current).click()
            }
          }
        }}
        disabled={disableButton}
        onClick={(e) => {
          // console.log("input butt clicked")
        }}
      >
        {
          props.loading &&
          <LoadingBar
            absoluteTop
            color={Colors.gradientUniswapBlue1}
            height={4}
            width={'100%'}
            loading={true}
          />
        }
        <Typography variant="body1"
          className={
            disableButton
              ? props.classes.uploadButtonTextLimit
              : props.classes.uploadButtonText
          }
        >
          {buttonText || text}
        </Typography>
      </Button>

      <input
        ref={ref as any} // important! store a ref to this elem
        // so that onMouseDown can programmatically click this.
        // due to a bug in handleBlur (formik) that swallows onClick events.
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        // onChange={onChange}
        onChange={async(e) => {
          console.log("onChange....")
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
  disableButton?: boolean;
  loading?: boolean;
  buttonText?: string;
  order?: Order;
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
  uploadButton: {
    position: "relative",
    overflow: "hidden",
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: cardDimensions.width,
    borderRadius: BorderRadius,
  },
  uploadButtonDisabled: {
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  uploadButtonEnabled: {
    border: `1px solid ${Colors.blue}`,
  },
  uploadButtonText: {
    color: Colors.blue,
    fontSize: '0.9rem',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: '0.8rem',
  },
  uploadButtonTextLimit: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
    fontSize: '0.9rem',
  },
})

export default withStyles(styles)( UploadInput );
