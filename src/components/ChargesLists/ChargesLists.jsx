import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../reducers/useUser';
import { db } from '../../utils/firebase/base';

import {
  useCharge,
  SET_INITIAL_CHARGES_LIST,
  ADD_CHARGES_LIST,
  REMOVE_CHARGES_LIST
} from '../../reducers/useCharge';

import './ChargesLists.scss';

const ChargesLists = () => {
  const { chargeStore, chargeDispatch } = useCharge();

  const { userStore } = useUser();
  const email = userStore.currentUser;

  useEffect(() => {
    if (!chargeStore.length) {
      const initialList = {}; // initialState for useCharge reducer

      db.collection('chargesLists')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const email = doc.data().email;

            initialList[doc.id] = {
              email,
              name: doc.data().name
            };
          });

          chargeDispatch({
            type: SET_INITIAL_CHARGES_LIST,
            payload: initialList
          });
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleAddList = event => {
    event.preventDefault();

    const name = document.querySelector('[name=name]').value;

    db.collection('chargesLists')
      .add({ email, name })
      .then(function(docRef) {
        chargeDispatch({
          type: ADD_CHARGES_LIST,
          payload: {
            id: docRef.id,
            email,
            name
          }
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  const handleRemoveList = id => {
    db.collection('chargesLists')
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
        chargeDispatch({
          type: REMOVE_CHARGES_LIST,
          payload: id
        });
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  const lis = [];

  Object.keys(chargeStore).forEach(id => {
    lis.push({ id, chargeList: chargeStore[id] });
  });

  return (
    <div>
      <p>{JSON.stringify(chargeStore)}</p>
      <form onSubmit={handleAddList}>
        <input name='name' type='text' />
        <button>ADD</button>
      </form>

      <ul className='charges-lists'>
        {lis.map(item => (
          <li key={item.id}>
            <p>email: {item.chargeList.email}</p>
            <p>name: {item.chargeList.name}</p>

            <Link to={`/charge-list2/${item.id}`}>nouveau lien ${item.id}</Link>

            <a href={`/charge-list/${item.id}`}>{`/charge-list/${item.id}`}</a>

            <button onClick={() => handleRemoveList(item.id)}>DEL</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargesLists;
