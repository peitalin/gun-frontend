

export const splitArrayIntoGrid = <T>(
  products: T[],
  numItemsPerPage: number
): T[][] => {

  // Turns an array: b = [ 22, 33, 44,  55, 66, 77, 88, 99, 111 ]
  // into:
  // b.reduce((acc, item, i) => i%3===0 ? [...acc, [...new Array(3).keys()].map((_,j) => b[i+j])] : acc, [])
  // [ [ 22, 33, 44 ], [ 55, 66, 77 ], [ 88, 99, 111 ] ]

  let n = numItemsPerPage;
  let nRowArray = [...new Array(n).keys()];

  let grid: T[][] = products.reduce((acc, product, i) =>
    // for every nth item, group products into nRowArray
    (i % n === 0)
      ? [...acc, nRowArray.map((_,j) => products[i+j])]
      : acc
  , [])

  return grid
}

export interface GridMap<T> {
  [key: number]: T[]
}


// springConfig={{
//   duration: '0s',
//   // duration: '0.35s', //original
//   // easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)', // original
//   delay: '0s',
// }}
export const noAnim = {
  duration: '0s',
  // duration: '0.35s', //original
  // easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)', // original
  delay: '0s',
};

export const someAnim = {
  duration: '0.3s',
  easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)', // original
  delay: '0s',
}