import React from "react";
import { ReactElement } from "react";
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";
// Styles
import { ILayoutProps, IPreviewProps } from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './styles';
import TextInput from "components/Fields/TextInput";




const UploadLayout: React.FC<ILayoutProps & ReactProps> = (props) => {

  const {
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  } = props;

  return (
    <div className={props.classes.uploadButtonContainer}>
      <div {...dropzoneProps}>
        {option(files)([]).length < maxFiles && input}
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


export default withStyles(styles)(UploadLayout);
