import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ProductCardResponsive from "components/ProductCardResponsive";
import LoadingCards from "./LoadingCards";
import Loading from "components/Loading";
// Graphql Typings
import { ProductsConnection, Order_By, ConnectionQuery } from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_NEW_PRODUCTS } from "queries/products-queries";
// Select Component
// import DropdownInput from "components/Fields/DropdownInput";
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: (props) => <Loading/>,
  ssr: false,
});
import { useDebouncedCallback } from 'use-debounce';


const orderByOptions = [
  { label: "Newest", value: { createdAt: Order_By.DESC }},
  { label: "Oldest", value: { createdAt: Order_By.ASC }},
  { label: "Highest Price", value: { price: Order_By.DESC }},
  { label: "Lowest Price", value: { price: Order_By.ASC }},
];

export const initialVariables = {
  searchTerm: "",
  query: {
    limit: 12,
    offset: 0,
    orderBy: orderByOptions[0],
  },
}



const NewReleaseProducts = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    title = "New Releases"
  } = props;

  const [orderBy, setOrderBy] = React.useState(initialVariables?.query?.orderBy);
  const [expand, setExpand] = React.useState(false);
  const [searchTermUi, setSearchTermUi] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState(initialVariables?.searchTerm);

  // Debounce Redux State changes to limit lag
  const [debounceUpdateSearchTerm] = useDebouncedCallback((name: string) => {
    setSearchTerm(searchTermUi)
  }, 100);

  const inputRefEl = React.useRef(null);

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))

  // const aClient = useApolloClient();
  // console.log("apollo CACHE::", aClient.cache)
  // const newreleases = aClient?.cache?.readQuery<QueryDataNewReleases, any>({
  //   query: GET_ALL_NEW_PRODUCTS,
  //   variables: {
  //     searchTerm: searchTerm,
  //     query: {
  //       limit: 12,
  //       offset: 0,
  //       orderBy: orderBy.value as any,
  //     }
  //   },
  // });
  // console.log("aClient.CACHE new releases: ", newreleases)

  const { loading, error, data } = useQuery<QueryDataNewReleases, QueryVar>(
    GET_ALL_NEW_PRODUCTS, {
    variables: {
      searchTerm: searchTerm,
      query: {
        limit: 12,
        offset: 0,
        orderBy: orderBy.value as any,
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

  let products = data?.productsAllConnection

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

      {/* <div className={clsx(classes.flexRowFlexEnd, classes.maxWidth100vw)}>
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
      </div> */}


      <div className={clsx(
        classes.carouselContainer,
        classes.maxWidth100vw,
        xsDown
          ? classes.carouselContainerPaddingLeftXs
          : classes.carouselContainerPaddingLeft,
      )}>
        {
          ((products?.edges ?? []).length === 0 && loading)
          ? <LoadingCards count={8} />
          : ((products?.edges ?? []).length === 0)
            ? <div className={classes.noProductsYet}>No products yet</div>
            : products.edges.map(({ node: product }, i) => {
                // console.log("p: ",product)
                return (
                  <div key={product.id}
                    className={
                      xsDown
                      ? classes.productCardXs
                      : sm
                        ? classes.productCardSm
                        : classes.productCard
                    }
                  >
                    <div className={clsx(
                      sm ? classes.flexItemMobile : classes.flexItem,
                      classes.flexItemHover,
                    )}>
                      <ProductCardResponsive
                        product={product}
                        refetch={undefined}
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
  title?: string;
}
export interface QueryDataNewReleases {
  productsAllConnection: ProductsConnection;
}
interface QueryVar {
  searchTerm?: string;
  query?: ConnectionQuery;
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
    // minHeight: '100vh',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
  },
  carouselContainerPaddingLeft: {
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  carouselContainerPaddingLeftXs: {
    paddingLeft: '0.5rem', // balances 1rem margin-right on flexItems
  },
  productCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  productCardSm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  productCardXs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0.5rem',
  },
  title: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
    flexBasis: '50%',
    fontSize: "1.5rem",
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
    marginBottom: '0.5rem',
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
    marginBottom: '0.5rem',
  },
  // searchbar
  subtitle: {
    color: Colors.uniswapLighterGrey,
    marginRight: '0.5rem',
    fontSize: '1rem',
  },
  searchbar: {
    // flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: '1rem',
    marginBottom: '0.5rem',
  },
  inputRoot: {
    color: Colors.uniswapLightestGrey,
    background: Colors.uniswapLightNavy,
    borderRadius: BorderRadius,
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
  noProductsYet: {
    color: Colors.uniswapLightestGrey,
    fontSize: '1.5rem',
    width: '100%',
    textAlign: "center",
  },
});


export default withStyles(styles)( NewReleaseProducts );







