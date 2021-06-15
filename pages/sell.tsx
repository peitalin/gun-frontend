import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Components
import ProductCreatePage from "pageComponents/ProductCreate";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const SellPageSSR: React.FC<ProductCreateProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title="Sell Used Guns - List for Free | Gun Marketplace Australia"
        description={`
          Sell used guns online with free listings.
          Upload and edit unlimited product listings for free.
        `}
        ogDescription={`
          Sell used guns online with free listings.
          Upload and edit unlimited product listings for free.
        `}
      />
      <ProductCreatePage />
    </>
  )
}

type ProductCreateProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1024,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  bannerOuter: {
    position: 'relative',
    width: '100%',
  },
  bannerInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( SellPageSSR );
