import React, { Fragment, useState, useEffect } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/Maingrid';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
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
    await fetch(`https://api.github.com/users/${githubUser}/following`)
    //retorna a promisse e converte para json
    .then((res)=>{
      return res.json()       
    
    //retorna o dado convertido
    }).then((res) => {  
      for(let i = 0; i < res.length; i++){
        let pessoa = {}
        pessoa.id = res[i].login
        pessoa.title = res[i].login
        pessoa.image = res[i].avatar_url
        pessoas.push(pessoa)
      }
    }).catch((err)=>{
      console.log(err)
    })
    
    setPessoas(pessoas)
  }

  useEffect(()=>{
    loadPessoas(githubUser)
  },[])
    
  return (
    <Fragment>
      <AlurakutMenu githubUser={githubUser}/>
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
