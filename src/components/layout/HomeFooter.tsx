import { IconBrandGithubFilled, IconBrandX } from "@tabler/icons-react";

export function Footer() {

  return (

    <section className="p-4 py-6 border-t border-[#1c1d1d] sm:p-5">
      <div className="flex gap-4 pb-3">
        <a href="https://github.com/JoSG7" target="_blank" className="flex justify-center items-center p-2 rounded-full bg-neutral-950">
          <IconBrandGithubFilled className="size-6" />
        </a>

        <div className="flex justify-center items-center p-2 rounded-full bg-neutral-950">
          <IconBrandX className="size-6" />
        </div>
      </div>

      <div className="text-sm font-medium flex gap-4">
        <span>Privacy Police</span> <span>Terms of Service</span> <span>License</span>
      </div>

      <p className="text-neutral-400 text-sm font-medium pt-1">@2025 SmLink. All Rights Reserved</p>
    </section>

  )

}