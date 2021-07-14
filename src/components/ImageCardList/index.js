import { Fragment } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

function ImageCardList(props){
    return(
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {props.title} ({props.list.length})
            </h2>
            <ul>
            {props.list.slice(0,6).map((item, id)=>{
                return(
                <Fragment>
                    <li key={item.id}>
                        <a href={`/${props.path}/${item.title}`}>
                            <img src={item.image}></img>
                            <span>{item.title}</span>
                        </a>
                    </li>
                </Fragment>
                )
            })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default ImageCardList