import React from 'react';
import { View, Button, AppRegistry } from 'react-native';
import Recherche from './src/views/Recherche/Recherche';
import Accueil from './src/views/Accueil/Accueil';
import Itineraire from './src/views/Itineraire/Itineraire';
import FinTrajet from './src/views/FinTrajet/FinTrajet';

export default class App extends React.Component {
    state = {
      vue: 0
    }

    _onPress = () => {
      let newVue = this.state.vue + 1;
      if (newVue == 4) { newVue = 0; }
      this.setState({ vue: newVue });
    }

    render() {
      if (this.state.vue == 0) {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'green' }}>
              <Button
                onPress={this._onPress}
                title="Page suivante"
              />
            </View>
            <View style={{ flex: 9 }}>
              <Accueil />
            </View>
          </View>
        );
      } if (this.state.vue == 1) {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'green' }}>
              <Button
                style={{ height: 100 }}
                onPress={this._onPress}
                title="Page suivante"
              />
            </View>
            <View style={{ flex: 9 }}>
              <Itineraire />
            </View>
          </View>
        );
      }
      if (this.state.vue == 3) {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'green' }}>
              <Button
                style={{ height: 100 }}
                onPress={this._onPress}
                title="Page suivante"
              />
            </View>
            <View style={{ flex: 9 }}>
              <Recherche />
            </View>
          </View>
        );
      }
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'green' }}>
            <Button
              style={{ height: 100 }}
              onPress={this._onPress}
              title="Page suivante"
            />
          </View>
          <View style={{ flex: 9 }}>
            <FinTrajet />
          </View>
        </View>
      );
    }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
