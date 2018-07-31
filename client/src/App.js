import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Media from "react-media";

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 90,
      question: '',
      email: ''
    };

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value)

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value, question, email } = this.state;

    /*const form = await axios.post('api/form', {
      //same as email: email, ect
      value,
      email,
      question
    })
    */
    axios.post('api/form', {email})
      .then(res => {
        console.log(res)
        console.log(res.data)
      })

    /*
    console.log(form)
    console.log(form.email)
    console.log("what the hecky")
    */

    //idk how this works lmao
    /*
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
    */


    //window.location.reload();


  }

  render() {
    return (
              <div>
              <form onSubmit={this.handleSubmit}>
                <input id="email" name="email" type="email" placeholder="Email" onChange={this.handleChange} style={{width: "auto"}}/>
                <button type="submit" className="button" style={{marginLeft: -52}}>Send!</button>
              </form>
              <label>{this.state.email}</label>
              </div>

    );
  }
}

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        <MyForm></MyForm>
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1 style={{color: "red"}}>5 sfdsfdsPasswords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
