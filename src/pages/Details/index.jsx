import {Container, Links, Content} from './styles'
import {Button} from '../../components/Button'
import {Header} from '../../components/Header'
import {Section} from '../../components/Section'
import {Tag} from '../../components/Tag'
import {ButtonText} from '../../components/ButtonText'

import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import { api } from '../../services/api'




export function Details (){
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente excluir?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
    }
    navigate(-1)
  }


  useEffect(( ) => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData (response.data)
    }

    fetchNote()
}, [])

  return(
    <Container>
      <Header/>
      { 
       data &&

        <main>
          <Content>

          
            <ButtonText title={"Excluir Nota"} onClick={handleRemove} />
            
            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {
              data.links &&
              <Section title={"Links Úteis"}>
                <Links>
                  { data.links.map( link => (
                    <li key={link.id.toString()}>
                      <a href={link.url} target="_blank" >
                        {link.url}
                      </a>
                    </li>
                  ))
                  }
                </Links>
              </Section>
            }
          { 
           data.tags &&
            <Section title={"Marcadores"}>
              {
                data.tags.map( tag => (
                  <Tag
                    key={tag.id.toString()}
                    title={tag.name}
                  />
                ))
              }
            </Section>
          }
                
            <Button title="Voltar" onClick={handleBack}/>
          </Content>
        </main>
      }
    </Container>
  )
}