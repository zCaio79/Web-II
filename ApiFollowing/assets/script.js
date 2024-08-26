
let searchclick = document.querySelector('.search_button') ;


searchclick.addEventListener('click', getFollowingUsers);


function getFollowingUsers(){

    let username = document.querySelector('#user_search').value;
    let friends_container = document.querySelector('.friends_container');

    friends_container.innerHTML = ``;


    fetch(`https://api.github.com/users/${username}/following`)
    .then(async resp => {

        if(!resp.ok){
            throw new Error(resp.status);
        }

        let data = await resp.json();

        data.map(following => {

            let friend_card = document.createElement('div');
            friend_card.innerHTML = 
            `
            <div class="friend">
                <img src="${following.avatar_url}">
                <h4>${following.login}</h4>
                <a href="${following.html_url}" target="_blank">View Profile</a>
            </div>
            `;
            friends_container.appendChild(friend_card);

        })
    })
}