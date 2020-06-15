import React from "react";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Media uploader
import { IInputProps } from "components/DropzoneUploader/Dropzone";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import { Colors } from "layout/AppTheme";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Youtube component
import AddYouTubeVimeoLink from "./UploadLayoutPreviews/AddYouTubeVimeoLink";
// Typings
import { ReducerName } from "typings/dropzone";



const UploadInput = (props: IInputProps & ReactProps) => {

  const {
    accept, onFiles, files,
    getFilesFromEvent,
    classes,
  } = props;

  const text = 'Upload Images'
  let ref = React.useRef();

  return (
    <>
      <label className={props.classes.label}>
        <Button
          className={props.classes.button}
          variant="outlined"
          onMouseDown={(e) => {
            e.preventDefault()
            if (ref && ref.current) {
              // let r = document.getElementById(inputName)
              // r.focus()
              // r.click()
              // console.log('ref.current: ', ref.current);
              (ref.current as any).click()
            }
          }}
          onClick={(e) => {
            console.log("input butt clicked")
          }}
        >
          <Typography variant="body1"
            className={props.classes.uploadButtonText}
          >
            {text}
          </Typography>
        </Button>

        <Typography variant="body2"
          className={props.classes.subtitle}
        >
          Or drop your images here
        </Typography>
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

      <Typography variant="body2"
        className={props.classes.youTubeInput}
      >
        Add a YouTube link
        <span className={props.classes.youTubeSpan}>
          - optional
        </span>
      </Typography>
      <AddYouTubeVimeoLink
        reducerName={props.reducerName}
      />
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  setTouched?(): void;
  reducerName?: ReducerName
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
    height: '110px',
    width: '100%',
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
    padding: '0.5rem 2rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  uploadButtonText: {
    color: Colors.blue,
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

export default withStyles(styles)( UploadInput );
