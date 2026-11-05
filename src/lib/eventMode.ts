// Event mode: the advisor is physically next to the visitor.
// TEMPORARY: it is the default. Use ?modo=normal to see the regular app.
export const IS_EVENT_MODE = new URLSearchParams(window.location.search).get('modo') !== 'normal';
