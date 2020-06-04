
import React from "react";
import { Colors } from "layout/AppTheme";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
// Components
import ImageUploadProgress from "./ImageUploadProgress";
import { ReducerName } from "typings/dropzone";





const ImagePreview: React.FC<ReactProps> = (props) => {

  const {
    dzuPreview,
    handleRemove,
    percent,
  } = props;

  /// NOTE: GREY IMAGE PREVIEWS BUG
  /// if image preview blobs are not appearing, it may be dev-server only error.
  /// You will see this when uploading multiple images at a time,
  /// and will see 404 errors for blog:https:// images that are stored in the
  /// browser. An the image preview will not show anything.
  /// On production, these errors do not appear to occur
  /// it would be a problem in the uploader library

  return (
    <div
      key={dzuPreview.id}
      // Image Preview Embedded as CSS background
      // to avoid image flickers
      style={{
        backgroundImage: `url(${dzuPreview.previewUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        width: '100%',
        height: '100%',
        position: 'relative', //for upload progress positioning
        borderRadius: '4px',
        borderTop: '1px solid #666',
        borderLeft: '1px solid #666',
        borderRight: '1px solid #666',
        borderBottom: '1px solid #666',
      }}
    >
      <ImageUploadProgress
        previewId={dzuPreview.id}
        handleRemove={handleRemove}
        dzuPreview={dzuPreview}
        percent={percent}
        reducerName={props.reducerName}
      />
    </div>
  )
}



interface ReactProps {
  dzuPreview: DzuPreviewItem;
  handleRemove(previewId?: any): void;
  percent: number;
  reducerName: ReducerName;
}

// export default ImagePreview;

export default React.memo(
  (props: ReactProps) => <ImagePreview {...props}/>,
  (prevProps, nextProps) => {

    let pp = prevProps;
    let np = nextProps;

    // if true, don't re-render
    return pp.percent === np.percent
    && pp.dzuPreview.status === np.dzuPreview.status
    && pp.dzuPreview.previewUrl === np.dzuPreview.previewUrl

  }
);
