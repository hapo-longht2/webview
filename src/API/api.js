import firebase from 'react-native-firebase';

export const apiSearch = 'https://www.google.com/search?q=';

export const addNameCart = name => {
  console.log('TCL: addNameCart', name);
  firebase
    .firestore()
    .collection('name_car')
    .add({
      name: name,
    })
    .then(res => {
      console.log('TCL: addNameCart -> res', res);
    })
    .catch(err => {
      console.log('TCL: addNameCart -> err', err);
    });
};

export const getName = () => {
  return firebase
    .firestore()
    .collection('name_car')
    .get();
};

export const updateName = (id, params) => {
  return firebase
    .firestore()
    .collection('name_car')
    .doc(id)
    .update(params);
};

export const deleteName = id => {
  return firebase
    .firestore()
    .collection('name_car')
    .doc(id)
    .delete();
};

export async function getCart() {
  var carList = [];
  var snapshot = await firebase
    .firestore()
    .collection('name_car')
    .orderBy()
    .get();

  snapshot.forEach(doc => {
    const carItem = doc.data();
    carItem.id = doc.id;
    carList.push(carItem);
  });

  console.log('carList', carList);
  return carList;
}
