import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import {colors} from '../constants/colors';
import Avatar from './avatar';
import { navigate } from '../navigationRef';
import { routes } from '../constants/routes';

const BottomSheet = ({userState, signOut}) => {
  const refRBSheet = useRef();
  return (
    <View>
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={styles.headerIcon}>
        {userState?.dispatchedGoogleData?.user?.photo && (
          <Avatar
            source={{
              uri: userState.dispatchedGoogleData.user.photo,
            }}
            style={{
              height: 35,
              width: 35,
              borderRadius: 40,
            }}
          />
        )}
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: colors.ORANGE,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: colors.WHITE,
          },
        }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to Daily Expense Tracker</Text>
          {userState?.dispatchedGoogleData?.user?.photo && (
            <View style={styles.infoWrapper}>
              <View>
                <Avatar
                  source={{
                    uri: userState.dispatchedGoogleData.user.photo,
                  }}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 40,
                  }}
                />
              </View>
              <View style={styles.infoBody}>
                <Text style={styles.infoText}>
                  {userState.dispatchedUserData.user.name}
                </Text>
                <Text style={styles.infoText}>
                  {userState.dispatchedUserData.user.email}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.dataWrapper}>
            <Entypo
              name="line-graph"
              size={30}
              color={colors.ORANGE}
              style={styles.graphIcon}
              onPress={() => navigate(routes.REPORTSCREEN)}
            />
          </View>
        </View>

        <Button
          icon={<AntDesign name="logout" size={24} color={colors.GOOGLE} />}
          title={
            userState.loading ? (
              <View>
                <ActivityIndicator
                  size="small"
                  color={colors.DARK_GREEN}
                  style={{paddingLeft: 20}}
                />
              </View>
            ) : (
              'Log out'
            )
          }
          disabled={userState.loading}
          type="solid"
          onPress={() => signOut()}
          titleStyle={{
            color: colors.BOLDBLACK,
            paddingLeft: 8,
          }}
          buttonStyle={{
            backgroundColor: colors.LIGHT_ORANGE,
            marginHorizontal: 120,
            marginBottom: 20,
            borderRadius: 20,
          }}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    alignSelf: 'flex-start',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  infoBody: {
    justifyContent: 'center',
    marginLeft: -25,
  },
  infoText: {
    fontSize: 15,
    color: colors.WHITE,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dataWrapper: {
    alignItems: 'center',
    paddingTop: 10,
  },
  welcome: {
    fontSize: 18,
    color: colors.WHITE,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  graphIcon: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 40,
    borderColor: colors.DARK_GREEN,
    borderWidth: 1,
    elevation: 8,
  },
});

export default BottomSheet;
