import { StyleSheet } from 'react-native';
import BoutonLetsGo from '../../components/BoutonLetsGo/BoutonLetsGo';

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
    flex: 2
  },
  carte: {
    backgroundColor: 'yellow',
    flex: 10
  },
  boutonSignalement: {
    backgroundColor: '#2A2E43',
    flex: 1,
    justifyContent: 'center'
  },
  boutonLetsGo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 7
  }
});
