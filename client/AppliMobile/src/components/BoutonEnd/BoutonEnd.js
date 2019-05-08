import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class BoutonEnd extends React.Component {
  _onPress = () => {
    this.props.navigation.navigate('FinTrajet');
  }

  render() {
    return (
      <Button
        onPress={this._onPress}
        title="Arrivée !"
        color="#C840E9"
      />
    );
  }
}

export default withNavigation(BoutonEnd);
