import { CreateUserLinkModal } from "@/features/protected/links/modals/CreateLink";
import { DeleteUserLinkModal } from "@/features/protected/links/modals/DeleteLink";
import { CreateUserLinkExpirationModal } from "@/features/protected/links/modals/expiration/CreateExpiration";
import { UpdateUserLinkExpirationModal } from "@/features/protected/links/modals/expiration/UpdateExpiration";
import { CreateUserLinkPasswordModal } from "@/features/protected/links/modals/protected/CreatePassword";
import { DeleteUserLinkPasswordModal } from "@/features/protected/links/modals/protected/DeletePassword";
import { UpdateUserLinkPasswordModal } from "@/features/protected/links/modals/protected/UpdatePassword";
import { CreateLinkExpirationModal } from "@/features/home/modals/CreateExpiration";
import { CreateLinkPasswordModal } from "@/features/home/modals/CreatePassword";
import { DeleteLinkModal } from "@/features/home/modals/DeleteLink";
import { DeleteLinkPasswordModal } from "@/features/home/modals/DeletePassword";


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