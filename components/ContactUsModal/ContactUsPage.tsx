import * as React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
import Typography from "@material-ui/core/Typography";
import ContactUs from "pageComponents/ContactUs";



const ContactUsModal: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const [displaySnack, setDisplaySnack] = React.useState(false);

  return (
    <ErrorBounds>
      <main className={clsx(classes.root, "fadeInFast")}>
        <div className={classes.flexCol}>
          <ContactUs/>
        </div>
      </main>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default withStyles(styles)( ContactUsModal );