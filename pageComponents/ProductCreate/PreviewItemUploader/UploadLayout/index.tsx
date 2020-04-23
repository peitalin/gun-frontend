import React from "react";
import { ReactElement } from "react";
import { oc as option } from "ts-optchain";
import { v4 as uuidv4 } from "uuid"
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
import { ProductPreviewItemInput, ProductPreviewItem } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
import { DzuPreviewOrder, DzuPreviewItem } from "typings/dropzone";
// Components
import UploadProgress from "./UploadProgress";
import VideoPreview from "./VideoPreview";
import TextInput from "components/Fields/TextInput";
// Carousel
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide";
// Draggable
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const AirCarouselSortable = SortableContainer(AirCarousel);
const AirItemSortable = SortableElement(AirItemWide);
// Helpers
import { getYouTubeVimeoImagePreview } from "utils/strings";






const UploadLayout: React.FC<ILayoutProps & ReactProps> = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
  reducerName,
}) => {

  const actions = Actions[reducerName];
  const dispatch = useDispatch();

  const {
    dzuPreviewItems,
    dzuPreviewOrder,
    youTubeVimeoLinks,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      dzuPreviewItems: option(state)[reducerName].previewItems([]),
      dzuPreviewOrder: option(state)[reducerName].dzuPreviewOrder([]),
      youTubeVimeoLinks: option(state)[reducerName].previewItems([])
        .filter(p => !!p.youTubeVimeoEmbedLink),
    }
  })

  const updateBeforeSortStart = (args) => {
  }

  const onSortStart = ({node, index, collection}, event) => {
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {

    let newDzuOrder: DzuPreviewOrder[] = [];
    console.log('dzuPreviewOrder', dzuPreviewOrder)
    let item = dzuPreviewOrder.find(item => item.index === oldIndex);
    console.log("dragged item: ", item)

    if (oldIndex < newIndex) {
      newDzuOrder = [
        // oldIndex is before newIndex, items up to oldIndex stay the same.
        ...dzuPreviewOrder.slice(0, oldIndex),
        // items between oldIndex+1 to newIndex are shifted left (-1 index)
        // [ ..., <move-item: oldIndex>, (oldIndex+1, ..., newIndex), newIndex+1 ...]
        ...dzuPreviewOrder.slice(oldIndex + 1, newIndex + 1).map(i => {
          return {
            ...i,
            index: i.index - 1, // update index
          }
        }),
        // Dragged item goes here.
        {
          ...item,
          index: newIndex,
        },
        // everything after newIndex stays the same
        ...dzuPreviewOrder.slice(newIndex + 1),
      ];
    } else if (oldIndex > newIndex) {
      newDzuOrder = [
        // newIndex is before oldIndex, items up to newIndex stay the same.
        ...dzuPreviewOrder.slice(0, newIndex),
        // items between newIndex ~ oldIndex are shifted right (+1 index)
        // [ ..., (newIndex, ..., oldIndex-1), <move-item: oldIndex>, oldIndex+1 ...]
        ...dzuPreviewOrder.slice(newIndex, oldIndex).map(i => {
          return {
            ...i,
            index: i.index + 1,
          }
        }),
        // Dragged item goes here.
        {
          ...item,
          index: newIndex,
        },
        // everything after oldIndex stays the same
        ...dzuPreviewOrder.slice(oldIndex + 1),
      ];
    } else {
      newDzuOrder = dzuPreviewOrder
    }
    // then sort the arrays by position
    dispatch(actions.REORDER_DZU_PREVIEW_ORDER(newDzuOrder))
  };


  const handleRemove = (previewId) => {
    dispatch(actions.REMOVE_PREVIEW_ITEMS([ previewId ]));
  }


  const addYouTubeVimeoLink = (
    link: string,
    youTubeVimeoLinks: ProductPreviewItemInput[]
    ) => {
    console.log('YouTubeVimeo link: ', link)
    if (!link) {
      return
    }
    if (
      !link.includes("youtube.com") &&
      !link.includes("vimeo.com")
    ) {
      console.log(`not a YouTube or Vimeo link: ${link}`)
      return
    }
    if (!!youTubeVimeoLinks.find(y => y.youTubeEmbedLink === link)) {
      console.log("Video already exists!: ", link, youTubeVimeoLinks)
    } else {

      let youTubeVimeoPreviewId = `preview_item_video_${uuidv4()}`;
      dispatch(actions.ADD_PREVIEW_ITEMS([
        {
          id: youTubeVimeoPreviewId,
          name: '',
          previewUrl: undefined,
          fileId: undefined,
          percent: 0,
          size: 0,
          status: 'done',
          duration: 0,
          fileWithMeta: undefined,
          youTubeVimeoEmbedLink: link, // image, not youtube link
        }
      ]))
      let previewOrder = {
        id: youTubeVimeoPreviewId,
        index: undefined, // assigned in redux reducer,
      }
      dispatch(actions.ADD_DZU_PREVIEW_ORDER([ previewOrder ]))
    }
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
          addYouTubeVimeoEmbedLink={(e) => addYouTubeVimeoLink(e, youTubeVimeoLinks)}
        />
      </div>
      <AirCarouselSortable
        id={"air-cara-2"}
        axis={"x"}
        distance={1} // needed for onClick to work
        disableButtons={dzuPreviewItems.length < 4 ? true : false}
        // disableButtons={true}
        scrollSnapType={"none"}
        updateBeforeSortStart={updateBeforeSortStart}
        onSortStart={onSortStart}
        onSortEnd={onSortEnd}
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
                <AirItemSortable
                  index={order.index}
                  key={dzuPreview.id}
                  disableDither={true}
                  disableBackground={true}
                  showNumItems={4}
                  // Image Preview Embedded as CSS background
                  // to avoid image flickers
                  style={{
                    boxShadow: "0 1px 3px 0 #e6ebf1",
                    backgroundImage: `url(${dzuPreview.previewUrl})`,
                    backgroundSize: 'contain',
                  }}
                  materialStyle={false}
                >
                  <UploadProgress
                    previewId={dzuPreview.id}
                    handleRemove={handleRemove}
                    dzuPreviewItem={dzuPreview}
                    percent={percent}
                  />
                </AirItemSortable>
              )
            } else if (!!option(dzuPreview).youTubeVimeoEmbedLink()) {
              const youTubeVimeoThumbnail = getYouTubeVimeoImagePreview(dzuPreview.youTubeVimeoEmbedLink)
              return (
                <AirItemSortable
                  index={order.index}
                  key={dzuPreview.id}
                  disableDither={true}
                  disableBackground={true}
                  showNumItems={4}
                  style={{
                    boxShadow: "0 1px 3px 0 #e6ebf1",
                    backgroundImage: `url(${youTubeVimeoThumbnail})`,
                    backgroundSize: 'contain',
                  }}
                  materialStyle={false} // don't have nested <buttons> Cards
                >
                  <VideoPreview
                    previewId={dzuPreview.id}
                    videoUrl={dzuPreview.youTubeVimeoEmbedLink}
                    handleRemove={handleRemove}
                    asThumbnail={true}
                  />
                </AirItemSortable>
              )
            } else {
              return <div key={i}></div>
            }
          })
        }
      </AirCarouselSortable>
      {option(files)([]).length > 0 && submitButton}
    </>
  )
}

