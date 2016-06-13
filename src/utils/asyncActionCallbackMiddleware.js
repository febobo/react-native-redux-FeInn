export default function asyncActionCallbackMiddleware() {
	return next => action => {
    console.log(action,222)
		const { meta = {}, error, payload } = action;
		const { sequence = {}, resolved, rejected } = meta;
    console.log(sequence,333,next)
		if (sequence.type !== 'next') return next(action);
console.log(sequence,2222)

		// do callback
		error ? (rejected && rejected(payload)) : (resolved && resolved(payload));
    console.log(sequence,2222)

		next(action);
	}
}
