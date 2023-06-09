/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const App = (): JSX.Element => {
  const [users, setUsers] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => setPosts(json));
  };

  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => setUsers(json));
  };

  const hideUsers = () => {
    setUsers([]);
  };

  const hidePosts = () => {
    setPosts([]);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Text key={`item-${index}`}>
      {item.id} --- {item.title}
    </Text>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            {!users.length ? (
              <TouchableOpacity style={styles.button} onPress={fetchUsers}>
                <Text>Get Users</Text>
              </TouchableOpacity>
            ) : (
              <Button title={'Hide Users'} onPress={hideUsers} />
            )}
          </View>
          {!!users.length && <Text style={styles.title}>Users</Text>}
        </View>
        <View style={styles.flatList}>
          {!!users.length &&
            users.map((item: any, index: number) => (
              <Text key={`item-${index}`}>
                {item.name} --- {item.username}
              </Text>
            ))}
        </View>
        <View style={styles.header}>
          <View style={styles.headerItem}>
            {!posts.length ? (
              <TouchableOpacity style={styles.button} onPress={fetchPosts}>
                <Text>Get Posts</Text>
              </TouchableOpacity>
            ) : (
              <Button title={'Hide Posts'} onPress={hidePosts} />
            )}
          </View>
          {!!posts.length && <Text style={styles.title}>Posts</Text>}
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            style={styles.flatList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerItem: {
    width: '40%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#64A6FA',
  },
  flatList: {
    height: 500,
  },
});

export default App;
