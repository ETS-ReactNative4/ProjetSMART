import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from './stylesBoutonGo';

// eslint-disable-next-line react/prefer-stateless-function
class BoutonGo extends React.Component {
  _press = () => {
    this.props.navigation.navigate('Itineraire');
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          reverse
          raised
          style={styles.bouton}
          name="directions"
          type="FontAwesome5"
          color="#4646FF"
          underlayColor="#000000"
          onPress={this._press}
        />
      </View>
    );
  }
}

export default withNavigation(BoutonGo);
