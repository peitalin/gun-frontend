import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Components
import ProductClaimPage from "./ProductClaimPage";
import ErrorBounds from 'components/ErrorBounds';
// Typings
import { NewsItem } from "typings/gqlTypes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ProductClaim: React.FC<ReactProps> = (props) => {

  const { classes, newsItem } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <ErrorBounds className={clsx(
      classes.pageRoot,
      mdDown ? classes.paddingMobile : classes.paddingDesktop,
    )}>
      <div className={classes.outerContainer}>
        <div className={classes.flexRowInner}>
          <ProductClaimPage
            externalProduct={newsItem?.externalProduct}
          />
        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
}

const styles = (theme: Theme) => createStyles({
  pageRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '2rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 0.5rem 2rem 0.5rem',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 300,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
  },
  title: {
  },
});


export default withStyles(styles)( ProductClaim );
