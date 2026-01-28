import { CreateUserLink } from "../admin/links-overview/modals/CreateUserLink";
import { DeleteUserLinkModal } from "../admin/links-overview/modals/DeleteUserLink";
import { CreateUserLinkExpirationModal } from "../admin/links-overview/modals/links-expiration/CreateUserLinkExpiration";
import { UpdateUserLinkExpirationModal } from "../admin/links-overview/modals/links-expiration/UpdateUserLinkExpiration";
import { CreateUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/CreateUserLinkPassword";
import { DeleteUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/DeleteUserLinkPassword";
import { UpdateUserLinkPasswordModal } from "../admin/links-overview/modals/protected-links/UpdateUserLinkPassword";

export function DashboardModals() {

  return(
    <>
      <CreateUserLink />
      <DeleteUserLinkModal />
      
      <CreateUserLinkPasswordModal />
      <DeleteUserLinkPasswordModal />
      <UpdateUserLinkPasswordModal />

      <CreateUserLinkExpirationModal />
      <UpdateUserLinkExpirationModal />
    </>
  )

}