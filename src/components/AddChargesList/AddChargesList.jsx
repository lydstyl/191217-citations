import React from 'react';
import { IoMdAdd } from 'react-icons/io';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import { db } from '../../utils/firebase/base';

const AddChargesList = () => {
  const { userStore } = useUser();
  const email = userStore.currentUser;
  const { chargeStore, chargeDispatch } = useChargeCtx();

  const handleCreateChargesList = event => {
    event.preventDefault();

    const name = document.querySelector('[name=chargesListName]').value;

    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    const data = { email, name, defaultPercent: 50 };

    db.collection('chargesLists')
      .add(data)
      .then(docRef => {
        chargeDispatch({
          type: chargeActions.SET_CHARGES_LISTS.type,
          payload: [...chargeStore.chargesLists, { id: docRef.id, ...data }]
        });

        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);

        chargeDispatch({
          type: chargeActions.SET_LOADING.type,
          payload: false
        });
      });
  };

  return (
    <div className='field'>
      <input type='text' name='chargesListName' placeholder='Nom de la liste' />
      <button onClick={handleCreateChargesList}>
        <IoMdAdd />
      </button>
    </div>
  );
};

export default AddChargesList;
