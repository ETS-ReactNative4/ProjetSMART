import json as js
import math as Math
import sys
from heapq import heappop, heappush

class Noeud:
    def __init__(self,name,latitude,longitude):
        self.name = name
        self.latitude = latitude
        self.longitude = longitude

    def __hash__(self):
        return hash((self.name, self.location))

    def __eq__(self, other):
        return (self.name, self.location) == (other.name, other.location)

    def __ne__(self, other):
        # Not strictly necessary, but to avoid having both x==y and x!=y
        # True at the same time
        return not(self == other)

class Troncon:
    def __init__(self,NoeudDepart,NoeudArrivee,Longueur,codeTroncon, coordonnees, commune, rue):
        self.NoeudDepart = NoeudDepart
        self.NoeudArrivee = NoeudArrivee
        self.Longueur = Longueur
        self.codeTroncon = codeTroncon
        self.coordonnees = coordonnees
        self.commune = commune
        self.rue = rue

    def __init__(self, codeTroncon):
        self.codeTroncon = codeTroncon

    def __hash__(self):
        return hash(self.idTroncon)

    def __eq__(self, other):
        return (self.NoeudDepart, self.NoeudArrivee,self.Longueur, self.idTroncon ) == (other.NoeudDepart, other.NoeudArrivee, other.Longueur, other.idTroncon)

    def __ne__(self, other):
        # Not strictly necessary, but to avoid having both x==y and x!=y
        # True at the same time
        return not(self == other)

class RouteKey:
    def __init__(self,nameCity,nameSelf):
        self.city = nameCity
        self.name = nameSelf

    def __hash__(self):
        return hash((self.city, self.name))

    def __eq__(self, other):
        return (self.city, self.name) == (other.city, other.name)

    def __ne__(self, other):
        # Not strictly necessary, but to avoid having both x==y and x!=y
        # True at the same time
        return not(self == other)

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
        if len(parametre) > 100:
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
        if len(parametre) > 100:
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


def NoeudsGrandLyon(monFichier):
    a_etudier = ObtenirInfos(monFichier)
    codeNoeudsNoeuds = dict()
    mapTempo = dict()
    mapDijkstraa = dict()
    mapCodeTronconTronconPartiel = dict()
    for parametre in a_etudier:
        if len(parametre) > 100:
            indexVoie = parametre.find("identifian")
            indexDeuxPoints = parametre.find(":", indexVoie)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            codeNoeud = parametre[indexPremApos:indexDeuxApos]
            indexCoordonnees = parametre.find("coordinates")
            indexDeuxPoints = parametre.find(":", indexCoordonnees)
            indexCrochet = parametre.find("[", indexDeuxPoints)
            indexCrochetDeux = parametre.find("]", indexCrochet)
            indexVirgule = parametre.find(",", indexVoie)
            coordonnees = parametre[indexCrochet + 1:indexCrochetDeux]
            [latitude,longitude] = coordonnees.split(',')
            codeNoeudsNoeuds[codeNoeud] = Noeud(codeNoeud,latitude,longitude)
            listeTroncons = parametre.find("identtronc")
            indexDeuxPoints = parametre.find(":", listeTroncons)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            Troncons = parametre[indexPremApos:indexDeuxApos]
            ensembleTroncons = Troncons.split('|')

            for i in ensembleTroncons:
                if i not in mapCodeTronconTronconPartiel:
                    mapCodeTronconTronconPartiel[i] = Troncon(i)
                if i in mapTempo:
                    mapTempo[i].append(codeNoeud)
                else:
                    mapTempo[i] = [codeNoeud]
    for i,j in mapTempo.items():
        if len(j) == 2:
            [k,l] = j
            mapCodeTronconTronconPartiel[i].NoeudArrivee = k
            mapCodeTronconTronconPartiel[i].NoeudDepart = l
            if k in mapDijkstraa:
                mapDijkstraa[k][l] = i
            else:
                a = dict()
                a[l] = i
                mapDijkstraa[k] = a
            if l in mapDijkstraa:
                mapDijkstraa[l][k] = i
            else:
                a = dict()
                a[k] = i
                mapDijkstraa[l] = a

    return (codeNoeudsNoeuds, mapDijkstraa, mapCodeTronconTronconPartiel)



