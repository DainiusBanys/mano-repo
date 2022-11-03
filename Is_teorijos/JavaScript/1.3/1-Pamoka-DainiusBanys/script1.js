// Funkcija grąžinanti savaitės dienos pavadinimą
function getWeekDay() {
 const date = new Date();
 const d = date.getDay();

  const t = new Date();
year=t.getFullYear();;

 switch (d) {
   case 1:
     return "Pirmadienis";
   case 2:
     return "Antradienis";
   case 3:
     return "Trečiadienis";
   case 4:
     return "Ketvirtadienis";
   case 5:
     return "Penktadienis";
   case 6:
     return "Šeštadienis";
   case 7:
     return "Sekmadienis";
 }
}

const day = getWeekDay();
console.log(day); // Dienos pavadinimas išspausdinamas į ekrana
console.log(year);