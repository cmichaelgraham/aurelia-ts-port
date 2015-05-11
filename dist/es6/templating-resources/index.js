export function configure(aurelia) {
    aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './replaceable', './global-behavior', './sanitize-html');
}
export { Compose } from './compose';
export { If } from './if';
export { With } from './with';
export { Repeat } from './repeat';
export { Show } from './show';
export { GlobalBehavior } from './global-behavior';
export { SanitizeHtmlValueConverter } from './sanitize-html';
export { Replaceable } from './replaceable';
