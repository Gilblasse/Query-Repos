const GIT_GRAPHQL_API = 'https://api.github.com/graphql/'

const CHECK_VULNERABLITIES =`
query findVulnerablities($owner: String!, $repo: String!) { 
    repository(owner: $owner, name: $repo){
      vulnerabilityAlerts(first: 10){
        nodes{
          securityVulnerability{
            severity
            package{
              name
            }
          }
        }
      }
    }
  }
`


export { GIT_GRAPHQL_API, CHECK_VULNERABLITIES }