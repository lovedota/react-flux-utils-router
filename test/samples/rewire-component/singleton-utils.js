let count = 1;

export default {
    increase() {
        count += 1;
    },
    
    decrease() {
        count -= 1;
    },
    
    get count() {
        return count;
    } 
};