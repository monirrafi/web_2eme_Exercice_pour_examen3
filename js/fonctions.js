let listeCommandes = tabCommandes['Source Data'];
let listeProduits=[];
let listeClients=[];
let listeTotal = ['Tous','1','2','3','4'];
let chargerListesNoDoublants = () => {
    for(let commande of listeCommandes){
        if(listeProduits.indexOf(commande.Product) == -1){
            listeProduits.push(commande.Product);
        }
        if(listeClients.indexOf(commande.Customer) == -1){
            listeClients.push(commande.Customer);
        }
    }
}
chargerListesNoDoublants();
let clickProduits = () => {
    let rep =`

    <table>
    <caption>Colored Table Header</caption>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Savings</th>
      </tr>
      <tr>
        <td>Peter</td>
        <td>Griffin</td>
        <td class="tdcenter">$100</td>
      </tr>
      <tr>
        <td>Lois</td>
        <td>Griffin</td>
        <td class="tdcenter">$150</td>
      </tr>
      <tr>
        <td>Joe</td>
        <td>Swanson</td>
        <td class="tdcenter">$300</td>
      </tr>
      <tr>
        <td>Cleveland</td>
        <td>Brown</td>
        <td class="tdcenter">$250</td>
    </tr>
    </table>
    
`;
    document.getElementById('contenu').innerHTML = rep;

}
let changerTotal = () => {
    let selTotal = document.getElementById('selTotal');
    let choix = selTotal.options[selTotal.options.selectedIndex].text;
    document.getElementById('contenu').innerHTML = calculerTotal(choix);
}
let calculerTotal = (no) => {
    let somme = 0.00;
    let total ;

    if(no != 'Tous'){
        total = 'Qtr ' + no;
        for(let commande of listeCommandes){
            let montant = commande[total];
            if(montant != undefined){
                montant = montant.substring(1).replace(',','');
                montant = parseFloat(montant);
                somme +=montant;
            }

        }
    }else{
        for(let i=1;i<5;i++){
            total = 'Qtr ' + i;
            for(let commande of listeCommandes){
                let montant = commande[total];
                if(montant != undefined){
                    montant = montant.substring(1).replace(',','');
                    montant = parseFloat(montant);
                    somme +=montant;
                }
    
            }
    
        }
        total = 'Tous';
    }
    
    let contenuTable = `
    <center>
    <div class="col">
    <div class="card mb-4 rounded-3 shadow-sm border-primary">
      <div class="card-header py-3 text-bg-primary border-primary">
        <h4 class="my-0 fw-normal">Total du ${total}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">${somme.toFixed(2)}<small class="text-muted fw-light"> $</small></h1>
      </div>
    </div>
    </div>
    </div>
    </center>
        `;
return contenuTable;

}

let ChargerSelect = () => {
    let selProduits = document.getElementById('selProduits');
    let selClients = document.getElementById('selClients');

    for(let produit of listeProduits){
        selProduits.options[selProduits.options.length]= new Option(produit); 
    }
    for(let client of listeClients){
        selClients.options[selClients.options.length]= new Option(client); 
    }
    clickProduits();
    //document.getElementById('contenu').innerHTML = lister(listeCommandes,'');
}
let listerUnChoix = (cle,choix) => {
    let retourTableau = [];
    for(let commande of listeCommandes){
        if(commande[cle] == choix){
            retourTableau.push(commande);
        }
    }
    return retourTableau;

}
let changerProduit = () => {
    let selProduits = document.getElementById('selProduits');
    let choix = listeProduits[selProduits.selectedIndex];
    document.getElementById('contenu').innerHTML = lister(listerUnChoix('Product',choix),'P',choix);

}
let changerClient = () => {
    let selClients = document.getElementById('selClients');
    let choix = listeClients[selClients.selectedIndex];
    document.getElementById('contenu').innerHTML = lister(listerUnChoix('Customer',choix),'C',choix);

}

let entete = (pour,nomDePour) => {
    let rep = `
        <table>
        `;
        if(pour=='P'){
            rep += `
                <caption>LISTE DES CLIENTS QU'ONT COMMANDÉ LE PRODUIT ${nomDePour}</caption>
                <thead>
                <tr><th>Client</th>
            `;
        } else if(pour=='C'){
            rep += `
                <caption>LISTE DES PRODUITS COMMANDÉS PAR LE CLIENT ${nomDePour}</caption>
                <thead>
                <tr><th>Produit</th>
            `;
        }else {//Tout la liste
                rep += `
                <caption>LISTE DE TOUTES LES COMMANDES</caption>
                <thead>

                <tr><th>Produit</th><th>Client</th>
                `;
        }
        rep+=`<th>Qtr 1</th><th>Qtr 2</th><th>Qtr 3</th><th>Qtr 4</th></tr>
        </thead>
        `;
    return rep;
}

let lister = (liste,cle,choix) => {
    let retourTableau = entete(cle,choix);
    for(let commande of liste){
        if(cle == 'P'){
            retourTableau +=`
            <tr>
                <th>${commande.Customer}</th>
            `;
    
        }else if(cle == 'C'){
            retourTableau +=`
            <tr>
                <th>${commande.Product}</th>
    
            `;
    
        }else{
            retourTableau +=`
            <tr>
                <th>${commande.Product}</th>
                <th>${commande.Customer}</th>
    
            `;
    
        }
        if(commande['Qtr 1'] != undefined){
            retourTableau +=`
            <th>${commande['Qtr 1']}</th>
            `;
        }else{    
            retourTableau +=`
            <th></th>
            `;
        }
        if(commande['Qtr 2'] != undefined){
            retourTableau +=`
            <th>${commande['Qtr 2']}</th>
            `;
        }else{    
            retourTableau +=`
            <th></th>
            `;
        }
        if(commande['Qtr 3'] != undefined){
            retourTableau +=`
            <th>${commande['Qtr 3']}</th>
            `;
        }else{    
            retourTableau +=`
            <th></th>
            `;
        }
        if(commande['Qtr 4'] != undefined){
            retourTableau +=`
            <th>${commande['Qtr 4']}</th>
            `;
        }else{    
            retourTableau +=`
            <th></th>
            `;
        }
   
    }
    retourTableau +=`
    </tr>
    </tbody>
    </table>
    </div>
    `;
    return retourTableau;
}