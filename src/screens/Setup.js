import React,{useContext, useState} from 'react'
import {View} from 'react-native'
import { Overlay } from 'react-native-elements';
import MultiSelection from '../components/MultiSelection'
import FilterSelection from '../components/FilterSelection'
import {Context as instContext} from '../context/institutensContext'
//Select my Institute, Degree and current courses
const Setup = () => {
    const {institutes,data,getInstitutes,splitData}= useContext(instContext);
    //set up all institutes data
    getInstitutes();
    splitData(institutes);


    //const initialInstitutes = ['אוניברסיטת אריאל', 'אוניברסיטת בן-גוריון בנגב', 'אוניברסיטת בר-אילן', 'אוניברסיטת חיפה', 'אוניברסיטת תל אביב', 'אפקה – המכללה האקדמית להנדסה בתל-אביב', 'האוניברסיטה העברית בירושלים', 'האוניברסיטה הפתוחה', 'הטכניון – מכון טכנולוגי לישראל', 'המכללה האקדמית להנדסה אורט בראודה', 'המרכז האקדמי רופין', 'המרכז הבינתחומי הרצליה']
    //const degrees = ["מדעי המחשב", "הנדסת ביוטכנולגיה", "הנדסת חשמל", "הנדסה תעשייה וניהול", "מתמטיקה", "פיסיקה", "יחסים בין לאומיים"]
    //const initialDegrees = ["מדעי המחשב", "הנדסת ביוטכנולגיה", "הנדסת חשמל", "פיסיקה", "יחסים בין לאומיים"]
    //const courses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב','מערכות ספרתיות','תכנות מערכות','אלגברה לינארית','אינפי 1','אינפי 2','אינפי 3'];
    const [myInstitute, setMyInstitute] = useState([]);
    const [myDegree, setMyDegree] = useState("");
    const [myCourses, setMyCourses] = useState([]);
    const [currentComponent, setcurrentComponent] = useState("institute");
   // useEffect(getInstitutes,[]);

    return <>
    <Overlay isVisible={true} fullScreen>
        <View style={{width:300}}>
            {currentComponent==="institute" ? <FilterSelection
            multi={false}
            placeHolder="איפה את\ה לומד\ת?"
            intialData={data.inst}
            dataToFilter={data.inst}
            selectedItem={myInstitute}
            setSelectedItem={setMyInstitute}
            onFinish={()=>{
            setcurrentComponent("degree")
        }} /> : null}

        {currentComponent==="degree"?<FilterSelection
            multi={false}
            placeHolder="מה את\ה לומד\ת?"
            intialData={initialDegrees}
            dataToFilter={degrees}
            selectedItem={myDegree}
            setSelectedItem={setMyDegree}
            onFinish={()=>{
            setcurrentComponent("courses")
        }}/>:null }

        {currentComponent==="courses"?
            <FilterSelection
            multi={true}
            placeHolder="אילו קורסים את\ה לומד\ת?"
            intialData={courses}
            dataToFilter={courses}
            selectedItem={myCourses}
            setSelectedItem={setMyCourses}
            onFinish={
                ()=>{setcurrentComponent("")}
            }/>:null}
        </View>
    </Overlay>
     </>
   }
   
   
export default Setup