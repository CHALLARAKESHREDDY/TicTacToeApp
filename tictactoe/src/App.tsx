/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): React.JSX.Element {

  const [isCross, setIsCross]=useState<boolean>(false)
  const [gameWinner,setGameWinner]=useState<string>("")
  const [gameState,setGameArray]=useState(new Array(9).fill("empty",0,9))

  const reloadGame=()=>{
    setGameWinner("")
    setIsCross(false)
    setGameArray(new Array(9).fill("empty"))
  }

  const checkIsWinner=()=>{

    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }

  }

  const changeItem=(itemNumber:number)=>{
    if (gameWinner){
      return Snackbar.show({
           text:gameWinner,
           backgroundColor:"green",
           textColor:"#ffffff"
      })
    }
    
    if (gameState[itemNumber]==="empty"){
      gameState[itemNumber]= isCross ? "cross":"circle";
      setIsCross(!isCross);
    }else {
      return Snackbar.show({
        text:"This field is occupied! Choose another one.",
        backgroundColor:"red",
        textColor:"#ffffff"

      })
    }

    checkIsWinner()
  }



  return (
    <SafeAreaView >
      <StatusBar
        backgroundColor={"green"}
      />
      {gameWinner?(
        <View style={[styles.topContainer,styles.winnerInfo]} >
          <Text   >{gameWinner}</Text>
        </View>
      ):(
        <View style={[styles.topContainer,isCross?styles.playerX : styles.playerO]}>
          <Text style={styles.turnText}>{isCross?"X":"O"} turn</Text>
        </View>
      )}
      <FlatList  
      numColumns={3}
      data={gameState}
      style={styles.bottomContainer}
      renderItem={({item,index})=>(
        <Pressable key={index}  onPress={() => changeItem(index)} style={styles.card}>
          <Icons name={item}/>
        </Pressable>
      )}
      />
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

 topContainer:{
  
  height: 56,
  width:"92%",
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  borderRadius: 4,
  paddingVertical: 8,
  marginVertical: 20,
  marginHorizontal: 14,

  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowColor: '#333',
  shadowOpacity: 0.2,
  shadowRadius: 1.5,
 },

 playerX:{
  backgroundColor: '#B2DFF4',
  color:"#000" 
},
playerO: {
  backgroundColor: '#FFC300',
  color:"#000000"
},
winnerInfo: {
  borderRadius: 8,
  backgroundColor: '#38CC77',

  shadowOpacity: 0.1,
},
turnText:{
  color:"#000"
},
bottomContainer:{
  margin:14,
  marginVertical:50,
},
card:{
  height: 100,
  width: '33.33%',

  alignItems: 'center',
  justifyContent: 'center',

  borderWidth: 1,
  borderColor: '#333',

},
gameBtn: {
  alignItems: 'center',

  padding: 10,
  borderRadius: 8,
  marginHorizontal: 36,
  backgroundColor: '#8D3DAF',
  marginVertical:20
},
gameBtnText: {
  fontSize: 18,
  color: '#FFFFFF',
  fontWeight: '500',
}

});

export default App;
