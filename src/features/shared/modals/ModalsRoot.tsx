import { CreateUserLinkModal } from "@/features/dashboard/links-overview/modals/CreateLink";
import { DeleteUserLinkModal } from "@/features/dashboard/links-overview/modals/DeleteLink";
import { CreateUserLinkExpirationModal } from "@/features/dashboard/links-overview/modals/expiration/CreateExpiration";
import { UpdateUserLinkExpirationModal } from "@/features/dashboard/links-overview/modals/expiration/UpdateExpiration";
import { CreateUserLinkPasswordModal } from "@/features/dashboard/links-overview/modals/protected/CreatePassword";
import { DeleteUserLinkPasswordModal } from "@/features/dashboard/links-overview/modals/protected/DeletePassword";
import { UpdateUserLinkPasswordModal } from "@/features/dashboard/links-overview/modals/protected/UpdatePassword";
import { CreateLinkExpirationModal } from "@/features/home/modals/CreateLinkExpiration";
import { CreateLinkPasswordModal } from "@/features/home/modals/CreateLinkPassword";
import { DeleteLinkModal } from "@/features/home/modals/DeleteLink";
import { DeleteLinkPasswordModal } from "@/features/home/modals/DeleteLinkPassword";


export function ModalsRoot() {

  return (
    <>

      {/* Guest links modals */}
      <CreateLinkExpirationModal />
      <CreateLinkPasswordModal />
      <DeleteLinkModal />
      <DeleteLinkPasswordModal />

      {/* User links Modals */}
      <CreateUserLinkModal />
      <DeleteUserLinkModal />

      <CreateUserLinkPasswordModal />
      <UpdateUserLinkPasswordModal />
      <DeleteUserLinkPasswordModal />

      <CreateUserLinkExpirationModal />
      <UpdateUserLinkExpirationModal />

    </>
  )

}