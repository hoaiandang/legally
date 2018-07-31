import React, { Component } from 'react';
import iphone from '../iphone-real.png';
import draft from '../draft.svg';
import solution from '../solution.svg';
import chat from '../chat.svg';
import robot from '../robot.svg';
import messenger from '../messenger.png';
import messenger2 from '../messenger2.png';
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

function fireTracking() {
    ReactGA.pageview(window.location.hash);
}
ReactGA.initialize('UA-122460298-4');
ReactGA.pageview(window.location.pathname + window.location.search);

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      type: 'lawyer',
    	email: ''
    };

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});

  }

  async handleSubmit(event) {
    event.preventDefault();
    const { type, email } = this.state;

    const form = await axios.post('api/form', {
    	//same as email: email, ect
      type,
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
                <input id="email" name="email" type="email" placeholder="Enter email" onChange={this.handleChange} style={{paddingRight: 50, borderWidth: 0}}/>
                <button type="Notify me!" className="button" style={{marginLeft: -52}}>Send!</button>
              </form>
            ) : (
              <form onSubmit={this.handleSubmit} >
                <input id="email" name="email" type="email" placeholder="Enter email" onChange={this.handleChange} style={{paddingRight: 50, borderWidth: 0}}/>
                <button type="Notify me!" className="button" style={{marginLeft: -56, padding: "15px 32px 16px 32px", borderWidth: 0}}>Send!</button>
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
      scroll.scrollTo(this.state.height - 120, {duration: 400, smooth: "easeInOutQuint"});
    }
  render() {
    return (
      <Router onUpdate={fireTracking}>
      <div style={{overflowX: "hidden"}}>
        <div className="App-header">
            <RLink to="/" onClick={()=> window.location.reload(true)}><h1 className="logo">Legally</h1></RLink>
            <div className="nav-bar">
              
              <RLink to="/" onClick={()=> window.location.reload(true)}><div className="nav-item">For Users</div></RLink>
              
            </div>
          </div>

        <div className="App" style={!this.state.chatbotOpen ? {}:{transform: "translateX(-100%)"}}>
          <div className="big-paragraph">
            <p className="big" style={{zIndex: 2, position: 'relative', color: 'white'}}>Meet Legally</p>

            <p className="big3" style={{zIndex: 2, position: 'relative', color: 'white'}}>
            Legally is a chatbot that will <i>automatically</i> connect you to eager clients for <i>free</i>. You won't have to do a single thing. </p>
            <p></p>
            <p className="big3" style={{zIndex: 2, position: 'relative', color: 'white'}}>
            Sign up for updates with the form below. </p>

            <div className="buttons-container" style={{flexDirection: "column"}}>
                <MyForm></MyForm>
                <Link ><div className="button2" onClick={()=> this.scrollTo()}>Learn more</div></Link>>
          </div>
          </div>
          <Media query="(max-width: 1200px)">
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

        <div className="gradient"></div>
        <div className="make-center" state={{position: "relative"}}>
          <div className="info-background"></div>
          <div className="info" style={{}}>
          	<div className="make-center" style={{flexDirection: "column",  height: "auto", width: "auto", backgroundColor: " #6071E5"}}>
	          	<div className="medium" style={{color: "white", marginTop: "100px", marginBottom: "20px", width: "100vw"}}>How it works</div>
	          	<div className="line" style={{marginBottom: "60px", backgroundColor: "white", opacity: 0.6}}></div>
          	</div>
            <div className="features-container" style={{zIndex: 0, position: "relative"}}>
              
              <div className="feature">
              	
              	<object data={robot} type="image/svg+xml" style={{width: 80}}>
				</object>
				<div className="feature-header">Step 1</div>
              	Users will come to Legally to look for free legal advice
              </div>
              <div className="feature">
              	
              	<object data={solution} type="image/svg+xml" style={{width: 80}}>
				</object>
				<div className="feature-header">Step 2</div>
              	Legally will provide the users all of the information they need
              </div>
              <div className="feature">
              	
              	<object data={draft} type="image/svg+xml" style={{width: 80}}>
				</object>
				<div className="feature-header">Step 3</div>
              	Legally con only do so much, though. That's where you come in
              </div>
              <div className="feature">

              	<object data={chat} type="image/svg+xml" style={{width: 80}}>
				</object>
				<div className="feature-header">Step 4</div>
              	For all of the tasks that Legally can't handle, it refers the customer to you. Cha-ching!
              </div>
            </div>


            <div style={{height: "100vh", backgroundColor: "#3d2644", color: "white", zIndex: -1}}>
	            <div className="learn-more" style={{top: 100, position: "relative"}}>
		            <div style={{textAlign: "left", fontSize: 30}}>
		            Legally is a chatbot service that generates clientele for lawyers. Clients are directed to lawyers based on their legal needs, and you are free to select only the clients you want.   Our service provides efficiency and accuracy in selecting your clientele.
		            </div>
	            </div>
            </div>

            <div style={{height: "90vh", width: "100%", boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.6)"}}>
            <div className="lawyer-container" style={{top: "30vh", position: "relative"}} >
	            <div className="big" style={{color: "#434343"}}>Why Should I Choose Legally?</div>
	            <div>Legally is the best way to promote yourself & to build your credibility!  We attract clients through our interactive and user-friendly interface, allowing for a regular flow of carefully selected clientele looking for you to fill their needs. </div>
	        </div>
	        </div>

	        <div className="make-center" style={{backgroundColor: "#E8E8E8", position: "relative", zIndex: -1, flexDirection: "column", alignItems: "flex-end"}}>

	        	<div style={{position: "relative", marginRight: 200}}>
            	<div className="big" style={{color: "#434343", lineHeight: 4, textAlign: "right"}}>Connect to clients at your convenience</div>
            	<div style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
            	<div className="button bottomButton" style={{marginLeft: 0, paddingRight: 80}} onClick={()=> window.open("http://m.me/legally.eia2018", "_blank")}>See how it works
                  <img src={messenger2} style={{position: "absolute", right: 32}}/>
                  </div>
                </div>
                </div>
            </div>
            <div className="make-center" style={{backgroundColor: "#6071E5", position: "relative", zIndex: -1, 
            flexDirection: "column", height: "400px", position: "relative", boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.6)"}}>
                  <div className="medium" style={{color: "white", opacity: 0.9, lineHeight: 2}}>Subscribe to our newsletter</div>
            	<MyForm></MyForm>
            </div>
          </div>
        </div>
      </div>
      </Router>



    );
  }
}

export default App;
