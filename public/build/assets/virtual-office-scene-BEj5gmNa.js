import{m as Hn,w as fu,c as du,g as Ri,s as pu,a as Al,p as mu,b as gu,d as _u,i as xu}from"./virtual-office-DxCtzqK3.js";const Po="187",Fi={ROTATE:0,DOLLY:1,PAN:2},Ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Fc=0,Ea=1,Oc=2,Os=1,Bc=2,os=3,Mi=0,cn=1,nn=2,Oi=0,ls=1,qs=2,Ta=3,Aa=4,zc=5,Ni=100,Gc=101,kc=102,Hc=103,Vc=104,Wc=200,Xc=201,Yc=202,qc=203,Fa=204,Oa=205,Zc=206,Kc=207,Jc=208,$c=209,Qc=210,jc=211,th=212,eh=213,nh=214,Or=0,Br=1,zr=2,hs=3,Gr=4,kr=5,Hr=6,Vr=7,Ba=0,ih=1,sh=2,Zn=0,za=1,Ga=2,ka=3,Do=4,Ha=5,Va=6,Wa=7,Xa=300,zi=301,us=302,Dr=303,Lr=304,Wr=1e3,qn=1001,Xr=1002,Ke=1003,rh=1004,Us=1005,ln=1006,Ir=1007,si=1008,dn=1009,Ya=1010,qa=1011,fs=1012,Lo=1013,Un=1014,An=1015,Fn=1016,Io=1017,No=1018,Gi=1020,Za=35902,Ka=35899,Ja=1021,$a=1022,In=1023,li=1026,ri=1027,Uo=1028,Fo=1029,Si=1030,Oo=1031,Bo=1033,Bs=33776,zs=33777,Gs=33778,ks=33779,Yr=35840,qr=35841,Zr=35842,Kr=35843,Jr=36196,$r=37492,Qr=37496,jr=37488,to=37489,Zs=37490,eo=37491,no=37808,io=37809,so=37810,ro=37811,oo=37812,ao=37813,lo=37814,co=37815,ho=37816,uo=37817,fo=37818,po=37819,mo=37820,go=37821,_o=36492,xo=36494,vo=36495,Mo=36283,So=36284,Ks=36285,yo=36286,oh=3200,bo=0,ah=1,ii="",an="srgb",Js="srgb-linear",$s="linear",we="srgb",Nr=7680,lh=519,ch=512,hh=513,uh=514,Qa=515,fh=516,dh=517,ja=518,tl=519,ph=35044,el=35048,wa="300 es",wn=2e3,ds=2001;function vu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Eo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mh(){const i=Eo("canvas");return i.style.display="block",i}const wl={};function Ra(...i){const t="THREE."+i.shift();console.log(t,...i)}function gh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Jt(...i){i=gh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Se(...i){i=gh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Hs(...i){const t=i.join(" ");t in wl||(wl[t]=!0,Jt(...i))}function Mu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Su={[Or]:Or,[zr]:Hr,[Gr]:Gr,[hs]:kr,[Br]:Br,[Hr]:zr,[Vr]:Vr,[kr]:hs};class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Rl=1234567;const Vs=Math.PI/180,Qs=180/Math.PI;function _s(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function he(i,t,e){return Math.max(t,Math.min(e,i))}function nl(i,t){return(i%t+t)%t}function yu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function bu(i,t,e){return i!==t?(e-i)/(t-i):0}function Ws(i,t,e){return(1-e)*i+e*t}function Eu(i,t,e,n){return Ws(i,t,1-Math.exp(-e*n))}function Tu(i,t=1){return t-Math.abs(nl(i,t*2)-t)}function Au(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function wu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ru(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Cu(i,t){return i+Math.random()*(t-i)}function Pu(i){return i*(.5-Math.random())}function Du(i){i!==void 0&&(Rl=i);let t=Rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lu(i){return i*Vs}function Iu(i){return i*Qs}function Nu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Uu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _h(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Fu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),m=r((t-n)/2),u=o((t-n)/2),p=r((n-t)/2),_=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*m,c*u,a*l);break;case"YZY":i.set(c*u,a*d,c*m,a*l);break;case"ZXZ":i.set(c*m,c*u,a*d,a*l);break;case"XZX":i.set(a*d,c*_,c*p,a*l);break;case"YXY":i.set(c*p,a*d,c*_,a*l);break;case"ZYZ":i.set(c*_,c*p,a*d,a*l);break;default:Jt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function il(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function xh(i,t){if(t.constructor===Float32Array)return i;const e=il(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function vh(i,t){if(t.constructor===Float32Array)return i;const e=il(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Bi={DEG2RAD:Vs,RAD2DEG:Qs,generateUUID:_s,clamp:he,euclideanModulo:nl,mapLinear:yu,inverseLerp:bu,lerp:Ws,damp:Eu,pingpong:Tu,smoothstep:Au,smootherstep:wu,randInt:Ru,randFloat:Cu,randFloatSpread:Pu,seededRandom:Du,degToRad:Lu,radToDeg:Iu,isPowerOfTwo:Nu,ceilPowerOfTwo:Uu,floorPowerOfTwo:_h,setQuaternionFromProperEuler:Fu,normalize:vh,denormalize:xh},yl=class yl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};yl.prototype.isVector2=!0;let It=yl;class pn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],m=n[s+3],u=r[o+0],p=r[o+1],_=r[o+2],b=r[o+3];if(m!==b||c!==u||l!==p||d!==_){let f=c*u+l*p+d*_+m*b;f<0&&(u=-u,p=-p,_=-_,b=-b,f=-f);let g=1-a;if(f<.9995){const S=Math.acos(f),T=Math.sin(S);g=Math.sin(g*S)/T,a=Math.sin(a*S)/T,c=c*g+u*a,l=l*g+p*a,d=d*g+_*a,m=m*g+b*a}else{c=c*g+u*a,l=l*g+p*a,d=d*g+_*a,m=m*g+b*a;const S=1/Math.sqrt(c*c+l*l+d*d+m*m);c*=S,l*=S,d*=S,m*=S}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],m=r[o],u=r[o+1],p=r[o+2],_=r[o+3];return t[e]=a*_+d*m+c*p-l*u,t[e+1]=c*_+d*u+l*m-a*p,t[e+2]=l*_+d*p+a*u-c*m,t[e+3]=d*_-a*m-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),m=a(r/2),u=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=u*d*m+l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m-u*p*_;break;case"YXZ":this._x=u*d*m+l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m+u*p*_;break;case"ZXY":this._x=u*d*m-l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m-u*p*_;break;case"ZYX":this._x=u*d*m-l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m+u*p*_;break;case"YZX":this._x=u*d*m+l*p*_,this._y=l*p*m+u*d*_,this._z=l*d*_-u*p*m,this._w=l*d*m-u*p*_;break;case"XZY":this._x=u*d*m-l*p*_,this._y=l*p*m-u*d*_,this._z=l*d*_+u*p*m,this._w=l*d*m+u*p*_;break;default:Jt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],m=e[10],u=n+a+m;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>m){const p=2*Math.sqrt(1+n-a-m);this._w=(d-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>m){const p=2*Math.sqrt(1+a-n-m);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+m-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(he(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const bl=class bl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),m=2*(r*n-o*e);return this.x=e+c*l+o*m-a*d,this.y=n+c*d+a*l-r*m,this.z=s+c*m+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this.z=he(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this.z=he(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $o.copy(this).projectOnVector(t),this.sub($o)}reflect(t){return this.sub($o.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(he(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bl.prototype.isVector3=!0;let O=bl;const $o=new O,Cl=new pn,El=class El{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],m=n[7],u=n[2],p=n[5],_=n[8],b=s[0],f=s[3],g=s[6],S=s[1],T=s[4],E=s[7],M=s[2],x=s[5],h=s[8];return r[0]=o*b+a*S+c*M,r[3]=o*f+a*T+c*x,r[6]=o*g+a*E+c*h,r[1]=l*b+d*S+m*M,r[4]=l*f+d*T+m*x,r[7]=l*g+d*E+m*h,r[2]=u*b+p*S+_*M,r[5]=u*f+p*T+_*x,r[8]=u*g+p*E+_*h,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],m=d*o-a*l,u=a*c-d*r,p=l*r-o*c,_=e*m+n*u+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/_;return t[0]=m*b,t[1]=(s*l-d*n)*b,t[2]=(a*n-s*o)*b,t[3]=u*b,t[4]=(d*e-s*c)*b,t[5]=(s*r-a*e)*b,t[6]=p*b,t[7]=(n*c-l*e)*b,t[8]=(o*e-n*r)*b,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qo.makeScale(t,e)),this}rotate(t){return Hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qo.makeRotation(-t)),this}translate(t,e){return Hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};El.prototype.isMatrix3=!0;let Qt=El;const Qo=new Qt,Pl=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ou(){const i={enabled:!0,workingColorSpace:Js,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===we&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===we&&(s.r=cs(s.r),s.g=cs(s.g),s.b=cs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ii?$s:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Js]:{primaries:t,whitePoint:n,transfer:$s,toXYZ:Pl,fromXYZ:Dl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:t,whitePoint:n,transfer:we,toXYZ:Pl,fromXYZ:Dl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}const me=Ou();function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qi;class Mh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qi===void 0&&(qi=Eo("canvas")),qi.width=t.width,qi.height=t.height;const s=qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Eo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(oi(e[n]/255)*255):e[n]=oi(e[n]);return{data:e,width:t.width,height:t.height}}else return Jt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bu=0;class zo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=_s(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jo(s[o].image)):r.push(jo(s[o]))}else r=jo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function jo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Jt("Texture: Unable to serialize Texture."),{})}let zu=0;const ta=new O;class $e extends hi{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=qn,s=qn,r=ln,o=si,a=In,c=dn,l=$e.DEFAULT_ANISOTROPY,d=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=_s(),this.name="",this.source=new zo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ta).x}get height(){return this.source.getSize(ta).y}get depth(){return this.source.getSize(ta).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Jt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Jt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xa)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wr:t.x=t.x-Math.floor(t.x);break;case qn:t.x=t.x<0?0:1;break;case Xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wr:t.y=t.y-Math.floor(t.y);break;case qn:t.y=t.y<0?0:1;break;case Xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=Xa;$e.DEFAULT_ANISOTROPY=1;const Tl=class Tl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],d=c[4],m=c[8],u=c[1],p=c[5],_=c[9],b=c[2],f=c[6],g=c[10];if(Math.abs(d-u)<.01&&Math.abs(m-b)<.01&&Math.abs(_-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(m+b)<.1&&Math.abs(_+f)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,E=(p+1)/2,M=(g+1)/2,x=(d+u)/4,h=(m+b)/4,v=(_+f)/4;return T>E&&T>M?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=x/n,r=h/n):E>M?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=x/s,r=v/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=h/r,s=v/r),this.set(n,s,r,e),this}let S=Math.sqrt((f-_)*(f-_)+(m-b)*(m-b)+(u-d)*(u-d));return Math.abs(S)<.001&&(S=1),this.x=(f-_)/S,this.y=(m-b)/S,this.z=(u-d)/S,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=he(this.x,t.x,e.x),this.y=he(this.y,t.y,e.y),this.z=he(this.z,t.z,e.z),this.w=he(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=he(this.x,t,e),this.y=he(this.y,t,e),this.z=he(this.z,t,e),this.w=he(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(he(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Tl.prototype.isVector4=!0;let Ie=Tl;class Sh extends hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new $e({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new zo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends Sh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class sl extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yh extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Co=class Co{constructor(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f)}set(t,e,n,s,r,o,a,c,l,d,m,u,p,_,b,f){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=d,g[10]=m,g[14]=u,g[3]=p,g[7]=_,g[11]=b,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Co().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){const u=o*d,p=o*m,_=a*d,b=a*m;e[0]=c*d,e[4]=-c*m,e[8]=l,e[1]=p+_*l,e[5]=u-b*l,e[9]=-a*c,e[2]=b-u*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*d,p=c*m,_=l*d,b=l*m;e[0]=u+b*a,e[4]=_*a-p,e[8]=o*l,e[1]=o*m,e[5]=o*d,e[9]=-a,e[2]=p*a-_,e[6]=b+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*d,p=c*m,_=l*d,b=l*m;e[0]=u-b*a,e[4]=-o*m,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*d,e[9]=b-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*d,p=o*m,_=a*d,b=a*m;e[0]=c*d,e[4]=_*l-p,e[8]=u*l+b,e[1]=c*m,e[5]=b*l+u,e[9]=p*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,p=o*l,_=a*c,b=a*l;e[0]=c*d,e[4]=b-u*m,e[8]=_*m+p,e[1]=m,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=p*m+_,e[10]=u-b*m}else if(t.order==="XZY"){const u=o*c,p=o*l,_=a*c,b=a*l;e[0]=c*d,e[4]=-m,e[8]=l*d,e[1]=u*m+b,e[5]=o*d,e[9]=p*m-_,e[2]=_*m-p,e[6]=a*d,e[10]=b*m+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gu,t,ku)}lookAt(t,e,n){const s=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),pi.crossVectors(n,_n),pi.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),pi.crossVectors(n,_n)),pi.normalize(),ir.crossVectors(_n,pi),s[0]=pi.x,s[4]=ir.x,s[8]=_n.x,s[1]=pi.y,s[5]=ir.y,s[9]=_n.y,s[2]=pi.z,s[6]=ir.z,s[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],m=n[5],u=n[9],p=n[13],_=n[2],b=n[6],f=n[10],g=n[14],S=n[3],T=n[7],E=n[11],M=n[15],x=s[0],h=s[4],v=s[8],P=s[12],C=s[1],w=s[5],L=s[9],B=s[13],I=s[2],H=s[6],U=s[10],W=s[14],at=s[3],$=s[7],j=s[11],ht=s[15];return r[0]=o*x+a*C+c*I+l*at,r[4]=o*h+a*w+c*H+l*$,r[8]=o*v+a*L+c*U+l*j,r[12]=o*P+a*B+c*W+l*ht,r[1]=d*x+m*C+u*I+p*at,r[5]=d*h+m*w+u*H+p*$,r[9]=d*v+m*L+u*U+p*j,r[13]=d*P+m*B+u*W+p*ht,r[2]=_*x+b*C+f*I+g*at,r[6]=_*h+b*w+f*H+g*$,r[10]=_*v+b*L+f*U+g*j,r[14]=_*P+b*B+f*W+g*ht,r[3]=S*x+T*C+E*I+M*at,r[7]=S*h+T*w+E*H+M*$,r[11]=S*v+T*L+E*U+M*j,r[15]=S*P+T*B+E*W+M*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],m=t[6],u=t[10],p=t[14],_=t[3],b=t[7],f=t[11],g=t[15],S=c*p-l*u,T=a*p-l*m,E=a*u-c*m,M=o*p-l*d,x=o*u-c*d,h=o*m-a*d;return e*(b*S-f*T+g*E)-n*(_*S-f*M+g*x)+s*(_*T-b*M+g*h)-r*(_*E-b*x+f*h)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],d=t[10];return e*(o*d-a*l)-n*(r*d-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],m=t[9],u=t[10],p=t[11],_=t[12],b=t[13],f=t[14],g=t[15],S=e*a-n*o,T=e*c-s*o,E=e*l-r*o,M=n*c-s*a,x=n*l-r*a,h=s*l-r*c,v=d*b-m*_,P=d*f-u*_,C=d*g-p*_,w=m*f-u*b,L=m*g-p*b,B=u*g-p*f,I=S*B-T*L+E*w+M*C-x*P+h*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/I;return t[0]=(a*B-c*L+l*w)*H,t[1]=(s*L-n*B-r*w)*H,t[2]=(b*h-f*x+g*M)*H,t[3]=(u*x-m*h-p*M)*H,t[4]=(c*C-o*B-l*P)*H,t[5]=(e*B-s*C+r*P)*H,t[6]=(f*E-_*h-g*T)*H,t[7]=(d*h-u*E+p*T)*H,t[8]=(o*L-a*C+l*v)*H,t[9]=(n*C-e*L-r*v)*H,t[10]=(_*x-b*E+g*S)*H,t[11]=(m*E-d*x-p*S)*H,t[12]=(a*P-o*w-c*v)*H,t[13]=(e*w-n*P+s*v)*H,t[14]=(b*T-_*M-f*S)*H,t[15]=(d*M-m*T+u*S)*H,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,m=a+a,u=r*l,p=r*d,_=r*m,b=o*d,f=o*m,g=a*m,S=c*l,T=c*d,E=c*m,M=n.x,x=n.y,h=n.z;return s[0]=(1-(b+g))*M,s[1]=(p+E)*M,s[2]=(_-T)*M,s[3]=0,s[4]=(p-E)*x,s[5]=(1-(u+g))*x,s[6]=(f+S)*x,s[7]=0,s[8]=(_+T)*h,s[9]=(f-S)*h,s[10]=(1-(u+b))*h,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Zi.set(s[0],s[1],s[2]).length();const a=Zi.set(s[4],s[5],s[6]).length(),c=Zi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);const l=1/o,d=1/a,m=1/c;return Cn.elements[0]*=l,Cn.elements[1]*=l,Cn.elements[2]*=l,Cn.elements[4]*=d,Cn.elements[5]*=d,Cn.elements[6]*=d,Cn.elements[8]*=m,Cn.elements[9]*=m,Cn.elements[10]*=m,e.setFromRotationMatrix(Cn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=wn,c=!1){const l=this.elements,d=2*r/(e-t),m=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s);let _,b;if(c)_=r/(o-r),b=o*r/(o-r);else if(a===wn)_=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===ds)_=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=m,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=wn,c=!1){const l=this.elements,d=2/(e-t),m=2/(n-s),u=-(e+t)/(e-t),p=-(n+s)/(n-s);let _,b;if(c)_=1/(o-r),b=o/(o-r);else if(a===wn)_=-2/(o-r),b=-(o+r)/(o-r);else if(a===ds)_=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=m,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Co.prototype.isMatrix4=!0;let ge=Co;const Zi=new O,Cn=new ge,Gu=new O(0,0,0),ku=new O(1,1,1),pi=new O,ir=new O,_n=new O,Ll=new ge,Il=new pn;class On{constructor(t=0,e=0,n=0,s=On.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],m=s[2],u=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(he(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-he(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(he(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-he(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(he(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-he(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Jt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ll.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ll,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Il.setFromEuler(this),this.setFromQuaternion(Il,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}On.DEFAULT_ORDER="XYZ";class Go{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hu=0;const Nl=new O,Ki=new pn,Qn=new ge,sr=new O,As=new O,Vu=new O,Wu=new pn,Ul=new O(1,0,0),Fl=new O(0,1,0),Ol=new O(0,0,1),Bl={type:"added"},Xu={type:"removed"},Ji={type:"childadded",child:null},ea={type:"childremoved",child:null};class ke extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=_s(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new O,e=new On,n=new pn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Qt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.premultiply(Ki),this}rotateX(t){return this.rotateOnAxis(Ul,t)}rotateY(t){return this.rotateOnAxis(Fl,t)}rotateZ(t){return this.rotateOnAxis(Ol,t)}translateOnAxis(t,e){return Nl.copy(t).applyQuaternion(this.quaternion),this.position.add(Nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ul,t)}translateY(t){return this.translateOnAxis(Fl,t)}translateZ(t){return this.translateOnAxis(Ol,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sr.copy(t):sr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(As,sr,this.up):Qn.lookAt(sr,As,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix(Qn),this.quaternion.premultiply(Ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bl),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):Se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xu),ea.child=t,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bl),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,Vu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,Wu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const m=c[l];r(t.shapes,m)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),m=o(t.shapes),u=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),m.length>0&&(n.shapes=m),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ke.DEFAULT_UP=new O(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vn extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yu={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const b of t.hand.values()){const f=e.getJointPose(b,n),g=this._getHandJoint(l,b);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}const d=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],u=d.position.distanceTo(m.position),p=.02,_=.005;l.inputState.pinching&&u>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yu)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const bh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},rr={h:0,s:0,l:0};function na(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ie{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=an){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,me.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=me.workingColorSpace){return this.r=t,this.g=e,this.b=n,me.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=me.workingColorSpace){if(t=nl(t,1),e=he(e,0,1),n=he(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=na(o,r,t+1/3),this.g=na(o,r,t),this.b=na(o,r,t-1/3)}return me.colorSpaceToWorking(this,s),this}setStyle(t,e=an){function n(r){r!==void 0&&parseFloat(r)<1&&Jt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Jt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Jt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=an){const n=bh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Jt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oi(t.r),this.g=oi(t.g),this.b=oi(t.b),this}copyLinearToSRGB(t){return this.r=cs(t.r),this.g=cs(t.g),this.b=cs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=an){return me.workingToColorSpace(en.copy(this),t),Math.round(he(en.r*255,0,255))*65536+Math.round(he(en.g*255,0,255))*256+Math.round(he(en.b*255,0,255))}getHexString(t=an){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=me.workingColorSpace){me.workingToColorSpace(en.copy(this),e);const n=en.r,s=en.g,r=en.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const m=o-a;switch(l=d<=.5?m/(o+a):m/(2-o-a),o){case n:c=(s-r)/m+(s<r?6:0);break;case s:c=(r-n)/m+2;break;case r:c=(n-s)/m+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=me.workingColorSpace){return me.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=an){me.workingToColorSpace(en.copy(this),t);const e=en.r,n=en.g,s=en.b;return t!==an?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(mi),this.setHSL(mi.h+t,mi.s+e,mi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(mi),t.getHSL(rr);const n=Ws(mi.h,rr.h,e),s=Ws(mi.s,rr.s,e),r=Ws(mi.l,rr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new ie;ie.NAMES=bh;class ko{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ie(t),this.density=e}clone(){return new ko(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Eh extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Pn=new O,jn=new O,ia=new O,ti=new O,$i=new O,Qi=new O,zl=new O,sa=new O,ra=new O,oa=new O,aa=new Ie,la=new Ie,ca=new Ie;class Tn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Pn.subVectors(t,e),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Pn.subVectors(s,e),jn.subVectors(n,e),ia.subVectors(t,e);const o=Pn.dot(Pn),a=Pn.dot(jn),c=Pn.dot(ia),l=jn.dot(jn),d=jn.dot(ia),m=o*l-a*a;if(m===0)return r.set(0,0,0),null;const u=1/m,p=(l*c-a*d)*u,_=(o*d-a*c)*u;return r.set(1-p-_,_,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ti.x),c.addScaledVector(o,ti.y),c.addScaledVector(a,ti.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return aa.setScalar(0),la.setScalar(0),ca.setScalar(0),aa.fromBufferAttribute(t,e),la.fromBufferAttribute(t,n),ca.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(aa,r.x),o.addScaledVector(la,r.y),o.addScaledVector(ca,r.z),o}static isFrontFacing(t,e,n,s){return Pn.subVectors(n,e),jn.subVectors(t,e),Pn.cross(jn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Pn.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;$i.subVectors(s,n),Qi.subVectors(r,n),sa.subVectors(t,n);const c=$i.dot(sa),l=Qi.dot(sa);if(c<=0&&l<=0)return e.copy(n);ra.subVectors(t,s);const d=$i.dot(ra),m=Qi.dot(ra);if(d>=0&&m<=d)return e.copy(s);const u=c*m-d*l;if(u<=0&&c>=0&&d<=0&&c-d>0)return o=c/(c-d),e.copy(n).addScaledVector($i,o);oa.subVectors(t,r);const p=$i.dot(oa),_=Qi.dot(oa);if(_>=0&&p<=_)return e.copy(r);const b=p*l-c*_;if(b<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(Qi,a);const f=d*_-p*m;if(f<=0&&m-d>=0&&p-_>=0)return zl.subVectors(r,s),a=(m-d)/(m-d+(p-_)),e.copy(s).addScaledVector(zl,a);const g=1/(f+b+u);return o=b*g,a=u*g,e.copy(n).addScaledVector($i,o).addScaledVector(Qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class bi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ws),ar.subVectors(this.max,ws),ji.subVectors(t.a,ws),ts.subVectors(t.b,ws),es.subVectors(t.c,ws),gi.subVectors(ts,ji),_i.subVectors(es,ts),Ci.subVectors(ji,es);let e=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Ci.z,Ci.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Ci.z,0,-Ci.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Ci.y,Ci.x,0];return!ha(e,ji,ts,es,ar)||(e=[1,0,0,0,1,0,0,0,1],!ha(e,ji,ts,es,ar))?!1:(lr.crossVectors(gi,_i),e=[lr.x,lr.y,lr.z],ha(e,ji,ts,es,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ei=[new O,new O,new O,new O,new O,new O,new O,new O],Dn=new O,or=new bi,ji=new O,ts=new O,es=new O,gi=new O,_i=new O,Ci=new O,ws=new O,ar=new O,lr=new O,Pi=new O;function ha(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Pi.fromArray(i,r);const a=s.x*Math.abs(Pi.x)+s.y*Math.abs(Pi.y)+s.z*Math.abs(Pi.z),c=t.dot(Pi),l=e.dot(Pi),d=n.dot(Pi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const Ge=new O,cr=new It;let qu=0;class hn extends hi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ph,this.updateRanges=[],this.gpuType=An,this.version=0,this._normalizationScale=t!==void 0?il(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):xh(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):vh(t,this.array)}}class rl extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ol extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Re extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Zu=new bi,Rs=new O,ua=new O;class Ei{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Zu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ua.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(ua)),this.expandByPoint(Rs.copy(t.center).sub(ua))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Ku=0;const yn=new ge,fa=new ke,ns=new O,xn=new bi,Cs=new bi,Ze=new O;class We extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=_s(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vu(t)?ol:rl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,n){return yn.makeTranslation(t,e,n),this.applyMatrix4(yn),this}scale(t,e,n){return yn.makeScale(t,e,n),this.applyMatrix4(yn),this}lookAt(t){return fa.lookAt(t),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Jt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(xn.min,Cs.min),xn.expandByPoint(Ze),Ze.addVectors(xn.max,Cs.max),xn.expandByPoint(Ze)):(xn.expandByPoint(Cs.min),xn.expandByPoint(Cs.max))}xn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Ze.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(t,l),Ze.add(ns)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new hn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let P=0;P<n.count;P++)a[P]=new O,c[P]=new O;const d=new O,m=new O,u=new O,p=new It,_=new It,b=new It,f=new O,g=new O;function S(P,C,w){l[P]=l[C]=l[w]=1,d.fromBufferAttribute(n,P),m.fromBufferAttribute(n,C),u.fromBufferAttribute(n,w),p.fromBufferAttribute(r,P),_.fromBufferAttribute(r,C),b.fromBufferAttribute(r,w),m.sub(d),u.sub(d),_.sub(p),b.sub(p);const L=1/(_.x*b.y-b.x*_.y);isFinite(L)&&(f.copy(m).multiplyScalar(b.y).addScaledVector(u,-_.y).multiplyScalar(L),g.copy(u).multiplyScalar(_.x).addScaledVector(m,-b.x).multiplyScalar(L),a[P].add(f),a[C].add(f),a[w].add(f),c[P].add(g),c[C].add(g),c[w].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,C=T.length;P<C;++P){const w=T[P],L=w.start,B=w.count;for(let I=L,H=L+B;I<H;I+=3)S(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const E=new O,M=new O,x=new O,h=new O;function v(P){x.fromBufferAttribute(s,P),h.copy(x);const C=a[P];E.copy(C),E.sub(x.multiplyScalar(x.dot(C))).normalize(),M.crossVectors(h,C);const L=M.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,L)}for(let P=0,C=n.count;P<C;++P)l[P]&&v(P);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,d=new O,m=new O;if(t)for(let u=0,p=t.count;u<p;u+=3){const _=t.getX(u+0),b=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,b),o.fromBufferAttribute(e,f),d.subVectors(o,r),m.subVectors(s,r),d.cross(m),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,f),a.add(d),c.add(d),l.add(d),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),d.subVectors(o,r),m.subVectors(s,r),d.cross(m),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,c){const l=a.array,d=a.itemSize,m=a.normalized,u=new l.constructor(c.length*d);let p=0,_=0;for(let b=0,f=c.length;b<f;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*d;for(let g=0;g<d;g++)u[_++]=l[p++]}return new hn(u,d,m)}if(this.index===null)return Jt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let d=0,m=l.length;d<m;d++){const u=l[d],p=t(u,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let m=0,u=l.length;m<u;m++){const p=l[m];d.push(p.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],m=r[l];for(let u=0,p=m.length;u<p;u++)d.push(m[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,d=o.length;l<d;l++){const m=o[l];this.addGroup(m.start,m.count,m.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const da=new O,Ju=new O,$u=new Qt;class Wn{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=da.subVectors(n,e).cross(Ju.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(da),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||$u.getNormalMatrix(t),s=this.coplanarPoint(da).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Qu=0;class Ti extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=_s(),this.name="",this.type="Material",this.blending=ls,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Oa,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Nr,this.stencilZFail=Nr,this.stencilZPass=Nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Jt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Jt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ie().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Wn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ni=new O,pa=new O,hr=new O,ur=new O;class xs{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){pa.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),ur.copy(this.origin).sub(pa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(hr),a=ur.dot(this.direction),c=-ur.dot(hr),l=ur.lengthSq(),d=Math.abs(1-o*o);let m,u,p,_;if(d>0)if(m=o*c-a,u=o*a-c,_=r*d,m>=0)if(u>=-_)if(u<=_){const b=1/d;m*=b,u*=b,p=m*(m+o*u+2*a)+u*(o*m+u+2*c)+l}else u=r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;else u=-r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;else u<=-_?(m=Math.max(0,-(-o*r+a)),u=m>0?-r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l):u<=_?(m=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(m=Math.max(0,-(o*r+a)),u=m>0?r:Math.min(Math.max(-r,-c),r),p=-m*m+u*(u+2*c)+l);else u=o>0?-r:r,m=Math.max(0,-(o*u+a)),p=-m*m+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(pa).addScaledVector(hr,u),p}intersectSphere(t,e){if(t.radius<0)return null;ni.subVectors(t.center,this.origin);const n=ni.dot(this.direction),s=ni.dot(ni)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,m=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,o=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,o=(t.min.y-u.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),m>=0?(a=(t.min.z-u.z)*m,c=(t.max.z-u.z)*m):(a=(t.max.z-u.z)*m,c=(t.min.z-u.z)*m),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,d=a.z,m=t.x-o.x,u=t.y-o.y,p=t.z-o.z,_=e.x-o.x,b=e.y-o.y,f=e.z-o.z,g=n.x-o.x,S=n.y-o.y,T=n.z-o.z,E=Math.abs(c),M=Math.abs(l),x=Math.abs(d);let h,v,P,C,w,L,B,I,H,U,W,at;if(E>=M&&E>=x?(P=c,L=m,H=_,at=g,c>=0?(h=l,v=d,C=u,w=p,B=b,I=f,U=S,W=T):(h=d,v=l,C=p,w=u,B=f,I=b,U=T,W=S)):M>=x?(P=l,L=u,H=b,at=S,l>=0?(h=d,v=c,C=p,w=m,B=f,I=_,U=T,W=g):(h=c,v=d,C=m,w=p,B=_,I=f,U=g,W=T)):(P=d,L=p,H=f,at=T,d>=0?(h=c,v=l,C=m,w=u,B=_,I=b,U=g,W=S):(h=l,v=c,C=u,w=m,B=b,I=_,U=S,W=g)),P===0)return null;const $=h/P,j=v/P,ht=1/P,St=C-$*L,At=w-j*L,et=B-$*H,xt=I-j*H,wt=U-$*at,Lt=W-j*at,ft=wt*xt-Lt*et,Ot=St*Lt-At*wt,Ee=et*At-xt*St;if(s){if(ft<0||Ot<0||Ee<0)return null}else if((ft<0||Ot<0||Ee<0)&&(ft>0||Ot>0||Ee>0))return null;const Vt=ft+Ot+Ee;if(Vt===0)return null;const de=ht*(ft*L+Ot*H+Ee*at);return(Vt>0?de<0:de>0)?null:this.at(de/Vt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xn extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=Ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Gl=new ge,Di=new xs,fr=new Ei,kl=new O,dr=new O,pr=new O,mr=new O,ma=new O,gr=new O,Hl=new O,_r=new O;class ye extends ke{constructor(t=new We,e=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){gr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=a[c],m=r[c];d!==0&&(ma.fromBufferAttribute(m,t),o?gr.addScaledVector(ma,d):gr.addScaledVector(ma.sub(e),d))}e.add(gr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(r),Di.copy(t.ray).recast(t.near),!(fr.containsPoint(Di.origin)===!1&&(Di.intersectSphere(fr,kl)===null||Di.origin.distanceToSquared(kl)>(t.far-t.near)**2))&&(Gl.copy(r).invert(),Di.copy(t.ray).applyMatrix4(Gl),!(n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Di)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,m=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,b=u.length;_<b;_++){const f=u[_],g=o[f.materialIndex],S=Math.max(f.start,p.start),T=Math.min(a.count,Math.min(f.start+f.count,p.start+p.count));for(let E=S,M=T;E<M;E+=3){const x=a.getX(E),h=a.getX(E+1),v=a.getX(E+2);s=xr(this,g,t,n,l,d,m,x,h,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let f=_,g=b;f<g;f+=3){const S=a.getX(f),T=a.getX(f+1),E=a.getX(f+2);s=xr(this,o,t,n,l,d,m,S,T,E),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,b=u.length;_<b;_++){const f=u[_],g=o[f.materialIndex],S=Math.max(f.start,p.start),T=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));for(let E=S,M=T;E<M;E+=3){const x=E,h=E+1,v=E+2;s=xr(this,g,t,n,l,d,m,x,h,v),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{const _=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let f=_,g=b;f<g;f+=3){const S=f,T=f+1,E=f+2;s=xr(this,o,t,n,l,d,m,S,T,E),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}}function ju(i,t,e,n,s,r,o,a){let c;if(t.side===cn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Mi,a),c===null)return null;_r.copy(a),_r.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(_r);return l<e.near||l>e.far?null:{distance:l,point:_r.clone(),object:i}}function xr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,dr),i.getVertexPosition(c,pr),i.getVertexPosition(l,mr);const d=ju(i,t,e,n,dr,pr,mr,Hl);if(d){const m=new O;Tn.getBarycoord(Hl,dr,pr,mr,m),s&&(d.uv=Tn.getInterpolatedAttribute(s,a,c,l,m,new It)),r&&(d.uv1=Tn.getInterpolatedAttribute(r,a,c,l,m,new It)),o&&(d.normal=Tn.getInterpolatedAttribute(o,a,c,l,m,new O),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new O,materialIndex:0};Tn.getNormal(dr,pr,mr,u.normal),d.face=u,d.barycoord=m}return d}class al extends $e{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ke,d=Ke,m,u){super(null,o,a,c,l,d,s,r,m,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ca extends hn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const is=new ge,Vl=new ge,vr=[],Wl=new bi,tf=new ge,Ps=new ye,Ds=new Ei;class ll extends ye{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ca(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,tf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new bi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Wl.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(Wl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ei),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Ds.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ps.geometry=this.geometry,Ps.material=this.material,Ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ds.copy(this.boundingSphere),Ds.applyMatrix4(n),t.ray.intersectsSphere(Ds)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),Vl.multiplyMatrices(n,is),Ps.matrixWorld=Vl,Ps.raycast(t,vr);for(let o=0,a=vr.length;o<a;o++){const c=vr[o];c.instanceId=r,c.object=this,e.push(c)}vr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ca(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new al(new Float32Array(s*this.count),s,this.count,Uo,An));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Li=new Ei,ef=new It(.5,.5),Mr=new O;class ps{constructor(t=new Wn,e=new Wn,n=new Wn,s=new Wn,r=new Wn,o=new Wn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],m=r[5],u=r[6],p=r[7],_=r[8],b=r[9],f=r[10],g=r[11],S=r[12],T=r[13],E=r[14],M=r[15];if(s[0].setComponents(l-o,p-d,g-_,M-S).normalize(),s[1].setComponents(l+o,p+d,g+_,M+S).normalize(),s[2].setComponents(l+a,p+m,g+b,M+T).normalize(),s[3].setComponents(l-a,p-m,g-b,M-T).normalize(),n)s[4].setComponents(c,u,f,E).normalize(),s[5].setComponents(l-c,p-u,g-f,M-E).normalize();else if(s[4].setComponents(l-c,p-u,g-f,M-E).normalize(),e===wn)s[5].setComponents(l+c,p+u,g+f,M+E).normalize();else if(e===ds)s[5].setComponents(c,u,f,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);const e=ef.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Mr.x=s.normal.x>0?t.max.x:t.min.x,Mr.y=s.normal.y>0?t.max.y:t.min.y,Mr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Xl=new ge;class Ho{constructor(){this.coordinateSystem=wn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];Xl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ps),n[s].setFromProjectionMatrix(Xl,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new ps),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Ho().copy(this)}}class cl extends Ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const To=new O,Ao=new O,Yl=new ge,Ls=new xs,Sr=new Ei,ga=new O,ql=new O;class Th extends ke{constructor(t=new We,e=new cl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)To.fromBufferAttribute(e,s-1),Ao.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=To.distanceTo(Ao);t.setAttribute("lineDistance",new Re(n,1))}else Jt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(s),Sr.radius+=r,t.ray.intersectsSphere(Sr)===!1)return;Yl.copy(s).invert(),Ls.copy(t.ray).applyMatrix4(Yl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const p=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let b=p,f=_-1;b<f;b+=l){const g=d.getX(b),S=d.getX(b+1),T=yr(this,t,Ls,c,g,S,b);T&&e.push(T)}if(this.isLineLoop){const b=d.getX(_-1),f=d.getX(p),g=yr(this,t,Ls,c,b,f,_-1);g&&e.push(g)}}else{const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let b=p,f=_-1;b<f;b+=l){const g=yr(this,t,Ls,c,b,b+1,b);g&&e.push(g)}if(this.isLineLoop){const b=yr(this,t,Ls,c,_-1,p,_-1);b&&e.push(b)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function yr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(To.fromBufferAttribute(a,s),Ao.fromBufferAttribute(a,r),e.distanceSqToSegment(To,Ao,ga,ql)>n)return;ga.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ga);if(!(l<t.near||l>t.far))return{distance:l,point:ql.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Zl=new O,Kl=new O;class Ah extends Th{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Zl.fromBufferAttribute(e,s),Kl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zl.distanceTo(Kl);t.setAttribute("lineDistance",new Re(n,1))}else Jt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class hl extends Ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Jl=new ge,Pa=new xs,br=new Ei,Er=new O;class wh extends ke{constructor(t=new We,e=new hl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(s),br.radius+=r,t.ray.intersectsSphere(br)===!1)return;Jl.copy(s).invert(),Pa.copy(t.ray).applyMatrix4(Jl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,m=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let _=u,b=p;_<b;_++){const f=l.getX(_);Er.fromBufferAttribute(m,f),$l(Er,f,c,s,t,e,this)}}else{const u=Math.max(0,o.start),p=Math.min(m.count,o.start+o.count);for(let _=u,b=p;_<b;_++)Er.fromBufferAttribute(m,_),$l(Er,_,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function $l(i,t,e,n,s,r,o){const a=Pa.distanceSqToPoint(i);if(a<e){const c=new O;Pa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ul extends $e{constructor(t=[],e=zi,n,s,r,o,a,c,l,d){super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Da extends $e{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ki extends $e{constructor(t,e,n=Un,s,r,o,a=Ke,c=Ke,l,d=li,m=1){if(d!==li&&d!==ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:m};super(u,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new zo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class fl extends ki{constructor(t,e=Un,n=zi,s,r,o=Ke,a=Ke,c,l=li){const d={width:t,height:t,depth:1},m=[d,d,d,d,d,d];super(t,t,e,n,s,r,o,a,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class dl extends $e{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ve extends We{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],d=[],m=[];let u=0,p=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,s,o,2),_("x","z","y",1,-1,t,n,-e,s,o,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(m,2));function _(b,f,g,S,T,E,M,x,h,v,P){const C=E/h,w=M/v,L=E/2,B=M/2,I=x/2,H=h+1,U=v+1;let W=0,at=0;const $=new O;for(let j=0;j<U;j++){const ht=j*w-B;for(let St=0;St<H;St++){const At=St*C-L;$[b]=At*S,$[f]=ht*T,$[g]=I,l.push($.x,$.y,$.z),$[b]=0,$[f]=0,$[g]=x>0?1:-1,d.push($.x,$.y,$.z),m.push(St/h),m.push(1-j/v),W+=1}}for(let j=0;j<v;j++)for(let ht=0;ht<h;ht++){const St=u+ht+H*j,At=u+ht+H*(j+1),et=u+(ht+1)+H*(j+1),xt=u+(ht+1)+H*j;c.push(St,At,xt),c.push(At,et,xt),at+=6}a.addGroup(p,at,P),p+=at,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Rn extends We{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],m=[],u=[],p=[];let _=0;const b=[],f=n/2;let g=0;S(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(p,2));function S(){const E=new O,M=new O;let x=0;const h=(e-t)/n;for(let v=0;v<=r;v++){const P=[],C=v/r,w=C*(e-t)+t;for(let L=0;L<=s;L++){const B=L/s,I=B*c+a,H=Math.sin(I),U=Math.cos(I);M.x=w*H,M.y=-C*n+f,M.z=w*U,m.push(M.x,M.y,M.z),E.set(H,h,U).normalize(),u.push(E.x,E.y,E.z),p.push(B,1-C),P.push(_++)}b.push(P)}for(let v=0;v<s;v++)for(let P=0;P<r;P++){const C=b[P][v],w=b[P+1][v],L=b[P+1][v+1],B=b[P][v+1];(t>0||P!==0)&&(d.push(C,w,B),x+=3),(e>0||P!==r-1)&&(d.push(w,L,B),x+=3)}l.addGroup(g,x,0),g+=x}function T(E){const M=_,x=new It,h=new O;let v=0;const P=E===!0?t:e,C=E===!0?1:-1;for(let L=1;L<=s;L++)m.push(0,f*C,0),u.push(0,C,0),p.push(.5,.5),_++;const w=_;for(let L=0;L<=s;L++){const I=L/s*c+a,H=Math.cos(I),U=Math.sin(I);h.x=P*U,h.y=f*C,h.z=P*H,m.push(h.x,h.y,h.z),u.push(0,C,0),x.x=H*.5+.5,x.y=U*.5*C+.5,p.push(x.x,x.y),_++}for(let L=0;L<s;L++){const B=M+L,I=w+L;E===!0?d.push(I,I+1,B):d.push(I+1,I,B),v+=3}l.addGroup(g,v,E===!0?1:2),g+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Kn extends Rn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Kn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vo extends We{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),d(),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(r.slice(),3)),this.setAttribute("uv",new Re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const T=new O,E=new O,M=new O;for(let x=0;x<e.length;x+=3)p(e[x+0],T),p(e[x+1],E),p(e[x+2],M),c(T,E,M,S)}function c(S,T,E,M){const x=M+1,h=[];for(let v=0;v<=x;v++){h[v]=[];const P=S.clone().lerp(E,v/x),C=T.clone().lerp(E,v/x),w=x-v;for(let L=0;L<=w;L++)L===0&&v===x?h[v][L]=P:h[v][L]=P.clone().lerp(C,L/w)}for(let v=0;v<x;v++)for(let P=0;P<2*(x-v)-1;P++){const C=Math.floor(P/2);P%2===0?(u(h[v][C+1]),u(h[v+1][C]),u(h[v][C])):(u(h[v][C+1]),u(h[v+1][C+1]),u(h[v+1][C]))}}function l(S){const T=new O;for(let E=0;E<r.length;E+=3)T.x=r[E+0],T.y=r[E+1],T.z=r[E+2],T.normalize().multiplyScalar(S),r[E+0]=T.x,r[E+1]=T.y,r[E+2]=T.z}function d(){const S=new O;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];const E=f(S)/2/Math.PI+.5,M=g(S)/Math.PI+.5;o.push(E,1-M)}_(),m()}function m(){for(let S=0;S<o.length;S+=6){const T=o[S+0],E=o[S+2],M=o[S+4],x=Math.max(T,E,M),h=Math.min(T,E,M);x>.9&&h<.1&&(T<.2&&(o[S+0]+=1),E<.2&&(o[S+2]+=1),M<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function p(S,T){const E=S*3;T.x=t[E+0],T.y=t[E+1],T.z=t[E+2]}function _(){const S=new O,T=new O,E=new O,M=new O,x=new It,h=new It,v=new It;for(let P=0,C=0;P<r.length;P+=9,C+=6){S.set(r[P+0],r[P+1],r[P+2]),T.set(r[P+3],r[P+4],r[P+5]),E.set(r[P+6],r[P+7],r[P+8]),x.set(o[C+0],o[C+1]),h.set(o[C+2],o[C+3]),v.set(o[C+4],o[C+5]),M.copy(S).add(T).add(E).divideScalar(3);const w=f(M);b(x,C+0,S,w),b(h,C+2,T,w),b(v,C+4,E,w)}}function b(S,T,E,M){M<0&&S.x===1&&(o[T]=S.x-1),E.x===0&&E.z===0&&(o[T]=M/2/Math.PI+.5)}function f(S){return Math.atan2(S.z,-S.x)}function g(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.vertices,t.indices,t.radius,t.detail)}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Jt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const d=n[s],u=n[s+1]-d,p=(o-d)/u;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new It:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new O,s=[],r=[],o=[],a=new O,c=new ge;for(let p=0;p<=t;p++){const _=p/t;s[p]=this.getTangentAt(_,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const d=Math.abs(s[0].x),m=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=l&&(l=d,n.set(1,0,0)),m<=l&&(l=m,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(he(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,_))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(he(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],p*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class pl extends Jn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new It){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),m=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*d-p*m+this.aX,l=u*m+p*d+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Rh extends pl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ml(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,d,m){let u=(o-r)/l-(a-r)/(l+d)+(a-o)/d,p=(a-o)/d-(c-o)/(d+m)+(c-a)/m;u*=d,p*=d,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Ql=new O,jl=new O,_a=new ml,xa=new ml,va=new ml;class Ch extends Jn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,d;this.closed||a>0?l=s[(a-1)%r]:(jl.subVectors(s[0],s[1]).add(s[0]),l=jl);const m=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(Ql.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Ql),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(m),p),b=Math.pow(m.distanceToSquared(u),p),f=Math.pow(u.distanceToSquared(d),p);b<1e-4&&(b=1),_<1e-4&&(_=b),f<1e-4&&(f=b),_a.initNonuniformCatmullRom(l.x,m.x,u.x,d.x,_,b,f),xa.initNonuniformCatmullRom(l.y,m.y,u.y,d.y,_,b,f),va.initNonuniformCatmullRom(l.z,m.z,u.z,d.z,_,b,f)}else this.curveType==="catmullrom"&&(_a.initCatmullRom(l.x,m.x,u.x,d.x,this.tension),xa.initCatmullRom(l.y,m.y,u.y,d.y,this.tension),va.initCatmullRom(l.z,m.z,u.z,d.z,this.tension));return n.set(_a.calc(c),xa.calc(c),va.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function tc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function nf(i,t){const e=1-i;return e*e*t}function sf(i,t){return 2*(1-i)*i*t}function rf(i,t){return i*i*t}function Xs(i,t,e,n){return nf(i,t)+sf(i,e)+rf(i,n)}function of(i,t){const e=1-i;return e*e*e*t}function af(i,t){const e=1-i;return 3*e*e*i*t}function lf(i,t){return 3*(1-i)*i*i*t}function cf(i,t){return i*i*i*t}function Ys(i,t,e,n,s){return of(i,t)+af(i,e)+lf(i,n)+cf(i,s)}class Ph extends Jn{constructor(t=new It,e=new It,n=new It,s=new It){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new It){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ys(t,s.x,r.x,o.x,a.x),Ys(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dh extends Jn{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ys(t,s.x,r.x,o.x,a.x),Ys(t,s.y,r.y,o.y,a.y),Ys(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lh extends Jn{constructor(t=new It,e=new It){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new It){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new It){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ih extends Jn{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nh extends Jn{constructor(t=new It,e=new It,n=new It){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new It){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xs(t,s.x,r.x,o.x),Xs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gl extends Jn{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xs(t,s.x,r.x,o.x),Xs(t,s.y,r.y,o.y),Xs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uh extends Jn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new It){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],d=s[o>s.length-2?s.length-1:o+1],m=s[o>s.length-3?s.length-1:o+2];return n.set(tc(a,c.x,l.x,d.x,m.x),tc(a,c.y,l.y,d.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new It().fromArray(s))}return this}}var hf=Object.freeze({__proto__:null,ArcCurve:Rh,CatmullRomCurve3:Ch,CubicBezierCurve:Ph,CubicBezierCurve3:Dh,EllipseCurve:pl,LineCurve:Lh,LineCurve3:Ih,QuadraticBezierCurve:Nh,QuadraticBezierCurve3:gl,SplineCurve:Uh});class Wo extends Vo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Wo(t.radius,t.detail)}}class ci extends We{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,m=t/a,u=e/c,p=[],_=[],b=[],f=[];for(let g=0;g<d;g++){const S=g*u-o;for(let T=0;T<l;T++){const E=T*m-r;_.push(E,-S,0),b.push(0,0,1),f.push(T/a),f.push(1-g/c)}}for(let g=0;g<c;g++)for(let S=0;S<a;S++){const T=S+l*g,E=S+l*(g+1),M=S+1+l*(g+1),x=S+1+l*g;p.push(T,E,x),p.push(E,M,x)}this.setIndex(p),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(b,3)),this.setAttribute("uv",new Re(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.width,t.height,t.widthSegments,t.heightSegments)}}class js extends We{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],d=[];let m=t;const u=(e-t)/s,p=new O,_=new It;for(let b=0;b<=s;b++){for(let f=0;f<=n;f++){const g=r+f/n*o;p.x=m*Math.cos(g),p.y=m*Math.sin(g),c.push(p.x,p.y,p.z),l.push(0,0,1),_.x=(p.x/e+1)/2,_.y=(p.y/e+1)/2,d.push(_.x,_.y)}m+=u}for(let b=0;b<s;b++){const f=b*(n+1);for(let g=0;g<n;g++){const S=g+f,T=S,E=S+n+1,M=S+n+2,x=S+1;a.push(T,E,x),a.push(E,M,x)}}this.setIndex(a),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new js(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class vi extends We{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const d=[],m=new O,u=new O,p=[],_=[],b=[],f=[];for(let g=0;g<=n;g++){const S=[],T=g/n,E=o+T*a,M=t*Math.cos(E),x=Math.sqrt(t*t-M*M);let h=0;g===0&&o===0?h=.5/e:g===n&&c===Math.PI&&(h=-.5/e);for(let v=0;v<=e;v++){const P=v/e,C=s+P*r;m.x=-x*Math.cos(C),m.y=M,m.z=x*Math.sin(C),_.push(m.x,m.y,m.z),u.copy(m).normalize(),b.push(u.x,u.y,u.z),f.push(P+h,1-T),S.push(l++)}d.push(S)}for(let g=0;g<n;g++)for(let S=0;S<e;S++){const T=d[g][S+1],E=d[g][S],M=d[g+1][S],x=d[g+1][S+1];(g!==0||o>0)&&p.push(T,E,x),(g!==n-1||c<Math.PI)&&p.push(E,M,x)}this.setIndex(p),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(b,3)),this.setAttribute("uv",new Re(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ai extends We{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],m=[],u=new O,p=new O,_=new O;for(let b=0;b<=n;b++){const f=o+b/n*a;for(let g=0;g<=s;g++){const S=g/s*r;p.x=(t+e*Math.cos(f))*Math.cos(S),p.y=(t+e*Math.cos(f))*Math.sin(S),p.z=e*Math.sin(f),l.push(p.x,p.y,p.z),u.x=t*Math.cos(S),u.y=t*Math.sin(S),_.subVectors(p,u).normalize(),d.push(_.x,_.y,_.z),m.push(g/s),m.push(b/n)}}for(let b=1;b<=n;b++)for(let f=1;f<=s;f++){const g=(s+1)*b+f-1,S=(s+1)*(b-1)+f-1,T=(s+1)*(b-1)+f,E=(s+1)*b+f;c.push(g,S,E),c.push(S,T,E)}this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class _l extends We{constructor(t=new gl(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new O,c=new O,l=new It;let d=new O;const m=[],u=[],p=[],_=[];b(),this.setIndex(_),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(p,2));function b(){for(let T=0;T<e;T++)f(T);f(r===!1?e:0),S(),g()}function f(T){d=t.getPointAt(T/e,d);const E=o.normals[T],M=o.binormals[T];for(let x=0;x<=s;x++){const h=x/s*Math.PI*2,v=Math.sin(h),P=-Math.cos(h);c.x=P*E.x+v*M.x,c.y=P*E.y+v*M.y,c.z=P*E.z+v*M.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=d.x+n*c.x,a.y=d.y+n*c.y,a.z=d.z+n*c.z,m.push(a.x,a.y,a.z)}}function g(){for(let T=1;T<=e;T++)for(let E=1;E<=s;E++){const M=(s+1)*(T-1)+(E-1),x=(s+1)*T+(E-1),h=(s+1)*T+E,v=(s+1)*(T-1)+E;_.push(M,x,v),_.push(x,h,v)}}function S(){for(let T=0;T<=e;T++)for(let E=0;E<=s;E++)l.x=T/e,l.y=E/s,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _l(new hf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function ms(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(ec(s))s.isRenderTargetTexture?(Jt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ec(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function on(i){const t={};for(let e=0;e<i.length;e++){const n=ms(i[e]);for(const s in n)t[s]=n[s]}return t}function ec(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function uf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:me.workingColorSpace}const Oh={clone:ms,merge:on};var ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,df=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ff,this.fragmentShader=df,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ms(t.uniforms),this.uniformsGroups=uf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new ie().setHex(s.value);break;case"v2":this.uniforms[n].value=new It().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ge().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Bh extends yi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gs extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bo,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class zh extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gh extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class xl extends ke{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class kh extends xl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ma=new ge,nc=new O,ic=new O;class Hh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ps,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(nc),ic.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ic),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ma,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===ds||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Tr=new O,Ar=new pn,zn=new O;class vl extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Tr,Ar,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,Ar,zn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Tr,Ar,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tr,Ar,zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xi=new O,sc=new It,rc=new It;class En extends vl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Qs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qs*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xi.x,xi.y).multiplyScalar(-t/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-t/xi.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ml extends vl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class pf extends Hh{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class La extends xl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new pf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ss=-90,rs=1;class wo extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(ss,rs,t,e);s.layers=this.layers,this.add(s);const r=new En(ss,rs,t,e);r.layers=this.layers,this.add(r);const o=new En(ss,rs,t,e);o.layers=this.layers,this.add(o);const a=new En(ss,rs,t,e);a.layers=this.layers,this.add(a);const c=new En(ss,rs,t,e);c.layers=this.layers,this.add(c);const l=new En(ss,rs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,d]=this.children,m=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const b=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=b,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(m,u,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Vh extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const oc=new ge;class Wh{constructor(t,e,n=0,s=1/0){this.ray=new xs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return oc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(oc),this}intersectObject(t,e=!0,n=[]){return Ia(t,this,n,e),n.sort(ac),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ia(t[s],this,n,e);return n.sort(ac),n}}function ac(i,t){return i.distance-t.distance}function Ia(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ia(r[o],t,e,!0)}}class Na{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=he(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(he(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Xh extends hi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function lc(i,t,e,n){const s=mf(n);switch(e){case Ja:return i*t;case Uo:return i*t/s.components*s.byteLength;case Fo:return i*t/s.components*s.byteLength;case Si:return i*t*2/s.components*s.byteLength;case Oo:return i*t*2/s.components*s.byteLength;case $a:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case Bo:return i*t*4/s.components*s.byteLength;case Bs:case zs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Gs:case ks:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qr:case Kr:return Math.max(i,16)*Math.max(t,8)/4;case Yr:case Zr:return Math.max(i,8)*Math.max(t,8)/2;case Jr:case $r:case jr:case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qr:case Zs:case eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case io:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ro:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ao:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ho:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case fo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case _o:case xo:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Mo:case So:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ks:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function mf(i){switch(i){case dn:case Ya:return{byteLength:1,components:1};case fs:case qa:case Fn:return{byteLength:2,components:1};case Io:case No:return{byteLength:2,components:4};case Un:case Lo:case An:return{byteLength:4,components:1};case Za:case Ka:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Po}}));typeof window<"u"&&(window.__THREE__?Jt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Po);function Yh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function gf(i){const t=new WeakMap;function e(a,c){const l=a.array,d=a.usage,m=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:m}}function n(a,c,l){const d=c.array,m=c.updateRanges;if(i.bindBuffer(l,a),m.length===0)i.bufferSubData(l,0,d);else{m.sort((p,_)=>p.start-_.start);let u=0;for(let p=1;p<m.length;p++){const _=m[u],b=m[p];b.start<=_.start+_.count+1?_.count=Math.max(_.count,b.start+b.count-_.start):(++u,m[u]=b)}m.length=u+1;for(let p=0,_=m.length;p<_;p++){const b=m[p];i.bufferSubData(l,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var _f=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xf=`#ifdef USE_ALPHAHASH
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
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bf=`#ifdef USE_AOMAP
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
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tf=`#ifdef USE_BATCHING
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
#endif`,Af=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pf=`#ifdef USE_IRIDESCENCE
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
#endif`,Df=`#ifdef USE_BUMPMAP
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
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gf=`#define PI 3.141592653589793
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
} // validated`,kf=`vec3 transformedNormal = objectNormal;
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
#endif`,Hf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,id=`#ifdef USE_GRADIENTMAP
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
}`,sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ad=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dd=`PhysicalMaterial material;
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
#endif`,pd=`uniform sampler2D dfgLUT;
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
}`,md=`
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
#endif`,gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,vd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Md=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Td=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ad=`#if defined( USE_POINTS_UV )
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
#endif`,wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`#ifdef USE_MORPHTARGETS
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
#endif`,Id=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ud=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
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
#endif`,Gd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$d=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ep=`float getShadowMask() {
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
}`,np=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ip=`#ifdef USE_SKINNING
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
#endif`,sp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rp=`#ifdef USE_SKINNING
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
#endif`,op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
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
#endif`,up=`#ifdef USE_TRANSMISSION
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
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_p=`uniform sampler2D t2D;
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
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`uniform float backgroundBlurriness;
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
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
}`,bp=`#if DEPTH_PACKING == 3200
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
}`,Ep=`#define DISTANCE
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
}`,Tp=`#define DISTANCE
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
}`,Ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`uniform float scale;
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Pp=`#include <common>
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Lp=`#define LAMBERT
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
}`,Ip=`#define LAMBERT
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
}`,Np=`#define MATCAP
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
}`,Up=`#define MATCAP
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
}`,Fp=`#define NORMAL
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
}`,Op=`#define NORMAL
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
}`,Bp=`#define PHONG
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
}`,zp=`#define PHONG
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
}`,Gp=`#define STANDARD
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
}`,kp=`#define STANDARD
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
}`,Hp=`#define TOON
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
}`,Vp=`#define TOON
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
}`,Wp=`uniform float size;
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
}`,Xp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,qp=`uniform vec3 color;
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
}`,Zp=`uniform float rotation;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,ae={alphahash_fragment:_f,alphahash_pars_fragment:xf,alphamap_fragment:vf,alphamap_pars_fragment:Mf,alphatest_fragment:Sf,alphatest_pars_fragment:yf,aomap_fragment:bf,aomap_pars_fragment:Ef,batching_pars_vertex:Tf,batching_vertex:Af,begin_vertex:wf,beginnormal_vertex:Rf,bsdfs:Cf,iridescence_fragment:Pf,bumpmap_pars_fragment:Df,clipping_planes_fragment:Lf,clipping_planes_pars_fragment:If,clipping_planes_pars_vertex:Nf,clipping_planes_vertex:Uf,color_fragment:Ff,color_pars_fragment:Of,color_pars_vertex:Bf,color_vertex:zf,common:Gf,defaultnormal_vertex:kf,displacementmap_pars_vertex:Hf,displacementmap_vertex:Vf,emissivemap_fragment:Wf,emissivemap_pars_fragment:Xf,colorspace_fragment:Yf,colorspace_pars_fragment:qf,envmap_fragment:Zf,envmap_common_pars_fragment:Kf,envmap_pars_fragment:Jf,envmap_pars_vertex:$f,envmap_physical_pars_fragment:ld,envmap_vertex:Qf,fog_vertex:jf,fog_pars_vertex:td,fog_fragment:ed,fog_pars_fragment:nd,gradientmap_pars_fragment:id,lightmap_pars_fragment:sd,lights_lambert_fragment:rd,lights_lambert_pars_fragment:od,lights_pars_begin:ad,lights_toon_fragment:cd,lights_toon_pars_fragment:hd,lights_phong_fragment:ud,lights_phong_pars_fragment:fd,lights_physical_fragment:dd,lights_physical_pars_fragment:pd,lights_fragment_begin:md,lights_fragment_maps:gd,lights_fragment_end:_d,lightprobes_pars_fragment:xd,logdepthbuf_fragment:vd,logdepthbuf_pars_fragment:Md,logdepthbuf_pars_vertex:Sd,logdepthbuf_vertex:yd,map_fragment:bd,map_pars_fragment:Ed,map_particle_fragment:Td,map_particle_pars_fragment:Ad,metalnessmap_fragment:wd,metalnessmap_pars_fragment:Rd,morphinstance_vertex:Cd,morphcolor_vertex:Pd,morphnormal_vertex:Dd,morphtarget_pars_vertex:Ld,morphtarget_vertex:Id,normal_fragment_begin:Nd,normal_fragment_maps:Ud,normal_pars_fragment:Fd,normal_pars_vertex:Od,normal_vertex:Bd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Gd,clearcoat_normal_fragment_maps:kd,clearcoat_pars_fragment:Hd,iridescence_pars_fragment:Vd,opaque_fragment:Wd,packing:Xd,premultiplied_alpha_fragment:Yd,project_vertex:qd,dithering_fragment:Zd,dithering_pars_fragment:Kd,roughnessmap_fragment:Jd,roughnessmap_pars_fragment:$d,shadowmap_pars_fragment:Qd,shadowmap_pars_vertex:jd,shadowmap_vertex:tp,shadowmask_pars_fragment:ep,skinbase_vertex:np,skinning_pars_vertex:ip,skinning_vertex:sp,skinnormal_vertex:rp,specularmap_fragment:op,specularmap_pars_fragment:ap,tonemapping_fragment:lp,tonemapping_pars_fragment:cp,transmission_fragment:hp,transmission_pars_fragment:up,uv_pars_fragment:fp,uv_pars_vertex:dp,uv_vertex:pp,worldpos_vertex:mp,background_vert:gp,background_frag:_p,backgroundCube_vert:xp,backgroundCube_frag:vp,cube_vert:Mp,cube_frag:Sp,depth_vert:yp,depth_frag:bp,distance_vert:Ep,distance_frag:Tp,equirect_vert:Ap,equirect_frag:wp,linedashed_vert:Rp,linedashed_frag:Cp,meshbasic_vert:Pp,meshbasic_frag:Dp,meshlambert_vert:Lp,meshlambert_frag:Ip,meshmatcap_vert:Np,meshmatcap_frag:Up,meshnormal_vert:Fp,meshnormal_frag:Op,meshphong_vert:Bp,meshphong_frag:zp,meshphysical_vert:Gp,meshphysical_frag:kp,meshtoon_vert:Hp,meshtoon_frag:Vp,points_vert:Wp,points_frag:Xp,shadow_vert:Yp,shadow_frag:qp,sprite_vert:Zp,sprite_frag:Kp},Dt={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},Ln={basic:{uniforms:on([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:ae.meshbasic_vert,fragmentShader:ae.meshbasic_frag},lambert:{uniforms:on([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},envMapIntensity:{value:1}}]),vertexShader:ae.meshlambert_vert,fragmentShader:ae.meshlambert_frag},phong:{uniforms:on([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ae.meshphong_vert,fragmentShader:ae.meshphong_frag},standard:{uniforms:on([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag},toon:{uniforms:on([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)}}]),vertexShader:ae.meshtoon_vert,fragmentShader:ae.meshtoon_frag},matcap:{uniforms:on([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:ae.meshmatcap_vert,fragmentShader:ae.meshmatcap_frag},points:{uniforms:on([Dt.points,Dt.fog]),vertexShader:ae.points_vert,fragmentShader:ae.points_frag},dashed:{uniforms:on([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ae.linedashed_vert,fragmentShader:ae.linedashed_frag},depth:{uniforms:on([Dt.common,Dt.displacementmap]),vertexShader:ae.depth_vert,fragmentShader:ae.depth_frag},normal:{uniforms:on([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:ae.meshnormal_vert,fragmentShader:ae.meshnormal_frag},sprite:{uniforms:on([Dt.sprite,Dt.fog]),vertexShader:ae.sprite_vert,fragmentShader:ae.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ae.background_vert,fragmentShader:ae.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ae.backgroundCube_vert,fragmentShader:ae.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ae.cube_vert,fragmentShader:ae.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ae.equirect_vert,fragmentShader:ae.equirect_frag},distance:{uniforms:on([Dt.common,Dt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ae.distance_vert,fragmentShader:ae.distance_frag},shadow:{uniforms:on([Dt.lights,Dt.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:ae.shadow_vert,fragmentShader:ae.shadow_frag}};Ln.physical={uniforms:on([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ae.meshphysical_vert,fragmentShader:ae.meshphysical_frag};const wr={r:0,b:0,g:0},Jp=new ge,qh=new Qt;qh.set(-1,0,0,0,1,0,0,0,1);function $p(i,t,e,n,s,r){const o=new ie(0);let a=s===!0?0:1,c,l,d=null,m=0,u=null;function p(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const E=S.backgroundBlurriness>0;T=t.get(T,E)}return T}function _(S){let T=!1;const E=p(S);E===null?f(o,a):E&&E.isColor&&(f(E,1),T=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(S,T){const E=p(T);E&&E.isCubeTexture?(l===void 0&&(l=new ye(new Ve(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:ms(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,x,h){this.matrixWorld.copyPosition(h.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(T.backgroundRotation)).transpose(),E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(qh),l.material.toneMapped=me.getTransfer(E.colorSpace)!==we,(d!==E||m!==E.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,m=E.version,u=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new ye(new ci(2,2),new yi({name:"BackgroundMaterial",uniforms:ms(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=me.getTransfer(E.colorSpace)!==we,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||m!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=E,m=E.version,u=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,T){S.getRGB(wr,Fh(i)),e.buffers.color.setClear(wr.r,wr.g,wr.b,T,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),a=T,f(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,f(o,a)},render:_,addToRenderList:b,dispose:g}}function Qp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(w,L,B,I,H){let U=!1;const W=m(w,I,B,L);r!==W&&(r=W,l(r.object)),U=p(w,I,B,H),U&&_(w,I,B,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,E(w,L,B,I),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(w){return i.bindVertexArray(w)}function d(w){return i.deleteVertexArray(w)}function m(w,L,B,I){const H=I.wireframe===!0;let U=n[L.id];U===void 0&&(U={},n[L.id]=U);const W=w.isInstancedMesh===!0?w.id:0;let at=U[W];at===void 0&&(at={},U[W]=at);let $=at[B.id];$===void 0&&($={},at[B.id]=$);let j=$[H];return j===void 0&&(j=u(c()),$[H]=j),j}function u(w){const L=[],B=[],I=[];for(let H=0;H<e;H++)L[H]=0,B[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:I,object:w,attributes:{},index:null}}function p(w,L,B,I){const H=r.attributes,U=L.attributes;let W=0;const at=B.getAttributes();for(const $ in at)if(at[$].location>=0){const ht=H[$];let St=U[$];if(St===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),ht===void 0||ht.attribute!==St||St&&ht.data!==St.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function _(w,L,B,I){const H={},U=L.attributes;let W=0;const at=B.getAttributes();for(const $ in at)if(at[$].location>=0){let ht=U[$];ht===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(ht=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(ht=w.instanceColor));const St={};St.attribute=ht,ht&&ht.data&&(St.data=ht.data),H[$]=St,W++}r.attributes=H,r.attributesNum=W,r.index=I}function b(){const w=r.newAttributes;for(let L=0,B=w.length;L<B;L++)w[L]=0}function f(w){g(w,0)}function g(w,L){const B=r.newAttributes,I=r.enabledAttributes,H=r.attributeDivisors;B[w]=1,I[w]===0&&(i.enableVertexAttribArray(w),I[w]=1),H[w]!==L&&(i.vertexAttribDivisor(w,L),H[w]=L)}function S(){const w=r.newAttributes,L=r.enabledAttributes;for(let B=0,I=L.length;B<I;B++)L[B]!==w[B]&&(i.disableVertexAttribArray(B),L[B]=0)}function T(w,L,B,I,H,U,W){W===!0?i.vertexAttribIPointer(w,L,B,H,U):i.vertexAttribPointer(w,L,B,I,H,U)}function E(w,L,B,I){b();const H=I.attributes,U=B.getAttributes(),W=L.defaultAttributeValues;for(const at in U){const $=U[at];if($.location>=0){let j=H[at];if(j===void 0&&(at==="instanceMatrix"&&w.instanceMatrix&&(j=w.instanceMatrix),at==="instanceColor"&&w.instanceColor&&(j=w.instanceColor)),j!==void 0){const ht=j.normalized,St=j.itemSize,At=t.get(j);if(At===void 0)continue;const et=At.buffer,xt=At.type,wt=At.bytesPerElement,Lt=xt===i.INT||xt===i.UNSIGNED_INT||j.gpuType===Lo;if(j.isInterleavedBufferAttribute){const ft=j.data,Ot=ft.isInterleavedBuffer===!0?ft.stride:ft.itemSize,Ee=j.offset;if(ft.isInstancedInterleavedBuffer||ft.isInstancedBufferAttribute){for(let Vt=0;Vt<$.locationSize;Vt++)g($.location+Vt,ft.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Vt=0;Vt<$.locationSize;Vt++)f($.location+Vt);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Vt=0;Vt<$.locationSize;Vt++)T($.location+Vt,St/$.locationSize,xt,ht,Ot*wt,(Ee+St/$.locationSize*Vt)*wt,Lt)}else{if(j.isInstancedBufferAttribute){for(let ft=0;ft<$.locationSize;ft++)g($.location+ft,j.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ft=0;ft<$.locationSize;ft++)f($.location+ft);i.bindBuffer(i.ARRAY_BUFFER,et);for(let ft=0;ft<$.locationSize;ft++)T($.location+ft,St/$.locationSize,xt,ht,St*wt,St/$.locationSize*ft*wt,Lt)}}else if(W!==void 0){const ht=W[at];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv($.location,ht);break;case 3:i.vertexAttrib3fv($.location,ht);break;case 4:i.vertexAttrib4fv($.location,ht);break;default:i.vertexAttrib1fv($.location,ht)}}}}S()}function M(){P();for(const w in n){const L=n[w];for(const B in L){const I=L[B];for(const H in I){const U=I[H];for(const W in U)d(U[W].object),delete U[W];delete I[H]}}delete n[w]}}function x(w){if(n[w.id]===void 0)return;const L=n[w.id];for(const B in L){const I=L[B];for(const H in I){const U=I[H];for(const W in U)d(U[W].object),delete U[W];delete I[H]}}delete n[w.id]}function h(w){for(const L in n){const B=n[L];for(const I in B){const H=B[I];if(H[w.id]===void 0)continue;const U=H[w.id];for(const W in U)d(U[W].object),delete U[W];delete H[w.id]}}}function v(w){for(const L in n){const B=n[L],I=w.isInstancedMesh===!0?w.id:0,H=B[I];if(H!==void 0){for(const U in H){const W=H[U];for(const at in W)d(W[at].object),delete W[at];delete H[U]}delete B[I],Object.keys(B).length===0&&delete n[L]}}}function P(){C(),o=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:x,releaseStatesOfObject:v,releaseStatesOfProgram:h,initAttributes:b,enableAttribute:f,disableUnusedAttributes:S}}function jp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),e.update(l,n,d))}function a(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let p=0;p<d;p++)u+=l[p];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function tm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const h=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(h){return!(h!==In&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(h){const v=h===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(h!==dn&&h!==An&&!v&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Jt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&m===!1;e.reversedDepthBuffer===!0&&m===!1&&Jt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&m===!0&&Jt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),x=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:_,maxTextureSize:b,maxCubemapSize:f,maxAttributes:g,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:E,maxSamples:M,samples:x}}function em(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Wn,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const p=m.length!==0||u||n!==0||s;return s=u,n=m.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,u){e=d(m,u,0)},this.setState=function(m,u,p){const _=m.clippingPlanes,b=m.clipIntersection,f=m.clipShadows,g=i.get(m);if(!s||_===null||_.length===0||r&&!f)r?d(null):l();else{const S=r?0:n,T=S*4;let E=g.clippingState||null;c.value=E,E=d(_,u,T,p);for(let M=0;M!==T;++M)E[M]=e[M];g.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(m,u,p,_){const b=m!==null?m.length:0;let f=null;if(b!==0){if(f=c.value,_!==!0||f===null){const g=p+b*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(f===null||f.length<g)&&(f=new Float32Array(g));for(let T=0,E=p;T!==b;++T,E+=4)o.copy(m[T]).applyMatrix4(S,a),o.normal.toArray(f,E),f[E+3]=o.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,f}}class Xo extends Nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ul(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ve(5,5,5),r=new yi({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:Oi});r.uniforms.tEquirect.value=e;const o=new ye(s,r),a=e.minFilter;return e.minFilter===si&&(e.minFilter=ln),new wo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const cc=256,nm=3,im=20,Zh=256,Kh=16,sm=3,rm=new O,om=new ie;class tr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new wo(1,10,null),this._boxMesh=new ye(new Ve(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=rm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),d=this._getSourceTarget(!0);e>0&&(d.texture.mipmapsAutoUpdate=!1);const m=c.autoClear,u=c.autoClearColor,p=c.autoClearDepth,_=c.autoClearStencil,b=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,b===null&&(t.background=c.getClearColor(om));const f=new wo(n,s,d);return f.position.copy(a),f.update(c,t),c.autoClear=m,c.autoClearColor=u,c.autoClearDepth=p,c.autoClearStencil=_,t.background=b,e>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(cc,_h(t))}_fromTexture(t,e){t.mapping===zi||t.mapping===us?this._setSize(t.image.length===0?cc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=hc(t,!1,!1),n=Math.log2(t)-nm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=hc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===zi||t.mapping===us?(this._cubemapMaterial===null&&(this._cubemapMaterial=fc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=uc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=am(),this._integrationMaterial=lm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Kh);for(let o=0;o<=n;o++){const a=tr.lodToRoughness(o,n);if(o>n-sm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(Zh*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=cm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function hc(i,t,e){return new Xo(i,{minFilter:si,generateMipmaps:t,type:Fn,colorSpace:Js,depthBuffer:e})}function er(i,t,e){return new yi({name:i,uniforms:t,vertexShader:ae.cube_vert,fragmentShader:e,side:cn,blending:Oi,depthTest:!1,depthWrite:!1})}function am(){return er("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Zh}u

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
	`)}function lm(){return er("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Kh}},`

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
	`)}function cm(){return er("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${im}
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
	`)}function uc(){return er("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function fc(){return er("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?o(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Dr||p===Lr)if(t.has(u)){const _=t.get(u).texture;return a(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const b=new Xo(_.height);return b.fromEquirectangularTexture(i,u),t.set(u,b),u.addEventListener("dispose",l),a(b.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const p=u.mapping,_=p===Dr||p===Lr,b=p===zi||p===us;if(_||b){let f=e.get(u);const g=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new tr(i)),f=_?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{const S=u.image;return _&&S&&S.height>0||b&&S&&c(S)?(n===null&&(n=new tr(i)),f=_?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function a(u,p){return p===Dr?u.mapping=zi:p===Lr&&(u.mapping=us),u}function c(u){let p=0;const _=6;for(let b=0;b<_;b++)u[b]!==void 0&&p++;return p===_}function l(u){const p=u.target;p.removeEventListener("dispose",l);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function m(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function um(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Hs("WebGLRenderer: "+n+" extension not supported."),s}}}function fm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(_=>delete s[_]);function a(_){c(_.target)}function c(_){_.index!==null&&t.remove(_.index);for(const f in _.attributes)t.remove(_.attributes[f]);_.removeEventListener("dispose",a),delete s[_.id],o.unregister(_);const b=r.get(_);b&&(t.remove(b),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function l(_,b){return s[b.id]!==void 0||(b.addEventListener("dispose",a),s[b.id]=new WeakRef(b),o.register(b,b.id,b),e.memory.geometries++),b}function d(_){const b=_.attributes;for(const f in b)t.update(b[f],i.ARRAY_BUFFER)}function m(_){const b=_.index,f=_.attributes.position;let g=0;if(f===void 0)return;const S=b!==null?b.array.length:f.array.length/3-1,T=f.count>=65535?ol:rl,E=new T(Math.ceil(S/3)*6,1),M=E.array;if(b!==null){const h=b.array;g=b.version;for(let v=0,P=0;v<S;v+=3){const C=h[v+0],w=h[v+1],L=h[v+2];M[P++]=C,M[P++]=w,M[P++]=w,M[P++]=L,M[P++]=L,M[P++]=C}}else{g=f.version;for(let h=0,v=0;h<S;h+=3){const P=h+0,C=h+1,w=h+2;M[v++]=P,M[v++]=C,M[v++]=C,M[v++]=w,M[v++]=w,M[v++]=P}}E.version=g;const x=r.get(_);x&&t.remove(x),r.set(_,E)}function u(_){const b=r.get(_);if(b){const f=_.index;f!==null&&b.version<f.version&&m(_)}else m(_);return r.get(_)}function p(){for(const _ in s){const b=s[_].deref();b!==void 0&&c(b)}}return{get:l,update:d,getWireframeAttribute:u,dispose:p}}function dm(i,t,e){let n;function s(m){n=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function c(m,u){i.drawElements(n,u,r,m*o),e.update(u,n,1)}function l(m,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,m*o,p),e.update(u,n,p))}function d(m,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,p);let b=0;for(let f=0;f<p;f++)b+=u[f];e.update(b,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function pm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function mm(i,t,e){const n=new WeakMap,s=new Ie;function r(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,m=d!==void 0?d.length:0;let u=n.get(a);if(u===void 0||u.count!==m){let P=function(){h.dispose(),n.delete(a),a.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let T=0;p===!0&&(T=1),_===!0&&(T=2),b===!0&&(T=3);let E=a.attributes.position.count*T,M=1;E>t.maxTextureSize&&(M=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const x=new Float32Array(E*M*4*m),h=new sl(x,E,M,m);h.type=An,h.needsUpdate=!0;const v=T*4;for(let C=0;C<m;C++){const w=f[C],L=g[C],B=S[C],I=E*M*4*C;for(let H=0;H<w.count;H++){const U=H*v;p===!0&&(s.fromBufferAttribute(w,H),x[I+U+0]=s.x,x[I+U+1]=s.y,x[I+U+2]=s.z,x[I+U+3]=0),_===!0&&(s.fromBufferAttribute(L,H),x[I+U+4]=s.x,x[I+U+5]=s.y,x[I+U+6]=s.z,x[I+U+7]=0),b===!0&&(s.fromBufferAttribute(B,H),x[I+U+8]=s.x,x[I+U+9]=s.y,x[I+U+10]=s.z,x[I+U+11]=B.itemSize===4?s.w:1)}}u={count:m,texture:h,size:new It(E,M)},n.set(a,u),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];const _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function gm(i,t,e,n,s){let r=new WeakMap;function o(l){const d=s.render.frame,m=l.geometry,u=t.get(l,m);if(r.get(u)!==d&&(t.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function a(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:a}}const _m={[za]:"LINEAR_TONE_MAPPING",[Ga]:"REINHARD_TONE_MAPPING",[ka]:"CINEON_TONE_MAPPING",[Do]:"ACES_FILMIC_TONE_MAPPING",[Va]:"AGX_TONE_MAPPING",[Wa]:"NEUTRAL_TONE_MAPPING",[Ha]:"CUSTOM_TONE_MAPPING"};function xm(i,t,e,n,s,r){const o=new Nn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const d=new We;d.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Re([0,2,0,0,2,0],2));const m=new Bh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ye(d,m),p=new Ml(-1,1,1,-1,0,1);let _=null,b=null,f=!1,g,S=null,T=[],E=!1;this.setSize=function(M,x){o.setSize(M,x),a!==null&&a.setSize(M,x),c!==null&&c.setSize(M,x);for(let h=0;h<T.length;h++){const v=T[h];v.setSize&&v.setSize(M,x)}},this.setEffects=function(M){T=M,E=T.length>0&&T[0].isRenderPass===!0;const x=o.width,h=o.height;T.length>0&&a===null&&(a=new Nn(x,h,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),c=new Nn(x,h,{type:Fn,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&T.some(P=>P.needsDepthTexture===!0);v!==(o.depthTexture!==null)&&(v===!0&&l===null&&(l=new ki(x,h),r===!0&&(l.format=ri,l.type=Gi)),o.dispose(),o.depthTexture=v?l:null,o.resolveDepthBuffer=v,o.storeMultisampledDepthBuffer=v);for(let P=0;P<T.length;P++){const C=T[P];C.setSize&&C.setSize(x,h),v&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(M,x){if(f||M.toneMapping===Zn&&T.length===0)return!1;if(S=x,x!==null){const h=x.width,v=x.height;(o.width!==h||o.height!==v)&&this.setSize(h,v)}return E===!1&&M.setRenderTarget(o),g=M.toneMapping,M.toneMapping=Zn,!0},this.hasRenderPass=function(){return E},this.end=function(M,x){M.toneMapping=g,f=!0;let h=o,v=a;for(let P=0;P<T.length;P++){const C=T[P];C.enabled!==!1&&(C.render(M,v,h,x),C.needsSwap!==!1&&(h=v,v=v===a?c:a))}if(_!==M.outputColorSpace||b!==M.toneMapping){_=M.outputColorSpace,b=M.toneMapping,m.defines={},me.getTransfer(_)===we&&(m.defines.SRGB_TRANSFER="");const P=_m[b];P&&(m.defines[P]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=h.texture,M.setRenderTarget(S),M.render(u,p),S=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),d.dispose(),m.dispose()}}const Jh=new $e,$h=new ki(1,1),Qh=new fl(1),jh=new sl,tu=new yh,eu=new ul,dc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dc[s];if(r===void 0&&(r=new Float32Array(s),dc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Yo(i,t){let e=pc[t];e===void 0&&(e=new Int32Array(t),pc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function vm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;i.uniform2fv(this.addr,t),Ye(e,t)}}function Sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Xe(e,t))return;i.uniform3fv(this.addr,t),Ye(e,t)}}function ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;i.uniform4fv(this.addr,t),Ye(e,t)}}function bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,n))return;_c.set(n),i.uniformMatrix2fv(this.addr,!1,_c),Ye(e,n)}}function Em(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,n))return;gc.set(n),i.uniformMatrix3fv(this.addr,!1,gc),Ye(e,n)}}function Tm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,n))return;mc.set(n),i.uniformMatrix4fv(this.addr,!1,mc),Ye(e,n)}}function Am(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;i.uniform2iv(this.addr,t),Ye(e,t)}}function Rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;i.uniform3iv(this.addr,t),Ye(e,t)}}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;i.uniform4iv(this.addr,t),Ye(e,t)}}function Pm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;i.uniform2uiv(this.addr,t),Ye(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;i.uniform3uiv(this.addr,t),Ye(e,t)}}function Im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;i.uniform4uiv(this.addr,t),Ye(e,t)}}function qo(i){return i.version===0&&(i.compareFunction=tl,i.needsUpdate=!0),i}function Nm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=qo($h):r=Jh,e.setTexture2D(t||r,s)}function Um(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||tu,s)}function Fm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=qo(Qh):r=eu,e.setTextureCube(t||r,s)}function Om(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||jh,s)}function Bm(i){switch(i){case 5126:return vm;case 35664:return Mm;case 35665:return Sm;case 35666:return ym;case 35674:return bm;case 35675:return Em;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return wm;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Dm;case 36295:return Lm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Fm;case 36289:case 36303:case 36311:case 36292:return Om}}function zm(i,t){i.uniform1fv(this.addr,t)}function Gm(i,t){const e=vs(t,this.size,2);i.uniform2fv(this.addr,e)}function km(i,t){const e=vs(t,this.size,3);i.uniform3fv(this.addr,e)}function Hm(i,t){const e=vs(t,this.size,4);i.uniform4fv(this.addr,e)}function Vm(i,t){const e=vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Wm(i,t){const e=vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Xm(i,t){const e=vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ym(i,t){i.uniform1iv(this.addr,t)}function qm(i,t){i.uniform2iv(this.addr,t)}function Zm(i,t){i.uniform3iv(this.addr,t)}function Km(i,t){i.uniform4iv(this.addr,t)}function Jm(i,t){i.uniform1uiv(this.addr,t)}function $m(i,t){i.uniform2uiv(this.addr,t)}function Qm(i,t){i.uniform3uiv(this.addr,t)}function jm(i,t){i.uniform4uiv(this.addr,t)}function t0(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);Xe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=qo($h):o=Jh;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function e0(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);Xe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||tu,r[o])}function n0(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);Xe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=qo(Qh):o=eu;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function i0(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);Xe(n,r)||(i.uniform1iv(this.addr,r),Ye(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||jh,r[o])}function s0(i){switch(i){case 5126:return zm;case 35664:return Gm;case 35665:return km;case 35666:return Hm;case 35674:return Vm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return Ym;case 35667:case 35671:return qm;case 35668:case 35672:return Zm;case 35669:case 35673:return Km;case 5125:return Jm;case 36294:return $m;case 36295:return Qm;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return e0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}class r0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bm(e.type)}}class o0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s0(e.type)}}class a0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function xc(i,t){i.seq.push(t),i.map[t.id]=t}function l0(i,t,e){const n=i.name,s=n.length;for(Sa.lastIndex=0;;){const r=Sa.exec(n),o=Sa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){xc(e,l===void 0?new r0(a,i,t):new o0(a,i,t));break}else{let m=e.map[a];m===void 0&&(m=new a0(a),xc(e,m)),e=m}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);l0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function vc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const c0=37297;let h0=0;function u0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Mc=new Qt;function f0(i){me._getMatrix(Mc,me.workingColorSpace,i);const t=`mat3( ${Mc.elements.map(e=>e.toFixed(4))} )`;switch(me.getTransfer(i)){case $s:return[t,"LinearTransferOETF"];case we:return[t,"sRGBTransferOETF"];default:return Jt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+u0(i.getShaderSource(t),a)}else return r}function d0(i,t){const e=f0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const p0={[za]:"Linear",[Ga]:"Reinhard",[ka]:"Cineon",[Do]:"ACESFilmic",[Va]:"AgX",[Wa]:"Neutral",[Ha]:"Custom"};function m0(i,t){const e=p0[t];return e===void 0?(Jt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Rr=new O;function g0(){me.getLuminanceCoefficients(Rr);const i=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function x0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function v0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Fs(i){return i!==""}function yc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function bc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const M0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ua(i){return i.replace(M0,S0)}function S0(i,t){const e=ae[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Ua(e)}const y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ec(i){return i.replace(y0,b0)}function b0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const E0={[Os]:"SHADOWMAP_TYPE_PCF",[os]:"SHADOWMAP_TYPE_VSM"};function T0(i){return E0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A0={[us]:"ENVMAP_MODE_REFRACTION"};function w0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":A0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const R0={[Ba]:"ENVMAP_BLENDING_MULTIPLY",[ih]:"ENVMAP_BLENDING_MIX",[sh]:"ENVMAP_BLENDING_ADD"};function C0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":R0[i.combine]||"ENVMAP_BLENDING_NONE"}function P0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=T0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=w0(e),m=C0(e),u=_0(e),p=x0(r),_=s.createProgram();let b,f,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(b=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Fs).join(`
`),b.length>0&&(b+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Fs).join(`
`),f.length>0&&(f+=`
`)):(b=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),f=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+m:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?ae.tonemapping_pars_fragment:"",e.toneMapping!==Zn?m0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ae.colorspace_pars_fragment,d0("linearToOutputTexel",e.outputColorSpace),g0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),o=Ua(o),o=yc(o,e),o=bc(o,e),a=Ua(a),a=yc(a,e),a=bc(a,e),o=Ec(o),a=Ec(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,b=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,f=["#define varying in",e.glslVersion===wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=g+b+o,T=g+f+a,E=vc(s,s.VERTEX_SHADER,S),M=vc(s,s.FRAGMENT_SHADER,T);s.attachShader(_,E),s.attachShader(_,M),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function x(C){if(i.debug.checkShaderErrors){const w=s.getProgramInfoLog(_)||"",L=s.getShaderInfoLog(E)||"",B=s.getShaderInfoLog(M)||"",I=w.trim(),H=L.trim(),U=B.trim();let W=!0,at=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,M);else{const $=Sc(s,E,"vertex"),j=Sc(s,M,"fragment");Se("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+$+`
`+j)}else I!==""?Jt("WebGLProgram: Program Info Log:",I):(H===""||U==="")&&(at=!1);at&&(C.diagnostics={runnable:W,programLog:I,vertexShader:{log:H,prefix:b},fragmentShader:{log:U,prefix:f}})}s.deleteShader(E),s.deleteShader(M),h=new Fr(s,_),v=v0(s,_)}let h;this.getUniforms=function(){return h===void 0&&x(this),h};let v;this.getAttributes=function(){return v===void 0&&x(this),v};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,c0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=h0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=M,this}let D0=0;class L0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new I0(t),e.set(t,n)),n}}class I0{constructor(t){this.id=D0++,this.code=t,this.usedTimes=0}}function N0(i){return i===Si||i===Zs||i===Ks}function U0(i,t,e,n,s,r){const o=new Go,a=new L0,c=new Set,l=[],d=new Map,m=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(h){return c.add(h),h===0?"uv":`uv${h}`}function _(h,v,P,C,w,L){const B=C.fog,I=w.geometry,H=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?C.environment:null,U=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,W=t.get(h.envMap||H,U),at=u[h.type];let $=n.precision;h.precision!==null&&($=n.getMaxPrecision(h.precision),$!==h.precision&&Jt("WebGLProgram.getParameters:",h.precision,"not supported, using",$,"instead."));const j=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ht=j!==void 0?j.length:0;let St=0;I.morphAttributes.position!==void 0&&(St=1),I.morphAttributes.normal!==void 0&&(St=2),I.morphAttributes.color!==void 0&&(St=3);let At,et,xt,wt;if(at){const pt=Ln[at];At=pt.vertexShader,et=pt.fragmentShader}else{At=h.vertexShader,et=h.fragmentShader;const pt=a.getVertexShaderStage(h),Xt=a.getFragmentShaderStage(h);a.update(h,pt,Xt),xt=pt.id,wt=Xt.id}const Lt=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),Ot=w.isInstancedMesh===!0,Ee=w.isBatchedMesh===!0,Vt=!!h.map,de=!!h.matcap,xe=!!W,oe=xe&&W.isPMREMTexture===!0,Tt=!!h.aoMap,qt=!!h.lightMap,le=!!h.bumpMap&&h.wireframe===!1,Wt=!!h.normalMap,_e=!!h.displacementMap,Me=!!h.emissiveMap,te=!!h.metalnessMap,Pe=!!h.roughnessMap,Oe=h.anisotropy>0,V=h.clearcoat>0,qe=h.diffuseRoughness>0,ee=h.dispersion>0,Bt=h.retroreflectivity>0,yt=h.iridescence>0,be=h.sheen>0,zt=h.transmission>0,Kt=Oe&&!!h.anisotropyMap,N=V&&!!h.clearcoatMap,A=V&&!!h.clearcoatNormalMap,Y=V&&!!h.clearcoatRoughnessMap,mt=qe&&!!h.diffuseRoughnessMap,lt=yt&&!!h.iridescenceMap,dt=yt&&!!h.iridescenceThicknessMap,vt=be&&!!h.sheenColorMap,it=be&&!!h.sheenRoughnessMap,st=!!h.specularMap,Mt=!!h.specularColorMap,z=!!h.specularIntensityMap,ot=zt&&!!h.transmissionMap,tt=zt&&!!h.thicknessMap,rt=!!h.gradientMap,gt=!!h.alphaMap,ct=h.alphaTest>0,Ut=!!h.alphaHash,jt=!!h.extensions;let _t=Zn;h.toneMapped&&(Lt===null||Lt.isXRRenderTarget===!0)&&(_t=i.toneMapping);const Ht=oe?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,kt={shaderID:at,shaderType:h.type,shaderName:h.name,vertexShader:At,fragmentShader:et,defines:h.defines,customVertexShaderID:xt,customFragmentShaderID:wt,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:$,batching:Ee,batchingColor:Ee&&w._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&w.instanceColor!==null,instancingMorph:Ot&&w.morphTexture!==null,outputColorSpace:Lt===null?i.outputColorSpace:Lt.isXRRenderTarget===!0?Lt.texture.colorSpace:me.workingColorSpace,alphaToCoverage:!!h.alphaToCoverage,map:Vt,matcap:de,envMap:xe,envMapMode:xe&&W.mapping,envMapPMREM:oe,envMapMaxLod:oe?Ht.length-1:null,envMapSize:oe?Ht[0].width:null,aoMap:Tt,lightMap:qt,bumpMap:le,normalMap:Wt,displacementMap:_e,emissiveMap:Me,normalMapObjectSpace:Wt&&h.normalMapType===ah,normalMapTangentSpace:Wt&&h.normalMapType===bo,packedNormalMap:Wt&&h.normalMapType===bo&&N0(h.normalMap.format),metalnessMap:te,roughnessMap:Pe,anisotropy:Oe,anisotropyMap:Kt,clearcoat:V,clearcoatMap:N,clearcoatNormalMap:A,clearcoatRoughnessMap:Y,diffuseRoughness:qe,diffuseRoughnessMap:mt,dispersion:ee,retroreflection:Bt,iridescence:yt,iridescenceMap:lt,iridescenceThicknessMap:dt,sheen:be,sheenColorMap:vt,sheenRoughnessMap:it,specularMap:st,specularColorMap:Mt,specularIntensityMap:z,transmission:zt,transmissionMap:ot,thicknessMap:tt,gradientMap:rt,opaque:h.transparent===!1&&h.blending===ls&&h.alphaToCoverage===!1,alphaMap:gt,alphaTest:ct,alphaHash:Ut,combine:h.combine,mapUv:Vt&&p(h.map.channel),aoMapUv:Tt&&p(h.aoMap.channel),lightMapUv:qt&&p(h.lightMap.channel),bumpMapUv:le&&p(h.bumpMap.channel),normalMapUv:Wt&&p(h.normalMap.channel),displacementMapUv:_e&&p(h.displacementMap.channel),emissiveMapUv:Me&&p(h.emissiveMap.channel),metalnessMapUv:te&&p(h.metalnessMap.channel),roughnessMapUv:Pe&&p(h.roughnessMap.channel),anisotropyMapUv:Kt&&p(h.anisotropyMap.channel),clearcoatMapUv:N&&p(h.clearcoatMap.channel),clearcoatNormalMapUv:A&&p(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&p(h.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:mt&&p(h.diffuseRoughnessMap.channel),iridescenceMapUv:lt&&p(h.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&p(h.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&p(h.sheenColorMap.channel),sheenRoughnessMapUv:it&&p(h.sheenRoughnessMap.channel),specularMapUv:st&&p(h.specularMap.channel),specularColorMapUv:Mt&&p(h.specularColorMap.channel),specularIntensityMapUv:z&&p(h.specularIntensityMap.channel),transmissionMapUv:ot&&p(h.transmissionMap.channel),thicknessMapUv:tt&&p(h.thicknessMap.channel),alphaMapUv:gt&&p(h.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Wt||Oe),vertexNormals:!!I.attributes.normal,vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!I.attributes.uv&&(Vt||gt),fog:!!B,useFog:h.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:h.wireframe===!1&&(h.flatShading===!0||I.attributes.normal===void 0&&Wt===!1&&(h.isMeshLambertMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isMeshPhysicalMaterial)),sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:ft,skinning:w.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:St,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:L.filter(pt=>pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:h.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,decodeVideoTexture:Vt&&h.map.isVideoTexture===!0&&me.getTransfer(h.map.colorSpace)===we,decodeVideoTextureEmissive:Me&&h.emissiveMap.isVideoTexture===!0&&me.getTransfer(h.emissiveMap.colorSpace)===we,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===nn,flipSided:h.side===cn,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:jt&&h.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&h.extensions.multiDraw===!0||Ee)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function b(h){const v=[];if(h.shaderID?v.push(h.shaderID):(v.push(h.customVertexShaderID),v.push(h.customFragmentShaderID)),h.defines!==void 0)for(const P in h.defines)v.push(P),v.push(h.defines[P]);return h.isRawShaderMaterial===!1&&(f(v,h),g(v,h),v.push(i.outputColorSpace)),v.push(h.customProgramCacheKey),v.join()}function f(h,v){h.push(v.precision),h.push(v.outputColorSpace),h.push(v.envMapMode),h.push(v.envMapPMREM),h.push(v.envMapMaxLod),h.push(v.envMapSize),h.push(v.mapUv),h.push(v.alphaMapUv),h.push(v.lightMapUv),h.push(v.aoMapUv),h.push(v.bumpMapUv),h.push(v.normalMapUv),h.push(v.displacementMapUv),h.push(v.emissiveMapUv),h.push(v.metalnessMapUv),h.push(v.roughnessMapUv),h.push(v.anisotropyMapUv),h.push(v.clearcoatMapUv),h.push(v.clearcoatNormalMapUv),h.push(v.clearcoatRoughnessMapUv),h.push(v.diffuseRoughnessMapUv),h.push(v.iridescenceMapUv),h.push(v.iridescenceThicknessMapUv),h.push(v.sheenColorMapUv),h.push(v.sheenRoughnessMapUv),h.push(v.specularMapUv),h.push(v.specularColorMapUv),h.push(v.specularIntensityMapUv),h.push(v.transmissionMapUv),h.push(v.thicknessMapUv),h.push(v.combine),h.push(v.fogExp2),h.push(v.sizeAttenuation),h.push(v.morphTargetsCount),h.push(v.numSunLights),h.push(v.numDirLights),h.push(v.numPointLights),h.push(v.numSpotLights),h.push(v.numSpotLightMaps),h.push(v.numHemiLights),h.push(v.numRectAreaLights),h.push(v.numSunLightShadows),h.push(v.numDirLightShadows),h.push(v.numPointLightShadows),h.push(v.numSpotLightShadows),h.push(v.numSpotLightShadowsWithMaps),h.push(v.numLightProbes),h.push(v.numLightProbeGrids),h.push(v.shadowMapType),h.push(v.toneMapping),h.push(v.numClippingPlanes),h.push(v.numClipIntersection),h.push(v.depthPacking)}function g(h,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.diffuseRoughness&&o.enable(25),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),h.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),h.push(o.mask)}function S(h){const v=u[h.type];let P;if(v){const C=Ln[v];P=Oh.clone(C.uniforms)}else P=h.uniforms;return P}function T(h,v){let P=d.get(v);return P!==void 0?++P.usedTimes:(P=new P0(i,v,h,s),l.push(P),d.set(v,P)),P}function E(h){if(--h.usedTimes===0){const v=l.indexOf(h);l[v]=l[l.length-1],l.pop(),d.delete(h.cacheKey),h.destroy()}}function M(h){a.remove(h)}function x(){a.dispose()}return{getParameters:_,getProgramCacheKey:b,getUniforms:S,acquireProgram:T,releaseProgram:E,releaseShaderCache:M,programs:l,dispose:x}}function F0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function O0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ac(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,_,b,f,g){let S=i[t];return S===void 0?(S={id:u.id,object:u,geometry:p,material:_,materialVariant:o(u),groupOrder:b,renderOrder:u.renderOrder,z:f,group:g},i[t]=S):(S.id=u.id,S.object=u,S.geometry=p,S.material=_,S.materialVariant=o(u),S.groupOrder=b,S.renderOrder=u.renderOrder,S.z=f,S.group=g),t++,S}function c(u,p,_,b,f,g,S){S.reversedDepth===!0&&(f=-f);const T=a(u,p,_,b,f,g);_.transmission>0?n.push(T):_.transparent===!0?s.push(T):e.push(T)}function l(u,p,_,b,f,g){const S=a(u,p,_,b,f,g);_.transmission>0?n.unshift(S):_.transparent===!0?s.unshift(S):e.unshift(S)}function d(u,p){e.length>1&&e.sort(u||O0),n.length>1&&n.sort(p||Ac),s.length>1&&s.sort(p||Ac)}function m(){for(let u=t,p=i.length;u<p;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:m,sort:d}}function B0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new wc,i.set(n,[o])):s>=r.length?(o=new wc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function z0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new ie};break;case"SpotLight":e={position:new O,direction:new O,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function G0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let k0=0;function H0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function V0(i){const t=new z0,e=G0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);const s=new O,r=new ge,o=new ge;function a(l){let d=0,m=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let p=0,_=0,b=0,f=0,g=0,S=0,T=0,E=0,M=0,x=0,h=0,v=0,P=0,C=0;l.sort(H0);for(let L=0,B=l.length;L<B;L++){const I=l[L],H=I.color,U=I.intensity,W=I.distance;let at=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Si?at=I.shadow.map.texture:at=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=H.r*U,m+=H.g*U,u+=H.b*U;else if(I.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(I.sh.coefficients[$],U);C++}else if(I.isSunLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,ht=e.get(I);ht.shadowIntensity=j.intensity,ht.shadowBias=j.bias,ht.shadowNormalBias=j.normalBias,ht.shadowRadius=j.radius,ht.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=ht,n.sunShadowMap[_]=at;const St=j.getViewportCount();for(let At=0;At<St;At++)n.sunShadowMatrix[b+At]=j.getMatrix(At),n.sunShadowCascade[b+At]=j._cascadeData[At];b+=St,_++}n.sun[p]=$,p++}else if(I.isDirectionalLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,ht=e.get(I);ht.shadowIntensity=j.intensity,ht.shadowBias=j.bias,ht.shadowNormalBias=j.normalBias,ht.shadowRadius=j.radius,ht.shadowMapSize=j.mapSize,n.directionalShadow[f]=ht,n.directionalShadowMap[f]=at,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=$,f++}else if(I.isSpotLight){const $=t.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(H).multiplyScalar(U),$.distance=W,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,n.spot[S]=$;const j=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,j.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[S]=j.matrix,I.castShadow){const ht=e.get(I);ht.shadowIntensity=j.intensity,ht.shadowBias=j.bias,ht.shadowNormalBias=j.normalBias,ht.shadowRadius=j.radius,ht.shadowMapSize=j.mapSize,n.spotShadow[S]=ht,n.spotShadowMap[S]=at,h++}S++}else if(I.isRectAreaLight){const $=t.get(I);$.color.copy(H).multiplyScalar(U),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=$,T++}else if(I.isPointLight){const $=t.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const j=I.shadow,ht=e.get(I);ht.shadowIntensity=j.intensity,ht.shadowBias=j.bias,ht.shadowNormalBias=j.normalBias,ht.shadowRadius=j.radius,ht.shadowMapSize=j.mapSize,ht.shadowCameraNear=j.camera.near,ht.shadowCameraFar=j.camera.far,n.pointShadow[g]=ht,n.pointShadowMap[g]=at,n.pointShadowMatrix[g]=I.shadow.matrix,x++}n.point[g]=$,g++}else if(I.isHemisphereLight){const $=t.get(I);$.skyColor.copy(I.color).multiplyScalar(U),$.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[E]=$,E++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=m,n.ambient[2]=u;const w=n.hash;(w.sunLength!==p||w.directionalLength!==f||w.pointLength!==g||w.spotLength!==S||w.rectAreaLength!==T||w.hemiLength!==E||w.numSunShadows!==_||w.numDirectionalShadows!==M||w.numPointShadows!==x||w.numSpotShadows!==h||w.numSpotMaps!==v||w.numLightProbes!==C)&&(n.sun.length=p,n.directional.length=f,n.spot.length=S,n.rectArea.length=T,n.point.length=g,n.hemi.length=E,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.pointShadowMatrix.length=x,n.spotShadow.length=h,n.spotShadowMap.length=h,n.spotLightMatrix.length=h+v-P,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=C,w.sunLength=p,w.directionalLength=f,w.pointLength=g,w.spotLength=S,w.rectAreaLength=T,w.hemiLength=E,w.numSunShadows=_,w.numDirectionalShadows=M,w.numPointShadows=x,w.numSpotShadows=h,w.numSpotMaps=v,w.numLightProbes=C,n.version=k0++)}function c(l,d){let m=0,u=0,p=0,_=0,b=0,f=0;const g=d.matrixWorldInverse;for(let S=0,T=l.length;S<T;S++){const E=l[S];if(E.isSunLight){const M=n.sun[m];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),m++}else if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),u++}else if(E.isSpotLight){const M=n.spot[_];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),_++}else if(E.isRectAreaLight){const M=n.rectArea[b];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),b++}else if(E.isPointLight){const M=n.point[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(g),p++}else if(E.isHemisphereLight){const M=n.hemi[f];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(g),f++}}}return{setup:a,setupView:c,state:n}}function Rc(i){const t=new V0(i),e=[],n=[],s=[];function r(m){d.camera=m,e.length=0,n.length=0,s.length=0}function o(m){m.isLightProbeGrid?s.push(m):e.push(m)}function a(m){n.push(m)}function c(){t.setup(e),s.sort((m,u)=>m.priority-u.priority||m.id-u.id)}function l(m){t.setupView(e,m)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function W0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Rc(i),t.set(s,[a])):r>=o.length?(a=new Rc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const X0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y0=`uniform sampler2D shadow_pass;
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
}`,q0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],Z0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Cc=new ge,Is=new O,ya=new O;function K0(i,t,e){let n=new ps;const s=new It,r=new It,o=new Ie,a=new zh,c=new Gh,l={},d=e.maxTextureSize,m={[Mi]:cn,[cn]:Mi,[nn]:nn},u=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:X0,fragmentShader:Y0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const _=new We;_.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new ye(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Os;let g=this.type;this.render=function(x,h,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||x.length===0)return;this.type===Bc&&(Jt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Os);const P=i.getRenderTarget(),C=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Oi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=g!==this.type;B&&h.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(H=>H.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,H=x.length;I<H;I++){const U=x[I],W=U.shadow;if(W===void 0){Jt("WebGLShadowMap:",U,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const at=W.getFrameExtents();s.multiply(at),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/at.x),s.x=r.x*at.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/at.y),s.y=r.y*at.y,W.mapSize.y=r.y));const $=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=$,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===os){if(U.isPointLight){Jt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Nn(s.x,s.y,{format:Si,type:Fn,minFilter:ln,magFilter:ln,generateMipmaps:!1}),W.map.texture.name=U.name+".shadowMap",W.map.depthTexture=new ki(s.x,s.y,An),W.map.depthTexture.name=U.name+".shadowMapDepth",W.map.depthTexture.format=li,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ke,W.map.depthTexture.magFilter=Ke}else U.isPointLight?(W.map=new Xo(s.x),W.map.depthTexture=new fl(s.x,Un)):(W.map=new Nn(s.x,s.y),W.map.depthTexture=new ki(s.x,s.y,Un)),W.map.depthTexture.name=U.name+".shadowMap",W.map.depthTexture.format=li,this.type===Os?(W.map.depthTexture.compareFunction=$?ja:Qa,W.map.depthTexture.minFilter=ln,W.map.depthTexture.magFilter=ln):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ke,W.map.depthTexture.magFilter=Ke);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();U.isPointLight!==!0&&W.updateMatrices(U,v);const ht=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:v.layers;for(let St=0;St<j;St++){const At=W.getCamera(St);if(U.isPointLight){const et=W.camera,xt=W.matrix,wt=U.distance||et.far;wt!==et.far&&(et.far=wt,et.updateProjectionMatrix()),Is.setFromMatrixPosition(U.matrixWorld),et.position.copy(Is),ya.copy(et.position),ya.add(q0[St]),et.up.copy(Z0[St]),et.lookAt(ya),et.updateMatrixWorld(),xt.makeTranslation(-Is.x,-Is.y,-Is.z),Cc.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Cc,et.coordinateSystem,et.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,St),i.clear();else{St===0&&(i.setRenderTarget(W.map),i.clear());const et=W.getViewport(St);o.set(r.x*et.x,r.y*et.y,r.x*et.z,r.y*et.w),L.viewport(o)}n=W.getFrustum(St),E(h,v,At,U,ht,this.type)}W.isPointLightShadow!==!0&&this.type===os&&S(W,v),W.needsUpdate=!1}g=this.type,f.needsUpdate=!1,i.setRenderTarget(P,C,w)};function S(x,h){const v=t.update(b);u.defines.VSM_SAMPLES!==x.blurSamples&&(u.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null?x.mapPass=new Nn(s.x,s.y,{format:Si,type:Fn}):(x.mapPass.width!==x.map.width||x.mapPass.height!==x.map.height)&&x.mapPass.setSize(x.map.width,x.map.height),u.uniforms.shadow_pass.value=x.map.depthTexture,u.uniforms.resolution.value.set(x.map.width,x.map.height),u.uniforms.radius.value=x.radius,i.setRenderTarget(x.mapPass),i.clear(),i.renderBufferDirect(h,null,v,u,b,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value.set(x.map.width,x.map.height),p.uniforms.radius.value=x.radius,i.setRenderTarget(x.map),i.clear(),i.renderBufferDirect(h,null,v,p,b,null)}function T(x,h,v,P){let C=null;const w=v.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(w!==void 0)C=w;else if(C=v.isPointLight===!0?c:a,i.localClippingEnabled&&h.clipShadows===!0&&Array.isArray(h.clippingPlanes)&&h.clippingPlanes.length!==0||h.displacementMap&&h.displacementScale!==0||h.alphaMap&&h.alphaTest>0||h.map&&h.alphaTest>0||h.alphaToCoverage===!0){const L=C.uuid,B=h.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let H=I[B];H===void 0&&(H=C.clone(),I[B]=H,h.addEventListener("dispose",M)),C=H}if(C.visible=h.visible,C.wireframe=h.wireframe,P===os?C.side=h.shadowSide!==null?h.shadowSide:h.side:C.side=h.shadowSide!==null?h.shadowSide:m[h.side],C.alphaMap=h.alphaMap,C.alphaTest=h.alphaToCoverage===!0?.5:h.alphaTest,C.map=h.map,C.clipShadows=h.clipShadows,C.clippingPlanes=h.clippingPlanes,C.clipIntersection=h.clipIntersection,C.displacementMap=h.displacementMap,C.displacementScale=h.displacementScale,C.displacementBias=h.displacementBias,C.wireframeLinewidth=h.wireframeLinewidth,C.linewidth=h.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=i.properties.get(C);L.light=v}return C}function E(x,h,v,P,C,w){if(x.visible===!1)return;if(x.layers.test(C)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&w===os)&&(!x.frustumCulled||x.intersectsFrustum(n))){x.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,x.matrixWorld);const I=t.update(x),H=x.material;if(Array.isArray(H)){const U=I.groups;for(let W=0,at=U.length;W<at;W++){const $=U[W],j=H[$.materialIndex];if(j&&j.visible){const ht=T(x,j,P,w);x.onBeforeShadow(i,x,h,v,I,ht,$),i.renderBufferDirect(v,null,I,ht,x,$),x.onAfterShadow(i,x,h,v,I,ht,$)}}}else if(H.visible){const U=T(x,H,P,w);x.onBeforeShadow(i,x,h,v,I,U,null),i.renderBufferDirect(v,null,I,U,x,null),x.onAfterShadow(i,x,h,v,I,U,null)}}const B=x.children;for(let I=0,H=B.length;I<H;I++)E(B[I],h,v,P,C,w)}function M(x){x.target.removeEventListener("dispose",M);for(const v in l){const P=l[v],C=x.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function J0(i,t){function e(){let z=!1;const ot=new Ie;let tt=null;const rt=new Ie(0,0,0,0);return{setMask:function(gt){tt!==gt&&!z&&(i.colorMask(gt,gt,gt,gt),tt=gt)},setLocked:function(gt){z=gt},setClear:function(gt,ct,Ut,jt,_t){_t===!0&&(gt*=jt,ct*=jt,Ut*=jt),ot.set(gt,ct,Ut,jt),rt.equals(ot)===!1&&(i.clearColor(gt,ct,Ut,jt),rt.copy(ot))},reset:function(){z=!1,tt=null,rt.set(-1,0,0,0)}}}function n(){let z=!1,ot=!1,tt=null,rt=null,gt=null;return{setReversed:function(ct){if(ot!==ct){const Ut=t.get("EXT_clip_control");ct?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),ot=ct;const jt=gt;gt=null,this.setClear(jt)}},getReversed:function(){return ot},setTest:function(ct){ct?ft(i.DEPTH_TEST):Ot(i.DEPTH_TEST)},setMask:function(ct){tt!==ct&&!z&&(i.depthMask(ct),tt=ct)},setFunc:function(ct){if(ot&&(ct=Su[ct]),rt!==ct){switch(ct){case Or:i.depthFunc(i.NEVER);break;case Br:i.depthFunc(i.ALWAYS);break;case zr:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case Gr:i.depthFunc(i.EQUAL);break;case kr:i.depthFunc(i.GEQUAL);break;case Hr:i.depthFunc(i.GREATER);break;case Vr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}rt=ct}},setLocked:function(ct){z=ct},setClear:function(ct){gt!==ct&&(gt=ct,ot&&(ct=1-ct),i.clearDepth(ct))},reset:function(){z=!1,tt=null,rt=null,gt=null,ot=!1}}}function s(){let z=!1,ot=null,tt=null,rt=null,gt=null,ct=null,Ut=null,jt=null,_t=null;return{setTest:function(Ht){z||(Ht?ft(i.STENCIL_TEST):Ot(i.STENCIL_TEST))},setMask:function(Ht){ot!==Ht&&!z&&(i.stencilMask(Ht),ot=Ht)},setFunc:function(Ht,kt,pt){(tt!==Ht||rt!==kt||gt!==pt)&&(i.stencilFunc(Ht,kt,pt),tt=Ht,rt=kt,gt=pt)},setOp:function(Ht,kt,pt){(ct!==Ht||Ut!==kt||jt!==pt)&&(i.stencilOp(Ht,kt,pt),ct=Ht,Ut=kt,jt=pt)},setLocked:function(Ht){z=Ht},setClear:function(Ht){_t!==Ht&&(i.clearStencil(Ht),_t=Ht)},reset:function(){z=!1,ot=null,tt=null,rt=null,gt=null,ct=null,Ut=null,jt=null,_t=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let d={},m={},u={},p=new WeakMap,_=[],b=null,f=!1,g=null,S=null,T=null,E=null,M=null,x=null,h=null,v=new ie(0,0,0),P=0,C=!1,w=null,L=null,B=null,I=null,H=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,at=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec($)[1]),W=at>=1):$.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=at>=2);let j=null,ht={};const St=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),et=new Ie().fromArray(St),xt=new Ie().fromArray(At);function wt(z,ot,tt,rt){const gt=new Uint8Array(4),ct=i.createTexture();i.bindTexture(z,ct),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<tt;Ut++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,rt,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(ot+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return ct}const Lt={};Lt[i.TEXTURE_2D]=wt(i.TEXTURE_2D,i.TEXTURE_2D,1),Lt[i.TEXTURE_CUBE_MAP]=wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Lt[i.TEXTURE_2D_ARRAY]=wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Lt[i.TEXTURE_3D]=wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(i.DEPTH_TEST),o.setFunc(hs),le(!1),Wt(Ea),ft(i.CULL_FACE),Tt(Oi);function ft(z){d[z]!==!0&&(i.enable(z),d[z]=!0)}function Ot(z){d[z]!==!1&&(i.disable(z),d[z]=!1)}function Ee(z,ot){return u[z]!==ot?(i.bindFramebuffer(z,ot),u[z]=ot,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function Vt(z,ot){let tt=_,rt=!1;if(z){tt=p.get(ot),tt===void 0&&(tt=[],p.set(ot,tt));const gt=z.textures;if(tt.length!==gt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Ut=gt.length;ct<Ut;ct++)tt[ct]=i.COLOR_ATTACHMENT0+ct;tt.length=gt.length,rt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,rt=!0);rt&&i.drawBuffers(tt)}function de(z){return b!==z?(i.useProgram(z),b=z,!0):!1}const xe={[Ni]:i.FUNC_ADD,[Gc]:i.FUNC_SUBTRACT,[kc]:i.FUNC_REVERSE_SUBTRACT};xe[Hc]=i.MIN,xe[Vc]=i.MAX;const oe={[Wc]:i.ZERO,[Xc]:i.ONE,[Yc]:i.SRC_COLOR,[Fa]:i.SRC_ALPHA,[Qc]:i.SRC_ALPHA_SATURATE,[Jc]:i.DST_COLOR,[Zc]:i.DST_ALPHA,[qc]:i.ONE_MINUS_SRC_COLOR,[Oa]:i.ONE_MINUS_SRC_ALPHA,[$c]:i.ONE_MINUS_DST_COLOR,[Kc]:i.ONE_MINUS_DST_ALPHA,[jc]:i.CONSTANT_COLOR,[th]:i.ONE_MINUS_CONSTANT_COLOR,[eh]:i.CONSTANT_ALPHA,[nh]:i.ONE_MINUS_CONSTANT_ALPHA};function Tt(z,ot,tt,rt,gt,ct,Ut,jt,_t,Ht){if(z===Oi){f===!0&&(Ot(i.BLEND),f=!1);return}if(f===!1&&(ft(i.BLEND),f=!0),z!==zc){if(z!==g||Ht!==C){if((S!==Ni||M!==Ni)&&(i.blendEquation(i.FUNC_ADD),S=Ni,M=Ni),Ht)switch(z){case ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qs:i.blendFunc(i.ONE,i.ONE);break;case Ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Aa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Se("WebGLState: Invalid blending: ",z);break}else switch(z){case ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ta:Se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Aa:Se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Se("WebGLState: Invalid blending: ",z);break}T=null,E=null,x=null,h=null,v.set(0,0,0),P=0,g=z,C=Ht}return}gt=gt||ot,ct=ct||tt,Ut=Ut||rt,(ot!==S||gt!==M)&&(i.blendEquationSeparate(xe[ot],xe[gt]),S=ot,M=gt),(tt!==T||rt!==E||ct!==x||Ut!==h)&&(i.blendFuncSeparate(oe[tt],oe[rt],oe[ct],oe[Ut]),T=tt,E=rt,x=ct,h=Ut),(jt.equals(v)===!1||_t!==P)&&(i.blendColor(jt.r,jt.g,jt.b,_t),v.copy(jt),P=_t),g=z,C=!1}function qt(z,ot){z.side===nn?Ot(i.CULL_FACE):ft(i.CULL_FACE);let tt=z.side===cn;ot&&(tt=!tt),le(tt),z.blending===ls&&z.transparent===!1?Tt(Oi):Tt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const rt=z.stencilWrite;a.setTest(rt),rt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Me(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):Ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function le(z){w!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),w=z)}function Wt(z){z!==Fc?(ft(i.CULL_FACE),z!==L&&(z===Ea?i.cullFace(i.BACK):z===Oc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ot(i.CULL_FACE),L=z}function _e(z){z!==B&&(W&&i.lineWidth(z),B=z)}function Me(z,ot,tt){z?(ft(i.POLYGON_OFFSET_FILL),(I!==ot||H!==tt)&&(I=ot,H=tt,o.getReversed()&&(ot=-ot,tt=-tt),i.polygonOffset(ot,tt))):Ot(i.POLYGON_OFFSET_FILL)}function te(z){z?ft(i.SCISSOR_TEST):Ot(i.SCISSOR_TEST)}function Pe(z){z===void 0&&(z=i.TEXTURE0+U-1),j!==z&&(i.activeTexture(z),j=z)}function Oe(z,ot,tt){tt===void 0&&(j===null?tt=i.TEXTURE0+U-1:tt=j);let rt=ht[tt];rt===void 0&&(rt={type:void 0,texture:void 0},ht[tt]=rt),(rt.type!==z||rt.texture!==ot)&&(j!==tt&&(i.activeTexture(tt),j=tt),i.bindTexture(z,ot||Lt[z]),rt.type=z,rt.texture=ot)}function V(){const z=ht[j];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function qe(){try{i.compressedTexImage2D(...arguments)}catch(z){Se("WebGLState:",z)}}function ee(){try{i.compressedTexImage3D(...arguments)}catch(z){Se("WebGLState:",z)}}function Bt(){try{i.texSubImage2D(...arguments)}catch(z){Se("WebGLState:",z)}}function yt(){try{i.texSubImage3D(...arguments)}catch(z){Se("WebGLState:",z)}}function be(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Se("WebGLState:",z)}}function zt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Se("WebGLState:",z)}}function Kt(){try{i.texStorage2D(...arguments)}catch(z){Se("WebGLState:",z)}}function N(){try{i.texStorage3D(...arguments)}catch(z){Se("WebGLState:",z)}}function A(){try{i.texImage2D(...arguments)}catch(z){Se("WebGLState:",z)}}function Y(){try{i.texImage3D(...arguments)}catch(z){Se("WebGLState:",z)}}function mt(z){return m[z]!==void 0?m[z]:i.getParameter(z)}function lt(z,ot){m[z]!==ot&&(i.pixelStorei(z,ot),m[z]=ot)}function dt(z){et.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),et.copy(z))}function vt(z){xt.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),xt.copy(z))}function it(z,ot){let tt=l.get(ot);tt===void 0&&(tt=new WeakMap,l.set(ot,tt));let rt=tt.get(z);rt===void 0&&(rt=i.getUniformBlockIndex(ot,z.name),i.uniformBlockBinding(ot,rt,rt),tt.set(z,rt))}function st(z,ot,tt){const gt=l.get(ot).get(z);c[gt]!==tt&&(i.bindBufferBase(i.UNIFORM_BUFFER,gt,tt),c[gt]=tt)}function Mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},m={},j=null,ht={},u={},c={},p=new WeakMap,_=[],b=null,f=!1,g=null,S=null,T=null,E=null,M=null,x=null,h=null,v=new ie(0,0,0),P=0,C=!1,w=null,L=null,B=null,I=null,H=null,et.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ft,disable:Ot,bindFramebuffer:Ee,drawBuffers:Vt,useProgram:de,setBlending:Tt,setMaterial:qt,setFlipSided:le,setCullFace:Wt,setLineWidth:_e,setPolygonOffset:Me,setScissorTest:te,activeTexture:Pe,bindTexture:Oe,unbindTexture:V,compressedTexImage2D:qe,compressedTexImage3D:ee,texImage2D:A,texImage3D:Y,pixelStorei:lt,getParameter:mt,updateUBOMapping:it,uniformBlockBinding:st,texStorage2D:Kt,texStorage3D:N,texSubImage2D:Bt,texSubImage3D:yt,compressedTexSubImage2D:be,compressedTexSubImage3D:zt,scissor:dt,viewport:vt,reset:Mt}}function $0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new It,d=new WeakMap,m=new Set;let u;const p=new WeakMap,_=new Set,b=new FinalizationRegistry(N=>_.delete(N));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(N,A){return f?new OffscreenCanvas(N,A):Eo("canvas")}function S(N,A,Y){let mt=1;const lt=Kt(N);if((lt.width>Y||lt.height>Y)&&(mt=Y/Math.max(lt.width,lt.height)),mt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const dt=Math.floor(mt*lt.width),vt=Math.floor(mt*lt.height);u===void 0&&(u=g(dt,vt));const it=A?g(dt,vt):u;return it.width=dt,it.height=vt,it.getContext("2d").drawImage(N,0,0,dt,vt),Jt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+dt+"x"+vt+")."),it}else return"data"in N&&Jt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),N;return N}function T(N){return N.generateMipmaps}function E(N){i.generateMipmap(N)}function M(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(N,A,Y,mt,lt,dt=!1){if(N!==null){if(i[N]!==void 0)return i[N];Jt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let vt;mt&&(vt=t.get("EXT_texture_norm16"),vt||Jt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=A;if(A===i.RED&&(Y===i.FLOAT&&(it=i.R32F),Y===i.HALF_FLOAT&&(it=i.R16F),Y===i.UNSIGNED_BYTE&&(it=i.R8),Y===i.UNSIGNED_SHORT&&vt&&(it=vt.R16_EXT),Y===i.SHORT&&vt&&(it=vt.R16_SNORM_EXT)),A===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.R8UI),Y===i.UNSIGNED_SHORT&&(it=i.R16UI),Y===i.UNSIGNED_INT&&(it=i.R32UI),Y===i.BYTE&&(it=i.R8I),Y===i.SHORT&&(it=i.R16I),Y===i.INT&&(it=i.R32I)),A===i.RG&&(Y===i.FLOAT&&(it=i.RG32F),Y===i.HALF_FLOAT&&(it=i.RG16F),Y===i.UNSIGNED_BYTE&&(it=i.RG8),Y===i.UNSIGNED_SHORT&&vt&&(it=vt.RG16_EXT),Y===i.SHORT&&vt&&(it=vt.RG16_SNORM_EXT)),A===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RG8UI),Y===i.UNSIGNED_SHORT&&(it=i.RG16UI),Y===i.UNSIGNED_INT&&(it=i.RG32UI),Y===i.BYTE&&(it=i.RG8I),Y===i.SHORT&&(it=i.RG16I),Y===i.INT&&(it=i.RG32I)),A===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(it=i.RGB16UI),Y===i.UNSIGNED_INT&&(it=i.RGB32UI),Y===i.BYTE&&(it=i.RGB8I),Y===i.SHORT&&(it=i.RGB16I),Y===i.INT&&(it=i.RGB32I)),A===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(it=i.RGBA16UI),Y===i.UNSIGNED_INT&&(it=i.RGBA32UI),Y===i.BYTE&&(it=i.RGBA8I),Y===i.SHORT&&(it=i.RGBA16I),Y===i.INT&&(it=i.RGBA32I)),A===i.RGB&&(Y===i.UNSIGNED_SHORT&&vt&&(it=vt.RGB16_EXT),Y===i.SHORT&&vt&&(it=vt.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(it=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(it=i.R11F_G11F_B10F)),A===i.RGBA){const st=dt?$s:me.getTransfer(lt);Y===i.FLOAT&&(it=i.RGBA32F),Y===i.HALF_FLOAT&&(it=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(it=st===we?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&vt&&(it=vt.RGBA16_EXT),Y===i.SHORT&&vt&&(it=vt.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function h(N,A){let Y;return N?A===null||A===Un||A===Gi?Y=i.DEPTH24_STENCIL8:A===An?Y=i.DEPTH32F_STENCIL8:A===fs&&(Y=i.DEPTH24_STENCIL8,Jt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Un||A===Gi?Y=i.DEPTH_COMPONENT24:A===An?Y=i.DEPTH_COMPONENT32F:A===fs&&(Y=i.DEPTH_COMPONENT16),Y}function v(N,A){return T(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ke&&N.minFilter!==ln?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function P(N){const A=new WeakRef(N);n.get(N).__ref=A,_.add(A),b.register(N,A,A)}function C(N){const A=n.get(N).__ref;A!==void 0&&(_.delete(A),b.unregister(A))}function w(N){B(N.target)}function L(N){I(N.target)}function B(N){N.removeEventListener("dispose",w),C(N),U(N),N.isVideoTexture&&d.delete(N),N.isHTMLTexture&&m.delete(N)}function I(N){N.removeEventListener("dispose",L),C(N),at(N)}function H(){for(const N of _){const A=N.deref();A!==void 0&&(A.isRenderTarget===!0?I(A):B(A))}_.clear(),m.clear()}function U(N){const A=n.get(N);if(A.__webglInit===void 0)return;const Y=N.source,mt=p.get(Y);if(mt){const lt=mt[A.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&W(N),Object.keys(mt).length===0&&p.delete(Y)}n.remove(N)}function W(N){const A=n.get(N);i.deleteTexture(A.__webglTexture);const Y=N.source,mt=p.get(Y);delete mt[A.__cacheKey],o.memory.textures--}function at(N){const A=n.get(N);A.__depthDisposeCallback&&A.__depthDisposeCallback();const Y=N.depthTexture;if(Y&&Y.renderTarget===N&&B(Y),N.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(A.__webglFramebuffer[lt]))for(let dt=0;dt<A.__webglFramebuffer[lt].length;dt++)i.deleteFramebuffer(A.__webglFramebuffer[lt][dt]);else i.deleteFramebuffer(A.__webglFramebuffer[lt]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[lt])}else{if(Array.isArray(A.__webglFramebuffer))for(let lt=0;lt<A.__webglFramebuffer.length;lt++)i.deleteFramebuffer(A.__webglFramebuffer[lt]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let lt=0;lt<A.__webglColorRenderbuffer.length;lt++)A.__webglColorRenderbuffer[lt]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[lt]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const mt=N.textures;for(let lt=0,dt=mt.length;lt<dt;lt++){const vt=n.get(mt[lt]);vt.__webglTexture&&(i.deleteTexture(vt.__webglTexture),o.memory.textures--),n.remove(mt[lt])}n.remove(N)}let $=0;function j(){$=0}function ht(){return $}function St(N){$=N}function At(){const N=$;return N>=s.maxTextures&&Jt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),$+=1,N}function et(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.mipmapsAutoUpdate),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function xt(N,A){const Y=n.get(N);if(N.isVideoTexture&&be(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Y.__version!==N.version){const mt=N.image;if(mt===null)Jt("WebGLRenderer: Texture marked for update but no image data found.");else if(mt.complete===!1)Jt("WebGLRenderer: Texture marked for update but image is incomplete");else{qt(Y,N,A);return}}else N.isExternalTexture&&(Y.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+A)}function wt(N,A){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){qt(Y,N,A);return}else N.isExternalTexture&&(Y.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+A)}function Lt(N,A){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){qt(Y,N,A);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+A)}function ft(N,A){const Y=n.get(N);if(N.version>0&&Y.__version!==N.version){le(Y,N,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+A)}const Ot={[Wr]:i.REPEAT,[qn]:i.CLAMP_TO_EDGE,[Xr]:i.MIRRORED_REPEAT},Ee={[Ke]:i.NEAREST,[rh]:i.NEAREST_MIPMAP_NEAREST,[Us]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[Ir]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},Vt={[ch]:i.NEVER,[tl]:i.ALWAYS,[hh]:i.LESS,[Qa]:i.LEQUAL,[uh]:i.EQUAL,[ja]:i.GEQUAL,[fh]:i.GREATER,[dh]:i.NOTEQUAL};function de(N,A){if(A.type===An&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===ln||A.magFilter===Ir||A.magFilter===Us||A.magFilter===si||A.minFilter===ln||A.minFilter===Ir||A.minFilter===Us||A.minFilter===si)&&Jt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Ot[A.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Ot[A.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Ot[A.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,Ee[A.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,Ee[A.minFilter]),A.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Vt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Ke||A.minFilter!==Us&&A.minFilter!==si||A.type===An&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function xe(N,A){let Y=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",w),P(A));const mt=A.source;let lt=p.get(mt);lt===void 0&&(lt={},p.set(mt,lt));const dt=et(A);if(dt!==N.__cacheKey){lt[dt]===void 0&&(lt[dt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),lt[dt].usedTimes++;const vt=lt[N.__cacheKey];vt!==void 0&&(lt[N.__cacheKey].usedTimes--,vt.usedTimes===0&&W(A)),N.__cacheKey=dt,N.__webglTexture=lt[dt].texture}return Y}function oe(N,A,Y){return Math.floor(Math.floor(N/Y)/A)}function Tt(N,A,Y,mt){const dt=N.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,A.width,A.height,Y,mt,A.data);else{dt.sort((z,ot)=>z.start-ot.start);let vt=0;for(let z=1;z<dt.length;z++){const ot=dt[vt],tt=dt[z],rt=ot.start+ot.count,gt=oe(tt.start,A.width,4),ct=oe(ot.start,A.width,4);tt.start<=rt+1&&gt===ct&&oe(tt.start+tt.count-1,A.width,4)===gt?ot.count=Math.max(ot.count,tt.start+tt.count-ot.start):(++vt,dt[vt]=tt)}dt.length=vt+1;const it=e.getParameter(i.UNPACK_ROW_LENGTH),st=e.getParameter(i.UNPACK_SKIP_PIXELS),Mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,A.width);for(let z=0,ot=dt.length;z<ot;z++){const tt=dt[z],rt=Math.floor(tt.start/4),gt=Math.ceil(tt.count/4),ct=rt%A.width,Ut=Math.floor(rt/A.width),jt=gt,_t=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ct),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ut),e.texSubImage2D(i.TEXTURE_2D,0,ct,Ut,jt,_t,Y,mt,A.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,it),e.pixelStorei(i.UNPACK_SKIP_PIXELS,st),e.pixelStorei(i.UNPACK_SKIP_ROWS,Mt)}}function qt(N,A,Y){let mt=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(mt=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(mt=i.TEXTURE_3D);const lt=xe(N,A),dt=A.source;e.bindTexture(mt,N.__webglTexture,i.TEXTURE0+Y);const vt=n.get(dt);if(dt.version!==vt.__version||lt===!0){if(e.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){const _t=me.getPrimaries(me.workingColorSpace),Ht=A.colorSpace===ii?null:me.getPrimaries(A.colorSpace),kt=A.colorSpace===ii||_t===Ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}e.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment);let st=S(A.image,!1,s.maxTextureSize);st=zt(A,st);const Mt=r.convert(A.format,A.colorSpace),z=r.convert(A.type);let ot=x(A.internalFormat,Mt,z,A.normalized,A.colorSpace,A.isVideoTexture);de(mt,A);let tt;const rt=A.mipmaps,gt=A.isVideoTexture!==!0,ct=vt.__version===void 0||lt===!0,Ut=dt.dataReady,jt=v(A,st);if(A.isDepthTexture)ot=h(A.format===ri,A.type),ct&&(gt?e.texStorage2D(i.TEXTURE_2D,1,ot,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,ot,st.width,st.height,0,Mt,z,null));else if(A.isDataTexture)if(rt.length>0){gt&&ct&&e.texStorage2D(i.TEXTURE_2D,jt,ot,rt[0].width,rt[0].height);for(let _t=0,Ht=rt.length;_t<Ht;_t++)tt=rt[_t],gt?Ut&&e.texSubImage2D(i.TEXTURE_2D,_t,0,0,tt.width,tt.height,Mt,z,tt.data):e.texImage2D(i.TEXTURE_2D,_t,ot,tt.width,tt.height,0,Mt,z,tt.data);A.generateMipmaps=!1}else gt?(ct&&e.texStorage2D(i.TEXTURE_2D,jt,ot,st.width,st.height),Ut&&Tt(A,st,Mt,z)):e.texImage2D(i.TEXTURE_2D,0,ot,st.width,st.height,0,Mt,z,st.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){gt&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,ot,rt[0].width,rt[0].height,st.depth);for(let _t=0,Ht=rt.length;_t<Ht;_t++)if(tt=rt[_t],A.format!==In)if(Mt!==null)if(gt){if(Ut)if(A.layerUpdates.size>0){const kt=lc(tt.width,tt.height,A.format,A.type);for(const pt of A.layerUpdates){const Xt=tt.data.subarray(pt*kt/tt.data.BYTES_PER_ELEMENT,(pt+1)*kt/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_t,0,0,pt,tt.width,tt.height,1,Mt,Xt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_t,0,0,0,tt.width,tt.height,st.depth,Mt,tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_t,ot,tt.width,tt.height,st.depth,0,tt.data,0,0);else Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?Ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,_t,0,0,0,tt.width,tt.height,st.depth,Mt,z,tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,_t,ot,tt.width,tt.height,st.depth,0,Mt,z,tt.data);A.layerUpdates.size>0&&A.clearLayerUpdates()}else{gt&&ct&&e.texStorage2D(i.TEXTURE_2D,jt,ot,rt[0].width,rt[0].height);for(let _t=0,Ht=rt.length;_t<Ht;_t++)tt=rt[_t],A.format!==In?Mt!==null?gt?Ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,_t,0,0,tt.width,tt.height,Mt,tt.data):e.compressedTexImage2D(i.TEXTURE_2D,_t,ot,tt.width,tt.height,0,tt.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?Ut&&e.texSubImage2D(i.TEXTURE_2D,_t,0,0,tt.width,tt.height,Mt,z,tt.data):e.texImage2D(i.TEXTURE_2D,_t,ot,tt.width,tt.height,0,Mt,z,tt.data)}else if(A.isDataArrayTexture)if(gt){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,ot,st.width,st.height,st.depth),Ut)if(A.layerUpdates.size>0){const _t=lc(st.width,st.height,A.format,A.type);for(const Ht of A.layerUpdates){const kt=st.data.subarray(Ht*_t/st.data.BYTES_PER_ELEMENT,(Ht+1)*_t/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ht,st.width,st.height,1,Mt,z,kt)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,z,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ot,st.width,st.height,st.depth,0,Mt,z,st.data);else if(A.isData3DTexture)gt?(ct&&e.texStorage3D(i.TEXTURE_3D,jt,ot,st.width,st.height,st.depth),Ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,z,st.data)):e.texImage3D(i.TEXTURE_3D,0,ot,st.width,st.height,st.depth,0,Mt,z,st.data);else if(A.isFramebufferTexture){if(ct)if(gt)e.texStorage2D(i.TEXTURE_2D,jt,ot,st.width,st.height);else{let _t=st.width,Ht=st.height;for(let kt=0;kt<jt;kt++)e.texImage2D(i.TEXTURE_2D,kt,ot,_t,Ht,0,Mt,z,null),_t>>=1,Ht>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in i){const _t=i.canvas;if(_t.hasAttribute("layoutsubtree")||_t.setAttribute("layoutsubtree","true"),st.parentNode!==_t){_t.appendChild(st),m.add(A),_t.onpaint=Ht=>{const kt=Ht.changedElements;for(const pt of m)kt.includes(pt.image)&&(pt.needsUpdate=!0)},_t.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,st);else{const kt=i.RGBA,pt=i.RGBA,Xt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,kt,pt,Xt,st)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(rt.length>0){if(gt&&ct){const _t=Kt(rt[0]);e.texStorage2D(i.TEXTURE_2D,jt,ot,_t.width,_t.height)}for(let _t=0,Ht=rt.length;_t<Ht;_t++)tt=rt[_t],gt?Ut&&e.texSubImage2D(i.TEXTURE_2D,_t,0,0,Mt,z,tt):e.texImage2D(i.TEXTURE_2D,_t,ot,Mt,z,tt);A.generateMipmaps=!1}else if(gt){if(ct){const _t=Kt(st);e.texStorage2D(i.TEXTURE_2D,jt,ot,_t.width,_t.height)}Ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,z,st)}else e.texImage2D(i.TEXTURE_2D,0,ot,Mt,z,st);T(A)&&A.mipmapsAutoUpdate===!0&&E(mt),vt.__version=dt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function le(N,A,Y){if(A.image.length!==6)return;const mt=xe(N,A),lt=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+Y);const dt=n.get(lt);if(lt.version!==dt.__version||mt===!0){e.activeTexture(i.TEXTURE0+Y);const vt=me.getPrimaries(me.workingColorSpace),it=A.colorSpace===ii?null:me.getPrimaries(A.colorSpace),st=A.colorSpace===ii||vt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);const Mt=A.isCompressedTexture||A.image[0].isCompressedTexture,z=A.image[0]&&A.image[0].isDataTexture,ot=[];for(let pt=0;pt<6;pt++)!Mt&&!z?ot[pt]=S(A.image[pt],!0,s.maxCubemapSize):ot[pt]=z?A.image[pt].image:A.image[pt],ot[pt]=zt(A,ot[pt]);const tt=ot[0],rt=r.convert(A.format,A.colorSpace),gt=r.convert(A.type);let ct=x(A.internalFormat,rt,gt,A.normalized,A.colorSpace);const Ut=A.isVideoTexture!==!0,jt=dt.__version===void 0||mt===!0,_t=lt.dataReady;let Ht=v(A,tt);de(i.TEXTURE_CUBE_MAP,A);let kt;if(A.isDepthTexture){if(ct=h(A.format===ri,A.type),jt)if(Ut)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ct,tt.width,tt.height);else for(let pt=0;pt<6;pt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ct,tt.width,tt.height,0,rt,gt,null)}else if(Mt){Ut&&jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ht,ct,tt.width,tt.height);for(let pt=0;pt<6;pt++){kt=ot[pt].mipmaps;for(let Xt=0;Xt<kt.length;Xt++){const Le=kt[Xt];A.format!==In?rt!==null?Ut?_t&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt,0,0,Le.width,Le.height,rt,Le.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt,ct,Le.width,Le.height,0,Le.data):Jt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt,0,0,Le.width,Le.height,rt,gt,Le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt,ct,Le.width,Le.height,0,rt,gt,Le.data)}}}else{if(kt=A.mipmaps,Ut&&jt){kt.length>0&&Ht++;const pt=Kt(ot[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ht,ct,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(z){Ut?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,ot[pt].width,ot[pt].height,rt,gt,ot[pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ct,ot[pt].width,ot[pt].height,0,rt,gt,ot[pt].data);for(let Xt=0;Xt<kt.length;Xt++){const Qe=kt[Xt].image[pt].image;Ut?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt+1,0,0,Qe.width,Qe.height,rt,gt,Qe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt+1,ct,Qe.width,Qe.height,0,rt,gt,Qe.data)}}else{Ut?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,rt,gt,ot[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ct,rt,gt,ot[pt]);for(let Xt=0;Xt<kt.length;Xt++){const Le=kt[Xt];Ut?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt+1,0,0,rt,gt,Le.image[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Xt+1,ct,rt,gt,Le.image[pt])}}}T(A)&&A.mipmapsAutoUpdate===!0&&E(i.TEXTURE_CUBE_MAP),dt.__version=lt.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Wt(N,A,Y,mt,lt,dt){const vt=r.convert(Y.format,Y.colorSpace),it=r.convert(Y.type),st=x(Y.internalFormat,vt,it,Y.normalized,Y.colorSpace),Mt=n.get(A),z=n.get(Y);if(z.__renderTarget=A,!Mt.__hasExternalTextures){const ot=Math.max(1,A.width>>dt),tt=Math.max(1,A.height>>dt);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,dt,st,ot,tt,A.depth,0,vt,it,null):e.texImage2D(lt,dt,st,ot,tt,0,vt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),yt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,mt,lt,z.__webglTexture,0,Bt(A)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,mt,lt,z.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(N,A,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,N),A.depthBuffer){const mt=A.depthTexture,lt=mt&&mt.isDepthTexture?mt.type:null,dt=h(A.stencilBuffer,lt),vt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;yt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Bt(A),dt,A.width,A.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt(A),dt,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,dt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,N)}else{const mt=A.textures;for(let lt=0;lt<mt.length;lt++){const dt=mt[lt],vt=r.convert(dt.format,dt.colorSpace),it=r.convert(dt.type),st=x(dt.internalFormat,vt,it,dt.normalized,dt.colorSpace);yt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Bt(A),st,A.width,A.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt(A),st,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,st,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(N,A,Y){const mt=A.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const lt=n.get(A.depthTexture);lt.__renderTarget=A;const dt=mt?A.depthTexture.image[0]:A.depthTexture.image;(!lt.__webglTexture||dt.width!==A.width||dt.height!==A.height)&&(dt.width=A.width,dt.height=A.height,A.depthTexture.needsUpdate=!0),mt?ft(A.depthTexture,0):xt(A.depthTexture,0);const vt=lt.__webglTexture,it=Bt(A),st=mt?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,Mt=A.depthTexture.format===ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(A.depthTexture.format===li)yt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Mt,st,vt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,Mt,st,vt,0);else if(A.depthTexture.format===ri)yt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Mt,st,vt,0,it):i.framebufferTexture2D(i.FRAMEBUFFER,Mt,st,vt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(N){const A=n.get(N),Y=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const mt=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),mt){const lt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,mt.removeEventListener("dispose",lt)};mt.addEventListener("dispose",lt),A.__depthDisposeCallback=lt}A.__boundDepthTexture=mt}if(N.depthTexture&&!A.__autoAllocateDepthBuffer)if(Y)for(let mt=0;mt<6;mt++)Me(A.__webglFramebuffer[mt],N,mt);else N.texture.mipmaps.length>0?Me(A.__webglFramebuffer[0],N,0):Me(A.__webglFramebuffer,N,0);else if(Y){A.__webglDepthbuffer=[];for(let mt=0;mt<6;mt++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[mt]),A.__webglDepthbuffer[mt]===void 0)A.__webglDepthbuffer[mt]=i.createRenderbuffer(),_e(A.__webglDepthbuffer[mt],N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=A.__webglDepthbuffer[mt];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,dt)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),_e(A.__webglDepthbuffer,N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,dt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(N,A,Y){const mt=n.get(N);A!==void 0&&Wt(mt.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&te(N)}function Oe(N){const A=N.texture,Y=n.get(N),mt=n.get(A);N.addEventListener("dispose",L),P(N);const lt=N.textures,dt=N.isWebGLCubeRenderTarget===!0,vt=lt.length>1;if(vt||(mt.__webglTexture===void 0&&(mt.__webglTexture=i.createTexture()),mt.__version=A.version,o.memory.textures++),dt){Y.__webglFramebuffer=[];for(let it=0;it<6;it++)if(A.mipmaps.length>0){Y.__webglFramebuffer[it]=[];for(let st=0;st<A.mipmaps.length;st++)Y.__webglFramebuffer[it][st]=i.createFramebuffer()}else Y.__webglFramebuffer[it]=i.createFramebuffer()}else{if(A.mipmaps.length>0){Y.__webglFramebuffer=[];for(let it=0;it<A.mipmaps.length;it++)Y.__webglFramebuffer[it]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(vt)for(let it=0,st=lt.length;it<st;it++){const Mt=n.get(lt[it]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&yt(N)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let it=0;it<lt.length;it++){const st=lt[it];Y.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[it]);const Mt=r.convert(st.format,st.colorSpace),z=r.convert(st.type),ot=x(st.internalFormat,Mt,z,st.normalized,st.colorSpace,N.isXRRenderTarget===!0),tt=Bt(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,ot,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,Y.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(Y.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,mt.__webglTexture),de(i.TEXTURE_CUBE_MAP,A);for(let it=0;it<6;it++)if(A.mipmaps.length>0)for(let st=0;st<A.mipmaps.length;st++)Wt(Y.__webglFramebuffer[it][st],N,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,st);else Wt(Y.__webglFramebuffer[it],N,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);T(A)?E(i.TEXTURE_CUBE_MAP):A.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),e.unbindTexture()}else if(vt){for(let it=0,st=lt.length;it<st;it++){const Mt=lt[it],z=n.get(Mt);let ot=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ot=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,z.__webglTexture),de(ot,Mt),Wt(Y.__webglFramebuffer,N,Mt,i.COLOR_ATTACHMENT0+it,ot,0),T(Mt)&&E(ot)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(it=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,mt.__webglTexture),de(it,A),A.mipmaps.length>0)for(let st=0;st<A.mipmaps.length;st++)Wt(Y.__webglFramebuffer[st],N,A,i.COLOR_ATTACHMENT0,it,st);else Wt(Y.__webglFramebuffer,N,A,i.COLOR_ATTACHMENT0,it,0);T(A)?E(it):A.mipmaps.length>0&&i.texParameteri(it,i.TEXTURE_MAX_LEVEL,A.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&te(N)}function V(N){const A=N.textures;for(let Y=0,mt=A.length;Y<mt;Y++){const lt=A[Y];if(T(lt)&&lt.mipmapsAutoUpdate===!0){const dt=M(N),vt=n.get(lt).__webglTexture;e.bindTexture(dt,vt),E(dt),e.unbindTexture()}}}const qe=[];function ee(N){if(N.samples>0){if(yt(N)===!1){const A=N.textures,Y=N.width,mt=N.height;let lt=i.COLOR_BUFFER_BIT;const dt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(N),it=A.length>1;if(it)for(let Mt=0;Mt<A.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Mt=0;Mt<A.length;Mt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[Mt]);const z=n.get(A[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,z,0)}i.blitFramebuffer(0,0,Y,mt,0,0,Y,mt,lt,i.NEAREST),c===!0&&(qe.length=0,qe.push(i.COLOR_ATTACHMENT0+Mt),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&qe.push(dt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,qe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let Mt=0;Mt<A.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[Mt]);const z=n.get(A[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,z,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const A=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function Bt(N){return Math.min(s.maxSamples,N.samples)}function yt(N){const A=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function be(N){const A=o.render.frame;d.get(N)!==A&&(d.set(N,A),N.update())}function zt(N,A){const Y=N.colorSpace,mt=N.format,lt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Y!==Js&&Y!==ii&&(me.getTransfer(Y)===we?(mt!==In||lt!==dn)&&Jt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Se("WebGLTextures: Unsupported texture color space:",Y)),A}function Kt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=At,this.resetTextureUnits=j,this.getTextureUnits=ht,this.setTextureUnits=St,this.setTexture2D=xt,this.setTexture2DArray=wt,this.setTexture3D=Lt,this.setTextureCube=ft,this.rebindTextures=Pe,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=Wt,this.useMultisampledRTT=yt,this.dispose=H}function nu(i,t){function e(n,s=ii){let r;const o=me.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(n===No)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Za)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ka)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ya)return i.BYTE;if(n===qa)return i.SHORT;if(n===fs)return i.UNSIGNED_SHORT;if(n===Lo)return i.INT;if(n===Un)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Fn)return i.HALF_FLOAT;if(n===Ja)return i.ALPHA;if(n===$a)return i.RGB;if(n===In)return i.RGBA;if(n===li)return i.DEPTH_COMPONENT;if(n===ri)return i.DEPTH_STENCIL;if(n===Uo)return i.RED;if(n===Fo)return i.RED_INTEGER;if(n===Si)return i.RG;if(n===Oo)return i.RG_INTEGER;if(n===Bo)return i.RGBA_INTEGER;if(n===Bs||n===zs||n===Gs||n===ks)if(o===we)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ks)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yr||n===qr||n===Zr||n===Kr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Kr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jr||n===$r||n===Qr||n===jr||n===to||n===Zs||n===eo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Jr||n===$r)return o===we?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qr)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===jr)return r.COMPRESSED_R11_EAC;if(n===to)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Zs)return r.COMPRESSED_RG11_EAC;if(n===eo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===no||n===io||n===so||n===ro||n===oo||n===ao||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===no)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===io)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===so)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ao)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ho)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===po)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===go)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===xo||n===vo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return o===we?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mo||n===So||n===Ks||n===yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Mo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ks)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Q0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j0=`
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

}`;class tg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new dl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new yi({vertexShader:Q0,fragmentShader:j0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eg extends hi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,m=null,u=null,p=null,_=null;const b=typeof XRWebGLBinding<"u",f=new tg,g={},S=e.getContextAttributes();let T=null,E=null;const M=[],x=[],h=new It;let v=null,P=null;const C=new En;C.viewport=new Ie;const w=new En;w.viewport=new Ie;const L=[C,w],B=new Vh;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let xt=M[et];return xt===void 0&&(xt=new Ur,M[et]=xt),xt.getTargetRaySpace()},this.getControllerGrip=function(et){let xt=M[et];return xt===void 0&&(xt=new Ur,M[et]=xt),xt.getGripSpace()},this.getHand=function(et){let xt=M[et];return xt===void 0&&(xt=new Ur,M[et]=xt),xt.getHandSpace()};function U(et){const xt=x.indexOf(et.inputSource);if(xt===-1)return;const wt=M[xt];wt!==void 0&&(wt.update(et.inputSource,et.frame,l||o),wt.dispatchEvent({type:et.type,data:et.inputSource}))}function W(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",at);for(let et=0;et<M.length;et++){const xt=x[et];xt!==null&&(x[et]=null,M[et].disconnect(xt))}I=null,H=null,f.reset();for(const et in g)delete g[et];if(t.setRenderTarget(T),p=null,u=null,m=null,s=null,E=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(h.width,h.height,!1),P!==null){const et=P.camera;et.fov=P.fov,et.zoom=P.zoom,et.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,n.isPresenting===!0&&Jt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){a=et,n.isPresenting===!0&&Jt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(et){l=et},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return m===null&&b&&(m=new XRWebGLBinding(s,e)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",W),s.addEventListener("inputsourceschange",at),S.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(h),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Lt=null,ft=null;S.depth&&(ft=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=S.stencil?ri:li,Lt=S.stencil?Gi:Un);const Ot={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:r};m=this.getBinding(),u=m.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new Nn(u.textureWidth,u.textureHeight,{format:In,type:dn,depthTexture:new ki(u.textureWidth,u.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const wt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Nn(p.framebufferWidth,p.framebufferHeight,{format:In,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),At.setContext(s),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function at(et){for(let xt=0;xt<et.removed.length;xt++){const wt=et.removed[xt],Lt=x.indexOf(wt);Lt>=0&&(x[Lt]=null,M[Lt].disconnect(wt))}for(let xt=0;xt<et.added.length;xt++){const wt=et.added[xt];let Lt=x.indexOf(wt);if(Lt===-1){for(let Ot=0;Ot<M.length;Ot++)if(Ot>=x.length){x.push(wt),Lt=Ot;break}else if(x[Ot]===null){x[Ot]=wt,Lt=Ot;break}if(Lt===-1)break}const ft=M[Lt];ft&&ft.connect(wt)}}function $(et,xt){xt===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(xt.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let xt=et.near,wt=et.far;f.texture!==null&&(f.depthNear>0&&(xt=f.depthNear),f.depthFar>0&&(wt=f.depthFar)),B.near=w.near=C.near=xt,B.far=w.far=C.far=wt,(I!==B.near||H!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),I=B.near,H=B.far),B.layers.mask=et.layers.mask|6,C.layers.mask=B.layers.mask&-5,w.layers.mask=B.layers.mask&-3;const Lt=et.parent,ft=B.cameras;$(B,Lt);for(let Ot=0;Ot<ft.length;Ot++)$(ft[Ot],Lt);B.projectionMatrix.copy(C.projectionMatrix),B.projectionMatrixInverse.copy(C.projectionMatrixInverse),P===null&&et.isPerspectiveCamera&&(P={camera:et,fov:et.fov,zoom:et.zoom}),j(et,B,Lt)};function j(et,xt,wt){wt===null?et.matrix.copy(xt.matrixWorld):(et.matrix.copy(wt.matrixWorld),et.matrix.invert(),et.matrix.multiply(xt.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(xt.projectionMatrix),et.projectionMatrixInverse.copy(xt.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Qs*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(et){c=et,u!==null&&(u.fixedFoveation=et),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=et)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(et){return g[et]};let ht=null;function St(et,xt){if(d=xt.getViewerPose(l||o),_=xt,d!==null){const wt=d.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let Lt=!1;wt.length!==B.cameras.length&&(B.cameras.length=0,Lt=!0);for(let Vt=0;Vt<wt.length;Vt++){const de=wt[Vt];let xe=null;if(p!==null)xe=p.getViewport(de);else{const Tt=m.getViewSubImage(u,de);xe=Tt.viewport,Vt===0&&(t.setRenderTargetTextures(E,Tt.colorTexture,Tt.depthStencilTexture),t.setRenderTarget(E))}let oe=L[Vt];oe===void 0&&(oe=new En,oe.layers.enable(Vt),oe.viewport=new Ie,L[Vt]=oe),oe.matrix.fromArray(de.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(de.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(xe.x,xe.y,xe.width,xe.height),Vt===0&&(B.matrix.copy(oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Lt===!0&&B.cameras.push(oe)}const ft=s.enabledFeatures;if(ft&&ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){m=n.getBinding();const Vt=m.getDepthInformation(wt[0]);Vt&&Vt.isValid&&Vt.texture&&f.init(Vt,s.renderState)}if(ft&&ft.includes("camera-access")&&b){t.state.unbindTexture(),m=n.getBinding();for(let Vt=0;Vt<wt.length;Vt++){const de=wt[Vt].camera;if(de){let xe=g[de];xe||(xe=new dl,g[de]=xe);const oe=m.getCameraImage(de);xe.sourceTexture=oe}}}}for(let wt=0;wt<M.length;wt++){const Lt=x[wt],ft=M[wt];Lt!==null&&ft!==void 0&&ft.update(Lt,xt,l||o)}ht&&ht(et,xt),xt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:xt}),_=null}const At=new Yh;At.setAnimationLoop(St),this.setAnimationLoop=function(et){ht=et},this.dispose=function(){}}}const ng=new ge,iu=new Qt;iu.set(-1,0,0,0,1,0,0,0,1);function ig(i,t){function e(f,g){f.matrixAutoUpdate===!0&&f.updateMatrix(),g.value.copy(f.matrix)}function n(f,g){g.color.getRGB(f.fogColor.value,Fh(i)),g.isFog?(f.fogNear.value=g.near,f.fogFar.value=g.far):g.isFogExp2&&(f.fogDensity.value=g.density)}function s(f,g,S,T,E){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(f,g):g.isMeshLambertMaterial?(r(f,g),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(f,g),m(f,g)):g.isMeshPhongMaterial?(r(f,g),d(f,g),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(f,g),u(f,g),g.isMeshPhysicalMaterial&&p(f,g,E)):g.isMeshMatcapMaterial?(r(f,g),_(f,g)):g.isMeshDepthMaterial?r(f,g):g.isMeshDistanceMaterial?(r(f,g),b(f,g)):g.isMeshNormalMaterial?r(f,g):g.isLineBasicMaterial?(o(f,g),g.isLineDashedMaterial&&a(f,g)):g.isPointsMaterial?c(f,g,S,T):g.isSpriteMaterial?l(f,g):g.isShadowMaterial?(f.color.value.copy(g.color),f.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(f,g){f.opacity.value=g.opacity,g.color&&f.diffuse.value.copy(g.color),g.emissive&&f.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(f.map.value=g.map,e(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.bumpMap&&(f.bumpMap.value=g.bumpMap,e(g.bumpMap,f.bumpMapTransform),f.bumpScale.value=g.bumpScale,g.side===cn&&(f.bumpScale.value*=-1)),g.normalMap&&(f.normalMap.value=g.normalMap,e(g.normalMap,f.normalMapTransform),f.normalScale.value.copy(g.normalScale),g.side===cn&&f.normalScale.value.negate()),g.displacementMap&&(f.displacementMap.value=g.displacementMap,e(g.displacementMap,f.displacementMapTransform),f.displacementScale.value=g.displacementScale,f.displacementBias.value=g.displacementBias),g.emissiveMap&&(f.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,f.emissiveMapTransform)),g.specularMap&&(f.specularMap.value=g.specularMap,e(g.specularMap,f.specularMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest);const S=t.get(g),T=S.envMap,E=S.envMapRotation;T&&(f.envMap.value=T,f.envMapRotation.value.setFromMatrix4(ng.makeRotationFromEuler(E)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(iu),f.reflectivity.value=g.reflectivity,f.ior.value=g.ior,f.refractionRatio.value=g.refractionRatio),g.lightMap&&(f.lightMap.value=g.lightMap,f.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,f.lightMapTransform)),g.aoMap&&(f.aoMap.value=g.aoMap,f.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,f.aoMapTransform))}function o(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,g.map&&(f.map.value=g.map,e(g.map,f.mapTransform))}function a(f,g){f.dashSize.value=g.dashSize,f.totalSize.value=g.dashSize+g.gapSize,f.scale.value=g.scale}function c(f,g,S,T){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.size.value=g.size*S,f.scale.value=T*.5,g.map&&(f.map.value=g.map,e(g.map,f.uvTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function l(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.rotation.value=g.rotation,g.map&&(f.map.value=g.map,e(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,e(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function d(f,g){f.specular.value.copy(g.specular),f.shininess.value=Math.max(g.shininess,1e-4)}function m(f,g){g.gradientMap&&(f.gradientMap.value=g.gradientMap)}function u(f,g){f.metalness.value=g.metalness,g.metalnessMap&&(f.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,f.metalnessMapTransform)),f.roughness.value=g.roughness,g.roughnessMap&&(f.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,f.roughnessMapTransform)),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)}function p(f,g,S){f.ior.value=g.ior,g.diffuseRoughness>0&&(f.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),g.sheen>0&&(f.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),f.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(f.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,f.sheenColorMapTransform)),g.sheenRoughnessMap&&(f.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,f.sheenRoughnessMapTransform))),g.clearcoat>0&&(f.clearcoat.value=g.clearcoat,f.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(f.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,f.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(f.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===cn&&f.clearcoatNormalScale.value.negate())),g.dispersion>0&&(f.dispersion.value=g.dispersion),g.retroreflectivity>0&&(f.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(f.iridescence.value=g.iridescence,f.iridescenceIOR.value=g.iridescenceIOR,f.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(f.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,f.iridescenceMapTransform)),g.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),g.transmission>0&&(f.transmission.value=g.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(f.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,f.transmissionMapTransform)),f.thickness.value=g.thickness,g.thicknessMap&&(f.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=g.attenuationDistance,f.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(f.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(f.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=g.specularIntensity,f.specularColor.value.copy(g.specularColor),g.specularColorMap&&(f.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,f.specularColorMapTransform)),g.specularIntensityMap&&(f.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,g){g.matcap&&(f.matcap.value=g.matcap)}function b(f,g){const S=t.get(g).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function sg(i,t,e,n){let s={},r={};function o(S,T){const E=T.program;n.uniformBlockBinding(S,E,s[S.id])}function a(S,T){let E=s[S.id];E===void 0&&(_(S),E=c(S),s[S.id]=E,S.addEventListener("dispose",f));const M=T.program;n.updateUBOMapping(S,M);const x=t.render.frame;r[S.id]!==x&&(l(S),r[S.id]=x)}function c(S){const T=i.createBuffer(),E=S.__size,M=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,E,M),i.bindBuffer(i.UNIFORM_BUFFER,null),T}function l(S){const T=s[S.id],E=S.uniforms,M=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,h=E.length;x<h;x++){const v=E[x];if(Array.isArray(v))for(let P=0,C=v.length;P<C;P++)d(v[P],x,P,M);else d(v,x,0,M)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,T,E,M){if(u(S,T,E,M)===!0){const x=S.__offset,h=S.value;if(Array.isArray(h)){let v=0;for(let P=0;P<h.length;P++){const C=h[P],w=b(C,!0);m(C,S.__data,v),v+=w.storage/Float32Array.BYTES_PER_ELEMENT}}else m(h,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function m(S,T,E){typeof S=="number"||typeof S=="boolean"?T[E]=S:S.isMatrix3?(T[E]=S.elements[0],T[E+1]=S.elements[1],T[E+2]=S.elements[2],T[E+3]=0,T[E+4]=S.elements[3],T[E+5]=S.elements[4],T[E+6]=S.elements[5],T[E+7]=0,T[E+8]=S.elements[6],T[E+9]=S.elements[7],T[E+10]=S.elements[8],T[E+11]=0):ArrayBuffer.isView(S)?T.set(S.subarray(0,T.length-E),E):S.toArray(T,E)}function u(S,T,E,M){const x=S.value,h=T+"_"+E;if(Array.isArray(x)){M[h]===void 0&&(M[h]=[]);const v=M[h];let P=!1;for(let C=0;C<x.length;C++)p(x[C],v,C)===!0&&(P=!0);return P}return p(x,M,h)}function p(S,T,E){if(T[E]===void 0)return typeof S=="number"||typeof S=="boolean"?T[E]=S:ArrayBuffer.isView(S)?T[E]=S.slice():T[E]=S.clone(),!0;{const M=T[E];if(typeof S=="number"||typeof S=="boolean"){if(M!==S)return T[E]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(M.equals(S)===!1)return M.copy(S),!0}}return!1}function _(S){const T=S.uniforms;let E=0;const M=16;for(let h=0,v=T.length;h<v;h++){const P=Array.isArray(T[h])?T[h]:[T[h]];for(let C=0,w=P.length;C<w;C++){const L=P[C],B=Array.isArray(L.value)?L.value:[L.value],I=Array.isArray(T[h])||Array.isArray(L.value);let H=E;for(let W=0,at=B.length;W<at;W++){const $=B[W],j=b($,I),ht=E%M,St=ht%j.boundary,At=ht+St;E+=St,At!==0&&M-At<j.storage&&(E+=M-At),W===0&&(H=E),E+=j.storage}const U=L.type==="int"?Int32Array:L.type==="uint"?Uint32Array:Float32Array;L.__data=new U((E-H)/Float32Array.BYTES_PER_ELEMENT),L.__offset=H}}const x=E%M;return x>0&&(E+=M-x),S.__size=E,S.__cache={},this}function b(S,T){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=16,E.storage=48):S.isMatrix4?(E.boundary=16,E.storage=64):S.isTexture?Jt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(E.boundary=16,E.storage=S.byteLength):Jt("WebGLRenderer: Unsupported uniform value type.",S),T===!0&&(E.boundary=16,E.storage=Math.ceil(E.storage/16)*16),E}function f(S){const T=S.target;T.removeEventListener("dispose",f),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function g(){for(const S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:a,dispose:g}}const rg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gn=null;function og(){return Gn===null&&(Gn=new al(rg,16,16,Si,Fn),Gn.name="DFG_LUT",Gn.minFilter=ln,Gn.magFilter=ln,Gn.wrapS=qn,Gn.wrapT=qn,Gn.generateMipmaps=!1,Gn.needsUpdate=!0),Gn}class su{constructor(t={}){const{canvas:e=mh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:p=dn}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=o;const b=p,f=new Set([Bo,Oo,Fo]),g=new Set([dn,Un,fs,Gi,Io,No]),S=new Uint32Array(4),T=new Int32Array(4),E={textures:[],min:[],max:[],resolution:[]};let M=null,x=null;const h=[],v=[];let P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let w=!1,L=null,B=null,I=null,H=null;this._outputColorSpace=an;let U=0,W=0,at=null,$=-1,j=null;const ht=new Ie,St=new Ie;let At=null;const et=new ie(0);let xt=0,wt=e.width,Lt=e.height,ft=1,Ot=null,Ee=null;const Vt=new Ie(0,0,wt,Lt),de=new Ie(0,0,wt,Lt);let xe=!1;const oe=new ps,Tt=new Ho;let qt=!1,le=!1;const Wt=new ge,_e=new O,Me=new Ie,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pe=!1;function Oe(){return at===null?ft:1}let V=n;function qe(R,k){return e.getContext(R,k)}let ee,Bt,yt,be,zt,Kt,N,A,Y,mt,lt,dt,vt,it,st,Mt,z,ot,tt,rt,gt,ct,Ut;try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Po}`),e.addEventListener("webglcontextlost",Ht,!1),e.addEventListener("webglcontextrestored",kt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),V===null){const k="webgl2";if(V=qe(k,R),V===null)throw qe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}jt()}catch(R){throw e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Se("WebGLRenderer: "+R.message),R}function jt(){ee=new um(V),ee.init(),gt=new nu(V,ee),Bt=new tm(V,ee,t,gt),yt=new J0(V,ee),Bt.reversedDepthBuffer&&u&&yt.buffers.depth.setReversed(!0),B=V.createFramebuffer(),I=V.createFramebuffer(),H=V.createFramebuffer(),be=new pm(V),zt=new F0,Kt=new $0(V,ee,yt,zt,Bt,gt,be),N=new hm(C),A=new gf(V),ct=new Qp(V,A),Y=new fm(V,A,be,ct),mt=new gm(V,Y,A,ct,be),ot=new mm(V,Bt,Kt),st=new em(zt),lt=new U0(C,N,ee,Bt,ct,st),dt=new ig(C,zt),vt=new B0,it=new W0(ee),z=new $p(C,N,yt,mt,_,c),Mt=new K0(C,mt,Bt),Ut=new sg(V,be,Bt,yt),tt=new jp(V,ee,be),rt=new dm(V,ee,be),be.programs=lt.programs,C.capabilities=Bt,C.extensions=ee,C.properties=zt,C.renderLists=vt,C.shadowMap=Mt,C.state=yt,C.info=be}b!==dn&&(P=new xm(b,e.width,e.height,a,s,r));const _t=new eg(C,V);this.xr=_t,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const R=ee.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ee.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ft},this.setPixelRatio=function(R){R!==void 0&&(ft=R,this.setSize(wt,Lt,!1))},this.getSize=function(R){return R.set(wt,Lt)},this.setSize=function(R,k,Q=!0){if(_t.isPresenting){Jt("WebGLRenderer: Can't change size while VR device is presenting.");return}wt=R,Lt=k,e.width=Math.floor(R*ft),e.height=Math.floor(k*ft),Q===!0&&(e.style.width=R+"px",e.style.height=k+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,R,k)},this.getDrawingBufferSize=function(R){return R.set(wt*ft,Lt*ft).floor()},this.setDrawingBufferSize=function(R,k,Q){wt=R,Lt=k,ft=Q,e.width=Math.floor(R*Q),e.height=Math.floor(k*Q),this.setViewport(0,0,R,k)},this.setEffects=function(R){if(b===dn){Se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let k=0;k<R.length;k++)if(R[k].isOutputPass===!0){Jt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(ht)},this.getViewport=function(R){return R.copy(Vt)},this.setViewport=function(R,k,Q,q){R.isVector4?Vt.set(R.x,R.y,R.z,R.w):Vt.set(R,k,Q,q),yt.viewport(ht.copy(Vt).multiplyScalar(Oe()).round())},this.getScissor=function(R){return R.copy(de)},this.setScissor=function(R,k,Q,q){R.isVector4?de.set(R.x,R.y,R.z,R.w):de.set(R,k,Q,q),yt.scissor(St.copy(de).multiplyScalar(Oe()).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(R){yt.setScissorTest(xe=R)},this.setOpaqueSort=function(R){Ot=R},this.setTransparentSort=function(R){Ee=R},this.getClearColor=function(R){return R.copy(z.getClearColor())},this.setClearColor=function(){z.setClearColor(...arguments)},this.getClearAlpha=function(){return z.getClearAlpha()},this.setClearAlpha=function(){z.setClearAlpha(...arguments)},this.clear=function(R=!0,k=!0,Q=!0){let q=0;if(R){let K=!1;if(at!==null){const Et=at.texture.format;K=f.has(Et)}if(K){const Et=at.texture.type,Nt=g.has(Et),bt=z.getClearColor(),Ct=z.getClearAlpha(),Gt=bt.r,$t=bt.g,ue=bt.b;Nt?(S[0]=Gt,S[1]=$t,S[2]=ue,S[3]=Ct,V.clearBufferuiv(V.COLOR,0,S)):(T[0]=Gt,T[1]=$t,T[2]=ue,T[3]=Ct,V.clearBufferiv(V.COLOR,0,T))}else q|=V.COLOR_BUFFER_BIT}k&&(q|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(q|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&V.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),L=R},this.dispose=function(){e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),z.dispose(),vt.dispose(),it.dispose(),Kt.dispose(),zt.dispose(),N.dispose(),mt.dispose(),Y.dispose(),ct.dispose(),Ut.dispose(),lt.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Ms),_t.removeEventListener("sessionend",Ss),sn.stop()};function Ht(R){R.preventDefault(),Ra("WebGLRenderer: Context Lost."),w=!0}function kt(){Ra("WebGLRenderer: Context Restored."),w=!1;const R=be.autoReset,k=Mt.enabled,Q=Mt.autoUpdate,q=Mt.needsUpdate,K=Mt.type;jt(),be.autoReset=R,Mt.enabled=k,Mt.autoUpdate=Q,Mt.needsUpdate=q,Mt.type=K}function pt(R){Se("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Xt(R){const k=R.target;k.removeEventListener("dispose",Xt),Le(k)}function Le(R){Qe(R),zt.remove(R)}function Qe(R){const k=zt.get(R).programs;k!==void 0&&(k.forEach(function(Q){lt.releaseProgram(Q)}),R.isShaderMaterial&&lt.releaseShaderCache(R))}this.renderBufferDirect=function(R,k,Q,q,K,Et){k===null&&(k=te);const Nt=K.isMesh&&K.matrixWorld.determinantAffine()<0,bt=Te(R,k,Q,q,K);yt.setMaterial(q,Nt);let Ct=Q.index,Gt=1;if(q.wireframe===!0){if(Ct=Y.getWireframeAttribute(Q),Ct===void 0)return;Gt=2}const $t=Q.drawRange,ue=Q.attributes.position;let Ft=$t.start*Gt,fe=($t.start+$t.count)*Gt;Et!==null&&(Ft=Math.max(Ft,Et.start*Gt),fe=Math.min(fe,(Et.start+Et.count)*Gt)),Ct!==null?(Ft=Math.max(Ft,0),fe=Math.min(fe,Ct.count)):ue!=null&&(Ft=Math.max(Ft,0),fe=Math.min(fe,ue.count));const Ue=fe-Ft;if(Ue<0||Ue===1/0)return;ct.setup(K,q,bt,Q,Ct);let y,D=tt;if(Ct!==null&&(y=A.get(Ct),D=rt,D.setIndex(y)),K.isMesh)q.wireframe===!0?(yt.setLineWidth(q.wireframeLinewidth*Oe()),D.setMode(V.LINES)):D.setMode(V.TRIANGLES);else if(K.isLine){let F=q.linewidth;F===void 0&&(F=1),yt.setLineWidth(F*Oe()),K.isLineSegments?D.setMode(V.LINES):K.isLineLoop?D.setMode(V.LINE_LOOP):D.setMode(V.LINE_STRIP)}else K.isPoints?D.setMode(V.POINTS):K.isSprite&&D.setMode(V.TRIANGLES);if(K.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))D.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const F=K._multiDrawStarts,G=K._multiDrawCounts,X=K._multiDrawCount,ut=Ct?A.get(Ct).bytesPerElement:1,Z=zt.get(q).currentProgram.getUniforms();for(let Rt=0;Rt<X;Rt++)Z.setValue(V,"_gl_DrawID",Rt),D.render(F[Rt]/ut,G[Rt])}else if(K.isInstancedMesh)D.renderInstances(Ft,Ue,K.count);else if(Q.isInstancedBufferGeometry){const F=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,G=Math.min(Q.instanceCount,F);D.renderInstances(Ft,Ue,G)}else D.render(Ft,Ue)};function Hi(R,k,Q,q){L!==null&&R.isNodeMaterial&&L.setObject(q,R),qt===!0&&st.setState(R,Q,!1),R.transparent===!0&&R.side===nn&&R.forceSinglePass===!1?(R.side=cn,R.needsUpdate=!0,je(R,k,q),R.side=Mi,R.needsUpdate=!0,je(R,k,q),R.side=nn):je(R,k,q)}this.compile=function(R,k,Q=null){Q===null&&(Q=R),L!==null&&L.renderStart(R,k,Q),x=it.get(Q),x.init(k),v.push(x),Q.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(x.pushLight(K),K.castShadow&&x.pushShadow(K))}),R!==Q&&R.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(x.pushLight(K),K.castShadow&&x.pushShadow(K))}),x.setupLights(),L!==null&&L.updateLights(x.state.lightsArray),le=this.localClippingEnabled,qt=st.init(this.clippingPlanes,le),qt===!0&&st.setGlobalState(this.clippingPlanes,k),L!==null&&Mt.render(x.state.shadowsArray,Q,k);const q=new Set;return R.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Et=K.material;if(Et)if(Array.isArray(Et))for(let Nt=0;Nt<Et.length;Nt++){const bt=Et[Nt];Hi(bt,Q,k,K),q.add(bt)}else Hi(Et,Q,k,K),q.add(Et)}),x=v.pop(),L!==null&&L.renderEnd(),q},this.compileAsync=function(R,k,Q=null){const q=this.compile(R,k,Q);return new Promise(K=>{function Et(){if(q.forEach(function(Nt){const Ct=zt.get(Nt).currentProgram;(Ct===void 0||Ct.isReady())&&q.delete(Nt)}),q.size===0){K(R);return}setTimeout(Et,10)}ee.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let ui=null;function Vi(R){ui&&ui(R)}function Ms(){sn.stop()}function Ss(){sn.start()}const sn=new Yh;sn.setAnimationLoop(Vi),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(R){ui=R,_t.setAnimationLoop(R),R===null?sn.stop():sn.start()},_t.addEventListener("sessionstart",Ms),_t.addEventListener("sessionend",Ss),this.render=function(R,k){if(k!==void 0&&k.isCamera!==!0){Se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;L!==null&&L.renderStart(R,k);const Q=_t.enabled===!0&&_t.isPresenting===!0,q=P!==null&&(at===null||Q)&&P.begin(C,at);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(_t.cameraAutoUpdate===!0&&_t.updateCamera(k),k=_t.getCamera()),R.isScene===!0&&R.onBeforeRender(C,R,k,at),x=it.get(R,v.length),x.init(k),x.state.textureUnits=Kt.getTextureUnits(),v.push(x),Wt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?Tt.setFromArrayCamera(k):oe.setFromProjectionMatrix(Wt,wn,k.reversedDepth),le=this.localClippingEnabled,qt=st.init(this.clippingPlanes,le),M=vt.get(R,h.length),M.init(),h.push(M),this.info.render.frame++,_t.enabled===!0&&_t.isPresenting===!0){const Nt=C.xr.getDepthSensingMesh();Nt!==null&&Mn(Nt,k,-1/0,C.sortObjects)}Mn(R,k,0,C.sortObjects),M.finish(),L!==null&&L.updateLights(x.state.lightsArray),C.sortObjects===!0&&M.sort(Ot,Ee),Pe=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,Pe&&z.addToRenderList(M,R),this.info.autoReset===!0&&this.info.reset(),qt===!0&&st.beginShadows();const K=x.state.shadowsArray;if(Mt.render(K,R,k),qt===!0&&st.endShadows(),(q&&P.hasRenderPass())===!1){const Nt=M.opaque,bt=M.transmissive;if(x.setupLights(),k.isArrayCamera){const Ct=k.cameras;if(bt.length>0)for(let Gt=0,$t=Ct.length;Gt<$t;Gt++){const ue=Ct[Gt];bs(Nt,bt,R,ue)}Pe&&z.render(R);for(let Gt=0,$t=Ct.length;Gt<$t;Gt++){const ue=Ct[Gt];ys(M,R,ue,ue.viewport)}}else bt.length>0&&bs(Nt,bt,R,k),Pe&&z.render(R),ys(M,R,k)}at!==null&&W===0&&(Kt.updateMultisampleRenderTarget(at),Kt.updateRenderTargetMipmap(at)),q&&P.end(C),R.isScene===!0&&R.onAfterRender(C,R,k),ct.resetDefaultState(),$=-1,j=null,v.pop(),v.length>0?(x=v[v.length-1],Kt.setTextureUnits(x.state.textureUnits),qt===!0&&st.setGlobalState(C.clippingPlanes,x.state.camera)):x=null,h.pop(),h.length>0?M=h[h.length-1]:M=null,L!==null&&L.renderEnd()};function Mn(R,k,Q,q){if(R.visible===!1)return;if(R.layers.test(k.layers)){if(R.isGroup)Q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(k);else if(R.isLight)x.pushLight(R),R.castShadow&&x.pushShadow(R);else if(R.isSprite){const Nt=k.isArrayCamera?Tt:oe;if(!R.frustumCulled||R.intersectsFrustum(Nt)){q&&Me.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Wt);const bt=mt.update(R),Ct=R.material;Ct.visible&&M.push(R,bt,Ct,Q,Me.z,null,k)}}else if(R.isMesh||R.isLine||R.isPoints){const Nt=k.isArrayCamera?Tt:oe;if(!R.frustumCulled||R.intersectsFrustum(Nt)){const bt=mt.update(R),Ct=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Me.copy(R.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Me.copy(bt.boundingSphere.center)),Me.applyMatrix4(R.matrixWorld).applyMatrix4(Wt)),Array.isArray(Ct)){const Gt=bt.groups;for(let $t=0,ue=Gt.length;$t<ue;$t++){const Ft=Gt[$t],fe=Ct[Ft.materialIndex];fe&&fe.visible&&M.push(R,bt,fe,Q,Me.z,Ft,k)}}else Ct.visible&&M.push(R,bt,Ct,Q,Me.z,null,k)}}}const Et=R.children;for(let Nt=0,bt=Et.length;Nt<bt;Nt++)Mn(Et[Nt],k,Q,q)}function ys(R,k,Q,q){const{opaque:K,transmissive:Et,transparent:Nt}=R;x.setupLightsView(Q),qt===!0&&st.setGlobalState(C.clippingPlanes,Q),q&&yt.viewport(ht.copy(q)),K.length>0&&Ce(K,k,Q),Et.length>0&&Ce(Et,k,Q),Nt.length>0&&Ce(Nt,k,Q),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function bs(R,k,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[q.id]===void 0){const Ft=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[q.id]=new Nn(1,1,{generateMipmaps:!0,type:Ft?Fn:dn,minFilter:si,samples:Math.max(4,Bt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:me.workingColorSpace})}const Et=x.state.transmissionRenderTarget[q.id],Nt=q.viewport||ht;Et.setSize(Nt.z*C.transmissionResolutionScale,Nt.w*C.transmissionResolutionScale);const bt=C.getRenderTarget(),Ct=C.getActiveCubeFace(),Gt=C.getActiveMipmapLevel();C.setRenderTarget(Et),C.getClearColor(et),xt=C.getClearAlpha(),xt<1&&C.setClearColor(16777215,.5),C.clear(),Pe&&z.render(Q);const $t=C.toneMapping;C.toneMapping=Zn;const ue=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),x.setupLightsView(q),qt===!0&&st.setGlobalState(C.clippingPlanes,q),Ce(R,Q,q),Kt.updateMultisampleRenderTarget(Et),Kt.updateRenderTargetMipmap(Et),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let fe=0,Ue=k.length;fe<Ue;fe++){const y=k[fe],{object:D,geometry:F,material:G,group:X}=y;if(G.side===nn&&D.layers.test(q.layers)){const ut=G.side;G.side=cn,G.needsUpdate=!0,Be(D,Q,q,F,G,X),G.side=ut,G.needsUpdate=!0,Ft=!0}}Ft===!0&&(Kt.updateMultisampleRenderTarget(Et),Kt.updateRenderTargetMipmap(Et))}C.setRenderTarget(bt,Ct,Gt),C.setClearColor(et,xt),ue!==void 0&&(q.viewport=ue),C.toneMapping=$t}function Ce(R,k,Q){const q=k.isScene===!0?k.overrideMaterial:null;for(let K=0,Et=R.length;K<Et;K++){const Nt=R[K],{object:bt,geometry:Ct,group:Gt}=Nt;let $t=Nt.material;$t.allowOverride===!0&&q!==null&&($t=q),bt.layers.test(Q.layers)&&Be(bt,k,Q,Ct,$t,Gt)}}function Be(R,k,Q,q,K,Et){L!==null&&K.isNodeMaterial&&L.setObject(R,K),R.onBeforeRender(C,k,Q,q,K,Et),R.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),K.onBeforeRender(C,k,Q,q,R,Et),K.transparent===!0&&K.side===nn&&K.forceSinglePass===!1?(K.side=cn,K.needsUpdate=!0,C.renderBufferDirect(Q,k,q,K,R,Et),K.side=Mi,K.needsUpdate=!0,C.renderBufferDirect(Q,k,q,K,R,Et),K.side=nn):C.renderBufferDirect(Q,k,q,K,R,Et),R.onAfterRender(C,k,Q,q,K,Et)}function Ne(R){let k=0;for(const Q of R)Q.texture!==null&&k++;return k}function je(R,k,Q){k.isScene!==!0&&(k=te);const q=zt.get(R),K=x.state.lights,Et=x.state.shadowsArray,Nt=K.state.version,bt=lt.getParameters(R,K.state,Et,k,Q,x.state.lightProbeGridArray),Ct=lt.getProgramCacheKey(bt);let Gt=q.programs;q.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;const $t=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;q.envMap=N.get(R.envMap||q.environment,$t),q.envMapRotation=q.environment!==null&&R.envMap===null?k.environmentRotation:R.envMapRotation,Gt===void 0&&(R.addEventListener("dispose",Xt),Gt=new Map,q.programs=Gt,q.programVariants=new Map);let ue=Gt.get(Ct);if(ue!==void 0){if(q.currentProgram===ue&&q.lightsStateVersion===Nt)return Es(R,bt),ue}else bt.uniforms=lt.getUniforms(R),L!==null&&R.isNodeMaterial&&L.build(R,Q,bt),R.onBeforeCompile(bt,C),ue=lt.acquireProgram(bt,Ct),Gt.set(Ct,ue),q.uniforms=bt.uniforms;const Ft=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ft.clippingPlanes=st.uniform),Es(R,bt),q.needsLights=Ko(R),q.lightsStateVersion=Nt,q.needsLights&&(Ft.ambientLightColor.value=K.state.ambient,Ft.lightProbe.value=K.state.probe,Ft.sunLights.value=K.state.sun,Ft.sunLightShadows.value=K.state.sunShadow,Ft.directionalLights.value=K.state.directional,Ft.directionalLightShadows.value=K.state.directionalShadow,Ft.spotLights.value=K.state.spot,Ft.spotLightShadows.value=K.state.spotShadow,Ft.rectAreaLights.value=K.state.rectArea,Ft.ltc_1.value=K.state.rectAreaLTC1,Ft.ltc_2.value=K.state.rectAreaLTC2,Ft.pointLights.value=K.state.point,Ft.pointLightShadows.value=K.state.pointShadow,Ft.hemisphereLights.value=K.state.hemi,Ft.sunShadowMatrix.value=K.state.sunShadowMatrix,Ft.sunShadowCascade.value=K.state.sunShadowCascade,Ft.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ft.spotLightMatrix.value=K.state.spotLightMatrix,Ft.spotLightMap.value=K.state.spotLightMap,Ft.pointShadowMatrix.value=K.state.pointShadowMatrix),q.numLightProbeGrids=Ne(x.state.lightProbeGridArray),q.currentProgram=ue,q.uniformsList=null,ue}function Bn(R,k,Q,q,K){const Et=zt.get(R),Nt=Et.currentProgram.id+","+q+","+K;let bt=Et.programVariants.get(Nt);return bt===void 0?(bt=je(R,k,Q),Et.programVariants.set(Nt,bt)):(Et.currentProgram=bt,Et.uniformsList=null,Et.outputColorSpace=q,Et.toneMapping=K),bt}function nr(R){if(R.uniformsList===null){const k=R.currentProgram.getUniforms();R.uniformsList=Fr.seqWithValue(k.seq,R.uniforms)}return R.uniformsList}function Es(R,k){const Q=zt.get(R);Q.outputColorSpace=k.outputColorSpace,Q.batching=k.batching,Q.batchingColor=k.batchingColor,Q.instancing=k.instancing,Q.instancingColor=k.instancingColor,Q.instancingMorph=k.instancingMorph,Q.skinning=k.skinning,Q.morphTargets=k.morphTargets,Q.morphNormals=k.morphNormals,Q.morphColors=k.morphColors,Q.morphTargetsCount=k.morphTargetsCount,Q.numClippingPlanes=k.numClippingPlanes,Q.numIntersection=k.numClipIntersection,Q.vertexAlphas=k.vertexAlphas,Q.vertexTangents=k.vertexTangents,Q.toneMapping=k.toneMapping}function Te(R,k,Q,q,K){k.isScene!==!0&&(k=te),Kt.resetTextureUnits();const Et=k.fog,Nt=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,bt=at===null?C.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:me.workingColorSpace,Ct=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Gt=N.get(q.envMap||Nt,Ct),$t=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ue=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ft=!!Q.morphAttributes.position,fe=!!Q.morphAttributes.normal,Ue=!!Q.morphAttributes.color;let y=Zn;q.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(y=C.toneMapping);const D=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,F=D!==void 0?D.length:0,G=zt.get(q),X=x.state.lights;if(qt===!0&&(le===!0||R!==j)){const pe=R===j&&q.id===$;st.setState(q,R,pe)}let ut=!1,Z=!1;q.version===G.__version?G.needsLights&&G.lightsStateVersion!==X.state.version||K.isBatchedMesh&&G.batching===!1||!K.isBatchedMesh&&G.batching===!0||K.isBatchedMesh&&G.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&G.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&G.instancing===!1||!K.isInstancedMesh&&G.instancing===!0||K.isSkinnedMesh&&G.skinning===!1||!K.isSkinnedMesh&&G.skinning===!0||K.isInstancedMesh&&G.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&G.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&G.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&G.instancingMorph===!1&&K.morphTexture!==null||G.envMap!==Gt||q.fog===!0&&G.fog!==Et||G.numClippingPlanes!==void 0&&(G.numClippingPlanes!==st.numPlanes||G.numIntersection!==st.numIntersection)||G.vertexAlphas!==$t||G.vertexTangents!==ue||G.morphTargets!==Ft||G.morphNormals!==fe||G.morphColors!==Ue||G.morphTargetsCount!==F||G.numLightProbeGrids!==Ne(x.state.lightProbeGridArray)?ut=!0:(G.outputColorSpace!==bt||G.toneMapping!==y)&&(Z=!0):(ut=!0,G.__version=q.version);let Rt=G.currentProgram;(ut===!0||Z===!0)&&(Rt=Z===!0?Bn(q,k,K,bt,y):je(q,k,K),L&&q.isNodeMaterial&&L.onUpdateProgram(q,Rt,G));let ne=!1,ve=!1,Pt=!1;const nt=Rt.getUniforms(),J=G.uniforms;if(yt.useProgram(Rt.program)&&(ne=!0,ve=!0,Pt=!0),q.id!==$&&($=q.id,ve=!0),ne||j!==R){yt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),nt.setValue(V,"projectionMatrix",R.projectionMatrix),nt.setValue(V,"viewMatrix",R.matrixWorldInverse);const Yt=nt.map.cameraPosition;Yt!==void 0&&Yt.setValue(V,_e.setFromMatrixPosition(R.matrixWorld)),Bt.logarithmicDepthBuffer&&nt.setValue(V,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&nt.setValue(V,"isOrthographic",R.isOrthographicCamera===!0),j!==R&&(j=R,ve=!0,Pt=!0)}if(G.needsLights&&(X.state.sunShadowMap.length>0&&nt.setValue(V,"sunShadowMap",X.state.sunShadowMap,Kt),X.state.directionalShadowMap.length>0&&nt.setValue(V,"directionalShadowMap",X.state.directionalShadowMap,Kt),X.state.spotShadowMap.length>0&&nt.setValue(V,"spotShadowMap",X.state.spotShadowMap,Kt),X.state.pointShadowMap.length>0&&nt.setValue(V,"pointShadowMap",X.state.pointShadowMap,Kt)),K.isSkinnedMesh){nt.setOptional(V,K,"bindMatrix"),nt.setOptional(V,K,"bindMatrixInverse");const pe=K.skeleton;pe&&(pe.boneTexture===null&&pe.computeBoneTexture(),nt.setValue(V,"boneTexture",pe.boneTexture,Kt))}K.isBatchedMesh&&(nt.setOptional(V,K,"batchingTexture"),nt.setValue(V,"batchingTexture",K._matricesTexture,Kt),nt.setOptional(V,K,"batchingIdTexture"),nt.setValue(V,"batchingIdTexture",K._indirectTexture,Kt),nt.setOptional(V,K,"batchingColorTexture"),K._colorsTexture!==null&&nt.setValue(V,"batchingColorTexture",K._colorsTexture,Kt));const se=Q.morphAttributes;if((se.position!==void 0||se.normal!==void 0||se.color!==void 0)&&ot.update(K,Q,Rt),(ve||G.receiveShadow!==K.receiveShadow)&&(G.receiveShadow=K.receiveShadow,nt.setValue(V,"receiveShadow",K.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(J.envMapIntensity.value=k.environmentIntensity),J.dfgLUT!==void 0&&(J.dfgLUT.value=og()),ve){if(nt.setValue(V,"toneMappingExposure",C.toneMappingExposure),G.needsLights&&Ts(J,Pt),Et&&q.fog===!0&&dt.refreshFogUniforms(J,Et),dt.refreshMaterialUniforms(J,q,ft,Lt,x.state.transmissionRenderTarget[R.id]),G.needsLights&&G.numLightProbeGrids>0){const pe=E;let Yt=0;for(const re of x.state.lightProbeGridArray)re.texture!==null&&(pe.textures[Yt]=re.texture,pe.min[Yt]=re.boundingBox.min,pe.max[Yt]=re.boundingBox.max,pe.resolution[Yt]=re.resolution,Yt++);for(const re in pe)pe[re].length=Yt;J.probesSH.value=pe.textures,J.probesMin.value=pe.min,J.probesMax.value=pe.max,J.probesResolution.value=pe.resolution}Fr.upload(V,nr(G),J,Kt)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Fr.upload(V,nr(G),J,Kt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&nt.setValue(V,"center",K.center),nt.setValue(V,"modelViewMatrix",K.modelViewMatrix),nt.setValue(V,"normalMatrix",K.normalMatrix),nt.setValue(V,"modelMatrix",K.matrixWorld),q.uniformsGroups!==void 0){const pe=q.uniformsGroups;for(let Yt=0,re=pe.length;Yt<re;Yt++){const mn=pe[Yt];Ut.update(mn,Rt),Ut.bind(mn,Rt)}}return Rt}function Ts(R,k){R.ambientLightColor.needsUpdate=k,R.lightProbe.needsUpdate=k,R.sunLights.needsUpdate=k,R.sunLightShadows.needsUpdate=k,R.directionalLights.needsUpdate=k,R.directionalLightShadows.needsUpdate=k,R.pointLights.needsUpdate=k,R.pointLightShadows.needsUpdate=k,R.spotLights.needsUpdate=k,R.spotLightShadows.needsUpdate=k,R.rectAreaLights.needsUpdate=k,R.hemisphereLights.needsUpdate=k}function Ko(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(R,k,Q){const q=zt.get(R);q.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),zt.get(R.texture).__webglTexture=k,zt.get(R.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Q,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,k){const Q=zt.get(R);Q.__webglFramebuffer=k,Q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(R,k=0,Q=0){at=R,U=k,W=Q;let q=null,K=!1,Et=!1;if(R){const bt=zt.get(R);if(bt.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(V.FRAMEBUFFER,bt.__webglFramebuffer),ht.copy(R.viewport),St.copy(R.scissor),At=R.scissorTest,yt.viewport(ht),yt.scissor(St),yt.setScissorTest(At),$=-1;return}else if(bt.__webglFramebuffer===void 0)Kt.setupRenderTarget(R);else if(bt.__hasExternalTextures)Kt.rebindTextures(R,zt.get(R.texture).__webglTexture,zt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const $t=R.depthTexture;if(bt.__boundDepthTexture!==$t){if($t!==null&&zt.has($t)&&(R.width!==$t.image.width||R.height!==$t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(R)}}const Ct=R.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Et=!0);const Gt=zt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Gt[k])?q=Gt[k][Q]:q=Gt[k],K=!0):R.samples>0&&Kt.useMultisampledRTT(R)===!1?q=zt.get(R).__webglMultisampledFramebuffer:Array.isArray(Gt)?q=Gt[Q]:q=Gt,ht.copy(R.viewport),St.copy(R.scissor),At=R.scissorTest}else ht.copy(Vt).multiplyScalar(ft).floor(),St.copy(de).multiplyScalar(ft).floor(),At=xe;if(Q!==0&&(q=B),yt.bindFramebuffer(V.FRAMEBUFFER,q)&&yt.drawBuffers(R,q),yt.viewport(ht),yt.scissor(St),yt.setScissorTest(At),K){const bt=zt.get(R.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+k,bt.__webglTexture,Q)}else if(Et){const bt=k;for(let Ct=0;Ct<R.textures.length;Ct++){const Gt=zt.get(R.textures[Ct]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Ct,Gt.__webglTexture,Q,bt)}}else if(R!==null&&Q!==0){const bt=zt.get(R.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,bt.__webglTexture,Q)}$=-1};function fi(R){const k=zt.get(R);return(k.__readFormat!==R.format||k.__readType!==R.type)&&(k.__readFormat=R.format,k.__readType=R.type,k.__formatReadable=Bt.textureFormatReadable(R.format),k.__typeReadable=Bt.textureTypeReadable(R.type)),k}this.readRenderTargetPixels=function(R,k,Q,q,K,Et,Nt,bt=0){if(!(R&&R.isWebGLRenderTarget)){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=zt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ct=Ct[Nt],Array.isArray(Ct)&&(Ct=Ct[0])),Ct){yt.bindFramebuffer(V.FRAMEBUFFER,Ct);try{const Gt=R.textures[bt],$t=Gt.format,ue=Gt.type;R.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+bt);const Ft=fi(Gt);if(Ft.__formatReadable===!1){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=R.width-q&&Q>=0&&Q<=R.height-K&&V.readPixels(k,Q,q,K,gt.convert($t),gt.convert(ue),Et)}finally{const Gt=at!==null?zt.get(at).__webglFramebuffer:null;yt.bindFramebuffer(V.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(R,k,Q,q,K,Et,Nt,bt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=zt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Nt!==void 0&&(Ct=Ct[Nt],Array.isArray(Ct)&&(Ct=Ct[0])),Ct)if(k>=0&&k<=R.width-q&&Q>=0&&Q<=R.height-K){yt.bindFramebuffer(V.FRAMEBUFFER,Ct);const Gt=R.textures[bt],$t=Gt.format,ue=Gt.type;R.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+bt);const Ft=fi(Gt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const fe=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,fe),V.bufferData(V.PIXEL_PACK_BUFFER,Et.byteLength,V.STREAM_READ),V.readPixels(k,Q,q,K,gt.convert($t),gt.convert(ue),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);const Ue=at!==null?zt.get(at).__webglFramebuffer:null;yt.bindFramebuffer(V.FRAMEBUFFER,Ue);const y=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Mu(V,y,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,fe),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Et),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(fe),V.deleteSync(y),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,k=null,Q=0){const q=Math.pow(2,-Q),K=Math.floor(R.image.width*q),Et=Math.floor(R.image.height*q),Nt=k!==null?k.x:0,bt=k!==null?k.y:0;Kt.setTexture2D(R,0),V.copyTexSubImage2D(V.TEXTURE_2D,Q,0,0,Nt,bt,K,Et),yt.unbindTexture()},this.copyTextureToTexture=function(R,k,Q=null,q=null,K=0,Et=0){let Nt,bt,Ct,Gt,$t,ue,Ft,fe,Ue;const y=R.isCompressedTexture?R.mipmaps[Et]:R.image;if(Q!==null)Nt=Q.max.x-Q.min.x,bt=Q.max.y-Q.min.y,Ct=Q.isBox3?Q.max.z-Q.min.z:1,Gt=Q.min.x,$t=Q.min.y,ue=Q.isBox3?Q.min.z:0;else{const nt=Math.pow(2,-K);Nt=Math.floor(y.width*nt),bt=Math.floor(y.height*nt),R.isDataArrayTexture?Ct=y.depth:R.isData3DTexture?Ct=Math.floor(y.depth*nt):Ct=1,Gt=0,$t=0,ue=0}q!==null?(Ft=q.x,fe=q.y,Ue=q.z):(Ft=0,fe=0,Ue=0);const D=gt.convert(k.format),F=gt.convert(k.type);let G;k.isData3DTexture?(Kt.setTexture3D(k,0),G=V.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Kt.setTexture2DArray(k,0),G=V.TEXTURE_2D_ARRAY):(Kt.setTexture2D(k,0),G=V.TEXTURE_2D),yt.activeTexture(V.TEXTURE0),yt.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,k.flipY),yt.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),yt.pixelStorei(V.UNPACK_ALIGNMENT,k.unpackAlignment);const X=yt.getParameter(V.UNPACK_ROW_LENGTH),ut=yt.getParameter(V.UNPACK_IMAGE_HEIGHT),Z=yt.getParameter(V.UNPACK_SKIP_PIXELS),Rt=yt.getParameter(V.UNPACK_SKIP_ROWS),ne=yt.getParameter(V.UNPACK_SKIP_IMAGES);yt.pixelStorei(V.UNPACK_ROW_LENGTH,y.width),yt.pixelStorei(V.UNPACK_IMAGE_HEIGHT,y.height),yt.pixelStorei(V.UNPACK_SKIP_PIXELS,Gt),yt.pixelStorei(V.UNPACK_SKIP_ROWS,$t),yt.pixelStorei(V.UNPACK_SKIP_IMAGES,ue);const ve=R.isDataArrayTexture||R.isData3DTexture,Pt=k.isDataArrayTexture||k.isData3DTexture;if(R.isDepthTexture){const nt=zt.get(R),J=zt.get(k),se=zt.get(nt.__renderTarget),pe=zt.get(J.__renderTarget);yt.bindFramebuffer(V.READ_FRAMEBUFFER,se.__webglFramebuffer),yt.bindFramebuffer(V.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let Yt=0;Yt<Ct;Yt++)ve&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,zt.get(R).__webglTexture,K,ue+Yt),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,zt.get(k).__webglTexture,Et,Ue+Yt)),V.blitFramebuffer(Gt,$t,Gt+Nt,$t+bt,Ft,fe,Ft+Nt,fe+bt,V.DEPTH_BUFFER_BIT,V.NEAREST);yt.bindFramebuffer(V.READ_FRAMEBUFFER,null),yt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(K!==0||R.isRenderTargetTexture||zt.has(R)){const nt=zt.get(R),J=zt.get(k);yt.bindFramebuffer(V.READ_FRAMEBUFFER,I),yt.bindFramebuffer(V.DRAW_FRAMEBUFFER,H);for(let se=0;se<Ct;se++)ve?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,nt.__webglTexture,K,ue+se):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,nt.__webglTexture,K),Pt?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,J.__webglTexture,Et,Ue+se):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,J.__webglTexture,Et),K!==0?V.blitFramebuffer(Gt,$t,Gt+Nt,$t+bt,Ft,fe,Ft+Nt,fe+bt,V.COLOR_BUFFER_BIT,V.NEAREST):Pt?V.copyTexSubImage3D(G,Et,Ft,fe,Ue+se,Gt,$t,Nt,bt):V.copyTexSubImage2D(G,Et,Ft,fe,Gt,$t,Nt,bt);yt.bindFramebuffer(V.READ_FRAMEBUFFER,null),yt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Pt?R.isDataTexture||R.isData3DTexture?V.texSubImage3D(G,Et,Ft,fe,Ue,Nt,bt,Ct,D,F,y.data):k.isCompressedArrayTexture?V.compressedTexSubImage3D(G,Et,Ft,fe,Ue,Nt,bt,Ct,D,y.data):V.texSubImage3D(G,Et,Ft,fe,Ue,Nt,bt,Ct,D,F,y):R.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Et,Ft,fe,Nt,bt,D,F,y.data):R.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Et,Ft,fe,y.width,y.height,D,y.data):V.texSubImage2D(V.TEXTURE_2D,Et,Ft,fe,Nt,bt,D,F,y);yt.pixelStorei(V.UNPACK_ROW_LENGTH,X),yt.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ut),yt.pixelStorei(V.UNPACK_SKIP_PIXELS,Z),yt.pixelStorei(V.UNPACK_SKIP_ROWS,Rt),yt.pixelStorei(V.UNPACK_SKIP_IMAGES,ne),Et===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&V.generateMipmap(G),yt.unbindTexture()},this.initRenderTarget=function(R){zt.get(R).__webglFramebuffer===void 0&&Kt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Kt.setTextureCube(R,0):R.isData3DTexture?Kt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Kt.setTexture2DArray(R,0):Kt.setTexture2D(R,0),yt.unbindTexture()},this.resetState=function(){U=0,W=0,at=null,yt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=me._getDrawingBufferColorSpace(t),e.unpackColorSpace=me._getUnpackColorSpace()}}const Pc=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Do,AddEquation:Ni,AddOperation:sh,AdditiveBlending:qs,AgXToneMapping:Va,AlphaFormat:Ja,AlwaysCompare:tl,AlwaysDepth:Br,AlwaysStencilFunc:lh,ArcCurve:Rh,ArrayCamera:Vh,BackSide:cn,BasicDepthPacking:oh,Box3:bi,BoxGeometry:Ve,BufferAttribute:hn,BufferGeometry:We,ByteType:Ya,Camera:vl,CanvasTexture:Da,CatmullRomCurve3:Ch,CineonToneMapping:ka,ClampToEdgeWrapping:qn,Color:ie,ColorManagement:me,ConeGeometry:Kn,ConstantAlphaFactor:eh,ConstantColorFactor:jc,Controls:Xh,CubeCamera:wo,CubeDepthTexture:fl,CubeReflectionMapping:zi,CubeRefractionMapping:us,CubeTexture:ul,CubicBezierCurve:Ph,CubicBezierCurve3:Dh,CullFaceBack:Ea,CullFaceFront:Oc,CullFaceNone:Fc,Curve:Jn,CustomBlending:zc,CustomToneMapping:Ha,CylinderGeometry:Rn,Data3DTexture:yh,DataArrayTexture:sl,DataTexture:al,DepthFormat:li,DepthStencilFormat:ri,DepthTexture:ki,DirectionalLight:La,DoubleSide:nn,DstAlphaFactor:Zc,DstColorFactor:Jc,DynamicDrawUsage:el,EllipseCurve:pl,EqualCompare:uh,EqualDepth:Gr,EquirectangularReflectionMapping:Dr,EquirectangularRefractionMapping:Lr,Euler:On,EventDispatcher:hi,ExternalTexture:dl,Float32BufferAttribute:Re,FloatType:An,FogExp2:ko,FrontSide:Mi,Frustum:ps,FrustumArray:Ho,GLSL3:wa,GreaterCompare:fh,GreaterDepth:Hr,GreaterEqualCompare:ja,GreaterEqualDepth:kr,Group:vn,HalfFloatType:Fn,HemisphereLight:kh,IcosahedronGeometry:Wo,ImageUtils:Mh,InstancedBufferAttribute:Ca,InstancedMesh:ll,IntType:Lo,KeepStencilOp:Nr,Layers:Go,LessCompare:hh,LessDepth:zr,LessEqualCompare:Qa,LessEqualDepth:hs,Light:xl,LightShadow:Hh,Line:Th,LineBasicMaterial:cl,LineCurve:Lh,LineCurve3:Ih,LineSegments:Ah,LinearFilter:ln,LinearMipmapLinearFilter:si,LinearMipmapNearestFilter:Ir,LinearSRGBColorSpace:Js,LinearToneMapping:za,LinearTransfer:$s,MOUSE:Fi,Material:Ti,MathUtils:Bi,Matrix3:Qt,Matrix4:ge,MaxEquation:Vc,Mesh:ye,MeshBasicMaterial:Xn,MeshDepthMaterial:zh,MeshDistanceMaterial:Gh,MeshStandardMaterial:gs,MinEquation:Hc,MirroredRepeatWrapping:Xr,MixOperation:ih,MultiplyBlending:Aa,MultiplyOperation:Ba,NearestFilter:Ke,NearestMipmapLinearFilter:Us,NearestMipmapNearestFilter:rh,NeutralToneMapping:Wa,NeverCompare:ch,NeverDepth:Or,NoBlending:Oi,NoColorSpace:ii,NoToneMapping:Zn,NormalBlending:ls,NotEqualCompare:dh,NotEqualDepth:Vr,Object3D:ke,ObjectSpaceNormalMap:ah,OneFactor:Xc,OneMinusConstantAlphaFactor:nh,OneMinusConstantColorFactor:th,OneMinusDstAlphaFactor:Kc,OneMinusDstColorFactor:$c,OneMinusSrcAlphaFactor:Oa,OneMinusSrcColorFactor:qc,OrthographicCamera:Ml,PCFShadowMap:Os,PCFSoftShadowMap:Bc,PMREMGenerator:tr,PerspectiveCamera:En,Plane:Wn,PlaneGeometry:ci,Points:wh,PointsMaterial:hl,PolyhedronGeometry:Vo,QuadraticBezierCurve:Nh,QuadraticBezierCurve3:gl,Quaternion:pn,R11_EAC_Format:jr,RED_GREEN_RGTC2_Format:Ks,RED_RGTC1_Format:Mo,REVISION:Po,RG11_EAC_Format:Zs,RGBAFormat:In,RGBAIntegerFormat:Bo,RGBA_ASTC_10x10_Format:po,RGBA_ASTC_10x5_Format:ho,RGBA_ASTC_10x6_Format:uo,RGBA_ASTC_10x8_Format:fo,RGBA_ASTC_12x10_Format:mo,RGBA_ASTC_12x12_Format:go,RGBA_ASTC_4x4_Format:no,RGBA_ASTC_5x4_Format:io,RGBA_ASTC_5x5_Format:so,RGBA_ASTC_6x5_Format:ro,RGBA_ASTC_6x6_Format:oo,RGBA_ASTC_8x5_Format:ao,RGBA_ASTC_8x6_Format:lo,RGBA_ASTC_8x8_Format:co,RGBA_BPTC_Format:_o,RGBA_ETC2_EAC_Format:Qr,RGBA_PVRTC_2BPPV1_Format:Kr,RGBA_PVRTC_4BPPV1_Format:Zr,RGBA_S3TC_DXT1_Format:zs,RGBA_S3TC_DXT3_Format:Gs,RGBA_S3TC_DXT5_Format:ks,RGBFormat:$a,RGB_BPTC_SIGNED_Format:xo,RGB_BPTC_UNSIGNED_Format:vo,RGB_ETC1_Format:Jr,RGB_ETC2_Format:$r,RGB_PVRTC_2BPPV1_Format:qr,RGB_PVRTC_4BPPV1_Format:Yr,RGB_S3TC_DXT1_Format:Bs,RGFormat:Si,RGIntegerFormat:Oo,RawShaderMaterial:Bh,Ray:xs,Raycaster:Wh,RedFormat:Uo,RedIntegerFormat:Fo,ReinhardToneMapping:Ga,RenderTarget:Sh,RepeatWrapping:Wr,ReverseSubtractEquation:kc,RingGeometry:js,SIGNED_R11_EAC_Format:to,SIGNED_RED_GREEN_RGTC2_Format:yo,SIGNED_RED_RGTC1_Format:So,SIGNED_RG11_EAC_Format:eo,SRGBColorSpace:an,SRGBTransfer:we,Scene:Eh,ShaderChunk:ae,ShaderLib:Ln,ShaderMaterial:yi,ShortType:qa,Sphere:Ei,SphereGeometry:vi,Spherical:Na,SplineCurve:Uh,SrcAlphaFactor:Fa,SrcAlphaSaturateFactor:Qc,SrcColorFactor:Yc,StaticDrawUsage:ph,SubtractEquation:Gc,SubtractiveBlending:Ta,TOUCH:Ui,TangentSpaceNormalMap:bo,Texture:$e,TextureSource:zo,TorusGeometry:ai,Triangle:Tn,TubeGeometry:_l,UVMapping:Xa,Uint16BufferAttribute:rl,Uint32BufferAttribute:ol,UniformsLib:Dt,UniformsUtils:Oh,UnsignedByteType:dn,UnsignedInt101111Type:Ka,UnsignedInt248Type:Gi,UnsignedInt5999Type:Za,UnsignedIntType:Un,UnsignedShort4444Type:Io,UnsignedShort5551Type:No,UnsignedShortType:fs,VSMShadowMap:os,Vector2:It,Vector3:O,Vector4:Ie,WebGLCoordinateSystem:wn,WebGLCubeRenderTarget:Xo,WebGLRenderTarget:Nn,WebGLRenderer:su,WebGLUtils:nu,WebGPUCoordinateSystem:ds,WebXRController:Ur,ZeroFactor:Wc,createCanvasElement:mh,error:Se,log:Ra,warn:Jt,warnOnce:Hs},Symbol.toStringTag,{value:"Module"})),Dc={type:"change"},Sl={type:"start"},ru={type:"end"},Cr=new xs,Lc=new Wn,ag=Math.cos(70*Bi.DEG2RAD),He=new O,fn=2*Math.PI,Ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ba=1e-6;class lg extends Xh{constructor(t,e=null){super(t,e),this.state=Ae.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fi.ROTATE,MIDDLE:Fi.DOLLY,RIGHT:Fi.PAN},this.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new pn,this._lastTargetPosition=new O,this._quat=new pn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Na,this._sphericalDelta=new Na,this._scale=1,this._panOffset=new O,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new O,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hg.bind(this),this._onPointerDown=cg.bind(this),this._onPointerUp=ug.bind(this),this._onContextMenu=xg.bind(this),this._onMouseWheel=pg.bind(this),this._onKeyDown=mg.bind(this),this._onTouchStart=gg.bind(this),this._onTouchMove=_g.bind(this),this._onMouseDown=fg.bind(this),this._onMouseMove=dg.bind(this),this._interceptControlDown=vg.bind(this),this._interceptControlUp=Mg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ae.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dc),this.update(),this.state=Ae.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;He.copy(e).sub(this.target),He.applyQuaternion(this._quat),this._spherical.setFromVector3(He),this.autoRotate&&this.state===Ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=fn:n>Math.PI&&(n-=fn),s<-Math.PI?s+=fn:s>Math.PI&&(s-=fn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(He.setFromSpherical(this._spherical),He.applyQuaternion(this._quatInverse),e.copy(this.target).add(He),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=He.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=He.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Cr.origin.copy(this.object.position),Cr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cr.direction))<ag?this.object.lookAt(this.target):(Lc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cr.intersectPlane(Lc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ba||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ba||this._lastTargetPosition.distanceToSquared(this.target)>ba?(this.dispatchEvent(Dc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?fn/60*this.autoRotateSpeed*t:fn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){He.setFromMatrixColumn(e,0),He.multiplyScalar(-t),this._panOffset.add(He)}_panUp(t,e){this.screenSpacePanning===!0?He.setFromMatrixColumn(e,1):(He.setFromMatrixColumn(e,0),He.crossVectors(this.object.up,He)),He.multiplyScalar(t),this._panOffset.add(He)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;He.copy(s).sub(this.target);let r=He.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function cg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function hg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ug(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ru),this.state=Ae.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function fg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Fi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ae.DOLLY;break;case Fi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}break;case Fi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ae.PAN}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(Sl)}function dg(i){switch(this.state){case Ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function pg(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ae.NONE||(i.preventDefault(),this.dispatchEvent(Sl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ru))}function mg(i){this.enabled!==!1&&this._handleKeyDown(i)}function gg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ui.ROTATE:if(this.enableRotate===!1){this.state=Ae.NONE;break}this._handleTouchStartRotate(i),this.state=Ae.TOUCH_ROTATE;break;case Ui.PAN:if(this.enablePan===!1){this.state=Ae.NONE;break}this._handleTouchStartPan(i),this.state=Ae.TOUCH_PAN;break;default:this.state=Ae.NONE}break;case 2:switch(this.touches.TWO){case Ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ae.TOUCH_DOLLY_PAN;break;case Ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ae.TOUCH_DOLLY_ROTATE;break;default:this.state=Ae.NONE}break;default:this.state=Ae.NONE}this.state!==Ae.NONE&&this.dispatchEvent(Sl)}function _g(i){switch(this._trackPointer(i),this.state){case Ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ae.NONE}}function xg(i){this.enabled!==!1&&i.preventDefault()}function vg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Mg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ns=new O;function bn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Ns.copy(t),Ns[n]=0,Ns.normalize();const l=.5*o/(o+a),d=1-Ns.angleTo(i)/c;return Math.sign(Ns[e])===1?d*l:a/(o+a)+l+l*(1-d)}class Ro extends Ve{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new O,l=new O,d=new O(t,e,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,u=this.attributes.normal.array,p=this.attributes.uv.array,_=m.length/6,b=new O,f=.5/o;for(let g=0,S=0;g<m.length;g+=3,S+=2)switch(c.fromArray(m,g),l.copy(c),l.x-=Math.sign(l.x)*f,l.y-=Math.sign(l.y)*f,l.z-=Math.sign(l.z)*f,l.normalize(),m[g+0]=d.x*Math.sign(c.x)+l.x*r,m[g+1]=d.y*Math.sign(c.y)+l.y*r,m[g+2]=d.z*Math.sign(c.z)+l.z*r,u[g+0]=l.x,u[g+1]=l.y,u[g+2]=l.z,Math.floor(g/_)){case 0:b.set(1,0,0),p[S+0]=bn(b,l,"z","y",r,n),p[S+1]=1-bn(b,l,"y","z",r,e);break;case 1:b.set(-1,0,0),p[S+0]=1-bn(b,l,"z","y",r,n),p[S+1]=1-bn(b,l,"y","z",r,e);break;case 2:b.set(0,1,0),p[S+0]=1-bn(b,l,"x","z",r,t),p[S+1]=bn(b,l,"z","x",r,n);break;case 3:b.set(0,-1,0),p[S+0]=1-bn(b,l,"x","z",r,t),p[S+1]=1-bn(b,l,"z","x",r,n);break;case 4:b.set(0,0,1),p[S+0]=1-bn(b,l,"x","y",r,t),p[S+1]=1-bn(b,l,"y","x",r,e);break;case 5:b.set(0,0,-1),p[S+0]=bn(b,l,"x","y",r,t),p[S+1]=1-bn(b,l,"y","x",r,e);break}}static fromJSON(t){return new Ro(t.width,t.height,t.depth,t.segments,t.radius)}}function Yn(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new We;c.morphTargetsRelative=a;let l=0;for(let d=0;d<i.length;++d){const m=i[d];let u=0,p=0;if(e!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in m.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(m.attributes[_]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(a!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in m.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;if(m.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;o[_]===void 0&&(o[_]=[]),o[_].push(m.morphAttributes[_]),p++}if(p!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of morph attributes."),null;if(t){let _;if(e)_=m.index.count;else if(m.attributes.position!==void 0)_=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,d),l+=_}}if(e){let d=0;const m=[];for(let u=0;u<i.length;++u){const p=i[u].index;for(let _=0;_<p.count;++_)m.push(p.getX(_)+d);d+=i[u].attributes.position.count}c.setIndex(m)}for(const d in r){const m=Ic(r[d]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,m)}for(const d in o){const m=o[d][0].length;if(m!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<m;++u){const p=[];for(let b=0;b<o[d].length;++b)p.push(o[d][b][u]);const _=Ic(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(_)}}}return c}function Ic(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const d=i[l];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*e}const o=new t(r),a=new hn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const d=i[l];if(d.isInterleavedBufferAttribute){const m=c/e;for(let u=0,p=d.count;u<p;u++)for(let _=0;_<e;_++){const b=d.getComponent(u,_);a.setComponent(u+m,_,b)}}else o.set(d.array,c);c+=d.count*e}return s!==void 0&&(a.gpuType=s),a}const Sg=128,yg=8,bg=-36.75,Eg=-28,Tg=10.5,Ag=12,wg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],ze={capacity:Sg,columns:yg,startX:bg,startZ:Eg,spacingX:Tg,spacingZ:Ag,boxes:wg};function Zo(i){return Number.isInteger(i)&&i>=0&&i<ze.capacity?{slot:i,x:ze.startX+i%ze.columns*ze.spacingX,z:ze.startZ-Math.floor(i/ze.columns)*ze.spacingZ}:null}function Rg(i,t=i,e=null,n=ze.capacity,s=.4){const r=[],o=Math.min(i.x,t.x)-s,a=Math.max(i.x,t.x)+s,c=Math.min(i.z,t.z)-s,l=Math.max(i.z,t.z)+s,d=Math.max(0,Math.ceil((o-5.1-ze.startX)/ze.spacingX)),m=Math.min(ze.columns-1,Math.floor((a+5.1-ze.startX)/ze.spacingX)),u=Math.max(0,Math.ceil((ze.startZ-l-5.3)/ze.spacingZ)),p=Math.min(Math.ceil(ze.capacity/ze.columns)-1,Math.floor((ze.startZ-c+5.3)/ze.spacingZ));for(let _=u;_<=p;_++)for(let b=d;b<=m;b++){const f=_*ze.columns+b,g=Zo(f);if(!(!g||f>=n))for(const S of ze.boxes)S.tag==="home-door"&&f===e||r.push({left:g.x+S.x-S.w/2,right:g.x+S.x+S.w/2,back:g.z+S.z-S.d/2,front:g.z+S.z+S.d/2,top:S.top,tag:S.tag})}return r}function Ii(i,t){return!!(t&&i&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function Cg({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new ge,d=new pn,m=new O(1,1,1),u=new ge().makeScale(0,0,0);let p=null,_=1,b=0,f=null;const g={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function S(w,L,B,I,H,U="inside",W=0){L=g[L]||L;let at=w;at.index&&(at=w.toNonIndexed(),w.dispose()),d.setFromEuler(new On(0,0,W)),at.applyMatrix4(l.compose(new O(B,I,H),d,m));const $=`${U}:${L}`;o.has($)||o.set($,{layer:U,color:L,geometries:[]}),o.get($).geometries.push(at)}const T=(w,L,B,I,H,U,W,at="inside",$=0)=>S(new Ve(w,L,B),W,I,H,U,at,$),E=(w,L,B,I,H,U)=>S(new Rn(w,w,L,10),U,B,I,H);function M(w,L,B,I,H){S(new vi(w,9,6),H,L,B,I)}T(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),T(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),T(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),T(9.2,.08,7.8,0,.16,0,"#c8a178");for(let w=-4.2;w<4.5;w+=.7)T(.018,.012,7.6,w,.21,0,"#ab8965");T(3,.22,1,0,-.04,4.3,"#d7c5a7"),T(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),T(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),T(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),T(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const w of[-2.7,2.7])T(4,3.45,.18,w,1.9,3.9,"#e7dec9","front");T(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),T(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),T(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const w of[-2.85,2.85]){T(2.35,1.55,.12,w,2.05,4.04,"#71948d","front");for(const L of[-1.2,0,1.2])T(.055,1.65,.14,w+L,2.05,4.12,"#cfbb8c","front");for(const L of[1.23,2.87])T(2.45,.065,.14,w,L,4.12,"#cfbb8c","front");T(.23,.5,.14,w<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const w of[-1,1])T(4.95,.22,8.65,w*2.37,3.98,0,"#47695f","roof",w*-.18),T(4.95,.12,.12,w*2.37,3.96,4.35,"#c1a771","roof",w*-.18);T(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const w of[-2,-.5,1])T(2.25,.06,1.25,2.5,4.08,w,"#29434f","roof",-.18);T(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),T(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),T(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),T(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),T(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),T(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),T(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),E(.05,.35,-3.85,1.05,-2.4,"#bda16a"),E(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),T(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let w=0;w<4;w++)T(1.65,.024,.03,-2.15,2.88+w*.045,-3.55,"#8d9e98");T(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),T(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),T(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const w of[.98,1.91])T(.05,.37,.08,3.29,w,-2.25,"#56746a");T(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),T(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),T(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),E(.035,.3,3.45,1.45,-1.08,"#baa371"),E(.18,.3,2.1,1.43,-.75,"#e8dcc3"),T(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),T(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),T(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),T(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),E(.2,.33,.85,.43,-3.15,"#eee9de"),T(.5,.5,.22,.85,.68,-3.65,"#eee9de"),T(.55,.12,.42,1.5,1,-2.1,"#eee9de"),E(.025,1.65,1.5,1.9,-3.65,"#baa371"),T(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),T(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),T(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const w of[1.55,4.05])T(.23,.57,1,w,.72,2.45,"#a7b3a0");T(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),T(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const w of[.7,1.7])T(.08,.4,.6,w,.48,1.4,"#8c7556");T(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),T(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),T(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),T(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let w=0;w<8;w++)T(.11,.32+w%2*.1,.22,-3.2+w*.17,1.65,3.45,w%2?"#879f93":"#e2ca9e");for(const w of[-4.9,4.9]){T(.08,.7,10,w,.19,.1,"#aa9270");for(const L of[-4.7,0,4.7])T(.13,1,.13,w,.36,L,"#aa9270")}for(const w of[-3.6,3.6])E(.29,.45,w,.14,4.65,"#b58a69"),M(.4,w,.68,4.65,"#78946e");for(const{layer:w,color:L,geometries:B}of o.values()){const I=Yn(B,!1);B.forEach(U=>U.dispose()),e.add(I);const H=new ll(I,t(L),128);H.instanceMatrix.setUsage(el),H.count=0,H.userData.residenceLayer=w,i.add(H),a.push(H)}o.clear();const x=new Ve(1,1,1);e.add(x);const h=new ye(x,t("#b4c5ab"));h.userData.residenceGround=!0,i.add(h);const v=new ye(x,t("#e4dcc9"));i.add(v);function P(w){const L=Zo(w);return{x:L.x,z:L.z}}function C(){const w=Math.max(b,s.reduce((B,I,H)=>I===null?B:H+1,0));_=Math.max(1,Math.ceil(w/8));for(const B of a){B.count=w;for(let I=0;I<w;I++){const H=s[I],U=P(I);f!==null&&H!==f||H===null&&I>=b||H!==null&&H===(f??p)&&["roof","front"].includes(B.userData.residenceLayer)?B.setMatrixAt(I,u):B.userData.residenceLayer==="door"?B.setMatrixAt(I,l.compose(new O(U.x-.65,0,U.z+3.99),new pn().setFromAxisAngle(new O(0,1,0),c.has(H)?-Math.PI/2:0),m)):B.setMatrixAt(I,l.compose(new O(U.x,0,U.z),new pn,m))}B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere()}const L=_*12+4;h.scale.set(86,.3,L),h.position.set(0,-.55,-20-L/2),v.scale.set(1.5,.04,L),v.position.set(0,-.12,-20-L/2),h.visible=v.visible=w>0&&f===null}return{meshes:a,interior(w){f=r.has(w)?w:null,C()},slotFor:w=>r.get(w),setPlots(w){b=Math.min(128,Math.max(0,Number(w)||0)),C()},sync(w){const L=new Set(w.slice(0,128).map(B=>B.id));for(const[B,I]of r)L.has(B)||(s[I]=null,r.delete(B));for(const B of w.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(B.id)!==I&&(r.has(B.id)&&(s[r.get(B.id)]=null),r.delete(B.id))}for(const B of w.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=B.id,r.set(B.id,I))}for(const B of[...L].sort((I,H)=>I-H))if(!r.has(B)){const I=s.indexOf(null);s[I]=B,r.set(B,I)}r.has(p)||(p=null),C()},select(w){p=r.has(w)?w:null,C()},setDoor(w,L){L?c.add(w):c.delete(w),C()},location(w){const L=r.get(w);return L===void 0?null:P(L)},bed(w){const L=this.location(w);return L?[L.x-2.05,.92,L.z-.5]:null},cameraBoxes(w){const L=this.location(w);if(!L)return[];const B=(H,U,W,at,$)=>({left:L.x+H-W/2,right:L.x+H+W/2,back:L.z+U-at/2,front:L.z+U+at/2,top:$}),I=[B(-4.6,0,.18,7.8,3.6),B(0,-3.9,9.4,.18,3.6),B(3.65,-2.78,1.05,.92,2.3),B(2.95,-.75,2.62,.95,1.3),B(2.8,2.45,2.6,1.2,1.3)];return w!==p&&I.push(B(4.6,0,.18,7.8,3.6),B(0,3.9,9.4,.18,3.6)),I},personForHit(w){return w?.object?.userData?.residenceLayer&&Number.isInteger(w.instanceId)?s[w.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-_*12,front:-20}},dispose(){a.forEach(w=>{w.dispose(),i.remove(w)}),i.remove(h,v),r.clear(),s.fill(null)}}}const Pg={minX:-100,maxX:100,minZ:-216,maxZ:92},Dg={x:0,y:-.12,z:20},Lg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},Vn={bounds:Pg,spawn:Dg,venues:Lg};function Ig(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=Vn.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,d=!1,m=null,u=128;const p=(x,h=x,v=.3)=>d?Rg(x,h,m,u,Math.max(.4,v)):[],_=x=>x.top<=Hn.vault_height&&Hn.vault_tags.includes(x.tag);function b(x,h,v=-.12,P=o){return x>=t+P&&x<=e-P&&h>=n+P&&h<=s-P&&!i.concat(p({x,z:h},{x,z:h},P)).some(C=>!(_(C)&&v>=C.top+.075)&&x>C.left-P&&x<C.right+P&&h>C.back-P&&h<C.front+P)}function f(x,h,v=o){if(!b(h.x,h.z,h.y??-.12,v))return!1;for(const P of i.concat(p(x,h,v))){let C=0,w=1;for(const[L,B,I]of[["x",P.left-v,P.right+v],["z",P.back-v,P.front+v]]){const H=h[L]-x[L];if(Math.abs(H)<1e-8){if(x[L]<=B||x[L]>=I){C=2;break}}else{const U=(B-x[L])/H,W=(I-x[L])/H;C=Math.max(C,Math.min(U,W)),w=Math.min(w,Math.max(U,W))}}if(C<=w&&w>0&&C<1){const L=x.y??-.12,B=h.y??-.12;if(_(P)&&Math.min(L+(B-L)*Math.max(0,C),L+(B-L)*Math.min(1,w))>=P.top+.075)continue;return!1}}return!0}function g(){if(!l){l=new Uint8Array(a*c).fill(1);for(let x=0;x<c;x++)for(let h=0;h<a;h++)(h===0||x===0||h===a-1||x===c-1)&&(l[x*a+h]=0);for(const x of i.concat(p({x:t,z:n},{x:e,z:s}))){const h=Math.max(0,Math.ceil((x.left-.4-t)/r)),v=Math.min(a-1,Math.floor((x.right+.4-t)/r)),P=Math.max(0,Math.ceil((x.back-.4-n)/r)),C=Math.min(c-1,Math.floor((x.front+.4-n)/r));for(let w=P;w<=C;w++)for(let L=h;L<=v;L++)l[w*a+L]=0}}}function S(x,h,v){const P=h.x-x.x,C=h.z-x.z,w=P*P+C*C;return v.every(L=>{const B=w?Math.max(0,Math.min(1,((L.x-x.x)*P+(L.z-x.z)*C)/w)):0;return Math.hypot(x.x+P*B-L.x,x.z+C*B-L.z)>=.62})}function T(x,h=null,v=[]){g();const P=Math.round((x.x-t)/r),C=Math.round((x.z-n)/r);let w=-1,L=1/0;for(let B=-6;B<=6;B++)for(let I=-6;I<=6;I++){const H=P+I,U=C+B,W=U*a+H;if(H<0||U<0||H>=a||U>=c||!(h||l)[W])continue;const at=(t+H*r-x.x)**2+(n+U*r-x.z)**2;b(x.x,x.z)&&!f(x,{x:t+H*r,z:n+U*r})||S(x,{x:t+H*r,z:n+U*r},v)&&at<L&&(w=W,L=at)}return w}function E(x){return{x:t+x%a*r,z:n+Math.floor(x/a)*r}}function M(x,h,v=[]){if(f(x,h)&&S(x,h,v))return[{x:h.x,z:h.z}];g();const P=v.length?l.slice():l;for(const j of v){const ht=Math.round((j.x-t)/r),St=Math.round((j.z-n)/r);for(let At=-2;At<=2;At++)for(let et=-2;et<=2;et++){const xt=ht+et,wt=St+At;xt>=0&&wt>=0&&xt<a&&wt<c&&Math.hypot(t+xt*r-j.x,n+wt*r-j.z)<.76&&(P[wt*a+xt]=0)}}const C=T(x,P,v),w=T(h,P,v);if(C<0||w<0)return[];const L=[],B=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),H=new Uint8Array(a*c),U=j=>Math.abs(j%a-w%a)+Math.abs(Math.floor(j/a)-Math.floor(w/a));function W(j,ht){L.push({index:j,score:ht});let St=L.length-1;for(;St>0;){const At=St-1>>1;if(L[At].score<=ht)break;[L[St],L[At]]=[L[At],L[St]],St=At}}function at(){const j=L[0],ht=L.pop();if(L.length){L[0]=ht;let St=0;for(;;){let At=St,et=St*2+1,xt=et+1;if(et<L.length&&L[et].score<L[At].score&&(At=et),xt<L.length&&L[xt].score<L[At].score&&(At=xt),At===St)break;[L[St],L[At]]=[L[At],L[St]],St=At}}return j.index}B[C]=0,W(C,U(C));let $=0;for(;L.length&&$++<a*c;){const j=at();if(H[j])continue;if(H[j]=1,j===w){const At=[];let et=j;for(;et!==C;)At.push(E(et)),et=I[et];return At.reverse(),b(h.x,h.z)&&f(At.at(-1)||E(C),h)&&S(At.at(-1)||E(C),h,v)&&At.push({x:h.x,z:h.z}),b(x.x,x.z)&&At.unshift(E(C)),At}const ht=j%a,St=Math.floor(j/a);for(const[At,et]of[[1,0],[-1,0],[0,1],[0,-1]]){const xt=ht+At,wt=St+et,Lt=wt*a+xt;if(xt<0||wt<0||xt>=a||wt>=c||!P[Lt]||H[Lt]||!f(E(j),E(Lt))||!S(E(j),E(Lt),v))continue;const ft=B[j]+1;ft<B[Lt]&&(B[Lt]=ft,I[Lt]=j,W(Lt,ft+U(Lt)))}}return[]}return{configureHomes(x,h=null,v=u){d===!!x&&h===m&&v===u||(d=!!x,m=h,u=v,l=null)},withHomeAccess(x,h){if(!d||x===void 0||x===m)return h();const v=m,P=l;m=x,l=null;try{return h()}finally{m=v,l=P}},groundHeight(x){const h=Math.round((x.x+36.75)/10.5),v=Math.round((-28-x.z)/12);let P=d&&h>=0&&h<8&&v>=0&&Ii(x,Zo(v*8+h))?.22:-.12;for(const C of i.concat(p(x)))_(C)&&(x.y??-.12)>=C.top+.07&&x.x>C.left-o&&x.x<C.right+o&&x.z>C.back-o&&x.z<C.front+o&&(P=Math.max(P,C.top+.08));return P},boxes:()=>i.map(x=>({...x})),slide(x,h,v=o){const P={...h,y:h.y??x.y};return f(x,P,v)?{x:h.x,z:h.z}:f(x,{...P,z:x.z},v)?{x:h.x,z:x.z}:f(x,{...P,x:x.x},v)?{x:x.x,z:h.z}:{x:x.x,z:x.z}},addBox(x,h,v,P,C="",w=2){i.push({left:v-x/2,right:v+x/2,back:P-h/2,front:P+h/2,top:w,tag:C}),l=null},cameraLimit(x,h,v=[]){let P=1;for(const C of i.concat(v)){let w=0,L=1;for(const[B,I,H]of[["x",C.left-.15,C.right+.15],["z",C.back-.15,C.front+.15],["y",-.3,C.top+.15]]){const U=h[B]-x[B];if(Math.abs(U)<1e-8){if(x[B]<I||x[B]>H){w=2;break}}else{const W=(I-x[B])/U,at=(H-x[B])/U;w=Math.max(w,Math.min(W,at)),L=Math.min(L,Math.max(W,at))}}w<=L&&w>.01&&w<P&&(P=Math.max(.02,w-.015))}return P},free:b,segment:f,path:M,nearest(x){const h=T(x);return h<0?null:E(h)},move(x,h,v){const P=Math.hypot(h.x-x.x,h.z-x.z),C=P>0?Math.min(1,v/P):0,w={x:x.x+(h.x-x.x)*C,z:x.z+(h.z-x.z)*C};return f(x,w)?w:{x:x.x,z:x.z}}}}function Ng({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new vn;i.add(a);const c=Tt=>(t.add(Tt),Tt);function l(Tt,qt){const le=new gs(qt);return e.set("environment:"+Tt,le),le}const d=l("grass",{color:"#a5b99a",roughness:1}),m=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),u=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),p=l("forest",{color:"#4c7262",roughness:1}),_=new ye(c(new ci(850,850)),d);_.rotation.x=-Math.PI/2,_.position.y=-1.3,a.add(_);const b=[],f=[],g=[],S=new ge,T=new pn;function E(Tt,qt,le,Wt,_e,Me=1,te=1,Pe=1){const Oe=Tt.index?Tt.toNonIndexed():Tt;Oe!==Tt&&Tt.dispose(),Oe.applyMatrix4(S.compose(new O(le,Wt,_e),T,new O(Me,te,Pe))),qt.push(Oe)}for(let Tt=0;Tt<20;Tt++){const qt=Tt/20*Math.PI*2,le=Math.cos(qt)*(155+Tt%3*18),Wt=-70+Math.sin(qt)*230,_e=35+Tt%5*13,Me=25+Tt%4*9;E(new Kn(Me,_e,7),b,le,_e/2-1.3,Wt,1.2,1,1),E(new Kn(Me*.28,_e*.28,7),f,le,_e*.86-1.25,Wt,1.2,1,1)}for(let Tt=0;Tt<100;Tt++){const qt=Tt%2?-1:1,le=qt*(51+Tt%9*4),Wt=-210+Math.floor(Tt/2)*5.4,_e=3.5+Tt%4;E(new Kn(1.3+Tt%3*.25,_e,6),g,le,_e/2-.8,Wt),Wt>=-22&&Wt<=92&&o?.addBox(2.6,2.6,le,Wt,"forest-tree",_e)}function M(Tt,qt){const le=c(Yn(Tt,!1));Tt.forEach(_e=>_e.dispose());const Wt=new ye(le,qt);return a.add(Wt),Wt}const x=M(b,m),h=M(f,u),v=M(g,p),P=[];for(let Tt=0;Tt<14;Tt++)for(let qt=0;qt<4;qt++)E(new vi(1,9,6),P,-100+Tt%7*32+(qt-1.5)*4,29+Tt%4*4+qt%2*1.5,-120+Math.floor(Tt/7)*165,7,3.2,4.8);const C=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),w=M(P,C),L=6e3,B=new Float32Array(L*3),I=new Float32Array(L*6),H=[];for(let Tt=0;Tt<L;Tt++)H.push({x:Tt*73.31%64-32,y:Tt*17.73%32,z:Tt*41.71%70-35});const U=c(new We);U.setAttribute("position",new hn(B,3)),U.setDrawRange(0,320);const W=new hl({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",W);const at=new wh(U,W);at.frustumCulled=!1,a.add(at);const $=c(new We);$.setAttribute("position",new hn(I,3));const j=new cl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",j);const ht=new Ah($,j);ht.frustumCulled=!1,a.add(ht);const St=c(new ci(260,24,48,4)),At=new Float32Array(St.attributes.position.count*3);for(let Tt=0;Tt<St.attributes.position.count;Tt++)new ie().setHSL(.38+Tt%49/49*.34,.75,.62).toArray(At,Tt*3);St.setAttribute("color",new hn(At,3));const et=new Xn({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:nn,blending:qs});e.set("environment:aurora",et);const xt=new ye(St,et);xt.position.set(0,55,-235),a.add(xt);const wt=St.attributes.position.array.slice();let Lt={},ft=0,Ot="",Ee="",Vt=!1,de=-60;const xe={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function oe(Tt){const qt=fu(Lt,Date.now()+ft).mode;if(qt===Ot&&Ee===`${Lt.landscape}:${Tt}`)return;Ot=qt,Ee=`${Lt.landscape}:${Tt}`;const le=xe[Lt.landscape]||xe.alps;d.color.set(le[0]),m.color.set(le[1]),p.color.set(le[2]);const Wt=qt==="aurora";i.background=new ie(Wt?"#102339":Tt?"#142730":qt==="rain"?"#a6babd":qt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new ko(i.background,qt==="mist"?.007:qt==="rain"?.0035:.0013),n.intensity=Wt?.6:qt==="rain"?1.35:Tt?1.65:2.7,s.intensity=Wt?1.6:Tt?2.05:2.6,r.intensity=Wt?1.8:1.1,C.color.set(qt==="rain"?"#859c9f":"#f5f2e9"),W.color.set("#ffffff"),W.size=.13}return{configure(Tt={},qt=!1){Lt=Tt.settings||{},Number.isFinite(Tt.server_ms)&&(ft=Tt.server_ms-Date.now()),Vt=qt,x.visible=h.visible=Lt.mountains!==!1,w.visible=Lt.clouds!==!1;const le=Lt.precipitation||"heavy",Wt=Vt?900:le==="light"?650:le==="storm"?5800:3600;U.setDrawRange(0,Wt),$.setDrawRange(0,Wt*2),Ee=""},update(Tt,{paused:qt=!1,dark:le=!1,center:Wt=null}={}){oe(le);const _e=Ot,Me=qt?0:Tt/1e3;if(w.position.x=qt?0:Math.sin(Me*.012)*9,at.visible=_e==="snow",ht.visible=_e==="rain",xt.visible=_e==="aurora",at.visible||ht.visible){const te=U.drawRange.count,Pe=Wt?.x||0,Oe=Wt?.z||0;for(let V=0;V<te;V++){const qe=H[V],ee=qe.x+Pe+Math.sin(Me*.4+V)*(_e==="snow"?.55:.1),Bt=(qe.y-Me*(_e==="snow"?1.4:20)%32+32)%32,yt=qe.z+Oe;if(_e==="snow")B[V*3]=ee,B[V*3+1]=Bt,B[V*3+2]=yt;else{const be=V*6;I[be]=ee,I[be+1]=Bt,I[be+2]=yt,I[be+3]=ee+.1,I[be+4]=Bt-.9,I[be+5]=yt}}(_e==="snow"?U:$).attributes.position.needsUpdate=!0}if(xt.visible){const te=St.attributes.position.array;for(let Pe=0;Pe<te.length;Pe+=3)te[Pe+1]=wt[Pe+1]+Math.sin(wt[Pe]*.035+Me*.3)*5,te[Pe+2]=Math.cos(wt[Pe]*.02+Me*.17)*9;St.attributes.position.needsUpdate=!0}},extent(Tt){Tt!==de&&(de=Tt,v.scale.z=Math.max(1,Math.abs(Tt)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function Ug({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let M=-40;M<=-20;M+=2)for(let x=43;x<=59;x+=2)t(1.98,.025,1.98,M,-.18,x,(M+x)/2%2?"#e8dfcb":"#d1c6ac",0);for(const M of[-41.3,-18.7])t(.15,.09,20,M,-.1,51,"gold",0),t(.35,1.4,19.8,M,.45,51,"deep"),a.addBox(.35,19.8,M,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const M of[-40,-20])for(const x of[42.5,50.5,59.5])e(.35,.25,M,-.03,x,"gold"),e(.2,4.7,M,2.3,x,"white"),e(.38,.22,M,4.7,x,"gold"),a.addBox(.75,.75,M,x,"grand-bar-column",4.9);for(const M of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,M,"gold");for(const x of[-36,-24]){const h=new ai(2,.075,6,24,Math.PI);s(h,"gold",x,3.4,M)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const M of[41.65,42.3])t(15,.14,.7,-30,1.5+(M-41.65)*2,M,"wood");for(let M=0;M<14;M++){const x=-36.5+M;e(.11,.55,x,1.87,41.8,M%2?"#87b6a5":"#b89c68"),e(.04,.14,x,2.22,41.8,"gold")}for(const M of[-37,-34,-31,-28,-25,-22])e(.37,.16,M,.57,47.4,"deep"),e(.065,.8,M,.08,47.4,"gold"),e(.28,.06,M,-.12,47.4,"gold"),a.addBox(.75,.75,M,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[M,x,h]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,M,4.8,x,"gold"),s(new ai(h,.035,6,28),"gold",M,4,x,Math.PI/2);for(let v=0;v<12;v++){const P=v*Math.PI/6,C=M+Math.cos(P)*h,w=x+Math.sin(P)*h;e(.014,.46,C,3.75,w,"gold"),n(.09,.19,.09,C,3.47,w,"white")}}for(const M of[-38,-22])t(2.1,.65,5.1,M,.15,54,"#856c8c",.18),t(.3,1,5.2,M+(M<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,M,54,"velvet-booth",1.3),e(.68,.12,M+(M<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,M+(M<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,M+(M<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const d=["#87668e","#508a87","#b99c68","#5c708c"];for(let M=0;M<8;M++)for(let x=0;x<6;x++)t(1.04,.025,1.02,-33.7+M*1.06,.035,53.4+x*1.06,d[(M+x)%4],.015);for(const M of[-34.5,-25.5])t(.04,.06,6.6,M,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const M of[-31.4,-28.6])e(.57,.08,M,1.24,51.1,"black"),e(.15,.1,M,1.3,51.1,"gold");for(let M=0;M<6;M++)t(.1,.09,.22,-30.65+M*.25,1.26,51.3,"white",.01);for(const M of[-34.5,-25.5]){t(1,2.3,.8,M,1,51,"black");for(const x of[.45,1.35]){const h=new Rn(.31,.31,.05,12);s(h,"metal",M,x,51.43,Math.PI/2)}a.addBox(1,.8,M,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const m=new gs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",m);const u=new Wo(.62,2);c.add(u);const p=new ye(u,m);p.position.set(-30,4.6,56),i.add(p);const _=new Xn({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:nn,blending:qs});l.set("rivage-beams",_);const b=new Kn(1.5,3.4,10,1,!0);c.add(b);const f=[];for(const M of[-33,-27])for(const x of[54,58]){const h=new ye(b,_);h.position.set(M,2,x),h.userData.rivageEffect="beam",i.add(h),f.push(h)}const g=[],S=new Xn({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",S);for(const[M,x,h,v,P,C,w]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const L=new Ve(x,h,v);c.add(L);const B=new ye(L,S);B.position.set(P,C,w),B.userData.officeVenue=M,i.add(B),g.push(B)}const T=d.map(M=>{const x=o(M);return x.emissive.set(M),x});let E=!0;return{targets:g,setEnabled(M){E=!!M},update(M,{paused:x,energySaver:h}){x||(p.rotation.y=M/18e3);const v=x||h||!E;for(const P of f)P.visible=!v;for(let P=0;P<T.length;P++)T[P].emissiveIntensity=v?.13:.2+Math.sin(M/4500+P)*.05}}}function Fg(i,t=Vn.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1;const c=(m,u,p)=>Math.max(u,Math.min(p,m));function l(m,u={},p=0,_=[]){const b=c(Number(m)||0,0,.05);let f=Number(u.x)||0,g=Number(u.z)||0;r&&Date.now()>=o&&d(null);const S=Math.hypot(f,g);S>1&&(f/=S,g/=S),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const T=!!(u.boost&&S&&s),E=T?9:4.5;e.stamina=c(e.stamina+(T?-23:14)*b,0,100);const M=(Math.cos(p)*f-Math.sin(p)*g)*E,x=(-Math.sin(p)*f-Math.cos(p)*g)*E;e.vx=M,e.vz=x;const h=i.groundHeight?.(e)??-.12;e.grounded&&e.y>h+.08&&(e.grounded=!1),!e.flight&&!a&&u.jump&&!n&&(e.grounded||e.jumps<Hn.maximum_jumps)&&(e.vy=Hn.jump_speed,e.grounded=!1,e.jumps++),n=!!u.jump;const v=e.y;e.flight?(e.vy=(+!!u.jump-+!!u.descend)*Hn.flight_speed,e.y=c(e.y+e.vy*b,h,Hn.flight_maximum_y),e.grounded=!1):a?(e.y=Math.max(h,e.y-Hn.landing_speed*b),e.vy=-4,e.y<=h&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0)):e.grounded?e.y=h:(e.vy-=Hn.gravity*b,e.y=Math.min(Hn.maximum_y,e.y+e.vy*b),e.y<=h&&(e.y=h,e.vy=0,e.grounded=!0,e.jumps=0));let P=i.slide({...e,y:Math.min(v,e.y)},{x:e.x+M*b,y:e.y,z:e.z+x*b},r?.radius||.3);_.some(w=>Math.hypot(P.x-w.x,P.z-w.z)<.62&&Math.hypot(P.x-w.x,P.z-w.z)<=Math.hypot(e.x-w.x,e.z-w.z)+1e-4)&&(P={x:e.x,z:e.z});const C=Math.hypot(P.x-e.x,P.z-e.z)>1e-4;return e.x=P.x,e.z=P.z,C&&(e.yaw=Math.atan2(M,x)),e.action=e.flight?"fly":a?"land":e.grounded?C?T?"run":"walk":"idle":"jump",{...e}}function d(m,u=1/0){!m&&e.flight&&(e.flight=!1,a=!e.grounded),r=m,o=u}return{step:l,setForm:d,toggleFlight(){return r?.fly?(e.flight=!e.flight,a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e}),reset(m){e={...e,...m,vx:0,vz:0,vy:0,jumps:0,grounded:(m.y??-.12)<=(i.groundHeight?.(m)??-.12)+.01},a=!e.flight&&e.y>Hn.maximum_y,n=!1},face(m){e.yaw=Math.atan2(m.x-e.x,m.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function Pr(i,t){const e=Vn.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function Nc(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(f,g,S,T,E,M=0){M&&f.rotateZ(M),f.translate(S,T,E);const x=f.index?f.toNonIndexed():f;x!==f&&f.dispose();const h=new ie(g),v=new Float32Array(x.attributes.position.count*3);for(let P=0;P<v.length;P+=3)v[P]=h.r,v[P+1]=h.g,v[P+2]=h.b;x.setAttribute("color",new hn(v,3)),r.push(x)}const a=(f,g,S,T,E,M,x,h=0)=>o(new Ve(f,g,S),T,E,M,x,h),c=(f,g,S,T,E,M,x=f)=>o(new Rn(x,f,g,10),S,T,E,M),{accent:l,hair:d,motif:m,accessory:u,hairStyle:p,shirt:_}=i;if(t==="head"){if(a(.49,.16,.45,d,0,.23,-.02),a(.45,p==="long"?.72:.29,.13,d,0,p==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(p))for(const f of[-1,1])a(.09,p==="long"?.6:.33,.32,d,f*.24,-.02,-.03);if(p==="spiky")for(let f=0;f<7;f++)o(new Kn(.11,.27+f%3*.06,5),d,(f-3)*.066,.39+Math.sin(f)*.025,-.06,(f-3)*-.16);if(p==="split"&&a(.245,.18,.46,l,.123,.24,-.015),p==="side"&&a(.26,.25,.05,d,-.12,.08,.218,-.18),p==="ponytail"&&a(.27,.5,.25,d,0,-.15,-.37),u.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),u==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),u==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,_,0,.395,0)),u==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const f of[-1,1])a(.06,.33,.06,"#94745a",f*.3,.64,0,f*-.3),a(.15,.055,.06,"#94745a",f*.36,.72,0)}if(u==="bamboo"){const f=new Rn(.052,.052,.35,10);f.rotateZ(Math.PI/2),o(f,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(u==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),u==="goggles"||u==="glasses")for(const f of[-1,1])a(.19,.12,.06,l,f*.12,u==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",f*.12,u==="goggles"?.23:.04,.271);if(u==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const f of[-1,1])a(.12,.2,.08,"#aba2a6",f*.2,.31,0,f*-.35),a(.06,.055,.025,"#84aabb",f*.14,.07,.208)}if(u==="butterfly")for(const f of[-1,1])a(.18,.17,.045,l,f*.15,.31,-.12,f*.4);if(u==="earrings")for(const f of[-1,1])a(.045,.15,.035,"#e9d6bc",f*.26,-.19,.02);if(i.id==="naruto")for(const f of[-1,1])for(let g=0;g<3;g++)a(.08,.012,.01,"#9f7055",f*.15,-.055-g*.033,.208,f*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(m)){a(.028,.53,.035,l,0,1.23,.19);for(const f of[-1,1])a(.14,.37,.04,l,f*.14,1.26,.19,f*.08);if(m==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),m==="buttons")for(let f=0;f<3;f++)a(.03,.03,.035,"#eee2ba",0,1.13+f*.12,.23)}if(m==="checks"||m==="triangles"||m==="clouds")for(let f=0;f<4;f++)for(let g=0;g<4;g++){const S=(g-1.5)*.112,T=1+f*.13;m==="checks"&&(f+g)%2===0&&a(.11,.127,.025,l,S,T,.19),m==="triangles"&&(f+g)%2===0&&o(new Kn(.035,.065,3),l,S,T,.205),m==="clouds"&&f%2===0&&g%2===0&&(a(.13,.045,.03,l,S,T,.2),c(.04,.03,l,S,T+.035,.2))}if(m==="circle"&&o(new ai(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(m))if(m==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let f=0;f<3;f++)a(.32,.015,.02,"#b6a273",0,1.19+f*.07,.26)}else if(m==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(m==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(m==="butterfly"){for(const f of[-1,1])a(.12,.51,.07,l,f*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const f of[-1,1])a(.065,.52,.04,l,f*.1,1.23,.2,f*(m==="cross"?.52:.22));if(["sword","swords","backsword"].includes(u))for(let f=0;f<(u==="swords"?3:1);f++){const g=.3+f*.06;a(.055,.83,.055,"#373d4a",g,.92,-.18,-.25),a(.09,.23,.07,l,g+.1,1.4,-.18,-.25)}if(u==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(u))for(const f of[-1,1])a(u==="gauntlets"?.27:.2,.2,.24,l,f*.37,.99,.05)}const b=Yn(r,!1);return r.forEach(f=>f.dispose()),n.add(b),e.set(s,b),b}function as(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function Og(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(Bi.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const d=t.clone().add(new O(o.x*.4,l,o.z*.4));if(d.sub(t).clampLength(s,r).add(t),i.cameraLimit(t,d,n)>=.99)return d}return t.clone().add(new O(0,Bi.clamp(6,s,r),0))}function Bg({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new gs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,d,m,u,p]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"]]){let f=function(T,E,M,x,h,v,P){let C=new Ve(T,E,M).toNonIndexed();C.translate(x,h,v);const w=new ie(P),L=new Float32Array(C.attributes.position.count*3);for(let B=0;B<L.length;B+=3)w.toArray(L,B);C.setAttribute("color",new hn(L,3)),b.push(C)};const _=new vn;_.position.set(l,-.12,d),_.userData.hospitality=u,i.add(_);const b=[];if(f(.49,.66,.32,0,1.15,0,p),f(.41,.45,.4,0,1.7,0,"#e4b492"),f(.46,.16,.45,0,1.96,-.02,m?"#51352e":"#29272d"),f(.46,m?.65:.27,.13,0,m?1.66:1.82,-.21,m?"#51352e":"#29272d"),m){for(const T of[-1,1])f(.07,.43,.29,T*.23,1.74,-.03,"#51352e"),f(.05,.025,.02,T*.13,1.65,.209,"#cf8790");f(.58,.3,.38,0,.81,0,p)}for(const T of[-1,1])f(.035,.04,.025,T*.1,1.73,.207,"#253b36"),f(.18,.65,.2,T*.14,.45,0,"#263e39"),f(.22,.13,.33,T*.14,.08,.06,"#1c2b28"),f(.16,.4,.2,T*.33,1.2,0,p),f(.15,.26,.16,T*.33,.9,.04,"#e4b492");f(.09,.025,.025,0,1.58,.21,"#b66c78"),(u==="hostess"||u==="bartender")&&(f(.3,.49,.035,0,1.02,.18,m?"#c6a971":"#253e38"),f(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),f(.1,.07,.04,0,1.44,.19,"#374941"),f(.45,.04,.3,.36,.89,.17,"#c5ab71"),f(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const g=Yn(b,!1);b.forEach(T=>T.dispose()),e.add(g);const S=new ye(g,r);S.userData.officeVenue=u==="dj"?"disco":"bar",_.add(S),a.push(S),o.push(_),t.addBox(.68,.68,l,d,"hospitality-npc",2.1),u==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,d)}return{targets:a,update(c,l){o.forEach((d,m)=>{d.rotation.y=m<2?Math.sin((l?0:c)/4500+m)*.1:0,d.children[0].position.y=l?0:Math.sin(c/1800+m)*.018})}}}const kn=(i,t,e)=>i+(t-i)*e;function zg(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),d=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let m=r?o?.16:.06:0,u=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const p=[d,-d],_=[-d*.85,d*.85],b=[0,0];t?.action==="jump"&&(m=-.12,p.fill(.5),_.fill(-.7),u=0),t?.action==="fly"&&(m=.16,p.fill(.3),_.fill(.15),b[0]=-.12,b[1]=.12,u=0),t?.action==="land"&&(m=-.06,p.fill(.35),_.fill(-.3),u=0),a&&(m=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,u=c?.4:-.5,p.fill(c?0:-1.25),_.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(b[0]=-.3,b[1]=.3),s||(u+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(_[1]=-.8+(s?0:Math.sin(e*3)*.45),_[0]=-.3,m=.07),t?.action==="cast"&&(_[0]=t.skillPose==="beam"?-1.25:-.9,_[1]=-1.4,p[0]=-.12,p[1]=.2,m=.12),t?.action==="drink"&&(_[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(_[0]=-1),t?.action==="dance"&&(_[0]=-.8,_[1]=-.7,p[0]=s?0:Math.sin(e*2.4)*.2,p[1]=-p[0]),i.body.rotation.x=kn(i.body.rotation.x,m,l),i.body.position.y=kn(i.body.position.y,u,l),i.body.rotation.z=kn(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((g,S)=>{g.rotation.x=kn(g.rotation.x,p[S],l),g.rotation.z=kn(g.rotation.z,b[S],l)}),i.arms.forEach((g,S)=>{g.rotation.x=kn(g.rotation.x,_[S],l),g.rotation.z=kn(g.rotation.z,o?S?-.12:.12:0,l)}),i.head.rotation.x=kn(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=kn(i.head.rotation.y,0,l);const f=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(g=>g.scale.y=kn(g.scale.y,f,l)),{lying:c,moving:r}}function Gg(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(d=>Math.hypot(d.x-c,d.z-l)>.65)})))return s}return null}function Uc(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(u=>Math.hypot(u.x-a.x,u.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,d=c*c+l*l;if(d&&n.some(u=>{const p=Math.max(0,Math.min(1,((u.x-t.x)*c+(u.z-t.z)*l)/d));return Math.hypot(t.x+c*p-u.x,t.z+l*p-u.z)<.62&&p>0}))continue;const m=s?Gg(i,a,n):t.yaw||0;if(m!==null)return{...a,yaw:m}}return null}function kg(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function d(M,x=!1){const h=M+x;return o.has(h)||o.set(h,new i.MeshStandardMaterial({color:M,emissive:M,emissiveIntensity:x?.55:.13,roughness:.55,metalness:.18,transparent:x,opacity:x?.78:1,depthWrite:!x})),o.get(h)}function m(M,x,h,v,P,C,w=!1){r.add(x);const L=new i.Mesh(x,d(h,w));return L.position.set(v,P,C),M.add(L),L}const u=(M,x,h,v,P,C,w,L,B=!1)=>m(M,new i.BoxGeometry(x,h,v),P,C,w,L,B),p=(M,x,h,v,P,C,w,L,B=!1)=>{const I=m(M,new i.SphereGeometry(1,10,7),L,x,h,v,B);return I.scale.set(P,C,w),I},_=(M,x,h,v,P,C,w)=>m(M,new i.ConeGeometry(x,h,5),v,P,C,w,!0),b=(M,x,h)=>{const v=new i.Group;return v.position.set(M,x,h),s.add(v),v},f=t.color,g=t.accent||"#eddbff",S=t.dark||"#36214f";if(t.model==="susanoo"){u(s,1.75,1.65,.85,f,0,3.7,0),u(s,1.1,.65,.75,f,0,2.65,0);for(let P=0;P<5;P++)for(const C of[-1,1]){const w=u(s,.74,.055,.07,g,C*.4,3.15+P*.25,.46,!0);w.rotation.z=C*.18}u(s,1.45,.24,.95,S,0,2.5,0);for(let P=0;P<5;P++){const C=P*Math.PI*2/5,w=u(s,.85,1,.16,f,Math.sin(C)*.68,2.05,Math.cos(C)*.53);w.rotation.y=C,w.rotation.z=Math.sin(C)*.12}for(const P of[-1,1]){const C=b(P*.47,1.7,0);u(C,.52,1.1,.58,f,0,-.4,0),u(C,.64,.4,.7,S,0,-.8,.04),u(C,.48,.65,.56,f,0,-1.2,0),u(C,.6,.3,.95,f,0,-1.57,.2),l.push({node:C,side:P,kind:"leg"});const w=b(P*1.08,4.25,0);u(w,.6,1.1,.65,f,0,-.45,0),u(w,.75,.35,.85,g,0,.04,0),u(w,.64,.85,.65,S,0,-1.25,0),u(w,.58,.35,.55,f,0,-1.85,.07),l.push({node:w,side:P,kind:"arm"});for(let H=0;H<3;H++)u(s,.95,.16,.85,f,P*(1.03+H*.05),4.38-H*.17,0);const L=b(P*.72,4.35,-.43);L.userData.wingSide=P,a.push(L);const B=u(L,2.2,.24,.23,g,P*1,1.02,-.1,!0);B.rotation.z=P*.48;for(let H=0;H<3;H++)for(let U=0;U<(n?5:8);U++){const W=u(L,.48,1.2+H*.3,.12,f,P*(.55+U*.37),.75-H*.56+U*.12,-.12-H*.04,!0);W.rotation.z=-P*.55}const I=_(L,.16,.55,g,P*2.2,1.7,-.1);I.rotation.z=-P*.8}const M=b(0,5.05,.02);u(M,.76,.85,.7,f,0,0,0),u(M,.53,.25,.45,S,0,-.25,.25);for(const P of[-1,1]){const C=u(M,.22,.07,.08,"#fff89e",P*.18,.04,.4,!0);C.rotation.z=-P*.25;const w=_(M,.17,.95,f,P*.42,.55,0);w.rotation.z=-P*.38}const x=_(M,.16,.63,g,0,-.02,.58);x.rotation.x=Math.PI/2;const h=u(M,.18,.22,.05,"#e7abff",0,.29,.39,!0);h.rotation.z=Math.PI/4;for(let P=-2;P<=2;P++){const C=_(M,.16,.8+Math.abs(P)*.1,f,P*.16,.85,-.08);C.rotation.z=-P*.15}const v=b(-1.15,2.28,.18);u(v,.14,.8,.14,S,0,0,0),u(v,.7,.1,.25,g,0,-.15,0),u(v,.24,2.4,.08,g,0,-1.4,0,!0),v.rotation.z=-.5,e==="itachi"&&(a.forEach(P=>P.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){p(s,0,2.1,-.12,1,1.35,.75,f),p(s,0,3.52,.35,.82,.78,.65,f),p(s,0,3.27,.98,.5,.27,.5,g),p(s,0,3.45,1.31,.19,.13,.13,S);for(const M of[-1,1]){const x=_(s,.39,1.3,f,M*.58,4.3,.14);x.rotation.z=-M*.22,u(s,.27,.1,.09,"#fff5c2",M*.38,3.66,.95,!0),u(s,.045,.14,.045,"#b93237",M*.38,3.66,1.01,!0);const h=u(s,.39,.1,.06,S,M*.48,3.56,.92);h.rotation.z=M*.4;const v=_(s,.08,.25,"#fff2c8",M*.23,3.11,1.18);v.rotation.z=Math.PI;for(let w=0;w<3;w++){const L=u(s,.65,.035,.04,S,M*.62,3.3-w*.12,1.02);L.rotation.z=M*(w-1)*.15}const P=b(M*.9,2.85,.1);p(P,0,-.4,.15,.33,.78,.35,f),p(P,0,-1.04,.33,.43,.22,.44,g),l.push({node:P,side:M,kind:"arm"});const C=b(M*.52,1.1,-.05);p(C,0,-.35,0,.4,.7,.4,f),p(C,0,-.85,.25,.5,.25,.6,g),l.push({node:C,side:M,kind:"leg"});for(let w=0;w<3;w++)_(P,.08,.28,S,(w-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let M=0;M<9;M++){const x=(M-4)*.42,h=b(Math.sin(x)*.25,1.6,-.6);h.rotation.y=x,h.userData.tailIndex=M;const v=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(B=>new i.Vector3(...B))),P=14,C=7,w=new i.TubeGeometry(v,P,.4,C,!1),L=w.attributes.position;for(let B=0;B<=P;B++){const I=v.getPointAt(B/P),H=1-.93*Math.pow(B/P,1.5);for(let U=0;U<=C;U++){const W=B*(C+1)+U,at=new i.Vector3().fromBufferAttribute(L,W).sub(I).multiplyScalar(H).add(I);L.setXYZ(W,at.x,at.y,at.z)}}w.computeVertexNormals(),m(h,w,f,0,0,0,!0),c.push(h)}}else{if(t.model==="saiyan")for(let M=0;M<9;M++){const x=M*Math.PI*2/9,h=_(s,.13,.7,f,Math.sin(x)*.2,2.03,Math.cos(x)*.17);h.rotation.z=-Math.sin(x)*.7,h.rotation.x=Math.cos(x)*.6}if(t.model==="gear5"){for(let M=0;M<7;M++)p(s,Math.sin(M)*.2,1.91+Math.cos(M)*.07,Math.cos(M)*.13,.19,.16,.19,"#fff9ef");for(const M of[-1,1])for(let x=0;x<6;x++)p(s,M*(.35+x*.08),1.2+Math.sin(x)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const M=_(s,.12,.6,g,.19,1.96,.09);M.rotation.z=-.25;for(let x=0;x<6;x++){const h=u(s,.04,.12,.03,S,Math.sin(x)*.23,1.02+x*.09,.2);h.rotation.z=x*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),p(s,0,1.05,0,.42,.5,.29,f);for(const M of[-1,1]){const x=u(s,.06,.65,.06,g,M*.38,1.9,0);x.rotation.z=-M*.5}}if(t.model==="slayer")for(let M=0;M<8;M++){const x=_(s,.12,.5,f,Math.sin(M)*.42,.3+M*.14,Math.cos(M)*.35);x.rotation.z=Math.sin(M)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let M=0;M<8;M++){const x=u(s,.04,.38,.04,t.model==="icefire"&&M%2?"#ff9366":f,Math.sin(M)*.4,.35+M*.17,Math.cos(M)*.28,!0);x.rotation.z=M%2?.5:-.5}}const T=m(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),f,0,.06,0,!0);T.rotation.x=-Math.PI/2;function E(M){for(const h of[...M.children])h.isGroup&&E(h);const x=new Map;for(const h of[...M.children])if(h.isMesh){h.updateMatrix();const v=h.geometry.index?h.geometry.toNonIndexed():h.geometry.clone();v.applyMatrix4(h.matrix),x.has(h.material)||x.set(h.material,[]),x.get(h.material).push(v),M.remove(h),h.geometry.dispose(),r.delete(h.geometry)}for(const[h,v]of x){const P=Yn(v,!1);v.forEach(C=>C.dispose()),r.add(P),M.add(new i.Mesh(P,h))}}return E(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(M,{flying:x=!1,moving:h=!1}={}){const v=n?0:M;a.forEach((P,C)=>{P.rotation.y=(C?1:-1)*(x?.18+Math.sin(v*3)*.2:1.25+Math.sin(v*1.3)*.04)}),c.forEach((P,C)=>{P.rotation.y=(C-4)*.42+Math.sin(v*1.8+C*.6)*.09,P.rotation.x=.12+Math.cos(v*1.2+C)*.09}),l.forEach(({node:P,side:C,kind:w})=>{P.rotation.x=x?w==="leg"?.3:-.25:h?Math.sin(v*7+(C<0?Math.PI:0))*(w==="leg"?.3:-.2):0})},dispose(){r.forEach(M=>M.dispose()),o.forEach(M=>M.dispose()),s.clear()}}}function Hg({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[m,u]of c)m.visible=u;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const d=o.position.clone().sub(a.anchor);as(n),e.position.copy(a.position).add(d),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(d),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(d,m){if(d===r){o=m;return}l(),!(d===null||!m)&&(as(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:m.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=d,o=m,t.interior(d),i.background=s,i.fog=null,n.minDistance=1.7,n.maxDistance=8,n.target.copy(m.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const d of i.children)c.has(d)||c.set(d,d.visible),d.visible=!!(d.isLight||d===o||d.userData.residenceLayer||d.userData.officeAbility===r||d.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function Wg({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},rendererFactory:c=m=>new su(m),controlsFactory:l=(m,u)=>new lg(m,u),getDate:d=()=>new Date}){const m=new Eh,u=new En(36,1,.1,1200),p=c({antialias:!0,alpha:!1,powerPreference:"low-power"});p.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),p.outputColorSpace=an,p.toneMapping=Do,p.toneMappingExposure=1.18,i.append(p.domElement);const _=l(u,p.domElement);_.enableDamping=!0,_.dampingFactor=.09,_.minDistance=8,_.maxDistance=650,_.minPolarAngle=.32,_.maxPolarAngle=1.28,_.target.set(0,0,0),_.enablePan=!0,_.panSpeed=.7,_.rotateSpeed=.55,_.enableKeys=!1;const b=new kh("#fbf3dc","#526c61",2.8);m.add(b);const f=new La("#fff1cf",3.2);f.position.set(-12,25,15),m.add(f);const g=new La("#cce5ef",1.1);g.position.set(15,10,-10),m.add(g);const S=new Map,T=new Map,E=new Set,M=new Set,x=new Map,h=Ig(),v=du({THREE:Pc,scene:m,navigation:h,reduced:()=>Bt||st,createModel:(y,D)=>kg(Pc,y,{...D,reduced:Bt||st})}),P={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function C(y){return S.has(y)||S.set(y,new gs({color:P[y]||y,roughness:y==="metal"?.4:.82,metalness:y==="gold"?.45:.02,...y==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:nn}:{}})),S.get(y)}const w=new Ve(1.1,.035,2.2);E.add(w);const L=new ll(w,C("#c9b384"),24);L.instanceMatrix.setUsage(el),L.count=0,L.frustumCulled=!1,m.add(L),L.userData.officeRestMats=!0;const B=new ge,I=new pn;function H(y,D,F,G,X,ut=0,Z=0,Rt=0){let ne=y;y.index&&(ne=y.toNonIndexed(),y.dispose()),I.setFromEuler(new On(ut,Z,Rt)),ne.applyMatrix4(new ge().compose(new O(F,G,X),I,new O(1,1,1))),T.has(D)||T.set(D,[]),T.get(D).push(ne)}function U(y,D,F,G,X,ut,Z,Rt=.035,ne=0){H(Rt>0?new Ro(y,D,F,1,Math.min(Rt,y/3,D/3,F/3)):new Ve(y,D,F),Z,G,X,ut,0,ne)}function W(y,D,F,G,X,ut,Z=y){H(new Rn(Z,y,D,12),ut,F,G,X)}function at(y,D,F,G,X,ut,Z){const Rt=new vi(1,10,7);Rt.scale(y,D,F),H(Rt,Z,G,X,ut)}function $(y,D,F=1){h.addBox(.85*F,.85*F,y,D,"plant",2*F),W(.4*F,.7*F,y,.35*F,D,"pot",.31*F),W(.045*F,1.4*F,y,1.2*F,D,"oak");for(let G=0;G<5;G++){const X=G*2.4;at(.48*F,.52*F,.25*F,y+Math.cos(X)*.3*F,(1.4+G*.15)*F,D+Math.sin(X)*.25*F,G%2?"leaf":"lightLeaf")}}function j(y,D,F,G,X,ut,Z="#f2e8d5",Rt=0){const ne=document.createElement("canvas");ne.width=768,ne.height=192;const ve=ne.getContext("2d");ve.clearRect(0,0,768,192),ve.fillStyle=Z,ve.textAlign="center",ve.font="500 66px Georgia",ve.fillText(y,384,88),ve.font="20px Arial",ve.fillText(D,384,139);const Pt=new Da(ne);Pt.colorSpace=an,M.add(Pt);const nt=new Xn({map:Pt,transparent:!0,depthWrite:!1,side:nn}),J=new ci(F,F/4);E.add(J);const se=new ye(J,nt);se.position.set(G,X,ut),se.rotation.y=Rt,m.add(se),S.set(`sign-${y}`,nt)}U(86,.6,96,0,-.94,28,"base",.3),U(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),U(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const y of[-1,1]){U(54,.04,4,y*70,-.17,20,"#e6dfcc",0),U(4,.04,55,y*87,-.17,45,"#e6dfcc",0);for(let D=-20;D<92;D+=8)W(.08,1.1,y*99,.35,D,"wood"),U(.08,.08,8,y*99,.7,D+4,"wood",0);for(const D of[34,58,80])U(3,.4,.9,y*92,.05,D,"wood",.06),h.addBox(3,.9,y*92,D,"trail-bench",.7),$(y*80,D,1);j("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,y*58,1.7,18)}h.addBox(160,40,0,97,"water-boundary",.1),h.configureHomes(!0);for(const y of[-99,99])h.addBox(.2,114,y,35,"scenic-fence",1.2);h.addBox(202,.2,0,91,"scenic-boundary",1.2),U(85,.07,18,0,-.43,67,"#e4cfa5",.1),U(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let y=0;y<8;y++)U(120-y*8,.02,.13,0,-.57,79+y*2.8,"#c4ddd4",0);U(7,.07,24,0,-.4,60,"#e6dfcc",.1);const ht=Ug({scene:m,box:U,cylinder:W,orb:at,bake:H,sign:j,material:C,navigation:h,ownedGeometries:E,materials:S}),St=Bg({scene:m,navigation:h,ownedGeometries:E,materials:S,sign:j});for(let y=0;y<8;y++){const D=-36+y*3.7;U(1.5,.25,2.8,D,-.1,67,"white",.1),U(1.4,.17,1,D,.26,66,"sofa",.08),h.addBox(1.5,2.8,D,67,"beach-chair",.6),y%2===0&&(W(.05,3,D+1.2,1,65,"gold"),H(new Kn(1.8,.6,10),"white",D+1.2,2.7,65),h.addBox(.2,.2,D+1.2,65,"parasol",2.8))}U(19,.15,10,22,-.3,65,"wood",.1),j("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const y of[16,22,28])W(1.2,.13,y,.8,63,"white"),W(.1,1,y,.2,63,"gold"),h.addBox(2.4,2.4,y,63,"terrace-table",.9);for(const y of[-10,-6,-2]){$(y,58,.9);for(let D=0;D<4;D++)at(.15,.2,.15,y+(D-1.5)*.3,.9,58,"#c18b9c")}U(83,.08,4,0,-.44,20,"#e6dfcc",.12),U(6,.08,64,0,-.44,16,"#e6dfcc",.1),U(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const y of[-41,41])for(const D of[-15,-2,14,31,46])$(y,D,1.7),W(.08,3.2,y+(y<0?1:-1),1.15,D+2,"gold"),at(.22,.25,.22,y+(y<0?1:-1),2.85,D+2,"white");const At=[];function et(y,D,F,G){h.addBox(F,.12,y,D,"net",G);for(const X of[-F/2,F/2])W(.055,G,y+X,G/2,D,"white");for(let X=.3;X<=G;X+=.22)U(F,.018,.025,y,X,D,"white",0);for(let X=-F/2;X<=F/2;X+=.4)U(.012,G-.3,.018,y+X,(G+.3)/2,D,"white",0)}function xt(y,D,F=.16){const G=new vi(F,10,8);E.add(G);const X=new ye(G,C(D));X.userData.officeBall=y.id,m.add(X),At.push({mesh:X,game:y})}for(const y of Ri){const{x:D,z:F,id:G}=y;if(h.addBox(6,.14,D,F-(y.kind==="court"?6:4.2),"sign",1.2),U(y.kind==="court"?17:10,.12,y.kind==="court"?13:9,D,-.29,F,G==="tennis"?"#a77355":G==="badminton"?"#3b7e77":G==="basketball"?"#b99569":"#dce0ca",.14),U(6,1.1,.12,D,.65,F-(y.kind==="court"?6:4.2),"deep"),j(y.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,D,.75,F-(y.kind==="court"?5.91:4.11)),G==="tennis"||G==="badminton"||G==="basketball"){for(const X of[-7,7])U(.045,.015,10.8,D+X,-.21,F,"white",0);for(const X of[-5.4,0,5.4])U(14,.015,.045,D,-.21,F+X,"white",0);if(G!=="basketball"){for(const X of[-5.7,5.7])U(.035,.015,10.8,D+X,-.2,F,"white",0);et(D,F,14,G==="badminton"?1.7:1.15),xt(y,G==="tennis"?"#d9e56b":"white",G==="tennis"?.17:.12)}else{for(const X of[-1,1]){W(.09,3.6,D,1.5,F+X*5,"metal"),U(2.3,1.35,.13,D,3.1,F+X*4.7,"white");const ut=new ai(.43,.045,6,20);H(ut,"#c67543",D,2.8,F+X*4.1,Math.PI/2)}xt(y,"#bd6c32",.25)}}else if(G==="golf"){for(const X of[-6.5,6.5])h.addBox(.2,8,D+X,F,"golf-edge",.5);U(13,.12,8,D,-.15,F,"#69885c",.15);for(const X of[-6.5,6.5])U(.2,.35,8,D+X,-.05,F,"woodLight");for(let X=0;X<3;X++)W(.22,.02,D-4+X*4,-.07,F+(X%2?2:-2),"black"),W(.025,1.5,D-4+X*4,.65,F+(X%2?2:-2),"gold"),U(.8,.4,.03,D-3.6+X*4,1.25,F+(X%2?2:-2),"#c78362");xt(y,"white",.12)}else if(G==="bowling"){for(const X of[-2.7,2.7])h.addBox(.35,11,D+X,F,"bowling-edge",.4);U(5,.09,11,D,-.13,F,"woodLight");for(const X of[-2.7,2.7])U(.35,.12,11,D+X,-.1,F,"oak");for(let X=0;X<4;X++)for(let ut=0;ut<=X;ut++){const Z=D+(ut-X/2)*.55,Rt=F-2-X*.5;W(.14,.5,Z,.17,Rt,"white",.08),at(.13,.14,.13,Z,.49,Rt,"white")}xt(y,"#786397",.28)}else if(G==="arcade")for(const X of[-2.2,2.2]){h.addBox(2.1,1.6,D+X,F,"arcade",2.5),h.addBox(1.2,1.2,D+X,F+2,"seat",.7),U(2.1,2.6,1.6,D+X,1.1,F,"deep",.1),U(1.6,1.1,.05,D+X,1.7,F+.83,"screen");for(let ut=0;ut<5;ut++)U(.05,.6,.02,D+X+(ut-2)*.2,1.7,F+.87,ut%2?"#e8c877":"screenLine",0);W(.18,.06,D+X,.9,F+1.1,"gold"),U(1.2,.45,1.2,D+X,.2,F+2,"sofa",.1)}else if(G==="archery"){h.addBox(5,.3,D,F-2,"archery-backstop",3.2),U(5,3.2,.25,D,1.2,F-2,"wood");for(let X=0;X<5;X++){const ut=new Rn(1.1-X*.21,1.1-X*.21,.03,24);H(ut,["white","#283e49","#73a7bf","#c36f60","gold"][X],D,1.6,F-1.82+X*.035,Math.PI/2)}U(5,.02,.12,D,-.18,F+2.8,"white",0)}else if(G==="darts"){h.addBox(5,.22,D,F-1.8,"dart-board",2.8),U(5,3,.22,D,1.25,F-1.8,"deep");for(let X=0;X<4;X++){const ut=new Rn(1.05-X*.23,1.05-X*.23,.025,24);H(ut,X%2?"white":"#bf6f59",D,1.6,F-1.64+X*.025,Math.PI/2)}}else{h.addBox(5.5,3.5,D,F,"game-table",1.3),U(5.5,.25,3.5,D,1,F,G==="pingpong"?"#4c7783":G==="billiards"?"#376a59":"woodLight",.1);for(const X of[-2.2,2.2])for(const ut of[-1.2,1.2])U(.18,1.1,.18,D+X,.4,F+ut,"oak");if(G==="pingpong"&&(et(D,F,5.5,1.45),xt(y,"white",.1)),G==="uno")for(let X=0;X<16;X++){const ut=X%4;U(.32,.035,.48,D+(ut<2?-1.7+X%4*.3:1.4),1.16+X*.002,F+(ut%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][X%4],.02,X*.3)}if(G==="chess")for(let X=0;X<8;X++)for(let ut=0;ut<8;ut++)U(.34,.02,.34,D+(X-3.5)*.34,1.14,F+(ut-3.5)*.34,(X+ut)%2?"deep":"white",0),(ut<2||ut>5)&&W(.075,.17,D+(X-3.5)*.34,1.24,F+(ut-3.5)*.34,ut<2?"white":"black");if(G==="billiards")for(let X=0;X<10;X++)at(.12,.12,.12,D+Math.sin(X*2)*1.8,1.25,F+Math.cos(X)*.9,["gold","white","deep"][X%3]);if(G==="foosball")for(let X=0;X<5;X++){U(.045,.045,4.5,D-2+X,1.4,F,"metal",0);for(const ut of[-1,0,1])U(.2,.45,.18,D-2+X,1.48,F+ut,X%2?"#ba7864":"deep")}for(const X of[-1,1])U(4,.35,.8,D,.28,F+X*3.8,"sofa",.1),h.addBox(4,.8,D,F+X*3.8,"bench",.5)}}U(40.5,.6,28,0,-.6,0,"base",.22),U(39.8,.22,27.3,0,-.2,0,"edge",.1),U(39.4,.18,26.9,0,-.04,0,"floor",.08),U(37.8,.04,13.5,0,.07,-5.8,"stone",.05),U(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),U(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let y=-18;y<19;y+=1.9)U(.015,.015,12.4,y,.14,-5.8,"#c3cfbf",0);U(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),U(39.4,.22,.5,0,4.8,-13.25,"gold"),U(8,4.8,.18,0,2.35,-13.02,"deep");for(let y=0;y<21;y++)U(.06,4.6,.1,-3.8+y*.38,2.35,-12.87,"wood",.01);U(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),j("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const y of[-15,-10,10,15]){U(4.1,2.9,.15,y,2.6,-13,"glass"),U(4.2,.08,.23,y,4.08,-12.85,"gold"),U(4.2,.12,.3,y,1.12,-12.85,"woodLight");for(const D of[-2,0,2])U(.055,2.9,.2,y+D,2.6,-12.86,"gold",0)}U(.13,2.8,10.8,0,1.55,-6.4,"glass"),U(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const y of[-11.8,-6.4,-1])U(.08,2.9,.08,0,1.5,y,"gold",0);U(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),U(.22,.08,25.7,-19.5,2.8,-.1,"gold"),U(.2,2.7,25.7,19.5,1.4,-.1,"glass"),U(.22,.08,25.7,19.5,2.8,-.1,"gold"),j("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),j("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function wt(y,D,F){h.addBox(2.6,1.28,y,D,"desk",2.3),U(2.6,.15,1.28,y,1.31,D,"woodLight",.08);for(const G of[-1.03,1.03])U(.09,1.17,1.02,y+G,.66,D,"white"),U(.45,.08,.94,y+G,.15,D,"metal");U(1,.66,.08,y,1.91,D-.22,"metal"),U(.9,.54,.02,y,1.92,D-.166,"screen");for(let G=0;G<3;G++)U(.28+G*.12,.024,.025,y-.14+G*.04,2.03-G*.1,D-.149,"screenLine",0);W(.07,.25,y,1.48,D-.2,"metal"),U(.45,.035,.25,y,1.405,D-.19,"metal"),U(.71,.035,.24,y,1.42,D+.32,"white"),W(.09,.18,y+.9,1.49,D+.12,"deep"),U(.64,.17,.64,y,.66,D+1.02,F==="umum"?"sofa":"teal",.1),U(.65,.7,.12,y,1.08,D+1.33,F==="umum"?"sofa":"teal",.09),W(.055,.5,y,.35,D+1.05,"metal"),U(.8,.06,.14,y,.15,D+1.05,"metal"),U(.14,.06,.8,y,.15,D+1.05,"metal")}const Lt={umum:[],operasional:[]};for(const y of["umum","operasional"])for(let D=0;D<4;D++)for(let F=0;F<4;F++){const G=(y==="umum"?-15:3.4)+F*3.75,X=-10.3+D*3.15;Lt[y].push([G,.18,X+1.03]),wt(G,X,y)}for(const y of[-18.5,18.5]){U(.7,2.4,4.7,y,1.25,-8.4,"wood");for(let D=0;D<3;D++){U(.86,.06,4.8,y,.65+D*.69,-8.4,"gold");for(let F=0;F<8;F++)U(.5,.38+F%2*.12,.18,y,.88+D*.69,-10.3+F*.5,F%2?"white":"deep")}}U(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const y of[4.7,8,11.3]){U(15.8,.45,1.05,-8.7,.57,y,"sofa",.16),U(15.8,.9,.25,-8.7,.91,y-.62,"sofa",.12);for(let D=0;D<8;D++)U(1.72,.17,.95,-15.8+D*2.02,.86,y,D%3===0?"pillow":"sofa",.1);for(const D of[-16.7,-.7])U(.25,.68,1.35,D,.8,y,"sofa",.1)}for(const y of[-11.5,-5]){U(2.7,.13,1.2,y,.64,6.6,"woodLight",.12);for(const D of[-.9,.9])W(.05,.48,y+D,.37,6.6,"gold");W(.16,.22,y+.4,.81,6.6,"white")}U(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const y of[-11.5,-6.5])W(.04,.5,y,.32,2.85,"gold");j("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),U(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),U(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),U(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let y=0;y<23;y++)U(.055,1.15,.07,7.9+y*.4,.78,2.26,"woodLight",.01);U(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),U(.8,.55,.05,15.3,1.9,1.94,"black"),W(.18,.24,14.1,1.64,1.5,"white"),W(.18,.24,13.6,1.64,1.5,"white"),j("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const y of[8,13.8])for(const D of[5.1,9.7]){W(1.45,.12,y,1.05,D,"woodLight"),W(.13,.92,y,.55,D,"gold"),W(.68,.08,y,.12,D,"gold");for(const F of[-1.6,1.6])W(.42,.14,y+F,.67,D,"deep"),W(.055,.55,y+F,.34,D,"gold");W(.18,.22,y+.4,1.22,D,"white"),W(.22,.04,y-.3,1.14,D+.2,"white")}for(const[y,D,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])$(y,D,F);h.addBox(39.4,.32,0,-13.25,"wall",4.8),h.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const y of[-19.5,19.5])h.addBox(.2,25.7,y,-.1,"glass-wall",2.8);for(const y of[4.7,8,11.3])h.addBox(16.1,1.5,-8.7,y,"sofa",1.4);h.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),h.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const y of[8,13.8])for(const D of[5.1,9.7])h.addBox(2.9,2.9,y,D,"cafe-table",1.3);for(const y of[-18.5,18.5])h.addBox(.9,4.8,y,-8.4,"shelf",2.6);for(const y of[-11.5,-5])h.addBox(2.7,1.2,y,6.6,"lounge-table",.8);for(const[y,D]of T){const F=Yn(D,!1);D.forEach(G=>G.dispose()),F&&(E.add(F),m.add(new ye(F,C(y))))}T.clear();const ft=Cg({scene:m,material:C,ownedGeometries:E}),Ot=Hg({scene:m,residences:ft,camera:u,controls:_,background:new ie("#182c2a")}),Ee=Ng({scene:m,materials:S,ownedGeometries:E,sun:f,hemi:b,fill:g,navigation:h}),Vt=document.createElement("canvas");Vt.width=Vt.height=128;const de=Vt.getContext("2d"),xe=de.createRadialGradient(64,64,7,64,64,64);xe.addColorStop(0,"#16382f35"),xe.addColorStop(1,"#16382f00"),de.fillStyle=xe,de.fillRect(0,0,128,128);const oe=new Da(Vt);M.add(oe);const Tt=new ci(66,49);E.add(Tt);const qt=new Xn({map:oe,transparent:!0,depthWrite:!1});S.set("shadow",qt);const le=new ye(Tt,qt);le.rotation.x=-Math.PI/2,le.position.y=-.98,m.add(le);const Wt=new Map,_e=new Map;function Me(y){if(_e.has(y))return _e.get(y);const D=[];if(y==="archery"){const G=new ai(.34,.025,5,16,Math.PI);G.rotateZ(-Math.PI/2),D.push(G.toNonIndexed()),G.dispose();const X=new Ve(.035,.035,.85);X.translate(0,0,.1),D.push(X.toNonIndexed()),X.dispose()}else{const G=new Rn(.017,.03,y==="billiards"?1.65:1,6);G.rotateX(Math.PI/2),D.push(G.toNonIndexed()),G.dispose()}const F=Yn(D,!1);return D.forEach(G=>G.dispose()),E.add(F),_e.set(y,F),F}function te(y,D,F,G,X){const ut=D+F.join(":");if(!Wt.has(ut)){const Rt=D==="sphere"?new vi(F[0],10,8):new Ro(...F,1,.06);Wt.set(ut,Rt),E.add(Rt)}const Z=new ye(Wt.get(ut),C(G));return Z.position.set(...X),y.add(Z),Z}const Pe=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],Oe=new Map,V=new gs({vertexColors:!0,roughness:.8});S.set("costume-vertex",V);function qe(y){const D=new vn;m.add(D);const F=Al(y.avatar),G=_u(F.costume),X=(G?.style||F.style)==="feminine",ut=G?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||Pe[y.id%Pe.length],Z=new vn;D.add(Z);const Rt={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],ne=F.hair==="hijab"?ut:"#352c32";if(te(Z,"box",[X?.43:.5,.65,.33],ut,[0,1.17,0]).userData.avatarCloth=!0,!G&&F.outfit==="blazer"){te(Z,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const De of[-1,1]){const Fe=te(Z,"box",[.07,.32,.035],"gold",[De*.12,1.33,.19]);Fe.rotation.z=De*.25}}!G&&F.outfit==="sport"&&te(Z,"box",[.32,.055,.02],"white",[0,1.3,.18]);const ve=!G&&F.outfit==="dress"?te(Z,"box",[.6,.4,.44],ut,[0,.79,0]):null,Pt=new vn;if(Pt.position.y=1.69,Z.add(Pt),te(Pt,"box",[.43,.46,.4],Rt,[0,0,0]),G){const De=new ye(Nc(G,"head",Oe,E),V),Fe=new ye(Nc(G,"body",Oe,E),V);De.userData.costumePart="head",Fe.userData.costumePart="body",Pt.add(De),Z.add(Fe)}else{const De="hair:"+F.hair;if(!Wt.has(De)){const Fe=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const wi of[-1,1])Fe.push([.09,F.hair==="bob"?.4:.53,.32,wi*.235,-.01,-.03]);const Xi=Fe.map(([wi,ou,au,lu,cu,hu])=>{const Jo=new Ve(wi,ou,au);Jo.translate(lu,cu,hu);const uu=Jo.toNonIndexed();return Jo.dispose(),uu}),Yi=Yn(Xi,!1);Xi.forEach(wi=>wi.dispose()),Wt.set(De,Yi),E.add(Yi)}Pt.add(new ye(Wt.get(De),C(ne)))}if(!G&&F.hair==="ponytail"&&te(Pt,"box",[.24,.53,.22],ne,[0,-.02,-.35]),!G&&F.hair==="hijab"&&te(Z,"box",[.58,.18,.43],ne,[0,1.44,-.04]),!Wt.has("eyes")){const De=[-.095,.095].map(Xi=>{const Yi=new Ve(.035,.045,.025);Yi.translate(Xi,.035,.205);const wi=Yi.toNonIndexed();return Yi.dispose(),wi}),Fe=Yn(De,!1);De.forEach(Xi=>Xi.dispose()),Wt.set("eyes",Fe),E.add(Fe)}const nt=new ye(Wt.get("eyes"),C("#263833"));Pt.add(nt);const J=[nt];if(te(Pt,"box",[.09,.02,.025],X?"#b96f78":"#9c6d58",[0,-.105,.21]),X)for(const De of[-.14,.14])te(Pt,"box",[.065,.025,.02],"#d39589",[De,-.065,.21]);if(F.accessory==="glasses"){for(const De of[-1,1])te(Pt,"box",[.15,.11,.025],"gold",[De*.105,.04,.224]),te(Pt,"box",[.11,.07,.025],Rt,[De*.105,.04,.24]);te(Pt,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){te(Pt,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const De of[-1,1])te(Pt,"box",[.12,.2,.18],"deep",[De*.28,.07,0])}const se=[];for(const De of[-.34,.34]){const Fe=new vn;Fe.position.set(De,1.42,0),Z.add(Fe),te(Fe,"box",[.17,.4,.2],ut,[0,-.19,0]).userData.avatarCloth=!0,te(Fe,"box",[.15,.27,.16],Rt,[0,-.45,.05]),se.push(Fe)}const pe=[],Yt=[];for(const De of[-.14,.14]){const Fe=new vn;Fe.position.set(De,.83,0),Z.add(Fe),te(Fe,"box",[.18,.64,.2],G?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,Yt.push(te(Fe,"box",[.23,.14,.34],G?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),pe.push(Fe)}const re=te(se[1],"sphere",[.12],"white",[0,-.49,.14]),mn=te(se[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),Sn=new vn;se[1].add(Sn),Sn.position.set(0,-.48,.16),te(Sn,"box",[.04,.44,.05],"gold",[0,-.14,0]);const Je=new ai(.24,.025,6,16);E.add(Je),Sn.add(new ye(Je,C("white"))),Sn.rotation.x=Math.PI/2;const ce=new ye(Me("billiards"),C("gold"));ce.position.set(0,-.48,.35),se[1].add(ce),ce.visible=!1;const gn=new js(.5,.59,24);E.add(gn);const di=new Xn({color:"#c5a061",side:nn});S.set(`ring-${y.id}`,di);const rn=new ye(gn,di);rn.rotation.x=-Math.PI/2,rn.position.y=.02,D.add(rn),rn.visible=!1;const Zt=document.createElement("button");Zt.type="button",Zt.className="vo-avatar-label",Zt.setAttribute("aria-pressed","false");const un=document.createElement("i"),$n=document.createElement("span"),Wi=document.createElement("small");Zt.append(un,$n,Wi),t.append(Zt);const Ai=document.createElement("span");return Ai.className="vo-speech",Ai.hidden=!0,Zt.append(Ai),Zt.addEventListener("click",()=>e(y.id)),D.traverse(De=>{De.isMesh&&(De.userData.personId=y.id)}),{group:D,body:Z,head:Pt,arms:se,legs:pe,shoes:Yt,eyes:J,skirt:ve,cup:re,plate:mn,racket:Sn,tool:ce,bubble:Ai,label:Zt,dot:un,name:$n,icon:Wi,ring:rn,person:y,appearance:JSON.stringify(y.avatar),privateGeometry:Je,target:new O,phase:y.id*1.75}}let ee=null,Bt=!1,yt=!0,be=!1,zt=null,Kt=0,N=0,A=null,Y=[],mt=null,lt=null,dt=null,vt="orbit",it=null,st=!1,Mt={};const z=new Map,ot=new Map;let tt=null,rt=null,gt=null,ct=null,Ut={},jt=a,_t=null,Ht=()=>!1,kt=null,pt=null,Xt=null,Le=null,Qe=!1,Hi=null,ui=!1,Vi=null;const Ms=new js(1.2,1.4,32);E.add(Ms);const Ss=new Xn({color:"#e9be69",side:nn,transparent:!0,opacity:.85});S.set("pilot-guide",Ss);const sn=new ye(Ms,Ss);sn.rotation.x=-Math.PI/2,sn.visible=!1,sn.userData.pilotGuide=!0,m.add(sn);const Mn=new Map,ys=[],bs={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},Ce=new O,Be=new O;let Ne=!1;function je(y){rt&&gt&&!y.some(nt=>nt.id===rt)&&(y=[...y,{...gt,home_slot:Xt?.slot??gt.home_slot}]),h.configureHomes(!0,Qe?Xt?.slot:null,Math.max(Hi??0,y.length,...y.map(nt=>(nt.home_slot??-1)+1))),Y=y,ft.sync(y),Ee.extent(ft.bounds().back);const D=y.map(nt=>{if(!dt?.connected||!dt.room||![dt.room.from,dt.room.to].includes(nt.id)){const J=y.find(se=>se.is_me)?.id;return dt&&!dt.connected&&(nt.id===J||nt.meeting_with===J)?{...nt,meeting_with:null,meeting_spot:null}:nt}return{...nt,state:"online",meeting_with:dt.room.from===nt.id?dt.room.to:dt.room.from,meeting_spot:dt.room.spot}}),F=nt=>nt.id===ee||nt.id===it||nt.is_me||tt&&[tt.from,tt.to].includes(nt.id),G=[...D].sort((nt,J)=>+!!F(J)-+!!F(nt)||+!!J.meeting_with-+!!nt.meeting_with||{online:0,idle:1,offline:2}[nt.state]-{online:0,idle:1,offline:2}[J.state]||nt.id-J.id),X=[],ut={umum:0,operasional:0},Z=[],Rt=new Map;let ne=0,ve=0;for(const nt of G){if(X.length>=24)break;nt.state==="online"&&ut[nt.department]>=16||(X.push(nt),nt.state==="online"&&ut[nt.department]++)}const Pt=new Set(X.map(nt=>nt.id));for(const[nt,J]of x)(!Pt.has(nt)||J.appearance!==JSON.stringify(X.find(se=>se.id===nt)?.avatar))&&(v.forget(nt),m.remove(J.group),J.label.remove(),J.ring.geometry.dispose(),E.delete(J.ring.geometry),J.privateGeometry.dispose(),E.delete(J.privateGeometry),J.ring.material.dispose(),S.delete(`ring-${nt}`),x.delete(nt));ut.umum=ut.operasional=0;for(const nt of X){let J=x.get(nt.id),se=!J;J||(J=qe(nt),x.set(nt.id,J));const pe=J.game?.id,Yt=J.pose,re=J.home?.clone(),mn=nt.in_office===!1&&nt.state!=="offline",Sn=mn?null:Mn.get(nt.id)||nt.pilot,Je=nt.id===rt&&ct?ct.state():Sn;J.person=nt,J.pose=mu(nt,d());let ce;J.game=gu(nt,d());const gn=mn?null:z.get(nt.id)||nt.recreation,di=!mn&&tt&&tt.status!=="pending"&&[tt.from,tt.to].includes(nt.id);di?(J.game=Ri.find(Zt=>Zt.id===tt.kind)||J.game,J.pose="playing"):gn?.kind==="game"&&gn.until>Date.now()/1e3&&nt.state!=="offline"&&(J.game=Ri.find(Zt=>Zt.id===gn.destination)||J.game,J.pose="playing");const rn=gn&&(!gn.until||gn.until>Date.now()/1e3)&&bs[gn.destination];if(J.destination=!!rn,rn&&!di&&nt.state!=="offline"){J.pose=gn.kind==="drink"?"coffee":gn.kind==="food"?"eating":gn.kind==="dance"?"dancing":"resting",ce=[rn[0]+nt.id%5*1.6,rn[1],rn[2]+Math.floor(nt.id%10/5)*1.3];const Zt=h.nearest({x:ce[0],z:ce[2]});Zt&&(ce=[Zt.x,ce[1],Zt.z]),J.group.rotation.y=Math.PI}else if(!mn&&nt.meeting_with&&Number.isInteger(nt.meeting_spot)&&!di){J.pose="meeting";const Zt=nt.id<nt.meeting_with?-1:1;ce=[-36+nt.meeting_spot*6.5+Zt*.9,-.12,20],J.facing=Zt<0?Math.PI/2:-Math.PI/2}else if(J.pose==="working")ce=Lt[nt.department][ut[nt.department]++],J.group.rotation.y=Math.PI;else if(J.pose==="playing"){const Zt=Rt.get(J.game.id)||0;Rt.set(J.game.id,Zt+1);const un=Zt%2?1:-1;ce=[J.game.x+(J.game.kind==="court"?un*(3-Math.floor(Zt/2)%3*1.7):Math.floor(Zt/2)*.8),-.12,J.game.z+un*(J.game.kind==="court"?3.6:2.5)],J.group.rotation.y=un<0?0:Math.PI}else if(J.pose==="sleeping")ce=ft.bed(nt.id),J.group.rotation.y=0;else if(J.pose==="resting"){const Zt=ne++;ce=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],J.group.rotation.y=0}else if(ve<8){const Zt=ve++,un=Zt%4,$n=Zt<4?1:-1;ce=[(un%2?13.8:8)+$n*1.65,.08,un<2?5.1:9.7],J.group.rotation.y=$n*Math.PI/2}else{const Zt=ne++;ce=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],J.group.rotation.y=0}if(J.pose==="playing"&&J.game.id==="darts"&&(ce=[J.game.x+(nt.id%2?-1:1)*1.2,-.12,J.game.z+2.5]),["playing","meeting"].includes(J.pose)&&!h.free(ce[0],ce[2])){const Zt=h.nearest({x:ce[0],z:ce[2]});Zt&&(ce=[Zt.x,ce[1],Zt.z])}if((J.pose==="playing"||rn)&&Z.some(Zt=>Math.hypot(Zt[0]-ce[0],Zt[2]-ce[2])<.7))t:for(const Zt of[.8,1.5,2.2])for(let un=0;un<12;un++){const $n=ce[0]+Math.cos(un*Math.PI/6)*Zt,Wi=ce[2]+Math.sin(un*Math.PI/6)*Zt;if(h.free($n,Wi)&&!Z.some(Ai=>Math.hypot(Ai[0]-$n,Ai[2]-Wi)<.7)){ce=[$n,ce[1],Wi];break t}}if(Je&&nt.state!=="offline"?(ce=[Je.x,Je.y,Je.z],J.pose="manual",J.manual=!0,J.group.rotation.y=Je.yaw,J.waypoints=[]):J.manual=!1,Z.push(ce),J.target.set(...ce),J.home=J.target.clone(),(se||J.manual&&nt.id===rt||Yt!==J.pose&&J.pose!=="meeting"&&!rn&&!di)&&J.group.position.copy(J.target),!J.manual&&!se&&(J.pose==="playing"&&(pe!==J.game.id||Yt!=="playing")||(rn||J.pose==="meeting")&&(!re||re.distanceTo(J.home)>.1))){if(!h.free(J.group.position.x,J.group.position.z)){const Zt=h.nearest(J.group.position)||h.nearest({x:0,z:21.5});Zt&&J.group.position.set(Zt.x,ce[1],Zt.z)}J.waypoints=h.withHomeAccess(ft.slotFor(nt.id),()=>h.path(J.group.position,J.home)).map(Zt=>new O(Zt.x,ce[1],Zt.z))}else!["playing","meeting"].includes(J.pose)&&!rn&&(J.waypoints=[]);Bt&&J.pose==="meeting"&&(J.group.position.copy(J.home),J.group.rotation.y=J.facing,J.waypoints=[]),J.dot.className=`vo-dot ${nt.state}`,J.name.textContent=nt.name,J.icon.textContent=`${nt.state==="offline"?"OFFLINE ":nt.state==="idle"?"JEDA ":"ONLINE "}${J.pose==="meeting"?"💬":J.pose==="sleeping"?"☾ RUMAH":J.pose==="playing"?J.game.icon:J.pose==="coffee"?"☕":""}`,di&&tt.bot&&nt.id===tt.to&&(J.icon.textContent="OFFLINE · NPC "+J.game.icon),J.pose==="dancing"&&(J.icon.textContent=(nt.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),J.label.setAttribute("aria-label",`${nt.name}, ${nt.state==="online"?"online":nt.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),J.cup.visible=J.pose==="coffee",J.plate.visible=J.pose==="eating",J.manual&&(J.cup.visible=Je.action==="drink",J.plate.visible=Je.action==="eat",J.icon.textContent=(nt.private?"PRIVAT · ":"ONLINE · ")+(Je.action==="run"?"BOOST":Je.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),J.racket.visible=J.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(J.game.id),J.tool.visible=J.pose==="playing"&&["billiards","archery","darts"].includes(J.game.id),J.tool.visible&&(J.tool.geometry=Me(J.game.id)),J.shoes.forEach(Zt=>{Zt.visible=J.pose!=="sleeping"}),J.manual||J.eyes.forEach(Zt=>{Zt.scale.y=J.pose==="sleeping"?.18:1}),J.ring.visible=ee===nt.id,J.label.setAttribute("aria-pressed",String(ee===nt.id))}ft.select(mt??(x.get(ee)?.pose==="sleeping"?ee:null)),Te()}const Bn=new O;function nr(){const y=i.getBoundingClientRect(),D=[];for(const F of[...x.values()].sort((G,X)=>+(X.person.id===ee)-+(G.person.id===ee))){if(F.pose==="sleeping"){const ve=ft.location(F.person.id);Bn.set(ve.x,5.2,ve.z+1)}else F.group.getWorldPosition(Bn),Bn.y+=(v.form(F.person.id)?.height||1.8)+.55;Bn.project(u);const G=(Bn.x+1)/2*y.width,X=(1-Bn.y)/2*y.height;if(Ot.active()&&F.person.id!==rt){F.label.hidden=!0;continue}const ut=166,Z=27,Rt=D.some(ve=>Math.abs(ve.x-G)<ut&&Math.abs(ve.y-X)<Z),ne=Bn.z<1&&Bn.z>-1&&G>18&&G<y.width-18&&X>15&&X<y.height-65&&(!Rt||F.person.id===ee);F.label.hidden=!ne,ne&&(F.label.style.transform=`translate(${G}px,${X}px) translate(-50%,-100%)`,D.push({x:G,y:X}))}}function Es(y=0){if(zt=null,be||!yt)return;if(y-Kt<1e3/30&&!Bt){zt=requestAnimationFrame(Es);return}const D=Math.min(.06,Math.max(.001,(y-Kt)/1e3));Kt=y,Ne&&(u.position.lerp(Be,.12),_.target.lerp(Ce,.12),u.position.distanceTo(Be)<.04&&(u.position.copy(Be),_.target.copy(Ce),Ne=!1));let F=0;for(const Z of x.values()){const Rt=Bt?0:y/1e3+Z.phase;if(Z.person.id===rt&&ct){const Pt=Math.atan2(u.position.x-_.target.x,u.position.z-_.target.z),nt=[...x.values()].filter(re=>re!==Z&&re.pose!=="sleeping").map(re=>re.group.position),J=Ht();let se=J?{}:Ut;if((se.x||se.z||se.jump)&&(pt=null,kt=null),pt&&(pt.elapsed=(pt.elapsed||0)+D),pt?.elapsed>4&&(pt=null,jt({...ct.state(),restBlocked:!0})),pt&&!J){const re=ct.state();if(re.grounded)if(pt.point||(pt.point=Uc(h,re,pt.pose,nt)),!pt.point)pt=null;else{const mn=pt.point.x-re.x,Sn=pt.point.z-re.z,Je=Math.hypot(mn,Sn);if(Je<.04)ct.face({x:re.x+Math.sin(pt.point.yaw),z:re.z+Math.cos(pt.point.yaw)}),kt={action:"rest",pose:pt.pose,venue:Ii(re,Xt)?"home":["beach","garden","terrace","lounge","bar"].find(ce=>Pr(re,ce))||"campus"},pt=null,se={};else{const ce=Math.min(1,Je/(4.5*D))/Je;se={x:(Math.cos(Pt)*mn-Math.sin(Pt)*Sn)*ce,z:(-Math.sin(Pt)*mn-Math.cos(Pt)*Sn)*ce}}}}const pe=v.modeState(rt);(pe?.id||null)!==Vi&&(Vi=pe?.id||null,q("follow",rt)),ct.setForm(v.form(rt),pe?.expires);const Yt=ct.step(D,se,Pt,nt);if(["walk","run","jump","fly","land"].includes(Yt.action)&&(kt=null),kt&&Object.assign(Yt,kt),Yt.transformation=pe,Yt.transformationCooldown=v.modeCooldown(rt),Yt.restPending=!!pt,Z.group.position.set(Yt.x,Yt.y,Yt.z),Z.group.rotation.y=Yt.yaw,Z.manual=!0,Z.pose="manual",Z.home.copy(Z.group.position),Z.target.copy(Z.group.position),_t){const re=_t==="home"&&Xt?{x:Xt.x,z:Xt.z+5}:Vn.venues[_t];re&&(Yt.target=_t,Yt.distance=Math.round(Math.hypot(Yt.x-re.x,Yt.z-re.z)))}if(Yt.atHome=Ii(Yt,Xt),Yt.nearDoor=!!(Xt&&Math.hypot(Yt.x-Xt.x,Yt.z-Xt.z-3.9)<=2.8),Yt.doorOpen=Qe,Xt){const re=Ii(Yt,Xt);re!==Ot.active()&&(R(),Ne=!1,ft.select(re?Le:null),re&&(vt="follow",it=rt,_.enablePan=!1)),Ot.set(re?Le:null,re?Z.group:null),Yt.interior=re}else Yt.interior=!1;jt({...Yt,interior:Ot.active()}),Z.icon.textContent=(Z.person.private?"PRIVAT · ":"ONLINE · ")+(Yt.action==="run"?"BOOST":Yt.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(Z.manual){const Pt=Z.person.id===rt&&ct?{...ct.state(),...kt||{}}:Mn.get(Z.person.id)||Z.person.pilot;if(Pt&&Z.person.id!==rt){const Yt=new O(Pt.x,Pt.y,Pt.z),re=Z.group.position.clone().lerp(Yt,.35);h.segment(Z.group.position,re)?Z.group.position.copy(re):Z.group.position.copy(Yt),Z.group.rotation.y=Pt.yaw}Z.person.id!==rt&&v.observe(Z.person.id,Pt,Z),Z.flight=!!Pt?.flight,Z.moving=["walk","run"].includes(Pt?.action);const nt=v.pose(Z.person.id),J=zg(Z,nt&&!["walk","run","jump","fly","land","rest"].includes(Pt?.action)?{...Pt,action:"cast",skillPose:nt}:Pt,{time:y/1e3+Z.phase,dt:D,reduced:Bt}),se=Pt?.action==="play"?Ri.find(Yt=>Yt.id===Pt.venue):null;Z.racket.visible=!!(se&&["tennis","badminton","pingpong","golf"].includes(se.id)),Z.tool.visible=!!(se&&["billiards","archery","darts"].includes(se.id)),Z.tool.visible&&(Z.tool.geometry=Me(se.id)),Z.cup.visible=Pt?.action==="drink",Z.plate.visible=Pt?.action==="eat",Pt?.action==="rest"&&(Z.icon.textContent=Pt.pose==="nap"?"ONLINE · TIDUR SANTAI":Pt.pose==="recline"?"ONLINE · REBAHAN":Pt.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const pe=v.form(Z.person.id);pe&&(Z.icon.textContent=(Z.person.private?"PRIVAT · ":"ONLINE · ")+pe.name+(Pt?.flight?" · TERBANG":"")),J.lying&&(!Ot.active()||Z.person.id===rt)&&(B.compose(new O(Z.group.position.x+Math.sin(Z.group.rotation.y)*.7,Z.group.position.y+.035,Z.group.position.z+Math.cos(Z.group.rotation.y)*.7),Z.group.quaternion,new O(1,1,1)),L.setMatrixAt(F++,B));continue}v.clearForm(Z.person.id);const ne=Z.pose==="playing",ve=!Bt&&(ne||Z.waypoints?.length>0);if(Z.target.copy(Z.home),ne&&!Z.waypoints?.length&&(Z.target.x+=Math.sin(Rt*.65)*(Z.game.kind==="court"?1.4:.18),Z.target.z+=Math.cos(Rt*.5)*(Z.game.kind==="court"?.3:.08)),Z.waypoints?.length&&!Bt){const Pt=Z.waypoints[0];Z.group.position.distanceTo(Pt)<.015?Z.waypoints.shift():(Z.group.rotation.y=Math.atan2(Pt.x-Z.group.position.x,Pt.z-Z.group.position.z),Ts(Z,Pt,D*3.2))}else ne?Ts(Z,Z.target,Bt?0:D*1.4):Z.pose==="meeting"?(Ts(Z,Z.home,Bt?0:D*3.2),Z.group.rotation.y=Z.facing):Z.group.position.copy(Z.home);Z.legs.forEach((Pt,nt)=>{Pt.rotation.x=ve?Math.sin(Rt*4+nt*Math.PI)*.32:Z.pose==="working"||Z.pose==="resting"?-1.1:0}),Z.body.position.y=Math.sin(Rt*1.6)*(Bt?0:Z.pose==="sleeping"?.007:.018),Z.body.rotation.x=Z.pose==="sleeping"?-Math.PI/2:0,Z.body.rotation.z=ne?Math.sin(Rt*1.5)*.07:0,Z.head.rotation.x=Z.pose==="sleeping"?0:Math.sin(Rt*.6)*(Bt?0:.025),Z.arms[0].rotation.x=Z.pose==="working"?-.65+Math.sin(Rt*5)*(Bt?0:.045):Z.pose==="eating"?-1.05:.1,Z.arms[1].rotation.x=Z.pose==="working"?-.65+Math.sin(Rt*5+1)*(Bt?0:.045):Z.pose==="coffee"?-1.2+Math.sin(Rt*1.2)*(Bt?0:.13):Z.pose==="eating"?-.8+Math.sin(Rt*2)*(Bt?0:.13):.1,ne&&(Z.arms[1].rotation.x=-.6+Math.sin(Rt*2.3)*(Bt?0:.7),Z.arms[0].rotation.x=-.25+Math.sin(Rt*2.3+1)*(Bt?0:.25)),Z.pose==="dancing"&&!ve&&(Z.body.rotation.z=Bt?0:Math.sin(Rt*2.4)*.13,Z.arms.forEach((Pt,nt)=>{Pt.rotation.x=-.8+Math.sin(Rt*2.4+nt)*(Bt?0:.5)}),Z.legs.forEach((Pt,nt)=>{Pt.rotation.x=Bt?0:Math.sin(Rt*2.4+nt*Math.PI)*.25})),Z.pose==="meeting"?(Z.arms[1].rotation.x=-.2+Math.sin(Rt*1.7)*(Bt||ve?0:.18),Z.head.rotation.y=Math.sin(Rt*.7)*(Bt?0:.06)):Z.head.rotation.y=0}L.count=F,L.instanceMatrix.needsUpdate=!0,v.update(Date.now(),ct?.state());const G=x.get(it);if(vt!=="orbit"&&G&&!Ne){const Rt=G.group.position.clone().add(new O(0,v.form(it)?.height*.55||(G.pose==="sleeping"?.25:1.3),G.pose==="sleeping"?-1.3:0)).clone().sub(_.target).multiplyScalar(.25);_.target.add(Rt),u.position.add(Rt)}Ee.update(y,{paused:Bt,dark:document.documentElement.classList.contains("dark"),center:_.target}),ht.update(y,{paused:Bt,energySaver:st}),St.update(y,Bt);for(const{mesh:Z,game:Rt}of At){const ne=Bt?0:y/1e3,Pt=[...x.values()].some(nt=>nt.manual?(nt.person.id===rt?kt:Mn.get(nt.person.id)||nt.person.pilot)?.action==="play"&&(nt.person.id===rt?kt:Mn.get(nt.person.id)||nt.person.pilot)?.venue===Rt.id:!xu(d())&&nt.pose==="playing"&&nt.game.id===Rt.id)?Math.sin(ne*1.8):0;Z.position.set(Rt.x+(Rt.id==="golf"?Pt*4:Pt*1.5),Rt.id==="pingpong"?1.45+Math.abs(Pt)*.65:Rt.id==="basketball"?.15+Math.abs(Pt)*2.2:Rt.id==="bowling"||Rt.id==="golf"?.06:.4+Math.abs(Pt)*2,Rt.z+Pt*(Rt.kind==="court"?4:1.3))}_.update();const X=u.position.clone(),ut=u.quaternion.clone();vt!=="orbit"&&G&&u.position.copy(Og(h,_.target,X,ft.cameraBoxes(it),Ot.active()?1.7:v.form(it)?.height*.85||(vt==="portrait"?2.8:3.8),Ot.active()?8:v.form(it)?55:35)),u.lookAt(_.target),u.updateMatrixWorld(!0),A?A.copy(u):A=u.clone(),Ot.apply(),p.render(m,u),(Bt||y-N>120||Ne)&&(nr(),N=y),u.position.copy(X),u.quaternion.copy(ut),u.updateMatrixWorld(!0),(!Bt||Ne||pt||ct?.moving()||ct&&ct.state().stamina<100||!Ht()&&(Math.abs(Ut.x||0)+Math.abs(Ut.z||0)>0||Ut.jump))&&Te()}function Te(){!be&&yt&&zt===null&&(zt=requestAnimationFrame(Es))}function Ts(y,D,F){const G=ft.location(y.person.id),X=G&&Math.abs(y.group.position.x-G.x)<4.8&&Math.abs(y.group.position.z-G.z)<5;return!!X!=!!y.npcDoorOpen&&(y.npcDoorOpen=!!X,ft.setDoor(y.person.id,!!X)),h.withHomeAccess(ft.slotFor(y.person.id),()=>Ko(y,D,F))}function Ko(y,D,F){const G=h.move(y.group.position,D,F),X=Math.hypot(G.x-y.group.position.x,G.z-y.group.position.z),ut=[...x.values()].some(Z=>Z!==y&&Z.pose!=="sleeping"&&Math.hypot(G.x-Z.group.position.x,G.z-Z.group.position.z)<.62);if(ut||y.group.position.set(G.x,y.home.y,G.z),(ut||X<.001&&y.group.position.distanceTo(D)>.2)&&Kt>=(y.repathAt||0)&&(y.pose==="meeting"||y.waypoints?.length)){y.repathAt=Kt+1500;const Z=[...x.values()].filter(ne=>ne!==y&&ne.pose!=="sleeping").map(ne=>ne.group.position),Rt=h.path(y.group.position,y.home,Z);Rt.length&&(y.waypoints=Rt.map(ne=>new O(ne.x,y.home.y,ne.z)))}}function fi(){if(be)return;const y=i.getBoundingClientRect();y.width<1||y.height<1||(p.setSize(y.width,y.height,!1),u.aspect=y.width/y.height,u.updateProjectionMatrix(),Te())}function R(y=!0){mt=null;const D=lt;if(lt=null,!D||(ft.select(null),!y))return;as(_);const F=x.get(D.followId)?.group.position,G=D.anchor&&F?F.clone().sub(D.anchor):new O;vt=D.mode,it=D.followId,_.enablePan=D.pan,_.minDistance=D.min,_.maxDistance=D.max,u.fov=D.fov,u.updateProjectionMatrix(),u.position.copy(D.position).add(G),_.target.copy(D.target).add(G),Ce.copy(D.focus).add(G),Be.copy(D.goal).add(G),Ne=D.easing}function k(y="all"){if(Ot.active()){q("follow",rt);return}R(!1),as(_),vt="orbit",it=null,u.fov=36,u.updateProjectionMatrix(),_.enablePan=!0,_.minDistance=8,_.maxDistance=650;const D=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const ut of Ri)F[ut.id]=[[ut.x,.3,ut.z],[ut.x+14,19,ut.z+22]];for(const[ut,Z]of Object.entries(bs))F[ut]=[Z,[Z[0]+12,19,Z[2]+22]];const[G,X]=F[y]||F.all;if(Ce.set(...G),Be.set(...X),y==="all"||y==="residences"){const ut=ft.bounds(),Z=y==="all"?76:ut.front,Rt=ut.right-ut.left,ne=Z-ut.back;Ce.set(0,0,(Z+ut.back)/2);const ve=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Pt=Math.min(Bi.degToRad(u.fov/2),Math.atan(Math.tan(Bi.degToRad(u.fov/2))*ve)),nt=Math.hypot(Rt,ne)/2/Math.sin(Pt)*1.07;Be.copy(new O(1,1.18,1.3).normalize().multiplyScalar(nt).add(Ce))}else D&&Be.sub(Ce).multiplyScalar(1.23).add(Ce);mt=null,ft.select(x.get(ee)?.pose==="sleeping"?ee:null),Bt?(u.position.copy(Be),_.target.copy(Ce),Ne=!1):Ne=!0,Te()}function Q(y){if(Ot.active()){q("follow",rt);return}const D=ft.location(y);D&&(as(_),lt||(lt={mode:vt,followId:it,anchor:x.get(it)?.group.position.clone(),position:u.position.clone(),target:_.target.clone(),focus:Ce.clone(),goal:Be.clone(),easing:Ne,fov:u.fov,min:_.minDistance,max:_.maxDistance,pan:_.enablePan}),vt="orbit",it=null,_.enablePan=!0,_.minDistance=5,_.maxDistance=650,u.fov=36,u.updateProjectionMatrix(),mt=y,ft.select(y),Ce.set(D.x,1.2,D.z),Be.copy(Ce).add(new O(11,12,15)),i.clientWidth<600&&Be.sub(Ce).multiplyScalar(1.23).add(Ce),Bt?(u.position.copy(Be),_.target.copy(Ce),Ne=!1):Ne=!0,Te())}function q(y,D=ee){if(Ot.active()&&(y="follow",D=rt),R(!1),as(_),y==="orbit"){vt="orbit",it=null,u.fov=36,u.updateProjectionMatrix(),_.enablePan=!0,_.minDistance=5,_.maxDistance=650,Te();return}!x.has(D)&&Y.some(X=>X.id===D)&&(ee=D,je(Y));const F=x.get(D);if(!F)return;const G=v.form(D);vt=y==="portrait"?"portrait":"follow",it=D,_.enablePan=!1,_.minDistance=Ot.active()?1.7:G?G.height*.85:vt==="portrait"?2.8:3.8,_.maxDistance=Ot.active()?8:G?55:35,u.fov=Ot.active()?58:44,u.updateProjectionMatrix(),Ce.copy(F.group.position).add(new O(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),G&&(Ce.y=F.group.position.y+G.height*.55),Be.copy(Ce).add(G?new O(G.height*.85,G.height*.65,G.height*1.1):vt==="portrait"?new O(1.8,.9,2.7):new O(4,2.5,5)),Bt?(u.position.copy(Be),_.target.copy(Ce),Ne=!1):Ne=!0,Te()}let K=null;const Et=new Xn({transparent:!0,opacity:0,depthWrite:!1});S.set("game-hotspots",Et);for(const y of Ri){const D=new Ve(6,1.4,.4),F=new Ve(y.kind==="court"?16:9,.18,y.kind==="court"?12:7);D.translate(0,.7,-(y.kind==="court"?6:4.2)),F.translate(0,-.14,0);const G=D.toNonIndexed(),X=F.toNonIndexed(),ut=Yn([G,X],!1);D.dispose(),F.dispose(),G.dispose(),X.dispose(),E.add(ut);const Z=new ye(ut,Et);Z.position.set(y.x,0,y.z),Z.userData.officeGame=y.id,m.add(Z),ys.push(Z)}const Nt=new Wh,bt=new It,Ct=y=>{K=[y.clientX,y.clientY]},Gt=y=>{if(!K||Math.hypot(y.clientX-K[0],y.clientY-K[1])>6)return;K=null;const D=p.domElement.getBoundingClientRect();bt.set((y.clientX-D.left)/D.width*2-1,-(y.clientY-D.top)/D.height*2+1),Nt.setFromCamera(bt,A||u);const F=Nt.intersectObjects([...x.values()].map(X=>X.group).concat(ft.meshes,ht.targets,St.targets,ys,v.targets()),!0)[0],G=ft.personForHit(F);if(G===Le&&F?.object.userData.residenceLayer==="door"){o();return}G?(e(G),Q(G)):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function $t(){const y=document.documentElement.classList.contains("dark");p.toneMappingExposure=y?1.02:1.18,Ee.configure(Mt,st),Te()}const ue=new ResizeObserver(fi);ue.observe(i);const Ft=new MutationObserver($t);Ft.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const fe=y=>{y.preventDefault(),be||n()};p.domElement.addEventListener("pointerdown",Ct),p.domElement.addEventListener("pointerup",Gt),p.domElement.addEventListener("webglcontextlost",fe);const Ue=()=>Te();return _.addEventListener("change",Ue),_.addEventListener("start",()=>{Ne=!1}),$t(),k("all"),u.position.copy(Be),_.target.copy(Ce),Ne=!1,fi(),{setPeople:je,resize:fi,focusRoom:k,visitHome:Q,setCameraMode:q,collisionBoxes:()=>h.boxes(),setPilotReporter(y){jt=y},castSkill(y=0){const D=x.get(rt);if(!D||!ct)return{error:"Aktifkan kendali avatar dahulu."};const F=pu(Al(D.person.avatar).costume)[y];return F?v.cooldown(rt)?{error:`Pulihkan energi ${v.cooldown(rt)} detik lagi.`}:F.type==="transform"&&(Ot.active()||!h.free(ct.state().x,ct.state().z,ct.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&v.modeCooldown(rt)?{error:`Transformasi pulih dalam ${v.modeCooldown(rt)} detik.`}:(kt=null,pt=null,v.cast(rt,F.id,D)?(Te(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(y,D){if(!y||!ct)return;const F=D?.receivedAt??Date.now(),G=D?.sentAt??F;if(Number.isFinite(y.updated_ms)&&v.clock(y.updated_ms-(G+F)/2,Math.max(0,F-G)),ui&&y.form)return;y.form||(ui=!1),v.observe(rt,y,x.get(rt),!0);const X=v.modeState(rt);ct.setForm(v.form(rt),X?.expires),Te()},toggleFlight(){const y=ct?.toggleFlight();return Te(),y},endTransformation(){ui=!0,Vi=null,v.clearForm(rt),ct?.setForm(null),q("follow",rt),Te()},activeTransformation:()=>v.modeState(rt),setPrivatePilotProfile(y){gt&&(gt={...gt,avatar:y},je(Y.map(D=>D.id===gt.id?gt:D)))},setPilotGate(y){Ht=y},reconcilePilot(y){ct&&(ct.reset(y),kt=null,pt=null,Ut={},Te())},configureHome(y,D,F=null){Le=y,Xt=D?Zo(D.slot):null,Hi=Number.isInteger(F)?Math.min(128,F):null,ft.setPlots(Hi??0)},canUseDoor(){const y=ct?.state();return!!(Xt&&y&&(Ii(y,Xt)||Math.hypot(y.x-Xt.x,y.z-Xt.z-3.9)<=2.8))},homeDoorOpen:()=>Qe,setHomeDoor(y){Qe!==!!y&&(Qe=!!y,h.configureHomes(!0,Qe?Xt?.slot:null),Le&&ft.setDoor(Le,Qe),Te())},setRestPose(y){if(!ct)return!1;if(v.cancel(rt),pt=null,kt=null,Ut={},!y)return Te(),!0;if(!["sit","recline","nap","meditate"].includes(y))return!1;const D=ct.state(),F=[...x.values()].filter(X=>X.person.id!==rt&&X.pose!=="sleeping").map(X=>X.group.position),G=D.grounded?Uc(h,D,y,F):null;return D.grounded&&!G?!1:(pt={pose:y,point:G},G&&Math.hypot(G.x-D.x,G.z-D.z)<.04&&(ct.face({x:D.x+Math.sin(G.yaw),z:D.z+Math.cos(G.yaw)}),kt={action:"rest",pose:y,venue:Ii(D,Xt)?"home":["beach","garden","terrace","lounge","bar"].find(X=>Pr(D,X))||"campus"},pt=null),Te(),!0)},setPilot(y,D,F=null){rt=y,gt=F,ct=Fg(h,D),je(Y),q("follow",y),Te()},releasePilot(){Ot.leave(),v.clearForm(rt),ui=!1,Vi=null;const y=gt?.id;rt=null,gt=null,ct=null,Ut={},kt=null,pt=null,_t=null,sn.visible=!1,je(Y.filter(D=>D.id!==y))},setPilotInput(y){Ut=y||{},Te()},pilotState(){return ct?{...ct.state(),...kt||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){rt&&(q("follow",rt),i.focus?.({preventScroll:!0}))},setPeerPilots(y){Mn.clear();for(const D of y)D.id!==rt&&Mn.set(D.id,D);je(Y.map(D=>({...D,pilot:Mn.get(D.id)||null,in_office:Mn.has(D.id)||D.id===rt})))},canInteract(y){return Pr(ct?.state(),y)},guideTo(y){const D=y==="home"&&Xt?{x:Xt.x,z:Xt.z+5}:Vn.venues[y];if(_t=D?y:null,sn.visible=!!D,D){sn.position.set(D.x,.025,D.z);const F=ct?.state();jt({...F,target:y,distance:F?Math.round(Math.hypot(D.x-F.x,D.z-F.z)):null}),Te()}return D},interactNearest(){const y=ct?.state();if(!y)return!1;if(Xt&&(Ii(y,Xt)||Math.hypot(y.x-Xt.x,y.z-Xt.z-3.9)<=2.8))return o(),!0;const D=Object.keys(Vn.venues).filter(F=>Pr(y,F)).sort((F,G)=>Math.hypot(y.x-Vn.venues[F].x,y.z-Vn.venues[F].z)-Math.hypot(y.x-Vn.venues[G].x,y.z-Vn.venues[G].z))[0];return Ri.some(F=>F.id===D)?(r(D),!0):["bar","disco","beach","garden","terrace","lounge"].includes(D)?(s(D),!0):!1},setRecreation(y,D){Number(y)===rt&&D&&(kt={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[D.kind]||"idle",venue:D.destination,pose:D.kind==="relax"?"sit":null}),z.set(Number(y),D?{...D,until:D.until||Date.now()/1e3+900}:null),je(Y)},setVenueEffects(y){ht.setEnabled(y),Te()},setGame(y){JSON.stringify(tt)!==JSON.stringify(y)&&(tt=y,rt&&y?.status==="playing"&&[y.from,y.to].includes(rt)?kt={action:"play",venue:y.kind}:kt?.action==="play"&&(kt=null),je(Y))},say(y,D){const F=x.get(Number(y));F&&(F.bubble.textContent=String(D||"").slice(0,350),F.bubble.hidden=!1,ot.has(y)&&clearTimeout(ot.get(y)),ot.set(y,setTimeout(()=>{F.bubble.hidden=!0,ot.delete(y),Te()},1e4)),Te())},configureWorld(y){Mt=y||{},Ee.configure(Mt,st),C("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[Mt.settings?.landscape]||"#47695f"),Te()},setEnergySaver(y){st=!!y,p.setPixelRatio(st?1:Math.min(window.devicePixelRatio||1,1.5)),Ee.configure(Mt,st),fi()},setMeeting(y){dt=y,je(Y)},meetingReady(){if(rt&&dt?.connected&&dt.room){const D=x.get(dt.room.from),F=x.get(dt.room.to);if(!D||!F||D.group.position.distanceTo(F.group.position)>3)return!1;const G=F.group.position.x-D.group.position.x,X=F.group.position.z-D.group.position.z,ut=Math.hypot(G,X);return ut>.2&&(Math.sin(D.group.rotation.y)*G+Math.cos(D.group.rotation.y)*X)/ut>.45&&(-Math.sin(F.group.rotation.y)*G-Math.cos(F.group.rotation.y)*X)/ut>.45}const y=dt?.room;return!y||!dt.connected?!1:[y.from,y.to].every(D=>{const F=x.get(D);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(y,D=!1){ee!==y&&R(),ee=y,y&&!x.has(y)&&Y.some(G=>G.id===y)&&je(Y);for(const[G,X]of x)X.ring.visible=G===y,X.label.setAttribute("aria-pressed",String(G===y));const F=x.get(y);if(ft.select(mt??(F?.pose==="sleeping"?y:null)),F&&D&&rt&&y!==rt&&ct){ct.face(F.group.position),Te();return}if(F&&D&&vt!=="orbit"){q(vt,y);return}if(F&&D&&F.pose==="sleeping"){Q(y);return}F&&D&&(Ce.copy(F.target).add(new O(0,1,0)),Be.copy(Ce).add(new O(11,11,14)),Bt?(u.position.copy(Be),_.target.copy(Ce)):Ne=!0),Te()},zoom(y){if(!Number.isFinite(y)||y<=0)return;Ne=!1;const D=u.position.clone().sub(_.target);D.setLength(Bi.clamp(D.length()*y,_.minDistance,_.maxDistance)),u.position.copy(_.target).add(D),_.update(),Te()},setPaused(y){if(Bt=y,Bt&&Ne&&(u.position.copy(Be),_.target.copy(Ce),Ne=!1),Bt)for(const D of x.values())D.pose==="meeting"&&(D.group.position.copy(D.home),D.group.rotation.y=D.facing,D.waypoints=[]);zt!==null&&cancelAnimationFrame(zt),zt=null,Te()},setVisible(y){yt=y,!y&&zt!==null?(cancelAnimationFrame(zt),zt=null):y&&(Kt=0,fi(),Te())},dispose(){be=!0,zt!==null&&cancelAnimationFrame(zt),zt=null,ue.disconnect(),Ft.disconnect(),_.dispose(),Ot.dispose(),v.dispose();for(const y of ot.values())clearTimeout(y);ot.clear(),z.clear(),p.domElement.removeEventListener("pointerdown",Ct),p.domElement.removeEventListener("pointerup",Gt),p.domElement.removeEventListener("webglcontextlost",fe),ft.dispose(),L.dispose(),Ee.dispose();for(const y of E)y.dispose();for(const y of S.values())y.dispose();for(const y of M)y.dispose();x.forEach(y=>y.label.remove()),x.clear(),m.clear(),p.dispose(),p.forceContextLoss(),p.domElement.remove()}}}export{Wg as createOfficeScene};
