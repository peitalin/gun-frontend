import React from "react";
import { Categories } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import CategoryCarouselStart from "components/CategoryCarouselStart";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const CategoriesWall: React.FC<ReactProps> = (props) => {

  const {
    classes,
    categories,
  } = props;

  let cPadding = 4 // category carousel padding

  return (
    <div className={classes.categoryCarouselFrontPageBox}>
      <ShowOnMobileOrDesktopSSR desktop className={classes.width100CenterBox}>
        <CategoryCarouselStart
          title={"Browse by Category"}
          initialCategories={props.categories}
          containerStyle={{ marginTop: '4rem' }}
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
          initialCategories={props.categories}
          containerStyle={{ marginTop: '-48px' }}
          style={{ }}
        />
      </ShowOnMobileOrDesktopSSR>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  categories: Categories[];
}

const styles = (theme: Theme) => createStyles({
  categoryCarouselFrontPageBox: {
    width: '100%',
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
  width100CenterBox: {
    width: '100%',
    // maxWidth: 800,
  },
});

export default withStyles(styles)( CategoriesWall );
