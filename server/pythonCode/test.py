def ObtenirInfos(monFichier):
    try:
        fichier_mpd = open(monFichier, "r")
        donnees = fichier_mpd.readlines()
        for i in donnees :
            print(i)
    except:
        print("ce fichier est introuvable ou n'existe pas")
        return None
if __name__ == "__main__":
    ObtenirInfos("test.geojson")