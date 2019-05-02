import json as js
import math as Math
import sys
def ObtenirInfos(monFichier):
    try:
        fichier_mpd = open(monFichier, "r", encoding='UTF-8')
        donnees = fichier_mpd.readlines()
        return donnees
    except:
        print("ce fichier est introuvable ou n'existe pas")
        return None

def ObtenirIntersections(monFichier):
    a_etudier = ObtenirInfos(monFichier)
    retour = dict()
    for parametre in a_etudier:
        indexVoie = parametre.find("nomvoie")
        indexDeuxPoints = parametre.find(":",indexVoie)
        indexPremApos = parametre.find("\"", indexDeuxPoints) +1
        indexDeuxApos = parametre.find("\"", indexPremApos)
        indexVoie2 = parametre.find("nomvoie_2")
        indexDeuxPoints2 = parametre.find(":", indexVoie2)
        indexPremApos2 = parametre.find("\"", indexDeuxPoints2) + 1
        indexDeuxApos2 = parametre.find("\"", indexPremApos2)
        indexCoordonnees = parametre.find("coordinates")
        indexDeuxPoints = parametre.find(":", indexCoordonnees)
        indexCrochet = parametre.find("[", indexDeuxPoints)
        indexCrochetDeux = parametre.find("]", indexCrochet)
        indexVirgule = parametre.find(",",indexVoie)
        coordonnees = parametre[indexCrochet+1:indexCrochetDeux]
        Voie1 = parametre[indexPremApos:indexDeuxApos]
        Voie2 = parametre[indexPremApos2:indexDeuxApos2]
        Voie = Voie1 + ", " + Voie2
        if Voie in retour:
            if coordonnees[:-4] not in retour[Voie]:
              retour[Voie].append(coordonnees[:-4])
        elif Voie.__len__()>1:
            retour[Voie] = [coordonnees[:-4]]

    return retour

def ObtenirPointsInitiaux(monFichier):
    a_etudier = ObtenirInfos(monFichier)
    retour = dict()
    for parametre in a_etudier:
        indexVoie = parametre.find("nomvoie")
        indexDeuxPoints = parametre.find(":",indexVoie)
        indexPremApos = parametre.find("\"", indexDeuxPoints) +1
        indexDeuxApos = parametre.find("\"", indexPremApos)
        indexCoordonnees = parametre.find("\"coordinates\": [ [ [")
        coordonnees = parametre[indexCoordonnees + 20:-9]
        wesh = coordonnees.split('], [')
        wesh[len(wesh)-1] = wesh[len(wesh)-1][:-2]
        Voie = parametre[indexPremApos:indexDeuxApos]
        if Voie in retour:
            for coor in wesh:
                if coor not in retour[Voie]:
                    retour[Voie].append(coor)
        elif Voie.__len__() > 1:
            retour[Voie] = [coor for coor in wesh]
    return retour

def ObtenirNumRues(monFichier):
    a_etudier = ObtenirInfos(monFichier)
    retour = dict()
    for parametre in a_etudier:
        indexVoie = parametre.find("VOIE")
        indexDeuxPoints = parametre.find(":",indexVoie)
        indexPremApos = parametre.find("\"", indexDeuxPoints) +1
        indexDeuxApos = parametre.find("\"", indexPremApos)
        NomVoie = parametre[indexPremApos:indexDeuxApos]
        indexVoie = parametre.find("NUMERO")
        indexDeuxPoints = parametre.find(":", indexVoie)
        indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
        indexDeuxApos = parametre.find("\"", indexPremApos)
        Numero = parametre[indexPremApos:indexDeuxApos]
        indexCoordonnees = parametre.find("coordinates")
        indexDeuxPoints = parametre.find(":", indexCoordonnees)
        indexCrochet = parametre.find("[", indexDeuxPoints)
        indexCrochetDeux = parametre.find("]", indexCrochet)
        indexVirgule = parametre.find(",", indexVoie)
        coordonnees = parametre[indexCrochet + 1:indexCrochetDeux]
        if len(NomVoie)>1:
            Voie = Numero + " " + NomVoie
            if Voie in retour:
                if coordonnees[:-4] not in retour[Voie]:
                    retour[Voie].append(coordonnees[:-4])
            elif Voie.__len__() > 1:
                retour[Voie] = [coordonnees[:-4]]

    return retour



def calLongueur(unStringA):
    print("a")

def measure(lat1, lon1, lat2, lon2):
    R = 6378.137
    dLat = lat2 * Math.pi / 180 - lat1 * Math.pi / 180
    dLon = lon2 * Math.pi / 180 - lon1 * Math.pi / 180
    a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.pi / 180) * Math.cos(lat2 * Math.pi / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    d = R * c
    return d * 1000

def closestPoint(lat1, lon1, tabPoints):
    bestLat = 0
    bestLon = 0
    bestLength = sys.float_info.max
    for i in tabPoints:
        [lat2,lon2] = getLatLngFromString(i)
        tempoLength = measure(lat1,lon1,lat2,lon2)
        if tempoLength < bestLength :
            bestLat = lat2
            bestLon = lon2
            bestLength = tempoLength
    return[bestLat,bestLon]



def getLatLngFromString(aString):
    indexVirgule = aString.find(",")
    lat = aString[:indexVirgule]
    lng = aString[indexVirgule+1:]
    return [float(lat),float(lng)]

if __name__ == "__main__":
    boumboumChivaya = ObtenirIntersections("intersec.geojson")
    boumboumMalabar = ObtenirPointsInitiaux("Test.geojson")
    boumboumTiesto = ObtenirNumRues("NumRues.geojson")
    compteur = 0


    '''with open('Coordonnees.txt', 'a') as the_file:
        for i,j in boumboumChivaya.items():
            the_file.write(i)
            for k in j:
                the_file.write('[' + k + ']')
            the_file.write("\n")'''

