 import createDataContext from './createDataContext';
// import UserApi from '../api/Users'
// import { interpolate } from 'react-native-reanimated';
// import { subscribe } from '../Server/routes/authRoutes';

    const instReducer = (state,action) =>{
        switch(action.type){
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

export const {Provider, Context} = createDataContext(instReducer,{},{data:null,institutes:null,errMessage:''})