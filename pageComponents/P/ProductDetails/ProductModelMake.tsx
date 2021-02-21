import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { Colors } from "layout/AppTheme";




const ProductModelMake = (props: ReactProps) => {

  const { classes, product } = props;

  return (
    <div className={classes.modelMakerRoot}>
      <Typography
        className={classes.title}
        color={"primary"}
        variant="subtitle1"
      >
        {product?.currentSnapshot?.title}
      </Typography>
      {
        product?.currentSnapshot?.actionType &&
        <ModelRow
          classes={classes}
          title={"Action type:"}
          value={product?.currentSnapshot?.actionType}
        />
      }
      {
        product?.currentSnapshot?.ammoType &&
        <ModelRow
          classes={classes}
          title={"Ammo type:"}
          value={product?.currentSnapshot?.ammoType}
        />
      }
      {
        product?.currentSnapshot?.caliber !== undefined &&
        <ModelRow
          classes={classes}
          title={"Caliber:"}
          value={product?.currentSnapshot?.caliber}
        />
      }
      <ModelRow
        classes={classes}
        title={"Condition:"}
        value={product?.currentSnapshot?.condition}
      />
      <ModelRow
        classes={classes}
        title={"Make:"}
        value={product?.currentSnapshot?.make}
      />
      <ModelRow
        classes={classes}
        title={"Model:"}
        value={product?.currentSnapshot?.model}
      />
      <ModelRow
        classes={classes}
        title={"Serial Number:"}
        value={product?.currentSnapshot?.serialNumber}
      />
    </div>
  );
}


const ModelRow = (props: ModelRowProps) => {

  const {
    classes,
    title,
    value,
  } = props;

  return (
    <div className={classes.flexRow}>
      <div className={classes.flexItemShort}>
        <Typography
          className={classes.infoKey}
          color={"primary"}
          variant="body2"
        >
          {title}
        </Typography>
      </div>
      <div className={classes.flexItemWide}>
        <Typography
          className={classes.infoField}
          color={"primary"}
          variant="body2"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}
interface ModelRowProps extends WithStyles<typeof styles> {
  title?: string;
  value?: string;
}

const styles = (theme: Theme) => createStyles({
  modelMakerRoot: {
    marginTop: '1rem',
    padding: '1.5rem 1rem 1rem 1rem',
    border: theme.palette.type === 'dark'
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow3.boxShadow
      : 'unset',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  flexItemShort: {
    display: 'flex',
    flexBasis: '33%',
  },
  flexItemWide: {
    display: 'flex',
    flexBasis: '66%',
  },
  avatar: {
    height: 30,
    width: 30,
    fontSize: '0.8rem',
    marginRight: '0.5rem',
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23aaaaaa' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundColor: `${theme.colors.uniswapGrey}`,
    color: `${theme.palette.primary.light}`,
    border: `1px solid ${theme.colors.uniswapLighterGrey}`,
    transition: theme.transitions.create(['border','color'], {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      color: `${theme.palette.secondary.light}`,
      textDecoration: 'none',
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  title: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  infoKey: {
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
  },
  infoField: {
    fontWeight: 400,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
});

export default withStyles(styles)( ProductModelMake );


