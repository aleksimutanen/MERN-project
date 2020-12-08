# FS-harjoitustyö
Harjoitustyö Fullstack - kurssin suorituksen jälkeen.

# Harjoitustyön tavoitteita
Harjoitustyön aikana on ollut tarkoituksena yrittää tehdä sovellus käyttäjille, jotka tarvitsevat 
galleriaa esimerkiksi omien töidensä näyttämiseksi. Tässä tapauksessa sovellus on tehty 
arkkitehtuuriteemalla. Perheessäni on vahva arkkitehtitausta ja isäni yrityksellä on ollut tarkoitus 
teettää uudet sivut jo jonkin aikaa. Ei sillä että tästä tulisi kyseinen sivusto, mutta sain yrityksen 
tekemän "toivelistan", jossa on kerrottu ajatuksia/ideoita sivuston rakenteesta ja muotoilusta. 
Tämä antoi hyvää perspektiiviä kehityksen suuntaan ja ehkä antoi myös kokemusta siihen, 
millaista voisi joskus olla tehdä sovellusta asiakkaan speksien mukaisesti. Toisaalta myös heidän 
nykyinen data on niin sekavassa muodossa, että sen jäljittely tuntui hyvin turhalta ja työläältä.

Päätarkoituksena arkkitehtitoimiston sivustossa on esitellä tehtyjä projekteja ja kertoa tietoa niistä. 
Toivelistalla oli annettu tarkka määritelmä gallerian esitystavasta ja että mitä pitäisi näyttää ja 
mitä ei. Tässä tapauksessa yrityksellä on n. 90 tehtyä projektia, mutta vanhempien projektien 
näyttäminen uusien seassa ei ollut toivottavaa. Relevantteja projekteja, joita halutaan näyttää on 
noin 20 ja loput ovat "vanhaa roskaa jota kukaan ei halua nähdä". Siksi projektit ovat jaoteltu 
relevantteihin ja ei-relevantteihin. 

# Vähän kehityksestä
Kehitys mielestäni sujui suhteellisen hyvin, tosin ongelmia ja esteitä tuli myös vastaan.
Käytin pääasiallisesti kurssilla opittuja asioita ja tekniikoita. Pääasialliseksi tilanhallintatyökaluksi
valitsin reduxin, koska pidin jo kurssilla sen käytöstä. Aluksi mietin myös TypeScriptin käyttöä, mutta 
päädyin kuitenkin tekemään sovelluksen JavaScriptillä. Näin jälkiviisaana voisin sanoa, että tähän 
tarkoitukseen TS olisi ollut sopiva käyttökohde. Seuraava projekti sitten TS:llä. Pyrin projektin 
aikana siihen, että suurin osa sivulla näkyvästä datasta olisi muokattavissa sivuston sisällä, se 
onnistui niin ja näin. Jotkut lomakkeista ovat kankeita tai liian pitkiä omaan makuun, mutta ne ovat 
datan mukaan muotoiltu. 

Ehkä suurimpana töyssynä kehityksen aikana oli kuvien hallinta sovelluksen ja tietokannan sisällä.
Kokeilin pitää kuvia binäärimuodossa Mongossa, mutta jostain syystä alun jälkeen datan saaminen 
tietokannasta muuttui erittäin hitaaksi ja lopulta siirryin takaisin backendissä pidettäviin kuviin, 
joita siirretään blobina frontendiin. Olisin voinut käyttää myös staattisia kuvia backendistä, mutta 
päädyin kuitenkin tähän ratkaisuun. 

Sovellukseen jäi asioita, jotka eivät välttämättä ole siinä muodossa, missä haluaisin tai mikä pitäisi 
olla niiden oikea muoto, mutta aikataulu alkaa vaatimaan pikkuhiljaa, että projekti laitetaan nippuun. 
Myös joitain ominaisuuksia/toiminnallisuuksia jäi kesken tai ne puuttuvat kokonaan. 
