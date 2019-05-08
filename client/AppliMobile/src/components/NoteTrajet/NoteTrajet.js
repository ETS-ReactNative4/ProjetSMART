import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from './stylesNoteTrajet';

class NoteTrajet extends React.Component {
    ratingCompleted = (rating) => {
      this.rating = rating;
    }

    _onPress = () => {
      if (this.rating) {
        this.props.navigation.navigate('Accueil');
      } else {
        Alert.alert('Info', 'Merci de bien vouloir renseigner une note');
      }
    }

    render() {
      return (
        <View style={styles.container}>

          <View style={styles.titre}>
            <Text style={styles.titreText}> Notez votre trajet </Text>
          </View>

          <View style={styles.etoiles}>
            <AirbnbRating
              onFinishRating={this.ratingCompleted}
              defaultRating={0}
              reviews={[]}
            />
          </View>

          <View style={styles.bouton}>
            <Button
              onPress={this._onPress}
              title="Sommettre votre note"
              color="#C840E9"
            />
          </View>
        </View>
      );
    }
}

export default withNavigation(NoteTrajet);
