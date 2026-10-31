import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 px-12 py-10">
      <h1 className="text-[32px] font-semibold tracking-[-0.9px]">ASP</h1>
      <p className="text-sm text-muted-foreground">Front-end do ASP.</p>
      <Button className="self-start">
        <Plus data-icon="inline-start" />
        Registrar refeição
      </Button>
    </main>
  )
}

export default App
