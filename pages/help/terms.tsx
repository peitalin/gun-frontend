import React from 'react';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import AlignCenterLayout from "components/AlignCenterLayout";
import { commonStyles } from "./commonStyles";


const PrivacySSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          TERMS OF SERVICE
        </div>

        <div className={classes.paragraph}>
          PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE
          USING THIS WEBSITE.
        </div>

        <div className={classes.paragraph}>
          Welcome to Gun Marketplace. If you continue to browse and use this
          website you are agreeing to comply with and be bound by the following
          terms and conditions of use, which together with our privacy policy
          and website disclaimer, govern gunmarketplace.com.au’s relationship
          with you in relation to your use of this website.
        </div>

        <div className={classes.paragraph}>
          By using this website, you signify your acceptance of these terms
          and conditions of use. For the purposes of these terms and conditions,
          “Us”, “Our” and “We” refers to gunmarketplace.com.au and “You” and
          “Your” refers to you, the client, visitor, website user or person
          using our website.
        </div>

        <div className={classes.paragraph}>
          <ul>
            <li>
              No multi sales per listing - One listing, one sale.
            </li>
            <li>
              No break up listings - One listing, one sale.
            </li>
            <li>
              No false listings - all listings to be legitimate.
            </li>
            <li>
              No fake accounts - all account details to be legitimate.
            </li>
            <li>
              All items to be legal.
            </li>
            <li>
              No stolen items - all listings to be made by the owner.
            </li>
            <li>
              It is the Sellers / Buyers responsibility to adhere to the relevant legislation and laws pertaining to the sale, purchase and shipping of firearms, and associated / related items in the respective states.
            </li>
            <li>
              It is the Sellers responsibility to monitor their listings and remove items that are sold not on our website or not available.
            </li>
          </ul>
        </div>

        <div className={classes.subtitle}>
          AMENDMENT OF TERMS
        </div>
        <div className={classes.paragraph}>
          We reserve the right to change, modify, add or remove portions of
          these terms at any time. Please check these terms regularly prior
          to using our website to ensure you are aware of any changes. We will
          endeavour to highlight any significant or substantive changes to you
          where possible. If you choose to use our website then we will regard
          that use as conclusive evidence of your agreement and acceptance that
          these terms govern your and gunmarketplace.com.au’s rights and
          obligations to each other.
        </div>

        <div className={classes.subtitle}>
          LIMITATION OF LIABILITY
        </div>
        <div className={classes.paragraph}>
          It is an essential pre-condition to you using our website that you
          agree and accept that gunmarketplace.com.au is not legally responsible
          for any loss or damage you might suffer related to your use of the
          website, whether from errors or from omissions in our documents or
          information, any goods or services we may offer or from any other use
          of the website. This includes your use or reliance on any third party
          content, links, comments or advertisements. Your use of, or reliance on,
          any information or materials on this website is entirely at your own
          risk, for which we shall not be liable.
        </div>
        <div className={classes.paragraph}>
          It shall be your own responsibility to ensure that any products,
          services or information available through this website meet your
          specific, personal requirements. You acknowledge that such information
          and materials may contain inaccuracies or errors and we expressly
          exclude liability for any such inaccuracies or errors to the fullest
          extent permitted by law.
        </div>

        <div className={classes.subtitle}>
          COMPETITION AND CONSUMER ACT
        </div>
        <div className={classes.paragraph}>
          For the purposes of Schedule 2 of the Australian Consumer Law, in
          particular Sections 51 to 53, 64 and 64A of Part 3-2, Division 1,
          Subdivision A of the Competition and Consumer Act 2010 (Cth),
          gunmarketplace.com.au’s liability for any breach of a term of this
          agreement is limited to: the supplying of the goods or services to
          you again; the replacement of the goods; or the payment of the cost
          of having the goods or services supplied to you again.
        </div>
        <div className={classes.paragraph}>
          You must be over 18 years of age to use this website and to purchase
          any goods or services.
        </div>

        <div className={classes.subtitle}>
          DISPOSAL OF GOODS
        </div>
        <div className={classes.paragraph}>
          Disposal of goods are to be processed promptly by the Seller upon the
          notification of a Buyer’s confirmed payment. Disposals are to take no
          longer than 3 days, unless specified otherwise. Damaged orders should
          be resolved with the courier company or with the owner directly and we
          are not responsible for goods that are damaged, damaged in transit or
          not received.
        </div>

        <div className={classes.subtitle}>
          RETURNS AND REFUNDS
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au processes refunds in accordance with the Australian Consumer Protection legislation.
        </div>



        <div className={classes.subtitle}>
          LINKS TO OTHER WEBSITES
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au may from time to time provide on its website,
          links to other websites, advertisements and information on those
          websites for your convenience. This does not necessarily imply
          sponsorship, endorsement, or approval or arrangement between
          gunmarketplace.com.au and the owners of those websites.
          gunmarketplace.com.au takes no responsibility for any of the content
          found on the linked websites.
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au’s website may contain information or
          advertisements provided by third parties for which
          gunmarketplace.com.au accepts no responsibility whatsoever for any
          information or advice provided to you directly by third parties.
          We are making a ‘recommendation’ only and are not providing any advice
          nor do we take any responsibility for any advice received in this regard.
        </div>


        <div className={classes.subtitle}>
          DISCLAIMER
        </div>
        <div className={classes.paragraph}>
          To the fullest extent permitted by law, gunmarketplace.com.au
          absolutely disclaims all warranties, expressed or implied, including,
          but not limited to, implied warranties of merchantability and fitness
          for any particular purpose. gunmarketplace.com.au gives no warranty
          that the documents, goods or services will be free of errors, or that
          defects will be corrected, or that our website or its server is free
          of viruses or any other harmful components.
        </div>
        <div className={classes.paragraph}>
          Whilst we, at all times endeavour to have the most accurate, reliable
          and up-to-date information on our website, we do not warrant or make
          any representations regarding the use or the result of the use of any
          document, product, service, link or information in its website or as
          to their correctness, suitability, accuracy, reliability, or otherwise.
        </div>
        <div className={classes.paragraph}>
          It is your sole responsibility and not the responsibility of
          gunmarketplace.com.au to bear any and all costs of servicing, repairs,
          or correction. The applicable law in your state or territory may not
          permit these exclusions, particularly the exclusions of some implied
          warranties. Some of the above may not apply to you but you must ensure
          you are aware of any risk you may be taking by using this website or
          any products or services that may be offered through it. It is your
          responsibility to do so.
        </div>


        <div className={classes.subtitle}>
          YOUR PRIVACY
        </div>
        <div className={classes.paragraph}>
          At gunmarketplace.com.au, we are committed to protecting your privacy.
          We use the information we collect about you to maximize the services
          that we provide to you. gunmarketplace.com.au respects the privacy and
          confidentiality of the information provided by you and adheres to the
          Australian Privacy Principles. Please read our separate Privacy Policy
          carefully.
        </div>
        <div className={classes.paragraph}>
          You may change your details at any time by advising us in writing via
          email. All information we receive from our customers, is protected by
          our secure servers. gunmarketplace.com.au’s secure server software
          encrypts all customer information before it is sent to us. Furthermore,
          all of the customer data gunmarketplace.com.au collects is secured
          against unauthorized use or access. Credit card information is not
          stored by us on our servers. We do however store payout information
          for our clients on our servers.
        </div>

        <div className={classes.subtitle}>
          THIRD PARTIES
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au does not and will not sell or deal in personal or
          customer information. We may however use in a general sense without any
          reference to your name, your information to create marketing statistics,
          identify user demands and to assist it in meeting customer needs
          generally. In addition, we may use the information that you provide
          to improve its website and its services but not for any other use.
          For some services and products, gunmarketplace.com.au may also collect
          your personal information to enable verification of your identity,
          including information from your firearm licenses.
        </div>

        <div className={classes.subtitle}>
         PERSONAL INFORMATION DISCLOSURES
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au may be required, in certain circumstances,
          to disclose information in good faith and where gunmarketplace.com.au
          is required to do so in the following circumstances: by law or by
          any court; to enforce the terms of any of our customer agreements;
          or to protect the rights, property or safety of our customers or
          third parties.
        </div>

        <div className={classes.subtitle}>
          EXCLUSION OF COMPETITORS
        </div>
        <div className={classes.paragraph}>
          If you are in the business of creating similar documents, goods or
          services for the purpose of providing them for a fee to users,
          whether they be business users or domestic users, then you are a
          competitor of gunmarketplace.com.au. gunmarketplace.com.au expressly
          excludes and does not permit you to use or access our website,
          to download any documents or information from its website or obtain
          any such documents or information through a third party. If you
          breach this term then gunmarketplace.com.au will hold you fully
          responsible for any loss that we may sustain and further hold you
          accountable for all profits that you might make from such unpermitted
          and improper use. gunmarketplace.com.au reserves the right to exclude
          and deny any person access to our website, services or information
          in our sole discretion.
        </div>

        <div className={classes.subtitle}>
          COPYRIGHT, TRADEMARK AND RESTRICTIONS OF USE
        </div>
        <div className={classes.paragraph}>
          This website contains material which is owned by or licensed to us.
          This material includes, but is not limited to, the design, layout,
          look, appearance, trademarks and graphics. You are not permitted to
          reproduce the documents, information or materials on the website for
          the purposes of sale or the use by any third party. In particular
          you are not permitted to republish, upload, transmit electronically
          or otherwise or distribute any of the materials, documents or products
          that may be available for download from time to time on this website.
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au expressly reserves all copyright and trademark
          in all documents, information and materials on our website and we
          reserve the right to take action against you if you breach any of
          these terms.
        </div>
        <div className={classes.paragraph}>
          Any redistribution or reproduction of part or all of the contents in
          any form is prohibited other than the following: you may print or
          download to a local hard disk extracts for your personal and
          non-commercial use only; and you may copy the content to
          individual third parties for their personal use, but only if you
          acknowledge the website as the source of the material.
        </div>
        <div className={classes.paragraph}>
          You may not, except with our express written permission,
          distribute or commercially exploit the content. Nor may you
          transmit it or store it in any other website or other form of
          electronic retrieval system.
        </div>

        <div className={classes.subtitle}>
          WHOLE AGREEMENT
        </div>
        <div className={classes.paragraph}>
          These terms and conditions represent the whole agreement between
          you and gunmarketplace.com.au concerning your use and access to
          gunmarketplace.com.au’s website and your use and access to the
          documents and information on it. No other term is to be included in
          this agreement except where it is required to be included by any
          legislation of the Commonwealth or any State or Territory.
          All implied terms except those implied by statute and which cannot
          be expressly excluded are hereby expressly excluded.
        </div>

        <div className={classes.subtitle}>
          EXCLUSION OF UNENFORCEABLE TERMS
        </div>
        <div className={classes.paragraph}>
          Where any clause or term above would by any applicable statute be
          illegal, void, or unenforceable in any State or Territory then such a
          clause shall not apply in that State or Territory and shall be deemed
          never to have been included in these terms and conditions in that State
          or Territory. Such a clause if legal and enforceable in any other State
          or Territory shall continue to be fully enforceable and part of this
          agreement in those other States and Territories. The deemed exclusion
          of any term pursuant to this paragraph shall not affect or modify the
          full enforceability and construction of the other clauses of these
          terms and conditions.
        </div>


        <div className={classes.subtitle}>
          CLASSIFIEDS – ADVERTISERS
        </div>
        <div className={classes.paragraph}>
          By providing content or posting directly on gunmarketplace.com.au,
          you represent that you have the right to and title in this information
          and content, you own it and have the right to present and publish it.
          You also represent that you are not breaching any regulations,
          restrictions or third party rights.
        </div>
        <div className={classes.paragraph}>
          If we have reasonable grounds to suspect the information you provide
          in any profile or on our site is untrue, inaccurate or incomplete, or
          that you have breached any terms and conditions on gunmarketplace.com.au,
          or for any other reason including if, in our opinion, you have breached
          the purpose of our website, at our sole discretion we have the right to
          immediately withdraw the content and terminate your account. We may also
          deny the use of our website to you in the future and are not obligated to
          return any monies.
        </div>
        <div className={classes.paragraph}>
          You agree to defend, indemnify and hold gunmarketplace.com.au, its officers,
          directors, members and agents harmless from and against any and all claims,
          charges, actions, liabilities, investigations, demands and similar, including
          but not limited to any costs, losses, damages whether direct, indirect,
          consequential or special and all legal fees resulting from your breach of
          our terms and conditions, content you may provide to our website, and any
          activity you may engage in through our website or use of our website.
        </div>

        <div className={classes.subtitle}>
          CLASSIFIEDS – ADVERTISERS
        </div>
        <div className={classes.paragraph}>
          By using our website, you acknowledge that our advertisers are third
          party advertisers and we do not have any connection with them. We do
          not recommend, endorse or promote them, nor do they have any affiliation
          with gunmarketplace.com.au. gunmarketplace.com.au is merely a passive
          conduit as provider for the advertising service and escrow payment
          services. We do not have any association beyond this.
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au does not make any representation as to the accuracy
          or suitability of any of the information contained in those advertisements
          or sites and does not accept any responsibility or liability for the
          conduct or content of those advertisements and sites and the offerings
          made by these third parties. Whilst we take reasonable care to monitor
          our website, we do not undertake any liability or obligation with regard
          to their content and you therefore use those websites and services at
          your own risk.
        </div>
        <div className={classes.paragraph}>
          gunmarketplace.com.au is not responsible for any loss, damage or issues
          you may have with the advertiser and cannot be held responsible for any
          direct or indirect loss you may suffer as a result of using their
          products or services. We also cannot confirm that the information on
          any of the third party advertising sites is accurate or up-to-date.
        </div>

        <div className={classes.subtitle}>
          JURISDICTION
        </div>
        <div className={classes.paragraph}>
          This agreement and this website are subject to the laws of QLD and
          Australia. If there is a dispute between you and gunmarketplace.com.au
          that results in litigation then you must submit to the jurisdiction
          of the courts of QLD.
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


export default withStyles(styles)( PrivacySSR );




