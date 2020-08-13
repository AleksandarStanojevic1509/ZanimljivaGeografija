export const fixInputValue = (inputText)=>{
    let suggestedTerm = inputText.value;

    suggestedTerm = suggestedTerm.replace(/\s+/g, '').replace(/[^a-zđščžć]+/gi, '').toLowerCase()
    let firstLetter = suggestedTerm.slice(0,1).toUpperCase();
    let restLetters = suggestedTerm.slice(1);
    return firstLetter + restLetters;
}
export const checkFirstLetter = (fixedTerm) =>{
    if(fixedTerm.slice(0,2) === 'Nj' || fixedTerm.slice(0,2) === 'Lj' || fixedTerm.slice(0,2) === 'Dž'){
        return fixedTerm.slice(0,2);
    }
    else {
        return fixedTerm.slice(0,1);
    }
}
export const alertBox = (modal, msg, title, msgText, titleText) =>{
    modal.style.display = 'grid';
    msg.innerHTML = `${msgText}`;
    title.innerHTML = `${titleText}`;  
}

export const renderHelp = () =>{
    return `
    <div id="help-box">
            <div>
                <h5>Pravila Igre:</h5>
                <p>&nbsp;&nbsp;&nbsp;* Ako čitate ova pravila znači da ste veći izabrali <b>username</b>, međutim u svakom trenutku možete promeinti username klikom na <i style="border: 1px solid #26a69a;display: inline-flex;width: 27px;color: #26a69a;" class="material-icons">sync</i> ikonicu.</p>
                <p>&nbsp;&nbsp;&nbsp;* Takođe, ako želite možete učestvovati u popunjavanju baze. Termine možete predložiti klikom na <i style="border: 1px solid #26a69a;display: inline-flex;width: 30px;color: #26a69a;" class="material-icons"class="material-icons" > cloud_upload</i> ikonicu. Ukoliko primetite da ste tačno odgovorili, a poene niste dobili, unesite taj termin u odeljku "DODAJ TERMIN", klikom na istu ikonicu.</p>
                <p>&nbsp;&nbsp;&nbsp;* Igra se sastoji iz dva modula: <em>Igre protiv kompjutera</em> i <em>Igre protiv drugog igrača</em>. U oba slučaja igra počinje kada se klikne na <span style="border: 1px solid #26a69a;
                    display: inline-flex;width: 70px;color: #26a69a;"><i class="material-icons">account_box</i> vs. <i class="material-icons">account_box</i></span> ili na <span style="border: 1px solid #26a69a;
                    display: inline-flex;width: 70px;color: #26a69a;"><i class="material-icons">account_box</i> vs. <i class="material-icons">desktop_windows</i></span>. 
                    Automaski se generise nasumično slovo, a za igrač ima 60 sekundi da unese svoje pojmove. Igrač klikom na dugme <b>POŠALjI</b> završava i igru i šalje svoje odgovore na proveru. </p>
                <p>&nbsp;&nbsp;&nbsp;* NAPOMENA: Upotrebljavajte slova Č, Ć, Đ, Ž i Š kako bi unos bio ispravan.</p>

            </div>
            <button class="btn" class="waves-effect waves-light btn-small">OK</button>
        </div>
   `
}