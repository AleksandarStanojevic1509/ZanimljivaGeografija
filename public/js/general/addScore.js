export class addScore {
    constructor(username, points){
        this.username = username;
        this.points = points; 
        
        this.checkDb()
    }

    checkDb(){
        db.collection("rezultati")
        .where("username", "==", `${this.username}`)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                let id;
                querySnapshot.docs.forEach((doc) => {
                    id = doc.id;
                }) 
                this.updatePoints(this.points, id)
                this.updateTime(id)
                this.updateGamePlayed(id)
                // console.log('ovo je id ' + id)
            }            
            else{
                this.setResult()
            }
        })
    }
    // addToDb(){

    // }
    updatePoints(points, id){
        let incrementPoints = firebase.firestore.FieldValue.increment(points);
        db.collection('rezultati').doc(id).update({broj_poena : incrementPoints});
    }
    updateGamePlayed(id){
        let incrementGame = firebase.firestore.FieldValue.increment(1);
        db.collection('rezultati').doc(id).update({broj_igara : incrementGame});
    }
    updateTime(id){
        let updateDate = firebase.firestore.Timestamp.fromDate(new Date())
        db.collection('rezultati').doc(id).update({datum : updateDate});
    }
    setResult(){
        db.collection('rezultati').doc().set({
            broj_igara: 1,
            broj_poena: this.points,
            username:this.username,
            datum:firebase.firestore.Timestamp.fromDate(new Date())
        })
    }
}

