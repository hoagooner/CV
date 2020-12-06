import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import axios from 'axios'
import BoardsAPI from './api/BoardsAPI'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{

    BoardsAPI()
    const [token, setToken] = useState(false)

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])

    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        boardsAPI: BoardsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}