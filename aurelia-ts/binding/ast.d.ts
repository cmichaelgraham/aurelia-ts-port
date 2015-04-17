export declare class Expression {
    isChain: any;
    isAssignable: any;
    constructor();
    evaluate(): void;
    assign(): void;
    toString(): string;
}
export declare class Chain extends Expression {
    expressions: any;
    constructor(expressions: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(visitor: any): void;
}
export declare class ValueConverter extends Expression {
    expression: any;
    name: any;
    args: any;
    allArgs: any;
    constructor(expression: any, name: any, args: any, allArgs: any);
    evaluate(scope?: any, valueConverters?: any): any;
    assign(scope?: any, value?: any, valueConverters?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class Assign extends Expression {
    target: any;
    value: any;
    constructor(target: any, value: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(vistor: any): void;
    connect(binding: any, scope: any): {
        value: any;
    };
}
export declare class Conditional extends Expression {
    condition: any;
    yes: any;
    no: any;
    constructor(condition: any, yes: any, no: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class AccessScope extends Expression {
    name: any;
    isAssignable: any;
    constructor(name: any);
    evaluate(scope?: any, valueConverters?: any): any;
    assign(scope?: any, value?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class AccessMember extends Expression {
    object: any;
    name: any;
    isAssignable: any;
    constructor(object: any, name: any);
    evaluate(scope?: any, valueConverters?: any): any;
    assign(scope?: any, value?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class AccessKeyed extends Expression {
    object: any;
    key: any;
    isAssignable: any;
    constructor(object: any, key: any);
    evaluate(scope?: any, valueConverters?: any): any;
    assign(scope?: any, value?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class CallScope extends Expression {
    name: any;
    args: any;
    constructor(name: any, args: any);
    evaluate(scope?: any, valueConverters?: any, args?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class CallMember extends Expression {
    object: any;
    name: any;
    args: any;
    constructor(object: any, name: any, args: any);
    evaluate(scope?: any, valueConverters?: any, args?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class CallFunction extends Expression {
    func: any;
    args: any;
    constructor(func: any, args: any);
    evaluate(scope?: any, valueConverters?: any, args?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class Binary extends Expression {
    operation: any;
    left: any;
    right: any;
    constructor(operation: any, left: any, right: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
        observer: any;
    };
}
export declare class PrefixNot extends Expression {
    operation: any;
    expression: any;
    constructor(operation: any, expression: any);
    evaluate(scope?: any, valueConverters?: any): boolean;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: boolean;
        observer: any;
    };
}
export declare class LiteralPrimitive extends Expression {
    value: any;
    constructor(value: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
    };
}
export declare class LiteralString extends Expression {
    value: any;
    constructor(value: any);
    evaluate(scope?: any, valueConverters?: any): any;
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any;
    };
}
export declare class LiteralArray extends Expression {
    elements: any;
    constructor(elements: any);
    evaluate(scope?: any, valueConverters?: any): any[];
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: any[];
        observer: any;
    };
}
export declare class LiteralObject extends Expression {
    keys: any;
    values: any;
    constructor(keys: any, values: any);
    evaluate(scope?: any, valueConverters?: any): {};
    accept(visitor: any): void;
    connect(binding: any, scope: any): {
        value: {};
        observer: any;
    };
}
export declare class Unparser {
    buffer: any;
    constructor(buffer: any);
    static unparse(expression: any): string;
    write(text: any): void;
    writeArgs(args: any): void;
    visitChain(chain: any): void;
    visitValueConverter(converter: any): void;
    visitAssign(assign: any): void;
    visitConditional(conditional: any): void;
    visitAccessScope(access: any): void;
    visitAccessMember(access: any): void;
    visitAccessKeyed(access: any): void;
    visitCallScope(call: any): void;
    visitCallFunction(call: any): void;
    visitCallMember(call: any): void;
    visitPrefix(prefix: any): void;
    visitBinary(binary: any): void;
    visitLiteralPrimitive(literal: any): void;
    visitLiteralArray(literal: any): void;
    visitLiteralObject(literal: any): void;
    visitLiteralString(literal: any): void;
}
