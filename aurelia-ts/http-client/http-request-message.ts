import {Headers} from './headers';
import {RequestMessageProcessor} from './request-message-processor';
import {
  timeoutTransformer,
  credentialsTransformer,
  progressTransformer,
  responseTypeTransformer,
  headerTransformer,
  contentTransformer
} from './transformers';

export class HttpRequestMessage {
  public method;
  public uri;
  public content;
  public headers;
  public responseType;
  constructor(method?, uri?, content?, headers?){
    this.method = method;
    this.uri = uri;
    this.content = content;
    this.headers = headers || new Headers();
    this.responseType = 'json'; //text, arraybuffer, blob, document
  }
}

export function createHttpRequestMessageProcessor(){
  return new RequestMessageProcessor(XMLHttpRequest, [
    timeoutTransformer,
    credentialsTransformer,
    progressTransformer,
    responseTypeTransformer,
    headerTransformer,
    contentTransformer
  ]);
}
