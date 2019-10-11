import React from 'react';
import { Link } from "react-router-dom";

class ShowFoodEntry extends React.Component {
  constructor() {
    super();
    this.state = {
      foodEntry:{}
    }
  }

  deleteFoodHandleClick = (id) => {
     fetch('http://localhost:8080/foodentry/' + id, {
      method: 'delete',
    }).then(()=> {
      this.props.getDataFromAPI();
    })
  }

  updateFoodHandleClick = (id) => {
     fetch('http://localhost:8080/foodentry/' + id, {
      method: 'put',
    }).then(()=> {
      this.props.getDataFromAPI();
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    fetch("http://localhost:8080/foodentry/" + id)
    .then((res) => res.json())
    .then((entry) => {
      this.setState({foodEntry: entry})
    })
  }

  render() {
    return (
      <div>
        <div>Id: {this.state.foodEntry.id}</div>
        <div></div>
        <div>Meal: {this.state.foodEntry.meal}</div>
        <div></div>
        <Link to ={"/edit/foodentry/" + this.state.foodEntry.id}><button onClick={()=>this.updateFoodHandleClick(this.state.foodEntry.id)}>Update Entry</button></Link>
        <Link to ="/"><button onClick={()=>this.deleteFoodHandleClick(this.state.foodEntry.id)}>Delete Entry</button></Link>
      </div>
    )
  }
}

export default ShowFoodEntry;