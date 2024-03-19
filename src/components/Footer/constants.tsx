import { LinksColProps } from "./LinksCol";

interface Links {
  [title: string]: LinksColProps["links"];
}

interface SocialNetworksIcons {
  title: string;
  iconPath: string;
  link: string;
}
export const SOCIAL_NETWORKS_ICONS: Array<SocialNetworksIcons> = [
  {
    title: "Facebook",
    iconPath: "/svg/facebook.svg",
    link: "https://www.facebook.com/pathriseio/",
  },
  {
    title: "Youtube",
    iconPath: "/svg/youtube.svg",
    link: "https://www.youtube.com/channel/UCqYR6Zn-GCe_S5a_D1vBVFw",
  },
  {
    title: "Linkedin",
    iconPath: "/svg/linkedin.svg",
    link: "https://www.linkedin.com/company/pathrise/",
  },
];

export const LINKS: Links = {
  information: [
    { title: "Outcomes report", link: "https://www.pathrise.com/outcomes" },
    { title: "Application process", link: "https://www.pathrise.com/process" },
    {
      title: "About Income Based Financing",
      link: "https://www.pathrise.com/isa",
    },
    { title: "Fellow Stories", link: "https://www.pathrise.com/stories" },
    { title: "Our Mentors", link: "https://www.pathrise.com/specialists" },
    { title: "FAQ", link: "https://www.pathrise.com/help" },
  ],

  company: [
    { title: "About Us", link: "https://www.pathrise.com/about" },
    { title: "Manifesto", link: "https://www.pathrise.com/manifesto" },
    { title: "Contact Us", link: "https://www.pathrise.com/help" },
    { title: "Press", link: "https://www.pathrise.com/press" },
    { title: "Careers", link: "https://www.pathrise.com/careers" },
    { title: "Partner with us", link: "https://www.pathrise.com/affiliate" },
  ],

  resources: [
    { title: "Blog", link: "https://www.pathrise.com/guides/" },
    {
      title: "Events",
      link: "https://www.meetup.com/Land-your-dream-job-in-tech",
    },
    {
      title: "Company Guides",
      link: "https://www.pathrise.com/guides/how-to-get-a-job-at-company/",
    },
    { title: "Scholarships", link: "https://www.pathrise.com/scholarships" },
    { title: "Privacy Policy", link: "https://www.pathrise.com/privacy" },
    { title: "Terms of Use", link: "https://www.pathrise.com/terms" },
  ],

  "industry tracks": [
    {
      title: "Software Engineering",
      link: "https://www.pathrise.com/software-engineering",
    },
    {
      title: "Product, Strategy and Ops",
      link: "https://www.pathrise.com/product-strategy-ops",
    },
    { title: "Data", link: "https://www.pathrise.com/data-science" },
    { title: "Marketing", link: "https://www.pathrise.com/marketing" },
    {
      title: "Sales and Customer Success",
      link: "https://www.pathrise.com/sales",
    },
    {
      title: "Civil, Mechanical and Other Engineering",
      link: "https://www.pathrise.com/engineering-other",
    },
    {
      title: "Finance, Banking & Accounting",
      link: "https://www.pathrise.com/finance-banking-accounting",
    },
    {
      title: "IT & Cybersecurity",
      link: "https://www.pathrise.com/it-cybersecurity",
    },
    {
      title: "Operations Management",
      link: "https://www.pathrise.com/operations-management",
    },
    {
      title: "Product Management",
      link: "https://www.pathrise.com/product-management",
    },
    {
      title: "Project & Program Management",
      link: "https://www.pathrise.com/project-program-management",
    },
    {
      title: "Strategy & Consulting",
      link: "https://www.pathrise.com/strategy-consulting",
    },
    { title: "Supply Chain", link: "https://www.pathrise.com/supply-chain" },
  ],
};
