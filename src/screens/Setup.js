import React,{Component} from 'react'
import {View,StyleSheet,ScrollView} from 'react-native'
import { Overlay,Text,ButtonGroup } from 'react-native-elements';
import { Button} from 'native-base';
import { Chip } from 'react-native-paper';
import Spinner from '../components/Spinner';
import Congrats from '../components/Congrats';
import UserApi from '../api/Users';
import {Context as UserContext} from '../context/UserContext';
import Spacer from '../components/Spacer'
import SetupButtonGroup from '../components/SetupButtonGroup';
import SetHelper from '../components/selectSubjectsAsHelper'
import SetCourseList from '../components/SetCourseList'
import MultiSwitch from 'rn-slider-switch';

class Setup extends Component {

  static contextType =UserContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedButtonIndex:1,
            selectedCourse:null,
            subjectsIHelp:new Map(),
            tutor:false,
            tempList:[],
            search:'',
            section:-1,
            editUser:null,
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
        const context =this.context;
        this.setState({institutes:institutes,editUser:context.editUser,
          userId:context.state.user._id,section:0});
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

   addSubjectToggle = (selectedSubject)=> {
      const {subjectsIHelp,selectedCourse} = this.state;
      var updatedMap=subjectsIHelp;
      var updatedSubjectsList;
      const {courseName}=selectedCourse
      if(!subjectsIHelp.has(courseName)){
        console.log('added new course in addition to subject')
        updatedMap.set(courseName,[selectedSubject]);
      }
      //the course is on the list
      else{
      //the subject was found
      console.log('the course is on the list')
      if(subjectsIHelp.get(courseName).some(sub=>sub.engName===selectedSubject.engName)){
        //this is the only subject on the course lists
        if(subjectsIHelp.get(courseName).length===1){
            console.log('length is one')
            updatedMap.delete(courseName);
        } //there are more subjects in the course list
        else{
         updatedMap=subjectsIHelp;
         updatedSubjectsList=subjectsIHelp.get(courseName);
          updatedSubjectsList=updatedSubjectsList.filter(sub=>sub.engName!==selectedSubject.engName);
            updatedMap.set(courseName,updatedSubjectsList);
        }
      }
      //add subject to course list
      else{
          console.log('push subject into exsisting list');
          updatedSubjectsList=subjectsIHelp.get(courseName);
           updatedSubjectsList=updatedSubjectsList.concat([selectedSubject]);
           updatedMap =subjectsIHelp;
           updatedMap.set(courseName,updatedSubjectsList);
    }
  }
  this.setState({subjectsIHelp:updatedMap})
  console.log(subjectsIHelp);
}

 updateSearch = (search) => {
  this.setState({search});
};

  increaseSection= ()=>{
    this.setState({section:this.state.section +1})
  }

  coursePicker = (courseName,index)=>{(this.setState({selectedCourse:{courseName,index}}))}

  updateIndex =(selectedButtonIndex)=> {
    this.setState({selectedButtonIndex,tutor:!this.state.tutor,phase:selectedButtonIndex===1?0:3})
  }

   render() {
      const {section,selectedButtonIndex}=this.state
    return(
            <View>
                 <Overlay visible={true} overlayStyle={{width:300,height:550}}>
                <SetupButtonGroup selected={selectedButtonIndex} setSelected={this.updateIndex}/>
                {selectedButtonIndex===1?section===-1?
                 <Spinner/>
                 :section===0?
                 <SetCourseList myInstituteHandler={this.myInstituteHandler} myDegreeHandler={this.myDegreeHandler}
                  toggleCourse={this.toggleCourse} phaseIncreaser={this.phaseIncreaser} phaseReducer={this.phaseReducer} 
                  increaseSection={this.increaseSection} updateSearch={this.updateSearch}
                 state={this.state}/>
                 :section===1?
                 <Congrats state={this.state} increaseSection={this.increaseSection}/>:
                 <SetHelper state={this.state} coursePicker={this.coursePicker}  addSubjectToggle={this.addSubjectToggle} />
                 :selectedButtonIndex===0&&
                 <>
                 <SetCourseList myInstituteHandler={this.myInstituteHandler} myDegreeHandler={this.myDegreeHandler}
                  toggleCourse={this.toggleCourse} phaseIncreaser={this.phaseIncreaser} phaseReducer={this.phaseReducer} 
                  increaseSection={this.increaseSection} updateSearch={this.updateSearch}
                 state={this.state}/>
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


 
      


