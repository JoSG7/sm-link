import { DashboardModals } from "@/features/dashboard/modals/DashboardModals";
import { HomeModals } from "@/features/home/modals/HomeModals";


export function ModalsRoot() {

  return(
    <>
      <HomeModals />
      <DashboardModals />
    </>
  )

}