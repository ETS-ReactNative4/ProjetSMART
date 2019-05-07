import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './stylesResumeSignalement';

export default class BoutonSignalement extends React.Component {

  render() {
    return (
<View style={styles.container}>
  <View style={styles.containerBas}>
    <View style={styles.zone}>
          <View style={styles.sousZoneHaut}>
            <Text>3</Text>
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
    <View style={styles.zone}>
        <View style={styles.sousZoneHaut}>
            <Text>2</Text>
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
    <View style={styles.zone}>
        <View style={styles.sousZoneHaut}>
          <Text>9</Text>
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
  </View>
  <View style={styles.containerBas}>
    <View style={styles.zone}>
        <View style={styles.sousZoneHaut}>
          <Text>3</Text>
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
    <View style={styles.zone}>
        <View style={styles.sousZoneHaut}>
          <Text>1</Text>
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
    <View style={styles.zone}>
        <View style={styles.sousZoneHaut}>
          <Text>9</Text>
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
  </View>
</View>
    );
  }
}
