import React from 'react';
import { View, Button, AppRegistry } from 'react-native';
import Accueil from './src/views/Accueil/Accueil';
import FinTrajet from './src/views/FinTrajet/FinTrajet';
import Itineraire from './src/views/Itineraire/Itineraire';

export default class App extends React.Component {

    state = {
        vue : 0
    }

    _onPress = () => {
        var newVue = this.state.vue+1;
        if(newVue == 3)
            newVue=0;
        this.setState({vue : newVue});
    }

    render() {
        if( this.state.vue == 0 )
            return (
                <View style={ {flex:1} } >
                    <View style={ {flex:1, paddingTop:30} }>
                        <Button
                        onPress={this._onPress}
                        title="Page suivante"
                        />
                    </View>
                    <View style={ {flex:9} } >
                        <Accueil />
                    </View>
                </View>
            );
        else if( this.state.vue == 1 )
            return (
                <View style={ {flex:1} } >
                    <View style={ {flex:1, paddingTop:30} }>
                        <Button
                        style={ {height:100} }
                        onPress={this._onPress}
                        title="Page suivante"
                        />
                    </View>
                    <View style={ {flex:9} } >
                        <Itineraire />
                    </View>
                </View>
            );
        else
            return (
                <View style={ {flex:1} } >
                    <View style={ {flex:1, paddingTop:30} }>
                        <Button
                        style={ {height:100} }
                        onPress={this._onPress}
                        title="Page suivante"
                        />
                    </View>
                    <View style={ {flex:9} } >
                        <FinTrajet />
                    </View>
                </View>
            );
    }
}

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);
