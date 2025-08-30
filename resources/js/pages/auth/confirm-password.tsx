import GuestLayout from "@/layouts/guest-layout"
import { Head, Form } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"

export default function ConfirmPassword() {
  return (
    <>
      <Head title="Confirm Password" />

      <div className="mb-4 text-muted-fg text-sm">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <Form method="post" action={route("password.confirm")} resetOnSuccess={["password"]}>
        {({ processing, errors }) => (
          <>
            <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              errorMessage={errors.password}
              autoFocus
            />

            <div className="mt-4 flex items-center justify-end">
              <Button isPending={processing}>
                {processing && <Loader />}
                Confirm
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

ConfirmPassword.layout = (page: any) => <GuestLayout header="Confirm password" children={page} />
