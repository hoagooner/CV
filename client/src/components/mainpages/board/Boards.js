import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import BoardItem from '../utils/boardItem/boardItem'


function Boards() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [boards, setBoards] = state.boardsAPI.boards
    const [callback, setCallback] = state.boardsAPI.callback

    const deleteBoard = async (id, public_id) => {
        try {
            if (public_id) {
                const destroyImg = axios.post('/api/destroy', { public_id }, {
                    headers: { Authorization: token }
                })

                await destroyImg
            }

            const deleteProduct = axios.delete(`/api/boards/${id}`, {
                headers: { Authorization: token }
            })

            await deleteBoard
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="boards">
            <h2>Your boards</h2>
            {
                boards.map(board => {
                    return <BoardItem key={board._id} board={board}
                        deleteBoard={deleteBoard} />
                })
            }
        </div>
    )

}

export default Boards
