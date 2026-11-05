import{m as Gn,w as cu,c as hu,g as wi,s as uu,a as bl,p as fu,b as du,d as pu,i as mu}from"./virtual-office-BrzdGRXH.js";const Ao="187",Ui={ROTATE:0,DOLLY:1,PAN:2},Ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ic=0,Sa=1,Nc=2,Is=1,Uc=2,is=3,_i=0,an=1,en=2,Fi=0,ss=1,Vs=2,ya=3,ba=4,Fc=5,Ii=100,Oc=101,Bc=102,zc=103,Gc=104,kc=200,Hc=201,Vc=202,Wc=203,Ia=204,Na=205,Xc=206,Yc=207,qc=208,Zc=209,Kc=210,Jc=211,$c=212,Qc=213,jc=214,Ir=0,Nr=1,Ur=2,as=3,Fr=4,Or=5,Br=6,zr=7,Ua=0,th=1,eh=2,Yn=0,Fa=1,Oa=2,Ba=3,wo=4,za=5,Ga=6,ka=7,Ha=300,Oi=301,ls=302,wr=303,Rr=304,Gr=1e3,Xn=1001,kr=1002,Je=1003,nh=1004,Ls=1005,on=1006,Cr=1007,ni=1008,fn=1009,Va=1010,Wa=1011,cs=1012,Ro=1013,In=1014,En=1015,Nn=1016,Co=1017,Po=1018,Bi=1020,Xa=35902,Ya=35899,qa=1021,Za=1022,Ln=1023,oi=1026,ii=1027,Lo=1028,Do=1029,xi=1030,Io=1031,No=1033,Ns=33776,Us=33777,Fs=33778,Os=33779,Hr=35840,Vr=35841,Wr=35842,Xr=35843,Yr=36196,qr=37492,Zr=37496,Kr=37488,Jr=37489,Ws=37490,$r=37491,Qr=37808,jr=37809,to=37810,eo=37811,no=37812,io=37813,so=37814,ro=37815,oo=37816,ao=37817,lo=37818,co=37819,ho=37820,uo=37821,fo=36492,po=36494,mo=36495,go=36283,_o=36284,Xs=36285,xo=36286,ih=3200,vo=0,sh=1,ei="",rn="srgb",Ys="srgb-linear",qs="linear",Ae="srgb",Pr=7680,rh=519,oh=512,ah=513,lh=514,Ka=515,ch=516,hh=517,Ja=518,$a=519,uh=35044,Qa=35048,Ea="300 es",Tn=2e3,hs=2001;function gu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Mo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fh(){const i=Mo("canvas");return i.style.display="block",i}const El={};function Ta(...i){const t="THREE."+i.shift();console.log(t,...i)}function dh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Jt(...i){i=dh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ve(...i){i=dh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Bs(...i){const t=i.join(" ");t in El||(El[t]=!0,Jt(...i))}function _u(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const xu={[Ir]:Ir,[Ur]:Br,[Fr]:Fr,[as]:Or,[Nr]:Nr,[Br]:Ur,[zr]:zr,[Or]:as};class li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tl=1234567;const zs=Math.PI/180,Zs=180/Math.PI;function ps(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(je[i&255]+je[i>>8&255]+je[i>>16&255]+je[i>>24&255]+"-"+je[t&255]+je[t>>8&255]+"-"+je[t>>16&15|64]+je[t>>24&255]+"-"+je[e&63|128]+je[e>>8&255]+"-"+je[e>>16&255]+je[e>>24&255]+je[n&255]+je[n>>8&255]+je[n>>16&255]+je[n>>24&255]).toLowerCase()}function he(i,t,e){return Math.max(t,Math.min(e,i))}function ja(i,t){return(i%t+t)%t}function vu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Mu(i,t,e){return i!==t?(e-i)/(t-i):0}function Gs(i,t,e){return(1-e)*i+e*t}function Su(i,t,e,n){return Gs(i,t,1-Math.exp(-e*n))}function yu(i,t=1){return t-Math.abs(ja(i,t*2)-t)}function bu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Eu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Tu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Au(i,t){return i+Math.random()*(t-i)}function wu(i){return i*(.5-Math.random())}function Ru(i){i!==void 0&&(Tl=i);let t=Tl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cu(i){return i*zs}function Pu(i){return i*Zs}function Lu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Du(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ph(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Iu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),m=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),_=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*m,c*u,a*l);break;case"YZY":i.set(c*u,a*d,c*m,a*l);break;case"ZXZ":i.set(c*m,c*u,a*d,a*l);break;case"XZX":i.set(a*d,c*_,c*p,a*l);break;case"YXY":i.set(c*p,a*d,c*_,a*l);break;case"ZYZ":i.set(c*_,c*p,a*d,a*l);break;default:Jt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function tl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function mh(i,t){if(t.constructor===Float32Array)return i;const e=tl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function gh(i,t){if(t.constructor===Float32Array)return i;const e=tl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const rs={DEG2RAD:zs,RAD2DEG:Zs,generateUUID:ps,clamp:he,euclideanModulo:ja,mapLinear:vu,inverseLerp:Mu,lerp:Gs,damp:Su,pingpong:yu,smoothstep:bu,smootherstep:Eu,randInt:Tu,randFloat:Au,randFloatSpread:wu,seededRandom:Ru,degToRad:Cu,radToDeg:Pu,isPowerOfTwo:Lu,ceilPowerOfTwo:Du,floorPowerOfTwo:ph,setQuaternionFromProperEuler:Iu,normalize:gh,denormalize:mh},vl=class vl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};vl.prototype.isVector2=!0;let Nt=vl;class dn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],m=n[s+3],u=r[o+0],p=r[o+1],_=r[o+2],b=r[o+3];if(m!==b||c!==u||l!==p||d!==_){let f=c*u+l*p+d*_+m*b;f<0&&(u=-u,p=-p,_=-_,b=-b,f=-f);let g=1-a;if(f<.9995){const S=Math.acos(f),T=Math.sin(S);g=Math.sin(g*S)/T,a=Math.sin(a*S)/T,c=c*g+u*a,l=l*g+p*a,d=d*g+_*a,m=m*g+b*a}else{c=c*g+u*a,l=l*g+p*a,d=d*g+_*a,m=m*g+b*a;const S=1/Math.sqrt(c*c+l*l+d*d+m*m);c*=S,l*=S,d*=S,m*=S}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],m=r[o],u=r[o+1],p=r[o+2],_=r[o+3];return t[e]=a*_+d*m+c*p-l*u,t[e+1]=c*_+d*u+l*m-a*p,t[e+2]=l*_+d*p+a*u-c*m,t[e+3]=d*_-a*m-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),m=a(r/2),u=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=u*d*m+l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m-u*p*_;break;case"YXZ":this._x=u*d*m+l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m+u*p*_;break;case"ZXY":this._x=u*d*m-l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m-u*p*_;break;case"ZYX":this._x=u*d*m-l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m+u*p*_;break;case"YZX":this._x=u*d*m+l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m-u*p*_;break;case"XZY":this._x=u*d*m-l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m+u*p*_;break;default:Jt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],m=e[10],u=n+a+m;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>m){const p=2*Math.sqrt(1+n-a-m);this._w=(d-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>m){const p=2*Math.sqrt(1+a-n-m);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+m-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ml=class Ml{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Al.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Al.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),m=2*(r*n-o*e);return this.x=e+c*l+o*m-a*d,this.y=n+c*d+a*l-r*m,this.z=s+c*m+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this.z=he(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this.z=he(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zo.copy(this).projectOnVector(t),this.sub(Zo)}reflect(t){return this.sub(Zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ml.prototype.isVector3=!0;let O=Ml;const Zo=new O,Al=new dn,Sl=class Sl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],m=n[7],u=n[2],p=n[5],_=n[8],b=s[0],f=s[3],g=s[6],S=s[1],T=s[4],E=s[7],M=s[2],x=s[5],h=s[8];return r[0]=o*b+a*S+c*M,r[3]=o*f+a*T+c*x,r[6]=o*g+a*E+c*h,r[1]=l*b+d*S+m*M,r[4]=l*f+d*T+m*x,r[7]=l*g+d*E+m*h,r[2]=u*b+p*S+_*M,r[5]=u*f+p*T+_*x,r[8]=u*g+p*E+_*h,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],m=d*o-a*l,u=a*c-d*r,p=l*r-o*c,_=e*m+n*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/_;return t[0]=m*b,t[1]=(s*l-d*n)*b,t[2]=(a*n-s*o)*b,t[3]=u*b,t[4]=(d*e-s*c)*b,t[5]=(s*r-a*e)*b,t[6]=p*b,t[7]=(n*c-l*e)*b,t[8]=(o*e-n*r)*b,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ko.makeScale(t,e)),this}rotate(t){return Bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ko.makeRotation(-t)),this}translate(t,e){return Bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Sl.prototype.isMatrix3=!0;let ee=Sl;const Ko=new ee,wl=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rl=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nu(){const i={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ae&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ae&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ys]:{primaries:t,whitePoint:n,transfer:qs,toXYZ:wl,fromXYZ:Rl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:t,whitePoint:n,transfer:Ae,toXYZ:wl,fromXYZ:Rl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),i}const pe=Nu();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Wi;class _h{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=Mo("canvas")),Wi.width=t.width,Wi.height=t.height;const s=Wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Mo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return Jt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uu=0;class Uo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=ps(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Jo(s[o].image)):r.push(Jo(s[o]))}else r=Jo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Jo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_h.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Jt("Texture: Unable to serialize Texture."),{})}let Fu=0;const $o=new O;class $e extends li{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=Xn,s=Xn,r=on,o=ni,a=Ln,c=fn,l=$e.DEFAULT_ANISOTROPY,d=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=ps(),this.name="",this.source=new Uo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize($o).x}get height(){return this.source.getSize($o).y}get depth(){return this.source.getSize($o).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Jt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Jt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ha)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gr:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case kr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gr:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case kr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=Ha;$e.DEFAULT_ANISOTROPY=1;const yl=class yl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],d=c[4],m=c[8],u=c[1],p=c[5],_=c[9],b=c[2],f=c[6],g=c[10];if(Math.abs(d-u)<.01&&Math.abs(m-b)<.01&&Math.abs(_-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(m+b)<.1&&Math.abs(_+f)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,E=(p+1)/2,M=(g+1)/2,x=(d+u)/4,h=(m+b)/4,v=(_+f)/4;return T>E&&T>M?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=x/n,r=h/n):E>M?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=x/s,r=v/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=h/r,s=v/r),this.set(n,s,r,e),this}let S=Math.sqrt((f-_)*(f-_)+(m-b)*(m-b)+(u-d)*(u-d));return Math.abs(S)<.001&&(S=1),this.x=(f-_)/S,this.y=(m-b)/S,this.z=(u-d)/S,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this.z=he(this.z,t.z,e.z),this.w=he(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this.z=he(this.z,t,e),this.w=he(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};yl.prototype.isVector4=!0;let Ie=yl;class xh extends li{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new $e({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Uo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends xh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class el extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vh extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const To=class To{constructor(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f)}set(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=d,g[10]=m,g[14]=u,g[3]=p,g[7]=_,g[11]=b,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new To().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){const u=o*d,p=o*m,_=a*d,b=a*m;e[0]=c*d,e[4]=-c*m,e[8]=l,e[1]=p+_*l,e[5]=u-b*l,e[9]=-a*c,e[2]=b-u*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*d,p=c*m,_=l*d,b=l*m;e[0]=u+b*a,e[4]=_*a-p,e[8]=o*l,e[1]=o*m,e[5]=o*d,e[9]=-a,e[2]=p*a-_,e[6]=b+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*d,p=c*m,_=l*d,b=l*m;e[0]=u-b*a,e[4]=-o*m,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*d,e[9]=b-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*d,p=o*m,_=a*d,b=a*m;e[0]=c*d,e[4]=_*l-p,e[8]=u*l+b,e[1]=c*m,e[5]=b*l+u,e[9]=p*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,p=o*l,_=a*c,b=a*l;e[0]=c*d,e[4]=b-u*m,e[8]=_*m+p,e[1]=m,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=p*m+_,e[10]=u-b*m}else if(t.order==="XZY"){const u=o*c,p=o*l,_=a*c,b=a*l;e[0]=c*d,e[4]=-m,e[8]=l*d,e[1]=u*m+b,e[5]=o*d,e[9]=p*m-_,e[2]=_*m-p,e[6]=a*d,e[10]=b*m+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ou,t,Bu)}lookAt(t,e,n){const s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),ui.crossVectors(n,gn),ui.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),ui.crossVectors(n,gn)),ui.normalize(),js.crossVectors(gn,ui),s[0]=ui.x,s[4]=js.x,s[8]=gn.x,s[1]=ui.y,s[5]=js.y,s[9]=gn.y,s[2]=ui.z,s[6]=js.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],m=n[5],u=n[9],p=n[13],_=n[2],b=n[6],f=n[10],g=n[14],S=n[3],T=n[7],E=n[11],M=n[15],x=s[0],h=s[4],v=s[8],P=s[12],C=s[1],w=s[5],D=s[9],B=s[13],I=s[2],k=s[6],U=s[10],V=s[14],at=s[3],$=s[7],j=s[11],ct=s[15];return r[0]=o*x+a*C+c*I+l*at,r[4]=o*h+a*w+c*k+l*$,r[8]=o*v+a*D+c*U+l*j,r[12]=o*P+a*B+c*V+l*ct,r[1]=d*x+m*C+u*I+p*at,r[5]=d*h+m*w+u*k+p*$,r[9]=d*v+m*D+u*U+p*j,r[13]=d*P+m*B+u*V+p*ct,r[2]=_*x+b*C+f*I+g*at,r[6]=_*h+b*w+f*k+g*$,r[10]=_*v+b*D+f*U+g*j,r[14]=_*P+b*B+f*V+g*ct,r[3]=S*x+T*C+E*I+M*at,r[7]=S*h+T*w+E*k+M*$,r[11]=S*v+T*D+E*U+M*j,r[15]=S*P+T*B+E*V+M*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],m=t[6],u=t[10],p=t[14],_=t[3],b=t[7],f=t[11],g=t[15],S=c*p-l*u,T=a*p-l*m,E=a*u-c*m,M=o*p-l*d,x=o*u-c*d,h=o*m-a*d;return e*(b*S-f*T+g*E)-n*(_*S-f*M+g*x)+s*(_*T-b*M+g*h)-r*(_*E-b*x+f*h)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],d=t[10];return e*(o*d-a*l)-n*(r*d-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],m=t[9],u=t[10],p=t[11],_=t[12],b=t[13],f=t[14],g=t[15],S=e*a-n*o,T=e*c-s*o,E=e*l-r*o,M=n*c-s*a,x=n*l-r*a,h=s*l-r*c,v=d*b-m*_,P=d*f-u*_,C=d*g-p*_,w=m*f-u*b,D=m*g-p*b,B=u*g-p*f,I=S*B-T*D+E*w+M*C-x*P+h*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return t[0]=(a*B-c*D+l*w)*k,t[1]=(s*D-n*B-r*w)*k,t[2]=(b*h-f*x+g*M)*k,t[3]=(u*x-m*h-p*M)*k,t[4]=(c*C-o*B-l*P)*k,t[5]=(e*B-s*C+r*P)*k,t[6]=(f*E-_*h-g*T)*k,t[7]=(d*h-u*E+p*T)*k,t[8]=(o*D-a*C+l*v)*k,t[9]=(n*C-e*D-r*v)*k,t[10]=(_*x-b*E+g*S)*k,t[11]=(m*E-d*x-p*S)*k,t[12]=(a*P-o*w-c*v)*k,t[13]=(e*w-n*P+s*v)*k,t[14]=(b*T-_*M-f*S)*k,t[15]=(d*M-m*T+u*S)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,m=a+a,u=r*l,p=r*d,_=r*m,b=o*d,f=o*m,g=a*m,S=c*l,T=c*d,E=c*m,M=n.x,x=n.y,h=n.z;return s[0]=(1-(b+g))*M,s[1]=(p+E)*M,s[2]=(_-T)*M,s[3]=0,s[4]=(p-E)*x,s[5]=(1-(u+g))*x,s[6]=(f+S)*x,s[7]=0,s[8]=(_+T)*h,s[9]=(f-S)*h,s[10]=(1-(u+b))*h,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Xi.set(s[0],s[1],s[2]).length();const a=Xi.set(s[4],s[5],s[6]).length(),c=Xi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),wn.copy(this);const l=1/o,d=1/a,m=1/c;return wn.elements[0]*=l,wn.elements[1]*=l,wn.elements[2]*=l,wn.elements[4]*=d,wn.elements[5]*=d,wn.elements[6]*=d,wn.elements[8]*=m,wn.elements[9]*=m,wn.elements[10]*=m,e.setFromRotationMatrix(wn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,d=2*r/(e-t),m=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s);let _,b;if(c)_=r/(o-r),b=o*r/(o-r);else if(a===Tn)_=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===hs)_=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=m,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,d=2/(e-t),m=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s);let _,b;if(c)_=1/(o-r),b=o/(o-r);else if(a===Tn)_=-2/(o-r),b=-(o+r)/(o-r);else if(a===hs)_=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=m,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};To.prototype.isMatrix4=!0;let me=To;const Xi=new O,wn=new me,Ou=new O(0,0,0),Bu=new O(1,1,1),ui=new O,js=new O,gn=new O,Cl=new me,Pl=new dn;class Un{constructor(t=0,e=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],m=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(he(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-he(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(he(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-he(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(he(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Jt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Pl.setFromEuler(this),this.setFromQuaternion(Pl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class Fo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zu=0;const Ll=new O,Yi=new dn,Jn=new me,tr=new O,ys=new O,Gu=new O,ku=new dn,Dl=new O(1,0,0),Il=new O(0,1,0),Nl=new O(0,0,1),Ul={type:"added"},Hu={type:"removed"},qi={type:"childadded",child:null},Qo={type:"childremoved",child:null};class ke extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new O,e=new Un,n=new dn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new ee}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(Dl,t)}rotateY(t){return this.rotateOnAxis(Il,t)}rotateZ(t){return this.rotateOnAxis(Nl,t)}translateOnAxis(t,e){return Ll.copy(t).applyQuaternion(this.quaternion),this.position.add(Ll.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dl,t)}translateY(t){return this.translateOnAxis(Il,t)}translateZ(t){return this.translateOnAxis(Nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?tr.copy(t):tr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(ys,tr,this.up):Jn.lookAt(tr,ys,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(Jn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ve("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ul),qi.child=t,this.dispatchEvent(qi),qi.child=null):ve("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hu),Qo.child=t,this.dispatchEvent(Qo),Qo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ul),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,t,Gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,ku,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const m=c[l];r(t.shapes,m)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),m=o(t.shapes),u=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),m.length>0&&(n.shapes=m),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ke.DEFAULT_UP=new O(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xn extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vu={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const b of t.hand.values()){const f=e.getJointPose(b,n),g=this._getHandJoint(l,b);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}const d=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],u=d.position.distanceTo(m.position),p=.02,_=.005;l.inputState.pinching&&u>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vu)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new xn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},er={h:0,s:0,l:0};function jo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class se{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=pe.workingColorSpace){if(t=ja(t,1),e=he(e,0,1),n=he(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=jo(o,r,t+1/3),this.g=jo(o,r,t),this.b=jo(o,r,t-1/3)}return pe.colorSpaceToWorking(this,s),this}setStyle(t,e=rn){function n(r){r!==void 0&&parseFloat(r)<1&&Jt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Jt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Jt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){const n=Mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Jt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return pe.workingToColorSpace(tn.copy(this),t),Math.round(he(tn.r*255,0,255))*65536+Math.round(he(tn.g*255,0,255))*256+Math.round(he(tn.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.workingToColorSpace(tn.copy(this),e);const n=tn.r,s=tn.g,r=tn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const m=o-a;switch(l=d<=.5?m/(o+a):m/(2-o-a),o){case n:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-n)/m+2;break;case r:c=(n-s)/m+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=pe.workingColorSpace){return pe.workingToColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=rn){pe.workingToColorSpace(tn.copy(this),t);const e=tn.r,n=tn.g,s=tn.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(fi),this.setHSL(fi.h+t,fi.s+e,fi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fi),t.getHSL(er);const n=Gs(fi.h,er.h,e),s=Gs(fi.s,er.s,e),r=Gs(fi.l,er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new se;se.NAMES=Mh;class Oo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new se(t),this.density=e}clone(){return new Oo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sh extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Rn=new O,$n=new O,ta=new O,Qn=new O,Zi=new O,Ki=new O,Fl=new O,ea=new O,na=new O,ia=new O,sa=new Ie,ra=new Ie,oa=new Ie;class bn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Rn.subVectors(t,e),s.cross(Rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Rn.subVectors(s,e),$n.subVectors(n,e),ta.subVectors(t,e);const o=Rn.dot(Rn),a=Rn.dot($n),c=Rn.dot(ta),l=$n.dot($n),d=$n.dot(ta),m=o*l-a*a;if(m===0)return r.set(0,0,0),null;const u=1/m,p=(l*c-a*d)*u,_=(o*d-a*c)*u;return r.set(1-p-_,_,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qn.x),c.addScaledVector(o,Qn.y),c.addScaledVector(a,Qn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return sa.setScalar(0),ra.setScalar(0),oa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,n),oa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(sa,r.x),o.addScaledVector(ra,r.y),o.addScaledVector(oa,r.z),o}static isFrontFacing(t,e,n,s){return Rn.subVectors(n,e),$n.subVectors(t,e),Rn.cross($n).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Rn.cross($n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return bn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Zi.subVectors(s,n),Ki.subVectors(r,n),ea.subVectors(t,n);const c=Zi.dot(ea),l=Ki.dot(ea);if(c<=0&&l<=0)return e.copy(n);na.subVectors(t,s);const d=Zi.dot(na),m=Ki.dot(na);if(d>=0&&m<=d)return e.copy(s);const u=c*m-d*l;if(u<=0&&c>=0&&d<=0&&c-d>0)return o=c/(c-d),e.copy(n).addScaledVector(Zi,o);ia.subVectors(t,r);const p=Zi.dot(ia),_=Ki.dot(ia);if(_>=0&&p<=_)return e.copy(r);const b=p*l-c*_;if(b<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(Ki,a);const f=d*_-p*m;if(f<=0&&m-d>=0&&p-_>=0)return Fl.subVectors(r,s),a=(m-d)/(m-d+(p-_)),e.copy(s).addScaledVector(Fl,a);const g=1/(f+b+u);return o=b*g,a=u*g,e.copy(n).addScaledVector(Zi,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Mi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)),nr.applyMatrix4(t.matrixWorld),this.union(nr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bs),ir.subVectors(this.max,bs),Ji.subVectors(t.a,bs),$i.subVectors(t.b,bs),Qi.subVectors(t.c,bs),di.subVectors($i,Ji),pi.subVectors(Qi,$i),Ri.subVectors(Ji,Qi);let e=[0,-di.z,di.y,0,-pi.z,pi.y,0,-Ri.z,Ri.y,di.z,0,-di.x,pi.z,0,-pi.x,Ri.z,0,-Ri.x,-di.y,di.x,0,-pi.y,pi.x,0,-Ri.y,Ri.x,0];return!aa(e,Ji,$i,Qi,ir)||(e=[1,0,0,0,1,0,0,0,1],!aa(e,Ji,$i,Qi,ir))?!1:(sr.crossVectors(di,pi),e=[sr.x,sr.y,sr.z],aa(e,Ji,$i,Qi,ir))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const jn=[new O,new O,new O,new O,new O,new O,new O,new O],Cn=new O,nr=new Mi,Ji=new O,$i=new O,Qi=new O,di=new O,pi=new O,Ri=new O,bs=new O,ir=new O,sr=new O,Ci=new O;function aa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ci.fromArray(i,r);const a=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),c=t.dot(Ci),l=e.dot(Ci),d=n.dot(Ci);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const Ge=new O,rr=new Nt;let Wu=0;class ln extends li{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=uh,this.updateRanges=[],this.gpuType=En,this.version=0,this._normalizationScale=t!==void 0?tl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):mh(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):gh(t,this.array)}}class nl extends ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class il extends ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class we extends ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Xu=new Mi,Es=new O,la=new O;class Si{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Xu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Es.subVectors(t,this.center);const e=Es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Es.copy(t.center).add(la)),this.expandByPoint(Es.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Yu=0;const Mn=new me,ca=new ke,ji=new O,_n=new Mi,Ts=new Mi,Ke=new O;class Xe extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gu(t)?il:nl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ee().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mn.makeRotationFromQuaternion(t),this.applyMatrix4(Mn),this}rotateX(t){return Mn.makeRotationX(t),this.applyMatrix4(Mn),this}rotateY(t){return Mn.makeRotationY(t),this.applyMatrix4(Mn),this}rotateZ(t){return Mn.makeRotationZ(t),this.applyMatrix4(Mn),this}translate(t,e,n){return Mn.makeTranslation(t,e,n),this.applyMatrix4(Mn),this}scale(t,e,n){return Mn.makeScale(t,e,n),this.applyMatrix4(Mn),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Jt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Ke.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ke),Ke.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ke)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Ke.addVectors(_n.min,Ts.min),_n.expandByPoint(Ke),Ke.addVectors(_n.max,Ts.max),_n.expandByPoint(Ke)):(_n.expandByPoint(Ts.min),_n.expandByPoint(Ts.max))}_n.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ke));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Ke.fromBufferAttribute(a,l),c&&(ji.fromBufferAttribute(t,l),Ke.add(ji)),s=Math.max(s,n.distanceToSquared(Ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ln(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let P=0;P<n.count;P++)a[P]=new O,c[P]=new O;const d=new O,m=new O,u=new O,p=new Nt,_=new Nt,b=new Nt,f=new O,g=new O;function S(P,C,w){l[P]=l[C]=l[w]=1,d.fromBufferAttribute(n,P),m.fromBufferAttribute(n,C),u.fromBufferAttribute(n,w),p.fromBufferAttribute(r,P),_.fromBufferAttribute(r,C),b.fromBufferAttribute(r,w),m.sub(d),u.sub(d),_.sub(p),b.sub(p);const D=1/(_.x*b.y-b.x*_.y);isFinite(D)&&(f.copy(m).multiplyScalar(b.y).addScaledVector(u,-_.y).multiplyScalar(D),g.copy(u).multiplyScalar(_.x).addScaledVector(m,-b.x).multiplyScalar(D),a[P].add(f),a[C].add(f),a[w].add(f),c[P].add(g),c[C].add(g),c[w].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,C=T.length;P<C;++P){const w=T[P],D=w.start,B=w.count;for(let I=D,k=D+B;I<k;I+=3)S(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const E=new O,M=new O,x=new O,h=new O;function v(P){x.fromBufferAttribute(s,P),h.copy(x);const C=a[P];E.copy(C),E.sub(x.multiplyScalar(x.dot(C))).normalize(),M.crossVectors(h,C);const D=M.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,D)}for(let P=0,C=n.count;P<C;++P)l[P]&&v(P);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,d=new O,m=new O;if(t)for(let u=0,p=t.count;u<p;u+=3){const _=t.getX(u+0),b=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,b),o.fromBufferAttribute(e,f),d.subVectors(o,r),m.subVectors(s,r),d.cross(m),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,f),a.add(d),c.add(d),l.add(d),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),d.subVectors(o,r),m.subVectors(s,r),d.cross(m),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ke.fromBufferAttribute(t,e),Ke.normalize(),t.setXYZ(e,Ke.x,Ke.y,Ke.z)}toNonIndexed(){function t(a,c){const l=a.array,d=a.itemSize,m=a.normalized,u=new l.constructor(c.length*d);let p=0,_=0;for(let b=0,f=c.length;b<f;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*d;for(let g=0;g<d;g++)u[_++]=l[p++]}return new ln(u,d,m)}if(this.index===null)return Jt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Xe,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let d=0,m=l.length;d<m;d++){const u=l[d],p=t(u,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let m=0,u=l.length;m<u;m++){const p=l[m];d.push(p.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],m=r[l];for(let u=0,p=m.length;u<p;u++)d.push(m[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,d=o.length;l<d;l++){const m=o[l];this.addGroup(m.start,m.count,m.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ha=new O,qu=new O,Zu=new ee;class Hn{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ha.subVectors(n,e).cross(qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(ha),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Zu.getNormalMatrix(t),s=this.coplanarPoint(ha).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Ku=0;class yi extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=ss,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Na,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pr,this.stencilZFail=Pr,this.stencilZPass=Pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Jt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Jt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new se().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Hn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Nt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Nt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ti=new O,ua=new O,or=new O,ar=new O;class ms{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ti)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ti.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ti.copy(this.origin).addScaledVector(this.direction,e),ti.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ua.copy(t).add(e).multiplyScalar(.5),or.copy(e).sub(t).normalize(),ar.copy(this.origin).sub(ua);const r=t.distanceTo(e)*.5,o=-this.direction.dot(or),a=ar.dot(this.direction),c=-ar.dot(or),l=ar.lengthSq(),d=Math.abs(1-o*o);let m,u,p,_;if(d>0)if(m=o*c-a,u=o*a-c,_=r*d,m>=0)if(u>=-_)if(u<=_){const b=1/d;m*=b,u*=b,p=m*(m+o*u+2*a)+u*(o*m+u+2*c)+l}else u=r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;else u=-r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;else u<=-_?(m=Math.max(0,-(-o*r+a)),u=m>0?-r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l):u<=_?(m=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(m=Math.max(0,-(o*r+a)),u=m>0?r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l);else u=o>0?-r:r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(ua).addScaledVector(or,u),p}intersectSphere(t,e){if(t.radius<0)return null;ti.subVectors(t.center,this.origin);const n=ti.dot(this.direction),s=ti.dot(ti)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,m=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,o=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,o=(t.min.y-u.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),m>=0?(a=(t.min.z-u.z)*m,c=(t.max.z-u.z)*m):(a=(t.max.z-u.z)*m,c=(t.min.z-u.z)*m),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ti)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,d=a.z,m=t.x-o.x,u=t.y-o.y,p=t.z-o.z,_=e.x-o.x,b=e.y-o.y,f=e.z-o.z,g=n.x-o.x,S=n.y-o.y,T=n.z-o.z,E=Math.abs(c),M=Math.abs(l),x=Math.abs(d);let h,v,P,C,w,D,B,I,k,U,V,at;if(E>=M&&E>=x?(P=c,D=m,k=_,at=g,c>=0?(h=l,v=d,C=u,w=p,B=b,I=f,U=S,V=T):(h=d,v=l,C=p,w=u,B=f,I=b,U=T,V=S)):M>=x?(P=l,D=u,k=b,at=S,l>=0?(h=d,v=c,C=p,w=m,B=f,I=_,U=T,V=g):(h=c,v=d,C=m,w=p,B=_,I=f,U=g,V=T)):(P=d,D=p,k=f,at=T,d>=0?(h=c,v=l,C=m,w=u,B=_,I=b,U=g,V=S):(h=l,v=c,C=u,w=m,B=b,I=_,U=S,V=g)),P===0)return null;const $=h/P,j=v/P,ct=1/P,St=C-$*D,wt=w-j*D,nt=B-$*k,pt=I-j*k,Rt=U-$*at,Lt=V-j*at,ut=Rt*pt-Lt*nt,Ot=St*Lt-wt*Rt,ye=nt*wt-pt*St;if(s){if(ut<0||Ot<0||ye<0)return null}else if((ut<0||Ot<0||ye<0)&&(ut>0||Ot>0||ye>0))return null;const Wt=ut+Ot+ye;if(Wt===0)return null;const fe=ct*(ut*D+Ot*k+ye*at);return(Wt>0?fe<0:fe>0)?null:this.at(fe/Wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vn extends yi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ol=new me,Pi=new ms,lr=new Si,Bl=new O,cr=new O,hr=new O,ur=new O,fa=new O,fr=new O,zl=new O,dr=new O;class Me extends ke{constructor(t=new Xe,e=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=a[c],m=r[c];d!==0&&(fa.fromBufferAttribute(m,t),o?fr.addScaledVector(fa,d):fr.addScaledVector(fa.sub(e),d))}e.add(fr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(lr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(lr,Bl)===null||Pi.origin.distanceToSquared(Bl)>(t.far-t.near)**2))&&(Ol.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(Ol),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,m=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,b=u.length;_<b;_++){const f=u[_],g=o[f.materialIndex],S=Math.max(f.start,p.start),T=Math.min(a.count,Math.min(f.start+f.count,p.start+p.count));for(let E=S,M=T;E<M;E+=3){const x=a.getX(E),h=a.getX(E+1),v=a.getX(E+2);s=pr(this,g,t,n,l,d,m,x,h,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let f=_,g=b;f<g;f+=3){const S=a.getX(f),T=a.getX(f+1),E=a.getX(f+2);s=pr(this,o,t,n,l,d,m,S,T,E),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,b=u.length;_<b;_++){const f=u[_],g=o[f.materialIndex],S=Math.max(f.start,p.start),T=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));for(let E=S,M=T;E<M;E+=3){const x=E,h=E+1,v=E+2;s=pr(this,g,t,n,l,d,m,x,h,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let f=_,g=b;f<g;f+=3){const S=f,T=f+1,E=f+2;s=pr(this,o,t,n,l,d,m,S,T,E),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function Ju(i,t,e,n,s,r,o,a){let c;if(t.side===an?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===_i,a),c===null)return null;dr.copy(a),dr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(dr);return l<e.near||l>e.far?null:{distance:l,point:dr.clone(),object:i}}function pr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,cr),i.getVertexPosition(c,hr),i.getVertexPosition(l,ur);const d=Ju(i,t,e,n,cr,hr,ur,zl);if(d){const m=new O;bn.getBarycoord(zl,cr,hr,ur,m),s&&(d.uv=bn.getInterpolatedAttribute(s,a,c,l,m,new Nt)),r&&(d.uv1=bn.getInterpolatedAttribute(r,a,c,l,m,new Nt)),o&&(d.normal=bn.getInterpolatedAttribute(o,a,c,l,m,new O),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new O,materialIndex:0};bn.getNormal(cr,hr,ur,u.normal),d.face=u,d.barycoord=m}return d}class sl extends $e{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Je,d=Je,m,u){super(null,o,a,c,l,d,s,r,m,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Aa extends ln{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ts=new me,Gl=new me,mr=[],kl=new Mi,$u=new me,As=new Me,ws=new Si;class rl extends Me{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Aa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$u)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Mi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),kl.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(kl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Si),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),ws.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(ws)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(As.geometry=this.geometry,As.material=this.material,As.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(n),t.ray.intersectsSphere(ws)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),Gl.multiplyMatrices(n,ts),As.matrixWorld=Gl,As.raycast(t,mr);for(let o=0,a=mr.length;o<a;o++){const c=mr[o];c.instanceId=r,c.object=this,e.push(c)}mr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Aa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new sl(new Float32Array(s*this.count),s,this.count,Lo,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Li=new Si,Qu=new Nt(.5,.5),gr=new O;class us{constructor(t=new Hn,e=new Hn,n=new Hn,s=new Hn,r=new Hn,o=new Hn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],m=r[5],u=r[6],p=r[7],_=r[8],b=r[9],f=r[10],g=r[11],S=r[12],T=r[13],E=r[14],M=r[15];if(s[0].setComponents(l-o,p-d,g-_,M-S).normalize(),s[1].setComponents(l+o,p+d,g+_,M+S).normalize(),s[2].setComponents(l+a,p+m,g+b,M+T).normalize(),s[3].setComponents(l-a,p-m,g-b,M-T).normalize(),n)s[4].setComponents(c,u,f,E).normalize(),s[5].setComponents(l-c,p-u,g-f,M-E).normalize();else if(s[4].setComponents(l-c,p-u,g-f,M-E).normalize(),e===Tn)s[5].setComponents(l+c,p+u,g+f,M+E).normalize();else if(e===hs)s[5].setComponents(c,u,f,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);const e=Qu.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(gr.x=s.normal.x>0?t.max.x:t.min.x,gr.y=s.normal.y>0?t.max.y:t.min.y,gr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Hl=new me;class Bo{constructor(){this.coordinateSystem=Tn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];Hl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new us),n[s].setFromProjectionMatrix(Hl,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new us),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Bo().copy(this)}}class ol extends yi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const So=new O,yo=new O,Vl=new me,Rs=new ms,_r=new Si,da=new O,Wl=new O;class yh extends ke{constructor(t=new Xe,e=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)So.fromBufferAttribute(e,s-1),yo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=So.distanceTo(yo);t.setAttribute("lineDistance",new we(n,1))}else Jt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),_r.radius+=r,t.ray.intersectsSphere(_r)===!1)return;Vl.copy(s).invert(),Rs.copy(t.ray).applyMatrix4(Vl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const p=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let b=p,f=_-1;b<f;b+=l){const g=d.getX(b),S=d.getX(b+1),T=xr(this,t,Rs,c,g,S,b);T&&e.push(T)}if(this.isLineLoop){const b=d.getX(_-1),f=d.getX(p),g=xr(this,t,Rs,c,b,f,_-1);g&&e.push(g)}}else{const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let b=p,f=_-1;b<f;b+=l){const g=xr(this,t,Rs,c,b,b+1,b);g&&e.push(g)}if(this.isLineLoop){const b=xr(this,t,Rs,c,_-1,p,_-1);b&&e.push(b)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function xr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(So.fromBufferAttribute(a,s),yo.fromBufferAttribute(a,r),e.distanceSqToSegment(So,yo,da,Wl)>n)return;da.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(da);if(!(l<t.near||l>t.far))return{distance:l,point:Wl.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Xl=new O,Yl=new O;class bh extends yh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Xl.fromBufferAttribute(e,s),Yl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Xl.distanceTo(Yl);t.setAttribute("lineDistance",new we(n,1))}else Jt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class al extends yi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ql=new me,wa=new ms,vr=new Si,Mr=new O;class Eh extends ke{constructor(t=new Xe,e=new al){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(s),vr.radius+=r,t.ray.intersectsSphere(vr)===!1)return;ql.copy(s).invert(),wa.copy(t.ray).applyMatrix4(ql);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,m=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let _=u,b=p;_<b;_++){const f=l.getX(_);Mr.fromBufferAttribute(m,f),Zl(Mr,f,c,s,t,e,this)}}else{const u=Math.max(0,o.start),p=Math.min(m.count,o.start+o.count);for(let _=u,b=p;_<b;_++)Mr.fromBufferAttribute(m,_),Zl(Mr,_,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Zl(i,t,e,n,s,r,o){const a=wa.distanceSqToPoint(i);if(a<e){const c=new O;wa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ll extends $e{constructor(t=[],e=Oi,n,s,r,o,a,c,l,d){super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ra extends $e{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zi extends $e{constructor(t,e,n=In,s,r,o,a=Je,c=Je,l,d=oi,m=1){if(d!==oi&&d!==ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:m};super(u,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Uo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class cl extends zi{constructor(t,e=In,n=Oi,s,r,o=Je,a=Je,c,l=oi){const d={width:t,height:t,depth:1},m=[d,d,d,d,d,d];super(t,t,e,n,s,r,o,a,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class hl extends $e{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class We extends Xe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],d=[],m=[];let u=0,p=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,s,o,2),_("x","z","y",1,-1,t,n,-e,s,o,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(m,2));function _(b,f,g,S,T,E,M,x,h,v,P){const C=E/h,w=M/v,D=E/2,B=M/2,I=x/2,k=h+1,U=v+1;let V=0,at=0;const $=new O;for(let j=0;j<U;j++){const ct=j*w-B;for(let St=0;St<k;St++){const wt=St*C-D;$[b]=wt*S,$[f]=ct*T,$[g]=I,l.push($.x,$.y,$.z),$[b]=0,$[f]=0,$[g]=x>0?1:-1,d.push($.x,$.y,$.z),m.push(St/h),m.push(1-j/v),V+=1}}for(let j=0;j<v;j++)for(let ct=0;ct<h;ct++){const St=u+ct+k*j,wt=u+ct+k*(j+1),nt=u+(ct+1)+k*(j+1),pt=u+(ct+1)+k*j;c.push(St,wt,pt),c.push(wt,nt,pt),at+=6}a.addGroup(p,at,P),p+=at,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new We(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class An extends Xe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],m=[],u=[],p=[];let _=0;const b=[],f=n/2;let g=0;S(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new we(m,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(p,2));function S(){const E=new O,M=new O;let x=0;const h=(e-t)/n;for(let v=0;v<=r;v++){const P=[],C=v/r,w=C*(e-t)+t;for(let D=0;D<=s;D++){const B=D/s,I=B*c+a,k=Math.sin(I),U=Math.cos(I);M.x=w*k,M.y=-C*n+f,M.z=w*U,m.push(M.x,M.y,M.z),E.set(k,h,U).normalize(),u.push(E.x,E.y,E.z),p.push(B,1-C),P.push(_++)}b.push(P)}for(let v=0;v<s;v++)for(let P=0;P<r;P++){const C=b[P][v],w=b[P+1][v],D=b[P+1][v+1],B=b[P][v+1];(t>0||P!==0)&&(d.push(C,w,B),x+=3),(e>0||P!==r-1)&&(d.push(w,D,B),x+=3)}l.addGroup(g,x,0),g+=x}function T(E){const M=_,x=new Nt,h=new O;let v=0;const P=E===!0?t:e,C=E===!0?1:-1;for(let D=1;D<=s;D++)m.push(0,f*C,0),u.push(0,C,0),p.push(.5,.5),_++;const w=_;for(let D=0;D<=s;D++){const I=D/s*c+a,k=Math.cos(I),U=Math.sin(I);h.x=P*U,h.y=f*C,h.z=P*k,m.push(h.x,h.y,h.z),u.push(0,C,0),x.x=k*.5+.5,x.y=U*.5*C+.5,p.push(x.x,x.y),_++}for(let D=0;D<s;D++){const B=M+D,I=w+D;E===!0?d.push(I,I+1,B):d.push(I+1,I,B),v+=3}l.addGroup(g,v,E===!0?1:2),g+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qn extends An{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new qn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zo extends Xe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),d(),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(r.slice(),3)),this.setAttribute("uv",new we(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const T=new O,E=new O,M=new O;for(let x=0;x<e.length;x+=3)p(e[x+0],T),p(e[x+1],E),p(e[x+2],M),c(T,E,M,S)}function c(S,T,E,M){const x=M+1,h=[];for(let v=0;v<=x;v++){h[v]=[];const P=S.clone().lerp(E,v/x),C=T.clone().lerp(E,v/x),w=x-v;for(let D=0;D<=w;D++)D===0&&v===x?h[v][D]=P:h[v][D]=P.clone().lerp(C,D/w)}for(let v=0;v<x;v++)for(let P=0;P<2*(x-v)-1;P++){const C=Math.floor(P/2);P%2===0?(u(h[v][C+1]),u(h[v+1][C]),u(h[v][C])):(u(h[v][C+1]),u(h[v+1][C+1]),u(h[v+1][C]))}}function l(S){const T=new O;for(let E=0;E<r.length;E+=3)T.x=r[E+0],T.y=r[E+1],T.z=r[E+2],T.normalize().multiplyScalar(S),r[E+0]=T.x,r[E+1]=T.y,r[E+2]=T.z}function d(){const S=new O;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];const E=f(S)/2/Math.PI+.5,M=g(S)/Math.PI+.5;o.push(E,1-M)}_(),m()}function m(){for(let S=0;S<o.length;S+=6){const T=o[S+0],E=o[S+2],M=o[S+4],x=Math.max(T,E,M),h=Math.min(T,E,M);x>.9&&h<.1&&(T<.2&&(o[S+0]+=1),E<.2&&(o[S+2]+=1),M<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function p(S,T){const E=S*3;T.x=t[E+0],T.y=t[E+1],T.z=t[E+2]}function _(){const S=new O,T=new O,E=new O,M=new O,x=new Nt,h=new Nt,v=new Nt;for(let P=0,C=0;P<r.length;P+=9,C+=6){S.set(r[P+0],r[P+1],r[P+2]),T.set(r[P+3],r[P+4],r[P+5]),E.set(r[P+6],r[P+7],r[P+8]),x.set(o[C+0],o[C+1]),h.set(o[C+2],o[C+3]),v.set(o[C+4],o[C+5]),M.copy(S).add(T).add(E).divideScalar(3);const w=f(M);b(x,C+0,S,w),b(h,C+2,T,w),b(v,C+4,E,w)}}function b(S,T,E,M){M<0&&S.x===1&&(o[T]=S.x-1),E.x===0&&E.z===0&&(o[T]=M/2/Math.PI+.5)}function f(S){return Math.atan2(S.z,-S.x)}function g(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zo(t.vertices,t.indices,t.radius,t.detail)}}class Zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Jt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const d=n[s],u=n[s+1]-d,p=(o-d)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Nt:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new O,s=[],r=[],o=[],a=new O,c=new me;for(let p=0;p<=t;p++){const _=p/t;s[p]=this.getTangentAt(_,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const d=Math.abs(s[0].x),m=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=l&&(l=d,n.set(1,0,0)),m<=l&&(l=m,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(he(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,_))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(he(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],p*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class ul extends Zn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),m=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*d-p*m+this.aX,l=u*m+p*d+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Th extends ul{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function fl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,d,m){let u=(o-r)/l-(a-r)/(l+d)+(a-o)/d,p=(a-o)/d-(c-o)/(d+m)+(c-a)/m;u*=d,p*=d,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Kl=new O,Jl=new O,pa=new fl,ma=new fl,ga=new fl;class Ah extends Zn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,d;this.closed||a>0?l=s[(a-1)%r]:(Jl.subVectors(s[0],s[1]).add(s[0]),l=Jl);const m=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(Kl.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Kl),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(m),p),b=Math.pow(m.distanceToSquared(u),p),f=Math.pow(u.distanceToSquared(d),p);b<1e-4&&(b=1),_<1e-4&&(_=b),f<1e-4&&(f=b),pa.initNonuniformCatmullRom(l.x,m.x,u.x,d.x,_,b,f),ma.initNonuniformCatmullRom(l.y,m.y,u.y,d.y,_,b,f),ga.initNonuniformCatmullRom(l.z,m.z,u.z,d.z,_,b,f)}else this.curveType==="catmullrom"&&(pa.initCatmullRom(l.x,m.x,u.x,d.x,this.tension),ma.initCatmullRom(l.y,m.y,u.y,d.y,this.tension),ga.initCatmullRom(l.z,m.z,u.z,d.z,this.tension));return n.set(pa.calc(c),ma.calc(c),ga.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function $l(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ju(i,t){const e=1-i;return e*e*t}function tf(i,t){return 2*(1-i)*i*t}function ef(i,t){return i*i*t}function ks(i,t,e,n){return ju(i,t)+tf(i,e)+ef(i,n)}function nf(i,t){const e=1-i;return e*e*e*t}function sf(i,t){const e=1-i;return 3*e*e*i*t}function rf(i,t){return 3*(1-i)*i*i*t}function of(i,t){return i*i*i*t}function Hs(i,t,e,n,s){return nf(i,t)+sf(i,e)+rf(i,n)+of(i,s)}class wh extends Zn{constructor(t=new Nt,e=new Nt,n=new Nt,s=new Nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Nt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Rh extends Zn{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y),Hs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ch extends Zn{constructor(t=new Nt,e=new Nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ph extends Zn{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends Zn{constructor(t=new Nt,e=new Nt,n=new Nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Nt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dl extends Zn{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y),ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dh extends Zn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Nt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],d=s[o>s.length-2?s.length-1:o+1],m=s[o>s.length-3?s.length-1:o+2];return n.set($l(a,c.x,l.x,d.x,m.x),$l(a,c.y,l.y,d.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Nt().fromArray(s))}return this}}var af=Object.freeze({__proto__:null,ArcCurve:Th,CatmullRomCurve3:Ah,CubicBezierCurve:wh,CubicBezierCurve3:Rh,EllipseCurve:ul,LineCurve:Ch,LineCurve3:Ph,QuadraticBezierCurve:Lh,QuadraticBezierCurve3:dl,SplineCurve:Dh});class Go extends zo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Go(t.radius,t.detail)}}class ai extends Xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,m=t/a,u=e/c,p=[],_=[],b=[],f=[];for(let g=0;g<d;g++){const S=g*u-o;for(let T=0;T<l;T++){const E=T*m-r;_.push(E,-S,0),b.push(0,0,1),f.push(T/a),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let S=0;S<a;S++){const T=S+l*g,E=S+l*(g+1),M=S+1+l*(g+1),x=S+1+l*g;p.push(T,E,x),p.push(E,M,x)}this.setIndex(p),this.setAttribute("position",new we(_,3)),this.setAttribute("normal",new we(b,3)),this.setAttribute("uv",new we(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ks extends Xe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],d=[];let m=t;const u=(e-t)/s,p=new O,_=new Nt;for(let b=0;b<=s;b++){for(let f=0;f<=n;f++){const g=r+f/n*o;p.x=m*Math.cos(g),p.y=m*Math.sin(g),c.push(p.x,p.y,p.z),l.push(0,0,1),_.x=(p.x/e+1)/2,_.y=(p.y/e+1)/2,d.push(_.x,_.y)}m+=u}for(let b=0;b<s;b++){const f=b*(n+1);for(let g=0;g<n;g++){const S=g+f,T=S,E=S+n+1,M=S+n+2,x=S+1;a.push(T,E,x),a.push(E,M,x)}}this.setIndex(a),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(l,3)),this.setAttribute("uv",new we(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ks(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class gi extends Xe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const d=[],m=new O,u=new O,p=[],_=[],b=[],f=[];for(let g=0;g<=n;g++){const S=[],T=g/n,E=o+T*a,M=t*Math.cos(E),x=Math.sqrt(t*t-M*M);let h=0;g===0&&o===0?h=.5/e:g===n&&c===Math.PI&&(h=-.5/e);for(let v=0;v<=e;v++){const P=v/e,C=s+P*r;m.x=-x*Math.cos(C),m.y=M,m.z=x*Math.sin(C),_.push(m.x,m.y,m.z),u.copy(m).normalize(),b.push(u.x,u.y,u.z),f.push(P+h,1-T),S.push(l++)}d.push(S)}for(let g=0;g<n;g++)for(let S=0;S<e;S++){const T=d[g][S+1],E=d[g][S],M=d[g+1][S],x=d[g+1][S+1];(g!==0||o>0)&&p.push(T,E,x),(g!==n-1||c<Math.PI)&&p.push(E,M,x)}this.setIndex(p),this.setAttribute("position",new we(_,3)),this.setAttribute("normal",new we(b,3)),this.setAttribute("uv",new we(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ri extends Xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],m=[],u=new O,p=new O,_=new O;for(let b=0;b<=n;b++){const f=o+b/n*a;for(let g=0;g<=s;g++){const S=g/s*r;p.x=(t+e*Math.cos(f))*Math.cos(S),p.y=(t+e*Math.cos(f))*Math.sin(S),p.z=e*Math.sin(f),l.push(p.x,p.y,p.z),u.x=t*Math.cos(S),u.y=t*Math.sin(S),_.subVectors(p,u).normalize(),d.push(_.x,_.y,_.z),m.push(g/s),m.push(b/n)}}for(let b=1;b<=n;b++)for(let f=1;f<=s;f++){const g=(s+1)*b+f-1,S=(s+1)*(b-1)+f-1,T=(s+1)*(b-1)+f,E=(s+1)*b+f;c.push(g,S,E),c.push(S,T,E)}this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ri(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class pl extends Xe{constructor(t=new dl(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new O,c=new O,l=new Nt;let d=new O;const m=[],u=[],p=[],_=[];b(),this.setIndex(_),this.setAttribute("position",new we(m,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(p,2));function b(){for(let T=0;T<e;T++)f(T);f(r===!1?e:0),S(),g()}function f(T){d=t.getPointAt(T/e,d);const E=o.normals[T],M=o.binormals[T];for(let x=0;x<=s;x++){const h=x/s*Math.PI*2,v=Math.sin(h),P=-Math.cos(h);c.x=P*E.x+v*M.x,c.y=P*E.y+v*M.y,c.z=P*E.z+v*M.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=d.x+n*c.x,a.y=d.y+n*c.y,a.z=d.z+n*c.z,m.push(a.x,a.y,a.z)}}function g(){for(let T=1;T<=e;T++)for(let E=1;E<=s;E++){const M=(s+1)*(T-1)+(E-1),x=(s+1)*T+(E-1),h=(s+1)*T+E,v=(s+1)*(T-1)+E;_.push(M,x,v),_.push(x,h,v)}}function S(){for(let T=0;T<=e;T++)for(let E=0;E<=s;E++)l.x=T/e,l.y=E/s,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new pl(new af[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function fs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Ql(s))s.isRenderTargetTexture?(Jt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Ql(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function sn(i){const t={};for(let e=0;e<i.length;e++){const n=fs(i[e]);for(const s in n)t[s]=n[s]}return t}function Ql(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function lf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ih(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const Nh={clone:fs,merge:sn};var cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends yi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cf,this.fragmentShader=hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=lf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new se().setHex(s.value);break;case"v2":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ee().fromArray(s.value);break;case"m4":this.uniforms[n].value=new me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Uh extends vi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ds extends yi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vo,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fh extends yi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Oh extends yi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ml extends ke{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new se(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Bh extends ml{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const _a=new me,jl=new O,tc=new O;class zh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new us,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(jl),tc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){_a.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(_a,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===hs||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sr=new O,yr=new dn,On=new O;class gl extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Sr,yr,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sr,yr,On.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Sr,yr,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sr,yr,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new O,ec=new Nt,nc=new Nt;class yn extends gl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(zs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class _l extends gl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class uf extends zh{constructor(){super(new _l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ca extends ml{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new uf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const es=-90,ns=1;class bo extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(es,ns,t,e);s.layers=this.layers,this.add(s);const r=new yn(es,ns,t,e);r.layers=this.layers,this.add(r);const o=new yn(es,ns,t,e);o.layers=this.layers,this.add(o);const a=new yn(es,ns,t,e);a.layers=this.layers,this.add(a);const c=new yn(es,ns,t,e);c.layers=this.layers,this.add(c);const l=new yn(es,ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,d]=this.children,m=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const b=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=b,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(m,u,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Gh extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const ic=new me;class kh{constructor(t,e,n=0,s=1/0){this.ray=new ms(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Fo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ve("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ic),this}intersectObject(t,e=!0,n=[]){return Pa(t,this,n,e),n.sort(sc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Pa(t[s],this,n,e);return n.sort(sc),n}}function sc(i,t){return i.distance-t.distance}function Pa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Pa(r[o],t,e,!0)}}class La{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=he(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(he(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Hh extends li{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function rc(i,t,e,n){const s=ff(n);switch(e){case qa:return i*t;case Lo:return i*t/s.components*s.byteLength;case Do:return i*t/s.components*s.byteLength;case xi:return i*t*2/s.components*s.byteLength;case Io:return i*t*2/s.components*s.byteLength;case Za:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case No:return i*t*4/s.components*s.byteLength;case Ns:case Us:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Fs:case Os:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vr:case Xr:return Math.max(i,16)*Math.max(t,8)/4;case Hr:case Wr:return Math.max(i,8)*Math.max(t,8)/2;case Yr:case qr:case Kr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zr:case Ws:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case to:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case no:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case io:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case so:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case oo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case lo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ho:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case uo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fo:case po:case mo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case go:case _o:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Xs:case xo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ff(i){switch(i){case fn:case Va:return{byteLength:1,components:1};case cs:case Wa:case Nn:return{byteLength:2,components:1};case Co:case Po:return{byteLength:2,components:4};case In:case Ro:case En:return{byteLength:4,components:1};case Xa:case Ya:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ao}}));typeof window<"u"&&(window.__THREE__?Jt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ao);function Vh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function df(i){const t=new WeakMap;function e(a,c){const l=a.array,d=a.usage,m=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:m}}function n(a,c,l){const d=c.array,m=c.updateRanges;if(i.bindBuffer(l,a),m.length===0)i.bufferSubData(l,0,d);else{m.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<m.length;p++){const _=m[u],b=m[p];b.start<=_.start+_.count+1?_.count=Math.max(_.count,b.start+b.count-_.start):(++u,m[u]=b)}m.length=u+1;for(let p=0,_=m.length;p<_;p++){const b=m[p];i.bufferSubData(l,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mf=`#ifdef USE_ALPHAHASH
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
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mf=`#ifdef USE_AOMAP
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
#endif`,Sf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yf=`#ifdef USE_BATCHING
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
#endif`,bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Af=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wf=`#ifdef USE_IRIDESCENCE
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
#endif`,Rf=`#ifdef USE_BUMPMAP
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
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,If=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Of=`#define PI 3.141592653589793
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
} // validated`,Bf=`vec3 transformedNormal = objectNormal;
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
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
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
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
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
}`,ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,rd=`#ifdef USE_ENVMAP
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
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
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
#endif`,ud=`uniform sampler2D dfgLUT;
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
}`,fd=`
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
#endif`,dd=`#if defined( RE_IndirectDiffuse )
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
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,gd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_d=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Md=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bd=`#if defined( USE_POINTS_UV )
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
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Td=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ad=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
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
#endif`,Pd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Fd=`#ifdef USE_NORMALMAP
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
#endif`,Od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$d=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qd=`float getShadowMask() {
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
}`,jd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
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
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
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
#endif`,ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ap=`#ifdef USE_TRANSMISSION
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
#endif`,lp=`#ifdef USE_TRANSMISSION
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
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pp=`uniform sampler2D t2D;
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
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`uniform float backgroundBlurriness;
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`#include <common>
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
}`,Mp=`#if DEPTH_PACKING == 3200
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
}`,Sp=`#define DISTANCE
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
}`,yp=`#define DISTANCE
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
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
}`,Ap=`uniform vec3 diffuse;
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
}`,wp=`#include <common>
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
}`,Rp=`uniform vec3 diffuse;
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
}`,Cp=`#define LAMBERT
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
}`,Pp=`#define LAMBERT
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
}`,Lp=`#define MATCAP
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
}`,Dp=`#define MATCAP
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
}`,Ip=`#define NORMAL
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
}`,Np=`#define NORMAL
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
}`,Up=`#define PHONG
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
}`,Fp=`#define PHONG
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
}`,Op=`#define STANDARD
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
}`,Bp=`#define STANDARD
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
}`,zp=`#define TOON
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
}`,Gp=`#define TOON
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
}`,kp=`uniform float size;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,Vp=`#include <common>
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
}`,Wp=`uniform vec3 color;
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
}`,Xp=`uniform float rotation;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,ae={alphahash_fragment:pf,alphahash_pars_fragment:mf,alphamap_fragment:gf,alphamap_pars_fragment:_f,alphatest_fragment:xf,alphatest_pars_fragment:vf,aomap_fragment:Mf,aomap_pars_fragment:Sf,batching_pars_vertex:yf,batching_vertex:bf,begin_vertex:Ef,beginnormal_vertex:Tf,bsdfs:Af,iridescence_fragment:wf,bumpmap_pars_fragment:Rf,clipping_planes_fragment:Cf,clipping_planes_pars_fragment:Pf,clipping_planes_pars_vertex:Lf,clipping_planes_vertex:Df,color_fragment:If,color_pars_fragment:Nf,color_pars_vertex:Uf,color_vertex:Ff,common:Of,defaultnormal_vertex:Bf,displacementmap_pars_vertex:zf,displacementmap_vertex:Gf,emissivemap_fragment:kf,emissivemap_pars_fragment:Hf,colorspace_fragment:Vf,colorspace_pars_fragment:Wf,envmap_fragment:Xf,envmap_common_pars_fragment:Yf,envmap_pars_fragment:qf,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:rd,envmap_vertex:Kf,fog_vertex:Jf,fog_pars_vertex:$f,fog_fragment:Qf,fog_pars_fragment:jf,gradientmap_pars_fragment:td,lightmap_pars_fragment:ed,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:sd,lights_toon_fragment:od,lights_toon_pars_fragment:ad,lights_phong_fragment:ld,lights_phong_pars_fragment:cd,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:fd,lights_fragment_maps:dd,lights_fragment_end:pd,lightprobes_pars_fragment:md,logdepthbuf_fragment:gd,logdepthbuf_pars_fragment:_d,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:vd,map_fragment:Md,map_pars_fragment:Sd,map_particle_fragment:yd,map_particle_pars_fragment:bd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:Td,morphinstance_vertex:Ad,morphcolor_vertex:wd,morphnormal_vertex:Rd,morphtarget_pars_vertex:Cd,morphtarget_vertex:Pd,normal_fragment_begin:Ld,normal_fragment_maps:Dd,normal_pars_fragment:Id,normal_pars_vertex:Nd,normal_vertex:Ud,normalmap_pars_fragment:Fd,clearcoat_normal_fragment_begin:Od,clearcoat_normal_fragment_maps:Bd,clearcoat_pars_fragment:zd,iridescence_pars_fragment:Gd,opaque_fragment:kd,packing:Hd,premultiplied_alpha_fragment:Vd,project_vertex:Wd,dithering_fragment:Xd,dithering_pars_fragment:Yd,roughnessmap_fragment:qd,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:Jd,shadowmap_vertex:$d,shadowmask_pars_fragment:Qd,skinbase_vertex:jd,skinning_pars_vertex:tp,skinning_vertex:ep,skinnormal_vertex:np,specularmap_fragment:ip,specularmap_pars_fragment:sp,tonemapping_fragment:rp,tonemapping_pars_fragment:op,transmission_fragment:ap,transmission_pars_fragment:lp,uv_pars_fragment:cp,uv_pars_vertex:hp,uv_vertex:up,worldpos_vertex:fp,background_vert:dp,background_frag:pp,backgroundCube_vert:mp,backgroundCube_frag:gp,cube_vert:_p,cube_frag:xp,depth_vert:vp,depth_frag:Mp,distance_vert:Sp,distance_frag:yp,equirect_vert:bp,equirect_frag:Ep,linedashed_vert:Tp,linedashed_frag:Ap,meshbasic_vert:wp,meshbasic_frag:Rp,meshlambert_vert:Cp,meshlambert_frag:Pp,meshmatcap_vert:Lp,meshmatcap_frag:Dp,meshnormal_vert:Ip,meshnormal_frag:Np,meshphong_vert:Up,meshphong_frag:Fp,meshphysical_vert:Op,meshphysical_frag:Bp,meshtoon_vert:zp,meshtoon_frag:Gp,points_vert:kp,points_frag:Hp,shadow_vert:Vp,shadow_frag:Wp,sprite_vert:Xp,sprite_frag:Yp},Pt={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},Pn={basic:{uniforms:sn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:sn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new se(0)},envMapIntensity:{value:1}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:sn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:sn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:sn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new se(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:sn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:sn([Pt.points,Pt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:sn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:sn([Pt.common,Pt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:sn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:sn([Pt.sprite,Pt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distance:{uniforms:sn([Pt.common,Pt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distance_vert,fragmentShader:ae.distance_frag},shadow:{uniforms:sn([Pt.lights,Pt.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};Pn.physical={uniforms:sn([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ee},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};const br={r:0,b:0,g:0},qp=new me,Wh=new ee;Wh.set(-1,0,0,0,1,0,0,0,1);function Zp(i,t,e,n,s,r){const o=new se(0);let a=s===!0?0:1,c,l,d=null,m=0,u=null;function p(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const E=S.backgroundBlurriness>0;T=t.get(T,E)}return T}function _(S){let T=!1;const E=p(S);E===null?f(o,a):E&&E.isColor&&(f(E,1),T=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(S,T){const E=p(T);E&&E.isCubeTexture?(l===void 0&&(l=new Me(new We(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:fs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,x,h){this.matrixWorld.copyPosition(h.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(qp.makeRotationFromEuler(T.backgroundRotation)).transpose(),E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wh),l.material.toneMapped=pe.getTransfer(E.colorSpace)!==Ae,(d!==E||m!==E.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,m=E.version,u=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Me(new ai(2,2),new vi({name:"BackgroundMaterial",uniforms:fs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=pe.getTransfer(E.colorSpace)!==Ae,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||m!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,m=E.version,u=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,T){S.getRGB(br,Ih(i)),e.buffers.color.setClear(br.r,br.g,br.b,T,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),a=T,f(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,f(o,a)},render:_,addToRenderList:b,dispose:g}}function Kp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(w,D,B,I,k){let U=!1;const V=m(w,I,B,D);r!==V&&(r=V,l(r.object)),U=p(w,I,B,k),U&&_(w,I,B,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,E(w,D,B,I),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(w){return i.bindVertexArray(w)}function d(w){return i.deleteVertexArray(w)}function m(w,D,B,I){const k=I.wireframe===!0;let U=n[D.id];U===void 0&&(U={},n[D.id]=U);const V=w.isInstancedMesh===!0?w.id:0;let at=U[V];at===void 0&&(at={},U[V]=at);let $=at[B.id];$===void 0&&($={},at[B.id]=$);let j=$[k];return j===void 0&&(j=u(c()),$[k]=j),j}function u(w){const D=[],B=[],I=[];for(let k=0;k<e;k++)D[k]=0,B[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:I,object:w,attributes:{},index:null}}function p(w,D,B,I){const k=r.attributes,U=D.attributes;let V=0;const at=B.getAttributes();for(const $ in at)if(at[$].location>=0){const ct=k[$];let St=U[$];if(St===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),ct===void 0||ct.attribute!==St||St&&ct.data!==St.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function _(w,D,B,I){const k={},U=D.attributes;let V=0;const at=B.getAttributes();for(const $ in at)if(at[$].location>=0){let ct=U[$];ct===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(ct=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(ct=w.instanceColor));const St={};St.attribute=ct,ct&&ct.data&&(St.data=ct.data),k[$]=St,V++}r.attributes=k,r.attributesNum=V,r.index=I}function b(){const w=r.newAttributes;for(let D=0,B=w.length;D<B;D++)w[D]=0}function f(w){g(w,0)}function g(w,D){const B=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;B[w]=1,I[w]===0&&(i.enableVertexAttribArray(w),I[w]=1),k[w]!==D&&(i.vertexAttribDivisor(w,D),k[w]=D)}function S(){const w=r.newAttributes,D=r.enabledAttributes;for(let B=0,I=D.length;B<I;B++)D[B]!==w[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function T(w,D,B,I,k,U,V){V===!0?i.vertexAttribIPointer(w,D,B,k,U):i.vertexAttribPointer(w,D,B,I,k,U)}function E(w,D,B,I){b();const k=I.attributes,U=B.getAttributes(),V=D.defaultAttributeValues;for(const at in U){const $=U[at];if($.location>=0){let j=k[at];if(j===void 0&&(at==="instanceMatrix"&&w.instanceMatrix&&(j=w.instanceMatrix),at==="instanceColor"&&w.instanceColor&&(j=w.instanceColor)),j!==void 0){const ct=j.normalized,St=j.itemSize,wt=t.get(j);if(wt===void 0)continue;const nt=wt.buffer,pt=wt.type,Rt=wt.bytesPerElement,Lt=pt===i.INT||pt===i.UNSIGNED_INT||j.gpuType===Ro;if(j.isInterleavedBufferAttribute){const ut=j.data,Ot=ut.isInterleavedBuffer===!0?ut.stride:ut.itemSize,ye=j.offset;if(ut.isInstancedInterleavedBuffer||ut.isInstancedBufferAttribute){for(let Wt=0;Wt<$.locationSize;Wt++)g($.location+Wt,ut.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Wt=0;Wt<$.locationSize;Wt++)f($.location+Wt);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Wt=0;Wt<$.locationSize;Wt++)T($.location+Wt,St/$.locationSize,pt,ct,Ot*Rt,(ye+St/$.locationSize*Wt)*Rt,Lt)}else{if(j.isInstancedBufferAttribute){for(let ut=0;ut<$.locationSize;ut++)g($.location+ut,j.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ut=0;ut<$.locationSize;ut++)f($.location+ut);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let ut=0;ut<$.locationSize;ut++)T($.location+ut,St/$.locationSize,pt,ct,St*Rt,St/$.locationSize*ut*Rt,Lt)}}else if(V!==void 0){const ct=V[at];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv($.location,ct);break;case 3:i.vertexAttrib3fv($.location,ct);break;case 4:i.vertexAttrib4fv($.location,ct);break;default:i.vertexAttrib1fv($.location,ct)}}}}S()}function M(){P();for(const w in n){const D=n[w];for(const B in D){const I=D[B];for(const k in I){const U=I[k];for(const V in U)d(U[V].object),delete U[V];delete I[k]}}delete n[w]}}function x(w){if(n[w.id]===void 0)return;const D=n[w.id];for(const B in D){const I=D[B];for(const k in I){const U=I[k];for(const V in U)d(U[V].object),delete U[V];delete I[k]}}delete n[w.id]}function h(w){for(const D in n){const B=n[D];for(const I in B){const k=B[I];if(k[w.id]===void 0)continue;const U=k[w.id];for(const V in U)d(U[V].object),delete U[V];delete k[w.id]}}}function v(w){for(const D in n){const B=n[D],I=w.isInstancedMesh===!0?w.id:0,k=B[I];if(k!==void 0){for(const U in k){const V=k[U];for(const at in V)d(V[at].object),delete V[at];delete k[U]}delete B[I],Object.keys(B).length===0&&delete n[D]}}}function P(){C(),o=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:x,releaseStatesOfObject:v,releaseStatesOfProgram:h,initAttributes:b,enableAttribute:f,disableUnusedAttributes:S}}function Jp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),e.update(l,n,d))}function a(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let p=0;p<d;p++)u+=l[p];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function $p(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const h=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(h){return!(h!==Ln&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(h){const v=h===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(h!==fn&&h!==En&&!v&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Jt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&m===!1;e.reversedDepthBuffer===!0&&m===!1&&Jt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&m===!0&&Jt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),x=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:_,maxTextureSize:b,maxCubemapSize:f,maxAttributes:g,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:E,maxSamples:M,samples:x}}function Qp(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Hn,a=new ee,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const p=m.length!==0||u||n!==0||s;return s=u,n=m.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,u){e=d(m,u,0)},this.setState=function(m,u,p){const _=m.clippingPlanes,b=m.clipIntersection,f=m.clipShadows,g=i.get(m);if(!s||_===null||_.length===0||r&&!f)r?d(null):l();else{const S=r?0:n,T=S*4;let E=g.clippingState||null;c.value=E,E=d(_,u,T,p);for(let M=0;M!==T;++M)E[M]=e[M];g.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(m,u,p,_){const b=m!==null?m.length:0;let f=null;if(b!==0){if(f=c.value,_!==!0||f===null){const g=p+b*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(f===null||f.length<g)&&(f=new Float32Array(g));for(let T=0,E=p;T!==b;++T,E+=4)o.copy(m[T]).applyMatrix4(S,a),o.normal.toArray(f,E),f[E+3]=o.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,f}}class ko extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ll(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new We(5,5,5),r=new vi({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:Fi});r.uniforms.tEquirect.value=e;const o=new Me(s,r),a=e.minFilter;return e.minFilter===ni&&(e.minFilter=on),new bo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const oc=256,jp=3,tm=20,Xh=256,Yh=16,em=3,nm=new O,im=new se;class Js{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new bo(1,10,null),this._boxMesh=new Me(new We(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=nm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),d=this._getSourceTarget(!0);e>0&&(d.texture.mipmapsAutoUpdate=!1);const m=c.autoClear,u=c.autoClearColor,p=c.autoClearDepth,_=c.autoClearStencil,b=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,b===null&&(t.background=c.getClearColor(im));const f=new bo(n,s,d);return f.position.copy(a),f.update(c,t),c.autoClear=m,c.autoClearColor=u,c.autoClearDepth=p,c.autoClearStencil=_,t.background=b,e>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(oc,ph(t))}_fromTexture(t,e){t.mapping===Oi||t.mapping===ls?this._setSize(t.image.length===0?oc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=ac(t,!1,!1),n=Math.log2(t)-jp;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ac(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Oi||t.mapping===ls?(this._cubemapMaterial===null&&(this._cubemapMaterial=cc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=lc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=sm(),this._integrationMaterial=rm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Yh);for(let o=0;o<=n;o++){const a=Js.lodToRoughness(o,n);if(o>n-em)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(Xh*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=om());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function ac(i,t,e){return new ko(i,{minFilter:ni,generateMipmaps:t,type:Nn,colorSpace:Ys,depthBuffer:e})}function $s(i,t,e){return new vi({name:i,uniforms:t,vertexShader:ae.cube_vert,fragmentShader:e,side:an,blending:Fi,depthTest:!1,depthWrite:!1})}function sm(){return $s("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Xh}u

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
	`)}function rm(){return $s("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Yh}},`

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
	`)}function om(){return $s("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${tm}
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
	`)}function lc(){return $s("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function cc(){return $s("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function am(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?o(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===wr||p===Rr)if(t.has(u)){const _=t.get(u).texture;return a(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const b=new ko(_.height);return b.fromEquirectangularTexture(i,u),t.set(u,b),u.addEventListener("dispose",l),a(b.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const p=u.mapping,_=p===wr||p===Rr,b=p===Oi||p===ls;if(_||b){let f=e.get(u);const g=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Js(i)),f=_?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{const S=u.image;return _&&S&&S.height>0||b&&S&&c(S)?(n===null&&(n=new Js(i)),f=_?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function a(u,p){return p===wr?u.mapping=Oi:p===Rr&&(u.mapping=ls),u}function c(u){let p=0;const _=6;for(let b=0;b<_;b++)u[b]!==void 0&&p++;return p===_}function l(u){const p=u.target;p.removeEventListener("dispose",l);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function m(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function lm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Bs("WebGLRenderer: "+n+" extension not supported."),s}}}function cm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(_=>delete s[_]);function a(_){c(_.target)}function c(_){_.index!==null&&t.remove(_.index);for(const f in _.attributes)t.remove(_.attributes[f]);_.removeEventListener("dispose",a),delete s[_.id],o.unregister(_);const b=r.get(_);b&&(t.remove(b),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function l(_,b){return s[b.id]!==void 0||(b.addEventListener("dispose",a),s[b.id]=new WeakRef(b),o.register(b,b.id,b),e.memory.geometries++),b}function d(_){const b=_.attributes;for(const f in b)t.update(b[f],i.ARRAY_BUFFER)}function m(_){const b=_.index,f=_.attributes.position;let g=0;if(f===void 0)return;const S=b!==null?b.array.length:f.array.length/3-1,T=f.count>=65535?il:nl,E=new T(Math.ceil(S/3)*6,1),M=E.array;if(b!==null){const h=b.array;g=b.version;for(let v=0,P=0;v<S;v+=3){const C=h[v+0],w=h[v+1],D=h[v+2];M[P++]=C,M[P++]=w,M[P++]=w,M[P++]=D,M[P++]=D,M[P++]=C}}else{g=f.version;for(let h=0,v=0;h<S;h+=3){const P=h+0,C=h+1,w=h+2;M[v++]=P,M[v++]=C,M[v++]=C,M[v++]=w,M[v++]=w,M[v++]=P}}E.version=g;const x=r.get(_);x&&t.remove(x),r.set(_,E)}function u(_){const b=r.get(_);if(b){const f=_.index;f!==null&&b.version<f.version&&m(_)}else m(_);return r.get(_)}function p(){for(const _ in s){const b=s[_].deref();b!==void 0&&c(b)}}return{get:l,update:d,getWireframeAttribute:u,dispose:p}}function hm(i,t,e){let n;function s(m){n=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function c(m,u){i.drawElements(n,u,r,m*o),e.update(u,n,1)}function l(m,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,m*o,p),e.update(u,n,p))}function d(m,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,p);let b=0;for(let f=0;f<p;f++)b+=u[f];e.update(b,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function um(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:ve("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function fm(i,t,e){const n=new WeakMap,s=new Ie;function r(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,m=d!==void 0?d.length:0;let u=n.get(a);if(u===void 0||u.count!==m){let P=function(){h.dispose(),n.delete(a),a.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let T=0;p===!0&&(T=1),_===!0&&(T=2),b===!0&&(T=3);let E=a.attributes.position.count*T,M=1;E>t.maxTextureSize&&(M=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const x=new Float32Array(E*M*4*m),h=new el(x,E,M,m);h.type=En,h.needsUpdate=!0;const v=T*4;for(let C=0;C<m;C++){const w=f[C],D=g[C],B=S[C],I=E*M*4*C;for(let k=0;k<w.count;k++){const U=k*v;p===!0&&(s.fromBufferAttribute(w,k),x[I+U+0]=s.x,x[I+U+1]=s.y,x[I+U+2]=s.z,x[I+U+3]=0),_===!0&&(s.fromBufferAttribute(D,k),x[I+U+4]=s.x,x[I+U+5]=s.y,x[I+U+6]=s.z,x[I+U+7]=0),b===!0&&(s.fromBufferAttribute(B,k),x[I+U+8]=s.x,x[I+U+9]=s.y,x[I+U+10]=s.z,x[I+U+11]=B.itemSize===4?s.w:1)}}u={count:m,texture:h,size:new Nt(E,M)},n.set(a,u),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];const _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function dm(i,t,e,n,s){let r=new WeakMap;function o(l){const d=s.render.frame,m=l.geometry,u=t.get(l,m);if(r.get(u)!==d&&(t.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function a(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:a}}const pm={[Fa]:"LINEAR_TONE_MAPPING",[Oa]:"REINHARD_TONE_MAPPING",[Ba]:"CINEON_TONE_MAPPING",[wo]:"ACES_FILMIC_TONE_MAPPING",[Ga]:"AGX_TONE_MAPPING",[ka]:"NEUTRAL_TONE_MAPPING",[za]:"CUSTOM_TONE_MAPPING"};function mm(i,t,e,n,s,r){const o=new Dn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const d=new Xe;d.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new we([0,2,0,0,2,0],2));const m=new Uh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Me(d,m),p=new _l(-1,1,1,-1,0,1);let _=null,b=null,f=!1,g,S=null,T=[],E=!1;this.setSize=function(M,x){o.setSize(M,x),a!==null&&a.setSize(M,x),c!==null&&c.setSize(M,x);for(let h=0;h<T.length;h++){const v=T[h];v.setSize&&v.setSize(M,x)}},this.setEffects=function(M){T=M,E=T.length>0&&T[0].isRenderPass===!0;const x=o.width,h=o.height;T.length>0&&a===null&&(a=new Dn(x,h,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),c=new Dn(x,h,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&T.some(P=>P.needsDepthTexture===!0);v!==(o.depthTexture!==null)&&(v===!0&&l===null&&(l=new zi(x,h),r===!0&&(l.format=ii,l.type=Bi)),o.dispose(),o.depthTexture=v?l:null,o.resolveDepthBuffer=v,o.storeMultisampledDepthBuffer=v);for(let P=0;P<T.length;P++){const C=T[P];C.setSize&&C.setSize(x,h),v&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(M,x){if(f||M.toneMapping===Yn&&T.length===0)return!1;if(S=x,x!==null){const h=x.width,v=x.height;(o.width!==h||o.height!==v)&&this.setSize(h,v)}return E===!1&&M.setRenderTarget(o),g=M.toneMapping,M.toneMapping=Yn,!0},this.hasRenderPass=function(){return E},this.end=function(M,x){M.toneMapping=g,f=!0;let h=o,v=a;for(let P=0;P<T.length;P++){const C=T[P];C.enabled!==!1&&(C.render(M,v,h,x),C.needsSwap!==!1&&(h=v,v=v===a?c:a))}if(_!==M.outputColorSpace||b!==M.toneMapping){_=M.outputColorSpace,b=M.toneMapping,m.defines={},pe.getTransfer(_)===Ae&&(m.defines.SRGB_TRANSFER="");const P=pm[b];P&&(m.defines[P]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=h.texture,M.setRenderTarget(S),M.render(u,p),S=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),d.dispose(),m.dispose()}}const qh=new $e,Zh=new zi(1,1),Kh=new cl(1),Jh=new el,$h=new vh,Qh=new ll,hc=[],uc=[],fc=new Float32Array(16),dc=new Float32Array(9),pc=new Float32Array(4);function gs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=hc[s];if(r===void 0&&(r=new Float32Array(s),hc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function qe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ho(i,t){let e=uc[t];e===void 0&&(e=new Int32Array(t),uc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function _m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2fv(this.addr,t),qe(e,t)}}function xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ye(e,t))return;i.uniform3fv(this.addr,t),qe(e,t)}}function vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4fv(this.addr,t),qe(e,t)}}function Mm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),qe(e,t)}else{if(Ye(e,n))return;pc.set(n),i.uniformMatrix2fv(this.addr,!1,pc),qe(e,n)}}function Sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),qe(e,t)}else{if(Ye(e,n))return;dc.set(n),i.uniformMatrix3fv(this.addr,!1,dc),qe(e,n)}}function ym(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),qe(e,t)}else{if(Ye(e,n))return;fc.set(n),i.uniformMatrix4fv(this.addr,!1,fc),qe(e,n)}}function bm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2iv(this.addr,t),qe(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3iv(this.addr,t),qe(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4iv(this.addr,t),qe(e,t)}}function wm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;i.uniform2uiv(this.addr,t),qe(e,t)}}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;i.uniform3uiv(this.addr,t),qe(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;i.uniform4uiv(this.addr,t),qe(e,t)}}function Vo(i){return i.version===0&&(i.compareFunction=$a,i.needsUpdate=!0),i}function Lm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Vo(Zh):r=qh,e.setTexture2D(t||r,s)}function Dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$h,s)}function Im(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Vo(Kh):r=Qh,e.setTextureCube(t||r,s)}function Nm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jh,s)}function Um(i){switch(i){case 5126:return gm;case 35664:return _m;case 35665:return xm;case 35666:return vm;case 35674:return Mm;case 35675:return Sm;case 35676:return ym;case 5124:case 35670:return bm;case 35667:case 35671:return Em;case 35668:case 35672:return Tm;case 35669:case 35673:return Am;case 5125:return wm;case 36294:return Rm;case 36295:return Cm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Lm;case 35679:case 36299:case 36307:return Dm;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Nm}}function Fm(i,t){i.uniform1fv(this.addr,t)}function Om(i,t){const e=gs(t,this.size,2);i.uniform2fv(this.addr,e)}function Bm(i,t){const e=gs(t,this.size,3);i.uniform3fv(this.addr,e)}function zm(i,t){const e=gs(t,this.size,4);i.uniform4fv(this.addr,e)}function Gm(i,t){const e=gs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function km(i,t){const e=gs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Hm(i,t){const e=gs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Vm(i,t){i.uniform1iv(this.addr,t)}function Wm(i,t){i.uniform2iv(this.addr,t)}function Xm(i,t){i.uniform3iv(this.addr,t)}function Ym(i,t){i.uniform4iv(this.addr,t)}function qm(i,t){i.uniform1uiv(this.addr,t)}function Zm(i,t){i.uniform2uiv(this.addr,t)}function Km(i,t){i.uniform3uiv(this.addr,t)}function Jm(i,t){i.uniform4uiv(this.addr,t)}function $m(i,t,e){const n=this.cache,s=t.length,r=Ho(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),qe(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Vo(Zh):o=qh;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Qm(i,t,e){const n=this.cache,s=t.length,r=Ho(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),qe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||$h,r[o])}function jm(i,t,e){const n=this.cache,s=t.length,r=Ho(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),qe(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Vo(Kh):o=Qh;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function t0(i,t,e){const n=this.cache,s=t.length,r=Ho(e,s);Ye(n,r)||(i.uniform1iv(this.addr,r),qe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Jh,r[o])}function e0(i){switch(i){case 5126:return Fm;case 35664:return Om;case 35665:return Bm;case 35666:return zm;case 35674:return Gm;case 35675:return km;case 35676:return Hm;case 5124:case 35670:return Vm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return Ym;case 5125:return qm;case 36294:return Zm;case 36295:return Km;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return t0}}class n0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Um(e.type)}}class i0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=e0(e.type)}}class s0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function mc(i,t){i.seq.push(t),i.map[t.id]=t}function r0(i,t,e){const n=i.name,s=n.length;for(xa.lastIndex=0;;){const r=xa.exec(n),o=xa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){mc(e,l===void 0?new n0(a,i,t):new i0(a,i,t));break}else{let m=e.map[a];m===void 0&&(m=new s0(a),mc(e,m)),e=m}}}class Dr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);r0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function gc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const o0=37297;let a0=0;function l0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const _c=new ee;function c0(i){pe._getMatrix(_c,pe.workingColorSpace,i);const t=`mat3( ${_c.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(i)){case qs:return[t,"LinearTransferOETF"];case Ae:return[t,"sRGBTransferOETF"];default:return Jt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function xc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+l0(i.getShaderSource(t),a)}else return r}function h0(i,t){const e=c0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const u0={[Fa]:"Linear",[Oa]:"Reinhard",[Ba]:"Cineon",[wo]:"ACESFilmic",[Ga]:"AgX",[ka]:"Neutral",[za]:"Custom"};function f0(i,t){const e=u0[t];return e===void 0?(Jt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Er=new O;function d0(){pe.getLuminanceCoefficients(Er);const i=Er.x.toFixed(4),t=Er.y.toFixed(4),e=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function p0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function m0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function g0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ds(i){return i!==""}function vc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Mc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(i){return i.replace(_0,x0)}function x0(i,t){const e=ae[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Da(e)}const v0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sc(i){return i.replace(v0,M0)}function M0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function yc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const S0={[Is]:"SHADOWMAP_TYPE_PCF",[is]:"SHADOWMAP_TYPE_VSM"};function y0(i){return S0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const b0={[ls]:"ENVMAP_MODE_REFRACTION"};function E0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":b0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const T0={[Ua]:"ENVMAP_BLENDING_MULTIPLY",[th]:"ENVMAP_BLENDING_MIX",[eh]:"ENVMAP_BLENDING_ADD"};function A0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":T0[i.combine]||"ENVMAP_BLENDING_NONE"}function w0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=y0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=E0(e),m=A0(e),u=p0(e),p=m0(r),_=s.createProgram();let b,f,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(b=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ds).join(`
`),b.length>0&&(b+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ds).join(`
`),f.length>0&&(f+=`
`)):(b=[yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),f=[yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+m:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yn?"#define TONE_MAPPING":"",e.toneMapping!==Yn?ae.tonemapping_pars_fragment:"",e.toneMapping!==Yn?f0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,h0("linearToOutputTexel",e.outputColorSpace),d0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),o=Da(o),o=vc(o,e),o=Mc(o,e),a=Da(a),a=vc(a,e),a=Mc(a,e),o=Sc(o),a=Sc(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,b=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,f=["#define varying in",e.glslVersion===Ea?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ea?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=g+b+o,T=g+f+a,E=gc(s,s.VERTEX_SHADER,S),M=gc(s,s.FRAGMENT_SHADER,T);s.attachShader(_,E),s.attachShader(_,M),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function x(C){if(i.debug.checkShaderErrors){const w=s.getProgramInfoLog(_)||"",D=s.getShaderInfoLog(E)||"",B=s.getShaderInfoLog(M)||"",I=w.trim(),k=D.trim(),U=B.trim();let V=!0,at=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,M);else{const $=xc(s,E,"vertex"),j=xc(s,M,"fragment");ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+$+`
`+j)}else I!==""?Jt("WebGLProgram: Program Info Log:",I):(k===""||U==="")&&(at=!1);at&&(C.diagnostics={runnable:V,programLog:I,vertexShader:{log:k,prefix:b},fragmentShader:{log:U,prefix:f}})}s.deleteShader(E),s.deleteShader(M),h=new Dr(s,_),v=g0(s,_)}let h;this.getUniforms=function(){return h===void 0&&x(this),h};let v;this.getAttributes=function(){return v===void 0&&x(this),v};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,o0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=a0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=M,this}let R0=0;class C0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new P0(t),e.set(t,n)),n}}class P0{constructor(t){this.id=R0++,this.code=t,this.usedTimes=0}}function L0(i){return i===xi||i===Ws||i===Xs}function D0(i,t,e,n,s,r){const o=new Fo,a=new C0,c=new Set,l=[],d=new Map,m=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(h){return c.add(h),h===0?"uv":`uv${h}`}function _(h,v,P,C,w,D){const B=C.fog,I=w.geometry,k=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?C.environment:null,U=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,V=t.get(h.envMap||k,U),at=u[h.type];let $=n.precision;h.precision!==null&&($=n.getMaxPrecision(h.precision),$!==h.precision&&Jt("WebGLProgram.getParameters:",h.precision,"not supported, using",$,"instead."));const j=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ct=j!==void 0?j.length:0;let St=0;I.morphAttributes.position!==void 0&&(St=1),I.morphAttributes.normal!==void 0&&(St=2),I.morphAttributes.color!==void 0&&(St=3);let wt,nt,pt,Rt;if(at){const ft=Pn[at];wt=ft.vertexShader,nt=ft.fragmentShader}else{wt=h.vertexShader,nt=h.fragmentShader;const ft=a.getVertexShaderStage(h),de=a.getFragmentShaderStage(h);a.update(h,ft,de),pt=ft.id,Rt=de.id}const Lt=i.getRenderTarget(),ut=i.state.buffers.depth.getReversed(),Ot=w.isInstancedMesh===!0,ye=w.isBatchedMesh===!0,Wt=!!h.map,fe=!!h.matcap,_e=!!V,oe=_e&&V.isPMREMTexture===!0,At=!!h.aoMap,qt=!!h.lightMap,le=!!h.bumpMap&&h.wireframe===!1,Xt=!!h.normalMap,ge=!!h.displacementMap,xe=!!h.emissiveMap,ne=!!h.metalnessMap,Ce=!!h.roughnessMap,Fe=h.anisotropy>0,H=h.clearcoat>0,Ze=h.diffuseRoughness>0,ie=h.dispersion>0,Gt=h.retroreflectivity>0,bt=h.iridescence>0,Se=h.sheen>0,Bt=h.transmission>0,Kt=Fe&&!!h.anisotropyMap,N=H&&!!h.clearcoatMap,A=H&&!!h.clearcoatNormalMap,Z=H&&!!h.clearcoatRoughnessMap,dt=Ze&&!!h.diffuseRoughnessMap,st=bt&&!!h.iridescenceMap,mt=bt&&!!h.iridescenceThicknessMap,xt=Se&&!!h.sheenColorMap,it=Se&&!!h.sheenRoughnessMap,ot=!!h.specularMap,yt=!!h.specularColorMap,z=!!h.specularIntensityMap,rt=Bt&&!!h.transmissionMap,Y=Bt&&!!h.thicknessMap,_t=!!h.gradientMap,lt=!!h.alphaMap,vt=h.alphaTest>0,Vt=!!h.alphaHash,Qt=!!h.extensions;let gt=Yn;h.toneMapped&&(Lt===null||Lt.isXRRenderTarget===!0)&&(gt=i.toneMapping);const Dt=oe?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,Ut={shaderID:at,shaderType:h.type,shaderName:h.name,vertexShader:wt,fragmentShader:nt,defines:h.defines,customVertexShaderID:pt,customFragmentShaderID:Rt,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:$,batching:ye,batchingColor:ye&&w._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&w.instanceColor!==null,instancingMorph:Ot&&w.morphTexture!==null,outputColorSpace:Lt===null?i.outputColorSpace:Lt.isXRRenderTarget===!0?Lt.texture.colorSpace:pe.workingColorSpace,alphaToCoverage:!!h.alphaToCoverage,map:Wt,matcap:fe,envMap:_e,envMapMode:_e&&V.mapping,envMapPMREM:oe,envMapMaxLod:oe?Dt.length-1:null,envMapSize:oe?Dt[0].width:null,aoMap:At,lightMap:qt,bumpMap:le,normalMap:Xt,displacementMap:ge,emissiveMap:xe,normalMapObjectSpace:Xt&&h.normalMapType===sh,normalMapTangentSpace:Xt&&h.normalMapType===vo,packedNormalMap:Xt&&h.normalMapType===vo&&L0(h.normalMap.format),metalnessMap:ne,roughnessMap:Ce,anisotropy:Fe,anisotropyMap:Kt,clearcoat:H,clearcoatMap:N,clearcoatNormalMap:A,clearcoatRoughnessMap:Z,diffuseRoughness:Ze,diffuseRoughnessMap:dt,dispersion:ie,retroreflection:Gt,iridescence:bt,iridescenceMap:st,iridescenceThicknessMap:mt,sheen:Se,sheenColorMap:xt,sheenRoughnessMap:it,specularMap:ot,specularColorMap:yt,specularIntensityMap:z,transmission:Bt,transmissionMap:rt,thicknessMap:Y,gradientMap:_t,opaque:h.transparent===!1&&h.blending===ss&&h.alphaToCoverage===!1,alphaMap:lt,alphaTest:vt,alphaHash:Vt,combine:h.combine,mapUv:Wt&&p(h.map.channel),aoMapUv:At&&p(h.aoMap.channel),lightMapUv:qt&&p(h.lightMap.channel),bumpMapUv:le&&p(h.bumpMap.channel),normalMapUv:Xt&&p(h.normalMap.channel),displacementMapUv:ge&&p(h.displacementMap.channel),emissiveMapUv:xe&&p(h.emissiveMap.channel),metalnessMapUv:ne&&p(h.metalnessMap.channel),roughnessMapUv:Ce&&p(h.roughnessMap.channel),anisotropyMapUv:Kt&&p(h.anisotropyMap.channel),clearcoatMapUv:N&&p(h.clearcoatMap.channel),clearcoatNormalMapUv:A&&p(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&p(h.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:dt&&p(h.diffuseRoughnessMap.channel),iridescenceMapUv:st&&p(h.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&p(h.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&p(h.sheenColorMap.channel),sheenRoughnessMapUv:it&&p(h.sheenRoughnessMap.channel),specularMapUv:ot&&p(h.specularMap.channel),specularColorMapUv:yt&&p(h.specularColorMap.channel),specularIntensityMapUv:z&&p(h.specularIntensityMap.channel),transmissionMapUv:rt&&p(h.transmissionMap.channel),thicknessMapUv:Y&&p(h.thicknessMap.channel),alphaMapUv:lt&&p(h.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Xt||Fe),vertexNormals:!!I.attributes.normal,vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!I.attributes.uv&&(Wt||lt),fog:!!B,useFog:h.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:h.wireframe===!1&&(h.flatShading===!0||I.attributes.normal===void 0&&Xt===!1&&(h.isMeshLambertMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isMeshPhysicalMaterial)),sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:ut,skinning:w.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:St,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:D.filter(ft=>ft.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:h.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:gt,decodeVideoTexture:Wt&&h.map.isVideoTexture===!0&&pe.getTransfer(h.map.colorSpace)===Ae,decodeVideoTextureEmissive:xe&&h.emissiveMap.isVideoTexture===!0&&pe.getTransfer(h.emissiveMap.colorSpace)===Ae,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===en,flipSided:h.side===an,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:Qt&&h.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&h.extensions.multiDraw===!0||ye)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function b(h){const v=[];if(h.shaderID?v.push(h.shaderID):(v.push(h.customVertexShaderID),v.push(h.customFragmentShaderID)),h.defines!==void 0)for(const P in h.defines)v.push(P),v.push(h.defines[P]);return h.isRawShaderMaterial===!1&&(f(v,h),g(v,h),v.push(i.outputColorSpace)),v.push(h.customProgramCacheKey),v.join()}function f(h,v){h.push(v.precision),h.push(v.outputColorSpace),h.push(v.envMapMode),h.push(v.envMapPMREM),h.push(v.envMapMaxLod),h.push(v.envMapSize),h.push(v.mapUv),h.push(v.alphaMapUv),h.push(v.lightMapUv),h.push(v.aoMapUv),h.push(v.bumpMapUv),h.push(v.normalMapUv),h.push(v.displacementMapUv),h.push(v.emissiveMapUv),h.push(v.metalnessMapUv),h.push(v.roughnessMapUv),h.push(v.anisotropyMapUv),h.push(v.clearcoatMapUv),h.push(v.clearcoatNormalMapUv),h.push(v.clearcoatRoughnessMapUv),h.push(v.diffuseRoughnessMapUv),h.push(v.iridescenceMapUv),h.push(v.iridescenceThicknessMapUv),h.push(v.sheenColorMapUv),h.push(v.sheenRoughnessMapUv),h.push(v.specularMapUv),h.push(v.specularColorMapUv),h.push(v.specularIntensityMapUv),h.push(v.transmissionMapUv),h.push(v.thicknessMapUv),h.push(v.combine),h.push(v.fogExp2),h.push(v.sizeAttenuation),h.push(v.morphTargetsCount),h.push(v.numSunLights),h.push(v.numDirLights),h.push(v.numPointLights),h.push(v.numSpotLights),h.push(v.numSpotLightMaps),h.push(v.numHemiLights),h.push(v.numRectAreaLights),h.push(v.numSunLightShadows),h.push(v.numDirLightShadows),h.push(v.numPointLightShadows),h.push(v.numSpotLightShadows),h.push(v.numSpotLightShadowsWithMaps),h.push(v.numLightProbes),h.push(v.numLightProbeGrids),h.push(v.shadowMapType),h.push(v.toneMapping),h.push(v.numClippingPlanes),h.push(v.numClipIntersection),h.push(v.depthPacking)}function g(h,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.diffuseRoughness&&o.enable(25),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),h.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),h.push(o.mask)}function S(h){const v=u[h.type];let P;if(v){const C=Pn[v];P=Nh.clone(C.uniforms)}else P=h.uniforms;return P}function T(h,v){let P=d.get(v);return P!==void 0?++P.usedTimes:(P=new w0(i,v,h,s),l.push(P),d.set(v,P)),P}function E(h){if(--h.usedTimes===0){const v=l.indexOf(h);l[v]=l[l.length-1],l.pop(),d.delete(h.cacheKey),h.destroy()}}function M(h){a.remove(h)}function x(){a.dispose()}return{getParameters:_,getProgramCacheKey:b,getUniforms:S,acquireProgram:T,releaseProgram:E,releaseShaderCache:M,programs:l,dispose:x}}function I0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function N0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function bc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ec(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,_,b,f,g){let S=i[t];return S===void 0?(S={id:u.id,object:u,geometry:p,material:_,materialVariant:o(u),groupOrder:b,renderOrder:u.renderOrder,z:f,group:g},i[t]=S):(S.id=u.id,S.object=u,S.geometry=p,S.material=_,S.materialVariant=o(u),S.groupOrder=b,S.renderOrder=u.renderOrder,S.z=f,S.group=g),t++,S}function c(u,p,_,b,f,g,S){S.reversedDepth===!0&&(f=-f);const T=a(u,p,_,b,f,g);_.transmission>0?n.push(T):_.transparent===!0?s.push(T):e.push(T)}function l(u,p,_,b,f,g){const S=a(u,p,_,b,f,g);_.transmission>0?n.unshift(S):_.transparent===!0?s.unshift(S):e.unshift(S)}function d(u,p){e.length>1&&e.sort(u||N0),n.length>1&&n.sort(p||bc),s.length>1&&s.sort(p||bc)}function m(){for(let u=t,p=i.length;u<p;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:m,sort:d}}function U0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ec,i.set(n,[o])):s>=r.length?(o=new Ec,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function F0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new se};break;case"SpotLight":e={position:new O,direction:new O,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new se,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new se,groundColor:new se};break;case"RectAreaLight":e={color:new se,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function O0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let B0=0;function z0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function G0(i){const t=new F0,e=O0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);const s=new O,r=new me,o=new me;function a(l){let d=0,m=0,u=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let p=0,_=0,b=0,f=0,g=0,S=0,T=0,E=0,M=0,x=0,h=0,v=0,P=0,C=0;l.sort(z0);for(let D=0,B=l.length;D<B;D++){const I=l[D],k=I.color,U=I.intensity,V=I.distance;let at=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===xi?at=I.shadow.map.texture:at=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*U,m+=k.g*U,u+=k.b*U;else if(I.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(I.sh.coefficients[$],U);C++}else if(I.isSunLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,ct=e.get(I);ct.shadowIntensity=j.intensity,ct.shadowBias=j.bias,ct.shadowNormalBias=j.normalBias,ct.shadowRadius=j.radius,ct.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=ct,n.sunShadowMap[_]=at;const St=j.getViewportCount();for(let wt=0;wt<St;wt++)n.sunShadowMatrix[b+wt]=j.getMatrix(wt),n.sunShadowCascade[b+wt]=j._cascadeData[wt];b+=St,_++}n.sun[p]=$,p++}else if(I.isDirectionalLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,ct=e.get(I);ct.shadowIntensity=j.intensity,ct.shadowBias=j.bias,ct.shadowNormalBias=j.normalBias,ct.shadowRadius=j.radius,ct.shadowMapSize=j.mapSize,n.directionalShadow[f]=ct,n.directionalShadowMap[f]=at,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=$,f++}else if(I.isSpotLight){const $=t.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(k).multiplyScalar(U),$.distance=V,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,n.spot[S]=$;const j=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,j.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[S]=j.matrix,I.castShadow){const ct=e.get(I);ct.shadowIntensity=j.intensity,ct.shadowBias=j.bias,ct.shadowNormalBias=j.normalBias,ct.shadowRadius=j.radius,ct.shadowMapSize=j.mapSize,n.spotShadow[S]=ct,n.spotShadowMap[S]=at,h++}S++}else if(I.isRectAreaLight){const $=t.get(I);$.color.copy(k).multiplyScalar(U),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=$,T++}else if(I.isPointLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const j=I.shadow,ct=e.get(I);ct.shadowIntensity=j.intensity,ct.shadowBias=j.bias,ct.shadowNormalBias=j.normalBias,ct.shadowRadius=j.radius,ct.shadowMapSize=j.mapSize,ct.shadowCameraNear=j.camera.near,ct.shadowCameraFar=j.camera.far,n.pointShadow[g]=ct,n.pointShadowMap[g]=at,n.pointShadowMatrix[g]=I.shadow.matrix,x++}n.point[g]=$,g++}else if(I.isHemisphereLight){const $=t.get(I);$.skyColor.copy(I.color).multiplyScalar(U),$.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[E]=$,E++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pt.LTC_FLOAT_1,n.rectAreaLTC2=Pt.LTC_FLOAT_2):(n.rectAreaLTC1=Pt.LTC_HALF_1,n.rectAreaLTC2=Pt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=m,n.ambient[2]=u;const w=n.hash;(w.sunLength!==p||w.directionalLength!==f||w.pointLength!==g||w.spotLength!==S||w.rectAreaLength!==T||w.hemiLength!==E||w.numSunShadows!==_||w.numDirectionalShadows!==M||w.numPointShadows!==x||w.numSpotShadows!==h||w.numSpotMaps!==v||w.numLightProbes!==C)&&(n.sun.length=p,n.directional.length=f,n.spot.length=S,n.rectArea.length=T,n.point.length=g,n.hemi.length=E,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.pointShadowMatrix.length=x,n.spotShadow.length=h,n.spotShadowMap.length=h,n.spotLightMatrix.length=h+v-P,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=C,w.sunLength=p,w.directionalLength=f,w.pointLength=g,w.spotLength=S,w.rectAreaLength=T,w.hemiLength=E,w.numSunShadows=_,w.numDirectionalShadows=M,w.numPointShadows=x,w.numSpotShadows=h,w.numSpotMaps=v,w.numLightProbes=C,n.version=B0++)}function c(l,d){let m=0,u=0,p=0,_=0,b=0,f=0;const g=d.matrixWorldInverse;for(let S=0,T=l.length;S<T;S++){const E=l[S];if(E.isSunLight){const M=n.sun[m];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),m++}else if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),u++}else if(E.isSpotLight){const M=n.spot[_];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),_++}else if(E.isRectAreaLight){const M=n.rectArea[b];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),b++}else if(E.isPointLight){const M=n.point[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),p++}else if(E.isHemisphereLight){const M=n.hemi[f];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),f++}}}return{setup:a,setupView:c,state:n}}function Tc(i){const t=new G0(i),e=[],n=[],s=[];function r(m){d.camera=m,e.length=0,n.length=0,s.length=0}function o(m){m.isLightProbeGrid?s.push(m):e.push(m)}function a(m){n.push(m)}function c(){t.setup(e),s.sort((m,u)=>m.priority-u.priority||m.id-u.id)}function l(m){t.setupView(e,m)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function k0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Tc(i),t.set(s,[a])):r>=o.length?(a=new Tc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const H0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V0=`uniform sampler2D shadow_pass;
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
}`,W0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],X0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Ac=new me,Cs=new O,va=new O;function Y0(i,t,e){let n=new us;const s=new Nt,r=new Nt,o=new Ie,a=new Fh,c=new Oh,l={},d=e.maxTextureSize,m={[_i]:an,[an]:_i,[en]:en},u=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:H0,fragmentShader:V0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new Xe;_.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Me(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Is;let g=this.type;this.render=function(x,h,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||x.length===0)return;this.type===Uc&&(Jt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Is);const P=i.getRenderTarget(),C=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Fi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const B=g!==this.type;B&&h.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=x.length;I<k;I++){const U=x[I],V=U.shadow;if(V===void 0){Jt("WebGLShadowMap:",U,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const at=V.getFrameExtents();s.multiply(at),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/at.x),s.x=r.x*at.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/at.y),s.y=r.y*at.y,V.mapSize.y=r.y));const $=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=$,V.map===null||B===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===is){if(U.isPointLight){Jt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Dn(s.x,s.y,{format:xi,type:Nn,minFilter:on,magFilter:on,generateMipmaps:!1}),V.map.texture.name=U.name+".shadowMap",V.map.depthTexture=new zi(s.x,s.y,En),V.map.depthTexture.name=U.name+".shadowMapDepth",V.map.depthTexture.format=oi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Je,V.map.depthTexture.magFilter=Je}else U.isPointLight?(V.map=new ko(s.x),V.map.depthTexture=new cl(s.x,In)):(V.map=new Dn(s.x,s.y),V.map.depthTexture=new zi(s.x,s.y,In)),V.map.depthTexture.name=U.name+".shadowMap",V.map.depthTexture.format=oi,this.type===Is?(V.map.depthTexture.compareFunction=$?Ja:Ka,V.map.depthTexture.minFilter=on,V.map.depthTexture.magFilter=on):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Je,V.map.depthTexture.magFilter=Je);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);const j=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();U.isPointLight!==!0&&V.updateMatrices(U,v);const ct=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:v.layers;for(let St=0;St<j;St++){const wt=V.getCamera(St);if(U.isPointLight){const nt=V.camera,pt=V.matrix,Rt=U.distance||nt.far;Rt!==nt.far&&(nt.far=Rt,nt.updateProjectionMatrix()),Cs.setFromMatrixPosition(U.matrixWorld),nt.position.copy(Cs),va.copy(nt.position),va.add(W0[St]),nt.up.copy(X0[St]),nt.lookAt(va),nt.updateMatrixWorld(),pt.makeTranslation(-Cs.x,-Cs.y,-Cs.z),Ac.multiplyMatrices(nt.projectionMatrix,nt.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Ac,nt.coordinateSystem,nt.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,St),i.clear();else{St===0&&(i.setRenderTarget(V.map),i.clear());const nt=V.getViewport(St);o.set(r.x*nt.x,r.y*nt.y,r.x*nt.z,r.y*nt.w),D.viewport(o)}n=V.getFrustum(St),E(h,v,wt,U,ct,this.type)}V.isPointLightShadow!==!0&&this.type===is&&S(V,v),V.needsUpdate=!1}g=this.type,f.needsUpdate=!1,i.setRenderTarget(P,C,w)};function S(x,h){const v=t.update(b);u.defines.VSM_SAMPLES!==x.blurSamples&&(u.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null?x.mapPass=new Dn(s.x,s.y,{format:xi,type:Nn}):(x.mapPass.width!==x.map.width||x.mapPass.height!==x.map.height)&&x.mapPass.setSize(x.map.width,x.map.height),u.uniforms.shadow_pass.value=x.map.depthTexture,u.uniforms.resolution.value.set(x.map.width,x.map.height),u.uniforms.radius.value=x.radius,i.setRenderTarget(x.mapPass),i.clear(),i.renderBufferDirect(h,null,v,u,b,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value.set(x.map.width,x.map.height),p.uniforms.radius.value=x.radius,i.setRenderTarget(x.map),i.clear(),i.renderBufferDirect(h,null,v,p,b,null)}function T(x,h,v,P){let C=null;const w=v.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(w!==void 0)C=w;else if(C=v.isPointLight===!0?c:a,i.localClippingEnabled&&h.clipShadows===!0&&Array.isArray(h.clippingPlanes)&&h.clippingPlanes.length!==0||h.displacementMap&&h.displacementScale!==0||h.alphaMap&&h.alphaTest>0||h.map&&h.alphaTest>0||h.alphaToCoverage===!0){const D=C.uuid,B=h.uuid;let I=l[D];I===void 0&&(I={},l[D]=I);let k=I[B];k===void 0&&(k=C.clone(),I[B]=k,h.addEventListener("dispose",M)),C=k}if(C.visible=h.visible,C.wireframe=h.wireframe,P===is?C.side=h.shadowSide!==null?h.shadowSide:h.side:C.side=h.shadowSide!==null?h.shadowSide:m[h.side],C.alphaMap=h.alphaMap,C.alphaTest=h.alphaToCoverage===!0?.5:h.alphaTest,C.map=h.map,C.clipShadows=h.clipShadows,C.clippingPlanes=h.clippingPlanes,C.clipIntersection=h.clipIntersection,C.displacementMap=h.displacementMap,C.displacementScale=h.displacementScale,C.displacementBias=h.displacementBias,C.wireframeLinewidth=h.wireframeLinewidth,C.linewidth=h.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const D=i.properties.get(C);D.light=v}return C}function E(x,h,v,P,C,w){if(x.visible===!1)return;if(x.layers.test(C)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&w===is)&&(!x.frustumCulled||x.intersectsFrustum(n))){x.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,x.matrixWorld);const I=t.update(x),k=x.material;if(Array.isArray(k)){const U=I.groups;for(let V=0,at=U.length;V<at;V++){const $=U[V],j=k[$.materialIndex];if(j&&j.visible){const ct=T(x,j,P,w);x.onBeforeShadow(i,x,h,v,I,ct,$),i.renderBufferDirect(v,null,I,ct,x,$),x.onAfterShadow(i,x,h,v,I,ct,$)}}}else if(k.visible){const U=T(x,k,P,w);x.onBeforeShadow(i,x,h,v,I,U,null),i.renderBufferDirect(v,null,I,U,x,null),x.onAfterShadow(i,x,h,v,I,U,null)}}const B=x.children;for(let I=0,k=B.length;I<k;I++)E(B[I],h,v,P,C,w)}function M(x){x.target.removeEventListener("dispose",M);for(const v in l){const P=l[v],C=x.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function q0(i,t){function e(){let z=!1;const rt=new Ie;let Y=null;const _t=new Ie(0,0,0,0);return{setMask:function(lt){Y!==lt&&!z&&(i.colorMask(lt,lt,lt,lt),Y=lt)},setLocked:function(lt){z=lt},setClear:function(lt,vt,Vt,Qt,gt){gt===!0&&(lt*=Qt,vt*=Qt,Vt*=Qt),rt.set(lt,vt,Vt,Qt),_t.equals(rt)===!1&&(i.clearColor(lt,vt,Vt,Qt),_t.copy(rt))},reset:function(){z=!1,Y=null,_t.set(-1,0,0,0)}}}function n(){let z=!1,rt=!1,Y=null,_t=null,lt=null;return{setReversed:function(vt){if(rt!==vt){const Vt=t.get("EXT_clip_control");vt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT),rt=vt;const Qt=lt;lt=null,this.setClear(Qt)}},getReversed:function(){return rt},setTest:function(vt){vt?ut(i.DEPTH_TEST):Ot(i.DEPTH_TEST)},setMask:function(vt){Y!==vt&&!z&&(i.depthMask(vt),Y=vt)},setFunc:function(vt){if(rt&&(vt=xu[vt]),_t!==vt){switch(vt){case Ir:i.depthFunc(i.NEVER);break;case Nr:i.depthFunc(i.ALWAYS);break;case Ur:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case Fr:i.depthFunc(i.EQUAL);break;case Or:i.depthFunc(i.GEQUAL);break;case Br:i.depthFunc(i.GREATER);break;case zr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_t=vt}},setLocked:function(vt){z=vt},setClear:function(vt){lt!==vt&&(lt=vt,rt&&(vt=1-vt),i.clearDepth(vt))},reset:function(){z=!1,Y=null,_t=null,lt=null,rt=!1}}}function s(){let z=!1,rt=null,Y=null,_t=null,lt=null,vt=null,Vt=null,Qt=null,gt=null;return{setTest:function(Dt){z||(Dt?ut(i.STENCIL_TEST):Ot(i.STENCIL_TEST))},setMask:function(Dt){rt!==Dt&&!z&&(i.stencilMask(Dt),rt=Dt)},setFunc:function(Dt,Ut,ft){(Y!==Dt||_t!==Ut||lt!==ft)&&(i.stencilFunc(Dt,Ut,ft),Y=Dt,_t=Ut,lt=ft)},setOp:function(Dt,Ut,ft){(vt!==Dt||Vt!==Ut||Qt!==ft)&&(i.stencilOp(Dt,Ut,ft),vt=Dt,Vt=Ut,Qt=ft)},setLocked:function(Dt){z=Dt},setClear:function(Dt){gt!==Dt&&(i.clearStencil(Dt),gt=Dt)},reset:function(){z=!1,rt=null,Y=null,_t=null,lt=null,vt=null,Vt=null,Qt=null,gt=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let d={},m={},u={},p=new WeakMap,_=[],b=null,f=!1,g=null,S=null,T=null,E=null,M=null,x=null,h=null,v=new se(0,0,0),P=0,C=!1,w=null,D=null,B=null,I=null,k=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,at=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec($)[1]),V=at>=1):$.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),V=at>=2);let j=null,ct={};const St=i.getParameter(i.SCISSOR_BOX),wt=i.getParameter(i.VIEWPORT),nt=new Ie().fromArray(St),pt=new Ie().fromArray(wt);function Rt(z,rt,Y,_t){const lt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(z,vt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<Y;Vt++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,_t,0,i.RGBA,i.UNSIGNED_BYTE,lt):i.texImage2D(rt+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,lt);return vt}const Lt={};Lt[i.TEXTURE_2D]=Rt(i.TEXTURE_2D,i.TEXTURE_2D,1),Lt[i.TEXTURE_CUBE_MAP]=Rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Lt[i.TEXTURE_2D_ARRAY]=Rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Lt[i.TEXTURE_3D]=Rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),o.setFunc(as),le(!1),Xt(Sa),ut(i.CULL_FACE),At(Fi);function ut(z){d[z]!==!0&&(i.enable(z),d[z]=!0)}function Ot(z){d[z]!==!1&&(i.disable(z),d[z]=!1)}function ye(z,rt){return u[z]!==rt?(i.bindFramebuffer(z,rt),u[z]=rt,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=rt),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function Wt(z,rt){let Y=_,_t=!1;if(z){Y=p.get(rt),Y===void 0&&(Y=[],p.set(rt,Y));const lt=z.textures;if(Y.length!==lt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Vt=lt.length;vt<Vt;vt++)Y[vt]=i.COLOR_ATTACHMENT0+vt;Y.length=lt.length,_t=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,_t=!0);_t&&i.drawBuffers(Y)}function fe(z){return b!==z?(i.useProgram(z),b=z,!0):!1}const _e={[Ii]:i.FUNC_ADD,[Oc]:i.FUNC_SUBTRACT,[Bc]:i.FUNC_REVERSE_SUBTRACT};_e[zc]=i.MIN,_e[Gc]=i.MAX;const oe={[kc]:i.ZERO,[Hc]:i.ONE,[Vc]:i.SRC_COLOR,[Ia]:i.SRC_ALPHA,[Kc]:i.SRC_ALPHA_SATURATE,[qc]:i.DST_COLOR,[Xc]:i.DST_ALPHA,[Wc]:i.ONE_MINUS_SRC_COLOR,[Na]:i.ONE_MINUS_SRC_ALPHA,[Zc]:i.ONE_MINUS_DST_COLOR,[Yc]:i.ONE_MINUS_DST_ALPHA,[Jc]:i.CONSTANT_COLOR,[$c]:i.ONE_MINUS_CONSTANT_COLOR,[Qc]:i.CONSTANT_ALPHA,[jc]:i.ONE_MINUS_CONSTANT_ALPHA};function At(z,rt,Y,_t,lt,vt,Vt,Qt,gt,Dt){if(z===Fi){f===!0&&(Ot(i.BLEND),f=!1);return}if(f===!1&&(ut(i.BLEND),f=!0),z!==Fc){if(z!==g||Dt!==C){if((S!==Ii||M!==Ii)&&(i.blendEquation(i.FUNC_ADD),S=Ii,M=Ii),Dt)switch(z){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vs:i.blendFunc(i.ONE,i.ONE);break;case ya:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ba:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ve("WebGLState: Invalid blending: ",z);break}else switch(z){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ya:ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ba:ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ve("WebGLState: Invalid blending: ",z);break}T=null,E=null,x=null,h=null,v.set(0,0,0),P=0,g=z,C=Dt}return}lt=lt||rt,vt=vt||Y,Vt=Vt||_t,(rt!==S||lt!==M)&&(i.blendEquationSeparate(_e[rt],_e[lt]),S=rt,M=lt),(Y!==T||_t!==E||vt!==x||Vt!==h)&&(i.blendFuncSeparate(oe[Y],oe[_t],oe[vt],oe[Vt]),T=Y,E=_t,x=vt,h=Vt),(Qt.equals(v)===!1||gt!==P)&&(i.blendColor(Qt.r,Qt.g,Qt.b,gt),v.copy(Qt),P=gt),g=z,C=!1}function qt(z,rt){z.side===en?Ot(i.CULL_FACE):ut(i.CULL_FACE);let Y=z.side===an;rt&&(Y=!Y),le(Y),z.blending===ss&&z.transparent===!1?At(Fi):At(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const _t=z.stencilWrite;a.setTest(_t),_t&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),xe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):Ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(z){w!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),w=z)}function Xt(z){z!==Ic?(ut(i.CULL_FACE),z!==D&&(z===Sa?i.cullFace(i.BACK):z===Nc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ot(i.CULL_FACE),D=z}function ge(z){z!==B&&(V&&i.lineWidth(z),B=z)}function xe(z,rt,Y){z?(ut(i.POLYGON_OFFSET_FILL),(I!==rt||k!==Y)&&(I=rt,k=Y,o.getReversed()&&(rt=-rt,Y=-Y),i.polygonOffset(rt,Y))):Ot(i.POLYGON_OFFSET_FILL)}function ne(z){z?ut(i.SCISSOR_TEST):Ot(i.SCISSOR_TEST)}function Ce(z){z===void 0&&(z=i.TEXTURE0+U-1),j!==z&&(i.activeTexture(z),j=z)}function Fe(z,rt,Y){Y===void 0&&(j===null?Y=i.TEXTURE0+U-1:Y=j);let _t=ct[Y];_t===void 0&&(_t={type:void 0,texture:void 0},ct[Y]=_t),(_t.type!==z||_t.texture!==rt)&&(j!==Y&&(i.activeTexture(Y),j=Y),i.bindTexture(z,rt||Lt[z]),_t.type=z,_t.texture=rt)}function H(){const z=ct[j];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(z){ve("WebGLState:",z)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(z){ve("WebGLState:",z)}}function Gt(){try{i.texSubImage2D(...arguments)}catch(z){ve("WebGLState:",z)}}function bt(){try{i.texSubImage3D(...arguments)}catch(z){ve("WebGLState:",z)}}function Se(){try{i.compressedTexSubImage2D(...arguments)}catch(z){ve("WebGLState:",z)}}function Bt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){ve("WebGLState:",z)}}function Kt(){try{i.texStorage2D(...arguments)}catch(z){ve("WebGLState:",z)}}function N(){try{i.texStorage3D(...arguments)}catch(z){ve("WebGLState:",z)}}function A(){try{i.texImage2D(...arguments)}catch(z){ve("WebGLState:",z)}}function Z(){try{i.texImage3D(...arguments)}catch(z){ve("WebGLState:",z)}}function dt(z){return m[z]!==void 0?m[z]:i.getParameter(z)}function st(z,rt){m[z]!==rt&&(i.pixelStorei(z,rt),m[z]=rt)}function mt(z){nt.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),nt.copy(z))}function xt(z){pt.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),pt.copy(z))}function it(z,rt){let Y=l.get(rt);Y===void 0&&(Y=new WeakMap,l.set(rt,Y));let _t=Y.get(z);_t===void 0&&(_t=i.getUniformBlockIndex(rt,z.name),i.uniformBlockBinding(rt,_t,_t),Y.set(z,_t))}function ot(z,rt,Y){const lt=l.get(rt).get(z);c[lt]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,lt,Y),c[lt]=Y)}function yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},m={},j=null,ct={},u={},c={},p=new WeakMap,_=[],b=null,f=!1,g=null,S=null,T=null,E=null,M=null,x=null,h=null,v=new se(0,0,0),P=0,C=!1,w=null,D=null,B=null,I=null,k=null,nt.set(0,0,i.canvas.width,i.canvas.height),pt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ut,disable:Ot,bindFramebuffer:ye,drawBuffers:Wt,useProgram:fe,setBlending:At,setMaterial:qt,setFlipSided:le,setCullFace:Xt,setLineWidth:ge,setPolygonOffset:xe,setScissorTest:ne,activeTexture:Ce,bindTexture:Fe,unbindTexture:H,compressedTexImage2D:Ze,compressedTexImage3D:ie,texImage2D:A,texImage3D:Z,pixelStorei:st,getParameter:dt,updateUBOMapping:it,uniformBlockBinding:ot,texStorage2D:Kt,texStorage3D:N,texSubImage2D:Gt,texSubImage3D:bt,compressedTexSubImage2D:Se,compressedTexSubImage3D:Bt,scissor:mt,viewport:xt,reset:yt}}function Z0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Nt,d=new WeakMap,m=new Set;let u;const p=new WeakMap,_=new Set,b=new FinalizationRegistry(N=>_.delete(N));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(N,A){return f?new OffscreenCanvas(N,A):Mo("canvas")}function S(N,A,Z){let dt=1;const st=Kt(N);if((st.width>Z||st.height>Z)&&(dt=Z/Math.max(st.width,st.height)),dt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const mt=Math.floor(dt*st.width),xt=Math.floor(dt*st.height);u===void 0&&(u=g(mt,xt));const it=A?g(mt,xt):u;return it.width=mt,it.height=xt,it.getContext("2d").drawImage(N,0,0,mt,xt),Jt("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+mt+"x"+xt+")."),it}else return"data"in N&&Jt("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),N;return N}function T(N){return N.generateMipmaps}function E(N){i.generateMipmap(N)}function M(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(N,A,Z,dt,st,mt=!1){if(N!==null){if(i[N]!==void 0)return i[N];Jt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let xt;dt&&(xt=t.get("EXT_texture_norm16"),xt||Jt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=A;if(A===i.RED&&(Z===i.FLOAT&&(it=i.R32F),Z===i.HALF_FLOAT&&(it=i.R16F),Z===i.UNSIGNED_BYTE&&(it=i.R8),Z===i.UNSIGNED_SHORT&&xt&&(it=xt.R16_EXT),Z===i.SHORT&&xt&&(it=xt.R16_SNORM_EXT)),A===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.R8UI),Z===i.UNSIGNED_SHORT&&(it=i.R16UI),Z===i.UNSIGNED_INT&&(it=i.R32UI),Z===i.BYTE&&(it=i.R8I),Z===i.SHORT&&(it=i.R16I),Z===i.INT&&(it=i.R32I)),A===i.RG&&(Z===i.FLOAT&&(it=i.RG32F),Z===i.HALF_FLOAT&&(it=i.RG16F),Z===i.UNSIGNED_BYTE&&(it=i.RG8),Z===i.UNSIGNED_SHORT&&xt&&(it=xt.RG16_EXT),Z===i.SHORT&&xt&&(it=xt.RG16_SNORM_EXT)),A===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RG8UI),Z===i.UNSIGNED_SHORT&&(it=i.RG16UI),Z===i.UNSIGNED_INT&&(it=i.RG32UI),Z===i.BYTE&&(it=i.RG8I),Z===i.SHORT&&(it=i.RG16I),Z===i.INT&&(it=i.RG32I)),A===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(it=i.RGB16UI),Z===i.UNSIGNED_INT&&(it=i.RGB32UI),Z===i.BYTE&&(it=i.RGB8I),Z===i.SHORT&&(it=i.RGB16I),Z===i.INT&&(it=i.RGB32I)),A===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(it=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(it=i.RGBA16UI),Z===i.UNSIGNED_INT&&(it=i.RGBA32UI),Z===i.BYTE&&(it=i.RGBA8I),Z===i.SHORT&&(it=i.RGBA16I),Z===i.INT&&(it=i.RGBA32I)),A===i.RGB&&(Z===i.UNSIGNED_SHORT&&xt&&(it=xt.RGB16_EXT),Z===i.SHORT&&xt&&(it=xt.RGB16_SNORM_EXT),Z===i.UNSIGNED_INT_5_9_9_9_REV&&(it=i.RGB9_E5),Z===i.UNSIGNED_INT_10F_11F_11F_REV&&(it=i.R11F_G11F_B10F)),A===i.RGBA){const ot=mt?qs:pe.getTransfer(st);Z===i.FLOAT&&(it=i.RGBA32F),Z===i.HALF_FLOAT&&(it=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(it=ot===Ae?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT&&xt&&(it=xt.RGBA16_EXT),Z===i.SHORT&&xt&&(it=xt.RGBA16_SNORM_EXT),Z===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function h(N,A){let Z;return N?A===null||A===In||A===Bi?Z=i.DEPTH24_STENCIL8:A===En?Z=i.DEPTH32F_STENCIL8:A===cs&&(Z=i.DEPTH24_STENCIL8,Jt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===In||A===Bi?Z=i.DEPTH_COMPONENT24:A===En?Z=i.DEPTH_COMPONENT32F:A===cs&&(Z=i.DEPTH_COMPONENT16),Z}function v(N,A){return T(N)===!0||N.isFramebufferTexture&&N.minFilter!==Je&&N.minFilter!==on?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function P(N){const A=new WeakRef(N);n.get(N).__ref=A,_.add(A),b.register(N,A,A)}function C(N){const A=n.get(N).__ref;A!==void 0&&(_.delete(A),b.unregister(A))}function w(N){B(N.target)}function D(N){I(N.target)}function B(N){N.removeEventListener("dispose",w),C(N),U(N),N.isVideoTexture&&d.delete(N),N.isHTMLTexture&&m.delete(N)}function I(N){N.removeEventListener("dispose",D),C(N),at(N)}function k(){for(const N of _){const A=N.deref();A!==void 0&&(A.isRenderTarget===!0?I(A):B(A))}_.clear(),m.clear()}function U(N){const A=n.get(N);if(A.__webglInit===void 0)return;const Z=N.source,dt=p.get(Z);if(dt){const st=dt[A.__cacheKey];st.usedTimes--,st.usedTimes===0&&V(N),Object.keys(dt).length===0&&p.delete(Z)}n.remove(N)}function V(N){const A=n.get(N);i.deleteTexture(A.__webglTexture);const Z=N.source,dt=p.get(Z);delete dt[A.__cacheKey],o.memory.textures--}function at(N){const A=n.get(N);A.__depthDisposeCallback&&A.__depthDisposeCallback();const Z=N.depthTexture;if(Z&&Z.renderTarget===N&&B(Z),N.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(A.__webglFramebuffer[st]))for(let mt=0;mt<A.__webglFramebuffer[st].length;mt++)i.deleteFramebuffer(A.__webglFramebuffer[st][mt]);else i.deleteFramebuffer(A.__webglFramebuffer[st]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[st])}else{if(Array.isArray(A.__webglFramebuffer))for(let st=0;st<A.__webglFramebuffer.length;st++)i.deleteFramebuffer(A.__webglFramebuffer[st]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let st=0;st<A.__webglColorRenderbuffer.length;st++)A.__webglColorRenderbuffer[st]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[st]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const dt=N.textures;for(let st=0,mt=dt.length;st<mt;st++){const xt=n.get(dt[st]);xt.__webglTexture&&(i.deleteTexture(xt.__webglTexture),o.memory.textures--),n.remove(dt[st])}n.remove(N)}let $=0;function j(){$=0}function ct(){return $}function St(N){$=N}function wt(){const N=$;return N>=s.maxTextures&&Jt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),$+=1,N}function nt(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.mipmapsAutoUpdate),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function pt(N,A){const Z=n.get(N);if(N.isVideoTexture&&Se(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Z.__version!==N.version){const dt=N.image;if(dt===null)Jt("WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)Jt("WebGLRenderer: Texture marked for update but image is incomplete");else{qt(Z,N,A);return}}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+A)}function Rt(N,A){const Z=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){qt(Z,N,A);return}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+A)}function Lt(N,A){const Z=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){qt(Z,N,A);return}e.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+A)}function ut(N,A){const Z=n.get(N);if(N.version>0&&Z.__version!==N.version){le(Z,N,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+A)}const Ot={[Gr]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[kr]:i.MIRRORED_REPEAT},ye={[Je]:i.NEAREST,[nh]:i.NEAREST_MIPMAP_NEAREST,[Ls]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[Cr]:i.LINEAR_MIPMAP_NEAREST,[ni]:i.LINEAR_MIPMAP_LINEAR},Wt={[oh]:i.NEVER,[$a]:i.ALWAYS,[ah]:i.LESS,[Ka]:i.LEQUAL,[lh]:i.EQUAL,[Ja]:i.GEQUAL,[ch]:i.GREATER,[hh]:i.NOTEQUAL};function fe(N,A){if(A.type===En&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===on||A.magFilter===Cr||A.magFilter===Ls||A.magFilter===ni||A.minFilter===on||A.minFilter===Cr||A.minFilter===Ls||A.minFilter===ni)&&Jt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Ot[A.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Ot[A.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Ot[A.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,ye[A.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,ye[A.minFilter]),A.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Wt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Je||A.minFilter!==Ls&&A.minFilter!==ni||A.type===En&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const Z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function _e(N,A){let Z=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",w),P(A));const dt=A.source;let st=p.get(dt);st===void 0&&(st={},p.set(dt,st));const mt=nt(A);if(mt!==N.__cacheKey){st[mt]===void 0&&(st[mt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),st[mt].usedTimes++;const xt=st[N.__cacheKey];xt!==void 0&&(st[N.__cacheKey].usedTimes--,xt.usedTimes===0&&V(A)),N.__cacheKey=mt,N.__webglTexture=st[mt].texture}return Z}function oe(N,A,Z){return Math.floor(Math.floor(N/Z)/A)}function At(N,A,Z,dt){const mt=N.updateRanges;if(mt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,A.width,A.height,Z,dt,A.data);else{mt.sort((z,rt)=>z.start-rt.start);let xt=0;for(let z=1;z<mt.length;z++){const rt=mt[xt],Y=mt[z],_t=rt.start+rt.count,lt=oe(Y.start,A.width,4),vt=oe(rt.start,A.width,4);Y.start<=_t+1&&lt===vt&&oe(Y.start+Y.count-1,A.width,4)===lt?rt.count=Math.max(rt.count,Y.start+Y.count-rt.start):(++xt,mt[xt]=Y)}mt.length=xt+1;const it=e.getParameter(i.UNPACK_ROW_LENGTH),ot=e.getParameter(i.UNPACK_SKIP_PIXELS),yt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,A.width);for(let z=0,rt=mt.length;z<rt;z++){const Y=mt[z],_t=Math.floor(Y.start/4),lt=Math.ceil(Y.count/4),vt=_t%A.width,Vt=Math.floor(_t/A.width),Qt=lt,gt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Vt),e.texSubImage2D(i.TEXTURE_2D,0,vt,Vt,Qt,gt,Z,dt,A.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,it),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function qt(N,A,Z){let dt=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(dt=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(dt=i.TEXTURE_3D);const st=_e(N,A),mt=A.source;e.bindTexture(dt,N.__webglTexture,i.TEXTURE0+Z);const xt=n.get(mt);if(mt.version!==xt.__version||st===!0){if(e.activeTexture(i.TEXTURE0+Z),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){const gt=pe.getPrimaries(pe.workingColorSpace),Dt=A.colorSpace===ei?null:pe.getPrimaries(A.colorSpace),Ut=A.colorSpace===ei||gt===Dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut)}e.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment);let ot=S(A.image,!1,s.maxTextureSize);ot=Bt(A,ot);const yt=r.convert(A.format,A.colorSpace),z=r.convert(A.type);let rt=x(A.internalFormat,yt,z,A.normalized,A.colorSpace,A.isVideoTexture);fe(dt,A);let Y;const _t=A.mipmaps,lt=A.isVideoTexture!==!0,vt=xt.__version===void 0||st===!0,Vt=mt.dataReady,Qt=v(A,ot);if(A.isDepthTexture)rt=h(A.format===ii,A.type),vt&&(lt?e.texStorage2D(i.TEXTURE_2D,1,rt,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,rt,ot.width,ot.height,0,yt,z,null));else if(A.isDataTexture)if(_t.length>0){lt&&vt&&e.texStorage2D(i.TEXTURE_2D,Qt,rt,_t[0].width,_t[0].height);for(let gt=0,Dt=_t.length;gt<Dt;gt++)Y=_t[gt],lt?Vt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,Y.width,Y.height,yt,z,Y.data):e.texImage2D(i.TEXTURE_2D,gt,rt,Y.width,Y.height,0,yt,z,Y.data);A.generateMipmaps=!1}else lt?(vt&&e.texStorage2D(i.TEXTURE_2D,Qt,rt,ot.width,ot.height),Vt&&At(A,ot,yt,z)):e.texImage2D(i.TEXTURE_2D,0,rt,ot.width,ot.height,0,yt,z,ot.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){lt&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Qt,rt,_t[0].width,_t[0].height,ot.depth);for(let gt=0,Dt=_t.length;gt<Dt;gt++)if(Y=_t[gt],A.format!==Ln)if(yt!==null)if(lt){if(Vt)if(A.layerUpdates.size>0){const Ut=rc(Y.width,Y.height,A.format,A.type);for(const ft of A.layerUpdates){const de=Y.data.subarray(ft*Ut/Y.data.BYTES_PER_ELEMENT,(ft+1)*Ut/Y.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,ft,Y.width,Y.height,1,yt,de)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,Y.width,Y.height,ot.depth,yt,Y.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,rt,Y.width,Y.height,ot.depth,0,Y.data,0,0);else Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?Vt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,Y.width,Y.height,ot.depth,yt,z,Y.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,rt,Y.width,Y.height,ot.depth,0,yt,z,Y.data);A.layerUpdates.size>0&&A.clearLayerUpdates()}else{lt&&vt&&e.texStorage2D(i.TEXTURE_2D,Qt,rt,_t[0].width,_t[0].height);for(let gt=0,Dt=_t.length;gt<Dt;gt++)Y=_t[gt],A.format!==Ln?yt!==null?lt?Vt&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,Y.width,Y.height,yt,Y.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,rt,Y.width,Y.height,0,Y.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?Vt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,Y.width,Y.height,yt,z,Y.data):e.texImage2D(i.TEXTURE_2D,gt,rt,Y.width,Y.height,0,yt,z,Y.data)}else if(A.isDataArrayTexture)if(lt){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Qt,rt,ot.width,ot.height,ot.depth),Vt)if(A.layerUpdates.size>0){const gt=rc(ot.width,ot.height,A.format,A.type);for(const Dt of A.layerUpdates){const Ut=ot.data.subarray(Dt*gt/ot.data.BYTES_PER_ELEMENT,(Dt+1)*gt/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Dt,ot.width,ot.height,1,yt,z,Ut)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,yt,z,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,rt,ot.width,ot.height,ot.depth,0,yt,z,ot.data);else if(A.isData3DTexture)lt?(vt&&e.texStorage3D(i.TEXTURE_3D,Qt,rt,ot.width,ot.height,ot.depth),Vt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,yt,z,ot.data)):e.texImage3D(i.TEXTURE_3D,0,rt,ot.width,ot.height,ot.depth,0,yt,z,ot.data);else if(A.isFramebufferTexture){if(vt)if(lt)e.texStorage2D(i.TEXTURE_2D,Qt,rt,ot.width,ot.height);else{let gt=ot.width,Dt=ot.height;for(let Ut=0;Ut<Qt;Ut++)e.texImage2D(i.TEXTURE_2D,Ut,rt,gt,Dt,0,yt,z,null),gt>>=1,Dt>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in i){const gt=i.canvas;if(gt.hasAttribute("layoutsubtree")||gt.setAttribute("layoutsubtree","true"),ot.parentNode!==gt){gt.appendChild(ot),m.add(A),gt.onpaint=Dt=>{const Ut=Dt.changedElements;for(const ft of m)Ut.includes(ft.image)&&(ft.needsUpdate=!0)},gt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ot);else{const Ut=i.RGBA,ft=i.RGBA,de=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ut,ft,de,ot)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(_t.length>0){if(lt&&vt){const gt=Kt(_t[0]);e.texStorage2D(i.TEXTURE_2D,Qt,rt,gt.width,gt.height)}for(let gt=0,Dt=_t.length;gt<Dt;gt++)Y=_t[gt],lt?Vt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,yt,z,Y):e.texImage2D(i.TEXTURE_2D,gt,rt,yt,z,Y);A.generateMipmaps=!1}else if(lt){if(vt){const gt=Kt(ot);e.texStorage2D(i.TEXTURE_2D,Qt,rt,gt.width,gt.height)}Vt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,z,ot)}else e.texImage2D(i.TEXTURE_2D,0,rt,yt,z,ot);T(A)&&A.mipmapsAutoUpdate===!0&&E(dt),xt.__version=mt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function le(N,A,Z){if(A.image.length!==6)return;const dt=_e(N,A),st=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+Z);const mt=n.get(st);if(st.version!==mt.__version||dt===!0){e.activeTexture(i.TEXTURE0+Z);const xt=pe.getPrimaries(pe.workingColorSpace),it=A.colorSpace===ei?null:pe.getPrimaries(A.colorSpace),ot=A.colorSpace===ei||xt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const yt=A.isCompressedTexture||A.image[0].isCompressedTexture,z=A.image[0]&&A.image[0].isDataTexture,rt=[];for(let ft=0;ft<6;ft++)!yt&&!z?rt[ft]=S(A.image[ft],!0,s.maxCubemapSize):rt[ft]=z?A.image[ft].image:A.image[ft],rt[ft]=Bt(A,rt[ft]);const Y=rt[0],_t=r.convert(A.format,A.colorSpace),lt=r.convert(A.type);let vt=x(A.internalFormat,_t,lt,A.normalized,A.colorSpace);const Vt=A.isVideoTexture!==!0,Qt=mt.__version===void 0||dt===!0,gt=st.dataReady;let Dt=v(A,Y);fe(i.TEXTURE_CUBE_MAP,A);let Ut;if(A.isDepthTexture){if(vt=h(A.format===ii,A.type),Qt)if(Vt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,vt,Y.width,Y.height);else for(let ft=0;ft<6;ft++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,vt,Y.width,Y.height,0,_t,lt,null)}else if(yt){Vt&&Qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,vt,Y.width,Y.height);for(let ft=0;ft<6;ft++){Ut=rt[ft].mipmaps;for(let de=0;de<Ut.length;de++){const Pe=Ut[de];A.format!==Ln?_t!==null?Vt?gt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de,0,0,Pe.width,Pe.height,_t,Pe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de,vt,Pe.width,Pe.height,0,Pe.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de,0,0,Pe.width,Pe.height,_t,lt,Pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de,vt,Pe.width,Pe.height,0,_t,lt,Pe.data)}}}else{if(Ut=A.mipmaps,Vt&&Qt){Ut.length>0&&Dt++;const ft=Kt(rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,vt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(z){Vt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,rt[ft].width,rt[ft].height,_t,lt,rt[ft].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,vt,rt[ft].width,rt[ft].height,0,_t,lt,rt[ft].data);for(let de=0;de<Ut.length;de++){const vn=Ut[de].image[ft].image;Vt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de+1,0,0,vn.width,vn.height,_t,lt,vn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de+1,vt,vn.width,vn.height,0,_t,lt,vn.data)}}else{Vt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,_t,lt,rt[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,vt,_t,lt,rt[ft]);for(let de=0;de<Ut.length;de++){const Pe=Ut[de];Vt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de+1,0,0,_t,lt,Pe.image[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,de+1,vt,_t,lt,Pe.image[ft])}}}T(A)&&A.mipmapsAutoUpdate===!0&&E(i.TEXTURE_CUBE_MAP),mt.__version=st.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Xt(N,A,Z,dt,st,mt){const xt=r.convert(Z.format,Z.colorSpace),it=r.convert(Z.type),ot=x(Z.internalFormat,xt,it,Z.normalized,Z.colorSpace),yt=n.get(A),z=n.get(Z);if(z.__renderTarget=A,!yt.__hasExternalTextures){const rt=Math.max(1,A.width>>mt),Y=Math.max(1,A.height>>mt);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,mt,ot,rt,Y,A.depth,0,xt,it,null):e.texImage2D(st,mt,ot,rt,Y,0,xt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),bt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,st,z.__webglTexture,0,Gt(A)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,dt,st,z.__webglTexture,mt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(N,A,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,N),A.depthBuffer){const dt=A.depthTexture,st=dt&&dt.isDepthTexture?dt.type:null,mt=h(A.stencilBuffer,st),xt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;bt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(A),mt,A.width,A.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(A),mt,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,mt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,N)}else{const dt=A.textures;for(let st=0;st<dt.length;st++){const mt=dt[st],xt=r.convert(mt.format,mt.colorSpace),it=r.convert(mt.type),ot=x(mt.internalFormat,xt,it,mt.normalized,mt.colorSpace);bt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt(A),ot,A.width,A.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt(A),ot,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,ot,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(N,A,Z){const dt=A.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const st=n.get(A.depthTexture);st.__renderTarget=A;const mt=dt?A.depthTexture.image[0]:A.depthTexture.image;(!st.__webglTexture||mt.width!==A.width||mt.height!==A.height)&&(mt.width=A.width,mt.height=A.height,A.depthTexture.needsUpdate=!0),dt?ut(A.depthTexture,0):pt(A.depthTexture,0);const xt=st.__webglTexture,it=Gt(A),ot=dt?i.TEXTURE_CUBE_MAP_POSITIVE_X+Z:i.TEXTURE_2D,yt=A.depthTexture.format===ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(A.depthTexture.format===oi)bt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,yt,ot,xt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,yt,ot,xt,0);else if(A.depthTexture.format===ii)bt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,yt,ot,xt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,yt,ot,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(N){const A=n.get(N),Z=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const dt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),dt){const st=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,dt.removeEventListener("dispose",st)};dt.addEventListener("dispose",st),A.__depthDisposeCallback=st}A.__boundDepthTexture=dt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer)if(Z)for(let dt=0;dt<6;dt++)xe(A.__webglFramebuffer[dt],N,dt);else N.texture.mipmaps.length>0?xe(A.__webglFramebuffer[0],N,0):xe(A.__webglFramebuffer,N,0);else if(Z){A.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[dt]),A.__webglDepthbuffer[dt]===void 0)A.__webglDepthbuffer[dt]=i.createRenderbuffer(),ge(A.__webglDepthbuffer[dt],N,!1);else{const st=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=A.__webglDepthbuffer[dt];i.bindRenderbuffer(i.RENDERBUFFER,mt),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,mt)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),ge(A.__webglDepthbuffer,N,!1);else{const st=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,mt),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,mt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(N,A,Z){const dt=n.get(N);A!==void 0&&Xt(dt.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&ne(N)}function Fe(N){const A=N.texture,Z=n.get(N),dt=n.get(A);N.addEventListener("dispose",D),P(N);const st=N.textures,mt=N.isWebGLCubeRenderTarget===!0,xt=st.length>1;if(xt||(dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture()),dt.__version=A.version,o.memory.textures++),mt){Z.__webglFramebuffer=[];for(let it=0;it<6;it++)if(A.mipmaps.length>0){Z.__webglFramebuffer[it]=[];for(let ot=0;ot<A.mipmaps.length;ot++)Z.__webglFramebuffer[it][ot]=i.createFramebuffer()}else Z.__webglFramebuffer[it]=i.createFramebuffer()}else{if(A.mipmaps.length>0){Z.__webglFramebuffer=[];for(let it=0;it<A.mipmaps.length;it++)Z.__webglFramebuffer[it]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(xt)for(let it=0,ot=st.length;it<ot;it++){const yt=n.get(st[it]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&bt(N)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let it=0;it<st.length;it++){const ot=st[it];Z.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[it]);const yt=r.convert(ot.format,ot.colorSpace),z=r.convert(ot.type),rt=x(ot.internalFormat,yt,z,ot.normalized,ot.colorSpace,N.isXRRenderTarget===!0),Y=Gt(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,rt,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,Z.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(Z.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(mt){e.bindTexture(i.TEXTURE_CUBE_MAP,dt.__webglTexture),fe(i.TEXTURE_CUBE_MAP,A);for(let it=0;it<6;it++)if(A.mipmaps.length>0)for(let ot=0;ot<A.mipmaps.length;ot++)Xt(Z.__webglFramebuffer[it][ot],N,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,ot);else Xt(Z.__webglFramebuffer[it],N,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);T(A)?E(i.TEXTURE_CUBE_MAP):A.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),e.unbindTexture()}else if(xt){for(let it=0,ot=st.length;it<ot;it++){const yt=st[it],z=n.get(yt);let rt=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(rt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,z.__webglTexture),fe(rt,yt),Xt(Z.__webglFramebuffer,N,yt,i.COLOR_ATTACHMENT0+it,rt,0),T(yt)&&E(rt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(it=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,dt.__webglTexture),fe(it,A),A.mipmaps.length>0)for(let ot=0;ot<A.mipmaps.length;ot++)Xt(Z.__webglFramebuffer[ot],N,A,i.COLOR_ATTACHMENT0,it,ot);else Xt(Z.__webglFramebuffer,N,A,i.COLOR_ATTACHMENT0,it,0);T(A)?E(it):A.mipmaps.length>0&&i.texParameteri(it,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&ne(N)}function H(N){const A=N.textures;for(let Z=0,dt=A.length;Z<dt;Z++){const st=A[Z];if(T(st)&&st.mipmapsAutoUpdate===!0){const mt=M(N),xt=n.get(st).__webglTexture;e.bindTexture(mt,xt),E(mt),e.unbindTexture()}}}const Ze=[];function ie(N){if(N.samples>0){if(bt(N)===!1){const A=N.textures,Z=N.width,dt=N.height;let st=i.COLOR_BUFFER_BIT;const mt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(N),it=A.length>1;if(it)for(let yt=0;yt<A.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let yt=0;yt<A.length;yt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[yt]);const z=n.get(A[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,z,0)}i.blitFramebuffer(0,0,Z,dt,0,0,Z,dt,st,i.NEAREST),c===!0&&(Ze.length=0,Ze.push(i.COLOR_ATTACHMENT0+yt),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&Ze.push(mt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ze))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let yt=0;yt<A.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,xt.__webglColorRenderbuffer[yt]);const z=n.get(A[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,z,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const A=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function Gt(N){return Math.min(s.maxSamples,N.samples)}function bt(N){const A=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Se(N){const A=o.render.frame;d.get(N)!==A&&(d.set(N,A),N.update())}function Bt(N,A){const Z=N.colorSpace,dt=N.format,st=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Z!==Ys&&Z!==ei&&(pe.getTransfer(Z)===Ae?(dt!==Ln||st!==fn)&&Jt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ve("WebGLTextures: Unsupported texture color space:",Z)),A}function Kt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=wt,this.resetTextureUnits=j,this.getTextureUnits=ct,this.setTextureUnits=St,this.setTexture2D=pt,this.setTexture2DArray=Rt,this.setTexture3D=Lt,this.setTextureCube=ut,this.rebindTextures=Ce,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=Xt,this.useMultisampledRTT=bt,this.dispose=k}function jh(i,t){function e(n,s=ei){let r;const o=pe.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Po)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xa)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ya)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Va)return i.BYTE;if(n===Wa)return i.SHORT;if(n===cs)return i.UNSIGNED_SHORT;if(n===Ro)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===qa)return i.ALPHA;if(n===Za)return i.RGB;if(n===Ln)return i.RGBA;if(n===oi)return i.DEPTH_COMPONENT;if(n===ii)return i.DEPTH_STENCIL;if(n===Lo)return i.RED;if(n===Do)return i.RED_INTEGER;if(n===xi)return i.RG;if(n===Io)return i.RG_INTEGER;if(n===No)return i.RGBA_INTEGER;if(n===Ns||n===Us||n===Fs||n===Os)if(o===Ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ns)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ns)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Os)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hr||n===Vr||n===Wr||n===Xr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Hr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yr||n===qr||n===Zr||n===Kr||n===Jr||n===Ws||n===$r)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Yr||n===qr)return o===Ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Zr)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Kr)return r.COMPRESSED_R11_EAC;if(n===Jr)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ws)return r.COMPRESSED_RG11_EAC;if(n===$r)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Qr||n===jr||n===to||n===eo||n===no||n===io||n===so||n===ro||n===oo||n===ao||n===lo||n===co||n===ho||n===uo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qr)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jr)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===to)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===no)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===io)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===so)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ao)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===co)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ho)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fo||n===po||n===mo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fo)return o===Ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===go||n===_o||n===Xs||n===xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const K0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J0=`
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

}`;class $0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new hl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vi({vertexShader:K0,fragmentShader:J0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Q0 extends li{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,m=null,u=null,p=null,_=null;const b=typeof XRWebGLBinding<"u",f=new $0,g={},S=e.getContextAttributes();let T=null,E=null;const M=[],x=[],h=new Nt;let v=null,P=null;const C=new yn;C.viewport=new Ie;const w=new yn;w.viewport=new Ie;const D=[C,w],B=new Gh;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let pt=M[nt];return pt===void 0&&(pt=new Lr,M[nt]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(nt){let pt=M[nt];return pt===void 0&&(pt=new Lr,M[nt]=pt),pt.getGripSpace()},this.getHand=function(nt){let pt=M[nt];return pt===void 0&&(pt=new Lr,M[nt]=pt),pt.getHandSpace()};function U(nt){const pt=x.indexOf(nt.inputSource);if(pt===-1)return;const Rt=M[pt];Rt!==void 0&&(Rt.update(nt.inputSource,nt.frame,l||o),Rt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function V(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",at);for(let nt=0;nt<M.length;nt++){const pt=x[nt];pt!==null&&(x[nt]=null,M[nt].disconnect(pt))}I=null,k=null,f.reset();for(const nt in g)delete g[nt];if(t.setRenderTarget(T),p=null,u=null,m=null,s=null,E=null,wt.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(h.width,h.height,!1),P!==null){const nt=P.camera;nt.fov=P.fov,nt.zoom=P.zoom,nt.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){r=nt,n.isPresenting===!0&&Jt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&Jt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(nt){l=nt},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return m===null&&b&&(m=new XRWebGLBinding(s,e)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",V),s.addEventListener("inputsourceschange",at),S.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(h),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let Rt=null,Lt=null,ut=null;S.depth&&(ut=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Rt=S.stencil?ii:oi,Lt=S.stencil?Bi:In);const Ot={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:r};m=this.getBinding(),u=m.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new Dn(u.textureWidth,u.textureHeight,{format:Ln,type:fn,depthTexture:new zi(u.textureWidth,u.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,Rt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Rt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Rt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Dn(p.framebufferWidth,p.framebufferHeight,{format:Ln,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),wt.setContext(s),wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function at(nt){for(let pt=0;pt<nt.removed.length;pt++){const Rt=nt.removed[pt],Lt=x.indexOf(Rt);Lt>=0&&(x[Lt]=null,M[Lt].disconnect(Rt))}for(let pt=0;pt<nt.added.length;pt++){const Rt=nt.added[pt];let Lt=x.indexOf(Rt);if(Lt===-1){for(let Ot=0;Ot<M.length;Ot++)if(Ot>=x.length){x.push(Rt),Lt=Ot;break}else if(x[Ot]===null){x[Ot]=Rt,Lt=Ot;break}if(Lt===-1)break}const ut=M[Lt];ut&&ut.connect(Rt)}}function $(nt,pt){pt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(pt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let pt=nt.near,Rt=nt.far;f.texture!==null&&(f.depthNear>0&&(pt=f.depthNear),f.depthFar>0&&(Rt=f.depthFar)),B.near=w.near=C.near=pt,B.far=w.far=C.far=Rt,(I!==B.near||k!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),I=B.near,k=B.far),B.layers.mask=nt.layers.mask|6,C.layers.mask=B.layers.mask&-5,w.layers.mask=B.layers.mask&-3;const Lt=nt.parent,ut=B.cameras;$(B,Lt);for(let Ot=0;Ot<ut.length;Ot++)$(ut[Ot],Lt);B.projectionMatrix.copy(C.projectionMatrix),B.projectionMatrixInverse.copy(C.projectionMatrixInverse),P===null&&nt.isPerspectiveCamera&&(P={camera:nt,fov:nt.fov,zoom:nt.zoom}),j(nt,B,Lt)};function j(nt,pt,Rt){Rt===null?nt.matrix.copy(pt.matrixWorld):(nt.matrix.copy(Rt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(pt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(pt.projectionMatrix),nt.projectionMatrixInverse.copy(pt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Zs*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(nt){c=nt,u!==null&&(u.fixedFoveation=nt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=nt)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(nt){return g[nt]};let ct=null;function St(nt,pt){if(d=pt.getViewerPose(l||o),_=pt,d!==null){const Rt=d.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let Lt=!1;Rt.length!==B.cameras.length&&(B.cameras.length=0,Lt=!0);for(let Wt=0;Wt<Rt.length;Wt++){const fe=Rt[Wt];let _e=null;if(p!==null)_e=p.getViewport(fe);else{const At=m.getViewSubImage(u,fe);_e=At.viewport,Wt===0&&(t.setRenderTargetTextures(E,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(E))}let oe=D[Wt];oe===void 0&&(oe=new yn,oe.layers.enable(Wt),oe.viewport=new Ie,D[Wt]=oe),oe.matrix.fromArray(fe.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(fe.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(_e.x,_e.y,_e.width,_e.height),Wt===0&&(B.matrix.copy(oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Lt===!0&&B.cameras.push(oe)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){m=n.getBinding();const Wt=m.getDepthInformation(Rt[0]);Wt&&Wt.isValid&&Wt.texture&&f.init(Wt,s.renderState)}if(ut&&ut.includes("camera-access")&&b){t.state.unbindTexture(),m=n.getBinding();for(let Wt=0;Wt<Rt.length;Wt++){const fe=Rt[Wt].camera;if(fe){let _e=g[fe];_e||(_e=new hl,g[fe]=_e);const oe=m.getCameraImage(fe);_e.sourceTexture=oe}}}}for(let Rt=0;Rt<M.length;Rt++){const Lt=x[Rt],ut=M[Rt];Lt!==null&&ut!==void 0&&ut.update(Lt,pt,l||o)}ct&&ct(nt,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),_=null}const wt=new Vh;wt.setAnimationLoop(St),this.setAnimationLoop=function(nt){ct=nt},this.dispose=function(){}}}const j0=new me,tu=new ee;tu.set(-1,0,0,0,1,0,0,0,1);function tg(i,t){function e(f,g){f.matrixAutoUpdate===!0&&f.updateMatrix(),g.value.copy(f.matrix)}function n(f,g){g.color.getRGB(f.fogColor.value,Ih(i)),g.isFog?(f.fogNear.value=g.near,f.fogFar.value=g.far):g.isFogExp2&&(f.fogDensity.value=g.density)}function s(f,g,S,T,E){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(f,g):g.isMeshLambertMaterial?(r(f,g),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(f,g),m(f,g)):g.isMeshPhongMaterial?(r(f,g),d(f,g),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(f,g),u(f,g),g.isMeshPhysicalMaterial&&p(f,g,E)):g.isMeshMatcapMaterial?(r(f,g),_(f,g)):g.isMeshDepthMaterial?r(f,g):g.isMeshDistanceMaterial?(r(f,g),b(f,g)):g.isMeshNormalMaterial?r(f,g):g.isLineBasicMaterial?(o(f,g),g.isLineDashedMaterial&&a(f,g)):g.isPointsMaterial?c(f,g,S,T):g.isSpriteMaterial?l(f,g):g.isShadowMaterial?(f.color.value.copy(g.color),f.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(f,g){f.opacity.value=g.opacity,g.color&&f.diffuse.value.copy(g.color),g.emissive&&f.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(f.map.value=g.map,e(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.bumpMap&&(f.bumpMap.value=g.bumpMap,e(g.bumpMap,f.bumpMapTransform),f.bumpScale.value=g.bumpScale,g.side===an&&(f.bumpScale.value*=-1)),g.normalMap&&(f.normalMap.value=g.normalMap,e(g.normalMap,f.normalMapTransform),f.normalScale.value.copy(g.normalScale),g.side===an&&f.normalScale.value.negate()),g.displacementMap&&(f.displacementMap.value=g.displacementMap,e(g.displacementMap,f.displacementMapTransform),f.displacementScale.value=g.displacementScale,f.displacementBias.value=g.displacementBias),g.emissiveMap&&(f.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,f.emissiveMapTransform)),g.specularMap&&(f.specularMap.value=g.specularMap,e(g.specularMap,f.specularMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest);const S=t.get(g),T=S.envMap,E=S.envMapRotation;T&&(f.envMap.value=T,f.envMapRotation.value.setFromMatrix4(j0.makeRotationFromEuler(E)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(tu),f.reflectivity.value=g.reflectivity,f.ior.value=g.ior,f.refractionRatio.value=g.refractionRatio),g.lightMap&&(f.lightMap.value=g.lightMap,f.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,f.lightMapTransform)),g.aoMap&&(f.aoMap.value=g.aoMap,f.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,f.aoMapTransform))}function o(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,g.map&&(f.map.value=g.map,e(g.map,f.mapTransform))}function a(f,g){f.dashSize.value=g.dashSize,f.totalSize.value=g.dashSize+g.gapSize,f.scale.value=g.scale}function c(f,g,S,T){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.size.value=g.size*S,f.scale.value=T*.5,g.map&&(f.map.value=g.map,e(g.map,f.uvTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function l(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.rotation.value=g.rotation,g.map&&(f.map.value=g.map,e(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function d(f,g){f.specular.value.copy(g.specular),f.shininess.value=Math.max(g.shininess,1e-4)}function m(f,g){g.gradientMap&&(f.gradientMap.value=g.gradientMap)}function u(f,g){f.metalness.value=g.metalness,g.metalnessMap&&(f.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,f.metalnessMapTransform)),f.roughness.value=g.roughness,g.roughnessMap&&(f.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,f.roughnessMapTransform)),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)}function p(f,g,S){f.ior.value=g.ior,g.diffuseRoughness>0&&(f.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),g.sheen>0&&(f.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),f.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(f.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,f.sheenColorMapTransform)),g.sheenRoughnessMap&&(f.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,f.sheenRoughnessMapTransform))),g.clearcoat>0&&(f.clearcoat.value=g.clearcoat,f.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(f.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,f.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(f.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===an&&f.clearcoatNormalScale.value.negate())),g.dispersion>0&&(f.dispersion.value=g.dispersion),g.retroreflectivity>0&&(f.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(f.iridescence.value=g.iridescence,f.iridescenceIOR.value=g.iridescenceIOR,f.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(f.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,f.iridescenceMapTransform)),g.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),g.transmission>0&&(f.transmission.value=g.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(f.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,f.transmissionMapTransform)),f.thickness.value=g.thickness,g.thicknessMap&&(f.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=g.attenuationDistance,f.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(f.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(f.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=g.specularIntensity,f.specularColor.value.copy(g.specularColor),g.specularColorMap&&(f.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,f.specularColorMapTransform)),g.specularIntensityMap&&(f.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,g){g.matcap&&(f.matcap.value=g.matcap)}function b(f,g){const S=t.get(g).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function eg(i,t,e,n){let s={},r={};function o(S,T){const E=T.program;n.uniformBlockBinding(S,E,s[S.id])}function a(S,T){let E=s[S.id];E===void 0&&(_(S),E=c(S),s[S.id]=E,S.addEventListener("dispose",f));const M=T.program;n.updateUBOMapping(S,M);const x=t.render.frame;r[S.id]!==x&&(l(S),r[S.id]=x)}function c(S){const T=i.createBuffer(),E=S.__size,M=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,E,M),i.bindBuffer(i.UNIFORM_BUFFER,null),T}function l(S){const T=s[S.id],E=S.uniforms,M=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,h=E.length;x<h;x++){const v=E[x];if(Array.isArray(v))for(let P=0,C=v.length;P<C;P++)d(v[P],x,P,M);else d(v,x,0,M)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,T,E,M){if(u(S,T,E,M)===!0){const x=S.__offset,h=S.value;if(Array.isArray(h)){let v=0;for(let P=0;P<h.length;P++){const C=h[P],w=b(C,!0);m(C,S.__data,v),v+=w.storage/Float32Array.BYTES_PER_ELEMENT}}else m(h,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function m(S,T,E){typeof S=="number"||typeof S=="boolean"?T[E]=S:S.isMatrix3?(T[E]=S.elements[0],T[E+1]=S.elements[1],T[E+2]=S.elements[2],T[E+3]=0,T[E+4]=S.elements[3],T[E+5]=S.elements[4],T[E+6]=S.elements[5],T[E+7]=0,T[E+8]=S.elements[6],T[E+9]=S.elements[7],T[E+10]=S.elements[8],T[E+11]=0):ArrayBuffer.isView(S)?T.set(S.subarray(0,T.length-E),E):S.toArray(T,E)}function u(S,T,E,M){const x=S.value,h=T+"_"+E;if(Array.isArray(x)){M[h]===void 0&&(M[h]=[]);const v=M[h];let P=!1;for(let C=0;C<x.length;C++)p(x[C],v,C)===!0&&(P=!0);return P}return p(x,M,h)}function p(S,T,E){if(T[E]===void 0)return typeof S=="number"||typeof S=="boolean"?T[E]=S:ArrayBuffer.isView(S)?T[E]=S.slice():T[E]=S.clone(),!0;{const M=T[E];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return T[E]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1}function _(S){const T=S.uniforms;let E=0;const M=16;for(let h=0,v=T.length;h<v;h++){const P=Array.isArray(T[h])?T[h]:[T[h]];for(let C=0,w=P.length;C<w;C++){const D=P[C],B=Array.isArray(D.value)?D.value:[D.value],I=Array.isArray(T[h])||Array.isArray(D.value);let k=E;for(let V=0,at=B.length;V<at;V++){const $=B[V],j=b($,I),ct=E%M,St=ct%j.boundary,wt=ct+St;E+=St,wt!==0&&M-wt<j.storage&&(E+=M-wt),V===0&&(k=E),E+=j.storage}const U=D.type==="int"?Int32Array:D.type==="uint"?Uint32Array:Float32Array;D.__data=new U((E-k)/Float32Array.BYTES_PER_ELEMENT),D.__offset=k}}const x=E%M;return x>0&&(E+=M-x),S.__size=E,S.__cache={},this}function b(S,T){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=16,E.storage=48):S.isMatrix4?(E.boundary=16,E.storage=64):S.isTexture?Jt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Jt("WebGLRenderer: Unsupported uniform value type.",S),T===!0&&(E.boundary=16,E.storage=Math.ceil(E.storage/16)*16),E}function f(S){const T=S.target;T.removeEventListener("dispose",f),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function g(){for(const S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:a,dispose:g}}const ng=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bn=null;function ig(){return Bn===null&&(Bn=new sl(ng,16,16,xi,Nn),Bn.name="DFG_LUT",Bn.minFilter=on,Bn.magFilter=on,Bn.wrapS=Xn,Bn.wrapT=Xn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}class eu{constructor(t={}){const{canvas:e=fh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:p=fn}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=o;const b=p,f=new Set([No,Io,Do]),g=new Set([fn,In,cs,Bi,Co,Po]),S=new Uint32Array(4),T=new Int32Array(4),E={textures:[],min:[],max:[],resolution:[]};let M=null,x=null;const h=[],v=[];let P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let w=!1,D=null,B=null,I=null,k=null;this._outputColorSpace=rn;let U=0,V=0,at=null,$=-1,j=null;const ct=new Ie,St=new Ie;let wt=null;const nt=new se(0);let pt=0,Rt=e.width,Lt=e.height,ut=1,Ot=null,ye=null;const Wt=new Ie(0,0,Rt,Lt),fe=new Ie(0,0,Rt,Lt);let _e=!1;const oe=new us,At=new Bo;let qt=!1,le=!1;const Xt=new me,ge=new O,xe=new Ie,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ce=!1;function Fe(){return at===null?ut:1}let H=n;function Ze(R,G){return e.getContext(R,G)}let ie,Gt,bt,Se,Bt,Kt,N,A,Z,dt,st,mt,xt,it,ot,yt,z,rt,Y,_t,lt,vt,Vt;try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ao}`),e.addEventListener("webglcontextlost",Dt,!1),e.addEventListener("webglcontextrestored",Ut,!1),e.addEventListener("webglcontextcreationerror",ft,!1),H===null){const G="webgl2";if(H=Ze(G,R),H===null)throw Ze(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qt()}catch(R){throw e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Ut,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),ve("WebGLRenderer: "+R.message),R}function Qt(){ie=new lm(H),ie.init(),lt=new jh(H,ie),Gt=new $p(H,ie,t,lt),bt=new q0(H,ie),Gt.reversedDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),B=H.createFramebuffer(),I=H.createFramebuffer(),k=H.createFramebuffer(),Se=new um(H),Bt=new I0,Kt=new Z0(H,ie,bt,Bt,Gt,lt,Se),N=new am(C),A=new df(H),vt=new Kp(H,A),Z=new cm(H,A,Se,vt),dt=new dm(H,Z,A,vt,Se),rt=new fm(H,Gt,Kt),ot=new Qp(Bt),st=new D0(C,N,ie,Gt,vt,ot),mt=new tg(C,Bt),xt=new U0,it=new k0(ie),z=new Zp(C,N,bt,dt,_,c),yt=new Y0(C,dt,Gt),Vt=new eg(H,Se,Gt,bt),Y=new Jp(H,ie,Se),_t=new hm(H,ie,Se),Se.programs=st.programs,C.capabilities=Gt,C.extensions=ie,C.properties=Bt,C.renderLists=xt,C.shadowMap=yt,C.state=bt,C.info=Se}b!==fn&&(P=new mm(b,e.width,e.height,a,s,r));const gt=new Q0(C,H);this.xr=gt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const R=ie.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ie.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ut},this.setPixelRatio=function(R){R!==void 0&&(ut=R,this.setSize(Rt,Lt,!1))},this.getSize=function(R){return R.set(Rt,Lt)},this.setSize=function(R,G,Q=!0){if(gt.isPresenting){Jt("WebGLRenderer: Can't change size while VR device is presenting.");return}Rt=R,Lt=G,e.width=Math.floor(R*ut),e.height=Math.floor(G*ut),Q===!0&&(e.style.width=R+"px",e.style.height=G+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(Rt*ut,Lt*ut).floor()},this.setDrawingBufferSize=function(R,G,Q){Rt=R,Lt=G,ut=Q,e.width=Math.floor(R*Q),e.height=Math.floor(G*Q),this.setViewport(0,0,R,G)},this.setEffects=function(R){if(b===fn){ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let G=0;G<R.length;G++)if(R[G].isOutputPass===!0){Jt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(ct)},this.getViewport=function(R){return R.copy(Wt)},this.setViewport=function(R,G,Q,K){R.isVector4?Wt.set(R.x,R.y,R.z,R.w):Wt.set(R,G,Q,K),bt.viewport(ct.copy(Wt).multiplyScalar(Fe()).round())},this.getScissor=function(R){return R.copy(fe)},this.setScissor=function(R,G,Q,K){R.isVector4?fe.set(R.x,R.y,R.z,R.w):fe.set(R,G,Q,K),bt.scissor(St.copy(fe).multiplyScalar(Fe()).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(R){bt.setScissorTest(_e=R)},this.setOpaqueSort=function(R){Ot=R},this.setTransparentSort=function(R){ye=R},this.getClearColor=function(R){return R.copy(z.getClearColor())},this.setClearColor=function(){z.setClearColor(...arguments)},this.getClearAlpha=function(){return z.getClearAlpha()},this.setClearAlpha=function(){z.setClearAlpha(...arguments)},this.clear=function(R=!0,G=!0,Q=!0){let K=0;if(R){let J=!1;if(at!==null){const Tt=at.texture.format;J=f.has(Tt)}if(J){const Tt=at.texture.type,Ft=g.has(Tt),Et=z.getClearColor(),Ct=z.getClearAlpha(),Ht=Et.r,jt=Et.g,ue=Et.b;Ft?(S[0]=Ht,S[1]=jt,S[2]=ue,S[3]=Ct,H.clearBufferuiv(H.COLOR,0,S)):(T[0]=Ht,T[1]=jt,T[2]=ue,T[3]=Ct,H.clearBufferiv(H.COLOR,0,T))}else K|=H.COLOR_BUFFER_BIT}G&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),D=R},this.dispose=function(){e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Ut,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),z.dispose(),xt.dispose(),it.dispose(),Kt.dispose(),Bt.dispose(),N.dispose(),dt.dispose(),Z.dispose(),vt.dispose(),Vt.dispose(),st.dispose(),gt.dispose(),gt.removeEventListener("sessionstart",_s),gt.removeEventListener("sessionend",Fn),Qe.stop()};function Dt(R){R.preventDefault(),Ta("WebGLRenderer: Context Lost."),w=!0}function Ut(){Ta("WebGLRenderer: Context Restored."),w=!1;const R=Se.autoReset,G=yt.enabled,Q=yt.autoUpdate,K=yt.needsUpdate,J=yt.type;Qt(),Se.autoReset=R,yt.enabled=G,yt.autoUpdate=Q,yt.needsUpdate=K,yt.type=J}function ft(R){ve("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function de(R){const G=R.target;G.removeEventListener("dispose",de),Pe(G)}function Pe(R){vn(R),Bt.remove(R)}function vn(R){const G=Bt.get(R).programs;G!==void 0&&(G.forEach(function(Q){st.releaseProgram(Q)}),R.isShaderMaterial&&st.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,Q,K,J,Tt){G===null&&(G=ne);const Ft=J.isMesh&&J.matrixWorld.determinantAffine()<0,Et=Ms(R,G,Q,K,J);bt.setMaterial(K,Ft);let Ct=Q.index,Ht=1;if(K.wireframe===!0){if(Ct=Z.getWireframeAttribute(Q),Ct===void 0)return;Ht=2}const jt=Q.drawRange,ue=Q.attributes.position;let zt=jt.start*Ht,y=(jt.start+jt.count)*Ht;Tt!==null&&(zt=Math.max(zt,Tt.start*Ht),y=Math.min(y,(Tt.start+Tt.count)*Ht)),Ct!==null?(zt=Math.max(zt,0),y=Math.min(y,Ct.count)):ue!=null&&(zt=Math.max(zt,0),y=Math.min(y,ue.count));const L=y-zt;if(L<0||L===1/0)return;vt.setup(J,K,Et,Q,Ct);let F,X=Y;if(Ct!==null&&(F=A.get(Ct),X=_t,X.setIndex(F)),J.isMesh)K.wireframe===!0?(bt.setLineWidth(K.wireframeLinewidth*Fe()),X.setMode(H.LINES)):X.setMode(H.TRIANGLES);else if(J.isLine){let W=K.linewidth;W===void 0&&(W=1),bt.setLineWidth(W*Fe()),J.isLineSegments?X.setMode(H.LINES):J.isLineLoop?X.setMode(H.LINE_LOOP):X.setMode(H.LINE_STRIP)}else J.isPoints?X.setMode(H.POINTS):J.isSprite&&X.setMode(H.TRIANGLES);if(J.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))X.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const W=J._multiDrawStarts,tt=J._multiDrawCounts,q=J._multiDrawCount,Mt=Ct?A.get(Ct).bytesPerElement:1,te=Bt.get(K).currentProgram.getUniforms();for(let re=0;re<q;re++)te.setValue(H,"_gl_DrawID",re),X.render(W[re]/Mt,tt[re])}else if(J.isInstancedMesh)X.renderInstances(zt,L,J.count);else if(Q.isInstancedBufferGeometry){const W=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,tt=Math.min(Q.instanceCount,W);X.renderInstances(zt,L,tt)}else X.render(zt,L)};function bi(R,G,Q,K){D!==null&&R.isNodeMaterial&&D.setObject(K,R),qt===!0&&ot.setState(R,Q,!1),R.transparent===!0&&R.side===en&&R.forceSinglePass===!1?(R.side=an,R.needsUpdate=!0,cn(R,G,K),R.side=_i,R.needsUpdate=!0,cn(R,G,K),R.side=en):cn(R,G,K)}this.compile=function(R,G,Q=null){Q===null&&(Q=R),D!==null&&D.renderStart(R,G,Q),x=it.get(Q),x.init(G),v.push(x),Q.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(x.pushLight(J),J.castShadow&&x.pushShadow(J))}),R!==Q&&R.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(x.pushLight(J),J.castShadow&&x.pushShadow(J))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),le=this.localClippingEnabled,qt=ot.init(this.clippingPlanes,le),qt===!0&&ot.setGlobalState(this.clippingPlanes,G),D!==null&&yt.render(x.state.shadowsArray,Q,G);const K=new Set;return R.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Tt=J.material;if(Tt)if(Array.isArray(Tt))for(let Ft=0;Ft<Tt.length;Ft++){const Et=Tt[Ft];bi(Et,Q,G,J),K.add(Et)}else bi(Tt,Q,G,J),K.add(Tt)}),x=v.pop(),D!==null&&D.renderEnd(),K},this.compileAsync=function(R,G,Q=null){const K=this.compile(R,G,Q);return new Promise(J=>{function Tt(){if(K.forEach(function(Ft){const Ct=Bt.get(Ft).currentProgram;(Ct===void 0||Ct.isReady())&&K.delete(Ft)}),K.size===0){J(R);return}setTimeout(Tt,10)}ie.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let ci=null;function Qs(R){ci&&ci(R)}function _s(){Qe.stop()}function Fn(){Qe.start()}const Qe=new Vh;Qe.setAnimationLoop(Qs),typeof self<"u"&&Qe.setContext(self),this.setAnimationLoop=function(R){ci=R,gt.setAnimationLoop(R),R===null?Qe.stop():Qe.start()},gt.addEventListener("sessionstart",_s),gt.addEventListener("sessionend",Fn),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;D!==null&&D.renderStart(R,G);const Q=gt.enabled===!0&&gt.isPresenting===!0,K=P!==null&&(at===null||Q)&&P.begin(C,at);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),gt.enabled===!0&&gt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(gt.cameraAutoUpdate===!0&&gt.updateCamera(G),G=gt.getCamera()),R.isScene===!0&&R.onBeforeRender(C,R,G,at),x=it.get(R,v.length),x.init(G),x.state.textureUnits=Kt.getTextureUnits(),v.push(x),Xt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?At.setFromArrayCamera(G):oe.setFromProjectionMatrix(Xt,Tn,G.reversedDepth),le=this.localClippingEnabled,qt=ot.init(this.clippingPlanes,le),M=xt.get(R,h.length),M.init(),h.push(M),this.info.render.frame++,gt.enabled===!0&&gt.isPresenting===!0){const Ft=C.xr.getDepthSensingMesh();Ft!==null&&Gi(Ft,G,-1/0,C.sortObjects)}Gi(R,G,0,C.sortObjects),M.finish(),D!==null&&D.updateLights(x.state.lightsArray),C.sortObjects===!0&&M.sort(Ot,ye),Ce=gt.enabled===!1||gt.isPresenting===!1||gt.hasDepthSensing()===!1,Ce&&z.addToRenderList(M,R),this.info.autoReset===!0&&this.info.reset(),qt===!0&&ot.beginShadows();const J=x.state.shadowsArray;if(yt.render(J,R,G),qt===!0&&ot.endShadows(),(K&&P.hasRenderPass())===!1){const Ft=M.opaque,Et=M.transmissive;if(x.setupLights(),G.isArrayCamera){const Ct=G.cameras;if(Et.length>0)for(let Ht=0,jt=Ct.length;Ht<jt;Ht++){const ue=Ct[Ht];De(Ft,Et,R,ue)}Ce&&z.render(R);for(let Ht=0,jt=Ct.length;Ht<jt;Ht++){const ue=Ct[Ht];xs(M,R,ue,ue.viewport)}}else Et.length>0&&De(Ft,Et,R,G),Ce&&z.render(R),xs(M,R,G)}at!==null&&V===0&&(Kt.updateMultisampleRenderTarget(at),Kt.updateRenderTargetMipmap(at)),K&&P.end(C),R.isScene===!0&&R.onAfterRender(C,R,G),vt.resetDefaultState(),$=-1,j=null,v.pop(),v.length>0?(x=v[v.length-1],Kt.setTextureUnits(x.state.textureUnits),qt===!0&&ot.setGlobalState(C.clippingPlanes,x.state.camera)):x=null,h.pop(),h.length>0?M=h[h.length-1]:M=null,D!==null&&D.renderEnd()};function Gi(R,G,Q,K){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)x.pushLight(R),R.castShadow&&x.pushShadow(R);else if(R.isSprite){const Ft=G.isArrayCamera?At:oe;if(!R.frustumCulled||R.intersectsFrustum(Ft)){K&&xe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Xt);const Et=dt.update(R),Ct=R.material;Ct.visible&&M.push(R,Et,Ct,Q,xe.z,null,G)}}else if(R.isMesh||R.isLine||R.isPoints){const Ft=G.isArrayCamera?At:oe;if(!R.frustumCulled||R.intersectsFrustum(Ft)){const Et=dt.update(R),Ct=R.material;if(K&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),xe.copy(R.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),xe.copy(Et.boundingSphere.center)),xe.applyMatrix4(R.matrixWorld).applyMatrix4(Xt)),Array.isArray(Ct)){const Ht=Et.groups;for(let jt=0,ue=Ht.length;jt<ue;jt++){const zt=Ht[jt],y=Ct[zt.materialIndex];y&&y.visible&&M.push(R,Et,y,Q,xe.z,zt,G)}}else Ct.visible&&M.push(R,Et,Ct,Q,xe.z,null,G)}}}const Tt=R.children;for(let Ft=0,Et=Tt.length;Ft<Et;Ft++)Gi(Tt[Ft],G,Q,K)}function xs(R,G,Q,K){const{opaque:J,transmissive:Tt,transparent:Ft}=R;x.setupLightsView(Q),qt===!0&&ot.setGlobalState(C.clippingPlanes,Q),K&&bt.viewport(ct.copy(K)),J.length>0&&Be(J,G,Q),Tt.length>0&&Be(Tt,G,Q),Ft.length>0&&Be(Ft,G,Q),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function De(R,G,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[K.id]===void 0){const zt=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[K.id]=new Dn(1,1,{generateMipmaps:!0,type:zt?Nn:fn,minFilter:ni,samples:Math.max(4,Gt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pe.workingColorSpace})}const Tt=x.state.transmissionRenderTarget[K.id],Ft=K.viewport||ct;Tt.setSize(Ft.z*C.transmissionResolutionScale,Ft.w*C.transmissionResolutionScale);const Et=C.getRenderTarget(),Ct=C.getActiveCubeFace(),Ht=C.getActiveMipmapLevel();C.setRenderTarget(Tt),C.getClearColor(nt),pt=C.getClearAlpha(),pt<1&&C.setClearColor(16777215,.5),C.clear(),Ce&&z.render(Q);const jt=C.toneMapping;C.toneMapping=Yn;const ue=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),x.setupLightsView(K),qt===!0&&ot.setGlobalState(C.clippingPlanes,K),Be(R,Q,K),Kt.updateMultisampleRenderTarget(Tt),Kt.updateRenderTargetMipmap(Tt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let y=0,L=G.length;y<L;y++){const F=G[y],{object:X,geometry:W,material:tt,group:q}=F;if(tt.side===en&&X.layers.test(K.layers)){const Mt=tt.side;tt.side=an,tt.needsUpdate=!0,He(X,Q,K,W,tt,q),tt.side=Mt,tt.needsUpdate=!0,zt=!0}}zt===!0&&(Kt.updateMultisampleRenderTarget(Tt),Kt.updateRenderTargetMipmap(Tt))}C.setRenderTarget(Et,Ct,Ht),C.setClearColor(nt,pt),ue!==void 0&&(K.viewport=ue),C.toneMapping=jt}function Be(R,G,Q){const K=G.isScene===!0?G.overrideMaterial:null;for(let J=0,Tt=R.length;J<Tt;J++){const Ft=R[J],{object:Et,geometry:Ct,group:Ht}=Ft;let jt=Ft.material;jt.allowOverride===!0&&K!==null&&(jt=K),Et.layers.test(Q.layers)&&He(Et,G,Q,Ct,jt,Ht)}}function He(R,G,Q,K,J,Tt){D!==null&&J.isNodeMaterial&&D.setObject(R,J),R.onBeforeRender(C,G,Q,K,J,Tt),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),J.onBeforeRender(C,G,Q,K,R,Tt),J.transparent===!0&&J.side===en&&J.forceSinglePass===!1?(J.side=an,J.needsUpdate=!0,C.renderBufferDirect(Q,G,K,J,R,Tt),J.side=_i,J.needsUpdate=!0,C.renderBufferDirect(Q,G,K,J,R,Tt),J.side=en):C.renderBufferDirect(Q,G,K,J,R,Tt),R.onAfterRender(C,G,Q,K,J,Tt)}function pn(R){let G=0;for(const Q of R)Q.texture!==null&&G++;return G}function cn(R,G,Q){G.isScene!==!0&&(G=ne);const K=Bt.get(R),J=x.state.lights,Tt=x.state.shadowsArray,Ft=J.state.version,Et=st.getParameters(R,J.state,Tt,G,Q,x.state.lightProbeGridArray),Ct=st.getProgramCacheKey(Et);let Ht=K.programs;K.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;const jt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;K.envMap=N.get(R.envMap||K.environment,jt),K.envMapRotation=K.environment!==null&&R.envMap===null?G.environmentRotation:R.envMapRotation,Ht===void 0&&(R.addEventListener("dispose",de),Ht=new Map,K.programs=Ht,K.programVariants=new Map);let ue=Ht.get(Ct);if(ue!==void 0){if(K.currentProgram===ue&&K.lightsStateVersion===Ft)return be(R,Et),ue}else Et.uniforms=st.getUniforms(R),D!==null&&R.isNodeMaterial&&D.build(R,Q,Et),R.onBeforeCompile(Et,C),ue=st.acquireProgram(Et,Ct),Ht.set(Ct,ue),K.uniforms=Et.uniforms;const zt=K.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(zt.clippingPlanes=ot.uniform),be(R,Et),K.needsLights=Ei(R),K.lightsStateVersion=Ft,K.needsLights&&(zt.ambientLightColor.value=J.state.ambient,zt.lightProbe.value=J.state.probe,zt.sunLights.value=J.state.sun,zt.sunLightShadows.value=J.state.sunShadow,zt.directionalLights.value=J.state.directional,zt.directionalLightShadows.value=J.state.directionalShadow,zt.spotLights.value=J.state.spot,zt.spotLightShadows.value=J.state.spotShadow,zt.rectAreaLights.value=J.state.rectArea,zt.ltc_1.value=J.state.rectAreaLTC1,zt.ltc_2.value=J.state.rectAreaLTC2,zt.pointLights.value=J.state.point,zt.pointLightShadows.value=J.state.pointShadow,zt.hemisphereLights.value=J.state.hemi,zt.sunShadowMatrix.value=J.state.sunShadowMatrix,zt.sunShadowCascade.value=J.state.sunShadowCascade,zt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,zt.spotLightMatrix.value=J.state.spotLightMatrix,zt.spotLightMap.value=J.state.spotLightMap,zt.pointShadowMatrix.value=J.state.pointShadowMatrix),K.numLightProbeGrids=pn(x.state.lightProbeGridArray),K.currentProgram=ue,K.uniformsList=null,ue}function Xo(R,G,Q,K,J){const Tt=Bt.get(R),Ft=Tt.currentProgram.id+","+K+","+J;let Et=Tt.programVariants.get(Ft);return Et===void 0?(Et=cn(R,G,Q),Tt.programVariants.set(Ft,Et)):(Tt.currentProgram=Et,Tt.uniformsList=null,Tt.outputColorSpace=K,Tt.toneMapping=J),Et}function vs(R){if(R.uniformsList===null){const G=R.currentProgram.getUniforms();R.uniformsList=Dr.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function be(R,G){const Q=Bt.get(R);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function Ms(R,G,Q,K,J){G.isScene!==!0&&(G=ne),Kt.resetTextureUnits();const Tt=G.fog,Ft=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,Et=at===null?C.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:pe.workingColorSpace,Ct=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ht=N.get(K.envMap||Ft,Ct),jt=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ue=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),zt=!!Q.morphAttributes.position,y=!!Q.morphAttributes.normal,L=!!Q.morphAttributes.color;let F=Yn;K.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(F=C.toneMapping);const X=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,W=X!==void 0?X.length:0,tt=Bt.get(K),q=x.state.lights;if(qt===!0&&(le===!0||R!==j)){const Yt=R===j&&K.id===$;ot.setState(K,R,Yt)}let Mt=!1,te=!1;K.version===tt.__version?tt.needsLights&&tt.lightsStateVersion!==q.state.version||J.isBatchedMesh&&tt.batching===!1||!J.isBatchedMesh&&tt.batching===!0||J.isBatchedMesh&&tt.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&tt.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&tt.instancing===!1||!J.isInstancedMesh&&tt.instancing===!0||J.isSkinnedMesh&&tt.skinning===!1||!J.isSkinnedMesh&&tt.skinning===!0||J.isInstancedMesh&&tt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&tt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&tt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&tt.instancingMorph===!1&&J.morphTexture!==null||tt.envMap!==Ht||K.fog===!0&&tt.fog!==Tt||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==ot.numPlanes||tt.numIntersection!==ot.numIntersection)||tt.vertexAlphas!==jt||tt.vertexTangents!==ue||tt.morphTargets!==zt||tt.morphNormals!==y||tt.morphColors!==L||tt.morphTargetsCount!==W||tt.numLightProbeGrids!==pn(x.state.lightProbeGridArray)?Mt=!0:(tt.outputColorSpace!==Et||tt.toneMapping!==F)&&(te=!0):(Mt=!0,tt.__version=K.version);let re=tt.currentProgram;(Mt===!0||te===!0)&&(re=te===!0?Xo(K,G,J,Et,F):cn(K,G,J),D&&K.isNodeMaterial&&D.onUpdateProgram(K,re,tt));let It=!1,ht=!1,et=!1;const kt=re.getUniforms(),Te=tt.uniforms;if(bt.useProgram(re.program)&&(It=!0,ht=!0,et=!0),K.id!==$&&($=K.id,ht=!0),It||j!==R){bt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),kt.setValue(H,"projectionMatrix",R.projectionMatrix),kt.setValue(H,"viewMatrix",R.matrixWorldInverse);const Re=kt.map.cameraPosition;Re!==void 0&&Re.setValue(H,ge.setFromMatrixPosition(R.matrixWorld)),Gt.logarithmicDepthBuffer&&kt.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&kt.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),j!==R&&(j=R,ht=!0,et=!0)}if(tt.needsLights&&(q.state.sunShadowMap.length>0&&kt.setValue(H,"sunShadowMap",q.state.sunShadowMap,Kt),q.state.directionalShadowMap.length>0&&kt.setValue(H,"directionalShadowMap",q.state.directionalShadowMap,Kt),q.state.spotShadowMap.length>0&&kt.setValue(H,"spotShadowMap",q.state.spotShadowMap,Kt),q.state.pointShadowMap.length>0&&kt.setValue(H,"pointShadowMap",q.state.pointShadowMap,Kt)),J.isSkinnedMesh){kt.setOptional(H,J,"bindMatrix"),kt.setOptional(H,J,"bindMatrixInverse");const Yt=J.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),kt.setValue(H,"boneTexture",Yt.boneTexture,Kt))}J.isBatchedMesh&&(kt.setOptional(H,J,"batchingTexture"),kt.setValue(H,"batchingTexture",J._matricesTexture,Kt),kt.setOptional(H,J,"batchingIdTexture"),kt.setValue(H,"batchingIdTexture",J._indirectTexture,Kt),kt.setOptional(H,J,"batchingColorTexture"),J._colorsTexture!==null&&kt.setValue(H,"batchingColorTexture",J._colorsTexture,Kt));const $t=Q.morphAttributes;if(($t.position!==void 0||$t.normal!==void 0||$t.color!==void 0)&&rt.update(J,Q,re),(ht||tt.receiveShadow!==J.receiveShadow)&&(tt.receiveShadow=J.receiveShadow,kt.setValue(H,"receiveShadow",J.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(Te.envMapIntensity.value=G.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=ig()),ht){if(kt.setValue(H,"toneMappingExposure",C.toneMappingExposure),tt.needsLights&&Yo(Te,et),Tt&&K.fog===!0&&mt.refreshFogUniforms(Te,Tt),mt.refreshMaterialUniforms(Te,K,ut,Lt,x.state.transmissionRenderTarget[R.id]),tt.needsLights&&tt.numLightProbeGrids>0){const Yt=E;let Re=0;for(const Ne of x.state.lightProbeGridArray)Ne.texture!==null&&(Yt.textures[Re]=Ne.texture,Yt.min[Re]=Ne.boundingBox.min,Yt.max[Re]=Ne.boundingBox.max,Yt.resolution[Re]=Ne.resolution,Re++);for(const Ne in Yt)Yt[Ne].length=Re;Te.probesSH.value=Yt.textures,Te.probesMin.value=Yt.min,Te.probesMax.value=Yt.max,Te.probesResolution.value=Yt.resolution}Dr.upload(H,vs(tt),Te,Kt)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Dr.upload(H,vs(tt),Te,Kt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&kt.setValue(H,"center",J.center),kt.setValue(H,"modelViewMatrix",J.modelViewMatrix),kt.setValue(H,"normalMatrix",J.normalMatrix),kt.setValue(H,"modelMatrix",J.matrixWorld),K.uniformsGroups!==void 0){const Yt=K.uniformsGroups;for(let Re=0,Ne=Yt.length;Re<Ne;Re++){const ze=Yt[Re];Vt.update(ze,re),Vt.bind(ze,re)}}return re}function Yo(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.sunLights.needsUpdate=G,R.sunLightShadows.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function Ei(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(R,G,Q){const K=Bt.get(R);K.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Bt.get(R.texture).__webglTexture=G,Bt.get(R.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,G){const Q=Bt.get(R);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(R,G=0,Q=0){at=R,U=G,V=Q;let K=null,J=!1,Tt=!1;if(R){const Et=Bt.get(R);if(Et.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(H.FRAMEBUFFER,Et.__webglFramebuffer),ct.copy(R.viewport),St.copy(R.scissor),wt=R.scissorTest,bt.viewport(ct),bt.scissor(St),bt.setScissorTest(wt),$=-1;return}else if(Et.__webglFramebuffer===void 0)Kt.setupRenderTarget(R);else if(Et.__hasExternalTextures)Kt.rebindTextures(R,Bt.get(R.texture).__webglTexture,Bt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const jt=R.depthTexture;if(Et.__boundDepthTexture!==jt){if(jt!==null&&Bt.has(jt)&&(R.width!==jt.image.width||R.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(R)}}const Ct=R.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Tt=!0);const Ht=Bt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ht[G])?K=Ht[G][Q]:K=Ht[G],J=!0):R.samples>0&&Kt.useMultisampledRTT(R)===!1?K=Bt.get(R).__webglMultisampledFramebuffer:Array.isArray(Ht)?K=Ht[Q]:K=Ht,ct.copy(R.viewport),St.copy(R.scissor),wt=R.scissorTest}else ct.copy(Wt).multiplyScalar(ut).floor(),St.copy(fe).multiplyScalar(ut).floor(),wt=_e;if(Q!==0&&(K=B),bt.bindFramebuffer(H.FRAMEBUFFER,K)&&bt.drawBuffers(R,K),bt.viewport(ct),bt.scissor(St),bt.setScissorTest(wt),J){const Et=Bt.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,Et.__webglTexture,Q)}else if(Tt){const Et=G;for(let Ct=0;Ct<R.textures.length;Ct++){const Ht=Bt.get(R.textures[Ct]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ct,Ht.__webglTexture,Q,Et)}}else if(R!==null&&Q!==0){const Et=Bt.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Et.__webglTexture,Q)}$=-1};function Ss(R){const G=Bt.get(R);return(G.__readFormat!==R.format||G.__readType!==R.type)&&(G.__readFormat=R.format,G.__readType=R.type,G.__formatReadable=Gt.textureFormatReadable(R.format),G.__typeReadable=Gt.textureTypeReadable(R.type)),G}this.readRenderTargetPixels=function(R,G,Q,K,J,Tt,Ft,Et=0){if(!(R&&R.isWebGLRenderTarget)){ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ft!==void 0&&(Ct=Ct[Ft],Array.isArray(Ct)&&(Ct=Ct[0])),Ct){bt.bindFramebuffer(H.FRAMEBUFFER,Ct);try{const Ht=R.textures[Et],jt=Ht.format,ue=Ht.type;R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Et);const zt=Ss(Ht);if(zt.__formatReadable===!1){ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(zt.__typeReadable===!1){ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-K&&Q>=0&&Q<=R.height-J&&H.readPixels(G,Q,K,J,lt.convert(jt),lt.convert(ue),Tt)}finally{const Ht=at!==null?Bt.get(at).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(R,G,Q,K,J,Tt,Ft,Et=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ft!==void 0&&(Ct=Ct[Ft],Array.isArray(Ct)&&(Ct=Ct[0])),Ct)if(G>=0&&G<=R.width-K&&Q>=0&&Q<=R.height-J){bt.bindFramebuffer(H.FRAMEBUFFER,Ct);const Ht=R.textures[Et],jt=Ht.format,ue=Ht.type;R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Et);const zt=Ss(Ht);if(zt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(zt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const y=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,y),H.bufferData(H.PIXEL_PACK_BUFFER,Tt.byteLength,H.STREAM_READ),H.readPixels(G,Q,K,J,lt.convert(jt),lt.convert(ue),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const L=at!==null?Bt.get(at).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,L);const F=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await _u(H,F,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,y),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Tt),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(y),H.deleteSync(F),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,G=null,Q=0){const K=Math.pow(2,-Q),J=Math.floor(R.image.width*K),Tt=Math.floor(R.image.height*K),Ft=G!==null?G.x:0,Et=G!==null?G.y:0;Kt.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,Q,0,0,Ft,Et,J,Tt),bt.unbindTexture()},this.copyTextureToTexture=function(R,G,Q=null,K=null,J=0,Tt=0){let Ft,Et,Ct,Ht,jt,ue,zt,y,L;const F=R.isCompressedTexture?R.mipmaps[Tt]:R.image;if(Q!==null)Ft=Q.max.x-Q.min.x,Et=Q.max.y-Q.min.y,Ct=Q.isBox3?Q.max.z-Q.min.z:1,Ht=Q.min.x,jt=Q.min.y,ue=Q.isBox3?Q.min.z:0;else{const kt=Math.pow(2,-J);Ft=Math.floor(F.width*kt),Et=Math.floor(F.height*kt),R.isDataArrayTexture?Ct=F.depth:R.isData3DTexture?Ct=Math.floor(F.depth*kt):Ct=1,Ht=0,jt=0,ue=0}K!==null?(zt=K.x,y=K.y,L=K.z):(zt=0,y=0,L=0);const X=lt.convert(G.format),W=lt.convert(G.type);let tt;G.isData3DTexture?(Kt.setTexture3D(G,0),tt=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Kt.setTexture2DArray(G,0),tt=H.TEXTURE_2D_ARRAY):(Kt.setTexture2D(G,0),tt=H.TEXTURE_2D),bt.activeTexture(H.TEXTURE0),bt.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),bt.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),bt.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const q=bt.getParameter(H.UNPACK_ROW_LENGTH),Mt=bt.getParameter(H.UNPACK_IMAGE_HEIGHT),te=bt.getParameter(H.UNPACK_SKIP_PIXELS),re=bt.getParameter(H.UNPACK_SKIP_ROWS),It=bt.getParameter(H.UNPACK_SKIP_IMAGES);bt.pixelStorei(H.UNPACK_ROW_LENGTH,F.width),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,F.height),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,Ht),bt.pixelStorei(H.UNPACK_SKIP_ROWS,jt),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,ue);const ht=R.isDataArrayTexture||R.isData3DTexture,et=G.isDataArrayTexture||G.isData3DTexture;if(R.isDepthTexture){const kt=Bt.get(R),Te=Bt.get(G),$t=Bt.get(kt.__renderTarget),Yt=Bt.get(Te.__renderTarget);bt.bindFramebuffer(H.READ_FRAMEBUFFER,$t.__webglFramebuffer),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Yt.__webglFramebuffer);for(let Re=0;Re<Ct;Re++)ht&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Bt.get(R).__webglTexture,J,ue+Re),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Bt.get(G).__webglTexture,Tt,L+Re)),H.blitFramebuffer(Ht,jt,Ht+Ft,jt+Et,zt,y,zt+Ft,y+Et,H.DEPTH_BUFFER_BIT,H.NEAREST);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(J!==0||R.isRenderTargetTexture||Bt.has(R)){const kt=Bt.get(R),Te=Bt.get(G);bt.bindFramebuffer(H.READ_FRAMEBUFFER,I),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let $t=0;$t<Ct;$t++)ht?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,kt.__webglTexture,J,ue+$t):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,kt.__webglTexture,J),et?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Te.__webglTexture,Tt,L+$t):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Te.__webglTexture,Tt),J!==0?H.blitFramebuffer(Ht,jt,Ht+Ft,jt+Et,zt,y,zt+Ft,y+Et,H.COLOR_BUFFER_BIT,H.NEAREST):et?H.copyTexSubImage3D(tt,Tt,zt,y,L+$t,Ht,jt,Ft,Et):H.copyTexSubImage2D(tt,Tt,zt,y,Ht,jt,Ft,Et);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else et?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(tt,Tt,zt,y,L,Ft,Et,Ct,X,W,F.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(tt,Tt,zt,y,L,Ft,Et,Ct,X,F.data):H.texSubImage3D(tt,Tt,zt,y,L,Ft,Et,Ct,X,W,F):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Tt,zt,y,Ft,Et,X,W,F.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Tt,zt,y,F.width,F.height,X,F.data):H.texSubImage2D(H.TEXTURE_2D,Tt,zt,y,Ft,Et,X,W,F);bt.pixelStorei(H.UNPACK_ROW_LENGTH,q),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Mt),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,te),bt.pixelStorei(H.UNPACK_SKIP_ROWS,re),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,It),Tt===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(tt),bt.unbindTexture()},this.initRenderTarget=function(R){Bt.get(R).__webglFramebuffer===void 0&&Kt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Kt.setTextureCube(R,0):R.isData3DTexture?Kt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Kt.setTexture2DArray(R,0):Kt.setTexture2D(R,0),bt.unbindTexture()},this.resetState=function(){U=0,V=0,at=null,bt.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}}const wc=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:wo,AddEquation:Ii,AddOperation:eh,AdditiveBlending:Vs,AgXToneMapping:Ga,AlphaFormat:qa,AlwaysCompare:$a,AlwaysDepth:Nr,AlwaysStencilFunc:rh,ArcCurve:Th,ArrayCamera:Gh,BackSide:an,BasicDepthPacking:ih,Box3:Mi,BoxGeometry:We,BufferAttribute:ln,BufferGeometry:Xe,ByteType:Va,Camera:gl,CanvasTexture:Ra,CatmullRomCurve3:Ah,CineonToneMapping:Ba,ClampToEdgeWrapping:Xn,Color:se,ColorManagement:pe,ConeGeometry:qn,ConstantAlphaFactor:Qc,ConstantColorFactor:Jc,Controls:Hh,CubeCamera:bo,CubeDepthTexture:cl,CubeReflectionMapping:Oi,CubeRefractionMapping:ls,CubeTexture:ll,CubicBezierCurve:wh,CubicBezierCurve3:Rh,CullFaceBack:Sa,CullFaceFront:Nc,CullFaceNone:Ic,Curve:Zn,CustomBlending:Fc,CustomToneMapping:za,CylinderGeometry:An,Data3DTexture:vh,DataArrayTexture:el,DataTexture:sl,DepthFormat:oi,DepthStencilFormat:ii,DepthTexture:zi,DirectionalLight:Ca,DoubleSide:en,DstAlphaFactor:Xc,DstColorFactor:qc,DynamicDrawUsage:Qa,EllipseCurve:ul,EqualCompare:lh,EqualDepth:Fr,EquirectangularReflectionMapping:wr,EquirectangularRefractionMapping:Rr,Euler:Un,EventDispatcher:li,ExternalTexture:hl,Float32BufferAttribute:we,FloatType:En,FogExp2:Oo,FrontSide:_i,Frustum:us,FrustumArray:Bo,GLSL3:Ea,GreaterCompare:ch,GreaterDepth:Br,GreaterEqualCompare:Ja,GreaterEqualDepth:Or,Group:xn,HalfFloatType:Nn,HemisphereLight:Bh,IcosahedronGeometry:Go,ImageUtils:_h,InstancedBufferAttribute:Aa,InstancedMesh:rl,IntType:Ro,KeepStencilOp:Pr,Layers:Fo,LessCompare:ah,LessDepth:Ur,LessEqualCompare:Ka,LessEqualDepth:as,Light:ml,LightShadow:zh,Line:yh,LineBasicMaterial:ol,LineCurve:Ch,LineCurve3:Ph,LineSegments:bh,LinearFilter:on,LinearMipmapLinearFilter:ni,LinearMipmapNearestFilter:Cr,LinearSRGBColorSpace:Ys,LinearToneMapping:Fa,LinearTransfer:qs,MOUSE:Ui,Material:yi,MathUtils:rs,Matrix3:ee,Matrix4:me,MaxEquation:Gc,Mesh:Me,MeshBasicMaterial:Vn,MeshDepthMaterial:Fh,MeshDistanceMaterial:Oh,MeshStandardMaterial:ds,MinEquation:zc,MirroredRepeatWrapping:kr,MixOperation:th,MultiplyBlending:ba,MultiplyOperation:Ua,NearestFilter:Je,NearestMipmapLinearFilter:Ls,NearestMipmapNearestFilter:nh,NeutralToneMapping:ka,NeverCompare:oh,NeverDepth:Ir,NoBlending:Fi,NoColorSpace:ei,NoToneMapping:Yn,NormalBlending:ss,NotEqualCompare:hh,NotEqualDepth:zr,Object3D:ke,ObjectSpaceNormalMap:sh,OneFactor:Hc,OneMinusConstantAlphaFactor:jc,OneMinusConstantColorFactor:$c,OneMinusDstAlphaFactor:Yc,OneMinusDstColorFactor:Zc,OneMinusSrcAlphaFactor:Na,OneMinusSrcColorFactor:Wc,OrthographicCamera:_l,PCFShadowMap:Is,PCFSoftShadowMap:Uc,PMREMGenerator:Js,PerspectiveCamera:yn,Plane:Hn,PlaneGeometry:ai,Points:Eh,PointsMaterial:al,PolyhedronGeometry:zo,QuadraticBezierCurve:Lh,QuadraticBezierCurve3:dl,Quaternion:dn,R11_EAC_Format:Kr,RED_GREEN_RGTC2_Format:Xs,RED_RGTC1_Format:go,REVISION:Ao,RG11_EAC_Format:Ws,RGBAFormat:Ln,RGBAIntegerFormat:No,RGBA_ASTC_10x10_Format:co,RGBA_ASTC_10x5_Format:oo,RGBA_ASTC_10x6_Format:ao,RGBA_ASTC_10x8_Format:lo,RGBA_ASTC_12x10_Format:ho,RGBA_ASTC_12x12_Format:uo,RGBA_ASTC_4x4_Format:Qr,RGBA_ASTC_5x4_Format:jr,RGBA_ASTC_5x5_Format:to,RGBA_ASTC_6x5_Format:eo,RGBA_ASTC_6x6_Format:no,RGBA_ASTC_8x5_Format:io,RGBA_ASTC_8x6_Format:so,RGBA_ASTC_8x8_Format:ro,RGBA_BPTC_Format:fo,RGBA_ETC2_EAC_Format:Zr,RGBA_PVRTC_2BPPV1_Format:Xr,RGBA_PVRTC_4BPPV1_Format:Wr,RGBA_S3TC_DXT1_Format:Us,RGBA_S3TC_DXT3_Format:Fs,RGBA_S3TC_DXT5_Format:Os,RGBFormat:Za,RGB_BPTC_SIGNED_Format:po,RGB_BPTC_UNSIGNED_Format:mo,RGB_ETC1_Format:Yr,RGB_ETC2_Format:qr,RGB_PVRTC_2BPPV1_Format:Vr,RGB_PVRTC_4BPPV1_Format:Hr,RGB_S3TC_DXT1_Format:Ns,RGFormat:xi,RGIntegerFormat:Io,RawShaderMaterial:Uh,Ray:ms,Raycaster:kh,RedFormat:Lo,RedIntegerFormat:Do,ReinhardToneMapping:Oa,RenderTarget:xh,RepeatWrapping:Gr,ReverseSubtractEquation:Bc,RingGeometry:Ks,SIGNED_R11_EAC_Format:Jr,SIGNED_RED_GREEN_RGTC2_Format:xo,SIGNED_RED_RGTC1_Format:_o,SIGNED_RG11_EAC_Format:$r,SRGBColorSpace:rn,SRGBTransfer:Ae,Scene:Sh,ShaderChunk:ae,ShaderLib:Pn,ShaderMaterial:vi,ShortType:Wa,Sphere:Si,SphereGeometry:gi,Spherical:La,SplineCurve:Dh,SrcAlphaFactor:Ia,SrcAlphaSaturateFactor:Kc,SrcColorFactor:Vc,StaticDrawUsage:uh,SubtractEquation:Oc,SubtractiveBlending:ya,TOUCH:Ni,TangentSpaceNormalMap:vo,Texture:$e,TextureSource:Uo,TorusGeometry:ri,Triangle:bn,TubeGeometry:pl,UVMapping:Ha,Uint16BufferAttribute:nl,Uint32BufferAttribute:il,UniformsLib:Pt,UniformsUtils:Nh,UnsignedByteType:fn,UnsignedInt101111Type:Ya,UnsignedInt248Type:Bi,UnsignedInt5999Type:Xa,UnsignedIntType:In,UnsignedShort4444Type:Co,UnsignedShort5551Type:Po,UnsignedShortType:cs,VSMShadowMap:is,Vector2:Nt,Vector3:O,Vector4:Ie,WebGLCoordinateSystem:Tn,WebGLCubeRenderTarget:ko,WebGLRenderTarget:Dn,WebGLRenderer:eu,WebGLUtils:jh,WebGPUCoordinateSystem:hs,WebXRController:Lr,ZeroFactor:kc,createCanvasElement:fh,error:ve,log:Ta,warn:Jt,warnOnce:Bs},Symbol.toStringTag,{value:"Module"})),Rc={type:"change"},xl={type:"start"},nu={type:"end"},Tr=new ms,Cc=new Hn,sg=Math.cos(70*rs.DEG2RAD),Ve=new O,un=2*Math.PI,Ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ma=1e-6;class rg extends Hh{constructor(t,e=null){super(t,e),this.state=Ee.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ui.ROTATE,MIDDLE:Ui.DOLLY,RIGHT:Ui.PAN},this.touches={ONE:Ni.ROTATE,TWO:Ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new dn,this._lastTargetPosition=new O,this._quat=new dn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new La,this._sphericalDelta=new La,this._scale=1,this._panOffset=new O,this._rotateStart=new Nt,this._rotateEnd=new Nt,this._rotateDelta=new Nt,this._panStart=new Nt,this._panEnd=new Nt,this._panDelta=new Nt,this._dollyStart=new Nt,this._dollyEnd=new Nt,this._dollyDelta=new Nt,this._dollyDirection=new O,this._mouse=new Nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ag.bind(this),this._onPointerDown=og.bind(this),this._onPointerUp=lg.bind(this),this._onContextMenu=mg.bind(this),this._onMouseWheel=ug.bind(this),this._onKeyDown=fg.bind(this),this._onTouchStart=dg.bind(this),this._onTouchMove=pg.bind(this),this._onMouseDown=cg.bind(this),this._onMouseMove=hg.bind(this),this._interceptControlDown=gg.bind(this),this._interceptControlUp=_g.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ee.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rc),this.update(),this.state=Ee.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ve.copy(e).sub(this.target),Ve.applyQuaternion(this._quat),this._spherical.setFromVector3(Ve),this.autoRotate&&this.state===Ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=un:n>Math.PI&&(n-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ve.setFromSpherical(this._spherical),Ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ve.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Tr.origin.copy(this.object.position),Tr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Tr.direction))<sg?this.object.lookAt(this.target):(Cc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Tr.intersectPlane(Cc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ma||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ma||this._lastTargetPosition.distanceToSquared(this.target)>Ma?(this.dispatchEvent(Rc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?un/60*this.autoRotateSpeed*t:un/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ve.setFromMatrixColumn(e,0),Ve.multiplyScalar(-t),this._panOffset.add(Ve)}_panUp(t,e){this.screenSpacePanning===!0?Ve.setFromMatrixColumn(e,1):(Ve.setFromMatrixColumn(e,0),Ve.crossVectors(this.object.up,Ve)),Ve.multiplyScalar(t),this._panOffset.add(Ve)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ve.copy(s).sub(this.target);let r=Ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(un*this._rotateDelta.x/e.clientHeight),this._rotateUp(un*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Nt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function og(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ag(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function lg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(nu),this.state=Ee.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function cg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ee.DOLLY;break;case Ui.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ee.ROTATE}break;case Ui.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ee.PAN}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(xl)}function hg(i){switch(this.state){case Ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ug(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ee.NONE||(i.preventDefault(),this.dispatchEvent(xl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(nu))}function fg(i){this.enabled!==!1&&this._handleKeyDown(i)}function dg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ni.ROTATE:if(this.enableRotate===!1){this.state=Ee.NONE;break}this._handleTouchStartRotate(i),this.state=Ee.TOUCH_ROTATE;break;case Ni.PAN:if(this.enablePan===!1){this.state=Ee.NONE;break}this._handleTouchStartPan(i),this.state=Ee.TOUCH_PAN;break;default:this.state=Ee.NONE}break;case 2:switch(this.touches.TWO){case Ni.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ee.TOUCH_DOLLY_PAN;break;case Ni.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ee.TOUCH_DOLLY_ROTATE;break;default:this.state=Ee.NONE}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(xl)}function pg(i){switch(this._trackPointer(i),this.state){case Ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ee.NONE}}function mg(i){this.enabled!==!1&&i.preventDefault()}function gg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _g(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ps=new O;function Sn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Ps.copy(t),Ps[n]=0,Ps.normalize();const l=.5*o/(o+a),d=1-Ps.angleTo(i)/c;return Math.sign(Ps[e])===1?d*l:a/(o+a)+l+l*(1-d)}class Eo extends We{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new O,l=new O,d=new O(t,e,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,u=this.attributes.normal.array,p=this.attributes.uv.array,_=m.length/6,b=new O,f=.5/o;for(let g=0,S=0;g<m.length;g+=3,S+=2)switch(c.fromArray(m,g),l.copy(c),l.x-=Math.sign(l.x)*f,l.y-=Math.sign(l.y)*f,l.z-=Math.sign(l.z)*f,l.normalize(),m[g+0]=d.x*Math.sign(c.x)+l.x*r,m[g+1]=d.y*Math.sign(c.y)+l.y*r,m[g+2]=d.z*Math.sign(c.z)+l.z*r,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/_)){case 0:b.set(1,0,0),p[S+0]=Sn(b,l,"z","y",r,n),p[S+1]=1-Sn(b,l,"y","z",r,e);break;case 1:b.set(-1,0,0),p[S+0]=1-Sn(b,l,"z","y",r,n),p[S+1]=1-Sn(b,l,"y","z",r,e);break;case 2:b.set(0,1,0),p[S+0]=1-Sn(b,l,"x","z",r,t),p[S+1]=Sn(b,l,"z","x",r,n);break;case 3:b.set(0,-1,0),p[S+0]=1-Sn(b,l,"x","z",r,t),p[S+1]=1-Sn(b,l,"z","x",r,n);break;case 4:b.set(0,0,1),p[S+0]=1-Sn(b,l,"x","y",r,t),p[S+1]=1-Sn(b,l,"y","x",r,e);break;case 5:b.set(0,0,-1),p[S+0]=Sn(b,l,"x","y",r,t),p[S+1]=1-Sn(b,l,"y","x",r,e);break}}static fromJSON(t){return new Eo(t.width,t.height,t.depth,t.segments,t.radius)}}function Wn(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Xe;c.morphTargetsRelative=a;let l=0;for(let d=0;d<i.length;++d){const m=i[d];let u=0,p=0;if(e!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in m.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(m.attributes[_]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(a!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in m.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;if(m.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;o[_]===void 0&&(o[_]=[]),o[_].push(m.morphAttributes[_]),p++}if(p!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of morph attributes."),null;if(t){let _;if(e)_=m.index.count;else if(m.attributes.position!==void 0)_=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,d),l+=_}}if(e){let d=0;const m=[];for(let u=0;u<i.length;++u){const p=i[u].index;for(let _=0;_<p.count;++_)m.push(p.getX(_)+d);d+=i[u].attributes.position.count}c.setIndex(m)}for(const d in r){const m=Pc(r[d]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,m)}for(const d in o){const m=o[d][0].length;if(m!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<m;++u){const p=[];for(let b=0;b<o[d].length;++b)p.push(o[d][b][u]);const _=Pc(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(_)}}}return c}function Pc(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const d=i[l];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*e}const o=new t(r),a=new ln(o,e,n);let c=0;for(let l=0;l<i.length;++l){const d=i[l];if(d.isInterleavedBufferAttribute){const m=c/e;for(let u=0,p=d.count;u<p;u++)for(let _=0;_<e;_++){const b=d.getComponent(u,_);a.setComponent(u+m,_,b)}}else o.set(d.array,c);c+=d.count*e}return s!==void 0&&(a.gpuType=s),a}const xg=128,vg=8,Mg=-36.75,Sg=-28,yg=10.5,bg=12,Eg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],Oe={capacity:xg,columns:vg,startX:Mg,startZ:Sg,spacingX:yg,spacingZ:bg,boxes:Eg};function Wo(i){return Number.isInteger(i)&&i>=0&&i<Oe.capacity?{slot:i,x:Oe.startX+i%Oe.columns*Oe.spacingX,z:Oe.startZ-Math.floor(i/Oe.columns)*Oe.spacingZ}:null}function Tg(i,t=i,e=null,n=Oe.capacity,s=.4){const r=[],o=Math.min(i.x,t.x)-s,a=Math.max(i.x,t.x)+s,c=Math.min(i.z,t.z)-s,l=Math.max(i.z,t.z)+s,d=Math.max(0,Math.ceil((o-5.1-Oe.startX)/Oe.spacingX)),m=Math.min(Oe.columns-1,Math.floor((a+5.1-Oe.startX)/Oe.spacingX)),u=Math.max(0,Math.ceil((Oe.startZ-l-5.3)/Oe.spacingZ)),p=Math.min(Math.ceil(Oe.capacity/Oe.columns)-1,Math.floor((Oe.startZ-c+5.3)/Oe.spacingZ));for(let _=u;_<=p;_++)for(let b=d;b<=m;b++){const f=_*Oe.columns+b,g=Wo(f);if(!(!g||f>=n))for(const S of Oe.boxes)S.tag==="home-door"&&f===e||r.push({left:g.x+S.x-S.w/2,right:g.x+S.x+S.w/2,back:g.z+S.z-S.d/2,front:g.z+S.z+S.d/2,top:S.top,tag:S.tag})}return r}function Di(i,t){return!!(t&&i&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function Ag({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new me,d=new dn,m=new O(1,1,1),u=new me().makeScale(0,0,0);let p=null,_=1,b=0,f=null;const g={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function S(w,D,B,I,k,U="inside",V=0){D=g[D]||D;let at=w;at.index&&(at=w.toNonIndexed(),w.dispose()),d.setFromEuler(new Un(0,0,V)),at.applyMatrix4(l.compose(new O(B,I,k),d,m));const $=`${U}:${D}`;o.has($)||o.set($,{layer:U,color:D,geometries:[]}),o.get($).geometries.push(at)}const T=(w,D,B,I,k,U,V,at="inside",$=0)=>S(new We(w,D,B),V,I,k,U,at,$),E=(w,D,B,I,k,U)=>S(new An(w,w,D,10),U,B,I,k);function M(w,D,B,I,k){S(new gi(w,9,6),k,D,B,I)}T(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),T(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),T(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),T(9.2,.08,7.8,0,.16,0,"#c8a178");for(let w=-4.2;w<4.5;w+=.7)T(.018,.012,7.6,w,.21,0,"#ab8965");T(3,.22,1,0,-.04,4.3,"#d7c5a7"),T(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),T(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),T(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),T(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const w of[-2.7,2.7])T(4,3.45,.18,w,1.9,3.9,"#e7dec9","front");T(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),T(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),T(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const w of[-2.85,2.85]){T(2.35,1.55,.12,w,2.05,4.04,"#71948d","front");for(const D of[-1.2,0,1.2])T(.055,1.65,.14,w+D,2.05,4.12,"#cfbb8c","front");for(const D of[1.23,2.87])T(2.45,.065,.14,w,D,4.12,"#cfbb8c","front");T(.23,.5,.14,w<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const w of[-1,1])T(4.95,.22,8.65,w*2.37,3.98,0,"#47695f","roof",w*-.18),T(4.95,.12,.12,w*2.37,3.96,4.35,"#c1a771","roof",w*-.18);T(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const w of[-2,-.5,1])T(2.25,.06,1.25,2.5,4.08,w,"#29434f","roof",-.18);T(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),T(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),T(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),T(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),T(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),T(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),T(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),E(.05,.35,-3.85,1.05,-2.4,"#bda16a"),E(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),T(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let w=0;w<4;w++)T(1.65,.024,.03,-2.15,2.88+w*.045,-3.55,"#8d9e98");T(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),T(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),T(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const w of[.98,1.91])T(.05,.37,.08,3.29,w,-2.25,"#56746a");T(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),T(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),T(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),E(.035,.3,3.45,1.45,-1.08,"#baa371"),E(.18,.3,2.1,1.43,-.75,"#e8dcc3"),T(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),T(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),T(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),T(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),E(.2,.33,.85,.43,-3.15,"#eee9de"),T(.5,.5,.22,.85,.68,-3.65,"#eee9de"),T(.55,.12,.42,1.5,1,-2.1,"#eee9de"),E(.025,1.65,1.5,1.9,-3.65,"#baa371"),T(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),T(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),T(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const w of[1.55,4.05])T(.23,.57,1,w,.72,2.45,"#a7b3a0");T(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),T(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const w of[.7,1.7])T(.08,.4,.6,w,.48,1.4,"#8c7556");T(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),T(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),T(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),T(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let w=0;w<8;w++)T(.11,.32+w%2*.1,.22,-3.2+w*.17,1.65,3.45,w%2?"#879f93":"#e2ca9e");for(const w of[-4.9,4.9]){T(.08,.7,10,w,.19,.1,"#aa9270");for(const D of[-4.7,0,4.7])T(.13,1,.13,w,.36,D,"#aa9270")}for(const w of[-3.6,3.6])E(.29,.45,w,.14,4.65,"#b58a69"),M(.4,w,.68,4.65,"#78946e");for(const{layer:w,color:D,geometries:B}of o.values()){const I=Wn(B,!1);B.forEach(U=>U.dispose()),e.add(I);const k=new rl(I,t(D),128);k.instanceMatrix.setUsage(Qa),k.count=0,k.userData.residenceLayer=w,i.add(k),a.push(k)}o.clear();const x=new We(1,1,1);e.add(x);const h=new Me(x,t("#b4c5ab"));h.userData.residenceGround=!0,i.add(h);const v=new Me(x,t("#e4dcc9"));i.add(v);function P(w){const D=Wo(w);return{x:D.x,z:D.z}}function C(){const w=Math.max(b,s.reduce((B,I,k)=>I===null?B:k+1,0));_=Math.max(1,Math.ceil(w/8));for(const B of a){B.count=w;for(let I=0;I<w;I++){const k=s[I],U=P(I);f!==null&&k!==f||k===null&&I>=b||k!==null&&k===(f??p)&&["roof","front"].includes(B.userData.residenceLayer)?B.setMatrixAt(I,u):B.userData.residenceLayer==="door"?B.setMatrixAt(I,l.compose(new O(U.x-.65,0,U.z+3.99),new dn().setFromAxisAngle(new O(0,1,0),c.has(k)?-Math.PI/2:0),m)):B.setMatrixAt(I,l.compose(new O(U.x,0,U.z),new dn,m))}B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere()}const D=_*12+4;h.scale.set(86,.3,D),h.position.set(0,-.55,-20-D/2),v.scale.set(1.5,.04,D),v.position.set(0,-.12,-20-D/2),h.visible=v.visible=w>0&&f===null}return{meshes:a,interior(w){f=r.has(w)?w:null,C()},slotFor:w=>r.get(w),setPlots(w){b=Math.min(128,Math.max(0,Number(w)||0)),C()},sync(w){const D=new Set(w.slice(0,128).map(B=>B.id));for(const[B,I]of r)D.has(B)||(s[I]=null,r.delete(B));for(const B of w.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(B.id)!==I&&(r.has(B.id)&&(s[r.get(B.id)]=null),r.delete(B.id))}for(const B of w.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=B.id,r.set(B.id,I))}for(const B of[...D].sort((I,k)=>I-k))if(!r.has(B)){const I=s.indexOf(null);s[I]=B,r.set(B,I)}r.has(p)||(p=null),C()},select(w){p=r.has(w)?w:null,C()},setDoor(w,D){D?c.add(w):c.delete(w),C()},location(w){const D=r.get(w);return D===void 0?null:P(D)},bed(w){const D=this.location(w);return D?[D.x-2.05,.92,D.z-.5]:null},cameraBoxes(w){const D=this.location(w);if(!D)return[];const B=(k,U,V,at,$)=>({left:D.x+k-V/2,right:D.x+k+V/2,back:D.z+U-at/2,front:D.z+U+at/2,top:$}),I=[B(-4.6,0,.18,7.8,3.6),B(0,-3.9,9.4,.18,3.6),B(3.65,-2.78,1.05,.92,2.3),B(2.95,-.75,2.62,.95,1.3),B(2.8,2.45,2.6,1.2,1.3)];return w!==p&&I.push(B(4.6,0,.18,7.8,3.6),B(0,3.9,9.4,.18,3.6)),I},personForHit(w){return w?.object?.userData?.residenceLayer&&Number.isInteger(w.instanceId)?s[w.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-_*12,front:-20}},dispose(){a.forEach(w=>{w.dispose(),i.remove(w)}),i.remove(h,v),r.clear(),s.fill(null)}}}const wg={minX:-100,maxX:100,minZ:-216,maxZ:92},Rg={x:0,y:-.12,z:20},Cg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},kn={bounds:wg,spawn:Rg,venues:Cg};function Pg(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=kn.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,d=!1,m=null,u=128;const p=(x,h=x,v=.3)=>d?Tg(x,h,m,u,Math.max(.4,v)):[],_=x=>x.top<=Gn.vault_height&&Gn.vault_tags.includes(x.tag);function b(x,h,v=-.12,P=o){return x>=t+P&&x<=e-P&&h>=n+P&&h<=s-P&&!i.concat(p({x,z:h},{x,z:h},P)).some(C=>!(_(C)&&v>=C.top+.075)&&x>C.left-P&&x<C.right+P&&h>C.back-P&&h<C.front+P)}function f(x,h,v=o){if(!b(h.x,h.z,h.y??-.12,v))return!1;for(const P of i.concat(p(x,h,v))){let C=0,w=1;for(const[D,B,I]of[["x",P.left-v,P.right+v],["z",P.back-v,P.front+v]]){const k=h[D]-x[D];if(Math.abs(k)<1e-8){if(x[D]<=B||x[D]>=I){C=2;break}}else{const U=(B-x[D])/k,V=(I-x[D])/k;C=Math.max(C,Math.min(U,V)),w=Math.min(w,Math.max(U,V))}}if(C<=w&&w>0&&C<1){const D=x.y??-.12,B=h.y??-.12;if(_(P)&&Math.min(D+(B-D)*Math.max(0,C),D+(B-D)*Math.min(1,w))>=P.top+.075)continue;return!1}}return!0}function g(){if(!l){l=new Uint8Array(a*c).fill(1);for(let x=0;x<c;x++)for(let h=0;h<a;h++)(h===0||x===0||h===a-1||x===c-1)&&(l[x*a+h]=0);for(const x of i.concat(p({x:t,z:n},{x:e,z:s}))){const h=Math.max(0,Math.ceil((x.left-.4-t)/r)),v=Math.min(a-1,Math.floor((x.right+.4-t)/r)),P=Math.max(0,Math.ceil((x.back-.4-n)/r)),C=Math.min(c-1,Math.floor((x.front+.4-n)/r));for(let w=P;w<=C;w++)for(let D=h;D<=v;D++)l[w*a+D]=0}}}function S(x,h,v){const P=h.x-x.x,C=h.z-x.z,w=P*P+C*C;return v.every(D=>{const B=w?Math.max(0,Math.min(1,((D.x-x.x)*P+(D.z-x.z)*C)/w)):0;return Math.hypot(x.x+P*B-D.x,x.z+C*B-D.z)>=.62})}function T(x,h=null,v=[]){g();const P=Math.round((x.x-t)/r),C=Math.round((x.z-n)/r);let w=-1,D=1/0;for(let B=-6;B<=6;B++)for(let I=-6;I<=6;I++){const k=P+I,U=C+B,V=U*a+k;if(k<0||U<0||k>=a||U>=c||!(h||l)[V])continue;const at=(t+k*r-x.x)**2+(n+U*r-x.z)**2;b(x.x,x.z)&&!f(x,{x:t+k*r,z:n+U*r})||S(x,{x:t+k*r,z:n+U*r},v)&&at<D&&(w=V,D=at)}return w}function E(x){return{x:t+x%a*r,z:n+Math.floor(x/a)*r}}function M(x,h,v=[]){if(f(x,h)&&S(x,h,v))return[{x:h.x,z:h.z}];g();const P=v.length?l.slice():l;for(const j of v){const ct=Math.round((j.x-t)/r),St=Math.round((j.z-n)/r);for(let wt=-2;wt<=2;wt++)for(let nt=-2;nt<=2;nt++){const pt=ct+nt,Rt=St+wt;pt>=0&&Rt>=0&&pt<a&&Rt<c&&Math.hypot(t+pt*r-j.x,n+Rt*r-j.z)<.76&&(P[Rt*a+pt]=0)}}const C=T(x,P,v),w=T(h,P,v);if(C<0||w<0)return[];const D=[],B=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),k=new Uint8Array(a*c),U=j=>Math.abs(j%a-w%a)+Math.abs(Math.floor(j/a)-Math.floor(w/a));function V(j,ct){D.push({index:j,score:ct});let St=D.length-1;for(;St>0;){const wt=St-1>>1;if(D[wt].score<=ct)break;[D[St],D[wt]]=[D[wt],D[St]],St=wt}}function at(){const j=D[0],ct=D.pop();if(D.length){D[0]=ct;let St=0;for(;;){let wt=St,nt=St*2+1,pt=nt+1;if(nt<D.length&&D[nt].score<D[wt].score&&(wt=nt),pt<D.length&&D[pt].score<D[wt].score&&(wt=pt),wt===St)break;[D[St],D[wt]]=[D[wt],D[St]],St=wt}}return j.index}B[C]=0,V(C,U(C));let $=0;for(;D.length&&$++<a*c;){const j=at();if(k[j])continue;if(k[j]=1,j===w){const wt=[];let nt=j;for(;nt!==C;)wt.push(E(nt)),nt=I[nt];return wt.reverse(),b(h.x,h.z)&&f(wt.at(-1)||E(C),h)&&S(wt.at(-1)||E(C),h,v)&&wt.push({x:h.x,z:h.z}),b(x.x,x.z)&&wt.unshift(E(C)),wt}const ct=j%a,St=Math.floor(j/a);for(const[wt,nt]of[[1,0],[-1,0],[0,1],[0,-1]]){const pt=ct+wt,Rt=St+nt,Lt=Rt*a+pt;if(pt<0||Rt<0||pt>=a||Rt>=c||!P[Lt]||k[Lt]||!f(E(j),E(Lt))||!S(E(j),E(Lt),v))continue;const ut=B[j]+1;ut<B[Lt]&&(B[Lt]=ut,I[Lt]=j,V(Lt,ut+U(Lt)))}}return[]}return{configureHomes(x,h=null,v=u){d===!!x&&h===m&&v===u||(d=!!x,m=h,u=v,l=null)},withHomeAccess(x,h){if(!d||x===void 0||x===m)return h();const v=m,P=l;m=x,l=null;try{return h()}finally{m=v,l=P}},groundHeight(x){const h=Math.round((x.x+36.75)/10.5),v=Math.round((-28-x.z)/12);let P=d&&h>=0&&h<8&&v>=0&&Di(x,Wo(v*8+h))?.22:-.12;for(const C of i.concat(p(x)))_(C)&&(x.y??-.12)>=C.top+.07&&x.x>C.left-o&&x.x<C.right+o&&x.z>C.back-o&&x.z<C.front+o&&(P=Math.max(P,C.top+.08));return P},boxes:()=>i.map(x=>({...x})),slide(x,h,v=o){const P={...h,y:h.y??x.y};return f(x,P,v)?{x:h.x,z:h.z}:f(x,{...P,z:x.z},v)?{x:h.x,z:x.z}:f(x,{...P,x:x.x},v)?{x:x.x,z:h.z}:{x:x.x,z:x.z}},addBox(x,h,v,P,C="",w=2){i.push({left:v-x/2,right:v+x/2,back:P-h/2,front:P+h/2,top:w,tag:C}),l=null},cameraLimit(x,h,v=[]){let P=1;for(const C of i.concat(v)){let w=0,D=1;for(const[B,I,k]of[["x",C.left-.15,C.right+.15],["z",C.back-.15,C.front+.15],["y",-.3,C.top+.15]]){const U=h[B]-x[B];if(Math.abs(U)<1e-8){if(x[B]<I||x[B]>k){w=2;break}}else{const V=(I-x[B])/U,at=(k-x[B])/U;w=Math.max(w,Math.min(V,at)),D=Math.min(D,Math.max(V,at))}}w<=D&&w>.01&&w<P&&(P=Math.max(.02,w-.015))}return P},free:b,segment:f,path:M,nearest(x){const h=T(x);return h<0?null:E(h)},move(x,h,v){const P=Math.hypot(h.x-x.x,h.z-x.z),C=P>0?Math.min(1,v/P):0,w={x:x.x+(h.x-x.x)*C,z:x.z+(h.z-x.z)*C};return f(x,w)?w:{x:x.x,z:x.z}}}}function Lg({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new xn;i.add(a);const c=At=>(t.add(At),At);function l(At,qt){const le=new ds(qt);return e.set("environment:"+At,le),le}const d=l("grass",{color:"#a5b99a",roughness:1}),m=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),u=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),p=l("forest",{color:"#4c7262",roughness:1}),_=new Me(c(new ai(850,850)),d);_.rotation.x=-Math.PI/2,_.position.y=-1.3,a.add(_);const b=[],f=[],g=[],S=new me,T=new dn;function E(At,qt,le,Xt,ge,xe=1,ne=1,Ce=1){const Fe=At.index?At.toNonIndexed():At;Fe!==At&&At.dispose(),Fe.applyMatrix4(S.compose(new O(le,Xt,ge),T,new O(xe,ne,Ce))),qt.push(Fe)}for(let At=0;At<20;At++){const qt=At/20*Math.PI*2,le=Math.cos(qt)*(155+At%3*18),Xt=-70+Math.sin(qt)*230,ge=35+At%5*13,xe=25+At%4*9;E(new qn(xe,ge,7),b,le,ge/2-1.3,Xt,1.2,1,1),E(new qn(xe*.28,ge*.28,7),f,le,ge*.86-1.25,Xt,1.2,1,1)}for(let At=0;At<100;At++){const qt=At%2?-1:1,le=qt*(51+At%9*4),Xt=-210+Math.floor(At/2)*5.4,ge=3.5+At%4;E(new qn(1.3+At%3*.25,ge,6),g,le,ge/2-.8,Xt),Xt>=-22&&Xt<=92&&o?.addBox(2.6,2.6,le,Xt,"forest-tree",ge)}function M(At,qt){const le=c(Wn(At,!1));At.forEach(ge=>ge.dispose());const Xt=new Me(le,qt);return a.add(Xt),Xt}const x=M(b,m),h=M(f,u),v=M(g,p),P=[];for(let At=0;At<14;At++)for(let qt=0;qt<4;qt++)E(new gi(1,9,6),P,-100+At%7*32+(qt-1.5)*4,29+At%4*4+qt%2*1.5,-120+Math.floor(At/7)*165,7,3.2,4.8);const C=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),w=M(P,C),D=6e3,B=new Float32Array(D*3),I=new Float32Array(D*6),k=[];for(let At=0;At<D;At++)k.push({x:At*73.31%64-32,y:At*17.73%32,z:At*41.71%70-35});const U=c(new Xe);U.setAttribute("position",new ln(B,3)),U.setDrawRange(0,320);const V=new al({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",V);const at=new Eh(U,V);at.frustumCulled=!1,a.add(at);const $=c(new Xe);$.setAttribute("position",new ln(I,3));const j=new ol({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",j);const ct=new bh($,j);ct.frustumCulled=!1,a.add(ct);const St=c(new ai(260,24,48,4)),wt=new Float32Array(St.attributes.position.count*3);for(let At=0;At<St.attributes.position.count;At++)new se().setHSL(.38+At%49/49*.34,.75,.62).toArray(wt,At*3);St.setAttribute("color",new ln(wt,3));const nt=new Vn({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:en,blending:Vs});e.set("environment:aurora",nt);const pt=new Me(St,nt);pt.position.set(0,55,-235),a.add(pt);const Rt=St.attributes.position.array.slice();let Lt={},ut=0,Ot="",ye="",Wt=!1,fe=-60;const _e={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function oe(At){const qt=cu(Lt,Date.now()+ut).mode;if(qt===Ot&&ye===`${Lt.landscape}:${At}`)return;Ot=qt,ye=`${Lt.landscape}:${At}`;const le=_e[Lt.landscape]||_e.alps;d.color.set(le[0]),m.color.set(le[1]),p.color.set(le[2]);const Xt=qt==="aurora";i.background=new se(Xt?"#102339":At?"#142730":qt==="rain"?"#a6babd":qt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new Oo(i.background,qt==="mist"?.007:qt==="rain"?.0035:.0013),n.intensity=Xt?.6:qt==="rain"?1.35:At?1.65:2.7,s.intensity=Xt?1.6:At?2.05:2.6,r.intensity=Xt?1.8:1.1,C.color.set(qt==="rain"?"#859c9f":"#f5f2e9"),V.color.set("#ffffff"),V.size=.13}return{configure(At={},qt=!1){Lt=At.settings||{},Number.isFinite(At.server_ms)&&(ut=At.server_ms-Date.now()),Wt=qt,x.visible=h.visible=Lt.mountains!==!1,w.visible=Lt.clouds!==!1;const le=Lt.precipitation||"heavy",Xt=Wt?900:le==="light"?650:le==="storm"?5800:3600;U.setDrawRange(0,Xt),$.setDrawRange(0,Xt*2),ye=""},update(At,{paused:qt=!1,dark:le=!1,center:Xt=null}={}){oe(le);const ge=Ot,xe=qt?0:At/1e3;if(w.position.x=qt?0:Math.sin(xe*.012)*9,at.visible=ge==="snow",ct.visible=ge==="rain",pt.visible=ge==="aurora",at.visible||ct.visible){const ne=U.drawRange.count,Ce=Xt?.x||0,Fe=Xt?.z||0;for(let H=0;H<ne;H++){const Ze=k[H],ie=Ze.x+Ce+Math.sin(xe*.4+H)*(ge==="snow"?.55:.1),Gt=(Ze.y-xe*(ge==="snow"?1.4:20)%32+32)%32,bt=Ze.z+Fe;if(ge==="snow")B[H*3]=ie,B[H*3+1]=Gt,B[H*3+2]=bt;else{const Se=H*6;I[Se]=ie,I[Se+1]=Gt,I[Se+2]=bt,I[Se+3]=ie+.1,I[Se+4]=Gt-.9,I[Se+5]=bt}}(ge==="snow"?U:$).attributes.position.needsUpdate=!0}if(pt.visible){const ne=St.attributes.position.array;for(let Ce=0;Ce<ne.length;Ce+=3)ne[Ce+1]=Rt[Ce+1]+Math.sin(Rt[Ce]*.035+xe*.3)*5,ne[Ce+2]=Math.cos(Rt[Ce]*.02+xe*.17)*9;St.attributes.position.needsUpdate=!0}},extent(At){At!==fe&&(fe=At,v.scale.z=Math.max(1,Math.abs(At)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function Dg({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let M=-40;M<=-20;M+=2)for(let x=43;x<=59;x+=2)t(1.98,.025,1.98,M,-.18,x,(M+x)/2%2?"#e8dfcb":"#d1c6ac",0);for(const M of[-41.3,-18.7])t(.15,.09,20,M,-.1,51,"gold",0),t(.35,1.4,19.8,M,.45,51,"deep"),a.addBox(.35,19.8,M,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const M of[-40,-20])for(const x of[42.5,50.5,59.5])e(.35,.25,M,-.03,x,"gold"),e(.2,4.7,M,2.3,x,"white"),e(.38,.22,M,4.7,x,"gold"),a.addBox(.75,.75,M,x,"grand-bar-column",4.9);for(const M of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,M,"gold");for(const x of[-36,-24]){const h=new ri(2,.075,6,24,Math.PI);s(h,"gold",x,3.4,M)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const M of[41.65,42.3])t(15,.14,.7,-30,1.5+(M-41.65)*2,M,"wood");for(let M=0;M<14;M++){const x=-36.5+M;e(.11,.55,x,1.87,41.8,M%2?"#87b6a5":"#b89c68"),e(.04,.14,x,2.22,41.8,"gold")}for(const M of[-37,-34,-31,-28,-25,-22])e(.37,.16,M,.57,47.4,"deep"),e(.065,.8,M,.08,47.4,"gold"),e(.28,.06,M,-.12,47.4,"gold"),a.addBox(.75,.75,M,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[M,x,h]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,M,4.8,x,"gold"),s(new ri(h,.035,6,28),"gold",M,4,x,Math.PI/2);for(let v=0;v<12;v++){const P=v*Math.PI/6,C=M+Math.cos(P)*h,w=x+Math.sin(P)*h;e(.014,.46,C,3.75,w,"gold"),n(.09,.19,.09,C,3.47,w,"white")}}for(const M of[-38,-22])t(2.1,.65,5.1,M,.15,54,"#856c8c",.18),t(.3,1,5.2,M+(M<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,M,54,"velvet-booth",1.3),e(.68,.12,M+(M<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,M+(M<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,M+(M<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const d=["#87668e","#508a87","#b99c68","#5c708c"];for(let M=0;M<8;M++)for(let x=0;x<6;x++)t(1.04,.025,1.02,-33.7+M*1.06,.035,53.4+x*1.06,d[(M+x)%4],.015);for(const M of[-34.5,-25.5])t(.04,.06,6.6,M,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const M of[-31.4,-28.6])e(.57,.08,M,1.24,51.1,"black"),e(.15,.1,M,1.3,51.1,"gold");for(let M=0;M<6;M++)t(.1,.09,.22,-30.65+M*.25,1.26,51.3,"white",.01);for(const M of[-34.5,-25.5]){t(1,2.3,.8,M,1,51,"black");for(const x of[.45,1.35]){const h=new An(.31,.31,.05,12);s(h,"metal",M,x,51.43,Math.PI/2)}a.addBox(1,.8,M,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const m=new ds({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",m);const u=new Go(.62,2);c.add(u);const p=new Me(u,m);p.position.set(-30,4.6,56),i.add(p);const _=new Vn({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:en,blending:Vs});l.set("rivage-beams",_);const b=new qn(1.5,3.4,10,1,!0);c.add(b);const f=[];for(const M of[-33,-27])for(const x of[54,58]){const h=new Me(b,_);h.position.set(M,2,x),h.userData.rivageEffect="beam",i.add(h),f.push(h)}const g=[],S=new Vn({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",S);for(const[M,x,h,v,P,C,w]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const D=new We(x,h,v);c.add(D);const B=new Me(D,S);B.position.set(P,C,w),B.userData.officeVenue=M,i.add(B),g.push(B)}const T=d.map(M=>{const x=o(M);return x.emissive.set(M),x});let E=!0;return{targets:g,setEnabled(M){E=!!M},update(M,{paused:x,energySaver:h}){x||(p.rotation.y=M/18e3);const v=x||h||!E;for(const P of f)P.visible=!v;for(let P=0;P<T.length;P++)T[P].emissiveIntensity=v?.13:.2+Math.sin(M/4500+P)*.05}}}function Ig(i,t=kn.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1;const c=(m,u,p)=>Math.max(u,Math.min(p,m));function l(m,u={},p=0,_=[]){const b=c(Number(m)||0,0,.05);let f=Number(u.x)||0,g=Number(u.z)||0;r&&Date.now()>=o&&d(null);const S=Math.hypot(f,g);S>1&&(f/=S,g/=S),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const T=!!(u.boost&&S&&s),E=T?9:4.5;e.stamina=c(e.stamina+(T?-23:14)*b,0,100);const M=(Math.cos(p)*f-Math.sin(p)*g)*E,x=(-Math.sin(p)*f-Math.cos(p)*g)*E;e.vx=M,e.vz=x;const h=i.groundHeight?.(e)??-.12;e.grounded&&e.y>h+.08&&(e.grounded=!1),!e.flight&&!a&&u.jump&&!n&&(e.grounded||e.jumps<Gn.maximum_jumps)&&(e.vy=Gn.jump_speed,e.grounded=!1,e.jumps++),n=!!u.jump;const v=e.y;e.flight?(e.vy=(+!!u.jump-+!!u.descend)*Gn.flight_speed,e.y=c(e.y+e.vy*b,h,Gn.flight_maximum_y),e.grounded=!1):a?(e.y=Math.max(h,e.y-Gn.landing_speed*b),e.vy=-4,e.y<=h&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0)):e.grounded?e.y=h:(e.vy-=Gn.gravity*b,e.y=Math.min(Gn.maximum_y,e.y+e.vy*b),e.y<=h&&(e.y=h,e.vy=0,e.grounded=!0,e.jumps=0));let P=i.slide({...e,y:Math.min(v,e.y)},{x:e.x+M*b,y:e.y,z:e.z+x*b},r?.radius||.3);_.some(w=>Math.hypot(P.x-w.x,P.z-w.z)<.62&&Math.hypot(P.x-w.x,P.z-w.z)<=Math.hypot(e.x-w.x,e.z-w.z)+1e-4)&&(P={x:e.x,z:e.z});const C=Math.hypot(P.x-e.x,P.z-e.z)>1e-4;return e.x=P.x,e.z=P.z,C&&(e.yaw=Math.atan2(M,x)),e.action=e.flight?"fly":a?"land":e.grounded?C?T?"run":"walk":"idle":"jump",{...e}}function d(m,u=1/0){!m&&e.flight&&(e.flight=!1,a=!e.grounded),r=m,o=u}return{step:l,setForm:d,toggleFlight(){return r?.fly?(e.flight=!e.flight,a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e}),reset(m){e={...e,...m,vx:0,vz:0,vy:0,jumps:0,grounded:(m.y??-.12)<=(i.groundHeight?.(m)??-.12)+.01},a=!e.flight&&e.y>Gn.maximum_y,n=!1},face(m){e.yaw=Math.atan2(m.x-e.x,m.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function Ar(i,t){const e=kn.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function Lc(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(f,g,S,T,E,M=0){M&&f.rotateZ(M),f.translate(S,T,E);const x=f.index?f.toNonIndexed():f;x!==f&&f.dispose();const h=new se(g),v=new Float32Array(x.attributes.position.count*3);for(let P=0;P<v.length;P+=3)v[P]=h.r,v[P+1]=h.g,v[P+2]=h.b;x.setAttribute("color",new ln(v,3)),r.push(x)}const a=(f,g,S,T,E,M,x,h=0)=>o(new We(f,g,S),T,E,M,x,h),c=(f,g,S,T,E,M,x=f)=>o(new An(x,f,g,10),S,T,E,M),{accent:l,hair:d,motif:m,accessory:u,hairStyle:p,shirt:_}=i;if(t==="head"){if(a(.49,.16,.45,d,0,.23,-.02),a(.45,p==="long"?.72:.29,.13,d,0,p==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(p))for(const f of[-1,1])a(.09,p==="long"?.6:.33,.32,d,f*.24,-.02,-.03);if(p==="spiky")for(let f=0;f<7;f++)o(new qn(.11,.27+f%3*.06,5),d,(f-3)*.066,.39+Math.sin(f)*.025,-.06,(f-3)*-.16);if(p==="split"&&a(.245,.18,.46,l,.123,.24,-.015),p==="side"&&a(.26,.25,.05,d,-.12,.08,.218,-.18),p==="ponytail"&&a(.27,.5,.25,d,0,-.15,-.37),u.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),u==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),u==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,_,0,.395,0)),u==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const f of[-1,1])a(.06,.33,.06,"#94745a",f*.3,.64,0,f*-.3),a(.15,.055,.06,"#94745a",f*.36,.72,0)}if(u==="bamboo"){const f=new An(.052,.052,.35,10);f.rotateZ(Math.PI/2),o(f,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(u==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),u==="goggles"||u==="glasses")for(const f of[-1,1])a(.19,.12,.06,l,f*.12,u==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",f*.12,u==="goggles"?.23:.04,.271);if(u==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const f of[-1,1])a(.12,.2,.08,"#aba2a6",f*.2,.31,0,f*-.35),a(.06,.055,.025,"#84aabb",f*.14,.07,.208)}if(u==="butterfly")for(const f of[-1,1])a(.18,.17,.045,l,f*.15,.31,-.12,f*.4);if(u==="earrings")for(const f of[-1,1])a(.045,.15,.035,"#e9d6bc",f*.26,-.19,.02);if(i.id==="naruto")for(const f of[-1,1])for(let g=0;g<3;g++)a(.08,.012,.01,"#9f7055",f*.15,-.055-g*.033,.208,f*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(m)){a(.028,.53,.035,l,0,1.23,.19);for(const f of[-1,1])a(.14,.37,.04,l,f*.14,1.26,.19,f*.08);if(m==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),m==="buttons")for(let f=0;f<3;f++)a(.03,.03,.035,"#eee2ba",0,1.13+f*.12,.23)}if(m==="checks"||m==="triangles"||m==="clouds")for(let f=0;f<4;f++)for(let g=0;g<4;g++){const S=(g-1.5)*.112,T=1+f*.13;m==="checks"&&(f+g)%2===0&&a(.11,.127,.025,l,S,T,.19),m==="triangles"&&(f+g)%2===0&&o(new qn(.035,.065,3),l,S,T,.205),m==="clouds"&&f%2===0&&g%2===0&&(a(.13,.045,.03,l,S,T,.2),c(.04,.03,l,S,T+.035,.2))}if(m==="circle"&&o(new ri(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(m))if(m==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let f=0;f<3;f++)a(.32,.015,.02,"#b6a273",0,1.19+f*.07,.26)}else if(m==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(m==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(m==="butterfly"){for(const f of[-1,1])a(.12,.51,.07,l,f*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const f of[-1,1])a(.065,.52,.04,l,f*.1,1.23,.2,f*(m==="cross"?.52:.22));if(["sword","swords","backsword"].includes(u))for(let f=0;f<(u==="swords"?3:1);f++){const g=.3+f*.06;a(.055,.83,.055,"#373d4a",g,.92,-.18,-.25),a(.09,.23,.07,l,g+.1,1.4,-.18,-.25)}if(u==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(u))for(const f of[-1,1])a(u==="gauntlets"?.27:.2,.2,.24,l,f*.37,.99,.05)}const b=Wn(r,!1);return r.forEach(f=>f.dispose()),n.add(b),e.set(s,b),b}function Ng(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(rs.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const d=t.clone().add(new O(o.x*.4,l,o.z*.4));if(i.cameraLimit(t,d,n)>=.99)return d}return t.clone().add(new O(0,Math.max(s,6),0))}function Ug({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new ds({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,d,m,u,p]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"]]){let f=function(T,E,M,x,h,v,P){let C=new We(T,E,M).toNonIndexed();C.translate(x,h,v);const w=new se(P),D=new Float32Array(C.attributes.position.count*3);for(let B=0;B<D.length;B+=3)w.toArray(D,B);C.setAttribute("color",new ln(D,3)),b.push(C)};const _=new xn;_.position.set(l,-.12,d),_.userData.hospitality=u,i.add(_);const b=[];if(f(.49,.66,.32,0,1.15,0,p),f(.41,.45,.4,0,1.7,0,"#e4b492"),f(.46,.16,.45,0,1.96,-.02,m?"#51352e":"#29272d"),f(.46,m?.65:.27,.13,0,m?1.66:1.82,-.21,m?"#51352e":"#29272d"),m){for(const T of[-1,1])f(.07,.43,.29,T*.23,1.74,-.03,"#51352e"),f(.05,.025,.02,T*.13,1.65,.209,"#cf8790");f(.58,.3,.38,0,.81,0,p)}for(const T of[-1,1])f(.035,.04,.025,T*.1,1.73,.207,"#253b36"),f(.18,.65,.2,T*.14,.45,0,"#263e39"),f(.22,.13,.33,T*.14,.08,.06,"#1c2b28"),f(.16,.4,.2,T*.33,1.2,0,p),f(.15,.26,.16,T*.33,.9,.04,"#e4b492");f(.09,.025,.025,0,1.58,.21,"#b66c78"),(u==="hostess"||u==="bartender")&&(f(.3,.49,.035,0,1.02,.18,m?"#c6a971":"#253e38"),f(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),f(.1,.07,.04,0,1.44,.19,"#374941"),f(.45,.04,.3,.36,.89,.17,"#c5ab71"),f(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const g=Wn(b,!1);b.forEach(T=>T.dispose()),e.add(g);const S=new Me(g,r);S.userData.officeVenue=u==="dj"?"disco":"bar",_.add(S),a.push(S),o.push(_),t.addBox(.68,.68,l,d,"hospitality-npc",2.1),u==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,d)}return{targets:a,update(c,l){o.forEach((d,m)=>{d.rotation.y=m<2?Math.sin((l?0:c)/4500+m)*.1:0,d.children[0].position.y=l?0:Math.sin(c/1800+m)*.018})}}}const zn=(i,t,e)=>i+(t-i)*e;function Fg(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),d=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let m=r?o?.16:.06:0,u=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const p=[d,-d],_=[-d*.85,d*.85],b=[0,0];t?.action==="jump"&&(m=-.12,p.fill(.5),_.fill(-.7),u=0),t?.action==="fly"&&(m=.16,p.fill(.3),_.fill(.15),b[0]=-.12,b[1]=.12,u=0),t?.action==="land"&&(m=-.06,p.fill(.35),_.fill(-.3),u=0),a&&(m=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,u=c?.4:-.5,p.fill(c?0:-1.25),_.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(b[0]=-.3,b[1]=.3),s||(u+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(_[1]=-.8+(s?0:Math.sin(e*3)*.45),_[0]=-.3,m=.07),t?.action==="cast"&&(_[0]=t.skillPose==="beam"?-1.25:-.9,_[1]=-1.4,p[0]=-.12,p[1]=.2,m=.12),t?.action==="drink"&&(_[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(_[0]=-1),t?.action==="dance"&&(_[0]=-.8,_[1]=-.7,p[0]=s?0:Math.sin(e*2.4)*.2,p[1]=-p[0]),i.body.rotation.x=zn(i.body.rotation.x,m,l),i.body.position.y=zn(i.body.position.y,u,l),i.body.rotation.z=zn(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((g,S)=>{g.rotation.x=zn(g.rotation.x,p[S],l),g.rotation.z=zn(g.rotation.z,b[S],l)}),i.arms.forEach((g,S)=>{g.rotation.x=zn(g.rotation.x,_[S],l),g.rotation.z=zn(g.rotation.z,o?S?-.12:.12:0,l)}),i.head.rotation.x=zn(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=zn(i.head.rotation.y,0,l);const f=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(g=>g.scale.y=zn(g.scale.y,f,l)),{lying:c,moving:r}}function Og(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(d=>Math.hypot(d.x-c,d.z-l)>.65)})))return s}return null}function Dc(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(u=>Math.hypot(u.x-a.x,u.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,d=c*c+l*l;if(d&&n.some(u=>{const p=Math.max(0,Math.min(1,((u.x-t.x)*c+(u.z-t.z)*l)/d));return Math.hypot(t.x+c*p-u.x,t.z+l*p-u.z)<.62&&p>0}))continue;const m=s?Og(i,a,n):t.yaw||0;if(m!==null)return{...a,yaw:m}}return null}function Bg(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function d(M,x=!1){const h=M+x;return o.has(h)||o.set(h,new i.MeshStandardMaterial({color:M,emissive:M,emissiveIntensity:x?.55:.13,roughness:.55,metalness:.18,transparent:x,opacity:x?.78:1,depthWrite:!x})),o.get(h)}function m(M,x,h,v,P,C,w=!1){r.add(x);const D=new i.Mesh(x,d(h,w));return D.position.set(v,P,C),M.add(D),D}const u=(M,x,h,v,P,C,w,D,B=!1)=>m(M,new i.BoxGeometry(x,h,v),P,C,w,D,B),p=(M,x,h,v,P,C,w,D,B=!1)=>{const I=m(M,new i.SphereGeometry(1,10,7),D,x,h,v,B);return I.scale.set(P,C,w),I},_=(M,x,h,v,P,C,w)=>m(M,new i.ConeGeometry(x,h,5),v,P,C,w,!0),b=(M,x,h)=>{const v=new i.Group;return v.position.set(M,x,h),s.add(v),v},f=t.color,g=t.accent||"#eddbff",S=t.dark||"#36214f";if(t.model==="susanoo"){u(s,1.75,1.65,.85,f,0,3.7,0),u(s,1.1,.65,.75,f,0,2.65,0);for(let P=0;P<5;P++)for(const C of[-1,1]){const w=u(s,.74,.055,.07,g,C*.4,3.15+P*.25,.46,!0);w.rotation.z=C*.18}u(s,1.45,.24,.95,S,0,2.5,0);for(let P=0;P<5;P++){const C=P*Math.PI*2/5,w=u(s,.85,1,.16,f,Math.sin(C)*.68,2.05,Math.cos(C)*.53);w.rotation.y=C,w.rotation.z=Math.sin(C)*.12}for(const P of[-1,1]){const C=b(P*.47,1.7,0);u(C,.52,1.1,.58,f,0,-.4,0),u(C,.64,.4,.7,S,0,-.8,.04),u(C,.48,.65,.56,f,0,-1.2,0),u(C,.6,.3,.95,f,0,-1.57,.2),l.push({node:C,side:P,kind:"leg"});const w=b(P*1.08,4.25,0);u(w,.6,1.1,.65,f,0,-.45,0),u(w,.75,.35,.85,g,0,.04,0),u(w,.64,.85,.65,S,0,-1.25,0),u(w,.58,.35,.55,f,0,-1.85,.07),l.push({node:w,side:P,kind:"arm"});for(let k=0;k<3;k++)u(s,.95,.16,.85,f,P*(1.03+k*.05),4.38-k*.17,0);const D=b(P*.72,4.35,-.43);D.userData.wingSide=P,a.push(D);const B=u(D,2.2,.24,.23,g,P*1,1.02,-.1,!0);B.rotation.z=P*.48;for(let k=0;k<3;k++)for(let U=0;U<(n?5:8);U++){const V=u(D,.48,1.2+k*.3,.12,f,P*(.55+U*.37),.75-k*.56+U*.12,-.12-k*.04,!0);V.rotation.z=-P*.55}const I=_(D,.16,.55,g,P*2.2,1.7,-.1);I.rotation.z=-P*.8}const M=b(0,5.05,.02);u(M,.76,.85,.7,f,0,0,0),u(M,.53,.25,.45,S,0,-.25,.25);for(const P of[-1,1]){const C=u(M,.22,.07,.08,"#fff89e",P*.18,.04,.4,!0);C.rotation.z=-P*.25;const w=_(M,.17,.95,f,P*.42,.55,0);w.rotation.z=-P*.38}const x=_(M,.16,.63,g,0,-.02,.58);x.rotation.x=Math.PI/2;const h=u(M,.18,.22,.05,"#e7abff",0,.29,.39,!0);h.rotation.z=Math.PI/4;for(let P=-2;P<=2;P++){const C=_(M,.16,.8+Math.abs(P)*.1,f,P*.16,.85,-.08);C.rotation.z=-P*.15}const v=b(-1.15,2.28,.18);u(v,.14,.8,.14,S,0,0,0),u(v,.7,.1,.25,g,0,-.15,0),u(v,.24,2.4,.08,g,0,-1.4,0,!0),v.rotation.z=-.5,e==="itachi"&&(a.forEach(P=>P.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){p(s,0,2.1,-.12,1,1.35,.75,f),p(s,0,3.52,.35,.82,.78,.65,f),p(s,0,3.27,.98,.5,.27,.5,g),p(s,0,3.45,1.31,.19,.13,.13,S);for(const M of[-1,1]){const x=_(s,.39,1.3,f,M*.58,4.3,.14);x.rotation.z=-M*.22,u(s,.27,.1,.09,"#fff5c2",M*.38,3.66,.95,!0),u(s,.045,.14,.045,"#b93237",M*.38,3.66,1.01,!0);const h=u(s,.39,.1,.06,S,M*.48,3.56,.92);h.rotation.z=M*.4;const v=_(s,.08,.25,"#fff2c8",M*.23,3.11,1.18);v.rotation.z=Math.PI;for(let w=0;w<3;w++){const D=u(s,.65,.035,.04,S,M*.62,3.3-w*.12,1.02);D.rotation.z=M*(w-1)*.15}const P=b(M*.9,2.85,.1);p(P,0,-.4,.15,.33,.78,.35,f),p(P,0,-1.04,.33,.43,.22,.44,g),l.push({node:P,side:M,kind:"arm"});const C=b(M*.52,1.1,-.05);p(C,0,-.35,0,.4,.7,.4,f),p(C,0,-.85,.25,.5,.25,.6,g),l.push({node:C,side:M,kind:"leg"});for(let w=0;w<3;w++)_(P,.08,.28,S,(w-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let M=0;M<9;M++){const x=(M-4)*.42,h=b(Math.sin(x)*.25,1.6,-.6);h.rotation.y=x,h.userData.tailIndex=M;const v=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(B=>new i.Vector3(...B))),P=14,C=7,w=new i.TubeGeometry(v,P,.4,C,!1),D=w.attributes.position;for(let B=0;B<=P;B++){const I=v.getPointAt(B/P),k=1-.93*Math.pow(B/P,1.5);for(let U=0;U<=C;U++){const V=B*(C+1)+U,at=new i.Vector3().fromBufferAttribute(D,V).sub(I).multiplyScalar(k).add(I);D.setXYZ(V,at.x,at.y,at.z)}}w.computeVertexNormals(),m(h,w,f,0,0,0,!0),c.push(h)}}else{if(t.model==="saiyan")for(let M=0;M<9;M++){const x=M*Math.PI*2/9,h=_(s,.13,.7,f,Math.sin(x)*.2,2.03,Math.cos(x)*.17);h.rotation.z=-Math.sin(x)*.7,h.rotation.x=Math.cos(x)*.6}if(t.model==="gear5"){for(let M=0;M<7;M++)p(s,Math.sin(M)*.2,1.91+Math.cos(M)*.07,Math.cos(M)*.13,.19,.16,.19,"#fff9ef");for(const M of[-1,1])for(let x=0;x<6;x++)p(s,M*(.35+x*.08),1.2+Math.sin(x)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const M=_(s,.12,.6,g,.19,1.96,.09);M.rotation.z=-.25;for(let x=0;x<6;x++){const h=u(s,.04,.12,.03,S,Math.sin(x)*.23,1.02+x*.09,.2);h.rotation.z=x*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),p(s,0,1.05,0,.42,.5,.29,f);for(const M of[-1,1]){const x=u(s,.06,.65,.06,g,M*.38,1.9,0);x.rotation.z=-M*.5}}if(t.model==="slayer")for(let M=0;M<8;M++){const x=_(s,.12,.5,f,Math.sin(M)*.42,.3+M*.14,Math.cos(M)*.35);x.rotation.z=Math.sin(M)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let M=0;M<8;M++){const x=u(s,.04,.38,.04,t.model==="icefire"&&M%2?"#ff9366":f,Math.sin(M)*.4,.35+M*.17,Math.cos(M)*.28,!0);x.rotation.z=M%2?.5:-.5}}const T=m(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),f,0,.06,0,!0);T.rotation.x=-Math.PI/2;function E(M){for(const h of[...M.children])h.isGroup&&E(h);const x=new Map;for(const h of[...M.children])if(h.isMesh){h.updateMatrix();const v=h.geometry.index?h.geometry.toNonIndexed():h.geometry.clone();v.applyMatrix4(h.matrix),x.has(h.material)||x.set(h.material,[]),x.get(h.material).push(v),M.remove(h),h.geometry.dispose(),r.delete(h.geometry)}for(const[h,v]of x){const P=Wn(v,!1);v.forEach(C=>C.dispose()),r.add(P),M.add(new i.Mesh(P,h))}}return E(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(M,{flying:x=!1,moving:h=!1}={}){const v=n?0:M;a.forEach((P,C)=>{P.rotation.y=(C?1:-1)*(x?.18+Math.sin(v*3)*.2:1.25+Math.sin(v*1.3)*.04)}),c.forEach((P,C)=>{P.rotation.y=(C-4)*.42+Math.sin(v*1.8+C*.6)*.09,P.rotation.x=.12+Math.cos(v*1.2+C)*.09}),l.forEach(({node:P,side:C,kind:w})=>{P.rotation.x=x?w==="leg"?.3:-.25:h?Math.sin(v*7+(C<0?Math.PI:0))*(w==="leg"?.3:-.2):0})},dispose(){r.forEach(M=>M.dispose()),o.forEach(M=>M.dispose()),s.clear()}}}function zg({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r!==null){for(const[d,m]of c)d.visible=m;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog,e.position.copy(a.position),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}}return{set(d,m){if(d===r){o=m;return}l(),!(d===null||!m)&&(a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=d,o=m,t.interior(d),i.background=s,i.fog=null,n.minDistance=1.7,n.maxDistance=8,n.target.copy(m.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const d of i.children)c.has(d)||c.set(d,d.visible),d.visible=!!(d.isLight||d===o||d.userData.residenceLayer||d.userData.officeAbility===r||d.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function kg({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},rendererFactory:c=m=>new eu(m),controlsFactory:l=(m,u)=>new rg(m,u),getDate:d=()=>new Date}){const m=new Sh,u=new yn(36,1,.1,1200),p=c({antialias:!0,alpha:!1,powerPreference:"low-power"});p.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),p.outputColorSpace=rn,p.toneMapping=wo,p.toneMappingExposure=1.18,i.append(p.domElement);const _=l(u,p.domElement);_.enableDamping=!0,_.dampingFactor=.09,_.minDistance=8,_.maxDistance=650,_.minPolarAngle=.32,_.maxPolarAngle=1.28,_.target.set(0,0,0),_.enablePan=!0,_.panSpeed=.7,_.rotateSpeed=.55,_.enableKeys=!1;const b=new Bh("#fbf3dc","#526c61",2.8);m.add(b);const f=new Ca("#fff1cf",3.2);f.position.set(-12,25,15),m.add(f);const g=new Ca("#cce5ef",1.1);g.position.set(15,10,-10),m.add(g);const S=new Map,T=new Map,E=new Set,M=new Set,x=new Map,h=Pg(),v=hu({THREE:wc,scene:m,navigation:h,reduced:()=>Gt||it,createModel:(y,L)=>Bg(wc,y,{...L,reduced:Gt||it})}),P={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function C(y){return S.has(y)||S.set(y,new ds({color:P[y]||y,roughness:y==="metal"?.4:.82,metalness:y==="gold"?.45:.02,...y==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:en}:{}})),S.get(y)}const w=new We(1.1,.035,2.2);E.add(w);const D=new rl(w,C("#c9b384"),24);D.instanceMatrix.setUsage(Qa),D.count=0,D.frustumCulled=!1,m.add(D),D.userData.officeRestMats=!0;const B=new me,I=new dn;function k(y,L,F,X,W,tt=0,q=0,Mt=0){let te=y;y.index&&(te=y.toNonIndexed(),y.dispose()),I.setFromEuler(new Un(tt,q,Mt)),te.applyMatrix4(new me().compose(new O(F,X,W),I,new O(1,1,1))),T.has(L)||T.set(L,[]),T.get(L).push(te)}function U(y,L,F,X,W,tt,q,Mt=.035,te=0){k(Mt>0?new Eo(y,L,F,1,Math.min(Mt,y/3,L/3,F/3)):new We(y,L,F),q,X,W,tt,0,te)}function V(y,L,F,X,W,tt,q=y){k(new An(q,y,L,12),tt,F,X,W)}function at(y,L,F,X,W,tt,q){const Mt=new gi(1,10,7);Mt.scale(y,L,F),k(Mt,q,X,W,tt)}function $(y,L,F=1){h.addBox(.85*F,.85*F,y,L,"plant",2*F),V(.4*F,.7*F,y,.35*F,L,"pot",.31*F),V(.045*F,1.4*F,y,1.2*F,L,"oak");for(let X=0;X<5;X++){const W=X*2.4;at(.48*F,.52*F,.25*F,y+Math.cos(W)*.3*F,(1.4+X*.15)*F,L+Math.sin(W)*.25*F,X%2?"leaf":"lightLeaf")}}function j(y,L,F,X,W,tt,q="#f2e8d5",Mt=0){const te=document.createElement("canvas");te.width=768,te.height=192;const re=te.getContext("2d");re.clearRect(0,0,768,192),re.fillStyle=q,re.textAlign="center",re.font="500 66px Georgia",re.fillText(y,384,88),re.font="20px Arial",re.fillText(L,384,139);const It=new Ra(te);It.colorSpace=rn,M.add(It);const ht=new Vn({map:It,transparent:!0,depthWrite:!1,side:en}),et=new ai(F,F/4);E.add(et);const kt=new Me(et,ht);kt.position.set(X,W,tt),kt.rotation.y=Mt,m.add(kt),S.set(`sign-${y}`,ht)}U(86,.6,96,0,-.94,28,"base",.3),U(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),U(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const y of[-1,1]){U(54,.04,4,y*70,-.17,20,"#e6dfcc",0),U(4,.04,55,y*87,-.17,45,"#e6dfcc",0);for(let L=-20;L<92;L+=8)V(.08,1.1,y*99,.35,L,"wood"),U(.08,.08,8,y*99,.7,L+4,"wood",0);for(const L of[34,58,80])U(3,.4,.9,y*92,.05,L,"wood",.06),h.addBox(3,.9,y*92,L,"trail-bench",.7),$(y*80,L,1);j("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,y*58,1.7,18)}h.addBox(160,40,0,97,"water-boundary",.1),h.configureHomes(!0);for(const y of[-99,99])h.addBox(.2,114,y,35,"scenic-fence",1.2);h.addBox(202,.2,0,91,"scenic-boundary",1.2),U(85,.07,18,0,-.43,67,"#e4cfa5",.1),U(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let y=0;y<8;y++)U(120-y*8,.02,.13,0,-.57,79+y*2.8,"#c4ddd4",0);U(7,.07,24,0,-.4,60,"#e6dfcc",.1);const ct=Dg({scene:m,box:U,cylinder:V,orb:at,bake:k,sign:j,material:C,navigation:h,ownedGeometries:E,materials:S}),St=Ug({scene:m,navigation:h,ownedGeometries:E,materials:S,sign:j});for(let y=0;y<8;y++){const L=-36+y*3.7;U(1.5,.25,2.8,L,-.1,67,"white",.1),U(1.4,.17,1,L,.26,66,"sofa",.08),h.addBox(1.5,2.8,L,67,"beach-chair",.6),y%2===0&&(V(.05,3,L+1.2,1,65,"gold"),k(new qn(1.8,.6,10),"white",L+1.2,2.7,65),h.addBox(.2,.2,L+1.2,65,"parasol",2.8))}U(19,.15,10,22,-.3,65,"wood",.1),j("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const y of[16,22,28])V(1.2,.13,y,.8,63,"white"),V(.1,1,y,.2,63,"gold"),h.addBox(2.4,2.4,y,63,"terrace-table",.9);for(const y of[-10,-6,-2]){$(y,58,.9);for(let L=0;L<4;L++)at(.15,.2,.15,y+(L-1.5)*.3,.9,58,"#c18b9c")}U(83,.08,4,0,-.44,20,"#e6dfcc",.12),U(6,.08,64,0,-.44,16,"#e6dfcc",.1),U(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const y of[-41,41])for(const L of[-15,-2,14,31,46])$(y,L,1.7),V(.08,3.2,y+(y<0?1:-1),1.15,L+2,"gold"),at(.22,.25,.22,y+(y<0?1:-1),2.85,L+2,"white");const wt=[];function nt(y,L,F,X){h.addBox(F,.12,y,L,"net",X);for(const W of[-F/2,F/2])V(.055,X,y+W,X/2,L,"white");for(let W=.3;W<=X;W+=.22)U(F,.018,.025,y,W,L,"white",0);for(let W=-F/2;W<=F/2;W+=.4)U(.012,X-.3,.018,y+W,(X+.3)/2,L,"white",0)}function pt(y,L,F=.16){const X=new gi(F,10,8);E.add(X);const W=new Me(X,C(L));W.userData.officeBall=y.id,m.add(W),wt.push({mesh:W,game:y})}for(const y of wi){const{x:L,z:F,id:X}=y;if(h.addBox(6,.14,L,F-(y.kind==="court"?6:4.2),"sign",1.2),U(y.kind==="court"?17:10,.12,y.kind==="court"?13:9,L,-.29,F,X==="tennis"?"#a77355":X==="badminton"?"#3b7e77":X==="basketball"?"#b99569":"#dce0ca",.14),U(6,1.1,.12,L,.65,F-(y.kind==="court"?6:4.2),"deep"),j(y.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,L,.75,F-(y.kind==="court"?5.91:4.11)),X==="tennis"||X==="badminton"||X==="basketball"){for(const W of[-7,7])U(.045,.015,10.8,L+W,-.21,F,"white",0);for(const W of[-5.4,0,5.4])U(14,.015,.045,L,-.21,F+W,"white",0);if(X!=="basketball"){for(const W of[-5.7,5.7])U(.035,.015,10.8,L+W,-.2,F,"white",0);nt(L,F,14,X==="badminton"?1.7:1.15),pt(y,X==="tennis"?"#d9e56b":"white",X==="tennis"?.17:.12)}else{for(const W of[-1,1]){V(.09,3.6,L,1.5,F+W*5,"metal"),U(2.3,1.35,.13,L,3.1,F+W*4.7,"white");const tt=new ri(.43,.045,6,20);k(tt,"#c67543",L,2.8,F+W*4.1,Math.PI/2)}pt(y,"#bd6c32",.25)}}else if(X==="golf"){for(const W of[-6.5,6.5])h.addBox(.2,8,L+W,F,"golf-edge",.5);U(13,.12,8,L,-.15,F,"#69885c",.15);for(const W of[-6.5,6.5])U(.2,.35,8,L+W,-.05,F,"woodLight");for(let W=0;W<3;W++)V(.22,.02,L-4+W*4,-.07,F+(W%2?2:-2),"black"),V(.025,1.5,L-4+W*4,.65,F+(W%2?2:-2),"gold"),U(.8,.4,.03,L-3.6+W*4,1.25,F+(W%2?2:-2),"#c78362");pt(y,"white",.12)}else if(X==="bowling"){for(const W of[-2.7,2.7])h.addBox(.35,11,L+W,F,"bowling-edge",.4);U(5,.09,11,L,-.13,F,"woodLight");for(const W of[-2.7,2.7])U(.35,.12,11,L+W,-.1,F,"oak");for(let W=0;W<4;W++)for(let tt=0;tt<=W;tt++){const q=L+(tt-W/2)*.55,Mt=F-2-W*.5;V(.14,.5,q,.17,Mt,"white",.08),at(.13,.14,.13,q,.49,Mt,"white")}pt(y,"#786397",.28)}else if(X==="arcade")for(const W of[-2.2,2.2]){h.addBox(2.1,1.6,L+W,F,"arcade",2.5),h.addBox(1.2,1.2,L+W,F+2,"seat",.7),U(2.1,2.6,1.6,L+W,1.1,F,"deep",.1),U(1.6,1.1,.05,L+W,1.7,F+.83,"screen");for(let tt=0;tt<5;tt++)U(.05,.6,.02,L+W+(tt-2)*.2,1.7,F+.87,tt%2?"#e8c877":"screenLine",0);V(.18,.06,L+W,.9,F+1.1,"gold"),U(1.2,.45,1.2,L+W,.2,F+2,"sofa",.1)}else if(X==="archery"){h.addBox(5,.3,L,F-2,"archery-backstop",3.2),U(5,3.2,.25,L,1.2,F-2,"wood");for(let W=0;W<5;W++){const tt=new An(1.1-W*.21,1.1-W*.21,.03,24);k(tt,["white","#283e49","#73a7bf","#c36f60","gold"][W],L,1.6,F-1.82+W*.035,Math.PI/2)}U(5,.02,.12,L,-.18,F+2.8,"white",0)}else if(X==="darts"){h.addBox(5,.22,L,F-1.8,"dart-board",2.8),U(5,3,.22,L,1.25,F-1.8,"deep");for(let W=0;W<4;W++){const tt=new An(1.05-W*.23,1.05-W*.23,.025,24);k(tt,W%2?"white":"#bf6f59",L,1.6,F-1.64+W*.025,Math.PI/2)}}else{h.addBox(5.5,3.5,L,F,"game-table",1.3),U(5.5,.25,3.5,L,1,F,X==="pingpong"?"#4c7783":X==="billiards"?"#376a59":"woodLight",.1);for(const W of[-2.2,2.2])for(const tt of[-1.2,1.2])U(.18,1.1,.18,L+W,.4,F+tt,"oak");if(X==="pingpong"&&(nt(L,F,5.5,1.45),pt(y,"white",.1)),X==="uno")for(let W=0;W<16;W++){const tt=W%4;U(.32,.035,.48,L+(tt<2?-1.7+W%4*.3:1.4),1.16+W*.002,F+(tt%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][W%4],.02,W*.3)}if(X==="chess")for(let W=0;W<8;W++)for(let tt=0;tt<8;tt++)U(.34,.02,.34,L+(W-3.5)*.34,1.14,F+(tt-3.5)*.34,(W+tt)%2?"deep":"white",0),(tt<2||tt>5)&&V(.075,.17,L+(W-3.5)*.34,1.24,F+(tt-3.5)*.34,tt<2?"white":"black");if(X==="billiards")for(let W=0;W<10;W++)at(.12,.12,.12,L+Math.sin(W*2)*1.8,1.25,F+Math.cos(W)*.9,["gold","white","deep"][W%3]);if(X==="foosball")for(let W=0;W<5;W++){U(.045,.045,4.5,L-2+W,1.4,F,"metal",0);for(const tt of[-1,0,1])U(.2,.45,.18,L-2+W,1.48,F+tt,W%2?"#ba7864":"deep")}for(const W of[-1,1])U(4,.35,.8,L,.28,F+W*3.8,"sofa",.1),h.addBox(4,.8,L,F+W*3.8,"bench",.5)}}U(40.5,.6,28,0,-.6,0,"base",.22),U(39.8,.22,27.3,0,-.2,0,"edge",.1),U(39.4,.18,26.9,0,-.04,0,"floor",.08),U(37.8,.04,13.5,0,.07,-5.8,"stone",.05),U(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),U(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let y=-18;y<19;y+=1.9)U(.015,.015,12.4,y,.14,-5.8,"#c3cfbf",0);U(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),U(39.4,.22,.5,0,4.8,-13.25,"gold"),U(8,4.8,.18,0,2.35,-13.02,"deep");for(let y=0;y<21;y++)U(.06,4.6,.1,-3.8+y*.38,2.35,-12.87,"wood",.01);U(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),j("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const y of[-15,-10,10,15]){U(4.1,2.9,.15,y,2.6,-13,"glass"),U(4.2,.08,.23,y,4.08,-12.85,"gold"),U(4.2,.12,.3,y,1.12,-12.85,"woodLight");for(const L of[-2,0,2])U(.055,2.9,.2,y+L,2.6,-12.86,"gold",0)}U(.13,2.8,10.8,0,1.55,-6.4,"glass"),U(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const y of[-11.8,-6.4,-1])U(.08,2.9,.08,0,1.5,y,"gold",0);U(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),U(.22,.08,25.7,-19.5,2.8,-.1,"gold"),U(.2,2.7,25.7,19.5,1.4,-.1,"glass"),U(.22,.08,25.7,19.5,2.8,-.1,"gold"),j("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),j("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function Rt(y,L,F){h.addBox(2.6,1.28,y,L,"desk",2.3),U(2.6,.15,1.28,y,1.31,L,"woodLight",.08);for(const X of[-1.03,1.03])U(.09,1.17,1.02,y+X,.66,L,"white"),U(.45,.08,.94,y+X,.15,L,"metal");U(1,.66,.08,y,1.91,L-.22,"metal"),U(.9,.54,.02,y,1.92,L-.166,"screen");for(let X=0;X<3;X++)U(.28+X*.12,.024,.025,y-.14+X*.04,2.03-X*.1,L-.149,"screenLine",0);V(.07,.25,y,1.48,L-.2,"metal"),U(.45,.035,.25,y,1.405,L-.19,"metal"),U(.71,.035,.24,y,1.42,L+.32,"white"),V(.09,.18,y+.9,1.49,L+.12,"deep"),U(.64,.17,.64,y,.66,L+1.02,F==="umum"?"sofa":"teal",.1),U(.65,.7,.12,y,1.08,L+1.33,F==="umum"?"sofa":"teal",.09),V(.055,.5,y,.35,L+1.05,"metal"),U(.8,.06,.14,y,.15,L+1.05,"metal"),U(.14,.06,.8,y,.15,L+1.05,"metal")}const Lt={umum:[],operasional:[]};for(const y of["umum","operasional"])for(let L=0;L<4;L++)for(let F=0;F<4;F++){const X=(y==="umum"?-15:3.4)+F*3.75,W=-10.3+L*3.15;Lt[y].push([X,.18,W+1.03]),Rt(X,W,y)}for(const y of[-18.5,18.5]){U(.7,2.4,4.7,y,1.25,-8.4,"wood");for(let L=0;L<3;L++){U(.86,.06,4.8,y,.65+L*.69,-8.4,"gold");for(let F=0;F<8;F++)U(.5,.38+F%2*.12,.18,y,.88+L*.69,-10.3+F*.5,F%2?"white":"deep")}}U(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const y of[4.7,8,11.3]){U(15.8,.45,1.05,-8.7,.57,y,"sofa",.16),U(15.8,.9,.25,-8.7,.91,y-.62,"sofa",.12);for(let L=0;L<8;L++)U(1.72,.17,.95,-15.8+L*2.02,.86,y,L%3===0?"pillow":"sofa",.1);for(const L of[-16.7,-.7])U(.25,.68,1.35,L,.8,y,"sofa",.1)}for(const y of[-11.5,-5]){U(2.7,.13,1.2,y,.64,6.6,"woodLight",.12);for(const L of[-.9,.9])V(.05,.48,y+L,.37,6.6,"gold");V(.16,.22,y+.4,.81,6.6,"white")}U(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const y of[-11.5,-6.5])V(.04,.5,y,.32,2.85,"gold");j("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),U(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),U(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),U(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let y=0;y<23;y++)U(.055,1.15,.07,7.9+y*.4,.78,2.26,"woodLight",.01);U(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),U(.8,.55,.05,15.3,1.9,1.94,"black"),V(.18,.24,14.1,1.64,1.5,"white"),V(.18,.24,13.6,1.64,1.5,"white"),j("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const y of[8,13.8])for(const L of[5.1,9.7]){V(1.45,.12,y,1.05,L,"woodLight"),V(.13,.92,y,.55,L,"gold"),V(.68,.08,y,.12,L,"gold");for(const F of[-1.6,1.6])V(.42,.14,y+F,.67,L,"deep"),V(.055,.55,y+F,.34,L,"gold");V(.18,.22,y+.4,1.22,L,"white"),V(.22,.04,y-.3,1.14,L+.2,"white")}for(const[y,L,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])$(y,L,F);h.addBox(39.4,.32,0,-13.25,"wall",4.8),h.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const y of[-19.5,19.5])h.addBox(.2,25.7,y,-.1,"glass-wall",2.8);for(const y of[4.7,8,11.3])h.addBox(16.1,1.5,-8.7,y,"sofa",1.4);h.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),h.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const y of[8,13.8])for(const L of[5.1,9.7])h.addBox(2.9,2.9,y,L,"cafe-table",1.3);for(const y of[-18.5,18.5])h.addBox(.9,4.8,y,-8.4,"shelf",2.6);for(const y of[-11.5,-5])h.addBox(2.7,1.2,y,6.6,"lounge-table",.8);for(const[y,L]of T){const F=Wn(L,!1);L.forEach(X=>X.dispose()),F&&(E.add(F),m.add(new Me(F,C(y))))}T.clear();const ut=Ag({scene:m,material:C,ownedGeometries:E}),Ot=zg({scene:m,residences:ut,camera:u,controls:_,background:new se("#182c2a")}),ye=Lg({scene:m,materials:S,ownedGeometries:E,sun:f,hemi:b,fill:g,navigation:h}),Wt=document.createElement("canvas");Wt.width=Wt.height=128;const fe=Wt.getContext("2d"),_e=fe.createRadialGradient(64,64,7,64,64,64);_e.addColorStop(0,"#16382f35"),_e.addColorStop(1,"#16382f00"),fe.fillStyle=_e,fe.fillRect(0,0,128,128);const oe=new Ra(Wt);M.add(oe);const At=new ai(66,49);E.add(At);const qt=new Vn({map:oe,transparent:!0,depthWrite:!1});S.set("shadow",qt);const le=new Me(At,qt);le.rotation.x=-Math.PI/2,le.position.y=-.98,m.add(le);const Xt=new Map,ge=new Map;function xe(y){if(ge.has(y))return ge.get(y);const L=[];if(y==="archery"){const X=new ri(.34,.025,5,16,Math.PI);X.rotateZ(-Math.PI/2),L.push(X.toNonIndexed()),X.dispose();const W=new We(.035,.035,.85);W.translate(0,0,.1),L.push(W.toNonIndexed()),W.dispose()}else{const X=new An(.017,.03,y==="billiards"?1.65:1,6);X.rotateX(Math.PI/2),L.push(X.toNonIndexed()),X.dispose()}const F=Wn(L,!1);return L.forEach(X=>X.dispose()),E.add(F),ge.set(y,F),F}function ne(y,L,F,X,W){const tt=L+F.join(":");if(!Xt.has(tt)){const Mt=L==="sphere"?new gi(F[0],10,8):new Eo(...F,1,.06);Xt.set(tt,Mt),E.add(Mt)}const q=new Me(Xt.get(tt),C(X));return q.position.set(...W),y.add(q),q}const Ce=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],Fe=new Map,H=new ds({vertexColors:!0,roughness:.8});S.set("costume-vertex",H);function Ze(y){const L=new xn;m.add(L);const F=bl(y.avatar),X=pu(F.costume),W=(X?.style||F.style)==="feminine",tt=X?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||Ce[y.id%Ce.length],q=new xn;L.add(q);const Mt={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],te=F.hair==="hijab"?tt:"#352c32";if(ne(q,"box",[W?.43:.5,.65,.33],tt,[0,1.17,0]).userData.avatarCloth=!0,!X&&F.outfit==="blazer"){ne(q,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Le of[-1,1]){const Ue=ne(q,"box",[.07,.32,.035],"gold",[Le*.12,1.33,.19]);Ue.rotation.z=Le*.25}}!X&&F.outfit==="sport"&&ne(q,"box",[.32,.055,.02],"white",[0,1.3,.18]);const re=!X&&F.outfit==="dress"?ne(q,"box",[.6,.4,.44],tt,[0,.79,0]):null,It=new xn;if(It.position.y=1.69,q.add(It),ne(It,"box",[.43,.46,.4],Mt,[0,0,0]),X){const Le=new Me(Lc(X,"head",Fe,E),H),Ue=new Me(Lc(X,"body",Fe,E),H);Le.userData.costumePart="head",Ue.userData.costumePart="body",It.add(Le),q.add(Ue)}else{const Le="hair:"+F.hair;if(!Xt.has(Le)){const Ue=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const Ai of[-1,1])Ue.push([.09,F.hair==="bob"?.4:.53,.32,Ai*.235,-.01,-.03]);const Hi=Ue.map(([Ai,iu,su,ru,ou,au])=>{const qo=new We(Ai,iu,su);qo.translate(ru,ou,au);const lu=qo.toNonIndexed();return qo.dispose(),lu}),Vi=Wn(Hi,!1);Hi.forEach(Ai=>Ai.dispose()),Xt.set(Le,Vi),E.add(Vi)}It.add(new Me(Xt.get(Le),C(te)))}if(!X&&F.hair==="ponytail"&&ne(It,"box",[.24,.53,.22],te,[0,-.02,-.35]),!X&&F.hair==="hijab"&&ne(q,"box",[.58,.18,.43],te,[0,1.44,-.04]),!Xt.has("eyes")){const Le=[-.095,.095].map(Hi=>{const Vi=new We(.035,.045,.025);Vi.translate(Hi,.035,.205);const Ai=Vi.toNonIndexed();return Vi.dispose(),Ai}),Ue=Wn(Le,!1);Le.forEach(Hi=>Hi.dispose()),Xt.set("eyes",Ue),E.add(Ue)}const ht=new Me(Xt.get("eyes"),C("#263833"));It.add(ht);const et=[ht];if(ne(It,"box",[.09,.02,.025],W?"#b96f78":"#9c6d58",[0,-.105,.21]),W)for(const Le of[-.14,.14])ne(It,"box",[.065,.025,.02],"#d39589",[Le,-.065,.21]);if(F.accessory==="glasses"){for(const Le of[-1,1])ne(It,"box",[.15,.11,.025],"gold",[Le*.105,.04,.224]),ne(It,"box",[.11,.07,.025],Mt,[Le*.105,.04,.24]);ne(It,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){ne(It,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Le of[-1,1])ne(It,"box",[.12,.2,.18],"deep",[Le*.28,.07,0])}const kt=[];for(const Le of[-.34,.34]){const Ue=new xn;Ue.position.set(Le,1.42,0),q.add(Ue),ne(Ue,"box",[.17,.4,.2],tt,[0,-.19,0]).userData.avatarCloth=!0,ne(Ue,"box",[.15,.27,.16],Mt,[0,-.45,.05]),kt.push(Ue)}const Te=[],$t=[];for(const Le of[-.14,.14]){const Ue=new xn;Ue.position.set(Le,.83,0),q.add(Ue),ne(Ue,"box",[.18,.64,.2],X?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,$t.push(ne(Ue,"box",[.23,.14,.34],X?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),Te.push(Ue)}const Yt=ne(kt[1],"sphere",[.12],"white",[0,-.49,.14]),Re=ne(kt[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),Ne=new xn;kt[1].add(Ne),Ne.position.set(0,-.48,.16),ne(Ne,"box",[.04,.44,.05],"gold",[0,-.14,0]);const ze=new ri(.24,.025,6,16);E.add(ze),Ne.add(new Me(ze,C("white"))),Ne.rotation.x=Math.PI/2;const ce=new Me(xe("billiards"),C("gold"));ce.position.set(0,-.48,.35),kt[1].add(ce),ce.visible=!1;const mn=new Ks(.5,.59,24);E.add(mn);const hi=new Vn({color:"#c5a061",side:en});S.set(`ring-${y.id}`,hi);const nn=new Me(mn,hi);nn.rotation.x=-Math.PI/2,nn.position.y=.02,L.add(nn),nn.visible=!1;const Zt=document.createElement("button");Zt.type="button",Zt.className="vo-avatar-label",Zt.setAttribute("aria-pressed","false");const hn=document.createElement("i"),Kn=document.createElement("span"),ki=document.createElement("small");Zt.append(hn,Kn,ki),t.append(Zt);const Ti=document.createElement("span");return Ti.className="vo-speech",Ti.hidden=!0,Zt.append(Ti),Zt.addEventListener("click",()=>e(y.id)),L.traverse(Le=>{Le.isMesh&&(Le.userData.personId=y.id)}),{group:L,body:q,head:It,arms:kt,legs:Te,shoes:$t,eyes:et,skirt:re,cup:Yt,plate:Re,racket:Ne,tool:ce,bubble:Ti,label:Zt,dot:hn,name:Kn,icon:ki,ring:nn,person:y,appearance:JSON.stringify(y.avatar),privateGeometry:ze,target:new O,phase:y.id*1.75}}let ie=null,Gt=!1,bt=!0,Se=!1,Bt=null,Kt=0,N=0,A=null,Z=[],dt=null,st=null,mt="orbit",xt=null,it=!1,ot={};const yt=new Map,z=new Map;let rt=null,Y=null,_t=null,lt=null,vt={},Vt=a,Qt=null,gt=()=>!1,Dt=null,Ut=null,ft=null,de=null,Pe=!1,vn=null,bi=!1,ci=null;const Qs=new Ks(1.2,1.4,32);E.add(Qs);const _s=new Vn({color:"#e9be69",side:en,transparent:!0,opacity:.85});S.set("pilot-guide",_s);const Fn=new Me(Qs,_s);Fn.rotation.x=-Math.PI/2,Fn.visible=!1,Fn.userData.pilotGuide=!0,m.add(Fn);const Qe=new Map,Gi=[],xs={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},De=new O,Be=new O;let He=!1;function pn(y){Y&&_t&&!y.some(ht=>ht.id===Y)&&(y=[...y,{..._t,home_slot:ft?.slot??_t.home_slot}]),h.configureHomes(!0,Pe?ft?.slot:null,Math.max(vn??0,y.length,...y.map(ht=>(ht.home_slot??-1)+1))),Z=y,ut.sync(y),ye.extent(ut.bounds().back);const L=y.map(ht=>{if(!st?.connected||!st.room||![st.room.from,st.room.to].includes(ht.id)){const et=y.find(kt=>kt.is_me)?.id;return st&&!st.connected&&(ht.id===et||ht.meeting_with===et)?{...ht,meeting_with:null,meeting_spot:null}:ht}return{...ht,state:"online",meeting_with:st.room.from===ht.id?st.room.to:st.room.from,meeting_spot:st.room.spot}}),F=ht=>ht.id===ie||ht.id===xt||ht.is_me||rt&&[rt.from,rt.to].includes(ht.id),X=[...L].sort((ht,et)=>+!!F(et)-+!!F(ht)||+!!et.meeting_with-+!!ht.meeting_with||{online:0,idle:1,offline:2}[ht.state]-{online:0,idle:1,offline:2}[et.state]||ht.id-et.id),W=[],tt={umum:0,operasional:0},q=[],Mt=new Map;let te=0,re=0;for(const ht of X){if(W.length>=24)break;ht.state==="online"&&tt[ht.department]>=16||(W.push(ht),ht.state==="online"&&tt[ht.department]++)}const It=new Set(W.map(ht=>ht.id));for(const[ht,et]of x)(!It.has(ht)||et.appearance!==JSON.stringify(W.find(kt=>kt.id===ht)?.avatar))&&(v.forget(ht),m.remove(et.group),et.label.remove(),et.ring.geometry.dispose(),E.delete(et.ring.geometry),et.privateGeometry.dispose(),E.delete(et.privateGeometry),et.ring.material.dispose(),S.delete(`ring-${ht}`),x.delete(ht));tt.umum=tt.operasional=0;for(const ht of W){let et=x.get(ht.id),kt=!et;et||(et=Ze(ht),x.set(ht.id,et));const Te=et.game?.id,$t=et.pose,Yt=et.home?.clone(),Re=ht.in_office===!1&&ht.state!=="offline",Ne=Re?null:Qe.get(ht.id)||ht.pilot,ze=ht.id===Y&&lt?lt.state():Ne;et.person=ht,et.pose=fu(ht,d());let ce;et.game=du(ht,d());const mn=Re?null:yt.get(ht.id)||ht.recreation,hi=!Re&&rt&&rt.status!=="pending"&&[rt.from,rt.to].includes(ht.id);hi?(et.game=wi.find(Zt=>Zt.id===rt.kind)||et.game,et.pose="playing"):mn?.kind==="game"&&mn.until>Date.now()/1e3&&ht.state!=="offline"&&(et.game=wi.find(Zt=>Zt.id===mn.destination)||et.game,et.pose="playing");const nn=mn&&(!mn.until||mn.until>Date.now()/1e3)&&xs[mn.destination];if(et.destination=!!nn,nn&&!hi&&ht.state!=="offline"){et.pose=mn.kind==="drink"?"coffee":mn.kind==="food"?"eating":mn.kind==="dance"?"dancing":"resting",ce=[nn[0]+ht.id%5*1.6,nn[1],nn[2]+Math.floor(ht.id%10/5)*1.3];const Zt=h.nearest({x:ce[0],z:ce[2]});Zt&&(ce=[Zt.x,ce[1],Zt.z]),et.group.rotation.y=Math.PI}else if(!Re&&ht.meeting_with&&Number.isInteger(ht.meeting_spot)&&!hi){et.pose="meeting";const Zt=ht.id<ht.meeting_with?-1:1;ce=[-36+ht.meeting_spot*6.5+Zt*.9,-.12,20],et.facing=Zt<0?Math.PI/2:-Math.PI/2}else if(et.pose==="working")ce=Lt[ht.department][tt[ht.department]++],et.group.rotation.y=Math.PI;else if(et.pose==="playing"){const Zt=Mt.get(et.game.id)||0;Mt.set(et.game.id,Zt+1);const hn=Zt%2?1:-1;ce=[et.game.x+(et.game.kind==="court"?hn*(3-Math.floor(Zt/2)%3*1.7):Math.floor(Zt/2)*.8),-.12,et.game.z+hn*(et.game.kind==="court"?3.6:2.5)],et.group.rotation.y=hn<0?0:Math.PI}else if(et.pose==="sleeping")ce=ut.bed(ht.id),et.group.rotation.y=0;else if(et.pose==="resting"){const Zt=te++;ce=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],et.group.rotation.y=0}else if(re<8){const Zt=re++,hn=Zt%4,Kn=Zt<4?1:-1;ce=[(hn%2?13.8:8)+Kn*1.65,.08,hn<2?5.1:9.7],et.group.rotation.y=Kn*Math.PI/2}else{const Zt=te++;ce=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],et.group.rotation.y=0}if(et.pose==="playing"&&et.game.id==="darts"&&(ce=[et.game.x+(ht.id%2?-1:1)*1.2,-.12,et.game.z+2.5]),["playing","meeting"].includes(et.pose)&&!h.free(ce[0],ce[2])){const Zt=h.nearest({x:ce[0],z:ce[2]});Zt&&(ce=[Zt.x,ce[1],Zt.z])}if((et.pose==="playing"||nn)&&q.some(Zt=>Math.hypot(Zt[0]-ce[0],Zt[2]-ce[2])<.7))t:for(const Zt of[.8,1.5,2.2])for(let hn=0;hn<12;hn++){const Kn=ce[0]+Math.cos(hn*Math.PI/6)*Zt,ki=ce[2]+Math.sin(hn*Math.PI/6)*Zt;if(h.free(Kn,ki)&&!q.some(Ti=>Math.hypot(Ti[0]-Kn,Ti[2]-ki)<.7)){ce=[Kn,ce[1],ki];break t}}if(ze&&ht.state!=="offline"?(ce=[ze.x,ze.y,ze.z],et.pose="manual",et.manual=!0,et.group.rotation.y=ze.yaw,et.waypoints=[]):et.manual=!1,q.push(ce),et.target.set(...ce),et.home=et.target.clone(),(kt||$t!==et.pose&&et.pose!=="meeting"&&!nn&&!hi)&&et.group.position.copy(et.target),!et.manual&&!kt&&(et.pose==="playing"&&(Te!==et.game.id||$t!=="playing")||(nn||et.pose==="meeting")&&(!Yt||Yt.distanceTo(et.home)>.1))){if(!h.free(et.group.position.x,et.group.position.z)){const Zt=h.nearest(et.group.position)||h.nearest({x:0,z:21.5});Zt&&et.group.position.set(Zt.x,ce[1],Zt.z)}et.waypoints=h.withHomeAccess(ut.slotFor(ht.id),()=>h.path(et.group.position,et.home)).map(Zt=>new O(Zt.x,ce[1],Zt.z))}else!["playing","meeting"].includes(et.pose)&&!nn&&(et.waypoints=[]);Gt&&et.pose==="meeting"&&(et.group.position.copy(et.home),et.group.rotation.y=et.facing,et.waypoints=[]),et.dot.className=`vo-dot ${ht.state}`,et.name.textContent=ht.name,et.icon.textContent=`${ht.state==="offline"?"OFFLINE ":ht.state==="idle"?"JEDA ":"ONLINE "}${et.pose==="meeting"?"💬":et.pose==="sleeping"?"☾ RUMAH":et.pose==="playing"?et.game.icon:et.pose==="coffee"?"☕":""}`,hi&&rt.bot&&ht.id===rt.to&&(et.icon.textContent="OFFLINE · NPC "+et.game.icon),et.pose==="dancing"&&(et.icon.textContent=(ht.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),et.label.setAttribute("aria-label",`${ht.name}, ${ht.state==="online"?"online":ht.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),et.cup.visible=et.pose==="coffee",et.plate.visible=et.pose==="eating",et.manual&&(et.cup.visible=ze.action==="drink",et.plate.visible=ze.action==="eat",et.icon.textContent=(ht.private?"PRIVAT · ":"ONLINE · ")+(ze.action==="run"?"BOOST":ze.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),et.racket.visible=et.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(et.game.id),et.tool.visible=et.pose==="playing"&&["billiards","archery","darts"].includes(et.game.id),et.tool.visible&&(et.tool.geometry=xe(et.game.id)),et.shoes.forEach(Zt=>{Zt.visible=et.pose!=="sleeping"}),et.eyes.forEach(Zt=>{Zt.scale.y=et.pose==="sleeping"?.18:1}),et.ring.visible=ie===ht.id,et.label.setAttribute("aria-pressed",String(ie===ht.id))}ut.select(dt??(x.get(ie)?.pose==="sleeping"?ie:null)),be()}const cn=new O;function Xo(){const y=i.getBoundingClientRect(),L=[];for(const F of[...x.values()].sort((X,W)=>+(W.person.id===ie)-+(X.person.id===ie))){if(F.pose==="sleeping"){const re=ut.location(F.person.id);cn.set(re.x,5.2,re.z+1)}else F.group.getWorldPosition(cn),cn.y+=(v.form(F.person.id)?.height||1.8)+.55;cn.project(u);const X=(cn.x+1)/2*y.width,W=(1-cn.y)/2*y.height;if(Ot.active()&&F.person.id!==Y){F.label.hidden=!0;continue}const tt=166,q=27,Mt=L.some(re=>Math.abs(re.x-X)<tt&&Math.abs(re.y-W)<q),te=cn.z<1&&cn.z>-1&&X>18&&X<y.width-18&&W>15&&W<y.height-65&&(!Mt||F.person.id===ie);F.label.hidden=!te,te&&(F.label.style.transform=`translate(${X}px,${W}px) translate(-50%,-100%)`,L.push({x:X,y:W}))}}function vs(y=0){if(Bt=null,Se||!bt)return;if(y-Kt<1e3/30&&!Gt){Bt=requestAnimationFrame(vs);return}const L=Math.min(.06,Math.max(.001,(y-Kt)/1e3));Kt=y,He&&(u.position.lerp(Be,.12),_.target.lerp(De,.12),u.position.distanceTo(Be)<.04&&(u.position.copy(Be),_.target.copy(De),He=!1));let F=0;for(const q of x.values()){const Mt=Gt?0:y/1e3+q.phase;if(q.person.id===Y&&lt){const It=Math.atan2(u.position.x-_.target.x,u.position.z-_.target.z),ht=[...x.values()].filter(Yt=>Yt!==q&&Yt.pose!=="sleeping").map(Yt=>Yt.group.position),et=gt();let kt=et?{}:vt;if((kt.x||kt.z||kt.jump)&&(Ut=null,Dt=null),Ut&&(Ut.elapsed=(Ut.elapsed||0)+L),Ut?.elapsed>4&&(Ut=null,Vt({...lt.state(),restBlocked:!0})),Ut&&!et){const Yt=lt.state();if(Yt.grounded)if(Ut.point||(Ut.point=Dc(h,Yt,Ut.pose,ht)),!Ut.point)Ut=null;else{const Re=Ut.point.x-Yt.x,Ne=Ut.point.z-Yt.z,ze=Math.hypot(Re,Ne);if(ze<.04)lt.face({x:Yt.x+Math.sin(Ut.point.yaw),z:Yt.z+Math.cos(Ut.point.yaw)}),Dt={action:"rest",pose:Ut.pose,venue:Di(Yt,ft)?"home":["beach","garden","terrace","lounge","bar"].find(ce=>Ar(Yt,ce))||"campus"},Ut=null,kt={};else{const ce=Math.min(1,ze/(4.5*L))/ze;kt={x:(Math.cos(It)*Re-Math.sin(It)*Ne)*ce,z:(-Math.sin(It)*Re-Math.cos(It)*Ne)*ce}}}}const Te=v.modeState(Y);(Te?.id||null)!==ci&&(ci=Te?.id||null,G("follow",Y)),lt.setForm(v.form(Y),Te?.expires);const $t=lt.step(L,kt,It,ht);if(["walk","run","jump","fly","land"].includes($t.action)&&(Dt=null),Dt&&Object.assign($t,Dt),$t.transformation=Te,$t.transformationCooldown=v.modeCooldown(Y),$t.restPending=!!Ut,q.group.position.set($t.x,$t.y,$t.z),q.group.rotation.y=$t.yaw,q.manual=!0,q.pose="manual",q.home.copy(q.group.position),q.target.copy(q.group.position),Qt){const Yt=Qt==="home"&&ft?{x:ft.x,z:ft.z+5}:kn.venues[Qt];Yt&&($t.target=Qt,$t.distance=Math.round(Math.hypot($t.x-Yt.x,$t.z-Yt.z)))}if($t.atHome=Di($t,ft),$t.nearDoor=!!(ft&&Math.hypot($t.x-ft.x,$t.z-ft.z-3.9)<=2.8),$t.doorOpen=Pe,ft){const Yt=Di($t,ft);Yt!==Ot.active()&&(He=!1,ut.select(Yt?de:null),Yt&&(mt="follow",xt=Y,_.enablePan=!1)),Ot.set(Yt?de:null,Yt?q.group:null),$t.interior=Yt}else $t.interior=!1;Vt({...$t,interior:Ot.active()}),q.icon.textContent=(q.person.private?"PRIVAT · ":"ONLINE · ")+($t.action==="run"?"BOOST":$t.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(q.manual){const It=q.person.id===Y&&lt?{...lt.state(),...Dt||{}}:Qe.get(q.person.id)||q.person.pilot;if(It&&q.person.id!==Y){const $t=new O(It.x,It.y,It.z),Yt=q.group.position.clone().lerp($t,.35);h.segment(q.group.position,Yt)?q.group.position.copy(Yt):q.group.position.copy($t),q.group.rotation.y=It.yaw}q.person.id!==Y&&v.observe(q.person.id,It,q),q.flight=!!It?.flight,q.moving=["walk","run"].includes(It?.action);const ht=v.pose(q.person.id),et=Fg(q,ht&&!["walk","run","jump","rest"].includes(It?.action)?{...It,action:"cast",skillPose:ht}:It,{time:y/1e3+q.phase,dt:L,reduced:Gt}),kt=It?.action==="play"?wi.find($t=>$t.id===It.venue):null;q.racket.visible=!!(kt&&["tennis","badminton","pingpong","golf"].includes(kt.id)),q.tool.visible=!!(kt&&["billiards","archery","darts"].includes(kt.id)),q.tool.visible&&(q.tool.geometry=xe(kt.id)),q.cup.visible=It?.action==="drink",q.plate.visible=It?.action==="eat",It?.action==="rest"&&(q.icon.textContent=It.pose==="nap"?"ONLINE · TIDUR SANTAI":It.pose==="recline"?"ONLINE · REBAHAN":It.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const Te=v.form(q.person.id);Te&&(q.icon.textContent=(q.person.private?"PRIVAT · ":"ONLINE · ")+Te.name+(It?.flight?" · TERBANG":"")),et.lying&&(!Ot.active()||q.person.id===Y)&&(B.compose(new O(q.group.position.x+Math.sin(q.group.rotation.y)*.7,q.group.position.y+.035,q.group.position.z+Math.cos(q.group.rotation.y)*.7),q.group.quaternion,new O(1,1,1)),D.setMatrixAt(F++,B));continue}v.clearForm(q.person.id);const te=q.pose==="playing",re=!Gt&&(te||q.waypoints?.length>0);if(q.target.copy(q.home),te&&!q.waypoints?.length&&(q.target.x+=Math.sin(Mt*.65)*(q.game.kind==="court"?1.4:.18),q.target.z+=Math.cos(Mt*.5)*(q.game.kind==="court"?.3:.08)),q.waypoints?.length&&!Gt){const It=q.waypoints[0];q.group.position.distanceTo(It)<.015?q.waypoints.shift():(q.group.rotation.y=Math.atan2(It.x-q.group.position.x,It.z-q.group.position.z),Ms(q,It,L*3.2))}else te?Ms(q,q.target,Gt?0:L*1.4):q.pose==="meeting"?(Ms(q,q.home,Gt?0:L*3.2),q.group.rotation.y=q.facing):q.group.position.copy(q.home);q.legs.forEach((It,ht)=>{It.rotation.x=re?Math.sin(Mt*4+ht*Math.PI)*.32:q.pose==="working"||q.pose==="resting"?-1.1:0}),q.body.position.y=Math.sin(Mt*1.6)*(Gt?0:q.pose==="sleeping"?.007:.018),q.body.rotation.x=q.pose==="sleeping"?-Math.PI/2:0,q.body.rotation.z=te?Math.sin(Mt*1.5)*.07:0,q.head.rotation.x=q.pose==="sleeping"?0:Math.sin(Mt*.6)*(Gt?0:.025),q.arms[0].rotation.x=q.pose==="working"?-.65+Math.sin(Mt*5)*(Gt?0:.045):q.pose==="eating"?-1.05:.1,q.arms[1].rotation.x=q.pose==="working"?-.65+Math.sin(Mt*5+1)*(Gt?0:.045):q.pose==="coffee"?-1.2+Math.sin(Mt*1.2)*(Gt?0:.13):q.pose==="eating"?-.8+Math.sin(Mt*2)*(Gt?0:.13):.1,te&&(q.arms[1].rotation.x=-.6+Math.sin(Mt*2.3)*(Gt?0:.7),q.arms[0].rotation.x=-.25+Math.sin(Mt*2.3+1)*(Gt?0:.25)),q.pose==="dancing"&&!re&&(q.body.rotation.z=Gt?0:Math.sin(Mt*2.4)*.13,q.arms.forEach((It,ht)=>{It.rotation.x=-.8+Math.sin(Mt*2.4+ht)*(Gt?0:.5)}),q.legs.forEach((It,ht)=>{It.rotation.x=Gt?0:Math.sin(Mt*2.4+ht*Math.PI)*.25})),q.pose==="meeting"?(q.arms[1].rotation.x=-.2+Math.sin(Mt*1.7)*(Gt||re?0:.18),q.head.rotation.y=Math.sin(Mt*.7)*(Gt?0:.06)):q.head.rotation.y=0}D.count=F,D.instanceMatrix.needsUpdate=!0,v.update(Date.now(),lt?.state());const X=x.get(xt);if(mt!=="orbit"&&X&&!He){const Mt=X.group.position.clone().add(new O(0,v.form(xt)?.height*.55||(X.pose==="sleeping"?.25:1.3),X.pose==="sleeping"?-1.3:0)).clone().sub(_.target).multiplyScalar(.25);_.target.add(Mt),u.position.add(Mt)}ye.update(y,{paused:Gt,dark:document.documentElement.classList.contains("dark"),center:_.target}),ct.update(y,{paused:Gt,energySaver:it}),St.update(y,Gt);for(const{mesh:q,game:Mt}of wt){const te=Gt?0:y/1e3,It=[...x.values()].some(ht=>ht.manual?(ht.person.id===Y?Dt:Qe.get(ht.person.id)||ht.person.pilot)?.action==="play"&&(ht.person.id===Y?Dt:Qe.get(ht.person.id)||ht.person.pilot)?.venue===Mt.id:!mu(d())&&ht.pose==="playing"&&ht.game.id===Mt.id)?Math.sin(te*1.8):0;q.position.set(Mt.x+(Mt.id==="golf"?It*4:It*1.5),Mt.id==="pingpong"?1.45+Math.abs(It)*.65:Mt.id==="basketball"?.15+Math.abs(It)*2.2:Mt.id==="bowling"||Mt.id==="golf"?.06:.4+Math.abs(It)*2,Mt.z+It*(Mt.kind==="court"?4:1.3))}_.update();const W=u.position.clone(),tt=u.quaternion.clone();mt!=="orbit"&&X&&u.position.copy(Ng(h,_.target,W,ut.cameraBoxes(xt),Ot.active()?1.7:v.form(xt)?.height*.85||(mt==="portrait"?2.8:3.8),Ot.active()?8:v.form(xt)?55:35)),u.lookAt(_.target),u.updateMatrixWorld(!0),A?A.copy(u):A=u.clone(),Ot.apply(),p.render(m,u),(Gt||y-N>120||He)&&(Xo(),N=y),u.position.copy(W),u.quaternion.copy(tt),u.updateMatrixWorld(!0),(!Gt||He||Ut||lt?.moving()||lt&&lt.state().stamina<100||!gt()&&(Math.abs(vt.x||0)+Math.abs(vt.z||0)>0||vt.jump))&&be()}function be(){!Se&&bt&&Bt===null&&(Bt=requestAnimationFrame(vs))}function Ms(y,L,F){const X=ut.location(y.person.id),W=X&&Math.abs(y.group.position.x-X.x)<4.8&&Math.abs(y.group.position.z-X.z)<5;return!!W!=!!y.npcDoorOpen&&(y.npcDoorOpen=!!W,ut.setDoor(y.person.id,!!W)),h.withHomeAccess(ut.slotFor(y.person.id),()=>Yo(y,L,F))}function Yo(y,L,F){const X=h.move(y.group.position,L,F),W=Math.hypot(X.x-y.group.position.x,X.z-y.group.position.z),tt=[...x.values()].some(q=>q!==y&&q.pose!=="sleeping"&&Math.hypot(X.x-q.group.position.x,X.z-q.group.position.z)<.62);if(tt||y.group.position.set(X.x,y.home.y,X.z),(tt||W<.001&&y.group.position.distanceTo(L)>.2)&&Kt>=(y.repathAt||0)&&(y.pose==="meeting"||y.waypoints?.length)){y.repathAt=Kt+1500;const q=[...x.values()].filter(te=>te!==y&&te.pose!=="sleeping").map(te=>te.group.position),Mt=h.path(y.group.position,y.home,q);Mt.length&&(y.waypoints=Mt.map(te=>new O(te.x,y.home.y,te.z)))}}function Ei(){if(Se)return;const y=i.getBoundingClientRect();y.width<1||y.height<1||(p.setSize(y.width,y.height,!1),u.aspect=y.width/y.height,u.updateProjectionMatrix(),be())}function Ss(y="all"){if(Ot.active()){G("follow",Y);return}mt="orbit",xt=null,u.fov=36,u.updateProjectionMatrix(),_.enablePan=!0,_.minDistance=8,_.maxDistance=650;const L=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const tt of wi)F[tt.id]=[[tt.x,.3,tt.z],[tt.x+14,19,tt.z+22]];for(const[tt,q]of Object.entries(xs))F[tt]=[q,[q[0]+12,19,q[2]+22]];const[X,W]=F[y]||F.all;if(De.set(...X),Be.set(...W),y==="all"||y==="residences"){const tt=ut.bounds(),q=y==="all"?76:tt.front,Mt=tt.right-tt.left,te=q-tt.back;De.set(0,0,(q+tt.back)/2);const re=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),It=Math.min(rs.degToRad(u.fov/2),Math.atan(Math.tan(rs.degToRad(u.fov/2))*re)),ht=Math.hypot(Mt,te)/2/Math.sin(It)*1.07;Be.copy(new O(1,1.18,1.3).normalize().multiplyScalar(ht).add(De))}else L&&Be.sub(De).multiplyScalar(1.23).add(De);dt=null,ut.select(x.get(ie)?.pose==="sleeping"?ie:null),Gt?(u.position.copy(Be),_.target.copy(De),He=!1):He=!0,be()}function R(y){if(Ot.active()){G("follow",Y);return}mt="orbit",xt=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650,u.fov=36,u.updateProjectionMatrix();const L=ut.location(y);L&&(dt=y,ut.select(y),De.set(L.x,1.2,L.z),Be.copy(De).add(new O(11,12,15)),i.clientWidth<600&&Be.sub(De).multiplyScalar(1.23).add(De),Gt?(u.position.copy(Be),_.target.copy(De),He=!1):He=!0,be())}function G(y,L=ie){if(Ot.active()&&(y="follow",L=Y),y==="orbit"){mt="orbit",xt=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650;return}!x.has(L)&&Z.some(W=>W.id===L)&&(ie=L,pn(Z));const F=x.get(L);if(!F)return;const X=v.form(L);mt=y==="portrait"?"portrait":"follow",xt=L,_.enablePan=!1,_.minDistance=Ot.active()?1.7:X?X.height*.85:mt==="portrait"?2.8:3.8,_.maxDistance=Ot.active()?8:X?55:35,u.fov=Ot.active()?58:44,u.updateProjectionMatrix(),De.copy(F.group.position).add(new O(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),X&&(De.y=F.group.position.y+X.height*.55),Be.copy(De).add(X?new O(X.height*.85,X.height*.65,X.height*1.1):mt==="portrait"?new O(1.8,.9,2.7):new O(4,2.5,5)),Gt?(u.position.copy(Be),_.target.copy(De),He=!1):He=!0,be()}let Q=null;const K=new Vn({transparent:!0,opacity:0,depthWrite:!1});S.set("game-hotspots",K);for(const y of wi){const L=new We(6,1.4,.4),F=new We(y.kind==="court"?16:9,.18,y.kind==="court"?12:7);L.translate(0,.7,-(y.kind==="court"?6:4.2)),F.translate(0,-.14,0);const X=L.toNonIndexed(),W=F.toNonIndexed(),tt=Wn([X,W],!1);L.dispose(),F.dispose(),X.dispose(),W.dispose(),E.add(tt);const q=new Me(tt,K);q.position.set(y.x,0,y.z),q.userData.officeGame=y.id,m.add(q),Gi.push(q)}const J=new kh,Tt=new Nt,Ft=y=>{Q=[y.clientX,y.clientY]},Et=y=>{if(!Q||Math.hypot(y.clientX-Q[0],y.clientY-Q[1])>6)return;Q=null;const L=p.domElement.getBoundingClientRect();Tt.set((y.clientX-L.left)/L.width*2-1,-(y.clientY-L.top)/L.height*2+1),J.setFromCamera(Tt,A||u);const F=J.intersectObjects([...x.values()].map(W=>W.group).concat(ut.meshes,ct.targets,St.targets,Gi,v.targets()),!0)[0],X=ut.personForHit(F);if(X===de&&F?.object.userData.residenceLayer==="door"){o();return}X?(e(X),R(X)):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function Ct(){const y=document.documentElement.classList.contains("dark");p.toneMappingExposure=y?1.02:1.18,ye.configure(ot,it),be()}const Ht=new ResizeObserver(Ei);Ht.observe(i);const jt=new MutationObserver(Ct);jt.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const ue=y=>{y.preventDefault(),Se||n()};p.domElement.addEventListener("pointerdown",Ft),p.domElement.addEventListener("pointerup",Et),p.domElement.addEventListener("webglcontextlost",ue);const zt=()=>be();return _.addEventListener("change",zt),_.addEventListener("start",()=>{He=!1}),Ct(),Ss("all"),u.position.copy(Be),_.target.copy(De),He=!1,Ei(),{setPeople:pn,resize:Ei,focusRoom:Ss,visitHome:R,setCameraMode:G,collisionBoxes:()=>h.boxes(),setPilotReporter(y){Vt=y},castSkill(y=0){const L=x.get(Y);if(!L||!lt)return{error:"Aktifkan kendali avatar dahulu."};const F=uu(bl(L.person.avatar).costume)[y];return F?v.cooldown(Y)?{error:`Pulihkan energi ${v.cooldown(Y)} detik lagi.`}:F.type==="transform"&&(Ot.active()||!h.free(lt.state().x,lt.state().z,lt.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&v.modeCooldown(Y)?{error:`Transformasi pulih dalam ${v.modeCooldown(Y)} detik.`}:(Dt=null,Ut=null,v.cast(Y,F.id,L)?(be(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(y){if(!y||!lt||(Number.isFinite(y.updated_ms)&&v.clock(y.updated_ms-Date.now()),bi&&y.form))return;y.form||(bi=!1),v.observe(Y,y,x.get(Y));const L=v.modeState(Y);lt.setForm(v.form(Y),L?.expires),be()},toggleFlight(){const y=lt?.toggleFlight();return be(),y},endTransformation(){bi=!0,ci=null,v.clearForm(Y),lt?.setForm(null),G("follow",Y),be()},activeTransformation:()=>v.modeState(Y),setPrivatePilotProfile(y){_t&&(_t={..._t,avatar:y},pn(Z.map(L=>L.id===_t.id?_t:L)))},setPilotGate(y){gt=y},reconcilePilot(y){lt&&(lt.reset(y),Dt=null,Ut=null,vt={},be())},configureHome(y,L,F=null){de=y,ft=L?Wo(L.slot):null,vn=Number.isInteger(F)?Math.min(128,F):null,ut.setPlots(vn??0)},canUseDoor(){const y=lt?.state();return!!(ft&&y&&(Di(y,ft)||Math.hypot(y.x-ft.x,y.z-ft.z-3.9)<=2.8))},homeDoorOpen:()=>Pe,setHomeDoor(y){Pe!==!!y&&(Pe=!!y,h.configureHomes(!0,Pe?ft?.slot:null),de&&ut.setDoor(de,Pe),be())},setRestPose(y){if(!lt)return!1;if(v.cancel(Y),Ut=null,Dt=null,vt={},!y)return be(),!0;if(!["sit","recline","nap","meditate"].includes(y))return!1;const L=lt.state(),F=[...x.values()].filter(W=>W.person.id!==Y&&W.pose!=="sleeping").map(W=>W.group.position),X=L.grounded?Dc(h,L,y,F):null;return L.grounded&&!X?!1:(Ut={pose:y,point:X},X&&Math.hypot(X.x-L.x,X.z-L.z)<.04&&(lt.face({x:L.x+Math.sin(X.yaw),z:L.z+Math.cos(X.yaw)}),Dt={action:"rest",pose:y,venue:Di(L,ft)?"home":["beach","garden","terrace","lounge","bar"].find(W=>Ar(L,W))||"campus"},Ut=null),be(),!0)},setPilot(y,L,F=null){Y=y,_t=F,lt=Ig(h,L),pn(Z),G("follow",y),be()},releasePilot(){Ot.leave(),v.clearForm(Y),bi=!1,ci=null;const y=_t?.id;Y=null,_t=null,lt=null,vt={},Dt=null,Ut=null,Qt=null,Fn.visible=!1,pn(Z.filter(L=>L.id!==y))},setPilotInput(y){vt=y||{},be()},pilotState(){return lt?{...lt.state(),...Dt||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Y&&(G("follow",Y),i.focus?.({preventScroll:!0}))},setPeerPilots(y){Qe.clear();for(const L of y)L.id!==Y&&Qe.set(L.id,L);pn(Z.map(L=>({...L,pilot:Qe.get(L.id)||null,in_office:Qe.has(L.id)||L.id===Y})))},canInteract(y){return Ar(lt?.state(),y)},guideTo(y){const L=y==="home"&&ft?{x:ft.x,z:ft.z+5}:kn.venues[y];if(Qt=L?y:null,Fn.visible=!!L,L){Fn.position.set(L.x,.025,L.z);const F=lt?.state();Vt({...F,target:y,distance:F?Math.round(Math.hypot(L.x-F.x,L.z-F.z)):null}),be()}return L},interactNearest(){const y=lt?.state();if(!y)return!1;if(ft&&(Di(y,ft)||Math.hypot(y.x-ft.x,y.z-ft.z-3.9)<=2.8))return o(),!0;const L=Object.keys(kn.venues).filter(F=>Ar(y,F)).sort((F,X)=>Math.hypot(y.x-kn.venues[F].x,y.z-kn.venues[F].z)-Math.hypot(y.x-kn.venues[X].x,y.z-kn.venues[X].z))[0];return wi.some(F=>F.id===L)?(r(L),!0):["bar","disco","beach","garden","terrace","lounge"].includes(L)?(s(L),!0):!1},setRecreation(y,L){Number(y)===Y&&L&&(Dt={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[L.kind]||"idle",venue:L.destination,pose:L.kind==="relax"?"sit":null}),yt.set(Number(y),L?{...L,until:L.until||Date.now()/1e3+900}:null),pn(Z)},setVenueEffects(y){ct.setEnabled(y),be()},setGame(y){JSON.stringify(rt)!==JSON.stringify(y)&&(rt=y,Y&&y?.status==="playing"&&[y.from,y.to].includes(Y)?Dt={action:"play",venue:y.kind}:Dt?.action==="play"&&(Dt=null),pn(Z))},say(y,L){const F=x.get(Number(y));F&&(F.bubble.textContent=String(L||"").slice(0,350),F.bubble.hidden=!1,z.has(y)&&clearTimeout(z.get(y)),z.set(y,setTimeout(()=>{F.bubble.hidden=!0,z.delete(y),be()},1e4)),be())},configureWorld(y){ot=y||{},ye.configure(ot,it),C("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[ot.settings?.landscape]||"#47695f"),be()},setEnergySaver(y){it=!!y,p.setPixelRatio(it?1:Math.min(window.devicePixelRatio||1,1.5)),ye.configure(ot,it),Ei()},setMeeting(y){st=y,pn(Z)},meetingReady(){if(Y&&st?.connected&&st.room){const L=x.get(st.room.from),F=x.get(st.room.to);if(!L||!F||L.group.position.distanceTo(F.group.position)>3)return!1;const X=F.group.position.x-L.group.position.x,W=F.group.position.z-L.group.position.z,tt=Math.hypot(X,W);return tt>.2&&(Math.sin(L.group.rotation.y)*X+Math.cos(L.group.rotation.y)*W)/tt>.45&&(-Math.sin(F.group.rotation.y)*X-Math.cos(F.group.rotation.y)*W)/tt>.45}const y=st?.room;return!y||!st.connected?!1:[y.from,y.to].every(L=>{const F=x.get(L);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(y,L=!1){ie!==y&&(dt=null),ie=y,y&&!x.has(y)&&Z.some(X=>X.id===y)&&pn(Z);for(const[X,W]of x)W.ring.visible=X===y,W.label.setAttribute("aria-pressed",String(X===y));const F=x.get(y);if(ut.select(dt??(F?.pose==="sleeping"?y:null)),F&&L&&Y&&y!==Y&&lt){lt.face(F.group.position),be();return}if(F&&L&&mt!=="orbit"){G(mt,y);return}if(F&&L&&F.pose==="sleeping"){R(y);return}F&&L&&(De.copy(F.target).add(new O(0,1,0)),Be.copy(De).add(new O(11,11,14)),Gt?(u.position.copy(Be),_.target.copy(De)):He=!0),be()},zoom(y){if(!Number.isFinite(y)||y<=0)return;He=!1;const L=u.position.clone().sub(_.target);L.setLength(rs.clamp(L.length()*y,_.minDistance,_.maxDistance)),u.position.copy(_.target).add(L),_.update(),be()},setPaused(y){if(Gt=y,Gt)for(const L of x.values())L.pose==="meeting"&&(L.group.position.copy(L.home),L.group.rotation.y=L.facing,L.waypoints=[]);Bt!==null&&cancelAnimationFrame(Bt),Bt=null,be()},setVisible(y){bt=y,!y&&Bt!==null?(cancelAnimationFrame(Bt),Bt=null):y&&(Kt=0,Ei(),be())},dispose(){Se=!0,Bt!==null&&cancelAnimationFrame(Bt),Bt=null,Ht.disconnect(),jt.disconnect(),_.dispose(),Ot.dispose(),v.dispose();for(const y of z.values())clearTimeout(y);z.clear(),yt.clear(),p.domElement.removeEventListener("pointerdown",Ft),p.domElement.removeEventListener("pointerup",Et),p.domElement.removeEventListener("webglcontextlost",ue),ut.dispose(),D.dispose(),ye.dispose();for(const y of E)y.dispose();for(const y of S.values())y.dispose();for(const y of M)y.dispose();x.forEach(y=>y.label.remove()),x.clear(),m.clear(),p.dispose(),p.forceContextLoss(),p.domElement.remove()}}}export{kg as createOfficeScene};
