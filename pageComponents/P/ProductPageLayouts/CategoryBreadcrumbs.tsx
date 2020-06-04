import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// MUI Components
import Typography from "@material-ui/core/Typography";
// Breadcrumbs
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Colors } from "layout/AppTheme";
// router
import Link from "next/link";




const CategoryBreadcrumbs = (props: ReactProps) => {

  const {
    classes,
    categoryGroup,
    categoryName,
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
          href="/categories/[categoryIdOrName]"
          as={`/categories/${categoryName}`}
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
    color: '#b4b4b4',
    textDecoration: 'none',
    '&:hover': {
      color: Colors.secondary,
    }
  },
  separator: {
    color: "#aaaaaa",
  },
});


export default withStyles(styles)( CategoryBreadcrumbs );

