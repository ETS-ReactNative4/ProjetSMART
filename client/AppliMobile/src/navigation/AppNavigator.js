import { createStackNavigator, createAppContainer } from 'react-navigation';
import Accueil from '../views/Accueil/Accueil';
import FinTrajet from '../views/FinTrajet/FinTrajet';
import Itineraire from '../views/Itineraire/Itineraire';
import Recherche from '../views/Recherche/Recherche';
import Trajet from '../views/Trajet/Trajet';

const RootStack = createStackNavigator({
  Accueil: { screen: Accueil, navigationOptions: { title: 'Accueil' } },
  Recherche: { screen: Recherche, navigationOptions: { title: 'Recherche' } },
  Itineraire: { screen: Itineraire, navigationOptions: { title: 'Itinéraire' } },
  Trajet: { screen: Trajet },
  FinTrajet: { screen: FinTrajet },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
