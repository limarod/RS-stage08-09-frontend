import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Note } from "../../components/Note"
import { Section } from "../../components/Section"
import { FiPlus, FiSearch } from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote} from "./styles"
import { Link } from "react-router-dom"

import { useState, useEffect } from "react"
import { api } from "../../services/api"
import {useNavigate} from "react-router-dom"


export function Home (){
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState ([])

  function handleDetails(id){
    navigate(`/details/${id}`)
  }

  function handleTagsSelected(tagName){
    if(tagName === "all"){
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)
   
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName )
      setTagsSelected(filteredTags)

    }else{
      setTagsSelected(prevState => [...prevState, tagName])
    }

  }

  useEffect(() => {
   async function fetchTags(){
    const response = await api.get("/tags");
    setTags(response.data)
   }

   fetchTags()

  },[])

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data)
      console.log(response)
      console.log(search)
      
    }


    fetchNotes();
  }, [tagsSelected, search])

  return(
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>
      </Brand>

      <Header  />

      <Menu>
        <li> 
          <ButtonText 
            title={"Todos"} 
            isActive={tagsSelected.length === 0}
            onClick={() => handleTagsSelected("all")}
          /> 
          </li>
        {
          tags && tags.map(tag => (
            <li key={tag.id.toString()}>
               <ButtonText 
                  title={tag.name}
                  onClick={() => handleTagsSelected(tag.name)}
                  isActive={tagsSelected.includes(tag.name)}
                /> 
            </li>
          ))
        }
      </Menu>
      
      <Search>
        <Input  
          placeholder="Pesquisar pelo título" 
          icon={FiSearch}
          onChange={e  => setSearch(e.target.value)}
        />       
      </Search>

      <Content>
        <Section title={"Minha notas"}>
          {
            notes.map(note => (
              <Note 
                key={note.id.toString()}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
              
            ))
          }
        </Section>
      </Content>

      <NewNote to={"/new"}>
       <FiPlus/>
       Criar nota
      </NewNote>
    </Container>
  )

}