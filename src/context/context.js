import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({show: false, msg: ''})
    const [remainingReq, setRemainingReq] = useState(0)

    // fetching limit request API
    const limitRequest = async() => {
        axios.get(`${rootUrl}/rate_limit`)
            .then(({data}) =>  {
                let {rate: {remaining}} = data;
                setRemainingReq(remaining);
                
                if(remaining === 0) {
                    setError({show: true, msg:'out of request'})
                }
            })

            .catch((err) => console.log(err))
    }

    // fething user url
    const fetchUser = async(value) => {
        setLoading(true)
        setError({show: false, msg: ''})
        const response = await axios.get(`${rootUrl}/users/${value}`)
        .catch((err) => {console.log(err)})
        
        if(response) {
            setGithubUser(response.data)
            const { repos_url, followers_url } = response.data
            const fetchRepos = await axios.get(`${repos_url}?per_page=100`)
            const fetchFollowers = await axios.get(`${followers_url}?per_page=100`)

            await Promise.allSettled([fetchRepos, fetchFollowers])
                .then((result) => {
                    const [reposData, followersData] = result
                    
                    if(reposData.status === 'fulfilled') {
                        setRepos(reposData.value.data)
                    } if(followersData.status === 'fulfilled') {
                        setFollowers(followersData.value.data)
                    }
                })
                .catch((err) => console.log(err))

        }   else{
            setError({show: true, msg:'No user available, try something else'})
        }

        setLoading(false)
    }



    useEffect(() => {
        limitRequest()
    }, [])

    return <GithubContext.Provider value={{
        githubUser,
        repos,
        followers,
        remainingReq,
        error,
        loading,
        fetchUser
    }} > {children} </GithubContext.Provider>
}

export { GithubContext, GithubProvider }