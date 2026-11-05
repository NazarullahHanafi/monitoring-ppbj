import{w as Uc,g as fi,p as Fc,a as Oc,s as Bc,c as zc,i as Gc}from"./virtual-office-C_mMFn7N.js";const Ka="187",Zi={ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hc=0,vo=1,kc=2,ar=1,Vc=2,ps=3,vi=0,rn=1,Jt=2,Ki=0,gs=1,fr=2,Mo=3,So=4,Wc=5,Xi=100,Xc=101,qc=102,Yc=103,Zc=104,Kc=200,$c=201,Jc=202,Qc=203,Ll=204,Il=205,jc=206,eu=207,tu=208,nu=209,iu=210,su=211,ru=212,au=213,ou=214,ra=0,aa=1,oa=2,Ms=3,la=4,ca=5,ua=6,ha=7,Nl=0,lu=1,cu=2,qn=0,Ul=1,Fl=2,Ol=3,$a=4,Bl=5,zl=6,Gl=7,Hl=300,Ji=301,Ss=302,Cr=303,Pr=304,da=1e3,Xn=1001,fa=1002,Wt=1003,uu=1004,Ls=1005,sn=1006,Dr=1007,ti=1008,un=1009,kl=1010,Vl=1011,ys=1012,Ja=1013,In=1014,yn=1015,Nn=1016,Qa=1017,ja=1018,Qi=1020,Wl=35902,Xl=35899,ql=1021,Yl=1022,Dn=1023,si=1026,ni=1027,eo=1028,to=1029,Mi=1030,no=1031,io=1033,or=33776,lr=33777,cr=33778,ur=33779,pa=35840,ma=35841,ga=35842,_a=35843,xa=36196,va=37492,Ma=37496,Sa=37488,ya=37489,pr=37490,Ea=37491,ba=37808,Ta=37809,Aa=37810,wa=37811,Ra=37812,Ca=37813,Pa=37814,Da=37815,La=37816,Ia=37817,Na=37818,Ua=37819,Fa=37820,Oa=37821,Ba=36492,za=36494,Ga=36495,Ha=36283,ka=36284,mr=36285,Va=36286,hu=3200,Wa=0,du=1,ei="",nn="srgb",gr="srgb-linear",_r="linear",vt="srgb",Lr=7680,fu=519,pu=512,mu=513,gu=514,Zl=515,_u=516,xu=517,Kl=518,$l=519,vu=35044,Jl=35048,yo="300 es",En=2e3,Es=2001;function Mu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Su(){const i=xr("canvas");return i.style.display="block",i}const Eo={};function bo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ql(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){i=Ql(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function mt(...i){i=Ql(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function hr(...i){const e=i.join(" ");e in Eo||(Eo[e]=!0,Ze(...i))}function yu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Eu={[ra]:ra,[oa]:ua,[la]:la,[Ms]:ca,[aa]:aa,[ua]:oa,[ha]:ha,[ca]:Ms};class ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let To=1234567;const _s=Math.PI/180,bs=180/Math.PI;function ts(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function so(i,e){return(i%e+e)%e}function bu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Tu(i,e,t){return i!==e?(t-i)/(e-i):0}function xs(i,e,t){return(1-t)*i+t*e}function Au(i,e,t,n){return xs(i,e,1-Math.exp(-t*n))}function wu(i,e=1){return e-Math.abs(so(i,e*2)-e)}function Ru(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Pu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Du(i,e){return i+Math.random()*(e-i)}function Lu(i){return i*(.5-Math.random())}function Iu(i){i!==void 0&&(To=i);let e=To+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Nu(i){return i*_s}function Uu(i){return i*bs}function Fu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ou(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function jl(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bu(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),p=a((e+n)/2),m=r((e-n)/2),h=a((e-n)/2),g=r((n-e)/2),_=a((n-e)/2);switch(s){case"XYX":i.set(o*p,c*m,c*h,o*l);break;case"YZY":i.set(c*h,o*p,c*m,o*l);break;case"ZXZ":i.set(c*m,c*h,o*p,o*l);break;case"XZX":i.set(o*p,c*_,c*g,o*l);break;case"YXY":i.set(c*g,o*p,c*_,o*l);break;case"ZYZ":i.set(c*_,c*g,o*p,o*l);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ro(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ec(i,e){if(e.constructor===Float32Array)return i;const t=ro(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function tc(i,e){if(e.constructor===Float32Array)return i;const t=ro(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const vs={DEG2RAD:_s,RAD2DEG:bs,generateUUID:ts,clamp:st,euclideanModulo:so,mapLinear:bu,inverseLerp:Tu,lerp:xs,damp:Au,pingpong:wu,smoothstep:Ru,smootherstep:Cu,randInt:Pu,randFloat:Du,randFloatSpread:Lu,seededRandom:Iu,degToRad:Nu,radToDeg:Uu,isPowerOfTwo:Fu,ceilPowerOfTwo:Ou,floorPowerOfTwo:jl,setQuaternionFromProperEuler:Bu,normalize:tc,denormalize:ec},mo=class mo{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mo.prototype.isVector2=!0;let We=mo;class hn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],p=n[s+2],m=n[s+3],h=r[a+0],g=r[a+1],_=r[a+2],E=r[a+3];if(m!==E||c!==h||l!==g||p!==_){let u=c*h+l*g+p*_+m*E;u<0&&(h=-h,g=-g,_=-_,E=-E,u=-u);let f=1-o;if(u<.9995){const x=Math.acos(u),C=Math.sin(x);f=Math.sin(f*x)/C,o=Math.sin(o*x)/C,c=c*f+h*o,l=l*f+g*o,p=p*f+_*o,m=m*f+E*o}else{c=c*f+h*o,l=l*f+g*o,p=p*f+_*o,m=m*f+E*o;const x=1/Math.sqrt(c*c+l*l+p*p+m*m);c*=x,l*=x,p*=x,m*=x}}e[t]=c,e[t+1]=l,e[t+2]=p,e[t+3]=m}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],p=n[s+3],m=r[a],h=r[a+1],g=r[a+2],_=r[a+3];return e[t]=o*_+p*m+c*g-l*h,e[t+1]=c*_+p*h+l*m-o*g,e[t+2]=l*_+p*g+o*h-c*m,e[t+3]=p*_-o*m-c*h-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),p=o(s/2),m=o(r/2),h=c(n/2),g=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*p*m+l*g*_,this._y=l*g*m-h*p*_,this._z=l*p*_+h*g*m,this._w=l*p*m-h*g*_;break;case"YXZ":this._x=h*p*m+l*g*_,this._y=l*g*m-h*p*_,this._z=l*p*_-h*g*m,this._w=l*p*m+h*g*_;break;case"ZXY":this._x=h*p*m-l*g*_,this._y=l*g*m+h*p*_,this._z=l*p*_+h*g*m,this._w=l*p*m-h*g*_;break;case"ZYX":this._x=h*p*m-l*g*_,this._y=l*g*m+h*p*_,this._z=l*p*_-h*g*m,this._w=l*p*m+h*g*_;break;case"YZX":this._x=h*p*m+l*g*_,this._y=l*g*m+h*p*_,this._z=l*p*_-h*g*m,this._w=l*p*m-h*g*_;break;case"XZY":this._x=h*p*m-l*g*_,this._y=l*g*m-h*p*_,this._z=l*p*_+h*g*m,this._w=l*p*m+h*g*_;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],p=t[6],m=t[10],h=n+o+m;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(p-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(n>o&&n>m){const g=2*Math.sqrt(1+n-o-m);this._w=(p-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>m){const g=2*Math.sqrt(1+o-n-m);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+p)/g}else{const g=2*Math.sqrt(1+m-n-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+p)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,p=t._w;return this._x=n*p+a*o+s*l-r*c,this._y=s*p+a*c+r*o-n*l,this._z=r*p+a*l+n*c-s*o,this._w=a*p-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),p=Math.sin(l);c=Math.sin(c*l)/p,t=Math.sin(t*l)/p,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const go=class go{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ao.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ao.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),p=2*(o*t-r*s),m=2*(r*n-a*t);return this.x=t+c*l+a*m-o*p,this.y=n+c*p+o*l-r*m,this.z=s+c*m+r*p-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ir.copy(this).projectOnVector(e),this.sub(Ir)}reflect(e){return this.sub(Ir.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};go.prototype.isVector3=!0;let G=go;const Ir=new G,Ao=new hn,_o=class _o{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const p=this.elements;return p[0]=e,p[1]=s,p[2]=o,p[3]=t,p[4]=r,p[5]=c,p[6]=n,p[7]=a,p[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],p=n[4],m=n[7],h=n[2],g=n[5],_=n[8],E=s[0],u=s[3],f=s[6],x=s[1],C=s[4],A=s[7],M=s[2],S=s[5],d=s[8];return r[0]=a*E+o*x+c*M,r[3]=a*u+o*C+c*S,r[6]=a*f+o*A+c*d,r[1]=l*E+p*x+m*M,r[4]=l*u+p*C+m*S,r[7]=l*f+p*A+m*d,r[2]=h*E+g*x+_*M,r[5]=h*u+g*C+_*S,r[8]=h*f+g*A+_*d,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],p=e[8];return t*a*p-t*o*l-n*r*p+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],p=e[8],m=p*a-o*l,h=o*c-p*r,g=l*r-a*c,_=t*m+n*h+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=m*E,e[1]=(s*l-p*n)*E,e[2]=(o*n-s*a)*E,e[3]=h*E,e[4]=(p*t-s*c)*E,e[5]=(s*r-o*t)*E,e[6]=g*E,e[7]=(n*c-l*t)*E,e[8]=(a*t-n*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nr.makeScale(e,t)),this}rotate(e){return hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nr.makeRotation(-e)),this}translate(e,t){return hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};_o.prototype.isMatrix3=!0;let $e=_o;const Nr=new $e,wo=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ro=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zu(){const i={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=$i(s.r),s.g=$i(s.g),s.b=$i(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?_r:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gr]:{primaries:e,whitePoint:n,transfer:_r,toXYZ:wo,fromXYZ:Ro,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:wo,fromXYZ:Ro,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}const ot=zu();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class Gu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=xr("canvas")),Li.width=e.width,Li.height=e.height;const s=Li.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hu=0;class ao{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=ts(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ur(s[a].image)):r.push(Ur(s[a]))}else r=Ur(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}let ku=0;const Fr=new G;class Kt extends ai{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,n=Xn,s=Xn,r=sn,a=ti,o=Dn,c=un,l=Kt.DEFAULT_ANISOTROPY,p=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=ts(),this.name="",this.source=new ao(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Fr).x}get height(){return this.source.getSize(Fr).y}get depth(){return this.source.getSize(Fr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case da:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case fa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case da:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case fa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Hl;Kt.DEFAULT_ANISOTROPY=1;const xo=class xo{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],p=c[4],m=c[8],h=c[1],g=c[5],_=c[9],E=c[2],u=c[6],f=c[10];if(Math.abs(p-h)<.01&&Math.abs(m-E)<.01&&Math.abs(_-u)<.01){if(Math.abs(p+h)<.1&&Math.abs(m+E)<.1&&Math.abs(_+u)<.1&&Math.abs(l+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,A=(g+1)/2,M=(f+1)/2,S=(p+h)/4,d=(m+E)/4,b=(_+u)/4;return C>A&&C>M?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=S/n,r=d/n):A>M?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=S/s,r=b/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=d/r,s=b/r),this.set(n,s,r,t),this}let x=Math.sqrt((u-_)*(u-_)+(m-E)*(m-E)+(h-p)*(h-p));return Math.abs(x)<.001&&(x=1),this.x=(u-_)/x,this.y=(m-E)/x,this.z=(h-p)/x,this.w=Math.acos((l+g+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xo.prototype.isVector4=!0;let Dt=xo;class Vu extends ai{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Kt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ao(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends Vu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nc extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wu extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const br=class br{constructor(e,t,n,s,r,a,o,c,l,p,m,h,g,_,E,u){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,p,m,h,g,_,E,u)}set(e,t,n,s,r,a,o,c,l,p,m,h,g,_,E,u){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=p,f[10]=m,f[14]=h,f[3]=g,f[7]=_,f[11]=E,f[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new br().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Ii.setFromMatrixColumn(e,0).length(),r=1/Ii.setFromMatrixColumn(e,1).length(),a=1/Ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),p=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){const h=a*p,g=a*m,_=o*p,E=o*m;t[0]=c*p,t[4]=-c*m,t[8]=l,t[1]=g+_*l,t[5]=h-E*l,t[9]=-o*c,t[2]=E-h*l,t[6]=_+g*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*p,g=c*m,_=l*p,E=l*m;t[0]=h+E*o,t[4]=_*o-g,t[8]=a*l,t[1]=a*m,t[5]=a*p,t[9]=-o,t[2]=g*o-_,t[6]=E+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*p,g=c*m,_=l*p,E=l*m;t[0]=h-E*o,t[4]=-a*m,t[8]=_+g*o,t[1]=g+_*o,t[5]=a*p,t[9]=E-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*p,g=a*m,_=o*p,E=o*m;t[0]=c*p,t[4]=_*l-g,t[8]=h*l+E,t[1]=c*m,t[5]=E*l+h,t[9]=g*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,g=a*l,_=o*c,E=o*l;t[0]=c*p,t[4]=E-h*m,t[8]=_*m+g,t[1]=m,t[5]=a*p,t[9]=-o*p,t[2]=-l*p,t[6]=g*m+_,t[10]=h-E*m}else if(e.order==="XZY"){const h=a*c,g=a*l,_=o*c,E=o*l;t[0]=c*p,t[4]=-m,t[8]=l*p,t[1]=h*m+E,t[5]=a*p,t[9]=g*m-_,t[2]=_*m-g,t[6]=o*p,t[10]=E*m+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xu,e,qu)}lookAt(e,t,n){const s=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Kn.crossVectors(n,ln),Kn.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Kn.crossVectors(n,ln)),Kn.normalize(),Is.crossVectors(ln,Kn),s[0]=Kn.x,s[4]=Is.x,s[8]=ln.x,s[1]=Kn.y,s[5]=Is.y,s[9]=ln.y,s[2]=Kn.z,s[6]=Is.z,s[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],p=n[1],m=n[5],h=n[9],g=n[13],_=n[2],E=n[6],u=n[10],f=n[14],x=n[3],C=n[7],A=n[11],M=n[15],S=s[0],d=s[4],b=s[8],U=s[12],w=s[1],P=s[5],F=s[9],H=s[13],L=s[2],I=s[6],W=s[10],K=s[14],he=s[3],Z=s[7],se=s[11],ae=s[15];return r[0]=a*S+o*w+c*L+l*he,r[4]=a*d+o*P+c*I+l*Z,r[8]=a*b+o*F+c*W+l*se,r[12]=a*U+o*H+c*K+l*ae,r[1]=p*S+m*w+h*L+g*he,r[5]=p*d+m*P+h*I+g*Z,r[9]=p*b+m*F+h*W+g*se,r[13]=p*U+m*H+h*K+g*ae,r[2]=_*S+E*w+u*L+f*he,r[6]=_*d+E*P+u*I+f*Z,r[10]=_*b+E*F+u*W+f*se,r[14]=_*U+E*H+u*K+f*ae,r[3]=x*S+C*w+A*L+M*he,r[7]=x*d+C*P+A*I+M*Z,r[11]=x*b+C*F+A*W+M*se,r[15]=x*U+C*H+A*K+M*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],p=e[2],m=e[6],h=e[10],g=e[14],_=e[3],E=e[7],u=e[11],f=e[15],x=c*g-l*h,C=o*g-l*m,A=o*h-c*m,M=a*g-l*p,S=a*h-c*p,d=a*m-o*p;return t*(E*x-u*C+f*A)-n*(_*x-u*M+f*S)+s*(_*C-E*M+f*d)-r*(_*A-E*S+u*d)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],p=e[10];return t*(a*p-o*l)-n*(r*p-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],p=e[8],m=e[9],h=e[10],g=e[11],_=e[12],E=e[13],u=e[14],f=e[15],x=t*o-n*a,C=t*c-s*a,A=t*l-r*a,M=n*c-s*o,S=n*l-r*o,d=s*l-r*c,b=p*E-m*_,U=p*u-h*_,w=p*f-g*_,P=m*u-h*E,F=m*f-g*E,H=h*f-g*u,L=x*H-C*F+A*P+M*w-S*U+d*b;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/L;return e[0]=(o*H-c*F+l*P)*I,e[1]=(s*F-n*H-r*P)*I,e[2]=(E*d-u*S+f*M)*I,e[3]=(h*S-m*d-g*M)*I,e[4]=(c*w-a*H-l*U)*I,e[5]=(t*H-s*w+r*U)*I,e[6]=(u*A-_*d-f*C)*I,e[7]=(p*d-h*A+g*C)*I,e[8]=(a*F-o*w+l*b)*I,e[9]=(n*w-t*F-r*b)*I,e[10]=(_*S-E*A+f*x)*I,e[11]=(m*A-p*S-g*x)*I,e[12]=(o*U-a*P-c*b)*I,e[13]=(t*P-n*U+s*b)*I,e[14]=(E*C-_*M-u*x)*I,e[15]=(p*M-m*C+h*x)*I,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,p=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,p*o+n,p*c-s*a,0,l*c-s*o,p*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,p=a+a,m=o+o,h=r*l,g=r*p,_=r*m,E=a*p,u=a*m,f=o*m,x=c*l,C=c*p,A=c*m,M=n.x,S=n.y,d=n.z;return s[0]=(1-(E+f))*M,s[1]=(g+A)*M,s[2]=(_-C)*M,s[3]=0,s[4]=(g-A)*S,s[5]=(1-(h+f))*S,s[6]=(u+x)*S,s[7]=0,s[8]=(_+C)*d,s[9]=(u-x)*d,s[10]=(1-(h+E))*d,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),c=Ii.set(s[8],s[9],s[10]).length();r<0&&(a=-a),_n.copy(this);const l=1/a,p=1/o,m=1/c;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=p,_n.elements[5]*=p,_n.elements[6]*=p,_n.elements[8]*=m,_n.elements[9]*=m,_n.elements[10]*=m,t.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=En,c=!1){const l=this.elements,p=2*r/(t-e),m=2*r/(n-s),h=(t+e)/(t-e),g=(n+s)/(n-s);let _,E;if(c)_=r/(a-r),E=a*r/(a-r);else if(o===En)_=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===Es)_=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=p,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=m,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=En,c=!1){const l=this.elements,p=2/(t-e),m=2/(n-s),h=-(t+e)/(t-e),g=-(n+s)/(n-s);let _,E;if(c)_=1/(a-r),E=a/(a-r);else if(o===En)_=-2/(a-r),E=-(a+r)/(a-r);else if(o===Es)_=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=p,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=m,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=_,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};br.prototype.isMatrix4=!0;let ct=br;const Ii=new G,_n=new ct,Xu=new G(0,0,0),qu=new G(1,1,1),Kn=new G,Is=new G,ln=new G,Co=new ct,Po=new hn;class Un{constructor(e=0,t=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],p=s[9],m=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-p,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-p,g),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Co.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Co,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Po.setFromEuler(this),this.setFromQuaternion(Po,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class oo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yu=0;const Do=new G,Ni=new hn,On=new ct,Ns=new G,rs=new G,Zu=new G,Ku=new hn,Lo=new G(1,0,0),Io=new G(0,1,0),No=new G(0,0,1),Uo={type:"added"},$u={type:"removed"},Ui={type:"childadded",child:null},Or={type:"childremoved",child:null};class Bt extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new G,t=new Un,n=new hn,s=new G(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new $e}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(Lo,e)}rotateY(e){return this.rotateOnAxis(Io,e)}rotateZ(e){return this.rotateOnAxis(No,e)}translateOnAxis(e,t){return Do.copy(e).applyQuaternion(this.quaternion),this.position.add(Do.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lo,e)}translateY(e){return this.translateOnAxis(Io,e)}translateZ(e){return this.translateOnAxis(No,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ns.copy(e):Ns.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(rs,Ns,this.up):On.lookAt(Ns,rs,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Ni.setFromRotationMatrix(On),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uo),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($u),Or.child=e,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uo),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,Zu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,Ku,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,p=c.length;l<p;l++){const m=c[l];r(e.shapes,m)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),p=a(e.images),m=a(e.shapes),h=a(e.skeletons),g=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),p.length>0&&(n.images=p),m.length>0&&(n.shapes=m),h.length>0&&(n.skeletons=h),g.length>0&&(n.animations=g),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const p=o[l];delete p.metadata,c.push(p)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Bt.DEFAULT_UP=new G(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pn extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ju={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const E of e.hand.values()){const u=t.getJointPose(E,n),f=this._getHandJoint(l,E);u!==null&&(f.matrix.fromArray(u.transform.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=u.radius),f.visible=u!==null}const p=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],h=p.position.distanceTo(m.position),g=.02,_=.005;l.inputState.pinching&&h>g+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=g-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ju)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Us={h:0,s:0,l:0};function zr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class tt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=so(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=zr(a,r,e+1/3),this.g=zr(a,r,e),this.b=zr(a,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=nn){function n(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const n=ic[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return ot.workingToColorSpace(Zt.copy(this),e),Math.round(st(Zt.r*255,0,255))*65536+Math.round(st(Zt.g*255,0,255))*256+Math.round(st(Zt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,s=Zt.g,r=Zt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const p=(o+a)/2;if(o===a)c=0,l=0;else{const m=a-o;switch(l=p<=.5?m/(a+o):m/(2-a-o),a){case n:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-n)/m+2;break;case r:c=(n-s)/m+4;break}c/=6}return e.h=c,e.s=l,e.l=p,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=nn){ot.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,s=Zt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL($n),this.setHSL($n.h+e,$n.s+t,$n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($n),e.getHSL(Us);const n=xs($n.h,Us.h,t),s=xs($n.s,Us.s,t),r=xs($n.l,Us.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new tt;tt.NAMES=ic;class lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new tt(e),this.density=t}clone(){return new lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Qu extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xn=new G,Bn=new G,Gr=new G,zn=new G,Fi=new G,Oi=new G,Fo=new G,Hr=new G,kr=new G,Vr=new G,Wr=new Dt,Xr=new Dt,qr=new Dt;class Sn{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Bn.subVectors(n,t),Gr.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(Bn),c=xn.dot(Gr),l=Bn.dot(Bn),p=Bn.dot(Gr),m=a*l-o*o;if(m===0)return r.set(0,0,0),null;const h=1/m,g=(l*c-o*p)*h,_=(a*p-o*c)*h;return r.set(1-g-_,_,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(a,zn.y),c.addScaledVector(o,zn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Wr.setScalar(0),Xr.setScalar(0),qr.setScalar(0),Wr.fromBufferAttribute(e,t),Xr.fromBufferAttribute(e,n),qr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Wr,r.x),a.addScaledVector(Xr,r.y),a.addScaledVector(qr,r.z),a}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Bn.subVectors(e,t),xn.cross(Bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),xn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Sn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),Hr.subVectors(e,n);const c=Fi.dot(Hr),l=Oi.dot(Hr);if(c<=0&&l<=0)return t.copy(n);kr.subVectors(e,s);const p=Fi.dot(kr),m=Oi.dot(kr);if(p>=0&&m<=p)return t.copy(s);const h=c*m-p*l;if(h<=0&&c>=0&&p<=0&&c-p>0)return a=c/(c-p),t.copy(n).addScaledVector(Fi,a);Vr.subVectors(e,r);const g=Fi.dot(Vr),_=Oi.dot(Vr);if(_>=0&&g<=_)return t.copy(r);const E=g*l-c*_;if(E<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Oi,o);const u=p*_-g*m;if(u<=0&&m-p>=0&&g-_>=0)return Fo.subVectors(r,s),o=(m-p)/(m-p+(g-_)),t.copy(s).addScaledVector(Fo,o);const f=1/(u+E+h);return a=E*f,o=h*f,t.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class yi{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fs.copy(n.boundingBox)),Fs.applyMatrix4(e.matrixWorld),this.union(Fs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(as),Os.subVectors(this.max,as),Bi.subVectors(e.a,as),zi.subVectors(e.b,as),Gi.subVectors(e.c,as),Jn.subVectors(zi,Bi),Qn.subVectors(Gi,zi),pi.subVectors(Bi,Gi);let t=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-pi.z,pi.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,pi.z,0,-pi.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-pi.y,pi.x,0];return!Yr(t,Bi,zi,Gi,Os)||(t=[1,0,0,0,1,0,0,0,1],!Yr(t,Bi,zi,Gi,Os))?!1:(Bs.crossVectors(Jn,Qn),t=[Bs.x,Bs.y,Bs.z],Yr(t,Bi,zi,Gi,Os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Gn=[new G,new G,new G,new G,new G,new G,new G,new G],vn=new G,Fs=new yi,Bi=new G,zi=new G,Gi=new G,Jn=new G,Qn=new G,pi=new G,as=new G,Os=new G,Bs=new G,mi=new G;function Yr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){mi.fromArray(i,r);const o=s.x*Math.abs(mi.x)+s.y*Math.abs(mi.y)+s.z*Math.abs(mi.z),c=e.dot(mi),l=t.dot(mi),p=n.dot(mi);if(Math.max(-Math.max(c,l,p),Math.min(c,l,p))>o)return!1}return!0}const Ut=new G,zs=new We;let ju=0;class an extends ai{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ju++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vu,this.updateRanges=[],this.gpuType=yn,this.version=0,this._normalizationScale=e!==void 0?ro(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zs.fromBufferAttribute(this,t),zs.applyMatrix3(e),this.setXY(t,zs.x,zs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ec(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):tc(e,this.array)}}class sc extends an{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rc extends an{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bt extends an{constructor(e,t,n){super(new Float32Array(e),t,n)}}const eh=new yi,os=new G,Zr=new G;class Ei{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):eh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;os.subVectors(e,this.center);const t=os.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(os,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(os.copy(e.center).add(Zr)),this.expandByPoint(os.copy(e.center).sub(Zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let th=0;const dn=new ct,Kr=new Bt,Hi=new G,cn=new yi,ls=new yi,kt=new G;class Xt extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mu(e)?rc:sc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return Kr.lookAt(e),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ls.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(cn.min,ls.min),cn.expandByPoint(kt),kt.addVectors(cn.max,ls.max),cn.expandByPoint(kt)):(cn.expandByPoint(ls.min),cn.expandByPoint(ls.max))}cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,p=o.count;l<p;l++)kt.fromBufferAttribute(o,l),c&&(Hi.fromBufferAttribute(e,l),kt.add(Hi)),s=Math.max(s,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new an(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let U=0;U<n.count;U++)o[U]=new G,c[U]=new G;const p=new G,m=new G,h=new G,g=new We,_=new We,E=new We,u=new G,f=new G;function x(U,w,P){l[U]=l[w]=l[P]=1,p.fromBufferAttribute(n,U),m.fromBufferAttribute(n,w),h.fromBufferAttribute(n,P),g.fromBufferAttribute(r,U),_.fromBufferAttribute(r,w),E.fromBufferAttribute(r,P),m.sub(p),h.sub(p),_.sub(g),E.sub(g);const F=1/(_.x*E.y-E.x*_.y);isFinite(F)&&(u.copy(m).multiplyScalar(E.y).addScaledVector(h,-_.y).multiplyScalar(F),f.copy(h).multiplyScalar(_.x).addScaledVector(m,-E.x).multiplyScalar(F),o[U].add(u),o[w].add(u),o[P].add(u),c[U].add(f),c[w].add(f),c[P].add(f))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let U=0,w=C.length;U<w;++U){const P=C[U],F=P.start,H=P.count;for(let L=F,I=F+H;L<I;L+=3)x(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const A=new G,M=new G,S=new G,d=new G;function b(U){S.fromBufferAttribute(s,U),d.copy(S);const w=o[U];A.copy(w),A.sub(S.multiplyScalar(S.dot(w))).normalize(),M.crossVectors(d,w);const F=M.dot(c[U])<0?-1:1;a.setXYZW(U,A.x,A.y,A.z,F)}for(let U=0,w=n.count;U<w;++U)l[U]&&b(U);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,g=n.count;h<g;h++)n.setXYZ(h,0,0,0);const s=new G,r=new G,a=new G,o=new G,c=new G,l=new G,p=new G,m=new G;if(e)for(let h=0,g=e.count;h<g;h+=3){const _=e.getX(h+0),E=e.getX(h+1),u=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,u),p.subVectors(a,r),m.subVectors(s,r),p.cross(m),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,u),o.add(p),c.add(p),l.add(p),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(E,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),p.subVectors(a,r),m.subVectors(s,r),p.cross(m),n.setXYZ(h+0,p.x,p.y,p.z),n.setXYZ(h+1,p.x,p.y,p.z),n.setXYZ(h+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,c){const l=o.array,p=o.itemSize,m=o.normalized,h=new l.constructor(c.length*p);let g=0,_=0;for(let E=0,u=c.length;E<u;E++){o.isInterleavedBufferAttribute?g=c[E]*o.data.stride+o.offset:g=c[E]*p;for(let f=0;f<p;f++)h[_++]=l[g++]}return new an(h,p,m)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let p=0,m=l.length;p<m;p++){const h=l[p],g=e(h,n);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],p=[];for(let m=0,h=l.length;m<h;m++){const g=l[m];p.push(g.toJSON(e.data))}p.length>0&&(s[c]=p,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const p=s[l];this.setAttribute(l,p.clone(t))}const r=e.morphAttributes;for(const l in r){const p=[],m=r[l];for(let h=0,g=m.length;h<g;h++)p.push(m[h].clone(t));this.morphAttributes[l]=p}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,p=a.length;l<p;l++){const m=a[l];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $r=new G,nh=new G,ih=new $e;class kn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=$r.subVectors(n,t).cross(nh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta($r),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ih.getNormalMatrix(e),s=this.coplanarPoint($r).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let sh=0;class bi extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=gs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ll,this.blendDst=Il,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lr,this.stencilZFail=Lr,this.stencilZPass=Lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new kn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new We().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Hn=new G,Jr=new G,Gs=new G,Hs=new G;class ws{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Jr.copy(e).add(t).multiplyScalar(.5),Gs.copy(t).sub(e).normalize(),Hs.copy(this.origin).sub(Jr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Gs),o=Hs.dot(this.direction),c=-Hs.dot(Gs),l=Hs.lengthSq(),p=Math.abs(1-a*a);let m,h,g,_;if(p>0)if(m=a*c-o,h=a*o-c,_=r*p,m>=0)if(h>=-_)if(h<=_){const E=1/p;m*=E,h*=E,g=m*(m+a*h+2*o)+h*(a*m+h+2*c)+l}else h=r,m=Math.max(0,-(a*h+o)),g=-m*m+h*(h+2*c)+l;else h=-r,m=Math.max(0,-(a*h+o)),g=-m*m+h*(h+2*c)+l;else h<=-_?(m=Math.max(0,-(-a*r+o)),h=m>0?-r:Math.min(Math.max(-r,-c),r),g=-m*m+h*(h+2*c)+l):h<=_?(m=0,h=Math.min(Math.max(-r,-c),r),g=h*(h+2*c)+l):(m=Math.max(0,-(a*r+o)),h=m>0?r:Math.min(Math.max(-r,-c),r),g=-m*m+h*(h+2*c)+l);else h=a>0?-r:r,m=Math.max(0,-(a*h+o)),g=-m*m+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Jr).addScaledVector(Gs,h),g}intersectSphere(e,t){if(e.radius<0)return null;Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),s=Hn.dot(Hn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,p=1/this.direction.y,m=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),p>=0?(r=(e.min.y-h.y)*p,a=(e.max.y-h.y)*p):(r=(e.max.y-h.y)*p,a=(e.min.y-h.y)*p),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(e.min.z-h.z)*m,c=(e.max.z-h.z)*m):(o=(e.max.z-h.z)*m,c=(e.min.z-h.z)*m),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,p=o.z,m=e.x-a.x,h=e.y-a.y,g=e.z-a.z,_=t.x-a.x,E=t.y-a.y,u=t.z-a.z,f=n.x-a.x,x=n.y-a.y,C=n.z-a.z,A=Math.abs(c),M=Math.abs(l),S=Math.abs(p);let d,b,U,w,P,F,H,L,I,W,K,he;if(A>=M&&A>=S?(U=c,F=m,I=_,he=f,c>=0?(d=l,b=p,w=h,P=g,H=E,L=u,W=x,K=C):(d=p,b=l,w=g,P=h,H=u,L=E,W=C,K=x)):M>=S?(U=l,F=h,I=E,he=x,l>=0?(d=p,b=c,w=g,P=m,H=u,L=_,W=C,K=f):(d=c,b=p,w=m,P=g,H=_,L=u,W=f,K=C)):(U=p,F=g,I=u,he=C,p>=0?(d=c,b=l,w=m,P=h,H=_,L=E,W=f,K=x):(d=l,b=c,w=h,P=m,H=E,L=_,W=x,K=f)),U===0)return null;const Z=d/U,se=b/U,ae=1/U,fe=w-Z*F,Le=P-se*F,ee=H-Z*I,Me=L-se*I,Re=W-Z*he,Ee=K-se*he,Ae=Re*Me-Ee*ee,ke=fe*Ee-Le*Re,Mt=ee*Le-Me*fe;if(s){if(Ae<0||ke<0||Mt<0)return null}else if((Ae<0||ke<0||Mt<0)&&(Ae>0||ke>0||Mt>0))return null;const Be=Ae+ke+Mt;if(Be===0)return null;const at=ae*(Ae*F+ke*I+Mt*he);return(Be>0?at<0:at>0)?null:this.at(at/Be,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vn extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Oo=new ct,gi=new ws,ks=new Ei,Bo=new G,Vs=new G,Ws=new G,Xs=new G,Qr=new G,qs=new G,zo=new G,Ys=new G;class gt extends Bt{constructor(e=new Xt,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const p=o[c],m=r[c];p!==0&&(Qr.fromBufferAttribute(m,e),a?qs.addScaledVector(Qr,p):qs.addScaledVector(Qr.sub(t),p))}t.add(qs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(r),gi.copy(e.ray).recast(e.near),!(ks.containsPoint(gi.origin)===!1&&(gi.intersectSphere(ks,Bo)===null||gi.origin.distanceToSquared(Bo)>(e.far-e.near)**2))&&(Oo.copy(r).invert(),gi.copy(e.ray).applyMatrix4(Oo),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,p=r.attributes.uv1,m=r.attributes.normal,h=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=h.length;_<E;_++){const u=h[_],f=a[u.materialIndex],x=Math.max(u.start,g.start),C=Math.min(o.count,Math.min(u.start+u.count,g.start+g.count));for(let A=x,M=C;A<M;A+=3){const S=o.getX(A),d=o.getX(A+1),b=o.getX(A+2);s=Zs(this,f,e,n,l,p,m,S,d,b),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let u=_,f=E;u<f;u+=3){const x=o.getX(u),C=o.getX(u+1),A=o.getX(u+2);s=Zs(this,a,e,n,l,p,m,x,C,A),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,E=h.length;_<E;_++){const u=h[_],f=a[u.materialIndex],x=Math.max(u.start,g.start),C=Math.min(c.count,Math.min(u.start+u.count,g.start+g.count));for(let A=x,M=C;A<M;A+=3){const S=A,d=A+1,b=A+2;s=Zs(this,f,e,n,l,p,m,S,d,b),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(c.count,g.start+g.count);for(let u=_,f=E;u<f;u+=3){const x=u,C=u+1,A=u+2;s=Zs(this,a,e,n,l,p,m,x,C,A),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}}}function rh(i,e,t,n,s,r,a,o){let c;if(e.side===rn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===vi,o),c===null)return null;Ys.copy(o),Ys.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ys);return l<t.near||l>t.far?null:{distance:l,point:Ys.clone(),object:i}}function Zs(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Vs),i.getVertexPosition(c,Ws),i.getVertexPosition(l,Xs);const p=rh(i,e,t,n,Vs,Ws,Xs,zo);if(p){const m=new G;Sn.getBarycoord(zo,Vs,Ws,Xs,m),s&&(p.uv=Sn.getInterpolatedAttribute(s,o,c,l,m,new We)),r&&(p.uv1=Sn.getInterpolatedAttribute(r,o,c,l,m,new We)),a&&(p.normal=Sn.getInterpolatedAttribute(a,o,c,l,m,new G),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new G,materialIndex:0};Sn.getNormal(Vs,Ws,Xs,h.normal),p.face=h,p.barycoord=m}return p}class ac extends Kt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Wt,p=Wt,m,h){super(null,a,o,c,l,p,s,r,m,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Go extends an{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new ct,Ho=new ct,Ks=[],ko=new yi,ah=new ct,cs=new gt,us=new Ei;class oc extends gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Go(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ah)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),ko.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(ko)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),us.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(us)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(n),e.ray.intersectsSphere(us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ki),Ho.multiplyMatrices(n,ki),cs.matrixWorld=Ho,cs.raycast(e,Ks);for(let a=0,o=Ks.length;a<o;a++){const c=Ks[a];c.instanceId=r,c.object=this,t.push(c)}Ks.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Go(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ac(new Float32Array(s*this.count),s,this.count,eo,yn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _i=new Ei,oh=new We(.5,.5),$s=new G;class Ts{constructor(e=new kn,t=new kn,n=new kn,s=new kn,r=new kn,a=new kn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],p=r[4],m=r[5],h=r[6],g=r[7],_=r[8],E=r[9],u=r[10],f=r[11],x=r[12],C=r[13],A=r[14],M=r[15];if(s[0].setComponents(l-a,g-p,f-_,M-x).normalize(),s[1].setComponents(l+a,g+p,f+_,M+x).normalize(),s[2].setComponents(l+o,g+m,f+E,M+C).normalize(),s[3].setComponents(l-o,g-m,f-E,M-C).normalize(),n)s[4].setComponents(c,h,u,A).normalize(),s[5].setComponents(l-c,g-h,f-u,M-A).normalize();else if(s[4].setComponents(l-c,g-h,f-u,M-A).normalize(),t===En)s[5].setComponents(l+c,g+h,f+u,M+A).normalize();else if(t===Es)s[5].setComponents(c,h,u,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=oh.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if($s.x=s.normal.x>0?e.max.x:e.min.x,$s.y=s.normal.y>0?e.max.y:e.min.y,$s.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint($s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Vo=new ct;class co{constructor(){this.coordinateSystem=En,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Vo.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ts),n[s].setFromProjectionMatrix(Vo,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ts),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new co().copy(this)}}class lc extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vr=new G,Mr=new G,Wo=new ct,hs=new ws,Js=new Ei,jr=new G,Xo=new G;class lh extends Bt{constructor(e=new Xt,t=new lc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)vr.fromBufferAttribute(t,s-1),Mr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=vr.distanceTo(Mr);e.setAttribute("lineDistance",new bt(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(s),Js.radius+=r,e.ray.intersectsSphere(Js)===!1)return;Wo.copy(s).invert(),hs.copy(e.ray).applyMatrix4(Wo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,p=n.index,h=n.attributes.position;if(p!==null){const g=Math.max(0,a.start),_=Math.min(p.count,a.start+a.count);for(let E=g,u=_-1;E<u;E+=l){const f=p.getX(E),x=p.getX(E+1),C=Qs(this,e,hs,c,f,x,E);C&&t.push(C)}if(this.isLineLoop){const E=p.getX(_-1),u=p.getX(g),f=Qs(this,e,hs,c,E,u,_-1);f&&t.push(f)}}else{const g=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let E=g,u=_-1;E<u;E+=l){const f=Qs(this,e,hs,c,E,E+1,E);f&&t.push(f)}if(this.isLineLoop){const E=Qs(this,e,hs,c,_-1,g,_-1);E&&t.push(E)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Qs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(vr.fromBufferAttribute(o,s),Mr.fromBufferAttribute(o,r),t.distanceSqToSegment(vr,Mr,jr,Xo)>n)return;jr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(jr);if(!(l<e.near||l>e.far))return{distance:l,point:Xo.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const qo=new G,Yo=new G;class ch extends lh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)qo.fromBufferAttribute(t,s),Yo.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+qo.distanceTo(Yo);e.setAttribute("lineDistance",new bt(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class cc extends bi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zo=new ct,Xa=new ws,js=new Ei,er=new G;class uh extends Bt{constructor(e=new Xt,t=new cc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(s),js.radius+=r,e.ray.intersectsSphere(js)===!1)return;Zo.copy(s).invert(),Xa.copy(e.ray).applyMatrix4(Zo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,m=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),g=Math.min(l.count,a.start+a.count);for(let _=h,E=g;_<E;_++){const u=l.getX(_);er.fromBufferAttribute(m,u),Ko(er,u,c,s,e,t,this)}}else{const h=Math.max(0,a.start),g=Math.min(m.count,a.start+a.count);for(let _=h,E=g;_<E;_++)er.fromBufferAttribute(m,_),Ko(er,_,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ko(i,e,t,n,s,r,a){const o=Xa.distanceSqToPoint(i);if(o<t){const c=new G;Xa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class uc extends Kt{constructor(e=[],t=Ji,n,s,r,a,o,c,l,p){super(e,t,n,s,r,a,o,c,l,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $o extends Kt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ji extends Kt{constructor(e,t,n=In,s,r,a,o=Wt,c=Wt,l,p=si,m=1){if(p!==si&&p!==ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:m};super(h,s,r,a,o,c,p,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ao(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class hc extends ji{constructor(e,t=In,n=Ji,s,r,a=Wt,o=Wt,c,l=si){const p={width:e,height:e,depth:1},m=[p,p,p,p,p,p];super(e,e,t,n,s,r,a,o,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class dc extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Vt extends Xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],p=[],m=[];let h=0,g=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(p,3)),this.setAttribute("uv",new bt(m,2));function _(E,u,f,x,C,A,M,S,d,b,U){const w=A/d,P=M/b,F=A/2,H=M/2,L=S/2,I=d+1,W=b+1;let K=0,he=0;const Z=new G;for(let se=0;se<W;se++){const ae=se*P-H;for(let fe=0;fe<I;fe++){const Le=fe*w-F;Z[E]=Le*x,Z[u]=ae*C,Z[f]=L,l.push(Z.x,Z.y,Z.z),Z[E]=0,Z[u]=0,Z[f]=S>0?1:-1,p.push(Z.x,Z.y,Z.z),m.push(fe/d),m.push(1-se/b),K+=1}}for(let se=0;se<b;se++)for(let ae=0;ae<d;ae++){const fe=h+ae+I*se,Le=h+ae+I*(se+1),ee=h+(ae+1)+I*(se+1),Me=h+(ae+1)+I*se;c.push(fe,Le,Me),c.push(Le,ee,Me),he+=6}o.addGroup(g,he,U),g+=he,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bn extends Xt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const p=[],m=[],h=[],g=[];let _=0;const E=[],u=n/2;let f=0;x(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(p),this.setAttribute("position",new bt(m,3)),this.setAttribute("normal",new bt(h,3)),this.setAttribute("uv",new bt(g,2));function x(){const A=new G,M=new G;let S=0;const d=(t-e)/n;for(let b=0;b<=r;b++){const U=[],w=b/r,P=w*(t-e)+e;for(let F=0;F<=s;F++){const H=F/s,L=H*c+o,I=Math.sin(L),W=Math.cos(L);M.x=P*I,M.y=-w*n+u,M.z=P*W,m.push(M.x,M.y,M.z),A.set(I,d,W).normalize(),h.push(A.x,A.y,A.z),g.push(H,1-w),U.push(_++)}E.push(U)}for(let b=0;b<s;b++)for(let U=0;U<r;U++){const w=E[U][b],P=E[U+1][b],F=E[U+1][b+1],H=E[U][b+1];(e>0||U!==0)&&(p.push(w,P,H),S+=3),(t>0||U!==r-1)&&(p.push(P,F,H),S+=3)}l.addGroup(f,S,0),f+=S}function C(A){const M=_,S=new We,d=new G;let b=0;const U=A===!0?e:t,w=A===!0?1:-1;for(let F=1;F<=s;F++)m.push(0,u*w,0),h.push(0,w,0),g.push(.5,.5),_++;const P=_;for(let F=0;F<=s;F++){const L=F/s*c+o,I=Math.cos(L),W=Math.sin(L);d.x=U*W,d.y=u*w,d.z=U*I,m.push(d.x,d.y,d.z),h.push(0,w,0),S.x=I*.5+.5,S.y=W*.5*w+.5,g.push(S.x,S.y),_++}for(let F=0;F<s;F++){const H=M+F,L=P+F;A===!0?p.push(L,L+1,H):p.push(L+1,L,H),b+=3}l.addGroup(f,b,A===!0?1:2),f+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zn extends bn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Zn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uo extends Xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),p(),this.setAttribute("position",new bt(r,3)),this.setAttribute("normal",new bt(r.slice(),3)),this.setAttribute("uv",new bt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const C=new G,A=new G,M=new G;for(let S=0;S<t.length;S+=3)g(t[S+0],C),g(t[S+1],A),g(t[S+2],M),c(C,A,M,x)}function c(x,C,A,M){const S=M+1,d=[];for(let b=0;b<=S;b++){d[b]=[];const U=x.clone().lerp(A,b/S),w=C.clone().lerp(A,b/S),P=S-b;for(let F=0;F<=P;F++)F===0&&b===S?d[b][F]=U:d[b][F]=U.clone().lerp(w,F/P)}for(let b=0;b<S;b++)for(let U=0;U<2*(S-b)-1;U++){const w=Math.floor(U/2);U%2===0?(h(d[b][w+1]),h(d[b+1][w]),h(d[b][w])):(h(d[b][w+1]),h(d[b+1][w+1]),h(d[b+1][w]))}}function l(x){const C=new G;for(let A=0;A<r.length;A+=3)C.x=r[A+0],C.y=r[A+1],C.z=r[A+2],C.normalize().multiplyScalar(x),r[A+0]=C.x,r[A+1]=C.y,r[A+2]=C.z}function p(){const x=new G;for(let C=0;C<r.length;C+=3){x.x=r[C+0],x.y=r[C+1],x.z=r[C+2];const A=u(x)/2/Math.PI+.5,M=f(x)/Math.PI+.5;a.push(A,1-M)}_(),m()}function m(){for(let x=0;x<a.length;x+=6){const C=a[x+0],A=a[x+2],M=a[x+4],S=Math.max(C,A,M),d=Math.min(C,A,M);S>.9&&d<.1&&(C<.2&&(a[x+0]+=1),A<.2&&(a[x+2]+=1),M<.2&&(a[x+4]+=1))}}function h(x){r.push(x.x,x.y,x.z)}function g(x,C){const A=x*3;C.x=e[A+0],C.y=e[A+1],C.z=e[A+2]}function _(){const x=new G,C=new G,A=new G,M=new G,S=new We,d=new We,b=new We;for(let U=0,w=0;U<r.length;U+=9,w+=6){x.set(r[U+0],r[U+1],r[U+2]),C.set(r[U+3],r[U+4],r[U+5]),A.set(r[U+6],r[U+7],r[U+8]),S.set(a[w+0],a[w+1]),d.set(a[w+2],a[w+3]),b.set(a[w+4],a[w+5]),M.copy(x).add(C).add(A).divideScalar(3);const P=u(M);E(S,w+0,x,P),E(d,w+2,C,P),E(b,w+4,A,P)}}function E(x,C,A,M){M<0&&x.x===1&&(a[C]=x.x-1),A.x===0&&A.z===0&&(a[C]=M/2/Math.PI+.5)}function u(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uo(e.vertices,e.indices,e.radius,e.detail)}}class ho extends uo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ho(e.radius,e.detail)}}class ri extends Xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,p=c+1,m=e/o,h=t/c,g=[],_=[],E=[],u=[];for(let f=0;f<p;f++){const x=f*h-a;for(let C=0;C<l;C++){const A=C*m-r;_.push(A,-x,0),E.push(0,0,1),u.push(C/o),u.push(1-f/c)}}for(let f=0;f<c;f++)for(let x=0;x<o;x++){const C=x+l*f,A=x+l*(f+1),M=x+1+l*(f+1),S=x+1+l*f;g.push(C,A,S),g.push(A,M,S)}this.setIndex(g),this.setAttribute("position",new bt(_,3)),this.setAttribute("normal",new bt(E,3)),this.setAttribute("uv",new bt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.width,e.height,e.widthSegments,e.heightSegments)}}class Sr extends Xt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],p=[];let m=e;const h=(t-e)/s,g=new G,_=new We;for(let E=0;E<=s;E++){for(let u=0;u<=n;u++){const f=r+u/n*a;g.x=m*Math.cos(f),g.y=m*Math.sin(f),c.push(g.x,g.y,g.z),l.push(0,0,1),_.x=(g.x/t+1)/2,_.y=(g.y/t+1)/2,p.push(_.x,_.y)}m+=h}for(let E=0;E<s;E++){const u=E*(n+1);for(let f=0;f<n;f++){const x=f+u,C=x,A=x+n+1,M=x+n+2,S=x+1;o.push(C,A,S),o.push(A,M,S)}}this.setIndex(o),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(l,3)),this.setAttribute("uv",new bt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class xi extends Xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const p=[],m=new G,h=new G,g=[],_=[],E=[],u=[];for(let f=0;f<=n;f++){const x=[],C=f/n,A=a+C*o,M=e*Math.cos(A),S=Math.sqrt(e*e-M*M);let d=0;f===0&&a===0?d=.5/t:f===n&&c===Math.PI&&(d=-.5/t);for(let b=0;b<=t;b++){const U=b/t,w=s+U*r;m.x=-S*Math.cos(w),m.y=M,m.z=S*Math.sin(w),_.push(m.x,m.y,m.z),h.copy(m).normalize(),E.push(h.x,h.y,h.z),u.push(U+d,1-C),x.push(l++)}p.push(x)}for(let f=0;f<n;f++)for(let x=0;x<t;x++){const C=p[f][x+1],A=p[f][x],M=p[f+1][x],S=p[f+1][x+1];(f!==0||a>0)&&g.push(C,A,S),(f!==n-1||c<Math.PI)&&g.push(A,M,S)}this.setIndex(g),this.setAttribute("position",new bt(_,3)),this.setAttribute("normal",new bt(E,3)),this.setAttribute("uv",new bt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ii extends Xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],p=[],m=[],h=new G,g=new G,_=new G;for(let E=0;E<=n;E++){const u=a+E/n*o;for(let f=0;f<=s;f++){const x=f/s*r;g.x=(e+t*Math.cos(u))*Math.cos(x),g.y=(e+t*Math.cos(u))*Math.sin(x),g.z=t*Math.sin(u),l.push(g.x,g.y,g.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),_.subVectors(g,h).normalize(),p.push(_.x,_.y,_.z),m.push(f/s),m.push(E/n)}}for(let E=1;E<=n;E++)for(let u=1;u<=s;u++){const f=(s+1)*E+u-1,x=(s+1)*(E-1)+u-1,C=(s+1)*(E-1)+u,A=(s+1)*E+u;c.push(f,x,A),c.push(x,C,A)}this.setIndex(c),this.setAttribute("position",new bt(l,3)),this.setAttribute("normal",new bt(p,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function es(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Jo(s))s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Jo(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function $t(i){const e={};for(let t=0;t<i.length;t++){const n=es(i[t]);for(const s in n)e[s]=n[s]}return e}function Jo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function hh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const dh={clone:es,merge:$t};var fh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ph=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Si extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fh,this.fragmentShader=ph,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=es(e.uniforms),this.uniformsGroups=hh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new tt().setHex(s.value);break;case"v2":this.uniforms[n].value=new We().fromArray(s.value);break;case"v3":this.uniforms[n].value=new G().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new $e().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ct().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class mh extends Si{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class As extends bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gh extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _h extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class pc extends Bt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class xh extends pc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ea=new ct,Qo=new G,jo=new G;class vh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ts,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Qo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qo),jo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){ea.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ea,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Es||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const tr=new G,nr=new hn,An=new G;class mc extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(tr,nr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tr,nr,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(tr,nr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tr,nr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const jn=new G,el=new We,tl=new We;class Mn extends mc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,el,tl),t.subVectors(tl,el)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(_s*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class gc extends mc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=p*this.view.offsetY,c=o-p*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mh extends vh{constructor(){super(new gc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nl extends pc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new Mh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Vi=-90,Wi=1;class qa extends Bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(Vi,Wi,e,t);s.layers=this.layers,this.add(s);const r=new Mn(Vi,Wi,e,t);r.layers=this.layers,this.add(r);const a=new Mn(Vi,Wi,e,t);a.layers=this.layers,this.add(a);const o=new Mn(Vi,Wi,e,t);o.layers=this.layers,this.add(o);const c=new Mn(Vi,Wi,e,t);c.layers=this.layers,this.add(c);const l=new Mn(Vi,Wi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Es)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,p]=this.children,m=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let u=!1;e.isWebGLRenderer===!0?u=e.state.buffers.depth.getReversed():u=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=E,e.setRenderTarget(n,5,s),u&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),e.setRenderTarget(m,h,g),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Sh extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}const il=new ct;class yh{constructor(e,t,n=0,s=1/0){this.ray=new ws(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new oo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):mt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return il.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(il),this}intersectObject(e,t=!0,n=[]){return Ya(e,this,n,t),n.sort(sl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ya(e[s],this,n,t);return n.sort(sl),n}}function sl(i,e){return i.distance-e.distance}function Ya(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ya(r[a],e,t,!0)}}class rl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Eh extends ai{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function al(i,e,t,n){const s=bh(n);switch(t){case ql:return i*e;case eo:return i*e/s.components*s.byteLength;case to:return i*e/s.components*s.byteLength;case Mi:return i*e*2/s.components*s.byteLength;case no:return i*e*2/s.components*s.byteLength;case Yl:return i*e*3/s.components*s.byteLength;case Dn:return i*e*4/s.components*s.byteLength;case io:return i*e*4/s.components*s.byteLength;case or:case lr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cr:case ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ma:case _a:return Math.max(i,16)*Math.max(e,8)/4;case pa:case ga:return Math.max(i,8)*Math.max(e,8)/2;case xa:case va:case Sa:case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ma:case pr:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ba:case za:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ha:case ka:return Math.ceil(i/4)*Math.ceil(e/4)*8;case mr:case Va:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bh(i){switch(i){case un:case kl:return{byteLength:1,components:1};case ys:case Vl:case Nn:return{byteLength:2,components:1};case Qa:case ja:return{byteLength:2,components:4};case In:case Ja:case yn:return{byteLength:4,components:1};case Wl:case Xl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka);function _c(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Th(i){const e=new WeakMap;function t(o,c){const l=o.array,p=o.usage,m=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,p),o.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:m}}function n(o,c,l){const p=c.array,m=c.updateRanges;if(i.bindBuffer(l,o),m.length===0)i.bufferSubData(l,0,p);else{m.sort((g,_)=>g.start-_.start);let h=0;for(let g=1;g<m.length;g++){const _=m[h],E=m[g];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++h,m[h]=E)}m.length=h+1;for(let g=0,_=m.length;g<_;g++){const E=m[g];i.bufferSubData(l,E.start*p.BYTES_PER_ELEMENT,p,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const p=e.get(o);(!p||p.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Ah=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
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
#endif`,Rh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ch=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ph=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lh=`#ifdef USE_AOMAP
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
#endif`,Ih=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nh=`#ifdef USE_BATCHING
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
#endif`,Uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Oh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zh=`#ifdef USE_IRIDESCENCE
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
#endif`,Gh=`#ifdef USE_BUMPMAP
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
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Kh=`#define PI 3.141592653589793
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
} // validated`,$h=`vec3 transformedNormal = objectNormal;
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
#endif`,Jh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ed=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,td="gl_FragColor = linearToOutputTexel( gl_FragColor );",nd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,id=`#ifdef USE_ENVMAP
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
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
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
#endif`,ad=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ud=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dd=`#ifdef USE_GRADIENTMAP
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
}`,fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_d=`#ifdef USE_ENVMAP
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
#endif`,xd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
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
#endif`,Ed=`uniform sampler2D dfgLUT;
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
}`,bd=`
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
#endif`,Td=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Rd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ud=`#if defined( USE_POINTS_UV )
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
#endif`,Fd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Od=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hd=`#ifdef USE_MORPHTARGETS
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
#endif`,kd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
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
#endif`,Kd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ef=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,of=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hf=`float getShadowMask() {
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
}`,df=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ff=`#ifdef USE_SKINNING
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
#endif`,pf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mf=`#ifdef USE_SKINNING
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
#endif`,gf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_f=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mf=`#ifdef USE_TRANSMISSION
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
#endif`,Sf=`#ifdef USE_TRANSMISSION
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
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Af=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wf=`uniform sampler2D t2D;
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
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cf=`uniform float backgroundBlurriness;
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
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Df=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`#include <common>
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
}`,If=`#if DEPTH_PACKING == 3200
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
}`,Nf=`#define DISTANCE
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
}`,Uf=`#define DISTANCE
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
}`,Ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Of=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`uniform float scale;
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
}`,zf=`uniform vec3 diffuse;
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
}`,Gf=`#include <common>
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
}`,Hf=`uniform vec3 diffuse;
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
}`,kf=`#define LAMBERT
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
}`,Vf=`#define LAMBERT
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
}`,Wf=`#define MATCAP
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
}`,Xf=`#define MATCAP
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
}`,qf=`#define NORMAL
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
}`,Yf=`#define NORMAL
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
}`,Zf=`#define PHONG
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
}`,Kf=`#define PHONG
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
}`,$f=`#define STANDARD
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
}`,Jf=`#define STANDARD
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
}`,Qf=`#define TOON
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
}`,jf=`#define TOON
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
}`,ep=`uniform float size;
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
}`,tp=`uniform vec3 diffuse;
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
}`,np=`#include <common>
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
}`,ip=`uniform vec3 color;
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
}`,sp=`uniform float rotation;
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
}`,rp=`uniform vec3 diffuse;
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
}`,it={alphahash_fragment:Ah,alphahash_pars_fragment:wh,alphamap_fragment:Rh,alphamap_pars_fragment:Ch,alphatest_fragment:Ph,alphatest_pars_fragment:Dh,aomap_fragment:Lh,aomap_pars_fragment:Ih,batching_pars_vertex:Nh,batching_vertex:Uh,begin_vertex:Fh,beginnormal_vertex:Oh,bsdfs:Bh,iridescence_fragment:zh,bumpmap_pars_fragment:Gh,clipping_planes_fragment:Hh,clipping_planes_pars_fragment:kh,clipping_planes_pars_vertex:Vh,clipping_planes_vertex:Wh,color_fragment:Xh,color_pars_fragment:qh,color_pars_vertex:Yh,color_vertex:Zh,common:Kh,defaultnormal_vertex:$h,displacementmap_pars_vertex:Jh,displacementmap_vertex:Qh,emissivemap_fragment:jh,emissivemap_pars_fragment:ed,colorspace_fragment:td,colorspace_pars_fragment:nd,envmap_fragment:id,envmap_common_pars_fragment:sd,envmap_pars_fragment:rd,envmap_pars_vertex:ad,envmap_physical_pars_fragment:_d,envmap_vertex:od,fog_vertex:ld,fog_pars_vertex:cd,fog_fragment:ud,fog_pars_fragment:hd,gradientmap_pars_fragment:dd,lightmap_pars_fragment:fd,lights_lambert_fragment:pd,lights_lambert_pars_fragment:md,lights_pars_begin:gd,lights_toon_fragment:xd,lights_toon_pars_fragment:vd,lights_phong_fragment:Md,lights_phong_pars_fragment:Sd,lights_physical_fragment:yd,lights_physical_pars_fragment:Ed,lights_fragment_begin:bd,lights_fragment_maps:Td,lights_fragment_end:Ad,lightprobes_pars_fragment:wd,logdepthbuf_fragment:Rd,logdepthbuf_pars_fragment:Cd,logdepthbuf_pars_vertex:Pd,logdepthbuf_vertex:Dd,map_fragment:Ld,map_pars_fragment:Id,map_particle_fragment:Nd,map_particle_pars_fragment:Ud,metalnessmap_fragment:Fd,metalnessmap_pars_fragment:Od,morphinstance_vertex:Bd,morphcolor_vertex:zd,morphnormal_vertex:Gd,morphtarget_pars_vertex:Hd,morphtarget_vertex:kd,normal_fragment_begin:Vd,normal_fragment_maps:Wd,normal_pars_fragment:Xd,normal_pars_vertex:qd,normal_vertex:Yd,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:Kd,clearcoat_normal_fragment_maps:$d,clearcoat_pars_fragment:Jd,iridescence_pars_fragment:Qd,opaque_fragment:jd,packing:ef,premultiplied_alpha_fragment:tf,project_vertex:nf,dithering_fragment:sf,dithering_pars_fragment:rf,roughnessmap_fragment:af,roughnessmap_pars_fragment:of,shadowmap_pars_fragment:lf,shadowmap_pars_vertex:cf,shadowmap_vertex:uf,shadowmask_pars_fragment:hf,skinbase_vertex:df,skinning_pars_vertex:ff,skinning_vertex:pf,skinnormal_vertex:mf,specularmap_fragment:gf,specularmap_pars_fragment:_f,tonemapping_fragment:xf,tonemapping_pars_fragment:vf,transmission_fragment:Mf,transmission_pars_fragment:Sf,uv_pars_fragment:yf,uv_pars_vertex:Ef,uv_vertex:bf,worldpos_vertex:Tf,background_vert:Af,background_frag:wf,backgroundCube_vert:Rf,backgroundCube_frag:Cf,cube_vert:Pf,cube_frag:Df,depth_vert:Lf,depth_frag:If,distance_vert:Nf,distance_frag:Uf,equirect_vert:Ff,equirect_frag:Of,linedashed_vert:Bf,linedashed_frag:zf,meshbasic_vert:Gf,meshbasic_frag:Hf,meshlambert_vert:kf,meshlambert_frag:Vf,meshmatcap_vert:Wf,meshmatcap_frag:Xf,meshnormal_vert:qf,meshnormal_frag:Yf,meshphong_vert:Zf,meshphong_frag:Kf,meshphysical_vert:$f,meshphysical_frag:Jf,meshtoon_vert:Qf,meshtoon_frag:jf,points_vert:ep,points_frag:tp,shadow_vert:np,shadow_frag:ip,sprite_vert:sp,sprite_frag:rp},Pe={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Pn={basic:{uniforms:$t([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:$t([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:$t([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:$t([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:$t([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new tt(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:$t([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:$t([Pe.points,Pe.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:$t([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:$t([Pe.common,Pe.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:$t([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:$t([Pe.sprite,Pe.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:$t([Pe.common,Pe.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:$t([Pe.lights,Pe.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Pn.physical={uniforms:$t([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const ir={r:0,b:0,g:0},ap=new ct,xc=new $e;xc.set(-1,0,0,0,1,0,0,0,1);function op(i,e,t,n,s,r){const a=new tt(0);let o=s===!0?0:1,c,l,p=null,m=0,h=null;function g(x){let C=x.isScene===!0?x.background:null;if(C&&C.isTexture){const A=x.backgroundBlurriness>0;C=e.get(C,A)}return C}function _(x){let C=!1;const A=g(x);A===null?u(a,o):A&&A.isColor&&(u(A,1),C=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(x,C){const A=g(C);A&&A.isCubeTexture?(l===void 0&&(l=new gt(new Vt(1,1,1),new Si({name:"BackgroundCubeMaterial",uniforms:es(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,d){this.matrixWorld.copyPosition(d.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ap.makeRotationFromEuler(C.backgroundRotation)).transpose(),A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xc),l.material.toneMapped=ot.getTransfer(A.colorSpace)!==vt,(p!==A||m!==A.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,p=A,m=A.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new gt(new ri(2,2),new Si({name:"BackgroundMaterial",uniforms:es(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=ot.getTransfer(A.colorSpace)!==vt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(p!==A||m!==A.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,p=A,m=A.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,C){x.getRGB(ir,fc(i)),t.buffers.color.setClear(ir.r,ir.g,ir.b,C,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,C=1){a.set(x),o=C,u(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,u(a,o)},render:_,addToRenderList:E,dispose:f}}function lp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(P,F,H,L,I){let W=!1;const K=m(P,L,H,F);r!==K&&(r=K,l(r.object)),W=g(P,L,H,I),W&&_(P,L,H,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,A(P,F,H,L),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function p(P){return i.deleteVertexArray(P)}function m(P,F,H,L){const I=L.wireframe===!0;let W=n[F.id];W===void 0&&(W={},n[F.id]=W);const K=P.isInstancedMesh===!0?P.id:0;let he=W[K];he===void 0&&(he={},W[K]=he);let Z=he[H.id];Z===void 0&&(Z={},he[H.id]=Z);let se=Z[I];return se===void 0&&(se=h(c()),Z[I]=se),se}function h(P){const F=[],H=[],L=[];for(let I=0;I<t;I++)F[I]=0,H[I]=0,L[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:H,attributeDivisors:L,object:P,attributes:{},index:null}}function g(P,F,H,L){const I=r.attributes,W=F.attributes;let K=0;const he=H.getAttributes();for(const Z in he)if(he[Z].location>=0){const ae=I[Z];let fe=W[Z];if(fe===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor)),ae===void 0||ae.attribute!==fe||fe&&ae.data!==fe.data)return!0;K++}return r.attributesNum!==K||r.index!==L}function _(P,F,H,L){const I={},W=F.attributes;let K=0;const he=H.getAttributes();for(const Z in he)if(he[Z].location>=0){let ae=W[Z];ae===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor));const fe={};fe.attribute=ae,ae&&ae.data&&(fe.data=ae.data),I[Z]=fe,K++}r.attributes=I,r.attributesNum=K,r.index=L}function E(){const P=r.newAttributes;for(let F=0,H=P.length;F<H;F++)P[F]=0}function u(P){f(P,0)}function f(P,F){const H=r.newAttributes,L=r.enabledAttributes,I=r.attributeDivisors;H[P]=1,L[P]===0&&(i.enableVertexAttribArray(P),L[P]=1),I[P]!==F&&(i.vertexAttribDivisor(P,F),I[P]=F)}function x(){const P=r.newAttributes,F=r.enabledAttributes;for(let H=0,L=F.length;H<L;H++)F[H]!==P[H]&&(i.disableVertexAttribArray(H),F[H]=0)}function C(P,F,H,L,I,W,K){K===!0?i.vertexAttribIPointer(P,F,H,I,W):i.vertexAttribPointer(P,F,H,L,I,W)}function A(P,F,H,L){E();const I=L.attributes,W=H.getAttributes(),K=F.defaultAttributeValues;for(const he in W){const Z=W[he];if(Z.location>=0){let se=I[he];if(se===void 0&&(he==="instanceMatrix"&&P.instanceMatrix&&(se=P.instanceMatrix),he==="instanceColor"&&P.instanceColor&&(se=P.instanceColor)),se!==void 0){const ae=se.normalized,fe=se.itemSize,Le=e.get(se);if(Le===void 0)continue;const ee=Le.buffer,Me=Le.type,Re=Le.bytesPerElement,Ee=Me===i.INT||Me===i.UNSIGNED_INT||se.gpuType===Ja;if(se.isInterleavedBufferAttribute){const Ae=se.data,ke=Ae.isInterleavedBuffer===!0?Ae.stride:Ae.itemSize,Mt=se.offset;if(Ae.isInstancedInterleavedBuffer||Ae.isInstancedBufferAttribute){for(let Be=0;Be<Z.locationSize;Be++)f(Z.location+Be,Ae.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Ae.meshPerAttribute*Ae.count)}else for(let Be=0;Be<Z.locationSize;Be++)u(Z.location+Be);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Be=0;Be<Z.locationSize;Be++)C(Z.location+Be,fe/Z.locationSize,Me,ae,ke*Re,(Mt+fe/Z.locationSize*Be)*Re,Ee)}else{if(se.isInstancedBufferAttribute){for(let Ae=0;Ae<Z.locationSize;Ae++)f(Z.location+Ae,se.meshPerAttribute);P.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ae=0;Ae<Z.locationSize;Ae++)u(Z.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let Ae=0;Ae<Z.locationSize;Ae++)C(Z.location+Ae,fe/Z.locationSize,Me,ae,fe*Re,fe/Z.locationSize*Ae*Re,Ee)}}else if(K!==void 0){const ae=K[he];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(Z.location,ae);break;case 3:i.vertexAttrib3fv(Z.location,ae);break;case 4:i.vertexAttrib4fv(Z.location,ae);break;default:i.vertexAttrib1fv(Z.location,ae)}}}}x()}function M(){U();for(const P in n){const F=n[P];for(const H in F){const L=F[H];for(const I in L){const W=L[I];for(const K in W)p(W[K].object),delete W[K];delete L[I]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;const F=n[P.id];for(const H in F){const L=F[H];for(const I in L){const W=L[I];for(const K in W)p(W[K].object),delete W[K];delete L[I]}}delete n[P.id]}function d(P){for(const F in n){const H=n[F];for(const L in H){const I=H[L];if(I[P.id]===void 0)continue;const W=I[P.id];for(const K in W)p(W[K].object),delete W[K];delete I[P.id]}}}function b(P){for(const F in n){const H=n[F],L=P.isInstancedMesh===!0?P.id:0,I=H[L];if(I!==void 0){for(const W in I){const K=I[W];for(const he in K)p(K[he].object),delete K[he];delete I[W]}delete H[L],Object.keys(H).length===0&&delete n[F]}}}function U(){w(),a=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:w,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:d,initAttributes:E,enableAttribute:u,disableUnusedAttributes:x}}function cp(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,p){p!==0&&(i.drawArraysInstanced(n,c,l,p),t.update(l,n,p))}function o(c,l,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,p);let h=0;for(let g=0;g<p;g++)h+=l[g];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function up(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const d=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(d){return!(d!==Dn&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(d){const b=d===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==un&&d!==yn&&!b&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const p=c(l);p!==l&&(Ze("WebGLRenderer:",l,"not supported, using",p,"instead."),l=p);const m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&m===!1;t.reversedDepthBuffer===!0&&m===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&m===!0&&Ze("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:u,maxAttributes:f,maxVertexUniforms:x,maxVaryings:C,maxFragmentUniforms:A,maxSamples:M,samples:S}}function hp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new kn,o=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,h){const g=m.length!==0||h||n!==0||s;return s=h,n=m.length,g},this.beginShadows=function(){r=!0,p(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,h){t=p(m,h,0)},this.setState=function(m,h,g){const _=m.clippingPlanes,E=m.clipIntersection,u=m.clipShadows,f=i.get(m);if(!s||_===null||_.length===0||r&&!u)r?p(null):l();else{const x=r?0:n,C=x*4;let A=f.clippingState||null;c.value=A,A=p(_,h,C,g);for(let M=0;M!==C;++M)A[M]=t[M];f.clippingState=A,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function p(m,h,g,_){const E=m!==null?m.length:0;let u=null;if(E!==0){if(u=c.value,_!==!0||u===null){const f=g+E*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(u===null||u.length<f)&&(u=new Float32Array(f));for(let C=0,A=g;C!==E;++C,A+=4)a.copy(m[C]).applyMatrix4(x,o),a.normal.toArray(u,A),u[A+3]=a.constant}c.value=u,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,u}}class fo extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new uc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vt(5,5,5),r=new Si({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:Ki});r.uniforms.tEquirect.value=t;const a=new gt(s,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=sn),new qa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const ol=256,dp=3,fp=20,vc=256,Mc=16,pp=3,mp=new G,gp=new tt;class yr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new qa(1,10,null),this._boxMesh=new gt(new Vt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=mp}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),p=this._getSourceTarget(!0);t>0&&(p.texture.mipmapsAutoUpdate=!1);const m=c.autoClear,h=c.autoClearColor,g=c.autoClearDepth,_=c.autoClearStencil,E=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,E===null&&(e.background=c.getClearColor(gp));const u=new qa(n,s,p);return u.position.copy(o),u.update(c,e),c.autoClear=m,c.autoClearColor=h,c.autoClearDepth=g,c.autoClearStencil=_,e.background=E,t>0&&(p.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ol,jl(e))}_fromTexture(e,t){e.mapping===Ji||e.mapping===Ss?this._setSize(e.image.length===0?ol:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=ll(e,!1,!1),n=Math.log2(e)-dp;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ll(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ji||e.mapping===Ss?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=cl()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=_p(),this._integrationMaterial=xp());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Mc);for(let a=0;a<=n;a++){const o=yr.lodToRoughness(a,n);if(a>n-pp)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(vc*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=vp());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function ll(i,e,t){return new fo(i,{minFilter:ti,generateMipmaps:e,type:Nn,colorSpace:gr,depthBuffer:t})}function Rs(i,e,t){return new Si({name:i,uniforms:e,vertexShader:it.cube_vert,fragmentShader:t,side:rn,blending:Ki,depthTest:!1,depthWrite:!1})}function _p(){return Rs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${vc}u

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
	`)}function xp(){return Rs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Mc}},`

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
	`)}function vp(){return Rs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${fp}
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
	`)}function cl(){return Rs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function ul(){return Rs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Mp(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){const g=h.mapping;if(g===Cr||g===Pr)if(e.has(h)){const _=e.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const E=new fo(_.height);return E.fromEquirectangularTexture(i,h),e.set(h,E),h.addEventListener("dispose",l),o(E.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const g=h.mapping,_=g===Cr||g===Pr,E=g===Ji||g===Ss;if(_||E){let u=t.get(h);const f=u!==void 0?u.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new yr(i)),u=_?n.fromEquirectangular(h,u):n.fromCubemap(h,u),u.texture.pmremVersion=h.pmremVersion,t.set(h,u),u.texture;if(u!==void 0)return u.texture;{const x=h.image;return _&&x&&x.height>0||E&&x&&c(x)?(n===null&&(n=new yr(i)),u=_?n.fromEquirectangular(h):n.fromCubemap(h),u.texture.pmremVersion=h.pmremVersion,t.set(h,u),h.addEventListener("dispose",p),u.texture):null}}}return h}function o(h,g){return g===Cr?h.mapping=Ji:g===Pr&&(h.mapping=Ss),h}function c(h){let g=0;const _=6;for(let E=0;E<_;E++)h[E]!==void 0&&g++;return g===_}function l(h){const g=h.target;g.removeEventListener("dispose",l);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function p(h){const g=h.target;g.removeEventListener("dispose",p);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function Sp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&hr("WebGLRenderer: "+n+" extension not supported."),s}}}function yp(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){c(_.target)}function c(_){_.index!==null&&e.remove(_.index);for(const u in _.attributes)e.remove(_.attributes[u]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const E=r.get(_);E&&(e.remove(E),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function l(_,E){return s[E.id]!==void 0||(E.addEventListener("dispose",o),s[E.id]=new WeakRef(E),a.register(E,E.id,E),t.memory.geometries++),E}function p(_){const E=_.attributes;for(const u in E)e.update(E[u],i.ARRAY_BUFFER)}function m(_){const E=_.index,u=_.attributes.position;let f=0;if(u===void 0)return;const x=E!==null?E.array.length:u.array.length/3-1,C=u.count>=65535?rc:sc,A=new C(Math.ceil(x/3)*6,1),M=A.array;if(E!==null){const d=E.array;f=E.version;for(let b=0,U=0;b<x;b+=3){const w=d[b+0],P=d[b+1],F=d[b+2];M[U++]=w,M[U++]=P,M[U++]=P,M[U++]=F,M[U++]=F,M[U++]=w}}else{f=u.version;for(let d=0,b=0;d<x;d+=3){const U=d+0,w=d+1,P=d+2;M[b++]=U,M[b++]=w,M[b++]=w,M[b++]=P,M[b++]=P,M[b++]=U}}A.version=f;const S=r.get(_);S&&e.remove(S),r.set(_,A)}function h(_){const E=r.get(_);if(E){const u=_.index;u!==null&&E.version<u.version&&m(_)}else m(_);return r.get(_)}function g(){for(const _ in s){const E=s[_].deref();E!==void 0&&c(E)}}return{get:l,update:p,getWireframeAttribute:h,dispose:g}}function Ep(i,e,t){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function c(m,h){i.drawElements(n,h,r,m*a),t.update(h,n,1)}function l(m,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,m*a,g),t.update(h,n,g))}function p(m,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,m,0,g);let E=0;for(let u=0;u<g;u++)E+=h[u];t.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=p}function bp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Tp(i,e,t){const n=new WeakMap,s=new Dt;function r(a,o,c){const l=a.morphTargetInfluences,p=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=p!==void 0?p.length:0;let h=n.get(o);if(h===void 0||h.count!==m){let U=function(){d.dispose(),n.delete(o),o.removeEventListener("dispose",U)};h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let C=0;g===!0&&(C=1),_===!0&&(C=2),E===!0&&(C=3);let A=o.attributes.position.count*C,M=1;A>e.maxTextureSize&&(M=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const S=new Float32Array(A*M*4*m),d=new nc(S,A,M,m);d.type=yn,d.needsUpdate=!0;const b=C*4;for(let w=0;w<m;w++){const P=u[w],F=f[w],H=x[w],L=A*M*4*w;for(let I=0;I<P.count;I++){const W=I*b;g===!0&&(s.fromBufferAttribute(P,I),S[L+W+0]=s.x,S[L+W+1]=s.y,S[L+W+2]=s.z,S[L+W+3]=0),_===!0&&(s.fromBufferAttribute(F,I),S[L+W+4]=s.x,S[L+W+5]=s.y,S[L+W+6]=s.z,S[L+W+7]=0),E===!0&&(s.fromBufferAttribute(H,I),S[L+W+8]=s.x,S[L+W+9]=s.y,S[L+W+10]=s.z,S[L+W+11]=H.itemSize===4?s.w:1)}}h={count:m,texture:d,size:new We(A,M)},n.set(o,h),o.addEventListener("dispose",U)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let E=0;E<l.length;E++)g+=l[E];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Ap(i,e,t,n,s){let r=new WeakMap;function a(l){const p=s.render.frame,m=l.geometry,h=e.get(l,m);if(r.get(h)!==p&&(e.update(h),r.set(h,p)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==p&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,p))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==p&&(g.update(),r.set(g,p))}return h}function o(){r=new WeakMap}function c(l){const p=l.target;p.removeEventListener("dispose",c),n.releaseStatesOfObject(p),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:a,dispose:o}}const wp={[Ul]:"LINEAR_TONE_MAPPING",[Fl]:"REINHARD_TONE_MAPPING",[Ol]:"CINEON_TONE_MAPPING",[$a]:"ACES_FILMIC_TONE_MAPPING",[zl]:"AGX_TONE_MAPPING",[Gl]:"NEUTRAL_TONE_MAPPING",[Bl]:"CUSTOM_TONE_MAPPING"};function Rp(i,e,t,n,s,r){const a=new Ln(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const p=new Xt;p.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new bt([0,2,0,0,2,0],2));const m=new mh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new gt(p,m),g=new gc(-1,1,1,-1,0,1);let _=null,E=null,u=!1,f,x=null,C=[],A=!1;this.setSize=function(M,S){a.setSize(M,S),o!==null&&o.setSize(M,S),c!==null&&c.setSize(M,S);for(let d=0;d<C.length;d++){const b=C[d];b.setSize&&b.setSize(M,S)}},this.setEffects=function(M){C=M,A=C.length>0&&C[0].isRenderPass===!0;const S=a.width,d=a.height;C.length>0&&o===null&&(o=new Ln(S,d,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),c=new Ln(S,d,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));const b=s===!0&&C.some(U=>U.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&l===null&&(l=new ji(S,d),r===!0&&(l.format=ni,l.type=Qi)),a.dispose(),a.depthTexture=b?l:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let U=0;U<C.length;U++){const w=C[U];w.setSize&&w.setSize(S,d),b&&w.needsDepthTexture===!0&&w.setDepthTexture&&w.setDepthTexture(l)}},this.begin=function(M,S){if(u||M.toneMapping===qn&&C.length===0)return!1;if(x=S,S!==null){const d=S.width,b=S.height;(a.width!==d||a.height!==b)&&this.setSize(d,b)}return A===!1&&M.setRenderTarget(a),f=M.toneMapping,M.toneMapping=qn,!0},this.hasRenderPass=function(){return A},this.end=function(M,S){M.toneMapping=f,u=!0;let d=a,b=o;for(let U=0;U<C.length;U++){const w=C[U];w.enabled!==!1&&(w.render(M,b,d,S),w.needsSwap!==!1&&(d=b,b=b===o?c:o))}if(_!==M.outputColorSpace||E!==M.toneMapping){_=M.outputColorSpace,E=M.toneMapping,m.defines={},ot.getTransfer(_)===vt&&(m.defines.SRGB_TRANSFER="");const U=wp[E];U&&(m.defines[U]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=d.texture,M.setRenderTarget(x),M.render(h,g),x=null,u=!1},this.isCompositing=function(){return u},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),p.dispose(),m.dispose()}}const Sc=new Kt,yc=new ji(1,1),Ec=new hc(1),bc=new nc,Tc=new Wu,Ac=new uc,hl=[],dl=[],fl=new Float32Array(16),pl=new Float32Array(9),ml=new Float32Array(4);function ns(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=hl[s];if(r===void 0&&(r=new Float32Array(s),hl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Tr(i,e){let t=dl[e];t===void 0&&(t=new Int32Array(e),dl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function Lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function Ip(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;ml.set(n),i.uniformMatrix2fv(this.addr,!1,ml),Gt(t,n)}}function Np(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;pl.set(n),i.uniformMatrix3fv(this.addr,!1,pl),Gt(t,n)}}function Up(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;fl.set(n),i.uniformMatrix4fv(this.addr,!1,fl),Gt(t,n)}}function Fp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function Bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Gp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function Ar(i){return i.version===0&&(i.compareFunction=$l,i.needsUpdate=!0),i}function Wp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Ar(yc):r=Sc,t.setTexture2D(e||r,s)}function Xp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Tc,s)}function qp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ar(Ec):r=Ac,t.setTextureCube(e||r,s)}function Yp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||bc,s)}function Zp(i){switch(i){case 5126:return Cp;case 35664:return Pp;case 35665:return Dp;case 35666:return Lp;case 35674:return Ip;case 35675:return Np;case 35676:return Up;case 5124:case 35670:return Fp;case 35667:case 35671:return Op;case 35668:case 35672:return Bp;case 35669:case 35673:return zp;case 5125:return Gp;case 36294:return Hp;case 36295:return kp;case 36296:return Vp;case 35678:case 36198:case 36298:case 36306:case 35682:return Wp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return qp;case 36289:case 36303:case 36311:case 36292:return Yp}}function Kp(i,e){i.uniform1fv(this.addr,e)}function $p(i,e){const t=ns(e,this.size,2);i.uniform2fv(this.addr,t)}function Jp(i,e){const t=ns(e,this.size,3);i.uniform3fv(this.addr,t)}function Qp(i,e){const t=ns(e,this.size,4);i.uniform4fv(this.addr,t)}function jp(i,e){const t=ns(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function em(i,e){const t=ns(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tm(i,e){const t=ns(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nm(i,e){i.uniform1iv(this.addr,e)}function im(i,e){i.uniform2iv(this.addr,e)}function sm(i,e){i.uniform3iv(this.addr,e)}function rm(i,e){i.uniform4iv(this.addr,e)}function am(i,e){i.uniform1uiv(this.addr,e)}function om(i,e){i.uniform2uiv(this.addr,e)}function lm(i,e){i.uniform3uiv(this.addr,e)}function cm(i,e){i.uniform4uiv(this.addr,e)}function um(i,e,t){const n=this.cache,s=e.length,r=Tr(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ar(yc):a=Sc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function hm(i,e,t){const n=this.cache,s=e.length,r=Tr(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Tc,r[a])}function dm(i,e,t){const n=this.cache,s=e.length,r=Tr(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Ar(Ec):a=Ac;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function fm(i,e,t){const n=this.cache,s=e.length,r=Tr(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||bc,r[a])}function pm(i){switch(i){case 5126:return Kp;case 35664:return $p;case 35665:return Jp;case 35666:return Qp;case 35674:return jp;case 35675:return em;case 35676:return tm;case 5124:case 35670:return nm;case 35667:case 35671:return im;case 35668:case 35672:return sm;case 35669:case 35673:return rm;case 5125:return am;case 36294:return om;case 36295:return lm;case 36296:return cm;case 35678:case 36198:case 36298:case 36306:case 35682:return um;case 35679:case 36299:case 36307:return hm;case 35680:case 36300:case 36308:case 36293:return dm;case 36289:case 36303:case 36311:case 36292:return fm}}class mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zp(t.type)}}class gm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pm(t.type)}}class _m{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ta=/(\w+)(\])?(\[|\.)?/g;function gl(i,e){i.seq.push(e),i.map[e.id]=e}function xm(i,e,t){const n=i.name,s=n.length;for(ta.lastIndex=0;;){const r=ta.exec(n),a=ta.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){gl(t,l===void 0?new mm(o,i,e):new gm(o,i,e));break}else{let m=t.map[o];m===void 0&&(m=new _m(o),gl(t,m)),t=m}}}class dr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);xm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function _l(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const vm=37297;let Mm=0;function Sm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const xl=new $e;function ym(i){ot._getMatrix(xl,ot.workingColorSpace,i);const e=`mat3( ${xl.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case _r:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Sm(i.getShaderSource(e),o)}else return r}function Em(i,e){const t=ym(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const bm={[Ul]:"Linear",[Fl]:"Reinhard",[Ol]:"Cineon",[$a]:"ACESFilmic",[zl]:"AgX",[Gl]:"Neutral",[Bl]:"Custom"};function Tm(i,e){const t=bm[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const sr=new G;function Am(){ot.getLuminanceCoefficients(sr);const i=sr.x.toFixed(4),e=sr.y.toFixed(4),t=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function Rm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ms(i){return i!==""}function Ml(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Sl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(i){return i.replace(Pm,Dm)}function Dm(i,e){const t=it[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Za(t)}const Lm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yl(i){return i.replace(Lm,Im)}function Im(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function El(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Nm={[ar]:"SHADOWMAP_TYPE_PCF",[ps]:"SHADOWMAP_TYPE_VSM"};function Um(i){return Nm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Fm={[Ss]:"ENVMAP_MODE_REFRACTION"};function Om(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Fm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Bm={[Nl]:"ENVMAP_BLENDING_MULTIPLY",[lu]:"ENVMAP_BLENDING_MIX",[cu]:"ENVMAP_BLENDING_ADD"};function zm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Bm[i.combine]||"ENVMAP_BLENDING_NONE"}function Gm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Um(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",p=Om(t),m=zm(t),h=wm(t),g=Rm(r),_=s.createProgram();let E,u,f=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(E=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ms).join(`
`),E.length>0&&(E+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ms).join(`
`),u.length>0&&(u+=`
`)):(E=[El(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),u=[El(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+p:"",t.envMap?"#define "+m:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?it.tonemapping_pars_fragment:"",t.toneMapping!==qn?Tm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Em("linearToOutputTexel",t.outputColorSpace),Am(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ms).join(`
`)),a=Za(a),a=Ml(a,t),a=Sl(a,t),o=Za(o),o=Ml(o,t),o=Sl(o,t),a=yl(a),o=yl(o),t.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,E=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,u=["#define varying in",t.glslVersion===yo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const x=f+E+a,C=f+u+o,A=_l(s,s.VERTEX_SHADER,x),M=_l(s,s.FRAGMENT_SHADER,C);s.attachShader(_,A),s.attachShader(_,M),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function S(w){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(_)||"",F=s.getShaderInfoLog(A)||"",H=s.getShaderInfoLog(M)||"",L=P.trim(),I=F.trim(),W=H.trim();let K=!0,he=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,M);else{const Z=vl(s,A,"vertex"),se=vl(s,M,"fragment");mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+L+`
`+Z+`
`+se)}else L!==""?Ze("WebGLProgram: Program Info Log:",L):(I===""||W==="")&&(he=!1);he&&(w.diagnostics={runnable:K,programLog:L,vertexShader:{log:I,prefix:E},fragmentShader:{log:W,prefix:u}})}s.deleteShader(A),s.deleteShader(M),d=new dr(s,_),b=Cm(s,_)}let d;this.getUniforms=function(){return d===void 0&&S(this),d};let b;this.getAttributes=function(){return b===void 0&&S(this),b};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(_,vm)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=M,this}let Hm=0;class km{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Vm(e),t.set(e,n)),n}}class Vm{constructor(e){this.id=Hm++,this.code=e,this.usedTimes=0}}function Wm(i){return i===Mi||i===pr||i===mr}function Xm(i,e,t,n,s,r){const a=new oo,o=new km,c=new Set,l=[],p=new Map,m=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(d){return c.add(d),d===0?"uv":`uv${d}`}function _(d,b,U,w,P,F){const H=w.fog,L=P.geometry,I=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?w.environment:null,W=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,K=e.get(d.envMap||I,W),he=h[d.type];let Z=n.precision;d.precision!==null&&(Z=n.getMaxPrecision(d.precision),Z!==d.precision&&Ze("WebGLProgram.getParameters:",d.precision,"not supported, using",Z,"instead."));const se=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ae=se!==void 0?se.length:0;let fe=0;L.morphAttributes.position!==void 0&&(fe=1),L.morphAttributes.normal!==void 0&&(fe=2),L.morphAttributes.color!==void 0&&(fe=3);let Le,ee,Me,Re;if(he){const Ce=Pn[he];Le=Ce.vertexShader,ee=Ce.fragmentShader}else{Le=d.vertexShader,ee=d.fragmentShader;const Ce=o.getVertexShaderStage(d),pt=o.getFragmentShaderStage(d);o.update(d,Ce,pt),Me=Ce.id,Re=pt.id}const Ee=i.getRenderTarget(),Ae=i.state.buffers.depth.getReversed(),ke=P.isInstancedMesh===!0,Mt=P.isBatchedMesh===!0,Be=!!d.map,at=!!d.matcap,ut=!!K,et=ut&&K.isPMREMTexture===!0,we=!!d.aoMap,Ne=!!d.lightMap,nt=!!d.bumpMap&&d.wireframe===!1,Ve=!!d.normalMap,Ge=!!d.displacementMap,dt=!!d.emissiveMap,wt=!!d.metalnessMap,St=!!d.roughnessMap,Nt=d.anisotropy>0,z=d.clearcoat>0,Xe=d.diffuseRoughness>0,ft=d.dispersion>0,lt=d.retroreflectivity>0,pe=d.iridescence>0,ht=d.sheen>0,He=d.transmission>0,qe=Nt&&!!d.anisotropyMap,D=z&&!!d.clearcoatMap,y=z&&!!d.clearcoatNormalMap,q=z&&!!d.clearcoatRoughnessMap,de=Xe&&!!d.diffuseRoughnessMap,re=pe&&!!d.iridescenceMap,xe=pe&&!!d.iridescenceThicknessMap,ye=ht&&!!d.sheenColorMap,ne=ht&&!!d.sheenRoughnessMap,ie=!!d.specularMap,me=!!d.specularColorMap,O=!!d.specularIntensityMap,te=He&&!!d.transmissionMap,Q=He&&!!d.thicknessMap,ge=!!d.gradientMap,_e=!!d.alphaMap,ve=d.alphaTest>0,Ue=!!d.alphaHash,ze=!!d.extensions;let ue=qn;d.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Fe=et?K.isCompressedCubeTexture?K.image[0].mipmaps:K.mipmaps:null,Ye={shaderID:he,shaderType:d.type,shaderName:d.name,vertexShader:Le,fragmentShader:ee,defines:d.defines,customVertexShaderID:Me,customFragmentShaderID:Re,isRawShaderMaterial:d.isRawShaderMaterial===!0,glslVersion:d.glslVersion,precision:Z,batching:Mt,batchingColor:Mt&&P._colorsTexture!==null,instancing:ke,instancingColor:ke&&P.instanceColor!==null,instancingMorph:ke&&P.morphTexture!==null,outputColorSpace:Ee===null?i.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!d.alphaToCoverage,map:Be,matcap:at,envMap:ut,envMapMode:ut&&K.mapping,envMapPMREM:et,envMapMaxLod:et?Fe.length-1:null,envMapSize:et?Fe[0].width:null,aoMap:we,lightMap:Ne,bumpMap:nt,normalMap:Ve,displacementMap:Ge,emissiveMap:dt,normalMapObjectSpace:Ve&&d.normalMapType===du,normalMapTangentSpace:Ve&&d.normalMapType===Wa,packedNormalMap:Ve&&d.normalMapType===Wa&&Wm(d.normalMap.format),metalnessMap:wt,roughnessMap:St,anisotropy:Nt,anisotropyMap:qe,clearcoat:z,clearcoatMap:D,clearcoatNormalMap:y,clearcoatRoughnessMap:q,diffuseRoughness:Xe,diffuseRoughnessMap:de,dispersion:ft,retroreflection:lt,iridescence:pe,iridescenceMap:re,iridescenceThicknessMap:xe,sheen:ht,sheenColorMap:ye,sheenRoughnessMap:ne,specularMap:ie,specularColorMap:me,specularIntensityMap:O,transmission:He,transmissionMap:te,thicknessMap:Q,gradientMap:ge,opaque:d.transparent===!1&&d.blending===gs&&d.alphaToCoverage===!1,alphaMap:_e,alphaTest:ve,alphaHash:Ue,combine:d.combine,mapUv:Be&&g(d.map.channel),aoMapUv:we&&g(d.aoMap.channel),lightMapUv:Ne&&g(d.lightMap.channel),bumpMapUv:nt&&g(d.bumpMap.channel),normalMapUv:Ve&&g(d.normalMap.channel),displacementMapUv:Ge&&g(d.displacementMap.channel),emissiveMapUv:dt&&g(d.emissiveMap.channel),metalnessMapUv:wt&&g(d.metalnessMap.channel),roughnessMapUv:St&&g(d.roughnessMap.channel),anisotropyMapUv:qe&&g(d.anisotropyMap.channel),clearcoatMapUv:D&&g(d.clearcoatMap.channel),clearcoatNormalMapUv:y&&g(d.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&g(d.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:de&&g(d.diffuseRoughnessMap.channel),iridescenceMapUv:re&&g(d.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&g(d.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&g(d.sheenColorMap.channel),sheenRoughnessMapUv:ne&&g(d.sheenRoughnessMap.channel),specularMapUv:ie&&g(d.specularMap.channel),specularColorMapUv:me&&g(d.specularColorMap.channel),specularIntensityMapUv:O&&g(d.specularIntensityMap.channel),transmissionMapUv:te&&g(d.transmissionMap.channel),thicknessMapUv:Q&&g(d.thicknessMap.channel),alphaMapUv:_e&&g(d.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ve||Nt),vertexNormals:!!L.attributes.normal,vertexColors:d.vertexColors,vertexAlphas:d.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!L.attributes.uv&&(Be||_e),fog:!!H,useFog:d.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:d.wireframe===!1&&(d.flatShading===!0||L.attributes.normal===void 0&&Ve===!1&&(d.isMeshLambertMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isMeshPhysicalMaterial)),sizeAttenuation:d.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:Ae,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:fe,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:F.filter(Ce=>Ce.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:d.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:Be&&d.map.isVideoTexture===!0&&ot.getTransfer(d.map.colorSpace)===vt,decodeVideoTextureEmissive:dt&&d.emissiveMap.isVideoTexture===!0&&ot.getTransfer(d.emissiveMap.colorSpace)===vt,premultipliedAlpha:d.premultipliedAlpha,doubleSided:d.side===Jt,flipSided:d.side===rn,useDepthPacking:d.depthPacking>=0,depthPacking:d.depthPacking||0,index0AttributeName:d.index0AttributeName,extensionClipCullDistance:ze&&d.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&d.extensions.multiDraw===!0||Mt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:d.customProgramCacheKey()};return Ye.vertexUv1s=c.has(1),Ye.vertexUv2s=c.has(2),Ye.vertexUv3s=c.has(3),c.clear(),Ye}function E(d){const b=[];if(d.shaderID?b.push(d.shaderID):(b.push(d.customVertexShaderID),b.push(d.customFragmentShaderID)),d.defines!==void 0)for(const U in d.defines)b.push(U),b.push(d.defines[U]);return d.isRawShaderMaterial===!1&&(u(b,d),f(b,d),b.push(i.outputColorSpace)),b.push(d.customProgramCacheKey),b.join()}function u(d,b){d.push(b.precision),d.push(b.outputColorSpace),d.push(b.envMapMode),d.push(b.envMapPMREM),d.push(b.envMapMaxLod),d.push(b.envMapSize),d.push(b.mapUv),d.push(b.alphaMapUv),d.push(b.lightMapUv),d.push(b.aoMapUv),d.push(b.bumpMapUv),d.push(b.normalMapUv),d.push(b.displacementMapUv),d.push(b.emissiveMapUv),d.push(b.metalnessMapUv),d.push(b.roughnessMapUv),d.push(b.anisotropyMapUv),d.push(b.clearcoatMapUv),d.push(b.clearcoatNormalMapUv),d.push(b.clearcoatRoughnessMapUv),d.push(b.diffuseRoughnessMapUv),d.push(b.iridescenceMapUv),d.push(b.iridescenceThicknessMapUv),d.push(b.sheenColorMapUv),d.push(b.sheenRoughnessMapUv),d.push(b.specularMapUv),d.push(b.specularColorMapUv),d.push(b.specularIntensityMapUv),d.push(b.transmissionMapUv),d.push(b.thicknessMapUv),d.push(b.combine),d.push(b.fogExp2),d.push(b.sizeAttenuation),d.push(b.morphTargetsCount),d.push(b.numSunLights),d.push(b.numDirLights),d.push(b.numPointLights),d.push(b.numSpotLights),d.push(b.numSpotLightMaps),d.push(b.numHemiLights),d.push(b.numRectAreaLights),d.push(b.numSunLightShadows),d.push(b.numDirLightShadows),d.push(b.numPointLightShadows),d.push(b.numSpotLightShadows),d.push(b.numSpotLightShadowsWithMaps),d.push(b.numLightProbes),d.push(b.numLightProbeGrids),d.push(b.shadowMapType),d.push(b.toneMapping),d.push(b.numClippingPlanes),d.push(b.numClipIntersection),d.push(b.depthPacking)}function f(d,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),d.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),d.push(a.mask)}function x(d){const b=h[d.type];let U;if(b){const w=Pn[b];U=dh.clone(w.uniforms)}else U=d.uniforms;return U}function C(d,b){let U=p.get(b);return U!==void 0?++U.usedTimes:(U=new Gm(i,b,d,s),l.push(U),p.set(b,U)),U}function A(d){if(--d.usedTimes===0){const b=l.indexOf(d);l[b]=l[l.length-1],l.pop(),p.delete(d.cacheKey),d.destroy()}}function M(d){o.remove(d)}function S(){o.dispose()}return{getParameters:_,getProgramCacheKey:E,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:M,programs:l,dispose:S}}function qm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ym(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function bl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Tl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function o(h,g,_,E,u,f){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:g,material:_,materialVariant:a(h),groupOrder:E,renderOrder:h.renderOrder,z:u,group:f},i[e]=x):(x.id=h.id,x.object=h,x.geometry=g,x.material=_,x.materialVariant=a(h),x.groupOrder=E,x.renderOrder=h.renderOrder,x.z=u,x.group=f),e++,x}function c(h,g,_,E,u,f,x){x.reversedDepth===!0&&(u=-u);const C=o(h,g,_,E,u,f);_.transmission>0?n.push(C):_.transparent===!0?s.push(C):t.push(C)}function l(h,g,_,E,u,f){const x=o(h,g,_,E,u,f);_.transmission>0?n.unshift(x):_.transparent===!0?s.unshift(x):t.unshift(x)}function p(h,g){t.length>1&&t.sort(h||Ym),n.length>1&&n.sort(g||bl),s.length>1&&s.sort(g||bl)}function m(){for(let h=e,g=i.length;h<g;h++){const _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:m,sort:p}}function Zm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Tl,i.set(n,[a])):s>=r.length?(a=new Tl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Km(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new G,color:new tt};break;case"SpotLight":t={position:new G,direction:new G,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function $m(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Jm=0;function Qm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jm(i){const e=new Km,t=$m(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);const s=new G,r=new ct,a=new ct;function o(l){let p=0,m=0,h=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let g=0,_=0,E=0,u=0,f=0,x=0,C=0,A=0,M=0,S=0,d=0,b=0,U=0,w=0;l.sort(Qm);for(let F=0,H=l.length;F<H;F++){const L=l[F],I=L.color,W=L.intensity,K=L.distance;let he=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Mi?he=L.shadow.map.texture:he=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)p+=I.r*W,m+=I.g*W,h+=I.b*W;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(L.sh.coefficients[Z],W);w++}else if(L.isSunLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const se=L.shadow,ae=t.get(L);ae.shadowIntensity=se.intensity,ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),n.sunShadow[_]=ae,n.sunShadowMap[_]=he;const fe=se.getViewportCount();for(let Le=0;Le<fe;Le++)n.sunShadowMatrix[E+Le]=se.getMatrix(Le),n.sunShadowCascade[E+Le]=se._cascadeData[Le];E+=fe,_++}n.sun[g]=Z,g++}else if(L.isDirectionalLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const se=L.shadow,ae=t.get(L);ae.shadowIntensity=se.intensity,ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.directionalShadow[u]=ae,n.directionalShadowMap[u]=he,n.directionalShadowMatrix[u]=L.shadow.matrix,M++}n.directional[u]=Z,u++}else if(L.isSpotLight){const Z=e.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(I).multiplyScalar(W),Z.distance=K,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,n.spot[x]=Z;const se=L.shadow;if(L.map&&(n.spotLightMap[b]=L.map,b++,se.updateMatrices(L),L.castShadow&&U++),n.spotLightMatrix[x]=se.matrix,L.castShadow){const ae=t.get(L);ae.shadowIntensity=se.intensity,ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,n.spotShadow[x]=ae,n.spotShadowMap[x]=he,d++}x++}else if(L.isRectAreaLight){const Z=e.get(L);Z.color.copy(I).multiplyScalar(W),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),n.rectArea[C]=Z,C++}else if(L.isPointLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){const se=L.shadow,ae=t.get(L);ae.shadowIntensity=se.intensity,ae.shadowBias=se.bias,ae.shadowNormalBias=se.normalBias,ae.shadowRadius=se.radius,ae.shadowMapSize=se.mapSize,ae.shadowCameraNear=se.camera.near,ae.shadowCameraFar=se.camera.far,n.pointShadow[f]=ae,n.pointShadowMap[f]=he,n.pointShadowMatrix[f]=L.shadow.matrix,S++}n.point[f]=Z,f++}else if(L.isHemisphereLight){const Z=e.get(L);Z.skyColor.copy(L.color).multiplyScalar(W),Z.groundColor.copy(L.groundColor).multiplyScalar(W),n.hemi[A]=Z,A++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=h;const P=n.hash;(P.sunLength!==g||P.directionalLength!==u||P.pointLength!==f||P.spotLength!==x||P.rectAreaLength!==C||P.hemiLength!==A||P.numSunShadows!==_||P.numDirectionalShadows!==M||P.numPointShadows!==S||P.numSpotShadows!==d||P.numSpotMaps!==b||P.numLightProbes!==w)&&(n.sun.length=g,n.directional.length=u,n.spot.length=x,n.rectArea.length=C,n.point.length=f,n.hemi.length=A,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=E,n.sunShadowCascade.length=E,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=d,n.spotShadowMap.length=d,n.spotLightMatrix.length=d+b-U,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=w,P.sunLength=g,P.directionalLength=u,P.pointLength=f,P.spotLength=x,P.rectAreaLength=C,P.hemiLength=A,P.numSunShadows=_,P.numDirectionalShadows=M,P.numPointShadows=S,P.numSpotShadows=d,P.numSpotMaps=b,P.numLightProbes=w,n.version=Jm++)}function c(l,p){let m=0,h=0,g=0,_=0,E=0,u=0;const f=p.matrixWorldInverse;for(let x=0,C=l.length;x<C;x++){const A=l[x];if(A.isSunLight){const M=n.sun[m];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(f),m++}else if(A.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),h++}else if(A.isSpotLight){const M=n.spot[_];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),_++}else if(A.isRectAreaLight){const M=n.rectArea[E];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(f),a.identity(),r.copy(A.matrixWorld),r.premultiply(f),a.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),E++}else if(A.isPointLight){const M=n.point[g];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(f),g++}else if(A.isHemisphereLight){const M=n.hemi[u];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(f),u++}}}return{setup:o,setupView:c,state:n}}function Al(i){const e=new jm(i),t=[],n=[],s=[];function r(m){p.camera=m,t.length=0,n.length=0,s.length=0}function a(m){m.isLightProbeGrid?s.push(m):t.push(m)}function o(m){n.push(m)}function c(){e.setup(t),s.sort((m,h)=>m.priority-h.priority||m.id-h.id)}function l(m){e.setupView(t,m)}const p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function eg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Al(i),e.set(s,[o])):r>=a.length?(o=new Al(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const tg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ng=`uniform sampler2D shadow_pass;
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
}`,ig=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],sg=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],wl=new ct,ds=new G,na=new G;function rg(i,e,t){let n=new Ts;const s=new We,r=new We,a=new Dt,o=new gh,c=new _h,l={},p=t.maxTextureSize,m={[vi]:rn,[rn]:vi,[Jt]:Jt},h=new Si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:tg,fragmentShader:ng}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const _=new Xt;_.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new gt(_,h),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ar;let f=this.type;this.render=function(S,d,b){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||S.length===0)return;this.type===Vc&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ar);const U=i.getRenderTarget(),w=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Ki),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=f!==this.type;H&&d.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(I=>I.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,I=S.length;L<I;L++){const W=S[L],K=W.shadow;if(K===void 0){Ze("WebGLShadowMap:",W,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const he=K.getFrameExtents();s.multiply(he),r.copy(K.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(r.x=Math.floor(p/he.x),s.x=r.x*he.x,K.mapSize.x=r.x),s.y>p&&(r.y=Math.floor(p/he.y),s.y=r.y*he.y,K.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=Z,K.map===null||H===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===ps){if(W.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Ln(s.x,s.y,{format:Mi,type:Nn,minFilter:sn,magFilter:sn,generateMipmaps:!1}),K.map.texture.name=W.name+".shadowMap",K.map.depthTexture=new ji(s.x,s.y,yn),K.map.depthTexture.name=W.name+".shadowMapDepth",K.map.depthTexture.format=si,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt}else W.isPointLight?(K.map=new fo(s.x),K.map.depthTexture=new hc(s.x,In)):(K.map=new Ln(s.x,s.y),K.map.depthTexture=new ji(s.x,s.y,In)),K.map.depthTexture.name=W.name+".shadowMap",K.map.depthTexture.format=si,this.type===ar?(K.map.depthTexture.compareFunction=Z?Kl:Zl,K.map.depthTexture.minFilter=sn,K.map.depthTexture.magFilter=sn):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Wt,K.map.depthTexture.magFilter=Wt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);const se=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();W.isPointLight!==!0&&K.updateMatrices(W,b);const ae=(K.camera.layers.mask&4294967294)!==0?K.camera.layers:b.layers;for(let fe=0;fe<se;fe++){const Le=K.getCamera(fe);if(W.isPointLight){const ee=K.camera,Me=K.matrix,Re=W.distance||ee.far;Re!==ee.far&&(ee.far=Re,ee.updateProjectionMatrix()),ds.setFromMatrixPosition(W.matrixWorld),ee.position.copy(ds),na.copy(ee.position),na.add(ig[fe]),ee.up.copy(sg[fe]),ee.lookAt(na),ee.updateMatrixWorld(),Me.makeTranslation(-ds.x,-ds.y,-ds.z),wl.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),K._frustum.setFromProjectionMatrix(wl,ee.coordinateSystem,ee.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(K.map),i.clear());const ee=K.getViewport(fe);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),F.viewport(a)}n=K.getFrustum(fe),A(d,b,Le,W,ae,this.type)}K.isPointLightShadow!==!0&&this.type===ps&&x(K,b),K.needsUpdate=!1}f=this.type,u.needsUpdate=!1,i.setRenderTarget(U,w,P)};function x(S,d){const b=e.update(E);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,g.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),S.mapPass===null?S.mapPass=new Ln(s.x,s.y,{format:Mi,type:Nn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(d,null,b,h,E,null),g.uniforms.shadow_pass.value=S.mapPass.texture,g.uniforms.resolution.value.set(S.map.width,S.map.height),g.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(d,null,b,g,E,null)}function C(S,d,b,U){let w=null;const P=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)w=P;else if(w=b.isPointLight===!0?c:o,i.localClippingEnabled&&d.clipShadows===!0&&Array.isArray(d.clippingPlanes)&&d.clippingPlanes.length!==0||d.displacementMap&&d.displacementScale!==0||d.alphaMap&&d.alphaTest>0||d.map&&d.alphaTest>0||d.alphaToCoverage===!0){const F=w.uuid,H=d.uuid;let L=l[F];L===void 0&&(L={},l[F]=L);let I=L[H];I===void 0&&(I=w.clone(),L[H]=I,d.addEventListener("dispose",M)),w=I}if(w.visible=d.visible,w.wireframe=d.wireframe,U===ps?w.side=d.shadowSide!==null?d.shadowSide:d.side:w.side=d.shadowSide!==null?d.shadowSide:m[d.side],w.alphaMap=d.alphaMap,w.alphaTest=d.alphaToCoverage===!0?.5:d.alphaTest,w.map=d.map,w.clipShadows=d.clipShadows,w.clippingPlanes=d.clippingPlanes,w.clipIntersection=d.clipIntersection,w.displacementMap=d.displacementMap,w.displacementScale=d.displacementScale,w.displacementBias=d.displacementBias,w.wireframeLinewidth=d.wireframeLinewidth,w.linewidth=d.linewidth,b.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const F=i.properties.get(w);F.light=b}return w}function A(S,d,b,U,w,P){if(S.visible===!1)return;if(S.layers.test(w)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===ps)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);const L=e.update(S),I=S.material;if(Array.isArray(I)){const W=L.groups;for(let K=0,he=W.length;K<he;K++){const Z=W[K],se=I[Z.materialIndex];if(se&&se.visible){const ae=C(S,se,U,P);S.onBeforeShadow(i,S,d,b,L,ae,Z),i.renderBufferDirect(b,null,L,ae,S,Z),S.onAfterShadow(i,S,d,b,L,ae,Z)}}}else if(I.visible){const W=C(S,I,U,P);S.onBeforeShadow(i,S,d,b,L,W,null),i.renderBufferDirect(b,null,L,W,S,null),S.onAfterShadow(i,S,d,b,L,W,null)}}const H=S.children;for(let L=0,I=H.length;L<I;L++)A(H[L],d,b,U,w,P)}function M(S){S.target.removeEventListener("dispose",M);for(const b in l){const U=l[b],w=S.target.uuid;w in U&&(U[w].dispose(),delete U[w])}}}function ag(i,e){function t(){let O=!1;const te=new Dt;let Q=null;const ge=new Dt(0,0,0,0);return{setMask:function(_e){Q!==_e&&!O&&(i.colorMask(_e,_e,_e,_e),Q=_e)},setLocked:function(_e){O=_e},setClear:function(_e,ve,Ue,ze,ue){ue===!0&&(_e*=ze,ve*=ze,Ue*=ze),te.set(_e,ve,Ue,ze),ge.equals(te)===!1&&(i.clearColor(_e,ve,Ue,ze),ge.copy(te))},reset:function(){O=!1,Q=null,ge.set(-1,0,0,0)}}}function n(){let O=!1,te=!1,Q=null,ge=null,_e=null;return{setReversed:function(ve){if(te!==ve){const Ue=e.get("EXT_clip_control");ve?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),te=ve;const ze=_e;_e=null,this.setClear(ze)}},getReversed:function(){return te},setTest:function(ve){ve?Ae(i.DEPTH_TEST):ke(i.DEPTH_TEST)},setMask:function(ve){Q!==ve&&!O&&(i.depthMask(ve),Q=ve)},setFunc:function(ve){if(te&&(ve=Eu[ve]),ge!==ve){switch(ve){case ra:i.depthFunc(i.NEVER);break;case aa:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case la:i.depthFunc(i.EQUAL);break;case ca:i.depthFunc(i.GEQUAL);break;case ua:i.depthFunc(i.GREATER);break;case ha:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=ve}},setLocked:function(ve){O=ve},setClear:function(ve){_e!==ve&&(_e=ve,te&&(ve=1-ve),i.clearDepth(ve))},reset:function(){O=!1,Q=null,ge=null,_e=null,te=!1}}}function s(){let O=!1,te=null,Q=null,ge=null,_e=null,ve=null,Ue=null,ze=null,ue=null;return{setTest:function(Fe){O||(Fe?Ae(i.STENCIL_TEST):ke(i.STENCIL_TEST))},setMask:function(Fe){te!==Fe&&!O&&(i.stencilMask(Fe),te=Fe)},setFunc:function(Fe,Ye,Ce){(Q!==Fe||ge!==Ye||_e!==Ce)&&(i.stencilFunc(Fe,Ye,Ce),Q=Fe,ge=Ye,_e=Ce)},setOp:function(Fe,Ye,Ce){(ve!==Fe||Ue!==Ye||ze!==Ce)&&(i.stencilOp(Fe,Ye,Ce),ve=Fe,Ue=Ye,ze=Ce)},setLocked:function(Fe){O=Fe},setClear:function(Fe){ue!==Fe&&(i.clearStencil(Fe),ue=Fe)},reset:function(){O=!1,te=null,Q=null,ge=null,_e=null,ve=null,Ue=null,ze=null,ue=null}}}const r=new t,a=new n,o=new s;let c={};const l=new WeakMap;let p={},m={},h={},g=new WeakMap,_=[],E=null,u=!1,f=null,x=null,C=null,A=null,M=null,S=null,d=null,b=new tt(0,0,0),U=0,w=!1,P=null,F=null,H=null,L=null,I=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,he=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(Z)[1]),K=he>=1):Z.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),K=he>=2);let se=null,ae={};const fe=i.getParameter(i.SCISSOR_BOX),Le=i.getParameter(i.VIEWPORT),ee=new Dt().fromArray(fe),Me=new Dt().fromArray(Le);function Re(O,te,Q,ge){const _e=new Uint8Array(4),ve=i.createTexture();i.bindTexture(O,ve),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<Q;Ue++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(te,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(te+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return ve}const Ee={};Ee[i.TEXTURE_2D]=Re(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=Re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=Re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=Re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Ae(i.DEPTH_TEST),a.setFunc(Ms),nt(!1),Ve(vo),Ae(i.CULL_FACE),we(Ki);function Ae(O){p[O]!==!0&&(i.enable(O),p[O]=!0)}function ke(O){p[O]!==!1&&(i.disable(O),p[O]=!1)}function Mt(O,te){return h[O]!==te?(i.bindFramebuffer(O,te),h[O]=te,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=te),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=te),!0):!1}function Be(O,te){let Q=_,ge=!1;if(O){Q=g.get(te),Q===void 0&&(Q=[],g.set(te,Q));const _e=O.textures;if(Q.length!==_e.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,Ue=_e.length;ve<Ue;ve++)Q[ve]=i.COLOR_ATTACHMENT0+ve;Q.length=_e.length,ge=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,ge=!0);ge&&i.drawBuffers(Q)}function at(O){return E!==O?(i.useProgram(O),E=O,!0):!1}const ut={[Xi]:i.FUNC_ADD,[Xc]:i.FUNC_SUBTRACT,[qc]:i.FUNC_REVERSE_SUBTRACT};ut[Yc]=i.MIN,ut[Zc]=i.MAX;const et={[Kc]:i.ZERO,[$c]:i.ONE,[Jc]:i.SRC_COLOR,[Ll]:i.SRC_ALPHA,[iu]:i.SRC_ALPHA_SATURATE,[tu]:i.DST_COLOR,[jc]:i.DST_ALPHA,[Qc]:i.ONE_MINUS_SRC_COLOR,[Il]:i.ONE_MINUS_SRC_ALPHA,[nu]:i.ONE_MINUS_DST_COLOR,[eu]:i.ONE_MINUS_DST_ALPHA,[su]:i.CONSTANT_COLOR,[ru]:i.ONE_MINUS_CONSTANT_COLOR,[au]:i.CONSTANT_ALPHA,[ou]:i.ONE_MINUS_CONSTANT_ALPHA};function we(O,te,Q,ge,_e,ve,Ue,ze,ue,Fe){if(O===Ki){u===!0&&(ke(i.BLEND),u=!1);return}if(u===!1&&(Ae(i.BLEND),u=!0),O!==Wc){if(O!==f||Fe!==w){if((x!==Xi||M!==Xi)&&(i.blendEquation(i.FUNC_ADD),x=Xi,M=Xi),Fe)switch(O){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFunc(i.ONE,i.ONE);break;case Mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case So:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:mt("WebGLState: Invalid blending: ",O);break}else switch(O){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mo:mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case So:mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:mt("WebGLState: Invalid blending: ",O);break}C=null,A=null,S=null,d=null,b.set(0,0,0),U=0,f=O,w=Fe}return}_e=_e||te,ve=ve||Q,Ue=Ue||ge,(te!==x||_e!==M)&&(i.blendEquationSeparate(ut[te],ut[_e]),x=te,M=_e),(Q!==C||ge!==A||ve!==S||Ue!==d)&&(i.blendFuncSeparate(et[Q],et[ge],et[ve],et[Ue]),C=Q,A=ge,S=ve,d=Ue),(ze.equals(b)===!1||ue!==U)&&(i.blendColor(ze.r,ze.g,ze.b,ue),b.copy(ze),U=ue),f=O,w=!1}function Ne(O,te){O.side===Jt?ke(i.CULL_FACE):Ae(i.CULL_FACE);let Q=O.side===rn;te&&(Q=!Q),nt(Q),O.blending===gs&&O.transparent===!1?we(Ki):we(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const ge=O.stencilWrite;o.setTest(ge),ge&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),dt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Ae(i.SAMPLE_ALPHA_TO_COVERAGE):ke(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(O){P!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),P=O)}function Ve(O){O!==Hc?(Ae(i.CULL_FACE),O!==F&&(O===vo?i.cullFace(i.BACK):O===kc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ke(i.CULL_FACE),F=O}function Ge(O){O!==H&&(K&&i.lineWidth(O),H=O)}function dt(O,te,Q){O?(Ae(i.POLYGON_OFFSET_FILL),(L!==te||I!==Q)&&(L=te,I=Q,a.getReversed()&&(te=-te,Q=-Q),i.polygonOffset(te,Q))):ke(i.POLYGON_OFFSET_FILL)}function wt(O){O?Ae(i.SCISSOR_TEST):ke(i.SCISSOR_TEST)}function St(O){O===void 0&&(O=i.TEXTURE0+W-1),se!==O&&(i.activeTexture(O),se=O)}function Nt(O,te,Q){Q===void 0&&(se===null?Q=i.TEXTURE0+W-1:Q=se);let ge=ae[Q];ge===void 0&&(ge={type:void 0,texture:void 0},ae[Q]=ge),(ge.type!==O||ge.texture!==te)&&(se!==Q&&(i.activeTexture(Q),se=Q),i.bindTexture(O,te||Ee[O]),ge.type=O,ge.texture=te)}function z(){const O=ae[se];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Xe(){try{i.compressedTexImage2D(...arguments)}catch(O){mt("WebGLState:",O)}}function ft(){try{i.compressedTexImage3D(...arguments)}catch(O){mt("WebGLState:",O)}}function lt(){try{i.texSubImage2D(...arguments)}catch(O){mt("WebGLState:",O)}}function pe(){try{i.texSubImage3D(...arguments)}catch(O){mt("WebGLState:",O)}}function ht(){try{i.compressedTexSubImage2D(...arguments)}catch(O){mt("WebGLState:",O)}}function He(){try{i.compressedTexSubImage3D(...arguments)}catch(O){mt("WebGLState:",O)}}function qe(){try{i.texStorage2D(...arguments)}catch(O){mt("WebGLState:",O)}}function D(){try{i.texStorage3D(...arguments)}catch(O){mt("WebGLState:",O)}}function y(){try{i.texImage2D(...arguments)}catch(O){mt("WebGLState:",O)}}function q(){try{i.texImage3D(...arguments)}catch(O){mt("WebGLState:",O)}}function de(O){return m[O]!==void 0?m[O]:i.getParameter(O)}function re(O,te){m[O]!==te&&(i.pixelStorei(O,te),m[O]=te)}function xe(O){ee.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ee.copy(O))}function ye(O){Me.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Me.copy(O))}function ne(O,te){let Q=l.get(te);Q===void 0&&(Q=new WeakMap,l.set(te,Q));let ge=Q.get(O);ge===void 0&&(ge=i.getUniformBlockIndex(te,O.name),i.uniformBlockBinding(te,ge,ge),Q.set(O,ge))}function ie(O,te,Q){const _e=l.get(te).get(O);c[_e]!==Q&&(i.bindBufferBase(i.UNIFORM_BUFFER,_e,Q),c[_e]=Q)}function me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),p={},m={},se=null,ae={},h={},c={},g=new WeakMap,_=[],E=null,u=!1,f=null,x=null,C=null,A=null,M=null,S=null,d=null,b=new tt(0,0,0),U=0,w=!1,P=null,F=null,H=null,L=null,I=null,ee.set(0,0,i.canvas.width,i.canvas.height),Me.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Ae,disable:ke,bindFramebuffer:Mt,drawBuffers:Be,useProgram:at,setBlending:we,setMaterial:Ne,setFlipSided:nt,setCullFace:Ve,setLineWidth:Ge,setPolygonOffset:dt,setScissorTest:wt,activeTexture:St,bindTexture:Nt,unbindTexture:z,compressedTexImage2D:Xe,compressedTexImage3D:ft,texImage2D:y,texImage3D:q,pixelStorei:re,getParameter:de,updateUBOMapping:ne,uniformBlockBinding:ie,texStorage2D:qe,texStorage3D:D,texSubImage2D:lt,texSubImage3D:pe,compressedTexSubImage2D:ht,compressedTexSubImage3D:He,scissor:xe,viewport:ye,reset:me}}function og(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,p=new WeakMap,m=new Set;let h;const g=new WeakMap,_=new Set,E=new FinalizationRegistry(D=>_.delete(D));let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(D,y){return u?new OffscreenCanvas(D,y):xr("canvas")}function x(D,y,q){let de=1;const re=qe(D);if((re.width>q||re.height>q)&&(de=q/Math.max(re.width,re.height)),de<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const xe=Math.floor(de*re.width),ye=Math.floor(de*re.height);h===void 0&&(h=f(xe,ye));const ne=y?f(xe,ye):h;return ne.width=xe,ne.height=ye,ne.getContext("2d").drawImage(D,0,0,xe,ye),Ze("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+xe+"x"+ye+")."),ne}else return"data"in D&&Ze("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),D;return D}function C(D){return D.generateMipmaps}function A(D){i.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(D,y,q,de,re,xe=!1){if(D!==null){if(i[D]!==void 0)return i[D];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ye;de&&(ye=e.get("EXT_texture_norm16"),ye||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=y;if(y===i.RED&&(q===i.FLOAT&&(ne=i.R32F),q===i.HALF_FLOAT&&(ne=i.R16F),q===i.UNSIGNED_BYTE&&(ne=i.R8),q===i.UNSIGNED_SHORT&&ye&&(ne=ye.R16_EXT),q===i.SHORT&&ye&&(ne=ye.R16_SNORM_EXT)),y===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ne=i.R8UI),q===i.UNSIGNED_SHORT&&(ne=i.R16UI),q===i.UNSIGNED_INT&&(ne=i.R32UI),q===i.BYTE&&(ne=i.R8I),q===i.SHORT&&(ne=i.R16I),q===i.INT&&(ne=i.R32I)),y===i.RG&&(q===i.FLOAT&&(ne=i.RG32F),q===i.HALF_FLOAT&&(ne=i.RG16F),q===i.UNSIGNED_BYTE&&(ne=i.RG8),q===i.UNSIGNED_SHORT&&ye&&(ne=ye.RG16_EXT),q===i.SHORT&&ye&&(ne=ye.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ne=i.RG8UI),q===i.UNSIGNED_SHORT&&(ne=i.RG16UI),q===i.UNSIGNED_INT&&(ne=i.RG32UI),q===i.BYTE&&(ne=i.RG8I),q===i.SHORT&&(ne=i.RG16I),q===i.INT&&(ne=i.RG32I)),y===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),q===i.UNSIGNED_INT&&(ne=i.RGB32UI),q===i.BYTE&&(ne=i.RGB8I),q===i.SHORT&&(ne=i.RGB16I),q===i.INT&&(ne=i.RGB32I)),y===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),q===i.UNSIGNED_INT&&(ne=i.RGBA32UI),q===i.BYTE&&(ne=i.RGBA8I),q===i.SHORT&&(ne=i.RGBA16I),q===i.INT&&(ne=i.RGBA32I)),y===i.RGB&&(q===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGB16_EXT),q===i.SHORT&&ye&&(ne=ye.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),y===i.RGBA){const ie=xe?_r:ot.getTransfer(re);q===i.FLOAT&&(ne=i.RGBA32F),q===i.HALF_FLOAT&&(ne=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ne=ie===vt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGBA16_EXT),q===i.SHORT&&ye&&(ne=ye.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function d(D,y){let q;return D?y===null||y===In||y===Qi?q=i.DEPTH24_STENCIL8:y===yn?q=i.DEPTH32F_STENCIL8:y===ys&&(q=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===In||y===Qi?q=i.DEPTH_COMPONENT24:y===yn?q=i.DEPTH_COMPONENT32F:y===ys&&(q=i.DEPTH_COMPONENT16),q}function b(D,y){return C(D)===!0||D.isFramebufferTexture&&D.minFilter!==Wt&&D.minFilter!==sn?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function U(D){const y=new WeakRef(D);n.get(D).__ref=y,_.add(y),E.register(D,y,y)}function w(D){const y=n.get(D).__ref;y!==void 0&&(_.delete(y),E.unregister(y))}function P(D){H(D.target)}function F(D){L(D.target)}function H(D){D.removeEventListener("dispose",P),w(D),W(D),D.isVideoTexture&&p.delete(D),D.isHTMLTexture&&m.delete(D)}function L(D){D.removeEventListener("dispose",F),w(D),he(D)}function I(){for(const D of _){const y=D.deref();y!==void 0&&(y.isRenderTarget===!0?L(y):H(y))}_.clear(),m.clear()}function W(D){const y=n.get(D);if(y.__webglInit===void 0)return;const q=D.source,de=g.get(q);if(de){const re=de[y.__cacheKey];re.usedTimes--,re.usedTimes===0&&K(D),Object.keys(de).length===0&&g.delete(q)}n.remove(D)}function K(D){const y=n.get(D);i.deleteTexture(y.__webglTexture);const q=D.source,de=g.get(q);delete de[y.__cacheKey],a.memory.textures--}function he(D){const y=n.get(D);y.__depthDisposeCallback&&y.__depthDisposeCallback();const q=D.depthTexture;if(q&&q.renderTarget===D&&H(q),D.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(y.__webglFramebuffer[re]))for(let xe=0;xe<y.__webglFramebuffer[re].length;xe++)i.deleteFramebuffer(y.__webglFramebuffer[re][xe]);else i.deleteFramebuffer(y.__webglFramebuffer[re]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[re])}else{if(Array.isArray(y.__webglFramebuffer))for(let re=0;re<y.__webglFramebuffer.length;re++)i.deleteFramebuffer(y.__webglFramebuffer[re]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let re=0;re<y.__webglColorRenderbuffer.length;re++)y.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[re]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const de=D.textures;for(let re=0,xe=de.length;re<xe;re++){const ye=n.get(de[re]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),a.memory.textures--),n.remove(de[re])}n.remove(D)}let Z=0;function se(){Z=0}function ae(){return Z}function fe(D){Z=D}function Le(){const D=Z;return D>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),Z+=1,D}function ee(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.mipmapsAutoUpdate),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function Me(D,y){const q=n.get(D);if(D.isVideoTexture&&ht(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){const de=D.image;if(de===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(q,D,y);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+y)}function Re(D,y){const q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Ne(q,D,y);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+y)}function Ee(D,y){const q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Ne(q,D,y);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+y)}function Ae(D,y){const q=n.get(D);if(D.version>0&&q.__version!==D.version){nt(q,D,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+y)}const ke={[da]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[fa]:i.MIRRORED_REPEAT},Mt={[Wt]:i.NEAREST,[uu]:i.NEAREST_MIPMAP_NEAREST,[Ls]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[Dr]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},Be={[pu]:i.NEVER,[$l]:i.ALWAYS,[mu]:i.LESS,[Zl]:i.LEQUAL,[gu]:i.EQUAL,[Kl]:i.GEQUAL,[_u]:i.GREATER,[xu]:i.NOTEQUAL};function at(D,y){if(y.type===yn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===sn||y.magFilter===Dr||y.magFilter===Ls||y.magFilter===ti||y.minFilter===sn||y.minFilter===Dr||y.minFilter===Ls||y.minFilter===ti)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,ke[y.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,ke[y.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,ke[y.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Mt[y.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Mt[y.minFilter]),y.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,Be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Wt||y.minFilter!==Ls&&y.minFilter!==ti||y.type===yn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ut(D,y){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",P),U(y));const de=y.source;let re=g.get(de);re===void 0&&(re={},g.set(de,re));const xe=ee(y);if(xe!==D.__cacheKey){re[xe]===void 0&&(re[xe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),re[xe].usedTimes++;const ye=re[D.__cacheKey];ye!==void 0&&(re[D.__cacheKey].usedTimes--,ye.usedTimes===0&&K(y)),D.__cacheKey=xe,D.__webglTexture=re[xe].texture}return q}function et(D,y,q){return Math.floor(Math.floor(D/q)/y)}function we(D,y,q,de){const xe=D.updateRanges;if(xe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,q,de,y.data);else{xe.sort((O,te)=>O.start-te.start);let ye=0;for(let O=1;O<xe.length;O++){const te=xe[ye],Q=xe[O],ge=te.start+te.count,_e=et(Q.start,y.width,4),ve=et(te.start,y.width,4);Q.start<=ge+1&&_e===ve&&et(Q.start+Q.count-1,y.width,4)===_e?te.count=Math.max(te.count,Q.start+Q.count-te.start):(++ye,xe[ye]=Q)}xe.length=ye+1;const ne=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let O=0,te=xe.length;O<te;O++){const Q=xe[O],ge=Math.floor(Q.start/4),_e=Math.ceil(Q.count/4),ve=ge%y.width,Ue=Math.floor(ge/y.width),ze=_e,ue=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ue),t.texSubImage2D(i.TEXTURE_2D,0,ve,Ue,ze,ue,q,de,y.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ne),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function Ne(D,y,q){let de=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(de=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(de=i.TEXTURE_3D);const re=ut(D,y),xe=y.source;t.bindTexture(de,D.__webglTexture,i.TEXTURE0+q);const ye=n.get(xe);if(xe.version!==ye.__version||re===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ue=ot.getPrimaries(ot.workingColorSpace),Fe=y.colorSpace===ei?null:ot.getPrimaries(y.colorSpace),Ye=y.colorSpace===ei||ue===Fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ie=x(y.image,!1,s.maxTextureSize);ie=He(y,ie);const me=r.convert(y.format,y.colorSpace),O=r.convert(y.type);let te=S(y.internalFormat,me,O,y.normalized,y.colorSpace,y.isVideoTexture);at(de,y);let Q;const ge=y.mipmaps,_e=y.isVideoTexture!==!0,ve=ye.__version===void 0||re===!0,Ue=xe.dataReady,ze=b(y,ie);if(y.isDepthTexture)te=d(y.format===ni,y.type),ve&&(_e?t.texStorage2D(i.TEXTURE_2D,1,te,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,te,ie.width,ie.height,0,me,O,null));else if(y.isDataTexture)if(ge.length>0){_e&&ve&&t.texStorage2D(i.TEXTURE_2D,ze,te,ge[0].width,ge[0].height);for(let ue=0,Fe=ge.length;ue<Fe;ue++)Q=ge[ue],_e?Ue&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Q.width,Q.height,me,O,Q.data):t.texImage2D(i.TEXTURE_2D,ue,te,Q.width,Q.height,0,me,O,Q.data);y.generateMipmaps=!1}else _e?(ve&&t.texStorage2D(i.TEXTURE_2D,ze,te,ie.width,ie.height),Ue&&we(y,ie,me,O)):t.texImage2D(i.TEXTURE_2D,0,te,ie.width,ie.height,0,me,O,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){_e&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,te,ge[0].width,ge[0].height,ie.depth);for(let ue=0,Fe=ge.length;ue<Fe;ue++)if(Q=ge[ue],y.format!==Dn)if(me!==null)if(_e){if(Ue)if(y.layerUpdates.size>0){const Ye=al(Q.width,Q.height,y.format,y.type);for(const Ce of y.layerUpdates){const pt=Q.data.subarray(Ce*Ye/Q.data.BYTES_PER_ELEMENT,(Ce+1)*Ye/Q.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,Ce,Q.width,Q.height,1,me,pt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,Q.width,Q.height,ie.depth,me,Q.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,te,Q.width,Q.height,ie.depth,0,Q.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else _e?Ue&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,Q.width,Q.height,ie.depth,me,O,Q.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,te,Q.width,Q.height,ie.depth,0,me,O,Q.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{_e&&ve&&t.texStorage2D(i.TEXTURE_2D,ze,te,ge[0].width,ge[0].height);for(let ue=0,Fe=ge.length;ue<Fe;ue++)Q=ge[ue],y.format!==Dn?me!==null?_e?Ue&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,Q.width,Q.height,me,Q.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,te,Q.width,Q.height,0,Q.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_e?Ue&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Q.width,Q.height,me,O,Q.data):t.texImage2D(i.TEXTURE_2D,ue,te,Q.width,Q.height,0,me,O,Q.data)}else if(y.isDataArrayTexture)if(_e){if(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,te,ie.width,ie.height,ie.depth),Ue)if(y.layerUpdates.size>0){const ue=al(ie.width,ie.height,y.format,y.type);for(const Fe of y.layerUpdates){const Ye=ie.data.subarray(Fe*ue/ie.data.BYTES_PER_ELEMENT,(Fe+1)*ue/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Fe,ie.width,ie.height,1,me,O,Ye)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,me,O,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,te,ie.width,ie.height,ie.depth,0,me,O,ie.data);else if(y.isData3DTexture)_e?(ve&&t.texStorage3D(i.TEXTURE_3D,ze,te,ie.width,ie.height,ie.depth),Ue&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,me,O,ie.data)):t.texImage3D(i.TEXTURE_3D,0,te,ie.width,ie.height,ie.depth,0,me,O,ie.data);else if(y.isFramebufferTexture){if(ve)if(_e)t.texStorage2D(i.TEXTURE_2D,ze,te,ie.width,ie.height);else{let ue=ie.width,Fe=ie.height;for(let Ye=0;Ye<ze;Ye++)t.texImage2D(i.TEXTURE_2D,Ye,te,ue,Fe,0,me,O,null),ue>>=1,Fe>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const ue=i.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),ie.parentNode!==ue){ue.appendChild(ie),m.add(y),ue.onpaint=Fe=>{const Ye=Fe.changedElements;for(const Ce of m)Ye.includes(Ce.image)&&(Ce.needsUpdate=!0)},ue.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{const Ye=i.RGBA,Ce=i.RGBA,pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ye,Ce,pt,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ge.length>0){if(_e&&ve){const ue=qe(ge[0]);t.texStorage2D(i.TEXTURE_2D,ze,te,ue.width,ue.height)}for(let ue=0,Fe=ge.length;ue<Fe;ue++)Q=ge[ue],_e?Ue&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,me,O,Q):t.texImage2D(i.TEXTURE_2D,ue,te,me,O,Q);y.generateMipmaps=!1}else if(_e){if(ve){const ue=qe(ie);t.texStorage2D(i.TEXTURE_2D,ze,te,ue.width,ue.height)}Ue&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,O,ie)}else t.texImage2D(i.TEXTURE_2D,0,te,me,O,ie);C(y)&&y.mipmapsAutoUpdate===!0&&A(de),ye.__version=xe.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function nt(D,y,q){if(y.image.length!==6)return;const de=ut(D,y),re=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+q);const xe=n.get(re);if(re.version!==xe.__version||de===!0){t.activeTexture(i.TEXTURE0+q);const ye=ot.getPrimaries(ot.workingColorSpace),ne=y.colorSpace===ei?null:ot.getPrimaries(y.colorSpace),ie=y.colorSpace===ei||ye===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,O=y.image[0]&&y.image[0].isDataTexture,te=[];for(let Ce=0;Ce<6;Ce++)!me&&!O?te[Ce]=x(y.image[Ce],!0,s.maxCubemapSize):te[Ce]=O?y.image[Ce].image:y.image[Ce],te[Ce]=He(y,te[Ce]);const Q=te[0],ge=r.convert(y.format,y.colorSpace),_e=r.convert(y.type);let ve=S(y.internalFormat,ge,_e,y.normalized,y.colorSpace);const Ue=y.isVideoTexture!==!0,ze=xe.__version===void 0||de===!0,ue=re.dataReady;let Fe=b(y,Q);at(i.TEXTURE_CUBE_MAP,y);let Ye;if(y.isDepthTexture){if(ve=d(y.format===ni,y.type),ze)if(Ue)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,ve,Q.width,Q.height);else for(let Ce=0;Ce<6;Ce++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,ve,Q.width,Q.height,0,ge,_e,null)}else if(me){Ue&&ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Fe,ve,Q.width,Q.height);for(let Ce=0;Ce<6;Ce++){Ye=te[Ce].mipmaps;for(let pt=0;pt<Ye.length;pt++){const Lt=Ye[pt];y.format!==Dn?ge!==null?Ue?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt,0,0,Lt.width,Lt.height,ge,Lt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt,ve,Lt.width,Lt.height,0,Lt.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt,0,0,Lt.width,Lt.height,ge,_e,Lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt,ve,Lt.width,Lt.height,0,ge,_e,Lt.data)}}}else{if(Ye=y.mipmaps,Ue&&ze){Ye.length>0&&Fe++;const Ce=qe(te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Fe,ve,Ce.width,Ce.height)}for(let Ce=0;Ce<6;Ce++)if(O){Ue?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,0,0,te[Ce].width,te[Ce].height,ge,_e,te[Ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,ve,te[Ce].width,te[Ce].height,0,ge,_e,te[Ce].data);for(let pt=0;pt<Ye.length;pt++){const qt=Ye[pt].image[Ce].image;Ue?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt+1,0,0,qt.width,qt.height,ge,_e,qt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt+1,ve,qt.width,qt.height,0,ge,_e,qt.data)}}else{Ue?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,0,0,ge,_e,te[Ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,ve,ge,_e,te[Ce]);for(let pt=0;pt<Ye.length;pt++){const Lt=Ye[pt];Ue?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt+1,0,0,ge,_e,Lt.image[Ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,pt+1,ve,ge,_e,Lt.image[Ce])}}}C(y)&&y.mipmapsAutoUpdate===!0&&A(i.TEXTURE_CUBE_MAP),xe.__version=re.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function Ve(D,y,q,de,re,xe){const ye=r.convert(q.format,q.colorSpace),ne=r.convert(q.type),ie=S(q.internalFormat,ye,ne,q.normalized,q.colorSpace),me=n.get(y),O=n.get(q);if(O.__renderTarget=y,!me.__hasExternalTextures){const te=Math.max(1,y.width>>xe),Q=Math.max(1,y.height>>xe);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,xe,ie,te,Q,y.depth,0,ye,ne,null):t.texImage2D(re,xe,ie,te,Q,0,ye,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),pe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,re,O.__webglTexture,0,lt(y)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,de,re,O.__webglTexture,xe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(D,y,q){if(i.bindRenderbuffer(i.RENDERBUFFER,D),y.depthBuffer){const de=y.depthTexture,re=de&&de.isDepthTexture?de.type:null,xe=d(y.stencilBuffer,re),ye=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pe(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(y),xe,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(y),xe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xe,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,D)}else{const de=y.textures;for(let re=0;re<de.length;re++){const xe=de[re],ye=r.convert(xe.format,xe.colorSpace),ne=r.convert(xe.type),ie=S(xe.internalFormat,ye,ne,xe.normalized,xe.colorSpace);pe(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(y),ie,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(y),ie,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ie,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(D,y,q){const de=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=n.get(y.depthTexture);re.__renderTarget=y;const xe=de?y.depthTexture.image[0]:y.depthTexture.image;(!re.__webglTexture||xe.width!==y.width||xe.height!==y.height)&&(xe.width=y.width,xe.height=y.height,y.depthTexture.needsUpdate=!0),de?Ae(y.depthTexture,0):Me(y.depthTexture,0);const ye=re.__webglTexture,ne=lt(y),ie=de?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,me=y.depthTexture.format===ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===si)pe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,ie,ye,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,me,ie,ye,0);else if(y.depthTexture.format===ni)pe(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,ie,ye,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,me,ie,ye,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function wt(D){const y=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const de=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),de){const re=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,de.removeEventListener("dispose",re)};de.addEventListener("dispose",re),y.__depthDisposeCallback=re}y.__boundDepthTexture=de}if(D.depthTexture&&!y.__autoAllocateDepthBuffer)if(q)for(let de=0;de<6;de++)dt(y.__webglFramebuffer[de],D,de);else D.texture.mipmaps.length>0?dt(y.__webglFramebuffer[0],D,0):dt(y.__webglFramebuffer,D,0);else if(q){y.__webglDepthbuffer=[];for(let de=0;de<6;de++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[de]),y.__webglDepthbuffer[de]===void 0)y.__webglDepthbuffer[de]=i.createRenderbuffer(),Ge(y.__webglDepthbuffer[de],D,!1);else{const re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=y.__webglDepthbuffer[de];i.bindRenderbuffer(i.RENDERBUFFER,xe),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,xe)}}else if(D.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ge(y.__webglDepthbuffer,D,!1);else{const re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,xe),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,xe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function St(D,y,q){const de=n.get(D);y!==void 0&&Ve(de.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&wt(D)}function Nt(D){const y=D.texture,q=n.get(D),de=n.get(y);D.addEventListener("dispose",F),U(D);const re=D.textures,xe=D.isWebGLCubeRenderTarget===!0,ye=re.length>1;if(ye||(de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture()),de.__version=y.version,a.memory.textures++),xe){q.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(y.mipmaps.length>0){q.__webglFramebuffer[ne]=[];for(let ie=0;ie<y.mipmaps.length;ie++)q.__webglFramebuffer[ne][ie]=i.createFramebuffer()}else q.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(y.mipmaps.length>0){q.__webglFramebuffer=[];for(let ne=0;ne<y.mipmaps.length;ne++)q.__webglFramebuffer[ne]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(ye)for(let ne=0,ie=re.length;ne<ie;ne++){const me=n.get(re[ne]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&pe(D)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ne=0;ne<re.length;ne++){const ie=re[ne];q.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[ne]);const me=r.convert(ie.format,ie.colorSpace),O=r.convert(ie.type),te=S(ie.internalFormat,me,O,ie.normalized,ie.colorSpace,D.isXRRenderTarget===!0),Q=lt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,te,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,q.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Ge(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(xe){t.bindTexture(i.TEXTURE_CUBE_MAP,de.__webglTexture),at(i.TEXTURE_CUBE_MAP,y);for(let ne=0;ne<6;ne++)if(y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)Ve(q.__webglFramebuffer[ne][ie],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ie);else Ve(q.__webglFramebuffer[ne],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);C(y)?A(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}else if(ye){for(let ne=0,ie=re.length;ne<ie;ne++){const me=re[ne],O=n.get(me);let te=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(te=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,O.__webglTexture),at(te,me),Ve(q.__webglFramebuffer,D,me,i.COLOR_ATTACHMENT0+ne,te,0),C(me)&&A(te)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ne=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,de.__webglTexture),at(ne,y),y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)Ve(q.__webglFramebuffer[ie],D,y,i.COLOR_ATTACHMENT0,ne,ie);else Ve(q.__webglFramebuffer,D,y,i.COLOR_ATTACHMENT0,ne,0);C(y)?A(ne):y.mipmaps.length>0&&i.texParameteri(ne,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}D.depthBuffer&&wt(D)}function z(D){const y=D.textures;for(let q=0,de=y.length;q<de;q++){const re=y[q];if(C(re)&&re.mipmapsAutoUpdate===!0){const xe=M(D),ye=n.get(re).__webglTexture;t.bindTexture(xe,ye),A(xe),t.unbindTexture()}}}const Xe=[];function ft(D){if(D.samples>0){if(pe(D)===!1){const y=D.textures,q=D.width,de=D.height;let re=i.COLOR_BUFFER_BIT;const xe=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(D),ne=y.length>1;if(ne)for(let me=0;me<y.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let me=0;me<y.length;me++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[me]);const O=n.get(y[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,q,de,0,0,q,de,re,i.NEAREST),c===!0&&(Xe.length=0,Xe.push(i.COLOR_ATTACHMENT0+me),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&Xe.push(xe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let me=0;me<y.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,ye.__webglColorRenderbuffer[me]);const O=n.get(y[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){const y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function lt(D){return Math.min(s.maxSamples,D.samples)}function pe(D){const y=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ht(D){const y=a.render.frame;p.get(D)!==y&&(p.set(D,y),D.update())}function He(D,y){const q=D.colorSpace,de=D.format,re=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==gr&&q!==ei&&(ot.getTransfer(q)===vt?(de!==Dn||re!==un)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):mt("WebGLTextures: Unsupported texture color space:",q)),y}function qe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=Le,this.resetTextureUnits=se,this.getTextureUnits=ae,this.setTextureUnits=fe,this.setTexture2D=Me,this.setTexture2DArray=Re,this.setTexture3D=Ee,this.setTextureCube=Ae,this.rebindTextures=St,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=ft,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Ve,this.useMultisampledRTT=pe,this.dispose=I}function lg(i,e){function t(n,s=ei){let r;const a=ot.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===Qa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ja)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===kl)return i.BYTE;if(n===Vl)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===Ja)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===ql)return i.ALPHA;if(n===Yl)return i.RGB;if(n===Dn)return i.RGBA;if(n===si)return i.DEPTH_COMPONENT;if(n===ni)return i.DEPTH_STENCIL;if(n===eo)return i.RED;if(n===to)return i.RED_INTEGER;if(n===Mi)return i.RG;if(n===no)return i.RG_INTEGER;if(n===io)return i.RGBA_INTEGER;if(n===or||n===lr||n===cr||n===ur)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xa||n===va||n===Ma||n===Sa||n===ya||n===pr||n===Ea)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xa||n===va)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ma)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Sa)return r.COMPRESSED_R11_EAC;if(n===ya)return r.COMPRESSED_SIGNED_R11_EAC;if(n===pr)return r.COMPRESSED_RG11_EAC;if(n===Ea)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ba||n===Ta||n===Aa||n===wa||n===Ra||n===Ca||n===Pa||n===Da||n===La||n===Ia||n===Na||n===Ua||n===Fa||n===Oa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ba)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ta)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Aa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ra)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ca)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Da)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===La)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ia)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Na)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ua)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oa)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ba||n===za||n===Ga)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ba)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ha||n===ka||n===mr||n===Va)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ha)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===mr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const cg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ug=`
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

}`;class hg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new dc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Si({vertexShader:cg,fragmentShader:ug,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dg extends ai{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,p=null,m=null,h=null,g=null,_=null;const E=typeof XRWebGLBinding<"u",u=new hg,f={},x=t.getContextAttributes();let C=null,A=null;const M=[],S=[],d=new We;let b=null,U=null;const w=new Mn;w.viewport=new Dt;const P=new Mn;P.viewport=new Dt;const F=[w,P],H=new Sh;let L=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Me=M[ee];return Me===void 0&&(Me=new Br,M[ee]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ee){let Me=M[ee];return Me===void 0&&(Me=new Br,M[ee]=Me),Me.getGripSpace()},this.getHand=function(ee){let Me=M[ee];return Me===void 0&&(Me=new Br,M[ee]=Me),Me.getHandSpace()};function W(ee){const Me=S.indexOf(ee.inputSource);if(Me===-1)return;const Re=M[Me];Re!==void 0&&(Re.update(ee.inputSource,ee.frame,l||a),Re.dispatchEvent({type:ee.type,data:ee.inputSource}))}function K(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",he);for(let ee=0;ee<M.length;ee++){const Me=S[ee];Me!==null&&(S[ee]=null,M[ee].disconnect(Me))}L=null,I=null,u.reset();for(const ee in f)delete f[ee];if(e.setRenderTarget(C),g=null,h=null,m=null,s=null,A=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(d.width,d.height,!1),U!==null){const ee=U.camera;ee.fov=U.fov,ee.zoom=U.zoom,ee.updateProjectionMatrix(),U=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return m===null&&E&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",K),s.addEventListener("inputsourceschange",he),x.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(d),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,Ee=null,Ae=null;x.depth&&(Ae=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=x.stencil?ni:si,Ee=x.stencil?Qi:In);const ke={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};m=this.getBinding(),h=m.createProjectionLayer(ke),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),A=new Ln(h.textureWidth,h.textureHeight,{format:Dn,type:un,depthTexture:new ji(h.textureWidth,h.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const Re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,Re),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),A=new Ln(g.framebufferWidth,g.framebufferHeight,{format:Dn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return u.getDepthTexture()};function he(ee){for(let Me=0;Me<ee.removed.length;Me++){const Re=ee.removed[Me],Ee=S.indexOf(Re);Ee>=0&&(S[Ee]=null,M[Ee].disconnect(Re))}for(let Me=0;Me<ee.added.length;Me++){const Re=ee.added[Me];let Ee=S.indexOf(Re);if(Ee===-1){for(let ke=0;ke<M.length;ke++)if(ke>=S.length){S.push(Re),Ee=ke;break}else if(S[ke]===null){S[ke]=Re,Ee=ke;break}if(Ee===-1)break}const Ae=M[Ee];Ae&&Ae.connect(Re)}}function Z(ee,Me){Me===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Me.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let Me=ee.near,Re=ee.far;u.texture!==null&&(u.depthNear>0&&(Me=u.depthNear),u.depthFar>0&&(Re=u.depthFar)),H.near=P.near=w.near=Me,H.far=P.far=w.far=Re,(L!==H.near||I!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),L=H.near,I=H.far),H.layers.mask=ee.layers.mask|6,w.layers.mask=H.layers.mask&-5,P.layers.mask=H.layers.mask&-3;const Ee=ee.parent,Ae=H.cameras;Z(H,Ee);for(let ke=0;ke<Ae.length;ke++)Z(Ae[ke],Ee);H.projectionMatrix.copy(w.projectionMatrix),H.projectionMatrixInverse.copy(w.projectionMatrixInverse),U===null&&ee.isPerspectiveCamera&&(U={camera:ee,fov:ee.fov,zoom:ee.zoom}),se(ee,H,Ee)};function se(ee,Me,Re){Re===null?ee.matrix.copy(Me.matrixWorld):(ee.matrix.copy(Re.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Me.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Me.projectionMatrix),ee.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=bs*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(ee){c=ee,h!==null&&(h.fixedFoveation=ee),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ee)},this.hasDepthSensing=function(){return u.texture!==null},this.getDepthSensingMesh=function(){return u.getMesh(H)},this.getCameraTexture=function(ee){return f[ee]};let ae=null;function fe(ee,Me){if(p=Me.getViewerPose(l||a),_=Me,p!==null){const Re=p.views;g!==null&&(e.setRenderTargetFramebuffer(A,g.framebuffer),e.setRenderTarget(A));let Ee=!1;Re.length!==H.cameras.length&&(H.cameras.length=0,Ee=!0);for(let Be=0;Be<Re.length;Be++){const at=Re[Be];let ut=null;if(g!==null)ut=g.getViewport(at);else{const we=m.getViewSubImage(h,at);ut=we.viewport,Be===0&&(e.setRenderTargetTextures(A,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(A))}let et=F[Be];et===void 0&&(et=new Mn,et.layers.enable(Be),et.viewport=new Dt,F[Be]=et),et.matrix.fromArray(at.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(at.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(ut.x,ut.y,ut.width,ut.height),Be===0&&(H.matrix.copy(et.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ee===!0&&H.cameras.push(et)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){m=n.getBinding();const Be=m.getDepthInformation(Re[0]);Be&&Be.isValid&&Be.texture&&u.init(Be,s.renderState)}if(Ae&&Ae.includes("camera-access")&&E){e.state.unbindTexture(),m=n.getBinding();for(let Be=0;Be<Re.length;Be++){const at=Re[Be].camera;if(at){let ut=f[at];ut||(ut=new dc,f[at]=ut);const et=m.getCameraImage(at);ut.sourceTexture=et}}}}for(let Re=0;Re<M.length;Re++){const Ee=S[Re],Ae=M[Re];Ee!==null&&Ae!==void 0&&Ae.update(Ee,Me,l||a)}ae&&ae(ee,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),_=null}const Le=new _c;Le.setAnimationLoop(fe),this.setAnimationLoop=function(ee){ae=ee},this.dispose=function(){}}}const fg=new ct,wc=new $e;wc.set(-1,0,0,0,1,0,0,0,1);function pg(i,e){function t(u,f){u.matrixAutoUpdate===!0&&u.updateMatrix(),f.value.copy(u.matrix)}function n(u,f){f.color.getRGB(u.fogColor.value,fc(i)),f.isFog?(u.fogNear.value=f.near,u.fogFar.value=f.far):f.isFogExp2&&(u.fogDensity.value=f.density)}function s(u,f,x,C,A){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(u,f):f.isMeshLambertMaterial?(r(u,f),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(u,f),m(u,f)):f.isMeshPhongMaterial?(r(u,f),p(u,f),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(u,f),h(u,f),f.isMeshPhysicalMaterial&&g(u,f,A)):f.isMeshMatcapMaterial?(r(u,f),_(u,f)):f.isMeshDepthMaterial?r(u,f):f.isMeshDistanceMaterial?(r(u,f),E(u,f)):f.isMeshNormalMaterial?r(u,f):f.isLineBasicMaterial?(a(u,f),f.isLineDashedMaterial&&o(u,f)):f.isPointsMaterial?c(u,f,x,C):f.isSpriteMaterial?l(u,f):f.isShadowMaterial?(u.color.value.copy(f.color),u.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(u,f){u.opacity.value=f.opacity,f.color&&u.diffuse.value.copy(f.color),f.emissive&&u.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(u.map.value=f.map,t(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,t(f.alphaMap,u.alphaMapTransform)),f.bumpMap&&(u.bumpMap.value=f.bumpMap,t(f.bumpMap,u.bumpMapTransform),u.bumpScale.value=f.bumpScale,f.side===rn&&(u.bumpScale.value*=-1)),f.normalMap&&(u.normalMap.value=f.normalMap,t(f.normalMap,u.normalMapTransform),u.normalScale.value.copy(f.normalScale),f.side===rn&&u.normalScale.value.negate()),f.displacementMap&&(u.displacementMap.value=f.displacementMap,t(f.displacementMap,u.displacementMapTransform),u.displacementScale.value=f.displacementScale,u.displacementBias.value=f.displacementBias),f.emissiveMap&&(u.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,u.emissiveMapTransform)),f.specularMap&&(u.specularMap.value=f.specularMap,t(f.specularMap,u.specularMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);const x=e.get(f),C=x.envMap,A=x.envMapRotation;C&&(u.envMap.value=C,u.envMapRotation.value.setFromMatrix4(fg.makeRotationFromEuler(A)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&u.envMapRotation.value.premultiply(wc),u.reflectivity.value=f.reflectivity,u.ior.value=f.ior,u.refractionRatio.value=f.refractionRatio),f.lightMap&&(u.lightMap.value=f.lightMap,u.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,u.lightMapTransform)),f.aoMap&&(u.aoMap.value=f.aoMap,u.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,u.aoMapTransform))}function a(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,f.map&&(u.map.value=f.map,t(f.map,u.mapTransform))}function o(u,f){u.dashSize.value=f.dashSize,u.totalSize.value=f.dashSize+f.gapSize,u.scale.value=f.scale}function c(u,f,x,C){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.size.value=f.size*x,u.scale.value=C*.5,f.map&&(u.map.value=f.map,t(f.map,u.uvTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,t(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function l(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.rotation.value=f.rotation,f.map&&(u.map.value=f.map,t(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,t(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function p(u,f){u.specular.value.copy(f.specular),u.shininess.value=Math.max(f.shininess,1e-4)}function m(u,f){f.gradientMap&&(u.gradientMap.value=f.gradientMap)}function h(u,f){u.metalness.value=f.metalness,f.metalnessMap&&(u.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,u.metalnessMapTransform)),u.roughness.value=f.roughness,f.roughnessMap&&(u.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,u.roughnessMapTransform)),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)}function g(u,f,x){u.ior.value=f.ior,f.diffuseRoughness>0&&(u.diffuseRoughness.value=f.diffuseRoughness,f.diffuseRoughnessMap&&(u.diffuseRoughnessMap.value=f.diffuseRoughnessMap,t(f.diffuseRoughnessMap,u.diffuseRoughnessMapTransform))),f.sheen>0&&(u.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),u.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(u.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,u.sheenColorMapTransform)),f.sheenRoughnessMap&&(u.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,u.sheenRoughnessMapTransform))),f.clearcoat>0&&(u.clearcoat.value=f.clearcoat,u.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(u.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,u.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(u.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===rn&&u.clearcoatNormalScale.value.negate())),f.dispersion>0&&(u.dispersion.value=f.dispersion),f.retroreflectivity>0&&(u.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(u.iridescence.value=f.iridescence,u.iridescenceIOR.value=f.iridescenceIOR,u.iridescenceThicknessMinimum.value=f.iridescenceThicknessMinimum,u.iridescenceThicknessMaximum.value=f.iridescenceThicknessMaximum,f.iridescenceMap&&(u.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,u.iridescenceMapTransform)),f.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),f.transmission>0&&(u.transmission.value=f.transmission,u.transmissionSamplerMap.value=x.texture,u.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(u.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,u.transmissionMapTransform)),u.thickness.value=f.thickness,f.thicknessMap&&(u.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=f.attenuationDistance,u.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(u.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(u.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=f.specularIntensity,u.specularColor.value.copy(f.specularColor),f.specularColorMap&&(u.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,u.specularColorMapTransform)),f.specularIntensityMap&&(u.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,u.specularIntensityMapTransform))}function _(u,f){f.matcap&&(u.matcap.value=f.matcap)}function E(u,f){const x=e.get(f).light;u.referencePosition.value.setFromMatrixPosition(x.matrixWorld),u.nearDistance.value=x.shadow.camera.near,u.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mg(i,e,t,n){let s={},r={};function a(x,C){const A=C.program;n.uniformBlockBinding(x,A,s[x.id])}function o(x,C){let A=s[x.id];A===void 0&&(_(x),A=c(x),s[x.id]=A,x.addEventListener("dispose",u));const M=C.program;n.updateUBOMapping(x,M);const S=e.render.frame;r[x.id]!==S&&(l(x),r[x.id]=S)}function c(x){const C=i.createBuffer(),A=x.__size,M=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,A,M),i.bindBuffer(i.UNIFORM_BUFFER,null),C}function l(x){const C=s[x.id],A=x.uniforms,M=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let S=0,d=A.length;S<d;S++){const b=A[S];if(Array.isArray(b))for(let U=0,w=b.length;U<w;U++)p(b[U],S,U,M);else p(b,S,0,M)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,C,A,M){if(h(x,C,A,M)===!0){const S=x.__offset,d=x.value;if(Array.isArray(d)){let b=0;for(let U=0;U<d.length;U++){const w=d[U],P=E(w,!0);m(w,x.__data,b),b+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else m(d,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,x.__data)}}function m(x,C,A){typeof x=="number"||typeof x=="boolean"?C[A]=x:x.isMatrix3?(C[A]=x.elements[0],C[A+1]=x.elements[1],C[A+2]=x.elements[2],C[A+3]=0,C[A+4]=x.elements[3],C[A+5]=x.elements[4],C[A+6]=x.elements[5],C[A+7]=0,C[A+8]=x.elements[6],C[A+9]=x.elements[7],C[A+10]=x.elements[8],C[A+11]=0):ArrayBuffer.isView(x)?C.set(x.subarray(0,C.length-A),A):x.toArray(C,A)}function h(x,C,A,M){const S=x.value,d=C+"_"+A;if(Array.isArray(S)){M[d]===void 0&&(M[d]=[]);const b=M[d];let U=!1;for(let w=0;w<S.length;w++)g(S[w],b,w)===!0&&(U=!0);return U}return g(S,M,d)}function g(x,C,A){if(C[A]===void 0)return typeof x=="number"||typeof x=="boolean"?C[A]=x:ArrayBuffer.isView(x)?C[A]=x.slice():C[A]=x.clone(),!0;{const M=C[A];if(typeof x=="number"||typeof x=="boolean"){if(M!==x)return C[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(M.equals(x)===!1)return M.copy(x),!0}}return!1}function _(x){const C=x.uniforms;let A=0;const M=16;for(let d=0,b=C.length;d<b;d++){const U=Array.isArray(C[d])?C[d]:[C[d]];for(let w=0,P=U.length;w<P;w++){const F=U[w],H=Array.isArray(F.value)?F.value:[F.value],L=Array.isArray(C[d])||Array.isArray(F.value);let I=A;for(let K=0,he=H.length;K<he;K++){const Z=H[K],se=E(Z,L),ae=A%M,fe=ae%se.boundary,Le=ae+fe;A+=fe,Le!==0&&M-Le<se.storage&&(A+=M-Le),K===0&&(I=A),A+=se.storage}const W=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new W((A-I)/Float32Array.BYTES_PER_ELEMENT),F.__offset=I}}const S=A%M;return S>0&&(A+=M-S),x.__size=A,x.__cache={},this}function E(x,C){const A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=16,A.storage=48):x.isMatrix4?(A.boundary=16,A.storage=64):x.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",x),C===!0&&(A.boundary=16,A.storage=Math.ceil(A.storage/16)*16),A}function u(x){const C=x.target;C.removeEventListener("dispose",u),i.deleteBuffer(s[C.id]),delete s[C.id],delete r[C.id]}function f(){for(const x in s)i.deleteBuffer(s[x]);s={},r={}}return{bind:a,update:o,dispose:f}}const gg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function _g(){return wn===null&&(wn=new ac(gg,16,16,Mi,Nn),wn.name="DFG_LUT",wn.minFilter=sn,wn.magFilter=sn,wn.wrapS=Xn,wn.wrapT=Xn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class xg{constructor(e={}){const{canvas:t=Su(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:h=!1,outputBufferType:g=un}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const E=g,u=new Set([io,no,to]),f=new Set([un,In,ys,Qi,Qa,ja]),x=new Uint32Array(4),C=new Int32Array(4),A={textures:[],min:[],max:[],resolution:[]};let M=null,S=null;const d=[],b=[];let U=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let P=!1,F=null,H=null,L=null,I=null;this._outputColorSpace=nn;let W=0,K=0,he=null,Z=-1,se=null;const ae=new Dt,fe=new Dt;let Le=null;const ee=new tt(0);let Me=0,Re=t.width,Ee=t.height,Ae=1,ke=null,Mt=null;const Be=new Dt(0,0,Re,Ee),at=new Dt(0,0,Re,Ee);let ut=!1;const et=new Ts,we=new co;let Ne=!1,nt=!1;const Ve=new ct,Ge=new G,dt=new Dt,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function Nt(){return he===null?Ae:1}let z=n;function Xe(T,k){return t.getContext(T,k)}let ft,lt,pe,ht,He,qe,D,y,q,de,re,xe,ye,ne,ie,me,O,te,Q,ge,_e,ve,Ue;try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:p,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ka}`),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",Ye,!1),t.addEventListener("webglcontextcreationerror",Ce,!1),z===null){const k="webgl2";if(z=Xe(k,T),z===null)throw Xe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(T){throw t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Ye,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),mt("WebGLRenderer: "+T.message),T}function ze(){ft=new Sp(z),ft.init(),_e=new lg(z,ft),lt=new up(z,ft,e,_e),pe=new ag(z,ft),lt.reversedDepthBuffer&&h&&pe.buffers.depth.setReversed(!0),H=z.createFramebuffer(),L=z.createFramebuffer(),I=z.createFramebuffer(),ht=new bp(z),He=new qm,qe=new og(z,ft,pe,He,lt,_e,ht),D=new Mp(w),y=new Th(z),ve=new lp(z,y),q=new yp(z,y,ht,ve),de=new Ap(z,q,y,ve,ht),te=new Tp(z,lt,qe),ie=new hp(He),re=new Xm(w,D,ft,lt,ve,ie),xe=new pg(w,He),ye=new Zm,ne=new eg(ft),O=new op(w,D,pe,de,_,c),me=new rg(w,de,lt),Ue=new mg(z,ht,lt,pe),Q=new cp(z,ft,ht),ge=new Ep(z,ft,ht),ht.programs=re.programs,w.capabilities=lt,w.extensions=ft,w.properties=He,w.renderLists=ye,w.shadowMap=me,w.state=pe,w.info=ht}E!==un&&(U=new Rp(E,t.width,t.height,o,s,r));const ue=new dg(w,z);this.xr=ue,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=ft.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ft.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Ae},this.setPixelRatio=function(T){T!==void 0&&(Ae=T,this.setSize(Re,Ee,!1))},this.getSize=function(T){return T.set(Re,Ee)},this.setSize=function(T,k,j=!0){if(ue.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Re=T,Ee=k,t.width=Math.floor(T*Ae),t.height=Math.floor(k*Ae),j===!0&&(t.style.width=T+"px",t.style.height=k+"px"),U!==null&&U.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(Re*Ae,Ee*Ae).floor()},this.setDrawingBufferSize=function(T,k,j){Re=T,Ee=k,Ae=j,t.width=Math.floor(T*j),t.height=Math.floor(k*j),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(E===un){mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ae)},this.getViewport=function(T){return T.copy(Be)},this.setViewport=function(T,k,j,$){T.isVector4?Be.set(T.x,T.y,T.z,T.w):Be.set(T,k,j,$),pe.viewport(ae.copy(Be).multiplyScalar(Nt()).round())},this.getScissor=function(T){return T.copy(at)},this.setScissor=function(T,k,j,$){T.isVector4?at.set(T.x,T.y,T.z,T.w):at.set(T,k,j,$),pe.scissor(fe.copy(at).multiplyScalar(Nt()).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(T){pe.setScissorTest(ut=T)},this.setOpaqueSort=function(T){ke=T},this.setTransparentSort=function(T){Mt=T},this.getClearColor=function(T){return T.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,j=!0){let $=0;if(T){let J=!1;if(he!==null){const be=he.texture.format;J=u.has(be)}if(J){const be=he.texture.type,De=f.has(be),Te=O.getClearColor(),v=O.getClearAlpha(),R=Te.r,N=Te.g,X=Te.b;De?(x[0]=R,x[1]=N,x[2]=X,x[3]=v,z.clearBufferuiv(z.COLOR,0,x)):(C[0]=R,C[1]=N,C[2]=X,C[3]=v,z.clearBufferiv(z.COLOR,0,C))}else $|=z.COLOR_BUFFER_BIT}k&&($|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Ye,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),O.dispose(),ye.dispose(),ne.dispose(),qe.dispose(),He.dispose(),D.dispose(),de.dispose(),q.dispose(),ve.dispose(),Ue.dispose(),re.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Rt),ue.removeEventListener("sessionend",Ht),Ct.stop()};function Fe(T){T.preventDefault(),bo("WebGLRenderer: Context Lost."),P=!0}function Ye(){bo("WebGLRenderer: Context Restored."),P=!1;const T=ht.autoReset,k=me.enabled,j=me.autoUpdate,$=me.needsUpdate,J=me.type;ze(),ht.autoReset=T,me.enabled=k,me.autoUpdate=j,me.needsUpdate=$,me.type=J}function Ce(T){mt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function pt(T){const k=T.target;k.removeEventListener("dispose",pt),Lt(k)}function Lt(T){qt(T),He.remove(T)}function qt(T){const k=He.get(T).programs;k!==void 0&&(k.forEach(function(j){re.releaseProgram(j)}),T.isShaderMaterial&&re.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,j,$,J,be){k===null&&(k=wt);const De=J.isMesh&&J.matrixWorld.determinantAffine()<0,Te=Ri(T,k,j,$,J);pe.setMaterial($,De);let v=j.index,R=1;if($.wireframe===!0){if(v=q.getWireframeAttribute(j),v===void 0)return;R=2}const N=j.drawRange,X=j.attributes.position;let B=N.start*R,ce=(N.start+N.count)*R;be!==null&&(B=Math.max(B,be.start*R),ce=Math.min(ce,(be.start+be.count)*R)),v!==null?(B=Math.max(B,0),ce=Math.min(ce,v.count)):X!=null&&(B=Math.max(B,0),ce=Math.min(ce,X.count));const Y=ce-B;if(Y<0||Y===1/0)return;ve.setup(J,$,Te,j,v);let Se,Ie=Q;if(v!==null&&(Se=y.get(v),Ie=ge,Ie.setIndex(Se)),J.isMesh)$.wireframe===!0?(pe.setLineWidth($.wireframeLinewidth*Nt()),Ie.setMode(z.LINES)):Ie.setMode(z.TRIANGLES);else if(J.isLine){let Qe=$.linewidth;Qe===void 0&&(Qe=1),pe.setLineWidth(Qe*Nt()),J.isLineSegments?Ie.setMode(z.LINES):J.isLineLoop?Ie.setMode(z.LINE_LOOP):Ie.setMode(z.LINE_STRIP)}else J.isPoints?Ie.setMode(z.POINTS):J.isSprite&&Ie.setMode(z.TRIANGLES);if(J.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))Ie.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Qe=J._multiDrawStarts,oe=J._multiDrawCounts,le=J._multiDrawCount,V=v?y.get(v).bytesPerElement:1,Je=He.get($).currentProgram.getUniforms();for(let At=0;At<le;At++)Je.setValue(z,"_gl_DrawID",At),Ie.render(Qe[At]/V,oe[At])}else if(J.isInstancedMesh)Ie.renderInstances(B,Y,J.count);else if(j.isInstancedBufferGeometry){const Qe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,oe=Math.min(j.instanceCount,Qe);Ie.renderInstances(B,Y,oe)}else Ie.render(B,Y)};function mn(T,k,j,$){F!==null&&T.isNodeMaterial&&F.setObject($,T),Ne===!0&&ie.setState(T,j,!1),T.transparent===!0&&T.side===Jt&&T.forceSinglePass===!1?(T.side=rn,T.needsUpdate=!0,li(T,k,$),T.side=vi,T.needsUpdate=!0,li(T,k,$),T.side=Jt):li(T,k,$)}this.compile=function(T,k,j=null){j===null&&(j=T),F!==null&&F.renderStart(T,k,j),S=ne.get(j),S.init(k),b.push(S),j.traverseVisible(function(J){J.isLight&&J.layers.test(k.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),T!==j&&T.traverseVisible(function(J){J.isLight&&J.layers.test(k.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),nt=this.localClippingEnabled,Ne=ie.init(this.clippingPlanes,nt),Ne===!0&&ie.setGlobalState(this.clippingPlanes,k),F!==null&&me.render(S.state.shadowsArray,j,k);const $=new Set;return T.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const be=J.material;if(be)if(Array.isArray(be))for(let De=0;De<be.length;De++){const Te=be[De];mn(Te,j,k,J),$.add(Te)}else mn(be,j,k,J),$.add(be)}),S=b.pop(),F!==null&&F.renderEnd(),$},this.compileAsync=function(T,k,j=null){const $=this.compile(T,k,j);return new Promise(J=>{function be(){if($.forEach(function(De){const v=He.get(De).currentProgram;(v===void 0||v.isReady())&&$.delete(De)}),$.size===0){J(T);return}setTimeout(be,10)}ft.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Ti=null;function Cs(T){Ti&&Ti(T)}function Rt(){Ct.stop()}function Ht(){Ct.start()}const Ct=new _c;Ct.setAnimationLoop(Cs),typeof self<"u"&&Ct.setContext(self),this.setAnimationLoop=function(T){Ti=T,ue.setAnimationLoop(T),T===null?Ct.stop():Ct.start()},ue.addEventListener("sessionstart",Rt),ue.addEventListener("sessionend",Ht),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(T,k);const j=ue.enabled===!0&&ue.isPresenting===!0,$=U!==null&&(he===null||j)&&U.begin(w,he);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(k),k=ue.getCamera()),T.isScene===!0&&T.onBeforeRender(w,T,k,he),S=ne.get(T,b.length),S.init(k),S.state.textureUnits=qe.getTextureUnits(),b.push(S),Ve.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?we.setFromArrayCamera(k):et.setFromProjectionMatrix(Ve,En,k.reversedDepth),nt=this.localClippingEnabled,Ne=ie.init(this.clippingPlanes,nt),M=ye.get(T,d.length),M.init(),d.push(M),this.info.render.frame++,ue.enabled===!0&&ue.isPresenting===!0){const De=w.xr.getDepthSensingMesh();De!==null&&Qt(De,k,-1/0,w.sortObjects)}Qt(T,k,0,w.sortObjects),M.finish(),F!==null&&F.updateLights(S.state.lightsArray),w.sortObjects===!0&&M.sort(ke,Mt),St=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,St&&O.addToRenderList(M,T),this.info.autoReset===!0&&this.info.reset(),Ne===!0&&ie.beginShadows();const J=S.state.shadowsArray;if(me.render(J,T,k),Ne===!0&&ie.endShadows(),($&&U.hasRenderPass())===!1){const De=M.opaque,Te=M.transmissive;if(S.setupLights(),k.isArrayCamera){const v=k.cameras;if(Te.length>0)for(let R=0,N=v.length;R<N;R++){const X=v[R];Ps(De,Te,T,X)}St&&O.render(T);for(let R=0,N=v.length;R<N;R++){const X=v[R];gn(M,T,X,X.viewport)}}else Te.length>0&&Ps(De,Te,T,k),St&&O.render(T),gn(M,T,k)}he!==null&&K===0&&(qe.updateMultisampleRenderTarget(he),qe.updateRenderTargetMipmap(he)),$&&U.end(w),T.isScene===!0&&T.onAfterRender(w,T,k),ve.resetDefaultState(),Z=-1,se=null,b.pop(),b.length>0?(S=b[b.length-1],qe.setTextureUnits(S.state.textureUnits),Ne===!0&&ie.setGlobalState(w.clippingPlanes,S.state.camera)):S=null,d.pop(),d.length>0?M=d[d.length-1]:M=null,F!==null&&F.renderEnd()};function Qt(T,k,j,$){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)S.pushLight(T),T.castShadow&&S.pushShadow(T);else if(T.isSprite){const De=k.isArrayCamera?we:et;if(!T.frustumCulled||T.intersectsFrustum(De)){$&&dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ve);const Te=de.update(T),v=T.material;v.visible&&M.push(T,Te,v,j,dt.z,null,k)}}else if(T.isMesh||T.isLine||T.isPoints){const De=k.isArrayCamera?we:et;if(!T.frustumCulled||T.intersectsFrustum(De)){const Te=de.update(T),v=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),dt.copy(T.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),dt.copy(Te.boundingSphere.center)),dt.applyMatrix4(T.matrixWorld).applyMatrix4(Ve)),Array.isArray(v)){const R=Te.groups;for(let N=0,X=R.length;N<X;N++){const B=R[N],ce=v[B.materialIndex];ce&&ce.visible&&M.push(T,Te,ce,j,dt.z,B,k)}}else v.visible&&M.push(T,Te,v,j,dt.z,null,k)}}}const be=T.children;for(let De=0,Te=be.length;De<Te;De++)Qt(be[De],k,j,$)}function gn(T,k,j,$){const{opaque:J,transmissive:be,transparent:De}=T;S.setupLightsView(j),Ne===!0&&ie.setGlobalState(w.clippingPlanes,j),$&&pe.viewport(ae.copy($)),J.length>0&&oi(J,k,j),be.length>0&&oi(be,k,j),De.length>0&&oi(De,k,j),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Ps(T,k,j,$){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[$.id]===void 0){const B=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[$.id]=new Ln(1,1,{generateMipmaps:!0,type:B?Nn:un,minFilter:ti,samples:Math.max(4,lt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}const be=S.state.transmissionRenderTarget[$.id],De=$.viewport||ae;be.setSize(De.z*w.transmissionResolutionScale,De.w*w.transmissionResolutionScale);const Te=w.getRenderTarget(),v=w.getActiveCubeFace(),R=w.getActiveMipmapLevel();w.setRenderTarget(be),w.getClearColor(ee),Me=w.getClearAlpha(),Me<1&&w.setClearColor(16777215,.5),w.clear(),St&&O.render(j);const N=w.toneMapping;w.toneMapping=qn;const X=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),S.setupLightsView($),Ne===!0&&ie.setGlobalState(w.clippingPlanes,$),oi(T,j,$),qe.updateMultisampleRenderTarget(be),qe.updateRenderTargetMipmap(be),ft.has("WEBGL_multisampled_render_to_texture")===!1){let B=!1;for(let ce=0,Y=k.length;ce<Y;ce++){const Se=k[ce],{object:Ie,geometry:Qe,material:oe,group:le}=Se;if(oe.side===Jt&&Ie.layers.test($.layers)){const V=oe.side;oe.side=rn,oe.needsUpdate=!0,yt(Ie,j,$,Qe,oe,le),oe.side=V,oe.needsUpdate=!0,B=!0}}B===!0&&(qe.updateMultisampleRenderTarget(be),qe.updateRenderTargetMipmap(be))}w.setRenderTarget(Te,v,R),w.setClearColor(ee,Me),X!==void 0&&($.viewport=X),w.toneMapping=N}function oi(T,k,j){const $=k.isScene===!0?k.overrideMaterial:null;for(let J=0,be=T.length;J<be;J++){const De=T[J],{object:Te,geometry:v,group:R}=De;let N=De.material;N.allowOverride===!0&&$!==null&&(N=$),Te.layers.test(j.layers)&&yt(Te,k,j,v,N,R)}}function yt(T,k,j,$,J,be){F!==null&&J.isNodeMaterial&&F.setObject(T,J),T.onBeforeRender(w,k,j,$,J,be),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),J.onBeforeRender(w,k,j,$,T,be),J.transparent===!0&&J.side===Jt&&J.forceSinglePass===!1?(J.side=rn,J.needsUpdate=!0,w.renderBufferDirect(j,k,$,J,T,be),J.side=vi,J.needsUpdate=!0,w.renderBufferDirect(j,k,$,J,T,be),J.side=Jt):w.renderBufferDirect(j,k,$,J,T,be),T.onAfterRender(w,k,j,$,J,be)}function Ai(T){let k=0;for(const j of T)j.texture!==null&&k++;return k}function li(T,k,j){k.isScene!==!0&&(k=wt);const $=He.get(T),J=S.state.lights,be=S.state.shadowsArray,De=J.state.version,Te=re.getParameters(T,J.state,be,k,j,S.state.lightProbeGridArray),v=re.getProgramCacheKey(Te);let R=$.programs;$.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,$.fog=k.fog;const N=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;$.envMap=D.get(T.envMap||$.environment,N),$.envMapRotation=$.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,R===void 0&&(T.addEventListener("dispose",pt),R=new Map,$.programs=R,$.programVariants=new Map);let X=R.get(v);if(X!==void 0){if($.currentProgram===X&&$.lightsStateVersion===De)return wi(T,Te),X}else Te.uniforms=re.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,j,Te),T.onBeforeCompile(Te,w),X=re.acquireProgram(Te,v),R.set(v,X),$.uniforms=Te.uniforms;const B=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(B.clippingPlanes=ie.uniform),wi(T,Te),$.needsLights=Ds(T),$.lightsStateVersion=De,$.needsLights&&(B.ambientLightColor.value=J.state.ambient,B.lightProbe.value=J.state.probe,B.sunLights.value=J.state.sun,B.sunLightShadows.value=J.state.sunShadow,B.directionalLights.value=J.state.directional,B.directionalLightShadows.value=J.state.directionalShadow,B.spotLights.value=J.state.spot,B.spotLightShadows.value=J.state.spotShadow,B.rectAreaLights.value=J.state.rectArea,B.ltc_1.value=J.state.rectAreaLTC1,B.ltc_2.value=J.state.rectAreaLTC2,B.pointLights.value=J.state.point,B.pointLightShadows.value=J.state.pointShadow,B.hemisphereLights.value=J.state.hemi,B.sunShadowMatrix.value=J.state.sunShadowMatrix,B.sunShadowCascade.value=J.state.sunShadowCascade,B.directionalShadowMatrix.value=J.state.directionalShadowMatrix,B.spotLightMatrix.value=J.state.spotLightMatrix,B.spotLightMap.value=J.state.spotLightMap,B.pointShadowMatrix.value=J.state.pointShadowMatrix),$.numLightProbeGrids=Ai(S.state.lightProbeGridArray),$.currentProgram=X,$.uniformsList=null,X}function ci(T,k,j,$,J){const be=He.get(T),De=be.currentProgram.id+","+$+","+J;let Te=be.programVariants.get(De);return Te===void 0?(Te=li(T,k,j),be.programVariants.set(De,Te)):(be.currentProgram=Te,be.uniformsList=null,be.outputColorSpace=$,be.toneMapping=J),Te}function is(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=dr.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function wi(T,k){const j=He.get(T);j.outputColorSpace=k.outputColorSpace,j.batching=k.batching,j.batchingColor=k.batchingColor,j.instancing=k.instancing,j.instancingColor=k.instancingColor,j.instancingMorph=k.instancingMorph,j.skinning=k.skinning,j.morphTargets=k.morphTargets,j.morphNormals=k.morphNormals,j.morphColors=k.morphColors,j.morphTargetsCount=k.morphTargetsCount,j.numClippingPlanes=k.numClippingPlanes,j.numIntersection=k.numClipIntersection,j.vertexAlphas=k.vertexAlphas,j.vertexTangents=k.vertexTangents,j.toneMapping=k.toneMapping}function Ri(T,k,j,$,J){k.isScene!==!0&&(k=wt),qe.resetTextureUnits();const be=k.fog,De=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?k.environment:null,Te=he===null?w.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:ot.workingColorSpace,v=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,R=D.get($.envMap||De,v),N=$.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,X=!!j.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),B=!!j.morphAttributes.position,ce=!!j.morphAttributes.normal,Y=!!j.morphAttributes.color;let Se=qn;$.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Se=w.toneMapping);const Ie=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qe=Ie!==void 0?Ie.length:0,oe=He.get($),le=S.state.lights;if(Ne===!0&&(nt===!0||T!==se)){const rt=T===se&&$.id===Z;ie.setState($,T,rt)}let V=!1,Je=!1;$.version===oe.__version?oe.needsLights&&oe.lightsStateVersion!==le.state.version||J.isBatchedMesh&&oe.batching===!1||!J.isBatchedMesh&&oe.batching===!0||J.isBatchedMesh&&oe.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&oe.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&oe.instancing===!1||!J.isInstancedMesh&&oe.instancing===!0||J.isSkinnedMesh&&oe.skinning===!1||!J.isSkinnedMesh&&oe.skinning===!0||J.isInstancedMesh&&oe.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&oe.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&oe.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&oe.instancingMorph===!1&&J.morphTexture!==null||oe.envMap!==R||$.fog===!0&&oe.fog!==be||oe.numClippingPlanes!==void 0&&(oe.numClippingPlanes!==ie.numPlanes||oe.numIntersection!==ie.numIntersection)||oe.vertexAlphas!==N||oe.vertexTangents!==X||oe.morphTargets!==B||oe.morphNormals!==ce||oe.morphColors!==Y||oe.morphTargetsCount!==Qe||oe.numLightProbeGrids!==Ai(S.state.lightProbeGridArray)?V=!0:(oe.outputColorSpace!==Te||oe.toneMapping!==Se)&&(Je=!0):(V=!0,oe.__version=$.version);let At=oe.currentProgram;(V===!0||Je===!0)&&(At=Je===!0?ci($,k,J,Te,Se):li($,k,J),F&&$.isNodeMaterial&&F.onUpdateProgram($,At,oe));let Tn=!1,on=!1,jt=!1;const je=At.getUniforms(),_t=oe.uniforms;if(pe.useProgram(At.program)&&(Tn=!0,on=!0,jt=!0),$.id!==Z&&(Z=$.id,on=!0),Tn||se!==T){pe.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),je.setValue(z,"projectionMatrix",T.projectionMatrix),je.setValue(z,"viewMatrix",T.matrixWorldInverse);const Et=je.map.cameraPosition;Et!==void 0&&Et.setValue(z,Ge.setFromMatrixPosition(T.matrixWorld)),lt.logarithmicDepthBuffer&&je.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&je.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),se!==T&&(se=T,on=!0,jt=!0)}if(oe.needsLights&&(le.state.sunShadowMap.length>0&&je.setValue(z,"sunShadowMap",le.state.sunShadowMap,qe),le.state.directionalShadowMap.length>0&&je.setValue(z,"directionalShadowMap",le.state.directionalShadowMap,qe),le.state.spotShadowMap.length>0&&je.setValue(z,"spotShadowMap",le.state.spotShadowMap,qe),le.state.pointShadowMap.length>0&&je.setValue(z,"pointShadowMap",le.state.pointShadowMap,qe)),J.isSkinnedMesh){je.setOptional(z,J,"bindMatrix"),je.setOptional(z,J,"bindMatrixInverse");const rt=J.skeleton;rt&&(rt.boneTexture===null&&rt.computeBoneTexture(),je.setValue(z,"boneTexture",rt.boneTexture,qe))}J.isBatchedMesh&&(je.setOptional(z,J,"batchingTexture"),je.setValue(z,"batchingTexture",J._matricesTexture,qe),je.setOptional(z,J,"batchingIdTexture"),je.setValue(z,"batchingIdTexture",J._indirectTexture,qe),je.setOptional(z,J,"batchingColorTexture"),J._colorsTexture!==null&&je.setValue(z,"batchingColorTexture",J._colorsTexture,qe));const Ke=j.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&te.update(J,j,At),(on||oe.receiveShadow!==J.receiveShadow)&&(oe.receiveShadow=J.receiveShadow,je.setValue(z,"receiveShadow",J.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&k.environment!==null&&(_t.envMapIntensity.value=k.environmentIntensity),_t.dfgLUT!==void 0&&(_t.dfgLUT.value=_g()),on){if(je.setValue(z,"toneMappingExposure",w.toneMappingExposure),oe.needsLights&&ui(_t,jt),be&&$.fog===!0&&xe.refreshFogUniforms(_t,be),xe.refreshMaterialUniforms(_t,$,Ae,Ee,S.state.transmissionRenderTarget[T.id]),oe.needsLights&&oe.numLightProbeGrids>0){const rt=A;let Et=0;for(const Tt of S.state.lightProbeGridArray)Tt.texture!==null&&(rt.textures[Et]=Tt.texture,rt.min[Et]=Tt.boundingBox.min,rt.max[Et]=Tt.boundingBox.max,rt.resolution[Et]=Tt.resolution,Et++);for(const Tt in rt)rt[Tt].length=Et;_t.probesSH.value=rt.textures,_t.probesMin.value=rt.min,_t.probesMax.value=rt.max,_t.probesResolution.value=rt.resolution}dr.upload(z,is(oe),_t,qe)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(dr.upload(z,is(oe),_t,qe),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&je.setValue(z,"center",J.center),je.setValue(z,"modelViewMatrix",J.modelViewMatrix),je.setValue(z,"normalMatrix",J.normalMatrix),je.setValue(z,"modelMatrix",J.matrixWorld),$.uniformsGroups!==void 0){const rt=$.uniformsGroups;for(let Et=0,Tt=rt.length;Et<Tt;Et++){const Oe=rt[Et];Ue.update(Oe,At),Ue.bind(Oe,At)}}return At}function ui(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Ds(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return he},this.setRenderTargetTextures=function(T,k,j){const $=He.get(T);$.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),He.get(T.texture).__webglTexture=k,He.get(T.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:j,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const j=He.get(T);j.__webglFramebuffer=k,j.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,j=0){he=T,W=k,K=j;let $=null,J=!1,be=!1;if(T){const Te=He.get(T);if(Te.__useDefaultFramebuffer!==void 0){pe.bindFramebuffer(z.FRAMEBUFFER,Te.__webglFramebuffer),ae.copy(T.viewport),fe.copy(T.scissor),Le=T.scissorTest,pe.viewport(ae),pe.scissor(fe),pe.setScissorTest(Le),Z=-1;return}else if(Te.__webglFramebuffer===void 0)qe.setupRenderTarget(T);else if(Te.__hasExternalTextures)qe.rebindTextures(T,He.get(T.texture).__webglTexture,He.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const N=T.depthTexture;if(Te.__boundDepthTexture!==N){if(N!==null&&He.has(N)&&(T.width!==N.image.width||T.height!==N.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");qe.setupDepthRenderbuffer(T)}}const v=T.texture;(v.isData3DTexture||v.isDataArrayTexture||v.isCompressedArrayTexture)&&(be=!0);const R=He.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(R[k])?$=R[k][j]:$=R[k],J=!0):T.samples>0&&qe.useMultisampledRTT(T)===!1?$=He.get(T).__webglMultisampledFramebuffer:Array.isArray(R)?$=R[j]:$=R,ae.copy(T.viewport),fe.copy(T.scissor),Le=T.scissorTest}else ae.copy(Be).multiplyScalar(Ae).floor(),fe.copy(at).multiplyScalar(Ae).floor(),Le=ut;if(j!==0&&($=H),pe.bindFramebuffer(z.FRAMEBUFFER,$)&&pe.drawBuffers(T,$),pe.viewport(ae),pe.scissor(fe),pe.setScissorTest(Le),J){const Te=He.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,Te.__webglTexture,j)}else if(be){const Te=k;for(let v=0;v<T.textures.length;v++){const R=He.get(T.textures[v]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+v,R.__webglTexture,j,Te)}}else if(T!==null&&j!==0){const Te=He.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Te.__webglTexture,j)}Z=-1};function ss(T){const k=He.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=lt.textureFormatReadable(T.format),k.__typeReadable=lt.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,j,$,J,be,De,Te=0){if(!(T&&T.isWebGLRenderTarget)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let v=He.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(v=v[De],Array.isArray(v)&&(v=v[0])),v){pe.bindFramebuffer(z.FRAMEBUFFER,v);try{const R=T.textures[Te],N=R.format,X=R.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te);const B=ss(R);if(B.__formatReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(B.__typeReadable===!1){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-$&&j>=0&&j<=T.height-J&&z.readPixels(k,j,$,J,_e.convert(N),_e.convert(X),be)}finally{const R=he!==null?He.get(he).__webglFramebuffer:null;pe.bindFramebuffer(z.FRAMEBUFFER,R)}}},this.readRenderTargetPixelsAsync=async function(T,k,j,$,J,be,De,Te=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let v=He.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&De!==void 0&&(v=v[De],Array.isArray(v)&&(v=v[0])),v)if(k>=0&&k<=T.width-$&&j>=0&&j<=T.height-J){pe.bindFramebuffer(z.FRAMEBUFFER,v);const R=T.textures[Te],N=R.format,X=R.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Te);const B=ss(R);if(B.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(B.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ce=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ce),z.bufferData(z.PIXEL_PACK_BUFFER,be.byteLength,z.STREAM_READ),z.readPixels(k,j,$,J,_e.convert(N),_e.convert(X),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Y=he!==null?He.get(he).__webglFramebuffer:null;pe.bindFramebuffer(z.FRAMEBUFFER,Y);const Se=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await yu(z,Se,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ce),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,be),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(ce),z.deleteSync(Se),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,j=0){const $=Math.pow(2,-j),J=Math.floor(T.image.width*$),be=Math.floor(T.image.height*$),De=k!==null?k.x:0,Te=k!==null?k.y:0;qe.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,j,0,0,De,Te,J,be),pe.unbindTexture()},this.copyTextureToTexture=function(T,k,j=null,$=null,J=0,be=0){let De,Te,v,R,N,X,B,ce,Y;const Se=T.isCompressedTexture?T.mipmaps[be]:T.image;if(j!==null)De=j.max.x-j.min.x,Te=j.max.y-j.min.y,v=j.isBox3?j.max.z-j.min.z:1,R=j.min.x,N=j.min.y,X=j.isBox3?j.min.z:0;else{const je=Math.pow(2,-J);De=Math.floor(Se.width*je),Te=Math.floor(Se.height*je),T.isDataArrayTexture?v=Se.depth:T.isData3DTexture?v=Math.floor(Se.depth*je):v=1,R=0,N=0,X=0}$!==null?(B=$.x,ce=$.y,Y=$.z):(B=0,ce=0,Y=0);const Ie=_e.convert(k.format),Qe=_e.convert(k.type);let oe;k.isData3DTexture?(qe.setTexture3D(k,0),oe=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(qe.setTexture2DArray(k,0),oe=z.TEXTURE_2D_ARRAY):(qe.setTexture2D(k,0),oe=z.TEXTURE_2D),pe.activeTexture(z.TEXTURE0),pe.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),pe.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),pe.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const le=pe.getParameter(z.UNPACK_ROW_LENGTH),V=pe.getParameter(z.UNPACK_IMAGE_HEIGHT),Je=pe.getParameter(z.UNPACK_SKIP_PIXELS),At=pe.getParameter(z.UNPACK_SKIP_ROWS),Tn=pe.getParameter(z.UNPACK_SKIP_IMAGES);pe.pixelStorei(z.UNPACK_ROW_LENGTH,Se.width),pe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Se.height),pe.pixelStorei(z.UNPACK_SKIP_PIXELS,R),pe.pixelStorei(z.UNPACK_SKIP_ROWS,N),pe.pixelStorei(z.UNPACK_SKIP_IMAGES,X);const on=T.isDataArrayTexture||T.isData3DTexture,jt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const je=He.get(T),_t=He.get(k),Ke=He.get(je.__renderTarget),rt=He.get(_t.__renderTarget);pe.bindFramebuffer(z.READ_FRAMEBUFFER,Ke.__webglFramebuffer),pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let Et=0;Et<v;Et++)on&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,He.get(T).__webglTexture,J,X+Et),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,He.get(k).__webglTexture,be,Y+Et)),z.blitFramebuffer(R,N,R+De,N+Te,B,ce,B+De,ce+Te,z.DEPTH_BUFFER_BIT,z.NEAREST);pe.bindFramebuffer(z.READ_FRAMEBUFFER,null),pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(J!==0||T.isRenderTargetTexture||He.has(T)){const je=He.get(T),_t=He.get(k);pe.bindFramebuffer(z.READ_FRAMEBUFFER,L),pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,I);for(let Ke=0;Ke<v;Ke++)on?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,je.__webglTexture,J,X+Ke):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,je.__webglTexture,J),jt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,_t.__webglTexture,be,Y+Ke):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,_t.__webglTexture,be),J!==0?z.blitFramebuffer(R,N,R+De,N+Te,B,ce,B+De,ce+Te,z.COLOR_BUFFER_BIT,z.NEAREST):jt?z.copyTexSubImage3D(oe,be,B,ce,Y+Ke,R,N,De,Te):z.copyTexSubImage2D(oe,be,B,ce,R,N,De,Te);pe.bindFramebuffer(z.READ_FRAMEBUFFER,null),pe.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else jt?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(oe,be,B,ce,Y,De,Te,v,Ie,Qe,Se.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(oe,be,B,ce,Y,De,Te,v,Ie,Se.data):z.texSubImage3D(oe,be,B,ce,Y,De,Te,v,Ie,Qe,Se):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,be,B,ce,De,Te,Ie,Qe,Se.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,be,B,ce,Se.width,Se.height,Ie,Se.data):z.texSubImage2D(z.TEXTURE_2D,be,B,ce,De,Te,Ie,Qe,Se);pe.pixelStorei(z.UNPACK_ROW_LENGTH,le),pe.pixelStorei(z.UNPACK_IMAGE_HEIGHT,V),pe.pixelStorei(z.UNPACK_SKIP_PIXELS,Je),pe.pixelStorei(z.UNPACK_SKIP_ROWS,At),pe.pixelStorei(z.UNPACK_SKIP_IMAGES,Tn),be===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&z.generateMipmap(oe),pe.unbindTexture()},this.initRenderTarget=function(T){He.get(T).__webglFramebuffer===void 0&&qe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?qe.setTextureCube(T,0):T.isData3DTexture?qe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?qe.setTexture2DArray(T,0):qe.setTexture2D(T,0),pe.unbindTexture()},this.resetState=function(){W=0,K=0,he=null,pe.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}const Rl={type:"change"},po={type:"start"},Rc={type:"end"},rr=new ws,Cl=new kn,vg=Math.cos(70*vs.DEG2RAD),Ot=new G,tn=2*Math.PI,xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ia=1e-6;class Mg extends Eh{constructor(e,t=null){super(e,t),this.state=xt.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zi.ROTATE,MIDDLE:Zi.DOLLY,RIGHT:Zi.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new hn,this._lastTargetPosition=new G,this._quat=new hn().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rl,this._sphericalDelta=new rl,this._scale=1,this._panOffset=new G,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new G,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yg.bind(this),this._onPointerDown=Sg.bind(this),this._onPointerUp=Eg.bind(this),this._onContextMenu=Pg.bind(this),this._onMouseWheel=Ag.bind(this),this._onKeyDown=wg.bind(this),this._onTouchStart=Rg.bind(this),this._onTouchMove=Cg.bind(this),this._onMouseDown=bg.bind(this),this._onMouseMove=Tg.bind(this),this._interceptControlDown=Dg.bind(this),this._interceptControlUp=Lg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=xt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rl),this.update(),this.state=xt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=tn:n>Math.PI&&(n-=tn),s<-Math.PI?s+=tn:s>Math.PI&&(s-=tn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ot.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new G(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(rr.origin.copy(this.object.position),rr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rr.direction))<vg?this.object.lookAt(this.target):(Cl.setFromNormalAndCoplanarPoint(this.object.up,this.target),rr.intersectPlane(Cl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ia||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ia||this._lastTargetPosition.distanceToSquared(this.target)>ia?(this.dispatchEvent(Rl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ot.copy(s).sub(this.target);let r=Ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new We,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Sg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function yg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Eg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rc),this.state=xt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function bg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=xt.DOLLY;break;case Zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}break;case Zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(po)}function Tg(i){switch(this.state){case xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ag(i){this.enabled===!1||this.enableZoom===!1||this.state!==xt.NONE||(i.preventDefault(),this.dispatchEvent(po),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Rc))}function wg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Rg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1){this.state=xt.NONE;break}this._handleTouchStartRotate(i),this.state=xt.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1){this.state=xt.NONE;break}this._handleTouchStartPan(i),this.state=xt.TOUCH_PAN;break;default:this.state=xt.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=xt.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=xt.TOUCH_DOLLY_ROTATE;break;default:this.state=xt.NONE}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(po)}function Cg(i){switch(this._trackPointer(i),this.state){case xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=xt.NONE}}function Pg(i){this.enabled!==!1&&i.preventDefault()}function Dg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const fs=new G;function fn(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;fs.copy(e),fs[n]=0,fs.normalize();const l=.5*a/(a+o),p=1-fs.angleTo(i)/c;return Math.sign(fs[t])===1?p*l:o/(a+o)+l+l*(1-p)}class Er extends Vt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new G,l=new G,p=new G(e,t,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,h=this.attributes.normal.array,g=this.attributes.uv.array,_=m.length/6,E=new G,u=.5/a;for(let f=0,x=0;f<m.length;f+=3,x+=2)switch(c.fromArray(m,f),l.copy(c),l.x-=Math.sign(l.x)*u,l.y-=Math.sign(l.y)*u,l.z-=Math.sign(l.z)*u,l.normalize(),m[f+0]=p.x*Math.sign(c.x)+l.x*r,m[f+1]=p.y*Math.sign(c.y)+l.y*r,m[f+2]=p.z*Math.sign(c.z)+l.z*r,h[f+0]=l.x,h[f+1]=l.y,h[f+2]=l.z,Math.floor(f/_)){case 0:E.set(1,0,0),g[x+0]=fn(E,l,"z","y",r,n),g[x+1]=1-fn(E,l,"y","z",r,t);break;case 1:E.set(-1,0,0),g[x+0]=1-fn(E,l,"z","y",r,n),g[x+1]=1-fn(E,l,"y","z",r,t);break;case 2:E.set(0,1,0),g[x+0]=1-fn(E,l,"x","z",r,e),g[x+1]=fn(E,l,"z","x",r,n);break;case 3:E.set(0,-1,0),g[x+0]=1-fn(E,l,"x","z",r,e),g[x+1]=1-fn(E,l,"z","x",r,n);break;case 4:E.set(0,0,1),g[x+0]=1-fn(E,l,"x","y",r,e),g[x+1]=1-fn(E,l,"y","x",r,t);break;case 5:E.set(0,0,-1),g[x+0]=fn(E,l,"x","y",r,e),g[x+1]=1-fn(E,l,"y","x",r,t);break}}static fromJSON(e){return new Er(e.width,e.height,e.depth,e.segments,e.radius)}}function Wn(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Xt;c.morphTargetsRelative=o;let l=0;for(let p=0;p<i.length;++p){const m=i[p];let h=0,g=0;if(t!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in m.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(m.attributes[_]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". Make sure all geometries have the same number of attributes."),null;if(o!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in m.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+".  .morphAttributes must be consistent throughout all geometries."),null;if(m.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;a[_]===void 0&&(a[_]=[]),a[_].push(m.morphAttributes[_]),g++}if(g!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". Make sure all geometries have the same number of morph attributes."),null;if(e){let _;if(t)_=m.index.count;else if(m.attributes.position!==void 0)_=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,p),l+=_}}if(t){let p=0;const m=[];for(let h=0;h<i.length;++h){const g=i[h].index;for(let _=0;_<g.count;++_)m.push(g.getX(_)+p);p+=i[h].attributes.position.count}c.setIndex(m)}for(const p in r){const m=Pl(r[p]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" attribute."),null;c.setAttribute(p,m)}for(const p in a){const m=a[p][0].length;if(m!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[p]=[];for(let h=0;h<m;++h){const g=[];for(let E=0;E<a[p].length;++E)g.push(a[p][E][h]);const _=Pl(g);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" morphAttribute."),null;c.morphAttributes[p].push(_)}}}return c}function Pl(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const p=i[l];if(e===void 0&&(e=p.array.constructor),e!==p.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=p.itemSize),t!==p.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=p.normalized),n!==p.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=p.gpuType),s!==p.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=p.count*t}const a=new e(r),o=new an(a,t,n);let c=0;for(let l=0;l<i.length;++l){const p=i[l];if(p.isInterleavedBufferAttribute){const m=c/t;for(let h=0,g=p.count;h<g;h++)for(let _=0;_<t;_++){const E=p.getComponent(h,_);o.setComponent(h+m,_,E)}}else a.set(p.array,c);c+=p.count*t}return s!==void 0&&(o.gpuType=s),o}const Ig=128,Ng=8,Ug=-36.75,Fg=-28,Og=10.5,Bg=12,zg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],It={capacity:Ig,columns:Ng,startX:Ug,startZ:Fg,spacingX:Og,spacingZ:Bg,boxes:zg};function wr(i){return Number.isInteger(i)&&i>=0&&i<It.capacity?{slot:i,x:It.startX+i%It.columns*It.spacingX,z:It.startZ-Math.floor(i/It.columns)*It.spacingZ}:null}function Gg(i,e=i,t=null,n=It.capacity){const s=[],r=Math.min(i.x,e.x)-.4,a=Math.max(i.x,e.x)+.4,o=Math.min(i.z,e.z)-.4,c=Math.max(i.z,e.z)+.4,l=Math.max(0,Math.ceil((r-5.1-It.startX)/It.spacingX)),p=Math.min(It.columns-1,Math.floor((a+5.1-It.startX)/It.spacingX)),m=Math.max(0,Math.ceil((It.startZ-c-5.3)/It.spacingZ)),h=Math.min(Math.ceil(It.capacity/It.columns)-1,Math.floor((It.startZ-o+5.3)/It.spacingZ));for(let g=m;g<=h;g++)for(let _=l;_<=p;_++){const E=g*It.columns+_,u=wr(E);if(!(!u||E>=n))for(const f of It.boxes)f.tag==="home-door"&&E===t||s.push({left:u.x+f.x-f.w/2,right:u.x+f.x+f.w/2,back:u.z+f.z-f.d/2,front:u.z+f.z+f.d/2,top:f.top,tag:f.tag})}return s}function qi(i,e){return!!(e&&i&&Math.abs(i.x-e.x)<4.4&&Math.abs(i.z-e.z)<3.7)}function Hg({scene:i,material:e,ownedGeometries:t}){const s=Array(128).fill(null),r=new Map,a=new Map,o=[],c=new Set,l=new ct,p=new hn,m=new G(1,1,1),h=new ct().makeScale(0,0,0);let g=null,_=1,E=0;const u={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function f(w,P,F,H,L,I="inside",W=0){P=u[P]||P;let K=w;K.index&&(K=w.toNonIndexed(),w.dispose()),p.setFromEuler(new Un(0,0,W)),K.applyMatrix4(l.compose(new G(F,H,L),p,m));const he=`${I}:${P}`;a.has(he)||a.set(he,{layer:I,color:P,geometries:[]}),a.get(he).geometries.push(K)}const x=(w,P,F,H,L,I,W,K="inside",he=0)=>f(new Vt(w,P,F),W,H,L,I,K,he),C=(w,P,F,H,L,I)=>f(new bn(w,w,P,10),I,F,H,L);function A(w,P,F,H,L){f(new xi(w,9,6),L,P,F,H)}x(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),x(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),x(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),x(9.2,.08,7.8,0,.16,0,"#c8a178");for(let w=-4.2;w<4.5;w+=.7)x(.018,.012,7.6,w,.21,0,"#ab8965");x(3,.22,1,0,-.04,4.3,"#d7c5a7"),x(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),x(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),x(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),x(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const w of[-2.7,2.7])x(4,3.45,.18,w,1.9,3.9,"#e7dec9","front");x(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),x(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),x(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const w of[-2.85,2.85]){x(2.35,1.55,.12,w,2.05,4.04,"#71948d","front");for(const P of[-1.2,0,1.2])x(.055,1.65,.14,w+P,2.05,4.12,"#cfbb8c","front");for(const P of[1.23,2.87])x(2.45,.065,.14,w,P,4.12,"#cfbb8c","front");x(.23,.5,.14,w<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const w of[-1,1])x(4.95,.22,8.65,w*2.37,3.98,0,"#47695f","roof",w*-.18),x(4.95,.12,.12,w*2.37,3.96,4.35,"#c1a771","roof",w*-.18);x(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const w of[-2,-.5,1])x(2.25,.06,1.25,2.5,4.08,w,"#29434f","roof",-.18);x(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),x(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),x(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),x(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),x(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),x(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),x(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),C(.05,.35,-3.85,1.05,-2.4,"#bda16a"),C(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),x(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let w=0;w<4;w++)x(1.65,.024,.03,-2.15,2.88+w*.045,-3.55,"#8d9e98");x(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),x(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),x(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const w of[.98,1.91])x(.05,.37,.08,3.29,w,-2.25,"#56746a");x(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),x(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),x(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),C(.035,.3,3.45,1.45,-1.08,"#baa371"),C(.18,.3,2.1,1.43,-.75,"#e8dcc3"),x(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),x(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),x(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),x(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),C(.2,.33,.85,.43,-3.15,"#eee9de"),x(.5,.5,.22,.85,.68,-3.65,"#eee9de"),x(.55,.12,.42,1.5,1,-2.1,"#eee9de"),C(.025,1.65,1.5,1.9,-3.65,"#baa371"),x(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),x(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),x(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const w of[1.55,4.05])x(.23,.57,1,w,.72,2.45,"#a7b3a0");x(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),x(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const w of[.7,1.7])x(.08,.4,.6,w,.48,1.4,"#8c7556");x(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),x(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),x(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),x(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let w=0;w<8;w++)x(.11,.32+w%2*.1,.22,-3.2+w*.17,1.65,3.45,w%2?"#879f93":"#e2ca9e");for(const w of[-4.9,4.9]){x(.08,.7,10,w,.19,.1,"#aa9270");for(const P of[-4.7,0,4.7])x(.13,1,.13,w,.36,P,"#aa9270")}for(const w of[-3.6,3.6])C(.29,.45,w,.14,4.65,"#b58a69"),A(.4,w,.68,4.65,"#78946e");for(const{layer:w,color:P,geometries:F}of a.values()){const H=Wn(F,!1);F.forEach(I=>I.dispose()),t.add(H);const L=new oc(H,e(P),128);L.instanceMatrix.setUsage(Jl),L.count=0,L.userData.residenceLayer=w,i.add(L),o.push(L)}a.clear();const M=new Vt(1,1,1);t.add(M);const S=new gt(M,e("#b4c5ab"));S.userData.residenceGround=!0,i.add(S);const d=new gt(M,e("#e4dcc9"));i.add(d);function b(w){const P=wr(w);return{x:P.x,z:P.z}}function U(){const w=Math.max(E,s.reduce((F,H,L)=>H===null?F:L+1,0));_=Math.max(1,Math.ceil(w/8));for(const F of o){F.count=w;for(let H=0;H<w;H++){const L=s[H],I=b(H);L===null&&H>=E||L!==null&&L===g&&["roof","front"].includes(F.userData.residenceLayer)?F.setMatrixAt(H,h):F.userData.residenceLayer==="door"?F.setMatrixAt(H,l.compose(new G(I.x-.65,0,I.z+3.99),new hn().setFromAxisAngle(new G(0,1,0),c.has(L)?-Math.PI/2:0),m)):F.setMatrixAt(H,l.compose(new G(I.x,0,I.z),new hn,m))}F.instanceMatrix.needsUpdate=!0,F.computeBoundingSphere()}const P=_*12+4;S.scale.set(86,.3,P),S.position.set(0,-.55,-20-P/2),d.scale.set(1.5,.04,P),d.position.set(0,-.12,-20-P/2),S.visible=d.visible=w>0}return{meshes:o,slotFor:w=>r.get(w),setPlots(w){E=Math.min(128,Math.max(0,Number(w)||0)),U()},sync(w){const P=new Set(w.slice(0,128).map(F=>F.id));for(const[F,H]of r)P.has(F)||(s[H]=null,r.delete(F));for(const F of w.slice(0,128)){const H=F.home_slot;Number.isInteger(H)&&H>=0&&H<128&&r.get(F.id)!==H&&(r.has(F.id)&&(s[r.get(F.id)]=null),r.delete(F.id))}for(const F of w.slice(0,128)){const H=F.home_slot;Number.isInteger(H)&&H>=0&&H<128&&s[H]===null&&(s[H]=F.id,r.set(F.id,H))}for(const F of[...P].sort((H,L)=>H-L))if(!r.has(F)){const H=s.indexOf(null);s[H]=F,r.set(F,H)}r.has(g)||(g=null),U()},select(w){g=r.has(w)?w:null,U()},setDoor(w,P){P?c.add(w):c.delete(w),U()},location(w){const P=r.get(w);return P===void 0?null:b(P)},bed(w){const P=this.location(w);return P?[P.x-2.05,.92,P.z-.5]:null},cameraBoxes(w){const P=this.location(w);if(!P)return[];const F=(L,I,W,K,he)=>({left:P.x+L-W/2,right:P.x+L+W/2,back:P.z+I-K/2,front:P.z+I+K/2,top:he}),H=[F(-4.6,0,.18,7.8,3.6),F(0,-3.9,9.4,.18,3.6),F(3.65,-2.78,1.05,.92,2.3),F(2.95,-.75,2.62,.95,1.3),F(2.8,2.45,2.6,1.2,1.3)];return w!==g&&H.push(F(4.6,0,.18,7.8,3.6),F(0,3.9,9.4,.18,3.6)),H},personForHit(w){return w?.object?.userData?.residenceLayer&&Number.isInteger(w.instanceId)?s[w.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-_*12,front:-20}},dispose(){o.forEach(w=>{w.dispose(),i.remove(w)}),i.remove(S,d),r.clear(),s.fill(null)}}}const kg={minX:-100,maxX:100,minZ:-216,maxZ:92},Vg={x:0,y:-.12,z:20},Wg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},Cn={bounds:kg,spawn:Vg,venues:Wg};function Xg(){const i=[],{minX:e,maxX:t,minZ:n,maxZ:s}=Cn.bounds,r=.5,a=.3,o=Math.round((t-e)/r)+1,c=Math.round((s-n)/r)+1;let l=null,p=!1,m=null,h=128;const g=(M,S=M)=>p?Gg(M,S,m,h):[];function _(M,S){return M>=e+a&&M<=t-a&&S>=n+a&&S<=s-a&&!i.concat(g({x:M,z:S})).some(d=>M>d.left-a&&M<d.right+a&&S>d.back-a&&S<d.front+a)}function E(M,S){if(!_(S.x,S.z))return!1;for(const d of i.concat(g(M,S))){let b=0,U=1;for(const[w,P,F]of[["x",d.left-a,d.right+a],["z",d.back-a,d.front+a]]){const H=S[w]-M[w];if(Math.abs(H)<1e-8){if(M[w]<=P||M[w]>=F){b=2;break}}else{const L=(P-M[w])/H,I=(F-M[w])/H;b=Math.max(b,Math.min(L,I)),U=Math.min(U,Math.max(L,I))}}if(b<=U&&U>0&&b<1)return!1}return!0}function u(){if(!l){l=new Uint8Array(o*c).fill(1);for(let M=0;M<c;M++)for(let S=0;S<o;S++)(S===0||M===0||S===o-1||M===c-1)&&(l[M*o+S]=0);for(const M of i.concat(g({x:e,z:n},{x:t,z:s}))){const S=Math.max(0,Math.ceil((M.left-.4-e)/r)),d=Math.min(o-1,Math.floor((M.right+.4-e)/r)),b=Math.max(0,Math.ceil((M.back-.4-n)/r)),U=Math.min(c-1,Math.floor((M.front+.4-n)/r));for(let w=b;w<=U;w++)for(let P=S;P<=d;P++)l[w*o+P]=0}}}function f(M,S,d){const b=S.x-M.x,U=S.z-M.z,w=b*b+U*U;return d.every(P=>{const F=w?Math.max(0,Math.min(1,((P.x-M.x)*b+(P.z-M.z)*U)/w)):0;return Math.hypot(M.x+b*F-P.x,M.z+U*F-P.z)>=.62})}function x(M,S=null,d=[]){u();const b=Math.round((M.x-e)/r),U=Math.round((M.z-n)/r);let w=-1,P=1/0;for(let F=-6;F<=6;F++)for(let H=-6;H<=6;H++){const L=b+H,I=U+F,W=I*o+L;if(L<0||I<0||L>=o||I>=c||!(S||l)[W])continue;const K=(e+L*r-M.x)**2+(n+I*r-M.z)**2;_(M.x,M.z)&&!E(M,{x:e+L*r,z:n+I*r})||f(M,{x:e+L*r,z:n+I*r},d)&&K<P&&(w=W,P=K)}return w}function C(M){return{x:e+M%o*r,z:n+Math.floor(M/o)*r}}function A(M,S,d=[]){if(E(M,S)&&f(M,S,d))return[{x:S.x,z:S.z}];u();const b=d.length?l.slice():l;for(const Z of d){const se=Math.round((Z.x-e)/r),ae=Math.round((Z.z-n)/r);for(let fe=-2;fe<=2;fe++)for(let Le=-2;Le<=2;Le++){const ee=se+Le,Me=ae+fe;ee>=0&&Me>=0&&ee<o&&Me<c&&Math.hypot(e+ee*r-Z.x,n+Me*r-Z.z)<.76&&(b[Me*o+ee]=0)}}const U=x(M,b,d),w=x(S,b,d);if(U<0||w<0)return[];const P=[],F=new Float64Array(o*c).fill(1/0),H=new Int32Array(o*c).fill(-1),L=new Uint8Array(o*c),I=Z=>Math.abs(Z%o-w%o)+Math.abs(Math.floor(Z/o)-Math.floor(w/o));function W(Z,se){P.push({index:Z,score:se});let ae=P.length-1;for(;ae>0;){const fe=ae-1>>1;if(P[fe].score<=se)break;[P[ae],P[fe]]=[P[fe],P[ae]],ae=fe}}function K(){const Z=P[0],se=P.pop();if(P.length){P[0]=se;let ae=0;for(;;){let fe=ae,Le=ae*2+1,ee=Le+1;if(Le<P.length&&P[Le].score<P[fe].score&&(fe=Le),ee<P.length&&P[ee].score<P[fe].score&&(fe=ee),fe===ae)break;[P[ae],P[fe]]=[P[fe],P[ae]],ae=fe}}return Z.index}F[U]=0,W(U,I(U));let he=0;for(;P.length&&he++<o*c;){const Z=K();if(L[Z])continue;if(L[Z]=1,Z===w){const fe=[];let Le=Z;for(;Le!==U;)fe.push(C(Le)),Le=H[Le];return fe.reverse(),_(S.x,S.z)&&E(fe.at(-1)||C(U),S)&&f(fe.at(-1)||C(U),S,d)&&fe.push({x:S.x,z:S.z}),_(M.x,M.z)&&fe.unshift(C(U)),fe}const se=Z%o,ae=Math.floor(Z/o);for(const[fe,Le]of[[1,0],[-1,0],[0,1],[0,-1]]){const ee=se+fe,Me=ae+Le,Re=Me*o+ee;if(ee<0||Me<0||ee>=o||Me>=c||!b[Re]||L[Re]||!E(C(Z),C(Re))||!f(C(Z),C(Re),d))continue;const Ee=F[Z]+1;Ee<F[Re]&&(F[Re]=Ee,H[Re]=Z,W(Re,Ee+I(Re)))}}return[]}return{configureHomes(M,S=null,d=h){p===!!M&&S===m&&d===h||(p=!!M,m=S,h=d,l=null)},withHomeAccess(M,S){if(!p||M===void 0||M===m)return S();const d=m,b=l;m=M,l=null;try{return S()}finally{m=d,l=b}},groundHeight(M){if(!p)return-.12;const S=Math.round((M.x+36.75)/10.5),d=Math.round((-28-M.z)/12);return S>=0&&S<8&&d>=0&&qi(M,wr(d*8+S))?.22:-.12},boxes:()=>i.map(M=>({...M})),slide(M,S){return E(M,S)?{x:S.x,z:S.z}:E(M,{x:S.x,z:M.z})?{x:S.x,z:M.z}:E(M,{x:M.x,z:S.z})?{x:M.x,z:S.z}:{x:M.x,z:M.z}},addBox(M,S,d,b,U="",w=2){i.push({left:d-M/2,right:d+M/2,back:b-S/2,front:b+S/2,top:w,tag:U}),l=null},cameraLimit(M,S,d=[]){let b=1;for(const U of i.concat(d)){let w=0,P=1;for(const[F,H,L]of[["x",U.left-.15,U.right+.15],["z",U.back-.15,U.front+.15],["y",-.3,U.top+.15]]){const I=S[F]-M[F];if(Math.abs(I)<1e-8){if(M[F]<H||M[F]>L){w=2;break}}else{const W=(H-M[F])/I,K=(L-M[F])/I;w=Math.max(w,Math.min(W,K)),P=Math.min(P,Math.max(W,K))}}w<=P&&w>.01&&w<b&&(b=Math.max(.02,w-.015))}return b},free:_,segment:E,path:A,nearest(M){const S=x(M);return S<0?null:C(S)},move(M,S,d){const b=Math.hypot(S.x-M.x,S.z-M.z),U=b>0?Math.min(1,d/b):0,w={x:M.x+(S.x-M.x)*U,z:M.z+(S.z-M.z)*U};return E(M,w)?w:{x:M.x,z:M.z}}}}function qg({scene:i,ownedGeometries:e,materials:t,sun:n,hemi:s,fill:r,navigation:a=null}){const o=new pn;i.add(o);const c=we=>(e.add(we),we);function l(we,Ne){const nt=new As(Ne);return t.set("environment:"+we,nt),nt}const p=l("grass",{color:"#a5b99a",roughness:1}),m=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),h=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),g=l("forest",{color:"#4c7262",roughness:1}),_=new gt(c(new ri(850,850)),p);_.rotation.x=-Math.PI/2,_.position.y=-1.3,o.add(_);const E=[],u=[],f=[],x=new ct,C=new hn;function A(we,Ne,nt,Ve,Ge,dt=1,wt=1,St=1){const Nt=we.index?we.toNonIndexed():we;Nt!==we&&we.dispose(),Nt.applyMatrix4(x.compose(new G(nt,Ve,Ge),C,new G(dt,wt,St))),Ne.push(Nt)}for(let we=0;we<20;we++){const Ne=we/20*Math.PI*2,nt=Math.cos(Ne)*(155+we%3*18),Ve=-70+Math.sin(Ne)*230,Ge=35+we%5*13,dt=25+we%4*9;A(new Zn(dt,Ge,7),E,nt,Ge/2-1.3,Ve,1.2,1,1),A(new Zn(dt*.28,Ge*.28,7),u,nt,Ge*.86-1.25,Ve,1.2,1,1)}for(let we=0;we<100;we++){const Ne=we%2?-1:1,nt=Ne*(51+we%9*4),Ve=-210+Math.floor(we/2)*5.4,Ge=3.5+we%4;A(new Zn(1.3+we%3*.25,Ge,6),f,nt,Ge/2-.8,Ve),Ve>=-22&&Ve<=92&&a?.addBox(2.6,2.6,nt,Ve,"forest-tree",Ge)}function M(we,Ne){const nt=c(Wn(we,!1));we.forEach(Ge=>Ge.dispose());const Ve=new gt(nt,Ne);return o.add(Ve),Ve}const S=M(E,m),d=M(u,h),b=M(f,g),U=[];for(let we=0;we<14;we++)for(let Ne=0;Ne<4;Ne++)A(new xi(1,9,6),U,-100+we%7*32+(Ne-1.5)*4,29+we%4*4+Ne%2*1.5,-120+Math.floor(we/7)*165,7,3.2,4.8);const w=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),P=M(U,w),F=6e3,H=new Float32Array(F*3),L=new Float32Array(F*6),I=[];for(let we=0;we<F;we++)I.push({x:we*73.31%64-32,y:we*17.73%32,z:we*41.71%70-35});const W=c(new Xt);W.setAttribute("position",new an(H,3)),W.setDrawRange(0,320);const K=new cc({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});t.set("environment:particles",K);const he=new uh(W,K);he.frustumCulled=!1,o.add(he);const Z=c(new Xt);Z.setAttribute("position",new an(L,3));const se=new lc({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});t.set("environment:rain-streaks",se);const ae=new ch(Z,se);ae.frustumCulled=!1,o.add(ae);const fe=c(new ri(260,24,48,4)),Le=new Float32Array(fe.attributes.position.count*3);for(let we=0;we<fe.attributes.position.count;we++)new tt().setHSL(.38+we%49/49*.34,.75,.62).toArray(Le,we*3);fe.setAttribute("color",new an(Le,3));const ee=new Vn({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:Jt,blending:fr});t.set("environment:aurora",ee);const Me=new gt(fe,ee);Me.position.set(0,55,-235),o.add(Me);const Re=fe.attributes.position.array.slice();let Ee={},Ae=0,ke="",Mt="",Be=!1,at=-60;const ut={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function et(we){const Ne=Uc(Ee,Date.now()+Ae).mode;if(Ne===ke&&Mt===`${Ee.landscape}:${we}`)return;ke=Ne,Mt=`${Ee.landscape}:${we}`;const nt=ut[Ee.landscape]||ut.alps;p.color.set(nt[0]),m.color.set(nt[1]),g.color.set(nt[2]);const Ve=Ne==="aurora";i.background=new tt(Ve?"#102339":we?"#142730":Ne==="rain"?"#a6babd":Ne==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new lo(i.background,Ne==="mist"?.007:Ne==="rain"?.0035:.0013),n.intensity=Ve?.6:Ne==="rain"?1.35:we?1.65:2.7,s.intensity=Ve?1.6:we?2.05:2.6,r.intensity=Ve?1.8:1.1,w.color.set(Ne==="rain"?"#859c9f":"#f5f2e9"),K.color.set("#ffffff"),K.size=.13}return{configure(we={},Ne=!1){Ee=we.settings||{},Number.isFinite(we.server_ms)&&(Ae=we.server_ms-Date.now()),Be=Ne,S.visible=d.visible=Ee.mountains!==!1,P.visible=Ee.clouds!==!1;const nt=Ee.precipitation||"heavy",Ve=Be?900:nt==="light"?650:nt==="storm"?5800:3600;W.setDrawRange(0,Ve),Z.setDrawRange(0,Ve*2),Mt=""},update(we,{paused:Ne=!1,dark:nt=!1,center:Ve=null}={}){et(nt);const Ge=ke,dt=Ne?0:we/1e3;if(P.position.x=Ne?0:Math.sin(dt*.012)*9,he.visible=Ge==="snow",ae.visible=Ge==="rain",Me.visible=Ge==="aurora",he.visible||ae.visible){const wt=W.drawRange.count,St=Ve?.x||0,Nt=Ve?.z||0;for(let z=0;z<wt;z++){const Xe=I[z],ft=Xe.x+St+Math.sin(dt*.4+z)*(Ge==="snow"?.55:.1),lt=(Xe.y-dt*(Ge==="snow"?1.4:20)%32+32)%32,pe=Xe.z+Nt;if(Ge==="snow")H[z*3]=ft,H[z*3+1]=lt,H[z*3+2]=pe;else{const ht=z*6;L[ht]=ft,L[ht+1]=lt,L[ht+2]=pe,L[ht+3]=ft+.1,L[ht+4]=lt-.9,L[ht+5]=pe}}(Ge==="snow"?W:Z).attributes.position.needsUpdate=!0}if(Me.visible){const wt=fe.attributes.position.array;for(let St=0;St<wt.length;St+=3)wt[St+1]=Re[St+1]+Math.sin(Re[St]*.035+dt*.3)*5,wt[St+2]=Math.cos(Re[St]*.02+dt*.17)*9;fe.attributes.position.needsUpdate=!0}},extent(we){we!==at&&(at=we,b.scale.z=Math.max(1,Math.abs(we)/210))},dispose(){i.remove(o),i.fog=null,o.clear()}}}function Yg({scene:i,box:e,cylinder:t,orb:n,bake:s,sign:r,material:a,navigation:o,ownedGeometries:c,materials:l}){e(23,.16,20,-30,-.29,51,"#263e39",.14);for(let M=-40;M<=-20;M+=2)for(let S=43;S<=59;S+=2)e(1.98,.025,1.98,M,-.18,S,(M+S)/2%2?"#e8dfcb":"#d1c6ac",0);for(const M of[-41.3,-18.7])e(.15,.09,20,M,-.1,51,"gold",0),e(.35,1.4,19.8,M,.45,51,"deep"),o.addBox(.35,19.8,M,51,"grand-bar-wall",1.3);e(23,4.4,.3,-30,1.75,41,"deep"),o.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const M of[-40,-20])for(const S of[42.5,50.5,59.5])t(.35,.25,M,-.03,S,"gold"),t(.2,4.7,M,2.3,S,"white"),t(.38,.22,M,4.7,S,"gold"),o.addBox(.75,.75,M,S,"grand-bar-column",4.9);for(const M of[42.5,50.5,59.5]){e(20,.2,.35,-30,4.8,M,"gold");for(const S of[-36,-24]){const d=new ii(2,.075,6,24,Math.PI);s(d,"gold",S,3.4,M)}}e(16,1.35,1.55,-30,.46,45,"oak"),e(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),e(15.7,.06,.045,-30,.87,45.81,"gold",0),o.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const M of[41.65,42.3])e(15,.14,.7,-30,1.5+(M-41.65)*2,M,"wood");for(let M=0;M<14;M++){const S=-36.5+M;t(.11,.55,S,1.87,41.8,M%2?"#87b6a5":"#b89c68"),t(.04,.14,S,2.22,41.8,"gold")}for(const M of[-37,-34,-31,-28,-25,-22])t(.37,.16,M,.57,47.4,"deep"),t(.065,.8,M,.08,47.4,"gold"),t(.28,.06,M,-.12,47.4,"gold"),o.addBox(.75,.75,M,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[M,S,d]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){t(.025,1.7,M,4.8,S,"gold"),s(new ii(d,.035,6,28),"gold",M,4,S,Math.PI/2);for(let b=0;b<12;b++){const U=b*Math.PI/6,w=M+Math.cos(U)*d,P=S+Math.sin(U)*d;t(.014,.46,w,3.75,P,"gold"),n(.09,.19,.09,w,3.47,P,"white")}}for(const M of[-38,-22])e(2.1,.65,5.1,M,.15,54,"#856c8c",.18),e(.3,1,5.2,M+(M<-30?-.85:.85),.75,54,"#856c8c",.1),o.addBox(2.1,5.1,M,54,"velvet-booth",1.3),t(.68,.12,M+(M<-30?1.8:-1.8),.83,54,"gold"),t(.06,.9,M+(M<-30?1.8:-1.8),.32,54,"gold"),o.addBox(1.4,1.4,M+(M<-30?1.8:-1.8),54,"salon-table",.9);e(8.8,.12,6.4,-30,-.04,56,"black",.07);const p=["#87668e","#508a87","#b99c68","#5c708c"];for(let M=0;M<8;M++)for(let S=0;S<6;S++)e(1.04,.025,1.02,-33.7+M*1.06,.035,53.4+S*1.06,p[(M+S)%4],.015);for(const M of[-34.5,-25.5])e(.04,.06,6.6,M,.02,56,"gold",0);e(5.4,1.2,1.1,-30,.51,51.1,"black"),e(5.5,.12,1.2,-30,1.14,51.1,"gold"),o.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const M of[-31.4,-28.6])t(.57,.08,M,1.24,51.1,"black"),t(.15,.1,M,1.3,51.1,"gold");for(let M=0;M<6;M++)e(.1,.09,.22,-30.65+M*.25,1.26,51.3,"white",.01);for(const M of[-34.5,-25.5]){e(1,2.3,.8,M,1,51,"black");for(const S of[.45,1.35]){const d=new bn(.31,.31,.05,12);s(d,"metal",M,S,51.43,Math.PI/2)}o.addBox(1,.8,M,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),e(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const m=new As({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",m);const h=new ho(.62,2);c.add(h);const g=new gt(h,m);g.position.set(-30,4.6,56),i.add(g);const _=new Vn({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:Jt,blending:fr});l.set("rivage-beams",_);const E=new Zn(1.5,3.4,10,1,!0);c.add(E);const u=[];for(const M of[-33,-27])for(const S of[54,58]){const d=new gt(E,_);d.position.set(M,2,S),d.userData.rivageEffect="beam",i.add(d),u.push(d)}const f=[],x=new Vn({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",x);for(const[M,S,d,b,U,w,P]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const F=new Vt(S,d,b);c.add(F);const H=new gt(F,x);H.position.set(U,w,P),H.userData.officeVenue=M,i.add(H),f.push(H)}const C=p.map(M=>{const S=a(M);return S.emissive.set(M),S});let A=!0;return{targets:f,setEnabled(M){A=!!M},update(M,{paused:S,energySaver:d}){S||(g.rotation.y=M/18e3);const b=S||d||!A;for(const U of u)U.visible=!b;for(let U=0;U<C.length;U++)C[U].emissiveIntensity=b?.13:.2+Math.sin(M/4500+U)*.05}}}function Zg(i,e=Cn.spawn){let t={x:e.x,y:e.y??-.12,z:e.z,yaw:e.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle"},n=!1,s=!0;const r=(o,c,l)=>Math.max(c,Math.min(l,o));function a(o,c={},l=0,p=[]){const m=r(Number(o)||0,0,.05);let h=Number(c.x)||0,g=Number(c.z)||0;const _=Math.hypot(h,g);_>1&&(h/=_,g/=_),t.stamina<=5?s=!1:t.stamina>=30&&(s=!0);const E=!!(c.boost&&_&&s),u=E?9:4.5;t.stamina=r(t.stamina+(E?-23:14)*m,0,100);const f=(Math.cos(l)*h-Math.sin(l)*g)*u,x=(-Math.sin(l)*h-Math.cos(l)*g)*u;t.vx=f,t.vz=x,c.jump&&!n&&t.grounded&&(t.vy=7,t.grounded=!1),n=!!c.jump;const C=i.groundHeight?.(t)??-.12;t.grounded?t.y=C:(t.vy-=20*m,t.y+=t.vy*m,t.y<=C&&(t.y=C,t.vy=0,t.grounded=!0));let A=i.slide(t,{x:t.x+f*m,z:t.z+x*m});p.some(S=>Math.hypot(A.x-S.x,A.z-S.z)<.62&&Math.hypot(A.x-S.x,A.z-S.z)<=Math.hypot(t.x-S.x,t.z-S.z)+1e-4)&&(A={x:t.x,z:t.z});const M=Math.hypot(A.x-t.x,A.z-t.z)>1e-4;return t.x=A.x,t.z=A.z,M&&(t.yaw=Math.atan2(f,x)),t.action=t.grounded?M?E?"run":"walk":"idle":"jump",{...t}}return{step:a,state:()=>({...t}),reset(o){t={...t,...o,vx:0,vz:0,vy:0,grounded:(o.y??-.12)<=-.1},n=!1},face(o){t.yaw=Math.atan2(o.x-t.x,o.z-t.z)},moving:()=>!t.grounded||Math.hypot(t.vx,t.vz)>.01}}function sa(i,e){const t=Cn.venues[e];return!!(i&&t&&Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)}function Dl(i,e,t,n){const s=i.id+":"+e;if(t.has(s))return t.get(s);const r=[];function a(u,f,x,C,A,M=0){M&&u.rotateZ(M),u.translate(x,C,A);const S=u.index?u.toNonIndexed():u;S!==u&&u.dispose();const d=new tt(f),b=new Float32Array(S.attributes.position.count*3);for(let U=0;U<b.length;U+=3)b[U]=d.r,b[U+1]=d.g,b[U+2]=d.b;S.setAttribute("color",new an(b,3)),r.push(S)}const o=(u,f,x,C,A,M,S,d=0)=>a(new Vt(u,f,x),C,A,M,S,d),c=(u,f,x,C,A,M,S=u)=>a(new bn(S,u,f,10),x,C,A,M),{accent:l,hair:p,motif:m,accessory:h,hairStyle:g,shirt:_}=i;if(e==="head"){if(o(.49,.16,.45,p,0,.23,-.02),o(.45,g==="long"?.72:.29,.13,p,0,g==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(g))for(const u of[-1,1])o(.09,g==="long"?.6:.33,.32,p,u*.24,-.02,-.03);if(g==="spiky")for(let u=0;u<7;u++)a(new Zn(.11,.27+u%3*.06,5),p,(u-3)*.066,.39+Math.sin(u)*.025,-.06,(u-3)*-.16);if(g==="split"&&o(.245,.18,.46,l,.123,.24,-.015),g==="side"&&o(.26,.25,.05,p,-.12,.08,.218,-.18),g==="ponytail"&&o(.27,.5,.25,p,0,-.15,-.37),h.includes("headband")&&(o(.49,.075,.045,"#303d4b",0,.13,.225),o(.22,.07,.025,"#c6cbd0",0,.13,.254),o(.055,.025,.01,"#4d6170",0,.13,.27)),h==="mask-headband"&&(o(.44,.18,.035,l,0,-.12,.22),o(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),h==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,_,0,.395,0)),h==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),o(.055,.17,.025,"#f1e8db",0,.46,.28),o(.17,.055,.025,"#f1e8db",0,.46,.29);for(const u of[-1,1])o(.06,.33,.06,"#94745a",u*.3,.64,0,u*-.3),o(.15,.055,.06,"#94745a",u*.36,.72,0)}if(h==="bamboo"){const u=new bn(.052,.052,.35,10);u.rotateZ(Math.PI/2),a(u,"#88a970",0,-.1,.255),o(.08,.07,.03,l,.23,.23,-.03)}if(h==="turban"&&(c(.3,.17,l,0,.29,0),o(.39,.07,.46,"#d9d4c4",0,.34,0)),h==="goggles"||h==="glasses")for(const u of[-1,1])o(.19,.12,.06,l,u*.12,h==="goggles"?.23:.04,.235),o(.13,.07,.025,"#849d9a",u*.12,h==="goggles"?.23:.04,.271);if(h==="boarhood"){o(.52,.42,.43,"#95939c",0,.04,-.02),o(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const u of[-1,1])o(.12,.2,.08,"#aba2a6",u*.2,.31,0,u*-.35),o(.06,.055,.025,"#84aabb",u*.14,.07,.208)}if(h==="butterfly")for(const u of[-1,1])o(.18,.17,.045,l,u*.15,.31,-.12,u*.4);if(h==="earrings")for(const u of[-1,1])o(.045,.15,.035,"#e9d6bc",u*.26,-.19,.02);if(i.id==="naruto")for(const u of[-1,1])for(let f=0;f<3;f++)o(.08,.012,.01,"#9f7055",u*.15,-.055-f*.033,.208,u*.1)}else{if(o(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(m)){o(.028,.53,.035,l,0,1.23,.19);for(const u of[-1,1])o(.14,.37,.04,l,u*.14,1.26,.19,u*.08);if(m==="suit"&&(o(.17,.44,.035,"#ded9c8",0,1.25,.2),o(.05,.29,.025,l,0,1.3,.23)),m==="buttons")for(let u=0;u<3;u++)o(.03,.03,.035,"#eee2ba",0,1.13+u*.12,.23)}if(m==="checks"||m==="triangles"||m==="clouds")for(let u=0;u<4;u++)for(let f=0;f<4;f++){const x=(f-1.5)*.112,C=1+u*.13;m==="checks"&&(u+f)%2===0&&o(.11,.127,.025,l,x,C,.19),m==="triangles"&&(u+f)%2===0&&a(new Zn(.035,.065,3),l,x,C,.205),m==="clouds"&&u%2===0&&f%2===0&&(o(.13,.045,.03,l,x,C,.2),c(.04,.03,l,x,C+.035,.2))}if(m==="circle"&&a(new ii(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(m))if(m==="armor"){o(.43,.33,.08,l,0,1.29,.21);for(let u=0;u<3;u++)o(.32,.015,.02,"#b6a273",0,1.19+u*.07,.26)}else if(m==="split")o(.23,.54,.04,l,.12,1.2,.19);else if(m==="cape")o(.65,.89,.07,l,0,1.14,-.23),o(.65,.15,.43,l,0,1.49,-.03);else if(m==="butterfly"){for(const u of[-1,1])o(.12,.51,.07,l,u*.24,1.22,.16);o(.6,.23,.08,l,0,.89,-.2)}else for(const u of[-1,1])o(.065,.52,.04,l,u*.1,1.23,.2,u*(m==="cross"?.52:.22));if(["sword","swords","backsword"].includes(h))for(let u=0;u<(h==="swords"?3:1);u++){const f=.3+u*.06;o(.055,.83,.055,"#373d4a",f,.92,-.18,-.25),o(.09,.23,.07,l,f+.1,1.4,-.18,-.25)}if(h==="neckmask"&&o(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(h))for(const u of[-1,1])o(h==="gauntlets"?.27:.2,.2,.24,l,u*.37,.99,.05)}const E=Wn(r,!1);return r.forEach(u=>u.dispose()),n.add(E),t.set(s,E),E}function Kg(i,e,t,n=[],s=3.6,r=35){const a=t.clone().sub(e);(!Number.isFinite(a.lengthSq())||a.lengthSq()<.001)&&a.set(4,3,5),(a.length()<s||a.length()>r)&&a.setLength(vs.clamp(a.length(),s,r));const o=e.clone().add(a),c=i.cameraLimit(e,o,n);if(c>=1)return o;if(a.length()*c>=s)return e.clone().addScaledVector(a,c);for(const l of[4.5,6,9]){const p=e.clone().add(new G(a.x*.4,l,a.z*.4));if(i.cameraLimit(e,p,n)>=.99)return p}return e.clone().add(new G(0,Math.max(s,6),0))}function $g({scene:i,navigation:e,ownedGeometries:t,materials:n,sign:s}){const r=new As({vertexColors:!0,roughness:.78});n.set("hospitality",r);const a=[],o=[];for(const[c,l,p,m,h,g]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"]]){let u=function(C,A,M,S,d,b,U){let w=new Vt(C,A,M).toNonIndexed();w.translate(S,d,b);const P=new tt(U),F=new Float32Array(w.attributes.position.count*3);for(let H=0;H<F.length;H+=3)P.toArray(F,H);w.setAttribute("color",new an(F,3)),E.push(w)};const _=new pn;_.position.set(l,-.12,p),_.userData.hospitality=h,i.add(_);const E=[];if(u(.49,.66,.32,0,1.15,0,g),u(.41,.45,.4,0,1.7,0,"#e4b492"),u(.46,.16,.45,0,1.96,-.02,m?"#51352e":"#29272d"),u(.46,m?.65:.27,.13,0,m?1.66:1.82,-.21,m?"#51352e":"#29272d"),m){for(const C of[-1,1])u(.07,.43,.29,C*.23,1.74,-.03,"#51352e"),u(.05,.025,.02,C*.13,1.65,.209,"#cf8790");u(.58,.3,.38,0,.81,0,g)}for(const C of[-1,1])u(.035,.04,.025,C*.1,1.73,.207,"#253b36"),u(.18,.65,.2,C*.14,.45,0,"#263e39"),u(.22,.13,.33,C*.14,.08,.06,"#1c2b28"),u(.16,.4,.2,C*.33,1.2,0,g),u(.15,.26,.16,C*.33,.9,.04,"#e4b492");u(.09,.025,.025,0,1.58,.21,"#b66c78"),(h==="hostess"||h==="bartender")&&(u(.3,.49,.035,0,1.02,.18,m?"#c6a971":"#253e38"),u(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),u(.1,.07,.04,0,1.44,.19,"#374941"),u(.45,.04,.3,.36,.89,.17,"#c5ab71"),u(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const f=Wn(E,!1);E.forEach(C=>C.dispose()),t.add(f);const x=new gt(f,r);x.userData.officeVenue=h==="dj"?"disco":"bar",_.add(x),o.push(x),a.push(_),e.addBox(.68,.68,l,p,"hospitality-npc",2.1),h==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,p)}return{targets:o,update(c,l){a.forEach((p,m)=>{p.rotation.y=m<2?Math.sin((l?0:c)/4500+m)*.1:0,p.children[0].position.y=l?0:Math.sin(c/1800+m)*.018})}}}const Rn=(i,e,t)=>i+(e-i)*t;function Jg(i,e,{time:t=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(e?.action),a=e?.action==="run",o=e?.action==="rest",c=o&&["recline","nap"].includes(e.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),p=r?Math.sin(t*(a?13:8))*(a?.78:.48):0;let m=r?a?.16:.06:0,h=r?Math.abs(Math.sin(t*(a?13:8)))*(a?.07:.035):s?0:Math.sin(t*1.8)*.012;const g=[p,-p],_=[-p*.85,p*.85],E=[0,0];e?.action==="jump"&&(m=-.12,g.fill(.5),_.fill(-.7),h=0),o&&(m=c?e.pose==="nap"?-Math.PI/2:-1.38:.04,h=c?.4:-.5,g.fill(c?0:-1.25),_.fill(c?-.08:e.pose==="meditate"?-.4:-.8),e.pose==="meditate"&&(E[0]=-.3,E[1]=.3),s||(h+=Math.sin(t*1.4)*.007)),e?.action==="play"&&(_[1]=-.8+(s?0:Math.sin(t*3)*.45),_[0]=-.3,m=.07),e?.action==="drink"&&(_[1]=-1.2+(s?0:Math.sin(t*1.8)*.08)),e?.action==="eat"&&(_[0]=-1),e?.action==="dance"&&(_[0]=-.8,_[1]=-.7,g[0]=s?0:Math.sin(t*2.4)*.2,g[1]=-g[0]),i.body.rotation.x=Rn(i.body.rotation.x,m,l),i.body.position.y=Rn(i.body.position.y,h,l),i.body.rotation.z=Rn(i.body.rotation.z,e?.action==="dance"&&!s?Math.sin(t*2.4)*.12:0,l),i.legs.forEach((f,x)=>{f.rotation.x=Rn(f.rotation.x,g[x],l),f.rotation.z=Rn(f.rotation.z,E[x],l)}),i.arms.forEach((f,x)=>{f.rotation.x=Rn(f.rotation.x,_[x],l),f.rotation.z=Rn(f.rotation.z,a?x?-.12:.12:0,l)}),i.head.rotation.x=Rn(i.head.rotation.x,c&&e.pose==="recline"?.2:0,l),i.head.rotation.y=Rn(i.head.rotation.y,0,l);const u=o&&e.pose==="nap"?.15:!s&&t%5.3<.12?.25:1;return i.eyes.forEach(f=>f.scale.y=Rn(f.scale.y,u,l)),{lying:c,moving:r}}function Qg(i,e,t=[]){for(let n=0;n<12;n++){const s=(e.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(a=>[-.25,0,.25].every(o=>{const c=e.x-Math.sin(s)*a+Math.cos(s)*o,l=e.z-Math.cos(s)*a-Math.sin(s)*o;return i.free(c,l)&&t.every(p=>Math.hypot(p.x-c,p.z-l)>.65)})))return s}return null}function e0({host:i,labels:e,onSelect:t,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:a=()=>{},onPilotState:o=()=>{},rendererFactory:c=m=>new xg(m),controlsFactory:l=(m,h)=>new Mg(m,h),getDate:p=()=>new Date}){const m=new Qu,h=new Mn(36,1,.1,1200),g=c({antialias:!0,alpha:!1,powerPreference:"low-power"});g.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),g.outputColorSpace=nn,g.toneMapping=$a,g.toneMappingExposure=1.18,i.append(g.domElement);const _=l(h,g.domElement);_.enableDamping=!0,_.dampingFactor=.09,_.minDistance=8,_.maxDistance=650,_.minPolarAngle=.32,_.maxPolarAngle=1.28,_.target.set(0,0,0),_.enablePan=!0,_.panSpeed=.7,_.rotateSpeed=.55,_.enableKeys=!1;const E=new xh("#fbf3dc","#526c61",2.8);m.add(E);const u=new nl("#fff1cf",3.2);u.position.set(-12,25,15),m.add(u);const f=new nl("#cce5ef",1.1);f.position.set(15,10,-10),m.add(f);const x=new Map,C=new Map,A=new Set,M=new Set,S=new Map,d=Xg(),b={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function U(v){return x.has(v)||x.set(v,new As({color:b[v]||v,roughness:v==="metal"?.4:.82,metalness:v==="gold"?.45:.02,...v==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:Jt}:{}})),x.get(v)}const w=new Vt(1.1,.035,2.2);A.add(w);const P=new oc(w,U("#c9b384"),24);P.instanceMatrix.setUsage(Jl),P.count=0,P.frustumCulled=!1,m.add(P);const F=new ct,H=new hn;function L(v,R,N,X,B,ce=0,Y=0,Se=0){let Ie=v;v.index&&(Ie=v.toNonIndexed(),v.dispose()),H.setFromEuler(new Un(ce,Y,Se)),Ie.applyMatrix4(new ct().compose(new G(N,X,B),H,new G(1,1,1))),C.has(R)||C.set(R,[]),C.get(R).push(Ie)}function I(v,R,N,X,B,ce,Y,Se=.035,Ie=0){L(Se>0?new Er(v,R,N,1,Math.min(Se,v/3,R/3,N/3)):new Vt(v,R,N),Y,X,B,ce,0,Ie)}function W(v,R,N,X,B,ce,Y=v){L(new bn(Y,v,R,12),ce,N,X,B)}function K(v,R,N,X,B,ce,Y){const Se=new xi(1,10,7);Se.scale(v,R,N),L(Se,Y,X,B,ce)}function he(v,R,N=1){d.addBox(.85*N,.85*N,v,R,"plant",2*N),W(.4*N,.7*N,v,.35*N,R,"pot",.31*N),W(.045*N,1.4*N,v,1.2*N,R,"oak");for(let X=0;X<5;X++){const B=X*2.4;K(.48*N,.52*N,.25*N,v+Math.cos(B)*.3*N,(1.4+X*.15)*N,R+Math.sin(B)*.25*N,X%2?"leaf":"lightLeaf")}}function Z(v,R,N,X,B,ce,Y="#f2e8d5",Se=0){const Ie=document.createElement("canvas");Ie.width=768,Ie.height=192;const Qe=Ie.getContext("2d");Qe.clearRect(0,0,768,192),Qe.fillStyle=Y,Qe.textAlign="center",Qe.font="500 66px Georgia",Qe.fillText(v,384,88),Qe.font="20px Arial",Qe.fillText(R,384,139);const oe=new $o(Ie);oe.colorSpace=nn,M.add(oe);const le=new Vn({map:oe,transparent:!0,depthWrite:!1,side:Jt}),V=new ri(N,N/4);A.add(V);const Je=new gt(V,le);Je.position.set(X,B,ce),Je.rotation.y=Se,m.add(Je),x.set(`sign-${v}`,le)}I(86,.6,96,0,-.94,28,"base",.3),I(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),I(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const v of[-1,1]){I(54,.04,4,v*70,-.17,20,"#e6dfcc",0),I(4,.04,55,v*87,-.17,45,"#e6dfcc",0);for(let R=-20;R<92;R+=8)W(.08,1.1,v*99,.35,R,"wood"),I(.08,.08,8,v*99,.7,R+4,"wood",0);for(const R of[34,58,80])I(3,.4,.9,v*92,.05,R,"wood",.06),d.addBox(3,.9,v*92,R,"trail-bench",.7),he(v*80,R,1);Z("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,v*58,1.7,18)}d.addBox(160,40,0,97,"water-boundary",.1),d.configureHomes(!0);for(const v of[-99,99])d.addBox(.2,114,v,35,"scenic-fence",1.2);d.addBox(202,.2,0,91,"scenic-boundary",1.2),I(85,.07,18,0,-.43,67,"#e4cfa5",.1),I(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let v=0;v<8;v++)I(120-v*8,.02,.13,0,-.57,79+v*2.8,"#c4ddd4",0);I(7,.07,24,0,-.4,60,"#e6dfcc",.1);const se=Yg({scene:m,box:I,cylinder:W,orb:K,bake:L,sign:Z,material:U,navigation:d,ownedGeometries:A,materials:x}),ae=$g({scene:m,navigation:d,ownedGeometries:A,materials:x,sign:Z});for(let v=0;v<8;v++){const R=-36+v*3.7;I(1.5,.25,2.8,R,-.1,67,"white",.1),I(1.4,.17,1,R,.26,66,"sofa",.08),d.addBox(1.5,2.8,R,67,"beach-chair",.6),v%2===0&&(W(.05,3,R+1.2,1,65,"gold"),L(new Zn(1.8,.6,10),"white",R+1.2,2.7,65),d.addBox(.2,.2,R+1.2,65,"parasol",2.8))}I(19,.15,10,22,-.3,65,"wood",.1),Z("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const v of[16,22,28])W(1.2,.13,v,.8,63,"white"),W(.1,1,v,.2,63,"gold"),d.addBox(2.4,2.4,v,63,"terrace-table",.9);for(const v of[-10,-6,-2]){he(v,58,.9);for(let R=0;R<4;R++)K(.15,.2,.15,v+(R-1.5)*.3,.9,58,"#c18b9c")}I(83,.08,4,0,-.44,20,"#e6dfcc",.12),I(6,.08,64,0,-.44,16,"#e6dfcc",.1),I(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const v of[-41,41])for(const R of[-15,-2,14,31,46])he(v,R,1.7),W(.08,3.2,v+(v<0?1:-1),1.15,R+2,"gold"),K(.22,.25,.22,v+(v<0?1:-1),2.85,R+2,"white");const fe=[];function Le(v,R,N,X){d.addBox(N,.12,v,R,"net",X);for(const B of[-N/2,N/2])W(.055,X,v+B,X/2,R,"white");for(let B=.3;B<=X;B+=.22)I(N,.018,.025,v,B,R,"white",0);for(let B=-N/2;B<=N/2;B+=.4)I(.012,X-.3,.018,v+B,(X+.3)/2,R,"white",0)}function ee(v,R,N=.16){const X=new xi(N,10,8);A.add(X);const B=new gt(X,U(R));B.userData.officeBall=v.id,m.add(B),fe.push({mesh:B,game:v})}for(const v of fi){const{x:R,z:N,id:X}=v;if(d.addBox(6,.14,R,N-(v.kind==="court"?6:4.2),"sign",1.2),I(v.kind==="court"?17:10,.12,v.kind==="court"?13:9,R,-.29,N,X==="tennis"?"#a77355":X==="badminton"?"#3b7e77":X==="basketball"?"#b99569":"#dce0ca",.14),I(6,1.1,.12,R,.65,N-(v.kind==="court"?6:4.2),"deep"),Z(v.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,R,.75,N-(v.kind==="court"?5.91:4.11)),X==="tennis"||X==="badminton"||X==="basketball"){for(const B of[-7,7])I(.045,.015,10.8,R+B,-.21,N,"white",0);for(const B of[-5.4,0,5.4])I(14,.015,.045,R,-.21,N+B,"white",0);if(X!=="basketball"){for(const B of[-5.7,5.7])I(.035,.015,10.8,R+B,-.2,N,"white",0);Le(R,N,14,X==="badminton"?1.7:1.15),ee(v,X==="tennis"?"#d9e56b":"white",X==="tennis"?.17:.12)}else{for(const B of[-1,1]){W(.09,3.6,R,1.5,N+B*5,"metal"),I(2.3,1.35,.13,R,3.1,N+B*4.7,"white");const ce=new ii(.43,.045,6,20);L(ce,"#c67543",R,2.8,N+B*4.1,Math.PI/2)}ee(v,"#bd6c32",.25)}}else if(X==="golf"){for(const B of[-6.5,6.5])d.addBox(.2,8,R+B,N,"golf-edge",.5);I(13,.12,8,R,-.15,N,"#69885c",.15);for(const B of[-6.5,6.5])I(.2,.35,8,R+B,-.05,N,"woodLight");for(let B=0;B<3;B++)W(.22,.02,R-4+B*4,-.07,N+(B%2?2:-2),"black"),W(.025,1.5,R-4+B*4,.65,N+(B%2?2:-2),"gold"),I(.8,.4,.03,R-3.6+B*4,1.25,N+(B%2?2:-2),"#c78362");ee(v,"white",.12)}else if(X==="bowling"){for(const B of[-2.7,2.7])d.addBox(.35,11,R+B,N,"bowling-edge",.4);I(5,.09,11,R,-.13,N,"woodLight");for(const B of[-2.7,2.7])I(.35,.12,11,R+B,-.1,N,"oak");for(let B=0;B<4;B++)for(let ce=0;ce<=B;ce++){const Y=R+(ce-B/2)*.55,Se=N-2-B*.5;W(.14,.5,Y,.17,Se,"white",.08),K(.13,.14,.13,Y,.49,Se,"white")}ee(v,"#786397",.28)}else if(X==="arcade")for(const B of[-2.2,2.2]){d.addBox(2.1,1.6,R+B,N,"arcade",2.5),d.addBox(1.2,1.2,R+B,N+2,"seat",.7),I(2.1,2.6,1.6,R+B,1.1,N,"deep",.1),I(1.6,1.1,.05,R+B,1.7,N+.83,"screen");for(let ce=0;ce<5;ce++)I(.05,.6,.02,R+B+(ce-2)*.2,1.7,N+.87,ce%2?"#e8c877":"screenLine",0);W(.18,.06,R+B,.9,N+1.1,"gold"),I(1.2,.45,1.2,R+B,.2,N+2,"sofa",.1)}else if(X==="archery"){d.addBox(5,.3,R,N-2,"archery-backstop",3.2),I(5,3.2,.25,R,1.2,N-2,"wood");for(let B=0;B<5;B++){const ce=new bn(1.1-B*.21,1.1-B*.21,.03,24);L(ce,["white","#283e49","#73a7bf","#c36f60","gold"][B],R,1.6,N-1.82+B*.035,Math.PI/2)}I(5,.02,.12,R,-.18,N+2.8,"white",0)}else if(X==="darts"){d.addBox(5,.22,R,N-1.8,"dart-board",2.8),I(5,3,.22,R,1.25,N-1.8,"deep");for(let B=0;B<4;B++){const ce=new bn(1.05-B*.23,1.05-B*.23,.025,24);L(ce,B%2?"white":"#bf6f59",R,1.6,N-1.64+B*.025,Math.PI/2)}}else{d.addBox(5.5,3.5,R,N,"game-table",1.3),I(5.5,.25,3.5,R,1,N,X==="pingpong"?"#4c7783":X==="billiards"?"#376a59":"woodLight",.1);for(const B of[-2.2,2.2])for(const ce of[-1.2,1.2])I(.18,1.1,.18,R+B,.4,N+ce,"oak");if(X==="pingpong"&&(Le(R,N,5.5,1.45),ee(v,"white",.1)),X==="uno")for(let B=0;B<16;B++){const ce=B%4;I(.32,.035,.48,R+(ce<2?-1.7+B%4*.3:1.4),1.16+B*.002,N+(ce%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][B%4],.02,B*.3)}if(X==="chess")for(let B=0;B<8;B++)for(let ce=0;ce<8;ce++)I(.34,.02,.34,R+(B-3.5)*.34,1.14,N+(ce-3.5)*.34,(B+ce)%2?"deep":"white",0),(ce<2||ce>5)&&W(.075,.17,R+(B-3.5)*.34,1.24,N+(ce-3.5)*.34,ce<2?"white":"black");if(X==="billiards")for(let B=0;B<10;B++)K(.12,.12,.12,R+Math.sin(B*2)*1.8,1.25,N+Math.cos(B)*.9,["gold","white","deep"][B%3]);if(X==="foosball")for(let B=0;B<5;B++){I(.045,.045,4.5,R-2+B,1.4,N,"metal",0);for(const ce of[-1,0,1])I(.2,.45,.18,R-2+B,1.48,N+ce,B%2?"#ba7864":"deep")}for(const B of[-1,1])I(4,.35,.8,R,.28,N+B*3.8,"sofa",.1),d.addBox(4,.8,R,N+B*3.8,"bench",.5)}}I(40.5,.6,28,0,-.6,0,"base",.22),I(39.8,.22,27.3,0,-.2,0,"edge",.1),I(39.4,.18,26.9,0,-.04,0,"floor",.08),I(37.8,.04,13.5,0,.07,-5.8,"stone",.05),I(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),I(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let v=-18;v<19;v+=1.9)I(.015,.015,12.4,v,.14,-5.8,"#c3cfbf",0);I(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),I(39.4,.22,.5,0,4.8,-13.25,"gold"),I(8,4.8,.18,0,2.35,-13.02,"deep");for(let v=0;v<21;v++)I(.06,4.6,.1,-3.8+v*.38,2.35,-12.87,"wood",.01);I(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),Z("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const v of[-15,-10,10,15]){I(4.1,2.9,.15,v,2.6,-13,"glass"),I(4.2,.08,.23,v,4.08,-12.85,"gold"),I(4.2,.12,.3,v,1.12,-12.85,"woodLight");for(const R of[-2,0,2])I(.055,2.9,.2,v+R,2.6,-12.86,"gold",0)}I(.13,2.8,10.8,0,1.55,-6.4,"glass"),I(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const v of[-11.8,-6.4,-1])I(.08,2.9,.08,0,1.5,v,"gold",0);I(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),I(.22,.08,25.7,-19.5,2.8,-.1,"gold"),I(.2,2.7,25.7,19.5,1.4,-.1,"glass"),I(.22,.08,25.7,19.5,2.8,-.1,"gold"),Z("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),Z("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function Me(v,R,N){d.addBox(2.6,1.28,v,R,"desk",2.3),I(2.6,.15,1.28,v,1.31,R,"woodLight",.08);for(const X of[-1.03,1.03])I(.09,1.17,1.02,v+X,.66,R,"white"),I(.45,.08,.94,v+X,.15,R,"metal");I(1,.66,.08,v,1.91,R-.22,"metal"),I(.9,.54,.02,v,1.92,R-.166,"screen");for(let X=0;X<3;X++)I(.28+X*.12,.024,.025,v-.14+X*.04,2.03-X*.1,R-.149,"screenLine",0);W(.07,.25,v,1.48,R-.2,"metal"),I(.45,.035,.25,v,1.405,R-.19,"metal"),I(.71,.035,.24,v,1.42,R+.32,"white"),W(.09,.18,v+.9,1.49,R+.12,"deep"),I(.64,.17,.64,v,.66,R+1.02,N==="umum"?"sofa":"teal",.1),I(.65,.7,.12,v,1.08,R+1.33,N==="umum"?"sofa":"teal",.09),W(.055,.5,v,.35,R+1.05,"metal"),I(.8,.06,.14,v,.15,R+1.05,"metal"),I(.14,.06,.8,v,.15,R+1.05,"metal")}const Re={umum:[],operasional:[]};for(const v of["umum","operasional"])for(let R=0;R<4;R++)for(let N=0;N<4;N++){const X=(v==="umum"?-15:3.4)+N*3.75,B=-10.3+R*3.15;Re[v].push([X,.18,B+1.03]),Me(X,B,v)}for(const v of[-18.5,18.5]){I(.7,2.4,4.7,v,1.25,-8.4,"wood");for(let R=0;R<3;R++){I(.86,.06,4.8,v,.65+R*.69,-8.4,"gold");for(let N=0;N<8;N++)I(.5,.38+N%2*.12,.18,v,.88+R*.69,-10.3+N*.5,N%2?"white":"deep")}}I(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const v of[4.7,8,11.3]){I(15.8,.45,1.05,-8.7,.57,v,"sofa",.16),I(15.8,.9,.25,-8.7,.91,v-.62,"sofa",.12);for(let R=0;R<8;R++)I(1.72,.17,.95,-15.8+R*2.02,.86,v,R%3===0?"pillow":"sofa",.1);for(const R of[-16.7,-.7])I(.25,.68,1.35,R,.8,v,"sofa",.1)}for(const v of[-11.5,-5]){I(2.7,.13,1.2,v,.64,6.6,"woodLight",.12);for(const R of[-.9,.9])W(.05,.48,v+R,.37,6.6,"gold");W(.16,.22,v+.4,.81,6.6,"white")}I(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const v of[-11.5,-6.5])W(.04,.5,v,.32,2.85,"gold");Z("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),I(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),I(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),I(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let v=0;v<23;v++)I(.055,1.15,.07,7.9+v*.4,.78,2.26,"woodLight",.01);I(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),I(.8,.55,.05,15.3,1.9,1.94,"black"),W(.18,.24,14.1,1.64,1.5,"white"),W(.18,.24,13.6,1.64,1.5,"white"),Z("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const v of[8,13.8])for(const R of[5.1,9.7]){W(1.45,.12,v,1.05,R,"woodLight"),W(.13,.92,v,.55,R,"gold"),W(.68,.08,v,.12,R,"gold");for(const N of[-1.6,1.6])W(.42,.14,v+N,.67,R,"deep"),W(.055,.55,v+N,.34,R,"gold");W(.18,.22,v+.4,1.22,R,"white"),W(.22,.04,v-.3,1.14,R+.2,"white")}for(const[v,R,N]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])he(v,R,N);d.addBox(39.4,.32,0,-13.25,"wall",4.8),d.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const v of[-19.5,19.5])d.addBox(.2,25.7,v,-.1,"glass-wall",2.8);for(const v of[4.7,8,11.3])d.addBox(16.1,1.5,-8.7,v,"sofa",1.4);d.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),d.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const v of[8,13.8])for(const R of[5.1,9.7])d.addBox(2.9,2.9,v,R,"cafe-table",1.3);for(const v of[-18.5,18.5])d.addBox(.9,4.8,v,-8.4,"shelf",2.6);for(const v of[-11.5,-5])d.addBox(2.7,1.2,v,6.6,"lounge-table",.8);for(const[v,R]of C){const N=Wn(R,!1);R.forEach(X=>X.dispose()),N&&(A.add(N),m.add(new gt(N,U(v))))}C.clear();const Ee=Hg({scene:m,material:U,ownedGeometries:A}),Ae=qg({scene:m,materials:x,ownedGeometries:A,sun:u,hemi:E,fill:f,navigation:d}),ke=document.createElement("canvas");ke.width=ke.height=128;const Mt=ke.getContext("2d"),Be=Mt.createRadialGradient(64,64,7,64,64,64);Be.addColorStop(0,"#16382f35"),Be.addColorStop(1,"#16382f00"),Mt.fillStyle=Be,Mt.fillRect(0,0,128,128);const at=new $o(ke);M.add(at);const ut=new ri(66,49);A.add(ut);const et=new Vn({map:at,transparent:!0,depthWrite:!1});x.set("shadow",et);const we=new gt(ut,et);we.rotation.x=-Math.PI/2,we.position.y=-.98,m.add(we);const Ne=new Map,nt=new Map;function Ve(v){if(nt.has(v))return nt.get(v);const R=[];if(v==="archery"){const X=new ii(.34,.025,5,16,Math.PI);X.rotateZ(-Math.PI/2),R.push(X.toNonIndexed()),X.dispose();const B=new Vt(.035,.035,.85);B.translate(0,0,.1),R.push(B.toNonIndexed()),B.dispose()}else{const X=new bn(.017,.03,v==="billiards"?1.65:1,6);X.rotateX(Math.PI/2),R.push(X.toNonIndexed()),X.dispose()}const N=Wn(R,!1);return R.forEach(X=>X.dispose()),A.add(N),nt.set(v,N),N}function Ge(v,R,N,X,B){const ce=R+N.join(":");if(!Ne.has(ce)){const Se=R==="sphere"?new xi(N[0],10,8):new Er(...N,1,.06);Ne.set(ce,Se),A.add(Se)}const Y=new gt(Ne.get(ce),U(X));return Y.position.set(...B),v.add(Y),Y}const dt=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],wt=new Map,St=new As({vertexColors:!0,roughness:.8});x.set("costume-vertex",St);function Nt(v){const R=new pn;m.add(R);const N=Bc(v.avatar),X=zc(N.costume),B=(X?.style||N.style)==="feminine",ce=X?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[N.color]||dt[v.id%dt.length],Y=new pn;R.add(Y);const Se={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[N.skin],Ie=N.hair==="hijab"?ce:"#352c32";if(Ge(Y,"box",[B?.43:.5,.65,.33],ce,[0,1.17,0]),!X&&N.outfit==="blazer"){Ge(Y,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Pt of[-1,1]){const Ft=Ge(Y,"box",[.07,.32,.035],"gold",[Pt*.12,1.33,.19]);Ft.rotation.z=Pt*.25}}!X&&N.outfit==="sport"&&Ge(Y,"box",[.32,.055,.02],"white",[0,1.3,.18]);const Qe=!X&&N.outfit==="dress"?Ge(Y,"box",[.6,.4,.44],ce,[0,.79,0]):null,oe=new pn;if(oe.position.y=1.69,Y.add(oe),Ge(oe,"box",[.43,.46,.4],Se,[0,0,0]),X)oe.add(new gt(Dl(X,"head",wt,A),St)),Y.add(new gt(Dl(X,"body",wt,A),St));else{const Pt="hair:"+N.hair;if(!Ne.has(Pt)){const Ft=[[.47,.18,.44,0,.21,-.02],[.45,N.hair==="long"||N.hair==="hijab"?.67:.3,.12,0,N.hair==="long"||N.hair==="hijab"?-.12:.07,-.2]];if(N.hair!=="short")for(const di of[-1,1])Ft.push([.09,N.hair==="bob"?.4:.53,.32,di*.235,-.01,-.03]);const Pi=Ft.map(([di,Cc,Pc,Dc,Lc,Ic])=>{const Rr=new Vt(di,Cc,Pc);Rr.translate(Dc,Lc,Ic);const Nc=Rr.toNonIndexed();return Rr.dispose(),Nc}),Di=Wn(Pi,!1);Pi.forEach(di=>di.dispose()),Ne.set(Pt,Di),A.add(Di)}oe.add(new gt(Ne.get(Pt),U(Ie)))}if(!X&&N.hair==="ponytail"&&Ge(oe,"box",[.24,.53,.22],Ie,[0,-.02,-.35]),!X&&N.hair==="hijab"&&Ge(Y,"box",[.58,.18,.43],Ie,[0,1.44,-.04]),!Ne.has("eyes")){const Pt=[-.095,.095].map(Pi=>{const Di=new Vt(.035,.045,.025);Di.translate(Pi,.035,.205);const di=Di.toNonIndexed();return Di.dispose(),di}),Ft=Wn(Pt,!1);Pt.forEach(Pi=>Pi.dispose()),Ne.set("eyes",Ft),A.add(Ft)}const le=new gt(Ne.get("eyes"),U("#263833"));oe.add(le);const V=[le];if(Ge(oe,"box",[.09,.02,.025],B?"#b96f78":"#9c6d58",[0,-.105,.21]),B)for(const Pt of[-.14,.14])Ge(oe,"box",[.065,.025,.02],"#d39589",[Pt,-.065,.21]);if(N.accessory==="glasses"){for(const Pt of[-1,1])Ge(oe,"box",[.15,.11,.025],"gold",[Pt*.105,.04,.224]),Ge(oe,"box",[.11,.07,.025],Se,[Pt*.105,.04,.24]);Ge(oe,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(N.accessory==="headphones"){Ge(oe,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Pt of[-1,1])Ge(oe,"box",[.12,.2,.18],"deep",[Pt*.28,.07,0])}const Je=[];for(const Pt of[-.34,.34]){const Ft=new pn;Ft.position.set(Pt,1.42,0),Y.add(Ft),Ge(Ft,"box",[.17,.4,.2],ce,[0,-.19,0]),Ge(Ft,"box",[.15,.27,.16],Se,[0,-.45,.05]),Je.push(Ft)}const At=[],Tn=[];for(const Pt of[-.14,.14]){const Ft=new pn;Ft.position.set(Pt,.83,0),Y.add(Ft),Ge(Ft,"box",[.18,.64,.2],X?.pants||"#35463f",[0,-.32,0]),Tn.push(Ge(Ft,"box",[.23,.14,.34],X?.accent||(N.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),At.push(Ft)}const on=Ge(Je[1],"sphere",[.12],"white",[0,-.49,.14]),jt=Ge(Je[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),je=new pn;Je[1].add(je),je.position.set(0,-.48,.16),Ge(je,"box",[.04,.44,.05],"gold",[0,-.14,0]);const _t=new ii(.24,.025,6,16);A.add(_t),je.add(new gt(_t,U("white"))),je.rotation.x=Math.PI/2;const Ke=new gt(Ve("billiards"),U("gold"));Ke.position.set(0,-.48,.35),Je[1].add(Ke),Ke.visible=!1;const rt=new Sr(.5,.59,24);A.add(rt);const Et=new Vn({color:"#c5a061",side:Jt});x.set(`ring-${v.id}`,Et);const Tt=new gt(rt,Et);Tt.rotation.x=-Math.PI/2,Tt.position.y=.02,R.add(Tt),Tt.visible=!1;const Oe=document.createElement("button");Oe.type="button",Oe.className="vo-avatar-label",Oe.setAttribute("aria-pressed","false");const en=document.createElement("i"),Fn=document.createElement("span"),Ci=document.createElement("small");Oe.append(en,Fn,Ci),e.append(Oe);const hi=document.createElement("span");return hi.className="vo-speech",hi.hidden=!0,Oe.append(hi),Oe.addEventListener("click",()=>t(v.id)),R.traverse(Pt=>{Pt.isMesh&&(Pt.userData.personId=v.id)}),{group:R,body:Y,head:oe,arms:Je,legs:At,shoes:Tn,eyes:V,skirt:Qe,cup:on,plate:jt,racket:je,tool:Ke,bubble:hi,label:Oe,dot:en,name:Fn,icon:Ci,ring:Tt,person:v,appearance:JSON.stringify(v.avatar),privateGeometry:_t,target:new G,phase:v.id*1.75}}let z=null,Xe=!1,ft=!0,lt=!1,pe=null,ht=0,He=0,qe=null,D=[],y=null,q=null,de="orbit",re=null,xe=!1,ye={};const ne=new Map,ie=new Map;let me=null,O=null,te=null,Q=null,ge={},_e=o,ve=null,Ue=()=>!1,ze=null,ue=null,Fe=null,Ye=!1,Ce=null;const pt=new Sr(1.2,1.4,32);A.add(pt);const Lt=new Vn({color:"#e9be69",side:Jt,transparent:!0,opacity:.85});x.set("pilot-guide",Lt);const qt=new gt(pt,Lt);qt.rotation.x=-Math.PI/2,qt.visible=!1,qt.userData.pilotGuide=!0,m.add(qt);const mn=new Map,Ti=[],Cs={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},Rt=new G,Ht=new G;let Ct=!1;function Qt(v){O&&te&&!v.some(le=>le.id===O)&&(v=[...v,{...te,home_slot:ue?.slot??te.home_slot}]),d.configureHomes(!0,Ye?ue?.slot:null,Math.max(Ce??0,v.length,...v.map(le=>(le.home_slot??-1)+1))),D=v,Ee.sync(v),Ae.extent(Ee.bounds().back);const R=v.map(le=>{if(!q?.connected||!q.room||![q.room.from,q.room.to].includes(le.id)){const V=v.find(Je=>Je.is_me)?.id;return q&&!q.connected&&(le.id===V||le.meeting_with===V)?{...le,meeting_with:null,meeting_spot:null}:le}return{...le,state:"online",meeting_with:q.room.from===le.id?q.room.to:q.room.from,meeting_spot:q.room.spot}}),N=le=>le.id===z||le.id===re||le.is_me||me&&[me.from,me.to].includes(le.id),X=[...R].sort((le,V)=>+!!N(V)-+!!N(le)||+!!V.meeting_with-+!!le.meeting_with||{online:0,idle:1,offline:2}[le.state]-{online:0,idle:1,offline:2}[V.state]||le.id-V.id),B=[],ce={umum:0,operasional:0},Y=[],Se=new Map;let Ie=0,Qe=0;for(const le of X){if(B.length>=24)break;le.state==="online"&&ce[le.department]>=16||(B.push(le),le.state==="online"&&ce[le.department]++)}const oe=new Set(B.map(le=>le.id));for(const[le,V]of S)(!oe.has(le)||V.appearance!==JSON.stringify(B.find(Je=>Je.id===le)?.avatar))&&(m.remove(V.group),V.label.remove(),V.ring.geometry.dispose(),A.delete(V.ring.geometry),V.privateGeometry.dispose(),A.delete(V.privateGeometry),V.ring.material.dispose(),x.delete(`ring-${le}`),S.delete(le));ce.umum=ce.operasional=0;for(const le of B){let V=S.get(le.id),Je=!V;V||(V=Nt(le),S.set(le.id,V));const At=V.game?.id,Tn=V.pose,on=V.home?.clone(),jt=le.in_office===!1&&le.state!=="offline",je=jt?null:mn.get(le.id)||le.pilot,_t=le.id===O&&Q?Q.state():je;V.person=le,V.pose=Fc(le,p());let Ke;V.game=Oc(le,p());const rt=jt?null:ne.get(le.id)||le.recreation,Et=!jt&&me&&me.status!=="pending"&&[me.from,me.to].includes(le.id);Et?(V.game=fi.find(Oe=>Oe.id===me.kind)||V.game,V.pose="playing"):rt?.kind==="game"&&rt.until>Date.now()/1e3&&le.state!=="offline"&&(V.game=fi.find(Oe=>Oe.id===rt.destination)||V.game,V.pose="playing");const Tt=rt&&(!rt.until||rt.until>Date.now()/1e3)&&Cs[rt.destination];if(V.destination=!!Tt,Tt&&!Et&&le.state!=="offline"){V.pose=rt.kind==="drink"?"coffee":rt.kind==="food"?"eating":rt.kind==="dance"?"dancing":"resting",Ke=[Tt[0]+le.id%5*1.6,Tt[1],Tt[2]+Math.floor(le.id%10/5)*1.3];const Oe=d.nearest({x:Ke[0],z:Ke[2]});Oe&&(Ke=[Oe.x,Ke[1],Oe.z]),V.group.rotation.y=Math.PI}else if(!jt&&le.meeting_with&&Number.isInteger(le.meeting_spot)&&!Et){V.pose="meeting";const Oe=le.id<le.meeting_with?-1:1;Ke=[-36+le.meeting_spot*6.5+Oe*.9,-.12,20],V.facing=Oe<0?Math.PI/2:-Math.PI/2}else if(V.pose==="working")Ke=Re[le.department][ce[le.department]++],V.group.rotation.y=Math.PI;else if(V.pose==="playing"){const Oe=Se.get(V.game.id)||0;Se.set(V.game.id,Oe+1);const en=Oe%2?1:-1;Ke=[V.game.x+(V.game.kind==="court"?en*(3-Math.floor(Oe/2)%3*1.7):Math.floor(Oe/2)*.8),-.12,V.game.z+en*(V.game.kind==="court"?3.6:2.5)],V.group.rotation.y=en<0?0:Math.PI}else if(V.pose==="sleeping")Ke=Ee.bed(le.id),V.group.rotation.y=0;else if(V.pose==="resting"){const Oe=Ie++;Ke=[-15.8+Oe%8*2.02,.12,4.7+Math.floor(Oe/8)*3.3],V.group.rotation.y=0}else if(Qe<8){const Oe=Qe++,en=Oe%4,Fn=Oe<4?1:-1;Ke=[(en%2?13.8:8)+Fn*1.65,.08,en<2?5.1:9.7],V.group.rotation.y=Fn*Math.PI/2}else{const Oe=Ie++;Ke=[-15.8+Oe%8*2.02,.12,4.7+Math.floor(Oe/8)*3.3],V.group.rotation.y=0}if(V.pose==="playing"&&V.game.id==="darts"&&(Ke=[V.game.x+(le.id%2?-1:1)*1.2,-.12,V.game.z+2.5]),["playing","meeting"].includes(V.pose)&&!d.free(Ke[0],Ke[2])){const Oe=d.nearest({x:Ke[0],z:Ke[2]});Oe&&(Ke=[Oe.x,Ke[1],Oe.z])}if((V.pose==="playing"||Tt)&&Y.some(Oe=>Math.hypot(Oe[0]-Ke[0],Oe[2]-Ke[2])<.7))e:for(const Oe of[.8,1.5,2.2])for(let en=0;en<12;en++){const Fn=Ke[0]+Math.cos(en*Math.PI/6)*Oe,Ci=Ke[2]+Math.sin(en*Math.PI/6)*Oe;if(d.free(Fn,Ci)&&!Y.some(hi=>Math.hypot(hi[0]-Fn,hi[2]-Ci)<.7)){Ke=[Fn,Ke[1],Ci];break e}}if(_t&&le.state!=="offline"?(Ke=[_t.x,_t.y,_t.z],V.pose="manual",V.manual=!0,V.group.rotation.y=_t.yaw,V.waypoints=[]):V.manual=!1,Y.push(Ke),V.target.set(...Ke),V.home=V.target.clone(),(Je||Tn!==V.pose&&V.pose!=="meeting"&&!Tt&&!Et)&&V.group.position.copy(V.target),!V.manual&&!Je&&(V.pose==="playing"&&(At!==V.game.id||Tn!=="playing")||(Tt||V.pose==="meeting")&&(!on||on.distanceTo(V.home)>.1))){if(!d.free(V.group.position.x,V.group.position.z)){const Oe=d.nearest(V.group.position)||d.nearest({x:0,z:21.5});Oe&&V.group.position.set(Oe.x,Ke[1],Oe.z)}V.waypoints=d.withHomeAccess(Ee.slotFor(le.id),()=>d.path(V.group.position,V.home)).map(Oe=>new G(Oe.x,Ke[1],Oe.z))}else!["playing","meeting"].includes(V.pose)&&!Tt&&(V.waypoints=[]);Xe&&V.pose==="meeting"&&(V.group.position.copy(V.home),V.group.rotation.y=V.facing,V.waypoints=[]),V.dot.className=`vo-dot ${le.state}`,V.name.textContent=le.name,V.icon.textContent=`${le.state==="offline"?"OFFLINE ":le.state==="idle"?"JEDA ":"ONLINE "}${V.pose==="meeting"?"💬":V.pose==="sleeping"?"☾ RUMAH":V.pose==="playing"?V.game.icon:V.pose==="coffee"?"☕":""}`,Et&&me.bot&&le.id===me.to&&(V.icon.textContent="OFFLINE · NPC "+V.game.icon),V.pose==="dancing"&&(V.icon.textContent=(le.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),V.label.setAttribute("aria-label",`${le.name}, ${le.state==="online"?"online":le.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),V.cup.visible=V.pose==="coffee",V.plate.visible=V.pose==="eating",V.manual&&(V.cup.visible=_t.action==="drink",V.plate.visible=_t.action==="eat",V.icon.textContent=(le.private?"PRIVAT · ":"ONLINE · ")+(_t.action==="run"?"BOOST":_t.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),V.racket.visible=V.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(V.game.id),V.tool.visible=V.pose==="playing"&&["billiards","archery","darts"].includes(V.game.id),V.tool.visible&&(V.tool.geometry=Ve(V.game.id)),V.shoes.forEach(Oe=>{Oe.visible=V.pose!=="sleeping"}),V.eyes.forEach(Oe=>{Oe.scale.y=V.pose==="sleeping"?.18:1}),V.ring.visible=z===le.id,V.label.setAttribute("aria-pressed",String(z===le.id))}Ee.select(y??(S.get(z)?.pose==="sleeping"?z:null)),yt()}const gn=new G;function Ps(){const v=i.getBoundingClientRect(),R=[];for(const N of[...S.values()].sort((X,B)=>+(B.person.id===z)-+(X.person.id===z))){if(N.pose==="sleeping"){const Qe=Ee.location(N.person.id);gn.set(Qe.x,5.2,Qe.z+1)}else N.group.getWorldPosition(gn),gn.y+=2.35;gn.project(h);const X=(gn.x+1)/2*v.width,B=(1-gn.y)/2*v.height,ce=166,Y=27,Se=R.some(Qe=>Math.abs(Qe.x-X)<ce&&Math.abs(Qe.y-B)<Y),Ie=gn.z<1&&gn.z>-1&&X>18&&X<v.width-18&&B>15&&B<v.height-65&&(!Se||N.person.id===z);N.label.hidden=!Ie,Ie&&(N.label.style.transform=`translate(${X}px,${B}px) translate(-50%,-100%)`,R.push({x:X,y:B}))}}function oi(v=0){if(pe=null,lt||!ft)return;if(v-ht<1e3/30&&!Xe){pe=requestAnimationFrame(oi);return}const R=Math.min(.06,Math.max(.001,(v-ht)/1e3));ht=v,Ct&&(h.position.lerp(Ht,.12),_.target.lerp(Rt,.12),h.position.distanceTo(Ht)<.04&&(h.position.copy(Ht),_.target.copy(Rt),Ct=!1));let N=0;for(const Y of S.values()){const Se=Xe?0:v/1e3+Y.phase;if(Y.person.id===O&&Q){const oe=Math.atan2(h.position.x-_.target.x,h.position.z-_.target.z),le=[...S.values()].filter(Je=>Je!==Y&&Je.pose!=="sleeping").map(Je=>Je.group.position),V=Q.step(R,Ue()?{}:ge,oe,le);if(["walk","run","jump"].includes(V.action)&&(ze=null),ze&&Object.assign(V,ze),Y.group.position.set(V.x,V.y,V.z),Y.group.rotation.y=V.yaw,Y.manual=!0,Y.pose="manual",Y.home.copy(Y.group.position),Y.target.copy(Y.group.position),ve){const Je=ve==="home"&&ue?{x:ue.x,z:ue.z+5}:Cn.venues[ve];Je&&(V.target=ve,V.distance=Math.round(Math.hypot(V.x-Je.x,V.z-Je.z)))}if(V.atHome=qi(V,ue),V.nearDoor=!!(ue&&Math.hypot(V.x-ue.x,V.z-ue.z-3.9)<=2.8),V.doorOpen=Ye,_e(V),ue){const Je=qi(V,ue);Je!==!!Y.insideOwnHome&&(Y.insideOwnHome=Je,Ee.select(Je?Fe:null))}Y.icon.textContent=(Y.person.private?"PRIVAT · ":"ONLINE · ")+(V.action==="run"?"BOOST":V.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(Y.manual){const oe=Y.person.id===O&&Q?{...Q.state(),...ze||{}}:mn.get(Y.person.id)||Y.person.pilot;if(oe&&Y.person.id!==O){const Je=new G(oe.x,oe.y,oe.z),At=Y.group.position.clone().lerp(Je,.35);d.segment(Y.group.position,At)?Y.group.position.copy(At):Y.group.position.copy(Je),Y.group.rotation.y=oe.yaw}const le=Jg(Y,oe,{time:v/1e3+Y.phase,dt:R,reduced:Xe}),V=oe?.action==="play"?fi.find(Je=>Je.id===oe.venue):null;Y.racket.visible=!!(V&&["tennis","badminton","pingpong","golf"].includes(V.id)),Y.tool.visible=!!(V&&["billiards","archery","darts"].includes(V.id)),Y.tool.visible&&(Y.tool.geometry=Ve(V.id)),Y.cup.visible=oe?.action==="drink",Y.plate.visible=oe?.action==="eat",oe?.action==="rest"&&(Y.icon.textContent=oe.pose==="nap"?"ONLINE · TIDUR SANTAI":oe.pose==="recline"?"ONLINE · REBAHAN":oe.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI"),le.lying&&(F.compose(new G(Y.group.position.x-Math.sin(Y.group.rotation.y)*.7,Y.group.position.y+.035,Y.group.position.z-Math.cos(Y.group.rotation.y)*.7),Y.group.quaternion,new G(1,1,1)),P.setMatrixAt(N++,F));continue}const Ie=Y.pose==="playing",Qe=!Xe&&(Ie||Y.waypoints?.length>0);if(Y.target.copy(Y.home),Ie&&!Y.waypoints?.length&&(Y.target.x+=Math.sin(Se*.65)*(Y.game.kind==="court"?1.4:.18),Y.target.z+=Math.cos(Se*.5)*(Y.game.kind==="court"?.3:.08)),Y.waypoints?.length&&!Xe){const oe=Y.waypoints[0];Y.group.position.distanceTo(oe)<.015?Y.waypoints.shift():(Y.group.rotation.y=Math.atan2(oe.x-Y.group.position.x,oe.z-Y.group.position.z),Ai(Y,oe,R*3.2))}else Ie?Ai(Y,Y.target,Xe?0:R*1.4):Y.pose==="meeting"?(Ai(Y,Y.home,Xe?0:R*3.2),Y.group.rotation.y=Y.facing):Y.group.position.copy(Y.home);Y.legs.forEach((oe,le)=>{oe.rotation.x=Qe?Math.sin(Se*4+le*Math.PI)*.32:Y.pose==="working"||Y.pose==="resting"?-1.1:0}),Y.body.position.y=Math.sin(Se*1.6)*(Xe?0:Y.pose==="sleeping"?.007:.018),Y.body.rotation.x=Y.pose==="sleeping"?-Math.PI/2:0,Y.body.rotation.z=Ie?Math.sin(Se*1.5)*.07:0,Y.head.rotation.x=Y.pose==="sleeping"?0:Math.sin(Se*.6)*(Xe?0:.025),Y.arms[0].rotation.x=Y.pose==="working"?-.65+Math.sin(Se*5)*(Xe?0:.045):Y.pose==="eating"?-1.05:.1,Y.arms[1].rotation.x=Y.pose==="working"?-.65+Math.sin(Se*5+1)*(Xe?0:.045):Y.pose==="coffee"?-1.2+Math.sin(Se*1.2)*(Xe?0:.13):Y.pose==="eating"?-.8+Math.sin(Se*2)*(Xe?0:.13):.1,Ie&&(Y.arms[1].rotation.x=-.6+Math.sin(Se*2.3)*(Xe?0:.7),Y.arms[0].rotation.x=-.25+Math.sin(Se*2.3+1)*(Xe?0:.25)),Y.pose==="dancing"&&!Qe&&(Y.body.rotation.z=Xe?0:Math.sin(Se*2.4)*.13,Y.arms.forEach((oe,le)=>{oe.rotation.x=-.8+Math.sin(Se*2.4+le)*(Xe?0:.5)}),Y.legs.forEach((oe,le)=>{oe.rotation.x=Xe?0:Math.sin(Se*2.4+le*Math.PI)*.25})),Y.pose==="meeting"?(Y.arms[1].rotation.x=-.2+Math.sin(Se*1.7)*(Xe||Qe?0:.18),Y.head.rotation.y=Math.sin(Se*.7)*(Xe?0:.06)):Y.head.rotation.y=0}P.count=N,P.instanceMatrix.needsUpdate=!0;const X=S.get(re);if(de!=="orbit"&&X&&!Ct){const Se=X.group.position.clone().add(new G(0,X.pose==="sleeping"?.25:1.3,X.pose==="sleeping"?-1.3:0)).clone().sub(_.target).multiplyScalar(.25);_.target.add(Se),h.position.add(Se)}Ae.update(v,{paused:Xe,dark:document.documentElement.classList.contains("dark"),center:_.target}),se.update(v,{paused:Xe,energySaver:xe}),ae.update(v,Xe);for(const{mesh:Y,game:Se}of fe){const Ie=Xe?0:v/1e3,oe=[...S.values()].some(le=>le.manual?(le.person.id===O?ze:mn.get(le.person.id)||le.person.pilot)?.action==="play"&&(le.person.id===O?ze:mn.get(le.person.id)||le.person.pilot)?.venue===Se.id:!Gc(p())&&le.pose==="playing"&&le.game.id===Se.id)?Math.sin(Ie*1.8):0;Y.position.set(Se.x+(Se.id==="golf"?oe*4:oe*1.5),Se.id==="pingpong"?1.45+Math.abs(oe)*.65:Se.id==="basketball"?.15+Math.abs(oe)*2.2:Se.id==="bowling"||Se.id==="golf"?.06:.4+Math.abs(oe)*2,Se.z+oe*(Se.kind==="court"?4:1.3))}_.update();const B=h.position.clone(),ce=h.quaternion.clone();de!=="orbit"&&X&&h.position.copy(Kg(d,_.target,B,Ee.cameraBoxes(re),de==="portrait"?2.8:3.8)),h.lookAt(_.target),h.updateMatrixWorld(!0),qe?qe.copy(h):qe=h.clone(),g.render(m,h),(Xe||v-He>120||Ct)&&(Ps(),He=v),h.position.copy(B),h.quaternion.copy(ce),h.updateMatrixWorld(!0),(!Xe||Ct||Q?.moving()||Q&&Q.state().stamina<100||!Ue()&&(Math.abs(ge.x||0)+Math.abs(ge.z||0)>0||ge.jump))&&yt()}function yt(){!lt&&ft&&pe===null&&(pe=requestAnimationFrame(oi))}function Ai(v,R,N){const X=Ee.location(v.person.id),B=X&&Math.abs(v.group.position.x-X.x)<4.8&&Math.abs(v.group.position.z-X.z)<5;return!!B!=!!v.npcDoorOpen&&(v.npcDoorOpen=!!B,Ee.setDoor(v.person.id,!!B)),d.withHomeAccess(Ee.slotFor(v.person.id),()=>li(v,R,N))}function li(v,R,N){const X=d.move(v.group.position,R,N),B=Math.hypot(X.x-v.group.position.x,X.z-v.group.position.z),ce=[...S.values()].some(Y=>Y!==v&&Y.pose!=="sleeping"&&Math.hypot(X.x-Y.group.position.x,X.z-Y.group.position.z)<.62);if(ce||v.group.position.set(X.x,v.home.y,X.z),(ce||B<.001&&v.group.position.distanceTo(R)>.2)&&ht>=(v.repathAt||0)&&(v.pose==="meeting"||v.waypoints?.length)){v.repathAt=ht+1500;const Y=[...S.values()].filter(Ie=>Ie!==v&&Ie.pose!=="sleeping").map(Ie=>Ie.group.position),Se=d.path(v.group.position,v.home,Y);Se.length&&(v.waypoints=Se.map(Ie=>new G(Ie.x,v.home.y,Ie.z)))}}function ci(){if(lt)return;const v=i.getBoundingClientRect();v.width<1||v.height<1||(g.setSize(v.width,v.height,!1),h.aspect=v.width/v.height,h.updateProjectionMatrix(),yt())}function is(v="all"){de="orbit",re=null,h.fov=36,h.updateProjectionMatrix(),_.enablePan=!0,_.minDistance=8,_.maxDistance=650;const R=i.clientWidth<600,N={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const ce of fi)N[ce.id]=[[ce.x,.3,ce.z],[ce.x+14,19,ce.z+22]];for(const[ce,Y]of Object.entries(Cs))N[ce]=[Y,[Y[0]+12,19,Y[2]+22]];const[X,B]=N[v]||N.all;if(Rt.set(...X),Ht.set(...B),v==="all"||v==="residences"){const ce=Ee.bounds(),Y=v==="all"?76:ce.front,Se=ce.right-ce.left,Ie=Y-ce.back;Rt.set(0,0,(Y+ce.back)/2);const Qe=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),oe=Math.min(vs.degToRad(h.fov/2),Math.atan(Math.tan(vs.degToRad(h.fov/2))*Qe)),le=Math.hypot(Se,Ie)/2/Math.sin(oe)*1.07;Ht.copy(new G(1,1.18,1.3).normalize().multiplyScalar(le).add(Rt))}else R&&Ht.sub(Rt).multiplyScalar(1.23).add(Rt);y=null,Ee.select(S.get(z)?.pose==="sleeping"?z:null),Xe?(h.position.copy(Ht),_.target.copy(Rt),Ct=!1):Ct=!0,yt()}function wi(v){de="orbit",re=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650,h.fov=36,h.updateProjectionMatrix();const R=Ee.location(v);R&&(y=v,Ee.select(v),Rt.set(R.x,1.2,R.z),Ht.copy(Rt).add(new G(11,12,15)),i.clientWidth<600&&Ht.sub(Rt).multiplyScalar(1.23).add(Rt),Xe?(h.position.copy(Ht),_.target.copy(Rt),Ct=!1):Ct=!0,yt())}function Ri(v,R=z){if(v==="orbit"){de="orbit",re=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650;return}!S.has(R)&&D.some(X=>X.id===R)&&(z=R,Qt(D));const N=S.get(R);N&&(de=v==="portrait"?"portrait":"follow",re=R,_.enablePan=!1,_.minDistance=de==="portrait"?2.8:3.8,_.maxDistance=35,h.fov=44,h.updateProjectionMatrix(),Rt.copy(N.group.position).add(new G(0,N.pose==="sleeping"?.25:1.3,N.pose==="sleeping"?-1.3:0)),Ht.copy(Rt).add(de==="portrait"?new G(1.8,.9,2.7):new G(4,2.5,5)),Xe?(h.position.copy(Ht),_.target.copy(Rt),Ct=!1):Ct=!0,yt())}let ui=null;const Ds=new Vn({transparent:!0,opacity:0,depthWrite:!1});x.set("game-hotspots",Ds);for(const v of fi){const R=new Vt(6,1.4,.4),N=new Vt(v.kind==="court"?16:9,.18,v.kind==="court"?12:7);R.translate(0,.7,-(v.kind==="court"?6:4.2)),N.translate(0,-.14,0);const X=R.toNonIndexed(),B=N.toNonIndexed(),ce=Wn([X,B],!1);R.dispose(),N.dispose(),X.dispose(),B.dispose(),A.add(ce);const Y=new gt(ce,Ds);Y.position.set(v.x,0,v.z),Y.userData.officeGame=v.id,m.add(Y),Ti.push(Y)}const ss=new yh,T=new We,k=v=>{ui=[v.clientX,v.clientY]},j=v=>{if(!ui||Math.hypot(v.clientX-ui[0],v.clientY-ui[1])>6)return;ui=null;const R=g.domElement.getBoundingClientRect();T.set((v.clientX-R.left)/R.width*2-1,-(v.clientY-R.top)/R.height*2+1),ss.setFromCamera(T,qe||h);const N=ss.intersectObjects([...S.values()].map(B=>B.group).concat(Ee.meshes,se.targets,ae.targets,Ti),!0)[0],X=Ee.personForHit(N);if(X===Fe&&N?.object.userData.residenceLayer==="door"){a();return}X?(t(X),wi(X)):N?.object.userData.personId?t(N.object.userData.personId):N?.object.userData.officeVenue?s(N.object.userData.officeVenue):N?.object.userData.officeGame&&r(N.object.userData.officeGame)};function $(){const v=document.documentElement.classList.contains("dark");g.toneMappingExposure=v?1.02:1.18,Ae.configure(ye,xe),yt()}const J=new ResizeObserver(ci);J.observe(i);const be=new MutationObserver($);be.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const De=v=>{v.preventDefault(),lt||n()};g.domElement.addEventListener("pointerdown",k),g.domElement.addEventListener("pointerup",j),g.domElement.addEventListener("webglcontextlost",De);const Te=()=>yt();return _.addEventListener("change",Te),_.addEventListener("start",()=>{Ct=!1}),$(),is("all"),h.position.copy(Ht),_.target.copy(Rt),Ct=!1,ci(),{setPeople:Qt,resize:ci,focusRoom:is,visitHome:wi,setCameraMode:Ri,collisionBoxes:()=>d.boxes(),setPilotReporter(v){_e=v},setPrivatePilotProfile(v){te&&(te={...te,avatar:v},Qt(D.map(R=>R.id===te.id?te:R)))},setPilotGate(v){Ue=v},reconcilePilot(v){Q&&(Q.reset(v),ze=null,ge={},yt())},configureHome(v,R,N=null){Fe=v,ue=R?wr(R.slot):null,Ce=Number.isInteger(N)?Math.min(128,N):null,Ee.setPlots(Ce??0)},canUseDoor(){const v=Q?.state();return!!(ue&&v&&(qi(v,ue)||Math.hypot(v.x-ue.x,v.z-ue.z-3.9)<=2.8))},homeDoorOpen:()=>Ye,setHomeDoor(v){Ye!==!!v&&(Ye=!!v,d.configureHomes(!0,Ye?ue?.slot:null),Fe&&Ee.setDoor(Fe,Ye),yt())},setRestPose(v){if(!Q)return!1;if(!v)return ze=null,yt(),!0;const R=Q.state();if(!R.grounded||!d.free(R.x,R.z))return!1;const N=qi(R,ue)?"home":["beach","garden","terrace","lounge","bar"].find(X=>sa(R,X))||"campus";if(["recline","nap"].includes(v)){const X=Qg(d,R,[...S.values()].filter(B=>B.person.id!==O&&B.pose!=="sleeping").map(B=>B.group.position));if(X===null)return!1;Q.face({x:R.x+Math.sin(X),z:R.z+Math.cos(X)})}return ge={},ze={action:"rest",pose:v,venue:N},yt(),!0},setPilot(v,R,N=null){O=v,te=N,Q=Zg(d,R),Qt(D),Ri("follow",v),yt()},releasePilot(){const v=te?.id;O=null,te=null,Q=null,ge={},ze=null,ve=null,qt.visible=!1,Qt(D.filter(R=>R.id!==v))},setPilotInput(v){ge=v||{},yt()},pilotState(){return Q?{...Q.state(),...ze||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){O&&(Ri("follow",O),i.focus?.({preventScroll:!0}))},setPeerPilots(v){mn.clear();for(const R of v)R.id!==O&&mn.set(R.id,R);Qt(D.map(R=>({...R,pilot:mn.get(R.id)||null,in_office:mn.has(R.id)||R.id===O})))},canInteract(v){return sa(Q?.state(),v)},guideTo(v){const R=v==="home"&&ue?{x:ue.x,z:ue.z+5}:Cn.venues[v];if(ve=R?v:null,qt.visible=!!R,R){qt.position.set(R.x,.025,R.z);const N=Q?.state();_e({...N,target:v,distance:N?Math.round(Math.hypot(R.x-N.x,R.z-N.z)):null}),yt()}return R},interactNearest(){const v=Q?.state();if(!v)return!1;if(ue&&(qi(v,ue)||Math.hypot(v.x-ue.x,v.z-ue.z-3.9)<=2.8))return a(),!0;const R=Object.keys(Cn.venues).filter(N=>sa(v,N)).sort((N,X)=>Math.hypot(v.x-Cn.venues[N].x,v.z-Cn.venues[N].z)-Math.hypot(v.x-Cn.venues[X].x,v.z-Cn.venues[X].z))[0];return fi.some(N=>N.id===R)?(r(R),!0):["bar","disco","beach","garden","terrace","lounge"].includes(R)?(s(R),!0):!1},setRecreation(v,R){Number(v)===O&&R&&(ze={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[R.kind]||"idle",venue:R.destination,pose:R.kind==="relax"?"sit":null}),ne.set(Number(v),R?{...R,until:R.until||Date.now()/1e3+900}:null),Qt(D)},setVenueEffects(v){se.setEnabled(v),yt()},setGame(v){JSON.stringify(me)!==JSON.stringify(v)&&(me=v,O&&v?.status==="playing"&&[v.from,v.to].includes(O)?ze={action:"play",venue:v.kind}:ze?.action==="play"&&(ze=null),Qt(D))},say(v,R){const N=S.get(Number(v));N&&(N.bubble.textContent=String(R||"").slice(0,350),N.bubble.hidden=!1,ie.has(v)&&clearTimeout(ie.get(v)),ie.set(v,setTimeout(()=>{N.bubble.hidden=!0,ie.delete(v),yt()},1e4)),yt())},configureWorld(v){ye=v||{},Ae.configure(ye,xe),U("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[ye.settings?.landscape]||"#47695f"),yt()},setEnergySaver(v){xe=!!v,g.setPixelRatio(xe?1:Math.min(window.devicePixelRatio||1,1.5)),Ae.configure(ye,xe),ci()},setMeeting(v){q=v,Qt(D)},meetingReady(){if(O&&q?.connected&&q.room){const R=S.get(q.room.from),N=S.get(q.room.to);if(!R||!N||R.group.position.distanceTo(N.group.position)>3)return!1;const X=N.group.position.x-R.group.position.x,B=N.group.position.z-R.group.position.z,ce=Math.hypot(X,B);return ce>.2&&(Math.sin(R.group.rotation.y)*X+Math.cos(R.group.rotation.y)*B)/ce>.45&&(-Math.sin(N.group.rotation.y)*X-Math.cos(N.group.rotation.y)*B)/ce>.45}const v=q?.room;return!v||!q.connected?!1:[v.from,v.to].every(R=>{const N=S.get(R);return N&&N.pose==="meeting"&&!N.waypoints?.length&&N.group.position.distanceTo(N.home)<.2&&Math.abs(N.group.rotation.y-N.facing)<.15})},select(v,R=!1){z!==v&&(y=null),z=v,v&&!S.has(v)&&D.some(X=>X.id===v)&&Qt(D);for(const[X,B]of S)B.ring.visible=X===v,B.label.setAttribute("aria-pressed",String(X===v));const N=S.get(v);if(Ee.select(y??(N?.pose==="sleeping"?v:null)),N&&R&&O&&v!==O&&Q){Q.face(N.group.position),yt();return}if(N&&R&&de!=="orbit"){Ri(de,v);return}if(N&&R&&N.pose==="sleeping"){wi(v);return}N&&R&&(Rt.copy(N.target).add(new G(0,1,0)),Ht.copy(Rt).add(new G(11,11,14)),Xe?(h.position.copy(Ht),_.target.copy(Rt)):Ct=!0),yt()},zoom(v){if(!Number.isFinite(v)||v<=0)return;Ct=!1;const R=h.position.clone().sub(_.target);R.setLength(vs.clamp(R.length()*v,_.minDistance,_.maxDistance)),h.position.copy(_.target).add(R),_.update(),yt()},setPaused(v){if(Xe=v,Xe)for(const R of S.values())R.pose==="meeting"&&(R.group.position.copy(R.home),R.group.rotation.y=R.facing,R.waypoints=[]);pe!==null&&cancelAnimationFrame(pe),pe=null,yt()},setVisible(v){ft=v,!v&&pe!==null?(cancelAnimationFrame(pe),pe=null):v&&(ht=0,ci(),yt())},dispose(){lt=!0,pe!==null&&cancelAnimationFrame(pe),pe=null,J.disconnect(),be.disconnect(),_.dispose();for(const v of ie.values())clearTimeout(v);ie.clear(),ne.clear(),g.domElement.removeEventListener("pointerdown",k),g.domElement.removeEventListener("pointerup",j),g.domElement.removeEventListener("webglcontextlost",De),Ee.dispose(),P.dispose(),Ae.dispose();for(const v of A)v.dispose();for(const v of x.values())v.dispose();for(const v of M)v.dispose();S.forEach(v=>v.label.remove()),S.clear(),m.clear(),g.dispose(),g.forceContextLoss(),g.domElement.remove()}}}export{e0 as createOfficeScene};
