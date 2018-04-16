import { ITEM_HAS_ERROR, GET_TABLE } from '../ultils/constants/actionType';

export default (state = [], action) => {
    switch (action.type) {
        case ITEM_HAS_ERROR: {
            return state || undefined;
        }
        case GET_TABLE: {
            // console.log(state);
            return [...action.payload];
        }
        default:
            return state;
    }
};
