import GuestLayout from "@/layouts/guest-layout"
import { Head, Form } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"

interface ResetPasswordProps {
  token: string
  email: string
}

export default function ResetPassword(args: ResetPasswordProps) {
  const { token, email } = args

  return (
    <>
      <Head title="Reset Password" />

      <Form
        className="space-y-6"
        method="post"
        transform={(data) => ({ ...data, token, email })}
        action={route("password.request")}
      >
        {({ processing, errors }) => (
          <>
            <TextField
              label="Email"
              isRequired
              errorMessage={errors.email}
              type="email"
              name="email"
              autoComplete="username"
            />

            <TextField
              label="Password"
              isRequired
              errorMessage={errors.password}
              type="password"
              name="password"
              autoComplete="new-password"
              autoFocus
            />

            <TextField
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              autoComplete="new-password"
              errorMessage={errors.password_confirmation}
              isRequired
            />

            <div className="mt-4 flex items-center justify-end">
              <Button type="submit" className="ml-4" isPending={processing}>
                {processing && <Loader />}
                Reset Password
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

ResetPassword.layout = (page: any) => (
  <GuestLayout
    header="Reset Password"
    description="Please enter your email address and new password to reset your password."
    children={page}
  />
)
