import { usePage } from "@inertiajs/react"
import { IconChevronLgDown, IconLogout } from "@intentui/icons"
import { useEffect, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { buttonStyles } from "@/components/ui/button"
import { Menu } from "@/components/ui/menu"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar"
import { Logo } from "@/components/logo"
import type { SharedData } from "@/types/shared"
import { Link } from "@/components/ui/link"

const navigations = [
  {
    name: "Home",
    textValue: "Home",
    href: "/",
  },
]

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  const page = usePage()
  const { auth } = usePage<SharedData>().props
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => setIsOpen(false), [page.url])
  return (
    <NavbarProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      <Navbar {...props}>
        <NavbarStart>
          <Link href="/" aria-label="Logo">
            <Logo />
          </Link>
        </NavbarStart>
        <NavbarGap />

        <NavbarSection>
          {navigations.map((item) => (
            <NavbarItem isCurrent={item.href === page.url} key={item.href} href={item.href}>
              {item.name}
            </NavbarItem>
          ))}
          <NavbarItem target="_blank" href="https://intentui.com" className="justify-between">
            Documentation
          </NavbarItem>
          <NavbarItem target="_blank" href="https://irsyad.co/blocks">
            Blocks
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="ml-auto hidden gap-x-2 lg:flex">
          {auth.user ? (
            <UserMenu />
          ) : (
            <>
              <NavbarItem href="/login">Login</NavbarItem>
              <NavbarItem href="/register">Register</NavbarItem>
            </>
          )}
        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <NavbarSection>
          {auth.user ? (
            <UserMenu />
          ) : (
            <NavbarItem
              className={buttonStyles({
                intent: "outline",
                size: "sm",
              })}
              href="/login"
            >
              Login
            </NavbarItem>
          )}
        </NavbarSection>
      </NavbarMobile>
    </NavbarProvider>
  )
}

function UserMenu() {
  const { auth } = usePage<SharedData>().props
  return (
    <Menu>
      <Menu.Trigger
        className="group flex items-start justify-between rounded-lg p-1 text-left data-hovered:bg-secondary"
        aria-label="Open menu"
      >
        <Avatar
          src={auth.user.gravatar}
          shape="square"
          className="mr-2 size-7 *:size-7 sm:size-9 sm:*:size-9"
        />
        <div className="hidden flex-col pr-2 sm:flex">
          <strong className="font-semibold text-sm">{auth.user.name}</strong>
          <span className="text-xs">{auth.user.email}</span>
        </div>
        <IconChevronLgDown className="transition-transform group-data-pressed:rotate-180" />
      </Menu.Trigger>
      <Menu.Content placement="bottom end" className="sm:min-w-56">
        <Menu.Section>
          <Menu.Header separator className="relative">
            <div>{auth.user.name}</div>
            <div className="truncate whitespace-nowrap pr-6 font-normal text-muted-fg text-sm">
              {auth.user.email}
            </div>
          </Menu.Header>
        </Menu.Section>
        <Menu.Item href="/dashboard">
          <Menu.Label>Dashboard</Menu.Label>
        </Menu.Item>
        <Menu.Item href="/settings/profile" className="justify-between">
          <Menu.Label>Update profile</Menu.Label>
        </Menu.Item>
        <Menu.Item href="/settings/password" className="justify-between">
          <Menu.Label>Change password</Menu.Label>
        </Menu.Item>
        <Menu.Item href="/settings/appearance" className="justify-between">
          <Menu.Label>Appearance</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item routerOptions={{ method: "post" }} href="/logout">
          <Menu.Label>Logout</Menu.Label>
          <IconLogout />
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
