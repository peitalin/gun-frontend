import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Button from '@material-ui/core/Button';
import AlignCenterLayout from "components/AlignCenterLayout";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import PageDashboardLayout from "layout/GetUser/PageDashboardLayout";


const FaqSSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  let showSocialBanner = true
    // || router.pathname.startsWith("/help")

  return (
  <PageDashboardLayout>
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
        {
          showSocialBanner &&
          <ShowOnMobileOrDesktopSSR desktop>
            <SocialFloatingBanner/>
          </ShowOnMobileOrDesktopSSR>
        }
    </AlignCenterLayout>
  </PageDashboardLayout>
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

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( FaqSSR );




