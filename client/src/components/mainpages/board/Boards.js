import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
// import 'bootstrap/dist/css/bootstrap.min.css'
import BoardItem from '../utils/boardItem/boardItem'


function Products() {
    const state = useContext(GlobalState)
    const [boards, setBoards] = state.boardsAPI.boards

    return (
        <div className="boards">
            <h2>Your boards</h2>
            {
                boards.map(board => {
                    return <BoardItem key={board._id} board={board} />
                })
            }
        </div>
    )

}

export default Products
