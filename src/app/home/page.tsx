import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartLineMultiple } from "@/components/chart-line-multiple"
import { ChartPieDonutText } from "@/components/chart-pie-donut-text"
import { ChartRadialSimple } from "@/components/chart-radial-simple"
import { ChartRadialStacked } from "@/components/chart-radial-stacked"
import { DataTable } from "@/components/data-table"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <ChartRadialSimple />
            <ChartLineMultiple />
            <ChartRadialStacked />
            <ChartPieDonutText />
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <ChartAreaInteractive />
          <DataTable data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
