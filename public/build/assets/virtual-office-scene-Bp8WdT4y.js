import{m as In,w as Ph,c as _s,t as Dh,a as Lh,g as es,s as Ih,b as Xl,p as Nh,d as Uh,e as Fh,i as Oh}from"./virtual-office-iuNuc56J.js";const Jo="187",ki={ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tu=0,Va=1,eu=2,er=1,nu=2,Ds=3,Wi=0,yn=1,gn=2,us=0,Ls=1,hr=2,Wa=3,Xa=4,iu=5,as=100,su=101,ru=102,ou=103,au=104,lu=200,cu=201,uu=202,hu=203,el=204,nl=205,fu=206,du=207,pu=208,mu=209,gu=210,_u=211,xu=212,vu=213,Mu=214,io=0,so=1,ro=2,Ns=3,oo=4,ao=5,lo=6,co=7,il=0,Su=1,yu=2,di=0,sl=1,rl=2,ol=3,$o=4,al=5,ll=6,cl=7,ul=300,hs=301,Us=302,$r=303,Qr=304,uo=1e3,fi=1001,ho=1002,ln=1003,bu=1004,js=1005,Sn=1006,jr=1007,Ti=1008,Cn=1009,hl=1010,fl=1011,Fs=1012,Qo=1013,Qn=1014,kn=1015,jn=1016,jo=1017,ta=1018,fs=1020,dl=35902,pl=35899,ml=1021,gl=1022,Jn=1023,Ci=1026,wi=1027,ea=1028,na=1029,Xi=1030,ia=1031,sa=1033,nr=33776,ir=33777,sr=33778,rr=33779,fo=35840,po=35841,mo=35842,go=35843,_o=36196,xo=37492,vo=37496,Mo=37488,So=37489,fr=37490,yo=37491,bo=37808,Eo=37809,To=37810,wo=37811,Ao=37812,Ro=37813,Co=37814,Po=37815,Do=37816,Lo=37817,Io=37818,No=37819,Uo=37820,Fo=37821,Oo=36492,Bo=36494,zo=36495,Go=36283,ko=36284,dr=36285,Ho=36286,Eu=3200,Vo=0,Tu=1,Ei="",Mn="srgb",pr="srgb-linear",mr="linear",Pe="srgb",to=7680,wu=519,Au=512,Ru=513,Cu=514,_l=515,Pu=516,Du=517,xl=518,vl=519,Lu=35044,Ml=35048,Ya="300 es",Hn=2e3,Os=2001;function Bh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Wo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Iu(){const i=Wo("canvas");return i.style.display="block",i}const Yl={};function qa(...i){const t="THREE."+i.shift();console.log(t,...i)}function Nu(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Kt(...i){i=Nu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Se(...i){i=Nu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function or(...i){const t=i.join(" ");t in Yl||(Yl[t]=!0,Kt(...i))}function zh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Gh={[io]:io,[ro]:lo,[oo]:oo,[Ns]:ao,[so]:so,[lo]:ro,[co]:co,[ao]:Ns};class Di{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ql=1234567;const ar=Math.PI/180,gr=180/Math.PI;function ks(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]+"-"+pn[t&255]+pn[t>>8&255]+"-"+pn[t>>16&15|64]+pn[t>>24&255]+"-"+pn[e&63|128]+pn[e>>8&255]+"-"+pn[e>>16&255]+pn[e>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function le(i,t,e){return Math.max(t,Math.min(e,i))}function Sl(i,t){return(i%t+t)%t}function kh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hh(i,t,e){return i!==t?(e-i)/(t-i):0}function lr(i,t,e){return(1-e)*i+e*t}function Vh(i,t,e,n){return lr(i,t,1-Math.exp(-e*n))}function Wh(i,t=1){return t-Math.abs(Sl(i,t*2)-t)}function Xh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Yh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function qh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zh(i,t){return i+Math.random()*(t-i)}function Kh(i){return i*(.5-Math.random())}function Jh(i){i!==void 0&&(ql=i);let t=ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $h(i){return i*ar}function Qh(i){return i*gr}function jh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function tf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Uu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ef(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),g=r((t-n)/2),p=o((t-n)/2),m=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*g,c*p,a*l);break;case"YZY":i.set(c*p,a*d,c*g,a*l);break;case"ZXZ":i.set(c*g,c*p,a*d,a*l);break;case"XZX":i.set(a*d,c*x,c*m,a*l);break;case"YXY":i.set(c*m,a*d,c*x,a*l);break;case"ZYZ":i.set(c*x,c*m,a*d,a*l);break;default:Kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Fu(i,t){if(t.constructor===Float32Array)return i;const e=yl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Ou(i,t){if(t.constructor===Float32Array)return i;const e=yl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Hi={DEG2RAD:ar,RAD2DEG:gr,generateUUID:ks,clamp:le,euclideanModulo:Sl,mapLinear:kh,inverseLerp:Hh,lerp:lr,damp:Vh,pingpong:Wh,smoothstep:Xh,smootherstep:Yh,randInt:qh,randFloat:Zh,randFloatSpread:Kh,seededRandom:Jh,degToRad:$h,radToDeg:Qh,isPowerOfTwo:jh,ceilPowerOfTwo:tf,floorPowerOfTwo:Uu,setQuaternionFromProperEuler:ef,normalize:Ou,denormalize:Fu},kl=class kl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};kl.prototype.isVector2=!0;let Ot=kl;class Pn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],g=n[s+3],p=r[o+0],m=r[o+1],x=r[o+2],M=r[o+3];if(g!==M||c!==p||l!==m||d!==x){let u=c*p+l*m+d*x+g*M;u<0&&(p=-p,m=-m,x=-x,M=-M,u=-u);let h=1-a;if(u<.9995){const b=Math.acos(u),E=Math.sin(b);h=Math.sin(h*b)/E,a=Math.sin(a*b)/E,c=c*h+p*a,l=l*h+m*a,d=d*h+x*a,g=g*h+M*a}else{c=c*h+p*a,l=l*h+m*a,d=d*h+x*a,g=g*h+M*a;const b=1/Math.sqrt(c*c+l*l+d*d+g*g);c*=b,l*=b,d*=b,g*=b}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],g=r[o],p=r[o+1],m=r[o+2],x=r[o+3];return t[e]=a*x+d*g+c*m-l*p,t[e+1]=c*x+d*p+l*g-a*m,t[e+2]=l*x+d*m+a*p-c*g,t[e+3]=d*x-a*g-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),g=a(r/2),p=c(n/2),m=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=p*d*g+l*m*x,this._y=l*m*g-p*d*x,this._z=l*d*x+p*m*g,this._w=l*d*g-p*m*x;break;case"YXZ":this._x=p*d*g+l*m*x,this._y=l*m*g-p*d*x,this._z=l*d*x-p*m*g,this._w=l*d*g+p*m*x;break;case"ZXY":this._x=p*d*g-l*m*x,this._y=l*m*g+p*d*x,this._z=l*d*x+p*m*g,this._w=l*d*g-p*m*x;break;case"ZYX":this._x=p*d*g-l*m*x,this._y=l*m*g+p*d*x,this._z=l*d*x-p*m*g,this._w=l*d*g+p*m*x;break;case"YZX":this._x=p*d*g+l*m*x,this._y=l*m*g+p*d*x,this._z=l*d*x-p*m*g,this._w=l*d*g-p*m*x;break;case"XZY":this._x=p*d*g-l*m*x,this._y=l*m*g-p*d*x,this._z=l*d*x+p*m*g,this._w=l*d*g+p*m*x;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],g=e[10],p=n+a+g;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>g){const m=2*Math.sqrt(1+n-a-g);this._w=(d-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>g){const m=2*Math.sqrt(1+a-n-g);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+g-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Hl=class Hl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),g=2*(r*n-o*e);return this.x=e+c*l+o*g-a*d,this.y=n+c*d+a*l-r*g,this.z=s+c*g+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ga.copy(this).projectOnVector(t),this.sub(ga)}reflect(t){return this.sub(ga.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hl.prototype.isVector3=!0;let O=Hl;const ga=new O,Zl=new Pn,Vl=class Vl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],g=n[7],p=n[2],m=n[5],x=n[8],M=s[0],u=s[3],h=s[6],b=s[1],E=s[4],R=s[7],S=s[2],_=s[5],f=s[8];return r[0]=o*M+a*b+c*S,r[3]=o*u+a*E+c*_,r[6]=o*h+a*R+c*f,r[1]=l*M+d*b+g*S,r[4]=l*u+d*E+g*_,r[7]=l*h+d*R+g*f,r[2]=p*M+m*b+x*S,r[5]=p*u+m*E+x*_,r[8]=p*h+m*R+x*f,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],g=d*o-a*l,p=a*c-d*r,m=l*r-o*c,x=e*g+n*p+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/x;return t[0]=g*M,t[1]=(s*l-d*n)*M,t[2]=(a*n-s*o)*M,t[3]=p*M,t[4]=(d*e-s*c)*M,t[5]=(s*r-a*e)*M,t[6]=m*M,t[7]=(n*c-l*e)*M,t[8]=(o*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return or("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_a.makeScale(t,e)),this}rotate(t){return or("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_a.makeRotation(-t)),this}translate(t,e){return or("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_a.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Vl.prototype.isMatrix3=!0;let ne=Vl;const _a=new ne,Kl=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jl=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nf(){const i={enabled:!0,workingColorSpace:pr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Pe&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Pe&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ei?mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pr]:{primaries:t,whitePoint:n,transfer:mr,toXYZ:Kl,fromXYZ:Jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Mn},outputColorSpaceConfig:{drawingBufferColorSpace:Mn}},[Mn]:{primaries:t,whitePoint:n,transfer:Pe,toXYZ:Kl,fromXYZ:Jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Mn}}}),i}const _e=nf();function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xs;class Bu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{xs===void 0&&(xs=Wo("canvas")),xs.width=t.width,xs.height=t.height;const s=xs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=xs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Wo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ai(e[n]/255)*255):e[n]=Ai(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let sf=0;class ra{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=ks(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xa(s[o].image)):r.push(xa(s[o]))}else r=xa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function xa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Bu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}let rf=0;const va=new O;class fn extends Di{constructor(t=fn.DEFAULT_IMAGE,e=fn.DEFAULT_MAPPING,n=fi,s=fi,r=Sn,o=Ti,a=Jn,c=Cn,l=fn.DEFAULT_ANISOTROPY,d=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=ks(),this.name="",this.source=new ra(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ul)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case uo:t.x=t.x-Math.floor(t.x);break;case fi:t.x=t.x<0?0:1;break;case ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case uo:t.y=t.y-Math.floor(t.y);break;case fi:t.y=t.y<0?0:1;break;case ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=ul;fn.DEFAULT_ANISOTROPY=1;const Wl=class Wl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],d=c[4],g=c[8],p=c[1],m=c[5],x=c[9],M=c[2],u=c[6],h=c[10];if(Math.abs(d-p)<.01&&Math.abs(g-M)<.01&&Math.abs(x-u)<.01){if(Math.abs(d+p)<.1&&Math.abs(g+M)<.1&&Math.abs(x+u)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,R=(m+1)/2,S=(h+1)/2,_=(d+p)/4,f=(g+M)/4,v=(x+u)/4;return E>R&&E>S?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=_/n,r=f/n):R>S?R<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(R),n=_/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=f/r,s=v/r),this.set(n,s,r,e),this}let b=Math.sqrt((u-x)*(u-x)+(g-M)*(g-M)+(p-d)*(p-d));return Math.abs(b)<.001&&(b=1),this.x=(u-x)/b,this.y=(g-M)/b,this.z=(p-d)/b,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=le(this.x,t.x,e.x),this.y=le(this.y,t.y,e.y),this.z=le(this.z,t.z,e.z),this.w=le(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=le(this.x,t,e),this.y=le(this.y,t,e),this.z=le(this.z,t,e),this.w=le(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(le(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wl.prototype.isVector4=!0;let Ve=Wl;class zu extends Di{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ve(0,0,t,e),this.scissorTest=!1,this.viewport=new Ve(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new fn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ra(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends zu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class bl extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gu extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Ko=class Ko{constructor(t,e,n,s,r,o,a,c,l,d,g,p,m,x,M,u){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,g,p,m,x,M,u)}set(t,e,n,s,r,o,a,c,l,d,g,p,m,x,M,u){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=d,h[10]=g,h[14]=p,h[3]=m,h[7]=x,h[11]=M,h[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ko().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/vs.setFromMatrixColumn(t,0).length(),r=1/vs.setFromMatrixColumn(t,1).length(),o=1/vs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){const p=o*d,m=o*g,x=a*d,M=a*g;e[0]=c*d,e[4]=-c*g,e[8]=l,e[1]=m+x*l,e[5]=p-M*l,e[9]=-a*c,e[2]=M-p*l,e[6]=x+m*l,e[10]=o*c}else if(t.order==="YXZ"){const p=c*d,m=c*g,x=l*d,M=l*g;e[0]=p+M*a,e[4]=x*a-m,e[8]=o*l,e[1]=o*g,e[5]=o*d,e[9]=-a,e[2]=m*a-x,e[6]=M+p*a,e[10]=o*c}else if(t.order==="ZXY"){const p=c*d,m=c*g,x=l*d,M=l*g;e[0]=p-M*a,e[4]=-o*g,e[8]=x+m*a,e[1]=m+x*a,e[5]=o*d,e[9]=M-p*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const p=o*d,m=o*g,x=a*d,M=a*g;e[0]=c*d,e[4]=x*l-m,e[8]=p*l+M,e[1]=c*g,e[5]=M*l+p,e[9]=m*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const p=o*c,m=o*l,x=a*c,M=a*l;e[0]=c*d,e[4]=M-p*g,e[8]=x*g+m,e[1]=g,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=m*g+x,e[10]=p-M*g}else if(t.order==="XZY"){const p=o*c,m=o*l,x=a*c,M=a*l;e[0]=c*d,e[4]=-g,e[8]=l*d,e[1]=p*g+M,e[5]=o*d,e[9]=m*g-x,e[2]=x*g-m,e[6]=a*d,e[10]=M*g+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(of,t,af)}lookAt(t,e,n){const s=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Fi.crossVectors(n,Dn),Fi.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Fi.crossVectors(n,Dn)),Fi.normalize(),yr.crossVectors(Dn,Fi),s[0]=Fi.x,s[4]=yr.x,s[8]=Dn.x,s[1]=Fi.y,s[5]=yr.y,s[9]=Dn.y,s[2]=Fi.z,s[6]=yr.z,s[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],g=n[5],p=n[9],m=n[13],x=n[2],M=n[6],u=n[10],h=n[14],b=n[3],E=n[7],R=n[11],S=n[15],_=s[0],f=s[4],v=s[8],w=s[12],T=s[1],A=s[5],D=s[9],U=s[13],I=s[2],G=s[6],H=s[10],W=s[14],st=s[3],J=s[7],nt=s[11],ut=s[15];return r[0]=o*_+a*T+c*I+l*st,r[4]=o*f+a*A+c*G+l*J,r[8]=o*v+a*D+c*H+l*nt,r[12]=o*w+a*U+c*W+l*ut,r[1]=d*_+g*T+p*I+m*st,r[5]=d*f+g*A+p*G+m*J,r[9]=d*v+g*D+p*H+m*nt,r[13]=d*w+g*U+p*W+m*ut,r[2]=x*_+M*T+u*I+h*st,r[6]=x*f+M*A+u*G+h*J,r[10]=x*v+M*D+u*H+h*nt,r[14]=x*w+M*U+u*W+h*ut,r[3]=b*_+E*T+R*I+S*st,r[7]=b*f+E*A+R*G+S*J,r[11]=b*v+E*D+R*H+S*nt,r[15]=b*w+E*U+R*W+S*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],g=t[6],p=t[10],m=t[14],x=t[3],M=t[7],u=t[11],h=t[15],b=c*m-l*p,E=a*m-l*g,R=a*p-c*g,S=o*m-l*d,_=o*p-c*d,f=o*g-a*d;return e*(M*b-u*E+h*R)-n*(x*b-u*S+h*_)+s*(x*E-M*S+h*f)-r*(x*R-M*_+u*f)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],d=t[10];return e*(o*d-a*l)-n*(r*d-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],g=t[9],p=t[10],m=t[11],x=t[12],M=t[13],u=t[14],h=t[15],b=e*a-n*o,E=e*c-s*o,R=e*l-r*o,S=n*c-s*a,_=n*l-r*a,f=s*l-r*c,v=d*M-g*x,w=d*u-p*x,T=d*h-m*x,A=g*u-p*M,D=g*h-m*M,U=p*h-m*u,I=b*U-E*D+R*A+S*T-_*w+f*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/I;return t[0]=(a*U-c*D+l*A)*G,t[1]=(s*D-n*U-r*A)*G,t[2]=(M*f-u*_+h*S)*G,t[3]=(p*_-g*f-m*S)*G,t[4]=(c*T-o*U-l*w)*G,t[5]=(e*U-s*T+r*w)*G,t[6]=(u*R-x*f-h*E)*G,t[7]=(d*f-p*R+m*E)*G,t[8]=(o*D-a*T+l*v)*G,t[9]=(n*T-e*D-r*v)*G,t[10]=(x*_-M*R+h*b)*G,t[11]=(g*R-d*_-m*b)*G,t[12]=(a*w-o*A-c*v)*G,t[13]=(e*A-n*w+s*v)*G,t[14]=(M*E-x*S-u*b)*G,t[15]=(d*S-g*E+p*b)*G,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,g=a+a,p=r*l,m=r*d,x=r*g,M=o*d,u=o*g,h=a*g,b=c*l,E=c*d,R=c*g,S=n.x,_=n.y,f=n.z;return s[0]=(1-(M+h))*S,s[1]=(m+R)*S,s[2]=(x-E)*S,s[3]=0,s[4]=(m-R)*_,s[5]=(1-(p+h))*_,s[6]=(u+b)*_,s[7]=0,s[8]=(x+E)*f,s[9]=(u-b)*f,s[10]=(1-(p+M))*f,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=vs.set(s[0],s[1],s[2]).length();const a=vs.set(s[4],s[5],s[6]).length(),c=vs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Yn.copy(this);const l=1/o,d=1/a,g=1/c;return Yn.elements[0]*=l,Yn.elements[1]*=l,Yn.elements[2]*=l,Yn.elements[4]*=d,Yn.elements[5]*=d,Yn.elements[6]*=d,Yn.elements[8]*=g,Yn.elements[9]*=g,Yn.elements[10]*=g,e.setFromRotationMatrix(Yn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Hn,c=!1){const l=this.elements,d=2*r/(e-t),g=2*r/(n-s),p=(e+t)/(e-t),m=(n+s)/(n-s);let x,M;if(c)x=r/(o-r),M=o*r/(o-r);else if(a===Hn)x=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===Os)x=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=g,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Hn,c=!1){const l=this.elements,d=2/(e-t),g=2/(n-s),p=-(e+t)/(e-t),m=-(n+s)/(n-s);let x,M;if(c)x=1/(o-r),M=o/(o-r);else if(a===Hn)x=-2/(o-r),M=-(o+r)/(o-r);else if(a===Os)x=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=g,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ko.prototype.isMatrix4=!0;let xe=Ko;const vs=new O,Yn=new xe,of=new O(0,0,0),af=new O(1,1,1),Fi=new O,yr=new O,Dn=new O,$l=new xe,Ql=new Pn;class ti{constructor(t=0,e=0,n=0,s=ti.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],g=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(le(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-g,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-le(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return $l.makeRotationFromQuaternion(t),this.setFromRotationMatrix($l,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ti.DEFAULT_ORDER="XYZ";class oa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let lf=0;const jl=new O,Ms=new Pn,vi=new xe,br=new O,Ws=new O,cf=new O,uf=new Pn,tc=new O(1,0,0),ec=new O(0,1,0),nc=new O(0,0,1),ic={type:"added"},hf={type:"removed"},Ss={type:"childadded",child:null},Ma={type:"childremoved",child:null};class $e extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new O,e=new ti,n=new Pn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new ne}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.premultiply(Ms),this}rotateX(t){return this.rotateOnAxis(tc,t)}rotateY(t){return this.rotateOnAxis(ec,t)}rotateZ(t){return this.rotateOnAxis(nc,t)}translateOnAxis(t,e){return jl.copy(t).applyQuaternion(this.quaternion),this.position.add(jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tc,t)}translateY(t){return this.translateOnAxis(ec,t)}translateZ(t){return this.translateOnAxis(nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?br.copy(t):br.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Ws,br,this.up):vi.lookAt(br,Ws,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(vi),this.quaternion.premultiply(Ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ic),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):Se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hf),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ic),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,t,cf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,uf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),g=o(t.shapes),p=o(t.skeletons),m=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),g.length>0&&(n.shapes=g),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){const c=[];for(const l in a){const d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}$e.DEFAULT_UP=new O(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nn extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ff={type:"move"};class eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const M of t.hand.values()){const u=e.getJointPose(M,n),h=this._getHandJoint(l,M);u!==null&&(h.matrix.fromArray(u.transform.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=u.radius),h.visible=u!==null}const d=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],p=d.position.distanceTo(g.position),m=.02,x=.005;l.inputState.pinching&&p>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ff)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Nn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Sa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ie{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=_e.workingColorSpace){return this.r=t,this.g=e,this.b=n,_e.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=_e.workingColorSpace){if(t=Sl(t,1),e=le(e,0,1),n=le(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Sa(o,r,t+1/3),this.g=Sa(o,r,t),this.b=Sa(o,r,t-1/3)}return _e.colorSpaceToWorking(this,s),this}setStyle(t,e=Mn){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Mn){const n=ku[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ai(t.r),this.g=Ai(t.g),this.b=Ai(t.b),this}copyLinearToSRGB(t){return this.r=Is(t.r),this.g=Is(t.g),this.b=Is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Mn){return _e.workingToColorSpace(mn.copy(this),t),Math.round(le(mn.r*255,0,255))*65536+Math.round(le(mn.g*255,0,255))*256+Math.round(le(mn.b*255,0,255))}getHexString(t=Mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.workingToColorSpace(mn.copy(this),e);const n=mn.r,s=mn.g,r=mn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const d=(a+o)/2;if(a===o)c=0,l=0;else{const g=o-a;switch(l=d<=.5?g/(o+a):g/(2-o-a),o){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=_e.workingColorSpace){return _e.workingToColorSpace(mn.copy(this),e),t.r=mn.r,t.g=mn.g,t.b=mn.b,t}getStyle(t=Mn){_e.workingToColorSpace(mn.copy(this),t);const e=mn.r,n=mn.g,s=mn.b;return t!==Mn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Oi),this.setHSL(Oi.h+t,Oi.s+e,Oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Oi),t.getHSL(Er);const n=lr(Oi.h,Er.h,e),s=lr(Oi.s,Er.s,e),r=lr(Oi.l,Er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new ie;ie.NAMES=ku;class aa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ie(t),this.density=e}clone(){return new aa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Hu extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const qn=new O,Mi=new O,ya=new O,Si=new O,ys=new O,bs=new O,sc=new O,ba=new O,Ea=new O,Ta=new O,wa=new Ve,Aa=new Ve,Ra=new Ve;class Gn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),qn.subVectors(t,e),s.cross(qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){qn.subVectors(s,e),Mi.subVectors(n,e),ya.subVectors(t,e);const o=qn.dot(qn),a=qn.dot(Mi),c=qn.dot(ya),l=Mi.dot(Mi),d=Mi.dot(ya),g=o*l-a*a;if(g===0)return r.set(0,0,0),null;const p=1/g,m=(l*c-a*d)*p,x=(o*d-a*c)*p;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Si)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Si.x),c.addScaledVector(o,Si.y),c.addScaledVector(a,Si.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return wa.setScalar(0),Aa.setScalar(0),Ra.setScalar(0),wa.fromBufferAttribute(t,e),Aa.fromBufferAttribute(t,n),Ra.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(wa,r.x),o.addScaledVector(Aa,r.y),o.addScaledVector(Ra,r.z),o}static isFrontFacing(t,e,n,s){return qn.subVectors(n,e),Mi.subVectors(t,e),qn.cross(Mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),qn.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Gn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Gn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Gn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Gn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Gn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ys.subVectors(s,n),bs.subVectors(r,n),ba.subVectors(t,n);const c=ys.dot(ba),l=bs.dot(ba);if(c<=0&&l<=0)return e.copy(n);Ea.subVectors(t,s);const d=ys.dot(Ea),g=bs.dot(Ea);if(d>=0&&g<=d)return e.copy(s);const p=c*g-d*l;if(p<=0&&c>=0&&d<=0&&c-d>0)return o=c/(c-d),e.copy(n).addScaledVector(ys,o);Ta.subVectors(t,r);const m=ys.dot(Ta),x=bs.dot(Ta);if(x>=0&&m<=x)return e.copy(r);const M=m*l-c*x;if(M<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(n).addScaledVector(bs,a);const u=d*x-m*g;if(u<=0&&g-d>=0&&m-x>=0)return sc.subVectors(r,s),a=(g-d)/(g-d+(m-x)),e.copy(s).addScaledVector(sc,a);const h=1/(u+M+p);return o=M*h,a=p*h,e.copy(n).addScaledVector(ys,o).addScaledVector(bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class qi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Zn):Zn.fromBufferAttribute(r,o),Zn.applyMatrix4(t.matrixWorld),this.expandByPoint(Zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tr.copy(n.boundingBox)),Tr.applyMatrix4(t.matrixWorld),this.union(Tr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Zn),Zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xs),wr.subVectors(this.max,Xs),Es.subVectors(t.a,Xs),Ts.subVectors(t.b,Xs),ws.subVectors(t.c,Xs),Bi.subVectors(Ts,Es),zi.subVectors(ws,Ts),ns.subVectors(Es,ws);let e=[0,-Bi.z,Bi.y,0,-zi.z,zi.y,0,-ns.z,ns.y,Bi.z,0,-Bi.x,zi.z,0,-zi.x,ns.z,0,-ns.x,-Bi.y,Bi.x,0,-zi.y,zi.x,0,-ns.y,ns.x,0];return!Ca(e,Es,Ts,ws,wr)||(e=[1,0,0,0,1,0,0,0,1],!Ca(e,Es,Ts,ws,wr))?!1:(Ar.crossVectors(Bi,zi),e=[Ar.x,Ar.y,Ar.z],Ca(e,Es,Ts,ws,wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yi=[new O,new O,new O,new O,new O,new O,new O,new O],Zn=new O,Tr=new qi,Es=new O,Ts=new O,ws=new O,Bi=new O,zi=new O,ns=new O,Xs=new O,wr=new O,Ar=new O,is=new O;function Ca(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){is.fromArray(i,r);const a=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),c=t.dot(is),l=e.dot(is),d=n.dot(is);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}const Je=new O,Rr=new Ot;let df=0;class bn extends Di{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:df++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Lu,this.updateRanges=[],this.gpuType=kn,this.version=0,this._normalizationScale=t!==void 0?yl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rr.fromBufferAttribute(this,e),Rr.applyMatrix3(t),this.setXY(e,Rr.x,Rr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix3(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Fu(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Ou(t,this.array)}}class El extends bn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Tl extends bn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class De extends bn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const pf=new qi,Ys=new O,Pa=new O;class Zi{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);const e=Ys.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(Pa)),this.expandByPoint(Ys.copy(t.center).sub(Pa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let mf=0;const On=new xe,Da=new $e,As=new O,Ln=new qi,qs=new qi,an=new O;class en extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=ks(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bh(t)?Tl:El)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ne().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return On.makeRotationFromQuaternion(t),this.applyMatrix4(On),this}rotateX(t){return On.makeRotationX(t),this.applyMatrix4(On),this}rotateY(t){return On.makeRotationY(t),this.applyMatrix4(On),this}rotateZ(t){return On.makeRotationZ(t),this.applyMatrix4(On),this}translate(t,e,n){return On.makeTranslation(t,e,n),this.applyMatrix4(On),this}scale(t,e,n){return On.makeScale(t,e,n),this.applyMatrix4(On),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new De(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(an.addVectors(Ln.min,qs.min),Ln.expandByPoint(an),an.addVectors(Ln.max,qs.max),Ln.expandByPoint(an)):(Ln.expandByPoint(qs.min),Ln.expandByPoint(qs.max))}Ln.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)an.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(an));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)an.fromBufferAttribute(a,l),c&&(As.fromBufferAttribute(t,l),an.add(As)),s=Math.max(s,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new bn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let w=0;w<n.count;w++)a[w]=new O,c[w]=new O;const d=new O,g=new O,p=new O,m=new Ot,x=new Ot,M=new Ot,u=new O,h=new O;function b(w,T,A){l[w]=l[T]=l[A]=1,d.fromBufferAttribute(n,w),g.fromBufferAttribute(n,T),p.fromBufferAttribute(n,A),m.fromBufferAttribute(r,w),x.fromBufferAttribute(r,T),M.fromBufferAttribute(r,A),g.sub(d),p.sub(d),x.sub(m),M.sub(m);const D=1/(x.x*M.y-M.x*x.y);isFinite(D)&&(u.copy(g).multiplyScalar(M.y).addScaledVector(p,-x.y).multiplyScalar(D),h.copy(p).multiplyScalar(x.x).addScaledVector(g,-M.x).multiplyScalar(D),a[w].add(u),a[T].add(u),a[A].add(u),c[w].add(h),c[T].add(h),c[A].add(h))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let w=0,T=E.length;w<T;++w){const A=E[w],D=A.start,U=A.count;for(let I=D,G=D+U;I<G;I+=3)b(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const R=new O,S=new O,_=new O,f=new O;function v(w){_.fromBufferAttribute(s,w),f.copy(_);const T=a[w];R.copy(T),R.sub(_.multiplyScalar(_.dot(T))).normalize(),S.crossVectors(f,T);const D=S.dot(c[w])<0?-1:1;o.setXYZW(w,R.x,R.y,R.z,D)}for(let w=0,T=n.count;w<T;++w)l[w]&&v(w);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new bn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,d=new O,g=new O;if(t)for(let p=0,m=t.count;p<m;p+=3){const x=t.getX(p+0),M=t.getX(p+1),u=t.getX(p+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,u),d.subVectors(o,r),g.subVectors(s,r),d.cross(g),a.fromBufferAttribute(n,x),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,u),a.add(d),c.add(d),l.add(d),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),d.subVectors(o,r),g.subVectors(s,r),d.cross(g),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)an.fromBufferAttribute(t,e),an.normalize(),t.setXYZ(e,an.x,an.y,an.z)}toNonIndexed(){function t(a,c){const l=a.array,d=a.itemSize,g=a.normalized,p=new l.constructor(c.length*d);let m=0,x=0;for(let M=0,u=c.length;M<u;M++){a.isInterleavedBufferAttribute?m=c[M]*a.data.stride+a.offset:m=c[M]*d;for(let h=0;h<d;h++)p[x++]=l[m++]}return new bn(p,d,g)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new en,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let d=0,g=l.length;d<g;d++){const p=l[d],m=t(p,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let g=0,p=l.length;g<p;g++){const m=l[g];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],g=r[l];for(let p=0,m=g.length;p<m;p++)d.push(g[p].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,d=o.length;l<d;l++){const g=o[l];this.addGroup(g.start,g.count,g.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const La=new O,gf=new O,_f=new ne;class ci{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=La.subVectors(n,e).cross(gf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(La),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_f.getNormalMatrix(t),s=this.coplanarPoint(La).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let xf=0;class Ki extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=ks(),this.name="",this.type="Material",this.blending=Ls,this.side=Wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=nl,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=to,this.stencilZFail=to,this.stencilZPass=to,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ie().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new ci().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const bi=new O,Ia=new O,Cr=new O,Pr=new O;class Hs{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ia.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),Pr.copy(this.origin).sub(Ia);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Cr),a=Pr.dot(this.direction),c=-Pr.dot(Cr),l=Pr.lengthSq(),d=Math.abs(1-o*o);let g,p,m,x;if(d>0)if(g=o*c-a,p=o*a-c,x=r*d,g>=0)if(p>=-x)if(p<=x){const M=1/d;g*=M,p*=M,m=g*(g+o*p+2*a)+p*(o*g+p+2*c)+l}else p=r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;else p=-r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;else p<=-x?(g=Math.max(0,-(-o*r+a)),p=g>0?-r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l):p<=x?(g=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(g=Math.max(0,-(o*r+a)),p=g>0?r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l);else p=o>0?-r:r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Ia).addScaledVector(Cr,p),m}intersectSphere(t,e){if(t.radius<0)return null;bi.subVectors(t.center,this.origin);const n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,d=1/this.direction.y,g=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),d>=0?(r=(t.min.y-p.y)*d,o=(t.max.y-p.y)*d):(r=(t.max.y-p.y)*d,o=(t.min.y-p.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(a=(t.min.z-p.z)*g,c=(t.max.z-p.z)*g):(a=(t.max.z-p.z)*g,c=(t.min.z-p.z)*g),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,d=a.z,g=t.x-o.x,p=t.y-o.y,m=t.z-o.z,x=e.x-o.x,M=e.y-o.y,u=e.z-o.z,h=n.x-o.x,b=n.y-o.y,E=n.z-o.z,R=Math.abs(c),S=Math.abs(l),_=Math.abs(d);let f,v,w,T,A,D,U,I,G,H,W,st;if(R>=S&&R>=_?(w=c,D=g,G=x,st=h,c>=0?(f=l,v=d,T=p,A=m,U=M,I=u,H=b,W=E):(f=d,v=l,T=m,A=p,U=u,I=M,H=E,W=b)):S>=_?(w=l,D=p,G=M,st=b,l>=0?(f=d,v=c,T=m,A=g,U=u,I=x,H=E,W=h):(f=c,v=d,T=g,A=m,U=x,I=u,H=h,W=E)):(w=d,D=m,G=u,st=E,d>=0?(f=c,v=l,T=g,A=p,U=x,I=M,H=h,W=b):(f=l,v=c,T=p,A=g,U=M,I=x,H=b,W=h)),w===0)return null;const J=f/w,nt=v/w,ut=1/w,mt=T-J*D,Pt=A-nt*D,$=U-J*G,pt=I-nt*G,bt=H-J*st,Nt=W-nt*st,wt=bt*pt-Nt*$,Wt=mt*Nt-Pt*bt,at=$*Pt-pt*mt;if(s){if(wt<0||Wt<0||at<0)return null}else if((wt<0||Wt<0||at<0)&&(wt>0||Wt>0||at>0))return null;const At=wt+Wt+at;if(At===0)return null;const ce=ut*(wt*D+Wt*G+at*st);return(At>0?ce<0:ce>0)?null:this.at(ce/At,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ui extends Ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const rc=new xe,ss=new Hs,Dr=new Zi,oc=new O,Lr=new O,Ir=new O,Nr=new O,Na=new O,Ur=new O,ac=new O,Fr=new O;class ye extends $e{constructor(t=new en,e=new ui){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ur.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=a[c],g=r[c];d!==0&&(Na.fromBufferAttribute(g,t),o?Ur.addScaledVector(Na,d):Ur.addScaledVector(Na.sub(e),d))}e.add(Ur)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(r),ss.copy(t.ray).recast(t.near),!(Dr.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Dr,oc)===null||ss.origin.distanceToSquared(oc)>(t.far-t.near)**2))&&(rc.copy(r).invert(),ss.copy(t.ray).applyMatrix4(rc),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ss)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,g=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,M=p.length;x<M;x++){const u=p[x],h=o[u.materialIndex],b=Math.max(u.start,m.start),E=Math.min(a.count,Math.min(u.start+u.count,m.start+m.count));for(let R=b,S=E;R<S;R+=3){const _=a.getX(R),f=a.getX(R+1),v=a.getX(R+2);s=Or(this,h,t,n,l,d,g,_,f,v),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(a.count,m.start+m.count);for(let u=x,h=M;u<h;u+=3){const b=a.getX(u),E=a.getX(u+1),R=a.getX(u+2);s=Or(this,o,t,n,l,d,g,b,E,R),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,M=p.length;x<M;x++){const u=p[x],h=o[u.materialIndex],b=Math.max(u.start,m.start),E=Math.min(c.count,Math.min(u.start+u.count,m.start+m.count));for(let R=b,S=E;R<S;R+=3){const _=R,f=R+1,v=R+2;s=Or(this,h,t,n,l,d,g,_,f,v),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let u=x,h=M;u<h;u+=3){const b=u,E=u+1,R=u+2;s=Or(this,o,t,n,l,d,g,b,E,R),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}}function vf(i,t,e,n,s,r,o,a){let c;if(t.side===yn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Wi,a),c===null)return null;Fr.copy(a),Fr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Fr);return l<e.near||l>e.far?null:{distance:l,point:Fr.clone(),object:i}}function Or(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Lr),i.getVertexPosition(c,Ir),i.getVertexPosition(l,Nr);const d=vf(i,t,e,n,Lr,Ir,Nr,ac);if(d){const g=new O;Gn.getBarycoord(ac,Lr,Ir,Nr,g),s&&(d.uv=Gn.getInterpolatedAttribute(s,a,c,l,g,new Ot)),r&&(d.uv1=Gn.getInterpolatedAttribute(r,a,c,l,g,new Ot)),o&&(d.normal=Gn.getInterpolatedAttribute(o,a,c,l,g,new O),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new O,materialIndex:0};Gn.getNormal(Lr,Ir,Nr,p.normal),d.face=p,d.barycoord=g}return d}class wl extends fn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ln,d=ln,g,p){super(null,o,a,c,l,d,s,r,g,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Za extends bn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Rs=new xe,lc=new xe,Br=[],cc=new qi,Mf=new xe,Zs=new ye,Ks=new Zi;class Al extends ye{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Za(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Mf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new qi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),cc.copy(t.boundingBox).applyMatrix4(Rs),this.boundingBox.union(cc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Rs),Ks.copy(t.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(Ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Zs.geometry=this.geometry,Zs.material=this.material,Zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ks.copy(this.boundingSphere),Ks.applyMatrix4(n),t.ray.intersectsSphere(Ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Rs),lc.multiplyMatrices(n,Rs),Zs.matrixWorld=lc,Zs.raycast(t,Br);for(let o=0,a=Br.length;o<a;o++){const c=Br[o];c.instanceId=r,c.object=this,e.push(c)}Br.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Za(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new wl(new Float32Array(s*this.count),s,this.count,ea,kn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const rs=new Zi,Sf=new Ot(.5,.5),zr=new O;class Bs{constructor(t=new ci,e=new ci,n=new ci,s=new ci,r=new ci,o=new ci){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Hn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],g=r[5],p=r[6],m=r[7],x=r[8],M=r[9],u=r[10],h=r[11],b=r[12],E=r[13],R=r[14],S=r[15];if(s[0].setComponents(l-o,m-d,h-x,S-b).normalize(),s[1].setComponents(l+o,m+d,h+x,S+b).normalize(),s[2].setComponents(l+a,m+g,h+M,S+E).normalize(),s[3].setComponents(l-a,m-g,h-M,S-E).normalize(),n)s[4].setComponents(c,p,u,R).normalize(),s[5].setComponents(l-c,m-p,h-u,S-R).normalize();else if(s[4].setComponents(l-c,m-p,h-u,S-R).normalize(),e===Hn)s[5].setComponents(l+c,m+p,h+u,S+R).normalize();else if(e===Os)s[5].setComponents(c,p,u,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(t){rs.center.set(0,0,0);const e=Sf.distanceTo(t.center);return rs.radius=.7071067811865476+e,rs.applyMatrix4(t.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(zr.x=s.normal.x>0?t.max.x:t.min.x,zr.y=s.normal.y>0?t.max.y:t.min.y,zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const uc=new xe;class la{constructor(){this.coordinateSystem=Hn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];uc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Bs),n[s].setFromProjectionMatrix(uc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Bs),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new la().copy(this)}}class Rl extends Ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Xo=new O,Yo=new O,hc=new xe,Js=new Hs,Gr=new Zi,Ua=new O,fc=new O;class Vu extends $e{constructor(t=new en,e=new Rl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Xo.fromBufferAttribute(e,s-1),Yo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Xo.distanceTo(Yo);t.setAttribute("lineDistance",new De(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(s),Gr.radius+=r,t.ray.intersectsSphere(Gr)===!1)return;hc.copy(s).invert(),Js.copy(t.ray).applyMatrix4(hc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=n.index,p=n.attributes.position;if(d!==null){const m=Math.max(0,o.start),x=Math.min(d.count,o.start+o.count);for(let M=m,u=x-1;M<u;M+=l){const h=d.getX(M),b=d.getX(M+1),E=kr(this,t,Js,c,h,b,M);E&&e.push(E)}if(this.isLineLoop){const M=d.getX(x-1),u=d.getX(m),h=kr(this,t,Js,c,M,u,x-1);h&&e.push(h)}}else{const m=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let M=m,u=x-1;M<u;M+=l){const h=kr(this,t,Js,c,M,M+1,M);h&&e.push(h)}if(this.isLineLoop){const M=kr(this,t,Js,c,x-1,m,x-1);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function kr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Xo.fromBufferAttribute(a,s),Yo.fromBufferAttribute(a,r),e.distanceSqToSegment(Xo,Yo,Ua,fc)>n)return;Ua.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ua);if(!(l<t.near||l>t.far))return{distance:l,point:fc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const dc=new O,pc=new O;class Wu extends Vu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)dc.fromBufferAttribute(e,s),pc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+dc.distanceTo(pc);t.setAttribute("lineDistance",new De(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cl extends Ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const mc=new xe,Ka=new Hs,Hr=new Zi,Vr=new O;class Xu extends $e{constructor(t=new en,e=new Cl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),Hr.radius+=r,t.ray.intersectsSphere(Hr)===!1)return;mc.copy(s).invert(),Ka.copy(t.ray).applyMatrix4(mc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,g=n.attributes.position;if(l!==null){const p=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let x=p,M=m;x<M;x++){const u=l.getX(x);Vr.fromBufferAttribute(g,u),gc(Vr,u,c,s,t,e,this)}}else{const p=Math.max(0,o.start),m=Math.min(g.count,o.start+o.count);for(let x=p,M=m;x<M;x++)Vr.fromBufferAttribute(g,x),gc(Vr,x,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function gc(i,t,e,n,s,r,o){const a=Ka.distanceSqToPoint(i);if(a<e){const c=new O;Ka.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Pl extends fn{constructor(t=[],e=hs,n,s,r,o,a,c,l,d){super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ja extends fn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ds extends fn{constructor(t,e,n=Qn,s,r,o,a=ln,c=ln,l,d=Ci,g=1){if(d!==Ci&&d!==wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:g};super(p,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ra(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Dl extends ds{constructor(t,e=Qn,n=hs,s,r,o=ln,a=ln,c,l=Ci){const d={width:t,height:t,depth:1},g=[d,d,d,d,d,d];super(t,t,e,n,s,r,o,a,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Ll extends fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class tn extends en{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],d=[],g=[];let p=0,m=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(g,2));function x(M,u,h,b,E,R,S,_,f,v,w){const T=R/f,A=S/v,D=R/2,U=S/2,I=_/2,G=f+1,H=v+1;let W=0,st=0;const J=new O;for(let nt=0;nt<H;nt++){const ut=nt*A-U;for(let mt=0;mt<G;mt++){const Pt=mt*T-D;J[M]=Pt*b,J[u]=ut*E,J[h]=I,l.push(J.x,J.y,J.z),J[M]=0,J[u]=0,J[h]=_>0?1:-1,d.push(J.x,J.y,J.z),g.push(mt/f),g.push(1-nt/v),W+=1}}for(let nt=0;nt<v;nt++)for(let ut=0;ut<f;ut++){const mt=p+ut+G*nt,Pt=p+ut+G*(nt+1),$=p+(ut+1)+G*(nt+1),pt=p+(ut+1)+G*nt;c.push(mt,Pt,pt),c.push(Pt,$,pt),st+=6}a.addGroup(m,st,w),m+=st,p+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Vn extends en{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],g=[],p=[],m=[];let x=0;const M=[],u=n/2;let h=0;b(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new De(g,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(m,2));function b(){const R=new O,S=new O;let _=0;const f=(e-t)/n;for(let v=0;v<=r;v++){const w=[],T=v/r,A=T*(e-t)+t;for(let D=0;D<=s;D++){const U=D/s,I=U*c+a,G=Math.sin(I),H=Math.cos(I);S.x=A*G,S.y=-T*n+u,S.z=A*H,g.push(S.x,S.y,S.z),R.set(G,f,H).normalize(),p.push(R.x,R.y,R.z),m.push(U,1-T),w.push(x++)}M.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){const T=M[w][v],A=M[w+1][v],D=M[w+1][v+1],U=M[w][v+1];(t>0||w!==0)&&(d.push(T,A,U),_+=3),(e>0||w!==r-1)&&(d.push(A,D,U),_+=3)}l.addGroup(h,_,0),h+=_}function E(R){const S=x,_=new Ot,f=new O;let v=0;const w=R===!0?t:e,T=R===!0?1:-1;for(let D=1;D<=s;D++)g.push(0,u*T,0),p.push(0,T,0),m.push(.5,.5),x++;const A=x;for(let D=0;D<=s;D++){const I=D/s*c+a,G=Math.cos(I),H=Math.sin(I);f.x=w*H,f.y=u*T,f.z=w*G,g.push(f.x,f.y,f.z),p.push(0,T,0),_.x=G*.5+.5,_.y=H*.5*T+.5,m.push(_.x,_.y),x++}for(let D=0;D<s;D++){const U=S+D,I=A+D;R===!0?d.push(I,I+1,U):d.push(I+1,I,U),v+=3}l.addGroup(h,v,R===!0?1:2),h+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pi extends Vn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ca extends en{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),d(),this.setAttribute("position",new De(r,3)),this.setAttribute("normal",new De(r.slice(),3)),this.setAttribute("uv",new De(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const E=new O,R=new O,S=new O;for(let _=0;_<e.length;_+=3)m(e[_+0],E),m(e[_+1],R),m(e[_+2],S),c(E,R,S,b)}function c(b,E,R,S){const _=S+1,f=[];for(let v=0;v<=_;v++){f[v]=[];const w=b.clone().lerp(R,v/_),T=E.clone().lerp(R,v/_),A=_-v;for(let D=0;D<=A;D++)D===0&&v===_?f[v][D]=w:f[v][D]=w.clone().lerp(T,D/A)}for(let v=0;v<_;v++)for(let w=0;w<2*(_-v)-1;w++){const T=Math.floor(w/2);w%2===0?(p(f[v][T+1]),p(f[v+1][T]),p(f[v][T])):(p(f[v][T+1]),p(f[v+1][T+1]),p(f[v+1][T]))}}function l(b){const E=new O;for(let R=0;R<r.length;R+=3)E.x=r[R+0],E.y=r[R+1],E.z=r[R+2],E.normalize().multiplyScalar(b),r[R+0]=E.x,r[R+1]=E.y,r[R+2]=E.z}function d(){const b=new O;for(let E=0;E<r.length;E+=3){b.x=r[E+0],b.y=r[E+1],b.z=r[E+2];const R=u(b)/2/Math.PI+.5,S=h(b)/Math.PI+.5;o.push(R,1-S)}x(),g()}function g(){for(let b=0;b<o.length;b+=6){const E=o[b+0],R=o[b+2],S=o[b+4],_=Math.max(E,R,S),f=Math.min(E,R,S);_>.9&&f<.1&&(E<.2&&(o[b+0]+=1),R<.2&&(o[b+2]+=1),S<.2&&(o[b+4]+=1))}}function p(b){r.push(b.x,b.y,b.z)}function m(b,E){const R=b*3;E.x=t[R+0],E.y=t[R+1],E.z=t[R+2]}function x(){const b=new O,E=new O,R=new O,S=new O,_=new Ot,f=new Ot,v=new Ot;for(let w=0,T=0;w<r.length;w+=9,T+=6){b.set(r[w+0],r[w+1],r[w+2]),E.set(r[w+3],r[w+4],r[w+5]),R.set(r[w+6],r[w+7],r[w+8]),_.set(o[T+0],o[T+1]),f.set(o[T+2],o[T+3]),v.set(o[T+4],o[T+5]),S.copy(b).add(E).add(R).divideScalar(3);const A=u(S);M(_,T+0,b,A),M(f,T+2,E,A),M(v,T+4,R,A)}}function M(b,E,R,S){S<0&&b.x===1&&(o[E]=b.x-1),R.x===0&&R.z===0&&(o[E]=S/2/Math.PI+.5)}function u(b){return Math.atan2(b.z,-b.x)}function h(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ca(t.vertices,t.indices,t.radius,t.detail)}}class mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const d=n[s],p=n[s+1]-d,m=(o-d)/p;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Ot:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new O,s=[],r=[],o=[],a=new O,c=new xe;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const d=Math.abs(s[0].x),g=Math.abs(s[0].y),p=Math.abs(s[0].z);d<=l&&(l=d,n.set(1,0,0)),g<=l&&(l=g,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(s[m-1],s[m]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(le(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(c.makeRotationAxis(a,x))}o[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(le(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(m=-m);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],m*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class Il extends mi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),g=Math.sin(this.aRotation),p=c-this.aX,m=l-this.aY;c=p*d-m*g+this.aX,l=p*g+m*d+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yu extends Il{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Nl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,d,g){let p=(o-r)/l-(a-r)/(l+d)+(a-o)/d,m=(a-o)/d-(c-o)/(d+g)+(c-a)/g;p*=d,m*=d,s(o,a,p,m)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const _c=new O,xc=new O,Fa=new Nl,Oa=new Nl,Ba=new Nl;class qu extends mi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,d;this.closed||a>0?l=s[(a-1)%r]:(xc.subVectors(s[0],s[1]).add(s[0]),l=xc);const g=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(_c.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=_c),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(g),m),M=Math.pow(g.distanceToSquared(p),m),u=Math.pow(p.distanceToSquared(d),m);M<1e-4&&(M=1),x<1e-4&&(x=M),u<1e-4&&(u=M),Fa.initNonuniformCatmullRom(l.x,g.x,p.x,d.x,x,M,u),Oa.initNonuniformCatmullRom(l.y,g.y,p.y,d.y,x,M,u),Ba.initNonuniformCatmullRom(l.z,g.z,p.z,d.z,x,M,u)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(l.x,g.x,p.x,d.x,this.tension),Oa.initCatmullRom(l.y,g.y,p.y,d.y,this.tension),Ba.initCatmullRom(l.z,g.z,p.z,d.z,this.tension));return n.set(Fa.calc(c),Oa.calc(c),Ba.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function yf(i,t){const e=1-i;return e*e*t}function bf(i,t){return 2*(1-i)*i*t}function Ef(i,t){return i*i*t}function cr(i,t,e,n){return yf(i,t)+bf(i,e)+Ef(i,n)}function Tf(i,t){const e=1-i;return e*e*e*t}function wf(i,t){const e=1-i;return 3*e*e*i*t}function Af(i,t){return 3*(1-i)*i*i*t}function Rf(i,t){return i*i*i*t}function ur(i,t,e,n,s){return Tf(i,t)+wf(i,e)+Af(i,n)+Rf(i,s)}class Zu extends mi{constructor(t=new Ot,e=new Ot,n=new Ot,s=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ot){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ur(t,s.x,r.x,o.x,a.x),ur(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ku extends mi{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ur(t,s.x,r.x,o.x,a.x),ur(t,s.y,r.y,o.y,a.y),ur(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ju extends mi{constructor(t=new Ot,e=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $u extends mi{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qu extends mi{constructor(t=new Ot,e=new Ot,n=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ot){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(t,s.x,r.x,o.x),cr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ul extends mi{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(cr(t,s.x,r.x,o.x),cr(t,s.y,r.y,o.y),cr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ju extends mi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ot){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],d=s[o>s.length-2?s.length-1:o+1],g=s[o>s.length-3?s.length-1:o+2];return n.set(vc(a,c.x,l.x,d.x,g.x),vc(a,c.y,l.y,d.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ot().fromArray(s))}return this}}var Cf=Object.freeze({__proto__:null,ArcCurve:Yu,CatmullRomCurve3:qu,CubicBezierCurve:Zu,CubicBezierCurve3:Ku,EllipseCurve:Il,LineCurve:Ju,LineCurve3:$u,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:Ul,SplineCurve:ju});class ua extends ca{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ua(t.radius,t.detail)}}class Pi extends en{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,g=t/a,p=e/c,m=[],x=[],M=[],u=[];for(let h=0;h<d;h++){const b=h*p-o;for(let E=0;E<l;E++){const R=E*g-r;x.push(R,-b,0),M.push(0,0,1),u.push(E/a),u.push(1-h/c)}}for(let h=0;h<c;h++)for(let b=0;b<a;b++){const E=b+l*h,R=b+l*(h+1),S=b+1+l*(h+1),_=b+1+l*h;m.push(E,R,_),m.push(R,S,_)}this.setIndex(m),this.setAttribute("position",new De(x,3)),this.setAttribute("normal",new De(M,3)),this.setAttribute("uv",new De(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pi(t.width,t.height,t.widthSegments,t.heightSegments)}}class _r extends en{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],d=[];let g=t;const p=(e-t)/s,m=new O,x=new Ot;for(let M=0;M<=s;M++){for(let u=0;u<=n;u++){const h=r+u/n*o;m.x=g*Math.cos(h),m.y=g*Math.sin(h),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/e+1)/2,x.y=(m.y/e+1)/2,d.push(x.x,x.y)}g+=p}for(let M=0;M<s;M++){const u=M*(n+1);for(let h=0;h<n;h++){const b=h+u,E=b,R=b+n+1,S=b+n+2,_=b+1;a.push(E,R,_),a.push(R,S,_)}}this.setIndex(a),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(l,3)),this.setAttribute("uv",new De(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Vi extends en{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const d=[],g=new O,p=new O,m=[],x=[],M=[],u=[];for(let h=0;h<=n;h++){const b=[],E=h/n,R=o+E*a,S=t*Math.cos(R),_=Math.sqrt(t*t-S*S);let f=0;h===0&&o===0?f=.5/e:h===n&&c===Math.PI&&(f=-.5/e);for(let v=0;v<=e;v++){const w=v/e,T=s+w*r;g.x=-_*Math.cos(T),g.y=S,g.z=_*Math.sin(T),x.push(g.x,g.y,g.z),p.copy(g).normalize(),M.push(p.x,p.y,p.z),u.push(w+f,1-E),b.push(l++)}d.push(b)}for(let h=0;h<n;h++)for(let b=0;b<e;b++){const E=d[h][b+1],R=d[h][b],S=d[h+1][b],_=d[h+1][b+1];(h!==0||o>0)&&m.push(E,R,_),(h!==n-1||c<Math.PI)&&m.push(R,S,_)}this.setIndex(m),this.setAttribute("position",new De(x,3)),this.setAttribute("normal",new De(M,3)),this.setAttribute("uv",new De(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ri extends en{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],g=[],p=new O,m=new O,x=new O;for(let M=0;M<=n;M++){const u=o+M/n*a;for(let h=0;h<=s;h++){const b=h/s*r;m.x=(t+e*Math.cos(u))*Math.cos(b),m.y=(t+e*Math.cos(u))*Math.sin(b),m.z=e*Math.sin(u),l.push(m.x,m.y,m.z),p.x=t*Math.cos(b),p.y=t*Math.sin(b),x.subVectors(m,p).normalize(),d.push(x.x,x.y,x.z),g.push(h/s),g.push(M/n)}}for(let M=1;M<=n;M++)for(let u=1;u<=s;u++){const h=(s+1)*M+u-1,b=(s+1)*(M-1)+u-1,E=(s+1)*(M-1)+u,R=(s+1)*M+u;c.push(h,b,R),c.push(b,E,R)}this.setIndex(c),this.setAttribute("position",new De(l,3)),this.setAttribute("normal",new De(d,3)),this.setAttribute("uv",new De(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Fl extends en{constructor(t=new Ul(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new O,c=new O,l=new Ot;let d=new O;const g=[],p=[],m=[],x=[];M(),this.setIndex(x),this.setAttribute("position",new De(g,3)),this.setAttribute("normal",new De(p,3)),this.setAttribute("uv",new De(m,2));function M(){for(let E=0;E<e;E++)u(E);u(r===!1?e:0),b(),h()}function u(E){d=t.getPointAt(E/e,d);const R=o.normals[E],S=o.binormals[E];for(let _=0;_<=s;_++){const f=_/s*Math.PI*2,v=Math.sin(f),w=-Math.cos(f);c.x=w*R.x+v*S.x,c.y=w*R.y+v*S.y,c.z=w*R.z+v*S.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=d.x+n*c.x,a.y=d.y+n*c.y,a.z=d.z+n*c.z,g.push(a.x,a.y,a.z)}}function h(){for(let E=1;E<=e;E++)for(let R=1;R<=s;R++){const S=(s+1)*(E-1)+(R-1),_=(s+1)*E+(R-1),f=(s+1)*E+R,v=(s+1)*(E-1)+R;x.push(S,_,v),x.push(_,f,v)}}function b(){for(let E=0;E<=e;E++)for(let R=0;R<=s;R++)l.x=E/e,l.y=R/s,m.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Fl(new Cf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function zs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Mc(s))s.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Mc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function vn(i){const t={};for(let e=0;e<i.length;e++){const n=zs(i[e]);for(const s in n)t[s]=n[s]}return t}function Mc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Pf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function th(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const eh={clone:zs,merge:vn};var Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yi extends Ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zs(t.uniforms),this.uniformsGroups=Pf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new ie().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ve().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ne().fromArray(s.value);break;case"m4":this.uniforms[n].value=new xe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class nh extends Yi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gs extends Ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vo,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ih extends Ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sh extends Ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ol extends $e{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class rh extends Ol{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const za=new xe,Sc=new O,yc=new O;class oh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bs,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Sc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Sc),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){za.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(za,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Os||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(za)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Wr=new O,Xr=new Pn,ri=new O;class Bl extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Wr,Xr,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,ri.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Wr,Xr,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wr,Xr,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new O,bc=new Ot,Ec=new Ot;class zn extends Bl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=gr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z)}getViewSize(t,e){return this.getViewBounds(t,bc,Ec),e.subVectors(Ec,bc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ar*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class zl extends Bl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class If extends oh{constructor(){super(new zl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $a extends Ol{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new If}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Cs=-90,Ps=1;class qo extends $e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zn(Cs,Ps,t,e);s.layers=this.layers,this.add(s);const r=new zn(Cs,Ps,t,e);r.layers=this.layers,this.add(r);const o=new zn(Cs,Ps,t,e);o.layers=this.layers,this.add(o);const a=new zn(Cs,Ps,t,e);a.layers=this.layers,this.add(a);const c=new zn(Cs,Ps,t,e);c.layers=this.layers,this.add(c);const l=new zn(Cs,Ps,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,d]=this.children,g=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let u=!1;t.isWebGLRenderer===!0?u=t.state.buffers.depth.getReversed():u=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=M,t.setRenderTarget(n,5,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(g,p,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class ah extends zn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const Tc=new xe;class lh{constructor(t,e,n=0,s=1/0){this.ray=new Hs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new oa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tc),this}intersectObject(t,e=!0,n=[]){return Qa(t,this,n,e),n.sort(wc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Qa(t[s],this,n,e);return n.sort(wc),n}}function wc(i,t){return i.distance-t.distance}function Qa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Qa(r[o],t,e,!0)}}class ja{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=le(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ch extends Di{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Ac(i,t,e,n){const s=Nf(n);switch(e){case ml:return i*t;case ea:return i*t/s.components*s.byteLength;case na:return i*t/s.components*s.byteLength;case Xi:return i*t*2/s.components*s.byteLength;case ia:return i*t*2/s.components*s.byteLength;case gl:return i*t*3/s.components*s.byteLength;case Jn:return i*t*4/s.components*s.byteLength;case sa:return i*t*4/s.components*s.byteLength;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:case go:return Math.max(i,16)*Math.max(t,8)/4;case fo:case mo:return Math.max(i,8)*Math.max(t,8)/2;case _o:case xo:case Mo:case So:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vo:case fr:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case To:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Po:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Uo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Oo:case Bo:case zo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Go:case ko:return Math.ceil(i/4)*Math.ceil(t/4)*8;case dr:case Ho:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nf(i){switch(i){case Cn:case hl:return{byteLength:1,components:1};case Fs:case fl:case jn:return{byteLength:2,components:1};case jo:case ta:return{byteLength:2,components:4};case Qn:case Qo:case kn:return{byteLength:4,components:1};case dl:case pl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);function uh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Uf(i){const t=new WeakMap;function e(a,c){const l=a.array,d=a.usage,g=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,d),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:g}}function n(a,c,l){const d=c.array,g=c.updateRanges;if(i.bindBuffer(l,a),g.length===0)i.bufferSubData(l,0,d);else{g.sort((m,x)=>m.start-x.start);let p=0;for(let m=1;m<g.length;m++){const x=g[p],M=g[m];M.start<=x.start+x.count+1?x.count=Math.max(x.count,M.start+M.count-x.start):(++p,g[p]=M)}g.length=p+1;for(let m=0,x=g.length;m<x;m++){const M=g[m];i.bufferSubData(l,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ff=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Of=`#ifdef USE_ALPHAHASH
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
#endif`,Bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hf=`#ifdef USE_AOMAP
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
#endif`,Vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wf=`#ifdef USE_BATCHING
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
#endif`,Xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
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
#endif`,Jf=`#ifdef USE_BUMPMAP
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
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ed=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,rd=`#define PI 3.141592653589793
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
} // validated`,od=`vec3 transformedNormal = objectNormal;
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
#endif`,ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",fd=`vec4 LinearTransferOETF( in vec4 value ) {
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
#endif`,pd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,md=`#ifdef USE_ENVMAP
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
#endif`,gd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
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
#endif`,xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Md=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yd=`#ifdef USE_GRADIENTMAP
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
}`,bd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ed=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wd=`uniform bool receiveShadow;
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
#endif`,Rd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ld=`PhysicalMaterial material;
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
#endif`,Id=`uniform sampler2D dfgLUT;
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
}`,Nd=`
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
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Od=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xd=`#if defined( USE_POINTS_UV )
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
#endif`,Yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Jd=`#ifdef USE_MORPHNORMALS
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
#endif`,Qd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
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
#endif`,rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,up=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mp=`float getShadowMask() {
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
}`,Sp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yp=`#ifdef USE_SKINNING
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
#endif`,bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ep=`#ifdef USE_SKINNING
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
#endif`,Tp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cp=`#ifdef USE_TRANSMISSION
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
#endif`,Pp=`#ifdef USE_TRANSMISSION
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
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Up=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fp=`uniform sampler2D t2D;
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
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`uniform float backgroundBlurriness;
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
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`#include <common>
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
}`,Hp=`#if DEPTH_PACKING == 3200
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
}`,Vp=`#define DISTANCE
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
}`,Wp=`#define DISTANCE
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`uniform float scale;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,Jp=`uniform vec3 diffuse;
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
}`,$p=`#define LAMBERT
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
}`,Qp=`#define LAMBERT
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
}`,jp=`#define MATCAP
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
}`,tm=`#define MATCAP
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
}`,em=`#define NORMAL
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
}`,nm=`#define NORMAL
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
}`,im=`#define PHONG
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
}`,sm=`#define PHONG
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
}`,rm=`#define STANDARD
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
}`,om=`#define STANDARD
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
}`,am=`#define TOON
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
}`,lm=`#define TOON
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
}`,cm=`uniform float size;
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
}`,um=`uniform vec3 diffuse;
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
}`,hm=`#include <common>
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
}`,fm=`uniform vec3 color;
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
}`,dm=`uniform float rotation;
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
}`,pm=`uniform vec3 diffuse;
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
}`,re={alphahash_fragment:Ff,alphahash_pars_fragment:Of,alphamap_fragment:Bf,alphamap_pars_fragment:zf,alphatest_fragment:Gf,alphatest_pars_fragment:kf,aomap_fragment:Hf,aomap_pars_fragment:Vf,batching_pars_vertex:Wf,batching_vertex:Xf,begin_vertex:Yf,beginnormal_vertex:qf,bsdfs:Zf,iridescence_fragment:Kf,bumpmap_pars_fragment:Jf,clipping_planes_fragment:$f,clipping_planes_pars_fragment:Qf,clipping_planes_pars_vertex:jf,clipping_planes_vertex:td,color_fragment:ed,color_pars_fragment:nd,color_pars_vertex:id,color_vertex:sd,common:rd,defaultnormal_vertex:od,displacementmap_pars_vertex:ad,displacementmap_vertex:ld,emissivemap_fragment:cd,emissivemap_pars_fragment:ud,colorspace_fragment:hd,colorspace_pars_fragment:fd,envmap_fragment:dd,envmap_common_pars_fragment:pd,envmap_pars_fragment:md,envmap_pars_vertex:gd,envmap_physical_pars_fragment:Ad,envmap_vertex:_d,fog_vertex:xd,fog_pars_vertex:vd,fog_fragment:Md,fog_pars_fragment:Sd,gradientmap_pars_fragment:yd,lightmap_pars_fragment:bd,lights_lambert_fragment:Ed,lights_lambert_pars_fragment:Td,lights_pars_begin:wd,lights_toon_fragment:Rd,lights_toon_pars_fragment:Cd,lights_phong_fragment:Pd,lights_phong_pars_fragment:Dd,lights_physical_fragment:Ld,lights_physical_pars_fragment:Id,lights_fragment_begin:Nd,lights_fragment_maps:Ud,lights_fragment_end:Fd,lightprobes_pars_fragment:Od,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:zd,logdepthbuf_pars_vertex:Gd,logdepthbuf_vertex:kd,map_fragment:Hd,map_pars_fragment:Vd,map_particle_fragment:Wd,map_particle_pars_fragment:Xd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:qd,morphinstance_vertex:Zd,morphcolor_vertex:Kd,morphnormal_vertex:Jd,morphtarget_pars_vertex:$d,morphtarget_vertex:Qd,normal_fragment_begin:jd,normal_fragment_maps:tp,normal_pars_fragment:ep,normal_pars_vertex:np,normal_vertex:ip,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:rp,clearcoat_normal_fragment_maps:op,clearcoat_pars_fragment:ap,iridescence_pars_fragment:lp,opaque_fragment:cp,packing:up,premultiplied_alpha_fragment:hp,project_vertex:fp,dithering_fragment:dp,dithering_pars_fragment:pp,roughnessmap_fragment:mp,roughnessmap_pars_fragment:gp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:xp,shadowmap_vertex:vp,shadowmask_pars_fragment:Mp,skinbase_vertex:Sp,skinning_pars_vertex:yp,skinning_vertex:bp,skinnormal_vertex:Ep,specularmap_fragment:Tp,specularmap_pars_fragment:wp,tonemapping_fragment:Ap,tonemapping_pars_fragment:Rp,transmission_fragment:Cp,transmission_pars_fragment:Pp,uv_pars_fragment:Dp,uv_pars_vertex:Lp,uv_vertex:Ip,worldpos_vertex:Np,background_vert:Up,background_frag:Fp,backgroundCube_vert:Op,backgroundCube_frag:Bp,cube_vert:zp,cube_frag:Gp,depth_vert:kp,depth_frag:Hp,distance_vert:Vp,distance_frag:Wp,equirect_vert:Xp,equirect_frag:Yp,linedashed_vert:qp,linedashed_frag:Zp,meshbasic_vert:Kp,meshbasic_frag:Jp,meshlambert_vert:$p,meshlambert_frag:Qp,meshmatcap_vert:jp,meshmatcap_frag:tm,meshnormal_vert:em,meshnormal_frag:nm,meshphong_vert:im,meshphong_frag:sm,meshphysical_vert:rm,meshphysical_frag:om,meshtoon_vert:am,meshtoon_frag:lm,points_vert:cm,points_frag:um,shadow_vert:hm,shadow_frag:fm,sprite_vert:dm,sprite_frag:pm},Dt={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},Kn={basic:{uniforms:vn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:vn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:vn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:vn([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:vn([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new ie(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:vn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:vn([Dt.points,Dt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:vn([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:vn([Dt.common,Dt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:vn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:vn([Dt.sprite,Dt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:vn([Dt.common,Dt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:vn([Dt.lights,Dt.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};Kn.physical={uniforms:vn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ne},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};const Yr={r:0,b:0,g:0},mm=new xe,hh=new ne;hh.set(-1,0,0,0,1,0,0,0,1);function gm(i,t,e,n,s,r){const o=new ie(0);let a=s===!0?0:1,c,l,d=null,g=0,p=null;function m(b){let E=b.isScene===!0?b.background:null;if(E&&E.isTexture){const R=b.backgroundBlurriness>0;E=t.get(E,R)}return E}function x(b){let E=!1;const R=m(b);R===null?u(o,a):R&&R.isColor&&(u(R,1),E=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(b,E){const R=m(E);R&&R.isCubeTexture?(l===void 0&&(l=new ye(new tn(1,1,1),new Yi({name:"BackgroundCubeMaterial",uniforms:zs(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,_,f){this.matrixWorld.copyPosition(f.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=R,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(mm.makeRotationFromEuler(E.backgroundRotation)).transpose(),R.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hh),l.material.toneMapped=_e.getTransfer(R.colorSpace)!==Pe,(d!==R||g!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=R,g=R.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new ye(new Pi(2,2),new Yi({name:"BackgroundMaterial",uniforms:zs(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=_e.getTransfer(R.colorSpace)!==Pe,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||g!==R.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,d=R,g=R.version,p=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function u(b,E){b.getRGB(Yr,th(i)),e.buffers.color.setClear(Yr.r,Yr.g,Yr.b,E,r)}function h(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),a=E,u(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,u(o,a)},render:x,addToRenderList:M,dispose:h}}function _m(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(A,D,U,I,G){let H=!1;const W=g(A,I,U,D);r!==W&&(r=W,l(r.object)),H=m(A,I,U,G),H&&x(A,I,U,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,R(A,D,U,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function d(A){return i.deleteVertexArray(A)}function g(A,D,U,I){const G=I.wireframe===!0;let H=n[D.id];H===void 0&&(H={},n[D.id]=H);const W=A.isInstancedMesh===!0?A.id:0;let st=H[W];st===void 0&&(st={},H[W]=st);let J=st[U.id];J===void 0&&(J={},st[U.id]=J);let nt=J[G];return nt===void 0&&(nt=p(c()),J[G]=nt),nt}function p(A){const D=[],U=[],I=[];for(let G=0;G<e;G++)D[G]=0,U[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:I,object:A,attributes:{},index:null}}function m(A,D,U,I){const G=r.attributes,H=D.attributes;let W=0;const st=U.getAttributes();for(const J in st)if(st[J].location>=0){const ut=G[J];let mt=H[J];if(mt===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(mt=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(mt=A.instanceColor)),ut===void 0||ut.attribute!==mt||mt&&ut.data!==mt.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function x(A,D,U,I){const G={},H=D.attributes;let W=0;const st=U.getAttributes();for(const J in st)if(st[J].location>=0){let ut=H[J];ut===void 0&&(J==="instanceMatrix"&&A.instanceMatrix&&(ut=A.instanceMatrix),J==="instanceColor"&&A.instanceColor&&(ut=A.instanceColor));const mt={};mt.attribute=ut,ut&&ut.data&&(mt.data=ut.data),G[J]=mt,W++}r.attributes=G,r.attributesNum=W,r.index=I}function M(){const A=r.newAttributes;for(let D=0,U=A.length;D<U;D++)A[D]=0}function u(A){h(A,0)}function h(A,D){const U=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;U[A]=1,I[A]===0&&(i.enableVertexAttribArray(A),I[A]=1),G[A]!==D&&(i.vertexAttribDivisor(A,D),G[A]=D)}function b(){const A=r.newAttributes,D=r.enabledAttributes;for(let U=0,I=D.length;U<I;U++)D[U]!==A[U]&&(i.disableVertexAttribArray(U),D[U]=0)}function E(A,D,U,I,G,H,W){W===!0?i.vertexAttribIPointer(A,D,U,G,H):i.vertexAttribPointer(A,D,U,I,G,H)}function R(A,D,U,I){M();const G=I.attributes,H=U.getAttributes(),W=D.defaultAttributeValues;for(const st in H){const J=H[st];if(J.location>=0){let nt=G[st];if(nt===void 0&&(st==="instanceMatrix"&&A.instanceMatrix&&(nt=A.instanceMatrix),st==="instanceColor"&&A.instanceColor&&(nt=A.instanceColor)),nt!==void 0){const ut=nt.normalized,mt=nt.itemSize,Pt=t.get(nt);if(Pt===void 0)continue;const $=Pt.buffer,pt=Pt.type,bt=Pt.bytesPerElement,Nt=pt===i.INT||pt===i.UNSIGNED_INT||nt.gpuType===Qo;if(nt.isInterleavedBufferAttribute){const wt=nt.data,Wt=wt.isInterleavedBuffer===!0?wt.stride:wt.itemSize,at=nt.offset;if(wt.isInstancedInterleavedBuffer||wt.isInstancedBufferAttribute){for(let At=0;At<J.locationSize;At++)h(J.location+At,wt.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let At=0;At<J.locationSize;At++)u(J.location+At);i.bindBuffer(i.ARRAY_BUFFER,$);for(let At=0;At<J.locationSize;At++)E(J.location+At,mt/J.locationSize,pt,ut,Wt*bt,(at+mt/J.locationSize*At)*bt,Nt)}else{if(nt.isInstancedBufferAttribute){for(let wt=0;wt<J.locationSize;wt++)h(J.location+wt,nt.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let wt=0;wt<J.locationSize;wt++)u(J.location+wt);i.bindBuffer(i.ARRAY_BUFFER,$);for(let wt=0;wt<J.locationSize;wt++)E(J.location+wt,mt/J.locationSize,pt,ut,mt*bt,mt/J.locationSize*wt*bt,Nt)}}else if(W!==void 0){const ut=W[st];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(J.location,ut);break;case 3:i.vertexAttrib3fv(J.location,ut);break;case 4:i.vertexAttrib4fv(J.location,ut);break;default:i.vertexAttrib1fv(J.location,ut)}}}}b()}function S(){w();for(const A in n){const D=n[A];for(const U in D){const I=D[U];for(const G in I){const H=I[G];for(const W in H)d(H[W].object),delete H[W];delete I[G]}}delete n[A]}}function _(A){if(n[A.id]===void 0)return;const D=n[A.id];for(const U in D){const I=D[U];for(const G in I){const H=I[G];for(const W in H)d(H[W].object),delete H[W];delete I[G]}}delete n[A.id]}function f(A){for(const D in n){const U=n[D];for(const I in U){const G=U[I];if(G[A.id]===void 0)continue;const H=G[A.id];for(const W in H)d(H[W].object),delete H[W];delete G[A.id]}}}function v(A){for(const D in n){const U=n[D],I=A.isInstancedMesh===!0?A.id:0,G=U[I];if(G!==void 0){for(const H in G){const W=G[H];for(const st in W)d(W[st].object),delete W[st];delete G[H]}delete U[I],Object.keys(U).length===0&&delete n[D]}}}function w(){T(),o=!0,r!==s&&(r=s,l(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:T,dispose:S,releaseStatesOfGeometry:_,releaseStatesOfObject:v,releaseStatesOfProgram:f,initAttributes:M,enableAttribute:u,disableUnusedAttributes:b}}function xm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),e.update(l,n,d))}function a(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let p=0;for(let m=0;m<d;m++)p+=l[m];e.update(p,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function vm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const f=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(f.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(f){return!(f!==Jn&&n.convert(f)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(f){const v=f===jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(f!==Cn&&f!==kn&&!v&&n.convert(f)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(f){if(f==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";f="mediump"}return f==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Kt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.logarithmicDepthBuffer===!0&&g===!1;e.reversedDepthBuffer===!0&&g===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&g===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),R=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),_=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:g,maxTextures:m,maxVertexTextures:x,maxTextureSize:M,maxCubemapSize:u,maxAttributes:h,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:R,maxSamples:S,samples:_}}function Mm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ci,a=new ne,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,p){const m=g.length!==0||p||n!==0||s;return s=p,n=g.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,p){e=d(g,p,0)},this.setState=function(g,p,m){const x=g.clippingPlanes,M=g.clipIntersection,u=g.clipShadows,h=i.get(g);if(!s||x===null||x.length===0||r&&!u)r?d(null):l();else{const b=r?0:n,E=b*4;let R=h.clippingState||null;c.value=R,R=d(x,p,E,m);for(let S=0;S!==E;++S)R[S]=e[S];h.clippingState=R,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(g,p,m,x){const M=g!==null?g.length:0;let u=null;if(M!==0){if(u=c.value,x!==!0||u===null){const h=m+M*4,b=p.matrixWorldInverse;a.getNormalMatrix(b),(u===null||u.length<h)&&(u=new Float32Array(h));for(let E=0,R=m;E!==M;++E,R+=4)o.copy(g[E]).applyMatrix4(b,a),o.normal.toArray(u,R),u[R+3]=o.constant}c.value=u,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,u}}class ha extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Pl(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new tn(5,5,5),r=new Yi({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:us});r.uniforms.tEquirect.value=e;const o=new ye(s,r),a=e.minFilter;return e.minFilter===Ti&&(e.minFilter=Sn),new qo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Rc=256,Sm=3,ym=20,fh=256,dh=16,bm=3,Em=new O,Tm=new ie;class xr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new qo(1,10,null),this._boxMesh=new ye(new tn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Em}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),d=this._getSourceTarget(!0);e>0&&(d.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,p=c.autoClearColor,m=c.autoClearDepth,x=c.autoClearStencil,M=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,M===null&&(t.background=c.getClearColor(Tm));const u=new qo(n,s,d);return u.position.copy(a),u.update(c,t),c.autoClear=g,c.autoClearColor=p,c.autoClearDepth=m,c.autoClearStencil=x,t.background=M,e>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Rc,Uu(t))}_fromTexture(t,e){t.mapping===hs||t.mapping===Us?this._setSize(t.image.length===0?Rc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Cc(t,!1,!1),n=Math.log2(t)-Sm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Cc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===hs||t.mapping===Us?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Pc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=wm(),this._integrationMaterial=Am());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/dh);for(let o=0;o<=n;o++){const a=xr.lodToRoughness(o,n);if(o>n-bm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(fh*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Rm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Cc(i,t,e){return new ha(i,{minFilter:Ti,generateMipmaps:t,type:jn,colorSpace:pr,depthBuffer:e})}function vr(i,t,e){return new Yi({name:i,uniforms:t,vertexShader:re.cube_vert,fragmentShader:e,side:yn,blending:us,depthTest:!1,depthWrite:!1})}function wm(){return vr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${fh}u

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
	`)}function Am(){return vr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:dh}},`

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
	`)}function Rm(){return vr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${ym}
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
	`)}function Pc(){return vr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Dc(){return vr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Cm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(p,m=!1){return p==null?null:m?o(p):r(p)}function r(p){if(p&&p.isTexture){const m=p.mapping;if(m===$r||m===Qr)if(t.has(p)){const x=t.get(p).texture;return a(x,p.mapping)}else{const x=p.image;if(x&&x.height>0){const M=new ha(x.height);return M.fromEquirectangularTexture(i,p),t.set(p,M),p.addEventListener("dispose",l),a(M.texture,p.mapping)}else return null}}return p}function o(p){if(p&&p.isTexture&&p.isPMREMTexture!==!0){const m=p.mapping,x=m===$r||m===Qr,M=m===hs||m===Us;if(x||M){let u=e.get(p);const h=u!==void 0?u.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==h)return n===null&&(n=new xr(i)),u=x?n.fromEquirectangular(p,u):n.fromCubemap(p,u),u.texture.pmremVersion=p.pmremVersion,e.set(p,u),u.texture;if(u!==void 0)return u.texture;{const b=p.image;return x&&b&&b.height>0||M&&b&&c(b)?(n===null&&(n=new xr(i)),u=x?n.fromEquirectangular(p):n.fromCubemap(p),u.texture.pmremVersion=p.pmremVersion,e.set(p,u),p.addEventListener("dispose",d),u.texture):null}}}return p}function a(p,m){return m===$r?p.mapping=hs:m===Qr&&(p.mapping=Us),p}function c(p){let m=0;const x=6;for(let M=0;M<x;M++)p[M]!==void 0&&m++;return m===x}function l(p){const m=p.target;m.removeEventListener("dispose",l);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function d(p){const m=p.target;m.removeEventListener("dispose",d);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function Pm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&or("WebGLRenderer: "+n+" extension not supported."),s}}}function Dm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&t.remove(x.index);for(const u in x.attributes)t.remove(x.attributes[u]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);const M=r.get(x);M&&(t.remove(M),r.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,e.memory.geometries--}function l(x,M){return s[M.id]!==void 0||(M.addEventListener("dispose",a),s[M.id]=new WeakRef(M),o.register(M,M.id,M),e.memory.geometries++),M}function d(x){const M=x.attributes;for(const u in M)t.update(M[u],i.ARRAY_BUFFER)}function g(x){const M=x.index,u=x.attributes.position;let h=0;if(u===void 0)return;const b=M!==null?M.array.length:u.array.length/3-1,E=u.count>=65535?Tl:El,R=new E(Math.ceil(b/3)*6,1),S=R.array;if(M!==null){const f=M.array;h=M.version;for(let v=0,w=0;v<b;v+=3){const T=f[v+0],A=f[v+1],D=f[v+2];S[w++]=T,S[w++]=A,S[w++]=A,S[w++]=D,S[w++]=D,S[w++]=T}}else{h=u.version;for(let f=0,v=0;f<b;f+=3){const w=f+0,T=f+1,A=f+2;S[v++]=w,S[v++]=T,S[v++]=T,S[v++]=A,S[v++]=A,S[v++]=w}}R.version=h;const _=r.get(x);_&&t.remove(_),r.set(x,R)}function p(x){const M=r.get(x);if(M){const u=x.index;u!==null&&M.version<u.version&&g(x)}else g(x);return r.get(x)}function m(){for(const x in s){const M=s[x].deref();M!==void 0&&c(M)}}return{get:l,update:d,getWireframeAttribute:p,dispose:m}}function Lm(i,t,e){let n;function s(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function c(g,p){i.drawElements(n,p,r,g*o),e.update(p,n,1)}function l(g,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,g*o,m),e.update(p,n,m))}function d(g,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,g,0,m);let M=0;for(let u=0;u<m;u++)M+=p[u];e.update(M,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Im(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Nm(i,t,e){const n=new WeakMap,s=new Ve;function r(o,a,c){const l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,g=d!==void 0?d.length:0;let p=n.get(a);if(p===void 0||p.count!==g){let w=function(){f.dispose(),n.delete(a),a.removeEventListener("dispose",w)};p!==void 0&&p.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,M=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let E=0;m===!0&&(E=1),x===!0&&(E=2),M===!0&&(E=3);let R=a.attributes.position.count*E,S=1;R>t.maxTextureSize&&(S=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const _=new Float32Array(R*S*4*g),f=new bl(_,R,S,g);f.type=kn,f.needsUpdate=!0;const v=E*4;for(let T=0;T<g;T++){const A=u[T],D=h[T],U=b[T],I=R*S*4*T;for(let G=0;G<A.count;G++){const H=G*v;m===!0&&(s.fromBufferAttribute(A,G),_[I+H+0]=s.x,_[I+H+1]=s.y,_[I+H+2]=s.z,_[I+H+3]=0),x===!0&&(s.fromBufferAttribute(D,G),_[I+H+4]=s.x,_[I+H+5]=s.y,_[I+H+6]=s.z,_[I+H+7]=0),M===!0&&(s.fromBufferAttribute(U,G),_[I+H+8]=s.x,_[I+H+9]=s.y,_[I+H+10]=s.z,_[I+H+11]=U.itemSize===4?s.w:1)}}p={count:g,texture:f,size:new Ot(R,S)},n.set(a,p),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Um(i,t,e,n,s){let r=new WeakMap;function o(l){const d=s.render.frame,g=l.geometry,p=t.get(l,g);if(r.get(p)!==d&&(t.update(p),r.set(p,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return p}function a(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:a}}const Fm={[sl]:"LINEAR_TONE_MAPPING",[rl]:"REINHARD_TONE_MAPPING",[ol]:"CINEON_TONE_MAPPING",[$o]:"ACES_FILMIC_TONE_MAPPING",[ll]:"AGX_TONE_MAPPING",[cl]:"NEUTRAL_TONE_MAPPING",[al]:"CUSTOM_TONE_MAPPING"};function Om(i,t,e,n,s,r){const o=new $n(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const d=new en;d.setAttribute("position",new De([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new De([0,2,0,0,2,0],2));const g=new nh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new ye(d,g),m=new zl(-1,1,1,-1,0,1);let x=null,M=null,u=!1,h,b=null,E=[],R=!1;this.setSize=function(S,_){o.setSize(S,_),a!==null&&a.setSize(S,_),c!==null&&c.setSize(S,_);for(let f=0;f<E.length;f++){const v=E[f];v.setSize&&v.setSize(S,_)}},this.setEffects=function(S){E=S,R=E.length>0&&E[0].isRenderPass===!0;const _=o.width,f=o.height;E.length>0&&a===null&&(a=new $n(_,f,{type:jn,depthBuffer:!1,stencilBuffer:!1}),c=new $n(_,f,{type:jn,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&E.some(w=>w.needsDepthTexture===!0);v!==(o.depthTexture!==null)&&(v===!0&&l===null&&(l=new ds(_,f),r===!0&&(l.format=wi,l.type=fs)),o.dispose(),o.depthTexture=v?l:null,o.resolveDepthBuffer=v,o.storeMultisampledDepthBuffer=v);for(let w=0;w<E.length;w++){const T=E[w];T.setSize&&T.setSize(_,f),v&&T.needsDepthTexture===!0&&T.setDepthTexture&&T.setDepthTexture(l)}},this.begin=function(S,_){if(u||S.toneMapping===di&&E.length===0)return!1;if(b=_,_!==null){const f=_.width,v=_.height;(o.width!==f||o.height!==v)&&this.setSize(f,v)}return R===!1&&S.setRenderTarget(o),h=S.toneMapping,S.toneMapping=di,!0},this.hasRenderPass=function(){return R},this.end=function(S,_){S.toneMapping=h,u=!0;let f=o,v=a;for(let w=0;w<E.length;w++){const T=E[w];T.enabled!==!1&&(T.render(S,v,f,_),T.needsSwap!==!1&&(f=v,v=v===a?c:a))}if(x!==S.outputColorSpace||M!==S.toneMapping){x=S.outputColorSpace,M=S.toneMapping,g.defines={},_e.getTransfer(x)===Pe&&(g.defines.SRGB_TRANSFER="");const w=Fm[M];w&&(g.defines[w]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=f.texture,S.setRenderTarget(b),S.render(p,m),b=null,u=!1},this.isCompositing=function(){return u},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),d.dispose(),g.dispose()}}const ph=new fn,mh=new ds(1,1),gh=new Dl(1),_h=new bl,xh=new Gu,vh=new Pl,Lc=[],Ic=[],Nc=new Float32Array(16),Uc=new Float32Array(9),Fc=new Float32Array(4);function Vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Lc[s];if(r===void 0&&(r=new Float32Array(s),Lc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function nn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function sn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fa(i,t){let e=Ic[t];e===void 0&&(e=new Int32Array(t),Ic[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Bm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2fv(this.addr,t),sn(e,t)}}function Gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(nn(e,t))return;i.uniform3fv(this.addr,t),sn(e,t)}}function km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4fv(this.addr,t),sn(e,t)}}function Hm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),sn(e,t)}else{if(nn(e,n))return;Fc.set(n),i.uniformMatrix2fv(this.addr,!1,Fc),sn(e,n)}}function Vm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),sn(e,t)}else{if(nn(e,n))return;Uc.set(n),i.uniformMatrix3fv(this.addr,!1,Uc),sn(e,n)}}function Wm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),sn(e,t)}else{if(nn(e,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),sn(e,n)}}function Xm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2iv(this.addr,t),sn(e,t)}}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(nn(e,t))return;i.uniform3iv(this.addr,t),sn(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4iv(this.addr,t),sn(e,t)}}function Km(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2uiv(this.addr,t),sn(e,t)}}function $m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(nn(e,t))return;i.uniform3uiv(this.addr,t),sn(e,t)}}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4uiv(this.addr,t),sn(e,t)}}function da(i){return i.version===0&&(i.compareFunction=vl,i.needsUpdate=!0),i}function jm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=da(mh):r=ph,e.setTexture2D(t||r,s)}function t0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||xh,s)}function e0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=da(gh):r=vh,e.setTextureCube(t||r,s)}function n0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||_h,s)}function i0(i){switch(i){case 5126:return Bm;case 35664:return zm;case 35665:return Gm;case 35666:return km;case 35674:return Hm;case 35675:return Vm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return Ym;case 35668:case 35672:return qm;case 35669:case 35673:return Zm;case 5125:return Km;case 36294:return Jm;case 36295:return $m;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return e0;case 36289:case 36303:case 36311:case 36292:return n0}}function s0(i,t){i.uniform1fv(this.addr,t)}function r0(i,t){const e=Vs(t,this.size,2);i.uniform2fv(this.addr,e)}function o0(i,t){const e=Vs(t,this.size,3);i.uniform3fv(this.addr,e)}function a0(i,t){const e=Vs(t,this.size,4);i.uniform4fv(this.addr,e)}function l0(i,t){const e=Vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function c0(i,t){const e=Vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function u0(i,t){const e=Vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function h0(i,t){i.uniform1iv(this.addr,t)}function f0(i,t){i.uniform2iv(this.addr,t)}function d0(i,t){i.uniform3iv(this.addr,t)}function p0(i,t){i.uniform4iv(this.addr,t)}function m0(i,t){i.uniform1uiv(this.addr,t)}function g0(i,t){i.uniform2uiv(this.addr,t)}function _0(i,t){i.uniform3uiv(this.addr,t)}function x0(i,t){i.uniform4uiv(this.addr,t)}function v0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=da(mh):o=ph;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function M0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||xh,r[o])}function S0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=da(gh):o=vh;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function y0(i,t,e){const n=this.cache,s=t.length,r=fa(e,s);nn(n,r)||(i.uniform1iv(this.addr,r),sn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||_h,r[o])}function b0(i){switch(i){case 5126:return s0;case 35664:return r0;case 35665:return o0;case 35666:return a0;case 35674:return l0;case 35675:return c0;case 35676:return u0;case 5124:case 35670:return h0;case 35667:case 35671:return f0;case 35668:case 35672:return d0;case 35669:case 35673:return p0;case 5125:return m0;case 36294:return g0;case 36295:return _0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return M0;case 35680:case 36300:case 36308:case 36293:return S0;case 36289:case 36303:case 36311:case 36292:return y0}}class E0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=i0(e.type)}}class T0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=b0(e.type)}}class w0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ga=/(\w+)(\])?(\[|\.)?/g;function Oc(i,t){i.seq.push(t),i.map[t.id]=t}function A0(i,t,e){const n=i.name,s=n.length;for(Ga.lastIndex=0;;){const r=Ga.exec(n),o=Ga.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Oc(e,l===void 0?new E0(a,i,t):new T0(a,i,t));break}else{let g=e.map[a];g===void 0&&(g=new w0(a),Oc(e,g)),e=g}}}class no{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);A0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Bc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const R0=37297;let C0=0;function P0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const zc=new ne;function D0(i){_e._getMatrix(zc,_e.workingColorSpace,i);const t=`mat3( ${zc.elements.map(e=>e.toFixed(4))} )`;switch(_e.getTransfer(i)){case mr:return[t,"LinearTransferOETF"];case Pe:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Gc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+P0(i.getShaderSource(t),a)}else return r}function L0(i,t){const e=D0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const I0={[sl]:"Linear",[rl]:"Reinhard",[ol]:"Cineon",[$o]:"ACESFilmic",[ll]:"AgX",[cl]:"Neutral",[al]:"Custom"};function N0(i,t){const e=I0[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const qr=new O;function U0(){_e.getLuminanceCoefficients(qr);const i=qr.x.toFixed(4),t=qr.y.toFixed(4),e=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function O0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function B0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function tr(i){return i!==""}function kc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Hc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const z0=/^[ \t]*#include +<([\w\d./]+)>/gm;function tl(i){return i.replace(z0,G0)}function G0(i,t){const e=re[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return tl(e)}const k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vc(i){return i.replace(k0,H0)}function H0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const V0={[er]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function W0(i){return V0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const X0={[Us]:"ENVMAP_MODE_REFRACTION"};function Y0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":X0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const q0={[il]:"ENVMAP_BLENDING_MULTIPLY",[Su]:"ENVMAP_BLENDING_MIX",[yu]:"ENVMAP_BLENDING_ADD"};function Z0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":q0[i.combine]||"ENVMAP_BLENDING_NONE"}function K0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=W0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=Y0(e),g=Z0(e),p=F0(e),m=O0(r),x=s.createProgram();let M,u,h=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(tr).join(`
`),M.length>0&&(M+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(tr).join(`
`),u.length>0&&(u+=`
`)):(M=[Wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),u=[Wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+g:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==di?"#define TONE_MAPPING":"",e.toneMapping!==di?re.tonemapping_pars_fragment:"",e.toneMapping!==di?N0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,L0("linearToOutputTexel",e.outputColorSpace),U0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(tr).join(`
`)),o=tl(o),o=kc(o,e),o=Hc(o,e),a=tl(a),a=kc(a,e),a=Hc(a,e),o=Vc(o),a=Vc(a),e.isRawShaderMaterial!==!0&&(h=`#version 300 es
`,M=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,u=["#define varying in",e.glslVersion===Ya?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const b=h+M+o,E=h+u+a,R=Bc(s,s.VERTEX_SHADER,b),S=Bc(s,s.FRAGMENT_SHADER,E);s.attachShader(x,R),s.attachShader(x,S),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function _(T){if(i.debug.checkShaderErrors){const A=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(R)||"",U=s.getShaderInfoLog(S)||"",I=A.trim(),G=D.trim(),H=U.trim();let W=!0,st=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,S);else{const J=Gc(s,R,"vertex"),nt=Gc(s,S,"fragment");Se("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+I+`
`+J+`
`+nt)}else I!==""?Kt("WebGLProgram: Program Info Log:",I):(G===""||H==="")&&(st=!1);st&&(T.diagnostics={runnable:W,programLog:I,vertexShader:{log:G,prefix:M},fragmentShader:{log:H,prefix:u}})}s.deleteShader(R),s.deleteShader(S),f=new no(s,x),v=B0(s,x)}let f;this.getUniforms=function(){return f===void 0&&_(this),f};let v;this.getAttributes=function(){return v===void 0&&_(this),v};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(x,R0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=C0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=S,this}let J0=0;class $0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Q0(t),e.set(t,n)),n}}class Q0{constructor(t){this.id=J0++,this.code=t,this.usedTimes=0}}function j0(i){return i===Xi||i===fr||i===dr}function tg(i,t,e,n,s,r){const o=new oa,a=new $0,c=new Set,l=[],d=new Map,g=n.logarithmicDepthBuffer,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(f){return c.add(f),f===0?"uv":`uv${f}`}function x(f,v,w,T,A,D){const U=T.fog,I=A.geometry,G=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?T.environment:null,H=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,W=t.get(f.envMap||G,H),st=p[f.type];let J=n.precision;f.precision!==null&&(J=n.getMaxPrecision(f.precision),J!==f.precision&&Kt("WebGLProgram.getParameters:",f.precision,"not supported, using",J,"instead."));const nt=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ut=nt!==void 0?nt.length:0;let mt=0;I.morphAttributes.position!==void 0&&(mt=1),I.morphAttributes.normal!==void 0&&(mt=2),I.morphAttributes.color!==void 0&&(mt=3);let Pt,$,pt,bt;if(st){const Mt=Kn[st];Pt=Mt.vertexShader,$=Mt.fragmentShader}else{Pt=f.vertexShader,$=f.fragmentShader;const Mt=a.getVertexShaderStage(f),oe=a.getFragmentShaderStage(f);a.update(f,Mt,oe),pt=Mt.id,bt=oe.id}const Nt=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Wt=A.isInstancedMesh===!0,at=A.isBatchedMesh===!0,At=!!f.map,ce=!!f.matcap,ve=!!W,Jt=ve&&W.isPMREMTexture===!0,Rt=!!f.aoMap,Yt=!!f.lightMap,ue=!!f.bumpMap&&f.wireframe===!1,$t=!!f.normalMap,me=!!f.displacementMap,we=!!f.emissiveMap,We=!!f.metalnessMap,Qt=!!f.roughnessMap,de=f.anisotropy>0,k=f.clearcoat>0,qe=f.diffuseRoughness>0,be=f.dispersion>0,Ee=f.retroreflectivity>0,Et=f.iridescence>0,Le=f.sheen>0,qt=f.transmission>0,jt=de&&!!f.anisotropyMap,N=k&&!!f.clearcoatMap,C=k&&!!f.clearcoatNormalMap,Z=k&&!!f.clearcoatRoughnessMap,ht=qe&&!!f.diffuseRoughnessMap,ct=Et&&!!f.iridescenceMap,St=Et&&!!f.iridescenceThicknessMap,Tt=Le&&!!f.sheenColorMap,rt=Le&&!!f.sheenRoughnessMap,it=!!f.specularMap,lt=!!f.specularColorMap,B=!!f.specularIntensityMap,ot=qt&&!!f.transmissionMap,tt=qt&&!!f.thicknessMap,xt=!!f.gradientMap,gt=!!f.alphaMap,vt=f.alphaTest>0,Bt=!!f.alphaHash,ee=!!f.extensions;let dt=di;f.toneMapped&&(Nt===null||Nt.isXRRenderTarget===!0)&&(dt=i.toneMapping);const Ut=Jt?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,Xt={shaderID:st,shaderType:f.type,shaderName:f.name,vertexShader:Pt,fragmentShader:$,defines:f.defines,customVertexShaderID:pt,customFragmentShaderID:bt,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:J,batching:at,batchingColor:at&&A._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&A.instanceColor!==null,instancingMorph:Wt&&A.morphTexture!==null,outputColorSpace:Nt===null?i.outputColorSpace:Nt.isXRRenderTarget===!0?Nt.texture.colorSpace:_e.workingColorSpace,alphaToCoverage:!!f.alphaToCoverage,map:At,matcap:ce,envMap:ve,envMapMode:ve&&W.mapping,envMapPMREM:Jt,envMapMaxLod:Jt?Ut.length-1:null,envMapSize:Jt?Ut[0].width:null,aoMap:Rt,lightMap:Yt,bumpMap:ue,normalMap:$t,displacementMap:me,emissiveMap:we,normalMapObjectSpace:$t&&f.normalMapType===Tu,normalMapTangentSpace:$t&&f.normalMapType===Vo,packedNormalMap:$t&&f.normalMapType===Vo&&j0(f.normalMap.format),metalnessMap:We,roughnessMap:Qt,anisotropy:de,anisotropyMap:jt,clearcoat:k,clearcoatMap:N,clearcoatNormalMap:C,clearcoatRoughnessMap:Z,diffuseRoughness:qe,diffuseRoughnessMap:ht,dispersion:be,retroreflection:Ee,iridescence:Et,iridescenceMap:ct,iridescenceThicknessMap:St,sheen:Le,sheenColorMap:Tt,sheenRoughnessMap:rt,specularMap:it,specularColorMap:lt,specularIntensityMap:B,transmission:qt,transmissionMap:ot,thicknessMap:tt,gradientMap:xt,opaque:f.transparent===!1&&f.blending===Ls&&f.alphaToCoverage===!1,alphaMap:gt,alphaTest:vt,alphaHash:Bt,combine:f.combine,mapUv:At&&m(f.map.channel),aoMapUv:Rt&&m(f.aoMap.channel),lightMapUv:Yt&&m(f.lightMap.channel),bumpMapUv:ue&&m(f.bumpMap.channel),normalMapUv:$t&&m(f.normalMap.channel),displacementMapUv:me&&m(f.displacementMap.channel),emissiveMapUv:we&&m(f.emissiveMap.channel),metalnessMapUv:We&&m(f.metalnessMap.channel),roughnessMapUv:Qt&&m(f.roughnessMap.channel),anisotropyMapUv:jt&&m(f.anisotropyMap.channel),clearcoatMapUv:N&&m(f.clearcoatMap.channel),clearcoatNormalMapUv:C&&m(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&m(f.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ht&&m(f.diffuseRoughnessMap.channel),iridescenceMapUv:ct&&m(f.iridescenceMap.channel),iridescenceThicknessMapUv:St&&m(f.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&m(f.sheenColorMap.channel),sheenRoughnessMapUv:rt&&m(f.sheenRoughnessMap.channel),specularMapUv:it&&m(f.specularMap.channel),specularColorMapUv:lt&&m(f.specularColorMap.channel),specularIntensityMapUv:B&&m(f.specularIntensityMap.channel),transmissionMapUv:ot&&m(f.transmissionMap.channel),thicknessMapUv:tt&&m(f.thicknessMap.channel),alphaMapUv:gt&&m(f.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&($t||de),vertexNormals:!!I.attributes.normal,vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!I.attributes.uv&&(At||gt),fog:!!U,useFog:f.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:f.wireframe===!1&&(f.flatShading===!0||I.attributes.normal===void 0&&$t===!1&&(f.isMeshLambertMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isMeshPhysicalMaterial)),sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:wt,skinning:A.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:mt,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:D.filter(Mt=>Mt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:dt,decodeVideoTexture:At&&f.map.isVideoTexture===!0&&_e.getTransfer(f.map.colorSpace)===Pe,decodeVideoTextureEmissive:we&&f.emissiveMap.isVideoTexture===!0&&_e.getTransfer(f.emissiveMap.colorSpace)===Pe,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===gn,flipSided:f.side===yn,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:ee&&f.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&f.extensions.multiDraw===!0||at)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Xt.vertexUv1s=c.has(1),Xt.vertexUv2s=c.has(2),Xt.vertexUv3s=c.has(3),c.clear(),Xt}function M(f){const v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(const w in f.defines)v.push(w),v.push(f.defines[w]);return f.isRawShaderMaterial===!1&&(u(v,f),h(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()}function u(f,v){f.push(v.precision),f.push(v.outputColorSpace),f.push(v.envMapMode),f.push(v.envMapPMREM),f.push(v.envMapMaxLod),f.push(v.envMapSize),f.push(v.mapUv),f.push(v.alphaMapUv),f.push(v.lightMapUv),f.push(v.aoMapUv),f.push(v.bumpMapUv),f.push(v.normalMapUv),f.push(v.displacementMapUv),f.push(v.emissiveMapUv),f.push(v.metalnessMapUv),f.push(v.roughnessMapUv),f.push(v.anisotropyMapUv),f.push(v.clearcoatMapUv),f.push(v.clearcoatNormalMapUv),f.push(v.clearcoatRoughnessMapUv),f.push(v.diffuseRoughnessMapUv),f.push(v.iridescenceMapUv),f.push(v.iridescenceThicknessMapUv),f.push(v.sheenColorMapUv),f.push(v.sheenRoughnessMapUv),f.push(v.specularMapUv),f.push(v.specularColorMapUv),f.push(v.specularIntensityMapUv),f.push(v.transmissionMapUv),f.push(v.thicknessMapUv),f.push(v.combine),f.push(v.fogExp2),f.push(v.sizeAttenuation),f.push(v.morphTargetsCount),f.push(v.numSunLights),f.push(v.numDirLights),f.push(v.numPointLights),f.push(v.numSpotLights),f.push(v.numSpotLightMaps),f.push(v.numHemiLights),f.push(v.numRectAreaLights),f.push(v.numSunLightShadows),f.push(v.numDirLightShadows),f.push(v.numPointLightShadows),f.push(v.numSpotLightShadows),f.push(v.numSpotLightShadowsWithMaps),f.push(v.numLightProbes),f.push(v.numLightProbeGrids),f.push(v.shadowMapType),f.push(v.toneMapping),f.push(v.numClippingPlanes),f.push(v.numClipIntersection),f.push(v.depthPacking)}function h(f,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.diffuseRoughness&&o.enable(25),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),f.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),f.push(o.mask)}function b(f){const v=p[f.type];let w;if(v){const T=Kn[v];w=eh.clone(T.uniforms)}else w=f.uniforms;return w}function E(f,v){let w=d.get(v);return w!==void 0?++w.usedTimes:(w=new K0(i,v,f,s),l.push(w),d.set(v,w)),w}function R(f){if(--f.usedTimes===0){const v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),d.delete(f.cacheKey),f.destroy()}}function S(f){a.remove(f)}function _(){a.dispose()}return{getParameters:x,getProgramCacheKey:M,getUniforms:b,acquireProgram:E,releaseProgram:R,releaseShaderCache:S,programs:l,dispose:_}}function eg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ng(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Xc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Yc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p){let m=0;return p.isInstancedMesh&&(m+=2),p.isSkinnedMesh&&(m+=1),m}function a(p,m,x,M,u,h){let b=i[t];return b===void 0?(b={id:p.id,object:p,geometry:m,material:x,materialVariant:o(p),groupOrder:M,renderOrder:p.renderOrder,z:u,group:h},i[t]=b):(b.id=p.id,b.object=p,b.geometry=m,b.material=x,b.materialVariant=o(p),b.groupOrder=M,b.renderOrder=p.renderOrder,b.z=u,b.group=h),t++,b}function c(p,m,x,M,u,h,b){b.reversedDepth===!0&&(u=-u);const E=a(p,m,x,M,u,h);x.transmission>0?n.push(E):x.transparent===!0?s.push(E):e.push(E)}function l(p,m,x,M,u,h){const b=a(p,m,x,M,u,h);x.transmission>0?n.unshift(b):x.transparent===!0?s.unshift(b):e.unshift(b)}function d(p,m){e.length>1&&e.sort(p||ng),n.length>1&&n.sort(m||Xc),s.length>1&&s.sort(m||Xc)}function g(){for(let p=t,m=i.length;p<m;p++){const x=i[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:d}}function ig(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Yc,i.set(n,[o])):s>=r.length?(o=new Yc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function sg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new ie};break;case"SpotLight":e={position:new O,direction:new O,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function rg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let og=0;function ag(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function lg(i){const t=new sg,e=rg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);const s=new O,r=new xe,o=new xe;function a(l){let d=0,g=0,p=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let m=0,x=0,M=0,u=0,h=0,b=0,E=0,R=0,S=0,_=0,f=0,v=0,w=0,T=0;l.sort(ag);for(let D=0,U=l.length;D<U;D++){const I=l[D],G=I.color,H=I.intensity,W=I.distance;let st=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Xi?st=I.shadow.map.texture:st=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=G.r*H,g+=G.g*H,p+=G.b*H;else if(I.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(I.sh.coefficients[J],H);T++}else if(I.isSunLight){const J=t.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const nt=I.shadow,ut=e.get(I);ut.shadowIntensity=nt.intensity,ut.shadowBias=nt.bias,ut.shadowNormalBias=nt.normalBias,ut.shadowRadius=nt.radius,ut.shadowMapSize.copy(nt.mapSize).multiply(nt.getFrameExtents()),n.sunShadow[x]=ut,n.sunShadowMap[x]=st;const mt=nt.getViewportCount();for(let Pt=0;Pt<mt;Pt++)n.sunShadowMatrix[M+Pt]=nt.getMatrix(Pt),n.sunShadowCascade[M+Pt]=nt._cascadeData[Pt];M+=mt,x++}n.sun[m]=J,m++}else if(I.isDirectionalLight){const J=t.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const nt=I.shadow,ut=e.get(I);ut.shadowIntensity=nt.intensity,ut.shadowBias=nt.bias,ut.shadowNormalBias=nt.normalBias,ut.shadowRadius=nt.radius,ut.shadowMapSize=nt.mapSize,n.directionalShadow[u]=ut,n.directionalShadowMap[u]=st,n.directionalShadowMatrix[u]=I.shadow.matrix,S++}n.directional[u]=J,u++}else if(I.isSpotLight){const J=t.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(G).multiplyScalar(H),J.distance=W,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,n.spot[b]=J;const nt=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,nt.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[b]=nt.matrix,I.castShadow){const ut=e.get(I);ut.shadowIntensity=nt.intensity,ut.shadowBias=nt.bias,ut.shadowNormalBias=nt.normalBias,ut.shadowRadius=nt.radius,ut.shadowMapSize=nt.mapSize,n.spotShadow[b]=ut,n.spotShadowMap[b]=st,f++}b++}else if(I.isRectAreaLight){const J=t.get(I);J.color.copy(G).multiplyScalar(H),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=J,E++}else if(I.isPointLight){const J=t.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){const nt=I.shadow,ut=e.get(I);ut.shadowIntensity=nt.intensity,ut.shadowBias=nt.bias,ut.shadowNormalBias=nt.normalBias,ut.shadowRadius=nt.radius,ut.shadowMapSize=nt.mapSize,ut.shadowCameraNear=nt.camera.near,ut.shadowCameraFar=nt.camera.far,n.pointShadow[h]=ut,n.pointShadowMap[h]=st,n.pointShadowMatrix[h]=I.shadow.matrix,_++}n.point[h]=J,h++}else if(I.isHemisphereLight){const J=t.get(I);J.skyColor.copy(I.color).multiplyScalar(H),J.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[R]=J,R++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=g,n.ambient[2]=p;const A=n.hash;(A.sunLength!==m||A.directionalLength!==u||A.pointLength!==h||A.spotLength!==b||A.rectAreaLength!==E||A.hemiLength!==R||A.numSunShadows!==x||A.numDirectionalShadows!==S||A.numPointShadows!==_||A.numSpotShadows!==f||A.numSpotMaps!==v||A.numLightProbes!==T)&&(n.sun.length=m,n.directional.length=u,n.spot.length=b,n.rectArea.length=E,n.point.length=h,n.hemi.length=R,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=_,n.pointShadowMap.length=_,n.pointShadowMatrix.length=_,n.spotShadow.length=f,n.spotShadowMap.length=f,n.spotLightMatrix.length=f+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,A.sunLength=m,A.directionalLength=u,A.pointLength=h,A.spotLength=b,A.rectAreaLength=E,A.hemiLength=R,A.numSunShadows=x,A.numDirectionalShadows=S,A.numPointShadows=_,A.numSpotShadows=f,A.numSpotMaps=v,A.numLightProbes=T,n.version=og++)}function c(l,d){let g=0,p=0,m=0,x=0,M=0,u=0;const h=d.matrixWorldInverse;for(let b=0,E=l.length;b<E;b++){const R=l[b];if(R.isSunLight){const S=n.sun[g];S.direction.setFromMatrixPosition(R.matrixWorld),S.direction.transformDirection(h),g++}else if(R.isDirectionalLight){const S=n.directional[p];S.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(h),p++}else if(R.isSpotLight){const S=n.spot[x];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(h),S.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(h),x++}else if(R.isRectAreaLight){const S=n.rectArea[M];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(h),o.identity(),r.copy(R.matrixWorld),r.premultiply(h),o.extractRotation(r),S.halfWidth.set(R.width*.5,0,0),S.halfHeight.set(0,R.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),M++}else if(R.isPointLight){const S=n.point[m];S.position.setFromMatrixPosition(R.matrixWorld),S.position.applyMatrix4(h),m++}else if(R.isHemisphereLight){const S=n.hemi[u];S.direction.setFromMatrixPosition(R.matrixWorld),S.direction.transformDirection(h),u++}}}return{setup:a,setupView:c,state:n}}function qc(i){const t=new lg(i),e=[],n=[],s=[];function r(g){d.camera=g,e.length=0,n.length=0,s.length=0}function o(g){g.isLightProbeGrid?s.push(g):e.push(g)}function a(g){n.push(g)}function c(){t.setup(e),s.sort((g,p)=>g.priority-p.priority||g.id-p.id)}function l(g){t.setupView(e,g)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function cg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new qc(i),t.set(s,[a])):r>=o.length?(a=new qc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const ug=`void main() {
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
}`,fg=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],dg=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Zc=new xe,$s=new O,ka=new O;function pg(i,t,e){let n=new Bs;const s=new Ot,r=new Ot,o=new Ve,a=new ih,c=new sh,l={},d=e.maxTextureSize,g={[Wi]:yn,[yn]:Wi,[gn]:gn},p=new Yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:ug,fragmentShader:hg}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const x=new en;x.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ye(x,p),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=er;let h=this.type;this.render=function(_,f,v){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||_.length===0)return;this.type===nu&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=er);const w=i.getRenderTarget(),T=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),D=i.state;D.setBlending(us),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=h!==this.type;U&&f.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=_.length;I<G;I++){const H=_[I],W=H.shadow;if(W===void 0){Kt("WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const st=W.getFrameExtents();s.multiply(st),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/st.x),s.x=r.x*st.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/st.y),s.y=r.y*st.y,W.mapSize.y=r.y));const J=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=J,W.map===null||U===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ds){if(H.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new $n(s.x,s.y,{format:Xi,type:jn,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),W.map.texture.name=H.name+".shadowMap",W.map.depthTexture=new ds(s.x,s.y,kn),W.map.depthTexture.name=H.name+".shadowMapDepth",W.map.depthTexture.format=Ci,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=ln,W.map.depthTexture.magFilter=ln}else H.isPointLight?(W.map=new ha(s.x),W.map.depthTexture=new Dl(s.x,Qn)):(W.map=new $n(s.x,s.y),W.map.depthTexture=new ds(s.x,s.y,Qn)),W.map.depthTexture.name=H.name+".shadowMap",W.map.depthTexture.format=Ci,this.type===er?(W.map.depthTexture.compareFunction=J?xl:_l,W.map.depthTexture.minFilter=Sn,W.map.depthTexture.magFilter=Sn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=ln,W.map.depthTexture.magFilter=ln);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const nt=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();H.isPointLight!==!0&&W.updateMatrices(H,v);const ut=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:v.layers;for(let mt=0;mt<nt;mt++){const Pt=W.getCamera(mt);if(H.isPointLight){const $=W.camera,pt=W.matrix,bt=H.distance||$.far;bt!==$.far&&($.far=bt,$.updateProjectionMatrix()),$s.setFromMatrixPosition(H.matrixWorld),$.position.copy($s),ka.copy($.position),ka.add(fg[mt]),$.up.copy(dg[mt]),$.lookAt(ka),$.updateMatrixWorld(),pt.makeTranslation(-$s.x,-$s.y,-$s.z),Zc.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Zc,$.coordinateSystem,$.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,mt),i.clear();else{mt===0&&(i.setRenderTarget(W.map),i.clear());const $=W.getViewport(mt);o.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),D.viewport(o)}n=W.getFrustum(mt),R(f,v,Pt,H,ut,this.type)}W.isPointLightShadow!==!0&&this.type===Ds&&b(W,v),W.needsUpdate=!1}h=this.type,u.needsUpdate=!1,i.setRenderTarget(w,T,A)};function b(_,f){const v=t.update(M);p.defines.VSM_SAMPLES!==_.blurSamples&&(p.defines.VSM_SAMPLES=_.blurSamples,m.defines.VSM_SAMPLES=_.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),_.mapPass===null?_.mapPass=new $n(s.x,s.y,{format:Xi,type:jn}):(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)&&_.mapPass.setSize(_.map.width,_.map.height),p.uniforms.shadow_pass.value=_.map.depthTexture,p.uniforms.resolution.value.set(_.map.width,_.map.height),p.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(f,null,v,p,M,null),m.uniforms.shadow_pass.value=_.mapPass.texture,m.uniforms.resolution.value.set(_.map.width,_.map.height),m.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(f,null,v,m,M,null)}function E(_,f,v,w){let T=null;const A=v.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(A!==void 0)T=A;else if(T=v.isPointLight===!0?c:a,i.localClippingEnabled&&f.clipShadows===!0&&Array.isArray(f.clippingPlanes)&&f.clippingPlanes.length!==0||f.displacementMap&&f.displacementScale!==0||f.alphaMap&&f.alphaTest>0||f.map&&f.alphaTest>0||f.alphaToCoverage===!0){const D=T.uuid,U=f.uuid;let I=l[D];I===void 0&&(I={},l[D]=I);let G=I[U];G===void 0&&(G=T.clone(),I[U]=G,f.addEventListener("dispose",S)),T=G}if(T.visible=f.visible,T.wireframe=f.wireframe,w===Ds?T.side=f.shadowSide!==null?f.shadowSide:f.side:T.side=f.shadowSide!==null?f.shadowSide:g[f.side],T.alphaMap=f.alphaMap,T.alphaTest=f.alphaToCoverage===!0?.5:f.alphaTest,T.map=f.map,T.clipShadows=f.clipShadows,T.clippingPlanes=f.clippingPlanes,T.clipIntersection=f.clipIntersection,T.displacementMap=f.displacementMap,T.displacementScale=f.displacementScale,T.displacementBias=f.displacementBias,T.wireframeLinewidth=f.wireframeLinewidth,T.linewidth=f.linewidth,v.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const D=i.properties.get(T);D.light=v}return T}function R(_,f,v,w,T,A){if(_.visible===!1)return;if(_.layers.test(T)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&A===Ds)&&(!_.frustumCulled||_.intersectsFrustum(n))){_.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,_.matrixWorld);const I=t.update(_),G=_.material;if(Array.isArray(G)){const H=I.groups;for(let W=0,st=H.length;W<st;W++){const J=H[W],nt=G[J.materialIndex];if(nt&&nt.visible){const ut=E(_,nt,w,A);_.onBeforeShadow(i,_,f,v,I,ut,J),i.renderBufferDirect(v,null,I,ut,_,J),_.onAfterShadow(i,_,f,v,I,ut,J)}}}else if(G.visible){const H=E(_,G,w,A);_.onBeforeShadow(i,_,f,v,I,H,null),i.renderBufferDirect(v,null,I,H,_,null),_.onAfterShadow(i,_,f,v,I,H,null)}}const U=_.children;for(let I=0,G=U.length;I<G;I++)R(U[I],f,v,w,T,A)}function S(_){_.target.removeEventListener("dispose",S);for(const v in l){const w=l[v],T=_.target.uuid;T in w&&(w[T].dispose(),delete w[T])}}}function mg(i,t){function e(){let B=!1;const ot=new Ve;let tt=null;const xt=new Ve(0,0,0,0);return{setMask:function(gt){tt!==gt&&!B&&(i.colorMask(gt,gt,gt,gt),tt=gt)},setLocked:function(gt){B=gt},setClear:function(gt,vt,Bt,ee,dt){dt===!0&&(gt*=ee,vt*=ee,Bt*=ee),ot.set(gt,vt,Bt,ee),xt.equals(ot)===!1&&(i.clearColor(gt,vt,Bt,ee),xt.copy(ot))},reset:function(){B=!1,tt=null,xt.set(-1,0,0,0)}}}function n(){let B=!1,ot=!1,tt=null,xt=null,gt=null;return{setReversed:function(vt){if(ot!==vt){const Bt=t.get("EXT_clip_control");vt?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),ot=vt;const ee=gt;gt=null,this.setClear(ee)}},getReversed:function(){return ot},setTest:function(vt){vt?wt(i.DEPTH_TEST):Wt(i.DEPTH_TEST)},setMask:function(vt){tt!==vt&&!B&&(i.depthMask(vt),tt=vt)},setFunc:function(vt){if(ot&&(vt=Gh[vt]),xt!==vt){switch(vt){case io:i.depthFunc(i.NEVER);break;case so:i.depthFunc(i.ALWAYS);break;case ro:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case ao:i.depthFunc(i.GEQUAL);break;case lo:i.depthFunc(i.GREATER);break;case co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xt=vt}},setLocked:function(vt){B=vt},setClear:function(vt){gt!==vt&&(gt=vt,ot&&(vt=1-vt),i.clearDepth(vt))},reset:function(){B=!1,tt=null,xt=null,gt=null,ot=!1}}}function s(){let B=!1,ot=null,tt=null,xt=null,gt=null,vt=null,Bt=null,ee=null,dt=null;return{setTest:function(Ut){B||(Ut?wt(i.STENCIL_TEST):Wt(i.STENCIL_TEST))},setMask:function(Ut){ot!==Ut&&!B&&(i.stencilMask(Ut),ot=Ut)},setFunc:function(Ut,Xt,Mt){(tt!==Ut||xt!==Xt||gt!==Mt)&&(i.stencilFunc(Ut,Xt,Mt),tt=Ut,xt=Xt,gt=Mt)},setOp:function(Ut,Xt,Mt){(vt!==Ut||Bt!==Xt||ee!==Mt)&&(i.stencilOp(Ut,Xt,Mt),vt=Ut,Bt=Xt,ee=Mt)},setLocked:function(Ut){B=Ut},setClear:function(Ut){dt!==Ut&&(i.clearStencil(Ut),dt=Ut)},reset:function(){B=!1,ot=null,tt=null,xt=null,gt=null,vt=null,Bt=null,ee=null,dt=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let d={},g={},p={},m=new WeakMap,x=[],M=null,u=!1,h=null,b=null,E=null,R=null,S=null,_=null,f=null,v=new ie(0,0,0),w=0,T=!1,A=null,D=null,U=null,I=null,G=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,st=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(J)[1]),W=st>=1):J.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),W=st>=2);let nt=null,ut={};const mt=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),$=new Ve().fromArray(mt),pt=new Ve().fromArray(Pt);function bt(B,ot,tt,xt){const gt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(B,vt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<tt;Bt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,xt,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(ot+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return vt}const Nt={};Nt[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Nt[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Nt[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),wt(i.DEPTH_TEST),o.setFunc(Ns),ue(!1),$t(Va),wt(i.CULL_FACE),Rt(us);function wt(B){d[B]!==!0&&(i.enable(B),d[B]=!0)}function Wt(B){d[B]!==!1&&(i.disable(B),d[B]=!1)}function at(B,ot){return p[B]!==ot?(i.bindFramebuffer(B,ot),p[B]=ot,B===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=ot),B===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function At(B,ot){let tt=x,xt=!1;if(B){tt=m.get(ot),tt===void 0&&(tt=[],m.set(ot,tt));const gt=B.textures;if(tt.length!==gt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Bt=gt.length;vt<Bt;vt++)tt[vt]=i.COLOR_ATTACHMENT0+vt;tt.length=gt.length,xt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,xt=!0);xt&&i.drawBuffers(tt)}function ce(B){return M!==B?(i.useProgram(B),M=B,!0):!1}const ve={[as]:i.FUNC_ADD,[su]:i.FUNC_SUBTRACT,[ru]:i.FUNC_REVERSE_SUBTRACT};ve[ou]=i.MIN,ve[au]=i.MAX;const Jt={[lu]:i.ZERO,[cu]:i.ONE,[uu]:i.SRC_COLOR,[el]:i.SRC_ALPHA,[gu]:i.SRC_ALPHA_SATURATE,[pu]:i.DST_COLOR,[fu]:i.DST_ALPHA,[hu]:i.ONE_MINUS_SRC_COLOR,[nl]:i.ONE_MINUS_SRC_ALPHA,[mu]:i.ONE_MINUS_DST_COLOR,[du]:i.ONE_MINUS_DST_ALPHA,[_u]:i.CONSTANT_COLOR,[xu]:i.ONE_MINUS_CONSTANT_COLOR,[vu]:i.CONSTANT_ALPHA,[Mu]:i.ONE_MINUS_CONSTANT_ALPHA};function Rt(B,ot,tt,xt,gt,vt,Bt,ee,dt,Ut){if(B===us){u===!0&&(Wt(i.BLEND),u=!1);return}if(u===!1&&(wt(i.BLEND),u=!0),B!==iu){if(B!==h||Ut!==T){if((b!==as||S!==as)&&(i.blendEquation(i.FUNC_ADD),b=as,S=as),Ut)switch(B){case Ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hr:i.blendFunc(i.ONE,i.ONE);break;case Wa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Se("WebGLState: Invalid blending: ",B);break}else switch(B){case Ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wa:Se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xa:Se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Se("WebGLState: Invalid blending: ",B);break}E=null,R=null,_=null,f=null,v.set(0,0,0),w=0,h=B,T=Ut}return}gt=gt||ot,vt=vt||tt,Bt=Bt||xt,(ot!==b||gt!==S)&&(i.blendEquationSeparate(ve[ot],ve[gt]),b=ot,S=gt),(tt!==E||xt!==R||vt!==_||Bt!==f)&&(i.blendFuncSeparate(Jt[tt],Jt[xt],Jt[vt],Jt[Bt]),E=tt,R=xt,_=vt,f=Bt),(ee.equals(v)===!1||dt!==w)&&(i.blendColor(ee.r,ee.g,ee.b,dt),v.copy(ee),w=dt),h=B,T=!1}function Yt(B,ot){B.side===gn?Wt(i.CULL_FACE):wt(i.CULL_FACE);let tt=B.side===yn;ot&&(tt=!tt),ue(tt),B.blending===Ls&&B.transparent===!1?Rt(us):Rt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const xt=B.stencilWrite;a.setTest(xt),xt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),we(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):Wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(B){A!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),A=B)}function $t(B){B!==tu?(wt(i.CULL_FACE),B!==D&&(B===Va?i.cullFace(i.BACK):B===eu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Wt(i.CULL_FACE),D=B}function me(B){B!==U&&(W&&i.lineWidth(B),U=B)}function we(B,ot,tt){B?(wt(i.POLYGON_OFFSET_FILL),(I!==ot||G!==tt)&&(I=ot,G=tt,o.getReversed()&&(ot=-ot,tt=-tt),i.polygonOffset(ot,tt))):Wt(i.POLYGON_OFFSET_FILL)}function We(B){B?wt(i.SCISSOR_TEST):Wt(i.SCISSOR_TEST)}function Qt(B){B===void 0&&(B=i.TEXTURE0+H-1),nt!==B&&(i.activeTexture(B),nt=B)}function de(B,ot,tt){tt===void 0&&(nt===null?tt=i.TEXTURE0+H-1:tt=nt);let xt=ut[tt];xt===void 0&&(xt={type:void 0,texture:void 0},ut[tt]=xt),(xt.type!==B||xt.texture!==ot)&&(nt!==tt&&(i.activeTexture(tt),nt=tt),i.bindTexture(B,ot||Nt[B]),xt.type=B,xt.texture=ot)}function k(){const B=ut[nt];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function qe(){try{i.compressedTexImage2D(...arguments)}catch(B){Se("WebGLState:",B)}}function be(){try{i.compressedTexImage3D(...arguments)}catch(B){Se("WebGLState:",B)}}function Ee(){try{i.texSubImage2D(...arguments)}catch(B){Se("WebGLState:",B)}}function Et(){try{i.texSubImage3D(...arguments)}catch(B){Se("WebGLState:",B)}}function Le(){try{i.compressedTexSubImage2D(...arguments)}catch(B){Se("WebGLState:",B)}}function qt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){Se("WebGLState:",B)}}function jt(){try{i.texStorage2D(...arguments)}catch(B){Se("WebGLState:",B)}}function N(){try{i.texStorage3D(...arguments)}catch(B){Se("WebGLState:",B)}}function C(){try{i.texImage2D(...arguments)}catch(B){Se("WebGLState:",B)}}function Z(){try{i.texImage3D(...arguments)}catch(B){Se("WebGLState:",B)}}function ht(B){return g[B]!==void 0?g[B]:i.getParameter(B)}function ct(B,ot){g[B]!==ot&&(i.pixelStorei(B,ot),g[B]=ot)}function St(B){$.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),$.copy(B))}function Tt(B){pt.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),pt.copy(B))}function rt(B,ot){let tt=l.get(ot);tt===void 0&&(tt=new WeakMap,l.set(ot,tt));let xt=tt.get(B);xt===void 0&&(xt=i.getUniformBlockIndex(ot,B.name),i.uniformBlockBinding(ot,xt,xt),tt.set(B,xt))}function it(B,ot,tt){const gt=l.get(ot).get(B);c[gt]!==tt&&(i.bindBufferBase(i.UNIFORM_BUFFER,gt,tt),c[gt]=tt)}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},g={},nt=null,ut={},p={},c={},m=new WeakMap,x=[],M=null,u=!1,h=null,b=null,E=null,R=null,S=null,_=null,f=null,v=new ie(0,0,0),w=0,T=!1,A=null,D=null,U=null,I=null,G=null,$.set(0,0,i.canvas.width,i.canvas.height),pt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:wt,disable:Wt,bindFramebuffer:at,drawBuffers:At,useProgram:ce,setBlending:Rt,setMaterial:Yt,setFlipSided:ue,setCullFace:$t,setLineWidth:me,setPolygonOffset:we,setScissorTest:We,activeTexture:Qt,bindTexture:de,unbindTexture:k,compressedTexImage2D:qe,compressedTexImage3D:be,texImage2D:C,texImage3D:Z,pixelStorei:ct,getParameter:ht,updateUBOMapping:rt,uniformBlockBinding:it,texStorage2D:jt,texStorage3D:N,texSubImage2D:Ee,texSubImage3D:Et,compressedTexSubImage2D:Le,compressedTexSubImage3D:qt,scissor:St,viewport:Tt,reset:lt}}function gg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ot,d=new WeakMap,g=new Set;let p;const m=new WeakMap,x=new Set,M=new FinalizationRegistry(N=>x.delete(N));let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(N,C){return u?new OffscreenCanvas(N,C):Wo("canvas")}function b(N,C,Z){let ht=1;const ct=jt(N);if((ct.width>Z||ct.height>Z)&&(ht=Z/Math.max(ct.width,ct.height)),ht<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const St=Math.floor(ht*ct.width),Tt=Math.floor(ht*ct.height);p===void 0&&(p=h(St,Tt));const rt=C?h(St,Tt):p;return rt.width=St,rt.height=Tt,rt.getContext("2d").drawImage(N,0,0,St,Tt),Kt("WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+St+"x"+Tt+")."),rt}else return"data"in N&&Kt("WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),N;return N}function E(N){return N.generateMipmaps}function R(N){i.generateMipmap(N)}function S(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(N,C,Z,ht,ct,St=!1){if(N!==null){if(i[N]!==void 0)return i[N];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Tt;ht&&(Tt=t.get("EXT_texture_norm16"),Tt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=C;if(C===i.RED&&(Z===i.FLOAT&&(rt=i.R32F),Z===i.HALF_FLOAT&&(rt=i.R16F),Z===i.UNSIGNED_BYTE&&(rt=i.R8),Z===i.UNSIGNED_SHORT&&Tt&&(rt=Tt.R16_EXT),Z===i.SHORT&&Tt&&(rt=Tt.R16_SNORM_EXT)),C===i.RED_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.R8UI),Z===i.UNSIGNED_SHORT&&(rt=i.R16UI),Z===i.UNSIGNED_INT&&(rt=i.R32UI),Z===i.BYTE&&(rt=i.R8I),Z===i.SHORT&&(rt=i.R16I),Z===i.INT&&(rt=i.R32I)),C===i.RG&&(Z===i.FLOAT&&(rt=i.RG32F),Z===i.HALF_FLOAT&&(rt=i.RG16F),Z===i.UNSIGNED_BYTE&&(rt=i.RG8),Z===i.UNSIGNED_SHORT&&Tt&&(rt=Tt.RG16_EXT),Z===i.SHORT&&Tt&&(rt=Tt.RG16_SNORM_EXT)),C===i.RG_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RG8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RG16UI),Z===i.UNSIGNED_INT&&(rt=i.RG32UI),Z===i.BYTE&&(rt=i.RG8I),Z===i.SHORT&&(rt=i.RG16I),Z===i.INT&&(rt=i.RG32I)),C===i.RGB_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),Z===i.UNSIGNED_INT&&(rt=i.RGB32UI),Z===i.BYTE&&(rt=i.RGB8I),Z===i.SHORT&&(rt=i.RGB16I),Z===i.INT&&(rt=i.RGB32I)),C===i.RGBA_INTEGER&&(Z===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),Z===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),Z===i.UNSIGNED_INT&&(rt=i.RGBA32UI),Z===i.BYTE&&(rt=i.RGBA8I),Z===i.SHORT&&(rt=i.RGBA16I),Z===i.INT&&(rt=i.RGBA32I)),C===i.RGB&&(Z===i.UNSIGNED_SHORT&&Tt&&(rt=Tt.RGB16_EXT),Z===i.SHORT&&Tt&&(rt=Tt.RGB16_SNORM_EXT),Z===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),Z===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),C===i.RGBA){const it=St?mr:_e.getTransfer(ct);Z===i.FLOAT&&(rt=i.RGBA32F),Z===i.HALF_FLOAT&&(rt=i.RGBA16F),Z===i.UNSIGNED_BYTE&&(rt=it===Pe?i.SRGB8_ALPHA8:i.RGBA8),Z===i.UNSIGNED_SHORT&&Tt&&(rt=Tt.RGBA16_EXT),Z===i.SHORT&&Tt&&(rt=Tt.RGBA16_SNORM_EXT),Z===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),Z===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function f(N,C){let Z;return N?C===null||C===Qn||C===fs?Z=i.DEPTH24_STENCIL8:C===kn?Z=i.DEPTH32F_STENCIL8:C===Fs&&(Z=i.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Qn||C===fs?Z=i.DEPTH_COMPONENT24:C===kn?Z=i.DEPTH_COMPONENT32F:C===Fs&&(Z=i.DEPTH_COMPONENT16),Z}function v(N,C){return E(N)===!0||N.isFramebufferTexture&&N.minFilter!==ln&&N.minFilter!==Sn?Math.log2(Math.max(C.width,C.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?C.mipmaps.length:1}function w(N){const C=new WeakRef(N);n.get(N).__ref=C,x.add(C),M.register(N,C,C)}function T(N){const C=n.get(N).__ref;C!==void 0&&(x.delete(C),M.unregister(C))}function A(N){U(N.target)}function D(N){I(N.target)}function U(N){N.removeEventListener("dispose",A),T(N),H(N),N.isVideoTexture&&d.delete(N),N.isHTMLTexture&&g.delete(N)}function I(N){N.removeEventListener("dispose",D),T(N),st(N)}function G(){for(const N of x){const C=N.deref();C!==void 0&&(C.isRenderTarget===!0?I(C):U(C))}x.clear(),g.clear()}function H(N){const C=n.get(N);if(C.__webglInit===void 0)return;const Z=N.source,ht=m.get(Z);if(ht){const ct=ht[C.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&W(N),Object.keys(ht).length===0&&m.delete(Z)}n.remove(N)}function W(N){const C=n.get(N);i.deleteTexture(C.__webglTexture);const Z=N.source,ht=m.get(Z);delete ht[C.__cacheKey],o.memory.textures--}function st(N){const C=n.get(N);C.__depthDisposeCallback&&C.__depthDisposeCallback();const Z=N.depthTexture;if(Z&&Z.renderTarget===N&&U(Z),N.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(C.__webglFramebuffer[ct]))for(let St=0;St<C.__webglFramebuffer[ct].length;St++)i.deleteFramebuffer(C.__webglFramebuffer[ct][St]);else i.deleteFramebuffer(C.__webglFramebuffer[ct]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[ct])}else{if(Array.isArray(C.__webglFramebuffer))for(let ct=0;ct<C.__webglFramebuffer.length;ct++)i.deleteFramebuffer(C.__webglFramebuffer[ct]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ct=0;ct<C.__webglColorRenderbuffer.length;ct++)C.__webglColorRenderbuffer[ct]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[ct]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const ht=N.textures;for(let ct=0,St=ht.length;ct<St;ct++){const Tt=n.get(ht[ct]);Tt.__webglTexture&&(i.deleteTexture(Tt.__webglTexture),o.memory.textures--),n.remove(ht[ct])}n.remove(N)}let J=0;function nt(){J=0}function ut(){return J}function mt(N){J=N}function Pt(){const N=J;return N>=s.maxTextures&&Kt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),J+=1,N}function $(N){const C=[];return C.push(N.wrapS),C.push(N.wrapT),C.push(N.wrapR||0),C.push(N.magFilter),C.push(N.minFilter),C.push(N.anisotropy),C.push(N.internalFormat),C.push(N.format),C.push(N.type),C.push(N.generateMipmaps),C.push(N.mipmapsAutoUpdate),C.push(N.premultiplyAlpha),C.push(N.flipY),C.push(N.unpackAlignment),C.push(N.colorSpace),C.join()}function pt(N,C){const Z=n.get(N);if(N.isVideoTexture&&Le(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Z.__version!==N.version){const ht=N.image;if(ht===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{Yt(Z,N,C);return}}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Z.__webglTexture,i.TEXTURE0+C)}function bt(N,C){const Z=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){Yt(Z,N,C);return}else N.isExternalTexture&&(Z.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Z.__webglTexture,i.TEXTURE0+C)}function Nt(N,C){const Z=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Z.__version!==N.version){Yt(Z,N,C);return}e.bindTexture(i.TEXTURE_3D,Z.__webglTexture,i.TEXTURE0+C)}function wt(N,C){const Z=n.get(N);if(N.version>0&&Z.__version!==N.version){ue(Z,N,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+C)}const Wt={[uo]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[ho]:i.MIRRORED_REPEAT},at={[ln]:i.NEAREST,[bu]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[jr]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},At={[Au]:i.NEVER,[vl]:i.ALWAYS,[Ru]:i.LESS,[_l]:i.LEQUAL,[Cu]:i.EQUAL,[xl]:i.GEQUAL,[Pu]:i.GREATER,[Du]:i.NOTEQUAL};function ce(N,C){if(C.type===kn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===Sn||C.magFilter===jr||C.magFilter===js||C.magFilter===Ti||C.minFilter===Sn||C.minFilter===jr||C.minFilter===js||C.minFilter===Ti)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Wt[C.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Wt[C.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Wt[C.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,at[C.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,at[C.minFilter]),C.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,At[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===ln||C.minFilter!==js&&C.minFilter!==Ti||C.type===kn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const Z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function ve(N,C){let Z=!1;N.__webglInit===void 0&&(N.__webglInit=!0,C.addEventListener("dispose",A),w(C));const ht=C.source;let ct=m.get(ht);ct===void 0&&(ct={},m.set(ht,ct));const St=$(C);if(St!==N.__cacheKey){ct[St]===void 0&&(ct[St]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),ct[St].usedTimes++;const Tt=ct[N.__cacheKey];Tt!==void 0&&(ct[N.__cacheKey].usedTimes--,Tt.usedTimes===0&&W(C)),N.__cacheKey=St,N.__webglTexture=ct[St].texture}return Z}function Jt(N,C,Z){return Math.floor(Math.floor(N/Z)/C)}function Rt(N,C,Z,ht){const St=N.updateRanges;if(St.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,C.width,C.height,Z,ht,C.data);else{St.sort((B,ot)=>B.start-ot.start);let Tt=0;for(let B=1;B<St.length;B++){const ot=St[Tt],tt=St[B],xt=ot.start+ot.count,gt=Jt(tt.start,C.width,4),vt=Jt(ot.start,C.width,4);tt.start<=xt+1&&gt===vt&&Jt(tt.start+tt.count-1,C.width,4)===gt?ot.count=Math.max(ot.count,tt.start+tt.count-ot.start):(++Tt,St[Tt]=tt)}St.length=Tt+1;const rt=e.getParameter(i.UNPACK_ROW_LENGTH),it=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,C.width);for(let B=0,ot=St.length;B<ot;B++){const tt=St[B],xt=Math.floor(tt.start/4),gt=Math.ceil(tt.count/4),vt=xt%C.width,Bt=Math.floor(xt/C.width),ee=gt,dt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Bt),e.texSubImage2D(i.TEXTURE_2D,0,vt,Bt,ee,dt,Z,ht,C.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,rt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,it),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Yt(N,C,Z){let ht=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ht=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ht=i.TEXTURE_3D);const ct=ve(N,C),St=C.source;e.bindTexture(ht,N.__webglTexture,i.TEXTURE0+Z);const Tt=n.get(St);if(St.version!==Tt.__version||ct===!0){if(e.activeTexture(i.TEXTURE0+Z),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const dt=_e.getPrimaries(_e.workingColorSpace),Ut=C.colorSpace===Ei?null:_e.getPrimaries(C.colorSpace),Xt=C.colorSpace===Ei||dt===Ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt)}e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment);let it=b(C.image,!1,s.maxTextureSize);it=qt(C,it);const lt=r.convert(C.format,C.colorSpace),B=r.convert(C.type);let ot=_(C.internalFormat,lt,B,C.normalized,C.colorSpace,C.isVideoTexture);ce(ht,C);let tt;const xt=C.mipmaps,gt=C.isVideoTexture!==!0,vt=Tt.__version===void 0||ct===!0,Bt=St.dataReady,ee=v(C,it);if(C.isDepthTexture)ot=f(C.format===wi,C.type),vt&&(gt?e.texStorage2D(i.TEXTURE_2D,1,ot,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,ot,it.width,it.height,0,lt,B,null));else if(C.isDataTexture)if(xt.length>0){gt&&vt&&e.texStorage2D(i.TEXTURE_2D,ee,ot,xt[0].width,xt[0].height);for(let dt=0,Ut=xt.length;dt<Ut;dt++)tt=xt[dt],gt?Bt&&e.texSubImage2D(i.TEXTURE_2D,dt,0,0,tt.width,tt.height,lt,B,tt.data):e.texImage2D(i.TEXTURE_2D,dt,ot,tt.width,tt.height,0,lt,B,tt.data);C.generateMipmaps=!1}else gt?(vt&&e.texStorage2D(i.TEXTURE_2D,ee,ot,it.width,it.height),Bt&&Rt(C,it,lt,B)):e.texImage2D(i.TEXTURE_2D,0,ot,it.width,it.height,0,lt,B,it.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){gt&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,ot,xt[0].width,xt[0].height,it.depth);for(let dt=0,Ut=xt.length;dt<Ut;dt++)if(tt=xt[dt],C.format!==Jn)if(lt!==null)if(gt){if(Bt)if(C.layerUpdates.size>0){const Xt=Ac(tt.width,tt.height,C.format,C.type);for(const Mt of C.layerUpdates){const oe=tt.data.subarray(Mt*Xt/tt.data.BYTES_PER_ELEMENT,(Mt+1)*Xt/tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,dt,0,0,Mt,tt.width,tt.height,1,lt,oe)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,dt,0,0,0,tt.width,tt.height,it.depth,lt,tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,dt,ot,tt.width,tt.height,it.depth,0,tt.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?Bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,dt,0,0,0,tt.width,tt.height,it.depth,lt,B,tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,dt,ot,tt.width,tt.height,it.depth,0,lt,B,tt.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{gt&&vt&&e.texStorage2D(i.TEXTURE_2D,ee,ot,xt[0].width,xt[0].height);for(let dt=0,Ut=xt.length;dt<Ut;dt++)tt=xt[dt],C.format!==Jn?lt!==null?gt?Bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,dt,0,0,tt.width,tt.height,lt,tt.data):e.compressedTexImage2D(i.TEXTURE_2D,dt,ot,tt.width,tt.height,0,tt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?Bt&&e.texSubImage2D(i.TEXTURE_2D,dt,0,0,tt.width,tt.height,lt,B,tt.data):e.texImage2D(i.TEXTURE_2D,dt,ot,tt.width,tt.height,0,lt,B,tt.data)}else if(C.isDataArrayTexture)if(gt){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,ot,it.width,it.height,it.depth),Bt)if(C.layerUpdates.size>0){const dt=Ac(it.width,it.height,C.format,C.type);for(const Ut of C.layerUpdates){const Xt=it.data.subarray(Ut*dt/it.data.BYTES_PER_ELEMENT,(Ut+1)*dt/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ut,it.width,it.height,1,lt,B,Xt)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,lt,B,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ot,it.width,it.height,it.depth,0,lt,B,it.data);else if(C.isData3DTexture)gt?(vt&&e.texStorage3D(i.TEXTURE_3D,ee,ot,it.width,it.height,it.depth),Bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,lt,B,it.data)):e.texImage3D(i.TEXTURE_3D,0,ot,it.width,it.height,it.depth,0,lt,B,it.data);else if(C.isFramebufferTexture){if(vt)if(gt)e.texStorage2D(i.TEXTURE_2D,ee,ot,it.width,it.height);else{let dt=it.width,Ut=it.height;for(let Xt=0;Xt<ee;Xt++)e.texImage2D(i.TEXTURE_2D,Xt,ot,dt,Ut,0,lt,B,null),dt>>=1,Ut>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in i){const dt=i.canvas;if(dt.hasAttribute("layoutsubtree")||dt.setAttribute("layoutsubtree","true"),it.parentNode!==dt){dt.appendChild(it),g.add(C),dt.onpaint=Ut=>{const Xt=Ut.changedElements;for(const Mt of g)Xt.includes(Mt.image)&&(Mt.needsUpdate=!0)},dt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,it);else{const Xt=i.RGBA,Mt=i.RGBA,oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Xt,Mt,oe,it)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xt.length>0){if(gt&&vt){const dt=jt(xt[0]);e.texStorage2D(i.TEXTURE_2D,ee,ot,dt.width,dt.height)}for(let dt=0,Ut=xt.length;dt<Ut;dt++)tt=xt[dt],gt?Bt&&e.texSubImage2D(i.TEXTURE_2D,dt,0,0,lt,B,tt):e.texImage2D(i.TEXTURE_2D,dt,ot,lt,B,tt);C.generateMipmaps=!1}else if(gt){if(vt){const dt=jt(it);e.texStorage2D(i.TEXTURE_2D,ee,ot,dt.width,dt.height)}Bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,B,it)}else e.texImage2D(i.TEXTURE_2D,0,ot,lt,B,it);E(C)&&C.mipmapsAutoUpdate===!0&&R(ht),Tt.__version=St.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function ue(N,C,Z){if(C.image.length!==6)return;const ht=ve(N,C),ct=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+Z);const St=n.get(ct);if(ct.version!==St.__version||ht===!0){e.activeTexture(i.TEXTURE0+Z);const Tt=_e.getPrimaries(_e.workingColorSpace),rt=C.colorSpace===Ei?null:_e.getPrimaries(C.colorSpace),it=C.colorSpace===Ei||Tt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);const lt=C.isCompressedTexture||C.image[0].isCompressedTexture,B=C.image[0]&&C.image[0].isDataTexture,ot=[];for(let Mt=0;Mt<6;Mt++)!lt&&!B?ot[Mt]=b(C.image[Mt],!0,s.maxCubemapSize):ot[Mt]=B?C.image[Mt].image:C.image[Mt],ot[Mt]=qt(C,ot[Mt]);const tt=ot[0],xt=r.convert(C.format,C.colorSpace),gt=r.convert(C.type);let vt=_(C.internalFormat,xt,gt,C.normalized,C.colorSpace);const Bt=C.isVideoTexture!==!0,ee=St.__version===void 0||ht===!0,dt=ct.dataReady;let Ut=v(C,tt);ce(i.TEXTURE_CUBE_MAP,C);let Xt;if(C.isDepthTexture){if(vt=f(C.format===wi,C.type),ee)if(Bt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,vt,tt.width,tt.height);else for(let Mt=0;Mt<6;Mt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,vt,tt.width,tt.height,0,xt,gt,null)}else if(lt){Bt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ut,vt,tt.width,tt.height);for(let Mt=0;Mt<6;Mt++){Xt=ot[Mt].mipmaps;for(let oe=0;oe<Xt.length;oe++){const He=Xt[oe];C.format!==Jn?xt!==null?Bt?dt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe,0,0,He.width,He.height,xt,He.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe,vt,He.width,He.height,0,He.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe,0,0,He.width,He.height,xt,gt,He.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe,vt,He.width,He.height,0,xt,gt,He.data)}}}else{if(Xt=C.mipmaps,Bt&&ee){Xt.length>0&&Ut++;const Mt=jt(ot[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ut,vt,Mt.width,Mt.height)}for(let Mt=0;Mt<6;Mt++)if(B){Bt?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,ot[Mt].width,ot[Mt].height,xt,gt,ot[Mt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,vt,ot[Mt].width,ot[Mt].height,0,xt,gt,ot[Mt].data);for(let oe=0;oe<Xt.length;oe++){const Un=Xt[oe].image[Mt].image;Bt?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe+1,0,0,Un.width,Un.height,xt,gt,Un.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe+1,vt,Un.width,Un.height,0,xt,gt,Un.data)}}else{Bt?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,0,0,xt,gt,ot[Mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,vt,xt,gt,ot[Mt]);for(let oe=0;oe<Xt.length;oe++){const He=Xt[oe];Bt?dt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe+1,0,0,xt,gt,He.image[Mt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,oe+1,vt,xt,gt,He.image[Mt])}}}E(C)&&C.mipmapsAutoUpdate===!0&&R(i.TEXTURE_CUBE_MAP),St.__version=ct.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function $t(N,C,Z,ht,ct,St){const Tt=r.convert(Z.format,Z.colorSpace),rt=r.convert(Z.type),it=_(Z.internalFormat,Tt,rt,Z.normalized,Z.colorSpace),lt=n.get(C),B=n.get(Z);if(B.__renderTarget=C,!lt.__hasExternalTextures){const ot=Math.max(1,C.width>>St),tt=Math.max(1,C.height>>St);ct===i.TEXTURE_3D||ct===i.TEXTURE_2D_ARRAY?e.texImage3D(ct,St,it,ot,tt,C.depth,0,Tt,rt,null):e.texImage2D(ct,St,it,ot,tt,0,Tt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),Et(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,ct,B.__webglTexture,0,Ee(C)):(ct===i.TEXTURE_2D||ct>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ht,ct,B.__webglTexture,St),e.bindFramebuffer(i.FRAMEBUFFER,null)}function me(N,C,Z){if(i.bindRenderbuffer(i.RENDERBUFFER,N),C.depthBuffer){const ht=C.depthTexture,ct=ht&&ht.isDepthTexture?ht.type:null,St=f(C.stencilBuffer,ct),Tt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Et(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(C),St,C.width,C.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(C),St,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,St,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,N)}else{const ht=C.textures;for(let ct=0;ct<ht.length;ct++){const St=ht[ct],Tt=r.convert(St.format,St.colorSpace),rt=r.convert(St.type),it=_(St.internalFormat,Tt,rt,St.normalized,St.colorSpace);Et(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(C),it,C.width,C.height):Z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(C),it,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,it,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(N,C,Z){const ht=C.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ct=n.get(C.depthTexture);ct.__renderTarget=C;const St=ht?C.depthTexture.image[0]:C.depthTexture.image;(!ct.__webglTexture||St.width!==C.width||St.height!==C.height)&&(St.width=C.width,St.height=C.height,C.depthTexture.needsUpdate=!0),ht?wt(C.depthTexture,0):pt(C.depthTexture,0);const Tt=ct.__webglTexture,rt=Ee(C),it=ht?i.TEXTURE_CUBE_MAP_POSITIVE_X+Z:i.TEXTURE_2D,lt=C.depthTexture.format===wi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(C.depthTexture.format===Ci)Et(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,it,Tt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,lt,it,Tt,0);else if(C.depthTexture.format===wi)Et(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,it,Tt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,lt,it,Tt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(N){const C=n.get(N),Z=N.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==N.depthTexture){const ht=N.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ht){const ct=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ht.removeEventListener("dispose",ct)};ht.addEventListener("dispose",ct),C.__depthDisposeCallback=ct}C.__boundDepthTexture=ht}if(N.depthTexture&&!C.__autoAllocateDepthBuffer)if(Z)for(let ht=0;ht<6;ht++)we(C.__webglFramebuffer[ht],N,ht);else N.texture.mipmaps.length>0?we(C.__webglFramebuffer[0],N,0):we(C.__webglFramebuffer,N,0);else if(Z){C.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[ht]),C.__webglDepthbuffer[ht]===void 0)C.__webglDepthbuffer[ht]=i.createRenderbuffer(),me(C.__webglDepthbuffer[ht],N,!1);else{const ct=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=C.__webglDepthbuffer[ht];i.bindRenderbuffer(i.RENDERBUFFER,St),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,St)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),me(C.__webglDepthbuffer,N,!1);else{const ct=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,St),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,St)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Qt(N,C,Z){const ht=n.get(N);C!==void 0&&$t(ht.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Z!==void 0&&We(N)}function de(N){const C=N.texture,Z=n.get(N),ht=n.get(C);N.addEventListener("dispose",D),w(N);const ct=N.textures,St=N.isWebGLCubeRenderTarget===!0,Tt=ct.length>1;if(Tt||(ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture()),ht.__version=C.version,o.memory.textures++),St){Z.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0){Z.__webglFramebuffer[rt]=[];for(let it=0;it<C.mipmaps.length;it++)Z.__webglFramebuffer[rt][it]=i.createFramebuffer()}else Z.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(C.mipmaps.length>0){Z.__webglFramebuffer=[];for(let rt=0;rt<C.mipmaps.length;rt++)Z.__webglFramebuffer[rt]=i.createFramebuffer()}else Z.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let rt=0,it=ct.length;rt<it;rt++){const lt=n.get(ct[rt]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&Et(N)===!1){Z.__webglMultisampledFramebuffer=i.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let rt=0;rt<ct.length;rt++){const it=ct[rt];Z.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Z.__webglColorRenderbuffer[rt]);const lt=r.convert(it.format,it.colorSpace),B=r.convert(it.type),ot=_(it.internalFormat,lt,B,it.normalized,it.colorSpace,N.isXRRenderTarget===!0),tt=Ee(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,ot,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,Z.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(Z.__webglDepthRenderbuffer=i.createRenderbuffer(),me(Z.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(St){e.bindTexture(i.TEXTURE_CUBE_MAP,ht.__webglTexture),ce(i.TEXTURE_CUBE_MAP,C);for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0)for(let it=0;it<C.mipmaps.length;it++)$t(Z.__webglFramebuffer[rt][it],N,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,it);else $t(Z.__webglFramebuffer[rt],N,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);E(C)?R(i.TEXTURE_CUBE_MAP):C.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}else if(Tt){for(let rt=0,it=ct.length;rt<it;rt++){const lt=ct[rt],B=n.get(lt);let ot=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ot=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,B.__webglTexture),ce(ot,lt),$t(Z.__webglFramebuffer,N,lt,i.COLOR_ATTACHMENT0+rt,ot,0),E(lt)&&R(ot)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(rt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,ht.__webglTexture),ce(rt,C),C.mipmaps.length>0)for(let it=0;it<C.mipmaps.length;it++)$t(Z.__webglFramebuffer[it],N,C,i.COLOR_ATTACHMENT0,rt,it);else $t(Z.__webglFramebuffer,N,C,i.COLOR_ATTACHMENT0,rt,0);E(C)?R(rt):C.mipmaps.length>0&&i.texParameteri(rt,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&We(N)}function k(N){const C=N.textures;for(let Z=0,ht=C.length;Z<ht;Z++){const ct=C[Z];if(E(ct)&&ct.mipmapsAutoUpdate===!0){const St=S(N),Tt=n.get(ct).__webglTexture;e.bindTexture(St,Tt),R(St),e.unbindTexture()}}}const qe=[];function be(N){if(N.samples>0){if(Et(N)===!1){const C=N.textures,Z=N.width,ht=N.height;let ct=i.COLOR_BUFFER_BIT;const St=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(N),rt=C.length>1;if(rt)for(let lt=0;lt<C.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let lt=0;lt<C.length;lt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ct|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ct|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[lt]);const B=n.get(C[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,B,0)}i.blitFramebuffer(0,0,Z,ht,0,0,Z,ht,ct,i.NEAREST),c===!0&&(qe.length=0,qe.push(i.COLOR_ATTACHMENT0+lt),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&qe.push(St),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,qe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let lt=0;lt<C.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[lt]);const B=n.get(C[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,B,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const C=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function Ee(N){return Math.min(s.maxSamples,N.samples)}function Et(N){const C=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Le(N){const C=o.render.frame;d.get(N)!==C&&(d.set(N,C),N.update())}function qt(N,C){const Z=N.colorSpace,ht=N.format,ct=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Z!==pr&&Z!==Ei&&(_e.getTransfer(Z)===Pe?(ht!==Jn||ct!==Cn)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Se("WebGLTextures: Unsupported texture color space:",Z)),C}function jt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=Pt,this.resetTextureUnits=nt,this.getTextureUnits=ut,this.setTextureUnits=mt,this.setTexture2D=pt,this.setTexture2DArray=bt,this.setTexture3D=Nt,this.setTextureCube=wt,this.rebindTextures=Qt,this.setupRenderTarget=de,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=$t,this.useMultisampledRTT=Et,this.dispose=G}function Mh(i,t){function e(n,s=Ei){let r;const o=_e.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===hl)return i.BYTE;if(n===fl)return i.SHORT;if(n===Fs)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===jn)return i.HALF_FLOAT;if(n===ml)return i.ALPHA;if(n===gl)return i.RGB;if(n===Jn)return i.RGBA;if(n===Ci)return i.DEPTH_COMPONENT;if(n===wi)return i.DEPTH_STENCIL;if(n===ea)return i.RED;if(n===na)return i.RED_INTEGER;if(n===Xi)return i.RG;if(n===ia)return i.RG_INTEGER;if(n===sa)return i.RGBA_INTEGER;if(n===nr||n===ir||n===sr||n===rr)if(o===Pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fo||n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_o||n===xo||n===vo||n===Mo||n===So||n===fr||n===yo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_o||n===xo)return o===Pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Mo)return r.COMPRESSED_R11_EAC;if(n===So)return r.COMPRESSED_SIGNED_R11_EAC;if(n===fr)return r.COMPRESSED_RG11_EAC;if(n===yo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===bo||n===Eo||n===To||n===wo||n===Ao||n===Ro||n===Co||n===Po||n===Do||n===Lo||n===Io||n===No||n===Uo||n===Fo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Eo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===To)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ao)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Co)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Po)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Io)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fo)return o===Pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oo||n===Bo||n===zo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oo)return o===Pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Go||n===ko||n===dr||n===Ho)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ho)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const _g=`
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

}`;class vg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ll(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Yi({vertexShader:_g,fragmentShader:xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new Pi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Mg extends Di{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,g=null,p=null,m=null,x=null;const M=typeof XRWebGLBinding<"u",u=new vg,h={},b=e.getContextAttributes();let E=null,R=null;const S=[],_=[],f=new Ot;let v=null,w=null;const T=new zn;T.viewport=new Ve;const A=new zn;A.viewport=new Ve;const D=[T,A],U=new ah;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let pt=S[$];return pt===void 0&&(pt=new eo,S[$]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function($){let pt=S[$];return pt===void 0&&(pt=new eo,S[$]=pt),pt.getGripSpace()},this.getHand=function($){let pt=S[$];return pt===void 0&&(pt=new eo,S[$]=pt),pt.getHandSpace()};function H($){const pt=_.indexOf($.inputSource);if(pt===-1)return;const bt=S[pt];bt!==void 0&&(bt.update($.inputSource,$.frame,l||o),bt.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",st);for(let $=0;$<S.length;$++){const pt=_[$];pt!==null&&(_[$]=null,S[$].disconnect(pt))}I=null,G=null,u.reset();for(const $ in h)delete h[$];if(t.setRenderTarget(E),m=null,p=null,g=null,s=null,R=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(f.width,f.height,!1),w!==null){const $=w.camera;$.fov=w.fov,$.zoom=w.zoom,$.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return g===null&&M&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",st),b.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(f),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Nt=null,wt=null;b.depth&&(wt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=b.stencil?wi:Ci,Nt=b.stencil?fs:Qn);const Wt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};g=this.getBinding(),p=g.createProjectionLayer(Wt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),R=new $n(p.textureWidth,p.textureHeight,{format:Jn,type:Cn,depthTexture:new ds(p.textureWidth,p.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{const bt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),R=new $n(m.framebufferWidth,m.framebufferHeight,{format:Jn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Pt.setContext(s),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return u.getDepthTexture()};function st($){for(let pt=0;pt<$.removed.length;pt++){const bt=$.removed[pt],Nt=_.indexOf(bt);Nt>=0&&(_[Nt]=null,S[Nt].disconnect(bt))}for(let pt=0;pt<$.added.length;pt++){const bt=$.added[pt];let Nt=_.indexOf(bt);if(Nt===-1){for(let Wt=0;Wt<S.length;Wt++)if(Wt>=_.length){_.push(bt),Nt=Wt;break}else if(_[Wt]===null){_[Wt]=bt,Nt=Wt;break}if(Nt===-1)break}const wt=S[Nt];wt&&wt.connect(bt)}}function J($,pt){pt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(pt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let pt=$.near,bt=$.far;u.texture!==null&&(u.depthNear>0&&(pt=u.depthNear),u.depthFar>0&&(bt=u.depthFar)),U.near=A.near=T.near=pt,U.far=A.far=T.far=bt,(I!==U.near||G!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,G=U.far),U.layers.mask=$.layers.mask|6,T.layers.mask=U.layers.mask&-5,A.layers.mask=U.layers.mask&-3;const Nt=$.parent,wt=U.cameras;J(U,Nt);for(let Wt=0;Wt<wt.length;Wt++)J(wt[Wt],Nt);U.projectionMatrix.copy(T.projectionMatrix),U.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&$.isPerspectiveCamera&&(w={camera:$,fov:$.fov,zoom:$.zoom}),nt($,U,Nt)};function nt($,pt,bt){bt===null?$.matrix.copy(pt.matrixWorld):($.matrix.copy(bt.matrixWorld),$.matrix.invert(),$.matrix.multiply(pt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(pt.projectionMatrix),$.projectionMatrixInverse.copy(pt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=gr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function($){c=$,p!==null&&(p.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return u.texture!==null},this.getDepthSensingMesh=function(){return u.getMesh(U)},this.getCameraTexture=function($){return h[$]};let ut=null;function mt($,pt){if(d=pt.getViewerPose(l||o),x=pt,d!==null){const bt=d.views;m!==null&&(t.setRenderTargetFramebuffer(R,m.framebuffer),t.setRenderTarget(R));let Nt=!1;bt.length!==U.cameras.length&&(U.cameras.length=0,Nt=!0);for(let At=0;At<bt.length;At++){const ce=bt[At];let ve=null;if(m!==null)ve=m.getViewport(ce);else{const Rt=g.getViewSubImage(p,ce);ve=Rt.viewport,At===0&&(t.setRenderTargetTextures(R,Rt.colorTexture,Rt.depthStencilTexture),t.setRenderTarget(R))}let Jt=D[At];Jt===void 0&&(Jt=new zn,Jt.layers.enable(At),Jt.viewport=new Ve,D[At]=Jt),Jt.matrix.fromArray(ce.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(ce.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(ve.x,ve.y,ve.width,ve.height),At===0&&(U.matrix.copy(Jt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Nt===!0&&U.cameras.push(Jt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){g=n.getBinding();const At=g.getDepthInformation(bt[0]);At&&At.isValid&&At.texture&&u.init(At,s.renderState)}if(wt&&wt.includes("camera-access")&&M){t.state.unbindTexture(),g=n.getBinding();for(let At=0;At<bt.length;At++){const ce=bt[At].camera;if(ce){let ve=h[ce];ve||(ve=new Ll,h[ce]=ve);const Jt=g.getCameraImage(ce);ve.sourceTexture=Jt}}}}for(let bt=0;bt<S.length;bt++){const Nt=_[bt],wt=S[bt];Nt!==null&&wt!==void 0&&wt.update(Nt,pt,l||o)}ut&&ut($,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),x=null}const Pt=new uh;Pt.setAnimationLoop(mt),this.setAnimationLoop=function($){ut=$},this.dispose=function(){}}}const Sg=new xe,Sh=new ne;Sh.set(-1,0,0,0,1,0,0,0,1);function yg(i,t){function e(u,h){u.matrixAutoUpdate===!0&&u.updateMatrix(),h.value.copy(u.matrix)}function n(u,h){h.color.getRGB(u.fogColor.value,th(i)),h.isFog?(u.fogNear.value=h.near,u.fogFar.value=h.far):h.isFogExp2&&(u.fogDensity.value=h.density)}function s(u,h,b,E,R){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(u,h):h.isMeshLambertMaterial?(r(u,h),h.envMap&&(u.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(u,h),g(u,h)):h.isMeshPhongMaterial?(r(u,h),d(u,h),h.envMap&&(u.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(u,h),p(u,h),h.isMeshPhysicalMaterial&&m(u,h,R)):h.isMeshMatcapMaterial?(r(u,h),x(u,h)):h.isMeshDepthMaterial?r(u,h):h.isMeshDistanceMaterial?(r(u,h),M(u,h)):h.isMeshNormalMaterial?r(u,h):h.isLineBasicMaterial?(o(u,h),h.isLineDashedMaterial&&a(u,h)):h.isPointsMaterial?c(u,h,b,E):h.isSpriteMaterial?l(u,h):h.isShadowMaterial?(u.color.value.copy(h.color),u.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(u,h){u.opacity.value=h.opacity,h.color&&u.diffuse.value.copy(h.color),h.emissive&&u.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(u.map.value=h.map,e(h.map,u.mapTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,e(h.alphaMap,u.alphaMapTransform)),h.bumpMap&&(u.bumpMap.value=h.bumpMap,e(h.bumpMap,u.bumpMapTransform),u.bumpScale.value=h.bumpScale,h.side===yn&&(u.bumpScale.value*=-1)),h.normalMap&&(u.normalMap.value=h.normalMap,e(h.normalMap,u.normalMapTransform),u.normalScale.value.copy(h.normalScale),h.side===yn&&u.normalScale.value.negate()),h.displacementMap&&(u.displacementMap.value=h.displacementMap,e(h.displacementMap,u.displacementMapTransform),u.displacementScale.value=h.displacementScale,u.displacementBias.value=h.displacementBias),h.emissiveMap&&(u.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,u.emissiveMapTransform)),h.specularMap&&(u.specularMap.value=h.specularMap,e(h.specularMap,u.specularMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest);const b=t.get(h),E=b.envMap,R=b.envMapRotation;E&&(u.envMap.value=E,u.envMapRotation.value.setFromMatrix4(Sg.makeRotationFromEuler(R)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&u.envMapRotation.value.premultiply(Sh),u.reflectivity.value=h.reflectivity,u.ior.value=h.ior,u.refractionRatio.value=h.refractionRatio),h.lightMap&&(u.lightMap.value=h.lightMap,u.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,u.lightMapTransform)),h.aoMap&&(u.aoMap.value=h.aoMap,u.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,u.aoMapTransform))}function o(u,h){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,h.map&&(u.map.value=h.map,e(h.map,u.mapTransform))}function a(u,h){u.dashSize.value=h.dashSize,u.totalSize.value=h.dashSize+h.gapSize,u.scale.value=h.scale}function c(u,h,b,E){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,u.size.value=h.size*b,u.scale.value=E*.5,h.map&&(u.map.value=h.map,e(h.map,u.uvTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,e(h.alphaMap,u.alphaMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest)}function l(u,h){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,u.rotation.value=h.rotation,h.map&&(u.map.value=h.map,e(h.map,u.mapTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,e(h.alphaMap,u.alphaMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest)}function d(u,h){u.specular.value.copy(h.specular),u.shininess.value=Math.max(h.shininess,1e-4)}function g(u,h){h.gradientMap&&(u.gradientMap.value=h.gradientMap)}function p(u,h){u.metalness.value=h.metalness,h.metalnessMap&&(u.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,u.metalnessMapTransform)),u.roughness.value=h.roughness,h.roughnessMap&&(u.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,u.roughnessMapTransform)),h.envMap&&(u.envMapIntensity.value=h.envMapIntensity)}function m(u,h,b){u.ior.value=h.ior,h.diffuseRoughness>0&&(u.diffuseRoughness.value=h.diffuseRoughness,h.diffuseRoughnessMap&&(u.diffuseRoughnessMap.value=h.diffuseRoughnessMap,e(h.diffuseRoughnessMap,u.diffuseRoughnessMapTransform))),h.sheen>0&&(u.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),u.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(u.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,u.sheenColorMapTransform)),h.sheenRoughnessMap&&(u.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,u.sheenRoughnessMapTransform))),h.clearcoat>0&&(u.clearcoat.value=h.clearcoat,u.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(u.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,u.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(u.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===yn&&u.clearcoatNormalScale.value.negate())),h.dispersion>0&&(u.dispersion.value=h.dispersion),h.retroreflectivity>0&&(u.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(u.iridescence.value=h.iridescence,u.iridescenceIOR.value=h.iridescenceIOR,u.iridescenceThicknessMinimum.value=h.iridescenceThicknessMinimum,u.iridescenceThicknessMaximum.value=h.iridescenceThicknessMaximum,h.iridescenceMap&&(u.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,u.iridescenceMapTransform)),h.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),h.transmission>0&&(u.transmission.value=h.transmission,u.transmissionSamplerMap.value=b.texture,u.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(u.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,u.transmissionMapTransform)),u.thickness.value=h.thickness,h.thicknessMap&&(u.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=h.attenuationDistance,u.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(u.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(u.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=h.specularIntensity,u.specularColor.value.copy(h.specularColor),h.specularColorMap&&(u.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,u.specularColorMapTransform)),h.specularIntensityMap&&(u.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,u.specularIntensityMapTransform))}function x(u,h){h.matcap&&(u.matcap.value=h.matcap)}function M(u,h){const b=t.get(h).light;u.referencePosition.value.setFromMatrixPosition(b.matrixWorld),u.nearDistance.value=b.shadow.camera.near,u.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function bg(i,t,e,n){let s={},r={};function o(b,E){const R=E.program;n.uniformBlockBinding(b,R,s[b.id])}function a(b,E){let R=s[b.id];R===void 0&&(x(b),R=c(b),s[b.id]=R,b.addEventListener("dispose",u));const S=E.program;n.updateUBOMapping(b,S);const _=t.render.frame;r[b.id]!==_&&(l(b),r[b.id]=_)}function c(b){const E=i.createBuffer(),R=b.__size,S=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,S),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(b){const E=s[b.id],R=b.uniforms,S=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let _=0,f=R.length;_<f;_++){const v=R[_];if(Array.isArray(v))for(let w=0,T=v.length;w<T;w++)d(v[w],_,w,S);else d(v,_,0,S)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,E,R,S){if(p(b,E,R,S)===!0){const _=b.__offset,f=b.value;if(Array.isArray(f)){let v=0;for(let w=0;w<f.length;w++){const T=f[w],A=M(T,!0);g(T,b.__data,v),v+=A.storage/Float32Array.BYTES_PER_ELEMENT}}else g(f,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,b.__data)}}function g(b,E,R){typeof b=="number"||typeof b=="boolean"?E[R]=b:b.isMatrix3?(E[R]=b.elements[0],E[R+1]=b.elements[1],E[R+2]=b.elements[2],E[R+3]=0,E[R+4]=b.elements[3],E[R+5]=b.elements[4],E[R+6]=b.elements[5],E[R+7]=0,E[R+8]=b.elements[6],E[R+9]=b.elements[7],E[R+10]=b.elements[8],E[R+11]=0):ArrayBuffer.isView(b)?E.set(b.subarray(0,E.length-R),R):b.toArray(E,R)}function p(b,E,R,S){const _=b.value,f=E+"_"+R;if(Array.isArray(_)){S[f]===void 0&&(S[f]=[]);const v=S[f];let w=!1;for(let T=0;T<_.length;T++)m(_[T],v,T)===!0&&(w=!0);return w}return m(_,S,f)}function m(b,E,R){if(E[R]===void 0)return typeof b=="number"||typeof b=="boolean"?E[R]=b:ArrayBuffer.isView(b)?E[R]=b.slice():E[R]=b.clone(),!0;{const S=E[R];if(typeof b=="number"||typeof b=="boolean"){if(S!==b)return E[R]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(S.equals(b)===!1)return S.copy(b),!0}}return!1}function x(b){const E=b.uniforms;let R=0;const S=16;for(let f=0,v=E.length;f<v;f++){const w=Array.isArray(E[f])?E[f]:[E[f]];for(let T=0,A=w.length;T<A;T++){const D=w[T],U=Array.isArray(D.value)?D.value:[D.value],I=Array.isArray(E[f])||Array.isArray(D.value);let G=R;for(let W=0,st=U.length;W<st;W++){const J=U[W],nt=M(J,I),ut=R%S,mt=ut%nt.boundary,Pt=ut+mt;R+=mt,Pt!==0&&S-Pt<nt.storage&&(R+=S-Pt),W===0&&(G=R),R+=nt.storage}const H=D.type==="int"?Int32Array:D.type==="uint"?Uint32Array:Float32Array;D.__data=new H((R-G)/Float32Array.BYTES_PER_ELEMENT),D.__offset=G}}const _=R%S;return _>0&&(R+=S-_),b.__size=R,b.__cache={},this}function M(b,E){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=16,R.storage=48):b.isMatrix4?(R.boundary=16,R.storage=64):b.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",b),E===!0&&(R.boundary=16,R.storage=Math.ceil(R.storage/16)*16),R}function u(b){const E=b.target;E.removeEventListener("dispose",u),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function h(){for(const b in s)i.deleteBuffer(s[b]);s={},r={}}return{bind:o,update:a,dispose:h}}const Eg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let oi=null;function Tg(){return oi===null&&(oi=new wl(Eg,16,16,Xi,jn),oi.name="DFG_LUT",oi.minFilter=Sn,oi.magFilter=Sn,oi.wrapS=fi,oi.wrapT=fi,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}class yh{constructor(t={}){const{canvas:e=Iu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:p=!1,outputBufferType:m=Cn}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const M=m,u=new Set([sa,ia,na]),h=new Set([Cn,Qn,Fs,fs,jo,ta]),b=new Uint32Array(4),E=new Int32Array(4),R={textures:[],min:[],max:[],resolution:[]};let S=null,_=null;const f=[],v=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let A=!1,D=null,U=null,I=null,G=null;this._outputColorSpace=Mn;let H=0,W=0,st=null,J=-1,nt=null;const ut=new Ve,mt=new Ve;let Pt=null;const $=new ie(0);let pt=0,bt=e.width,Nt=e.height,wt=1,Wt=null,at=null;const At=new Ve(0,0,bt,Nt),ce=new Ve(0,0,bt,Nt);let ve=!1;const Jt=new Bs,Rt=new la;let Yt=!1,ue=!1;const $t=new xe,me=new O,we=new Ve,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function de(){return st===null?wt:1}let k=n;function qe(P,z){return e.getContext(P,z)}let be,Ee,Et,Le,qt,jt,N,C,Z,ht,ct,St,Tt,rt,it,lt,B,ot,tt,xt,gt,vt,Bt;try{const P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jo}`),e.addEventListener("webglcontextlost",Ut,!1),e.addEventListener("webglcontextrestored",Xt,!1),e.addEventListener("webglcontextcreationerror",Mt,!1),k===null){const z="webgl2";if(k=qe(z,P),k===null)throw qe(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ee()}catch(P){throw e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",Mt,!1),Se("WebGLRenderer: "+P.message),P}function ee(){be=new Pm(k),be.init(),gt=new Mh(k,be),Ee=new vm(k,be,t,gt),Et=new mg(k,be),Ee.reversedDepthBuffer&&p&&Et.buffers.depth.setReversed(!0),U=k.createFramebuffer(),I=k.createFramebuffer(),G=k.createFramebuffer(),Le=new Im(k),qt=new eg,jt=new gg(k,be,Et,qt,Ee,gt,Le),N=new Cm(T),C=new Uf(k),vt=new _m(k,C),Z=new Dm(k,C,Le,vt),ht=new Um(k,Z,C,vt,Le),ot=new Nm(k,Ee,jt),it=new Mm(qt),ct=new tg(T,N,be,Ee,vt,it),St=new yg(T,qt),Tt=new ig,rt=new cg(be),B=new gm(T,N,Et,ht,x,c),lt=new pg(T,ht,Ee),Bt=new bg(k,Le,Ee,Et),tt=new xm(k,be,Le),xt=new Lm(k,be,Le),Le.programs=ct.programs,T.capabilities=Ee,T.extensions=be,T.properties=qt,T.renderLists=Tt,T.shadowMap=lt,T.state=Et,T.info=Le}M!==Cn&&(w=new Om(M,e.width,e.height,a,s,r));const dt=new Mg(T,k);this.xr=dt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const P=be.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=be.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return wt},this.setPixelRatio=function(P){P!==void 0&&(wt=P,this.setSize(bt,Nt,!1))},this.getSize=function(P){return P.set(bt,Nt)},this.setSize=function(P,z,Q=!0){if(dt.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=P,Nt=z,e.width=Math.floor(P*wt),e.height=Math.floor(z*wt),Q===!0&&(e.style.width=P+"px",e.style.height=z+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,P,z)},this.getDrawingBufferSize=function(P){return P.set(bt*wt,Nt*wt).floor()},this.setDrawingBufferSize=function(P,z,Q){bt=P,Nt=z,wt=Q,e.width=Math.floor(P*Q),e.height=Math.floor(z*Q),this.setViewport(0,0,P,z)},this.setEffects=function(P){if(M===Cn){Se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let z=0;z<P.length;z++)if(P[z].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(ut)},this.getViewport=function(P){return P.copy(At)},this.setViewport=function(P,z,Q,V){P.isVector4?At.set(P.x,P.y,P.z,P.w):At.set(P,z,Q,V),Et.viewport(ut.copy(At).multiplyScalar(de()).round())},this.getScissor=function(P){return P.copy(ce)},this.setScissor=function(P,z,Q,V){P.isVector4?ce.set(P.x,P.y,P.z,P.w):ce.set(P,z,Q,V),Et.scissor(mt.copy(ce).multiplyScalar(de()).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(P){Et.setScissorTest(ve=P)},this.setOpaqueSort=function(P){Wt=P},this.setTransparentSort=function(P){at=P},this.getClearColor=function(P){return P.copy(B.getClearColor())},this.setClearColor=function(){B.setClearColor(...arguments)},this.getClearAlpha=function(){return B.getClearAlpha()},this.setClearAlpha=function(){B.setClearAlpha(...arguments)},this.clear=function(P=!0,z=!0,Q=!0){let V=0;if(P){let X=!1;if(st!==null){const ft=st.texture.format;X=u.has(ft)}if(X){const ft=st.texture.type,Lt=h.has(ft),_t=B.getClearColor(),It=B.getClearAlpha(),kt=_t.r,Ct=_t.g,ae=_t.b;Lt?(b[0]=kt,b[1]=Ct,b[2]=ae,b[3]=It,k.clearBufferuiv(k.COLOR,0,b)):(E[0]=kt,E[1]=Ct,E[2]=ae,E[3]=It,k.clearBufferiv(k.COLOR,0,E))}else V|=k.COLOR_BUFFER_BIT}z&&(V|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(V|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&k.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),D=P},this.dispose=function(){e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",Xt,!1),e.removeEventListener("webglcontextcreationerror",Mt,!1),B.dispose(),Tt.dispose(),rt.dispose(),jt.dispose(),qt.dispose(),N.dispose(),ht.dispose(),Z.dispose(),vt.dispose(),Bt.dispose(),ct.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",En),dt.removeEventListener("sessionend",te),cn.stop()};function Ut(P){P.preventDefault(),qa("WebGLRenderer: Context Lost."),A=!0}function Xt(){qa("WebGLRenderer: Context Restored."),A=!1;const P=Le.autoReset,z=lt.enabled,Q=lt.autoUpdate,V=lt.needsUpdate,X=lt.type;ee(),Le.autoReset=P,lt.enabled=z,lt.autoUpdate=Q,lt.needsUpdate=V,lt.type=X}function Mt(P){Se("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function oe(P){const z=P.target;z.removeEventListener("dispose",oe),He(z)}function He(P){Un(P),qt.remove(P)}function Un(P){const z=qt.get(P).programs;z!==void 0&&(z.forEach(function(Q){ct.releaseProgram(Q)}),P.isShaderMaterial&&ct.releaseShaderCache(P))}this.renderBufferDirect=function(P,z,Q,V,X,ft){z===null&&(z=We);const Lt=X.isMesh&&X.matrixWorld.determinantAffine()<0,_t=$i(P,z,Q,V,X);Et.setMaterial(V,Lt);let It=Q.index,kt=1;if(V.wireframe===!0){if(It=Z.getWireframeAttribute(Q),It===void 0)return;kt=2}const Ct=Q.drawRange,ae=Q.attributes.position;let Gt=Ct.start*kt,se=(Ct.start+Ct.count)*kt;ft!==null&&(Gt=Math.max(Gt,ft.start*kt),se=Math.min(se,(ft.start+ft.count)*kt)),It!==null?(Gt=Math.max(Gt,0),se=Math.min(se,It.count)):ae!=null&&(Gt=Math.max(Gt,0),se=Math.min(se,ae.count));const Ge=se-Gt;if(Ge<0||Ge===1/0)return;vt.setup(X,V,_t,Q,It);let Ne,Ae=tt;if(It!==null&&(Ne=C.get(It),Ae=xt,Ae.setIndex(Ne)),X.isMesh)V.wireframe===!0?(Et.setLineWidth(V.wireframeLinewidth*de()),Ae.setMode(k.LINES)):Ae.setMode(k.TRIANGLES);else if(X.isLine){let Be=V.linewidth;Be===void 0&&(Be=1),Et.setLineWidth(Be*de()),X.isLineSegments?Ae.setMode(k.LINES):X.isLineLoop?Ae.setMode(k.LINE_LOOP):Ae.setMode(k.LINE_STRIP)}else X.isPoints?Ae.setMode(k.POINTS):X.isSprite&&Ae.setMode(k.TRIANGLES);if(X.isBatchedMesh)if(be.get("WEBGL_multi_draw"))Ae.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Be=X._multiDrawStarts,Ft=X._multiDrawCounts,rn=X._multiDrawCount,pe=It?C.get(It).bytesPerElement:1,ii=qt.get(V).currentProgram.getUniforms();for(let Qe=0;Qe<rn;Qe++)ii.setValue(k,"_gl_DrawID",Qe),Ae.render(Be[Qe]/pe,Ft[Qe])}else if(X.isInstancedMesh)Ae.renderInstances(Gt,Ge,X.count);else if(Q.isInstancedBufferGeometry){const Be=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Ft=Math.min(Q.instanceCount,Be);Ae.renderInstances(Gt,Ge,Ft)}else Ae.render(Gt,Ge)};function gi(P,z,Q,V){D!==null&&P.isNodeMaterial&&D.setObject(V,P),Yt===!0&&it.setState(P,Q,!1),P.transparent===!0&&P.side===gn&&P.forceSinglePass===!1?(P.side=yn,P.needsUpdate=!0,_n(P,z,V),P.side=Wi,P.needsUpdate=!0,_n(P,z,V),P.side=gn):_n(P,z,V)}this.compile=function(P,z,Q=null){Q===null&&(Q=P),D!==null&&D.renderStart(P,z,Q),_=rt.get(Q),_.init(z),v.push(_),Q.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(_.pushLight(X),X.castShadow&&_.pushShadow(X))}),P!==Q&&P.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(_.pushLight(X),X.castShadow&&_.pushShadow(X))}),_.setupLights(),D!==null&&D.updateLights(_.state.lightsArray),ue=this.localClippingEnabled,Yt=it.init(this.clippingPlanes,ue),Yt===!0&&it.setGlobalState(this.clippingPlanes,z),D!==null&&lt.render(_.state.shadowsArray,Q,z);const V=new Set;return P.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ft=X.material;if(ft)if(Array.isArray(ft))for(let Lt=0;Lt<ft.length;Lt++){const _t=ft[Lt];gi(_t,Q,z,X),V.add(_t)}else gi(ft,Q,z,X),V.add(ft)}),_=v.pop(),D!==null&&D.renderEnd(),V},this.compileAsync=function(P,z,Q=null){const V=this.compile(P,z,Q);return new Promise(X=>{function ft(){if(V.forEach(function(Lt){const It=qt.get(Lt).currentProgram;(It===void 0||It.isReady())&&V.delete(Lt)}),V.size===0){X(P);return}setTimeout(ft,10)}be.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let dn=null;function Vt(P){dn&&dn(P)}function En(){cn.stop()}function te(){cn.start()}const cn=new uh;cn.setAnimationLoop(Vt),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(P){dn=P,dt.setAnimationLoop(P),P===null?cn.stop():cn.start()},dt.addEventListener("sessionstart",En),dt.addEventListener("sessionend",te),this.render=function(P,z){if(z!==void 0&&z.isCamera!==!0){Se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;D!==null&&D.renderStart(P,z);const Q=dt.enabled===!0&&dt.isPresenting===!0,V=w!==null&&(st===null||Q)&&w.begin(T,st);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(z),z=dt.getCamera()),P.isScene===!0&&P.onBeforeRender(T,P,z,st),_=rt.get(P,v.length),_.init(z),_.state.textureUnits=jt.getTextureUnits(),v.push(_),$t.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),z.isArrayCamera?Rt.setFromArrayCamera(z):Jt.setFromProjectionMatrix($t,Hn,z.reversedDepth),ue=this.localClippingEnabled,Yt=it.init(this.clippingPlanes,ue),S=Tt.get(P,f.length),S.init(),f.push(S),this.info.render.frame++,dt.enabled===!0&&dt.isPresenting===!0){const Lt=T.xr.getDepthSensingMesh();Lt!==null&&Li(Lt,z,-1/0,T.sortObjects)}Li(P,z,0,T.sortObjects),S.finish(),D!==null&&D.updateLights(_.state.lightsArray),T.sortObjects===!0&&S.sort(Wt,at),Qt=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Qt&&B.addToRenderList(S,P),this.info.autoReset===!0&&this.info.reset(),Yt===!0&&it.beginShadows();const X=_.state.shadowsArray;if(lt.render(X,P,z),Yt===!0&&it.endShadows(),(V&&w.hasRenderPass())===!1){const Lt=S.opaque,_t=S.transmissive;if(_.setupLights(),z.isArrayCamera){const It=z.cameras;if(_t.length>0)for(let kt=0,Ct=It.length;kt<Ct;kt++){const ae=It[kt];Ii(Lt,_t,P,ae)}Qt&&B.render(P);for(let kt=0,Ct=It.length;kt<Ct;kt++){const ae=It[kt];_i(S,P,ae,ae.viewport)}}else _t.length>0&&Ii(Lt,_t,P,z),Qt&&B.render(P),_i(S,P,z)}st!==null&&W===0&&(jt.updateMultisampleRenderTarget(st),jt.updateRenderTargetMipmap(st)),V&&w.end(T),P.isScene===!0&&P.onAfterRender(T,P,z),vt.resetDefaultState(),J=-1,nt=null,v.pop(),v.length>0?(_=v[v.length-1],jt.setTextureUnits(_.state.textureUnits),Yt===!0&&it.setGlobalState(T.clippingPlanes,_.state.camera)):_=null,f.pop(),f.length>0?S=f[f.length-1]:S=null,D!==null&&D.renderEnd()};function Li(P,z,Q,V){if(P.visible===!1)return;if(P.layers.test(z.layers)){if(P.isGroup)Q=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(z);else if(P.isLight)_.pushLight(P),P.castShadow&&_.pushShadow(P);else if(P.isSprite){const Lt=z.isArrayCamera?Rt:Jt;if(!P.frustumCulled||P.intersectsFrustum(Lt)){V&&we.setFromMatrixPosition(P.matrixWorld).applyMatrix4($t);const _t=ht.update(P),It=P.material;It.visible&&S.push(P,_t,It,Q,we.z,null,z)}}else if(P.isMesh||P.isLine||P.isPoints){const Lt=z.isArrayCamera?Rt:Jt;if(!P.frustumCulled||P.intersectsFrustum(Lt)){const _t=ht.update(P),It=P.material;if(V&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),we.copy(P.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),we.copy(_t.boundingSphere.center)),we.applyMatrix4(P.matrixWorld).applyMatrix4($t)),Array.isArray(It)){const kt=_t.groups;for(let Ct=0,ae=kt.length;Ct<ae;Ct++){const Gt=kt[Ct],se=It[Gt.materialIndex];se&&se.visible&&S.push(P,_t,se,Q,we.z,Gt,z)}}else It.visible&&S.push(P,_t,It,Q,we.z,null,z)}}}const ft=P.children;for(let Lt=0,_t=ft.length;Lt<_t;Lt++)Li(ft[Lt],z,Q,V)}function _i(P,z,Q,V){const{opaque:X,transmissive:ft,transparent:Lt}=P;_.setupLightsView(Q),Yt===!0&&it.setGlobalState(T.clippingPlanes,Q),V&&Et.viewport(ut.copy(V)),X.length>0&&ze(X,z,Q),ft.length>0&&ze(ft,z,Q),Lt.length>0&&ze(Lt,z,Q),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function Ii(P,z,Q,V){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[V.id]===void 0){const Gt=be.has("EXT_color_buffer_half_float")||be.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[V.id]=new $n(1,1,{generateMipmaps:!0,type:Gt?jn:Cn,minFilter:Ti,samples:Math.max(4,Ee.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_e.workingColorSpace})}const ft=_.state.transmissionRenderTarget[V.id],Lt=V.viewport||ut;ft.setSize(Lt.z*T.transmissionResolutionScale,Lt.w*T.transmissionResolutionScale);const _t=T.getRenderTarget(),It=T.getActiveCubeFace(),kt=T.getActiveMipmapLevel();T.setRenderTarget(ft),T.getClearColor($),pt=T.getClearAlpha(),pt<1&&T.setClearColor(16777215,.5),T.clear(),Qt&&B.render(Q);const Ct=T.toneMapping;T.toneMapping=di;const ae=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),_.setupLightsView(V),Yt===!0&&it.setGlobalState(T.clippingPlanes,V),ze(P,Q,V),jt.updateMultisampleRenderTarget(ft),jt.updateRenderTargetMipmap(ft),be.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let se=0,Ge=z.length;se<Ge;se++){const Ne=z[se],{object:Ae,geometry:Be,material:Ft,group:rn}=Ne;if(Ft.side===gn&&Ae.layers.test(V.layers)){const pe=Ft.side;Ft.side=yn,Ft.needsUpdate=!0,Te(Ae,Q,V,Be,Ft,rn),Ft.side=pe,Ft.needsUpdate=!0,Gt=!0}}Gt===!0&&(jt.updateMultisampleRenderTarget(ft),jt.updateRenderTargetMipmap(ft))}T.setRenderTarget(_t,It,kt),T.setClearColor($,pt),ae!==void 0&&(V.viewport=ae),T.toneMapping=Ct}function ze(P,z,Q){const V=z.isScene===!0?z.overrideMaterial:null;for(let X=0,ft=P.length;X<ft;X++){const Lt=P[X],{object:_t,geometry:It,group:kt}=Lt;let Ct=Lt.material;Ct.allowOverride===!0&&V!==null&&(Ct=V),_t.layers.test(Q.layers)&&Te(_t,z,Q,It,Ct,kt)}}function Te(P,z,Q,V,X,ft){D!==null&&X.isNodeMaterial&&D.setObject(P,X),P.onBeforeRender(T,z,Q,V,X,ft),P.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),X.onBeforeRender(T,z,Q,V,P,ft),X.transparent===!0&&X.side===gn&&X.forceSinglePass===!1?(X.side=yn,X.needsUpdate=!0,T.renderBufferDirect(Q,z,V,X,P,ft),X.side=Wi,X.needsUpdate=!0,T.renderBufferDirect(Q,z,V,X,P,ft),X.side=gn):T.renderBufferDirect(Q,z,V,X,P,ft),P.onAfterRender(T,z,Q,V,X,ft)}function Ie(P){let z=0;for(const Q of P)Q.texture!==null&&z++;return z}function _n(P,z,Q){z.isScene!==!0&&(z=We);const V=qt.get(P),X=_.state.lights,ft=_.state.shadowsArray,Lt=X.state.version,_t=ct.getParameters(P,X.state,ft,z,Q,_.state.lightProbeGridArray),It=ct.getProgramCacheKey(_t);let kt=V.programs;V.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?z.environment:null,V.fog=z.fog;const Ct=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;V.envMap=N.get(P.envMap||V.environment,Ct),V.envMapRotation=V.environment!==null&&P.envMap===null?z.environmentRotation:P.envMapRotation,kt===void 0&&(P.addEventListener("dispose",oe),kt=new Map,V.programs=kt,V.programVariants=new Map);let ae=kt.get(It);if(ae!==void 0){if(V.currentProgram===ae&&V.lightsStateVersion===Lt)return Ni(P,_t),ae}else _t.uniforms=ct.getUniforms(P),D!==null&&P.isNodeMaterial&&D.build(P,Q,_t),P.onBeforeCompile(_t,T),ae=ct.acquireProgram(_t,It),kt.set(It,ae),V.uniforms=_t.uniforms;const Gt=V.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Gt.clippingPlanes=it.uniform),Ni(P,_t),V.needsLights=Sr(P),V.lightsStateVersion=Lt,V.needsLights&&(Gt.ambientLightColor.value=X.state.ambient,Gt.lightProbe.value=X.state.probe,Gt.sunLights.value=X.state.sun,Gt.sunLightShadows.value=X.state.sunShadow,Gt.directionalLights.value=X.state.directional,Gt.directionalLightShadows.value=X.state.directionalShadow,Gt.spotLights.value=X.state.spot,Gt.spotLightShadows.value=X.state.spotShadow,Gt.rectAreaLights.value=X.state.rectArea,Gt.ltc_1.value=X.state.rectAreaLTC1,Gt.ltc_2.value=X.state.rectAreaLTC2,Gt.pointLights.value=X.state.point,Gt.pointLightShadows.value=X.state.pointShadow,Gt.hemisphereLights.value=X.state.hemi,Gt.sunShadowMatrix.value=X.state.sunShadowMatrix,Gt.sunShadowCascade.value=X.state.sunShadowCascade,Gt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Gt.spotLightMatrix.value=X.state.spotLightMatrix,Gt.spotLightMap.value=X.state.spotLightMap,Gt.pointShadowMatrix.value=X.state.pointShadowMatrix),V.numLightProbeGrids=Ie(_.state.lightProbeGridArray),V.currentProgram=ae,V.uniformsList=null,ae}function ei(P,z,Q,V,X){const ft=qt.get(P),Lt=ft.currentProgram.id+","+V+","+X;let _t=ft.programVariants.get(Lt);return _t===void 0?(_t=_n(P,z,Q),ft.programVariants.set(Lt,_t)):(ft.currentProgram=_t,ft.uniformsList=null,ft.outputColorSpace=V,ft.toneMapping=X),_t}function Ji(P){if(P.uniformsList===null){const z=P.currentProgram.getUniforms();P.uniformsList=no.seqWithValue(z.seq,P.uniforms)}return P.uniformsList}function Ni(P,z){const Q=qt.get(P);Q.outputColorSpace=z.outputColorSpace,Q.batching=z.batching,Q.batchingColor=z.batchingColor,Q.instancing=z.instancing,Q.instancingColor=z.instancingColor,Q.instancingMorph=z.instancingMorph,Q.skinning=z.skinning,Q.morphTargets=z.morphTargets,Q.morphNormals=z.morphNormals,Q.morphColors=z.morphColors,Q.morphTargetsCount=z.morphTargetsCount,Q.numClippingPlanes=z.numClippingPlanes,Q.numIntersection=z.numClipIntersection,Q.vertexAlphas=z.vertexAlphas,Q.vertexTangents=z.vertexTangents,Q.toneMapping=z.toneMapping}function $i(P,z,Q,V,X){z.isScene!==!0&&(z=We),jt.resetTextureUnits();const ft=z.fog,Lt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?z.environment:null,_t=st===null?T.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:_e.workingColorSpace,It=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,kt=N.get(V.envMap||Lt,It),Ct=V.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ae=!!Q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Gt=!!Q.morphAttributes.position,se=!!Q.morphAttributes.normal,Ge=!!Q.morphAttributes.color;let Ne=di;V.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Ne=T.toneMapping);const Ae=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Be=Ae!==void 0?Ae.length:0,Ft=qt.get(V),rn=_.state.lights;if(Yt===!0&&(ue===!0||P!==nt)){const Ue=P===nt&&V.id===J;it.setState(V,P,Ue)}let pe=!1,ii=!1;V.version===Ft.__version?Ft.needsLights&&Ft.lightsStateVersion!==rn.state.version||X.isBatchedMesh&&Ft.batching===!1||!X.isBatchedMesh&&Ft.batching===!0||X.isBatchedMesh&&Ft.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ft.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ft.instancing===!1||!X.isInstancedMesh&&Ft.instancing===!0||X.isSkinnedMesh&&Ft.skinning===!1||!X.isSkinnedMesh&&Ft.skinning===!0||X.isInstancedMesh&&Ft.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ft.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ft.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ft.instancingMorph===!1&&X.morphTexture!==null||Ft.envMap!==kt||V.fog===!0&&Ft.fog!==ft||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==it.numPlanes||Ft.numIntersection!==it.numIntersection)||Ft.vertexAlphas!==Ct||Ft.vertexTangents!==ae||Ft.morphTargets!==Gt||Ft.morphNormals!==se||Ft.morphColors!==Ge||Ft.morphTargetsCount!==Be||Ft.numLightProbeGrids!==Ie(_.state.lightProbeGridArray)?pe=!0:(Ft.outputColorSpace!==_t||Ft.toneMapping!==Ne)&&(ii=!0):(pe=!0,Ft.__version=V.version);let Qe=Ft.currentProgram;(pe===!0||ii===!0)&&(Qe=ii===!0?ei(V,z,X,_t,Ne):_n(V,z,X),D&&V.isNodeMaterial&&D.onUpdateProgram(V,Qe,Ft));let Qi=!1,Wn=!1,si=!1;const ge=Qe.getUniforms(),Ke=Ft.uniforms;if(Et.useProgram(Qe.program)&&(Qi=!0,Wn=!0,si=!0),V.id!==J&&(J=V.id,Wn=!0),Qi||nt!==P){Et.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),ge.setValue(k,"projectionMatrix",P.projectionMatrix),ge.setValue(k,"viewMatrix",P.matrixWorldInverse);const Ze=ge.map.cameraPosition;Ze!==void 0&&Ze.setValue(k,me.setFromMatrixPosition(P.matrixWorld)),Ee.logarithmicDepthBuffer&&ge.setValue(k,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ge.setValue(k,"isOrthographic",P.isOrthographicCamera===!0),nt!==P&&(nt=P,Wn=!0,si=!0)}if(Ft.needsLights&&(rn.state.sunShadowMap.length>0&&ge.setValue(k,"sunShadowMap",rn.state.sunShadowMap,jt),rn.state.directionalShadowMap.length>0&&ge.setValue(k,"directionalShadowMap",rn.state.directionalShadowMap,jt),rn.state.spotShadowMap.length>0&&ge.setValue(k,"spotShadowMap",rn.state.spotShadowMap,jt),rn.state.pointShadowMap.length>0&&ge.setValue(k,"pointShadowMap",rn.state.pointShadowMap,jt)),X.isSkinnedMesh){ge.setOptional(k,X,"bindMatrix"),ge.setOptional(k,X,"bindMatrixInverse");const Ue=X.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),ge.setValue(k,"boneTexture",Ue.boneTexture,jt))}X.isBatchedMesh&&(ge.setOptional(k,X,"batchingTexture"),ge.setValue(k,"batchingTexture",X._matricesTexture,jt),ge.setOptional(k,X,"batchingIdTexture"),ge.setValue(k,"batchingIdTexture",X._indirectTexture,jt),ge.setOptional(k,X,"batchingColorTexture"),X._colorsTexture!==null&&ge.setValue(k,"batchingColorTexture",X._colorsTexture,jt));const Tn=Q.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&ot.update(X,Q,Qe),(Wn||Ft.receiveShadow!==X.receiveShadow)&&(Ft.receiveShadow=X.receiveShadow,ge.setValue(k,"receiveShadow",X.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&z.environment!==null&&(Ke.envMapIntensity.value=z.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=Tg()),Wn){if(ge.setValue(k,"toneMappingExposure",T.toneMappingExposure),Ft.needsLights&&Mr(Ke,si),ft&&V.fog===!0&&St.refreshFogUniforms(Ke,ft),St.refreshMaterialUniforms(Ke,V,wt,Nt,_.state.transmissionRenderTarget[P.id]),Ft.needsLights&&Ft.numLightProbeGrids>0){const Ue=R;let Ze=0;for(const Xn of _.state.lightProbeGridArray)Xn.texture!==null&&(Ue.textures[Ze]=Xn.texture,Ue.min[Ze]=Xn.boundingBox.min,Ue.max[Ze]=Xn.boundingBox.max,Ue.resolution[Ze]=Xn.resolution,Ze++);for(const Xn in Ue)Ue[Xn].length=Ze;Ke.probesSH.value=Ue.textures,Ke.probesMin.value=Ue.min,Ke.probesMax.value=Ue.max,Ke.probesResolution.value=Ue.resolution}no.upload(k,Ji(Ft),Ke,jt)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(no.upload(k,Ji(Ft),Ke,jt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ge.setValue(k,"center",X.center),ge.setValue(k,"modelViewMatrix",X.modelViewMatrix),ge.setValue(k,"normalMatrix",X.normalMatrix),ge.setValue(k,"modelMatrix",X.matrixWorld),V.uniformsGroups!==void 0){const Ue=V.uniformsGroups;for(let Ze=0,Xn=Ue.length;Ze<Xn;Ze++){const y=Ue[Ze];Bt.update(y,Qe),Bt.bind(y,Qe)}}return Qe}function Mr(P,z){P.ambientLightColor.needsUpdate=z,P.lightProbe.needsUpdate=z,P.sunLights.needsUpdate=z,P.sunLightShadows.needsUpdate=z,P.directionalLights.needsUpdate=z,P.directionalLightShadows.needsUpdate=z,P.pointLights.needsUpdate=z,P.pointLightShadows.needsUpdate=z,P.spotLights.needsUpdate=z,P.spotLightShadows.needsUpdate=z,P.rectAreaLights.needsUpdate=z,P.hemisphereLights.needsUpdate=z}function Sr(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(P,z,Q){const V=qt.get(P);V.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),qt.get(P.texture).__webglTexture=z,qt.get(P.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,z){const Q=qt.get(P);Q.__webglFramebuffer=z,Q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(P,z=0,Q=0){st=P,H=z,W=Q;let V=null,X=!1,ft=!1;if(P){const _t=qt.get(P);if(_t.__useDefaultFramebuffer!==void 0){Et.bindFramebuffer(k.FRAMEBUFFER,_t.__webglFramebuffer),ut.copy(P.viewport),mt.copy(P.scissor),Pt=P.scissorTest,Et.viewport(ut),Et.scissor(mt),Et.setScissorTest(Pt),J=-1;return}else if(_t.__webglFramebuffer===void 0)jt.setupRenderTarget(P);else if(_t.__hasExternalTextures)jt.rebindTextures(P,qt.get(P.texture).__webglTexture,qt.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Ct=P.depthTexture;if(_t.__boundDepthTexture!==Ct){if(Ct!==null&&qt.has(Ct)&&(P.width!==Ct.image.width||P.height!==Ct.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");jt.setupDepthRenderbuffer(P)}}const It=P.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ft=!0);const kt=qt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(kt[z])?V=kt[z][Q]:V=kt[z],X=!0):P.samples>0&&jt.useMultisampledRTT(P)===!1?V=qt.get(P).__webglMultisampledFramebuffer:Array.isArray(kt)?V=kt[Q]:V=kt,ut.copy(P.viewport),mt.copy(P.scissor),Pt=P.scissorTest}else ut.copy(At).multiplyScalar(wt).floor(),mt.copy(ce).multiplyScalar(wt).floor(),Pt=ve;if(Q!==0&&(V=U),Et.bindFramebuffer(k.FRAMEBUFFER,V)&&Et.drawBuffers(P,V),Et.viewport(ut),Et.scissor(mt),Et.setScissorTest(Pt),X){const _t=qt.get(P.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,_t.__webglTexture,Q)}else if(ft){const _t=z;for(let It=0;It<P.textures.length;It++){const kt=qt.get(P.textures[It]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+It,kt.__webglTexture,Q,_t)}}else if(P!==null&&Q!==0){const _t=qt.get(P.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,_t.__webglTexture,Q)}J=-1};function ni(P){const z=qt.get(P);return(z.__readFormat!==P.format||z.__readType!==P.type)&&(z.__readFormat=P.format,z.__readType=P.type,z.__formatReadable=Ee.textureFormatReadable(P.format),z.__typeReadable=Ee.textureTypeReadable(P.type)),z}this.readRenderTargetPixels=function(P,z,Q,V,X,ft,Lt,_t=0){if(!(P&&P.isWebGLRenderTarget)){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=qt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Lt!==void 0&&(It=It[Lt],Array.isArray(It)&&(It=It[0])),It){Et.bindFramebuffer(k.FRAMEBUFFER,It);try{const kt=P.textures[_t],Ct=kt.format,ae=kt.type;P.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_t);const Gt=ni(kt);if(Gt.__formatReadable===!1){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Gt.__typeReadable===!1){Se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=P.width-V&&Q>=0&&Q<=P.height-X&&k.readPixels(z,Q,V,X,gt.convert(Ct),gt.convert(ae),ft)}finally{const kt=st!==null?qt.get(st).__webglFramebuffer:null;Et.bindFramebuffer(k.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(P,z,Q,V,X,ft,Lt,_t=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=qt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Lt!==void 0&&(It=It[Lt],Array.isArray(It)&&(It=It[0])),It)if(z>=0&&z<=P.width-V&&Q>=0&&Q<=P.height-X){Et.bindFramebuffer(k.FRAMEBUFFER,It);const kt=P.textures[_t],Ct=kt.format,ae=kt.type;P.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+_t);const Gt=ni(kt);if(Gt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Gt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const se=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,se),k.bufferData(k.PIXEL_PACK_BUFFER,ft.byteLength,k.STREAM_READ),k.readPixels(z,Q,V,X,gt.convert(Ct),gt.convert(ae),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Ge=st!==null?qt.get(st).__webglFramebuffer:null;Et.bindFramebuffer(k.FRAMEBUFFER,Ge);const Ne=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await zh(k,Ne,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,se),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ft),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(se),k.deleteSync(Ne),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,z=null,Q=0){const V=Math.pow(2,-Q),X=Math.floor(P.image.width*V),ft=Math.floor(P.image.height*V),Lt=z!==null?z.x:0,_t=z!==null?z.y:0;jt.setTexture2D(P,0),k.copyTexSubImage2D(k.TEXTURE_2D,Q,0,0,Lt,_t,X,ft),Et.unbindTexture()},this.copyTextureToTexture=function(P,z,Q=null,V=null,X=0,ft=0){let Lt,_t,It,kt,Ct,ae,Gt,se,Ge;const Ne=P.isCompressedTexture?P.mipmaps[ft]:P.image;if(Q!==null)Lt=Q.max.x-Q.min.x,_t=Q.max.y-Q.min.y,It=Q.isBox3?Q.max.z-Q.min.z:1,kt=Q.min.x,Ct=Q.min.y,ae=Q.isBox3?Q.min.z:0;else{const ge=Math.pow(2,-X);Lt=Math.floor(Ne.width*ge),_t=Math.floor(Ne.height*ge),P.isDataArrayTexture?It=Ne.depth:P.isData3DTexture?It=Math.floor(Ne.depth*ge):It=1,kt=0,Ct=0,ae=0}V!==null?(Gt=V.x,se=V.y,Ge=V.z):(Gt=0,se=0,Ge=0);const Ae=gt.convert(z.format),Be=gt.convert(z.type);let Ft;z.isData3DTexture?(jt.setTexture3D(z,0),Ft=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(jt.setTexture2DArray(z,0),Ft=k.TEXTURE_2D_ARRAY):(jt.setTexture2D(z,0),Ft=k.TEXTURE_2D),Et.activeTexture(k.TEXTURE0),Et.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),Et.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Et.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const rn=Et.getParameter(k.UNPACK_ROW_LENGTH),pe=Et.getParameter(k.UNPACK_IMAGE_HEIGHT),ii=Et.getParameter(k.UNPACK_SKIP_PIXELS),Qe=Et.getParameter(k.UNPACK_SKIP_ROWS),Qi=Et.getParameter(k.UNPACK_SKIP_IMAGES);Et.pixelStorei(k.UNPACK_ROW_LENGTH,Ne.width),Et.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ne.height),Et.pixelStorei(k.UNPACK_SKIP_PIXELS,kt),Et.pixelStorei(k.UNPACK_SKIP_ROWS,Ct),Et.pixelStorei(k.UNPACK_SKIP_IMAGES,ae);const Wn=P.isDataArrayTexture||P.isData3DTexture,si=z.isDataArrayTexture||z.isData3DTexture;if(P.isDepthTexture){const ge=qt.get(P),Ke=qt.get(z),Tn=qt.get(ge.__renderTarget),Ue=qt.get(Ke.__renderTarget);Et.bindFramebuffer(k.READ_FRAMEBUFFER,Tn.__webglFramebuffer),Et.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Ze=0;Ze<It;Ze++)Wn&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,qt.get(P).__webglTexture,X,ae+Ze),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,qt.get(z).__webglTexture,ft,Ge+Ze)),k.blitFramebuffer(kt,Ct,kt+Lt,Ct+_t,Gt,se,Gt+Lt,se+_t,k.DEPTH_BUFFER_BIT,k.NEAREST);Et.bindFramebuffer(k.READ_FRAMEBUFFER,null),Et.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(X!==0||P.isRenderTargetTexture||qt.has(P)){const ge=qt.get(P),Ke=qt.get(z);Et.bindFramebuffer(k.READ_FRAMEBUFFER,I),Et.bindFramebuffer(k.DRAW_FRAMEBUFFER,G);for(let Tn=0;Tn<It;Tn++)Wn?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ge.__webglTexture,X,ae+Tn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ge.__webglTexture,X),si?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ke.__webglTexture,ft,Ge+Tn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ke.__webglTexture,ft),X!==0?k.blitFramebuffer(kt,Ct,kt+Lt,Ct+_t,Gt,se,Gt+Lt,se+_t,k.COLOR_BUFFER_BIT,k.NEAREST):si?k.copyTexSubImage3D(Ft,ft,Gt,se,Ge+Tn,kt,Ct,Lt,_t):k.copyTexSubImage2D(Ft,ft,Gt,se,kt,Ct,Lt,_t);Et.bindFramebuffer(k.READ_FRAMEBUFFER,null),Et.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else si?P.isDataTexture||P.isData3DTexture?k.texSubImage3D(Ft,ft,Gt,se,Ge,Lt,_t,It,Ae,Be,Ne.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Ft,ft,Gt,se,Ge,Lt,_t,It,Ae,Ne.data):k.texSubImage3D(Ft,ft,Gt,se,Ge,Lt,_t,It,Ae,Be,Ne):P.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ft,Gt,se,Lt,_t,Ae,Be,Ne.data):P.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ft,Gt,se,Ne.width,Ne.height,Ae,Ne.data):k.texSubImage2D(k.TEXTURE_2D,ft,Gt,se,Lt,_t,Ae,Be,Ne);Et.pixelStorei(k.UNPACK_ROW_LENGTH,rn),Et.pixelStorei(k.UNPACK_IMAGE_HEIGHT,pe),Et.pixelStorei(k.UNPACK_SKIP_PIXELS,ii),Et.pixelStorei(k.UNPACK_SKIP_ROWS,Qe),Et.pixelStorei(k.UNPACK_SKIP_IMAGES,Qi),ft===0&&z.generateMipmaps===!0&&z.mipmapsAutoUpdate===!0&&k.generateMipmap(Ft),Et.unbindTexture()},this.initRenderTarget=function(P){qt.get(P).__webglFramebuffer===void 0&&jt.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?jt.setTextureCube(P,0):P.isData3DTexture?jt.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?jt.setTexture2DArray(P,0):jt.setTexture2D(P,0),Et.unbindTexture()},this.resetState=function(){H=0,W=0,st=null,Et.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=_e._getDrawingBufferColorSpace(t),e.unpackColorSpace=_e._getUnpackColorSpace()}}const Zr=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:$o,AddEquation:as,AddOperation:yu,AdditiveBlending:hr,AgXToneMapping:ll,AlphaFormat:ml,AlwaysCompare:vl,AlwaysDepth:so,AlwaysStencilFunc:wu,ArcCurve:Yu,ArrayCamera:ah,BackSide:yn,BasicDepthPacking:Eu,Box3:qi,BoxGeometry:tn,BufferAttribute:bn,BufferGeometry:en,ByteType:hl,Camera:Bl,CanvasTexture:Ja,CatmullRomCurve3:qu,CineonToneMapping:ol,ClampToEdgeWrapping:fi,Color:ie,ColorManagement:_e,ConeGeometry:pi,ConstantAlphaFactor:vu,ConstantColorFactor:_u,Controls:ch,CubeCamera:qo,CubeDepthTexture:Dl,CubeReflectionMapping:hs,CubeRefractionMapping:Us,CubeTexture:Pl,CubicBezierCurve:Zu,CubicBezierCurve3:Ku,CullFaceBack:Va,CullFaceFront:eu,CullFaceNone:tu,Curve:mi,CustomBlending:iu,CustomToneMapping:al,CylinderGeometry:Vn,Data3DTexture:Gu,DataArrayTexture:bl,DataTexture:wl,DepthFormat:Ci,DepthStencilFormat:wi,DepthTexture:ds,DirectionalLight:$a,DoubleSide:gn,DstAlphaFactor:fu,DstColorFactor:pu,DynamicDrawUsage:Ml,EllipseCurve:Il,EqualCompare:Cu,EqualDepth:oo,EquirectangularReflectionMapping:$r,EquirectangularRefractionMapping:Qr,Euler:ti,EventDispatcher:Di,ExternalTexture:Ll,Float32BufferAttribute:De,FloatType:kn,FogExp2:aa,FrontSide:Wi,Frustum:Bs,FrustumArray:la,GLSL3:Ya,GreaterCompare:Pu,GreaterDepth:lo,GreaterEqualCompare:xl,GreaterEqualDepth:ao,Group:Nn,HalfFloatType:jn,HemisphereLight:rh,IcosahedronGeometry:ua,ImageUtils:Bu,InstancedBufferAttribute:Za,InstancedMesh:Al,IntType:Qo,KeepStencilOp:to,Layers:oa,LessCompare:Ru,LessDepth:ro,LessEqualCompare:_l,LessEqualDepth:Ns,Light:Ol,LightShadow:oh,Line:Vu,LineBasicMaterial:Rl,LineCurve:Ju,LineCurve3:$u,LineSegments:Wu,LinearFilter:Sn,LinearMipmapLinearFilter:Ti,LinearMipmapNearestFilter:jr,LinearSRGBColorSpace:pr,LinearToneMapping:sl,LinearTransfer:mr,MOUSE:ki,Material:Ki,MathUtils:Hi,Matrix3:ne,Matrix4:xe,MaxEquation:au,Mesh:ye,MeshBasicMaterial:ui,MeshDepthMaterial:ih,MeshDistanceMaterial:sh,MeshStandardMaterial:Gs,MinEquation:ou,MirroredRepeatWrapping:ho,MixOperation:Su,MultiplyBlending:Xa,MultiplyOperation:il,NearestFilter:ln,NearestMipmapLinearFilter:js,NearestMipmapNearestFilter:bu,NeutralToneMapping:cl,NeverCompare:Au,NeverDepth:io,NoBlending:us,NoColorSpace:Ei,NoToneMapping:di,NormalBlending:Ls,NotEqualCompare:Du,NotEqualDepth:co,Object3D:$e,ObjectSpaceNormalMap:Tu,OneFactor:cu,OneMinusConstantAlphaFactor:Mu,OneMinusConstantColorFactor:xu,OneMinusDstAlphaFactor:du,OneMinusDstColorFactor:mu,OneMinusSrcAlphaFactor:nl,OneMinusSrcColorFactor:hu,OrthographicCamera:zl,PCFShadowMap:er,PCFSoftShadowMap:nu,PMREMGenerator:xr,PerspectiveCamera:zn,Plane:ci,PlaneGeometry:Pi,Points:Xu,PointsMaterial:Cl,PolyhedronGeometry:ca,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:Ul,Quaternion:Pn,R11_EAC_Format:Mo,RED_GREEN_RGTC2_Format:dr,RED_RGTC1_Format:Go,REVISION:Jo,RG11_EAC_Format:fr,RGBAFormat:Jn,RGBAIntegerFormat:sa,RGBA_ASTC_10x10_Format:No,RGBA_ASTC_10x5_Format:Do,RGBA_ASTC_10x6_Format:Lo,RGBA_ASTC_10x8_Format:Io,RGBA_ASTC_12x10_Format:Uo,RGBA_ASTC_12x12_Format:Fo,RGBA_ASTC_4x4_Format:bo,RGBA_ASTC_5x4_Format:Eo,RGBA_ASTC_5x5_Format:To,RGBA_ASTC_6x5_Format:wo,RGBA_ASTC_6x6_Format:Ao,RGBA_ASTC_8x5_Format:Ro,RGBA_ASTC_8x6_Format:Co,RGBA_ASTC_8x8_Format:Po,RGBA_BPTC_Format:Oo,RGBA_ETC2_EAC_Format:vo,RGBA_PVRTC_2BPPV1_Format:go,RGBA_PVRTC_4BPPV1_Format:mo,RGBA_S3TC_DXT1_Format:ir,RGBA_S3TC_DXT3_Format:sr,RGBA_S3TC_DXT5_Format:rr,RGBFormat:gl,RGB_BPTC_SIGNED_Format:Bo,RGB_BPTC_UNSIGNED_Format:zo,RGB_ETC1_Format:_o,RGB_ETC2_Format:xo,RGB_PVRTC_2BPPV1_Format:po,RGB_PVRTC_4BPPV1_Format:fo,RGB_S3TC_DXT1_Format:nr,RGFormat:Xi,RGIntegerFormat:ia,RawShaderMaterial:nh,Ray:Hs,Raycaster:lh,RedFormat:ea,RedIntegerFormat:na,ReinhardToneMapping:rl,RenderTarget:zu,RepeatWrapping:uo,ReverseSubtractEquation:ru,RingGeometry:_r,SIGNED_R11_EAC_Format:So,SIGNED_RED_GREEN_RGTC2_Format:Ho,SIGNED_RED_RGTC1_Format:ko,SIGNED_RG11_EAC_Format:yo,SRGBColorSpace:Mn,SRGBTransfer:Pe,Scene:Hu,ShaderChunk:re,ShaderLib:Kn,ShaderMaterial:Yi,ShortType:fl,Sphere:Zi,SphereGeometry:Vi,Spherical:ja,SplineCurve:ju,SrcAlphaFactor:el,SrcAlphaSaturateFactor:gu,SrcColorFactor:uu,StaticDrawUsage:Lu,SubtractEquation:su,SubtractiveBlending:Wa,TOUCH:cs,TangentSpaceNormalMap:Vo,Texture:fn,TextureSource:ra,TorusGeometry:Ri,Triangle:Gn,TubeGeometry:Fl,UVMapping:ul,Uint16BufferAttribute:El,Uint32BufferAttribute:Tl,UniformsLib:Dt,UniformsUtils:eh,UnsignedByteType:Cn,UnsignedInt101111Type:pl,UnsignedInt248Type:fs,UnsignedInt5999Type:dl,UnsignedIntType:Qn,UnsignedShort4444Type:jo,UnsignedShort5551Type:ta,UnsignedShortType:Fs,VSMShadowMap:Ds,Vector2:Ot,Vector3:O,Vector4:Ve,WebGLCoordinateSystem:Hn,WebGLCubeRenderTarget:ha,WebGLRenderTarget:$n,WebGLRenderer:yh,WebGLUtils:Mh,WebGPUCoordinateSystem:Os,WebXRController:eo,ZeroFactor:lu,createCanvasElement:Iu,error:Se,log:qa,warn:Kt,warnOnce:or},Symbol.toStringTag,{value:"Module"})),Kc={type:"change"},Gl={type:"start"},bh={type:"end"},Kr=new Hs,Jc=new ci,wg=Math.cos(70*Hi.DEG2RAD),je=new O,Rn=2*Math.PI,Ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ha=1e-6;class Ag extends ch{constructor(t,e=null){super(t,e),this.state=Ce.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ki.ROTATE,MIDDLE:ki.DOLLY,RIGHT:ki.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Pn,this._lastTargetPosition=new O,this._quat=new Pn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ja,this._sphericalDelta=new ja,this._scale=1,this._panOffset=new O,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new O,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cg.bind(this),this._onPointerDown=Rg.bind(this),this._onPointerUp=Pg.bind(this),this._onContextMenu=Og.bind(this),this._onMouseWheel=Ig.bind(this),this._onKeyDown=Ng.bind(this),this._onTouchStart=Ug.bind(this),this._onTouchMove=Fg.bind(this),this._onMouseDown=Dg.bind(this),this._onMouseMove=Lg.bind(this),this._interceptControlDown=Bg.bind(this),this._interceptControlUp=zg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ce.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Kc),this.update(),this.state=Ce.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;je.copy(e).sub(this.target),je.applyQuaternion(this._quat),this._spherical.setFromVector3(je),this.autoRotate&&this.state===Ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Rn:n>Math.PI&&(n-=Rn),s<-Math.PI?s+=Rn:s>Math.PI&&(s-=Rn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(je.setFromSpherical(this._spherical),je.applyQuaternion(this._quatInverse),e.copy(this.target).add(je),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=je.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=je.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Kr.origin.copy(this.object.position),Kr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Kr.direction))<wg?this.object.lookAt(this.target):(Jc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Kr.intersectPlane(Jc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ha||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ha||this._lastTargetPosition.distanceToSquared(this.target)>Ha?(this.dispatchEvent(Kc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Rn/60*this.autoRotateSpeed*t:Rn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){je.setFromMatrixColumn(e,0),je.multiplyScalar(-t),this._panOffset.add(je)}_panUp(t,e){this.screenSpacePanning===!0?je.setFromMatrixColumn(e,1):(je.setFromMatrixColumn(e,0),je.crossVectors(this.object.up,je)),je.multiplyScalar(t),this._panOffset.add(je)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;je.copy(s).sub(this.target);let r=je.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Rg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Cg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Pg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bh),this.state=Ce.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Dg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ce.DOLLY;break;case ki.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ce.ROTATE}break;case ki.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ce.PAN}break;default:this.state=Ce.NONE}this.state!==Ce.NONE&&this.dispatchEvent(Gl)}function Lg(i){switch(this.state){case Ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ig(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ce.NONE||(i.preventDefault(),this.dispatchEvent(Gl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(bh))}function Ng(i){this.enabled!==!1&&this._handleKeyDown(i)}function Ug(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1){this.state=Ce.NONE;break}this._handleTouchStartRotate(i),this.state=Ce.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1){this.state=Ce.NONE;break}this._handleTouchStartPan(i),this.state=Ce.TOUCH_PAN;break;default:this.state=Ce.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ce.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ce.TOUCH_DOLLY_ROTATE;break;default:this.state=Ce.NONE}break;default:this.state=Ce.NONE}this.state!==Ce.NONE&&this.dispatchEvent(Gl)}function Fg(i){switch(this._trackPointer(i),this.state){case Ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ce.NONE}}function Og(i){this.enabled!==!1&&i.preventDefault()}function Bg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Qs=new O;function Bn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Qs.copy(t),Qs[n]=0,Qs.normalize();const l=.5*o/(o+a),d=1-Qs.angleTo(i)/c;return Math.sign(Qs[e])===1?d*l:a/(o+a)+l+l*(1-d)}class Zo extends tn{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new O,l=new O,d=new O(t,e,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,x=g.length/6,M=new O,u=.5/o;for(let h=0,b=0;h<g.length;h+=3,b+=2)switch(c.fromArray(g,h),l.copy(c),l.x-=Math.sign(l.x)*u,l.y-=Math.sign(l.y)*u,l.z-=Math.sign(l.z)*u,l.normalize(),g[h+0]=d.x*Math.sign(c.x)+l.x*r,g[h+1]=d.y*Math.sign(c.y)+l.y*r,g[h+2]=d.z*Math.sign(c.z)+l.z*r,p[h+0]=l.x,p[h+1]=l.y,p[h+2]=l.z,Math.floor(h/x)){case 0:M.set(1,0,0),m[b+0]=Bn(M,l,"z","y",r,n),m[b+1]=1-Bn(M,l,"y","z",r,e);break;case 1:M.set(-1,0,0),m[b+0]=1-Bn(M,l,"z","y",r,n),m[b+1]=1-Bn(M,l,"y","z",r,e);break;case 2:M.set(0,1,0),m[b+0]=1-Bn(M,l,"x","z",r,t),m[b+1]=Bn(M,l,"z","x",r,n);break;case 3:M.set(0,-1,0),m[b+0]=1-Bn(M,l,"x","z",r,t),m[b+1]=1-Bn(M,l,"z","x",r,n);break;case 4:M.set(0,0,1),m[b+0]=1-Bn(M,l,"x","y",r,t),m[b+1]=1-Bn(M,l,"y","x",r,e);break;case 5:M.set(0,0,-1),m[b+0]=Bn(M,l,"x","y",r,t),m[b+1]=1-Bn(M,l,"y","x",r,e);break}}static fromJSON(t){return new Zo(t.width,t.height,t.depth,t.segments,t.radius)}}function hi(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new en;c.morphTargetsRelative=a;let l=0;for(let d=0;d<i.length;++d){const g=i[d];let p=0,m=0;if(e!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in g.attributes){if(!n.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(g.attributes[x]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(a!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in g.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[x].length!==i[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(g.morphAttributes[x]),m++}if(m!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of morph attributes."),null;if(t){let x;if(e)x=g.index.count;else if(g.attributes.position!==void 0)x=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,d),l+=x}}if(e){let d=0;const g=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let x=0;x<m.count;++x)g.push(m.getX(x)+d);d+=i[p].attributes.position.count}c.setIndex(g)}for(const d in r){const g=$c(r[d]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,g)}for(const d in o){const g=o[d][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let p=0;p<g;++p){const m=[];for(let M=0;M<o[d].length;++M)m.push(o[d][M][p]);const x=$c(m);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(x)}}}return c}function $c(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const d=i[l];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*e}const o=new t(r),a=new bn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const d=i[l];if(d.isInterleavedBufferAttribute){const g=c/e;for(let p=0,m=d.count;p<m;p++)for(let x=0;x<e;x++){const M=d.getComponent(p,x);a.setComponent(p+g,x,M)}}else o.set(d.array,c);c+=d.count*e}return s!==void 0&&(a.gpuType=s),a}const Gg=128,kg=8,Hg=-36.75,Vg=-28,Wg=10.5,Xg=12,Yg={w:10,d:8.7,bottom:3.5,top:4.55},qg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],Oe={capacity:Gg,columns:kg,startX:Hg,startZ:Vg,spacingX:Wg,spacingZ:Xg,roof:Yg,boxes:qg};function pa(i){return Number.isInteger(i)&&i>=0&&i<Oe.capacity?{slot:i,x:Oe.startX+i%Oe.columns*Oe.spacingX,z:Oe.startZ-Math.floor(i/Oe.columns)*Oe.spacingZ}:null}function Zg(i,t=i,e=null,n=Oe.capacity,s=.4,r=!1){const o=[],a=Math.min(i.x,t.x)-s,c=Math.max(i.x,t.x)+s,l=Math.min(i.z,t.z)-s,d=Math.max(i.z,t.z)+s,g=Math.max(0,Math.ceil((a-5.1-Oe.startX)/Oe.spacingX)),p=Math.min(Oe.columns-1,Math.floor((c+5.1-Oe.startX)/Oe.spacingX)),m=Math.max(0,Math.ceil((Oe.startZ-d-5.3)/Oe.spacingZ)),x=Math.min(Math.ceil(Oe.capacity/Oe.columns)-1,Math.floor((Oe.startZ-l+5.3)/Oe.spacingZ));for(let M=m;M<=x;M++)for(let u=g;u<=p;u++){const h=M*Oe.columns+u,b=pa(h);if(!(!b||h>=n)){for(const E of Oe.boxes)E.tag==="home-door"&&h===e||o.push({left:b.x+E.x-E.w/2,right:b.x+E.x+E.w/2,back:b.z+E.z-E.d/2,front:b.z+E.z+E.d/2,top:E.top,tag:E.tag});r&&o.push({left:b.x-Oe.roof.w/2,right:b.x+Oe.roof.w/2,back:b.z-Oe.roof.d/2,front:b.z+Oe.roof.d/2,bottom:Oe.roof.bottom,top:Oe.roof.top,tag:"home-roof"})}}return o}function os(i,t){return!!(t&&i&&(i.y??-.12)<Oe.roof.bottom&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function Kg({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new xe,d=new Pn,g=new O(1,1,1),p=new xe().makeScale(0,0,0);let m=null,x=1,M=0,u=null;const h={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function b(A,D,U,I,G,H="inside",W=0){D=h[D]||D;let st=A;st.index&&(st=A.toNonIndexed(),A.dispose()),d.setFromEuler(new ti(0,0,W)),st.applyMatrix4(l.compose(new O(U,I,G),d,g));const J=`${H}:${D}`;o.has(J)||o.set(J,{layer:H,color:D,geometries:[]}),o.get(J).geometries.push(st)}const E=(A,D,U,I,G,H,W,st="inside",J=0)=>b(new tn(A,D,U),W,I,G,H,st,J),R=(A,D,U,I,G,H)=>b(new Vn(A,A,D,10),H,U,I,G);function S(A,D,U,I,G){b(new Vi(A,9,6),G,D,U,I)}E(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),E(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),E(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),E(9.2,.08,7.8,0,.16,0,"#c8a178");for(let A=-4.2;A<4.5;A+=.7)E(.018,.012,7.6,A,.21,0,"#ab8965");E(3,.22,1,0,-.04,4.3,"#d7c5a7"),E(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),E(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),E(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),E(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const A of[-2.7,2.7])E(4,3.45,.18,A,1.9,3.9,"#e7dec9","front");E(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),E(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),E(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const A of[-2.85,2.85]){E(2.35,1.55,.12,A,2.05,4.04,"#71948d","front");for(const D of[-1.2,0,1.2])E(.055,1.65,.14,A+D,2.05,4.12,"#cfbb8c","front");for(const D of[1.23,2.87])E(2.45,.065,.14,A,D,4.12,"#cfbb8c","front");E(.23,.5,.14,A<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const A of[-1,1])E(4.95,.22,8.65,A*2.37,3.98,0,"#47695f","roof",A*-.18),E(4.95,.12,.12,A*2.37,3.96,4.35,"#c1a771","roof",A*-.18);E(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const A of[-2,-.5,1])E(2.25,.06,1.25,2.5,4.08,A,"#29434f","roof",-.18);E(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),E(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),E(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),E(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),E(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),E(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),E(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),R(.05,.35,-3.85,1.05,-2.4,"#bda16a"),R(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),E(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let A=0;A<4;A++)E(1.65,.024,.03,-2.15,2.88+A*.045,-3.55,"#8d9e98");E(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),E(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),E(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const A of[.98,1.91])E(.05,.37,.08,3.29,A,-2.25,"#56746a");E(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),E(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),E(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),R(.035,.3,3.45,1.45,-1.08,"#baa371"),R(.18,.3,2.1,1.43,-.75,"#e8dcc3"),E(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),E(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),E(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),E(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),R(.2,.33,.85,.43,-3.15,"#eee9de"),E(.5,.5,.22,.85,.68,-3.65,"#eee9de"),E(.55,.12,.42,1.5,1,-2.1,"#eee9de"),R(.025,1.65,1.5,1.9,-3.65,"#baa371"),E(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),E(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),E(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const A of[1.55,4.05])E(.23,.57,1,A,.72,2.45,"#a7b3a0");E(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),E(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const A of[.7,1.7])E(.08,.4,.6,A,.48,1.4,"#8c7556");E(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),E(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),E(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),E(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let A=0;A<8;A++)E(.11,.32+A%2*.1,.22,-3.2+A*.17,1.65,3.45,A%2?"#879f93":"#e2ca9e");for(const A of[-4.9,4.9]){E(.08,.7,10,A,.19,.1,"#aa9270");for(const D of[-4.7,0,4.7])E(.13,1,.13,A,.36,D,"#aa9270")}for(const A of[-3.6,3.6])R(.29,.45,A,.14,4.65,"#b58a69"),S(.4,A,.68,4.65,"#78946e");for(const{layer:A,color:D,geometries:U}of o.values()){const I=hi(U,!1);U.forEach(H=>H.dispose()),e.add(I);const G=new Al(I,t(D),128);G.instanceMatrix.setUsage(Ml),G.count=0,G.userData.residenceLayer=A,i.add(G),a.push(G)}o.clear();const _=new tn(1,1,1);e.add(_);const f=new ye(_,t("#b4c5ab"));f.userData.residenceGround=!0,i.add(f);const v=new ye(_,t("#e4dcc9"));i.add(v);function w(A){const D=pa(A);return{x:D.x,z:D.z}}function T(){const A=Math.max(M,s.reduce((U,I,G)=>I===null?U:G+1,0));x=Math.max(1,Math.ceil(A/8));for(const U of a){U.count=A;for(let I=0;I<A;I++){const G=s[I],H=w(I);u!==null&&G!==u||G===null&&I>=M||G!==null&&G===(u??m)&&["roof","front"].includes(U.userData.residenceLayer)?U.setMatrixAt(I,p):U.userData.residenceLayer==="door"?U.setMatrixAt(I,l.compose(new O(H.x-.65,0,H.z+3.99),new Pn().setFromAxisAngle(new O(0,1,0),c.has(G)?-Math.PI/2:0),g)):U.setMatrixAt(I,l.compose(new O(H.x,0,H.z),new Pn,g))}U.instanceMatrix.needsUpdate=!0,U.computeBoundingSphere()}const D=x*12+4;f.scale.set(86,.3,D),f.position.set(0,-.55,-20-D/2),v.scale.set(1.5,.04,D),v.position.set(0,-.12,-20-D/2),f.visible=v.visible=A>0&&u===null}return{meshes:a,interior(A){u=r.has(A)?A:null,T()},slotFor:A=>r.get(A),setPlots(A){M=Math.min(128,Math.max(0,Number(A)||0)),T()},sync(A){const D=new Set(A.slice(0,128).map(U=>U.id));for(const[U,I]of r)D.has(U)||(s[I]=null,r.delete(U));for(const U of A.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(U.id)!==I&&(r.has(U.id)&&(s[r.get(U.id)]=null),r.delete(U.id))}for(const U of A.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=U.id,r.set(U.id,I))}for(const U of[...D].sort((I,G)=>I-G))if(!r.has(U)){const I=s.indexOf(null);s[I]=U,r.set(U,I)}r.has(m)||(m=null),T()},select(A){m=r.has(A)?A:null,T()},setDoor(A,D){D?c.add(A):c.delete(A),T()},location(A){const D=r.get(A);return D===void 0?null:w(D)},bed(A){const D=this.location(A);return D?[D.x-2.05,.92,D.z-.5]:null},cameraBoxes(A){const D=this.location(A);if(!D)return[];const U=(G,H,W,st,J)=>({left:D.x+G-W/2,right:D.x+G+W/2,back:D.z+H-st/2,front:D.z+H+st/2,top:J}),I=[U(-4.6,0,.18,7.8,3.6),U(0,-3.9,9.4,.18,3.6),U(3.65,-2.78,1.05,.92,2.3),U(2.95,-.75,2.62,.95,1.3),U(2.8,2.45,2.6,1.2,1.3)];return A!==m&&I.push(U(4.6,0,.18,7.8,3.6),U(0,3.9,9.4,.18,3.6)),I},personForHit(A){return A?.object?.userData?.residenceLayer&&Number.isInteger(A.instanceId)?s[A.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-x*12,front:-20}},dispose(){a.forEach(A=>{A.dispose(),i.remove(A)}),i.remove(f,v),r.clear(),s.fill(null)}}}const Jg={minX:-100,maxX:100,minZ:-216,maxZ:92},$g={x:0,y:-.12,z:20},Qg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20},armory:{x:52,z:35,radius:5}},li={bounds:Jg,spawn:$g,venues:Qg};function jg(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=li.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,d=!1,g=null,p=128;const m=(_,f=_,v=.3,w=!1)=>d?Zg(_,f,g,p,Math.max(.4,v),w):[],x=_=>_.top<=In.vault_height&&In.vault_tags.includes(_.tag);function M(_,f,v=-.12,w=o,T=!1){return _>=t+w&&_<=e-w&&f>=n+w&&f<=s-w&&!i.concat(m({x:_,z:f},{x:_,z:f},w,T)).some(A=>!((x(A)||T)&&v>=A.top+.075||A.bottom!==void 0&&v+1.8<=A.bottom-.075)&&_>A.left-w&&_<A.right+w&&f>A.back-w&&f<A.front+w)}function u(_,f,v=o,w=!1){if(!M(f.x,f.z,f.y??-.12,v,w))return!1;for(const T of i.concat(m(_,f,v,w))){let A=0,D=1;for(const[U,I,G]of[["x",T.left-v,T.right+v],["z",T.back-v,T.front+v]]){const H=f[U]-_[U];if(Math.abs(H)<1e-8){if(_[U]<=I||_[U]>=G){A=2;break}}else{const W=(I-_[U])/H,st=(G-_[U])/H;A=Math.max(A,Math.min(W,st)),D=Math.min(D,Math.max(W,st))}}if(A<=D&&D>0&&A<1){const U=_.y??-.12,I=f.y??-.12,G=U+(I-U)*Math.max(0,A),H=U+(I-U)*Math.min(1,D);if((x(T)||w)&&Math.min(G,H)>=T.top+.075||T.bottom!==void 0&&Math.max(G,H)+1.8<=T.bottom-.075)continue;return!1}}return!0}function h(){if(!l){l=new Uint8Array(a*c).fill(1);for(let _=0;_<c;_++)for(let f=0;f<a;f++)(f===0||_===0||f===a-1||_===c-1)&&(l[_*a+f]=0);for(const _ of i.concat(m({x:t,z:n},{x:e,z:s}))){const f=Math.max(0,Math.ceil((_.left-.4-t)/r)),v=Math.min(a-1,Math.floor((_.right+.4-t)/r)),w=Math.max(0,Math.ceil((_.back-.4-n)/r)),T=Math.min(c-1,Math.floor((_.front+.4-n)/r));for(let A=w;A<=T;A++)for(let D=f;D<=v;D++)l[A*a+D]=0}}}function b(_,f,v){const w=f.x-_.x,T=f.z-_.z,A=w*w+T*T;return v.every(D=>{const U=A?Math.max(0,Math.min(1,((D.x-_.x)*w+(D.z-_.z)*T)/A)):0;return Math.hypot(_.x+w*U-D.x,_.z+T*U-D.z)>=.62})}function E(_,f=null,v=[]){h();const w=Math.round((_.x-t)/r),T=Math.round((_.z-n)/r);let A=-1,D=1/0;for(let U=-6;U<=6;U++)for(let I=-6;I<=6;I++){const G=w+I,H=T+U,W=H*a+G;if(G<0||H<0||G>=a||H>=c||!(f||l)[W])continue;const st=(t+G*r-_.x)**2+(n+H*r-_.z)**2;M(_.x,_.z)&&!u(_,{x:t+G*r,z:n+H*r})||b(_,{x:t+G*r,z:n+H*r},v)&&st<D&&(A=W,D=st)}return A}function R(_){return{x:t+_%a*r,z:n+Math.floor(_/a)*r}}function S(_,f,v=[]){if(u(_,f)&&b(_,f,v))return[{x:f.x,z:f.z}];h();const w=v.length?l.slice():l;for(const nt of v){const ut=Math.round((nt.x-t)/r),mt=Math.round((nt.z-n)/r);for(let Pt=-2;Pt<=2;Pt++)for(let $=-2;$<=2;$++){const pt=ut+$,bt=mt+Pt;pt>=0&&bt>=0&&pt<a&&bt<c&&Math.hypot(t+pt*r-nt.x,n+bt*r-nt.z)<.76&&(w[bt*a+pt]=0)}}const T=E(_,w,v),A=E(f,w,v);if(T<0||A<0)return[];const D=[],U=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),G=new Uint8Array(a*c),H=nt=>Math.abs(nt%a-A%a)+Math.abs(Math.floor(nt/a)-Math.floor(A/a));function W(nt,ut){D.push({index:nt,score:ut});let mt=D.length-1;for(;mt>0;){const Pt=mt-1>>1;if(D[Pt].score<=ut)break;[D[mt],D[Pt]]=[D[Pt],D[mt]],mt=Pt}}function st(){const nt=D[0],ut=D.pop();if(D.length){D[0]=ut;let mt=0;for(;;){let Pt=mt,$=mt*2+1,pt=$+1;if($<D.length&&D[$].score<D[Pt].score&&(Pt=$),pt<D.length&&D[pt].score<D[Pt].score&&(Pt=pt),Pt===mt)break;[D[mt],D[Pt]]=[D[Pt],D[mt]],mt=Pt}}return nt.index}U[T]=0,W(T,H(T));let J=0;for(;D.length&&J++<a*c;){const nt=st();if(G[nt])continue;if(G[nt]=1,nt===A){const Pt=[];let $=nt;for(;$!==T;)Pt.push(R($)),$=I[$];return Pt.reverse(),M(f.x,f.z)&&u(Pt.at(-1)||R(T),f)&&b(Pt.at(-1)||R(T),f,v)&&Pt.push({x:f.x,z:f.z}),M(_.x,_.z)&&Pt.unshift(R(T)),Pt}const ut=nt%a,mt=Math.floor(nt/a);for(const[Pt,$]of[[1,0],[-1,0],[0,1],[0,-1]]){const pt=ut+Pt,bt=mt+$,Nt=bt*a+pt;if(pt<0||bt<0||pt>=a||bt>=c||!w[Nt]||G[Nt]||!u(R(nt),R(Nt))||!b(R(nt),R(Nt),v))continue;const wt=U[nt]+1;wt<U[Nt]&&(U[Nt]=wt,I[Nt]=nt,W(Nt,wt+H(Nt)))}}return[]}return{configureHomes(_,f=null,v=p){d===!!_&&f===g&&v===p||(d=!!_,g=f,p=v,l=null)},withHomeAccess(_,f){if(!d||_===void 0||_===g)return f();const v=g,w=l;g=_,l=null;try{return f()}finally{g=v,l=w}},groundHeight(_,f=!1,v=o){const w=Math.round((_.x+36.75)/10.5),T=Math.round((-28-_.z)/12);let A=d&&w>=0&&w<8&&T>=0&&T*8+w<p&&os({..._,y:-.12},pa(T*8+w))?.22:-.12;for(const D of i.concat(m(_,_,v,f)))(x(D)||f)&&(_.y??-.12)>=D.top+.07&&_.x>D.left-v&&_.x<D.right+v&&_.z>D.back-v&&_.z<D.front+v&&(A=Math.max(A,D.top+.08));return A},boxes:()=>i.map(_=>({..._})),slide(_,f,v=o,w=!1){const T={...f,y:f.y??_.y};return u(_,T,v,w)?{x:f.x,z:f.z}:u(_,{...T,z:_.z},v,w)?{x:f.x,z:_.z}:u(_,{...T,x:_.x},v,w)?{x:_.x,z:f.z}:{x:_.x,z:_.z}},addBox(_,f,v,w,T="",A=2){i.push({left:v-_/2,right:v+_/2,back:w-f/2,front:w+f/2,top:A,tag:T}),l=null},rayLimit(_,f){let v=1;for(const w of i.concat(m(_,f,.02,!0))){let T=0,A=1;for(const[D,U,I]of[["x",w.left-.02,w.right+.02],["z",w.back-.02,w.front+.02],["y",w.bottom??-.3,w.top+.02]]){const G=f[D]-_[D];if(Math.abs(G)<1e-8){if(_[D]<U||_[D]>I){T=2;break}}else{const H=(U-_[D])/G,W=(I-_[D])/G;T=Math.max(T,Math.min(H,W)),A=Math.min(A,Math.max(H,W))}}T<=A&&T>=0&&T<v&&(v=Math.max(0,T-.001))}return f.y<-.12&&_.y>-.12&&(v=Math.min(v,(-.12-_.y)/(f.y-_.y))),v},cameraLimit(_,f,v=[]){let w=1;for(const T of i.concat(v)){let A=0,D=1;for(const[U,I,G]of[["x",T.left-.15,T.right+.15],["z",T.back-.15,T.front+.15],["y",-.3,T.top+.15]]){const H=f[U]-_[U];if(Math.abs(H)<1e-8){if(_[U]<I||_[U]>G){A=2;break}}else{const W=(I-_[U])/H,st=(G-_[U])/H;A=Math.max(A,Math.min(W,st)),D=Math.min(D,Math.max(W,st))}}A<=D&&A>.01&&A<w&&(w=Math.max(.02,A-.015))}return w},free:M,segment:u,path:S,nearest(_){const f=E(_);return f<0?null:R(f)},move(_,f,v){const w=Math.hypot(f.x-_.x,f.z-_.z),T=w>0?Math.min(1,v/w):0,A={x:_.x+(f.x-_.x)*T,z:_.z+(f.z-_.z)*T};return u(_,A)?A:{x:_.x,z:_.z}}}}function t_({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new Nn;i.add(a);const c=Rt=>(t.add(Rt),Rt);function l(Rt,Yt){const ue=new Gs(Yt);return e.set("environment:"+Rt,ue),ue}const d=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),p=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),m=l("forest",{color:"#4c7262",roughness:1}),x=new ye(c(new Pi(850,850)),d);x.rotation.x=-Math.PI/2,x.position.y=-1.3,a.add(x);const M=[],u=[],h=[],b=new xe,E=new Pn;function R(Rt,Yt,ue,$t,me,we=1,We=1,Qt=1){const de=Rt.index?Rt.toNonIndexed():Rt;de!==Rt&&Rt.dispose(),de.applyMatrix4(b.compose(new O(ue,$t,me),E,new O(we,We,Qt))),Yt.push(de)}for(let Rt=0;Rt<20;Rt++){const Yt=Rt/20*Math.PI*2,ue=Math.cos(Yt)*(155+Rt%3*18),$t=-70+Math.sin(Yt)*230,me=35+Rt%5*13,we=25+Rt%4*9;R(new pi(we,me,7),M,ue,me/2-1.3,$t,1.2,1,1),R(new pi(we*.28,me*.28,7),u,ue,me*.86-1.25,$t,1.2,1,1)}for(let Rt=0;Rt<100;Rt++){const Yt=Rt%2?-1:1,ue=Yt*(51+Rt%9*4),$t=-210+Math.floor(Rt/2)*5.4,me=3.5+Rt%4;R(new pi(1.3+Rt%3*.25,me,6),h,ue,me/2-.8,$t),$t>=-22&&$t<=92&&o?.addBox(2.6,2.6,ue,$t,"forest-tree",me)}function S(Rt,Yt){const ue=c(hi(Rt,!1));Rt.forEach(me=>me.dispose());const $t=new ye(ue,Yt);return a.add($t),$t}const _=S(M,g),f=S(u,p),v=S(h,m),w=[];for(let Rt=0;Rt<14;Rt++)for(let Yt=0;Yt<4;Yt++)R(new Vi(1,9,6),w,-100+Rt%7*32+(Yt-1.5)*4,29+Rt%4*4+Yt%2*1.5,-120+Math.floor(Rt/7)*165,7,3.2,4.8);const T=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),A=S(w,T),D=6e3,U=new Float32Array(D*3),I=new Float32Array(D*6),G=[];for(let Rt=0;Rt<D;Rt++)G.push({x:Rt*73.31%64-32,y:Rt*17.73%32,z:Rt*41.71%70-35});const H=c(new en);H.setAttribute("position",new bn(U,3)),H.setDrawRange(0,320);const W=new Cl({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",W);const st=new Xu(H,W);st.frustumCulled=!1,a.add(st);const J=c(new en);J.setAttribute("position",new bn(I,3));const nt=new Rl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",nt);const ut=new Wu(J,nt);ut.frustumCulled=!1,a.add(ut);const mt=c(new Pi(260,24,48,4)),Pt=new Float32Array(mt.attributes.position.count*3);for(let Rt=0;Rt<mt.attributes.position.count;Rt++)new ie().setHSL(.38+Rt%49/49*.34,.75,.62).toArray(Pt,Rt*3);mt.setAttribute("color",new bn(Pt,3));const $=new ui({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:gn,blending:hr});e.set("environment:aurora",$);const pt=new ye(mt,$);pt.position.set(0,55,-235),a.add(pt);const bt=mt.attributes.position.array.slice();let Nt={},wt=0,Wt="",at="",At=!1,ce=-60;const ve={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function Jt(Rt){const Yt=Ph(Nt,Date.now()+wt).mode;if(Yt===Wt&&at===`${Nt.landscape}:${Rt}`)return;Wt=Yt,at=`${Nt.landscape}:${Rt}`;const ue=ve[Nt.landscape]||ve.alps;d.color.set(ue[0]),g.color.set(ue[1]),m.color.set(ue[2]);const $t=Yt==="aurora";i.background=new ie($t?"#102339":Rt?"#142730":Yt==="rain"?"#a6babd":Yt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new aa(i.background,Yt==="mist"?.007:Yt==="rain"?.0035:.0013),n.intensity=$t?.6:Yt==="rain"?1.35:Rt?1.65:2.7,s.intensity=$t?1.6:Rt?2.05:2.6,r.intensity=$t?1.8:1.1,T.color.set(Yt==="rain"?"#859c9f":"#f5f2e9"),W.color.set("#ffffff"),W.size=.13}return{configure(Rt={},Yt=!1){Nt=Rt.settings||{},Number.isFinite(Rt.server_ms)&&(wt=Rt.server_ms-Date.now()),At=Yt,_.visible=f.visible=Nt.mountains!==!1,A.visible=Nt.clouds!==!1;const ue=Nt.precipitation||"heavy",$t=At?900:ue==="light"?650:ue==="storm"?5800:3600;H.setDrawRange(0,$t),J.setDrawRange(0,$t*2),at=""},update(Rt,{paused:Yt=!1,dark:ue=!1,center:$t=null}={}){Jt(ue);const me=Wt,we=Yt?0:Rt/1e3;if(A.position.x=Yt?0:Math.sin(we*.012)*9,st.visible=me==="snow",ut.visible=me==="rain",pt.visible=me==="aurora",st.visible||ut.visible){const We=H.drawRange.count,Qt=$t?.x||0,de=$t?.z||0;for(let k=0;k<We;k++){const qe=G[k],be=qe.x+Qt+Math.sin(we*.4+k)*(me==="snow"?.55:.1),Ee=(qe.y-we*(me==="snow"?1.4:20)%32+32)%32,Et=qe.z+de;if(me==="snow")U[k*3]=be,U[k*3+1]=Ee,U[k*3+2]=Et;else{const Le=k*6;I[Le]=be,I[Le+1]=Ee,I[Le+2]=Et,I[Le+3]=be+.1,I[Le+4]=Ee-.9,I[Le+5]=Et}}(me==="snow"?H:J).attributes.position.needsUpdate=!0}if(pt.visible){const We=mt.attributes.position.array;for(let Qt=0;Qt<We.length;Qt+=3)We[Qt+1]=bt[Qt+1]+Math.sin(bt[Qt]*.035+we*.3)*5,We[Qt+2]=Math.cos(bt[Qt]*.02+we*.17)*9;mt.attributes.position.needsUpdate=!0}},extent(Rt){Rt!==ce&&(ce=Rt,v.scale.z=Math.max(1,Math.abs(Rt)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function e_({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let S=-40;S<=-20;S+=2)for(let _=43;_<=59;_+=2)t(1.98,.025,1.98,S,-.18,_,(S+_)/2%2?"#e8dfcb":"#d1c6ac",0);for(const S of[-41.3,-18.7])t(.15,.09,20,S,-.1,51,"gold",0),t(.35,1.4,19.8,S,.45,51,"deep"),a.addBox(.35,19.8,S,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const S of[-40,-20])for(const _ of[42.5,50.5,59.5])e(.35,.25,S,-.03,_,"gold"),e(.2,4.7,S,2.3,_,"white"),e(.38,.22,S,4.7,_,"gold"),a.addBox(.75,.75,S,_,"grand-bar-column",4.9);for(const S of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,S,"gold");for(const _ of[-36,-24]){const f=new Ri(2,.075,6,24,Math.PI);s(f,"gold",_,3.4,S)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const S of[41.65,42.3])t(15,.14,.7,-30,1.5+(S-41.65)*2,S,"wood");for(let S=0;S<14;S++){const _=-36.5+S;e(.11,.55,_,1.87,41.8,S%2?"#87b6a5":"#b89c68"),e(.04,.14,_,2.22,41.8,"gold")}for(const S of[-37,-34,-31,-28,-25,-22])e(.37,.16,S,.57,47.4,"deep"),e(.065,.8,S,.08,47.4,"gold"),e(.28,.06,S,-.12,47.4,"gold"),a.addBox(.75,.75,S,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[S,_,f]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,S,4.8,_,"gold"),s(new Ri(f,.035,6,28),"gold",S,4,_,Math.PI/2);for(let v=0;v<12;v++){const w=v*Math.PI/6,T=S+Math.cos(w)*f,A=_+Math.sin(w)*f;e(.014,.46,T,3.75,A,"gold"),n(.09,.19,.09,T,3.47,A,"white")}}for(const S of[-38,-22])t(2.1,.65,5.1,S,.15,54,"#856c8c",.18),t(.3,1,5.2,S+(S<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,S,54,"velvet-booth",1.3),e(.68,.12,S+(S<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,S+(S<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,S+(S<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const d=["#87668e","#508a87","#b99c68","#5c708c"];for(let S=0;S<8;S++)for(let _=0;_<6;_++)t(1.04,.025,1.02,-33.7+S*1.06,.035,53.4+_*1.06,d[(S+_)%4],.015);for(const S of[-34.5,-25.5])t(.04,.06,6.6,S,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const S of[-31.4,-28.6])e(.57,.08,S,1.24,51.1,"black"),e(.15,.1,S,1.3,51.1,"gold");for(let S=0;S<6;S++)t(.1,.09,.22,-30.65+S*.25,1.26,51.3,"white",.01);for(const S of[-34.5,-25.5]){t(1,2.3,.8,S,1,51,"black");for(const _ of[.45,1.35]){const f=new Vn(.31,.31,.05,12);s(f,"metal",S,_,51.43,Math.PI/2)}a.addBox(1,.8,S,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new Gs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const p=new ua(.62,2);c.add(p);const m=new ye(p,g);m.position.set(-30,4.6,56),i.add(m);const x=new ui({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:gn,blending:hr});l.set("rivage-beams",x);const M=new pi(1.5,3.4,10,1,!0);c.add(M);const u=[];for(const S of[-33,-27])for(const _ of[54,58]){const f=new ye(M,x);f.position.set(S,2,_),f.userData.rivageEffect="beam",i.add(f),u.push(f)}const h=[],b=new ui({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",b);for(const[S,_,f,v,w,T,A]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const D=new tn(_,f,v);c.add(D);const U=new ye(D,b);U.position.set(w,T,A),U.userData.officeVenue=S,i.add(U),h.push(U)}const E=d.map(S=>{const _=o(S);return _.emissive.set(S),_});let R=!0;return{targets:h,setEnabled(S){R=!!S},update(S,{paused:_,energySaver:f}){_||(m.rotation.y=S/18e3);const v=_||f||!R;for(const w of u)w.visible=!v;for(let w=0;w<E.length;w++)E[w].emissiveIntensity=v?.13:.2+Math.sin(S/4500+w)*.05}}}function n_(i,t=li.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1,c=!!t.air_access,l=t.y??-.12;const d=(m,x,M)=>Math.max(x,Math.min(M,m));function g(m,x={},M=0,u=[]){const h=d(Number(m)||0,0,.05);let b=Number(x.x)||0,E=Number(x.z)||0;r&&Date.now()>=o&&p(null);const R=Math.hypot(b,E);R>1&&(b/=R,E/=R),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const S=!!(x.boost&&R&&s),_=S?9:4.5;e.stamina=d(e.stamina+(S?-23:14)*h,0,100);const f=(Math.cos(M)*b-Math.sin(M)*E)*_,v=(-Math.sin(M)*b-Math.cos(M)*E)*_;e.vx=f,e.vz=v;const w=i.groundHeight?.(e,c,r?.radius||.3)??-.12;e.grounded&&(l=w),e.grounded&&e.y>w+.08&&(e.grounded=!1),!e.flight&&!a&&x.jump&&!n&&(e.grounded||e.jumps<In.maximum_jumps)&&(e.vy=In.jump_speed,e.grounded=!1,e.jumps++),n=!!x.jump;const T=e.y;if(e.flight)e.vy=(+!!x.jump-+!!x.descend)*In.flight_speed,e.y=d(e.y+e.vy*h,w,In.flight_maximum_y),e.grounded=!1;else if(a)e.y=Math.max(w,e.y-In.landing_speed*h),e.vy=-4,e.y<=w&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0);else if(e.grounded)e.y=w;else{e.vy-=In.gravity*h;const U=c?Math.min(In.flight_maximum_y,Math.max(In.maximum_y,l+In.maximum_y+.12)):In.maximum_y;e.y=e.vy>0?Math.min(U,e.y+e.vy*h):e.y+e.vy*h,e.y<=w&&(e.y=w,e.vy=0,e.grounded=!0,e.jumps=0)}let A=i.slide({...e,y:Math.min(T,e.y)},{x:e.x+f*h,y:e.y,z:e.z+v*h},r?.radius||.3,c);u.some(U=>e.y<(U.y??-.12)+1.8&&e.y+(r?.height||1.8)>(U.y??-.12)&&Math.hypot(A.x-U.x,A.z-U.z)<.62&&Math.hypot(A.x-U.x,A.z-U.z)<=Math.hypot(e.x-U.x,e.z-U.z)+1e-4)&&(A={x:e.x,z:e.z});const D=Math.hypot(A.x-e.x,A.z-e.z)>1e-4;if(e.x=A.x,e.z=A.z,c&&e.grounded){const U=i.groundHeight?.(e,!0,r?.radius||.3)??-.12;e.y>U+.08?e.grounded=!1:!e.flight&&e.y<=(i.groundHeight?.(e,!1)??-.12)+.12&&(c=!1)}return e.air_access=c,D&&(e.yaw=Math.atan2(f,v)),e.action=e.flight?"fly":a?"land":e.grounded?D?S?"run":"walk":"idle":"jump",{...e}}function p(m,x=1/0){!m&&e.flight&&(e.flight=!1,a=!e.grounded),r=m,o=x}return{step:g,setForm:p,toggleFlight(){return r?.fly?(e.flight=!e.flight,e.flight&&(c=!0),a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e,air_access:c}),reset(m){c=!!(m.air_access??c);const x=i.groundHeight?.(m,c,r?.radius||.3)??-.12;e={...e,...m,vx:0,vz:0,vy:0,jumps:0,grounded:(m.y??-.12)<=x+.01},l=x,a=!e.flight&&!e.grounded&&e.y>In.maximum_y},face(m){e.yaw=Math.atan2(m.x-e.x,m.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function Jr(i,t){const e=li.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function Qc(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(u,h,b,E,R,S=0){S&&u.rotateZ(S),u.translate(b,E,R);const _=u.index?u.toNonIndexed():u;_!==u&&u.dispose();const f=new ie(h),v=new Float32Array(_.attributes.position.count*3);for(let w=0;w<v.length;w+=3)v[w]=f.r,v[w+1]=f.g,v[w+2]=f.b;_.setAttribute("color",new bn(v,3)),r.push(_)}const a=(u,h,b,E,R,S,_,f=0)=>o(new tn(u,h,b),E,R,S,_,f),c=(u,h,b,E,R,S,_=u)=>o(new Vn(_,u,h,10),b,E,R,S),{accent:l,hair:d,motif:g,accessory:p,hairStyle:m,shirt:x}=i;if(t==="head"){if(a(.49,.16,.45,d,0,.23,-.02),a(.45,m==="long"?.72:.29,.13,d,0,m==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(m))for(const u of[-1,1])a(.09,m==="long"?.6:.33,.32,d,u*.24,-.02,-.03);if(m==="spiky")for(let u=0;u<7;u++)o(new pi(.11,.27+u%3*.06,5),d,(u-3)*.066,.39+Math.sin(u)*.025,-.06,(u-3)*-.16);if(m==="split"&&a(.245,.18,.46,l,.123,.24,-.015),m==="side"&&a(.26,.25,.05,d,-.12,.08,.218,-.18),m==="ponytail"&&a(.27,.5,.25,d,0,-.15,-.37),p.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),p==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),p==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,x,0,.395,0)),p==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const u of[-1,1])a(.06,.33,.06,"#94745a",u*.3,.64,0,u*-.3),a(.15,.055,.06,"#94745a",u*.36,.72,0)}if(p==="bamboo"){const u=new Vn(.052,.052,.35,10);u.rotateZ(Math.PI/2),o(u,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(p==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),p==="goggles"||p==="glasses")for(const u of[-1,1])a(.19,.12,.06,l,u*.12,p==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",u*.12,p==="goggles"?.23:.04,.271);if(p==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const u of[-1,1])a(.12,.2,.08,"#aba2a6",u*.2,.31,0,u*-.35),a(.06,.055,.025,"#84aabb",u*.14,.07,.208)}if(p==="butterfly")for(const u of[-1,1])a(.18,.17,.045,l,u*.15,.31,-.12,u*.4);if(p==="earrings")for(const u of[-1,1])a(.045,.15,.035,"#e9d6bc",u*.26,-.19,.02);if(i.id==="naruto")for(const u of[-1,1])for(let h=0;h<3;h++)a(.08,.012,.01,"#9f7055",u*.15,-.055-h*.033,.208,u*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){a(.028,.53,.035,l,0,1.23,.19);for(const u of[-1,1])a(.14,.37,.04,l,u*.14,1.26,.19,u*.08);if(g==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let u=0;u<3;u++)a(.03,.03,.035,"#eee2ba",0,1.13+u*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let u=0;u<4;u++)for(let h=0;h<4;h++){const b=(h-1.5)*.112,E=1+u*.13;g==="checks"&&(u+h)%2===0&&a(.11,.127,.025,l,b,E,.19),g==="triangles"&&(u+h)%2===0&&o(new pi(.035,.065,3),l,b,E,.205),g==="clouds"&&u%2===0&&h%2===0&&(a(.13,.045,.03,l,b,E,.2),c(.04,.03,l,b,E+.035,.2))}if(g==="circle"&&o(new Ri(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let u=0;u<3;u++)a(.32,.015,.02,"#b6a273",0,1.19+u*.07,.26)}else if(g==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const u of[-1,1])a(.12,.51,.07,l,u*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const u of[-1,1])a(.065,.52,.04,l,u*.1,1.23,.2,u*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(p))for(let u=0;u<(p==="swords"?3:1);u++){const h=.3+u*.06;a(.055,.83,.055,"#373d4a",h,.92,-.18,-.25),a(.09,.23,.07,l,h+.1,1.4,-.18,-.25)}if(p==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(p))for(const u of[-1,1])a(p==="gauntlets"?.27:.2,.2,.24,l,u*.37,.99,.05)}const M=hi(r,!1);return r.forEach(u=>u.dispose()),n.add(M),e.set(s,M),M}function ls(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function i_(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(Hi.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(c>=.72&&o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const d=t.clone().add(new O(o.x*.4,l,o.z*.4));if(d.sub(t).clampLength(s,r).add(t),i.cameraLimit(t,d,n)>=.99)return d}return t.clone().add(new O(0,Hi.clamp(6,s,r),0))}function s_(){let i=null,t=!1,e=0,n=null;return{reset(){i=null,n=null,t=!1,e=0},resolve(s,r,o,a=[],c=3.6,l=35,d=1/30){const g=Hi.clamp(Number(d)||.03333333333333333,.001,.06),p=i_(s,r,o,a,c,l),m=p.sub(r),x=o.clone().sub(r).clampLength(c,l);if(m.distanceTo(x)>.05?(t=!0,e=0,n=m.clone()):t&&(e+=g,e<.35&&n?m.copy(n):(t=!1,n=null)),!i)i=m.clone();else{const u=m.clone().sub(i).multiplyScalar(1-Math.exp(-g*7));u.clampLength(0,Math.max(8,c*2)*g),i.add(u)}return i.clampLength(c,l),r.clone().add(i)}}}function r_({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new Gs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,d,g,p,m]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"],["KAIA",52,32.9,!0,"armorer","#375976"]]){let u=function(E,R,S,_,f,v,w){let T=new tn(E,R,S).toNonIndexed();T.translate(_,f,v);const A=new ie(w),D=new Float32Array(T.attributes.position.count*3);for(let U=0;U<D.length;U+=3)A.toArray(D,U);T.setAttribute("color",new bn(D,3)),M.push(T)};const x=new Nn;x.position.set(l,-.12,d),x.userData.hospitality=p,i.add(x);const M=[];if(u(.49,.66,.32,0,1.15,0,m),u(.41,.45,.4,0,1.7,0,"#e4b492"),u(.46,.16,.45,0,1.96,-.02,g?"#51352e":"#29272d"),u(.46,g?.65:.27,.13,0,g?1.66:1.82,-.21,g?"#51352e":"#29272d"),g){for(const E of[-1,1])u(.07,.43,.29,E*.23,1.74,-.03,"#51352e"),u(.05,.025,.02,E*.13,1.65,.209,"#cf8790");u(.58,.3,.38,0,.81,0,m)}for(const E of[-1,1])u(.035,.04,.025,E*.1,1.73,.207,"#253b36"),u(.18,.65,.2,E*.14,.45,0,"#263e39"),u(.22,.13,.33,E*.14,.08,.06,"#1c2b28"),u(.16,.4,.2,E*.33,1.2,0,m),u(.15,.26,.16,E*.33,.9,.04,"#e4b492");u(.09,.025,.025,0,1.58,.21,"#b66c78"),(p==="hostess"||p==="bartender")&&(u(.3,.49,.035,0,1.02,.18,g?"#c6a971":"#253e38"),u(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),u(.1,.07,.04,0,1.44,.19,"#374941"),u(.45,.04,.3,.36,.89,.17,"#c5ab71"),u(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const h=hi(M,!1);M.forEach(E=>E.dispose()),e.add(h);const b=new ye(h,r);b.userData.officeVenue=p==="armorer"?"armory":p==="dj"?"disco":"bar",x.add(b),a.push(b),o.push(x),t.addBox(.68,.68,l,d,"hospitality-npc",2.1),p==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,d)}return{targets:a,update(c,l){o.forEach((d,g)=>{d.rotation.y=g<2?Math.sin((l?0:c)/4500+g)*.1:0,d.children[0].position.y=l?0:Math.sin(c/1800+g)*.018})}}}const ai=(i,t,e)=>i+(t-i)*e;function o_(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),d=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let g=r?o?.16:.06:0,p=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const m=[d,-d],x=[-d*.85,d*.85],M=[0,0],u=i.officeAnimation??={airborne:!1,landing:0};if(t?.action==="jump"){const b=Math.max(-1,Math.min(1,(t.vy??0)/7)),E=Math.max(0,b),R=Math.max(0,-b);g=-.1+R*.12,m[0]=.18+E*.4,m[1]=.24+E*.28,x[0]=-.65-E*.2,x[1]=-.6-R*.18,p=0,u.airborne=!0,u.landing=0}else u.airborne&&(u.airborne=!1,t?.grounded!==!1&&!["fly","land","rest"].includes(t?.action)&&(u.landing=.18));if(u.landing>0&&(u.landing=Math.max(0,u.landing-n),!a&&!s)){const b=Math.sin(u.landing/.18*Math.PI);p-=b*.09,g+=b*.06}t?.action==="fly"&&(g=.16,m.fill(.3),x.fill(.15),M[0]=-.12,M[1]=.12,p=0),t?.action==="land"&&(g=-.06,m.fill(.35),x.fill(-.3),p=0),a&&(g=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,p=c?.4:-.5,m.fill(c?0:-1.25),x.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(M[0]=-.3,M[1]=.3),s||(p+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(x[1]=-.8+(s?0:Math.sin(e*3)*.45),x[0]=-.3,g=.07),t?.action==="cast"&&(x[0]=t.skillPose==="beam"?-1.25:-.9,x[1]=-1.4,m[0]=-.12,m[1]=.2,g=.12),t?.action==="drink"&&(x[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(x[0]=-1),t?.action==="dance"&&(x[0]=-.8,x[1]=-.7,m[0]=s?0:Math.sin(e*2.4)*.2,m[1]=-m[0]),i.body.rotation.x=ai(i.body.rotation.x,g,l),i.body.position.y=ai(i.body.position.y,p,l),i.body.rotation.z=ai(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((b,E)=>{b.rotation.x=ai(b.rotation.x,m[E],l),b.rotation.z=ai(b.rotation.z,M[E],l)}),i.arms.forEach((b,E)=>{b.rotation.x=ai(b.rotation.x,x[E],l),b.rotation.z=ai(b.rotation.z,o?E?-.12:.12:0,l)}),i.head.rotation.x=ai(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=ai(i.head.rotation.y,0,l);const h=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(b=>b.scale.y=ai(b.scale.y,h,l)),{lying:c,moving:r}}function a_(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(d=>Math.hypot(d.x-c,d.z-l)>.65)})))return s}return null}function jc(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(p=>Math.hypot(p.x-a.x,p.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,d=c*c+l*l;if(d&&n.some(p=>{const m=Math.max(0,Math.min(1,((p.x-t.x)*c+(p.z-t.z)*l)/d));return Math.hypot(t.x+c*m-p.x,t.z+l*m-p.z)<.62&&m>0}))continue;const g=s?a_(i,a,n):t.yaw||0;if(g!==null)return{...a,yaw:g}}return null}function l_(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function d(S,_=!1){const f=S+_;return o.has(f)||o.set(f,new i.MeshStandardMaterial({color:S,emissive:S,emissiveIntensity:_?.55:.13,roughness:.55,metalness:.18,transparent:_,opacity:_?.78:1,depthWrite:!_})),o.get(f)}function g(S,_,f,v,w,T,A=!1){r.add(_);const D=new i.Mesh(_,d(f,A));return D.position.set(v,w,T),S.add(D),D}const p=(S,_,f,v,w,T,A,D,U=!1)=>g(S,new i.BoxGeometry(_,f,v),w,T,A,D,U),m=(S,_,f,v,w,T,A,D,U=!1)=>{const I=g(S,new i.SphereGeometry(1,10,7),D,_,f,v,U);return I.scale.set(w,T,A),I},x=(S,_,f,v,w,T,A)=>g(S,new i.ConeGeometry(_,f,5),v,w,T,A,!0),M=(S,_,f)=>{const v=new i.Group;return v.position.set(S,_,f),s.add(v),v},u=t.color,h=t.accent||"#eddbff",b=t.dark||"#36214f";if(t.model==="susanoo"){p(s,1.75,1.65,.85,u,0,3.7,0),p(s,1.1,.65,.75,u,0,2.65,0);for(let w=0;w<5;w++)for(const T of[-1,1]){const A=p(s,.74,.055,.07,h,T*.4,3.15+w*.25,.46,!0);A.rotation.z=T*.18}p(s,1.45,.24,.95,b,0,2.5,0);for(let w=0;w<5;w++){const T=w*Math.PI*2/5,A=p(s,.85,1,.16,u,Math.sin(T)*.68,2.05,Math.cos(T)*.53);A.rotation.y=T,A.rotation.z=Math.sin(T)*.12}for(const w of[-1,1]){const T=M(w*.47,1.7,0);p(T,.52,1.1,.58,u,0,-.4,0),p(T,.64,.4,.7,b,0,-.8,.04),p(T,.48,.65,.56,u,0,-1.2,0),p(T,.6,.3,.95,u,0,-1.57,.2),l.push({node:T,side:w,kind:"leg"});const A=M(w*1.08,4.25,0);p(A,.6,1.1,.65,u,0,-.45,0),p(A,.75,.35,.85,h,0,.04,0),p(A,.64,.85,.65,b,0,-1.25,0),p(A,.58,.35,.55,u,0,-1.85,.07),l.push({node:A,side:w,kind:"arm"});for(let G=0;G<3;G++)p(s,.95,.16,.85,u,w*(1.03+G*.05),4.38-G*.17,0);const D=M(w*.72,4.35,-.43);D.userData.wingSide=w,a.push(D);const U=p(D,2.2,.24,.23,h,w*1,1.02,-.1,!0);U.rotation.z=w*.48;for(let G=0;G<3;G++)for(let H=0;H<(n?5:8);H++){const W=p(D,.48,1.2+G*.3,.12,u,w*(.55+H*.37),.75-G*.56+H*.12,-.12-G*.04,!0);W.rotation.z=-w*.55}const I=x(D,.16,.55,h,w*2.2,1.7,-.1);I.rotation.z=-w*.8}const S=M(0,5.05,.02);p(S,.76,.85,.7,u,0,0,0),p(S,.53,.25,.45,b,0,-.25,.25);for(const w of[-1,1]){const T=p(S,.22,.07,.08,"#fff89e",w*.18,.04,.4,!0);T.rotation.z=-w*.25;const A=x(S,.17,.95,u,w*.42,.55,0);A.rotation.z=-w*.38}const _=x(S,.16,.63,h,0,-.02,.58);_.rotation.x=Math.PI/2;const f=p(S,.18,.22,.05,"#e7abff",0,.29,.39,!0);f.rotation.z=Math.PI/4;for(let w=-2;w<=2;w++){const T=x(S,.16,.8+Math.abs(w)*.1,u,w*.16,.85,-.08);T.rotation.z=-w*.15}const v=M(-1.15,2.28,.18);p(v,.14,.8,.14,b,0,0,0),p(v,.7,.1,.25,h,0,-.15,0),p(v,.24,2.4,.08,h,0,-1.4,0,!0),v.rotation.z=-.5,e==="itachi"&&(a.forEach(w=>w.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){m(s,0,2.1,-.12,1,1.35,.75,u),m(s,0,3.52,.35,.82,.78,.65,u),m(s,0,3.27,.98,.5,.27,.5,h),m(s,0,3.45,1.31,.19,.13,.13,b);for(const S of[-1,1]){const _=x(s,.39,1.3,u,S*.58,4.3,.14);_.rotation.z=-S*.22,p(s,.27,.1,.09,"#fff5c2",S*.38,3.66,.95,!0),p(s,.045,.14,.045,"#b93237",S*.38,3.66,1.01,!0);const f=p(s,.39,.1,.06,b,S*.48,3.56,.92);f.rotation.z=S*.4;const v=x(s,.08,.25,"#fff2c8",S*.23,3.11,1.18);v.rotation.z=Math.PI;for(let A=0;A<3;A++){const D=p(s,.65,.035,.04,b,S*.62,3.3-A*.12,1.02);D.rotation.z=S*(A-1)*.15}const w=M(S*.9,2.85,.1);m(w,0,-.4,.15,.33,.78,.35,u),m(w,0,-1.04,.33,.43,.22,.44,h),l.push({node:w,side:S,kind:"arm"});const T=M(S*.52,1.1,-.05);m(T,0,-.35,0,.4,.7,.4,u),m(T,0,-.85,.25,.5,.25,.6,h),l.push({node:T,side:S,kind:"leg"});for(let A=0;A<3;A++)x(w,.08,.28,b,(A-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let S=0;S<9;S++){const _=(S-4)*.42,f=M(Math.sin(_)*.25,1.6,-.6);f.rotation.y=_,f.userData.tailIndex=S;const v=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(U=>new i.Vector3(...U))),w=14,T=7,A=new i.TubeGeometry(v,w,.4,T,!1),D=A.attributes.position;for(let U=0;U<=w;U++){const I=v.getPointAt(U/w),G=1-.93*Math.pow(U/w,1.5);for(let H=0;H<=T;H++){const W=U*(T+1)+H,st=new i.Vector3().fromBufferAttribute(D,W).sub(I).multiplyScalar(G).add(I);D.setXYZ(W,st.x,st.y,st.z)}}A.computeVertexNormals(),g(f,A,u,0,0,0,!0),c.push(f)}}else{if(t.model==="saiyan")for(let S=0;S<9;S++){const _=S*Math.PI*2/9,f=x(s,.13,.7,u,Math.sin(_)*.2,2.03,Math.cos(_)*.17);f.rotation.z=-Math.sin(_)*.7,f.rotation.x=Math.cos(_)*.6}if(t.model==="gear5"){for(let S=0;S<7;S++)m(s,Math.sin(S)*.2,1.91+Math.cos(S)*.07,Math.cos(S)*.13,.19,.16,.19,"#fff9ef");for(const S of[-1,1])for(let _=0;_<6;_++)m(s,S*(.35+_*.08),1.2+Math.sin(_)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const S=x(s,.12,.6,h,.19,1.96,.09);S.rotation.z=-.25;for(let _=0;_<6;_++){const f=p(s,.04,.12,.03,b,Math.sin(_)*.23,1.02+_*.09,.2);f.rotation.z=_*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),m(s,0,1.05,0,.42,.5,.29,u);for(const S of[-1,1]){const _=p(s,.06,.65,.06,h,S*.38,1.9,0);_.rotation.z=-S*.5}}if(t.model==="slayer")for(let S=0;S<8;S++){const _=x(s,.12,.5,u,Math.sin(S)*.42,.3+S*.14,Math.cos(S)*.35);_.rotation.z=Math.sin(S)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let S=0;S<8;S++){const _=p(s,.04,.38,.04,t.model==="icefire"&&S%2?"#ff9366":u,Math.sin(S)*.4,.35+S*.17,Math.cos(S)*.28,!0);_.rotation.z=S%2?.5:-.5}}const E=g(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),u,0,.06,0,!0);E.rotation.x=-Math.PI/2;function R(S){for(const f of[...S.children])f.isGroup&&R(f);const _=new Map;for(const f of[...S.children])if(f.isMesh){f.updateMatrix();const v=f.geometry.index?f.geometry.toNonIndexed():f.geometry.clone();v.applyMatrix4(f.matrix),_.has(f.material)||_.set(f.material,[]),_.get(f.material).push(v),S.remove(f),f.geometry.dispose(),r.delete(f.geometry)}for(const[f,v]of _){const w=hi(v,!1);v.forEach(T=>T.dispose()),r.add(w),S.add(new i.Mesh(w,f))}}return R(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(S,{flying:_=!1,moving:f=!1}={}){const v=n?0:S;a.forEach((w,T)=>{w.rotation.y=(T?1:-1)*(_?.18+Math.sin(v*3)*.2:1.25+Math.sin(v*1.3)*.04)}),c.forEach((w,T)=>{w.rotation.y=(T-4)*.42+Math.sin(v*1.8+T*.6)*.09,w.rotation.x=.12+Math.cos(v*1.2+T)*.09}),l.forEach(({node:w,side:T,kind:A})=>{w.rotation.x=_?A==="leg"?.3:-.25:f?Math.sin(v*7+(T<0?Math.PI:0))*(A==="leg"?.3:-.2):0})},dispose(){r.forEach(S=>S.dispose()),o.forEach(S=>S.dispose()),s.clear()}}}function c_({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[g,p]of c)g.visible=p;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const d=o.position.clone().sub(a.anchor);ls(n),e.position.copy(a.position).add(d),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(d),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(d,g){if(d===r){o=g;return}l(),!(d===null||!g)&&(ls(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:g.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=d,o=g,t.interior(d),i.background=s,i.fog=null,n.minDistance=2.6,n.maxDistance=8,n.target.copy(g.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const d of i.children)c.has(d)||c.set(d,d.visible),d.visible=!!(d.isLight||d===o||d.userData.residenceLayer||d.userData.officeAbility===r||d.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function u_(i,t){const e=new i.Group,n=new i.Group,s=[],r=[];e.visible=!1,e.userData.officeHologram=!0,t.add(e),e.add(n);const o=(_,f)=>{const v=new i.MeshBasicMaterial({color:_,transparent:!0,opacity:f,depthWrite:!1,side:i.DoubleSide});return r.push(v),v},a=o("#77e6ed",.75),c=o("#ddc38c",.85),l=o("#244f69",.12),d=o("#70dfe5",.09);d.blending=i.AdditiveBlending;const g=new i.PlaneGeometry(2.9,1.6),p=new i.BoxGeometry(1,1,.018),m=new i.TorusGeometry(.48,.014,4,40),x=new i.ConeGeometry(.95,1.6,12,1,!0);s.push(g,p,m,x);const M=new i.Mesh(g,l);n.add(M);const u=new Map([[a,[]],[c,[]]]),h=(_,f,v,w,T=a)=>u.get(T).push({x:_,y:f,w:v,h:w});for(const _ of[-1.45,1.45]){h(_,0,.018,1.6);for(const f of[-.8,.8])h(_-Math.sign(_)*.15,f,.3,.03,c)}h(0,.8,2.9,.012),h(0,-.8,2.9,.012),h(-.55,.42,1.25,.035,c);for(let _=0;_<3;_++)h(-.34,.08-_*.23,1.65-_*.2,.018),h(-1.15,.08-_*.23,.08,.08,c);for(let _=0;_<24;_++){const f=_*Math.PI/12;h(.92+Math.cos(f)*.28,.1+Math.sin(f)*.28,.035,.035)}h(0,0,2.85,.025);let b=null;const E=new i.Matrix4;for(const[_,f]of u){const v=new i.InstancedMesh(p,_,f.length),w=new i.Matrix4;f.forEach((T,A)=>{w.makeScale(T.w,T.h,1),w.setPosition(T.x,T.y,.015),v.setMatrixAt(A,w)}),v.computeBoundingSphere(),n.add(v),_===a&&(b={mesh:v,index:f.length-1},v.instanceMatrix.setUsage(i.DynamicDrawUsage))}const R=new i.Mesh(m,a);R.rotation.x=-Math.PI/2,R.position.y=-1.1,e.add(R);const S=new i.Mesh(x,d);return S.rotation.z=Math.PI,S.position.y=-.85,e.add(S),{update(_,f,{time:v=0,height:w=1.8,reduced:T=!1}={}){return e.visible=!!_,_?(e.userData.officeAbility!==_.person.id&&e.traverse(A=>{A.isMesh&&(A.userData.officeHologramOwner=_.person.id)}),e.userData.officeAbility=_.person.id,e.position.copy(_.group.position),e.position.y+=w+1.55+(T?0:Math.sin(v*1.4)*.035),n.quaternion.copy(f.quaternion),R.rotation.z=T?0:v*.2,E.makeScale(2.85,.025,1),E.setPosition(0,T?0:Math.sin(v*.9)*.75,.03),b.mesh.setMatrixAt(b.index,E),b.mesh.instanceMatrix.needsUpdate=!0,e.position.clone().project(f)):(e.userData.officeAbility=null,null)},hide(){e.visible=!1,e.userData.officeAbility=null},dispose(){t.remove(e),s.forEach(_=>_.dispose()),r.forEach(_=>_.dispose())},root:e}}function h_(i,t){const e={box:new i.BoxGeometry(1,1,1),orb:new i.SphereGeometry(1,12,8),ring:new i.TorusGeometry(1,.04,5,28),tip:new i.ConeGeometry(.15,.6,6)},n=new Map,s=new Map,r=new Map,o=[],a=d=>(n.has(d)||n.set(d,new i.MeshBasicMaterial({color:(_s.weapons[d]||_s.specials[d]).color,transparent:!0,opacity:.8,depthWrite:!1})),n.get(d));function c(d,g,p,m,x){const M=new i.Mesh(e[g],a(p));return M.position.set(...m),M.scale.set(...x),d.add(M),M}function l(d){s.get(d)?.root.removeFromParent(),s.delete(d),r.delete(d)}return{observe(d,g,p,m=Date.now()){if(!p)return;const x=_s.weapons[g?.weapon]?g.weapon:null,M=s.get(d);if((M?.figure!==p||M?.kind!==x)&&(M?.root.removeFromParent(),s.delete(d),x)){const v=new i.Group,w=x==="sniper"?1.15:x==="pistol"?.45:.8;v.userData.officeWeapon=x,v.position.set(0,-.5,.16),c(v,"box",x,[0,0,.18],[.14,.18,w]),c(v,"box",x,[0,-.13,0],[.1,.25,.14]),x==="sniper"&&c(v,"box",x,[0,.15,.15],[.12,.12,.35]),v.traverse(T=>{T.isMesh&&(T.userData.personId=d)}),(p.arms?.[1]||p.body).add(v),s.set(d,{root:v,kind:x,figure:p})}const u=s.get(d);if(u&&(u.root.visible=!g?.form&&!["rest","play","drink","eat"].includes(g?.action),u.root.rotation.x=.7+(g.aim_pitch||0)),!g?.shot_at||r.get(d)>=g.shot_at)return;r.set(d,g.shot_at);const h=g.shot_kind,b=g.shot_end;if(!(_s.weapons[h]||_s.specials[h])||!b||!["x","y","z"].every(v=>Number.isFinite(b[v]))||m-g.shot_at>2500)return;for(;o.length>=8;)t.remove(o.shift().root);const E=new i.Group,R=_s.specials[h]?(Dh(g.form)?.height||2.2)*.55:1.2,S=g.shot_origin&&["x","y","z"].every(v=>Number.isFinite(g.shot_origin[v]))?new i.Vector3(g.shot_origin.x,g.shot_origin.y,g.shot_origin.z):p.group.position.clone().add(new i.Vector3(0,R,0)),_=new i.Vector3(b.x,b.y,b.z);E.position.copy(S),E.lookAt(_),E.userData.officeAbility=d,t.add(E),E.userData.officeShot=h;const f=new i.Group;if(E.add(f),h==="bijudama"){c(f,"orb",h,[0,0,0],[.8,.8,.8]);for(let v=0;v<3;v++)c(f,"ring",h,[0,0,0],[1,1,1]).rotation.set(v*.9,v*.6,0)}else if(c(f,"box",h,[0,0,0],[h==="indra_arrow"?.1:.035,h==="indra_arrow"?.1:.035,h==="indra_arrow"?2:.9]),h==="indra_arrow"){const v=c(f,"tip",h,[0,0,1.25],[2,2,2]);v.rotation.x=Math.PI/2;const w=c(E,"ring",h,[0,0,.6],[1.25,1.8,1]);w.rotation.y=Math.PI/2}o.push({root:E,projectile:f,origin:S,target:_,start:m,duration:h==="bijudama"?1100:h==="indra_arrow"?650:240,kind:h})},update(d=Date.now(),g=!1){for(let p=o.length-1;p>=0;p--){const m=o[p],x=d-m.start,M=Math.min(1,x/m.duration);if(x>m.duration+180){t.remove(m.root),o.splice(p,1);continue}m.projectile.position.z=m.origin.distanceTo(m.target)*M,!g&&m.kind==="bijudama"&&(m.projectile.rotation.z=x*.003),m.projectile.scale.setScalar(x>m.duration?Math.max(.1,1-(x-m.duration)/180):1)}},forget:l,dispose(){for(const d of s.keys())l(d);o.forEach(d=>t.remove(d.root)),o.length=0,Object.values(e).forEach(d=>d.dispose()),n.forEach(d=>d.dispose()),n.clear()},active:()=>o.length}}function d_({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},onHologramAnchor:c=()=>{},onCombatFire:l=()=>{},onAimChange:d=()=>{},rendererFactory:g=x=>new yh(x),controlsFactory:p=(x,M)=>new Ag(x,M),getDate:m=()=>new Date}){const x=new Hu,M=new zn(36,1,.1,1200),u=g({antialias:!0,alpha:!1,powerPreference:"low-power"});u.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),u.outputColorSpace=Mn,u.toneMapping=$o,u.toneMappingExposure=1.18,i.append(u.domElement);const h=p(M,u.domElement);h.enableDamping=!0,h.dampingFactor=.09,h.minDistance=8,h.maxDistance=650,h.minPolarAngle=.32,h.maxPolarAngle=1.28,h.target.set(0,0,0),h.enablePan=!0,h.panSpeed=.7,h.rotateSpeed=.55,h.enableKeys=!1;const b=new rh("#fbf3dc","#526c61",2.8);x.add(b);const E=new $a("#fff1cf",3.2);E.position.set(-12,25,15),x.add(E);const R=new $a("#cce5ef",1.1);R.position.set(15,10,-10),x.add(R);const S=new Map,_=new Map,f=new Set,v=new Set,w=new Map,T=jg(),A=s_(),D=Lh({THREE:Zr,scene:x,navigation:T,reduced:()=>lt||oe,createModel:(y,L)=>l_(Zr,y,{...L,reduced:lt||oe})}),U=u_(Zr,x);let I=null,G=0;const H=h_(Zr,x);let W={},st=!1,J=!1,nt=null;function ut(y){if(!(!y||(y.combat_revision??0)<(W.combat_revision??0))){y.weapon&&y.weapon!==W.weapon&&(ze=null,Te=null);for(const L of["hp","weapon","shield_until","respawn_id","shot_at","shot_kind","shot_origin","shot_end","attack_ready_at","combat_revision"])Object.hasOwn(y,L)&&(W[L]=y[L]);Ct()}}function mt(y){return y=!!(y&&te&&!Ii()&&!de.active()&&(W.weapon||["susanoo","kurama"].includes(D.modeState(Vt)?.id))),y===st||(st=y,ls(h),A.reset(),y?(ze=null,Te=null,D.cancel(Vt),Be("follow",Vt),nt={buttons:h.mouseButtons?{...h.mouseButtons}:null,polar:h.maxPolarAngle},h.mouseButtons&&(h.mouseButtons.LEFT=null,h.mouseButtons.RIGHT=ki.ROTATE),h.maxPolarAngle=Math.PI-.25):nt&&(nt.buttons&&Object.assign(h.mouseButtons,nt.buttons),h.maxPolarAngle=nt.polar,nt=null),d(st),Ct()),st}const Pt={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function $(y){return S.has(y)||S.set(y,new Gs({color:Pt[y]||y,roughness:y==="metal"?.4:.82,metalness:y==="gold"?.45:.02,...y==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:gn}:{}})),S.get(y)}const pt=new tn(1.1,.035,2.2);f.add(pt);const bt=new Al(pt,$("#c9b384"),24);bt.instanceMatrix.setUsage(Ml),bt.count=0,bt.frustumCulled=!1,x.add(bt),bt.userData.officeRestMats=!0;const Nt=new xe,wt=new Pn;function Wt(y,L,F,q,Y,yt=0,zt=0,j=0){let Ht=y;y.index&&(Ht=y.toNonIndexed(),y.dispose()),wt.setFromEuler(new ti(yt,zt,j)),Ht.applyMatrix4(new xe().compose(new O(F,q,Y),wt,new O(1,1,1))),_.has(L)||_.set(L,[]),_.get(L).push(Ht)}function at(y,L,F,q,Y,yt,zt,j=.035,Ht=0){Wt(j>0?new Zo(y,L,F,1,Math.min(j,y/3,L/3,F/3)):new tn(y,L,F),zt,q,Y,yt,0,Ht)}function At(y,L,F,q,Y,yt,zt=y){Wt(new Vn(zt,y,L,12),yt,F,q,Y)}function ce(y,L,F,q,Y,yt,zt){const j=new Vi(1,10,7);j.scale(y,L,F),Wt(j,zt,q,Y,yt)}function ve(y,L,F=1){T.addBox(.85*F,.85*F,y,L,"plant",2*F),At(.4*F,.7*F,y,.35*F,L,"pot",.31*F),At(.045*F,1.4*F,y,1.2*F,L,"oak");for(let q=0;q<5;q++){const Y=q*2.4;ce(.48*F,.52*F,.25*F,y+Math.cos(Y)*.3*F,(1.4+q*.15)*F,L+Math.sin(Y)*.25*F,q%2?"leaf":"lightLeaf")}}function Jt(y,L,F,q,Y,yt,zt="#f2e8d5",j=0){const Ht=document.createElement("canvas");Ht.width=768,Ht.height=192;const Re=Ht.getContext("2d");Re.clearRect(0,0,768,192),Re.fillStyle=zt,Re.textAlign="center",Re.font="500 66px Georgia",Re.fillText(y,384,88),Re.font="20px Arial",Re.fillText(L,384,139);const Fe=new Ja(Ht);Fe.colorSpace=Mn,v.add(Fe);const et=new ui({map:Fe,transparent:!0,depthWrite:!1,side:gn}),K=new Pi(F,F/4);f.add(K);const Xe=new ye(K,et);Xe.position.set(q,Y,yt),Xe.rotation.y=j,x.add(Xe),S.set(`sign-${y}`,et)}at(86,.6,96,0,-.94,28,"base",.3),at(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),at(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const y of[-1,1]){at(54,.04,4,y*70,-.17,20,"#e6dfcc",0),at(4,.04,55,y*87,-.17,45,"#e6dfcc",0);for(let L=-20;L<92;L+=8)At(.08,1.1,y*99,.35,L,"wood"),at(.08,.08,8,y*99,.7,L+4,"wood",0);for(const L of[34,58,80])at(3,.4,.9,y*92,.05,L,"wood",.06),T.addBox(3,.9,y*92,L,"trail-bench",.7),ve(y*80,L,1);Jt("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,y*58,1.7,18)}T.addBox(160,40,0,97,"water-boundary",.1),T.configureHomes(!0);for(const y of[-99,99])T.addBox(.2,114,y,35,"scenic-fence",1.2);T.addBox(202,.2,0,91,"scenic-boundary",1.2),at(85,.07,18,0,-.43,67,"#e4cfa5",.1),at(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let y=0;y<8;y++)at(120-y*8,.02,.13,0,-.57,79+y*2.8,"#c4ddd4",0);at(7,.07,24,0,-.4,60,"#e6dfcc",.1);const Rt=e_({scene:x,box:at,cylinder:At,orb:ce,bake:Wt,sign:Jt,material:$,navigation:T,ownedGeometries:f,materials:S}),Yt=r_({scene:x,navigation:T,ownedGeometries:f,materials:S,sign:Jt});at(8,.12,7,52,-.3,34,"metal"),at(6,1.2,.7,52,.48,34,"deep"),at(6,2.8,.2,52,1.2,31.6,"metal"),T.addBox(6,.7,52,34,"armory-counter",1.2),T.addBox(6,.2,52,31.6,"armory-wall",2.8),Jt("ATLAS / ARMORY","KAIA / VIRTUAL EQUIPMENT",6,52,3.3,31.8);for(let y=0;y<4;y++)at(.8,.18,.2,50+y*1.3,.72,34,"gold"),at(.12,.15,.7,50+y*1.3,.72,34.3,"metal");for(let y=0;y<8;y++){const L=-36+y*3.7;at(1.5,.25,2.8,L,-.1,67,"white",.1),at(1.4,.17,1,L,.26,66,"sofa",.08),T.addBox(1.5,2.8,L,67,"beach-chair",.6),y%2===0&&(At(.05,3,L+1.2,1,65,"gold"),Wt(new pi(1.8,.6,10),"white",L+1.2,2.7,65),T.addBox(.2,.2,L+1.2,65,"parasol",2.8))}at(19,.15,10,22,-.3,65,"wood",.1),Jt("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const y of[16,22,28])At(1.2,.13,y,.8,63,"white"),At(.1,1,y,.2,63,"gold"),T.addBox(2.4,2.4,y,63,"terrace-table",.9);for(const y of[-10,-6,-2]){ve(y,58,.9);for(let L=0;L<4;L++)ce(.15,.2,.15,y+(L-1.5)*.3,.9,58,"#c18b9c")}at(83,.08,4,0,-.44,20,"#e6dfcc",.12),at(6,.08,64,0,-.44,16,"#e6dfcc",.1),at(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const y of[-41,41])for(const L of[-15,-2,14,31,46])ve(y,L,1.7),At(.08,3.2,y+(y<0?1:-1),1.15,L+2,"gold"),ce(.22,.25,.22,y+(y<0?1:-1),2.85,L+2,"white");const ue=[];function $t(y,L,F,q){T.addBox(F,.12,y,L,"net",q);for(const Y of[-F/2,F/2])At(.055,q,y+Y,q/2,L,"white");for(let Y=.3;Y<=q;Y+=.22)at(F,.018,.025,y,Y,L,"white",0);for(let Y=-F/2;Y<=F/2;Y+=.4)at(.012,q-.3,.018,y+Y,(q+.3)/2,L,"white",0)}function me(y,L,F=.16){const q=new Vi(F,10,8);f.add(q);const Y=new ye(q,$(L));Y.userData.officeBall=y.id,x.add(Y),ue.push({mesh:Y,game:y})}for(const y of es){const{x:L,z:F,id:q}=y;if(T.addBox(6,.14,L,F-(y.kind==="court"?6:4.2),"sign",1.2),at(y.kind==="court"?17:10,.12,y.kind==="court"?13:9,L,-.29,F,q==="tennis"?"#a77355":q==="badminton"?"#3b7e77":q==="basketball"?"#b99569":"#dce0ca",.14),at(6,1.1,.12,L,.65,F-(y.kind==="court"?6:4.2),"deep"),Jt(y.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,L,.75,F-(y.kind==="court"?5.91:4.11)),q==="tennis"||q==="badminton"||q==="basketball"){for(const Y of[-7,7])at(.045,.015,10.8,L+Y,-.21,F,"white",0);for(const Y of[-5.4,0,5.4])at(14,.015,.045,L,-.21,F+Y,"white",0);if(q!=="basketball"){for(const Y of[-5.7,5.7])at(.035,.015,10.8,L+Y,-.2,F,"white",0);$t(L,F,14,q==="badminton"?1.7:1.15),me(y,q==="tennis"?"#d9e56b":"white",q==="tennis"?.17:.12)}else{for(const Y of[-1,1]){At(.09,3.6,L,1.5,F+Y*5,"metal"),at(2.3,1.35,.13,L,3.1,F+Y*4.7,"white");const yt=new Ri(.43,.045,6,20);Wt(yt,"#c67543",L,2.8,F+Y*4.1,Math.PI/2)}me(y,"#bd6c32",.25)}}else if(q==="golf"){for(const Y of[-6.5,6.5])T.addBox(.2,8,L+Y,F,"golf-edge",.5);at(13,.12,8,L,-.15,F,"#69885c",.15);for(const Y of[-6.5,6.5])at(.2,.35,8,L+Y,-.05,F,"woodLight");for(let Y=0;Y<3;Y++)At(.22,.02,L-4+Y*4,-.07,F+(Y%2?2:-2),"black"),At(.025,1.5,L-4+Y*4,.65,F+(Y%2?2:-2),"gold"),at(.8,.4,.03,L-3.6+Y*4,1.25,F+(Y%2?2:-2),"#c78362");me(y,"white",.12)}else if(q==="bowling"){for(const Y of[-2.7,2.7])T.addBox(.35,11,L+Y,F,"bowling-edge",.4);at(5,.09,11,L,-.13,F,"woodLight");for(const Y of[-2.7,2.7])at(.35,.12,11,L+Y,-.1,F,"oak");for(let Y=0;Y<4;Y++)for(let yt=0;yt<=Y;yt++){const zt=L+(yt-Y/2)*.55,j=F-2-Y*.5;At(.14,.5,zt,.17,j,"white",.08),ce(.13,.14,.13,zt,.49,j,"white")}me(y,"#786397",.28)}else if(q==="arcade")for(const Y of[-2.2,2.2]){T.addBox(2.1,1.6,L+Y,F,"arcade",2.5),T.addBox(1.2,1.2,L+Y,F+2,"seat",.7),at(2.1,2.6,1.6,L+Y,1.1,F,"deep",.1),at(1.6,1.1,.05,L+Y,1.7,F+.83,"screen");for(let yt=0;yt<5;yt++)at(.05,.6,.02,L+Y+(yt-2)*.2,1.7,F+.87,yt%2?"#e8c877":"screenLine",0);At(.18,.06,L+Y,.9,F+1.1,"gold"),at(1.2,.45,1.2,L+Y,.2,F+2,"sofa",.1)}else if(q==="archery"){T.addBox(5,.3,L,F-2,"archery-backstop",3.2),at(5,3.2,.25,L,1.2,F-2,"wood");for(let Y=0;Y<5;Y++){const yt=new Vn(1.1-Y*.21,1.1-Y*.21,.03,24);Wt(yt,["white","#283e49","#73a7bf","#c36f60","gold"][Y],L,1.6,F-1.82+Y*.035,Math.PI/2)}at(5,.02,.12,L,-.18,F+2.8,"white",0)}else if(q==="darts"){T.addBox(5,.22,L,F-1.8,"dart-board",2.8),at(5,3,.22,L,1.25,F-1.8,"deep");for(let Y=0;Y<4;Y++){const yt=new Vn(1.05-Y*.23,1.05-Y*.23,.025,24);Wt(yt,Y%2?"white":"#bf6f59",L,1.6,F-1.64+Y*.025,Math.PI/2)}}else{T.addBox(5.5,3.5,L,F,"game-table",1.3),at(5.5,.25,3.5,L,1,F,q==="pingpong"?"#4c7783":q==="billiards"?"#376a59":"woodLight",.1);for(const Y of[-2.2,2.2])for(const yt of[-1.2,1.2])at(.18,1.1,.18,L+Y,.4,F+yt,"oak");if(q==="pingpong"&&($t(L,F,5.5,1.45),me(y,"white",.1)),q==="uno")for(let Y=0;Y<16;Y++){const yt=Y%4;at(.32,.035,.48,L+(yt<2?-1.7+Y%4*.3:1.4),1.16+Y*.002,F+(yt%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][Y%4],.02,Y*.3)}if(q==="chess")for(let Y=0;Y<8;Y++)for(let yt=0;yt<8;yt++)at(.34,.02,.34,L+(Y-3.5)*.34,1.14,F+(yt-3.5)*.34,(Y+yt)%2?"deep":"white",0),(yt<2||yt>5)&&At(.075,.17,L+(Y-3.5)*.34,1.24,F+(yt-3.5)*.34,yt<2?"white":"black");if(q==="billiards")for(let Y=0;Y<10;Y++)ce(.12,.12,.12,L+Math.sin(Y*2)*1.8,1.25,F+Math.cos(Y)*.9,["gold","white","deep"][Y%3]);if(q==="foosball")for(let Y=0;Y<5;Y++){at(.045,.045,4.5,L-2+Y,1.4,F,"metal",0);for(const yt of[-1,0,1])at(.2,.45,.18,L-2+Y,1.48,F+yt,Y%2?"#ba7864":"deep")}for(const Y of[-1,1])at(4,.35,.8,L,.28,F+Y*3.8,"sofa",.1),T.addBox(4,.8,L,F+Y*3.8,"bench",.5)}}at(40.5,.6,28,0,-.6,0,"base",.22),at(39.8,.22,27.3,0,-.2,0,"edge",.1),at(39.4,.18,26.9,0,-.04,0,"floor",.08),at(37.8,.04,13.5,0,.07,-5.8,"stone",.05),at(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),at(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let y=-18;y<19;y+=1.9)at(.015,.015,12.4,y,.14,-5.8,"#c3cfbf",0);at(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),at(39.4,.22,.5,0,4.8,-13.25,"gold"),at(8,4.8,.18,0,2.35,-13.02,"deep");for(let y=0;y<21;y++)at(.06,4.6,.1,-3.8+y*.38,2.35,-12.87,"wood",.01);at(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),Jt("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const y of[-15,-10,10,15]){at(4.1,2.9,.15,y,2.6,-13,"glass"),at(4.2,.08,.23,y,4.08,-12.85,"gold"),at(4.2,.12,.3,y,1.12,-12.85,"woodLight");for(const L of[-2,0,2])at(.055,2.9,.2,y+L,2.6,-12.86,"gold",0)}at(.13,2.8,10.8,0,1.55,-6.4,"glass"),at(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const y of[-11.8,-6.4,-1])at(.08,2.9,.08,0,1.5,y,"gold",0);at(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),at(.22,.08,25.7,-19.5,2.8,-.1,"gold"),at(.2,2.7,25.7,19.5,1.4,-.1,"glass"),at(.22,.08,25.7,19.5,2.8,-.1,"gold"),Jt("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),Jt("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function we(y,L,F){T.addBox(2.6,1.28,y,L,"desk",2.3),at(2.6,.15,1.28,y,1.31,L,"woodLight",.08);for(const q of[-1.03,1.03])at(.09,1.17,1.02,y+q,.66,L,"white"),at(.45,.08,.94,y+q,.15,L,"metal");at(1,.66,.08,y,1.91,L-.22,"metal"),at(.9,.54,.02,y,1.92,L-.166,"screen");for(let q=0;q<3;q++)at(.28+q*.12,.024,.025,y-.14+q*.04,2.03-q*.1,L-.149,"screenLine",0);At(.07,.25,y,1.48,L-.2,"metal"),at(.45,.035,.25,y,1.405,L-.19,"metal"),at(.71,.035,.24,y,1.42,L+.32,"white"),At(.09,.18,y+.9,1.49,L+.12,"deep"),at(.64,.17,.64,y,.66,L+1.02,F==="umum"?"sofa":"teal",.1),at(.65,.7,.12,y,1.08,L+1.33,F==="umum"?"sofa":"teal",.09),At(.055,.5,y,.35,L+1.05,"metal"),at(.8,.06,.14,y,.15,L+1.05,"metal"),at(.14,.06,.8,y,.15,L+1.05,"metal")}const We={umum:[],operasional:[]};for(const y of["umum","operasional"])for(let L=0;L<4;L++)for(let F=0;F<4;F++){const q=(y==="umum"?-15:3.4)+F*3.75,Y=-10.3+L*3.15;We[y].push([q,.18,Y+1.03]),we(q,Y,y)}for(const y of[-18.5,18.5]){at(.7,2.4,4.7,y,1.25,-8.4,"wood");for(let L=0;L<3;L++){at(.86,.06,4.8,y,.65+L*.69,-8.4,"gold");for(let F=0;F<8;F++)at(.5,.38+F%2*.12,.18,y,.88+L*.69,-10.3+F*.5,F%2?"white":"deep")}}at(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const y of[4.7,8,11.3]){at(15.8,.45,1.05,-8.7,.57,y,"sofa",.16),at(15.8,.9,.25,-8.7,.91,y-.62,"sofa",.12);for(let L=0;L<8;L++)at(1.72,.17,.95,-15.8+L*2.02,.86,y,L%3===0?"pillow":"sofa",.1);for(const L of[-16.7,-.7])at(.25,.68,1.35,L,.8,y,"sofa",.1)}for(const y of[-11.5,-5]){at(2.7,.13,1.2,y,.64,6.6,"woodLight",.12);for(const L of[-.9,.9])At(.05,.48,y+L,.37,6.6,"gold");At(.16,.22,y+.4,.81,6.6,"white")}at(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const y of[-11.5,-6.5])At(.04,.5,y,.32,2.85,"gold");Jt("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),at(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),at(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),at(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let y=0;y<23;y++)at(.055,1.15,.07,7.9+y*.4,.78,2.26,"woodLight",.01);at(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),at(.8,.55,.05,15.3,1.9,1.94,"black"),At(.18,.24,14.1,1.64,1.5,"white"),At(.18,.24,13.6,1.64,1.5,"white"),Jt("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const y of[8,13.8])for(const L of[5.1,9.7]){At(1.45,.12,y,1.05,L,"woodLight"),At(.13,.92,y,.55,L,"gold"),At(.68,.08,y,.12,L,"gold");for(const F of[-1.6,1.6])At(.42,.14,y+F,.67,L,"deep"),At(.055,.55,y+F,.34,L,"gold");At(.18,.22,y+.4,1.22,L,"white"),At(.22,.04,y-.3,1.14,L+.2,"white")}for(const[y,L,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])ve(y,L,F);T.addBox(39.4,.32,0,-13.25,"wall",4.8),T.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const y of[-19.5,19.5])T.addBox(.2,25.7,y,-.1,"glass-wall",2.8);for(const y of[4.7,8,11.3])T.addBox(16.1,1.5,-8.7,y,"sofa",1.4);T.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),T.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const y of[8,13.8])for(const L of[5.1,9.7])T.addBox(2.9,2.9,y,L,"cafe-table",1.3);for(const y of[-18.5,18.5])T.addBox(.9,4.8,y,-8.4,"shelf",2.6);for(const y of[-11.5,-5])T.addBox(2.7,1.2,y,6.6,"lounge-table",.8);for(const[y,L]of _){const F=hi(L,!1);L.forEach(q=>q.dispose()),F&&(f.add(F),x.add(new ye(F,$(y))))}_.clear();const Qt=Kg({scene:x,material:$,ownedGeometries:f}),de=c_({scene:x,residences:Qt,camera:M,controls:h,background:new ie("#182c2a")}),k=t_({scene:x,materials:S,ownedGeometries:f,sun:E,hemi:b,fill:R,navigation:T}),qe=document.createElement("canvas");qe.width=qe.height=128;const be=qe.getContext("2d"),Ee=be.createRadialGradient(64,64,7,64,64,64);Ee.addColorStop(0,"#16382f35"),Ee.addColorStop(1,"#16382f00"),be.fillStyle=Ee,be.fillRect(0,0,128,128);const Et=new Ja(qe);v.add(Et);const Le=new Pi(66,49);f.add(Le);const qt=new ui({map:Et,transparent:!0,depthWrite:!1});S.set("shadow",qt);const jt=new ye(Le,qt);jt.rotation.x=-Math.PI/2,jt.position.y=-.98,x.add(jt);const N=new Map,C=new Map;function Z(y){if(C.has(y))return C.get(y);const L=[];if(y==="archery"){const q=new Ri(.34,.025,5,16,Math.PI);q.rotateZ(-Math.PI/2),L.push(q.toNonIndexed()),q.dispose();const Y=new tn(.035,.035,.85);Y.translate(0,0,.1),L.push(Y.toNonIndexed()),Y.dispose()}else{const q=new Vn(.017,.03,y==="billiards"?1.65:1,6);q.rotateX(Math.PI/2),L.push(q.toNonIndexed()),q.dispose()}const F=hi(L,!1);return L.forEach(q=>q.dispose()),f.add(F),C.set(y,F),F}function ht(y,L,F,q,Y){const yt=L+F.join(":");if(!N.has(yt)){const j=L==="sphere"?new Vi(F[0],10,8):new Zo(...F,1,.06);N.set(yt,j),f.add(j)}const zt=new ye(N.get(yt),$(q));return zt.position.set(...Y),y.add(zt),zt}const ct=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],St=new Map,Tt=new Gs({vertexColors:!0,roughness:.8});S.set("costume-vertex",Tt);function rt(y){const L=new Nn;x.add(L);const F=Xl(y.avatar),q=Fh(F.costume),Y=(q?.style||F.style)==="feminine",yt=q?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||ct[y.id%ct.length],zt=new Nn;L.add(zt);const j={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],Ht=F.hair==="hijab"?yt:"#352c32";if(ht(zt,"box",[Y?.43:.5,.65,.33],yt,[0,1.17,0]).userData.avatarCloth=!0,!q&&F.outfit==="blazer"){ht(zt,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const ke of[-1,1]){const Ye=ht(zt,"box",[.07,.32,.035],"gold",[ke*.12,1.33,.19]);Ye.rotation.z=ke*.25}}!q&&F.outfit==="sport"&&ht(zt,"box",[.32,.055,.02],"white",[0,1.3,.18]);const Re=!q&&F.outfit==="dress"?ht(zt,"box",[.6,.4,.44],yt,[0,.79,0]):null,Fe=new Nn;if(Fe.position.y=1.69,zt.add(Fe),ht(Fe,"box",[.43,.46,.4],j,[0,0,0]),q){const ke=new ye(Qc(q,"head",St,f),Tt),Ye=new ye(Qc(q,"body",St,f),Tt);ke.userData.costumePart="head",Ye.userData.costumePart="body",Fe.add(ke),zt.add(Ye)}else{const ke="hair:"+F.hair;if(!N.has(ke)){const Ye=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const ts of[-1,1])Ye.push([.09,F.hair==="bob"?.4:.53,.32,ts*.235,-.01,-.03]);const ms=Ye.map(([ts,Eh,Th,wh,Ah,Rh])=>{const ma=new tn(ts,Eh,Th);ma.translate(wh,Ah,Rh);const Ch=ma.toNonIndexed();return ma.dispose(),Ch}),gs=hi(ms,!1);ms.forEach(ts=>ts.dispose()),N.set(ke,gs),f.add(gs)}Fe.add(new ye(N.get(ke),$(Ht)))}if(!q&&F.hair==="ponytail"&&ht(Fe,"box",[.24,.53,.22],Ht,[0,-.02,-.35]),!q&&F.hair==="hijab"&&ht(zt,"box",[.58,.18,.43],Ht,[0,1.44,-.04]),!N.has("eyes")){const ke=[-.095,.095].map(ms=>{const gs=new tn(.035,.045,.025);gs.translate(ms,.035,.205);const ts=gs.toNonIndexed();return gs.dispose(),ts}),Ye=hi(ke,!1);ke.forEach(ms=>ms.dispose()),N.set("eyes",Ye),f.add(Ye)}const et=new ye(N.get("eyes"),$("#263833"));Fe.add(et);const K=[et];if(ht(Fe,"box",[.09,.02,.025],Y?"#b96f78":"#9c6d58",[0,-.105,.21]),Y)for(const ke of[-.14,.14])ht(Fe,"box",[.065,.025,.02],"#d39589",[ke,-.065,.21]);if(F.accessory==="glasses"){for(const ke of[-1,1])ht(Fe,"box",[.15,.11,.025],"gold",[ke*.105,.04,.224]),ht(Fe,"box",[.11,.07,.025],j,[ke*.105,.04,.24]);ht(Fe,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){ht(Fe,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const ke of[-1,1])ht(Fe,"box",[.12,.2,.18],"deep",[ke*.28,.07,0])}const Xe=[];for(const ke of[-.34,.34]){const Ye=new Nn;Ye.position.set(ke,1.42,0),zt.add(Ye),ht(Ye,"box",[.17,.4,.2],yt,[0,-.19,0]).userData.avatarCloth=!0,ht(Ye,"box",[.15,.27,.16],j,[0,-.45,.05]),Xe.push(Ye)}const un=[],wn=[];for(const ke of[-.14,.14]){const Ye=new Nn;Ye.position.set(ke,.83,0),zt.add(Ye),ht(Ye,"box",[.18,.64,.2],q?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,wn.push(ht(Ye,"box",[.23,.14,.34],q?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),un.push(Ye)}const he=ht(Xe[1],"sphere",[.12],"white",[0,-.49,.14]),Me=ht(Xe[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),Fn=new Nn;Xe[1].add(Fn),Fn.position.set(0,-.48,.16),ht(Fn,"box",[.04,.44,.05],"gold",[0,-.14,0]);const hn=new Ri(.24,.025,6,16);f.add(hn),Fn.add(new ye(hn,$("white"))),Fn.rotation.x=Math.PI/2;const fe=new ye(Z("billiards"),$("gold"));fe.position.set(0,-.48,.35),Xe[1].add(fe),fe.visible=!1;const on=new _r(.5,.59,24);f.add(on);const Ui=new ui({color:"#c5a061",side:gn});S.set(`ring-${y.id}`,Ui);const xn=new ye(on,Ui);xn.rotation.x=-Math.PI/2,xn.position.y=.02,L.add(xn),xn.visible=!1;const Zt=document.createElement("button");Zt.type="button",Zt.className="vo-avatar-label",Zt.setAttribute("aria-pressed","false");const An=document.createElement("i"),xi=document.createElement("span"),ps=document.createElement("small");Zt.append(An,xi,ps),t.append(Zt);const ji=document.createElement("span");return ji.className="vo-speech",ji.hidden=!0,Zt.append(ji),Zt.addEventListener("click",()=>e(y.id)),L.traverse(ke=>{ke.isMesh&&(ke.userData.personId=y.id)}),{group:L,body:zt,head:Fe,arms:Xe,legs:un,shoes:wn,eyes:K,skirt:Re,cup:he,plate:Me,racket:Fn,tool:fe,bubble:ji,label:Zt,dot:An,name:xi,icon:ps,ring:xn,person:y,appearance:JSON.stringify(y.avatar),privateGeometry:hn,target:new O,phase:y.id*1.75}}let it=null,lt=!1,B=!0,ot=!1,tt=null,xt=0,gt=0,vt=null,Bt=[],ee=null,dt=null,Ut=null,Xt="orbit",Mt=null,oe=!1,He={};const Un=new Map,gi=new Map;let dn=null,Vt=null,En=null,te=null,cn={},Li=a,_i=null,Ii=()=>!1,ze=null,Te=null,Ie=null,_n=null,ei=!1,Ji=null,Ni=!1,$i=null;const Mr=new _r(1.2,1.4,32);f.add(Mr);const Sr=new ui({color:"#e9be69",side:gn,transparent:!0,opacity:.85});S.set("pilot-guide",Sr);const ni=new ye(Mr,Sr);ni.rotation.x=-Math.PI/2,ni.visible=!1,ni.userData.pilotGuide=!0,x.add(ni);const P=new Map,z=[],Q={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},V=new O,X=new O;let ft=!1;function Lt(y){Vt&&En&&!y.some(et=>et.id===Vt)&&(y=[...y,{...En,home_slot:Ie?.slot??En.home_slot}]),T.configureHomes(!0,ei?Ie?.slot:null,Math.max(Ji??0,y.length,...y.map(et=>(et.home_slot??-1)+1))),Bt=y,Qt.sync(y),k.extent(Qt.bounds().back);const L=y.map(et=>{if(!Ut?.connected||!Ut.room||![Ut.room.from,Ut.room.to].includes(et.id)){const K=y.find(Xe=>Xe.is_me)?.id;return Ut&&!Ut.connected&&(et.id===K||et.meeting_with===K)?{...et,meeting_with:null,meeting_spot:null}:et}return{...et,state:"online",meeting_with:Ut.room.from===et.id?Ut.room.to:Ut.room.from,meeting_spot:Ut.room.spot}}),F=et=>et.id===it||et.id===Mt||et.is_me||dn&&[dn.from,dn.to].includes(et.id),q=[...L].sort((et,K)=>+!!F(K)-+!!F(et)||+!!K.meeting_with-+!!et.meeting_with||{online:0,idle:1,offline:2}[et.state]-{online:0,idle:1,offline:2}[K.state]||et.id-K.id),Y=[],yt={umum:0,operasional:0},zt=[],j=new Map;let Ht=0,Re=0;for(const et of q){if(Y.length>=24)break;et.state==="online"&&yt[et.department]>=16||(Y.push(et),et.state==="online"&&yt[et.department]++)}const Fe=new Set(Y.map(et=>et.id));for(const[et,K]of w)(!Fe.has(et)||K.appearance!==JSON.stringify(Y.find(Xe=>Xe.id===et)?.avatar))&&(D.forget(et),H.forget(et),x.remove(K.group),K.label.remove(),K.ring.geometry.dispose(),f.delete(K.ring.geometry),K.privateGeometry.dispose(),f.delete(K.privateGeometry),K.ring.material.dispose(),S.delete(`ring-${et}`),w.delete(et));yt.umum=yt.operasional=0;for(const et of Y){let K=w.get(et.id),Xe=!K;K||(K=rt(et),w.set(et.id,K));const un=K.game?.id,wn=K.pose,he=K.home?.clone(),Me=et.in_office===!1&&et.state!=="offline",Fn=Me?null:P.get(et.id)||et.pilot,hn=et.id===Vt&&te?te.state():Fn;K.person=et,K.pose=Nh(et,m());let fe;K.game=Uh(et,m());const on=Me?null:Un.get(et.id)||et.recreation,Ui=!Me&&dn&&dn.status!=="pending"&&[dn.from,dn.to].includes(et.id);Ui?(K.game=es.find(Zt=>Zt.id===dn.kind)||K.game,K.pose="playing"):on?.kind==="game"&&on.until>Date.now()/1e3&&et.state!=="offline"&&(K.game=es.find(Zt=>Zt.id===on.destination)||K.game,K.pose="playing");const xn=on&&(!on.until||on.until>Date.now()/1e3)&&Q[on.destination];if(K.destination=!!xn,xn&&!Ui&&et.state!=="offline"){K.pose=on.kind==="drink"?"coffee":on.kind==="food"?"eating":on.kind==="dance"?"dancing":"resting",fe=[xn[0]+et.id%5*1.6,xn[1],xn[2]+Math.floor(et.id%10/5)*1.3];const Zt=T.nearest({x:fe[0],z:fe[2]});Zt&&(fe=[Zt.x,fe[1],Zt.z]),K.group.rotation.y=Math.PI}else if(!Me&&et.meeting_with&&Number.isInteger(et.meeting_spot)&&!Ui){K.pose="meeting";const Zt=et.id<et.meeting_with?-1:1;fe=[-36+et.meeting_spot*6.5+Zt*.9,-.12,20],K.facing=Zt<0?Math.PI/2:-Math.PI/2}else if(K.pose==="working")fe=We[et.department][yt[et.department]++],K.group.rotation.y=Math.PI;else if(K.pose==="playing"){const Zt=j.get(K.game.id)||0;j.set(K.game.id,Zt+1);const An=Zt%2?1:-1;fe=[K.game.x+(K.game.kind==="court"?An*(3-Math.floor(Zt/2)%3*1.7):Math.floor(Zt/2)*.8),-.12,K.game.z+An*(K.game.kind==="court"?3.6:2.5)],K.group.rotation.y=An<0?0:Math.PI}else if(K.pose==="sleeping")fe=Qt.bed(et.id),K.group.rotation.y=0;else if(K.pose==="resting"){const Zt=Ht++;fe=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],K.group.rotation.y=0}else if(Re<8){const Zt=Re++,An=Zt%4,xi=Zt<4?1:-1;fe=[(An%2?13.8:8)+xi*1.65,.08,An<2?5.1:9.7],K.group.rotation.y=xi*Math.PI/2}else{const Zt=Ht++;fe=[-15.8+Zt%8*2.02,.12,4.7+Math.floor(Zt/8)*3.3],K.group.rotation.y=0}if(K.pose==="playing"&&K.game.id==="darts"&&(fe=[K.game.x+(et.id%2?-1:1)*1.2,-.12,K.game.z+2.5]),["playing","meeting"].includes(K.pose)&&!T.free(fe[0],fe[2])){const Zt=T.nearest({x:fe[0],z:fe[2]});Zt&&(fe=[Zt.x,fe[1],Zt.z])}if((K.pose==="playing"||xn)&&zt.some(Zt=>Math.hypot(Zt[0]-fe[0],Zt[2]-fe[2])<.7))t:for(const Zt of[.8,1.5,2.2])for(let An=0;An<12;An++){const xi=fe[0]+Math.cos(An*Math.PI/6)*Zt,ps=fe[2]+Math.sin(An*Math.PI/6)*Zt;if(T.free(xi,ps)&&!zt.some(ji=>Math.hypot(ji[0]-xi,ji[2]-ps)<.7)){fe=[xi,fe[1],ps];break t}}if(hn&&et.state!=="offline"?(fe=[hn.x,hn.y,hn.z],K.pose="manual",K.manual=!0,K.group.rotation.y=hn.yaw,K.waypoints=[]):K.manual=!1,zt.push(fe),K.target.set(...fe),K.home=K.target.clone(),(Xe||K.manual&&et.id===Vt||wn!==K.pose&&K.pose!=="meeting"&&!xn&&!Ui)&&K.group.position.copy(K.target),!K.manual&&!Xe&&(K.pose==="playing"&&(un!==K.game.id||wn!=="playing")||(xn||K.pose==="meeting")&&(!he||he.distanceTo(K.home)>.1))){if(!T.free(K.group.position.x,K.group.position.z)){const Zt=T.nearest(K.group.position)||T.nearest({x:0,z:21.5});Zt&&K.group.position.set(Zt.x,fe[1],Zt.z)}K.waypoints=T.withHomeAccess(Qt.slotFor(et.id),()=>T.path(K.group.position,K.home)).map(Zt=>new O(Zt.x,fe[1],Zt.z))}else!["playing","meeting"].includes(K.pose)&&!xn&&(K.waypoints=[]);lt&&K.pose==="meeting"&&(K.group.position.copy(K.home),K.group.rotation.y=K.facing,K.waypoints=[]),K.dot.className=`vo-dot ${et.state}`,K.name.textContent=et.name,K.icon.textContent=`${et.state==="offline"?"OFFLINE ":et.state==="idle"?"JEDA ":"ONLINE "}${K.pose==="meeting"?"💬":K.pose==="sleeping"?"☾ RUMAH":K.pose==="playing"?K.game.icon:K.pose==="coffee"?"☕":""}`,Ui&&dn.bot&&et.id===dn.to&&(K.icon.textContent="OFFLINE · NPC "+K.game.icon),K.pose==="dancing"&&(K.icon.textContent=(et.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),K.label.setAttribute("aria-label",`${et.name}, ${et.state==="online"?"online":et.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),K.cup.visible=K.pose==="coffee",K.plate.visible=K.pose==="eating",K.manual&&(K.cup.visible=hn.action==="drink",K.plate.visible=hn.action==="eat",K.icon.textContent=(et.private?"PRIVAT · ":"ONLINE · ")+(hn.action==="run"?"BOOST":hn.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),K.racket.visible=K.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(K.game.id),K.tool.visible=K.pose==="playing"&&["billiards","archery","darts"].includes(K.game.id),K.tool.visible&&(K.tool.geometry=Z(K.game.id)),K.shoes.forEach(Zt=>{Zt.visible=K.pose!=="sleeping"}),K.manual||K.eyes.forEach(Zt=>{Zt.scale.y=K.pose==="sleeping"?.18:1}),K.ring.visible=it===et.id,K.label.setAttribute("aria-pressed",String(it===et.id))}Qt.select(ee??(w.get(it)?.pose==="sleeping"?it:null)),Ct()}const _t=new O;function It(){const y=i.getBoundingClientRect(),L=[];for(const F of[...w.values()].sort((q,Y)=>+(Y.person.id===it)-+(q.person.id===it))){if(F.pose==="sleeping"){const Re=Qt.location(F.person.id);_t.set(Re.x,5.2,Re.z+1)}else F.group.getWorldPosition(_t),_t.y+=(D.form(F.person.id)?.height||1.8)+.55;_t.project(M);const q=(_t.x+1)/2*y.width,Y=(1-_t.y)/2*y.height;if(de.active()&&F.person.id!==Vt){F.label.hidden=!0;continue}const yt=166,zt=27,j=L.some(Re=>Math.abs(Re.x-q)<yt&&Math.abs(Re.y-Y)<zt),Ht=_t.z<1&&_t.z>-1&&q>18&&q<y.width-18&&Y>15&&Y<y.height-65&&(!j||F.person.id===it);F.label.hidden=!Ht,Ht&&(F.label.style.transform=`translate(${q}px,${Y}px) translate(-50%,-100%)`,L.push({x:q,y:Y}))}}function kt(y=0){if(tt=null,ot||!B)return;if(y-xt<1e3/30&&(!lt||H.active())){tt=requestAnimationFrame(kt);return}const L=Math.min(.06,Math.max(.001,(y-xt)/1e3));xt=y,ft&&(M.position.lerp(X,.12),h.target.lerp(V,.12),M.position.distanceTo(X)<.04&&(M.position.copy(X),h.target.copy(V),ft=!1));let F=0;for(const j of w.values()){const Ht=lt?0:y/1e3+j.phase;if(j.person.id===Vt&&te){const et=Math.atan2(M.position.x-h.target.x,M.position.z-h.target.z),K=[...w.values()].filter(Me=>Me!==j&&Me.pose!=="sleeping").map(Me=>Me.group.position),Xe=Ii();let un=Xe?{}:cn;if((un.x||un.z||un.jump)&&(Te=null,ze=null),Te&&(Te.elapsed=(Te.elapsed||0)+L),Te?.elapsed>4&&(Te=null,Li({...te.state(),restBlocked:!0})),Te&&!Xe){const Me=te.state();if(Me.grounded)if(Te.point||(Te.point=jc(T,Me,Te.pose,K)),!Te.point)Te=null;else{const Fn=Te.point.x-Me.x,hn=Te.point.z-Me.z,fe=Math.hypot(Fn,hn);if(fe<.04)te.face({x:Me.x+Math.sin(Te.point.yaw),z:Me.z+Math.cos(Te.point.yaw)}),ze={action:"rest",pose:Te.pose,venue:os(Me,Ie)?"home":["beach","garden","terrace","lounge","bar"].find(on=>Jr(Me,on))||"campus"},Te=null,un={};else{const on=Math.min(1,fe/(4.5*L))/fe;un={x:(Math.cos(et)*Fn-Math.sin(et)*hn)*on,z:(-Math.sin(et)*Fn-Math.cos(et)*hn)*on}}}}const wn=D.modeState(Vt);(wn?.id||null)!==$i&&($i=wn?.id||null,Be("follow",Vt)),te.setForm(D.form(Vt),wn?.expires),st&&!W.weapon&&!["susanoo","kurama"].includes(wn?.id)&&mt(!1);const he=te.step(L,un,et,K);if(st&&(te.face({x:he.x-Math.sin(et)*10,z:he.z-Math.cos(et)*10}),he.yaw=te.state().yaw),["walk","run","jump","fly","land"].includes(he.action)&&(ze=null),ze&&Object.assign(he,ze),he.transformation=wn,he.transformationCooldown=D.modeCooldown(Vt),he.restPending=!!Te,j.group.position.set(he.x,he.y,he.z),j.group.rotation.y=he.yaw,j.manual=!0,j.pose="manual",j.home.copy(j.group.position),j.target.copy(j.group.position),_i){const Me=_i==="home"&&Ie?{x:Ie.x,z:Ie.z+5}:li.venues[_i];Me&&(he.target=_i,he.distance=Math.round(Math.hypot(he.x-Me.x,he.z-Me.z)))}if(he.atHome=os(he,Ie),he.nearDoor=!!(Ie&&Math.hypot(he.x-Ie.x,he.z-Ie.z-3.9)<=2.8),he.doorOpen=ei,Ie){const Me=os(he,Ie);Me!==de.active()&&(Ge(),ft=!1,Qt.select(Me?_n:null),Me&&(Xt="follow",Mt=Vt,h.enablePan=!1)),de.set(Me?_n:null,Me?j.group:null),he.interior=Me}else he.interior=!1;Li({...he,...W,interior:de.active()}),j.icon.textContent=(j.person.private?"PRIVAT · ":"ONLINE · ")+(he.action==="run"?"BOOST":he.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(j.manual){const et=j.person.id===Vt&&te?{...te.state(),...W,...ze||{}}:P.get(j.person.id)||j.person.pilot;if(et&&st&&j.person.id===Vt&&(et.aim_pitch=Math.atan2(M.position.y-h.target.y,Math.hypot(M.position.x-h.target.x,M.position.z-h.target.z))),H.observe(j.person.id,et,j),et&&j.person.id!==Vt){const he=new O(et.x,et.y,et.z),Me=j.group.position.clone().lerp(he,.35);et.respawn_id!==j.respawnId?(j.respawnId=et.respawn_id,j.group.position.copy(he)):T.segment(j.group.position,Me,.3,!!(et.air_access||et.flight))?j.group.position.copy(Me):j.group.position.copy(he),j.group.rotation.y=et.yaw}j.person.id!==Vt&&D.observe(j.person.id,et,j),j.flight=!!et?.flight,j.moving=["walk","run"].includes(et?.action);const K=D.pose(j.person.id),Xe=o_(j,K&&!["walk","run","jump","fly","land","rest"].includes(et?.action)?{...et,action:"cast",skillPose:K}:et,{time:y/1e3+j.phase,dt:L,reduced:lt});et?.weapon&&!et.form&&!["rest","play","drink","eat"].includes(et.action)&&(j.arms[1].rotation.x=-.7,j.arms[0].rotation.x=st&&j.person.id===Vt?-.9:-.2);const un=et?.action==="play"?es.find(he=>he.id===et.venue):null;j.racket.visible=!!(un&&["tennis","badminton","pingpong","golf"].includes(un.id)),j.tool.visible=!!(un&&["billiards","archery","darts"].includes(un.id)),j.tool.visible&&(j.tool.geometry=Z(un.id)),j.cup.visible=et?.action==="drink",j.plate.visible=et?.action==="eat",et?.action==="rest"&&(j.icon.textContent=et.pose==="nap"?"ONLINE · TIDUR SANTAI":et.pose==="recline"?"ONLINE · REBAHAN":et.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const wn=D.form(j.person.id);wn&&(j.icon.textContent=(j.person.private?"PRIVAT · ":"ONLINE · ")+wn.name+(et?.flight?" · TERBANG":"")),Xe.lying&&(!de.active()||j.person.id===Vt)&&(Nt.compose(new O(j.group.position.x+Math.sin(j.group.rotation.y)*.7,j.group.position.y+.035,j.group.position.z+Math.cos(j.group.rotation.y)*.7),j.group.quaternion,new O(1,1,1)),bt.setMatrixAt(F++,Nt));continue}D.clearForm(j.person.id);const Re=j.pose==="playing",Fe=!lt&&(Re||j.waypoints?.length>0);if(j.target.copy(j.home),Re&&!j.waypoints?.length&&(j.target.x+=Math.sin(Ht*.65)*(j.game.kind==="court"?1.4:.18),j.target.z+=Math.cos(Ht*.5)*(j.game.kind==="court"?.3:.08)),j.waypoints?.length&&!lt){const et=j.waypoints[0];j.group.position.distanceTo(et)<.015?j.waypoints.shift():(j.group.rotation.y=Math.atan2(et.x-j.group.position.x,et.z-j.group.position.z),ae(j,et,L*3.2))}else Re?ae(j,j.target,lt?0:L*1.4):j.pose==="meeting"?(ae(j,j.home,lt?0:L*3.2),j.group.rotation.y=j.facing):j.group.position.copy(j.home);j.legs.forEach((et,K)=>{et.rotation.x=Fe?Math.sin(Ht*4+K*Math.PI)*.32:j.pose==="working"||j.pose==="resting"?-1.1:0}),j.body.position.y=Math.sin(Ht*1.6)*(lt?0:j.pose==="sleeping"?.007:.018),j.body.rotation.x=j.pose==="sleeping"?-Math.PI/2:0,j.body.rotation.z=Re?Math.sin(Ht*1.5)*.07:0,j.head.rotation.x=j.pose==="sleeping"?0:Math.sin(Ht*.6)*(lt?0:.025),j.arms[0].rotation.x=j.pose==="working"?-.65+Math.sin(Ht*5)*(lt?0:.045):j.pose==="eating"?-1.05:.1,j.arms[1].rotation.x=j.pose==="working"?-.65+Math.sin(Ht*5+1)*(lt?0:.045):j.pose==="coffee"?-1.2+Math.sin(Ht*1.2)*(lt?0:.13):j.pose==="eating"?-.8+Math.sin(Ht*2)*(lt?0:.13):.1,Re&&(j.arms[1].rotation.x=-.6+Math.sin(Ht*2.3)*(lt?0:.7),j.arms[0].rotation.x=-.25+Math.sin(Ht*2.3+1)*(lt?0:.25)),j.pose==="dancing"&&!Fe&&(j.body.rotation.z=lt?0:Math.sin(Ht*2.4)*.13,j.arms.forEach((et,K)=>{et.rotation.x=-.8+Math.sin(Ht*2.4+K)*(lt?0:.5)}),j.legs.forEach((et,K)=>{et.rotation.x=lt?0:Math.sin(Ht*2.4+K*Math.PI)*.25})),j.pose==="meeting"?(j.arms[1].rotation.x=-.2+Math.sin(Ht*1.7)*(lt||Fe?0:.18),j.head.rotation.y=Math.sin(Ht*.7)*(lt?0:.06)):j.head.rotation.y=0}bt.count=F,bt.instanceMatrix.needsUpdate=!0,D.update(Date.now(),te?.state()),H.update(Date.now(),lt||oe);const q=w.get(Mt);if(Xt!=="orbit"&&q&&!ft){const j=q.group.position.clone().add(new O(0,D.form(Mt)?.height*.55||(q.pose==="sleeping"?.25:1.3),q.pose==="sleeping"?-1.3:0));if(st){const Re=Math.atan2(M.position.x-h.target.x,M.position.z-h.target.z);j.x+=Math.cos(Re)*.9,j.z-=Math.sin(Re)*.9}const Ht=j.clone().sub(h.target).multiplyScalar(1-Math.exp(-L*8.6));h.target.add(Ht),M.position.add(Ht)}k.update(y,{paused:lt,dark:document.documentElement.classList.contains("dark"),center:h.target}),Rt.update(y,{paused:lt,energySaver:oe}),Yt.update(y,lt);for(const{mesh:j,game:Ht}of ue){const Re=lt?0:y/1e3,et=[...w.values()].some(K=>K.manual?(K.person.id===Vt?ze:P.get(K.person.id)||K.person.pilot)?.action==="play"&&(K.person.id===Vt?ze:P.get(K.person.id)||K.person.pilot)?.venue===Ht.id:!Oh(m())&&K.pose==="playing"&&K.game.id===Ht.id)?Math.sin(Re*1.8):0;j.position.set(Ht.x+(Ht.id==="golf"?et*4:et*1.5),Ht.id==="pingpong"?1.45+Math.abs(et)*.65:Ht.id==="basketball"?.15+Math.abs(et)*2.2:Ht.id==="bowling"||Ht.id==="golf"?.06:.4+Math.abs(et)*2,Ht.z+et*(Ht.kind==="court"?4:1.3))}h.update();const Y=M.position.clone(),yt=M.quaternion.clone();Xt!=="orbit"&&q&&M.position.copy(A.resolve(T,h.target,Y,Qt.cameraBoxes(Mt),de.active()?2.6:D.form(Mt)?.height*.85||(Xt==="portrait"?2.8:3.8),de.active()?8:D.form(Mt)?55:35,L)),M.lookAt(h.target),M.updateMatrixWorld(!0),vt?vt.copy(M):vt=M.clone();const zt=U.update(w.get(I),M,{time:y/1e3,height:D.form(I)?.height||1.8,reduced:lt||oe});(lt||y-G>100)&&(c(zt?{x:(zt.x+1)/2*i.clientWidth,y:(1-zt.y)/2*i.clientHeight,visible:zt.z>-1&&zt.z<1&&Math.abs(zt.x)<1&&Math.abs(zt.y)<1}:null),G=y),de.apply(),u.render(x,M),(lt||y-gt>120||ft)&&(It(),gt=y),M.position.copy(Y),M.quaternion.copy(yt),M.updateMatrixWorld(!0),(!lt||H.active()||ft||Te||te?.moving()||te&&te.state().stamina<100||!Ii()&&(Math.abs(cn.x||0)+Math.abs(cn.z||0)>0||cn.jump))&&Ct()}function Ct(){!ot&&B&&tt===null&&(tt=requestAnimationFrame(kt))}function ae(y,L,F){const q=Qt.location(y.person.id),Y=q&&Math.abs(y.group.position.x-q.x)<4.8&&Math.abs(y.group.position.z-q.z)<5;return!!Y!=!!y.npcDoorOpen&&(y.npcDoorOpen=!!Y,Qt.setDoor(y.person.id,!!Y)),T.withHomeAccess(Qt.slotFor(y.person.id),()=>Gt(y,L,F))}function Gt(y,L,F){const q=T.move(y.group.position,L,F),Y=Math.hypot(q.x-y.group.position.x,q.z-y.group.position.z),yt=[...w.values()].some(zt=>zt!==y&&zt.pose!=="sleeping"&&Math.hypot(q.x-zt.group.position.x,q.z-zt.group.position.z)<.62);if(yt||y.group.position.set(q.x,y.home.y,q.z),(yt||Y<.001&&y.group.position.distanceTo(L)>.2)&&xt>=(y.repathAt||0)&&(y.pose==="meeting"||y.waypoints?.length)){y.repathAt=xt+1500;const zt=[...w.values()].filter(Ht=>Ht!==y&&Ht.pose!=="sleeping").map(Ht=>Ht.group.position),j=T.path(y.group.position,y.home,zt);j.length&&(y.waypoints=j.map(Ht=>new O(Ht.x,y.home.y,Ht.z)))}}function se(){if(ot)return;const y=i.getBoundingClientRect();y.width<1||y.height<1||(u.setSize(y.width,y.height,!1),M.aspect=y.width/y.height,M.updateProjectionMatrix(),Ct())}function Ge(y=!0){ee=null;const L=dt;if(dt=null,!L||(Qt.select(null),!y))return;ls(h);const F=w.get(L.followId)?.group.position,q=L.anchor&&F?F.clone().sub(L.anchor):new O;Xt=L.mode,Mt=L.followId,h.enablePan=L.pan,h.minDistance=L.min,h.maxDistance=L.max,M.fov=L.fov,M.updateProjectionMatrix(),M.position.copy(L.position).add(q),h.target.copy(L.target).add(q),V.copy(L.focus).add(q),X.copy(L.goal).add(q),ft=L.easing}function Ne(y="all"){if(de.active()){Be("follow",Vt);return}Ge(!1),ls(h),Xt="orbit",Mt=null,M.fov=36,M.updateProjectionMatrix(),h.enablePan=!0,h.minDistance=8,h.maxDistance=650;const L=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const yt of es)F[yt.id]=[[yt.x,.3,yt.z],[yt.x+14,19,yt.z+22]];for(const[yt,zt]of Object.entries(Q))F[yt]=[zt,[zt[0]+12,19,zt[2]+22]];const[q,Y]=F[y]||F.all;if(V.set(...q),X.set(...Y),y==="all"||y==="residences"){const yt=Qt.bounds(),zt=y==="all"?76:yt.front,j=yt.right-yt.left,Ht=zt-yt.back;V.set(0,0,(zt+yt.back)/2);const Re=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Fe=Math.min(Hi.degToRad(M.fov/2),Math.atan(Math.tan(Hi.degToRad(M.fov/2))*Re)),et=Math.hypot(j,Ht)/2/Math.sin(Fe)*1.07;X.copy(new O(1,1.18,1.3).normalize().multiplyScalar(et).add(V))}else L&&X.sub(V).multiplyScalar(1.23).add(V);ee=null,Qt.select(w.get(it)?.pose==="sleeping"?it:null),lt?(M.position.copy(X),h.target.copy(V),ft=!1):ft=!0,Ct()}function Ae(y){if(de.active()){Be("follow",Vt);return}const L=Qt.location(y);L&&(ls(h),dt||(dt={mode:Xt,followId:Mt,anchor:w.get(Mt)?.group.position.clone(),position:M.position.clone(),target:h.target.clone(),focus:V.clone(),goal:X.clone(),easing:ft,fov:M.fov,min:h.minDistance,max:h.maxDistance,pan:h.enablePan}),Xt="orbit",Mt=null,h.enablePan=!0,h.minDistance=5,h.maxDistance=650,M.fov=36,M.updateProjectionMatrix(),ee=y,Qt.select(y),V.set(L.x,1.2,L.z),X.copy(V).add(new O(11,12,15)),i.clientWidth<600&&X.sub(V).multiplyScalar(1.23).add(V),lt?(M.position.copy(X),h.target.copy(V),ft=!1):ft=!0,Ct())}function Be(y,L=it){if(A.reset(),de.active()&&(y="follow",L=Vt),Ge(!1),ls(h),y==="orbit"){Xt="orbit",Mt=null,M.fov=36,M.updateProjectionMatrix(),h.enablePan=!0,h.minDistance=5,h.maxDistance=650,Ct();return}!w.has(L)&&Bt.some(Y=>Y.id===L)&&(it=L,Lt(Bt));const F=w.get(L);if(!F)return;const q=D.form(L);Xt=y==="portrait"?"portrait":"follow",Mt=L,h.enablePan=!1,h.minDistance=de.active()?2.6:q?q.height*.85:Xt==="portrait"?2.8:3.8,h.maxDistance=de.active()?8:q?55:35,M.fov=de.active()?58:44,M.updateProjectionMatrix(),V.copy(F.group.position).add(new O(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),q&&(V.y=F.group.position.y+q.height*.55),X.copy(V).add(q?new O(q.height*.85,q.height*.65,q.height*1.1):Xt==="portrait"?new O(1.8,.9,2.7):new O(4,2.5,5)),lt?(M.position.copy(X),h.target.copy(V),ft=!1):ft=!0,Ct()}let Ft=null;const rn=new ui({transparent:!0,opacity:0,depthWrite:!1});S.set("game-hotspots",rn);for(const y of es){const L=new tn(6,1.4,.4),F=new tn(y.kind==="court"?16:9,.18,y.kind==="court"?12:7);L.translate(0,.7,-(y.kind==="court"?6:4.2)),F.translate(0,-.14,0);const q=L.toNonIndexed(),Y=F.toNonIndexed(),yt=hi([q,Y],!1);L.dispose(),F.dispose(),q.dispose(),Y.dispose(),f.add(yt);const zt=new ye(yt,rn);zt.position.set(y.x,0,y.z),zt.userData.officeGame=y.id,x.add(zt),z.push(zt)}const pe=new lh,ii=new Ot,Qe=y=>{y.button===2&&(J=!st,mt(!0)),Ft=[y.clientX,y.clientY]},Qi=y=>{if(y.button===2){J&&mt(!1),J=!1,Ft=null;return}if(!Ft||Math.hypot(y.clientX-Ft[0],y.clientY-Ft[1])>6)return;if(Ft=null,st&&!Ii()){l(!1);return}const L=u.domElement.getBoundingClientRect();ii.set((y.clientX-L.left)/L.width*2-1,-(y.clientY-L.top)/L.height*2+1),pe.setFromCamera(ii,vt||M);const F=pe.intersectObjects([...w.values()].map(Y=>Y.group).concat(Qt.meshes,Rt.targets,Yt.targets,z,D.targets(),U.root.visible?[U.root]:[]),!0)[0],q=Qt.personForHit(F);if(q===_n&&F?.object.userData.residenceLayer==="door"){o();return}q?(e(q),Ae(q)):F?.object.userData.officeHologramOwner?e(F.object.userData.officeHologramOwner):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function Wn(){const y=document.documentElement.classList.contains("dark");u.toneMappingExposure=y?1.02:1.18,k.configure(He,oe),Ct()}const si=new ResizeObserver(se);si.observe(i);const ge=new MutationObserver(Wn);ge.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const Ke=y=>{y.preventDefault(),ot||n()},Tn=y=>{(st||W.weapon)&&y.preventDefault()},Ue=()=>{J=!1,Ft=null,mt(!1)},Ze=()=>{J&&Ue()};window.addEventListener?.("blur",Ue),u.domElement.addEventListener("pointercancel",Ue),u.domElement.addEventListener("lostpointercapture",Ze),u.domElement.addEventListener("pointerdown",Qe,!0),u.domElement.addEventListener("pointerup",Qi),u.domElement.addEventListener("contextmenu",Tn),u.domElement.addEventListener("webglcontextlost",Ke);const Xn=()=>Ct();return h.addEventListener("change",Xn),h.addEventListener("start",()=>{ft=!1}),Wn(),Ne("all"),M.position.copy(X),h.target.copy(V),ft=!1,se(),{setPeople:Lt,resize:se,focusRoom:Ne,visitHome:Ae,setCameraMode:Be,setAiming:mt,isAiming:()=>st,aimPoint(y=65){if(!te)return null;const L=vt||M;pe.setFromCamera(new Ot(0,0),L);const F=pe.ray.origin.clone(),q=pe.ray.at(y+M.position.distanceTo(h.target),new O),Y=T.rayLimit(F,q);q.lerpVectors(F,q,Y);const yt=pe.intersectObjects([...w.values()].filter(zt=>zt.person.id!==Vt).map(zt=>zt.group).concat(D.targets().filter(zt=>zt.userData.officeAbility!==Vt)),!0);return yt[0]&&yt[0].distance<F.distanceTo(q)&&q.copy(yt[0].point),te.face(q),Ct(),{x:q.x,y:q.y,z:q.z}},combatState:ut,facePilot(y){const L=w.get(y);L&&te&&te.face(L.group.position)},respawnPilot(y){if(!te)return;mt(!1),de.leave(),Ge(!1),D.forget(Vt),Ni=!1,$i=null,ze=null,Te=null,cn={},W={},ut(y),te.reset({...y,flight:!1,air_access:!1}),ei=!1,T.configureHomes(!0,null,Ji??128),_n&&Qt.setDoor(_n,!1);const L=w.get(Vt);L&&L.group.position.set(y.x,y.y,y.z),Be("follow",Vt),Ct()},showHologram(y){I=y!==null&&(y===_n||y===Vt||w.get(y)?.person.is_me)?y:null,I===null&&U.hide(),Ct()},collisionBoxes:()=>T.boxes(),setPilotReporter(y){Li=y},castSkill(y=0){const L=w.get(Vt);if(!L||!te)return{error:"Aktifkan kendali avatar dahulu."};const F=Ih(Xl(L.person.avatar).costume)[y];return F?D.cooldown(Vt)?{error:`Pulihkan energi ${D.cooldown(Vt)} detik lagi.`}:F.type==="transform"&&(de.active()||!T.free(te.state().x,te.state().z,te.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&D.modeCooldown(Vt)?{error:`Transformasi pulih dalam ${D.modeCooldown(Vt)} detik.`}:(ze=null,Te=null,D.cast(Vt,F.id,L)?(Ct(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(y,L){if(!y||!te)return;ut(y);const F=L?.receivedAt??Date.now(),q=L?.sentAt??F;if(Number.isFinite(y.updated_ms)&&D.clock(y.updated_ms-(q+F)/2,Math.max(0,F-q)),Ni&&y.form)return;y.form||(Ni=!1),D.observe(Vt,y,w.get(Vt),!0);const Y=D.modeState(Vt);te.setForm(D.form(Vt),Y?.expires),Ct()},toggleFlight(){const y=te?.toggleFlight();return Ct(),y},endTransformation(){Ni=!0,$i=null,D.clearForm(Vt),te?.setForm(null),Be("follow",Vt),Ct()},activeTransformation:()=>D.modeState(Vt),setPrivatePilotProfile(y){En&&(En={...En,avatar:y},Lt(Bt.map(L=>L.id===En.id?En:L)))},setPilotGate(y){Ii=y},reconcilePilot(y){te&&(te.reset(y),ze=null,Te=null,cn={},Ct())},configureHome(y,L,F=null){_n=y,Ie=L?pa(L.slot):null,Ji=Number.isInteger(F)?Math.min(128,F):null,Qt.setPlots(Ji??0)},canUseDoor(){const y=te?.state();return!!(Ie&&y&&(os(y,Ie)||Math.hypot(y.x-Ie.x,y.z-Ie.z-3.9)<=2.8))},homeDoorOpen:()=>ei,setHomeDoor(y){ei!==!!y&&(ei=!!y,T.configureHomes(!0,ei?Ie?.slot:null),_n&&Qt.setDoor(_n,ei),Ct())},setRestPose(y){if(!te)return!1;if(y&&mt(!1),D.cancel(Vt),Te=null,ze=null,cn={},!y)return Ct(),!0;if(!["sit","recline","nap","meditate"].includes(y))return!1;const L=te.state(),F=[...w.values()].filter(Y=>Y.person.id!==Vt&&Y.pose!=="sleeping").map(Y=>Y.group.position),q=L.grounded?jc(T,L,y,F):null;return L.grounded&&!q?!1:(Te={pose:y,point:q},q&&Math.hypot(q.x-L.x,q.z-L.z)<.04&&(te.face({x:L.x+Math.sin(q.yaw),z:L.z+Math.cos(q.yaw)}),ze={action:"rest",pose:y,venue:os(L,Ie)?"home":["beach","garden","terrace","lounge","bar"].find(Y=>Jr(L,Y))||"campus"},Te=null),Ct(),!0)},setPilot(y,L,F=null){Vt=y,En=F,W={},ut(L),te=n_(T,L),Lt(Bt),Be("follow",y),Ct()},releasePilot(){mt(!1),de.leave(),D.clearForm(Vt),Ni=!1,$i=null;const y=En?.id;Vt=null,En=null,te=null,cn={},ze=null,Te=null,_i=null,ni.visible=!1,Lt(Bt.filter(L=>L.id!==y))},setPilotInput(y){cn=y||{},Ct()},pilotState(){return te?{...te.state(),...W,...ze||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Vt&&(Be("follow",Vt),i.focus?.({preventScroll:!0}))},setPeerPilots(y){P.clear();for(const L of y)L.id!==Vt&&P.set(L.id,L);Lt(Bt.map(L=>({...L,pilot:P.get(L.id)||null,in_office:P.has(L.id)||L.id===Vt})))},canInteract(y){return Jr(te?.state(),y)},guideTo(y){const L=y==="home"&&Ie?{x:Ie.x,z:Ie.z+5}:li.venues[y];if(_i=L?y:null,ni.visible=!!L,L){ni.position.set(L.x,.025,L.z);const F=te?.state();Li({...F,target:y,distance:F?Math.round(Math.hypot(L.x-F.x,L.z-F.z)):null}),Ct()}return L},interactNearest(){const y=te?.state();if(!y)return!1;if(Ie&&(os(y,Ie)||Math.hypot(y.x-Ie.x,y.z-Ie.z-3.9)<=2.8))return o(),!0;const L=Object.keys(li.venues).filter(F=>Jr(y,F)).sort((F,q)=>Math.hypot(y.x-li.venues[F].x,y.z-li.venues[F].z)-Math.hypot(y.x-li.venues[q].x,y.z-li.venues[q].z))[0];return es.some(F=>F.id===L)?(r(L),!0):["bar","disco","beach","garden","terrace","lounge","armory"].includes(L)?(s(L),!0):!1},setRecreation(y,L){Number(y)===Vt&&L&&(ze={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[L.kind]||"idle",venue:L.destination,pose:L.kind==="relax"?"sit":null}),Un.set(Number(y),L?{...L,until:L.until||Date.now()/1e3+900}:null),Lt(Bt)},setVenueEffects(y){Rt.setEnabled(y),Ct()},setGame(y){JSON.stringify(dn)!==JSON.stringify(y)&&(dn=y,Vt&&y?.status==="playing"&&[y.from,y.to].includes(Vt)?ze={action:"play",venue:y.kind}:ze?.action==="play"&&(ze=null),Lt(Bt))},say(y,L){const F=w.get(Number(y));F&&(F.bubble.textContent=String(L||"").slice(0,350),F.bubble.hidden=!1,gi.has(y)&&clearTimeout(gi.get(y)),gi.set(y,setTimeout(()=>{F.bubble.hidden=!0,gi.delete(y),Ct()},1e4)),Ct())},configureWorld(y){He=y||{},k.configure(He,oe),$("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[He.settings?.landscape]||"#47695f"),Ct()},setEnergySaver(y){oe=!!y,u.setPixelRatio(oe?1:Math.min(window.devicePixelRatio||1,1.5)),k.configure(He,oe),se()},setMeeting(y){Ut=y,Lt(Bt)},meetingReady(){if(Vt&&Ut?.connected&&Ut.room){const L=w.get(Ut.room.from),F=w.get(Ut.room.to);if(!L||!F||L.group.position.distanceTo(F.group.position)>3)return!1;const q=F.group.position.x-L.group.position.x,Y=F.group.position.z-L.group.position.z,yt=Math.hypot(q,Y);return yt>.2&&(Math.sin(L.group.rotation.y)*q+Math.cos(L.group.rotation.y)*Y)/yt>.45&&(-Math.sin(F.group.rotation.y)*q-Math.cos(F.group.rotation.y)*Y)/yt>.45}const y=Ut?.room;return!y||!Ut.connected?!1:[y.from,y.to].every(L=>{const F=w.get(L);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(y,L=!1){it!==y&&Ge(),it=y,y&&!w.has(y)&&Bt.some(q=>q.id===y)&&Lt(Bt);for(const[q,Y]of w)Y.ring.visible=q===y,Y.label.setAttribute("aria-pressed",String(q===y));const F=w.get(y);if(Qt.select(ee??(F?.pose==="sleeping"?y:null)),F&&L&&Vt&&y!==Vt&&te){te.face(F.group.position),Ct();return}if(F&&L&&Xt!=="orbit"){Be(Xt,y);return}if(F&&L&&F.pose==="sleeping"){Ae(y);return}F&&L&&(V.copy(F.target).add(new O(0,1,0)),X.copy(V).add(new O(11,11,14)),lt?(M.position.copy(X),h.target.copy(V)):ft=!0),Ct()},zoom(y){if(!Number.isFinite(y)||y<=0)return;ft=!1;const L=M.position.clone().sub(h.target);L.setLength(Hi.clamp(L.length()*y,h.minDistance,h.maxDistance)),M.position.copy(h.target).add(L),h.update(),Ct()},setPaused(y){if(lt=y,lt&&ft&&(M.position.copy(X),h.target.copy(V),ft=!1),lt)for(const L of w.values())L.pose==="meeting"&&(L.group.position.copy(L.home),L.group.rotation.y=L.facing,L.waypoints=[]);tt!==null&&cancelAnimationFrame(tt),tt=null,Ct()},setVisible(y){B=y,!y&&tt!==null?(cancelAnimationFrame(tt),tt=null):y&&(xt=0,se(),Ct())},dispose(){ot=!0,tt!==null&&cancelAnimationFrame(tt),tt=null,si.disconnect(),ge.disconnect(),h.dispose(),de.dispose(),D.dispose(),U.dispose(),H.dispose();for(const y of gi.values())clearTimeout(y);gi.clear(),Un.clear(),u.domElement.removeEventListener("pointerdown",Qe,!0),u.domElement.removeEventListener("pointerup",Qi),u.domElement.removeEventListener("contextmenu",Tn),u.domElement.removeEventListener("webglcontextlost",Ke),window.removeEventListener?.("blur",Ue),u.domElement.removeEventListener("pointercancel",Ue),u.domElement.removeEventListener("lostpointercapture",Ze),Qt.dispose(),bt.dispose(),k.dispose();for(const y of f)y.dispose();for(const y of S.values())y.dispose();for(const y of v)y.dispose();w.forEach(y=>y.label.remove()),w.clear(),x.clear(),u.dispose(),u.forceContextLoss(),u.domElement.remove()}}}export{d_ as createOfficeScene};
