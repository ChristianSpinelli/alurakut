import React, { Fragment, useState, useEffect } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/Maingrid';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import axios from 'axios';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import ImageCardList from '../src/components/ImageCardList';

function ProfileSideBar(props){
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius:"8px"}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home(){
  const [ comunidades, setComunidades ] =  useState([{
    id:'2918912202108',
    title:"Eu odeio acordar cedo", 
    image:"https://alurakut.vercel.app/capa-comunidade-01.jpg"}
  ])

  const [ pessoas, setPessoas ] = useState([])

  const githubUser = "ChristianSpinelli"

  async function loadPessoas(githubUser){
    let pessoas = []
    await axios.get(`https://api.github.com/users/${githubUser}/following`)
    .then((res)=>{
        for(let i = 0; i < res.data.length; i++){
            let pessoa = {}
            pessoa.id = res.data[i].login
            pessoa.title = res.data[i].login
            pessoa.image = res.data[i].avatar_url
            pessoas.push(pessoa)
        }
    })
    setPessoas(pessoas)
  }

  useEffect(()=>{
    loadPessoas(githubUser)
  },[])
    
  return (
    <Fragment>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea:"profileArea"}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea:"welcomeArea"}}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3}/>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => { 
              e.preventDefault()
              const dadosForm = new FormData(e.target)
              setComunidades([...comunidades, {
                id:new Date().toISOString(),
                title:dadosForm.get("title"), 
                image:dadosForm.get("image")
              }])
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa." 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea:"communityArea"}}>
          <ImageCardList
            list={pessoas}
            title="Meus Amigos"
            path="usuarios"
          />
          <ImageCardList 
            list={comunidades} 
            title="Minhas Comunidades" 
            path="comunidades"
          />
        </div>    
      </MainGrid>
    </Fragment>
  )
  
  
}
