import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import ErrorBounds from "components/ErrorBounds";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// helpers
import { useRouter } from "next/router";




const EmptyProductsList = (props: ReactProps) => {

  const { classes } = props;

  const router = useRouter();

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.maxWidth,
    )}>
      <div className={classes.flexColWithBorder}>
        <Typography variant="h3" className={classes.title}>
          My Products
        </Typography>
        <Typography variant="h5" className={classes.subtitle}>
          Your products will appear here after you add your first product
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.mainButton}
          onClick={() => {
            router.push("/sell")
          }}
        >
          Upload Product
        </Button>
      </div>
      {/* <div className={clsx(classes.questionBox, classes.flexCol)}>
        <Typography variant="h5" className={classes.question}>
            Have a digital product you want to sell on the GM marketplace?
        </Typography>
      </div> */}
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  maxWidth: {
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    margin: "2rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexRowWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
  },
  flexColWithBorder: {
    display: 'flex',
    position: 'relative',
    minHeight: 200,
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    marginRight: '0rem',
    padding: '1rem',
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: "4px",
    background: Colors.foregroundColor,
  },
  title: {
    margin: '1rem',
    marginBottom: '2rem',
  },
  subtitle: {
    margin: '1rem',
    textAlign: 'center',
  },
  question: {
    margin: '1rem',
  },
  questionBox: {
    padding: '2rem',
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: "4px",
    background: Colors.foregroundColor,
  },
  mainButton: {
    maxWidth: 180,
    margin: '1rem',
  },
});

const ITEM_HEIGHT = 48;
const options = [
  'Suspend',
  'Delete',
  'Unpublish',
  'Publish',
];


export default withStyles(styles)( EmptyProductsList );