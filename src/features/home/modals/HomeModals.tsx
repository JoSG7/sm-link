import { CreateLinkExpirationModal } from "./CreateLinkExpiration";
import { CreateLinkPasswordModal } from "./CreateLinkPassword";
import { DeleteLinkModal } from "./DeleteLink";
import { DeleteLinkPasswordModal } from "./DeleteLinkPassword";


export function HomeModals() {

  return(
    <>
      <DeleteLinkModal />

      <CreateLinkPasswordModal />
      <DeleteLinkPasswordModal />
      
      <CreateLinkExpirationModal />
    </>
  )
}