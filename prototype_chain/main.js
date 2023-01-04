  let input = document.querySelector('.input');
  let btn = document.querySelector('.btn');
  let container = document.querySelector('.container');
  let list  = document.createElement('ol') ;
  container.append('list');

  btn.addEventListener('click', ()=> {

    if(window[input.value] !== undefined){
      input.classList.remove('is-invalid');
      getPrototypesChain(window[input.value].prototype);

    }else{
      input.classList.add('is-invalid');
    }
  })

  function getPrototypesChain(obj) {
    let proto = Object.getPrototypeOf(obj);
    console.log(proto.constructor.name)
    let protoli = document.createElement('li');
    protoli.classList.add('dropdown' , 'mt-4');
    list.append(protoli);
    let dropbtn = document.createElement('button');
    dropbtn.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
    dropbtn.setAttribute('data-bs-toggle', 'dropdown');
    dropbtn.setAttribute('aria-expanded', 'false')
    dropbtn.innerText = proto.constructor.name;
    protoli.append(dropbtn);
    let keylist = document.createElement('ol');
    keylist.classList.add('dropdown-menu');
    protoli.append(keylist);
    for (let key in proto) {
      let prop = document.createElement('li');
      prop.classList.add('dropdown-item');
      prop.innerText = `${key} - ${typeof globalThis[key]}`;
      keylist.append(prop);
    }
    protoli.append(keylist);
    if(proto){
      getPrototypesChain(proto)
    }
}


