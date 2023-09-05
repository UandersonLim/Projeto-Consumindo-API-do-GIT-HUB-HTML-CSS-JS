const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <p>Seguidores: ${user.followers} 📲 </p>
                                            <p>Seguindo: ${user.following} 👥 </p>
                                        </div>
                                    </div>`;

        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            const forks = repo.forks ?? 0;
            const stargazers = repo.stargazers_count ?? 0;
            const watchers = repo.watchers ?? 0;
            const language = repo.language ?? ' ';
            
            repositoriesItems += `<li class="repository-item"><a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                <ul class="details">
                                <li> 🍴 ${forks}</li>
                                <li> 🌟 ${stargazers}</li>
                                <li> 👀 ${watchers}</li>
                                <li> 💻 ${language}</li>
                                </ul>
                                </li>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul class="repositories-list">${repositoriesItems}</ul>
                                          </div>`;
        }

        let eventsList = '';
        let messages = '';

        user.eventsList.forEach(event => {
            if (event.payload.commits) {
                event.payload.commits.forEach(element => {
                    messages = `${element.message}`;
                });
            }
            eventsList += `<li class="event"><p>${event.repo.name} ${messages}</p></li>`;
        });

        this.userProfile.innerHTML += `<div class="events">
                                        <h2>Eventos</h2>
                                        <ul class="events-list">${eventsList}</ul>
                                      </div>`;
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };