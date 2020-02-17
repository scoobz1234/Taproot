import React from 'react';
import StarRating from 'react-native-star-rating';

import Colors from '../constants/Colors';
 
export default class FiveStarRating extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3
    };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() {
    return (
        <StarRating
            disabled={false}
            maxStars={5}
            fullStarColor={Colors.tertiary}
            emptyStarColor={Colors.primary}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
    );
  }
}