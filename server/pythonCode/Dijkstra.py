import json as js
import math as Math
import sys
import json
from heapq import heappop, heappush

class Noeud:
    def __init__(self, name, latitude, longitude):
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

    def json_serialize(self):
        return {'name': self.name,
                'latitude': self.latitude,
                'longitude': self.longitude}
class Troncon:
    def __init__(self,NoeudDepart,NoeudArrivee,Longueur,codeTroncon, coordonnees, commune, rue, codefuv,
                 cyclable, matiereDangereuse, matiereTrottoir1, largeurTrottoir1, matiereTrottoir2, largeurTrottoir2):
        self.NoeudDepart = NoeudDepart
        self.NoeudArrivee = NoeudArrivee
        self.Longueur = Longueur
        self.codeTroncon = codeTroncon
        self.coordonnees = coordonnees
        self.commune = commune
        self.rue = rue
        self.codefuv = codefuv
        self.cyclable = cyclable
        self.matiereDangereuse = matiereDangereuse
        self.matiereTrottoir1 = matiereTrottoir1
        self.largeurTrottoir1 = largeurTrottoir1
        self.matiereTrottoir2 = matiereTrottoir2
        self.largeurTrottoir2 = largeurTrottoir2

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

    def json_serialize(self):
        return {'NoeudDepart': self.NoeudDepart,
                'NoeudArrivee': self.NoeudArrivee,
                'Longueur': self.Longueur,
                'codeTroncon': self.codeTroncon,
                'coordonnees': self.coordonnees,
                'commune': self.commune,
                'rue': self.rue,
                'codefuv': self.codefuv,
                'cyclable': self.cyclable,
                'matiereDangereuse': self.matiereDangereuse,
                'revetTrottoir1': self.matiereTrottoir1,
                'largeurTrottoir1': self.largeurTrottoir1,
                'revetTrottoir2': self.matiereTrottoir2,
                'largeurTrottoir2': self.largeurTrottoir2}


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
        [lat1, lon1] = tabPoints[i]
        [lat2, lon2] = tabPoints[i+1]
        longueur = measure(lat1, lon1, lat2, lon2)
    return longueur


def getLatLngFromString(aString):
    indexVirgule = aString.find(",")
    lng = aString[:indexVirgule]
    lat = aString[indexVirgule+1:]
    return [float(lat),float(lng)]


def dijkstra(graph, weight, source=0, target=None):
    n = len(graph)
    assert all(weight[graph[u][v]] >= 0 for u, g in graph.items() for v, y in graph[u].items())
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
                dist_neighbor = dist_node + weight[graph[node][neighbor]]
                if (neighbor not in dist) or (dist_neighbor < dist[neighbor]):
                    dist[neighbor] = dist_neighbor
                    prec[neighbor] = node
                    heappush(heap, (dist_neighbor, neighbor))
    return dist, prec


if __name__ == "__main__":
    #codeTronconTroncon : Map<CodeTroncon, Troncon>
    #mapDijkstra : Map<CodeNoeud, Map<CodeNoeud, CodeTroncon>>

    mapDijkstra =  {}
    with open("server/pythonCode/donnees_map_Dijkstra.json", "r", encoding='UTF-8') as openMap:
      mapDijkstra = json.load(openMap)

    fichierObjectif = sys.argv[1]
    with open(fichierObjectif, "r", encoding = 'UTF-8') as openTroncons:
        troncons = json.load(openTroncons)
    
    longueurTroncons = {}
    for code, longueur in troncons:
        longueurTroncons[code] = float(longueur)
    pointDepart = sys.argv[2]
    pointArrivee = sys.argv[3]

    dist, prec = dijkstra(mapDijkstra, longueurTroncons, pointDepart, pointArrivee)

    trajet = []
    parc = pointArrivee
    while prec[parc] != None:
        trajet.insert(0, mapDijkstra[parc][prec[parc]])
        parc = prec[parc]
    print(json.dumps(trajet, indent=4))