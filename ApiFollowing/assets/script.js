



function getFollowingUsers(){

    let username = document.querySelector('#user_search').value;
    let friends_container = document.querySelector('.friends_container');

    fetch(`https://api.github.com/users/${username}/following`)
    .then(async resp => {

        if(!resp.ok){
            return;
        }

        let data = await res.json();

        data.map(following => {

        })
    })
}