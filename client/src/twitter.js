import React, { useEffect, useState } from 'react'
import Header from './header';
import Movie from './movie'

function Twitter() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [recentTweet, setRecentTweet] = useState("")
  const [emotion, setEmotion] = useState("no emotion")

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    // fetch user
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error("failed to authenticate user");
    })
    .then(resJSON => {
      if (isMounted) {
        setAuthenticated(true)
        setUser(resJSON.user)
      }
    })
    .catch(e => {
      setAuthenticated(false)
      console.log(`Error: Failed to Authenticate: ${e}`)
    });

    // fetch tweets
    fetch("http://localhost:4000/auth/mytweetandemotion", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(res => {
      if (res.status === 200) return res.json();
      throw new Error("failed to retrieve tweets");
    })
    .then(res => {
      setRecentTweet(res.tweet)
      setEmotion(res.emotion)
    })
    .catch(e => {
      console.log("Error: failed to get tweets: " + e)
    }) 

    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, [])

  return (
    <div>
      In Twitter
      <Header
          authenticated={authenticated}
      />
      {!authenticated ? (<h1>Please log in</h1>) : (<h1>Welcome {user.name}</h1>)}
      <p>{recentTweet}</p>
      {
        emotion !== "no emotion" ? (<Movie emotion={emotion}/>) : ("")
      }
    </div>
  );
}

export default Twitter;