export const FirstLetter = (fixedTerm) =>{
    if(fixedTerm.slice(0,2) === 'Nj' || fixedTerm.slice(0,2) === 'Lj' || fixedTerm.slice(0,2) === 'Dž'){
        return fixedTerm.slice(0,2);
    }
    else {
        return fixedTerm.slice(0,1);
    }
}

// BAZA
// db.collection("pojmovi").doc("2XDElWysqCuBQsGKHZI3").delete().then(function() {
    //     console.log("Document successfully deleted!");
    // }).catch(function(error) {
        //     console.error("Error removing document: ", error);
        // });
        


    //  KVARNICKI
    let addTerm = async (cat, val)=>{
        let date = new Date ()
        let firstLetter = checkFirstLetter(val)
        let newDoc = {
            kategorija: cat,
            korisnik : `alexStan`,
            pocetnoSlovo: firstLetter,
            pojam: val,
            vreme: firebase.firestore.Timestamp.fromDate(date) 
        }
        return await db.collection('pojmovi').add(newDoc)
    }
    
    let checkTerm = async (cat, val) =>{
        db.collection('pojmovi')
        .where('kategorija', '==', cat)
        .where('pojam', '==', val)
        .get()
        .then(querySnapshot =>{
            if (querySnapshot.size > 0){
                querySnapshot.docs.forEach((doc) => {
                    console.log('Pojam vec postoji u bazi podataka!!')
                })
            }
            else{
                addTerm(cat, val);
                console.log('Uspesno dodat pojam!!')
            }
        })
    }    
    
        
        let wordArray = [];
        let words =  ""; // *** Promeni niz ***
        wordArray = words.split(' ');
        console.log(wordArray)
        wordArray.forEach(word => {
            checkTerm("Biljka", word); // *** Ukucaj ručno kategoriju ****  
        })
    


// BRISANJE SVIH PODATAKA JEDNOG USERA
// db.collection("pojmovi")
//     .where("korisnik", "==", 'alexStan')
//     .get()
//     .then( snapshot => {
//         snapshot.docs.forEach( doc => {
//             db.collection('pojmovi').doc(doc.id).delete();
//         })
//     });
