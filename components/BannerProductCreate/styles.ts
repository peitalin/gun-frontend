import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

const fontFam = 'Helvetica Neue';

export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitleContainerMobile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  mainTitleMobile: {
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    // fontSize: '1rem',
    textAlign: "center",
  },
  mainTitle: {
    fontWeight: 600,
    marginBottom: '0.5rem',
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    fontSize: '2rem',
  },
  mainTitleHighlight: {
    fontWeight: 500,
    fontFamily: fontFam,
    color: Colors.secondary,
  },
  downloadIcon: {
    fill: Colors.foregroundColor,
    height: '2.5rem',
    marginRight: '0.5rem',
    width: '100%',
  },
  subTitle: {
    marginTop: "0.25rem",
    fontSize: '0.9rem',
  },
  subline1: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1.25rem',
  },
  subline1Mobile: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '0.9375rem',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
})