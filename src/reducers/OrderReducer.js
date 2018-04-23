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
    // console.log(action);
    switch (action.type) {
        case types.ADD_NEW_ITEM_ORDER: {
            console.log(action);
            const filter = state.listItems.filter(item => item.code === action.payload.code);
            if (filter.length !== 0) {
                const index = state.listItems.findIndex(item => item.code === action.payload.code);
                state.listItems.splice(index, 1);
                console.log(state.listItems);
            }
            return {
                ...state,
                user: action.payload.user,
                billdate: '',
                listItems: [
                    ...state.listItems,
                    action.payload
                ]
            };
        }
        case types.UPDATE_ORDER: {
            return {
                ...state,
                listItems: [

                ],
                amount: 0,
                discount: 0,
                custpaid: 0,
                payback: 0,
            };
        }
        case types.GET_ORDER_ID: {
            return state;
        }
        default:
            return state;
    }
};
