const container = document.querySelector(".container");

let videDepart = document.querySelector("#vide-depart")
let typeDepart = document.querySelector("#type-depart")
let binaireD = document.querySelector("#binaireD");
let octaleD = document.querySelector("#octaleD");
let decimaleD = document.querySelector("#decimaleD");
let hexadecimalD = document.querySelector("#hexadecimalD");

let videArrive = document.querySelector("#vide-arrive")
let typeArrive = document.querySelector("#type-arrive")
let binaireA = document.querySelector("#binaireA");
let octaleA = document.querySelector("#octaleA");
let decimaleA = document.querySelector("#decimaleA");
let hexadecimalA = document.querySelector("#hexadecimalA");

let valeur = document.querySelector("#valeur");
const error = document.querySelector("#error-input");

const button = document.querySelector("#button");

const message = document.querySelector("#message");
const valeurConvertie = document.querySelector("#valeur-convertie");
const exposantMess = document.querySelector("#exposant");

const echange = document.querySelector(".echange-button");



if (valeur.value === "") {
    button.disabled = true;
    echange.disabled = true;
    message.style.display = "none";
} else {
    button.disabled = false;
    echange.disabled = false;
    error.style.display = "none";
}


// F1 : CONTROLE DE SAISIE
// F1.1 : POUR AJOUTER LE CONTROLE DE SAISIE AU CHANGEMENT DANS LE SELECTOR
typeArrive.addEventListener("change", validateInput);
typeDepart.addEventListener("change", validateInput);

// F1.2 : POUR AJOUTER LE CONTROLE DE SAISIE À L'INPUT (QUAND ON ECRIT)
valeur.addEventListener("input", validateInput);

// F1.3 : FUNCTION DU CONTROLE DE SAISIE APPLIQUÉ DANS F1.1 ET F1.2
function validateInput() {
    if (binaireD.selected) {
        if (!/^[0-1]+$/.test(valeur.value)) {
            error.style.display = "block";
            button.disabled = true;
            echange.disabled = true;
        } else {
            if (typeArrive.selectedIndex === 0) {
                button.disabled = true;
                echange.disabled = true;
            } else {
                error.style.display = "none";
                button.disabled = false;
                echange.disabled = false;
            }
        }
    } else if (octaleD.selected) {
        if (!/^[0-7]+$/.test(valeur.value)) {
            error.style.display = "block";
            button.disabled = true;
            echange.disabled = true;
        } else {
            if (typeArrive.selectedIndex === 0) {
                button.disabled = true;
                echange.disabled = true;
            } else {
                error.style.display = "none";
                button.disabled = false;
                echange.disabled = false;
            }
        }
    } else if (decimaleD.selected) {
        if (!/^\d+$/.test(valeur.value)) {
            error.style.display = "block";
            button.disabled = true;
            echange.disabled = true;
        } else {
            if (typeArrive.selectedIndex === 0) {
                button.disabled = true;
                echange.disabled = true;
            } else {
                error.style.display = "none";
                button.disabled = false;
                echange.disabled = false;
            }
        }
    } else if (hexadecimalD.selected) {
        const isUppercaseHex = /^[0-9A-F]+$/.test(valeur.value);
        const isLowercaseHex = /^[a-f]+$/.test(valeur.value);
        if (!isUppercaseHex || isLowercaseHex) {
            error.style.display = "block";
            button.disabled = true;
            echange.disabled = true;
        } else {
            if (typeArrive.selectedIndex === 0) {
                button.disabled = true;
                echange.disabled = true;
            } else {
                error.style.display = "none";
                button.disabled = false;
                echange.disabled = false;
            }
        }
    } else {
        error.style.display = "none";
        button.disabled = true;
        echange.disabled = true;
        if (typeDepart.selectedIndex === 0 && typeArrive.selectedIndex === 0 && valeur.value === "") {
            message.style.display = "none";
            container.style.paddingBottom = "50px";
        }
    }

    if (error.style.display === "block") {
        message.style.display = "none";
        container.style.paddingBottom = "50px";
    }

    if (valeur.value === "") {
        error.style.display = "none";
    }
}



