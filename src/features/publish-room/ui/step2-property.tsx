// ui/Step1.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { useFormState } from '../model/useFormState'

const schema = z.object({
  name: z.string().min(1),
  age: z.number().min(18),
})

export function Step2() {
  const navigate = useNavigate()
  const { data, setData } = useFormState()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name || '',
      age: data.age || 18,
    },
  })




  return (

    <form
      onSubmit={
        handleSubmit(values => {
          setData(values)
          navigate('/publish-form/step2', { replace: true })
        })}
    >
      <input {...register('name')} />
      {errors.name?.message}

      <input type="number" {...register('age', { valueAsNumber: true })} />
      <button type="submit"> Next </button>
    </form>
  )
}
