import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AlignCenterLayout from "components/AlignCenterLayout";


const HeroImageSection: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <div className={clsx(
      classes.heroLandscapeContainer,
      props.isMobile && classes.heroLandscapeContainerMobile,
    )}>
      <AlignCenterLayout
        maxWidth={720}
        withRecommendations={false}
      >
        {props.children}
      </AlignCenterLayout>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  isMobile: boolean
}


const styles = (theme: Theme) => createStyles({
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
    paddingTop: '8rem',
    paddingBottom: '4rem',
    marginBottom: '6rem',
    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
  heroLandscapeContainerMobile: {
    marginBottom: '8rem',
  },
});


export default withStyles(styles)( HeroImageSection );