// F2 : AFFICCHAGE EXPOSENT DANS LE MESSAGE FINALE PAR PRAPORT AU TYPE D'ARRIVE
function exposantValue() {
    if (binaireA.selected) {
        return "₂";
    }
    if (octaleA.selected) {
        return "₈";
    }
    if (decimaleA.selected) {
        return "₁₀";
    }
    if (hexadecimalA.selected) {
        return "₁₆";
    }
    return "";
}



// F3 : FUNCTION QUI CALCULE LA CONVERSION DE DECIMALE => (BIN / OCT / HEX)
function decimalToBinOctHex() {
    let chiffre = valeur.value;
    let expType = 0;
    let resultat = "";

    if (binaireA.selected) {
        // F3.1
        expType = 2;
    }
    if (octaleA.selected) {
        // F3.2
        expType = 8;
    }
    if (hexadecimalA.selected) {
        // F3.3
        expType = 16;
    }

    while (chiffre > 0) {
        let reste = chiffre % expType;

        // F3.3.1 : POUR CONVERTIR LES VALEURS DE "RESTE" SUPERIEUR A 9 EN LETTRE HEX
        if (reste > 9) {
            switch (reste) {
                case 10:
                    reste = "A";
                    break;
                case 11:
                    reste = "B";
                    break;
                case 12:
                    reste = "C";
                    break;
                case 13:
                    reste = "D";
                    break;
                case 14:
                    reste = "E";
                    break;
                case 15:
                    reste = "F";
                    break;
            }
        }

        resultat = reste + resultat;
        chiffre = Math.floor(chiffre / expType);
    }

    return resultat.toString();
};



// F4 : HEXADECIMAL <=> BINAIRE
// F4.1 : FUNCTION QUI CALCULE LA CONVERSION DE HEXADECIMAL => BINAIRE
function hexToBinaire() {
    let resultat = "";
    let baseHexBin = [];
    baseHexBin[0] = "0000"; baseHexBin[1] = "0001";
    baseHexBin[2] = "0010"; baseHexBin[3] = "0011";
    baseHexBin[4] = "0100"; baseHexBin[5] = "0101";
    baseHexBin[6] = "0110"; baseHexBin[7] = "0111";
    baseHexBin[8] = "1000"; baseHexBin[9] = "1001";
    baseHexBin["A"] = "1010"; baseHexBin["B"] = "1011";
    baseHexBin["C"] = "1100"; baseHexBin["D"] = "1101";
    baseHexBin["E"] = "1110"; baseHexBin["F"] = "1111";

    let chiffre = valeur.value.split('').reverse();

    for (let i = 0; i < chiffre.length; i++) {
        resultat = baseHexBin[chiffre[i]] + resultat;
    }

    // afin d'enlever les zero devants la conversion, exemple: 000101 => 101
    resultat = resultat.replace(/^0+/, '');
    return resultat;
};
// F4.2 : FUNCTION QUI CALCULE LA CONVERSION DE BINAIRE => HEXADECIMAL
function binaireToHex(valeur) {
    let resultat = "";
    let baseHexBin = [];
    baseHexBin["0000"] = "0"; baseHexBin["0001"] = "1";
    baseHexBin["0010"] = "2"; baseHexBin["0011"] = "3";
    baseHexBin["0100"] = "4"; baseHexBin["0101"] = "5";
    baseHexBin["0110"] = "6"; baseHexBin["0111"] = "7";
    baseHexBin["1000"] = "8"; baseHexBin["1001"] = "9";
    baseHexBin["1010"] = "A"; baseHexBin["1011"] = "B";
    baseHexBin["1100"] = "C"; baseHexBin["1101"] = "D";
    baseHexBin["1110"] = "E"; baseHexBin["1111"] = "F";

    if (valeur.length % 4 != 0) {
        while (valeur.length % 4 != 0) {
            valeur = "0" + valeur;
        }
    }

    let groupeBin = valeur.match(/\d{4}/g).reverse();

    for (let i = 0; i < groupeBin.length; i++) {
        resultat = baseHexBin[groupeBin[i]] + resultat;
    }

    // afin d'enlever les zero devants la conversion, exemple: 000101 => 101
    resultat = resultat.replace(/^0+/, '');
    return resultat;
};



