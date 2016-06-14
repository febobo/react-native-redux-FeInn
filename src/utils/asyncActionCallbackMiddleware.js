export default function asyncActionCallbackMiddleware() {
	return next => action => {
    console.log(action,222)
		const { meta = {}, error, payload } = action;
		const { sequence = {}, resolved, rejected } = meta;
		// if (sequence.type !== 'next') return next(action);
		// do callback
		error ? (rejected && rejected(payload)) : (resolved && resolved(payload));

		next(action);
	}
}
