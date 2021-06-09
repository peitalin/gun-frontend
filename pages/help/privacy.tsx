import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import AlignCenterLayout from "components/AlignCenterLayout";
import { commonStyles } from "./commonStyles";


const TermsSSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          PRIVACY POLICY
        </div>

        <div className={classes.paragraph}>
          Gun Marketplace is committed to providing quality services to you
          and this policy outlines our ongoing obligations to you in respect of
          how we manage your Personal Information.
        </div>
        <div className={classes.paragraph}>
          We have adopted the Australian Privacy Principles (APPs) contained
          in the Privacy Act 1988 (Cth) (the Privacy Act). The National Privacy
          Principles (NPPs) govern the way in which we collect, use, disclose,
          store, secure and dispose of your Personal Information.
        </div>
        <div className={classes.paragraph}>
          A copy of the Australian Privacy Principles may be obtained from
          the website of The Office of the Australian Information Commissioner
          at
          <a className={classes.link} href={"https://www.aoic.gov.au"} target="_blank">
            www.aoic.gov.au
          </a>.
        </div>

        <div className={classes.subtitle}>
          What is Personal Information and why do we collect it?
        </div>
        <div className={classes.paragraph}>
          Personal Information is information or an opinion that
          identifies an individual. Examples of Personal Information
          we collect include: names, email addresses and phone numbers.
        </div>
        <div className={classes.paragraph}>
          This Personal Information is obtained in many ways including via
          our website
          <a className={classes.link} href={"https://www.gunmarketplace.com.au"}
            target="_blank">
            https://www.gunmarketplace.com.au
          </a>
          and from third parties.
          We do not guarantee website links or policy of authorised third parties.
        </div>
        <div className={classes.paragraph}>
          We collect your Personal Information for the primary purpose of
          providing our services to you, providing information to our
          clients and marketing. We may also use your Personal Information
          for secondary purposes closely related to the primary purpose,
          in circumstances where you would reasonably expect such use or
          disclosure. You may unsubscribe from our mailing/marketing lists at
          any time by contacting us in writing.
        </div>
        <div className={classes.paragraph}>
          When we collect Personal Information we will, where appropriate and
          where possible, explain to you why we are collecting the information
          and how we plan to use it.
        </div>

       <div className={classes.subtitle}>
        Sensitive Information
        </div>

        <div className={classes.paragraph}>
          Sensitive information is defined in the Privacy Act to include
          information or opinion about such things as an individual's racial
          or ethnic origin, political opinions, membership of a political
          association, religious or philosophical beliefs, membership of a
          trade union or other professional body, criminal record or health
          information.
        </div>
        <div className={classes.paragraph}>
          Sensitive information will be used by us only:
          (i) For the primary purpose for which it was obtained
          (ii) For a secondary purpose that is directly related to the primary purpose
          (iii) With your consent; or where required or authorised by law.
        </div>

        <div className={classes.subtitle}>
          Third Parties
        </div>
        <div className={classes.paragraph}>
          Where reasonable and practicable to do so, we will collect your
          Personal Information only from you. However, in some circumstances
          we may be provided with information by third parties. In such a case
          we will take reasonable steps to ensure that you are made aware of the
          information provided to us by the third party.
        </div>

        <div className={classes.subtitle}>
          Disclosure of Personal Information
        </div>
        <div className={classes.paragraph}>
          Your Personal Information may be disclosed in a number of circumstances
          including the following:
          (i) Third parties where you consent to the use or disclosure; and
          (ii) Where required or authorised by law.
        </div>


        <div className={classes.subtitle}>
          Security of Personal Information
        </div>
        <div className={classes.paragraph}>
          Your Personal Information is stored in a manner that reasonably
          protects it from misuse and loss and from unauthorized access,
          modification or disclosure.
        </div>
        <div className={classes.paragraph}>
          When your Personal Information is no longer needed for the purpose for
          which it was obtained, we will take reasonable steps to destroy or
          permanently de-identify your Personal Information. However, most of
          the Personal Information is or will be stored in client files which
          will be kept by us for a minimum of 7 years.
        </div>

        <div className={classes.subtitle}>
          Access to your Personal Information
        </div>
        <div className={classes.paragraph}>
          You may access the Personal Information we hold about you and to
          update and/or correct it, subject to certain exceptions.
          If you wish to access your Personal Information, please contact us
          in writing.
        </div>
        <div className={classes.paragraph}>
          Gun Marketplace will not charge any fee for your access request but
          may charge an administrative fee for providing a copy of your
          Personal Information.
        </div>
        <div className={classes.paragraph}>
          In order to protect your Personal Information we may require
          identification from you before releasing the requested information.
        </div>


        <div className={classes.subtitle}>
          Maintaining the Quality of your Personal Information
        </div>
        <div className={classes.paragraph}>
          It is an important to us that your Personal Information is up to date.
          We will take reasonable steps to make sure that your Personal
          Information is accurate, complete and up-to-date. If you find that
          the information we have is not up to date or is inaccurate, please
          advise us as soon as practicable so we can update our records and
          ensure we can continue to provide quality services to you.
        </div>


        <div className={classes.subtitle}>
          Policy Updates
        </div>
        <div className={classes.paragraph}>
          This Policy may change from time to time and is available on our website.
        </div>

        <div className={classes.subtitle}>
          Privacy Policy Complaints and Enquiries
        </div>
        <div className={classes.paragraph}>
          If you have any queries or complaints about our Privacy Policy please contact us at:
          <a className={classes.link}
            href={"admin@gunmarketplace.com.au"}
            target={"_blank"}
          >
            admin@gunmarketplace.com.au
          </a>.
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


export default withStyles(styles)( TermsSSR );




