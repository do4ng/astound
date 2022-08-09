export interface Plugin {
  name: string;

  transform?(
    id: string,
    code: string,
    transformed: { html: string; js: string }
  ): Promise<TransformOutput | void> | TransformOutput | void;

  addScript?(): string;
}

export interface TransformOutput {
  type: 'html' | 'js';
  code: string;
}
