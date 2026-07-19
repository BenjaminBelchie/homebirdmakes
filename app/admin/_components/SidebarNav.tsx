"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconLink, IconPhoto } from "@tabler/icons-react";

function Nav() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "collections";
  const collections = useQuery(api.collections.list);
  const links = useQuery(api.links.list);
  const { isMobile, setOpenMobile } = useSidebar();

  function handleNavClick() {
    if (isMobile) setOpenMobile(false);
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={section === "collections"}
              tooltip="Collections"
              render={<Link href="/admin?section=collections" />}
              onClick={handleNavClick}
            >
              <IconPhoto />
              <span>Collections</span>
            </SidebarMenuButton>
            {collections !== undefined && (
              <SidebarMenuBadge>{collections.length}</SidebarMenuBadge>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={section === "links"}
              tooltip="Links"
              render={<Link href="/admin?section=links" />}
              onClick={handleNavClick}
            >
              <IconLink />
              <span>Links</span>
            </SidebarMenuButton>
            {links !== undefined && (
              <SidebarMenuBadge>{links.length}</SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function SidebarNav() {
  return (
    <Suspense>
      <Nav />
    </Suspense>
  );
}
