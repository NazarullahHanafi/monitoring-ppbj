import{m as Nn,w as zu,c as Ms,t as $l,a as Gu,g as es,s as ku,b as Ql,p as Hu,d as Vu,e as Wu,i as Xu}from"./virtual-office-DbwDY2Fj.js";const jo="187",hs={ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ah=0,Ya=1,lh=2,or=1,ch=2,Ns=3,Xi=0,En=1,xn=2,us=0,Us=1,gr=2,qa=3,Za=4,hh=5,as=100,uh=101,fh=102,dh=103,ph=104,mh=200,gh=201,_h=202,xh=203,sl=204,rl=205,vh=206,Mh=207,Sh=208,yh=209,bh=210,Eh=211,wh=212,Th=213,Ah=214,oo=0,ao=1,lo=2,Os=3,co=4,ho=5,uo=6,fo=7,ol=0,Rh=1,Ch=2,mi=0,al=1,ll=2,cl=3,ta=4,hl=5,ul=6,fl=7,dl=300,fs=301,Bs=302,to=303,eo=304,po=1e3,pi=1001,mo=1002,fn=1003,Ph=1004,sr=1005,bn=1006,no=1007,Li=1008,Rn=1009,pl=1010,ml=1011,zs=1012,ea=1013,ni=1014,Xn=1015,ii=1016,na=1017,ia=1018,ds=1020,gl=35902,_l=35899,xl=1021,vl=1022,ti=1023,Ui=1026,Di=1027,sa=1028,ra=1029,Yi=1030,oa=1031,aa=1033,ar=33776,lr=33777,cr=33778,hr=33779,go=35840,_o=35841,xo=35842,vo=35843,Mo=36196,So=37492,yo=37496,bo=37488,Eo=37489,_r=37490,wo=37491,To=37808,Ao=37809,Ro=37810,Co=37811,Po=37812,Lo=37813,Do=37814,Io=37815,No=37816,Uo=37817,Fo=37818,Oo=37819,Bo=37820,zo=37821,Go=36492,ko=36494,Ho=36495,Vo=36283,Wo=36284,xr=36285,Xo=36286,Lh=3200,Yo=0,Dh=1,Pi="",yn="srgb",vr="srgb-linear",Mr="linear",Pe="srgb",io=7680,Ih=519,Nh=512,Uh=513,Fh=514,Ml=515,Oh=516,Bh=517,Sl=518,yl=519,zh=35044,bl=35048,Ka="300 es",Yn=2e3,Gs=2001;function Yu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function qo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gh(){const i=qo("canvas");return i.style.display="block",i}const jl={};function Ja(...i){const t="THREE."+i.shift();console.log(t,...i)}function kh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function $t(...i){i=kh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ye(...i){i=kh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ur(...i){const t=i.join(" ");t in jl||(jl[t]=!0,$t(...i))}function qu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Zu={[oo]:oo,[lo]:uo,[co]:co,[Os]:ho,[ao]:ao,[uo]:lo,[fo]:fo,[ho]:Os};class Oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const fr=Math.PI/180,Sr=180/Math.PI;function Ws(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function fe(i,t,e){return Math.max(t,Math.min(e,i))}function El(i,t){return(i%t+t)%t}function Ku(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ju(i,t,e){return i!==t?(e-i)/(t-i):0}function dr(i,t,e){return(1-e)*i+e*t}function $u(i,t,e,n){return dr(i,t,1-Math.exp(-e*n))}function Qu(i,t=1){return t-Math.abs(El(i,t*2)-t)}function ju(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function tf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ef(i,t){return i+Math.floor(Math.random()*(t-i+1))}function nf(i,t){return i+Math.random()*(t-i)}function sf(i){return i*(.5-Math.random())}function rf(i){i!==void 0&&(tc=i);let t=tc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function of(i){return i*fr}function af(i){return i*Sr}function lf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function cf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hf(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),g=r((t-n)/2),f=o((t-n)/2),p=r((n-t)/2),v=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*g,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*g,a*l);break;case"ZXZ":i.set(c*g,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*v,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*v,a*l);break;case"ZYZ":i.set(c*v,c*p,a*u,a*l);break;default:$t("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Vh(i,t){if(t.constructor===Float32Array)return i;const e=wl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Wh(i,t){if(t.constructor===Float32Array)return i;const e=wl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Vn={DEG2RAD:fr,RAD2DEG:Sr,generateUUID:Ws,clamp:fe,euclideanModulo:El,mapLinear:Ku,inverseLerp:Ju,lerp:dr,damp:$u,pingpong:Qu,smoothstep:ju,smootherstep:tf,randInt:ef,randFloat:nf,randFloatSpread:sf,seededRandom:rf,degToRad:of,radToDeg:af,isPowerOfTwo:lf,ceilPowerOfTwo:cf,floorPowerOfTwo:Hh,setQuaternionFromProperEuler:hf,normalize:Wh,denormalize:Vh},Wl=class Wl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Wl.prototype.isVector2=!0;let Ut=Wl;class Cn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],g=n[s+3],f=r[o+0],p=r[o+1],v=r[o+2],b=r[o+3];if(g!==b||c!==f||l!==p||u!==v){let h=c*f+l*p+u*v+g*b;h<0&&(f=-f,p=-p,v=-v,b=-b,h=-h);let m=1-a;if(h<.9995){const x=Math.acos(h),w=Math.sin(x);m=Math.sin(m*x)/w,a=Math.sin(a*x)/w,c=c*m+f*a,l=l*m+p*a,u=u*m+v*a,g=g*m+b*a}else{c=c*m+f*a,l=l*m+p*a,u=u*m+v*a,g=g*m+b*a;const x=1/Math.sqrt(c*c+l*l+u*u+g*g);c*=x,l*=x,u*=x,g*=x}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],g=r[o],f=r[o+1],p=r[o+2],v=r[o+3];return t[e]=a*v+u*g+c*p-l*f,t[e+1]=c*v+u*f+l*g-a*p,t[e+2]=l*v+u*p+a*f-c*g,t[e+3]=u*v-a*g-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),g=a(r/2),f=c(n/2),p=c(s/2),v=c(r/2);switch(o){case"XYZ":this._x=f*u*g+l*p*v,this._y=l*p*g-f*u*v,this._z=l*u*v+f*p*g,this._w=l*u*g-f*p*v;break;case"YXZ":this._x=f*u*g+l*p*v,this._y=l*p*g-f*u*v,this._z=l*u*v-f*p*g,this._w=l*u*g+f*p*v;break;case"ZXY":this._x=f*u*g-l*p*v,this._y=l*p*g+f*u*v,this._z=l*u*v+f*p*g,this._w=l*u*g-f*p*v;break;case"ZYX":this._x=f*u*g-l*p*v,this._y=l*p*g+f*u*v,this._z=l*u*v-f*p*g,this._w=l*u*g+f*p*v;break;case"YZX":this._x=f*u*g+l*p*v,this._y=l*p*g+f*u*v,this._z=l*u*v-f*p*g,this._w=l*u*g-f*p*v;break;case"XZY":this._x=f*u*g-l*p*v,this._y=l*p*g-f*u*v,this._z=l*u*v+f*p*g,this._w=l*u*g+f*p*v;break;default:$t("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],g=e[10],f=n+a+g;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>g){const p=2*Math.sqrt(1+n-a-g);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>g){const p=2*Math.sqrt(1+a-n-g);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+g-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Xl=class Xl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ec.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ec.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),g=2*(r*n-o*e);return this.x=e+c*l+o*g-a*u,this.y=n+c*u+a*l-r*g,this.z=s+c*g+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Xl.prototype.isVector3=!0;let O=Xl;const va=new O,ec=new Cn,Yl=class Yl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],g=n[7],f=n[2],p=n[5],v=n[8],b=s[0],h=s[3],m=s[6],x=s[1],w=s[4],A=s[7],E=s[2],_=s[5],d=s[8];return r[0]=o*b+a*x+c*E,r[3]=o*h+a*w+c*_,r[6]=o*m+a*A+c*d,r[1]=l*b+u*x+g*E,r[4]=l*h+u*w+g*_,r[7]=l*m+u*A+g*d,r[2]=f*b+p*x+v*E,r[5]=f*h+p*w+v*_,r[8]=f*m+p*A+v*d,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],g=u*o-a*l,f=a*c-u*r,p=l*r-o*c,v=e*g+n*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/v;return t[0]=g*b,t[1]=(s*l-u*n)*b,t[2]=(a*n-s*o)*b,t[3]=f*b,t[4]=(u*e-s*c)*b,t[5]=(s*r-a*e)*b,t[6]=p*b,t[7]=(n*c-l*e)*b,t[8]=(o*e-n*r)*b,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return ur("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ma.makeScale(t,e)),this}rotate(t){return ur("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ma.makeRotation(-t)),this}translate(t,e){return ur("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Yl.prototype.isMatrix3=!0;let se=Yl;const Ma=new se,nc=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ic=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uf(){const i={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Pe&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Pe&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pi?Mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vr]:{primaries:t,whitePoint:n,transfer:Mr,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:yn},outputColorSpaceConfig:{drawingBufferColorSpace:yn}},[yn]:{primaries:t,whitePoint:n,transfer:Pe,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:yn}}}),i}const ge=uf();function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ss;class Xh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ss===void 0&&(Ss=qo("canvas")),Ss.width=t.width,Ss.height=t.height;const s=Ss.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ss}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ii(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ii(e[n]/255)*255):e[n]=Ii(e[n]);return{data:e,width:t.width,height:t.height}}else return $t("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ff=0;class la{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Sa(s[o].image)):r.push(Sa(s[o]))}else r=Sa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:($t("Texture: Unable to serialize Texture."),{})}let df=0;const ya=new O;class pn extends Oi{constructor(t=pn.DEFAULT_IMAGE,e=pn.DEFAULT_MAPPING,n=pi,s=pi,r=bn,o=Li,a=ti,c=Rn,l=pn.DEFAULT_ANISOTROPY,u=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Ws(),this.name="",this.source=new la(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ya).x}get height(){return this.source.getSize(ya).y}get depth(){return this.source.getSize(ya).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){$t(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){$t(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case po:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case po:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=dl;pn.DEFAULT_ANISOTROPY=1;const ql=class ql{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],g=c[8],f=c[1],p=c[5],v=c[9],b=c[2],h=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(g-b)<.01&&Math.abs(v-h)<.01){if(Math.abs(u+f)<.1&&Math.abs(g+b)<.1&&Math.abs(v+h)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,A=(p+1)/2,E=(m+1)/2,_=(u+f)/4,d=(g+b)/4,M=(v+h)/4;return w>A&&w>E?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=_/n,r=d/n):A>E?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=_/s,r=M/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=d/r,s=M/r),this.set(n,s,r,e),this}let x=Math.sqrt((h-v)*(h-v)+(g-b)*(g-b)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(h-v)/x,this.y=(g-b)/x,this.z=(f-u)/x,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this.w=fe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this.w=fe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ql.prototype.isVector4=!0;let Ve=ql;class Yh extends Oi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ve(0,0,t,e),this.scissorTest=!1,this.viewport=new Ve(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new pn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:bn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new la(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Yh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tl extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qh extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Qo=class Qo{constructor(t,e,n,s,r,o,a,c,l,u,g,f,p,v,b,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,g,f,p,v,b,h)}set(t,e,n,s,r,o,a,c,l,u,g,f,p,v,b,h){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=g,m[14]=f,m[3]=p,m[7]=v,m[11]=b,m[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qo().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/ys.setFromMatrixColumn(t,0).length(),r=1/ys.setFromMatrixColumn(t,1).length(),o=1/ys.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*g,v=a*u,b=a*g;e[0]=c*u,e[4]=-c*g,e[8]=l,e[1]=p+v*l,e[5]=f-b*l,e[9]=-a*c,e[2]=b-f*l,e[6]=v+p*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,p=c*g,v=l*u,b=l*g;e[0]=f+b*a,e[4]=v*a-p,e[8]=o*l,e[1]=o*g,e[5]=o*u,e[9]=-a,e[2]=p*a-v,e[6]=b+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,p=c*g,v=l*u,b=l*g;e[0]=f-b*a,e[4]=-o*g,e[8]=v+p*a,e[1]=p+v*a,e[5]=o*u,e[9]=b-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,p=o*g,v=a*u,b=a*g;e[0]=c*u,e[4]=v*l-p,e[8]=f*l+b,e[1]=c*g,e[5]=b*l+f,e[9]=p*l-v,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,p=o*l,v=a*c,b=a*l;e[0]=c*u,e[4]=b-f*g,e[8]=v*g+p,e[1]=g,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*g+v,e[10]=f-b*g}else if(t.order==="XZY"){const f=o*c,p=o*l,v=a*c,b=a*l;e[0]=c*u,e[4]=-g,e[8]=l*u,e[1]=f*g+b,e[5]=o*u,e[9]=p*g-v,e[2]=v*g-p,e[6]=a*u,e[10]=b*g+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pf,t,mf)}lookAt(t,e,n){const s=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),zi.crossVectors(n,Dn),zi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),zi.crossVectors(n,Dn)),zi.normalize(),wr.crossVectors(Dn,zi),s[0]=zi.x,s[4]=wr.x,s[8]=Dn.x,s[1]=zi.y,s[5]=wr.y,s[9]=Dn.y,s[2]=zi.z,s[6]=wr.z,s[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],g=n[5],f=n[9],p=n[13],v=n[2],b=n[6],h=n[10],m=n[14],x=n[3],w=n[7],A=n[11],E=n[15],_=s[0],d=s[4],M=s[8],R=s[12],T=s[1],S=s[5],D=s[9],I=s[13],N=s[2],k=s[6],V=s[10],X=s[14],it=s[3],j=s[7],$=s[11],lt=s[15];return r[0]=o*_+a*T+c*N+l*it,r[4]=o*d+a*S+c*k+l*j,r[8]=o*M+a*D+c*V+l*$,r[12]=o*R+a*I+c*X+l*lt,r[1]=u*_+g*T+f*N+p*it,r[5]=u*d+g*S+f*k+p*j,r[9]=u*M+g*D+f*V+p*$,r[13]=u*R+g*I+f*X+p*lt,r[2]=v*_+b*T+h*N+m*it,r[6]=v*d+b*S+h*k+m*j,r[10]=v*M+b*D+h*V+m*$,r[14]=v*R+b*I+h*X+m*lt,r[3]=x*_+w*T+A*N+E*it,r[7]=x*d+w*S+A*k+E*j,r[11]=x*M+w*D+A*V+E*$,r[15]=x*R+w*I+A*X+E*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],g=t[6],f=t[10],p=t[14],v=t[3],b=t[7],h=t[11],m=t[15],x=c*p-l*f,w=a*p-l*g,A=a*f-c*g,E=o*p-l*u,_=o*f-c*u,d=o*g-a*u;return e*(b*x-h*w+m*A)-n*(v*x-h*E+m*_)+s*(v*w-b*E+m*d)-r*(v*A-b*_+h*d)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],g=t[9],f=t[10],p=t[11],v=t[12],b=t[13],h=t[14],m=t[15],x=e*a-n*o,w=e*c-s*o,A=e*l-r*o,E=n*c-s*a,_=n*l-r*a,d=s*l-r*c,M=u*b-g*v,R=u*h-f*v,T=u*m-p*v,S=g*h-f*b,D=g*m-p*b,I=f*m-p*h,N=x*I-w*D+A*S+E*T-_*R+d*M;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/N;return t[0]=(a*I-c*D+l*S)*k,t[1]=(s*D-n*I-r*S)*k,t[2]=(b*d-h*_+m*E)*k,t[3]=(f*_-g*d-p*E)*k,t[4]=(c*T-o*I-l*R)*k,t[5]=(e*I-s*T+r*R)*k,t[6]=(h*A-v*d-m*w)*k,t[7]=(u*d-f*A+p*w)*k,t[8]=(o*D-a*T+l*M)*k,t[9]=(n*T-e*D-r*M)*k,t[10]=(v*_-b*A+m*x)*k,t[11]=(g*A-u*_-p*x)*k,t[12]=(a*R-o*S-c*M)*k,t[13]=(e*S-n*R+s*M)*k,t[14]=(b*w-v*E-h*x)*k,t[15]=(u*E-g*w+f*x)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,g=a+a,f=r*l,p=r*u,v=r*g,b=o*u,h=o*g,m=a*g,x=c*l,w=c*u,A=c*g,E=n.x,_=n.y,d=n.z;return s[0]=(1-(b+m))*E,s[1]=(p+A)*E,s[2]=(v-w)*E,s[3]=0,s[4]=(p-A)*_,s[5]=(1-(f+m))*_,s[6]=(h+x)*_,s[7]=0,s[8]=(v+w)*d,s[9]=(h-x)*d,s[10]=(1-(f+b))*d,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=ys.set(s[0],s[1],s[2]).length();const a=ys.set(s[4],s[5],s[6]).length(),c=ys.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Jn.copy(this);const l=1/o,u=1/a,g=1/c;return Jn.elements[0]*=l,Jn.elements[1]*=l,Jn.elements[2]*=l,Jn.elements[4]*=u,Jn.elements[5]*=u,Jn.elements[6]*=u,Jn.elements[8]*=g,Jn.elements[9]*=g,Jn.elements[10]*=g,e.setFromRotationMatrix(Jn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Yn,c=!1){const l=this.elements,u=2*r/(e-t),g=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let v,b;if(c)v=r/(o-r),b=o*r/(o-r);else if(a===Yn)v=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===Gs)v=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=g,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Yn,c=!1){const l=this.elements,u=2/(e-t),g=2/(n-s),f=-(e+t)/(e-t),p=-(n+s)/(n-s);let v,b;if(c)v=1/(o-r),b=o/(o-r);else if(a===Yn)v=-2/(o-r),b=-(o+r)/(o-r);else if(a===Gs)v=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=g,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Qo.prototype.isMatrix4=!0;let _e=Qo;const ys=new O,Jn=new _e,pf=new O(0,0,0),mf=new O(1,1,1),zi=new O,wr=new O,Dn=new O,sc=new _e,rc=new Cn;class si{constructor(t=0,e=0,n=0,s=si.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],g=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(fe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-g,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-fe(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:$t("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rc.setFromEuler(this),this.setFromQuaternion(rc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class ca{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gf=0;const oc=new O,bs=new Cn,wi=new _e,Tr=new O,Ks=new O,_f=new O,xf=new Cn,ac=new O(1,0,0),lc=new O(0,1,0),cc=new O(0,0,1),hc={type:"added"},vf={type:"removed"},Es={type:"childadded",child:null},ba={type:"childremoved",child:null};class tn extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new O,e=new si,n=new Cn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new se}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.multiply(bs),this}rotateOnWorldAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.premultiply(bs),this}rotateX(t){return this.rotateOnAxis(ac,t)}rotateY(t){return this.rotateOnAxis(lc,t)}rotateZ(t){return this.rotateOnAxis(cc,t)}translateOnAxis(t,e){return oc.copy(t).applyQuaternion(this.quaternion),this.position.add(oc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ac,t)}translateY(t){return this.translateOnAxis(lc,t)}translateZ(t){return this.translateOnAxis(cc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Tr.copy(t):Tr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Ks,Tr,this.up):wi.lookAt(Tr,Ks,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),bs.setFromRotationMatrix(wi),this.quaternion.premultiply(bs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ye("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hc),Es.child=t,this.dispatchEvent(Es),Es.child=null):ye("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vf),ba.child=t,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hc),Es.child=t,this.dispatchEvent(Es),Es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,t,_f),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,xf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),g=o(t.shapes),f=o(t.skeletons),p=o(t.animations),v=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),g.length>0&&(n.shapes=g),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}tn.DEFAULT_UP=new O(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Un extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mf={type:"move"};class so{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const b of t.hand.values()){const h=e.getJointPose(b,n),m=this._getHandJoint(l,b);h!==null&&(m.matrix.fromArray(h.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=h.radius),m.visible=h!==null}const u=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],f=u.position.distanceTo(g.position),p=.02,v=.005;l.inputState.pinching&&f>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Un;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Ea(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class oe{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=yn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=El(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ea(o,r,t+1/3),this.g=Ea(o,r,t),this.b=Ea(o,r,t-1/3)}return ge.colorSpaceToWorking(this,s),this}setStyle(t,e=yn){function n(r){r!==void 0&&parseFloat(r)<1&&$t("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:$t("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);$t("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=yn){const n=Zh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):$t("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=yn){return ge.workingToColorSpace(_n.copy(this),t),Math.round(fe(_n.r*255,0,255))*65536+Math.round(fe(_n.g*255,0,255))*256+Math.round(fe(_n.b*255,0,255))}getHexString(t=yn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.workingToColorSpace(_n.copy(this),e);const n=_n.r,s=_n.g,r=_n.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const g=o-a;switch(l=u<=.5?g/(o+a):g/(2-o-a),o){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ge.workingColorSpace){return ge.workingToColorSpace(_n.copy(this),e),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=yn){ge.workingToColorSpace(_n.copy(this),t);const e=_n.r,n=_n.g,s=_n.b;return t!==yn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gi),this.setHSL(Gi.h+t,Gi.s+e,Gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gi),t.getHSL(Ar);const n=dr(Gi.h,Ar.h,e),s=dr(Gi.s,Ar.s,e),r=dr(Gi.l,Ar.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new oe;oe.NAMES=Zh;class ha{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new oe(t),this.density=e}clone(){return new ha(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Kh extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const $n=new O,Ti=new O,wa=new O,Ai=new O,ws=new O,Ts=new O,uc=new O,Ta=new O,Aa=new O,Ra=new O,Ca=new Ve,Pa=new Ve,La=new Ve;class Wn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),$n.subVectors(t,e),s.cross($n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){$n.subVectors(s,e),Ti.subVectors(n,e),wa.subVectors(t,e);const o=$n.dot($n),a=$n.dot(Ti),c=$n.dot(wa),l=Ti.dot(Ti),u=Ti.dot(wa),g=o*l-a*a;if(g===0)return r.set(0,0,0),null;const f=1/g,p=(l*c-a*u)*f,v=(o*u-a*c)*f;return r.set(1-p-v,v,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ai.x),c.addScaledVector(o,Ai.y),c.addScaledVector(a,Ai.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ca.setScalar(0),Pa.setScalar(0),La.setScalar(0),Ca.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,n),La.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ca,r.x),o.addScaledVector(Pa,r.y),o.addScaledVector(La,r.z),o}static isFrontFacing(t,e,n,s){return $n.subVectors(n,e),Ti.subVectors(t,e),$n.cross(Ti).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $n.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),$n.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ws.subVectors(s,n),Ts.subVectors(r,n),Ta.subVectors(t,n);const c=ws.dot(Ta),l=Ts.dot(Ta);if(c<=0&&l<=0)return e.copy(n);Aa.subVectors(t,s);const u=ws.dot(Aa),g=Ts.dot(Aa);if(u>=0&&g<=u)return e.copy(s);const f=c*g-u*l;if(f<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),e.copy(n).addScaledVector(ws,o);Ra.subVectors(t,r);const p=ws.dot(Ra),v=Ts.dot(Ra);if(v>=0&&p<=v)return e.copy(r);const b=p*l-c*v;if(b<=0&&l>=0&&v<=0)return a=l/(l-v),e.copy(n).addScaledVector(Ts,a);const h=u*v-p*g;if(h<=0&&g-u>=0&&p-v>=0)return uc.subVectors(r,s),a=(g-u)/(g-u+(p-v)),e.copy(s).addScaledVector(uc,a);const m=1/(h+b+f);return o=b*m,a=f*m,e.copy(n).addScaledVector(ws,o).addScaledVector(Ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Zi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(t.matrixWorld),this.union(Rr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),Cr.subVectors(this.max,Js),As.subVectors(t.a,Js),Rs.subVectors(t.b,Js),Cs.subVectors(t.c,Js),ki.subVectors(Rs,As),Hi.subVectors(Cs,Rs),ns.subVectors(As,Cs);let e=[0,-ki.z,ki.y,0,-Hi.z,Hi.y,0,-ns.z,ns.y,ki.z,0,-ki.x,Hi.z,0,-Hi.x,ns.z,0,-ns.x,-ki.y,ki.x,0,-Hi.y,Hi.x,0,-ns.y,ns.x,0];return!Da(e,As,Rs,Cs,Cr)||(e=[1,0,0,0,1,0,0,0,1],!Da(e,As,Rs,Cs,Cr))?!1:(Pr.crossVectors(ki,Hi),e=[Pr.x,Pr.y,Pr.z],Da(e,As,Rs,Cs,Cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ri=[new O,new O,new O,new O,new O,new O,new O,new O],Qn=new O,Rr=new Zi,As=new O,Rs=new O,Cs=new O,ki=new O,Hi=new O,ns=new O,Js=new O,Cr=new O,Pr=new O,is=new O;function Da(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){is.fromArray(i,r);const a=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),c=t.dot(is),l=e.dot(is),u=n.dot(is);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const je=new O,Lr=new Ut;let Sf=0;class wn extends Oi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=zh,this.updateRanges=[],this.gpuType=Xn,this.version=0,this._normalizationScale=t!==void 0?wl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix3(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Vh(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Wh(t,this.array)}}class Al extends wn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Rl extends wn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Le extends wn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const yf=new Zi,$s=new O,Ia=new O;class Ki{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$s.subVectors(t,this.center);const e=$s.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector($s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ia.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($s.copy(t.center).add(Ia)),this.expandByPoint($s.copy(t.center).sub(Ia))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let bf=0;const Gn=new _e,Na=new tn,Ps=new O,In=new Zi,Qs=new Zi,un=new O;class ln extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=Ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Yu(t)?Rl:Al)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new se().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Gn.makeRotationFromQuaternion(t),this.applyMatrix4(Gn),this}rotateX(t){return Gn.makeRotationX(t),this.applyMatrix4(Gn),this}rotateY(t){return Gn.makeRotationY(t),this.applyMatrix4(Gn),this}rotateZ(t){return Gn.makeRotationZ(t),this.applyMatrix4(Gn),this}translate(t,e,n){return Gn.makeTranslation(t,e,n),this.applyMatrix4(Gn),this}scale(t,e,n){return Gn.makeScale(t,e,n),this.applyMatrix4(Gn),this}lookAt(t){return Na.lookAt(t),Na.updateMatrix(),this.applyMatrix4(Na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Le(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&$t("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];In.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(In.min,Qs.min),In.expandByPoint(un),un.addVectors(In.max,Qs.max),In.expandByPoint(un)):(In.expandByPoint(Qs.min),In.expandByPoint(Qs.max))}In.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)un.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(un));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)un.fromBufferAttribute(a,l),c&&(Ps.fromBufferAttribute(t,l),un.add(Ps)),s=Math.max(s,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new wn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let R=0;R<n.count;R++)a[R]=new O,c[R]=new O;const u=new O,g=new O,f=new O,p=new Ut,v=new Ut,b=new Ut,h=new O,m=new O;function x(R,T,S){l[R]=l[T]=l[S]=1,u.fromBufferAttribute(n,R),g.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),p.fromBufferAttribute(r,R),v.fromBufferAttribute(r,T),b.fromBufferAttribute(r,S),g.sub(u),f.sub(u),v.sub(p),b.sub(p);const D=1/(v.x*b.y-b.x*v.y);isFinite(D)&&(h.copy(g).multiplyScalar(b.y).addScaledVector(f,-v.y).multiplyScalar(D),m.copy(f).multiplyScalar(v.x).addScaledVector(g,-b.x).multiplyScalar(D),a[R].add(h),a[T].add(h),a[S].add(h),c[R].add(m),c[T].add(m),c[S].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let R=0,T=w.length;R<T;++R){const S=w[R],D=S.start,I=S.count;for(let N=D,k=D+I;N<k;N+=3)x(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const A=new O,E=new O,_=new O,d=new O;function M(R){_.fromBufferAttribute(s,R),d.copy(_);const T=a[R];A.copy(T),A.sub(_.multiplyScalar(_.dot(T))).normalize(),E.crossVectors(d,T);const D=E.dot(c[R])<0?-1:1;o.setXYZW(R,A.x,A.y,A.z,D)}for(let R=0,T=n.count;R<T;++R)l[R]&&M(R);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new wn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,u=new O,g=new O;if(t)for(let f=0,p=t.count;f<p;f+=3){const v=t.getX(f+0),b=t.getX(f+1),h=t.getX(f+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,b),o.fromBufferAttribute(e,h),u.subVectors(o,r),g.subVectors(s,r),u.cross(g),a.fromBufferAttribute(n,v),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,h),a.add(u),c.add(u),l.add(u),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),g.subVectors(s,r),u.cross(g),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)un.fromBufferAttribute(t,e),un.normalize(),t.setXYZ(e,un.x,un.y,un.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,g=a.normalized,f=new l.constructor(c.length*u);let p=0,v=0;for(let b=0,h=c.length;b<h;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*u;for(let m=0;m<u;m++)f[v++]=l[p++]}return new wn(f,u,g)}if(this.index===null)return $t("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ln,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,g=l.length;u<g;u++){const f=l[u],p=t(f,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let g=0,f=l.length;g<f;g++){const p=l[g];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],g=r[l];for(let f=0,p=g.length;f<p;f++)u.push(g[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const g=o[l];this.addGroup(g.start,g.count,g.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ua=new O,Ef=new O,wf=new se;class ui{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ua.subVectors(n,e).cross(Ef.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Ua),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||wf.getNormalMatrix(t),s=this.coplanarPoint(Ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Tf=0;class Ji extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Ws(),this.name="",this.type="Material",this.blending=Us,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sl,this.blendDst=rl,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=io,this.stencilZFail=io,this.stencilZPass=io,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){$t(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){$t(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new ui().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ut().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Ci=new O,Fa=new O,Dr=new O,Ir=new O;class Xs{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fa.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),Ir.copy(this.origin).sub(Fa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=Ir.dot(this.direction),c=-Ir.dot(Dr),l=Ir.lengthSq(),u=Math.abs(1-o*o);let g,f,p,v;if(u>0)if(g=o*c-a,f=o*a-c,v=r*u,g>=0)if(f>=-v)if(f<=v){const b=1/u;g*=b,f*=b,p=g*(g+o*f+2*a)+f*(o*g+f+2*c)+l}else f=r,g=Math.max(0,-(o*f+a)),p=-g*g+f*(f+2*c)+l;else f=-r,g=Math.max(0,-(o*f+a)),p=-g*g+f*(f+2*c)+l;else f<=-v?(g=Math.max(0,-(-o*r+a)),f=g>0?-r:Math.min(Math.max(-r,-c),r),p=-g*g+f*(f+2*c)+l):f<=v?(g=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(g=Math.max(0,-(o*r+a)),f=g>0?r:Math.min(Math.max(-r,-c),r),p=-g*g+f*(f+2*c)+l);else f=o>0?-r:r,g=Math.max(0,-(o*f+a)),p=-g*g+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Fa).addScaledVector(Dr,f),p}intersectSphere(t,e){if(t.radius<0)return null;Ci.subVectors(t.center,this.origin);const n=Ci.dot(this.direction),s=Ci.dot(Ci)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,g=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(a=(t.min.z-f.z)*g,c=(t.max.z-f.z)*g):(a=(t.max.z-f.z)*g,c=(t.min.z-f.z)*g),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,g=t.x-o.x,f=t.y-o.y,p=t.z-o.z,v=e.x-o.x,b=e.y-o.y,h=e.z-o.z,m=n.x-o.x,x=n.y-o.y,w=n.z-o.z,A=Math.abs(c),E=Math.abs(l),_=Math.abs(u);let d,M,R,T,S,D,I,N,k,V,X,it;if(A>=E&&A>=_?(R=c,D=g,k=v,it=m,c>=0?(d=l,M=u,T=f,S=p,I=b,N=h,V=x,X=w):(d=u,M=l,T=p,S=f,I=h,N=b,V=w,X=x)):E>=_?(R=l,D=f,k=b,it=x,l>=0?(d=u,M=c,T=p,S=g,I=h,N=v,V=w,X=m):(d=c,M=u,T=g,S=p,I=v,N=h,V=m,X=w)):(R=u,D=p,k=h,it=w,u>=0?(d=c,M=l,T=g,S=f,I=v,N=b,V=m,X=x):(d=l,M=c,T=f,S=g,I=b,N=v,V=x,X=m)),R===0)return null;const j=d/R,$=M/R,lt=1/R,mt=T-j*D,Rt=S-$*D,et=I-j*k,ut=N-$*k,Pt=V-j*it,At=X-$*it,Tt=Pt*ut-At*et,Xt=mt*At-Rt*Pt,Ue=et*Rt-ut*mt;if(s){if(Tt<0||Xt<0||Ue<0)return null}else if((Tt<0||Xt<0||Ue<0)&&(Tt>0||Xt>0||Ue>0))return null;const qt=Tt+Xt+Ue;if(qt===0)return null;const ae=lt*(Tt*D+Xt*k+Ue*it);return(qt>0?ae<0:ae>0)?null:this.at(ae/qt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fi extends Ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fc=new _e,ss=new Xs,Nr=new Ki,dc=new O,Ur=new O,Fr=new O,Or=new O,Oa=new O,Br=new O,pc=new O,zr=new O;class be extends tn{constructor(t=new ln,e=new fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Br.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],g=r[c];u!==0&&(Oa.fromBufferAttribute(g,t),o?Br.addScaledVector(Oa,u):Br.addScaledVector(Oa.sub(e),u))}e.add(Br)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(r),ss.copy(t.ray).recast(t.near),!(Nr.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Nr,dc)===null||ss.origin.distanceToSquared(dc)>(t.far-t.near)**2))&&(fc.copy(r).invert(),ss.copy(t.ray).applyMatrix4(fc),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ss)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,g=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,b=f.length;v<b;v++){const h=f[v],m=o[h.materialIndex],x=Math.max(h.start,p.start),w=Math.min(a.count,Math.min(h.start+h.count,p.start+p.count));for(let A=x,E=w;A<E;A+=3){const _=a.getX(A),d=a.getX(A+1),M=a.getX(A+2);s=Gr(this,m,t,n,l,u,g,_,d,M),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let h=v,m=b;h<m;h+=3){const x=a.getX(h),w=a.getX(h+1),A=a.getX(h+2);s=Gr(this,o,t,n,l,u,g,x,w,A),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,b=f.length;v<b;v++){const h=f[v],m=o[h.materialIndex],x=Math.max(h.start,p.start),w=Math.min(c.count,Math.min(h.start+h.count,p.start+p.count));for(let A=x,E=w;A<E;A+=3){const _=A,d=A+1,M=A+2;s=Gr(this,m,t,n,l,u,g,_,d,M),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{const v=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let h=v,m=b;h<m;h+=3){const x=h,w=h+1,A=h+2;s=Gr(this,o,t,n,l,u,g,x,w,A),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}}}function Af(i,t,e,n,s,r,o,a){let c;if(t.side===En?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Xi,a),c===null)return null;zr.copy(a),zr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(zr);return l<e.near||l>e.far?null:{distance:l,point:zr.clone(),object:i}}function Gr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ur),i.getVertexPosition(c,Fr),i.getVertexPosition(l,Or);const u=Af(i,t,e,n,Ur,Fr,Or,pc);if(u){const g=new O;Wn.getBarycoord(pc,Ur,Fr,Or,g),s&&(u.uv=Wn.getInterpolatedAttribute(s,a,c,l,g,new Ut)),r&&(u.uv1=Wn.getInterpolatedAttribute(r,a,c,l,g,new Ut)),o&&(u.normal=Wn.getInterpolatedAttribute(o,a,c,l,g,new O),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new O,materialIndex:0};Wn.getNormal(Ur,Fr,Or,f.normal),u.face=f,u.barycoord=g}return u}class Cl extends pn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=fn,u=fn,g,f){super(null,o,a,c,l,u,s,r,g,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $a extends wn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ls=new _e,mc=new _e,kr=[],gc=new Zi,Rf=new _e,js=new be,tr=new Ki;class Pl extends be{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $a(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Rf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ls),gc.copy(t.boundingBox).applyMatrix4(Ls),this.boundingBox.union(gc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ls),tr.copy(t.boundingSphere).applyMatrix4(Ls),this.boundingSphere.union(tr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),t.ray.intersectsSphere(tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ls),mc.multiplyMatrices(n,Ls),js.matrixWorld=mc,js.raycast(t,kr);for(let o=0,a=kr.length;o<a;o++){const c=kr[o];c.instanceId=r,c.object=this,e.push(c)}kr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new $a(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cl(new Float32Array(s*this.count),s,this.count,sa,Xn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const rs=new Ki,Cf=new Ut(.5,.5),Hr=new O;class ks{constructor(t=new ui,e=new ui,n=new ui,s=new ui,r=new ui,o=new ui){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Yn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],g=r[5],f=r[6],p=r[7],v=r[8],b=r[9],h=r[10],m=r[11],x=r[12],w=r[13],A=r[14],E=r[15];if(s[0].setComponents(l-o,p-u,m-v,E-x).normalize(),s[1].setComponents(l+o,p+u,m+v,E+x).normalize(),s[2].setComponents(l+a,p+g,m+b,E+w).normalize(),s[3].setComponents(l-a,p-g,m-b,E-w).normalize(),n)s[4].setComponents(c,f,h,A).normalize(),s[5].setComponents(l-c,p-f,m-h,E-A).normalize();else if(s[4].setComponents(l-c,p-f,m-h,E-A).normalize(),e===Yn)s[5].setComponents(l+c,p+f,m+h,E+A).normalize();else if(e===Gs)s[5].setComponents(c,f,h,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(t){rs.center.set(0,0,0);const e=Cf.distanceTo(t.center);return rs.radius=.7071067811865476+e,rs.applyMatrix4(t.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Hr.x=s.normal.x>0?t.max.x:t.min.x,Hr.y=s.normal.y>0?t.max.y:t.min.y,Hr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const _c=new _e;class ua{constructor(){this.coordinateSystem=Yn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];_c.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ks),n[s].setFromProjectionMatrix(_c,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new ks),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new ua().copy(this)}}class Ll extends Ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zo=new O,Ko=new O,xc=new _e,er=new Xs,Vr=new Ki,Ba=new O,vc=new O;class Jh extends tn{constructor(t=new ln,e=new Ll){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Zo.fromBufferAttribute(e,s-1),Ko.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Zo.distanceTo(Ko);t.setAttribute("lineDistance",new Le(n,1))}else $t("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(s),Vr.radius+=r,t.ray.intersectsSphere(Vr)===!1)return;xc.copy(s).invert(),er.copy(t.ray).applyMatrix4(xc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),v=Math.min(u.count,o.start+o.count);for(let b=p,h=v-1;b<h;b+=l){const m=u.getX(b),x=u.getX(b+1),w=Wr(this,t,er,c,m,x,b);w&&e.push(w)}if(this.isLineLoop){const b=u.getX(v-1),h=u.getX(p),m=Wr(this,t,er,c,b,h,v-1);m&&e.push(m)}}else{const p=Math.max(0,o.start),v=Math.min(f.count,o.start+o.count);for(let b=p,h=v-1;b<h;b+=l){const m=Wr(this,t,er,c,b,b+1,b);m&&e.push(m)}if(this.isLineLoop){const b=Wr(this,t,er,c,v-1,p,v-1);b&&e.push(b)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Zo.fromBufferAttribute(a,s),Ko.fromBufferAttribute(a,r),e.distanceSqToSegment(Zo,Ko,Ba,vc)>n)return;Ba.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ba);if(!(l<t.near||l>t.far))return{distance:l,point:vc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Mc=new O,Sc=new O;class $h extends Jh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Mc.fromBufferAttribute(e,s),Sc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Mc.distanceTo(Sc);t.setAttribute("lineDistance",new Le(n,1))}else $t("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Dl extends Ji{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yc=new _e,Qa=new Xs,Xr=new Ki,Yr=new O;class Qh extends tn{constructor(t=new ln,e=new Dl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(s),Xr.radius+=r,t.ray.intersectsSphere(Xr)===!1)return;yc.copy(s).invert(),Qa.copy(t.ray).applyMatrix4(yc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,g=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let v=f,b=p;v<b;v++){const h=l.getX(v);Yr.fromBufferAttribute(g,h),bc(Yr,h,c,s,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(g.count,o.start+o.count);for(let v=f,b=p;v<b;v++)Yr.fromBufferAttribute(g,v),bc(Yr,v,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function bc(i,t,e,n,s,r,o){const a=Qa.distanceSqToPoint(i);if(a<e){const c=new O;Qa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Il extends pn{constructor(t=[],e=fs,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ja extends pn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ps extends pn{constructor(t,e,n=ni,s,r,o,a=fn,c=fn,l,u=Ui,g=1){if(u!==Ui&&u!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:g};super(f,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new la(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Nl extends ps{constructor(t,e=ni,n=fs,s,r,o=fn,a=fn,c,l=Ui){const u={width:t,height:t,depth:1},g=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Ul extends pn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class an extends ln{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],g=[];let f=0,p=0;v("z","y","x",-1,-1,n,e,t,o,r,0),v("z","y","x",1,-1,n,e,-t,o,r,1),v("x","z","y",1,1,t,n,e,s,o,2),v("x","z","y",1,-1,t,n,-e,s,o,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Le(l,3)),this.setAttribute("normal",new Le(u,3)),this.setAttribute("uv",new Le(g,2));function v(b,h,m,x,w,A,E,_,d,M,R){const T=A/d,S=E/M,D=A/2,I=E/2,N=_/2,k=d+1,V=M+1;let X=0,it=0;const j=new O;for(let $=0;$<V;$++){const lt=$*S-I;for(let mt=0;mt<k;mt++){const Rt=mt*T-D;j[b]=Rt*x,j[h]=lt*w,j[m]=N,l.push(j.x,j.y,j.z),j[b]=0,j[h]=0,j[m]=_>0?1:-1,u.push(j.x,j.y,j.z),g.push(mt/d),g.push(1-$/M),X+=1}}for(let $=0;$<M;$++)for(let lt=0;lt<d;lt++){const mt=f+lt+k*$,Rt=f+lt+k*($+1),et=f+(lt+1)+k*($+1),ut=f+(lt+1)+k*$;c.push(mt,Rt,ut),c.push(Rt,et,ut),it+=6}a.addGroup(p,it,R),p+=it,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class qn extends ln{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],g=[],f=[],p=[];let v=0;const b=[],h=n/2;let m=0;x(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Le(g,3)),this.setAttribute("normal",new Le(f,3)),this.setAttribute("uv",new Le(p,2));function x(){const A=new O,E=new O;let _=0;const d=(e-t)/n;for(let M=0;M<=r;M++){const R=[],T=M/r,S=T*(e-t)+t;for(let D=0;D<=s;D++){const I=D/s,N=I*c+a,k=Math.sin(N),V=Math.cos(N);E.x=S*k,E.y=-T*n+h,E.z=S*V,g.push(E.x,E.y,E.z),A.set(k,d,V).normalize(),f.push(A.x,A.y,A.z),p.push(I,1-T),R.push(v++)}b.push(R)}for(let M=0;M<s;M++)for(let R=0;R<r;R++){const T=b[R][M],S=b[R+1][M],D=b[R+1][M+1],I=b[R][M+1];(t>0||R!==0)&&(u.push(T,S,I),_+=3),(e>0||R!==r-1)&&(u.push(S,D,I),_+=3)}l.addGroup(m,_,0),m+=_}function w(A){const E=v,_=new Ut,d=new O;let M=0;const R=A===!0?t:e,T=A===!0?1:-1;for(let D=1;D<=s;D++)g.push(0,h*T,0),f.push(0,T,0),p.push(.5,.5),v++;const S=v;for(let D=0;D<=s;D++){const N=D/s*c+a,k=Math.cos(N),V=Math.sin(N);d.x=R*V,d.y=h*T,d.z=R*k,g.push(d.x,d.y,d.z),f.push(0,T,0),_.x=k*.5+.5,_.y=V*.5*T+.5,p.push(_.x,_.y),v++}for(let D=0;D<s;D++){const I=E+D,N=S+D;A===!0?u.push(N,N+1,I):u.push(N+1,N,I),M+=3}l.addGroup(m,M,A===!0?1:2),m+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gi extends qn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new gi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fa extends ln{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new Le(r,3)),this.setAttribute("normal",new Le(r.slice(),3)),this.setAttribute("uv",new Le(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const w=new O,A=new O,E=new O;for(let _=0;_<e.length;_+=3)p(e[_+0],w),p(e[_+1],A),p(e[_+2],E),c(w,A,E,x)}function c(x,w,A,E){const _=E+1,d=[];for(let M=0;M<=_;M++){d[M]=[];const R=x.clone().lerp(A,M/_),T=w.clone().lerp(A,M/_),S=_-M;for(let D=0;D<=S;D++)D===0&&M===_?d[M][D]=R:d[M][D]=R.clone().lerp(T,D/S)}for(let M=0;M<_;M++)for(let R=0;R<2*(_-M)-1;R++){const T=Math.floor(R/2);R%2===0?(f(d[M][T+1]),f(d[M+1][T]),f(d[M][T])):(f(d[M][T+1]),f(d[M+1][T+1]),f(d[M+1][T]))}}function l(x){const w=new O;for(let A=0;A<r.length;A+=3)w.x=r[A+0],w.y=r[A+1],w.z=r[A+2],w.normalize().multiplyScalar(x),r[A+0]=w.x,r[A+1]=w.y,r[A+2]=w.z}function u(){const x=new O;for(let w=0;w<r.length;w+=3){x.x=r[w+0],x.y=r[w+1],x.z=r[w+2];const A=h(x)/2/Math.PI+.5,E=m(x)/Math.PI+.5;o.push(A,1-E)}v(),g()}function g(){for(let x=0;x<o.length;x+=6){const w=o[x+0],A=o[x+2],E=o[x+4],_=Math.max(w,A,E),d=Math.min(w,A,E);_>.9&&d<.1&&(w<.2&&(o[x+0]+=1),A<.2&&(o[x+2]+=1),E<.2&&(o[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function p(x,w){const A=x*3;w.x=t[A+0],w.y=t[A+1],w.z=t[A+2]}function v(){const x=new O,w=new O,A=new O,E=new O,_=new Ut,d=new Ut,M=new Ut;for(let R=0,T=0;R<r.length;R+=9,T+=6){x.set(r[R+0],r[R+1],r[R+2]),w.set(r[R+3],r[R+4],r[R+5]),A.set(r[R+6],r[R+7],r[R+8]),_.set(o[T+0],o[T+1]),d.set(o[T+2],o[T+3]),M.set(o[T+4],o[T+5]),E.copy(x).add(w).add(A).divideScalar(3);const S=h(E);b(_,T+0,x,S),b(d,T+2,w,S),b(M,T+4,A,S)}}function b(x,w,A,E){E<0&&x.x===1&&(o[w]=x.x-1),A.x===0&&A.z===0&&(o[w]=E/2/Math.PI+.5)}function h(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fa(t.vertices,t.indices,t.radius,t.detail)}}class _i{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$t("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,p=(o-u)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Ut:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new O,s=[],r=[],o=[],a=new O,c=new _e;for(let p=0;p<=t;p++){const v=p/t;s[p]=this.getTangentAt(v,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),g=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),g<=l&&(l=g,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(fe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,v))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(fe(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let v=1;v<=t;v++)r[v].applyMatrix4(c.makeRotationAxis(s[v],p*v)),o[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class Fl extends _i{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ut){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),g=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*g+this.aX,l=f*g+p*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class jh extends Fl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ol(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,g){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+g)+(c-a)/g;f*=u,p*=u,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Ec=new O,wc=new O,za=new Ol,Ga=new Ol,ka=new Ol;class tu extends _i{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(wc.subVectors(s[0],s[1]).add(s[0]),l=wc);const g=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Ec.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ec),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(l.distanceToSquared(g),p),b=Math.pow(g.distanceToSquared(f),p),h=Math.pow(f.distanceToSquared(u),p);b<1e-4&&(b=1),v<1e-4&&(v=b),h<1e-4&&(h=b),za.initNonuniformCatmullRom(l.x,g.x,f.x,u.x,v,b,h),Ga.initNonuniformCatmullRom(l.y,g.y,f.y,u.y,v,b,h),ka.initNonuniformCatmullRom(l.z,g.z,f.z,u.z,v,b,h)}else this.curveType==="catmullrom"&&(za.initCatmullRom(l.x,g.x,f.x,u.x,this.tension),Ga.initCatmullRom(l.y,g.y,f.y,u.y,this.tension),ka.initCatmullRom(l.z,g.z,f.z,u.z,this.tension));return n.set(za.calc(c),Ga.calc(c),ka.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Tc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Pf(i,t){const e=1-i;return e*e*t}function Lf(i,t){return 2*(1-i)*i*t}function Df(i,t){return i*i*t}function pr(i,t,e,n){return Pf(i,t)+Lf(i,e)+Df(i,n)}function If(i,t){const e=1-i;return e*e*e*t}function Nf(i,t){const e=1-i;return 3*e*e*i*t}function Uf(i,t){return 3*(1-i)*i*i*t}function Ff(i,t){return i*i*i*t}function mr(i,t,e,n,s){return If(i,t)+Nf(i,e)+Uf(i,n)+Ff(i,s)}class eu extends _i{constructor(t=new Ut,e=new Ut,n=new Ut,s=new Ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ut){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(mr(t,s.x,r.x,o.x,a.x),mr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class nu extends _i{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(mr(t,s.x,r.x,o.x,a.x),mr(t,s.y,r.y,o.y,a.y),mr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class iu extends _i{constructor(t=new Ut,e=new Ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class su extends _i{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ru extends _i{constructor(t=new Ut,e=new Ut,n=new Ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ut){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(pr(t,s.x,r.x,o.x),pr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bl extends _i{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(pr(t,s.x,r.x,o.x),pr(t,s.y,r.y,o.y),pr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ou extends _i{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ut){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],g=s[o>s.length-3?s.length-1:o+2];return n.set(Tc(a,c.x,l.x,u.x,g.x),Tc(a,c.y,l.y,u.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ut().fromArray(s))}return this}}var Of=Object.freeze({__proto__:null,ArcCurve:jh,CatmullRomCurve3:tu,CubicBezierCurve:eu,CubicBezierCurve3:nu,EllipseCurve:Fl,LineCurve:iu,LineCurve3:su,QuadraticBezierCurve:ru,QuadraticBezierCurve3:Bl,SplineCurve:ou});class da extends fa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new da(t.radius,t.detail)}}class Fi extends ln{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,g=t/a,f=e/c,p=[],v=[],b=[],h=[];for(let m=0;m<u;m++){const x=m*f-o;for(let w=0;w<l;w++){const A=w*g-r;v.push(A,-x,0),b.push(0,0,1),h.push(w/a),h.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const w=x+l*m,A=x+l*(m+1),E=x+1+l*(m+1),_=x+1+l*m;p.push(w,A,_),p.push(A,E,_)}this.setIndex(p),this.setAttribute("position",new Le(v,3)),this.setAttribute("normal",new Le(b,3)),this.setAttribute("uv",new Le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.width,t.height,t.widthSegments,t.heightSegments)}}class yr extends ln{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let g=t;const f=(e-t)/s,p=new O,v=new Ut;for(let b=0;b<=s;b++){for(let h=0;h<=n;h++){const m=r+h/n*o;p.x=g*Math.cos(m),p.y=g*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),v.x=(p.x/e+1)/2,v.y=(p.y/e+1)/2,u.push(v.x,v.y)}g+=f}for(let b=0;b<s;b++){const h=b*(n+1);for(let m=0;m<n;m++){const x=m+h,w=x,A=x+n+1,E=x+n+2,_=x+1;a.push(w,A,_),a.push(A,E,_)}}this.setIndex(a),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(l,3)),this.setAttribute("uv",new Le(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Wi extends ln{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],g=new O,f=new O,p=[],v=[],b=[],h=[];for(let m=0;m<=n;m++){const x=[],w=m/n,A=o+w*a,E=t*Math.cos(A),_=Math.sqrt(t*t-E*E);let d=0;m===0&&o===0?d=.5/e:m===n&&c===Math.PI&&(d=-.5/e);for(let M=0;M<=e;M++){const R=M/e,T=s+R*r;g.x=-_*Math.cos(T),g.y=E,g.z=_*Math.sin(T),v.push(g.x,g.y,g.z),f.copy(g).normalize(),b.push(f.x,f.y,f.z),h.push(R+d,1-w),x.push(l++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const w=u[m][x+1],A=u[m][x],E=u[m+1][x],_=u[m+1][x+1];(m!==0||o>0)&&p.push(w,A,_),(m!==n-1||c<Math.PI)&&p.push(A,E,_)}this.setIndex(p),this.setAttribute("position",new Le(v,3)),this.setAttribute("normal",new Le(b,3)),this.setAttribute("uv",new Le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ni extends ln{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],u=[],g=[],f=new O,p=new O,v=new O;for(let b=0;b<=n;b++){const h=o+b/n*a;for(let m=0;m<=s;m++){const x=m/s*r;p.x=(t+e*Math.cos(h))*Math.cos(x),p.y=(t+e*Math.cos(h))*Math.sin(x),p.z=e*Math.sin(h),l.push(p.x,p.y,p.z),f.x=t*Math.cos(x),f.y=t*Math.sin(x),v.subVectors(p,f).normalize(),u.push(v.x,v.y,v.z),g.push(m/s),g.push(b/n)}}for(let b=1;b<=n;b++)for(let h=1;h<=s;h++){const m=(s+1)*b+h-1,x=(s+1)*(b-1)+h-1,w=(s+1)*(b-1)+h,A=(s+1)*b+h;c.push(m,x,A),c.push(x,w,A)}this.setIndex(c),this.setAttribute("position",new Le(l,3)),this.setAttribute("normal",new Le(u,3)),this.setAttribute("uv",new Le(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class zl extends ln{constructor(t=new Bl(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new O,c=new O,l=new Ut;let u=new O;const g=[],f=[],p=[],v=[];b(),this.setIndex(v),this.setAttribute("position",new Le(g,3)),this.setAttribute("normal",new Le(f,3)),this.setAttribute("uv",new Le(p,2));function b(){for(let w=0;w<e;w++)h(w);h(r===!1?e:0),x(),m()}function h(w){u=t.getPointAt(w/e,u);const A=o.normals[w],E=o.binormals[w];for(let _=0;_<=s;_++){const d=_/s*Math.PI*2,M=Math.sin(d),R=-Math.cos(d);c.x=R*A.x+M*E.x,c.y=R*A.y+M*E.y,c.z=R*A.z+M*E.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,g.push(a.x,a.y,a.z)}}function m(){for(let w=1;w<=e;w++)for(let A=1;A<=s;A++){const E=(s+1)*(w-1)+(A-1),_=(s+1)*w+(A-1),d=(s+1)*w+A,M=(s+1)*(w-1)+A;v.push(E,_,M),v.push(_,d,M)}}function x(){for(let w=0;w<=e;w++)for(let A=0;A<=s;A++)l.x=w/e,l.y=A/s,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new zl(new Of[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Hs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Ac(s))s.isRenderTargetTexture?($t("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Ac(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Sn(i){const t={};for(let e=0;e<i.length;e++){const n=Hs(i[e]);for(const s in n)t[s]=n[s]}return t}function Ac(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Bf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function au(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const lu={clone:Hs,merge:Sn};var zf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends Ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zf,this.fragmentShader=Gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=Bf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ve().fromArray(s.value);break;case"m3":this.uniforms[n].value=new se().fromArray(s.value);break;case"m4":this.uniforms[n].value=new _e().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class cu extends qi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Vs extends Ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hu extends Ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uu extends Ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Gl extends tn{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class fu extends Gl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ha=new _e,Rc=new O,Cc=new O;class du{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Rc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Rc),Cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ha,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Gs||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Ha)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const qr=new O,Zr=new Cn,ai=new O;class kl extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(qr,Zr,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,ai.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(qr,Zr,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new O,Pc=new Ut,Lc=new Ut;class Hn extends kl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Sr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sr*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z)}getViewSize(t,e){return this.getViewBounds(t,Pc,Lc),e.subVectors(Lc,Pc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(fr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Hl extends kl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class kf extends du{constructor(){super(new Hl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tl extends Gl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new kf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ds=-90,Is=1;class Jo extends tn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Hn(Ds,Is,t,e);s.layers=this.layers,this.add(s);const r=new Hn(Ds,Is,t,e);r.layers=this.layers,this.add(r);const o=new Hn(Ds,Is,t,e);o.layers=this.layers,this.add(o);const a=new Hn(Ds,Is,t,e);a.layers=this.layers,this.add(a);const c=new Hn(Ds,Is,t,e);c.layers=this.layers,this.add(c);const l=new Hn(Ds,Is,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,g=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const b=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;t.isWebGLRenderer===!0?h=t.state.buffers.depth.getReversed():h=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=b,t.setRenderTarget(n,5,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(g,f,p),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class pu extends Hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const Dc=new _e;class mu{constructor(t,e,n=0,s=1/0){this.ray=new Xs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ye("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Dc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Dc),this}intersectObject(t,e=!0,n=[]){return el(t,this,n,e),n.sort(Ic),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)el(t[s],this,n,e);return n.sort(Ic),n}}function Ic(i,t){return i.distance-t.distance}function el(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)el(r[o],t,e,!0)}}class nl{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(fe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gu extends Oi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Nc(i,t,e,n){const s=Hf(n);switch(e){case xl:return i*t;case sa:return i*t/s.components*s.byteLength;case ra:return i*t/s.components*s.byteLength;case Yi:return i*t*2/s.components*s.byteLength;case oa:return i*t*2/s.components*s.byteLength;case vl:return i*t*3/s.components*s.byteLength;case ti:return i*t*4/s.components*s.byteLength;case aa:return i*t*4/s.components*s.byteLength;case ar:case lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case cr:case hr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _o:case vo:return Math.max(i,16)*Math.max(t,8)/4;case go:case xo:return Math.max(i,8)*Math.max(t,8)/2;case Mo:case So:case bo:case Eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case yo:case _r:case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Po:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Io:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case zo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Go:case ko:case Ho:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Vo:case Wo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case xr:case Xo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hf(i){switch(i){case Rn:case pl:return{byteLength:1,components:1};case zs:case ml:case ii:return{byteLength:2,components:1};case na:case ia:return{byteLength:2,components:4};case ni:case ea:case Xn:return{byteLength:4,components:1};case gl:case _l:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jo}}));typeof window<"u"&&(window.__THREE__?$t("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jo);function _u(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Vf(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,g=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:g}}function n(a,c,l){const u=c.array,g=c.updateRanges;if(i.bindBuffer(l,a),g.length===0)i.bufferSubData(l,0,u);else{g.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<g.length;p++){const v=g[f],b=g[p];b.start<=v.start+v.count+1?v.count=Math.max(v.count,b.start+b.count-v.start):(++f,g[f]=b)}g.length=f+1;for(let p=0,v=g.length;p<v;p++){const b=g[p];i.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xf=`#ifdef USE_ALPHAHASH
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
#endif`,Yf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jf=`#ifdef USE_AOMAP
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
#endif`,$f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qf=`#ifdef USE_BATCHING
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
#endif`,jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,id=`#ifdef USE_IRIDESCENCE
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
#endif`,sd=`#ifdef USE_BUMPMAP
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
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,dd=`#define PI 3.141592653589793
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
} // validated`,pd=`vec3 transformedNormal = objectNormal;
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
#endif`,md=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Md=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sd=`#ifdef USE_ENVMAP
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
#endif`,yd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,Td=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ad=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pd=`#ifdef USE_GRADIENTMAP
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
}`,Ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ud=`#ifdef USE_ENVMAP
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
#endif`,Fd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gd=`PhysicalMaterial material;
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
#endif`,kd=`uniform sampler2D dfgLUT;
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
}`,Hd=`
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
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Yd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$d=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jd=`#if defined( USE_POINTS_UV )
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
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ip=`#if defined( USE_MORPHCOLORS )
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
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rp=`#ifdef USE_MORPHTARGETS
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
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
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
#endif`,dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ap=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rp=`float getShadowMask() {
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
}`,Cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pp=`#ifdef USE_SKINNING
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
#endif`,Lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Op=`#ifdef USE_TRANSMISSION
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
#endif`,Bp=`#ifdef USE_TRANSMISSION
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
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wp=`uniform sampler2D t2D;
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`uniform float backgroundBlurriness;
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
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`#include <common>
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
}`,Jp=`#if DEPTH_PACKING == 3200
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
}`,$p=`#define DISTANCE
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
}`,Qp=`#define DISTANCE
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
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`uniform float scale;
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
}`,nm=`uniform vec3 diffuse;
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
}`,im=`#include <common>
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
}`,sm=`uniform vec3 diffuse;
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
}`,rm=`#define LAMBERT
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
}`,om=`#define LAMBERT
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
}`,am=`#define MATCAP
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
}`,lm=`#define MATCAP
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
}`,cm=`#define NORMAL
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
}`,hm=`#define NORMAL
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
}`,um=`#define PHONG
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
}`,fm=`#define PHONG
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
}`,dm=`#define STANDARD
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
}`,pm=`#define STANDARD
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
}`,mm=`#define TOON
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
}`,gm=`#define TOON
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
}`,_m=`uniform float size;
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
}`,xm=`uniform vec3 diffuse;
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
}`,vm=`#include <common>
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
}`,Mm=`uniform vec3 color;
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
}`,Sm=`uniform float rotation;
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
}`,ym=`uniform vec3 diffuse;
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
}`,ue={alphahash_fragment:Wf,alphahash_pars_fragment:Xf,alphamap_fragment:Yf,alphamap_pars_fragment:qf,alphatest_fragment:Zf,alphatest_pars_fragment:Kf,aomap_fragment:Jf,aomap_pars_fragment:$f,batching_pars_vertex:Qf,batching_vertex:jf,begin_vertex:td,beginnormal_vertex:ed,bsdfs:nd,iridescence_fragment:id,bumpmap_pars_fragment:sd,clipping_planes_fragment:rd,clipping_planes_pars_fragment:od,clipping_planes_pars_vertex:ad,clipping_planes_vertex:ld,color_fragment:cd,color_pars_fragment:hd,color_pars_vertex:ud,color_vertex:fd,common:dd,defaultnormal_vertex:pd,displacementmap_pars_vertex:md,displacementmap_vertex:gd,emissivemap_fragment:_d,emissivemap_pars_fragment:xd,colorspace_fragment:vd,colorspace_pars_fragment:Md,envmap_fragment:Sd,envmap_common_pars_fragment:yd,envmap_pars_fragment:bd,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Ud,envmap_vertex:wd,fog_vertex:Td,fog_pars_vertex:Ad,fog_fragment:Rd,fog_pars_fragment:Cd,gradientmap_pars_fragment:Pd,lightmap_pars_fragment:Ld,lights_lambert_fragment:Dd,lights_lambert_pars_fragment:Id,lights_pars_begin:Nd,lights_toon_fragment:Fd,lights_toon_pars_fragment:Od,lights_phong_fragment:Bd,lights_phong_pars_fragment:zd,lights_physical_fragment:Gd,lights_physical_pars_fragment:kd,lights_fragment_begin:Hd,lights_fragment_maps:Vd,lights_fragment_end:Wd,lightprobes_pars_fragment:Xd,logdepthbuf_fragment:Yd,logdepthbuf_pars_fragment:qd,logdepthbuf_pars_vertex:Zd,logdepthbuf_vertex:Kd,map_fragment:Jd,map_pars_fragment:$d,map_particle_fragment:Qd,map_particle_pars_fragment:jd,metalnessmap_fragment:tp,metalnessmap_pars_fragment:ep,morphinstance_vertex:np,morphcolor_vertex:ip,morphnormal_vertex:sp,morphtarget_pars_vertex:rp,morphtarget_vertex:op,normal_fragment_begin:ap,normal_fragment_maps:lp,normal_pars_fragment:cp,normal_pars_vertex:hp,normal_vertex:up,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:dp,clearcoat_normal_fragment_maps:pp,clearcoat_pars_fragment:mp,iridescence_pars_fragment:gp,opaque_fragment:_p,packing:xp,premultiplied_alpha_fragment:vp,project_vertex:Mp,dithering_fragment:Sp,dithering_pars_fragment:yp,roughnessmap_fragment:bp,roughnessmap_pars_fragment:Ep,shadowmap_pars_fragment:wp,shadowmap_pars_vertex:Tp,shadowmap_vertex:Ap,shadowmask_pars_fragment:Rp,skinbase_vertex:Cp,skinning_pars_vertex:Pp,skinning_vertex:Lp,skinnormal_vertex:Dp,specularmap_fragment:Ip,specularmap_pars_fragment:Np,tonemapping_fragment:Up,tonemapping_pars_fragment:Fp,transmission_fragment:Op,transmission_pars_fragment:Bp,uv_pars_fragment:zp,uv_pars_vertex:Gp,uv_vertex:kp,worldpos_vertex:Hp,background_vert:Vp,background_frag:Wp,backgroundCube_vert:Xp,backgroundCube_frag:Yp,cube_vert:qp,cube_frag:Zp,depth_vert:Kp,depth_frag:Jp,distance_vert:$p,distance_frag:Qp,equirect_vert:jp,equirect_frag:tm,linedashed_vert:em,linedashed_frag:nm,meshbasic_vert:im,meshbasic_frag:sm,meshlambert_vert:rm,meshlambert_frag:om,meshmatcap_vert:am,meshmatcap_frag:lm,meshnormal_vert:cm,meshnormal_frag:hm,meshphong_vert:um,meshphong_frag:fm,meshphysical_vert:dm,meshphysical_frag:pm,meshtoon_vert:mm,meshtoon_frag:gm,points_vert:_m,points_frag:xm,shadow_vert:vm,shadow_frag:Mm,sprite_vert:Sm,sprite_frag:ym},Lt={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},jn={basic:{uniforms:Sn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ue.meshbasic_vert,fragmentShader:ue.meshbasic_frag},lambert:{uniforms:Sn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new oe(0)},envMapIntensity:{value:1}}]),vertexShader:ue.meshlambert_vert,fragmentShader:ue.meshlambert_frag},phong:{uniforms:Sn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ue.meshphong_vert,fragmentShader:ue.meshphong_frag},standard:{uniforms:Sn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag},toon:{uniforms:Sn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new oe(0)}}]),vertexShader:ue.meshtoon_vert,fragmentShader:ue.meshtoon_frag},matcap:{uniforms:Sn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ue.meshmatcap_vert,fragmentShader:ue.meshmatcap_frag},points:{uniforms:Sn([Lt.points,Lt.fog]),vertexShader:ue.points_vert,fragmentShader:ue.points_frag},dashed:{uniforms:Sn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ue.linedashed_vert,fragmentShader:ue.linedashed_frag},depth:{uniforms:Sn([Lt.common,Lt.displacementmap]),vertexShader:ue.depth_vert,fragmentShader:ue.depth_frag},normal:{uniforms:Sn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ue.meshnormal_vert,fragmentShader:ue.meshnormal_frag},sprite:{uniforms:Sn([Lt.sprite,Lt.fog]),vertexShader:ue.sprite_vert,fragmentShader:ue.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ue.background_vert,fragmentShader:ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:ue.backgroundCube_vert,fragmentShader:ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ue.cube_vert,fragmentShader:ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ue.equirect_vert,fragmentShader:ue.equirect_frag},distance:{uniforms:Sn([Lt.common,Lt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ue.distance_vert,fragmentShader:ue.distance_frag},shadow:{uniforms:Sn([Lt.lights,Lt.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:ue.shadow_vert,fragmentShader:ue.shadow_frag}};jn.physical={uniforms:Sn([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new se},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag};const Kr={r:0,b:0,g:0},bm=new _e,xu=new se;xu.set(-1,0,0,0,1,0,0,0,1);function Em(i,t,e,n,s,r){const o=new oe(0);let a=s===!0?0:1,c,l,u=null,g=0,f=null;function p(x){let w=x.isScene===!0?x.background:null;if(w&&w.isTexture){const A=x.backgroundBlurriness>0;w=t.get(w,A)}return w}function v(x){let w=!1;const A=p(x);A===null?h(o,a):A&&A.isColor&&(h(A,1),w=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(x,w){const A=p(w);A&&A.isCubeTexture?(l===void 0&&(l=new be(new an(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:Hs(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,_,d){this.matrixWorld.copyPosition(d.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bm.makeRotationFromEuler(w.backgroundRotation)).transpose(),A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xu),l.material.toneMapped=ge.getTransfer(A.colorSpace)!==Pe,(u!==A||g!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,g=A.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new be(new Fi(2,2),new qi({name:"BackgroundMaterial",uniforms:Hs(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ge.getTransfer(A.colorSpace)!==Pe,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||g!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,g=A.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function h(x,w){x.getRGB(Kr,au(i)),e.buffers.color.setClear(Kr.r,Kr.g,Kr.b,w,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,w=1){o.set(x),a=w,h(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,h(o,a)},render:v,addToRenderList:b,dispose:m}}function wm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,D,I,N,k){let V=!1;const X=g(S,N,I,D);r!==X&&(r=X,l(r.object)),V=p(S,N,I,k),V&&v(S,N,I,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,A(S,D,I,N),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function g(S,D,I,N){const k=N.wireframe===!0;let V=n[D.id];V===void 0&&(V={},n[D.id]=V);const X=S.isInstancedMesh===!0?S.id:0;let it=V[X];it===void 0&&(it={},V[X]=it);let j=it[I.id];j===void 0&&(j={},it[I.id]=j);let $=j[k];return $===void 0&&($=f(c()),j[k]=$),$}function f(S){const D=[],I=[],N=[];for(let k=0;k<e;k++)D[k]=0,I[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:I,attributeDivisors:N,object:S,attributes:{},index:null}}function p(S,D,I,N){const k=r.attributes,V=D.attributes;let X=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){const lt=k[j];let mt=V[j];if(mt===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(mt=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(mt=S.instanceColor)),lt===void 0||lt.attribute!==mt||mt&&lt.data!==mt.data)return!0;X++}return r.attributesNum!==X||r.index!==N}function v(S,D,I,N){const k={},V=D.attributes;let X=0;const it=I.getAttributes();for(const j in it)if(it[j].location>=0){let lt=V[j];lt===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(lt=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(lt=S.instanceColor));const mt={};mt.attribute=lt,lt&&lt.data&&(mt.data=lt.data),k[j]=mt,X++}r.attributes=k,r.attributesNum=X,r.index=N}function b(){const S=r.newAttributes;for(let D=0,I=S.length;D<I;D++)S[D]=0}function h(S){m(S,0)}function m(S,D){const I=r.newAttributes,N=r.enabledAttributes,k=r.attributeDivisors;I[S]=1,N[S]===0&&(i.enableVertexAttribArray(S),N[S]=1),k[S]!==D&&(i.vertexAttribDivisor(S,D),k[S]=D)}function x(){const S=r.newAttributes,D=r.enabledAttributes;for(let I=0,N=D.length;I<N;I++)D[I]!==S[I]&&(i.disableVertexAttribArray(I),D[I]=0)}function w(S,D,I,N,k,V,X){X===!0?i.vertexAttribIPointer(S,D,I,k,V):i.vertexAttribPointer(S,D,I,N,k,V)}function A(S,D,I,N){b();const k=N.attributes,V=I.getAttributes(),X=D.defaultAttributeValues;for(const it in V){const j=V[it];if(j.location>=0){let $=k[it];if($===void 0&&(it==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),it==="instanceColor"&&S.instanceColor&&($=S.instanceColor)),$!==void 0){const lt=$.normalized,mt=$.itemSize,Rt=t.get($);if(Rt===void 0)continue;const et=Rt.buffer,ut=Rt.type,Pt=Rt.bytesPerElement,At=ut===i.INT||ut===i.UNSIGNED_INT||$.gpuType===ea;if($.isInterleavedBufferAttribute){const Tt=$.data,Xt=Tt.isInterleavedBuffer===!0?Tt.stride:Tt.itemSize,Ue=$.offset;if(Tt.isInstancedInterleavedBuffer||Tt.isInstancedBufferAttribute){for(let qt=0;qt<j.locationSize;qt++)m(j.location+qt,Tt.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Tt.meshPerAttribute*Tt.count)}else for(let qt=0;qt<j.locationSize;qt++)h(j.location+qt);i.bindBuffer(i.ARRAY_BUFFER,et);for(let qt=0;qt<j.locationSize;qt++)w(j.location+qt,mt/j.locationSize,ut,lt,Xt*Pt,(Ue+mt/j.locationSize*qt)*Pt,At)}else{if($.isInstancedBufferAttribute){for(let Tt=0;Tt<j.locationSize;Tt++)m(j.location+Tt,$.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Tt=0;Tt<j.locationSize;Tt++)h(j.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Tt=0;Tt<j.locationSize;Tt++)w(j.location+Tt,mt/j.locationSize,ut,lt,mt*Pt,mt/j.locationSize*Tt*Pt,At)}}else if(X!==void 0){const lt=X[it];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv(j.location,lt);break;case 3:i.vertexAttrib3fv(j.location,lt);break;case 4:i.vertexAttrib4fv(j.location,lt);break;default:i.vertexAttrib1fv(j.location,lt)}}}}x()}function E(){R();for(const S in n){const D=n[S];for(const I in D){const N=D[I];for(const k in N){const V=N[k];for(const X in V)u(V[X].object),delete V[X];delete N[k]}}delete n[S]}}function _(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const I in D){const N=D[I];for(const k in N){const V=N[k];for(const X in V)u(V[X].object),delete V[X];delete N[k]}}delete n[S.id]}function d(S){for(const D in n){const I=n[D];for(const N in I){const k=I[N];if(k[S.id]===void 0)continue;const V=k[S.id];for(const X in V)u(V[X].object),delete V[X];delete k[S.id]}}}function M(S){for(const D in n){const I=n[D],N=S.isInstancedMesh===!0?S.id:0,k=I[N];if(k!==void 0){for(const V in k){const X=k[V];for(const it in X)u(X[it].object),delete X[it];delete k[V]}delete I[N],Object.keys(I).length===0&&delete n[D]}}}function R(){T(),o=!0,r!==s&&(r=s,l(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:T,dispose:E,releaseStatesOfGeometry:_,releaseStatesOfObject:M,releaseStatesOfProgram:d,initAttributes:b,enableAttribute:h,disableUnusedAttributes:x}}function Tm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let p=0;p<u;p++)f+=l[p];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Am(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const d=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(d){return!(d!==ti&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(d){const M=d===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(d!==Rn&&d!==Xn&&!M&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&($t("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&g===!1;e.reversedDepthBuffer===!0&&g===!1&&$t("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&g===!0&&$t("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),_=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:g,maxTextures:p,maxVertexTextures:v,maxTextureSize:b,maxCubemapSize:h,maxAttributes:m,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:A,maxSamples:E,samples:_}}function Rm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ui,a=new se,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,f){const p=g.length!==0||f||n!==0||s;return s=f,n=g.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,f){e=u(g,f,0)},this.setState=function(g,f,p){const v=g.clippingPlanes,b=g.clipIntersection,h=g.clipShadows,m=i.get(g);if(!s||v===null||v.length===0||r&&!h)r?u(null):l();else{const x=r?0:n,w=x*4;let A=m.clippingState||null;c.value=A,A=u(v,f,w,p);for(let E=0;E!==w;++E)A[E]=e[E];m.clippingState=A,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(g,f,p,v){const b=g!==null?g.length:0;let h=null;if(b!==0){if(h=c.value,v!==!0||h===null){const m=p+b*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(h===null||h.length<m)&&(h=new Float32Array(m));for(let w=0,A=p;w!==b;++w,A+=4)o.copy(g[w]).applyMatrix4(x,a),o.normal.toArray(h,A),h[A+3]=o.constant}c.value=h,c.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,h}}class pa extends ei{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Il(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new an(5,5,5),r=new qi({name:"CubemapFromEquirect",uniforms:Hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:us});r.uniforms.tEquirect.value=e;const o=new be(s,r),a=e.minFilter;return e.minFilter===Li&&(e.minFilter=bn),new Jo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Uc=256,Cm=3,Pm=20,vu=256,Mu=16,Lm=3,Dm=new O,Im=new oe;class br{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Jo(1,10,null),this._boxMesh=new be(new an(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Dm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,f=c.autoClearColor,p=c.autoClearDepth,v=c.autoClearStencil,b=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,b===null&&(t.background=c.getClearColor(Im));const h=new Jo(n,s,u);return h.position.copy(a),h.update(c,t),c.autoClear=g,c.autoClearColor=f,c.autoClearDepth=p,c.autoClearStencil=v,t.background=b,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Uc,Hh(t))}_fromTexture(t,e){t.mapping===fs||t.mapping===Bs?this._setSize(t.image.length===0?Uc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Fc(t,!1,!1),n=Math.log2(t)-Cm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Fc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===fs||t.mapping===Bs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Oc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Nm(),this._integrationMaterial=Um());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Mu);for(let o=0;o<=n;o++){const a=br.lodToRoughness(o,n);if(o>n-Lm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(vu*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Fm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Fc(i,t,e){return new pa(i,{minFilter:Li,generateMipmaps:t,type:ii,colorSpace:vr,depthBuffer:e})}function Er(i,t,e){return new qi({name:i,uniforms:t,vertexShader:ue.cube_vert,fragmentShader:e,side:En,blending:us,depthTest:!1,depthWrite:!1})}function Nm(){return Er("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${vu}u

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
	`)}function Um(){return Er("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Mu}},`

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
	`)}function Fm(){return Er("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Pm}
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
	`)}function Oc(){return Er("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Bc(){return Er("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Om(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,p=!1){return f==null?null:p?o(f):r(f)}function r(f){if(f&&f.isTexture){const p=f.mapping;if(p===to||p===eo)if(t.has(f)){const v=t.get(f).texture;return a(v,f.mapping)}else{const v=f.image;if(v&&v.height>0){const b=new pa(v.height);return b.fromEquirectangularTexture(i,f),t.set(f,b),f.addEventListener("dispose",l),a(b.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){const p=f.mapping,v=p===to||p===eo,b=p===fs||p===Bs;if(v||b){let h=e.get(f);const m=h!==void 0?h.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new br(i)),h=v?n.fromEquirectangular(f,h):n.fromCubemap(f,h),h.texture.pmremVersion=f.pmremVersion,e.set(f,h),h.texture;if(h!==void 0)return h.texture;{const x=f.image;return v&&x&&x.height>0||b&&x&&c(x)?(n===null&&(n=new br(i)),h=v?n.fromEquirectangular(f):n.fromCubemap(f),h.texture.pmremVersion=f.pmremVersion,e.set(f,h),f.addEventListener("dispose",u),h.texture):null}}}return f}function a(f,p){return p===to?f.mapping=fs:p===eo&&(f.mapping=Bs),f}function c(f){let p=0;const v=6;for(let b=0;b<v;b++)f[b]!==void 0&&p++;return p===v}function l(f){const p=f.target;p.removeEventListener("dispose",l);const v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function u(f){const p=f.target;p.removeEventListener("dispose",u);const v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function Bm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ur("WebGLRenderer: "+n+" extension not supported."),s}}}function zm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(v=>delete s[v]);function a(v){c(v.target)}function c(v){v.index!==null&&t.remove(v.index);for(const h in v.attributes)t.remove(v.attributes[h]);v.removeEventListener("dispose",a),delete s[v.id],o.unregister(v);const b=r.get(v);b&&(t.remove(b),r.delete(v)),n.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,e.memory.geometries--}function l(v,b){return s[b.id]!==void 0||(b.addEventListener("dispose",a),s[b.id]=new WeakRef(b),o.register(b,b.id,b),e.memory.geometries++),b}function u(v){const b=v.attributes;for(const h in b)t.update(b[h],i.ARRAY_BUFFER)}function g(v){const b=v.index,h=v.attributes.position;let m=0;if(h===void 0)return;const x=b!==null?b.array.length:h.array.length/3-1,w=h.count>=65535?Rl:Al,A=new w(Math.ceil(x/3)*6,1),E=A.array;if(b!==null){const d=b.array;m=b.version;for(let M=0,R=0;M<x;M+=3){const T=d[M+0],S=d[M+1],D=d[M+2];E[R++]=T,E[R++]=S,E[R++]=S,E[R++]=D,E[R++]=D,E[R++]=T}}else{m=h.version;for(let d=0,M=0;d<x;d+=3){const R=d+0,T=d+1,S=d+2;E[M++]=R,E[M++]=T,E[M++]=T,E[M++]=S,E[M++]=S,E[M++]=R}}A.version=m;const _=r.get(v);_&&t.remove(_),r.set(v,A)}function f(v){const b=r.get(v);if(b){const h=v.index;h!==null&&b.version<h.version&&g(v)}else g(v);return r.get(v)}function p(){for(const v in s){const b=s[v].deref();b!==void 0&&c(b)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Gm(i,t,e){let n;function s(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function c(g,f){i.drawElements(n,f,r,g*o),e.update(f,n,1)}function l(g,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,g*o,p),e.update(f,n,p))}function u(g,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,g,0,p);let b=0;for(let h=0;h<p;h++)b+=f[h];e.update(b,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function km(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:ye("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Hm(i,t,e){const n=new WeakMap,s=new Ve;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,g=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==g){let R=function(){d.dispose(),n.delete(a),a.removeEventListener("dispose",R)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let w=0;p===!0&&(w=1),v===!0&&(w=2),b===!0&&(w=3);let A=a.attributes.position.count*w,E=1;A>t.maxTextureSize&&(E=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const _=new Float32Array(A*E*4*g),d=new Tl(_,A,E,g);d.type=Xn,d.needsUpdate=!0;const M=w*4;for(let T=0;T<g;T++){const S=h[T],D=m[T],I=x[T],N=A*E*4*T;for(let k=0;k<S.count;k++){const V=k*M;p===!0&&(s.fromBufferAttribute(S,k),_[N+V+0]=s.x,_[N+V+1]=s.y,_[N+V+2]=s.z,_[N+V+3]=0),v===!0&&(s.fromBufferAttribute(D,k),_[N+V+4]=s.x,_[N+V+5]=s.y,_[N+V+6]=s.z,_[N+V+7]=0),b===!0&&(s.fromBufferAttribute(I,k),_[N+V+8]=s.x,_[N+V+9]=s.y,_[N+V+10]=s.z,_[N+V+11]=I.itemSize===4?s.w:1)}}f={count:g,texture:d,size:new Ut(A,E)},n.set(a,f),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];const v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Vm(i,t,e,n,s){let r=new WeakMap;function o(l){const u=s.render.frame,g=l.geometry,f=t.get(l,g);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return f}function a(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}const Wm={[al]:"LINEAR_TONE_MAPPING",[ll]:"REINHARD_TONE_MAPPING",[cl]:"CINEON_TONE_MAPPING",[ta]:"ACES_FILMIC_TONE_MAPPING",[ul]:"AGX_TONE_MAPPING",[fl]:"NEUTRAL_TONE_MAPPING",[hl]:"CUSTOM_TONE_MAPPING"};function Xm(i,t,e,n,s,r){const o=new ei(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const u=new ln;u.setAttribute("position",new Le([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Le([0,2,0,0,2,0],2));const g=new cu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new be(u,g),p=new Hl(-1,1,1,-1,0,1);let v=null,b=null,h=!1,m,x=null,w=[],A=!1;this.setSize=function(E,_){o.setSize(E,_),a!==null&&a.setSize(E,_),c!==null&&c.setSize(E,_);for(let d=0;d<w.length;d++){const M=w[d];M.setSize&&M.setSize(E,_)}},this.setEffects=function(E){w=E,A=w.length>0&&w[0].isRenderPass===!0;const _=o.width,d=o.height;w.length>0&&a===null&&(a=new ei(_,d,{type:ii,depthBuffer:!1,stencilBuffer:!1}),c=new ei(_,d,{type:ii,depthBuffer:!1,stencilBuffer:!1}));const M=s===!0&&w.some(R=>R.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&l===null&&(l=new ps(_,d),r===!0&&(l.format=Di,l.type=ds)),o.dispose(),o.depthTexture=M?l:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let R=0;R<w.length;R++){const T=w[R];T.setSize&&T.setSize(_,d),M&&T.needsDepthTexture===!0&&T.setDepthTexture&&T.setDepthTexture(l)}},this.begin=function(E,_){if(h||E.toneMapping===mi&&w.length===0)return!1;if(x=_,_!==null){const d=_.width,M=_.height;(o.width!==d||o.height!==M)&&this.setSize(d,M)}return A===!1&&E.setRenderTarget(o),m=E.toneMapping,E.toneMapping=mi,!0},this.hasRenderPass=function(){return A},this.end=function(E,_){E.toneMapping=m,h=!0;let d=o,M=a;for(let R=0;R<w.length;R++){const T=w[R];T.enabled!==!1&&(T.render(E,M,d,_),T.needsSwap!==!1&&(d=M,M=M===a?c:a))}if(v!==E.outputColorSpace||b!==E.toneMapping){v=E.outputColorSpace,b=E.toneMapping,g.defines={},ge.getTransfer(v)===Pe&&(g.defines.SRGB_TRANSFER="");const R=Wm[b];R&&(g.defines[R]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=d.texture,E.setRenderTarget(x),E.render(f,p),x=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),g.dispose()}}const Su=new pn,yu=new ps(1,1),bu=new Nl(1),Eu=new Tl,wu=new qh,Tu=new Il,zc=[],Gc=[],kc=new Float32Array(16),Hc=new Float32Array(9),Vc=new Float32Array(4);function Ys(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=zc[s];if(r===void 0&&(r=new Float32Array(s),zc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function cn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function hn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ma(i,t){let e=Gc[t];e===void 0&&(e=new Int32Array(t),Gc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ym(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;i.uniform2fv(this.addr,t),hn(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(cn(e,t))return;i.uniform3fv(this.addr,t),hn(e,t)}}function Km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;i.uniform4fv(this.addr,t),hn(e,t)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;Vc.set(n),i.uniformMatrix2fv(this.addr,!1,Vc),hn(e,n)}}function $m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;Hc.set(n),i.uniformMatrix3fv(this.addr,!1,Hc),hn(e,n)}}function Qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(cn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),hn(e,t)}else{if(cn(e,n))return;kc.set(n),i.uniformMatrix4fv(this.addr,!1,kc),hn(e,n)}}function jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function t0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;i.uniform2iv(this.addr,t),hn(e,t)}}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(cn(e,t))return;i.uniform3iv(this.addr,t),hn(e,t)}}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;i.uniform4iv(this.addr,t),hn(e,t)}}function i0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(cn(e,t))return;i.uniform2uiv(this.addr,t),hn(e,t)}}function r0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(cn(e,t))return;i.uniform3uiv(this.addr,t),hn(e,t)}}function o0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(cn(e,t))return;i.uniform4uiv(this.addr,t),hn(e,t)}}function ga(i){return i.version===0&&(i.compareFunction=yl,i.needsUpdate=!0),i}function a0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ga(yu):r=Su,e.setTexture2D(t||r,s)}function l0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||wu,s)}function c0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ga(bu):r=Tu,e.setTextureCube(t||r,s)}function h0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Eu,s)}function u0(i){switch(i){case 5126:return Ym;case 35664:return qm;case 35665:return Zm;case 35666:return Km;case 35674:return Jm;case 35675:return $m;case 35676:return Qm;case 5124:case 35670:return jm;case 35667:case 35671:return t0;case 35668:case 35672:return e0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return s0;case 36295:return r0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return l0;case 35680:case 36300:case 36308:case 36293:return c0;case 36289:case 36303:case 36311:case 36292:return h0}}function f0(i,t){i.uniform1fv(this.addr,t)}function d0(i,t){const e=Ys(t,this.size,2);i.uniform2fv(this.addr,e)}function p0(i,t){const e=Ys(t,this.size,3);i.uniform3fv(this.addr,e)}function m0(i,t){const e=Ys(t,this.size,4);i.uniform4fv(this.addr,e)}function g0(i,t){const e=Ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _0(i,t){const e=Ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function x0(i,t){const e=Ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function v0(i,t){i.uniform1iv(this.addr,t)}function M0(i,t){i.uniform2iv(this.addr,t)}function S0(i,t){i.uniform3iv(this.addr,t)}function y0(i,t){i.uniform4iv(this.addr,t)}function b0(i,t){i.uniform1uiv(this.addr,t)}function E0(i,t){i.uniform2uiv(this.addr,t)}function w0(i,t){i.uniform3uiv(this.addr,t)}function T0(i,t){i.uniform4uiv(this.addr,t)}function A0(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=ga(yu):o=Su;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function R0(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||wu,r[o])}function C0(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=ga(bu):o=Tu;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function P0(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Eu,r[o])}function L0(i){switch(i){case 5126:return f0;case 35664:return d0;case 35665:return p0;case 35666:return m0;case 35674:return g0;case 35675:return _0;case 35676:return x0;case 5124:case 35670:return v0;case 35667:case 35671:return M0;case 35668:case 35672:return S0;case 35669:case 35673:return y0;case 5125:return b0;case 36294:return E0;case 36295:return w0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return A0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return C0;case 36289:case 36303:case 36311:case 36292:return P0}}class D0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=u0(e.type)}}class I0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=L0(e.type)}}class N0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Va=/(\w+)(\])?(\[|\.)?/g;function Wc(i,t){i.seq.push(t),i.map[t.id]=t}function U0(i,t,e){const n=i.name,s=n.length;for(Va.lastIndex=0;;){const r=Va.exec(n),o=Va.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Wc(e,l===void 0?new D0(a,i,t):new I0(a,i,t));break}else{let g=e.map[a];g===void 0&&(g=new N0(a),Wc(e,g)),e=g}}}class ro{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);U0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Xc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const F0=37297;let O0=0;function B0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Yc=new se;function z0(i){ge._getMatrix(Yc,ge.workingColorSpace,i);const t=`mat3( ${Yc.elements.map(e=>e.toFixed(4))} )`;switch(ge.getTransfer(i)){case Mr:return[t,"LinearTransferOETF"];case Pe:return[t,"sRGBTransferOETF"];default:return $t("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function qc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+B0(i.getShaderSource(t),a)}else return r}function G0(i,t){const e=z0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const k0={[al]:"Linear",[ll]:"Reinhard",[cl]:"Cineon",[ta]:"ACESFilmic",[ul]:"AgX",[fl]:"Neutral",[hl]:"Custom"};function H0(i,t){const e=k0[t];return e===void 0?($t("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Jr=new O;function V0(){ge.getLuminanceCoefficients(Jr);const i=Jr.x.toFixed(4),t=Jr.y.toFixed(4),e=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function X0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Y0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function rr(i){return i!==""}function Zc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Kc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function il(i){return i.replace(q0,Z0)}function Z0(i,t){const e=ue[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return il(e)}const K0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jc(i){return i.replace(K0,J0)}function J0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $c(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const $0={[or]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function Q0(i){return $0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const j0={[Bs]:"ENVMAP_MODE_REFRACTION"};function tg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":j0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const eg={[ol]:"ENVMAP_BLENDING_MULTIPLY",[Rh]:"ENVMAP_BLENDING_MIX",[Ch]:"ENVMAP_BLENDING_ADD"};function ng(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":eg[i.combine]||"ENVMAP_BLENDING_NONE"}function ig(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Q0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=tg(e),g=ng(e),f=W0(e),p=X0(r),v=s.createProgram();let b,h,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(b=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(rr).join(`
`),b.length>0&&(b+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(rr).join(`
`),h.length>0&&(h+=`
`)):(b=[$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),h=[$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+g:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==mi?"#define TONE_MAPPING":"",e.toneMapping!==mi?ue.tonemapping_pars_fragment:"",e.toneMapping!==mi?H0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ue.colorspace_pars_fragment,G0("linearToOutputTexel",e.outputColorSpace),V0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(rr).join(`
`)),o=il(o),o=Zc(o,e),o=Kc(o,e),a=il(a),a=Zc(a,e),a=Kc(a,e),o=Jc(o),a=Jc(a),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,b=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,h=["#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=m+b+o,w=m+h+a,A=Xc(s,s.VERTEX_SHADER,x),E=Xc(s,s.FRAGMENT_SHADER,w);s.attachShader(v,A),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function _(T){if(i.debug.checkShaderErrors){const S=s.getProgramInfoLog(v)||"",D=s.getShaderInfoLog(A)||"",I=s.getShaderInfoLog(E)||"",N=S.trim(),k=D.trim(),V=I.trim();let X=!0,it=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,E);else{const j=qc(s,A,"vertex"),$=qc(s,E,"fragment");ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+N+`
`+j+`
`+$)}else N!==""?$t("WebGLProgram: Program Info Log:",N):(k===""||V==="")&&(it=!1);it&&(T.diagnostics={runnable:X,programLog:N,vertexShader:{log:k,prefix:b},fragmentShader:{log:V,prefix:h}})}s.deleteShader(A),s.deleteShader(E),d=new ro(s,v),M=Y0(s,v)}let d;this.getUniforms=function(){return d===void 0&&_(this),d};let M;this.getAttributes=function(){return M===void 0&&_(this),M};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,F0)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=O0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=E,this}let sg=0;class rg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new og(t),e.set(t,n)),n}}class og{constructor(t){this.id=sg++,this.code=t,this.usedTimes=0}}function ag(i){return i===Yi||i===_r||i===xr}function lg(i,t,e,n,s,r){const o=new ca,a=new rg,c=new Set,l=[],u=new Map,g=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(d){return c.add(d),d===0?"uv":`uv${d}`}function v(d,M,R,T,S,D){const I=T.fog,N=S.geometry,k=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?T.environment:null,V=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,X=t.get(d.envMap||k,V),it=f[d.type];let j=n.precision;d.precision!==null&&(j=n.getMaxPrecision(d.precision),j!==d.precision&&$t("WebGLProgram.getParameters:",d.precision,"not supported, using",j,"instead."));const $=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,lt=$!==void 0?$.length:0;let mt=0;N.morphAttributes.position!==void 0&&(mt=1),N.morphAttributes.normal!==void 0&&(mt=2),N.morphAttributes.color!==void 0&&(mt=3);let Rt,et,ut,Pt;if(it){const Ct=jn[it];Rt=Ct.vertexShader,et=Ct.fragmentShader}else{Rt=d.vertexShader,et=d.fragmentShader;const Ct=a.getVertexShaderStage(d),ie=a.getFragmentShaderStage(d);a.update(d,Ct,ie),ut=Ct.id,Pt=ie.id}const At=i.getRenderTarget(),Tt=i.state.buffers.depth.getReversed(),Xt=S.isInstancedMesh===!0,Ue=S.isBatchedMesh===!0,qt=!!d.map,ae=!!d.matcap,st=!!X,Ot=st&&X.isPMREMTexture===!0,Et=!!d.aoMap,Yt=!!d.lightMap,jt=!!d.bumpMap&&d.wireframe===!1,Jt=!!d.normalMap,Me=!!d.displacementMap,Ee=!!d.emissiveMap,We=!!d.metalnessMap,Re=!!d.roughnessMap,$e=d.anisotropy>0,H=d.clearcoat>0,le=d.diffuseRoughness>0,te=d.dispersion>0,xe=d.retroreflectivity>0,Mt=d.iridescence>0,Ce=d.sheen>0,Zt=d.transmission>0,ee=$e&&!!d.anisotropyMap,U=H&&!!d.clearcoatMap,C=H&&!!d.clearcoatNormalMap,J=H&&!!d.clearcoatRoughnessMap,ct=le&&!!d.diffuseRoughnessMap,at=Mt&&!!d.iridescenceMap,vt=Mt&&!!d.iridescenceThicknessMap,ht=Ce&&!!d.sheenColorMap,rt=Ce&&!!d.sheenRoughnessMap,ot=!!d.specularMap,St=!!d.specularColorMap,B=!!d.specularIntensityMap,nt=Zt&&!!d.transmissionMap,q=Zt&&!!d.thicknessMap,yt=!!d.gradientMap,_t=!!d.alphaMap,dt=d.alphaTest>0,Ht=!!d.alphaHash,re=!!d.extensions;let pt=mi;d.toneMapped&&(At===null||At.isXRRenderTarget===!0)&&(pt=i.toneMapping);const Bt=Ot?X.isCompressedCubeTexture?X.image[0].mipmaps:X.mipmaps:null,ne={shaderID:it,shaderType:d.type,shaderName:d.name,vertexShader:Rt,fragmentShader:et,defines:d.defines,customVertexShaderID:ut,customFragmentShaderID:Pt,isRawShaderMaterial:d.isRawShaderMaterial===!0,glslVersion:d.glslVersion,precision:j,batching:Ue,batchingColor:Ue&&S._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&S.instanceColor!==null,instancingMorph:Xt&&S.morphTexture!==null,outputColorSpace:At===null?i.outputColorSpace:At.isXRRenderTarget===!0?At.texture.colorSpace:ge.workingColorSpace,alphaToCoverage:!!d.alphaToCoverage,map:qt,matcap:ae,envMap:st,envMapMode:st&&X.mapping,envMapPMREM:Ot,envMapMaxLod:Ot?Bt.length-1:null,envMapSize:Ot?Bt[0].width:null,aoMap:Et,lightMap:Yt,bumpMap:jt,normalMap:Jt,displacementMap:Me,emissiveMap:Ee,normalMapObjectSpace:Jt&&d.normalMapType===Dh,normalMapTangentSpace:Jt&&d.normalMapType===Yo,packedNormalMap:Jt&&d.normalMapType===Yo&&ag(d.normalMap.format),metalnessMap:We,roughnessMap:Re,anisotropy:$e,anisotropyMap:ee,clearcoat:H,clearcoatMap:U,clearcoatNormalMap:C,clearcoatRoughnessMap:J,diffuseRoughness:le,diffuseRoughnessMap:ct,dispersion:te,retroreflection:xe,iridescence:Mt,iridescenceMap:at,iridescenceThicknessMap:vt,sheen:Ce,sheenColorMap:ht,sheenRoughnessMap:rt,specularMap:ot,specularColorMap:St,specularIntensityMap:B,transmission:Zt,transmissionMap:nt,thicknessMap:q,gradientMap:yt,opaque:d.transparent===!1&&d.blending===Us&&d.alphaToCoverage===!1,alphaMap:_t,alphaTest:dt,alphaHash:Ht,combine:d.combine,mapUv:qt&&p(d.map.channel),aoMapUv:Et&&p(d.aoMap.channel),lightMapUv:Yt&&p(d.lightMap.channel),bumpMapUv:jt&&p(d.bumpMap.channel),normalMapUv:Jt&&p(d.normalMap.channel),displacementMapUv:Me&&p(d.displacementMap.channel),emissiveMapUv:Ee&&p(d.emissiveMap.channel),metalnessMapUv:We&&p(d.metalnessMap.channel),roughnessMapUv:Re&&p(d.roughnessMap.channel),anisotropyMapUv:ee&&p(d.anisotropyMap.channel),clearcoatMapUv:U&&p(d.clearcoatMap.channel),clearcoatNormalMapUv:C&&p(d.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&p(d.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ct&&p(d.diffuseRoughnessMap.channel),iridescenceMapUv:at&&p(d.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&p(d.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&p(d.sheenColorMap.channel),sheenRoughnessMapUv:rt&&p(d.sheenRoughnessMap.channel),specularMapUv:ot&&p(d.specularMap.channel),specularColorMapUv:St&&p(d.specularColorMap.channel),specularIntensityMapUv:B&&p(d.specularIntensityMap.channel),transmissionMapUv:nt&&p(d.transmissionMap.channel),thicknessMapUv:q&&p(d.thicknessMap.channel),alphaMapUv:_t&&p(d.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Jt||$e),vertexNormals:!!N.attributes.normal,vertexColors:d.vertexColors,vertexAlphas:d.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!N.attributes.uv&&(qt||_t),fog:!!I,useFog:d.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:d.wireframe===!1&&(d.flatShading===!0||N.attributes.normal===void 0&&Jt===!1&&(d.isMeshLambertMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isMeshPhysicalMaterial)),sizeAttenuation:d.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:Tt,skinning:S.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:mt,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:D.filter(Ct=>Ct.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:d.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:pt,decodeVideoTexture:qt&&d.map.isVideoTexture===!0&&ge.getTransfer(d.map.colorSpace)===Pe,decodeVideoTextureEmissive:Ee&&d.emissiveMap.isVideoTexture===!0&&ge.getTransfer(d.emissiveMap.colorSpace)===Pe,premultipliedAlpha:d.premultipliedAlpha,doubleSided:d.side===xn,flipSided:d.side===En,useDepthPacking:d.depthPacking>=0,depthPacking:d.depthPacking||0,index0AttributeName:d.index0AttributeName,extensionClipCullDistance:re&&d.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&d.extensions.multiDraw===!0||Ue)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:d.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function b(d){const M=[];if(d.shaderID?M.push(d.shaderID):(M.push(d.customVertexShaderID),M.push(d.customFragmentShaderID)),d.defines!==void 0)for(const R in d.defines)M.push(R),M.push(d.defines[R]);return d.isRawShaderMaterial===!1&&(h(M,d),m(M,d),M.push(i.outputColorSpace)),M.push(d.customProgramCacheKey),M.join()}function h(d,M){d.push(M.precision),d.push(M.outputColorSpace),d.push(M.envMapMode),d.push(M.envMapPMREM),d.push(M.envMapMaxLod),d.push(M.envMapSize),d.push(M.mapUv),d.push(M.alphaMapUv),d.push(M.lightMapUv),d.push(M.aoMapUv),d.push(M.bumpMapUv),d.push(M.normalMapUv),d.push(M.displacementMapUv),d.push(M.emissiveMapUv),d.push(M.metalnessMapUv),d.push(M.roughnessMapUv),d.push(M.anisotropyMapUv),d.push(M.clearcoatMapUv),d.push(M.clearcoatNormalMapUv),d.push(M.clearcoatRoughnessMapUv),d.push(M.diffuseRoughnessMapUv),d.push(M.iridescenceMapUv),d.push(M.iridescenceThicknessMapUv),d.push(M.sheenColorMapUv),d.push(M.sheenRoughnessMapUv),d.push(M.specularMapUv),d.push(M.specularColorMapUv),d.push(M.specularIntensityMapUv),d.push(M.transmissionMapUv),d.push(M.thicknessMapUv),d.push(M.combine),d.push(M.fogExp2),d.push(M.sizeAttenuation),d.push(M.morphTargetsCount),d.push(M.numSunLights),d.push(M.numDirLights),d.push(M.numPointLights),d.push(M.numSpotLights),d.push(M.numSpotLightMaps),d.push(M.numHemiLights),d.push(M.numRectAreaLights),d.push(M.numSunLightShadows),d.push(M.numDirLightShadows),d.push(M.numPointLightShadows),d.push(M.numSpotLightShadows),d.push(M.numSpotLightShadowsWithMaps),d.push(M.numLightProbes),d.push(M.numLightProbeGrids),d.push(M.shadowMapType),d.push(M.toneMapping),d.push(M.numClippingPlanes),d.push(M.numClipIntersection),d.push(M.depthPacking)}function m(d,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),d.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),d.push(o.mask)}function x(d){const M=f[d.type];let R;if(M){const T=jn[M];R=lu.clone(T.uniforms)}else R=d.uniforms;return R}function w(d,M){let R=u.get(M);return R!==void 0?++R.usedTimes:(R=new ig(i,M,d,s),l.push(R),u.set(M,R)),R}function A(d){if(--d.usedTimes===0){const M=l.indexOf(d);l[M]=l[l.length-1],l.pop(),u.delete(d.cacheKey),d.destroy()}}function E(d){a.remove(d)}function _(){a.dispose()}return{getParameters:v,getProgramCacheKey:b,getUniforms:x,acquireProgram:w,releaseProgram:A,releaseShaderCache:E,programs:l,dispose:_}}function cg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function hg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Qc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function jc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function a(f,p,v,b,h,m){let x=i[t];return x===void 0?(x={id:f.id,object:f,geometry:p,material:v,materialVariant:o(f),groupOrder:b,renderOrder:f.renderOrder,z:h,group:m},i[t]=x):(x.id=f.id,x.object=f,x.geometry=p,x.material=v,x.materialVariant=o(f),x.groupOrder=b,x.renderOrder=f.renderOrder,x.z=h,x.group=m),t++,x}function c(f,p,v,b,h,m,x){x.reversedDepth===!0&&(h=-h);const w=a(f,p,v,b,h,m);v.transmission>0?n.push(w):v.transparent===!0?s.push(w):e.push(w)}function l(f,p,v,b,h,m){const x=a(f,p,v,b,h,m);v.transmission>0?n.unshift(x):v.transparent===!0?s.unshift(x):e.unshift(x)}function u(f,p){e.length>1&&e.sort(f||hg),n.length>1&&n.sort(p||Qc),s.length>1&&s.sort(p||Qc)}function g(){for(let f=t,p=i.length;f<p;f++){const v=i[f];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:u}}function ug(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new jc,i.set(n,[o])):s>=r.length?(o=new jc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function fg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new oe};break;case"SpotLight":e={position:new O,direction:new O,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function dg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let pg=0;function mg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function gg(i){const t=new fg,e=dg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);const s=new O,r=new _e,o=new _e;function a(l){let u=0,g=0,f=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let p=0,v=0,b=0,h=0,m=0,x=0,w=0,A=0,E=0,_=0,d=0,M=0,R=0,T=0;l.sort(mg);for(let D=0,I=l.length;D<I;D++){const N=l[D],k=N.color,V=N.intensity,X=N.distance;let it=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Yi?it=N.shadow.map.texture:it=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=k.r*V,g+=k.g*V,f+=k.b*V;else if(N.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(N.sh.coefficients[j],V);T++}else if(N.isSunLight){const j=t.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const $=N.shadow,lt=e.get(N);lt.shadowIntensity=$.intensity,lt.shadowBias=$.bias,lt.shadowNormalBias=$.normalBias,lt.shadowRadius=$.radius,lt.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[v]=lt,n.sunShadowMap[v]=it;const mt=$.getViewportCount();for(let Rt=0;Rt<mt;Rt++)n.sunShadowMatrix[b+Rt]=$.getMatrix(Rt),n.sunShadowCascade[b+Rt]=$._cascadeData[Rt];b+=mt,v++}n.sun[p]=j,p++}else if(N.isDirectionalLight){const j=t.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const $=N.shadow,lt=e.get(N);lt.shadowIntensity=$.intensity,lt.shadowBias=$.bias,lt.shadowNormalBias=$.normalBias,lt.shadowRadius=$.radius,lt.shadowMapSize=$.mapSize,n.directionalShadow[h]=lt,n.directionalShadowMap[h]=it,n.directionalShadowMatrix[h]=N.shadow.matrix,E++}n.directional[h]=j,h++}else if(N.isSpotLight){const j=t.get(N);j.position.setFromMatrixPosition(N.matrixWorld),j.color.copy(k).multiplyScalar(V),j.distance=X,j.coneCos=Math.cos(N.angle),j.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),j.decay=N.decay,n.spot[x]=j;const $=N.shadow;if(N.map&&(n.spotLightMap[M]=N.map,M++,$.updateMatrices(N),N.castShadow&&R++),n.spotLightMatrix[x]=$.matrix,N.castShadow){const lt=e.get(N);lt.shadowIntensity=$.intensity,lt.shadowBias=$.bias,lt.shadowNormalBias=$.normalBias,lt.shadowRadius=$.radius,lt.shadowMapSize=$.mapSize,n.spotShadow[x]=lt,n.spotShadowMap[x]=it,d++}x++}else if(N.isRectAreaLight){const j=t.get(N);j.color.copy(k).multiplyScalar(V),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),n.rectArea[w]=j,w++}else if(N.isPointLight){const j=t.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),j.distance=N.distance,j.decay=N.decay,N.castShadow){const $=N.shadow,lt=e.get(N);lt.shadowIntensity=$.intensity,lt.shadowBias=$.bias,lt.shadowNormalBias=$.normalBias,lt.shadowRadius=$.radius,lt.shadowMapSize=$.mapSize,lt.shadowCameraNear=$.camera.near,lt.shadowCameraFar=$.camera.far,n.pointShadow[m]=lt,n.pointShadowMap[m]=it,n.pointShadowMatrix[m]=N.shadow.matrix,_++}n.point[m]=j,m++}else if(N.isHemisphereLight){const j=t.get(N);j.skyColor.copy(N.color).multiplyScalar(V),j.groundColor.copy(N.groundColor).multiplyScalar(V),n.hemi[A]=j,A++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=g,n.ambient[2]=f;const S=n.hash;(S.sunLength!==p||S.directionalLength!==h||S.pointLength!==m||S.spotLength!==x||S.rectAreaLength!==w||S.hemiLength!==A||S.numSunShadows!==v||S.numDirectionalShadows!==E||S.numPointShadows!==_||S.numSpotShadows!==d||S.numSpotMaps!==M||S.numLightProbes!==T)&&(n.sun.length=p,n.directional.length=h,n.spot.length=x,n.rectArea.length=w,n.point.length=m,n.hemi.length=A,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=_,n.pointShadowMap.length=_,n.pointShadowMatrix.length=_,n.spotShadow.length=d,n.spotShadowMap.length=d,n.spotLightMatrix.length=d+M-R,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,S.sunLength=p,S.directionalLength=h,S.pointLength=m,S.spotLength=x,S.rectAreaLength=w,S.hemiLength=A,S.numSunShadows=v,S.numDirectionalShadows=E,S.numPointShadows=_,S.numSpotShadows=d,S.numSpotMaps=M,S.numLightProbes=T,n.version=pg++)}function c(l,u){let g=0,f=0,p=0,v=0,b=0,h=0;const m=u.matrixWorldInverse;for(let x=0,w=l.length;x<w;x++){const A=l[x];if(A.isSunLight){const E=n.sun[g];E.direction.setFromMatrixPosition(A.matrixWorld),E.direction.transformDirection(m),g++}else if(A.isDirectionalLight){const E=n.directional[f];E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),f++}else if(A.isSpotLight){const E=n.spot[v];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),v++}else if(A.isRectAreaLight){const E=n.rectArea[b];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),E.halfWidth.set(A.width*.5,0,0),E.halfHeight.set(0,A.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),b++}else if(A.isPointLight){const E=n.point[p];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(m),p++}else if(A.isHemisphereLight){const E=n.hemi[h];E.direction.setFromMatrixPosition(A.matrixWorld),E.direction.transformDirection(m),h++}}}return{setup:a,setupView:c,state:n}}function th(i){const t=new gg(i),e=[],n=[],s=[];function r(g){u.camera=g,e.length=0,n.length=0,s.length=0}function o(g){g.isLightProbeGrid?s.push(g):e.push(g)}function a(g){n.push(g)}function c(){t.setup(e),s.sort((g,f)=>g.priority-f.priority||g.id-f.id)}function l(g){t.setupView(e,g)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function _g(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new th(i),t.set(s,[a])):r>=o.length?(a=new th(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vg=`uniform sampler2D shadow_pass;
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
}`,Mg=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],Sg=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],eh=new _e,nr=new O,Wa=new O;function yg(i,t,e){let n=new ks;const s=new Ut,r=new Ut,o=new Ve,a=new hu,c=new uu,l={},u=e.maxTextureSize,g={[Xi]:En,[En]:Xi,[xn]:xn},f=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:xg,fragmentShader:vg}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new ln;v.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new be(v,f),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let m=this.type;this.render=function(_,d,M){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||_.length===0)return;this.type===ch&&($t("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=or);const R=i.getRenderTarget(),T=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),D=i.state;D.setBlending(us),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=m!==this.type;I&&d.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(k=>k.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,k=_.length;N<k;N++){const V=_[N],X=V.shadow;if(X===void 0){$t("WebGLShadowMap:",V,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const it=X.getFrameExtents();s.multiply(it),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/it.x),s.x=r.x*it.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/it.y),s.y=r.y*it.y,X.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=j,X.map===null||I===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Ns){if(V.isPointLight){$t("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new ei(s.x,s.y,{format:Yi,type:ii,minFilter:bn,magFilter:bn,generateMipmaps:!1}),X.map.texture.name=V.name+".shadowMap",X.map.depthTexture=new ps(s.x,s.y,Xn),X.map.depthTexture.name=V.name+".shadowMapDepth",X.map.depthTexture.format=Ui,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=fn,X.map.depthTexture.magFilter=fn}else V.isPointLight?(X.map=new pa(s.x),X.map.depthTexture=new Nl(s.x,ni)):(X.map=new ei(s.x,s.y),X.map.depthTexture=new ps(s.x,s.y,ni)),X.map.depthTexture.name=V.name+".shadowMap",X.map.depthTexture.format=Ui,this.type===or?(X.map.depthTexture.compareFunction=j?Sl:Ml,X.map.depthTexture.minFilter=bn,X.map.depthTexture.magFilter=bn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=fn,X.map.depthTexture.magFilter=fn);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);const $=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();V.isPointLight!==!0&&X.updateMatrices(V,M);const lt=(X.camera.layers.mask&4294967294)!==0?X.camera.layers:M.layers;for(let mt=0;mt<$;mt++){const Rt=X.getCamera(mt);if(V.isPointLight){const et=X.camera,ut=X.matrix,Pt=V.distance||et.far;Pt!==et.far&&(et.far=Pt,et.updateProjectionMatrix()),nr.setFromMatrixPosition(V.matrixWorld),et.position.copy(nr),Wa.copy(et.position),Wa.add(Mg[mt]),et.up.copy(Sg[mt]),et.lookAt(Wa),et.updateMatrixWorld(),ut.makeTranslation(-nr.x,-nr.y,-nr.z),eh.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),X._frustum.setFromProjectionMatrix(eh,et.coordinateSystem,et.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,mt),i.clear();else{mt===0&&(i.setRenderTarget(X.map),i.clear());const et=X.getViewport(mt);o.set(r.x*et.x,r.y*et.y,r.x*et.z,r.y*et.w),D.viewport(o)}n=X.getFrustum(mt),A(d,M,Rt,V,lt,this.type)}X.isPointLightShadow!==!0&&this.type===Ns&&x(X,M),X.needsUpdate=!1}m=this.type,h.needsUpdate=!1,i.setRenderTarget(R,T,S)};function x(_,d){const M=t.update(b);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,p.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),_.mapPass===null?_.mapPass=new ei(s.x,s.y,{format:Yi,type:ii}):(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)&&_.mapPass.setSize(_.map.width,_.map.height),f.uniforms.shadow_pass.value=_.map.depthTexture,f.uniforms.resolution.value.set(_.map.width,_.map.height),f.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(d,null,M,f,b,null),p.uniforms.shadow_pass.value=_.mapPass.texture,p.uniforms.resolution.value.set(_.map.width,_.map.height),p.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(d,null,M,p,b,null)}function w(_,d,M,R){let T=null;const S=M.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(S!==void 0)T=S;else if(T=M.isPointLight===!0?c:a,i.localClippingEnabled&&d.clipShadows===!0&&Array.isArray(d.clippingPlanes)&&d.clippingPlanes.length!==0||d.displacementMap&&d.displacementScale!==0||d.alphaMap&&d.alphaTest>0||d.map&&d.alphaTest>0||d.alphaToCoverage===!0){const D=T.uuid,I=d.uuid;let N=l[D];N===void 0&&(N={},l[D]=N);let k=N[I];k===void 0&&(k=T.clone(),N[I]=k,d.addEventListener("dispose",E)),T=k}if(T.visible=d.visible,T.wireframe=d.wireframe,R===Ns?T.side=d.shadowSide!==null?d.shadowSide:d.side:T.side=d.shadowSide!==null?d.shadowSide:g[d.side],T.alphaMap=d.alphaMap,T.alphaTest=d.alphaToCoverage===!0?.5:d.alphaTest,T.map=d.map,T.clipShadows=d.clipShadows,T.clippingPlanes=d.clippingPlanes,T.clipIntersection=d.clipIntersection,T.displacementMap=d.displacementMap,T.displacementScale=d.displacementScale,T.displacementBias=d.displacementBias,T.wireframeLinewidth=d.wireframeLinewidth,T.linewidth=d.linewidth,M.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const D=i.properties.get(T);D.light=M}return T}function A(_,d,M,R,T,S){if(_.visible===!1)return;if(_.layers.test(T)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&S===Ns)&&(!_.frustumCulled||_.intersectsFrustum(n))){_.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,_.matrixWorld);const N=t.update(_),k=_.material;if(Array.isArray(k)){const V=N.groups;for(let X=0,it=V.length;X<it;X++){const j=V[X],$=k[j.materialIndex];if($&&$.visible){const lt=w(_,$,R,S);_.onBeforeShadow(i,_,d,M,N,lt,j),i.renderBufferDirect(M,null,N,lt,_,j),_.onAfterShadow(i,_,d,M,N,lt,j)}}}else if(k.visible){const V=w(_,k,R,S);_.onBeforeShadow(i,_,d,M,N,V,null),i.renderBufferDirect(M,null,N,V,_,null),_.onAfterShadow(i,_,d,M,N,V,null)}}const I=_.children;for(let N=0,k=I.length;N<k;N++)A(I[N],d,M,R,T,S)}function E(_){_.target.removeEventListener("dispose",E);for(const M in l){const R=l[M],T=_.target.uuid;T in R&&(R[T].dispose(),delete R[T])}}}function bg(i,t){function e(){let B=!1;const nt=new Ve;let q=null;const yt=new Ve(0,0,0,0);return{setMask:function(_t){q!==_t&&!B&&(i.colorMask(_t,_t,_t,_t),q=_t)},setLocked:function(_t){B=_t},setClear:function(_t,dt,Ht,re,pt){pt===!0&&(_t*=re,dt*=re,Ht*=re),nt.set(_t,dt,Ht,re),yt.equals(nt)===!1&&(i.clearColor(_t,dt,Ht,re),yt.copy(nt))},reset:function(){B=!1,q=null,yt.set(-1,0,0,0)}}}function n(){let B=!1,nt=!1,q=null,yt=null,_t=null;return{setReversed:function(dt){if(nt!==dt){const Ht=t.get("EXT_clip_control");dt?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),nt=dt;const re=_t;_t=null,this.setClear(re)}},getReversed:function(){return nt},setTest:function(dt){dt?Tt(i.DEPTH_TEST):Xt(i.DEPTH_TEST)},setMask:function(dt){q!==dt&&!B&&(i.depthMask(dt),q=dt)},setFunc:function(dt){if(nt&&(dt=Zu[dt]),yt!==dt){switch(dt){case oo:i.depthFunc(i.NEVER);break;case ao:i.depthFunc(i.ALWAYS);break;case lo:i.depthFunc(i.LESS);break;case Os:i.depthFunc(i.LEQUAL);break;case co:i.depthFunc(i.EQUAL);break;case ho:i.depthFunc(i.GEQUAL);break;case uo:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=dt}},setLocked:function(dt){B=dt},setClear:function(dt){_t!==dt&&(_t=dt,nt&&(dt=1-dt),i.clearDepth(dt))},reset:function(){B=!1,q=null,yt=null,_t=null,nt=!1}}}function s(){let B=!1,nt=null,q=null,yt=null,_t=null,dt=null,Ht=null,re=null,pt=null;return{setTest:function(Bt){B||(Bt?Tt(i.STENCIL_TEST):Xt(i.STENCIL_TEST))},setMask:function(Bt){nt!==Bt&&!B&&(i.stencilMask(Bt),nt=Bt)},setFunc:function(Bt,ne,Ct){(q!==Bt||yt!==ne||_t!==Ct)&&(i.stencilFunc(Bt,ne,Ct),q=Bt,yt=ne,_t=Ct)},setOp:function(Bt,ne,Ct){(dt!==Bt||Ht!==ne||re!==Ct)&&(i.stencilOp(Bt,ne,Ct),dt=Bt,Ht=ne,re=Ct)},setLocked:function(Bt){B=Bt},setClear:function(Bt){pt!==Bt&&(i.clearStencil(Bt),pt=Bt)},reset:function(){B=!1,nt=null,q=null,yt=null,_t=null,dt=null,Ht=null,re=null,pt=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let u={},g={},f={},p=new WeakMap,v=[],b=null,h=!1,m=null,x=null,w=null,A=null,E=null,_=null,d=null,M=new oe(0,0,0),R=0,T=!1,S=null,D=null,I=null,N=null,k=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,it=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=it>=1):j.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=it>=2);let $=null,lt={};const mt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),et=new Ve().fromArray(mt),ut=new Ve().fromArray(Rt);function Pt(B,nt,q,yt){const _t=new Uint8Array(4),dt=i.createTexture();i.bindTexture(B,dt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<q;Ht++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(nt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return dt}const At={};At[i.TEXTURE_2D]=Pt(i.TEXTURE_2D,i.TEXTURE_2D,1),At[i.TEXTURE_CUBE_MAP]=Pt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[i.TEXTURE_2D_ARRAY]=Pt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),At[i.TEXTURE_3D]=Pt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Tt(i.DEPTH_TEST),o.setFunc(Os),jt(!1),Jt(Ya),Tt(i.CULL_FACE),Et(us);function Tt(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function Xt(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function Ue(B,nt){return f[B]!==nt?(i.bindFramebuffer(B,nt),f[B]=nt,B===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=nt),B===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function qt(B,nt){let q=v,yt=!1;if(B){q=p.get(nt),q===void 0&&(q=[],p.set(nt,q));const _t=B.textures;if(q.length!==_t.length||q[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,Ht=_t.length;dt<Ht;dt++)q[dt]=i.COLOR_ATTACHMENT0+dt;q.length=_t.length,yt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,yt=!0);yt&&i.drawBuffers(q)}function ae(B){return b!==B?(i.useProgram(B),b=B,!0):!1}const st={[as]:i.FUNC_ADD,[uh]:i.FUNC_SUBTRACT,[fh]:i.FUNC_REVERSE_SUBTRACT};st[dh]=i.MIN,st[ph]=i.MAX;const Ot={[mh]:i.ZERO,[gh]:i.ONE,[_h]:i.SRC_COLOR,[sl]:i.SRC_ALPHA,[bh]:i.SRC_ALPHA_SATURATE,[Sh]:i.DST_COLOR,[vh]:i.DST_ALPHA,[xh]:i.ONE_MINUS_SRC_COLOR,[rl]:i.ONE_MINUS_SRC_ALPHA,[yh]:i.ONE_MINUS_DST_COLOR,[Mh]:i.ONE_MINUS_DST_ALPHA,[Eh]:i.CONSTANT_COLOR,[wh]:i.ONE_MINUS_CONSTANT_COLOR,[Th]:i.CONSTANT_ALPHA,[Ah]:i.ONE_MINUS_CONSTANT_ALPHA};function Et(B,nt,q,yt,_t,dt,Ht,re,pt,Bt){if(B===us){h===!0&&(Xt(i.BLEND),h=!1);return}if(h===!1&&(Tt(i.BLEND),h=!0),B!==hh){if(B!==m||Bt!==T){if((x!==as||E!==as)&&(i.blendEquation(i.FUNC_ADD),x=as,E=as),Bt)switch(B){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gr:i.blendFunc(i.ONE,i.ONE);break;case qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Za:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ye("WebGLState: Invalid blending: ",B);break}else switch(B){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case qa:ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Za:ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ye("WebGLState: Invalid blending: ",B);break}w=null,A=null,_=null,d=null,M.set(0,0,0),R=0,m=B,T=Bt}return}_t=_t||nt,dt=dt||q,Ht=Ht||yt,(nt!==x||_t!==E)&&(i.blendEquationSeparate(st[nt],st[_t]),x=nt,E=_t),(q!==w||yt!==A||dt!==_||Ht!==d)&&(i.blendFuncSeparate(Ot[q],Ot[yt],Ot[dt],Ot[Ht]),w=q,A=yt,_=dt,d=Ht),(re.equals(M)===!1||pt!==R)&&(i.blendColor(re.r,re.g,re.b,pt),M.copy(re),R=pt),m=B,T=!1}function Yt(B,nt){B.side===xn?Xt(i.CULL_FACE):Tt(i.CULL_FACE);let q=B.side===En;nt&&(q=!q),jt(q),B.blending===Us&&B.transparent===!1?Et(us):Et(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const yt=B.stencilWrite;a.setTest(yt),yt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ee(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Tt(i.SAMPLE_ALPHA_TO_COVERAGE):Xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function jt(B){S!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),S=B)}function Jt(B){B!==ah?(Tt(i.CULL_FACE),B!==D&&(B===Ya?i.cullFace(i.BACK):B===lh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Xt(i.CULL_FACE),D=B}function Me(B){B!==I&&(X&&i.lineWidth(B),I=B)}function Ee(B,nt,q){B?(Tt(i.POLYGON_OFFSET_FILL),(N!==nt||k!==q)&&(N=nt,k=q,o.getReversed()&&(nt=-nt,q=-q),i.polygonOffset(nt,q))):Xt(i.POLYGON_OFFSET_FILL)}function We(B){B?Tt(i.SCISSOR_TEST):Xt(i.SCISSOR_TEST)}function Re(B){B===void 0&&(B=i.TEXTURE0+V-1),$!==B&&(i.activeTexture(B),$=B)}function $e(B,nt,q){q===void 0&&($===null?q=i.TEXTURE0+V-1:q=$);let yt=lt[q];yt===void 0&&(yt={type:void 0,texture:void 0},lt[q]=yt),(yt.type!==B||yt.texture!==nt)&&($!==q&&(i.activeTexture(q),$=q),i.bindTexture(B,nt||At[B]),yt.type=B,yt.texture=nt)}function H(){const B=lt[$];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function le(){try{i.compressedTexImage2D(...arguments)}catch(B){ye("WebGLState:",B)}}function te(){try{i.compressedTexImage3D(...arguments)}catch(B){ye("WebGLState:",B)}}function xe(){try{i.texSubImage2D(...arguments)}catch(B){ye("WebGLState:",B)}}function Mt(){try{i.texSubImage3D(...arguments)}catch(B){ye("WebGLState:",B)}}function Ce(){try{i.compressedTexSubImage2D(...arguments)}catch(B){ye("WebGLState:",B)}}function Zt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){ye("WebGLState:",B)}}function ee(){try{i.texStorage2D(...arguments)}catch(B){ye("WebGLState:",B)}}function U(){try{i.texStorage3D(...arguments)}catch(B){ye("WebGLState:",B)}}function C(){try{i.texImage2D(...arguments)}catch(B){ye("WebGLState:",B)}}function J(){try{i.texImage3D(...arguments)}catch(B){ye("WebGLState:",B)}}function ct(B){return g[B]!==void 0?g[B]:i.getParameter(B)}function at(B,nt){g[B]!==nt&&(i.pixelStorei(B,nt),g[B]=nt)}function vt(B){et.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),et.copy(B))}function ht(B){ut.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),ut.copy(B))}function rt(B,nt){let q=l.get(nt);q===void 0&&(q=new WeakMap,l.set(nt,q));let yt=q.get(B);yt===void 0&&(yt=i.getUniformBlockIndex(nt,B.name),i.uniformBlockBinding(nt,yt,yt),q.set(B,yt))}function ot(B,nt,q){const _t=l.get(nt).get(B);c[_t]!==q&&(i.bindBufferBase(i.UNIFORM_BUFFER,_t,q),c[_t]=q)}function St(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},g={},$=null,lt={},f={},c={},p=new WeakMap,v=[],b=null,h=!1,m=null,x=null,w=null,A=null,E=null,_=null,d=null,M=new oe(0,0,0),R=0,T=!1,S=null,D=null,I=null,N=null,k=null,et.set(0,0,i.canvas.width,i.canvas.height),ut.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Tt,disable:Xt,bindFramebuffer:Ue,drawBuffers:qt,useProgram:ae,setBlending:Et,setMaterial:Yt,setFlipSided:jt,setCullFace:Jt,setLineWidth:Me,setPolygonOffset:Ee,setScissorTest:We,activeTexture:Re,bindTexture:$e,unbindTexture:H,compressedTexImage2D:le,compressedTexImage3D:te,texImage2D:C,texImage3D:J,pixelStorei:at,getParameter:ct,updateUBOMapping:rt,uniformBlockBinding:ot,texStorage2D:ee,texStorage3D:U,texSubImage2D:xe,texSubImage3D:Mt,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Zt,scissor:vt,viewport:ht,reset:St}}function Eg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ut,u=new WeakMap,g=new Set;let f;const p=new WeakMap,v=new Set,b=new FinalizationRegistry(U=>v.delete(U));let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(U,C){return h?new OffscreenCanvas(U,C):qo("canvas")}function x(U,C,J){let ct=1;const at=ee(U);if((at.width>J||at.height>J)&&(ct=J/Math.max(at.width,at.height)),ct<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const vt=Math.floor(ct*at.width),ht=Math.floor(ct*at.height);f===void 0&&(f=m(vt,ht));const rt=C?m(vt,ht):f;return rt.width=vt,rt.height=ht,rt.getContext("2d").drawImage(U,0,0,vt,ht),$t("WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+vt+"x"+ht+")."),rt}else return"data"in U&&$t("WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),U;return U}function w(U){return U.generateMipmaps}function A(U){i.generateMipmap(U)}function E(U){return U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?i.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(U,C,J,ct,at,vt=!1){if(U!==null){if(i[U]!==void 0)return i[U];$t("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ht;ct&&(ht=t.get("EXT_texture_norm16"),ht||$t("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=C;if(C===i.RED&&(J===i.FLOAT&&(rt=i.R32F),J===i.HALF_FLOAT&&(rt=i.R16F),J===i.UNSIGNED_BYTE&&(rt=i.R8),J===i.UNSIGNED_SHORT&&ht&&(rt=ht.R16_EXT),J===i.SHORT&&ht&&(rt=ht.R16_SNORM_EXT)),C===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(rt=i.R8UI),J===i.UNSIGNED_SHORT&&(rt=i.R16UI),J===i.UNSIGNED_INT&&(rt=i.R32UI),J===i.BYTE&&(rt=i.R8I),J===i.SHORT&&(rt=i.R16I),J===i.INT&&(rt=i.R32I)),C===i.RG&&(J===i.FLOAT&&(rt=i.RG32F),J===i.HALF_FLOAT&&(rt=i.RG16F),J===i.UNSIGNED_BYTE&&(rt=i.RG8),J===i.UNSIGNED_SHORT&&ht&&(rt=ht.RG16_EXT),J===i.SHORT&&ht&&(rt=ht.RG16_SNORM_EXT)),C===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(rt=i.RG8UI),J===i.UNSIGNED_SHORT&&(rt=i.RG16UI),J===i.UNSIGNED_INT&&(rt=i.RG32UI),J===i.BYTE&&(rt=i.RG8I),J===i.SHORT&&(rt=i.RG16I),J===i.INT&&(rt=i.RG32I)),C===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),J===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),J===i.UNSIGNED_INT&&(rt=i.RGB32UI),J===i.BYTE&&(rt=i.RGB8I),J===i.SHORT&&(rt=i.RGB16I),J===i.INT&&(rt=i.RGB32I)),C===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),J===i.UNSIGNED_INT&&(rt=i.RGBA32UI),J===i.BYTE&&(rt=i.RGBA8I),J===i.SHORT&&(rt=i.RGBA16I),J===i.INT&&(rt=i.RGBA32I)),C===i.RGB&&(J===i.UNSIGNED_SHORT&&ht&&(rt=ht.RGB16_EXT),J===i.SHORT&&ht&&(rt=ht.RGB16_SNORM_EXT),J===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),C===i.RGBA){const ot=vt?Mr:ge.getTransfer(at);J===i.FLOAT&&(rt=i.RGBA32F),J===i.HALF_FLOAT&&(rt=i.RGBA16F),J===i.UNSIGNED_BYTE&&(rt=ot===Pe?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT&&ht&&(rt=ht.RGBA16_EXT),J===i.SHORT&&ht&&(rt=ht.RGBA16_SNORM_EXT),J===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function d(U,C){let J;return U?C===null||C===ni||C===ds?J=i.DEPTH24_STENCIL8:C===Xn?J=i.DEPTH32F_STENCIL8:C===zs&&(J=i.DEPTH24_STENCIL8,$t("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===ni||C===ds?J=i.DEPTH_COMPONENT24:C===Xn?J=i.DEPTH_COMPONENT32F:C===zs&&(J=i.DEPTH_COMPONENT16),J}function M(U,C){return w(U)===!0||U.isFramebufferTexture&&U.minFilter!==fn&&U.minFilter!==bn?Math.log2(Math.max(C.width,C.height))+1:U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?C.mipmaps.length:1}function R(U){const C=new WeakRef(U);n.get(U).__ref=C,v.add(C),b.register(U,C,C)}function T(U){const C=n.get(U).__ref;C!==void 0&&(v.delete(C),b.unregister(C))}function S(U){I(U.target)}function D(U){N(U.target)}function I(U){U.removeEventListener("dispose",S),T(U),V(U),U.isVideoTexture&&u.delete(U),U.isHTMLTexture&&g.delete(U)}function N(U){U.removeEventListener("dispose",D),T(U),it(U)}function k(){for(const U of v){const C=U.deref();C!==void 0&&(C.isRenderTarget===!0?N(C):I(C))}v.clear(),g.clear()}function V(U){const C=n.get(U);if(C.__webglInit===void 0)return;const J=U.source,ct=p.get(J);if(ct){const at=ct[C.__cacheKey];at.usedTimes--,at.usedTimes===0&&X(U),Object.keys(ct).length===0&&p.delete(J)}n.remove(U)}function X(U){const C=n.get(U);i.deleteTexture(C.__webglTexture);const J=U.source,ct=p.get(J);delete ct[C.__cacheKey],o.memory.textures--}function it(U){const C=n.get(U);C.__depthDisposeCallback&&C.__depthDisposeCallback();const J=U.depthTexture;if(J&&J.renderTarget===U&&I(J),U.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(C.__webglFramebuffer[at]))for(let vt=0;vt<C.__webglFramebuffer[at].length;vt++)i.deleteFramebuffer(C.__webglFramebuffer[at][vt]);else i.deleteFramebuffer(C.__webglFramebuffer[at]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[at])}else{if(Array.isArray(C.__webglFramebuffer))for(let at=0;at<C.__webglFramebuffer.length;at++)i.deleteFramebuffer(C.__webglFramebuffer[at]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let at=0;at<C.__webglColorRenderbuffer.length;at++)C.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[at]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const ct=U.textures;for(let at=0,vt=ct.length;at<vt;at++){const ht=n.get(ct[at]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),o.memory.textures--),n.remove(ct[at])}n.remove(U)}let j=0;function $(){j=0}function lt(){return j}function mt(U){j=U}function Rt(){const U=j;return U>=s.maxTextures&&$t("WebGLTextures: Trying to use "+(U+1)+" texture units while this GPU supports only "+s.maxTextures),j+=1,U}function et(U){const C=[];return C.push(U.wrapS),C.push(U.wrapT),C.push(U.wrapR||0),C.push(U.magFilter),C.push(U.minFilter),C.push(U.anisotropy),C.push(U.internalFormat),C.push(U.format),C.push(U.type),C.push(U.generateMipmaps),C.push(U.mipmapsAutoUpdate),C.push(U.premultiplyAlpha),C.push(U.flipY),C.push(U.unpackAlignment),C.push(U.colorSpace),C.join()}function ut(U,C){const J=n.get(U);if(U.isVideoTexture&&Ce(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&J.__version!==U.version){const ct=U.image;if(ct===null)$t("WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)$t("WebGLRenderer: Texture marked for update but image is incomplete");else{Yt(J,U,C);return}}else U.isExternalTexture&&(J.__webglTexture=U.sourceTexture?U.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+C)}function Pt(U,C){const J=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){Yt(J,U,C);return}else U.isExternalTexture&&(J.__webglTexture=U.sourceTexture?U.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+C)}function At(U,C){const J=n.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){Yt(J,U,C);return}e.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+C)}function Tt(U,C){const J=n.get(U);if(U.version>0&&J.__version!==U.version){jt(J,U,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+C)}const Xt={[po]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},Ue={[fn]:i.NEAREST,[Ph]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[bn]:i.LINEAR,[no]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},qt={[Nh]:i.NEVER,[yl]:i.ALWAYS,[Uh]:i.LESS,[Ml]:i.LEQUAL,[Fh]:i.EQUAL,[Sl]:i.GEQUAL,[Oh]:i.GREATER,[Bh]:i.NOTEQUAL};function ae(U,C){if(C.type===Xn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===bn||C.magFilter===no||C.magFilter===sr||C.magFilter===Li||C.minFilter===bn||C.minFilter===no||C.minFilter===sr||C.minFilter===Li)&&$t("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,Xt[C.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,Xt[C.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,Xt[C.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,Ue[C.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,Ue[C.minFilter]),C.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,qt[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===fn||C.minFilter!==sr&&C.minFilter!==Li||C.type===Xn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");i.texParameterf(U,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function st(U,C){let J=!1;U.__webglInit===void 0&&(U.__webglInit=!0,C.addEventListener("dispose",S),R(C));const ct=C.source;let at=p.get(ct);at===void 0&&(at={},p.set(ct,at));const vt=et(C);if(vt!==U.__cacheKey){at[vt]===void 0&&(at[vt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,J=!0),at[vt].usedTimes++;const ht=at[U.__cacheKey];ht!==void 0&&(at[U.__cacheKey].usedTimes--,ht.usedTimes===0&&X(C)),U.__cacheKey=vt,U.__webglTexture=at[vt].texture}return J}function Ot(U,C,J){return Math.floor(Math.floor(U/J)/C)}function Et(U,C,J,ct){const vt=U.updateRanges;if(vt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,C.width,C.height,J,ct,C.data);else{vt.sort((B,nt)=>B.start-nt.start);let ht=0;for(let B=1;B<vt.length;B++){const nt=vt[ht],q=vt[B],yt=nt.start+nt.count,_t=Ot(q.start,C.width,4),dt=Ot(nt.start,C.width,4);q.start<=yt+1&&_t===dt&&Ot(q.start+q.count-1,C.width,4)===_t?nt.count=Math.max(nt.count,q.start+q.count-nt.start):(++ht,vt[ht]=q)}vt.length=ht+1;const rt=e.getParameter(i.UNPACK_ROW_LENGTH),ot=e.getParameter(i.UNPACK_SKIP_PIXELS),St=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,C.width);for(let B=0,nt=vt.length;B<nt;B++){const q=vt[B],yt=Math.floor(q.start/4),_t=Math.ceil(q.count/4),dt=yt%C.width,Ht=Math.floor(yt/C.width),re=_t,pt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,dt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ht),e.texSubImage2D(i.TEXTURE_2D,0,dt,Ht,re,pt,J,ct,C.data)}U.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,rt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function Yt(U,C,J){let ct=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ct=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ct=i.TEXTURE_3D);const at=st(U,C),vt=C.source;e.bindTexture(ct,U.__webglTexture,i.TEXTURE0+J);const ht=n.get(vt);if(vt.version!==ht.__version||at===!0){if(e.activeTexture(i.TEXTURE0+J),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const pt=ge.getPrimaries(ge.workingColorSpace),Bt=C.colorSpace===Pi?null:ge.getPrimaries(C.colorSpace),ne=C.colorSpace===Pi||pt===Bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne)}e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment);let ot=x(C.image,!1,s.maxTextureSize);ot=Zt(C,ot);const St=r.convert(C.format,C.colorSpace),B=r.convert(C.type);let nt=_(C.internalFormat,St,B,C.normalized,C.colorSpace,C.isVideoTexture);ae(ct,C);let q;const yt=C.mipmaps,_t=C.isVideoTexture!==!0,dt=ht.__version===void 0||at===!0,Ht=vt.dataReady,re=M(C,ot);if(C.isDepthTexture)nt=d(C.format===Di,C.type),dt&&(_t?e.texStorage2D(i.TEXTURE_2D,1,nt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,nt,ot.width,ot.height,0,St,B,null));else if(C.isDataTexture)if(yt.length>0){_t&&dt&&e.texStorage2D(i.TEXTURE_2D,re,nt,yt[0].width,yt[0].height);for(let pt=0,Bt=yt.length;pt<Bt;pt++)q=yt[pt],_t?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,q.width,q.height,St,B,q.data):e.texImage2D(i.TEXTURE_2D,pt,nt,q.width,q.height,0,St,B,q.data);C.generateMipmaps=!1}else _t?(dt&&e.texStorage2D(i.TEXTURE_2D,re,nt,ot.width,ot.height),Ht&&Et(C,ot,St,B)):e.texImage2D(i.TEXTURE_2D,0,nt,ot.width,ot.height,0,St,B,ot.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){_t&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,re,nt,yt[0].width,yt[0].height,ot.depth);for(let pt=0,Bt=yt.length;pt<Bt;pt++)if(q=yt[pt],C.format!==ti)if(St!==null)if(_t){if(Ht)if(C.layerUpdates.size>0){const ne=Nc(q.width,q.height,C.format,C.type);for(const Ct of C.layerUpdates){const ie=q.data.subarray(Ct*ne/q.data.BYTES_PER_ELEMENT,(Ct+1)*ne/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,Ct,q.width,q.height,1,St,ie)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,q.width,q.height,ot.depth,St,q.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pt,nt,q.width,q.height,ot.depth,0,q.data,0,0);else $t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else _t?Ht&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,q.width,q.height,ot.depth,St,B,q.data):e.texImage3D(i.TEXTURE_2D_ARRAY,pt,nt,q.width,q.height,ot.depth,0,St,B,q.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{_t&&dt&&e.texStorage2D(i.TEXTURE_2D,re,nt,yt[0].width,yt[0].height);for(let pt=0,Bt=yt.length;pt<Bt;pt++)q=yt[pt],C.format!==ti?St!==null?_t?Ht&&e.compressedTexSubImage2D(i.TEXTURE_2D,pt,0,0,q.width,q.height,St,q.data):e.compressedTexImage2D(i.TEXTURE_2D,pt,nt,q.width,q.height,0,q.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,q.width,q.height,St,B,q.data):e.texImage2D(i.TEXTURE_2D,pt,nt,q.width,q.height,0,St,B,q.data)}else if(C.isDataArrayTexture)if(_t){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,re,nt,ot.width,ot.height,ot.depth),Ht)if(C.layerUpdates.size>0){const pt=Nc(ot.width,ot.height,C.format,C.type);for(const Bt of C.layerUpdates){const ne=ot.data.subarray(Bt*pt/ot.data.BYTES_PER_ELEMENT,(Bt+1)*pt/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Bt,ot.width,ot.height,1,St,B,ne)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,B,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,nt,ot.width,ot.height,ot.depth,0,St,B,ot.data);else if(C.isData3DTexture)_t?(dt&&e.texStorage3D(i.TEXTURE_3D,re,nt,ot.width,ot.height,ot.depth),Ht&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,B,ot.data)):e.texImage3D(i.TEXTURE_3D,0,nt,ot.width,ot.height,ot.depth,0,St,B,ot.data);else if(C.isFramebufferTexture){if(dt)if(_t)e.texStorage2D(i.TEXTURE_2D,re,nt,ot.width,ot.height);else{let pt=ot.width,Bt=ot.height;for(let ne=0;ne<re;ne++)e.texImage2D(i.TEXTURE_2D,ne,nt,pt,Bt,0,St,B,null),pt>>=1,Bt>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in i){const pt=i.canvas;if(pt.hasAttribute("layoutsubtree")||pt.setAttribute("layoutsubtree","true"),ot.parentNode!==pt){pt.appendChild(ot),g.add(C),pt.onpaint=Bt=>{const ne=Bt.changedElements;for(const Ct of g)ne.includes(Ct.image)&&(Ct.needsUpdate=!0)},pt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ot);else{const ne=i.RGBA,Ct=i.RGBA,ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ne,Ct,ie,ot)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(yt.length>0){if(_t&&dt){const pt=ee(yt[0]);e.texStorage2D(i.TEXTURE_2D,re,nt,pt.width,pt.height)}for(let pt=0,Bt=yt.length;pt<Bt;pt++)q=yt[pt],_t?Ht&&e.texSubImage2D(i.TEXTURE_2D,pt,0,0,St,B,q):e.texImage2D(i.TEXTURE_2D,pt,nt,St,B,q);C.generateMipmaps=!1}else if(_t){if(dt){const pt=ee(ot);e.texStorage2D(i.TEXTURE_2D,re,nt,pt.width,pt.height)}Ht&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,B,ot)}else e.texImage2D(i.TEXTURE_2D,0,nt,St,B,ot);w(C)&&C.mipmapsAutoUpdate===!0&&A(ct),ht.__version=vt.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function jt(U,C,J){if(C.image.length!==6)return;const ct=st(U,C),at=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+J);const vt=n.get(at);if(at.version!==vt.__version||ct===!0){e.activeTexture(i.TEXTURE0+J);const ht=ge.getPrimaries(ge.workingColorSpace),rt=C.colorSpace===Pi?null:ge.getPrimaries(C.colorSpace),ot=C.colorSpace===Pi||ht===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const St=C.isCompressedTexture||C.image[0].isCompressedTexture,B=C.image[0]&&C.image[0].isDataTexture,nt=[];for(let Ct=0;Ct<6;Ct++)!St&&!B?nt[Ct]=x(C.image[Ct],!0,s.maxCubemapSize):nt[Ct]=B?C.image[Ct].image:C.image[Ct],nt[Ct]=Zt(C,nt[Ct]);const q=nt[0],yt=r.convert(C.format,C.colorSpace),_t=r.convert(C.type);let dt=_(C.internalFormat,yt,_t,C.normalized,C.colorSpace);const Ht=C.isVideoTexture!==!0,re=vt.__version===void 0||ct===!0,pt=at.dataReady;let Bt=M(C,q);ae(i.TEXTURE_CUBE_MAP,C);let ne;if(C.isDepthTexture){if(dt=d(C.format===Di,C.type),re)if(Ht)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,dt,q.width,q.height);else for(let Ct=0;Ct<6;Ct++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,dt,q.width,q.height,0,yt,_t,null)}else if(St){Ht&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Bt,dt,q.width,q.height);for(let Ct=0;Ct<6;Ct++){ne=nt[Ct].mipmaps;for(let ie=0;ie<ne.length;ie++){const ve=ne[ie];C.format!==ti?yt!==null?Ht?pt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie,0,0,ve.width,ve.height,yt,ve.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie,dt,ve.width,ve.height,0,ve.data):$t("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie,0,0,ve.width,ve.height,yt,_t,ve.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie,dt,ve.width,ve.height,0,yt,_t,ve.data)}}}else{if(ne=C.mipmaps,Ht&&re){ne.length>0&&Bt++;const Ct=ee(nt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Bt,dt,Ct.width,Ct.height)}for(let Ct=0;Ct<6;Ct++)if(B){Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,nt[Ct].width,nt[Ct].height,yt,_t,nt[Ct].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,dt,nt[Ct].width,nt[Ct].height,0,yt,_t,nt[Ct].data);for(let ie=0;ie<ne.length;ie++){const ke=ne[ie].image[Ct].image;Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie+1,0,0,ke.width,ke.height,yt,_t,ke.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie+1,dt,ke.width,ke.height,0,yt,_t,ke.data)}}else{Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,yt,_t,nt[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,dt,yt,_t,nt[Ct]);for(let ie=0;ie<ne.length;ie++){const ve=ne[ie];Ht?pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie+1,0,0,yt,_t,ve.image[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ie+1,dt,yt,_t,ve.image[Ct])}}}w(C)&&C.mipmapsAutoUpdate===!0&&A(i.TEXTURE_CUBE_MAP),vt.__version=at.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function Jt(U,C,J,ct,at,vt){const ht=r.convert(J.format,J.colorSpace),rt=r.convert(J.type),ot=_(J.internalFormat,ht,rt,J.normalized,J.colorSpace),St=n.get(C),B=n.get(J);if(B.__renderTarget=C,!St.__hasExternalTextures){const nt=Math.max(1,C.width>>vt),q=Math.max(1,C.height>>vt);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,vt,ot,nt,q,C.depth,0,ht,rt,null):e.texImage2D(at,vt,ot,nt,q,0,ht,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,U),Mt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,at,B.__webglTexture,0,xe(C)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ct,at,B.__webglTexture,vt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(U,C,J){if(i.bindRenderbuffer(i.RENDERBUFFER,U),C.depthBuffer){const ct=C.depthTexture,at=ct&&ct.isDepthTexture?ct.type:null,vt=d(C.stencilBuffer,at),ht=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Mt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe(C),vt,C.width,C.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe(C),vt,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,vt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,U)}else{const ct=C.textures;for(let at=0;at<ct.length;at++){const vt=ct[at],ht=r.convert(vt.format,vt.colorSpace),rt=r.convert(vt.type),ot=_(vt.internalFormat,ht,rt,vt.normalized,vt.colorSpace);Mt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe(C),ot,C.width,C.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe(C),ot,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ot,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ee(U,C,J){const ct=C.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,U),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const at=n.get(C.depthTexture);at.__renderTarget=C;const vt=ct?C.depthTexture.image[0]:C.depthTexture.image;(!at.__webglTexture||vt.width!==C.width||vt.height!==C.height)&&(vt.width=C.width,vt.height=C.height,C.depthTexture.needsUpdate=!0),ct?Tt(C.depthTexture,0):ut(C.depthTexture,0);const ht=at.__webglTexture,rt=xe(C),ot=ct?i.TEXTURE_CUBE_MAP_POSITIVE_X+J:i.TEXTURE_2D,St=C.depthTexture.format===Di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(C.depthTexture.format===Ui)Mt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,ot,ht,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,St,ot,ht,0);else if(C.depthTexture.format===Di)Mt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,ot,ht,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,St,ot,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(U){const C=n.get(U),J=U.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==U.depthTexture){const ct=U.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ct){const at=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ct.removeEventListener("dispose",at)};ct.addEventListener("dispose",at),C.__depthDisposeCallback=at}C.__boundDepthTexture=ct}if(U.depthTexture&&!C.__autoAllocateDepthBuffer)if(J)for(let ct=0;ct<6;ct++)Ee(C.__webglFramebuffer[ct],U,ct);else U.texture.mipmaps.length>0?Ee(C.__webglFramebuffer[0],U,0):Ee(C.__webglFramebuffer,U,0);else if(J){C.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[ct]),C.__webglDepthbuffer[ct]===void 0)C.__webglDepthbuffer[ct]=i.createRenderbuffer(),Me(C.__webglDepthbuffer[ct],U,!1);else{const at=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=C.__webglDepthbuffer[ct];i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,vt)}}else if(U.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),Me(C.__webglDepthbuffer,U,!1);else{const at=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,vt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Re(U,C,J){const ct=n.get(U);C!==void 0&&Jt(ct.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&We(U)}function $e(U){const C=U.texture,J=n.get(U),ct=n.get(C);U.addEventListener("dispose",D),R(U);const at=U.textures,vt=U.isWebGLCubeRenderTarget===!0,ht=at.length>1;if(ht||(ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture()),ct.__version=C.version,o.memory.textures++),vt){J.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0){J.__webglFramebuffer[rt]=[];for(let ot=0;ot<C.mipmaps.length;ot++)J.__webglFramebuffer[rt][ot]=i.createFramebuffer()}else J.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(C.mipmaps.length>0){J.__webglFramebuffer=[];for(let rt=0;rt<C.mipmaps.length;rt++)J.__webglFramebuffer[rt]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(ht)for(let rt=0,ot=at.length;rt<ot;rt++){const St=n.get(at[rt]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),o.memory.textures++)}if(U.samples>0&&Mt(U)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let rt=0;rt<at.length;rt++){const ot=at[rt];J.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[rt]);const St=r.convert(ot.format,ot.colorSpace),B=r.convert(ot.type),nt=_(ot.internalFormat,St,B,ot.normalized,ot.colorSpace,U.isXRRenderTarget===!0),q=xe(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,q,nt,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,J.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),Me(J.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(vt){e.bindTexture(i.TEXTURE_CUBE_MAP,ct.__webglTexture),ae(i.TEXTURE_CUBE_MAP,C);for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)Jt(J.__webglFramebuffer[rt][ot],U,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ot);else Jt(J.__webglFramebuffer[rt],U,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);w(C)?A(i.TEXTURE_CUBE_MAP):C.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}else if(ht){for(let rt=0,ot=at.length;rt<ot;rt++){const St=at[rt],B=n.get(St);let nt=i.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(nt=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,B.__webglTexture),ae(nt,St),Jt(J.__webglFramebuffer,U,St,i.COLOR_ATTACHMENT0+rt,nt,0),w(St)&&A(nt)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(rt=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,ct.__webglTexture),ae(rt,C),C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)Jt(J.__webglFramebuffer[ot],U,C,i.COLOR_ATTACHMENT0,rt,ot);else Jt(J.__webglFramebuffer,U,C,i.COLOR_ATTACHMENT0,rt,0);w(C)?A(rt):C.mipmaps.length>0&&i.texParameteri(rt,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}U.depthBuffer&&We(U)}function H(U){const C=U.textures;for(let J=0,ct=C.length;J<ct;J++){const at=C[J];if(w(at)&&at.mipmapsAutoUpdate===!0){const vt=E(U),ht=n.get(at).__webglTexture;e.bindTexture(vt,ht),A(vt),e.unbindTexture()}}}const le=[];function te(U){if(U.samples>0){if(Mt(U)===!1){const C=U.textures,J=U.width,ct=U.height;let at=i.COLOR_BUFFER_BIT;const vt=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=n.get(U),rt=C.length>1;if(rt)for(let St=0;St<C.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),U.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let St=0;St<C.length;St++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ht.__webglColorRenderbuffer[St]);const B=n.get(C[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,B,0)}i.blitFramebuffer(0,0,J,ct,0,0,J,ct,at,i.NEAREST),c===!0&&(le.length=0,le.push(i.COLOR_ATTACHMENT0+St),U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&le.push(vt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,le))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let St=0;St<C.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,ht.__webglColorRenderbuffer[St]);const B=n.get(C[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,B,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.storeMultisampledDepthBuffer===!1&&c){const C=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function xe(U){return Math.min(s.maxSamples,U.samples)}function Mt(U){const C=n.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Ce(U){const C=o.render.frame;u.get(U)!==C&&(u.set(U,C),U.update())}function Zt(U,C){const J=U.colorSpace,ct=U.format,at=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||J!==vr&&J!==Pi&&(ge.getTransfer(J)===Pe?(ct!==ti||at!==Rn)&&$t("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ye("WebGLTextures: Unsupported texture color space:",J)),C}function ee(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(l.width=U.naturalWidth||U.width,l.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(l.width=U.displayWidth,l.height=U.displayHeight):(l.width=U.width,l.height=U.height),l}this.allocateTextureUnit=Rt,this.resetTextureUnits=$,this.getTextureUnits=lt,this.setTextureUnits=mt,this.setTexture2D=ut,this.setTexture2DArray=Pt,this.setTexture3D=At,this.setTextureCube=Tt,this.rebindTextures=Re,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=te,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=Jt,this.useMultisampledRTT=Mt,this.dispose=k}function Au(i,t){function e(n,s=Pi){let r;const o=ge.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===na)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_l)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===pl)return i.BYTE;if(n===ml)return i.SHORT;if(n===zs)return i.UNSIGNED_SHORT;if(n===ea)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===Xn)return i.FLOAT;if(n===ii)return i.HALF_FLOAT;if(n===xl)return i.ALPHA;if(n===vl)return i.RGB;if(n===ti)return i.RGBA;if(n===Ui)return i.DEPTH_COMPONENT;if(n===Di)return i.DEPTH_STENCIL;if(n===sa)return i.RED;if(n===ra)return i.RED_INTEGER;if(n===Yi)return i.RG;if(n===oa)return i.RG_INTEGER;if(n===aa)return i.RGBA_INTEGER;if(n===ar||n===lr||n===cr||n===hr)if(o===Pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===go||n===_o||n===xo||n===vo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_o)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Mo||n===So||n===yo||n===bo||n===Eo||n===_r||n===wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Mo||n===So)return o===Pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===bo)return r.COMPRESSED_R11_EAC;if(n===Eo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===_r)return r.COMPRESSED_RG11_EAC;if(n===wo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===zo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===To)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ao)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ro)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Co)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Po)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Do)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===No)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Go||n===ko||n===Ho)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Go)return o===Pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vo||n===Wo||n===xr||n===Xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tg=`
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

}`;class Ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ul(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qi({vertexShader:wg,fragmentShader:Tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new Fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rg extends Oi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,g=null,f=null,p=null,v=null;const b=typeof XRWebGLBinding<"u",h=new Ag,m={},x=e.getContextAttributes();let w=null,A=null;const E=[],_=[],d=new Ut;let M=null,R=null;const T=new Hn;T.viewport=new Ve;const S=new Hn;S.viewport=new Ve;const D=[T,S],I=new pu;let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let ut=E[et];return ut===void 0&&(ut=new so,E[et]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(et){let ut=E[et];return ut===void 0&&(ut=new so,E[et]=ut),ut.getGripSpace()},this.getHand=function(et){let ut=E[et];return ut===void 0&&(ut=new so,E[et]=ut),ut.getHandSpace()};function V(et){const ut=_.indexOf(et.inputSource);if(ut===-1)return;const Pt=E[ut];Pt!==void 0&&(Pt.update(et.inputSource,et.frame,l||o),Pt.dispatchEvent({type:et.type,data:et.inputSource}))}function X(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",it);for(let et=0;et<E.length;et++){const ut=_[et];ut!==null&&(_[et]=null,E[et].disconnect(ut))}N=null,k=null,h.reset();for(const et in m)delete m[et];if(t.setRenderTarget(w),p=null,f=null,g=null,s=null,A=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(d.width,d.height,!1),R!==null){const et=R.camera;et.fov=R.fov,et.zoom=R.zoom,et.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,n.isPresenting===!0&&$t("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){a=et,n.isPresenting===!0&&$t("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(et){l=et},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return g===null&&b&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",X),s.addEventListener("inputsourceschange",it),x.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(d),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pt=null,At=null,Tt=null;x.depth&&(Tt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Pt=x.stencil?Di:Ui,At=x.stencil?ds:ni);const Xt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};g=this.getBinding(),f=g.createProjectionLayer(Xt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),A=new ei(f.textureWidth,f.textureHeight,{format:ti,type:Rn,depthTexture:new ps(f.textureWidth,f.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,Pt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const Pt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Pt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new ei(p.framebufferWidth,p.framebufferHeight,{format:ti,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Rt.setContext(s),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function it(et){for(let ut=0;ut<et.removed.length;ut++){const Pt=et.removed[ut],At=_.indexOf(Pt);At>=0&&(_[At]=null,E[At].disconnect(Pt))}for(let ut=0;ut<et.added.length;ut++){const Pt=et.added[ut];let At=_.indexOf(Pt);if(At===-1){for(let Xt=0;Xt<E.length;Xt++)if(Xt>=_.length){_.push(Pt),At=Xt;break}else if(_[Xt]===null){_[Xt]=Pt,At=Xt;break}if(At===-1)break}const Tt=E[At];Tt&&Tt.connect(Pt)}}function j(et,ut){ut===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(ut.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let ut=et.near,Pt=et.far;h.texture!==null&&(h.depthNear>0&&(ut=h.depthNear),h.depthFar>0&&(Pt=h.depthFar)),I.near=S.near=T.near=ut,I.far=S.far=T.far=Pt,(N!==I.near||k!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),N=I.near,k=I.far),I.layers.mask=et.layers.mask|6,T.layers.mask=I.layers.mask&-5,S.layers.mask=I.layers.mask&-3;const At=et.parent,Tt=I.cameras;j(I,At);for(let Xt=0;Xt<Tt.length;Xt++)j(Tt[Xt],At);I.projectionMatrix.copy(T.projectionMatrix),I.projectionMatrixInverse.copy(T.projectionMatrixInverse),R===null&&et.isPerspectiveCamera&&(R={camera:et,fov:et.fov,zoom:et.zoom}),$(et,I,At)};function $(et,ut,Pt){Pt===null?et.matrix.copy(ut.matrixWorld):(et.matrix.copy(Pt.matrixWorld),et.matrix.invert(),et.matrix.multiply(ut.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(ut.projectionMatrix),et.projectionMatrixInverse.copy(ut.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Sr*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(et){c=et,f!==null&&(f.fixedFoveation=et),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=et)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(I)},this.getCameraTexture=function(et){return m[et]};let lt=null;function mt(et,ut){if(u=ut.getViewerPose(l||o),v=ut,u!==null){const Pt=u.views;p!==null&&(t.setRenderTargetFramebuffer(A,p.framebuffer),t.setRenderTarget(A));let At=!1;Pt.length!==I.cameras.length&&(I.cameras.length=0,At=!0);for(let qt=0;qt<Pt.length;qt++){const ae=Pt[qt];let st=null;if(p!==null)st=p.getViewport(ae);else{const Et=g.getViewSubImage(f,ae);st=Et.viewport,qt===0&&(t.setRenderTargetTextures(A,Et.colorTexture,Et.depthStencilTexture),t.setRenderTarget(A))}let Ot=D[qt];Ot===void 0&&(Ot=new Hn,Ot.layers.enable(qt),Ot.viewport=new Ve,D[qt]=Ot),Ot.matrix.fromArray(ae.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(ae.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(st.x,st.y,st.width,st.height),qt===0&&(I.matrix.copy(Ot.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),At===!0&&I.cameras.push(Ot)}const Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){g=n.getBinding();const qt=g.getDepthInformation(Pt[0]);qt&&qt.isValid&&qt.texture&&h.init(qt,s.renderState)}if(Tt&&Tt.includes("camera-access")&&b){t.state.unbindTexture(),g=n.getBinding();for(let qt=0;qt<Pt.length;qt++){const ae=Pt[qt].camera;if(ae){let st=m[ae];st||(st=new Ul,m[ae]=st);const Ot=g.getCameraImage(ae);st.sourceTexture=Ot}}}}for(let Pt=0;Pt<E.length;Pt++){const At=_[Pt],Tt=E[Pt];At!==null&&Tt!==void 0&&Tt.update(At,ut,l||o)}lt&&lt(et,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),v=null}const Rt=new _u;Rt.setAnimationLoop(mt),this.setAnimationLoop=function(et){lt=et},this.dispose=function(){}}}const Cg=new _e,Ru=new se;Ru.set(-1,0,0,0,1,0,0,0,1);function Pg(i,t){function e(h,m){h.matrixAutoUpdate===!0&&h.updateMatrix(),m.value.copy(h.matrix)}function n(h,m){m.color.getRGB(h.fogColor.value,au(i)),m.isFog?(h.fogNear.value=m.near,h.fogFar.value=m.far):m.isFogExp2&&(h.fogDensity.value=m.density)}function s(h,m,x,w,A){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(h,m):m.isMeshLambertMaterial?(r(h,m),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(h,m),g(h,m)):m.isMeshPhongMaterial?(r(h,m),u(h,m),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(h,m),f(h,m),m.isMeshPhysicalMaterial&&p(h,m,A)):m.isMeshMatcapMaterial?(r(h,m),v(h,m)):m.isMeshDepthMaterial?r(h,m):m.isMeshDistanceMaterial?(r(h,m),b(h,m)):m.isMeshNormalMaterial?r(h,m):m.isLineBasicMaterial?(o(h,m),m.isLineDashedMaterial&&a(h,m)):m.isPointsMaterial?c(h,m,x,w):m.isSpriteMaterial?l(h,m):m.isShadowMaterial?(h.color.value.copy(m.color),h.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(h,m){h.opacity.value=m.opacity,m.color&&h.diffuse.value.copy(m.color),m.emissive&&h.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(h.map.value=m.map,e(m.map,h.mapTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,e(m.alphaMap,h.alphaMapTransform)),m.bumpMap&&(h.bumpMap.value=m.bumpMap,e(m.bumpMap,h.bumpMapTransform),h.bumpScale.value=m.bumpScale,m.side===En&&(h.bumpScale.value*=-1)),m.normalMap&&(h.normalMap.value=m.normalMap,e(m.normalMap,h.normalMapTransform),h.normalScale.value.copy(m.normalScale),m.side===En&&h.normalScale.value.negate()),m.displacementMap&&(h.displacementMap.value=m.displacementMap,e(m.displacementMap,h.displacementMapTransform),h.displacementScale.value=m.displacementScale,h.displacementBias.value=m.displacementBias),m.emissiveMap&&(h.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,h.emissiveMapTransform)),m.specularMap&&(h.specularMap.value=m.specularMap,e(m.specularMap,h.specularMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest);const x=t.get(m),w=x.envMap,A=x.envMapRotation;w&&(h.envMap.value=w,h.envMapRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(A)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(Ru),h.reflectivity.value=m.reflectivity,h.ior.value=m.ior,h.refractionRatio.value=m.refractionRatio),m.lightMap&&(h.lightMap.value=m.lightMap,h.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,h.lightMapTransform)),m.aoMap&&(h.aoMap.value=m.aoMap,h.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,h.aoMapTransform))}function o(h,m){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,m.map&&(h.map.value=m.map,e(m.map,h.mapTransform))}function a(h,m){h.dashSize.value=m.dashSize,h.totalSize.value=m.dashSize+m.gapSize,h.scale.value=m.scale}function c(h,m,x,w){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,h.size.value=m.size*x,h.scale.value=w*.5,m.map&&(h.map.value=m.map,e(m.map,h.uvTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,e(m.alphaMap,h.alphaMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest)}function l(h,m){h.diffuse.value.copy(m.color),h.opacity.value=m.opacity,h.rotation.value=m.rotation,m.map&&(h.map.value=m.map,e(m.map,h.mapTransform)),m.alphaMap&&(h.alphaMap.value=m.alphaMap,e(m.alphaMap,h.alphaMapTransform)),m.alphaTest>0&&(h.alphaTest.value=m.alphaTest)}function u(h,m){h.specular.value.copy(m.specular),h.shininess.value=Math.max(m.shininess,1e-4)}function g(h,m){m.gradientMap&&(h.gradientMap.value=m.gradientMap)}function f(h,m){h.metalness.value=m.metalness,m.metalnessMap&&(h.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,h.metalnessMapTransform)),h.roughness.value=m.roughness,m.roughnessMap&&(h.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,h.roughnessMapTransform)),m.envMap&&(h.envMapIntensity.value=m.envMapIntensity)}function p(h,m,x){h.ior.value=m.ior,m.diffuseRoughness>0&&(h.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),m.sheen>0&&(h.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),h.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(h.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,h.sheenColorMapTransform)),m.sheenRoughnessMap&&(h.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,h.sheenRoughnessMapTransform))),m.clearcoat>0&&(h.clearcoat.value=m.clearcoat,h.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(h.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,h.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(h.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===En&&h.clearcoatNormalScale.value.negate())),m.dispersion>0&&(h.dispersion.value=m.dispersion),m.retroreflectivity>0&&(h.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(h.iridescence.value=m.iridescence,h.iridescenceIOR.value=m.iridescenceIOR,h.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(h.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,h.iridescenceMapTransform)),m.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),m.transmission>0&&(h.transmission.value=m.transmission,h.transmissionSamplerMap.value=x.texture,h.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(h.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,h.transmissionMapTransform)),h.thickness.value=m.thickness,m.thicknessMap&&(h.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=m.attenuationDistance,h.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(h.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(h.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=m.specularIntensity,h.specularColor.value.copy(m.specularColor),m.specularColorMap&&(h.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,h.specularColorMapTransform)),m.specularIntensityMap&&(h.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,h.specularIntensityMapTransform))}function v(h,m){m.matcap&&(h.matcap.value=m.matcap)}function b(h,m){const x=t.get(m).light;h.referencePosition.value.setFromMatrixPosition(x.matrixWorld),h.nearDistance.value=x.shadow.camera.near,h.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lg(i,t,e,n){let s={},r={};function o(x,w){const A=w.program;n.uniformBlockBinding(x,A,s[x.id])}function a(x,w){let A=s[x.id];A===void 0&&(v(x),A=c(x),s[x.id]=A,x.addEventListener("dispose",h));const E=w.program;n.updateUBOMapping(x,E);const _=t.render.frame;r[x.id]!==_&&(l(x),r[x.id]=_)}function c(x){const w=i.createBuffer(),A=x.__size,E=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,A,E),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function l(x){const w=s[x.id],A=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let _=0,d=A.length;_<d;_++){const M=A[_];if(Array.isArray(M))for(let R=0,T=M.length;R<T;R++)u(M[R],_,R,E);else u(M,_,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(x,w,A,E){if(f(x,w,A,E)===!0){const _=x.__offset,d=x.value;if(Array.isArray(d)){let M=0;for(let R=0;R<d.length;R++){const T=d[R],S=b(T,!0);g(T,x.__data,M),M+=S.storage/Float32Array.BYTES_PER_ELEMENT}}else g(d,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,x.__data)}}function g(x,w,A){typeof x=="number"||typeof x=="boolean"?w[A]=x:x.isMatrix3?(w[A]=x.elements[0],w[A+1]=x.elements[1],w[A+2]=x.elements[2],w[A+3]=0,w[A+4]=x.elements[3],w[A+5]=x.elements[4],w[A+6]=x.elements[5],w[A+7]=0,w[A+8]=x.elements[6],w[A+9]=x.elements[7],w[A+10]=x.elements[8],w[A+11]=0):ArrayBuffer.isView(x)?w.set(x.subarray(0,w.length-A),A):x.toArray(w,A)}function f(x,w,A,E){const _=x.value,d=w+"_"+A;if(Array.isArray(_)){E[d]===void 0&&(E[d]=[]);const M=E[d];let R=!1;for(let T=0;T<_.length;T++)p(_[T],M,T)===!0&&(R=!0);return R}return p(_,E,d)}function p(x,w,A){if(w[A]===void 0)return typeof x=="number"||typeof x=="boolean"?w[A]=x:ArrayBuffer.isView(x)?w[A]=x.slice():w[A]=x.clone(),!0;{const E=w[A];if(typeof x=="number"||typeof x=="boolean"){if(E!==x)return w[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(E.equals(x)===!1)return E.copy(x),!0}}return!1}function v(x){const w=x.uniforms;let A=0;const E=16;for(let d=0,M=w.length;d<M;d++){const R=Array.isArray(w[d])?w[d]:[w[d]];for(let T=0,S=R.length;T<S;T++){const D=R[T],I=Array.isArray(D.value)?D.value:[D.value],N=Array.isArray(w[d])||Array.isArray(D.value);let k=A;for(let X=0,it=I.length;X<it;X++){const j=I[X],$=b(j,N),lt=A%E,mt=lt%$.boundary,Rt=lt+mt;A+=mt,Rt!==0&&E-Rt<$.storage&&(A+=E-Rt),X===0&&(k=A),A+=$.storage}const V=D.type==="int"?Int32Array:D.type==="uint"?Uint32Array:Float32Array;D.__data=new V((A-k)/Float32Array.BYTES_PER_ELEMENT),D.__offset=k}}const _=A%E;return _>0&&(A+=E-_),x.__size=A,x.__cache={},this}function b(x,w){const A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=16,A.storage=48):x.isMatrix4?(A.boundary=16,A.storage=64):x.isTexture?$t("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):$t("WebGLRenderer: Unsupported uniform value type.",x),w===!0&&(A.boundary=16,A.storage=Math.ceil(A.storage/16)*16),A}function h(x){const w=x.target;w.removeEventListener("dispose",h),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function m(){for(const x in s)i.deleteBuffer(s[x]);s={},r={}}return{bind:o,update:a,dispose:m}}const Dg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function Ig(){return li===null&&(li=new Cl(Dg,16,16,Yi,ii),li.name="DFG_LUT",li.minFilter=bn,li.magFilter=bn,li.wrapS=pi,li.wrapT=pi,li.generateMipmaps=!1,li.needsUpdate=!0),li}class Cu{constructor(t={}){const{canvas:e=Gh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Rn}=t;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=o;const b=p,h=new Set([aa,oa,ra]),m=new Set([Rn,ni,zs,ds,na,ia]),x=new Uint32Array(4),w=new Int32Array(4),A={textures:[],min:[],max:[],resolution:[]};let E=null,_=null;const d=[],M=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let S=!1,D=null,I=null,N=null,k=null;this._outputColorSpace=yn;let V=0,X=0,it=null,j=-1,$=null;const lt=new Ve,mt=new Ve;let Rt=null;const et=new oe(0);let ut=0,Pt=e.width,At=e.height,Tt=1,Xt=null,Ue=null;const qt=new Ve(0,0,Pt,At),ae=new Ve(0,0,Pt,At);let st=!1;const Ot=new ks,Et=new ua;let Yt=!1,jt=!1;const Jt=new _e,Me=new O,Ee=new Ve,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function $e(){return it===null?Tt:1}let H=n;function le(P,G){return e.getContext(P,G)}let te,xe,Mt,Ce,Zt,ee,U,C,J,ct,at,vt,ht,rt,ot,St,B,nt,q,yt,_t,dt,Ht;try{const P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${jo}`),e.addEventListener("webglcontextlost",Bt,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",Ct,!1),H===null){const G="webgl2";if(H=le(G,P),H===null)throw le(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}re()}catch(P){throw e.removeEventListener("webglcontextlost",Bt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),ye("WebGLRenderer: "+P.message),P}function re(){te=new Bm(H),te.init(),_t=new Au(H,te),xe=new Am(H,te,t,_t),Mt=new bg(H,te),xe.reversedDepthBuffer&&f&&Mt.buffers.depth.setReversed(!0),I=H.createFramebuffer(),N=H.createFramebuffer(),k=H.createFramebuffer(),Ce=new km(H),Zt=new cg,ee=new Eg(H,te,Mt,Zt,xe,_t,Ce),U=new Om(T),C=new Vf(H),dt=new wm(H,C),J=new zm(H,C,Ce,dt),ct=new Vm(H,J,C,dt,Ce),nt=new Hm(H,xe,ee),ot=new Rm(Zt),at=new lg(T,U,te,xe,dt,ot),vt=new Pg(T,Zt),ht=new ug,rt=new _g(te),B=new Em(T,U,Mt,ct,v,c),St=new yg(T,ct,xe),Ht=new Lg(H,Ce,xe,Mt),q=new Tm(H,te,Ce),yt=new Gm(H,te,Ce),Ce.programs=at.programs,T.capabilities=xe,T.extensions=te,T.properties=Zt,T.renderLists=ht,T.shadowMap=St,T.state=Mt,T.info=Ce}b!==Rn&&(R=new Xm(b,e.width,e.height,a,s,r));const pt=new Rg(T,H);this.xr=pt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const P=te.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=te.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Tt},this.setPixelRatio=function(P){P!==void 0&&(Tt=P,this.setSize(Pt,At,!1))},this.getSize=function(P){return P.set(Pt,At)},this.setSize=function(P,G,tt=!0){if(pt.isPresenting){$t("WebGLRenderer: Can't change size while VR device is presenting.");return}Pt=P,At=G,e.width=Math.floor(P*Tt),e.height=Math.floor(G*Tt),tt===!0&&(e.style.width=P+"px",e.style.height=G+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,P,G)},this.getDrawingBufferSize=function(P){return P.set(Pt*Tt,At*Tt).floor()},this.setDrawingBufferSize=function(P,G,tt){Pt=P,At=G,Tt=tt,e.width=Math.floor(P*tt),e.height=Math.floor(G*tt),this.setViewport(0,0,P,G)},this.setEffects=function(P){if(b===Rn){ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let G=0;G<P.length;G++)if(P[G].isOutputPass===!0){$t("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(lt)},this.getViewport=function(P){return P.copy(qt)},this.setViewport=function(P,G,tt,Z){P.isVector4?qt.set(P.x,P.y,P.z,P.w):qt.set(P,G,tt,Z),Mt.viewport(lt.copy(qt).multiplyScalar($e()).round())},this.getScissor=function(P){return P.copy(ae)},this.setScissor=function(P,G,tt,Z){P.isVector4?ae.set(P.x,P.y,P.z,P.w):ae.set(P,G,tt,Z),Mt.scissor(mt.copy(ae).multiplyScalar($e()).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(P){Mt.setScissorTest(st=P)},this.setOpaqueSort=function(P){Xt=P},this.setTransparentSort=function(P){Ue=P},this.getClearColor=function(P){return P.copy(B.getClearColor())},this.setClearColor=function(){B.setClearColor(...arguments)},this.getClearAlpha=function(){return B.getClearAlpha()},this.setClearAlpha=function(){B.setClearAlpha(...arguments)},this.clear=function(P=!0,G=!0,tt=!0){let Z=0;if(P){let Q=!1;if(it!==null){const wt=it.texture.format;Q=h.has(wt)}if(Q){const wt=it.texture.type,xt=m.has(wt),ft=B.getClearColor(),gt=B.getClearAlpha(),Nt=ft.r,Kt=ft.g,de=ft.b;xt?(x[0]=Nt,x[1]=Kt,x[2]=de,x[3]=gt,H.clearBufferuiv(H.COLOR,0,x)):(w[0]=Nt,w[1]=Kt,w[2]=de,w[3]=gt,H.clearBufferiv(H.COLOR,0,w))}else Z|=H.COLOR_BUFFER_BIT}G&&(Z|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&(Z|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&H.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),D=P},this.dispose=function(){e.removeEventListener("webglcontextlost",Bt,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),B.dispose(),ht.dispose(),rt.dispose(),ee.dispose(),Zt.dispose(),U.dispose(),ct.dispose(),J.dispose(),dt.dispose(),Ht.dispose(),at.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",vi),pt.removeEventListener("sessionend",vn),Dt.stop()};function Bt(P){P.preventDefault(),Ja("WebGLRenderer: Context Lost."),S=!0}function ne(){Ja("WebGLRenderer: Context Restored."),S=!1;const P=Ce.autoReset,G=St.enabled,tt=St.autoUpdate,Z=St.needsUpdate,Q=St.type;re(),Ce.autoReset=P,St.enabled=G,St.autoUpdate=tt,St.needsUpdate=Z,St.type=Q}function Ct(P){ye("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function ie(P){const G=P.target;G.removeEventListener("dispose",ie),ve(G)}function ve(P){ke(P),Zt.remove(P)}function ke(P){const G=Zt.get(P).programs;G!==void 0&&(G.forEach(function(tt){at.releaseProgram(tt)}),P.isShaderMaterial&&at.releaseShaderCache(P))}this.renderBufferDirect=function(P,G,tt,Z,Q,wt){G===null&&(G=We);const xt=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,ft=ri(P,G,tt,Z,Q);Mt.setMaterial(Z,xt);let gt=tt.index,Nt=1;if(Z.wireframe===!0){if(gt=J.getWireframeAttribute(tt),gt===void 0)return;Nt=2}const Kt=tt.drawRange,de=tt.attributes.position;let Gt=Kt.start*Nt,It=(Kt.start+Kt.count)*Nt;wt!==null&&(Gt=Math.max(Gt,wt.start*Nt),It=Math.min(It,(wt.start+wt.count)*Nt)),gt!==null?(Gt=Math.max(Gt,0),It=Math.min(It,gt.count)):de!=null&&(Gt=Math.max(Gt,0),It=Math.min(It,de.count));const He=It-Gt;if(He<0||He===1/0)return;dt.setup(Q,Z,ft,tt,gt);let Ie,Se=q;if(gt!==null&&(Ie=C.get(gt),Se=yt,Se.setIndex(Ie)),Q.isMesh)Z.wireframe===!0?(Mt.setLineWidth(Z.wireframeLinewidth*$e()),Se.setMode(H.LINES)):Se.setMode(H.TRIANGLES);else if(Q.isLine){let Ye=Z.linewidth;Ye===void 0&&(Ye=1),Mt.setLineWidth(Ye*$e()),Q.isLineSegments?Se.setMode(H.LINES):Q.isLineLoop?Se.setMode(H.LINE_LOOP):Se.setMode(H.LINE_STRIP)}else Q.isPoints?Se.setMode(H.POINTS):Q.isSprite&&Se.setMode(H.TRIANGLES);if(Q.isBatchedMesh)if(te.get("WEBGL_multi_draw"))Se.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const Ye=Q._multiDrawStarts,kt=Q._multiDrawCounts,en=Q._multiDrawCount,ce=gt?C.get(gt).bytesPerElement:1,mn=Zt.get(Z).currentProgram.getUniforms();for(let nn=0;nn<en;nn++)mn.setValue(H,"_gl_DrawID",nn),Se.render(Ye[nn]/ce,kt[nn])}else if(Q.isInstancedMesh)Se.renderInstances(Gt,He,Q.count);else if(tt.isInstancedBufferGeometry){const Ye=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,kt=Math.min(tt.instanceCount,Ye);Se.renderInstances(Gt,He,kt)}else Se.render(Gt,He)};function Pn(P,G,tt,Z){D!==null&&P.isNodeMaterial&&D.setObject(Z,P),Yt===!0&&ot.setState(P,tt,!1),P.transparent===!0&&P.side===xn&&P.forceSinglePass===!1?(P.side=En,P.needsUpdate=!0,Fe(P,G,Z),P.side=Xi,P.needsUpdate=!0,Fe(P,G,Z),P.side=xn):Fe(P,G,Z)}this.compile=function(P,G,tt=null){tt===null&&(tt=P),D!==null&&D.renderStart(P,G,tt),_=rt.get(tt),_.init(G),M.push(_),tt.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(_.pushLight(Q),Q.castShadow&&_.pushShadow(Q))}),P!==tt&&P.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(_.pushLight(Q),Q.castShadow&&_.pushShadow(Q))}),_.setupLights(),D!==null&&D.updateLights(_.state.lightsArray),jt=this.localClippingEnabled,Yt=ot.init(this.clippingPlanes,jt),Yt===!0&&ot.setGlobalState(this.clippingPlanes,G),D!==null&&St.render(_.state.shadowsArray,tt,G);const Z=new Set;return P.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const wt=Q.material;if(wt)if(Array.isArray(wt))for(let xt=0;xt<wt.length;xt++){const ft=wt[xt];Pn(ft,tt,G,Q),Z.add(ft)}else Pn(wt,tt,G,Q),Z.add(wt)}),_=M.pop(),D!==null&&D.renderEnd(),Z},this.compileAsync=function(P,G,tt=null){const Z=this.compile(P,G,tt);return new Promise(Q=>{function wt(){if(Z.forEach(function(xt){const gt=Zt.get(xt).currentProgram;(gt===void 0||gt.isReady())&&Z.delete(xt)}),Z.size===0){Q(P);return}setTimeout(wt,10)}te.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let xi=null;function qs(P){xi&&xi(P)}function vi(){Dt.stop()}function vn(){Dt.start()}const Dt=new _u;Dt.setAnimationLoop(qs),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(P){xi=P,pt.setAnimationLoop(P),P===null?Dt.stop():Dt.start()},pt.addEventListener("sessionstart",vi),pt.addEventListener("sessionend",vn),this.render=function(P,G){if(G!==void 0&&G.isCamera!==!0){ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;D!==null&&D.renderStart(P,G);const tt=pt.enabled===!0&&pt.isPresenting===!0,Z=R!==null&&(it===null||tt)&&R.begin(T,it);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(G),G=pt.getCamera()),P.isScene===!0&&P.onBeforeRender(T,P,G,it),_=rt.get(P,M.length),_.init(G),_.state.textureUnits=ee.getTextureUnits(),M.push(_),Jt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?Et.setFromArrayCamera(G):Ot.setFromProjectionMatrix(Jt,Yn,G.reversedDepth),jt=this.localClippingEnabled,Yt=ot.init(this.clippingPlanes,jt),E=ht.get(P,d.length),E.init(),d.push(E),this.info.render.frame++,pt.enabled===!0&&pt.isPresenting===!0){const xt=T.xr.getDepthSensingMesh();xt!==null&&Mn(xt,G,-1/0,T.sortObjects)}Mn(P,G,0,T.sortObjects),E.finish(),D!==null&&D.updateLights(_.state.lightsArray),T.sortObjects===!0&&E.sort(Xt,Ue),Re=pt.enabled===!1||pt.isPresenting===!1||pt.hasDepthSensing()===!1,Re&&B.addToRenderList(E,P),this.info.autoReset===!0&&this.info.reset(),Yt===!0&&ot.beginShadows();const Q=_.state.shadowsArray;if(St.render(Q,P,G),Yt===!0&&ot.endShadows(),(Z&&R.hasRenderPass())===!1){const xt=E.opaque,ft=E.transmissive;if(_.setupLights(),G.isArrayCamera){const gt=G.cameras;if(ft.length>0)for(let Nt=0,Kt=gt.length;Nt<Kt;Nt++){const de=gt[Nt];Fn(xt,ft,P,de)}Re&&B.render(P);for(let Nt=0,Kt=gt.length;Nt<Kt;Nt++){const de=gt[Nt];Qt(E,P,de,de.viewport)}}else ft.length>0&&Fn(xt,ft,P,G),Re&&B.render(P),Qt(E,P,G)}it!==null&&X===0&&(ee.updateMultisampleRenderTarget(it),ee.updateRenderTargetMipmap(it)),Z&&R.end(T),P.isScene===!0&&P.onAfterRender(T,P,G),dt.resetDefaultState(),j=-1,$=null,M.pop(),M.length>0?(_=M[M.length-1],ee.setTextureUnits(_.state.textureUnits),Yt===!0&&ot.setGlobalState(T.clippingPlanes,_.state.camera)):_=null,d.pop(),d.length>0?E=d[d.length-1]:E=null,D!==null&&D.renderEnd()};function Mn(P,G,tt,Z){if(P.visible===!1)return;if(P.layers.test(G.layers)){if(P.isGroup)tt=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(G);else if(P.isLight)_.pushLight(P),P.castShadow&&_.pushShadow(P);else if(P.isSprite){const xt=G.isArrayCamera?Et:Ot;if(!P.frustumCulled||P.intersectsFrustum(xt)){Z&&Ee.setFromMatrixPosition(P.matrixWorld).applyMatrix4(Jt);const ft=ct.update(P),gt=P.material;gt.visible&&E.push(P,ft,gt,tt,Ee.z,null,G)}}else if(P.isMesh||P.isLine||P.isPoints){const xt=G.isArrayCamera?Et:Ot;if(!P.frustumCulled||P.intersectsFrustum(xt)){const ft=ct.update(P),gt=P.material;if(Z&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Ee.copy(P.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ee.copy(ft.boundingSphere.center)),Ee.applyMatrix4(P.matrixWorld).applyMatrix4(Jt)),Array.isArray(gt)){const Nt=ft.groups;for(let Kt=0,de=Nt.length;Kt<de;Kt++){const Gt=Nt[Kt],It=gt[Gt.materialIndex];It&&It.visible&&E.push(P,ft,It,tt,Ee.z,Gt,G)}}else gt.visible&&E.push(P,ft,gt,tt,Ee.z,null,G)}}}const wt=P.children;for(let xt=0,ft=wt.length;xt<ft;xt++)Mn(wt[xt],G,tt,Z)}function Qt(P,G,tt,Z){const{opaque:Q,transmissive:wt,transparent:xt}=P;_.setupLightsView(tt),Yt===!0&&ot.setGlobalState(T.clippingPlanes,tt),Z&&Mt.viewport(lt.copy(Z)),Q.length>0&&Mi(Q,G,tt),wt.length>0&&Mi(wt,G,tt),xt.length>0&&Mi(xt,G,tt),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Fn(P,G,tt,Z){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[Z.id]===void 0){const Gt=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[Z.id]=new ei(1,1,{generateMipmaps:!0,type:Gt?ii:Rn,minFilter:Li,samples:Math.max(4,xe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ge.workingColorSpace})}const wt=_.state.transmissionRenderTarget[Z.id],xt=Z.viewport||lt;wt.setSize(xt.z*T.transmissionResolutionScale,xt.w*T.transmissionResolutionScale);const ft=T.getRenderTarget(),gt=T.getActiveCubeFace(),Nt=T.getActiveMipmapLevel();T.setRenderTarget(wt),T.getClearColor(et),ut=T.getClearAlpha(),ut<1&&T.setClearColor(16777215,.5),T.clear(),Re&&B.render(tt);const Kt=T.toneMapping;T.toneMapping=mi;const de=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),_.setupLightsView(Z),Yt===!0&&ot.setGlobalState(T.clippingPlanes,Z),Mi(P,tt,Z),ee.updateMultisampleRenderTarget(wt),ee.updateRenderTargetMipmap(wt),te.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let It=0,He=G.length;It<He;It++){const Ie=G[It],{object:Se,geometry:Ye,material:kt,group:en}=Ie;if(kt.side===xn&&Se.layers.test(Z.layers)){const ce=kt.side;kt.side=En,kt.needsUpdate=!0,Si(Se,tt,Z,Ye,kt,en),kt.side=ce,kt.needsUpdate=!0,Gt=!0}}Gt===!0&&(ee.updateMultisampleRenderTarget(wt),ee.updateRenderTargetMipmap(wt))}T.setRenderTarget(ft,gt,Nt),T.setClearColor(et,ut),de!==void 0&&(Z.viewport=de),T.toneMapping=Kt}function Mi(P,G,tt){const Z=G.isScene===!0?G.overrideMaterial:null;for(let Q=0,wt=P.length;Q<wt;Q++){const xt=P[Q],{object:ft,geometry:gt,group:Nt}=xt;let Kt=xt.material;Kt.allowOverride===!0&&Z!==null&&(Kt=Z),ft.layers.test(tt.layers)&&Si(ft,G,tt,gt,Kt,Nt)}}function Si(P,G,tt,Z,Q,wt){D!==null&&Q.isNodeMaterial&&D.setObject(P,Q),P.onBeforeRender(T,G,tt,Z,Q,wt),P.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),Q.onBeforeRender(T,G,tt,Z,P,wt),Q.transparent===!0&&Q.side===xn&&Q.forceSinglePass===!1?(Q.side=En,Q.needsUpdate=!0,T.renderBufferDirect(tt,G,Z,Q,P,wt),Q.side=Xi,Q.needsUpdate=!0,T.renderBufferDirect(tt,G,Z,Q,P,wt),Q.side=xn):T.renderBufferDirect(tt,G,Z,Q,P,wt),P.onAfterRender(T,G,tt,Z,Q,wt)}function yi(P){let G=0;for(const tt of P)tt.texture!==null&&G++;return G}function Fe(P,G,tt){G.isScene!==!0&&(G=We);const Z=Zt.get(P),Q=_.state.lights,wt=_.state.shadowsArray,xt=Q.state.version,ft=at.getParameters(P,Q.state,wt,G,tt,_.state.lightProbeGridArray),gt=at.getProgramCacheKey(ft);let Nt=Z.programs;Z.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?G.environment:null,Z.fog=G.fog;const Kt=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;Z.envMap=U.get(P.envMap||Z.environment,Kt),Z.envMapRotation=Z.environment!==null&&P.envMap===null?G.environmentRotation:P.envMapRotation,Nt===void 0&&(P.addEventListener("dispose",ie),Nt=new Map,Z.programs=Nt,Z.programVariants=new Map);let de=Nt.get(gt);if(de!==void 0){if(Z.currentProgram===de&&Z.lightsStateVersion===xt)return On(P,ft),de}else ft.uniforms=at.getUniforms(P),D!==null&&P.isNodeMaterial&&D.build(P,tt,ft),P.onBeforeCompile(ft,T),de=at.acquireProgram(ft,gt),Nt.set(gt,de),Z.uniforms=ft.uniforms;const Gt=Z.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Gt.clippingPlanes=ot.uniform),On(P,ft),Z.needsLights=$i(P),Z.lightsStateVersion=xt,Z.needsLights&&(Gt.ambientLightColor.value=Q.state.ambient,Gt.lightProbe.value=Q.state.probe,Gt.sunLights.value=Q.state.sun,Gt.sunLightShadows.value=Q.state.sunShadow,Gt.directionalLights.value=Q.state.directional,Gt.directionalLightShadows.value=Q.state.directionalShadow,Gt.spotLights.value=Q.state.spot,Gt.spotLightShadows.value=Q.state.spotShadow,Gt.rectAreaLights.value=Q.state.rectArea,Gt.ltc_1.value=Q.state.rectAreaLTC1,Gt.ltc_2.value=Q.state.rectAreaLTC2,Gt.pointLights.value=Q.state.point,Gt.pointLightShadows.value=Q.state.pointShadow,Gt.hemisphereLights.value=Q.state.hemi,Gt.sunShadowMatrix.value=Q.state.sunShadowMatrix,Gt.sunShadowCascade.value=Q.state.sunShadowCascade,Gt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Gt.spotLightMatrix.value=Q.state.spotLightMatrix,Gt.spotLightMap.value=Q.state.spotLightMap,Gt.pointShadowMatrix.value=Q.state.pointShadowMatrix),Z.numLightProbeGrids=yi(_.state.lightProbeGridArray),Z.currentProgram=de,Z.uniformsList=null,de}function we(P,G,tt,Z,Q){const wt=Zt.get(P),xt=wt.currentProgram.id+","+Z+","+Q;let ft=wt.programVariants.get(xt);return ft===void 0?(ft=Fe(P,G,tt),wt.programVariants.set(xt,ft)):(wt.currentProgram=ft,wt.uniformsList=null,wt.outputColorSpace=Z,wt.toneMapping=Q),ft}function De(P){if(P.uniformsList===null){const G=P.currentProgram.getUniforms();P.uniformsList=ro.seqWithValue(G.seq,P.uniforms)}return P.uniformsList}function On(P,G){const tt=Zt.get(P);tt.outputColorSpace=G.outputColorSpace,tt.batching=G.batching,tt.batchingColor=G.batchingColor,tt.instancing=G.instancing,tt.instancingColor=G.instancingColor,tt.instancingMorph=G.instancingMorph,tt.skinning=G.skinning,tt.morphTargets=G.morphTargets,tt.morphNormals=G.morphNormals,tt.morphColors=G.morphColors,tt.morphTargetsCount=G.morphTargetsCount,tt.numClippingPlanes=G.numClippingPlanes,tt.numIntersection=G.numClipIntersection,tt.vertexAlphas=G.vertexAlphas,tt.vertexTangents=G.vertexTangents,tt.toneMapping=G.toneMapping}function ri(P,G,tt,Z,Q){G.isScene!==!0&&(G=We),ee.resetTextureUnits();const wt=G.fog,xt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?G.environment:null,ft=it===null?T.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ge.workingColorSpace,gt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Nt=U.get(Z.envMap||xt,gt),Kt=Z.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,de=!!tt.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Gt=!!tt.morphAttributes.position,It=!!tt.morphAttributes.normal,He=!!tt.morphAttributes.color;let Ie=mi;Z.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ie=T.toneMapping);const Se=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Ye=Se!==void 0?Se.length:0,kt=Zt.get(Z),en=_.state.lights;if(Yt===!0&&(jt===!0||P!==$)){const Oe=P===$&&Z.id===j;ot.setState(Z,P,Oe)}let ce=!1,mn=!1;Z.version===kt.__version?kt.needsLights&&kt.lightsStateVersion!==en.state.version||Q.isBatchedMesh&&kt.batching===!1||!Q.isBatchedMesh&&kt.batching===!0||Q.isBatchedMesh&&kt.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&kt.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&kt.instancing===!1||!Q.isInstancedMesh&&kt.instancing===!0||Q.isSkinnedMesh&&kt.skinning===!1||!Q.isSkinnedMesh&&kt.skinning===!0||Q.isInstancedMesh&&kt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&kt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&kt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&kt.instancingMorph===!1&&Q.morphTexture!==null||kt.envMap!==Nt||Z.fog===!0&&kt.fog!==wt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ot.numPlanes||kt.numIntersection!==ot.numIntersection)||kt.vertexAlphas!==Kt||kt.vertexTangents!==de||kt.morphTargets!==Gt||kt.morphNormals!==It||kt.morphColors!==He||kt.morphTargetsCount!==Ye||kt.numLightProbeGrids!==yi(_.state.lightProbeGridArray)?ce=!0:(kt.outputColorSpace!==ft||kt.toneMapping!==Ie)&&(mn=!0):(ce=!0,kt.__version=Z.version);let nn=kt.currentProgram;(ce===!0||mn===!0)&&(nn=mn===!0?we(Z,G,Q,ft,Ie):Fe(Z,G,Q),D&&Z.isNodeMaterial&&D.onUpdateProgram(Z,nn,kt));let Ln=!1,Zn=!1,oi=!1;const me=nn.getUniforms(),Qe=kt.uniforms;if(Mt.useProgram(nn.program)&&(Ln=!0,Zn=!0,oi=!0),Z.id!==j&&(j=Z.id,Zn=!0),Ln||$!==P){Mt.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),me.setValue(H,"projectionMatrix",P.projectionMatrix),me.setValue(H,"viewMatrix",P.matrixWorldInverse);const Ke=me.map.cameraPosition;Ke!==void 0&&Ke.setValue(H,Me.setFromMatrixPosition(P.matrixWorld)),xe.logarithmicDepthBuffer&&me.setValue(H,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&me.setValue(H,"isOrthographic",P.isOrthographicCamera===!0),$!==P&&($=P,Zn=!0,oi=!0)}if(kt.needsLights&&(en.state.sunShadowMap.length>0&&me.setValue(H,"sunShadowMap",en.state.sunShadowMap,ee),en.state.directionalShadowMap.length>0&&me.setValue(H,"directionalShadowMap",en.state.directionalShadowMap,ee),en.state.spotShadowMap.length>0&&me.setValue(H,"spotShadowMap",en.state.spotShadowMap,ee),en.state.pointShadowMap.length>0&&me.setValue(H,"pointShadowMap",en.state.pointShadowMap,ee)),Q.isSkinnedMesh){me.setOptional(H,Q,"bindMatrix"),me.setOptional(H,Q,"bindMatrixInverse");const Oe=Q.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),me.setValue(H,"boneTexture",Oe.boneTexture,ee))}Q.isBatchedMesh&&(me.setOptional(H,Q,"batchingTexture"),me.setValue(H,"batchingTexture",Q._matricesTexture,ee),me.setOptional(H,Q,"batchingIdTexture"),me.setValue(H,"batchingIdTexture",Q._indirectTexture,ee),me.setOptional(H,Q,"batchingColorTexture"),Q._colorsTexture!==null&&me.setValue(H,"batchingColorTexture",Q._colorsTexture,ee));const Tn=tt.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&nt.update(Q,tt,nn),(Zn||kt.receiveShadow!==Q.receiveShadow)&&(kt.receiveShadow=Q.receiveShadow,me.setValue(H,"receiveShadow",Q.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&G.environment!==null&&(Qe.envMapIntensity.value=G.environmentIntensity),Qe.dfgLUT!==void 0&&(Qe.dfgLUT.value=Ig()),Zn){if(me.setValue(H,"toneMappingExposure",T.toneMappingExposure),kt.needsLights&&ms(Qe,oi),wt&&Z.fog===!0&&vt.refreshFogUniforms(Qe,wt),vt.refreshMaterialUniforms(Qe,Z,Tt,At,_.state.transmissionRenderTarget[P.id]),kt.needsLights&&kt.numLightProbeGrids>0){const Oe=A;let Ke=0;for(const Bn of _.state.lightProbeGridArray)Bn.texture!==null&&(Oe.textures[Ke]=Bn.texture,Oe.min[Ke]=Bn.boundingBox.min,Oe.max[Ke]=Bn.boundingBox.max,Oe.resolution[Ke]=Bn.resolution,Ke++);for(const Bn in Oe)Oe[Bn].length=Ke;Qe.probesSH.value=Oe.textures,Qe.probesMin.value=Oe.min,Qe.probesMax.value=Oe.max,Qe.probesResolution.value=Oe.resolution}ro.upload(H,De(kt),Qe,ee)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ro.upload(H,De(kt),Qe,ee),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&me.setValue(H,"center",Q.center),me.setValue(H,"modelViewMatrix",Q.modelViewMatrix),me.setValue(H,"normalMatrix",Q.normalMatrix),me.setValue(H,"modelMatrix",Q.matrixWorld),Z.uniformsGroups!==void 0){const Oe=Z.uniformsGroups;for(let Ke=0,Bn=Oe.length;Ke<Bn;Ke++){const Zs=Oe[Ke];Ht.update(Zs,nn),Ht.bind(Zs,nn)}}return nn}function ms(P,G){P.ambientLightColor.needsUpdate=G,P.lightProbe.needsUpdate=G,P.sunLights.needsUpdate=G,P.sunLightShadows.needsUpdate=G,P.directionalLights.needsUpdate=G,P.directionalLightShadows.needsUpdate=G,P.pointLights.needsUpdate=G,P.pointLightShadows.needsUpdate=G,P.spotLights.needsUpdate=G,P.spotLightShadows.needsUpdate=G,P.rectAreaLights.needsUpdate=G,P.hemisphereLights.needsUpdate=G}function $i(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(P,G,tt){const Z=Zt.get(P);Z.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Zt.get(P.texture).__webglTexture=G,Zt.get(P.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:tt,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,G){const tt=Zt.get(P);tt.__webglFramebuffer=G,tt.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(P,G=0,tt=0){it=P,V=G,X=tt;let Z=null,Q=!1,wt=!1;if(P){const ft=Zt.get(P);if(ft.__useDefaultFramebuffer!==void 0){Mt.bindFramebuffer(H.FRAMEBUFFER,ft.__webglFramebuffer),lt.copy(P.viewport),mt.copy(P.scissor),Rt=P.scissorTest,Mt.viewport(lt),Mt.scissor(mt),Mt.setScissorTest(Rt),j=-1;return}else if(ft.__webglFramebuffer===void 0)ee.setupRenderTarget(P);else if(ft.__hasExternalTextures)ee.rebindTextures(P,Zt.get(P.texture).__webglTexture,Zt.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Kt=P.depthTexture;if(ft.__boundDepthTexture!==Kt){if(Kt!==null&&Zt.has(Kt)&&(P.width!==Kt.image.width||P.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(P)}}const gt=P.texture;(gt.isData3DTexture||gt.isDataArrayTexture||gt.isCompressedArrayTexture)&&(wt=!0);const Nt=Zt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Nt[G])?Z=Nt[G][tt]:Z=Nt[G],Q=!0):P.samples>0&&ee.useMultisampledRTT(P)===!1?Z=Zt.get(P).__webglMultisampledFramebuffer:Array.isArray(Nt)?Z=Nt[tt]:Z=Nt,lt.copy(P.viewport),mt.copy(P.scissor),Rt=P.scissorTest}else lt.copy(qt).multiplyScalar(Tt).floor(),mt.copy(ae).multiplyScalar(Tt).floor(),Rt=st;if(tt!==0&&(Z=I),Mt.bindFramebuffer(H.FRAMEBUFFER,Z)&&Mt.drawBuffers(P,Z),Mt.viewport(lt),Mt.scissor(mt),Mt.setScissorTest(Rt),Q){const ft=Zt.get(P.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,ft.__webglTexture,tt)}else if(wt){const ft=G;for(let gt=0;gt<P.textures.length;gt++){const Nt=Zt.get(P.textures[gt]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+gt,Nt.__webglTexture,tt,ft)}}else if(P!==null&&tt!==0){const ft=Zt.get(P.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ft.__webglTexture,tt)}j=-1};function Bi(P){const G=Zt.get(P);return(G.__readFormat!==P.format||G.__readType!==P.type)&&(G.__readFormat=P.format,G.__readType=P.type,G.__formatReadable=xe.textureFormatReadable(P.format),G.__typeReadable=xe.textureTypeReadable(P.type)),G}this.readRenderTargetPixels=function(P,G,tt,Z,Q,wt,xt,ft=0){if(!(P&&P.isWebGLRenderTarget)){ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Zt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&xt!==void 0&&(gt=gt[xt],Array.isArray(gt)&&(gt=gt[0])),gt){Mt.bindFramebuffer(H.FRAMEBUFFER,gt);try{const Nt=P.textures[ft],Kt=Nt.format,de=Nt.type;P.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+ft);const Gt=Bi(Nt);if(Gt.__formatReadable===!1){ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Gt.__typeReadable===!1){ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=P.width-Z&&tt>=0&&tt<=P.height-Q&&H.readPixels(G,tt,Z,Q,_t.convert(Kt),_t.convert(de),wt)}finally{const Nt=it!==null?Zt.get(it).__webglFramebuffer:null;Mt.bindFramebuffer(H.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(P,G,tt,Z,Q,wt,xt,ft=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Zt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&xt!==void 0&&(gt=gt[xt],Array.isArray(gt)&&(gt=gt[0])),gt)if(G>=0&&G<=P.width-Z&&tt>=0&&tt<=P.height-Q){Mt.bindFramebuffer(H.FRAMEBUFFER,gt);const Nt=P.textures[ft],Kt=Nt.format,de=Nt.type;P.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+ft);const Gt=Bi(Nt);if(Gt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Gt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const It=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,It),H.bufferData(H.PIXEL_PACK_BUFFER,wt.byteLength,H.STREAM_READ),H.readPixels(G,tt,Z,Q,_t.convert(Kt),_t.convert(de),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const He=it!==null?Zt.get(it).__webglFramebuffer:null;Mt.bindFramebuffer(H.FRAMEBUFFER,He);const Ie=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await qu(H,Ie,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,It),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,wt),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(It),H.deleteSync(Ie),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,G=null,tt=0){const Z=Math.pow(2,-tt),Q=Math.floor(P.image.width*Z),wt=Math.floor(P.image.height*Z),xt=G!==null?G.x:0,ft=G!==null?G.y:0;ee.setTexture2D(P,0),H.copyTexSubImage2D(H.TEXTURE_2D,tt,0,0,xt,ft,Q,wt),Mt.unbindTexture()},this.copyTextureToTexture=function(P,G,tt=null,Z=null,Q=0,wt=0){let xt,ft,gt,Nt,Kt,de,Gt,It,He;const Ie=P.isCompressedTexture?P.mipmaps[wt]:P.image;if(tt!==null)xt=tt.max.x-tt.min.x,ft=tt.max.y-tt.min.y,gt=tt.isBox3?tt.max.z-tt.min.z:1,Nt=tt.min.x,Kt=tt.min.y,de=tt.isBox3?tt.min.z:0;else{const me=Math.pow(2,-Q);xt=Math.floor(Ie.width*me),ft=Math.floor(Ie.height*me),P.isDataArrayTexture?gt=Ie.depth:P.isData3DTexture?gt=Math.floor(Ie.depth*me):gt=1,Nt=0,Kt=0,de=0}Z!==null?(Gt=Z.x,It=Z.y,He=Z.z):(Gt=0,It=0,He=0);const Se=_t.convert(G.format),Ye=_t.convert(G.type);let kt;G.isData3DTexture?(ee.setTexture3D(G,0),kt=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ee.setTexture2DArray(G,0),kt=H.TEXTURE_2D_ARRAY):(ee.setTexture2D(G,0),kt=H.TEXTURE_2D),Mt.activeTexture(H.TEXTURE0),Mt.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),Mt.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),Mt.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const en=Mt.getParameter(H.UNPACK_ROW_LENGTH),ce=Mt.getParameter(H.UNPACK_IMAGE_HEIGHT),mn=Mt.getParameter(H.UNPACK_SKIP_PIXELS),nn=Mt.getParameter(H.UNPACK_SKIP_ROWS),Ln=Mt.getParameter(H.UNPACK_SKIP_IMAGES);Mt.pixelStorei(H.UNPACK_ROW_LENGTH,Ie.width),Mt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ie.height),Mt.pixelStorei(H.UNPACK_SKIP_PIXELS,Nt),Mt.pixelStorei(H.UNPACK_SKIP_ROWS,Kt),Mt.pixelStorei(H.UNPACK_SKIP_IMAGES,de);const Zn=P.isDataArrayTexture||P.isData3DTexture,oi=G.isDataArrayTexture||G.isData3DTexture;if(P.isDepthTexture){const me=Zt.get(P),Qe=Zt.get(G),Tn=Zt.get(me.__renderTarget),Oe=Zt.get(Qe.__renderTarget);Mt.bindFramebuffer(H.READ_FRAMEBUFFER,Tn.__webglFramebuffer),Mt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Ke=0;Ke<gt;Ke++)Zn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Zt.get(P).__webglTexture,Q,de+Ke),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Zt.get(G).__webglTexture,wt,He+Ke)),H.blitFramebuffer(Nt,Kt,Nt+xt,Kt+ft,Gt,It,Gt+xt,It+ft,H.DEPTH_BUFFER_BIT,H.NEAREST);Mt.bindFramebuffer(H.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(Q!==0||P.isRenderTargetTexture||Zt.has(P)){const me=Zt.get(P),Qe=Zt.get(G);Mt.bindFramebuffer(H.READ_FRAMEBUFFER,N),Mt.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let Tn=0;Tn<gt;Tn++)Zn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,me.__webglTexture,Q,de+Tn):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,me.__webglTexture,Q),oi?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Qe.__webglTexture,wt,He+Tn):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Qe.__webglTexture,wt),Q!==0?H.blitFramebuffer(Nt,Kt,Nt+xt,Kt+ft,Gt,It,Gt+xt,It+ft,H.COLOR_BUFFER_BIT,H.NEAREST):oi?H.copyTexSubImage3D(kt,wt,Gt,It,He+Tn,Nt,Kt,xt,ft):H.copyTexSubImage2D(kt,wt,Gt,It,Nt,Kt,xt,ft);Mt.bindFramebuffer(H.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else oi?P.isDataTexture||P.isData3DTexture?H.texSubImage3D(kt,wt,Gt,It,He,xt,ft,gt,Se,Ye,Ie.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(kt,wt,Gt,It,He,xt,ft,gt,Se,Ie.data):H.texSubImage3D(kt,wt,Gt,It,He,xt,ft,gt,Se,Ye,Ie):P.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,wt,Gt,It,xt,ft,Se,Ye,Ie.data):P.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,wt,Gt,It,Ie.width,Ie.height,Se,Ie.data):H.texSubImage2D(H.TEXTURE_2D,wt,Gt,It,xt,ft,Se,Ye,Ie);Mt.pixelStorei(H.UNPACK_ROW_LENGTH,en),Mt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ce),Mt.pixelStorei(H.UNPACK_SKIP_PIXELS,mn),Mt.pixelStorei(H.UNPACK_SKIP_ROWS,nn),Mt.pixelStorei(H.UNPACK_SKIP_IMAGES,Ln),wt===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(kt),Mt.unbindTexture()},this.initRenderTarget=function(P){Zt.get(P).__webglFramebuffer===void 0&&ee.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?ee.setTextureCube(P,0):P.isData3DTexture?ee.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?ee.setTexture2DArray(P,0):ee.setTexture2D(P,0),Mt.unbindTexture()},this.resetState=function(){V=0,X=0,it=null,Mt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ge._getDrawingBufferColorSpace(t),e.unpackColorSpace=ge._getUnpackColorSpace()}}const $r=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:ta,AddEquation:as,AddOperation:Ch,AdditiveBlending:gr,AgXToneMapping:ul,AlphaFormat:xl,AlwaysCompare:yl,AlwaysDepth:ao,AlwaysStencilFunc:Ih,ArcCurve:jh,ArrayCamera:pu,BackSide:En,BasicDepthPacking:Lh,Box3:Zi,BoxGeometry:an,BufferAttribute:wn,BufferGeometry:ln,ByteType:pl,Camera:kl,CanvasTexture:ja,CatmullRomCurve3:tu,CineonToneMapping:cl,ClampToEdgeWrapping:pi,Color:oe,ColorManagement:ge,ConeGeometry:gi,ConstantAlphaFactor:Th,ConstantColorFactor:Eh,Controls:gu,CubeCamera:Jo,CubeDepthTexture:Nl,CubeReflectionMapping:fs,CubeRefractionMapping:Bs,CubeTexture:Il,CubicBezierCurve:eu,CubicBezierCurve3:nu,CullFaceBack:Ya,CullFaceFront:lh,CullFaceNone:ah,Curve:_i,CustomBlending:hh,CustomToneMapping:hl,CylinderGeometry:qn,Data3DTexture:qh,DataArrayTexture:Tl,DataTexture:Cl,DepthFormat:Ui,DepthStencilFormat:Di,DepthTexture:ps,DirectionalLight:tl,DoubleSide:xn,DstAlphaFactor:vh,DstColorFactor:Sh,DynamicDrawUsage:bl,EllipseCurve:Fl,EqualCompare:Fh,EqualDepth:co,EquirectangularReflectionMapping:to,EquirectangularRefractionMapping:eo,Euler:si,EventDispatcher:Oi,ExternalTexture:Ul,Float32BufferAttribute:Le,FloatType:Xn,FogExp2:ha,FrontSide:Xi,Frustum:ks,FrustumArray:ua,GLSL3:Ka,GreaterCompare:Oh,GreaterDepth:uo,GreaterEqualCompare:Sl,GreaterEqualDepth:ho,Group:Un,HalfFloatType:ii,HemisphereLight:fu,IcosahedronGeometry:da,ImageUtils:Xh,InstancedBufferAttribute:$a,InstancedMesh:Pl,IntType:ea,KeepStencilOp:io,Layers:ca,LessCompare:Uh,LessDepth:lo,LessEqualCompare:Ml,LessEqualDepth:Os,Light:Gl,LightShadow:du,Line:Jh,LineBasicMaterial:Ll,LineCurve:iu,LineCurve3:su,LineSegments:$h,LinearFilter:bn,LinearMipmapLinearFilter:Li,LinearMipmapNearestFilter:no,LinearSRGBColorSpace:vr,LinearToneMapping:al,LinearTransfer:Mr,MOUSE:hs,Material:Ji,MathUtils:Vn,Matrix3:se,Matrix4:_e,MaxEquation:ph,Mesh:be,MeshBasicMaterial:fi,MeshDepthMaterial:hu,MeshDistanceMaterial:uu,MeshStandardMaterial:Vs,MinEquation:dh,MirroredRepeatWrapping:mo,MixOperation:Rh,MultiplyBlending:Za,MultiplyOperation:ol,NearestFilter:fn,NearestMipmapLinearFilter:sr,NearestMipmapNearestFilter:Ph,NeutralToneMapping:fl,NeverCompare:Nh,NeverDepth:oo,NoBlending:us,NoColorSpace:Pi,NoToneMapping:mi,NormalBlending:Us,NotEqualCompare:Bh,NotEqualDepth:fo,Object3D:tn,ObjectSpaceNormalMap:Dh,OneFactor:gh,OneMinusConstantAlphaFactor:Ah,OneMinusConstantColorFactor:wh,OneMinusDstAlphaFactor:Mh,OneMinusDstColorFactor:yh,OneMinusSrcAlphaFactor:rl,OneMinusSrcColorFactor:xh,OrthographicCamera:Hl,PCFShadowMap:or,PCFSoftShadowMap:ch,PMREMGenerator:br,PerspectiveCamera:Hn,Plane:ui,PlaneGeometry:Fi,Points:Qh,PointsMaterial:Dl,PolyhedronGeometry:fa,QuadraticBezierCurve:ru,QuadraticBezierCurve3:Bl,Quaternion:Cn,R11_EAC_Format:bo,RED_GREEN_RGTC2_Format:xr,RED_RGTC1_Format:Vo,REVISION:jo,RG11_EAC_Format:_r,RGBAFormat:ti,RGBAIntegerFormat:aa,RGBA_ASTC_10x10_Format:Oo,RGBA_ASTC_10x5_Format:No,RGBA_ASTC_10x6_Format:Uo,RGBA_ASTC_10x8_Format:Fo,RGBA_ASTC_12x10_Format:Bo,RGBA_ASTC_12x12_Format:zo,RGBA_ASTC_4x4_Format:To,RGBA_ASTC_5x4_Format:Ao,RGBA_ASTC_5x5_Format:Ro,RGBA_ASTC_6x5_Format:Co,RGBA_ASTC_6x6_Format:Po,RGBA_ASTC_8x5_Format:Lo,RGBA_ASTC_8x6_Format:Do,RGBA_ASTC_8x8_Format:Io,RGBA_BPTC_Format:Go,RGBA_ETC2_EAC_Format:yo,RGBA_PVRTC_2BPPV1_Format:vo,RGBA_PVRTC_4BPPV1_Format:xo,RGBA_S3TC_DXT1_Format:lr,RGBA_S3TC_DXT3_Format:cr,RGBA_S3TC_DXT5_Format:hr,RGBFormat:vl,RGB_BPTC_SIGNED_Format:ko,RGB_BPTC_UNSIGNED_Format:Ho,RGB_ETC1_Format:Mo,RGB_ETC2_Format:So,RGB_PVRTC_2BPPV1_Format:_o,RGB_PVRTC_4BPPV1_Format:go,RGB_S3TC_DXT1_Format:ar,RGFormat:Yi,RGIntegerFormat:oa,RawShaderMaterial:cu,Ray:Xs,Raycaster:mu,RedFormat:sa,RedIntegerFormat:ra,ReinhardToneMapping:ll,RenderTarget:Yh,RepeatWrapping:po,ReverseSubtractEquation:fh,RingGeometry:yr,SIGNED_R11_EAC_Format:Eo,SIGNED_RED_GREEN_RGTC2_Format:Xo,SIGNED_RED_RGTC1_Format:Wo,SIGNED_RG11_EAC_Format:wo,SRGBColorSpace:yn,SRGBTransfer:Pe,Scene:Kh,ShaderChunk:ue,ShaderLib:jn,ShaderMaterial:qi,ShortType:ml,Sphere:Ki,SphereGeometry:Wi,Spherical:nl,SplineCurve:ou,SrcAlphaFactor:sl,SrcAlphaSaturateFactor:bh,SrcColorFactor:_h,StaticDrawUsage:zh,SubtractEquation:uh,SubtractiveBlending:qa,TOUCH:cs,TangentSpaceNormalMap:Yo,Texture:pn,TextureSource:la,TorusGeometry:Ni,Triangle:Wn,TubeGeometry:zl,UVMapping:dl,Uint16BufferAttribute:Al,Uint32BufferAttribute:Rl,UniformsLib:Lt,UniformsUtils:lu,UnsignedByteType:Rn,UnsignedInt101111Type:_l,UnsignedInt248Type:ds,UnsignedInt5999Type:gl,UnsignedIntType:ni,UnsignedShort4444Type:na,UnsignedShort5551Type:ia,UnsignedShortType:zs,VSMShadowMap:Ns,Vector2:Ut,Vector3:O,Vector4:Ve,WebGLCoordinateSystem:Yn,WebGLCubeRenderTarget:pa,WebGLRenderTarget:ei,WebGLRenderer:Cu,WebGLUtils:Au,WebGPUCoordinateSystem:Gs,WebXRController:so,ZeroFactor:mh,createCanvasElement:Gh,error:ye,log:Ja,warn:$t,warnOnce:ur},Symbol.toStringTag,{value:"Module"})),nh={type:"change"},Vl={type:"start"},Pu={type:"end"},Qr=new Xs,ih=new ui,Ng=Math.cos(70*Vn.DEG2RAD),on=new O,An=2*Math.PI,Ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xa=1e-6;class Ug extends gu{constructor(t,e=null){super(t,e),this.state=Ae.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Cn,this._lastTargetPosition=new O,this._quat=new Cn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new nl,this._sphericalDelta=new nl,this._scale=1,this._panOffset=new O,this._rotateStart=new Ut,this._rotateEnd=new Ut,this._rotateDelta=new Ut,this._panStart=new Ut,this._panEnd=new Ut,this._panDelta=new Ut,this._dollyStart=new Ut,this._dollyEnd=new Ut,this._dollyDelta=new Ut,this._dollyDirection=new O,this._mouse=new Ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Og.bind(this),this._onPointerDown=Fg.bind(this),this._onPointerUp=Bg.bind(this),this._onContextMenu=Xg.bind(this),this._onMouseWheel=kg.bind(this),this._onKeyDown=Hg.bind(this),this._onTouchStart=Vg.bind(this),this._onTouchMove=Wg.bind(this),this._onMouseDown=zg.bind(this),this._onMouseMove=Gg.bind(this),this._interceptControlDown=Yg.bind(this),this._interceptControlUp=qg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ae.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nh),this.update(),this.state=Ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;on.copy(e).sub(this.target),on.applyQuaternion(this._quat),this._spherical.setFromVector3(on),this.autoRotate&&this.state===Ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=An:n>Math.PI&&(n-=An),s<-Math.PI?s+=An:s>Math.PI&&(s-=An),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(on.setFromSpherical(this._spherical),on.applyQuaternion(this._quatInverse),e.copy(this.target).add(on),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=on.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=on.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Qr.origin.copy(this.object.position),Qr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qr.direction))<Ng?this.object.lookAt(this.target):(ih.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qr.intersectPlane(ih,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Xa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xa||this._lastTargetPosition.distanceToSquared(this.target)>Xa?(this.dispatchEvent(nh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?An/60*this.autoRotateSpeed*t:An/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){on.setFromMatrixColumn(e,0),on.multiplyScalar(-t),this._panOffset.add(on)}_panUp(t,e){this.screenSpacePanning===!0?on.setFromMatrixColumn(e,1):(on.setFromMatrixColumn(e,0),on.crossVectors(this.object.up,on)),on.multiplyScalar(t),this._panOffset.add(on)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;on.copy(s).sub(this.target);let r=on.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Fg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Og(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Bg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pu),this.state=Ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function zg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ae.DOLLY;break;case hs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}break;case hs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(Vl)}function Gg(i){switch(this.state){case Ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function kg(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ae.NONE||(i.preventDefault(),this.dispatchEvent(Vl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Pu))}function Hg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Vg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1){this.state=Ae.NONE;break}this._handleTouchStartRotate(i),this.state=Ae.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1){this.state=Ae.NONE;break}this._handleTouchStartPan(i),this.state=Ae.TOUCH_PAN;break;default:this.state=Ae.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ae.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ae.TOUCH_DOLLY_ROTATE;break;default:this.state=Ae.NONE}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(Vl)}function Wg(i){switch(this._trackPointer(i),this.state){case Ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ae.NONE}}function Xg(i){this.enabled!==!1&&i.preventDefault()}function Yg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ir=new O;function kn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;ir.copy(t),ir[n]=0,ir.normalize();const l=.5*o/(o+a),u=1-ir.angleTo(i)/c;return Math.sign(ir[e])===1?u*l:a/(o+a)+l+l*(1-u)}class $o extends an{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new O,l=new O,u=new O(t,e,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,v=g.length/6,b=new O,h=.5/o;for(let m=0,x=0;m<g.length;m+=3,x+=2)switch(c.fromArray(g,m),l.copy(c),l.x-=Math.sign(l.x)*h,l.y-=Math.sign(l.y)*h,l.z-=Math.sign(l.z)*h,l.normalize(),g[m+0]=u.x*Math.sign(c.x)+l.x*r,g[m+1]=u.y*Math.sign(c.y)+l.y*r,g[m+2]=u.z*Math.sign(c.z)+l.z*r,f[m+0]=l.x,f[m+1]=l.y,f[m+2]=l.z,Math.floor(m/v)){case 0:b.set(1,0,0),p[x+0]=kn(b,l,"z","y",r,n),p[x+1]=1-kn(b,l,"y","z",r,e);break;case 1:b.set(-1,0,0),p[x+0]=1-kn(b,l,"z","y",r,n),p[x+1]=1-kn(b,l,"y","z",r,e);break;case 2:b.set(0,1,0),p[x+0]=1-kn(b,l,"x","z",r,t),p[x+1]=kn(b,l,"z","x",r,n);break;case 3:b.set(0,-1,0),p[x+0]=1-kn(b,l,"x","z",r,t),p[x+1]=1-kn(b,l,"z","x",r,n);break;case 4:b.set(0,0,1),p[x+0]=1-kn(b,l,"x","y",r,t),p[x+1]=1-kn(b,l,"y","x",r,e);break;case 5:b.set(0,0,-1),p[x+0]=kn(b,l,"x","y",r,t),p[x+1]=1-kn(b,l,"y","x",r,e);break}}static fromJSON(t){return new $o(t.width,t.height,t.depth,t.segments,t.radius)}}function di(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new ln;c.morphTargetsRelative=a;let l=0;for(let u=0;u<i.length;++u){const g=i[u];let f=0,p=0;if(e!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const v in g.attributes){if(!n.has(v))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+v+'" attribute exists among all geometries, or in none of them.'),null;r[v]===void 0&&(r[v]=[]),r[v].push(g.attributes[v]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const v in g.morphAttributes){if(!s.has(v))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[v].length!==i[0].morphAttributes[v].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+v+'" morph attribute.'),null;o[v]===void 0&&(o[v]=[]),o[v].push(g.morphAttributes[v]),p++}if(p!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(t){let v;if(e)v=g.index.count;else if(g.attributes.position!==void 0)v=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,v,u),l+=v}}if(e){let u=0;const g=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let v=0;v<p.count;++v)g.push(p.getX(v)+u);u+=i[f].attributes.position.count}c.setIndex(g)}for(const u in r){const g=sh(r[u]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,g)}for(const u in o){const g=o[u][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<g;++f){const p=[];for(let b=0;b<o[u].length;++b)p.push(o[u][b][f]);const v=sh(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(v)}}}return c}function sh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new wn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const g=c/e;for(let f=0,p=u.count;f<p;f++)for(let v=0;v<e;v++){const b=u.getComponent(f,v);a.setComponent(f+g,v,b)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Zg=128,Kg=8,Jg=-36.75,$g=-28,Qg=10.5,jg=12,t_={w:10,d:8.7,bottom:3.5,top:4.55},e_=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],Ne={capacity:Zg,columns:Kg,startX:Jg,startZ:$g,spacingX:Qg,spacingZ:jg,roof:t_,boxes:e_};function _a(i){return Number.isInteger(i)&&i>=0&&i<Ne.capacity?{slot:i,x:Ne.startX+i%Ne.columns*Ne.spacingX,z:Ne.startZ-Math.floor(i/Ne.columns)*Ne.spacingZ}:null}function n_(i,t=i,e=null,n=Ne.capacity,s=.4,r=!1){const o=[],a=Math.min(i.x,t.x)-s,c=Math.max(i.x,t.x)+s,l=Math.min(i.z,t.z)-s,u=Math.max(i.z,t.z)+s,g=Math.max(0,Math.ceil((a-5.1-Ne.startX)/Ne.spacingX)),f=Math.min(Ne.columns-1,Math.floor((c+5.1-Ne.startX)/Ne.spacingX)),p=Math.max(0,Math.ceil((Ne.startZ-u-5.3)/Ne.spacingZ)),v=Math.min(Math.ceil(Ne.capacity/Ne.columns)-1,Math.floor((Ne.startZ-l+5.3)/Ne.spacingZ));for(let b=p;b<=v;b++)for(let h=g;h<=f;h++){const m=b*Ne.columns+h,x=_a(m);if(!(!x||m>=n)){for(const w of Ne.boxes)w.tag==="home-door"&&m===e||o.push({left:x.x+w.x-w.w/2,right:x.x+w.x+w.w/2,back:x.z+w.z-w.d/2,front:x.z+w.z+w.d/2,top:w.top,tag:w.tag});r&&o.push({left:x.x-Ne.roof.w/2,right:x.x+Ne.roof.w/2,back:x.z-Ne.roof.d/2,front:x.z+Ne.roof.d/2,bottom:Ne.roof.bottom,top:Ne.roof.top,tag:"home-roof"})}}return o}function os(i,t){return!!(t&&i&&(i.y??-.12)<Ne.roof.bottom&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function i_({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new _e,u=new Cn,g=new O(1,1,1),f=new _e().makeScale(0,0,0);let p=null,v=1,b=0,h=null;const m={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function x(S,D,I,N,k,V="inside",X=0){D=m[D]||D;let it=S;it.index&&(it=S.toNonIndexed(),S.dispose()),u.setFromEuler(new si(0,0,X)),it.applyMatrix4(l.compose(new O(I,N,k),u,g));const j=`${V}:${D}`;o.has(j)||o.set(j,{layer:V,color:D,geometries:[]}),o.get(j).geometries.push(it)}const w=(S,D,I,N,k,V,X,it="inside",j=0)=>x(new an(S,D,I),X,N,k,V,it,j),A=(S,D,I,N,k,V)=>x(new qn(S,S,D,10),V,I,N,k);function E(S,D,I,N,k){x(new Wi(S,9,6),k,D,I,N)}w(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),w(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),w(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),w(9.2,.08,7.8,0,.16,0,"#c8a178");for(let S=-4.2;S<4.5;S+=.7)w(.018,.012,7.6,S,.21,0,"#ab8965");w(3,.22,1,0,-.04,4.3,"#d7c5a7"),w(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),w(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),w(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),w(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const S of[-2.7,2.7])w(4,3.45,.18,S,1.9,3.9,"#e7dec9","front");w(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),w(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),w(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const S of[-2.85,2.85]){w(2.35,1.55,.12,S,2.05,4.04,"#71948d","front");for(const D of[-1.2,0,1.2])w(.055,1.65,.14,S+D,2.05,4.12,"#cfbb8c","front");for(const D of[1.23,2.87])w(2.45,.065,.14,S,D,4.12,"#cfbb8c","front");w(.23,.5,.14,S<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const S of[-1,1])w(4.95,.22,8.65,S*2.37,3.98,0,"#47695f","roof",S*-.18),w(4.95,.12,.12,S*2.37,3.96,4.35,"#c1a771","roof",S*-.18);w(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const S of[-2,-.5,1])w(2.25,.06,1.25,2.5,4.08,S,"#29434f","roof",-.18);w(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),w(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),w(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),w(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),w(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),w(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),w(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),A(.05,.35,-3.85,1.05,-2.4,"#bda16a"),A(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),w(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let S=0;S<4;S++)w(1.65,.024,.03,-2.15,2.88+S*.045,-3.55,"#8d9e98");w(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),w(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),w(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const S of[.98,1.91])w(.05,.37,.08,3.29,S,-2.25,"#56746a");w(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),w(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),w(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),A(.035,.3,3.45,1.45,-1.08,"#baa371"),A(.18,.3,2.1,1.43,-.75,"#e8dcc3"),w(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),w(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),w(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),w(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),A(.2,.33,.85,.43,-3.15,"#eee9de"),w(.5,.5,.22,.85,.68,-3.65,"#eee9de"),w(.55,.12,.42,1.5,1,-2.1,"#eee9de"),A(.025,1.65,1.5,1.9,-3.65,"#baa371"),w(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),w(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),w(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const S of[1.55,4.05])w(.23,.57,1,S,.72,2.45,"#a7b3a0");w(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),w(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const S of[.7,1.7])w(.08,.4,.6,S,.48,1.4,"#8c7556");w(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),w(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),w(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),w(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let S=0;S<8;S++)w(.11,.32+S%2*.1,.22,-3.2+S*.17,1.65,3.45,S%2?"#879f93":"#e2ca9e");for(const S of[-4.9,4.9]){w(.08,.7,10,S,.19,.1,"#aa9270");for(const D of[-4.7,0,4.7])w(.13,1,.13,S,.36,D,"#aa9270")}for(const S of[-3.6,3.6])A(.29,.45,S,.14,4.65,"#b58a69"),E(.4,S,.68,4.65,"#78946e");for(const{layer:S,color:D,geometries:I}of o.values()){const N=di(I,!1);I.forEach(V=>V.dispose()),e.add(N);const k=new Pl(N,t(D),128);k.instanceMatrix.setUsage(bl),k.count=0,k.userData.residenceLayer=S,i.add(k),a.push(k)}o.clear();const _=new an(1,1,1);e.add(_);const d=new be(_,t("#b4c5ab"));d.userData.residenceGround=!0,i.add(d);const M=new be(_,t("#e4dcc9"));i.add(M);function R(S){const D=_a(S);return{x:D.x,z:D.z}}function T(){const S=Math.max(b,s.reduce((I,N,k)=>N===null?I:k+1,0));v=Math.max(1,Math.ceil(S/8));for(const I of a){I.count=S;for(let N=0;N<S;N++){const k=s[N],V=R(N);h!==null&&k!==h||k===null&&N>=b||k!==null&&k===(h??p)&&["roof","front"].includes(I.userData.residenceLayer)?I.setMatrixAt(N,f):I.userData.residenceLayer==="door"?I.setMatrixAt(N,l.compose(new O(V.x-.65,0,V.z+3.99),new Cn().setFromAxisAngle(new O(0,1,0),c.has(k)?-Math.PI/2:0),g)):I.setMatrixAt(N,l.compose(new O(V.x,0,V.z),new Cn,g))}I.instanceMatrix.needsUpdate=!0,I.computeBoundingSphere()}const D=v*12+4;d.scale.set(86,.3,D),d.position.set(0,-.55,-20-D/2),M.scale.set(1.5,.04,D),M.position.set(0,-.12,-20-D/2),d.visible=M.visible=S>0&&h===null}return{meshes:a,interior(S){h=r.has(S)?S:null,T()},slotFor:S=>r.get(S),setPlots(S){b=Math.min(128,Math.max(0,Number(S)||0)),T()},sync(S){const D=new Set(S.slice(0,128).map(I=>I.id));for(const[I,N]of r)D.has(I)||(s[N]=null,r.delete(I));for(const I of S.slice(0,128)){const N=I.home_slot;Number.isInteger(N)&&N>=0&&N<128&&r.get(I.id)!==N&&(r.has(I.id)&&(s[r.get(I.id)]=null),r.delete(I.id))}for(const I of S.slice(0,128)){const N=I.home_slot;Number.isInteger(N)&&N>=0&&N<128&&s[N]===null&&(s[N]=I.id,r.set(I.id,N))}for(const I of[...D].sort((N,k)=>N-k))if(!r.has(I)){const N=s.indexOf(null);s[N]=I,r.set(I,N)}r.has(p)||(p=null),T()},select(S){p=r.has(S)?S:null,T()},setDoor(S,D){D?c.add(S):c.delete(S),T()},location(S){const D=r.get(S);return D===void 0?null:R(D)},bed(S){const D=this.location(S);return D?[D.x-2.05,.92,D.z-.5]:null},cameraBoxes(S){const D=this.location(S);if(!D)return[];const I=(k,V,X,it,j)=>({left:D.x+k-X/2,right:D.x+k+X/2,back:D.z+V-it/2,front:D.z+V+it/2,top:j}),N=[I(-4.6,0,.18,7.8,3.6),I(0,-3.9,9.4,.18,3.6),I(3.65,-2.78,1.05,.92,2.3),I(2.95,-.75,2.62,.95,1.3),I(2.8,2.45,2.6,1.2,1.3)];return S!==p&&N.push(I(4.6,0,.18,7.8,3.6),I(0,3.9,9.4,.18,3.6)),N},personForHit(S){return S?.object?.userData?.residenceLayer&&Number.isInteger(S.instanceId)?s[S.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-v*12,front:-20}},dispose(){a.forEach(S=>{S.dispose(),i.remove(S)}),i.remove(d,M),r.clear(),s.fill(null)}}}const s_={minX:-100,maxX:100,minZ:-216,maxZ:92},r_={x:0,y:-.12,z:20},o_={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20},armory:{x:52,z:35,radius:5}},hi={bounds:s_,spawn:r_,venues:o_};function a_(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=hi.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,u=!1,g=null,f=128;const p=(_,d=_,M=.3,R=!1)=>u?n_(_,d,g,f,Math.max(.4,M),R):[],v=_=>_.top<=Nn.vault_height&&Nn.vault_tags.includes(_.tag);function b(_,d,M=-.12,R=o,T=!1){return _>=t+R&&_<=e-R&&d>=n+R&&d<=s-R&&!i.concat(p({x:_,z:d},{x:_,z:d},R,T)).some(S=>!((v(S)||T)&&M>=S.top+.075||S.bottom!==void 0&&M+1.8<=S.bottom-.075)&&_>S.left-R&&_<S.right+R&&d>S.back-R&&d<S.front+R)}function h(_,d,M=o,R=!1){if(!b(d.x,d.z,d.y??-.12,M,R))return!1;for(const T of i.concat(p(_,d,M,R))){let S=0,D=1;for(const[I,N,k]of[["x",T.left-M,T.right+M],["z",T.back-M,T.front+M]]){const V=d[I]-_[I];if(Math.abs(V)<1e-8){if(_[I]<=N||_[I]>=k){S=2;break}}else{const X=(N-_[I])/V,it=(k-_[I])/V;S=Math.max(S,Math.min(X,it)),D=Math.min(D,Math.max(X,it))}}if(S<=D&&D>0&&S<1){const I=_.y??-.12,N=d.y??-.12,k=I+(N-I)*Math.max(0,S),V=I+(N-I)*Math.min(1,D);if((v(T)||R)&&Math.min(k,V)>=T.top+.075||T.bottom!==void 0&&Math.max(k,V)+1.8<=T.bottom-.075)continue;return!1}}return!0}function m(){if(!l){l=new Uint8Array(a*c).fill(1);for(let _=0;_<c;_++)for(let d=0;d<a;d++)(d===0||_===0||d===a-1||_===c-1)&&(l[_*a+d]=0);for(const _ of i.concat(p({x:t,z:n},{x:e,z:s}))){const d=Math.max(0,Math.ceil((_.left-.4-t)/r)),M=Math.min(a-1,Math.floor((_.right+.4-t)/r)),R=Math.max(0,Math.ceil((_.back-.4-n)/r)),T=Math.min(c-1,Math.floor((_.front+.4-n)/r));for(let S=R;S<=T;S++)for(let D=d;D<=M;D++)l[S*a+D]=0}}}function x(_,d,M){const R=d.x-_.x,T=d.z-_.z,S=R*R+T*T;return M.every(D=>{const I=S?Math.max(0,Math.min(1,((D.x-_.x)*R+(D.z-_.z)*T)/S)):0;return Math.hypot(_.x+R*I-D.x,_.z+T*I-D.z)>=.62})}function w(_,d=null,M=[]){m();const R=Math.round((_.x-t)/r),T=Math.round((_.z-n)/r);let S=-1,D=1/0;for(let I=-6;I<=6;I++)for(let N=-6;N<=6;N++){const k=R+N,V=T+I,X=V*a+k;if(k<0||V<0||k>=a||V>=c||!(d||l)[X])continue;const it=(t+k*r-_.x)**2+(n+V*r-_.z)**2;b(_.x,_.z)&&!h(_,{x:t+k*r,z:n+V*r})||x(_,{x:t+k*r,z:n+V*r},M)&&it<D&&(S=X,D=it)}return S}function A(_){return{x:t+_%a*r,z:n+Math.floor(_/a)*r}}function E(_,d,M=[]){if(h(_,d)&&x(_,d,M))return[{x:d.x,z:d.z}];m();const R=M.length?l.slice():l;for(const $ of M){const lt=Math.round(($.x-t)/r),mt=Math.round(($.z-n)/r);for(let Rt=-2;Rt<=2;Rt++)for(let et=-2;et<=2;et++){const ut=lt+et,Pt=mt+Rt;ut>=0&&Pt>=0&&ut<a&&Pt<c&&Math.hypot(t+ut*r-$.x,n+Pt*r-$.z)<.76&&(R[Pt*a+ut]=0)}}const T=w(_,R,M),S=w(d,R,M);if(T<0||S<0)return[];const D=[],I=new Float64Array(a*c).fill(1/0),N=new Int32Array(a*c).fill(-1),k=new Uint8Array(a*c),V=$=>Math.abs($%a-S%a)+Math.abs(Math.floor($/a)-Math.floor(S/a));function X($,lt){D.push({index:$,score:lt});let mt=D.length-1;for(;mt>0;){const Rt=mt-1>>1;if(D[Rt].score<=lt)break;[D[mt],D[Rt]]=[D[Rt],D[mt]],mt=Rt}}function it(){const $=D[0],lt=D.pop();if(D.length){D[0]=lt;let mt=0;for(;;){let Rt=mt,et=mt*2+1,ut=et+1;if(et<D.length&&D[et].score<D[Rt].score&&(Rt=et),ut<D.length&&D[ut].score<D[Rt].score&&(Rt=ut),Rt===mt)break;[D[mt],D[Rt]]=[D[Rt],D[mt]],mt=Rt}}return $.index}I[T]=0,X(T,V(T));let j=0;for(;D.length&&j++<a*c;){const $=it();if(k[$])continue;if(k[$]=1,$===S){const Rt=[];let et=$;for(;et!==T;)Rt.push(A(et)),et=N[et];return Rt.reverse(),b(d.x,d.z)&&h(Rt.at(-1)||A(T),d)&&x(Rt.at(-1)||A(T),d,M)&&Rt.push({x:d.x,z:d.z}),b(_.x,_.z)&&Rt.unshift(A(T)),Rt}const lt=$%a,mt=Math.floor($/a);for(const[Rt,et]of[[1,0],[-1,0],[0,1],[0,-1]]){const ut=lt+Rt,Pt=mt+et,At=Pt*a+ut;if(ut<0||Pt<0||ut>=a||Pt>=c||!R[At]||k[At]||!h(A($),A(At))||!x(A($),A(At),M))continue;const Tt=I[$]+1;Tt<I[At]&&(I[At]=Tt,N[At]=$,X(At,Tt+V(At)))}}return[]}return{configureHomes(_,d=null,M=f){u===!!_&&d===g&&M===f||(u=!!_,g=d,f=M,l=null)},withHomeAccess(_,d){if(!u||_===void 0||_===g)return d();const M=g,R=l;g=_,l=null;try{return d()}finally{g=M,l=R}},groundHeight(_,d=!1,M=o){const R=Math.round((_.x+36.75)/10.5),T=Math.round((-28-_.z)/12);let S=u&&R>=0&&R<8&&T>=0&&T*8+R<f&&os({..._,y:-.12},_a(T*8+R))?.22:-.12;for(const D of i.concat(p(_,_,M,d)))(v(D)||d)&&(_.y??-.12)>=D.top+.07&&_.x>D.left-M&&_.x<D.right+M&&_.z>D.back-M&&_.z<D.front+M&&(S=Math.max(S,D.top+.08));return S},boxes:()=>i.map(_=>({..._})),slide(_,d,M=o,R=!1){const T={...d,y:d.y??_.y};return h(_,T,M,R)?{x:d.x,z:d.z}:h(_,{...T,z:_.z},M,R)?{x:d.x,z:_.z}:h(_,{...T,x:_.x},M,R)?{x:_.x,z:d.z}:{x:_.x,z:_.z}},addBox(_,d,M,R,T="",S=2){i.push({left:M-_/2,right:M+_/2,back:R-d/2,front:R+d/2,top:S,tag:T}),l=null},rayLimit(_,d){let M=1;for(const R of i.concat(p(_,d,.02,!0))){let T=0,S=1;for(const[D,I,N]of[["x",R.left-.02,R.right+.02],["z",R.back-.02,R.front+.02],["y",R.bottom??-.3,R.top+.02]]){const k=d[D]-_[D];if(Math.abs(k)<1e-8){if(_[D]<I||_[D]>N){T=2;break}}else{const V=(I-_[D])/k,X=(N-_[D])/k;T=Math.max(T,Math.min(V,X)),S=Math.min(S,Math.max(V,X))}}T<=S&&T>=0&&T<M&&(M=Math.max(0,T-.001))}return d.y<-.12&&_.y>-.12&&(M=Math.min(M,(-.12-_.y)/(d.y-_.y))),M},cameraLimit(_,d,M=[]){let R=1;for(const T of i.concat(M)){let S=0,D=1;for(const[I,N,k]of[["x",T.left-.15,T.right+.15],["z",T.back-.15,T.front+.15],["y",-.3,T.top+.15]]){const V=d[I]-_[I];if(Math.abs(V)<1e-8){if(_[I]<N||_[I]>k){S=2;break}}else{const X=(N-_[I])/V,it=(k-_[I])/V;S=Math.max(S,Math.min(X,it)),D=Math.min(D,Math.max(X,it))}}S<=D&&S>.01&&S<R&&(R=Math.max(.02,S-.015))}return R},free:b,segment:h,path:E,nearest(_){const d=w(_);return d<0?null:A(d)},move(_,d,M){const R=Math.hypot(d.x-_.x,d.z-_.z),T=R>0?Math.min(1,M/R):0,S={x:_.x+(d.x-_.x)*T,z:_.z+(d.z-_.z)*T};return h(_,S)?S:{x:_.x,z:_.z}}}}function l_({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new Un;i.add(a);const c=Et=>(t.add(Et),Et);function l(Et,Yt){const jt=new Vs(Yt);return e.set("environment:"+Et,jt),jt}const u=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),f=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),p=l("forest",{color:"#4c7262",roughness:1}),v=new be(c(new Fi(850,850)),u);v.rotation.x=-Math.PI/2,v.position.y=-1.3,a.add(v);const b=[],h=[],m=[],x=new _e,w=new Cn;function A(Et,Yt,jt,Jt,Me,Ee=1,We=1,Re=1){const $e=Et.index?Et.toNonIndexed():Et;$e!==Et&&Et.dispose(),$e.applyMatrix4(x.compose(new O(jt,Jt,Me),w,new O(Ee,We,Re))),Yt.push($e)}for(let Et=0;Et<20;Et++){const Yt=Et/20*Math.PI*2,jt=Math.cos(Yt)*(155+Et%3*18),Jt=-70+Math.sin(Yt)*230,Me=35+Et%5*13,Ee=25+Et%4*9;A(new gi(Ee,Me,7),b,jt,Me/2-1.3,Jt,1.2,1,1),A(new gi(Ee*.28,Me*.28,7),h,jt,Me*.86-1.25,Jt,1.2,1,1)}for(let Et=0;Et<100;Et++){const Yt=Et%2?-1:1,jt=Yt*(51+Et%9*4),Jt=-210+Math.floor(Et/2)*5.4,Me=3.5+Et%4;A(new gi(1.3+Et%3*.25,Me,6),m,jt,Me/2-.8,Jt),Jt>=-22&&Jt<=92&&o?.addBox(2.6,2.6,jt,Jt,"forest-tree",Me)}function E(Et,Yt){const jt=c(di(Et,!1));Et.forEach(Me=>Me.dispose());const Jt=new be(jt,Yt);return a.add(Jt),Jt}const _=E(b,g),d=E(h,f),M=E(m,p),R=[];for(let Et=0;Et<14;Et++)for(let Yt=0;Yt<4;Yt++)A(new Wi(1,9,6),R,-100+Et%7*32+(Yt-1.5)*4,29+Et%4*4+Yt%2*1.5,-120+Math.floor(Et/7)*165,7,3.2,4.8);const T=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),S=E(R,T),D=6e3,I=new Float32Array(D*3),N=new Float32Array(D*6),k=[];for(let Et=0;Et<D;Et++)k.push({x:Et*73.31%64-32,y:Et*17.73%32,z:Et*41.71%70-35});const V=c(new ln);V.setAttribute("position",new wn(I,3)),V.setDrawRange(0,320);const X=new Dl({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",X);const it=new Qh(V,X);it.frustumCulled=!1,a.add(it);const j=c(new ln);j.setAttribute("position",new wn(N,3));const $=new Ll({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",$);const lt=new $h(j,$);lt.frustumCulled=!1,a.add(lt);const mt=c(new Fi(260,24,48,4)),Rt=new Float32Array(mt.attributes.position.count*3);for(let Et=0;Et<mt.attributes.position.count;Et++)new oe().setHSL(.38+Et%49/49*.34,.75,.62).toArray(Rt,Et*3);mt.setAttribute("color",new wn(Rt,3));const et=new fi({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:xn,blending:gr});e.set("environment:aurora",et);const ut=new be(mt,et);ut.position.set(0,55,-235),a.add(ut);const Pt=mt.attributes.position.array.slice();let At={},Tt=0,Xt="",Ue="",qt=!1,ae=-60;const st={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function Ot(Et){const Yt=zu(At,Date.now()+Tt).mode;if(Yt===Xt&&Ue===`${At.landscape}:${Et}`)return;Xt=Yt,Ue=`${At.landscape}:${Et}`;const jt=st[At.landscape]||st.alps;u.color.set(jt[0]),g.color.set(jt[1]),p.color.set(jt[2]);const Jt=Yt==="aurora";i.background=new oe(Jt?"#102339":Et?"#142730":Yt==="rain"?"#a6babd":Yt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new ha(i.background,Yt==="mist"?.007:Yt==="rain"?.0035:.0013),n.intensity=Jt?.6:Yt==="rain"?1.35:Et?1.65:2.7,s.intensity=Jt?1.6:Et?2.05:2.6,r.intensity=Jt?1.8:1.1,T.color.set(Yt==="rain"?"#859c9f":"#f5f2e9"),X.color.set("#ffffff"),X.size=.13}return{configure(Et={},Yt=!1){At=Et.settings||{},Number.isFinite(Et.server_ms)&&(Tt=Et.server_ms-Date.now()),qt=Yt,_.visible=d.visible=At.mountains!==!1,S.visible=At.clouds!==!1;const jt=At.precipitation||"heavy",Jt=qt?900:jt==="light"?650:jt==="storm"?5800:3600;V.setDrawRange(0,Jt),j.setDrawRange(0,Jt*2),Ue=""},update(Et,{paused:Yt=!1,dark:jt=!1,center:Jt=null}={}){Ot(jt);const Me=Xt,Ee=Yt?0:Et/1e3;if(S.position.x=Yt?0:Math.sin(Ee*.012)*9,it.visible=Me==="snow",lt.visible=Me==="rain",ut.visible=Me==="aurora",it.visible||lt.visible){const We=V.drawRange.count,Re=Jt?.x||0,$e=Jt?.z||0;for(let H=0;H<We;H++){const le=k[H],te=le.x+Re+Math.sin(Ee*.4+H)*(Me==="snow"?.55:.1),xe=(le.y-Ee*(Me==="snow"?1.4:20)%32+32)%32,Mt=le.z+$e;if(Me==="snow")I[H*3]=te,I[H*3+1]=xe,I[H*3+2]=Mt;else{const Ce=H*6;N[Ce]=te,N[Ce+1]=xe,N[Ce+2]=Mt,N[Ce+3]=te+.1,N[Ce+4]=xe-.9,N[Ce+5]=Mt}}(Me==="snow"?V:j).attributes.position.needsUpdate=!0}if(ut.visible){const We=mt.attributes.position.array;for(let Re=0;Re<We.length;Re+=3)We[Re+1]=Pt[Re+1]+Math.sin(Pt[Re]*.035+Ee*.3)*5,We[Re+2]=Math.cos(Pt[Re]*.02+Ee*.17)*9;mt.attributes.position.needsUpdate=!0}},extent(Et){Et!==ae&&(ae=Et,M.scale.z=Math.max(1,Math.abs(Et)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function c_({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let E=-40;E<=-20;E+=2)for(let _=43;_<=59;_+=2)t(1.98,.025,1.98,E,-.18,_,(E+_)/2%2?"#e8dfcb":"#d1c6ac",0);for(const E of[-41.3,-18.7])t(.15,.09,20,E,-.1,51,"gold",0),t(.35,1.4,19.8,E,.45,51,"deep"),a.addBox(.35,19.8,E,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const E of[-40,-20])for(const _ of[42.5,50.5,59.5])e(.35,.25,E,-.03,_,"gold"),e(.2,4.7,E,2.3,_,"white"),e(.38,.22,E,4.7,_,"gold"),a.addBox(.75,.75,E,_,"grand-bar-column",4.9);for(const E of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,E,"gold");for(const _ of[-36,-24]){const d=new Ni(2,.075,6,24,Math.PI);s(d,"gold",_,3.4,E)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const E of[41.65,42.3])t(15,.14,.7,-30,1.5+(E-41.65)*2,E,"wood");for(let E=0;E<14;E++){const _=-36.5+E;e(.11,.55,_,1.87,41.8,E%2?"#87b6a5":"#b89c68"),e(.04,.14,_,2.22,41.8,"gold")}for(const E of[-37,-34,-31,-28,-25,-22])e(.37,.16,E,.57,47.4,"deep"),e(.065,.8,E,.08,47.4,"gold"),e(.28,.06,E,-.12,47.4,"gold"),a.addBox(.75,.75,E,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[E,_,d]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,E,4.8,_,"gold"),s(new Ni(d,.035,6,28),"gold",E,4,_,Math.PI/2);for(let M=0;M<12;M++){const R=M*Math.PI/6,T=E+Math.cos(R)*d,S=_+Math.sin(R)*d;e(.014,.46,T,3.75,S,"gold"),n(.09,.19,.09,T,3.47,S,"white")}}for(const E of[-38,-22])t(2.1,.65,5.1,E,.15,54,"#856c8c",.18),t(.3,1,5.2,E+(E<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,E,54,"velvet-booth",1.3),e(.68,.12,E+(E<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,E+(E<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,E+(E<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const u=["#87668e","#508a87","#b99c68","#5c708c"];for(let E=0;E<8;E++)for(let _=0;_<6;_++)t(1.04,.025,1.02,-33.7+E*1.06,.035,53.4+_*1.06,u[(E+_)%4],.015);for(const E of[-34.5,-25.5])t(.04,.06,6.6,E,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const E of[-31.4,-28.6])e(.57,.08,E,1.24,51.1,"black"),e(.15,.1,E,1.3,51.1,"gold");for(let E=0;E<6;E++)t(.1,.09,.22,-30.65+E*.25,1.26,51.3,"white",.01);for(const E of[-34.5,-25.5]){t(1,2.3,.8,E,1,51,"black");for(const _ of[.45,1.35]){const d=new qn(.31,.31,.05,12);s(d,"metal",E,_,51.43,Math.PI/2)}a.addBox(1,.8,E,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new Vs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const f=new da(.62,2);c.add(f);const p=new be(f,g);p.position.set(-30,4.6,56),i.add(p);const v=new fi({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:xn,blending:gr});l.set("rivage-beams",v);const b=new gi(1.5,3.4,10,1,!0);c.add(b);const h=[];for(const E of[-33,-27])for(const _ of[54,58]){const d=new be(b,v);d.position.set(E,2,_),d.userData.rivageEffect="beam",i.add(d),h.push(d)}const m=[],x=new fi({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",x);for(const[E,_,d,M,R,T,S]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const D=new an(_,d,M);c.add(D);const I=new be(D,x);I.position.set(R,T,S),I.userData.officeVenue=E,i.add(I),m.push(I)}const w=u.map(E=>{const _=o(E);return _.emissive.set(E),_});let A=!0;return{targets:m,setEnabled(E){A=!!E},update(E,{paused:_,energySaver:d}){_||(p.rotation.y=E/18e3);const M=_||d||!A;for(const R of h)R.visible=!M;for(let R=0;R<w.length;R++)w[R].emissiveIntensity=M?.13:.2+Math.sin(E/4500+R)*.05}}}function h_(i,t=hi.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1,c=!!t.air_access,l=t.y??-.12;const u=(p,v,b)=>Math.max(v,Math.min(b,p));function g(p,v={},b=0,h=[]){const m=u(Number(p)||0,0,.05);let x=Number(v.x)||0,w=Number(v.z)||0;r&&Date.now()>=o&&f(null);const A=Math.hypot(x,w);A>1&&(x/=A,w/=A),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const E=!!(v.boost&&A&&s),_=E?9:4.5;e.stamina=u(e.stamina+(E?-23:14)*m,0,100);const d=(Math.cos(b)*x-Math.sin(b)*w)*_,M=(-Math.sin(b)*x-Math.cos(b)*w)*_;e.vx=d,e.vz=M;const R=i.groundHeight?.(e,c,r?.radius||.3)??-.12;e.grounded&&(l=R),e.grounded&&e.y>R+.08&&(e.grounded=!1),!e.flight&&!a&&v.jump&&!n&&(e.grounded||e.jumps<Nn.maximum_jumps)&&(e.vy=Nn.jump_speed,e.grounded=!1,e.jumps++),n=!!v.jump;const T=e.y;if(e.flight)e.vy=(+!!v.jump-+!!v.descend)*Nn.flight_speed,e.y=u(e.y+e.vy*m,R,Nn.flight_maximum_y),e.grounded=!1;else if(a)e.y=Math.max(R,e.y-Nn.landing_speed*m),e.vy=-4,e.y<=R&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0);else if(e.grounded)e.y=R;else{e.vy-=Nn.gravity*m;const I=c?Math.min(Nn.flight_maximum_y,Math.max(Nn.maximum_y,l+Nn.maximum_y+.12)):Nn.maximum_y;e.y=e.vy>0?Math.min(I,e.y+e.vy*m):e.y+e.vy*m,e.y<=R&&(e.y=R,e.vy=0,e.grounded=!0,e.jumps=0)}let S=i.slide({...e,y:Math.min(T,e.y)},{x:e.x+d*m,y:e.y,z:e.z+M*m},r?.radius||.3,c);h.some(I=>e.y<(I.y??-.12)+1.8&&e.y+(r?.height||1.8)>(I.y??-.12)&&Math.hypot(S.x-I.x,S.z-I.z)<.62&&Math.hypot(S.x-I.x,S.z-I.z)<=Math.hypot(e.x-I.x,e.z-I.z)+1e-4)&&(S={x:e.x,z:e.z});const D=Math.hypot(S.x-e.x,S.z-e.z)>1e-4;if(e.x=S.x,e.z=S.z,c&&e.grounded){const I=i.groundHeight?.(e,!0,r?.radius||.3)??-.12;e.y>I+.08?e.grounded=!1:!e.flight&&e.y<=(i.groundHeight?.(e,!1)??-.12)+.12&&(c=!1)}return e.air_access=c,D&&(e.yaw=Math.atan2(d,M)),e.action=e.flight?"fly":a?"land":e.grounded?D?E?"run":"walk":"idle":"jump",{...e}}function f(p,v=1/0){!p&&e.flight&&(e.flight=!1,a=!e.grounded),r=p,o=v}return{step:g,setForm:f,toggleFlight(){return r?.fly?(e.flight=!e.flight,e.flight&&(c=!0),a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e,air_access:c}),reset(p){c=!!(p.air_access??c);const v=i.groundHeight?.(p,c,r?.radius||.3)??-.12;e={...e,...p,vx:0,vz:0,vy:0,jumps:0,grounded:(p.y??-.12)<=v+.01},l=v,a=!e.flight&&!e.grounded&&e.y>Nn.maximum_y},face(p){e.yaw=Math.atan2(p.x-e.x,p.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function jr(i,t){const e=hi.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function rh(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(h,m,x,w,A,E=0){E&&h.rotateZ(E),h.translate(x,w,A);const _=h.index?h.toNonIndexed():h;_!==h&&h.dispose();const d=new oe(m),M=new Float32Array(_.attributes.position.count*3);for(let R=0;R<M.length;R+=3)M[R]=d.r,M[R+1]=d.g,M[R+2]=d.b;_.setAttribute("color",new wn(M,3)),r.push(_)}const a=(h,m,x,w,A,E,_,d=0)=>o(new an(h,m,x),w,A,E,_,d),c=(h,m,x,w,A,E,_=h)=>o(new qn(_,h,m,10),x,w,A,E),{accent:l,hair:u,motif:g,accessory:f,hairStyle:p,shirt:v}=i;if(t==="head"){if(a(.49,.16,.45,u,0,.23,-.02),a(.45,p==="long"?.72:.29,.13,u,0,p==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(p))for(const h of[-1,1])a(.09,p==="long"?.6:.33,.32,u,h*.24,-.02,-.03);if(p==="spiky")for(let h=0;h<7;h++)o(new gi(.11,.27+h%3*.06,5),u,(h-3)*.066,.39+Math.sin(h)*.025,-.06,(h-3)*-.16);if(p==="split"&&a(.245,.18,.46,l,.123,.24,-.015),p==="side"&&a(.26,.25,.05,u,-.12,.08,.218,-.18),p==="ponytail"&&a(.27,.5,.25,u,0,-.15,-.37),f.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),f==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),f==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,v,0,.395,0)),f==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const h of[-1,1])a(.06,.33,.06,"#94745a",h*.3,.64,0,h*-.3),a(.15,.055,.06,"#94745a",h*.36,.72,0)}if(f==="bamboo"){const h=new qn(.052,.052,.35,10);h.rotateZ(Math.PI/2),o(h,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(f==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),f==="goggles"||f==="glasses")for(const h of[-1,1])a(.19,.12,.06,l,h*.12,f==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",h*.12,f==="goggles"?.23:.04,.271);if(f==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const h of[-1,1])a(.12,.2,.08,"#aba2a6",h*.2,.31,0,h*-.35),a(.06,.055,.025,"#84aabb",h*.14,.07,.208)}if(f==="butterfly")for(const h of[-1,1])a(.18,.17,.045,l,h*.15,.31,-.12,h*.4);if(f==="earrings")for(const h of[-1,1])a(.045,.15,.035,"#e9d6bc",h*.26,-.19,.02);if(i.id==="naruto")for(const h of[-1,1])for(let m=0;m<3;m++)a(.08,.012,.01,"#9f7055",h*.15,-.055-m*.033,.208,h*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){a(.028,.53,.035,l,0,1.23,.19);for(const h of[-1,1])a(.14,.37,.04,l,h*.14,1.26,.19,h*.08);if(g==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let h=0;h<3;h++)a(.03,.03,.035,"#eee2ba",0,1.13+h*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let h=0;h<4;h++)for(let m=0;m<4;m++){const x=(m-1.5)*.112,w=1+h*.13;g==="checks"&&(h+m)%2===0&&a(.11,.127,.025,l,x,w,.19),g==="triangles"&&(h+m)%2===0&&o(new gi(.035,.065,3),l,x,w,.205),g==="clouds"&&h%2===0&&m%2===0&&(a(.13,.045,.03,l,x,w,.2),c(.04,.03,l,x,w+.035,.2))}if(g==="circle"&&o(new Ni(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let h=0;h<3;h++)a(.32,.015,.02,"#b6a273",0,1.19+h*.07,.26)}else if(g==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const h of[-1,1])a(.12,.51,.07,l,h*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const h of[-1,1])a(.065,.52,.04,l,h*.1,1.23,.2,h*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(f))for(let h=0;h<(f==="swords"?3:1);h++){const m=.3+h*.06;a(.055,.83,.055,"#373d4a",m,.92,-.18,-.25),a(.09,.23,.07,l,m+.1,1.4,-.18,-.25)}if(f==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(f))for(const h of[-1,1])a(f==="gauntlets"?.27:.2,.2,.24,l,h*.37,.99,.05)}const b=di(r,!1);return r.forEach(h=>h.dispose()),n.add(b),e.set(s,b),b}function ls(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function Lu(i,t,e,n){const s=t.clone().sub(i);return(!Number.isFinite(s.lengthSq())||s.lengthSq()<.001)&&s.set(4,3,5),(s.length()<e||s.length()>n)&&s.clampLength(e,n),s}function u_(i,t,e,n=[],s=3.6,r=35){const o=Lu(t,e,s,r),a=o.length(),c=Vn.clamp(i.cameraLimit(t,t.clone().add(o),n),0,1);return c>=1?t.clone().add(o):t.clone().add(o.setLength(Math.max(s,a*c)))}function f_(){let i=0,t=0,e=0;return{reset(){i=t=e=0},resolve(n,s,r,o=[],a=3.6,c=35,l=1/30){const u=Vn.clamp(Number(l)||.03333333333333333,.001,.06),g=Lu(s,r,a,c),f=g.length();let p=f-u_(n,s,r,o,a,c).distanceTo(s);p>.01?(t=p,e=0):t>0&&(e+=u,e<.2?p=t:t=0);const v=(p-i)*(1-Math.exp(-u*9));return i+=Vn.clamp(v,-8*u,8*u),i=Vn.clamp(i,0,Math.max(0,f-a)),s.clone().add(i>1e-6?g.setLength(f-i):g)}}}function d_({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new Vs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,u,g,f,p]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"],["KAIA",52,32.9,!0,"armorer","#375976"]]){let h=function(w,A,E,_,d,M,R){let T=new an(w,A,E).toNonIndexed();T.translate(_,d,M);const S=new oe(R),D=new Float32Array(T.attributes.position.count*3);for(let I=0;I<D.length;I+=3)S.toArray(D,I);T.setAttribute("color",new wn(D,3)),b.push(T)};const v=new Un;v.position.set(l,-.12,u),v.userData.hospitality=f,i.add(v);const b=[];if(h(.49,.66,.32,0,1.15,0,p),h(.41,.45,.4,0,1.7,0,"#e4b492"),h(.46,.16,.45,0,1.96,-.02,g?"#51352e":"#29272d"),h(.46,g?.65:.27,.13,0,g?1.66:1.82,-.21,g?"#51352e":"#29272d"),g){for(const w of[-1,1])h(.07,.43,.29,w*.23,1.74,-.03,"#51352e"),h(.05,.025,.02,w*.13,1.65,.209,"#cf8790");h(.58,.3,.38,0,.81,0,p)}for(const w of[-1,1])h(.035,.04,.025,w*.1,1.73,.207,"#253b36"),h(.18,.65,.2,w*.14,.45,0,"#263e39"),h(.22,.13,.33,w*.14,.08,.06,"#1c2b28"),h(.16,.4,.2,w*.33,1.2,0,p),h(.15,.26,.16,w*.33,.9,.04,"#e4b492");h(.09,.025,.025,0,1.58,.21,"#b66c78"),(f==="hostess"||f==="bartender")&&(h(.3,.49,.035,0,1.02,.18,g?"#c6a971":"#253e38"),h(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),h(.1,.07,.04,0,1.44,.19,"#374941"),h(.45,.04,.3,.36,.89,.17,"#c5ab71"),h(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const m=di(b,!1);b.forEach(w=>w.dispose()),e.add(m);const x=new be(m,r);x.userData.officeVenue=f==="armorer"?"armory":f==="dj"?"disco":"bar",v.add(x),a.push(x),o.push(v),t.addBox(.68,.68,l,u,"hospitality-npc",2.1),f==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,u)}return{targets:a,update(c,l){o.forEach((u,g)=>{u.rotation.y=g<2?Math.sin((l?0:c)/4500+g)*.1:0,u.children[0].position.y=l?0:Math.sin(c/1800+g)*.018})}}}const ci=(i,t,e)=>i+(t-i)*e;function p_(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),u=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let g=r?o?.16:.06:0,f=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const p=[u,-u],v=[-u*.85,u*.85],b=[0,0],h=i.officeAnimation??={airborne:!1,landing:0};if(t?.action==="jump"){const x=Math.max(-1,Math.min(1,(t.vy??0)/7)),w=Math.max(0,x),A=Math.max(0,-x);g=-.1+A*.12,p[0]=.18+w*.4,p[1]=.24+w*.28,v[0]=-.65-w*.2,v[1]=-.6-A*.18,f=0,h.airborne=!0,h.landing=0}else h.airborne&&(h.airborne=!1,t?.grounded!==!1&&!["fly","land","rest"].includes(t?.action)&&(h.landing=.18));if(h.landing>0&&(h.landing=Math.max(0,h.landing-n),!a&&!s)){const x=Math.sin(h.landing/.18*Math.PI);f-=x*.09,g+=x*.06}t?.action==="fly"&&(g=.16,p.fill(.3),v.fill(.15),b[0]=-.12,b[1]=.12,f=0),t?.action==="land"&&(g=-.06,p.fill(.35),v.fill(-.3),f=0),a&&(g=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,f=c?.4:-.5,p.fill(c?0:-1.25),v.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(b[0]=-.3,b[1]=.3),s||(f+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(v[1]=-.8+(s?0:Math.sin(e*3)*.45),v[0]=-.3,g=.07),t?.action==="cast"&&(v[0]=t.skillPose==="beam"?-1.25:-.9,v[1]=-1.4,p[0]=-.12,p[1]=.2,g=.12),t?.action==="drink"&&(v[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(v[0]=-1),t?.action==="dance"&&(v[0]=-.8,v[1]=-.7,p[0]=s?0:Math.sin(e*2.4)*.2,p[1]=-p[0]),i.body.rotation.x=ci(i.body.rotation.x,g,l),i.body.position.y=ci(i.body.position.y,f,l),i.body.rotation.z=ci(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((x,w)=>{x.rotation.x=ci(x.rotation.x,p[w],l),x.rotation.z=ci(x.rotation.z,b[w],l)}),i.arms.forEach((x,w)=>{x.rotation.x=ci(x.rotation.x,v[w],l),x.rotation.z=ci(x.rotation.z,o?w?-.12:.12:0,l)}),i.head.rotation.x=ci(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=ci(i.head.rotation.y,0,l);const m=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(x=>x.scale.y=ci(x.scale.y,m,l)),{lying:c,moving:r}}function m_(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(u=>Math.hypot(u.x-c,u.z-l)>.65)})))return s}return null}function oh(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(f=>Math.hypot(f.x-a.x,f.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,u=c*c+l*l;if(u&&n.some(f=>{const p=Math.max(0,Math.min(1,((f.x-t.x)*c+(f.z-t.z)*l)/u));return Math.hypot(t.x+c*p-f.x,t.z+l*p-f.z)<.62&&p>0}))continue;const g=s?m_(i,a,n):t.yaw||0;if(g!==null)return{...a,yaw:g}}return null}function g_(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function u(E,_=!1){const d=E+_;return o.has(d)||o.set(d,new i.MeshStandardMaterial({color:E,emissive:E,emissiveIntensity:_?.55:.13,roughness:.55,metalness:.18,transparent:_,opacity:_?.78:1,depthWrite:!_})),o.get(d)}function g(E,_,d,M,R,T,S=!1){r.add(_);const D=new i.Mesh(_,u(d,S));return D.position.set(M,R,T),E.add(D),D}const f=(E,_,d,M,R,T,S,D,I=!1)=>g(E,new i.BoxGeometry(_,d,M),R,T,S,D,I),p=(E,_,d,M,R,T,S,D,I=!1)=>{const N=g(E,new i.SphereGeometry(1,10,7),D,_,d,M,I);return N.scale.set(R,T,S),N},v=(E,_,d,M,R,T,S)=>g(E,new i.ConeGeometry(_,d,5),M,R,T,S,!0),b=(E,_,d)=>{const M=new i.Group;return M.position.set(E,_,d),s.add(M),M},h=t.color,m=t.accent||"#eddbff",x=t.dark||"#36214f";if(t.model==="susanoo"){f(s,1.75,1.65,.85,h,0,3.7,0),f(s,1.1,.65,.75,h,0,2.65,0);for(let R=0;R<5;R++)for(const T of[-1,1]){const S=f(s,.74,.055,.07,m,T*.4,3.15+R*.25,.46,!0);S.rotation.z=T*.18}f(s,1.45,.24,.95,x,0,2.5,0);for(let R=0;R<5;R++){const T=R*Math.PI*2/5,S=f(s,.85,1,.16,h,Math.sin(T)*.68,2.05,Math.cos(T)*.53);S.rotation.y=T,S.rotation.z=Math.sin(T)*.12}for(const R of[-1,1]){const T=b(R*.47,1.7,0);f(T,.52,1.1,.58,h,0,-.4,0),f(T,.64,.4,.7,x,0,-.8,.04),f(T,.48,.65,.56,h,0,-1.2,0),f(T,.6,.3,.95,h,0,-1.57,.2),l.push({node:T,side:R,kind:"leg"});const S=b(R*1.08,4.25,0);f(S,.6,1.1,.65,h,0,-.45,0),f(S,.75,.35,.85,m,0,.04,0),f(S,.64,.85,.65,x,0,-1.25,0),f(S,.58,.35,.55,h,0,-1.85,.07),l.push({node:S,side:R,kind:"arm"});for(let k=0;k<3;k++)f(s,.95,.16,.85,h,R*(1.03+k*.05),4.38-k*.17,0);const D=b(R*.72,4.35,-.43);D.userData.wingSide=R,a.push(D);const I=f(D,2.2,.24,.23,m,R*1,1.02,-.1,!0);I.rotation.z=R*.48;for(let k=0;k<3;k++)for(let V=0;V<(n?5:8);V++){const X=f(D,.48,1.2+k*.3,.12,h,R*(.55+V*.37),.75-k*.56+V*.12,-.12-k*.04,!0);X.rotation.z=-R*.55}const N=v(D,.16,.55,m,R*2.2,1.7,-.1);N.rotation.z=-R*.8}const E=b(0,5.05,.02);f(E,.76,.85,.7,h,0,0,0),f(E,.53,.25,.45,x,0,-.25,.25);for(const R of[-1,1]){const T=f(E,.22,.07,.08,"#fff89e",R*.18,.04,.4,!0);T.rotation.z=-R*.25;const S=v(E,.17,.95,h,R*.42,.55,0);S.rotation.z=-R*.38}const _=v(E,.16,.63,m,0,-.02,.58);_.rotation.x=Math.PI/2;const d=f(E,.18,.22,.05,"#e7abff",0,.29,.39,!0);d.rotation.z=Math.PI/4;for(let R=-2;R<=2;R++){const T=v(E,.16,.8+Math.abs(R)*.1,h,R*.16,.85,-.08);T.rotation.z=-R*.15}const M=b(-1.15,2.28,.18);f(M,.14,.8,.14,x,0,0,0),f(M,.7,.1,.25,m,0,-.15,0),f(M,.24,2.4,.08,m,0,-1.4,0,!0),M.rotation.z=-.5,e==="itachi"&&(a.forEach(R=>R.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){p(s,0,2.1,-.12,1,1.35,.75,h),p(s,0,3.52,.35,.82,.78,.65,h),p(s,0,3.27,.98,.5,.27,.5,m),p(s,0,3.45,1.31,.19,.13,.13,x);for(const E of[-1,1]){const _=v(s,.39,1.3,h,E*.58,4.3,.14);_.rotation.z=-E*.22,f(s,.27,.1,.09,"#fff5c2",E*.38,3.66,.95,!0),f(s,.045,.14,.045,"#b93237",E*.38,3.66,1.01,!0);const d=f(s,.39,.1,.06,x,E*.48,3.56,.92);d.rotation.z=E*.4;const M=v(s,.08,.25,"#fff2c8",E*.23,3.11,1.18);M.rotation.z=Math.PI;for(let S=0;S<3;S++){const D=f(s,.65,.035,.04,x,E*.62,3.3-S*.12,1.02);D.rotation.z=E*(S-1)*.15}const R=b(E*.9,2.85,.1);p(R,0,-.4,.15,.33,.78,.35,h),p(R,0,-1.04,.33,.43,.22,.44,m),l.push({node:R,side:E,kind:"arm"});const T=b(E*.52,1.1,-.05);p(T,0,-.35,0,.4,.7,.4,h),p(T,0,-.85,.25,.5,.25,.6,m),l.push({node:T,side:E,kind:"leg"});for(let S=0;S<3;S++)v(R,.08,.28,x,(S-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let E=0;E<9;E++){const _=(E-4)*.42,d=b(Math.sin(_)*.25,1.6,-.6);d.rotation.y=_,d.userData.tailIndex=E;const M=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(I=>new i.Vector3(...I))),R=14,T=7,S=new i.TubeGeometry(M,R,.4,T,!1),D=S.attributes.position;for(let I=0;I<=R;I++){const N=M.getPointAt(I/R),k=1-.93*Math.pow(I/R,1.5);for(let V=0;V<=T;V++){const X=I*(T+1)+V,it=new i.Vector3().fromBufferAttribute(D,X).sub(N).multiplyScalar(k).add(N);D.setXYZ(X,it.x,it.y,it.z)}}S.computeVertexNormals(),g(d,S,h,0,0,0,!0),c.push(d)}}else{if(t.model==="saiyan")for(let E=0;E<9;E++){const _=E*Math.PI*2/9,d=v(s,.13,.7,h,Math.sin(_)*.2,2.03,Math.cos(_)*.17);d.rotation.z=-Math.sin(_)*.7,d.rotation.x=Math.cos(_)*.6}if(t.model==="gear5"){for(let E=0;E<7;E++)p(s,Math.sin(E)*.2,1.91+Math.cos(E)*.07,Math.cos(E)*.13,.19,.16,.19,"#fff9ef");for(const E of[-1,1])for(let _=0;_<6;_++)p(s,E*(.35+_*.08),1.2+Math.sin(_)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const E=v(s,.12,.6,m,.19,1.96,.09);E.rotation.z=-.25;for(let _=0;_<6;_++){const d=f(s,.04,.12,.03,x,Math.sin(_)*.23,1.02+_*.09,.2);d.rotation.z=_*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),p(s,0,1.05,0,.42,.5,.29,h);for(const E of[-1,1]){const _=f(s,.06,.65,.06,m,E*.38,1.9,0);_.rotation.z=-E*.5}}if(t.model==="slayer")for(let E=0;E<8;E++){const _=v(s,.12,.5,h,Math.sin(E)*.42,.3+E*.14,Math.cos(E)*.35);_.rotation.z=Math.sin(E)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let E=0;E<8;E++){const _=f(s,.04,.38,.04,t.model==="icefire"&&E%2?"#ff9366":h,Math.sin(E)*.4,.35+E*.17,Math.cos(E)*.28,!0);_.rotation.z=E%2?.5:-.5}}const w=g(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),h,0,.06,0,!0);w.rotation.x=-Math.PI/2;function A(E){for(const d of[...E.children])d.isGroup&&A(d);const _=new Map;for(const d of[...E.children])if(d.isMesh){d.updateMatrix();const M=d.geometry.index?d.geometry.toNonIndexed():d.geometry.clone();M.applyMatrix4(d.matrix),_.has(d.material)||_.set(d.material,[]),_.get(d.material).push(M),E.remove(d),d.geometry.dispose(),r.delete(d.geometry)}for(const[d,M]of _){const R=di(M,!1);M.forEach(T=>T.dispose()),r.add(R),E.add(new i.Mesh(R,d))}}return A(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(E,{flying:_=!1,moving:d=!1}={}){const M=n?0:E;a.forEach((R,T)=>{R.rotation.y=(T?1:-1)*(_?.18+Math.sin(M*3)*.2:1.25+Math.sin(M*1.3)*.04)}),c.forEach((R,T)=>{R.rotation.y=(T-4)*.42+Math.sin(M*1.8+T*.6)*.09,R.rotation.x=.12+Math.cos(M*1.2+T)*.09}),l.forEach(({node:R,side:T,kind:S})=>{R.rotation.x=_?S==="leg"?.3:-.25:d?Math.sin(M*7+(T<0?Math.PI:0))*(S==="leg"?.3:-.2):0})},dispose(){r.forEach(E=>E.dispose()),o.forEach(E=>E.dispose()),s.clear()}}}function __({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[g,f]of c)g.visible=f;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const u=o.position.clone().sub(a.anchor);ls(n),e.position.copy(a.position).add(u),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(u),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(u,g){if(u===r){o=g;return}l(),!(u===null||!g)&&(ls(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:g.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=u,o=g,t.interior(u),i.background=s,i.fog=null,n.minDistance=2.6,n.maxDistance=8,n.target.copy(g.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const u of i.children)c.has(u)||c.set(u,u.visible),u.visible=!!(u.isLight||u===o||u.userData.residenceLayer||u.userData.officeAbility===r||u.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function x_(i,t){const e=new i.Group,n=new i.Group,s=[],r=[];e.visible=!1,e.userData.officeHologram=!0,t.add(e),e.add(n);const o=(_,d)=>{const M=new i.MeshBasicMaterial({color:_,transparent:!0,opacity:d,depthWrite:!1,side:i.DoubleSide});return r.push(M),M},a=o("#77e6ed",.4),c=o("#ddc38c",.55),l=o("#244f69",.035),u=o("#70dfe5",.045);u.blending=i.AdditiveBlending,n.position.y=.85;const g=new i.PlaneGeometry(2.9,1.6),f=new i.BoxGeometry(1,1,.018),p=new i.TorusGeometry(.48,.014,4,40),v=new i.ConeGeometry(.95,1.6,12,1,!0);s.push(g,f,p,v);const b=new i.Mesh(g,l);n.add(b);const h=new Map([[a,[]],[c,[]]]),m=(_,d,M,R,T=a)=>h.get(T).push({x:_,y:d,w:M,h:R});for(const _ of[-1.45,1.45]){m(_,0,.018,1.6);for(const d of[-.8,.8])m(_-Math.sign(_)*.15,d,.3,.03,c)}m(0,.8,2.9,.012),m(0,-.8,2.9,.012),m(-.55,.42,1.25,.035,c);for(let _=0;_<3;_++)m(-.34,.08-_*.23,1.65-_*.2,.018),m(-1.15,.08-_*.23,.08,.08,c);for(let _=0;_<24;_++){const d=_*Math.PI/12;m(.92+Math.cos(d)*.28,.1+Math.sin(d)*.28,.035,.035)}m(0,0,2.85,.025);let x=null;const w=new i.Matrix4;for(const[_,d]of h){const M=new i.InstancedMesh(f,_,d.length),R=new i.Matrix4;d.forEach((T,S)=>{R.makeScale(T.w,T.h,1),R.setPosition(T.x,T.y,.015),M.setMatrixAt(S,R)}),M.computeBoundingSphere(),n.add(M),_===a&&(x={mesh:M,index:d.length-1},M.instanceMatrix.setUsage(i.DynamicDrawUsage))}const A=new i.Mesh(p,a);A.rotation.x=-Math.PI/2,A.position.y=-1.1,e.add(A);const E=new i.Mesh(v,u);return E.rotation.z=Math.PI,E.position.y=-.85,e.add(E),{update(_,d,{time:M=0,height:R=1.8,reduced:T=!1}={}){return e.visible=!!_,_?(e.userData.officeAbility!==_.person.id&&e.traverse(S=>{S.isMesh&&(S.userData.officeHologramOwner=_.person.id)}),e.userData.officeAbility=_.person.id,e.position.copy(_.group.position),e.position.y+=R+1.55+(T?0:Math.sin(M*1.4)*.035),n.quaternion.copy(d.quaternion),A.rotation.z=T?0:M*.2,w.makeScale(2.85,.025,1),w.setPosition(0,T?0:Math.sin(M*.9)*.75,.03),x.mesh.setMatrixAt(x.index,w),x.mesh.instanceMatrix.needsUpdate=!0,e.position.clone().project(d)):(e.userData.officeAbility=null,null)},hide(){e.visible=!1,e.userData.officeAbility=null},dispose(){t.remove(e),s.forEach(_=>_.dispose()),r.forEach(_=>_.dispose())},root:e}}function v_(i,t){const e={box:new i.BoxGeometry(1,1,1),orb:new i.SphereGeometry(1,12,8),ring:new i.TorusGeometry(1,.04,5,28),tip:new i.ConeGeometry(.15,.6,6)},n=new Map,s=new Map,r=new Map,o=[],a=u=>(n.has(u)||n.set(u,new i.MeshBasicMaterial({color:(Ms.weapons[u]||Ms.specials[u]).color,transparent:!0,opacity:.8,depthWrite:!1})),n.get(u));function c(u,g,f,p,v){const b=new i.Mesh(e[g],a(f));return b.position.set(...p),b.scale.set(...v),u.add(b),b}function l(u){s.get(u)?.root.removeFromParent(),s.delete(u),r.delete(u)}return{observe(u,g,f,p=Date.now(),v=null){if(!f)return;const b=Ms.weapons[g?.weapon]?g.weapon:null,h=s.get(u);if((h?.figure!==f||h?.kind!==b)&&(h?.root.removeFromParent(),s.delete(u),b)){const R=new i.Group,T=b==="sniper"?1.15:b==="pistol"?.45:.8;R.userData.officeWeapon=b,R.position.set(0,-.5,.16),c(R,"box",b,[0,0,.18],[.14,.18,T]),c(R,"box",b,[0,-.13,0],[.1,.25,.14]),b==="sniper"&&c(R,"box",b,[0,.15,.15],[.12,.12,.35]),R.traverse(S=>{S.isMesh&&(S.userData.personId=u)}),(f.arms?.[1]||f.body).add(R),s.set(u,{root:R,kind:b,figure:f})}const m=s.get(u);if(m){const R=v||f.arms?.[1]||f.body;if(m.root.parent!==R&&R.add(m.root),m.root.visible=!["rest","play","drink","eat"].includes(g?.action),v){const T=$l(g.form),S=T?.height||3;m.root.position.set(S*.25,S*(T?.model==="kurama"?.22:.48),S*.2),m.root.scale.setScalar(Math.min(3,S/1.8)),m.root.rotation.x=g.aim_pitch||0}else m.root.position.set(0,-.5,.16),m.root.scale.setScalar(1),m.root.rotation.x=.7+(g.aim_pitch||0)}if(!g?.shot_at||r.get(u)>=g.shot_at)return;r.set(u,g.shot_at);const x=g.shot_kind,w=g.shot_end;if(!(Ms.weapons[x]||Ms.specials[x])||!w||!["x","y","z"].every(R=>Number.isFinite(w[R]))||p-g.shot_at>2500)return;for(;o.length>=8;)t.remove(o.shift().root);const A=new i.Group,E=Ms.specials[x]?($l(g.form)?.height||2.2)*.55:1.2,_=g.shot_origin&&["x","y","z"].every(R=>Number.isFinite(g.shot_origin[R]))?new i.Vector3(g.shot_origin.x,g.shot_origin.y,g.shot_origin.z):f.group.position.clone().add(new i.Vector3(0,E,0)),d=new i.Vector3(w.x,w.y,w.z);A.position.copy(_),A.lookAt(d),A.userData.officeAbility=u,t.add(A),A.userData.officeShot=x;const M=new i.Group;if(A.add(M),x==="bijudama"){c(M,"orb",x,[0,0,0],[.8,.8,.8]);for(let R=0;R<3;R++)c(M,"ring",x,[0,0,0],[1,1,1]).rotation.set(R*.9,R*.6,0)}else if(c(M,"box",x,[0,0,0],[x==="indra_arrow"?.1:.035,x==="indra_arrow"?.1:.035,x==="indra_arrow"?2:.9]),x==="indra_arrow"){const R=c(M,"tip",x,[0,0,1.25],[2,2,2]);R.rotation.x=Math.PI/2;const T=c(A,"ring",x,[0,0,.6],[1.25,1.8,1]);T.rotation.y=Math.PI/2}o.push({root:A,projectile:M,origin:_,target:d,start:p,duration:x==="bijudama"?1100:x==="indra_arrow"?650:240,kind:x})},update(u=Date.now(),g=!1){for(let f=o.length-1;f>=0;f--){const p=o[f],v=u-p.start,b=Math.min(1,v/p.duration);if(v>p.duration+180){t.remove(p.root),o.splice(f,1);continue}p.projectile.position.z=p.origin.distanceTo(p.target)*b,!g&&p.kind==="bijudama"&&(p.projectile.rotation.z=v*.003),p.projectile.scale.setScalar(v>p.duration?Math.max(.1,1-(v-p.duration)/180):1)}},forget:l,firstPerson(u,g){const f=s.get(u)?.root;if(!f?.visible)return()=>{};const p=f.parent,v=f.position.clone(),b=f.quaternion.clone(),h=f.scale.clone();return t.add(f),f.position.set(.3,-.28,-.8).applyMatrix4(g.matrixWorld),f.quaternion.copy(g.quaternion).multiply(new i.Quaternion().setFromAxisAngle(new i.Vector3(0,1,0),Math.PI)),f.scale.setScalar(1),()=>{p.add(f),f.position.copy(v),f.quaternion.copy(b),f.scale.copy(h)}},dispose(){for(const u of s.keys())l(u);o.forEach(u=>t.remove(u.root)),o.length=0,Object.values(e).forEach(u=>u.dispose()),n.forEach(u=>u.dispose()),n.clear()},active:()=>o.length}}function M_(){let i=0,t=0;return{start(e,n){const s=n.clone().sub(e);i=Math.atan2(-s.x,-s.z),t=Math.atan2(s.y,Math.hypot(s.x,s.z))},move(e,n){!Number.isFinite(e)||!Number.isFinite(n)||(i-=e*.0022,t=Vn.clamp(t-n*.0022,-1.35,1.35))},yaw:()=>i,pitch:()=>t,direction:()=>new O(-Math.sin(i)*Math.cos(t),Math.sin(t),-Math.cos(i)*Math.cos(t))}}function y_({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},onHologramAnchor:c=()=>{},onCombatFire:l=()=>{},onAimChange:u=()=>{},onUserCamera:g=()=>{},rendererFactory:f=b=>new Cu(b),controlsFactory:p=(b,h)=>new Ug(b,h),getDate:v=()=>new Date}){const b=new Kh,h=new Hn(36,1,.1,1200),m=f({antialias:!0,alpha:!1,powerPreference:"low-power"});m.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),m.outputColorSpace=yn,m.toneMapping=ta,m.toneMappingExposure=1.18,i.append(m.domElement);const x=p(h,m.domElement);x.enableDamping=!1,x.minDistance=8,x.maxDistance=650,x.minPolarAngle=.32,x.maxPolarAngle=1.28,x.target.set(0,0,0),x.enablePan=!0,x.panSpeed=.7,x.rotateSpeed=.55,x.enableKeys=!1;const w=new fu("#fbf3dc","#526c61",2.8);b.add(w);const A=new tl("#fff1cf",3.2);A.position.set(-12,25,15),b.add(A);const E=new tl("#cce5ef",1.1);E.position.set(15,10,-10),b.add(E);const _=new Map,d=new Map,M=new Set,R=new Set,T=new Map,S=a_(),D=f_(),I=Gu({THREE:$r,scene:b,navigation:S,reduced:()=>q||Pn,createModel:(y,L)=>g_($r,y,{...L,reduced:q||Pn})}),N=x_($r,b);let k=null,V=0;const X=v_($r,b),it=M_();let j={},$=!1,lt=!1,mt=null,Rt=null;function et(y){if(!(!y||(y.combat_revision??0)<(j.combat_revision??0))){y.weapon&&y.weapon!==j.weapon&&(Fe=null,we=null);for(const L of["hp","weapon","shield_until","respawn_id","shot_at","shot_kind","shot_origin","shot_end","attack_ready_at","combat_revision"])Object.hasOwn(y,L)&&(j[L]=y[L]);It()}}function ut(y){if(y=!!(y&&Qt&&!yi()&&!te.active()&&(j.weapon||["susanoo","kurama"].includes(I.modeState(Dt)?.id))),y===$)return $;if(ls(x),D.reset(),y){Fe=null,we=null,I.cancel(Dt),it.start(h.position,x.target);const L=I.form(Dt),F=L?L.height*.85:3.8,W=L?55:35;mt={enabled:x.enabled,fov:ve==="orbit"?44:h.fov,distance:Vn.clamp(h.position.distanceTo(x.target),F,W)},x.minDistance=F,x.maxDistance=W,x.enabled=!1,ve="follow",ke=Dt,gt=!1,h.fov=j.weapon==="sniper"?35:58,h.updateProjectionMatrix()}else if(mt){x.enabled=mt.enabled;const L=Vn.clamp(mt.distance,x.minDistance,x.maxDistance),F=T.get(Dt);if(F){x.target.copy(F.group.position).add(new O(0,I.form(Dt)?.height*.55||1.3,0));const W=it.direction().negate();W.y=Math.max(.25,W.y),W.normalize(),h.position.copy(x.target).addScaledVector(W,L)}h.fov=mt.fov,h.updateProjectionMatrix(),mt=null,document.pointerLockElement===m.domElement&&document.exitPointerLock?.()}return $=y,Rt=null,u($),It(),$}const Pt={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function At(y){return _.has(y)||_.set(y,new Vs({color:Pt[y]||y,roughness:y==="metal"?.4:.82,metalness:y==="gold"?.45:.02,...y==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:xn}:{}})),_.get(y)}const Tt=new an(1.1,.035,2.2);M.add(Tt);const Xt=new Pl(Tt,At("#c9b384"),24);Xt.instanceMatrix.setUsage(bl),Xt.count=0,Xt.frustumCulled=!1,b.add(Xt),Xt.userData.officeRestMats=!0;const Ue=new _e,qt=new Cn;function ae(y,L,F,W,Y,bt=0,zt=0,Te=0){let pe=y;y.index&&(pe=y.toNonIndexed(),y.dispose()),qt.setFromEuler(new si(bt,zt,Te)),pe.applyMatrix4(new _e().compose(new O(F,W,Y),qt,new O(1,1,1))),d.has(L)||d.set(L,[]),d.get(L).push(pe)}function st(y,L,F,W,Y,bt,zt,Te=.035,pe=0){ae(Te>0?new $o(y,L,F,1,Math.min(Te,y/3,L/3,F/3)):new an(y,L,F),zt,W,Y,bt,0,pe)}function Ot(y,L,F,W,Y,bt,zt=y){ae(new qn(zt,y,L,12),bt,F,W,Y)}function Et(y,L,F,W,Y,bt,zt){const Te=new Wi(1,10,7);Te.scale(y,L,F),ae(Te,zt,W,Y,bt)}function Yt(y,L,F=1){S.addBox(.85*F,.85*F,y,L,"plant",2*F),Ot(.4*F,.7*F,y,.35*F,L,"pot",.31*F),Ot(.045*F,1.4*F,y,1.2*F,L,"oak");for(let W=0;W<5;W++){const Y=W*2.4;Et(.48*F,.52*F,.25*F,y+Math.cos(Y)*.3*F,(1.4+W*.15)*F,L+Math.sin(Y)*.25*F,W%2?"leaf":"lightLeaf")}}function jt(y,L,F,W,Y,bt,zt="#f2e8d5",Te=0){const pe=document.createElement("canvas");pe.width=768,pe.height=192;const Xe=pe.getContext("2d");Xe.clearRect(0,0,768,192),Xe.fillStyle=zt,Xe.textAlign="center",Xe.font="500 66px Georgia",Xe.fillText(y,384,88),Xe.font="20px Arial",Xe.fillText(L,384,139);const ze=new ja(pe);ze.colorSpace=yn,R.add(ze);const z=new fi({map:ze,transparent:!0,depthWrite:!1,side:xn}),K=new Fi(F,F/4);M.add(K);const Ge=new be(K,z);Ge.position.set(W,Y,bt),Ge.rotation.y=Te,b.add(Ge),_.set(`sign-${y}`,z)}st(86,.6,96,0,-.94,28,"base",.3),st(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),st(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const y of[-1,1]){st(54,.04,4,y*70,-.17,20,"#e6dfcc",0),st(4,.04,55,y*87,-.17,45,"#e6dfcc",0);for(let L=-20;L<92;L+=8)Ot(.08,1.1,y*99,.35,L,"wood"),st(.08,.08,8,y*99,.7,L+4,"wood",0);for(const L of[34,58,80])st(3,.4,.9,y*92,.05,L,"wood",.06),S.addBox(3,.9,y*92,L,"trail-bench",.7),Yt(y*80,L,1);jt("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,y*58,1.7,18)}S.addBox(160,40,0,97,"water-boundary",.1),S.configureHomes(!0);for(const y of[-99,99])S.addBox(.2,114,y,35,"scenic-fence",1.2);S.addBox(202,.2,0,91,"scenic-boundary",1.2),st(85,.07,18,0,-.43,67,"#e4cfa5",.1),st(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let y=0;y<8;y++)st(120-y*8,.02,.13,0,-.57,79+y*2.8,"#c4ddd4",0);st(7,.07,24,0,-.4,60,"#e6dfcc",.1);const Jt=c_({scene:b,box:st,cylinder:Ot,orb:Et,bake:ae,sign:jt,material:At,navigation:S,ownedGeometries:M,materials:_}),Me=d_({scene:b,navigation:S,ownedGeometries:M,materials:_,sign:jt});st(8,.12,7,52,-.3,34,"metal"),st(6,1.2,.7,52,.48,34,"deep"),st(6,2.8,.2,52,1.2,31.6,"metal"),S.addBox(6,.7,52,34,"armory-counter",1.2),S.addBox(6,.2,52,31.6,"armory-wall",2.8),jt("ATLAS / ARMORY","KAIA / VIRTUAL EQUIPMENT",6,52,3.3,31.8);for(let y=0;y<4;y++)st(.8,.18,.2,50+y*1.3,.72,34,"gold"),st(.12,.15,.7,50+y*1.3,.72,34.3,"metal");for(let y=0;y<8;y++){const L=-36+y*3.7;st(1.5,.25,2.8,L,-.1,67,"white",.1),st(1.4,.17,1,L,.26,66,"sofa",.08),S.addBox(1.5,2.8,L,67,"beach-chair",.6),y%2===0&&(Ot(.05,3,L+1.2,1,65,"gold"),ae(new gi(1.8,.6,10),"white",L+1.2,2.7,65),S.addBox(.2,.2,L+1.2,65,"parasol",2.8))}st(19,.15,10,22,-.3,65,"wood",.1),jt("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const y of[16,22,28])Ot(1.2,.13,y,.8,63,"white"),Ot(.1,1,y,.2,63,"gold"),S.addBox(2.4,2.4,y,63,"terrace-table",.9);for(const y of[-10,-6,-2]){Yt(y,58,.9);for(let L=0;L<4;L++)Et(.15,.2,.15,y+(L-1.5)*.3,.9,58,"#c18b9c")}st(83,.08,4,0,-.44,20,"#e6dfcc",.12),st(6,.08,64,0,-.44,16,"#e6dfcc",.1),st(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const y of[-41,41])for(const L of[-15,-2,14,31,46])Yt(y,L,1.7),Ot(.08,3.2,y+(y<0?1:-1),1.15,L+2,"gold"),Et(.22,.25,.22,y+(y<0?1:-1),2.85,L+2,"white");const Ee=[];function We(y,L,F,W){S.addBox(F,.12,y,L,"net",W);for(const Y of[-F/2,F/2])Ot(.055,W,y+Y,W/2,L,"white");for(let Y=.3;Y<=W;Y+=.22)st(F,.018,.025,y,Y,L,"white",0);for(let Y=-F/2;Y<=F/2;Y+=.4)st(.012,W-.3,.018,y+Y,(W+.3)/2,L,"white",0)}function Re(y,L,F=.16){const W=new Wi(F,10,8);M.add(W);const Y=new be(W,At(L));Y.userData.officeBall=y.id,b.add(Y),Ee.push({mesh:Y,game:y})}for(const y of es){const{x:L,z:F,id:W}=y;if(S.addBox(6,.14,L,F-(y.kind==="court"?6:4.2),"sign",1.2),st(y.kind==="court"?17:10,.12,y.kind==="court"?13:9,L,-.29,F,W==="tennis"?"#a77355":W==="badminton"?"#3b7e77":W==="basketball"?"#b99569":"#dce0ca",.14),st(6,1.1,.12,L,.65,F-(y.kind==="court"?6:4.2),"deep"),jt(y.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,L,.75,F-(y.kind==="court"?5.91:4.11)),W==="tennis"||W==="badminton"||W==="basketball"){for(const Y of[-7,7])st(.045,.015,10.8,L+Y,-.21,F,"white",0);for(const Y of[-5.4,0,5.4])st(14,.015,.045,L,-.21,F+Y,"white",0);if(W!=="basketball"){for(const Y of[-5.7,5.7])st(.035,.015,10.8,L+Y,-.2,F,"white",0);We(L,F,14,W==="badminton"?1.7:1.15),Re(y,W==="tennis"?"#d9e56b":"white",W==="tennis"?.17:.12)}else{for(const Y of[-1,1]){Ot(.09,3.6,L,1.5,F+Y*5,"metal"),st(2.3,1.35,.13,L,3.1,F+Y*4.7,"white");const bt=new Ni(.43,.045,6,20);ae(bt,"#c67543",L,2.8,F+Y*4.1,Math.PI/2)}Re(y,"#bd6c32",.25)}}else if(W==="golf"){for(const Y of[-6.5,6.5])S.addBox(.2,8,L+Y,F,"golf-edge",.5);st(13,.12,8,L,-.15,F,"#69885c",.15);for(const Y of[-6.5,6.5])st(.2,.35,8,L+Y,-.05,F,"woodLight");for(let Y=0;Y<3;Y++)Ot(.22,.02,L-4+Y*4,-.07,F+(Y%2?2:-2),"black"),Ot(.025,1.5,L-4+Y*4,.65,F+(Y%2?2:-2),"gold"),st(.8,.4,.03,L-3.6+Y*4,1.25,F+(Y%2?2:-2),"#c78362");Re(y,"white",.12)}else if(W==="bowling"){for(const Y of[-2.7,2.7])S.addBox(.35,11,L+Y,F,"bowling-edge",.4);st(5,.09,11,L,-.13,F,"woodLight");for(const Y of[-2.7,2.7])st(.35,.12,11,L+Y,-.1,F,"oak");for(let Y=0;Y<4;Y++)for(let bt=0;bt<=Y;bt++){const zt=L+(bt-Y/2)*.55,Te=F-2-Y*.5;Ot(.14,.5,zt,.17,Te,"white",.08),Et(.13,.14,.13,zt,.49,Te,"white")}Re(y,"#786397",.28)}else if(W==="arcade")for(const Y of[-2.2,2.2]){S.addBox(2.1,1.6,L+Y,F,"arcade",2.5),S.addBox(1.2,1.2,L+Y,F+2,"seat",.7),st(2.1,2.6,1.6,L+Y,1.1,F,"deep",.1),st(1.6,1.1,.05,L+Y,1.7,F+.83,"screen");for(let bt=0;bt<5;bt++)st(.05,.6,.02,L+Y+(bt-2)*.2,1.7,F+.87,bt%2?"#e8c877":"screenLine",0);Ot(.18,.06,L+Y,.9,F+1.1,"gold"),st(1.2,.45,1.2,L+Y,.2,F+2,"sofa",.1)}else if(W==="archery"){S.addBox(5,.3,L,F-2,"archery-backstop",3.2),st(5,3.2,.25,L,1.2,F-2,"wood");for(let Y=0;Y<5;Y++){const bt=new qn(1.1-Y*.21,1.1-Y*.21,.03,24);ae(bt,["white","#283e49","#73a7bf","#c36f60","gold"][Y],L,1.6,F-1.82+Y*.035,Math.PI/2)}st(5,.02,.12,L,-.18,F+2.8,"white",0)}else if(W==="darts"){S.addBox(5,.22,L,F-1.8,"dart-board",2.8),st(5,3,.22,L,1.25,F-1.8,"deep");for(let Y=0;Y<4;Y++){const bt=new qn(1.05-Y*.23,1.05-Y*.23,.025,24);ae(bt,Y%2?"white":"#bf6f59",L,1.6,F-1.64+Y*.025,Math.PI/2)}}else{S.addBox(5.5,3.5,L,F,"game-table",1.3),st(5.5,.25,3.5,L,1,F,W==="pingpong"?"#4c7783":W==="billiards"?"#376a59":"woodLight",.1);for(const Y of[-2.2,2.2])for(const bt of[-1.2,1.2])st(.18,1.1,.18,L+Y,.4,F+bt,"oak");if(W==="pingpong"&&(We(L,F,5.5,1.45),Re(y,"white",.1)),W==="uno")for(let Y=0;Y<16;Y++){const bt=Y%4;st(.32,.035,.48,L+(bt<2?-1.7+Y%4*.3:1.4),1.16+Y*.002,F+(bt%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][Y%4],.02,Y*.3)}if(W==="chess")for(let Y=0;Y<8;Y++)for(let bt=0;bt<8;bt++)st(.34,.02,.34,L+(Y-3.5)*.34,1.14,F+(bt-3.5)*.34,(Y+bt)%2?"deep":"white",0),(bt<2||bt>5)&&Ot(.075,.17,L+(Y-3.5)*.34,1.24,F+(bt-3.5)*.34,bt<2?"white":"black");if(W==="billiards")for(let Y=0;Y<10;Y++)Et(.12,.12,.12,L+Math.sin(Y*2)*1.8,1.25,F+Math.cos(Y)*.9,["gold","white","deep"][Y%3]);if(W==="foosball")for(let Y=0;Y<5;Y++){st(.045,.045,4.5,L-2+Y,1.4,F,"metal",0);for(const bt of[-1,0,1])st(.2,.45,.18,L-2+Y,1.48,F+bt,Y%2?"#ba7864":"deep")}for(const Y of[-1,1])st(4,.35,.8,L,.28,F+Y*3.8,"sofa",.1),S.addBox(4,.8,L,F+Y*3.8,"bench",.5)}}st(40.5,.6,28,0,-.6,0,"base",.22),st(39.8,.22,27.3,0,-.2,0,"edge",.1),st(39.4,.18,26.9,0,-.04,0,"floor",.08),st(37.8,.04,13.5,0,.07,-5.8,"stone",.05),st(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),st(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let y=-18;y<19;y+=1.9)st(.015,.015,12.4,y,.14,-5.8,"#c3cfbf",0);st(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),st(39.4,.22,.5,0,4.8,-13.25,"gold"),st(8,4.8,.18,0,2.35,-13.02,"deep");for(let y=0;y<21;y++)st(.06,4.6,.1,-3.8+y*.38,2.35,-12.87,"wood",.01);st(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),jt("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const y of[-15,-10,10,15]){st(4.1,2.9,.15,y,2.6,-13,"glass"),st(4.2,.08,.23,y,4.08,-12.85,"gold"),st(4.2,.12,.3,y,1.12,-12.85,"woodLight");for(const L of[-2,0,2])st(.055,2.9,.2,y+L,2.6,-12.86,"gold",0)}st(.13,2.8,10.8,0,1.55,-6.4,"glass"),st(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const y of[-11.8,-6.4,-1])st(.08,2.9,.08,0,1.5,y,"gold",0);st(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),st(.22,.08,25.7,-19.5,2.8,-.1,"gold"),st(.2,2.7,25.7,19.5,1.4,-.1,"glass"),st(.22,.08,25.7,19.5,2.8,-.1,"gold"),jt("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),jt("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function $e(y,L,F){S.addBox(2.6,1.28,y,L,"desk",2.3),st(2.6,.15,1.28,y,1.31,L,"woodLight",.08);for(const W of[-1.03,1.03])st(.09,1.17,1.02,y+W,.66,L,"white"),st(.45,.08,.94,y+W,.15,L,"metal");st(1,.66,.08,y,1.91,L-.22,"metal"),st(.9,.54,.02,y,1.92,L-.166,"screen");for(let W=0;W<3;W++)st(.28+W*.12,.024,.025,y-.14+W*.04,2.03-W*.1,L-.149,"screenLine",0);Ot(.07,.25,y,1.48,L-.2,"metal"),st(.45,.035,.25,y,1.405,L-.19,"metal"),st(.71,.035,.24,y,1.42,L+.32,"white"),Ot(.09,.18,y+.9,1.49,L+.12,"deep"),st(.64,.17,.64,y,.66,L+1.02,F==="umum"?"sofa":"teal",.1),st(.65,.7,.12,y,1.08,L+1.33,F==="umum"?"sofa":"teal",.09),Ot(.055,.5,y,.35,L+1.05,"metal"),st(.8,.06,.14,y,.15,L+1.05,"metal"),st(.14,.06,.8,y,.15,L+1.05,"metal")}const H={umum:[],operasional:[]};for(const y of["umum","operasional"])for(let L=0;L<4;L++)for(let F=0;F<4;F++){const W=(y==="umum"?-15:3.4)+F*3.75,Y=-10.3+L*3.15;H[y].push([W,.18,Y+1.03]),$e(W,Y,y)}for(const y of[-18.5,18.5]){st(.7,2.4,4.7,y,1.25,-8.4,"wood");for(let L=0;L<3;L++){st(.86,.06,4.8,y,.65+L*.69,-8.4,"gold");for(let F=0;F<8;F++)st(.5,.38+F%2*.12,.18,y,.88+L*.69,-10.3+F*.5,F%2?"white":"deep")}}st(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const y of[4.7,8,11.3]){st(15.8,.45,1.05,-8.7,.57,y,"sofa",.16),st(15.8,.9,.25,-8.7,.91,y-.62,"sofa",.12);for(let L=0;L<8;L++)st(1.72,.17,.95,-15.8+L*2.02,.86,y,L%3===0?"pillow":"sofa",.1);for(const L of[-16.7,-.7])st(.25,.68,1.35,L,.8,y,"sofa",.1)}for(const y of[-11.5,-5]){st(2.7,.13,1.2,y,.64,6.6,"woodLight",.12);for(const L of[-.9,.9])Ot(.05,.48,y+L,.37,6.6,"gold");Ot(.16,.22,y+.4,.81,6.6,"white")}st(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const y of[-11.5,-6.5])Ot(.04,.5,y,.32,2.85,"gold");jt("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),st(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),st(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),st(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let y=0;y<23;y++)st(.055,1.15,.07,7.9+y*.4,.78,2.26,"woodLight",.01);st(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),st(.8,.55,.05,15.3,1.9,1.94,"black"),Ot(.18,.24,14.1,1.64,1.5,"white"),Ot(.18,.24,13.6,1.64,1.5,"white"),jt("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const y of[8,13.8])for(const L of[5.1,9.7]){Ot(1.45,.12,y,1.05,L,"woodLight"),Ot(.13,.92,y,.55,L,"gold"),Ot(.68,.08,y,.12,L,"gold");for(const F of[-1.6,1.6])Ot(.42,.14,y+F,.67,L,"deep"),Ot(.055,.55,y+F,.34,L,"gold");Ot(.18,.22,y+.4,1.22,L,"white"),Ot(.22,.04,y-.3,1.14,L+.2,"white")}for(const[y,L,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])Yt(y,L,F);S.addBox(39.4,.32,0,-13.25,"wall",4.8),S.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const y of[-19.5,19.5])S.addBox(.2,25.7,y,-.1,"glass-wall",2.8);for(const y of[4.7,8,11.3])S.addBox(16.1,1.5,-8.7,y,"sofa",1.4);S.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),S.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const y of[8,13.8])for(const L of[5.1,9.7])S.addBox(2.9,2.9,y,L,"cafe-table",1.3);for(const y of[-18.5,18.5])S.addBox(.9,4.8,y,-8.4,"shelf",2.6);for(const y of[-11.5,-5])S.addBox(2.7,1.2,y,6.6,"lounge-table",.8);for(const[y,L]of d){const F=di(L,!1);L.forEach(W=>W.dispose()),F&&(M.add(F),b.add(new be(F,At(y))))}d.clear();const le=i_({scene:b,material:At,ownedGeometries:M}),te=__({scene:b,residences:le,camera:h,controls:x,background:new oe("#182c2a")}),xe=l_({scene:b,materials:_,ownedGeometries:M,sun:A,hemi:w,fill:E,navigation:S}),Mt=document.createElement("canvas");Mt.width=Mt.height=128;const Ce=Mt.getContext("2d"),Zt=Ce.createRadialGradient(64,64,7,64,64,64);Zt.addColorStop(0,"#16382f35"),Zt.addColorStop(1,"#16382f00"),Ce.fillStyle=Zt,Ce.fillRect(0,0,128,128);const ee=new ja(Mt);R.add(ee);const U=new Fi(66,49);M.add(U);const C=new fi({map:ee,transparent:!0,depthWrite:!1});_.set("shadow",C);const J=new be(U,C);J.rotation.x=-Math.PI/2,J.position.y=-.98,b.add(J);const ct=new Map,at=new Map;function vt(y){if(at.has(y))return at.get(y);const L=[];if(y==="archery"){const W=new Ni(.34,.025,5,16,Math.PI);W.rotateZ(-Math.PI/2),L.push(W.toNonIndexed()),W.dispose();const Y=new an(.035,.035,.85);Y.translate(0,0,.1),L.push(Y.toNonIndexed()),Y.dispose()}else{const W=new qn(.017,.03,y==="billiards"?1.65:1,6);W.rotateX(Math.PI/2),L.push(W.toNonIndexed()),W.dispose()}const F=di(L,!1);return L.forEach(W=>W.dispose()),M.add(F),at.set(y,F),F}function ht(y,L,F,W,Y){const bt=L+F.join(":");if(!ct.has(bt)){const Te=L==="sphere"?new Wi(F[0],10,8):new $o(...F,1,.06);ct.set(bt,Te),M.add(Te)}const zt=new be(ct.get(bt),At(W));return zt.position.set(...Y),y.add(zt),zt}const rt=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],ot=new Map,St=new Vs({vertexColors:!0,roughness:.8});_.set("costume-vertex",St);function B(y){const L=new Un;b.add(L);const F=Ql(y.avatar),W=Wu(F.costume),Y=(W?.style||F.style)==="feminine",bt=W?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||rt[y.id%rt.length],zt=new Un;L.add(zt);const Te={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],pe=F.hair==="hijab"?bt:"#352c32";if(ht(zt,"box",[Y?.43:.5,.65,.33],bt,[0,1.17,0]).userData.avatarCloth=!0,!W&&F.outfit==="blazer"){ht(zt,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Be of[-1,1]){const Ze=ht(zt,"box",[.07,.32,.035],"gold",[Be*.12,1.33,.19]);Ze.rotation.z=Be*.25}}!W&&F.outfit==="sport"&&ht(zt,"box",[.32,.055,.02],"white",[0,1.3,.18]);const Xe=!W&&F.outfit==="dress"?ht(zt,"box",[.6,.4,.44],bt,[0,.79,0]):null,ze=new Un;if(ze.position.y=1.69,zt.add(ze),ht(ze,"box",[.43,.46,.4],Te,[0,0,0]),W){const Be=new be(rh(W,"head",ot,M),St),Ze=new be(rh(W,"body",ot,M),St);Be.userData.costumePart="head",Ze.userData.costumePart="body",ze.add(Be),zt.add(Ze)}else{const Be="hair:"+F.hair;if(!ct.has(Be)){const Ze=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const ts of[-1,1])Ze.push([.09,F.hair==="bob"?.4:.53,.32,ts*.235,-.01,-.03]);const xs=Ze.map(([ts,Iu,Nu,Uu,Fu,Ou])=>{const xa=new an(ts,Iu,Nu);xa.translate(Uu,Fu,Ou);const Bu=xa.toNonIndexed();return xa.dispose(),Bu}),vs=di(xs,!1);xs.forEach(ts=>ts.dispose()),ct.set(Be,vs),M.add(vs)}ze.add(new be(ct.get(Be),At(pe)))}if(!W&&F.hair==="ponytail"&&ht(ze,"box",[.24,.53,.22],pe,[0,-.02,-.35]),!W&&F.hair==="hijab"&&ht(zt,"box",[.58,.18,.43],pe,[0,1.44,-.04]),!ct.has("eyes")){const Be=[-.095,.095].map(xs=>{const vs=new an(.035,.045,.025);vs.translate(xs,.035,.205);const ts=vs.toNonIndexed();return vs.dispose(),ts}),Ze=di(Be,!1);Be.forEach(xs=>xs.dispose()),ct.set("eyes",Ze),M.add(Ze)}const z=new be(ct.get("eyes"),At("#263833"));ze.add(z);const K=[z];if(ht(ze,"box",[.09,.02,.025],Y?"#b96f78":"#9c6d58",[0,-.105,.21]),Y)for(const Be of[-.14,.14])ht(ze,"box",[.065,.025,.02],"#d39589",[Be,-.065,.21]);if(F.accessory==="glasses"){for(const Be of[-1,1])ht(ze,"box",[.15,.11,.025],"gold",[Be*.105,.04,.224]),ht(ze,"box",[.11,.07,.025],Te,[Be*.105,.04,.24]);ht(ze,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){ht(ze,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Be of[-1,1])ht(ze,"box",[.12,.2,.18],"deep",[Be*.28,.07,0])}const Ge=[];for(const Be of[-.34,.34]){const Ze=new Un;Ze.position.set(Be,1.42,0),zt.add(Ze),ht(Ze,"box",[.17,.4,.2],bt,[0,-.19,0]).userData.avatarCloth=!0,ht(Ze,"box",[.15,.27,.16],Te,[0,-.45,.05]),Ge.push(Ze)}const bi=[],Vt=[];for(const Be of[-.14,.14]){const Ze=new Un;Ze.position.set(Be,.83,0),zt.add(Ze),ht(Ze,"box",[.18,.64,.2],W?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,Vt.push(ht(Ze,"box",[.23,.14,.34],W?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),bi.push(Ze)}const dn=ht(Ge[1],"sphere",[.12],"white",[0,-.49,.14]),Kn=ht(Ge[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),Je=new Un;Ge[1].add(Je),Je.position.set(0,-.48,.16),ht(Je,"box",[.04,.44,.05],"gold",[0,-.14,0]);const qe=new Ni(.24,.025,6,16);M.add(qe),Je.add(new be(qe,At("white"))),Je.rotation.x=Math.PI/2;const Ft=new be(vt("billiards"),At("gold"));Ft.position.set(0,-.48,.35),Ge[1].add(Ft),Ft.visible=!1;const he=new yr(.5,.59,24);M.add(he);const zn=new fi({color:"#c5a061",side:xn});_.set(`ring-${y.id}`,zn);const sn=new be(he,zn);sn.rotation.x=-Math.PI/2,sn.position.y=.02,L.add(sn),sn.visible=!1;const Wt=document.createElement("button");Wt.type="button",Wt.className="vo-avatar-label",Wt.setAttribute("aria-pressed","false");const rn=document.createElement("i"),Ei=document.createElement("span"),_s=document.createElement("small");Wt.append(rn,Ei,_s),t.append(Wt);const ji=document.createElement("span");return ji.className="vo-speech",ji.hidden=!0,Wt.append(ji),Wt.addEventListener("click",()=>e(y.id)),L.traverse(Be=>{Be.isMesh&&(Be.userData.personId=y.id)}),{group:L,body:zt,head:ze,arms:Ge,legs:bi,shoes:Vt,eyes:K,skirt:Xe,cup:dn,plate:Kn,racket:Je,tool:Ft,bubble:ji,label:Wt,dot:rn,name:Ei,icon:_s,ring:sn,person:y,appearance:JSON.stringify(y.avatar),privateGeometry:qe,target:new O,phase:y.id*1.75}}let nt=null,q=!1,yt=!0,_t=!1,dt=null,Ht=0,re=0,pt=null,Bt=[],ne=null,Ct=null,ie=null,ve="orbit",ke=null,Pn=!1,xi={};const qs=new Map,vi=new Map;let vn=null,Dt=null,Mn=null,Qt=null,Fn={},Mi=a,Si=null,yi=()=>!1,Fe=null,we=null,De=null,On=null,ri=!1,ms=null,$i=!1,Bi=null;const P=new yr(1.2,1.4,32);M.add(P);const G=new fi({color:"#e9be69",side:xn,transparent:!0,opacity:.85});_.set("pilot-guide",G);const tt=new be(P,G);tt.rotation.x=-Math.PI/2,tt.visible=!1,tt.userData.pilotGuide=!0,b.add(tt);const Z=new Map,Q=[],wt={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},xt=new O,ft=new O;let gt=!1;function Nt(y){Dt&&Mn&&!y.some(z=>z.id===Dt)&&(y=[...y,{...Mn,home_slot:De?.slot??Mn.home_slot}]),S.configureHomes(!0,ri?De?.slot:null,Math.max(ms??0,y.length,...y.map(z=>(z.home_slot??-1)+1))),Bt=y,le.sync(y),xe.extent(le.bounds().back);const L=y.map(z=>{if(!ie?.connected||!ie.room||![ie.room.from,ie.room.to].includes(z.id)){const K=y.find(Ge=>Ge.is_me)?.id;return ie&&!ie.connected&&(z.id===K||z.meeting_with===K)?{...z,meeting_with:null,meeting_spot:null}:z}return{...z,state:"online",meeting_with:ie.room.from===z.id?ie.room.to:ie.room.from,meeting_spot:ie.room.spot}}),F=z=>z.id===nt||z.id===ke||z.is_me||vn&&[vn.from,vn.to].includes(z.id),W=[...L].sort((z,K)=>+!!F(K)-+!!F(z)||+!!K.meeting_with-+!!z.meeting_with||{online:0,idle:1,offline:2}[z.state]-{online:0,idle:1,offline:2}[K.state]||z.id-K.id),Y=[],bt={umum:0,operasional:0},zt=[],Te=new Map;let pe=0,Xe=0;for(const z of W){if(Y.length>=24)break;z.state==="online"&&bt[z.department]>=16||(Y.push(z),z.state==="online"&&bt[z.department]++)}const ze=new Set(Y.map(z=>z.id));for(const[z,K]of T)(!ze.has(z)||K.appearance!==JSON.stringify(Y.find(Ge=>Ge.id===z)?.avatar))&&(I.forget(z),X.forget(z),b.remove(K.group),K.label.remove(),K.ring.geometry.dispose(),M.delete(K.ring.geometry),K.privateGeometry.dispose(),M.delete(K.privateGeometry),K.ring.material.dispose(),_.delete(`ring-${z}`),T.delete(z));bt.umum=bt.operasional=0;for(const z of Y){let K=T.get(z.id),Ge=!K;K||(K=B(z),T.set(z.id,K));const bi=K.game?.id,Vt=K.pose,dn=K.home?.clone(),Kn=z.in_office===!1&&z.state!=="offline",Je=Kn?null:Z.get(z.id)||z.pilot,qe=z.id===Dt&&Qt?Qt.state():Je;K.person=z,K.pose=Hu(z,v());let Ft;K.game=Vu(z,v());const he=Kn?null:qs.get(z.id)||z.recreation,zn=!Kn&&vn&&vn.status!=="pending"&&[vn.from,vn.to].includes(z.id);zn?(K.game=es.find(Wt=>Wt.id===vn.kind)||K.game,K.pose="playing"):he?.kind==="game"&&he.until>Date.now()/1e3&&z.state!=="offline"&&(K.game=es.find(Wt=>Wt.id===he.destination)||K.game,K.pose="playing");const sn=he&&(!he.until||he.until>Date.now()/1e3)&&wt[he.destination];if(K.destination=!!sn,sn&&!zn&&z.state!=="offline"){K.pose=he.kind==="drink"?"coffee":he.kind==="food"?"eating":he.kind==="dance"?"dancing":"resting",Ft=[sn[0]+z.id%5*1.6,sn[1],sn[2]+Math.floor(z.id%10/5)*1.3];const Wt=S.nearest({x:Ft[0],z:Ft[2]});Wt&&(Ft=[Wt.x,Ft[1],Wt.z]),K.group.rotation.y=Math.PI}else if(!Kn&&z.meeting_with&&Number.isInteger(z.meeting_spot)&&!zn){K.pose="meeting";const Wt=z.id<z.meeting_with?-1:1;Ft=[-36+z.meeting_spot*6.5+Wt*.9,-.12,20],K.facing=Wt<0?Math.PI/2:-Math.PI/2}else if(K.pose==="working")Ft=H[z.department][bt[z.department]++],K.group.rotation.y=Math.PI;else if(K.pose==="playing"){const Wt=Te.get(K.game.id)||0;Te.set(K.game.id,Wt+1);const rn=Wt%2?1:-1;Ft=[K.game.x+(K.game.kind==="court"?rn*(3-Math.floor(Wt/2)%3*1.7):Math.floor(Wt/2)*.8),-.12,K.game.z+rn*(K.game.kind==="court"?3.6:2.5)],K.group.rotation.y=rn<0?0:Math.PI}else if(K.pose==="sleeping")Ft=le.bed(z.id),K.group.rotation.y=0;else if(K.pose==="resting"){const Wt=pe++;Ft=[-15.8+Wt%8*2.02,.12,4.7+Math.floor(Wt/8)*3.3],K.group.rotation.y=0}else if(Xe<8){const Wt=Xe++,rn=Wt%4,Ei=Wt<4?1:-1;Ft=[(rn%2?13.8:8)+Ei*1.65,.08,rn<2?5.1:9.7],K.group.rotation.y=Ei*Math.PI/2}else{const Wt=pe++;Ft=[-15.8+Wt%8*2.02,.12,4.7+Math.floor(Wt/8)*3.3],K.group.rotation.y=0}if(K.pose==="playing"&&K.game.id==="darts"&&(Ft=[K.game.x+(z.id%2?-1:1)*1.2,-.12,K.game.z+2.5]),["playing","meeting"].includes(K.pose)&&!S.free(Ft[0],Ft[2])){const Wt=S.nearest({x:Ft[0],z:Ft[2]});Wt&&(Ft=[Wt.x,Ft[1],Wt.z])}if((K.pose==="playing"||sn)&&zt.some(Wt=>Math.hypot(Wt[0]-Ft[0],Wt[2]-Ft[2])<.7))t:for(const Wt of[.8,1.5,2.2])for(let rn=0;rn<12;rn++){const Ei=Ft[0]+Math.cos(rn*Math.PI/6)*Wt,_s=Ft[2]+Math.sin(rn*Math.PI/6)*Wt;if(S.free(Ei,_s)&&!zt.some(ji=>Math.hypot(ji[0]-Ei,ji[2]-_s)<.7)){Ft=[Ei,Ft[1],_s];break t}}if(qe&&z.state!=="offline"?(Ft=[qe.x,qe.y,qe.z],K.pose="manual",K.manual=!0,K.group.rotation.y=qe.yaw,K.waypoints=[]):K.manual=!1,zt.push(Ft),K.target.set(...Ft),K.home=K.target.clone(),(Ge||K.manual&&z.id===Dt||Vt!==K.pose&&K.pose!=="meeting"&&!sn&&!zn)&&K.group.position.copy(K.target),!K.manual&&!Ge&&(K.pose==="playing"&&(bi!==K.game.id||Vt!=="playing")||(sn||K.pose==="meeting")&&(!dn||dn.distanceTo(K.home)>.1))){if(!S.free(K.group.position.x,K.group.position.z)){const Wt=S.nearest(K.group.position)||S.nearest({x:0,z:21.5});Wt&&K.group.position.set(Wt.x,Ft[1],Wt.z)}K.waypoints=S.withHomeAccess(le.slotFor(z.id),()=>S.path(K.group.position,K.home)).map(Wt=>new O(Wt.x,Ft[1],Wt.z))}else!["playing","meeting"].includes(K.pose)&&!sn&&(K.waypoints=[]);q&&K.pose==="meeting"&&(K.group.position.copy(K.home),K.group.rotation.y=K.facing,K.waypoints=[]),K.dot.className=`vo-dot ${z.state}`,K.name.textContent=z.name,K.icon.textContent=`${z.state==="offline"?"OFFLINE ":z.state==="idle"?"JEDA ":"ONLINE "}${K.pose==="meeting"?"💬":K.pose==="sleeping"?"☾ RUMAH":K.pose==="playing"?K.game.icon:K.pose==="coffee"?"☕":""}`,zn&&vn.bot&&z.id===vn.to&&(K.icon.textContent="OFFLINE · NPC "+K.game.icon),K.pose==="dancing"&&(K.icon.textContent=(z.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),K.label.setAttribute("aria-label",`${z.name}, ${z.state==="online"?"online":z.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),K.cup.visible=K.pose==="coffee",K.plate.visible=K.pose==="eating",K.manual&&(K.cup.visible=qe.action==="drink",K.plate.visible=qe.action==="eat",K.icon.textContent=(z.private?"PRIVAT · ":"ONLINE · ")+(qe.action==="run"?"BOOST":qe.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),K.racket.visible=K.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(K.game.id),K.tool.visible=K.pose==="playing"&&["billiards","archery","darts"].includes(K.game.id),K.tool.visible&&(K.tool.geometry=vt(K.game.id)),K.shoes.forEach(Wt=>{Wt.visible=K.pose!=="sleeping"}),K.manual||K.eyes.forEach(Wt=>{Wt.scale.y=K.pose==="sleeping"?.18:1}),K.ring.visible=nt===z.id,K.label.setAttribute("aria-pressed",String(nt===z.id))}le.select(ne??(T.get(nt)?.pose==="sleeping"?nt:null)),It()}const Kt=new O;function de(){const y=i.getBoundingClientRect(),L=[];for(const F of[...T.values()].sort((W,Y)=>+(Y.person.id===nt)-+(W.person.id===nt))){if(F.pose==="sleeping"){const Xe=le.location(F.person.id);Kt.set(Xe.x,5.2,Xe.z+1)}else F.group.getWorldPosition(Kt),Kt.y+=(I.form(F.person.id)?.height||1.8)+.55;Kt.project(h);const W=(Kt.x+1)/2*y.width,Y=(1-Kt.y)/2*y.height;if(te.active()&&F.person.id!==Dt){F.label.hidden=!0;continue}const bt=166,zt=27,Te=L.some(Xe=>Math.abs(Xe.x-W)<bt&&Math.abs(Xe.y-Y)<zt),pe=Kt.z<1&&Kt.z>-1&&W>18&&W<y.width-18&&Y>15&&Y<y.height-65&&(!Te||F.person.id===nt);F.label.hidden=!pe,pe&&(F.label.style.transform=`translate(${W}px,${Y}px) translate(-50%,-100%)`,L.push({x:W,y:Y}))}}function Gt(y=0){if(dt=null,_t||!yt)return;if(y-Ht<1e3/30&&(!q||X.active())){dt=requestAnimationFrame(Gt);return}const L=Math.min(.06,Math.max(.001,(y-Ht)/1e3));if(Ht=y,gt){const z=1-Math.exp(-L*18);h.position.lerp(ft,z),x.target.lerp(xt,z),h.position.distanceTo(ft)<.04&&(h.position.copy(ft),x.target.copy(xt),gt=!1)}let F=0;for(const z of T.values()){const K=q?0:y/1e3+z.phase;if(z.person.id===Dt&&Qt){const Vt=$?it.yaw():Math.atan2(h.position.x-x.target.x,h.position.z-x.target.z),dn=[...T.values()].filter(he=>he!==z&&he.pose!=="sleeping").map(he=>he.group.position),Kn=yi();let Je=Kn?{}:Fn;if((Je.x||Je.z||Je.jump)&&(we=null,Fe=null),we&&(we.elapsed=(we.elapsed||0)+L),we?.elapsed>4&&(we=null,Mi({...Qt.state(),restBlocked:!0})),we&&!Kn){const he=Qt.state();if(he.grounded)if(we.point||(we.point=oh(S,he,we.pose,dn)),!we.point)we=null;else{const zn=we.point.x-he.x,sn=we.point.z-he.z,Wt=Math.hypot(zn,sn);if(Wt<.04)Qt.face({x:he.x+Math.sin(we.point.yaw),z:he.z+Math.cos(we.point.yaw)}),Fe={action:"rest",pose:we.pose,venue:os(he,De)?"home":["beach","garden","terrace","lounge","bar"].find(rn=>jr(he,rn))||"campus"},we=null,Je={};else{const rn=Math.min(1,Wt/(4.5*L))/Wt;Je={x:(Math.cos(Vt)*zn-Math.sin(Vt)*sn)*rn,z:(-Math.sin(Vt)*zn-Math.cos(Vt)*sn)*rn}}}}const qe=I.modeState(Dt);(qe?.id||null)!==Bi&&(Bi=qe?.id||null,ce("follow",Dt)),Qt.setForm(I.form(Dt),qe?.expires),$&&!j.weapon&&!["susanoo","kurama"].includes(qe?.id)&&ut(!1);const Ft=Qt.step(L,Je,Vt,dn);if($&&(Qt.face({x:Ft.x-Math.sin(Vt)*10,z:Ft.z-Math.cos(Vt)*10}),Ft.yaw=Qt.state().yaw),["walk","run","jump","fly","land"].includes(Ft.action)&&(Fe=null),Fe&&Object.assign(Ft,Fe),Ft.transformation=qe,Ft.transformationCooldown=I.modeCooldown(Dt),Ft.restPending=!!we,z.group.position.set(Ft.x,Ft.y,Ft.z),z.group.rotation.y=Ft.yaw,z.manual=!0,z.pose="manual",z.home.copy(z.group.position),z.target.copy(z.group.position),Si){const he=Si==="home"&&De?{x:De.x,z:De.z+5}:hi.venues[Si];he&&(Ft.target=Si,Ft.distance=Math.round(Math.hypot(Ft.x-he.x,Ft.z-he.z)))}if(Ft.atHome=os(Ft,De),Ft.nearDoor=!!(De&&Math.hypot(Ft.x-De.x,Ft.z-De.z-3.9)<=2.8),Ft.doorOpen=ri,De){const he=os(Ft,De);he!==te.active()&&(Ye(),gt=!1,le.select(he?On:null),he&&(ve="follow",ke=Dt,x.enablePan=!1)),te.set(he?On:null,he?z.group:null),Ft.interior=he}else Ft.interior=!1;Mi({...Ft,...j,interior:te.active()}),z.icon.textContent=(z.person.private?"PRIVAT · ":"ONLINE · ")+(Ft.action==="run"?"BOOST":Ft.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(z.manual){const Vt=z.person.id===Dt&&Qt?{...Qt.state(),...j,...Fe||{}}:Z.get(z.person.id)||z.person.pilot;if(Vt&&$&&z.person.id===Dt&&(Vt.aim_pitch=-it.pitch()),X.observe(z.person.id,Vt,z,Date.now(),I.weaponAnchor(z.person.id)),Vt&&z.person.id!==Dt){const Ft=new O(Vt.x,Vt.y,Vt.z),he=z.group.position.clone().lerp(Ft,.35);Vt.respawn_id!==z.respawnId?(z.respawnId=Vt.respawn_id,z.group.position.copy(Ft)):S.segment(z.group.position,he,.3,!!(Vt.air_access||Vt.flight))?z.group.position.copy(he):z.group.position.copy(Ft),z.group.rotation.y=Vt.yaw}z.person.id!==Dt&&I.observe(z.person.id,Vt,z),z.flight=!!Vt?.flight,z.moving=["walk","run"].includes(Vt?.action);const dn=I.pose(z.person.id),Kn=p_(z,dn&&!["walk","run","jump","fly","land","rest"].includes(Vt?.action)?{...Vt,action:"cast",skillPose:dn}:Vt,{time:y/1e3+z.phase,dt:L,reduced:q});Vt?.weapon&&!Vt.form&&!["rest","play","drink","eat"].includes(Vt.action)&&(z.arms[1].rotation.x=-.7,z.arms[0].rotation.x=$&&z.person.id===Dt?-.9:-.2);const Je=Vt?.action==="play"?es.find(Ft=>Ft.id===Vt.venue):null;z.racket.visible=!!(Je&&["tennis","badminton","pingpong","golf"].includes(Je.id)),z.tool.visible=!!(Je&&["billiards","archery","darts"].includes(Je.id)),z.tool.visible&&(z.tool.geometry=vt(Je.id)),z.cup.visible=Vt?.action==="drink",z.plate.visible=Vt?.action==="eat",Vt?.action==="rest"&&(z.icon.textContent=Vt.pose==="nap"?"ONLINE · TIDUR SANTAI":Vt.pose==="recline"?"ONLINE · REBAHAN":Vt.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const qe=I.form(z.person.id);qe&&(z.icon.textContent=(z.person.private?"PRIVAT · ":"ONLINE · ")+qe.name+(Vt?.flight?" · TERBANG":"")),Kn.lying&&(!te.active()||z.person.id===Dt)&&(Ue.compose(new O(z.group.position.x+Math.sin(z.group.rotation.y)*.7,z.group.position.y+.035,z.group.position.z+Math.cos(z.group.rotation.y)*.7),z.group.quaternion,new O(1,1,1)),Xt.setMatrixAt(F++,Ue));continue}I.clearForm(z.person.id);const Ge=z.pose==="playing",bi=!q&&(Ge||z.waypoints?.length>0);if(z.target.copy(z.home),Ge&&!z.waypoints?.length&&(z.target.x+=Math.sin(K*.65)*(z.game.kind==="court"?1.4:.18),z.target.z+=Math.cos(K*.5)*(z.game.kind==="court"?.3:.08)),z.waypoints?.length&&!q){const Vt=z.waypoints[0];z.group.position.distanceTo(Vt)<.015?z.waypoints.shift():(z.group.rotation.y=Math.atan2(Vt.x-z.group.position.x,Vt.z-z.group.position.z),He(z,Vt,L*3.2))}else Ge?He(z,z.target,q?0:L*1.4):z.pose==="meeting"?(He(z,z.home,q?0:L*3.2),z.group.rotation.y=z.facing):z.group.position.copy(z.home);z.legs.forEach((Vt,dn)=>{Vt.rotation.x=bi?Math.sin(K*4+dn*Math.PI)*.32:z.pose==="working"||z.pose==="resting"?-1.1:0}),z.body.position.y=Math.sin(K*1.6)*(q?0:z.pose==="sleeping"?.007:.018),z.body.rotation.x=z.pose==="sleeping"?-Math.PI/2:0,z.body.rotation.z=Ge?Math.sin(K*1.5)*.07:0,z.head.rotation.x=z.pose==="sleeping"?0:Math.sin(K*.6)*(q?0:.025),z.arms[0].rotation.x=z.pose==="working"?-.65+Math.sin(K*5)*(q?0:.045):z.pose==="eating"?-1.05:.1,z.arms[1].rotation.x=z.pose==="working"?-.65+Math.sin(K*5+1)*(q?0:.045):z.pose==="coffee"?-1.2+Math.sin(K*1.2)*(q?0:.13):z.pose==="eating"?-.8+Math.sin(K*2)*(q?0:.13):.1,Ge&&(z.arms[1].rotation.x=-.6+Math.sin(K*2.3)*(q?0:.7),z.arms[0].rotation.x=-.25+Math.sin(K*2.3+1)*(q?0:.25)),z.pose==="dancing"&&!bi&&(z.body.rotation.z=q?0:Math.sin(K*2.4)*.13,z.arms.forEach((Vt,dn)=>{Vt.rotation.x=-.8+Math.sin(K*2.4+dn)*(q?0:.5)}),z.legs.forEach((Vt,dn)=>{Vt.rotation.x=q?0:Math.sin(K*2.4+dn*Math.PI)*.25})),z.pose==="meeting"?(z.arms[1].rotation.x=-.2+Math.sin(K*1.7)*(q||bi?0:.18),z.head.rotation.y=Math.sin(K*.7)*(q?0:.06)):z.head.rotation.y=0}Xt.count=F,Xt.instanceMatrix.needsUpdate=!0,I.update(Date.now(),Qt?.state()),X.update(Date.now(),q||Pn);const W=T.get(ke);if(!$&&ve!=="orbit"&&W&&!gt){const K=W.group.position.clone().add(new O(0,I.form(ke)?.height*.55||(W.pose==="sleeping"?.25:1.3),W.pose==="sleeping"?-1.3:0)).clone().sub(x.target).multiplyScalar(1-Math.exp(-L*8.6));x.target.add(K),h.position.add(K)}xe.update(y,{paused:q,dark:document.documentElement.classList.contains("dark"),center:x.target}),Jt.update(y,{paused:q,energySaver:Pn}),Me.update(y,q);const Y=new Set,bt=Xu(v());for(const z of T.values())if(z.manual){const K=z.person.id===Dt?Fe:Z.get(z.person.id)||z.person.pilot;K?.action==="play"&&Y.add(K.venue)}else!bt&&z.pose==="playing"&&Y.add(z.game.id);for(const{mesh:z,game:K}of Ee){const Ge=q?0:y/1e3,Vt=Y.has(K.id)?Math.sin(Ge*1.8):0;z.position.set(K.x+(K.id==="golf"?Vt*4:Vt*1.5),K.id==="pingpong"?1.45+Math.abs(Vt)*.65:K.id==="basketball"?.15+Math.abs(Vt)*2.2:K.id==="bowling"||K.id==="golf"?.06:.4+Math.abs(Vt)*2,K.z+Vt*(K.kind==="court"?4:1.3))}$&&W?(h.position.copy(W.group.position).add(new O(0,I.form(Dt)?.height*.55||1.2,0)),x.target.copy(h.position).addScaledVector(it.direction(),10)):x.update();const zt=h.position.clone(),Te=h.quaternion.clone();!$&&ve!=="orbit"&&W&&h.position.copy(D.resolve(S,x.target,zt,le.cameraBoxes(ke),te.active()?2.6:I.form(ke)?.height*.85||(ve==="portrait"?2.8:3.8),te.active()?8:I.form(ke)?55:35,L)),h.lookAt(x.target),h.updateMatrixWorld(!0),pt?pt.copy(h):pt=h.clone();const pe=N.update(T.get(k),h,{time:y/1e3,height:I.form(k)?.height||1.8,reduced:q||Pn});(q||y-V>100)&&(c(pe?{x:(pe.x+1)/2*i.clientWidth,y:(1-pe.y)/2*i.clientHeight,visible:pe.z>-1&&pe.z<1&&Math.abs(pe.x)<1&&Math.abs(pe.y)<1}:null),V=y),te.apply();const Xe=$?[T.get(Dt)?.group,I.weaponAnchor(Dt)].filter(Boolean).map(z=>[z,z.visible]):[];for(const[z]of Xe)z.visible=!1;const ze=$?X.firstPerson(Dt,h):()=>{};try{m.render(b,h)}finally{ze();for(const[z,K]of Xe)z.visible=K}(q||y-re>120||gt)&&(de(),re=y),h.position.copy(zt),h.quaternion.copy(Te),h.updateMatrixWorld(!0),(!q||X.active()||gt||we||Qt?.moving()||Qt&&Qt.state().stamina<100||!yi()&&(Math.abs(Fn.x||0)+Math.abs(Fn.z||0)>0||Fn.jump))&&It()}function It(){!_t&&yt&&dt===null&&(dt=requestAnimationFrame(Gt))}function He(y,L,F){const W=le.location(y.person.id),Y=W&&Math.abs(y.group.position.x-W.x)<4.8&&Math.abs(y.group.position.z-W.z)<5;return!!Y!=!!y.npcDoorOpen&&(y.npcDoorOpen=!!Y,le.setDoor(y.person.id,!!Y)),S.withHomeAccess(le.slotFor(y.person.id),()=>Ie(y,L,F))}function Ie(y,L,F){const W=S.move(y.group.position,L,F),Y=Math.hypot(W.x-y.group.position.x,W.z-y.group.position.z),bt=[...T.values()].some(zt=>zt!==y&&zt.pose!=="sleeping"&&Math.hypot(W.x-zt.group.position.x,W.z-zt.group.position.z)<.62);if(bt||y.group.position.set(W.x,y.home.y,W.z),(bt||Y<.001&&y.group.position.distanceTo(L)>.2)&&Ht>=(y.repathAt||0)&&(y.pose==="meeting"||y.waypoints?.length)){y.repathAt=Ht+1500;const zt=[...T.values()].filter(pe=>pe!==y&&pe.pose!=="sleeping").map(pe=>pe.group.position),Te=S.path(y.group.position,y.home,zt);Te.length&&(y.waypoints=Te.map(pe=>new O(pe.x,y.home.y,pe.z)))}}function Se(){if(_t)return;const y=i.getBoundingClientRect();y.width<1||y.height<1||(m.setSize(y.width,y.height,!1),h.aspect=y.width/y.height,h.updateProjectionMatrix(),It())}function Ye(y=!0){ne=null;const L=Ct;if(Ct=null,!L||(le.select(null),!y))return;ls(x);const F=T.get(L.followId)?.group.position,W=L.anchor&&F?F.clone().sub(L.anchor):new O;ve=L.mode,ke=L.followId,x.enablePan=L.pan,x.minDistance=L.min,x.maxDistance=L.max,h.fov=L.fov,h.updateProjectionMatrix(),h.position.copy(L.position).add(W),x.target.copy(L.target).add(W),xt.copy(L.focus).add(W),ft.copy(L.goal).add(W),gt=L.easing}function kt(y="all"){if(te.active()){ce("follow",Dt);return}Ye(!1),ls(x),ve="orbit",ke=null,h.fov=36,h.updateProjectionMatrix(),x.enablePan=!0,x.minDistance=8,x.maxDistance=650;const L=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const bt of es)F[bt.id]=[[bt.x,.3,bt.z],[bt.x+14,19,bt.z+22]];for(const[bt,zt]of Object.entries(wt))F[bt]=[zt,[zt[0]+12,19,zt[2]+22]];const[W,Y]=F[y]||F.all;if(xt.set(...W),ft.set(...Y),y==="all"||y==="residences"){const bt=le.bounds(),zt=y==="all"?76:bt.front,Te=bt.right-bt.left,pe=zt-bt.back;xt.set(0,0,(zt+bt.back)/2);const Xe=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),ze=Math.min(Vn.degToRad(h.fov/2),Math.atan(Math.tan(Vn.degToRad(h.fov/2))*Xe)),z=Math.hypot(Te,pe)/2/Math.sin(ze)*1.07;ft.copy(new O(1,1.18,1.3).normalize().multiplyScalar(z).add(xt))}else L&&ft.sub(xt).multiplyScalar(1.23).add(xt);ne=null,le.select(T.get(nt)?.pose==="sleeping"?nt:null),q?(h.position.copy(ft),x.target.copy(xt),gt=!1):gt=!0,It()}function en(y){if(te.active()){ce("follow",Dt);return}const L=le.location(y);L&&(ls(x),Ct||(Ct={mode:ve,followId:ke,anchor:T.get(ke)?.group.position.clone(),position:h.position.clone(),target:x.target.clone(),focus:xt.clone(),goal:ft.clone(),easing:gt,fov:h.fov,min:x.minDistance,max:x.maxDistance,pan:x.enablePan}),ve="orbit",ke=null,x.enablePan=!0,x.minDistance=5,x.maxDistance=650,h.fov=36,h.updateProjectionMatrix(),ne=y,le.select(y),xt.set(L.x,1.2,L.z),ft.copy(xt).add(new O(11,12,15)),i.clientWidth<600&&ft.sub(xt).multiplyScalar(1.23).add(xt),q?(h.position.copy(ft),x.target.copy(xt),gt=!1):gt=!0,It())}function ce(y,L=nt){if($&&ut(!1),D.reset(),te.active()&&(y="follow",L=Dt),Ye(!1),ls(x),y==="orbit"){ve="orbit",ke=null,h.fov=36,h.updateProjectionMatrix(),x.enablePan=!0,x.minDistance=5,x.maxDistance=650,It();return}!T.has(L)&&Bt.some(Y=>Y.id===L)&&(nt=L,Nt(Bt));const F=T.get(L);if(!F)return;const W=I.form(L);ve=y==="portrait"?"portrait":"follow",ke=L,x.enablePan=!1,x.minDistance=te.active()?2.6:W?W.height*.85:ve==="portrait"?2.8:3.8,x.maxDistance=te.active()?8:W?55:35,h.fov=te.active()?58:44,h.updateProjectionMatrix(),xt.copy(F.group.position).add(new O(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),W&&(xt.y=F.group.position.y+W.height*.55),ft.copy(xt).add(W?new O(W.height*.85,W.height*.65,W.height*1.1):ve==="portrait"?new O(1.8,.9,2.7):new O(4,2.5,5)),q?(h.position.copy(ft),x.target.copy(xt),gt=!1):gt=!0,It()}let mn=null;const nn=new fi({transparent:!0,opacity:0,depthWrite:!1});_.set("game-hotspots",nn);for(const y of es){const L=new an(6,1.4,.4),F=new an(y.kind==="court"?16:9,.18,y.kind==="court"?12:7);L.translate(0,.7,-(y.kind==="court"?6:4.2)),F.translate(0,-.14,0);const W=L.toNonIndexed(),Y=F.toNonIndexed(),bt=di([W,Y],!1);L.dispose(),F.dispose(),W.dispose(),Y.dispose(),M.add(bt);const zt=new be(bt,nn);zt.position.set(y.x,0,y.z),zt.userData.officeGame=y.id,b.add(zt),Q.push(zt)}const Ln=new mu,Zn=new Ut,oi=y=>{y.button===2&&(lt=!$,ut(!0)),Rt=[y.clientX,y.clientY],mn=[y.clientX,y.clientY]},me=y=>{if(!$||yi()||y.pointerType==="touch"&&!mn)return;const L=Rt;Rt=[y.clientX,y.clientY],document.pointerLockElement===m.domElement?it.move(y.movementX||0,y.movementY||0):L&&it.move(y.clientX-L[0],y.clientY-L[1]),It()},Qe=y=>{if(y.button===2){lt&&ut(!1),lt=!1,mn=null;return}if(!mn||Math.hypot(y.clientX-mn[0],y.clientY-mn[1])>6)return;if(mn=null,$&&!yi()){l(!1);return}const L=m.domElement.getBoundingClientRect();Zn.set((y.clientX-L.left)/L.width*2-1,-(y.clientY-L.top)/L.height*2+1),Ln.setFromCamera(Zn,pt||h);const F=Ln.intersectObjects([...T.values()].map(Y=>Y.group).concat(le.meshes,Jt.targets,Me.targets,Q,I.targets(),N.root.visible?[N.root]:[]),!0)[0],W=le.personForHit(F);if(W===On&&F?.object.userData.residenceLayer==="door"){o();return}W?(e(W),en(W)):F?.object.userData.officeHologramOwner?e(F.object.userData.officeHologramOwner):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function Tn(){const y=document.documentElement.classList.contains("dark");m.toneMappingExposure=y?1.02:1.18,xe.configure(xi,Pn),It()}const Oe=new ResizeObserver(Se);Oe.observe(i);const Ke=new MutationObserver(Tn);Ke.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const Bn=y=>{y.preventDefault(),_t||n()},Zs=y=>{($||j.weapon)&&y.preventDefault()},Qi=()=>{lt=!1,mn=null,ut(!1)},Zl=()=>{lt&&Qi()},Kl=y=>{y.button===2&&lt&&Qi()},Jl=()=>{$&&mt?.locked&&document.pointerLockElement!==m.domElement&&Qi(),mt&&(mt.locked=document.pointerLockElement===m.domElement)};document.addEventListener?.("pointerlockchange",Jl),window.addEventListener?.("blur",Qi),window.addEventListener?.("pointerup",Kl),m.domElement.addEventListener("pointercancel",Qi),m.domElement.addEventListener("lostpointercapture",Zl),m.domElement.addEventListener("pointerdown",oi,!0),m.domElement.addEventListener("pointermove",me),m.domElement.addEventListener("pointerup",Qe),m.domElement.addEventListener("contextmenu",Zs),m.domElement.addEventListener("webglcontextlost",Bn);let gs=null;const Du=()=>{if(gs){const y=h.position.clone().sub(x.target),L=gs.length(),F=y.length();L>.001&&F>.001&&g({orbit:gs.angleTo(y),zoom:Math.abs(Math.log(F/L))}),gs=y}It()};return x.addEventListener("change",Du),x.addEventListener("start",()=>{gt=!1,gs=h.position.clone().sub(x.target)}),x.addEventListener("end",()=>{gs=null}),Tn(),kt("all"),h.position.copy(ft),x.target.copy(xt),gt=!1,Se(),{setPeople:Nt,resize:Se,focusRoom:kt,visitHome:en,setCameraMode:ce,setAiming:ut,isAiming:()=>$,lockAim(){if($)try{m.domElement.requestPointerLock?.()?.catch?.(()=>{})}catch{}},aimPoint(y=65){if(!Qt)return null;const L=pt||h;if(Ln.setFromCamera(new Ut(0,0),L),$){const zt=Qt.state();Ln.ray.origin.set(zt.x,zt.y+(I.form(Dt)?.height*.55||1.2),zt.z),Ln.ray.direction.copy(it.direction())}const F=Ln.ray.origin.clone(),W=Ln.ray.at(y+($?0:h.position.distanceTo(x.target)),new O),Y=S.rayLimit(F,W);W.lerpVectors(F,W,Y);const bt=Ln.intersectObjects([...T.values()].filter(zt=>zt.person.id!==Dt).map(zt=>zt.group).concat(I.targets().filter(zt=>zt.userData.officeAbility!==Dt)),!0);return bt[0]&&bt[0].distance<F.distanceTo(W)&&W.copy(bt[0].point),Qt.face(W),It(),{x:W.x,y:W.y,z:W.z}},combatState:et,facePilot(y){const L=T.get(y);L&&Qt&&Qt.face(L.group.position)},respawnPilot(y){if(!Qt)return;ut(!1),te.leave(),Ye(!1),I.forget(Dt),$i=!1,Bi=null,Fe=null,we=null,Fn={},j={},et(y),Qt.reset({...y,flight:!1,air_access:!1}),ri=!1,S.configureHomes(!0,null,ms??128),On&&le.setDoor(On,!1);const L=T.get(Dt);L&&L.group.position.set(y.x,y.y,y.z),ce("follow",Dt),It()},showHologram(y){k=y!==null&&(y===On||y===Dt||T.get(y)?.person.is_me)?y:null,k===null&&N.hide(),It()},collisionBoxes:()=>S.boxes(),setPilotReporter(y){Mi=y},castSkill(y=0){const L=T.get(Dt);if(!L||!Qt)return{error:"Aktifkan kendali avatar dahulu."};const F=ku(Ql(L.person.avatar).costume)[y];return F?I.cooldown(Dt)?{error:`Pulihkan energi ${I.cooldown(Dt)} detik lagi.`}:F.type==="transform"&&(te.active()||!S.free(Qt.state().x,Qt.state().z,Qt.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&I.modeCooldown(Dt)?{error:`Transformasi pulih dalam ${I.modeCooldown(Dt)} detik.`}:(Fe=null,we=null,I.cast(Dt,F.id,L)?(It(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(y,L){if(!y||!Qt)return;et(y);const F=L?.receivedAt??Date.now(),W=L?.sentAt??F;if(Number.isFinite(y.updated_ms)&&I.clock(y.updated_ms-(W+F)/2,Math.max(0,F-W)),$i&&y.form)return;y.form||($i=!1),I.observe(Dt,y,T.get(Dt),!0);const Y=I.modeState(Dt);Qt.setForm(I.form(Dt),Y?.expires),It()},toggleFlight(){const y=Qt?.toggleFlight();return It(),y},endTransformation(){$i=!0,Bi=null,I.clearForm(Dt),Qt?.setForm(null),ce("follow",Dt),It()},activeTransformation:()=>I.modeState(Dt),setPrivatePilotProfile(y){Mn&&(Mn={...Mn,avatar:y},Nt(Bt.map(L=>L.id===Mn.id?Mn:L)))},setPilotGate(y){yi=y},reconcilePilot(y){Qt&&(Qt.reset(y),Fe=null,we=null,Fn={},It())},configureHome(y,L,F=null){On=y,De=L?_a(L.slot):null,ms=Number.isInteger(F)?Math.min(128,F):null,le.setPlots(ms??0)},canUseDoor(){const y=Qt?.state();return!!(De&&y&&(os(y,De)||Math.hypot(y.x-De.x,y.z-De.z-3.9)<=2.8))},homeDoorOpen:()=>ri,setHomeDoor(y){ri!==!!y&&(ri=!!y,S.configureHomes(!0,ri?De?.slot:null),On&&le.setDoor(On,ri),It())},setRestPose(y){if(!Qt)return!1;if(y&&ut(!1),I.cancel(Dt),we=null,Fe=null,Fn={},!y)return It(),!0;if(!["sit","recline","nap","meditate"].includes(y))return!1;const L=Qt.state(),F=[...T.values()].filter(Y=>Y.person.id!==Dt&&Y.pose!=="sleeping").map(Y=>Y.group.position),W=L.grounded?oh(S,L,y,F):null;return L.grounded&&!W?!1:(we={pose:y,point:W},W&&Math.hypot(W.x-L.x,W.z-L.z)<.04&&(Qt.face({x:L.x+Math.sin(W.yaw),z:L.z+Math.cos(W.yaw)}),Fe={action:"rest",pose:y,venue:os(L,De)?"home":["beach","garden","terrace","lounge","bar"].find(Y=>jr(L,Y))||"campus"},we=null),It(),!0)},setPilot(y,L,F=null){Dt=y,Mn=F,j={},et(L),Qt=h_(S,L),Nt(Bt),ce("follow",y),It()},releasePilot(){ut(!1),te.leave(),I.clearForm(Dt),$i=!1,Bi=null;const y=Mn?.id;Dt=null,Mn=null,Qt=null,Fn={},Fe=null,we=null,Si=null,tt.visible=!1,Nt(Bt.filter(L=>L.id!==y))},setPilotInput(y){Fn=y||{},It()},pilotState(){return Qt?{...Qt.state(),...j,...Fe||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Dt&&(ce("follow",Dt),i.focus?.({preventScroll:!0}))},setPeerPilots(y){Z.clear();for(const L of y)L.id!==Dt&&Z.set(L.id,L);Nt(Bt.map(L=>({...L,pilot:Z.get(L.id)||null,in_office:Z.has(L.id)||L.id===Dt})))},canInteract(y){return jr(Qt?.state(),y)},guideTo(y){const L=y==="home"&&De?{x:De.x,z:De.z+5}:hi.venues[y];if(Si=L?y:null,tt.visible=!!L,L){tt.position.set(L.x,.025,L.z);const F=Qt?.state();Mi({...F,target:y,distance:F?Math.round(Math.hypot(L.x-F.x,L.z-F.z)):null}),It()}return L},interactNearest(){const y=Qt?.state();if(!y)return!1;if(De&&(os(y,De)||Math.hypot(y.x-De.x,y.z-De.z-3.9)<=2.8))return o(),!0;const L=Object.keys(hi.venues).filter(F=>jr(y,F)).sort((F,W)=>Math.hypot(y.x-hi.venues[F].x,y.z-hi.venues[F].z)-Math.hypot(y.x-hi.venues[W].x,y.z-hi.venues[W].z))[0];return es.some(F=>F.id===L)?(r(L),!0):["bar","disco","beach","garden","terrace","lounge","armory"].includes(L)?(s(L),!0):!1},setRecreation(y,L){Number(y)===Dt&&L&&(Fe={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[L.kind]||"idle",venue:L.destination,pose:L.kind==="relax"?"sit":null}),qs.set(Number(y),L?{...L,until:L.until||Date.now()/1e3+900}:null),Nt(Bt)},setVenueEffects(y){Jt.setEnabled(y),It()},setGame(y){JSON.stringify(vn)!==JSON.stringify(y)&&(vn=y,Dt&&y?.status==="playing"&&[y.from,y.to].includes(Dt)?Fe={action:"play",venue:y.kind}:Fe?.action==="play"&&(Fe=null),Nt(Bt))},say(y,L){const F=T.get(Number(y));F&&(F.bubble.textContent=String(L||"").slice(0,350),F.bubble.hidden=!1,vi.has(y)&&clearTimeout(vi.get(y)),vi.set(y,setTimeout(()=>{F.bubble.hidden=!0,vi.delete(y),It()},1e4)),It())},configureWorld(y){xi=y||{},xe.configure(xi,Pn),At("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[xi.settings?.landscape]||"#47695f"),It()},setEnergySaver(y){Pn=!!y,m.setPixelRatio(Pn?1:Math.min(window.devicePixelRatio||1,1.5)),xe.configure(xi,Pn),Se()},setMeeting(y){ie=y,Nt(Bt)},meetingReady(){if(Dt&&ie?.connected&&ie.room){const L=T.get(ie.room.from),F=T.get(ie.room.to);if(!L||!F||L.group.position.distanceTo(F.group.position)>3)return!1;const W=F.group.position.x-L.group.position.x,Y=F.group.position.z-L.group.position.z,bt=Math.hypot(W,Y);return bt>.2&&(Math.sin(L.group.rotation.y)*W+Math.cos(L.group.rotation.y)*Y)/bt>.45&&(-Math.sin(F.group.rotation.y)*W-Math.cos(F.group.rotation.y)*Y)/bt>.45}const y=ie?.room;return!y||!ie.connected?!1:[y.from,y.to].every(L=>{const F=T.get(L);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(y,L=!1){nt!==y&&Ye(),nt=y,y&&!T.has(y)&&Bt.some(W=>W.id===y)&&Nt(Bt);for(const[W,Y]of T)Y.ring.visible=W===y,Y.label.setAttribute("aria-pressed",String(W===y));const F=T.get(y);if(le.select(ne??(F?.pose==="sleeping"?y:null)),F&&L&&Dt&&y!==Dt&&Qt){Qt.face(F.group.position),It();return}if(F&&L&&ve!=="orbit"){ce(ve,y);return}if(F&&L&&F.pose==="sleeping"){en(y);return}F&&L&&(xt.copy(F.target).add(new O(0,1,0)),ft.copy(xt).add(new O(11,11,14)),q?(h.position.copy(ft),x.target.copy(xt)):gt=!0),It()},zoom(y){if(!Number.isFinite(y)||y<=0)return;gt=!1;const L=h.position.clone().sub(x.target),F=L.length();L.setLength(Vn.clamp(F*y,x.minDistance,x.maxDistance)),h.position.copy(x.target).add(L),x.update(),F>.001&&g({orbit:0,zoom:Math.abs(Math.log(L.length()/F))}),It()},setPaused(y){if(q=y,q&&gt&&(h.position.copy(ft),x.target.copy(xt),gt=!1),q)for(const L of T.values())L.pose==="meeting"&&(L.group.position.copy(L.home),L.group.rotation.y=L.facing,L.waypoints=[]);dt!==null&&cancelAnimationFrame(dt),dt=null,It()},setVisible(y){yt=y,!y&&dt!==null?(cancelAnimationFrame(dt),dt=null):y&&(Ht=0,Se(),It())},dispose(){_t=!0,dt!==null&&cancelAnimationFrame(dt),dt=null,Oe.disconnect(),Ke.disconnect(),x.dispose(),te.dispose(),I.dispose(),N.dispose(),X.dispose();for(const y of vi.values())clearTimeout(y);vi.clear(),qs.clear(),m.domElement.removeEventListener("pointerdown",oi,!0),m.domElement.removeEventListener("pointermove",me),m.domElement.removeEventListener("pointerup",Qe),m.domElement.removeEventListener("contextmenu",Zs),m.domElement.removeEventListener("webglcontextlost",Bn),document.removeEventListener?.("pointerlockchange",Jl),document.pointerLockElement===m.domElement&&document.exitPointerLock?.(),window.removeEventListener?.("blur",Qi),window.removeEventListener?.("pointerup",Kl),m.domElement.removeEventListener("pointercancel",Qi),m.domElement.removeEventListener("lostpointercapture",Zl),le.dispose(),Xt.dispose(),xe.dispose();for(const y of M)y.dispose();for(const y of _.values())y.dispose();for(const y of R)y.dispose();T.forEach(y=>y.label.remove()),T.clear(),b.clear(),m.dispose(),m.forceContextLoss(),m.domElement.remove()}}}export{y_ as createOfficeScene};
