import React from 'react'
import './RepoCard.scss'
import FrontCard from './FrontCard'
import BackCard from './BackCard'
import VisibilityIcon from '@material-ui/icons/Visibility';
import numeral from "numeral"


function RepoCard({packages, repoWatchers, followers, userName, repoName, language, ownerAvatar}) {
    return (
        <div className="RepoCard">  
            <div className="watchers">
                <div>
                    {numeral(repoWatchers).format('0 a')}
                </div>
                
                <div>
                    <VisibilityIcon fontSize="small"/>
                </div>
            </div>    
                    
            <FrontCard repoName={repoName} followers={followers} userName={userName} language={language} ownerAvatar={ownerAvatar}/>
            <BackCard packages={packages}/>
            <div className="RepoCard__background"></div>
        </div>
    )
}

export default RepoCard
