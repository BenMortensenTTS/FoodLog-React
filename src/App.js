import React from 'react';
import './App.css';
import FoodForm from './components/FoodForm';
import ShowFoodEntries from './components/ShowFoodEntries';
import ShowFoodEntry from './components/ShowFoodEntry';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      foodData: []
    }
  }

  getDataFromAPI = () => {
    fetch("http://localhost:8080/foodentries")
    .then((res)=> res.json())
    .then((response) => {
      this.setState({foodData: response});
    });
  }

  componentDidMount() {
    this.getDataFromAPI();
  }

  render() {

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Show Entries</Link>
              </li>
              <li>
                <Link to="/create">Create FoodEntry</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/foodentry/:id" render={(props)=> (
              <ShowFoodEntry {...props} getDataFromAPI={this.getDataFromAPI}/>
            )}/>
            <Route path="/edit/foodEntry/:id" render={(props)=> (
              <FoodForm {...props} getDataFromAPI={this.getDataFromAPI} />
            )} />
            <Route path="/create">
              <FoodForm getDataFromAPI={this.getDataFromAPI}/>
            </Route>
            <Route exact path="/">
              <ShowFoodEntries getDataFromAPI={this.getDataFromAPI} entries={this.state.foodData}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}




export default App;