// F5 : OCTALE <=> BINAIRE
// F5.1 : FUNCTION QUI CALCULE LA CONVERSION DE OCTALE => BINAIRE
function octToBinaire() {
    let resultat = "";
    let baseOctBin = [];
    baseOctBin[0] = "000"; baseOctBin[1] = "001";
    baseOctBin[2] = "010"; baseOctBin[3] = "011";
    baseOctBin[4] = "100"; baseOctBin[5] = "101";
    baseOctBin[6] = "110"; baseOctBin[7] = "111";

    let chiffre = valeur.value.split('').reverse();

    for (let i = 0; i < chiffre.length; i++) {
        resultat = baseOctBin[chiffre[i]] + resultat;
    }

    // afin d'enlever les zero devants la conversion, exemple: 000101 => 101
    resultat = resultat.replace(/^0+/, '');
    return resultat;
};
// F5.2 : FUNCTION QUI CALCULE LA CONVERSION DE BINAIRE => OCTALE
function binaireToOct(valeur) {
    let resultat = "";
    let baseOctBin = [];
    baseOctBin["000"] = "0"; baseOctBin["001"] = "1";
    baseOctBin["010"] = "2"; baseOctBin["011"] = "3";
    baseOctBin["100"] = "4"; baseOctBin["101"] = "5";
    baseOctBin["110"] = "6"; baseOctBin["111"] = "7";

    if (valeur.length % 3 != 0) {
        while (valeur.length % 3 != 0) {
            valeur = "0" + valeur;
        }
    }

    let groupeBin = valeur.match(/\d{3}/g).reverse();

    for (let i = 0; i < groupeBin.length; i++) {
        resultat = baseOctBin[groupeBin[i]] + resultat;
    }

    // afin d'enlever les zero devants la conversion, exemple: 000101 => 101
    resultat = resultat.replace(/^0+/, '');
    return resultat;
};



// F6 : FUNCTION QUI CALCULE LA CONVERSION DE OCTALE => HEXADECIMAL
function octToHex() {

    let resultatOctToBin = octToBinaire();
    let resultat = binaireToHex(resultatOctToBin);

    return resultat;
};



// F7 : FUNCTION QUI CALCULE LA CONVERSION DE HEXADECIMAL => OCTALE
function hexToOct() {

    let resultatHexToBin = hexToBinaire();
    let resultat = binaireToOct(resultatHexToBin);

    return resultat;
};



// F8 : FUNCTION QUI CALCULE LA CONVERSION DE TOUT => DECIMALE
function allToDecimal() {
    let chiffres = valeur.value.split('').reverse();
    let expType = 0;
    let somme = 0;

    if (binaireD.selected) {
        expType = 2;
    }
    if (octaleD.selected) {
        expType = 8;
    }
    if (hexadecimalD.selected) {
        expType = 16;
    }

    for (let i = 0; i < chiffres.length; i++) {
        let chiffre = parseInt(chiffres[i]);
        let resultat = chiffre * Math.pow(expType, i);
        somme += resultat;
    }
    console.log("resultat :",somme);
    return somme;
};



// F9 : FUNCTION QUI TRIE LA SELECTION EN BASE DE CE QU'ON SELECTIONNE DANS LA LISTE
typeDepart.addEventListener("change", trieOptionsArrive);
typeArrive.addEventListener("change", trieOptionsDepart);

// F9.1 : FUNCTION QUI TRIE LA SELECTION DE: DEPART => ARRIVÉ
function trieOptionsArrive() {
    for (let option of typeArrive.options) {
        option.style.display = 'block';
    }

    if (binaireD.selected) {
        binaireA.style.display = "none";
    }
    if (octaleD.selected) {
        octaleA.style.display = "none";
    }
    if (decimaleD.selected) {
        decimaleA.style.display = "none";
    }
    if (hexadecimalD.selected) {
        hexadecimalA.style.display = "none";
    }
}
// F9.2 : FUNCTION QUI TRIE LA SELECTION DE: ARRIVÉ => DEPART
function trieOptionsDepart() {
    for (let option of typeDepart.options) {
        option.style.display = 'block';
    }

    if (binaireA.selected) {
        binaireD.style.display = "none";
    }
    if (octaleA.selected) {
        octaleD.style.display = "none";
    }
    if (decimaleA.selected) {
        decimaleD.style.display = "none";
    }
    if (hexadecimalA.selected) {
        hexadecimalD.style.display = "none";
    }
}
// F9.3 : FUNCTION QUI ECHANGE LES VALEURS DE DEPART ET ARRIVE
// Quand on "click" sur "echange" la function "changeOptions" s'execute
echange.addEventListener("click", changeOptions);
// Quand on "click" sur "echange" la function "afficherMessage" s'execute
echange.addEventListener("click", afficherMessage);
echange.addEventListener("click", validateInput);

