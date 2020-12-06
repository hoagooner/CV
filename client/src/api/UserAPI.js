import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [history, setHistory] = useState([])
    const [user, setUser] = useState()


    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })

                    // if(!res){
                    //  window.location = '/';
                    // }

                    setIsLogged(true)
                } catch (err) {
                    alert(err.response.data.msg)
                    // return window.location = '/login';
                }
            }
            getUser()
        }
    }, [token])


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        history: [history, setHistory],
        user: [user, setUser]
    }
}

export default UserAPI
