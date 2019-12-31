import React, { useState, useEffect } from 'react';

import { db } from '../../utils/firebase/base';

const ChargeList = () => {
  const [chargeList, setChargeList] = useState(null);

  useEffect(() => {
    let listId = window.location.href.split('/');
    listId = listId[listId.length - 1]; // list id from url

    db.doc(`/chargesLists/${listId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          setChargeList(doc.data());
        }
      });
  }, []);

  return (
    <div>
      <div>{JSON.stringify(chargeList)}</div>

      <h1>ChargeList2 {chargeList && chargeList.name}</h1>
    </div>
  );
};

export default ChargeList;
