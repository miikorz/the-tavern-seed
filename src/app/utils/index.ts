export const immutableState = (...sources) => {
    return Object.assign.apply(Object, [{}].concat(sources));
};
