export declare class Token {
    index: any;
    text: any;
    opKey: any;
    key: any;
    value: any;
    constructor(index: any, text: any);
    withOp(op: any): Token;
    withGetterSetter(key: any): Token;
    withValue(value: any): Token;
    toString(): string;
}
export declare class Lexer {
    lex(text: any): any[];
}
export declare class Scanner {
    input: any;
    length: any;
    peek: any;
    index: any;
    constructor(input: any);
    scanToken(): any;
    scanCharacter(start: any, text: any): Token;
    scanOperator(start: any, text: any): Token;
    scanComplexOperator(start: any, code: any, one: any, two: any): Token;
    scanIdentifier(): Token;
    scanNumber(start: any): Token;
    scanString(): Token;
    advance(): void;
    error(message: any, offset?: number): void;
}
