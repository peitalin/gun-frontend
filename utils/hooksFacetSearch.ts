import React from "react";
// lodash
const throttle = require('lodash.throttle');
import { useDebouncedCallback } from 'use-debounce';
// Search Component
import { SelectOption } from "components/SearchOptions";
// Typings
import { GenericConnection } from "typings";
import {
  Order_By,
  ProductsConnection,
  Product,
  FacetsDistributionObject,
  FacetAttributes,
  Categories,
  DealerState,
} from "typings/gqlTypes";
import {
  splitArrayIntoGrid,
  GridMap,
} from "components/GridPaginatorHelpers";
import { NextRouter } from "next/router";




export const useFacetSearchOptions = ({
  limit,
  overfetchBy,
  maxPriceCents,
  router,
  syncUrlParams,
  scrollToTopOnPagination = false,
}: {
  limit: number,
  overfetchBy?: number;
  maxPriceCents?: number
  router?: NextRouter,
  syncUrlParams?: boolean;
  scrollToTopOnPagination?: boolean;
}): FacetSearchParams => {

  const calcOffset = (page: number, limit: number): number => {
    if (!page) {
      // offset = 0
      return 0
    }
    if (!limit) {
      // offset = 0
      return 0
    }

    let offset = (page * limit) - limit

    if (offset < 0) {
      return 0
    } else {
      return Math.floor(offset / overfetchBy)
      // offset accounts for overfetch (2x overfetch)
    }
  }

  ///// Search params
  // search filters
  const [priceRange, setPriceRange] = React.useState([0, maxPriceCents || 20000]);
  const [facets, setFacets] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<SelectOption>({
    label: "Newest",
    value: { createdAt: Order_By.DESC }
  });

  const initialSearchTerm = !!router?.query?.q
    ? decodeURIComponent(router?.query?.q as string)
    : ""

  const initialPageParam = !!router?.query?.page
    ? parseInt(decodeURIComponent(router?.query?.page as string)) ?? 1
    : 1

  /// Search Terms
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

  /// Pagination
  // actual page query param dispatched for pagination
  const [pageParam, setPageParam] = React.useState(initialPageParam);
  const [totalCount, setTotalCount] = React.useState(0);
  const [offset, setOffset] = React.useState(calcOffset(pageParam, limit));

  const [
    currentCategories,
    setCurrentCategories
  ] = React.useState<Categories[]>(undefined)

  const [
    dealerStates,
    setDealerStates
  ] = React.useState<DealerState[]>(undefined)

  const [
    calibers,
    setCalibers
  ] = React.useState<string[]>(undefined)

  const [
    actionTypes,
    setActionTypes
  ] = React.useState<string[]>(undefined)

  // for paging through swipeable-views
  const [index, setIndex] = React.useState(0);
  // for actual gql dispatch for pagination page
  const [debounceSetIndex] = useDebouncedCallback(
    (index: number) => setIndex(index),
    64
  ) // debounce double clicks

  React.useEffect(() => {
    // set page back to 1 when faceting by categories,
    // or filtering by searchTerm/priceRange (which reduces number of products)
    // otherwise stuck on page 3 when theres only 1 page
    setIndex(0)

  }, [facets, searchTerm, priceRange[0], priceRange[1]])


  //////// Set searchTerm and pageParam from url query params when they change
  /// for exampke, then pasting urls
  React.useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm])

  React.useEffect(() => {
    setPageParam(initialPageParam)
  }, [initialPageParam])

  ////////////////////////////////////////////////////
  /// query params syncing
  ////////////////////////////////////////////////////
  React.useEffect(() => {
    // let path = router.pathname
    // console.log('searchTerm', searchTerm)

    let newOffset = calcOffset(pageParam, limit)
    setOffset(newOffset)


    if (router) {

      let urlPath = router.asPath.split('?')[0]
      let params: string[];
      // console.log("router.query:", router?.query)
      console.log("router: ", router)
      // console.log("urlPath:", urlPath)
      // console.log("params1: ", params)
      // console.log("currentCategories: ", currentCategories)

      if (syncUrlParams) {
        if (urlPath.startsWith('/categories')) {
          // /all if currentCategories is empty array
          if (currentCategories?.length === 0 || !currentCategories?.[0]) {
            urlPath = `/categories/all`
          } else {
            urlPath = `/categories/${currentCategories?.[0]?.slug}`
          }
        }
      }

      // sync url query params with the facet Hooks params and inject
      // it into urls
      if (router?.query) {
        params = Object.keys(router?.query).map(key => {
          if (urlPath.startsWith('/categories')) {
            // skip turning [categorySlugs] into query params
            // when on /categories/[categorySlug] pages
            return null
          } else {
            let value = router.query[key]
            // let param = encodeURIComponent(`${key}=${value}`)
            let param = `${key}=${value}`
            return param
          }
        }).filter(p => !!p)
        // console.log("initial params: ", params)
      }
      // console.log("params 2: ", params)

      // Sync facetHooks params to the url
      if (searchTerm !== undefined && searchTerm !== "") {
        if (params.every(p => !p.includes("q="))) {
          // search query doesnt yet exist, add q param
          params = [`q=${searchTerm}`, ...params]
        }
      }
      // Sync page params if larger than page 1
      if (pageParam > 1) {
        if (!params.some(p => p.includes('page='))) {
          // page query doesnt yet exist, add page param
          params = [`page=${pageParam}`, ...params]
        } else {
          // page query exists, modify it
          params = params.map(param => {
            if (param.includes("page=")) {
              return `page=${pageParam}`
            } else {
              return param
            }
          })
        }
      } else {
        // remove page query if page 1
        params = params.filter(param => !param.includes("page="))
      }


      // console.log("params before join: ", params)
      let params_str: string = params.join('&')
      // console.log("params_str after join: ", params_str)
      if (params_str) {
        params_str = `?${params_str}`
      }

      if (syncUrlParams) {
        // shallow update pagination query params when navigating using buttons
        // https://nextjs.org/docs/routing/shallow-routing
        router.push(
          `${router.pathname}${params_str}`,
          `${urlPath}${params_str}`,
          { shallow: true }
        )
      }
    }
  }, [pageParam, searchTerm, currentCategories])


  // scroll to top when page changes
  React.useEffect(() => {
    if (scrollToTopOnPagination) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pageParam])

  return {
    // orderBy
    orderBy,
    setOrderBy,
    // priceRange
    priceRange,
    setPriceRange,
    // search
    searchTerm,
    setSearchTerm,
    // facet filters
    facets: facets,
    setFacets,
    // category filters
    currentCategories,
    setCurrentCategories,
    // dealer state filters
    dealerStates,
    setDealerStates,
    // calibers filters
    calibers,
    setCalibers,
    // actionType filters
    actionTypes,
    setActionTypes,
    // pagination
    paginationParams: {
      limit,
      offset: offset,
      pageParam,
      setPageParam,
      totalCount,
      setTotalCount,
      // swipeable-views index
      index,
      setIndex,
      debounceSetIndex,
    },
  }
}

