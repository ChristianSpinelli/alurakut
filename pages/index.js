import { Fragment } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/Maingrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props){
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius:"8px"}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = "ChristianSpinelli"
  const pessoas = [
    "juunegreiros",
    "mrdouglasmorais",
    "glaubermag",
    "dolfobispo",
    "Gustavomagalhaes",
    "Redley"
  ]
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
            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea:"communityArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoas.length}
            </h2>
            <ul>
            {pessoas.map((user)=>{
              return(
                <Fragment>
                  <li>
                  <a href={`/users/${user}`} key={user}>
                    <img src={`https://github.com/${user}.png`}></img>
                    <span>{user}</span>
                  </a>
                  </li>
                </Fragment>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>    
      </MainGrid>
    </Fragment>
  )
}
