// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
import { NavBarHeight, CategoryBarHeight } from "layout/NavBarMain/styles";


export const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  sectionContainer: {
    backgroundColor: Colors.backgroundColor,
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    opacity: 1,
    position: 'relative',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  contentContainer: {
    flexBasis: '65%',
    maxWidth: '1160px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
  },
  margin1: {
    margin: '1rem',
  },
  margin2: {
    margin: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spacer: {
    marginTop: "4rem",
  },
  cornerButtonContainer: {
    position: 'absolute',
    right: '0rem',
    bottom: '0rem',
    padding: '1rem',
    // padding prevents accidental click-through to uploader
  },
  cornerButtonOutline: {
    border: '1px solid rgba(225, 225, 225, 0)',
    color: 'rgba(225, 225, 225, 0.9)',
    "&:hover": {
      border: '1px solid rgba(36, 132, 255, 0.8)',
      backgroundColor: "rgba(36, 132, 255, 0.2)",
    },
  },
  cornerButton: {
    minWidth: "164px",
  },
  successMessage: {
  },
  purchaseSuccessText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseSuccessBackground: {
    width: '100%',
    background: Colors.green,
    position: 'absolute',
    display: 'flex',
    top: NavBarHeight - 5,
    height: '6rem',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseSuccessBackgroundSm: {
    width: '100%',
    background: Colors.green,
    position: 'absolute',
    display: 'flex',
    paddingLeft: "1rem",
    top: NavBarHeight - CategoryBarHeight + CategoryBarHeight - 5,
    height: '6rem',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginRight: '0.5rem',
  },
  root: {
    padding: '4rem 2rem 2rem 2rem',
    borderRadius: '4px',
    border: '1px solid #eaeaea',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 90px - 120px)',
  },
  rootMobile: {
    padding: '0.5rem',
    paddingTop: '2rem',
  },
});
