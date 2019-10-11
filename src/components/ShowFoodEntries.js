import React from 'react';
import { Link } from "react-router-dom";

class ShowFoodEntries extends React.Component {

  render() {

    let iterateData = this.props.entries;
    let finished = iterateData.map((item)=> {
      return (
        <div>
          <Link to={"/foodentry/" + item.id} key={item.id + 100} >
            Id: {item.id}, 
            MealType: {item.mealType}, 
            Meal: {item.meal}, 
            Satisfaction Score: {item.satisfactionScore}, 
          </Link>
        </div>
      )
    })

    return (
      <div>
        {finished}
      </div>
    );
  }
}

export default ShowFoodEntries;
