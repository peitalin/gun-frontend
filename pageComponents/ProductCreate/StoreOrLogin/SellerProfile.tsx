import React from "react";
import { Colors, Gradients } from "layout/AppTheme";
// Graphql
import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import clsx from "clsx";
// Material UI
import Typography from "@mui/material/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import EditSellerProfile from "pageComponents/SellerDashboard/EditSellerProfile";



const SellerProfile: React.FC<StoreProps> = (props) => {

  const {
    user,
    classes
  } = props;

  return (
    <ErrorBounds className={clsx(classes.container)}>
      <div className={classes.flexContainer}>
        <div className={classes.flexRow}>
          <div className={classes.flexCol}>
            <Typography variant="body1" className={classes.name}>
              {"Private Seller"}
            </Typography>
            <Typography variant="body1" className={classes.licenseInfo}>
              {user?.defaultLicense?.licenseNumber}
            </Typography>
            <Typography variant="body1" className={classes.licenseInfo}>
              {user?.defaultLicense?.licenseState}
            </Typography>
          </div>
        </div>

        {/* <div className={classes.flexEdit}>
          <EditSellerProfile asModal={true} />
        </div> */}
      </div>
    </ErrorBounds>
  )
}

type StoreProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
}


const styles = (theme: Theme) => createStyles({
  container: {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: '95%',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  flexEdit: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  name: {
    marginLeft: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? theme.colors.uniswapLightestGrey
      : Colors.black,
  },
  licenseInfo: {
    marginLeft: '0.5rem',
    color: theme.colors.uniswapLighterGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
  },
});

export default withStyles(styles)( SellerProfile );
