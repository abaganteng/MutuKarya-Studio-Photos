import { useRef } from "react"
import { Head, useForm } from "@inertiajs/react"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/pages/settings/settings-layout"

const title = "Change Password"

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)
  const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
      },
      onError: () => {
        if (errors.password) {
          reset("password", "password_confirmation")
          passwordInput.current?.focus()
        }

        if (errors.current_password) {
          reset("current_password")
          currentPasswordInput.current?.focus()
        }
      },
    })
  }

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Description>
            Ensure your account is using a long, random password to stay secure.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <Form validationErrors={errors} onSubmit={submit} className="max-w-lg space-y-6">
            <TextField
              label="Current Password"
              value={data.current_password}
              onChange={(v) => setData("current_password", v)}
              type="password"
              autoComplete="current-password"
              isRevealable
              autoFocus
              isRequired
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              value={data.password}
              autoComplete="current-password"
              onChange={(v) => setData("password", v)}
              errorMessage={errors.password}
              isRevealable
              isRequired
            />

            <TextField
              type="password"
              label="Confirm Password"
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={(v) => setData("password_confirmation", v)}
              errorMessage={errors.password_confirmation}
              isRevealable
              isRequired
            />

            <div className="flex items-center gap-4">
              <Button type="submit" isDisabled={processing}>
                Save
              </Button>

              {recentlySuccessful && <p className="text-muted-fg text-sm">Saved.</p>}
            </div>
          </Form>
        </Card.Content>
      </Card>
    </>
  )
}

Password.layout = (page: any) => (
  <AppLayout>
    <SettingsLayout children={page} />
  </AppLayout>
)
