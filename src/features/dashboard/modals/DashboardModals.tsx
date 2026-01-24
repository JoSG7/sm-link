import { CreateUserLink } from "../admin/links-overview/modals/CreateUserLink";
import { DeleteUserLinkModal } from "../admin/links-overview/modals/DeleteUserLink";
import { CreateUserLinkExpirationModal } from "../admin/links-overview/modals/links-expiration/CreateUserLinkExpiration";
import { UpdateUserLinkExpirationModal } from "../admin/links-overview/modals/links-expiration/UpdateUserLinkExpiration";
import { DeleteUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/DeleteUserLinkPassword";
import { EditUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/EditUserLinkPassword";
import { InsertUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/InsertUserLinkPassword";

export function DashboardModals() {

  return(
    <>
      <CreateUserLink />
      <DeleteUserLinkModal />
      
      <InsertUserLinkPasswordModal />
      <DeleteUserLinkPasswordModal />
      <EditUserLinkPasswordModal />

      <CreateUserLinkExpirationModal />
      <UpdateUserLinkExpirationModal />
    </>
  )

}