import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Typings
import { ProductsConnection, ConnectionQuery, Categories, PageConfig } from "typings/gqlTypes";

// Components
import NewReleaseProducts from "pageComponents/FrontPage/NewReleaseProducts";
import FeaturedProducts from "pageComponents/FrontPage/FeaturedProducts";
import CategoryProducts from "pageComponents/FrontPage/CategoryProducts";
import BannerHome from "pageComponents/FrontPage/BannerHome";
import BannerPromotionsLink from "pageComponents/FrontPage/BannerPromotionsLink";

// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import CategoryCarouselStart from "components/CategoryCarouselStart";
// import SaySomethingSubscriptionTest from "./SaySomethingSubscriptionTest";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290



const FrontPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
    pageConfig,
    initialFeaturedProducts,
  } = props;

  const aClient = useApolloClient();

  // const theme = useTheme();
  // const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  // console.log("pageConfig => ", pageConfig)

  return (
    <div className={classes.frontPageRoot}>

      <BannerHome />

      <AlignCenterLayout
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={false}
      >

        <div className={classes.categoryCarouselFrontPageBox}>
          <CategoryCarouselStart
            title={"Explore Categories"}
            categories={props.initialCategories}
          />
        </div>

        {
          pageConfig?.pageConfigSections?.slice(0,2)?.map(section => {

            if (section?.promotedListId) {
              return (
                <FeaturedProducts
                  key={section?.id}
                  title={section?.title}
                  promotedListId={section.promotedListId}
                  cardsPerRow={{
                    xs: 1.5,
                    sm: 1.5,
                    md: 2,
                    lg: 3,
                    xl: 4,
                  }}
                />
              )
            }

            if (section?.isNewestList) {
              return (
                <NewReleaseProducts
                  key={section?.id}
                  initialProducts={undefined}
                  title={section?.title}
                />
              )
            }
          })
        }

        <div className={classes.bannerPromotionsPadding}>
          <BannerPromotionsLink
            disableMetaHeader={true}
          />
        </div>

        {
          pageConfig?.pageConfigSections?.slice(2)?.map(section => {

            if (section?.promotedListId) {
              return (
                <FeaturedProducts
                  key={section?.id}
                  title={section?.title}
                  promotedListId={section.promotedListId}
                  cardsPerRow={{
                    xs: 1.5,
                    sm: 1.5,
                    md: 2,
                    lg: 3,
                    xl: 4,
                  }}
                />
              )
            }

            if (section?.isNewestList) {
              return (
                <NewReleaseProducts
                  key={section?.id}
                  initialProducts={undefined}
                  title={section?.title}
                />
              )
            }
          })
        }
      </AlignCenterLayout>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  pageConfig: PageConfig;
  initialCategories: Categories[];
  initialFeaturedProducts?: ProductsConnection;
}


const styles = (theme: Theme) => createStyles({
  frontPageRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
  categoryCarouselFrontPageBox: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
  },
  bannerPromotionsPadding: {
    marginTop: "1rem",
    padding: '0rem 1rem',
  },
});


export default withStyles(styles)( FrontPage );
