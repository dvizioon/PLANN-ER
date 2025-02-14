import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [emailToInvite, setEmailToInvite] = useState([
    'jessica.white44@yahoo.com'
  ])

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  // Abrir Modal
  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  // Fechar Modal
  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function addNewEmailToInvite(event:FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailToInvite.includes(email)) {
      return
    }
    
    setEmailToInvite([
      ...emailToInvite,
      email
    ])
    
    event.currentTarget.reset()
  }

  function removerEmailsFromInvites(emailToRemove:string) {
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)
    setEmailToInvite(newEmailList)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/Logo.svg" alt="logo do site" />
          <p className="text-zinc-300">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">

            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none" />
            </div>
            <div className='w-px h-6 bg-zinc-800' />


            {isGuestInputOpen ? (
              <button onClick={closeGuestInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button onClick={openGuestInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}

          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">

              <button onClick={openGuestModal} type="button" className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="bg-transparent text-lg text-zinc-400 flex-1">Quem estará na viagem?</span>
              </button>

              <div className='w-px h-6 bg-zinc-800' />
              <button onClick={openGuestInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirma viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        {isGuestModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecionar Convidados</h2>
                  <button>
                    <X className="size-5 text-zinc-400" onClick={closeGuestModal} />
                  </button>
                </div>
                <div className="text-left">
                  <p className="text-zinc-400 text-sm">
                    Os convidados irão receber e-mails para confirmar a participação na viagem.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                {emailToInvite.map((email) => {
                  return (
                    <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2" key={email}>
                      <span className="text-zinc-300">{email}</span>
                      <button onClick={() => {
                        removerEmailsFromInvites(email)
                      }}>
                        <X className="size-4 text-zinc-400" />
                      </button>
                    </div>
                  )
                })}

              </div>

              <div className="w-full h-px bg-zinc-800" />

              <form className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2" onSubmit={addNewEmailToInvite}>
                <div className="px-2 flex items-center flex-1 gap-2">
                  <AtSign className="size-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail do convidado"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  />
                </div>
                <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5" />
                </button>
              </form>

            </div>
          </div>
        )}

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>

      </div>
    </div>
  )
}