/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchEvents } from './Api';

class App extends Component {
  state = {
    isLoading: true,
    events: []
  };

  async componentDidMount() {
    fetchEvents()
      .then(res => {
        this.setState({
          events: res.events,
          isLoading: false
        })
      })
  }

  abc(events) {
    console.log(events);
  }

  render() {
    const {events, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
            {this.abc(events)}
            {events.map(event =>
              <div key={event.id}>
                {event.name}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;*/

import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from './EventList';
import EventEdit from './EventEdit';
import EventDetail from './EventDetail';
import EventListWeek from './EventListWeek';
import EventListDay from './EventListDay';
import TypeList from './TypeList';
import TypeEdit from './TypeEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/events' exact={true} component={EventList}/>
          <Route path='/events/:id' exact={true} component={EventDetail}/>
          <Route path='/events/edit/:id' exact={true} component={EventEdit}/>
          <Route path='/events/week/:nr' exact={true} component={EventListWeek}/>
          <Route path='/events/:year/:month/:day' exact={true} component={EventListDay}/>
          <Route path='/types' exact={true} component={TypeList}/>
          <Route path='/types/:id' exact={true} component={TypeEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;