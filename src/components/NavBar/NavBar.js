import React, {useState, useEffect} from 'react'
import { TextField, Button } from '@material-ui/core';
import './NavBar.scss'



function NavBar({getRepositoryData}) {
    const [owner, setOwner] = useState("octocat")
    const [repo, setRepo] = useState("boysenberry-repo-1")

    useEffect(() => {
        getRepositoryData({owner, repo})
    }, [])

    const handleChange = e => {
        const set = {"owner": setOwner, "repo": setRepo}
        set[e.target.name](e.target.value)
    }

    const handleKeyPress = e => e.key === "Enter" && handleSubmit()

    const handleSubmit = () => getRepositoryData({owner, repo})



    return (
        <nav className="Navbar">
            <div>
                <h1 id='Navbar__logo'>Query Repo</h1>
            </div>

            <div>
                <form onKeyPress={handleKeyPress}>
                    <TextField 
                        label="Owner" 
                        size="small" 
                        InputLabelProps={{ shrink: true }} 
                        variant="outlined" 
                        onChange={handleChange} 
                        name="owner"
                    />
                    
                    <TextField 
                        label="Repo" 
                        size="small" 
                        InputLabelProps={{ shrink: true }} 
                        variant="outlined"  
                        onChange={handleChange} 
                        className="Navbar__repo-input" name="repo"
                    />

                    <Button size="small" onClick={handleSubmit} variant="contained" className="Navbar__submit-btn" >Get Repo</Button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar
