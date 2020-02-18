import { UAParser } from 'ua-parser-js';
import UserAgent from './userAgent';
const parser = new UAParser();

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

const userAgent = new UserAgent(parser);

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
