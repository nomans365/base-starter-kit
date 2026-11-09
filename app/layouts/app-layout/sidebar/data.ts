import LayoutGridIcon from "~/components/icons/layout/LayoutGridIcon.vue";
import GearIcon from "~/components/icons/layout/GearIcon.vue";
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    icon: LayoutGridIcon,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: GearIcon,
    name: "Website Settings",
    path: "/website-settings",
  },
];

export const othersItems: NavItem[] = [];
