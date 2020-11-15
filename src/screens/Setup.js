import React,{Component} from 'react'
import {View,StyleSheet} from 'react-native'
import { Overlay,Text,Divider,SearchBar } from 'react-native-elements';
import { Button} from 'native-base';
import { Chip } from 'react-native-paper';
import List from '../components/List';
import LowerButtons from '../components/SetupLowerButtons';
import UserApi from '../api/Users';
import {Context as UserContext} from '../context/UserContext';
import Spacer from '../components/Spacer'
import {navigate} from '../NavigationRef'

var Spinner = require('react-native-spinkit');

class Setup extends Component {

  static contextType =UserContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedCourse:null,
            selectCourseSubjects:null,
            SubjectsIHelp:[],
            tempList:[],
            search:'',
            section:0,
            subscribeFunc:null,
            userId:null,
            data:null,
            institutes:null,
            myInstitute:null,
            myDegree:null,
            myCourses:[],
            phase:0 };
      }

    async componentDidMount() {
        const {data} = await UserApi.get(`/institute`);
        var institutes =[];
        var degrees=[];
        var courses=[];
        var subjects=[];
        var instIndex=0;
        var degIndex;
        var courseIndex;
        var subIndex;
          instIndex=0;
        data.map(inst=>{
            degIndex=0;
            degrees=[];
            inst['degrees'].map(degree=>{
                courseIndex=0;
                courses=[];
                 degree['courses'].map(course=>{                   
                    subIndex=0;
                    subjects=[];
                    course['subjects'].map(subject=>{
                        subjects.push({hebName:subject.hebName,engName:subject.engName,subIndex})
                        subIndex++;
                    })
                    courses.push({hebName:course.hebName,courseIndex,subjects});
                    courseIndex++;            
                })
                degrees.push({hebName:degree.hebName,degIndex,courses});
                degIndex++;
            })
            institutes.push({hebName:inst.hebName,instIndex,degrees})
            instIndex++;
        })
        console.log('I finished split')
        const context =this.context;
        console.log(context.state)
        this.setState({institutes:institutes,subscribeFunc:context.subscribeSubjects,userId:context.state.user._id});
    }



     firstPhasePress =(index,hebName)=>{
        setMyInstitute({index:index,hebName:hebName});
    }

    secondPhasePress =(index,hebName)=>{
        setMyDegree({index:index,hebName:hebName});
    }
    toggleCourse = (index,hebName)=>{
        if(this.state.myCourses.some((course)=>course.index===index))
            this.setState({myCourses:this.state.myCourses.filter((course=>course.index!==index))})
        else
            this.setState({myCourses:[...this.state.myCourses,{hebName,index}]})
    }
    myInstituteHandler = (index,hebName)=>{
        this.setState({myInstitute:{index,hebName}})
    }
    myDegreeHandler = (index,hebName)=>{
        this.setState({myDegree:{index,hebName}})
    }
    myCoursesHandler = (index,hebName)=>{
        this.setState({myCourses:{index,hebName}})
    }

    phaseIncreaser = ()=>{this.setState({phase:this.state.phase+1})};
    
    phaseReducer = ()=>{
      switch (this.state.phase) {
        case 2:
          this.setState({myCourses:[]});
          break;
        case 1:
          this.setState({myDegree:null});
          break;
        default:
          break;
      }
      this.setState({phase:this.state.phase-1})};
    
    switchListCases=()=>{
        const {phase,institutes,myInstitute,myDegree,myCourses,search}=this.state;
        if(institutes){
        switch (phase) {
            case 0:
              return ( <List array={institutes} search={search} usableState={myInstitute} onPressFun={this.myInstituteHandler} />)
            case 1:
              return (<List array={institutes[myInstitute.index].degrees} search={search} usableState={myDegree} onPressFun={this.myDegreeHandler}/>)
            case 2:
              return (<List array={institutes[myInstitute.index].degrees[myDegree.index].courses} search={search} usableState={myCourses} onPressFun={this.toggleCourse} myCoursesStyleCond={true}/>)
           default :
             return null
        }
    }
    }

    switchButtonCases =()=>{
      const {phase,institutes,myInstitute,myDegree,myCourses,section}=this.state;
      if(institutes){
        switch (phase) {
          case 0:
            return <LowerButtons usableState={myInstitute} onPressFun={this.phaseIncreaser} buttonText={'הבא'} iconName={'arrow-back'}/>
          case 1:
            return (<>
              <LowerButtons usableState={myDegree} onPressFun={this.phaseReducer} buttonText={'חזור'} iconName={'arrow-forward'}/>
              <LowerButtons usableState={myDegree} onPressFun={this.phaseIncreaser} buttonText={'הבא'} iconName={'arrow-back'}/>
              </>
            )
          case 2:
              return(
                  <>
                    <LowerButtons  onPressFun={this.phaseReducer} buttonText={'חזור'} iconName={'arrow-forward'}/>
                    <Button bordered rounded disabled={myCourses.length===0?true:false} onPress={()=>
                      {
                        this.state.subscribeFunc(myCourses,this.state.userId)
                        this.setState({section:section+1})
                        }}>
                    <Text >סיים הרשמה</Text>
                    </Button>
                  </>
              )
          default:
            break;
        }
      }
    }

    placeHolder=()=>{
      const {phase}=this.state;
      switch (phase) {
        case 0:
          return `אני לומד ב....`
        case 1:
          return `אני לומד....`
        case 2:
          return 'קורסים הסימסטר'
        default:
          return ''
      }
    }

    updateSearch = (search) => {
      this.setState({search});
    };


   render() {
    const {section,search,phase,institutes,myInstitute,myDegree}=this.state

        return(
            
            <View>
                 <Overlay visible={true} overlayStyle={{width:300,height:550}}>
                 {section===0?
                   <>
                   <SearchBar placeholder={this.placeHolder()} round  
                   onChangeText={this.updateSearch}
                   value={search}/>
                 <Divider style={{ backgroundColor: 'black',height: 2 }} />
                 {this.switchListCases()}
                 {this.switchButtonCases()}
                 </>
                 :section===1?<>
                 <Spacer/>
                 <Text h4>סיימת את תהליך ההרשמה!</Text>
                 <Spacer/>
                 <Text h3 style={{alignSelf:'center'}}>Be A Helper!</Text>
                 <Spacer/>
                 <Text h4 style={{alignContent:'center'}}>האם קיימים נושאים בהם תוכל לעזור?</Text>
                 <Spacer/>
                 <Text style={{fontWeight:'bold'}}> קבלת הטבות למסעדות ברים ועוד אטרקציות </Text>
                 <Spacer/>
                 <Text style={{fontWeight:'bold'}}>קבלת תעדוף בעזרה מסטודנטים אחרים!</Text>
                 <Button bordered rounded onPress={()=>this.setState({section:section+1})}>
                  <Text>צרף אותי</Text>
                 </Button>
                 <Button bordered rounded onPress={()=>navigate('Account')}>
                  <Text>אולי אחר כך</Text>
                 </Button>
                 </>:
                  <>
                  <View>
                  {}

                  </View>
                  <hr/>
                  <View style={{flex:1,  flexDirection: 'row', alignItems:'center',alignSelf:'stretch', justifyContent: 'flex-start',bottom:0}}>
                  {institutes[myInstitute.index].degrees[myDegree.index].courses.map((course,i)=>{
                    return(
                      <Chip
                      style={{marginVertical:10,marginHorizontal:0.5}}>
                        {course.hebName}
                        </Chip>
                    )
                  })}
                  </View>
                  </>
                 
                 
                 }
               </Overlay>
               </View>)
    
}}



styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
      },
    
      spinner: {
        marginBottom: 50
      },
    
      btn: {
        marginTop: 20
      },
    
      text: {
        color: "white"
      },
    chosen:{
        backgroundColor:'#7690AC'
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });


export default Setup;              


 
      


