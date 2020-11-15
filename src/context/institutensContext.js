 import createDataContext from './createDataContext';
// import UserApi from '../api/Users'
// import { interpolate } from 'react-native-reanimated';
// import { subscribe } from '../Server/routes/authRoutes';

    const instReducer = (state,action) =>{
        switch(action.type){
            case 'get_institutes':
                return{...state,institutes:action.payload}
            case 'add_err':
                return { ...state ,errMessage: action.payload}
            case 'set_data':
                return {...state, data:action.payload}
            case 'clear_err':
                return {...state , errMessage:action.payload}
            default:
                return state;
        }
    };

// //     const splitData = dispatch=> (data)=>{
// //         var institues =[];
// //         var degrees=[];
// //         var courses=[];
// //         var subjects=[];
// //         degIndex=0;
// //         var instIndex;
// //         var courseIndex;
// //         var subIndex;
// //         data.map(inst=>{
// //             degIndex=0;
// //             institues.push({hebName:inst.hebName,instIndex})
// //             inst.map(degree=>{
// //                 courseIndex=0;
// //                 degrees.push({hebName:degree.hebName,engName:degree.engName,degIndex})
// //                 degree.map(course=>{
// //                 subIndex=0;
// //                 courses.push({hebName:course.hebName,engName:course.engName,courseIndex})
// //                 course.map(subject=>{
// //                     subjects.push({hebName:subject.hebName,engName:subject.engName,subIndex})
// //                     subIndex++;
// //                 })
// //                 courseIndex++;
// //             })
// //             degree++;
// //         })
// //         instIndex++;
// //     })
// //       data={institues,degrees,courses,subjects};
// //       dispatch({type:'set_data',payload:data})
// // }

    const getInstitutes = dispatch => async()=>{
        try{
        const response = await UserApi.get(`/institute`);
        console.log(response.data);
        dispatch({type:'get_institutes',payload:response.data.institutes})
        }catch(err){
            dispatch({type:'add_err', payload:'Unable to fetch data'})
        }
    }

export const {Provider, Context} = createDataContext(instReducer,{getInstitutes},{institutes:null,errMessage:''})