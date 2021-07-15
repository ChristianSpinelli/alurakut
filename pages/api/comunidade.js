import { SiteClient } from 'datocms-client';

const client = SiteClient("7c027d2ef41fe744138481f1abafe2")

export default async function createComunidade(request, response){
    
    if(request.method === "POST"){
        const comunidade = await client.items.create({
            itemType: "970939",
            ...request.body,
        })
    
        response.json({
            data: comunidade
        })
    }

    
}