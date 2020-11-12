import React,{useState} from 'react'
import {View} from 'react-native'
import { Overlay } from 'react-native-elements';
import MultiSelection from '../components/MultiSelection'
import FilterSelection from '../components/FilterSelection'

//Select my Institute, Degree and current courses
const Setup = () => {
    const institutes = ['אוניברסיטת אריאל', 'אוניברסיטת בן-גוריון בנגב', 'אוניברסיטת בר-אילן', 'אוניברסיטת חיפה', 'אוניברסיטת תל אביב', 'אורות ישראל מכללה אקדמית לחינוך מיסודן של מכללת אורות ישראל ומכללת מורשת יעקב', 'אלקאסמי – מכללה אקדמית לחינוך', 'אמונה-אפרתה – מכללה אקדמית לאמנויות וחינוך', 'אפקה – המכללה האקדמית להנדסה בתל-אביב', 'בצלאל – אקדמיה לאמנות ועיצוב ירושלים', 'האוניברסיטה העברית בירושלים', 'האוניברסיטה הפתוחה', 'האקדמיה למוסיקה ולמחול בירושלים', 'האקדמית תל-אביב יפו', 'הטכניון – מכון טכנולוגי לישראל', 'המכללה האקדמית אחוה', 'המכללה האקדמית אשקלון', 'המכללה האקדמית בוינגייט', 'המכללה האקדמית בית-ברל', 'המכללה האקדמית גליל מערבי', 'המכללה האקדמית הדסה ירושלים', 'המכללה האקדמית הדתית לחינוך שאנן', 'המכללה האקדמית הערבית לחינוך בישראל – חיפה', 'המכללה האקדמית הרצוג מיסודן של מכללות ליפשיץ והרצוג', 'המכללה האקדמית כנרת בעמק הירדן', 'המכללה האקדמית להנדסה אורט בראודה', 'המכללה האקדמית להנדסה ע”ש סמי שמעון', 'המכללה האקדמית לחברה ואמנויות', 'המכללה האקדמית לחינוך גבעת וושינגטון', 'המכללה האקדמית לחינוך ולספורט אוהלו בקצרין', 'המכללה האקדמית לחינוך חמדת הדרום', 'המכללה האקדמית לחינוך ע”ש א. ד. גורדון', 'המכללה האקדמית לחינוך ע”ש דוד ילין', 'המכללה האקדמית לחינוך ע”ש קיי', 'המכללה האקדמית לישראל ברמת-גן', 'המכללה האקדמית נתניה', 'המכללה האקדמית ספיר', 'המכללה האקדמית עמק יזרעאל ע”ש מקס שטרן', 'המכללה האקדמית צפת', 'המכללה האקדמית תל חי', 'המסלול האקדמי המכללה למינהל', 'המרכז האקדמי לב', 'המרכז האקדמי למשפט ולעסקים', 'המרכז האקדמי לעיצוב ולחינוך ויצו – חיפה ע”ש נרי בלומפילד', 'המרכז האקדמי פרס', 'המרכז האקדמי רופין', 'המרכז האקדמי שלם', 'המרכז האקדמי שערי מדע ומשפט', 'המרכז הבינתחומי הרצליה', 'הקריה האקדמית אונו', 'מכון ויצמן למדע', 'מכון טכנולוגי חולון – HIT', 'מכון שכטר למדעי היהדות', 'מכללה אקדמית לחינוך “אורנים”', 'מכללה ירושלים', 'מכללת לוינסקי לחינוך', 'מכללת סכנין להכשרת עובדי הוראה', 'סמינר הקיבוצים – המכללה לחינוך לטכנולוגיה ולאומנויות', 'עזריאלי- מכללה אקדמית להנדסה ירושלים', 'שנקר. הנדסה. עיצוב. אמנות', 'תלפיות – המכללה האקדמית לחינוך']
    const initialInstitutes = ['אוניברסיטת אריאל', 'אוניברסיטת בן-גוריון בנגב', 'אוניברסיטת בר-אילן', 'אוניברסיטת חיפה', 'אוניברסיטת תל אביב', 'אפקה – המכללה האקדמית להנדסה בתל-אביב', 'האוניברסיטה העברית בירושלים', 'האוניברסיטה הפתוחה', 'הטכניון – מכון טכנולוגי לישראל', 'המכללה האקדמית להנדסה אורט בראודה', 'המרכז האקדמי רופין', 'המרכז הבינתחומי הרצליה']
    const degrees = ["מדעי המחשב", "הנדסת ביוטכנולגיה", "הנדסת חשמל", "הנדסה תעשייה וניהול", "מתמטיקה", "פיסיקה", "יחסים בין לאומיים"]
    const initialDegrees = ["מדעי המחשב", "הנדסת ביוטכנולגיה", "הנדסת חשמל", "פיסיקה", "יחסים בין לאומיים"]
    const courses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב','מערכות ספרתיות','תכנות מערכות','אלגברה לינארית','אינפי 1','אינפי 2','אינפי 3'];
    const [myInstitute, setMyInstitute] = useState("");
    const [myDegree, setMyDegree] = useState("");
    const [myCourses, setMyCourses] = useState([]);
    const [currentComponent, setcurrentComponent] = useState("institute");


    return <>
    <Overlay isVisible={true} fullScreen>
        <View style={{width:300}}>
            {currentComponent==="institute" ? <FilterSelection
            multi={false}
            placeHolder="איפה את\ה לומד\ת?"
            intialData={initialInstitutes}
            dataToFilter={institutes}
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