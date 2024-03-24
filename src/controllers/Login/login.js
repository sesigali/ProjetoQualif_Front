import React, {useState} from 'react'
import Input from "../../components/Input/input"
import Button from "../../components/Button/button"
import '../Login/login.css'


export default function Login() {
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[error, setError] = useState('');


  return (
    <div className= "container-login">
      <label className="label-login">SISTEMA DE LOGIN</label>
      <div className="content-login">
        <Input
          type="e-mail"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e)=>[setEmail(e.target.value),setError("")]}
        />
        <Input
          type="e-mail"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e)=>[setSenha(e.target.value),setError("")]}
        />
        <label className="label-erro">{error}</label>
        <Button Text="Entrar" /> {/* onClick{handleLogin} */}
        <label className="label-registrar">
          <span className="span-registrar1">Não tem uma conta?</span>
          <span className="span-registrar2">&nbsp;Registre-se</span>
        </label>
      </div> 

    </div>
  )
}