//A VERIFIER
echange.addEventListener("click", trieOptionsDepart);


// Function qui echange les valeurs de depart et arrive
function changeOptions() {
    /* A VERIFIER
    error.style.display = "none";
    message.style.display = "none";
    container.style.paddingBottom = "50px";
    */

    if (binaireD.selected && octaleA.selected) {
        let binaireDepartIndex = typeDepart.selectedIndex;
        let octaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = octaleArriveIndex;
        typeArrive.selectedIndex = binaireDepartIndex;

        //MODIFIER LES NOMINATION DES VARIABLES

    } else if (octaleD.selected && binaireA.selected) {
        let binairDepartIndex = typeDepart.selectedIndex;
        let octaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = octaleArriveIndex;
        typeArrive.selectedIndex = binairDepartIndex;
    }

    if (binaireD.selected && decimaleA.selected) {
        let decimaleDepartIndex = typeDepart.selectedIndex;
        let binaireArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = binaireArriveIndex;
        typeArrive.selectedIndex = decimaleDepartIndex;
    } else if (decimaleD.selected && binaireA.selected) {
        let binairDepartIndex = typeDepart.selectedIndex;
        let decimaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = decimaleArriveIndex;
        typeArrive.selectedIndex = binairDepartIndex;
    }

    if (binaireD.selected && hexadecimalA.selected) {
        let hexadecimalDepartIndex = typeDepart.selectedIndex;
        let binaireArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = binaireArriveIndex;
        typeArrive.selectedIndex = hexadecimalDepartIndex;
    } else if (hexadecimalD.selected && binaireA.selected) {
        let binairDepartIndex = typeDepart.selectedIndex;
        let hexadecimalArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = hexadecimalArriveIndex;
        typeArrive.selectedIndex = binairDepartIndex;
    }

    if (octaleD.selected && decimaleA.selected) {
        let decimaleDepartIndex = typeDepart.selectedIndex;
        let octaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = octaleArriveIndex;
        typeArrive.selectedIndex = decimaleDepartIndex;
    } else if (decimaleD.selected && octaleA.selected) {
        let octaleDepartIndex = typeDepart.selectedIndex;
        let decimaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = decimaleArriveIndex;
        typeArrive.selectedIndex = octaleDepartIndex;
    }

    if (octaleD.selected && hexadecimalA.selected) {
        let hexadecimalDepartIndex = typeDepart.selectedIndex;
        let octaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = octaleArriveIndex;
        typeArrive.selectedIndex =  hexadecimalDepartIndex;
    } else if (hexadecimalD.selected && octaleA.selected) {
        let octaleDepartIndex = typeDepart.selectedIndex;
        let hexadecimalArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = hexadecimalArriveIndex;
        typeArrive.selectedIndex = octaleDepartIndex;
    }

    if (decimaleD.selected && hexadecimalA.selected) {
        let hexadecimalDepartIndex = typeDepart.selectedIndex;
        let decimaleArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = decimaleArriveIndex;
        typeArrive.selectedIndex = hexadecimalDepartIndex;
    } else if (hexadecimalD.selected && decimaleA.selected) {
        let decimaleDepartIndex = typeDepart.selectedIndex;
        let hexadecimalArriveIndex = typeArrive.selectedIndex;
        typeDepart.selectedIndex = hexadecimalArriveIndex;
        typeArrive.selectedIndex = decimaleDepartIndex;
    }
}



