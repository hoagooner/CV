import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import { GlobalState } from '../../GlobalState'
import Boards from './board/Boards.js'
import CreateBoard from './createBoard/createBoard'





function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    return (
        <Switch>
            <Route path="/" exact component={isLogged ? Boards : Login}  />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/create_board" exact component={isLogged ? CreateBoard : NotFound} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
