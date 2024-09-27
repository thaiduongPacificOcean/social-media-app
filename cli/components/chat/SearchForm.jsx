import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hp, wp } from '../../helpers/common';

const SearchForm = () => {
  return (
    <TouchableOpacity>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={24} color={'grey'} />
          <Text style={{ flex: 1, marginLeft: 5, color: 'grey' }}>Search</Text>
          <Icon name="sort-ascending" size={24} color={'grey'} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchForm

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: hp(1.6)
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

})