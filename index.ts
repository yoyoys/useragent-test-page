import { UAParser } from 'ua-parser-js';
const uaPaser = new UAParser();

const uaDom = document.querySelector('.ua');

const makeDom = (tag: string, inner: HTMLElement|HTMLElement[]|string, innerText?: string) => {
  const dom = document.createElement(tag)
  if(innerText) {
    dom.innerText = innerText;
  }
  const child = typeof inner === 'string' ? document.createTextNode(inner) : inner;

  const children = Array.isArray(child) ? child :[child]
  
  dom.append(...children);
  
  return dom;
}

const reduceToLowerCase: <T>(o: T) => T = (o: any) =>
  Object.keys(o).reduce((sum: any, k: string) => {
    const val = o[k];
    sum[k] = val ? val.toLocaleLowerCase() : val;
    return sum;
  }, {});


export class UserAgent {
  public device = reduceToLowerCase(uaPaser.getDevice());

  public broswer = reduceToLowerCase(uaPaser.getBrowser());

  public os = reduceToLowerCase(uaPaser.getOS());

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

const userAgent = new UserAgent();

const devicesDom = () => {
  const pairs = Object.entries(userAgent.device)
  return pairs.map(o => makeDom('li', `${o[0]}: ${o[1]}`))
}
const osDom = () => {
  const pairs = Object.entries(userAgent.os)
  return pairs.map(o => makeDom('li', `${o[0]}: ${o[1]}`))
}

uaDom.innerHTML = '';
uaDom.appendChild(makeDom('li',`navigator.platform: ${navigator.platform}` ));
uaDom.appendChild(makeDom('li',`navigator.userAgent: ${navigator.userAgent}` ));
uaDom.appendChild(makeDom('li',`navigator.maxTouchPoints: ${navigator.maxTouchPoints}` ));

uaDom.appendChild(makeDom('li',`userAgent.isKiosk: ${userAgent.isKiosk}`));
uaDom.appendChild(makeDom('li',`userAgent.isTablet: ${userAgent.isTablet}`));
uaDom.appendChild(makeDom('li',`userAgent.isIpad: ${userAgent.isIpad}`));
uaDom.appendChild(makeDom('li',`userAgent.isApp: ${userAgent.isApp}`));
uaDom.appendChild(makeDom('li',`userAgent.isIos: ${userAgent.isIos}`));
uaDom.appendChild(makeDom('li',`userAgent.isMobile: ${userAgent.isMobile}`));

uaDom.appendChild(makeDom('li', makeDom('ul', devicesDom()), 'userAgent.device'));
uaDom.appendChild(makeDom('li', makeDom('ul', osDom()), 'userAgent.os'));
