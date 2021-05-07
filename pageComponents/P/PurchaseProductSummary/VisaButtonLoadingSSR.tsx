// UI components
import ButtonLoading from "components/ButtonLoading";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core";


const VisaButtonLoading = (props: ReactProps) => {

  const { classes } = props;
  const theme = useTheme()

  return (
    <div className={classes.visaButtonRoot}>
      <ButtonLoading
        className={classes.visaCCFieldRoot}
        replaceTextWhenLoading={true}
        loading={true}
        disabled={true}
        loadingIconColor={
          Colors.cream
        }
      />
      <div className={classes.visaSpacing}></div>
      <ButtonLoading
        className={classes.visaButton}
        replaceTextWhenLoading={true}
        loading={true}
        disabled={true}
        loadingIconColor={
          Colors.cream
        }
      />
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}



const styles = (theme: Theme) => createStyles({
  visaButtonRoot: {
    marginTop: '0.25rem'
  },
  visaSpacing: {
    height: '0.5rem'
  },
  visaCCFieldRoot: {
    width: "100%",
    height: "38px",
    fontWeight: 500,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.lightGrey}`,
  },
  visaButton: {
    width: "100%",
    height: "40px",
    fontWeight: 500,
    backgroundColor: Colors.secondaryBright
  },
});

export default withStyles(styles)( VisaButtonLoading );


// export const PaypalButtonLoading = (props) => {

//   const { isDarkMode } = props;

//   return (
//     <ButtonLoading
//       replaceTextWhenLoading={true}
//       loading={true}
//       disabled={true}
//       loadingIconColor={Colors.lightestGrey}
//       style={{
//         width: "100%",
//         height: "40px",
//         fontWeight: 500,
//         marginBottom: '0.35rem', // paypal button annoying extra space
//         backgroundColor: Colors.lightYellow
//       }}
//     />
//   )
// }
