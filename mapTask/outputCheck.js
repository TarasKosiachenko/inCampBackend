function check(arr) {

  let uniqueCategory = new Set(arr.map(item => item.category)) // { 'clothes', 'shoes' }

  let arrMap = new Map();

  for ( elCategory of uniqueCategory) {
    arr.map( objPerson => {
      console.log(arrMap.set(elCategory, objPerson));
    })
    // visitsCountMap.set(elCategory, 123);
    // console.log(elCategory);

  }



  //let uniqueCategory = new Set(arr.map(item => item.category)) // { 'clothes', 'shoes' }

  // for ( elCategory of uniqueCategory) {
  //   console.log(elCategory);

  //   let sum = 0

  //   arr.map( elObj => {
  //     if(elObj.category === elCategory){
  //       console.log(`${elObj.name} : ${elObj.price}`);
  //       sum += elObj.price
  //     }
  //   })

  //   console.log(`sum: ${sum}`);
  //   console.log('');
  // }

}

check([
  {
    name: 'tshot',
    category: 'clothes',
    price: 15,
  },
  {
    name: 'sweatshirt',
    category: 'clothes',
    price: 20,
  },
  {
    name: 'nike',
    category: 'shoes',
    price: 37,
  },
  {
    name: 'adidas',
    category: 'shoes',
    price: 37,
  }
])

//  clothes
//  tshot : 15
//  sweatshirt : 20
//  sum : 35
//

