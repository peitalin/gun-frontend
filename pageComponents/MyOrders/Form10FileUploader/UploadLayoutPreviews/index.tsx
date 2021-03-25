import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { ILayoutProps } from "components/DropzoneUploader/Dropzone";
import "components/DropzoneUploader/styles.css";

import { Order } from "typings/gqlTypes";




const UploadLayoutPreviews: React.FC<ReactProps & ILayoutProps> = ({
  UploadInput,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
  ...props
}) => {

  return (
    <>
      <UploadInput {...props}/>
    </>
  )
}

interface ReactProps {
  order?: Order;
}

export default UploadLayoutPreviews;
