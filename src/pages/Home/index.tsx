import { HandPalm, Play } from 'phosphor-react'

import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { Countdown } from '../../components/Home/Countdown'
import { NewCycleForm } from '../../components/Home/NewCycleForm'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCyclesId(id)
    setamountSecondsPassed(0)

    reset()
  }
  function handleInterrupCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCyclesId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCyclesId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task') && watch('minutesAmount')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <NewCycleForm />
      <Countdown
        activeCycle={activeCycle}
        setCycles={setCycles}
        activeCyclesId={activeCyclesId}
      />

      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterrupCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
