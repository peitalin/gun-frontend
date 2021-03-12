import React from "react";
import { ReactElement } from "react";
import { oc as option } from "ts-optchain";
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
          option(files)([]).length < maxFiles &&
          <UploadInput {...props}/>
        }
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
}

export const styles = (theme: Theme) => createStyles({
  uploadButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0rem',
    marginTop: '0.5rem',
  },
})

export default withStyles(styles)(UploadLayout);
