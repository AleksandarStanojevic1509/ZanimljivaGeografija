export const hallBox = (modal)=>{
    modal.style.display = 'grid';    
}

export const sortUsers = (arrayOfUsers) =>{
    let usersList = {};
    arrayOfUsers.forEach(elem => { 
        usersList[elem] = (usersList[elem] || 0)+1; 
    });
    let sorted = [];
    for (var user in usersList) {
        sorted.push([user, usersList[user]]);
    }

    return sorted.sort(function(a, b) {
        return a[1] - b[1];
    }).reverse();
    //moze b[1] - a[1] i ne morea reverse()
}

export const renderTable = (sortedArray) =>{
    return `<thead>
                <tr>
                    <th>No:</th>
                    <th>Name</th>
                    <th>Terms</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1.</td>
                <td>${sortedArray[0][0]}</td>
                <td>${sortedArray[0][1]}</td>
                </tr>
                <tr>
                <td>2.</td>
                <td>${sortedArray[1][0]}</td>
                <td>${sortedArray[1][1]}</td>
                </tr>
                <tr>
                <td>3.</td>
                <td>${sortedArray[2][0]}</td>
                <td>${sortedArray[2][1]}</td>
                </tr>
                <tr>
                <td>4.</td>
                <td>${sortedArray[3][0]}</td>
                <td>${sortedArray[3][1]}</td>
                </tr>
                <tr>
                <td>5.</td>
                <td>${sortedArray[4][0]}</td>
                <td>${sortedArray[4][1]}</td>
                </tr>
                </tbody>
                `
}


export const renderBestPlayers = (arrayScores) =>{
    return `<thead>
                <tr>
                    <th>No:</th>
                    <th>Username</th>
                    <th>Broj poena</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1.</td>
                <td>${arrayScores[0].username}</td>
                <td>${arrayScores[0].broj_poena}</td>
                </tr>
                <tr>
                <td>2.</td>
                <td>${arrayScores[1].username}</td>
                <td>${arrayScores[1].broj_poena}</td>
                </tr>
                <tr>
                <td>3.</td>
                <td>${arrayScores[2].username}</td>
                <td>${arrayScores[2].broj_poena}</td>
                </tr>
                <tr>
                <td>4.</td>
                <td>${arrayScores[3].username}</td>
                <td>${arrayScores[3].broj_poena}</td>
                </tr>
                <tr>
                <td>5.</td>
                <td>${arrayScores[4].username}</td>
                <td>${arrayScores[4].broj_poena}</td>
                </tr>
                </tbody>
                `
}

