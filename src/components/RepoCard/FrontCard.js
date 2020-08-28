import React from 'react'
import './RepoCard.scss'
import {Skeleton} from '@material-ui/lab'
import GroupIcon from '@material-ui/icons/Group';
import numeral from "numeral"


function FrontCard({ownerAvatar, repoName, userName, language, followers}) {
  
  return ( 
    <div className="front">
      
      {
        ownerAvatar 
        ? (
          <a href={`https://github.com/${userName}/${repoName}`} target="_blank">
            <img className="thumbnail" width="300px" src={ownerAvatar} alt="owner avatar"/>
          </a>
        )
        : <Skeleton variant="rect" width={200} height={118} /> 
      }

      {
        userName 
        ? (
          <a href={`https://github.com/${userName}/${repoName}`} target="_blank">
            <h3 className="name icon">{userName}</h3>
          </a>
        )
        : <Skeleton className="name icon" variant="rect" width={200}/> 
      }


      {
        userName && repoName
        ? (
            <p className="icon userLogin">
              <a href={`https://github.com/${userName}/${repoName}`} target="_blank">{repoName}</a>
            </p>
          )
        : <Skeleton className="name icon" variant="rect" width={200}/> 
      }
        

      {
        followers
        ? (
          <div className="followers-container">
            <p className="followers-count-section icon">
              <span className="follower-icon"><GroupIcon/></span> 
              <span>{numeral(followers.length).format('0 a')}</span>
            </p>

            <div className="followers-avatar-containers">
              {
                followers.slice(0,3).map((avatar,i) => <img key={i} src={`${avatar}`} alt=""/> )
              }
            </div>
          </div>
        )
        : <Skeleton style={{marginTop: "1em"}} variant="rect" width={200}/> 
      }
      
    </div>
  )
}

export default FrontCard
