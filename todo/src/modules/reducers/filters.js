const BASE_FILTER = 'all';
const CHANGE_FILTER = 'CHANGE_FILTER';

export const changeFilter = activeFilter => ({
    type: CHANGE_FILTER,
    activeFilter
})

const filter = (state = BASE_FILTER, {type, activeFilter}) =>{
    switch (type){
        case CHANGE_FILTER: return activeFilter;
            
        default: return state;
    }
}

export default filter;