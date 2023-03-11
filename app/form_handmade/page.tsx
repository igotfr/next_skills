'use client'

// https://github.com/vercel/next.js/issues/45054
//import { signal } from '@preact/signals-react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { form } from "./styles";
//import styles from './page.module.css';

export default function FormHandmade() {
  /*const name = signal<string>('');
  const email = signal<string>('');
  const password = signal<string>('');*/
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  
  function handleOnChangeLogin(event: ChangeEvent<HTMLInputElement>, key: string): void {
    setLogin({...login, [key]: event.target.value});
  }

  const [search, setSearch] = useState('');
  
  useEffect(() => {
    if (search.length > 2) {
      console.log(`Realizando busca para ${search}`);
    }
  }, [search]);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log({ name, email, password });
    console.log(login);
  }

  return (
    <>
      <form style={form} onSubmit={handleOnSubmit}>
        <h1>Formulario de cadastro</h1>
        <input
          type="text"
          placeholder="Nome completo"
          required
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
      
      <form style={form} onSubmit={handleOnSubmit}>
        <h1>Formulario de login</h1>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={login.email}
          onChange={(event) => handleOnChangeLogin(event, 'email')}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={login.password}
          onChange={(event) => handleOnChangeLogin(event, 'password')}
        />

        <button type="submit">Entrar</button>
      </form>

      <form style={form}>
        <h1>Formulario de busca automatica</h1>
        <input
          type="text"
          placeholder="Digite sua busca"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
    </>
  )
}