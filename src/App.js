import React, {useState, useEffect} from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import RepoCard from './components/RepoCard/RepoCard';
import {GIT_GRAPHQL_API, CHECK_VULNERABLITIES} from './graphQL/queries'
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import {userDataAPI, repoAPI, followersAPI, repoPackagesAPI} from './constants/APIs'


function App() {

  // const [isLoading, setIsLoading] = useState(false)
  const [ownerLogin, setOwnerLogin] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [repoLanguage, setRepoLanguage] = useState("")
  const [ownerAvatar, setOwnerAvatar] = useState(null)
  const [repoName, setRepoName] = useState("")
  const [repoPackages, setRepoPackages] = useState([])
  const [error, setError] = useState(false)
  const [followers, setFollowers] = useState(null)
  const [repoWatchers, setRepoWatchers ] = useState()
  


  /*
    =====================
        COMING SOON:
    =====================

    1. SWR for Caching fetched data

    2. Provider Context for Global access to data 
        - this should eliminate prop drilling

    3. Add proper header token for GraphQL Query
  */

  
  const getRepositoryData = async ({owner, repo})=>{
    // checkPacakgesVulnerablities(owner, repo)
    try {
      const userData = await axios.get( userDataAPI(owner) )
      const repoData = await axios.get( repoAPI(owner, repo) )
      const followersData = await axios.get( followersAPI(owner) )
      setRepoPackages([])
      
      const {data: { language, watchers } } = repoData
      const {data: {name, avatar_url} } = userData
      const avatars = followersData.data.map(f => f.avatar_url)
    
      getPackages(owner,repo,language)
        
      setOwnerName(name)
      setFollowers(avatars)
      setRepoWatchers(watchers)
      setOwnerAvatar(avatar_url)
      setRepoLanguage(language)
      setOwnerLogin(owner)
      setRepoName(repo)

    } catch (error) {
      setError(true)
    }
  }


  const getPackages = async(owner,repo,language) => {
    const config = {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({owner,repo,language})
    }
    
    const packageRes = await fetch( repoPackagesAPI , config)
    const packageData = await packageRes.json()
    const {data: packages} = packageData

    setRepoPackages(packages)
  }
  

  const checkPacakgesVulnerablities = async (owner, repo) => {
    const securityQuery = {query: CHECK_VULNERABLITIES, variables: {owner, repo}}
    const securityResults = await axios.post(GIT_GRAPHQL_API, securityQuery )
  }
  



  return (
    <div className="App">

      <header>
        <NavBar getRepositoryData={getRepositoryData}/>
      </header>


      <main className="App__main">
        <div className='App__main-container'>
          <div className="App__card-container">
            
            {
              error && (
                <div className="App__error-alert">
                  <Alert onClose={() => setError(false)} severity="error">Invalid Owner Or Repo </Alert>
                </div>
              )
            }

            <RepoCard 
              packages={repoPackages} 
              userName={ownerLogin} 
              repoName={repoName} 
              followers={followers}
              language={repoLanguage} 
              ownerAvatar={ownerAvatar}
              repoWatchers={repoWatchers}
            />

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
