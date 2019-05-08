import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 14
  },
  hautItineraire: {
    backgroundColor: '#2A2E43',
    margin: 5,
    flex: 2
  },
  basItineraire: {
    backgroundColor: '#2A2E43',
    flex: 3
  },
  carte: {
    backgroundColor: 'yellow',
    flex: 10
  },
  boutonSignalement: {
    backgroundColor: '#2A2E43',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10
  },
  boutons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boutonLetsGo: {
    justifyContent: 'center',
  },
  boutonretour: {
    justifyContent: 'center',
  }
});