export interface FacetSearchParams {
  orderBy: SelectOption;
  setOrderBy(a: any): void;
  priceRange: number[];
  setPriceRange(a: any): void;
  searchTerm: string;
  setSearchTerm(a: any): void;
  facets: string[];
  setFacets(a: any): void;
  currentCategories: Categories[],
  setCurrentCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  dealerStates: DealerState[],
  setDealerStates: React.Dispatch<React.SetStateAction<DealerState[]>>
  calibers: string[],
  setCalibers: React.Dispatch<React.SetStateAction<string[]>>
  actionTypes: string[],
  setActionTypes: React.Dispatch<React.SetStateAction<string[]>>
  paginationParams: {
    limit: number; //
    offset: number;
    overfetchBy?: number;
    totalCount: number;
    setTotalCount(a: any): void;
    pageParam: number;
    setPageParam(a: any): void;
    // swipeable-views index
    index: number;
    setIndex(a?: any): void;
    debounceSetIndex(a?: any): void;
  };
}



export const useEffectUpdateGridAccum = <T>({
  index,
  connection,
  totalCount,
  setTotalCount,
  searchTerm,
  numItemsPerPage,
  overfetchBy,
  loading,
}: {
  index: number,
  connection: GenericConnection<T>,
  totalCount: number,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>,
  searchTerm?: string,
  numItemsPerPage?: number,
  overfetchBy?: number,
  loading?: boolean,
}): GridMap<string> => {

  // accumulate products for pre-fetching
  const [gridAccum, setGridAccum] = React.useState<GridMap<string>>({
    0: [],
  })

  let objectIds = connection?.edges?.map(({ node }: any) => node.id)

  // instantiate gridAccum data structure with #numPages for swipeable
  React.useEffect(() => {
    let numPages = totalCount / numItemsPerPage;
    // instantiate gridAccum with #numPages number of empty arrays []
    if (numPages) {
      [...Array(Math.ceil(numPages)).keys()].forEach(i => {
        if (gridAccum[i] === undefined) {
          gridAccum[i] = []
        }
      })
    }
  }, [totalCount])


  React.useEffect(() => {

    let gridAccumKeys = Object.keys(gridAccum);
    // if the incoming product request is new
    // then we need to update the gridAccumulator.
    // we see if the 1st product in incoming request matches any of the 1st products
    // in each gridAccumulator page
    let skipUpdate = gridAccumKeys.some(k => {
        // console.log("k", k)
        // console.log("index+k", gridAccum[index+k])
        // console.log("gridAccum[k]: ", gridAccum[k])
        // console.log("objectIds[0]", objectIds?.[0])
        let gridPageFirstItemId = gridAccum[k]?.[0] as any
        // console.log("gridPageFirstItemId: ", gridPageFirstItemId)
        // if any pages match, then no need to update
        if (!objectIds?.[0]) {
          // need to empty gridPage if incoming data is []
          return false
        }
        return gridPageFirstItemId === objectIds?.[0]
      })

    // console.log("skipUpdate", skipUpdate)
    // // console.log("loading", loading)
    // console.log("incoming objectIds: ", objectIds)
    // console.log("gridAccum: ", gridAccum)

    if (!skipUpdate)  {
      // console.log("instantiating grid...")
      // gridAccum[index] is empty and needs to be updated

      // split incoming products from request into groups
      // this may be from the 5th page onwards...5th and 6th pages incoming
      let objectIdGroups = splitArrayIntoGrid(objectIds, numItemsPerPage)
      // console.log("objectIdGroups: ", objectIdGroups)
      // when overfetching, there will be 2+ groups, allocate products to
      // the jth over-fetched group of products

      if (objectIdGroups?.length === 0) {
        // page-i returned no items, so set gridAccum[index] as []
        gridAccum[index] = []
      } else {
        objectIdGroups.forEach((objectIdSubgroup, k) => {
          // if 1st item on page-i is not the same as 1st item on objectSubgroup-i
          // then replace it
          let gridPage: any[] = gridAccum[index+k]
          let gridPageFirstId = gridPage?.[0]?.id
          // console.log("index: ", index)
          // console.log("k: ", k)
          // console.log("objectIdSubgroup: ", objectIdSubgroup)
          if (gridPageFirstId !== objectIdSubgroup?.[0]) {
            gridAccum[index+k] = objectIdSubgroup
            // index + k becuase we're forward fetching k pages from index onwards
          }
        })
      }


      setGridAccum(s => ({
        ...gridAccum,
      }))
    }

    // console.log("totalCount>", totalCount)
    if (connection && !totalCount) {
      if (setTotalCount) {
        setTotalCount(connection.totalCount)
      }
    }

  }, [connection, searchTerm, index, totalCount, loading])

  return gridAccum
}



