import { createStackNavigator, createAppContainer } from 'react-navigation';
import Accueil from '../views/Accueil/Accueil';
import FinTrajet from '../views/FinTrajet/FinTrajet';
import Itineraire from '../views/Itineraire/Itineraire';
import Recherche from '../views/Recherche/Recherche';
import Trajet from '../views/Trajet/Trajet';
import GoogleAutocomplete from '../components/googleAutocomplete/googleAutocomplete';


const RootStack = createStackNavigator({
  Accueil: { screen: Accueil, navigationOptions: { title: 'Accueil' } },
  Itineraire: { screen: Itineraire, navigationOptions: { title: 'Itinéraire' } },
  FinTrajet: { screen: FinTrajet },
  Recherche: { screen: Recherche, navigationOptions: { title: 'Recherche' } },
  Trajet: { screen: Trajet },
  GoogleAutocomplete: { screen: GoogleAutocomplete }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
