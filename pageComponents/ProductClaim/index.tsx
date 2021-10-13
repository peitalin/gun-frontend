import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Typings
import { NewsItem } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Components
import ErrorBounds from 'components/ErrorBounds';
// components
import NewsItemCard from "pageComponents/Trending/TrendingFeed/NewsItemCard";
import ProductClaimPage from "./ProductClaimPage"
import AlignCenterLayout from "components/AlignCenterLayout"



const ProductClaim: React.FC<ReactProps> = (props) => {

  const {
    classes,
    claimId,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  // image gallery index
  const [index, setIndex] = React.useState(0);
  // for login menu tab
  const [tabIndex, setTabIndex] = React.useState(1);


  return (
    <AlignCenterLayout
      maxWidth={900}
      withRecommendations={false}
    >
      <div className={clsx(
        classes.pageRoot,
        mdDown ? classes.paddingMobile : classes.paddingDesktop,
      )}>
        <div className={classes.productColumn60}>
          <ProductClaimPage
            claimId={claimId}
            externalProduct={newsItem?.externalProduct}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
          />
        </div>
        <div className={classes.productColumn40}>
          {
            newsItem &&
            <NewsItemCard
              user={undefined}
              newsItem={newsItem}
              className={classes.paddingTop1}
              index={index}
              setIndex={setIndex}
            />
          }
        </div>
      </div>
    </AlignCenterLayout>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  claimId: string
}

const styles = (theme: Theme) => createStyles({
  pageRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  paddingDesktop: {
    padding: '1rem',
  },
  paddingMobile: {
    padding: '1rem 0.5rem 1rem 0.5rem',
  },
  productColumn60: {
    flexBasis: '55%',
    flexGrow: 1,
    minWidth: 300,
    // width: '100%',
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
    // width: '100%',
    paddingTop: '2rem',
  },
  paddingTop1: {
    paddingTop: '1rem',
  },
});


export default withStyles(styles)( ProductClaim );