def TronconTestGrandLyon(monFichier,mapTroncons):
    a_etudier = ObtenirInfos(monFichier)
    retour = dict()
    for parametre in a_etudier:
        if len(parametre) > 100:
            indexCodeTroncon = parametre.find("codetronco")
            indexDeuxPoints = parametre.find(":", indexCodeTroncon)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            codeTroncon = parametre[indexPremApos:indexDeuxApos]
            indexLongueurTroncon = parametre.find("longueurca")
            indexDeuxPoints = parametre.find(":", indexLongueurTroncon)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            longueurTroncon = parametre[indexPremApos:indexDeuxApos]
            indexCoordonnees = parametre.find("\"coordinates\": [ [ [")
            coordonnees = parametre[indexCoordonnees + 20:-9]
            coordonneesSplit = coordonnees.split('], [')
            coordonneesSplit[len(coordonneesSplit) - 1] = coordonneesSplit[len(coordonneesSplit) - 1][:-2]
            if codeTroncon in mapTroncons:
                mapTroncons[codeTroncon].Longueur = longueurTroncon
                mapTroncons[codeTroncon].coordonnees = coordonneesSplit

    return mapTroncons

def TronconGrandLyon(monFichier,mapTroncons):
    a_etudier = ObtenirInfos(monFichier)
    retour = []
    for parametre in a_etudier:
        if len(parametre) > 100:
            indexCodeTroncon = parametre.find("codetronco")
            indexDeuxPoints = parametre.find(":", indexCodeTroncon)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            codeTroncon = parametre[indexPremApos:indexDeuxApos]
            indexNom = parametre.find("nom")
            indexDeuxPoints = parametre.find(":", indexNom)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            nom = parametre[indexPremApos:indexDeuxApos]
            indexNomCommune = parametre.find("nomcommune")
            indexDeuxPoints = parametre.find(":", indexNomCommune)
            indexPremApos = parametre.find("\"", indexDeuxPoints) + 1
            indexDeuxApos = parametre.find("\"", indexPremApos)
            nomCommune = parametre[indexPremApos:indexDeuxApos]
            mapTroncons[codeTroncon].commune = nomCommune
            mapTroncons[codeTroncon].rue = nom

            if not hasattr(mapTroncons[codeTroncon],'Longueur'):
                indexCoordonnees = parametre.find("\"coordinates\": [ [ [")
                coordonnees = parametre[indexCoordonnees + 20:-9]
                coordonneesSplit = coordonnees.split('], [')
                coordonneesSplit[len(coordonneesSplit) - 1] = coordonneesSplit[len(coordonneesSplit) - 1][:-2]
                mapTroncons[codeTroncon].coordonnees = coordonneesSplit
                longueur = calcLongueurTableau(coordonneesSplit)
                mapTroncons[codeTroncon].Longueur = longueur
    return mapTroncons




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

def calcLongueurTableau(tabPoints):
    longueur = 0
    for i in range(len(tabPoints)-1):
        [lat1,lon1] = getLatLngFromString(tabPoints[i])
        [lat2, lon2] = getLatLngFromString(tabPoints[i+1])
        longueur = measure(lat1,lon1,lat2,lon2)
    return longueur



def getLatLngFromString(aString):
    indexVirgule = aString.find(",")
    lng = aString[:indexVirgule]
    lat = aString[indexVirgule+1:]
    return [float(lat),float(lng)]

def dijkstra(graph, weight, source=0, target=None):
    n = len(graph)
    assert all(float(weight[graph[u][v]].Longueur) >= 0 for u, g in graph.items() for v, y in graph[u].items())
    prec = {source: None}
    black = {}
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        dist_node, node = heappop(heap)
        if node not in black:
            black[node] = True
            if node == target:
                break
            for neighbor, codeTroncon in graph[node].items():
                dist_neighbor = dist_node + float(weight[graph[node][neighbor]].Longueur)
                if (neighbor not in dist) or (dist_neighbor < dist[neighbor]):
                    dist[neighbor] = dist_neighbor
                    prec[neighbor] = node
                    heappush(heap, (dist_neighbor, neighbor))
    return dist, prec

if __name__ == "__main__":
    #codeNoeudsNoeuds : Map<CodeNoeud, Noeud>
    #codeTronconTroncon : Map<CodeTroncon, Troncon>
    #mapDijkstra : Map<CodeNoeud, Map<CodeNoeud, CodeTroncon>>
    (codeNoeudsNoeuds, mapDijkstra, CodeTronconTronconInit) = NoeudsGrandLyon("NoeudsGrandLyon.geojson")
    (codeTronconTronconPartiel) = TronconTestGrandLyon("Test.geojson", CodeTronconTronconInit)
    codeTronconTroncon = TronconGrandLyon("TronconsGrandLyon.geojson", codeTronconTronconPartiel)
    pointDepart = codeTronconTroncon["T3223"].NoeudDepart
    pointArrivee = codeTronconTroncon["T23410"].NoeudDepart
    dist, prec = dijkstra(mapDijkstra, codeTronconTroncon, pointDepart, pointArrivee)
    trajet = []
    parc = pointArrivee
    while prec[parc] != None:
        trajet.insert(0, codeTronconTroncon[mapDijkstra[parc][prec[parc]]].rue)
        parc = prec[parc]
    print("trajet : ", trajet)