// F10 : FUNCTION QUI AFFECTE LE RESULT DE LA CONVERSION A LA VARIABLE "conversionResult" POUR L'AFFICHER DANS LE MESSAGE
function calculConversion() {
    let conversionResult = 0;

    // => F3 : FUNCTION QUI CALCULE LA CONVERSION DE DECIMALE => (BIN / OCT / HEX)
    if (decimaleD.selected && decimaleA.selected) {
        conversionResult = valeur.value;
    } else {
        // => F3.1 : FUNCTION QUI CALCULE LA CONVERSION DE DECIMALE => BINAIRE
        if (decimaleD.selected && binaireA.selected) {
            conversionResult = decimalToBinOctHex();
        }
        // => F3.2 : FUNCTION QUI CALCULE LA CONVERSION DE DECIMALE => OCTALE

        if (decimaleD.selected && octaleA.selected) {
            conversionResult = decimalToBinOctHex();
        }
        // => F3.3 : FUNCTION QUI CALCULE LA CONVERSION DE DECIMALE => HEXADECIMAL
        if (decimaleD.selected && hexadecimalA.selected) {
            conversionResult = decimalToBinOctHex();
        }
    }

    // => F4 : HEXADECIMAL <=> BINAIRE
    // => F4.1 : FUNCTION QUI CALCULE LA CONVERSION DE HEXADECIMAL => BINAIRE
    if (hexadecimalD.selected && hexadecimalA.selected) {
        conversionResult = valeur.value;
    } else {
        if (hexadecimalD.selected && binaireA.selected) {
            conversionResult = hexToBinaire();
        }
    }
    // => F4.2 : FUNCTION QUI CALCULE LA CONVERSION DE BINAIRE => HEXADECIMAL
    if (binaireD.selected && binaireA.selected) {
        conversionResult = valeur.value;
    } else {
        if (binaireD.selected && hexadecimalA.selected) {
            conversionResult = binaireToHex(valeur.value);
        }
    }

    // => F5 : OCTALE <=> BINAIRE
    // => F5.1 : FUNCTION QUI CALCULE LA CONVERSION DE OCTALE => BINAIRE
    if (octaleD.selected && octaleA.selected) {
        conversionResult = valeur.value;
    } else {
        if (octaleD.selected && binaireA.selected) {
            conversionResult = octToBinaire();
        }
    }
    // => F5.2 : FUNCTION QUI CALCULE LA CONVERSION DE BINAIRE => OCTALE
    if (binaireD.selected && binaireA.selected) {
        conversionResult = valeur.value;
    } else {
        if (binaireD.selected && octaleA.selected) {
            conversionResult = binaireToOct(valeur.value);
        }
    }

    // => F6 : FUNCTION QUI CALCULE LA CONVERSION DE OCTALE => HEXADECIMAL
    if (octaleD.selected && octaleA.selected) {
        conversionResult = valeur.value;
    } else {
        if (octaleD.selected && hexadecimalA.selected) {
            conversionResult = octToHex();
        }
    }

    // => F7 : FUNCTION QUI CALCULE LA CONVERSION DE HEXADECIMAL => OCTALE
    if (hexadecimalD.selected && hexadecimalA.selected) {
        conversionResult = valeur.value;
    } else {
        if (hexadecimalD.selected && octaleA.selected) {
            conversionResult = hexToOct();
        }
    }

    // => F8 : FUNCTION QUI CALCULE LA CONVERSION DE TOUT => DECIMALE
    if (decimaleD.selected && decimaleA.selected) {
        conversionResult = valeur.value;
    } else {
        if ((binaireD.selected || octaleD.selected || hexadecimalD.selected) && decimaleA.selected) {
            conversionResult = allToDecimal();
        }
    }

    return conversionResult;
};



// F11 : POUR CONSTRUIRE LE MESSAGE AFIN L'AFFICHER PAR LA SUITE
function messageConversion() {
    const conversionValue = calculConversion();
    valeurConvertie.textContent = "(" + conversionValue + ")";
    valeurConvertie.style.whiteSpace = "normal";
    valeurConvertie.style.wordBreak = "break-word";
    valeurConvertie.style.display = "inline";
    exposantMess.textContent = exposantValue();
    message.style.display = "flex";
    container.style.paddingBottom = "0px";
}



// F12 : POUR AFFICHER LE MESSAGE
button.addEventListener("click", afficherMessage);

function afficherMessage() {
    messageConversion();
}



// F13 : POUR COPIER LE RESULTAT
message.addEventListener("click", () => {
    let copy = valeurConvertie.textContent.replace(/[()]/g, '');
    valeurConvertie.style.whiteSpace = "normal";
    valeurConvertie.style.wordBreak = "break-word";
    valeurConvertie.style.display = "inline";
    navigator.clipboard.writeText(copy);
});