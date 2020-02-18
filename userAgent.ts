import { UAParser } from "ua-parser-js";

const reduceToLowerCase: <T>(o: T) => T = (o: any) =>
Object.keys(o).reduce((sum: any, k: string) => {
  const val = o[k];
  sum[k] = val ? val.toLocaleLowerCase() : val;
  return sum;
}, {});

export default class UserAgent {
  private uaParser: UAParser;
  constructor(uaParser: UAParser) {
    this.uaParser = uaParser;
  }

  public device = reduceToLowerCase(this.uaParser.getDevice());

  public broswer = reduceToLowerCase(this.uaParser.getBrowser());

  public os = reduceToLowerCase(this.uaParser.getOS());

  public get isApp(): boolean {
    return this.isIos || this.isAndroid;
  }

  public get isKiosk(): boolean {
    return ['mac os', 'windows'].includes(this.os.name!);
  }

  public get isIos(): boolean {
    return this.os.name === 'ios';
  }

  public get isAndroid(): boolean {
    return this.os.name === 'android';
  }

  public get isMobile(): boolean {
    return this.device.type === 'mobile';
  }

  public get isTablet(): boolean {
    const isIpad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return this.device.type === 'tablet' || isIpad;
  }

  public get isIphone(): boolean {
    return this.device.model === 'iphone';
  }

  public get isIpad(): boolean {
    return this.device.model === 'ipad';
  }
}
