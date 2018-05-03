import types from '../ultils/constants/actionType';

export default (state = [], action) => {
    switch (action.type) {
        case types.ITEM_HAS_ERROR: {
            return state || undefined;
        }
        case types.UPDATE_TABLE: {
            const table = state.filter(item => item.id === action.payload.id);
            state.splice(state.findIndex(table), 1);
            return [...state, action.payload];
        }
        case types.GET_TABLE: {
            // console.log('GET_TABLE', [...action.payload]);
            return [...action.payload];
        }
        default:
            return state;
    }
};
