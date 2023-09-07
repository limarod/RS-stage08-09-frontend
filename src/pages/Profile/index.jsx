import { Container, Form, Avatar } from "./styles";
import { FiLock, FiUser, FiMail, FiArrowLeft, FiCamera} from "react-icons/fi"
import {Button} from "../../components/Button"
import {Input} from "../../components/Input"
import {Link} from "react-router-dom"
import { useState } from "react";
import {useAuth} from "../../hooks/auth"

import avatarPlaceholder from '../../Assets/avatar_placeholder.svg';
import {api} from "../../services/api"

export function Profile(){
  const {user, updateProfile} = useAuth()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();


  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdate(){
    const updated = {
      name, 
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated)

    await updateProfile({user: userUpdated, avatarFile})
  }



  function handleChangeAvatar(event){
    const file = event.target.files[0];
    setAvatarFile( file );

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <Link to={"/"}> <FiArrowLeft/> </Link>
      </header>
      <Form>
        <Avatar>
          <img 
          src={avatar} 
          alt="Foto de usuário" />
          
          <label
              htmlFor="avatar">
              <FiCamera/>

            <input 
             type="file"
             id="avatar" 
             onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

       

        
      <Input 
          type="text"
          placeholder="Nome"
          icon={FiUser}
          value={name}
          onChange={e => setName (e.target.value) }
       />
      <Input 
          type="email"
          placeholder="E-mail"
          icon={FiMail}
          value={email}
          onChange={e => setEmail (e.target.value) }
       />
      <Input 
          type="password"
          placeholder="Senha atual"
          icon={FiLock}
          onChange={e => setPasswordOld (e.target.value) }
       />
      <Input 
          type="password"
          placeholder="Nova senha"
          icon={FiLock}
          onChange={e => setPasswordNew (e.target.value) }
       />

       <Button title={"Salvar"} onClick={handleUpdate} />
      </Form>
    </Container>
  )
}