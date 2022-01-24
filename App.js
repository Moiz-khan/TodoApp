import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity} from "react-native";

import { Checkbox } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");
  const [searchList, setSearchList] = useState("");

  const changeHandler = (e, setState) => {
    setState(e);
  };

  const submitHandler = async () => {
    if ((descrip && title) !== "") {
      let newTodoItems = [
        ...list,
        { title: title, descrip: descrip, status: false },
      ];
      setList(newTodoItems);
      await AsyncStorage.setItem("List", JSON.stringify(newTodoItems));
    }
  };

  const DeleteTask = (item) => {
    const deleteTodo = list.filter((data, index) => index != item);
    setList(deleteTodo);
  };

  const ChangeStatus = (item) => {
    const previsousData = {
      descrip: item?.item?.descrip,
      title: item?.item?.title,
      status: !item?.item?.status,
    };

    const doneTask = list.filter((data, index) => index != item?.index);
    let newTodoItems = [...doneTask, previsousData];
    setList(newTodoItems);
  };

  const SearchTitle = (e) => {
    console.log(e);
    const searchListValue = list.filter((data) => data?.title == e);
    console.log("Search List Value", searchListValue);
    setSearchList([searchListValue]);
  };

  const TodoData = (item) => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            backgroundColor: "#F6F7F9",
            marginVertical: 10,
            alignItems: "center",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Checkbox
              status={item?.item?.status ? "checked" : "unchecked"}
              onPress={() => {
                ChangeStatus(item);
              }}
            />
          </View>
          <View>
            <Text>{item?.item?.title}</Text>
            <Text>{item?.item?.descrip}</Text>
          </View>
          <TouchableOpacity onPress={() => DeleteTask(item?.index)}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>Todo App</Text>
          <View
          style={{
            borderWidth: 1.5,
            borderColor: "#cfc8b8",
            borderRadius: 15,
            backgroundColor: "#F6F7F9",
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search Task"
            onChangeText={(e) => SearchTitle(e)}
          />
        </View>
         
        </View>
        <View
          style={{
            borderWidth: 1.5,
            borderColor: "#cfc8b8",
            borderRadius: 15,
            backgroundColor: "#F6F7F9",
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginTop: 15,
          }}
        >
          <TextInput
            placeholder="Title"
            onChangeText={(e) => changeHandler(e, setTitle)}
          />
          <TextInput
            placeholder="Description"
            onChangeText={(e) => changeHandler(e, setDescrip)}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >

          <TouchableOpacity
            onPress={submitHandler}
            style={{
              borderWidth: 1,
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: "gray",
              borderRadius: 10,
              backgroundColor: "green",
              borderRadius: 25,
              
            }}
          >
          
          <Text style={{ fontSize: 20 }}>Add</Text>
                      
          </TouchableOpacity>
          <Text style={{ fontSize: 25, width: "100%" }}>Todo List</Text>
           <FlatList style={{width: "100%" }}
            extraData={list}
            renderItem={TodoData}
            data={list}
          />
        </View>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
 
 
});