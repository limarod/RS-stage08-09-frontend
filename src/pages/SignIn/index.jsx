import { Container, Form, Background } from "./styles";
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"
import {FiMail, FiLock} from "react-icons/fi"
import { Link } from "react-router-dom"

import { useState } from "react";
import { useAuth } from "../../hooks/auth";



export function SignIn(){

  const {signIn} = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSignIn(){
    signIn({email, password})
  }

  return(
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e geenciar seus links úteis.</p>
        <h2> Faça seu login</h2>

        <Input 
          type="email"
          placeholder="E-mail"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
          />
        <Input
          type="password"
          placeholder="Senha"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}

        />
        <Button title={"Entrar"} onClick={handleSignIn}/>

        <Link to={"/register"}> Criar conta</Link>
      </Form>
      <Background/>
    </Container>
  )
}