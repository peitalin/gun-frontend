import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, fontFam } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";



const AirItemWide: React.FC<ReactProps> = (props) => {

  let itemSize = (1 / (props.showNumItems || 3) * 100).toFixed(2);

  const {
    removePaddingBottom = false,
    materialStyle = false,
  } = props;

  return (
    <li
      className={clsx(
        props.classes.airItemList,
        props.disableSnap ? props.classes.disableSnap : null,
      )}
      style={
        props.borderGutter
        ? {
            maxWidth: `${itemSize}%`,
            flex: `0 0 ${itemSize}%`,
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: `0px ${props.borderGutter}`, // Gutter between cards
          }
        : {
            maxWidth: `${itemSize}%`,
            flex: `0 0 ${itemSize}%`,
          }
      }
    >
      <div className={clsx(
          props.classes.airCardOuter,
          props.removeMarginBottom ? null : props.classes.marginBottom4,
        )}
        style={props.style}
      >
        <div className={props.classes.airCardMid}
          style={{
            backgroundImage: props.disableBackground ? "none" : null,
            paddingTop: removePaddingBottom ? "62.5%" : null
          }}
        >
          <div className={props.classes.airCardInner}>
            <div className={props.classes.airPreviewOuter}>
              {
                materialStyle
                ? <Card className={props.classes.cardOuter}>
                    <CardActionArea
                      classes={{ root: props.classes.cardActionArea }}
                      // disableRipple={true}
                      // focusRipple={false}
                    >
                      <div className={props.classes.airPreviewInner}
                        style={props.style}
                      >
                        {React.Children.only(props.children)}
                      </div>
                    </CardActionArea>
                  </Card>
                : <div className={props.classes.airPreviewInner}
                    style={props.style}
                  >
                    {React.Children.only(props.children)}
                  </div>
              }
            </div>
            {
              !props.disableDither &&
              <AirDither styles={{}}/>
            }
            {
              props.title &&
              <AirTitle title={props.title}/>
            }
          </div>
        </div>
      </div>
    </li>
  )
}

const AirDither = (props) => {
  return (
    <div className={clsx("air-dither", "fadeIn")} style={{
      backgroundImage: "linear-gradient(-180deg, rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0, 0.5) 100%)",
      opacity: 0.6,
      position: "absolute",
      height: "60%",
      width: "100%",
      left: "0px",
      bottom: "0px",
      pointerEvents: "none",
      ...props.styles
    }}/>
  )
}

const AirTitle = (props) => {
  let scale = props.scale || 1;
  return (
    <div className="air-title-container" style={{
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      paddingBottom: `${32 * scale}px`,
      paddingLeft: `${24 * scale}px`,
      paddingRight: `${24 * scale}px`,
    }}>
      <div className="air-title-text" style={{
        overflowWrap: "break-word",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "1.44444em",
        color: "rgb(255, 255, 255)",
        textAlign: "center",
        margin: "0px",
      }}>
        {props.title}
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  showNumItems?: number;
  disableSnap?: boolean;
  disableDither?: boolean;
  disableBackground?: boolean;
  style?: any;
  materialStyle?: boolean;
  removePaddingBottom?: boolean;
  removeMarginBottom?: boolean;
  borderGutter?: string;
  [key: string]: any;
}

const styles = (theme: Theme) => createStyles({
  airItemList: {
    scrollSnapAlign: "start",
    scrollSnapStop: "always", // snap
    // borderStyle: "solid",
    // borderColor: "transparent",
    // borderWidth: "0px 0.25rem",
    maxWidth: "33.33%",
    flex: "0 0 33.33%",
    zIndex: 1500,
    listStyle: "none",
  },
  disableSnap: {
    scrollSnapAlign: "unset",
    scrollSnapStop: "unset",
  },
  airCardOuter: {
    width: "100%",
    marginRight: "6px",
  },
  airCardMid: {
    contain: "strict",
    position: "relative",
    width: "100%",
    zIndex: 0,
    // borderBottomLeftRadius: "3px",
    // borderBottomRightRadius: "3px",
    // borderTopLeftRadius: "3px",
    // borderTopRightRadius: "3px",
    overflow: "hidden",
    paddingTop: "62.5%",
    // for 16:10 aspect ratio
  },
  airCardInner: {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: "100%",
    width: "100%",
  },
  airPreviewOuter: {
    position: "relative",
    paddingTop: "62.5%",
  },
  airPreviewInner: {
    "-webkit-box-pack": "center",
    "-webkit-box-align": "center",
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    display: "flex",
    flexDirection: 'column',
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-start",
  },
  cardOuter: {
    borderRadius: BorderRadius,
    position: "absolute",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardActionArea: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  cardMediaTall: {
    height: "100%",
    objectFit: "cover",
  },
  cardMediaWide: {
    width: "100%",
    // objectFit: "cover",
    objectFit: "cover",
  },
  marginBottom4: {
    marginBottom: "4px",
  },
});

// export default withStyles(styles)(React.memo(
//   (props: ReactProps) => <AirItemWide {...props}/>,
//   // (prevProps, nextProps) => {
//   //   // return true // prevent re-render after item loads
//   //   return prevProps.materialStyle === nextProps.materialStyle
//   //       && prevProps.disableBackground === nextProps.disableBackground
//   //       && prevProps.disableDither === nextProps.disableDither
//   //       && prevProps.disableSnap === nextProps.disableSnap
//   //       && prevProps.style === nextProps.style
//   //       && prevProps.title === nextProps.title
//   //       && prevProps.showNumItems === nextProps.showNumItems
//   // }
// ));
export default withStyles(styles)(AirItemWide)