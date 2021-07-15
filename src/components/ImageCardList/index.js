import { Fragment } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

function ImageCardList({title, list, path}){
    return(
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {title} ({list.length})
            </h2>
            <ul>
            {list.slice(0,6).map((item, id)=>{
                return(
                <Fragment>
                    <li key={item.id}>
                        <a href={`/${path}/${item.id}`}>
                            <img src={item.imageUrl}></img>
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