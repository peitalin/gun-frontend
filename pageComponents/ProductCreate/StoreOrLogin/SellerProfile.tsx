import React from "react";
import { oc as option } from "ts-optchain";
import { Colors, Gradients } from "layout/AppTheme";
// Graphql
import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import EditSellerProfile from "pageComponents/SellerProfileDashboard/EditSellerProfile";



const SellerProfile: React.FC<StoreProps> = (props) => {

  const {
    userStore: store,
    avatarBorderStyle,
    classes
  } = props;
  // imgloaded
  const [avatarImgLoaded, setAvatarImgLoaded] = React.useState(false);

  return (
    <ErrorBounds className={clsx(classes.container)}>
      <Typography variant="subtitle1" className={classes.title}>
        Your Seller Profile
      </Typography>
      <div className={classes.flexContainer}>
        <div className={classes.flexRow}>
          <div className={classes.avatarBorder} style={{ ...avatarBorderStyle }}>
            <Avatar
              className={clsx(
                classes.avatar,
                // avatarImgLoaded ? "fadeInFast" : "hidden",
              )}
              src={option(store).profile.original.url()}
              onLoad={() => setAvatarImgLoaded(true)}
            />
          </div>
          <div className={classes.flexCol}>
            <Typography variant="body1" className={classes.name}>
              {store.name}
            </Typography>
            <Typography variant="body1" className={classes.website}>
              {/* {store.website ?? "www.gunmarketplace.com.au"} */}
              {"www.gunmarketplace.com.au"}
            </Typography>
          </div>
        </div>

        <div className={classes.flexEdit}>
          <EditSellerProfile asModal={true} />
        </div>
      </div>
    </ErrorBounds>
  )
}

type StoreProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
  userStore: StorePrivate;
  avatarBorderStyle?: any;
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
  flexItem: {
    flexBasis: '70%',
    paddingRight: '1rem',
  },
  title: {
    marginBottom: '1rem',
  },
  avatar: {
    height: 60,
    width: 60,
    margin: theme.spacing(1),
    border: `4px solid ${Colors.uniswapLightNavy}`,
  },
  avatarBorder: {
    marginBottom: '0.5rem',
    // outer fluro circle
    height: '66px',
    width: '66px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    // background: Gradients.gradientPurple.background,
    background: Gradients.gradientUniswapFluro.background,
  },
  avatarButton: {
    padding: theme.spacing(1),
  },
  editStoreLink: {
    color: "#2484FF",
    textDecoration: "underline",
  },
  link: {
    cursor: 'pointer',
    color: Colors.blue,
  },
  name: {
    marginLeft: '0.5rem',
    fontWeight: 600,
    color: Colors.uniswapLightestGrey,
  },
  website: {
    marginLeft: '0.5rem',
    color: Colors.uniswapLighterGrey,
    fontSize: '0.8rem',
  },
});

export default withStyles(styles)( SellerProfile );
