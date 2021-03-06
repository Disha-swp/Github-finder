import { useState,useEffect } from 'react';
 import './App.css';
// import { Link } from 'react-router-dom';
import { Button,Card, Navbar,Container } from 'react-bootstrap'

function App() {

const [name, setName] = useState('');
const [username, setUsername] = useState('');
const [followers, setFollowers] = useState('');
const [following, setFollowing] = useState('');
const [repository, setRepository] = useState('');
const [avatar , setAvatar] = useState([]);
const [htmlurl, setHtmlurl] = useState([]);
const [userInput, setUserInput] = useState(''); // for search
const [error, setError] = useState(null);

useEffect(() => {
  // effect
  fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(value => {
      if(value.message){
        setError(value.message);
      }
      else{
      // console.log(value);
      setData(value);
      setError(null);
      }
    })
  }, [userInput]);
  const handleSearch = (e) => {
    console.log("handle search called");
    setUserInput(e.target.value);
  };
  // const handleClick = () => {
  //   console.log("submit button is clicked");
  //   fetch(`https://api.github.com/users/${userInput}`)
  //   .then(res => res.json())
  //   .then(value => {
  //     setData(value);
  //   })
  // };
  
  const setData = ({name,  //values fetched from api
     login, 
     followers,
     following,
     public_repos,
     avatar_url,
     html_url
    }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepository(public_repos);
    setAvatar(avatar_url);
    setHtmlurl(html_url);
  };

  return (
    <div className="App">
     
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand >GitHub User Finder</Navbar.Brand>
    </Container>
    </Navbar>
      <div className="searchBlock">
        <h3>Enter Username</h3>
        <input type = "text" id="searchUser" placeholder="Username"
         onChange ={handleSearch}/> &nbsp;
         
        
      </div>
      <div className="card">
      { error ? (<h1> {error} </h1>) :(<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Text>{username}</Card.Text>
          <Card.Text>Followers: {followers}</Card.Text>
          <Card.Text>repos: {repository}</Card.Text>
          <Card.Text>Following: {following}</Card.Text>
          <a href = {htmlurl} target="_blank" 
          rel = "noopener noreferrer" >
               <Button variant="success" type = "submit">View Profile
               </Button>
          </a>
        </Card.Body>
      </Card>) 
      }
      
      </div>
    </div>
    
  );
}

export default App;
