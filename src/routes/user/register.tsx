import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Field as UIField, FieldContent, FieldDescription, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/features/auth/auth-client'
import { normalizeErrors } from '#/lib/utils'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
// import { TbBrandFacebookFilled, TbBrandGithubFilled, TbBrandGoogleFilled } from 'react-icons/tb'

export const Route = createFileRoute('/user/register')({
  component: RouteComponent,
  staticData: {
    requireAuth: 'guest',
  },
})

function RouteComponent() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)

  const form = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      dob: '',
      password: '',
      repeatPassword: '',
      tos: false,
      phoneNumber: '',
    },
    onSubmit: async ({ value }) => {
      if (!value.tos) {
        setError('You must agree to the Terms of Service and Privacy Policy')
        return
      }

      if (!value.dob) {
        setError('You must provide your date of birth')
        return
      }

      if (value.password !== value.repeatPassword) {
        setError('Passwords do not match')
        return
      }

      setError(undefined)

      const { error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.firstName,
        surname: value.lastName,
        dateOfBirth: new Date(value.dob),
        phoneNumber: value.phoneNumber || undefined,
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
        <CardTitle className='text-2xl'>Create your account</CardTitle>
        <CardDescription>
          Create your new account by filling in the information below or use one of the social login options to register quickly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className='flex gap-4 mb-6 flex-wrap'>
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
        </div> */}

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
                    type='email'
                    placeholder='you@example.com'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>Will be used to contact you and for account verification.</FieldDescription>
                  <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                </FieldContent>
              </UIField>
            )}
          </form.Field>

          <div className='mt-4 grid gap-4 md:grid-cols-2 sm:grid-cols-1'>
            <form.Field
              name='firstName'
              validators={{
                onBlur: ({ value }) => (value.trim() ? undefined : 'First name is required'),
              }}
            >
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      type='text'
                      placeholder='John'
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
              name='lastName'
              validators={{
                onBlur: ({ value }) => (value.trim() ? undefined : 'Last name is required'),
              }}
            >
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      type='text'
                      placeholder='Doe'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>
          </div>

          <div className='mt-4 grid gap-4 md:grid-cols-2 sm:grid-cols-1'>
            <form.Field
              name='dob'
              validators={{
                onBlur: ({ value }) => (value ? undefined : 'Date of birth is required'),
              }}
            >
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Date of birth</FieldLabel>
                  <FieldContent>
                    <Input id={field.name} type='date' value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                    <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            <form.Field name='phoneNumber'>
              {(field) => (
                <UIField>
                  <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                  <FieldContent>
                    <Input id={field.name} type='tel' placeholder='+48 698 123 456' value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>
          </div>

          <form.Field
            name='password'
            validators={{
              onBlur: ({ value }) => (value.trim() ? undefined : 'Password is required'),
            }}
          >
            {(field) => (
              <UIField data-invalid={field.state.meta.errors.length > 0} className='mt-4'>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type='password'
                    placeholder='••••••••'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                  <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                </FieldContent>
              </UIField>
            )}
          </form.Field>

          <form.Field
            name='repeatPassword'
            validators={{
              onBlur: ({ value, fieldApi }) => {
                if (!value.trim()) return 'Repeat password is required'
                return value === fieldApi.form.state.values.password ? undefined : 'Passwords do not match'
              },
            }}
          >
            {(field) => (
              <UIField data-invalid={field.state.meta.errors.length > 0} className='mt-4'>
                <FieldLabel htmlFor={field.name}>Repeat password</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type='password'
                    placeholder='••••••••'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>Has to match the password above.</FieldDescription>
                  <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                </FieldContent>
              </UIField>
            )}
          </form.Field>

          <form.Field name='tos'>
            {(field) => (
              <UIField orientation="horizontal" className='mt-4'>
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(val) => field.handleChange(Boolean(val))}
                />
                <FieldLabel htmlFor={field.name}>I agree to the Terms of Service and Privacy Policy</FieldLabel>
              </UIField>
            )}
          </form.Field>

          {error ? <div className='text-destructive text-sm mt-2'>{error}</div> : null}

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button className='w-full mt-6' type='submit' disabled={isSubmitting}>
                {isSubmitting ? <span className='flex items-center gap-2 justify-center'>
                  <Spinner />
                  Creating account...
                </span> : 'Register'}
              </Button>
            )}
          </form.Subscribe>
        </form>
        <Separator className='my-6' />
        <div className='text-center text-sm text-muted-foreground'>
          Already have an account? <Link to='/user/login' className='text-accent'>Login</Link>
        </div>
      </CardContent>
    </Card>
  </div>
}
