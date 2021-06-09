import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Button from '@material-ui/core/Button';
import AlignCenterLayout from "components/AlignCenterLayout";


const AboutUsSSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          ABOUT US
        </div>

        <div className={classes.paragraph}>
          1776 Industries Pty Ltd (trading as “Gun Marketplace”, ABN 11 643 175 482)
          is a company based in Brisbane, Australia. Formed in 2020,
          Gun Marketplace is a secure trading platform created for and by the
          community of firearm owners and enthusiasts to buy and sell their collections.
        </div>

        <div className={classes.paragraph}>
          We have built a marketplace that ensures more transparency on transfers
          and developed a secure escrow checkout system for all transactions to
          protect customers. We are proud to receive strong support for our
          platform and we are eager to provide our simple and secure solutions.
        </div>

        <div className={classes.paragraph}>
          Gun Marketplace is active in ensuring we are constantly providing our
          customers a safe experience and new features developed on feedback from
          the community.
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

export const commonStyles = {
  title: {
    fontSize: '1.75rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  subtitle: {
    marginTop: '2rem',
    marginBottom: '0rem',
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  paragraph: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  link: {
    marginLeft: '0.3rem',
    marginRight: '0.3rem',
    color: Colors.ultramarineBlueDarker,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
}

export default withStyles(styles)( AboutUsSSR );




