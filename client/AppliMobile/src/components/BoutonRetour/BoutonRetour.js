import React from 'react';
import { View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

// eslint-disable-next-line react/prefer-stateless-function
class BoutonRetour extends React.Component {
  _onPress = () => {
    this.props.navigation.navigate('Accueil');
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._onPress}
          title="Retour"
          color="#C840E9"
        />
      </View>
    );
  }
}

export default withNavigation(BoutonRetour);
