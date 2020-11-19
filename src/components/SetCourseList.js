import React,{useContext} from 'react'
import {Text } from 'react-native-elements';
import { Button} from 'native-base';
import List from './List';
import LowerButtons from './SetupLowerButtons';
import { SearchBar } from 'react-native-elements';
import Spacer from './Spacer';
import {Context as UserContext} from '../context/UserContext';

 const SetCourseList = ({state,updateSearch,myInstituteHandler,
    myDegreeHandler,toggleCourse,phaseIncreaser,phaseReducer,increaseSection}) => {
    const {editUser}=useContext(UserContext);
    const {phase,institutes,myInstitute,myDegree,myCourses,search,tutor,userId}=state;
        console.log(updateSearch)
   const switchListCases=()=>{
        if(institutes){
        switch (phase%3) {
            case 0:
              return ( <List array={institutes} search={search} usableState={myInstitute} onPressFun={myInstituteHandler} />)
            case 1:
              return (<List array={institutes[myInstitute.index].degrees} search={search} usableState={myDegree} onPressFun={myDegreeHandler}/>)
            case 2:
              return (<List array={institutes[myInstitute.index].degrees[myDegree.index].courses} search={search} usableState={myCourses} onPressFun={toggleCourse} myCoursesStyleCond={true}/>)
           default :
             return null
        }
    }
}


    const placeHolder=()=>{
        switch (phase) {
          case 0:
            return `I go to..`
          case 1:
            return `My major is..`
          case 2:
            return 'The courses I take are...'
            case 3:
                return `I graduated/go to..`
              case 4:
                return `My major is..`
              case 5:
                return 'The courses teach are...'
          default:
            return ''
        }
      }

   const switchButtonCases =()=>{
        if(institutes){
          switch (phase%3) {
            case 0:
              return <LowerButtons usableState={myInstitute} onPressFun={phaseIncreaser} buttonText={'Next'} iconName={'arrow-back'}/>
            case 1:
              return (<>
                <LowerButtons usableState={myDegree} onPressFun={phaseReducer} buttonText={'Back'} iconName={'arrow-forward'}/>
                <LowerButtons usableState={myDegree} onPressFun={phaseIncreaser} buttonText={'Next'} iconName={'arrow-back'}/>
                </>
              )
            case 2:
                return(
                    <>
                      <LowerButtons  onPressFun={phaseReducer} buttonText={'Back'} iconName={'arrow-forward'}/>
                      <Button bordered rounded disabled={myCourses.length===0?true:false} onPress={tutor?()=>editUser(userId,{courseITeach:{myInstitute,myDegree,myCourses}}):()=>increaseSection()}>
                      <Text >Finish</Text>
                      </Button>
                    </>
                )
            default:
              break;
          }
        }
      }

return(
    <>
     {phase===5&&<>
     <Spacer/>
     <Text style={{fontWeight:"bold"}}>Dont worry we will add all the corresponding courses</Text>
     </>}
    <Spacer/>
    
    <SearchBar placeholder={placeHolder()} round  
                   onChangeText={updateSearch}
                   value={search}/> 
     {switchListCases()}
    {switchButtonCases()}
    </>


)

}


export default SetCourseList;