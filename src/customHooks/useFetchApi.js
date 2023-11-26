import { useEffect, useState } from "react"


function useFetchApi(url){
    const [response,setResponse]=useState('');

    useEffect(()=>{
        (async()=>{
            try{
                const resp=await fetch(url);
                const data=await resp.json();
                var temp = JSON.parse(JSON.stringify(data));
                setResponse(temp)
            }
            catch(error){
                console.error(error);
            }
        })();
    },[url])
    return{
        response
    }
}

export default useFetchApi;