export default function logger(reducer) {
    return ( prevState, action, args ) => {
        console.group(action)
        console.log('prev State:', prevState)
        console.group('Acction State: ', args)
        const nextState = reducer(prevState, action, args);
        console.log('Next State: ',nextState)
        console.groupEnd()
        return nextState
    }
}