export const totalItemsInCategoriesFacets = ({
  facets,
  facetsDistribution,
  productsConnection,
  totalCount,
  searchTerm,
  pageParam,
}:{
  facets: string[],
  facetsDistribution: FacetsDistributionObject,
  productsConnection: ProductsConnection,
  totalCount: number,
  searchTerm: string,
  pageParam?: number,
}) => {

  // console.log("facet distributions", facetsDistribution)
  // console.log("facets", facets)
  let currentCategories = facets
    .map(f => f.replace("_categoryNameFacet:", "").toLowerCase())

  if (
    facets.length > 0 &&
    facetsDistribution &&
    facetsDistribution.categoryNames
  ) {
    let facetCounts = currentCategories
      .map(category => facetsDistribution.categoryNames[category])
      .filter(c => !!c)
      .reduce((acc, count) => acc + count, 0)
    // console.log('facetCounts: ', facetCounts)
    return facetCounts

  } else if (!!searchTerm) {
    // accumu connection will have more products, go with that length
    let length1 = productsConnection?.edges?.length ?? 0
    let length2 = totalCount
    return length1 > length2 ? length1 : length2

  } else {
    // console.log("returning original totalCount: ", totalCount)
    return totalCount
  }

}

export const totalItemsInIsPublishedFacet = ({
  searchTerm,
  priceRange,
  isPublished,
  facetsDistribution,
  productsConnection,
  totalCount,
  limitOverfetchBy,
}: {
  searchTerm: string,
  priceRange?: number[],
  isPublished: boolean,
  facetsDistribution: FacetsDistributionObject,
  productsConnection: ProductsConnection,
  totalCount: number,
  limitOverfetchBy: number,
}) => {
  ///// Note this is imperfect until meili returns totalCounts for
  // filtered items. Currently it only reports facet distrubtion counts.
  // so there is no way of knowing how many products are filtered out
  // When filtercount are release, update this.

  let isPublishedStr = isPublished ? "yes" : "no";
  // if search term exists, total count will be a subset of all products
  // to total count will be smaller than N(isPublished||isNotPublished)
  // otherwise, go with N(isPublished || isNotPublished) facet counts

  let plength = productsConnection?.edges?.length

  if (!!searchTerm) {
    // accum connection will have more products, go with that length
    return plength > totalCount ? plength : totalCount

  } else if (!!priceRange && !!priceRange[0] && !!priceRange[1]) {

    // accum connection will have more products, go with that length
    return plength > totalCount ? plength : totalCount

  } else if (
    facetsDistribution &&
    facetsDistribution.isPublished
  ) {

    return facetsDistribution.isPublished[isPublishedStr]

    // if (plength < limitOverfetchBy ) {
    //   // if fetched products are less than what we wanted to fetch,
    //   // totalCounts are less the limit * overfetch, so return totalCount
    //   return plength
    // } else {
    //   // otherwise there are more products to fetch, use facetCount
    //   return facetsDistribution.isPublished[isPublishedStr]
    // }

  }
}