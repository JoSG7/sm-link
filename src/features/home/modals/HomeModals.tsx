import { AddLinkPasswordModal } from "./AddLinkPassword";
import { DeleteLinkModal } from "./DeleteLink";
import { RemoveLinkPasswordModal } from "./RemoveLinkPassword";
import { SetLinkExpirationModal } from "./SetLinkExpiration";


export function HomeModals() {

  return(
    <>
      <AddLinkPasswordModal />
      <DeleteLinkModal />
      <RemoveLinkPasswordModal />
      <SetLinkExpirationModal />
    </>
  )
}