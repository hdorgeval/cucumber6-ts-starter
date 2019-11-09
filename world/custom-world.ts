import { cliArgs, CliArgs } from './command-line-args';
import { Logger, getLogger } from '../loggers';
import { setWorldConstructor } from 'cucumber';
import { Stream } from 'stream';

export type MediaType = 'text/plain' | 'image/png' | 'application/json';
export type AttachBuffer = (data: Buffer, mediaType: MediaType) => void;
export type AttachStream = (data: Stream, mediaType: MediaType) => void;
export type AttachText = (data: string) => void;
export type AttachStringifiedJson = (data: string, mediaType: 'application/json') => void;
export type AttachBase64EncodedPng = (data: string, mediaType: 'image/png') => void;
export type AttachFn =
  | AttachBuffer
  | AttachStream
  | AttachBase64EncodedPng
  | AttachStringifiedJson
  | AttachText;

export interface CucumberWorldConstructorParams {
  attach: AttachFn;
  parameters: { [key: string]: string };
}

export class CustomWorld {
  public attach: AttachFn;
  public cliArgs: CliArgs;
  public logger: Logger;

  /**
   *
   */
  constructor({ attach }: CucumberWorldConstructorParams) {
    this.attach = attach;
    this.cliArgs = cliArgs;
    this.logger = getLogger('@noOpLogger');
  }
}

setWorldConstructor(CustomWorld);
