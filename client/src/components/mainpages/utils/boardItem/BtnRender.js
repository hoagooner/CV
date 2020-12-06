import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function BtnRender({ board, deleteBoard }) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    // const user = typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')

    return (
        <div className="row_btn">
            {
                <>
                    <Link id="btn_buy" to="#!"
                        onClick={() => deleteBoard(board._id, board.images.public_id)}>
                        Delete
                   </Link>
                    <Link id="btn_view" to={`/board/${board._id}`}>
                        View
                   </Link>
                </>
            }

        </div >
    )
}

export default BtnRender
