// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
import { NavBarHeight, CategoryBarHeightMobile, CategoryBarHeight } from "layout/NavBarMain/styles";


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
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dadada' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
    top: NavBarHeight - CategoryBarHeight + CategoryBarHeightMobile - 5,
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
  width100: {
    width: "100%",
  },
  openCreateDealerButton: {
    height: 55,
    width: '100%',
    maxWidth: 200,
    borderRadius: BorderRadius,
    marginTop: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: Colors.cream,
    background: Colors.ultramarineBlue,
    "&:hover": {
      background: Colors.ultramarineBlueLight,
    },
  },
  openCreateDealerButtonLabel: {
    fontSize: '1.1rem',
  },
});
