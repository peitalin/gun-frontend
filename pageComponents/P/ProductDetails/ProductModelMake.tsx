import React from "react";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows } from "layout/AppTheme";
import { commonBorderStyle } from "../common";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { Colors } from "layout/AppTheme";




const ProductModelMake = (props: ReactProps) => {

  const { classes, product } = props;

  //// Order
  // Serial Number:
  // Make
  // Model
  // Condition
  // Action type
  // Calibre
  // Magazine Capacity
  // Barrel Length

  const roundToTwoDigits = (s: string) => {
    return parseFloat(s).toFixed(2)
  }

  let barrelLength = product?.currentSnapshot?.barrelLength.includes('mm')
    ? product?.currentSnapshot?.barrelLength
    : `${roundToTwoDigits(product?.currentSnapshot?.barrelLength)} mm`

  return (
    <div className={clsx(
      classes.modelMakerRoot,
      process.browser && classes.modelMakerBorder,
    )}>
      {
        process.browser &&
        <>
          <ModelRow
            classes={classes}
            title={"Serial Number:"}
            value={product?.currentSnapshot?.serialNumber}
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
            title={"Condition:"}
            value={product?.currentSnapshot?.condition}
          />
          {
            product?.currentSnapshot?.actionType &&
            <ModelRow
              classes={classes}
              title={"Action type:"}
              value={product?.currentSnapshot?.actionType}
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
          {
            product?.currentSnapshot?.magazineCapacity &&
            <ModelRow
              classes={classes}
              title={"Magazine Capacity:"}
              value={product?.currentSnapshot?.magazineCapacity}
            />
          }
          {
            product?.currentSnapshot?.barrelLength &&
            <ModelRow
              classes={classes}
              title={"Barrel Length:"}
              value={barrelLength}
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
        </>
      }
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
    minHeight: 190, // for SSR
    padding: '1.5rem 1rem 1rem 1rem',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  modelMakerBorder: commonBorderStyle(theme),
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


