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

    </>
  )

}