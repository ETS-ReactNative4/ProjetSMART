import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './stylesResumeSignalement';

export default class ResumeSignalement extends React.Component {

  _eclairage = () =>{
      return(
            <View style={styles.zone}>
                  <View style={styles.sousZoneHaut}>
                    <Text>{this.props.data.eclairage}</Text>
                    <Icon
                    reverse
                    raised
                    style={styles.bouton}
                    name="lightbulb-o"
                    type="font-awesome"
                    color="#E9BC40"
                    />
                  </View>
                  <View style={styles.sousZoneBas}>
                    <Text>Eclairage</Text>
                  </View>
            </View>
      );
  }

  _chantier = () =>{
    return(
          <View style={styles.zone}>
              <View style={styles.sousZoneHaut}>
                  <Text>{this.props.data.chantier}</Text>
                  <Icon
                  reverse
                  raised
                  style={styles.bouton}
                  name="exclamation-triangle"
                  type="font-awesome"
                  color="#E97740"
                  />
              </View>
              <View style={styles.sousZoneBas}>
                <Text>Chantier</Text>
              </View>
          </View>
    );
  }
  
  _ferme = () =>{
    return(
          <View style={styles.zone}>
              <View style={styles.sousZoneHaut}>
                <Text>{this.props.data.ferme}</Text>
                <Icon
                reverse
                raised
                style={styles.bouton}
                name="close"
                type="font-awesome"
                color="#E94040"
                />
              </View>
              <View style={styles.sousZoneBas}>
                <Text>Fermé</Text>
              </View>
          </View>
    );
  }
  
  _abime = () =>{
    return(
          <View style={styles.zone}>
              <View style={styles.sousZoneHaut}>
                <Text>{this.props.data.abime}</Text>
                <Icon
                reverse
                raised
                style={styles.bouton}
                name="road"
                type="font-awesome"
                color="#3497FD"
                />
              </View>
              <View style={styles.sousZoneBas}>
                <Text>Abimé</Text>
              </View>
          </View>
    );
  }
  
  _securite = () =>{
    return(
          <View style={styles.zone}>
              <View style={styles.sousZoneHaut}>
                <Text>{this.props.data.securite}</Text>
                <Icon
                reverse
                raised
                style={styles.bouton}
                name="security"
                type="material-icons"
                color="#5773FF"
                />
              </View>
              <View style={styles.sousZoneBas}>
                <Text>Sécurité</Text>
              </View>
          </View>
    );
  }
  
  _interet = () =>{
    return(
          <View style={styles.zone}>
              <View style={styles.sousZoneHaut}>
                <Text>{this.props.data.interet}</Text>
                <Icon
                reverse
                raised
                style={styles.bouton}
                name="heart"
                type="font-awesome"
                color="#C840E9"
                background-color="#000000"
                />
              </View>
              <View style={styles.sousZoneBas}>
                <Text>Intérêt</Text>
              </View>
          </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerBas}>
          {this._eclairage()}
          {this._chantier()}
          {this._ferme()}
        </View>
        <View style={styles.containerBas}>
          {this._abime()}
          {this._securite()}
          {this._interet()}
        </View>
      </View>
    );
  }
}
