import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";

class FoodForm extends React.Component {
  constructor() {
    super();
    this.state = {
      mealType:"",
      meal:"",
      satisfactionScore:null,
      wouldEatAgain:true,
      wasHomeCooked:true,
      id: 0
    }
  }

  onMealTypeInput = (item) => {
    this.setState({mealType: item.target.value});
  }

  onMealInput = (item) => {
    this.setState({meal: item.target.value});
  }

  onSatisfactionScoreInput = (item) => {
    this.setState({satisfactionScore: parseInt(item.target.value)});
  }

  // onWouldEatAgainInput = (item) => {
  //   this.setState({wouldEatAgain: item.target.value});
  // }

  // onWasHomeCookedInput = (item) => {
  //   this.setState({wasHomeCooked: item.target.value});
  // }

  onIdInput = (item) => {
    this.setState({id: item.target.value});
  }

  handleCreateClick = (item) => {
    fetch('http://localhost:8080/foodentry/', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mealType:this.state.mealType,
        meal:this.state.meal,
        satisfactionScore:this.state.satisfactionScore,
        wouldEatAgain:this.state.wouldEatAgain,
        wasHomeCooked:this.state.wasHomeCooked
      })
    }).then(()=> {
      this.props.getDataFromAPI();
      this.setState({mealType:"", meal:"",satisfactionScore:0})
    })
  }

  handleUpdateClick = (item) => {
    fetch('http://localhost:8080/foodentry' + this.state.id, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mealType:this.state.mealType,
        meal:this.state.meal,
        satisfactionScore:this.state.satisfactionScore,
        wouldEatAgain:this.state.wouldEatAgain,
        wasHomeCooked:this.state.wasHomeCooked
      })
    }).then(()=> {
      this.props.getDataFromAPI();
      this.setState({mealType:"", meal:"",satisfactionScore:0,id:0})
    })
  }


  render() {

    let showIdField;
    let showButton;
    let { id } = this.props.match.params;

    if(this.state.id) {
      showIdField = <input onInput={this.onIdInput} type="number" value={this.state.id} />
      showButton = <button onClick={this.handleUpdateClick}>Update FoodEntry</button>
    } else {
      showButton = <button onClick={this.handleCreateClick}>Create FoodEntry</button>
    }

    return(
      <div>
        {showIdField}
        <input onInput={this.onMealTypeInput} type="text" value={this.state.mealType} placeholder="Type of Meal" />
        <input onInput={this.onMealInput} type="text" value={this.state.meal} placeholder="Meal" />
        <input onInput={this.onSatisfactionScoreInput} type="number" value={this.state.satisfactionScore} placeholder="Satisfaction Score 1-10" />
        <input placeholder="Eat again?" />
        <input placeholder="Homecooked?" />
        <Link to="/">{showButton}</Link>

      </div>
    );
  }
}

export default FoodForm;
