import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { Field as UIField, FieldContent, FieldDescription, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { createBusiness } from '#/features/business/business.functions'
import { normalizeErrors } from '#/lib/utils'

export const Route = createFileRoute('/business/create')({
  component: RouteComponent,
  staticData: {
    requireAuth: 'user'
  }
})

function RouteComponent() {
  const [submitError, setSubmitError] = useState<string | undefined>()
  const [submitSuccess, setSubmitSuccess] = useState<string | undefined>()

  const form = useForm({
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      nip: '',
      email: '',
      description: '',
      image: '',
    },
    onSubmit: async ({ value }) => {
      setSubmitError(undefined)

      try {
        const result = await createBusiness({
          data: {
            name: value.name.trim(),
            address: value.address.trim(),
            phoneNumber: value.phoneNumber.trim(),
            nip: value.nip.trim(),
            email: value.email.trim(),
            description: value.description.trim() || undefined,
            image: value.image.trim() || undefined,
          },
        })

        if (result.success) {
          setSubmitSuccess('Business created successfully.')
          form.reset()
        } else {
          setSubmitError(result.message || 'Failed to create business')
        }
      } catch (error) {
        setSubmitSuccess(undefined)
        setSubmitError(error instanceof Error ? error.message : 'Failed to create business')
      }
    },
  })

  return (
    <div className='flex items-center justify-center my-20'>
      <Card className='w-full max-w-2xl mx-2'>
          <CardHeader>
          <CardTitle className='text-2xl'>Create your business</CardTitle>
          <CardDescription>
            Fill in the public contact and billing details for your business.
          </CardDescription>
          </CardHeader>
          <CardContent>
            <form
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              void form.handleSubmit()
            }}
          >
            <form.Field
              name='name'
              validators={{
                onBlur: ({ value }) => (value.trim() ? undefined : 'Business name is required'),
              }}
            >
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Business name</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      placeholder='Acme Events'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldDescription>The name people will see first.</FieldDescription>
                    <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            <form.Field
              name='email'
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return 'Email is required'
                  return /^\S+@\S+\.\S+$/.test(value.trim()) ? undefined : 'Enter a valid email address'
                },
              }}
            >
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Business email</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      type='email'
                      placeholder='hello@company.com'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldDescription>Used for contact and verification.</FieldDescription>
                    <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            <div className='grid gap-4 md:grid-cols-2 sm:grid-cols-1'>
              <form.Field
                name='phoneNumber'
                validators={{
                  onBlur: ({ value }) => (value.trim() ? undefined : 'Phone number is required'),
                }}
              >
                {(field) => (
                  <UIField data-invalid={field.state.meta.errors.length > 0}>
                    <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        type='tel'
                        placeholder='+48 698 123 456'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      <FieldDescription>Customers will use this to reach you quickly.</FieldDescription>
                      <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                    </FieldContent>
                  </UIField>
                )}
              </form.Field>

              <form.Field
                name='nip'
                validators={{
                  onBlur: ({ value }) => (value.trim() ? undefined : 'NIP is required'),
                }}
              >
                {(field) => (
                  <UIField data-invalid={field.state.meta.errors.length > 0}>
                    <FieldLabel htmlFor={field.name}>NIP</FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        placeholder='1234567890'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      <FieldDescription>Used for tax identification.</FieldDescription>
                      <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                    </FieldContent>
                  </UIField>
                )}
              </form.Field>
            </div>

            <form.Field name='image'>
              {(field) => (
                <UIField>
                  <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      type='url'
                      placeholder='https://example.com/logo.png'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldDescription>Optional logo or cover image link.</FieldDescription>
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            <form.Field name='address'>
              {(field) => (
                <UIField data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      placeholder='123 Main Street, Warsaw'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldDescription>The primary address shown on your business profile.</FieldDescription>
                    <FieldError errors={normalizeErrors(field.state.meta.errors)} />
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            <form.Field name='description'>
              {(field) => (
                <UIField>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id={field.name}
                      placeholder='Tell customers what your business does...'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldDescription>Optional short introduction or company bio.</FieldDescription>
                  </FieldContent>
                </UIField>
              )}
            </form.Field>

            {submitError ? <div className='text-sm text-destructive'>{submitError}</div> : null}
            {submitSuccess ? <div className='text-sm text-emerald-600'>{submitSuccess}</div> : null}

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <Button className='w-full mt-6' type='submit' disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <span className='flex items-center gap-2 justify-center'>
                      <Spinner />
                      Creating business...
                    </span>
                  ) : (
                    'Create business'
                  )}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
