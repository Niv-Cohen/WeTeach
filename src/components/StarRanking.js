import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';


const StarRanking = () =>{
 const userRating=4
    return(<>
            <Rating type='custom' tintColor='#ccffff' isDisabled={true}  startingValue={userRating} ratingColor='green'
  ratingBackgroundColor='#c8c7c8' style={{ paddingVertical: 10 }}/>
          </>

    )
}

export default StarRanking;