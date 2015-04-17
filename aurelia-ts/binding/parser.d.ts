import { AccessScope, LiteralObject } from './ast';
export declare class Parser {
    cache: any;
    lexer: any;
    constructor();
    parse(input: any): any;
}
export declare class ParserImplementation {
    index: any;
    input: any;
    tokens: any;
    constructor(lexer: any, input: any);
    peek: any;
    parseChain(): any;
    parseValueConverter(): any;
    parseExpression(): any;
    parseConditional(): any;
    parseLogicalOr(): any;
    parseLogicalAnd(): any;
    parseEquality(): any;
    parseRelational(): any;
    parseAdditive(): any;
    parseMultiplicative(): any;
    parsePrefix(): any;
    parseAccessOrCallMember(): any;
    parsePrimary(): any;
    parseAccessOrCallScope(): AccessScope;
    parseObject(): LiteralObject;
    parseExpressionList(terminator: any): any[];
    optional(text: any): boolean;
    expect(text: any): void;
    advance(): void;
    error(message: any): void;
}
