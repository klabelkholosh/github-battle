const id = `ab3564c38ef3302b5540`;
const sec = `75486ad24ab4a58fe8a776aaa3f6b5dfceade0d9`;
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
	const profile = await fetch(`https://api.github.com/users/${username}${params}`);
	return profile.json();
}

async function getRepos (username) {
	const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
	return response.json();
}

function getStarCount (repos) {
	return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore ({followers}, repos) {
	return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
	console.warn(error);
	return null;
}

async function getUserData (player) {
	//Promise.all takes in an array of promises, then once all promises have been resolved, it returns an object.
	//can do this in an asynchronous fashion.
	const [profile, repos] = await Promise.all([getProfile(player),getRepos(player)]);

	return { //get results of above as array of data, then destructure array to vars
		profile,
		score: calculateScore(profile, repos)
	}
}

function sortPlayers (players) {
	return players.sort((a,b) => b.score - a.score ) //perform a descending sort to ensure the winner appears as the first element in the returned array
}

//exported functions, replacing module.exports object
export async function battle (players) {
	try {
		const userData = await Promise.all(players.map(getUserData));
		return sortPlayers(userData);
	} catch(e) {
		return handleError(e);
	}	
	
}

export async function fetchPopularRepos (language) {
	const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
	try {
		const response = await fetch(encodedURI);
		const repos = await response.json();
		return repos.items;
	} catch(e) {
		return handleError(e);
	}
}

 
