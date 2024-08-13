import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod' 

import { HomeContainer,
  FormContainer, 
  CountdownContainer, 
  Separator, 
  StartCountdownButton, 
  MinutesAmountInput, 
  TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object ({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser no mínimo de 5 minutos').max(60, 'O ciclo precisa ser no máximo de 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset();
  }

  const task = watch ('task')
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
        <label htmlFor="task">vou trabalhar em</label>
        <TaskInput 
        placeholder="De um nome para o seu projeto" 
        id="task" 
        list="task-suggestions" 
        {...register('task')}
        />

        <datalist id="task-suggestions" >
          <option value="Projeto 1"></option>
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
          <option value="Projeto 4"></option>
        </datalist>

        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput placeholder="00" type="number" id="minutesAmount" 
        step={5} 
        min={5} 
        max={60}
        {...register('minutesAmount', {valueAsNumber: true})}
      />

        <span>minutos.</span>
        </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        Começar
      <Play size={24} />
      </StartCountdownButton> 
      </form>
    </HomeContainer>
  )
}
