import React from 'react'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import './RepoCard.scss'
import Tooltip from '@material-ui/core/Tooltip';
import { truncate } from 'lodash';
import {Typography} from '@material-ui/core';
import numeral from "numeral"
import ReactLoading from 'react-loading';


function BackCard({packages}) {
    
    return (
        <div className="back">
            
            <div>
                <div className="package-title">
                    <Typography variant="body1" >
                        PACKAGES: {packages === "Not Found" ? 0 : numeral(packages.length).format('0 a')}
                    </Typography>
                    <hr/>
                </div>

                <ul className="packages-container">
                    {
                        packages === "Not Found" ? " " : (
                            
                            packages[0] === undefined
                            ? (
                                <div className="pkg-loading-container">
                                    <div>Retrieving Your Packages</div>
                                    <div> <ReactLoading type="bars" color="#c2c2c2" height={'20%'} width={'20%'} /> </div>
                                </div>
                              )
                            : (
                   
                                packages.map((pkg, i)=> {
                                    let [pkgName, pkgVersion, pkgLatestVerion] = pkg

                                    return(
                                        <div key={i}>
                                            <div className="dependency-container" style={classes.container}>
                                                <div className="dependency" style={classes.dependency}>
                                                    <Typography variant="body2" >
                                                        {truncate(pkgName,{length: 24})}
                                                    </Typography>
                                                    <code className="muted">{pkgVersion || "N/A"}</code>
                                                </div>

                                                
                                                <div>
                                                    <Tooltip 
                                                        title={
                                                            <div className="dependency" style={classes.dependency}>
                                                                <div style={classes.tooltip}>Pkg: {pkgName}</div>
                                                                <br/>
                                                                <div>Version: <code>{pkgVersion || "N/A"}</code></div>
                                                                <div>Latest Version: <code>{pkgLatestVerion || "N/A"}</code></div>
                                                                <div>Vulnerability: <code>No</code></div>
                                                            </div>
                                                        } 
                                                        placement="right" 
                                                        interactive
                                                        >
        
                                                        <InfoTwoToneIcon fontSize="small"/>
        
                                                    </Tooltip>
                                                </div>
                                            </div>

                                            <div className="dependency-divider">
                                                <hr />
                                            </div>
                                        </div>
                                    )
                                })
                      
                            )

                        )

                    }   
                </ul>
            </div>
        </div>
    )
}

export default BackCard




const classes = {
    container: {
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 10
    },

    dependency: {
        display: "flex",
        flexDirection: "column"
    },

    tooltip: {
        paddingBottom: 5, 
        borderBottom: "1px solid #768190"
    }
}