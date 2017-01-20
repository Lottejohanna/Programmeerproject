# Report

## Week 1 Dag 1 - woensdag 11 januari

![Selfie dag 1](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim, Eline Jacobse en Jan Maarten de Vries  


Vandaag hebben we onze eerste ideeën aan elkaar voorgelegd aan de hand van de gemaakte schetsen. Om de beurt hebben we het voorlopige plan in detail beschreven in ongeveer 4 minuten. Hierna heeft iedereen in de groep hier op gereageerd. We hebben de sterke punten besproken en natuurlijk ook de verbeterpunten genoemd. We hebben elkaar geholpen om het eerste plan aan te scherpen en gezorgd dat iedereen een plan heeft om mee aan de slag te gaan die aan de eisen van de opdracht voldoet.


## Week 1 Dag 2 - donderdag 12 januari 

![Selfie dag 2](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim en Eline Jacobse.
**Afwezig:** Jan Maarten de Vries  


Iedereen heeft vandaag een update gegeven van aanpassingen die ze hebben gedaan aan hun idee van gisteren. We hebben kort verteld wat we vandaag voor ons prototype en het formatteren van de datasets van plan zijn. 
Na elke update hebben we elkaar technische tips gegeven over verschillende onderdelen van de visualisaties die we willen maken. 


## Week 2 Dag 1 - maandag 16 januari 

![Selfie dag 3](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim, Eline Jacobse en Jan Maarten de Vries

Vandaag heeft iedereen een plan gemaakt wat hij/zij deze week af wil hebben, welke veranderingen er zijn bedacht en welke problemen zich al hebben voorgedaan tijdens de implementatie. Verder hebben we elkaar tips gegeven over hoe sommige van deze problemen opgelost kunnen worden. Ook hebben we met elkaar besproken hoe de indeling van de uiteindelijke repository eruit moet komen te zien.




## Week 2 Dag 2 - dinsdag 17 januari 

![Selfie dag 4](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim, Eline Jacobse 
**Afwezig** Jan Maarten de Vries

Vandaag heeft iedereen laten zien wat zij gister gedaan heeft. Eline heeft de wereldkaart af, en bij Nederland is ze al ver. Het doel vandaag is de twee kaarten af hebben voor morgen. 
Isa heeft een bar chart gemaakt, alleen de tekst wordt nog niet helemaal mooi weergegeven op haar x-as. Lotte heeft haar worldmap en bar charts gemaakt. ShanLi heeft haar wereldkaart en bar chart af, ze wil alleen nog dat de kleuren uit de wereldkaart ook in haar bar chart te zien zijn. Vandaag gaat ze aan haar supervisualisatie beginnen. 

## Week 2 Dag 3 - woensdag 18 januari

![Selfie dag 5](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim, Eline Jacobse 
**Afwezig** Jan Maarten de Vries

We hebben gewerkt aan onze styleguide.

## Week 2 Dag 4 - donderdag 19 januari

![Selfie dag 6](doc/)

**Aanwezig:** Isa Leijdekkers, ShanLi Nio, Lotte Slim, Eline Jacobse, Jan Maarten de Vries 

We hebben gewerkt aan onze styleguide.


# Style Guide

## GitHub
### Repository  
 
In je repository heb je op je eerste pagina maximaal vier bestanden: `README.md`, `DESIGN.md`, `PROCESS.md` en een bestand voor het verslag van de daily standups. De overige bestanden zijn onderverdeeld in verschillende mappen. 

In de map `doc` staan alle foto’s, schetsen en screenshots die je hebt gemaakt. Daarnaast heb je nog een map `project` (of vernoemd naar je eigen project), waarin al je code staat. Je HTML-bestanden staan in deze hoofdmap. Voor CSS en Javascript-bestanden maak je twee aparte subfolders nan `css` en `Javascript`.

### Process  
In je bestand `PROCESS.md` beschrijf je elke dag kort wat je die dag gedaan hebt, eventueel met screenshots of foto’s erbij. Je begint je beschrijving met een header zoals dit: 

```
# day 2
```

## Code

### Headers
Begin elke file met een header met:

<ul>
<li>Titel van file</li>
<li>Beschrijving van functie</li>
<li>Naam auteur</li>
<li>Studentennummer</li>
</ul>

### HTML

Je begint je document altijd met `<!DOCTYPE html>` gevolgd door een `<head>`. In je `<head>` zet je al de verschillende libraries en andere bestanden die je nodig hebt voor je pagina. Na je titel zet je een link naar CSS-bestanden, gevolgd door Javascript-libraries en je eigen Javascript bestanden (als je er meerdere hebt).  

Voorbeeld:

```
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title>Example title</title>
  <link rel="stylesheet" type="text/css" href="css/styles.css"/>
  <script></script>
</head>
```

Je ‘main’-JavaScript bestand zet je vervolgens onderaan je body. 
#### Afbeeldingen
Voeg bij het gebruiken van afbeeldingen altijd een “alt” attribuut toe. Dit is belangrijk wanneer de afbeelding om een bepaalde reden niet kan worden geladen. Voeg ook een “style” attribuut toe waarin de afmeting van de afbeelding wordt bepaald. Hierdoor wordt er als het ware al ruimte gereserveerd door de afbeelding tijdens het laden van de pagina.
Voorbeeld:
```
<img src=”html15.jpg” alt=”HTML5” style=”width:128px;height:128px”>
```

### JavaScript
#### Namen van variabelen
Gebruik camelCase voor namen van variabelen

#### Spaties rondom operatoren
Plaats spaties om operatoren ( = + - * / ), en na komma’s

```
var x = y * z;
```

#### Indentatie
Gebruik altijd 4 spaties voor de indentatie van een stuk code

``` 
function kwadraat(getal) {
	return getal * getal;
}
```

#### Statement Rules
Eindig een simpele statement met een puntkomma

```
var auto = [“Volvo”, “Saab”, “Fiat”];

var person = {
	firstName: “John”,
	lastName: “Doe”
};
```
Regels voor complexe statements:
* Plaats { aan het einde van de eerste regel
* Gebruik een spatie voor {
* Plaats } op een nieuwe regel, zonder een spatie ervoor
* Eindig een complexe statement niet met een ;

```
function kwadraat(getal) {
	return getal * getal;
}
```

#### Loops
```
for (i = 0; i < 5; i++) {
	x += i;
}
```

#### Conditionals
if (time < 20) {
	greeting = “Good day”;
} else {
	greeting = “Good evening”;
}

Gebruik bij vergelijkingen niet `x == true` of `x == false`. In plaats daarvan moet je `(x)` of `(!x)` gebruiken. 

Wanneer je checkt of een object bestaat, vergelijk dit dan met `null`. Cijfers vergelijk je met `0` en strings met `””`. 

Bij een simpele if-else statement zoals dit: 

```
if (val) {
    return foo();
}
else {
    return bar();
}
```

Kun je ook de conditional operator `?` gebruiken. Hiermee vermijd je dat je code onnodig lang wordt. Dan wordt dezelfde statement dit: 

```
return val ? foo() : bar();
```



#### Regels voor objecten
* Plaats { op de zelfde regels als de naam van het object
* Gebruik een : en een spatie tussen elke eigenschap en zijn waarde
* Gebruik quotes rondom strings, niet rondom numerieke waardes
* Voeg geen komma toe na het laatste eigenschap-waarde paar
* Plaats } op een nieuwe regel, zonder spatie ervoor
* Eindig een object met een puntkomma

```
var person = {
	firstName: “John”,
	lastName: “Doe”,
	age: 50
};
```

#### Lengte van een regel < 80
Als de statement niet op 1 regel past, is de beste plaats om een enter te plaatsen na een operator of een komma

```
document.getElementById(“demo”).innerHTML =
	“Hello Dolly.”;
```

#### Comments
Elke comment wordt voorafgegaan door een witregel, vervolgens hoort er een spatie tussen het comment symbool en de comment tekst. Deze tekst begint altijd met een hoofdletter en eindigt altijd met een punt. Single-line comments worden gebruikt voor de regel die eronder staat, multi-line comments worden alleen gebruikt voor de headers van files of functies. 

```
// This is a comment

// Even long comments that span
// multiple lines use the single
// line comment form.

```

### CSS
Zet declaraties op alfabetische volgorde om consistent te blijven.
Gebruik een spatie achter een dubbele punt.
Voorbeeld:
```
background: blue;
border: ipx solid;
text-align: center;
text-indent: 2em;
```

Gebruik enkele aanhalingstekens in plaats van dubbele.
## Bronnen: 

- [MDN Coding Style](https://developer.mozilla.org/en-US/docs/JavaScript_Tips)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [JavaScript Style Conventions](http://www.w3schools.com/js/js_conventions.asp)
- [Repository Setup Minor Programmeren](https://projectf.mprog.nl/reference/repository-setup)



