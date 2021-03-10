import React from "react";
import clsx from "clsx";
import Link from "next/link";



const LinkLoading: React.FC<LinkLoadingProps> = (props) => {
  if (props.disable) {
    return (
      <div className={"link-loading-disabled"}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    )
  } else {
    return (
      <Link href={props.href} as={props.as}>
        <a className={"link-loading-a-elem"}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {props.children}
        </a>
      </Link>
    )
  }
}

interface LinkLoadingProps {
  href: string;
  as: string;
  disable?: boolean;
  onClick?(a: any): void;
}



export default LinkLoading;
