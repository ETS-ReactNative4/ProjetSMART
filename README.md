

# Bran
Répertoire Github du Projet Smart: Bran

## Introduction

Ce repo continent l'application Bran créée dans le cadre du Projet Longue Durée Smart à l'INSA Lyon.

L'application est écrite en javascript pour le back et le front ainsi qu'en python pour les algorithmes de calcul de trajet. 

L'application utilise les frameworks
- [Express](https://expressjs.com) pour le server web.
- [Mongoose](http://mongoosejs.com) comme ORM.
- [React-Native](https://facebook.github.io/react-native/docs/getting-started.html) pour le développement front.

Et *Mongo DB* comme SGBD

## Développement

Pour lancer l'application vous aurez besoin:
- [NodeJS](https://nodejs.org/en/) version 8.7.x or higher.
- [npm](https://www.npmjs.com) version 6.9.x or higher.
- [mongoDB](https://www.mongodb.com)
- [Expo](https://expo.io) version 32.0.6 or higher.
- Git. For [windows](https://git-scm.com/downloads), for linux : `sudo apt-get install git`

Cloner le repo avec `git clone https://github.com/DoudouINSA/ProjetSMART.git`.

Puis, lancer la commande dans le fichier racine du projet: `npm install`.

### Launch server

Pour lancer l'application, ouvrir un terminal et faire la commande : `npm run dev:back` (dans le dossier racine de l'application)
Puis, ouvrir un autre terminal et faire la commande : `npm start` (dans le dossier `/client/AppliMobile` de l'application) permettant de lancer le front avec expo

Une fois le front lancé, il faudra prendre en photo le QR code (TUNEL) présenté sur la page du navigateur ouvert automatiquement. 

Tous les appels API fait du front seront transférés vers le back.

### Notes

L'application utilise [nodemon](https://nodemon.io/) pour regarder les changements de code.
L'application se relancera quand le code édité sera sauvegardé.
