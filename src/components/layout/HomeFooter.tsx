import { IconBrandGithubFilled, IconBrandX } from "@tabler/icons-react";

export function Footer() {

  return (

    <section className="flex justify-center border-t border-graphite">
      <div className="w-[90vw] py-5 lg-2:max-w-5xl">
        <div className="flex gap-4 pb-3 xs:gap-5 xs:pb-4">
          <a href="https://github.com/JoSG7" target="_blank" className="flex items-center justify-center p-2 rounded-full bg-neutral-950">
            <IconBrandGithubFilled className="size-6 xs:size-8 sm:size-10" />
          </a>

          <div className="flex items-center justify-center p-2 rounded-full bg-neutral-950">
            <IconBrandX className="size-6 xs:size-8 sm:size-10" />
          </div>
        </div>

        <div className="flex gap-4 font-medium text-sm-movil lg-2:text-lg">
          <span>Privacy Police</span> <span>Terms of Service</span> <span>License</span>
        </div>

        <p className="pt-1 font-medium text-neutral-400 text-sm-movil lg-2:text-lg">@2025 SmLink. All Rights Reserved</p>
      </div>
    </section>

  )

}