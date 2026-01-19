import { CreateUserLink } from "../admin/links-overview/modals/CreateUserLink";
import { DeleteUserLinkModal } from "../admin/links-overview/modals/DeleteUserLink";
import { DeleteUserLinkPasswordModal } from "../admin/links-overview/modals/DeleteUserLinkPassword";
import { InsertUserLinkPasswordModal } from "../admin/links-overview/modals/InsertUserLinkPassword";

export function DashboardModals() {

  return(
    <>
      <CreateUserLink />
      <DeleteUserLinkModal />
      <InsertUserLinkPasswordModal />
      <DeleteUserLinkPasswordModal />
    </>
  )

}