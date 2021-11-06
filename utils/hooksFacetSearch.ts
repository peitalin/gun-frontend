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
  NewsItemsConnection,
  Product,
  FacetsDistributionObject,
  Categories,
  DealerState,
} from "typings/gqlTypes";
import { categoryPreviewsBackup } from "utils/categories"
import {
  splitArrayIntoGrid,
  GridMap,
} from "components/GridPaginatorGeneric/GridPaginatorHelpers";
import { NextRouter } from "next/router";
import { SelectOptionCaliber } from "typings"




export const useFacetSearchOptions = ({
  limit,
  overfetchBy,
  maxPriceCents,
  router,
  syncUrlParams,
  scrollToTopOnPagination = false,
  initialOrderBy = { createdAt: Order_By.DESC },
}: {
  limit: number,
  overfetchBy?: number;
  maxPriceCents?: number
  router?: NextRouter,
  syncUrlParams?: boolean;
  scrollToTopOnPagination?: boolean;
  initialOrderBy?: any,
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
  const [orderBy, setOrderBy] = React.useState<SelectOption>(initialOrderBy);

  const initialSearchTerm = !!router?.query?.q
    ? decodeURIComponent(router?.query?.q as string)
    : ""
  // const initialSearchTerm = ""

  const initialPageParam = !!router?.query?.page
    ? parseInt(decodeURIComponent(router?.query?.page as string))
    : 1
  // console.log('ROUTER.QUERY.PAGE:', router?.query?.page)
  // console.log('initialPageParam:', initialPageParam)

  const initialCategory = !!router?.query?.category
    ? categoryPreviewsBackup.find(c => {
          let categorySlug = decodeURIComponent(router?.query?.category as string)
          return c.slug === categorySlug
      }) as Categories
    : undefined

  const initialCaliber = !!router?.query?.caliber
    ? decodeURIComponent(router?.query?.caliber as string)
    : ""

  const initialState: DealerState = !!router?.query?.state
    ? decodeURIComponent(router?.query?.state as DealerState)
    : "" as any

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
  ] = React.useState<Categories[]>(
    initialCategory ? [initialCategory] : []
  )
  // initial category is /categories/[categorySlug]

  const [
    dealerStates,
    setDealerStates
  ] = React.useState<DealerState[]>(
    initialState ? [initialState] : undefined
  )

  const [
    calibers,
    setCalibers
  ] = React.useState<SelectOptionCaliber[]>(
    initialCaliber ? [] : []
  )

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
  /// for example, then pasting urls
  // ONLY ON initial render
  React.useEffect(() => {
    // check initialSearchTerm is not falsey, so that there is no
    // infinite loop with the hooks when syncing q= params below
    // (specifally, hooks removing q= from the url)
    if (
      initialSearchTerm !== undefined
      && initialSearchTerm !== ""
    ) {
      setSearchTerm(initialSearchTerm)
    }
  }, [initialSearchTerm])

  React.useEffect(() => {
    // stop infinite loop when pasting in urls with page=2
    // as it triggers initialPageParam to change, which triggers
    // pageParam to change, then syncUrl triggers another loop of changes
    // ad inifinitum
    if (initialPageParam > 1) {
      setPageParam(initialPageParam)
    }
  }, [initialPageParam])

  React.useEffect(() => {
    if (initialCaliber) {
      setCalibers([])
    } else {
      setCalibers([])
      // default empty array for all calibers filter
    }
  }, [initialCaliber])

  React.useEffect(() => {
    if (initialState) {
      setDealerStates([initialState])
    } else {
      setDealerStates([])
      // default empty array for all states filter
    }
  }, [initialState])

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
      // console.log("router: ", router)
      // console.log("urlPath:", urlPath)
      // console.log("params1: ", params)
      // console.log("currentCategories: ", currentCategories)

      if (syncUrlParams) {
        if (currentCategories?.[0]?.slug) {
          // console.log("currentCategories: : :: ", currentCategories)
          if (urlPath.startsWith('/categories')) {
            urlPath = `/categories/${currentCategories?.[0]?.slug}`
          }
          // if (urlPath.startsWith('/new')) {
          //   urlPath = `/new/${currentCategories?.[0]?.slug}`
          // }
        }
      }

      // sync url query params with the facet Hooks params and inject
      // it into urls
      if (router?.query) {
        params = Object.keys(router?.query).map(key => {

          // skip turning [categorySlugs] into query params
          // when on /categories/[categorySlug] pages
          if (
            urlPath.startsWith('/categories') && key === 'categorySlug'
          ) {
            return null
          } else {
            let value = router.query[key]
            let param = `${key}=${value}`
            return param
          }

        }).filter(p => !!p)
      }

      // console.log("searchTerm>", searchTerm)
      // Sync url to facetHooks searchterm params
      if (searchTerm !== undefined && searchTerm !== "") {
        // console.log("q1 params>>>>>>>>>>>>", params)
        if (!params.some(p => p.startsWith("q="))) {
          // search query doesnt yet exist, add q param
          params = [`q=${searchTerm}`, ...params]
        } else {
          let params2 = params.map(p => {
            if (p.startsWith("q=")) {
              return `q=${searchTerm}`
            } else {
              return p
            }
          })
          params = params2
        }
      } else {
        // remove q= query param for empty search terms
        params = params.filter(param => !param.includes("q="))
      }

      // Sync page params if larger than page 1
      if (pageParam > 1) {
        if (!params.some(p => p.startsWith('page='))) {
          // page query doesnt yet exist, add page param
          params = [`page=${pageParam}`, ...params]
        } else {
          // page query exists, modify it
          params = params.map(param => {
            if (param.startsWith("page=")) {
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

      // Sync category
      let categorySlug = currentCategories?.[0]?.slug
      if (categorySlug) {
        if (!params.some(p => p.startsWith('category='))) {
          // page query doesnt yet exist, add page param
          params = [`category=${categorySlug}`, ...params]
        } else {
          // page query exists, modify it
          params = params.map(param => {
            if (param.startsWith("category=")) {
              return `category=${categorySlug}`
            } else {
              return param
            }
          })
        }
      } else {
        // remove page query if page 1
        params = params.filter(param => !param.includes("category="))
      }


      // console.log("params before join: ", params)
      let params_str: string = params.join('&')
      // console.log("params_str after join: ", params_str)
      if (params_str) {
        params_str = `?${params_str}`
      } else {
        params_str = ''
      }

      if (syncUrlParams) {
        // shallow update pagination query params when navigating using buttons
        // https://nextjs.org/docs/routing/shallow-routing
        router.replace(
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
  calibers: SelectOptionCaliber[],
  setCalibers: React.Dispatch<React.SetStateAction<SelectOptionCaliber[]>>
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

  let objectIds: string[] = connection?.edges?.map(({ node }: any) => node.id)

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
        let gridPageK: string[] = gridAccum[k]
        if (!objectIds?.[0]) {
          // need to empty gridPage if incoming data is []
          return false
        }

        let gridPageNumItems = gridPageK?.length
        if (gridPageNumItems !== objectIds.length) {
          // if existing number of items in gridPage[k] is more or less
          // than the number of incoming items in the product request, update render
          return false
        }

        // if same length, make sure every id in the array is the same
        return objectIds.every(( oid, i ) => {
          if (gridPageK?.[i] !== oid) {
            return false
          } else {
            return true
          }
        })
        // instead of just checking whether the id on the first item matches
        // let gridPageFirstItemId = gridPageK?.[0]
        // return gridPageFirstItemId === objectIds?.[0]
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
  itemsConnection,
  totalCount,
  searchTerm,
  pageParam,
}:{
  facets: string[],
  facetsDistribution: FacetsDistributionObject,
  itemsConnection: ProductsConnection | NewsItemsConnection,
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
    let length1 = itemsConnection?.edges?.length ?? 0
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
  itemsConnection,
  totalCount,
  limitOverfetchBy,
}: {
  searchTerm: string,
  priceRange?: number[],
  isPublished: boolean,
  facetsDistribution: FacetsDistributionObject,
  itemsConnection: ProductsConnection | NewsItemsConnection,
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

  let plength = itemsConnection?.edges?.length

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