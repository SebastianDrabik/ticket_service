import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { Spinner } from '#/components/ui/spinner'
import { authClient } from '#/lib/auth-client'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { TbBrandFacebookFilled, TbBrandGithubFilled, TbBrandGoogleFilled } from 'react-icons/tb'

export const Route = createFileRoute('/user/register')({
  component: RouteComponent,
  staticData: {
    requireAuth: false,
  },
})

function RouteComponent() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState<Date | undefined>(undefined)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [tos, setTos] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const signUp = async () => {
    if (!tos) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    if (!dob) {
      setError('You must provide your date of birth')
      return
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }

    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: firstName,
      surname: lastName,
      dateOfBirth: dob,
      phoneNumber: phoneNumber || undefined,
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
        <CardTitle className='text-2xl'>Create your account</CardTitle>
        <CardDescription>
          Create your new account by filling in the information below or use one of the social login options to register quickly.
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
          <Input
            type='email'
            placeholder='you@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <div className='mt-4 grid md:grid-cols-2 gap-4 sm:grid-cols-1'>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              type='text'
              placeholder='John'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input
              type='text'
              placeholder='Doe'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Field>
        </div>
        <Field className='mt-4'>
          <FieldLabel>Date of birth</FieldLabel>
          <Input type='date' value={dob ? dob.toISOString().split('T')[0] : ''} onChange={(e) => setDob(new Date(e.target.value))} />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Phone number</FieldLabel>
          <Input type='tel' placeholder='+48 698 123 456' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Password</FieldLabel>
          <Input
            type='password'
            placeholder='••••••••'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Repeat password</FieldLabel>
          <Input
            type='password'
            placeholder='••••••••'
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <FieldDescription>Has to match the password above.</FieldDescription>
        </Field>
        <Field orientation="horizontal" className='mt-4'>
          <Checkbox
            id="tos"
            checked={tos}
            required
            onCheckedChange={(val) => setTos(Boolean(val))}
          />
          <FieldLabel htmlFor="tos">I agree to the Terms of Service and Privacy Policy</FieldLabel>
        </Field>
        {error ? <div className='text-destructive text-sm mt-2'>{error}</div> : null}
        <Button className='w-full mt-6' disabled={loading} onClick={() => {signUp()}}>
          {loading ? <span className='flex items-center gap-2 justify-center'>
            <Spinner />
            Creating account...
          </span> : 'Register'}
        </Button>
        <Separator className='my-6' />
        <div className='text-center text-sm text-muted-foreground'>
          Already have an account? <Link to='/user/login' className='text-accent'>Login</Link>
        </div>
      </CardContent>
    </Card>
  </div>
}
