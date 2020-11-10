import React from 'react';
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import Hidden from "components/HiddenFix";
// Recommendations
import Loading from "components/Loading";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import Typography from "@material-ui/core/Typography";
// Next
import dynamic from "next/dynamic";
// const YouMayAlsoLike = dynamic(
//   () => import("components/Recommendations/YouMayAlsoLike"), {
//     ssr: false,
//     loading: () =>
//     <div style={{ paddingLeft: '1rem', marginTop: '2rem' }}>
//       <span style={{ height: '50px' }}></span>
//       <LoadingCards alignCenter/>
//     </div>
//     // 2rem for marginTop
//     // 50px to match YouMayALsoLikeRecommendations Typography component
//   }
// );


const AlignCenterLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
    style,
    withRecommendations = true,
  } = props;

  return (
    <div className={clsx(classes.root, props.className)}>
      {
        React.Children.map(props.children, (child) => {
          return (
            <div className={classes.alignCenterChild} style={{
              maxWidth: props.maxWidth ? props.maxWidth : 960,
              ...style
            }}>
              {child}
            </div>
          )
        })
      }

      {/* {
        withRecommendations &&
        <div className={classes.pageRecommendationsContainer}>
          <Hidden mdUp>
            <div className={classes.pageRecommendations}>
              <YouMayAlsoLike/>
            </div>
          </Hidden>
          <Hidden smDown>
            <YouMayAlsoLike
              // initialProducts={initialProductsLimitedRelease}
              title={"You may also like"}
              maxWidth={1160}
            />
          </Hidden>
        </div>
      } */}
    </div>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  withRecommendations?: boolean;
  maxWidth?: number | 'unset';
  style?: any;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  alignCenterChild: {
    width: '100%',
  },
  pageRecommendationsContainer: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
  },
  pageRecommendations: {
    marginTop: '1rem',
    padding: '1rem',
  },
});


export default withStyles(styles)( AlignCenterLayout );
