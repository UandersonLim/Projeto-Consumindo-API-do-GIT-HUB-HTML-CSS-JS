import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"

import { user } from './Objects/user.js'
import { screen } from './Objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterkeyPressed = key === 13
   
    if(validateEmptyInput(userName)) return

    if(isEnterkeyPressed){
        getUserData(userName)
    }
})

function validateEmptyInput(userName) {
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}


async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}

