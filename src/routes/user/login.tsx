import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/user/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formType, setFormType] = useState<'login' | 'register'>('login')

  return <div className='flex items-center justify-center my-20'>
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row'>
          
        </div>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type='email' placeholder='you@example.com' />
        </Field>
        <Field className='mt-4'>
          <FieldLabel>Password</FieldLabel>
          <Input type='password' placeholder='••••••••' />
        </Field>
        <Button className='w-full mt-6'>Login</Button>
      </CardContent>
    </Card>
  </div>
}
