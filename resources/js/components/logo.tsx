import { IconBrandIntentui } from "@intentui/icons"
import type React from "react"
import { twMerge } from "tailwind-merge"

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return <IconBrandIntentui className={twMerge("size-5", className)} {...props} />
}
