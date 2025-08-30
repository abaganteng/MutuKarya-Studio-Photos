import GuestLayout from "@/layouts/guest-layout"
import { Form, Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"

export default function Register() {
  return (
    <>
      <Head title="Register" />

      <Form
        method="post"
        action="/register"
        resetOnSuccess={["password", "password_confirmation"]}
        disableWhileProcessing
        className="flex flex-col gap-y-4"
      >
        {({ processing, errors }) => (
          <>
            <TextField
              type="text"
              name="name"
              label="Name"
              placeholder="Your name"
              autoComplete="name"
              autoFocus
              errorMessage={errors.name}
              isRequired
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="you@domain.com"
              autoComplete="username"
              errorMessage={errors.email}
              isRequired
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="Shhh, it's secret"
              autoComplete="current-password"
              errorMessage={errors.password}
              isRequired
            />

            <TextField
              type="password"
              label="Confirm Password"
              name="password_confirmation"
              placeholder="Shhh, it's secret"
              errorMessage={errors.password_confirmation}
              isRequired
            />
            <Button type="submit" className="w-full" isPending={processing}>
              {processing && <Loader />}
              Register
            </Button>
            <div className="text-center">
              <Link href="/login" intent="secondary" className="sm:text-sm">
                Already registered?
              </Link>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

Register.layout = (page: React.ReactNode) => (
  <GuestLayout header="Register" description="Create an account to get started." children={page} />
)
