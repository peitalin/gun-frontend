import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// components
import AlignCenterLayout from "components/AlignCenterLayout";
import Tooltip from "@material-ui/core/Tooltip";
import copy from "clipboard-copy";
import { useSnackbar } from "notistack";
import { Colors } from 'layout/AppTheme';
import { commonStyles } from "./commonStyles";


const FirearmRegistriesSSR: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const snackbar = useSnackbar()

  const copyAndSendSnackbarMsg = React.useCallback((email: string) => {
    copy(email)
    snackbar.enqueueSnackbar(`Copied "${email}"`, { variant: "info" })
  }, [])

  return (
    <AlignCenterLayout
      withRecommendations={false}
      maxWidth={720}
    >
      <div className={classes.root}>
        <div className={classes.title}>
          FIREARM REGISTRIES
        </div>

        <div className={classes.paragraph}>
          <FirearmRegistry classes={classes}
            registry={registries.act}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.nsw}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.nt}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.qld}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.sa}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.tas}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.vic}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
          <FirearmRegistry classes={classes}
            registry={registries.wa}
            copyAndSendSnackbarMsg={copyAndSendSnackbarMsg}
          />
        </div>

      </div>
    </AlignCenterLayout>
  );
}

const FirearmRegistry = (props: RegistryProps) => {

  const { classes, registry, copyAndSendSnackbarMsg } = props;

  return (
    <div className={classes.registryContainer}>
      <div className={classes.registryTitle}>
        {registry.title}
      </div>
      <div className={classes.flexRow}>
        <div className={clsx(classes.flexCol)}>
          <div className={classes.subtitle}>
            email:
          </div>
          <div className={classes.subtitle}>
            phone:
          </div>
          <div className={classes.subtitle}>
            fax:
          </div>
          <div className={classes.subtitle}>
            website:
          </div>
        </div>
        <div className={clsx(classes.flexCol, classes.flexItem)}>
          <div className={classes.subtitle}>
            <Tooltip title={"copy email"}>
              <a
                className={classes.link}
                href={`mailto: ${registry.email}`}
                onClick={() => copyAndSendSnackbarMsg(registry.email)}
              >
                {registry.email}
              </a>
            </Tooltip>
          </div>
          <div className={classes.subtitle}>
            {registry.phone}
          </div>
          <div className={classes.subtitle}>
            {registry.fax}
          </div>
          <div className={classes.subtitle}>
            <a
              className={classes.link}
              href={registry.website}
              target={"_blank"}
            >
              {registry.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const registries: RegistryList = {
  act: {
    title: "ACT Firearms Registry",
    website: "https://www.police.act.gov.au/safety-and-security/firearms",
    email: "actfirearmsregistry@afp.gov.au",
    phone: "02 6133 2122	",
    fax: "02 6133 2188",
  },
  nsw: {
    title: "NSW Police Firearms Registry",
    website: "https://www.police.nsw.gov.au/online_services/firearms",
    email: "firearmsenq@police.nsw.gov.au",
    phone: "1300 362 562",
    fax: "02 6670 8558",
  },
  nt: {
    title: "NT Firearms Policy & Records Unit",
    website: "https://pfes.nt.gov.au/police/firearmsweapons",
    email: "firearmsregistry@pfes.nt.gov.au",
    phone: "08 8922 3543",
    fax: "08 8922 3540",
  },
  qld: {
    title: "Qld Weapons Licensing Branch",
    website: "https://www.police.qld.gov.au/units/weapons-licensing",
    email: "weaponslicensing@police.qld.gov.au",
    phone: "07 3015 7777",
    fax: "07 3015 7788",
  },
  sa: {
    title: "SA Firearms Branch",
    website: "https://www.police.sa.gov.au/services-and-events/firearms-and-weapons",
    email: "sapol.firearmsbranch@police.sa.gov.au",
    phone: "08 7322 3346",
    fax: "08 7322 4182",
  },
  tas: {
    title: "Tas Police Firearms Services",
    website: "https://fas.police.tas.gov.au/",
    email: "firearms.services@police.tas.gov.au",
    phone: "03 6173 2720",
    fax: "03 6230 2765",
  },
  vic: {
    title: "Vic Licensing & Regulation Division",
    website: "https://www.police.vic.gov.au/firearms-licensing",
    email: "lrd@police.vic.gov.au",
    phone: "1300 651 645",
    fax: "03 9247 6485",
  },
  wa: {
    title: "WA Police Licensing Services",
    website: "https://www.police.wa.gov.au/About-Us/Our-Agency/Police-Licensing-Services/Firearms",
    email: "licensingservicesfirearms@police.wa.gov.au",
    phone: "1300 171 011",
    fax: "08 9454 1522",
  },
}

interface ReactProps extends WithStyles<typeof styles> {
}

interface FirearmRegistry {
  title: string;
  website: string;
  email: string;
  phone: string;
  fax: string;
}
interface RegistryList {
  act: FirearmRegistry
  nsw: FirearmRegistry
  nt: FirearmRegistry
  qld: FirearmRegistry
  sa: FirearmRegistry
  tas: FirearmRegistry
  vic: FirearmRegistry
  wa: FirearmRegistry
}

interface RegistryProps extends WithStyles<typeof styles> {
  registry: FirearmRegistry
  copyAndSendSnackbarMsg(email: string): void;
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
  registryContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  registryTitle: {
    fontWeight: 600,
    marginTop: '0.1rem',
    marginBottom: '0.1rem',
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
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minWidth: 100,
  },
  flexItem: {
    flexGrow: 1,
  },
  link: {
    ...commonStyles.link,
  },
});


export default withStyles(styles)( FirearmRegistriesSSR );




