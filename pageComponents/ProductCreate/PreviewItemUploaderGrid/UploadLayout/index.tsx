import React from "react";
import { ReactElement } from "react";
import { oc as option } from "ts-optchain";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { Colors } from "layout/AppTheme";
import { ILayoutProps, IPreviewProps } from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../styles';
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import { ReducerName } from "typings/dropzone";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
// Components
import VideoPreview from "./VideoPreview";
// Grid
import { GridItem, Grid } from "../DraggableGrid";
import ImagePreview from "./ImagePreview";
// Youtube component
import AddYouTubeVimeoLink from "./AddYouTubeVimeoLink";
import { reorderPreviews } from "./sorter";







const UploadLayout: React.FC<ILayoutProps & ReactProps> = (props) => {

  const {
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
    reducerName,
  } = props;

  const actions = Actions[reducerName];
  const dispatch = useDispatch();

  const {
    dzuPreviewItems,
    dzuPreviewOrder,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      dzuPreviewItems: option(state)[reducerName].previewItems([]),
      dzuPreviewOrder: option(state)[reducerName].dzuPreviewOrder([]),
    }
  })

  const updateBeforeSortStart = (args) => {
  }

  const onSortStart = ({node, index, collection}, event) => {
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // create new order from existing previews
    let newDzuOrder = reorderPreviews({ oldIndex, newIndex, dzuPreviewOrder })
    // then sort the arrays by position
    dispatch(actions.REORDER_DZU_PREVIEW_ORDER(newDzuOrder))
  };

  const handleRemove = (previewId) => {
    dispatch(actions.REMOVE_PREVIEW_ITEMS([ previewId ]));
  }

  // console.log("percent", option(previews[0] as ReactElement).props.meta.percent())
  // console.log('dzuPreviewItems', dzuPreviewItems)
  // console.log('dzuPreviewOrder', dzuPreviewOrder)

  return (
    <>
      <div {...dropzoneProps}>
        {option(files)([]).length < maxFiles && input}
        {/* <Typography variant="body2" style={{ margin: "0.25rem", color: "#aaa" }}>
          Add a YouTubeVimeo link:
        </Typography> */}

        <Typography variant="body2" style={{
          fontSize: "0.8rem",
          fontWeight: 500,
          marginTop: '1rem',
          marginBottom: '0.25rem',
          color: Colors.darkGrey,
          width: '100%',
        }}>
          Add a YouTube link
          <span style={{
            color: Colors.mediumGrey,
            marginLeft: '0.25rem',
          }}>
            - optional
          </span>
        </Typography>
        <AddYouTubeVimeoLink
          reducerName={reducerName}
        />
      </div>

      <div className={"upload-grid-container"} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
        <Grid
          // items={this.state.items}
          onSortEnd={onSortEnd}
          updateBeforeSortStart={updateBeforeSortStart}
          onSortStart={onSortStart}
          distance={1} // needed for onClick to work
          axis="xy"
        >
          {
            !!dzuPreviewItems.length &&
            !!dzuPreviewOrder.length &&
            dzuPreviewOrder.map(( order, i ) => {

              let dzuPreview = dzuPreviewItems.find(i => i.id === order.id)

              let preview = (previews as ReactElement<IPreviewProps>[])
                .find(p => p.key === order.id);

              let percent = option(preview).props.meta.percent(100);
              // console.log("percent", percent)
              // console.log("dzuPreview", dzuPreview)

              if (
                option(dzuPreview).id() &&
                option(dzuPreview).previewUrl()
              ) {
                return (
                  <ImagePreview
                    key={dzuPreview.id}
                    dzuPreview={dzuPreview}
                    handleRemove={handleRemove}
                    reducerName={props.reducerName}
                    percent={percent}
                  />
                )
              } else if (!!option(dzuPreview).youTubeVimeoEmbedLink()) {
                return (
                  <VideoPreview
                    key={dzuPreview.id}
                    dzuPreview={dzuPreview}
                    handleRemove={handleRemove}
                    reducerName={props.reducerName}
                    asThumbnail={true}
                  />
                )
              } else {
                return <div key={i}></div>
              }
            })
          }
        </Grid>
      </div>
      {option(files)([]).length > 0 && submitButton}
    </>
  )
}


interface ReactProps {
  reducerName: ReducerName;
}
interface ReduxState {
  dzuPreviewItems: DzuPreviewItem[];
  dzuPreviewOrder: DzuPreviewOrder[];
}

export default UploadLayout;

// export default React.memo(
//   (props: ILayoutProps & ReactProps) => <UploadLayout {...props}/>,
//   // (prevProps, nextProps) => {
//   //   return false
//   // },
// );
