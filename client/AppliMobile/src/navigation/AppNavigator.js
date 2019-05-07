import { createStackNavigator, createAppContainer } from 'react-navigation';
import Accueil from '../views/Accueil/Accueil';
import FinTrajet from '../views/FinTrajet/FinTrajet';
import Itineraire from '../views/Itineraire/Itineraire';
import Recherche from '../views/Recherche/Recherche';
import Trajet from '../views/Trajet/Trajet';


const RootStack = createStackNavigator({
  Accueil: { screen: Accueil },
  FinTrajet: { screen: FinTrajet },
  Itineraire: { screen: Itineraire },
  Recherche: { screen: Recherche },
  Trajet: { screen: Trajet },
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
