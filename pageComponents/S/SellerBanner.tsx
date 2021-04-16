import React from "react";
import { Colors } from "layout/AppTheme";
import Banner from "components/Banner";
import { Store } from "typings/gqlTypes";


const SellerBanner: React.FC<ReactProps> = (props) => {

  const { store } = props;

  return (
    <Banner
      height={120}
      dither={false}
      ditherDark={false}
      color={!!store?.cover?.id ? "#eaeaea" : '#333333'}
      bannerContainerStyles={{
        // backgroundColor: Colors.white,
        // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23e1e1e1' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
      src={undefined}
    >
      {props.children}
    </Banner>
  );
}



interface ReactProps {
  store?: Store
}
export default SellerBanner;


