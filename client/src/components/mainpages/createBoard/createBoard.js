import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    user_id: typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')._id,
    title: '',
    _id: ''
}

function CreateBoard() {
    const state = useContext(GlobalState)
    const [board, setBoard] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [boards] = state.boardsAPI.boards
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.boardsAPI.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            boards.forEach(board => {
                if (board._id === param.id) {
                    setBoard(board)
                    setImages(board.images)
                }
            })
        } else {
            setOnEdit(false)
            setBoard(initialState)
            setImages(false)
        }
    }, [param.id, boards])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setBoard({ ...board, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {

            if (onEdit) {
                await axios.put(`/api/boards/${board._id}`, { ...board, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post('/api/boards', { ...board, images }, {
                    headers: { Authorization: token }
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>

                {/* <div className="row">
                    <input type="text" name="user_id"
                        value={cookies.get('user')._id} />
                </div> */}

                <div className="row">
                   <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={board.title} onChange={handleChangeInput} />
                </div>
           

                <div className="row">
                    <label htmlFor="description">Description</label>
                    < textarea type="text" name="description" id="description" required
                        value={board.description} rows="5" onChange={handleChangeInput} />
        </div>
 
                 <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateBoard
