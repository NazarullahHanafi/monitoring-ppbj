import{m as Dn,w as Fh,c as vs,t as Kl,a as Oh,g as es,s as Bh,b as Jl,p as zh,d as Gh,e as kh,i as Hh}from"./virtual-office-Y7Kza_km.js";const $o="187",us={ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ru=0,Wa=1,ou=2,sr=1,au=2,Is=3,Hi=0,bn=1,_n=2,hs=0,Ns=1,pr=2,Xa=3,Ya=4,lu=5,as=100,cu=101,uu=102,hu=103,fu=104,du=200,pu=201,mu=202,gu=203,nl=204,il=205,_u=206,xu=207,vu=208,Mu=209,Su=210,yu=211,bu=212,Eu=213,wu=214,so=0,ro=1,oo=2,Fs=3,ao=4,lo=5,co=6,uo=7,sl=0,Tu=1,Au=2,gi=0,rl=1,ol=2,al=3,Qo=4,ll=5,cl=6,ul=7,hl=300,fs=301,Os=302,Qr=303,jr=304,ho=1e3,mi=1001,fo=1002,hn=1003,Ru=1004,nr=1005,yn=1006,to=1007,Ai=1008,Rn=1009,fl=1010,dl=1011,Bs=1012,jo=1013,ei=1014,Hn=1015,ni=1016,ta=1017,ea=1018,ds=1020,pl=35902,ml=35899,gl=1021,_l=1022,jn=1023,Li=1026,Ri=1027,na=1028,ia=1029,Vi=1030,sa=1031,ra=1033,rr=33776,or=33777,ar=33778,lr=33779,po=35840,mo=35841,go=35842,_o=35843,xo=36196,vo=37492,Mo=37496,So=37488,yo=37489,mr=37490,bo=37491,Eo=37808,wo=37809,To=37810,Ao=37811,Ro=37812,Co=37813,Po=37814,Lo=37815,Do=37816,Io=37817,No=37818,Uo=37819,Fo=37820,Oo=37821,Bo=36492,zo=36494,Go=36495,ko=36283,Ho=36284,gr=36285,Vo=36286,Cu=3200,Wo=0,Pu=1,Ti="",Sn="srgb",_r="srgb-linear",xr="linear",Ie="srgb",eo=7680,Lu=519,Du=512,Iu=513,Nu=514,xl=515,Uu=516,Fu=517,vl=518,Ml=519,Ou=35044,Sl=35048,qa="300 es",Vn=2e3,zs=2001;function Vh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bu(){const i=Xo("canvas");return i.style.display="block",i}const $l={};function Za(...i){const t="THREE."+i.shift();console.log(t,...i)}function zu(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Kt(...i){i=zu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function we(...i){i=zu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function cr(...i){const t=i.join(" ");t in $l||($l[t]=!0,Kt(...i))}function Wh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Xh={[so]:so,[oo]:co,[ao]:ao,[Fs]:lo,[ro]:ro,[co]:oo,[uo]:uo,[lo]:Fs};class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ql=1234567;const ur=Math.PI/180,vr=180/Math.PI;function Vs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[t&255]+mn[t>>8&255]+"-"+mn[t>>16&15|64]+mn[t>>24&255]+"-"+mn[e&63|128]+mn[e>>8&255]+"-"+mn[e>>16&255]+mn[e>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function fe(i,t,e){return Math.max(t,Math.min(e,i))}function yl(i,t){return(i%t+t)%t}function Yh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function qh(i,t,e){return i!==t?(e-i)/(t-i):0}function hr(i,t,e){return(1-e)*i+e*t}function Zh(i,t,e,n){return hr(i,t,1-Math.exp(-e*n))}function Kh(i,t=1){return t-Math.abs(yl(i,t*2)-t)}function Jh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $h(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Qh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function jh(i,t){return i+Math.random()*(t-i)}function tf(i){return i*(.5-Math.random())}function ef(i){i!==void 0&&(Ql=i);let t=Ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nf(i){return i*ur}function sf(i){return i*vr}function rf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function of(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Gu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function af(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),g=r((t-n)/2),p=o((t-n)/2),m=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*g,c*p,a*l);break;case"YZY":i.set(c*p,a*h,c*g,a*l);break;case"ZXZ":i.set(c*g,c*p,a*h,a*l);break;case"XZX":i.set(a*h,c*x,c*m,a*l);break;case"YXY":i.set(c*m,a*h,c*x,a*l);break;case"ZYZ":i.set(c*x,c*m,a*h,a*l);break;default:Kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ku(i,t){if(t.constructor===Float32Array)return i;const e=bl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Hu(i,t){if(t.constructor===Float32Array)return i;const e=bl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Qn={DEG2RAD:ur,RAD2DEG:vr,generateUUID:Vs,clamp:fe,euclideanModulo:yl,mapLinear:Yh,inverseLerp:qh,lerp:hr,damp:Zh,pingpong:Kh,smoothstep:Jh,smootherstep:$h,randInt:Qh,randFloat:jh,randFloatSpread:tf,seededRandom:ef,degToRad:nf,radToDeg:sf,isPowerOfTwo:rf,ceilPowerOfTwo:of,floorPowerOfTwo:Gu,setQuaternionFromProperEuler:af,normalize:Hu,denormalize:ku},Hl=class Hl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hl.prototype.isVector2=!0;let Ft=Hl;class Cn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],g=n[s+3],p=r[o+0],m=r[o+1],x=r[o+2],v=r[o+3];if(g!==v||c!==p||l!==m||h!==x){let u=c*p+l*m+h*x+g*v;u<0&&(p=-p,m=-m,x=-x,v=-v,u=-u);let f=1-a;if(u<.9995){const S=Math.acos(u),T=Math.sin(S);f=Math.sin(f*S)/T,a=Math.sin(a*S)/T,c=c*f+p*a,l=l*f+m*a,h=h*f+x*a,g=g*f+v*a}else{c=c*f+p*a,l=l*f+m*a,h=h*f+x*a,g=g*f+v*a;const S=1/Math.sqrt(c*c+l*l+h*h+g*g);c*=S,l*=S,h*=S,g*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],g=r[o],p=r[o+1],m=r[o+2],x=r[o+3];return t[e]=a*x+h*g+c*m-l*p,t[e+1]=c*x+h*p+l*g-a*m,t[e+2]=l*x+h*m+a*p-c*g,t[e+3]=h*x-a*g-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),g=a(r/2),p=c(n/2),m=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=p*h*g+l*m*x,this._y=l*m*g-p*h*x,this._z=l*h*x+p*m*g,this._w=l*h*g-p*m*x;break;case"YXZ":this._x=p*h*g+l*m*x,this._y=l*m*g-p*h*x,this._z=l*h*x-p*m*g,this._w=l*h*g+p*m*x;break;case"ZXY":this._x=p*h*g-l*m*x,this._y=l*m*g+p*h*x,this._z=l*h*x+p*m*g,this._w=l*h*g-p*m*x;break;case"ZYX":this._x=p*h*g-l*m*x,this._y=l*m*g+p*h*x,this._z=l*h*x-p*m*g,this._w=l*h*g+p*m*x;break;case"YZX":this._x=p*h*g+l*m*x,this._y=l*m*g+p*h*x,this._z=l*h*x-p*m*g,this._w=l*h*g-p*m*x;break;case"XZY":this._x=p*h*g-l*m*x,this._y=l*m*g-p*h*x,this._z=l*h*x+p*m*g,this._w=l*h*g+p*m*x;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],g=e[10],p=n+a+g;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>g){const m=2*Math.sqrt(1+n-a-g);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>g){const m=2*Math.sqrt(1+a-n-g);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+g-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Vl=class Vl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),g=2*(r*n-o*e);return this.x=e+c*l+o*g-a*h,this.y=n+c*h+a*l-r*g,this.z=s+c*g+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _a.copy(this).projectOnVector(t),this.sub(_a)}reflect(t){return this.sub(_a.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vl.prototype.isVector3=!0;let O=Vl;const _a=new O,jl=new Cn,Wl=class Wl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],g=n[7],p=n[2],m=n[5],x=n[8],v=s[0],u=s[3],f=s[6],S=s[1],T=s[4],R=s[7],y=s[2],_=s[5],d=s[8];return r[0]=o*v+a*S+c*y,r[3]=o*u+a*T+c*_,r[6]=o*f+a*R+c*d,r[1]=l*v+h*S+g*y,r[4]=l*u+h*T+g*_,r[7]=l*f+h*R+g*d,r[2]=p*v+m*S+x*y,r[5]=p*u+m*T+x*_,r[8]=p*f+m*R+x*d,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],g=h*o-a*l,p=a*c-h*r,m=l*r-o*c,x=e*g+n*p+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return t[0]=g*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=p*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=m*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xa.makeScale(t,e)),this}rotate(t){return cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xa.makeRotation(-t)),this}translate(t,e){return cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Wl.prototype.isMatrix3=!0;let ie=Wl;const xa=new ie,tc=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lf(){const i={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ie&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ie&&(s.r=Us(s.r),s.g=Us(s.g),s.b=Us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?xr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_r]:{primaries:t,whitePoint:n,transfer:xr,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:t,whitePoint:n,transfer:Ie,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),i}const _e=lf();function Ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ms;class Vu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ms===void 0&&(Ms=Xo("canvas")),Ms.width=t.width,Ms.height=t.height;const s=Ms.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ms}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Xo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cf=0;class oa{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=Vs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(va(s[o].image)):r.push(va(s[o]))}else r=va(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function va(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}let uf=0;const Ma=new O;class pn extends Ii{constructor(t=pn.DEFAULT_IMAGE,e=pn.DEFAULT_MAPPING,n=mi,s=mi,r=yn,o=Ai,a=jn,c=Rn,l=pn.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=Vs(),this.name="",this.source=new oa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ma).x}get height(){return this.source.getSize(Ma).y}get depth(){return this.source.getSize(Ma).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ho:t.x=t.x-Math.floor(t.x);break;case mi:t.x=t.x<0?0:1;break;case fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ho:t.y=t.y-Math.floor(t.y);break;case mi:t.y=t.y<0?0:1;break;case fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=hl;pn.DEFAULT_ANISOTROPY=1;const Xl=class Xl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],g=c[8],p=c[1],m=c[5],x=c[9],v=c[2],u=c[6],f=c[10];if(Math.abs(h-p)<.01&&Math.abs(g-v)<.01&&Math.abs(x-u)<.01){if(Math.abs(h+p)<.1&&Math.abs(g+v)<.1&&Math.abs(x+u)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,R=(m+1)/2,y=(f+1)/2,_=(h+p)/4,d=(g+v)/4,M=(x+u)/4;return T>R&&T>y?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=_/n,r=d/n):R>y?R<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(R),n=_/s,r=M/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=d/r,s=M/r),this.set(n,s,r,e),this}let S=Math.sqrt((u-x)*(u-x)+(g-v)*(g-v)+(p-h)*(p-h));return Math.abs(S)<.001&&(S=1),this.x=(u-x)/S,this.y=(g-v)/S,this.z=(p-h)/S,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this.w=fe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this.w=fe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Xl.prototype.isVector4=!0;let Ye=Xl;class Wu extends Ii{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ye(0,0,t,e),this.scissorTest=!1,this.viewport=new Ye(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new pn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new oa(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends Wu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class El extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xu extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Jo=class Jo{constructor(t,e,n,s,r,o,a,c,l,h,g,p,m,x,v,u){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,g,p,m,x,v,u)}set(t,e,n,s,r,o,a,c,l,h,g,p,m,x,v,u){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=g,f[14]=p,f[3]=m,f[7]=x,f[11]=v,f[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jo().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Ss.setFromMatrixColumn(t,0).length(),r=1/Ss.setFromMatrixColumn(t,1).length(),o=1/Ss.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){const p=o*h,m=o*g,x=a*h,v=a*g;e[0]=c*h,e[4]=-c*g,e[8]=l,e[1]=m+x*l,e[5]=p-v*l,e[9]=-a*c,e[2]=v-p*l,e[6]=x+m*l,e[10]=o*c}else if(t.order==="YXZ"){const p=c*h,m=c*g,x=l*h,v=l*g;e[0]=p+v*a,e[4]=x*a-m,e[8]=o*l,e[1]=o*g,e[5]=o*h,e[9]=-a,e[2]=m*a-x,e[6]=v+p*a,e[10]=o*c}else if(t.order==="ZXY"){const p=c*h,m=c*g,x=l*h,v=l*g;e[0]=p-v*a,e[4]=-o*g,e[8]=x+m*a,e[1]=m+x*a,e[5]=o*h,e[9]=v-p*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const p=o*h,m=o*g,x=a*h,v=a*g;e[0]=c*h,e[4]=x*l-m,e[8]=p*l+v,e[1]=c*g,e[5]=v*l+p,e[9]=m*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const p=o*c,m=o*l,x=a*c,v=a*l;e[0]=c*h,e[4]=v-p*g,e[8]=x*g+m,e[1]=g,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=m*g+x,e[10]=p-v*g}else if(t.order==="XZY"){const p=o*c,m=o*l,x=a*c,v=a*l;e[0]=c*h,e[4]=-g,e[8]=l*h,e[1]=p*g+v,e[5]=o*h,e[9]=m*g-x,e[2]=x*g-m,e[6]=a*h,e[10]=v*g+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hf,t,ff)}lookAt(t,e,n){const s=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Fi.crossVectors(n,Pn),Fi.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Fi.crossVectors(n,Pn)),Fi.normalize(),br.crossVectors(Pn,Fi),s[0]=Fi.x,s[4]=br.x,s[8]=Pn.x,s[1]=Fi.y,s[5]=br.y,s[9]=Pn.y,s[2]=Fi.z,s[6]=br.z,s[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],g=n[5],p=n[9],m=n[13],x=n[2],v=n[6],u=n[10],f=n[14],S=n[3],T=n[7],R=n[11],y=n[15],_=s[0],d=s[4],M=s[8],w=s[12],E=s[1],A=s[5],L=s[9],U=s[13],I=s[2],k=s[6],H=s[10],W=s[14],it=s[3],Y=s[7],tt=s[11],at=s[15];return r[0]=o*_+a*E+c*I+l*it,r[4]=o*d+a*A+c*k+l*Y,r[8]=o*M+a*L+c*H+l*tt,r[12]=o*w+a*U+c*W+l*at,r[1]=h*_+g*E+p*I+m*it,r[5]=h*d+g*A+p*k+m*Y,r[9]=h*M+g*L+p*H+m*tt,r[13]=h*w+g*U+p*W+m*at,r[2]=x*_+v*E+u*I+f*it,r[6]=x*d+v*A+u*k+f*Y,r[10]=x*M+v*L+u*H+f*tt,r[14]=x*w+v*U+u*W+f*at,r[3]=S*_+T*E+R*I+y*it,r[7]=S*d+T*A+R*k+y*Y,r[11]=S*M+T*L+R*H+y*tt,r[15]=S*w+T*U+R*W+y*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],g=t[6],p=t[10],m=t[14],x=t[3],v=t[7],u=t[11],f=t[15],S=c*m-l*p,T=a*m-l*g,R=a*p-c*g,y=o*m-l*h,_=o*p-c*h,d=o*g-a*h;return e*(v*S-u*T+f*R)-n*(x*S-u*y+f*_)+s*(x*T-v*y+f*d)-r*(x*R-v*_+u*d)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],g=t[9],p=t[10],m=t[11],x=t[12],v=t[13],u=t[14],f=t[15],S=e*a-n*o,T=e*c-s*o,R=e*l-r*o,y=n*c-s*a,_=n*l-r*a,d=s*l-r*c,M=h*v-g*x,w=h*u-p*x,E=h*f-m*x,A=g*u-p*v,L=g*f-m*v,U=p*f-m*u,I=S*U-T*L+R*A+y*E-_*w+d*M;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return t[0]=(a*U-c*L+l*A)*k,t[1]=(s*L-n*U-r*A)*k,t[2]=(v*d-u*_+f*y)*k,t[3]=(p*_-g*d-m*y)*k,t[4]=(c*E-o*U-l*w)*k,t[5]=(e*U-s*E+r*w)*k,t[6]=(u*R-x*d-f*T)*k,t[7]=(h*d-p*R+m*T)*k,t[8]=(o*L-a*E+l*M)*k,t[9]=(n*E-e*L-r*M)*k,t[10]=(x*_-v*R+f*S)*k,t[11]=(g*R-h*_-m*S)*k,t[12]=(a*w-o*A-c*M)*k,t[13]=(e*A-n*w+s*M)*k,t[14]=(v*T-x*y-u*S)*k,t[15]=(h*y-g*T+p*S)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,g=a+a,p=r*l,m=r*h,x=r*g,v=o*h,u=o*g,f=a*g,S=c*l,T=c*h,R=c*g,y=n.x,_=n.y,d=n.z;return s[0]=(1-(v+f))*y,s[1]=(m+R)*y,s[2]=(x-T)*y,s[3]=0,s[4]=(m-R)*_,s[5]=(1-(p+f))*_,s[6]=(u+S)*_,s[7]=0,s[8]=(x+T)*d,s[9]=(u-S)*d,s[10]=(1-(p+v))*d,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Ss.set(s[0],s[1],s[2]).length();const a=Ss.set(s[4],s[5],s[6]).length(),c=Ss.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Zn.copy(this);const l=1/o,h=1/a,g=1/c;return Zn.elements[0]*=l,Zn.elements[1]*=l,Zn.elements[2]*=l,Zn.elements[4]*=h,Zn.elements[5]*=h,Zn.elements[6]*=h,Zn.elements[8]*=g,Zn.elements[9]*=g,Zn.elements[10]*=g,e.setFromRotationMatrix(Zn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Vn,c=!1){const l=this.elements,h=2*r/(e-t),g=2*r/(n-s),p=(e+t)/(e-t),m=(n+s)/(n-s);let x,v;if(c)x=r/(o-r),v=o*r/(o-r);else if(a===Vn)x=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===zs)x=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=g,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Vn,c=!1){const l=this.elements,h=2/(e-t),g=2/(n-s),p=-(e+t)/(e-t),m=-(n+s)/(n-s);let x,v;if(c)x=1/(o-r),v=o/(o-r);else if(a===Vn)x=-2/(o-r),v=-(o+r)/(o-r);else if(a===zs)x=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=g,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Jo.prototype.isMatrix4=!0;let xe=Jo;const Ss=new O,Zn=new xe,hf=new O(0,0,0),ff=new O(1,1,1),Fi=new O,br=new O,Pn=new O,nc=new xe,ic=new Cn;class ii{constructor(t=0,e=0,n=0,s=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],g=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(fe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-g,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-fe(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class aa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let df=0;const sc=new O,ys=new Cn,Si=new xe,Er=new O,qs=new O,pf=new O,mf=new Cn,rc=new O(1,0,0),oc=new O(0,1,0),ac=new O(0,0,1),lc={type:"added"},gf={type:"removed"},bs={type:"childadded",child:null},Sa={type:"childremoved",child:null};class tn extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new O,e=new ii,n=new Cn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new ie}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(rc,t)}rotateY(t){return this.rotateOnAxis(oc,t)}rotateZ(t){return this.rotateOnAxis(ac,t)}translateOnAxis(t,e){return sc.copy(t).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rc,t)}translateY(t){return this.translateOnAxis(oc,t)}translateZ(t){return this.translateOnAxis(ac,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Er.copy(t):Er.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(qs,Er,this.up):Si.lookAt(Er,qs,this.up),this.quaternion.setFromRotationMatrix(Si),s&&(Si.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(Si),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(we("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lc),bs.child=t,this.dispatchEvent(bs),bs.child=null):we("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gf),Sa.child=t,this.dispatchEvent(Sa),Sa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Si.multiply(t.parent.matrixWorld)),t.applyMatrix4(Si),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lc),bs.child=t,this.dispatchEvent(bs),bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,t,pf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,mf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),g=o(t.shapes),p=o(t.skeletons),m=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),g.length>0&&(n.shapes=g),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}tn.DEFAULT_UP=new O(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class In extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _f={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new In,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new In,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new In,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const u=e.getJointPose(v,n),f=this._getHandJoint(l,v);u!==null&&(f.matrix.fromArray(u.transform.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=u.radius),f.visible=u!==null}const h=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],p=h.position.distanceTo(g.position),m=.02,x=.005;l.inputState.pinching&&p>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_f)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new In;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},wr={h:0,s:0,l:0};function ya(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class oe{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=_e.workingColorSpace){return this.r=t,this.g=e,this.b=n,_e.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=_e.workingColorSpace){if(t=yl(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ya(o,r,t+1/3),this.g=ya(o,r,t),this.b=ya(o,r,t-1/3)}return _e.colorSpaceToWorking(this,s),this}setStyle(t,e=Sn){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Sn){const n=Yu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Sn){return _e.workingToColorSpace(gn.copy(this),t),Math.round(fe(gn.r*255,0,255))*65536+Math.round(fe(gn.g*255,0,255))*256+Math.round(fe(gn.b*255,0,255))}getHexString(t=Sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.workingToColorSpace(gn.copy(this),e);const n=gn.r,s=gn.g,r=gn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const g=o-a;switch(l=h<=.5?g/(o+a):g/(2-o-a),o){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=_e.workingColorSpace){return _e.workingToColorSpace(gn.copy(this),e),t.r=gn.r,t.g=gn.g,t.b=gn.b,t}getStyle(t=Sn){_e.workingToColorSpace(gn.copy(this),t);const e=gn.r,n=gn.g,s=gn.b;return t!==Sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Oi),this.setHSL(Oi.h+t,Oi.s+e,Oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Oi),t.getHSL(wr);const n=hr(Oi.h,wr.h,e),s=hr(Oi.s,wr.s,e),r=hr(Oi.l,wr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new oe;oe.NAMES=Yu;class la{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new oe(t),this.density=e}clone(){return new la(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class qu extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Kn=new O,yi=new O,ba=new O,bi=new O,Es=new O,ws=new O,cc=new O,Ea=new O,wa=new O,Ta=new O,Aa=new Ye,Ra=new Ye,Ca=new Ye;class kn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Kn.subVectors(t,e),s.cross(Kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Kn.subVectors(s,e),yi.subVectors(n,e),ba.subVectors(t,e);const o=Kn.dot(Kn),a=Kn.dot(yi),c=Kn.dot(ba),l=yi.dot(yi),h=yi.dot(ba),g=o*l-a*a;if(g===0)return r.set(0,0,0),null;const p=1/g,m=(l*c-a*h)*p,x=(o*h-a*c)*p;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bi.x),c.addScaledVector(o,bi.y),c.addScaledVector(a,bi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Aa.setScalar(0),Ra.setScalar(0),Ca.setScalar(0),Aa.fromBufferAttribute(t,e),Ra.fromBufferAttribute(t,n),Ca.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Aa,r.x),o.addScaledVector(Ra,r.y),o.addScaledVector(Ca,r.z),o}static isFrontFacing(t,e,n,s){return Kn.subVectors(n,e),yi.subVectors(t,e),Kn.cross(yi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Kn.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return kn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return kn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return kn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return kn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return kn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Es.subVectors(s,n),ws.subVectors(r,n),Ea.subVectors(t,n);const c=Es.dot(Ea),l=ws.dot(Ea);if(c<=0&&l<=0)return e.copy(n);wa.subVectors(t,s);const h=Es.dot(wa),g=ws.dot(wa);if(h>=0&&g<=h)return e.copy(s);const p=c*g-h*l;if(p<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),e.copy(n).addScaledVector(Es,o);Ta.subVectors(t,r);const m=Es.dot(Ta),x=ws.dot(Ta);if(x>=0&&m<=x)return e.copy(r);const v=m*l-c*x;if(v<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(n).addScaledVector(ws,a);const u=h*x-m*g;if(u<=0&&g-h>=0&&m-x>=0)return cc.subVectors(r,s),a=(g-h)/(g-h+(m-x)),e.copy(s).addScaledVector(cc,a);const f=1/(u+v+p);return o=v*f,a=p*f,e.copy(n).addScaledVector(Es,o).addScaledVector(ws,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Xi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Jn):Jn.fromBufferAttribute(r,o),Jn.applyMatrix4(t.matrixWorld),this.expandByPoint(Jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tr.copy(n.boundingBox)),Tr.applyMatrix4(t.matrixWorld),this.union(Tr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Jn),Jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zs),Ar.subVectors(this.max,Zs),Ts.subVectors(t.a,Zs),As.subVectors(t.b,Zs),Rs.subVectors(t.c,Zs),Bi.subVectors(As,Ts),zi.subVectors(Rs,As),ns.subVectors(Ts,Rs);let e=[0,-Bi.z,Bi.y,0,-zi.z,zi.y,0,-ns.z,ns.y,Bi.z,0,-Bi.x,zi.z,0,-zi.x,ns.z,0,-ns.x,-Bi.y,Bi.x,0,-zi.y,zi.x,0,-ns.y,ns.x,0];return!Pa(e,Ts,As,Rs,Ar)||(e=[1,0,0,0,1,0,0,0,1],!Pa(e,Ts,As,Rs,Ar))?!1:(Rr.crossVectors(Bi,zi),e=[Rr.x,Rr.y,Rr.z],Pa(e,Ts,As,Rs,Ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ei=[new O,new O,new O,new O,new O,new O,new O,new O],Jn=new O,Tr=new Xi,Ts=new O,As=new O,Rs=new O,Bi=new O,zi=new O,ns=new O,Zs=new O,Ar=new O,Rr=new O,is=new O;function Pa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){is.fromArray(i,r);const a=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),c=t.dot(is),l=e.dot(is),h=n.dot(is);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const je=new O,Cr=new Ft;let xf=0;class En extends Ii{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ou,this.updateRanges=[],this.gpuType=Hn,this.version=0,this._normalizationScale=t!==void 0?bl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Cr.fromBufferAttribute(this,e),Cr.applyMatrix3(t),this.setXY(e,Cr.x,Cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix3(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):ku(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Hu(t,this.array)}}class wl extends En{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Tl extends En{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ne extends En{constructor(t,e,n){super(new Float32Array(t),e,n)}}const vf=new Xi,Ks=new O,La=new O;class Yi{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):vf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ks.subVectors(t,this.center);const e=Ks.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(La.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ks.copy(t.center).add(La)),this.expandByPoint(Ks.copy(t.center).sub(La))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Mf=0;const Bn=new xe,Da=new tn,Cs=new O,Ln=new Xi,Js=new Xi,un=new O;class an extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vh(t)?Tl:wl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ie().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ne(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&we('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){we("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(Ln.min,Js.min),Ln.expandByPoint(un),un.addVectors(Ln.max,Js.max),Ln.expandByPoint(un)):(Ln.expandByPoint(Js.min),Ln.expandByPoint(Js.max))}Ln.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)un.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(un));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)un.fromBufferAttribute(a,l),c&&(Cs.fromBufferAttribute(t,l),un.add(Cs)),s=Math.max(s,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&we('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){we("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new En(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let w=0;w<n.count;w++)a[w]=new O,c[w]=new O;const h=new O,g=new O,p=new O,m=new Ft,x=new Ft,v=new Ft,u=new O,f=new O;function S(w,E,A){l[w]=l[E]=l[A]=1,h.fromBufferAttribute(n,w),g.fromBufferAttribute(n,E),p.fromBufferAttribute(n,A),m.fromBufferAttribute(r,w),x.fromBufferAttribute(r,E),v.fromBufferAttribute(r,A),g.sub(h),p.sub(h),x.sub(m),v.sub(m);const L=1/(x.x*v.y-v.x*x.y);isFinite(L)&&(u.copy(g).multiplyScalar(v.y).addScaledVector(p,-x.y).multiplyScalar(L),f.copy(p).multiplyScalar(x.x).addScaledVector(g,-v.x).multiplyScalar(L),a[w].add(u),a[E].add(u),a[A].add(u),c[w].add(f),c[E].add(f),c[A].add(f))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let w=0,E=T.length;w<E;++w){const A=T[w],L=A.start,U=A.count;for(let I=L,k=L+U;I<k;I+=3)S(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const R=new O,y=new O,_=new O,d=new O;function M(w){_.fromBufferAttribute(s,w),d.copy(_);const E=a[w];R.copy(E),R.sub(_.multiplyScalar(_.dot(E))).normalize(),y.crossVectors(d,E);const L=y.dot(c[w])<0?-1:1;o.setXYZW(w,R.x,R.y,R.z,L)}for(let w=0,E=n.count;w<E;++w)l[w]&&M(w);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,h=new O,g=new O;if(t)for(let p=0,m=t.count;p<m;p+=3){const x=t.getX(p+0),v=t.getX(p+1),u=t.getX(p+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,u),h.subVectors(o,r),g.subVectors(s,r),h.cross(g),a.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,u),a.add(h),c.add(h),l.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),g.subVectors(s,r),h.cross(g),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)un.fromBufferAttribute(t,e),un.normalize(),t.setXYZ(e,un.x,un.y,un.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,g=a.normalized,p=new l.constructor(c.length*h);let m=0,x=0;for(let v=0,u=c.length;v<u;v++){a.isInterleavedBufferAttribute?m=c[v]*a.data.stride+a.offset:m=c[v]*h;for(let f=0;f<h;f++)p[x++]=l[m++]}return new En(p,h,g)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new an,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,g=l.length;h<g;h++){const p=l[h],m=t(p,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let g=0,p=l.length;g<p;g++){const m=l[g];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],g=r[l];for(let p=0,m=g.length;p<m;p++)h.push(g[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const g=o[l];this.addGroup(g.start,g.count,g.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ia=new O,Sf=new O,yf=new ie;class fi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ia.subVectors(n,e).cross(Sf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Ia),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yf.getNormalMatrix(t),s=this.coplanarPoint(Ia).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let bf=0;class qi extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=Vs(),this.name="",this.type="Material",this.blending=Ns,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nl,this.blendDst=il,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=eo,this.stencilZFail=eo,this.stencilZPass=eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new oe().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new fi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ft().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wi=new O,Na=new O,Pr=new O,Lr=new O;class Ws{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wi.copy(this.origin).addScaledVector(this.direction,e),wi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Na.copy(t).add(e).multiplyScalar(.5),Pr.copy(e).sub(t).normalize(),Lr.copy(this.origin).sub(Na);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Pr),a=Lr.dot(this.direction),c=-Lr.dot(Pr),l=Lr.lengthSq(),h=Math.abs(1-o*o);let g,p,m,x;if(h>0)if(g=o*c-a,p=o*a-c,x=r*h,g>=0)if(p>=-x)if(p<=x){const v=1/h;g*=v,p*=v,m=g*(g+o*p+2*a)+p*(o*g+p+2*c)+l}else p=r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;else p=-r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;else p<=-x?(g=Math.max(0,-(-o*r+a)),p=g>0?-r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l):p<=x?(g=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(g=Math.max(0,-(o*r+a)),p=g>0?r:Math.min(Math.max(-r,-c),r),m=-g*g+p*(p+2*c)+l);else p=o>0?-r:r,g=Math.max(0,-(o*p+a)),m=-g*g+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Na).addScaledVector(Pr,p),m}intersectSphere(t,e){if(t.radius<0)return null;wi.subVectors(t.center,this.origin);const n=wi.dot(this.direction),s=wi.dot(wi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,g=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(a=(t.min.z-p.z)*g,c=(t.max.z-p.z)*g):(a=(t.max.z-p.z)*g,c=(t.min.z-p.z)*g),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,wi)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,g=t.x-o.x,p=t.y-o.y,m=t.z-o.z,x=e.x-o.x,v=e.y-o.y,u=e.z-o.z,f=n.x-o.x,S=n.y-o.y,T=n.z-o.z,R=Math.abs(c),y=Math.abs(l),_=Math.abs(h);let d,M,w,E,A,L,U,I,k,H,W,it;if(R>=y&&R>=_?(w=c,L=g,k=x,it=f,c>=0?(d=l,M=h,E=p,A=m,U=v,I=u,H=S,W=T):(d=h,M=l,E=m,A=p,U=u,I=v,H=T,W=S)):y>=_?(w=l,L=p,k=v,it=S,l>=0?(d=h,M=c,E=m,A=g,U=u,I=x,H=T,W=f):(d=c,M=h,E=g,A=m,U=x,I=u,H=f,W=T)):(w=h,L=m,k=u,it=T,h>=0?(d=c,M=l,E=g,A=p,U=x,I=v,H=f,W=S):(d=l,M=c,E=p,A=g,U=v,I=x,H=S,W=f)),w===0)return null;const Y=d/w,tt=M/w,at=1/w,Mt=E-Y*L,Lt=A-tt*L,Q=U-Y*k,_t=I-tt*k,bt=H-Y*it,Nt=W-tt*it,St=bt*_t-Nt*Q,Jt=Mt*Nt-Lt*bt,Oe=Q*Lt-_t*Mt;if(s){if(St<0||Jt<0||Oe<0)return null}else if((St<0||Jt<0||Oe<0)&&(St>0||Jt>0||Oe>0))return null;const kt=St+Jt+Oe;if(kt===0)return null;const st=at*(St*L+Jt*k+Oe*it);return(kt>0?st<0:st>0)?null:this.at(st/kt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class di extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=sl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const uc=new xe,ss=new Ws,Dr=new Yi,hc=new O,Ir=new O,Nr=new O,Ur=new O,Ua=new O,Fr=new O,fc=new O,Or=new O;class Te extends tn{constructor(t=new an,e=new di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],g=r[c];h!==0&&(Ua.fromBufferAttribute(g,t),o?Fr.addScaledVector(Ua,h):Fr.addScaledVector(Ua.sub(e),h))}e.add(Fr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(r),ss.copy(t.ray).recast(t.near),!(Dr.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Dr,hc)===null||ss.origin.distanceToSquared(hc)>(t.far-t.near)**2))&&(uc.copy(r).invert(),ss.copy(t.ray).applyMatrix4(uc),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ss)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,g=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,v=p.length;x<v;x++){const u=p[x],f=o[u.materialIndex],S=Math.max(u.start,m.start),T=Math.min(a.count,Math.min(u.start+u.count,m.start+m.count));for(let R=S,y=T;R<y;R+=3){const _=a.getX(R),d=a.getX(R+1),M=a.getX(R+2);s=Br(this,f,t,n,l,h,g,_,d,M),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let u=x,f=v;u<f;u+=3){const S=a.getX(u),T=a.getX(u+1),R=a.getX(u+2);s=Br(this,o,t,n,l,h,g,S,T,R),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,v=p.length;x<v;x++){const u=p[x],f=o[u.materialIndex],S=Math.max(u.start,m.start),T=Math.min(c.count,Math.min(u.start+u.count,m.start+m.count));for(let R=S,y=T;R<y;R+=3){const _=R,d=R+1,M=R+2;s=Br(this,f,t,n,l,h,g,_,d,M),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let u=x,f=v;u<f;u+=3){const S=u,T=u+1,R=u+2;s=Br(this,o,t,n,l,h,g,S,T,R),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}}function Ef(i,t,e,n,s,r,o,a){let c;if(t.side===bn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Hi,a),c===null)return null;Or.copy(a),Or.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Or);return l<e.near||l>e.far?null:{distance:l,point:Or.clone(),object:i}}function Br(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Ir),i.getVertexPosition(c,Nr),i.getVertexPosition(l,Ur);const h=Ef(i,t,e,n,Ir,Nr,Ur,fc);if(h){const g=new O;kn.getBarycoord(fc,Ir,Nr,Ur,g),s&&(h.uv=kn.getInterpolatedAttribute(s,a,c,l,g,new Ft)),r&&(h.uv1=kn.getInterpolatedAttribute(r,a,c,l,g,new Ft)),o&&(h.normal=kn.getInterpolatedAttribute(o,a,c,l,g,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new O,materialIndex:0};kn.getNormal(Ir,Nr,Ur,p.normal),h.face=p,h.barycoord=g}return h}class Al extends pn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=hn,h=hn,g,p){super(null,o,a,c,l,h,s,r,g,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ka extends En{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ps=new xe,dc=new xe,zr=[],pc=new Xi,wf=new xe,$s=new Te,Qs=new Yi;class Rl extends Te{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ka(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Xi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ps),pc.copy(t.boundingBox).applyMatrix4(Ps),this.boundingBox.union(pc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ps),Qs.copy(t.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(Qs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),t.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),dc.multiplyMatrices(n,Ps),$s.matrixWorld=dc,$s.raycast(t,zr);for(let o=0,a=zr.length;o<a;o++){const c=zr[o];c.instanceId=r,c.object=this,e.push(c)}zr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ka(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Al(new Float32Array(s*this.count),s,this.count,na,Hn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const rs=new Yi,Tf=new Ft(.5,.5),Gr=new O;class Gs{constructor(t=new fi,e=new fi,n=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],g=r[5],p=r[6],m=r[7],x=r[8],v=r[9],u=r[10],f=r[11],S=r[12],T=r[13],R=r[14],y=r[15];if(s[0].setComponents(l-o,m-h,f-x,y-S).normalize(),s[1].setComponents(l+o,m+h,f+x,y+S).normalize(),s[2].setComponents(l+a,m+g,f+v,y+T).normalize(),s[3].setComponents(l-a,m-g,f-v,y-T).normalize(),n)s[4].setComponents(c,p,u,R).normalize(),s[5].setComponents(l-c,m-p,f-u,y-R).normalize();else if(s[4].setComponents(l-c,m-p,f-u,y-R).normalize(),e===Vn)s[5].setComponents(l+c,m+p,f+u,y+R).normalize();else if(e===zs)s[5].setComponents(c,p,u,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(t){rs.center.set(0,0,0);const e=Tf.distanceTo(t.center);return rs.radius=.7071067811865476+e,rs.applyMatrix4(t.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Gr.x=s.normal.x>0?t.max.x:t.min.x,Gr.y=s.normal.y>0?t.max.y:t.min.y,Gr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const mc=new xe;class ca{constructor(){this.coordinateSystem=Vn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];mc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Gs),n[s].setFromProjectionMatrix(mc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Gs),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new ca().copy(this)}}class Cl extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Yo=new O,qo=new O,gc=new xe,js=new Ws,kr=new Yi,Fa=new O,_c=new O;class Zu extends tn{constructor(t=new an,e=new Cl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Yo.fromBufferAttribute(e,s-1),qo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Yo.distanceTo(qo);t.setAttribute("lineDistance",new Ne(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;gc.copy(s).invert(),js.copy(t.ray).applyMatrix4(gc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let v=m,u=x-1;v<u;v+=l){const f=h.getX(v),S=h.getX(v+1),T=Hr(this,t,js,c,f,S,v);T&&e.push(T)}if(this.isLineLoop){const v=h.getX(x-1),u=h.getX(m),f=Hr(this,t,js,c,v,u,x-1);f&&e.push(f)}}else{const m=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let v=m,u=x-1;v<u;v+=l){const f=Hr(this,t,js,c,v,v+1,v);f&&e.push(f)}if(this.isLineLoop){const v=Hr(this,t,js,c,x-1,m,x-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Hr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Yo.fromBufferAttribute(a,s),qo.fromBufferAttribute(a,r),e.distanceSqToSegment(Yo,qo,Fa,_c)>n)return;Fa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Fa);if(!(l<t.near||l>t.far))return{distance:l,point:_c.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const xc=new O,vc=new O;class Ku extends Zu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)xc.fromBufferAttribute(e,s),vc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+xc.distanceTo(vc);t.setAttribute("lineDistance",new Ne(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pl extends qi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Mc=new xe,Ja=new Ws,Vr=new Yi,Wr=new O;class Ju extends tn{constructor(t=new an,e=new Pl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(s),Vr.radius+=r,t.ray.intersectsSphere(Vr)===!1)return;Mc.copy(s).invert(),Ja.copy(t.ray).applyMatrix4(Mc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,g=n.attributes.position;if(l!==null){const p=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let x=p,v=m;x<v;x++){const u=l.getX(x);Wr.fromBufferAttribute(g,u),Sc(Wr,u,c,s,t,e,this)}}else{const p=Math.max(0,o.start),m=Math.min(g.count,o.start+o.count);for(let x=p,v=m;x<v;x++)Wr.fromBufferAttribute(g,x),Sc(Wr,x,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sc(i,t,e,n,s,r,o){const a=Ja.distanceSqToPoint(i);if(a<e){const c=new O;Ja.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Ll extends pn{constructor(t=[],e=fs,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $a extends pn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ps extends pn{constructor(t,e,n=ei,s,r,o,a=hn,c=hn,l,h=Li,g=1){if(h!==Li&&h!==Ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:g};super(p,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new oa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Dl extends ps{constructor(t,e=ei,n=fs,s,r,o=hn,a=hn,c,l=Li){const h={width:t,height:t,depth:1},g=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Il extends pn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class on extends an{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],g=[];let p=0,m=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(g,2));function x(v,u,f,S,T,R,y,_,d,M,w){const E=R/d,A=y/M,L=R/2,U=y/2,I=_/2,k=d+1,H=M+1;let W=0,it=0;const Y=new O;for(let tt=0;tt<H;tt++){const at=tt*A-U;for(let Mt=0;Mt<k;Mt++){const Lt=Mt*E-L;Y[v]=Lt*S,Y[u]=at*T,Y[f]=I,l.push(Y.x,Y.y,Y.z),Y[v]=0,Y[u]=0,Y[f]=_>0?1:-1,h.push(Y.x,Y.y,Y.z),g.push(Mt/d),g.push(1-tt/M),W+=1}}for(let tt=0;tt<M;tt++)for(let at=0;at<d;at++){const Mt=p+at+k*tt,Lt=p+at+k*(tt+1),Q=p+(at+1)+k*(tt+1),_t=p+(at+1)+k*tt;c.push(Mt,Lt,_t),c.push(Lt,Q,_t),it+=6}a.addGroup(m,it,w),m+=it,p+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Wn extends an{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],g=[],p=[],m=[];let x=0;const v=[],u=n/2;let f=0;S(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(p,3)),this.setAttribute("uv",new Ne(m,2));function S(){const R=new O,y=new O;let _=0;const d=(e-t)/n;for(let M=0;M<=r;M++){const w=[],E=M/r,A=E*(e-t)+t;for(let L=0;L<=s;L++){const U=L/s,I=U*c+a,k=Math.sin(I),H=Math.cos(I);y.x=A*k,y.y=-E*n+u,y.z=A*H,g.push(y.x,y.y,y.z),R.set(k,d,H).normalize(),p.push(R.x,R.y,R.z),m.push(U,1-E),w.push(x++)}v.push(w)}for(let M=0;M<s;M++)for(let w=0;w<r;w++){const E=v[w][M],A=v[w+1][M],L=v[w+1][M+1],U=v[w][M+1];(t>0||w!==0)&&(h.push(E,A,U),_+=3),(e>0||w!==r-1)&&(h.push(A,L,U),_+=3)}l.addGroup(f,_,0),f+=_}function T(R){const y=x,_=new Ft,d=new O;let M=0;const w=R===!0?t:e,E=R===!0?1:-1;for(let L=1;L<=s;L++)g.push(0,u*E,0),p.push(0,E,0),m.push(.5,.5),x++;const A=x;for(let L=0;L<=s;L++){const I=L/s*c+a,k=Math.cos(I),H=Math.sin(I);d.x=w*H,d.y=u*E,d.z=w*k,g.push(d.x,d.y,d.z),p.push(0,E,0),_.x=k*.5+.5,_.y=H*.5*E+.5,m.push(_.x,_.y),x++}for(let L=0;L<s;L++){const U=y+L,I=A+L;R===!0?h.push(I,I+1,U):h.push(I+1,I,U),M+=3}l.addGroup(f,M,R===!0?1:2),f+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _i extends Wn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new _i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ua extends an{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(r.slice(),3)),this.setAttribute("uv",new Ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const T=new O,R=new O,y=new O;for(let _=0;_<e.length;_+=3)m(e[_+0],T),m(e[_+1],R),m(e[_+2],y),c(T,R,y,S)}function c(S,T,R,y){const _=y+1,d=[];for(let M=0;M<=_;M++){d[M]=[];const w=S.clone().lerp(R,M/_),E=T.clone().lerp(R,M/_),A=_-M;for(let L=0;L<=A;L++)L===0&&M===_?d[M][L]=w:d[M][L]=w.clone().lerp(E,L/A)}for(let M=0;M<_;M++)for(let w=0;w<2*(_-M)-1;w++){const E=Math.floor(w/2);w%2===0?(p(d[M][E+1]),p(d[M+1][E]),p(d[M][E])):(p(d[M][E+1]),p(d[M+1][E+1]),p(d[M+1][E]))}}function l(S){const T=new O;for(let R=0;R<r.length;R+=3)T.x=r[R+0],T.y=r[R+1],T.z=r[R+2],T.normalize().multiplyScalar(S),r[R+0]=T.x,r[R+1]=T.y,r[R+2]=T.z}function h(){const S=new O;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];const R=u(S)/2/Math.PI+.5,y=f(S)/Math.PI+.5;o.push(R,1-y)}x(),g()}function g(){for(let S=0;S<o.length;S+=6){const T=o[S+0],R=o[S+2],y=o[S+4],_=Math.max(T,R,y),d=Math.min(T,R,y);_>.9&&d<.1&&(T<.2&&(o[S+0]+=1),R<.2&&(o[S+2]+=1),y<.2&&(o[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function m(S,T){const R=S*3;T.x=t[R+0],T.y=t[R+1],T.z=t[R+2]}function x(){const S=new O,T=new O,R=new O,y=new O,_=new Ft,d=new Ft,M=new Ft;for(let w=0,E=0;w<r.length;w+=9,E+=6){S.set(r[w+0],r[w+1],r[w+2]),T.set(r[w+3],r[w+4],r[w+5]),R.set(r[w+6],r[w+7],r[w+8]),_.set(o[E+0],o[E+1]),d.set(o[E+2],o[E+3]),M.set(o[E+4],o[E+5]),y.copy(S).add(T).add(R).divideScalar(3);const A=u(y);v(_,E+0,S,A),v(d,E+2,T,A),v(M,E+4,R,A)}}function v(S,T,R,y){y<0&&S.x===1&&(o[T]=S.x-1),R.x===0&&R.z===0&&(o[T]=y/2/Math.PI+.5)}function u(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ua(t.vertices,t.indices,t.radius,t.detail)}}class xi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,m=(o-h)/p;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Ft:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new O,s=[],r=[],o=[],a=new O,c=new xe;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),g=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),g<=l&&(l=g,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(s[m-1],s[m]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(fe(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(c.makeRotationAxis(a,x))}o[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(fe(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(m=-m);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],m*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class Nl extends xi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ft){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),g=Math.sin(this.aRotation),p=c-this.aX,m=l-this.aY;c=p*h-m*g+this.aX,l=p*g+m*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class $u extends Nl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ul(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,g){let p=(o-r)/l-(a-r)/(l+h)+(a-o)/h,m=(a-o)/h-(c-o)/(h+g)+(c-a)/g;p*=h,m*=h,s(o,a,p,m)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const yc=new O,bc=new O,Oa=new Ul,Ba=new Ul,za=new Ul;class Qu extends xi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new O){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(bc.subVectors(s[0],s[1]).add(s[0]),l=bc);const g=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(yc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=yc),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(g),m),v=Math.pow(g.distanceToSquared(p),m),u=Math.pow(p.distanceToSquared(h),m);v<1e-4&&(v=1),x<1e-4&&(x=v),u<1e-4&&(u=v),Oa.initNonuniformCatmullRom(l.x,g.x,p.x,h.x,x,v,u),Ba.initNonuniformCatmullRom(l.y,g.y,p.y,h.y,x,v,u),za.initNonuniformCatmullRom(l.z,g.z,p.z,h.z,x,v,u)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(l.x,g.x,p.x,h.x,this.tension),Ba.initCatmullRom(l.y,g.y,p.y,h.y,this.tension),za.initCatmullRom(l.z,g.z,p.z,h.z,this.tension));return n.set(Oa.calc(c),Ba.calc(c),za.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ec(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Af(i,t){const e=1-i;return e*e*t}function Rf(i,t){return 2*(1-i)*i*t}function Cf(i,t){return i*i*t}function fr(i,t,e,n){return Af(i,t)+Rf(i,e)+Cf(i,n)}function Pf(i,t){const e=1-i;return e*e*e*t}function Lf(i,t){const e=1-i;return 3*e*e*i*t}function Df(i,t){return 3*(1-i)*i*i*t}function If(i,t){return i*i*i*t}function dr(i,t,e,n,s){return Pf(i,t)+Lf(i,e)+Df(i,n)+If(i,s)}class ju extends xi{constructor(t=new Ft,e=new Ft,n=new Ft,s=new Ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ft){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(dr(t,s.x,r.x,o.x,a.x),dr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class th extends xi{constructor(t=new O,e=new O,n=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(dr(t,s.x,r.x,o.x,a.x),dr(t,s.y,r.y,o.y,a.y),dr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class eh extends xi{constructor(t=new Ft,e=new Ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nh extends xi{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ih extends xi{constructor(t=new Ft,e=new Ft,n=new Ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ft){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(t,s.x,r.x,o.x),fr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fl extends xi{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(fr(t,s.x,r.x,o.x),fr(t,s.y,r.y,o.y),fr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sh extends xi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ft){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],g=s[o>s.length-3?s.length-1:o+2];return n.set(Ec(a,c.x,l.x,h.x,g.x),Ec(a,c.y,l.y,h.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ft().fromArray(s))}return this}}var Nf=Object.freeze({__proto__:null,ArcCurve:$u,CatmullRomCurve3:Qu,CubicBezierCurve:ju,CubicBezierCurve3:th,EllipseCurve:Nl,LineCurve:eh,LineCurve3:nh,QuadraticBezierCurve:ih,QuadraticBezierCurve3:Fl,SplineCurve:sh});class ha extends ua{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ha(t.radius,t.detail)}}class Di extends an{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,g=t/a,p=e/c,m=[],x=[],v=[],u=[];for(let f=0;f<h;f++){const S=f*p-o;for(let T=0;T<l;T++){const R=T*g-r;x.push(R,-S,0),v.push(0,0,1),u.push(T/a),u.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){const T=S+l*f,R=S+l*(f+1),y=S+1+l*(f+1),_=S+1+l*f;m.push(T,R,_),m.push(R,y,_)}this.setIndex(m),this.setAttribute("position",new Ne(x,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Di(t.width,t.height,t.widthSegments,t.heightSegments)}}class Mr extends an{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let g=t;const p=(e-t)/s,m=new O,x=new Ft;for(let v=0;v<=s;v++){for(let u=0;u<=n;u++){const f=r+u/n*o;m.x=g*Math.cos(f),m.y=g*Math.sin(f),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/e+1)/2,x.y=(m.y/e+1)/2,h.push(x.x,x.y)}g+=p}for(let v=0;v<s;v++){const u=v*(n+1);for(let f=0;f<n;f++){const S=f+u,T=S,R=S+n+1,y=S+n+2,_=S+1;a.push(T,R,_),a.push(R,y,_)}}this.setIndex(a),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ki extends an{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],g=new O,p=new O,m=[],x=[],v=[],u=[];for(let f=0;f<=n;f++){const S=[],T=f/n,R=o+T*a,y=t*Math.cos(R),_=Math.sqrt(t*t-y*y);let d=0;f===0&&o===0?d=.5/e:f===n&&c===Math.PI&&(d=-.5/e);for(let M=0;M<=e;M++){const w=M/e,E=s+w*r;g.x=-_*Math.cos(E),g.y=y,g.z=_*Math.sin(E),x.push(g.x,g.y,g.z),p.copy(g).normalize(),v.push(p.x,p.y,p.z),u.push(w+d,1-T),S.push(l++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){const T=h[f][S+1],R=h[f][S],y=h[f+1][S],_=h[f+1][S+1];(f!==0||o>0)&&m.push(T,R,_),(f!==n-1||c<Math.PI)&&m.push(R,y,_)}this.setIndex(m),this.setAttribute("position",new Ne(x,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Pi extends an{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],h=[],g=[],p=new O,m=new O,x=new O;for(let v=0;v<=n;v++){const u=o+v/n*a;for(let f=0;f<=s;f++){const S=f/s*r;m.x=(t+e*Math.cos(u))*Math.cos(S),m.y=(t+e*Math.cos(u))*Math.sin(S),m.z=e*Math.sin(u),l.push(m.x,m.y,m.z),p.x=t*Math.cos(S),p.y=t*Math.sin(S),x.subVectors(m,p).normalize(),h.push(x.x,x.y,x.z),g.push(f/s),g.push(v/n)}}for(let v=1;v<=n;v++)for(let u=1;u<=s;u++){const f=(s+1)*v+u-1,S=(s+1)*(v-1)+u-1,T=(s+1)*(v-1)+u,R=(s+1)*v+u;c.push(f,S,R),c.push(S,T,R)}this.setIndex(c),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Ol extends an{constructor(t=new Fl(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new O,c=new O,l=new Ft;let h=new O;const g=[],p=[],m=[],x=[];v(),this.setIndex(x),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(p,3)),this.setAttribute("uv",new Ne(m,2));function v(){for(let T=0;T<e;T++)u(T);u(r===!1?e:0),S(),f()}function u(T){h=t.getPointAt(T/e,h);const R=o.normals[T],y=o.binormals[T];for(let _=0;_<=s;_++){const d=_/s*Math.PI*2,M=Math.sin(d),w=-Math.cos(d);c.x=w*R.x+M*y.x,c.y=w*R.y+M*y.y,c.z=w*R.z+M*y.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,g.push(a.x,a.y,a.z)}}function f(){for(let T=1;T<=e;T++)for(let R=1;R<=s;R++){const y=(s+1)*(T-1)+(R-1),_=(s+1)*T+(R-1),d=(s+1)*T+R,M=(s+1)*(T-1)+R;x.push(y,_,M),x.push(_,d,M)}}function S(){for(let T=0;T<=e;T++)for(let R=0;R<=s;R++)l.x=T/e,l.y=R/s,m.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ol(new Nf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function ks(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(wc(s))s.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(wc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Mn(i){const t={};for(let e=0;e<i.length;e++){const n=ks(i[e]);for(const s in n)t[s]=n[s]}return t}function wc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Uf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function rh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const oh={clone:ks,merge:Mn};var Ff=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wi extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ff,this.fragmentShader=Of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ks(t.uniforms),this.uniformsGroups=Uf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ft().fromArray(s.value);break;case"v3":this.uniforms[n].value=new O().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ie().fromArray(s.value);break;case"m4":this.uniforms[n].value=new xe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class ah extends Wi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Hs extends qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wo,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class lh extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ch extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Bl extends tn{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class uh extends Bl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ga=new xe,Tc=new O,Ac=new O;class hh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gs,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Tc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Tc),Ac.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ac),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ga.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ga,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===zs||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xr=new O,Yr=new Cn,li=new O;class zl extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xr,Yr,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xr,Yr,li.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Xr,Yr,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xr,Yr,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new O,Rc=new Ft,Cc=new Ft;class Gn extends zl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-t/Gi.z)}getViewSize(t,e){return this.getViewBounds(t,Rc,Cc),e.subVectors(Cc,Rc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ur*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Gl extends zl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Bf extends hh{constructor(){super(new Gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qa extends Bl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Bf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ls=-90,Ds=1;class Zo extends tn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gn(Ls,Ds,t,e);s.layers=this.layers,this.add(s);const r=new Gn(Ls,Ds,t,e);r.layers=this.layers,this.add(r);const o=new Gn(Ls,Ds,t,e);o.layers=this.layers,this.add(o);const a=new Gn(Ls,Ds,t,e);a.layers=this.layers,this.add(a);const c=new Gn(Ls,Ds,t,e);c.layers=this.layers,this.add(c);const l=new Gn(Ls,Ds,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,g=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let u=!1;t.isWebGLRenderer===!0?u=t.state.buffers.depth.getReversed():u=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=v,t.setRenderTarget(n,5,s),u&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(g,p,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class fh extends Gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const Pc=new xe;class dh{constructor(t,e,n=0,s=1/0){this.ray=new Ws(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):we("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Pc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pc),this}intersectObject(t,e=!0,n=[]){return ja(t,this,n,e),n.sort(Lc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ja(t[s],this,n,e);return n.sort(Lc),n}}function Lc(i,t){return i.distance-t.distance}function ja(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ja(r[o],t,e,!0)}}class tl{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(fe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ph extends Ii{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Dc(i,t,e,n){const s=zf(n);switch(e){case gl:return i*t;case na:return i*t/s.components*s.byteLength;case ia:return i*t/s.components*s.byteLength;case Vi:return i*t*2/s.components*s.byteLength;case sa:return i*t*2/s.components*s.byteLength;case _l:return i*t*3/s.components*s.byteLength;case jn:return i*t*4/s.components*s.byteLength;case ra:return i*t*4/s.components*s.byteLength;case rr:case or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ar:case lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mo:case _o:return Math.max(i,16)*Math.max(t,8)/4;case po:case go:return Math.max(i,8)*Math.max(t,8)/2;case xo:case vo:case So:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Mo:case mr:case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case To:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Po:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Bo:case zo:case Go:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ko:case Ho:return Math.ceil(i/4)*Math.ceil(t/4)*8;case gr:case Vo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zf(i){switch(i){case Rn:case fl:return{byteLength:1,components:1};case Bs:case dl:case ni:return{byteLength:2,components:1};case ta:case ea:return{byteLength:2,components:4};case ei:case jo:case Hn:return{byteLength:4,components:1};case pl:case ml:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$o}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$o);function mh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Gf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,g=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:g}}function n(a,c,l){const h=c.array,g=c.updateRanges;if(i.bindBuffer(l,a),g.length===0)i.bufferSubData(l,0,h);else{g.sort((m,x)=>m.start-x.start);let p=0;for(let m=1;m<g.length;m++){const x=g[p],v=g[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++p,g[p]=v)}g.length=p+1;for(let m=0,x=g.length;m<x;m++){const v=g[m];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hf=`#ifdef USE_ALPHAHASH
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
#endif`,Vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qf=`#ifdef USE_AOMAP
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
#endif`,Zf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kf=`#ifdef USE_BATCHING
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
#endif`,Jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$f=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,td=`#ifdef USE_IRIDESCENCE
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
#endif`,ed=`#ifdef USE_BUMPMAP
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
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ld=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ud=`#define PI 3.141592653589793
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
} // validated`,hd=`vec3 transformedNormal = objectNormal;
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
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,md=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",_d=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xd=`#ifdef USE_ENVMAP
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
#endif`,vd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
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
#endif`,Sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ed=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
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
}`,Rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dd=`#ifdef USE_ENVMAP
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
#endif`,Id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
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
#endif`,Bd=`uniform sampler2D dfgLUT;
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
}`,zd=`
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,kd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Vd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jd=`#if defined( USE_POINTS_UV )
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
#endif`,$d=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tp=`#if defined( USE_MORPHCOLORS )
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
#endif`,ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`#ifdef USE_MORPHTARGETS
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
#endif`,ip=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cp=`#ifdef USE_NORMALMAP
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
#endif`,up=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wp=`float getShadowMask() {
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
}`,Tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ap=`#ifdef USE_SKINNING
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
#endif`,Rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cp=`#ifdef USE_SKINNING
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
#endif`,Pp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ip=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Np=`#ifdef USE_TRANSMISSION
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
#endif`,Up=`#ifdef USE_TRANSMISSION
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
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kp=`uniform sampler2D t2D;
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
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vp=`uniform float backgroundBlurriness;
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
}`,Wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yp=`#include <common>
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
}`,qp=`#if DEPTH_PACKING == 3200
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
}`,Zp=`#define DISTANCE
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
}`,Kp=`#define DISTANCE
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
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$p=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`uniform float scale;
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
}`,jp=`uniform vec3 diffuse;
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
}`,tm=`#include <common>
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
}`,em=`uniform vec3 diffuse;
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
}`,nm=`#define LAMBERT
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
}`,im=`#define LAMBERT
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
}`,sm=`#define MATCAP
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
}`,rm=`#define MATCAP
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
}`,om=`#define NORMAL
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
}`,am=`#define NORMAL
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
}`,lm=`#define PHONG
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
}`,cm=`#define PHONG
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
}`,um=`#define STANDARD
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
}`,hm=`#define STANDARD
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
}`,fm=`#define TOON
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
}`,dm=`#define TOON
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
}`,pm=`uniform float size;
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
}`,mm=`uniform vec3 diffuse;
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
}`,gm=`#include <common>
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
}`,_m=`uniform vec3 color;
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
}`,xm=`uniform float rotation;
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
}`,vm=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:kf,alphahash_pars_fragment:Hf,alphamap_fragment:Vf,alphamap_pars_fragment:Wf,alphatest_fragment:Xf,alphatest_pars_fragment:Yf,aomap_fragment:qf,aomap_pars_fragment:Zf,batching_pars_vertex:Kf,batching_vertex:Jf,begin_vertex:$f,beginnormal_vertex:Qf,bsdfs:jf,iridescence_fragment:td,bumpmap_pars_fragment:ed,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:sd,clipping_planes_vertex:rd,color_fragment:od,color_pars_fragment:ad,color_pars_vertex:ld,color_vertex:cd,common:ud,defaultnormal_vertex:hd,displacementmap_pars_vertex:fd,displacementmap_vertex:dd,emissivemap_fragment:pd,emissivemap_pars_fragment:md,colorspace_fragment:gd,colorspace_pars_fragment:_d,envmap_fragment:xd,envmap_common_pars_fragment:vd,envmap_pars_fragment:Md,envmap_pars_vertex:Sd,envmap_physical_pars_fragment:Dd,envmap_vertex:yd,fog_vertex:bd,fog_pars_vertex:Ed,fog_fragment:wd,fog_pars_fragment:Td,gradientmap_pars_fragment:Ad,lightmap_pars_fragment:Rd,lights_lambert_fragment:Cd,lights_lambert_pars_fragment:Pd,lights_pars_begin:Ld,lights_toon_fragment:Id,lights_toon_pars_fragment:Nd,lights_phong_fragment:Ud,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:Bd,lights_fragment_begin:zd,lights_fragment_maps:Gd,lights_fragment_end:kd,lightprobes_pars_fragment:Hd,logdepthbuf_fragment:Vd,logdepthbuf_pars_fragment:Wd,logdepthbuf_pars_vertex:Xd,logdepthbuf_vertex:Yd,map_fragment:qd,map_pars_fragment:Zd,map_particle_fragment:Kd,map_particle_pars_fragment:Jd,metalnessmap_fragment:$d,metalnessmap_pars_fragment:Qd,morphinstance_vertex:jd,morphcolor_vertex:tp,morphnormal_vertex:ep,morphtarget_pars_vertex:np,morphtarget_vertex:ip,normal_fragment_begin:sp,normal_fragment_maps:rp,normal_pars_fragment:op,normal_pars_vertex:ap,normal_vertex:lp,normalmap_pars_fragment:cp,clearcoat_normal_fragment_begin:up,clearcoat_normal_fragment_maps:hp,clearcoat_pars_fragment:fp,iridescence_pars_fragment:dp,opaque_fragment:pp,packing:mp,premultiplied_alpha_fragment:gp,project_vertex:_p,dithering_fragment:xp,dithering_pars_fragment:vp,roughnessmap_fragment:Mp,roughnessmap_pars_fragment:Sp,shadowmap_pars_fragment:yp,shadowmap_pars_vertex:bp,shadowmap_vertex:Ep,shadowmask_pars_fragment:wp,skinbase_vertex:Tp,skinning_pars_vertex:Ap,skinning_vertex:Rp,skinnormal_vertex:Cp,specularmap_fragment:Pp,specularmap_pars_fragment:Lp,tonemapping_fragment:Dp,tonemapping_pars_fragment:Ip,transmission_fragment:Np,transmission_pars_fragment:Up,uv_pars_fragment:Fp,uv_pars_vertex:Op,uv_vertex:Bp,worldpos_vertex:zp,background_vert:Gp,background_frag:kp,backgroundCube_vert:Hp,backgroundCube_frag:Vp,cube_vert:Wp,cube_frag:Xp,depth_vert:Yp,depth_frag:qp,distance_vert:Zp,distance_frag:Kp,equirect_vert:Jp,equirect_frag:$p,linedashed_vert:Qp,linedashed_frag:jp,meshbasic_vert:tm,meshbasic_frag:em,meshlambert_vert:nm,meshlambert_frag:im,meshmatcap_vert:sm,meshmatcap_frag:rm,meshnormal_vert:om,meshnormal_frag:am,meshphong_vert:lm,meshphong_frag:cm,meshphysical_vert:um,meshphysical_frag:hm,meshtoon_vert:fm,meshtoon_frag:dm,points_vert:pm,points_frag:mm,shadow_vert:gm,shadow_frag:_m,sprite_vert:xm,sprite_frag:vm},Dt={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},$n={basic:{uniforms:Mn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:Mn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new oe(0)},envMapIntensity:{value:1}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:Mn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:Mn([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:Mn([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new oe(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:Mn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:Mn([Dt.points,Dt.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:Mn([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:Mn([Dt.common,Dt.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:Mn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:Mn([Dt.sprite,Dt.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distance:{uniforms:Mn([Dt.common,Dt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distance_vert,fragmentShader:le.distance_frag},shadow:{uniforms:Mn([Dt.lights,Dt.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};$n.physical={uniforms:Mn([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ie},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const qr={r:0,b:0,g:0},Mm=new xe,gh=new ie;gh.set(-1,0,0,0,1,0,0,0,1);function Sm(i,t,e,n,s,r){const o=new oe(0);let a=s===!0?0:1,c,l,h=null,g=0,p=null;function m(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const R=S.backgroundBlurriness>0;T=t.get(T,R)}return T}function x(S){let T=!1;const R=m(S);R===null?u(o,a):R&&R.isColor&&(u(R,1),T=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(S,T){const R=m(T);R&&R.isCubeTexture?(l===void 0&&(l=new Te(new on(1,1,1),new Wi({name:"BackgroundCubeMaterial",uniforms:ks($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(y,_,d){this.matrixWorld.copyPosition(d.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=R,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Mm.makeRotationFromEuler(T.backgroundRotation)).transpose(),R.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gh),l.material.toneMapped=_e.getTransfer(R.colorSpace)!==Ie,(h!==R||g!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=R,g=R.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Te(new Di(2,2),new Wi({name:"BackgroundMaterial",uniforms:ks($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=_e.getTransfer(R.colorSpace)!==Ie,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||g!==R.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=R,g=R.version,p=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function u(S,T){S.getRGB(qr,rh(i)),e.buffers.color.setClear(qr.r,qr.g,qr.b,T,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,T=1){o.set(S),a=T,u(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,u(o,a)},render:x,addToRenderList:v,dispose:f}}function ym(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(A,L,U,I,k){let H=!1;const W=g(A,I,U,L);r!==W&&(r=W,l(r.object)),H=m(A,I,U,k),H&&x(A,I,U,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,R(A,L,U,I),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function h(A){return i.deleteVertexArray(A)}function g(A,L,U,I){const k=I.wireframe===!0;let H=n[L.id];H===void 0&&(H={},n[L.id]=H);const W=A.isInstancedMesh===!0?A.id:0;let it=H[W];it===void 0&&(it={},H[W]=it);let Y=it[U.id];Y===void 0&&(Y={},it[U.id]=Y);let tt=Y[k];return tt===void 0&&(tt=p(c()),Y[k]=tt),tt}function p(A){const L=[],U=[],I=[];for(let k=0;k<e;k++)L[k]=0,U[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:I,object:A,attributes:{},index:null}}function m(A,L,U,I){const k=r.attributes,H=L.attributes;let W=0;const it=U.getAttributes();for(const Y in it)if(it[Y].location>=0){const at=k[Y];let Mt=H[Y];if(Mt===void 0&&(Y==="instanceMatrix"&&A.instanceMatrix&&(Mt=A.instanceMatrix),Y==="instanceColor"&&A.instanceColor&&(Mt=A.instanceColor)),at===void 0||at.attribute!==Mt||Mt&&at.data!==Mt.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function x(A,L,U,I){const k={},H=L.attributes;let W=0;const it=U.getAttributes();for(const Y in it)if(it[Y].location>=0){let at=H[Y];at===void 0&&(Y==="instanceMatrix"&&A.instanceMatrix&&(at=A.instanceMatrix),Y==="instanceColor"&&A.instanceColor&&(at=A.instanceColor));const Mt={};Mt.attribute=at,at&&at.data&&(Mt.data=at.data),k[Y]=Mt,W++}r.attributes=k,r.attributesNum=W,r.index=I}function v(){const A=r.newAttributes;for(let L=0,U=A.length;L<U;L++)A[L]=0}function u(A){f(A,0)}function f(A,L){const U=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;U[A]=1,I[A]===0&&(i.enableVertexAttribArray(A),I[A]=1),k[A]!==L&&(i.vertexAttribDivisor(A,L),k[A]=L)}function S(){const A=r.newAttributes,L=r.enabledAttributes;for(let U=0,I=L.length;U<I;U++)L[U]!==A[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function T(A,L,U,I,k,H,W){W===!0?i.vertexAttribIPointer(A,L,U,k,H):i.vertexAttribPointer(A,L,U,I,k,H)}function R(A,L,U,I){v();const k=I.attributes,H=U.getAttributes(),W=L.defaultAttributeValues;for(const it in H){const Y=H[it];if(Y.location>=0){let tt=k[it];if(tt===void 0&&(it==="instanceMatrix"&&A.instanceMatrix&&(tt=A.instanceMatrix),it==="instanceColor"&&A.instanceColor&&(tt=A.instanceColor)),tt!==void 0){const at=tt.normalized,Mt=tt.itemSize,Lt=t.get(tt);if(Lt===void 0)continue;const Q=Lt.buffer,_t=Lt.type,bt=Lt.bytesPerElement,Nt=_t===i.INT||_t===i.UNSIGNED_INT||tt.gpuType===jo;if(tt.isInterleavedBufferAttribute){const St=tt.data,Jt=St.isInterleavedBuffer===!0?St.stride:St.itemSize,Oe=tt.offset;if(St.isInstancedInterleavedBuffer||St.isInstancedBufferAttribute){for(let kt=0;kt<Y.locationSize;kt++)f(Y.location+kt,St.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let kt=0;kt<Y.locationSize;kt++)u(Y.location+kt);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let kt=0;kt<Y.locationSize;kt++)T(Y.location+kt,Mt/Y.locationSize,_t,at,Jt*bt,(Oe+Mt/Y.locationSize*kt)*bt,Nt)}else{if(tt.isInstancedBufferAttribute){for(let St=0;St<Y.locationSize;St++)f(Y.location+St,tt.meshPerAttribute);A.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let St=0;St<Y.locationSize;St++)u(Y.location+St);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let St=0;St<Y.locationSize;St++)T(Y.location+St,Mt/Y.locationSize,_t,at,Mt*bt,Mt/Y.locationSize*St*bt,Nt)}}else if(W!==void 0){const at=W[it];if(at!==void 0)switch(at.length){case 2:i.vertexAttrib2fv(Y.location,at);break;case 3:i.vertexAttrib3fv(Y.location,at);break;case 4:i.vertexAttrib4fv(Y.location,at);break;default:i.vertexAttrib1fv(Y.location,at)}}}}S()}function y(){w();for(const A in n){const L=n[A];for(const U in L){const I=L[U];for(const k in I){const H=I[k];for(const W in H)h(H[W].object),delete H[W];delete I[k]}}delete n[A]}}function _(A){if(n[A.id]===void 0)return;const L=n[A.id];for(const U in L){const I=L[U];for(const k in I){const H=I[k];for(const W in H)h(H[W].object),delete H[W];delete I[k]}}delete n[A.id]}function d(A){for(const L in n){const U=n[L];for(const I in U){const k=U[I];if(k[A.id]===void 0)continue;const H=k[A.id];for(const W in H)h(H[W].object),delete H[W];delete k[A.id]}}}function M(A){for(const L in n){const U=n[L],I=A.isInstancedMesh===!0?A.id:0,k=U[I];if(k!==void 0){for(const H in k){const W=k[H];for(const it in W)h(W[it].object),delete W[it];delete k[H]}delete U[I],Object.keys(U).length===0&&delete n[L]}}}function w(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:E,dispose:y,releaseStatesOfGeometry:_,releaseStatesOfObject:M,releaseStatesOfProgram:d,initAttributes:v,enableAttribute:u,disableUnusedAttributes:S}}function bm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let p=0;for(let m=0;m<h;m++)p+=l[m];e.update(p,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Em(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const d=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(d){return!(d!==jn&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(d){const M=d===ni&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(d!==Rn&&d!==Hn&&!M&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Kt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.logarithmicDepthBuffer===!0&&g===!1;e.reversedDepthBuffer===!0&&g===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&g===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),R=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),_=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:g,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:u,maxAttributes:f,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:R,maxSamples:y,samples:_}}function wm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new fi,a=new ie,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,p){const m=g.length!==0||p||n!==0||s;return s=p,n=g.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,p){e=h(g,p,0)},this.setState=function(g,p,m){const x=g.clippingPlanes,v=g.clipIntersection,u=g.clipShadows,f=i.get(g);if(!s||x===null||x.length===0||r&&!u)r?h(null):l();else{const S=r?0:n,T=S*4;let R=f.clippingState||null;c.value=R,R=h(x,p,T,m);for(let y=0;y!==T;++y)R[y]=e[y];f.clippingState=R,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(g,p,m,x){const v=g!==null?g.length:0;let u=null;if(v!==0){if(u=c.value,x!==!0||u===null){const f=m+v*4,S=p.matrixWorldInverse;a.getNormalMatrix(S),(u===null||u.length<f)&&(u=new Float32Array(f));for(let T=0,R=m;T!==v;++T,R+=4)o.copy(g[T]).applyMatrix4(S,a),o.normal.toArray(u,R),u[R+3]=o.constant}c.value=u,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,u}}class fa extends ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ll(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new on(5,5,5),r=new Wi({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:hs});r.uniforms.tEquirect.value=e;const o=new Te(s,r),a=e.minFilter;return e.minFilter===Ai&&(e.minFilter=yn),new Zo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Ic=256,Tm=3,Am=20,_h=256,xh=16,Rm=3,Cm=new O,Pm=new oe;class Sr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Zo(1,10,null),this._boxMesh=new Te(new on(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Cm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,p=c.autoClearColor,m=c.autoClearDepth,x=c.autoClearStencil,v=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,v===null&&(t.background=c.getClearColor(Pm));const u=new Zo(n,s,h);return u.position.copy(a),u.update(c,t),c.autoClear=g,c.autoClearColor=p,c.autoClearDepth=m,c.autoClearStencil=x,t.background=v,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Ic,Gu(t))}_fromTexture(t,e){t.mapping===fs||t.mapping===Os?this._setSize(t.image.length===0?Ic:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Nc(t,!1,!1),n=Math.log2(t)-Tm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Nc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===fs||t.mapping===Os?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Uc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Lm(),this._integrationMaterial=Dm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/xh);for(let o=0;o<=n;o++){const a=Sr.lodToRoughness(o,n);if(o>n-Rm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(_h*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Im());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Nc(i,t,e){return new fa(i,{minFilter:Ai,generateMipmaps:t,type:ni,colorSpace:_r,depthBuffer:e})}function yr(i,t,e){return new Wi({name:i,uniforms:t,vertexShader:le.cube_vert,fragmentShader:e,side:bn,blending:hs,depthTest:!1,depthWrite:!1})}function Lm(){return yr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${_h}u

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
	`)}function Dm(){return yr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xh}},`

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
	`)}function Im(){return yr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Am}
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
	`)}function Uc(){return yr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Fc(){return yr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Nm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(p,m=!1){return p==null?null:m?o(p):r(p)}function r(p){if(p&&p.isTexture){const m=p.mapping;if(m===Qr||m===jr)if(t.has(p)){const x=t.get(p).texture;return a(x,p.mapping)}else{const x=p.image;if(x&&x.height>0){const v=new fa(x.height);return v.fromEquirectangularTexture(i,p),t.set(p,v),p.addEventListener("dispose",l),a(v.texture,p.mapping)}else return null}}return p}function o(p){if(p&&p.isTexture&&p.isPMREMTexture!==!0){const m=p.mapping,x=m===Qr||m===jr,v=m===fs||m===Os;if(x||v){let u=e.get(p);const f=u!==void 0?u.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==f)return n===null&&(n=new Sr(i)),u=x?n.fromEquirectangular(p,u):n.fromCubemap(p,u),u.texture.pmremVersion=p.pmremVersion,e.set(p,u),u.texture;if(u!==void 0)return u.texture;{const S=p.image;return x&&S&&S.height>0||v&&S&&c(S)?(n===null&&(n=new Sr(i)),u=x?n.fromEquirectangular(p):n.fromCubemap(p),u.texture.pmremVersion=p.pmremVersion,e.set(p,u),p.addEventListener("dispose",h),u.texture):null}}}return p}function a(p,m){return m===Qr?p.mapping=fs:m===jr&&(p.mapping=Os),p}function c(p){let m=0;const x=6;for(let v=0;v<x;v++)p[v]!==void 0&&m++;return m===x}function l(p){const m=p.target;m.removeEventListener("dispose",l);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(p){const m=p.target;m.removeEventListener("dispose",h);const x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function Um(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&cr("WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&t.remove(x.index);for(const u in x.attributes)t.remove(x.attributes[u]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);const v=r.get(x);v&&(t.remove(v),r.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,e.memory.geometries--}function l(x,v){return s[v.id]!==void 0||(v.addEventListener("dispose",a),s[v.id]=new WeakRef(v),o.register(v,v.id,v),e.memory.geometries++),v}function h(x){const v=x.attributes;for(const u in v)t.update(v[u],i.ARRAY_BUFFER)}function g(x){const v=x.index,u=x.attributes.position;let f=0;if(u===void 0)return;const S=v!==null?v.array.length:u.array.length/3-1,T=u.count>=65535?Tl:wl,R=new T(Math.ceil(S/3)*6,1),y=R.array;if(v!==null){const d=v.array;f=v.version;for(let M=0,w=0;M<S;M+=3){const E=d[M+0],A=d[M+1],L=d[M+2];y[w++]=E,y[w++]=A,y[w++]=A,y[w++]=L,y[w++]=L,y[w++]=E}}else{f=u.version;for(let d=0,M=0;d<S;d+=3){const w=d+0,E=d+1,A=d+2;y[M++]=w,y[M++]=E,y[M++]=E,y[M++]=A,y[M++]=A,y[M++]=w}}R.version=f;const _=r.get(x);_&&t.remove(_),r.set(x,R)}function p(x){const v=r.get(x);if(v){const u=x.index;u!==null&&v.version<u.version&&g(x)}else g(x);return r.get(x)}function m(){for(const x in s){const v=s[x].deref();v!==void 0&&c(v)}}return{get:l,update:h,getWireframeAttribute:p,dispose:m}}function Om(i,t,e){let n;function s(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function c(g,p){i.drawElements(n,p,r,g*o),e.update(p,n,1)}function l(g,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,g*o,m),e.update(p,n,m))}function h(g,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,g,0,m);let v=0;for(let u=0;u<m;u++)v+=p[u];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Bm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:we("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,t,e){const n=new WeakMap,s=new Ye;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,g=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==g){let w=function(){d.dispose(),n.delete(a),a.removeEventListener("dispose",w)};p!==void 0&&p.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let T=0;m===!0&&(T=1),x===!0&&(T=2),v===!0&&(T=3);let R=a.attributes.position.count*T,y=1;R>t.maxTextureSize&&(y=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const _=new Float32Array(R*y*4*g),d=new El(_,R,y,g);d.type=Hn,d.needsUpdate=!0;const M=T*4;for(let E=0;E<g;E++){const A=u[E],L=f[E],U=S[E],I=R*y*4*E;for(let k=0;k<A.count;k++){const H=k*M;m===!0&&(s.fromBufferAttribute(A,k),_[I+H+0]=s.x,_[I+H+1]=s.y,_[I+H+2]=s.z,_[I+H+3]=0),x===!0&&(s.fromBufferAttribute(L,k),_[I+H+4]=s.x,_[I+H+5]=s.y,_[I+H+6]=s.z,_[I+H+7]=0),v===!0&&(s.fromBufferAttribute(U,k),_[I+H+8]=s.x,_[I+H+9]=s.y,_[I+H+10]=s.z,_[I+H+11]=U.itemSize===4?s.w:1)}}p={count:g,texture:d,size:new Ft(R,y)},n.set(a,p),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let v=0;v<l.length;v++)m+=l[v];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Gm(i,t,e,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,g=l.geometry,p=t.get(l,g);if(r.get(p)!==h&&(t.update(p),r.set(p,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return p}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const km={[rl]:"LINEAR_TONE_MAPPING",[ol]:"REINHARD_TONE_MAPPING",[al]:"CINEON_TONE_MAPPING",[Qo]:"ACES_FILMIC_TONE_MAPPING",[cl]:"AGX_TONE_MAPPING",[ul]:"NEUTRAL_TONE_MAPPING",[ll]:"CUSTOM_TONE_MAPPING"};function Hm(i,t,e,n,s,r){const o=new ti(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const h=new an;h.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ne([0,2,0,0,2,0],2));const g=new ah({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new Te(h,g),m=new Gl(-1,1,1,-1,0,1);let x=null,v=null,u=!1,f,S=null,T=[],R=!1;this.setSize=function(y,_){o.setSize(y,_),a!==null&&a.setSize(y,_),c!==null&&c.setSize(y,_);for(let d=0;d<T.length;d++){const M=T[d];M.setSize&&M.setSize(y,_)}},this.setEffects=function(y){T=y,R=T.length>0&&T[0].isRenderPass===!0;const _=o.width,d=o.height;T.length>0&&a===null&&(a=new ti(_,d,{type:ni,depthBuffer:!1,stencilBuffer:!1}),c=new ti(_,d,{type:ni,depthBuffer:!1,stencilBuffer:!1}));const M=s===!0&&T.some(w=>w.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&l===null&&(l=new ps(_,d),r===!0&&(l.format=Ri,l.type=ds)),o.dispose(),o.depthTexture=M?l:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let w=0;w<T.length;w++){const E=T[w];E.setSize&&E.setSize(_,d),M&&E.needsDepthTexture===!0&&E.setDepthTexture&&E.setDepthTexture(l)}},this.begin=function(y,_){if(u||y.toneMapping===gi&&T.length===0)return!1;if(S=_,_!==null){const d=_.width,M=_.height;(o.width!==d||o.height!==M)&&this.setSize(d,M)}return R===!1&&y.setRenderTarget(o),f=y.toneMapping,y.toneMapping=gi,!0},this.hasRenderPass=function(){return R},this.end=function(y,_){y.toneMapping=f,u=!0;let d=o,M=a;for(let w=0;w<T.length;w++){const E=T[w];E.enabled!==!1&&(E.render(y,M,d,_),E.needsSwap!==!1&&(d=M,M=M===a?c:a))}if(x!==y.outputColorSpace||v!==y.toneMapping){x=y.outputColorSpace,v=y.toneMapping,g.defines={},_e.getTransfer(x)===Ie&&(g.defines.SRGB_TRANSFER="");const w=km[v];w&&(g.defines[w]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=d.texture,y.setRenderTarget(S),y.render(p,m),S=null,u=!1},this.isCompositing=function(){return u},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),g.dispose()}}const vh=new pn,Mh=new ps(1,1),Sh=new Dl(1),yh=new El,bh=new Xu,Eh=new Ll,Oc=[],Bc=[],zc=new Float32Array(16),Gc=new Float32Array(9),kc=new Float32Array(4);function Xs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Oc[s];if(r===void 0&&(r=new Float32Array(s),Oc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ln(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function cn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function da(i,t){let e=Bc[t];e===void 0&&(e=new Int32Array(t),Bc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2fv(this.addr,t),cn(e,t)}}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ln(e,t))return;i.uniform3fv(this.addr,t),cn(e,t)}}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4fv(this.addr,t),cn(e,t)}}function qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;kc.set(n),i.uniformMatrix2fv(this.addr,!1,kc),cn(e,n)}}function Zm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;Gc.set(n),i.uniformMatrix3fv(this.addr,!1,Gc),cn(e,n)}}function Km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;zc.set(n),i.uniformMatrix4fv(this.addr,!1,zc),cn(e,n)}}function Jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2iv(this.addr,t),cn(e,t)}}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3iv(this.addr,t),cn(e,t)}}function jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4iv(this.addr,t),cn(e,t)}}function t0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2uiv(this.addr,t),cn(e,t)}}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3uiv(this.addr,t),cn(e,t)}}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4uiv(this.addr,t),cn(e,t)}}function pa(i){return i.version===0&&(i.compareFunction=Ml,i.needsUpdate=!0),i}function s0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=pa(Mh):r=vh,e.setTexture2D(t||r,s)}function r0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bh,s)}function o0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=pa(Sh):r=Eh,e.setTextureCube(t||r,s)}function a0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||yh,s)}function l0(i){switch(i){case 5126:return Vm;case 35664:return Wm;case 35665:return Xm;case 35666:return Ym;case 35674:return qm;case 35675:return Zm;case 35676:return Km;case 5124:case 35670:return Jm;case 35667:case 35671:return $m;case 35668:case 35672:return Qm;case 35669:case 35673:return jm;case 5125:return t0;case 36294:return e0;case 36295:return n0;case 36296:return i0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return a0}}function c0(i,t){i.uniform1fv(this.addr,t)}function u0(i,t){const e=Xs(t,this.size,2);i.uniform2fv(this.addr,e)}function h0(i,t){const e=Xs(t,this.size,3);i.uniform3fv(this.addr,e)}function f0(i,t){const e=Xs(t,this.size,4);i.uniform4fv(this.addr,e)}function d0(i,t){const e=Xs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function p0(i,t){const e=Xs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function m0(i,t){const e=Xs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function g0(i,t){i.uniform1iv(this.addr,t)}function _0(i,t){i.uniform2iv(this.addr,t)}function x0(i,t){i.uniform3iv(this.addr,t)}function v0(i,t){i.uniform4iv(this.addr,t)}function M0(i,t){i.uniform1uiv(this.addr,t)}function S0(i,t){i.uniform2uiv(this.addr,t)}function y0(i,t){i.uniform3uiv(this.addr,t)}function b0(i,t){i.uniform4uiv(this.addr,t)}function E0(i,t,e){const n=this.cache,s=t.length,r=da(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=pa(Mh):o=vh;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function w0(i,t,e){const n=this.cache,s=t.length,r=da(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||bh,r[o])}function T0(i,t,e){const n=this.cache,s=t.length,r=da(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=pa(Sh):o=Eh;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function A0(i,t,e){const n=this.cache,s=t.length,r=da(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||yh,r[o])}function R0(i){switch(i){case 5126:return c0;case 35664:return u0;case 35665:return h0;case 35666:return f0;case 35674:return d0;case 35675:return p0;case 35676:return m0;case 5124:case 35670:return g0;case 35667:case 35671:return _0;case 35668:case 35672:return x0;case 35669:case 35673:return v0;case 5125:return M0;case 36294:return S0;case 36295:return y0;case 36296:return b0;case 35678:case 36198:case 36298:case 36306:case 35682:return E0;case 35679:case 36299:case 36307:return w0;case 35680:case 36300:case 36308:case 36293:return T0;case 36289:case 36303:case 36311:case 36292:return A0}}class C0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=l0(e.type)}}class P0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=R0(e.type)}}class L0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ka=/(\w+)(\])?(\[|\.)?/g;function Hc(i,t){i.seq.push(t),i.map[t.id]=t}function D0(i,t,e){const n=i.name,s=n.length;for(ka.lastIndex=0;;){const r=ka.exec(n),o=ka.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Hc(e,l===void 0?new C0(a,i,t):new P0(a,i,t));break}else{let g=e.map[a];g===void 0&&(g=new L0(a),Hc(e,g)),e=g}}}class io{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);D0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Vc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const I0=37297;let N0=0;function U0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Wc=new ie;function F0(i){_e._getMatrix(Wc,_e.workingColorSpace,i);const t=`mat3( ${Wc.elements.map(e=>e.toFixed(4))} )`;switch(_e.getTransfer(i)){case xr:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Xc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+U0(i.getShaderSource(t),a)}else return r}function O0(i,t){const e=F0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const B0={[rl]:"Linear",[ol]:"Reinhard",[al]:"Cineon",[Qo]:"ACESFilmic",[cl]:"AgX",[ul]:"Neutral",[ll]:"Custom"};function z0(i,t){const e=B0[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zr=new O;function G0(){_e.getLuminanceCoefficients(Zr);const i=Zr.x.toFixed(4),t=Zr.y.toFixed(4),e=Zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function k0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function H0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function V0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ir(i){return i!==""}function Yc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function qc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const W0=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(i){return i.replace(W0,X0)}function X0(i,t){const e=le[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return el(e)}const Y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(i){return i.replace(Y0,q0)}function q0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const Z0={[sr]:"SHADOWMAP_TYPE_PCF",[Is]:"SHADOWMAP_TYPE_VSM"};function K0(i){return Z0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const J0={[Os]:"ENVMAP_MODE_REFRACTION"};function $0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":J0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Q0={[sl]:"ENVMAP_BLENDING_MULTIPLY",[Tu]:"ENVMAP_BLENDING_MIX",[Au]:"ENVMAP_BLENDING_ADD"};function j0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Q0[i.combine]||"ENVMAP_BLENDING_NONE"}function tg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=K0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=$0(e),g=j0(e),p=k0(e),m=H0(r),x=s.createProgram();let v,u,f=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ir).join(`
`),v.length>0&&(v+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(ir).join(`
`),u.length>0&&(u+=`
`)):(v=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),u=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+g:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gi?"#define TONE_MAPPING":"",e.toneMapping!==gi?le.tonemapping_pars_fragment:"",e.toneMapping!==gi?z0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,O0("linearToOutputTexel",e.outputColorSpace),G0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ir).join(`
`)),o=el(o),o=Yc(o,e),o=qc(o,e),a=el(a),a=Yc(a,e),a=qc(a,e),o=Zc(o),a=Zc(a),e.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,v=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,u=["#define varying in",e.glslVersion===qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=f+v+o,T=f+u+a,R=Vc(s,s.VERTEX_SHADER,S),y=Vc(s,s.FRAGMENT_SHADER,T);s.attachShader(x,R),s.attachShader(x,y),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function _(E){if(i.debug.checkShaderErrors){const A=s.getProgramInfoLog(x)||"",L=s.getShaderInfoLog(R)||"",U=s.getShaderInfoLog(y)||"",I=A.trim(),k=L.trim(),H=U.trim();let W=!0,it=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,R,y);else{const Y=Xc(s,R,"vertex"),tt=Xc(s,y,"fragment");we("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+I+`
`+Y+`
`+tt)}else I!==""?Kt("WebGLProgram: Program Info Log:",I):(k===""||H==="")&&(it=!1);it&&(E.diagnostics={runnable:W,programLog:I,vertexShader:{log:k,prefix:v},fragmentShader:{log:H,prefix:u}})}s.deleteShader(R),s.deleteShader(y),d=new io(s,x),M=V0(s,x)}let d;this.getUniforms=function(){return d===void 0&&_(this),d};let M;this.getAttributes=function(){return M===void 0&&_(this),M};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(x,I0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=N0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=y,this}let eg=0;class ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ig(t),e.set(t,n)),n}}class ig{constructor(t){this.id=eg++,this.code=t,this.usedTimes=0}}function sg(i){return i===Vi||i===mr||i===gr}function rg(i,t,e,n,s,r){const o=new aa,a=new ng,c=new Set,l=[],h=new Map,g=n.logarithmicDepthBuffer,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(d){return c.add(d),d===0?"uv":`uv${d}`}function x(d,M,w,E,A,L){const U=E.fog,I=A.geometry,k=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?E.environment:null,H=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,W=t.get(d.envMap||k,H),it=p[d.type];let Y=n.precision;d.precision!==null&&(Y=n.getMaxPrecision(d.precision),Y!==d.precision&&Kt("WebGLProgram.getParameters:",d.precision,"not supported, using",Y,"instead."));const tt=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,at=tt!==void 0?tt.length:0;let Mt=0;I.morphAttributes.position!==void 0&&(Mt=1),I.morphAttributes.normal!==void 0&&(Mt=2),I.morphAttributes.color!==void 0&&(Mt=3);let Lt,Q,_t,bt;if(it){const xt=$n[it];Lt=xt.vertexShader,Q=xt.fragmentShader}else{Lt=d.vertexShader,Q=d.fragmentShader;const xt=a.getVertexShaderStage(d),ee=a.getFragmentShaderStage(d);a.update(d,xt,ee),_t=xt.id,bt=ee.id}const Nt=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),Jt=A.isInstancedMesh===!0,Oe=A.isBatchedMesh===!0,kt=!!d.map,st=!!d.matcap,Ht=!!W,se=Ht&&W.isPMREMTexture===!0,At=!!d.aoMap,Gt=!!d.lightMap,ce=!!d.bumpMap&&d.wireframe===!1,$t=!!d.normalMap,Se=!!d.displacementMap,Ae=!!d.emissiveMap,ze=!!d.metalnessMap,Ge=!!d.roughnessMap,Ke=d.anisotropy>0,z=d.clearcoat>0,me=d.diffuseRoughness>0,ve=d.dispersion>0,be=d.retroreflectivity>0,wt=d.iridescence>0,De=d.sheen>0,Yt=d.transmission>0,Qt=Ke&&!!d.anisotropyMap,N=z&&!!d.clearcoatMap,C=z&&!!d.clearcoatNormalMap,q=z&&!!d.clearcoatRoughnessMap,pt=me&&!!d.diffuseRoughnessMap,lt=wt&&!!d.iridescenceMap,ct=wt&&!!d.iridescenceThicknessMap,Rt=De&&!!d.sheenColorMap,rt=De&&!!d.sheenRoughnessMap,ot=!!d.specularMap,Tt=!!d.specularColorMap,B=!!d.specularIntensityMap,K=Yt&&!!d.transmissionMap,nt=Yt&&!!d.thicknessMap,yt=!!d.gradientMap,dt=!!d.alphaMap,vt=d.alphaTest>0,Vt=!!d.alphaHash,jt=!!d.extensions;let ht=gi;d.toneMapped&&(Nt===null||Nt.isXRRenderTarget===!0)&&(ht=i.toneMapping);const Wt=se?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,te={shaderID:it,shaderType:d.type,shaderName:d.name,vertexShader:Lt,fragmentShader:Q,defines:d.defines,customVertexShaderID:_t,customFragmentShaderID:bt,isRawShaderMaterial:d.isRawShaderMaterial===!0,glslVersion:d.glslVersion,precision:Y,batching:Oe,batchingColor:Oe&&A._colorsTexture!==null,instancing:Jt,instancingColor:Jt&&A.instanceColor!==null,instancingMorph:Jt&&A.morphTexture!==null,outputColorSpace:Nt===null?i.outputColorSpace:Nt.isXRRenderTarget===!0?Nt.texture.colorSpace:_e.workingColorSpace,alphaToCoverage:!!d.alphaToCoverage,map:kt,matcap:st,envMap:Ht,envMapMode:Ht&&W.mapping,envMapPMREM:se,envMapMaxLod:se?Wt.length-1:null,envMapSize:se?Wt[0].width:null,aoMap:At,lightMap:Gt,bumpMap:ce,normalMap:$t,displacementMap:Se,emissiveMap:Ae,normalMapObjectSpace:$t&&d.normalMapType===Pu,normalMapTangentSpace:$t&&d.normalMapType===Wo,packedNormalMap:$t&&d.normalMapType===Wo&&sg(d.normalMap.format),metalnessMap:ze,roughnessMap:Ge,anisotropy:Ke,anisotropyMap:Qt,clearcoat:z,clearcoatMap:N,clearcoatNormalMap:C,clearcoatRoughnessMap:q,diffuseRoughness:me,diffuseRoughnessMap:pt,dispersion:ve,retroreflection:be,iridescence:wt,iridescenceMap:lt,iridescenceThicknessMap:ct,sheen:De,sheenColorMap:Rt,sheenRoughnessMap:rt,specularMap:ot,specularColorMap:Tt,specularIntensityMap:B,transmission:Yt,transmissionMap:K,thicknessMap:nt,gradientMap:yt,opaque:d.transparent===!1&&d.blending===Ns&&d.alphaToCoverage===!1,alphaMap:dt,alphaTest:vt,alphaHash:Vt,combine:d.combine,mapUv:kt&&m(d.map.channel),aoMapUv:At&&m(d.aoMap.channel),lightMapUv:Gt&&m(d.lightMap.channel),bumpMapUv:ce&&m(d.bumpMap.channel),normalMapUv:$t&&m(d.normalMap.channel),displacementMapUv:Se&&m(d.displacementMap.channel),emissiveMapUv:Ae&&m(d.emissiveMap.channel),metalnessMapUv:ze&&m(d.metalnessMap.channel),roughnessMapUv:Ge&&m(d.roughnessMap.channel),anisotropyMapUv:Qt&&m(d.anisotropyMap.channel),clearcoatMapUv:N&&m(d.clearcoatMap.channel),clearcoatNormalMapUv:C&&m(d.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&m(d.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:pt&&m(d.diffuseRoughnessMap.channel),iridescenceMapUv:lt&&m(d.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&m(d.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&m(d.sheenColorMap.channel),sheenRoughnessMapUv:rt&&m(d.sheenRoughnessMap.channel),specularMapUv:ot&&m(d.specularMap.channel),specularColorMapUv:Tt&&m(d.specularColorMap.channel),specularIntensityMapUv:B&&m(d.specularIntensityMap.channel),transmissionMapUv:K&&m(d.transmissionMap.channel),thicknessMapUv:nt&&m(d.thicknessMap.channel),alphaMapUv:dt&&m(d.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&($t||Ke),vertexNormals:!!I.attributes.normal,vertexColors:d.vertexColors,vertexAlphas:d.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:A.isPoints===!0&&!!I.attributes.uv&&(kt||dt),fog:!!U,useFog:d.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:d.wireframe===!1&&(d.flatShading===!0||I.attributes.normal===void 0&&$t===!1&&(d.isMeshLambertMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isMeshPhysicalMaterial)),sizeAttenuation:d.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:St,skinning:A.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:Mt,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:L.filter(xt=>xt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:d.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:ht,decodeVideoTexture:kt&&d.map.isVideoTexture===!0&&_e.getTransfer(d.map.colorSpace)===Ie,decodeVideoTextureEmissive:Ae&&d.emissiveMap.isVideoTexture===!0&&_e.getTransfer(d.emissiveMap.colorSpace)===Ie,premultipliedAlpha:d.premultipliedAlpha,doubleSided:d.side===_n,flipSided:d.side===bn,useDepthPacking:d.depthPacking>=0,depthPacking:d.depthPacking||0,index0AttributeName:d.index0AttributeName,extensionClipCullDistance:jt&&d.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&d.extensions.multiDraw===!0||Oe)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:d.customProgramCacheKey()};return te.vertexUv1s=c.has(1),te.vertexUv2s=c.has(2),te.vertexUv3s=c.has(3),c.clear(),te}function v(d){const M=[];if(d.shaderID?M.push(d.shaderID):(M.push(d.customVertexShaderID),M.push(d.customFragmentShaderID)),d.defines!==void 0)for(const w in d.defines)M.push(w),M.push(d.defines[w]);return d.isRawShaderMaterial===!1&&(u(M,d),f(M,d),M.push(i.outputColorSpace)),M.push(d.customProgramCacheKey),M.join()}function u(d,M){d.push(M.precision),d.push(M.outputColorSpace),d.push(M.envMapMode),d.push(M.envMapPMREM),d.push(M.envMapMaxLod),d.push(M.envMapSize),d.push(M.mapUv),d.push(M.alphaMapUv),d.push(M.lightMapUv),d.push(M.aoMapUv),d.push(M.bumpMapUv),d.push(M.normalMapUv),d.push(M.displacementMapUv),d.push(M.emissiveMapUv),d.push(M.metalnessMapUv),d.push(M.roughnessMapUv),d.push(M.anisotropyMapUv),d.push(M.clearcoatMapUv),d.push(M.clearcoatNormalMapUv),d.push(M.clearcoatRoughnessMapUv),d.push(M.diffuseRoughnessMapUv),d.push(M.iridescenceMapUv),d.push(M.iridescenceThicknessMapUv),d.push(M.sheenColorMapUv),d.push(M.sheenRoughnessMapUv),d.push(M.specularMapUv),d.push(M.specularColorMapUv),d.push(M.specularIntensityMapUv),d.push(M.transmissionMapUv),d.push(M.thicknessMapUv),d.push(M.combine),d.push(M.fogExp2),d.push(M.sizeAttenuation),d.push(M.morphTargetsCount),d.push(M.numSunLights),d.push(M.numDirLights),d.push(M.numPointLights),d.push(M.numSpotLights),d.push(M.numSpotLightMaps),d.push(M.numHemiLights),d.push(M.numRectAreaLights),d.push(M.numSunLightShadows),d.push(M.numDirLightShadows),d.push(M.numPointLightShadows),d.push(M.numSpotLightShadows),d.push(M.numSpotLightShadowsWithMaps),d.push(M.numLightProbes),d.push(M.numLightProbeGrids),d.push(M.shadowMapType),d.push(M.toneMapping),d.push(M.numClippingPlanes),d.push(M.numClipIntersection),d.push(M.depthPacking)}function f(d,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),d.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),d.push(o.mask)}function S(d){const M=p[d.type];let w;if(M){const E=$n[M];w=oh.clone(E.uniforms)}else w=d.uniforms;return w}function T(d,M){let w=h.get(M);return w!==void 0?++w.usedTimes:(w=new tg(i,M,d,s),l.push(w),h.set(M,w)),w}function R(d){if(--d.usedTimes===0){const M=l.indexOf(d);l[M]=l[l.length-1],l.pop(),h.delete(d.cacheKey),d.destroy()}}function y(d){a.remove(d)}function _(){a.dispose()}return{getParameters:x,getProgramCacheKey:v,getUniforms:S,acquireProgram:T,releaseProgram:R,releaseShaderCache:y,programs:l,dispose:_}}function og(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ag(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Jc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $c(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p){let m=0;return p.isInstancedMesh&&(m+=2),p.isSkinnedMesh&&(m+=1),m}function a(p,m,x,v,u,f){let S=i[t];return S===void 0?(S={id:p.id,object:p,geometry:m,material:x,materialVariant:o(p),groupOrder:v,renderOrder:p.renderOrder,z:u,group:f},i[t]=S):(S.id=p.id,S.object=p,S.geometry=m,S.material=x,S.materialVariant=o(p),S.groupOrder=v,S.renderOrder=p.renderOrder,S.z=u,S.group=f),t++,S}function c(p,m,x,v,u,f,S){S.reversedDepth===!0&&(u=-u);const T=a(p,m,x,v,u,f);x.transmission>0?n.push(T):x.transparent===!0?s.push(T):e.push(T)}function l(p,m,x,v,u,f){const S=a(p,m,x,v,u,f);x.transmission>0?n.unshift(S):x.transparent===!0?s.unshift(S):e.unshift(S)}function h(p,m){e.length>1&&e.sort(p||ag),n.length>1&&n.sort(m||Jc),s.length>1&&s.sort(m||Jc)}function g(){for(let p=t,m=i.length;p<m;p++){const x=i[p];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:h}}function lg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new $c,i.set(n,[o])):s>=r.length?(o=new $c,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function cg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new oe};break;case"SpotLight":e={position:new O,direction:new O,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new oe,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":e={color:new oe,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function ug(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let hg=0;function fg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function dg(i){const t=new cg,e=ug(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);const s=new O,r=new xe,o=new xe;function a(l){let h=0,g=0,p=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let m=0,x=0,v=0,u=0,f=0,S=0,T=0,R=0,y=0,_=0,d=0,M=0,w=0,E=0;l.sort(fg);for(let L=0,U=l.length;L<U;L++){const I=l[L],k=I.color,H=I.intensity,W=I.distance;let it=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Vi?it=I.shadow.map.texture:it=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=k.r*H,g+=k.g*H,p+=k.b*H;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],H);E++}else if(I.isSunLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const tt=I.shadow,at=e.get(I);at.shadowIntensity=tt.intensity,at.shadowBias=tt.bias,at.shadowNormalBias=tt.normalBias,at.shadowRadius=tt.radius,at.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[x]=at,n.sunShadowMap[x]=it;const Mt=tt.getViewportCount();for(let Lt=0;Lt<Mt;Lt++)n.sunShadowMatrix[v+Lt]=tt.getMatrix(Lt),n.sunShadowCascade[v+Lt]=tt._cascadeData[Lt];v+=Mt,x++}n.sun[m]=Y,m++}else if(I.isDirectionalLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const tt=I.shadow,at=e.get(I);at.shadowIntensity=tt.intensity,at.shadowBias=tt.bias,at.shadowNormalBias=tt.normalBias,at.shadowRadius=tt.radius,at.shadowMapSize=tt.mapSize,n.directionalShadow[u]=at,n.directionalShadowMap[u]=it,n.directionalShadowMatrix[u]=I.shadow.matrix,y++}n.directional[u]=Y,u++}else if(I.isSpotLight){const Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(k).multiplyScalar(H),Y.distance=W,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[S]=Y;const tt=I.shadow;if(I.map&&(n.spotLightMap[M]=I.map,M++,tt.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[S]=tt.matrix,I.castShadow){const at=e.get(I);at.shadowIntensity=tt.intensity,at.shadowBias=tt.bias,at.shadowNormalBias=tt.normalBias,at.shadowRadius=tt.radius,at.shadowMapSize=tt.mapSize,n.spotShadow[S]=at,n.spotShadowMap[S]=it,d++}S++}else if(I.isRectAreaLight){const Y=t.get(I);Y.color.copy(k).multiplyScalar(H),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=Y,T++}else if(I.isPointLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const tt=I.shadow,at=e.get(I);at.shadowIntensity=tt.intensity,at.shadowBias=tt.bias,at.shadowNormalBias=tt.normalBias,at.shadowRadius=tt.radius,at.shadowMapSize=tt.mapSize,at.shadowCameraNear=tt.camera.near,at.shadowCameraFar=tt.camera.far,n.pointShadow[f]=at,n.pointShadowMap[f]=it,n.pointShadowMatrix[f]=I.shadow.matrix,_++}n.point[f]=Y,f++}else if(I.isHemisphereLight){const Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(H),Y.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[R]=Y,R++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=g,n.ambient[2]=p;const A=n.hash;(A.sunLength!==m||A.directionalLength!==u||A.pointLength!==f||A.spotLength!==S||A.rectAreaLength!==T||A.hemiLength!==R||A.numSunShadows!==x||A.numDirectionalShadows!==y||A.numPointShadows!==_||A.numSpotShadows!==d||A.numSpotMaps!==M||A.numLightProbes!==E)&&(n.sun.length=m,n.directional.length=u,n.spot.length=S,n.rectArea.length=T,n.point.length=f,n.hemi.length=R,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.pointShadowMatrix.length=_,n.spotShadow.length=d,n.spotShadowMap.length=d,n.spotLightMatrix.length=d+M-w,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=E,A.sunLength=m,A.directionalLength=u,A.pointLength=f,A.spotLength=S,A.rectAreaLength=T,A.hemiLength=R,A.numSunShadows=x,A.numDirectionalShadows=y,A.numPointShadows=_,A.numSpotShadows=d,A.numSpotMaps=M,A.numLightProbes=E,n.version=hg++)}function c(l,h){let g=0,p=0,m=0,x=0,v=0,u=0;const f=h.matrixWorldInverse;for(let S=0,T=l.length;S<T;S++){const R=l[S];if(R.isSunLight){const y=n.sun[g];y.direction.setFromMatrixPosition(R.matrixWorld),y.direction.transformDirection(f),g++}else if(R.isDirectionalLight){const y=n.directional[p];y.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),p++}else if(R.isSpotLight){const y=n.spot[x];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),x++}else if(R.isRectAreaLight){const y=n.rectArea[v];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(f),o.identity(),r.copy(R.matrixWorld),r.premultiply(f),o.extractRotation(r),y.halfWidth.set(R.width*.5,0,0),y.halfHeight.set(0,R.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),v++}else if(R.isPointLight){const y=n.point[m];y.position.setFromMatrixPosition(R.matrixWorld),y.position.applyMatrix4(f),m++}else if(R.isHemisphereLight){const y=n.hemi[u];y.direction.setFromMatrixPosition(R.matrixWorld),y.direction.transformDirection(f),u++}}}return{setup:a,setupView:c,state:n}}function Qc(i){const t=new dg(i),e=[],n=[],s=[];function r(g){h.camera=g,e.length=0,n.length=0,s.length=0}function o(g){g.isLightProbeGrid?s.push(g):e.push(g)}function a(g){n.push(g)}function c(){t.setup(e),s.sort((g,p)=>g.priority-p.priority||g.id-p.id)}function l(g){t.setupView(e,g)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function pg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Qc(i),t.set(s,[a])):r>=o.length?(a=new Qc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gg=`uniform sampler2D shadow_pass;
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
}`,_g=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],xg=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],jc=new xe,tr=new O,Ha=new O;function vg(i,t,e){let n=new Gs;const s=new Ft,r=new Ft,o=new Ye,a=new lh,c=new ch,l={},h=e.maxTextureSize,g={[Hi]:bn,[bn]:Hi,[_n]:_n},p=new Wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:mg,fragmentShader:gg}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const x=new an;x.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Te(x,p),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let f=this.type;this.render=function(_,d,M){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||_.length===0)return;this.type===au&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=sr);const w=i.getRenderTarget(),E=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),L=i.state;L.setBlending(hs),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=f!==this.type;U&&d.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=_.length;I<k;I++){const H=_[I],W=H.shadow;if(W===void 0){Kt("WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const it=W.getFrameExtents();s.multiply(it),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,W.mapSize.y=r.y));const Y=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=Y,W.map===null||U===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Is){if(H.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new ti(s.x,s.y,{format:Vi,type:ni,minFilter:yn,magFilter:yn,generateMipmaps:!1}),W.map.texture.name=H.name+".shadowMap",W.map.depthTexture=new ps(s.x,s.y,Hn),W.map.depthTexture.name=H.name+".shadowMapDepth",W.map.depthTexture.format=Li,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=hn,W.map.depthTexture.magFilter=hn}else H.isPointLight?(W.map=new fa(s.x),W.map.depthTexture=new Dl(s.x,ei)):(W.map=new ti(s.x,s.y),W.map.depthTexture=new ps(s.x,s.y,ei)),W.map.depthTexture.name=H.name+".shadowMap",W.map.depthTexture.format=Li,this.type===sr?(W.map.depthTexture.compareFunction=Y?vl:xl,W.map.depthTexture.minFilter=yn,W.map.depthTexture.magFilter=yn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=hn,W.map.depthTexture.magFilter=hn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const tt=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();H.isPointLight!==!0&&W.updateMatrices(H,M);const at=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:M.layers;for(let Mt=0;Mt<tt;Mt++){const Lt=W.getCamera(Mt);if(H.isPointLight){const Q=W.camera,_t=W.matrix,bt=H.distance||Q.far;bt!==Q.far&&(Q.far=bt,Q.updateProjectionMatrix()),tr.setFromMatrixPosition(H.matrixWorld),Q.position.copy(tr),Ha.copy(Q.position),Ha.add(_g[Mt]),Q.up.copy(xg[Mt]),Q.lookAt(Ha),Q.updateMatrixWorld(),_t.makeTranslation(-tr.x,-tr.y,-tr.z),jc.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),W._frustum.setFromProjectionMatrix(jc,Q.coordinateSystem,Q.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,Mt),i.clear();else{Mt===0&&(i.setRenderTarget(W.map),i.clear());const Q=W.getViewport(Mt);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),L.viewport(o)}n=W.getFrustum(Mt),R(d,M,Lt,H,at,this.type)}W.isPointLightShadow!==!0&&this.type===Is&&S(W,M),W.needsUpdate=!1}f=this.type,u.needsUpdate=!1,i.setRenderTarget(w,E,A)};function S(_,d){const M=t.update(v);p.defines.VSM_SAMPLES!==_.blurSamples&&(p.defines.VSM_SAMPLES=_.blurSamples,m.defines.VSM_SAMPLES=_.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),_.mapPass===null?_.mapPass=new ti(s.x,s.y,{format:Vi,type:ni}):(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)&&_.mapPass.setSize(_.map.width,_.map.height),p.uniforms.shadow_pass.value=_.map.depthTexture,p.uniforms.resolution.value.set(_.map.width,_.map.height),p.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(d,null,M,p,v,null),m.uniforms.shadow_pass.value=_.mapPass.texture,m.uniforms.resolution.value.set(_.map.width,_.map.height),m.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(d,null,M,m,v,null)}function T(_,d,M,w){let E=null;const A=M.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(A!==void 0)E=A;else if(E=M.isPointLight===!0?c:a,i.localClippingEnabled&&d.clipShadows===!0&&Array.isArray(d.clippingPlanes)&&d.clippingPlanes.length!==0||d.displacementMap&&d.displacementScale!==0||d.alphaMap&&d.alphaTest>0||d.map&&d.alphaTest>0||d.alphaToCoverage===!0){const L=E.uuid,U=d.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let k=I[U];k===void 0&&(k=E.clone(),I[U]=k,d.addEventListener("dispose",y)),E=k}if(E.visible=d.visible,E.wireframe=d.wireframe,w===Is?E.side=d.shadowSide!==null?d.shadowSide:d.side:E.side=d.shadowSide!==null?d.shadowSide:g[d.side],E.alphaMap=d.alphaMap,E.alphaTest=d.alphaToCoverage===!0?.5:d.alphaTest,E.map=d.map,E.clipShadows=d.clipShadows,E.clippingPlanes=d.clippingPlanes,E.clipIntersection=d.clipIntersection,E.displacementMap=d.displacementMap,E.displacementScale=d.displacementScale,E.displacementBias=d.displacementBias,E.wireframeLinewidth=d.wireframeLinewidth,E.linewidth=d.linewidth,M.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const L=i.properties.get(E);L.light=M}return E}function R(_,d,M,w,E,A){if(_.visible===!1)return;if(_.layers.test(E)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&A===Is)&&(!_.frustumCulled||_.intersectsFrustum(n))){_.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,_.matrixWorld);const I=t.update(_),k=_.material;if(Array.isArray(k)){const H=I.groups;for(let W=0,it=H.length;W<it;W++){const Y=H[W],tt=k[Y.materialIndex];if(tt&&tt.visible){const at=T(_,tt,w,A);_.onBeforeShadow(i,_,d,M,I,at,Y),i.renderBufferDirect(M,null,I,at,_,Y),_.onAfterShadow(i,_,d,M,I,at,Y)}}}else if(k.visible){const H=T(_,k,w,A);_.onBeforeShadow(i,_,d,M,I,H,null),i.renderBufferDirect(M,null,I,H,_,null),_.onAfterShadow(i,_,d,M,I,H,null)}}const U=_.children;for(let I=0,k=U.length;I<k;I++)R(U[I],d,M,w,E,A)}function y(_){_.target.removeEventListener("dispose",y);for(const M in l){const w=l[M],E=_.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}function Mg(i,t){function e(){let B=!1;const K=new Ye;let nt=null;const yt=new Ye(0,0,0,0);return{setMask:function(dt){nt!==dt&&!B&&(i.colorMask(dt,dt,dt,dt),nt=dt)},setLocked:function(dt){B=dt},setClear:function(dt,vt,Vt,jt,ht){ht===!0&&(dt*=jt,vt*=jt,Vt*=jt),K.set(dt,vt,Vt,jt),yt.equals(K)===!1&&(i.clearColor(dt,vt,Vt,jt),yt.copy(K))},reset:function(){B=!1,nt=null,yt.set(-1,0,0,0)}}}function n(){let B=!1,K=!1,nt=null,yt=null,dt=null;return{setReversed:function(vt){if(K!==vt){const Vt=t.get("EXT_clip_control");vt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT),K=vt;const jt=dt;dt=null,this.setClear(jt)}},getReversed:function(){return K},setTest:function(vt){vt?St(i.DEPTH_TEST):Jt(i.DEPTH_TEST)},setMask:function(vt){nt!==vt&&!B&&(i.depthMask(vt),nt=vt)},setFunc:function(vt){if(K&&(vt=Xh[vt]),yt!==vt){switch(vt){case so:i.depthFunc(i.NEVER);break;case ro:i.depthFunc(i.ALWAYS);break;case oo:i.depthFunc(i.LESS);break;case Fs:i.depthFunc(i.LEQUAL);break;case ao:i.depthFunc(i.EQUAL);break;case lo:i.depthFunc(i.GEQUAL);break;case co:i.depthFunc(i.GREATER);break;case uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=vt}},setLocked:function(vt){B=vt},setClear:function(vt){dt!==vt&&(dt=vt,K&&(vt=1-vt),i.clearDepth(vt))},reset:function(){B=!1,nt=null,yt=null,dt=null,K=!1}}}function s(){let B=!1,K=null,nt=null,yt=null,dt=null,vt=null,Vt=null,jt=null,ht=null;return{setTest:function(Wt){B||(Wt?St(i.STENCIL_TEST):Jt(i.STENCIL_TEST))},setMask:function(Wt){K!==Wt&&!B&&(i.stencilMask(Wt),K=Wt)},setFunc:function(Wt,te,xt){(nt!==Wt||yt!==te||dt!==xt)&&(i.stencilFunc(Wt,te,xt),nt=Wt,yt=te,dt=xt)},setOp:function(Wt,te,xt){(vt!==Wt||Vt!==te||jt!==xt)&&(i.stencilOp(Wt,te,xt),vt=Wt,Vt=te,jt=xt)},setLocked:function(Wt){B=Wt},setClear:function(Wt){ht!==Wt&&(i.clearStencil(Wt),ht=Wt)},reset:function(){B=!1,K=null,nt=null,yt=null,dt=null,vt=null,Vt=null,jt=null,ht=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let h={},g={},p={},m=new WeakMap,x=[],v=null,u=!1,f=null,S=null,T=null,R=null,y=null,_=null,d=null,M=new oe(0,0,0),w=0,E=!1,A=null,L=null,U=null,I=null,k=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,it=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=it>=1):Y.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=it>=2);let tt=null,at={};const Mt=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),Q=new Ye().fromArray(Mt),_t=new Ye().fromArray(Lt);function bt(B,K,nt,yt){const dt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(B,vt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<nt;Vt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(K+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return vt}const Nt={};Nt[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Nt[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Nt[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),St(i.DEPTH_TEST),o.setFunc(Fs),ce(!1),$t(Wa),St(i.CULL_FACE),At(hs);function St(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function Jt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Oe(B,K){return p[B]!==K?(i.bindFramebuffer(B,K),p[B]=K,B===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=K),B===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=K),!0):!1}function kt(B,K){let nt=x,yt=!1;if(B){nt=m.get(K),nt===void 0&&(nt=[],m.set(K,nt));const dt=B.textures;if(nt.length!==dt.length||nt[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Vt=dt.length;vt<Vt;vt++)nt[vt]=i.COLOR_ATTACHMENT0+vt;nt.length=dt.length,yt=!0}}else nt[0]!==i.BACK&&(nt[0]=i.BACK,yt=!0);yt&&i.drawBuffers(nt)}function st(B){return v!==B?(i.useProgram(B),v=B,!0):!1}const Ht={[as]:i.FUNC_ADD,[cu]:i.FUNC_SUBTRACT,[uu]:i.FUNC_REVERSE_SUBTRACT};Ht[hu]=i.MIN,Ht[fu]=i.MAX;const se={[du]:i.ZERO,[pu]:i.ONE,[mu]:i.SRC_COLOR,[nl]:i.SRC_ALPHA,[Su]:i.SRC_ALPHA_SATURATE,[vu]:i.DST_COLOR,[_u]:i.DST_ALPHA,[gu]:i.ONE_MINUS_SRC_COLOR,[il]:i.ONE_MINUS_SRC_ALPHA,[Mu]:i.ONE_MINUS_DST_COLOR,[xu]:i.ONE_MINUS_DST_ALPHA,[yu]:i.CONSTANT_COLOR,[bu]:i.ONE_MINUS_CONSTANT_COLOR,[Eu]:i.CONSTANT_ALPHA,[wu]:i.ONE_MINUS_CONSTANT_ALPHA};function At(B,K,nt,yt,dt,vt,Vt,jt,ht,Wt){if(B===hs){u===!0&&(Jt(i.BLEND),u=!1);return}if(u===!1&&(St(i.BLEND),u=!0),B!==lu){if(B!==f||Wt!==E){if((S!==as||y!==as)&&(i.blendEquation(i.FUNC_ADD),S=as,y=as),Wt)switch(B){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case Xa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ya:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:we("WebGLState: Invalid blending: ",B);break}else switch(B){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xa:we("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ya:we("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:we("WebGLState: Invalid blending: ",B);break}T=null,R=null,_=null,d=null,M.set(0,0,0),w=0,f=B,E=Wt}return}dt=dt||K,vt=vt||nt,Vt=Vt||yt,(K!==S||dt!==y)&&(i.blendEquationSeparate(Ht[K],Ht[dt]),S=K,y=dt),(nt!==T||yt!==R||vt!==_||Vt!==d)&&(i.blendFuncSeparate(se[nt],se[yt],se[vt],se[Vt]),T=nt,R=yt,_=vt,d=Vt),(jt.equals(M)===!1||ht!==w)&&(i.blendColor(jt.r,jt.g,jt.b,ht),M.copy(jt),w=ht),f=B,E=!1}function Gt(B,K){B.side===_n?Jt(i.CULL_FACE):St(i.CULL_FACE);let nt=B.side===bn;K&&(nt=!nt),ce(nt),B.blending===Ns&&B.transparent===!1?At(hs):At(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const yt=B.stencilWrite;a.setTest(yt),yt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ae(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?St(i.SAMPLE_ALPHA_TO_COVERAGE):Jt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(B){A!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),A=B)}function $t(B){B!==ru?(St(i.CULL_FACE),B!==L&&(B===Wa?i.cullFace(i.BACK):B===ou?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Jt(i.CULL_FACE),L=B}function Se(B){B!==U&&(W&&i.lineWidth(B),U=B)}function Ae(B,K,nt){B?(St(i.POLYGON_OFFSET_FILL),(I!==K||k!==nt)&&(I=K,k=nt,o.getReversed()&&(K=-K,nt=-nt),i.polygonOffset(K,nt))):Jt(i.POLYGON_OFFSET_FILL)}function ze(B){B?St(i.SCISSOR_TEST):Jt(i.SCISSOR_TEST)}function Ge(B){B===void 0&&(B=i.TEXTURE0+H-1),tt!==B&&(i.activeTexture(B),tt=B)}function Ke(B,K,nt){nt===void 0&&(tt===null?nt=i.TEXTURE0+H-1:nt=tt);let yt=at[nt];yt===void 0&&(yt={type:void 0,texture:void 0},at[nt]=yt),(yt.type!==B||yt.texture!==K)&&(tt!==nt&&(i.activeTexture(nt),tt=nt),i.bindTexture(B,K||Nt[B]),yt.type=B,yt.texture=K)}function z(){const B=at[tt];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function me(){try{i.compressedTexImage2D(...arguments)}catch(B){we("WebGLState:",B)}}function ve(){try{i.compressedTexImage3D(...arguments)}catch(B){we("WebGLState:",B)}}function be(){try{i.texSubImage2D(...arguments)}catch(B){we("WebGLState:",B)}}function wt(){try{i.texSubImage3D(...arguments)}catch(B){we("WebGLState:",B)}}function De(){try{i.compressedTexSubImage2D(...arguments)}catch(B){we("WebGLState:",B)}}function Yt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){we("WebGLState:",B)}}function Qt(){try{i.texStorage2D(...arguments)}catch(B){we("WebGLState:",B)}}function N(){try{i.texStorage3D(...arguments)}catch(B){we("WebGLState:",B)}}function C(){try{i.texImage2D(...arguments)}catch(B){we("WebGLState:",B)}}function q(){try{i.texImage3D(...arguments)}catch(B){we("WebGLState:",B)}}function pt(B){return g[B]!==void 0?g[B]:i.getParameter(B)}function lt(B,K){g[B]!==K&&(i.pixelStorei(B,K),g[B]=K)}function ct(B){Q.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Q.copy(B))}function Rt(B){_t.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),_t.copy(B))}function rt(B,K){let nt=l.get(K);nt===void 0&&(nt=new WeakMap,l.set(K,nt));let yt=nt.get(B);yt===void 0&&(yt=i.getUniformBlockIndex(K,B.name),i.uniformBlockBinding(K,yt,yt),nt.set(B,yt))}function ot(B,K,nt){const dt=l.get(K).get(B);c[dt]!==nt&&(i.bindBufferBase(i.UNIFORM_BUFFER,dt,nt),c[dt]=nt)}function Tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},g={},tt=null,at={},p={},c={},m=new WeakMap,x=[],v=null,u=!1,f=null,S=null,T=null,R=null,y=null,_=null,d=null,M=new oe(0,0,0),w=0,E=!1,A=null,L=null,U=null,I=null,k=null,Q.set(0,0,i.canvas.width,i.canvas.height),_t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:St,disable:Jt,bindFramebuffer:Oe,drawBuffers:kt,useProgram:st,setBlending:At,setMaterial:Gt,setFlipSided:ce,setCullFace:$t,setLineWidth:Se,setPolygonOffset:Ae,setScissorTest:ze,activeTexture:Ge,bindTexture:Ke,unbindTexture:z,compressedTexImage2D:me,compressedTexImage3D:ve,texImage2D:C,texImage3D:q,pixelStorei:lt,getParameter:pt,updateUBOMapping:rt,uniformBlockBinding:ot,texStorage2D:Qt,texStorage3D:N,texSubImage2D:be,texSubImage3D:wt,compressedTexSubImage2D:De,compressedTexSubImage3D:Yt,scissor:ct,viewport:Rt,reset:Tt}}function Sg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,h=new WeakMap,g=new Set;let p;const m=new WeakMap,x=new Set,v=new FinalizationRegistry(N=>x.delete(N));let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(N,C){return u?new OffscreenCanvas(N,C):Xo("canvas")}function S(N,C,q){let pt=1;const lt=Qt(N);if((lt.width>q||lt.height>q)&&(pt=q/Math.max(lt.width,lt.height)),pt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const ct=Math.floor(pt*lt.width),Rt=Math.floor(pt*lt.height);p===void 0&&(p=f(ct,Rt));const rt=C?f(ct,Rt):p;return rt.width=ct,rt.height=Rt,rt.getContext("2d").drawImage(N,0,0,ct,Rt),Kt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+ct+"x"+Rt+")."),rt}else return"data"in N&&Kt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),N;return N}function T(N){return N.generateMipmaps}function R(N){i.generateMipmap(N)}function y(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(N,C,q,pt,lt,ct=!1){if(N!==null){if(i[N]!==void 0)return i[N];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Rt;pt&&(Rt=t.get("EXT_texture_norm16"),Rt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=C;if(C===i.RED&&(q===i.FLOAT&&(rt=i.R32F),q===i.HALF_FLOAT&&(rt=i.R16F),q===i.UNSIGNED_BYTE&&(rt=i.R8),q===i.UNSIGNED_SHORT&&Rt&&(rt=Rt.R16_EXT),q===i.SHORT&&Rt&&(rt=Rt.R16_SNORM_EXT)),C===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.R8UI),q===i.UNSIGNED_SHORT&&(rt=i.R16UI),q===i.UNSIGNED_INT&&(rt=i.R32UI),q===i.BYTE&&(rt=i.R8I),q===i.SHORT&&(rt=i.R16I),q===i.INT&&(rt=i.R32I)),C===i.RG&&(q===i.FLOAT&&(rt=i.RG32F),q===i.HALF_FLOAT&&(rt=i.RG16F),q===i.UNSIGNED_BYTE&&(rt=i.RG8),q===i.UNSIGNED_SHORT&&Rt&&(rt=Rt.RG16_EXT),q===i.SHORT&&Rt&&(rt=Rt.RG16_SNORM_EXT)),C===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RG8UI),q===i.UNSIGNED_SHORT&&(rt=i.RG16UI),q===i.UNSIGNED_INT&&(rt=i.RG32UI),q===i.BYTE&&(rt=i.RG8I),q===i.SHORT&&(rt=i.RG16I),q===i.INT&&(rt=i.RG32I)),C===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),q===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),q===i.UNSIGNED_INT&&(rt=i.RGB32UI),q===i.BYTE&&(rt=i.RGB8I),q===i.SHORT&&(rt=i.RGB16I),q===i.INT&&(rt=i.RGB32I)),C===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),q===i.UNSIGNED_INT&&(rt=i.RGBA32UI),q===i.BYTE&&(rt=i.RGBA8I),q===i.SHORT&&(rt=i.RGBA16I),q===i.INT&&(rt=i.RGBA32I)),C===i.RGB&&(q===i.UNSIGNED_SHORT&&Rt&&(rt=Rt.RGB16_EXT),q===i.SHORT&&Rt&&(rt=Rt.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),C===i.RGBA){const ot=ct?xr:_e.getTransfer(lt);q===i.FLOAT&&(rt=i.RGBA32F),q===i.HALF_FLOAT&&(rt=i.RGBA16F),q===i.UNSIGNED_BYTE&&(rt=ot===Ie?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&Rt&&(rt=Rt.RGBA16_EXT),q===i.SHORT&&Rt&&(rt=Rt.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function d(N,C){let q;return N?C===null||C===ei||C===ds?q=i.DEPTH24_STENCIL8:C===Hn?q=i.DEPTH32F_STENCIL8:C===Bs&&(q=i.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===ei||C===ds?q=i.DEPTH_COMPONENT24:C===Hn?q=i.DEPTH_COMPONENT32F:C===Bs&&(q=i.DEPTH_COMPONENT16),q}function M(N,C){return T(N)===!0||N.isFramebufferTexture&&N.minFilter!==hn&&N.minFilter!==yn?Math.log2(Math.max(C.width,C.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?C.mipmaps.length:1}function w(N){const C=new WeakRef(N);n.get(N).__ref=C,x.add(C),v.register(N,C,C)}function E(N){const C=n.get(N).__ref;C!==void 0&&(x.delete(C),v.unregister(C))}function A(N){U(N.target)}function L(N){I(N.target)}function U(N){N.removeEventListener("dispose",A),E(N),H(N),N.isVideoTexture&&h.delete(N),N.isHTMLTexture&&g.delete(N)}function I(N){N.removeEventListener("dispose",L),E(N),it(N)}function k(){for(const N of x){const C=N.deref();C!==void 0&&(C.isRenderTarget===!0?I(C):U(C))}x.clear(),g.clear()}function H(N){const C=n.get(N);if(C.__webglInit===void 0)return;const q=N.source,pt=m.get(q);if(pt){const lt=pt[C.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&W(N),Object.keys(pt).length===0&&m.delete(q)}n.remove(N)}function W(N){const C=n.get(N);i.deleteTexture(C.__webglTexture);const q=N.source,pt=m.get(q);delete pt[C.__cacheKey],o.memory.textures--}function it(N){const C=n.get(N);C.__depthDisposeCallback&&C.__depthDisposeCallback();const q=N.depthTexture;if(q&&q.renderTarget===N&&U(q),N.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(C.__webglFramebuffer[lt]))for(let ct=0;ct<C.__webglFramebuffer[lt].length;ct++)i.deleteFramebuffer(C.__webglFramebuffer[lt][ct]);else i.deleteFramebuffer(C.__webglFramebuffer[lt]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[lt])}else{if(Array.isArray(C.__webglFramebuffer))for(let lt=0;lt<C.__webglFramebuffer.length;lt++)i.deleteFramebuffer(C.__webglFramebuffer[lt]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let lt=0;lt<C.__webglColorRenderbuffer.length;lt++)C.__webglColorRenderbuffer[lt]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[lt]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const pt=N.textures;for(let lt=0,ct=pt.length;lt<ct;lt++){const Rt=n.get(pt[lt]);Rt.__webglTexture&&(i.deleteTexture(Rt.__webglTexture),o.memory.textures--),n.remove(pt[lt])}n.remove(N)}let Y=0;function tt(){Y=0}function at(){return Y}function Mt(N){Y=N}function Lt(){const N=Y;return N>=s.maxTextures&&Kt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),Y+=1,N}function Q(N){const C=[];return C.push(N.wrapS),C.push(N.wrapT),C.push(N.wrapR||0),C.push(N.magFilter),C.push(N.minFilter),C.push(N.anisotropy),C.push(N.internalFormat),C.push(N.format),C.push(N.type),C.push(N.generateMipmaps),C.push(N.mipmapsAutoUpdate),C.push(N.premultiplyAlpha),C.push(N.flipY),C.push(N.unpackAlignment),C.push(N.colorSpace),C.join()}function _t(N,C){const q=n.get(N);if(N.isVideoTexture&&De(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&q.__version!==N.version){const pt=N.image;if(pt===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(q,N,C);return}}else N.isExternalTexture&&(q.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+C)}function bt(N,C){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){Gt(q,N,C);return}else N.isExternalTexture&&(q.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+C)}function Nt(N,C){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){Gt(q,N,C);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+C)}function St(N,C){const q=n.get(N);if(N.version>0&&q.__version!==N.version){ce(q,N,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+C)}const Jt={[ho]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},Oe={[hn]:i.NEAREST,[Ru]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[yn]:i.LINEAR,[to]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},kt={[Du]:i.NEVER,[Ml]:i.ALWAYS,[Iu]:i.LESS,[xl]:i.LEQUAL,[Nu]:i.EQUAL,[vl]:i.GEQUAL,[Uu]:i.GREATER,[Fu]:i.NOTEQUAL};function st(N,C){if(C.type===Hn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===yn||C.magFilter===to||C.magFilter===nr||C.magFilter===Ai||C.minFilter===yn||C.minFilter===to||C.minFilter===nr||C.minFilter===Ai)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Jt[C.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Jt[C.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Jt[C.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,Oe[C.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,Oe[C.minFilter]),C.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,kt[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===hn||C.minFilter!==nr&&C.minFilter!==Ai||C.type===Hn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Ht(N,C){let q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,C.addEventListener("dispose",A),w(C));const pt=C.source;let lt=m.get(pt);lt===void 0&&(lt={},m.set(pt,lt));const ct=Q(C);if(ct!==N.__cacheKey){lt[ct]===void 0&&(lt[ct]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),lt[ct].usedTimes++;const Rt=lt[N.__cacheKey];Rt!==void 0&&(lt[N.__cacheKey].usedTimes--,Rt.usedTimes===0&&W(C)),N.__cacheKey=ct,N.__webglTexture=lt[ct].texture}return q}function se(N,C,q){return Math.floor(Math.floor(N/q)/C)}function At(N,C,q,pt){const ct=N.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,C.width,C.height,q,pt,C.data);else{ct.sort((B,K)=>B.start-K.start);let Rt=0;for(let B=1;B<ct.length;B++){const K=ct[Rt],nt=ct[B],yt=K.start+K.count,dt=se(nt.start,C.width,4),vt=se(K.start,C.width,4);nt.start<=yt+1&&dt===vt&&se(nt.start+nt.count-1,C.width,4)===dt?K.count=Math.max(K.count,nt.start+nt.count-K.start):(++Rt,ct[Rt]=nt)}ct.length=Rt+1;const rt=e.getParameter(i.UNPACK_ROW_LENGTH),ot=e.getParameter(i.UNPACK_SKIP_PIXELS),Tt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,C.width);for(let B=0,K=ct.length;B<K;B++){const nt=ct[B],yt=Math.floor(nt.start/4),dt=Math.ceil(nt.count/4),vt=yt%C.width,Vt=Math.floor(yt/C.width),jt=dt,ht=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Vt),e.texSubImage2D(i.TEXTURE_2D,0,vt,Vt,jt,ht,q,pt,C.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,rt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,Tt)}}function Gt(N,C,q){let pt=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(pt=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(pt=i.TEXTURE_3D);const lt=Ht(N,C),ct=C.source;e.bindTexture(pt,N.__webglTexture,i.TEXTURE0+q);const Rt=n.get(ct);if(ct.version!==Rt.__version||lt===!0){if(e.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const ht=_e.getPrimaries(_e.workingColorSpace),Wt=C.colorSpace===Ti?null:_e.getPrimaries(C.colorSpace),te=C.colorSpace===Ti||ht===Wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te)}e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment);let ot=S(C.image,!1,s.maxTextureSize);ot=Yt(C,ot);const Tt=r.convert(C.format,C.colorSpace),B=r.convert(C.type);let K=_(C.internalFormat,Tt,B,C.normalized,C.colorSpace,C.isVideoTexture);st(pt,C);let nt;const yt=C.mipmaps,dt=C.isVideoTexture!==!0,vt=Rt.__version===void 0||lt===!0,Vt=ct.dataReady,jt=M(C,ot);if(C.isDepthTexture)K=d(C.format===Ri,C.type),vt&&(dt?e.texStorage2D(i.TEXTURE_2D,1,K,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,K,ot.width,ot.height,0,Tt,B,null));else if(C.isDataTexture)if(yt.length>0){dt&&vt&&e.texStorage2D(i.TEXTURE_2D,jt,K,yt[0].width,yt[0].height);for(let ht=0,Wt=yt.length;ht<Wt;ht++)nt=yt[ht],dt?Vt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,nt.width,nt.height,Tt,B,nt.data):e.texImage2D(i.TEXTURE_2D,ht,K,nt.width,nt.height,0,Tt,B,nt.data);C.generateMipmaps=!1}else dt?(vt&&e.texStorage2D(i.TEXTURE_2D,jt,K,ot.width,ot.height),Vt&&At(C,ot,Tt,B)):e.texImage2D(i.TEXTURE_2D,0,K,ot.width,ot.height,0,Tt,B,ot.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){dt&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,K,yt[0].width,yt[0].height,ot.depth);for(let ht=0,Wt=yt.length;ht<Wt;ht++)if(nt=yt[ht],C.format!==jn)if(Tt!==null)if(dt){if(Vt)if(C.layerUpdates.size>0){const te=Dc(nt.width,nt.height,C.format,C.type);for(const xt of C.layerUpdates){const ee=nt.data.subarray(xt*te/nt.data.BYTES_PER_ELEMENT,(xt+1)*te/nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,xt,nt.width,nt.height,1,Tt,ee)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,nt.width,nt.height,ot.depth,Tt,nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ht,K,nt.width,nt.height,ot.depth,0,nt.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else dt?Vt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,nt.width,nt.height,ot.depth,Tt,B,nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ht,K,nt.width,nt.height,ot.depth,0,Tt,B,nt.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{dt&&vt&&e.texStorage2D(i.TEXTURE_2D,jt,K,yt[0].width,yt[0].height);for(let ht=0,Wt=yt.length;ht<Wt;ht++)nt=yt[ht],C.format!==jn?Tt!==null?dt?Vt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ht,0,0,nt.width,nt.height,Tt,nt.data):e.compressedTexImage2D(i.TEXTURE_2D,ht,K,nt.width,nt.height,0,nt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?Vt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,nt.width,nt.height,Tt,B,nt.data):e.texImage2D(i.TEXTURE_2D,ht,K,nt.width,nt.height,0,Tt,B,nt.data)}else if(C.isDataArrayTexture)if(dt){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,K,ot.width,ot.height,ot.depth),Vt)if(C.layerUpdates.size>0){const ht=Dc(ot.width,ot.height,C.format,C.type);for(const Wt of C.layerUpdates){const te=ot.data.subarray(Wt*ht/ot.data.BYTES_PER_ELEMENT,(Wt+1)*ht/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Wt,ot.width,ot.height,1,Tt,B,te)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,Tt,B,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,K,ot.width,ot.height,ot.depth,0,Tt,B,ot.data);else if(C.isData3DTexture)dt?(vt&&e.texStorage3D(i.TEXTURE_3D,jt,K,ot.width,ot.height,ot.depth),Vt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,Tt,B,ot.data)):e.texImage3D(i.TEXTURE_3D,0,K,ot.width,ot.height,ot.depth,0,Tt,B,ot.data);else if(C.isFramebufferTexture){if(vt)if(dt)e.texStorage2D(i.TEXTURE_2D,jt,K,ot.width,ot.height);else{let ht=ot.width,Wt=ot.height;for(let te=0;te<jt;te++)e.texImage2D(i.TEXTURE_2D,te,K,ht,Wt,0,Tt,B,null),ht>>=1,Wt>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in i){const ht=i.canvas;if(ht.hasAttribute("layoutsubtree")||ht.setAttribute("layoutsubtree","true"),ot.parentNode!==ht){ht.appendChild(ot),g.add(C),ht.onpaint=Wt=>{const te=Wt.changedElements;for(const xt of g)te.includes(xt.image)&&(xt.needsUpdate=!0)},ht.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ot);else{const te=i.RGBA,xt=i.RGBA,ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,te,xt,ee,ot)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(yt.length>0){if(dt&&vt){const ht=Qt(yt[0]);e.texStorage2D(i.TEXTURE_2D,jt,K,ht.width,ht.height)}for(let ht=0,Wt=yt.length;ht<Wt;ht++)nt=yt[ht],dt?Vt&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,Tt,B,nt):e.texImage2D(i.TEXTURE_2D,ht,K,Tt,B,nt);C.generateMipmaps=!1}else if(dt){if(vt){const ht=Qt(ot);e.texStorage2D(i.TEXTURE_2D,jt,K,ht.width,ht.height)}Vt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Tt,B,ot)}else e.texImage2D(i.TEXTURE_2D,0,K,Tt,B,ot);T(C)&&C.mipmapsAutoUpdate===!0&&R(pt),Rt.__version=ct.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function ce(N,C,q){if(C.image.length!==6)return;const pt=Ht(N,C),lt=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+q);const ct=n.get(lt);if(lt.version!==ct.__version||pt===!0){e.activeTexture(i.TEXTURE0+q);const Rt=_e.getPrimaries(_e.workingColorSpace),rt=C.colorSpace===Ti?null:_e.getPrimaries(C.colorSpace),ot=C.colorSpace===Ti||Rt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const Tt=C.isCompressedTexture||C.image[0].isCompressedTexture,B=C.image[0]&&C.image[0].isDataTexture,K=[];for(let xt=0;xt<6;xt++)!Tt&&!B?K[xt]=S(C.image[xt],!0,s.maxCubemapSize):K[xt]=B?C.image[xt].image:C.image[xt],K[xt]=Yt(C,K[xt]);const nt=K[0],yt=r.convert(C.format,C.colorSpace),dt=r.convert(C.type);let vt=_(C.internalFormat,yt,dt,C.normalized,C.colorSpace);const Vt=C.isVideoTexture!==!0,jt=ct.__version===void 0||pt===!0,ht=lt.dataReady;let Wt=M(C,nt);st(i.TEXTURE_CUBE_MAP,C);let te;if(C.isDepthTexture){if(vt=d(C.format===Ri,C.type),jt)if(Vt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,vt,nt.width,nt.height);else for(let xt=0;xt<6;xt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,vt,nt.width,nt.height,0,yt,dt,null)}else if(Tt){Vt&&jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Wt,vt,nt.width,nt.height);for(let xt=0;xt<6;xt++){te=K[xt].mipmaps;for(let ee=0;ee<te.length;ee++){const ye=te[ee];C.format!==jn?yt!==null?Vt?ht&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee,0,0,ye.width,ye.height,yt,ye.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee,vt,ye.width,ye.height,0,ye.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee,0,0,ye.width,ye.height,yt,dt,ye.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee,vt,ye.width,ye.height,0,yt,dt,ye.data)}}}else{if(te=C.mipmaps,Vt&&jt){te.length>0&&Wt++;const xt=Qt(K[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Wt,vt,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(B){Vt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,K[xt].width,K[xt].height,yt,dt,K[xt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,vt,K[xt].width,K[xt].height,0,yt,dt,K[xt].data);for(let ee=0;ee<te.length;ee++){const en=te[ee].image[xt].image;Vt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee+1,0,0,en.width,en.height,yt,dt,en.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee+1,vt,en.width,en.height,0,yt,dt,en.data)}}else{Vt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,yt,dt,K[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,vt,yt,dt,K[xt]);for(let ee=0;ee<te.length;ee++){const ye=te[ee];Vt?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee+1,0,0,yt,dt,ye.image[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,ee+1,vt,yt,dt,ye.image[xt])}}}T(C)&&C.mipmapsAutoUpdate===!0&&R(i.TEXTURE_CUBE_MAP),ct.__version=lt.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function $t(N,C,q,pt,lt,ct){const Rt=r.convert(q.format,q.colorSpace),rt=r.convert(q.type),ot=_(q.internalFormat,Rt,rt,q.normalized,q.colorSpace),Tt=n.get(C),B=n.get(q);if(B.__renderTarget=C,!Tt.__hasExternalTextures){const K=Math.max(1,C.width>>ct),nt=Math.max(1,C.height>>ct);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,ct,ot,K,nt,C.depth,0,Rt,rt,null):e.texImage2D(lt,ct,ot,K,nt,0,Rt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),wt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,pt,lt,B.__webglTexture,0,be(C)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,pt,lt,B.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(N,C,q){if(i.bindRenderbuffer(i.RENDERBUFFER,N),C.depthBuffer){const pt=C.depthTexture,lt=pt&&pt.isDepthTexture?pt.type:null,ct=d(C.stencilBuffer,lt),Rt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;wt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be(C),ct,C.width,C.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,be(C),ct,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ct,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,N)}else{const pt=C.textures;for(let lt=0;lt<pt.length;lt++){const ct=pt[lt],Rt=r.convert(ct.format,ct.colorSpace),rt=r.convert(ct.type),ot=_(ct.internalFormat,Rt,rt,ct.normalized,ct.colorSpace);wt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be(C),ot,C.width,C.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,be(C),ot,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ot,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(N,C,q){const pt=C.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const lt=n.get(C.depthTexture);lt.__renderTarget=C;const ct=pt?C.depthTexture.image[0]:C.depthTexture.image;(!lt.__webglTexture||ct.width!==C.width||ct.height!==C.height)&&(ct.width=C.width,ct.height=C.height,C.depthTexture.needsUpdate=!0),pt?St(C.depthTexture,0):_t(C.depthTexture,0);const Rt=lt.__webglTexture,rt=be(C),ot=pt?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,Tt=C.depthTexture.format===Ri?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(C.depthTexture.format===Li)wt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,ot,Rt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,ot,Rt,0);else if(C.depthTexture.format===Ri)wt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Tt,ot,Rt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,Tt,ot,Rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ze(N){const C=n.get(N),q=N.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==N.depthTexture){const pt=N.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),pt){const lt=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,pt.removeEventListener("dispose",lt)};pt.addEventListener("dispose",lt),C.__depthDisposeCallback=lt}C.__boundDepthTexture=pt}if(N.depthTexture&&!C.__autoAllocateDepthBuffer)if(q)for(let pt=0;pt<6;pt++)Ae(C.__webglFramebuffer[pt],N,pt);else N.texture.mipmaps.length>0?Ae(C.__webglFramebuffer[0],N,0):Ae(C.__webglFramebuffer,N,0);else if(q){C.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[pt]),C.__webglDepthbuffer[pt]===void 0)C.__webglDepthbuffer[pt]=i.createRenderbuffer(),Se(C.__webglDepthbuffer[pt],N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=C.__webglDepthbuffer[pt];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ct)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),Se(C.__webglDepthbuffer,N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ct)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(N,C,q){const pt=n.get(N);C!==void 0&&$t(pt.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&ze(N)}function Ke(N){const C=N.texture,q=n.get(N),pt=n.get(C);N.addEventListener("dispose",L),w(N);const lt=N.textures,ct=N.isWebGLCubeRenderTarget===!0,Rt=lt.length>1;if(Rt||(pt.__webglTexture===void 0&&(pt.__webglTexture=i.createTexture()),pt.__version=C.version,o.memory.textures++),ct){q.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0){q.__webglFramebuffer[rt]=[];for(let ot=0;ot<C.mipmaps.length;ot++)q.__webglFramebuffer[rt][ot]=i.createFramebuffer()}else q.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(C.mipmaps.length>0){q.__webglFramebuffer=[];for(let rt=0;rt<C.mipmaps.length;rt++)q.__webglFramebuffer[rt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let rt=0,ot=lt.length;rt<ot;rt++){const Tt=n.get(lt[rt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&wt(N)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let rt=0;rt<lt.length;rt++){const ot=lt[rt];q.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[rt]);const Tt=r.convert(ot.format,ot.colorSpace),B=r.convert(ot.type),K=_(ot.internalFormat,Tt,B,ot.normalized,ot.colorSpace,N.isXRRenderTarget===!0),nt=be(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,K,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,q.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Se(q.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,pt.__webglTexture),st(i.TEXTURE_CUBE_MAP,C);for(let rt=0;rt<6;rt++)if(C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)$t(q.__webglFramebuffer[rt][ot],N,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ot);else $t(q.__webglFramebuffer[rt],N,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);T(C)?R(i.TEXTURE_CUBE_MAP):C.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}else if(Rt){for(let rt=0,ot=lt.length;rt<ot;rt++){const Tt=lt[rt],B=n.get(Tt);let K=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(K=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,B.__webglTexture),st(K,Tt),$t(q.__webglFramebuffer,N,Tt,i.COLOR_ATTACHMENT0+rt,K,0),T(Tt)&&R(K)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(rt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,pt.__webglTexture),st(rt,C),C.mipmaps.length>0)for(let ot=0;ot<C.mipmaps.length;ot++)$t(q.__webglFramebuffer[ot],N,C,i.COLOR_ATTACHMENT0,rt,ot);else $t(q.__webglFramebuffer,N,C,i.COLOR_ATTACHMENT0,rt,0);T(C)?R(rt):C.mipmaps.length>0&&i.texParameteri(rt,i.TEXTURE_MAX_LEVEL,C.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&ze(N)}function z(N){const C=N.textures;for(let q=0,pt=C.length;q<pt;q++){const lt=C[q];if(T(lt)&&lt.mipmapsAutoUpdate===!0){const ct=y(N),Rt=n.get(lt).__webglTexture;e.bindTexture(ct,Rt),R(ct),e.unbindTexture()}}}const me=[];function ve(N){if(N.samples>0){if(wt(N)===!1){const C=N.textures,q=N.width,pt=N.height;let lt=i.COLOR_BUFFER_BIT;const ct=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(N),rt=C.length>1;if(rt)for(let Tt=0;Tt<C.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Tt=0;Tt<C.length;Tt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const B=n.get(C[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,B,0)}i.blitFramebuffer(0,0,q,pt,0,0,q,pt,lt,i.NEAREST),c===!0&&(me.length=0,me.push(i.COLOR_ATTACHMENT0+Tt),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&me.push(ct),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let Tt=0;Tt<C.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const B=n.get(C[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,B,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const C=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function be(N){return Math.min(s.maxSamples,N.samples)}function wt(N){const C=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function De(N){const C=o.render.frame;h.get(N)!==C&&(h.set(N,C),N.update())}function Yt(N,C){const q=N.colorSpace,pt=N.format,lt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||q!==_r&&q!==Ti&&(_e.getTransfer(q)===Ie?(pt!==jn||lt!==Rn)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):we("WebGLTextures: Unsupported texture color space:",q)),C}function Qt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=Lt,this.resetTextureUnits=tt,this.getTextureUnits=at,this.setTextureUnits=Mt,this.setTexture2D=_t,this.setTexture2DArray=bt,this.setTexture3D=Nt,this.setTextureCube=St,this.rebindTextures=Ge,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=$t,this.useMultisampledRTT=wt,this.dispose=k}function wh(i,t){function e(n,s=Ti){let r;const o=_e.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===ta)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ea)return i.UNSIGNED_SHORT_5_5_5_1;if(n===pl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ml)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fl)return i.BYTE;if(n===dl)return i.SHORT;if(n===Bs)return i.UNSIGNED_SHORT;if(n===jo)return i.INT;if(n===ei)return i.UNSIGNED_INT;if(n===Hn)return i.FLOAT;if(n===ni)return i.HALF_FLOAT;if(n===gl)return i.ALPHA;if(n===_l)return i.RGB;if(n===jn)return i.RGBA;if(n===Li)return i.DEPTH_COMPONENT;if(n===Ri)return i.DEPTH_STENCIL;if(n===na)return i.RED;if(n===ia)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===sa)return i.RG_INTEGER;if(n===ra)return i.RGBA_INTEGER;if(n===rr||n===or||n===ar||n===lr)if(o===Ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===po||n===mo||n===go||n===_o)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===po)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xo||n===vo||n===Mo||n===So||n===yo||n===mr||n===bo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xo||n===vo)return o===Ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Mo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===So)return r.COMPRESSED_R11_EAC;if(n===yo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===mr)return r.COMPRESSED_RG11_EAC;if(n===bo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Eo||n===wo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===No||n===Uo||n===Fo||n===Oo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Eo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===To)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ao)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ro)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Co)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Po)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Io)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===No)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return o===Ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===zo||n===Go)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Bo)return o===Ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ko||n===Ho||n===gr||n===Vo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ko)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const yg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bg=`
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

}`;class Eg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Il(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wi({vertexShader:yg,fragmentShader:bg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Te(new Di(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wg extends Ii{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,g=null,p=null,m=null,x=null;const v=typeof XRWebGLBinding<"u",u=new Eg,f={},S=e.getContextAttributes();let T=null,R=null;const y=[],_=[],d=new Ft;let M=null,w=null;const E=new Gn;E.viewport=new Ye;const A=new Gn;A.viewport=new Ye;const L=[E,A],U=new fh;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let _t=y[Q];return _t===void 0&&(_t=new no,y[Q]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(Q){let _t=y[Q];return _t===void 0&&(_t=new no,y[Q]=_t),_t.getGripSpace()},this.getHand=function(Q){let _t=y[Q];return _t===void 0&&(_t=new no,y[Q]=_t),_t.getHandSpace()};function H(Q){const _t=_.indexOf(Q.inputSource);if(_t===-1)return;const bt=y[_t];bt!==void 0&&(bt.update(Q.inputSource,Q.frame,l||o),bt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",it);for(let Q=0;Q<y.length;Q++){const _t=_[Q];_t!==null&&(_[Q]=null,y[Q].disconnect(_t))}I=null,k=null,u.reset();for(const Q in f)delete f[Q];if(t.setRenderTarget(T),m=null,p=null,g=null,s=null,R=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(d.width,d.height,!1),w!==null){const Q=w.camera;Q.fov=w.fov,Q.zoom=w.zoom,Q.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return g===null&&v&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",it),S.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(d),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Nt=null,St=null;S.depth&&(St=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=S.stencil?Ri:Li,Nt=S.stencil?ds:ei);const Jt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};g=this.getBinding(),p=g.createProjectionLayer(Jt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),R=new ti(p.textureWidth,p.textureHeight,{format:jn,type:Rn,depthTexture:new ps(p.textureWidth,p.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{const bt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),R=new ti(m.framebufferWidth,m.framebufferHeight,{format:jn,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return u.getDepthTexture()};function it(Q){for(let _t=0;_t<Q.removed.length;_t++){const bt=Q.removed[_t],Nt=_.indexOf(bt);Nt>=0&&(_[Nt]=null,y[Nt].disconnect(bt))}for(let _t=0;_t<Q.added.length;_t++){const bt=Q.added[_t];let Nt=_.indexOf(bt);if(Nt===-1){for(let Jt=0;Jt<y.length;Jt++)if(Jt>=_.length){_.push(bt),Nt=Jt;break}else if(_[Jt]===null){_[Jt]=bt,Nt=Jt;break}if(Nt===-1)break}const St=y[Nt];St&&St.connect(bt)}}function Y(Q,_t){_t===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(_t.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let _t=Q.near,bt=Q.far;u.texture!==null&&(u.depthNear>0&&(_t=u.depthNear),u.depthFar>0&&(bt=u.depthFar)),U.near=A.near=E.near=_t,U.far=A.far=E.far=bt,(I!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,k=U.far),U.layers.mask=Q.layers.mask|6,E.layers.mask=U.layers.mask&-5,A.layers.mask=U.layers.mask&-3;const Nt=Q.parent,St=U.cameras;Y(U,Nt);for(let Jt=0;Jt<St.length;Jt++)Y(St[Jt],Nt);U.projectionMatrix.copy(E.projectionMatrix),U.projectionMatrixInverse.copy(E.projectionMatrixInverse),w===null&&Q.isPerspectiveCamera&&(w={camera:Q,fov:Q.fov,zoom:Q.zoom}),tt(Q,U,Nt)};function tt(Q,_t,bt){bt===null?Q.matrix.copy(_t.matrixWorld):(Q.matrix.copy(bt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(_t.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(_t.projectionMatrix),Q.projectionMatrixInverse.copy(_t.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=vr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(Q){c=Q,p!==null&&(p.fixedFoveation=Q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Q)},this.hasDepthSensing=function(){return u.texture!==null},this.getDepthSensingMesh=function(){return u.getMesh(U)},this.getCameraTexture=function(Q){return f[Q]};let at=null;function Mt(Q,_t){if(h=_t.getViewerPose(l||o),x=_t,h!==null){const bt=h.views;m!==null&&(t.setRenderTargetFramebuffer(R,m.framebuffer),t.setRenderTarget(R));let Nt=!1;bt.length!==U.cameras.length&&(U.cameras.length=0,Nt=!0);for(let kt=0;kt<bt.length;kt++){const st=bt[kt];let Ht=null;if(m!==null)Ht=m.getViewport(st);else{const At=g.getViewSubImage(p,st);Ht=At.viewport,kt===0&&(t.setRenderTargetTextures(R,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(R))}let se=L[kt];se===void 0&&(se=new Gn,se.layers.enable(kt),se.viewport=new Ye,L[kt]=se),se.matrix.fromArray(st.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(st.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),kt===0&&(U.matrix.copy(se.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Nt===!0&&U.cameras.push(se)}const St=s.enabledFeatures;if(St&&St.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){g=n.getBinding();const kt=g.getDepthInformation(bt[0]);kt&&kt.isValid&&kt.texture&&u.init(kt,s.renderState)}if(St&&St.includes("camera-access")&&v){t.state.unbindTexture(),g=n.getBinding();for(let kt=0;kt<bt.length;kt++){const st=bt[kt].camera;if(st){let Ht=f[st];Ht||(Ht=new Il,f[st]=Ht);const se=g.getCameraImage(st);Ht.sourceTexture=se}}}}for(let bt=0;bt<y.length;bt++){const Nt=_[bt],St=y[bt];Nt!==null&&St!==void 0&&St.update(Nt,_t,l||o)}at&&at(Q,_t),_t.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_t}),x=null}const Lt=new mh;Lt.setAnimationLoop(Mt),this.setAnimationLoop=function(Q){at=Q},this.dispose=function(){}}}const Tg=new xe,Th=new ie;Th.set(-1,0,0,0,1,0,0,0,1);function Ag(i,t){function e(u,f){u.matrixAutoUpdate===!0&&u.updateMatrix(),f.value.copy(u.matrix)}function n(u,f){f.color.getRGB(u.fogColor.value,rh(i)),f.isFog?(u.fogNear.value=f.near,u.fogFar.value=f.far):f.isFogExp2&&(u.fogDensity.value=f.density)}function s(u,f,S,T,R){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(u,f):f.isMeshLambertMaterial?(r(u,f),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(u,f),g(u,f)):f.isMeshPhongMaterial?(r(u,f),h(u,f),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(u,f),p(u,f),f.isMeshPhysicalMaterial&&m(u,f,R)):f.isMeshMatcapMaterial?(r(u,f),x(u,f)):f.isMeshDepthMaterial?r(u,f):f.isMeshDistanceMaterial?(r(u,f),v(u,f)):f.isMeshNormalMaterial?r(u,f):f.isLineBasicMaterial?(o(u,f),f.isLineDashedMaterial&&a(u,f)):f.isPointsMaterial?c(u,f,S,T):f.isSpriteMaterial?l(u,f):f.isShadowMaterial?(u.color.value.copy(f.color),u.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(u,f){u.opacity.value=f.opacity,f.color&&u.diffuse.value.copy(f.color),f.emissive&&u.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.bumpMap&&(u.bumpMap.value=f.bumpMap,e(f.bumpMap,u.bumpMapTransform),u.bumpScale.value=f.bumpScale,f.side===bn&&(u.bumpScale.value*=-1)),f.normalMap&&(u.normalMap.value=f.normalMap,e(f.normalMap,u.normalMapTransform),u.normalScale.value.copy(f.normalScale),f.side===bn&&u.normalScale.value.negate()),f.displacementMap&&(u.displacementMap.value=f.displacementMap,e(f.displacementMap,u.displacementMapTransform),u.displacementScale.value=f.displacementScale,u.displacementBias.value=f.displacementBias),f.emissiveMap&&(u.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,u.emissiveMapTransform)),f.specularMap&&(u.specularMap.value=f.specularMap,e(f.specularMap,u.specularMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);const S=t.get(f),T=S.envMap,R=S.envMapRotation;T&&(u.envMap.value=T,u.envMapRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(R)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&u.envMapRotation.value.premultiply(Th),u.reflectivity.value=f.reflectivity,u.ior.value=f.ior,u.refractionRatio.value=f.refractionRatio),f.lightMap&&(u.lightMap.value=f.lightMap,u.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,u.lightMapTransform)),f.aoMap&&(u.aoMap.value=f.aoMap,u.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,u.aoMapTransform))}function o(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform))}function a(u,f){u.dashSize.value=f.dashSize,u.totalSize.value=f.dashSize+f.gapSize,u.scale.value=f.scale}function c(u,f,S,T){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.size.value=f.size*S,u.scale.value=T*.5,f.map&&(u.map.value=f.map,e(f.map,u.uvTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function l(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.rotation.value=f.rotation,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function h(u,f){u.specular.value.copy(f.specular),u.shininess.value=Math.max(f.shininess,1e-4)}function g(u,f){f.gradientMap&&(u.gradientMap.value=f.gradientMap)}function p(u,f){u.metalness.value=f.metalness,f.metalnessMap&&(u.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,u.metalnessMapTransform)),u.roughness.value=f.roughness,f.roughnessMap&&(u.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,u.roughnessMapTransform)),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)}function m(u,f,S){u.ior.value=f.ior,f.diffuseRoughness>0&&(u.diffuseRoughness.value=f.diffuseRoughness,f.diffuseRoughnessMap&&(u.diffuseRoughnessMap.value=f.diffuseRoughnessMap,e(f.diffuseRoughnessMap,u.diffuseRoughnessMapTransform))),f.sheen>0&&(u.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),u.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(u.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,u.sheenColorMapTransform)),f.sheenRoughnessMap&&(u.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,u.sheenRoughnessMapTransform))),f.clearcoat>0&&(u.clearcoat.value=f.clearcoat,u.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(u.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,u.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(u.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===bn&&u.clearcoatNormalScale.value.negate())),f.dispersion>0&&(u.dispersion.value=f.dispersion),f.retroreflectivity>0&&(u.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(u.iridescence.value=f.iridescence,u.iridescenceIOR.value=f.iridescenceIOR,u.iridescenceThicknessMinimum.value=f.iridescenceThicknessMinimum,u.iridescenceThicknessMaximum.value=f.iridescenceThicknessMaximum,f.iridescenceMap&&(u.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,u.iridescenceMapTransform)),f.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),f.transmission>0&&(u.transmission.value=f.transmission,u.transmissionSamplerMap.value=S.texture,u.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(u.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,u.transmissionMapTransform)),u.thickness.value=f.thickness,f.thicknessMap&&(u.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=f.attenuationDistance,u.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(u.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(u.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=f.specularIntensity,u.specularColor.value.copy(f.specularColor),f.specularColorMap&&(u.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,u.specularColorMapTransform)),f.specularIntensityMap&&(u.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,u.specularIntensityMapTransform))}function x(u,f){f.matcap&&(u.matcap.value=f.matcap)}function v(u,f){const S=t.get(f).light;u.referencePosition.value.setFromMatrixPosition(S.matrixWorld),u.nearDistance.value=S.shadow.camera.near,u.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rg(i,t,e,n){let s={},r={};function o(S,T){const R=T.program;n.uniformBlockBinding(S,R,s[S.id])}function a(S,T){let R=s[S.id];R===void 0&&(x(S),R=c(S),s[S.id]=R,S.addEventListener("dispose",u));const y=T.program;n.updateUBOMapping(S,y);const _=t.render.frame;r[S.id]!==_&&(l(S),r[S.id]=_)}function c(S){const T=i.createBuffer(),R=S.__size,y=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,y),i.bindBuffer(i.UNIFORM_BUFFER,null),T}function l(S){const T=s[S.id],R=S.uniforms,y=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,d=R.length;_<d;_++){const M=R[_];if(Array.isArray(M))for(let w=0,E=M.length;w<E;w++)h(M[w],_,w,y);else h(M,_,0,y)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,T,R,y){if(p(S,T,R,y)===!0){const _=S.__offset,d=S.value;if(Array.isArray(d)){let M=0;for(let w=0;w<d.length;w++){const E=d[w],A=v(E,!0);g(E,S.__data,M),M+=A.storage/Float32Array.BYTES_PER_ELEMENT}}else g(d,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,S.__data)}}function g(S,T,R){typeof S=="number"||typeof S=="boolean"?T[R]=S:S.isMatrix3?(T[R]=S.elements[0],T[R+1]=S.elements[1],T[R+2]=S.elements[2],T[R+3]=0,T[R+4]=S.elements[3],T[R+5]=S.elements[4],T[R+6]=S.elements[5],T[R+7]=0,T[R+8]=S.elements[6],T[R+9]=S.elements[7],T[R+10]=S.elements[8],T[R+11]=0):ArrayBuffer.isView(S)?T.set(S.subarray(0,T.length-R),R):S.toArray(T,R)}function p(S,T,R,y){const _=S.value,d=T+"_"+R;if(Array.isArray(_)){y[d]===void 0&&(y[d]=[]);const M=y[d];let w=!1;for(let E=0;E<_.length;E++)m(_[E],M,E)===!0&&(w=!0);return w}return m(_,y,d)}function m(S,T,R){if(T[R]===void 0)return typeof S=="number"||typeof S=="boolean"?T[R]=S:ArrayBuffer.isView(S)?T[R]=S.slice():T[R]=S.clone(),!0;{const y=T[R];if(typeof S=="number"||typeof S=="boolean"){if(y!==S)return T[R]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(y.equals(S)===!1)return y.copy(S),!0}}return!1}function x(S){const T=S.uniforms;let R=0;const y=16;for(let d=0,M=T.length;d<M;d++){const w=Array.isArray(T[d])?T[d]:[T[d]];for(let E=0,A=w.length;E<A;E++){const L=w[E],U=Array.isArray(L.value)?L.value:[L.value],I=Array.isArray(T[d])||Array.isArray(L.value);let k=R;for(let W=0,it=U.length;W<it;W++){const Y=U[W],tt=v(Y,I),at=R%y,Mt=at%tt.boundary,Lt=at+Mt;R+=Mt,Lt!==0&&y-Lt<tt.storage&&(R+=y-Lt),W===0&&(k=R),R+=tt.storage}const H=L.type==="int"?Int32Array:L.type==="uint"?Uint32Array:Float32Array;L.__data=new H((R-k)/Float32Array.BYTES_PER_ELEMENT),L.__offset=k}}const _=R%y;return _>0&&(R+=y-_),S.__size=R,S.__cache={},this}function v(S,T){const R={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(R.boundary=4,R.storage=4):S.isVector2?(R.boundary=8,R.storage=8):S.isVector3||S.isColor?(R.boundary=16,R.storage=12):S.isVector4?(R.boundary=16,R.storage=16):S.isMatrix3?(R.boundary=16,R.storage=48):S.isMatrix4?(R.boundary=16,R.storage=64):S.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(R.boundary=16,R.storage=S.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",S),T===!0&&(R.boundary=16,R.storage=Math.ceil(R.storage/16)*16),R}function u(S){const T=S.target;T.removeEventListener("dispose",u),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:o,update:a,dispose:f}}const Cg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ci=null;function Pg(){return ci===null&&(ci=new Al(Cg,16,16,Vi,ni),ci.name="DFG_LUT",ci.minFilter=yn,ci.magFilter=yn,ci.wrapS=mi,ci.wrapT=mi,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}class Ah{constructor(t={}){const{canvas:e=Bu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:p=!1,outputBufferType:m=Rn}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const v=m,u=new Set([ra,sa,ia]),f=new Set([Rn,ei,Bs,ds,ta,ea]),S=new Uint32Array(4),T=new Int32Array(4),R={textures:[],min:[],max:[],resolution:[]};let y=null,_=null;const d=[],M=[];let w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let A=!1,L=null,U=null,I=null,k=null;this._outputColorSpace=Sn;let H=0,W=0,it=null,Y=-1,tt=null;const at=new Ye,Mt=new Ye;let Lt=null;const Q=new oe(0);let _t=0,bt=e.width,Nt=e.height,St=1,Jt=null,Oe=null;const kt=new Ye(0,0,bt,Nt),st=new Ye(0,0,bt,Nt);let Ht=!1;const se=new Gs,At=new ca;let Gt=!1,ce=!1;const $t=new xe,Se=new O,Ae=new Ye,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function Ke(){return it===null?St:1}let z=n;function me(P,G){return e.getContext(P,G)}let ve,be,wt,De,Yt,Qt,N,C,q,pt,lt,ct,Rt,rt,ot,Tt,B,K,nt,yt,dt,vt,Vt;try{const P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$o}`),e.addEventListener("webglcontextlost",Wt,!1),e.addEventListener("webglcontextrestored",te,!1),e.addEventListener("webglcontextcreationerror",xt,!1),z===null){const G="webgl2";if(z=me(G,P),z===null)throw me(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}jt()}catch(P){throw e.removeEventListener("webglcontextlost",Wt,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),we("WebGLRenderer: "+P.message),P}function jt(){ve=new Um(z),ve.init(),dt=new wh(z,ve),be=new Em(z,ve,t,dt),wt=new Mg(z,ve),be.reversedDepthBuffer&&p&&wt.buffers.depth.setReversed(!0),U=z.createFramebuffer(),I=z.createFramebuffer(),k=z.createFramebuffer(),De=new Bm(z),Yt=new og,Qt=new Sg(z,ve,wt,Yt,be,dt,De),N=new Nm(E),C=new Gf(z),vt=new ym(z,C),q=new Fm(z,C,De,vt),pt=new Gm(z,q,C,vt,De),K=new zm(z,be,Qt),ot=new wm(Yt),lt=new rg(E,N,ve,be,vt,ot),ct=new Ag(E,Yt),Rt=new lg,rt=new pg(ve),B=new Sm(E,N,wt,pt,x,c),Tt=new vg(E,pt,be),Vt=new Rg(z,De,be,wt),nt=new bm(z,ve,De),yt=new Om(z,ve,De),De.programs=lt.programs,E.capabilities=be,E.extensions=ve,E.properties=Yt,E.renderLists=Rt,E.shadowMap=Tt,E.state=wt,E.info=De}v!==Rn&&(w=new Hm(v,e.width,e.height,a,s,r));const ht=new wg(E,z);this.xr=ht,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const P=ve.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ve.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return St},this.setPixelRatio=function(P){P!==void 0&&(St=P,this.setSize(bt,Nt,!1))},this.getSize=function(P){return P.set(bt,Nt)},this.setSize=function(P,G,$=!0){if(ht.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=P,Nt=G,e.width=Math.floor(P*St),e.height=Math.floor(G*St),$===!0&&(e.style.width=P+"px",e.style.height=G+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,P,G)},this.getDrawingBufferSize=function(P){return P.set(bt*St,Nt*St).floor()},this.setDrawingBufferSize=function(P,G,$){bt=P,Nt=G,St=$,e.width=Math.floor(P*$),e.height=Math.floor(G*$),this.setViewport(0,0,P,G)},this.setEffects=function(P){if(v===Rn){we("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let G=0;G<P.length;G++)if(P[G].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(at)},this.getViewport=function(P){return P.copy(kt)},this.setViewport=function(P,G,$,Z){P.isVector4?kt.set(P.x,P.y,P.z,P.w):kt.set(P,G,$,Z),wt.viewport(at.copy(kt).multiplyScalar(Ke()).round())},this.getScissor=function(P){return P.copy(st)},this.setScissor=function(P,G,$,Z){P.isVector4?st.set(P.x,P.y,P.z,P.w):st.set(P,G,$,Z),wt.scissor(Mt.copy(st).multiplyScalar(Ke()).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(P){wt.setScissorTest(Ht=P)},this.setOpaqueSort=function(P){Jt=P},this.setTransparentSort=function(P){Oe=P},this.getClearColor=function(P){return P.copy(B.getClearColor())},this.setClearColor=function(){B.setClearColor(...arguments)},this.getClearAlpha=function(){return B.getClearAlpha()},this.setClearAlpha=function(){B.setClearAlpha(...arguments)},this.clear=function(P=!0,G=!0,$=!0){let Z=0;if(P){let J=!1;if(it!==null){const ut=it.texture.format;J=u.has(ut)}if(J){const ut=it.texture.type,Pt=f.has(ut),ft=B.getClearColor(),Ct=B.getClearAlpha(),Bt=ft.r,ne=ft.g,de=ft.b;Pt?(S[0]=Bt,S[1]=ne,S[2]=de,S[3]=Ct,z.clearBufferuiv(z.COLOR,0,S)):(T[0]=Bt,T[1]=ne,T[2]=de,T[3]=Ct,z.clearBufferiv(z.COLOR,0,T))}else Z|=z.COLOR_BUFFER_BIT}G&&(Z|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),L=P},this.dispose=function(){e.removeEventListener("webglcontextlost",Wt,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),B.dispose(),Rt.dispose(),rt.dispose(),Qt.dispose(),Yt.dispose(),N.dispose(),pt.dispose(),q.dispose(),vt.dispose(),Vt.dispose(),lt.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",xn),ht.removeEventListener("sessionend",Ot),nn.stop()};function Wt(P){P.preventDefault(),Za("WebGLRenderer: Context Lost."),A=!0}function te(){Za("WebGLRenderer: Context Restored."),A=!1;const P=De.autoReset,G=Tt.enabled,$=Tt.autoUpdate,Z=Tt.needsUpdate,J=Tt.type;jt(),De.autoReset=P,Tt.enabled=G,Tt.autoUpdate=$,Tt.needsUpdate=Z,Tt.type=J}function xt(P){we("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function ee(P){const G=P.target;G.removeEventListener("dispose",ee),ye(G)}function ye(P){en(P),Yt.remove(P)}function en(P){const G=Yt.get(P).programs;G!==void 0&&(G.forEach(function($){lt.releaseProgram($)}),P.isShaderMaterial&&lt.releaseShaderCache(P))}this.renderBufferDirect=function(P,G,$,Z,J,ut){G===null&&(G=ze);const Pt=J.isMesh&&J.matrixWorld.determinantAffine()<0,ft=ms(P,G,$,Z,J);wt.setMaterial(Z,Pt);let Ct=$.index,Bt=1;if(Z.wireframe===!0){if(Ct=q.getWireframeAttribute($),Ct===void 0)return;Bt=2}const ne=$.drawRange,de=$.attributes.position;let mt=ne.start*Bt,ue=(ne.start+ne.count)*Bt;ut!==null&&(mt=Math.max(mt,ut.start*Bt),ue=Math.min(ue,(ut.start+ut.count)*Bt)),Ct!==null?(mt=Math.max(mt,0),ue=Math.min(ue,Ct.count)):de!=null&&(mt=Math.max(mt,0),ue=Math.min(ue,de.count));const qe=ue-mt;if(qe<0||qe===1/0)return;vt.setup(J,Z,ft,$,Ct);let Re,Ee=nt;if(Ct!==null&&(Re=C.get(Ct),Ee=yt,Ee.setIndex(Re)),J.isMesh)Z.wireframe===!0?(wt.setLineWidth(Z.wireframeLinewidth*Ke()),Ee.setMode(z.LINES)):Ee.setMode(z.TRIANGLES);else if(J.isLine){let sn=Z.linewidth;sn===void 0&&(sn=1),wt.setLineWidth(sn*Ke()),J.isLineSegments?Ee.setMode(z.LINES):J.isLineLoop?Ee.setMode(z.LINE_LOOP):Ee.setMode(z.LINE_STRIP)}else J.isPoints?Ee.setMode(z.POINTS):J.isSprite&&Ee.setMode(z.TRIANGLES);if(J.isBatchedMesh)if(ve.get("WEBGL_multi_draw"))Ee.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const sn=J._multiDrawStarts,zt=J._multiDrawCounts,Ve=J._multiDrawCount,he=Ct?C.get(Ct).bytesPerElement:1,si=Yt.get(Z).currentProgram.getUniforms();for(let We=0;We<Ve;We++)si.setValue(z,"_gl_DrawID",We),Ee.render(sn[We]/he,zt[We])}else if(J.isInstancedMesh)Ee.renderInstances(mt,qe,J.count);else if($.isInstancedBufferGeometry){const sn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,zt=Math.min($.instanceCount,sn);Ee.renderInstances(mt,qe,zt)}else Ee.render(mt,qe)};function Ni(P,G,$,Z){L!==null&&P.isNodeMaterial&&L.setObject(Z,P),Gt===!0&&ot.setState(P,$,!1),P.transparent===!0&&P.side===_n&&P.forceSinglePass===!1?(P.side=bn,P.needsUpdate=!0,Me(P,G,Z),P.side=Hi,P.needsUpdate=!0,Me(P,G,Z),P.side=_n):Me(P,G,Z)}this.compile=function(P,G,$=null){$===null&&($=P),L!==null&&L.renderStart(P,G,$),_=rt.get($),_.init(G),M.push(_),$.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(_.pushLight(J),J.castShadow&&_.pushShadow(J))}),P!==$&&P.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(_.pushLight(J),J.castShadow&&_.pushShadow(J))}),_.setupLights(),L!==null&&L.updateLights(_.state.lightsArray),ce=this.localClippingEnabled,Gt=ot.init(this.clippingPlanes,ce),Gt===!0&&ot.setGlobalState(this.clippingPlanes,G),L!==null&&Tt.render(_.state.shadowsArray,$,G);const Z=new Set;return P.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const ut=J.material;if(ut)if(Array.isArray(ut))for(let Pt=0;Pt<ut.length;Pt++){const ft=ut[Pt];Ni(ft,$,G,J),Z.add(ft)}else Ni(ut,$,G,J),Z.add(ut)}),_=M.pop(),L!==null&&L.renderEnd(),Z},this.compileAsync=function(P,G,$=null){const Z=this.compile(P,G,$);return new Promise(J=>{function ut(){if(Z.forEach(function(Pt){const Ct=Yt.get(Pt).currentProgram;(Ct===void 0||Ct.isReady())&&Z.delete(Pt)}),Z.size===0){J(P);return}setTimeout(ut,10)}ve.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Zi=null;function Ui(P){Zi&&Zi(P)}function xn(){nn.stop()}function Ot(){nn.start()}const nn=new mh;nn.setAnimationLoop(Ui),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(P){Zi=P,ht.setAnimationLoop(P),P===null?nn.stop():nn.start()},ht.addEventListener("sessionstart",xn),ht.addEventListener("sessionend",Ot),this.render=function(P,G){if(G!==void 0&&G.isCamera!==!0){we("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(P,G);const $=ht.enabled===!0&&ht.isPresenting===!0,Z=w!==null&&(it===null||$)&&w.begin(E,it);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(G),G=ht.getCamera()),P.isScene===!0&&P.onBeforeRender(E,P,G,it),_=rt.get(P,M.length),_.init(G),_.state.textureUnits=Qt.getTextureUnits(),M.push(_),$t.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?At.setFromArrayCamera(G):se.setFromProjectionMatrix($t,Vn,G.reversedDepth),ce=this.localClippingEnabled,Gt=ot.init(this.clippingPlanes,ce),y=Rt.get(P,d.length),y.init(),d.push(y),this.info.render.frame++,ht.enabled===!0&&ht.isPresenting===!0){const Pt=E.xr.getDepthSensingMesh();Pt!==null&&Zt(Pt,G,-1/0,E.sortObjects)}Zt(P,G,0,E.sortObjects),y.finish(),L!==null&&L.updateLights(_.state.lightsArray),E.sortObjects===!0&&y.sort(Jt,Oe),Ge=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,Ge&&B.addToRenderList(y,P),this.info.autoReset===!0&&this.info.reset(),Gt===!0&&ot.beginShadows();const J=_.state.shadowsArray;if(Tt.render(J,P,G),Gt===!0&&ot.endShadows(),(Z&&w.hasRenderPass())===!1){const Pt=y.opaque,ft=y.transmissive;if(_.setupLights(),G.isArrayCamera){const Ct=G.cameras;if(ft.length>0)for(let Bt=0,ne=Ct.length;Bt<ne;Bt++){const de=Ct[Bt];Ki(Pt,ft,P,de)}Ge&&B.render(P);for(let Bt=0,ne=Ct.length;Bt<ne;Bt++){const de=Ct[Bt];Nn(y,P,de,de.viewport)}}else ft.length>0&&Ki(Pt,ft,P,G),Ge&&B.render(P),Nn(y,P,G)}it!==null&&W===0&&(Qt.updateMultisampleRenderTarget(it),Qt.updateRenderTargetMipmap(it)),Z&&w.end(E),P.isScene===!0&&P.onAfterRender(E,P,G),vt.resetDefaultState(),Y=-1,tt=null,M.pop(),M.length>0?(_=M[M.length-1],Qt.setTextureUnits(_.state.textureUnits),Gt===!0&&ot.setGlobalState(E.clippingPlanes,_.state.camera)):_=null,d.pop(),d.length>0?y=d[d.length-1]:y=null,L!==null&&L.renderEnd()};function Zt(P,G,$,Z){if(P.visible===!1)return;if(P.layers.test(G.layers)){if(P.isGroup)$=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(G);else if(P.isLight)_.pushLight(P),P.castShadow&&_.pushShadow(P);else if(P.isSprite){const Pt=G.isArrayCamera?At:se;if(!P.frustumCulled||P.intersectsFrustum(Pt)){Z&&Ae.setFromMatrixPosition(P.matrixWorld).applyMatrix4($t);const ft=pt.update(P),Ct=P.material;Ct.visible&&y.push(P,ft,Ct,$,Ae.z,null,G)}}else if(P.isMesh||P.isLine||P.isPoints){const Pt=G.isArrayCamera?At:se;if(!P.frustumCulled||P.intersectsFrustum(Pt)){const ft=pt.update(P),Ct=P.material;if(Z&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Ae.copy(P.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ae.copy(ft.boundingSphere.center)),Ae.applyMatrix4(P.matrixWorld).applyMatrix4($t)),Array.isArray(Ct)){const Bt=ft.groups;for(let ne=0,de=Bt.length;ne<de;ne++){const mt=Bt[ne],ue=Ct[mt.materialIndex];ue&&ue.visible&&y.push(P,ft,ue,$,Ae.z,mt,G)}}else Ct.visible&&y.push(P,ft,Ct,$,Ae.z,null,G)}}}const ut=P.children;for(let Pt=0,ft=ut.length;Pt<ft;Pt++)Zt(ut[Pt],G,$,Z)}function Nn(P,G,$,Z){const{opaque:J,transmissive:ut,transparent:Pt}=P;_.setupLightsView($),Gt===!0&&ot.setGlobalState(E.clippingPlanes,$),Z&&wt.viewport(at.copy(Z)),J.length>0&&Xn(J,G,$),ut.length>0&&Xn(ut,G,$),Pt.length>0&&Xn(Pt,G,$),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Ki(P,G,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[Z.id]===void 0){const mt=ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[Z.id]=new ti(1,1,{generateMipmaps:!0,type:mt?ni:Rn,minFilter:Ai,samples:Math.max(4,be.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_e.workingColorSpace})}const ut=_.state.transmissionRenderTarget[Z.id],Pt=Z.viewport||at;ut.setSize(Pt.z*E.transmissionResolutionScale,Pt.w*E.transmissionResolutionScale);const ft=E.getRenderTarget(),Ct=E.getActiveCubeFace(),Bt=E.getActiveMipmapLevel();E.setRenderTarget(ut),E.getClearColor(Q),_t=E.getClearAlpha(),_t<1&&E.setClearColor(16777215,.5),E.clear(),Ge&&B.render($);const ne=E.toneMapping;E.toneMapping=gi;const de=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),_.setupLightsView(Z),Gt===!0&&ot.setGlobalState(E.clippingPlanes,Z),Xn(P,$,Z),Qt.updateMultisampleRenderTarget(ut),Qt.updateRenderTargetMipmap(ut),ve.has("WEBGL_multisampled_render_to_texture")===!1){let mt=!1;for(let ue=0,qe=G.length;ue<qe;ue++){const Re=G[ue],{object:Ee,geometry:sn,material:zt,group:Ve}=Re;if(zt.side===_n&&Ee.layers.test(Z.layers)){const he=zt.side;zt.side=bn,zt.needsUpdate=!0,vi(Ee,$,Z,sn,zt,Ve),zt.side=he,zt.needsUpdate=!0,mt=!0}}mt===!0&&(Qt.updateMultisampleRenderTarget(ut),Qt.updateRenderTargetMipmap(ut))}E.setRenderTarget(ft,Ct,Bt),E.setClearColor(Q,_t),de!==void 0&&(Z.viewport=de),E.toneMapping=ne}function Xn(P,G,$){const Z=G.isScene===!0?G.overrideMaterial:null;for(let J=0,ut=P.length;J<ut;J++){const Pt=P[J],{object:ft,geometry:Ct,group:Bt}=Pt;let ne=Pt.material;ne.allowOverride===!0&&Z!==null&&(ne=Z),ft.layers.test($.layers)&&vi(ft,G,$,Ct,ne,Bt)}}function vi(P,G,$,Z,J,ut){L!==null&&J.isNodeMaterial&&L.setObject(P,J),P.onBeforeRender(E,G,$,Z,J,ut),P.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),J.onBeforeRender(E,G,$,Z,P,ut),J.transparent===!0&&J.side===_n&&J.forceSinglePass===!1?(J.side=bn,J.needsUpdate=!0,E.renderBufferDirect($,G,Z,J,P,ut),J.side=Hi,J.needsUpdate=!0,E.renderBufferDirect($,G,Z,J,P,ut),J.side=_n):E.renderBufferDirect($,G,Z,J,P,ut),P.onAfterRender(E,G,$,Z,J,ut)}function Xe(P){let G=0;for(const $ of P)$.texture!==null&&G++;return G}function Me(P,G,$){G.isScene!==!0&&(G=ze);const Z=Yt.get(P),J=_.state.lights,ut=_.state.shadowsArray,Pt=J.state.version,ft=lt.getParameters(P,J.state,ut,G,$,_.state.lightProbeGridArray),Ct=lt.getProgramCacheKey(ft);let Bt=Z.programs;Z.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?G.environment:null,Z.fog=G.fog;const ne=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;Z.envMap=N.get(P.envMap||Z.environment,ne),Z.envMapRotation=Z.environment!==null&&P.envMap===null?G.environmentRotation:P.envMapRotation,Bt===void 0&&(P.addEventListener("dispose",ee),Bt=new Map,Z.programs=Bt,Z.programVariants=new Map);let de=Bt.get(Ct);if(de!==void 0){if(Z.currentProgram===de&&Z.lightsStateVersion===Pt)return Yn(P,ft),de}else ft.uniforms=lt.getUniforms(P),L!==null&&P.isNodeMaterial&&L.build(P,$,ft),P.onBeforeCompile(ft,E),de=lt.acquireProgram(ft,Ct),Bt.set(Ct,de),Z.uniforms=ft.uniforms;const mt=Z.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(mt.clippingPlanes=ot.uniform),Yn(P,ft),Z.needsLights=$i(P),Z.lightsStateVersion=Pt,Z.needsLights&&(mt.ambientLightColor.value=J.state.ambient,mt.lightProbe.value=J.state.probe,mt.sunLights.value=J.state.sun,mt.sunLightShadows.value=J.state.sunShadow,mt.directionalLights.value=J.state.directional,mt.directionalLightShadows.value=J.state.directionalShadow,mt.spotLights.value=J.state.spot,mt.spotLightShadows.value=J.state.spotShadow,mt.rectAreaLights.value=J.state.rectArea,mt.ltc_1.value=J.state.rectAreaLTC1,mt.ltc_2.value=J.state.rectAreaLTC2,mt.pointLights.value=J.state.point,mt.pointLightShadows.value=J.state.pointShadow,mt.hemisphereLights.value=J.state.hemi,mt.sunShadowMatrix.value=J.state.sunShadowMatrix,mt.sunShadowCascade.value=J.state.sunShadowCascade,mt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,mt.spotLightMatrix.value=J.state.spotLightMatrix,mt.spotLightMap.value=J.state.spotLightMap,mt.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.numLightProbeGrids=Xe(_.state.lightProbeGridArray),Z.currentProgram=de,Z.uniformsList=null,de}function Ue(P,G,$,Z,J){const ut=Yt.get(P),Pt=ut.currentProgram.id+","+Z+","+J;let ft=ut.programVariants.get(Pt);return ft===void 0?(ft=Me(P,G,$),ut.programVariants.set(Pt,ft)):(ut.currentProgram=ft,ut.uniformsList=null,ut.outputColorSpace=Z,ut.toneMapping=J),ft}function Un(P){if(P.uniformsList===null){const G=P.currentProgram.getUniforms();P.uniformsList=io.seqWithValue(G.seq,P.uniforms)}return P.uniformsList}function Yn(P,G){const $=Yt.get(P);$.outputColorSpace=G.outputColorSpace,$.batching=G.batching,$.batchingColor=G.batchingColor,$.instancing=G.instancing,$.instancingColor=G.instancingColor,$.instancingMorph=G.instancingMorph,$.skinning=G.skinning,$.morphTargets=G.morphTargets,$.morphNormals=G.morphNormals,$.morphColors=G.morphColors,$.morphTargetsCount=G.morphTargetsCount,$.numClippingPlanes=G.numClippingPlanes,$.numIntersection=G.numClipIntersection,$.vertexAlphas=G.vertexAlphas,$.vertexTangents=G.vertexTangents,$.toneMapping=G.toneMapping}function ms(P,G,$,Z,J){G.isScene!==!0&&(G=ze),Qt.resetTextureUnits();const ut=G.fog,Pt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?G.environment:null,ft=it===null?E.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:_e.workingColorSpace,Ct=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Bt=N.get(Z.envMap||Pt,Ct),ne=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,de=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),mt=!!$.morphAttributes.position,ue=!!$.morphAttributes.normal,qe=!!$.morphAttributes.color;let Re=gi;Z.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Re=E.toneMapping);const Ee=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,sn=Ee!==void 0?Ee.length:0,zt=Yt.get(Z),Ve=_.state.lights;if(Gt===!0&&(ce===!0||P!==tt)){const ke=P===tt&&Z.id===Y;ot.setState(Z,P,ke)}let he=!1,si=!1;Z.version===zt.__version?zt.needsLights&&zt.lightsStateVersion!==Ve.state.version||J.isBatchedMesh&&zt.batching===!1||!J.isBatchedMesh&&zt.batching===!0||J.isBatchedMesh&&zt.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&zt.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&zt.instancing===!1||!J.isInstancedMesh&&zt.instancing===!0||J.isSkinnedMesh&&zt.skinning===!1||!J.isSkinnedMesh&&zt.skinning===!0||J.isInstancedMesh&&zt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&zt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&zt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&zt.instancingMorph===!1&&J.morphTexture!==null||zt.envMap!==Bt||Z.fog===!0&&zt.fog!==ut||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ot.numPlanes||zt.numIntersection!==ot.numIntersection)||zt.vertexAlphas!==ne||zt.vertexTangents!==de||zt.morphTargets!==mt||zt.morphNormals!==ue||zt.morphColors!==qe||zt.morphTargetsCount!==sn||zt.numLightProbeGrids!==Xe(_.state.lightProbeGridArray)?he=!0:(zt.outputColorSpace!==ft||zt.toneMapping!==Re)&&(si=!0):(he=!0,zt.__version=Z.version);let We=zt.currentProgram;(he===!0||si===!0)&&(We=si===!0?Ue(Z,G,J,ft,Re):Me(Z,G,J),L&&Z.isNodeMaterial&&L.onUpdateProgram(Z,We,zt));let Qi=!1,qn=!1,ri=!1;const ge=We.getUniforms(),$e=zt.uniforms;if(wt.useProgram(We.program)&&(Qi=!0,qn=!0,ri=!0),Z.id!==Y&&(Y=Z.id,qn=!0),Qi||tt!==P){wt.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),ge.setValue(z,"projectionMatrix",P.projectionMatrix),ge.setValue(z,"viewMatrix",P.matrixWorldInverse);const Je=ge.map.cameraPosition;Je!==void 0&&Je.setValue(z,Se.setFromMatrixPosition(P.matrixWorld)),be.logarithmicDepthBuffer&&ge.setValue(z,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ge.setValue(z,"isOrthographic",P.isOrthographicCamera===!0),tt!==P&&(tt=P,qn=!0,ri=!0)}if(zt.needsLights&&(Ve.state.sunShadowMap.length>0&&ge.setValue(z,"sunShadowMap",Ve.state.sunShadowMap,Qt),Ve.state.directionalShadowMap.length>0&&ge.setValue(z,"directionalShadowMap",Ve.state.directionalShadowMap,Qt),Ve.state.spotShadowMap.length>0&&ge.setValue(z,"spotShadowMap",Ve.state.spotShadowMap,Qt),Ve.state.pointShadowMap.length>0&&ge.setValue(z,"pointShadowMap",Ve.state.pointShadowMap,Qt)),J.isSkinnedMesh){ge.setOptional(z,J,"bindMatrix"),ge.setOptional(z,J,"bindMatrixInverse");const ke=J.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),ge.setValue(z,"boneTexture",ke.boneTexture,Qt))}J.isBatchedMesh&&(ge.setOptional(z,J,"batchingTexture"),ge.setValue(z,"batchingTexture",J._matricesTexture,Qt),ge.setOptional(z,J,"batchingIdTexture"),ge.setValue(z,"batchingIdTexture",J._indirectTexture,Qt),ge.setOptional(z,J,"batchingColorTexture"),J._colorsTexture!==null&&ge.setValue(z,"batchingColorTexture",J._colorsTexture,Qt));const wn=$.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&K.update(J,$,We),(qn||zt.receiveShadow!==J.receiveShadow)&&(zt.receiveShadow=J.receiveShadow,ge.setValue(z,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&G.environment!==null&&($e.envMapIntensity.value=G.environmentIntensity),$e.dfgLUT!==void 0&&($e.dfgLUT.value=Pg()),qn){if(ge.setValue(z,"toneMappingExposure",E.toneMappingExposure),zt.needsLights&&Ji($e,ri),ut&&Z.fog===!0&&ct.refreshFogUniforms($e,ut),ct.refreshMaterialUniforms($e,Z,St,Nt,_.state.transmissionRenderTarget[P.id]),zt.needsLights&&zt.numLightProbeGrids>0){const ke=R;let Je=0;for(const Fn of _.state.lightProbeGridArray)Fn.texture!==null&&(ke.textures[Je]=Fn.texture,ke.min[Je]=Fn.boundingBox.min,ke.max[Je]=Fn.boundingBox.max,ke.resolution[Je]=Fn.resolution,Je++);for(const Fn in ke)ke[Fn].length=Je;$e.probesSH.value=ke.textures,$e.probesMin.value=ke.min,$e.probesMax.value=ke.max,$e.probesResolution.value=ke.resolution}io.upload(z,Un(zt),$e,Qt)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(io.upload(z,Un(zt),$e,Qt),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ge.setValue(z,"center",J.center),ge.setValue(z,"modelViewMatrix",J.modelViewMatrix),ge.setValue(z,"normalMatrix",J.normalMatrix),ge.setValue(z,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){const ke=Z.uniformsGroups;for(let Je=0,Fn=ke.length;Je<Fn;Je++){const oi=ke[Je];Vt.update(oi,We),Vt.bind(oi,We)}}return We}function Ji(P,G){P.ambientLightColor.needsUpdate=G,P.lightProbe.needsUpdate=G,P.sunLights.needsUpdate=G,P.sunLightShadows.needsUpdate=G,P.directionalLights.needsUpdate=G,P.directionalLightShadows.needsUpdate=G,P.pointLights.needsUpdate=G,P.pointLightShadows.needsUpdate=G,P.spotLights.needsUpdate=G,P.spotLightShadows.needsUpdate=G,P.rectAreaLights.needsUpdate=G,P.hemisphereLights.needsUpdate=G}function $i(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(P,G,$){const Z=Yt.get(P);Z.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Yt.get(P.texture).__webglTexture=G,Yt.get(P.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:$,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,G){const $=Yt.get(P);$.__webglFramebuffer=G,$.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(P,G=0,$=0){it=P,H=G,W=$;let Z=null,J=!1,ut=!1;if(P){const ft=Yt.get(P);if(ft.__useDefaultFramebuffer!==void 0){wt.bindFramebuffer(z.FRAMEBUFFER,ft.__webglFramebuffer),at.copy(P.viewport),Mt.copy(P.scissor),Lt=P.scissorTest,wt.viewport(at),wt.scissor(Mt),wt.setScissorTest(Lt),Y=-1;return}else if(ft.__webglFramebuffer===void 0)Qt.setupRenderTarget(P);else if(ft.__hasExternalTextures)Qt.rebindTextures(P,Yt.get(P.texture).__webglTexture,Yt.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const ne=P.depthTexture;if(ft.__boundDepthTexture!==ne){if(ne!==null&&Yt.has(ne)&&(P.width!==ne.image.width||P.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Qt.setupDepthRenderbuffer(P)}}const Ct=P.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ut=!0);const Bt=Yt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Bt[G])?Z=Bt[G][$]:Z=Bt[G],J=!0):P.samples>0&&Qt.useMultisampledRTT(P)===!1?Z=Yt.get(P).__webglMultisampledFramebuffer:Array.isArray(Bt)?Z=Bt[$]:Z=Bt,at.copy(P.viewport),Mt.copy(P.scissor),Lt=P.scissorTest}else at.copy(kt).multiplyScalar(St).floor(),Mt.copy(st).multiplyScalar(St).floor(),Lt=Ht;if($!==0&&(Z=U),wt.bindFramebuffer(z.FRAMEBUFFER,Z)&&wt.drawBuffers(P,Z),wt.viewport(at),wt.scissor(Mt),wt.setScissorTest(Lt),J){const ft=Yt.get(P.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,ft.__webglTexture,$)}else if(ut){const ft=G;for(let Ct=0;Ct<P.textures.length;Ct++){const Bt=Yt.get(P.textures[Ct]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ct,Bt.__webglTexture,$,ft)}}else if(P!==null&&$!==0){const ft=Yt.get(P.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ft.__webglTexture,$)}Y=-1};function Ys(P){const G=Yt.get(P);return(G.__readFormat!==P.format||G.__readType!==P.type)&&(G.__readFormat=P.format,G.__readType=P.type,G.__formatReadable=be.textureFormatReadable(P.format),G.__typeReadable=be.textureTypeReadable(P.type)),G}this.readRenderTargetPixels=function(P,G,$,Z,J,ut,Pt,ft=0){if(!(P&&P.isWebGLRenderTarget)){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Yt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ct=Ct[Pt],Array.isArray(Ct)&&(Ct=Ct[0])),Ct){wt.bindFramebuffer(z.FRAMEBUFFER,Ct);try{const Bt=P.textures[ft],ne=Bt.format,de=Bt.type;P.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ft);const mt=Ys(Bt);if(mt.__formatReadable===!1){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(mt.__typeReadable===!1){we("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=P.width-Z&&$>=0&&$<=P.height-J&&z.readPixels(G,$,Z,J,dt.convert(ne),dt.convert(de),ut)}finally{const Bt=it!==null?Yt.get(it).__webglFramebuffer:null;wt.bindFramebuffer(z.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(P,G,$,Z,J,ut,Pt,ft=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Yt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ct=Ct[Pt],Array.isArray(Ct)&&(Ct=Ct[0])),Ct)if(G>=0&&G<=P.width-Z&&$>=0&&$<=P.height-J){wt.bindFramebuffer(z.FRAMEBUFFER,Ct);const Bt=P.textures[ft],ne=Bt.format,de=Bt.type;P.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ft);const mt=Ys(Bt);if(mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ue=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ue),z.bufferData(z.PIXEL_PACK_BUFFER,ut.byteLength,z.STREAM_READ),z.readPixels(G,$,Z,J,dt.convert(ne),dt.convert(de),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const qe=it!==null?Yt.get(it).__webglFramebuffer:null;wt.bindFramebuffer(z.FRAMEBUFFER,qe);const Re=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Wh(z,Re,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ue),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ut),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(ue),z.deleteSync(Re),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,G=null,$=0){const Z=Math.pow(2,-$),J=Math.floor(P.image.width*Z),ut=Math.floor(P.image.height*Z),Pt=G!==null?G.x:0,ft=G!==null?G.y:0;Qt.setTexture2D(P,0),z.copyTexSubImage2D(z.TEXTURE_2D,$,0,0,Pt,ft,J,ut),wt.unbindTexture()},this.copyTextureToTexture=function(P,G,$=null,Z=null,J=0,ut=0){let Pt,ft,Ct,Bt,ne,de,mt,ue,qe;const Re=P.isCompressedTexture?P.mipmaps[ut]:P.image;if($!==null)Pt=$.max.x-$.min.x,ft=$.max.y-$.min.y,Ct=$.isBox3?$.max.z-$.min.z:1,Bt=$.min.x,ne=$.min.y,de=$.isBox3?$.min.z:0;else{const ge=Math.pow(2,-J);Pt=Math.floor(Re.width*ge),ft=Math.floor(Re.height*ge),P.isDataArrayTexture?Ct=Re.depth:P.isData3DTexture?Ct=Math.floor(Re.depth*ge):Ct=1,Bt=0,ne=0,de=0}Z!==null?(mt=Z.x,ue=Z.y,qe=Z.z):(mt=0,ue=0,qe=0);const Ee=dt.convert(G.format),sn=dt.convert(G.type);let zt;G.isData3DTexture?(Qt.setTexture3D(G,0),zt=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Qt.setTexture2DArray(G,0),zt=z.TEXTURE_2D_ARRAY):(Qt.setTexture2D(G,0),zt=z.TEXTURE_2D),wt.activeTexture(z.TEXTURE0),wt.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),wt.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),wt.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const Ve=wt.getParameter(z.UNPACK_ROW_LENGTH),he=wt.getParameter(z.UNPACK_IMAGE_HEIGHT),si=wt.getParameter(z.UNPACK_SKIP_PIXELS),We=wt.getParameter(z.UNPACK_SKIP_ROWS),Qi=wt.getParameter(z.UNPACK_SKIP_IMAGES);wt.pixelStorei(z.UNPACK_ROW_LENGTH,Re.width),wt.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Re.height),wt.pixelStorei(z.UNPACK_SKIP_PIXELS,Bt),wt.pixelStorei(z.UNPACK_SKIP_ROWS,ne),wt.pixelStorei(z.UNPACK_SKIP_IMAGES,de);const qn=P.isDataArrayTexture||P.isData3DTexture,ri=G.isDataArrayTexture||G.isData3DTexture;if(P.isDepthTexture){const ge=Yt.get(P),$e=Yt.get(G),wn=Yt.get(ge.__renderTarget),ke=Yt.get($e.__renderTarget);wt.bindFramebuffer(z.READ_FRAMEBUFFER,wn.__webglFramebuffer),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,ke.__webglFramebuffer);for(let Je=0;Je<Ct;Je++)qn&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Yt.get(P).__webglTexture,J,de+Je),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Yt.get(G).__webglTexture,ut,qe+Je)),z.blitFramebuffer(Bt,ne,Bt+Pt,ne+ft,mt,ue,mt+Pt,ue+ft,z.DEPTH_BUFFER_BIT,z.NEAREST);wt.bindFramebuffer(z.READ_FRAMEBUFFER,null),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(J!==0||P.isRenderTargetTexture||Yt.has(P)){const ge=Yt.get(P),$e=Yt.get(G);wt.bindFramebuffer(z.READ_FRAMEBUFFER,I),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,k);for(let wn=0;wn<Ct;wn++)qn?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ge.__webglTexture,J,de+wn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ge.__webglTexture,J),ri?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,$e.__webglTexture,ut,qe+wn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,$e.__webglTexture,ut),J!==0?z.blitFramebuffer(Bt,ne,Bt+Pt,ne+ft,mt,ue,mt+Pt,ue+ft,z.COLOR_BUFFER_BIT,z.NEAREST):ri?z.copyTexSubImage3D(zt,ut,mt,ue,qe+wn,Bt,ne,Pt,ft):z.copyTexSubImage2D(zt,ut,mt,ue,Bt,ne,Pt,ft);wt.bindFramebuffer(z.READ_FRAMEBUFFER,null),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ri?P.isDataTexture||P.isData3DTexture?z.texSubImage3D(zt,ut,mt,ue,qe,Pt,ft,Ct,Ee,sn,Re.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(zt,ut,mt,ue,qe,Pt,ft,Ct,Ee,Re.data):z.texSubImage3D(zt,ut,mt,ue,qe,Pt,ft,Ct,Ee,sn,Re):P.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,ut,mt,ue,Pt,ft,Ee,sn,Re.data):P.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,ut,mt,ue,Re.width,Re.height,Ee,Re.data):z.texSubImage2D(z.TEXTURE_2D,ut,mt,ue,Pt,ft,Ee,sn,Re);wt.pixelStorei(z.UNPACK_ROW_LENGTH,Ve),wt.pixelStorei(z.UNPACK_IMAGE_HEIGHT,he),wt.pixelStorei(z.UNPACK_SKIP_PIXELS,si),wt.pixelStorei(z.UNPACK_SKIP_ROWS,We),wt.pixelStorei(z.UNPACK_SKIP_IMAGES,Qi),ut===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&z.generateMipmap(zt),wt.unbindTexture()},this.initRenderTarget=function(P){Yt.get(P).__webglFramebuffer===void 0&&Qt.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?Qt.setTextureCube(P,0):P.isData3DTexture?Qt.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?Qt.setTexture2DArray(P,0):Qt.setTexture2D(P,0),wt.unbindTexture()},this.resetState=function(){H=0,W=0,it=null,wt.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=_e._getDrawingBufferColorSpace(t),e.unpackColorSpace=_e._getUnpackColorSpace()}}const Kr=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Qo,AddEquation:as,AddOperation:Au,AdditiveBlending:pr,AgXToneMapping:cl,AlphaFormat:gl,AlwaysCompare:Ml,AlwaysDepth:ro,AlwaysStencilFunc:Lu,ArcCurve:$u,ArrayCamera:fh,BackSide:bn,BasicDepthPacking:Cu,Box3:Xi,BoxGeometry:on,BufferAttribute:En,BufferGeometry:an,ByteType:fl,Camera:zl,CanvasTexture:$a,CatmullRomCurve3:Qu,CineonToneMapping:al,ClampToEdgeWrapping:mi,Color:oe,ColorManagement:_e,ConeGeometry:_i,ConstantAlphaFactor:Eu,ConstantColorFactor:yu,Controls:ph,CubeCamera:Zo,CubeDepthTexture:Dl,CubeReflectionMapping:fs,CubeRefractionMapping:Os,CubeTexture:Ll,CubicBezierCurve:ju,CubicBezierCurve3:th,CullFaceBack:Wa,CullFaceFront:ou,CullFaceNone:ru,Curve:xi,CustomBlending:lu,CustomToneMapping:ll,CylinderGeometry:Wn,Data3DTexture:Xu,DataArrayTexture:El,DataTexture:Al,DepthFormat:Li,DepthStencilFormat:Ri,DepthTexture:ps,DirectionalLight:Qa,DoubleSide:_n,DstAlphaFactor:_u,DstColorFactor:vu,DynamicDrawUsage:Sl,EllipseCurve:Nl,EqualCompare:Nu,EqualDepth:ao,EquirectangularReflectionMapping:Qr,EquirectangularRefractionMapping:jr,Euler:ii,EventDispatcher:Ii,ExternalTexture:Il,Float32BufferAttribute:Ne,FloatType:Hn,FogExp2:la,FrontSide:Hi,Frustum:Gs,FrustumArray:ca,GLSL3:qa,GreaterCompare:Uu,GreaterDepth:co,GreaterEqualCompare:vl,GreaterEqualDepth:lo,Group:In,HalfFloatType:ni,HemisphereLight:uh,IcosahedronGeometry:ha,ImageUtils:Vu,InstancedBufferAttribute:Ka,InstancedMesh:Rl,IntType:jo,KeepStencilOp:eo,Layers:aa,LessCompare:Iu,LessDepth:oo,LessEqualCompare:xl,LessEqualDepth:Fs,Light:Bl,LightShadow:hh,Line:Zu,LineBasicMaterial:Cl,LineCurve:eh,LineCurve3:nh,LineSegments:Ku,LinearFilter:yn,LinearMipmapLinearFilter:Ai,LinearMipmapNearestFilter:to,LinearSRGBColorSpace:_r,LinearToneMapping:rl,LinearTransfer:xr,MOUSE:us,Material:qi,MathUtils:Qn,Matrix3:ie,Matrix4:xe,MaxEquation:fu,Mesh:Te,MeshBasicMaterial:di,MeshDepthMaterial:lh,MeshDistanceMaterial:ch,MeshStandardMaterial:Hs,MinEquation:hu,MirroredRepeatWrapping:fo,MixOperation:Tu,MultiplyBlending:Ya,MultiplyOperation:sl,NearestFilter:hn,NearestMipmapLinearFilter:nr,NearestMipmapNearestFilter:Ru,NeutralToneMapping:ul,NeverCompare:Du,NeverDepth:so,NoBlending:hs,NoColorSpace:Ti,NoToneMapping:gi,NormalBlending:Ns,NotEqualCompare:Fu,NotEqualDepth:uo,Object3D:tn,ObjectSpaceNormalMap:Pu,OneFactor:pu,OneMinusConstantAlphaFactor:wu,OneMinusConstantColorFactor:bu,OneMinusDstAlphaFactor:xu,OneMinusDstColorFactor:Mu,OneMinusSrcAlphaFactor:il,OneMinusSrcColorFactor:gu,OrthographicCamera:Gl,PCFShadowMap:sr,PCFSoftShadowMap:au,PMREMGenerator:Sr,PerspectiveCamera:Gn,Plane:fi,PlaneGeometry:Di,Points:Ju,PointsMaterial:Pl,PolyhedronGeometry:ua,QuadraticBezierCurve:ih,QuadraticBezierCurve3:Fl,Quaternion:Cn,R11_EAC_Format:So,RED_GREEN_RGTC2_Format:gr,RED_RGTC1_Format:ko,REVISION:$o,RG11_EAC_Format:mr,RGBAFormat:jn,RGBAIntegerFormat:ra,RGBA_ASTC_10x10_Format:Uo,RGBA_ASTC_10x5_Format:Do,RGBA_ASTC_10x6_Format:Io,RGBA_ASTC_10x8_Format:No,RGBA_ASTC_12x10_Format:Fo,RGBA_ASTC_12x12_Format:Oo,RGBA_ASTC_4x4_Format:Eo,RGBA_ASTC_5x4_Format:wo,RGBA_ASTC_5x5_Format:To,RGBA_ASTC_6x5_Format:Ao,RGBA_ASTC_6x6_Format:Ro,RGBA_ASTC_8x5_Format:Co,RGBA_ASTC_8x6_Format:Po,RGBA_ASTC_8x8_Format:Lo,RGBA_BPTC_Format:Bo,RGBA_ETC2_EAC_Format:Mo,RGBA_PVRTC_2BPPV1_Format:_o,RGBA_PVRTC_4BPPV1_Format:go,RGBA_S3TC_DXT1_Format:or,RGBA_S3TC_DXT3_Format:ar,RGBA_S3TC_DXT5_Format:lr,RGBFormat:_l,RGB_BPTC_SIGNED_Format:zo,RGB_BPTC_UNSIGNED_Format:Go,RGB_ETC1_Format:xo,RGB_ETC2_Format:vo,RGB_PVRTC_2BPPV1_Format:mo,RGB_PVRTC_4BPPV1_Format:po,RGB_S3TC_DXT1_Format:rr,RGFormat:Vi,RGIntegerFormat:sa,RawShaderMaterial:ah,Ray:Ws,Raycaster:dh,RedFormat:na,RedIntegerFormat:ia,ReinhardToneMapping:ol,RenderTarget:Wu,RepeatWrapping:ho,ReverseSubtractEquation:uu,RingGeometry:Mr,SIGNED_R11_EAC_Format:yo,SIGNED_RED_GREEN_RGTC2_Format:Vo,SIGNED_RED_RGTC1_Format:Ho,SIGNED_RG11_EAC_Format:bo,SRGBColorSpace:Sn,SRGBTransfer:Ie,Scene:qu,ShaderChunk:le,ShaderLib:$n,ShaderMaterial:Wi,ShortType:dl,Sphere:Yi,SphereGeometry:ki,Spherical:tl,SplineCurve:sh,SrcAlphaFactor:nl,SrcAlphaSaturateFactor:Su,SrcColorFactor:mu,StaticDrawUsage:Ou,SubtractEquation:cu,SubtractiveBlending:Xa,TOUCH:cs,TangentSpaceNormalMap:Wo,Texture:pn,TextureSource:oa,TorusGeometry:Pi,Triangle:kn,TubeGeometry:Ol,UVMapping:hl,Uint16BufferAttribute:wl,Uint32BufferAttribute:Tl,UniformsLib:Dt,UniformsUtils:oh,UnsignedByteType:Rn,UnsignedInt101111Type:ml,UnsignedInt248Type:ds,UnsignedInt5999Type:pl,UnsignedIntType:ei,UnsignedShort4444Type:ta,UnsignedShort5551Type:ea,UnsignedShortType:Bs,VSMShadowMap:Is,Vector2:Ft,Vector3:O,Vector4:Ye,WebGLCoordinateSystem:Vn,WebGLCubeRenderTarget:fa,WebGLRenderTarget:ti,WebGLRenderer:Ah,WebGLUtils:wh,WebGPUCoordinateSystem:zs,WebXRController:no,ZeroFactor:du,createCanvasElement:Bu,error:we,log:Za,warn:Kt,warnOnce:cr},Symbol.toStringTag,{value:"Module"})),tu={type:"change"},kl={type:"start"},Rh={type:"end"},Jr=new Ws,eu=new fi,Lg=Math.cos(70*Qn.DEG2RAD),rn=new O,An=2*Math.PI,Le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Va=1e-6;class Dg extends ph{constructor(t,e=null){super(t,e),this.state=Le.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:us.ROTATE,MIDDLE:us.DOLLY,RIGHT:us.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Cn,this._lastTargetPosition=new O,this._quat=new Cn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tl,this._sphericalDelta=new tl,this._scale=1,this._panOffset=new O,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new O,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ng.bind(this),this._onPointerDown=Ig.bind(this),this._onPointerUp=Ug.bind(this),this._onContextMenu=Hg.bind(this),this._onMouseWheel=Bg.bind(this),this._onKeyDown=zg.bind(this),this._onTouchStart=Gg.bind(this),this._onTouchMove=kg.bind(this),this._onMouseDown=Fg.bind(this),this._onMouseMove=Og.bind(this),this._interceptControlDown=Vg.bind(this),this._interceptControlUp=Wg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Le.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(tu),this.update(),this.state=Le.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;rn.copy(e).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===Le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=An:n>Math.PI&&(n-=An),s<-Math.PI?s+=An:s>Math.PI&&(s-=An),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),e.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=rn.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new O(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Jr.origin.copy(this.object.position),Jr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Jr.direction))<Lg?this.object.lookAt(this.target):(eu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Jr.intersectPlane(eu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Va||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Va||this._lastTargetPosition.distanceToSquared(this.target)>Va?(this.dispatchEvent(tu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?An/60*this.autoRotateSpeed*t:An/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){rn.setFromMatrixColumn(e,0),rn.multiplyScalar(-t),this._panOffset.add(rn)}_panUp(t,e){this.screenSpacePanning===!0?rn.setFromMatrixColumn(e,1):(rn.setFromMatrixColumn(e,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(t),this._panOffset.add(rn)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Ig(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Ng(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ug(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rh),this.state=Le.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Fg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Le.DOLLY;break;case us.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Le.ROTATE}break;case us.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Le.PAN}break;default:this.state=Le.NONE}this.state!==Le.NONE&&this.dispatchEvent(kl)}function Og(i){switch(this.state){case Le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Bg(i){this.enabled===!1||this.enableZoom===!1||this.state!==Le.NONE||(i.preventDefault(),this.dispatchEvent(kl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Rh))}function zg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Gg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1){this.state=Le.NONE;break}this._handleTouchStartRotate(i),this.state=Le.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1){this.state=Le.NONE;break}this._handleTouchStartPan(i),this.state=Le.TOUCH_PAN;break;default:this.state=Le.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Le.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Le.TOUCH_DOLLY_ROTATE;break;default:this.state=Le.NONE}break;default:this.state=Le.NONE}this.state!==Le.NONE&&this.dispatchEvent(kl)}function kg(i){switch(this._trackPointer(i),this.state){case Le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Le.NONE}}function Hg(i){this.enabled!==!1&&i.preventDefault()}function Vg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Wg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const er=new O;function zn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;er.copy(t),er[n]=0,er.normalize();const l=.5*o/(o+a),h=1-er.angleTo(i)/c;return Math.sign(er[e])===1?h*l:a/(o+a)+l+l*(1-h)}class Ko extends on{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new O,l=new O,h=new O(t,e,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,x=g.length/6,v=new O,u=.5/o;for(let f=0,S=0;f<g.length;f+=3,S+=2)switch(c.fromArray(g,f),l.copy(c),l.x-=Math.sign(l.x)*u,l.y-=Math.sign(l.y)*u,l.z-=Math.sign(l.z)*u,l.normalize(),g[f+0]=h.x*Math.sign(c.x)+l.x*r,g[f+1]=h.y*Math.sign(c.y)+l.y*r,g[f+2]=h.z*Math.sign(c.z)+l.z*r,p[f+0]=l.x,p[f+1]=l.y,p[f+2]=l.z,Math.floor(f/x)){case 0:v.set(1,0,0),m[S+0]=zn(v,l,"z","y",r,n),m[S+1]=1-zn(v,l,"y","z",r,e);break;case 1:v.set(-1,0,0),m[S+0]=1-zn(v,l,"z","y",r,n),m[S+1]=1-zn(v,l,"y","z",r,e);break;case 2:v.set(0,1,0),m[S+0]=1-zn(v,l,"x","z",r,t),m[S+1]=zn(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),m[S+0]=1-zn(v,l,"x","z",r,t),m[S+1]=1-zn(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),m[S+0]=1-zn(v,l,"x","y",r,t),m[S+1]=1-zn(v,l,"y","x",r,e);break;case 5:v.set(0,0,-1),m[S+0]=zn(v,l,"x","y",r,t),m[S+1]=1-zn(v,l,"y","x",r,e);break}}static fromJSON(t){return new Ko(t.width,t.height,t.depth,t.segments,t.radius)}}function pi(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new an;c.morphTargetsRelative=a;let l=0;for(let h=0;h<i.length;++h){const g=i[h];let p=0,m=0;if(e!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in g.attributes){if(!n.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(g.attributes[x]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in g.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[x].length!==i[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(g.morphAttributes[x]),m++}if(m!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let x;if(e)x=g.index.count;else if(g.attributes.position!==void 0)x=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,h),l+=x}}if(e){let h=0;const g=[];for(let p=0;p<i.length;++p){const m=i[p].index;for(let x=0;x<m.count;++x)g.push(m.getX(x)+h);h+=i[p].attributes.position.count}c.setIndex(g)}for(const h in r){const g=nu(r[h]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,g)}for(const h in o){const g=o[h][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let p=0;p<g;++p){const m=[];for(let v=0;v<o[h].length;++v)m.push(o[h][v][p]);const x=nu(m);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}}return c}function nu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new En(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const g=c/e;for(let p=0,m=h.count;p<m;p++)for(let x=0;x<e;x++){const v=h.getComponent(p,x);a.setComponent(p+g,x,v)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const Xg=128,Yg=8,qg=-36.75,Zg=-28,Kg=10.5,Jg=12,$g={w:10,d:8.7,bottom:3.5,top:4.55},Qg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],Fe={capacity:Xg,columns:Yg,startX:qg,startZ:Zg,spacingX:Kg,spacingZ:Jg,roof:$g,boxes:Qg};function ma(i){return Number.isInteger(i)&&i>=0&&i<Fe.capacity?{slot:i,x:Fe.startX+i%Fe.columns*Fe.spacingX,z:Fe.startZ-Math.floor(i/Fe.columns)*Fe.spacingZ}:null}function jg(i,t=i,e=null,n=Fe.capacity,s=.4,r=!1){const o=[],a=Math.min(i.x,t.x)-s,c=Math.max(i.x,t.x)+s,l=Math.min(i.z,t.z)-s,h=Math.max(i.z,t.z)+s,g=Math.max(0,Math.ceil((a-5.1-Fe.startX)/Fe.spacingX)),p=Math.min(Fe.columns-1,Math.floor((c+5.1-Fe.startX)/Fe.spacingX)),m=Math.max(0,Math.ceil((Fe.startZ-h-5.3)/Fe.spacingZ)),x=Math.min(Math.ceil(Fe.capacity/Fe.columns)-1,Math.floor((Fe.startZ-l+5.3)/Fe.spacingZ));for(let v=m;v<=x;v++)for(let u=g;u<=p;u++){const f=v*Fe.columns+u,S=ma(f);if(!(!S||f>=n)){for(const T of Fe.boxes)T.tag==="home-door"&&f===e||o.push({left:S.x+T.x-T.w/2,right:S.x+T.x+T.w/2,back:S.z+T.z-T.d/2,front:S.z+T.z+T.d/2,top:T.top,tag:T.tag});r&&o.push({left:S.x-Fe.roof.w/2,right:S.x+Fe.roof.w/2,back:S.z-Fe.roof.d/2,front:S.z+Fe.roof.d/2,bottom:Fe.roof.bottom,top:Fe.roof.top,tag:"home-roof"})}}return o}function os(i,t){return!!(t&&i&&(i.y??-.12)<Fe.roof.bottom&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function t_({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new xe,h=new Cn,g=new O(1,1,1),p=new xe().makeScale(0,0,0);let m=null,x=1,v=0,u=null;const f={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function S(A,L,U,I,k,H="inside",W=0){L=f[L]||L;let it=A;it.index&&(it=A.toNonIndexed(),A.dispose()),h.setFromEuler(new ii(0,0,W)),it.applyMatrix4(l.compose(new O(U,I,k),h,g));const Y=`${H}:${L}`;o.has(Y)||o.set(Y,{layer:H,color:L,geometries:[]}),o.get(Y).geometries.push(it)}const T=(A,L,U,I,k,H,W,it="inside",Y=0)=>S(new on(A,L,U),W,I,k,H,it,Y),R=(A,L,U,I,k,H)=>S(new Wn(A,A,L,10),H,U,I,k);function y(A,L,U,I,k){S(new ki(A,9,6),k,L,U,I)}T(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),T(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),T(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),T(9.2,.08,7.8,0,.16,0,"#c8a178");for(let A=-4.2;A<4.5;A+=.7)T(.018,.012,7.6,A,.21,0,"#ab8965");T(3,.22,1,0,-.04,4.3,"#d7c5a7"),T(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),T(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),T(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),T(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const A of[-2.7,2.7])T(4,3.45,.18,A,1.9,3.9,"#e7dec9","front");T(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),T(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),T(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const A of[-2.85,2.85]){T(2.35,1.55,.12,A,2.05,4.04,"#71948d","front");for(const L of[-1.2,0,1.2])T(.055,1.65,.14,A+L,2.05,4.12,"#cfbb8c","front");for(const L of[1.23,2.87])T(2.45,.065,.14,A,L,4.12,"#cfbb8c","front");T(.23,.5,.14,A<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const A of[-1,1])T(4.95,.22,8.65,A*2.37,3.98,0,"#47695f","roof",A*-.18),T(4.95,.12,.12,A*2.37,3.96,4.35,"#c1a771","roof",A*-.18);T(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const A of[-2,-.5,1])T(2.25,.06,1.25,2.5,4.08,A,"#29434f","roof",-.18);T(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),T(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),T(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),T(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),T(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),T(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),T(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),R(.05,.35,-3.85,1.05,-2.4,"#bda16a"),R(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),T(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let A=0;A<4;A++)T(1.65,.024,.03,-2.15,2.88+A*.045,-3.55,"#8d9e98");T(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),T(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),T(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const A of[.98,1.91])T(.05,.37,.08,3.29,A,-2.25,"#56746a");T(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),T(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),T(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),R(.035,.3,3.45,1.45,-1.08,"#baa371"),R(.18,.3,2.1,1.43,-.75,"#e8dcc3"),T(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),T(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),T(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),T(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),R(.2,.33,.85,.43,-3.15,"#eee9de"),T(.5,.5,.22,.85,.68,-3.65,"#eee9de"),T(.55,.12,.42,1.5,1,-2.1,"#eee9de"),R(.025,1.65,1.5,1.9,-3.65,"#baa371"),T(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),T(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),T(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const A of[1.55,4.05])T(.23,.57,1,A,.72,2.45,"#a7b3a0");T(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),T(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const A of[.7,1.7])T(.08,.4,.6,A,.48,1.4,"#8c7556");T(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),T(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),T(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),T(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let A=0;A<8;A++)T(.11,.32+A%2*.1,.22,-3.2+A*.17,1.65,3.45,A%2?"#879f93":"#e2ca9e");for(const A of[-4.9,4.9]){T(.08,.7,10,A,.19,.1,"#aa9270");for(const L of[-4.7,0,4.7])T(.13,1,.13,A,.36,L,"#aa9270")}for(const A of[-3.6,3.6])R(.29,.45,A,.14,4.65,"#b58a69"),y(.4,A,.68,4.65,"#78946e");for(const{layer:A,color:L,geometries:U}of o.values()){const I=pi(U,!1);U.forEach(H=>H.dispose()),e.add(I);const k=new Rl(I,t(L),128);k.instanceMatrix.setUsage(Sl),k.count=0,k.userData.residenceLayer=A,i.add(k),a.push(k)}o.clear();const _=new on(1,1,1);e.add(_);const d=new Te(_,t("#b4c5ab"));d.userData.residenceGround=!0,i.add(d);const M=new Te(_,t("#e4dcc9"));i.add(M);function w(A){const L=ma(A);return{x:L.x,z:L.z}}function E(){const A=Math.max(v,s.reduce((U,I,k)=>I===null?U:k+1,0));x=Math.max(1,Math.ceil(A/8));for(const U of a){U.count=A;for(let I=0;I<A;I++){const k=s[I],H=w(I);u!==null&&k!==u||k===null&&I>=v||k!==null&&k===(u??m)&&["roof","front"].includes(U.userData.residenceLayer)?U.setMatrixAt(I,p):U.userData.residenceLayer==="door"?U.setMatrixAt(I,l.compose(new O(H.x-.65,0,H.z+3.99),new Cn().setFromAxisAngle(new O(0,1,0),c.has(k)?-Math.PI/2:0),g)):U.setMatrixAt(I,l.compose(new O(H.x,0,H.z),new Cn,g))}U.instanceMatrix.needsUpdate=!0,U.computeBoundingSphere()}const L=x*12+4;d.scale.set(86,.3,L),d.position.set(0,-.55,-20-L/2),M.scale.set(1.5,.04,L),M.position.set(0,-.12,-20-L/2),d.visible=M.visible=A>0&&u===null}return{meshes:a,interior(A){u=r.has(A)?A:null,E()},slotFor:A=>r.get(A),setPlots(A){v=Math.min(128,Math.max(0,Number(A)||0)),E()},sync(A){const L=new Set(A.slice(0,128).map(U=>U.id));for(const[U,I]of r)L.has(U)||(s[I]=null,r.delete(U));for(const U of A.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(U.id)!==I&&(r.has(U.id)&&(s[r.get(U.id)]=null),r.delete(U.id))}for(const U of A.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=U.id,r.set(U.id,I))}for(const U of[...L].sort((I,k)=>I-k))if(!r.has(U)){const I=s.indexOf(null);s[I]=U,r.set(U,I)}r.has(m)||(m=null),E()},select(A){m=r.has(A)?A:null,E()},setDoor(A,L){L?c.add(A):c.delete(A),E()},location(A){const L=r.get(A);return L===void 0?null:w(L)},bed(A){const L=this.location(A);return L?[L.x-2.05,.92,L.z-.5]:null},cameraBoxes(A){const L=this.location(A);if(!L)return[];const U=(k,H,W,it,Y)=>({left:L.x+k-W/2,right:L.x+k+W/2,back:L.z+H-it/2,front:L.z+H+it/2,top:Y}),I=[U(-4.6,0,.18,7.8,3.6),U(0,-3.9,9.4,.18,3.6),U(3.65,-2.78,1.05,.92,2.3),U(2.95,-.75,2.62,.95,1.3),U(2.8,2.45,2.6,1.2,1.3)];return A!==m&&I.push(U(4.6,0,.18,7.8,3.6),U(0,3.9,9.4,.18,3.6)),I},personForHit(A){return A?.object?.userData?.residenceLayer&&Number.isInteger(A.instanceId)?s[A.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-x*12,front:-20}},dispose(){a.forEach(A=>{A.dispose(),i.remove(A)}),i.remove(d,M),r.clear(),s.fill(null)}}}const e_={minX:-100,maxX:100,minZ:-216,maxZ:92},n_={x:0,y:-.12,z:20},i_={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20},armory:{x:52,z:35,radius:5}},hi={bounds:e_,spawn:n_,venues:i_};function s_(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=hi.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,h=!1,g=null,p=128;const m=(_,d=_,M=.3,w=!1)=>h?jg(_,d,g,p,Math.max(.4,M),w):[],x=_=>_.top<=Dn.vault_height&&Dn.vault_tags.includes(_.tag);function v(_,d,M=-.12,w=o,E=!1){return _>=t+w&&_<=e-w&&d>=n+w&&d<=s-w&&!i.concat(m({x:_,z:d},{x:_,z:d},w,E)).some(A=>!((x(A)||E)&&M>=A.top+.075||A.bottom!==void 0&&M+1.8<=A.bottom-.075)&&_>A.left-w&&_<A.right+w&&d>A.back-w&&d<A.front+w)}function u(_,d,M=o,w=!1){if(!v(d.x,d.z,d.y??-.12,M,w))return!1;for(const E of i.concat(m(_,d,M,w))){let A=0,L=1;for(const[U,I,k]of[["x",E.left-M,E.right+M],["z",E.back-M,E.front+M]]){const H=d[U]-_[U];if(Math.abs(H)<1e-8){if(_[U]<=I||_[U]>=k){A=2;break}}else{const W=(I-_[U])/H,it=(k-_[U])/H;A=Math.max(A,Math.min(W,it)),L=Math.min(L,Math.max(W,it))}}if(A<=L&&L>0&&A<1){const U=_.y??-.12,I=d.y??-.12,k=U+(I-U)*Math.max(0,A),H=U+(I-U)*Math.min(1,L);if((x(E)||w)&&Math.min(k,H)>=E.top+.075||E.bottom!==void 0&&Math.max(k,H)+1.8<=E.bottom-.075)continue;return!1}}return!0}function f(){if(!l){l=new Uint8Array(a*c).fill(1);for(let _=0;_<c;_++)for(let d=0;d<a;d++)(d===0||_===0||d===a-1||_===c-1)&&(l[_*a+d]=0);for(const _ of i.concat(m({x:t,z:n},{x:e,z:s}))){const d=Math.max(0,Math.ceil((_.left-.4-t)/r)),M=Math.min(a-1,Math.floor((_.right+.4-t)/r)),w=Math.max(0,Math.ceil((_.back-.4-n)/r)),E=Math.min(c-1,Math.floor((_.front+.4-n)/r));for(let A=w;A<=E;A++)for(let L=d;L<=M;L++)l[A*a+L]=0}}}function S(_,d,M){const w=d.x-_.x,E=d.z-_.z,A=w*w+E*E;return M.every(L=>{const U=A?Math.max(0,Math.min(1,((L.x-_.x)*w+(L.z-_.z)*E)/A)):0;return Math.hypot(_.x+w*U-L.x,_.z+E*U-L.z)>=.62})}function T(_,d=null,M=[]){f();const w=Math.round((_.x-t)/r),E=Math.round((_.z-n)/r);let A=-1,L=1/0;for(let U=-6;U<=6;U++)for(let I=-6;I<=6;I++){const k=w+I,H=E+U,W=H*a+k;if(k<0||H<0||k>=a||H>=c||!(d||l)[W])continue;const it=(t+k*r-_.x)**2+(n+H*r-_.z)**2;v(_.x,_.z)&&!u(_,{x:t+k*r,z:n+H*r})||S(_,{x:t+k*r,z:n+H*r},M)&&it<L&&(A=W,L=it)}return A}function R(_){return{x:t+_%a*r,z:n+Math.floor(_/a)*r}}function y(_,d,M=[]){if(u(_,d)&&S(_,d,M))return[{x:d.x,z:d.z}];f();const w=M.length?l.slice():l;for(const tt of M){const at=Math.round((tt.x-t)/r),Mt=Math.round((tt.z-n)/r);for(let Lt=-2;Lt<=2;Lt++)for(let Q=-2;Q<=2;Q++){const _t=at+Q,bt=Mt+Lt;_t>=0&&bt>=0&&_t<a&&bt<c&&Math.hypot(t+_t*r-tt.x,n+bt*r-tt.z)<.76&&(w[bt*a+_t]=0)}}const E=T(_,w,M),A=T(d,w,M);if(E<0||A<0)return[];const L=[],U=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),k=new Uint8Array(a*c),H=tt=>Math.abs(tt%a-A%a)+Math.abs(Math.floor(tt/a)-Math.floor(A/a));function W(tt,at){L.push({index:tt,score:at});let Mt=L.length-1;for(;Mt>0;){const Lt=Mt-1>>1;if(L[Lt].score<=at)break;[L[Mt],L[Lt]]=[L[Lt],L[Mt]],Mt=Lt}}function it(){const tt=L[0],at=L.pop();if(L.length){L[0]=at;let Mt=0;for(;;){let Lt=Mt,Q=Mt*2+1,_t=Q+1;if(Q<L.length&&L[Q].score<L[Lt].score&&(Lt=Q),_t<L.length&&L[_t].score<L[Lt].score&&(Lt=_t),Lt===Mt)break;[L[Mt],L[Lt]]=[L[Lt],L[Mt]],Mt=Lt}}return tt.index}U[E]=0,W(E,H(E));let Y=0;for(;L.length&&Y++<a*c;){const tt=it();if(k[tt])continue;if(k[tt]=1,tt===A){const Lt=[];let Q=tt;for(;Q!==E;)Lt.push(R(Q)),Q=I[Q];return Lt.reverse(),v(d.x,d.z)&&u(Lt.at(-1)||R(E),d)&&S(Lt.at(-1)||R(E),d,M)&&Lt.push({x:d.x,z:d.z}),v(_.x,_.z)&&Lt.unshift(R(E)),Lt}const at=tt%a,Mt=Math.floor(tt/a);for(const[Lt,Q]of[[1,0],[-1,0],[0,1],[0,-1]]){const _t=at+Lt,bt=Mt+Q,Nt=bt*a+_t;if(_t<0||bt<0||_t>=a||bt>=c||!w[Nt]||k[Nt]||!u(R(tt),R(Nt))||!S(R(tt),R(Nt),M))continue;const St=U[tt]+1;St<U[Nt]&&(U[Nt]=St,I[Nt]=tt,W(Nt,St+H(Nt)))}}return[]}return{configureHomes(_,d=null,M=p){h===!!_&&d===g&&M===p||(h=!!_,g=d,p=M,l=null)},withHomeAccess(_,d){if(!h||_===void 0||_===g)return d();const M=g,w=l;g=_,l=null;try{return d()}finally{g=M,l=w}},groundHeight(_,d=!1,M=o){const w=Math.round((_.x+36.75)/10.5),E=Math.round((-28-_.z)/12);let A=h&&w>=0&&w<8&&E>=0&&E*8+w<p&&os({..._,y:-.12},ma(E*8+w))?.22:-.12;for(const L of i.concat(m(_,_,M,d)))(x(L)||d)&&(_.y??-.12)>=L.top+.07&&_.x>L.left-M&&_.x<L.right+M&&_.z>L.back-M&&_.z<L.front+M&&(A=Math.max(A,L.top+.08));return A},boxes:()=>i.map(_=>({..._})),slide(_,d,M=o,w=!1){const E={...d,y:d.y??_.y};return u(_,E,M,w)?{x:d.x,z:d.z}:u(_,{...E,z:_.z},M,w)?{x:d.x,z:_.z}:u(_,{...E,x:_.x},M,w)?{x:_.x,z:d.z}:{x:_.x,z:_.z}},addBox(_,d,M,w,E="",A=2){i.push({left:M-_/2,right:M+_/2,back:w-d/2,front:w+d/2,top:A,tag:E}),l=null},rayLimit(_,d){let M=1;for(const w of i.concat(m(_,d,.02,!0))){let E=0,A=1;for(const[L,U,I]of[["x",w.left-.02,w.right+.02],["z",w.back-.02,w.front+.02],["y",w.bottom??-.3,w.top+.02]]){const k=d[L]-_[L];if(Math.abs(k)<1e-8){if(_[L]<U||_[L]>I){E=2;break}}else{const H=(U-_[L])/k,W=(I-_[L])/k;E=Math.max(E,Math.min(H,W)),A=Math.min(A,Math.max(H,W))}}E<=A&&E>=0&&E<M&&(M=Math.max(0,E-.001))}return d.y<-.12&&_.y>-.12&&(M=Math.min(M,(-.12-_.y)/(d.y-_.y))),M},cameraLimit(_,d,M=[]){let w=1;for(const E of i.concat(M)){let A=0,L=1;for(const[U,I,k]of[["x",E.left-.15,E.right+.15],["z",E.back-.15,E.front+.15],["y",-.3,E.top+.15]]){const H=d[U]-_[U];if(Math.abs(H)<1e-8){if(_[U]<I||_[U]>k){A=2;break}}else{const W=(I-_[U])/H,it=(k-_[U])/H;A=Math.max(A,Math.min(W,it)),L=Math.min(L,Math.max(W,it))}}A<=L&&A>.01&&A<w&&(w=Math.max(.02,A-.015))}return w},free:v,segment:u,path:y,nearest(_){const d=T(_);return d<0?null:R(d)},move(_,d,M){const w=Math.hypot(d.x-_.x,d.z-_.z),E=w>0?Math.min(1,M/w):0,A={x:_.x+(d.x-_.x)*E,z:_.z+(d.z-_.z)*E};return u(_,A)?A:{x:_.x,z:_.z}}}}function r_({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new In;i.add(a);const c=At=>(t.add(At),At);function l(At,Gt){const ce=new Hs(Gt);return e.set("environment:"+At,ce),ce}const h=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),p=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),m=l("forest",{color:"#4c7262",roughness:1}),x=new Te(c(new Di(850,850)),h);x.rotation.x=-Math.PI/2,x.position.y=-1.3,a.add(x);const v=[],u=[],f=[],S=new xe,T=new Cn;function R(At,Gt,ce,$t,Se,Ae=1,ze=1,Ge=1){const Ke=At.index?At.toNonIndexed():At;Ke!==At&&At.dispose(),Ke.applyMatrix4(S.compose(new O(ce,$t,Se),T,new O(Ae,ze,Ge))),Gt.push(Ke)}for(let At=0;At<20;At++){const Gt=At/20*Math.PI*2,ce=Math.cos(Gt)*(155+At%3*18),$t=-70+Math.sin(Gt)*230,Se=35+At%5*13,Ae=25+At%4*9;R(new _i(Ae,Se,7),v,ce,Se/2-1.3,$t,1.2,1,1),R(new _i(Ae*.28,Se*.28,7),u,ce,Se*.86-1.25,$t,1.2,1,1)}for(let At=0;At<100;At++){const Gt=At%2?-1:1,ce=Gt*(51+At%9*4),$t=-210+Math.floor(At/2)*5.4,Se=3.5+At%4;R(new _i(1.3+At%3*.25,Se,6),f,ce,Se/2-.8,$t),$t>=-22&&$t<=92&&o?.addBox(2.6,2.6,ce,$t,"forest-tree",Se)}function y(At,Gt){const ce=c(pi(At,!1));At.forEach(Se=>Se.dispose());const $t=new Te(ce,Gt);return a.add($t),$t}const _=y(v,g),d=y(u,p),M=y(f,m),w=[];for(let At=0;At<14;At++)for(let Gt=0;Gt<4;Gt++)R(new ki(1,9,6),w,-100+At%7*32+(Gt-1.5)*4,29+At%4*4+Gt%2*1.5,-120+Math.floor(At/7)*165,7,3.2,4.8);const E=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),A=y(w,E),L=6e3,U=new Float32Array(L*3),I=new Float32Array(L*6),k=[];for(let At=0;At<L;At++)k.push({x:At*73.31%64-32,y:At*17.73%32,z:At*41.71%70-35});const H=c(new an);H.setAttribute("position",new En(U,3)),H.setDrawRange(0,320);const W=new Pl({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",W);const it=new Ju(H,W);it.frustumCulled=!1,a.add(it);const Y=c(new an);Y.setAttribute("position",new En(I,3));const tt=new Cl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",tt);const at=new Ku(Y,tt);at.frustumCulled=!1,a.add(at);const Mt=c(new Di(260,24,48,4)),Lt=new Float32Array(Mt.attributes.position.count*3);for(let At=0;At<Mt.attributes.position.count;At++)new oe().setHSL(.38+At%49/49*.34,.75,.62).toArray(Lt,At*3);Mt.setAttribute("color",new En(Lt,3));const Q=new di({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:_n,blending:pr});e.set("environment:aurora",Q);const _t=new Te(Mt,Q);_t.position.set(0,55,-235),a.add(_t);const bt=Mt.attributes.position.array.slice();let Nt={},St=0,Jt="",Oe="",kt=!1,st=-60;const Ht={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function se(At){const Gt=Fh(Nt,Date.now()+St).mode;if(Gt===Jt&&Oe===`${Nt.landscape}:${At}`)return;Jt=Gt,Oe=`${Nt.landscape}:${At}`;const ce=Ht[Nt.landscape]||Ht.alps;h.color.set(ce[0]),g.color.set(ce[1]),m.color.set(ce[2]);const $t=Gt==="aurora";i.background=new oe($t?"#102339":At?"#142730":Gt==="rain"?"#a6babd":Gt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new la(i.background,Gt==="mist"?.007:Gt==="rain"?.0035:.0013),n.intensity=$t?.6:Gt==="rain"?1.35:At?1.65:2.7,s.intensity=$t?1.6:At?2.05:2.6,r.intensity=$t?1.8:1.1,E.color.set(Gt==="rain"?"#859c9f":"#f5f2e9"),W.color.set("#ffffff"),W.size=.13}return{configure(At={},Gt=!1){Nt=At.settings||{},Number.isFinite(At.server_ms)&&(St=At.server_ms-Date.now()),kt=Gt,_.visible=d.visible=Nt.mountains!==!1,A.visible=Nt.clouds!==!1;const ce=Nt.precipitation||"heavy",$t=kt?900:ce==="light"?650:ce==="storm"?5800:3600;H.setDrawRange(0,$t),Y.setDrawRange(0,$t*2),Oe=""},update(At,{paused:Gt=!1,dark:ce=!1,center:$t=null}={}){se(ce);const Se=Jt,Ae=Gt?0:At/1e3;if(A.position.x=Gt?0:Math.sin(Ae*.012)*9,it.visible=Se==="snow",at.visible=Se==="rain",_t.visible=Se==="aurora",it.visible||at.visible){const ze=H.drawRange.count,Ge=$t?.x||0,Ke=$t?.z||0;for(let z=0;z<ze;z++){const me=k[z],ve=me.x+Ge+Math.sin(Ae*.4+z)*(Se==="snow"?.55:.1),be=(me.y-Ae*(Se==="snow"?1.4:20)%32+32)%32,wt=me.z+Ke;if(Se==="snow")U[z*3]=ve,U[z*3+1]=be,U[z*3+2]=wt;else{const De=z*6;I[De]=ve,I[De+1]=be,I[De+2]=wt,I[De+3]=ve+.1,I[De+4]=be-.9,I[De+5]=wt}}(Se==="snow"?H:Y).attributes.position.needsUpdate=!0}if(_t.visible){const ze=Mt.attributes.position.array;for(let Ge=0;Ge<ze.length;Ge+=3)ze[Ge+1]=bt[Ge+1]+Math.sin(bt[Ge]*.035+Ae*.3)*5,ze[Ge+2]=Math.cos(bt[Ge]*.02+Ae*.17)*9;Mt.attributes.position.needsUpdate=!0}},extent(At){At!==st&&(st=At,M.scale.z=Math.max(1,Math.abs(At)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function o_({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let y=-40;y<=-20;y+=2)for(let _=43;_<=59;_+=2)t(1.98,.025,1.98,y,-.18,_,(y+_)/2%2?"#e8dfcb":"#d1c6ac",0);for(const y of[-41.3,-18.7])t(.15,.09,20,y,-.1,51,"gold",0),t(.35,1.4,19.8,y,.45,51,"deep"),a.addBox(.35,19.8,y,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const y of[-40,-20])for(const _ of[42.5,50.5,59.5])e(.35,.25,y,-.03,_,"gold"),e(.2,4.7,y,2.3,_,"white"),e(.38,.22,y,4.7,_,"gold"),a.addBox(.75,.75,y,_,"grand-bar-column",4.9);for(const y of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,y,"gold");for(const _ of[-36,-24]){const d=new Pi(2,.075,6,24,Math.PI);s(d,"gold",_,3.4,y)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const y of[41.65,42.3])t(15,.14,.7,-30,1.5+(y-41.65)*2,y,"wood");for(let y=0;y<14;y++){const _=-36.5+y;e(.11,.55,_,1.87,41.8,y%2?"#87b6a5":"#b89c68"),e(.04,.14,_,2.22,41.8,"gold")}for(const y of[-37,-34,-31,-28,-25,-22])e(.37,.16,y,.57,47.4,"deep"),e(.065,.8,y,.08,47.4,"gold"),e(.28,.06,y,-.12,47.4,"gold"),a.addBox(.75,.75,y,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[y,_,d]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,y,4.8,_,"gold"),s(new Pi(d,.035,6,28),"gold",y,4,_,Math.PI/2);for(let M=0;M<12;M++){const w=M*Math.PI/6,E=y+Math.cos(w)*d,A=_+Math.sin(w)*d;e(.014,.46,E,3.75,A,"gold"),n(.09,.19,.09,E,3.47,A,"white")}}for(const y of[-38,-22])t(2.1,.65,5.1,y,.15,54,"#856c8c",.18),t(.3,1,5.2,y+(y<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,y,54,"velvet-booth",1.3),e(.68,.12,y+(y<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,y+(y<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,y+(y<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const h=["#87668e","#508a87","#b99c68","#5c708c"];for(let y=0;y<8;y++)for(let _=0;_<6;_++)t(1.04,.025,1.02,-33.7+y*1.06,.035,53.4+_*1.06,h[(y+_)%4],.015);for(const y of[-34.5,-25.5])t(.04,.06,6.6,y,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const y of[-31.4,-28.6])e(.57,.08,y,1.24,51.1,"black"),e(.15,.1,y,1.3,51.1,"gold");for(let y=0;y<6;y++)t(.1,.09,.22,-30.65+y*.25,1.26,51.3,"white",.01);for(const y of[-34.5,-25.5]){t(1,2.3,.8,y,1,51,"black");for(const _ of[.45,1.35]){const d=new Wn(.31,.31,.05,12);s(d,"metal",y,_,51.43,Math.PI/2)}a.addBox(1,.8,y,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new Hs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const p=new ha(.62,2);c.add(p);const m=new Te(p,g);m.position.set(-30,4.6,56),i.add(m);const x=new di({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:_n,blending:pr});l.set("rivage-beams",x);const v=new _i(1.5,3.4,10,1,!0);c.add(v);const u=[];for(const y of[-33,-27])for(const _ of[54,58]){const d=new Te(v,x);d.position.set(y,2,_),d.userData.rivageEffect="beam",i.add(d),u.push(d)}const f=[],S=new di({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",S);for(const[y,_,d,M,w,E,A]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const L=new on(_,d,M);c.add(L);const U=new Te(L,S);U.position.set(w,E,A),U.userData.officeVenue=y,i.add(U),f.push(U)}const T=h.map(y=>{const _=o(y);return _.emissive.set(y),_});let R=!0;return{targets:f,setEnabled(y){R=!!y},update(y,{paused:_,energySaver:d}){_||(m.rotation.y=y/18e3);const M=_||d||!R;for(const w of u)w.visible=!M;for(let w=0;w<T.length;w++)T[w].emissiveIntensity=M?.13:.2+Math.sin(y/4500+w)*.05}}}function a_(i,t=hi.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1,c=!!t.air_access,l=t.y??-.12;const h=(m,x,v)=>Math.max(x,Math.min(v,m));function g(m,x={},v=0,u=[]){const f=h(Number(m)||0,0,.05);let S=Number(x.x)||0,T=Number(x.z)||0;r&&Date.now()>=o&&p(null);const R=Math.hypot(S,T);R>1&&(S/=R,T/=R),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const y=!!(x.boost&&R&&s),_=y?9:4.5;e.stamina=h(e.stamina+(y?-23:14)*f,0,100);const d=(Math.cos(v)*S-Math.sin(v)*T)*_,M=(-Math.sin(v)*S-Math.cos(v)*T)*_;e.vx=d,e.vz=M;const w=i.groundHeight?.(e,c,r?.radius||.3)??-.12;e.grounded&&(l=w),e.grounded&&e.y>w+.08&&(e.grounded=!1),!e.flight&&!a&&x.jump&&!n&&(e.grounded||e.jumps<Dn.maximum_jumps)&&(e.vy=Dn.jump_speed,e.grounded=!1,e.jumps++),n=!!x.jump;const E=e.y;if(e.flight)e.vy=(+!!x.jump-+!!x.descend)*Dn.flight_speed,e.y=h(e.y+e.vy*f,w,Dn.flight_maximum_y),e.grounded=!1;else if(a)e.y=Math.max(w,e.y-Dn.landing_speed*f),e.vy=-4,e.y<=w&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0);else if(e.grounded)e.y=w;else{e.vy-=Dn.gravity*f;const U=c?Math.min(Dn.flight_maximum_y,Math.max(Dn.maximum_y,l+Dn.maximum_y+.12)):Dn.maximum_y;e.y=e.vy>0?Math.min(U,e.y+e.vy*f):e.y+e.vy*f,e.y<=w&&(e.y=w,e.vy=0,e.grounded=!0,e.jumps=0)}let A=i.slide({...e,y:Math.min(E,e.y)},{x:e.x+d*f,y:e.y,z:e.z+M*f},r?.radius||.3,c);u.some(U=>e.y<(U.y??-.12)+1.8&&e.y+(r?.height||1.8)>(U.y??-.12)&&Math.hypot(A.x-U.x,A.z-U.z)<.62&&Math.hypot(A.x-U.x,A.z-U.z)<=Math.hypot(e.x-U.x,e.z-U.z)+1e-4)&&(A={x:e.x,z:e.z});const L=Math.hypot(A.x-e.x,A.z-e.z)>1e-4;if(e.x=A.x,e.z=A.z,c&&e.grounded){const U=i.groundHeight?.(e,!0,r?.radius||.3)??-.12;e.y>U+.08?e.grounded=!1:!e.flight&&e.y<=(i.groundHeight?.(e,!1)??-.12)+.12&&(c=!1)}return e.air_access=c,L&&(e.yaw=Math.atan2(d,M)),e.action=e.flight?"fly":a?"land":e.grounded?L?y?"run":"walk":"idle":"jump",{...e}}function p(m,x=1/0){!m&&e.flight&&(e.flight=!1,a=!e.grounded),r=m,o=x}return{step:g,setForm:p,toggleFlight(){return r?.fly?(e.flight=!e.flight,e.flight&&(c=!0),a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e,air_access:c}),reset(m){c=!!(m.air_access??c);const x=i.groundHeight?.(m,c,r?.radius||.3)??-.12;e={...e,...m,vx:0,vz:0,vy:0,jumps:0,grounded:(m.y??-.12)<=x+.01},l=x,a=!e.flight&&!e.grounded&&e.y>Dn.maximum_y},face(m){e.yaw=Math.atan2(m.x-e.x,m.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function $r(i,t){const e=hi.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function iu(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(u,f,S,T,R,y=0){y&&u.rotateZ(y),u.translate(S,T,R);const _=u.index?u.toNonIndexed():u;_!==u&&u.dispose();const d=new oe(f),M=new Float32Array(_.attributes.position.count*3);for(let w=0;w<M.length;w+=3)M[w]=d.r,M[w+1]=d.g,M[w+2]=d.b;_.setAttribute("color",new En(M,3)),r.push(_)}const a=(u,f,S,T,R,y,_,d=0)=>o(new on(u,f,S),T,R,y,_,d),c=(u,f,S,T,R,y,_=u)=>o(new Wn(_,u,f,10),S,T,R,y),{accent:l,hair:h,motif:g,accessory:p,hairStyle:m,shirt:x}=i;if(t==="head"){if(a(.49,.16,.45,h,0,.23,-.02),a(.45,m==="long"?.72:.29,.13,h,0,m==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(m))for(const u of[-1,1])a(.09,m==="long"?.6:.33,.32,h,u*.24,-.02,-.03);if(m==="spiky")for(let u=0;u<7;u++)o(new _i(.11,.27+u%3*.06,5),h,(u-3)*.066,.39+Math.sin(u)*.025,-.06,(u-3)*-.16);if(m==="split"&&a(.245,.18,.46,l,.123,.24,-.015),m==="side"&&a(.26,.25,.05,h,-.12,.08,.218,-.18),m==="ponytail"&&a(.27,.5,.25,h,0,-.15,-.37),p.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),p==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),p==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,x,0,.395,0)),p==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const u of[-1,1])a(.06,.33,.06,"#94745a",u*.3,.64,0,u*-.3),a(.15,.055,.06,"#94745a",u*.36,.72,0)}if(p==="bamboo"){const u=new Wn(.052,.052,.35,10);u.rotateZ(Math.PI/2),o(u,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(p==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),p==="goggles"||p==="glasses")for(const u of[-1,1])a(.19,.12,.06,l,u*.12,p==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",u*.12,p==="goggles"?.23:.04,.271);if(p==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const u of[-1,1])a(.12,.2,.08,"#aba2a6",u*.2,.31,0,u*-.35),a(.06,.055,.025,"#84aabb",u*.14,.07,.208)}if(p==="butterfly")for(const u of[-1,1])a(.18,.17,.045,l,u*.15,.31,-.12,u*.4);if(p==="earrings")for(const u of[-1,1])a(.045,.15,.035,"#e9d6bc",u*.26,-.19,.02);if(i.id==="naruto")for(const u of[-1,1])for(let f=0;f<3;f++)a(.08,.012,.01,"#9f7055",u*.15,-.055-f*.033,.208,u*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){a(.028,.53,.035,l,0,1.23,.19);for(const u of[-1,1])a(.14,.37,.04,l,u*.14,1.26,.19,u*.08);if(g==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let u=0;u<3;u++)a(.03,.03,.035,"#eee2ba",0,1.13+u*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let u=0;u<4;u++)for(let f=0;f<4;f++){const S=(f-1.5)*.112,T=1+u*.13;g==="checks"&&(u+f)%2===0&&a(.11,.127,.025,l,S,T,.19),g==="triangles"&&(u+f)%2===0&&o(new _i(.035,.065,3),l,S,T,.205),g==="clouds"&&u%2===0&&f%2===0&&(a(.13,.045,.03,l,S,T,.2),c(.04,.03,l,S,T+.035,.2))}if(g==="circle"&&o(new Pi(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let u=0;u<3;u++)a(.32,.015,.02,"#b6a273",0,1.19+u*.07,.26)}else if(g==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const u of[-1,1])a(.12,.51,.07,l,u*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const u of[-1,1])a(.065,.52,.04,l,u*.1,1.23,.2,u*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(p))for(let u=0;u<(p==="swords"?3:1);u++){const f=.3+u*.06;a(.055,.83,.055,"#373d4a",f,.92,-.18,-.25),a(.09,.23,.07,l,f+.1,1.4,-.18,-.25)}if(p==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(p))for(const u of[-1,1])a(p==="gauntlets"?.27:.2,.2,.24,l,u*.37,.99,.05)}const v=pi(r,!1);return r.forEach(u=>u.dispose()),n.add(v),e.set(s,v),v}function ls(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function l_(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(Qn.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(c>=.72&&o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const h=t.clone().add(new O(o.x*.4,l,o.z*.4));if(h.sub(t).clampLength(s,r).add(t),i.cameraLimit(t,h,n)>=.99)return h}return t.clone().add(new O(0,Qn.clamp(6,s,r),0))}function c_(){let i=null,t=null,e=!1,n=0,s=null;return{reset(){i=null,t=null,s=null,e=!1,n=0},resolve(r,o,a,c=[],l=3.6,h=35,g=1/30){const p=Qn.clamp(Number(g)||.03333333333333333,.001,.06),m=l_(r,o,a,c,l,h),x=m.sub(o),v=a.clone().sub(o).clampLength(l,h);if(x.distanceTo(v)>.05?(e=!0,n=0,s=x.clone()):e&&(n+=p,n<.35&&s?x.copy(s):(e=!1,s=null)),i&&t&&i.add(v.clone().sub(t)),t=v.clone(),!i)i=x.clone();else{const f=x.clone().sub(i).multiplyScalar(1-Math.exp(-p*7));f.clampLength(0,Math.max(8,l*2)*p),i.add(f)}return i.clampLength(l,h),o.clone().add(i)}}}function u_({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new Hs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,h,g,p,m]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"],["KAIA",52,32.9,!0,"armorer","#375976"]]){let u=function(T,R,y,_,d,M,w){let E=new on(T,R,y).toNonIndexed();E.translate(_,d,M);const A=new oe(w),L=new Float32Array(E.attributes.position.count*3);for(let U=0;U<L.length;U+=3)A.toArray(L,U);E.setAttribute("color",new En(L,3)),v.push(E)};const x=new In;x.position.set(l,-.12,h),x.userData.hospitality=p,i.add(x);const v=[];if(u(.49,.66,.32,0,1.15,0,m),u(.41,.45,.4,0,1.7,0,"#e4b492"),u(.46,.16,.45,0,1.96,-.02,g?"#51352e":"#29272d"),u(.46,g?.65:.27,.13,0,g?1.66:1.82,-.21,g?"#51352e":"#29272d"),g){for(const T of[-1,1])u(.07,.43,.29,T*.23,1.74,-.03,"#51352e"),u(.05,.025,.02,T*.13,1.65,.209,"#cf8790");u(.58,.3,.38,0,.81,0,m)}for(const T of[-1,1])u(.035,.04,.025,T*.1,1.73,.207,"#253b36"),u(.18,.65,.2,T*.14,.45,0,"#263e39"),u(.22,.13,.33,T*.14,.08,.06,"#1c2b28"),u(.16,.4,.2,T*.33,1.2,0,m),u(.15,.26,.16,T*.33,.9,.04,"#e4b492");u(.09,.025,.025,0,1.58,.21,"#b66c78"),(p==="hostess"||p==="bartender")&&(u(.3,.49,.035,0,1.02,.18,g?"#c6a971":"#253e38"),u(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),u(.1,.07,.04,0,1.44,.19,"#374941"),u(.45,.04,.3,.36,.89,.17,"#c5ab71"),u(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const f=pi(v,!1);v.forEach(T=>T.dispose()),e.add(f);const S=new Te(f,r);S.userData.officeVenue=p==="armorer"?"armory":p==="dj"?"disco":"bar",x.add(S),a.push(S),o.push(x),t.addBox(.68,.68,l,h,"hospitality-npc",2.1),p==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,h)}return{targets:a,update(c,l){o.forEach((h,g)=>{h.rotation.y=g<2?Math.sin((l?0:c)/4500+g)*.1:0,h.children[0].position.y=l?0:Math.sin(c/1800+g)*.018})}}}const ui=(i,t,e)=>i+(t-i)*e;function h_(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),h=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let g=r?o?.16:.06:0,p=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const m=[h,-h],x=[-h*.85,h*.85],v=[0,0],u=i.officeAnimation??={airborne:!1,landing:0};if(t?.action==="jump"){const S=Math.max(-1,Math.min(1,(t.vy??0)/7)),T=Math.max(0,S),R=Math.max(0,-S);g=-.1+R*.12,m[0]=.18+T*.4,m[1]=.24+T*.28,x[0]=-.65-T*.2,x[1]=-.6-R*.18,p=0,u.airborne=!0,u.landing=0}else u.airborne&&(u.airborne=!1,t?.grounded!==!1&&!["fly","land","rest"].includes(t?.action)&&(u.landing=.18));if(u.landing>0&&(u.landing=Math.max(0,u.landing-n),!a&&!s)){const S=Math.sin(u.landing/.18*Math.PI);p-=S*.09,g+=S*.06}t?.action==="fly"&&(g=.16,m.fill(.3),x.fill(.15),v[0]=-.12,v[1]=.12,p=0),t?.action==="land"&&(g=-.06,m.fill(.35),x.fill(-.3),p=0),a&&(g=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,p=c?.4:-.5,m.fill(c?0:-1.25),x.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(v[0]=-.3,v[1]=.3),s||(p+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(x[1]=-.8+(s?0:Math.sin(e*3)*.45),x[0]=-.3,g=.07),t?.action==="cast"&&(x[0]=t.skillPose==="beam"?-1.25:-.9,x[1]=-1.4,m[0]=-.12,m[1]=.2,g=.12),t?.action==="drink"&&(x[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(x[0]=-1),t?.action==="dance"&&(x[0]=-.8,x[1]=-.7,m[0]=s?0:Math.sin(e*2.4)*.2,m[1]=-m[0]),i.body.rotation.x=ui(i.body.rotation.x,g,l),i.body.position.y=ui(i.body.position.y,p,l),i.body.rotation.z=ui(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((S,T)=>{S.rotation.x=ui(S.rotation.x,m[T],l),S.rotation.z=ui(S.rotation.z,v[T],l)}),i.arms.forEach((S,T)=>{S.rotation.x=ui(S.rotation.x,x[T],l),S.rotation.z=ui(S.rotation.z,o?T?-.12:.12:0,l)}),i.head.rotation.x=ui(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=ui(i.head.rotation.y,0,l);const f=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(S=>S.scale.y=ui(S.scale.y,f,l)),{lying:c,moving:r}}function f_(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(h=>Math.hypot(h.x-c,h.z-l)>.65)})))return s}return null}function su(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(p=>Math.hypot(p.x-a.x,p.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,h=c*c+l*l;if(h&&n.some(p=>{const m=Math.max(0,Math.min(1,((p.x-t.x)*c+(p.z-t.z)*l)/h));return Math.hypot(t.x+c*m-p.x,t.z+l*m-p.z)<.62&&m>0}))continue;const g=s?f_(i,a,n):t.yaw||0;if(g!==null)return{...a,yaw:g}}return null}function d_(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function h(y,_=!1){const d=y+_;return o.has(d)||o.set(d,new i.MeshStandardMaterial({color:y,emissive:y,emissiveIntensity:_?.55:.13,roughness:.55,metalness:.18,transparent:_,opacity:_?.78:1,depthWrite:!_})),o.get(d)}function g(y,_,d,M,w,E,A=!1){r.add(_);const L=new i.Mesh(_,h(d,A));return L.position.set(M,w,E),y.add(L),L}const p=(y,_,d,M,w,E,A,L,U=!1)=>g(y,new i.BoxGeometry(_,d,M),w,E,A,L,U),m=(y,_,d,M,w,E,A,L,U=!1)=>{const I=g(y,new i.SphereGeometry(1,10,7),L,_,d,M,U);return I.scale.set(w,E,A),I},x=(y,_,d,M,w,E,A)=>g(y,new i.ConeGeometry(_,d,5),M,w,E,A,!0),v=(y,_,d)=>{const M=new i.Group;return M.position.set(y,_,d),s.add(M),M},u=t.color,f=t.accent||"#eddbff",S=t.dark||"#36214f";if(t.model==="susanoo"){p(s,1.75,1.65,.85,u,0,3.7,0),p(s,1.1,.65,.75,u,0,2.65,0);for(let w=0;w<5;w++)for(const E of[-1,1]){const A=p(s,.74,.055,.07,f,E*.4,3.15+w*.25,.46,!0);A.rotation.z=E*.18}p(s,1.45,.24,.95,S,0,2.5,0);for(let w=0;w<5;w++){const E=w*Math.PI*2/5,A=p(s,.85,1,.16,u,Math.sin(E)*.68,2.05,Math.cos(E)*.53);A.rotation.y=E,A.rotation.z=Math.sin(E)*.12}for(const w of[-1,1]){const E=v(w*.47,1.7,0);p(E,.52,1.1,.58,u,0,-.4,0),p(E,.64,.4,.7,S,0,-.8,.04),p(E,.48,.65,.56,u,0,-1.2,0),p(E,.6,.3,.95,u,0,-1.57,.2),l.push({node:E,side:w,kind:"leg"});const A=v(w*1.08,4.25,0);p(A,.6,1.1,.65,u,0,-.45,0),p(A,.75,.35,.85,f,0,.04,0),p(A,.64,.85,.65,S,0,-1.25,0),p(A,.58,.35,.55,u,0,-1.85,.07),l.push({node:A,side:w,kind:"arm"});for(let k=0;k<3;k++)p(s,.95,.16,.85,u,w*(1.03+k*.05),4.38-k*.17,0);const L=v(w*.72,4.35,-.43);L.userData.wingSide=w,a.push(L);const U=p(L,2.2,.24,.23,f,w*1,1.02,-.1,!0);U.rotation.z=w*.48;for(let k=0;k<3;k++)for(let H=0;H<(n?5:8);H++){const W=p(L,.48,1.2+k*.3,.12,u,w*(.55+H*.37),.75-k*.56+H*.12,-.12-k*.04,!0);W.rotation.z=-w*.55}const I=x(L,.16,.55,f,w*2.2,1.7,-.1);I.rotation.z=-w*.8}const y=v(0,5.05,.02);p(y,.76,.85,.7,u,0,0,0),p(y,.53,.25,.45,S,0,-.25,.25);for(const w of[-1,1]){const E=p(y,.22,.07,.08,"#fff89e",w*.18,.04,.4,!0);E.rotation.z=-w*.25;const A=x(y,.17,.95,u,w*.42,.55,0);A.rotation.z=-w*.38}const _=x(y,.16,.63,f,0,-.02,.58);_.rotation.x=Math.PI/2;const d=p(y,.18,.22,.05,"#e7abff",0,.29,.39,!0);d.rotation.z=Math.PI/4;for(let w=-2;w<=2;w++){const E=x(y,.16,.8+Math.abs(w)*.1,u,w*.16,.85,-.08);E.rotation.z=-w*.15}const M=v(-1.15,2.28,.18);p(M,.14,.8,.14,S,0,0,0),p(M,.7,.1,.25,f,0,-.15,0),p(M,.24,2.4,.08,f,0,-1.4,0,!0),M.rotation.z=-.5,e==="itachi"&&(a.forEach(w=>w.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){m(s,0,2.1,-.12,1,1.35,.75,u),m(s,0,3.52,.35,.82,.78,.65,u),m(s,0,3.27,.98,.5,.27,.5,f),m(s,0,3.45,1.31,.19,.13,.13,S);for(const y of[-1,1]){const _=x(s,.39,1.3,u,y*.58,4.3,.14);_.rotation.z=-y*.22,p(s,.27,.1,.09,"#fff5c2",y*.38,3.66,.95,!0),p(s,.045,.14,.045,"#b93237",y*.38,3.66,1.01,!0);const d=p(s,.39,.1,.06,S,y*.48,3.56,.92);d.rotation.z=y*.4;const M=x(s,.08,.25,"#fff2c8",y*.23,3.11,1.18);M.rotation.z=Math.PI;for(let A=0;A<3;A++){const L=p(s,.65,.035,.04,S,y*.62,3.3-A*.12,1.02);L.rotation.z=y*(A-1)*.15}const w=v(y*.9,2.85,.1);m(w,0,-.4,.15,.33,.78,.35,u),m(w,0,-1.04,.33,.43,.22,.44,f),l.push({node:w,side:y,kind:"arm"});const E=v(y*.52,1.1,-.05);m(E,0,-.35,0,.4,.7,.4,u),m(E,0,-.85,.25,.5,.25,.6,f),l.push({node:E,side:y,kind:"leg"});for(let A=0;A<3;A++)x(w,.08,.28,S,(A-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let y=0;y<9;y++){const _=(y-4)*.42,d=v(Math.sin(_)*.25,1.6,-.6);d.rotation.y=_,d.userData.tailIndex=y;const M=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(U=>new i.Vector3(...U))),w=14,E=7,A=new i.TubeGeometry(M,w,.4,E,!1),L=A.attributes.position;for(let U=0;U<=w;U++){const I=M.getPointAt(U/w),k=1-.93*Math.pow(U/w,1.5);for(let H=0;H<=E;H++){const W=U*(E+1)+H,it=new i.Vector3().fromBufferAttribute(L,W).sub(I).multiplyScalar(k).add(I);L.setXYZ(W,it.x,it.y,it.z)}}A.computeVertexNormals(),g(d,A,u,0,0,0,!0),c.push(d)}}else{if(t.model==="saiyan")for(let y=0;y<9;y++){const _=y*Math.PI*2/9,d=x(s,.13,.7,u,Math.sin(_)*.2,2.03,Math.cos(_)*.17);d.rotation.z=-Math.sin(_)*.7,d.rotation.x=Math.cos(_)*.6}if(t.model==="gear5"){for(let y=0;y<7;y++)m(s,Math.sin(y)*.2,1.91+Math.cos(y)*.07,Math.cos(y)*.13,.19,.16,.19,"#fff9ef");for(const y of[-1,1])for(let _=0;_<6;_++)m(s,y*(.35+_*.08),1.2+Math.sin(_)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const y=x(s,.12,.6,f,.19,1.96,.09);y.rotation.z=-.25;for(let _=0;_<6;_++){const d=p(s,.04,.12,.03,S,Math.sin(_)*.23,1.02+_*.09,.2);d.rotation.z=_*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),m(s,0,1.05,0,.42,.5,.29,u);for(const y of[-1,1]){const _=p(s,.06,.65,.06,f,y*.38,1.9,0);_.rotation.z=-y*.5}}if(t.model==="slayer")for(let y=0;y<8;y++){const _=x(s,.12,.5,u,Math.sin(y)*.42,.3+y*.14,Math.cos(y)*.35);_.rotation.z=Math.sin(y)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let y=0;y<8;y++){const _=p(s,.04,.38,.04,t.model==="icefire"&&y%2?"#ff9366":u,Math.sin(y)*.4,.35+y*.17,Math.cos(y)*.28,!0);_.rotation.z=y%2?.5:-.5}}const T=g(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),u,0,.06,0,!0);T.rotation.x=-Math.PI/2;function R(y){for(const d of[...y.children])d.isGroup&&R(d);const _=new Map;for(const d of[...y.children])if(d.isMesh){d.updateMatrix();const M=d.geometry.index?d.geometry.toNonIndexed():d.geometry.clone();M.applyMatrix4(d.matrix),_.has(d.material)||_.set(d.material,[]),_.get(d.material).push(M),y.remove(d),d.geometry.dispose(),r.delete(d.geometry)}for(const[d,M]of _){const w=pi(M,!1);M.forEach(E=>E.dispose()),r.add(w),y.add(new i.Mesh(w,d))}}return R(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(y,{flying:_=!1,moving:d=!1}={}){const M=n?0:y;a.forEach((w,E)=>{w.rotation.y=(E?1:-1)*(_?.18+Math.sin(M*3)*.2:1.25+Math.sin(M*1.3)*.04)}),c.forEach((w,E)=>{w.rotation.y=(E-4)*.42+Math.sin(M*1.8+E*.6)*.09,w.rotation.x=.12+Math.cos(M*1.2+E)*.09}),l.forEach(({node:w,side:E,kind:A})=>{w.rotation.x=_?A==="leg"?.3:-.25:d?Math.sin(M*7+(E<0?Math.PI:0))*(A==="leg"?.3:-.2):0})},dispose(){r.forEach(y=>y.dispose()),o.forEach(y=>y.dispose()),s.clear()}}}function p_({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[g,p]of c)g.visible=p;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const h=o.position.clone().sub(a.anchor);ls(n),e.position.copy(a.position).add(h),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(h),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(h,g){if(h===r){o=g;return}l(),!(h===null||!g)&&(ls(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:g.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=h,o=g,t.interior(h),i.background=s,i.fog=null,n.minDistance=2.6,n.maxDistance=8,n.target.copy(g.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const h of i.children)c.has(h)||c.set(h,h.visible),h.visible=!!(h.isLight||h===o||h.userData.residenceLayer||h.userData.officeAbility===r||h.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function m_(i,t){const e=new i.Group,n=new i.Group,s=[],r=[];e.visible=!1,e.userData.officeHologram=!0,t.add(e),e.add(n);const o=(_,d)=>{const M=new i.MeshBasicMaterial({color:_,transparent:!0,opacity:d,depthWrite:!1,side:i.DoubleSide});return r.push(M),M},a=o("#77e6ed",.4),c=o("#ddc38c",.55),l=o("#244f69",.035),h=o("#70dfe5",.045);h.blending=i.AdditiveBlending,n.position.y=.85;const g=new i.PlaneGeometry(2.9,1.6),p=new i.BoxGeometry(1,1,.018),m=new i.TorusGeometry(.48,.014,4,40),x=new i.ConeGeometry(.95,1.6,12,1,!0);s.push(g,p,m,x);const v=new i.Mesh(g,l);n.add(v);const u=new Map([[a,[]],[c,[]]]),f=(_,d,M,w,E=a)=>u.get(E).push({x:_,y:d,w:M,h:w});for(const _ of[-1.45,1.45]){f(_,0,.018,1.6);for(const d of[-.8,.8])f(_-Math.sign(_)*.15,d,.3,.03,c)}f(0,.8,2.9,.012),f(0,-.8,2.9,.012),f(-.55,.42,1.25,.035,c);for(let _=0;_<3;_++)f(-.34,.08-_*.23,1.65-_*.2,.018),f(-1.15,.08-_*.23,.08,.08,c);for(let _=0;_<24;_++){const d=_*Math.PI/12;f(.92+Math.cos(d)*.28,.1+Math.sin(d)*.28,.035,.035)}f(0,0,2.85,.025);let S=null;const T=new i.Matrix4;for(const[_,d]of u){const M=new i.InstancedMesh(p,_,d.length),w=new i.Matrix4;d.forEach((E,A)=>{w.makeScale(E.w,E.h,1),w.setPosition(E.x,E.y,.015),M.setMatrixAt(A,w)}),M.computeBoundingSphere(),n.add(M),_===a&&(S={mesh:M,index:d.length-1},M.instanceMatrix.setUsage(i.DynamicDrawUsage))}const R=new i.Mesh(m,a);R.rotation.x=-Math.PI/2,R.position.y=-1.1,e.add(R);const y=new i.Mesh(x,h);return y.rotation.z=Math.PI,y.position.y=-.85,e.add(y),{update(_,d,{time:M=0,height:w=1.8,reduced:E=!1}={}){return e.visible=!!_,_?(e.userData.officeAbility!==_.person.id&&e.traverse(A=>{A.isMesh&&(A.userData.officeHologramOwner=_.person.id)}),e.userData.officeAbility=_.person.id,e.position.copy(_.group.position),e.position.y+=w+1.55+(E?0:Math.sin(M*1.4)*.035),n.quaternion.copy(d.quaternion),R.rotation.z=E?0:M*.2,T.makeScale(2.85,.025,1),T.setPosition(0,E?0:Math.sin(M*.9)*.75,.03),S.mesh.setMatrixAt(S.index,T),S.mesh.instanceMatrix.needsUpdate=!0,e.position.clone().project(d)):(e.userData.officeAbility=null,null)},hide(){e.visible=!1,e.userData.officeAbility=null},dispose(){t.remove(e),s.forEach(_=>_.dispose()),r.forEach(_=>_.dispose())},root:e}}function g_(i,t){const e={box:new i.BoxGeometry(1,1,1),orb:new i.SphereGeometry(1,12,8),ring:new i.TorusGeometry(1,.04,5,28),tip:new i.ConeGeometry(.15,.6,6)},n=new Map,s=new Map,r=new Map,o=[],a=h=>(n.has(h)||n.set(h,new i.MeshBasicMaterial({color:(vs.weapons[h]||vs.specials[h]).color,transparent:!0,opacity:.8,depthWrite:!1})),n.get(h));function c(h,g,p,m,x){const v=new i.Mesh(e[g],a(p));return v.position.set(...m),v.scale.set(...x),h.add(v),v}function l(h){s.get(h)?.root.removeFromParent(),s.delete(h),r.delete(h)}return{observe(h,g,p,m=Date.now(),x=null){if(!p)return;const v=vs.weapons[g?.weapon]?g.weapon:null,u=s.get(h);if((u?.figure!==p||u?.kind!==v)&&(u?.root.removeFromParent(),s.delete(h),v)){const w=new i.Group,E=v==="sniper"?1.15:v==="pistol"?.45:.8;w.userData.officeWeapon=v,w.position.set(0,-.5,.16),c(w,"box",v,[0,0,.18],[.14,.18,E]),c(w,"box",v,[0,-.13,0],[.1,.25,.14]),v==="sniper"&&c(w,"box",v,[0,.15,.15],[.12,.12,.35]),w.traverse(A=>{A.isMesh&&(A.userData.personId=h)}),(p.arms?.[1]||p.body).add(w),s.set(h,{root:w,kind:v,figure:p})}const f=s.get(h);if(f){const w=x||p.arms?.[1]||p.body;if(f.root.parent!==w&&w.add(f.root),f.root.visible=!["rest","play","drink","eat"].includes(g?.action),x){const E=Kl(g.form),A=E?.height||3;f.root.position.set(A*.25,A*(E?.model==="kurama"?.22:.48),A*.2),f.root.scale.setScalar(Math.min(3,A/1.8)),f.root.rotation.x=g.aim_pitch||0}else f.root.position.set(0,-.5,.16),f.root.scale.setScalar(1),f.root.rotation.x=.7+(g.aim_pitch||0)}if(!g?.shot_at||r.get(h)>=g.shot_at)return;r.set(h,g.shot_at);const S=g.shot_kind,T=g.shot_end;if(!(vs.weapons[S]||vs.specials[S])||!T||!["x","y","z"].every(w=>Number.isFinite(T[w]))||m-g.shot_at>2500)return;for(;o.length>=8;)t.remove(o.shift().root);const R=new i.Group,y=vs.specials[S]?(Kl(g.form)?.height||2.2)*.55:1.2,_=g.shot_origin&&["x","y","z"].every(w=>Number.isFinite(g.shot_origin[w]))?new i.Vector3(g.shot_origin.x,g.shot_origin.y,g.shot_origin.z):p.group.position.clone().add(new i.Vector3(0,y,0)),d=new i.Vector3(T.x,T.y,T.z);R.position.copy(_),R.lookAt(d),R.userData.officeAbility=h,t.add(R),R.userData.officeShot=S;const M=new i.Group;if(R.add(M),S==="bijudama"){c(M,"orb",S,[0,0,0],[.8,.8,.8]);for(let w=0;w<3;w++)c(M,"ring",S,[0,0,0],[1,1,1]).rotation.set(w*.9,w*.6,0)}else if(c(M,"box",S,[0,0,0],[S==="indra_arrow"?.1:.035,S==="indra_arrow"?.1:.035,S==="indra_arrow"?2:.9]),S==="indra_arrow"){const w=c(M,"tip",S,[0,0,1.25],[2,2,2]);w.rotation.x=Math.PI/2;const E=c(R,"ring",S,[0,0,.6],[1.25,1.8,1]);E.rotation.y=Math.PI/2}o.push({root:R,projectile:M,origin:_,target:d,start:m,duration:S==="bijudama"?1100:S==="indra_arrow"?650:240,kind:S})},update(h=Date.now(),g=!1){for(let p=o.length-1;p>=0;p--){const m=o[p],x=h-m.start,v=Math.min(1,x/m.duration);if(x>m.duration+180){t.remove(m.root),o.splice(p,1);continue}m.projectile.position.z=m.origin.distanceTo(m.target)*v,!g&&m.kind==="bijudama"&&(m.projectile.rotation.z=x*.003),m.projectile.scale.setScalar(x>m.duration?Math.max(.1,1-(x-m.duration)/180):1)}},forget:l,firstPerson(h,g){const p=s.get(h)?.root;if(!p?.visible)return()=>{};const m=p.parent,x=p.position.clone(),v=p.quaternion.clone(),u=p.scale.clone();return t.add(p),p.position.set(.3,-.28,-.8).applyMatrix4(g.matrixWorld),p.quaternion.copy(g.quaternion).multiply(new i.Quaternion().setFromAxisAngle(new i.Vector3(0,1,0),Math.PI)),p.scale.setScalar(1),()=>{m.add(p),p.position.copy(x),p.quaternion.copy(v),p.scale.copy(u)}},dispose(){for(const h of s.keys())l(h);o.forEach(h=>t.remove(h.root)),o.length=0,Object.values(e).forEach(h=>h.dispose()),n.forEach(h=>h.dispose()),n.clear()},active:()=>o.length}}function __(){let i=0,t=0;return{start(e,n){const s=n.clone().sub(e);i=Math.atan2(-s.x,-s.z),t=Math.atan2(s.y,Math.hypot(s.x,s.z))},move(e,n){!Number.isFinite(e)||!Number.isFinite(n)||(i-=e*.0022,t=Qn.clamp(t-n*.0022,-1.35,1.35))},yaw:()=>i,pitch:()=>t,direction:()=>new O(-Math.sin(i)*Math.cos(t),Math.sin(t),-Math.cos(i)*Math.cos(t))}}function v_({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},onHologramAnchor:c=()=>{},onCombatFire:l=()=>{},onAimChange:h=()=>{},rendererFactory:g=x=>new Ah(x),controlsFactory:p=(x,v)=>new Dg(x,v),getDate:m=()=>new Date}){const x=new qu,v=new Gn(36,1,.1,1200),u=g({antialias:!0,alpha:!1,powerPreference:"low-power"});u.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),u.outputColorSpace=Sn,u.toneMapping=Qo,u.toneMappingExposure=1.18,i.append(u.domElement);const f=p(v,u.domElement);f.enableDamping=!1,f.minDistance=8,f.maxDistance=650,f.minPolarAngle=.32,f.maxPolarAngle=1.28,f.target.set(0,0,0),f.enablePan=!0,f.panSpeed=.7,f.rotateSpeed=.55,f.enableKeys=!1;const S=new uh("#fbf3dc","#526c61",2.8);x.add(S);const T=new Qa("#fff1cf",3.2);T.position.set(-12,25,15),x.add(T);const R=new Qa("#cce5ef",1.1);R.position.set(15,10,-10),x.add(R);const y=new Map,_=new Map,d=new Set,M=new Set,w=new Map,E=s_(),A=c_(),L=Oh({THREE:Kr,scene:x,navigation:E,reduced:()=>K||en,createModel:(b,D)=>d_(Kr,b,{...D,reduced:K||en})}),U=m_(Kr,x);let I=null,k=0;const H=g_(Kr,x),W=__();let it={},Y=!1,tt=!1,at=null,Mt=null;function Lt(b){if(!(!b||(b.combat_revision??0)<(it.combat_revision??0))){b.weapon&&b.weapon!==it.weapon&&(Xe=null,Me=null);for(const D of["hp","weapon","shield_until","respawn_id","shot_at","shot_kind","shot_origin","shot_end","attack_ready_at","combat_revision"])Object.hasOwn(b,D)&&(it[D]=b[D]);mt()}}function Q(b){if(b=!!(b&&Zt&&!vi()&&!me.active()&&(it.weapon||["susanoo","kurama"].includes(L.modeState(Ot)?.id))),b===Y)return Y;if(ls(f),A.reset(),b){Xe=null,Me=null,L.cancel(Ot),W.start(v.position,f.target);const D=L.form(Ot),F=D?D.height*.85:3.8,V=D?55:35;at={enabled:f.enabled,fov:ee==="orbit"?44:v.fov,distance:Qn.clamp(v.position.distanceTo(f.target),F,V)},f.minDistance=F,f.maxDistance=V,f.enabled=!1,ee="follow",ye=Ot,ft=!1,v.fov=it.weapon==="sniper"?35:58,v.updateProjectionMatrix()}else if(at){f.enabled=at.enabled;const D=Qn.clamp(at.distance,f.minDistance,f.maxDistance),F=w.get(Ot);if(F){f.target.copy(F.group.position).add(new O(0,L.form(Ot)?.height*.55||1.3,0));const V=W.direction().negate();V.y=Math.max(.25,V.y),V.normalize(),v.position.copy(f.target).addScaledVector(V,D)}v.fov=at.fov,v.updateProjectionMatrix(),at=null,document.pointerLockElement===u.domElement&&document.exitPointerLock?.()}return Y=b,Mt=null,h(Y),mt(),Y}const _t={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function bt(b){return y.has(b)||y.set(b,new Hs({color:_t[b]||b,roughness:b==="metal"?.4:.82,metalness:b==="gold"?.45:.02,...b==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:_n}:{}})),y.get(b)}const Nt=new on(1.1,.035,2.2);d.add(Nt);const St=new Rl(Nt,bt("#c9b384"),24);St.instanceMatrix.setUsage(Sl),St.count=0,St.frustumCulled=!1,x.add(St),St.userData.officeRestMats=!0;const Jt=new xe,Oe=new Cn;function kt(b,D,F,V,X,Et=0,Ut=0,Ce=0){let Pe=b;b.index&&(Pe=b.toNonIndexed(),b.dispose()),Oe.setFromEuler(new ii(Et,Ut,Ce)),Pe.applyMatrix4(new xe().compose(new O(F,V,X),Oe,new O(1,1,1))),_.has(D)||_.set(D,[]),_.get(D).push(Pe)}function st(b,D,F,V,X,Et,Ut,Ce=.035,Pe=0){kt(Ce>0?new Ko(b,D,F,1,Math.min(Ce,b/3,D/3,F/3)):new on(b,D,F),Ut,V,X,Et,0,Pe)}function Ht(b,D,F,V,X,Et,Ut=b){kt(new Wn(Ut,b,D,12),Et,F,V,X)}function se(b,D,F,V,X,Et,Ut){const Ce=new ki(1,10,7);Ce.scale(b,D,F),kt(Ce,Ut,V,X,Et)}function At(b,D,F=1){E.addBox(.85*F,.85*F,b,D,"plant",2*F),Ht(.4*F,.7*F,b,.35*F,D,"pot",.31*F),Ht(.045*F,1.4*F,b,1.2*F,D,"oak");for(let V=0;V<5;V++){const X=V*2.4;se(.48*F,.52*F,.25*F,b+Math.cos(X)*.3*F,(1.4+V*.15)*F,D+Math.sin(X)*.25*F,V%2?"leaf":"lightLeaf")}}function Gt(b,D,F,V,X,Et,Ut="#f2e8d5",Ce=0){const Pe=document.createElement("canvas");Pe.width=768,Pe.height=192;const j=Pe.getContext("2d");j.clearRect(0,0,768,192),j.fillStyle=Ut,j.textAlign="center",j.font="500 66px Georgia",j.fillText(b,384,88),j.font="20px Arial",j.fillText(D,384,139);const Xt=new $a(Pe);Xt.colorSpace=Sn,M.add(Xt);const gt=new di({map:Xt,transparent:!0,depthWrite:!1,side:_n}),et=new Di(F,F/4);d.add(et);const It=new Te(et,gt);It.position.set(V,X,Et),It.rotation.y=Ce,x.add(It),y.set(`sign-${b}`,gt)}st(86,.6,96,0,-.94,28,"base",.3),st(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),st(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const b of[-1,1]){st(54,.04,4,b*70,-.17,20,"#e6dfcc",0),st(4,.04,55,b*87,-.17,45,"#e6dfcc",0);for(let D=-20;D<92;D+=8)Ht(.08,1.1,b*99,.35,D,"wood"),st(.08,.08,8,b*99,.7,D+4,"wood",0);for(const D of[34,58,80])st(3,.4,.9,b*92,.05,D,"wood",.06),E.addBox(3,.9,b*92,D,"trail-bench",.7),At(b*80,D,1);Gt("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,b*58,1.7,18)}E.addBox(160,40,0,97,"water-boundary",.1),E.configureHomes(!0);for(const b of[-99,99])E.addBox(.2,114,b,35,"scenic-fence",1.2);E.addBox(202,.2,0,91,"scenic-boundary",1.2),st(85,.07,18,0,-.43,67,"#e4cfa5",.1),st(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let b=0;b<8;b++)st(120-b*8,.02,.13,0,-.57,79+b*2.8,"#c4ddd4",0);st(7,.07,24,0,-.4,60,"#e6dfcc",.1);const ce=o_({scene:x,box:st,cylinder:Ht,orb:se,bake:kt,sign:Gt,material:bt,navigation:E,ownedGeometries:d,materials:y}),$t=u_({scene:x,navigation:E,ownedGeometries:d,materials:y,sign:Gt});st(8,.12,7,52,-.3,34,"metal"),st(6,1.2,.7,52,.48,34,"deep"),st(6,2.8,.2,52,1.2,31.6,"metal"),E.addBox(6,.7,52,34,"armory-counter",1.2),E.addBox(6,.2,52,31.6,"armory-wall",2.8),Gt("ATLAS / ARMORY","KAIA / VIRTUAL EQUIPMENT",6,52,3.3,31.8);for(let b=0;b<4;b++)st(.8,.18,.2,50+b*1.3,.72,34,"gold"),st(.12,.15,.7,50+b*1.3,.72,34.3,"metal");for(let b=0;b<8;b++){const D=-36+b*3.7;st(1.5,.25,2.8,D,-.1,67,"white",.1),st(1.4,.17,1,D,.26,66,"sofa",.08),E.addBox(1.5,2.8,D,67,"beach-chair",.6),b%2===0&&(Ht(.05,3,D+1.2,1,65,"gold"),kt(new _i(1.8,.6,10),"white",D+1.2,2.7,65),E.addBox(.2,.2,D+1.2,65,"parasol",2.8))}st(19,.15,10,22,-.3,65,"wood",.1),Gt("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const b of[16,22,28])Ht(1.2,.13,b,.8,63,"white"),Ht(.1,1,b,.2,63,"gold"),E.addBox(2.4,2.4,b,63,"terrace-table",.9);for(const b of[-10,-6,-2]){At(b,58,.9);for(let D=0;D<4;D++)se(.15,.2,.15,b+(D-1.5)*.3,.9,58,"#c18b9c")}st(83,.08,4,0,-.44,20,"#e6dfcc",.12),st(6,.08,64,0,-.44,16,"#e6dfcc",.1),st(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const b of[-41,41])for(const D of[-15,-2,14,31,46])At(b,D,1.7),Ht(.08,3.2,b+(b<0?1:-1),1.15,D+2,"gold"),se(.22,.25,.22,b+(b<0?1:-1),2.85,D+2,"white");const Se=[];function Ae(b,D,F,V){E.addBox(F,.12,b,D,"net",V);for(const X of[-F/2,F/2])Ht(.055,V,b+X,V/2,D,"white");for(let X=.3;X<=V;X+=.22)st(F,.018,.025,b,X,D,"white",0);for(let X=-F/2;X<=F/2;X+=.4)st(.012,V-.3,.018,b+X,(V+.3)/2,D,"white",0)}function ze(b,D,F=.16){const V=new ki(F,10,8);d.add(V);const X=new Te(V,bt(D));X.userData.officeBall=b.id,x.add(X),Se.push({mesh:X,game:b})}for(const b of es){const{x:D,z:F,id:V}=b;if(E.addBox(6,.14,D,F-(b.kind==="court"?6:4.2),"sign",1.2),st(b.kind==="court"?17:10,.12,b.kind==="court"?13:9,D,-.29,F,V==="tennis"?"#a77355":V==="badminton"?"#3b7e77":V==="basketball"?"#b99569":"#dce0ca",.14),st(6,1.1,.12,D,.65,F-(b.kind==="court"?6:4.2),"deep"),Gt(b.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,D,.75,F-(b.kind==="court"?5.91:4.11)),V==="tennis"||V==="badminton"||V==="basketball"){for(const X of[-7,7])st(.045,.015,10.8,D+X,-.21,F,"white",0);for(const X of[-5.4,0,5.4])st(14,.015,.045,D,-.21,F+X,"white",0);if(V!=="basketball"){for(const X of[-5.7,5.7])st(.035,.015,10.8,D+X,-.2,F,"white",0);Ae(D,F,14,V==="badminton"?1.7:1.15),ze(b,V==="tennis"?"#d9e56b":"white",V==="tennis"?.17:.12)}else{for(const X of[-1,1]){Ht(.09,3.6,D,1.5,F+X*5,"metal"),st(2.3,1.35,.13,D,3.1,F+X*4.7,"white");const Et=new Pi(.43,.045,6,20);kt(Et,"#c67543",D,2.8,F+X*4.1,Math.PI/2)}ze(b,"#bd6c32",.25)}}else if(V==="golf"){for(const X of[-6.5,6.5])E.addBox(.2,8,D+X,F,"golf-edge",.5);st(13,.12,8,D,-.15,F,"#69885c",.15);for(const X of[-6.5,6.5])st(.2,.35,8,D+X,-.05,F,"woodLight");for(let X=0;X<3;X++)Ht(.22,.02,D-4+X*4,-.07,F+(X%2?2:-2),"black"),Ht(.025,1.5,D-4+X*4,.65,F+(X%2?2:-2),"gold"),st(.8,.4,.03,D-3.6+X*4,1.25,F+(X%2?2:-2),"#c78362");ze(b,"white",.12)}else if(V==="bowling"){for(const X of[-2.7,2.7])E.addBox(.35,11,D+X,F,"bowling-edge",.4);st(5,.09,11,D,-.13,F,"woodLight");for(const X of[-2.7,2.7])st(.35,.12,11,D+X,-.1,F,"oak");for(let X=0;X<4;X++)for(let Et=0;Et<=X;Et++){const Ut=D+(Et-X/2)*.55,Ce=F-2-X*.5;Ht(.14,.5,Ut,.17,Ce,"white",.08),se(.13,.14,.13,Ut,.49,Ce,"white")}ze(b,"#786397",.28)}else if(V==="arcade")for(const X of[-2.2,2.2]){E.addBox(2.1,1.6,D+X,F,"arcade",2.5),E.addBox(1.2,1.2,D+X,F+2,"seat",.7),st(2.1,2.6,1.6,D+X,1.1,F,"deep",.1),st(1.6,1.1,.05,D+X,1.7,F+.83,"screen");for(let Et=0;Et<5;Et++)st(.05,.6,.02,D+X+(Et-2)*.2,1.7,F+.87,Et%2?"#e8c877":"screenLine",0);Ht(.18,.06,D+X,.9,F+1.1,"gold"),st(1.2,.45,1.2,D+X,.2,F+2,"sofa",.1)}else if(V==="archery"){E.addBox(5,.3,D,F-2,"archery-backstop",3.2),st(5,3.2,.25,D,1.2,F-2,"wood");for(let X=0;X<5;X++){const Et=new Wn(1.1-X*.21,1.1-X*.21,.03,24);kt(Et,["white","#283e49","#73a7bf","#c36f60","gold"][X],D,1.6,F-1.82+X*.035,Math.PI/2)}st(5,.02,.12,D,-.18,F+2.8,"white",0)}else if(V==="darts"){E.addBox(5,.22,D,F-1.8,"dart-board",2.8),st(5,3,.22,D,1.25,F-1.8,"deep");for(let X=0;X<4;X++){const Et=new Wn(1.05-X*.23,1.05-X*.23,.025,24);kt(Et,X%2?"white":"#bf6f59",D,1.6,F-1.64+X*.025,Math.PI/2)}}else{E.addBox(5.5,3.5,D,F,"game-table",1.3),st(5.5,.25,3.5,D,1,F,V==="pingpong"?"#4c7783":V==="billiards"?"#376a59":"woodLight",.1);for(const X of[-2.2,2.2])for(const Et of[-1.2,1.2])st(.18,1.1,.18,D+X,.4,F+Et,"oak");if(V==="pingpong"&&(Ae(D,F,5.5,1.45),ze(b,"white",.1)),V==="uno")for(let X=0;X<16;X++){const Et=X%4;st(.32,.035,.48,D+(Et<2?-1.7+X%4*.3:1.4),1.16+X*.002,F+(Et%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][X%4],.02,X*.3)}if(V==="chess")for(let X=0;X<8;X++)for(let Et=0;Et<8;Et++)st(.34,.02,.34,D+(X-3.5)*.34,1.14,F+(Et-3.5)*.34,(X+Et)%2?"deep":"white",0),(Et<2||Et>5)&&Ht(.075,.17,D+(X-3.5)*.34,1.24,F+(Et-3.5)*.34,Et<2?"white":"black");if(V==="billiards")for(let X=0;X<10;X++)se(.12,.12,.12,D+Math.sin(X*2)*1.8,1.25,F+Math.cos(X)*.9,["gold","white","deep"][X%3]);if(V==="foosball")for(let X=0;X<5;X++){st(.045,.045,4.5,D-2+X,1.4,F,"metal",0);for(const Et of[-1,0,1])st(.2,.45,.18,D-2+X,1.48,F+Et,X%2?"#ba7864":"deep")}for(const X of[-1,1])st(4,.35,.8,D,.28,F+X*3.8,"sofa",.1),E.addBox(4,.8,D,F+X*3.8,"bench",.5)}}st(40.5,.6,28,0,-.6,0,"base",.22),st(39.8,.22,27.3,0,-.2,0,"edge",.1),st(39.4,.18,26.9,0,-.04,0,"floor",.08),st(37.8,.04,13.5,0,.07,-5.8,"stone",.05),st(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),st(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let b=-18;b<19;b+=1.9)st(.015,.015,12.4,b,.14,-5.8,"#c3cfbf",0);st(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),st(39.4,.22,.5,0,4.8,-13.25,"gold"),st(8,4.8,.18,0,2.35,-13.02,"deep");for(let b=0;b<21;b++)st(.06,4.6,.1,-3.8+b*.38,2.35,-12.87,"wood",.01);st(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),Gt("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const b of[-15,-10,10,15]){st(4.1,2.9,.15,b,2.6,-13,"glass"),st(4.2,.08,.23,b,4.08,-12.85,"gold"),st(4.2,.12,.3,b,1.12,-12.85,"woodLight");for(const D of[-2,0,2])st(.055,2.9,.2,b+D,2.6,-12.86,"gold",0)}st(.13,2.8,10.8,0,1.55,-6.4,"glass"),st(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const b of[-11.8,-6.4,-1])st(.08,2.9,.08,0,1.5,b,"gold",0);st(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),st(.22,.08,25.7,-19.5,2.8,-.1,"gold"),st(.2,2.7,25.7,19.5,1.4,-.1,"glass"),st(.22,.08,25.7,19.5,2.8,-.1,"gold"),Gt("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),Gt("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function Ge(b,D,F){E.addBox(2.6,1.28,b,D,"desk",2.3),st(2.6,.15,1.28,b,1.31,D,"woodLight",.08);for(const V of[-1.03,1.03])st(.09,1.17,1.02,b+V,.66,D,"white"),st(.45,.08,.94,b+V,.15,D,"metal");st(1,.66,.08,b,1.91,D-.22,"metal"),st(.9,.54,.02,b,1.92,D-.166,"screen");for(let V=0;V<3;V++)st(.28+V*.12,.024,.025,b-.14+V*.04,2.03-V*.1,D-.149,"screenLine",0);Ht(.07,.25,b,1.48,D-.2,"metal"),st(.45,.035,.25,b,1.405,D-.19,"metal"),st(.71,.035,.24,b,1.42,D+.32,"white"),Ht(.09,.18,b+.9,1.49,D+.12,"deep"),st(.64,.17,.64,b,.66,D+1.02,F==="umum"?"sofa":"teal",.1),st(.65,.7,.12,b,1.08,D+1.33,F==="umum"?"sofa":"teal",.09),Ht(.055,.5,b,.35,D+1.05,"metal"),st(.8,.06,.14,b,.15,D+1.05,"metal"),st(.14,.06,.8,b,.15,D+1.05,"metal")}const Ke={umum:[],operasional:[]};for(const b of["umum","operasional"])for(let D=0;D<4;D++)for(let F=0;F<4;F++){const V=(b==="umum"?-15:3.4)+F*3.75,X=-10.3+D*3.15;Ke[b].push([V,.18,X+1.03]),Ge(V,X,b)}for(const b of[-18.5,18.5]){st(.7,2.4,4.7,b,1.25,-8.4,"wood");for(let D=0;D<3;D++){st(.86,.06,4.8,b,.65+D*.69,-8.4,"gold");for(let F=0;F<8;F++)st(.5,.38+F%2*.12,.18,b,.88+D*.69,-10.3+F*.5,F%2?"white":"deep")}}st(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const b of[4.7,8,11.3]){st(15.8,.45,1.05,-8.7,.57,b,"sofa",.16),st(15.8,.9,.25,-8.7,.91,b-.62,"sofa",.12);for(let D=0;D<8;D++)st(1.72,.17,.95,-15.8+D*2.02,.86,b,D%3===0?"pillow":"sofa",.1);for(const D of[-16.7,-.7])st(.25,.68,1.35,D,.8,b,"sofa",.1)}for(const b of[-11.5,-5]){st(2.7,.13,1.2,b,.64,6.6,"woodLight",.12);for(const D of[-.9,.9])Ht(.05,.48,b+D,.37,6.6,"gold");Ht(.16,.22,b+.4,.81,6.6,"white")}st(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const b of[-11.5,-6.5])Ht(.04,.5,b,.32,2.85,"gold");Gt("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),st(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),st(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),st(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let b=0;b<23;b++)st(.055,1.15,.07,7.9+b*.4,.78,2.26,"woodLight",.01);st(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),st(.8,.55,.05,15.3,1.9,1.94,"black"),Ht(.18,.24,14.1,1.64,1.5,"white"),Ht(.18,.24,13.6,1.64,1.5,"white"),Gt("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const b of[8,13.8])for(const D of[5.1,9.7]){Ht(1.45,.12,b,1.05,D,"woodLight"),Ht(.13,.92,b,.55,D,"gold"),Ht(.68,.08,b,.12,D,"gold");for(const F of[-1.6,1.6])Ht(.42,.14,b+F,.67,D,"deep"),Ht(.055,.55,b+F,.34,D,"gold");Ht(.18,.22,b+.4,1.22,D,"white"),Ht(.22,.04,b-.3,1.14,D+.2,"white")}for(const[b,D,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])At(b,D,F);E.addBox(39.4,.32,0,-13.25,"wall",4.8),E.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const b of[-19.5,19.5])E.addBox(.2,25.7,b,-.1,"glass-wall",2.8);for(const b of[4.7,8,11.3])E.addBox(16.1,1.5,-8.7,b,"sofa",1.4);E.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),E.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const b of[8,13.8])for(const D of[5.1,9.7])E.addBox(2.9,2.9,b,D,"cafe-table",1.3);for(const b of[-18.5,18.5])E.addBox(.9,4.8,b,-8.4,"shelf",2.6);for(const b of[-11.5,-5])E.addBox(2.7,1.2,b,6.6,"lounge-table",.8);for(const[b,D]of _){const F=pi(D,!1);D.forEach(V=>V.dispose()),F&&(d.add(F),x.add(new Te(F,bt(b))))}_.clear();const z=t_({scene:x,material:bt,ownedGeometries:d}),me=p_({scene:x,residences:z,camera:v,controls:f,background:new oe("#182c2a")}),ve=r_({scene:x,materials:y,ownedGeometries:d,sun:T,hemi:S,fill:R,navigation:E}),be=document.createElement("canvas");be.width=be.height=128;const wt=be.getContext("2d"),De=wt.createRadialGradient(64,64,7,64,64,64);De.addColorStop(0,"#16382f35"),De.addColorStop(1,"#16382f00"),wt.fillStyle=De,wt.fillRect(0,0,128,128);const Yt=new $a(be);M.add(Yt);const Qt=new Di(66,49);d.add(Qt);const N=new di({map:Yt,transparent:!0,depthWrite:!1});y.set("shadow",N);const C=new Te(Qt,N);C.rotation.x=-Math.PI/2,C.position.y=-.98,x.add(C);const q=new Map,pt=new Map;function lt(b){if(pt.has(b))return pt.get(b);const D=[];if(b==="archery"){const V=new Pi(.34,.025,5,16,Math.PI);V.rotateZ(-Math.PI/2),D.push(V.toNonIndexed()),V.dispose();const X=new on(.035,.035,.85);X.translate(0,0,.1),D.push(X.toNonIndexed()),X.dispose()}else{const V=new Wn(.017,.03,b==="billiards"?1.65:1,6);V.rotateX(Math.PI/2),D.push(V.toNonIndexed()),V.dispose()}const F=pi(D,!1);return D.forEach(V=>V.dispose()),d.add(F),pt.set(b,F),F}function ct(b,D,F,V,X){const Et=D+F.join(":");if(!q.has(Et)){const Ce=D==="sphere"?new ki(F[0],10,8):new Ko(...F,1,.06);q.set(Et,Ce),d.add(Ce)}const Ut=new Te(q.get(Et),bt(V));return Ut.position.set(...X),b.add(Ut),Ut}const Rt=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],rt=new Map,ot=new Hs({vertexColors:!0,roughness:.8});y.set("costume-vertex",ot);function Tt(b){const D=new In;x.add(D);const F=Jl(b.avatar),V=kh(F.costume),X=(V?.style||F.style)==="feminine",Et=V?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||Rt[b.id%Rt.length],Ut=new In;D.add(Ut);const Ce={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],Pe=F.hair==="hijab"?Et:"#352c32";if(ct(Ut,"box",[X?.43:.5,.65,.33],Et,[0,1.17,0]).userData.avatarCloth=!0,!V&&F.outfit==="blazer"){ct(Ut,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const He of[-1,1]){const Ze=ct(Ut,"box",[.07,.32,.035],"gold",[He*.12,1.33,.19]);Ze.rotation.z=He*.25}}!V&&F.outfit==="sport"&&ct(Ut,"box",[.32,.055,.02],"white",[0,1.3,.18]);const j=!V&&F.outfit==="dress"?ct(Ut,"box",[.6,.4,.44],Et,[0,.79,0]):null,Xt=new In;if(Xt.position.y=1.69,Ut.add(Xt),ct(Xt,"box",[.43,.46,.4],Ce,[0,0,0]),V){const He=new Te(iu(V,"head",rt,d),ot),Ze=new Te(iu(V,"body",rt,d),ot);He.userData.costumePart="head",Ze.userData.costumePart="body",Xt.add(He),Ut.add(Ze)}else{const He="hair:"+F.hair;if(!q.has(He)){const Ze=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const ts of[-1,1])Ze.push([.09,F.hair==="bob"?.4:.53,.32,ts*.235,-.01,-.03]);const _s=Ze.map(([ts,Ph,Lh,Dh,Ih,Nh])=>{const ga=new on(ts,Ph,Lh);ga.translate(Dh,Ih,Nh);const Uh=ga.toNonIndexed();return ga.dispose(),Uh}),xs=pi(_s,!1);_s.forEach(ts=>ts.dispose()),q.set(He,xs),d.add(xs)}Xt.add(new Te(q.get(He),bt(Pe)))}if(!V&&F.hair==="ponytail"&&ct(Xt,"box",[.24,.53,.22],Pe,[0,-.02,-.35]),!V&&F.hair==="hijab"&&ct(Ut,"box",[.58,.18,.43],Pe,[0,1.44,-.04]),!q.has("eyes")){const He=[-.095,.095].map(_s=>{const xs=new on(.035,.045,.025);xs.translate(_s,.035,.205);const ts=xs.toNonIndexed();return xs.dispose(),ts}),Ze=pi(He,!1);He.forEach(_s=>_s.dispose()),q.set("eyes",Ze),d.add(Ze)}const gt=new Te(q.get("eyes"),bt("#263833"));Xt.add(gt);const et=[gt];if(ct(Xt,"box",[.09,.02,.025],X?"#b96f78":"#9c6d58",[0,-.105,.21]),X)for(const He of[-.14,.14])ct(Xt,"box",[.065,.025,.02],"#d39589",[He,-.065,.21]);if(F.accessory==="glasses"){for(const He of[-1,1])ct(Xt,"box",[.15,.11,.025],"gold",[He*.105,.04,.224]),ct(Xt,"box",[.11,.07,.025],Ce,[He*.105,.04,.24]);ct(Xt,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){ct(Xt,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const He of[-1,1])ct(Xt,"box",[.12,.2,.18],"deep",[He*.28,.07,0])}const It=[];for(const He of[-.34,.34]){const Ze=new In;Ze.position.set(He,1.42,0),Ut.add(Ze),ct(Ze,"box",[.17,.4,.2],Et,[0,-.19,0]).userData.avatarCloth=!0,ct(Ze,"box",[.15,.27,.16],Ce,[0,-.45,.05]),It.push(Ze)}const Be=[],ai=[];for(const He of[-.14,.14]){const Ze=new In;Ze.position.set(He,.83,0),Ut.add(Ze),ct(Ze,"box",[.18,.64,.2],V?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,ai.push(ct(Ze,"box",[.23,.14,.34],V?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),Be.push(Ze)}const fn=ct(It[1],"sphere",[.12],"white",[0,-.49,.14]),vn=ct(It[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),re=new In;It[1].add(re),re.position.set(0,-.48,.16),ct(re,"box",[.04,.44,.05],"gold",[0,-.14,0]);const ae=new Pi(.24,.025,6,16);d.add(ae),re.add(new Te(ae,bt("white"))),re.rotation.x=Math.PI/2;const pe=new Te(lt("billiards"),bt("gold"));pe.position.set(0,-.48,.35),It[1].add(pe),pe.visible=!1;const dn=new Mr(.5,.59,24);d.add(dn);const On=new di({color:"#c5a061",side:_n});y.set(`ring-${b.id}`,On);const Qe=new Te(dn,On);Qe.rotation.x=-Math.PI/2,Qe.position.y=.02,D.add(Qe),Qe.visible=!1;const qt=document.createElement("button");qt.type="button",qt.className="vo-avatar-label",qt.setAttribute("aria-pressed","false");const Tn=document.createElement("i"),Mi=document.createElement("span"),gs=document.createElement("small");qt.append(Tn,Mi,gs),t.append(qt);const ji=document.createElement("span");return ji.className="vo-speech",ji.hidden=!0,qt.append(ji),qt.addEventListener("click",()=>e(b.id)),D.traverse(He=>{He.isMesh&&(He.userData.personId=b.id)}),{group:D,body:Ut,head:Xt,arms:It,legs:Be,shoes:ai,eyes:et,skirt:j,cup:fn,plate:vn,racket:re,tool:pe,bubble:ji,label:qt,dot:Tn,name:Mi,icon:gs,ring:Qe,person:b,appearance:JSON.stringify(b.avatar),privateGeometry:ae,target:new O,phase:b.id*1.75}}let B=null,K=!1,nt=!0,yt=!1,dt=null,vt=0,Vt=0,jt=null,ht=[],Wt=null,te=null,xt=null,ee="orbit",ye=null,en=!1,Ni={};const Zi=new Map,Ui=new Map;let xn=null,Ot=null,nn=null,Zt=null,Nn={},Ki=a,Xn=null,vi=()=>!1,Xe=null,Me=null,Ue=null,Un=null,Yn=!1,ms=null,Ji=!1,$i=null;const Ys=new Mr(1.2,1.4,32);d.add(Ys);const P=new di({color:"#e9be69",side:_n,transparent:!0,opacity:.85});y.set("pilot-guide",P);const G=new Te(Ys,P);G.rotation.x=-Math.PI/2,G.visible=!1,G.userData.pilotGuide=!0,x.add(G);const $=new Map,Z=[],J={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},ut=new O,Pt=new O;let ft=!1;function Ct(b){Ot&&nn&&!b.some(gt=>gt.id===Ot)&&(b=[...b,{...nn,home_slot:Ue?.slot??nn.home_slot}]),E.configureHomes(!0,Yn?Ue?.slot:null,Math.max(ms??0,b.length,...b.map(gt=>(gt.home_slot??-1)+1))),ht=b,z.sync(b),ve.extent(z.bounds().back);const D=b.map(gt=>{if(!xt?.connected||!xt.room||![xt.room.from,xt.room.to].includes(gt.id)){const et=b.find(It=>It.is_me)?.id;return xt&&!xt.connected&&(gt.id===et||gt.meeting_with===et)?{...gt,meeting_with:null,meeting_spot:null}:gt}return{...gt,state:"online",meeting_with:xt.room.from===gt.id?xt.room.to:xt.room.from,meeting_spot:xt.room.spot}}),F=gt=>gt.id===B||gt.id===ye||gt.is_me||xn&&[xn.from,xn.to].includes(gt.id),V=[...D].sort((gt,et)=>+!!F(et)-+!!F(gt)||+!!et.meeting_with-+!!gt.meeting_with||{online:0,idle:1,offline:2}[gt.state]-{online:0,idle:1,offline:2}[et.state]||gt.id-et.id),X=[],Et={umum:0,operasional:0},Ut=[],Ce=new Map;let Pe=0,j=0;for(const gt of V){if(X.length>=24)break;gt.state==="online"&&Et[gt.department]>=16||(X.push(gt),gt.state==="online"&&Et[gt.department]++)}const Xt=new Set(X.map(gt=>gt.id));for(const[gt,et]of w)(!Xt.has(gt)||et.appearance!==JSON.stringify(X.find(It=>It.id===gt)?.avatar))&&(L.forget(gt),H.forget(gt),x.remove(et.group),et.label.remove(),et.ring.geometry.dispose(),d.delete(et.ring.geometry),et.privateGeometry.dispose(),d.delete(et.privateGeometry),et.ring.material.dispose(),y.delete(`ring-${gt}`),w.delete(gt));Et.umum=Et.operasional=0;for(const gt of X){let et=w.get(gt.id),It=!et;et||(et=Tt(gt),w.set(gt.id,et));const Be=et.game?.id,ai=et.pose,fn=et.home?.clone(),vn=gt.in_office===!1&&gt.state!=="offline",re=vn?null:$.get(gt.id)||gt.pilot,ae=gt.id===Ot&&Zt?Zt.state():re;et.person=gt,et.pose=zh(gt,m());let pe;et.game=Gh(gt,m());const dn=vn?null:Zi.get(gt.id)||gt.recreation,On=!vn&&xn&&xn.status!=="pending"&&[xn.from,xn.to].includes(gt.id);On?(et.game=es.find(qt=>qt.id===xn.kind)||et.game,et.pose="playing"):dn?.kind==="game"&&dn.until>Date.now()/1e3&&gt.state!=="offline"&&(et.game=es.find(qt=>qt.id===dn.destination)||et.game,et.pose="playing");const Qe=dn&&(!dn.until||dn.until>Date.now()/1e3)&&J[dn.destination];if(et.destination=!!Qe,Qe&&!On&&gt.state!=="offline"){et.pose=dn.kind==="drink"?"coffee":dn.kind==="food"?"eating":dn.kind==="dance"?"dancing":"resting",pe=[Qe[0]+gt.id%5*1.6,Qe[1],Qe[2]+Math.floor(gt.id%10/5)*1.3];const qt=E.nearest({x:pe[0],z:pe[2]});qt&&(pe=[qt.x,pe[1],qt.z]),et.group.rotation.y=Math.PI}else if(!vn&&gt.meeting_with&&Number.isInteger(gt.meeting_spot)&&!On){et.pose="meeting";const qt=gt.id<gt.meeting_with?-1:1;pe=[-36+gt.meeting_spot*6.5+qt*.9,-.12,20],et.facing=qt<0?Math.PI/2:-Math.PI/2}else if(et.pose==="working")pe=Ke[gt.department][Et[gt.department]++],et.group.rotation.y=Math.PI;else if(et.pose==="playing"){const qt=Ce.get(et.game.id)||0;Ce.set(et.game.id,qt+1);const Tn=qt%2?1:-1;pe=[et.game.x+(et.game.kind==="court"?Tn*(3-Math.floor(qt/2)%3*1.7):Math.floor(qt/2)*.8),-.12,et.game.z+Tn*(et.game.kind==="court"?3.6:2.5)],et.group.rotation.y=Tn<0?0:Math.PI}else if(et.pose==="sleeping")pe=z.bed(gt.id),et.group.rotation.y=0;else if(et.pose==="resting"){const qt=Pe++;pe=[-15.8+qt%8*2.02,.12,4.7+Math.floor(qt/8)*3.3],et.group.rotation.y=0}else if(j<8){const qt=j++,Tn=qt%4,Mi=qt<4?1:-1;pe=[(Tn%2?13.8:8)+Mi*1.65,.08,Tn<2?5.1:9.7],et.group.rotation.y=Mi*Math.PI/2}else{const qt=Pe++;pe=[-15.8+qt%8*2.02,.12,4.7+Math.floor(qt/8)*3.3],et.group.rotation.y=0}if(et.pose==="playing"&&et.game.id==="darts"&&(pe=[et.game.x+(gt.id%2?-1:1)*1.2,-.12,et.game.z+2.5]),["playing","meeting"].includes(et.pose)&&!E.free(pe[0],pe[2])){const qt=E.nearest({x:pe[0],z:pe[2]});qt&&(pe=[qt.x,pe[1],qt.z])}if((et.pose==="playing"||Qe)&&Ut.some(qt=>Math.hypot(qt[0]-pe[0],qt[2]-pe[2])<.7))t:for(const qt of[.8,1.5,2.2])for(let Tn=0;Tn<12;Tn++){const Mi=pe[0]+Math.cos(Tn*Math.PI/6)*qt,gs=pe[2]+Math.sin(Tn*Math.PI/6)*qt;if(E.free(Mi,gs)&&!Ut.some(ji=>Math.hypot(ji[0]-Mi,ji[2]-gs)<.7)){pe=[Mi,pe[1],gs];break t}}if(ae&&gt.state!=="offline"?(pe=[ae.x,ae.y,ae.z],et.pose="manual",et.manual=!0,et.group.rotation.y=ae.yaw,et.waypoints=[]):et.manual=!1,Ut.push(pe),et.target.set(...pe),et.home=et.target.clone(),(It||et.manual&&gt.id===Ot||ai!==et.pose&&et.pose!=="meeting"&&!Qe&&!On)&&et.group.position.copy(et.target),!et.manual&&!It&&(et.pose==="playing"&&(Be!==et.game.id||ai!=="playing")||(Qe||et.pose==="meeting")&&(!fn||fn.distanceTo(et.home)>.1))){if(!E.free(et.group.position.x,et.group.position.z)){const qt=E.nearest(et.group.position)||E.nearest({x:0,z:21.5});qt&&et.group.position.set(qt.x,pe[1],qt.z)}et.waypoints=E.withHomeAccess(z.slotFor(gt.id),()=>E.path(et.group.position,et.home)).map(qt=>new O(qt.x,pe[1],qt.z))}else!["playing","meeting"].includes(et.pose)&&!Qe&&(et.waypoints=[]);K&&et.pose==="meeting"&&(et.group.position.copy(et.home),et.group.rotation.y=et.facing,et.waypoints=[]),et.dot.className=`vo-dot ${gt.state}`,et.name.textContent=gt.name,et.icon.textContent=`${gt.state==="offline"?"OFFLINE ":gt.state==="idle"?"JEDA ":"ONLINE "}${et.pose==="meeting"?"💬":et.pose==="sleeping"?"☾ RUMAH":et.pose==="playing"?et.game.icon:et.pose==="coffee"?"☕":""}`,On&&xn.bot&&gt.id===xn.to&&(et.icon.textContent="OFFLINE · NPC "+et.game.icon),et.pose==="dancing"&&(et.icon.textContent=(gt.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),et.label.setAttribute("aria-label",`${gt.name}, ${gt.state==="online"?"online":gt.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),et.cup.visible=et.pose==="coffee",et.plate.visible=et.pose==="eating",et.manual&&(et.cup.visible=ae.action==="drink",et.plate.visible=ae.action==="eat",et.icon.textContent=(gt.private?"PRIVAT · ":"ONLINE · ")+(ae.action==="run"?"BOOST":ae.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),et.racket.visible=et.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(et.game.id),et.tool.visible=et.pose==="playing"&&["billiards","archery","darts"].includes(et.game.id),et.tool.visible&&(et.tool.geometry=lt(et.game.id)),et.shoes.forEach(qt=>{qt.visible=et.pose!=="sleeping"}),et.manual||et.eyes.forEach(qt=>{qt.scale.y=et.pose==="sleeping"?.18:1}),et.ring.visible=B===gt.id,et.label.setAttribute("aria-pressed",String(B===gt.id))}z.select(Wt??(w.get(B)?.pose==="sleeping"?B:null)),mt()}const Bt=new O;function ne(){const b=i.getBoundingClientRect(),D=[];for(const F of[...w.values()].sort((V,X)=>+(X.person.id===B)-+(V.person.id===B))){if(F.pose==="sleeping"){const j=z.location(F.person.id);Bt.set(j.x,5.2,j.z+1)}else F.group.getWorldPosition(Bt),Bt.y+=(L.form(F.person.id)?.height||1.8)+.55;Bt.project(v);const V=(Bt.x+1)/2*b.width,X=(1-Bt.y)/2*b.height;if(me.active()&&F.person.id!==Ot){F.label.hidden=!0;continue}const Et=166,Ut=27,Ce=D.some(j=>Math.abs(j.x-V)<Et&&Math.abs(j.y-X)<Ut),Pe=Bt.z<1&&Bt.z>-1&&V>18&&V<b.width-18&&X>15&&X<b.height-65&&(!Ce||F.person.id===B);F.label.hidden=!Pe,Pe&&(F.label.style.transform=`translate(${V}px,${X}px) translate(-50%,-100%)`,D.push({x:V,y:X}))}}function de(b=0){if(dt=null,yt||!nt)return;if(b-vt<1e3/30&&(!K||H.active())){dt=requestAnimationFrame(de);return}const D=Math.min(.06,Math.max(.001,(b-vt)/1e3));if(vt=b,ft){const j=1-Math.exp(-D*18);v.position.lerp(Pt,j),f.target.lerp(ut,j),v.position.distanceTo(Pt)<.04&&(v.position.copy(Pt),f.target.copy(ut),ft=!1)}let F=0;for(const j of w.values()){const Xt=K?0:b/1e3+j.phase;if(j.person.id===Ot&&Zt){const It=Y?W.yaw():Math.atan2(v.position.x-f.target.x,v.position.z-f.target.z),Be=[...w.values()].filter(ae=>ae!==j&&ae.pose!=="sleeping").map(ae=>ae.group.position),ai=vi();let fn=ai?{}:Nn;if((fn.x||fn.z||fn.jump)&&(Me=null,Xe=null),Me&&(Me.elapsed=(Me.elapsed||0)+D),Me?.elapsed>4&&(Me=null,Ki({...Zt.state(),restBlocked:!0})),Me&&!ai){const ae=Zt.state();if(ae.grounded)if(Me.point||(Me.point=su(E,ae,Me.pose,Be)),!Me.point)Me=null;else{const pe=Me.point.x-ae.x,dn=Me.point.z-ae.z,On=Math.hypot(pe,dn);if(On<.04)Zt.face({x:ae.x+Math.sin(Me.point.yaw),z:ae.z+Math.cos(Me.point.yaw)}),Xe={action:"rest",pose:Me.pose,venue:os(ae,Ue)?"home":["beach","garden","terrace","lounge","bar"].find(Qe=>$r(ae,Qe))||"campus"},Me=null,fn={};else{const Qe=Math.min(1,On/(4.5*D))/On;fn={x:(Math.cos(It)*pe-Math.sin(It)*dn)*Qe,z:(-Math.sin(It)*pe-Math.cos(It)*dn)*Qe}}}}const vn=L.modeState(Ot);(vn?.id||null)!==$i&&($i=vn?.id||null,Ve("follow",Ot)),Zt.setForm(L.form(Ot),vn?.expires),Y&&!it.weapon&&!["susanoo","kurama"].includes(vn?.id)&&Q(!1);const re=Zt.step(D,fn,It,Be);if(Y&&(Zt.face({x:re.x-Math.sin(It)*10,z:re.z-Math.cos(It)*10}),re.yaw=Zt.state().yaw),["walk","run","jump","fly","land"].includes(re.action)&&(Xe=null),Xe&&Object.assign(re,Xe),re.transformation=vn,re.transformationCooldown=L.modeCooldown(Ot),re.restPending=!!Me,j.group.position.set(re.x,re.y,re.z),j.group.rotation.y=re.yaw,j.manual=!0,j.pose="manual",j.home.copy(j.group.position),j.target.copy(j.group.position),Xn){const ae=Xn==="home"&&Ue?{x:Ue.x,z:Ue.z+5}:hi.venues[Xn];ae&&(re.target=Xn,re.distance=Math.round(Math.hypot(re.x-ae.x,re.z-ae.z)))}if(re.atHome=os(re,Ue),re.nearDoor=!!(Ue&&Math.hypot(re.x-Ue.x,re.z-Ue.z-3.9)<=2.8),re.doorOpen=Yn,Ue){const ae=os(re,Ue);ae!==me.active()&&(Ee(),ft=!1,z.select(ae?Un:null),ae&&(ee="follow",ye=Ot,f.enablePan=!1)),me.set(ae?Un:null,ae?j.group:null),re.interior=ae}else re.interior=!1;Ki({...re,...it,interior:me.active()}),j.icon.textContent=(j.person.private?"PRIVAT · ":"ONLINE · ")+(re.action==="run"?"BOOST":re.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(j.manual){const It=j.person.id===Ot&&Zt?{...Zt.state(),...it,...Xe||{}}:$.get(j.person.id)||j.person.pilot;if(It&&Y&&j.person.id===Ot&&(It.aim_pitch=-W.pitch()),H.observe(j.person.id,It,j,Date.now(),L.weaponAnchor(j.person.id)),It&&j.person.id!==Ot){const re=new O(It.x,It.y,It.z),ae=j.group.position.clone().lerp(re,.35);It.respawn_id!==j.respawnId?(j.respawnId=It.respawn_id,j.group.position.copy(re)):E.segment(j.group.position,ae,.3,!!(It.air_access||It.flight))?j.group.position.copy(ae):j.group.position.copy(re),j.group.rotation.y=It.yaw}j.person.id!==Ot&&L.observe(j.person.id,It,j),j.flight=!!It?.flight,j.moving=["walk","run"].includes(It?.action);const Be=L.pose(j.person.id),ai=h_(j,Be&&!["walk","run","jump","fly","land","rest"].includes(It?.action)?{...It,action:"cast",skillPose:Be}:It,{time:b/1e3+j.phase,dt:D,reduced:K});It?.weapon&&!It.form&&!["rest","play","drink","eat"].includes(It.action)&&(j.arms[1].rotation.x=-.7,j.arms[0].rotation.x=Y&&j.person.id===Ot?-.9:-.2);const fn=It?.action==="play"?es.find(re=>re.id===It.venue):null;j.racket.visible=!!(fn&&["tennis","badminton","pingpong","golf"].includes(fn.id)),j.tool.visible=!!(fn&&["billiards","archery","darts"].includes(fn.id)),j.tool.visible&&(j.tool.geometry=lt(fn.id)),j.cup.visible=It?.action==="drink",j.plate.visible=It?.action==="eat",It?.action==="rest"&&(j.icon.textContent=It.pose==="nap"?"ONLINE · TIDUR SANTAI":It.pose==="recline"?"ONLINE · REBAHAN":It.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const vn=L.form(j.person.id);vn&&(j.icon.textContent=(j.person.private?"PRIVAT · ":"ONLINE · ")+vn.name+(It?.flight?" · TERBANG":"")),ai.lying&&(!me.active()||j.person.id===Ot)&&(Jt.compose(new O(j.group.position.x+Math.sin(j.group.rotation.y)*.7,j.group.position.y+.035,j.group.position.z+Math.cos(j.group.rotation.y)*.7),j.group.quaternion,new O(1,1,1)),St.setMatrixAt(F++,Jt));continue}L.clearForm(j.person.id);const gt=j.pose==="playing",et=!K&&(gt||j.waypoints?.length>0);if(j.target.copy(j.home),gt&&!j.waypoints?.length&&(j.target.x+=Math.sin(Xt*.65)*(j.game.kind==="court"?1.4:.18),j.target.z+=Math.cos(Xt*.5)*(j.game.kind==="court"?.3:.08)),j.waypoints?.length&&!K){const It=j.waypoints[0];j.group.position.distanceTo(It)<.015?j.waypoints.shift():(j.group.rotation.y=Math.atan2(It.x-j.group.position.x,It.z-j.group.position.z),ue(j,It,D*3.2))}else gt?ue(j,j.target,K?0:D*1.4):j.pose==="meeting"?(ue(j,j.home,K?0:D*3.2),j.group.rotation.y=j.facing):j.group.position.copy(j.home);j.legs.forEach((It,Be)=>{It.rotation.x=et?Math.sin(Xt*4+Be*Math.PI)*.32:j.pose==="working"||j.pose==="resting"?-1.1:0}),j.body.position.y=Math.sin(Xt*1.6)*(K?0:j.pose==="sleeping"?.007:.018),j.body.rotation.x=j.pose==="sleeping"?-Math.PI/2:0,j.body.rotation.z=gt?Math.sin(Xt*1.5)*.07:0,j.head.rotation.x=j.pose==="sleeping"?0:Math.sin(Xt*.6)*(K?0:.025),j.arms[0].rotation.x=j.pose==="working"?-.65+Math.sin(Xt*5)*(K?0:.045):j.pose==="eating"?-1.05:.1,j.arms[1].rotation.x=j.pose==="working"?-.65+Math.sin(Xt*5+1)*(K?0:.045):j.pose==="coffee"?-1.2+Math.sin(Xt*1.2)*(K?0:.13):j.pose==="eating"?-.8+Math.sin(Xt*2)*(K?0:.13):.1,gt&&(j.arms[1].rotation.x=-.6+Math.sin(Xt*2.3)*(K?0:.7),j.arms[0].rotation.x=-.25+Math.sin(Xt*2.3+1)*(K?0:.25)),j.pose==="dancing"&&!et&&(j.body.rotation.z=K?0:Math.sin(Xt*2.4)*.13,j.arms.forEach((It,Be)=>{It.rotation.x=-.8+Math.sin(Xt*2.4+Be)*(K?0:.5)}),j.legs.forEach((It,Be)=>{It.rotation.x=K?0:Math.sin(Xt*2.4+Be*Math.PI)*.25})),j.pose==="meeting"?(j.arms[1].rotation.x=-.2+Math.sin(Xt*1.7)*(K||et?0:.18),j.head.rotation.y=Math.sin(Xt*.7)*(K?0:.06)):j.head.rotation.y=0}St.count=F,St.instanceMatrix.needsUpdate=!0,L.update(Date.now(),Zt?.state()),H.update(Date.now(),K||en);const V=w.get(ye);if(!Y&&ee!=="orbit"&&V&&!ft){const Xt=V.group.position.clone().add(new O(0,L.form(ye)?.height*.55||(V.pose==="sleeping"?.25:1.3),V.pose==="sleeping"?-1.3:0)).clone().sub(f.target).multiplyScalar(1-Math.exp(-D*8.6));f.target.add(Xt),v.position.add(Xt)}ve.update(b,{paused:K,dark:document.documentElement.classList.contains("dark"),center:f.target}),ce.update(b,{paused:K,energySaver:en}),$t.update(b,K);for(const{mesh:j,game:Xt}of Se){const gt=K?0:b/1e3,It=[...w.values()].some(Be=>Be.manual?(Be.person.id===Ot?Xe:$.get(Be.person.id)||Be.person.pilot)?.action==="play"&&(Be.person.id===Ot?Xe:$.get(Be.person.id)||Be.person.pilot)?.venue===Xt.id:!Hh(m())&&Be.pose==="playing"&&Be.game.id===Xt.id)?Math.sin(gt*1.8):0;j.position.set(Xt.x+(Xt.id==="golf"?It*4:It*1.5),Xt.id==="pingpong"?1.45+Math.abs(It)*.65:Xt.id==="basketball"?.15+Math.abs(It)*2.2:Xt.id==="bowling"||Xt.id==="golf"?.06:.4+Math.abs(It)*2,Xt.z+It*(Xt.kind==="court"?4:1.3))}Y&&V?(v.position.copy(V.group.position).add(new O(0,L.form(Ot)?.height*.55||1.2,0)),f.target.copy(v.position).addScaledVector(W.direction(),10)):f.update();const X=v.position.clone(),Et=v.quaternion.clone();!Y&&ee!=="orbit"&&V&&v.position.copy(A.resolve(E,f.target,X,z.cameraBoxes(ye),me.active()?2.6:L.form(ye)?.height*.85||(ee==="portrait"?2.8:3.8),me.active()?8:L.form(ye)?55:35,D)),v.lookAt(f.target),v.updateMatrixWorld(!0),jt?jt.copy(v):jt=v.clone();const Ut=U.update(w.get(I),v,{time:b/1e3,height:L.form(I)?.height||1.8,reduced:K||en});(K||b-k>100)&&(c(Ut?{x:(Ut.x+1)/2*i.clientWidth,y:(1-Ut.y)/2*i.clientHeight,visible:Ut.z>-1&&Ut.z<1&&Math.abs(Ut.x)<1&&Math.abs(Ut.y)<1}:null),k=b),me.apply();const Ce=Y?[w.get(Ot)?.group,L.weaponAnchor(Ot)].filter(Boolean).map(j=>[j,j.visible]):[];for(const[j]of Ce)j.visible=!1;const Pe=Y?H.firstPerson(Ot,v):()=>{};try{u.render(x,v)}finally{Pe();for(const[j,Xt]of Ce)j.visible=Xt}(K||b-Vt>120||ft)&&(ne(),Vt=b),v.position.copy(X),v.quaternion.copy(Et),v.updateMatrixWorld(!0),(!K||H.active()||ft||Me||Zt?.moving()||Zt&&Zt.state().stamina<100||!vi()&&(Math.abs(Nn.x||0)+Math.abs(Nn.z||0)>0||Nn.jump))&&mt()}function mt(){!yt&&nt&&dt===null&&(dt=requestAnimationFrame(de))}function ue(b,D,F){const V=z.location(b.person.id),X=V&&Math.abs(b.group.position.x-V.x)<4.8&&Math.abs(b.group.position.z-V.z)<5;return!!X!=!!b.npcDoorOpen&&(b.npcDoorOpen=!!X,z.setDoor(b.person.id,!!X)),E.withHomeAccess(z.slotFor(b.person.id),()=>qe(b,D,F))}function qe(b,D,F){const V=E.move(b.group.position,D,F),X=Math.hypot(V.x-b.group.position.x,V.z-b.group.position.z),Et=[...w.values()].some(Ut=>Ut!==b&&Ut.pose!=="sleeping"&&Math.hypot(V.x-Ut.group.position.x,V.z-Ut.group.position.z)<.62);if(Et||b.group.position.set(V.x,b.home.y,V.z),(Et||X<.001&&b.group.position.distanceTo(D)>.2)&&vt>=(b.repathAt||0)&&(b.pose==="meeting"||b.waypoints?.length)){b.repathAt=vt+1500;const Ut=[...w.values()].filter(Pe=>Pe!==b&&Pe.pose!=="sleeping").map(Pe=>Pe.group.position),Ce=E.path(b.group.position,b.home,Ut);Ce.length&&(b.waypoints=Ce.map(Pe=>new O(Pe.x,b.home.y,Pe.z)))}}function Re(){if(yt)return;const b=i.getBoundingClientRect();b.width<1||b.height<1||(u.setSize(b.width,b.height,!1),v.aspect=b.width/b.height,v.updateProjectionMatrix(),mt())}function Ee(b=!0){Wt=null;const D=te;if(te=null,!D||(z.select(null),!b))return;ls(f);const F=w.get(D.followId)?.group.position,V=D.anchor&&F?F.clone().sub(D.anchor):new O;ee=D.mode,ye=D.followId,f.enablePan=D.pan,f.minDistance=D.min,f.maxDistance=D.max,v.fov=D.fov,v.updateProjectionMatrix(),v.position.copy(D.position).add(V),f.target.copy(D.target).add(V),ut.copy(D.focus).add(V),Pt.copy(D.goal).add(V),ft=D.easing}function sn(b="all"){if(me.active()){Ve("follow",Ot);return}Ee(!1),ls(f),ee="orbit",ye=null,v.fov=36,v.updateProjectionMatrix(),f.enablePan=!0,f.minDistance=8,f.maxDistance=650;const D=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const Et of es)F[Et.id]=[[Et.x,.3,Et.z],[Et.x+14,19,Et.z+22]];for(const[Et,Ut]of Object.entries(J))F[Et]=[Ut,[Ut[0]+12,19,Ut[2]+22]];const[V,X]=F[b]||F.all;if(ut.set(...V),Pt.set(...X),b==="all"||b==="residences"){const Et=z.bounds(),Ut=b==="all"?76:Et.front,Ce=Et.right-Et.left,Pe=Ut-Et.back;ut.set(0,0,(Ut+Et.back)/2);const j=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Xt=Math.min(Qn.degToRad(v.fov/2),Math.atan(Math.tan(Qn.degToRad(v.fov/2))*j)),gt=Math.hypot(Ce,Pe)/2/Math.sin(Xt)*1.07;Pt.copy(new O(1,1.18,1.3).normalize().multiplyScalar(gt).add(ut))}else D&&Pt.sub(ut).multiplyScalar(1.23).add(ut);Wt=null,z.select(w.get(B)?.pose==="sleeping"?B:null),K?(v.position.copy(Pt),f.target.copy(ut),ft=!1):ft=!0,mt()}function zt(b){if(me.active()){Ve("follow",Ot);return}const D=z.location(b);D&&(ls(f),te||(te={mode:ee,followId:ye,anchor:w.get(ye)?.group.position.clone(),position:v.position.clone(),target:f.target.clone(),focus:ut.clone(),goal:Pt.clone(),easing:ft,fov:v.fov,min:f.minDistance,max:f.maxDistance,pan:f.enablePan}),ee="orbit",ye=null,f.enablePan=!0,f.minDistance=5,f.maxDistance=650,v.fov=36,v.updateProjectionMatrix(),Wt=b,z.select(b),ut.set(D.x,1.2,D.z),Pt.copy(ut).add(new O(11,12,15)),i.clientWidth<600&&Pt.sub(ut).multiplyScalar(1.23).add(ut),K?(v.position.copy(Pt),f.target.copy(ut),ft=!1):ft=!0,mt())}function Ve(b,D=B){if(Y&&Q(!1),A.reset(),me.active()&&(b="follow",D=Ot),Ee(!1),ls(f),b==="orbit"){ee="orbit",ye=null,v.fov=36,v.updateProjectionMatrix(),f.enablePan=!0,f.minDistance=5,f.maxDistance=650,mt();return}!w.has(D)&&ht.some(X=>X.id===D)&&(B=D,Ct(ht));const F=w.get(D);if(!F)return;const V=L.form(D);ee=b==="portrait"?"portrait":"follow",ye=D,f.enablePan=!1,f.minDistance=me.active()?2.6:V?V.height*.85:ee==="portrait"?2.8:3.8,f.maxDistance=me.active()?8:V?55:35,v.fov=me.active()?58:44,v.updateProjectionMatrix(),ut.copy(F.group.position).add(new O(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),V&&(ut.y=F.group.position.y+V.height*.55),Pt.copy(ut).add(V?new O(V.height*.85,V.height*.65,V.height*1.1):ee==="portrait"?new O(1.8,.9,2.7):new O(4,2.5,5)),K?(v.position.copy(Pt),f.target.copy(ut),ft=!1):ft=!0,mt()}let he=null;const si=new di({transparent:!0,opacity:0,depthWrite:!1});y.set("game-hotspots",si);for(const b of es){const D=new on(6,1.4,.4),F=new on(b.kind==="court"?16:9,.18,b.kind==="court"?12:7);D.translate(0,.7,-(b.kind==="court"?6:4.2)),F.translate(0,-.14,0);const V=D.toNonIndexed(),X=F.toNonIndexed(),Et=pi([V,X],!1);D.dispose(),F.dispose(),V.dispose(),X.dispose(),d.add(Et);const Ut=new Te(Et,si);Ut.position.set(b.x,0,b.z),Ut.userData.officeGame=b.id,x.add(Ut),Z.push(Ut)}const We=new dh,Qi=new Ft,qn=b=>{b.button===2&&(tt=!Y,Q(!0)),Mt=[b.clientX,b.clientY],he=[b.clientX,b.clientY]},ri=b=>{if(!Y||vi()||b.pointerType==="touch"&&!he)return;const D=Mt;Mt=[b.clientX,b.clientY],document.pointerLockElement===u.domElement?W.move(b.movementX||0,b.movementY||0):D&&W.move(b.clientX-D[0],b.clientY-D[1]),mt()},ge=b=>{if(b.button===2){tt&&Q(!1),tt=!1,he=null;return}if(!he||Math.hypot(b.clientX-he[0],b.clientY-he[1])>6)return;if(he=null,Y&&!vi()){l(!1);return}const D=u.domElement.getBoundingClientRect();Qi.set((b.clientX-D.left)/D.width*2-1,-(b.clientY-D.top)/D.height*2+1),We.setFromCamera(Qi,jt||v);const F=We.intersectObjects([...w.values()].map(X=>X.group).concat(z.meshes,ce.targets,$t.targets,Z,L.targets(),U.root.visible?[U.root]:[]),!0)[0],V=z.personForHit(F);if(V===Un&&F?.object.userData.residenceLayer==="door"){o();return}V?(e(V),zt(V)):F?.object.userData.officeHologramOwner?e(F.object.userData.officeHologramOwner):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function $e(){const b=document.documentElement.classList.contains("dark");u.toneMappingExposure=b?1.02:1.18,ve.configure(Ni,en),mt()}const wn=new ResizeObserver(Re);wn.observe(i);const ke=new MutationObserver($e);ke.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const Je=b=>{b.preventDefault(),yt||n()},Fn=b=>{(Y||it.weapon)&&b.preventDefault()},oi=()=>{tt=!1,he=null,Q(!1)},Yl=()=>{tt&&oi()},ql=b=>{b.button===2&&tt&&oi()},Zl=()=>{Y&&at?.locked&&document.pointerLockElement!==u.domElement&&oi(),at&&(at.locked=document.pointerLockElement===u.domElement)};document.addEventListener?.("pointerlockchange",Zl),window.addEventListener?.("blur",oi),window.addEventListener?.("pointerup",ql),u.domElement.addEventListener("pointercancel",oi),u.domElement.addEventListener("lostpointercapture",Yl),u.domElement.addEventListener("pointerdown",qn,!0),u.domElement.addEventListener("pointermove",ri),u.domElement.addEventListener("pointerup",ge),u.domElement.addEventListener("contextmenu",Fn),u.domElement.addEventListener("webglcontextlost",Je);const Ch=()=>mt();return f.addEventListener("change",Ch),f.addEventListener("start",()=>{ft=!1}),$e(),sn("all"),v.position.copy(Pt),f.target.copy(ut),ft=!1,Re(),{setPeople:Ct,resize:Re,focusRoom:sn,visitHome:zt,setCameraMode:Ve,setAiming:Q,isAiming:()=>Y,lockAim(){if(Y)try{u.domElement.requestPointerLock?.()?.catch?.(()=>{})}catch{}},aimPoint(b=65){if(!Zt)return null;const D=jt||v;if(We.setFromCamera(new Ft(0,0),D),Y){const Ut=Zt.state();We.ray.origin.set(Ut.x,Ut.y+(L.form(Ot)?.height*.55||1.2),Ut.z),We.ray.direction.copy(W.direction())}const F=We.ray.origin.clone(),V=We.ray.at(b+(Y?0:v.position.distanceTo(f.target)),new O),X=E.rayLimit(F,V);V.lerpVectors(F,V,X);const Et=We.intersectObjects([...w.values()].filter(Ut=>Ut.person.id!==Ot).map(Ut=>Ut.group).concat(L.targets().filter(Ut=>Ut.userData.officeAbility!==Ot)),!0);return Et[0]&&Et[0].distance<F.distanceTo(V)&&V.copy(Et[0].point),Zt.face(V),mt(),{x:V.x,y:V.y,z:V.z}},combatState:Lt,facePilot(b){const D=w.get(b);D&&Zt&&Zt.face(D.group.position)},respawnPilot(b){if(!Zt)return;Q(!1),me.leave(),Ee(!1),L.forget(Ot),Ji=!1,$i=null,Xe=null,Me=null,Nn={},it={},Lt(b),Zt.reset({...b,flight:!1,air_access:!1}),Yn=!1,E.configureHomes(!0,null,ms??128),Un&&z.setDoor(Un,!1);const D=w.get(Ot);D&&D.group.position.set(b.x,b.y,b.z),Ve("follow",Ot),mt()},showHologram(b){I=b!==null&&(b===Un||b===Ot||w.get(b)?.person.is_me)?b:null,I===null&&U.hide(),mt()},collisionBoxes:()=>E.boxes(),setPilotReporter(b){Ki=b},castSkill(b=0){const D=w.get(Ot);if(!D||!Zt)return{error:"Aktifkan kendali avatar dahulu."};const F=Bh(Jl(D.person.avatar).costume)[b];return F?L.cooldown(Ot)?{error:`Pulihkan energi ${L.cooldown(Ot)} detik lagi.`}:F.type==="transform"&&(me.active()||!E.free(Zt.state().x,Zt.state().z,Zt.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&L.modeCooldown(Ot)?{error:`Transformasi pulih dalam ${L.modeCooldown(Ot)} detik.`}:(Xe=null,Me=null,L.cast(Ot,F.id,D)?(mt(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(b,D){if(!b||!Zt)return;Lt(b);const F=D?.receivedAt??Date.now(),V=D?.sentAt??F;if(Number.isFinite(b.updated_ms)&&L.clock(b.updated_ms-(V+F)/2,Math.max(0,F-V)),Ji&&b.form)return;b.form||(Ji=!1),L.observe(Ot,b,w.get(Ot),!0);const X=L.modeState(Ot);Zt.setForm(L.form(Ot),X?.expires),mt()},toggleFlight(){const b=Zt?.toggleFlight();return mt(),b},endTransformation(){Ji=!0,$i=null,L.clearForm(Ot),Zt?.setForm(null),Ve("follow",Ot),mt()},activeTransformation:()=>L.modeState(Ot),setPrivatePilotProfile(b){nn&&(nn={...nn,avatar:b},Ct(ht.map(D=>D.id===nn.id?nn:D)))},setPilotGate(b){vi=b},reconcilePilot(b){Zt&&(Zt.reset(b),Xe=null,Me=null,Nn={},mt())},configureHome(b,D,F=null){Un=b,Ue=D?ma(D.slot):null,ms=Number.isInteger(F)?Math.min(128,F):null,z.setPlots(ms??0)},canUseDoor(){const b=Zt?.state();return!!(Ue&&b&&(os(b,Ue)||Math.hypot(b.x-Ue.x,b.z-Ue.z-3.9)<=2.8))},homeDoorOpen:()=>Yn,setHomeDoor(b){Yn!==!!b&&(Yn=!!b,E.configureHomes(!0,Yn?Ue?.slot:null),Un&&z.setDoor(Un,Yn),mt())},setRestPose(b){if(!Zt)return!1;if(b&&Q(!1),L.cancel(Ot),Me=null,Xe=null,Nn={},!b)return mt(),!0;if(!["sit","recline","nap","meditate"].includes(b))return!1;const D=Zt.state(),F=[...w.values()].filter(X=>X.person.id!==Ot&&X.pose!=="sleeping").map(X=>X.group.position),V=D.grounded?su(E,D,b,F):null;return D.grounded&&!V?!1:(Me={pose:b,point:V},V&&Math.hypot(V.x-D.x,V.z-D.z)<.04&&(Zt.face({x:D.x+Math.sin(V.yaw),z:D.z+Math.cos(V.yaw)}),Xe={action:"rest",pose:b,venue:os(D,Ue)?"home":["beach","garden","terrace","lounge","bar"].find(X=>$r(D,X))||"campus"},Me=null),mt(),!0)},setPilot(b,D,F=null){Ot=b,nn=F,it={},Lt(D),Zt=a_(E,D),Ct(ht),Ve("follow",b),mt()},releasePilot(){Q(!1),me.leave(),L.clearForm(Ot),Ji=!1,$i=null;const b=nn?.id;Ot=null,nn=null,Zt=null,Nn={},Xe=null,Me=null,Xn=null,G.visible=!1,Ct(ht.filter(D=>D.id!==b))},setPilotInput(b){Nn=b||{},mt()},pilotState(){return Zt?{...Zt.state(),...it,...Xe||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Ot&&(Ve("follow",Ot),i.focus?.({preventScroll:!0}))},setPeerPilots(b){$.clear();for(const D of b)D.id!==Ot&&$.set(D.id,D);Ct(ht.map(D=>({...D,pilot:$.get(D.id)||null,in_office:$.has(D.id)||D.id===Ot})))},canInteract(b){return $r(Zt?.state(),b)},guideTo(b){const D=b==="home"&&Ue?{x:Ue.x,z:Ue.z+5}:hi.venues[b];if(Xn=D?b:null,G.visible=!!D,D){G.position.set(D.x,.025,D.z);const F=Zt?.state();Ki({...F,target:b,distance:F?Math.round(Math.hypot(D.x-F.x,D.z-F.z)):null}),mt()}return D},interactNearest(){const b=Zt?.state();if(!b)return!1;if(Ue&&(os(b,Ue)||Math.hypot(b.x-Ue.x,b.z-Ue.z-3.9)<=2.8))return o(),!0;const D=Object.keys(hi.venues).filter(F=>$r(b,F)).sort((F,V)=>Math.hypot(b.x-hi.venues[F].x,b.z-hi.venues[F].z)-Math.hypot(b.x-hi.venues[V].x,b.z-hi.venues[V].z))[0];return es.some(F=>F.id===D)?(r(D),!0):["bar","disco","beach","garden","terrace","lounge","armory"].includes(D)?(s(D),!0):!1},setRecreation(b,D){Number(b)===Ot&&D&&(Xe={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[D.kind]||"idle",venue:D.destination,pose:D.kind==="relax"?"sit":null}),Zi.set(Number(b),D?{...D,until:D.until||Date.now()/1e3+900}:null),Ct(ht)},setVenueEffects(b){ce.setEnabled(b),mt()},setGame(b){JSON.stringify(xn)!==JSON.stringify(b)&&(xn=b,Ot&&b?.status==="playing"&&[b.from,b.to].includes(Ot)?Xe={action:"play",venue:b.kind}:Xe?.action==="play"&&(Xe=null),Ct(ht))},say(b,D){const F=w.get(Number(b));F&&(F.bubble.textContent=String(D||"").slice(0,350),F.bubble.hidden=!1,Ui.has(b)&&clearTimeout(Ui.get(b)),Ui.set(b,setTimeout(()=>{F.bubble.hidden=!0,Ui.delete(b),mt()},1e4)),mt())},configureWorld(b){Ni=b||{},ve.configure(Ni,en),bt("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[Ni.settings?.landscape]||"#47695f"),mt()},setEnergySaver(b){en=!!b,u.setPixelRatio(en?1:Math.min(window.devicePixelRatio||1,1.5)),ve.configure(Ni,en),Re()},setMeeting(b){xt=b,Ct(ht)},meetingReady(){if(Ot&&xt?.connected&&xt.room){const D=w.get(xt.room.from),F=w.get(xt.room.to);if(!D||!F||D.group.position.distanceTo(F.group.position)>3)return!1;const V=F.group.position.x-D.group.position.x,X=F.group.position.z-D.group.position.z,Et=Math.hypot(V,X);return Et>.2&&(Math.sin(D.group.rotation.y)*V+Math.cos(D.group.rotation.y)*X)/Et>.45&&(-Math.sin(F.group.rotation.y)*V-Math.cos(F.group.rotation.y)*X)/Et>.45}const b=xt?.room;return!b||!xt.connected?!1:[b.from,b.to].every(D=>{const F=w.get(D);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(b,D=!1){B!==b&&Ee(),B=b,b&&!w.has(b)&&ht.some(V=>V.id===b)&&Ct(ht);for(const[V,X]of w)X.ring.visible=V===b,X.label.setAttribute("aria-pressed",String(V===b));const F=w.get(b);if(z.select(Wt??(F?.pose==="sleeping"?b:null)),F&&D&&Ot&&b!==Ot&&Zt){Zt.face(F.group.position),mt();return}if(F&&D&&ee!=="orbit"){Ve(ee,b);return}if(F&&D&&F.pose==="sleeping"){zt(b);return}F&&D&&(ut.copy(F.target).add(new O(0,1,0)),Pt.copy(ut).add(new O(11,11,14)),K?(v.position.copy(Pt),f.target.copy(ut)):ft=!0),mt()},zoom(b){if(!Number.isFinite(b)||b<=0)return;ft=!1;const D=v.position.clone().sub(f.target);D.setLength(Qn.clamp(D.length()*b,f.minDistance,f.maxDistance)),v.position.copy(f.target).add(D),f.update(),mt()},setPaused(b){if(K=b,K&&ft&&(v.position.copy(Pt),f.target.copy(ut),ft=!1),K)for(const D of w.values())D.pose==="meeting"&&(D.group.position.copy(D.home),D.group.rotation.y=D.facing,D.waypoints=[]);dt!==null&&cancelAnimationFrame(dt),dt=null,mt()},setVisible(b){nt=b,!b&&dt!==null?(cancelAnimationFrame(dt),dt=null):b&&(vt=0,Re(),mt())},dispose(){yt=!0,dt!==null&&cancelAnimationFrame(dt),dt=null,wn.disconnect(),ke.disconnect(),f.dispose(),me.dispose(),L.dispose(),U.dispose(),H.dispose();for(const b of Ui.values())clearTimeout(b);Ui.clear(),Zi.clear(),u.domElement.removeEventListener("pointerdown",qn,!0),u.domElement.removeEventListener("pointermove",ri),u.domElement.removeEventListener("pointerup",ge),u.domElement.removeEventListener("contextmenu",Fn),u.domElement.removeEventListener("webglcontextlost",Je),document.removeEventListener?.("pointerlockchange",Zl),document.pointerLockElement===u.domElement&&document.exitPointerLock?.(),window.removeEventListener?.("blur",oi),window.removeEventListener?.("pointerup",ql),u.domElement.removeEventListener("pointercancel",oi),u.domElement.removeEventListener("lostpointercapture",Yl),z.dispose(),St.dispose(),ve.dispose();for(const b of d)b.dispose();for(const b of y.values())b.dispose();for(const b of M)b.dispose();w.forEach(b=>b.label.remove()),w.clear(),x.clear(),u.dispose(),u.forceContextLoss(),u.domElement.remove()}}}export{v_ as createOfficeScene};
