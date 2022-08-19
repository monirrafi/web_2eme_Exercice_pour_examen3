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
    document.getElementById('contenu').innerHTML = lister(listeCommandes);

}
let changerTotal = () => {
    let selTotal = document.getElementById('selTotal');
    let choix = listeTotal[selTotal.options.selectedIndex];
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
    document.getElementById('contenu').innerHTML = lister(listeCommandes);
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
    document.getElementById('contenu').innerHTML = lister(listerUnChoix('Product',choix),'P');

}
let changerClient = () => {
    let selClients = document.getElementById('selClients');
    let choix = listeClients[selClients.selectedIndex];
    document.getElementById('contenu').innerHTML = lister(listerUnChoix('Customer',choix),'C');

}

let entete = (cle) => {
    let retourTableau = `
    <table class="table table-primary table-striped table-hover">

    `;
    if(cle == 'P'){
        retourTableau += `
        <thead>
          <tr>
            <th scope="col">Clients</th>
            <th scope="col">Total1</th>
            <th scope="col">Total2</th>
            <th scope="col">Total3</th>
            <th scope="col">Total4</th>
          </tr>
        </thead>
        <tbody>
        `;
    
    }else if(cle == 'C') {
        retourTableau += `
        <thead>
        <tr>
            <th scope="col">Produits</th>
            <th scope="col">Total1</th>
            <th scope="col">Total2</th>
            <th scope="col">Total3</th>
            <th scope="col">Total4</th>
          </tr>
        </thead>
        <tbody>
        `;
    
    }else{
    retourTableau += `
    <thead>
      <tr>
        <th scope="col">Produits</th>
        <th scope="col">Clients</th>
        <th scope="col">Total1</th>
        <th scope="col">Total2</th>
        <th scope="col">Total3</th>
        <th scope="col">Total4</th>
      </tr>
    </thead>
    <tbody>
    `;
    }
    return retourTableau;
}

let lister = (liste,cle) => {
    let retourTableau = entete(cle);
    for(let commande of liste){
        if(cle == 'P'){
            retourTableau +=`
            <tr>
                <th scope="col">${commande.Customer}</th>
            `;
    
        }else if(cle == 'C'){
            retourTableau +=`
            <tr>
                <th scope="col">${commande.Product}</th>
    
            `;
    
        }else{
            retourTableau +=`
            <tr>
                <th scope="col">${commande.Product}</th>
                <th scope="col">${commande.Customer}</th>
    
            `;
    
        }
        if(commande['Qtr 1'] != undefined){
            retourTableau +=`
            <th scope="col">${commande['Qtr 1']}</th>
            `;
        }else{    
            retourTableau +=`
            <th scope="col"></th>
            `;
        }
        if(commande['Qtr 2'] != undefined){
            retourTableau +=`
            <th scope="col">${commande['Qtr 2']}</th>
            `;
        }else{    
            retourTableau +=`
            <th scope="col"></th>
            `;
        }
        if(commande['Qtr 3'] != undefined){
            retourTableau +=`
            <th scope="col">${commande['Qtr 3']}</th>
            `;
        }else{    
            retourTableau +=`
            <th scope="col"></th>
            `;
        }
        if(commande['Qtr 4'] != undefined){
            retourTableau +=`
            <th scope="col">${commande['Qtr 4']}</th>
            `;
        }else{    
            retourTableau +=`
            <th scope="col"></th>
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