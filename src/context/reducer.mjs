import { createSlice, configureStore } from '@reduxjs/toolkit';

const itemsCart = createSlice({
    name: 'counter',
    initialState: {},
    reducers: {
        add: (state, data) => {
            let [item_id, currentState, cost] = data["payload"];
            if (!Object.keys(currentState).includes(item_id.toString())){
                currentState[item_id] = {"price": cost, "count": 1};
                return {...currentState};
            }
            else {
                currentState[item_id] = {...currentState[item_id], "count": currentState[item_id]["count"] + 1};
                return {...currentState};
            }
        },
        remove: (state, data) => {
            let [item_id, currentState] = data["payload"];
            let upd = {...currentState};
            upd[item_id] = {...upd[item_id], "count": upd[item_id]["count"] - 1};
            return {...upd};
        }
    }
});

const { add, remove } = itemsCart.actions;

const store = configureStore({
    reducer: itemsCart.reducer
});

