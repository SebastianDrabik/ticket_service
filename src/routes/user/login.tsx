import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Field as UIField, FieldContent, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { Spinner } from '#/components/ui/spinner'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { TbBrandFacebookFilled, TbBrandGithubFilled, TbBrandGoogleFilled } from 'react-icons/tb'
import { authClient } from "#/features/auth/auth-client";
import { ButtonWithIcon } from '#/components/ButtonWithIcon'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { normalizeErrors } from '#/lib/utils'

export const Route = createFileRoute('/user/login')({
  staticData: {
    requireAuth: 'guest',
  },
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
    onSubmit: async ({ value }) => {
      setError(undefined)

      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.remember,
      })

      if (error) {
        setError(error.message)
        return
      }

      await router.invalidate()
      await router.navigate({ to: '/user/dashboard' })
    },
  })

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
          <ButtonWithIcon icon={TbBrandGoogleFilled} iconSize={5} iconColor='var(--color-primary)' variant="outline">
            Login with Google
          </ButtonWithIcon>
          <ButtonWithIcon icon={TbBrandGithubFilled} iconSize={5} iconColor='var(--color-primary)' variant="outline">
            Login with Github
          </ButtonWithIcon>
          <ButtonWithIcon icon={TbBrandFacebookFilled} iconSize={5} iconColor='var(--color-primary)' variant="outline">
            Login with Facebook
          </ButtonWithIcon>
        </div>

        <form
          className='space-y-4'
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name='email'
            validators={{
              onBlur: ({ value }) => (value.trim() ? undefined : 'Email is required'),
            }}
          >
            {(field) => (
              <UIField data-invalid={field.state.meta.errors.length > 0}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    disabled={form.state.isSubmitting}
                    type='email'
                    placeholder='you@example.com'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                </FieldContent>
              </UIField>
            )}
          </form.Field>

          <form.Field
            name='password'
            validators={{
              onBlur: ({ value }) => (value.trim() ? undefined : 'Password is required'),
            }}
          >
            {(field) => (
              <UIField data-invalid={field.state.meta.errors.length > 0} className='mt-4'>
                <FieldLabel htmlFor={field.name}>
                  Password <Button type='button' variant="link" className='h-0 ml-auto mr-2 my-0 text-sm text-muted-foreground'>Forgot password?</Button>
                </FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    disabled={form.state.isSubmitting}
                    type='password'
                    placeholder='••••••••'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                </FieldContent>
              </UIField>
            )}
          </form.Field>

          <form.Field name='remember'>
            {(field) => (
              <UIField orientation='horizontal' className='mt-4'>
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(value) => field.handleChange(Boolean(value))}
                />
                <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
              </UIField>
            )}
          </form.Field>

          {error && <div className='text-sm text-red-500 mt-2'>{error}</div>}

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button className='w-full mt-6' type='submit' disabled={isSubmitting}>
                {isSubmitting ? <span className='flex items-center gap-2 justify-center'>
                  <Spinner />
                  Logging in...
                </span> : 'Login'}
              </Button>
            )}
          </form.Subscribe>
        </form>
        <Separator className='my-6' />
        <div className='text-center text-sm text-muted-foreground'>
          Don't have an account? <Link to='/user/register' className='text-accent'>Register</Link>
        </div>
      </CardContent>
    </Card>
  </div>
}
