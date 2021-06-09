import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Typings
import { ProductsConnection, Calibers, Categories, PageConfig } from "typings/gqlTypes";

// Components
// import NewReleaseProducts from "pageComponents/FrontPage/NewReleaseProducts";
import NewProducts from "pageComponents/FrontPage/NewProducts";
import FeaturedProducts from "pageComponents/FrontPage/FeaturedProducts";
import BannerHome from "pageComponents/FrontPage/BannerHome";
import BannerPromotionsLink from "pageComponents/FrontPage/BannerPromotionsLink";
// import BetaTestingBanner from "components/BetaTestingBanner";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import CategoryCarouselStart from "components/CategoryCarouselStart";
// import SaySomethingSubscriptionTest from "./SaySomethingSubscriptionTest";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";

import AlignCenterLayout from "components/AlignCenterLayout";
export const MAX_WIDTH_GRID: number = 1160;
// show exactly 4 product cards in carousel + 1rem padding on left
// 270px each card (including margin of 16px) = 290


export const featuredSectionParams = {
  limit: 3,
  cardsPerRow: {
    xs: 1.5,
    sm: 1.5,
    md: 2,
    lg: 3,
    xl: 3,
  }
}





const FrontPage: React.FC<ReactProps> = (props) => {

  const {
    classes,
    pageConfig,
    initialFeaturedProducts,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [showBelowFold, setShowBelowFold] = React.useState(false);

  React.useEffect(() => {
    if (process?.browser) {
      setShowBelowFold(true)
    }
    // SSR reydrating issues if process.browser is not used in hook
  }, [])

  // console.log("pageConfig => ", pageConfig)
  let cPadding = 4 // category carousel padding

  let featuredSection = pageConfig?.pageConfigSections.filter(
    s => s.viewAllPath === "/featured"
  )
  let advertisedSection = pageConfig?.pageConfigSections.filter(
    s => s.viewAllPath === "/advertised"
  )
  let newSection = pageConfig?.pageConfigSections.filter(
    s => s.viewAllPath === "/new"
  )

  return (
    <div className={classes.frontPageRoot}>

      <BannerHome
        initialCategories={props.initialCategories}
      />

      <AlignCenterLayout
        className={classes.zIndex2}
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={false}
      >

        <div className={classes.categoryCarouselFrontPageBox}>
          <ShowOnMobileOrDesktopSSR desktop className={classes.width100CenterBox}>
            <CategoryCarouselStart
              title={"Browse by Category"}
              initialCategories={props.initialCategories}
              containerStyle={{ marginTop: '-74px' }}
              style={{
                width: `calc(100% - ${cPadding*2}rem)`,
                marginLeft: `${cPadding}rem`,
                marginRight: `${cPadding}rem`,
              }}
            />
          </ShowOnMobileOrDesktopSSR>
          <ShowOnMobileOrDesktopSSR mobile className={classes.width100CenterBox}>
            <CategoryCarouselStart
              title={"Browse by Category"}
              initialCategories={props.initialCategories}
              containerStyle={{ marginTop: '-48px' }}
              style={{ }}
            />
          </ShowOnMobileOrDesktopSSR>
        </div>

        {
          featuredSection.map(section => {
            // console.log("section: ", section)
            if (section?.promotedListId) {
              return (
                <FeaturedProducts
                  key={section?.id}
                  count={
                    section.viewAllPath === "/featured"
                    ? featuredSectionParams.limit // 3 products for featured list
                    : 4
                  }
                  title={section?.title}
                  promotedListId={section.promotedListId}
                  cardsPerRow={
                    section.viewAllPath === "/featured"
                    ? featuredSectionParams.cardsPerRow // 3 products for featured list
                    : {
                        xs: 1.5,
                        sm: 1.5,
                        md: 2,
                        lg: 3,
                        xl: 4,
                      }
                  }
                />
              )
            }
          })
        }

        {
          newSection.map(section => {
            // console.log("section: ", section)
            if (section?.isNewestList) {
              return (
                <NewProducts
                  key={section?.id}
                  title={section?.title}
                  showSeeMore={true}
                />
              )
            }
          })
        }


        {
          advertisedSection.map(section => {
            // console.log("section: ", section)
            if (section?.promotedListId) {
              return (
                <FeaturedProducts
                  key={section?.id}
                  count={
                    section.viewAllPath === "/featured"
                    ? featuredSectionParams.limit // 3 products for featured list
                    : 4
                  }
                  title={section?.title}
                  promotedListId={section.promotedListId}
                  cardsPerRow={
                    section.viewAllPath === "/featured"
                    ? featuredSectionParams.cardsPerRow // 3 products for featured list
                    : {
                        xs: 1.5,
                        sm: 1.5,
                        md: 2,
                        lg: 3,
                        xl: 4,
                      }
                  }
                />
              )
            }
          })
        }


        <div className={classes.bannerPromotionsContainer}>
          <BannerPromotionsLink
            disableMetaHeader={true}
          />
        </div>

        {
          showBelowFold &&
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
                <NewProducts
                  key={section?.id}
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
  zIndex2: {
    zIndex: 2,
    // so carousel is above search dither popup
  },
  categoryCarouselFrontPageBox: {
    // display: 'flex',
    // flexDirection: "row",
    // justifyContent: 'center',
    // maxWidth: 800,
    marginBottom: '3rem',
  },
  categoryBrands: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  imageBox: {
  },
  marginBox: {
    marginBottom: '2rem',
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
  width100CenterBox: {
    width: '100%',
    // maxWidth: 800,
  },
  bannerPromotionsContainer: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});


export default withStyles(styles)( FrontPage );
