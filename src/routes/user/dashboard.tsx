import { createFileRoute } from '@tanstack/react-router'
import { useLogout } from '#/hooks/useLogout'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/user/dashboard')({
  component: DashboardComponent,
  staticData: {
    requireAuth: 'user',
  }
})

function DashboardComponent() {
  const { session } = Route.useRouteContext()

  const logout = useLogout()

  const user = session!.user

  return (
    <div>
      <h1 className='text-3xl font-bold'>Welcome to your dashboard, {user.name}!</h1>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}