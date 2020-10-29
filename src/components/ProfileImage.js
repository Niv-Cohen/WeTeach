import React ,{useState,useEffect}from 'react'
import { Dimensions,Image,View,StyleSheet,Text,FlatList } from 'react-native'
import { ImageManipulator } from 'expo-image-crop';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Overlay,Button,ButtonGroup } from 'react-native-elements';
const Examples =() =>{
    const [layout,setLayout]=useState(false);
    const [crop,setCrop]=useState(false);
    const [uri,setUri]=useState('https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
    const toggleOverlay = () => {
        setLayout(!layout);
    };

    const onToggleModal = () => {
        setCrop(!crop)
    }

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const takePhoto = ()=>{

    }
      
    const cancelLayout = ()=>{
        setLayout(false)
    }

    const buttons = [{title:'Choose Photo From Gallery',onpress:pickImage}, 
    {title:'Take a Photo ',onpress:takePhoto}
    , {title:'Cancel',onpress:cancelLayout}]

    return (
        <View>
        <ImageManipulator
            photo={{ uri }}
            isVisible={crop}
            onPictureChoosed={ ({  uri: uriM }) => setUri(uriM)}
            onToggleModal={onToggleModal}
        />
    <View style={{alignSelf:'center', marginVertical:30}}>
    <Avatar size="xlarge"  rounded onPress={toggleOverlay}
    source={{uri: uri,}} />
    <Text h4 style={{marginRight:10,fontFamily:'sans-serif-light',fontSize:20,fontWeight:'bold'}}>Niv Cohen</Text> 
    </View>
    <Overlay isVisible={layout} onBackdropPress={toggleOverlay} overlayStyle={{width:300,height:400}}>
    <Avatar size="large" containerStyle={{alignSelf:"center",marginBottom:20}} rounded onPress={toggleOverlay}
    source={{uri: uri,}} />
    <View>
    <FlatList style={{marginVertical:10}} keyExtractor={(item)=>item.title} data={buttons} 
        renderItem={(item)=>{ return(<View style={{
        marginVertical: 8,
        justifyContent: "space-between"}}><Button style={{marginVertical:30,borderRadius:20}} title={item.item.title} onPress={item.item.onpress}></Button></View>)}}
        keyExtractor={(item) => item.id}
      />
      </View>
    </Overlay>
    </View>
    )

}





const style =StyleSheet.create({
    img:{
        width:200,
        height:100,
        alignSelf:"center"
    }

})

export default Examples