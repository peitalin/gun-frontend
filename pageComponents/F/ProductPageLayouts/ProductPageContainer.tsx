import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Product } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import CategoryBreadcrumbs from "./CategoryBreadcrumbs";
// Next
import Hidden from "components/HiddenFix";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { Gradients, isThemeDark } from "layout/AppTheme";


const ProductPageContainer: React.FC<ProductContainerProps> = (props) => {

  const {
    classes,
    product,
  } = props;

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexCol,
    )}>

      <MetaHeadersPage
        title={`${product?.currentSnapshot?.title} - ${product?.store?.name} | Gun Marketplace Australia`}
        description={
          product?.currentSnapshot?.title
            ? `${product?.currentSnapshot?.title} — ${product?.currentSnapshot?.description}`
            : `${product?.currentSnapshot?.description}`
        }
        keyword={product?.currentSnapshot?.title}
      />

      <div className={clsx(classes.flexCol, classes.alignItemsCenter)}>
        {/* <Hidden
          className={classes.maxWidth1024}
          only={['xs']}
          implementation="css"
        >
          <div className={clsx(classes.breadCrumbRoutes)}>
            <CategoryBreadcrumbs
              categoryGroup={product?.category?.categoryGroup}
              categoryName={product?.category?.name}
              categorySlug={product?.category?.name}
            />
          </div>
        </Hidden> */}

        <div className={clsx(
          classes.flexRow,
          classes.width100,
          classes.greyBackground,
          classes.paddingBottom1,
          // classes.maxWidth1024,
        )}>
          {props.children}
        </div>
      </div>

    </ErrorBounds>
  )
}




interface ProductContainerProps extends WithStyles<typeof styles> {
  product: Product;
  loading: boolean;
}


const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  greyBackground: {
    background: isThemeDark(theme)
      ? Gradients.gradientFeaturedDark.background
      : Gradients.gradientFeaturedLight.background,
  },
  maxWidth1024: {
    maxWidth: 'calc(1024px + 1rem)',
    // + 1rem, because 1rem padding
    width: '100%',
  },
  width100: {
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  paddingBottom1: {
    paddingBottom: '1rem',
  },
  breadCrumbRoutes: {
    width: '100%',
    margin: '0.5rem 0rem 0rem 0rem',
  },
});


export default withStyles(styles)( ProductPageContainer );
