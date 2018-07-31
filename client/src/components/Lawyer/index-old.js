import React, { Component } from 'react';
import iphone from '../iphone-real.png';
import '../style.css';
import Media from "react-media";
import {
  BrowserRouter as Router,
  Route,
  Link as RLink,
  Switch,
  Redirect
} from 'react-router-dom';
import ReactGA from 'react-ga';
import axios from 'axios';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

ReactGA.initialize('UA-122460298-4');
ReactGA.pageview(window.location.pathname + window.location.search);

function fireTracking() {
    ReactGA.pageview(window.location.hash);
}

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

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value, question, email } = this.state;

    const form = await axios.post('api/form', {
    	//same as email: email, ect
    	email
    })

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
      <Media query="(max-width: 1100px)">
          {matches =>
            matches ? (
              <form onSubmit={this.handleSubmit}>
                <input id="email" name="email" type="email" placeholder="Email" onChange={this.handleChange} style={{paddingRight: 50, borderWidth: 0}}/>
                <button type="submit" className="button" style={{marginLeft: -52}}>Send!</button>
              </form>
            ) : (
              <form onSubmit={this.handleSubmit} >
                <input id="email" name="email" type="email" placeholder="Email" onChange={this.handleChange} style={{paddingRight: 50, borderWidth: 0}}/>
                <button type="submit" className="button" style={{marginLeft: -56, padding: "15px 32px 16px 32px", borderWidth: 0}}>Send!</button>
              </form>
            )
          }

        </Media>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbotOpen: false,
      width: 0,
      height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  openChatbot() {
    this.setState({chatbotOpen: true});
    console.log(this.state.chatbotOpen);
  }
  closeChatbot() {
    this.setState({chatbotOpen: false});
    console.log(this.state.chatbotOpen);
  }
  scrollTo() {
      scroll.scrollTo(this.state.height, {duration: 400, smooth: "easeInOutQuint"});
    }
  render() {
    return (
      <Router onUpdate={fireTracking}>
      <div style={{overflowX: "hidden"}}>
      <header className="App-header">
          <RLink to="/" onClick={()=> window.location.reload(true)}><h1 className="logo">Legally</h1></RLink>
          <div className="nav-bar">
            <RLink to="/" onClick={()=> window.location.reload(true)}><div className="nav-item" >For 
            Users</div></RLink>
          </div>
        </header>

      <div className="App" style={!this.state.chatbotOpen ? {}:{transform: "translateX(-100%)"}}>
        <div className="big-paragraph">
          <p className="big" style={{zIndex: 2, position: 'relative', color: 'white'}}>Meet Legally </p>
          <p className="big big2" style={{zIndex: 2, position: 'relative', color: 'white'}}>The friendly chatbot that finds you eager clients automatically</p>

          <div className="buttons-container" style={{flexDirection: "column"}}>
                <MyForm></MyForm>
                <Link ><div className="button2" onClick={()=> this.scrollTo()}>Explore the features</div></Link>>
          </div>
        </div>
        <Media query="(max-width: 1100px)">
          {matches =>
            matches ? (
              <div className="make-center">
              <img src={iphone} style={{position: "absolute", top: "64vh", opacity: 0.95, height: "72vh"}}/>
              </div>
            ) : (
              <img src={iphone} style={{right: 200, position: "absolute", top: 140, opacity: 0.95, height: "72vh"}}/>
            )
          }

        </Media>
      </div>


      <div className="make-center chatbot-container" style={this.state.chatbotOpen ? {}:{transform: "translateX(100%)"}} >
      <div className="button2 chatbot-back" onClick={() => this.closeChatbot()}>Back</div>
        <div className="chatbot">
          <div className="chatbot-nav-bar">
            <div className="exit chatbot-nav-item" onClick={() => this.closeChatbot()}></div>
            <div className="blank chatbot-nav-item"></div>
            <div className="blank chatbot-nav-item"></div>
          </div>
          <div className="chat">
            <div className="message-container bot">
              <div className="message first-message">Hey! 👋</div>
            </div>
            <div className="message-container bot">
              <div className="message">My name is Landbot and I transform websites into Conversational Experiences</div>
            </div>
            <div className="message-container bot">
              <div className="message">How are you doing today?</div>
            </div>
            <div className="message-container user">
              <div className="message">Been better</div>
            </div>
            <div className="message-container bot">
              <div className="message">You're here so your day can't do anything but get better! 🚀</div>
            </div>
            <div className="message-container bot">
              <div className="message">Because I love story-telling and I don't want to bore you, please tell me what do you want to do?</div>
            </div>
            <div className="message-container user">
              <div className="message">8</div>
            </div>
            <div className="message-container bot">
              <div className="message">9</div>
            </div>
            <div className="message-container user">
              <div className="message">10</div>
            </div>
            <div className="message-container bot">
              <div className="message">11</div>
            </div>
          </div>
        </div>
        <div className="chat-options" style={{display: "flex", flexDirection: "row"}}>
          <div className="button">hi</div>
          <div></div>
        </div>
      </div>

      <div className="gradient"></div>
      <div className="make-center" state={{position: "relative"}}>
        <div className="info-background"></div>
        <div className="info">
          <div className="medium" style={{color: "#434343", top: 0}}>What Legally Can Do For You</div>
          <div className="features">
            <div>Help find legal solutions to your problems independently</div>
            <div>Help draft legal documents with ease</div>
            <div>Provide access to a team of specialized and experienced legal experts</div>
          </div>
          <div className="learn-more" style={{marginTop: "40px"}}>Legally demystifies the law, empowering you with an understanding
          of your rights, and legal options. Legally can instill you with the confidence to sort out legal
          matters on your own, turning legalese into legal-ease.</div>

          <div className="big" style={{color: "#434343", marginTop: "100px"}}>What if I just need a lawyer?</div>
          <div>If you do need a lawyer, then fear not! Legally can connect you with an experienced lawyer
          who specializes in whatever you need. All of Legally's lawyers are vetted and subject to a review
          system so you can be confident that you're getting quality advice and service from qualified
          professionals that you can trust.</div>
          <div className="big" style={{color: "#434343", marginTop: "100px"}}>Make the law accessible to everyone</div>
        </div>
      </div>
      </div>
      </Router>



    );
  }
}

export default App;
