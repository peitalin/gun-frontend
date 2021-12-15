import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// MUI Components
import Typography from "@mui/material/Typography";
// Breadcrumbs
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Colors } from "layout/AppTheme";
// router
import Link from "next/link";




const CategoryBreadcrumbs = (props: ReactProps) => {

  const {
    classes,
    categoryGroup,
    categoryName,
    categorySlug,
    dark = false,
  } = props;

  return (
    <div className={clsx(
      classes.root,
      props.dark ? classes.dark : null,
    )}>
      <Breadcrumbs
        classes={{ separator: classes.separator }}
        separator={"›"}
        arial-label="Breadcrumb"
      >
        <Link href="/categories">
          <a className={classes.link}>Categories</a>
        </Link>
        <Link
          href="/categories/[categorySlug]"
          as={`/categories/${categorySlug}`}
        >
          <a className={classes.link}>{categoryName}</a>
        </Link>
      </Breadcrumbs>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  categoryGroup?: string;
  categoryName: string;
  categorySlug: string;
  dark?: boolean;
}


const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: '1rem',
  },
  dark: {
    background: "#252525",
  },
  link: {
    fontSize: '0.8rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    textDecoration: 'none',
    '&:hover': {
      color: Colors.secondary,
    }
  },
  separator: {
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
  },
});


export default withStyles(styles)( CategoryBreadcrumbs );

