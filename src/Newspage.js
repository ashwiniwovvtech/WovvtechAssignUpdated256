import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, 
    TouchableOpacity,
    FlatList, RefreshControl } from 'react-native';

export default class Newspage extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            count:0
        },
        this.getNewsData();
        setInterval(this.getNewsData,10000)
    }


    getNewsData = () =>{
        this.setState({isLoading:true})

        return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+ this.state.count)
        .then(response => response.json())
        .then(responseJson => {
            // console.log("responseeee------------:" , responseJson)
            this.setState({
                isLoading:false,
                data:responseJson.hits
            })
        })
    }

    loadmorenews () {
       
        const updatedCount = this.state.count + 10;
        this.setState({
            count : updatedCount
         })
         console.log(updatedCount)
        //  this.setState({isLoading:true})

        return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+ updatedCount)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                isLoading:false,
                data:responseJson.hits
            })
        })
        
    }

    renderFooter() {
        return (
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.loadmorenews()}
              style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        );
      }



  render(){
      return (
        <View style={styles.container}>
          
            { this.state.isLoading?
                <ActivityIndicator size={"large"}/>:
          <View style={styles.listCon}>
                <FlatList
                    style={styles.list}
                    data={this.state.data}
                    renderItem={({item})=> 
                    <View style={styles.listItem}>
                        <View style={{borderBottomColor:'black', borderBottomWidth:1, marginBottom:3}}>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Url : </Text>
                            <Text style={{width:350}} numberOfLines={2}>{item.url}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>CreateAt : </Text>
                            <Text>{item.create_at}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Author : </Text>
                            <Text>{item.author}</Text>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    this.renderFooter.bind(this)
                }
                keyExtractor={item => item.id}
                />
          </View>  
         }
        
         </View>
      );
    }  
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:10,
    paddingTop:35,
    justifyContent:'center'

  },
  subContainer:{
    flexDirection: 'row',
  },
  listCon:{
    flex:1,
     
  },
  listItem:{
    borderWidth:1,
    borderColor:'gray',
    paddingVertical:10,
    marginVertical:5,
    paddingHorizontal:10,
  },
  loadMoreBtn:{
      backgroundColor:'green',
      fontSize:15,
      padding:5,
      marginVertical:10,
      marginHorizontal:20,
      alignItems:"center",
      color:'white',
      width:200,
      alignSelf:'center'
  }

});
