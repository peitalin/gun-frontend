import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AlignCenterLayout from "components/AlignCenterLayout";


const HeroImageSection: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  // implementation="css" made images render
  // wasn't hiding this component on sm, md, lg, xl screen sizes
  // switch to javascript xsDown check
  if (props.isMobile) {
    return (
      <div className={classes.heroLandscapeContainerMobile}>
        {props.children}
      </div>
    )
  } else {
    return (
      <div className={classes.heroLandscapeContainer}>
        <AlignCenterLayout
          maxWidth={600}
          withRecommendations={false}
        >
          {props.children}
        </AlignCenterLayout>
      </div>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  isMobile: boolean
}


const styles = (theme: Theme) => createStyles({
  heroLandscapeContainerMobile: {
    padding: '0rem',
    flexBasis: '60vw',
    flexGrow: 1,
  },
  //
  heroLandscapeContainer: {
    position: "relative",
    height: '100%',
    width: '100%',
    // in line with previewImages which are 60vw wide, 37.5vw tall (16:10)
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: '10rem',
    paddingBottom: '4rem',
    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
});


export default withStyles(styles)( HeroImageSection );
