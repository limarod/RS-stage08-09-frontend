import { Container, Form } from "./styles";
import {Header } from "../../components/Header"
import { Input} from "../../components/Input"
import { Textarea} from "../../components/Textarea"
import { Section} from "../../components/Section"
import { NoteItem} from "../../components/NoteiItem"
import { Button} from "../../components/Button"
import { Link } from "react-router-dom"
import {useState} from "react"

import { api } from "../../services/api";
import {useNavigate} from "react-router-dom"

export function New (){
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("")
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("")
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote(){

    if(!title){
      return alert('O campo "Título" é obrigatório')
    }

    if(newLink){
      return alert(`Existe um Link não adicionado. "${newLink}" `)
    }

    if(newTag){
      return alert(`Existe uma Tag não adicionada. "${newTag}" ` )
    }

    await api.post("/notes", {
      title,
      description,
      links,
      tags
    });

    alert("Nota criada com sucesso!")

    navigate(-1)
  }

  return(
    <Container>
      <Header/>

        <main>
          <Form>
            <header>
              <h1>Criar nota</h1>
              <Link to={"/"} >Voltar</Link>
            </header>
            <Input 
              placeholder="Título"
              onChange={e => setTitle(e.target.value)}
            />

            <Textarea 
              placeholder="Observações"
              onChange={e => setDescription(e.target.value)}
            />

            <Section title="Links Úteis">

              {
                links.map((link, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={link}
                    onClick={() => handleRemoveLink(link)}
                  />
                ) )
              }

              <NoteItem 
              placeholder="Novo link"
              isnew
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
              />
            </Section>

            <Section title="Marcadores">
              <div className="tags">
                {
                  tags.map((tag, index) => (
                    <NoteItem 
                      key={String(index)}
                      value={tag}
                      onClick={() => handleRemoveTag(tag)}
                    />
                  ))
                }

                <NoteItem 
                placeholder="Nova tag" 
                isNew
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
              </div>
            </Section>

            <Button 
              title="Salvar"
              onClick={handleNewNote}
            />

          </Form>

        </main>
    </Container>
  )
}