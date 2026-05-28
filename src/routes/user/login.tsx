import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { TbBrandFacebookFilled, TbBrandGithubFilled, TbBrandGoogleFilled } from 'react-icons/tb'
import { authClient } from "#/lib/auth-client";
import { useState } from 'react'
import { Spinner } from '#/components/ui/spinner'

export const Route = createFileRoute('/user/login')({
  staticData: {
    requireAuth: false,
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const login = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: remember
    }, {
      onRequest() {
        setLoading(true)
      },
      onResponse() {
        setLoading(false)
      },
    })

    if (error) {
      setError(error.message)
    } else {
      await router.invalidate()
      await router.navigate({ to: '/user/dashboard' })
    }
  }

  return <div className='flex items-center justify-center my-20'>
    <Card className='w-full max-w-2xl mx-2'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password or use one of the social login options to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex gap-4 mb-6 flex-wrap'>
          <Button variant="outline" className='flex items-center gap-2'>
            <TbBrandGoogleFilled className="text-primary size-5" />
            Login with Google
          </Button>
          <Button variant="outline" className='flex items-center gap-2'>
            <TbBrandGithubFilled className='text-primary size-5' />
            Login with Github
          </Button>
          <Button variant="outline" className='flex items-center gap-2'>
            <TbBrandFacebookFilled className='text-primary size-5' />
            Login with Facebook
          </Button>
        </div>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input disabled={loading} type='email' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Password <Button variant="link" className='h-0 ml-auto mr-2 my-0 text-sm text-muted-foreground'>Forgot password?</Button></FieldLabel>
          <Input disabled={loading} type='password' placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field orientation="horizontal" className='mt-4'>
          <Checkbox id="remember" checked={remember} onCheckedChange={(e) => setRemember(e as boolean)} />
          <FieldLabel htmlFor="remember">Remember me</FieldLabel>
        </Field>
        {error && <div className='text-sm text-red-500 mt-2'>{error}</div>}
        <Button className='w-full mt-6' onClick={login} disabled={loading}>
          {loading ? <span className='flex items-center gap-2 justify-center'>
            <Spinner />
            Logging in...
          </span> : "Login"}
        </Button>
        <Separator className='my-6' />
        <div className='text-center text-sm text-muted-foreground'>
          Don't have an account? <Link to='/user/register' className='text-accent'>Register</Link>
        </div>
      </CardContent>
    </Card>
  </div>
}
