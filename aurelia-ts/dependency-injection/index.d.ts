export { Registration, TransientRegistration, SingletonRegistration, Resolver, Lazy, All, Optional, Parent, InstanceActivator, FactoryActivator } from './metadata';
export { Container } from './container';
export declare function inject(...rest: any[]): (target: any) => void;
export declare function transient(key: any): (target: any) => void;
export declare function singleton(keyOrRegisterInChild: any, registerInChild?: boolean): (target: any) => void;
export declare function factory(target: any): void;