const AddYouTubeVimeoLink: React.FC<AddYouTubeVimeoProps> = (props) => {

  const [youTubeVimeoLink, setYouTubeVimeoLink] = React.useState("");
  const { addYouTubeVimeoEmbedLink } = props;

  return (
    <TextInput
      placeholder={"Paste your YouTube link"}
      value={youTubeVimeoLink}
      onChange={(e) => setYouTubeVimeoLink(e.target.value)}
      inputProps={{
        root: {
          width: '90%',
        },
        style: {
          width: '100%',
          borderRadius: "4px 0 0 4px",
          borderRight: 'none',
        }
      }}
      onSubmit={() => {
        addYouTubeVimeoEmbedLink(youTubeVimeoLink)
        setYouTubeVimeoLink("")
      }}
    />
  )
}

interface AddYouTubeVimeoProps {
  videoUrl?: string;
  addYouTubeVimeoEmbedLink?(link: string): void;
}

interface ReactProps {
  reducerName: ReducerName;
}
interface ReduxState {
  dzuPreviewItems: DzuPreviewItem[];
  dzuPreviewOrder: DzuPreviewOrder[];
  youTubeVimeoLinks: ProductPreviewItemInput[];
}

export default React.memo(
  (props: ILayoutProps & ReactProps) => <UploadLayout {...props}/>,
  // (prevProps, nextProps) => {
  //   return false
  // },
);
