import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import Button from '@material-ui/core/Button';
import AlignCenterLayout from "components/AlignCenterLayout";
import { commonStyles } from "./commonStyles";


const FaqSSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          FREQUENTLY ASKED QUESTIONS
        </div>

        <div className={classes.paragraph}>
          Gun Marketplace is committed to providing quality services to you.
          For information on how our marketplace works, and other frequentaly asked questions,
          please view our
          <a className={classes.link}
            target={"_blank"}
            href={"https://docs.gunmarketplace.com.au/"}
          >
            documentation
          </a>
          or join our discord server at
          <a className={classes.link}
            target={"_blank"}
            href={"https://discord.gg/umAdYtsa9v"}
          >
            https://discord.gg/umAdYtsa9v
          </a>
        </div>
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
    ...commonStyles.title,
  },
  subtitle: {
    ...commonStyles.subtitle,
  },
  paragraph: {
    ...commonStyles.paragraph,
  },
  link: {
    ...commonStyles.link,
  },
});


export default withStyles(styles)( FaqSSR );




