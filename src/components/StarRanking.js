import React from 'react'
import {View} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';


const StarRanking = () =>{
 const userRating=4
    return(<View style={{marginTop:20}}>
            <Rating type='custom' tintColor='#ccffff' isDisabled={true}  startingValue={userRating} ratingColor='green'
  ratingBackgroundColor='#c8c7c8' style={{paddingVertical: 10 }}/>
          </View>

    )
}

export default StarRanking;