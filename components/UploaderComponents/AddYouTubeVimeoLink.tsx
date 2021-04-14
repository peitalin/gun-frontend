import React from "react";
import { oc as option } from "ts-optchain";
import { v4 as uuidv4 } from "uuid"
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Typings
import { ProductPreviewItemInput, ProductPreviewItem } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Components
import TextInput from "components/Fields/TextInput";
import { isYouTubeVimeoLink } from "utils/links";





const AddYouTubeVimeoLink: React.FC<AddYouTubeVimeoProps> = (props) => {

  const [youTubeVimeoLink, setYouTubeVimeoLink] = React.useState("");

  const { reducerName } = props;
  const actions = Actions[reducerName];
  const dispatch = useDispatch();

  const {
    youTubeVimeoLinks,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      youTubeVimeoLinks: option(state)[reducerName].dzuPreviewItems([])
        .filter(p => !!p.youTubeVimeoEmbedLink),
    }
  })


  const addYouTubeVimeoLink = (link: string) => {

    if (!isYouTubeVimeoLink(link)) {
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
        addYouTubeVimeoLink(youTubeVimeoLink)
        setYouTubeVimeoLink("")
      }}
    />
  )
}

interface AddYouTubeVimeoProps {
  videoUrl?: string;
  reducerName: ReducerName;
}

interface ReduxState {
  youTubeVimeoLinks: ProductPreviewItemInput[];
}

export const styles = (theme: Theme) => createStyles({
})

export default AddYouTubeVimeoLink;