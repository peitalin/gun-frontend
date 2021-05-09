import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AlignCenterLayout from "components/AlignCenterLayout";


const PrivacySSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <Typography className={classes.title} variant={"h2"}>
          FREQUENTLY ASKED QUESTIONS
        </Typography>

        <Typography className={classes.paragraph} variant={"body1"}>
          Gun Marketplace is committed to providing quality services to you
          and this policy outlines our ongoing obligations to you in respect
          of how we manage your Personal Information.
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          We have adopted the Australian Privacy Principles (APPs)
          contained in the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs
          govern the way in which we collect, use, disclose, store, secure and
          dispose of your Personal Information.
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          A copy of the Australian Privacy Principles may be obtained
          from the website of The Office of the Australian Information
          Commissioner at www.aoic.gov.au
        </Typography>

        <Typography className={classes.subtitle} variant={"h4"}>
          What is Personal Information and why do we collect it?
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          Personal Information is information that identifies an
          individual. Examples of Personal Information we collect include:
          names, addresses, email addresses, firearm license numbers,
          phone numbers, and bank account details for payout purposes only.
          Without these information
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          This Personal Information is obtained you create an account on
          our website www.gunmarketplace.com.au.
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
          We collect your Personal Information for the purpose of
          providing our escrow services to you, and ensuring you are paid on time.
          We may share some Personal Information with regulated dealers
          to faciliate transfer of firearms. The information we share with dealers
          will include identifying information such as your name, address, email,
          phone number, and firearm license. We do not share banking information.
        </Typography>
        <Typography className={classes.paragraph} variant={"body1"}>
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
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  paragraph: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
});


export default withStyles(styles)( PrivacySSR );




