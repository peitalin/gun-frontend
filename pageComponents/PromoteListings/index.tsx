import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Typings
import { ProductsConnection, PageConfig, PromotedList } from "typings/gqlTypes";
// Components
import PromotionCards from "pageComponents/PromoteListings/PromotionCards";
import BannerPromotionPurchases from "./BannerPromotionPurchases"
import AlignCenterLayout from "components/AlignCenterLayout";
import PromotedSlotPurchaseModal from "./PromotedSlotPurchaseModal";

export const MAX_WIDTH_GRID: number = 1160;



const PromoteListings: React.FC<ReactProps> = (props) => {

  const {
    classes,
    pageConfig,
  } = props;

  // const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [
    currentPromotedSlot,
    setCurrentPromotedSlot
  ] = React.useState(undefined)

  const [ position, setPosition ] = React.useState(0)
  const [ refetch, setRefetch ] = React.useState(undefined)
  // console.log("pageConfig => ", pageConfig)

  return (
    <div className={classes.promoteListingsRoot}>
      <AlignCenterLayout
        maxWidth={MAX_WIDTH_GRID || 1160}
        withRecommendations={false}
      >

        <BannerPromotionPurchases />

        <PromotedSlotPurchaseModal
          asModal={true}
          currentPromotedSlot={currentPromotedSlot}
          position={position}
          refetch={refetch}
        />

        {
          (pageConfig?.pageConfigSections ?? [])
          .filter(section => !section.isNewestList)
          .map(( section, i ) => {

            if (section?.promotedListId) {
              return (
                <PromotionCards
                  key={section?.id}
                  title={section?.title}
                  promotedListId={section?.promotedListId}
                  setCurrentPromotedSlot={setCurrentPromotedSlot}
                  setPosition={setPosition}
                  setRefetch={setRefetch}
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
