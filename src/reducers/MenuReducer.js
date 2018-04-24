import types from '../ultils/constants/actionType';


export default (state = [], action) => {
    switch (action.type) {
        case types.ITEM_HAS_ERROR: {
            return state || undefined;
        }
        case types.GET_MENU: {
            // console.log(state);
            return [action.payload];
        }
        default:
            return state;
    }
};
