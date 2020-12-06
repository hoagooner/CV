import React from 'react'
import BtnRender from './BtnRender'

function BoardItem({ board, deleteBoard }) {

    return (
        <div className="product_card" style={{display:"inline-block"}}>
            <img src={board.images.url 
                ? board.images.url 
                :"https://cdn1.iconfinder.com/data/icons/online-education-indigo-vol-2/256/Home_Education-512.png" } 
                alt="image" />
            <div className="product_box">
                <h2 title={board.title}>{board.title}</h2>
                <p>{board.description}</p>
            </div>

            <BtnRender board={board} deleteBoard={deleteBoard} />
        </div>
    )
}

export default BoardItem
