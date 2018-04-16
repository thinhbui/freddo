import { GET_MENU, ITEM_HAS_ERROR } from '../ultils/constants/actionType';

export default (state = [], action) => {
    switch (action.type) {
        case ITEM_HAS_ERROR: {
            return state || undefined;
        }
        case GET_MENU: {
            // console.log(state);
            return action.payload;
        }
        default:
            return state;
    }
};
