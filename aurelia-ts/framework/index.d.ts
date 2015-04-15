/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
export { Aurelia } from './aurelia';
export * from '../dependency-injection/index';
export * from '../binding/index';
export * from '../metadata/index';
export * from '../templating/index';
export * from '../loader/index';
export * from '../task-queue/index';
import * as TheLogManager from '../logging/index';
export declare var LogManager: typeof TheLogManager;
