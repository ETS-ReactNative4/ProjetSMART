import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3
  },
  containerBas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
    paddingBottom: 20
  },
  bouton: {
    flex: 1
  },
  zone: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 30,
    margin: 5
  },
  sousZoneHaut: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sousZoneBas: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
