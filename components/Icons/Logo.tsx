import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import DownloadIcon from "./DownloadIcon";
import Typography from "@material-ui/core/Typography";



const Logo = (props: LogoProps) => {

  const colour = props.color || "#F2F2F2";
  const {
    classes,
    hideTitle = true,
    disableLogo = false,
  } = props;

  return (
    <div className={classes.logoContainer}>
      <div className={classes.logo}>
        <svg width="109" height="23" viewBox="0 0 109 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.9548 21L32.9708 13.944H31.4868V21H27.4548V2.184H33.6708C34.9775 2.184 36.0321 2.408 36.8348 2.856C37.6561 3.28533 38.2908 3.808 38.7388 4.424C39.2055 5.04 39.5135 5.684 39.6628 6.356C39.8308 7.00933 39.9148 7.56 39.9148 8.008C39.9148 9.20267 39.6255 10.2013 39.0468 11.004C38.4681 11.788 37.7588 12.4227 36.9188 12.908L43.0228 21H37.9548ZM33.2228 10.332C34.1935 10.332 34.8748 10.108 35.2668 9.66C35.6775 9.212 35.8828 8.68933 35.8828 8.092C35.8828 7.43867 35.6588 6.916 35.2108 6.524C34.7628 6.132 34.1188 5.936 33.2788 5.936H31.4868V10.332H33.2228ZM44.9275 21V2.184H57.5835V5.936H48.9595V9.464H55.0915V13.216H48.9595V17.248H57.5835V21H44.9275ZM61.0876 21V2.184H65.1196V17.248H73.3236V21H61.0876ZM88.6114 21L87.2394 17.136H80.2114L78.8394 21H74.5554L81.8634 2.184H85.5874L92.8954 21H88.6114ZM83.7394 7.364L81.4714 13.664H85.9794L83.7394 7.364ZM97.5169 21V12.712L90.8529 2.184H95.5009L99.5329 8.904L103.565 2.184H108.213L101.549 12.712V21H97.5169Z"
            fill="#111111"/>
          <g clipPath="url(#clip0)">
            <path d="M17.0287 9.76391L16.5757 9.29293C16.4334 9.14485 16.2433 9.06293 16.0409 9.06293C15.8382 9.06293 15.6309 9.14485 15.4886 9.29293L12.5595 12.3192V2.70462C12.5595 2.27103 12.255 1.91797 11.8379 1.91797H11.1968C10.7799 1.91797 10.3984 2.27103 10.3984 2.70462V12.3534L7.47506 9.29293C7.33259 9.14485 7.15334 9.06293 6.95071 9.06293C6.74831 9.06293 6.56345 9.14485 6.42109 9.29293L5.97051 9.76391C5.67567 10.0705 5.67691 10.5691 5.97175 10.8757L10.9637 16.0634C11.1059 16.2112 11.2966 16.293 11.5007 16.293H11.5028C11.7053 16.293 11.8956 16.2112 12.0377 16.0634L17.0287 10.8758C17.3238 10.5694 17.3238 10.0705 17.0287 9.76391Z"
              fill="#111111"/>
          </g>
            <path d="M18.5276 15.0938V18.6875H4.47206V15.0938H1.9165V19.8854C1.9165 20.5479 2.48895 21.0833 3.19428 21.0833H19.8054C20.512 21.0833 21.0832 20.5479 21.0832 19.8854V15.0938H18.5276Z"
              fill="#111111"/>
          <defs>
            <clipPath id="clip0">
              <rect x="3.8335" y="0.958984" width="15.3333" height="15.3333"
                fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <Typography variant="caption"
        style={{ color: colour }}
        className={classes.tagline}
      >
      {
        !hideTitle &&
        <span>Download anything,
          <span className={classes.highlight}>instantly.</span>
        </span>
      }
      </Typography>
    </div>
  )
}

interface LogoProps extends WithStyles<typeof styles> {
  color?: string;
  hideTitle?: boolean;
  disableLogo?: boolean;
}

const styles = (theme: Theme) => createStyles({
  logoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    width: 64,
  },
  logoText: {
    fontWeight: 300
  },
  tagline: {
    transform: "translateY(0.25rem)",
  },
  downloadIcon: {
  },
  highlight: {
    color: theme.palette.secondary.main,
  },
});

export default withStyles(styles)( Logo );
