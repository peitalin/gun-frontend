import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AlignCenterLayout from "components/AlignCenterLayout";
import Layout from "layout";


const PrivacySSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
    >
      <div className={classes.root}>
        <Typography className={classes.title} variant={"h2"}>
          Privacy
        </Typography>

        <Typography className={classes.subtitle} variant={"h4"}>
          Subtitle
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          Lorem
        </Typography>
      </div>
    </AlignCenterLayout>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1rem',
    marginTop: '4rem',
    marginBottom: '4rem',
  },
  title: {
  },
  subtitle: {
  },
  paragraph: {
  },
});


export default withStyles(styles)( PrivacySSR );




