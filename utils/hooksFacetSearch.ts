import React from "react";
import { oc as option } from "ts-optchain";
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
} from "typings/gqlTypes";
import {
  splitArrayIntoGrid,
  GridMap,
} from "components/GridPaginatorHelpers";
import { NextRouter } from "next/router";


export enum PaginatorType {
  limitOffset = "limitOffset",
  page = "page",
}


export const useFacetSearchOptions = ({
  limit,
  overfetchBy,
  maxPriceCents,
  router,
  paginatorType,
  scrollToTopOnPagination = false,
}: {
  limit: number,
  overfetchBy?: number;
  maxPriceCents?: number
  router?: NextRouter,
  paginatorType?: PaginatorType;
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
    : undefined

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
      // console.log("routery.query:", router?.query)
      // console.log("urlPath:", urlPath)

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
        })
        // console.log("initial params: ", params)
      } else {
        // Sync facetHooks params to the url
        if (searchTerm !== undefined && searchTerm !== "") {
          if (params.map(p => p.includes('q=')).every(b => b === false)) {
            // search query doesnt yet exist, add facetSearch param
            params = [`q=${searchTerm}`, ...params]
          }
        }
        if (pageParam > 1) {
          if (params.map(p => p.includes('page=')).every(b => b === false)) {
            // page query doesnt yet exist, add facetSearch param
            params = [`page=${pageParam}`, ...params]
          }
        }
      }

      // console.log("params before join: ", params)
      let params_str: string = params.join('&')
      // console.log("params_str after join: ", params_str)
      if (params_str) {
        params_str = `?${params_str}`
      }

      if (paginatorType === PaginatorType.page) {
        // shallow update pagination query params when navigating using buttons
        // https://nextjs.org/docs/routing/shallow-routing
        router.push(
          `${router.pathname}${params_str}`,
          `${urlPath}${params_str}`,
          { shallow: true }
        )
      }
    }
  }, [pageParam, searchTerm])


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
    // pagination
    paginationParams: {
      limit,
      offset: offset,
      pageParam,
      setPageParam,
      totalCount,
      setTotalCount,
    },
    currentCategories,
    setCurrentCategories,
    // swipeable-views index
    index,
    setIndex,
    debounceSetIndex,
  }
}

interface FacetSearchParams {
  orderBy: SelectOption;
  setOrderBy(a: any): void;
  priceRange: number[];
  setPriceRange(a: any): void;
  searchTerm: string;
  setSearchTerm(a: any): void;
  facets: string[];
  setFacets(a: any): void;
  paginationParams: {
    limit: number; // 2 + 2 = 4
    offset: number;
    totalCount: number;
    setTotalCount(a: any): void;
    pageParam: number;
    setPageParam(a: any): void;
  };
  currentCategories: Categories[],
  setCurrentCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  index: number;
  setIndex(a?: any): void;
  debounceSetIndex(a?: any): void;
}



export const useEffectUpdateGridAccum = <T>({
  index,
  productsConnection,
  totalCount,
  setTotalCount,
  searchTerm,
  numItemsPerPage,
}: {
  index: number,
  productsConnection: GenericConnection<T>,
  totalCount: number,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>,
  searchTerm?: string,
  numItemsPerPage?: number,
}): GridMap<T> => {

  // accumulate products for pre-fetching
  const [gridAccum, setGridAccum] = React.useState<GridMap<T>>({
    0: [],
  })

  React.useEffect(() => {
    // make a mutable new gridAccum
    let newGridAccum = gridAccum;
    let gridAccumKeys = Object.keys(gridAccum);
    let products = option(productsConnection).edges([]).map(({ node }) => node);
    // console.log("gridAccum: ", gridAccum)
    // console.log("gridKeys: ", gridAccumKeys)

    // if skipping ahead multiple pages, check which intemediate pages
    // are missing and fill them in with blank arrays.
    // e.g. if you have pages [1,2], then visit page 7
    if (index > gridAccumKeys.length) {
      [...Array(index).keys()].forEach(i => {
        if (!gridAccumKeys.includes(`${i}`)) {
          // if page does not yet exist in gridAccum, create an empty entry
          // if (newGridAccum[i].length < 1) {
          // }
          console.log('replacing newGridAccum[i]', i)
          newGridAccum[i] = []
        }
      })
    }

    // create/update the index with the products from that index-page-request
    if (products) {

      // if overfetching, split products into groups and add to GridMap
      if (numItemsPerPage && products.length > numItemsPerPage) {
        let productGroups = splitArrayIntoGrid(products, numItemsPerPage)
        // when overfetching, there will be 2+ groups, allocate products to
        // the jth over-fetched group of products
        productGroups.forEach((products, j) => {
          // console.log("j: ", j)
          // console.log("index+j: ", index+j)
          newGridAccum[index+j] = products
        })
      } else {
        // if not overfetching, assign produxts to index
        newGridAccum[index] = products
      }

      setGridAccum(s => ({
        ...newGridAccum,
        ...s
      }))
    }

    // console.log("totalCount>", totalCount)
    if (productsConnection && !totalCount) {
      if (setTotalCount) {
        setTotalCount(productsConnection.totalCount)
      }
    }

  }, [productsConnection, searchTerm, index, totalCount])

  return gridAccum
}



export const totalItemsInCategoriesFacets = ({
  facets,
  facetsDistribution,
  productsConnection,
  totalCount,
  searchTerm,
}:{
  facets: string[],
  facetsDistribution: FacetsDistributionObject,
  productsConnection: ProductsConnection,
  totalCount: number,
  searchTerm: string,
}) => {

  console.log("facet distributions", facetsDistribution)
  console.log("facets", facets)
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
    let length1 = option(productsConnection).edges([]).length
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

  let plength = option(productsConnection).edges([]).length

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