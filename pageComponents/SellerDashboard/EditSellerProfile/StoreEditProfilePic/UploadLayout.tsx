import React from "react";
import { ReactElement } from "react";
import { Colors } from "layout/AppTheme";
// Styles
import { ILayoutProps } from "components/DropzoneUploader/Dropzone";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextInput from "components/Fields/TextInput";




const UploadLayout: React.FC<ILayoutProps & ReactProps> = (props) => {

  const {
    UploadInput,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  } = props;

  return (
    <div className={props.classes.uploadButtonContainer}>
      <div {...dropzoneProps}>
        {
          files?.length < maxFiles &&
          <UploadInput {...props}/>
        }
      </div>
      <a className={props.classes.link}
        onClick={props.removeProfilePicPreview}
        style={{
          opacity: props.profilePicPreview ? 1 : 0,
          cursor: props.profilePicPreview ? 'pointer' : 'default',
          fontSize: '0.9rem',
          textAlign: 'center',
        }}
      >
        Remove Profile Pic
      </a>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  profilePicPreview: string;
  setProfilePicPreview(a?: any): void;
  removeProfilePicPreview(): void;
}


const styles = (theme: Theme) => createStyles({
  uploadButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0rem',
    marginBottom: '1rem',
  },
  link: {
    color: Colors.gradientUniswapBlue1,
    "&:hover": {
      cursor: "pointer",
      color: Colors.blue,
    },
    marginTop: '0.5rem',
  },
})

export default withStyles(styles)(UploadLayout);
