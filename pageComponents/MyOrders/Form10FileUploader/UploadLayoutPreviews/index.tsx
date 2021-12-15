import React from "react";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { ILayoutProps } from "components/DropzoneUploader/Dropzone";
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
