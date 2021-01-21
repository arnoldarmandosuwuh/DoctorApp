import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ILHospitalBG } from '../../assets'
import { fonts, colors, showError } from '../../utils'
import { ListHospital } from '../../components'
import { Fire } from '../../config'

const Hospitals = () => {
  const [hospital, setHospital] = useState([])
  const [count, setCount] = useState()

  useEffect(() => {
    getHospital()
  }, [])

  const getHospital = () => {
    Fire.database()
      .ref('hospitals/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val()
          const filterData = data.filter((el) => el !== null)
          setHospital(filterData)
          setCount(filterData.length)
        }
      })
      .catch((err) => {
        showError(err.message)
      })
  }

  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>{`${count} tersedia`}</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospital.map((item) => {
          return (
            <ListHospital
              key={item.id}
              type={item.type}
              name={item.name}
              address={item.address}
              pic={{ uri: item.pic }}
            />
          )
        })}
      </View>
    </View>
  )
}

export default Hospitals

const styles = StyleSheet.create({
  page: { backgroundColor: colors.secondary, flex: 1 },
  background: { height: 240, paddingTop: 30 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
})
