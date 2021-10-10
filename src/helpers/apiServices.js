import axios from 'axios';

async function getData(url, body=false){
    try{
        let data = {}
        if(body){
            data.params = body
            data.body = body
            data.headers = { 'Content-Type':"application/json"}
        }
        let response = await axios(url,data)
        return response.data
    }catch(e){
        console.error('Error in fetching data',e)
    }
}


async function postData(body){
    try{
        let response = await axios.post(body.url,body.data)
        return response.data
    }catch(e){
        console.error('Error in post data',e)
    }
}

export const apiService = {
    getData,
    postData
}