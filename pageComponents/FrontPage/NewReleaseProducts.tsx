import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsiveCarousel";
import PreviewCardLoading from "./PreviewCardLoading";
import LoadingCards from "./LoadingCards";
import Loading from "components/Loading";
// Graphql Typings
import { ProductsConnection, Order_By, ConnectionOffsetQuery } from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "queries/gun-queries";
// Select Component
// import DropdownInput from "components/Fields/DropdownInput";
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: (props) => <Loading/>,
  ssr: false,
});
// MUI
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useDebouncedCallback } from 'use-debounce';
const throttle = require('lodash.throttle');


const NewReleaseProducts = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    count = 24,
    title = "New Releases"
  } = props;

  const orderByOptions = [
    { label: "Newest", value: { createdAt: Order_By.DESC }},
    { label: "Oldest", value: { createdAt: Order_By.ASC }},
    { label: "Highest Price", value: { price: Order_By.DESC }},
    { label: "Lowest Price", value: { price: Order_By.ASC }},
  ];

  const [loadCarouselPics, setLoadCarouselPics] = React.useState({});
  const [orderBy, setOrderBy] = React.useState(orderByOptions[0]);
  const [expand, setExpand] = React.useState(false);
  const [searchTermUi, setSearchTermUi] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Debounce Redux State changes to limit lag
  const [debounceUpdateSearchTerm] = useDebouncedCallback((name: string) => {
    setSearchTerm(searchTermUi)
  }, 100);

  const inputRefEl = React.useRef(null);

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const smDown = useMediaQuery(theme.breakpoints.only("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.only("xs"))

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_ALL_PRODUCTS, {
    variables: {
      searchTerm: searchTerm,
      query: {
        limit: 12 || count,
        offset: 0,
        orderBy: orderBy.value,
        // orderBy: {
        //   // price: OrderBy.ASC,
        //   // price: OrderBy.DESC
        //   // createdAt: OrderBy.ASC,
        //   // createdAt: OrderBy.DESC,
        // }
      }
    },
    ssr: true,
  })


  let products = option(data).productsAllConnection()

  return (
    <main className={classes.root}>


      <div className={clsx(classes.flexRow, classes.maxWidth100vw)}>
        <Typography variant="h3"
          className={clsx(classes.title)}
          gutterBottom
        >
          {title}
        </Typography>
      </div>

      <div className={clsx(classes.flexRowFlexEnd, classes.maxWidth100vw)}>
        <Typography variant="subtitle1"
          className={classes.subtitle}
          gutterBottom
        >
          Search:
        </Typography>
        <div className={clsx(classes.searchbar)}>
            <InputBase
              value={searchTermUi}
              placeholder="Search for products…"
              inputRef={inputRefEl}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onBlur={
                () => setTimeout(() => {
                  // setExpand(false)
                  // setSearchTerm("");
                  // props.setHideMenuItems(false)
                  // props.setMobileMenuOpen(s => false)
                }, 100)
                // 100ms animation before unmount
                // delay to dispatch search before setExpand(false)
              }
              onChange={(e) => {
                setSearchTermUi(e.target.value);
                setTimeout(() => {
                  debounceUpdateSearchTerm(searchTermUi)
                }, 0)
              }}
              // onKeyPress={event => {
              //   if (event.key === "Enter") {
              //     // router.push(`/search?q=${encodeURIComponent(value)}`)
              //     // setSearchTermUi("");
              //     debounceUpdateSearchTerm(searchTermUi)
              //   }
              // }}
            />
        </div>
        <DropdownInput
          className={classes.orderByDropdown}
          stateShape={
            orderByOptions[0]
            // initial stateShape
            // { label: "Design Templates", value: "category_123123"}
          }
          onChange={({ label, value }: SelectOption) =>
            setTimeout(() => {
              setOrderBy({ label, value })
            }, 0)
            // let UI update first for menu to close
          }
          options={orderByOptions}
          placeholder={"Select a category"}
          // className={classes.optionValues}
        />
      </div>


      <div className={clsx(
        classes.carouselContainer,
        classes.maxWidth100vw,
        smDown ? classes.paddingRight : null,
      )}>
        {
          (option(products).edges([]).length === 0)
          ? <LoadingCards count={8} />
          : products.edges.map(({ node: product }, i) => {
              // console.log("p: ",product)
              return (
                <div key={product.id}
                  className={
                    xsDown
                    ? classes.productImageXs
                    : sm
                      ? classes.productImageSm
                      : classes.productImage
                  }
                >
                  <div className={clsx(
                    smDown ? classes.flexItemMobile : classes.flexItem,
                    classes.flexItemHover,
                  )}>
                    <PreviewCardResponsive
                      product={product}
                      refetch={undefined}
                      listName={"new-release-list"}
                      loadCarouselPics={loadCarouselPics}
                      setLoadCarouselPics={setLoadCarouselPics}
                      productIndex={i}
                    />
                  </div>
                </div>
              )
          })
        }
      </div>
    </main>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  initialProducts?: ProductsConnection;
  count?: number;
  title?: string;
}
interface QueryData {
  productsAllConnection: ProductsConnection;
}
interface QueryVar {
  searchTerm?: string;
  query?: ConnectionOffsetQuery;
}
interface SelectOption {
  label: string;
  value: string | any;
}

/////////// Styles //////////////

export const cardCornerRadius = 4;
const styles = (theme: Theme) => createStyles({
  root: {
  },
  maxWidth100vw: {
    maxWidth: '1160px',
    width: '100vw',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '100vh',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
  },
  productImageSm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '0rem',
  },
  productImageXs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: '1rem',
  },
  title: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexBasis: '50%',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexRowFlexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  flexItemMobile: {
    flexGrow: 1,
    marginBottom: '1rem',
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    width: '100%',
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHover: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.purple}`, // purple
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  flexItemHoverNull: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateEndMessage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '20%',
    marginRight: '20%',
  },
  orderByDropdown: {
    flexBasis: '30%',
    minWidth: 180,
    maxWidth: 250,
    marginRight: '1rem',
    // marginLeft: '1rem',
  },
  // searchbar
  subtitle: {
    color: Colors.grey,
    marginRight: '0.5rem',
    fontSize: '1rem',
  },
  searchbar: {
    // flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: '1rem',
  },
  inputRoot: {
    color: 'inherit',
    fontSize: '0.9rem',
    background: Colors.white,
    border: `1px solid ${Colors.mediumGrey}`,
    borderRadius: '4px',
    height: '38px',
    padding: '0.5rem',
    minWidth: '200px',
    // flexGrow: 1,
    width: '100%',
  },
  inputInput: {
    padding: 0,
    fontSize: '16px', // above 16px so mobile web doesn't zoom
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '100ms',
    }),
    width: '100%',
  },
});


export default withStyles(styles)( NewReleaseProducts );







