import {baseUrl} from "/src/scripts/variables.js"

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos`)
    return await response.json()
}

export { getRepositories }