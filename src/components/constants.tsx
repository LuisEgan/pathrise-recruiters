import { CategoryStyle, SizeStyle } from "./types";

import ShareIcon from "@svg/share.svg";
import LinkedInIcon from "@svg/linkedin.svg";
import InstagramIcon from "@svg/instagram.svg";
import FacebookIcon from "@svg/facebook.svg";
import YoutubeIcon from "@svg/youtube.svg";
import { SocialNetworks } from "@/utils/types";
import { ReactNode } from "react";

export interface SocialNetwork {
  network: SocialNetworks;
  link?: string;
  icon: ReactNode;
}

export type SocialNetworksData = {
  [key in SocialNetworks]: SocialNetwork;
};

export const SOCIAL_NETWORKS_DATA: SocialNetworksData = {
  linkedin: {
    network: "linkedin",
    link: "https://www.linkedin.com/company/pathrise/",
    icon: <LinkedInIcon />,
  },
  facebook: {
    network: "facebook",
    link: "https://www.facebook.com/pathriseio/",
    icon: <FacebookIcon />,
  },
  instagram: {
    network: "instagram",
    link: "https://www.instagram.com/pathrise/",
    icon: <InstagramIcon />,
  },
  youtube: {
    network: "youtube",
    link: "https://www.youtube.com/channel/UCqYR6Zn-GCe_S5a_D1vBVFw",
    icon: <YoutubeIcon />,
  },
  share: {
    network: "share",
    link: "https://www.pathrise.com/",
    icon: <ShareIcon />,
  },
};

export const PATHRISE_VIDEO_URL =
  "https://www.youtube.com/watch?v=41s3dVdSQhU&ab_channel=Pathrise";

export const ROUNDED_CLASSES: SizeStyle = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const BORDER_CLASSES: CategoryStyle = {
  main: "border-gray-200",
  secondary: "border-gray-200",
  success: "border-green-200",
  danger: "border-red-200",
  warning: "border-yellow-200",
  info: "border-blue-200",
  dark: "border-gray-400",
  light: "border-gray-100",
};

export const BG_CLASSES: CategoryStyle = {
  main: "bg-purple-500",
  secondary: "bg-gray-500",
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  dark: "bg-gray-800",
  light: "bg-gray-100",
};
