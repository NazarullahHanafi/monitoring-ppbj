import{w as xc,g as ni,p as vc,a as Mc,s as Sc,c as yc,i as Ec}from"./virtual-office-0SHSnMKf.js";const Ua="187",Li={ROTATE:0,DOLLY:1,PAN:2},Pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bc=0,so=1,Tc=2,Xs=1,Ac=2,ns=3,ci=0,Qt=1,qt=2,Di=0,ss=1,Qs=2,ro=3,ao=4,wc=5,Ci=100,Rc=101,Cc=102,Pc=103,Lc=104,Dc=200,Ic=201,Nc=202,Uc=203,vl=204,Ml=205,Fc=206,Oc=207,Bc=208,zc=209,Gc=210,Hc=211,kc=212,Vc=213,Wc=214,Wr=0,Xr=1,qr=2,os=3,Yr=4,Kr=5,Zr=6,$r=7,Sl=0,Xc=1,qc=2,On=0,yl=1,El=2,bl=3,Fa=4,Tl=5,Al=6,wl=7,Rl=300,Ni=301,ls=302,mr=303,gr=304,Jr=1e3,Fn=1001,Qr=1002,Bt=1003,Yc=1004,_s=1005,Jt=1006,_r=1007,Yn=1008,tn=1009,Cl=1010,Pl=1011,cs=1012,Oa=1013,Tn=1014,gn=1015,An=1016,Ba=1017,za=1018,Ui=1020,Ll=35902,Dl=35899,Il=1021,Nl=1022,En=1023,$n=1026,Kn=1027,Ga=1028,Ha=1029,ui=1030,ka=1031,Va=1033,qs=33776,Ys=33777,Ks=33778,Zs=33779,jr=35840,ea=35841,ta=35842,na=35843,ia=36196,sa=37492,ra=37496,aa=37488,oa=37489,js=37490,la=37491,ca=37808,ua=37809,ha=37810,da=37811,fa=37812,pa=37813,ma=37814,ga=37815,_a=37816,xa=37817,va=37818,Ma=37819,Sa=37820,ya=37821,Ea=36492,ba=36494,Ta=36495,Aa=36283,wa=36284,er=36285,Ra=36286,Kc=3200,Ca=0,Zc=1,qn="",$t="srgb",tr="srgb-linear",nr="linear",Mt="srgb",xr=7680,$c=519,Jc=512,Qc=513,jc=514,Ul=515,eu=516,tu=517,Fl=518,Ol=519,nu=35044,iu=35048,oo="300 es",_n=2e3,us=2001;function su(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ru(){const i=ir("canvas");return i.style.display="block",i}const lo={};function co(...i){const e="THREE."+i.shift();console.log(e,...i)}function Bl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xe(...i){i=Bl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function pt(...i){i=Bl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function $s(...i){const e=i.join(" ");e in lo||(lo[e]=!0,Xe(...i))}function au(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ou={[Wr]:Wr,[qr]:Zr,[Yr]:Yr,[os]:Kr,[Xr]:Xr,[Zr]:qr,[$r]:$r,[Kr]:os};class Qn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let uo=1234567;const rs=Math.PI/180,hs=180/Math.PI;function Bi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function Wa(i,e){return(i%e+e)%e}function lu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function cu(i,e,t){return i!==e?(t-i)/(e-i):0}function as(i,e,t){return(1-t)*i+t*e}function uu(i,e,t,n){return as(i,e,1-Math.exp(-t*n))}function hu(i,e=1){return e-Math.abs(Wa(i,e*2)-e)}function du(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function fu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function pu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function mu(i,e){return i+Math.random()*(e-i)}function gu(i){return i*(.5-Math.random())}function _u(i){i!==void 0&&(uo=i);let e=uo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xu(i){return i*rs}function vu(i){return i*hs}function Mu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Su(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function zl(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yu(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),f=a((e+n)/2),g=r((e-n)/2),p=a((e-n)/2),m=r((n-e)/2),M=a((n-e)/2);switch(s){case"XYX":i.set(o*f,c*g,c*p,o*l);break;case"YZY":i.set(c*p,o*f,c*g,o*l);break;case"ZXZ":i.set(c*g,c*p,o*f,o*l);break;case"XZX":i.set(o*f,c*M,c*m,o*l);break;case"YXY":i.set(c*m,o*f,c*M,o*l);break;case"ZYZ":i.set(c*M,c*m,o*f,o*l);break;default:Xe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xa(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Gl(i,e){if(e.constructor===Float32Array)return i;const t=Xa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Hl(i,e){if(e.constructor===Float32Array)return i;const t=Xa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Pa={DEG2RAD:rs,RAD2DEG:hs,generateUUID:Bi,clamp:st,euclideanModulo:Wa,mapLinear:lu,inverseLerp:cu,lerp:as,damp:uu,pingpong:hu,smoothstep:du,smootherstep:fu,randInt:pu,randFloat:mu,randFloatSpread:gu,seededRandom:_u,degToRad:xu,radToDeg:vu,isPowerOfTwo:Mu,ceilPowerOfTwo:Su,floorPowerOfTwo:zl,setQuaternionFromProperEuler:yu,normalize:Hl,denormalize:Gl},eo=class eo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};eo.prototype.isVector2=!0;let ke=eo;class on{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],f=n[s+2],g=n[s+3],p=r[a+0],m=r[a+1],M=r[a+2],T=r[a+3];if(g!==T||c!==p||l!==m||f!==M){let h=c*p+l*m+f*M+g*T;h<0&&(p=-p,m=-m,M=-M,T=-T,h=-h);let u=1-o;if(h<.9995){const v=Math.acos(h),w=Math.sin(v);u=Math.sin(u*v)/w,o=Math.sin(o*v)/w,c=c*u+p*o,l=l*u+m*o,f=f*u+M*o,g=g*u+T*o}else{c=c*u+p*o,l=l*u+m*o,f=f*u+M*o,g=g*u+T*o;const v=1/Math.sqrt(c*c+l*l+f*f+g*g);c*=v,l*=v,f*=v,g*=v}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=g}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],f=n[s+3],g=r[a],p=r[a+1],m=r[a+2],M=r[a+3];return e[t]=o*M+f*g+c*m-l*p,e[t+1]=c*M+f*p+l*g-o*m,e[t+2]=l*M+f*m+o*p-c*g,e[t+3]=f*M-o*g-c*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),f=o(s/2),g=o(r/2),p=c(n/2),m=c(s/2),M=c(r/2);switch(a){case"XYZ":this._x=p*f*g+l*m*M,this._y=l*m*g-p*f*M,this._z=l*f*M+p*m*g,this._w=l*f*g-p*m*M;break;case"YXZ":this._x=p*f*g+l*m*M,this._y=l*m*g-p*f*M,this._z=l*f*M-p*m*g,this._w=l*f*g+p*m*M;break;case"ZXY":this._x=p*f*g-l*m*M,this._y=l*m*g+p*f*M,this._z=l*f*M+p*m*g,this._w=l*f*g-p*m*M;break;case"ZYX":this._x=p*f*g-l*m*M,this._y=l*m*g+p*f*M,this._z=l*f*M-p*m*g,this._w=l*f*g+p*m*M;break;case"YZX":this._x=p*f*g+l*m*M,this._y=l*m*g+p*f*M,this._z=l*f*M-p*m*g,this._w=l*f*g-p*m*M;break;case"XZY":this._x=p*f*g-l*m*M,this._y=l*m*g-p*f*M,this._z=l*f*M+p*m*g,this._w=l*f*g+p*m*M;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],f=t[6],g=t[10],p=n+o+g;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(f-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>g){const m=2*Math.sqrt(1+n-o-g);this._w=(f-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>g){const m=2*Math.sqrt(1+o-n-g);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+f)/m}else{const m=2*Math.sqrt(1+g-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,f=t._w;return this._x=n*f+a*o+s*l-r*c,this._y=s*f+a*c+r*o-n*l,this._z=r*f+a*l+n*c-s*o,this._w=a*f-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),f=Math.sin(l);c=Math.sin(c*l)/f,t=Math.sin(t*l)/f,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const to=class to{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ho.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ho.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),f=2*(o*t-r*s),g=2*(r*n-a*t);return this.x=t+c*l+a*g-o*f,this.y=n+c*f+o*l-r*g,this.z=s+c*g+r*f-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vr.copy(this).projectOnVector(e),this.sub(vr)}reflect(e){return this.sub(vr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};to.prototype.isVector3=!0;let H=to;const vr=new H,ho=new on,no=class no{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const f=this.elements;return f[0]=e,f[1]=s,f[2]=o,f[3]=t,f[4]=r,f[5]=c,f[6]=n,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],f=n[4],g=n[7],p=n[2],m=n[5],M=n[8],T=s[0],h=s[3],u=s[6],v=s[1],w=s[4],A=s[7],y=s[2],S=s[5],_=s[8];return r[0]=a*T+o*v+c*y,r[3]=a*h+o*w+c*S,r[6]=a*u+o*A+c*_,r[1]=l*T+f*v+g*y,r[4]=l*h+f*w+g*S,r[7]=l*u+f*A+g*_,r[2]=p*T+m*v+M*y,r[5]=p*h+m*w+M*S,r[8]=p*u+m*A+M*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*o*l-n*r*f+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],g=f*a-o*l,p=o*c-f*r,m=l*r-a*c,M=t*g+n*p+s*m;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=g*T,e[1]=(s*l-f*n)*T,e[2]=(o*n-s*a)*T,e[3]=p*T,e[4]=(f*t-s*c)*T,e[5]=(s*r-o*t)*T,e[6]=m*T,e[7]=(n*c-l*t)*T,e[8]=(a*t-n*r)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return $s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mr.makeScale(e,t)),this}rotate(e){return $s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mr.makeRotation(-e)),this}translate(e,t){return $s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};no.prototype.isMatrix3=!0;let Ke=no;const Mr=new Ke,fo=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),po=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eu(){const i={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Mt&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Mt&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qn?nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[tr]:{primaries:e,whitePoint:n,transfer:nr,toXYZ:fo,fromXYZ:po,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:Mt,toXYZ:fo,fromXYZ:po,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}const ct=Eu();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ii(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class bu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gi===void 0&&(gi=ir("canvas")),gi.width=e.width,gi.height=e.height;const s=gi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ir("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bn(t[n]/255)*255):t[n]=Bn(t[n]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tu=0;class qa{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sr(s[a].image)):r.push(Sr(s[a]))}else r=Sr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Sr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}let Au=0;const yr=new H;class kt extends Qn{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Fn,s=Fn,r=Jt,a=Yn,o=En,c=tn,l=kt.DEFAULT_ANISOTROPY,f=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=Bi(),this.name="",this.source=new qa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(yr).x}get height(){return this.source.getSize(yr).y}get depth(){return this.source.getSize(yr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jr:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case Qr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jr:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case Qr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Rl;kt.DEFAULT_ANISOTROPY=1;const io=class io{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],f=c[4],g=c[8],p=c[1],m=c[5],M=c[9],T=c[2],h=c[6],u=c[10];if(Math.abs(f-p)<.01&&Math.abs(g-T)<.01&&Math.abs(M-h)<.01){if(Math.abs(f+p)<.1&&Math.abs(g+T)<.1&&Math.abs(M+h)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,A=(m+1)/2,y=(u+1)/2,S=(f+p)/4,_=(g+T)/4,x=(M+h)/4;return w>A&&w>y?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=_/n):A>y?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=S/s,r=x/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=_/r,s=x/r),this.set(n,s,r,t),this}let v=Math.sqrt((h-M)*(h-M)+(g-T)*(g-T)+(p-f)*(p-f));return Math.abs(v)<.001&&(v=1),this.x=(h-M)/v,this.y=(g-T)/v,this.z=(p-f)/v,this.w=Math.acos((l+m+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};io.prototype.isVector4=!0;let Rt=io;class wu extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new kt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new qa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends wu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kl extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ru extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ur=class ur{constructor(e,t,n,s,r,a,o,c,l,f,g,p,m,M,T,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,f,g,p,m,M,T,h)}set(e,t,n,s,r,a,o,c,l,f,g,p,m,M,T,h){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=f,u[10]=g,u[14]=p,u[3]=m,u[7]=M,u[11]=T,u[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ur().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/_i.setFromMatrixColumn(e,0).length(),r=1/_i.setFromMatrixColumn(e,1).length(),a=1/_i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),f=Math.cos(r),g=Math.sin(r);if(e.order==="XYZ"){const p=a*f,m=a*g,M=o*f,T=o*g;t[0]=c*f,t[4]=-c*g,t[8]=l,t[1]=m+M*l,t[5]=p-T*l,t[9]=-o*c,t[2]=T-p*l,t[6]=M+m*l,t[10]=a*c}else if(e.order==="YXZ"){const p=c*f,m=c*g,M=l*f,T=l*g;t[0]=p+T*o,t[4]=M*o-m,t[8]=a*l,t[1]=a*g,t[5]=a*f,t[9]=-o,t[2]=m*o-M,t[6]=T+p*o,t[10]=a*c}else if(e.order==="ZXY"){const p=c*f,m=c*g,M=l*f,T=l*g;t[0]=p-T*o,t[4]=-a*g,t[8]=M+m*o,t[1]=m+M*o,t[5]=a*f,t[9]=T-p*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const p=a*f,m=a*g,M=o*f,T=o*g;t[0]=c*f,t[4]=M*l-m,t[8]=p*l+T,t[1]=c*g,t[5]=T*l+p,t[9]=m*l-M,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const p=a*c,m=a*l,M=o*c,T=o*l;t[0]=c*f,t[4]=T-p*g,t[8]=M*g+m,t[1]=g,t[5]=a*f,t[9]=-o*f,t[2]=-l*f,t[6]=m*g+M,t[10]=p-T*g}else if(e.order==="XZY"){const p=a*c,m=a*l,M=o*c,T=o*l;t[0]=c*f,t[4]=-g,t[8]=l*f,t[1]=p*g+T,t[5]=a*f,t[9]=m*g-M,t[2]=M*g-m,t[6]=o*f,t[10]=T*g+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cu,e,Pu)}lookAt(e,t,n){const s=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),Hn.crossVectors(n,jt),Hn.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),Hn.crossVectors(n,jt)),Hn.normalize(),xs.crossVectors(jt,Hn),s[0]=Hn.x,s[4]=xs.x,s[8]=jt.x,s[1]=Hn.y,s[5]=xs.y,s[9]=jt.y,s[2]=Hn.z,s[6]=xs.z,s[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],f=n[1],g=n[5],p=n[9],m=n[13],M=n[2],T=n[6],h=n[10],u=n[14],v=n[3],w=n[7],A=n[11],y=n[15],S=s[0],_=s[4],x=s[8],D=s[12],P=s[1],C=s[5],N=s[9],X=s[13],U=s[2],W=s[6],$=s[10],Y=s[14],ne=s[3],Z=s[7],ie=s[11],oe=s[15];return r[0]=a*S+o*P+c*U+l*ne,r[4]=a*_+o*C+c*W+l*Z,r[8]=a*x+o*N+c*$+l*ie,r[12]=a*D+o*X+c*Y+l*oe,r[1]=f*S+g*P+p*U+m*ne,r[5]=f*_+g*C+p*W+m*Z,r[9]=f*x+g*N+p*$+m*ie,r[13]=f*D+g*X+p*Y+m*oe,r[2]=M*S+T*P+h*U+u*ne,r[6]=M*_+T*C+h*W+u*Z,r[10]=M*x+T*N+h*$+u*ie,r[14]=M*D+T*X+h*Y+u*oe,r[3]=v*S+w*P+A*U+y*ne,r[7]=v*_+w*C+A*W+y*Z,r[11]=v*x+w*N+A*$+y*ie,r[15]=v*D+w*X+A*Y+y*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],f=e[2],g=e[6],p=e[10],m=e[14],M=e[3],T=e[7],h=e[11],u=e[15],v=c*m-l*p,w=o*m-l*g,A=o*p-c*g,y=a*m-l*f,S=a*p-c*f,_=a*g-o*f;return t*(T*v-h*w+u*A)-n*(M*v-h*y+u*S)+s*(M*w-T*y+u*_)-r*(M*A-T*S+h*_)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],f=e[10];return t*(a*f-o*l)-n*(r*f-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],f=e[8],g=e[9],p=e[10],m=e[11],M=e[12],T=e[13],h=e[14],u=e[15],v=t*o-n*a,w=t*c-s*a,A=t*l-r*a,y=n*c-s*o,S=n*l-r*o,_=s*l-r*c,x=f*T-g*M,D=f*h-p*M,P=f*u-m*M,C=g*h-p*T,N=g*u-m*T,X=p*u-m*h,U=v*X-w*N+A*C+y*P-S*D+_*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/U;return e[0]=(o*X-c*N+l*C)*W,e[1]=(s*N-n*X-r*C)*W,e[2]=(T*_-h*S+u*y)*W,e[3]=(p*S-g*_-m*y)*W,e[4]=(c*P-a*X-l*D)*W,e[5]=(t*X-s*P+r*D)*W,e[6]=(h*A-M*_-u*w)*W,e[7]=(f*_-p*A+m*w)*W,e[8]=(a*N-o*P+l*x)*W,e[9]=(n*P-t*N-r*x)*W,e[10]=(M*S-T*A+u*v)*W,e[11]=(g*A-f*S-m*v)*W,e[12]=(o*D-a*C-c*x)*W,e[13]=(t*C-n*D+s*x)*W,e[14]=(T*w-M*y-h*v)*W,e[15]=(f*y-g*w+p*v)*W,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,f=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,f*o+n,f*c-s*a,0,l*c-s*o,f*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,f=a+a,g=o+o,p=r*l,m=r*f,M=r*g,T=a*f,h=a*g,u=o*g,v=c*l,w=c*f,A=c*g,y=n.x,S=n.y,_=n.z;return s[0]=(1-(T+u))*y,s[1]=(m+A)*y,s[2]=(M-w)*y,s[3]=0,s[4]=(m-A)*S,s[5]=(1-(p+u))*S,s[6]=(h+v)*S,s[7]=0,s[8]=(M+w)*_,s[9]=(h-v)*_,s[10]=(1-(p+T))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=_i.set(s[0],s[1],s[2]).length();const o=_i.set(s[4],s[5],s[6]).length(),c=_i.set(s[8],s[9],s[10]).length();r<0&&(a=-a),un.copy(this);const l=1/a,f=1/o,g=1/c;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=f,un.elements[5]*=f,un.elements[6]*=f,un.elements[8]*=g,un.elements[9]*=g,un.elements[10]*=g,t.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=_n,c=!1){const l=this.elements,f=2*r/(t-e),g=2*r/(n-s),p=(t+e)/(t-e),m=(n+s)/(n-s);let M,T;if(c)M=r/(a-r),T=a*r/(a-r);else if(o===_n)M=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===us)M=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=g,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=_n,c=!1){const l=this.elements,f=2/(t-e),g=2/(n-s),p=-(t+e)/(t-e),m=-(n+s)/(n-s);let M,T;if(c)M=1/(a-r),T=a/(a-r);else if(o===_n)M=-2/(a-r),T=-(a+r)/(a-r);else if(o===us)M=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=f,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=g,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=M,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ur.prototype.isMatrix4=!0;let dt=ur;const _i=new H,un=new dt,Cu=new H(0,0,0),Pu=new H(1,1,1),Hn=new H,xs=new H,jt=new H,mo=new dt,go=new on;class wn{constructor(e=0,t=0,n=0,s=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],f=s[9],g=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-g,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-f,m),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return go.setFromEuler(this),this.setFromQuaternion(go,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Ya{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Lu=0;const _o=new H,xi=new on,Cn=new dt,vs=new H,Yi=new H,Du=new H,Iu=new on,xo=new H(1,0,0),vo=new H(0,1,0),Mo=new H(0,0,1),So={type:"added"},Nu={type:"removed"},vi={type:"childadded",child:null},Er={type:"childremoved",child:null};class It extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new H,t=new wn,n=new on,s=new H(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ke}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ya,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(xo,e)}rotateY(e){return this.rotateOnAxis(vo,e)}rotateZ(e){return this.rotateOnAxis(Mo,e)}translateOnAxis(e,t){return _o.copy(e).applyQuaternion(this.quaternion),this.position.add(_o.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xo,e)}translateY(e){return this.translateOnAxis(vo,e)}translateZ(e){return this.translateOnAxis(Mo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?vs.copy(e):vs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(Yi,vs,this.up):Cn.lookAt(vs,Yi,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(Cn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(So),vi.child=e,this.dispatchEvent(vi),vi.child=null):pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nu),Er.child=e,this.dispatchEvent(Er),Er.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(So),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,Du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,Iu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const g=c[l];r(e.shapes,g)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),g=a(e.shapes),p=a(e.skeletons),m=a(e.animations),M=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),g.length>0&&(n.shapes=g),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),M.length>0&&(n.nodes=M)}return n.object=s,n;function a(o){const c=[];for(const l in o){const f=o[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}It.DEFAULT_UP=new H(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fn extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uu={type:"move"};class br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const T of e.hand.values()){const h=t.getJointPose(T,n),u=this._getHandJoint(l,T);h!==null&&(u.matrix.fromArray(h.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=h.radius),u.visible=h!==null}const f=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],p=f.position.distanceTo(g.position),m=.02,M=.005;l.inputState.pinching&&p>m+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Uu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Tr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ct.workingColorSpace){if(e=Wa(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Tr(a,r,e+1/3),this.g=Tr(a,r,e),this.b=Tr(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=Vl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bn(e.r),this.g=Bn(e.g),this.b=Bn(e.b),this}copyLinearToSRGB(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return ct.workingToColorSpace(Ht.copy(this),e),Math.round(st(Ht.r*255,0,255))*65536+Math.round(st(Ht.g*255,0,255))*256+Math.round(st(Ht.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(Ht.copy(this),t);const n=Ht.r,s=Ht.g,r=Ht.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const f=(o+a)/2;if(o===a)c=0,l=0;else{const g=a-o;switch(l=f<=.5?g/(a+o):g/(2-a-o),a){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return e.h=c,e.s=l,e.l=f,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=$t){ct.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,s=Ht.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(Ms);const n=as(kn.h,Ms.h,t),s=as(kn.s,Ms.s,t),r=as(kn.l,Ms.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new nt;nt.NAMES=Vl;class Ka{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new nt(e),this.density=t}clone(){return new Ka(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Fu extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const hn=new H,Pn=new H,Ar=new H,Ln=new H,Mi=new H,Si=new H,yo=new H,wr=new H,Rr=new H,Cr=new H,Pr=new Rt,Lr=new Rt,Dr=new Rt;class mn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),hn.subVectors(e,t),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){hn.subVectors(s,t),Pn.subVectors(n,t),Ar.subVectors(e,t);const a=hn.dot(hn),o=hn.dot(Pn),c=hn.dot(Ar),l=Pn.dot(Pn),f=Pn.dot(Ar),g=a*l-o*o;if(g===0)return r.set(0,0,0),null;const p=1/g,m=(l*c-o*f)*p,M=(a*f-o*c)*p;return r.set(1-m-M,M,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ln.x),c.addScaledVector(a,Ln.y),c.addScaledVector(o,Ln.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Pr.setScalar(0),Lr.setScalar(0),Dr.setScalar(0),Pr.fromBufferAttribute(e,t),Lr.fromBufferAttribute(e,n),Dr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Pr,r.x),a.addScaledVector(Lr,r.y),a.addScaledVector(Dr,r.z),a}static isFrontFacing(e,t,n,s){return hn.subVectors(n,t),Pn.subVectors(e,t),hn.cross(Pn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),hn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Mi.subVectors(s,n),Si.subVectors(r,n),wr.subVectors(e,n);const c=Mi.dot(wr),l=Si.dot(wr);if(c<=0&&l<=0)return t.copy(n);Rr.subVectors(e,s);const f=Mi.dot(Rr),g=Si.dot(Rr);if(f>=0&&g<=f)return t.copy(s);const p=c*g-f*l;if(p<=0&&c>=0&&f<=0&&c-f>0)return a=c/(c-f),t.copy(n).addScaledVector(Mi,a);Cr.subVectors(e,r);const m=Mi.dot(Cr),M=Si.dot(Cr);if(M>=0&&m<=M)return t.copy(r);const T=m*l-c*M;if(T<=0&&l>=0&&M<=0)return o=l/(l-M),t.copy(n).addScaledVector(Si,o);const h=f*M-m*g;if(h<=0&&g-f>=0&&m-M>=0)return yo.subVectors(r,s),o=(g-f)/(g-f+(m-M)),t.copy(s).addScaledVector(yo,o);const u=1/(h+T+p);return a=T*u,o=p*u,t.copy(n).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class di{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ss.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ss.copy(n.boundingBox)),Ss.applyMatrix4(e.matrixWorld),this.union(Ss)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ki),ys.subVectors(this.max,Ki),yi.subVectors(e.a,Ki),Ei.subVectors(e.b,Ki),bi.subVectors(e.c,Ki),Vn.subVectors(Ei,yi),Wn.subVectors(bi,Ei),ii.subVectors(yi,bi);let t=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ii.z,ii.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ii.z,0,-ii.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ii.y,ii.x,0];return!Ir(t,yi,Ei,bi,ys)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,yi,Ei,bi,ys))?!1:(Es.crossVectors(Vn,Wn),t=[Es.x,Es.y,Es.z],Ir(t,yi,Ei,bi,ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Dn=[new H,new H,new H,new H,new H,new H,new H,new H],dn=new H,Ss=new di,yi=new H,Ei=new H,bi=new H,Vn=new H,Wn=new H,ii=new H,Ki=new H,ys=new H,Es=new H,si=new H;function Ir(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){si.fromArray(i,r);const o=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),c=e.dot(si),l=t.dot(si),f=n.dot(si);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>o)return!1}return!0}const Pt=new H,bs=new ke;let Ou=0;class nn extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ou++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nu,this.updateRanges=[],this.gpuType=gn,this.version=0,this._normalizationScale=e!==void 0?Xa(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bs.fromBufferAttribute(this,t),bs.applyMatrix3(e),this.setXY(t,bs.x,bs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Gl(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Hl(e,this.array)}}class Wl extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Xl extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bt extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Bu=new di,Zi=new H,Nr=new H;class fi{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zi.subVectors(e,this.center);const t=Zi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Zi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zi.copy(e.center).add(Nr)),this.expandByPoint(Zi.copy(e.center).sub(Nr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let zu=0;const rn=new dt,Ur=new It,Ti=new H,en=new di,$i=new di,Ot=new H;class zt extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(su(e)?Xl:Wl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return Ur.lookAt(e),Ur.updateMatrix(),this.applyMatrix4(Ur.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(en.min,$i.min),en.expandByPoint(Ot),Ot.addVectors(en.max,$i.max),en.expandByPoint(Ot)):(en.expandByPoint($i.min),en.expandByPoint($i.max))}en.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,f=o.count;l<f;l++)Ot.fromBufferAttribute(o,l),c&&(Ti.fromBufferAttribute(e,l),Ot.add(Ti)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let D=0;D<n.count;D++)o[D]=new H,c[D]=new H;const f=new H,g=new H,p=new H,m=new ke,M=new ke,T=new ke,h=new H,u=new H;function v(D,P,C){l[D]=l[P]=l[C]=1,f.fromBufferAttribute(n,D),g.fromBufferAttribute(n,P),p.fromBufferAttribute(n,C),m.fromBufferAttribute(r,D),M.fromBufferAttribute(r,P),T.fromBufferAttribute(r,C),g.sub(f),p.sub(f),M.sub(m),T.sub(m);const N=1/(M.x*T.y-T.x*M.y);isFinite(N)&&(h.copy(g).multiplyScalar(T.y).addScaledVector(p,-M.y).multiplyScalar(N),u.copy(p).multiplyScalar(M.x).addScaledVector(g,-T.x).multiplyScalar(N),o[D].add(h),o[P].add(h),o[C].add(h),c[D].add(u),c[P].add(u),c[C].add(u))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let D=0,P=w.length;D<P;++D){const C=w[D],N=C.start,X=C.count;for(let U=N,W=N+X;U<W;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const A=new H,y=new H,S=new H,_=new H;function x(D){S.fromBufferAttribute(s,D),_.copy(S);const P=o[D];A.copy(P),A.sub(S.multiplyScalar(S.dot(P))).normalize(),y.crossVectors(_,P);const N=y.dot(c[D])<0?-1:1;a.setXYZW(D,A.x,A.y,A.z,N)}for(let D=0,P=n.count;D<P;++D)l[D]&&x(D);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new H,r=new H,a=new H,o=new H,c=new H,l=new H,f=new H,g=new H;if(e)for(let p=0,m=e.count;p<m;p+=3){const M=e.getX(p+0),T=e.getX(p+1),h=e.getX(p+2);s.fromBufferAttribute(t,M),r.fromBufferAttribute(t,T),a.fromBufferAttribute(t,h),f.subVectors(a,r),g.subVectors(s,r),f.cross(g),o.fromBufferAttribute(n,M),c.fromBufferAttribute(n,T),l.fromBufferAttribute(n,h),o.add(f),c.add(f),l.add(f),n.setXYZ(M,o.x,o.y,o.z),n.setXYZ(T,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),f.subVectors(a,r),g.subVectors(s,r),f.cross(g),n.setXYZ(p+0,f.x,f.y,f.z),n.setXYZ(p+1,f.x,f.y,f.z),n.setXYZ(p+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){const l=o.array,f=o.itemSize,g=o.normalized,p=new l.constructor(c.length*f);let m=0,M=0;for(let T=0,h=c.length;T<h;T++){o.isInterleavedBufferAttribute?m=c[T]*o.data.stride+o.offset:m=c[T]*f;for(let u=0;u<f;u++)p[M++]=l[m++]}return new nn(p,f,g)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let f=0,g=l.length;f<g;f++){const p=l[f],m=e(p,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let g=0,p=l.length;g<p;g++){const m=l[g];f.push(m.toJSON(e.data))}f.length>0&&(s[c]=f,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const f=s[l];this.setAttribute(l,f.clone(t))}const r=e.morphAttributes;for(const l in r){const f=[],g=r[l];for(let p=0,m=g.length;p<m;p++)f.push(g[p].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,f=a.length;l<f;l++){const g=a[l];this.addGroup(g.start,g.count,g.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fr=new H,Gu=new H,Hu=new Ke;class Nn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Fr.subVectors(n,t).cross(Gu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Fr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Hu.getNormalMatrix(e),s=this.coplanarPoint(Fr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ku=0;class pi extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=ss,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vl,this.blendDst=Ml,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xr,this.stencilZFail=xr,this.stencilZPass=xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Nn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const In=new H,Or=new H,Ts=new H,As=new H;class fs{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Or.copy(e).add(t).multiplyScalar(.5),Ts.copy(t).sub(e).normalize(),As.copy(this.origin).sub(Or);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ts),o=As.dot(this.direction),c=-As.dot(Ts),l=As.lengthSq(),f=Math.abs(1-a*a);let g,p,m,M;if(f>0)if(g=a*c-o,p=a*o-c,M=r*f,g>=0)if(p>=-M)if(p<=M){const T=1/f;g*=T,p*=T,m=g*(g+a*p+2*o)+p*(a*g+p+2*c)+l}else p=r,g=Math.max(0,-(a*p+o)),m=-g*g+p*(p+2*c)+l;else p=-r,g=Math.max(0,-(a*p+o)),m=-g*g+p*(p+2*c)+l;else p<=-M?(g=Math.max(0,-(-a*r+o)),p=g>0?-r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l):p<=M?(g=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(g=Math.max(0,-(a*r+o)),p=g>0?r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l);else p=a>0?-r:r,g=Math.max(0,-(a*p+o)),m=-g*g+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Or).addScaledVector(Ts,p),m}intersectSphere(e,t){if(e.radius<0)return null;In.subVectors(e.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,f=1/this.direction.y,g=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),f>=0?(r=(e.min.y-p.y)*f,a=(e.max.y-p.y)*f):(r=(e.max.y-p.y)*f,a=(e.min.y-p.y)*f),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),g>=0?(o=(e.min.z-p.z)*g,c=(e.max.z-p.z)*g):(o=(e.max.z-p.z)*g,c=(e.min.z-p.z)*g),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,f=o.z,g=e.x-a.x,p=e.y-a.y,m=e.z-a.z,M=t.x-a.x,T=t.y-a.y,h=t.z-a.z,u=n.x-a.x,v=n.y-a.y,w=n.z-a.z,A=Math.abs(c),y=Math.abs(l),S=Math.abs(f);let _,x,D,P,C,N,X,U,W,$,Y,ne;if(A>=y&&A>=S?(D=c,N=g,W=M,ne=u,c>=0?(_=l,x=f,P=p,C=m,X=T,U=h,$=v,Y=w):(_=f,x=l,P=m,C=p,X=h,U=T,$=w,Y=v)):y>=S?(D=l,N=p,W=T,ne=v,l>=0?(_=f,x=c,P=m,C=g,X=h,U=M,$=w,Y=u):(_=c,x=f,P=g,C=m,X=M,U=h,$=u,Y=w)):(D=f,N=m,W=h,ne=w,f>=0?(_=c,x=l,P=g,C=p,X=M,U=T,$=u,Y=v):(_=l,x=c,P=p,C=g,X=T,U=M,$=v,Y=u)),D===0)return null;const Z=_/D,ie=x/D,oe=1/D,me=P-Z*N,Fe=C-ie*N,te=X-Z*W,Me=U-ie*W,Te=$-Z*ne,Re=Y-ie*ne,ye=Te*Me-Re*te,Ve=me*Re-Fe*Te,St=te*Fe-Me*me;if(s){if(ye<0||Ve<0||St<0)return null}else if((ye<0||Ve<0||St<0)&&(ye>0||Ve>0||St>0))return null;const Pe=ye+Ve+St;if(Pe===0)return null;const at=oe*(ye*N+Ve*W+St*ne);return(Pe>0?at<0:at>0)?null:this.at(at/Pe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Un extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Sl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Eo=new dt,ri=new fs,ws=new fi,bo=new H,Rs=new H,Cs=new H,Ps=new H,Br=new H,Ls=new H,To=new H,Ds=new H;class gt extends It{constructor(e=new zt,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ls.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const f=o[c],g=r[c];f!==0&&(Br.fromBufferAttribute(g,e),a?Ls.addScaledVector(Br,f):Ls.addScaledVector(Br.sub(t),f))}t.add(Ls)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(r),ri.copy(e.ray).recast(e.near),!(ws.containsPoint(ri.origin)===!1&&(ri.intersectSphere(ws,bo)===null||ri.origin.distanceToSquared(bo)>(e.far-e.near)**2))&&(Eo.copy(r).invert(),ri.copy(e.ray).applyMatrix4(Eo),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,f=r.attributes.uv1,g=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,T=p.length;M<T;M++){const h=p[M],u=a[h.materialIndex],v=Math.max(h.start,m.start),w=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let A=v,y=w;A<y;A+=3){const S=o.getX(A),_=o.getX(A+1),x=o.getX(A+2);s=Is(this,u,e,n,l,f,g,S,_,x),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const M=Math.max(0,m.start),T=Math.min(o.count,m.start+m.count);for(let h=M,u=T;h<u;h+=3){const v=o.getX(h),w=o.getX(h+1),A=o.getX(h+2);s=Is(this,a,e,n,l,f,g,v,w,A),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let M=0,T=p.length;M<T;M++){const h=p[M],u=a[h.materialIndex],v=Math.max(h.start,m.start),w=Math.min(c.count,Math.min(h.start+h.count,m.start+m.count));for(let A=v,y=w;A<y;A+=3){const S=A,_=A+1,x=A+2;s=Is(this,u,e,n,l,f,g,S,_,x),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const M=Math.max(0,m.start),T=Math.min(c.count,m.start+m.count);for(let h=M,u=T;h<u;h+=3){const v=h,w=h+1,A=h+2;s=Is(this,a,e,n,l,f,g,v,w,A),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}}}function Vu(i,e,t,n,s,r,a,o){let c;if(e.side===Qt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ci,o),c===null)return null;Ds.copy(o),Ds.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ds);return l<t.near||l>t.far?null:{distance:l,point:Ds.clone(),object:i}}function Is(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Rs),i.getVertexPosition(c,Cs),i.getVertexPosition(l,Ps);const f=Vu(i,e,t,n,Rs,Cs,Ps,To);if(f){const g=new H;mn.getBarycoord(To,Rs,Cs,Ps,g),s&&(f.uv=mn.getInterpolatedAttribute(s,o,c,l,g,new ke)),r&&(f.uv1=mn.getInterpolatedAttribute(r,o,c,l,g,new ke)),a&&(f.normal=mn.getInterpolatedAttribute(a,o,c,l,g,new H),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new H,materialIndex:0};mn.getNormal(Rs,Cs,Ps,p.normal),f.face=p,f.barycoord=g}return f}class ql extends kt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Bt,f=Bt,g,p){super(null,a,o,c,l,f,s,r,g,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ao extends nn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new dt,wo=new dt,Ns=[],Ro=new di,Wu=new dt,Ji=new gt,Qi=new fi;class Xu extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ao(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Wu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Ro.copy(e.boundingBox).applyMatrix4(Ai),this.boundingBox.union(Ro)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ai),Qi.copy(e.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(Qi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qi.copy(this.boundingSphere),Qi.applyMatrix4(n),e.ray.intersectsSphere(Qi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ai),wo.multiplyMatrices(n,Ai),Ji.matrixWorld=wo,Ji.raycast(e,Ns);for(let a=0,o=Ns.length;a<o;a++){const c=Ns[a];c.instanceId=r,c.object=this,t.push(c)}Ns.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ao(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ql(new Float32Array(s*this.count),s,this.count,Ga,gn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ai=new fi,qu=new ke(.5,.5),Us=new H;class ds{constructor(e=new Nn,t=new Nn,n=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_n,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],f=r[4],g=r[5],p=r[6],m=r[7],M=r[8],T=r[9],h=r[10],u=r[11],v=r[12],w=r[13],A=r[14],y=r[15];if(s[0].setComponents(l-a,m-f,u-M,y-v).normalize(),s[1].setComponents(l+a,m+f,u+M,y+v).normalize(),s[2].setComponents(l+o,m+g,u+T,y+w).normalize(),s[3].setComponents(l-o,m-g,u-T,y-w).normalize(),n)s[4].setComponents(c,p,h,A).normalize(),s[5].setComponents(l-c,m-p,u-h,y-A).normalize();else if(s[4].setComponents(l-c,m-p,u-h,y-A).normalize(),t===_n)s[5].setComponents(l+c,m+p,u+h,y+A).normalize();else if(t===us)s[5].setComponents(c,p,h,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){ai.center.set(0,0,0);const t=qu.distanceTo(e.center);return ai.radius=.7071067811865476+t,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Us.x=s.normal.x>0?e.max.x:e.min.x,Us.y=s.normal.y>0?e.max.y:e.min.y,Us.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Us)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Co=new dt;class Za{constructor(){this.coordinateSystem=_n,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Co.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ds),n[s].setFromProjectionMatrix(Co,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new ds),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new Za().copy(this)}}class Yl extends pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const sr=new H,rr=new H,Po=new dt,ji=new fs,Fs=new fi,zr=new H,Lo=new H;class Yu extends It{constructor(e=new zt,t=new Yl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)sr.fromBufferAttribute(t,s-1),rr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=sr.distanceTo(rr);e.setAttribute("lineDistance",new bt(n,1))}else Xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(s),Fs.radius+=r,e.ray.intersectsSphere(Fs)===!1)return;Po.copy(s).invert(),ji.copy(e.ray).applyMatrix4(Po);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,f=n.index,p=n.attributes.position;if(f!==null){const m=Math.max(0,a.start),M=Math.min(f.count,a.start+a.count);for(let T=m,h=M-1;T<h;T+=l){const u=f.getX(T),v=f.getX(T+1),w=Os(this,e,ji,c,u,v,T);w&&t.push(w)}if(this.isLineLoop){const T=f.getX(M-1),h=f.getX(m),u=Os(this,e,ji,c,T,h,M-1);u&&t.push(u)}}else{const m=Math.max(0,a.start),M=Math.min(p.count,a.start+a.count);for(let T=m,h=M-1;T<h;T+=l){const u=Os(this,e,ji,c,T,T+1,T);u&&t.push(u)}if(this.isLineLoop){const T=Os(this,e,ji,c,M-1,m,M-1);T&&t.push(T)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Os(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(sr.fromBufferAttribute(o,s),rr.fromBufferAttribute(o,r),t.distanceSqToSegment(sr,rr,zr,Lo)>n)return;zr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(zr);if(!(l<e.near||l>e.far))return{distance:l,point:Lo.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Do=new H,Io=new H;class Ku extends Yu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Do.fromBufferAttribute(t,s),Io.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Do.distanceTo(Io);e.setAttribute("lineDistance",new bt(n,1))}else Xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kl extends pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const No=new dt,La=new fs,Bs=new fi,zs=new H;class Zu extends It{constructor(e=new zt,t=new Kl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(s),Bs.radius+=r,e.ray.intersectsSphere(Bs)===!1)return;No.copy(s).invert(),La.copy(e.ray).applyMatrix4(No);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,g=n.attributes.position;if(l!==null){const p=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let M=p,T=m;M<T;M++){const h=l.getX(M);zs.fromBufferAttribute(g,h),Uo(zs,h,c,s,e,t,this)}}else{const p=Math.max(0,a.start),m=Math.min(g.count,a.start+a.count);for(let M=p,T=m;M<T;M++)zs.fromBufferAttribute(g,M),Uo(zs,M,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Uo(i,e,t,n,s,r,a){const o=La.distanceSqToPoint(i);if(o<t){const c=new H;La.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Zl extends kt{constructor(e=[],t=Ni,n,s,r,a,o,c,l,f){super(e,t,n,s,r,a,o,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fo extends kt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fi extends kt{constructor(e,t,n=Tn,s,r,a,o=Bt,c=Bt,l,f=$n,g=1){if(f!==$n&&f!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:g};super(p,s,r,a,o,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class $l extends Fi{constructor(e,t=Tn,n=Ni,s,r,a=Bt,o=Bt,c,l=$n){const f={width:e,height:e,depth:1},g=[f,f,f,f,f,f];super(e,e,t,n,s,r,a,o,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Jl extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Yt extends zt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],f=[],g=[];let p=0,m=0;M("z","y","x",-1,-1,n,t,e,a,r,0),M("z","y","x",1,-1,n,t,-e,a,r,1),M("x","z","y",1,1,e,n,t,s,a,2),M("x","z","y",1,-1,e,n,-t,s,a,3),M("x","y","z",1,-1,e,t,n,s,r,4),M("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(f,3)),this.setAttribute("uv",new bt(g,2));function M(T,h,u,v,w,A,y,S,_,x,D){const P=A/_,C=y/x,N=A/2,X=y/2,U=S/2,W=_+1,$=x+1;let Y=0,ne=0;const Z=new H;for(let ie=0;ie<$;ie++){const oe=ie*C-X;for(let me=0;me<W;me++){const Fe=me*P-N;Z[T]=Fe*v,Z[h]=oe*w,Z[u]=U,l.push(Z.x,Z.y,Z.z),Z[T]=0,Z[h]=0,Z[u]=S>0?1:-1,f.push(Z.x,Z.y,Z.z),g.push(me/_),g.push(1-ie/x),Y+=1}}for(let ie=0;ie<x;ie++)for(let oe=0;oe<_;oe++){const me=p+oe+W*ie,Fe=p+oe+W*(ie+1),te=p+(oe+1)+W*(ie+1),Me=p+(oe+1)+W*ie;c.push(me,Fe,Me),c.push(Fe,te,Me),ne+=6}o.addGroup(m,ne,D),m+=ne,p+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class xn extends zt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const f=[],g=[],p=[],m=[];let M=0;const T=[],h=n/2;let u=0;v(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(p,3)),this.setAttribute("uv",new bt(m,2));function v(){const A=new H,y=new H;let S=0;const _=(t-e)/n;for(let x=0;x<=r;x++){const D=[],P=x/r,C=P*(t-e)+e;for(let N=0;N<=s;N++){const X=N/s,U=X*c+o,W=Math.sin(U),$=Math.cos(U);y.x=C*W,y.y=-P*n+h,y.z=C*$,g.push(y.x,y.y,y.z),A.set(W,_,$).normalize(),p.push(A.x,A.y,A.z),m.push(X,1-P),D.push(M++)}T.push(D)}for(let x=0;x<s;x++)for(let D=0;D<r;D++){const P=T[D][x],C=T[D+1][x],N=T[D+1][x+1],X=T[D][x+1];(e>0||D!==0)&&(f.push(P,C,X),S+=3),(t>0||D!==r-1)&&(f.push(C,N,X),S+=3)}l.addGroup(u,S,0),u+=S}function w(A){const y=M,S=new ke,_=new H;let x=0;const D=A===!0?e:t,P=A===!0?1:-1;for(let N=1;N<=s;N++)g.push(0,h*P,0),p.push(0,P,0),m.push(.5,.5),M++;const C=M;for(let N=0;N<=s;N++){const U=N/s*c+o,W=Math.cos(U),$=Math.sin(U);_.x=D*$,_.y=h*P,_.z=D*W,g.push(_.x,_.y,_.z),p.push(0,P,0),S.x=W*.5+.5,S.y=$*.5*P+.5,m.push(S.x,S.y),M++}for(let N=0;N<s;N++){const X=y+N,U=C+N;A===!0?f.push(U,U+1,X):f.push(U+1,U,X),x+=3}l.addGroup(u,x,A===!0?1:2),u+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zn extends xn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new zn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $a extends zt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),f(),this.setAttribute("position",new bt(r,3)),this.setAttribute("normal",new bt(r.slice(),3)),this.setAttribute("uv",new bt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const w=new H,A=new H,y=new H;for(let S=0;S<t.length;S+=3)m(t[S+0],w),m(t[S+1],A),m(t[S+2],y),c(w,A,y,v)}function c(v,w,A,y){const S=y+1,_=[];for(let x=0;x<=S;x++){_[x]=[];const D=v.clone().lerp(A,x/S),P=w.clone().lerp(A,x/S),C=S-x;for(let N=0;N<=C;N++)N===0&&x===S?_[x][N]=D:_[x][N]=D.clone().lerp(P,N/C)}for(let x=0;x<S;x++)for(let D=0;D<2*(S-x)-1;D++){const P=Math.floor(D/2);D%2===0?(p(_[x][P+1]),p(_[x+1][P]),p(_[x][P])):(p(_[x][P+1]),p(_[x+1][P+1]),p(_[x+1][P]))}}function l(v){const w=new H;for(let A=0;A<r.length;A+=3)w.x=r[A+0],w.y=r[A+1],w.z=r[A+2],w.normalize().multiplyScalar(v),r[A+0]=w.x,r[A+1]=w.y,r[A+2]=w.z}function f(){const v=new H;for(let w=0;w<r.length;w+=3){v.x=r[w+0],v.y=r[w+1],v.z=r[w+2];const A=h(v)/2/Math.PI+.5,y=u(v)/Math.PI+.5;a.push(A,1-y)}M(),g()}function g(){for(let v=0;v<a.length;v+=6){const w=a[v+0],A=a[v+2],y=a[v+4],S=Math.max(w,A,y),_=Math.min(w,A,y);S>.9&&_<.1&&(w<.2&&(a[v+0]+=1),A<.2&&(a[v+2]+=1),y<.2&&(a[v+4]+=1))}}function p(v){r.push(v.x,v.y,v.z)}function m(v,w){const A=v*3;w.x=e[A+0],w.y=e[A+1],w.z=e[A+2]}function M(){const v=new H,w=new H,A=new H,y=new H,S=new ke,_=new ke,x=new ke;for(let D=0,P=0;D<r.length;D+=9,P+=6){v.set(r[D+0],r[D+1],r[D+2]),w.set(r[D+3],r[D+4],r[D+5]),A.set(r[D+6],r[D+7],r[D+8]),S.set(a[P+0],a[P+1]),_.set(a[P+2],a[P+3]),x.set(a[P+4],a[P+5]),y.copy(v).add(w).add(A).divideScalar(3);const C=h(y);T(S,P+0,v,C),T(_,P+2,w,C),T(x,P+4,A,C)}}function T(v,w,A,y){y<0&&v.x===1&&(a[w]=v.x-1),A.x===0&&A.z===0&&(a[w]=y/2/Math.PI+.5)}function h(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $a(e.vertices,e.indices,e.radius,e.detail)}}class Ja extends $a{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ja(e.radius,e.detail)}}class Jn extends zt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,f=c+1,g=e/o,p=t/c,m=[],M=[],T=[],h=[];for(let u=0;u<f;u++){const v=u*p-a;for(let w=0;w<l;w++){const A=w*g-r;M.push(A,-v,0),T.push(0,0,1),h.push(w/o),h.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<o;v++){const w=v+l*u,A=v+l*(u+1),y=v+1+l*(u+1),S=v+1+l*u;m.push(w,A,S),m.push(A,y,S)}this.setIndex(m),this.setAttribute("position",new bt(M,3)),this.setAttribute("normal",new bt(T,3)),this.setAttribute("uv",new bt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ar extends zt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],f=[];let g=e;const p=(t-e)/s,m=new H,M=new ke;for(let T=0;T<=s;T++){for(let h=0;h<=n;h++){const u=r+h/n*a;m.x=g*Math.cos(u),m.y=g*Math.sin(u),c.push(m.x,m.y,m.z),l.push(0,0,1),M.x=(m.x/t+1)/2,M.y=(m.y/t+1)/2,f.push(M.x,M.y)}g+=p}for(let T=0;T<s;T++){const h=T*(n+1);for(let u=0;u<n;u++){const v=u+h,w=v,A=v+n+1,y=v+n+2,S=v+1;o.push(w,A,S),o.push(A,y,S)}}this.setIndex(o),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(l,3)),this.setAttribute("uv",new bt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class li extends zt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const f=[],g=new H,p=new H,m=[],M=[],T=[],h=[];for(let u=0;u<=n;u++){const v=[],w=u/n,A=a+w*o,y=e*Math.cos(A),S=Math.sqrt(e*e-y*y);let _=0;u===0&&a===0?_=.5/t:u===n&&c===Math.PI&&(_=-.5/t);for(let x=0;x<=t;x++){const D=x/t,P=s+D*r;g.x=-S*Math.cos(P),g.y=y,g.z=S*Math.sin(P),M.push(g.x,g.y,g.z),p.copy(g).normalize(),T.push(p.x,p.y,p.z),h.push(D+_,1-w),v.push(l++)}f.push(v)}for(let u=0;u<n;u++)for(let v=0;v<t;v++){const w=f[u][v+1],A=f[u][v],y=f[u+1][v],S=f[u+1][v+1];(u!==0||a>0)&&m.push(w,A,S),(u!==n-1||c<Math.PI)&&m.push(A,y,S)}this.setIndex(m),this.setAttribute("position",new bt(M,3)),this.setAttribute("normal",new bt(T,3)),this.setAttribute("uv",new bt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zn extends zt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],f=[],g=[],p=new H,m=new H,M=new H;for(let T=0;T<=n;T++){const h=a+T/n*o;for(let u=0;u<=s;u++){const v=u/s*r;m.x=(e+t*Math.cos(h))*Math.cos(v),m.y=(e+t*Math.cos(h))*Math.sin(v),m.z=t*Math.sin(h),l.push(m.x,m.y,m.z),p.x=e*Math.cos(v),p.y=e*Math.sin(v),M.subVectors(m,p).normalize(),f.push(M.x,M.y,M.z),g.push(u/s),g.push(T/n)}}for(let T=1;T<=n;T++)for(let h=1;h<=s;h++){const u=(s+1)*T+h-1,v=(s+1)*(T-1)+h-1,w=(s+1)*(T-1)+h,A=(s+1)*T+h;c.push(u,v,A),c.push(v,w,A)}this.setIndex(c),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(f,3)),this.setAttribute("uv",new bt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Oi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Oo(s))s.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Oo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const n=Oi(i[t]);for(const s in n)e[s]=n[s]}return e}function Oo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function $u(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ql(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const Ju={clone:Oi,merge:Xt};var Qu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ju=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qu,this.fragmentShader=ju,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Oi(e.uniforms),this.uniformsGroups=$u(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new ke().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Rt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new dt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class eh extends hi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class or extends pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ca,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class th extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nh extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class jl extends It{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class ih extends jl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Gr=new dt,Bo=new H,zo=new H;class sh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ds,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Bo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bo),zo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Gr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Gr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===us||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Gr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Gs=new H,Hs=new on,vn=new H;class ec extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gs,Hs,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Gs,Hs,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new H,Go=new ke,Ho=new ke;class pn extends ec{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,Go,Ho),t.subVectors(Ho,Go)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(rs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class tc extends ec{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=f*this.view.offsetY,c=o-f*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class rh extends sh{constructor(){super(new tc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ko extends jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new rh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const wi=-90,Ri=1;class Da extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(wi,Ri,e,t);s.layers=this.layers,this.add(s);const r=new pn(wi,Ri,e,t);r.layers=this.layers,this.add(r);const a=new pn(wi,Ri,e,t);a.layers=this.layers,this.add(a);const o=new pn(wi,Ri,e,t);o.layers=this.layers,this.add(o);const c=new pn(wi,Ri,e,t);c.layers=this.layers,this.add(c);const l=new pn(wi,Ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===_n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===us)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,f]=this.children,g=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const T=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=T,e.setRenderTarget(n,5,s),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(g,p,m),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class ah extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}const Vo=new dt;class oh{constructor(e,t,n=0,s=1/0){this.ray=new fs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ya,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):pt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Vo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vo),this}intersectObject(e,t=!0,n=[]){return Ia(e,this,n,t),n.sort(Wo),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ia(e[s],this,n,t);return n.sort(Wo),n}}function Wo(i,e){return i.distance-e.distance}function Ia(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ia(r[a],e,t,!0)}}class Xo{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class lh extends Qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function qo(i,e,t,n){const s=ch(n);switch(t){case Il:return i*e;case Ga:return i*e/s.components*s.byteLength;case Ha:return i*e/s.components*s.byteLength;case ui:return i*e*2/s.components*s.byteLength;case ka:return i*e*2/s.components*s.byteLength;case Nl:return i*e*3/s.components*s.byteLength;case En:return i*e*4/s.components*s.byteLength;case Va:return i*e*4/s.components*s.byteLength;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ks:case Zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ea:case na:return Math.max(i,16)*Math.max(e,8)/4;case jr:case ta:return Math.max(i,8)*Math.max(e,8)/2;case ia:case sa:case aa:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ra:case js:case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ua:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ha:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case da:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ea:case ba:case Ta:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Aa:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case er:case Ra:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ch(i){switch(i){case tn:case Cl:return{byteLength:1,components:1};case cs:case Pl:case An:return{byteLength:2,components:1};case Ba:case za:return{byteLength:2,components:4};case Tn:case Oa:case gn:return{byteLength:4,components:1};case Ll:case Dl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ua}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ua);function nc(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function uh(i){const e=new WeakMap;function t(o,c){const l=o.array,f=o.usage,g=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,f),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:g}}function n(o,c,l){const f=c.array,g=c.updateRanges;if(i.bindBuffer(l,o),g.length===0)i.bufferSubData(l,0,f);else{g.sort((m,M)=>m.start-M.start);let p=0;for(let m=1;m<g.length;m++){const M=g[p],T=g[m];T.start<=M.start+M.count+1?M.count=Math.max(M.count,T.start+T.count-M.start):(++p,g[p]=T)}g.length=p+1;for(let m=0,M=g.length;m<M;m++){const T=g[m];i.bufferSubData(l,T.start*f.BYTES_PER_ELEMENT,f,T.start,T.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var hh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dh=`#ifdef USE_ALPHAHASH
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
#endif`,fh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ph=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_h=`#ifdef USE_AOMAP
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
#endif`,xh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vh=`#ifdef USE_BATCHING
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
#endif`,Mh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Eh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bh=`#ifdef USE_IRIDESCENCE
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
#endif`,Th=`#ifdef USE_BUMPMAP
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
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ph=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Lh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Dh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ih=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Nh=`#define PI 3.141592653589793
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
} // validated`,Uh=`vec3 transformedNormal = objectNormal;
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
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Oh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kh=`#ifdef USE_ENVMAP
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
#endif`,Vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Wh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$h=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jh=`#ifdef USE_GRADIENTMAP
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
}`,Qh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ed=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,td=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,nd=`#ifdef USE_ENVMAP
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
#endif`,id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,od=`PhysicalMaterial material;
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
#endif`,ld=`uniform sampler2D dfgLUT;
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
}`,cd=`
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
#endif`,ud=`#if defined( RE_IndirectDiffuse )
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
#endif`,hd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,fd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,md=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_d=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Md=`#if defined( USE_POINTS_UV )
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
#endif`,Sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ed=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ad=`#ifdef USE_MORPHTARGETS
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
#endif`,wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ld=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Id=`#ifdef USE_NORMALMAP
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
#endif`,Nd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ud=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Od=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zd=`float getShadowMask() {
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
}`,$d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jd=`#ifdef USE_SKINNING
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
#endif`,Qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jd=`#ifdef USE_SKINNING
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
#endif`,ef=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rf=`#ifdef USE_TRANSMISSION
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
#endif`,af=`#ifdef USE_TRANSMISSION
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
#endif`,of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,df=`uniform sampler2D t2D;
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
}`,ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pf=`uniform float backgroundBlurriness;
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
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`#include <common>
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
}`,xf=`#if DEPTH_PACKING == 3200
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
}`,vf=`#define DISTANCE
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
}`,Mf=`#define DISTANCE
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
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`uniform float scale;
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
}`,bf=`uniform vec3 diffuse;
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
}`,Tf=`#include <common>
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
}`,Af=`uniform vec3 diffuse;
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
}`,wf=`#define LAMBERT
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
}`,Rf=`#define LAMBERT
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
}`,Cf=`#define MATCAP
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
}`,Pf=`#define MATCAP
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
}`,Lf=`#define NORMAL
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
}`,Df=`#define NORMAL
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
}`,If=`#define PHONG
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
}`,Nf=`#define PHONG
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
}`,Uf=`#define STANDARD
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
}`,Ff=`#define STANDARD
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
}`,Of=`#define TOON
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
}`,Bf=`#define TOON
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
}`,zf=`uniform float size;
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
}`,Gf=`uniform vec3 diffuse;
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
}`,Hf=`#include <common>
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
}`,kf=`uniform vec3 color;
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
}`,Vf=`uniform float rotation;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:hh,alphahash_pars_fragment:dh,alphamap_fragment:fh,alphamap_pars_fragment:ph,alphatest_fragment:mh,alphatest_pars_fragment:gh,aomap_fragment:_h,aomap_pars_fragment:xh,batching_pars_vertex:vh,batching_vertex:Mh,begin_vertex:Sh,beginnormal_vertex:yh,bsdfs:Eh,iridescence_fragment:bh,bumpmap_pars_fragment:Th,clipping_planes_fragment:Ah,clipping_planes_pars_fragment:wh,clipping_planes_pars_vertex:Rh,clipping_planes_vertex:Ch,color_fragment:Ph,color_pars_fragment:Lh,color_pars_vertex:Dh,color_vertex:Ih,common:Nh,defaultnormal_vertex:Uh,displacementmap_pars_vertex:Fh,displacementmap_vertex:Oh,emissivemap_fragment:Bh,emissivemap_pars_fragment:zh,colorspace_fragment:Gh,colorspace_pars_fragment:Hh,envmap_fragment:kh,envmap_common_pars_fragment:Vh,envmap_pars_fragment:Wh,envmap_pars_vertex:Xh,envmap_physical_pars_fragment:nd,envmap_vertex:qh,fog_vertex:Yh,fog_pars_vertex:Kh,fog_fragment:Zh,fog_pars_fragment:$h,gradientmap_pars_fragment:Jh,lightmap_pars_fragment:Qh,lights_lambert_fragment:jh,lights_lambert_pars_fragment:ed,lights_pars_begin:td,lights_toon_fragment:id,lights_toon_pars_fragment:sd,lights_phong_fragment:rd,lights_phong_pars_fragment:ad,lights_physical_fragment:od,lights_physical_pars_fragment:ld,lights_fragment_begin:cd,lights_fragment_maps:ud,lights_fragment_end:hd,lightprobes_pars_fragment:dd,logdepthbuf_fragment:fd,logdepthbuf_pars_fragment:pd,logdepthbuf_pars_vertex:md,logdepthbuf_vertex:gd,map_fragment:_d,map_pars_fragment:xd,map_particle_fragment:vd,map_particle_pars_fragment:Md,metalnessmap_fragment:Sd,metalnessmap_pars_fragment:yd,morphinstance_vertex:Ed,morphcolor_vertex:bd,morphnormal_vertex:Td,morphtarget_pars_vertex:Ad,morphtarget_vertex:wd,normal_fragment_begin:Rd,normal_fragment_maps:Cd,normal_pars_fragment:Pd,normal_pars_vertex:Ld,normal_vertex:Dd,normalmap_pars_fragment:Id,clearcoat_normal_fragment_begin:Nd,clearcoat_normal_fragment_maps:Ud,clearcoat_pars_fragment:Fd,iridescence_pars_fragment:Od,opaque_fragment:Bd,packing:zd,premultiplied_alpha_fragment:Gd,project_vertex:Hd,dithering_fragment:kd,dithering_pars_fragment:Vd,roughnessmap_fragment:Wd,roughnessmap_pars_fragment:Xd,shadowmap_pars_fragment:qd,shadowmap_pars_vertex:Yd,shadowmap_vertex:Kd,shadowmask_pars_fragment:Zd,skinbase_vertex:$d,skinning_pars_vertex:Jd,skinning_vertex:Qd,skinnormal_vertex:jd,specularmap_fragment:ef,specularmap_pars_fragment:tf,tonemapping_fragment:nf,tonemapping_pars_fragment:sf,transmission_fragment:rf,transmission_pars_fragment:af,uv_pars_fragment:of,uv_pars_vertex:lf,uv_vertex:cf,worldpos_vertex:uf,background_vert:hf,background_frag:df,backgroundCube_vert:ff,backgroundCube_frag:pf,cube_vert:mf,cube_frag:gf,depth_vert:_f,depth_frag:xf,distance_vert:vf,distance_frag:Mf,equirect_vert:Sf,equirect_frag:yf,linedashed_vert:Ef,linedashed_frag:bf,meshbasic_vert:Tf,meshbasic_frag:Af,meshlambert_vert:wf,meshlambert_frag:Rf,meshmatcap_vert:Cf,meshmatcap_frag:Pf,meshnormal_vert:Lf,meshnormal_frag:Df,meshphong_vert:If,meshphong_frag:Nf,meshphysical_vert:Uf,meshphysical_frag:Ff,meshtoon_vert:Of,meshtoon_frag:Bf,points_vert:zf,points_frag:Gf,shadow_vert:Hf,shadow_frag:kf,sprite_vert:Vf,sprite_frag:Wf},be={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},yn={basic:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:Xt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:Xt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:Xt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new nt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:Xt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:Xt([be.points,be.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:Xt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:Xt([be.common,be.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:Xt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:Xt([be.sprite,be.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:Xt([be.common,be.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:Xt([be.lights,be.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};yn.physical={uniforms:Xt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const ks={r:0,b:0,g:0},Xf=new dt,ic=new Ke;ic.set(-1,0,0,0,1,0,0,0,1);function qf(i,e,t,n,s,r){const a=new nt(0);let o=s===!0?0:1,c,l,f=null,g=0,p=null;function m(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){const A=v.backgroundBlurriness>0;w=e.get(w,A)}return w}function M(v){let w=!1;const A=m(v);A===null?h(a,o):A&&A.isColor&&(h(A,1),w=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function T(v,w){const A=m(w);A&&A.isCubeTexture?(l===void 0&&(l=new gt(new Yt(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Oi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,S,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Xf.makeRotationFromEuler(w.backgroundRotation)).transpose(),A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ic),l.material.toneMapped=ct.getTransfer(A.colorSpace)!==Mt,(f!==A||g!==A.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=A,g=A.version,p=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new gt(new Jn(2,2),new hi({name:"BackgroundMaterial",uniforms:Oi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ct.getTransfer(A.colorSpace)!==Mt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(f!==A||g!==A.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,f=A,g=A.version,p=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,w){v.getRGB(ks,Ql(i)),t.buffers.color.setClear(ks.r,ks.g,ks.b,w,r)}function u(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,w=1){a.set(v),o=w,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,h(a,o)},render:M,addToRenderList:T,dispose:u}}function Yf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(C,N,X,U,W){let $=!1;const Y=g(C,U,X,N);r!==Y&&(r=Y,l(r.object)),$=m(C,U,X,W),$&&M(C,U,X,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,A(C,N,X,U),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function f(C){return i.deleteVertexArray(C)}function g(C,N,X,U){const W=U.wireframe===!0;let $=n[N.id];$===void 0&&($={},n[N.id]=$);const Y=C.isInstancedMesh===!0?C.id:0;let ne=$[Y];ne===void 0&&(ne={},$[Y]=ne);let Z=ne[X.id];Z===void 0&&(Z={},ne[X.id]=Z);let ie=Z[W];return ie===void 0&&(ie=p(c()),Z[W]=ie),ie}function p(C){const N=[],X=[],U=[];for(let W=0;W<t;W++)N[W]=0,X[W]=0,U[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:X,attributeDivisors:U,object:C,attributes:{},index:null}}function m(C,N,X,U){const W=r.attributes,$=N.attributes;let Y=0;const ne=X.getAttributes();for(const Z in ne)if(ne[Z].location>=0){const oe=W[Z];let me=$[Z];if(me===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(me=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(me=C.instanceColor)),oe===void 0||oe.attribute!==me||me&&oe.data!==me.data)return!0;Y++}return r.attributesNum!==Y||r.index!==U}function M(C,N,X,U){const W={},$=N.attributes;let Y=0;const ne=X.getAttributes();for(const Z in ne)if(ne[Z].location>=0){let oe=$[Z];oe===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(oe=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(oe=C.instanceColor));const me={};me.attribute=oe,oe&&oe.data&&(me.data=oe.data),W[Z]=me,Y++}r.attributes=W,r.attributesNum=Y,r.index=U}function T(){const C=r.newAttributes;for(let N=0,X=C.length;N<X;N++)C[N]=0}function h(C){u(C,0)}function u(C,N){const X=r.newAttributes,U=r.enabledAttributes,W=r.attributeDivisors;X[C]=1,U[C]===0&&(i.enableVertexAttribArray(C),U[C]=1),W[C]!==N&&(i.vertexAttribDivisor(C,N),W[C]=N)}function v(){const C=r.newAttributes,N=r.enabledAttributes;for(let X=0,U=N.length;X<U;X++)N[X]!==C[X]&&(i.disableVertexAttribArray(X),N[X]=0)}function w(C,N,X,U,W,$,Y){Y===!0?i.vertexAttribIPointer(C,N,X,W,$):i.vertexAttribPointer(C,N,X,U,W,$)}function A(C,N,X,U){T();const W=U.attributes,$=X.getAttributes(),Y=N.defaultAttributeValues;for(const ne in $){const Z=$[ne];if(Z.location>=0){let ie=W[ne];if(ie===void 0&&(ne==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),ne==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const oe=ie.normalized,me=ie.itemSize,Fe=e.get(ie);if(Fe===void 0)continue;const te=Fe.buffer,Me=Fe.type,Te=Fe.bytesPerElement,Re=Me===i.INT||Me===i.UNSIGNED_INT||ie.gpuType===Oa;if(ie.isInterleavedBufferAttribute){const ye=ie.data,Ve=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,St=ie.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let Pe=0;Pe<Z.locationSize;Pe++)u(Z.location+Pe,ye.meshPerAttribute);C.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Pe=0;Pe<Z.locationSize;Pe++)h(Z.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Pe=0;Pe<Z.locationSize;Pe++)w(Z.location+Pe,me/Z.locationSize,Me,oe,Ve*Te,(St+me/Z.locationSize*Pe)*Te,Re)}else{if(ie.isInstancedBufferAttribute){for(let ye=0;ye<Z.locationSize;ye++)u(Z.location+ye,ie.meshPerAttribute);C.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ye=0;ye<Z.locationSize;ye++)h(Z.location+ye);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ye=0;ye<Z.locationSize;ye++)w(Z.location+ye,me/Z.locationSize,Me,oe,me*Te,me/Z.locationSize*ye*Te,Re)}}else if(Y!==void 0){const oe=Y[ne];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(Z.location,oe);break;case 3:i.vertexAttrib3fv(Z.location,oe);break;case 4:i.vertexAttrib4fv(Z.location,oe);break;default:i.vertexAttrib1fv(Z.location,oe)}}}}v()}function y(){D();for(const C in n){const N=n[C];for(const X in N){const U=N[X];for(const W in U){const $=U[W];for(const Y in $)f($[Y].object),delete $[Y];delete U[W]}}delete n[C]}}function S(C){if(n[C.id]===void 0)return;const N=n[C.id];for(const X in N){const U=N[X];for(const W in U){const $=U[W];for(const Y in $)f($[Y].object),delete $[Y];delete U[W]}}delete n[C.id]}function _(C){for(const N in n){const X=n[N];for(const U in X){const W=X[U];if(W[C.id]===void 0)continue;const $=W[C.id];for(const Y in $)f($[Y].object),delete $[Y];delete W[C.id]}}}function x(C){for(const N in n){const X=n[N],U=C.isInstancedMesh===!0?C.id:0,W=X[U];if(W!==void 0){for(const $ in W){const Y=W[$];for(const ne in Y)f(Y[ne].object),delete Y[ne];delete W[$]}delete X[U],Object.keys(X).length===0&&delete n[N]}}}function D(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:P,dispose:y,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:_,initAttributes:T,enableAttribute:h,disableUnusedAttributes:v}}function Kf(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),t.update(l,n,f))}function o(c,l,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let p=0;for(let m=0;m<f;m++)p+=l[m];t.update(p,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Zf(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==En&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const x=_===An&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==tn&&_!==gn&&!x&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const f=c(l);f!==l&&(Xe("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.logarithmicDepthBuffer===!0&&g===!1;t.reversedDepthBuffer===!0&&g===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&g===!0&&Xe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:g,maxTextures:m,maxVertexTextures:M,maxTextureSize:T,maxCubemapSize:h,maxAttributes:u,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:A,maxSamples:y,samples:S}}function $f(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Nn,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,p){const m=g.length!==0||p||n!==0||s;return s=p,n=g.length,m},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,p){t=f(g,p,0)},this.setState=function(g,p,m){const M=g.clippingPlanes,T=g.clipIntersection,h=g.clipShadows,u=i.get(g);if(!s||M===null||M.length===0||r&&!h)r?f(null):l();else{const v=r?0:n,w=v*4;let A=u.clippingState||null;c.value=A,A=f(M,p,w,m);for(let y=0;y!==w;++y)A[y]=t[y];u.clippingState=A,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(g,p,m,M){const T=g!==null?g.length:0;let h=null;if(T!==0){if(h=c.value,M!==!0||h===null){const u=m+T*4,v=p.matrixWorldInverse;o.getNormalMatrix(v),(h===null||h.length<u)&&(h=new Float32Array(u));for(let w=0,A=m;w!==T;++w,A+=4)a.copy(g[w]).applyMatrix4(v,o),a.normal.toArray(h,A),h[A+3]=a.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,h}}class Qa extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Zl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yt(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:Oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:Di});r.uniforms.tEquirect.value=t;const a=new gt(s,r),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=Jt),new Da(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Yo=256,Jf=3,Qf=20,sc=256,rc=16,jf=3,ep=new H,tp=new nt;class lr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Da(1,10,null),this._boxMesh=new gt(new Yt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=ep}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),f=this._getSourceTarget(!0);t>0&&(f.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,p=c.autoClearColor,m=c.autoClearDepth,M=c.autoClearStencil,T=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,T===null&&(e.background=c.getClearColor(tp));const h=new Da(n,s,f);return h.position.copy(o),h.update(c,e),c.autoClear=g,c.autoClearColor=p,c.autoClearDepth=m,c.autoClearStencil=M,e.background=T,t>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Yo,zl(e))}_fromTexture(e,t){e.mapping===Ni||e.mapping===ls?this._setSize(e.image.length===0?Yo:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=Ko(e,!1,!1),n=Math.log2(e)-Jf;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ko(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ni||e.mapping===ls?(this._cubemapMaterial===null&&(this._cubemapMaterial=$o()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Zo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=np(),this._integrationMaterial=ip());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/rc);for(let a=0;a<=n;a++){const o=lr.lodToRoughness(a,n);if(a>n-jf)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(sc*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=sp());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function Ko(i,e,t){return new Qa(i,{minFilter:Yn,generateMipmaps:e,type:An,colorSpace:tr,depthBuffer:t})}function ps(i,e,t){return new hi({name:i,uniforms:e,vertexShader:tt.cube_vert,fragmentShader:t,side:Qt,blending:Di,depthTest:!1,depthWrite:!1})}function np(){return ps("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${sc}u

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
	`)}function ip(){return ps("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:rc}},`

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
	`)}function sp(){return ps("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Qf}
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
	`)}function Zo(){return ps("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function $o(){return ps("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function rp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(p,m=!1){return p==null?null:m?a(p):r(p)}function r(p){if(p&&p.isTexture){const m=p.mapping;if(m===mr||m===gr)if(e.has(p)){const M=e.get(p).texture;return o(M,p.mapping)}else{const M=p.image;if(M&&M.height>0){const T=new Qa(M.height);return T.fromEquirectangularTexture(i,p),e.set(p,T),p.addEventListener("dispose",l),o(T.texture,p.mapping)}else return null}}return p}function a(p){if(p&&p.isTexture&&p.isPMREMTexture!==!0){const m=p.mapping,M=m===mr||m===gr,T=m===Ni||m===ls;if(M||T){let h=t.get(p);const u=h!==void 0?h.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==u)return n===null&&(n=new lr(i)),h=M?n.fromEquirectangular(p,h):n.fromCubemap(p,h),h.texture.pmremVersion=p.pmremVersion,t.set(p,h),h.texture;if(h!==void 0)return h.texture;{const v=p.image;return M&&v&&v.height>0||T&&v&&c(v)?(n===null&&(n=new lr(i)),h=M?n.fromEquirectangular(p):n.fromCubemap(p),h.texture.pmremVersion=p.pmremVersion,t.set(p,h),p.addEventListener("dispose",f),h.texture):null}}}return p}function o(p,m){return m===mr?p.mapping=Ni:m===gr&&(p.mapping=ls),p}function c(p){let m=0;const M=6;for(let T=0;T<M;T++)p[T]!==void 0&&m++;return m===M}function l(p){const m=p.target;m.removeEventListener("dispose",l);const M=e.get(m);M!==void 0&&(e.delete(m),M.dispose())}function f(p){const m=p.target;m.removeEventListener("dispose",f);const M=t.get(m);M!==void 0&&(t.delete(m),M.dispose())}function g(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function ap(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&$s("WebGLRenderer: "+n+" extension not supported."),s}}}function op(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(M=>delete s[M]);function o(M){c(M.target)}function c(M){M.index!==null&&e.remove(M.index);for(const h in M.attributes)e.remove(M.attributes[h]);M.removeEventListener("dispose",o),delete s[M.id],a.unregister(M);const T=r.get(M);T&&(e.remove(T),r.delete(M)),n.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function l(M,T){return s[T.id]!==void 0||(T.addEventListener("dispose",o),s[T.id]=new WeakRef(T),a.register(T,T.id,T),t.memory.geometries++),T}function f(M){const T=M.attributes;for(const h in T)e.update(T[h],i.ARRAY_BUFFER)}function g(M){const T=M.index,h=M.attributes.position;let u=0;if(h===void 0)return;const v=T!==null?T.array.length:h.array.length/3-1,w=h.count>=65535?Xl:Wl,A=new w(Math.ceil(v/3)*6,1),y=A.array;if(T!==null){const _=T.array;u=T.version;for(let x=0,D=0;x<v;x+=3){const P=_[x+0],C=_[x+1],N=_[x+2];y[D++]=P,y[D++]=C,y[D++]=C,y[D++]=N,y[D++]=N,y[D++]=P}}else{u=h.version;for(let _=0,x=0;_<v;_+=3){const D=_+0,P=_+1,C=_+2;y[x++]=D,y[x++]=P,y[x++]=P,y[x++]=C,y[x++]=C,y[x++]=D}}A.version=u;const S=r.get(M);S&&e.remove(S),r.set(M,A)}function p(M){const T=r.get(M);if(T){const h=M.index;h!==null&&T.version<h.version&&g(M)}else g(M);return r.get(M)}function m(){for(const M in s){const T=s[M].deref();T!==void 0&&c(T)}}return{get:l,update:f,getWireframeAttribute:p,dispose:m}}function lp(i,e,t){let n;function s(g){n=g}let r,a;function o(g){r=g.type,a=g.bytesPerElement}function c(g,p){i.drawElements(n,p,r,g*a),t.update(p,n,1)}function l(g,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,g*a,m),t.update(p,n,m))}function f(g,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,g,0,m);let T=0;for(let h=0;h<m;h++)T+=p[h];t.update(T,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function cp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function up(i,e,t){const n=new WeakMap,s=new Rt;function r(a,o,c){const l=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,g=f!==void 0?f.length:0;let p=n.get(o);if(p===void 0||p.count!==g){let D=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",D)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let w=0;m===!0&&(w=1),M===!0&&(w=2),T===!0&&(w=3);let A=o.attributes.position.count*w,y=1;A>e.maxTextureSize&&(y=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const S=new Float32Array(A*y*4*g),_=new kl(S,A,y,g);_.type=gn,_.needsUpdate=!0;const x=w*4;for(let P=0;P<g;P++){const C=h[P],N=u[P],X=v[P],U=A*y*4*P;for(let W=0;W<C.count;W++){const $=W*x;m===!0&&(s.fromBufferAttribute(C,W),S[U+$+0]=s.x,S[U+$+1]=s.y,S[U+$+2]=s.z,S[U+$+3]=0),M===!0&&(s.fromBufferAttribute(N,W),S[U+$+4]=s.x,S[U+$+5]=s.y,S[U+$+6]=s.z,S[U+$+7]=0),T===!0&&(s.fromBufferAttribute(X,W),S[U+$+8]=s.x,S[U+$+9]=s.y,S[U+$+10]=s.z,S[U+$+11]=X.itemSize===4?s.w:1)}}p={count:g,texture:_,size:new ke(A,y)},n.set(o,p),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let T=0;T<l.length;T++)m+=l[T];const M=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",M),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function hp(i,e,t,n,s){let r=new WeakMap;function a(l){const f=s.render.frame,g=l.geometry,p=e.get(l,g);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==f&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,f))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==f&&(m.update(),r.set(m,f))}return p}function o(){r=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:a,dispose:o}}const dp={[yl]:"LINEAR_TONE_MAPPING",[El]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[Fa]:"ACES_FILMIC_TONE_MAPPING",[Al]:"AGX_TONE_MAPPING",[wl]:"NEUTRAL_TONE_MAPPING",[Tl]:"CUSTOM_TONE_MAPPING"};function fp(i,e,t,n,s,r){const a=new bn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const f=new zt;f.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new bt([0,2,0,0,2,0],2));const g=new eh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new gt(f,g),m=new tc(-1,1,1,-1,0,1);let M=null,T=null,h=!1,u,v=null,w=[],A=!1;this.setSize=function(y,S){a.setSize(y,S),o!==null&&o.setSize(y,S),c!==null&&c.setSize(y,S);for(let _=0;_<w.length;_++){const x=w[_];x.setSize&&x.setSize(y,S)}},this.setEffects=function(y){w=y,A=w.length>0&&w[0].isRenderPass===!0;const S=a.width,_=a.height;w.length>0&&o===null&&(o=new bn(S,_,{type:An,depthBuffer:!1,stencilBuffer:!1}),c=new bn(S,_,{type:An,depthBuffer:!1,stencilBuffer:!1}));const x=s===!0&&w.some(D=>D.needsDepthTexture===!0);x!==(a.depthTexture!==null)&&(x===!0&&l===null&&(l=new Fi(S,_),r===!0&&(l.format=Kn,l.type=Ui)),a.dispose(),a.depthTexture=x?l:null,a.resolveDepthBuffer=x,a.storeMultisampledDepthBuffer=x);for(let D=0;D<w.length;D++){const P=w[D];P.setSize&&P.setSize(S,_),x&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(y,S){if(h||y.toneMapping===On&&w.length===0)return!1;if(v=S,S!==null){const _=S.width,x=S.height;(a.width!==_||a.height!==x)&&this.setSize(_,x)}return A===!1&&y.setRenderTarget(a),u=y.toneMapping,y.toneMapping=On,!0},this.hasRenderPass=function(){return A},this.end=function(y,S){y.toneMapping=u,h=!0;let _=a,x=o;for(let D=0;D<w.length;D++){const P=w[D];P.enabled!==!1&&(P.render(y,x,_,S),P.needsSwap!==!1&&(_=x,x=x===o?c:o))}if(M!==y.outputColorSpace||T!==y.toneMapping){M=y.outputColorSpace,T=y.toneMapping,g.defines={},ct.getTransfer(M)===Mt&&(g.defines.SRGB_TRANSFER="");const D=dp[T];D&&(g.defines[D]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=_.texture,y.setRenderTarget(v),y.render(p,m),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),f.dispose(),g.dispose()}}const ac=new kt,oc=new Fi(1,1),lc=new $l(1),cc=new kl,uc=new Ru,hc=new Zl,Jo=[],Qo=[],jo=new Float32Array(16),el=new Float32Array(9),tl=new Float32Array(4);function zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Jo[s];if(r===void 0&&(r=new Float32Array(s),Jo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hr(i,e){let t=Qo[e];t===void 0&&(t=new Int32Array(e),Qo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function pp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function _p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;tl.set(n),i.uniformMatrix2fv(this.addr,!1,tl),Ut(t,n)}}function vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;el.set(n),i.uniformMatrix3fv(this.addr,!1,el),Ut(t,n)}}function Mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,n))return;jo.set(n),i.uniformMatrix4fv(this.addr,!1,jo),Ut(t,n)}}function Sp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function Tp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function dr(i){return i.version===0&&(i.compareFunction=Ol,i.needsUpdate=!0),i}function Cp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=dr(oc):r=ac,t.setTexture2D(e||r,s)}function Pp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||uc,s)}function Lp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=dr(lc):r=hc,t.setTextureCube(e||r,s)}function Dp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||cc,s)}function Ip(i){switch(i){case 5126:return pp;case 35664:return mp;case 35665:return gp;case 35666:return _p;case 35674:return xp;case 35675:return vp;case 35676:return Mp;case 5124:case 35670:return Sp;case 35667:case 35671:return yp;case 35668:case 35672:return Ep;case 35669:case 35673:return bp;case 5125:return Tp;case 36294:return Ap;case 36295:return wp;case 36296:return Rp;case 35678:case 36198:case 36298:case 36306:case 35682:return Cp;case 35679:case 36299:case 36307:return Pp;case 35680:case 36300:case 36308:case 36293:return Lp;case 36289:case 36303:case 36311:case 36292:return Dp}}function Np(i,e){i.uniform1fv(this.addr,e)}function Up(i,e){const t=zi(e,this.size,2);i.uniform2fv(this.addr,t)}function Fp(i,e){const t=zi(e,this.size,3);i.uniform3fv(this.addr,t)}function Op(i,e){const t=zi(e,this.size,4);i.uniform4fv(this.addr,t)}function Bp(i,e){const t=zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function zp(i,e){const t=zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gp(i,e){const t=zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hp(i,e){i.uniform1iv(this.addr,e)}function kp(i,e){i.uniform2iv(this.addr,e)}function Vp(i,e){i.uniform3iv(this.addr,e)}function Wp(i,e){i.uniform4iv(this.addr,e)}function Xp(i,e){i.uniform1uiv(this.addr,e)}function qp(i,e){i.uniform2uiv(this.addr,e)}function Yp(i,e){i.uniform3uiv(this.addr,e)}function Kp(i,e){i.uniform4uiv(this.addr,e)}function Zp(i,e,t){const n=this.cache,s=e.length,r=hr(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=dr(oc):a=ac;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function $p(i,e,t){const n=this.cache,s=e.length,r=hr(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||uc,r[a])}function Jp(i,e,t){const n=this.cache,s=e.length,r=hr(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=dr(lc):a=hc;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Qp(i,e,t){const n=this.cache,s=e.length,r=hr(t,s);Nt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||cc,r[a])}function jp(i){switch(i){case 5126:return Np;case 35664:return Up;case 35665:return Fp;case 35666:return Op;case 35674:return Bp;case 35675:return zp;case 35676:return Gp;case 5124:case 35670:return Hp;case 35667:case 35671:return kp;case 35668:case 35672:return Vp;case 35669:case 35673:return Wp;case 5125:return Xp;case 36294:return qp;case 36295:return Yp;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return $p;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Qp}}class em{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ip(t.type)}}class tm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jp(t.type)}}class nm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Hr=/(\w+)(\])?(\[|\.)?/g;function nl(i,e){i.seq.push(e),i.map[e.id]=e}function im(i,e,t){const n=i.name,s=n.length;for(Hr.lastIndex=0;;){const r=Hr.exec(n),a=Hr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nl(t,l===void 0?new em(o,i,e):new tm(o,i,e));break}else{let g=t.map[o];g===void 0&&(g=new nm(o),nl(t,g)),t=g}}}class Js{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);im(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function il(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const sm=37297;let rm=0;function am(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const sl=new Ke;function om(i){ct._getMatrix(sl,ct.workingColorSpace,i);const e=`mat3( ${sl.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(i)){case nr:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+am(i.getShaderSource(e),o)}else return r}function lm(i,e){const t=om(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const cm={[yl]:"Linear",[El]:"Reinhard",[bl]:"Cineon",[Fa]:"ACESFilmic",[Al]:"AgX",[wl]:"Neutral",[Tl]:"Custom"};function um(i,e){const t=cm[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Vs=new H;function hm(){ct.getLuminanceCoefficients(Vs);const i=Vs.x.toFixed(4),e=Vs.y.toFixed(4),t=Vs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function fm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function pm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function is(i){return i!==""}function al(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function ol(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Na(i){return i.replace(mm,gm)}function gm(i,e){const t=tt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Na(t)}const _m=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ll(i){return i.replace(_m,xm)}function xm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const vm={[Xs]:"SHADOWMAP_TYPE_PCF",[ns]:"SHADOWMAP_TYPE_VSM"};function Mm(i){return vm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Sm={[ls]:"ENVMAP_MODE_REFRACTION"};function ym(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Sm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Em={[Sl]:"ENVMAP_BLENDING_MULTIPLY",[Xc]:"ENVMAP_BLENDING_MIX",[qc]:"ENVMAP_BLENDING_ADD"};function bm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Em[i.combine]||"ENVMAP_BLENDING_NONE"}function Tm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Mm(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=ym(t),g=bm(t),p=dm(t),m=fm(r),M=s.createProgram();let T,h,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(T=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(is).join(`
`),T.length>0&&(T+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(is).join(`
`),h.length>0&&(h+=`
`)):(T=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),h=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+g:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?tt.tonemapping_pars_fragment:"",t.toneMapping!==On?um("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,lm("linearToOutputTexel",t.outputColorSpace),hm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(is).join(`
`)),a=Na(a),a=al(a,t),a=ol(a,t),o=Na(o),o=al(o,t),o=ol(o,t),a=ll(a),o=ll(o),t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,T=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+T,h=["#define varying in",t.glslVersion===oo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const v=u+T+a,w=u+h+o,A=il(s,s.VERTEX_SHADER,v),y=il(s,s.FRAGMENT_SHADER,w);s.attachShader(M,A),s.attachShader(M,y),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function S(P){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(M)||"",N=s.getShaderInfoLog(A)||"",X=s.getShaderInfoLog(y)||"",U=C.trim(),W=N.trim(),$=X.trim();let Y=!0,ne=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,A,y);else{const Z=rl(s,A,"vertex"),ie=rl(s,y,"fragment");pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+Z+`
`+ie)}else U!==""?Xe("WebGLProgram: Program Info Log:",U):(W===""||$==="")&&(ne=!1);ne&&(P.diagnostics={runnable:Y,programLog:U,vertexShader:{log:W,prefix:T},fragmentShader:{log:$,prefix:h}})}s.deleteShader(A),s.deleteShader(y),_=new Js(s,M),x=pm(s,M)}let _;this.getUniforms=function(){return _===void 0&&S(this),_};let x;this.getAttributes=function(){return x===void 0&&S(this),x};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(M,sm)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rm++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=y,this}let Am=0;class wm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rm(e),t.set(e,n)),n}}class Rm{constructor(e){this.id=Am++,this.code=e,this.usedTimes=0}}function Cm(i){return i===ui||i===js||i===er}function Pm(i,e,t,n,s,r){const a=new Ya,o=new wm,c=new Set,l=[],f=new Map,g=n.logarithmicDepthBuffer,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function M(_,x,D,P,C,N){const X=P.fog,U=C.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Y=e.get(_.envMap||W,$),ne=p[_.type];let Z=n.precision;_.precision!==null&&(Z=n.getMaxPrecision(_.precision),Z!==_.precision&&Xe("WebGLProgram.getParameters:",_.precision,"not supported, using",Z,"instead."));const ie=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,oe=ie!==void 0?ie.length:0;let me=0;U.morphAttributes.position!==void 0&&(me=1),U.morphAttributes.normal!==void 0&&(me=2),U.morphAttributes.color!==void 0&&(me=3);let Fe,te,Me,Te;if(ne){const ve=yn[ne];Fe=ve.vertexShader,te=ve.fragmentShader}else{Fe=_.vertexShader,te=_.fragmentShader;const ve=o.getVertexShaderStage(_),it=o.getFragmentShaderStage(_);o.update(_,ve,it),Me=ve.id,Te=it.id}const Re=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),Ve=C.isInstancedMesh===!0,St=C.isBatchedMesh===!0,Pe=!!_.map,at=!!_.matcap,ut=!!Y,Ie=ut&&Y.isPMREMTexture===!0,Se=!!_.aoMap,ze=!!_.lightMap,et=!!_.bumpMap&&_.wireframe===!1,We=!!_.normalMap,Ye=!!_.displacementMap,Ce=!!_.emissiveMap,Tt=!!_.metalnessMap,xt=!!_.roughnessMap,ft=_.anisotropy>0,k=_.clearcoat>0,Lt=_.diffuseRoughness>0,$e=_.dispersion>0,ht=_.retroreflectivity>0,he=_.iridescence>0,ot=_.sheen>0,Ue=_.transmission>0,Ge=ft&&!!_.anisotropyMap,L=k&&!!_.clearcoatMap,b=k&&!!_.clearcoatNormalMap,q=k&&!!_.clearcoatRoughnessMap,ce=Lt&&!!_.diffuseRoughnessMap,J=he&&!!_.iridescenceMap,pe=he&&!!_.iridescenceThicknessMap,de=ot&&!!_.sheenColorMap,j=ot&&!!_.sheenRoughnessMap,se=!!_.specularMap,_e=!!_.specularColorMap,O=!!_.specularIntensityMap,ee=Ue&&!!_.transmissionMap,Q=Ue&&!!_.thicknessMap,xe=!!_.gradientMap,fe=!!_.alphaMap,ge=_.alphaTest>0,Ne=!!_.alphaHash,Ze=!!_.extensions;let le=On;_.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(le=i.toneMapping);const Ae=Ie?Y.isCompressedCubeTexture?Y.image[0].mipmaps:Y.mipmaps:null,Be={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:Fe,fragmentShader:te,defines:_.defines,customVertexShaderID:Me,customFragmentShaderID:Te,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:Z,batching:St,batchingColor:St&&C._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&C.instanceColor!==null,instancingMorph:Ve&&C.morphTexture!==null,outputColorSpace:Re===null?i.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Pe,matcap:at,envMap:ut,envMapMode:ut&&Y.mapping,envMapPMREM:Ie,envMapMaxLod:Ie?Ae.length-1:null,envMapSize:Ie?Ae[0].width:null,aoMap:Se,lightMap:ze,bumpMap:et,normalMap:We,displacementMap:Ye,emissiveMap:Ce,normalMapObjectSpace:We&&_.normalMapType===Zc,normalMapTangentSpace:We&&_.normalMapType===Ca,packedNormalMap:We&&_.normalMapType===Ca&&Cm(_.normalMap.format),metalnessMap:Tt,roughnessMap:xt,anisotropy:ft,anisotropyMap:Ge,clearcoat:k,clearcoatMap:L,clearcoatNormalMap:b,clearcoatRoughnessMap:q,diffuseRoughness:Lt,diffuseRoughnessMap:ce,dispersion:$e,retroreflection:ht,iridescence:he,iridescenceMap:J,iridescenceThicknessMap:pe,sheen:ot,sheenColorMap:de,sheenRoughnessMap:j,specularMap:se,specularColorMap:_e,specularIntensityMap:O,transmission:Ue,transmissionMap:ee,thicknessMap:Q,gradientMap:xe,opaque:_.transparent===!1&&_.blending===ss&&_.alphaToCoverage===!1,alphaMap:fe,alphaTest:ge,alphaHash:Ne,combine:_.combine,mapUv:Pe&&m(_.map.channel),aoMapUv:Se&&m(_.aoMap.channel),lightMapUv:ze&&m(_.lightMap.channel),bumpMapUv:et&&m(_.bumpMap.channel),normalMapUv:We&&m(_.normalMap.channel),displacementMapUv:Ye&&m(_.displacementMap.channel),emissiveMapUv:Ce&&m(_.emissiveMap.channel),metalnessMapUv:Tt&&m(_.metalnessMap.channel),roughnessMapUv:xt&&m(_.roughnessMap.channel),anisotropyMapUv:Ge&&m(_.anisotropyMap.channel),clearcoatMapUv:L&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:b&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&m(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ce&&m(_.diffuseRoughnessMap.channel),iridescenceMapUv:J&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:de&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:j&&m(_.sheenRoughnessMap.channel),specularMapUv:se&&m(_.specularMap.channel),specularColorMapUv:_e&&m(_.specularColorMap.channel),specularIntensityMapUv:O&&m(_.specularIntensityMap.channel),transmissionMapUv:ee&&m(_.transmissionMap.channel),thicknessMapUv:Q&&m(_.thicknessMap.channel),alphaMapUv:fe&&m(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(We||ft),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!U.attributes.uv&&(Pe||fe),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&We===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:ye,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:me,numSunLights:x.sun.length,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numSunLightShadows:x.sunShadowMap.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numLightProbeGrids:N.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:Pe&&_.map.isVideoTexture===!0&&ct.getTransfer(_.map.colorSpace)===Mt,decodeVideoTextureEmissive:Ce&&_.emissiveMap.isVideoTexture===!0&&ct.getTransfer(_.emissiveMap.colorSpace)===Mt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===qt,flipSided:_.side===Qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ze&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ze&&_.extensions.multiDraw===!0||St)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function T(_){const x=[];if(_.shaderID?x.push(_.shaderID):(x.push(_.customVertexShaderID),x.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)x.push(D),x.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(h(x,_),u(x,_),x.push(i.outputColorSpace)),x.push(_.customProgramCacheKey),x.join()}function h(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapPMREM),_.push(x.envMapMaxLod),_.push(x.envMapSize),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.diffuseRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.numSunLights),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numSunLightShadows),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.numLightProbeGrids),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)}function u(_,x){a.disableAll(),x.instancing&&a.enable(0),x.instancingColor&&a.enable(1),x.instancingMorph&&a.enable(2),x.matcap&&a.enable(3),x.envMap&&a.enable(4),x.normalMapObjectSpace&&a.enable(5),x.normalMapTangentSpace&&a.enable(6),x.clearcoat&&a.enable(7),x.iridescence&&a.enable(8),x.alphaTest&&a.enable(9),x.vertexColors&&a.enable(10),x.vertexAlphas&&a.enable(11),x.vertexUv1s&&a.enable(12),x.vertexUv2s&&a.enable(13),x.vertexUv3s&&a.enable(14),x.vertexTangents&&a.enable(15),x.anisotropy&&a.enable(16),x.alphaHash&&a.enable(17),x.batching&&a.enable(18),x.dispersion&&a.enable(19),x.retroreflection&&a.enable(24),x.diffuseRoughness&&a.enable(25),x.batchingColor&&a.enable(20),x.gradientMap&&a.enable(21),x.packedNormalMap&&a.enable(22),x.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),x.numLightProbeGrids>0&&a.enable(22),x.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function v(_){const x=p[_.type];let D;if(x){const P=yn[x];D=Ju.clone(P.uniforms)}else D=_.uniforms;return D}function w(_,x){let D=f.get(x);return D!==void 0?++D.usedTimes:(D=new Tm(i,x,_,s),l.push(D),f.set(x,D)),D}function A(_){if(--_.usedTimes===0){const x=l.indexOf(_);l[x]=l[l.length-1],l.pop(),f.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function S(){o.dispose()}return{getParameters:M,getProgramCacheKey:T,getUniforms:v,acquireProgram:w,releaseProgram:A,releaseShaderCache:y,programs:l,dispose:S}}function Lm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Dm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ul(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(p){let m=0;return p.isInstancedMesh&&(m+=2),p.isSkinnedMesh&&(m+=1),m}function o(p,m,M,T,h,u){let v=i[e];return v===void 0?(v={id:p.id,object:p,geometry:m,material:M,materialVariant:a(p),groupOrder:T,renderOrder:p.renderOrder,z:h,group:u},i[e]=v):(v.id=p.id,v.object=p,v.geometry=m,v.material=M,v.materialVariant=a(p),v.groupOrder=T,v.renderOrder=p.renderOrder,v.z=h,v.group=u),e++,v}function c(p,m,M,T,h,u,v){v.reversedDepth===!0&&(h=-h);const w=o(p,m,M,T,h,u);M.transmission>0?n.push(w):M.transparent===!0?s.push(w):t.push(w)}function l(p,m,M,T,h,u){const v=o(p,m,M,T,h,u);M.transmission>0?n.unshift(v):M.transparent===!0?s.unshift(v):t.unshift(v)}function f(p,m){t.length>1&&t.sort(p||Dm),n.length>1&&n.sort(m||ul),s.length>1&&s.sort(m||ul)}function g(){for(let p=e,m=i.length;p<m;p++){const M=i[p];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:f}}function Im(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hl,i.set(n,[a])):s>=r.length?(a=new hl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Nm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new nt};break;case"SpotLight":t={position:new H,direction:new H,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function Um(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Fm=0;function Om(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Bm(i){const e=new Nm,t=Um(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);const s=new H,r=new dt,a=new dt;function o(l){let f=0,g=0,p=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let m=0,M=0,T=0,h=0,u=0,v=0,w=0,A=0,y=0,S=0,_=0,x=0,D=0,P=0;l.sort(Om);for(let N=0,X=l.length;N<X;N++){const U=l[N],W=U.color,$=U.intensity,Y=U.distance;let ne=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===ui?ne=U.shadow.map.texture:ne=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)f+=W.r*$,g+=W.g*$,p+=W.b*$;else if(U.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(U.sh.coefficients[Z],$);P++}else if(U.isSunLight){const Z=e.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ie=U.shadow,oe=t.get(U);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),n.sunShadow[M]=oe,n.sunShadowMap[M]=ne;const me=ie.getViewportCount();for(let Fe=0;Fe<me;Fe++)n.sunShadowMatrix[T+Fe]=ie.getMatrix(Fe),n.sunShadowCascade[T+Fe]=ie._cascadeData[Fe];T+=me,M++}n.sun[m]=Z,m++}else if(U.isDirectionalLight){const Z=e.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ie=U.shadow,oe=t.get(U);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,n.directionalShadow[h]=oe,n.directionalShadowMap[h]=ne,n.directionalShadowMatrix[h]=U.shadow.matrix,y++}n.directional[h]=Z,h++}else if(U.isSpotLight){const Z=e.get(U);Z.position.setFromMatrixPosition(U.matrixWorld),Z.color.copy(W).multiplyScalar($),Z.distance=Y,Z.coneCos=Math.cos(U.angle),Z.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Z.decay=U.decay,n.spot[v]=Z;const ie=U.shadow;if(U.map&&(n.spotLightMap[x]=U.map,x++,ie.updateMatrices(U),U.castShadow&&D++),n.spotLightMatrix[v]=ie.matrix,U.castShadow){const oe=t.get(U);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,n.spotShadow[v]=oe,n.spotShadowMap[v]=ne,_++}v++}else if(U.isRectAreaLight){const Z=e.get(U);Z.color.copy(W).multiplyScalar($),Z.halfWidth.set(U.width*.5,0,0),Z.halfHeight.set(0,U.height*.5,0),n.rectArea[w]=Z,w++}else if(U.isPointLight){const Z=e.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),Z.distance=U.distance,Z.decay=U.decay,U.castShadow){const ie=U.shadow,oe=t.get(U);oe.shadowIntensity=ie.intensity,oe.shadowBias=ie.bias,oe.shadowNormalBias=ie.normalBias,oe.shadowRadius=ie.radius,oe.shadowMapSize=ie.mapSize,oe.shadowCameraNear=ie.camera.near,oe.shadowCameraFar=ie.camera.far,n.pointShadow[u]=oe,n.pointShadowMap[u]=ne,n.pointShadowMatrix[u]=U.shadow.matrix,S++}n.point[u]=Z,u++}else if(U.isHemisphereLight){const Z=e.get(U);Z.skyColor.copy(U.color).multiplyScalar($),Z.groundColor.copy(U.groundColor).multiplyScalar($),n.hemi[A]=Z,A++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=g,n.ambient[2]=p;const C=n.hash;(C.sunLength!==m||C.directionalLength!==h||C.pointLength!==u||C.spotLength!==v||C.rectAreaLength!==w||C.hemiLength!==A||C.numSunShadows!==M||C.numDirectionalShadows!==y||C.numPointShadows!==S||C.numSpotShadows!==_||C.numSpotMaps!==x||C.numLightProbes!==P)&&(n.sun.length=m,n.directional.length=h,n.spot.length=v,n.rectArea.length=w,n.point.length=u,n.hemi.length=A,n.sunShadow.length=M,n.sunShadowMap.length=M,n.sunShadowMatrix.length=T,n.sunShadowCascade.length=T,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+x-D,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=P,C.sunLength=m,C.directionalLength=h,C.pointLength=u,C.spotLength=v,C.rectAreaLength=w,C.hemiLength=A,C.numSunShadows=M,C.numDirectionalShadows=y,C.numPointShadows=S,C.numSpotShadows=_,C.numSpotMaps=x,C.numLightProbes=P,n.version=Fm++)}function c(l,f){let g=0,p=0,m=0,M=0,T=0,h=0;const u=f.matrixWorldInverse;for(let v=0,w=l.length;v<w;v++){const A=l[v];if(A.isSunLight){const y=n.sun[g];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(u),g++}else if(A.isDirectionalLight){const y=n.directional[p];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(u),p++}else if(A.isSpotLight){const y=n.spot[M];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(u),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(u),M++}else if(A.isRectAreaLight){const y=n.rectArea[T];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(u),a.identity(),r.copy(A.matrixWorld),r.premultiply(u),a.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),T++}else if(A.isPointLight){const y=n.point[m];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(u),m++}else if(A.isHemisphereLight){const y=n.hemi[h];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(u),h++}}}return{setup:o,setupView:c,state:n}}function dl(i){const e=new Bm(i),t=[],n=[],s=[];function r(g){f.camera=g,t.length=0,n.length=0,s.length=0}function a(g){g.isLightProbeGrid?s.push(g):t.push(g)}function o(g){n.push(g)}function c(){e.setup(t),s.sort((g,p)=>g.priority-p.priority||g.id-p.id)}function l(g){e.setupView(t,g)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function zm(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new dl(i),e.set(s,[o])):r>=a.length?(o=new dl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Gm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hm=`uniform sampler2D shadow_pass;
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
}`,km=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Vm=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],fl=new dt,es=new H,kr=new H;function Wm(i,e,t){let n=new ds;const s=new ke,r=new ke,a=new Rt,o=new th,c=new nh,l={},f=t.maxTextureSize,g={[ci]:Qt,[Qt]:ci,[qt]:qt},p=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Gm,fragmentShader:Hm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const M=new zt;M.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new gt(M,p),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xs;let u=this.type;this.render=function(S,_,x){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||S.length===0)return;this.type===Ac&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xs);const D=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Di),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const X=u!==this.type;X&&_.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(W=>W.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,W=S.length;U<W;U++){const $=S[U],Y=$.shadow;if(Y===void 0){Xe("WebGLShadowMap:",$,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ne=Y.getFrameExtents();s.multiply(ne),r.copy(Y.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/ne.x),s.x=r.x*ne.x,Y.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/ne.y),s.y=r.y*ne.y,Y.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=Z,Y.map===null||X===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===ns){if($.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new bn(s.x,s.y,{format:ui,type:An,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),Y.map.texture.name=$.name+".shadowMap",Y.map.depthTexture=new Fi(s.x,s.y,gn),Y.map.depthTexture.name=$.name+".shadowMapDepth",Y.map.depthTexture.format=$n,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt}else $.isPointLight?(Y.map=new Qa(s.x),Y.map.depthTexture=new $l(s.x,Tn)):(Y.map=new bn(s.x,s.y),Y.map.depthTexture=new Fi(s.x,s.y,Tn)),Y.map.depthTexture.name=$.name+".shadowMap",Y.map.depthTexture.format=$n,this.type===Xs?(Y.map.depthTexture.compareFunction=Z?Fl:Ul,Y.map.depthTexture.minFilter=Jt,Y.map.depthTexture.magFilter=Jt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);const ie=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();$.isPointLight!==!0&&Y.updateMatrices($,x);const oe=(Y.camera.layers.mask&4294967294)!==0?Y.camera.layers:x.layers;for(let me=0;me<ie;me++){const Fe=Y.getCamera(me);if($.isPointLight){const te=Y.camera,Me=Y.matrix,Te=$.distance||te.far;Te!==te.far&&(te.far=Te,te.updateProjectionMatrix()),es.setFromMatrixPosition($.matrixWorld),te.position.copy(es),kr.copy(te.position),kr.add(km[me]),te.up.copy(Vm[me]),te.lookAt(kr),te.updateMatrixWorld(),Me.makeTranslation(-es.x,-es.y,-es.z),fl.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(fl,te.coordinateSystem,te.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,me),i.clear();else{me===0&&(i.setRenderTarget(Y.map),i.clear());const te=Y.getViewport(me);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),N.viewport(a)}n=Y.getFrustum(me),A(_,x,Fe,$,oe,this.type)}Y.isPointLightShadow!==!0&&this.type===ns&&v(Y,x),Y.needsUpdate=!1}u=this.type,h.needsUpdate=!1,i.setRenderTarget(D,P,C)};function v(S,_){const x=e.update(T);p.defines.VSM_SAMPLES!==S.blurSamples&&(p.defines.VSM_SAMPLES=S.blurSamples,m.defines.VSM_SAMPLES=S.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),S.mapPass===null?S.mapPass=new bn(s.x,s.y,{format:ui,type:An}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),p.uniforms.shadow_pass.value=S.map.depthTexture,p.uniforms.resolution.value.set(S.map.width,S.map.height),p.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(_,null,x,p,T,null),m.uniforms.shadow_pass.value=S.mapPass.texture,m.uniforms.resolution.value.set(S.map.width,S.map.height),m.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(_,null,x,m,T,null)}function w(S,_,x,D){let P=null;const C=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)P=C;else if(P=x.isPointLight===!0?c:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const N=P.uuid,X=_.uuid;let U=l[N];U===void 0&&(U={},l[N]=U);let W=U[X];W===void 0&&(W=P.clone(),U[X]=W,_.addEventListener("dispose",y)),P=W}if(P.visible=_.visible,P.wireframe=_.wireframe,D===ns?P.side=_.shadowSide!==null?_.shadowSide:_.side:P.side=_.shadowSide!==null?_.shadowSide:g[_.side],P.alphaMap=_.alphaMap,P.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,P.map=_.map,P.clipShadows=_.clipShadows,P.clippingPlanes=_.clippingPlanes,P.clipIntersection=_.clipIntersection,P.displacementMap=_.displacementMap,P.displacementScale=_.displacementScale,P.displacementBias=_.displacementBias,P.wireframeLinewidth=_.wireframeLinewidth,P.linewidth=_.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=i.properties.get(P);N.light=x}return P}function A(S,_,x,D,P,C){if(S.visible===!1)return;if(S.layers.test(P)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&C===ns)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);const U=e.update(S),W=S.material;if(Array.isArray(W)){const $=U.groups;for(let Y=0,ne=$.length;Y<ne;Y++){const Z=$[Y],ie=W[Z.materialIndex];if(ie&&ie.visible){const oe=w(S,ie,D,C);S.onBeforeShadow(i,S,_,x,U,oe,Z),i.renderBufferDirect(x,null,U,oe,S,Z),S.onAfterShadow(i,S,_,x,U,oe,Z)}}}else if(W.visible){const $=w(S,W,D,C);S.onBeforeShadow(i,S,_,x,U,$,null),i.renderBufferDirect(x,null,U,$,S,null),S.onAfterShadow(i,S,_,x,U,$,null)}}const X=S.children;for(let U=0,W=X.length;U<W;U++)A(X[U],_,x,D,P,C)}function y(S){S.target.removeEventListener("dispose",y);for(const x in l){const D=l[x],P=S.target.uuid;P in D&&(D[P].dispose(),delete D[P])}}}function Xm(i,e){function t(){let O=!1;const ee=new Rt;let Q=null;const xe=new Rt(0,0,0,0);return{setMask:function(fe){Q!==fe&&!O&&(i.colorMask(fe,fe,fe,fe),Q=fe)},setLocked:function(fe){O=fe},setClear:function(fe,ge,Ne,Ze,le){le===!0&&(fe*=Ze,ge*=Ze,Ne*=Ze),ee.set(fe,ge,Ne,Ze),xe.equals(ee)===!1&&(i.clearColor(fe,ge,Ne,Ze),xe.copy(ee))},reset:function(){O=!1,Q=null,xe.set(-1,0,0,0)}}}function n(){let O=!1,ee=!1,Q=null,xe=null,fe=null;return{setReversed:function(ge){if(ee!==ge){const Ne=e.get("EXT_clip_control");ge?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ee=ge;const Ze=fe;fe=null,this.setClear(Ze)}},getReversed:function(){return ee},setTest:function(ge){ge?ye(i.DEPTH_TEST):Ve(i.DEPTH_TEST)},setMask:function(ge){Q!==ge&&!O&&(i.depthMask(ge),Q=ge)},setFunc:function(ge){if(ee&&(ge=ou[ge]),xe!==ge){switch(ge){case Wr:i.depthFunc(i.NEVER);break;case Xr:i.depthFunc(i.ALWAYS);break;case qr:i.depthFunc(i.LESS);break;case os:i.depthFunc(i.LEQUAL);break;case Yr:i.depthFunc(i.EQUAL);break;case Kr:i.depthFunc(i.GEQUAL);break;case Zr:i.depthFunc(i.GREATER);break;case $r:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ge}},setLocked:function(ge){O=ge},setClear:function(ge){fe!==ge&&(fe=ge,ee&&(ge=1-ge),i.clearDepth(ge))},reset:function(){O=!1,Q=null,xe=null,fe=null,ee=!1}}}function s(){let O=!1,ee=null,Q=null,xe=null,fe=null,ge=null,Ne=null,Ze=null,le=null;return{setTest:function(Ae){O||(Ae?ye(i.STENCIL_TEST):Ve(i.STENCIL_TEST))},setMask:function(Ae){ee!==Ae&&!O&&(i.stencilMask(Ae),ee=Ae)},setFunc:function(Ae,Be,ve){(Q!==Ae||xe!==Be||fe!==ve)&&(i.stencilFunc(Ae,Be,ve),Q=Ae,xe=Be,fe=ve)},setOp:function(Ae,Be,ve){(ge!==Ae||Ne!==Be||Ze!==ve)&&(i.stencilOp(Ae,Be,ve),ge=Ae,Ne=Be,Ze=ve)},setLocked:function(Ae){O=Ae},setClear:function(Ae){le!==Ae&&(i.clearStencil(Ae),le=Ae)},reset:function(){O=!1,ee=null,Q=null,xe=null,fe=null,ge=null,Ne=null,Ze=null,le=null}}}const r=new t,a=new n,o=new s;let c={};const l=new WeakMap;let f={},g={},p={},m=new WeakMap,M=[],T=null,h=!1,u=null,v=null,w=null,A=null,y=null,S=null,_=null,x=new nt(0,0,0),D=0,P=!1,C=null,N=null,X=null,U=null,W=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ne=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=ne>=1):Z.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=ne>=2);let ie=null,oe={};const me=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),te=new Rt().fromArray(me),Me=new Rt().fromArray(Fe);function Te(O,ee,Q,xe){const fe=new Uint8Array(4),ge=i.createTexture();i.bindTexture(O,ge),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<Q;Ne++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ee+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return ge}const Re={};Re[i.TEXTURE_2D]=Te(i.TEXTURE_2D,i.TEXTURE_2D,1),Re[i.TEXTURE_CUBE_MAP]=Te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[i.TEXTURE_2D_ARRAY]=Te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Re[i.TEXTURE_3D]=Te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(i.DEPTH_TEST),a.setFunc(os),et(!1),We(so),ye(i.CULL_FACE),Se(Di);function ye(O){f[O]!==!0&&(i.enable(O),f[O]=!0)}function Ve(O){f[O]!==!1&&(i.disable(O),f[O]=!1)}function St(O,ee){return p[O]!==ee?(i.bindFramebuffer(O,ee),p[O]=ee,O===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ee),O===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Pe(O,ee){let Q=M,xe=!1;if(O){Q=m.get(ee),Q===void 0&&(Q=[],m.set(ee,Q));const fe=O.textures;if(Q.length!==fe.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let ge=0,Ne=fe.length;ge<Ne;ge++)Q[ge]=i.COLOR_ATTACHMENT0+ge;Q.length=fe.length,xe=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,xe=!0);xe&&i.drawBuffers(Q)}function at(O){return T!==O?(i.useProgram(O),T=O,!0):!1}const ut={[Ci]:i.FUNC_ADD,[Rc]:i.FUNC_SUBTRACT,[Cc]:i.FUNC_REVERSE_SUBTRACT};ut[Pc]=i.MIN,ut[Lc]=i.MAX;const Ie={[Dc]:i.ZERO,[Ic]:i.ONE,[Nc]:i.SRC_COLOR,[vl]:i.SRC_ALPHA,[Gc]:i.SRC_ALPHA_SATURATE,[Bc]:i.DST_COLOR,[Fc]:i.DST_ALPHA,[Uc]:i.ONE_MINUS_SRC_COLOR,[Ml]:i.ONE_MINUS_SRC_ALPHA,[zc]:i.ONE_MINUS_DST_COLOR,[Oc]:i.ONE_MINUS_DST_ALPHA,[Hc]:i.CONSTANT_COLOR,[kc]:i.ONE_MINUS_CONSTANT_COLOR,[Vc]:i.CONSTANT_ALPHA,[Wc]:i.ONE_MINUS_CONSTANT_ALPHA};function Se(O,ee,Q,xe,fe,ge,Ne,Ze,le,Ae){if(O===Di){h===!0&&(Ve(i.BLEND),h=!1);return}if(h===!1&&(ye(i.BLEND),h=!0),O!==wc){if(O!==u||Ae!==P){if((v!==Ci||y!==Ci)&&(i.blendEquation(i.FUNC_ADD),v=Ci,y=Ci),Ae)switch(O){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFunc(i.ONE,i.ONE);break;case ro:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ao:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:pt("WebGLState: Invalid blending: ",O);break}else switch(O){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ro:pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ao:pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:pt("WebGLState: Invalid blending: ",O);break}w=null,A=null,S=null,_=null,x.set(0,0,0),D=0,u=O,P=Ae}return}fe=fe||ee,ge=ge||Q,Ne=Ne||xe,(ee!==v||fe!==y)&&(i.blendEquationSeparate(ut[ee],ut[fe]),v=ee,y=fe),(Q!==w||xe!==A||ge!==S||Ne!==_)&&(i.blendFuncSeparate(Ie[Q],Ie[xe],Ie[ge],Ie[Ne]),w=Q,A=xe,S=ge,_=Ne),(Ze.equals(x)===!1||le!==D)&&(i.blendColor(Ze.r,Ze.g,Ze.b,le),x.copy(Ze),D=le),u=O,P=!1}function ze(O,ee){O.side===qt?Ve(i.CULL_FACE):ye(i.CULL_FACE);let Q=O.side===Qt;ee&&(Q=!Q),et(Q),O.blending===ss&&O.transparent===!1?Se(Di):Se(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const xe=O.stencilWrite;o.setTest(xe),xe&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ce(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ye(i.SAMPLE_ALPHA_TO_COVERAGE):Ve(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(O){C!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),C=O)}function We(O){O!==bc?(ye(i.CULL_FACE),O!==N&&(O===so?i.cullFace(i.BACK):O===Tc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ve(i.CULL_FACE),N=O}function Ye(O){O!==X&&(Y&&i.lineWidth(O),X=O)}function Ce(O,ee,Q){O?(ye(i.POLYGON_OFFSET_FILL),(U!==ee||W!==Q)&&(U=ee,W=Q,a.getReversed()&&(ee=-ee,Q=-Q),i.polygonOffset(ee,Q))):Ve(i.POLYGON_OFFSET_FILL)}function Tt(O){O?ye(i.SCISSOR_TEST):Ve(i.SCISSOR_TEST)}function xt(O){O===void 0&&(O=i.TEXTURE0+$-1),ie!==O&&(i.activeTexture(O),ie=O)}function ft(O,ee,Q){Q===void 0&&(ie===null?Q=i.TEXTURE0+$-1:Q=ie);let xe=oe[Q];xe===void 0&&(xe={type:void 0,texture:void 0},oe[Q]=xe),(xe.type!==O||xe.texture!==ee)&&(ie!==Q&&(i.activeTexture(Q),ie=Q),i.bindTexture(O,ee||Re[O]),xe.type=O,xe.texture=ee)}function k(){const O=oe[ie];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Lt(){try{i.compressedTexImage2D(...arguments)}catch(O){pt("WebGLState:",O)}}function $e(){try{i.compressedTexImage3D(...arguments)}catch(O){pt("WebGLState:",O)}}function ht(){try{i.texSubImage2D(...arguments)}catch(O){pt("WebGLState:",O)}}function he(){try{i.texSubImage3D(...arguments)}catch(O){pt("WebGLState:",O)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch(O){pt("WebGLState:",O)}}function Ue(){try{i.compressedTexSubImage3D(...arguments)}catch(O){pt("WebGLState:",O)}}function Ge(){try{i.texStorage2D(...arguments)}catch(O){pt("WebGLState:",O)}}function L(){try{i.texStorage3D(...arguments)}catch(O){pt("WebGLState:",O)}}function b(){try{i.texImage2D(...arguments)}catch(O){pt("WebGLState:",O)}}function q(){try{i.texImage3D(...arguments)}catch(O){pt("WebGLState:",O)}}function ce(O){return g[O]!==void 0?g[O]:i.getParameter(O)}function J(O,ee){g[O]!==ee&&(i.pixelStorei(O,ee),g[O]=ee)}function pe(O){te.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),te.copy(O))}function de(O){Me.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Me.copy(O))}function j(O,ee){let Q=l.get(ee);Q===void 0&&(Q=new WeakMap,l.set(ee,Q));let xe=Q.get(O);xe===void 0&&(xe=i.getUniformBlockIndex(ee,O.name),i.uniformBlockBinding(ee,xe,xe),Q.set(O,xe))}function se(O,ee,Q){const fe=l.get(ee).get(O);c[fe]!==Q&&(i.bindBufferBase(i.UNIFORM_BUFFER,fe,Q),c[fe]=Q)}function _e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},g={},ie=null,oe={},p={},c={},m=new WeakMap,M=[],T=null,h=!1,u=null,v=null,w=null,A=null,y=null,S=null,_=null,x=new nt(0,0,0),D=0,P=!1,C=null,N=null,X=null,U=null,W=null,te.set(0,0,i.canvas.width,i.canvas.height),Me.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:Ve,bindFramebuffer:St,drawBuffers:Pe,useProgram:at,setBlending:Se,setMaterial:ze,setFlipSided:et,setCullFace:We,setLineWidth:Ye,setPolygonOffset:Ce,setScissorTest:Tt,activeTexture:xt,bindTexture:ft,unbindTexture:k,compressedTexImage2D:Lt,compressedTexImage3D:$e,texImage2D:b,texImage3D:q,pixelStorei:J,getParameter:ce,updateUBOMapping:j,uniformBlockBinding:se,texStorage2D:Ge,texStorage3D:L,texSubImage2D:ht,texSubImage3D:he,compressedTexSubImage2D:ot,compressedTexSubImage3D:Ue,scissor:pe,viewport:de,reset:_e}}function qm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,f=new WeakMap,g=new Set;let p;const m=new WeakMap,M=new Set,T=new FinalizationRegistry(L=>M.delete(L));let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(L,b){return h?new OffscreenCanvas(L,b):ir("canvas")}function v(L,b,q){let ce=1;const J=Ge(L);if((J.width>q||J.height>q)&&(ce=q/Math.max(J.width,J.height)),ce<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const pe=Math.floor(ce*J.width),de=Math.floor(ce*J.height);p===void 0&&(p=u(pe,de));const j=b?u(pe,de):p;return j.width=pe,j.height=de,j.getContext("2d").drawImage(L,0,0,pe,de),Xe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+pe+"x"+de+")."),j}else return"data"in L&&Xe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),L;return L}function w(L){return L.generateMipmaps}function A(L){i.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(L,b,q,ce,J,pe=!1){if(L!==null){if(i[L]!==void 0)return i[L];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let de;ce&&(de=e.get("EXT_texture_norm16"),de||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=b;if(b===i.RED&&(q===i.FLOAT&&(j=i.R32F),q===i.HALF_FLOAT&&(j=i.R16F),q===i.UNSIGNED_BYTE&&(j=i.R8),q===i.UNSIGNED_SHORT&&de&&(j=de.R16_EXT),q===i.SHORT&&de&&(j=de.R16_SNORM_EXT)),b===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(j=i.R8UI),q===i.UNSIGNED_SHORT&&(j=i.R16UI),q===i.UNSIGNED_INT&&(j=i.R32UI),q===i.BYTE&&(j=i.R8I),q===i.SHORT&&(j=i.R16I),q===i.INT&&(j=i.R32I)),b===i.RG&&(q===i.FLOAT&&(j=i.RG32F),q===i.HALF_FLOAT&&(j=i.RG16F),q===i.UNSIGNED_BYTE&&(j=i.RG8),q===i.UNSIGNED_SHORT&&de&&(j=de.RG16_EXT),q===i.SHORT&&de&&(j=de.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(j=i.RG8UI),q===i.UNSIGNED_SHORT&&(j=i.RG16UI),q===i.UNSIGNED_INT&&(j=i.RG32UI),q===i.BYTE&&(j=i.RG8I),q===i.SHORT&&(j=i.RG16I),q===i.INT&&(j=i.RG32I)),b===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(j=i.RGB8UI),q===i.UNSIGNED_SHORT&&(j=i.RGB16UI),q===i.UNSIGNED_INT&&(j=i.RGB32UI),q===i.BYTE&&(j=i.RGB8I),q===i.SHORT&&(j=i.RGB16I),q===i.INT&&(j=i.RGB32I)),b===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),q===i.UNSIGNED_INT&&(j=i.RGBA32UI),q===i.BYTE&&(j=i.RGBA8I),q===i.SHORT&&(j=i.RGBA16I),q===i.INT&&(j=i.RGBA32I)),b===i.RGB&&(q===i.UNSIGNED_SHORT&&de&&(j=de.RGB16_EXT),q===i.SHORT&&de&&(j=de.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),b===i.RGBA){const se=pe?nr:ct.getTransfer(J);q===i.FLOAT&&(j=i.RGBA32F),q===i.HALF_FLOAT&&(j=i.RGBA16F),q===i.UNSIGNED_BYTE&&(j=se===Mt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&de&&(j=de.RGBA16_EXT),q===i.SHORT&&de&&(j=de.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function _(L,b){let q;return L?b===null||b===Tn||b===Ui?q=i.DEPTH24_STENCIL8:b===gn?q=i.DEPTH32F_STENCIL8:b===cs&&(q=i.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Tn||b===Ui?q=i.DEPTH_COMPONENT24:b===gn?q=i.DEPTH_COMPONENT32F:b===cs&&(q=i.DEPTH_COMPONENT16),q}function x(L,b){return w(L)===!0||L.isFramebufferTexture&&L.minFilter!==Bt&&L.minFilter!==Jt?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function D(L){const b=new WeakRef(L);n.get(L).__ref=b,M.add(b),T.register(L,b,b)}function P(L){const b=n.get(L).__ref;b!==void 0&&(M.delete(b),T.unregister(b))}function C(L){X(L.target)}function N(L){U(L.target)}function X(L){L.removeEventListener("dispose",C),P(L),$(L),L.isVideoTexture&&f.delete(L),L.isHTMLTexture&&g.delete(L)}function U(L){L.removeEventListener("dispose",N),P(L),ne(L)}function W(){for(const L of M){const b=L.deref();b!==void 0&&(b.isRenderTarget===!0?U(b):X(b))}M.clear(),g.clear()}function $(L){const b=n.get(L);if(b.__webglInit===void 0)return;const q=L.source,ce=m.get(q);if(ce){const J=ce[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&Y(L),Object.keys(ce).length===0&&m.delete(q)}n.remove(L)}function Y(L){const b=n.get(L);i.deleteTexture(b.__webglTexture);const q=L.source,ce=m.get(q);delete ce[b.__cacheKey],a.memory.textures--}function ne(L){const b=n.get(L);b.__depthDisposeCallback&&b.__depthDisposeCallback();const q=L.depthTexture;if(q&&q.renderTarget===L&&X(q),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let pe=0;pe<b.__webglFramebuffer[J].length;pe++)i.deleteFramebuffer(b.__webglFramebuffer[J][pe]);else i.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)i.deleteFramebuffer(b.__webglFramebuffer[J]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const ce=L.textures;for(let J=0,pe=ce.length;J<pe;J++){const de=n.get(ce[J]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(ce[J])}n.remove(L)}let Z=0;function ie(){Z=0}function oe(){return Z}function me(L){Z=L}function Fe(){const L=Z;return L>=s.maxTextures&&Xe("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),Z+=1,L}function te(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.mipmapsAutoUpdate),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function Me(L,b){const q=n.get(L);if(L.isVideoTexture&&ot(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&q.__version!==L.version){const ce=L.image;if(ce===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{ze(q,L,b);return}}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+b)}function Te(L,b){const q=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){ze(q,L,b);return}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+b)}function Re(L,b){const q=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){ze(q,L,b);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+b)}function ye(L,b){const q=n.get(L);if(L.version>0&&q.__version!==L.version){et(q,L,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+b)}const Ve={[Jr]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[Qr]:i.MIRRORED_REPEAT},St={[Bt]:i.NEAREST,[Yc]:i.NEAREST_MIPMAP_NEAREST,[_s]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[_r]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},Pe={[Jc]:i.NEVER,[Ol]:i.ALWAYS,[Qc]:i.LESS,[Ul]:i.LEQUAL,[jc]:i.EQUAL,[Fl]:i.GEQUAL,[eu]:i.GREATER,[tu]:i.NOTEQUAL};function at(L,b){if(b.type===gn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Jt||b.magFilter===_r||b.magFilter===_s||b.magFilter===Yn||b.minFilter===Jt||b.minFilter===_r||b.minFilter===_s||b.minFilter===Yn)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,Ve[b.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,Ve[b.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,Ve[b.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,St[b.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,St[b.minFilter]),b.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Bt||b.minFilter!==_s&&b.minFilter!==Yn||b.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ut(L,b){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",C),D(b));const ce=b.source;let J=m.get(ce);J===void 0&&(J={},m.set(ce,J));const pe=te(b);if(pe!==L.__cacheKey){J[pe]===void 0&&(J[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),J[pe].usedTimes++;const de=J[L.__cacheKey];de!==void 0&&(J[L.__cacheKey].usedTimes--,de.usedTimes===0&&Y(b)),L.__cacheKey=pe,L.__webglTexture=J[pe].texture}return q}function Ie(L,b,q){return Math.floor(Math.floor(L/q)/b)}function Se(L,b,q,ce){const pe=L.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,q,ce,b.data);else{pe.sort((O,ee)=>O.start-ee.start);let de=0;for(let O=1;O<pe.length;O++){const ee=pe[de],Q=pe[O],xe=ee.start+ee.count,fe=Ie(Q.start,b.width,4),ge=Ie(ee.start,b.width,4);Q.start<=xe+1&&fe===ge&&Ie(Q.start+Q.count-1,b.width,4)===fe?ee.count=Math.max(ee.count,Q.start+Q.count-ee.start):(++de,pe[de]=Q)}pe.length=de+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),_e=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let O=0,ee=pe.length;O<ee;O++){const Q=pe[O],xe=Math.floor(Q.start/4),fe=Math.ceil(Q.count/4),ge=xe%b.width,Ne=Math.floor(xe/b.width),Ze=fe,le=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ne),t.texSubImage2D(i.TEXTURE_2D,0,ge,Ne,Ze,le,q,ce,b.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,_e)}}function ze(L,b,q){let ce=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ce=i.TEXTURE_3D);const J=ut(L,b),pe=b.source;t.bindTexture(ce,L.__webglTexture,i.TEXTURE0+q);const de=n.get(pe);if(pe.version!==de.__version||J===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const le=ct.getPrimaries(ct.workingColorSpace),Ae=b.colorSpace===qn?null:ct.getPrimaries(b.colorSpace),Be=b.colorSpace===qn||le===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let se=v(b.image,!1,s.maxTextureSize);se=Ue(b,se);const _e=r.convert(b.format,b.colorSpace),O=r.convert(b.type);let ee=S(b.internalFormat,_e,O,b.normalized,b.colorSpace,b.isVideoTexture);at(ce,b);let Q;const xe=b.mipmaps,fe=b.isVideoTexture!==!0,ge=de.__version===void 0||J===!0,Ne=pe.dataReady,Ze=x(b,se);if(b.isDepthTexture)ee=_(b.format===Kn,b.type),ge&&(fe?t.texStorage2D(i.TEXTURE_2D,1,ee,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,ee,se.width,se.height,0,_e,O,null));else if(b.isDataTexture)if(xe.length>0){fe&&ge&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,xe[0].width,xe[0].height);for(let le=0,Ae=xe.length;le<Ae;le++)Q=xe[le],fe?Ne&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Q.width,Q.height,_e,O,Q.data):t.texImage2D(i.TEXTURE_2D,le,ee,Q.width,Q.height,0,_e,O,Q.data);b.generateMipmaps=!1}else fe?(ge&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,se.width,se.height),Ne&&Se(b,se,_e,O)):t.texImage2D(i.TEXTURE_2D,0,ee,se.width,se.height,0,_e,O,se.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){fe&&ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ze,ee,xe[0].width,xe[0].height,se.depth);for(let le=0,Ae=xe.length;le<Ae;le++)if(Q=xe[le],b.format!==En)if(_e!==null)if(fe){if(Ne)if(b.layerUpdates.size>0){const Be=qo(Q.width,Q.height,b.format,b.type);for(const ve of b.layerUpdates){const it=Q.data.subarray(ve*Be/Q.data.BYTES_PER_ELEMENT,(ve+1)*Be/Q.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,ve,Q.width,Q.height,1,_e,it)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Q.width,Q.height,se.depth,_e,Q.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,ee,Q.width,Q.height,se.depth,0,Q.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?Ne&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Q.width,Q.height,se.depth,_e,O,Q.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,ee,Q.width,Q.height,se.depth,0,_e,O,Q.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{fe&&ge&&t.texStorage2D(i.TEXTURE_2D,Ze,ee,xe[0].width,xe[0].height);for(let le=0,Ae=xe.length;le<Ae;le++)Q=xe[le],b.format!==En?_e!==null?fe?Ne&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,Q.width,Q.height,_e,Q.data):t.compressedTexImage2D(i.TEXTURE_2D,le,ee,Q.width,Q.height,0,Q.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?Ne&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Q.width,Q.height,_e,O,Q.data):t.texImage2D(i.TEXTURE_2D,le,ee,Q.width,Q.height,0,_e,O,Q.data)}else if(b.isDataArrayTexture)if(fe){if(ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ze,ee,se.width,se.height,se.depth),Ne)if(b.layerUpdates.size>0){const le=qo(se.width,se.height,b.format,b.type);for(const Ae of b.layerUpdates){const Be=se.data.subarray(Ae*le/se.data.BYTES_PER_ELEMENT,(Ae+1)*le/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ae,se.width,se.height,1,_e,O,Be)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,_e,O,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ee,se.width,se.height,se.depth,0,_e,O,se.data);else if(b.isData3DTexture)fe?(ge&&t.texStorage3D(i.TEXTURE_3D,Ze,ee,se.width,se.height,se.depth),Ne&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,_e,O,se.data)):t.texImage3D(i.TEXTURE_3D,0,ee,se.width,se.height,se.depth,0,_e,O,se.data);else if(b.isFramebufferTexture){if(ge)if(fe)t.texStorage2D(i.TEXTURE_2D,Ze,ee,se.width,se.height);else{let le=se.width,Ae=se.height;for(let Be=0;Be<Ze;Be++)t.texImage2D(i.TEXTURE_2D,Be,ee,le,Ae,0,_e,O,null),le>>=1,Ae>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const le=i.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),se.parentNode!==le){le.appendChild(se),g.add(b),le.onpaint=Ae=>{const Be=Ae.changedElements;for(const ve of g)Be.includes(ve.image)&&(ve.needsUpdate=!0)},le.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{const Be=i.RGBA,ve=i.RGBA,it=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Be,ve,it,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xe.length>0){if(fe&&ge){const le=Ge(xe[0]);t.texStorage2D(i.TEXTURE_2D,Ze,ee,le.width,le.height)}for(let le=0,Ae=xe.length;le<Ae;le++)Q=xe[le],fe?Ne&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,_e,O,Q):t.texImage2D(i.TEXTURE_2D,le,ee,_e,O,Q);b.generateMipmaps=!1}else if(fe){if(ge){const le=Ge(se);t.texStorage2D(i.TEXTURE_2D,Ze,ee,le.width,le.height)}Ne&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,O,se)}else t.texImage2D(i.TEXTURE_2D,0,ee,_e,O,se);w(b)&&b.mipmapsAutoUpdate===!0&&A(ce),de.__version=pe.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function et(L,b,q){if(b.image.length!==6)return;const ce=ut(L,b),J=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+q);const pe=n.get(J);if(J.version!==pe.__version||ce===!0){t.activeTexture(i.TEXTURE0+q);const de=ct.getPrimaries(ct.workingColorSpace),j=b.colorSpace===qn?null:ct.getPrimaries(b.colorSpace),se=b.colorSpace===qn||de===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const _e=b.isCompressedTexture||b.image[0].isCompressedTexture,O=b.image[0]&&b.image[0].isDataTexture,ee=[];for(let ve=0;ve<6;ve++)!_e&&!O?ee[ve]=v(b.image[ve],!0,s.maxCubemapSize):ee[ve]=O?b.image[ve].image:b.image[ve],ee[ve]=Ue(b,ee[ve]);const Q=ee[0],xe=r.convert(b.format,b.colorSpace),fe=r.convert(b.type);let ge=S(b.internalFormat,xe,fe,b.normalized,b.colorSpace);const Ne=b.isVideoTexture!==!0,Ze=pe.__version===void 0||ce===!0,le=J.dataReady;let Ae=x(b,Q);at(i.TEXTURE_CUBE_MAP,b);let Be;if(b.isDepthTexture){if(ge=_(b.format===Kn,b.type),Ze)if(Ne)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ge,Q.width,Q.height);else for(let ve=0;ve<6;ve++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ge,Q.width,Q.height,0,xe,fe,null)}else if(_e){Ne&&Ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,ge,Q.width,Q.height);for(let ve=0;ve<6;ve++){Be=ee[ve].mipmaps;for(let it=0;it<Be.length;it++){const Ct=Be[it];b.format!==En?xe!==null?Ne?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it,0,0,Ct.width,Ct.height,xe,Ct.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it,ge,Ct.width,Ct.height,0,Ct.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it,0,0,Ct.width,Ct.height,xe,fe,Ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it,ge,Ct.width,Ct.height,0,xe,fe,Ct.data)}}}else{if(Be=b.mipmaps,Ne&&Ze){Be.length>0&&Ae++;const ve=Ge(ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,ge,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(O){Ne?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ee[ve].width,ee[ve].height,xe,fe,ee[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ge,ee[ve].width,ee[ve].height,0,xe,fe,ee[ve].data);for(let it=0;it<Be.length;it++){const ln=Be[it].image[ve].image;Ne?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it+1,0,0,ln.width,ln.height,xe,fe,ln.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it+1,ge,ln.width,ln.height,0,xe,fe,ln.data)}}else{Ne?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,xe,fe,ee[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ge,xe,fe,ee[ve]);for(let it=0;it<Be.length;it++){const Ct=Be[it];Ne?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it+1,0,0,xe,fe,Ct.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,it+1,ge,xe,fe,Ct.image[ve])}}}w(b)&&b.mipmapsAutoUpdate===!0&&A(i.TEXTURE_CUBE_MAP),pe.__version=J.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function We(L,b,q,ce,J,pe){const de=r.convert(q.format,q.colorSpace),j=r.convert(q.type),se=S(q.internalFormat,de,j,q.normalized,q.colorSpace),_e=n.get(b),O=n.get(q);if(O.__renderTarget=b,!_e.__hasExternalTextures){const ee=Math.max(1,b.width>>pe),Q=Math.max(1,b.height>>pe);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,pe,se,ee,Q,b.depth,0,de,j,null):t.texImage2D(J,pe,se,ee,Q,0,de,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),he(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,J,O.__webglTexture,0,ht(b)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,J,O.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(L,b,q){if(i.bindRenderbuffer(i.RENDERBUFFER,L),b.depthBuffer){const ce=b.depthTexture,J=ce&&ce.isDepthTexture?ce.type:null,pe=_(b.stencilBuffer,J),de=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;he(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(b),pe,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(b),pe,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,pe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,de,i.RENDERBUFFER,L)}else{const ce=b.textures;for(let J=0;J<ce.length;J++){const pe=ce[J],de=r.convert(pe.format,pe.colorSpace),j=r.convert(pe.type),se=S(pe.internalFormat,de,j,pe.normalized,pe.colorSpace);he(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(b),se,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(b),se,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,se,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(L,b,q){const ce=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=n.get(b.depthTexture);J.__renderTarget=b;const pe=ce?b.depthTexture.image[0]:b.depthTexture.image;(!J.__webglTexture||pe.width!==b.width||pe.height!==b.height)&&(pe.width=b.width,pe.height=b.height,b.depthTexture.needsUpdate=!0),ce?ye(b.depthTexture,0):Me(b.depthTexture,0);const de=J.__webglTexture,j=ht(b),se=ce?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,_e=b.depthTexture.format===Kn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===$n)he(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,de,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,de,0);else if(b.depthTexture.format===Kn)he(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,de,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Tt(L){const b=n.get(L),q=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){const ce=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ce){const J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ce.removeEventListener("dispose",J)};ce.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=ce}if(L.depthTexture&&!b.__autoAllocateDepthBuffer)if(q)for(let ce=0;ce<6;ce++)Ce(b.__webglFramebuffer[ce],L,ce);else L.texture.mipmaps.length>0?Ce(b.__webglFramebuffer[0],L,0):Ce(b.__webglFramebuffer,L,0);else if(q){b.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ce]),b.__webglDepthbuffer[ce]===void 0)b.__webglDepthbuffer[ce]=i.createRenderbuffer(),Ye(b.__webglDepthbuffer[ce],L,!1);else{const J=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=b.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,pe)}}else if(L.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ye(b.__webglDepthbuffer,L,!1);else{const J=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,pe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(L,b,q){const ce=n.get(L);b!==void 0&&We(ce.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&Tt(L)}function ft(L){const b=L.texture,q=n.get(L),ce=n.get(b);L.addEventListener("dispose",N),D(L);const J=L.textures,pe=L.isWebGLCubeRenderTarget===!0,de=J.length>1;if(de||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=b.version,a.memory.textures++),pe){q.__webglFramebuffer=[];for(let j=0;j<6;j++)if(b.mipmaps.length>0){q.__webglFramebuffer[j]=[];for(let se=0;se<b.mipmaps.length;se++)q.__webglFramebuffer[j][se]=i.createFramebuffer()}else q.__webglFramebuffer[j]=i.createFramebuffer()}else{if(b.mipmaps.length>0){q.__webglFramebuffer=[];for(let j=0;j<b.mipmaps.length;j++)q.__webglFramebuffer[j]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(de)for(let j=0,se=J.length;j<se;j++){const _e=n.get(J[j]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&he(L)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let j=0;j<J.length;j++){const se=J[j];q.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[j]);const _e=r.convert(se.format,se.colorSpace),O=r.convert(se.type),ee=S(se.internalFormat,_e,O,se.normalized,se.colorSpace,L.isXRRenderTarget===!0),Q=ht(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,ee,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,q.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(q.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),at(i.TEXTURE_CUBE_MAP,b);for(let j=0;j<6;j++)if(b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)We(q.__webglFramebuffer[j][se],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,se);else We(q.__webglFramebuffer[j],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);w(b)?A(i.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}else if(de){for(let j=0,se=J.length;j<se;j++){const _e=J[j],O=n.get(_e);let ee=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ee=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,O.__webglTexture),at(ee,_e),We(q.__webglFramebuffer,L,_e,i.COLOR_ATTACHMENT0+j,ee,0),w(_e)&&A(ee)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(j=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,ce.__webglTexture),at(j,b),b.mipmaps.length>0)for(let se=0;se<b.mipmaps.length;se++)We(q.__webglFramebuffer[se],L,b,i.COLOR_ATTACHMENT0,j,se);else We(q.__webglFramebuffer,L,b,i.COLOR_ATTACHMENT0,j,0);w(b)?A(j):b.mipmaps.length>0&&i.texParameteri(j,i.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}L.depthBuffer&&Tt(L)}function k(L){const b=L.textures;for(let q=0,ce=b.length;q<ce;q++){const J=b[q];if(w(J)&&J.mipmapsAutoUpdate===!0){const pe=y(L),de=n.get(J).__webglTexture;t.bindTexture(pe,de),A(pe),t.unbindTexture()}}}const Lt=[];function $e(L){if(L.samples>0){if(he(L)===!1){const b=L.textures,q=L.width,ce=L.height;let J=i.COLOR_BUFFER_BIT;const pe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=n.get(L),j=b.length>1;if(j)for(let _e=0;_e<b.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),L.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let _e=0;_e<b.length;_e++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,de.__webglColorRenderbuffer[_e]);const O=n.get(b[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,q,ce,0,0,q,ce,J,i.NEAREST),c===!0&&(Lt.length=0,Lt.push(i.COLOR_ATTACHMENT0+_e),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&Lt.push(pe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let _e=0;_e<b.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,de.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,de.__webglColorRenderbuffer[_e]);const O=n.get(b[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,de.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const b=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ht(L){return Math.min(s.maxSamples,L.samples)}function he(L){const b=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ot(L){const b=a.render.frame;f.get(L)!==b&&(f.set(L,b),L.update())}function Ue(L,b){const q=L.colorSpace,ce=L.format,J=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==tr&&q!==qn&&(ct.getTransfer(q)===Mt?(ce!==En||J!==tn)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):pt("WebGLTextures: Unsupported texture color space:",q)),b}function Ge(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=Fe,this.resetTextureUnits=ie,this.getTextureUnits=oe,this.setTextureUnits=me,this.setTexture2D=Me,this.setTexture2DArray=Te,this.setTexture3D=Re,this.setTextureCube=ye,this.rebindTextures=xt,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=We,this.useMultisampledRTT=he,this.dispose=W}function Ym(i,e){function t(n,s=qn){let r;const a=ct.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===Ba)return i.UNSIGNED_SHORT_4_4_4_4;if(n===za)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ll)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cl)return i.BYTE;if(n===Pl)return i.SHORT;if(n===cs)return i.UNSIGNED_SHORT;if(n===Oa)return i.INT;if(n===Tn)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===Il)return i.ALPHA;if(n===Nl)return i.RGB;if(n===En)return i.RGBA;if(n===$n)return i.DEPTH_COMPONENT;if(n===Kn)return i.DEPTH_STENCIL;if(n===Ga)return i.RED;if(n===Ha)return i.RED_INTEGER;if(n===ui)return i.RG;if(n===ka)return i.RG_INTEGER;if(n===Va)return i.RGBA_INTEGER;if(n===qs||n===Ys||n===Ks||n===Zs)if(a===Mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jr||n===ea||n===ta||n===na)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra||n===aa||n===oa||n===js||n===la)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return a===Mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===aa)return r.COMPRESSED_R11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===js)return r.COMPRESSED_RG11_EAC;if(n===la)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ca||n===ua||n===ha||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va||n===Ma||n===Sa||n===ya)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ca)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ua)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ha)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===da)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fa)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pa)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ma)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ga)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_a)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xa)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===va)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ma)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sa)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ya)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ea||n===ba||n===Ta)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ea)return a===Mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Aa||n===wa||n===er||n===Ra)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Aa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ra)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Km=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zm=`
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

}`;class $m{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Jl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new hi({vertexShader:Km,fragmentShader:Zm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jm extends Qn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,f=null,g=null,p=null,m=null,M=null;const T=typeof XRWebGLBinding<"u",h=new $m,u={},v=t.getContextAttributes();let w=null,A=null;const y=[],S=[],_=new ke;let x=null,D=null;const P=new pn;P.viewport=new Rt;const C=new pn;C.viewport=new Rt;const N=[P,C],X=new ah;let U=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Me=y[te];return Me===void 0&&(Me=new br,y[te]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(te){let Me=y[te];return Me===void 0&&(Me=new br,y[te]=Me),Me.getGripSpace()},this.getHand=function(te){let Me=y[te];return Me===void 0&&(Me=new br,y[te]=Me),Me.getHandSpace()};function $(te){const Me=S.indexOf(te.inputSource);if(Me===-1)return;const Te=y[Me];Te!==void 0&&(Te.update(te.inputSource,te.frame,l||a),Te.dispatchEvent({type:te.type,data:te.inputSource}))}function Y(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",ne);for(let te=0;te<y.length;te++){const Me=S[te];Me!==null&&(S[te]=null,y[te].disconnect(Me))}U=null,W=null,h.reset();for(const te in u)delete u[te];if(e.setRenderTarget(w),m=null,p=null,g=null,s=null,A=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(_.width,_.height,!1),D!==null){const te=D.camera;te.fov=D.fov,te.zoom=D.zoom,te.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,n.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return g===null&&T&&(g=new XRWebGLBinding(s,t)),g},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",ne),v.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(_),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Re=null,ye=null;v.depth&&(ye=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=v.stencil?Kn:$n,Re=v.stencil?Ui:Tn);const Ve={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};g=this.getBinding(),p=g.createProjectionLayer(Ve),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),A=new bn(p.textureWidth,p.textureHeight,{format:En,type:tn,depthTexture:new Fi(p.textureWidth,p.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{const Te={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Te),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new bn(m.framebufferWidth,m.framebufferHeight,{format:En,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ne(te){for(let Me=0;Me<te.removed.length;Me++){const Te=te.removed[Me],Re=S.indexOf(Te);Re>=0&&(S[Re]=null,y[Re].disconnect(Te))}for(let Me=0;Me<te.added.length;Me++){const Te=te.added[Me];let Re=S.indexOf(Te);if(Re===-1){for(let Ve=0;Ve<y.length;Ve++)if(Ve>=S.length){S.push(Te),Re=Ve;break}else if(S[Ve]===null){S[Ve]=Te,Re=Ve;break}if(Re===-1)break}const ye=y[Re];ye&&ye.connect(Te)}}function Z(te,Me){Me===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Me.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let Me=te.near,Te=te.far;h.texture!==null&&(h.depthNear>0&&(Me=h.depthNear),h.depthFar>0&&(Te=h.depthFar)),X.near=C.near=P.near=Me,X.far=C.far=P.far=Te,(U!==X.near||W!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),U=X.near,W=X.far),X.layers.mask=te.layers.mask|6,P.layers.mask=X.layers.mask&-5,C.layers.mask=X.layers.mask&-3;const Re=te.parent,ye=X.cameras;Z(X,Re);for(let Ve=0;Ve<ye.length;Ve++)Z(ye[Ve],Re);X.projectionMatrix.copy(P.projectionMatrix),X.projectionMatrixInverse.copy(P.projectionMatrixInverse),D===null&&te.isPerspectiveCamera&&(D={camera:te,fov:te.fov,zoom:te.zoom}),ie(te,X,Re)};function ie(te,Me,Te){Te===null?te.matrix.copy(Me.matrixWorld):(te.matrix.copy(Te.matrixWorld),te.matrix.invert(),te.matrix.multiply(Me.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Me.projectionMatrix),te.projectionMatrixInverse.copy(Me.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=hs*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(te){c=te,p!==null&&(p.fixedFoveation=te),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=te)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(X)},this.getCameraTexture=function(te){return u[te]};let oe=null;function me(te,Me){if(f=Me.getViewerPose(l||a),M=Me,f!==null){const Te=f.views;m!==null&&(e.setRenderTargetFramebuffer(A,m.framebuffer),e.setRenderTarget(A));let Re=!1;Te.length!==X.cameras.length&&(X.cameras.length=0,Re=!0);for(let Pe=0;Pe<Te.length;Pe++){const at=Te[Pe];let ut=null;if(m!==null)ut=m.getViewport(at);else{const Se=g.getViewSubImage(p,at);ut=Se.viewport,Pe===0&&(e.setRenderTargetTextures(A,Se.colorTexture,Se.depthStencilTexture),e.setRenderTarget(A))}let Ie=N[Pe];Ie===void 0&&(Ie=new pn,Ie.layers.enable(Pe),Ie.viewport=new Rt,N[Pe]=Ie),Ie.matrix.fromArray(at.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(at.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(ut.x,ut.y,ut.width,ut.height),Pe===0&&(X.matrix.copy(Ie.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Re===!0&&X.cameras.push(Ie)}const ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){g=n.getBinding();const Pe=g.getDepthInformation(Te[0]);Pe&&Pe.isValid&&Pe.texture&&h.init(Pe,s.renderState)}if(ye&&ye.includes("camera-access")&&T){e.state.unbindTexture(),g=n.getBinding();for(let Pe=0;Pe<Te.length;Pe++){const at=Te[Pe].camera;if(at){let ut=u[at];ut||(ut=new Jl,u[at]=ut);const Ie=g.getCameraImage(at);ut.sourceTexture=Ie}}}}for(let Te=0;Te<y.length;Te++){const Re=S[Te],ye=y[Te];Re!==null&&ye!==void 0&&ye.update(Re,Me,l||a)}oe&&oe(te,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),M=null}const Fe=new nc;Fe.setAnimationLoop(me),this.setAnimationLoop=function(te){oe=te},this.dispose=function(){}}}const Qm=new dt,dc=new Ke;dc.set(-1,0,0,0,1,0,0,0,1);function jm(i,e){function t(h,u){h.matrixAutoUpdate===!0&&h.updateMatrix(),u.value.copy(h.matrix)}function n(h,u){u.color.getRGB(h.fogColor.value,Ql(i)),u.isFog?(h.fogNear.value=u.near,h.fogFar.value=u.far):u.isFogExp2&&(h.fogDensity.value=u.density)}function s(h,u,v,w,A){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(h,u):u.isMeshLambertMaterial?(r(h,u),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(h,u),g(h,u)):u.isMeshPhongMaterial?(r(h,u),f(h,u),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(h,u),p(h,u),u.isMeshPhysicalMaterial&&m(h,u,A)):u.isMeshMatcapMaterial?(r(h,u),M(h,u)):u.isMeshDepthMaterial?r(h,u):u.isMeshDistanceMaterial?(r(h,u),T(h,u)):u.isMeshNormalMaterial?r(h,u):u.isLineBasicMaterial?(a(h,u),u.isLineDashedMaterial&&o(h,u)):u.isPointsMaterial?c(h,u,v,w):u.isSpriteMaterial?l(h,u):u.isShadowMaterial?(h.color.value.copy(u.color),h.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(h,u){h.opacity.value=u.opacity,u.color&&h.diffuse.value.copy(u.color),u.emissive&&h.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.bumpMap&&(h.bumpMap.value=u.bumpMap,t(u.bumpMap,h.bumpMapTransform),h.bumpScale.value=u.bumpScale,u.side===Qt&&(h.bumpScale.value*=-1)),u.normalMap&&(h.normalMap.value=u.normalMap,t(u.normalMap,h.normalMapTransform),h.normalScale.value.copy(u.normalScale),u.side===Qt&&h.normalScale.value.negate()),u.displacementMap&&(h.displacementMap.value=u.displacementMap,t(u.displacementMap,h.displacementMapTransform),h.displacementScale.value=u.displacementScale,h.displacementBias.value=u.displacementBias),u.emissiveMap&&(h.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,h.emissiveMapTransform)),u.specularMap&&(h.specularMap.value=u.specularMap,t(u.specularMap,h.specularMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest);const v=e.get(u),w=v.envMap,A=v.envMapRotation;w&&(h.envMap.value=w,h.envMapRotation.value.setFromMatrix4(Qm.makeRotationFromEuler(A)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(dc),h.reflectivity.value=u.reflectivity,h.ior.value=u.ior,h.refractionRatio.value=u.refractionRatio),u.lightMap&&(h.lightMap.value=u.lightMap,h.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,h.lightMapTransform)),u.aoMap&&(h.aoMap.value=u.aoMap,h.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,h.aoMapTransform))}function a(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform))}function o(h,u){h.dashSize.value=u.dashSize,h.totalSize.value=u.dashSize+u.gapSize,h.scale.value=u.scale}function c(h,u,v,w){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.size.value=u.size*v,h.scale.value=w*.5,u.map&&(h.map.value=u.map,t(u.map,h.uvTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function l(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.rotation.value=u.rotation,u.map&&(h.map.value=u.map,t(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,t(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function f(h,u){h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4)}function g(h,u){u.gradientMap&&(h.gradientMap.value=u.gradientMap)}function p(h,u){h.metalness.value=u.metalness,u.metalnessMap&&(h.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,h.metalnessMapTransform)),h.roughness.value=u.roughness,u.roughnessMap&&(h.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,h.roughnessMapTransform)),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)}function m(h,u,v){h.ior.value=u.ior,u.diffuseRoughness>0&&(h.diffuseRoughness.value=u.diffuseRoughness,u.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=u.diffuseRoughnessMap,t(u.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),u.sheen>0&&(h.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),h.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(h.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,h.sheenColorMapTransform)),u.sheenRoughnessMap&&(h.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,h.sheenRoughnessMapTransform))),u.clearcoat>0&&(h.clearcoat.value=u.clearcoat,h.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(h.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,h.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(h.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Qt&&h.clearcoatNormalScale.value.negate())),u.dispersion>0&&(h.dispersion.value=u.dispersion),u.retroreflectivity>0&&(h.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(h.iridescence.value=u.iridescence,h.iridescenceIOR.value=u.iridescenceIOR,h.iridescenceThicknessMinimum.value=u.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=u.iridescenceThicknessMaximum,u.iridescenceMap&&(h.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,h.iridescenceMapTransform)),u.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),u.transmission>0&&(h.transmission.value=u.transmission,h.transmissionSamplerMap.value=v.texture,h.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(h.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,h.transmissionMapTransform)),h.thickness.value=u.thickness,u.thicknessMap&&(h.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=u.attenuationDistance,h.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(h.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(h.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=u.specularIntensity,h.specularColor.value.copy(u.specularColor),u.specularColorMap&&(h.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,h.specularColorMapTransform)),u.specularIntensityMap&&(h.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,h.specularIntensityMapTransform))}function M(h,u){u.matcap&&(h.matcap.value=u.matcap)}function T(h,u){const v=e.get(u).light;h.referencePosition.value.setFromMatrixPosition(v.matrixWorld),h.nearDistance.value=v.shadow.camera.near,h.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function eg(i,e,t,n){let s={},r={};function a(v,w){const A=w.program;n.uniformBlockBinding(v,A,s[v.id])}function o(v,w){let A=s[v.id];A===void 0&&(M(v),A=c(v),s[v.id]=A,v.addEventListener("dispose",h));const y=w.program;n.updateUBOMapping(v,y);const S=e.render.frame;r[v.id]!==S&&(l(v),r[v.id]=S)}function c(v){const w=i.createBuffer(),A=v.__size,y=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,A,y),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function l(v){const w=s[v.id],A=v.uniforms,y=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let S=0,_=A.length;S<_;S++){const x=A[S];if(Array.isArray(x))for(let D=0,P=x.length;D<P;D++)f(x[D],S,D,y);else f(x,S,0,y)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,w,A,y){if(p(v,w,A,y)===!0){const S=v.__offset,_=v.value;if(Array.isArray(_)){let x=0;for(let D=0;D<_.length;D++){const P=_[D],C=T(P,!0);g(P,v.__data,x),x+=C.storage/Float32Array.BYTES_PER_ELEMENT}}else g(_,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,v.__data)}}function g(v,w,A){typeof v=="number"||typeof v=="boolean"?w[A]=v:v.isMatrix3?(w[A]=v.elements[0],w[A+1]=v.elements[1],w[A+2]=v.elements[2],w[A+3]=0,w[A+4]=v.elements[3],w[A+5]=v.elements[4],w[A+6]=v.elements[5],w[A+7]=0,w[A+8]=v.elements[6],w[A+9]=v.elements[7],w[A+10]=v.elements[8],w[A+11]=0):ArrayBuffer.isView(v)?w.set(v.subarray(0,w.length-A),A):v.toArray(w,A)}function p(v,w,A,y){const S=v.value,_=w+"_"+A;if(Array.isArray(S)){y[_]===void 0&&(y[_]=[]);const x=y[_];let D=!1;for(let P=0;P<S.length;P++)m(S[P],x,P)===!0&&(D=!0);return D}return m(S,y,_)}function m(v,w,A){if(w[A]===void 0)return typeof v=="number"||typeof v=="boolean"?w[A]=v:ArrayBuffer.isView(v)?w[A]=v.slice():w[A]=v.clone(),!0;{const y=w[A];if(typeof v=="number"||typeof v=="boolean"){if(y!==v)return w[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(y.equals(v)===!1)return y.copy(v),!0}}return!1}function M(v){const w=v.uniforms;let A=0;const y=16;for(let _=0,x=w.length;_<x;_++){const D=Array.isArray(w[_])?w[_]:[w[_]];for(let P=0,C=D.length;P<C;P++){const N=D[P],X=Array.isArray(N.value)?N.value:[N.value],U=Array.isArray(w[_])||Array.isArray(N.value);let W=A;for(let Y=0,ne=X.length;Y<ne;Y++){const Z=X[Y],ie=T(Z,U),oe=A%y,me=oe%ie.boundary,Fe=oe+me;A+=me,Fe!==0&&y-Fe<ie.storage&&(A+=y-Fe),Y===0&&(W=A),A+=ie.storage}const $=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new $((A-W)/Float32Array.BYTES_PER_ELEMENT),N.__offset=W}}const S=A%y;return S>0&&(A+=y-S),v.__size=A,v.__cache={},this}function T(v,w){const A={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(A.boundary=4,A.storage=4):v.isVector2?(A.boundary=8,A.storage=8):v.isVector3||v.isColor?(A.boundary=16,A.storage=12):v.isVector4?(A.boundary=16,A.storage=16):v.isMatrix3?(A.boundary=16,A.storage=48):v.isMatrix4?(A.boundary=16,A.storage=64):v.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(A.boundary=16,A.storage=v.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",v),w===!0&&(A.boundary=16,A.storage=Math.ceil(A.storage/16)*16),A}function h(v){const w=v.target;w.removeEventListener("dispose",h),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function u(){for(const v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:u}}const tg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Mn=null;function ng(){return Mn===null&&(Mn=new ql(tg,16,16,ui,An),Mn.name="DFG_LUT",Mn.minFilter=Jt,Mn.magFilter=Jt,Mn.wrapS=Fn,Mn.wrapT=Fn,Mn.generateMipmaps=!1,Mn.needsUpdate=!0),Mn}class ig{constructor(e={}){const{canvas:t=ru(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:p=!1,outputBufferType:m=tn}=e;this.isWebGLRenderer=!0;let M;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=n.getContextAttributes().alpha}else M=a;const T=m,h=new Set([Va,ka,Ha]),u=new Set([tn,Tn,cs,Ui,Ba,za]),v=new Uint32Array(4),w=new Int32Array(4),A={textures:[],min:[],max:[],resolution:[]};let y=null,S=null;const _=[],x=[];let D=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,N=null,X=null,U=null,W=null;this._outputColorSpace=$t;let $=0,Y=0,ne=null,Z=-1,ie=null;const oe=new Rt,me=new Rt;let Fe=null;const te=new nt(0);let Me=0,Te=t.width,Re=t.height,ye=1,Ve=null,St=null;const Pe=new Rt(0,0,Te,Re),at=new Rt(0,0,Te,Re);let ut=!1;const Ie=new ds,Se=new Za;let ze=!1,et=!1;const We=new dt,Ye=new H,Ce=new Rt,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function ft(){return ne===null?ye:1}let k=n;function Lt(d,E){return t.getContext(d,E)}let $e,ht,he,ot,Ue,Ge,L,b,q,ce,J,pe,de,j,se,_e,O,ee,Q,xe,fe,ge,Ne;try{const d={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ua}`),t.addEventListener("webglcontextlost",Ae,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",ve,!1),k===null){const E="webgl2";if(k=Lt(E,d),k===null)throw Lt(E)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ze()}catch(d){throw t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),pt("WebGLRenderer: "+d.message),d}function Ze(){$e=new ap(k),$e.init(),fe=new Ym(k,$e),ht=new Zf(k,$e,e,fe),he=new Xm(k,$e),ht.reversedDepthBuffer&&p&&he.buffers.depth.setReversed(!0),X=k.createFramebuffer(),U=k.createFramebuffer(),W=k.createFramebuffer(),ot=new cp(k),Ue=new Lm,Ge=new qm(k,$e,he,Ue,ht,fe,ot),L=new rp(P),b=new uh(k),ge=new Yf(k,b),q=new op(k,b,ot,ge),ce=new hp(k,q,b,ge,ot),ee=new up(k,ht,Ge),se=new $f(Ue),J=new Pm(P,L,$e,ht,ge,se),pe=new jm(P,Ue),de=new Im,j=new zm($e),O=new qf(P,L,he,ce,M,c),_e=new Wm(P,ce,ht),Ne=new eg(k,ot,ht,he),Q=new Kf(k,$e,ot),xe=new lp(k,$e,ot),ot.programs=J.programs,P.capabilities=ht,P.extensions=$e,P.properties=Ue,P.renderLists=de,P.shadowMap=_e,P.state=he,P.info=ot}T!==tn&&(D=new fp(T,t.width,t.height,o,s,r));const le=new Jm(P,k);this.xr=le,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const d=$e.get("WEBGL_lose_context");d&&d.loseContext()},this.forceContextRestore=function(){const d=$e.get("WEBGL_lose_context");d&&d.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(d){d!==void 0&&(ye=d,this.setSize(Te,Re,!1))},this.getSize=function(d){return d.set(Te,Re)},this.setSize=function(d,E,F=!0){if(le.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=d,Re=E,t.width=Math.floor(d*ye),t.height=Math.floor(E*ye),F===!0&&(t.style.width=d+"px",t.style.height=E+"px"),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,d,E)},this.getDrawingBufferSize=function(d){return d.set(Te*ye,Re*ye).floor()},this.setDrawingBufferSize=function(d,E,F){Te=d,Re=E,ye=F,t.width=Math.floor(d*F),t.height=Math.floor(E*F),this.setViewport(0,0,d,E)},this.setEffects=function(d){if(T===tn){pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(d){for(let E=0;E<d.length;E++)if(d[E].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(d||[])},this.getCurrentViewport=function(d){return d.copy(oe)},this.getViewport=function(d){return d.copy(Pe)},this.setViewport=function(d,E,F,G){d.isVector4?Pe.set(d.x,d.y,d.z,d.w):Pe.set(d,E,F,G),he.viewport(oe.copy(Pe).multiplyScalar(ft()).round())},this.getScissor=function(d){return d.copy(at)},this.setScissor=function(d,E,F,G){d.isVector4?at.set(d.x,d.y,d.z,d.w):at.set(d,E,F,G),he.scissor(me.copy(at).multiplyScalar(ft()).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(d){he.setScissorTest(ut=d)},this.setOpaqueSort=function(d){Ve=d},this.setTransparentSort=function(d){St=d},this.getClearColor=function(d){return d.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(d=!0,E=!0,F=!0){let G=0;if(d){let B=!1;if(ne!==null){const re=ne.texture.format;B=h.has(re)}if(B){const re=ne.texture.type,ue=u.has(re),ae=O.getClearColor(),K=O.getClearAlpha(),V=ae.r,Le=ae.g,Je=ae.b;ue?(v[0]=V,v[1]=Le,v[2]=Je,v[3]=K,k.clearBufferuiv(k.COLOR,0,v)):(w[0]=V,w[1]=Le,w[2]=Je,w[3]=K,k.clearBufferiv(k.COLOR,0,w))}else G|=k.COLOR_BUFFER_BIT}E&&(G|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),F&&(G|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&k.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(d){d.setRenderer(this),N=d},this.dispose=function(){t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),O.dispose(),de.dispose(),j.dispose(),Ge.dispose(),Ue.dispose(),L.dispose(),ce.dispose(),q.dispose(),ge.dispose(),Ne.dispose(),J.dispose(),le.dispose(),le.removeEventListener("sessionstart",Gi),le.removeEventListener("sessionend",mi),sn.stop()};function Ae(d){d.preventDefault(),co("WebGLRenderer: Context Lost."),C=!0}function Be(){co("WebGLRenderer: Context Restored."),C=!1;const d=ot.autoReset,E=_e.enabled,F=_e.autoUpdate,G=_e.needsUpdate,B=_e.type;Ze(),ot.autoReset=d,_e.enabled=E,_e.autoUpdate=F,_e.needsUpdate=G,_e.type=B}function ve(d){pt("WebGLRenderer: A WebGL context could not be created. Reason: ",d.statusMessage)}function it(d){const E=d.target;E.removeEventListener("dispose",it),Ct(E)}function Ct(d){ln(d),Ue.remove(d)}function ln(d){const E=Ue.get(d).programs;E!==void 0&&(E.forEach(function(F){J.releaseProgram(F)}),d.isShaderMaterial&&J.releaseShaderCache(d))}this.renderBufferDirect=function(d,E,F,G,B,re){E===null&&(E=Tt);const ue=B.isMesh&&B.matrixWorld.determinantAffine()<0,ae=fr(d,E,F,G,B);he.setMaterial(G,ue);let K=F.index,V=1;if(G.wireframe===!0){if(K=q.getWireframeAttribute(F),K===void 0)return;V=2}const Le=F.drawRange,Je=F.attributes.position;let we=Le.start*V,Qe=(Le.start+Le.count)*V;re!==null&&(we=Math.max(we,re.start*V),Qe=Math.min(Qe,(re.start+re.count)*V)),K!==null?(we=Math.max(we,0),Qe=Math.min(Qe,K.count)):Je!=null&&(we=Math.max(we,0),Qe=Math.min(Qe,Je.count));const yt=Qe-we;if(yt<0||yt===1/0)return;ge.setup(B,G,ae,F,K);let lt,je=Q;if(K!==null&&(lt=b.get(K),je=xe,je.setIndex(lt)),B.isMesh)G.wireframe===!0?(he.setLineWidth(G.wireframeLinewidth*ft()),je.setMode(k.LINES)):je.setMode(k.TRIANGLES);else if(B.isLine){let He=G.linewidth;He===void 0&&(He=1),he.setLineWidth(He*ft()),B.isLineSegments?je.setMode(k.LINES):B.isLineLoop?je.setMode(k.LINE_LOOP):je.setMode(k.LINE_STRIP)}else B.isPoints?je.setMode(k.POINTS):B.isSprite&&je.setMode(k.TRIANGLES);if(B.isBatchedMesh)if($e.get("WEBGL_multi_draw"))je.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const He=B._multiDrawStarts,Ee=B._multiDrawCounts,At=B._multiDrawCount,qe=K?b.get(K).bytesPerElement:1,De=Ue.get(G).currentProgram.getUniforms();for(let mt=0;mt<At;mt++)De.setValue(k,"_gl_DrawID",mt),je.render(He[mt]/qe,Ee[mt])}else if(B.isInstancedMesh)je.renderInstances(we,yt,B.count);else if(F.isInstancedBufferGeometry){const He=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Ee=Math.min(F.instanceCount,He);je.renderInstances(we,yt,Ee)}else je.render(we,yt)};function wt(d,E,F,G){N!==null&&d.isNodeMaterial&&N.setObject(G,d),ze===!0&&se.setState(d,F,!1),d.transparent===!0&&d.side===qt&&d.forceSinglePass===!1?(d.side=Qt,d.needsUpdate=!0,Gn(d,E,G),d.side=ci,d.needsUpdate=!0,Gn(d,E,G),d.side=qt):Gn(d,E,G)}this.compile=function(d,E,F=null){F===null&&(F=d),N!==null&&N.renderStart(d,E,F),S=j.get(F),S.init(E),x.push(S),F.traverseVisible(function(B){B.isLight&&B.layers.test(E.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),d!==F&&d.traverseVisible(function(B){B.isLight&&B.layers.test(E.layers)&&(S.pushLight(B),B.castShadow&&S.pushShadow(B))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),et=this.localClippingEnabled,ze=se.init(this.clippingPlanes,et),ze===!0&&se.setGlobalState(this.clippingPlanes,E),N!==null&&_e.render(S.state.shadowsArray,F,E);const G=new Set;return d.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const re=B.material;if(re)if(Array.isArray(re))for(let ue=0;ue<re.length;ue++){const ae=re[ue];wt(ae,F,E,B),G.add(ae)}else wt(re,F,E,B),G.add(re)}),S=x.pop(),N!==null&&N.renderEnd(),G},this.compileAsync=function(d,E,F=null){const G=this.compile(d,E,F);return new Promise(B=>{function re(){if(G.forEach(function(ue){const K=Ue.get(ue).currentProgram;(K===void 0||K.isReady())&&G.delete(ue)}),G.size===0){B(d);return}setTimeout(re,10)}$e.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let jn=null;function ei(d){jn&&jn(d)}function Gi(){sn.stop()}function mi(){sn.start()}const sn=new nc;sn.setAnimationLoop(ei),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(d){jn=d,le.setAnimationLoop(d),d===null?sn.stop():sn.start()},le.addEventListener("sessionstart",Gi),le.addEventListener("sessionend",mi),this.render=function(d,E){if(E!==void 0&&E.isCamera!==!0){pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(d,E);const F=le.enabled===!0&&le.isPresenting===!0,G=D!==null&&(ne===null||F)&&D.begin(P,ne);if(d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),E.parent===null&&E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(E),E=le.getCamera()),d.isScene===!0&&d.onBeforeRender(P,d,E,ne),S=j.get(d,x.length),S.init(E),S.state.textureUnits=Ge.getTextureUnits(),x.push(S),We.multiplyMatrices(E.projectionMatrix,E.matrixWorldInverse),E.isArrayCamera?Se.setFromArrayCamera(E):Ie.setFromProjectionMatrix(We,_n,E.reversedDepth),et=this.localClippingEnabled,ze=se.init(this.clippingPlanes,et),y=de.get(d,_.length),y.init(),_.push(y),this.info.render.frame++,le.enabled===!0&&le.isPresenting===!0){const ue=P.xr.getDepthSensingMesh();ue!==null&&Rn(ue,E,-1/0,P.sortObjects)}Rn(d,E,0,P.sortObjects),y.finish(),N!==null&&N.updateLights(S.state.lightsArray),P.sortObjects===!0&&y.sort(Ve,St),xt=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,xt&&O.addToRenderList(y,d),this.info.autoReset===!0&&this.info.reset(),ze===!0&&se.beginShadows();const B=S.state.shadowsArray;if(_e.render(B,d,E),ze===!0&&se.endShadows(),(G&&D.hasRenderPass())===!1){const ue=y.opaque,ae=y.transmissive;if(S.setupLights(),E.isArrayCamera){const K=E.cameras;if(ae.length>0)for(let V=0,Le=K.length;V<Le;V++){const Je=K[V];ki(ue,ae,d,Je)}xt&&O.render(d);for(let V=0,Le=K.length;V<Le;V++){const Je=K[V];Hi(y,d,Je,Je.viewport)}}else ae.length>0&&ki(ue,ae,d,E),xt&&O.render(d),Hi(y,d,E)}ne!==null&&Y===0&&(Ge.updateMultisampleRenderTarget(ne),Ge.updateRenderTargetMipmap(ne)),G&&D.end(P),d.isScene===!0&&d.onAfterRender(P,d,E),ge.resetDefaultState(),Z=-1,ie=null,x.pop(),x.length>0?(S=x[x.length-1],Ge.setTextureUnits(S.state.textureUnits),ze===!0&&se.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,_.pop(),_.length>0?y=_[_.length-1]:y=null,N!==null&&N.renderEnd()};function Rn(d,E,F,G){if(d.visible===!1)return;if(d.layers.test(E.layers)){if(d.isGroup)F=d.renderOrder;else if(d.isLOD)d.autoUpdate===!0&&d.update(E);else if(d.isLight)S.pushLight(d),d.castShadow&&S.pushShadow(d);else if(d.isSprite){const ue=E.isArrayCamera?Se:Ie;if(!d.frustumCulled||d.intersectsFrustum(ue)){G&&Ce.setFromMatrixPosition(d.matrixWorld).applyMatrix4(We);const ae=ce.update(d),K=d.material;K.visible&&y.push(d,ae,K,F,Ce.z,null,E)}}else if(d.isMesh||d.isLine||d.isPoints){const ue=E.isArrayCamera?Se:Ie;if(!d.frustumCulled||d.intersectsFrustum(ue)){const ae=ce.update(d),K=d.material;if(G&&(d.boundingSphere!==void 0?(d.boundingSphere===null&&d.computeBoundingSphere(),Ce.copy(d.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),Ce.copy(ae.boundingSphere.center)),Ce.applyMatrix4(d.matrixWorld).applyMatrix4(We)),Array.isArray(K)){const V=ae.groups;for(let Le=0,Je=V.length;Le<Je;Le++){const we=V[Le],Qe=K[we.materialIndex];Qe&&Qe.visible&&y.push(d,ae,Qe,F,Ce.z,we,E)}}else K.visible&&y.push(d,ae,K,F,Ce.z,null,E)}}}const re=d.children;for(let ue=0,ae=re.length;ue<ae;ue++)Rn(re[ue],E,F,G)}function Hi(d,E,F,G){const{opaque:B,transmissive:re,transparent:ue}=d;S.setupLightsView(F),ze===!0&&se.setGlobalState(P.clippingPlanes,F),G&&he.viewport(oe.copy(G)),B.length>0&&ti(B,E,F),re.length>0&&ti(re,E,F),ue.length>0&&ti(ue,E,F),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function ki(d,E,F,G){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[G.id]===void 0){const we=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[G.id]=new bn(1,1,{generateMipmaps:!0,type:we?An:tn,minFilter:Yn,samples:Math.max(4,ht.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const re=S.state.transmissionRenderTarget[G.id],ue=G.viewport||oe;re.setSize(ue.z*P.transmissionResolutionScale,ue.w*P.transmissionResolutionScale);const ae=P.getRenderTarget(),K=P.getActiveCubeFace(),V=P.getActiveMipmapLevel();P.setRenderTarget(re),P.getClearColor(te),Me=P.getClearAlpha(),Me<1&&P.setClearColor(16777215,.5),P.clear(),xt&&O.render(F);const Le=P.toneMapping;P.toneMapping=On;const Je=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),S.setupLightsView(G),ze===!0&&se.setGlobalState(P.clippingPlanes,G),ti(d,F,G),Ge.updateMultisampleRenderTarget(re),Ge.updateRenderTargetMipmap(re),$e.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let Qe=0,yt=E.length;Qe<yt;Qe++){const lt=E[Qe],{object:je,geometry:He,material:Ee,group:At}=lt;if(Ee.side===qt&&je.layers.test(G.layers)){const qe=Ee.side;Ee.side=Qt,Ee.needsUpdate=!0,Vi(je,F,G,He,Ee,At),Ee.side=qe,Ee.needsUpdate=!0,we=!0}}we===!0&&(Ge.updateMultisampleRenderTarget(re),Ge.updateRenderTargetMipmap(re))}P.setRenderTarget(ae,K,V),P.setClearColor(te,Me),Je!==void 0&&(G.viewport=Je),P.toneMapping=Le}function ti(d,E,F){const G=E.isScene===!0?E.overrideMaterial:null;for(let B=0,re=d.length;B<re;B++){const ue=d[B],{object:ae,geometry:K,group:V}=ue;let Le=ue.material;Le.allowOverride===!0&&G!==null&&(Le=G),ae.layers.test(F.layers)&&Vi(ae,E,F,K,Le,V)}}function Vi(d,E,F,G,B,re){N!==null&&B.isNodeMaterial&&N.setObject(d,B),d.onBeforeRender(P,E,F,G,B,re),d.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,d.matrixWorld),d.normalMatrix.getNormalMatrix(d.modelViewMatrix),B.onBeforeRender(P,E,F,G,d,re),B.transparent===!0&&B.side===qt&&B.forceSinglePass===!1?(B.side=Qt,B.needsUpdate=!0,P.renderBufferDirect(F,E,G,B,d,re),B.side=ci,B.needsUpdate=!0,P.renderBufferDirect(F,E,G,B,d,re),B.side=qt):P.renderBufferDirect(F,E,G,B,d,re),d.onAfterRender(P,E,F,G,B,re)}function Wi(d){let E=0;for(const F of d)F.texture!==null&&E++;return E}function Gn(d,E,F){E.isScene!==!0&&(E=Tt);const G=Ue.get(d),B=S.state.lights,re=S.state.shadowsArray,ue=B.state.version,ae=J.getParameters(d,B.state,re,E,F,S.state.lightProbeGridArray),K=J.getProgramCacheKey(ae);let V=G.programs;G.environment=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?E.environment:null,G.fog=E.fog;const Le=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap;G.envMap=L.get(d.envMap||G.environment,Le),G.envMapRotation=G.environment!==null&&d.envMap===null?E.environmentRotation:d.envMapRotation,V===void 0&&(d.addEventListener("dispose",it),V=new Map,G.programs=V,G.programVariants=new Map);let Je=V.get(K);if(Je!==void 0){if(G.currentProgram===Je&&G.lightsStateVersion===ue)return qi(d,ae),Je}else ae.uniforms=J.getUniforms(d),N!==null&&d.isNodeMaterial&&N.build(d,F,ae),d.onBeforeCompile(ae,P),Je=J.acquireProgram(ae,K),V.set(K,Je),G.uniforms=ae.uniforms;const we=G.uniforms;return(!d.isShaderMaterial&&!d.isRawShaderMaterial||d.clipping===!0)&&(we.clippingPlanes=se.uniform),qi(d,ae),G.needsLights=I(d),G.lightsStateVersion=ue,G.needsLights&&(we.ambientLightColor.value=B.state.ambient,we.lightProbe.value=B.state.probe,we.sunLights.value=B.state.sun,we.sunLightShadows.value=B.state.sunShadow,we.directionalLights.value=B.state.directional,we.directionalLightShadows.value=B.state.directionalShadow,we.spotLights.value=B.state.spot,we.spotLightShadows.value=B.state.spotShadow,we.rectAreaLights.value=B.state.rectArea,we.ltc_1.value=B.state.rectAreaLTC1,we.ltc_2.value=B.state.rectAreaLTC2,we.pointLights.value=B.state.point,we.pointLightShadows.value=B.state.pointShadow,we.hemisphereLights.value=B.state.hemi,we.sunShadowMatrix.value=B.state.sunShadowMatrix,we.sunShadowCascade.value=B.state.sunShadowCascade,we.directionalShadowMatrix.value=B.state.directionalShadowMatrix,we.spotLightMatrix.value=B.state.spotLightMatrix,we.spotLightMap.value=B.state.spotLightMap,we.pointShadowMatrix.value=B.state.pointShadowMatrix),G.numLightProbeGrids=Wi(S.state.lightProbeGridArray),G.currentProgram=Je,G.uniformsList=null,Je}function ms(d,E,F,G,B){const re=Ue.get(d),ue=re.currentProgram.id+","+G+","+B;let ae=re.programVariants.get(ue);return ae===void 0?(ae=Gn(d,E,F),re.programVariants.set(ue,ae)):(re.currentProgram=ae,re.uniformsList=null,re.outputColorSpace=G,re.toneMapping=B),ae}function Xi(d){if(d.uniformsList===null){const E=d.currentProgram.getUniforms();d.uniformsList=Js.seqWithValue(E.seq,d.uniforms)}return d.uniformsList}function qi(d,E){const F=Ue.get(d);F.outputColorSpace=E.outputColorSpace,F.batching=E.batching,F.batchingColor=E.batchingColor,F.instancing=E.instancing,F.instancingColor=E.instancingColor,F.instancingMorph=E.instancingMorph,F.skinning=E.skinning,F.morphTargets=E.morphTargets,F.morphNormals=E.morphNormals,F.morphColors=E.morphColors,F.morphTargetsCount=E.morphTargetsCount,F.numClippingPlanes=E.numClippingPlanes,F.numIntersection=E.numClipIntersection,F.vertexAlphas=E.vertexAlphas,F.vertexTangents=E.vertexTangents,F.toneMapping=E.toneMapping}function fr(d,E,F,G,B){E.isScene!==!0&&(E=Tt),Ge.resetTextureUnits();const re=E.fog,ue=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?E.environment:null,ae=ne===null?P.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ct.workingColorSpace,K=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,V=L.get(G.envMap||ue,K),Le=G.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Je=!!F.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),we=!!F.morphAttributes.position,Qe=!!F.morphAttributes.normal,yt=!!F.morphAttributes.color;let lt=On;G.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(lt=P.toneMapping);const je=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,He=je!==void 0?je.length:0,Ee=Ue.get(G),At=S.state.lights;if(ze===!0&&(et===!0||d!==ie)){const vt=d===ie&&G.id===Z;se.setState(G,d,vt)}let qe=!1,De=!1;G.version===Ee.__version?Ee.needsLights&&Ee.lightsStateVersion!==At.state.version||B.isBatchedMesh&&Ee.batching===!1||!B.isBatchedMesh&&Ee.batching===!0||B.isBatchedMesh&&Ee.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&Ee.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&Ee.instancing===!1||!B.isInstancedMesh&&Ee.instancing===!0||B.isSkinnedMesh&&Ee.skinning===!1||!B.isSkinnedMesh&&Ee.skinning===!0||B.isInstancedMesh&&Ee.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ee.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ee.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ee.instancingMorph===!1&&B.morphTexture!==null||Ee.envMap!==V||G.fog===!0&&Ee.fog!==re||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==se.numPlanes||Ee.numIntersection!==se.numIntersection)||Ee.vertexAlphas!==Le||Ee.vertexTangents!==Je||Ee.morphTargets!==we||Ee.morphNormals!==Qe||Ee.morphColors!==yt||Ee.morphTargetsCount!==He||Ee.numLightProbeGrids!==Wi(S.state.lightProbeGridArray)?qe=!0:(Ee.outputColorSpace!==ae||Ee.toneMapping!==lt)&&(De=!0):(qe=!0,Ee.__version=G.version);let mt=Ee.currentProgram;(qe===!0||De===!0)&&(mt=De===!0?ms(G,E,B,ae,lt):Gn(G,E,B),N&&G.isNodeMaterial&&N.onUpdateProgram(G,mt,Ee));let Kt=!1,Vt=!1,Wt=!1;const Oe=mt.getUniforms(),rt=Ee.uniforms;if(he.useProgram(mt.program)&&(Kt=!0,Vt=!0,Wt=!0),G.id!==Z&&(Z=G.id,Vt=!0),Kt||ie!==d){he.buffers.depth.getReversed()&&d.reversedDepth!==!0&&(d._reversedDepth=!0,d.updateProjectionMatrix()),Oe.setValue(k,"projectionMatrix",d.projectionMatrix),Oe.setValue(k,"viewMatrix",d.matrixWorldInverse);const Et=Oe.map.cameraPosition;Et!==void 0&&Et.setValue(k,Ye.setFromMatrixPosition(d.matrixWorld)),ht.logarithmicDepthBuffer&&Oe.setValue(k,"logDepthBufFC",2/(Math.log(d.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Oe.setValue(k,"isOrthographic",d.isOrthographicCamera===!0),ie!==d&&(ie=d,Vt=!0,Wt=!0)}if(Ee.needsLights&&(At.state.sunShadowMap.length>0&&Oe.setValue(k,"sunShadowMap",At.state.sunShadowMap,Ge),At.state.directionalShadowMap.length>0&&Oe.setValue(k,"directionalShadowMap",At.state.directionalShadowMap,Ge),At.state.spotShadowMap.length>0&&Oe.setValue(k,"spotShadowMap",At.state.spotShadowMap,Ge),At.state.pointShadowMap.length>0&&Oe.setValue(k,"pointShadowMap",At.state.pointShadowMap,Ge)),B.isSkinnedMesh){Oe.setOptional(k,B,"bindMatrix"),Oe.setOptional(k,B,"bindMatrixInverse");const vt=B.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),Oe.setValue(k,"boneTexture",vt.boneTexture,Ge))}B.isBatchedMesh&&(Oe.setOptional(k,B,"batchingTexture"),Oe.setValue(k,"batchingTexture",B._matricesTexture,Ge),Oe.setOptional(k,B,"batchingIdTexture"),Oe.setValue(k,"batchingIdTexture",B._indirectTexture,Ge),Oe.setOptional(k,B,"batchingColorTexture"),B._colorsTexture!==null&&Oe.setValue(k,"batchingColorTexture",B._colorsTexture,Ge));const Ft=F.morphAttributes;if((Ft.position!==void 0||Ft.normal!==void 0||Ft.color!==void 0)&&ee.update(B,F,mt),(Vt||Ee.receiveShadow!==B.receiveShadow)&&(Ee.receiveShadow=B.receiveShadow,Oe.setValue(k,"receiveShadow",B.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&E.environment!==null&&(rt.envMapIntensity.value=E.environmentIntensity),rt.dfgLUT!==void 0&&(rt.dfgLUT.value=ng()),Vt){if(Oe.setValue(k,"toneMappingExposure",P.toneMappingExposure),Ee.needsLights&&R(rt,Wt),re&&G.fog===!0&&pe.refreshFogUniforms(rt,re),pe.refreshMaterialUniforms(rt,G,ye,Re,S.state.transmissionRenderTarget[d.id]),Ee.needsLights&&Ee.numLightProbeGrids>0){const vt=A;let Et=0;for(const cn of S.state.lightProbeGridArray)cn.texture!==null&&(vt.textures[Et]=cn.texture,vt.min[Et]=cn.boundingBox.min,vt.max[Et]=cn.boundingBox.max,vt.resolution[Et]=cn.resolution,Et++);for(const cn in vt)vt[cn].length=Et;rt.probesSH.value=vt.textures,rt.probesMin.value=vt.min,rt.probesMax.value=vt.max,rt.probesResolution.value=vt.resolution}Js.upload(k,Xi(Ee),rt,Ge)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Js.upload(k,Xi(Ee),rt,Ge),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Oe.setValue(k,"center",B.center),Oe.setValue(k,"modelViewMatrix",B.modelViewMatrix),Oe.setValue(k,"normalMatrix",B.normalMatrix),Oe.setValue(k,"modelMatrix",B.matrixWorld),G.uniformsGroups!==void 0){const vt=G.uniformsGroups;for(let Et=0,cn=vt.length;Et<cn;Et++){const gs=vt[Et];Ne.update(gs,mt),Ne.bind(gs,mt)}}return mt}function R(d,E){d.ambientLightColor.needsUpdate=E,d.lightProbe.needsUpdate=E,d.sunLights.needsUpdate=E,d.sunLightShadows.needsUpdate=E,d.directionalLights.needsUpdate=E,d.directionalLightShadows.needsUpdate=E,d.pointLights.needsUpdate=E,d.pointLightShadows.needsUpdate=E,d.spotLights.needsUpdate=E,d.spotLightShadows.needsUpdate=E,d.rectAreaLights.needsUpdate=E,d.hemisphereLights.needsUpdate=E}function I(d){return d.isMeshLambertMaterial||d.isMeshToonMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isShadowMaterial||d.isShaderMaterial&&d.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(d,E,F){const G=Ue.get(d);G.__autoAllocateDepthBuffer=d.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Ue.get(d.texture).__webglTexture=E,Ue.get(d.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:F,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(d,E){const F=Ue.get(d);F.__webglFramebuffer=E,F.__useDefaultFramebuffer=E===void 0},this.setRenderTarget=function(d,E=0,F=0){ne=d,$=E,Y=F;let G=null,B=!1,re=!1;if(d){const ae=Ue.get(d);if(ae.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(k.FRAMEBUFFER,ae.__webglFramebuffer),oe.copy(d.viewport),me.copy(d.scissor),Fe=d.scissorTest,he.viewport(oe),he.scissor(me),he.setScissorTest(Fe),Z=-1;return}else if(ae.__webglFramebuffer===void 0)Ge.setupRenderTarget(d);else if(ae.__hasExternalTextures)Ge.rebindTextures(d,Ue.get(d.texture).__webglTexture,Ue.get(d.depthTexture).__webglTexture);else if(d.depthBuffer){const Le=d.depthTexture;if(ae.__boundDepthTexture!==Le){if(Le!==null&&Ue.has(Le)&&(d.width!==Le.image.width||d.height!==Le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(d)}}const K=d.texture;(K.isData3DTexture||K.isDataArrayTexture||K.isCompressedArrayTexture)&&(re=!0);const V=Ue.get(d).__webglFramebuffer;d.isWebGLCubeRenderTarget?(Array.isArray(V[E])?G=V[E][F]:G=V[E],B=!0):d.samples>0&&Ge.useMultisampledRTT(d)===!1?G=Ue.get(d).__webglMultisampledFramebuffer:Array.isArray(V)?G=V[F]:G=V,oe.copy(d.viewport),me.copy(d.scissor),Fe=d.scissorTest}else oe.copy(Pe).multiplyScalar(ye).floor(),me.copy(at).multiplyScalar(ye).floor(),Fe=ut;if(F!==0&&(G=X),he.bindFramebuffer(k.FRAMEBUFFER,G)&&he.drawBuffers(d,G),he.viewport(oe),he.scissor(me),he.setScissorTest(Fe),B){const ae=Ue.get(d.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+E,ae.__webglTexture,F)}else if(re){const ae=E;for(let K=0;K<d.textures.length;K++){const V=Ue.get(d.textures[K]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+K,V.__webglTexture,F,ae)}}else if(d!==null&&F!==0){const ae=Ue.get(d.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ae.__webglTexture,F)}Z=-1};function z(d){const E=Ue.get(d);return(E.__readFormat!==d.format||E.__readType!==d.type)&&(E.__readFormat=d.format,E.__readType=d.type,E.__formatReadable=ht.textureFormatReadable(d.format),E.__typeReadable=ht.textureTypeReadable(d.type)),E}this.readRenderTargetPixels=function(d,E,F,G,B,re,ue,ae=0){if(!(d&&d.isWebGLRenderTarget)){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let K=Ue.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&ue!==void 0&&(K=K[ue],Array.isArray(K)&&(K=K[0])),K){he.bindFramebuffer(k.FRAMEBUFFER,K);try{const V=d.textures[ae],Le=V.format,Je=V.type;d.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+ae);const we=z(V);if(we.__formatReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}E>=0&&E<=d.width-G&&F>=0&&F<=d.height-B&&k.readPixels(E,F,G,B,fe.convert(Le),fe.convert(Je),re)}finally{const V=ne!==null?Ue.get(ne).__webglFramebuffer:null;he.bindFramebuffer(k.FRAMEBUFFER,V)}}},this.readRenderTargetPixelsAsync=async function(d,E,F,G,B,re,ue,ae=0){if(!(d&&d.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let K=Ue.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&ue!==void 0&&(K=K[ue],Array.isArray(K)&&(K=K[0])),K)if(E>=0&&E<=d.width-G&&F>=0&&F<=d.height-B){he.bindFramebuffer(k.FRAMEBUFFER,K);const V=d.textures[ae],Le=V.format,Je=V.type;d.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+ae);const we=z(V);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Qe),k.bufferData(k.PIXEL_PACK_BUFFER,re.byteLength,k.STREAM_READ),k.readPixels(E,F,G,B,fe.convert(Le),fe.convert(Je),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const yt=ne!==null?Ue.get(ne).__webglFramebuffer:null;he.bindFramebuffer(k.FRAMEBUFFER,yt);const lt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await au(k,lt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Qe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,re),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(Qe),k.deleteSync(lt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(d,E=null,F=0){const G=Math.pow(2,-F),B=Math.floor(d.image.width*G),re=Math.floor(d.image.height*G),ue=E!==null?E.x:0,ae=E!==null?E.y:0;Ge.setTexture2D(d,0),k.copyTexSubImage2D(k.TEXTURE_2D,F,0,0,ue,ae,B,re),he.unbindTexture()},this.copyTextureToTexture=function(d,E,F=null,G=null,B=0,re=0){let ue,ae,K,V,Le,Je,we,Qe,yt;const lt=d.isCompressedTexture?d.mipmaps[re]:d.image;if(F!==null)ue=F.max.x-F.min.x,ae=F.max.y-F.min.y,K=F.isBox3?F.max.z-F.min.z:1,V=F.min.x,Le=F.min.y,Je=F.isBox3?F.min.z:0;else{const Oe=Math.pow(2,-B);ue=Math.floor(lt.width*Oe),ae=Math.floor(lt.height*Oe),d.isDataArrayTexture?K=lt.depth:d.isData3DTexture?K=Math.floor(lt.depth*Oe):K=1,V=0,Le=0,Je=0}G!==null?(we=G.x,Qe=G.y,yt=G.z):(we=0,Qe=0,yt=0);const je=fe.convert(E.format),He=fe.convert(E.type);let Ee;E.isData3DTexture?(Ge.setTexture3D(E,0),Ee=k.TEXTURE_3D):E.isDataArrayTexture||E.isCompressedArrayTexture?(Ge.setTexture2DArray(E,0),Ee=k.TEXTURE_2D_ARRAY):(Ge.setTexture2D(E,0),Ee=k.TEXTURE_2D),he.activeTexture(k.TEXTURE0),he.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,E.flipY),he.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),he.pixelStorei(k.UNPACK_ALIGNMENT,E.unpackAlignment);const At=he.getParameter(k.UNPACK_ROW_LENGTH),qe=he.getParameter(k.UNPACK_IMAGE_HEIGHT),De=he.getParameter(k.UNPACK_SKIP_PIXELS),mt=he.getParameter(k.UNPACK_SKIP_ROWS),Kt=he.getParameter(k.UNPACK_SKIP_IMAGES);he.pixelStorei(k.UNPACK_ROW_LENGTH,lt.width),he.pixelStorei(k.UNPACK_IMAGE_HEIGHT,lt.height),he.pixelStorei(k.UNPACK_SKIP_PIXELS,V),he.pixelStorei(k.UNPACK_SKIP_ROWS,Le),he.pixelStorei(k.UNPACK_SKIP_IMAGES,Je);const Vt=d.isDataArrayTexture||d.isData3DTexture,Wt=E.isDataArrayTexture||E.isData3DTexture;if(d.isDepthTexture){const Oe=Ue.get(d),rt=Ue.get(E),Ft=Ue.get(Oe.__renderTarget),vt=Ue.get(rt.__renderTarget);he.bindFramebuffer(k.READ_FRAMEBUFFER,Ft.__webglFramebuffer),he.bindFramebuffer(k.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Et=0;Et<K;Et++)Vt&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ue.get(d).__webglTexture,B,Je+Et),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ue.get(E).__webglTexture,re,yt+Et)),k.blitFramebuffer(V,Le,V+ue,Le+ae,we,Qe,we+ue,Qe+ae,k.DEPTH_BUFFER_BIT,k.NEAREST);he.bindFramebuffer(k.READ_FRAMEBUFFER,null),he.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(B!==0||d.isRenderTargetTexture||Ue.has(d)){const Oe=Ue.get(d),rt=Ue.get(E);he.bindFramebuffer(k.READ_FRAMEBUFFER,U),he.bindFramebuffer(k.DRAW_FRAMEBUFFER,W);for(let Ft=0;Ft<K;Ft++)Vt?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Oe.__webglTexture,B,Je+Ft):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Oe.__webglTexture,B),Wt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,rt.__webglTexture,re,yt+Ft):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,rt.__webglTexture,re),B!==0?k.blitFramebuffer(V,Le,V+ue,Le+ae,we,Qe,we+ue,Qe+ae,k.COLOR_BUFFER_BIT,k.NEAREST):Wt?k.copyTexSubImage3D(Ee,re,we,Qe,yt+Ft,V,Le,ue,ae):k.copyTexSubImage2D(Ee,re,we,Qe,V,Le,ue,ae);he.bindFramebuffer(k.READ_FRAMEBUFFER,null),he.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Wt?d.isDataTexture||d.isData3DTexture?k.texSubImage3D(Ee,re,we,Qe,yt,ue,ae,K,je,He,lt.data):E.isCompressedArrayTexture?k.compressedTexSubImage3D(Ee,re,we,Qe,yt,ue,ae,K,je,lt.data):k.texSubImage3D(Ee,re,we,Qe,yt,ue,ae,K,je,He,lt):d.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,re,we,Qe,ue,ae,je,He,lt.data):d.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,re,we,Qe,lt.width,lt.height,je,lt.data):k.texSubImage2D(k.TEXTURE_2D,re,we,Qe,ue,ae,je,He,lt);he.pixelStorei(k.UNPACK_ROW_LENGTH,At),he.pixelStorei(k.UNPACK_IMAGE_HEIGHT,qe),he.pixelStorei(k.UNPACK_SKIP_PIXELS,De),he.pixelStorei(k.UNPACK_SKIP_ROWS,mt),he.pixelStorei(k.UNPACK_SKIP_IMAGES,Kt),re===0&&E.generateMipmaps===!0&&E.mipmapsAutoUpdate===!0&&k.generateMipmap(Ee),he.unbindTexture()},this.initRenderTarget=function(d){Ue.get(d).__webglFramebuffer===void 0&&Ge.setupRenderTarget(d)},this.initTexture=function(d){d.isCubeTexture?Ge.setTextureCube(d,0):d.isData3DTexture?Ge.setTexture3D(d,0):d.isDataArrayTexture||d.isCompressedArrayTexture?Ge.setTexture2DArray(d,0):Ge.setTexture2D(d,0),he.unbindTexture()},this.resetState=function(){$=0,Y=0,ne=null,he.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}}const pl={type:"change"},ja={type:"start"},fc={type:"end"},Ws=new fs,ml=new Nn,sg=Math.cos(70*Pa.DEG2RAD),Dt=new H,Zt=2*Math.PI,_t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vr=1e-6;class rg extends lh{constructor(e,t=null){super(e,t),this.state=_t.NONE,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Li.ROTATE,MIDDLE:Li.DOLLY,RIGHT:Li.PAN},this.touches={ONE:Pi.ROTATE,TWO:Pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new on,this._lastTargetPosition=new H,this._quat=new on().setFromUnitVectors(e.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xo,this._sphericalDelta=new Xo,this._scale=1,this._panOffset=new H,this._rotateStart=new ke,this._rotateEnd=new ke,this._rotateDelta=new ke,this._panStart=new ke,this._panEnd=new ke,this._panDelta=new ke,this._dollyStart=new ke,this._dollyEnd=new ke,this._dollyDelta=new ke,this._dollyDirection=new H,this._mouse=new ke,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=og.bind(this),this._onPointerDown=ag.bind(this),this._onPointerUp=lg.bind(this),this._onContextMenu=mg.bind(this),this._onMouseWheel=hg.bind(this),this._onKeyDown=dg.bind(this),this._onTouchStart=fg.bind(this),this._onTouchMove=pg.bind(this),this._onMouseDown=cg.bind(this),this._onMouseMove=ug.bind(this),this._interceptControlDown=gg.bind(this),this._interceptControlUp=_g.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=_t.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pl),this.update(),this.state=_t.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===_t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Zt:n>Math.PI&&(n-=Zt),s<-Math.PI?s+=Zt:s>Math.PI&&(s-=Zt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Dt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new H(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ws.origin.copy(this.object.position),Ws.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ws.direction))<sg?this.object.lookAt(this.target):(ml.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ws.intersectPlane(ml,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vr||this._lastTargetPosition.distanceToSquared(this.target)>Vr?(this.dispatchEvent(pl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Dt.copy(s).sub(this.target);let r=Dt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ke,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function ag(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function og(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function lg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fc),this.state=_t.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function cg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Li.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=_t.DOLLY;break;case Li.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_t.ROTATE}break;case Li.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_t.PAN}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(ja)}function ug(i){switch(this.state){case _t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case _t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case _t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function hg(i){this.enabled===!1||this.enableZoom===!1||this.state!==_t.NONE||(i.preventDefault(),this.dispatchEvent(ja),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fc))}function dg(i){this.enabled!==!1&&this._handleKeyDown(i)}function fg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Pi.ROTATE:if(this.enableRotate===!1){this.state=_t.NONE;break}this._handleTouchStartRotate(i),this.state=_t.TOUCH_ROTATE;break;case Pi.PAN:if(this.enablePan===!1){this.state=_t.NONE;break}this._handleTouchStartPan(i),this.state=_t.TOUCH_PAN;break;default:this.state=_t.NONE}break;case 2:switch(this.touches.TWO){case Pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=_t.TOUCH_DOLLY_PAN;break;case Pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=_t.TOUCH_DOLLY_ROTATE;break;default:this.state=_t.NONE}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(ja)}function pg(i){switch(this._trackPointer(i),this.state){case _t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case _t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case _t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case _t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=_t.NONE}}function mg(i){this.enabled!==!1&&i.preventDefault()}function gg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _g(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ts=new H;function an(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ts.copy(e),ts[n]=0,ts.normalize();const l=.5*a/(a+o),f=1-ts.angleTo(i)/c;return Math.sign(ts[t])===1?f*l:o/(a+o)+l+l*(1-f)}class cr extends Yt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new H,l=new H,f=new H(e,t,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,M=g.length/6,T=new H,h=.5/a;for(let u=0,v=0;u<g.length;u+=3,v+=2)switch(c.fromArray(g,u),l.copy(c),l.x-=Math.sign(l.x)*h,l.y-=Math.sign(l.y)*h,l.z-=Math.sign(l.z)*h,l.normalize(),g[u+0]=f.x*Math.sign(c.x)+l.x*r,g[u+1]=f.y*Math.sign(c.y)+l.y*r,g[u+2]=f.z*Math.sign(c.z)+l.z*r,p[u+0]=l.x,p[u+1]=l.y,p[u+2]=l.z,Math.floor(u/M)){case 0:T.set(1,0,0),m[v+0]=an(T,l,"z","y",r,n),m[v+1]=1-an(T,l,"y","z",r,t);break;case 1:T.set(-1,0,0),m[v+0]=1-an(T,l,"z","y",r,n),m[v+1]=1-an(T,l,"y","z",r,t);break;case 2:T.set(0,1,0),m[v+0]=1-an(T,l,"x","z",r,e),m[v+1]=an(T,l,"z","x",r,n);break;case 3:T.set(0,-1,0),m[v+0]=1-an(T,l,"x","z",r,e),m[v+1]=1-an(T,l,"z","x",r,n);break;case 4:T.set(0,0,1),m[v+0]=1-an(T,l,"x","y",r,e),m[v+1]=1-an(T,l,"y","x",r,t);break;case 5:T.set(0,0,-1),m[v+0]=an(T,l,"x","y",r,e),m[v+1]=1-an(T,l,"y","x",r,t);break}}static fromJSON(e){return new cr(e.width,e.height,e.depth,e.segments,e.radius)}}function oi(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new zt;c.morphTargetsRelative=o;let l=0;for(let f=0;f<i.length;++f){const g=i[f];let p=0,m=0;if(t!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const M in g.attributes){if(!n.has(M))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+M+'" attribute exists among all geometries, or in none of them.'),null;r[M]===void 0&&(r[M]=[]),r[M].push(g.attributes[M]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(o!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const M in g.morphAttributes){if(!s.has(M))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[M].length!==i[0].morphAttributes[M].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+M+'" morph attribute.'),null;a[M]===void 0&&(a[M]=[]),a[M].push(g.morphAttributes[M]),m++}if(m!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let M;if(t)M=g.index.count;else if(g.attributes.position!==void 0)M=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,M,f),l+=M}}if(t){let f=0;const g=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let M=0;M<m.count;++M)g.push(m.getX(M)+f);f+=i[p].attributes.position.count}c.setIndex(g)}for(const f in r){const g=gl(r[f]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,g)}for(const f in a){const g=a[f][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let p=0;p<g;++p){const m=[];for(let T=0;T<a[f].length;++T)m.push(a[f][T][p]);const M=gl(m);if(!M)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(M)}}}return c}function gl(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const f=i[l];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=f.gpuType),s!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=f.count*t}const a=new e(r),o=new nn(a,t,n);let c=0;for(let l=0;l<i.length;++l){const f=i[l];if(f.isInterleavedBufferAttribute){const g=c/t;for(let p=0,m=f.count;p<m;p++)for(let M=0;M<t;M++){const T=f.getComponent(p,M);o.setComponent(p+g,M,T)}}else a.set(f.array,c);c+=f.count*t}return s!==void 0&&(o.gpuType=s),o}function xg({scene:i,material:e,ownedGeometries:t}){const s=Array(120).fill(null),r=new Map,a=new Map,o=[],c=new dt,l=new on,f=new H(1,1,1),g=new dt().makeScale(0,0,0);let p=null,m=1;const M={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function T(x,D,P,C,N,X="inside",U=0){D=M[D]||D;let W=x;W.index&&(W=x.toNonIndexed(),x.dispose()),l.setFromEuler(new wn(0,0,U)),W.applyMatrix4(c.compose(new H(P,C,N),l,f));const $=`${X}:${D}`;a.has($)||a.set($,{layer:X,color:D,geometries:[]}),a.get($).geometries.push(W)}const h=(x,D,P,C,N,X,U,W="inside",$=0)=>T(new Yt(x,D,P),U,C,N,X,W,$),u=(x,D,P,C,N,X)=>T(new xn(x,x,D,10),X,P,C,N);function v(x,D,P,C,N){T(new li(x,9,6),N,D,P,C)}h(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),h(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),h(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),h(9.2,.08,7.8,0,.16,0,"#c8a178");for(let x=-4.2;x<4.5;x+=.7)h(.018,.012,7.6,x,.21,0,"#ab8965");h(3,.22,1,0,-.04,4.3,"#d7c5a7"),h(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),h(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),h(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),h(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front"),h(9.4,3.45,.18,0,1.9,3.9,"#e7dec9","front"),h(1.25,2.5,.1,0,1.48,4.03,"#647d70","front"),h(.08,.36,.1,.43,1.45,4.11,"#ba9f6b","front");for(const x of[-2.85,2.85]){h(2.35,1.55,.12,x,2.05,4.04,"#71948d","front");for(const D of[-1.2,0,1.2])h(.055,1.65,.14,x+D,2.05,4.12,"#cfbb8c","front");for(const D of[1.23,2.87])h(2.45,.065,.14,x,D,4.12,"#cfbb8c","front");h(.23,.5,.14,x<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const x of[-1,1])h(4.95,.22,8.65,x*2.37,3.98,0,"#47695f","roof",x*-.18),h(4.95,.12,.12,x*2.37,3.96,4.35,"#c1a771","roof",x*-.18);h(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const x of[-2,-.5,1])h(2.25,.06,1.25,2.5,4.08,x,"#29434f","roof",-.18);h(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),h(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),h(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),h(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),h(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),h(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),h(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),u(.05,.35,-3.85,1.05,-2.4,"#bda16a"),u(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),h(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let x=0;x<4;x++)h(1.65,.024,.03,-2.15,2.88+x*.045,-3.55,"#8d9e98");h(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),h(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),h(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const x of[.98,1.91])h(.05,.37,.08,3.29,x,-2.25,"#56746a");h(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),h(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),h(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),u(.035,.3,3.45,1.45,-1.08,"#baa371"),u(.18,.3,2.1,1.43,-.75,"#e8dcc3"),h(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),h(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),h(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),h(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),u(.2,.33,.85,.43,-3.15,"#eee9de"),h(.5,.5,.22,.85,.68,-3.65,"#eee9de"),h(.55,.12,.42,1.5,1,-2.1,"#eee9de"),u(.025,1.65,1.5,1.9,-3.65,"#baa371"),h(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),h(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),h(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const x of[1.55,4.05])h(.23,.57,1,x,.72,2.45,"#a7b3a0");h(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),h(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const x of[.7,1.7])h(.08,.4,.6,x,.48,1.4,"#8c7556");h(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),h(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),h(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),h(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let x=0;x<8;x++)h(.11,.32+x%2*.1,.22,-3.2+x*.17,1.65,3.45,x%2?"#879f93":"#e2ca9e");for(const x of[-4.9,4.9]){h(.08,.7,10,x,.19,.1,"#aa9270");for(const D of[-4.7,0,4.7])h(.13,1,.13,x,.36,D,"#aa9270")}for(const x of[-3.6,3.6])u(.29,.45,x,.14,4.65,"#b58a69"),v(.4,x,.68,4.65,"#78946e");for(const{layer:x,color:D,geometries:P}of a.values()){const C=oi(P,!1);P.forEach(X=>X.dispose()),t.add(C);const N=new Xu(C,e(D),120);N.instanceMatrix.setUsage(iu),N.count=0,N.userData.residenceLayer=x,i.add(N),o.push(N)}a.clear();const w=new Yt(1,1,1);t.add(w);const A=new gt(w,e("#b4c5ab"));A.userData.residenceGround=!0,i.add(A);const y=new gt(w,e("#e4dcc9"));i.add(y);function S(x){return{x:-36.75+x%8*10.5,z:-28-Math.floor(x/8)*12}}function _(){const x=s.reduce((P,C,N)=>C===null?P:N+1,0);m=Math.max(1,Math.ceil(x/8));for(const P of o){P.count=x;for(let C=0;C<x;C++){const N=s[C],X=S(C);N===null||N===p&&["roof","front"].includes(P.userData.residenceLayer)?P.setMatrixAt(C,g):P.setMatrixAt(C,c.compose(new H(X.x,0,X.z),new on,f))}P.instanceMatrix.needsUpdate=!0,P.computeBoundingSphere()}const D=m*12+4;A.scale.set(86,.3,D),A.position.set(0,-.55,-20-D/2),y.scale.set(1.5,.04,D),y.position.set(0,-.12,-20-D/2),A.visible=y.visible=x>0}return{meshes:o,sync(x){const D=new Set(x.slice(0,120).map(P=>P.id));for(const[P,C]of r)D.has(P)||(s[C]=null,r.delete(P));for(const P of[...D].sort((C,N)=>C-N))if(!r.has(P)){const C=s.indexOf(null);s[C]=P,r.set(P,C)}r.has(p)||(p=null),_()},select(x){p=r.has(x)?x:null,_()},location(x){const D=r.get(x);return D===void 0?null:S(D)},bed(x){const D=this.location(x);return D?[D.x-2.05,.92,D.z-.5]:null},cameraBoxes(x){const D=this.location(x);if(!D)return[];const P=(N,X,U,W,$)=>({left:D.x+N-U/2,right:D.x+N+U/2,back:D.z+X-W/2,front:D.z+X+W/2,top:$}),C=[P(-4.6,0,.18,7.8,3.6),P(0,-3.9,9.4,.18,3.6),P(3.65,-2.78,1.05,.92,2.3),P(2.95,-.75,2.62,.95,1.3),P(2.8,2.45,2.6,1.2,1.3)];return x!==p&&C.push(P(4.6,0,.18,7.8,3.6),P(0,3.9,9.4,.18,3.6)),C},personForHit(x){return x?.object?.userData?.residenceLayer&&Number.isInteger(x.instanceId)?s[x.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-m*12,front:-20}},dispose(){o.forEach(x=>{x.dispose(),i.remove(x)}),i.remove(A,y),r.clear(),s.fill(null)}}}const vg={minX:-100,maxX:100,minZ:-22,maxZ:92},Mg={x:0,y:-.12,z:20},Sg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},Sn={bounds:vg,spawn:Mg,venues:Sg};function yg(){const i=[],{minX:e,maxX:t,minZ:n,maxZ:s}=Sn.bounds,r=.5,a=.3,o=Math.round((t-e)/r)+1,c=Math.round((s-n)/r)+1;let l=null;function f(u,v){return u>=e+a&&u<=t-a&&v>=n+a&&v<=s-a&&!i.some(w=>u>w.left-a&&u<w.right+a&&v>w.back-a&&v<w.front+a)}function g(u,v){if(!f(v.x,v.z))return!1;for(const w of i){let A=0,y=1;for(const[S,_,x]of[["x",w.left-a,w.right+a],["z",w.back-a,w.front+a]]){const D=v[S]-u[S];if(Math.abs(D)<1e-8){if(u[S]<=_||u[S]>=x){A=2;break}}else{const P=(_-u[S])/D,C=(x-u[S])/D;A=Math.max(A,Math.min(P,C)),y=Math.min(y,Math.max(P,C))}}if(A<=y&&y>0&&A<1)return!1}return!0}function p(){if(!l){l=new Uint8Array(o*c).fill(1);for(let u=0;u<c;u++)for(let v=0;v<o;v++)(v===0||u===0||v===o-1||u===c-1)&&(l[u*o+v]=0);for(const u of i){const v=Math.max(0,Math.ceil((u.left-.4-e)/r)),w=Math.min(o-1,Math.floor((u.right+.4-e)/r)),A=Math.max(0,Math.ceil((u.back-.4-n)/r)),y=Math.min(c-1,Math.floor((u.front+.4-n)/r));for(let S=A;S<=y;S++)for(let _=v;_<=w;_++)l[S*o+_]=0}}}function m(u,v,w){const A=v.x-u.x,y=v.z-u.z,S=A*A+y*y;return w.every(_=>{const x=S?Math.max(0,Math.min(1,((_.x-u.x)*A+(_.z-u.z)*y)/S)):0;return Math.hypot(u.x+A*x-_.x,u.z+y*x-_.z)>=.62})}function M(u,v=null,w=[]){p();const A=Math.round((u.x-e)/r),y=Math.round((u.z-n)/r);let S=-1,_=1/0;for(let x=-6;x<=6;x++)for(let D=-6;D<=6;D++){const P=A+D,C=y+x,N=C*o+P;if(P<0||C<0||P>=o||C>=c||!(v||l)[N])continue;const X=(e+P*r-u.x)**2+(n+C*r-u.z)**2;f(u.x,u.z)&&!g(u,{x:e+P*r,z:n+C*r})||m(u,{x:e+P*r,z:n+C*r},w)&&X<_&&(S=N,_=X)}return S}function T(u){return{x:e+u%o*r,z:n+Math.floor(u/o)*r}}function h(u,v,w=[]){if(g(u,v)&&m(u,v,w))return[{x:v.x,z:v.z}];p();const A=w.length?l.slice():l;for(const W of w){const $=Math.round((W.x-e)/r),Y=Math.round((W.z-n)/r);for(let ne=-2;ne<=2;ne++)for(let Z=-2;Z<=2;Z++){const ie=$+Z,oe=Y+ne;ie>=0&&oe>=0&&ie<o&&oe<c&&Math.hypot(e+ie*r-W.x,n+oe*r-W.z)<.76&&(A[oe*o+ie]=0)}}const y=M(u,A,w),S=M(v,A,w);if(y<0||S<0)return[];const _=[],x=new Float64Array(o*c).fill(1/0),D=new Int32Array(o*c).fill(-1),P=new Uint8Array(o*c),C=W=>Math.abs(W%o-S%o)+Math.abs(Math.floor(W/o)-Math.floor(S/o));function N(W,$){_.push({index:W,score:$});let Y=_.length-1;for(;Y>0;){const ne=Y-1>>1;if(_[ne].score<=$)break;[_[Y],_[ne]]=[_[ne],_[Y]],Y=ne}}function X(){const W=_[0],$=_.pop();if(_.length){_[0]=$;let Y=0;for(;;){let ne=Y,Z=Y*2+1,ie=Z+1;if(Z<_.length&&_[Z].score<_[ne].score&&(ne=Z),ie<_.length&&_[ie].score<_[ne].score&&(ne=ie),ne===Y)break;[_[Y],_[ne]]=[_[ne],_[Y]],Y=ne}}return W.index}x[y]=0,N(y,C(y));let U=0;for(;_.length&&U++<o*c;){const W=X();if(P[W])continue;if(P[W]=1,W===S){const ne=[];let Z=W;for(;Z!==y;)ne.push(T(Z)),Z=D[Z];return ne.reverse(),f(v.x,v.z)&&g(ne.at(-1)||T(y),v)&&m(ne.at(-1)||T(y),v,w)&&ne.push({x:v.x,z:v.z}),f(u.x,u.z)&&ne.unshift(T(y)),ne}const $=W%o,Y=Math.floor(W/o);for(const[ne,Z]of[[1,0],[-1,0],[0,1],[0,-1]]){const ie=$+ne,oe=Y+Z,me=oe*o+ie;if(ie<0||oe<0||ie>=o||oe>=c||!A[me]||P[me]||!g(T(W),T(me))||!m(T(W),T(me),w))continue;const Fe=x[W]+1;Fe<x[me]&&(x[me]=Fe,D[me]=W,N(me,Fe+C(me)))}}return[]}return{boxes:()=>i.map(u=>({...u})),slide(u,v){if(g(u,v))return{x:v.x,z:v.z};let w={x:u.x,z:u.z};return g(w,{x:v.x,z:w.z})&&(w.x=v.x),g(w,{x:w.x,z:v.z})&&(w.z=v.z),w},addBox(u,v,w,A,y="",S=2){i.push({left:w-u/2,right:w+u/2,back:A-v/2,front:A+v/2,top:S,tag:y}),l=null},cameraLimit(u,v,w=[]){let A=1;for(const y of i.concat(w)){let S=0,_=1;for(const[x,D,P]of[["x",y.left-.15,y.right+.15],["z",y.back-.15,y.front+.15],["y",-.3,y.top+.15]]){const C=v[x]-u[x];if(Math.abs(C)<1e-8){if(u[x]<D||u[x]>P){S=2;break}}else{const N=(D-u[x])/C,X=(P-u[x])/C;S=Math.max(S,Math.min(N,X)),_=Math.min(_,Math.max(N,X))}}S<=_&&S>.01&&S<A&&(A=Math.max(.02,S-.015))}return A},free:f,segment:g,path:h,nearest(u){const v=M(u);return v<0?null:T(v)},move(u,v,w){const A=Math.hypot(v.x-u.x,v.z-u.z),y=A>0?Math.min(1,w/A):0,S={x:u.x+(v.x-u.x)*y,z:u.z+(v.z-u.z)*y};return g(u,S)?S:{x:u.x,z:u.z}}}}function Eg({scene:i,ownedGeometries:e,materials:t,sun:n,hemi:s,fill:r,navigation:a=null}){const o=new fn;i.add(o);const c=Se=>(e.add(Se),Se);function l(Se,ze){const et=new or(ze);return t.set("environment:"+Se,et),et}const f=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),p=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),m=l("forest",{color:"#4c7262",roughness:1}),M=new gt(c(new Jn(850,850)),f);M.rotation.x=-Math.PI/2,M.position.y=-1.3,o.add(M);const T=[],h=[],u=[],v=new dt,w=new on;function A(Se,ze,et,We,Ye,Ce=1,Tt=1,xt=1){const ft=Se.index?Se.toNonIndexed():Se;ft!==Se&&Se.dispose(),ft.applyMatrix4(v.compose(new H(et,We,Ye),w,new H(Ce,Tt,xt))),ze.push(ft)}for(let Se=0;Se<20;Se++){const ze=Se/20*Math.PI*2,et=Math.cos(ze)*(155+Se%3*18),We=-70+Math.sin(ze)*230,Ye=35+Se%5*13,Ce=25+Se%4*9;A(new zn(Ce,Ye,7),T,et,Ye/2-1.3,We,1.2,1,1),A(new zn(Ce*.28,Ye*.28,7),h,et,Ye*.86-1.25,We,1.2,1,1)}for(let Se=0;Se<100;Se++){const ze=Se%2?-1:1,et=ze*(51+Se%9*4),We=-210+Math.floor(Se/2)*5.4,Ye=3.5+Se%4;A(new zn(1.3+Se%3*.25,Ye,6),u,et,Ye/2-.8,We),We>=-22&&We<=92&&a?.addBox(2.6,2.6,et,We,"forest-tree",Ye)}function y(Se,ze){const et=c(oi(Se,!1));Se.forEach(Ye=>Ye.dispose());const We=new gt(et,ze);return o.add(We),We}const S=y(T,g),_=y(h,p),x=y(u,m),D=[];for(let Se=0;Se<14;Se++)for(let ze=0;ze<4;ze++)A(new li(1,9,6),D,-100+Se%7*32+(ze-1.5)*4,29+Se%4*4+ze%2*1.5,-120+Math.floor(Se/7)*165,7,3.2,4.8);const P=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),C=y(D,P),N=6e3,X=new Float32Array(N*3),U=new Float32Array(N*6),W=[];for(let Se=0;Se<N;Se++)W.push({x:Se*73.31%64-32,y:Se*17.73%32,z:Se*41.71%70-35});const $=c(new zt);$.setAttribute("position",new nn(X,3)),$.setDrawRange(0,320);const Y=new Kl({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});t.set("environment:particles",Y);const ne=new Zu($,Y);ne.frustumCulled=!1,o.add(ne);const Z=c(new zt);Z.setAttribute("position",new nn(U,3));const ie=new Yl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});t.set("environment:rain-streaks",ie);const oe=new Ku(Z,ie);oe.frustumCulled=!1,o.add(oe);const me=c(new Jn(260,24,48,4)),Fe=new Float32Array(me.attributes.position.count*3);for(let Se=0;Se<me.attributes.position.count;Se++)new nt().setHSL(.38+Se%49/49*.34,.75,.62).toArray(Fe,Se*3);me.setAttribute("color",new nn(Fe,3));const te=new Un({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:qt,blending:Qs});t.set("environment:aurora",te);const Me=new gt(me,te);Me.position.set(0,55,-235),o.add(Me);const Te=me.attributes.position.array.slice();let Re={},ye=0,Ve="",St="",Pe=!1,at=-60;const ut={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function Ie(Se){const ze=xc(Re,Date.now()+ye).mode;if(ze===Ve&&St===`${Re.landscape}:${Se}`)return;Ve=ze,St=`${Re.landscape}:${Se}`;const et=ut[Re.landscape]||ut.alps;f.color.set(et[0]),g.color.set(et[1]),m.color.set(et[2]);const We=ze==="aurora";i.background=new nt(We?"#102339":Se?"#142730":ze==="rain"?"#a6babd":ze==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new Ka(i.background,ze==="mist"?.007:ze==="rain"?.0035:.0013),n.intensity=We?.6:ze==="rain"?1.35:Se?1.65:2.7,s.intensity=We?1.6:Se?2.05:2.6,r.intensity=We?1.8:1.1,P.color.set(ze==="rain"?"#859c9f":"#f5f2e9"),Y.color.set("#ffffff"),Y.size=.13}return{configure(Se={},ze=!1){Re=Se.settings||{},Number.isFinite(Se.server_ms)&&(ye=Se.server_ms-Date.now()),Pe=ze,S.visible=_.visible=Re.mountains!==!1,C.visible=Re.clouds!==!1;const et=Re.precipitation||"heavy",We=Pe?900:et==="light"?650:et==="storm"?5800:3600;$.setDrawRange(0,We),Z.setDrawRange(0,We*2),St=""},update(Se,{paused:ze=!1,dark:et=!1,center:We=null}={}){Ie(et);const Ye=Ve,Ce=ze?0:Se/1e3;if(C.position.x=ze?0:Math.sin(Ce*.012)*9,ne.visible=Ye==="snow",oe.visible=Ye==="rain",Me.visible=Ye==="aurora",ne.visible||oe.visible){const Tt=$.drawRange.count,xt=We?.x||0,ft=We?.z||0;for(let k=0;k<Tt;k++){const Lt=W[k],$e=Lt.x+xt+Math.sin(Ce*.4+k)*(Ye==="snow"?.55:.1),ht=(Lt.y-Ce*(Ye==="snow"?1.4:20)%32+32)%32,he=Lt.z+ft;if(Ye==="snow")X[k*3]=$e,X[k*3+1]=ht,X[k*3+2]=he;else{const ot=k*6;U[ot]=$e,U[ot+1]=ht,U[ot+2]=he,U[ot+3]=$e+.1,U[ot+4]=ht-.9,U[ot+5]=he}}(Ye==="snow"?$:Z).attributes.position.needsUpdate=!0}if(Me.visible){const Tt=me.attributes.position.array;for(let xt=0;xt<Tt.length;xt+=3)Tt[xt+1]=Te[xt+1]+Math.sin(Te[xt]*.035+Ce*.3)*5,Tt[xt+2]=Math.cos(Te[xt]*.02+Ce*.17)*9;me.attributes.position.needsUpdate=!0}},extent(Se){Se!==at&&(at=Se,x.scale.z=Math.max(1,Math.abs(Se)/210))},dispose(){i.remove(o),i.fog=null,o.clear()}}}function bg({scene:i,box:e,cylinder:t,orb:n,bake:s,sign:r,material:a,navigation:o,ownedGeometries:c,materials:l}){e(23,.16,20,-30,-.29,51,"#263e39",.14);for(let y=-40;y<=-20;y+=2)for(let S=43;S<=59;S+=2)e(1.98,.025,1.98,y,-.18,S,(y+S)/2%2?"#e8dfcb":"#d1c6ac",0);for(const y of[-41.3,-18.7])e(.15,.09,20,y,-.1,51,"gold",0),e(.35,1.4,19.8,y,.45,51,"deep"),o.addBox(.35,19.8,y,51,"grand-bar-wall",1.3);e(23,4.4,.3,-30,1.75,41,"deep"),o.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const y of[-40,-20])for(const S of[42.5,50.5,59.5])t(.35,.25,y,-.03,S,"gold"),t(.2,4.7,y,2.3,S,"white"),t(.38,.22,y,4.7,S,"gold"),o.addBox(.75,.75,y,S,"grand-bar-column",4.9);for(const y of[42.5,50.5,59.5]){e(20,.2,.35,-30,4.8,y,"gold");for(const S of[-36,-24]){const _=new Zn(2,.075,6,24,Math.PI);s(_,"gold",S,3.4,y)}}e(16,1.35,1.55,-30,.46,45,"oak"),e(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),e(15.7,.06,.045,-30,.87,45.81,"gold",0),o.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const y of[41.65,42.3])e(15,.14,.7,-30,1.5+(y-41.65)*2,y,"wood");for(let y=0;y<14;y++){const S=-36.5+y;t(.11,.55,S,1.87,41.8,y%2?"#87b6a5":"#b89c68"),t(.04,.14,S,2.22,41.8,"gold")}for(const y of[-37,-34,-31,-28,-25,-22])t(.37,.16,y,.57,47.4,"deep"),t(.065,.8,y,.08,47.4,"gold"),t(.28,.06,y,-.12,47.4,"gold"),o.addBox(.75,.75,y,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[y,S,_]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){t(.025,1.7,y,4.8,S,"gold"),s(new Zn(_,.035,6,28),"gold",y,4,S,Math.PI/2);for(let x=0;x<12;x++){const D=x*Math.PI/6,P=y+Math.cos(D)*_,C=S+Math.sin(D)*_;t(.014,.46,P,3.75,C,"gold"),n(.09,.19,.09,P,3.47,C,"white")}}for(const y of[-38,-22])e(2.1,.65,5.1,y,.15,54,"#856c8c",.18),e(.3,1,5.2,y+(y<-30?-.85:.85),.75,54,"#856c8c",.1),o.addBox(2.1,5.1,y,54,"velvet-booth",1.3),t(.68,.12,y+(y<-30?1.8:-1.8),.83,54,"gold"),t(.06,.9,y+(y<-30?1.8:-1.8),.32,54,"gold"),o.addBox(1.4,1.4,y+(y<-30?1.8:-1.8),54,"salon-table",.9);e(8.8,.12,6.4,-30,-.04,56,"black",.07);const f=["#87668e","#508a87","#b99c68","#5c708c"];for(let y=0;y<8;y++)for(let S=0;S<6;S++)e(1.04,.025,1.02,-33.7+y*1.06,.035,53.4+S*1.06,f[(y+S)%4],.015);for(const y of[-34.5,-25.5])e(.04,.06,6.6,y,.02,56,"gold",0);e(5.4,1.2,1.1,-30,.51,51.1,"black"),e(5.5,.12,1.2,-30,1.14,51.1,"gold"),o.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const y of[-31.4,-28.6])t(.57,.08,y,1.24,51.1,"black"),t(.15,.1,y,1.3,51.1,"gold");for(let y=0;y<6;y++)e(.1,.09,.22,-30.65+y*.25,1.26,51.3,"white",.01);for(const y of[-34.5,-25.5]){e(1,2.3,.8,y,1,51,"black");for(const S of[.45,1.35]){const _=new xn(.31,.31,.05,12);s(_,"metal",y,S,51.43,Math.PI/2)}o.addBox(1,.8,y,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),e(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new or({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const p=new Ja(.62,2);c.add(p);const m=new gt(p,g);m.position.set(-30,4.6,56),i.add(m);const M=new Un({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:qt,blending:Qs});l.set("rivage-beams",M);const T=new zn(1.5,3.4,10,1,!0);c.add(T);const h=[];for(const y of[-33,-27])for(const S of[54,58]){const _=new gt(T,M);_.position.set(y,2,S),_.userData.rivageEffect="beam",i.add(_),h.push(_)}const u=[],v=new Un({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",v);for(const[y,S,_,x,D,P,C]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const N=new Yt(S,_,x);c.add(N);const X=new gt(N,v);X.position.set(D,P,C),X.userData.officeVenue=y,i.add(X),u.push(X)}const w=f.map(y=>{const S=a(y);return S.emissive.set(y),S});let A=!0;return{targets:u,setEnabled(y){A=!!y},update(y,{paused:S,energySaver:_}){S||(m.rotation.y=y/18e3);const x=S||_||!A;for(const D of h)D.visible=!x;for(let D=0;D<w.length;D++)w[D].emissiveIntensity=x?.13:.2+Math.sin(y/4500+D)*.05}}}function Tg(i,e=Sn.spawn){let t={x:e.x,y:e.y??-.12,z:e.z,yaw:e.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle"},n=!1,s=!0;const r=(o,c,l)=>Math.max(c,Math.min(l,o));function a(o,c={},l=0,f=[]){const g=r(Number(o)||0,0,.05);let p=Number(c.x)||0,m=Number(c.z)||0;const M=Math.hypot(p,m);M>1&&(p/=M,m/=M),t.stamina<=5?s=!1:t.stamina>=30&&(s=!0);const T=!!(c.boost&&M&&s),h=T?9:4.5;t.stamina=r(t.stamina+(T?-23:14)*g,0,100);const u=(Math.cos(l)*p-Math.sin(l)*m)*h,v=(-Math.sin(l)*p-Math.cos(l)*m)*h;t.vx=u,t.vz=v,c.jump&&!n&&t.grounded&&(t.vy=7,t.grounded=!1),n=!!c.jump,t.grounded||(t.vy-=20*g,t.y+=t.vy*g,t.y<=-.12&&(t.y=-.12,t.vy=0,t.grounded=!0));let w=i.slide(t,{x:t.x+u*g,z:t.z+v*g});f.some(y=>Math.hypot(w.x-y.x,w.z-y.z)<.62)&&(w={x:t.x,z:t.z});const A=Math.hypot(w.x-t.x,w.z-t.z)>1e-4;return t.x=w.x,t.z=w.z,A&&(t.yaw=Math.atan2(u,v)),t.action=t.grounded?A?T?"run":"walk":"idle":"jump",{...t}}return{step:a,state:()=>({...t}),reset(o){t={...t,...o,vx:0,vz:0,vy:0,grounded:(o.y??-.12)<=-.1},n=!1},face(o){t.yaw=Math.atan2(o.x-t.x,o.z-t.z)},moving:()=>!t.grounded||Math.hypot(t.vx,t.vz)>.01}}function _l(i,e){const t=Sn.venues[e];return!!(i&&t&&Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)}function xl(i,e,t,n){const s=i.id+":"+e;if(t.has(s))return t.get(s);const r=[];function a(h,u,v,w,A,y=0){y&&h.rotateZ(y),h.translate(v,w,A);const S=h.index?h.toNonIndexed():h;S!==h&&h.dispose();const _=new nt(u),x=new Float32Array(S.attributes.position.count*3);for(let D=0;D<x.length;D+=3)x[D]=_.r,x[D+1]=_.g,x[D+2]=_.b;S.setAttribute("color",new nn(x,3)),r.push(S)}const o=(h,u,v,w,A,y,S,_=0)=>a(new Yt(h,u,v),w,A,y,S,_),c=(h,u,v,w,A,y,S=h)=>a(new xn(S,h,u,10),v,w,A,y),{accent:l,hair:f,motif:g,accessory:p,hairStyle:m,shirt:M}=i;if(e==="head"){if(o(.49,.16,.45,f,0,.23,-.02),o(.45,m==="long"?.72:.29,.13,f,0,m==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(m))for(const h of[-1,1])o(.09,m==="long"?.6:.33,.32,f,h*.24,-.02,-.03);if(m==="spiky")for(let h=0;h<7;h++)a(new zn(.11,.27+h%3*.06,5),f,(h-3)*.066,.39+Math.sin(h)*.025,-.06,(h-3)*-.16);if(m==="split"&&o(.245,.18,.46,l,.123,.24,-.015),m==="side"&&o(.26,.25,.05,f,-.12,.08,.218,-.18),m==="ponytail"&&o(.27,.5,.25,f,0,-.15,-.37),p.includes("headband")&&(o(.49,.075,.045,"#303d4b",0,.13,.225),o(.22,.07,.025,"#c6cbd0",0,.13,.254),o(.055,.025,.01,"#4d6170",0,.13,.27)),p==="mask-headband"&&(o(.44,.18,.035,l,0,-.12,.22),o(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),p==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,M,0,.395,0)),p==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),o(.055,.17,.025,"#f1e8db",0,.46,.28),o(.17,.055,.025,"#f1e8db",0,.46,.29);for(const h of[-1,1])o(.06,.33,.06,"#94745a",h*.3,.64,0,h*-.3),o(.15,.055,.06,"#94745a",h*.36,.72,0)}if(p==="bamboo"){const h=new xn(.052,.052,.35,10);h.rotateZ(Math.PI/2),a(h,"#88a970",0,-.1,.255),o(.08,.07,.03,l,.23,.23,-.03)}if(p==="turban"&&(c(.3,.17,l,0,.29,0),o(.39,.07,.46,"#d9d4c4",0,.34,0)),p==="goggles"||p==="glasses")for(const h of[-1,1])o(.19,.12,.06,l,h*.12,p==="goggles"?.23:.04,.235),o(.13,.07,.025,"#849d9a",h*.12,p==="goggles"?.23:.04,.271);if(p==="boarhood"){o(.52,.42,.43,"#95939c",0,.04,-.02),o(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const h of[-1,1])o(.12,.2,.08,"#aba2a6",h*.2,.31,0,h*-.35),o(.06,.055,.025,"#84aabb",h*.14,.07,.208)}if(p==="butterfly")for(const h of[-1,1])o(.18,.17,.045,l,h*.15,.31,-.12,h*.4);if(p==="earrings")for(const h of[-1,1])o(.045,.15,.035,"#e9d6bc",h*.26,-.19,.02);if(i.id==="naruto")for(const h of[-1,1])for(let u=0;u<3;u++)o(.08,.012,.01,"#9f7055",h*.15,-.055-u*.033,.208,h*.1)}else{if(o(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){o(.028,.53,.035,l,0,1.23,.19);for(const h of[-1,1])o(.14,.37,.04,l,h*.14,1.26,.19,h*.08);if(g==="suit"&&(o(.17,.44,.035,"#ded9c8",0,1.25,.2),o(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let h=0;h<3;h++)o(.03,.03,.035,"#eee2ba",0,1.13+h*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let h=0;h<4;h++)for(let u=0;u<4;u++){const v=(u-1.5)*.112,w=1+h*.13;g==="checks"&&(h+u)%2===0&&o(.11,.127,.025,l,v,w,.19),g==="triangles"&&(h+u)%2===0&&a(new zn(.035,.065,3),l,v,w,.205),g==="clouds"&&h%2===0&&u%2===0&&(o(.13,.045,.03,l,v,w,.2),c(.04,.03,l,v,w+.035,.2))}if(g==="circle"&&a(new Zn(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){o(.43,.33,.08,l,0,1.29,.21);for(let h=0;h<3;h++)o(.32,.015,.02,"#b6a273",0,1.19+h*.07,.26)}else if(g==="split")o(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")o(.65,.89,.07,l,0,1.14,-.23),o(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const h of[-1,1])o(.12,.51,.07,l,h*.24,1.22,.16);o(.6,.23,.08,l,0,.89,-.2)}else for(const h of[-1,1])o(.065,.52,.04,l,h*.1,1.23,.2,h*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(p))for(let h=0;h<(p==="swords"?3:1);h++){const u=.3+h*.06;o(.055,.83,.055,"#373d4a",u,.92,-.18,-.25),o(.09,.23,.07,l,u+.1,1.4,-.18,-.25)}if(p==="neckmask"&&o(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(p))for(const h of[-1,1])o(p==="gauntlets"?.27:.2,.2,.24,l,h*.37,.99,.05)}const T=oi(r,!1);return r.forEach(h=>h.dispose()),n.add(T),t.set(s,T),T}function wg({host:i,labels:e,onSelect:t,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onPilotState:a=()=>{},rendererFactory:o=f=>new ig(f),controlsFactory:c=(f,g)=>new rg(f,g),getDate:l=()=>new Date}){const f=new Fu,g=new pn(36,1,.1,1200),p=o({antialias:!0,alpha:!1,powerPreference:"low-power"});p.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),p.outputColorSpace=$t,p.toneMapping=Fa,p.toneMappingExposure=1.18,i.append(p.domElement);const m=c(g,p.domElement);m.enableDamping=!0,m.dampingFactor=.09,m.minDistance=8,m.maxDistance=650,m.minPolarAngle=.32,m.maxPolarAngle=1.28,m.target.set(0,0,0),m.enablePan=!0,m.panSpeed=.7,m.rotateSpeed=.55,m.enableKeys=!1;const M=new ih("#fbf3dc","#526c61",2.8);f.add(M);const T=new ko("#fff1cf",3.2);T.position.set(-12,25,15),f.add(T);const h=new ko("#cce5ef",1.1);h.position.set(15,10,-10),f.add(h);const u=new Map,v=new Map,w=new Set,A=new Set,y=new Map,S=yg(),_={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function x(R){return u.has(R)||u.set(R,new or({color:_[R]||R,roughness:R==="metal"?.4:.82,metalness:R==="gold"?.45:.02,...R==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:qt}:{}})),u.get(R)}const D=new on;function P(R,I,z,d,E,F=0,G=0,B=0){let re=R;R.index&&(re=R.toNonIndexed(),R.dispose()),D.setFromEuler(new wn(F,G,B)),re.applyMatrix4(new dt().compose(new H(z,d,E),D,new H(1,1,1))),v.has(I)||v.set(I,[]),v.get(I).push(re)}function C(R,I,z,d,E,F,G,B=.035,re=0){P(B>0?new cr(R,I,z,1,Math.min(B,R/3,I/3,z/3)):new Yt(R,I,z),G,d,E,F,0,re)}function N(R,I,z,d,E,F,G=R){P(new xn(G,R,I,12),F,z,d,E)}function X(R,I,z,d,E,F,G){const B=new li(1,10,7);B.scale(R,I,z),P(B,G,d,E,F)}function U(R,I,z=1){S.addBox(.85*z,.85*z,R,I,"plant",2*z),N(.4*z,.7*z,R,.35*z,I,"pot",.31*z),N(.045*z,1.4*z,R,1.2*z,I,"oak");for(let d=0;d<5;d++){const E=d*2.4;X(.48*z,.52*z,.25*z,R+Math.cos(E)*.3*z,(1.4+d*.15)*z,I+Math.sin(E)*.25*z,d%2?"leaf":"lightLeaf")}}function W(R,I,z,d,E,F,G="#f2e8d5",B=0){const re=document.createElement("canvas");re.width=768,re.height=192;const ue=re.getContext("2d");ue.clearRect(0,0,768,192),ue.fillStyle=G,ue.textAlign="center",ue.font="500 66px Georgia",ue.fillText(R,384,88),ue.font="20px Arial",ue.fillText(I,384,139);const ae=new Fo(re);ae.colorSpace=$t,A.add(ae);const K=new Un({map:ae,transparent:!0,depthWrite:!1,side:qt}),V=new Jn(z,z/4);w.add(V);const Le=new gt(V,K);Le.position.set(d,E,F),Le.rotation.y=B,f.add(Le),u.set(`sign-${R}`,K)}C(86,.6,96,0,-.94,28,"base",.3),C(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),C(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const R of[-1,1]){C(54,.04,4,R*70,-.17,20,"#e6dfcc",0),C(4,.04,55,R*87,-.17,45,"#e6dfcc",0);for(let I=-20;I<92;I+=8)N(.08,1.1,R*99,.35,I,"wood"),C(.08,.08,8,R*99,.7,I+4,"wood",0);for(const I of[34,58,80])C(3,.4,.9,R*92,.05,I,"wood",.06),S.addBox(3,.9,R*92,I,"trail-bench",.7),U(R*80,I,1);W("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,R*58,1.7,18)}S.addBox(160,40,0,97,"water-boundary",.1),S.addBox(202,.3,0,-21.8,"residential-boundary",1.2);for(const R of[-99,99])S.addBox(.2,114,R,35,"scenic-fence",1.2);S.addBox(202,.2,0,91,"scenic-boundary",1.2),C(85,.07,18,0,-.43,67,"#e4cfa5",.1),C(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let R=0;R<8;R++)C(120-R*8,.02,.13,0,-.57,79+R*2.8,"#c4ddd4",0);C(7,.07,24,0,-.4,60,"#e6dfcc",.1);const $=bg({scene:f,box:C,cylinder:N,orb:X,bake:P,sign:W,material:x,navigation:S,ownedGeometries:w,materials:u});for(let R=0;R<8;R++){const I=-36+R*3.7;C(1.5,.25,2.8,I,-.1,67,"white",.1),C(1.4,.17,1,I,.26,66,"sofa",.08),S.addBox(1.5,2.8,I,67,"beach-chair",.6),R%2===0&&(N(.05,3,I+1.2,1,65,"gold"),P(new zn(1.8,.6,10),"white",I+1.2,2.7,65),S.addBox(.2,.2,I+1.2,65,"parasol",2.8))}C(19,.15,10,22,-.3,65,"wood",.1),W("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const R of[16,22,28])N(1.2,.13,R,.8,63,"white"),N(.1,1,R,.2,63,"gold"),S.addBox(2.4,2.4,R,63,"terrace-table",.9);for(const R of[-10,-6,-2]){U(R,58,.9);for(let I=0;I<4;I++)X(.15,.2,.15,R+(I-1.5)*.3,.9,58,"#c18b9c")}C(83,.08,4,0,-.44,20,"#e6dfcc",.12),C(6,.08,64,0,-.44,16,"#e6dfcc",.1),C(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const R of[-41,41])for(const I of[-15,-2,14,31,46])U(R,I,1.7),N(.08,3.2,R+(R<0?1:-1),1.15,I+2,"gold"),X(.22,.25,.22,R+(R<0?1:-1),2.85,I+2,"white");const Y=[];function ne(R,I,z,d){S.addBox(z,.12,R,I,"net",d);for(const E of[-z/2,z/2])N(.055,d,R+E,d/2,I,"white");for(let E=.3;E<=d;E+=.22)C(z,.018,.025,R,E,I,"white",0);for(let E=-z/2;E<=z/2;E+=.4)C(.012,d-.3,.018,R+E,(d+.3)/2,I,"white",0)}function Z(R,I,z=.16){const d=new li(z,10,8);w.add(d);const E=new gt(d,x(I));f.add(E),Y.push({mesh:E,game:R})}for(const R of ni){const{x:I,z,id:d}=R;if(S.addBox(6,.14,I,z-(R.kind==="court"?6:4.2),"sign",1.2),C(R.kind==="court"?17:10,.12,R.kind==="court"?13:9,I,-.29,z,d==="tennis"?"#a77355":d==="badminton"?"#3b7e77":d==="basketball"?"#b99569":"#dce0ca",.14),C(6,1.1,.12,I,.65,z-(R.kind==="court"?6:4.2),"deep"),W(R.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,I,.75,z-(R.kind==="court"?5.91:4.11)),d==="tennis"||d==="badminton"||d==="basketball"){for(const E of[-7,7])C(.045,.015,10.8,I+E,-.21,z,"white",0);for(const E of[-5.4,0,5.4])C(14,.015,.045,I,-.21,z+E,"white",0);if(d!=="basketball"){for(const E of[-5.7,5.7])C(.035,.015,10.8,I+E,-.2,z,"white",0);ne(I,z,14,d==="badminton"?1.7:1.15),Z(R,d==="tennis"?"#d9e56b":"white",d==="tennis"?.17:.12)}else{for(const E of[-1,1]){N(.09,3.6,I,1.5,z+E*5,"metal"),C(2.3,1.35,.13,I,3.1,z+E*4.7,"white");const F=new Zn(.43,.045,6,20);P(F,"#c67543",I,2.8,z+E*4.1,Math.PI/2)}Z(R,"#bd6c32",.25)}}else if(d==="golf"){for(const E of[-6.5,6.5])S.addBox(.2,8,I+E,z,"golf-edge",.5);C(13,.12,8,I,-.15,z,"#69885c",.15);for(const E of[-6.5,6.5])C(.2,.35,8,I+E,-.05,z,"woodLight");for(let E=0;E<3;E++)N(.22,.02,I-4+E*4,-.07,z+(E%2?2:-2),"black"),N(.025,1.5,I-4+E*4,.65,z+(E%2?2:-2),"gold"),C(.8,.4,.03,I-3.6+E*4,1.25,z+(E%2?2:-2),"#c78362");Z(R,"white",.12)}else if(d==="bowling"){for(const E of[-2.7,2.7])S.addBox(.35,11,I+E,z,"bowling-edge",.4);C(5,.09,11,I,-.13,z,"woodLight");for(const E of[-2.7,2.7])C(.35,.12,11,I+E,-.1,z,"oak");for(let E=0;E<4;E++)for(let F=0;F<=E;F++){const G=I+(F-E/2)*.55,B=z-2-E*.5;N(.14,.5,G,.17,B,"white",.08),X(.13,.14,.13,G,.49,B,"white")}Z(R,"#786397",.28)}else if(d==="arcade")for(const E of[-2.2,2.2]){S.addBox(2.1,1.6,I+E,z,"arcade",2.5),S.addBox(1.2,1.2,I+E,z+2,"seat",.7),C(2.1,2.6,1.6,I+E,1.1,z,"deep",.1),C(1.6,1.1,.05,I+E,1.7,z+.83,"screen");for(let F=0;F<5;F++)C(.05,.6,.02,I+E+(F-2)*.2,1.7,z+.87,F%2?"#e8c877":"screenLine",0);N(.18,.06,I+E,.9,z+1.1,"gold"),C(1.2,.45,1.2,I+E,.2,z+2,"sofa",.1)}else if(d==="archery"){S.addBox(5,.3,I,z-2,"archery-backstop",3.2),C(5,3.2,.25,I,1.2,z-2,"wood");for(let E=0;E<5;E++){const F=new xn(1.1-E*.21,1.1-E*.21,.03,24);P(F,["white","#283e49","#73a7bf","#c36f60","gold"][E],I,1.6,z-1.82+E*.035,Math.PI/2)}C(5,.02,.12,I,-.18,z+2.8,"white",0)}else if(d==="darts"){S.addBox(5,.22,I,z-1.8,"dart-board",2.8),C(5,3,.22,I,1.25,z-1.8,"deep");for(let E=0;E<4;E++){const F=new xn(1.05-E*.23,1.05-E*.23,.025,24);P(F,E%2?"white":"#bf6f59",I,1.6,z-1.64+E*.025,Math.PI/2)}}else{S.addBox(5.5,3.5,I,z,"game-table",1.3),C(5.5,.25,3.5,I,1,z,d==="pingpong"?"#4c7783":d==="billiards"?"#376a59":"woodLight",.1);for(const E of[-2.2,2.2])for(const F of[-1.2,1.2])C(.18,1.1,.18,I+E,.4,z+F,"oak");if(d==="pingpong"&&(ne(I,z,5.5,1.45),Z(R,"white",.1)),d==="uno")for(let E=0;E<16;E++){const F=E%4;C(.32,.035,.48,I+(F<2?-1.7+E%4*.3:1.4),1.16+E*.002,z+(F%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][E%4],.02,E*.3)}if(d==="chess")for(let E=0;E<8;E++)for(let F=0;F<8;F++)C(.34,.02,.34,I+(E-3.5)*.34,1.14,z+(F-3.5)*.34,(E+F)%2?"deep":"white",0),(F<2||F>5)&&N(.075,.17,I+(E-3.5)*.34,1.24,z+(F-3.5)*.34,F<2?"white":"black");if(d==="billiards")for(let E=0;E<10;E++)X(.12,.12,.12,I+Math.sin(E*2)*1.8,1.25,z+Math.cos(E)*.9,["gold","white","deep"][E%3]);if(d==="foosball")for(let E=0;E<5;E++){C(.045,.045,4.5,I-2+E,1.4,z,"metal",0);for(const F of[-1,0,1])C(.2,.45,.18,I-2+E,1.48,z+F,E%2?"#ba7864":"deep")}for(const E of[-1,1])C(4,.35,.8,I,.28,z+E*3.8,"sofa",.1),S.addBox(4,.8,I,z+E*3.8,"bench",.5)}}C(40.5,.6,28,0,-.6,0,"base",.22),C(39.8,.22,27.3,0,-.2,0,"edge",.1),C(39.4,.18,26.9,0,-.04,0,"floor",.08),C(37.8,.04,13.5,0,.07,-5.8,"stone",.05),C(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),C(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let R=-18;R<19;R+=1.9)C(.015,.015,12.4,R,.14,-5.8,"#c3cfbf",0);C(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),C(39.4,.22,.5,0,4.8,-13.25,"gold"),C(8,4.8,.18,0,2.35,-13.02,"deep");for(let R=0;R<21;R++)C(.06,4.6,.1,-3.8+R*.38,2.35,-12.87,"wood",.01);C(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),W("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const R of[-15,-10,10,15]){C(4.1,2.9,.15,R,2.6,-13,"glass"),C(4.2,.08,.23,R,4.08,-12.85,"gold"),C(4.2,.12,.3,R,1.12,-12.85,"woodLight");for(const I of[-2,0,2])C(.055,2.9,.2,R+I,2.6,-12.86,"gold",0)}C(.13,2.8,10.8,0,1.55,-6.4,"glass"),C(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const R of[-11.8,-6.4,-1])C(.08,2.9,.08,0,1.5,R,"gold",0);C(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),C(.22,.08,25.7,-19.5,2.8,-.1,"gold"),C(.2,2.7,25.7,19.5,1.4,-.1,"glass"),C(.22,.08,25.7,19.5,2.8,-.1,"gold"),W("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),W("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function ie(R,I,z){S.addBox(2.6,1.28,R,I,"desk",2.3),C(2.6,.15,1.28,R,1.31,I,"woodLight",.08);for(const d of[-1.03,1.03])C(.09,1.17,1.02,R+d,.66,I,"white"),C(.45,.08,.94,R+d,.15,I,"metal");C(1,.66,.08,R,1.91,I-.22,"metal"),C(.9,.54,.02,R,1.92,I-.166,"screen");for(let d=0;d<3;d++)C(.28+d*.12,.024,.025,R-.14+d*.04,2.03-d*.1,I-.149,"screenLine",0);N(.07,.25,R,1.48,I-.2,"metal"),C(.45,.035,.25,R,1.405,I-.19,"metal"),C(.71,.035,.24,R,1.42,I+.32,"white"),N(.09,.18,R+.9,1.49,I+.12,"deep"),C(.64,.17,.64,R,.66,I+1.02,z==="umum"?"sofa":"teal",.1),C(.65,.7,.12,R,1.08,I+1.33,z==="umum"?"sofa":"teal",.09),N(.055,.5,R,.35,I+1.05,"metal"),C(.8,.06,.14,R,.15,I+1.05,"metal"),C(.14,.06,.8,R,.15,I+1.05,"metal")}const oe={umum:[],operasional:[]};for(const R of["umum","operasional"])for(let I=0;I<4;I++)for(let z=0;z<4;z++){const d=(R==="umum"?-15:3.4)+z*3.75,E=-10.3+I*3.15;oe[R].push([d,.18,E+1.03]),ie(d,E,R)}for(const R of[-18.5,18.5]){C(.7,2.4,4.7,R,1.25,-8.4,"wood");for(let I=0;I<3;I++){C(.86,.06,4.8,R,.65+I*.69,-8.4,"gold");for(let z=0;z<8;z++)C(.5,.38+z%2*.12,.18,R,.88+I*.69,-10.3+z*.5,z%2?"white":"deep")}}C(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const R of[4.7,8,11.3]){C(15.8,.45,1.05,-8.7,.57,R,"sofa",.16),C(15.8,.9,.25,-8.7,.91,R-.62,"sofa",.12);for(let I=0;I<8;I++)C(1.72,.17,.95,-15.8+I*2.02,.86,R,I%3===0?"pillow":"sofa",.1);for(const I of[-16.7,-.7])C(.25,.68,1.35,I,.8,R,"sofa",.1)}for(const R of[-11.5,-5]){C(2.7,.13,1.2,R,.64,6.6,"woodLight",.12);for(const I of[-.9,.9])N(.05,.48,R+I,.37,6.6,"gold");N(.16,.22,R+.4,.81,6.6,"white")}C(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const R of[-11.5,-6.5])N(.04,.5,R,.32,2.85,"gold");W("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),C(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),C(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),C(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let R=0;R<23;R++)C(.055,1.15,.07,7.9+R*.4,.78,2.26,"woodLight",.01);C(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),C(.8,.55,.05,15.3,1.9,1.94,"black"),N(.18,.24,14.1,1.64,1.5,"white"),N(.18,.24,13.6,1.64,1.5,"white"),W("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const R of[8,13.8])for(const I of[5.1,9.7]){N(1.45,.12,R,1.05,I,"woodLight"),N(.13,.92,R,.55,I,"gold"),N(.68,.08,R,.12,I,"gold");for(const z of[-1.6,1.6])N(.42,.14,R+z,.67,I,"deep"),N(.055,.55,R+z,.34,I,"gold");N(.18,.22,R+.4,1.22,I,"white"),N(.22,.04,R-.3,1.14,I+.2,"white")}for(const[R,I,z]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])U(R,I,z);S.addBox(39.4,.32,0,-13.25,"wall",4.8),S.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const R of[-19.5,19.5])S.addBox(.2,25.7,R,-.1,"glass-wall",2.8);for(const R of[4.7,8,11.3])S.addBox(16.1,1.5,-8.7,R,"sofa",1.4);S.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),S.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const R of[8,13.8])for(const I of[5.1,9.7])S.addBox(2.9,2.9,R,I,"cafe-table",1.3);for(const R of[-18.5,18.5])S.addBox(.9,4.8,R,-8.4,"shelf",2.6);for(const R of[-11.5,-5])S.addBox(2.7,1.2,R,6.6,"lounge-table",.8);for(const[R,I]of v){const z=oi(I,!1);I.forEach(d=>d.dispose()),z&&(w.add(z),f.add(new gt(z,x(R))))}v.clear();const me=xg({scene:f,material:x,ownedGeometries:w}),Fe=Eg({scene:f,materials:u,ownedGeometries:w,sun:T,hemi:M,fill:h,navigation:S}),te=document.createElement("canvas");te.width=te.height=128;const Me=te.getContext("2d"),Te=Me.createRadialGradient(64,64,7,64,64,64);Te.addColorStop(0,"#16382f35"),Te.addColorStop(1,"#16382f00"),Me.fillStyle=Te,Me.fillRect(0,0,128,128);const Re=new Fo(te);A.add(Re);const ye=new Jn(66,49);w.add(ye);const Ve=new Un({map:Re,transparent:!0,depthWrite:!1});u.set("shadow",Ve);const St=new gt(ye,Ve);St.rotation.x=-Math.PI/2,St.position.y=-.98,f.add(St);const Pe=new Map,at=new Map;function ut(R){if(at.has(R))return at.get(R);const I=[];if(R==="archery"){const d=new Zn(.34,.025,5,16,Math.PI);d.rotateZ(-Math.PI/2),I.push(d.toNonIndexed()),d.dispose();const E=new Yt(.035,.035,.85);E.translate(0,0,.1),I.push(E.toNonIndexed()),E.dispose()}else{const d=new xn(.017,.03,R==="billiards"?1.65:1,6);d.rotateX(Math.PI/2),I.push(d.toNonIndexed()),d.dispose()}const z=oi(I,!1);return I.forEach(d=>d.dispose()),w.add(z),at.set(R,z),z}function Ie(R,I,z,d,E){const F=I+z.join(":");if(!Pe.has(F)){const B=I==="sphere"?new li(z[0],10,8):new cr(...z,1,.06);Pe.set(F,B),w.add(B)}const G=new gt(Pe.get(F),x(d));return G.position.set(...E),R.add(G),G}const Se=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],ze=new Map,et=new or({vertexColors:!0,roughness:.8});u.set("costume-vertex",et);function We(R){const I=new fn;f.add(I);const z=Sc(R.avatar),d=yc(z.costume),E=(d?.style||z.style)==="feminine",F=d?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[z.color]||Se[R.id%Se.length],G=new fn;I.add(G);const B={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[z.skin],re=z.hair==="hijab"?F:"#352c32";if(Ie(G,"box",[E?.43:.5,.65,.33],F,[0,1.17,0]),!d&&z.outfit==="blazer"){Ie(G,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Oe of[-1,1]){const rt=Ie(G,"box",[.07,.32,.035],"gold",[Oe*.12,1.33,.19]);rt.rotation.z=Oe*.25}}!d&&z.outfit==="sport"&&Ie(G,"box",[.32,.055,.02],"white",[0,1.3,.18]);const ue=!d&&z.outfit==="dress"?Ie(G,"box",[.6,.4,.44],F,[0,.79,0]):null,ae=new fn;if(ae.position.y=1.69,G.add(ae),Ie(ae,"box",[.43,.46,.4],B,[0,0,0]),d)ae.add(new gt(xl(d,"head",ze,w),et)),G.add(new gt(xl(d,"body",ze,w),et));else{const Oe="hair:"+z.hair;if(!Pe.has(Oe)){const rt=[[.47,.18,.44,0,.21,-.02],[.45,z.hair==="long"||z.hair==="hijab"?.67:.3,.12,0,z.hair==="long"||z.hair==="hijab"?-.12:.07,-.2]];if(z.hair!=="short")for(const Et of[-1,1])rt.push([.09,z.hair==="bob"?.4:.53,.32,Et*.235,-.01,-.03]);const Ft=rt.map(([Et,cn,gs,pc,mc,gc])=>{const pr=new Yt(Et,cn,gs);pr.translate(pc,mc,gc);const _c=pr.toNonIndexed();return pr.dispose(),_c}),vt=oi(Ft,!1);Ft.forEach(Et=>Et.dispose()),Pe.set(Oe,vt),w.add(vt)}ae.add(new gt(Pe.get(Oe),x(re)))}if(!d&&z.hair==="ponytail"&&Ie(ae,"box",[.24,.53,.22],re,[0,-.02,-.35]),!d&&z.hair==="hijab"&&Ie(G,"box",[.58,.18,.43],re,[0,1.44,-.04]),!Pe.has("eyes")){const Oe=[-.095,.095].map(Ft=>{const vt=new Yt(.035,.045,.025);vt.translate(Ft,.035,.205);const Et=vt.toNonIndexed();return vt.dispose(),Et}),rt=oi(Oe,!1);Oe.forEach(Ft=>Ft.dispose()),Pe.set("eyes",rt),w.add(rt)}const K=new gt(Pe.get("eyes"),x("#263833"));ae.add(K);const V=[K];if(Ie(ae,"box",[.09,.02,.025],E?"#b96f78":"#9c6d58",[0,-.105,.21]),E)for(const Oe of[-.14,.14])Ie(ae,"box",[.065,.025,.02],"#d39589",[Oe,-.065,.21]);if(z.accessory==="glasses"){for(const Oe of[-1,1])Ie(ae,"box",[.15,.11,.025],"gold",[Oe*.105,.04,.224]),Ie(ae,"box",[.11,.07,.025],B,[Oe*.105,.04,.24]);Ie(ae,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(z.accessory==="headphones"){Ie(ae,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Oe of[-1,1])Ie(ae,"box",[.12,.2,.18],"deep",[Oe*.28,.07,0])}const Le=[];for(const Oe of[-.34,.34]){const rt=new fn;rt.position.set(Oe,1.42,0),G.add(rt),Ie(rt,"box",[.17,.4,.2],F,[0,-.19,0]),Ie(rt,"box",[.15,.27,.16],B,[0,-.45,.05]),Le.push(rt)}const Je=[],we=[];for(const Oe of[-.14,.14]){const rt=new fn;rt.position.set(Oe,.83,0),G.add(rt),Ie(rt,"box",[.18,.64,.2],d?.pants||"#35463f",[0,-.32,0]),we.push(Ie(rt,"box",[.23,.14,.34],d?.accent||(z.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),Je.push(rt)}const Qe=Ie(Le[1],"sphere",[.12],"white",[0,-.49,.14]),yt=Ie(Le[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),lt=new fn;Le[1].add(lt),lt.position.set(0,-.48,.16),Ie(lt,"box",[.04,.44,.05],"gold",[0,-.14,0]);const je=new Zn(.24,.025,6,16);w.add(je),lt.add(new gt(je,x("white"))),lt.rotation.x=Math.PI/2;const He=new gt(ut("billiards"),x("gold"));He.position.set(0,-.48,.35),Le[1].add(He),He.visible=!1;const Ee=new ar(.5,.59,24);w.add(Ee);const At=new Un({color:"#c5a061",side:qt});u.set(`ring-${R.id}`,At);const qe=new gt(Ee,At);qe.rotation.x=-Math.PI/2,qe.position.y=.02,I.add(qe),qe.visible=!1;const De=document.createElement("button");De.type="button",De.className="vo-avatar-label",De.setAttribute("aria-pressed","false");const mt=document.createElement("i"),Kt=document.createElement("span"),Vt=document.createElement("small");De.append(mt,Kt,Vt),e.append(De);const Wt=document.createElement("span");return Wt.className="vo-speech",Wt.hidden=!0,De.append(Wt),De.addEventListener("click",()=>t(R.id)),I.traverse(Oe=>{Oe.isMesh&&(Oe.userData.personId=R.id)}),{group:I,body:G,head:ae,arms:Le,legs:Je,shoes:we,eyes:V,skirt:ue,cup:Qe,plate:yt,racket:lt,tool:He,bubble:Wt,label:De,dot:mt,name:Kt,icon:Vt,ring:qe,person:R,appearance:JSON.stringify(R.avatar),privateGeometry:je,target:new H,phase:R.id*1.75}}let Ye=null,Ce=!1,Tt=!0,xt=!1,ft=null,k=0,Lt=0,$e=[],ht=null,he=null,ot="orbit",Ue=null,Ge=!1,L={};const b=new Map,q=new Map;let ce=null,J=null,pe=null,de=null,j={},se=a,_e=null,O=()=>!1,ee=null;const Q=new ar(1.2,1.4,32);w.add(Q);const xe=new Un({color:"#e9be69",side:qt,transparent:!0,opacity:.85});u.set("pilot-guide",xe);const fe=new gt(Q,xe);fe.rotation.x=-Math.PI/2,fe.visible=!1,fe.userData.pilotGuide=!0,f.add(fe);const ge=new Map,Ne=[],Ze={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},le=new H,Ae=new H;let Be=!1;function ve(R){J&&pe&&!R.some(K=>K.id===J)&&(R=[...R,pe]),$e=R,me.sync(R),Fe.extent(me.bounds().back);const I=R.map(K=>{if(!he?.connected||!he.room||![he.room.from,he.room.to].includes(K.id)){const V=R.find(Le=>Le.is_me)?.id;return he&&!he.connected&&(K.id===V||K.meeting_with===V)?{...K,meeting_with:null,meeting_spot:null}:K}return{...K,state:"online",meeting_with:he.room.from===K.id?he.room.to:he.room.from,meeting_spot:he.room.spot}}),z=K=>K.id===Ye||K.id===Ue||K.is_me||ce&&[ce.from,ce.to].includes(K.id),d=[...I].sort((K,V)=>+!!z(V)-+!!z(K)||+!!V.meeting_with-+!!K.meeting_with||{online:0,idle:1,offline:2}[K.state]-{online:0,idle:1,offline:2}[V.state]||K.id-V.id),E=[],F={umum:0,operasional:0},G=[],B=new Map;let re=0,ue=0;for(const K of d){if(E.length>=24)break;K.state==="online"&&F[K.department]>=16||(E.push(K),K.state==="online"&&F[K.department]++)}const ae=new Set(E.map(K=>K.id));for(const[K,V]of y)(!ae.has(K)||V.appearance!==JSON.stringify(E.find(Le=>Le.id===K)?.avatar))&&(f.remove(V.group),V.label.remove(),V.ring.geometry.dispose(),w.delete(V.ring.geometry),V.privateGeometry.dispose(),w.delete(V.privateGeometry),V.ring.material.dispose(),u.delete(`ring-${K}`),y.delete(K));F.umum=F.operasional=0;for(const K of E){let V=y.get(K.id),Le=!V;V||(V=We(K),y.set(K.id,V));const Je=V.game?.id,we=V.pose,Qe=V.home?.clone(),yt=K.in_office===!1&&K.state!=="offline",lt=yt?null:ge.get(K.id)||K.pilot,je=K.id===J&&de?de.state():lt;V.person=K,V.pose=vc(K,l());let He;V.game=Mc(K,l());const Ee=yt?null:b.get(K.id)||K.recreation,At=!yt&&ce&&ce.status!=="pending"&&[ce.from,ce.to].includes(K.id);At?(V.game=ni.find(De=>De.id===ce.kind)||V.game,V.pose="playing"):Ee?.kind==="game"&&Ee.until>Date.now()/1e3&&K.state!=="offline"&&(V.game=ni.find(De=>De.id===Ee.destination)||V.game,V.pose="playing");const qe=Ee&&(!Ee.until||Ee.until>Date.now()/1e3)&&Ze[Ee.destination];if(V.destination=!!qe,qe&&!At&&K.state!=="offline"){V.pose=Ee.kind==="drink"?"coffee":Ee.kind==="food"?"eating":Ee.kind==="dance"?"dancing":"resting",He=[qe[0]+K.id%5*1.6,qe[1],qe[2]+Math.floor(K.id%10/5)*1.3];const De=S.nearest({x:He[0],z:He[2]});De&&(He=[De.x,He[1],De.z]),V.group.rotation.y=Math.PI}else if(!yt&&K.meeting_with&&Number.isInteger(K.meeting_spot)&&!At){V.pose="meeting";const De=K.id<K.meeting_with?-1:1;He=[-36+K.meeting_spot*6.5+De*.9,-.12,20],V.facing=De<0?Math.PI/2:-Math.PI/2}else if(V.pose==="working")He=oe[K.department][F[K.department]++],V.group.rotation.y=Math.PI;else if(V.pose==="playing"){const De=B.get(V.game.id)||0;B.set(V.game.id,De+1);const mt=De%2?1:-1;He=[V.game.x+(V.game.kind==="court"?mt*(3-Math.floor(De/2)%3*1.7):Math.floor(De/2)*.8),-.12,V.game.z+mt*(V.game.kind==="court"?3.6:2.5)],V.group.rotation.y=mt<0?0:Math.PI}else if(V.pose==="sleeping")He=me.bed(K.id),V.group.rotation.y=0;else if(V.pose==="resting"){const De=re++;He=[-15.8+De%8*2.02,.12,4.7+Math.floor(De/8)*3.3],V.group.rotation.y=0}else if(ue<8){const De=ue++,mt=De%4,Kt=De<4?1:-1;He=[(mt%2?13.8:8)+Kt*1.65,.08,mt<2?5.1:9.7],V.group.rotation.y=Kt*Math.PI/2}else{const De=re++;He=[-15.8+De%8*2.02,.12,4.7+Math.floor(De/8)*3.3],V.group.rotation.y=0}if(V.pose==="playing"&&V.game.id==="darts"&&(He=[V.game.x+(K.id%2?-1:1)*1.2,-.12,V.game.z+2.5]),["playing","meeting"].includes(V.pose)&&!S.free(He[0],He[2])){const De=S.nearest({x:He[0],z:He[2]});De&&(He=[De.x,He[1],De.z])}if((V.pose==="playing"||qe)&&G.some(De=>Math.hypot(De[0]-He[0],De[2]-He[2])<.7))e:for(const De of[.8,1.5,2.2])for(let mt=0;mt<12;mt++){const Kt=He[0]+Math.cos(mt*Math.PI/6)*De,Vt=He[2]+Math.sin(mt*Math.PI/6)*De;if(S.free(Kt,Vt)&&!G.some(Wt=>Math.hypot(Wt[0]-Kt,Wt[2]-Vt)<.7)){He=[Kt,He[1],Vt];break e}}if(je&&K.state!=="offline"?(He=[je.x,je.y,je.z],V.pose="manual",V.manual=!0,V.group.rotation.y=je.yaw,V.waypoints=[]):V.manual=!1,G.push(He),V.target.set(...He),V.home=V.target.clone(),(Le||we!==V.pose&&V.pose!=="meeting"&&!qe&&!At)&&V.group.position.copy(V.target),!V.manual&&!Le&&(V.pose==="playing"&&(Je!==V.game.id||we!=="playing")||(qe||V.pose==="meeting")&&(!Qe||Qe.distanceTo(V.home)>.1))){if(!S.free(V.group.position.x,V.group.position.z)){const De=S.nearest(V.group.position)||S.nearest({x:0,z:21.5});De&&V.group.position.set(De.x,He[1],De.z)}V.waypoints=S.path(V.group.position,V.home).map(De=>new H(De.x,He[1],De.z))}else!["playing","meeting"].includes(V.pose)&&!qe&&(V.waypoints=[]);Ce&&V.pose==="meeting"&&(V.group.position.copy(V.home),V.group.rotation.y=V.facing,V.waypoints=[]),V.dot.className=`vo-dot ${K.state}`,V.name.textContent=K.name,V.icon.textContent=`${K.state==="offline"?"OFFLINE ":K.state==="idle"?"JEDA ":"ONLINE "}${V.pose==="meeting"?"💬":V.pose==="sleeping"?"☾ RUMAH":V.pose==="playing"?V.game.icon:V.pose==="coffee"?"☕":""}`,At&&ce.bot&&K.id===ce.to&&(V.icon.textContent="OFFLINE · NPC "+V.game.icon),V.pose==="dancing"&&(V.icon.textContent=(K.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),V.label.setAttribute("aria-label",`${K.name}, ${K.state==="online"?"online":K.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),V.cup.visible=V.pose==="coffee",V.plate.visible=V.pose==="eating",V.manual&&(V.cup.visible=je.action==="drink",V.plate.visible=je.action==="eat",V.icon.textContent=(K.private?"PRIVAT · ":"ONLINE · ")+(je.action==="run"?"BOOST":je.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),V.racket.visible=V.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(V.game.id),V.tool.visible=V.pose==="playing"&&["billiards","archery","darts"].includes(V.game.id),V.tool.visible&&(V.tool.geometry=ut(V.game.id)),V.shoes.forEach(De=>{De.visible=V.pose!=="sleeping"}),V.eyes.forEach(De=>{De.scale.y=V.pose==="sleeping"?.18:1}),V.ring.visible=Ye===K.id,V.label.setAttribute("aria-pressed",String(Ye===K.id))}me.select(ht??(y.get(Ye)?.pose==="sleeping"?Ye:null)),wt()}const it=new H;function Ct(){const R=i.getBoundingClientRect(),I=[];for(const z of[...y.values()].sort((d,E)=>+(E.person.id===Ye)-+(d.person.id===Ye))){if(z.pose==="sleeping"){const ue=me.location(z.person.id);it.set(ue.x,5.2,ue.z+1)}else z.group.getWorldPosition(it),it.y+=2.35;it.project(g);const d=(it.x+1)/2*R.width,E=(1-it.y)/2*R.height,F=166,G=27,B=I.some(ue=>Math.abs(ue.x-d)<F&&Math.abs(ue.y-E)<G),re=it.z<1&&it.z>-1&&d>18&&d<R.width-18&&E>15&&E<R.height-65&&(!B||z.person.id===Ye);z.label.hidden=!re,re&&(z.label.style.transform=`translate(${d}px,${E}px) translate(-50%,-100%)`,I.push({x:d,y:E}))}}function ln(R=0){if(ft=null,xt||!Tt)return;if(R-k<1e3/30&&!Ce){ft=requestAnimationFrame(ln);return}const I=Math.min(.06,Math.max(.001,(R-k)/1e3));k=R,Be&&(g.position.lerp(Ae,.12),m.target.lerp(le,.12),g.position.distanceTo(Ae)<.04&&(g.position.copy(Ae),m.target.copy(le),Be=!1));for(const d of y.values()){const E=Ce?0:R/1e3+d.phase;if(d.person.id===J&&de){const B=Math.atan2(g.position.x-m.target.x,g.position.z-m.target.z),re=[...y.values()].filter(ae=>ae!==d&&ae.pose!=="sleeping").map(ae=>ae.group.position),ue=de.step(I,O()?{}:j,B,re);if(["walk","run","jump"].includes(ue.action)&&(ee=null),ee&&(ue.action=ee.action,ue.venue=ee.venue),d.group.position.set(ue.x,ue.y,ue.z),d.group.rotation.y=ue.yaw,d.manual=!0,d.pose="manual",d.home.copy(d.group.position),d.target.copy(d.group.position),_e){const ae=Sn.venues[_e];ue.target=_e,ue.distance=Math.round(Math.hypot(ue.x-ae.x,ue.z-ae.z))}se(ue),d.icon.textContent=(d.person.private?"PRIVAT · ":"ONLINE · ")+(ue.action==="run"?"BOOST":ue.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(d.manual){const B=d.person.id===J&&de?{...de.state(),...ee||{}}:ge.get(d.person.id)||d.person.pilot;if(B&&d.person.id!==J){const K=new H(B.x,B.y,B.z),V=d.group.position.clone().lerp(K,.35);S.segment(d.group.position,V)?d.group.position.copy(V):d.group.position.copy(K),d.group.rotation.y=B.yaw}const re=B&&["walk","run"].includes(B.action),ue=re?Math.sin(R/1e3*(B.action==="run"?13:8))*.55:0;d.body.rotation.set(0,0,0),d.body.position.y=0,d.legs.forEach((K,V)=>K.rotation.x=ue*(V?-1:1)),d.arms.forEach((K,V)=>K.rotation.x=-ue*(V?-1:1)),d.head.rotation.set(0,0,0);const ae=B?.action==="play"?ni.find(K=>K.id===B.venue):null;d.racket.visible=!!(ae&&["tennis","badminton","pingpong","golf"].includes(ae.id)),d.tool.visible=!!(ae&&["billiards","archery","darts"].includes(ae.id)),d.tool.visible&&(d.tool.geometry=ut(ae.id)),d.cup.visible=B?.action==="drink",d.plate.visible=B?.action==="eat",ae&&(d.arms[1].rotation.x=-.8+(Ce?0:Math.sin(E*2.3)*.45)),B?.action==="drink"&&(d.arms[1].rotation.x=-1.2),B?.action==="eat"&&(d.arms[0].rotation.x=-1),B?.action==="dance"&&(d.body.rotation.z=Ce?0:Math.sin(E*2.4)*.12,d.arms[1].rotation.x=-.8,d.arms[0].rotation.x=-.6);continue}const F=d.pose==="playing",G=!Ce&&(F||d.waypoints?.length>0);if(d.target.copy(d.home),F&&!d.waypoints?.length&&(d.target.x+=Math.sin(E*.65)*(d.game.kind==="court"?1.4:.18),d.target.z+=Math.cos(E*.5)*(d.game.kind==="court"?.3:.08)),d.waypoints?.length&&!Ce){const B=d.waypoints[0];d.group.position.distanceTo(B)<.015?d.waypoints.shift():(d.group.rotation.y=Math.atan2(B.x-d.group.position.x,B.z-d.group.position.z),jn(d,B,I*3.2))}else F?jn(d,d.target,Ce?0:I*1.4):d.pose==="meeting"?(jn(d,d.home,Ce?0:I*3.2),d.group.rotation.y=d.facing):d.group.position.copy(d.home);d.legs.forEach((B,re)=>{B.rotation.x=G?Math.sin(E*4+re*Math.PI)*.32:d.pose==="working"||d.pose==="resting"?-1.1:0}),d.body.position.y=Math.sin(E*1.6)*(Ce?0:d.pose==="sleeping"?.007:.018),d.body.rotation.x=d.pose==="sleeping"?-Math.PI/2:0,d.body.rotation.z=F?Math.sin(E*1.5)*.07:0,d.head.rotation.x=d.pose==="sleeping"?0:Math.sin(E*.6)*(Ce?0:.025),d.arms[0].rotation.x=d.pose==="working"?-.65+Math.sin(E*5)*(Ce?0:.045):d.pose==="eating"?-1.05:.1,d.arms[1].rotation.x=d.pose==="working"?-.65+Math.sin(E*5+1)*(Ce?0:.045):d.pose==="coffee"?-1.2+Math.sin(E*1.2)*(Ce?0:.13):d.pose==="eating"?-.8+Math.sin(E*2)*(Ce?0:.13):.1,F&&(d.arms[1].rotation.x=-.6+Math.sin(E*2.3)*(Ce?0:.7),d.arms[0].rotation.x=-.25+Math.sin(E*2.3+1)*(Ce?0:.25)),d.pose==="dancing"&&!G&&(d.body.rotation.z=Ce?0:Math.sin(E*2.4)*.13,d.arms.forEach((B,re)=>{B.rotation.x=-.8+Math.sin(E*2.4+re)*(Ce?0:.5)}),d.legs.forEach((B,re)=>{B.rotation.x=Ce?0:Math.sin(E*2.4+re*Math.PI)*.25})),d.pose==="meeting"?(d.arms[1].rotation.x=-.2+Math.sin(E*1.7)*(Ce||G?0:.18),d.head.rotation.y=Math.sin(E*.7)*(Ce?0:.06)):d.head.rotation.y=0}const z=y.get(Ue);if(ot!=="orbit"&&z&&!Be){const E=z.group.position.clone().add(new H(0,z.pose==="sleeping"?.25:1.3,z.pose==="sleeping"?-1.3:0)).clone().sub(m.target).multiplyScalar(.25);m.target.add(E),g.position.add(E)}Fe.update(R,{paused:Ce,dark:document.documentElement.classList.contains("dark"),center:m.target}),$.update(R,{paused:Ce,energySaver:Ge});for(const{mesh:d,game:E}of Y){const F=Ce?0:R/1e3,B=!Ec(l())&&[...y.values()].some(re=>re.pose==="playing"&&re.game.id===E.id)?Math.sin(F*1.8):0;d.position.set(E.x+(E.id==="golf"?B*4:B*1.5),E.id==="pingpong"?1.45+Math.abs(B)*.65:E.id==="basketball"?.15+Math.abs(B)*2.2:E.id==="bowling"||E.id==="golf"?.06:.4+Math.abs(B)*2,E.z+B*(E.kind==="court"?4:1.3))}if(m.update(),ot!=="orbit"&&z){const d=S.cameraLimit(m.target,g.position,me.cameraBoxes(Ue));d<1&&g.position.lerpVectors(m.target,g.position,d)}p.render(f,g),(Ce||R-Lt>120||Be)&&(Ct(),Lt=R),(!Ce||Be||de?.moving()||de&&de.state().stamina<100||!O()&&(Math.abs(j.x||0)+Math.abs(j.z||0)>0||j.jump))&&wt()}function wt(){!xt&&Tt&&ft===null&&(ft=requestAnimationFrame(ln))}function jn(R,I,z){const d=S.move(R.group.position,I,z),E=Math.hypot(d.x-R.group.position.x,d.z-R.group.position.z),F=[...y.values()].some(G=>G!==R&&G.pose!=="sleeping"&&Math.hypot(d.x-G.group.position.x,d.z-G.group.position.z)<.62);if(F||R.group.position.set(d.x,R.home.y,d.z),(F||E<.001&&R.group.position.distanceTo(I)>.2)&&k>=(R.repathAt||0)&&(R.pose==="meeting"||R.waypoints?.length)){R.repathAt=k+1500;const G=[...y.values()].filter(re=>re!==R&&re.pose!=="sleeping").map(re=>re.group.position),B=S.path(R.group.position,R.home,G);B.length&&(R.waypoints=B.map(re=>new H(re.x,R.home.y,re.z)))}}function ei(){if(xt)return;const R=i.getBoundingClientRect();R.width<1||R.height<1||(p.setSize(R.width,R.height,!1),g.aspect=R.width/R.height,g.updateProjectionMatrix(),wt())}function Gi(R="all"){ot="orbit",Ue=null,g.fov=36,g.updateProjectionMatrix(),m.enablePan=!0,m.minDistance=8,m.maxDistance=650;const I=i.clientWidth<600,z={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const F of ni)z[F.id]=[[F.x,.3,F.z],[F.x+14,19,F.z+22]];for(const[F,G]of Object.entries(Ze))z[F]=[G,[G[0]+12,19,G[2]+22]];const[d,E]=z[R]||z.all;if(le.set(...d),Ae.set(...E),R==="all"||R==="residences"){const F=me.bounds(),G=R==="all"?76:F.front,B=F.right-F.left,re=G-F.back;le.set(0,0,(G+F.back)/2);const ue=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),ae=Math.min(Pa.degToRad(g.fov/2),Math.atan(Math.tan(Pa.degToRad(g.fov/2))*ue)),K=Math.hypot(B,re)/2/Math.sin(ae)*1.07;Ae.copy(new H(1,1.18,1.3).normalize().multiplyScalar(K).add(le))}else I&&Ae.sub(le).multiplyScalar(1.23).add(le);ht=null,me.select(y.get(Ye)?.pose==="sleeping"?Ye:null),Ce?(g.position.copy(Ae),m.target.copy(le),Be=!1):Be=!0,wt()}function mi(R){ot="orbit",Ue=null,m.enablePan=!0,m.minDistance=5,m.maxDistance=650,g.fov=36,g.updateProjectionMatrix();const I=me.location(R);I&&(ht=R,me.select(R),le.set(I.x,1.2,I.z),Ae.copy(le).add(new H(11,12,15)),i.clientWidth<600&&Ae.sub(le).multiplyScalar(1.23).add(le),Ce?(g.position.copy(Ae),m.target.copy(le),Be=!1):Be=!0,wt())}function sn(R,I=Ye){if(R==="orbit"){ot="orbit",Ue=null,m.enablePan=!0,m.minDistance=5,m.maxDistance=650;return}!y.has(I)&&$e.some(d=>d.id===I)&&(Ye=I,ve($e));const z=y.get(I);z&&(ot=R==="portrait"?"portrait":"follow",Ue=I,m.enablePan=!1,m.minDistance=1.8,m.maxDistance=35,g.fov=44,g.updateProjectionMatrix(),le.copy(z.group.position).add(new H(0,z.pose==="sleeping"?.25:1.3,z.pose==="sleeping"?-1.3:0)),Ae.copy(le).add(ot==="portrait"?new H(1.8,.9,2.7):new H(4,2.5,5)),Ce?(g.position.copy(Ae),m.target.copy(le),Be=!1):Be=!0,wt())}let Rn=null;const Hi=new Un({transparent:!0,opacity:0,depthWrite:!1});u.set("game-hotspots",Hi);for(const R of ni){const I=new Yt(6,1.4,.4);w.add(I);const z=new gt(I,Hi);z.position.set(R.x,.7,R.z-(R.kind==="court"?6:4.2)),z.userData.officeGame=R.id,f.add(z),Ne.push(z)}const ki=new oh,ti=new ke,Vi=R=>{Rn=[R.clientX,R.clientY]},Wi=R=>{if(!Rn||Math.hypot(R.clientX-Rn[0],R.clientY-Rn[1])>6)return;Rn=null;const I=p.domElement.getBoundingClientRect();ti.set((R.clientX-I.left)/I.width*2-1,-(R.clientY-I.top)/I.height*2+1),ki.setFromCamera(ti,g);const z=ki.intersectObjects([...y.values()].map(E=>E.group).concat(me.meshes,$.targets,Ne),!0)[0],d=me.personForHit(z);d?(t(d),mi(d)):z?.object.userData.personId?t(z.object.userData.personId):z?.object.userData.officeVenue?s(z.object.userData.officeVenue):z?.object.userData.officeGame&&r(z.object.userData.officeGame)};function Gn(){const R=document.documentElement.classList.contains("dark");p.toneMappingExposure=R?1.02:1.18,Fe.configure(L,Ge),wt()}const ms=new ResizeObserver(ei);ms.observe(i);const Xi=new MutationObserver(Gn);Xi.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const qi=R=>{R.preventDefault(),xt||n()};p.domElement.addEventListener("pointerdown",Vi),p.domElement.addEventListener("pointerup",Wi),p.domElement.addEventListener("webglcontextlost",qi);const fr=()=>wt();return m.addEventListener("change",fr),m.addEventListener("start",()=>{Be=!1}),Gn(),Gi("all"),g.position.copy(Ae),m.target.copy(le),Be=!1,ei(),{setPeople:ve,resize:ei,focusRoom:Gi,visitHome:mi,setCameraMode:sn,collisionBoxes:()=>S.boxes(),setPilotReporter(R){se=R},setPrivatePilotProfile(R){pe&&(pe={...pe,avatar:R},ve($e.map(I=>I.id===pe.id?pe:I)))},setPilotGate(R){O=R},setPilot(R,I,z=null){J=R,pe=z,de=Tg(S,I),ve($e),sn("follow",R),wt()},releasePilot(){const R=pe?.id;J=null,pe=null,de=null,j={},ee=null,_e=null,fe.visible=!1,ve($e.filter(I=>I.id!==R))},setPilotInput(R){j=R||{},wt()},pilotState(){return de?{...de.state(),...ee||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){J&&(sn("follow",J),i.focus?.({preventScroll:!0}))},setPeerPilots(R){ge.clear();for(const I of R)I.id!==J&&ge.set(I.id,I);ve($e.map(I=>({...I,pilot:ge.get(I.id)||null,in_office:ge.has(I.id)||I.id===J})))},canInteract(R){return _l(de?.state(),R)},guideTo(R){const I=Sn.venues[R];if(_e=I?R:null,fe.visible=!!I,I){fe.position.set(I.x,.025,I.z);const z=de?.state();se({...z,target:R,distance:z?Math.round(Math.hypot(I.x-z.x,I.z-z.z)):null}),wt()}return I},interactNearest(){const R=de?.state();if(!R)return;const I=Object.keys(Sn.venues).filter(z=>_l(R,z)).sort((z,d)=>Math.hypot(R.x-Sn.venues[z].x,R.z-Sn.venues[z].z)-Math.hypot(R.x-Sn.venues[d].x,R.z-Sn.venues[d].z))[0];ni.some(z=>z.id===I)?r(I):["bar","disco","beach","garden","terrace","lounge"].includes(I)&&s(I)},setRecreation(R,I){Number(R)===J&&I&&(ee={action:{drink:"drink",food:"eat",dance:"dance"}[I.kind]||"idle",venue:I.destination}),b.set(Number(R),I?{...I,until:I.until||Date.now()/1e3+900}:null),ve($e)},setVenueEffects(R){$.setEnabled(R),wt()},setGame(R){JSON.stringify(ce)!==JSON.stringify(R)&&(ce=R,J&&R?.status==="playing"&&[R.from,R.to].includes(J)?ee={action:"play",venue:R.kind}:ee?.action==="play"&&(ee=null),ve($e))},say(R,I){const z=y.get(Number(R));z&&(z.bubble.textContent=String(I||"").slice(0,350),z.bubble.hidden=!1,q.has(R)&&clearTimeout(q.get(R)),q.set(R,setTimeout(()=>{z.bubble.hidden=!0,q.delete(R),wt()},1e4)),wt())},configureWorld(R){L=R||{},Fe.configure(L,Ge),x("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[L.settings?.landscape]||"#47695f"),wt()},setEnergySaver(R){Ge=!!R,p.setPixelRatio(Ge?1:Math.min(window.devicePixelRatio||1,1.5)),Fe.configure(L,Ge),ei()},setMeeting(R){he=R,ve($e)},meetingReady(){if(J&&he?.connected&&he.room){const I=y.get(he.room.from),z=y.get(he.room.to);if(!I||!z||I.group.position.distanceTo(z.group.position)>3)return!1;const d=z.group.position.x-I.group.position.x,E=z.group.position.z-I.group.position.z,F=Math.hypot(d,E);return F>.2&&(Math.sin(I.group.rotation.y)*d+Math.cos(I.group.rotation.y)*E)/F>.45&&(-Math.sin(z.group.rotation.y)*d-Math.cos(z.group.rotation.y)*E)/F>.45}const R=he?.room;return!R||!he.connected?!1:[R.from,R.to].every(I=>{const z=y.get(I);return z&&z.pose==="meeting"&&!z.waypoints?.length&&z.group.position.distanceTo(z.home)<.2&&Math.abs(z.group.rotation.y-z.facing)<.15})},select(R,I=!1){Ye!==R&&(ht=null),Ye=R,R&&!y.has(R)&&$e.some(d=>d.id===R)&&ve($e);for(const[d,E]of y)E.ring.visible=d===R,E.label.setAttribute("aria-pressed",String(d===R));const z=y.get(R);if(me.select(ht??(z?.pose==="sleeping"?R:null)),z&&I&&J&&R!==J&&de){de.face(z.group.position),wt();return}if(z&&I&&ot!=="orbit"){sn(ot,R);return}if(z&&I&&z.pose==="sleeping"){mi(R);return}z&&I&&(le.copy(z.target).add(new H(0,1,0)),Ae.copy(le).add(new H(11,11,14)),Ce?(g.position.copy(Ae),m.target.copy(le)):Be=!0),wt()},zoom(R){g.position.sub(m.target).multiplyScalar(R).add(m.target),m.update(),wt()},setPaused(R){if(Ce=R,Ce)for(const I of y.values())I.pose==="meeting"&&(I.group.position.copy(I.home),I.group.rotation.y=I.facing,I.waypoints=[]);ft!==null&&cancelAnimationFrame(ft),ft=null,wt()},setVisible(R){Tt=R,!R&&ft!==null?(cancelAnimationFrame(ft),ft=null):R&&(k=0,ei(),wt())},dispose(){xt=!0,ft!==null&&cancelAnimationFrame(ft),ft=null,ms.disconnect(),Xi.disconnect(),m.dispose();for(const R of q.values())clearTimeout(R);q.clear(),b.clear(),p.domElement.removeEventListener("pointerdown",Vi),p.domElement.removeEventListener("pointerup",Wi),p.domElement.removeEventListener("webglcontextlost",qi),me.dispose(),Fe.dispose();for(const R of w)R.dispose();for(const R of u.values())R.dispose();for(const R of A)R.dispose();y.forEach(R=>R.label.remove()),y.clear(),f.clear(),p.dispose(),p.forceContextLoss(),p.domElement.remove()}}}export{wg as createOfficeScene};
