import GuestLayout from "@/layouts/guest-layout"
import { Head, Form } from "@inertiajs/react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "@/components/ui/link"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"

interface LoginProps {
  status: string
  canResetPassword: boolean
}

export default function Login(args: LoginProps) {
  const { status, canResetPassword } = args
  // const { data, setData, post, processing, errors, reset } = useForm({
  //   email: "",
  //   password: "",
  //   remember: "",
  // })
  //
  // useEffect(() => {
  //   return () => {
  //     reset("password")
  //   }
  // }, [])
  //
  // const submit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //
  //   post("/login")
  // }

  return (
    <>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-emerald-600 text-sm dark:text-emerald-400">
          {status}
        </div>
      )}

      <Form
        method="post"
        action="/login"
        resetOnSuccess={["password"]}
        className="flex flex-col gap-y-4"
      >
        {({ processing, errors }) => (
          <>
            <TextField
              label="Email"
              type="email"
              name="email"
              autoComplete="username"
              autoFocus
              errorMessage={errors.email}
              isRequired
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              errorMessage={errors.password}
              autoComplete="current-password"
              isRequired
            />
            <div className="flex items-center justify-between">
              <Checkbox name="remember">Remember me</Checkbox>
              {canResetPassword && (
                <Link href="/forgot-password" className="sm:text-sm" intent="secondary">
                  Forgot your password?
                </Link>
              )}
            </div>
            <Button isPending={processing} type="submit">
              {processing && <Loader />}
              Log in
            </Button>
            <div className="text-center">
              <Link href="/register" className="sm:text-sm" intent="secondary">
                Dont have account? Register
              </Link>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

Login.layout = (page: React.ReactNode) => (
  <GuestLayout
    header="Login"
    description="Sign in with your email or continue with a connected account."
    children={page}
  />
)
