export declare class Compose {
    container: any;
    compositionEngine: any;
    viewSlot: any;
    viewResources: any;
    executionContext: any;
    currentViewModel: any;
    view: any;
    viewModel: any;
    model: any;
    constructor(container: any, compositionEngine: any, viewSlot: any, viewResources: any);
    bind(executionContext: any): void;
    modelChanged(newValue: any, oldValue: any): void;
    viewChanged(newValue: any, oldValue: any): void;
    viewModelChanged(newValue: any, oldValue: any): void;
}
