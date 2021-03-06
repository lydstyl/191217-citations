import React, { useEffect } from 'react';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import txt from './translations';

import { db } from '../../utils/firebase/base';

import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';
import chargeActions from '../../context/useCharge2/chargeActions';

import Spinner from '../Spinner/Spinner';

import ChargeForm from '../ChargeForm/ChargeForm';
import ChargesList from '../ChargesList/ChargesList';

import StyledChargeList from './StyledChargeList';

const ChargesListBox = props => {
  const { settingsStore } = useSettingsCtx();
  const { lang } = settingsStore;
  const {
    userStore: { currentUser }
  } = useUser();
  const { chargeStore, chargeDispatch } = useChargeCtx();
  const { name, totals, email } = chargeStore.chargesList;

  useEffect(() => {
    const chargesListId = props.location.pathname.split('/')[2];

    chargeDispatch({
      type: chargeActions.SET_LOADING.type,
      payload: true
    });

    db.collection(`chargesLists`)
      .doc(chargesListId)
      .get()
      .then(res => {
        // SET chargesList
        chargeDispatch({
          type: chargeActions.SET_CHARGES_LIST.type,
          payload: res.data()
        });
        db.collection(`/chargesLists/${chargesListId}/charges`)
          .orderBy('date')

          .get()
          .then(querySnapshot => {
            const chargesList = [];

            const totals = { total: 0, refund: 0 };

            querySnapshot.forEach(doc => {
              const docData = doc.data();

              docData.total = chargeActions.numOr0(docData.total);
              docData.percent = chargeActions.numOr0(docData.percent);
              docData.refund = chargeActions.numOr0(docData.refund);

              totals.total = totals.total + docData.total;
              totals.refund = totals.refund + docData.refund;

              chargesList.push({ chargeId: doc.id, ...docData });
            });

            const data = { chargesListId, totals, chargesList };

            // SET chargesList.chargesList
            chargeDispatch({
              type: chargeActions.SET_CHARGES_LIST.type,
              payload: data
            });

            chargeDispatch({
              type: chargeActions.SET_LOADING.type,
              payload: false
            });
          });
      });

    // eslint-disable-next-line
  }, []);

  return (
    <StyledChargeList>
      {chargeStore.loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{name}</h1>

          {totals && (
            <p>
              {txt.totalSpent[lang]}:{' '}
              {chargeActions.setDecimal(totals.total, 2)}
            </p>
          )}

          {totals && (
            <p>
              {txt.askedRefund[lang]}:{' '}
              {chargeActions.setDecimal(totals.refund, 2)}
            </p>
          )}

          {currentUser === email && <ChargeForm />}

          <ChargesList />
        </>
      )}
    </StyledChargeList>
  );
};

export default ChargesListBox;
