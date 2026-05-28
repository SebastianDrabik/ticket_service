import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'
import { TbBrandFacebookFilled, TbBrandGithubFilled, TbBrandGoogleFilled } from 'react-icons/tb'

export const Route = createFileRoute('/user/register')({
  component: RouteComponent,
  staticData: {
    requireAuth: false,
  },
})

function RouteComponent() {
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
          <Input type='email' placeholder='you@example.com' />
        </Field>
        <div className='mt-4 grid md:grid-cols-2 gap-4 sm:grid-cols-1'>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input type='text' placeholder='John' />
          </Field>
          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input type='text' placeholder='Doe' />
          </Field>
        </div>
        <Field className='mt-4'>
          <FieldLabel>Date of birth</FieldLabel>
          <Input type='date' />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Password</FieldLabel>
          <Input type='password' placeholder='••••••••' />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Repeat password</FieldLabel>
          <Input type='password' placeholder='••••••••' />
        </Field>
        <Field orientation="horizontal" className='mt-4'>
          <Checkbox id="tos" />
          <FieldLabel htmlFor="tos">I agree to the Terms of Service and Privacy Policy</FieldLabel>
        </Field>
        <Button className='w-full mt-6'>Register</Button>
        <Separator className='my-6' />
        <div className='text-center text-sm text-muted-foreground'>
          Already have an account? <Link to='/user/login' className='text-accent'>Login</Link>
        </div>
      </CardContent>
    </Card>
  </div>
}
