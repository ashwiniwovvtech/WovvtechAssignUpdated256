import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';


export default class RelatedNews extends Component {


  constructor(props){
    super(props);
    this.state = {
        data:[],
        isLoading:true,
    };
    this.fetchData();
 }


  fetchData = () => {

    return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
    
      .then(response => response.json())
      .then(responseJson => {
          this.setState({
              isLoading:false,
              data:responseJson.hits
          })
      });
}
  
    render(){
  
      return (
        <View style={styles.container}>
           <FlatList
              data={this.state.data}
              renderItem={({ item }) => 
              <View style={styles.item}>
                  <TouchableOpacity 
                      onPress={()=> this.props.navigation.navigate("Newspage" )}> 
                      <View style={styles.itemContainer}>
                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.newsText}>Headline: </Text>
                              <Text style={styles.newsText, {width:300}} numberOfLines={1}>{item.title}</Text>
                          </View>   
                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.ttext}>Created at : </Text>
                              <Text>{item.created_at}</Text>
                          </View>  

                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.ttext}>URL : </Text>
                              <Text style={{width:300}} numberOfLines={3}>{item.url}</Text>
                          </View> 
                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.ttext}>Author : </Text>
                              <Text>{item.author}</Text>
                          </View>            
                      </View>       
            

                  </TouchableOpacity>
                  
              </View>
          
              }
              keyExtractor={item => item.id}
            />
        </View>
      );
  
    }
   
  }
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:10,
    },
    searchContainer:{
        flex:4,
        flexDirection:'row',       
        padding:10,
        margin:8,
        fontSize:15,
        borderColor: '#888',
        backgroundColor: '#FFFFFF',
    },
    subcontainer:{
        flexDirection:'row',
        
    },
    imageCon:{
        flex:1,
        padding:10,
        margin:2,
    },
    newsText:{
        fontSize:16
    },
    simage:{
        height:30,
        width:30,
        alignSelf:'flex-end',
        marginHorizontal:3,
        marginVertical:5,
    },
    item:{
        borderColor:'#eee',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
    },
    ttext:{
        fontSize:14,
        color:'#000',
    },
    textStyle: {
        padding: 10,
     },
    textInputStyle: {
        flex:3,
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#888',
        backgroundColor: '#FFFFFF',
        marginHorizontal:8,
      },
    itemContainer:{
        paddingHorizontal:10,
      }
  });
  