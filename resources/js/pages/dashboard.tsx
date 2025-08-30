import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { CardHeader } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import type { SharedData } from "@/types/shared"

export default function Dashboard({ auth }: SharedData) {
  return (
    <>
      <Head title="Dashboard" />

      <Container className="py-12">
        <CardHeader
          title="Dashboard"
          description={`Hello, ${auth.user.name}! This is your dashboard.`}
        />
      </Container>
    </>
  )
}

Dashboard.layout = (page: any) => <AppLayout children={page} />
