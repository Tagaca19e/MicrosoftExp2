"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var fs=require("fs"),os=require("os"),stream=require("stream"),util=require("util"),crypto=require("crypto"),events=require("events"),net=require("net"),tls=require("tls");const OPERATORS=new Map([['"','"'],["(",")"],["<",">"],[",",""],[":",";"],[";",""]]);function tokenizeAddress(e=""){var t,s;const r=[];let o,n;for(const i of e.toString())(null!==(t=null===n||void 0===n?void 0:n.length)&&void 0!==t?t:0)>0&&i===n?(r.push({type:"operator",value:i}),o=void 0,n=void 0):0===(null!==(s=null===n||void 0===n?void 0:n.length)&&void 0!==s?s:0)&&OPERATORS.has(i)?(r.push({type:"operator",value:i}),o=void 0,n=OPERATORS.get(i)):null==o?(o={type:"text",value:i},r.push(o)):o.value+=i;return r.map((e=>(e.value=e.value.trim(),e))).filter((e=>e.value.length>0))}function convertAddressTokens(e){const t=[],s=[];let r=[],o=[],n=[],i="text",a=!1;function l(e){if("operator"===e.type)switch(e.value){case"<":i="address";break;case"(":i="comment";break;case":":i="group",a=!0;break;default:i="text"}else if(e.value.length>0)switch(i){case"address":r.push(e.value);break;case"comment":o.push(e.value);break;case"group":s.push(e.value);break;default:n.push(e.value)}}for(const h of e)l(h);if(0===n.length&&o.length>0&&(n=[...o],o=[]),a)t.push({name:0===n.length?void 0:n.join(" "),group:s.length>0?addressparser(s.join(",")):[]});else{if(0===r.length&&n.length>0){for(let e=n.length-1;e>=0;e--)if(n[e].match(/^[^@\s]+@[^@\s]+$/)){r=n.splice(e,1);break}if(0===r.length)for(let e=n.length-1;e>=0&&(n[e]=n[e].replace(/\s*\b[^@\s]+@[^@\s]+\b\s*/,(e=>0===r.length?(r=[e.trim()]," "):e)).trim(),!(r.length>0));e--);}if(0===n.length&&o.length>0&&(n=[...o],o=[]),r.length>1&&(n=[...n,...r.splice(1)]),0===r.length&&a)return[];{let e=r.join(" "),s=0===n.length?e:n.join(" ");e===s&&(e.match(/@/)?s="":e=""),t.push({address:e,name:s})}}return t}function addressparser(e){const t=[];let s=[];for(const r of tokenizeAddress(e))"operator"!==r.type||","!==r.value&&";"!==r.value?s.push(r):(s.length>0&&t.push(...convertAddressTokens(s)),s=[]);return s.length>0&&t.push(...convertAddressTokens(s)),t}function getRFC2822Date(e=new Date,t=!1){if(t)return getRFC2822DateUTC(e);const s=e.toString().replace("GMT","").replace(/\s\(.*\)$/,"").split(" ");s[0]=s[0]+",";const r=s[1];return s[1]=s[2],s[2]=r,s.join(" ")}function getRFC2822DateUTC(e=new Date){const t=e.toUTCString().split(" ");return t.pop(),t.push("+0000"),t.join(" ")}const rfc2822re=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/.compile();function isRFC2822Date(e){return rfc2822re.test(e)}const encoder=new util.TextEncoder,RANGES=[[9],[10],[13],[32,60],[62,126]],LOOKUP="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),MAX_CHUNK_LENGTH=16383,MAX_MIME_WORD_LENGTH=52,MAX_B64_MIME_WORD_BYTE_LENGTH=39;function tripletToBase64(e){return LOOKUP[e>>18&63]+LOOKUP[e>>12&63]+LOOKUP[e>>6&63]+LOOKUP[63&e]}function encodeChunk(e,t,s){let r="";for(let o=t;o<s;o+=3)r+=tripletToBase64((e[o]<<16)+(e[o+1]<<8)+e[o+2]);return r}function encodeBase64(e){const t=e.length,s=t%3;let r="";for(let o=0,n=t-s;o<n;o+=16383)r+=encodeChunk(e,o,o+16383>n?n:o+16383);if(1===s){const s=e[t-1];r+=LOOKUP[s>>2],r+=LOOKUP[s<<4&63],r+="=="}else if(2===s){const s=(e[t-2]<<8)+e[t-1];r+=LOOKUP[s>>10],r+=LOOKUP[s>>4&63],r+=LOOKUP[s<<2&63],r+="="}return r}function splitMimeEncodedString(e,t=12){const s=Math.max(t,12),r=[];for(;e.length;){let t=e.substr(0,s);const o=t.match(/=[0-9A-F]?$/i);o&&(t=t.substr(0,o.index));let n=!1;for(;!n;){let s;n=!0;const r=e.substr(t.length).match(/^=([0-9A-F]{2})/i);r&&(s=parseInt(r[1],16),s<194&&s>127&&(t=t.substr(0,t.length-3),n=!1))}t.length&&r.push(t),e=e.substr(t.length)}return r}function checkRanges(e){return RANGES.reduce(((t,s)=>t||1===s.length&&e===s[0]||2===s.length&&e>=s[0]&&e<=s[1]),!1)}function mimeEncode(e="",t="utf-8"){const s=new util.TextDecoder(t),r="string"===typeof e?encoder.encode(e):encoder.encode(s.decode(e));return r.reduce(((e,t,s)=>checkRanges(t)&&(32!==t&&9!==t||s!==r.length-1&&10!==r[s+1]&&13!==r[s+1])?e+String.fromCharCode(t):`${e}=${t<16?"0":""}${t.toString(16).toUpperCase()}`),"")}function mimeWordEncode(e,t="Q",s="utf-8"){let r=[];const o=new util.TextDecoder(s),n="string"===typeof e?e:o.decode(e);if("Q"===t){const e=mimeEncode(n,s).replace(/[^a-z0-9!*+\-/=]/gi,(e=>" "===e?"_":"="+(e.charCodeAt(0)<16?"0":"")+e.charCodeAt(0).toString(16).toUpperCase()));r=e.length<52?[e]:splitMimeEncodedString(e,52)}else{let e=0,t=0;for(;t<n.length;)encoder.encode(n.substring(e,t)).length>39?(r.push(n.substring(e,t-1)),e=t-1):t++;n.substring(e)&&r.push(n.substring(e)),r=r.map((e=>encoder.encode(e))).map((e=>encodeBase64(e)))}return r.map((e=>`=?UTF-8?${t}?${e}?= `)).join("").trim()}const CRLF$1="\r\n",MIMECHUNK=76,MIME64CHUNK=456,BUFFERSIZE=12768;let counter=0;function generateBoundary(){let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'()+_,-./:=?";for(let s=0;s<69;s++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}function convertPersonToAddress(e){return addressparser(e).map((({name:e,address:t})=>e?`${mimeWordEncode(e).replace(/,/g,"=2C")} <${t}>`:t)).join(", ")}function convertDashDelimitedTextToSnakeCase(e){return e.toLowerCase().replace(/^(.)|-(.)/g,(e=>e.toUpperCase()))}class Message{constructor(e){this.attachments=[],this.header={"message-id":`<${(new Date).getTime()}.${counter++}.${process.pid}@${os.hostname()}>`,date:getRFC2822Date()},this.content="text/plain; charset=utf-8",this.alternative=null;for(const t in e)if(/^content-type$/i.test(t))this.content=e[t];else if("text"===t)this.text=e[t];else if("attachment"===t&&"object"===typeof e[t]){const s=e[t];if(Array.isArray(s))for(let e=0;e<s.length;e++)this.attach(s[e]);else null!=s&&this.attach(s)}else"subject"===t?this.header.subject=mimeWordEncode(e.subject):/^(cc|bcc|to|from)/i.test(t)?this.header[t.toLowerCase()]=convertPersonToAddress(e[t]):this.header[t.toLowerCase()]=e[t]}attach(e){return e.alternative?(this.alternative=e,this.alternative.charset=e.charset||"utf-8",this.alternative.type=e.type||"text/html",this.alternative.inline=!0):this.attachments.push(e),this}valid(e){if("string"!==typeof this.header.from&&!1===Array.isArray(this.header.from))e(!1,"Message must have a `from` header");else if("string"!==typeof this.header.to&&!1===Array.isArray(this.header.to)&&"string"!==typeof this.header.cc&&!1===Array.isArray(this.header.cc)&&"string"!==typeof this.header.bcc&&!1===Array.isArray(this.header.bcc))e(!1,"Message must have at least one `to`, `cc`, or `bcc` header");else if(0===this.attachments.length)e(!0,void 0);else{const t=[];this.attachments.forEach((e=>{e.path?0==fs.existsSync(e.path)&&t.push(`${e.path} does not exist`):e.stream?e.stream.readable||t.push("attachment stream is not readable"):e.data||t.push("attachment has no data associated with it")})),e(0===t.length,t.join(", "))}}stream(){return new MessageStream(this)}read(e){let t="";const s=this.stream();s.on("data",(e=>t+=e)),s.on("end",(s=>e(s,t))),s.on("error",(s=>e(s,t)))}}class MessageStream extends stream.Stream{constructor(e){super(),this.message=e,this.readable=!0,this.paused=!1,this.buffer=Buffer.alloc(12768),this.bufferIndex=0;const t=e=>{if(null!=this.buffer){const s=Buffer.byteLength(e);if(s+this.bufferIndex<this.buffer.length)this.buffer.write(e,this.bufferIndex),this.bufferIndex+=s;else if(s>this.buffer.length){this.bufferIndex&&(this.emit("data",this.buffer.toString("utf-8",0,this.bufferIndex)),this.bufferIndex=0);const t=Math.ceil(e.length/this.buffer.length);let s=0;for(;s<t;)this.emit("data",e.substring(this.buffer.length*s,this.buffer.length*(s+1))),s++}else this.paused?this.once("resume",(()=>t(e))):(this.emit("data",this.buffer.toString("utf-8",0,this.bufferIndex)),this.buffer.write(e,0),this.bufferIndex=s)}},s=(e,s)=>{const r=Math.ceil(e.length/76);let o=0;for(;o<r;)t(e.substring(76*o,76*(o+1))+CRLF$1),o++;s&&s()},r=(e,t)=>{const r=7296,o=Buffer.alloc(r),n=e=>fs.closeSync(e);fs.open(e.path,"r",((i,a)=>{if(i)this.emit("error",i);else{const i=(l,h)=>{if(!l&&this.readable){let l=e&&e.headers&&e.headers["content-transfer-encoding"]||"base64";l="ascii"===l||"7bit"===l?"ascii":"binary"===l||"8bit"===l?"binary":"base64",s(o.toString(l,0,h),(()=>{h==r?fs.read(a,o,0,r,null,i):(this.removeListener("error",n),fs.close(a,t))}))}else this.emit("error",l||{message:"message stream was interrupted somehow!"})};fs.read(a,o,0,r,null,i),this.once("error",n)}}))},o=(e,t)=>{const{stream:r}=e;if(null===r||void 0===r?void 0:r.readable){let e=Buffer.alloc(0);r.resume(),r.on("end",(()=>{s(e.toString("base64"),t),this.removeListener("pause",r.pause),this.removeListener("resume",r.resume),this.removeListener("error",r.resume)})),r.on("data",(t=>{let r=Buffer.isBuffer(t)?t:Buffer.from(t);e.byteLength>0&&(r=Buffer.concat([e,r]));const o=r.length%456;e=Buffer.alloc(o),o>0&&r.copy(e,0,r.length-o),s(r.toString("base64",0,r.length-o))})),this.on("pause",r.pause),this.on("resume",r.resume),this.on("error",r.resume)}else this.emit("error",{message:"stream not readable"})},n=(e,s)=>{const n=e.path?r:e.stream?o:l;(e=>{let s=[];const r={"content-type":e.type+(e.charset?`; charset=${e.charset}`:"")+(e.method?`; method=${e.method}`:""),"content-transfer-encoding":"base64","content-disposition":e.inline?"inline":`attachment; filename="${mimeWordEncode(e.name)}"`};if(null!=e.headers)for(const t in e.headers)r[t.toLowerCase()]=e.headers[t];for(const t in r)s=s.concat([convertDashDelimitedTextToSnakeCase(t),": ",r[t],CRLF$1]);t(s.concat([CRLF$1]).join(""))})(e),n(e,s)},i=(e,s,r,o)=>{r<s.length?(t(`--${e}${CRLF$1}`),s[r].related?c(s[r],(()=>i(e,s,r+1,o))):n(s[r],(()=>i(e,s,r+1,o)))):(t(`${CRLF$1}--${e}--${CRLF$1}${CRLF$1}`),o())},a=()=>{const e=generateBoundary();t(`Content-Type: multipart/mixed; boundary="${e}"${CRLF$1}${CRLF$1}--${e}${CRLF$1}`),null==this.message.alternative?(h(this.message),i(e,this.message.attachments,0,u)):d(this.message,(()=>i(e,this.message.attachments,0,u)))},l=(e,t)=>{var r,o;s(e.encoded?null!==(r=e.data)&&void 0!==r?r:"":Buffer.from(null!==(o=e.data)&&void 0!==o?o:"").toString("base64"),t)},h=e=>{let s=[];s=s.concat(["Content-Type:",e.content,CRLF$1,"Content-Transfer-Encoding: 7bit",CRLF$1]),s=s.concat(["Content-Disposition: inline",CRLF$1,CRLF$1]),s=s.concat([e.text||"",CRLF$1,CRLF$1]),t(s.join(""))},c=(e,s)=>{const r=generateBoundary();t(`Content-Type: multipart/related; boundary="${r}"${CRLF$1}${CRLF$1}--${r}${CRLF$1}`),n(e,(()=>{var o;i(r,null!==(o=e.related)&&void 0!==o?o:[],0,(()=>{t(`${CRLF$1}--${r}--${CRLF$1}${CRLF$1}`),s()}))}))},d=(e,s)=>{const r=generateBoundary();t(`Content-Type: multipart/alternative; boundary="${r}"${CRLF$1}${CRLF$1}--${r}${CRLF$1}`),h(e),t(`--${r}${CRLF$1}`);const o=()=>{t([CRLF$1,"--",r,"--",CRLF$1,CRLF$1].join("")),s()};e.alternative.related?c(e.alternative,o):n(e.alternative,o)},u=e=>{var t,s;e?this.emit("error",e):(this.emit("data",null!==(s=null===(t=this.buffer)||void 0===t?void 0:t.toString("utf-8",0,this.bufferIndex))&&void 0!==s?s:""),this.emit("end")),this.buffer=null,this.bufferIndex=0,this.readable=!1,this.removeAllListeners("resume"),this.removeAllListeners("pause"),this.removeAllListeners("error"),this.removeAllListeners("data"),this.removeAllListeners("end")},m=()=>{this.message.attachments.length||this.message.alternative?(t(`MIME-Version: 1.0${CRLF$1}`),a()):(h(this.message),u())};this.once("destroy",u),process.nextTick((()=>{let e=[];for(const t in this.message.header)!/bcc/i.test(t)&&Object.prototype.hasOwnProperty.call(this.message.header,t)&&(e=e.concat([convertDashDelimitedTextToSnakeCase(t),": ",this.message.header[t],CRLF$1]));t(e.join("")),m()}))}pause(){this.paused=!0,this.emit("pause")}resume(){this.paused=!1,this.emit("resume")}destroy(){this.emit("destroy",this.bufferIndex>0?{message:"message stream destroyed"}:null)}destroySoon(){this.emit("destroy")}}const SMTPErrorStates={COULDNOTCONNECT:1,BADRESPONSE:2,AUTHFAILED:3,TIMEDOUT:4,ERROR:5,NOCONNECTION:6,AUTHNOTSUPPORTED:7,CONNECTIONCLOSED:8,CONNECTIONENDED:9,CONNECTIONAUTH:10};class SMTPError extends Error{constructor(e){super(e),this.code=null,this.smtp=null,this.previous=null}static create(e,t,s,r){const o=(null===s||void 0===s?void 0:s.message)?`${e} (${s.message})`:e,n=new SMTPError(o);return n.code=t,n.smtp=r,s&&(n.previous=s),n}}class SMTPResponseMonitor{constructor(e,t,s){let r="";const o=t=>{e.emit("response",SMTPError.create("connection encountered an error",SMTPErrorStates.ERROR,t))},n=t=>{null!==t&&(r+=t.toString(),(()=>{var t,s;if(r.length){const o=r.replace("\r","");if(null===(s=null===(t=o.trim().split(/\n/).pop())||void 0===t?void 0:t.match(/^(\d{3})\s/))||void 0===s||!s)return;const n=o?o.match(/(\d+)\s?(.*)/):null,i=null!==n?{code:n[1],message:n[2],data:o}:{code:-1,data:o};e.emit("response",null,i),r=""}})())},i=t=>{e.emit("response",SMTPError.create("connection has closed",SMTPErrorStates.CONNECTIONCLOSED,t))},a=t=>{e.emit("response",SMTPError.create("connection has ended",SMTPErrorStates.CONNECTIONENDED,t))};this.stop=t=>{e.removeAllListeners("response"),e.removeListener("data",n),e.removeListener("end",a),e.removeListener("close",i),e.removeListener("error",o),null!=t&&"function"===typeof s&&s(t)},e.on("data",n),e.on("end",a),e.on("close",i),e.on("error",o),e.setTimeout(t,(t=>{e.end(),e.emit("response",SMTPError.create("timedout while connecting to smtp server",SMTPErrorStates.TIMEDOUT,t))}))}}const AUTH_METHODS={PLAIN:"PLAIN","CRAM-MD5":"CRAM-MD5",LOGIN:"LOGIN",XOAUTH2:"XOAUTH2"},SMTPState={NOTCONNECTED:0,CONNECTING:1,CONNECTED:2},DEFAULT_TIMEOUT=5e3,SMTP_PORT=25,SMTP_SSL_PORT=465,SMTP_TLS_PORT=587,CRLF="\r\n",GREYLIST_DELAY=300;let DEBUG=0;const log=(...e)=>{1===DEBUG&&e.forEach((e=>console.log("object"===typeof e?e instanceof Error?e.message:JSON.stringify(e):e)))},caller=(e,...t)=>{"function"===typeof e&&e(...t)};class SMTPConnection extends events.EventEmitter{constructor({timeout:e,host:t,user:s,password:r,domain:o,port:n,ssl:i,tls:a,logger:l,authentication:h}={}){var c;if(super(),this.timeout=5e3,this.log=log,this.authentication=[AUTH_METHODS["CRAM-MD5"],AUTH_METHODS.LOGIN,AUTH_METHODS.PLAIN,AUTH_METHODS.XOAUTH2],this._state=SMTPState.NOTCONNECTED,this._secure=!1,this.loggedin=!1,this.sock=null,this.features=null,this.monitor=null,this.domain=os.hostname(),this.host="localhost",this.ssl=!1,this.tls=!1,this.greylistResponseTracker=new WeakSet,Array.isArray(h)&&(this.authentication=h),"number"===typeof e&&(this.timeout=e),"string"===typeof o&&(this.domain=o),"string"===typeof t&&(this.host=t),null!=i&&("boolean"===typeof i||"object"===typeof i&&!1===Array.isArray(i))&&(this.ssl=i),null!=a&&("boolean"===typeof a||"object"===typeof a&&!1===Array.isArray(a))&&(this.tls=a),this.port=n||(i?465:a?587:25),this.loggedin=!s||!r,!s&&(null!==(c=null===r||void 0===r?void 0:r.length)&&void 0!==c?c:0)>0)throw new Error("`password` cannot be set without `user`");this.user=()=>s,this.password=()=>r,"function"===typeof l&&(this.log=log)}debug(e){DEBUG=e}state(){return this._state}authorized(){return this.loggedin}connect(e,t=this.port,s=this.host,r={}){this.port=t,this.host=s,this.ssl=r.ssl||this.ssl,this._state!==SMTPState.NOTCONNECTED&&this.quit((()=>this.connect(e,t,s,r)));const o=()=>{this.log(`connected: ${this.host}:${this.port}`),this.ssl&&!this.tls&&("boolean"!==typeof this.ssl&&this.sock instanceof tls.TLSSocket&&!this.sock.authorized?(this.close(!0),caller(e,SMTPError.create("could not establish an ssl connection",SMTPErrorStates.CONNECTIONAUTH))):this._secure=!0)},n=t=>{t?(this.close(!0),this.log(t),caller(e,SMTPError.create("could not connect",SMTPErrorStates.COULDNOTCONNECT,t))):o()},i=(t,s)=>{if(t){if(this._state===SMTPState.NOTCONNECTED&&!this.sock)return;this.close(!0),caller(e,t)}else"220"==s.code?(this.log(s.data),this._state=SMTPState.CONNECTED,caller(e,null,s.data)):(this.log(`response (data): ${s.data}`),this.quit((()=>{caller(e,SMTPError.create("bad response on connection",SMTPErrorStates.BADRESPONSE,t,s.data))})))};this._state=SMTPState.CONNECTING,this.log(`connecting: ${this.host}:${this.port}`),this.ssl?this.sock=tls.connect(this.port,this.host.trim(),"object"===typeof this.ssl?this.ssl:{},o):(this.sock=new net.Socket,this.sock.connect(this.port,this.host.trim(),n)),this.monitor=new SMTPResponseMonitor(this.sock,this.timeout,(()=>this.close(!0))),this.sock.once("response",i),this.sock.once("error",i)}send(e,t){null!=this.sock&&this._state===SMTPState.CONNECTED?(this.log(e),this.sock.once("response",((e,s)=>{e?caller(t,e):(this.log(s.data),caller(t,null,s))})),this.sock.writable&&this.sock.write(e)):(this.close(!0),caller(t,SMTPError.create("no connection has been established",SMTPErrorStates.NOCONNECTION)))}command(e,t,s=[250]){const r=Array.isArray(s)?s:"number"===typeof s?[s]:[250],o=(s,n)=>{if(s)caller(t,s);else{const i=Number(n.code);if(-1!==r.indexOf(i))caller(t,s,n.data,n.message);else if(450!==i&&451!==i||!n.message.toLowerCase().includes("greylist")||!1!==this.greylistResponseTracker.has(o)){const s=n.message?`: ${n.message}`:"",r=`bad response on command '${e.split(" ")[0]}'${s}`;caller(t,SMTPError.create(r,SMTPErrorStates.BADRESPONSE,null,n.data))}else this.greylistResponseTracker.add(o),setTimeout((()=>{this.send(e+"\r\n",o)}),300)}};this.greylistResponseTracker.delete(o),this.send(e+"\r\n",o)}helo(e,t){this.command(`helo ${t||this.domain}`,((t,s)=>{t?caller(e,t):(this.parse_smtp_features(s),caller(e,t,s))}))}starttls(e){this.command("starttls",((t,s)=>{if(null==this.sock)throw new Error("null socket");if(t)t.message+=" while establishing a starttls session",caller(e,t);else{const t=tls.createSecureContext("object"===typeof this.tls?this.tls:{}),r=new tls.TLSSocket(this.sock,{secureContext:t});r.on("error",(t=>{this.close(!0),caller(e,t)})),this._secure=!0,this.sock=r,new SMTPResponseMonitor(this.sock,this.timeout,(()=>this.close(!0))),caller(e,s.data)}}),[220])}parse_smtp_features(e){e.split("\n").forEach((e=>{const t=e.match(/^(?:\d+[-=]?)\s*?([^\s]+)(?:\s+(.*)\s*?)?$/);null!=t&&null!=this.features&&(this.features[t[1].toLowerCase()]=t[2]||!0)}))}ehlo(e,t){this.features={},this.command(`ehlo ${t||this.domain}`,((s,r)=>{s?caller(e,s):(this.parse_smtp_features(r),this.tls&&!this._secure?this.starttls((()=>this.ehlo(e,t))):caller(e,s,r))}))}has_extn(e){var t;return void 0===(null!==(t=this.features)&&void 0!==t?t:{})[e.toLowerCase()]}help(e,t){this.command(t?`help ${t}`:"help",e,[211,214])}rset(e){this.command("rset",e)}noop(e){this.send("noop",e)}mail(e,t){this.command(`mail FROM:${t}`,e)}rcpt(e,t){this.command(`RCPT TO:${t}`,e,[250,251])}data(e){this.command("data",e,[354])}data_end(e){this.command("\r\n.",e)}message(e){var t,s;this.log(e),null!==(s=null===(t=this.sock)||void 0===t?void 0:t.write(e))&&void 0!==s||this.log("no socket to write to")}verify(e,t){this.command(`vrfy ${e}`,t,[250,251,252])}expn(e,t){this.command(`expn ${e}`,t)}ehlo_or_helo_if_needed(e,t){if(!this.features){const s=(t,s)=>caller(e,t,s);this.ehlo(((r,o)=>{r?this.helo(s,t):caller(e,r,o)}),t)}}login(e,t,s,r={}){var o,n;const i={user:t?()=>t:this.user,password:s?()=>s:this.password,method:null!==(n=null===(o=null===r||void 0===r?void 0:r.method)||void 0===o?void 0:o.toUpperCase())&&void 0!==n?n:""},a=(null===r||void 0===r?void 0:r.domain)||this.domain;this.ehlo_or_helo_if_needed(((t,s)=>{var r;if(t)return void caller(e,t);let o=null;if(!o){const e=this.authentication;let t="";"string"===typeof(null===(r=this.features)||void 0===r?void 0:r.auth)&&(t=this.features.auth);for(let s=0;s<e.length;s++)if(t.includes(e[s])){o=e[s];break}}const n=(t,s)=>{this.loggedin=!1,this.close(),caller(e,SMTPError.create("authorization.failed",SMTPErrorStates.AUTHFAILED,t,s))},a=(t,s)=>{t?n(t,s):(this.loggedin=!0,caller(e,t,s))},l=(e,t,s)=>{e?n(e,t):o===AUTH_METHODS["CRAM-MD5"]?this.command((e=>{const t=crypto.createHmac("md5",i.password());return t.update(Buffer.from(e,"base64").toString("ascii")),Buffer.from(`${i.user()} ${t.digest("hex")}`).toString("base64")})(s),a,[235,503]):o===AUTH_METHODS.LOGIN&&this.command(Buffer.from(i.password()).toString("base64"),a,[235,503])},h=(e,t)=>{e?n(e,t):o===AUTH_METHODS.LOGIN&&this.command(Buffer.from(i.user()).toString("base64"),l,[334])};switch(o){case AUTH_METHODS["CRAM-MD5"]:this.command(`AUTH  ${AUTH_METHODS["CRAM-MD5"]}`,l,[334]);break;case AUTH_METHODS.LOGIN:this.command(`AUTH ${AUTH_METHODS.LOGIN}`,h,[334]);break;case AUTH_METHODS.PLAIN:this.command(`AUTH ${AUTH_METHODS.PLAIN} ${Buffer.from(`\0${i.user()}\0${i.password()}`).toString("base64")}`,a,[235,503]);break;case AUTH_METHODS.XOAUTH2:this.command(`AUTH ${AUTH_METHODS.XOAUTH2} ${Buffer.from(`user=${i.user()}\x01auth=Bearer ${i.password()}\x01\x01`).toString("base64")}`,a,[235,503]);break;default:caller(e,SMTPError.create("no form of authorization supported",SMTPErrorStates.AUTHNOTSUPPORTED,null,s))}}),a)}close(e=!1){this.sock&&(e?(this.log("smtp connection destroyed!"),this.sock.destroy()):(this.log("smtp connection closed."),this.sock.end())),this.monitor&&(this.monitor.stop(),this.monitor=null),this._state=SMTPState.NOTCONNECTED,this._secure=!1,this.sock=null,this.features=null,this.loggedin=!(this.user()&&this.password())}quit(e){this.command("quit",((t,s)=>{caller(e,t,s),this.close()}),[221,250])}}class SMTPClient{constructor(e){this.queue=[],this.sending=!1,this.ready=!1,this.timer=null,this.smtp=new SMTPConnection(e)}send(e,t){const s=e instanceof Message?e:this._canMakeMessage(e)?new Message(e):null;null!=s?s.valid(((r,o)=>{if(r){const r=this.createMessageStack(s,t);if(0===r.to.length)return t(new Error("No recipients found in message"),e);this.queue.push(r),this._poll()}else t(new Error(o),e)})):t(new Error("message is not a valid Message instance"),e)}sendAsync(e){return new Promise(((t,s)=>{this.send(e,((e,r)=>{null!=e?s(e):t(r)}))}))}createMessageStack(e,t=function(){}){const[{address:s}]=addressparser(e.header.from),r={message:e,to:[],from:s,callback:t.bind(this)},{header:{to:o,cc:n,bcc:i,"return-path":a}}=e;if(("string"===typeof o||Array.isArray(o))&&o.length>0&&(r.to=addressparser(o)),("string"===typeof n||Array.isArray(n))&&n.length>0&&(r.to=r.to.concat(addressparser(n).filter((e=>!1===r.to.some((t=>t.address===e.address)))))),("string"===typeof i||Array.isArray(i))&&i.length>0&&(r.to=r.to.concat(addressparser(i).filter((e=>!1===r.to.some((t=>t.address===e.address)))))),"string"===typeof a&&a.length>0){const e=addressparser(a);if(e.length>0){const[{address:t}]=e;r.returnPath=t}}return r}_poll(){null!=this.timer&&clearTimeout(this.timer),this.queue.length?this.smtp.state()==SMTPState.NOTCONNECTED?this._connect(this.queue[0]):this.smtp.state()==SMTPState.CONNECTED&&!this.sending&&this.ready&&this._sendmail(this.queue.shift()):this.smtp.state()==SMTPState.CONNECTED&&(this.timer=setTimeout((()=>this.smtp.quit()),1e3))}_connect(e){this.ready=!1,this.smtp.connect((t=>{if(t)e.callback(t,e.message),this.queue.shift(),this._poll();else{const t=t=>{t?(e.callback(t,e.message),this.queue.shift(),this._poll()):(this.ready=!0,this._poll())};this.smtp.authorized()?this.smtp.ehlo_or_helo_if_needed(t):this.smtp.login(t)}}))}_canMakeMessage(e){return e.from&&(e.to||e.cc||e.bcc)&&(void 0!==e.text||this._containsInlinedHtml(e.attachment))}_containsInlinedHtml(e){return Array.isArray(e)?e.some((e=>this._isAttachmentInlinedHtml(e))):this._isAttachmentInlinedHtml(e)}_isAttachmentInlinedHtml(e){return e&&(e.data||e.path)&&!0===e.alternative}_sendsmtp(e,t){return s=>{!s&&t?t.apply(this,[e]):this.smtp.rset((()=>this._senddone(s,e)))}}_sendmail(e){const t=e.returnPath||e.from;this.sending=!0,this.smtp.mail(this._sendsmtp(e,this._sendrcpt),"<"+t+">")}_sendrcpt(e){var t;if(null==e.to||"string"===typeof e.to)throw new TypeError("stack.to must be array");const s=null===(t=e.to.shift())||void 0===t?void 0:t.address;this.smtp.rcpt(this._sendsmtp(e,e.to.length?this._sendrcpt:this._senddata),`<${s}>`)}_senddata(e){this.smtp.data(this._sendsmtp(e,this._sendmessage))}_sendmessage(e){const t=e.message.stream();t.on("data",(e=>this.smtp.message(e))),t.on("end",(()=>{this.smtp.data_end(this._sendsmtp(e,(()=>this._senddone(null,e))))})),t.on("error",(t=>{this.smtp.close(),this._senddone(t,e)}))}_senddone(e,t){this.sending=!1,t.callback(e,t.message),this._poll()}}exports.AUTH_METHODS=AUTH_METHODS,exports.BUFFERSIZE=12768,exports.DEFAULT_TIMEOUT=5e3,exports.MIME64CHUNK=456,exports.MIMECHUNK=76,exports.Message=Message,exports.SMTPClient=SMTPClient,exports.SMTPConnection=SMTPConnection,exports.SMTPError=SMTPError,exports.SMTPErrorStates=SMTPErrorStates,exports.SMTPResponseMonitor=SMTPResponseMonitor,exports.SMTPState=SMTPState,exports.addressparser=addressparser,exports.getRFC2822Date=getRFC2822Date,exports.getRFC2822DateUTC=getRFC2822DateUTC,exports.isRFC2822Date=isRFC2822Date,exports.mimeEncode=mimeEncode,exports.mimeWordEncode=mimeWordEncode;