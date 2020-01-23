import { db } from '../../utils/firebase/base';

const chargeActions = {
  SET_LOADING: {
    type: 'SET_LOADING',
    defaultAction: (state, payload) => {
      console.log('SET_LOADING');

      return { ...state, loading: payload };
    }
  },

  get_charges_lists_from_db: {
    type: 'get_charges_lists_from_db',

    getChargesListCollectionRef: email => {
      return db
        .collection('chargesLists')
        .where('email', '==', email)
        .orderBy('name', 'desc')
        .get();
    }
  },

  SET_CHARGES_LISTS: {
    type: 'SET_CHARGES_LISTS',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGES_LISTS');
      return { ...state, chargesLists: payload };
    }
  },

  SET_CHARGES_LIST: {
    type: 'SET_CHARGES_LIST',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGES_LIST');
      return { ...state, chargesList: { ...state.chargesList, ...payload } };
    }
  },

  RESET_CHARGES_LIST: {
    type: 'RESET_CHARGES_LIST',

    defaultAction: state => {
      console.log('RESET_CHARGES_LIST');
      return { ...state, chargesList: {} };
    }
  },

  ADD_CHARGE: {
    type: 'ADD_CHARGE',

    defaultAction: (state, payload) => {
      console.log('ADD_CHARGE');
      return {
        ...state,
        chargesList: {
          ...state.chargesList,
          chargesList: [...state.chargesList.chargesList, payload]
        }
      };
    }
  },
  DELETE_CHARGE: {
    type: 'DELETE_CHARGE',

    defaultAction: (state, payload) => {
      console.log('DELETE_CHARGE');
      return {
        ...state,
        chargesList: {
          ...state.chargesList,
          chargesList: state.chargesList.chargesList.filter(charge => {
            return charge.chargeId !== payload;
          })
        }
      };
    }
  },
  ADD_TO_TOTALS: {
    type: 'ADD_TO_TOTALS',

    defaultAction: (state, payload) => {
      console.log('ADD_TO_TOTALS');

      return {
        ...state,
        chargesList: {
          ...state.chargesList,
          totals: {
            total: state.chargesList.totals.total + payload.totalToAdd,
            refund: state.chargesList.totals.refund + payload.refundToAdd
            // total: chargeActions.setDecimal(
            //   state.chargesList.totals.total + payload.totalToAdd,
            //   2
            // ),
            // refund: chargeActions.setDecimal(
            //   state.chargesList.totals.refund + payload.refundToAdd,
            //   2
            // )
          }
        }
      };
    }
  },

  SET_SELECTED_CHARGE: {
    type: 'SET_SELECTED_CHARGE',

    defaultAction: (state, payload) => {
      console.log('SET_SELECTED_CHARGE');

      return {
        ...state,
        charge: payload
      };
    }
  },

  SET_CHARGE: {
    type: 'SET_CHARGE',

    defaultAction: (state, payload) => {
      console.log('SET_CHARGE');

      const newChargesList = state.chargesList.chargesList.map(charge => {
        if (charge.chargeId === payload.chargeId) {
          return payload;
        } else {
          return charge;
        }
      });

      return {
        ...state,
        chargesList: {
          ...state.chargesList,

          chargesList: [...newChargesList]
        }
      };
    }
  },

  numOr0: shouldBeNum => {
    // return a number or zero

    if (
      shouldBeNum === '' ||
      shouldBeNum === 0 ||
      shouldBeNum === null ||
      shouldBeNum === undefined ||
      (typeof shouldBeNum === 'number' && shouldBeNum * 0 !== 0) // NaN
    ) {
      return 0;
    }

    if (shouldBeNum * 0 === 0) {
      // is number or string number
      return parseFloat(shouldBeNum);
    }

    return 0; // just in case
  },

  setDecimal: (num, decimalNb) => {
    let coef = 1;
    for (let i = 0; i < decimalNb; i++) {
      coef *= 10;
    }
    return Math.round(num * coef) / coef;
  },

  twoDecimals: num => Math.round(num * 100) / 100,

  SET_IMAGES_TO_CURRENT_CHARGE: {
    type: 'SET_IMAGES_TO_CURRENT_CHARGE',

    defaultAction: (state, payload) => {
      console.log('SET_IMAGES_TO_CURRENT_CHARGE');

      return {
        ...state,
        charge: {
          ...state.charge,
          images: { ...payload }
        }
      };
    }
  }
};

export default chargeActions;
