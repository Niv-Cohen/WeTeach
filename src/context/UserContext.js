import createDataContext from './createDataContext';
import UserApi from '../api/Users';
import {navigate} from '../NavigationRef';

const userReducer = (state, action) =>{
  switch (action.type) {
    case 'edit_user': 
      return {...state, user: action.payload}
    case 'set_raw_data':
      return {...state, rawData: action.payload};
    case 'set_user':
      return {...state, user: action.payload};
    case 'save_inst_data':
      return {...state, instituteData: action.payload};
    case 'add_err':
      return {...state, errMessage: action.payload};
    case 'clear_err':
      return {...state, errMessage: action.payload};
    default:
      return state;
  }
};

const convertToArr=(map)=> {
  let arrayToSend = [];
  map.forEach((value, key, map) => {
    for (const subject of value) {
      arrayToSend=[...arrayToSend, {engName: subject.engName}];
    }
  });
  return arrayToSend;
};

const setRawInstituteData = (dispatch) =>async ()=>{
  try {
    const {data} = await UserApi.get(`/institute`);
    console.log(data);
    dispatch({type: 'set_raw_data', payload: data});
  } catch (err) {
    dispatch({type: 'add_err', payload: 'Unable to fetch data'});
  }
};

const saveInstitutesData = (dispatch) => ({institutes})=>{
  try {
    dispatch({type: 'save_inst_data', payload: institutes});
  } catch (err) {
    dispatch({type: 'add_err', payload: 'Unable to fetch data'});
  }
};

const setUser = (dispatch) => async (user)=>{
  console.log('Setting user');
  dispatch({type: 'set_user', payload: user});
};

const editUser = (dispatch) => async (_id, params) => {
  try {
    console.log('Im in edituser func');
    const {subjectsIHelp}=params;
    // console.log(params)
    // console.log(_id)

    if (subjectsIHelp) {
      params.subjectsIHelp=convertToArr(subjectsIHelp);
      //console.log(params.subjectsIHelp);
    }

    const response = await UserApi.put(`/user/`, {_id, params});
    const {user}= response.data;
    console.log('user was edited');
    console.log('now navigating to mainFlow');
    console.log(user)
    dispatch({type: 'edit_user', payload:user});
    navigate('Account');
  } catch (err) {
    dispatch({type: 'add_err', payload: 'Something went wrong'});
    console.log('something went wrong!');
    console.log(err.message);
  }
};

export const {Provider, Context} = createDataContext(userReducer,
    {setUser, editUser, saveInstitutesData, setRawInstituteData},
    {instituteData: null, rawData: null, user: null, errMessage: ''});
