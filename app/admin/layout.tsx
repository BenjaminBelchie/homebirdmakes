import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { SidebarNav } from "./_components/SidebarNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Admin" render={<Link href="/admin" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
                  <IconLayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0 leading-none min-w-0">
                  <span className="text-[10px] font-medium text-sidebar-foreground/60 uppercase tracking-widest truncate">
                    Homebird Makes
                  </span>
                  <span className="font-semibold text-sm">Admin</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav />
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-4 py-2">
          <SidebarTrigger className="-ml-1" />
          <UserButton />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
