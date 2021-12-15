import React from "react";
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, Gradients } from "layout/AppTheme";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions} from "reduxStore/grand-reducer";
// Typings
import { UserPrivate, ProductsConnection, PageConfig, PromotedList } from "typings/gqlTypes";
// Components
import PromotionCards from "pageComponents/PromoteListings/PromotionCards";
import BannerPromotionPurchases from "./BannerPromotionPurchases"
import AlignCenterLayout from "components/AlignCenterLayout";
import PromotedSlotPurchaseModal from "./PromotedSlotPurchaseModal";

export const MAX_WIDTH_GRID: number = 1160;
import { featuredSectionParams } from "pageComponents/FrontPage";





const PromoteListings: React.FC<ReactProps> = (props) => {

  const {
    classes,
    pageConfig,
  } = props;

  // const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const user = useSelector<GrandReduxState, UserPrivate>(s => s.reduxLogin.user)

  const [
    currentPromotedSlot,
    setCurrentPromotedSlot
  ] = React.useState(undefined)

  const [ position, setPosition ] = React.useState(0)
  const [ refetch, setRefetch ] = React.useState(undefined)

  console.log("pageConfigs: ", pageConfig)

  return (
    <div className={classes.promoteListingsRoot}>
      <AlignCenterLayout
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={false}
      >

        <BannerPromotionPurchases />

        <PromotedSlotPurchaseModal
          user={user}
          currentPromotedSlot={currentPromotedSlot}
          refetch={refetch}
        />

        {
          (pageConfig?.pageConfigSections ?? [])
          .filter(section => !!section.promotedListId)
          .map(( section, i ) => {
            return (
              <PromotionCards
                key={section?.id}
                title={section?.title}
                promotedListId={section?.promotedListId}
                setCurrentPromotedSlot={setCurrentPromotedSlot}
                setPosition={setPosition}
                setRefetch={setRefetch}
                count={
                  section.viewAllPath === "/featured"
                  ? featuredSectionParams.limit // 3 products for featured list
                  : 4
                }
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
          })
        }

      </AlignCenterLayout>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  pageConfig: PageConfig;
}

const styles = (theme: Theme) => createStyles({
  promoteListingsRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
});


export default withStyles(styles)( PromoteListings );
