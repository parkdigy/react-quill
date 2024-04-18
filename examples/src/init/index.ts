declare global {
  type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;
  type PartialOmit<T, K extends keyof T> = Partial<Omit<T, K>>;
  //--------------------------------------------------------------------------------------------------------------------
  function ll(message?: any, ...optionalParams: any[]): void;
  function empty(v: any): boolean;
  function notEmpty(v: any): boolean;
  function lv<T extends Record<'label', T['label']> & Record<'value', T['value']>>(
    label: T['label'],
    value: T['value'],
    other?: { [K in keyof Omit<T, 'label' | 'value'>]: T[K] }
  ): {
    [K in keyof T]: T[K];
  };
  function getName(prefix: string, resetSeq?: boolean): string;

  // eslint-disable-next-line no-var
  var isEnvDevelopment: boolean;
  // eslint-disable-next-line no-var
  var isEnvProduction: boolean;
}

globalThis.ll = function (message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams);
};

globalThis.empty = function (v: any) {
  let result = false;
  if (v == null) {
    result = true;
  } else if (typeof v === 'string') {
    result = v === '';
  } else if (typeof v === 'object') {
    if (Array.isArray(v)) {
      result = v.length === 0;
    } else if (!(v instanceof Date)) {
      result = Object.entries(v).length === 0;
    }
  }
  return result;
};

globalThis.notEmpty = function (v: any) {
  return !empty(v);
};

globalThis.lv = <T extends Record<'label', T['label']> & Record<'value', T['value']>>(
  label: T['label'],
  value: T['value'],
  other?: { [K in keyof Omit<T, 'label' | 'value'>]: T[K] }
): {
  [K in keyof T]: T[K];
} => {
  return { label, value, ...other } as { [K in keyof T]: T[K] };
};

let nameSeq = 0;
globalThis.getName = (prefix: string, resetSeq?: boolean): string => {
  if (resetSeq) {
    nameSeq = 0;
  }
  nameSeq += 1;
  return `${prefix}_${nameSeq}`;
};

globalThis.isEnvDevelopment = (window as any).$$AppConfig.env === 'development';
globalThis.isEnvProduction = (window as any).$$AppConfig.env === 'production';

export {};
