import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { useLogout } from '#/hooks/useLogout'

export const Route = createFileRoute('/user/dashboard')({
  component: DashboardComponent,
  staticData: {
    requireAuth: true,
  }
})

function DashboardComponent() {
  const { session } = Route.useRouteContext()

  const logout = useLogout()

  const user = session!.user

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user.name || user.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>Sign out</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Email</CardTitle></CardHeader>
          <CardContent><p className="font-medium">{user.email}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Account ID</CardTitle></CardHeader>
          <CardContent><p className="font-mono text-sm truncate">{user.id}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Email verified</CardTitle></CardHeader>
          <CardContent>
            <span className={`text-sm font-medium ${user.emailVerified ? 'text-green-500' : 'text-yellow-500'}`}>
              {user.emailVerified ? 'Verified' : 'Not verified'}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Date of birth</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{user.dateOfBirth ? user.dateOfBirth.toLocaleDateString() : 'Not provided'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Full name</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{user.name} {user.surname}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Phone number</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{user.phoneNumber || 'Not provided'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}