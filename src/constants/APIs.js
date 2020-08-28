const baseURL = "https://api.github.com"
const userDataAPI = owner => `${baseURL}/users/${owner}`
const repoAPI = (owner, repo) =>`${baseURL}/repos/${owner}/${repo}`
const followersAPI = owner =>`${baseURL}/users/${owner}/followers`
const repoPackagesAPI = "https://find-repo-packages.herokuapp.com/api/v1/repo-packages-info"


export{
    userDataAPI,
    repoAPI,
    followersAPI,
    repoPackagesAPI
}