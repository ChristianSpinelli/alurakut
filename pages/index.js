import { Fragment, Component } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/Maingrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import axios from 'axios';

function ProfileSideBar(props){
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius:"8px"}}/>
    </Box>
  )
}

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      githubUser:"ChristianSpinelli",
      pessoas:[]
    }

    this.loadPessoas = this.loadPessoas.bind(this)
  }

  async componentDidMount(){
    await this.loadPessoas()
  }
  
  async loadPessoas(){
    let  pessoas;
    await axios.get(`https://api.github.com/users/${this.state.githubUser}/followers`)
    .then((res)=>{
      pessoas = res.data
    })

    this.setState({
      ...this.state,
      pessoas
    })

  }

  render(){
    const { githubUser, pessoas } = this.state
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
          </div>
          <div className="communityArea" style={{ gridArea:"communityArea"}}>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da Comunidade ({pessoas.length})
              </h2>
              <ul>
              {pessoas.map((user)=>{
                return(
                  <Fragment>
                    <li>
                    <a href={`/users/${user.login}`} key={user.login}>
                      <img src={user.avatar_url}></img>
                      <span>{user.login}</span>
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
  
}
