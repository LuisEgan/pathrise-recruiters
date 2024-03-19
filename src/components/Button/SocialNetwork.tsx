import { SocialNetworks } from "@/utils/types";
import { cloneElement, forwardRef } from "react";
import { SOCIAL_NETWORKS_DATA } from "../constants";
import { BaseProps } from "../types";

interface SocialNetworkButton extends BaseProps {
  network: SocialNetworks;
  sizeClassNames?: string;
}

const SocialNetwork = forwardRef<HTMLAnchorElement, SocialNetworkButton>(
  (props, ref) => {
    const {
      network,
      sizeClassNames = "w-6 lg:w-7",
      className,
    } = props;

    return (
      <a
        ref={ref}
        className="relative mr-5 opacity-40 hover:cursor-pointer hover:opacity-100"
        href={SOCIAL_NETWORKS_DATA[network].link}
        target="__blank"
        title={network}
      >
        {cloneElement(
          SOCIAL_NETWORKS_DATA[network].icon as React.ReactElement,
          {
            className: `${className} ${sizeClassNames}`,
          }
        )}
      </a>
    );
  }
);

SocialNetwork.displayName = "SocialNetwork";

export default SocialNetwork;
