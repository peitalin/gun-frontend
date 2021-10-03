import { createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rootSm: {
    flexGrow: 1,
    height: '100%',
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '4rem',
  },
  maxWidth: {
    maxWidth: 600,
    width: '100%',
  },
  maxWidth500: {
    maxWidth: 500,
    width: '100%',
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    margin: 0,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  editButton: {
    margin: 0,
    color: Colors.ultramarineBlue,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '20%',
  },
  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: '100%',
    marginTop: "2rem",
  },
  flexButtonItem: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '150px',
  },
  flexButtonSpacer: {
    marginBottom: '1rem',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '5%',
  },
})














