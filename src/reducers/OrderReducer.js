import types from '../ultils/constants/actionType';

const initialState = {
    user: '',
    billdate: '',
    listItems: [],
    amount: 0,
    discount: 0,
    custpaid: 0,
    payback: 0,
    tableid: '',
    status: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NEW_ITEM_ORDER: {
            const filter = state.listItems.filter(item => item.code === action.payload.code);
            if (filter.length !== 0) {
                const index = state.listItems.findIndex(item => item.code === action.payload.code);
                state.listItems.splice(index, 1, action.payload);
            } else state.listItems.push(action.payload);

            let amount = 0;
            state.listItems.map(item => (amount += item.price * item.quantity));
            console.log(state);

            return {
                ...state,
                amount,
                user: action.payload.user,
                billdate: '',
            };
        }
        case types.DELETE_ORDER_ITEM: {
            state.listItems.splice(action.payload, 1);
            let amount = 0;
            state.listItems.map(item => (amount += item.price * item.quantity));
            return {
                ...state,
                amount
            };
        }
        case types.CHANGE_ORDER_QUANTITY: {
            const index = state.listItems.findIndex((item) => item.code === action.payload.code);
            state.listItems.splice(index, 1, action.payload);
            let amount = 0;
            state.listItems.map(item => (amount += item.price * item.quantity));
            state.amount = amount;
            console.log(state);

            return state;
        }
        case types.ADD_NEW_ORDER: { return action.payload; }
        case types.UPDATE_ORDER: { return action.payload; }
        case types.RESET_ORDER: { return initialState; }
        case types.GET_ORDER: { return action.payload; }
        default: return state;
    }
};
