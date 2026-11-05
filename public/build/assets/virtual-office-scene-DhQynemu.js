import{m as ts,w as zu,c as Gu,g as bi,s as Hu,a as hl,p as ku,b as Vu,d as Wu,i as Xu}from"./virtual-office-BfjAE2nz.js";const ya="187",Li={ROTATE:0,DOLLY:1,PAN:2},Di={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},_c=0,fo=1,xc=2,Ps=1,vc=2,ns=3,mi=0,an=1,jt=2,Ii=0,is=1,Bs=2,po=3,mo=4,Mc=5,Pi=100,Sc=101,yc=102,Ec=103,bc=104,Tc=200,Ac=201,wc=202,Rc=203,To=204,Ao=205,Cc=206,Pc=207,Dc=208,Lc=209,Ic=210,Nc=211,Uc=212,Fc=213,Oc=214,Pr=0,Dr=1,Lr=2,as=3,Ir=4,Nr=5,Ur=6,Fr=7,wo=0,Bc=1,zc=2,kn=0,Ro=1,Co=2,Po=3,Ea=4,Do=5,Lo=6,Io=7,No=300,Ni=301,os=302,br=303,Tr=304,Or=1e3,Hn=1001,Br=1002,Yt=1003,Gc=1004,Rs=1005,rn=1006,Ar=1007,ei=1008,un=1009,Uo=1010,Fo=1011,ls=1012,ba=1013,Dn=1014,Mn=1015,Ln=1016,Ta=1017,Aa=1018,Ui=1020,Oo=35902,Bo=35899,zo=1021,Go=1022,Cn=1023,si=1026,ti=1027,wa=1028,Ra=1029,gi=1030,Ca=1031,Pa=1033,Ds=33776,Ls=33777,Is=33778,Ns=33779,zr=35840,Gr=35841,Hr=35842,kr=35843,Vr=36196,Wr=37492,Xr=37496,qr=37488,Yr=37489,zs=37490,Zr=37491,Kr=37808,$r=37809,Jr=37810,Qr=37811,jr=37812,ea=37813,ta=37814,na=37815,ia=37816,sa=37817,ra=37818,aa=37819,oa=37820,la=37821,ca=36492,ua=36494,ha=36495,da=36283,fa=36284,Gs=36285,pa=36286,Hc=3200,ma=0,kc=1,Qn="",sn="srgb",Hs="srgb-linear",ks="linear",bt="srgb",wr=7680,Vc=519,Wc=512,Xc=513,qc=514,Ho=515,Yc=516,Zc=517,ko=518,Vo=519,Kc=35044,Wo=35048,go="300 es",Sn=2e3,cs=2001;function qu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ga(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $c(){const i=ga("canvas");return i.style.display="block",i}const dl={};function _o(...i){const e="THREE."+i.shift();console.log(e,...i)}function Jc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $e(...i){i=Jc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Jc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Us(...i){const e=i.join(" ");e in dl||(dl[e]=!0,$e(...i))}function Yu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Zu={[Pr]:Pr,[Lr]:Ur,[Ir]:Ir,[as]:Nr,[Dr]:Dr,[Ur]:Lr,[Fr]:Fr,[Nr]:as};class ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fl=1234567;const Fs=Math.PI/180,Vs=180/Math.PI;function fs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function ct(i,e,t){return Math.max(e,Math.min(t,i))}function Xo(i,e){return(i%e+e)%e}function Ku(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function $u(i,e,t){return i!==e?(t-i)/(e-i):0}function Os(i,e,t){return(1-t)*i+t*e}function Ju(i,e,t,n){return Os(i,e,1-Math.exp(-t*n))}function Qu(i,e=1){return e-Math.abs(Xo(i,e*2)-e)}function ju(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function eh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function th(i,e){return i+Math.floor(Math.random()*(e-i+1))}function nh(i,e){return i+Math.random()*(e-i)}function ih(i){return i*(.5-Math.random())}function sh(i){i!==void 0&&(fl=i);let e=fl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rh(i){return i*Fs}function ah(i){return i*Vs}function oh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function lh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Qc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ch(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),f=a((e+n)/2),m=r((e-n)/2),d=a((e-n)/2),g=r((n-e)/2),_=a((n-e)/2);switch(s){case"XYX":i.set(o*f,c*m,c*d,o*l);break;case"YZY":i.set(c*d,o*f,c*m,o*l);break;case"ZXZ":i.set(c*m,c*d,o*f,o*l);break;case"XZX":i.set(o*f,c*_,c*g,o*l);break;case"YXY":i.set(c*g,o*f,c*_,o*l);break;case"ZYZ":i.set(c*_,c*g,o*f,o*l);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qo(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function jc(i,e){if(e.constructor===Float32Array)return i;const t=qo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function eu(i,e){if(e.constructor===Float32Array)return i;const t=qo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const ss={DEG2RAD:Fs,RAD2DEG:Vs,generateUUID:fs,clamp:ct,euclideanModulo:Xo,mapLinear:Ku,inverseLerp:$u,lerp:Os,damp:Ju,pingpong:Qu,smoothstep:ju,smootherstep:eh,randInt:th,randFloat:nh,randFloatSpread:ih,seededRandom:sh,degToRad:rh,radToDeg:ah,isPowerOfTwo:oh,ceilPowerOfTwo:lh,floorPowerOfTwo:Qc,setQuaternionFromProperEuler:ch,normalize:eu,denormalize:jc},ol=class ol{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ol.prototype.isVector2=!0;let Ke=ol;class hn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],f=n[s+2],m=n[s+3],d=r[a+0],g=r[a+1],_=r[a+2],E=r[a+3];if(m!==E||c!==d||l!==g||f!==_){let h=c*d+l*g+f*_+m*E;h<0&&(d=-d,g=-g,_=-_,E=-E,h=-h);let p=1-o;if(h<.9995){const M=Math.acos(h),A=Math.sin(M);p=Math.sin(p*M)/A,o=Math.sin(o*M)/A,c=c*p+d*o,l=l*p+g*o,f=f*p+_*o,m=m*p+E*o}else{c=c*p+d*o,l=l*p+g*o,f=f*p+_*o,m=m*p+E*o;const M=1/Math.sqrt(c*c+l*l+f*f+m*m);c*=M,l*=M,f*=M,m*=M}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=m}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],f=n[s+3],m=r[a],d=r[a+1],g=r[a+2],_=r[a+3];return e[t]=o*_+f*m+c*g-l*d,e[t+1]=c*_+f*d+l*m-o*g,e[t+2]=l*_+f*g+o*d-c*m,e[t+3]=f*_-o*m-c*d-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(s/2),m=o(r/2),d=c(n/2),g=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=d*f*m+l*g*_,this._y=l*g*m-d*f*_,this._z=l*f*_+d*g*m,this._w=l*f*m-d*g*_;break;case"YXZ":this._x=d*f*m+l*g*_,this._y=l*g*m-d*f*_,this._z=l*f*_-d*g*m,this._w=l*f*m+d*g*_;break;case"ZXY":this._x=d*f*m-l*g*_,this._y=l*g*m+d*f*_,this._z=l*f*_+d*g*m,this._w=l*f*m-d*g*_;break;case"ZYX":this._x=d*f*m-l*g*_,this._y=l*g*m+d*f*_,this._z=l*f*_-d*g*m,this._w=l*f*m+d*g*_;break;case"YZX":this._x=d*f*m+l*g*_,this._y=l*g*m+d*f*_,this._z=l*f*_-d*g*m,this._w=l*f*m-d*g*_;break;case"XZY":this._x=d*f*m-l*g*_,this._y=l*g*m-d*f*_,this._z=l*f*_+d*g*m,this._w=l*f*m+d*g*_;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],m=t[10],d=n+o+m;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(f-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(n>o&&n>m){const g=2*Math.sqrt(1+n-o-m);this._w=(f-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>m){const g=2*Math.sqrt(1+o-n-m);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+f)/g}else{const g=2*Math.sqrt(1+m-n-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+a*o+s*l-r*c,this._y=s*f+a*c+r*o-n*l,this._z=r*f+a*l+n*c-s*o,this._w=a*f-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ll=class ll{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),f=2*(o*t-r*s),m=2*(r*n-a*t);return this.x=t+c*l+a*m-o*f,this.y=n+c*f+o*l-r*m,this.z=s+c*m+r*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ka.copy(this).projectOnVector(e),this.sub(ka)}reflect(e){return this.sub(ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ll.prototype.isVector3=!0;let z=ll;const ka=new z,pl=new hn,cl=class cl{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=r,f[5]=c,f[6]=n,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],f=n[4],m=n[7],d=n[2],g=n[5],_=n[8],E=s[0],h=s[3],p=s[6],M=s[1],A=s[4],b=s[7],w=s[2],x=s[5],u=s[8];return r[0]=a*E+o*M+c*w,r[3]=a*h+o*A+c*x,r[6]=a*p+o*b+c*u,r[1]=l*E+f*M+m*w,r[4]=l*h+f*A+m*x,r[7]=l*p+f*b+m*u,r[2]=d*E+g*M+_*w,r[5]=d*h+g*A+_*x,r[8]=d*p+g*b+_*u,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-n*r*f+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],m=f*a-o*l,d=o*c-f*r,g=l*r-a*c,_=t*m+n*d+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=m*E,e[1]=(s*l-f*n)*E,e[2]=(o*n-s*a)*E,e[3]=d*E,e[4]=(f*t-s*c)*E,e[5]=(s*r-o*t)*E,e[6]=g*E,e[7]=(n*c-l*t)*E,e[8]=(a*t-n*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Us("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Va.makeScale(e,t)),this}rotate(e){return Us("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Va.makeRotation(-e)),this}translate(e,t){return Us("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Va.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};cl.prototype.isMatrix3=!0;let je=cl;const Va=new je,ml=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gl=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uh(){const i={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===bt&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===bt&&(s.r=rs(s.r),s.g=rs(s.g),s.b=rs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Qn?ks:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Hs]:{primaries:e,whitePoint:n,transfer:ks,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),i}const pt=uh();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ki;class tu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ki===void 0&&(ki=ga("canvas")),ki.width=e.width,ki.height=e.height;const s=ki.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ki}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ga("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hh=0;class Da{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Wa(s[a].image)):r.push(Wa(s[a]))}else r=Wa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}let dh=0;const Xa=new z;class Kt extends ai{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,n=Hn,s=Hn,r=rn,a=ei,o=Cn,c=un,l=Kt.DEFAULT_ANISOTROPY,f=Qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=fs(),this.name="",this.source=new Da(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==No)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Or:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Or:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=No;Kt.DEFAULT_ANISOTROPY=1;const ul=class ul{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],f=c[4],m=c[8],d=c[1],g=c[5],_=c[9],E=c[2],h=c[6],p=c[10];if(Math.abs(f-d)<.01&&Math.abs(m-E)<.01&&Math.abs(_-h)<.01){if(Math.abs(f+d)<.1&&Math.abs(m+E)<.1&&Math.abs(_+h)<.1&&Math.abs(l+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,b=(g+1)/2,w=(p+1)/2,x=(f+d)/4,u=(m+E)/4,S=(_+h)/4;return A>b&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=x/n,r=u/n):b>w?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=x/s,r=S/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=u/r,s=S/r),this.set(n,s,r,t),this}let M=Math.sqrt((h-_)*(h-_)+(m-E)*(m-E)+(d-f)*(d-f));return Math.abs(M)<.001&&(M=1),this.x=(h-_)/M,this.y=(m-E)/M,this.z=(d-f)/M,this.w=Math.acos((l+g+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ul.prototype.isVector4=!0;let Dt=ul;class nu extends ai{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Kt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Da(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends nu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yo extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class iu extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Sa=class Sa{constructor(e,t,n,s,r,a,o,c,l,f,m,d,g,_,E,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,f,m,d,g,_,E,h)}set(e,t,n,s,r,a,o,c,l,f,m,d,g,_,E,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=f,p[10]=m,p[14]=d,p[3]=g,p[7]=_,p[11]=E,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Sa().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),a=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),f=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const d=a*f,g=a*m,_=o*f,E=o*m;t[0]=c*f,t[4]=-c*m,t[8]=l,t[1]=g+_*l,t[5]=d-E*l,t[9]=-o*c,t[2]=E-d*l,t[6]=_+g*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*f,g=c*m,_=l*f,E=l*m;t[0]=d+E*o,t[4]=_*o-g,t[8]=a*l,t[1]=a*m,t[5]=a*f,t[9]=-o,t[2]=g*o-_,t[6]=E+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*f,g=c*m,_=l*f,E=l*m;t[0]=d-E*o,t[4]=-a*m,t[8]=_+g*o,t[1]=g+_*o,t[5]=a*f,t[9]=E-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*f,g=a*m,_=o*f,E=o*m;t[0]=c*f,t[4]=_*l-g,t[8]=d*l+E,t[1]=c*m,t[5]=E*l+d,t[9]=g*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,g=a*l,_=o*c,E=o*l;t[0]=c*f,t[4]=E-d*m,t[8]=_*m+g,t[1]=m,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=g*m+_,t[10]=d-E*m}else if(e.order==="XZY"){const d=a*c,g=a*l,_=o*c,E=o*l;t[0]=c*f,t[4]=-m,t[8]=l*f,t[1]=d*m+E,t[5]=a*f,t[9]=g*m-_,t[2]=_*m-g,t[6]=o*f,t[10]=E*m+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fh,e,ph)}lookAt(e,t,n){const s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ci.crossVectors(n,dn),ci.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ci.crossVectors(n,dn)),ci.normalize(),$s.crossVectors(dn,ci),s[0]=ci.x,s[4]=$s.x,s[8]=dn.x,s[1]=ci.y,s[5]=$s.y,s[9]=dn.y,s[2]=ci.z,s[6]=$s.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],f=n[1],m=n[5],d=n[9],g=n[13],_=n[2],E=n[6],h=n[10],p=n[14],M=n[3],A=n[7],b=n[11],w=n[15],x=s[0],u=s[4],S=s[8],F=s[12],P=s[1],C=s[5],I=s[9],B=s[13],L=s[2],V=s[6],U=s[10],W=s[14],le=s[3],J=s[7],j=s[11],ce=s[15];return r[0]=a*x+o*P+c*L+l*le,r[4]=a*u+o*C+c*V+l*J,r[8]=a*S+o*I+c*U+l*j,r[12]=a*F+o*B+c*W+l*ce,r[1]=f*x+m*P+d*L+g*le,r[5]=f*u+m*C+d*V+g*J,r[9]=f*S+m*I+d*U+g*j,r[13]=f*F+m*B+d*W+g*ce,r[2]=_*x+E*P+h*L+p*le,r[6]=_*u+E*C+h*V+p*J,r[10]=_*S+E*I+h*U+p*j,r[14]=_*F+E*B+h*W+p*ce,r[3]=M*x+A*P+b*L+w*le,r[7]=M*u+A*C+b*V+w*J,r[11]=M*S+A*I+b*U+w*j,r[15]=M*F+A*B+b*W+w*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],m=e[6],d=e[10],g=e[14],_=e[3],E=e[7],h=e[11],p=e[15],M=c*g-l*d,A=o*g-l*m,b=o*d-c*m,w=a*g-l*f,x=a*d-c*f,u=a*m-o*f;return t*(E*M-h*A+p*b)-n*(_*M-h*w+p*x)+s*(_*A-E*w+p*u)-r*(_*b-E*x+h*u)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(a*f-o*l)-n*(r*f-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],m=e[9],d=e[10],g=e[11],_=e[12],E=e[13],h=e[14],p=e[15],M=t*o-n*a,A=t*c-s*a,b=t*l-r*a,w=n*c-s*o,x=n*l-r*o,u=s*l-r*c,S=f*E-m*_,F=f*h-d*_,P=f*p-g*_,C=m*h-d*E,I=m*p-g*E,B=d*p-g*h,L=M*B-A*I+b*C+w*P-x*F+u*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/L;return e[0]=(o*B-c*I+l*C)*V,e[1]=(s*I-n*B-r*C)*V,e[2]=(E*u-h*x+p*w)*V,e[3]=(d*x-m*u-g*w)*V,e[4]=(c*P-a*B-l*F)*V,e[5]=(t*B-s*P+r*F)*V,e[6]=(h*b-_*u-p*A)*V,e[7]=(f*u-d*b+g*A)*V,e[8]=(a*I-o*P+l*S)*V,e[9]=(n*P-t*I-r*S)*V,e[10]=(_*x-E*b+p*M)*V,e[11]=(m*b-f*x-g*M)*V,e[12]=(o*F-a*C-c*S)*V,e[13]=(t*C-n*F+s*S)*V,e[14]=(E*A-_*w-h*M)*V,e[15]=(f*w-m*A+d*M)*V,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,f=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,f*o+n,f*c-s*a,0,l*c-s*o,f*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,f=a+a,m=o+o,d=r*l,g=r*f,_=r*m,E=a*f,h=a*m,p=o*m,M=c*l,A=c*f,b=c*m,w=n.x,x=n.y,u=n.z;return s[0]=(1-(E+p))*w,s[1]=(g+b)*w,s[2]=(_-A)*w,s[3]=0,s[4]=(g-b)*x,s[5]=(1-(d+p))*x,s[6]=(h+M)*x,s[7]=0,s[8]=(_+A)*u,s[9]=(h-M)*u,s[10]=(1-(d+E))*u,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Vi.set(s[0],s[1],s[2]).length();const o=Vi.set(s[4],s[5],s[6]).length(),c=Vi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Tn.copy(this);const l=1/a,f=1/o,m=1/c;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=f,Tn.elements[5]*=f,Tn.elements[6]*=f,Tn.elements[8]*=m,Tn.elements[9]*=m,Tn.elements[10]*=m,t.setFromRotationMatrix(Tn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Sn,c=!1){const l=this.elements,f=2*r/(t-e),m=2*r/(n-s),d=(t+e)/(t-e),g=(n+s)/(n-s);let _,E;if(c)_=r/(a-r),E=a*r/(a-r);else if(o===Sn)_=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===cs)_=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=m,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Sn,c=!1){const l=this.elements,f=2/(t-e),m=2/(n-s),d=-(t+e)/(t-e),g=-(n+s)/(n-s);let _,E;if(c)_=1/(a-r),E=a/(a-r);else if(o===Sn)_=-2/(a-r),E=-(a+r)/(a-r);else if(o===cs)_=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=m,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Sa.prototype.isMatrix4=!0;let gt=Sa;const Vi=new z,Tn=new gt,fh=new z(0,0,0),ph=new z(1,1,1),ci=new z,$s=new z,dn=new z,_l=new gt,xl=new hn;class In{constructor(e=0,t=0,n=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],f=s[9],m=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ct(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-f,g),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _l.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xl.setFromEuler(this),this.setFromQuaternion(xl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class La{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mh=0;const vl=new z,Wi=new hn,Yn=new gt,Js=new z,vs=new z,gh=new z,_h=new hn,Ml=new z(1,0,0),Sl=new z(0,1,0),yl=new z(0,0,1),El={type:"added"},xh={type:"removed"},Xi={type:"childadded",child:null},qa={type:"childremoved",child:null};class Ot extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new z,t=new In,n=new hn,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new je}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Ml,e)}rotateY(e){return this.rotateOnAxis(Sl,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ml,e)}translateY(e){return this.translateOnAxis(Sl,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(vs,Js,this.up):Yn.lookAt(Js,vs,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(Yn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(El),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xh),qa.child=e,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(El),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,e,gh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,_h,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const m=c[l];r(e.shapes,m)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),m=a(e.shapes),d=a(e.skeletons),g=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),m.length>0&&(n.shapes=m),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ot.DEFAULT_UP=new z(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pn extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vh={type:"move"};class Rr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const E of e.hand.values()){const h=t.getJointPose(E,n),p=this._getHandJoint(l,E);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const f=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],d=f.position.distanceTo(m.position),g=.02,_=.005;l.inputState.pinching&&d>g+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=g-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vh)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function Ya(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=Xo(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ya(a,r,e+1/3),this.g=Ya(a,r,e),this.b=Ya(a,r,e-1/3)}return pt.colorSpaceToWorking(this,s),this}setStyle(e,t=sn){function n(r){r!==void 0&&parseFloat(r)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){const n=su[e.toLowerCase()];return n!==void 0?this.setHex(n,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return pt.workingToColorSpace(Qt.copy(this),e),Math.round(ct(Qt.r*255,0,255))*65536+Math.round(ct(Qt.g*255,0,255))*256+Math.round(ct(Qt.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const m=a-o;switch(l=f<=.5?m/(a+o):m/(2-a-o),a){case n:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-n)/m+2;break;case r:c=(n-s)/m+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=sn){pt.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Qs);const n=Os(ui.h,Qs.h,t),s=Os(ui.s,Qs.s,t),r=Os(ui.l,Qs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new it;it.NAMES=su;class Ia{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new it(e),this.density=t}clone(){return new Ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ru extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const An=new z,Zn=new z,Za=new z,Kn=new z,qi=new z,Yi=new z,bl=new z,Ka=new z,$a=new z,Ja=new z,Qa=new Dt,ja=new Dt,eo=new Dt;class vn{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),An.subVectors(e,t),s.cross(An);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){An.subVectors(s,t),Zn.subVectors(n,t),Za.subVectors(e,t);const a=An.dot(An),o=An.dot(Zn),c=An.dot(Za),l=Zn.dot(Zn),f=Zn.dot(Za),m=a*l-o*o;if(m===0)return r.set(0,0,0),null;const d=1/m,g=(l*c-o*f)*d,_=(a*f-o*c)*d;return r.set(1-g-_,_,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Kn.x),c.addScaledVector(a,Kn.y),c.addScaledVector(o,Kn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Qa.setScalar(0),ja.setScalar(0),eo.setScalar(0),Qa.fromBufferAttribute(e,t),ja.fromBufferAttribute(e,n),eo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Qa,r.x),a.addScaledVector(ja,r.y),a.addScaledVector(eo,r.z),a}static isFrontFacing(e,t,n,s){return An.subVectors(n,t),Zn.subVectors(e,t),An.cross(Zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),An.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;qi.subVectors(s,n),Yi.subVectors(r,n),Ka.subVectors(e,n);const c=qi.dot(Ka),l=Yi.dot(Ka);if(c<=0&&l<=0)return t.copy(n);$a.subVectors(e,s);const f=qi.dot($a),m=Yi.dot($a);if(f>=0&&m<=f)return t.copy(s);const d=c*m-f*l;if(d<=0&&c>=0&&f<=0&&c-f>0)return a=c/(c-f),t.copy(n).addScaledVector(qi,a);Ja.subVectors(e,r);const g=qi.dot(Ja),_=Yi.dot(Ja);if(_>=0&&g<=_)return t.copy(r);const E=g*l-c*_;if(E<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Yi,o);const h=f*_-g*m;if(h<=0&&m-f>=0&&g-_>=0)return bl.subVectors(r,s),o=(m-f)/(m-f+(g-_)),t.copy(s).addScaledVector(bl,o);const p=1/(h+E+d);return a=E*p,o=d*p,t.copy(n).addScaledVector(qi,a).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xi{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,wn):wn.fromBufferAttribute(r,a),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),js.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),js.copy(n.boundingBox)),js.applyMatrix4(e.matrixWorld),this.union(js)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),er.subVectors(this.max,Ms),Zi.subVectors(e.a,Ms),Ki.subVectors(e.b,Ms),$i.subVectors(e.c,Ms),hi.subVectors(Ki,Zi),di.subVectors($i,Ki),Ti.subVectors(Zi,$i);let t=[0,-hi.z,hi.y,0,-di.z,di.y,0,-Ti.z,Ti.y,hi.z,0,-hi.x,di.z,0,-di.x,Ti.z,0,-Ti.x,-hi.y,hi.x,0,-di.y,di.x,0,-Ti.y,Ti.x,0];return!to(t,Zi,Ki,$i,er)||(t=[1,0,0,0,1,0,0,0,1],!to(t,Zi,Ki,$i,er))?!1:(tr.crossVectors(hi,di),t=[tr.x,tr.y,tr.z],to(t,Zi,Ki,$i,er))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new z,new z,new z,new z,new z,new z,new z,new z],wn=new z,js=new xi,Zi=new z,Ki=new z,$i=new z,hi=new z,di=new z,Ti=new z,Ms=new z,er=new z,tr=new z,Ai=new z;function to(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ai.fromArray(i,r);const o=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),c=e.dot(Ai),l=t.dot(Ai),f=n.dot(Ai);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const Ft=new z,nr=new Ke;let Mh=0;class on extends ai{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Kc,this.updateRanges=[],this.gpuType=Mn,this.version=0,this._normalizationScale=e!==void 0?qo(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):jc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):eu(e,this.array)}}class Zo extends on{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ko extends on{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends on{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Sh=new xi,Ss=new z,no=new z;class vi{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Sh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);const t=Ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(no.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(no)),this.expandByPoint(Ss.copy(e.center).sub(no))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yh=0;const gn=new gt,io=new Ot,Ji=new z,fn=new xi,ys=new xi,qt=new z;class Zt extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qu(e)?Ko:Zo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ys.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(fn.min,ys.min),fn.expandByPoint(qt),qt.addVectors(fn.max,ys.max),fn.expandByPoint(qt)):(fn.expandByPoint(ys.min),fn.expandByPoint(ys.max))}fn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)qt.fromBufferAttribute(o,l),c&&(Ji.fromBufferAttribute(e,l),qt.add(Ji)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new on(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let F=0;F<n.count;F++)o[F]=new z,c[F]=new z;const f=new z,m=new z,d=new z,g=new Ke,_=new Ke,E=new Ke,h=new z,p=new z;function M(F,P,C){l[F]=l[P]=l[C]=1,f.fromBufferAttribute(n,F),m.fromBufferAttribute(n,P),d.fromBufferAttribute(n,C),g.fromBufferAttribute(r,F),_.fromBufferAttribute(r,P),E.fromBufferAttribute(r,C),m.sub(f),d.sub(f),_.sub(g),E.sub(g);const I=1/(_.x*E.y-E.x*_.y);isFinite(I)&&(h.copy(m).multiplyScalar(E.y).addScaledVector(d,-_.y).multiplyScalar(I),p.copy(d).multiplyScalar(_.x).addScaledVector(m,-E.x).multiplyScalar(I),o[F].add(h),o[P].add(h),o[C].add(h),c[F].add(p),c[P].add(p),c[C].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let F=0,P=A.length;F<P;++F){const C=A[F],I=C.start,B=C.count;for(let L=I,V=I+B;L<V;L+=3)M(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const b=new z,w=new z,x=new z,u=new z;function S(F){x.fromBufferAttribute(s,F),u.copy(x);const P=o[F];b.copy(P),b.sub(x.multiplyScalar(x.dot(P))).normalize(),w.crossVectors(u,P);const I=w.dot(c[F])<0?-1:1;a.setXYZW(F,b.x,b.y,b.z,I)}for(let F=0,P=n.count;F<P;++F)l[F]&&S(F);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new on(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);const s=new z,r=new z,a=new z,o=new z,c=new z,l=new z,f=new z,m=new z;if(e)for(let d=0,g=e.count;d<g;d+=3){const _=e.getX(d+0),E=e.getX(d+1),h=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,h),f.subVectors(a,r),m.subVectors(s,r),f.cross(m),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,h),o.add(f),c.add(f),l.add(f),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(E,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),f.subVectors(a,r),m.subVectors(s,r),f.cross(m),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,m=o.normalized,d=new l.constructor(c.length*f);let g=0,_=0;for(let E=0,h=c.length;E<h;E++){o.isInterleavedBufferAttribute?g=c[E]*o.data.stride+o.offset:g=c[E]*f;for(let p=0;p<f;p++)d[_++]=l[g++]}return new on(d,f,m)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let f=0,m=l.length;f<m;f++){const d=l[f],g=e(d,n);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let m=0,d=l.length;m<d;m++){const g=l[m];f.push(g.toJSON(e.data))}f.length>0&&(s[c]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const f=s[l];this.setAttribute(l,f.clone(t))}const r=e.morphAttributes;for(const l in r){const f=[],m=r[l];for(let d=0,g=m.length;d<g;d++)f.push(m[d].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const m=a[l];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const so=new z,Eh=new z,bh=new je;class zn{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=so.subVectors(n,t).cross(Eh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(so),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bh.getNormalMatrix(e),s=this.coplanarPoint(so).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Th=0;class Mi extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=is,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=To,this.blendDst=Ao,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new zn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Jn=new z,ro=new z,ir=new z,sr=new z;class ps{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ro.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),sr.copy(this.origin).sub(ro);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ir),o=sr.dot(this.direction),c=-sr.dot(ir),l=sr.lengthSq(),f=Math.abs(1-a*a);let m,d,g,_;if(f>0)if(m=a*c-o,d=a*o-c,_=r*f,m>=0)if(d>=-_)if(d<=_){const E=1/f;m*=E,d*=E,g=m*(m+a*d+2*o)+d*(a*m+d+2*c)+l}else d=r,m=Math.max(0,-(a*d+o)),g=-m*m+d*(d+2*c)+l;else d=-r,m=Math.max(0,-(a*d+o)),g=-m*m+d*(d+2*c)+l;else d<=-_?(m=Math.max(0,-(-a*r+o)),d=m>0?-r:Math.min(Math.max(-r,-c),r),g=-m*m+d*(d+2*c)+l):d<=_?(m=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(m=Math.max(0,-(a*r+o)),d=m>0?r:Math.min(Math.max(-r,-c),r),g=-m*m+d*(d+2*c)+l);else d=a>0?-r:r,m=Math.max(0,-(a*d+o)),g=-m*m+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(ro).addScaledVector(ir,d),g}intersectSphere(e,t){if(e.radius<0)return null;Jn.subVectors(e.center,this.origin);const n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,m=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),f>=0?(r=(e.min.y-d.y)*f,a=(e.max.y-d.y)*f):(r=(e.max.y-d.y)*f,a=(e.min.y-d.y)*f),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(e.min.z-d.z)*m,c=(e.max.z-d.z)*m):(o=(e.max.z-d.z)*m,c=(e.min.z-d.z)*m),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,f=o.z,m=e.x-a.x,d=e.y-a.y,g=e.z-a.z,_=t.x-a.x,E=t.y-a.y,h=t.z-a.z,p=n.x-a.x,M=n.y-a.y,A=n.z-a.z,b=Math.abs(c),w=Math.abs(l),x=Math.abs(f);let u,S,F,P,C,I,B,L,V,U,W,le;if(b>=w&&b>=x?(F=c,I=m,V=_,le=p,c>=0?(u=l,S=f,P=d,C=g,B=E,L=h,U=M,W=A):(u=f,S=l,P=g,C=d,B=h,L=E,U=A,W=M)):w>=x?(F=l,I=d,V=E,le=M,l>=0?(u=f,S=c,P=g,C=m,B=h,L=_,U=A,W=p):(u=c,S=f,P=m,C=g,B=_,L=h,U=p,W=A)):(F=f,I=g,V=h,le=A,f>=0?(u=c,S=l,P=m,C=d,B=_,L=E,U=p,W=M):(u=l,S=c,P=d,C=m,B=E,L=_,U=M,W=p)),F===0)return null;const J=u/F,j=S/F,ce=1/F,Se=P-J*I,we=C-j*I,ee=B-J*V,me=L-j*V,Re=U-J*le,De=W-j*le,de=Re*me-De*ee,Be=Se*De-we*Re,yt=ee*we-me*Se;if(s){if(de<0||Be<0||yt<0)return null}else if((de<0||Be<0||yt<0)&&(de>0||Be>0||yt>0))return null;const ke=de+Be+yt;if(ke===0)return null;const ht=ce*(de*I+Be*V+yt*le);return(ke>0?ht<0:ht>0)?null:this.at(ht/ke,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gn extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tl=new gt,wi=new ps,rr=new vi,Al=new z,ar=new z,or=new z,lr=new z,ao=new z,cr=new z,wl=new z,ur=new z;class Mt extends Ot{constructor(e=new Zt,t=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const f=o[c],m=r[c];f!==0&&(ao.fromBufferAttribute(m,e),a?cr.addScaledVector(ao,f):cr.addScaledVector(ao.sub(t),f))}t.add(cr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(rr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(rr,Al)===null||wi.origin.distanceToSquared(Al)>(e.far-e.near)**2))&&(Tl.copy(r).invert(),wi.copy(e.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,f=r.attributes.uv1,m=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const h=d[_],p=a[h.materialIndex],M=Math.max(h.start,g.start),A=Math.min(o.count,Math.min(h.start+h.count,g.start+g.count));for(let b=M,w=A;b<w;b+=3){const x=o.getX(b),u=o.getX(b+1),S=o.getX(b+2);s=hr(this,p,e,n,l,f,m,x,u,S),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let h=_,p=E;h<p;h+=3){const M=o.getX(h),A=o.getX(h+1),b=o.getX(h+2);s=hr(this,a,e,n,l,f,m,M,A,b),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,E=d.length;_<E;_++){const h=d[_],p=a[h.materialIndex],M=Math.max(h.start,g.start),A=Math.min(c.count,Math.min(h.start+h.count,g.start+g.count));for(let b=M,w=A;b<w;b+=3){const x=b,u=b+1,S=b+2;s=hr(this,p,e,n,l,f,m,x,u,S),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(c.count,g.start+g.count);for(let h=_,p=E;h<p;h+=3){const M=h,A=h+1,b=h+2;s=hr(this,a,e,n,l,f,m,M,A,b),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}}}function Ah(i,e,t,n,s,r,a,o){let c;if(e.side===an?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===mi,o),c===null)return null;ur.copy(o),ur.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ur);return l<t.near||l>t.far?null:{distance:l,point:ur.clone(),object:i}}function hr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ar),i.getVertexPosition(c,or),i.getVertexPosition(l,lr);const f=Ah(i,e,t,n,ar,or,lr,wl);if(f){const m=new z;vn.getBarycoord(wl,ar,or,lr,m),s&&(f.uv=vn.getInterpolatedAttribute(s,o,c,l,m,new Ke)),r&&(f.uv1=vn.getInterpolatedAttribute(r,o,c,l,m,new Ke)),a&&(f.normal=vn.getInterpolatedAttribute(a,o,c,l,m,new z),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new z,materialIndex:0};vn.getNormal(ar,or,lr,d.normal),f.face=d,f.barycoord=m}return f}class $o extends Kt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Yt,f=Yt,m,d){super(null,a,o,c,l,f,s,r,m,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xo extends on{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qi=new gt,Rl=new gt,dr=[],Cl=new xi,wh=new gt,Es=new Mt,bs=new vi;class Jo extends Mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),Cl.copy(e.boundingBox).applyMatrix4(Qi),this.boundingBox.union(Cl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),bs.copy(e.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(bs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bs.copy(this.boundingSphere),bs.applyMatrix4(n),e.ray.intersectsSphere(bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Qi),Rl.multiplyMatrices(n,Qi),Es.matrixWorld=Rl,Es.raycast(e,dr);for(let a=0,o=dr.length;a<o;a++){const c=dr[a];c.instanceId=r,c.object=this,t.push(c)}dr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new xo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new $o(new Float32Array(s*this.count),s,this.count,wa,Mn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ri=new vi,Rh=new Ke(.5,.5),fr=new z;class us{constructor(e=new zn,t=new zn,n=new zn,s=new zn,r=new zn,a=new zn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],f=r[4],m=r[5],d=r[6],g=r[7],_=r[8],E=r[9],h=r[10],p=r[11],M=r[12],A=r[13],b=r[14],w=r[15];if(s[0].setComponents(l-a,g-f,p-_,w-M).normalize(),s[1].setComponents(l+a,g+f,p+_,w+M).normalize(),s[2].setComponents(l+o,g+m,p+E,w+A).normalize(),s[3].setComponents(l-o,g-m,p-E,w-A).normalize(),n)s[4].setComponents(c,d,h,b).normalize(),s[5].setComponents(l-c,g-d,p-h,w-b).normalize();else if(s[4].setComponents(l-c,g-d,p-h,w-b).normalize(),t===Sn)s[5].setComponents(l+c,g+d,p+h,w+b).normalize();else if(t===cs)s[5].setComponents(c,d,h,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);const t=Rh.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(fr.x=s.normal.x>0?e.max.x:e.min.x,fr.y=s.normal.y>0?e.max.y:e.min.y,fr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Pl=new gt;class Na{constructor(){this.coordinateSystem=Sn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Pl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new us),n[s].setFromProjectionMatrix(Pl,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new us),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new Na().copy(this)}}class Qo extends Mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _a=new z,xa=new z,Dl=new gt,Ts=new ps,pr=new vi,oo=new z,Ll=new z;class au extends Ot{constructor(e=new Zt,t=new Qo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)_a.fromBufferAttribute(t,s-1),xa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=_a.distanceTo(xa);e.setAttribute("lineDistance",new wt(n,1))}else $e("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,e.ray.intersectsSphere(pr)===!1)return;Dl.copy(s).invert(),Ts.copy(e.ray).applyMatrix4(Dl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,f=n.index,d=n.attributes.position;if(f!==null){const g=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let E=g,h=_-1;E<h;E+=l){const p=f.getX(E),M=f.getX(E+1),A=mr(this,e,Ts,c,p,M,E);A&&t.push(A)}if(this.isLineLoop){const E=f.getX(_-1),h=f.getX(g),p=mr(this,e,Ts,c,E,h,_-1);p&&t.push(p)}}else{const g=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let E=g,h=_-1;E<h;E+=l){const p=mr(this,e,Ts,c,E,E+1,E);p&&t.push(p)}if(this.isLineLoop){const E=mr(this,e,Ts,c,_-1,g,_-1);E&&t.push(E)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(_a.fromBufferAttribute(o,s),xa.fromBufferAttribute(o,r),t.distanceSqToSegment(_a,xa,oo,Ll)>n)return;oo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(oo);if(!(l<e.near||l>e.far))return{distance:l,point:Ll.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Il=new z,Nl=new z;class ou extends au{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Il.fromBufferAttribute(t,s),Nl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Il.distanceTo(Nl);e.setAttribute("lineDistance",new wt(n,1))}else $e("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jo extends Mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ul=new gt,vo=new ps,gr=new vi,_r=new z;class lu extends Ot{constructor(e=new Zt,t=new jo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(s),gr.radius+=r,e.ray.intersectsSphere(gr)===!1)return;Ul.copy(s).invert(),vo.copy(e.ray).applyMatrix4(Ul);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,m=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let _=d,E=g;_<E;_++){const h=l.getX(_);_r.fromBufferAttribute(m,h),Fl(_r,h,c,s,e,t,this)}}else{const d=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let _=d,E=g;_<E;_++)_r.fromBufferAttribute(m,_),Fl(_r,_,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fl(i,e,t,n,s,r,a){const o=vo.distanceSqToPoint(i);if(o<t){const c=new z;vo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class el extends Kt{constructor(e=[],t=Ni,n,s,r,a,o,c,l,f){super(e,t,n,s,r,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mo extends Kt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fi extends Kt{constructor(e,t,n=Dn,s,r,a,o=Yt,c=Yt,l,f=si,m=1){if(f!==si&&f!==ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:m};super(d,s,r,a,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Da(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class tl extends Fi{constructor(e,t=Dn,n=Ni,s,r,a=Yt,o=Yt,c,l=si){const f={width:e,height:e,depth:1},m=[f,f,f,f,f,f];super(e,e,t,n,s,r,a,o,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class nl extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ht extends Zt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],f=[],m=[];let d=0,g=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(f,3)),this.setAttribute("uv",new wt(m,2));function _(E,h,p,M,A,b,w,x,u,S,F){const P=b/u,C=w/S,I=b/2,B=w/2,L=x/2,V=u+1,U=S+1;let W=0,le=0;const J=new z;for(let j=0;j<U;j++){const ce=j*C-B;for(let Se=0;Se<V;Se++){const we=Se*P-I;J[E]=we*M,J[h]=ce*A,J[p]=L,l.push(J.x,J.y,J.z),J[E]=0,J[h]=0,J[p]=x>0?1:-1,f.push(J.x,J.y,J.z),m.push(Se/u),m.push(1-j/S),W+=1}}for(let j=0;j<S;j++)for(let ce=0;ce<u;ce++){const Se=d+ce+V*j,we=d+ce+V*(j+1),ee=d+(ce+1)+V*(j+1),me=d+(ce+1)+V*j;c.push(Se,we,me),c.push(we,ee,me),le+=6}o.addGroup(g,le,F),g+=le,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yn extends Zt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const f=[],m=[],d=[],g=[];let _=0;const E=[],h=n/2;let p=0;M(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(f),this.setAttribute("position",new wt(m,3)),this.setAttribute("normal",new wt(d,3)),this.setAttribute("uv",new wt(g,2));function M(){const b=new z,w=new z;let x=0;const u=(t-e)/n;for(let S=0;S<=r;S++){const F=[],P=S/r,C=P*(t-e)+e;for(let I=0;I<=s;I++){const B=I/s,L=B*c+o,V=Math.sin(L),U=Math.cos(L);w.x=C*V,w.y=-P*n+h,w.z=C*U,m.push(w.x,w.y,w.z),b.set(V,u,U).normalize(),d.push(b.x,b.y,b.z),g.push(B,1-P),F.push(_++)}E.push(F)}for(let S=0;S<s;S++)for(let F=0;F<r;F++){const P=E[F][S],C=E[F+1][S],I=E[F+1][S+1],B=E[F][S+1];(e>0||F!==0)&&(f.push(P,C,B),x+=3),(t>0||F!==r-1)&&(f.push(C,I,B),x+=3)}l.addGroup(p,x,0),p+=x}function A(b){const w=_,x=new Ke,u=new z;let S=0;const F=b===!0?e:t,P=b===!0?1:-1;for(let I=1;I<=s;I++)m.push(0,h*P,0),d.push(0,P,0),g.push(.5,.5),_++;const C=_;for(let I=0;I<=s;I++){const L=I/s*c+o,V=Math.cos(L),U=Math.sin(L);u.x=F*U,u.y=h*P,u.z=F*V,m.push(u.x,u.y,u.z),d.push(0,P,0),x.x=V*.5+.5,x.y=U*.5*P+.5,g.push(x.x,x.y),_++}for(let I=0;I<s;I++){const B=w+I,L=C+I;b===!0?f.push(L,L+1,B):f.push(L+1,L,B),S+=3}l.addGroup(p,S,b===!0?1:2),p+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vn extends yn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Vn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ua extends Zt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),f(),this.setAttribute("position",new wt(r,3)),this.setAttribute("normal",new wt(r.slice(),3)),this.setAttribute("uv",new wt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const A=new z,b=new z,w=new z;for(let x=0;x<t.length;x+=3)g(t[x+0],A),g(t[x+1],b),g(t[x+2],w),c(A,b,w,M)}function c(M,A,b,w){const x=w+1,u=[];for(let S=0;S<=x;S++){u[S]=[];const F=M.clone().lerp(b,S/x),P=A.clone().lerp(b,S/x),C=x-S;for(let I=0;I<=C;I++)I===0&&S===x?u[S][I]=F:u[S][I]=F.clone().lerp(P,I/C)}for(let S=0;S<x;S++)for(let F=0;F<2*(x-S)-1;F++){const P=Math.floor(F/2);F%2===0?(d(u[S][P+1]),d(u[S+1][P]),d(u[S][P])):(d(u[S][P+1]),d(u[S+1][P+1]),d(u[S+1][P]))}}function l(M){const A=new z;for(let b=0;b<r.length;b+=3)A.x=r[b+0],A.y=r[b+1],A.z=r[b+2],A.normalize().multiplyScalar(M),r[b+0]=A.x,r[b+1]=A.y,r[b+2]=A.z}function f(){const M=new z;for(let A=0;A<r.length;A+=3){M.x=r[A+0],M.y=r[A+1],M.z=r[A+2];const b=h(M)/2/Math.PI+.5,w=p(M)/Math.PI+.5;a.push(b,1-w)}_(),m()}function m(){for(let M=0;M<a.length;M+=6){const A=a[M+0],b=a[M+2],w=a[M+4],x=Math.max(A,b,w),u=Math.min(A,b,w);x>.9&&u<.1&&(A<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function g(M,A){const b=M*3;A.x=e[b+0],A.y=e[b+1],A.z=e[b+2]}function _(){const M=new z,A=new z,b=new z,w=new z,x=new Ke,u=new Ke,S=new Ke;for(let F=0,P=0;F<r.length;F+=9,P+=6){M.set(r[F+0],r[F+1],r[F+2]),A.set(r[F+3],r[F+4],r[F+5]),b.set(r[F+6],r[F+7],r[F+8]),x.set(a[P+0],a[P+1]),u.set(a[P+2],a[P+3]),S.set(a[P+4],a[P+5]),w.copy(M).add(A).add(b).divideScalar(3);const C=h(w);E(x,P+0,M,C),E(u,P+2,A,C),E(S,P+4,b,C)}}function E(M,A,b,w){w<0&&M.x===1&&(a[A]=M.x-1),b.x===0&&b.z===0&&(a[A]=w/2/Math.PI+.5)}function h(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ua(e.vertices,e.indices,e.radius,e.detail)}}class Fa extends Ua{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Fa(e.radius,e.detail)}}class ri extends Zt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,f=c+1,m=e/o,d=t/c,g=[],_=[],E=[],h=[];for(let p=0;p<f;p++){const M=p*d-a;for(let A=0;A<l;A++){const b=A*m-r;_.push(b,-M,0),E.push(0,0,1),h.push(A/o),h.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const A=M+l*p,b=M+l*(p+1),w=M+1+l*(p+1),x=M+1+l*p;g.push(A,b,x),g.push(b,w,x)}this.setIndex(g),this.setAttribute("position",new wt(_,3)),this.setAttribute("normal",new wt(E,3)),this.setAttribute("uv",new wt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ws extends Zt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],f=[];let m=e;const d=(t-e)/s,g=new z,_=new Ke;for(let E=0;E<=s;E++){for(let h=0;h<=n;h++){const p=r+h/n*a;g.x=m*Math.cos(p),g.y=m*Math.sin(p),c.push(g.x,g.y,g.z),l.push(0,0,1),_.x=(g.x/t+1)/2,_.y=(g.y/t+1)/2,f.push(_.x,_.y)}m+=d}for(let E=0;E<s;E++){const h=E*(n+1);for(let p=0;p<n;p++){const M=p+h,A=M,b=M+n+1,w=M+n+2,x=M+1;o.push(A,b,x),o.push(b,w,x)}}this.setIndex(o),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(l,3)),this.setAttribute("uv",new wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pi extends Zt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const f=[],m=new z,d=new z,g=[],_=[],E=[],h=[];for(let p=0;p<=n;p++){const M=[],A=p/n,b=a+A*o,w=e*Math.cos(b),x=Math.sqrt(e*e-w*w);let u=0;p===0&&a===0?u=.5/t:p===n&&c===Math.PI&&(u=-.5/t);for(let S=0;S<=t;S++){const F=S/t,P=s+F*r;m.x=-x*Math.cos(P),m.y=w,m.z=x*Math.sin(P),_.push(m.x,m.y,m.z),d.copy(m).normalize(),E.push(d.x,d.y,d.z),h.push(F+u,1-A),M.push(l++)}f.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const A=f[p][M+1],b=f[p][M],w=f[p+1][M],x=f[p+1][M+1];(p!==0||a>0)&&g.push(A,b,x),(p!==n-1||c<Math.PI)&&g.push(b,w,x)}this.setIndex(g),this.setAttribute("position",new wt(_,3)),this.setAttribute("normal",new wt(E,3)),this.setAttribute("uv",new wt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ii extends Zt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],f=[],m=[],d=new z,g=new z,_=new z;for(let E=0;E<=n;E++){const h=a+E/n*o;for(let p=0;p<=s;p++){const M=p/s*r;g.x=(e+t*Math.cos(h))*Math.cos(M),g.y=(e+t*Math.cos(h))*Math.sin(M),g.z=t*Math.sin(h),l.push(g.x,g.y,g.z),d.x=e*Math.cos(M),d.y=e*Math.sin(M),_.subVectors(g,d).normalize(),f.push(_.x,_.y,_.z),m.push(p/s),m.push(E/n)}}for(let E=1;E<=n;E++)for(let h=1;h<=s;h++){const p=(s+1)*E+h-1,M=(s+1)*(E-1)+h-1,A=(s+1)*(E-1)+h,b=(s+1)*E+h;c.push(p,M,b),c.push(M,A,b)}this.setIndex(c),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(f,3)),this.setAttribute("uv",new wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function hs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Ol(s))s.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Ol(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function nn(i){const e={};for(let t=0;t<i.length;t++){const n=hs(i[t]);for(const s in n)e[s]=n[s]}return e}function Ol(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ch(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function cu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const uu={clone:hs,merge:nn};var Ph=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ph,this.fragmentShader=Dh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Ch(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new it().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new je().fromArray(s.value);break;case"m4":this.uniforms[n].value=new gt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class hu extends _i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ds extends Mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class du extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fu extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class il extends Ot{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class pu extends il{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const lo=new gt,Bl=new z,zl=new z;class mu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new us,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bl),zl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(lo,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===cs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(lo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xr=new z,vr=new hn,Un=new z;class sl extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xr,vr,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xr,vr,Un.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xr,vr,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xr,vr,Un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fi=new z,Gl=new Ke,Hl=new Ke;class xn extends sl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,Gl,Hl),t.subVectors(Hl,Gl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rl extends sl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Lh extends mu{constructor(){super(new rl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class So extends il{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new Lh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ji=-90,es=1;class va extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new xn(ji,es,e,t);s.layers=this.layers,this.add(s);const r=new xn(ji,es,e,t);r.layers=this.layers,this.add(r);const a=new xn(ji,es,e,t);a.layers=this.layers,this.add(a);const o=new xn(ji,es,e,t);o.layers=this.layers,this.add(o);const c=new xn(ji,es,e,t);c.layers=this.layers,this.add(c);const l=new xn(ji,es,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,f]=this.children,m=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=E,e.setRenderTarget(n,5,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(m,d,g),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class gu extends xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}const kl=new gt;class _u{constructor(e,t,n=0,s=1/0){this.ray=new ps(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):vt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kl),this}intersectObject(e,t=!0,n=[]){return yo(e,this,n,t),n.sort(Vl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)yo(e[s],this,n,t);return n.sort(Vl),n}}function Vl(i,e){return i.distance-e.distance}function yo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)yo(r[a],e,t,!0)}}class Eo{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ct(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ct(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class xu extends ai{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Wl(i,e,t,n){const s=Ih(n);switch(t){case zo:return i*e;case wa:return i*e/s.components*s.byteLength;case Ra:return i*e/s.components*s.byteLength;case gi:return i*e*2/s.components*s.byteLength;case Ca:return i*e*2/s.components*s.byteLength;case Go:return i*e*3/s.components*s.byteLength;case Cn:return i*e*4/s.components*s.byteLength;case Pa:return i*e*4/s.components*s.byteLength;case Ds:case Ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Is:case Ns:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gr:case kr:return Math.max(i,16)*Math.max(e,8)/4;case zr:case Hr:return Math.max(i,8)*Math.max(e,8)/2;case Vr:case Wr:case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xr:case zs:case Zr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $r:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Jr:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Qr:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ea:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ta:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ia:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ra:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case aa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case oa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case la:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ca:case ua:case ha:return Math.ceil(i/4)*Math.ceil(e/4)*16;case da:case fa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gs:case pa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ih(i){switch(i){case un:case Uo:return{byteLength:1,components:1};case ls:case Fo:case Ln:return{byteLength:2,components:1};case Ta:case Aa:return{byteLength:2,components:4};case Dn:case ba:case Mn:return{byteLength:4,components:1};case Oo:case Bo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ya}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ya);function vu(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Nh(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,m=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),o.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:m}}function n(o,c,l){const f=c.array,m=c.updateRanges;if(i.bindBuffer(l,o),m.length===0)i.bufferSubData(l,0,f);else{m.sort((g,_)=>g.start-_.start);let d=0;for(let g=1;g<m.length;g++){const _=m[d],E=m[g];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++d,m[d]=E)}m.length=d+1;for(let g=0,_=m.length;g<_;g++){const E=m[g];i.bufferSubData(l,E.start*f.BYTES_PER_ELEMENT,f,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Uh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Oh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Wh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ed=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,td=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,sd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ud="gl_FragColor = linearToOutputTexel( gl_FragColor );",hd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,pd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_d=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ed=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Td=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ad=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,wd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ld=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Id=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fd=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Od=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zd=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$d=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,af=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,of=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,df=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ff=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_f=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Af=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Uf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bf=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ep=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,np=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ip=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ap=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:Uh,alphahash_pars_fragment:Fh,alphamap_fragment:Oh,alphamap_pars_fragment:Bh,alphatest_fragment:zh,alphatest_pars_fragment:Gh,aomap_fragment:Hh,aomap_pars_fragment:kh,batching_pars_vertex:Vh,batching_vertex:Wh,begin_vertex:Xh,beginnormal_vertex:qh,bsdfs:Yh,iridescence_fragment:Zh,bumpmap_pars_fragment:Kh,clipping_planes_fragment:$h,clipping_planes_pars_fragment:Jh,clipping_planes_pars_vertex:Qh,clipping_planes_vertex:jh,color_fragment:ed,color_pars_fragment:td,color_pars_vertex:nd,color_vertex:id,common:sd,defaultnormal_vertex:rd,displacementmap_pars_vertex:ad,displacementmap_vertex:od,emissivemap_fragment:ld,emissivemap_pars_fragment:cd,colorspace_fragment:ud,colorspace_pars_fragment:hd,envmap_fragment:dd,envmap_common_pars_fragment:fd,envmap_pars_fragment:pd,envmap_pars_vertex:md,envmap_physical_pars_fragment:Ad,envmap_vertex:gd,fog_vertex:_d,fog_pars_vertex:xd,fog_fragment:vd,fog_pars_fragment:Md,gradientmap_pars_fragment:Sd,lightmap_pars_fragment:yd,lights_lambert_fragment:Ed,lights_lambert_pars_fragment:bd,lights_pars_begin:Td,lights_toon_fragment:wd,lights_toon_pars_fragment:Rd,lights_phong_fragment:Cd,lights_phong_pars_fragment:Pd,lights_physical_fragment:Dd,lights_physical_pars_fragment:Ld,lights_fragment_begin:Id,lights_fragment_maps:Nd,lights_fragment_end:Ud,lightprobes_pars_fragment:Fd,logdepthbuf_fragment:Od,logdepthbuf_pars_fragment:Bd,logdepthbuf_pars_vertex:zd,logdepthbuf_vertex:Gd,map_fragment:Hd,map_pars_fragment:kd,map_particle_fragment:Vd,map_particle_pars_fragment:Wd,metalnessmap_fragment:Xd,metalnessmap_pars_fragment:qd,morphinstance_vertex:Yd,morphcolor_vertex:Zd,morphnormal_vertex:Kd,morphtarget_pars_vertex:$d,morphtarget_vertex:Jd,normal_fragment_begin:Qd,normal_fragment_maps:jd,normal_pars_fragment:ef,normal_pars_vertex:tf,normal_vertex:nf,normalmap_pars_fragment:sf,clearcoat_normal_fragment_begin:rf,clearcoat_normal_fragment_maps:af,clearcoat_pars_fragment:of,iridescence_pars_fragment:lf,opaque_fragment:cf,packing:uf,premultiplied_alpha_fragment:hf,project_vertex:df,dithering_fragment:ff,dithering_pars_fragment:pf,roughnessmap_fragment:mf,roughnessmap_pars_fragment:gf,shadowmap_pars_fragment:_f,shadowmap_pars_vertex:xf,shadowmap_vertex:vf,shadowmask_pars_fragment:Mf,skinbase_vertex:Sf,skinning_pars_vertex:yf,skinning_vertex:Ef,skinnormal_vertex:bf,specularmap_fragment:Tf,specularmap_pars_fragment:Af,tonemapping_fragment:wf,tonemapping_pars_fragment:Rf,transmission_fragment:Cf,transmission_pars_fragment:Pf,uv_pars_fragment:Df,uv_pars_vertex:Lf,uv_vertex:If,worldpos_vertex:Nf,background_vert:Uf,background_frag:Ff,backgroundCube_vert:Of,backgroundCube_frag:Bf,cube_vert:zf,cube_frag:Gf,depth_vert:Hf,depth_frag:kf,distance_vert:Vf,distance_frag:Wf,equirect_vert:Xf,equirect_frag:qf,linedashed_vert:Yf,linedashed_frag:Zf,meshbasic_vert:Kf,meshbasic_frag:$f,meshlambert_vert:Jf,meshlambert_frag:Qf,meshmatcap_vert:jf,meshmatcap_frag:ep,meshnormal_vert:tp,meshnormal_frag:np,meshphong_vert:ip,meshphong_frag:sp,meshphysical_vert:rp,meshphysical_frag:ap,meshtoon_vert:op,meshtoon_frag:lp,points_vert:cp,points_frag:up,shadow_vert:hp,shadow_frag:dp,sprite_vert:fp,sprite_frag:pp},Pe={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Rn={basic:{uniforms:nn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:nn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:nn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:nn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:nn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new it(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:nn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:nn([Pe.points,Pe.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:nn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:nn([Pe.common,Pe.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:nn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:nn([Pe.sprite,Pe.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:nn([Pe.common,Pe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:nn([Pe.lights,Pe.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};Rn.physical={uniforms:nn([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const Mr={r:0,b:0,g:0},mp=new gt,Mu=new je;Mu.set(-1,0,0,0,1,0,0,0,1);function gp(i,e,t,n,s,r){const a=new it(0);let o=s===!0?0:1,c,l,f=null,m=0,d=null;function g(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){const b=M.backgroundBlurriness>0;A=e.get(A,b)}return A}function _(M){let A=!1;const b=g(M);b===null?h(a,o):b&&b.isColor&&(h(b,1),A=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(M,A){const b=g(A);b&&b.isCubeTexture?(l===void 0&&(l=new Mt(new Ht(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:hs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,x,u){this.matrixWorld.copyPosition(u.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(mp.makeRotationFromEuler(A.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Mu),l.material.toneMapped=pt.getTransfer(b.colorSpace)!==bt,(f!==b||m!==b.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=b,m=b.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Mt(new ri(2,2),new _i({name:"BackgroundMaterial",uniforms:hs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=pt.getTransfer(b.colorSpace)!==bt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||m!==b.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=b,m=b.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function h(M,A){M.getRGB(Mr,cu(i)),t.buffers.color.setClear(Mr.r,Mr.g,Mr.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),o=A,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,h(a,o)},render:_,addToRenderList:E,dispose:p}}function _p(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(C,I,B,L,V){let U=!1;const W=m(C,L,B,I);r!==W&&(r=W,l(r.object)),U=g(C,L,B,V),U&&_(C,L,B,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,b(C,I,B,L),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function f(C){return i.deleteVertexArray(C)}function m(C,I,B,L){const V=L.wireframe===!0;let U=n[I.id];U===void 0&&(U={},n[I.id]=U);const W=C.isInstancedMesh===!0?C.id:0;let le=U[W];le===void 0&&(le={},U[W]=le);let J=le[B.id];J===void 0&&(J={},le[B.id]=J);let j=J[V];return j===void 0&&(j=d(c()),J[V]=j),j}function d(C){const I=[],B=[],L=[];for(let V=0;V<t;V++)I[V]=0,B[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:L,object:C,attributes:{},index:null}}function g(C,I,B,L){const V=r.attributes,U=I.attributes;let W=0;const le=B.getAttributes();for(const J in le)if(le[J].location>=0){const ce=V[J];let Se=U[J];if(Se===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(Se=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(Se=C.instanceColor)),ce===void 0||ce.attribute!==Se||Se&&ce.data!==Se.data)return!0;W++}return r.attributesNum!==W||r.index!==L}function _(C,I,B,L){const V={},U=I.attributes;let W=0;const le=B.getAttributes();for(const J in le)if(le[J].location>=0){let ce=U[J];ce===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor));const Se={};Se.attribute=ce,ce&&ce.data&&(Se.data=ce.data),V[J]=Se,W++}r.attributes=V,r.attributesNum=W,r.index=L}function E(){const C=r.newAttributes;for(let I=0,B=C.length;I<B;I++)C[I]=0}function h(C){p(C,0)}function p(C,I){const B=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;B[C]=1,L[C]===0&&(i.enableVertexAttribArray(C),L[C]=1),V[C]!==I&&(i.vertexAttribDivisor(C,I),V[C]=I)}function M(){const C=r.newAttributes,I=r.enabledAttributes;for(let B=0,L=I.length;B<L;B++)I[B]!==C[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function A(C,I,B,L,V,U,W){W===!0?i.vertexAttribIPointer(C,I,B,V,U):i.vertexAttribPointer(C,I,B,L,V,U)}function b(C,I,B,L){E();const V=L.attributes,U=B.getAttributes(),W=I.defaultAttributeValues;for(const le in U){const J=U[le];if(J.location>=0){let j=V[le];if(j===void 0&&(le==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),le==="instanceColor"&&C.instanceColor&&(j=C.instanceColor)),j!==void 0){const ce=j.normalized,Se=j.itemSize,we=e.get(j);if(we===void 0)continue;const ee=we.buffer,me=we.type,Re=we.bytesPerElement,De=me===i.INT||me===i.UNSIGNED_INT||j.gpuType===ba;if(j.isInterleavedBufferAttribute){const de=j.data,Be=de.isInterleavedBuffer===!0?de.stride:de.itemSize,yt=j.offset;if(de.isInstancedInterleavedBuffer||de.isInstancedBufferAttribute){for(let ke=0;ke<J.locationSize;ke++)p(J.location+ke,de.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ke=0;ke<J.locationSize;ke++)h(J.location+ke);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let ke=0;ke<J.locationSize;ke++)A(J.location+ke,Se/J.locationSize,me,ce,Be*Re,(yt+Se/J.locationSize*ke)*Re,De)}else{if(j.isInstancedBufferAttribute){for(let de=0;de<J.locationSize;de++)p(J.location+de,j.meshPerAttribute);C.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let de=0;de<J.locationSize;de++)h(J.location+de);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let de=0;de<J.locationSize;de++)A(J.location+de,Se/J.locationSize,me,ce,Se*Re,Se/J.locationSize*de*Re,De)}}else if(W!==void 0){const ce=W[le];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(J.location,ce);break;case 3:i.vertexAttrib3fv(J.location,ce);break;case 4:i.vertexAttrib4fv(J.location,ce);break;default:i.vertexAttrib1fv(J.location,ce)}}}}M()}function w(){F();for(const C in n){const I=n[C];for(const B in I){const L=I[B];for(const V in L){const U=L[V];for(const W in U)f(U[W].object),delete U[W];delete L[V]}}delete n[C]}}function x(C){if(n[C.id]===void 0)return;const I=n[C.id];for(const B in I){const L=I[B];for(const V in L){const U=L[V];for(const W in U)f(U[W].object),delete U[W];delete L[V]}}delete n[C.id]}function u(C){for(const I in n){const B=n[I];for(const L in B){const V=B[L];if(V[C.id]===void 0)continue;const U=V[C.id];for(const W in U)f(U[W].object),delete U[W];delete V[C.id]}}}function S(C){for(const I in n){const B=n[I],L=C.isInstancedMesh===!0?C.id:0,V=B[L];if(V!==void 0){for(const U in V){const W=V[U];for(const le in W)f(W[le].object),delete W[le];delete V[U]}delete B[L],Object.keys(B).length===0&&delete n[I]}}}function F(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:x,releaseStatesOfObject:S,releaseStatesOfProgram:u,initAttributes:E,enableAttribute:h,disableUnusedAttributes:M}}function xp(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let g=0;g<f;g++)d+=l[g];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function vp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const u=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(u){return!(u!==Cn&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(u){const S=u===Ln&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(u!==un&&u!==Mn&&!S&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(u){if(u==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";u="mediump"}return u==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&($e("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&m===!1;t.reversedDepthBuffer===!0&&m===!1&&$e("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&m===!0&&$e("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),x=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:h,maxAttributes:p,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:b,maxSamples:w,samples:x}}function Mp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new zn,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,d){const g=m.length!==0||d||n!==0||s;return s=d,n=m.length,g},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,d){t=f(m,d,0)},this.setState=function(m,d,g){const _=m.clippingPlanes,E=m.clipIntersection,h=m.clipShadows,p=i.get(m);if(!s||_===null||_.length===0||r&&!h)r?f(null):l();else{const M=r?0:n,A=M*4;let b=p.clippingState||null;c.value=b,b=f(_,d,A,g);for(let w=0;w!==A;++w)b[w]=t[w];p.clippingState=b,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(m,d,g,_){const E=m!==null?m.length:0;let h=null;if(E!==0){if(h=c.value,_!==!0||h===null){const p=g+E*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(h===null||h.length<p)&&(h=new Float32Array(p));for(let A=0,b=g;A!==E;++A,b+=4)a.copy(m[A]).applyMatrix4(M,o),a.normal.toArray(h,b),h[b+3]=a.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,h}}class Oa extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new el(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ht(5,5,5),r=new _i({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:Ii});r.uniforms.tEquirect.value=t;const a=new Mt(s,r),o=t.minFilter;return t.minFilter===ei&&(t.minFilter=rn),new va(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Xl=256,Sp=3,yp=20,Su=256,yu=16,Ep=3,bp=new z,Tp=new it;class Xs{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new va(1,10,null),this._boxMesh=new Mt(new Ht(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=bp}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),f=this._getSourceTarget(!0);t>0&&(f.texture.mipmapsAutoUpdate=!1);const m=c.autoClear,d=c.autoClearColor,g=c.autoClearDepth,_=c.autoClearStencil,E=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,E===null&&(e.background=c.getClearColor(Tp));const h=new va(n,s,f);return h.position.copy(o),h.update(c,e),c.autoClear=m,c.autoClearColor=d,c.autoClearDepth=g,c.autoClearStencil=_,e.background=E,t>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Xl,Qc(e))}_fromTexture(e,t){e.mapping===Ni||e.mapping===os?this._setSize(e.image.length===0?Xl:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=ql(e,!1,!1),n=Math.log2(e)-Sp;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ql(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ni||e.mapping===os?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Yl()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Ap(),this._integrationMaterial=wp());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/yu);for(let a=0;a<=n;a++){const o=Xs.lodToRoughness(a,n);if(a>n-Ep)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Su*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Rp());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function ql(i,e,t){return new Oa(i,{minFilter:ei,generateMipmaps:e,type:Ln,colorSpace:Hs,depthBuffer:t})}function qs(i,e,t){return new _i({name:i,uniforms:e,vertexShader:at.cube_vert,fragmentShader:t,side:an,blending:Ii,depthTest:!1,depthWrite:!1})}function Ap(){return qs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Su}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function wp(){return qs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Rp(){return qs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${yp}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Yl(){return qs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Zl(){return qs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Cp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===br||g===Tr)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const E=new Oa(_.height);return E.fromEquirectangularTexture(i,d),e.set(d,E),d.addEventListener("dispose",l),o(E.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const g=d.mapping,_=g===br||g===Tr,E=g===Ni||g===os;if(_||E){let h=t.get(d);const p=h!==void 0?h.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Xs(i)),h=_?n.fromEquirectangular(d,h):n.fromCubemap(d,h),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),h.texture;if(h!==void 0)return h.texture;{const M=d.image;return _&&M&&M.height>0||E&&M&&c(M)?(n===null&&(n=new Xs(i)),h=_?n.fromEquirectangular(d):n.fromCubemap(d),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),d.addEventListener("dispose",f),h.texture):null}}}return d}function o(d,g){return g===br?d.mapping=Ni:g===Tr&&(d.mapping=os),d}function c(d){let g=0;const _=6;for(let E=0;E<_;E++)d[E]!==void 0&&g++;return g===_}function l(d){const g=d.target;g.removeEventListener("dispose",l);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function f(d){const g=d.target;g.removeEventListener("dispose",f);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function Pp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Us("WebGLRenderer: "+n+" extension not supported."),s}}}function Dp(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){c(_.target)}function c(_){_.index!==null&&e.remove(_.index);for(const h in _.attributes)e.remove(_.attributes[h]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const E=r.get(_);E&&(e.remove(E),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function l(_,E){return s[E.id]!==void 0||(E.addEventListener("dispose",o),s[E.id]=new WeakRef(E),a.register(E,E.id,E),t.memory.geometries++),E}function f(_){const E=_.attributes;for(const h in E)e.update(E[h],i.ARRAY_BUFFER)}function m(_){const E=_.index,h=_.attributes.position;let p=0;if(h===void 0)return;const M=E!==null?E.array.length:h.array.length/3-1,A=h.count>=65535?Ko:Zo,b=new A(Math.ceil(M/3)*6,1),w=b.array;if(E!==null){const u=E.array;p=E.version;for(let S=0,F=0;S<M;S+=3){const P=u[S+0],C=u[S+1],I=u[S+2];w[F++]=P,w[F++]=C,w[F++]=C,w[F++]=I,w[F++]=I,w[F++]=P}}else{p=h.version;for(let u=0,S=0;u<M;u+=3){const F=u+0,P=u+1,C=u+2;w[S++]=F,w[S++]=P,w[S++]=P,w[S++]=C,w[S++]=C,w[S++]=F}}b.version=p;const x=r.get(_);x&&e.remove(x),r.set(_,b)}function d(_){const E=r.get(_);if(E){const h=_.index;h!==null&&E.version<h.version&&m(_)}else m(_);return r.get(_)}function g(){for(const _ in s){const E=s[_].deref();E!==void 0&&c(E)}}return{get:l,update:f,getWireframeAttribute:d,dispose:g}}function Lp(i,e,t){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function c(m,d){i.drawElements(n,d,r,m*a),t.update(d,n,1)}function l(m,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,m*a,g),t.update(d,n,g))}function f(m,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,m,0,g);let E=0;for(let h=0;h<g;h++)E+=d[h];t.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function Ip(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Np(i,e,t){const n=new WeakMap,s=new Dt;function r(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=f!==void 0?f.length:0;let d=n.get(o);if(d===void 0||d.count!==m){let F=function(){u.dispose(),n.delete(o),o.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let A=0;g===!0&&(A=1),_===!0&&(A=2),E===!0&&(A=3);let b=o.attributes.position.count*A,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const x=new Float32Array(b*w*4*m),u=new Yo(x,b,w,m);u.type=Mn,u.needsUpdate=!0;const S=A*4;for(let P=0;P<m;P++){const C=h[P],I=p[P],B=M[P],L=b*w*4*P;for(let V=0;V<C.count;V++){const U=V*S;g===!0&&(s.fromBufferAttribute(C,V),x[L+U+0]=s.x,x[L+U+1]=s.y,x[L+U+2]=s.z,x[L+U+3]=0),_===!0&&(s.fromBufferAttribute(I,V),x[L+U+4]=s.x,x[L+U+5]=s.y,x[L+U+6]=s.z,x[L+U+7]=0),E===!0&&(s.fromBufferAttribute(B,V),x[L+U+8]=s.x,x[L+U+9]=s.y,x[L+U+10]=s.z,x[L+U+11]=B.itemSize===4?s.w:1)}}d={count:m,texture:u,size:new Ke(b,w)},n.set(o,d),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let E=0;E<l.length;E++)g+=l[E];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Up(i,e,t,n,s){let r=new WeakMap;function a(l){const f=s.render.frame,m=l.geometry,d=e.get(l,m);if(r.get(d)!==f&&(e.update(d),r.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,f))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==f&&(g.update(),r.set(g,f))}return d}function o(){r=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const Fp={[Ro]:"LINEAR_TONE_MAPPING",[Co]:"REINHARD_TONE_MAPPING",[Po]:"CINEON_TONE_MAPPING",[Ea]:"ACES_FILMIC_TONE_MAPPING",[Lo]:"AGX_TONE_MAPPING",[Io]:"NEUTRAL_TONE_MAPPING",[Do]:"CUSTOM_TONE_MAPPING"};function Op(i,e,t,n,s,r){const a=new Pn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const f=new Zt;f.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new wt([0,2,0,0,2,0],2));const m=new hu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Mt(f,m),g=new rl(-1,1,1,-1,0,1);let _=null,E=null,h=!1,p,M=null,A=[],b=!1;this.setSize=function(w,x){a.setSize(w,x),o!==null&&o.setSize(w,x),c!==null&&c.setSize(w,x);for(let u=0;u<A.length;u++){const S=A[u];S.setSize&&S.setSize(w,x)}},this.setEffects=function(w){A=w,b=A.length>0&&A[0].isRenderPass===!0;const x=a.width,u=a.height;A.length>0&&o===null&&(o=new Pn(x,u,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new Pn(x,u,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));const S=s===!0&&A.some(F=>F.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&l===null&&(l=new Fi(x,u),r===!0&&(l.format=ti,l.type=Ui)),a.dispose(),a.depthTexture=S?l:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let F=0;F<A.length;F++){const P=A[F];P.setSize&&P.setSize(x,u),S&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(w,x){if(h||w.toneMapping===kn&&A.length===0)return!1;if(M=x,x!==null){const u=x.width,S=x.height;(a.width!==u||a.height!==S)&&this.setSize(u,S)}return b===!1&&w.setRenderTarget(a),p=w.toneMapping,w.toneMapping=kn,!0},this.hasRenderPass=function(){return b},this.end=function(w,x){w.toneMapping=p,h=!0;let u=a,S=o;for(let F=0;F<A.length;F++){const P=A[F];P.enabled!==!1&&(P.render(w,S,u,x),P.needsSwap!==!1&&(u=S,S=S===o?c:o))}if(_!==w.outputColorSpace||E!==w.toneMapping){_=w.outputColorSpace,E=w.toneMapping,m.defines={},pt.getTransfer(_)===bt&&(m.defines.SRGB_TRANSFER="");const F=Fp[E];F&&(m.defines[F]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=u.texture,w.setRenderTarget(M),w.render(d,g),M=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),f.dispose(),m.dispose()}}const Eu=new Kt,bu=new Fi(1,1),Tu=new tl(1),Au=new Yo,wu=new iu,Ru=new el,Kl=[],$l=[],Jl=new Float32Array(16),Ql=new Float32Array(9),jl=new Float32Array(4);function ms(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Kl[s];if(r===void 0&&(r=new Float32Array(s),Kl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ba(i,e){let t=$l[e];t===void 0&&(t=new Int32Array(e),$l[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Bp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function kp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;jl.set(n),i.uniformMatrix2fv(this.addr,!1,jl),Vt(t,n)}}function Vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;Ql.set(n),i.uniformMatrix3fv(this.addr,!1,Ql),Vt(t,n)}}function Wp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(kt(t,n))return;Jl.set(n),i.uniformMatrix4fv(this.addr,!1,Jl),Vt(t,n)}}function Xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Kp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function Jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function za(i){return i.version===0&&(i.compareFunction=Vo,i.needsUpdate=!0),i}function jp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=za(bu):r=Eu,t.setTexture2D(e||r,s)}function em(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wu,s)}function tm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=za(Tu):r=Ru,t.setTextureCube(e||r,s)}function nm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Au,s)}function im(i){switch(i){case 5126:return Bp;case 35664:return zp;case 35665:return Gp;case 35666:return Hp;case 35674:return kp;case 35675:return Vp;case 35676:return Wp;case 5124:case 35670:return Xp;case 35667:case 35671:return qp;case 35668:case 35672:return Yp;case 35669:case 35673:return Zp;case 5125:return Kp;case 36294:return $p;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return jp;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return nm}}function sm(i,e){i.uniform1fv(this.addr,e)}function rm(i,e){const t=ms(e,this.size,2);i.uniform2fv(this.addr,t)}function am(i,e){const t=ms(e,this.size,3);i.uniform3fv(this.addr,t)}function om(i,e){const t=ms(e,this.size,4);i.uniform4fv(this.addr,t)}function lm(i,e){const t=ms(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cm(i,e){const t=ms(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function um(i,e){const t=ms(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function hm(i,e){i.uniform1iv(this.addr,e)}function dm(i,e){i.uniform2iv(this.addr,e)}function fm(i,e){i.uniform3iv(this.addr,e)}function pm(i,e){i.uniform4iv(this.addr,e)}function mm(i,e){i.uniform1uiv(this.addr,e)}function gm(i,e){i.uniform2uiv(this.addr,e)}function _m(i,e){i.uniform3uiv(this.addr,e)}function xm(i,e){i.uniform4uiv(this.addr,e)}function vm(i,e,t){const n=this.cache,s=e.length,r=Ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=za(bu):a=Eu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Mm(i,e,t){const n=this.cache,s=e.length,r=Ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wu,r[a])}function Sm(i,e,t){const n=this.cache,s=e.length,r=Ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=za(Tu):a=Ru;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function ym(i,e,t){const n=this.cache,s=e.length,r=Ba(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Au,r[a])}function Em(i){switch(i){case 5126:return sm;case 35664:return rm;case 35665:return am;case 35666:return om;case 35674:return lm;case 35675:return cm;case 35676:return um;case 5124:case 35670:return hm;case 35667:case 35671:return dm;case 35668:case 35672:return fm;case 35669:case 35673:return pm;case 5125:return mm;case 36294:return gm;case 36295:return _m;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return vm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return ym}}class bm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=im(t.type)}}class Tm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Em(t.type)}}class Am{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const co=/(\w+)(\])?(\[|\.)?/g;function ec(i,e){i.seq.push(e),i.map[e.id]=e}function wm(i,e,t){const n=i.name,s=n.length;for(co.lastIndex=0;;){const r=co.exec(n),a=co.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ec(t,l===void 0?new bm(o,i,e):new Tm(o,i,e));break}else{let m=t.map[o];m===void 0&&(m=new Am(o),ec(t,m)),t=m}}}class Cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);wm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function tc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Rm=37297;let Cm=0;function Pm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const nc=new je;function Dm(i){pt._getMatrix(nc,pt.workingColorSpace,i);const e=`mat3( ${nc.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case ks:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ic(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Pm(i.getShaderSource(e),o)}else return r}function Lm(i,e){const t=Dm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Im={[Ro]:"Linear",[Co]:"Reinhard",[Po]:"Cineon",[Ea]:"ACESFilmic",[Lo]:"AgX",[Io]:"Neutral",[Do]:"Custom"};function Nm(i,e){const t=Im[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sr=new z;function Um(){pt.getLuminanceCoefficients(Sr);const i=Sr.x.toFixed(4),e=Sr.y.toFixed(4),t=Sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function Om(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Bm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Cs(i){return i!==""}function sc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function rc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zm=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(i){return i.replace(zm,Gm)}function Gm(i,e){const t=at[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return bo(t)}const Hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ac(i){return i.replace(Hm,km)}function km(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Vm={[Ps]:"SHADOWMAP_TYPE_PCF",[ns]:"SHADOWMAP_TYPE_VSM"};function Wm(i){return Vm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Xm={[os]:"ENVMAP_MODE_REFRACTION"};function qm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ym={[wo]:"ENVMAP_BLENDING_MULTIPLY",[Bc]:"ENVMAP_BLENDING_MIX",[zc]:"ENVMAP_BLENDING_ADD"};function Zm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ym[i.combine]||"ENVMAP_BLENDING_NONE"}function Km(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Wm(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=qm(t),m=Zm(t),d=Fm(t),g=Om(r),_=s.createProgram();let E,h,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(E=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),E.length>0&&(E+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),h.length>0&&(h+=`
`)):(E=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),h=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+m:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?at.tonemapping_pars_fragment:"",t.toneMapping!==kn?Nm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,Lm("linearToOutputTexel",t.outputColorSpace),Um(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=bo(a),a=sc(a,t),a=rc(a,t),o=bo(o),o=sc(o,t),o=rc(o,t),a=ac(a),o=ac(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,E=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,h=["#define varying in",t.glslVersion===go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=p+E+a,A=p+h+o,b=tc(s,s.VERTEX_SHADER,M),w=tc(s,s.FRAGMENT_SHADER,A);s.attachShader(_,b),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function x(P){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(_)||"",I=s.getShaderInfoLog(b)||"",B=s.getShaderInfoLog(w)||"",L=C.trim(),V=I.trim(),U=B.trim();let W=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,w);else{const J=ic(s,b,"vertex"),j=ic(s,w,"fragment");vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+J+`
`+j)}else L!==""?$e("WebGLProgram: Program Info Log:",L):(V===""||U==="")&&(le=!1);le&&(P.diagnostics={runnable:W,programLog:L,vertexShader:{log:V,prefix:E},fragmentShader:{log:U,prefix:h}})}s.deleteShader(b),s.deleteShader(w),u=new Cr(s,_),S=Bm(s,_)}let u;this.getUniforms=function(){return u===void 0&&x(this),u};let S;this.getAttributes=function(){return S===void 0&&x(this),S};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(_,Rm)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=w,this}let $m=0;class Jm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Qm(e),t.set(e,n)),n}}class Qm{constructor(e){this.id=$m++,this.code=e,this.usedTimes=0}}function jm(i){return i===gi||i===zs||i===Gs}function eg(i,e,t,n,s,r){const a=new La,o=new Jm,c=new Set,l=[],f=new Map,m=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(u){return c.add(u),u===0?"uv":`uv${u}`}function _(u,S,F,P,C,I){const B=P.fog,L=C.geometry,V=u.isMeshStandardMaterial||u.isMeshLambertMaterial||u.isMeshPhongMaterial?P.environment:null,U=u.isMeshStandardMaterial||u.isMeshLambertMaterial&&!u.envMap||u.isMeshPhongMaterial&&!u.envMap,W=e.get(u.envMap||V,U),le=d[u.type];let J=n.precision;u.precision!==null&&(J=n.getMaxPrecision(u.precision),J!==u.precision&&$e("WebGLProgram.getParameters:",u.precision,"not supported, using",J,"instead."));const j=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ce=j!==void 0?j.length:0;let Se=0;L.morphAttributes.position!==void 0&&(Se=1),L.morphAttributes.normal!==void 0&&(Se=2),L.morphAttributes.color!==void 0&&(Se=3);let we,ee,me,Re;if(le){const fe=Rn[le];we=fe.vertexShader,ee=fe.fragmentShader}else{we=u.vertexShader,ee=u.fragmentShader;const fe=o.getVertexShaderStage(u),dt=o.getFragmentShaderStage(u);o.update(u,fe,dt),me=fe.id,Re=dt.id}const De=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Be=C.isInstancedMesh===!0,yt=C.isBatchedMesh===!0,ke=!!u.map,ht=!!u.matcap,_t=!!W,st=_t&&W.isPMREMTexture===!0,Ae=!!u.aoMap,Xe=!!u.lightMap,ot=!!u.bumpMap&&u.wireframe===!1,Ve=!!u.normalMap,mt=!!u.displacementMap,xt=!!u.emissiveMap,tt=!!u.metalnessMap,Tt=!!u.roughnessMap,Nt=u.anisotropy>0,H=u.clearcoat>0,Wt=u.diffuseRoughness>0,nt=u.dispersion>0,ze=u.retroreflectivity>0,Ee=u.iridescence>0,St=u.sheen>0,Oe=u.transmission>0,Ze=Nt&&!!u.anisotropyMap,D=H&&!!u.clearcoatMap,y=H&&!!u.clearcoatNormalMap,X=H&&!!u.clearcoatRoughnessMap,pe=Wt&&!!u.diffuseRoughnessMap,ne=Ee&&!!u.iridescenceMap,ge=Ee&&!!u.iridescenceThicknessMap,Me=St&&!!u.sheenColorMap,ie=St&&!!u.sheenRoughnessMap,re=!!u.specularMap,ye=!!u.specularColorMap,O=!!u.specularIntensityMap,se=Oe&&!!u.transmissionMap,Y=Oe&&!!u.thicknessMap,xe=!!u.gradientMap,ue=!!u.alphaMap,ve=u.alphaTest>0,He=!!u.alphaHash,Je=!!u.extensions;let _e=kn;u.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(_e=i.toneMapping);const Le=st?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,Ne={shaderID:le,shaderType:u.type,shaderName:u.name,vertexShader:we,fragmentShader:ee,defines:u.defines,customVertexShaderID:me,customFragmentShaderID:Re,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:J,batching:yt,batchingColor:yt&&C._colorsTexture!==null,instancing:Be,instancingColor:Be&&C.instanceColor!==null,instancingMorph:Be&&C.morphTexture!==null,outputColorSpace:De===null?i.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:pt.workingColorSpace,alphaToCoverage:!!u.alphaToCoverage,map:ke,matcap:ht,envMap:_t,envMapMode:_t&&W.mapping,envMapPMREM:st,envMapMaxLod:st?Le.length-1:null,envMapSize:st?Le[0].width:null,aoMap:Ae,lightMap:Xe,bumpMap:ot,normalMap:Ve,displacementMap:mt,emissiveMap:xt,normalMapObjectSpace:Ve&&u.normalMapType===kc,normalMapTangentSpace:Ve&&u.normalMapType===ma,packedNormalMap:Ve&&u.normalMapType===ma&&jm(u.normalMap.format),metalnessMap:tt,roughnessMap:Tt,anisotropy:Nt,anisotropyMap:Ze,clearcoat:H,clearcoatMap:D,clearcoatNormalMap:y,clearcoatRoughnessMap:X,diffuseRoughness:Wt,diffuseRoughnessMap:pe,dispersion:nt,retroreflection:ze,iridescence:Ee,iridescenceMap:ne,iridescenceThicknessMap:ge,sheen:St,sheenColorMap:Me,sheenRoughnessMap:ie,specularMap:re,specularColorMap:ye,specularIntensityMap:O,transmission:Oe,transmissionMap:se,thicknessMap:Y,gradientMap:xe,opaque:u.transparent===!1&&u.blending===is&&u.alphaToCoverage===!1,alphaMap:ue,alphaTest:ve,alphaHash:He,combine:u.combine,mapUv:ke&&g(u.map.channel),aoMapUv:Ae&&g(u.aoMap.channel),lightMapUv:Xe&&g(u.lightMap.channel),bumpMapUv:ot&&g(u.bumpMap.channel),normalMapUv:Ve&&g(u.normalMap.channel),displacementMapUv:mt&&g(u.displacementMap.channel),emissiveMapUv:xt&&g(u.emissiveMap.channel),metalnessMapUv:tt&&g(u.metalnessMap.channel),roughnessMapUv:Tt&&g(u.roughnessMap.channel),anisotropyMapUv:Ze&&g(u.anisotropyMap.channel),clearcoatMapUv:D&&g(u.clearcoatMap.channel),clearcoatNormalMapUv:y&&g(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&g(u.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pe&&g(u.diffuseRoughnessMap.channel),iridescenceMapUv:ne&&g(u.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&g(u.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&g(u.sheenColorMap.channel),sheenRoughnessMapUv:ie&&g(u.sheenRoughnessMap.channel),specularMapUv:re&&g(u.specularMap.channel),specularColorMapUv:ye&&g(u.specularColorMap.channel),specularIntensityMapUv:O&&g(u.specularIntensityMap.channel),transmissionMapUv:se&&g(u.transmissionMap.channel),thicknessMapUv:Y&&g(u.thicknessMap.channel),alphaMapUv:ue&&g(u.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ve||Nt),vertexNormals:!!L.attributes.normal,vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!L.attributes.uv&&(ke||ue),fog:!!B,useFog:u.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:u.wireframe===!1&&(u.flatShading===!0||L.attributes.normal===void 0&&Ve===!1&&(u.isMeshLambertMaterial||u.isMeshPhongMaterial||u.isMeshStandardMaterial||u.isMeshPhysicalMaterial)),sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:de,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:Se,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:I.filter(fe=>fe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:u.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:ke&&u.map.isVideoTexture===!0&&pt.getTransfer(u.map.colorSpace)===bt,decodeVideoTextureEmissive:xt&&u.emissiveMap.isVideoTexture===!0&&pt.getTransfer(u.emissiveMap.colorSpace)===bt,premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===jt,flipSided:u.side===an,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionClipCullDistance:Je&&u.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&u.extensions.multiDraw===!0||yt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function E(u){const S=[];if(u.shaderID?S.push(u.shaderID):(S.push(u.customVertexShaderID),S.push(u.customFragmentShaderID)),u.defines!==void 0)for(const F in u.defines)S.push(F),S.push(u.defines[F]);return u.isRawShaderMaterial===!1&&(h(S,u),p(S,u),S.push(i.outputColorSpace)),S.push(u.customProgramCacheKey),S.join()}function h(u,S){u.push(S.precision),u.push(S.outputColorSpace),u.push(S.envMapMode),u.push(S.envMapPMREM),u.push(S.envMapMaxLod),u.push(S.envMapSize),u.push(S.mapUv),u.push(S.alphaMapUv),u.push(S.lightMapUv),u.push(S.aoMapUv),u.push(S.bumpMapUv),u.push(S.normalMapUv),u.push(S.displacementMapUv),u.push(S.emissiveMapUv),u.push(S.metalnessMapUv),u.push(S.roughnessMapUv),u.push(S.anisotropyMapUv),u.push(S.clearcoatMapUv),u.push(S.clearcoatNormalMapUv),u.push(S.clearcoatRoughnessMapUv),u.push(S.diffuseRoughnessMapUv),u.push(S.iridescenceMapUv),u.push(S.iridescenceThicknessMapUv),u.push(S.sheenColorMapUv),u.push(S.sheenRoughnessMapUv),u.push(S.specularMapUv),u.push(S.specularColorMapUv),u.push(S.specularIntensityMapUv),u.push(S.transmissionMapUv),u.push(S.thicknessMapUv),u.push(S.combine),u.push(S.fogExp2),u.push(S.sizeAttenuation),u.push(S.morphTargetsCount),u.push(S.numSunLights),u.push(S.numDirLights),u.push(S.numPointLights),u.push(S.numSpotLights),u.push(S.numSpotLightMaps),u.push(S.numHemiLights),u.push(S.numRectAreaLights),u.push(S.numSunLightShadows),u.push(S.numDirLightShadows),u.push(S.numPointLightShadows),u.push(S.numSpotLightShadows),u.push(S.numSpotLightShadowsWithMaps),u.push(S.numLightProbes),u.push(S.numLightProbeGrids),u.push(S.shadowMapType),u.push(S.toneMapping),u.push(S.numClippingPlanes),u.push(S.numClipIntersection),u.push(S.depthPacking)}function p(u,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),u.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),u.push(a.mask)}function M(u){const S=d[u.type];let F;if(S){const P=Rn[S];F=uu.clone(P.uniforms)}else F=u.uniforms;return F}function A(u,S){let F=f.get(S);return F!==void 0?++F.usedTimes:(F=new Km(i,S,u,s),l.push(F),f.set(S,F)),F}function b(u){if(--u.usedTimes===0){const S=l.indexOf(u);l[S]=l[l.length-1],l.pop(),f.delete(u.cacheKey),u.destroy()}}function w(u){o.remove(u)}function x(){o.dispose()}return{getParameters:_,getProgramCacheKey:E,getUniforms:M,acquireProgram:A,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:x}}function tg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ng(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function lc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,_,E,h,p){let M=i[e];return M===void 0?(M={id:d.id,object:d,geometry:g,material:_,materialVariant:a(d),groupOrder:E,renderOrder:d.renderOrder,z:h,group:p},i[e]=M):(M.id=d.id,M.object=d,M.geometry=g,M.material=_,M.materialVariant=a(d),M.groupOrder=E,M.renderOrder=d.renderOrder,M.z=h,M.group=p),e++,M}function c(d,g,_,E,h,p,M){M.reversedDepth===!0&&(h=-h);const A=o(d,g,_,E,h,p);_.transmission>0?n.push(A):_.transparent===!0?s.push(A):t.push(A)}function l(d,g,_,E,h,p){const M=o(d,g,_,E,h,p);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):t.unshift(M)}function f(d,g){t.length>1&&t.sort(d||ng),n.length>1&&n.sort(g||lc),s.length>1&&s.sort(g||lc)}function m(){for(let d=e,g=i.length;d<g;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:m,sort:f}}function ig(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new cc,i.set(n,[a])):s>=r.length?(a=new cc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function sg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new it};break;case"SpotLight":t={position:new z,direction:new z,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function rg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ag=0;function og(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function lg(i){const e=new sg,t=rg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,r=new gt,a=new gt;function o(l){let f=0,m=0,d=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let g=0,_=0,E=0,h=0,p=0,M=0,A=0,b=0,w=0,x=0,u=0,S=0,F=0,P=0;l.sort(og);for(let I=0,B=l.length;I<B;I++){const L=l[I],V=L.color,U=L.intensity,W=L.distance;let le=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===gi?le=L.shadow.map.texture:le=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)f+=V.r*U,m+=V.g*U,d+=V.b*U;else if(L.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(L.sh.coefficients[J],U);P++}else if(L.isSunLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,ce=t.get(L);ce.shadowIntensity=j.intensity,ce.shadowBias=j.bias,ce.shadowNormalBias=j.normalBias,ce.shadowRadius=j.radius,ce.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=ce,n.sunShadowMap[_]=le;const Se=j.getViewportCount();for(let we=0;we<Se;we++)n.sunShadowMatrix[E+we]=j.getMatrix(we),n.sunShadowCascade[E+we]=j._cascadeData[we];E+=Se,_++}n.sun[g]=J,g++}else if(L.isDirectionalLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,ce=t.get(L);ce.shadowIntensity=j.intensity,ce.shadowBias=j.bias,ce.shadowNormalBias=j.normalBias,ce.shadowRadius=j.radius,ce.shadowMapSize=j.mapSize,n.directionalShadow[h]=ce,n.directionalShadowMap[h]=le,n.directionalShadowMatrix[h]=L.shadow.matrix,w++}n.directional[h]=J,h++}else if(L.isSpotLight){const J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(V).multiplyScalar(U),J.distance=W,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,n.spot[M]=J;const j=L.shadow;if(L.map&&(n.spotLightMap[S]=L.map,S++,j.updateMatrices(L),L.castShadow&&F++),n.spotLightMatrix[M]=j.matrix,L.castShadow){const ce=t.get(L);ce.shadowIntensity=j.intensity,ce.shadowBias=j.bias,ce.shadowNormalBias=j.normalBias,ce.shadowRadius=j.radius,ce.shadowMapSize=j.mapSize,n.spotShadow[M]=ce,n.spotShadowMap[M]=le,u++}M++}else if(L.isRectAreaLight){const J=e.get(L);J.color.copy(V).multiplyScalar(U),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),n.rectArea[A]=J,A++}else if(L.isPointLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){const j=L.shadow,ce=t.get(L);ce.shadowIntensity=j.intensity,ce.shadowBias=j.bias,ce.shadowNormalBias=j.normalBias,ce.shadowRadius=j.radius,ce.shadowMapSize=j.mapSize,ce.shadowCameraNear=j.camera.near,ce.shadowCameraFar=j.camera.far,n.pointShadow[p]=ce,n.pointShadowMap[p]=le,n.pointShadowMatrix[p]=L.shadow.matrix,x++}n.point[p]=J,p++}else if(L.isHemisphereLight){const J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(U),J.groundColor.copy(L.groundColor).multiplyScalar(U),n.hemi[b]=J,b++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=m,n.ambient[2]=d;const C=n.hash;(C.sunLength!==g||C.directionalLength!==h||C.pointLength!==p||C.spotLength!==M||C.rectAreaLength!==A||C.hemiLength!==b||C.numSunShadows!==_||C.numDirectionalShadows!==w||C.numPointShadows!==x||C.numSpotShadows!==u||C.numSpotMaps!==S||C.numLightProbes!==P)&&(n.sun.length=g,n.directional.length=h,n.spot.length=M,n.rectArea.length=A,n.point.length=p,n.hemi.length=b,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=E,n.sunShadowCascade.length=E,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=x,n.pointShadowMap.length=x,n.pointShadowMatrix.length=x,n.spotShadow.length=u,n.spotShadowMap.length=u,n.spotLightMatrix.length=u+S-F,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=P,C.sunLength=g,C.directionalLength=h,C.pointLength=p,C.spotLength=M,C.rectAreaLength=A,C.hemiLength=b,C.numSunShadows=_,C.numDirectionalShadows=w,C.numPointShadows=x,C.numSpotShadows=u,C.numSpotMaps=S,C.numLightProbes=P,n.version=ag++)}function c(l,f){let m=0,d=0,g=0,_=0,E=0,h=0;const p=f.matrixWorldInverse;for(let M=0,A=l.length;M<A;M++){const b=l[M];if(b.isSunLight){const w=n.sun[m];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),m++}else if(b.isDirectionalLight){const w=n.directional[d];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),d++}else if(b.isSpotLight){const w=n.spot[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const w=n.rectArea[E];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),E++}else if(b.isPointLight){const w=n.point[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),g++}else if(b.isHemisphereLight){const w=n.hemi[h];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),h++}}}return{setup:o,setupView:c,state:n}}function uc(i){const e=new lg(i),t=[],n=[],s=[];function r(m){f.camera=m,t.length=0,n.length=0,s.length=0}function a(m){m.isLightProbeGrid?s.push(m):t.push(m)}function o(m){n.push(m)}function c(){e.setup(t),s.sort((m,d)=>m.priority-d.priority||m.id-d.id)}function l(m){e.setupView(t,m)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function cg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new uc(i),e.set(s,[o])):r>=a.length?(o=new uc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,dg=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],fg=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],hc=new gt,As=new z,uo=new z;function pg(i,e,t){let n=new us;const s=new Ke,r=new Ke,a=new Dt,o=new du,c=new fu,l={},f=t.maxTextureSize,m={[mi]:an,[an]:mi,[jt]:jt},d=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:ug,fragmentShader:hg}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const _=new Zt;_.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Mt(_,d),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let p=this.type;this.render=function(x,u,S){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||x.length===0)return;this.type===vc&&($e("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ps);const F=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Ii),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=p!==this.type;B&&u.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(V=>V.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,V=x.length;L<V;L++){const U=x[L],W=U.shadow;if(W===void 0){$e("WebGLShadowMap:",U,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const le=W.getFrameExtents();s.multiply(le),r.copy(W.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/le.x),s.x=r.x*le.x,W.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/le.y),s.y=r.y*le.y,W.mapSize.y=r.y));const J=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=J,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===ns){if(U.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Pn(s.x,s.y,{format:gi,type:Ln,minFilter:rn,magFilter:rn,generateMipmaps:!1}),W.map.texture.name=U.name+".shadowMap",W.map.depthTexture=new Fi(s.x,s.y,Mn),W.map.depthTexture.name=U.name+".shadowMapDepth",W.map.depthTexture.format=si,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Yt,W.map.depthTexture.magFilter=Yt}else U.isPointLight?(W.map=new Oa(s.x),W.map.depthTexture=new tl(s.x,Dn)):(W.map=new Pn(s.x,s.y),W.map.depthTexture=new Fi(s.x,s.y,Dn)),W.map.depthTexture.name=U.name+".shadowMap",W.map.depthTexture.format=si,this.type===Ps?(W.map.depthTexture.compareFunction=J?ko:Ho,W.map.depthTexture.minFilter=rn,W.map.depthTexture.magFilter=rn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Yt,W.map.depthTexture.magFilter=Yt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();U.isPointLight!==!0&&W.updateMatrices(U,S);const ce=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:S.layers;for(let Se=0;Se<j;Se++){const we=W.getCamera(Se);if(U.isPointLight){const ee=W.camera,me=W.matrix,Re=U.distance||ee.far;Re!==ee.far&&(ee.far=Re,ee.updateProjectionMatrix()),As.setFromMatrixPosition(U.matrixWorld),ee.position.copy(As),uo.copy(ee.position),uo.add(dg[Se]),ee.up.copy(fg[Se]),ee.lookAt(uo),ee.updateMatrixWorld(),me.makeTranslation(-As.x,-As.y,-As.z),hc.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),W._frustum.setFromProjectionMatrix(hc,ee.coordinateSystem,ee.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(W.map),i.clear());const ee=W.getViewport(Se);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),I.viewport(a)}n=W.getFrustum(Se),b(u,S,we,U,ce,this.type)}W.isPointLightShadow!==!0&&this.type===ns&&M(W,S),W.needsUpdate=!1}p=this.type,h.needsUpdate=!1,i.setRenderTarget(F,P,C)};function M(x,u){const S=e.update(E);d.defines.VSM_SAMPLES!==x.blurSamples&&(d.defines.VSM_SAMPLES=x.blurSamples,g.defines.VSM_SAMPLES=x.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),x.mapPass===null?x.mapPass=new Pn(s.x,s.y,{format:gi,type:Ln}):(x.mapPass.width!==x.map.width||x.mapPass.height!==x.map.height)&&x.mapPass.setSize(x.map.width,x.map.height),d.uniforms.shadow_pass.value=x.map.depthTexture,d.uniforms.resolution.value.set(x.map.width,x.map.height),d.uniforms.radius.value=x.radius,i.setRenderTarget(x.mapPass),i.clear(),i.renderBufferDirect(u,null,S,d,E,null),g.uniforms.shadow_pass.value=x.mapPass.texture,g.uniforms.resolution.value.set(x.map.width,x.map.height),g.uniforms.radius.value=x.radius,i.setRenderTarget(x.map),i.clear(),i.renderBufferDirect(u,null,S,g,E,null)}function A(x,u,S,F){let P=null;const C=S.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(C!==void 0)P=C;else if(P=S.isPointLight===!0?c:o,i.localClippingEnabled&&u.clipShadows===!0&&Array.isArray(u.clippingPlanes)&&u.clippingPlanes.length!==0||u.displacementMap&&u.displacementScale!==0||u.alphaMap&&u.alphaTest>0||u.map&&u.alphaTest>0||u.alphaToCoverage===!0){const I=P.uuid,B=u.uuid;let L=l[I];L===void 0&&(L={},l[I]=L);let V=L[B];V===void 0&&(V=P.clone(),L[B]=V,u.addEventListener("dispose",w)),P=V}if(P.visible=u.visible,P.wireframe=u.wireframe,F===ns?P.side=u.shadowSide!==null?u.shadowSide:u.side:P.side=u.shadowSide!==null?u.shadowSide:m[u.side],P.alphaMap=u.alphaMap,P.alphaTest=u.alphaToCoverage===!0?.5:u.alphaTest,P.map=u.map,P.clipShadows=u.clipShadows,P.clippingPlanes=u.clippingPlanes,P.clipIntersection=u.clipIntersection,P.displacementMap=u.displacementMap,P.displacementScale=u.displacementScale,P.displacementBias=u.displacementBias,P.wireframeLinewidth=u.wireframeLinewidth,P.linewidth=u.linewidth,S.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=i.properties.get(P);I.light=S}return P}function b(x,u,S,F,P,C){if(x.visible===!1)return;if(x.layers.test(P)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&C===ns)&&(!x.frustumCulled||x.intersectsFrustum(n))){x.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,x.matrixWorld);const L=e.update(x),V=x.material;if(Array.isArray(V)){const U=L.groups;for(let W=0,le=U.length;W<le;W++){const J=U[W],j=V[J.materialIndex];if(j&&j.visible){const ce=A(x,j,F,C);x.onBeforeShadow(i,x,u,S,L,ce,J),i.renderBufferDirect(S,null,L,ce,x,J),x.onAfterShadow(i,x,u,S,L,ce,J)}}}else if(V.visible){const U=A(x,V,F,C);x.onBeforeShadow(i,x,u,S,L,U,null),i.renderBufferDirect(S,null,L,U,x,null),x.onAfterShadow(i,x,u,S,L,U,null)}}const B=x.children;for(let L=0,V=B.length;L<V;L++)b(B[L],u,S,F,P,C)}function w(x){x.target.removeEventListener("dispose",w);for(const S in l){const F=l[S],P=x.target.uuid;P in F&&(F[P].dispose(),delete F[P])}}}function mg(i,e){function t(){let O=!1;const se=new Dt;let Y=null;const xe=new Dt(0,0,0,0);return{setMask:function(ue){Y!==ue&&!O&&(i.colorMask(ue,ue,ue,ue),Y=ue)},setLocked:function(ue){O=ue},setClear:function(ue,ve,He,Je,_e){_e===!0&&(ue*=Je,ve*=Je,He*=Je),se.set(ue,ve,He,Je),xe.equals(se)===!1&&(i.clearColor(ue,ve,He,Je),xe.copy(se))},reset:function(){O=!1,Y=null,xe.set(-1,0,0,0)}}}function n(){let O=!1,se=!1,Y=null,xe=null,ue=null;return{setReversed:function(ve){if(se!==ve){const He=e.get("EXT_clip_control");ve?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),se=ve;const Je=ue;ue=null,this.setClear(Je)}},getReversed:function(){return se},setTest:function(ve){ve?de(i.DEPTH_TEST):Be(i.DEPTH_TEST)},setMask:function(ve){Y!==ve&&!O&&(i.depthMask(ve),Y=ve)},setFunc:function(ve){if(se&&(ve=Zu[ve]),xe!==ve){switch(ve){case Pr:i.depthFunc(i.NEVER);break;case Dr:i.depthFunc(i.ALWAYS);break;case Lr:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case Ir:i.depthFunc(i.EQUAL);break;case Nr:i.depthFunc(i.GEQUAL);break;case Ur:i.depthFunc(i.GREATER);break;case Fr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ve}},setLocked:function(ve){O=ve},setClear:function(ve){ue!==ve&&(ue=ve,se&&(ve=1-ve),i.clearDepth(ve))},reset:function(){O=!1,Y=null,xe=null,ue=null,se=!1}}}function s(){let O=!1,se=null,Y=null,xe=null,ue=null,ve=null,He=null,Je=null,_e=null;return{setTest:function(Le){O||(Le?de(i.STENCIL_TEST):Be(i.STENCIL_TEST))},setMask:function(Le){se!==Le&&!O&&(i.stencilMask(Le),se=Le)},setFunc:function(Le,Ne,fe){(Y!==Le||xe!==Ne||ue!==fe)&&(i.stencilFunc(Le,Ne,fe),Y=Le,xe=Ne,ue=fe)},setOp:function(Le,Ne,fe){(ve!==Le||He!==Ne||Je!==fe)&&(i.stencilOp(Le,Ne,fe),ve=Le,He=Ne,Je=fe)},setLocked:function(Le){O=Le},setClear:function(Le){_e!==Le&&(i.clearStencil(Le),_e=Le)},reset:function(){O=!1,se=null,Y=null,xe=null,ue=null,ve=null,He=null,Je=null,_e=null}}}const r=new t,a=new n,o=new s;let c={};const l=new WeakMap;let f={},m={},d={},g=new WeakMap,_=[],E=null,h=!1,p=null,M=null,A=null,b=null,w=null,x=null,u=null,S=new it(0,0,0),F=0,P=!1,C=null,I=null,B=null,L=null,V=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,le=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(J)[1]),W=le>=1):J.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),W=le>=2);let j=null,ce={};const Se=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),ee=new Dt().fromArray(Se),me=new Dt().fromArray(we);function Re(O,se,Y,xe){const ue=new Uint8Array(4),ve=i.createTexture();i.bindTexture(O,ve),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<Y;He++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(se+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return ve}const De={};De[i.TEXTURE_2D]=Re(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=Re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[i.TEXTURE_2D_ARRAY]=Re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=Re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),de(i.DEPTH_TEST),a.setFunc(as),ot(!1),Ve(fo),de(i.CULL_FACE),Ae(Ii);function de(O){f[O]!==!0&&(i.enable(O),f[O]=!0)}function Be(O){f[O]!==!1&&(i.disable(O),f[O]=!1)}function yt(O,se){return d[O]!==se?(i.bindFramebuffer(O,se),d[O]=se,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=se),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=se),!0):!1}function ke(O,se){let Y=_,xe=!1;if(O){Y=g.get(se),Y===void 0&&(Y=[],g.set(se,Y));const ue=O.textures;if(Y.length!==ue.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,He=ue.length;ve<He;ve++)Y[ve]=i.COLOR_ATTACHMENT0+ve;Y.length=ue.length,xe=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,xe=!0);xe&&i.drawBuffers(Y)}function ht(O){return E!==O?(i.useProgram(O),E=O,!0):!1}const _t={[Pi]:i.FUNC_ADD,[Sc]:i.FUNC_SUBTRACT,[yc]:i.FUNC_REVERSE_SUBTRACT};_t[Ec]=i.MIN,_t[bc]=i.MAX;const st={[Tc]:i.ZERO,[Ac]:i.ONE,[wc]:i.SRC_COLOR,[To]:i.SRC_ALPHA,[Ic]:i.SRC_ALPHA_SATURATE,[Dc]:i.DST_COLOR,[Cc]:i.DST_ALPHA,[Rc]:i.ONE_MINUS_SRC_COLOR,[Ao]:i.ONE_MINUS_SRC_ALPHA,[Lc]:i.ONE_MINUS_DST_COLOR,[Pc]:i.ONE_MINUS_DST_ALPHA,[Nc]:i.CONSTANT_COLOR,[Uc]:i.ONE_MINUS_CONSTANT_COLOR,[Fc]:i.CONSTANT_ALPHA,[Oc]:i.ONE_MINUS_CONSTANT_ALPHA};function Ae(O,se,Y,xe,ue,ve,He,Je,_e,Le){if(O===Ii){h===!0&&(Be(i.BLEND),h=!1);return}if(h===!1&&(de(i.BLEND),h=!0),O!==Mc){if(O!==p||Le!==P){if((M!==Pi||w!==Pi)&&(i.blendEquation(i.FUNC_ADD),M=Pi,w=Pi),Le)switch(O){case is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bs:i.blendFunc(i.ONE,i.ONE);break;case po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",O);break}else switch(O){case is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case po:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mo:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",O);break}A=null,b=null,x=null,u=null,S.set(0,0,0),F=0,p=O,P=Le}return}ue=ue||se,ve=ve||Y,He=He||xe,(se!==M||ue!==w)&&(i.blendEquationSeparate(_t[se],_t[ue]),M=se,w=ue),(Y!==A||xe!==b||ve!==x||He!==u)&&(i.blendFuncSeparate(st[Y],st[xe],st[ve],st[He]),A=Y,b=xe,x=ve,u=He),(Je.equals(S)===!1||_e!==F)&&(i.blendColor(Je.r,Je.g,Je.b,_e),S.copy(Je),F=_e),p=O,P=!1}function Xe(O,se){O.side===jt?Be(i.CULL_FACE):de(i.CULL_FACE);let Y=O.side===an;se&&(Y=!Y),ot(Y),O.blending===is&&O.transparent===!1?Ae(Ii):Ae(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const xe=O.stencilWrite;o.setTest(xe),xe&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),xt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):Be(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(O){C!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),C=O)}function Ve(O){O!==_c?(de(i.CULL_FACE),O!==I&&(O===fo?i.cullFace(i.BACK):O===xc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Be(i.CULL_FACE),I=O}function mt(O){O!==B&&(W&&i.lineWidth(O),B=O)}function xt(O,se,Y){O?(de(i.POLYGON_OFFSET_FILL),(L!==se||V!==Y)&&(L=se,V=Y,a.getReversed()&&(se=-se,Y=-Y),i.polygonOffset(se,Y))):Be(i.POLYGON_OFFSET_FILL)}function tt(O){O?de(i.SCISSOR_TEST):Be(i.SCISSOR_TEST)}function Tt(O){O===void 0&&(O=i.TEXTURE0+U-1),j!==O&&(i.activeTexture(O),j=O)}function Nt(O,se,Y){Y===void 0&&(j===null?Y=i.TEXTURE0+U-1:Y=j);let xe=ce[Y];xe===void 0&&(xe={type:void 0,texture:void 0},ce[Y]=xe),(xe.type!==O||xe.texture!==se)&&(j!==Y&&(i.activeTexture(Y),j=Y),i.bindTexture(O,se||De[O]),xe.type=O,xe.texture=se)}function H(){const O=ce[j];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Wt(){try{i.compressedTexImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function nt(){try{i.compressedTexImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function ze(){try{i.texSubImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function Ee(){try{i.texSubImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function St(){try{i.compressedTexSubImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function Oe(){try{i.compressedTexSubImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function Ze(){try{i.texStorage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function D(){try{i.texStorage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function y(){try{i.texImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function X(){try{i.texImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function pe(O){return m[O]!==void 0?m[O]:i.getParameter(O)}function ne(O,se){m[O]!==se&&(i.pixelStorei(O,se),m[O]=se)}function ge(O){ee.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ee.copy(O))}function Me(O){me.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),me.copy(O))}function ie(O,se){let Y=l.get(se);Y===void 0&&(Y=new WeakMap,l.set(se,Y));let xe=Y.get(O);xe===void 0&&(xe=i.getUniformBlockIndex(se,O.name),i.uniformBlockBinding(se,xe,xe),Y.set(O,xe))}function re(O,se,Y){const ue=l.get(se).get(O);c[ue]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,ue,Y),c[ue]=Y)}function ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},m={},j=null,ce={},d={},c={},g=new WeakMap,_=[],E=null,h=!1,p=null,M=null,A=null,b=null,w=null,x=null,u=null,S=new it(0,0,0),F=0,P=!1,C=null,I=null,B=null,L=null,V=null,ee.set(0,0,i.canvas.width,i.canvas.height),me.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:de,disable:Be,bindFramebuffer:yt,drawBuffers:ke,useProgram:ht,setBlending:Ae,setMaterial:Xe,setFlipSided:ot,setCullFace:Ve,setLineWidth:mt,setPolygonOffset:xt,setScissorTest:tt,activeTexture:Tt,bindTexture:Nt,unbindTexture:H,compressedTexImage2D:Wt,compressedTexImage3D:nt,texImage2D:y,texImage3D:X,pixelStorei:ne,getParameter:pe,updateUBOMapping:ie,uniformBlockBinding:re,texStorage2D:Ze,texStorage3D:D,texSubImage2D:ze,texSubImage3D:Ee,compressedTexSubImage2D:St,compressedTexSubImage3D:Oe,scissor:ge,viewport:Me,reset:ye}}function gg(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ke,f=new WeakMap,m=new Set;let d;const g=new WeakMap,_=new Set,E=new FinalizationRegistry(D=>_.delete(D));let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(D,y){return h?new OffscreenCanvas(D,y):ga("canvas")}function M(D,y,X){let pe=1;const ne=Ze(D);if((ne.width>X||ne.height>X)&&(pe=X/Math.max(ne.width,ne.height)),pe<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ge=Math.floor(pe*ne.width),Me=Math.floor(pe*ne.height);d===void 0&&(d=p(ge,Me));const ie=y?p(ge,Me):d;return ie.width=ge,ie.height=Me,ie.getContext("2d").drawImage(D,0,0,ge,Me),$e("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ge+"x"+Me+")."),ie}else return"data"in D&&$e("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),D;return D}function A(D){return D.generateMipmaps}function b(D){i.generateMipmap(D)}function w(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(D,y,X,pe,ne,ge=!1){if(D!==null){if(i[D]!==void 0)return i[D];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Me;pe&&(Me=e.get("EXT_texture_norm16"),Me||$e("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=y;if(y===i.RED&&(X===i.FLOAT&&(ie=i.R32F),X===i.HALF_FLOAT&&(ie=i.R16F),X===i.UNSIGNED_BYTE&&(ie=i.R8),X===i.UNSIGNED_SHORT&&Me&&(ie=Me.R16_EXT),X===i.SHORT&&Me&&(ie=Me.R16_SNORM_EXT)),y===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.R8UI),X===i.UNSIGNED_SHORT&&(ie=i.R16UI),X===i.UNSIGNED_INT&&(ie=i.R32UI),X===i.BYTE&&(ie=i.R8I),X===i.SHORT&&(ie=i.R16I),X===i.INT&&(ie=i.R32I)),y===i.RG&&(X===i.FLOAT&&(ie=i.RG32F),X===i.HALF_FLOAT&&(ie=i.RG16F),X===i.UNSIGNED_BYTE&&(ie=i.RG8),X===i.UNSIGNED_SHORT&&Me&&(ie=Me.RG16_EXT),X===i.SHORT&&Me&&(ie=Me.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RG8UI),X===i.UNSIGNED_SHORT&&(ie=i.RG16UI),X===i.UNSIGNED_INT&&(ie=i.RG32UI),X===i.BYTE&&(ie=i.RG8I),X===i.SHORT&&(ie=i.RG16I),X===i.INT&&(ie=i.RG32I)),y===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),X===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),X===i.UNSIGNED_INT&&(ie=i.RGB32UI),X===i.BYTE&&(ie=i.RGB8I),X===i.SHORT&&(ie=i.RGB16I),X===i.INT&&(ie=i.RGB32I)),y===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),X===i.UNSIGNED_INT&&(ie=i.RGBA32UI),X===i.BYTE&&(ie=i.RGBA8I),X===i.SHORT&&(ie=i.RGBA16I),X===i.INT&&(ie=i.RGBA32I)),y===i.RGB&&(X===i.UNSIGNED_SHORT&&Me&&(ie=Me.RGB16_EXT),X===i.SHORT&&Me&&(ie=Me.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(ie=i.R11F_G11F_B10F)),y===i.RGBA){const re=ge?ks:pt.getTransfer(ne);X===i.FLOAT&&(ie=i.RGBA32F),X===i.HALF_FLOAT&&(ie=i.RGBA16F),X===i.UNSIGNED_BYTE&&(ie=re===bt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&Me&&(ie=Me.RGBA16_EXT),X===i.SHORT&&Me&&(ie=Me.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function u(D,y){let X;return D?y===null||y===Dn||y===Ui?X=i.DEPTH24_STENCIL8:y===Mn?X=i.DEPTH32F_STENCIL8:y===ls&&(X=i.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Dn||y===Ui?X=i.DEPTH_COMPONENT24:y===Mn?X=i.DEPTH_COMPONENT32F:y===ls&&(X=i.DEPTH_COMPONENT16),X}function S(D,y){return A(D)===!0||D.isFramebufferTexture&&D.minFilter!==Yt&&D.minFilter!==rn?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function F(D){const y=new WeakRef(D);n.get(D).__ref=y,_.add(y),E.register(D,y,y)}function P(D){const y=n.get(D).__ref;y!==void 0&&(_.delete(y),E.unregister(y))}function C(D){B(D.target)}function I(D){L(D.target)}function B(D){D.removeEventListener("dispose",C),P(D),U(D),D.isVideoTexture&&f.delete(D),D.isHTMLTexture&&m.delete(D)}function L(D){D.removeEventListener("dispose",I),P(D),le(D)}function V(){for(const D of _){const y=D.deref();y!==void 0&&(y.isRenderTarget===!0?L(y):B(y))}_.clear(),m.clear()}function U(D){const y=n.get(D);if(y.__webglInit===void 0)return;const X=D.source,pe=g.get(X);if(pe){const ne=pe[y.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&W(D),Object.keys(pe).length===0&&g.delete(X)}n.remove(D)}function W(D){const y=n.get(D);i.deleteTexture(y.__webglTexture);const X=D.source,pe=g.get(X);delete pe[y.__cacheKey],a.memory.textures--}function le(D){const y=n.get(D);y.__depthDisposeCallback&&y.__depthDisposeCallback();const X=D.depthTexture;if(X&&X.renderTarget===D&&B(X),D.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(y.__webglFramebuffer[ne]))for(let ge=0;ge<y.__webglFramebuffer[ne].length;ge++)i.deleteFramebuffer(y.__webglFramebuffer[ne][ge]);else i.deleteFramebuffer(y.__webglFramebuffer[ne]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[ne])}else{if(Array.isArray(y.__webglFramebuffer))for(let ne=0;ne<y.__webglFramebuffer.length;ne++)i.deleteFramebuffer(y.__webglFramebuffer[ne]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let ne=0;ne<y.__webglColorRenderbuffer.length;ne++)y.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[ne]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const pe=D.textures;for(let ne=0,ge=pe.length;ne<ge;ne++){const Me=n.get(pe[ne]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove(pe[ne])}n.remove(D)}let J=0;function j(){J=0}function ce(){return J}function Se(D){J=D}function we(){const D=J;return D>=s.maxTextures&&$e("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),J+=1,D}function ee(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.mipmapsAutoUpdate),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function me(D,y){const X=n.get(D);if(D.isVideoTexture&&St(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&X.__version!==D.version){const pe=D.image;if(pe===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{Xe(X,D,y);return}}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+y)}function Re(D,y){const X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){Xe(X,D,y);return}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+y)}function De(D,y){const X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){Xe(X,D,y);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+y)}function de(D,y){const X=n.get(D);if(D.version>0&&X.__version!==D.version){ot(X,D,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+y)}const Be={[Or]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[Br]:i.MIRRORED_REPEAT},yt={[Yt]:i.NEAREST,[Gc]:i.NEAREST_MIPMAP_NEAREST,[Rs]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[Ar]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},ke={[Wc]:i.NEVER,[Vo]:i.ALWAYS,[Xc]:i.LESS,[Ho]:i.LEQUAL,[qc]:i.EQUAL,[ko]:i.GEQUAL,[Yc]:i.GREATER,[Zc]:i.NOTEQUAL};function ht(D,y){if(y.type===Mn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===rn||y.magFilter===Ar||y.magFilter===Rs||y.magFilter===ei||y.minFilter===rn||y.minFilter===Ar||y.minFilter===Rs||y.minFilter===ei)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Be[y.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Be[y.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Be[y.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,yt[y.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,yt[y.minFilter]),y.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,ke[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Yt||y.minFilter!==Rs&&y.minFilter!==ei||y.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function _t(D,y){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",C),F(y));const pe=y.source;let ne=g.get(pe);ne===void 0&&(ne={},g.set(pe,ne));const ge=ee(y);if(ge!==D.__cacheKey){ne[ge]===void 0&&(ne[ge]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ne[ge].usedTimes++;const Me=ne[D.__cacheKey];Me!==void 0&&(ne[D.__cacheKey].usedTimes--,Me.usedTimes===0&&W(y)),D.__cacheKey=ge,D.__webglTexture=ne[ge].texture}return X}function st(D,y,X){return Math.floor(Math.floor(D/X)/y)}function Ae(D,y,X,pe){const ge=D.updateRanges;if(ge.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,X,pe,y.data);else{ge.sort((O,se)=>O.start-se.start);let Me=0;for(let O=1;O<ge.length;O++){const se=ge[Me],Y=ge[O],xe=se.start+se.count,ue=st(Y.start,y.width,4),ve=st(se.start,y.width,4);Y.start<=xe+1&&ue===ve&&st(Y.start+Y.count-1,y.width,4)===ue?se.count=Math.max(se.count,Y.start+Y.count-se.start):(++Me,ge[Me]=Y)}ge.length=Me+1;const ie=t.getParameter(i.UNPACK_ROW_LENGTH),re=t.getParameter(i.UNPACK_SKIP_PIXELS),ye=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let O=0,se=ge.length;O<se;O++){const Y=ge[O],xe=Math.floor(Y.start/4),ue=Math.ceil(Y.count/4),ve=xe%y.width,He=Math.floor(xe/y.width),Je=ue,_e=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,He),t.texSubImage2D(i.TEXTURE_2D,0,ve,He,Je,_e,X,pe,y.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ie),t.pixelStorei(i.UNPACK_SKIP_PIXELS,re),t.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function Xe(D,y,X){let pe=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(pe=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(pe=i.TEXTURE_3D);const ne=_t(D,y),ge=y.source;t.bindTexture(pe,D.__webglTexture,i.TEXTURE0+X);const Me=n.get(ge);if(ge.version!==Me.__version||ne===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const _e=pt.getPrimaries(pt.workingColorSpace),Le=y.colorSpace===Qn?null:pt.getPrimaries(y.colorSpace),Ne=y.colorSpace===Qn||_e===Le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let re=M(y.image,!1,s.maxTextureSize);re=Oe(y,re);const ye=r.convert(y.format,y.colorSpace),O=r.convert(y.type);let se=x(y.internalFormat,ye,O,y.normalized,y.colorSpace,y.isVideoTexture);ht(pe,y);let Y;const xe=y.mipmaps,ue=y.isVideoTexture!==!0,ve=Me.__version===void 0||ne===!0,He=ge.dataReady,Je=S(y,re);if(y.isDepthTexture)se=u(y.format===ti,y.type),ve&&(ue?t.texStorage2D(i.TEXTURE_2D,1,se,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,se,re.width,re.height,0,ye,O,null));else if(y.isDataTexture)if(xe.length>0){ue&&ve&&t.texStorage2D(i.TEXTURE_2D,Je,se,xe[0].width,xe[0].height);for(let _e=0,Le=xe.length;_e<Le;_e++)Y=xe[_e],ue?He&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,Y.width,Y.height,ye,O,Y.data):t.texImage2D(i.TEXTURE_2D,_e,se,Y.width,Y.height,0,ye,O,Y.data);y.generateMipmaps=!1}else ue?(ve&&t.texStorage2D(i.TEXTURE_2D,Je,se,re.width,re.height),He&&Ae(y,re,ye,O)):t.texImage2D(i.TEXTURE_2D,0,se,re.width,re.height,0,ye,O,re.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ue&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,se,xe[0].width,xe[0].height,re.depth);for(let _e=0,Le=xe.length;_e<Le;_e++)if(Y=xe[_e],y.format!==Cn)if(ye!==null)if(ue){if(He)if(y.layerUpdates.size>0){const Ne=Wl(Y.width,Y.height,y.format,y.type);for(const fe of y.layerUpdates){const dt=Y.data.subarray(fe*Ne/Y.data.BYTES_PER_ELEMENT,(fe+1)*Ne/Y.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,fe,Y.width,Y.height,1,ye,dt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,Y.width,Y.height,re.depth,ye,Y.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_e,se,Y.width,Y.height,re.depth,0,Y.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ue?He&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,Y.width,Y.height,re.depth,ye,O,Y.data):t.texImage3D(i.TEXTURE_2D_ARRAY,_e,se,Y.width,Y.height,re.depth,0,ye,O,Y.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ue&&ve&&t.texStorage2D(i.TEXTURE_2D,Je,se,xe[0].width,xe[0].height);for(let _e=0,Le=xe.length;_e<Le;_e++)Y=xe[_e],y.format!==Cn?ye!==null?ue?He&&t.compressedTexSubImage2D(i.TEXTURE_2D,_e,0,0,Y.width,Y.height,ye,Y.data):t.compressedTexImage2D(i.TEXTURE_2D,_e,se,Y.width,Y.height,0,Y.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ue?He&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,Y.width,Y.height,ye,O,Y.data):t.texImage2D(i.TEXTURE_2D,_e,se,Y.width,Y.height,0,ye,O,Y.data)}else if(y.isDataArrayTexture)if(ue){if(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Je,se,re.width,re.height,re.depth),He)if(y.layerUpdates.size>0){const _e=Wl(re.width,re.height,y.format,y.type);for(const Le of y.layerUpdates){const Ne=re.data.subarray(Le*_e/re.data.BYTES_PER_ELEMENT,(Le+1)*_e/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Le,re.width,re.height,1,ye,O,Ne)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ye,O,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,re.width,re.height,re.depth,0,ye,O,re.data);else if(y.isData3DTexture)ue?(ve&&t.texStorage3D(i.TEXTURE_3D,Je,se,re.width,re.height,re.depth),He&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ye,O,re.data)):t.texImage3D(i.TEXTURE_3D,0,se,re.width,re.height,re.depth,0,ye,O,re.data);else if(y.isFramebufferTexture){if(ve)if(ue)t.texStorage2D(i.TEXTURE_2D,Je,se,re.width,re.height);else{let _e=re.width,Le=re.height;for(let Ne=0;Ne<Je;Ne++)t.texImage2D(i.TEXTURE_2D,Ne,se,_e,Le,0,ye,O,null),_e>>=1,Le>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const _e=i.canvas;if(_e.hasAttribute("layoutsubtree")||_e.setAttribute("layoutsubtree","true"),re.parentNode!==_e){_e.appendChild(re),m.add(y),_e.onpaint=Le=>{const Ne=Le.changedElements;for(const fe of m)Ne.includes(fe.image)&&(fe.needsUpdate=!0)},_e.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,re);else{const Ne=i.RGBA,fe=i.RGBA,dt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ne,fe,dt,re)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xe.length>0){if(ue&&ve){const _e=Ze(xe[0]);t.texStorage2D(i.TEXTURE_2D,Je,se,_e.width,_e.height)}for(let _e=0,Le=xe.length;_e<Le;_e++)Y=xe[_e],ue?He&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,ye,O,Y):t.texImage2D(i.TEXTURE_2D,_e,se,ye,O,Y);y.generateMipmaps=!1}else if(ue){if(ve){const _e=Ze(re);t.texStorage2D(i.TEXTURE_2D,Je,se,_e.width,_e.height)}He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,O,re)}else t.texImage2D(i.TEXTURE_2D,0,se,ye,O,re);A(y)&&y.mipmapsAutoUpdate===!0&&b(pe),Me.__version=ge.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function ot(D,y,X){if(y.image.length!==6)return;const pe=_t(D,y),ne=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);const ge=n.get(ne);if(ne.version!==ge.__version||pe===!0){t.activeTexture(i.TEXTURE0+X);const Me=pt.getPrimaries(pt.workingColorSpace),ie=y.colorSpace===Qn?null:pt.getPrimaries(y.colorSpace),re=y.colorSpace===Qn||Me===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const ye=y.isCompressedTexture||y.image[0].isCompressedTexture,O=y.image[0]&&y.image[0].isDataTexture,se=[];for(let fe=0;fe<6;fe++)!ye&&!O?se[fe]=M(y.image[fe],!0,s.maxCubemapSize):se[fe]=O?y.image[fe].image:y.image[fe],se[fe]=Oe(y,se[fe]);const Y=se[0],xe=r.convert(y.format,y.colorSpace),ue=r.convert(y.type);let ve=x(y.internalFormat,xe,ue,y.normalized,y.colorSpace);const He=y.isVideoTexture!==!0,Je=ge.__version===void 0||pe===!0,_e=ne.dataReady;let Le=S(y,Y);ht(i.TEXTURE_CUBE_MAP,y);let Ne;if(y.isDepthTexture){if(ve=u(y.format===ti,y.type),Je)if(He)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ve,Y.width,Y.height);else for(let fe=0;fe<6;fe++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ve,Y.width,Y.height,0,xe,ue,null)}else if(ye){He&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Le,ve,Y.width,Y.height);for(let fe=0;fe<6;fe++){Ne=se[fe].mipmaps;for(let dt=0;dt<Ne.length;dt++){const Rt=Ne[dt];y.format!==Cn?xe!==null?He?_e&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt,0,0,Rt.width,Rt.height,xe,Rt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt,ve,Rt.width,Rt.height,0,Rt.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt,0,0,Rt.width,Rt.height,xe,ue,Rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt,ve,Rt.width,Rt.height,0,xe,ue,Rt.data)}}}else{if(Ne=y.mipmaps,He&&Je){Ne.length>0&&Le++;const fe=Ze(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Le,ve,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(O){He?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,se[fe].width,se[fe].height,xe,ue,se[fe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ve,se[fe].width,se[fe].height,0,xe,ue,se[fe].data);for(let dt=0;dt<Ne.length;dt++){const mn=Ne[dt].image[fe].image;He?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt+1,0,0,mn.width,mn.height,xe,ue,mn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt+1,ve,mn.width,mn.height,0,xe,ue,mn.data)}}else{He?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,xe,ue,se[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ve,xe,ue,se[fe]);for(let dt=0;dt<Ne.length;dt++){const Rt=Ne[dt];He?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt+1,0,0,xe,ue,Rt.image[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,dt+1,ve,xe,ue,Rt.image[fe])}}}A(y)&&y.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),ge.__version=ne.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function Ve(D,y,X,pe,ne,ge){const Me=r.convert(X.format,X.colorSpace),ie=r.convert(X.type),re=x(X.internalFormat,Me,ie,X.normalized,X.colorSpace),ye=n.get(y),O=n.get(X);if(O.__renderTarget=y,!ye.__hasExternalTextures){const se=Math.max(1,y.width>>ge),Y=Math.max(1,y.height>>ge);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,ge,re,se,Y,y.depth,0,Me,ie,null):t.texImage2D(ne,ge,re,se,Y,0,Me,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),Ee(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pe,ne,O.__webglTexture,0,ze(y)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pe,ne,O.__webglTexture,ge),t.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(D,y,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),y.depthBuffer){const pe=y.depthTexture,ne=pe&&pe.isDepthTexture?pe.type:null,ge=u(y.stencilBuffer,ne),Me=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ee(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze(y),ge,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze(y),ge,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ge,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,D)}else{const pe=y.textures;for(let ne=0;ne<pe.length;ne++){const ge=pe[ne],Me=r.convert(ge.format,ge.colorSpace),ie=r.convert(ge.type),re=x(ge.internalFormat,Me,ie,ge.normalized,ge.colorSpace);Ee(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze(y),re,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze(y),re,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,re,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(D,y,X){const pe=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=n.get(y.depthTexture);ne.__renderTarget=y;const ge=pe?y.depthTexture.image[0]:y.depthTexture.image;(!ne.__webglTexture||ge.width!==y.width||ge.height!==y.height)&&(ge.width=y.width,ge.height=y.height,y.depthTexture.needsUpdate=!0),pe?de(y.depthTexture,0):me(y.depthTexture,0);const Me=ne.__webglTexture,ie=ze(y),re=pe?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,ye=y.depthTexture.format===ti?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===si)Ee(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,re,Me,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,ye,re,Me,0);else if(y.depthTexture.format===ti)Ee(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,re,Me,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,ye,re,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(D){const y=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const pe=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),pe){const ne=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,pe.removeEventListener("dispose",ne)};pe.addEventListener("dispose",ne),y.__depthDisposeCallback=ne}y.__boundDepthTexture=pe}if(D.depthTexture&&!y.__autoAllocateDepthBuffer)if(X)for(let pe=0;pe<6;pe++)xt(y.__webglFramebuffer[pe],D,pe);else D.texture.mipmaps.length>0?xt(y.__webglFramebuffer[0],D,0):xt(y.__webglFramebuffer,D,0);else if(X){y.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[pe]),y.__webglDepthbuffer[pe]===void 0)y.__webglDepthbuffer[pe]=i.createRenderbuffer(),mt(y.__webglDepthbuffer[pe],D,!1);else{const ne=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=y.__webglDepthbuffer[pe];i.bindRenderbuffer(i.RENDERBUFFER,ge),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,ge)}}else if(D.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),mt(y.__webglDepthbuffer,D,!1);else{const ne=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ge),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,ge)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(D,y,X){const pe=n.get(D);y!==void 0&&Ve(pe.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&tt(D)}function Nt(D){const y=D.texture,X=n.get(D),pe=n.get(y);D.addEventListener("dispose",I),F(D);const ne=D.textures,ge=D.isWebGLCubeRenderTarget===!0,Me=ne.length>1;if(Me||(pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture()),pe.__version=y.version,a.memory.textures++),ge){X.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(y.mipmaps.length>0){X.__webglFramebuffer[ie]=[];for(let re=0;re<y.mipmaps.length;re++)X.__webglFramebuffer[ie][re]=i.createFramebuffer()}else X.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(y.mipmaps.length>0){X.__webglFramebuffer=[];for(let ie=0;ie<y.mipmaps.length;ie++)X.__webglFramebuffer[ie]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ie=0,re=ne.length;ie<re;ie++){const ye=n.get(ne[ie]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&Ee(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ie=0;ie<ne.length;ie++){const re=ne[ie];X.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[ie]);const ye=r.convert(re.format,re.colorSpace),O=r.convert(re.type),se=x(re.internalFormat,ye,O,re.normalized,re.colorSpace,D.isXRRenderTarget===!0),Y=ze(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,se,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,X.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),mt(X.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ge){t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),ht(i.TEXTURE_CUBE_MAP,y);for(let ie=0;ie<6;ie++)if(y.mipmaps.length>0)for(let re=0;re<y.mipmaps.length;re++)Ve(X.__webglFramebuffer[ie][re],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,re);else Ve(X.__webglFramebuffer[ie],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);A(y)?b(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}else if(Me){for(let ie=0,re=ne.length;ie<re;ie++){const ye=ne[ie],O=n.get(ye);let se=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(se=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,O.__webglTexture),ht(se,ye),Ve(X.__webglFramebuffer,D,ye,i.COLOR_ATTACHMENT0+ie,se,0),A(ye)&&b(se)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ie=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,pe.__webglTexture),ht(ie,y),y.mipmaps.length>0)for(let re=0;re<y.mipmaps.length;re++)Ve(X.__webglFramebuffer[re],D,y,i.COLOR_ATTACHMENT0,ie,re);else Ve(X.__webglFramebuffer,D,y,i.COLOR_ATTACHMENT0,ie,0);A(y)?b(ie):y.mipmaps.length>0&&i.texParameteri(ie,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}D.depthBuffer&&tt(D)}function H(D){const y=D.textures;for(let X=0,pe=y.length;X<pe;X++){const ne=y[X];if(A(ne)&&ne.mipmapsAutoUpdate===!0){const ge=w(D),Me=n.get(ne).__webglTexture;t.bindTexture(ge,Me),b(ge),t.unbindTexture()}}}const Wt=[];function nt(D){if(D.samples>0){if(Ee(D)===!1){const y=D.textures,X=D.width,pe=D.height;let ne=i.COLOR_BUFFER_BIT;const ge=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(D),ie=y.length>1;if(ie)for(let ye=0;ye<y.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ye=0;ye<y.length;ye++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const O=n.get(y[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,X,pe,0,0,X,pe,ne,i.NEAREST),c===!0&&(Wt.length=0,Wt.push(i.COLOR_ATTACHMENT0+ye),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&Wt.push(ge),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Wt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let ye=0;ye<y.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ye]);const O=n.get(y[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){const y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ze(D){return Math.min(s.maxSamples,D.samples)}function Ee(D){const y=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function St(D){const y=a.render.frame;f.get(D)!==y&&(f.set(D,y),D.update())}function Oe(D,y){const X=D.colorSpace,pe=D.format,ne=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==Hs&&X!==Qn&&(pt.getTransfer(X)===bt?(pe!==Cn||ne!==un)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",X)),y}function Ze(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=we,this.resetTextureUnits=j,this.getTextureUnits=ce,this.setTextureUnits=Se,this.setTexture2D=me,this.setTexture2DArray=Re,this.setTexture3D=De,this.setTextureCube=de,this.rebindTextures=Tt,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Ve,this.useMultisampledRTT=Ee,this.dispose=V}function Cu(i,e){function t(n,s=Qn){let r;const a=pt.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===Ta)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Aa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Uo)return i.BYTE;if(n===Fo)return i.SHORT;if(n===ls)return i.UNSIGNED_SHORT;if(n===ba)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===zo)return i.ALPHA;if(n===Go)return i.RGB;if(n===Cn)return i.RGBA;if(n===si)return i.DEPTH_COMPONENT;if(n===ti)return i.DEPTH_STENCIL;if(n===wa)return i.RED;if(n===Ra)return i.RED_INTEGER;if(n===gi)return i.RG;if(n===Ca)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===Ds||n===Ls||n===Is||n===Ns)if(a===bt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zr||n===Gr||n===Hr||n===kr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===kr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vr||n===Wr||n===Xr||n===qr||n===Yr||n===zs||n===Zr)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vr||n===Wr)return a===bt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xr)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===qr)return r.COMPRESSED_R11_EAC;if(n===Yr)return r.COMPRESSED_SIGNED_R11_EAC;if(n===zs)return r.COMPRESSED_RG11_EAC;if(n===Zr)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Kr||n===$r||n===Jr||n===Qr||n===jr||n===ea||n===ta||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Kr)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$r)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jr)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qr)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jr)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ea)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ta)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===na)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ia)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sa)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ra)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===la)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ca||n===ua||n===ha)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ca)return a===bt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===da||n===fa||n===Gs||n===pa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===da)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const _g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class vg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new nl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new _i({vertexShader:_g,fragmentShader:xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Mg extends ai{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,f=null,m=null,d=null,g=null,_=null;const E=typeof XRWebGLBinding<"u",h=new vg,p={},M=t.getContextAttributes();let A=null,b=null;const w=[],x=[],u=new Ke;let S=null,F=null;const P=new xn;P.viewport=new Dt;const C=new xn;C.viewport=new Dt;const I=[P,C],B=new gu;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let me=w[ee];return me===void 0&&(me=new Rr,w[ee]=me),me.getTargetRaySpace()},this.getControllerGrip=function(ee){let me=w[ee];return me===void 0&&(me=new Rr,w[ee]=me),me.getGripSpace()},this.getHand=function(ee){let me=w[ee];return me===void 0&&(me=new Rr,w[ee]=me),me.getHandSpace()};function U(ee){const me=x.indexOf(ee.inputSource);if(me===-1)return;const Re=w[me];Re!==void 0&&(Re.update(ee.inputSource,ee.frame,l||a),Re.dispatchEvent({type:ee.type,data:ee.inputSource}))}function W(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",le);for(let ee=0;ee<w.length;ee++){const me=x[ee];me!==null&&(x[ee]=null,w[ee].disconnect(me))}L=null,V=null,h.reset();for(const ee in p)delete p[ee];if(e.setRenderTarget(A),g=null,d=null,m=null,s=null,b=null,we.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(u.width,u.height,!1),F!==null){const ee=F.camera;ee.fov=F.fov,ee.zoom=F.zoom,ee.updateProjectionMatrix(),F=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return m===null&&E&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",W),s.addEventListener("inputsourceschange",le),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(u),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,De=null,de=null;M.depth&&(de=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=M.stencil?ti:si,De=M.stencil?Ui:Dn);const Be={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};m=this.getBinding(),d=m.createProjectionLayer(Be),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Pn(d.textureWidth,d.textureHeight,{format:Cn,type:un,depthTexture:new Fi(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Re={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,Re),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),b=new Pn(g.framebufferWidth,g.framebufferHeight,{format:Cn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),we.setContext(s),we.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function le(ee){for(let me=0;me<ee.removed.length;me++){const Re=ee.removed[me],De=x.indexOf(Re);De>=0&&(x[De]=null,w[De].disconnect(Re))}for(let me=0;me<ee.added.length;me++){const Re=ee.added[me];let De=x.indexOf(Re);if(De===-1){for(let Be=0;Be<w.length;Be++)if(Be>=x.length){x.push(Re),De=Be;break}else if(x[Be]===null){x[Be]=Re,De=Be;break}if(De===-1)break}const de=w[De];de&&de.connect(Re)}}function J(ee,me){me===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(me.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let me=ee.near,Re=ee.far;h.texture!==null&&(h.depthNear>0&&(me=h.depthNear),h.depthFar>0&&(Re=h.depthFar)),B.near=C.near=P.near=me,B.far=C.far=P.far=Re,(L!==B.near||V!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),L=B.near,V=B.far),B.layers.mask=ee.layers.mask|6,P.layers.mask=B.layers.mask&-5,C.layers.mask=B.layers.mask&-3;const De=ee.parent,de=B.cameras;J(B,De);for(let Be=0;Be<de.length;Be++)J(de[Be],De);B.projectionMatrix.copy(P.projectionMatrix),B.projectionMatrixInverse.copy(P.projectionMatrixInverse),F===null&&ee.isPerspectiveCamera&&(F={camera:ee,fov:ee.fov,zoom:ee.zoom}),j(ee,B,De)};function j(ee,me,Re){Re===null?ee.matrix.copy(me.matrixWorld):(ee.matrix.copy(Re.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(me.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(me.projectionMatrix),ee.projectionMatrixInverse.copy(me.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Vs*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ee)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(B)},this.getCameraTexture=function(ee){return p[ee]};let ce=null;function Se(ee,me){if(f=me.getViewerPose(l||a),_=me,f!==null){const Re=f.views;g!==null&&(e.setRenderTargetFramebuffer(b,g.framebuffer),e.setRenderTarget(b));let De=!1;Re.length!==B.cameras.length&&(B.cameras.length=0,De=!0);for(let ke=0;ke<Re.length;ke++){const ht=Re[ke];let _t=null;if(g!==null)_t=g.getViewport(ht);else{const Ae=m.getViewSubImage(d,ht);_t=Ae.viewport,ke===0&&(e.setRenderTargetTextures(b,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(b))}let st=I[ke];st===void 0&&(st=new xn,st.layers.enable(ke),st.viewport=new Dt,I[ke]=st),st.matrix.fromArray(ht.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(ht.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(_t.x,_t.y,_t.width,_t.height),ke===0&&(B.matrix.copy(st.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),De===!0&&B.cameras.push(st)}const de=s.enabledFeatures;if(de&&de.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){m=n.getBinding();const ke=m.getDepthInformation(Re[0]);ke&&ke.isValid&&ke.texture&&h.init(ke,s.renderState)}if(de&&de.includes("camera-access")&&E){e.state.unbindTexture(),m=n.getBinding();for(let ke=0;ke<Re.length;ke++){const ht=Re[ke].camera;if(ht){let _t=p[ht];_t||(_t=new nl,p[ht]=_t);const st=m.getCameraImage(ht);_t.sourceTexture=st}}}}for(let Re=0;Re<w.length;Re++){const De=x[Re],de=w[Re];De!==null&&de!==void 0&&de.update(De,me,l||a)}ce&&ce(ee,me),me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:me}),_=null}const we=new vu;we.setAnimationLoop(Se),this.setAnimationLoop=function(ee){ce=ee},this.dispose=function(){}}}const Sg=new gt,Pu=new je;Pu.set(-1,0,0,0,1,0,0,0,1);function yg(i,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function n(h,p){p.color.getRGB(h.fogColor.value,cu(i)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function s(h,p,M,A,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(h,p):p.isMeshLambertMaterial?(r(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(h,p),m(h,p)):p.isMeshPhongMaterial?(r(h,p),f(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(h,p),d(h,p),p.isMeshPhysicalMaterial&&g(h,p,b)):p.isMeshMatcapMaterial?(r(h,p),_(h,p)):p.isMeshDepthMaterial?r(h,p):p.isMeshDistanceMaterial?(r(h,p),E(h,p)):p.isMeshNormalMaterial?r(h,p):p.isLineBasicMaterial?(a(h,p),p.isLineDashedMaterial&&o(h,p)):p.isPointsMaterial?c(h,p,M,A):p.isSpriteMaterial?l(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===an&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===an&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const M=e.get(p),A=M.envMap,b=M.envMapRotation;A&&(h.envMap.value=A,h.envMapRotation.value.setFromMatrix4(Sg.makeRotationFromEuler(b)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(Pu),h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap&&(h.lightMap.value=p.lightMap,h.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,h.lightMapTransform)),p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function a(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function o(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function c(h,p,M,A){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*M,h.scale.value=A*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function l(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function f(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function m(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function d(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function g(h,p,M){h.ior.value=p.ior,p.diffuseRoughness>0&&(h.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&h.clearcoatNormalScale.value.negate())),p.dispersion>0&&(h.dispersion.value=p.dispersion),p.retroreflectivity>0&&(h.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=M.texture,h.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function _(h,p){p.matcap&&(h.matcap.value=p.matcap)}function E(h,p){const M=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(M.matrixWorld),h.nearDistance.value=M.shadow.camera.near,h.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Eg(i,e,t,n){let s={},r={};function a(M,A){const b=A.program;n.uniformBlockBinding(M,b,s[M.id])}function o(M,A){let b=s[M.id];b===void 0&&(_(M),b=c(M),s[M.id]=b,M.addEventListener("dispose",h));const w=A.program;n.updateUBOMapping(M,w);const x=e.render.frame;r[M.id]!==x&&(l(M),r[M.id]=x)}function c(M){const A=i.createBuffer(),b=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),A}function l(M){const A=s[M.id],b=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let x=0,u=b.length;x<u;x++){const S=b[x];if(Array.isArray(S))for(let F=0,P=S.length;F<P;F++)f(S[F],x,F,w);else f(S,x,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,A,b,w){if(d(M,A,b,w)===!0){const x=M.__offset,u=M.value;if(Array.isArray(u)){let S=0;for(let F=0;F<u.length;F++){const P=u[F],C=E(P,!0);m(P,M.__data,S),S+=C.storage/Float32Array.BYTES_PER_ELEMENT}}else m(u,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,M.__data)}}function m(M,A,b){typeof M=="number"||typeof M=="boolean"?A[b]=M:M.isMatrix3?(A[b]=M.elements[0],A[b+1]=M.elements[1],A[b+2]=M.elements[2],A[b+3]=0,A[b+4]=M.elements[3],A[b+5]=M.elements[4],A[b+6]=M.elements[5],A[b+7]=0,A[b+8]=M.elements[6],A[b+9]=M.elements[7],A[b+10]=M.elements[8],A[b+11]=0):ArrayBuffer.isView(M)?A.set(M.subarray(0,A.length-b),b):M.toArray(A,b)}function d(M,A,b,w){const x=M.value,u=A+"_"+b;if(Array.isArray(x)){w[u]===void 0&&(w[u]=[]);const S=w[u];let F=!1;for(let P=0;P<x.length;P++)g(x[P],S,P)===!0&&(F=!0);return F}return g(x,w,u)}function g(M,A,b){if(A[b]===void 0)return typeof M=="number"||typeof M=="boolean"?A[b]=M:ArrayBuffer.isView(M)?A[b]=M.slice():A[b]=M.clone(),!0;{const w=A[b];if(typeof M=="number"||typeof M=="boolean"){if(w!==M)return A[b]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(w.equals(M)===!1)return w.copy(M),!0}}return!1}function _(M){const A=M.uniforms;let b=0;const w=16;for(let u=0,S=A.length;u<S;u++){const F=Array.isArray(A[u])?A[u]:[A[u]];for(let P=0,C=F.length;P<C;P++){const I=F[P],B=Array.isArray(I.value)?I.value:[I.value],L=Array.isArray(A[u])||Array.isArray(I.value);let V=b;for(let W=0,le=B.length;W<le;W++){const J=B[W],j=E(J,L),ce=b%w,Se=ce%j.boundary,we=ce+Se;b+=Se,we!==0&&w-we<j.storage&&(b+=w-we),W===0&&(V=b),b+=j.storage}const U=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new U((b-V)/Float32Array.BYTES_PER_ELEMENT),I.__offset=V}}const x=b%w;return x>0&&(b+=w-x),M.__size=b,M.__cache={},this}function E(M,A){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=16,b.storage=48):M.isMatrix4?(b.boundary=16,b.storage=64):M.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):$e("WebGLRenderer: Unsupported uniform value type.",M),A===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function h(M){const A=M.target;A.removeEventListener("dispose",h),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:p}}const bg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fn=null;function Tg(){return Fn===null&&(Fn=new $o(bg,16,16,gi,Ln),Fn.name="DFG_LUT",Fn.minFilter=rn,Fn.magFilter=rn,Fn.wrapS=Hn,Fn.wrapT=Hn,Fn.generateMipmaps=!1,Fn.needsUpdate=!0),Fn}class Du{constructor(e={}){const{canvas:t=$c(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:d=!1,outputBufferType:g=un}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const E=g,h=new Set([Pa,Ca,Ra]),p=new Set([un,Dn,ls,Ui,Ta,Aa]),M=new Uint32Array(4),A=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let w=null,x=null;const u=[],S=[];let F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,I=null,B=null,L=null,V=null;this._outputColorSpace=sn;let U=0,W=0,le=null,J=-1,j=null;const ce=new Dt,Se=new Dt;let we=null;const ee=new it(0);let me=0,Re=t.width,De=t.height,de=1,Be=null,yt=null;const ke=new Dt(0,0,Re,De),ht=new Dt(0,0,Re,De);let _t=!1;const st=new us,Ae=new Na;let Xe=!1,ot=!1;const Ve=new gt,mt=new z,xt=new Dt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Tt=!1;function Nt(){return le===null?de:1}let H=n;function Wt(T,G){return t.getContext(T,G)}let nt,ze,Ee,St,Oe,Ze,D,y,X,pe,ne,ge,Me,ie,re,ye,O,se,Y,xe,ue,ve,He;try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ya}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",Ne,!1),t.addEventListener("webglcontextcreationerror",fe,!1),H===null){const G="webgl2";if(H=Wt(G,T),H===null)throw Wt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(T){throw t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),vt("WebGLRenderer: "+T.message),T}function Je(){nt=new Pp(H),nt.init(),ue=new Cu(H,nt),ze=new vp(H,nt,e,ue),Ee=new mg(H,nt),ze.reversedDepthBuffer&&d&&Ee.buffers.depth.setReversed(!0),B=H.createFramebuffer(),L=H.createFramebuffer(),V=H.createFramebuffer(),St=new Ip(H),Oe=new tg,Ze=new gg(H,nt,Ee,Oe,ze,ue,St),D=new Cp(P),y=new Nh(H),ve=new _p(H,y),X=new Dp(H,y,St,ve),pe=new Up(H,X,y,ve,St),se=new Np(H,ze,Ze),re=new Mp(Oe),ne=new eg(P,D,nt,ze,ve,re),ge=new yg(P,Oe),Me=new ig,ie=new cg(nt),O=new gp(P,D,Ee,pe,_,c),ye=new pg(P,pe,ze),He=new Eg(H,St,ze,Ee),Y=new xp(H,nt,St),xe=new Lp(H,nt,St),St.programs=ne.programs,P.capabilities=ze,P.extensions=nt,P.properties=Oe,P.renderLists=Me,P.shadowMap=ye,P.state=Ee,P.info=St}E!==un&&(F=new Op(E,t.width,t.height,o,s,r));const _e=new Mg(P,H);this.xr=_e,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(T){T!==void 0&&(de=T,this.setSize(Re,De,!1))},this.getSize=function(T){return T.set(Re,De)},this.setSize=function(T,G,Q=!0){if(_e.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}Re=T,De=G,t.width=Math.floor(T*de),t.height=Math.floor(G*de),Q===!0&&(t.style.width=T+"px",t.style.height=G+"px"),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(Re*de,De*de).floor()},this.setDrawingBufferSize=function(T,G,Q){Re=T,De=G,de=Q,t.width=Math.floor(T*Q),t.height=Math.floor(G*Q),this.setViewport(0,0,T,G)},this.setEffects=function(T){if(E===un){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let G=0;G<T.length;G++)if(T[G].isOutputPass===!0){$e("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ce)},this.getViewport=function(T){return T.copy(ke)},this.setViewport=function(T,G,Q,K){T.isVector4?ke.set(T.x,T.y,T.z,T.w):ke.set(T,G,Q,K),Ee.viewport(ce.copy(ke).multiplyScalar(Nt()).round())},this.getScissor=function(T){return T.copy(ht)},this.setScissor=function(T,G,Q,K){T.isVector4?ht.set(T.x,T.y,T.z,T.w):ht.set(T,G,Q,K),Ee.scissor(Se.copy(ht).multiplyScalar(Nt()).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(T){Ee.setScissorTest(_t=T)},this.setOpaqueSort=function(T){Be=T},this.setTransparentSort=function(T){yt=T},this.getClearColor=function(T){return T.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(T=!0,G=!0,Q=!0){let K=0;if(T){let $=!1;if(le!==null){const Te=le.texture.format;$=h.has(Te)}if($){const Te=le.texture.type,Ue=p.has(Te),be=O.getClearColor(),Ce=O.getClearAlpha(),Ge=be.r,Qe=be.g,v=be.b;Ue?(M[0]=Ge,M[1]=Qe,M[2]=v,M[3]=Ce,H.clearBufferuiv(H.COLOR,0,M)):(A[0]=Ge,A[1]=Qe,A[2]=v,A[3]=Ce,H.clearBufferiv(H.COLOR,0,A))}else K|=H.COLOR_BUFFER_BIT}G&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),I=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),O.dispose(),Me.dispose(),ie.dispose(),Ze.dispose(),Oe.dispose(),D.dispose(),pe.dispose(),X.dispose(),ve.dispose(),He.dispose(),ne.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",En),_e.removeEventListener("sessionend",_s),Nn.stop()};function Le(T){T.preventDefault(),_o("WebGLRenderer: Context Lost."),C=!0}function Ne(){_o("WebGLRenderer: Context Restored."),C=!1;const T=St.autoReset,G=ye.enabled,Q=ye.autoUpdate,K=ye.needsUpdate,$=ye.type;Je(),St.autoReset=T,ye.enabled=G,ye.autoUpdate=Q,ye.needsUpdate=K,ye.type=$}function fe(T){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function dt(T){const G=T.target;G.removeEventListener("dispose",dt),Rt(G)}function Rt(T){mn(T),Oe.remove(T)}function mn(T){const G=Oe.get(T).programs;G!==void 0&&(G.forEach(function(Q){ne.releaseProgram(Q)}),T.isShaderMaterial&&ne.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,Q,K,$,Te){G===null&&(G=tt);const Ue=$.isMesh&&$.matrixWorld.determinantAffine()<0,be=Si(T,G,Q,K,$);Ee.setMaterial(K,Ue);let Ce=Q.index,Ge=1;if(K.wireframe===!0){if(Ce=X.getWireframeAttribute(Q),Ce===void 0)return;Ge=2}const Qe=Q.drawRange,v=Q.attributes.position;let R=Qe.start*Ge,N=(Qe.start+Qe.count)*Ge;Te!==null&&(R=Math.max(R,Te.start*Ge),N=Math.min(N,(Te.start+Te.count)*Ge)),Ce!==null?(R=Math.max(R,0),N=Math.min(N,Ce.count)):v!=null&&(R=Math.max(R,0),N=Math.min(N,v.count));const Z=N-R;if(Z<0||Z===1/0)return;ve.setup($,K,be,Q,Ce);let k,he=Y;if(Ce!==null&&(k=y.get(Ce),he=xe,he.setIndex(k)),$.isMesh)K.wireframe===!0?(Ee.setLineWidth(K.wireframeLinewidth*Nt()),he.setMode(H.LINES)):he.setMode(H.TRIANGLES);else if($.isLine){let q=K.linewidth;q===void 0&&(q=1),Ee.setLineWidth(q*Nt()),$.isLineSegments?he.setMode(H.LINES):$.isLineLoop?he.setMode(H.LINE_LOOP):he.setMode(H.LINE_STRIP)}else $.isPoints?he.setMode(H.POINTS):$.isSprite&&he.setMode(H.TRIANGLES);if($.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))he.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const q=$._multiDrawStarts,ae=$._multiDrawCounts,qe=$._multiDrawCount,We=Ce?y.get(Ce).bytesPerElement:1,Ie=Oe.get(K).currentProgram.getUniforms();for(let oe=0;oe<qe;oe++)Ie.setValue(H,"_gl_DrawID",oe),he.render(q[oe]/We,ae[oe])}else if($.isInstancedMesh)he.renderInstances(R,Z,$.count);else if(Q.isInstancedBufferGeometry){const q=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,ae=Math.min(Q.instanceCount,q);he.renderInstances(R,Z,ae)}else he.render(R,Z)};function gs(T,G,Q,K){I!==null&&T.isNodeMaterial&&I.setObject(K,T),Xe===!0&&re.setState(T,Q,!1),T.transparent===!0&&T.side===jt&&T.forceSinglePass===!1?(T.side=an,T.needsUpdate=!0,oi(T,G,K),T.side=mi,T.needsUpdate=!0,oi(T,G,K),T.side=jt):oi(T,G,K)}this.compile=function(T,G,Q=null){Q===null&&(Q=T),I!==null&&I.renderStart(T,G,Q),x=ie.get(Q),x.init(G),S.push(x),Q.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(x.pushLight($),$.castShadow&&x.pushShadow($))}),T!==Q&&T.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(x.pushLight($),$.castShadow&&x.pushShadow($))}),x.setupLights(),I!==null&&I.updateLights(x.state.lightsArray),ot=this.localClippingEnabled,Xe=re.init(this.clippingPlanes,ot),Xe===!0&&re.setGlobalState(this.clippingPlanes,G),I!==null&&ye.render(x.state.shadowsArray,Q,G);const K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Te=$.material;if(Te)if(Array.isArray(Te))for(let Ue=0;Ue<Te.length;Ue++){const be=Te[Ue];gs(be,Q,G,$),K.add(be)}else gs(Te,Q,G,$),K.add(Te)}),x=S.pop(),I!==null&&I.renderEnd(),K},this.compileAsync=function(T,G,Q=null){const K=this.compile(T,G,Q);return new Promise($=>{function Te(){if(K.forEach(function(Ue){const Ce=Oe.get(Ue).currentProgram;(Ce===void 0||Ce.isReady())&&K.delete(Ue)}),K.size===0){$(T);return}setTimeout(Te,10)}nt.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Oi=null;function Wn(T){Oi&&Oi(T)}function En(){Nn.stop()}function _s(){Nn.start()}const Nn=new vu;Nn.setAnimationLoop(Wn),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(T){Oi=T,_e.setAnimationLoop(T),T===null?Nn.stop():Nn.start()},_e.addEventListener("sessionstart",En),_e.addEventListener("sessionend",_s),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(T,G);const Q=_e.enabled===!0&&_e.isPresenting===!0,K=F!==null&&(le===null||Q)&&F.begin(P,le);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(G),G=_e.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,G,le),x=ie.get(T,S.length),x.init(G),x.state.textureUnits=Ze.getTextureUnits(),S.push(x),Ve.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?Ae.setFromArrayCamera(G):st.setFromProjectionMatrix(Ve,Sn,G.reversedDepth),ot=this.localClippingEnabled,Xe=re.init(this.clippingPlanes,ot),w=Me.get(T,u.length),w.init(),u.push(w),this.info.render.frame++,_e.enabled===!0&&_e.isPresenting===!0){const Ue=P.xr.getDepthSensingMesh();Ue!==null&&Pt(Ue,G,-1/0,P.sortObjects)}Pt(T,G,0,P.sortObjects),w.finish(),I!==null&&I.updateLights(x.state.lightsArray),P.sortObjects===!0&&w.sort(Be,yt),Tt=_e.enabled===!1||_e.isPresenting===!1||_e.hasDepthSensing()===!1,Tt&&O.addToRenderList(w,T),this.info.autoReset===!0&&this.info.reset(),Xe===!0&&re.beginShadows();const $=x.state.shadowsArray;if(ye.render($,T,G),Xe===!0&&re.endShadows(),(K&&F.hasRenderPass())===!1){const Ue=w.opaque,be=w.transmissive;if(x.setupLights(),G.isArrayCamera){const Ce=G.cameras;if(be.length>0)for(let Ge=0,Qe=Ce.length;Ge<Qe;Ge++){const v=Ce[Ge];Bt(Ue,be,T,v)}Tt&&O.render(T);for(let Ge=0,Qe=Ce.length;Ge<Qe;Ge++){const v=Ce[Ge];Xt(w,T,v,v.viewport)}}else be.length>0&&Bt(Ue,be,T,G),Tt&&O.render(T),Xt(w,T,G)}le!==null&&W===0&&(Ze.updateMultisampleRenderTarget(le),Ze.updateRenderTargetMipmap(le)),K&&F.end(P),T.isScene===!0&&T.onAfterRender(P,T,G),ve.resetDefaultState(),J=-1,j=null,S.pop(),S.length>0?(x=S[S.length-1],Ze.setTextureUnits(x.state.textureUnits),Xe===!0&&re.setGlobalState(P.clippingPlanes,x.state.camera)):x=null,u.pop(),u.length>0?w=u[u.length-1]:w=null,I!==null&&I.renderEnd()};function Pt(T,G,Q,K){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)Q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLight)x.pushLight(T),T.castShadow&&x.pushShadow(T);else if(T.isSprite){const Ue=G.isArrayCamera?Ae:st;if(!T.frustumCulled||T.intersectsFrustum(Ue)){K&&xt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ve);const be=pe.update(T),Ce=T.material;Ce.visible&&w.push(T,be,Ce,Q,xt.z,null,G)}}else if(T.isMesh||T.isLine||T.isPoints){const Ue=G.isArrayCamera?Ae:st;if(!T.frustumCulled||T.intersectsFrustum(Ue)){const be=pe.update(T),Ce=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),xt.copy(T.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),xt.copy(be.boundingSphere.center)),xt.applyMatrix4(T.matrixWorld).applyMatrix4(Ve)),Array.isArray(Ce)){const Ge=be.groups;for(let Qe=0,v=Ge.length;Qe<v;Qe++){const R=Ge[Qe],N=Ce[R.materialIndex];N&&N.visible&&w.push(T,be,N,Q,xt.z,R,G)}}else Ce.visible&&w.push(T,be,Ce,Q,xt.z,null,G)}}}const Te=T.children;for(let Ue=0,be=Te.length;Ue<be;Ue++)Pt(Te[Ue],G,Q,K)}function Xt(T,G,Q,K){const{opaque:$,transmissive:Te,transparent:Ue}=T;x.setupLightsView(Q),Xe===!0&&re.setGlobalState(P.clippingPlanes,Q),K&&Ee.viewport(ce.copy(K)),$.length>0&&en($,G,Q),Te.length>0&&en(Te,G,Q),Ue.length>0&&en(Ue,G,Q),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Bt(T,G,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[K.id]===void 0){const R=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[K.id]=new Pn(1,1,{generateMipmaps:!0,type:R?Ln:un,minFilter:ei,samples:Math.max(4,ze.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pt.workingColorSpace})}const Te=x.state.transmissionRenderTarget[K.id],Ue=K.viewport||ce;Te.setSize(Ue.z*P.transmissionResolutionScale,Ue.w*P.transmissionResolutionScale);const be=P.getRenderTarget(),Ce=P.getActiveCubeFace(),Ge=P.getActiveMipmapLevel();P.setRenderTarget(Te),P.getClearColor(ee),me=P.getClearAlpha(),me<1&&P.setClearColor(16777215,.5),P.clear(),Tt&&O.render(Q);const Qe=P.toneMapping;P.toneMapping=kn;const v=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),x.setupLightsView(K),Xe===!0&&re.setGlobalState(P.clippingPlanes,K),en(T,Q,K),Ze.updateMultisampleRenderTarget(Te),Ze.updateRenderTargetMipmap(Te),nt.has("WEBGL_multisampled_render_to_texture")===!1){let R=!1;for(let N=0,Z=G.length;N<Z;N++){const k=G[N],{object:he,geometry:q,material:ae,group:qe}=k;if(ae.side===jt&&he.layers.test(K.layers)){const We=ae.side;ae.side=an,ae.needsUpdate=!0,bn(he,Q,K,q,ae,qe),ae.side=We,ae.needsUpdate=!0,R=!0}}R===!0&&(Ze.updateMultisampleRenderTarget(Te),Ze.updateRenderTargetMipmap(Te))}P.setRenderTarget(be,Ce,Ge),P.setClearColor(ee,me),v!==void 0&&(K.viewport=v),P.toneMapping=Qe}function en(T,G,Q){const K=G.isScene===!0?G.overrideMaterial:null;for(let $=0,Te=T.length;$<Te;$++){const Ue=T[$],{object:be,geometry:Ce,group:Ge}=Ue;let Qe=Ue.material;Qe.allowOverride===!0&&K!==null&&(Qe=K),be.layers.test(Q.layers)&&bn(be,G,Q,Ce,Qe,Ge)}}function bn(T,G,Q,K,$,Te){I!==null&&$.isNodeMaterial&&I.setObject(T,$),T.onBeforeRender(P,G,Q,K,$,Te),T.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(P,G,Q,K,T,Te),$.transparent===!0&&$.side===jt&&$.forceSinglePass===!1?($.side=an,$.needsUpdate=!0,P.renderBufferDirect(Q,G,K,$,T,Te),$.side=mi,$.needsUpdate=!0,P.renderBufferDirect(Q,G,K,$,T,Te),$.side=jt):P.renderBufferDirect(Q,G,K,$,T,Te),T.onAfterRender(P,G,Q,K,$,Te)}function Ys(T){let G=0;for(const Q of T)Q.texture!==null&&G++;return G}function oi(T,G,Q){G.isScene!==!0&&(G=tt);const K=Oe.get(T),$=x.state.lights,Te=x.state.shadowsArray,Ue=$.state.version,be=ne.getParameters(T,$.state,Te,G,Q,x.state.lightProbeGridArray),Ce=ne.getProgramCacheKey(be);let Ge=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;const Qe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=D.get(T.envMap||K.environment,Qe),K.envMapRotation=K.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Ge===void 0&&(T.addEventListener("dispose",dt),Ge=new Map,K.programs=Ge,K.programVariants=new Map);let v=Ge.get(Ce);if(v!==void 0){if(K.currentProgram===v&&K.lightsStateVersion===Ue)return Zs(T,be),v}else be.uniforms=ne.getUniforms(T),I!==null&&T.isNodeMaterial&&I.build(T,Q,be),T.onBeforeCompile(be,P),v=ne.acquireProgram(be,Ce),Ge.set(Ce,v),K.uniforms=be.uniforms;const R=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(R.clippingPlanes=re.uniform),Zs(T,be),K.needsLights=xs(T),K.lightsStateVersion=Ue,K.needsLights&&(R.ambientLightColor.value=$.state.ambient,R.lightProbe.value=$.state.probe,R.sunLights.value=$.state.sun,R.sunLightShadows.value=$.state.sunShadow,R.directionalLights.value=$.state.directional,R.directionalLightShadows.value=$.state.directionalShadow,R.spotLights.value=$.state.spot,R.spotLightShadows.value=$.state.spotShadow,R.rectAreaLights.value=$.state.rectArea,R.ltc_1.value=$.state.rectAreaLTC1,R.ltc_2.value=$.state.rectAreaLTC2,R.pointLights.value=$.state.point,R.pointLightShadows.value=$.state.pointShadow,R.hemisphereLights.value=$.state.hemi,R.sunShadowMatrix.value=$.state.sunShadowMatrix,R.sunShadowCascade.value=$.state.sunShadowCascade,R.directionalShadowMatrix.value=$.state.directionalShadowMatrix,R.spotLightMatrix.value=$.state.spotLightMatrix,R.spotLightMap.value=$.state.spotLightMap,R.pointShadowMatrix.value=$.state.pointShadowMatrix),K.numLightProbeGrids=Ys(x.state.lightProbeGridArray),K.currentProgram=v,K.uniformsList=null,v}function At(T,G,Q,K,$){const Te=Oe.get(T),Ue=Te.currentProgram.id+","+K+","+$;let be=Te.programVariants.get(Ue);return be===void 0?(be=oi(T,G,Q),Te.programVariants.set(Ue,be)):(Te.currentProgram=be,Te.uniformsList=null,Te.outputColorSpace=K,Te.toneMapping=$),be}function Bi(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Cr.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Zs(T,G){const Q=Oe.get(T);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function Si(T,G,Q,K,$){G.isScene!==!0&&(G=tt),Ze.resetTextureUnits();const Te=G.fog,Ue=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,be=le===null?P.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:pt.workingColorSpace,Ce=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ge=D.get(K.envMap||Ue,Ce),Qe=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,v=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),R=!!Q.morphAttributes.position,N=!!Q.morphAttributes.normal,Z=!!Q.morphAttributes.color;let k=kn;K.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(k=P.toneMapping);const he=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,q=he!==void 0?he.length:0,ae=Oe.get(K),qe=x.state.lights;if(Xe===!0&&(ot===!0||T!==j)){const ft=T===j&&K.id===J;re.setState(K,T,ft)}let We=!1,Ie=!1;K.version===ae.__version?ae.needsLights&&ae.lightsStateVersion!==qe.state.version||$.isBatchedMesh&&ae.batching===!1||!$.isBatchedMesh&&ae.batching===!0||$.isBatchedMesh&&ae.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&ae.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&ae.instancing===!1||!$.isInstancedMesh&&ae.instancing===!0||$.isSkinnedMesh&&ae.skinning===!1||!$.isSkinnedMesh&&ae.skinning===!0||$.isInstancedMesh&&ae.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ae.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ae.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ae.instancingMorph===!1&&$.morphTexture!==null||ae.envMap!==Ge||K.fog===!0&&ae.fog!==Te||ae.numClippingPlanes!==void 0&&(ae.numClippingPlanes!==re.numPlanes||ae.numIntersection!==re.numIntersection)||ae.vertexAlphas!==Qe||ae.vertexTangents!==v||ae.morphTargets!==R||ae.morphNormals!==N||ae.morphColors!==Z||ae.morphTargetsCount!==q||ae.numLightProbeGrids!==Ys(x.state.lightProbeGridArray)?We=!0:(ae.outputColorSpace!==be||ae.toneMapping!==k)&&(Ie=!0):(We=!0,ae.__version=K.version);let oe=ae.currentProgram;(We===!0||Ie===!0)&&(oe=Ie===!0?At(K,G,$,be,k):oi(K,G,$),I&&K.isNodeMaterial&&I.onUpdateProgram(K,oe,ae));let te=!1,lt=!1,rt=!1;const Fe=oe.getUniforms(),Ct=ae.uniforms;if(Ee.useProgram(oe.program)&&(te=!0,lt=!0,rt=!0),K.id!==J&&(J=K.id,lt=!0),te||j!==T){Ee.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Fe.setValue(H,"projectionMatrix",T.projectionMatrix),Fe.setValue(H,"viewMatrix",T.matrixWorldInverse);const ut=Fe.map.cameraPosition;ut!==void 0&&ut.setValue(H,mt.setFromMatrixPosition(T.matrixWorld)),ze.logarithmicDepthBuffer&&Fe.setValue(H,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Fe.setValue(H,"isOrthographic",T.isOrthographicCamera===!0),j!==T&&(j=T,lt=!0,rt=!0)}if(ae.needsLights&&(qe.state.sunShadowMap.length>0&&Fe.setValue(H,"sunShadowMap",qe.state.sunShadowMap,Ze),qe.state.directionalShadowMap.length>0&&Fe.setValue(H,"directionalShadowMap",qe.state.directionalShadowMap,Ze),qe.state.spotShadowMap.length>0&&Fe.setValue(H,"spotShadowMap",qe.state.spotShadowMap,Ze),qe.state.pointShadowMap.length>0&&Fe.setValue(H,"pointShadowMap",qe.state.pointShadowMap,Ze)),$.isSkinnedMesh){Fe.setOptional(H,$,"bindMatrix"),Fe.setOptional(H,$,"bindMatrixInverse");const ft=$.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Fe.setValue(H,"boneTexture",ft.boneTexture,Ze))}$.isBatchedMesh&&(Fe.setOptional(H,$,"batchingTexture"),Fe.setValue(H,"batchingTexture",$._matricesTexture,Ze),Fe.setOptional(H,$,"batchingIdTexture"),Fe.setValue(H,"batchingIdTexture",$._indirectTexture,Ze),Fe.setOptional(H,$,"batchingColorTexture"),$._colorsTexture!==null&&Fe.setValue(H,"batchingColorTexture",$._colorsTexture,Ze));const It=Q.morphAttributes;if((It.position!==void 0||It.normal!==void 0||It.color!==void 0)&&se.update($,Q,oe),(lt||ae.receiveShadow!==$.receiveShadow)&&(ae.receiveShadow=$.receiveShadow,Fe.setValue(H,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(Ct.envMapIntensity.value=G.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=Tg()),lt){if(Fe.setValue(H,"toneMappingExposure",P.toneMappingExposure),ae.needsLights&&Ks(Ct,rt),Te&&K.fog===!0&&ge.refreshFogUniforms(Ct,Te),ge.refreshMaterialUniforms(Ct,K,de,De,x.state.transmissionRenderTarget[T.id]),ae.needsLights&&ae.numLightProbeGrids>0){const ft=b;let ut=0;for(const et of x.state.lightProbeGridArray)et.texture!==null&&(ft.textures[ut]=et.texture,ft.min[ut]=et.boundingBox.min,ft.max[ut]=et.boundingBox.max,ft.resolution[ut]=et.resolution,ut++);for(const et in ft)ft[et].length=ut;Ct.probesSH.value=ft.textures,Ct.probesMin.value=ft.min,Ct.probesMax.value=ft.max,Ct.probesResolution.value=ft.resolution}Cr.upload(H,Bi(ae),Ct,Ze)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Cr.upload(H,Bi(ae),Ct,Ze),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Fe.setValue(H,"center",$.center),Fe.setValue(H,"modelViewMatrix",$.modelViewMatrix),Fe.setValue(H,"normalMatrix",$.normalMatrix),Fe.setValue(H,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const ft=K.uniformsGroups;for(let ut=0,et=ft.length;ut<et;ut++){const $t=ft[ut];He.update($t,oe),He.bind($t,oe)}}return oe}function Ks(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.sunLights.needsUpdate=G,T.sunLightShadows.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function xs(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(T,G,Q){const K=Oe.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Oe.get(T.texture).__webglTexture=G,Oe.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,G){const Q=Oe.get(T);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,Q=0){le=T,U=G,W=Q;let K=null,$=!1,Te=!1;if(T){const be=Oe.get(T);if(be.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(H.FRAMEBUFFER,be.__webglFramebuffer),ce.copy(T.viewport),Se.copy(T.scissor),we=T.scissorTest,Ee.viewport(ce),Ee.scissor(Se),Ee.setScissorTest(we),J=-1;return}else if(be.__webglFramebuffer===void 0)Ze.setupRenderTarget(T);else if(be.__hasExternalTextures)Ze.rebindTextures(T,Oe.get(T.texture).__webglTexture,Oe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Qe=T.depthTexture;if(be.__boundDepthTexture!==Qe){if(Qe!==null&&Oe.has(Qe)&&(T.width!==Qe.image.width||T.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(T)}}const Ce=T.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Te=!0);const Ge=Oe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?K=Ge[G][Q]:K=Ge[G],$=!0):T.samples>0&&Ze.useMultisampledRTT(T)===!1?K=Oe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?K=Ge[Q]:K=Ge,ce.copy(T.viewport),Se.copy(T.scissor),we=T.scissorTest}else ce.copy(ke).multiplyScalar(de).floor(),Se.copy(ht).multiplyScalar(de).floor(),we=_t;if(Q!==0&&(K=B),Ee.bindFramebuffer(H.FRAMEBUFFER,K)&&Ee.drawBuffers(T,K),Ee.viewport(ce),Ee.scissor(Se),Ee.setScissorTest(we),$){const be=Oe.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,be.__webglTexture,Q)}else if(Te){const be=G;for(let Ce=0;Ce<T.textures.length;Ce++){const Ge=Oe.get(T.textures[Ce]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ce,Ge.__webglTexture,Q,be)}}else if(T!==null&&Q!==0){const be=Oe.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,be.__webglTexture,Q)}J=-1};function Xn(T){const G=Oe.get(T);return(G.__readFormat!==T.format||G.__readType!==T.type)&&(G.__readFormat=T.format,G.__readType=T.type,G.__formatReadable=ze.textureFormatReadable(T.format),G.__typeReadable=ze.textureTypeReadable(T.type)),G}this.readRenderTargetPixels=function(T,G,Q,K,$,Te,Ue,be=0){if(!(T&&T.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ce=Ce[Ue],Array.isArray(Ce)&&(Ce=Ce[0])),Ce){Ee.bindFramebuffer(H.FRAMEBUFFER,Ce);try{const Ge=T.textures[be],Qe=Ge.format,v=Ge.type;T.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+be);const R=Xn(Ge);if(R.__formatReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(R.__typeReadable===!1){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-K&&Q>=0&&Q<=T.height-$&&H.readPixels(G,Q,K,$,ue.convert(Qe),ue.convert(v),Te)}finally{const Ge=le!==null?Oe.get(le).__webglFramebuffer:null;Ee.bindFramebuffer(H.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(T,G,Q,K,$,Te,Ue,be=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ce=Ce[Ue],Array.isArray(Ce)&&(Ce=Ce[0])),Ce)if(G>=0&&G<=T.width-K&&Q>=0&&Q<=T.height-$){Ee.bindFramebuffer(H.FRAMEBUFFER,Ce);const Ge=T.textures[be],Qe=Ge.format,v=Ge.type;T.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+be);const R=Xn(Ge);if(R.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(R.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const N=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,N),H.bufferData(H.PIXEL_PACK_BUFFER,Te.byteLength,H.STREAM_READ),H.readPixels(G,Q,K,$,ue.convert(Qe),ue.convert(v),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const Z=le!==null?Oe.get(le).__webglFramebuffer:null;Ee.bindFramebuffer(H.FRAMEBUFFER,Z);const k=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Yu(H,k,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,N),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Te),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(N),H.deleteSync(k),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,G=null,Q=0){const K=Math.pow(2,-Q),$=Math.floor(T.image.width*K),Te=Math.floor(T.image.height*K),Ue=G!==null?G.x:0,be=G!==null?G.y:0;Ze.setTexture2D(T,0),H.copyTexSubImage2D(H.TEXTURE_2D,Q,0,0,Ue,be,$,Te),Ee.unbindTexture()},this.copyTextureToTexture=function(T,G,Q=null,K=null,$=0,Te=0){let Ue,be,Ce,Ge,Qe,v,R,N,Z;const k=T.isCompressedTexture?T.mipmaps[Te]:T.image;if(Q!==null)Ue=Q.max.x-Q.min.x,be=Q.max.y-Q.min.y,Ce=Q.isBox3?Q.max.z-Q.min.z:1,Ge=Q.min.x,Qe=Q.min.y,v=Q.isBox3?Q.min.z:0;else{const Fe=Math.pow(2,-$);Ue=Math.floor(k.width*Fe),be=Math.floor(k.height*Fe),T.isDataArrayTexture?Ce=k.depth:T.isData3DTexture?Ce=Math.floor(k.depth*Fe):Ce=1,Ge=0,Qe=0,v=0}K!==null?(R=K.x,N=K.y,Z=K.z):(R=0,N=0,Z=0);const he=ue.convert(G.format),q=ue.convert(G.type);let ae;G.isData3DTexture?(Ze.setTexture3D(G,0),ae=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Ze.setTexture2DArray(G,0),ae=H.TEXTURE_2D_ARRAY):(Ze.setTexture2D(G,0),ae=H.TEXTURE_2D),Ee.activeTexture(H.TEXTURE0),Ee.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),Ee.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),Ee.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const qe=Ee.getParameter(H.UNPACK_ROW_LENGTH),We=Ee.getParameter(H.UNPACK_IMAGE_HEIGHT),Ie=Ee.getParameter(H.UNPACK_SKIP_PIXELS),oe=Ee.getParameter(H.UNPACK_SKIP_ROWS),te=Ee.getParameter(H.UNPACK_SKIP_IMAGES);Ee.pixelStorei(H.UNPACK_ROW_LENGTH,k.width),Ee.pixelStorei(H.UNPACK_IMAGE_HEIGHT,k.height),Ee.pixelStorei(H.UNPACK_SKIP_PIXELS,Ge),Ee.pixelStorei(H.UNPACK_SKIP_ROWS,Qe),Ee.pixelStorei(H.UNPACK_SKIP_IMAGES,v);const lt=T.isDataArrayTexture||T.isData3DTexture,rt=G.isDataArrayTexture||G.isData3DTexture;if(T.isDepthTexture){const Fe=Oe.get(T),Ct=Oe.get(G),It=Oe.get(Fe.__renderTarget),ft=Oe.get(Ct.__renderTarget);Ee.bindFramebuffer(H.READ_FRAMEBUFFER,It.__webglFramebuffer),Ee.bindFramebuffer(H.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let ut=0;ut<Ce;ut++)lt&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Oe.get(T).__webglTexture,$,v+ut),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Oe.get(G).__webglTexture,Te,Z+ut)),H.blitFramebuffer(Ge,Qe,Ge+Ue,Qe+be,R,N,R+Ue,N+be,H.DEPTH_BUFFER_BIT,H.NEAREST);Ee.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||Oe.has(T)){const Fe=Oe.get(T),Ct=Oe.get(G);Ee.bindFramebuffer(H.READ_FRAMEBUFFER,L),Ee.bindFramebuffer(H.DRAW_FRAMEBUFFER,V);for(let It=0;It<Ce;It++)lt?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Fe.__webglTexture,$,v+It):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Fe.__webglTexture,$),rt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ct.__webglTexture,Te,Z+It):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ct.__webglTexture,Te),$!==0?H.blitFramebuffer(Ge,Qe,Ge+Ue,Qe+be,R,N,R+Ue,N+be,H.COLOR_BUFFER_BIT,H.NEAREST):rt?H.copyTexSubImage3D(ae,Te,R,N,Z+It,Ge,Qe,Ue,be):H.copyTexSubImage2D(ae,Te,R,N,Ge,Qe,Ue,be);Ee.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else rt?T.isDataTexture||T.isData3DTexture?H.texSubImage3D(ae,Te,R,N,Z,Ue,be,Ce,he,q,k.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(ae,Te,R,N,Z,Ue,be,Ce,he,k.data):H.texSubImage3D(ae,Te,R,N,Z,Ue,be,Ce,he,q,k):T.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Te,R,N,Ue,be,he,q,k.data):T.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Te,R,N,k.width,k.height,he,k.data):H.texSubImage2D(H.TEXTURE_2D,Te,R,N,Ue,be,he,q,k);Ee.pixelStorei(H.UNPACK_ROW_LENGTH,qe),Ee.pixelStorei(H.UNPACK_IMAGE_HEIGHT,We),Ee.pixelStorei(H.UNPACK_SKIP_PIXELS,Ie),Ee.pixelStorei(H.UNPACK_SKIP_ROWS,oe),Ee.pixelStorei(H.UNPACK_SKIP_IMAGES,te),Te===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(ae),Ee.unbindTexture()},this.initRenderTarget=function(T){Oe.get(T).__webglFramebuffer===void 0&&Ze.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ze.setTextureCube(T,0):T.isData3DTexture?Ze.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ze.setTexture2DArray(T,0):Ze.setTexture2D(T,0),Ee.unbindTexture()},this.resetState=function(){U=0,W=0,le=null,Ee.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}const Ag=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Ea,AddEquation:Pi,AddOperation:zc,AdditiveBlending:Bs,AgXToneMapping:Lo,AlphaFormat:zo,AlwaysCompare:Vo,AlwaysDepth:Dr,AlwaysStencilFunc:Vc,ArrayCamera:gu,BackSide:an,BasicDepthPacking:Hc,Box3:xi,BoxGeometry:Ht,BufferAttribute:on,BufferGeometry:Zt,ByteType:Uo,Camera:sl,CanvasTexture:Mo,CineonToneMapping:Po,ClampToEdgeWrapping:Hn,Color:it,ColorManagement:pt,ConeGeometry:Vn,ConstantAlphaFactor:Fc,ConstantColorFactor:Nc,Controls:xu,CubeCamera:va,CubeDepthTexture:tl,CubeReflectionMapping:Ni,CubeRefractionMapping:os,CubeTexture:el,CullFaceBack:fo,CullFaceFront:xc,CullFaceNone:_c,CustomBlending:Mc,CustomToneMapping:Do,CylinderGeometry:yn,Data3DTexture:iu,DataArrayTexture:Yo,DataTexture:$o,DepthFormat:si,DepthStencilFormat:ti,DepthTexture:Fi,DirectionalLight:So,DoubleSide:jt,DstAlphaFactor:Cc,DstColorFactor:Dc,DynamicDrawUsage:Wo,EqualCompare:qc,EqualDepth:Ir,EquirectangularReflectionMapping:br,EquirectangularRefractionMapping:Tr,Euler:In,EventDispatcher:ai,ExternalTexture:nl,Float32BufferAttribute:wt,FloatType:Mn,FogExp2:Ia,FrontSide:mi,Frustum:us,FrustumArray:Na,GLSL3:go,GreaterCompare:Yc,GreaterDepth:Ur,GreaterEqualCompare:ko,GreaterEqualDepth:Nr,Group:pn,HalfFloatType:Ln,HemisphereLight:pu,IcosahedronGeometry:Fa,ImageUtils:tu,InstancedBufferAttribute:xo,InstancedMesh:Jo,IntType:ba,KeepStencilOp:wr,Layers:La,LessCompare:Xc,LessDepth:Lr,LessEqualCompare:Ho,LessEqualDepth:as,Light:il,LightShadow:mu,Line:au,LineBasicMaterial:Qo,LineSegments:ou,LinearFilter:rn,LinearMipmapLinearFilter:ei,LinearMipmapNearestFilter:Ar,LinearSRGBColorSpace:Hs,LinearToneMapping:Ro,LinearTransfer:ks,MOUSE:Li,Material:Mi,MathUtils:ss,Matrix3:je,Matrix4:gt,MaxEquation:bc,Mesh:Mt,MeshBasicMaterial:Gn,MeshDepthMaterial:du,MeshDistanceMaterial:fu,MeshStandardMaterial:ds,MinEquation:Ec,MirroredRepeatWrapping:Br,MixOperation:Bc,MultiplyBlending:mo,MultiplyOperation:wo,NearestFilter:Yt,NearestMipmapLinearFilter:Rs,NearestMipmapNearestFilter:Gc,NeutralToneMapping:Io,NeverCompare:Wc,NeverDepth:Pr,NoBlending:Ii,NoColorSpace:Qn,NoToneMapping:kn,NormalBlending:is,NotEqualCompare:Zc,NotEqualDepth:Fr,Object3D:Ot,ObjectSpaceNormalMap:kc,OneFactor:Ac,OneMinusConstantAlphaFactor:Oc,OneMinusConstantColorFactor:Uc,OneMinusDstAlphaFactor:Pc,OneMinusDstColorFactor:Lc,OneMinusSrcAlphaFactor:Ao,OneMinusSrcColorFactor:Rc,OrthographicCamera:rl,PCFShadowMap:Ps,PCFSoftShadowMap:vc,PMREMGenerator:Xs,PerspectiveCamera:xn,Plane:zn,PlaneGeometry:ri,Points:lu,PointsMaterial:jo,PolyhedronGeometry:Ua,Quaternion:hn,R11_EAC_Format:qr,RED_GREEN_RGTC2_Format:Gs,RED_RGTC1_Format:da,REVISION:ya,RG11_EAC_Format:zs,RGBAFormat:Cn,RGBAIntegerFormat:Pa,RGBA_ASTC_10x10_Format:aa,RGBA_ASTC_10x5_Format:ia,RGBA_ASTC_10x6_Format:sa,RGBA_ASTC_10x8_Format:ra,RGBA_ASTC_12x10_Format:oa,RGBA_ASTC_12x12_Format:la,RGBA_ASTC_4x4_Format:Kr,RGBA_ASTC_5x4_Format:$r,RGBA_ASTC_5x5_Format:Jr,RGBA_ASTC_6x5_Format:Qr,RGBA_ASTC_6x6_Format:jr,RGBA_ASTC_8x5_Format:ea,RGBA_ASTC_8x6_Format:ta,RGBA_ASTC_8x8_Format:na,RGBA_BPTC_Format:ca,RGBA_ETC2_EAC_Format:Xr,RGBA_PVRTC_2BPPV1_Format:kr,RGBA_PVRTC_4BPPV1_Format:Hr,RGBA_S3TC_DXT1_Format:Ls,RGBA_S3TC_DXT3_Format:Is,RGBA_S3TC_DXT5_Format:Ns,RGBFormat:Go,RGB_BPTC_SIGNED_Format:ua,RGB_BPTC_UNSIGNED_Format:ha,RGB_ETC1_Format:Vr,RGB_ETC2_Format:Wr,RGB_PVRTC_2BPPV1_Format:Gr,RGB_PVRTC_4BPPV1_Format:zr,RGB_S3TC_DXT1_Format:Ds,RGFormat:gi,RGIntegerFormat:Ca,RawShaderMaterial:hu,Ray:ps,Raycaster:_u,RedFormat:wa,RedIntegerFormat:Ra,ReinhardToneMapping:Co,RenderTarget:nu,RepeatWrapping:Or,ReverseSubtractEquation:yc,RingGeometry:Ws,SIGNED_R11_EAC_Format:Yr,SIGNED_RED_GREEN_RGTC2_Format:pa,SIGNED_RED_RGTC1_Format:fa,SIGNED_RG11_EAC_Format:Zr,SRGBColorSpace:sn,SRGBTransfer:bt,Scene:ru,ShaderChunk:at,ShaderLib:Rn,ShaderMaterial:_i,ShortType:Fo,Sphere:vi,SphereGeometry:pi,Spherical:Eo,SrcAlphaFactor:To,SrcAlphaSaturateFactor:Ic,SrcColorFactor:wc,StaticDrawUsage:Kc,SubtractEquation:Sc,SubtractiveBlending:po,TOUCH:Di,TangentSpaceNormalMap:ma,Texture:Kt,TextureSource:Da,TorusGeometry:ii,Triangle:vn,UVMapping:No,Uint16BufferAttribute:Zo,Uint32BufferAttribute:Ko,UniformsLib:Pe,UniformsUtils:uu,UnsignedByteType:un,UnsignedInt101111Type:Bo,UnsignedInt248Type:Ui,UnsignedInt5999Type:Oo,UnsignedIntType:Dn,UnsignedShort4444Type:Ta,UnsignedShort5551Type:Aa,UnsignedShortType:ls,VSMShadowMap:ns,Vector2:Ke,Vector3:z,Vector4:Dt,WebGLCoordinateSystem:Sn,WebGLCubeRenderTarget:Oa,WebGLRenderTarget:Pn,WebGLRenderer:Du,WebGLUtils:Cu,WebGPUCoordinateSystem:cs,WebXRController:Rr,ZeroFactor:Tc,createCanvasElement:$c,error:vt,log:_o,warn:$e,warnOnce:Us},Symbol.toStringTag,{value:"Module"})),dc={type:"change"},al={type:"start"},Lu={type:"end"},yr=new ps,fc=new zn,wg=Math.cos(70*ss.DEG2RAD),Gt=new z,cn=2*Math.PI,Et={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ho=1e-6;class Rg extends xu{constructor(e,t=null){super(e,t),this.state=Et.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Li.ROTATE,MIDDLE:Li.DOLLY,RIGHT:Li.PAN},this.touches={ONE:Di.ROTATE,TWO:Di.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new hn,this._lastTargetPosition=new z,this._quat=new hn().setFromUnitVectors(e.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Eo,this._sphericalDelta=new Eo,this._scale=1,this._panOffset=new z,this._rotateStart=new Ke,this._rotateEnd=new Ke,this._rotateDelta=new Ke,this._panStart=new Ke,this._panEnd=new Ke,this._panDelta=new Ke,this._dollyStart=new Ke,this._dollyEnd=new Ke,this._dollyDelta=new Ke,this._dollyDirection=new z,this._mouse=new Ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Pg.bind(this),this._onPointerDown=Cg.bind(this),this._onPointerUp=Dg.bind(this),this._onContextMenu=Bg.bind(this),this._onMouseWheel=Ng.bind(this),this._onKeyDown=Ug.bind(this),this._onTouchStart=Fg.bind(this),this._onTouchMove=Og.bind(this),this._onMouseDown=Lg.bind(this),this._onMouseMove=Ig.bind(this),this._interceptControlDown=zg.bind(this),this._interceptControlUp=Gg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Et.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(dc),this.update(),this.state=Et.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===Et.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=cn:n>Math.PI&&(n-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Gt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new z(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new z(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(yr.origin.copy(this.object.position),yr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yr.direction))<wg?this.object.lookAt(this.target):(fc.setFromNormalAndCoplanarPoint(this.object.up,this.target),yr.intersectPlane(fc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ho||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ho||this._lastTargetPosition.distanceToSquared(this.target)>ho?(this.dispatchEvent(dc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?cn/60*this.autoRotateSpeed*e:cn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Gt.copy(s).sub(this.target);let r=Gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ke,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Cg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Pg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Dg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lu),this.state=Et.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Lg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Li.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Et.DOLLY;break;case Li.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Et.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Et.ROTATE}break;case Li.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Et.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Et.PAN}break;default:this.state=Et.NONE}this.state!==Et.NONE&&this.dispatchEvent(al)}function Ig(i){switch(this.state){case Et.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Et.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Et.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ng(i){this.enabled===!1||this.enableZoom===!1||this.state!==Et.NONE||(i.preventDefault(),this.dispatchEvent(al),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Lu))}function Ug(i){this.enabled!==!1&&this._handleKeyDown(i)}function Fg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Di.ROTATE:if(this.enableRotate===!1){this.state=Et.NONE;break}this._handleTouchStartRotate(i),this.state=Et.TOUCH_ROTATE;break;case Di.PAN:if(this.enablePan===!1){this.state=Et.NONE;break}this._handleTouchStartPan(i),this.state=Et.TOUCH_PAN;break;default:this.state=Et.NONE}break;case 2:switch(this.touches.TWO){case Di.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Et.TOUCH_DOLLY_PAN;break;case Di.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Et.TOUCH_DOLLY_ROTATE;break;default:this.state=Et.NONE}break;default:this.state=Et.NONE}this.state!==Et.NONE&&this.dispatchEvent(al)}function Og(i){switch(this._trackPointer(i),this.state){case Et.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Et.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Et.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Et.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Et.NONE}}function Bg(i){this.enabled!==!1&&i.preventDefault()}function zg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Gg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ws=new z;function _n(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ws.copy(e),ws[n]=0,ws.normalize();const l=.5*a/(a+o),f=1-ws.angleTo(i)/c;return Math.sign(ws[t])===1?f*l:o/(a+o)+l+l*(1-f)}class Ma extends Ht{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new z,l=new z,f=new z(e,t,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,d=this.attributes.normal.array,g=this.attributes.uv.array,_=m.length/6,E=new z,h=.5/a;for(let p=0,M=0;p<m.length;p+=3,M+=2)switch(c.fromArray(m,p),l.copy(c),l.x-=Math.sign(l.x)*h,l.y-=Math.sign(l.y)*h,l.z-=Math.sign(l.z)*h,l.normalize(),m[p+0]=f.x*Math.sign(c.x)+l.x*r,m[p+1]=f.y*Math.sign(c.y)+l.y*r,m[p+2]=f.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/_)){case 0:E.set(1,0,0),g[M+0]=_n(E,l,"z","y",r,n),g[M+1]=1-_n(E,l,"y","z",r,t);break;case 1:E.set(-1,0,0),g[M+0]=1-_n(E,l,"z","y",r,n),g[M+1]=1-_n(E,l,"y","z",r,t);break;case 2:E.set(0,1,0),g[M+0]=1-_n(E,l,"x","z",r,e),g[M+1]=_n(E,l,"z","x",r,n);break;case 3:E.set(0,-1,0),g[M+0]=1-_n(E,l,"x","z",r,e),g[M+1]=1-_n(E,l,"z","x",r,n);break;case 4:E.set(0,0,1),g[M+0]=1-_n(E,l,"x","y",r,e),g[M+1]=1-_n(E,l,"y","x",r,t);break;case 5:E.set(0,0,-1),g[M+0]=_n(E,l,"x","y",r,e),g[M+1]=1-_n(E,l,"y","x",r,t);break}}static fromJSON(e){return new Ma(e.width,e.height,e.depth,e.segments,e.radius)}}function jn(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Zt;c.morphTargetsRelative=o;let l=0;for(let f=0;f<i.length;++f){const m=i[f];let d=0,g=0;if(t!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in m.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(m.attributes[_]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(o!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in m.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(m.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;a[_]===void 0&&(a[_]=[]),a[_].push(m.morphAttributes[_]),g++}if(g!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let _;if(t)_=m.index.count;else if(m.attributes.position!==void 0)_=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,f),l+=_}}if(t){let f=0;const m=[];for(let d=0;d<i.length;++d){const g=i[d].index;for(let _=0;_<g.count;++_)m.push(g.getX(_)+f);f+=i[d].attributes.position.count}c.setIndex(m)}for(const f in r){const m=pc(r[f]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,m)}for(const f in a){const m=a[f][0].length;if(m!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let d=0;d<m;++d){const g=[];for(let E=0;E<a[f].length;++E)g.push(a[f][E][d]);const _=pc(g);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(_)}}}return c}function pc(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const f=i[l];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=f.gpuType),s!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=f.count*t}const a=new e(r),o=new on(a,t,n);let c=0;for(let l=0;l<i.length;++l){const f=i[l];if(f.isInterleavedBufferAttribute){const m=c/t;for(let d=0,g=f.count;d<g;d++)for(let _=0;_<t;_++){const E=f.getComponent(d,_);o.setComponent(d+m,_,E)}}else a.set(f.array,c);c+=f.count*t}return s!==void 0&&(o.gpuType=s),o}const Hg=128,kg=8,Vg=-36.75,Wg=-28,Xg=10.5,qg=12,Yg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],Ut={capacity:Hg,columns:kg,startX:Vg,startZ:Wg,spacingX:Xg,spacingZ:qg,boxes:Yg};function Ga(i){return Number.isInteger(i)&&i>=0&&i<Ut.capacity?{slot:i,x:Ut.startX+i%Ut.columns*Ut.spacingX,z:Ut.startZ-Math.floor(i/Ut.columns)*Ut.spacingZ}:null}function Zg(i,e=i,t=null,n=Ut.capacity){const s=[],r=Math.min(i.x,e.x)-.4,a=Math.max(i.x,e.x)+.4,o=Math.min(i.z,e.z)-.4,c=Math.max(i.z,e.z)+.4,l=Math.max(0,Math.ceil((r-5.1-Ut.startX)/Ut.spacingX)),f=Math.min(Ut.columns-1,Math.floor((a+5.1-Ut.startX)/Ut.spacingX)),m=Math.max(0,Math.ceil((Ut.startZ-c-5.3)/Ut.spacingZ)),d=Math.min(Math.ceil(Ut.capacity/Ut.columns)-1,Math.floor((Ut.startZ-o+5.3)/Ut.spacingZ));for(let g=m;g<=d;g++)for(let _=l;_<=f;_++){const E=g*Ut.columns+_,h=Ga(E);if(!(!h||E>=n))for(const p of Ut.boxes)p.tag==="home-door"&&E===t||s.push({left:h.x+p.x-p.w/2,right:h.x+p.x+p.w/2,back:h.z+p.z-p.d/2,front:h.z+p.z+p.d/2,top:p.top,tag:p.tag})}return s}function Ci(i,e){return!!(e&&i&&Math.abs(i.x-e.x)<4.4&&Math.abs(i.z-e.z)<3.7)}function Kg({scene:i,material:e,ownedGeometries:t}){const s=Array(128).fill(null),r=new Map,a=new Map,o=[],c=new Set,l=new gt,f=new hn,m=new z(1,1,1),d=new gt().makeScale(0,0,0);let g=null,_=1,E=0,h=null;const p={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function M(C,I,B,L,V,U="inside",W=0){I=p[I]||I;let le=C;le.index&&(le=C.toNonIndexed(),C.dispose()),f.setFromEuler(new In(0,0,W)),le.applyMatrix4(l.compose(new z(B,L,V),f,m));const J=`${U}:${I}`;a.has(J)||a.set(J,{layer:U,color:I,geometries:[]}),a.get(J).geometries.push(le)}const A=(C,I,B,L,V,U,W,le="inside",J=0)=>M(new Ht(C,I,B),W,L,V,U,le,J),b=(C,I,B,L,V,U)=>M(new yn(C,C,I,10),U,B,L,V);function w(C,I,B,L,V){M(new pi(C,9,6),V,I,B,L)}A(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),A(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),A(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),A(9.2,.08,7.8,0,.16,0,"#c8a178");for(let C=-4.2;C<4.5;C+=.7)A(.018,.012,7.6,C,.21,0,"#ab8965");A(3,.22,1,0,-.04,4.3,"#d7c5a7"),A(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),A(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),A(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),A(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const C of[-2.7,2.7])A(4,3.45,.18,C,1.9,3.9,"#e7dec9","front");A(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),A(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),A(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const C of[-2.85,2.85]){A(2.35,1.55,.12,C,2.05,4.04,"#71948d","front");for(const I of[-1.2,0,1.2])A(.055,1.65,.14,C+I,2.05,4.12,"#cfbb8c","front");for(const I of[1.23,2.87])A(2.45,.065,.14,C,I,4.12,"#cfbb8c","front");A(.23,.5,.14,C<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const C of[-1,1])A(4.95,.22,8.65,C*2.37,3.98,0,"#47695f","roof",C*-.18),A(4.95,.12,.12,C*2.37,3.96,4.35,"#c1a771","roof",C*-.18);A(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const C of[-2,-.5,1])A(2.25,.06,1.25,2.5,4.08,C,"#29434f","roof",-.18);A(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),A(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),A(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),A(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),A(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),A(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),A(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),b(.05,.35,-3.85,1.05,-2.4,"#bda16a"),b(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),A(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let C=0;C<4;C++)A(1.65,.024,.03,-2.15,2.88+C*.045,-3.55,"#8d9e98");A(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),A(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),A(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const C of[.98,1.91])A(.05,.37,.08,3.29,C,-2.25,"#56746a");A(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),A(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),A(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),b(.035,.3,3.45,1.45,-1.08,"#baa371"),b(.18,.3,2.1,1.43,-.75,"#e8dcc3"),A(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),A(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),A(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),A(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),b(.2,.33,.85,.43,-3.15,"#eee9de"),A(.5,.5,.22,.85,.68,-3.65,"#eee9de"),A(.55,.12,.42,1.5,1,-2.1,"#eee9de"),b(.025,1.65,1.5,1.9,-3.65,"#baa371"),A(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),A(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),A(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const C of[1.55,4.05])A(.23,.57,1,C,.72,2.45,"#a7b3a0");A(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),A(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const C of[.7,1.7])A(.08,.4,.6,C,.48,1.4,"#8c7556");A(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),A(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),A(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),A(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let C=0;C<8;C++)A(.11,.32+C%2*.1,.22,-3.2+C*.17,1.65,3.45,C%2?"#879f93":"#e2ca9e");for(const C of[-4.9,4.9]){A(.08,.7,10,C,.19,.1,"#aa9270");for(const I of[-4.7,0,4.7])A(.13,1,.13,C,.36,I,"#aa9270")}for(const C of[-3.6,3.6])b(.29,.45,C,.14,4.65,"#b58a69"),w(.4,C,.68,4.65,"#78946e");for(const{layer:C,color:I,geometries:B}of a.values()){const L=jn(B,!1);B.forEach(U=>U.dispose()),t.add(L);const V=new Jo(L,e(I),128);V.instanceMatrix.setUsage(Wo),V.count=0,V.userData.residenceLayer=C,i.add(V),o.push(V)}a.clear();const x=new Ht(1,1,1);t.add(x);const u=new Mt(x,e("#b4c5ab"));u.userData.residenceGround=!0,i.add(u);const S=new Mt(x,e("#e4dcc9"));i.add(S);function F(C){const I=Ga(C);return{x:I.x,z:I.z}}function P(){const C=Math.max(E,s.reduce((B,L,V)=>L===null?B:V+1,0));_=Math.max(1,Math.ceil(C/8));for(const B of o){B.count=C;for(let L=0;L<C;L++){const V=s[L],U=F(L);h!==null&&V!==h||V===null&&L>=E||V!==null&&V===(h??g)&&["roof","front"].includes(B.userData.residenceLayer)?B.setMatrixAt(L,d):B.userData.residenceLayer==="door"?B.setMatrixAt(L,l.compose(new z(U.x-.65,0,U.z+3.99),new hn().setFromAxisAngle(new z(0,1,0),c.has(V)?-Math.PI/2:0),m)):B.setMatrixAt(L,l.compose(new z(U.x,0,U.z),new hn,m))}B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere()}const I=_*12+4;u.scale.set(86,.3,I),u.position.set(0,-.55,-20-I/2),S.scale.set(1.5,.04,I),S.position.set(0,-.12,-20-I/2),u.visible=S.visible=C>0&&h===null}return{meshes:o,interior(C){h=r.has(C)?C:null,P()},slotFor:C=>r.get(C),setPlots(C){E=Math.min(128,Math.max(0,Number(C)||0)),P()},sync(C){const I=new Set(C.slice(0,128).map(B=>B.id));for(const[B,L]of r)I.has(B)||(s[L]=null,r.delete(B));for(const B of C.slice(0,128)){const L=B.home_slot;Number.isInteger(L)&&L>=0&&L<128&&r.get(B.id)!==L&&(r.has(B.id)&&(s[r.get(B.id)]=null),r.delete(B.id))}for(const B of C.slice(0,128)){const L=B.home_slot;Number.isInteger(L)&&L>=0&&L<128&&s[L]===null&&(s[L]=B.id,r.set(B.id,L))}for(const B of[...I].sort((L,V)=>L-V))if(!r.has(B)){const L=s.indexOf(null);s[L]=B,r.set(B,L)}r.has(g)||(g=null),P()},select(C){g=r.has(C)?C:null,P()},setDoor(C,I){I?c.add(C):c.delete(C),P()},location(C){const I=r.get(C);return I===void 0?null:F(I)},bed(C){const I=this.location(C);return I?[I.x-2.05,.92,I.z-.5]:null},cameraBoxes(C){const I=this.location(C);if(!I)return[];const B=(V,U,W,le,J)=>({left:I.x+V-W/2,right:I.x+V+W/2,back:I.z+U-le/2,front:I.z+U+le/2,top:J}),L=[B(-4.6,0,.18,7.8,3.6),B(0,-3.9,9.4,.18,3.6),B(3.65,-2.78,1.05,.92,2.3),B(2.95,-.75,2.62,.95,1.3),B(2.8,2.45,2.6,1.2,1.3)];return C!==g&&L.push(B(4.6,0,.18,7.8,3.6),B(0,3.9,9.4,.18,3.6)),L},personForHit(C){return C?.object?.userData?.residenceLayer&&Number.isInteger(C.instanceId)?s[C.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-_*12,front:-20}},dispose(){o.forEach(C=>{C.dispose(),i.remove(C)}),i.remove(u,S),r.clear(),s.fill(null)}}}const $g={minX:-100,maxX:100,minZ:-216,maxZ:92},Jg={x:0,y:-.12,z:20},Qg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},Bn={bounds:$g,spawn:Jg,venues:Qg};function jg(){const i=[],{minX:e,maxX:t,minZ:n,maxZ:s}=Bn.bounds,r=.5,a=.3,o=Math.round((t-e)/r)+1,c=Math.round((s-n)/r)+1;let l=null,f=!1,m=null,d=128;const g=(x,u=x)=>f?Zg(x,u,m,d):[],_=x=>x.top<=ts.vault_height&&ts.vault_tags.includes(x.tag);function E(x,u,S=-.12){return x>=e+a&&x<=t-a&&u>=n+a&&u<=s-a&&!i.concat(g({x,z:u})).some(F=>!(_(F)&&S>=F.top+.075)&&x>F.left-a&&x<F.right+a&&u>F.back-a&&u<F.front+a)}function h(x,u){if(!E(u.x,u.z,u.y??-.12))return!1;for(const S of i.concat(g(x,u))){let F=0,P=1;for(const[C,I,B]of[["x",S.left-a,S.right+a],["z",S.back-a,S.front+a]]){const L=u[C]-x[C];if(Math.abs(L)<1e-8){if(x[C]<=I||x[C]>=B){F=2;break}}else{const V=(I-x[C])/L,U=(B-x[C])/L;F=Math.max(F,Math.min(V,U)),P=Math.min(P,Math.max(V,U))}}if(F<=P&&P>0&&F<1){const C=x.y??-.12,I=u.y??-.12;if(_(S)&&Math.min(C+(I-C)*Math.max(0,F),C+(I-C)*Math.min(1,P))>=S.top+.075)continue;return!1}}return!0}function p(){if(!l){l=new Uint8Array(o*c).fill(1);for(let x=0;x<c;x++)for(let u=0;u<o;u++)(u===0||x===0||u===o-1||x===c-1)&&(l[x*o+u]=0);for(const x of i.concat(g({x:e,z:n},{x:t,z:s}))){const u=Math.max(0,Math.ceil((x.left-.4-e)/r)),S=Math.min(o-1,Math.floor((x.right+.4-e)/r)),F=Math.max(0,Math.ceil((x.back-.4-n)/r)),P=Math.min(c-1,Math.floor((x.front+.4-n)/r));for(let C=F;C<=P;C++)for(let I=u;I<=S;I++)l[C*o+I]=0}}}function M(x,u,S){const F=u.x-x.x,P=u.z-x.z,C=F*F+P*P;return S.every(I=>{const B=C?Math.max(0,Math.min(1,((I.x-x.x)*F+(I.z-x.z)*P)/C)):0;return Math.hypot(x.x+F*B-I.x,x.z+P*B-I.z)>=.62})}function A(x,u=null,S=[]){p();const F=Math.round((x.x-e)/r),P=Math.round((x.z-n)/r);let C=-1,I=1/0;for(let B=-6;B<=6;B++)for(let L=-6;L<=6;L++){const V=F+L,U=P+B,W=U*o+V;if(V<0||U<0||V>=o||U>=c||!(u||l)[W])continue;const le=(e+V*r-x.x)**2+(n+U*r-x.z)**2;E(x.x,x.z)&&!h(x,{x:e+V*r,z:n+U*r})||M(x,{x:e+V*r,z:n+U*r},S)&&le<I&&(C=W,I=le)}return C}function b(x){return{x:e+x%o*r,z:n+Math.floor(x/o)*r}}function w(x,u,S=[]){if(h(x,u)&&M(x,u,S))return[{x:u.x,z:u.z}];p();const F=S.length?l.slice():l;for(const j of S){const ce=Math.round((j.x-e)/r),Se=Math.round((j.z-n)/r);for(let we=-2;we<=2;we++)for(let ee=-2;ee<=2;ee++){const me=ce+ee,Re=Se+we;me>=0&&Re>=0&&me<o&&Re<c&&Math.hypot(e+me*r-j.x,n+Re*r-j.z)<.76&&(F[Re*o+me]=0)}}const P=A(x,F,S),C=A(u,F,S);if(P<0||C<0)return[];const I=[],B=new Float64Array(o*c).fill(1/0),L=new Int32Array(o*c).fill(-1),V=new Uint8Array(o*c),U=j=>Math.abs(j%o-C%o)+Math.abs(Math.floor(j/o)-Math.floor(C/o));function W(j,ce){I.push({index:j,score:ce});let Se=I.length-1;for(;Se>0;){const we=Se-1>>1;if(I[we].score<=ce)break;[I[Se],I[we]]=[I[we],I[Se]],Se=we}}function le(){const j=I[0],ce=I.pop();if(I.length){I[0]=ce;let Se=0;for(;;){let we=Se,ee=Se*2+1,me=ee+1;if(ee<I.length&&I[ee].score<I[we].score&&(we=ee),me<I.length&&I[me].score<I[we].score&&(we=me),we===Se)break;[I[Se],I[we]]=[I[we],I[Se]],Se=we}}return j.index}B[P]=0,W(P,U(P));let J=0;for(;I.length&&J++<o*c;){const j=le();if(V[j])continue;if(V[j]=1,j===C){const we=[];let ee=j;for(;ee!==P;)we.push(b(ee)),ee=L[ee];return we.reverse(),E(u.x,u.z)&&h(we.at(-1)||b(P),u)&&M(we.at(-1)||b(P),u,S)&&we.push({x:u.x,z:u.z}),E(x.x,x.z)&&we.unshift(b(P)),we}const ce=j%o,Se=Math.floor(j/o);for(const[we,ee]of[[1,0],[-1,0],[0,1],[0,-1]]){const me=ce+we,Re=Se+ee,De=Re*o+me;if(me<0||Re<0||me>=o||Re>=c||!F[De]||V[De]||!h(b(j),b(De))||!M(b(j),b(De),S))continue;const de=B[j]+1;de<B[De]&&(B[De]=de,L[De]=j,W(De,de+U(De)))}}return[]}return{configureHomes(x,u=null,S=d){f===!!x&&u===m&&S===d||(f=!!x,m=u,d=S,l=null)},withHomeAccess(x,u){if(!f||x===void 0||x===m)return u();const S=m,F=l;m=x,l=null;try{return u()}finally{m=S,l=F}},groundHeight(x){const u=Math.round((x.x+36.75)/10.5),S=Math.round((-28-x.z)/12);let F=f&&u>=0&&u<8&&S>=0&&Ci(x,Ga(S*8+u))?.22:-.12;for(const P of i.concat(g(x)))_(P)&&(x.y??-.12)>=P.top+.07&&x.x>P.left-a&&x.x<P.right+a&&x.z>P.back-a&&x.z<P.front+a&&(F=Math.max(F,P.top+.08));return F},boxes:()=>i.map(x=>({...x})),slide(x,u){const S={...u,y:u.y??x.y};return h(x,S)?{x:u.x,z:u.z}:h(x,{...S,z:x.z})?{x:u.x,z:x.z}:h(x,{...S,x:x.x})?{x:x.x,z:u.z}:{x:x.x,z:x.z}},addBox(x,u,S,F,P="",C=2){i.push({left:S-x/2,right:S+x/2,back:F-u/2,front:F+u/2,top:C,tag:P}),l=null},cameraLimit(x,u,S=[]){let F=1;for(const P of i.concat(S)){let C=0,I=1;for(const[B,L,V]of[["x",P.left-.15,P.right+.15],["z",P.back-.15,P.front+.15],["y",-.3,P.top+.15]]){const U=u[B]-x[B];if(Math.abs(U)<1e-8){if(x[B]<L||x[B]>V){C=2;break}}else{const W=(L-x[B])/U,le=(V-x[B])/U;C=Math.max(C,Math.min(W,le)),I=Math.min(I,Math.max(W,le))}}C<=I&&C>.01&&C<F&&(F=Math.max(.02,C-.015))}return F},free:E,segment:h,path:w,nearest(x){const u=A(x);return u<0?null:b(u)},move(x,u,S){const F=Math.hypot(u.x-x.x,u.z-x.z),P=F>0?Math.min(1,S/F):0,C={x:x.x+(u.x-x.x)*P,z:x.z+(u.z-x.z)*P};return h(x,C)?C:{x:x.x,z:x.z}}}}function e0({scene:i,ownedGeometries:e,materials:t,sun:n,hemi:s,fill:r,navigation:a=null}){const o=new pn;i.add(o);const c=Ae=>(e.add(Ae),Ae);function l(Ae,Xe){const ot=new ds(Xe);return t.set("environment:"+Ae,ot),ot}const f=l("grass",{color:"#a5b99a",roughness:1}),m=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),d=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),g=l("forest",{color:"#4c7262",roughness:1}),_=new Mt(c(new ri(850,850)),f);_.rotation.x=-Math.PI/2,_.position.y=-1.3,o.add(_);const E=[],h=[],p=[],M=new gt,A=new hn;function b(Ae,Xe,ot,Ve,mt,xt=1,tt=1,Tt=1){const Nt=Ae.index?Ae.toNonIndexed():Ae;Nt!==Ae&&Ae.dispose(),Nt.applyMatrix4(M.compose(new z(ot,Ve,mt),A,new z(xt,tt,Tt))),Xe.push(Nt)}for(let Ae=0;Ae<20;Ae++){const Xe=Ae/20*Math.PI*2,ot=Math.cos(Xe)*(155+Ae%3*18),Ve=-70+Math.sin(Xe)*230,mt=35+Ae%5*13,xt=25+Ae%4*9;b(new Vn(xt,mt,7),E,ot,mt/2-1.3,Ve,1.2,1,1),b(new Vn(xt*.28,mt*.28,7),h,ot,mt*.86-1.25,Ve,1.2,1,1)}for(let Ae=0;Ae<100;Ae++){const Xe=Ae%2?-1:1,ot=Xe*(51+Ae%9*4),Ve=-210+Math.floor(Ae/2)*5.4,mt=3.5+Ae%4;b(new Vn(1.3+Ae%3*.25,mt,6),p,ot,mt/2-.8,Ve),Ve>=-22&&Ve<=92&&a?.addBox(2.6,2.6,ot,Ve,"forest-tree",mt)}function w(Ae,Xe){const ot=c(jn(Ae,!1));Ae.forEach(mt=>mt.dispose());const Ve=new Mt(ot,Xe);return o.add(Ve),Ve}const x=w(E,m),u=w(h,d),S=w(p,g),F=[];for(let Ae=0;Ae<14;Ae++)for(let Xe=0;Xe<4;Xe++)b(new pi(1,9,6),F,-100+Ae%7*32+(Xe-1.5)*4,29+Ae%4*4+Xe%2*1.5,-120+Math.floor(Ae/7)*165,7,3.2,4.8);const P=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),C=w(F,P),I=6e3,B=new Float32Array(I*3),L=new Float32Array(I*6),V=[];for(let Ae=0;Ae<I;Ae++)V.push({x:Ae*73.31%64-32,y:Ae*17.73%32,z:Ae*41.71%70-35});const U=c(new Zt);U.setAttribute("position",new on(B,3)),U.setDrawRange(0,320);const W=new jo({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});t.set("environment:particles",W);const le=new lu(U,W);le.frustumCulled=!1,o.add(le);const J=c(new Zt);J.setAttribute("position",new on(L,3));const j=new Qo({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});t.set("environment:rain-streaks",j);const ce=new ou(J,j);ce.frustumCulled=!1,o.add(ce);const Se=c(new ri(260,24,48,4)),we=new Float32Array(Se.attributes.position.count*3);for(let Ae=0;Ae<Se.attributes.position.count;Ae++)new it().setHSL(.38+Ae%49/49*.34,.75,.62).toArray(we,Ae*3);Se.setAttribute("color",new on(we,3));const ee=new Gn({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:jt,blending:Bs});t.set("environment:aurora",ee);const me=new Mt(Se,ee);me.position.set(0,55,-235),o.add(me);const Re=Se.attributes.position.array.slice();let De={},de=0,Be="",yt="",ke=!1,ht=-60;const _t={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function st(Ae){const Xe=zu(De,Date.now()+de).mode;if(Xe===Be&&yt===`${De.landscape}:${Ae}`)return;Be=Xe,yt=`${De.landscape}:${Ae}`;const ot=_t[De.landscape]||_t.alps;f.color.set(ot[0]),m.color.set(ot[1]),g.color.set(ot[2]);const Ve=Xe==="aurora";i.background=new it(Ve?"#102339":Ae?"#142730":Xe==="rain"?"#a6babd":Xe==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new Ia(i.background,Xe==="mist"?.007:Xe==="rain"?.0035:.0013),n.intensity=Ve?.6:Xe==="rain"?1.35:Ae?1.65:2.7,s.intensity=Ve?1.6:Ae?2.05:2.6,r.intensity=Ve?1.8:1.1,P.color.set(Xe==="rain"?"#859c9f":"#f5f2e9"),W.color.set("#ffffff"),W.size=.13}return{configure(Ae={},Xe=!1){De=Ae.settings||{},Number.isFinite(Ae.server_ms)&&(de=Ae.server_ms-Date.now()),ke=Xe,x.visible=u.visible=De.mountains!==!1,C.visible=De.clouds!==!1;const ot=De.precipitation||"heavy",Ve=ke?900:ot==="light"?650:ot==="storm"?5800:3600;U.setDrawRange(0,Ve),J.setDrawRange(0,Ve*2),yt=""},update(Ae,{paused:Xe=!1,dark:ot=!1,center:Ve=null}={}){st(ot);const mt=Be,xt=Xe?0:Ae/1e3;if(C.position.x=Xe?0:Math.sin(xt*.012)*9,le.visible=mt==="snow",ce.visible=mt==="rain",me.visible=mt==="aurora",le.visible||ce.visible){const tt=U.drawRange.count,Tt=Ve?.x||0,Nt=Ve?.z||0;for(let H=0;H<tt;H++){const Wt=V[H],nt=Wt.x+Tt+Math.sin(xt*.4+H)*(mt==="snow"?.55:.1),ze=(Wt.y-xt*(mt==="snow"?1.4:20)%32+32)%32,Ee=Wt.z+Nt;if(mt==="snow")B[H*3]=nt,B[H*3+1]=ze,B[H*3+2]=Ee;else{const St=H*6;L[St]=nt,L[St+1]=ze,L[St+2]=Ee,L[St+3]=nt+.1,L[St+4]=ze-.9,L[St+5]=Ee}}(mt==="snow"?U:J).attributes.position.needsUpdate=!0}if(me.visible){const tt=Se.attributes.position.array;for(let Tt=0;Tt<tt.length;Tt+=3)tt[Tt+1]=Re[Tt+1]+Math.sin(Re[Tt]*.035+xt*.3)*5,tt[Tt+2]=Math.cos(Re[Tt]*.02+xt*.17)*9;Se.attributes.position.needsUpdate=!0}},extent(Ae){Ae!==ht&&(ht=Ae,S.scale.z=Math.max(1,Math.abs(Ae)/210))},dispose(){i.remove(o),i.fog=null,o.clear()}}}function t0({scene:i,box:e,cylinder:t,orb:n,bake:s,sign:r,material:a,navigation:o,ownedGeometries:c,materials:l}){e(23,.16,20,-30,-.29,51,"#263e39",.14);for(let w=-40;w<=-20;w+=2)for(let x=43;x<=59;x+=2)e(1.98,.025,1.98,w,-.18,x,(w+x)/2%2?"#e8dfcb":"#d1c6ac",0);for(const w of[-41.3,-18.7])e(.15,.09,20,w,-.1,51,"gold",0),e(.35,1.4,19.8,w,.45,51,"deep"),o.addBox(.35,19.8,w,51,"grand-bar-wall",1.3);e(23,4.4,.3,-30,1.75,41,"deep"),o.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const w of[-40,-20])for(const x of[42.5,50.5,59.5])t(.35,.25,w,-.03,x,"gold"),t(.2,4.7,w,2.3,x,"white"),t(.38,.22,w,4.7,x,"gold"),o.addBox(.75,.75,w,x,"grand-bar-column",4.9);for(const w of[42.5,50.5,59.5]){e(20,.2,.35,-30,4.8,w,"gold");for(const x of[-36,-24]){const u=new ii(2,.075,6,24,Math.PI);s(u,"gold",x,3.4,w)}}e(16,1.35,1.55,-30,.46,45,"oak"),e(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),e(15.7,.06,.045,-30,.87,45.81,"gold",0),o.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const w of[41.65,42.3])e(15,.14,.7,-30,1.5+(w-41.65)*2,w,"wood");for(let w=0;w<14;w++){const x=-36.5+w;t(.11,.55,x,1.87,41.8,w%2?"#87b6a5":"#b89c68"),t(.04,.14,x,2.22,41.8,"gold")}for(const w of[-37,-34,-31,-28,-25,-22])t(.37,.16,w,.57,47.4,"deep"),t(.065,.8,w,.08,47.4,"gold"),t(.28,.06,w,-.12,47.4,"gold"),o.addBox(.75,.75,w,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[w,x,u]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){t(.025,1.7,w,4.8,x,"gold"),s(new ii(u,.035,6,28),"gold",w,4,x,Math.PI/2);for(let S=0;S<12;S++){const F=S*Math.PI/6,P=w+Math.cos(F)*u,C=x+Math.sin(F)*u;t(.014,.46,P,3.75,C,"gold"),n(.09,.19,.09,P,3.47,C,"white")}}for(const w of[-38,-22])e(2.1,.65,5.1,w,.15,54,"#856c8c",.18),e(.3,1,5.2,w+(w<-30?-.85:.85),.75,54,"#856c8c",.1),o.addBox(2.1,5.1,w,54,"velvet-booth",1.3),t(.68,.12,w+(w<-30?1.8:-1.8),.83,54,"gold"),t(.06,.9,w+(w<-30?1.8:-1.8),.32,54,"gold"),o.addBox(1.4,1.4,w+(w<-30?1.8:-1.8),54,"salon-table",.9);e(8.8,.12,6.4,-30,-.04,56,"black",.07);const f=["#87668e","#508a87","#b99c68","#5c708c"];for(let w=0;w<8;w++)for(let x=0;x<6;x++)e(1.04,.025,1.02,-33.7+w*1.06,.035,53.4+x*1.06,f[(w+x)%4],.015);for(const w of[-34.5,-25.5])e(.04,.06,6.6,w,.02,56,"gold",0);e(5.4,1.2,1.1,-30,.51,51.1,"black"),e(5.5,.12,1.2,-30,1.14,51.1,"gold"),o.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const w of[-31.4,-28.6])t(.57,.08,w,1.24,51.1,"black"),t(.15,.1,w,1.3,51.1,"gold");for(let w=0;w<6;w++)e(.1,.09,.22,-30.65+w*.25,1.26,51.3,"white",.01);for(const w of[-34.5,-25.5]){e(1,2.3,.8,w,1,51,"black");for(const x of[.45,1.35]){const u=new yn(.31,.31,.05,12);s(u,"metal",w,x,51.43,Math.PI/2)}o.addBox(1,.8,w,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),e(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const m=new ds({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",m);const d=new Fa(.62,2);c.add(d);const g=new Mt(d,m);g.position.set(-30,4.6,56),i.add(g);const _=new Gn({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:jt,blending:Bs});l.set("rivage-beams",_);const E=new Vn(1.5,3.4,10,1,!0);c.add(E);const h=[];for(const w of[-33,-27])for(const x of[54,58]){const u=new Mt(E,_);u.position.set(w,2,x),u.userData.rivageEffect="beam",i.add(u),h.push(u)}const p=[],M=new Gn({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",M);for(const[w,x,u,S,F,P,C]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const I=new Ht(x,u,S);c.add(I);const B=new Mt(I,M);B.position.set(F,P,C),B.userData.officeVenue=w,i.add(B),p.push(B)}const A=f.map(w=>{const x=a(w);return x.emissive.set(w),x});let b=!0;return{targets:p,setEnabled(w){b=!!w},update(w,{paused:x,energySaver:u}){x||(g.rotation.y=w/18e3);const S=x||u||!b;for(const F of h)F.visible=!S;for(let F=0;F<A.length;F++)A[F].emissiveIntensity=S?.13:.2+Math.sin(w/4500+F)*.05}}}function n0(i,e=Bn.spawn){let t={x:e.x,y:e.y??-.12,z:e.z,yaw:e.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0},n=!1,s=!0;const r=(o,c,l)=>Math.max(c,Math.min(l,o));function a(o,c={},l=0,f=[]){const m=r(Number(o)||0,0,.05);let d=Number(c.x)||0,g=Number(c.z)||0;const _=Math.hypot(d,g);_>1&&(d/=_,g/=_),t.stamina<=5?s=!1:t.stamina>=30&&(s=!0);const E=!!(c.boost&&_&&s),h=E?9:4.5;t.stamina=r(t.stamina+(E?-23:14)*m,0,100);const p=(Math.cos(l)*d-Math.sin(l)*g)*h,M=(-Math.sin(l)*d-Math.cos(l)*g)*h;t.vx=p,t.vz=M;const A=i.groundHeight?.(t)??-.12;t.grounded&&t.y>A+.08&&(t.grounded=!1),c.jump&&!n&&(t.grounded||t.jumps<ts.maximum_jumps)&&(t.vy=ts.jump_speed,t.grounded=!1,t.jumps++),n=!!c.jump;const b=t.y;t.grounded?t.y=A:(t.vy-=ts.gravity*m,t.y=Math.min(ts.maximum_y,t.y+t.vy*m),t.y<=A&&(t.y=A,t.vy=0,t.grounded=!0,t.jumps=0));let w=i.slide({...t,y:Math.min(b,t.y)},{x:t.x+p*m,y:t.y,z:t.z+M*m});f.some(u=>Math.hypot(w.x-u.x,w.z-u.z)<.62&&Math.hypot(w.x-u.x,w.z-u.z)<=Math.hypot(t.x-u.x,t.z-u.z)+1e-4)&&(w={x:t.x,z:t.z});const x=Math.hypot(w.x-t.x,w.z-t.z)>1e-4;return t.x=w.x,t.z=w.z,x&&(t.yaw=Math.atan2(p,M)),t.action=t.grounded?x?E?"run":"walk":"idle":"jump",{...t}}return{step:a,state:()=>({...t}),reset(o){t={...t,...o,vx:0,vz:0,vy:0,jumps:0,grounded:(o.y??-.12)<=(i.groundHeight?.(o)??-.12)+.01},n=!1},face(o){t.yaw=Math.atan2(o.x-t.x,o.z-t.z)},moving:()=>!t.grounded||Math.hypot(t.vx,t.vz)>.01}}function Er(i,e){const t=Bn.venues[e];return!!(i&&t&&Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)}function mc(i,e,t,n){const s=i.id+":"+e;if(t.has(s))return t.get(s);const r=[];function a(h,p,M,A,b,w=0){w&&h.rotateZ(w),h.translate(M,A,b);const x=h.index?h.toNonIndexed():h;x!==h&&h.dispose();const u=new it(p),S=new Float32Array(x.attributes.position.count*3);for(let F=0;F<S.length;F+=3)S[F]=u.r,S[F+1]=u.g,S[F+2]=u.b;x.setAttribute("color",new on(S,3)),r.push(x)}const o=(h,p,M,A,b,w,x,u=0)=>a(new Ht(h,p,M),A,b,w,x,u),c=(h,p,M,A,b,w,x=h)=>a(new yn(x,h,p,10),M,A,b,w),{accent:l,hair:f,motif:m,accessory:d,hairStyle:g,shirt:_}=i;if(e==="head"){if(o(.49,.16,.45,f,0,.23,-.02),o(.45,g==="long"?.72:.29,.13,f,0,g==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(g))for(const h of[-1,1])o(.09,g==="long"?.6:.33,.32,f,h*.24,-.02,-.03);if(g==="spiky")for(let h=0;h<7;h++)a(new Vn(.11,.27+h%3*.06,5),f,(h-3)*.066,.39+Math.sin(h)*.025,-.06,(h-3)*-.16);if(g==="split"&&o(.245,.18,.46,l,.123,.24,-.015),g==="side"&&o(.26,.25,.05,f,-.12,.08,.218,-.18),g==="ponytail"&&o(.27,.5,.25,f,0,-.15,-.37),d.includes("headband")&&(o(.49,.075,.045,"#303d4b",0,.13,.225),o(.22,.07,.025,"#c6cbd0",0,.13,.254),o(.055,.025,.01,"#4d6170",0,.13,.27)),d==="mask-headband"&&(o(.44,.18,.035,l,0,-.12,.22),o(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),d==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,_,0,.395,0)),d==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),o(.055,.17,.025,"#f1e8db",0,.46,.28),o(.17,.055,.025,"#f1e8db",0,.46,.29);for(const h of[-1,1])o(.06,.33,.06,"#94745a",h*.3,.64,0,h*-.3),o(.15,.055,.06,"#94745a",h*.36,.72,0)}if(d==="bamboo"){const h=new yn(.052,.052,.35,10);h.rotateZ(Math.PI/2),a(h,"#88a970",0,-.1,.255),o(.08,.07,.03,l,.23,.23,-.03)}if(d==="turban"&&(c(.3,.17,l,0,.29,0),o(.39,.07,.46,"#d9d4c4",0,.34,0)),d==="goggles"||d==="glasses")for(const h of[-1,1])o(.19,.12,.06,l,h*.12,d==="goggles"?.23:.04,.235),o(.13,.07,.025,"#849d9a",h*.12,d==="goggles"?.23:.04,.271);if(d==="boarhood"){o(.52,.42,.43,"#95939c",0,.04,-.02),o(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const h of[-1,1])o(.12,.2,.08,"#aba2a6",h*.2,.31,0,h*-.35),o(.06,.055,.025,"#84aabb",h*.14,.07,.208)}if(d==="butterfly")for(const h of[-1,1])o(.18,.17,.045,l,h*.15,.31,-.12,h*.4);if(d==="earrings")for(const h of[-1,1])o(.045,.15,.035,"#e9d6bc",h*.26,-.19,.02);if(i.id==="naruto")for(const h of[-1,1])for(let p=0;p<3;p++)o(.08,.012,.01,"#9f7055",h*.15,-.055-p*.033,.208,h*.1)}else{if(o(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(m)){o(.028,.53,.035,l,0,1.23,.19);for(const h of[-1,1])o(.14,.37,.04,l,h*.14,1.26,.19,h*.08);if(m==="suit"&&(o(.17,.44,.035,"#ded9c8",0,1.25,.2),o(.05,.29,.025,l,0,1.3,.23)),m==="buttons")for(let h=0;h<3;h++)o(.03,.03,.035,"#eee2ba",0,1.13+h*.12,.23)}if(m==="checks"||m==="triangles"||m==="clouds")for(let h=0;h<4;h++)for(let p=0;p<4;p++){const M=(p-1.5)*.112,A=1+h*.13;m==="checks"&&(h+p)%2===0&&o(.11,.127,.025,l,M,A,.19),m==="triangles"&&(h+p)%2===0&&a(new Vn(.035,.065,3),l,M,A,.205),m==="clouds"&&h%2===0&&p%2===0&&(o(.13,.045,.03,l,M,A,.2),c(.04,.03,l,M,A+.035,.2))}if(m==="circle"&&a(new ii(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(m))if(m==="armor"){o(.43,.33,.08,l,0,1.29,.21);for(let h=0;h<3;h++)o(.32,.015,.02,"#b6a273",0,1.19+h*.07,.26)}else if(m==="split")o(.23,.54,.04,l,.12,1.2,.19);else if(m==="cape")o(.65,.89,.07,l,0,1.14,-.23),o(.65,.15,.43,l,0,1.49,-.03);else if(m==="butterfly"){for(const h of[-1,1])o(.12,.51,.07,l,h*.24,1.22,.16);o(.6,.23,.08,l,0,.89,-.2)}else for(const h of[-1,1])o(.065,.52,.04,l,h*.1,1.23,.2,h*(m==="cross"?.52:.22));if(["sword","swords","backsword"].includes(d))for(let h=0;h<(d==="swords"?3:1);h++){const p=.3+h*.06;o(.055,.83,.055,"#373d4a",p,.92,-.18,-.25),o(.09,.23,.07,l,p+.1,1.4,-.18,-.25)}if(d==="neckmask"&&o(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(d))for(const h of[-1,1])o(d==="gauntlets"?.27:.2,.2,.24,l,h*.37,.99,.05)}const E=jn(r,!1);return r.forEach(h=>h.dispose()),n.add(E),t.set(s,E),E}function i0(i,e,t,n=[],s=3.6,r=35){const a=t.clone().sub(e);(!Number.isFinite(a.lengthSq())||a.lengthSq()<.001)&&a.set(4,3,5),(a.length()<s||a.length()>r)&&a.setLength(ss.clamp(a.length(),s,r));const o=e.clone().add(a),c=i.cameraLimit(e,o,n);if(c>=1)return o;if(a.length()*c>=s)return e.clone().addScaledVector(a,c);for(const l of[4.5,6,9]){const f=e.clone().add(new z(a.x*.4,l,a.z*.4));if(i.cameraLimit(e,f,n)>=.99)return f}return e.clone().add(new z(0,Math.max(s,6),0))}function s0({scene:i,navigation:e,ownedGeometries:t,materials:n,sign:s}){const r=new ds({vertexColors:!0,roughness:.78});n.set("hospitality",r);const a=[],o=[];for(const[c,l,f,m,d,g]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"]]){let h=function(A,b,w,x,u,S,F){let P=new Ht(A,b,w).toNonIndexed();P.translate(x,u,S);const C=new it(F),I=new Float32Array(P.attributes.position.count*3);for(let B=0;B<I.length;B+=3)C.toArray(I,B);P.setAttribute("color",new on(I,3)),E.push(P)};const _=new pn;_.position.set(l,-.12,f),_.userData.hospitality=d,i.add(_);const E=[];if(h(.49,.66,.32,0,1.15,0,g),h(.41,.45,.4,0,1.7,0,"#e4b492"),h(.46,.16,.45,0,1.96,-.02,m?"#51352e":"#29272d"),h(.46,m?.65:.27,.13,0,m?1.66:1.82,-.21,m?"#51352e":"#29272d"),m){for(const A of[-1,1])h(.07,.43,.29,A*.23,1.74,-.03,"#51352e"),h(.05,.025,.02,A*.13,1.65,.209,"#cf8790");h(.58,.3,.38,0,.81,0,g)}for(const A of[-1,1])h(.035,.04,.025,A*.1,1.73,.207,"#253b36"),h(.18,.65,.2,A*.14,.45,0,"#263e39"),h(.22,.13,.33,A*.14,.08,.06,"#1c2b28"),h(.16,.4,.2,A*.33,1.2,0,g),h(.15,.26,.16,A*.33,.9,.04,"#e4b492");h(.09,.025,.025,0,1.58,.21,"#b66c78"),(d==="hostess"||d==="bartender")&&(h(.3,.49,.035,0,1.02,.18,m?"#c6a971":"#253e38"),h(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),h(.1,.07,.04,0,1.44,.19,"#374941"),h(.45,.04,.3,.36,.89,.17,"#c5ab71"),h(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const p=jn(E,!1);E.forEach(A=>A.dispose()),t.add(p);const M=new Mt(p,r);M.userData.officeVenue=d==="dj"?"disco":"bar",_.add(M),o.push(M),a.push(_),e.addBox(.68,.68,l,f,"hospitality-npc",2.1),d==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,f)}return{targets:o,update(c,l){a.forEach((f,m)=>{f.rotation.y=m<2?Math.sin((l?0:c)/4500+m)*.1:0,f.children[0].position.y=l?0:Math.sin(c/1800+m)*.018})}}}const On=(i,e,t)=>i+(e-i)*t;function r0(i,e,{time:t=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(e?.action),a=e?.action==="run",o=e?.action==="rest",c=o&&["recline","nap"].includes(e.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),f=r?Math.sin(t*(a?13:8))*(a?.78:.48):0;let m=r?a?.16:.06:0,d=r?Math.abs(Math.sin(t*(a?13:8)))*(a?.07:.035):s?0:Math.sin(t*1.8)*.012;const g=[f,-f],_=[-f*.85,f*.85],E=[0,0];e?.action==="jump"&&(m=-.12,g.fill(.5),_.fill(-.7),d=0),o&&(m=c?e.pose==="nap"?-Math.PI/2:-1.38:.04,d=c?.4:-.5,g.fill(c?0:-1.25),_.fill(c?-.08:e.pose==="meditate"?-.4:-.8),e.pose==="meditate"&&(E[0]=-.3,E[1]=.3),s||(d+=Math.sin(t*1.4)*.007)),e?.action==="play"&&(_[1]=-.8+(s?0:Math.sin(t*3)*.45),_[0]=-.3,m=.07),e?.action==="cast"&&(_[0]=e.skillPose==="beam"?-1.25:-.9,_[1]=-1.4,g[0]=-.12,g[1]=.2,m=.12),e?.action==="drink"&&(_[1]=-1.2+(s?0:Math.sin(t*1.8)*.08)),e?.action==="eat"&&(_[0]=-1),e?.action==="dance"&&(_[0]=-.8,_[1]=-.7,g[0]=s?0:Math.sin(t*2.4)*.2,g[1]=-g[0]),i.body.rotation.x=On(i.body.rotation.x,m,l),i.body.position.y=On(i.body.position.y,d,l),i.body.rotation.z=On(i.body.rotation.z,e?.action==="dance"&&!s?Math.sin(t*2.4)*.12:0,l),i.legs.forEach((p,M)=>{p.rotation.x=On(p.rotation.x,g[M],l),p.rotation.z=On(p.rotation.z,E[M],l)}),i.arms.forEach((p,M)=>{p.rotation.x=On(p.rotation.x,_[M],l),p.rotation.z=On(p.rotation.z,a?M?-.12:.12:0,l)}),i.head.rotation.x=On(i.head.rotation.x,c&&e.pose==="recline"?.2:0,l),i.head.rotation.y=On(i.head.rotation.y,0,l);const h=o&&e.pose==="nap"?.15:!s&&t%5.3<.12?.25:1;return i.eyes.forEach(p=>p.scale.y=On(p.scale.y,h,l)),{lying:c,moving:r}}function a0(i,e,t=[]){for(let n=0;n<12;n++){const s=(e.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(a=>[-.25,0,.25].every(o=>{const c=e.x+Math.sin(s)*a+Math.cos(s)*o,l=e.z+Math.cos(s)*a-Math.sin(s)*o;return i.free(c,l)&&t.every(f=>Math.hypot(f.x-c,f.z-l)>.65)})))return s}return null}function gc(i,e,t,n=[]){const s=["recline","nap"].includes(t);for(const r of[0,.8,1.6,2.4,3.2])for(let a=0;a<(r?16:1);a++){const o={...e,x:e.x+Math.sin(a*Math.PI/8)*r,z:e.z+Math.cos(a*Math.PI/8)*r};if(!i.free(o.x,o.z)||!i.segment(e,o)||n.some(d=>Math.hypot(d.x-o.x,d.z-o.z)<.65))continue;const c=o.x-e.x,l=o.z-e.z,f=c*c+l*l;if(f&&n.some(d=>{const g=Math.max(0,Math.min(1,((d.x-e.x)*c+(d.z-e.z)*l)/f));return Math.hypot(e.x+c*g-d.x,e.z+l*g-d.z)<.62&&g>0}))continue;const m=s?a0(i,o,n):e.yaw||0;if(m!==null)return{...o,yaw:m}}return null}function o0({scene:i,residences:e,camera:t,controls:n,background:s}){let r=null,a=null,o=null;const c=new Map;function l(){if(r!==null){for(const[f,m]of c)f.visible=m;c.clear(),e.interior(null),i.background=o.background,i.fog=o.fog,t.position.copy(o.position),t.fov=o.fov,t.updateProjectionMatrix(),n.target.copy(o.target),n.minDistance=o.min,n.maxDistance=o.max,r=null,a=null,o=null}}return{set(f,m){if(f===r){a=m;return}l(),!(f===null||!m)&&(o={background:i.background,fog:i.fog,position:t.position.clone(),target:n.target.clone(),fov:t.fov,min:n.minDistance,max:n.maxDistance},r=f,a=m,e.interior(f),i.background=s,i.fog=null,n.minDistance=1.7,n.maxDistance=8,n.target.copy(m.position).y+=1.2,t.position.copy(n.target).add({x:3.2,y:3.4,z:4}),t.fov=58,t.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const f of i.children)c.has(f)||c.set(f,f.visible),f.visible=!!(f.isLight||f===a||f.userData.residenceLayer||f.userData.officeAbility===r||f.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function c0({host:i,labels:e,onSelect:t,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:a=()=>{},onPilotState:o=()=>{},rendererFactory:c=m=>new Du(m),controlsFactory:l=(m,d)=>new Rg(m,d),getDate:f=()=>new Date}){const m=new ru,d=new xn(36,1,.1,1200),g=c({antialias:!0,alpha:!1,powerPreference:"low-power"});g.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),g.outputColorSpace=sn,g.toneMapping=Ea,g.toneMappingExposure=1.18,i.append(g.domElement);const _=l(d,g.domElement);_.enableDamping=!0,_.dampingFactor=.09,_.minDistance=8,_.maxDistance=650,_.minPolarAngle=.32,_.maxPolarAngle=1.28,_.target.set(0,0,0),_.enablePan=!0,_.panSpeed=.7,_.rotateSpeed=.55,_.enableKeys=!1;const E=new pu("#fbf3dc","#526c61",2.8);m.add(E);const h=new So("#fff1cf",3.2);h.position.set(-12,25,15),m.add(h);const p=new So("#cce5ef",1.1);p.position.set(15,10,-10),m.add(p);const M=new Map,A=new Map,b=new Set,w=new Set,x=new Map,u=jg(),S=Gu({THREE:Ag,scene:m,navigation:u,reduced:()=>ze||ie}),F={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function P(v){return M.has(v)||M.set(v,new ds({color:F[v]||v,roughness:v==="metal"?.4:.82,metalness:v==="gold"?.45:.02,...v==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:jt}:{}})),M.get(v)}const C=new Ht(1.1,.035,2.2);b.add(C);const I=new Jo(C,P("#c9b384"),24);I.instanceMatrix.setUsage(Wo),I.count=0,I.frustumCulled=!1,m.add(I),I.userData.officeRestMats=!0;const B=new gt,L=new hn;function V(v,R,N,Z,k,he=0,q=0,ae=0){let qe=v;v.index&&(qe=v.toNonIndexed(),v.dispose()),L.setFromEuler(new In(he,q,ae)),qe.applyMatrix4(new gt().compose(new z(N,Z,k),L,new z(1,1,1))),A.has(R)||A.set(R,[]),A.get(R).push(qe)}function U(v,R,N,Z,k,he,q,ae=.035,qe=0){V(ae>0?new Ma(v,R,N,1,Math.min(ae,v/3,R/3,N/3)):new Ht(v,R,N),q,Z,k,he,0,qe)}function W(v,R,N,Z,k,he,q=v){V(new yn(q,v,R,12),he,N,Z,k)}function le(v,R,N,Z,k,he,q){const ae=new pi(1,10,7);ae.scale(v,R,N),V(ae,q,Z,k,he)}function J(v,R,N=1){u.addBox(.85*N,.85*N,v,R,"plant",2*N),W(.4*N,.7*N,v,.35*N,R,"pot",.31*N),W(.045*N,1.4*N,v,1.2*N,R,"oak");for(let Z=0;Z<5;Z++){const k=Z*2.4;le(.48*N,.52*N,.25*N,v+Math.cos(k)*.3*N,(1.4+Z*.15)*N,R+Math.sin(k)*.25*N,Z%2?"leaf":"lightLeaf")}}function j(v,R,N,Z,k,he,q="#f2e8d5",ae=0){const qe=document.createElement("canvas");qe.width=768,qe.height=192;const We=qe.getContext("2d");We.clearRect(0,0,768,192),We.fillStyle=q,We.textAlign="center",We.font="500 66px Georgia",We.fillText(v,384,88),We.font="20px Arial",We.fillText(R,384,139);const Ie=new Mo(qe);Ie.colorSpace=sn,w.add(Ie);const oe=new Gn({map:Ie,transparent:!0,depthWrite:!1,side:jt}),te=new ri(N,N/4);b.add(te);const lt=new Mt(te,oe);lt.position.set(Z,k,he),lt.rotation.y=ae,m.add(lt),M.set(`sign-${v}`,oe)}U(86,.6,96,0,-.94,28,"base",.3),U(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),U(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const v of[-1,1]){U(54,.04,4,v*70,-.17,20,"#e6dfcc",0),U(4,.04,55,v*87,-.17,45,"#e6dfcc",0);for(let R=-20;R<92;R+=8)W(.08,1.1,v*99,.35,R,"wood"),U(.08,.08,8,v*99,.7,R+4,"wood",0);for(const R of[34,58,80])U(3,.4,.9,v*92,.05,R,"wood",.06),u.addBox(3,.9,v*92,R,"trail-bench",.7),J(v*80,R,1);j("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,v*58,1.7,18)}u.addBox(160,40,0,97,"water-boundary",.1),u.configureHomes(!0);for(const v of[-99,99])u.addBox(.2,114,v,35,"scenic-fence",1.2);u.addBox(202,.2,0,91,"scenic-boundary",1.2),U(85,.07,18,0,-.43,67,"#e4cfa5",.1),U(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let v=0;v<8;v++)U(120-v*8,.02,.13,0,-.57,79+v*2.8,"#c4ddd4",0);U(7,.07,24,0,-.4,60,"#e6dfcc",.1);const ce=t0({scene:m,box:U,cylinder:W,orb:le,bake:V,sign:j,material:P,navigation:u,ownedGeometries:b,materials:M}),Se=s0({scene:m,navigation:u,ownedGeometries:b,materials:M,sign:j});for(let v=0;v<8;v++){const R=-36+v*3.7;U(1.5,.25,2.8,R,-.1,67,"white",.1),U(1.4,.17,1,R,.26,66,"sofa",.08),u.addBox(1.5,2.8,R,67,"beach-chair",.6),v%2===0&&(W(.05,3,R+1.2,1,65,"gold"),V(new Vn(1.8,.6,10),"white",R+1.2,2.7,65),u.addBox(.2,.2,R+1.2,65,"parasol",2.8))}U(19,.15,10,22,-.3,65,"wood",.1),j("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const v of[16,22,28])W(1.2,.13,v,.8,63,"white"),W(.1,1,v,.2,63,"gold"),u.addBox(2.4,2.4,v,63,"terrace-table",.9);for(const v of[-10,-6,-2]){J(v,58,.9);for(let R=0;R<4;R++)le(.15,.2,.15,v+(R-1.5)*.3,.9,58,"#c18b9c")}U(83,.08,4,0,-.44,20,"#e6dfcc",.12),U(6,.08,64,0,-.44,16,"#e6dfcc",.1),U(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const v of[-41,41])for(const R of[-15,-2,14,31,46])J(v,R,1.7),W(.08,3.2,v+(v<0?1:-1),1.15,R+2,"gold"),le(.22,.25,.22,v+(v<0?1:-1),2.85,R+2,"white");const we=[];function ee(v,R,N,Z){u.addBox(N,.12,v,R,"net",Z);for(const k of[-N/2,N/2])W(.055,Z,v+k,Z/2,R,"white");for(let k=.3;k<=Z;k+=.22)U(N,.018,.025,v,k,R,"white",0);for(let k=-N/2;k<=N/2;k+=.4)U(.012,Z-.3,.018,v+k,(Z+.3)/2,R,"white",0)}function me(v,R,N=.16){const Z=new pi(N,10,8);b.add(Z);const k=new Mt(Z,P(R));k.userData.officeBall=v.id,m.add(k),we.push({mesh:k,game:v})}for(const v of bi){const{x:R,z:N,id:Z}=v;if(u.addBox(6,.14,R,N-(v.kind==="court"?6:4.2),"sign",1.2),U(v.kind==="court"?17:10,.12,v.kind==="court"?13:9,R,-.29,N,Z==="tennis"?"#a77355":Z==="badminton"?"#3b7e77":Z==="basketball"?"#b99569":"#dce0ca",.14),U(6,1.1,.12,R,.65,N-(v.kind==="court"?6:4.2),"deep"),j(v.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,R,.75,N-(v.kind==="court"?5.91:4.11)),Z==="tennis"||Z==="badminton"||Z==="basketball"){for(const k of[-7,7])U(.045,.015,10.8,R+k,-.21,N,"white",0);for(const k of[-5.4,0,5.4])U(14,.015,.045,R,-.21,N+k,"white",0);if(Z!=="basketball"){for(const k of[-5.7,5.7])U(.035,.015,10.8,R+k,-.2,N,"white",0);ee(R,N,14,Z==="badminton"?1.7:1.15),me(v,Z==="tennis"?"#d9e56b":"white",Z==="tennis"?.17:.12)}else{for(const k of[-1,1]){W(.09,3.6,R,1.5,N+k*5,"metal"),U(2.3,1.35,.13,R,3.1,N+k*4.7,"white");const he=new ii(.43,.045,6,20);V(he,"#c67543",R,2.8,N+k*4.1,Math.PI/2)}me(v,"#bd6c32",.25)}}else if(Z==="golf"){for(const k of[-6.5,6.5])u.addBox(.2,8,R+k,N,"golf-edge",.5);U(13,.12,8,R,-.15,N,"#69885c",.15);for(const k of[-6.5,6.5])U(.2,.35,8,R+k,-.05,N,"woodLight");for(let k=0;k<3;k++)W(.22,.02,R-4+k*4,-.07,N+(k%2?2:-2),"black"),W(.025,1.5,R-4+k*4,.65,N+(k%2?2:-2),"gold"),U(.8,.4,.03,R-3.6+k*4,1.25,N+(k%2?2:-2),"#c78362");me(v,"white",.12)}else if(Z==="bowling"){for(const k of[-2.7,2.7])u.addBox(.35,11,R+k,N,"bowling-edge",.4);U(5,.09,11,R,-.13,N,"woodLight");for(const k of[-2.7,2.7])U(.35,.12,11,R+k,-.1,N,"oak");for(let k=0;k<4;k++)for(let he=0;he<=k;he++){const q=R+(he-k/2)*.55,ae=N-2-k*.5;W(.14,.5,q,.17,ae,"white",.08),le(.13,.14,.13,q,.49,ae,"white")}me(v,"#786397",.28)}else if(Z==="arcade")for(const k of[-2.2,2.2]){u.addBox(2.1,1.6,R+k,N,"arcade",2.5),u.addBox(1.2,1.2,R+k,N+2,"seat",.7),U(2.1,2.6,1.6,R+k,1.1,N,"deep",.1),U(1.6,1.1,.05,R+k,1.7,N+.83,"screen");for(let he=0;he<5;he++)U(.05,.6,.02,R+k+(he-2)*.2,1.7,N+.87,he%2?"#e8c877":"screenLine",0);W(.18,.06,R+k,.9,N+1.1,"gold"),U(1.2,.45,1.2,R+k,.2,N+2,"sofa",.1)}else if(Z==="archery"){u.addBox(5,.3,R,N-2,"archery-backstop",3.2),U(5,3.2,.25,R,1.2,N-2,"wood");for(let k=0;k<5;k++){const he=new yn(1.1-k*.21,1.1-k*.21,.03,24);V(he,["white","#283e49","#73a7bf","#c36f60","gold"][k],R,1.6,N-1.82+k*.035,Math.PI/2)}U(5,.02,.12,R,-.18,N+2.8,"white",0)}else if(Z==="darts"){u.addBox(5,.22,R,N-1.8,"dart-board",2.8),U(5,3,.22,R,1.25,N-1.8,"deep");for(let k=0;k<4;k++){const he=new yn(1.05-k*.23,1.05-k*.23,.025,24);V(he,k%2?"white":"#bf6f59",R,1.6,N-1.64+k*.025,Math.PI/2)}}else{u.addBox(5.5,3.5,R,N,"game-table",1.3),U(5.5,.25,3.5,R,1,N,Z==="pingpong"?"#4c7783":Z==="billiards"?"#376a59":"woodLight",.1);for(const k of[-2.2,2.2])for(const he of[-1.2,1.2])U(.18,1.1,.18,R+k,.4,N+he,"oak");if(Z==="pingpong"&&(ee(R,N,5.5,1.45),me(v,"white",.1)),Z==="uno")for(let k=0;k<16;k++){const he=k%4;U(.32,.035,.48,R+(he<2?-1.7+k%4*.3:1.4),1.16+k*.002,N+(he%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][k%4],.02,k*.3)}if(Z==="chess")for(let k=0;k<8;k++)for(let he=0;he<8;he++)U(.34,.02,.34,R+(k-3.5)*.34,1.14,N+(he-3.5)*.34,(k+he)%2?"deep":"white",0),(he<2||he>5)&&W(.075,.17,R+(k-3.5)*.34,1.24,N+(he-3.5)*.34,he<2?"white":"black");if(Z==="billiards")for(let k=0;k<10;k++)le(.12,.12,.12,R+Math.sin(k*2)*1.8,1.25,N+Math.cos(k)*.9,["gold","white","deep"][k%3]);if(Z==="foosball")for(let k=0;k<5;k++){U(.045,.045,4.5,R-2+k,1.4,N,"metal",0);for(const he of[-1,0,1])U(.2,.45,.18,R-2+k,1.48,N+he,k%2?"#ba7864":"deep")}for(const k of[-1,1])U(4,.35,.8,R,.28,N+k*3.8,"sofa",.1),u.addBox(4,.8,R,N+k*3.8,"bench",.5)}}U(40.5,.6,28,0,-.6,0,"base",.22),U(39.8,.22,27.3,0,-.2,0,"edge",.1),U(39.4,.18,26.9,0,-.04,0,"floor",.08),U(37.8,.04,13.5,0,.07,-5.8,"stone",.05),U(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),U(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let v=-18;v<19;v+=1.9)U(.015,.015,12.4,v,.14,-5.8,"#c3cfbf",0);U(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),U(39.4,.22,.5,0,4.8,-13.25,"gold"),U(8,4.8,.18,0,2.35,-13.02,"deep");for(let v=0;v<21;v++)U(.06,4.6,.1,-3.8+v*.38,2.35,-12.87,"wood",.01);U(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),j("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const v of[-15,-10,10,15]){U(4.1,2.9,.15,v,2.6,-13,"glass"),U(4.2,.08,.23,v,4.08,-12.85,"gold"),U(4.2,.12,.3,v,1.12,-12.85,"woodLight");for(const R of[-2,0,2])U(.055,2.9,.2,v+R,2.6,-12.86,"gold",0)}U(.13,2.8,10.8,0,1.55,-6.4,"glass"),U(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const v of[-11.8,-6.4,-1])U(.08,2.9,.08,0,1.5,v,"gold",0);U(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),U(.22,.08,25.7,-19.5,2.8,-.1,"gold"),U(.2,2.7,25.7,19.5,1.4,-.1,"glass"),U(.22,.08,25.7,19.5,2.8,-.1,"gold"),j("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),j("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function Re(v,R,N){u.addBox(2.6,1.28,v,R,"desk",2.3),U(2.6,.15,1.28,v,1.31,R,"woodLight",.08);for(const Z of[-1.03,1.03])U(.09,1.17,1.02,v+Z,.66,R,"white"),U(.45,.08,.94,v+Z,.15,R,"metal");U(1,.66,.08,v,1.91,R-.22,"metal"),U(.9,.54,.02,v,1.92,R-.166,"screen");for(let Z=0;Z<3;Z++)U(.28+Z*.12,.024,.025,v-.14+Z*.04,2.03-Z*.1,R-.149,"screenLine",0);W(.07,.25,v,1.48,R-.2,"metal"),U(.45,.035,.25,v,1.405,R-.19,"metal"),U(.71,.035,.24,v,1.42,R+.32,"white"),W(.09,.18,v+.9,1.49,R+.12,"deep"),U(.64,.17,.64,v,.66,R+1.02,N==="umum"?"sofa":"teal",.1),U(.65,.7,.12,v,1.08,R+1.33,N==="umum"?"sofa":"teal",.09),W(.055,.5,v,.35,R+1.05,"metal"),U(.8,.06,.14,v,.15,R+1.05,"metal"),U(.14,.06,.8,v,.15,R+1.05,"metal")}const De={umum:[],operasional:[]};for(const v of["umum","operasional"])for(let R=0;R<4;R++)for(let N=0;N<4;N++){const Z=(v==="umum"?-15:3.4)+N*3.75,k=-10.3+R*3.15;De[v].push([Z,.18,k+1.03]),Re(Z,k,v)}for(const v of[-18.5,18.5]){U(.7,2.4,4.7,v,1.25,-8.4,"wood");for(let R=0;R<3;R++){U(.86,.06,4.8,v,.65+R*.69,-8.4,"gold");for(let N=0;N<8;N++)U(.5,.38+N%2*.12,.18,v,.88+R*.69,-10.3+N*.5,N%2?"white":"deep")}}U(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const v of[4.7,8,11.3]){U(15.8,.45,1.05,-8.7,.57,v,"sofa",.16),U(15.8,.9,.25,-8.7,.91,v-.62,"sofa",.12);for(let R=0;R<8;R++)U(1.72,.17,.95,-15.8+R*2.02,.86,v,R%3===0?"pillow":"sofa",.1);for(const R of[-16.7,-.7])U(.25,.68,1.35,R,.8,v,"sofa",.1)}for(const v of[-11.5,-5]){U(2.7,.13,1.2,v,.64,6.6,"woodLight",.12);for(const R of[-.9,.9])W(.05,.48,v+R,.37,6.6,"gold");W(.16,.22,v+.4,.81,6.6,"white")}U(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const v of[-11.5,-6.5])W(.04,.5,v,.32,2.85,"gold");j("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),U(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),U(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),U(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let v=0;v<23;v++)U(.055,1.15,.07,7.9+v*.4,.78,2.26,"woodLight",.01);U(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),U(.8,.55,.05,15.3,1.9,1.94,"black"),W(.18,.24,14.1,1.64,1.5,"white"),W(.18,.24,13.6,1.64,1.5,"white"),j("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const v of[8,13.8])for(const R of[5.1,9.7]){W(1.45,.12,v,1.05,R,"woodLight"),W(.13,.92,v,.55,R,"gold"),W(.68,.08,v,.12,R,"gold");for(const N of[-1.6,1.6])W(.42,.14,v+N,.67,R,"deep"),W(.055,.55,v+N,.34,R,"gold");W(.18,.22,v+.4,1.22,R,"white"),W(.22,.04,v-.3,1.14,R+.2,"white")}for(const[v,R,N]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])J(v,R,N);u.addBox(39.4,.32,0,-13.25,"wall",4.8),u.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const v of[-19.5,19.5])u.addBox(.2,25.7,v,-.1,"glass-wall",2.8);for(const v of[4.7,8,11.3])u.addBox(16.1,1.5,-8.7,v,"sofa",1.4);u.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),u.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const v of[8,13.8])for(const R of[5.1,9.7])u.addBox(2.9,2.9,v,R,"cafe-table",1.3);for(const v of[-18.5,18.5])u.addBox(.9,4.8,v,-8.4,"shelf",2.6);for(const v of[-11.5,-5])u.addBox(2.7,1.2,v,6.6,"lounge-table",.8);for(const[v,R]of A){const N=jn(R,!1);R.forEach(Z=>Z.dispose()),N&&(b.add(N),m.add(new Mt(N,P(v))))}A.clear();const de=Kg({scene:m,material:P,ownedGeometries:b}),Be=o0({scene:m,residences:de,camera:d,controls:_,background:new it("#182c2a")}),yt=e0({scene:m,materials:M,ownedGeometries:b,sun:h,hemi:E,fill:p,navigation:u}),ke=document.createElement("canvas");ke.width=ke.height=128;const ht=ke.getContext("2d"),_t=ht.createRadialGradient(64,64,7,64,64,64);_t.addColorStop(0,"#16382f35"),_t.addColorStop(1,"#16382f00"),ht.fillStyle=_t,ht.fillRect(0,0,128,128);const st=new Mo(ke);w.add(st);const Ae=new ri(66,49);b.add(Ae);const Xe=new Gn({map:st,transparent:!0,depthWrite:!1});M.set("shadow",Xe);const ot=new Mt(Ae,Xe);ot.rotation.x=-Math.PI/2,ot.position.y=-.98,m.add(ot);const Ve=new Map,mt=new Map;function xt(v){if(mt.has(v))return mt.get(v);const R=[];if(v==="archery"){const Z=new ii(.34,.025,5,16,Math.PI);Z.rotateZ(-Math.PI/2),R.push(Z.toNonIndexed()),Z.dispose();const k=new Ht(.035,.035,.85);k.translate(0,0,.1),R.push(k.toNonIndexed()),k.dispose()}else{const Z=new yn(.017,.03,v==="billiards"?1.65:1,6);Z.rotateX(Math.PI/2),R.push(Z.toNonIndexed()),Z.dispose()}const N=jn(R,!1);return R.forEach(Z=>Z.dispose()),b.add(N),mt.set(v,N),N}function tt(v,R,N,Z,k){const he=R+N.join(":");if(!Ve.has(he)){const ae=R==="sphere"?new pi(N[0],10,8):new Ma(...N,1,.06);Ve.set(he,ae),b.add(ae)}const q=new Mt(Ve.get(he),P(Z));return q.position.set(...k),v.add(q),q}const Tt=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],Nt=new Map,H=new ds({vertexColors:!0,roughness:.8});M.set("costume-vertex",H);function Wt(v){const R=new pn;m.add(R);const N=hl(v.avatar),Z=Wu(N.costume),k=(Z?.style||N.style)==="feminine",he=Z?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[N.color]||Tt[v.id%Tt.length],q=new pn;R.add(q);const ae={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[N.skin],qe=N.hair==="hijab"?he:"#352c32";if(tt(q,"box",[k?.43:.5,.65,.33],he,[0,1.17,0]),!Z&&N.outfit==="blazer"){tt(q,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Lt of[-1,1]){const zt=tt(q,"box",[.07,.32,.035],"gold",[Lt*.12,1.33,.19]);zt.rotation.z=Lt*.25}}!Z&&N.outfit==="sport"&&tt(q,"box",[.32,.055,.02],"white",[0,1.3,.18]);const We=!Z&&N.outfit==="dress"?tt(q,"box",[.6,.4,.44],he,[0,.79,0]):null,Ie=new pn;if(Ie.position.y=1.69,q.add(Ie),tt(Ie,"box",[.43,.46,.4],ae,[0,0,0]),Z)Ie.add(new Mt(mc(Z,"head",Nt,b),H)),q.add(new Mt(mc(Z,"body",Nt,b),H));else{const Lt="hair:"+N.hair;if(!Ve.has(Lt)){const zt=[[.47,.18,.44,0,.21,-.02],[.45,N.hair==="long"||N.hair==="hijab"?.67:.3,.12,0,N.hair==="long"||N.hair==="hijab"?-.12:.07,-.2]];if(N.hair!=="short")for(const Ei of[-1,1])zt.push([.09,N.hair==="bob"?.4:.53,.32,Ei*.235,-.01,-.03]);const Gi=zt.map(([Ei,Iu,Nu,Uu,Fu,Ou])=>{const Ha=new Ht(Ei,Iu,Nu);Ha.translate(Uu,Fu,Ou);const Bu=Ha.toNonIndexed();return Ha.dispose(),Bu}),Hi=jn(Gi,!1);Gi.forEach(Ei=>Ei.dispose()),Ve.set(Lt,Hi),b.add(Hi)}Ie.add(new Mt(Ve.get(Lt),P(qe)))}if(!Z&&N.hair==="ponytail"&&tt(Ie,"box",[.24,.53,.22],qe,[0,-.02,-.35]),!Z&&N.hair==="hijab"&&tt(q,"box",[.58,.18,.43],qe,[0,1.44,-.04]),!Ve.has("eyes")){const Lt=[-.095,.095].map(Gi=>{const Hi=new Ht(.035,.045,.025);Hi.translate(Gi,.035,.205);const Ei=Hi.toNonIndexed();return Hi.dispose(),Ei}),zt=jn(Lt,!1);Lt.forEach(Gi=>Gi.dispose()),Ve.set("eyes",zt),b.add(zt)}const oe=new Mt(Ve.get("eyes"),P("#263833"));Ie.add(oe);const te=[oe];if(tt(Ie,"box",[.09,.02,.025],k?"#b96f78":"#9c6d58",[0,-.105,.21]),k)for(const Lt of[-.14,.14])tt(Ie,"box",[.065,.025,.02],"#d39589",[Lt,-.065,.21]);if(N.accessory==="glasses"){for(const Lt of[-1,1])tt(Ie,"box",[.15,.11,.025],"gold",[Lt*.105,.04,.224]),tt(Ie,"box",[.11,.07,.025],ae,[Lt*.105,.04,.24]);tt(Ie,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(N.accessory==="headphones"){tt(Ie,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Lt of[-1,1])tt(Ie,"box",[.12,.2,.18],"deep",[Lt*.28,.07,0])}const lt=[];for(const Lt of[-.34,.34]){const zt=new pn;zt.position.set(Lt,1.42,0),q.add(zt),tt(zt,"box",[.17,.4,.2],he,[0,-.19,0]),tt(zt,"box",[.15,.27,.16],ae,[0,-.45,.05]),lt.push(zt)}const rt=[],Fe=[];for(const Lt of[-.14,.14]){const zt=new pn;zt.position.set(Lt,.83,0),q.add(zt),tt(zt,"box",[.18,.64,.2],Z?.pants||"#35463f",[0,-.32,0]),Fe.push(tt(zt,"box",[.23,.14,.34],Z?.accent||(N.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),rt.push(zt)}const Ct=tt(lt[1],"sphere",[.12],"white",[0,-.49,.14]),It=tt(lt[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),ft=new pn;lt[1].add(ft),ft.position.set(0,-.48,.16),tt(ft,"box",[.04,.44,.05],"gold",[0,-.14,0]);const ut=new ii(.24,.025,6,16);b.add(ut),ft.add(new Mt(ut,P("white"))),ft.rotation.x=Math.PI/2;const et=new Mt(xt("billiards"),P("gold"));et.position.set(0,-.48,.35),lt[1].add(et),et.visible=!1;const $t=new Ws(.5,.59,24);b.add($t);const li=new Gn({color:"#c5a061",side:jt});M.set(`ring-${v.id}`,li);const tn=new Mt($t,li);tn.rotation.x=-Math.PI/2,tn.position.y=.02,R.add(tn),tn.visible=!1;const Ye=document.createElement("button");Ye.type="button",Ye.className="vo-avatar-label",Ye.setAttribute("aria-pressed","false");const ln=document.createElement("i"),qn=document.createElement("span"),zi=document.createElement("small");Ye.append(ln,qn,zi),e.append(Ye);const yi=document.createElement("span");return yi.className="vo-speech",yi.hidden=!0,Ye.append(yi),Ye.addEventListener("click",()=>t(v.id)),R.traverse(Lt=>{Lt.isMesh&&(Lt.userData.personId=v.id)}),{group:R,body:q,head:Ie,arms:lt,legs:rt,shoes:Fe,eyes:te,skirt:We,cup:Ct,plate:It,racket:ft,tool:et,bubble:yi,label:Ye,dot:ln,name:qn,icon:zi,ring:tn,person:v,appearance:JSON.stringify(v.avatar),privateGeometry:ut,target:new z,phase:v.id*1.75}}let nt=null,ze=!1,Ee=!0,St=!1,Oe=null,Ze=0,D=0,y=null,X=[],pe=null,ne=null,ge="orbit",Me=null,ie=!1,re={};const ye=new Map,O=new Map;let se=null,Y=null,xe=null,ue=null,ve={},He=o,Je=null,_e=()=>!1,Le=null,Ne=null,fe=null,dt=null,Rt=!1,mn=null;const gs=new Ws(1.2,1.4,32);b.add(gs);const Oi=new Gn({color:"#e9be69",side:jt,transparent:!0,opacity:.85});M.set("pilot-guide",Oi);const Wn=new Mt(gs,Oi);Wn.rotation.x=-Math.PI/2,Wn.visible=!1,Wn.userData.pilotGuide=!0,m.add(Wn);const En=new Map,_s=[],Nn={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},Pt=new z,Xt=new z;let Bt=!1;function en(v){Y&&xe&&!v.some(oe=>oe.id===Y)&&(v=[...v,{...xe,home_slot:fe?.slot??xe.home_slot}]),u.configureHomes(!0,Rt?fe?.slot:null,Math.max(mn??0,v.length,...v.map(oe=>(oe.home_slot??-1)+1))),X=v,de.sync(v),yt.extent(de.bounds().back);const R=v.map(oe=>{if(!ne?.connected||!ne.room||![ne.room.from,ne.room.to].includes(oe.id)){const te=v.find(lt=>lt.is_me)?.id;return ne&&!ne.connected&&(oe.id===te||oe.meeting_with===te)?{...oe,meeting_with:null,meeting_spot:null}:oe}return{...oe,state:"online",meeting_with:ne.room.from===oe.id?ne.room.to:ne.room.from,meeting_spot:ne.room.spot}}),N=oe=>oe.id===nt||oe.id===Me||oe.is_me||se&&[se.from,se.to].includes(oe.id),Z=[...R].sort((oe,te)=>+!!N(te)-+!!N(oe)||+!!te.meeting_with-+!!oe.meeting_with||{online:0,idle:1,offline:2}[oe.state]-{online:0,idle:1,offline:2}[te.state]||oe.id-te.id),k=[],he={umum:0,operasional:0},q=[],ae=new Map;let qe=0,We=0;for(const oe of Z){if(k.length>=24)break;oe.state==="online"&&he[oe.department]>=16||(k.push(oe),oe.state==="online"&&he[oe.department]++)}const Ie=new Set(k.map(oe=>oe.id));for(const[oe,te]of x)(!Ie.has(oe)||te.appearance!==JSON.stringify(k.find(lt=>lt.id===oe)?.avatar))&&(m.remove(te.group),te.label.remove(),te.ring.geometry.dispose(),b.delete(te.ring.geometry),te.privateGeometry.dispose(),b.delete(te.privateGeometry),te.ring.material.dispose(),M.delete(`ring-${oe}`),x.delete(oe));he.umum=he.operasional=0;for(const oe of k){let te=x.get(oe.id),lt=!te;te||(te=Wt(oe),x.set(oe.id,te));const rt=te.game?.id,Fe=te.pose,Ct=te.home?.clone(),It=oe.in_office===!1&&oe.state!=="offline",ft=It?null:En.get(oe.id)||oe.pilot,ut=oe.id===Y&&ue?ue.state():ft;te.person=oe,te.pose=ku(oe,f());let et;te.game=Vu(oe,f());const $t=It?null:ye.get(oe.id)||oe.recreation,li=!It&&se&&se.status!=="pending"&&[se.from,se.to].includes(oe.id);li?(te.game=bi.find(Ye=>Ye.id===se.kind)||te.game,te.pose="playing"):$t?.kind==="game"&&$t.until>Date.now()/1e3&&oe.state!=="offline"&&(te.game=bi.find(Ye=>Ye.id===$t.destination)||te.game,te.pose="playing");const tn=$t&&(!$t.until||$t.until>Date.now()/1e3)&&Nn[$t.destination];if(te.destination=!!tn,tn&&!li&&oe.state!=="offline"){te.pose=$t.kind==="drink"?"coffee":$t.kind==="food"?"eating":$t.kind==="dance"?"dancing":"resting",et=[tn[0]+oe.id%5*1.6,tn[1],tn[2]+Math.floor(oe.id%10/5)*1.3];const Ye=u.nearest({x:et[0],z:et[2]});Ye&&(et=[Ye.x,et[1],Ye.z]),te.group.rotation.y=Math.PI}else if(!It&&oe.meeting_with&&Number.isInteger(oe.meeting_spot)&&!li){te.pose="meeting";const Ye=oe.id<oe.meeting_with?-1:1;et=[-36+oe.meeting_spot*6.5+Ye*.9,-.12,20],te.facing=Ye<0?Math.PI/2:-Math.PI/2}else if(te.pose==="working")et=De[oe.department][he[oe.department]++],te.group.rotation.y=Math.PI;else if(te.pose==="playing"){const Ye=ae.get(te.game.id)||0;ae.set(te.game.id,Ye+1);const ln=Ye%2?1:-1;et=[te.game.x+(te.game.kind==="court"?ln*(3-Math.floor(Ye/2)%3*1.7):Math.floor(Ye/2)*.8),-.12,te.game.z+ln*(te.game.kind==="court"?3.6:2.5)],te.group.rotation.y=ln<0?0:Math.PI}else if(te.pose==="sleeping")et=de.bed(oe.id),te.group.rotation.y=0;else if(te.pose==="resting"){const Ye=qe++;et=[-15.8+Ye%8*2.02,.12,4.7+Math.floor(Ye/8)*3.3],te.group.rotation.y=0}else if(We<8){const Ye=We++,ln=Ye%4,qn=Ye<4?1:-1;et=[(ln%2?13.8:8)+qn*1.65,.08,ln<2?5.1:9.7],te.group.rotation.y=qn*Math.PI/2}else{const Ye=qe++;et=[-15.8+Ye%8*2.02,.12,4.7+Math.floor(Ye/8)*3.3],te.group.rotation.y=0}if(te.pose==="playing"&&te.game.id==="darts"&&(et=[te.game.x+(oe.id%2?-1:1)*1.2,-.12,te.game.z+2.5]),["playing","meeting"].includes(te.pose)&&!u.free(et[0],et[2])){const Ye=u.nearest({x:et[0],z:et[2]});Ye&&(et=[Ye.x,et[1],Ye.z])}if((te.pose==="playing"||tn)&&q.some(Ye=>Math.hypot(Ye[0]-et[0],Ye[2]-et[2])<.7))e:for(const Ye of[.8,1.5,2.2])for(let ln=0;ln<12;ln++){const qn=et[0]+Math.cos(ln*Math.PI/6)*Ye,zi=et[2]+Math.sin(ln*Math.PI/6)*Ye;if(u.free(qn,zi)&&!q.some(yi=>Math.hypot(yi[0]-qn,yi[2]-zi)<.7)){et=[qn,et[1],zi];break e}}if(ut&&oe.state!=="offline"?(et=[ut.x,ut.y,ut.z],te.pose="manual",te.manual=!0,te.group.rotation.y=ut.yaw,te.waypoints=[]):te.manual=!1,q.push(et),te.target.set(...et),te.home=te.target.clone(),(lt||Fe!==te.pose&&te.pose!=="meeting"&&!tn&&!li)&&te.group.position.copy(te.target),!te.manual&&!lt&&(te.pose==="playing"&&(rt!==te.game.id||Fe!=="playing")||(tn||te.pose==="meeting")&&(!Ct||Ct.distanceTo(te.home)>.1))){if(!u.free(te.group.position.x,te.group.position.z)){const Ye=u.nearest(te.group.position)||u.nearest({x:0,z:21.5});Ye&&te.group.position.set(Ye.x,et[1],Ye.z)}te.waypoints=u.withHomeAccess(de.slotFor(oe.id),()=>u.path(te.group.position,te.home)).map(Ye=>new z(Ye.x,et[1],Ye.z))}else!["playing","meeting"].includes(te.pose)&&!tn&&(te.waypoints=[]);ze&&te.pose==="meeting"&&(te.group.position.copy(te.home),te.group.rotation.y=te.facing,te.waypoints=[]),te.dot.className=`vo-dot ${oe.state}`,te.name.textContent=oe.name,te.icon.textContent=`${oe.state==="offline"?"OFFLINE ":oe.state==="idle"?"JEDA ":"ONLINE "}${te.pose==="meeting"?"💬":te.pose==="sleeping"?"☾ RUMAH":te.pose==="playing"?te.game.icon:te.pose==="coffee"?"☕":""}`,li&&se.bot&&oe.id===se.to&&(te.icon.textContent="OFFLINE · NPC "+te.game.icon),te.pose==="dancing"&&(te.icon.textContent=(oe.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),te.label.setAttribute("aria-label",`${oe.name}, ${oe.state==="online"?"online":oe.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),te.cup.visible=te.pose==="coffee",te.plate.visible=te.pose==="eating",te.manual&&(te.cup.visible=ut.action==="drink",te.plate.visible=ut.action==="eat",te.icon.textContent=(oe.private?"PRIVAT · ":"ONLINE · ")+(ut.action==="run"?"BOOST":ut.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),te.racket.visible=te.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(te.game.id),te.tool.visible=te.pose==="playing"&&["billiards","archery","darts"].includes(te.game.id),te.tool.visible&&(te.tool.geometry=xt(te.game.id)),te.shoes.forEach(Ye=>{Ye.visible=te.pose!=="sleeping"}),te.eyes.forEach(Ye=>{Ye.scale.y=te.pose==="sleeping"?.18:1}),te.ring.visible=nt===oe.id,te.label.setAttribute("aria-pressed",String(nt===oe.id))}de.select(pe??(x.get(nt)?.pose==="sleeping"?nt:null)),At()}const bn=new z;function Ys(){const v=i.getBoundingClientRect(),R=[];for(const N of[...x.values()].sort((Z,k)=>+(k.person.id===nt)-+(Z.person.id===nt))){if(N.pose==="sleeping"){const We=de.location(N.person.id);bn.set(We.x,5.2,We.z+1)}else N.group.getWorldPosition(bn),bn.y+=2.35;bn.project(d);const Z=(bn.x+1)/2*v.width,k=(1-bn.y)/2*v.height;if(Be.active()&&N.person.id!==Y){N.label.hidden=!0;continue}const he=166,q=27,ae=R.some(We=>Math.abs(We.x-Z)<he&&Math.abs(We.y-k)<q),qe=bn.z<1&&bn.z>-1&&Z>18&&Z<v.width-18&&k>15&&k<v.height-65&&(!ae||N.person.id===nt);N.label.hidden=!qe,qe&&(N.label.style.transform=`translate(${Z}px,${k}px) translate(-50%,-100%)`,R.push({x:Z,y:k}))}}function oi(v=0){if(Oe=null,St||!Ee)return;if(v-Ze<1e3/30&&!ze){Oe=requestAnimationFrame(oi);return}const R=Math.min(.06,Math.max(.001,(v-Ze)/1e3));Ze=v,Bt&&(d.position.lerp(Xt,.12),_.target.lerp(Pt,.12),d.position.distanceTo(Xt)<.04&&(d.position.copy(Xt),_.target.copy(Pt),Bt=!1));let N=0;for(const q of x.values()){const ae=ze?0:v/1e3+q.phase;if(q.person.id===Y&&ue){const Ie=Math.atan2(d.position.x-_.target.x,d.position.z-_.target.z),oe=[...x.values()].filter(Fe=>Fe!==q&&Fe.pose!=="sleeping").map(Fe=>Fe.group.position),te=_e();let lt=te?{}:ve;if((lt.x||lt.z||lt.jump)&&(Ne=null,Le=null),Ne&&(Ne.elapsed=(Ne.elapsed||0)+R),Ne?.elapsed>4&&(Ne=null,He({...ue.state(),restBlocked:!0})),Ne&&!te){const Fe=ue.state();if(Fe.grounded)if(Ne.point||(Ne.point=gc(u,Fe,Ne.pose,oe)),!Ne.point)Ne=null;else{const Ct=Ne.point.x-Fe.x,It=Ne.point.z-Fe.z,ft=Math.hypot(Ct,It);if(ft<.04)ue.face({x:Fe.x+Math.sin(Ne.point.yaw),z:Fe.z+Math.cos(Ne.point.yaw)}),Le={action:"rest",pose:Ne.pose,venue:Ci(Fe,fe)?"home":["beach","garden","terrace","lounge","bar"].find(ut=>Er(Fe,ut))||"campus"},Ne=null,lt={};else{const ut=Math.min(1,ft/(4.5*R))/ft;lt={x:(Math.cos(Ie)*Ct-Math.sin(Ie)*It)*ut,z:(-Math.sin(Ie)*Ct-Math.cos(Ie)*It)*ut}}}}const rt=ue.step(R,lt,Ie,oe);if(["walk","run","jump"].includes(rt.action)&&(Le=null),Le&&Object.assign(rt,Le),rt.restPending=!!Ne,q.group.position.set(rt.x,rt.y,rt.z),q.group.rotation.y=rt.yaw,q.manual=!0,q.pose="manual",q.home.copy(q.group.position),q.target.copy(q.group.position),Je){const Fe=Je==="home"&&fe?{x:fe.x,z:fe.z+5}:Bn.venues[Je];Fe&&(rt.target=Je,rt.distance=Math.round(Math.hypot(rt.x-Fe.x,rt.z-Fe.z)))}if(rt.atHome=Ci(rt,fe),rt.nearDoor=!!(fe&&Math.hypot(rt.x-fe.x,rt.z-fe.z-3.9)<=2.8),rt.doorOpen=Rt,fe){const Fe=Ci(rt,fe);Fe!==Be.active()&&(Bt=!1,de.select(Fe?dt:null),Fe&&(ge="follow",Me=Y,_.enablePan=!1)),Be.set(Fe?dt:null,Fe?q.group:null),rt.interior=Fe}else rt.interior=!1;He({...rt,interior:Be.active()}),q.icon.textContent=(q.person.private?"PRIVAT · ":"ONLINE · ")+(rt.action==="run"?"BOOST":rt.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(q.manual){const Ie=q.person.id===Y&&ue?{...ue.state(),...Le||{}}:En.get(q.person.id)||q.person.pilot;if(Ie&&q.person.id!==Y){const rt=new z(Ie.x,Ie.y,Ie.z),Fe=q.group.position.clone().lerp(rt,.35);u.segment(q.group.position,Fe)?q.group.position.copy(Fe):q.group.position.copy(rt),q.group.rotation.y=Ie.yaw}q.person.id!==Y&&S.observe(q.person.id,Ie,q);const oe=S.pose(q.person.id),te=r0(q,oe&&!["walk","run","jump","rest"].includes(Ie?.action)?{...Ie,action:"cast",skillPose:oe}:Ie,{time:v/1e3+q.phase,dt:R,reduced:ze}),lt=Ie?.action==="play"?bi.find(rt=>rt.id===Ie.venue):null;q.racket.visible=!!(lt&&["tennis","badminton","pingpong","golf"].includes(lt.id)),q.tool.visible=!!(lt&&["billiards","archery","darts"].includes(lt.id)),q.tool.visible&&(q.tool.geometry=xt(lt.id)),q.cup.visible=Ie?.action==="drink",q.plate.visible=Ie?.action==="eat",Ie?.action==="rest"&&(q.icon.textContent=Ie.pose==="nap"?"ONLINE · TIDUR SANTAI":Ie.pose==="recline"?"ONLINE · REBAHAN":Ie.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI"),te.lying&&(!Be.active()||q.person.id===Y)&&(B.compose(new z(q.group.position.x+Math.sin(q.group.rotation.y)*.7,q.group.position.y+.035,q.group.position.z+Math.cos(q.group.rotation.y)*.7),q.group.quaternion,new z(1,1,1)),I.setMatrixAt(N++,B));continue}const qe=q.pose==="playing",We=!ze&&(qe||q.waypoints?.length>0);if(q.target.copy(q.home),qe&&!q.waypoints?.length&&(q.target.x+=Math.sin(ae*.65)*(q.game.kind==="court"?1.4:.18),q.target.z+=Math.cos(ae*.5)*(q.game.kind==="court"?.3:.08)),q.waypoints?.length&&!ze){const Ie=q.waypoints[0];q.group.position.distanceTo(Ie)<.015?q.waypoints.shift():(q.group.rotation.y=Math.atan2(Ie.x-q.group.position.x,Ie.z-q.group.position.z),Bi(q,Ie,R*3.2))}else qe?Bi(q,q.target,ze?0:R*1.4):q.pose==="meeting"?(Bi(q,q.home,ze?0:R*3.2),q.group.rotation.y=q.facing):q.group.position.copy(q.home);q.legs.forEach((Ie,oe)=>{Ie.rotation.x=We?Math.sin(ae*4+oe*Math.PI)*.32:q.pose==="working"||q.pose==="resting"?-1.1:0}),q.body.position.y=Math.sin(ae*1.6)*(ze?0:q.pose==="sleeping"?.007:.018),q.body.rotation.x=q.pose==="sleeping"?-Math.PI/2:0,q.body.rotation.z=qe?Math.sin(ae*1.5)*.07:0,q.head.rotation.x=q.pose==="sleeping"?0:Math.sin(ae*.6)*(ze?0:.025),q.arms[0].rotation.x=q.pose==="working"?-.65+Math.sin(ae*5)*(ze?0:.045):q.pose==="eating"?-1.05:.1,q.arms[1].rotation.x=q.pose==="working"?-.65+Math.sin(ae*5+1)*(ze?0:.045):q.pose==="coffee"?-1.2+Math.sin(ae*1.2)*(ze?0:.13):q.pose==="eating"?-.8+Math.sin(ae*2)*(ze?0:.13):.1,qe&&(q.arms[1].rotation.x=-.6+Math.sin(ae*2.3)*(ze?0:.7),q.arms[0].rotation.x=-.25+Math.sin(ae*2.3+1)*(ze?0:.25)),q.pose==="dancing"&&!We&&(q.body.rotation.z=ze?0:Math.sin(ae*2.4)*.13,q.arms.forEach((Ie,oe)=>{Ie.rotation.x=-.8+Math.sin(ae*2.4+oe)*(ze?0:.5)}),q.legs.forEach((Ie,oe)=>{Ie.rotation.x=ze?0:Math.sin(ae*2.4+oe*Math.PI)*.25})),q.pose==="meeting"?(q.arms[1].rotation.x=-.2+Math.sin(ae*1.7)*(ze||We?0:.18),q.head.rotation.y=Math.sin(ae*.7)*(ze?0:.06)):q.head.rotation.y=0}I.count=N,I.instanceMatrix.needsUpdate=!0,S.update();const Z=x.get(Me);if(ge!=="orbit"&&Z&&!Bt){const ae=Z.group.position.clone().add(new z(0,Z.pose==="sleeping"?.25:1.3,Z.pose==="sleeping"?-1.3:0)).clone().sub(_.target).multiplyScalar(.25);_.target.add(ae),d.position.add(ae)}yt.update(v,{paused:ze,dark:document.documentElement.classList.contains("dark"),center:_.target}),ce.update(v,{paused:ze,energySaver:ie}),Se.update(v,ze);for(const{mesh:q,game:ae}of we){const qe=ze?0:v/1e3,Ie=[...x.values()].some(oe=>oe.manual?(oe.person.id===Y?Le:En.get(oe.person.id)||oe.person.pilot)?.action==="play"&&(oe.person.id===Y?Le:En.get(oe.person.id)||oe.person.pilot)?.venue===ae.id:!Xu(f())&&oe.pose==="playing"&&oe.game.id===ae.id)?Math.sin(qe*1.8):0;q.position.set(ae.x+(ae.id==="golf"?Ie*4:Ie*1.5),ae.id==="pingpong"?1.45+Math.abs(Ie)*.65:ae.id==="basketball"?.15+Math.abs(Ie)*2.2:ae.id==="bowling"||ae.id==="golf"?.06:.4+Math.abs(Ie)*2,ae.z+Ie*(ae.kind==="court"?4:1.3))}_.update();const k=d.position.clone(),he=d.quaternion.clone();ge!=="orbit"&&Z&&d.position.copy(i0(u,_.target,k,de.cameraBoxes(Me),Be.active()?1.7:ge==="portrait"?2.8:3.8,Be.active()?8:35)),d.lookAt(_.target),d.updateMatrixWorld(!0),y?y.copy(d):y=d.clone(),Be.apply(),g.render(m,d),(ze||v-D>120||Bt)&&(Ys(),D=v),d.position.copy(k),d.quaternion.copy(he),d.updateMatrixWorld(!0),(!ze||Bt||Ne||ue?.moving()||ue&&ue.state().stamina<100||!_e()&&(Math.abs(ve.x||0)+Math.abs(ve.z||0)>0||ve.jump))&&At()}function At(){!St&&Ee&&Oe===null&&(Oe=requestAnimationFrame(oi))}function Bi(v,R,N){const Z=de.location(v.person.id),k=Z&&Math.abs(v.group.position.x-Z.x)<4.8&&Math.abs(v.group.position.z-Z.z)<5;return!!k!=!!v.npcDoorOpen&&(v.npcDoorOpen=!!k,de.setDoor(v.person.id,!!k)),u.withHomeAccess(de.slotFor(v.person.id),()=>Zs(v,R,N))}function Zs(v,R,N){const Z=u.move(v.group.position,R,N),k=Math.hypot(Z.x-v.group.position.x,Z.z-v.group.position.z),he=[...x.values()].some(q=>q!==v&&q.pose!=="sleeping"&&Math.hypot(Z.x-q.group.position.x,Z.z-q.group.position.z)<.62);if(he||v.group.position.set(Z.x,v.home.y,Z.z),(he||k<.001&&v.group.position.distanceTo(R)>.2)&&Ze>=(v.repathAt||0)&&(v.pose==="meeting"||v.waypoints?.length)){v.repathAt=Ze+1500;const q=[...x.values()].filter(qe=>qe!==v&&qe.pose!=="sleeping").map(qe=>qe.group.position),ae=u.path(v.group.position,v.home,q);ae.length&&(v.waypoints=ae.map(qe=>new z(qe.x,v.home.y,qe.z)))}}function Si(){if(St)return;const v=i.getBoundingClientRect();v.width<1||v.height<1||(g.setSize(v.width,v.height,!1),d.aspect=v.width/v.height,d.updateProjectionMatrix(),At())}function Ks(v="all"){if(Be.active()){Xn("follow",Y);return}ge="orbit",Me=null,d.fov=36,d.updateProjectionMatrix(),_.enablePan=!0,_.minDistance=8,_.maxDistance=650;const R=i.clientWidth<600,N={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const he of bi)N[he.id]=[[he.x,.3,he.z],[he.x+14,19,he.z+22]];for(const[he,q]of Object.entries(Nn))N[he]=[q,[q[0]+12,19,q[2]+22]];const[Z,k]=N[v]||N.all;if(Pt.set(...Z),Xt.set(...k),v==="all"||v==="residences"){const he=de.bounds(),q=v==="all"?76:he.front,ae=he.right-he.left,qe=q-he.back;Pt.set(0,0,(q+he.back)/2);const We=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Ie=Math.min(ss.degToRad(d.fov/2),Math.atan(Math.tan(ss.degToRad(d.fov/2))*We)),oe=Math.hypot(ae,qe)/2/Math.sin(Ie)*1.07;Xt.copy(new z(1,1.18,1.3).normalize().multiplyScalar(oe).add(Pt))}else R&&Xt.sub(Pt).multiplyScalar(1.23).add(Pt);pe=null,de.select(x.get(nt)?.pose==="sleeping"?nt:null),ze?(d.position.copy(Xt),_.target.copy(Pt),Bt=!1):Bt=!0,At()}function xs(v){if(Be.active()){Xn("follow",Y);return}ge="orbit",Me=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650,d.fov=36,d.updateProjectionMatrix();const R=de.location(v);R&&(pe=v,de.select(v),Pt.set(R.x,1.2,R.z),Xt.copy(Pt).add(new z(11,12,15)),i.clientWidth<600&&Xt.sub(Pt).multiplyScalar(1.23).add(Pt),ze?(d.position.copy(Xt),_.target.copy(Pt),Bt=!1):Bt=!0,At())}function Xn(v,R=nt){if(Be.active()&&(v="follow",R=Y),v==="orbit"){ge="orbit",Me=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650;return}!x.has(R)&&X.some(Z=>Z.id===R)&&(nt=R,en(X));const N=x.get(R);N&&(ge=v==="portrait"?"portrait":"follow",Me=R,_.enablePan=!1,_.minDistance=Be.active()?1.7:ge==="portrait"?2.8:3.8,_.maxDistance=Be.active()?8:35,d.fov=Be.active()?58:44,d.updateProjectionMatrix(),Pt.copy(N.group.position).add(new z(0,N.pose==="sleeping"?.25:1.3,N.pose==="sleeping"?-1.3:0)),Xt.copy(Pt).add(ge==="portrait"?new z(1.8,.9,2.7):new z(4,2.5,5)),ze?(d.position.copy(Xt),_.target.copy(Pt),Bt=!1):Bt=!0,At())}let T=null;const G=new Gn({transparent:!0,opacity:0,depthWrite:!1});M.set("game-hotspots",G);for(const v of bi){const R=new Ht(6,1.4,.4),N=new Ht(v.kind==="court"?16:9,.18,v.kind==="court"?12:7);R.translate(0,.7,-(v.kind==="court"?6:4.2)),N.translate(0,-.14,0);const Z=R.toNonIndexed(),k=N.toNonIndexed(),he=jn([Z,k],!1);R.dispose(),N.dispose(),Z.dispose(),k.dispose(),b.add(he);const q=new Mt(he,G);q.position.set(v.x,0,v.z),q.userData.officeGame=v.id,m.add(q),_s.push(q)}const Q=new _u,K=new Ke,$=v=>{T=[v.clientX,v.clientY]},Te=v=>{if(!T||Math.hypot(v.clientX-T[0],v.clientY-T[1])>6)return;T=null;const R=g.domElement.getBoundingClientRect();K.set((v.clientX-R.left)/R.width*2-1,-(v.clientY-R.top)/R.height*2+1),Q.setFromCamera(K,y||d);const N=Q.intersectObjects([...x.values()].map(k=>k.group).concat(de.meshes,ce.targets,Se.targets,_s),!0)[0],Z=de.personForHit(N);if(Z===dt&&N?.object.userData.residenceLayer==="door"){a();return}Z?(t(Z),xs(Z)):N?.object.userData.personId?t(N.object.userData.personId):N?.object.userData.officeVenue?s(N.object.userData.officeVenue):N?.object.userData.officeGame&&r(N.object.userData.officeGame)};function Ue(){const v=document.documentElement.classList.contains("dark");g.toneMappingExposure=v?1.02:1.18,yt.configure(re,ie),At()}const be=new ResizeObserver(Si);be.observe(i);const Ce=new MutationObserver(Ue);Ce.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const Ge=v=>{v.preventDefault(),St||n()};g.domElement.addEventListener("pointerdown",$),g.domElement.addEventListener("pointerup",Te),g.domElement.addEventListener("webglcontextlost",Ge);const Qe=()=>At();return _.addEventListener("change",Qe),_.addEventListener("start",()=>{Bt=!1}),Ue(),Ks("all"),d.position.copy(Xt),_.target.copy(Pt),Bt=!1,Si(),{setPeople:en,resize:Si,focusRoom:Ks,visitHome:xs,setCameraMode:Xn,collisionBoxes:()=>u.boxes(),setPilotReporter(v){He=v},castSkill(v=0){const R=x.get(Y);if(!R||!ue)return{error:"Aktifkan kendali avatar dahulu."};const N=Hu(hl(R.person.avatar).costume)[v];return N?S.cooldown(Y)?{error:`Pulihkan energi ${S.cooldown(Y)} detik lagi.`}:(Le=null,Ne=null,S.cast(Y,N.id,R)?(At(),{skill:N.id,skill_id:globalThis.crypto.randomUUID(),name:N.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},setPrivatePilotProfile(v){xe&&(xe={...xe,avatar:v},en(X.map(R=>R.id===xe.id?xe:R)))},setPilotGate(v){_e=v},reconcilePilot(v){ue&&(ue.reset(v),Le=null,Ne=null,ve={},At())},configureHome(v,R,N=null){dt=v,fe=R?Ga(R.slot):null,mn=Number.isInteger(N)?Math.min(128,N):null,de.setPlots(mn??0)},canUseDoor(){const v=ue?.state();return!!(fe&&v&&(Ci(v,fe)||Math.hypot(v.x-fe.x,v.z-fe.z-3.9)<=2.8))},homeDoorOpen:()=>Rt,setHomeDoor(v){Rt!==!!v&&(Rt=!!v,u.configureHomes(!0,Rt?fe?.slot:null),dt&&de.setDoor(dt,Rt),At())},setRestPose(v){if(!ue)return!1;if(S.cancel(Y),Ne=null,Le=null,ve={},!v)return At(),!0;if(!["sit","recline","nap","meditate"].includes(v))return!1;const R=ue.state(),N=[...x.values()].filter(k=>k.person.id!==Y&&k.pose!=="sleeping").map(k=>k.group.position),Z=R.grounded?gc(u,R,v,N):null;return R.grounded&&!Z?!1:(Ne={pose:v,point:Z},Z&&Math.hypot(Z.x-R.x,Z.z-R.z)<.04&&(ue.face({x:R.x+Math.sin(Z.yaw),z:R.z+Math.cos(Z.yaw)}),Le={action:"rest",pose:v,venue:Ci(R,fe)?"home":["beach","garden","terrace","lounge","bar"].find(k=>Er(R,k))||"campus"},Ne=null),At(),!0)},setPilot(v,R,N=null){Y=v,xe=N,ue=n0(u,R),en(X),Xn("follow",v),At()},releasePilot(){Be.leave();const v=xe?.id;Y=null,xe=null,ue=null,ve={},Le=null,Ne=null,Je=null,Wn.visible=!1,en(X.filter(R=>R.id!==v))},setPilotInput(v){ve=v||{},At()},pilotState(){return ue?{...ue.state(),...Le||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Y&&(Xn("follow",Y),i.focus?.({preventScroll:!0}))},setPeerPilots(v){En.clear();for(const R of v)R.id!==Y&&En.set(R.id,R);en(X.map(R=>({...R,pilot:En.get(R.id)||null,in_office:En.has(R.id)||R.id===Y})))},canInteract(v){return Er(ue?.state(),v)},guideTo(v){const R=v==="home"&&fe?{x:fe.x,z:fe.z+5}:Bn.venues[v];if(Je=R?v:null,Wn.visible=!!R,R){Wn.position.set(R.x,.025,R.z);const N=ue?.state();He({...N,target:v,distance:N?Math.round(Math.hypot(R.x-N.x,R.z-N.z)):null}),At()}return R},interactNearest(){const v=ue?.state();if(!v)return!1;if(fe&&(Ci(v,fe)||Math.hypot(v.x-fe.x,v.z-fe.z-3.9)<=2.8))return a(),!0;const R=Object.keys(Bn.venues).filter(N=>Er(v,N)).sort((N,Z)=>Math.hypot(v.x-Bn.venues[N].x,v.z-Bn.venues[N].z)-Math.hypot(v.x-Bn.venues[Z].x,v.z-Bn.venues[Z].z))[0];return bi.some(N=>N.id===R)?(r(R),!0):["bar","disco","beach","garden","terrace","lounge"].includes(R)?(s(R),!0):!1},setRecreation(v,R){Number(v)===Y&&R&&(Le={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[R.kind]||"idle",venue:R.destination,pose:R.kind==="relax"?"sit":null}),ye.set(Number(v),R?{...R,until:R.until||Date.now()/1e3+900}:null),en(X)},setVenueEffects(v){ce.setEnabled(v),At()},setGame(v){JSON.stringify(se)!==JSON.stringify(v)&&(se=v,Y&&v?.status==="playing"&&[v.from,v.to].includes(Y)?Le={action:"play",venue:v.kind}:Le?.action==="play"&&(Le=null),en(X))},say(v,R){const N=x.get(Number(v));N&&(N.bubble.textContent=String(R||"").slice(0,350),N.bubble.hidden=!1,O.has(v)&&clearTimeout(O.get(v)),O.set(v,setTimeout(()=>{N.bubble.hidden=!0,O.delete(v),At()},1e4)),At())},configureWorld(v){re=v||{},yt.configure(re,ie),P("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[re.settings?.landscape]||"#47695f"),At()},setEnergySaver(v){ie=!!v,g.setPixelRatio(ie?1:Math.min(window.devicePixelRatio||1,1.5)),yt.configure(re,ie),Si()},setMeeting(v){ne=v,en(X)},meetingReady(){if(Y&&ne?.connected&&ne.room){const R=x.get(ne.room.from),N=x.get(ne.room.to);if(!R||!N||R.group.position.distanceTo(N.group.position)>3)return!1;const Z=N.group.position.x-R.group.position.x,k=N.group.position.z-R.group.position.z,he=Math.hypot(Z,k);return he>.2&&(Math.sin(R.group.rotation.y)*Z+Math.cos(R.group.rotation.y)*k)/he>.45&&(-Math.sin(N.group.rotation.y)*Z-Math.cos(N.group.rotation.y)*k)/he>.45}const v=ne?.room;return!v||!ne.connected?!1:[v.from,v.to].every(R=>{const N=x.get(R);return N&&N.pose==="meeting"&&!N.waypoints?.length&&N.group.position.distanceTo(N.home)<.2&&Math.abs(N.group.rotation.y-N.facing)<.15})},select(v,R=!1){nt!==v&&(pe=null),nt=v,v&&!x.has(v)&&X.some(Z=>Z.id===v)&&en(X);for(const[Z,k]of x)k.ring.visible=Z===v,k.label.setAttribute("aria-pressed",String(Z===v));const N=x.get(v);if(de.select(pe??(N?.pose==="sleeping"?v:null)),N&&R&&Y&&v!==Y&&ue){ue.face(N.group.position),At();return}if(N&&R&&ge!=="orbit"){Xn(ge,v);return}if(N&&R&&N.pose==="sleeping"){xs(v);return}N&&R&&(Pt.copy(N.target).add(new z(0,1,0)),Xt.copy(Pt).add(new z(11,11,14)),ze?(d.position.copy(Xt),_.target.copy(Pt)):Bt=!0),At()},zoom(v){if(!Number.isFinite(v)||v<=0)return;Bt=!1;const R=d.position.clone().sub(_.target);R.setLength(ss.clamp(R.length()*v,_.minDistance,_.maxDistance)),d.position.copy(_.target).add(R),_.update(),At()},setPaused(v){if(ze=v,ze)for(const R of x.values())R.pose==="meeting"&&(R.group.position.copy(R.home),R.group.rotation.y=R.facing,R.waypoints=[]);Oe!==null&&cancelAnimationFrame(Oe),Oe=null,At()},setVisible(v){Ee=v,!v&&Oe!==null?(cancelAnimationFrame(Oe),Oe=null):v&&(Ze=0,Si(),At())},dispose(){St=!0,Oe!==null&&cancelAnimationFrame(Oe),Oe=null,be.disconnect(),Ce.disconnect(),_.dispose(),Be.dispose(),S.dispose();for(const v of O.values())clearTimeout(v);O.clear(),ye.clear(),g.domElement.removeEventListener("pointerdown",$),g.domElement.removeEventListener("pointerup",Te),g.domElement.removeEventListener("webglcontextlost",Ge),de.dispose(),I.dispose(),yt.dispose();for(const v of b)v.dispose();for(const v of M.values())v.dispose();for(const v of w)v.dispose();x.forEach(v=>v.label.remove()),x.clear(),m.clear(),g.dispose(),g.forceContextLoss(),g.domElement.remove()}}}export{c0 as createOfficeScene};
