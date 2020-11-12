import createDataContext from './createDataContext';
import UserApi from '../api/Users'

const userReducer = (state,action) =>{
    switch(action.type){
        case 'edit_User':
            return{...state,user:action.payload}
        case 'set_user':
            return{...state,user:action.payload}
        case 'add_err':
            return { ...state ,errMessage: action.payload}
        case 'clear_err':
            return {...state , errMessage:action.payload}
        default:
            return state;
    }
};
    const setUser = dispatch => async({userId})=>{
        dispatch({type:'set_user',payload:user})
        const response =await UserApi.post('/ActionCenter/create',userId);
        dispatch({type:'update_action_center',payload:response.data.ac});
    }

    const subscribeSubject = dispatch => async ({courses,userId})=>{
        try{
            const response =await UserApi.put('/subject/subscribe',{courses,userId});
            dispatch({type:'edit_user', payload: response.data.user});
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
            console.log(err.message)
        }
    }

    const subscribeCourse = dispatch => async ({courses,tutorId})=>{
        try{
            const response =await UserApi.put('/course/subscribe',{courses,tutorId});
            dispatch({type:'edit_user', payload: response.data.user});
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
            console.log(err.message)
        }
    }

    const editUser = dispatch => async ({_id,params}) => {
        try{
            console.log(params)
            console.log(_id)
            const response = await UserApi.put(`/users/${_id}`,{_id,params});
            console.log(response.data)
            dispatch({type:'edit_user', payload: response.data.user})
        }catch(err){
            dispatch({type:'add_err', payload:'Something went wrong'})
            console.log(err.message)
        }
    }

export const {Provider, Context} = createDataContext(userReducer,{setUser,editUser,subscribeCourse,subscribeSubject},{user:null,errMessage:''})