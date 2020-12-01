# Prosjekt 3 IT2810

## Hvordan kjøre applikasjonen

Når du først har klonet applikasjonen, må man installere alle pakkene en trenger. Dette gjøres ved.

```
npm install

```

Når alle pakker er installert, må du først kjøre serveren, slik at du får en kobling opp mot databasen.
Dette gjøres ved å skrive i terminalen:

```
npm run server
```

Serveren fungerer som den skal om du får "Server is running on 4000" i konsollen. Når du har fått denne meldingen
kan du kjøre applikasjonen ved å skrive:

```
npm start
```


## Innhold

Nettsiden vår lar brukeren søke gjennom en database med en rekke filmer. Ved å klikke på en av
filmene som dukker opp i søkeresultatet, vil brukeren kunne se mer informasjon om denne filmen.
Ved å klikke på en film blir også brukeren gitt muligheten til å legge til sin egen kommentar til
denne filmen, som blir lagt til i databasen slik at andre brukere også kan se det denne brukeren
kommenterte på denne filmen.
Brukeren kan også velge å filterer ut filmer basert på hvor gamle de er og hvor god rating de har,
samt å sortere alle filmene i søkeresultatet basert på rating eller utgivelsesår, både stigende og
synkende.

## Backend

I vår backend valgte vi innledningsvis å benytte oss av MongoDB database. Etter utallige søk om hvordan
sette opp en god backend, endte vi opp med en såkalt MERN stack. MERN stacken består av MongoDB, Express,
React og NodeJS. I vår implementasjon har vi en database laget i MongoDB. Denne databasen er bestående av
3 collections, henholdsvis movies, users og comments. Movies collection er allerede fylt opp med 5000
forskjellige filmer å søke igjennom. Users og comments er ved deployment tomme da disse dataene legges
til manuelt av bruker. 

Serveren vår er satt opp ved bruk av express og mongoose. Vi benytter oss av express for å lage routes i
serveren, hvor vi kan hente databasedata fra. De routsene vi bruker er /movies,  /users, /comments. For
å finne filmer basert på en query kan vi kalle fetch på for eksempel
http://localhost:4000/movies/movietitle/ + query.
Vi håndterer søket slik at hvis søket ditt er inneholdt i movietitle, så vil filmen dukke opp i searchResult.
I tillegg har vi lagt til funksjonalitet for å putte data inn i databasen. I vår applikasjon har vi mulighet 
til å legge til brukere samt kommentarer. For å legge til brukere har vi lagd Schemas for hver collection i databasen,
og vi kan legge til ved å benytte oss av Axios sin post funksjon. Schemas er laget ved hjelp av mongoose. Her må vi
oppfylle kravet til Schema vi har laget. Vi legger til dataen ved å kjøre en post-request mot for eksempel
localhost:4000/comments/add.

Slik dataflyten fungerer er at når applikasjonen ønsker noe fra databasen, så sender den en forespørsel til
Express-serveren. Express serveren sender forespørselen videre til databasen, som sender dataen tilbake til
serveren. Serveren sender så denne dataen til applikasjonen som renderer dataen.


## Context

Vi har valgt å benytte Context for state management. Vi bruker dette til å enkelt la brukeren velge
om en vil siden skal ha et mørkt tema (darkmode) eller et lyst tema (lightmode). Dette gjøres ved
at vi inne i index.tsx wrapper App-componenten vår i en annen komponent vi kaller ThemeProvider.
Denne komponenten sørger for at vi kan aksessere og endre tema from hvor som helst i komponent-
strukturen, siden alle andre komponenter befinner seg inne i App-komponenten, og hele App-
komponenten selv befinner seg inne i ThemeProvider-komponenten.

## Design

Vi ønsket tidlig at applikasjonen vår skulla ha et minimalistisk design. Dette designet baserer seg på
en lightMode og en DarkMode. Når brukeren søker på en film/filmer vil søkeresultatene dukke opp som cards.
Disse Cardene er laget ved hjelp av Bootstrap. Her kan vi enkelt kalle lage en <Modal>, og sette 
sepsifikasjonene til denne. Vi jobbet i lang tid med å prøve å få filmposter lagt til som bilde.
Problemet her var at lenkene vi brukte for å hente de respektive filmposterne var utaderte. Dette 
førte til at mange av bildene ikke ble lastet, og det visuelle intrykket ble vesentlig dårligere. 
Vi er klar over at det ikke er optimalt å bare vise et og samme bilde på hver film, men det er for 
at dere skal få en forståelse av hvordan søkeresultatet skal se ut. Hadde applikasjonen blitt publisert 
globalt, ville selvfølgelig resultatene vært vist med riktig moviePoster.

## Sortering og filtrering
Når vi skulle håndtere filtrering og sortering, bestemte vi oss tidlig for å basere både filtreringen
og sorteringen på movieRating og movieYear. Dette er to kolonner i vår movie collection i databasen. 
Implementasjonen på filtrering baseres på to sliders. Disse fungerer slik at hvis du endrer for eksempel
rating-slideren til 5.0, vil alle filmer med 5.0 eller bedre i rating vises. Samme filtrering foregår også på year.
Filtreringen fungerer slik at man også kan filtrere på både rating og year samtidig, og tar utgangspunkt i 
det orginale datasettet hentet fra databasen, basert på movieName. Sorteringen fungerer også på dette datasettet, og fungerer 
i stigende og synkende rekkefølge. Siden dette datasettet hentes ved søk, vil en eventuell sortering eller filtrering skje kjapt, og bruker kan se
endringene i søkeresultatet umiddelbart. Dette skjer umiddelbart fordi både filtreringen og sorteringen foregår lokalt.
Dette er et valg vi tok, fordi datasettet er såpass lite at det ikke vil påvirke applikasjonytelsen på moderne teknologiske
enheter. 

