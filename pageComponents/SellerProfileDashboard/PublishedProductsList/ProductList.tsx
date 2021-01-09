import React from "react";
// Typings
import { UserPrivate, Product, ProductsConnection } from "typings/gqlTypes";
// Components
import ProductRow from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductRow";


const ProductList = (props: {
  productsConnection: ProductsConnection,
  hideDelete?: boolean,
  hideUnpublish?: boolean,
  hidePublish?: boolean,
  hideViewButton?: boolean,
  hideShareLinkButton?: boolean,
  refetchProducts?(): Promise<void>;
}) => {
  return <>
  {
    props.productsConnection.edges.map(({ node: product}) =>
      <div key={product.id}>
        <ProductRow
          product={product}
          hidePublish={props.hidePublish}
          hideUnpublish={props.hideUnpublish}
          hideDelete={props.hideDelete}
          hideViewButton={props.hideViewButton}
          hideShareLinkButton={props.hideShareLinkButton}
          refetchProducts={props.refetchProducts}
        />
      </div>
    )
  }
  </>
}

export default ProductList;