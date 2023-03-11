'use client'

// https://github.com/vercel/next.js/issues/45054
//import { signal } from '@preact/signals-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { form } from "./styles";
//import styles from './page.module.css';

const schema = z.object({
  firstName: z.string()
    .min(3, { message: "O campo 'Primeiro Nome' precisa ter mais que 3 caracteres!" }),
  lastName: z.string()
    .min(3, { message: "O campo 'Sobrenome' precisa ter mais que 3 caracteres!" })
    .max(15, { message: "O campo 'Sobrenome' nao deve ter mais de 15 caracteres!" }),
  age: z.number({
    required_error: "O campo 'Idade e obrigatorio'!",
    invalid_type_error: "Caracteres inseridos sao invalidos"
  })
    .min(18, { message: "Voce deve ter no minimo 18 anos!" })
    .max(70, { message: "Idade maxima permitida de 70 anos!" })
});

type FormInput = z.infer<typeof schema>;

export default function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>({ resolver: zodResolver(schema) });

  function handleOnSubmit(data: FormInput): void {
    console.log(data);
    reset();
  }

  return (
    <div className="bg-slate-900 flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col w-full max-w-xl p-6 bg-slate-200 rounded-lg gap-6">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold text-xl">Primeiro Nome</label>
          {errors.firstName?.message && <p className="text-sm text-red-500">{errors.firstName?.message}</p>}
          <input
            id="firstName"
            type="text"
            placeholder="Digite seu primeiro nome"
            className="p-3 rounded"
            {...register("firstName")}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="lastName" className="font-bold text-xl">Sobrenome</label>
          {errors.lastName?.message && <p className="text-sm text-red-500">{errors.lastName?.message}</p>}
          <input
            id="lastName"
            type="text"
            placeholder="Digite seu sobrenome"
            className="p-3 rounded"
            {...register("lastName")}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="age" className="font-bold text-xl">Idade</label>
          {errors.age?.message && <p className="text-sm text-red-500">{errors.age?.message}</p>}
          <input
            id="age"
            type="number"
            placeholder="Digite sua idade"
            className="p-3 rounded"
            {...register("age", { valueAsNumber: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 rounded-lg p-3 text-slate-50 font-bold text-xl"
          disabled={errors.firstName?.message || errors.lastName?.message || errors.age?.message}
        >Enviar</button>
      </form>
    </div>
  )
}