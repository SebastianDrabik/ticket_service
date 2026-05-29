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
import { useLogout } from '#/hooks/useLogout'
import { TbDashboard, TbLogin2, TbSettings2 } from 'react-icons/tb'
import { ButtonWithIcon } from './ButtonWithIcon'
import { LinkWithIcon } from './LinkWithIcon'

export function AuthHeaderButton({ className }: { className?: string }) {
  const { session } = RootRoute.useRouteContext()
  const logout = useLogout()

  const userMenuItems: (({ name: string; destination: string; icon: React.ComponentType; } | {name: string; icon: React.ComponentType; action: () => any, variant?: string })[])[] = [
    [
      {
        name: 'Dashboard',
        destination: '/user/dashboard',
        icon: TbDashboard
      },
      {
        name: 'Settings',
        destination: '/user/dashboard',
        icon: TbSettings2
      }
    ],
    [
      {
        name: 'Sign out',
        action: () => logout(),
        icon: TbLogin2,
        variant: 'destructive'
      }
    ]
  ]

  return <div className={className || ''}>
    {session?.user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='rounded-sm border bg-popover min-w-fit mx-2'>
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
            </DropdownMenuGroup>
              {userMenuItems.map((group, index) => (
                <DropdownMenuGroup key={index}>
                  {group.map((item, idx) => (
                    'destination' in item ? (
                      <DropdownMenuItem key={idx}>
                        <LinkWithIcon icon={item.icon} to={item.destination} className='w-full'>
                          {item.name}
                        </LinkWithIcon>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        key={idx}
                        onSelect={item.action}
                        className={item.variant === 'destructive' ? 'text-destructive' : ''}
                      >
                        <div className='flex items-center gap-2'>
                          <item.icon />
                          {item.name}
                        </div>
                      </DropdownMenuItem>
                    )
                  ))}
                  {index < userMenuItems.length - 1 && <DropdownMenuSeparator />}
                </DropdownMenuGroup>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <ButtonWithIcon icon={TbLogin2} variant='ghost' iconSize={5} iconColor='var(--color-primary)'>
        <Link to="/user/login">Login</Link>
      </ButtonWithIcon>
    )}
  </div>
}