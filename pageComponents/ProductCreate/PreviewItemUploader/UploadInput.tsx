import React from "react";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media uploader
import { IInputProps } from "react-dropzone-uploader";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import { Colors } from "layout/AppTheme";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";



const UploadInput = (props: IInputProps & ReactProps) => {

  const {
    accept, onFiles, files, getFilesFromEvent
  } = props;

  const text = 'Upload Images'

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
        width: '100%',
        height: '100px',
      }}
    >
      {/* <UploadIcon color={Colors.blue}/>
      <Typography variant="body2">
        {text}
      </Typography> */}
      <div
        style={{
          border: `1px solid ${Colors.blue}`,
          backgroundColor: 'rgb(230, 240, 255)', // baby blue
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.5rem 2rem',
          borderRadius: '4px',
          marginBottom: '0.5rem',
        }}
      >
        <Typography variant="body1"
          className={props.classes.uploadButton}
        >
          {text}
        </Typography>
      </div>
      <Typography variant="body2"
        className={props.classes.subtitle}
      >
        Or drop your images here
      </Typography>
      <input
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
}

export const styles = (theme: Theme) => createStyles({
  uploadButton: {
    color: Colors.blue,
    fontSize: '0.9rem',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: '0.8rem',
  },
})

export default withStyles(styles)( UploadInput );
