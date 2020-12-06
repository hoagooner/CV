import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function BoardAPI() {
    const [boards, setBoards] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/boards?user_id=${typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')._id}`)
            console.log(res.data.boards)
            setBoards(res.data.boards)
            setResult(res.data.result)
        }
        getProducts()
    },[callback,  sort, search, page])
    
    return {
        boards: [boards, setBoards],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default BoardAPI
