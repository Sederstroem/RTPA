function decrypt (encryptedString) {
    //var encryptedString = "VhztVxcopffizxäk/nns¤qy*$u$>x$#{ä=#>1/42¤0[%}}[3[[1B<!NH1KK4AVMECPZNAGOPJXGÅUgKZRbOTZYSiatepQAqqe";
var encryptedArray = [];
var tecken = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "?",
"!", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
"Å", "Ä", "Ö", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
"y", "z", "å", "ä", "ö", "-", "_", ":", "+", "/", "#", "£", "¤", "$",
"%", "&", "{", "}", "(", ")", "[", "]", "=", "*", "<", ">"];

var teckenLength = tecken.length;

//console.log("\nDenna sträng skall dekrypteras: \n" + encryptedString);

// Denna funktion delar upp strängen i en array så att varje tecken blir ett eget element. 
function stringToArray (stringToSplitUp) {
    var characterArray = stringToSplitUp.split("");
    return characterArray;
}

// Sparar resultatet i den tidigare deklarerade arrayn på rad 2.
encryptedArray = stringToArray(encryptedString);

// Denna funktion tar bort de fem första och fem sista salttecknen m.h.a en for-loop, 
// shift och pop funktionerna.
function saltRemover (arrayToDesalt) {
    for (var i = 0; i < 5; i++) {
        arrayToDesalt.shift();
        arrayToDesalt.pop();
    }
    return arrayToDesalt;
}

// Uppdaterar arrayn med borttagna saltet. Nu innehåller arrayn endast meddelandet som skall dekrypteras.
encryptedArray = saltRemover(encryptedArray);

// Dekrypterar varje tecken m.h.a nästlad for-loop, ett tecken i taget, .
function decryptArray (arrayToDecrypt, teckenArray, teckenLength) {
    var decryptedArray = [];
    let length = arrayToDecrypt.length;
    let key = 1;
    // Den yttre for-loopen går igenom ett tecken i taget i arrayn som ska dekrypteras.
    for (var i = 0; i < length; i++) {
        // Den inre for-loopen jämför index med den givna tecken-arrayn och jämför ifall tecknen är lika.
        // Om tecknet är lika pushar vi det elementet minus värdet i vår key-variabel till vår array där vi bygger ihop meddelandet.
        for (var j = 0; j < teckenLength; j++) {
            if (arrayToDecrypt[i] == teckenArray[j]) {
                decryptedArray.push(teckenArray[j - key])
                // En if-sats för när vi går utanför arrayn där vi läser tecknen ifrån.
                // Om vi går utanför (då index blir < 0) åtgärdar vi det genom att börja räkna 
                // kvarvarande steg från sista index i arrayn vi hämtar tecknen ifrån.
                if (key > j) {
                    let resetIndex = teckenLength - (key - j);
                    decryptedArray[i] = teckenArray[resetIndex];
                }
                key++;
            }
        }
    }
    return decryptedArray;
}

encryptedArray = decryptArray(encryptedArray, tecken, teckenLength);

// Denna funktion slår samman den dekrypterade arrayn till en sträng.
function assembleString (arrayToAssemble) {
    let finalString = "";
    finalString = arrayToAssemble.join("");
    return finalString;
}

encryptedString = assembleString(encryptedArray);
return encryptedString;

}