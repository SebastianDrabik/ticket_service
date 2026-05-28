import { Route as RootRoute } from '#/routes/__root'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from '#/lib/auth-client'
import { useLogout } from '#/hooks/useLogout'

export function AuthHeaderButton({ className }: { className?: string }) {
  const { session } = RootRoute.useRouteContext()
  const logout = useLogout()

  return <div className={className || ''}>
    {session?.user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='rounded-sm border bg-popover p-2 min-w-fit'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className='flex gap-2 items-center'>
                <Avatar size='lg'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-bold text-lg text-accent'>{session.user.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {session.user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/user/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/user/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant='link' className='text-red-500 hover:text-red-600 p-0 m-0 h-auto' onClick={() => authClient.signOut({
                fetchOptions: {
                  onSuccess: () => { logout() }
                }
              })}>Sign out</Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Link to="/user/login">Login</Link>
    )}
  </div>
}