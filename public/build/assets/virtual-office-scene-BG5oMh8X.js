import{m as wn,w as Su,c as rs,t as yu,a as bu,g as Vi,s as Eu,b as Fl,p as Tu,d as Au,e as wu,i as Ru}from"./virtual-office-D9h6MFBN.js";const ko="187",$i={ROTATE:0,DOLLY:1,PAN:2},Ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Xc=0,Na=1,Yc=2,qs=1,qc=2,vs=3,Ii=0,_n=1,fn=2,Qi=0,Ss=1,ir=2,Ua=3,Fa=4,Zc=5,Ki=100,Kc=101,Jc=102,$c=103,Qc=104,jc=200,th=201,eh=202,nh=203,Ya=204,qa=205,ih=206,sh=207,rh=208,oh=209,ah=210,lh=211,ch=212,hh=213,uh=214,Zr=0,Kr=1,Jr=2,bs=3,$r=4,Qr=5,jr=6,to=7,Za=0,fh=1,dh=2,ri=0,Ka=1,Ja=2,$a=3,Ho=4,Qa=5,ja=6,tl=7,el=300,ji=301,Es=302,Hr=303,Vr=304,eo=1e3,si=1001,no=1002,on=1003,ph=1004,Xs=1005,gn=1006,Wr=1007,gi=1008,Sn=1009,nl=1010,il=1011,Ts=1012,Vo=1013,Xn=1014,Nn=1015,Yn=1016,Wo=1017,Xo=1018,ts=1020,sl=35902,rl=35899,ol=1021,al=1022,Vn=1023,Mi=1026,_i=1027,Yo=1028,qo=1029,Ni=1030,Zo=1031,Ko=1033,Zs=33776,Ks=33777,Js=33778,$s=33779,io=35840,so=35841,ro=35842,oo=35843,ao=36196,lo=37492,co=37496,ho=37488,uo=37489,sr=37490,fo=37491,po=37808,mo=37809,go=37810,_o=37811,xo=37812,vo=37813,Mo=37814,So=37815,yo=37816,bo=37817,Eo=37818,To=37819,Ao=37820,wo=37821,Ro=36492,Co=36494,Po=36495,Do=36283,Lo=36284,rr=36285,Io=36286,mh=3200,No=0,gh=1,mi="",mn="srgb",or="srgb-linear",ar="linear",we="srgb",Xr=7680,_h=519,xh=512,vh=513,Mh=514,ll=515,Sh=516,yh=517,cl=518,hl=519,bh=35044,ul=35048,Oa="300 es",Un=2e3,As=2001;function Cu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Uo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Eh(){const i=Uo("canvas");return i.style.display="block",i}const Ol={};function Ba(...i){const t="THREE."+i.shift();console.log(t,...i)}function Th(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Kt(...i){i=Th(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Me(...i){i=Th(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Qs(...i){const t=i.join(" ");t in Ol||(Ol[t]=!0,Kt(...i))}function Pu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Du={[Zr]:Zr,[Jr]:jr,[$r]:$r,[bs]:Qr,[Kr]:Kr,[jr]:Jr,[to]:to,[Qr]:bs};class yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bl=1234567;const js=Math.PI/180,lr=180/Math.PI;function Ps(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[e&63|128]+hn[e>>8&255]+"-"+hn[e>>16&255]+hn[e>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function oe(i,t,e){return Math.max(t,Math.min(e,i))}function fl(i,t){return(i%t+t)%t}function Lu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Iu(i,t,e){return i!==t?(e-i)/(t-i):0}function tr(i,t,e){return(1-e)*i+e*t}function Nu(i,t,e,n){return tr(i,t,1-Math.exp(-e*n))}function Uu(i,t=1){return t-Math.abs(fl(i,t*2)-t)}function Fu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ou(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Bu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function zu(i,t){return i+Math.random()*(t-i)}function Gu(i){return i*(.5-Math.random())}function ku(i){i!==void 0&&(Bl=i);let t=Bl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hu(i){return i*js}function Vu(i){return i*lr}function Wu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Xu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ah(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),f=o((t+n)/2),g=r((t-n)/2),d=o((t-n)/2),h=r((n-t)/2),_=o((n-t)/2);switch(s){case"XYX":i.set(a*f,c*g,c*d,a*l);break;case"YZY":i.set(c*d,a*f,c*g,a*l);break;case"ZXZ":i.set(c*g,c*d,a*f,a*l);break;case"XZX":i.set(a*f,c*_,c*h,a*l);break;case"YXY":i.set(c*h,a*f,c*_,a*l);break;case"ZYZ":i.set(c*_,c*h,a*f,a*l);break;default:Kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function dl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function wh(i,t){if(t.constructor===Float32Array)return i;const e=dl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Rh(i,t){if(t.constructor===Float32Array)return i;const e=dl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Di={DEG2RAD:js,RAD2DEG:lr,generateUUID:Ps,clamp:oe,euclideanModulo:fl,mapLinear:Lu,inverseLerp:Iu,lerp:tr,damp:Nu,pingpong:Uu,smoothstep:Fu,smootherstep:Ou,randInt:Bu,randFloat:zu,randFloatSpread:Gu,seededRandom:ku,degToRad:Hu,radToDeg:Vu,isPowerOfTwo:Wu,ceilPowerOfTwo:Xu,floorPowerOfTwo:Ah,setQuaternionFromProperEuler:Yu,normalize:Rh,denormalize:wh},Ll=class Ll{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ll.prototype.isVector2=!0;let Nt=Ll;class yn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],f=n[s+2],g=n[s+3],d=r[o+0],h=r[o+1],_=r[o+2],M=r[o+3];if(g!==M||c!==d||l!==h||f!==_){let p=c*d+l*h+f*_+g*M;p<0&&(d=-d,h=-h,_=-_,M=-M,p=-p);let m=1-a;if(p<.9995){const y=Math.acos(p),b=Math.sin(y);m=Math.sin(m*y)/b,a=Math.sin(a*y)/b,c=c*m+d*a,l=l*m+h*a,f=f*m+_*a,g=g*m+M*a}else{c=c*m+d*a,l=l*m+h*a,f=f*m+_*a,g=g*m+M*a;const y=1/Math.sqrt(c*c+l*l+f*f+g*g);c*=y,l*=y,f*=y,g*=y}}t[e]=c,t[e+1]=l,t[e+2]=f,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],f=n[s+3],g=r[o],d=r[o+1],h=r[o+2],_=r[o+3];return t[e]=a*_+f*g+c*h-l*d,t[e+1]=c*_+f*d+l*g-a*h,t[e+2]=l*_+f*h+a*d-c*g,t[e+3]=f*_-a*g-c*d-l*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),f=a(s/2),g=a(r/2),d=c(n/2),h=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=d*f*g+l*h*_,this._y=l*h*g-d*f*_,this._z=l*f*_+d*h*g,this._w=l*f*g-d*h*_;break;case"YXZ":this._x=d*f*g+l*h*_,this._y=l*h*g-d*f*_,this._z=l*f*_-d*h*g,this._w=l*f*g+d*h*_;break;case"ZXY":this._x=d*f*g-l*h*_,this._y=l*h*g+d*f*_,this._z=l*f*_+d*h*g,this._w=l*f*g-d*h*_;break;case"ZYX":this._x=d*f*g-l*h*_,this._y=l*h*g+d*f*_,this._z=l*f*_-d*h*g,this._w=l*f*g+d*h*_;break;case"YZX":this._x=d*f*g+l*h*_,this._y=l*h*g+d*f*_,this._z=l*f*_-d*h*g,this._w=l*f*g-d*h*_;break;case"XZY":this._x=d*f*g-l*h*_,this._y=l*h*g-d*f*_,this._z=l*f*_+d*h*g,this._w=l*f*g+d*h*_;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],f=e[6],g=e[10],d=n+a+g;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(f-c)*h,this._y=(r-l)*h,this._z=(o-s)*h}else if(n>a&&n>g){const h=2*Math.sqrt(1+n-a-g);this._w=(f-c)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+l)/h}else if(a>g){const h=2*Math.sqrt(1+a-n-g);this._w=(r-l)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(c+f)/h}else{const h=2*Math.sqrt(1+g-n-a);this._w=(o-s)/h,this._x=(r+l)/h,this._y=(c+f)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,f=e._w;return this._x=n*f+o*a+s*l-r*c,this._y=s*f+o*c+r*a-n*l,this._z=r*f+o*l+n*c-s*a,this._w=o*f-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),f=Math.sin(l);c=Math.sin(c*l)/f,e=Math.sin(e*l)/f,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Il=class Il{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),f=2*(a*e-r*s),g=2*(r*n-o*e);return this.x=e+c*l+o*g-a*f,this.y=n+c*f+a*l-r*g,this.z=s+c*g+r*f-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return aa.copy(this).projectOnVector(t),this.sub(aa)}reflect(t){return this.sub(aa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Il.prototype.isVector3=!0;let B=Il;const aa=new B,zl=new yn,Nl=class Nl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const f=this.elements;return f[0]=t,f[1]=s,f[2]=a,f[3]=e,f[4]=r,f[5]=c,f[6]=n,f[7]=o,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],f=n[4],g=n[7],d=n[2],h=n[5],_=n[8],M=s[0],p=s[3],m=s[6],y=s[1],b=s[4],A=s[7],S=s[2],x=s[5],u=s[8];return r[0]=o*M+a*y+c*S,r[3]=o*p+a*b+c*x,r[6]=o*m+a*A+c*u,r[1]=l*M+f*y+g*S,r[4]=l*p+f*b+g*x,r[7]=l*m+f*A+g*u,r[2]=d*M+h*y+_*S,r[5]=d*p+h*b+_*x,r[8]=d*m+h*A+_*u,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],f=t[8];return e*o*f-e*a*l-n*r*f+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],f=t[8],g=f*o-a*l,d=a*c-f*r,h=l*r-o*c,_=e*g+n*d+s*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return t[0]=g*M,t[1]=(s*l-f*n)*M,t[2]=(a*n-s*o)*M,t[3]=d*M,t[4]=(f*e-s*c)*M,t[5]=(s*r-a*e)*M,t[6]=h*M,t[7]=(n*c-l*e)*M,t[8]=(o*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(la.makeScale(t,e)),this}rotate(t){return Qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(la.makeRotation(-t)),this}translate(t,e){return Qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(la.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Nl.prototype.isMatrix3=!0;let ee=Nl;const la=new ee,Gl=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qu(){const i={enabled:!0,workingColorSpace:or,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===we&&(s.r=xi(s.r),s.g=xi(s.g),s.b=xi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===we&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[or]:{primaries:t,whitePoint:n,transfer:ar,toXYZ:Gl,fromXYZ:kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:t,whitePoint:n,transfer:we,toXYZ:Gl,fromXYZ:kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),i}const de=qu();function xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let os;class Ch{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{os===void 0&&(os=Uo("canvas")),os.width=t.width,os.height=t.height;const s=os.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=os}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Uo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=xi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(xi(e[n]/255)*255):e[n]=xi(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zu=0;class Jo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Ps(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ca(s[o].image)):r.push(ca(s[o]))}else r=ca(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ca(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ch.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}let Ku=0;const ha=new B;class cn extends yi{constructor(t=cn.DEFAULT_IMAGE,e=cn.DEFAULT_MAPPING,n=si,s=si,r=gn,o=gi,a=Vn,c=Sn,l=cn.DEFAULT_ANISOTROPY,f=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Ps(),this.name="",this.source=new Jo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Nt(0,0),this.repeat=new Nt(1,1),this.center=new Nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ha).x}get height(){return this.source.getSize(ha).y}get depth(){return this.source.getSize(ha).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==el)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case eo:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case no:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case eo:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case no:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=el;cn.DEFAULT_ANISOTROPY=1;const Ul=class Ul{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],f=c[4],g=c[8],d=c[1],h=c[5],_=c[9],M=c[2],p=c[6],m=c[10];if(Math.abs(f-d)<.01&&Math.abs(g-M)<.01&&Math.abs(_-p)<.01){if(Math.abs(f+d)<.1&&Math.abs(g+M)<.1&&Math.abs(_+p)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,A=(h+1)/2,S=(m+1)/2,x=(f+d)/4,u=(g+M)/4,v=(_+p)/4;return b>A&&b>S?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=x/n,r=u/n):A>S?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=x/s,r=v/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=u/r,s=v/r),this.set(n,s,r,e),this}let y=Math.sqrt((p-_)*(p-_)+(g-M)*(g-M)+(d-f)*(d-f));return Math.abs(y)<.001&&(y=1),this.x=(p-_)/y,this.y=(g-M)/y,this.z=(d-f)/y,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ul.prototype.isVector4=!0;let Oe=Ul;class Ph extends yi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new cn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Jo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Ph{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class pl extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dh extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Go=class Go{constructor(t,e,n,s,r,o,a,c,l,f,g,d,h,_,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,f,g,d,h,_,M,p)}set(t,e,n,s,r,o,a,c,l,f,g,d,h,_,M,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=f,m[10]=g,m[14]=d,m[3]=h,m[7]=_,m[11]=M,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Go().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),o=1/as.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),f=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){const d=o*f,h=o*g,_=a*f,M=a*g;e[0]=c*f,e[4]=-c*g,e[8]=l,e[1]=h+_*l,e[5]=d-M*l,e[9]=-a*c,e[2]=M-d*l,e[6]=_+h*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*f,h=c*g,_=l*f,M=l*g;e[0]=d+M*a,e[4]=_*a-h,e[8]=o*l,e[1]=o*g,e[5]=o*f,e[9]=-a,e[2]=h*a-_,e[6]=M+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*f,h=c*g,_=l*f,M=l*g;e[0]=d-M*a,e[4]=-o*g,e[8]=_+h*a,e[1]=h+_*a,e[5]=o*f,e[9]=M-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*f,h=o*g,_=a*f,M=a*g;e[0]=c*f,e[4]=_*l-h,e[8]=d*l+M,e[1]=c*g,e[5]=M*l+d,e[9]=h*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,h=o*l,_=a*c,M=a*l;e[0]=c*f,e[4]=M-d*g,e[8]=_*g+h,e[1]=g,e[5]=o*f,e[9]=-a*f,e[2]=-l*f,e[6]=h*g+_,e[10]=d-M*g}else if(t.order==="XZY"){const d=o*c,h=o*l,_=a*c,M=a*l;e[0]=c*f,e[4]=-g,e[8]=l*f,e[1]=d*g+M,e[5]=o*f,e[9]=h*g-_,e[2]=_*g-h,e[6]=a*f,e[10]=M*g+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ju,t,$u)}lookAt(t,e,n){const s=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Ai.crossVectors(n,Tn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Ai.crossVectors(n,Tn)),Ai.normalize(),dr.crossVectors(Tn,Ai),s[0]=Ai.x,s[4]=dr.x,s[8]=Tn.x,s[1]=Ai.y,s[5]=dr.y,s[9]=Tn.y,s[2]=Ai.z,s[6]=dr.z,s[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],f=n[1],g=n[5],d=n[9],h=n[13],_=n[2],M=n[6],p=n[10],m=n[14],y=n[3],b=n[7],A=n[11],S=n[15],x=s[0],u=s[4],v=s[8],P=s[12],w=s[1],T=s[5],L=s[9],U=s[13],I=s[2],k=s[6],Y=s[10],Z=s[14],it=s[3],Q=s[7],tt=s[11],ut=s[15];return r[0]=o*x+a*w+c*I+l*it,r[4]=o*u+a*T+c*k+l*Q,r[8]=o*v+a*L+c*Y+l*tt,r[12]=o*P+a*U+c*Z+l*ut,r[1]=f*x+g*w+d*I+h*it,r[5]=f*u+g*T+d*k+h*Q,r[9]=f*v+g*L+d*Y+h*tt,r[13]=f*P+g*U+d*Z+h*ut,r[2]=_*x+M*w+p*I+m*it,r[6]=_*u+M*T+p*k+m*Q,r[10]=_*v+M*L+p*Y+m*tt,r[14]=_*P+M*U+p*Z+m*ut,r[3]=y*x+b*w+A*I+S*it,r[7]=y*u+b*T+A*k+S*Q,r[11]=y*v+b*L+A*Y+S*tt,r[15]=y*P+b*U+A*Z+S*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],f=t[2],g=t[6],d=t[10],h=t[14],_=t[3],M=t[7],p=t[11],m=t[15],y=c*h-l*d,b=a*h-l*g,A=a*d-c*g,S=o*h-l*f,x=o*d-c*f,u=o*g-a*f;return e*(M*y-p*b+m*A)-n*(_*y-p*S+m*x)+s*(_*b-M*S+m*u)-r*(_*A-M*x+p*u)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],f=t[10];return e*(o*f-a*l)-n*(r*f-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],f=t[8],g=t[9],d=t[10],h=t[11],_=t[12],M=t[13],p=t[14],m=t[15],y=e*a-n*o,b=e*c-s*o,A=e*l-r*o,S=n*c-s*a,x=n*l-r*a,u=s*l-r*c,v=f*M-g*_,P=f*p-d*_,w=f*m-h*_,T=g*p-d*M,L=g*m-h*M,U=d*m-h*p,I=y*U-b*L+A*T+S*w-x*P+u*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return t[0]=(a*U-c*L+l*T)*k,t[1]=(s*L-n*U-r*T)*k,t[2]=(M*u-p*x+m*S)*k,t[3]=(d*x-g*u-h*S)*k,t[4]=(c*w-o*U-l*P)*k,t[5]=(e*U-s*w+r*P)*k,t[6]=(p*A-_*u-m*b)*k,t[7]=(f*u-d*A+h*b)*k,t[8]=(o*L-a*w+l*v)*k,t[9]=(n*w-e*L-r*v)*k,t[10]=(_*x-M*A+m*y)*k,t[11]=(g*A-f*x-h*y)*k,t[12]=(a*P-o*T-c*v)*k,t[13]=(e*T-n*P+s*v)*k,t[14]=(M*b-_*S-p*y)*k,t[15]=(f*S-g*b+d*y)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,f=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,f*a+n,f*c-s*o,0,l*c-s*a,f*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,f=o+o,g=a+a,d=r*l,h=r*f,_=r*g,M=o*f,p=o*g,m=a*g,y=c*l,b=c*f,A=c*g,S=n.x,x=n.y,u=n.z;return s[0]=(1-(M+m))*S,s[1]=(h+A)*S,s[2]=(_-b)*S,s[3]=0,s[4]=(h-A)*x,s[5]=(1-(d+m))*x,s[6]=(p+y)*x,s[7]=0,s[8]=(_+b)*u,s[9]=(p-y)*u,s[10]=(1-(d+M))*u,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=as.set(s[0],s[1],s[2]).length();const a=as.set(s[4],s[5],s[6]).length(),c=as.set(s[8],s[9],s[10]).length();r<0&&(o=-o),zn.copy(this);const l=1/o,f=1/a,g=1/c;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=f,zn.elements[5]*=f,zn.elements[6]*=f,zn.elements[8]*=g,zn.elements[9]*=g,zn.elements[10]*=g,e.setFromRotationMatrix(zn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Un,c=!1){const l=this.elements,f=2*r/(e-t),g=2*r/(n-s),d=(e+t)/(e-t),h=(n+s)/(n-s);let _,M;if(c)_=r/(o-r),M=o*r/(o-r);else if(a===Un)_=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===As)_=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=f,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=g,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Un,c=!1){const l=this.elements,f=2/(e-t),g=2/(n-s),d=-(e+t)/(e-t),h=-(n+s)/(n-s);let _,M;if(c)_=1/(o-r),M=o/(o-r);else if(a===Un)_=-2/(o-r),M=-(o+r)/(o-r);else if(a===As)_=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=f,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=g,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=_,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Go.prototype.isMatrix4=!0;let pe=Go;const as=new B,zn=new pe,Ju=new B(0,0,0),$u=new B(1,1,1),Ai=new B,dr=new B,Tn=new B,Hl=new pe,Vl=new yn;class qn{constructor(t=0,e=0,n=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],f=s[9],g=s[2],d=s[6],h=s[10];switch(e){case"XYZ":this._y=Math.asin(oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-g,h),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-oe(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-f,h),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class $o{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Qu=0;const Wl=new B,ls=new yn,hi=new pe,pr=new B,Fs=new B,ju=new B,tf=new yn,Xl=new B(1,0,0),Yl=new B(0,1,0),ql=new B(0,0,1),Zl={type:"added"},ef={type:"removed"},cs={type:"childadded",child:null},ua={type:"childremoved",child:null};class qe extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new B,e=new qn,n=new yn,s=new B(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new ee}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $o,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ls.setFromAxisAngle(t,e),this.quaternion.multiply(ls),this}rotateOnWorldAxis(t,e){return ls.setFromAxisAngle(t,e),this.quaternion.premultiply(ls),this}rotateX(t){return this.rotateOnAxis(Xl,t)}rotateY(t){return this.rotateOnAxis(Yl,t)}rotateZ(t){return this.rotateOnAxis(ql,t)}translateOnAxis(t,e){return Wl.copy(t).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xl,t)}translateY(t){return this.translateOnAxis(Yl,t)}translateZ(t){return this.translateOnAxis(ql,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?pr.copy(t):pr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Fs,pr,this.up):hi.lookAt(pr,Fs,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(hi),this.quaternion.premultiply(ls.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Me("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zl),cs.child=t,this.dispatchEvent(cs),cs.child=null):Me("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ef),ua.child=t,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zl),cs.child=t,this.dispatchEvent(cs),cs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,t,ju),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,tf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){const g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),f=o(t.images),g=o(t.shapes),d=o(t.skeletons),h=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),f.length>0&&(n.images=f),g.length>0&&(n.shapes=g),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const f=a[l];delete f.metadata,c.push(f)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}qe.DEFAULT_UP=new B(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Rn extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nf={type:"move"};class Yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const M of t.hand.values()){const p=e.getJointPose(M,n),m=this._getHandJoint(l,M);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const f=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],d=f.position.distanceTo(g.position),h=.02,_=.005;l.inputState.pinching&&d>h+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=h-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(nf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Rn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},mr={h:0,s:0,l:0};function fa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ne{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=fl(t,1),e=oe(e,0,1),n=oe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fa(o,r,t+1/3),this.g=fa(o,r,t),this.b=fa(o,r,t-1/3)}return de.colorSpaceToWorking(this,s),this}setStyle(t,e=mn){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=mn){const n=Lh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mn){return de.workingToColorSpace(un.copy(this),t),Math.round(oe(un.r*255,0,255))*65536+Math.round(oe(un.g*255,0,255))*256+Math.round(oe(un.b*255,0,255))}getHexString(t=mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(un.copy(this),e);const n=un.r,s=un.g,r=un.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const f=(a+o)/2;if(a===o)c=0,l=0;else{const g=o-a;switch(l=f<=.5?g/(o+a):g/(2-o-a),o){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=f,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=mn){de.workingToColorSpace(un.copy(this),t);const e=un.r,n=un.g,s=un.b;return t!==mn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(wi),this.setHSL(wi.h+t,wi.s+e,wi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wi),t.getHSL(mr);const n=tr(wi.h,mr.h,e),s=tr(wi.s,mr.s,e),r=tr(wi.l,mr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new ne;ne.NAMES=Lh;class Qo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ne(t),this.density=e}clone(){return new Qo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ih extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Gn=new B,ui=new B,da=new B,fi=new B,hs=new B,us=new B,Kl=new B,pa=new B,ma=new B,ga=new B,_a=new Oe,xa=new Oe,va=new Oe;class In{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Gn.subVectors(t,e),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Gn.subVectors(s,e),ui.subVectors(n,e),da.subVectors(t,e);const o=Gn.dot(Gn),a=Gn.dot(ui),c=Gn.dot(da),l=ui.dot(ui),f=ui.dot(da),g=o*l-a*a;if(g===0)return r.set(0,0,0),null;const d=1/g,h=(l*c-a*f)*d,_=(o*f-a*c)*d;return r.set(1-h-_,_,h)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(o,fi.y),c.addScaledVector(a,fi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return _a.setScalar(0),xa.setScalar(0),va.setScalar(0),_a.fromBufferAttribute(t,e),xa.fromBufferAttribute(t,n),va.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(_a,r.x),o.addScaledVector(xa,r.y),o.addScaledVector(va,r.z),o}static isFrontFacing(t,e,n,s){return Gn.subVectors(n,e),ui.subVectors(t,e),Gn.cross(ui).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Gn.cross(ui).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return In.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return In.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return In.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return In.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return In.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;hs.subVectors(s,n),us.subVectors(r,n),pa.subVectors(t,n);const c=hs.dot(pa),l=us.dot(pa);if(c<=0&&l<=0)return e.copy(n);ma.subVectors(t,s);const f=hs.dot(ma),g=us.dot(ma);if(f>=0&&g<=f)return e.copy(s);const d=c*g-f*l;if(d<=0&&c>=0&&f<=0&&c-f>0)return o=c/(c-f),e.copy(n).addScaledVector(hs,o);ga.subVectors(t,r);const h=hs.dot(ga),_=us.dot(ga);if(_>=0&&h<=_)return e.copy(r);const M=h*l-c*_;if(M<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(us,a);const p=f*_-h*g;if(p<=0&&g-f>=0&&h-_>=0)return Kl.subVectors(r,s),a=(g-f)/(g-f+(h-_)),e.copy(s).addScaledVector(Kl,a);const m=1/(p+M+d);return o=M*m,a=d*m,e.copy(n).addScaledVector(hs,o).addScaledVector(us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Fi{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),_r.subVectors(this.max,Os),fs.subVectors(t.a,Os),ds.subVectors(t.b,Os),ps.subVectors(t.c,Os),Ri.subVectors(ds,fs),Ci.subVectors(ps,ds),Wi.subVectors(fs,ps);let e=[0,-Ri.z,Ri.y,0,-Ci.z,Ci.y,0,-Wi.z,Wi.y,Ri.z,0,-Ri.x,Ci.z,0,-Ci.x,Wi.z,0,-Wi.x,-Ri.y,Ri.x,0,-Ci.y,Ci.x,0,-Wi.y,Wi.x,0];return!Ma(e,fs,ds,ps,_r)||(e=[1,0,0,0,1,0,0,0,1],!Ma(e,fs,ds,ps,_r))?!1:(xr.crossVectors(Ri,Ci),e=[xr.x,xr.y,xr.z],Ma(e,fs,ds,ps,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const di=[new B,new B,new B,new B,new B,new B,new B,new B],kn=new B,gr=new Fi,fs=new B,ds=new B,ps=new B,Ri=new B,Ci=new B,Wi=new B,Os=new B,_r=new B,xr=new B,Xi=new B;function Ma(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Xi.fromArray(i,r);const a=s.x*Math.abs(Xi.x)+s.y*Math.abs(Xi.y)+s.z*Math.abs(Xi.z),c=t.dot(Xi),l=e.dot(Xi),f=n.dot(Xi);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>a)return!1}return!0}const Ye=new B,vr=new Nt;let sf=0;class xn extends yi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=bh,this.updateRanges=[],this.gpuType=Nn,this.version=0,this._normalizationScale=t!==void 0?dl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):wh(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Rh(t,this.array)}}class ml extends xn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class gl extends xn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Re extends xn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const rf=new Fi,Bs=new B,Sa=new B;class Oi{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);const e=Bs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Sa)),this.expandByPoint(Bs.copy(t.center).sub(Sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let of=0;const Pn=new pe,ya=new qe,ms=new B,An=new Fi,zs=new Fi,rn=new B;class $e extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cu(t)?gl:ml)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ee().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Pn.makeRotationFromQuaternion(t),this.applyMatrix4(Pn),this}rotateX(t){return Pn.makeRotationX(t),this.applyMatrix4(Pn),this}rotateY(t){return Pn.makeRotationY(t),this.applyMatrix4(Pn),this}rotateZ(t){return Pn.makeRotationZ(t),this.applyMatrix4(Pn),this}translate(t,e,n){return Pn.makeTranslation(t,e,n),this.applyMatrix4(Pn),this}scale(t,e,n){return Pn.makeScale(t,e,n),this.applyMatrix4(Pn),this}lookAt(t){return ya.lookAt(t),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Re(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Me("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Me('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Me("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(An.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];zs.setFromBufferAttribute(a),this.morphTargetsRelative?(rn.addVectors(An.min,zs.min),An.expandByPoint(rn),rn.addVectors(An.max,zs.max),An.expandByPoint(rn)):(An.expandByPoint(zs.min),An.expandByPoint(zs.max))}An.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)rn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(rn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,f=a.count;l<f;l++)rn.fromBufferAttribute(a,l),c&&(ms.fromBufferAttribute(t,l),rn.add(ms)),s=Math.max(s,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Me('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Me("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new xn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let P=0;P<n.count;P++)a[P]=new B,c[P]=new B;const f=new B,g=new B,d=new B,h=new Nt,_=new Nt,M=new Nt,p=new B,m=new B;function y(P,w,T){l[P]=l[w]=l[T]=1,f.fromBufferAttribute(n,P),g.fromBufferAttribute(n,w),d.fromBufferAttribute(n,T),h.fromBufferAttribute(r,P),_.fromBufferAttribute(r,w),M.fromBufferAttribute(r,T),g.sub(f),d.sub(f),_.sub(h),M.sub(h);const L=1/(_.x*M.y-M.x*_.y);isFinite(L)&&(p.copy(g).multiplyScalar(M.y).addScaledVector(d,-_.y).multiplyScalar(L),m.copy(d).multiplyScalar(_.x).addScaledVector(g,-M.x).multiplyScalar(L),a[P].add(p),a[w].add(p),a[T].add(p),c[P].add(m),c[w].add(m),c[T].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,w=b.length;P<w;++P){const T=b[P],L=T.start,U=T.count;for(let I=L,k=L+U;I<k;I+=3)y(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const A=new B,S=new B,x=new B,u=new B;function v(P){x.fromBufferAttribute(s,P),u.copy(x);const w=a[P];A.copy(w),A.sub(x.multiplyScalar(x.dot(w))).normalize(),S.crossVectors(u,w);const L=S.dot(c[P])<0?-1:1;o.setXYZW(P,A.x,A.y,A.z,L)}for(let P=0,w=n.count;P<w;++P)l[P]&&v(P);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);const s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,f=new B,g=new B;if(t)for(let d=0,h=t.count;d<h;d+=3){const _=t.getX(d+0),M=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,p),f.subVectors(o,r),g.subVectors(s,r),f.cross(g),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,p),a.add(f),c.add(f),l.add(f),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,h=e.count;d<h;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),f.subVectors(o,r),g.subVectors(s,r),f.cross(g),n.setXYZ(d+0,f.x,f.y,f.z),n.setXYZ(d+1,f.x,f.y,f.z),n.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)rn.fromBufferAttribute(t,e),rn.normalize(),t.setXYZ(e,rn.x,rn.y,rn.z)}toNonIndexed(){function t(a,c){const l=a.array,f=a.itemSize,g=a.normalized,d=new l.constructor(c.length*f);let h=0,_=0;for(let M=0,p=c.length;M<p;M++){a.isInterleavedBufferAttribute?h=c[M]*a.data.stride+a.offset:h=c[M]*f;for(let m=0;m<f;m++)d[_++]=l[h++]}return new xn(d,f,g)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new $e,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let f=0,g=l.length;f<g;f++){const d=l[f],h=t(d,n);c.push(h)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],f=[];for(let g=0,d=l.length;g<d;g++){const h=l[g];f.push(h.toJSON(t.data))}f.length>0&&(s[c]=f,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const f=s[l];this.setAttribute(l,f.clone(e))}const r=t.morphAttributes;for(const l in r){const f=[],g=r[l];for(let d=0,h=g.length;d<h;d++)f.push(g[d].clone(e));this.morphAttributes[l]=f}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,f=o.length;l<f;l++){const g=o[l];this.addGroup(g.start,g.count,g.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ba=new B,af=new B,lf=new ee;class ei{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ba.subVectors(n,e).cross(af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(ba),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||lf.getNormalMatrix(t),s=this.coplanarPoint(ba).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let cf=0;class Bi extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=Ps(),this.name="",this.type="Material",this.blending=Ss,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ya,this.blendDst=qa,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xr,this.stencilZFail=Xr,this.stencilZPass=Xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ne().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new ei().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Nt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Nt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const pi=new B,Ea=new B,Mr=new B,Sr=new B;class Ds{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pi.copy(this.origin).addScaledVector(this.direction,e),pi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ea.copy(t).add(e).multiplyScalar(.5),Mr.copy(e).sub(t).normalize(),Sr.copy(this.origin).sub(Ea);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Mr),a=Sr.dot(this.direction),c=-Sr.dot(Mr),l=Sr.lengthSq(),f=Math.abs(1-o*o);let g,d,h,_;if(f>0)if(g=o*c-a,d=o*a-c,_=r*f,g>=0)if(d>=-_)if(d<=_){const M=1/f;g*=M,d*=M,h=g*(g+o*d+2*a)+d*(o*g+d+2*c)+l}else d=r,g=Math.max(0,-(o*d+a)),h=-g*g+d*(d+2*c)+l;else d=-r,g=Math.max(0,-(o*d+a)),h=-g*g+d*(d+2*c)+l;else d<=-_?(g=Math.max(0,-(-o*r+a)),d=g>0?-r:Math.min(Math.max(-r,-c),r),h=-g*g+d*(d+2*c)+l):d<=_?(g=0,d=Math.min(Math.max(-r,-c),r),h=d*(d+2*c)+l):(g=Math.max(0,-(o*r+a)),d=g>0?r:Math.min(Math.max(-r,-c),r),h=-g*g+d*(d+2*c)+l);else d=o>0?-r:r,g=Math.max(0,-(o*d+a)),h=-g*g+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(Ea).addScaledVector(Mr,d),h}intersectSphere(t,e){if(t.radius<0)return null;pi.subVectors(t.center,this.origin);const n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,f=1/this.direction.y,g=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),f>=0?(r=(t.min.y-d.y)*f,o=(t.max.y-d.y)*f):(r=(t.max.y-d.y)*f,o=(t.min.y-d.y)*f),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(a=(t.min.z-d.z)*g,c=(t.max.z-d.z)*g):(a=(t.max.z-d.z)*g,c=(t.min.z-d.z)*g),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,pi)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,f=a.z,g=t.x-o.x,d=t.y-o.y,h=t.z-o.z,_=e.x-o.x,M=e.y-o.y,p=e.z-o.z,m=n.x-o.x,y=n.y-o.y,b=n.z-o.z,A=Math.abs(c),S=Math.abs(l),x=Math.abs(f);let u,v,P,w,T,L,U,I,k,Y,Z,it;if(A>=S&&A>=x?(P=c,L=g,k=_,it=m,c>=0?(u=l,v=f,w=d,T=h,U=M,I=p,Y=y,Z=b):(u=f,v=l,w=h,T=d,U=p,I=M,Y=b,Z=y)):S>=x?(P=l,L=d,k=M,it=y,l>=0?(u=f,v=c,w=h,T=g,U=p,I=_,Y=b,Z=m):(u=c,v=f,w=g,T=h,U=_,I=p,Y=m,Z=b)):(P=f,L=h,k=p,it=b,f>=0?(u=c,v=l,w=g,T=d,U=_,I=M,Y=m,Z=y):(u=l,v=c,w=d,T=g,U=M,I=_,Y=y,Z=m)),P===0)return null;const Q=u/P,tt=v/P,ut=1/P,Mt=w-Q*L,At=T-tt*L,O=U-Q*k,ct=I-tt*k,wt=Y-Q*it,Lt=Z-tt*it,xt=wt*ct-Lt*O,Zt=Mt*Lt-At*wt,Le=O*At-ct*Mt;if(s){if(xt<0||Zt<0||Le<0)return null}else if((xt<0||Zt<0||Le<0)&&(xt>0||Zt>0||Le>0))return null;const Ht=xt+Zt+Le;if(Ht===0)return null;const me=ut*(xt*L+Zt*k+Le*it);return(Ht>0?me<0:me>0)?null:this.at(me/Ht,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ni extends Bi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Jl=new pe,Yi=new Ds,yr=new Oi,$l=new B,br=new B,Er=new B,Tr=new B,Ta=new B,Ar=new B,Ql=new B,wr=new B;class Se extends qe{constructor(t=new $e,e=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const f=a[c],g=r[c];f!==0&&(Ta.fromBufferAttribute(g,t),o?Ar.addScaledVector(Ta,f):Ar.addScaledVector(Ta.sub(e),f))}e.add(Ar)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(r),Yi.copy(t.ray).recast(t.near),!(yr.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(yr,$l)===null||Yi.origin.distanceToSquared($l)>(t.far-t.near)**2))&&(Jl.copy(r).invert(),Yi.copy(t.ray).applyMatrix4(Jl),!(n.boundingBox!==null&&Yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,f=r.attributes.uv1,g=r.attributes.normal,d=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,M=d.length;_<M;_++){const p=d[_],m=o[p.materialIndex],y=Math.max(p.start,h.start),b=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let A=y,S=b;A<S;A+=3){const x=a.getX(A),u=a.getX(A+1),v=a.getX(A+2);s=Rr(this,m,t,n,l,f,g,x,u,v),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,h.start),M=Math.min(a.count,h.start+h.count);for(let p=_,m=M;p<m;p+=3){const y=a.getX(p),b=a.getX(p+1),A=a.getX(p+2);s=Rr(this,o,t,n,l,f,g,y,b,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,M=d.length;_<M;_++){const p=d[_],m=o[p.materialIndex],y=Math.max(p.start,h.start),b=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let A=y,S=b;A<S;A+=3){const x=A,u=A+1,v=A+2;s=Rr(this,m,t,n,l,f,g,x,u,v),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,h.start),M=Math.min(c.count,h.start+h.count);for(let p=_,m=M;p<m;p+=3){const y=p,b=p+1,A=p+2;s=Rr(this,o,t,n,l,f,g,y,b,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function hf(i,t,e,n,s,r,o,a){let c;if(t.side===_n?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ii,a),c===null)return null;wr.copy(a),wr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(wr);return l<e.near||l>e.far?null:{distance:l,point:wr.clone(),object:i}}function Rr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,br),i.getVertexPosition(c,Er),i.getVertexPosition(l,Tr);const f=hf(i,t,e,n,br,Er,Tr,Ql);if(f){const g=new B;In.getBarycoord(Ql,br,Er,Tr,g),s&&(f.uv=In.getInterpolatedAttribute(s,a,c,l,g,new Nt)),r&&(f.uv1=In.getInterpolatedAttribute(r,a,c,l,g,new Nt)),o&&(f.normal=In.getInterpolatedAttribute(o,a,c,l,g,new B),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new B,materialIndex:0};In.getNormal(br,Er,Tr,d.normal),f.face=d,f.barycoord=g}return f}class _l extends cn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=on,f=on,g,d){super(null,o,a,c,l,f,s,r,g,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class za extends xn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const gs=new pe,jl=new pe,Cr=[],tc=new Fi,uf=new pe,Gs=new Se,ks=new Oi;class xl extends Se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new za(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,uf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),tc.copy(t.boundingBox).applyMatrix4(gs),this.boundingBox.union(tc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),ks.copy(t.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),t.ray.intersectsSphere(ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),jl.multiplyMatrices(n,gs),Gs.matrixWorld=jl,Gs.raycast(t,Cr);for(let o=0,a=Cr.length;o<a;o++){const c=Cr[o];c.instanceId=r,c.object=this,e.push(c)}Cr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new za(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _l(new Float32Array(s*this.count),s,this.count,Yo,Nn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const qi=new Oi,ff=new Nt(.5,.5),Pr=new B;class ws{constructor(t=new ei,e=new ei,n=new ei,s=new ei,r=new ei,o=new ei){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],f=r[4],g=r[5],d=r[6],h=r[7],_=r[8],M=r[9],p=r[10],m=r[11],y=r[12],b=r[13],A=r[14],S=r[15];if(s[0].setComponents(l-o,h-f,m-_,S-y).normalize(),s[1].setComponents(l+o,h+f,m+_,S+y).normalize(),s[2].setComponents(l+a,h+g,m+M,S+b).normalize(),s[3].setComponents(l-a,h-g,m-M,S-b).normalize(),n)s[4].setComponents(c,d,p,A).normalize(),s[5].setComponents(l-c,h-d,m-p,S-A).normalize();else if(s[4].setComponents(l-c,h-d,m-p,S-A).normalize(),e===Un)s[5].setComponents(l+c,h+d,m+p,S+A).normalize();else if(e===As)s[5].setComponents(c,d,p,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(t){qi.center.set(0,0,0);const e=ff.distanceTo(t.center);return qi.radius=.7071067811865476+e,qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Pr.x=s.normal.x>0?t.max.x:t.min.x,Pr.y=s.normal.y>0?t.max.y:t.min.y,Pr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const ec=new pe;class jo{constructor(){this.coordinateSystem=Un,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];ec.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ws),n[s].setFromProjectionMatrix(ec,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new ws),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new jo().copy(this)}}class vl extends Bi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Fo=new B,Oo=new B,nc=new pe,Hs=new Ds,Dr=new Oi,Aa=new B,ic=new B;class Nh extends qe{constructor(t=new $e,e=new vl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Fo.fromBufferAttribute(e,s-1),Oo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Fo.distanceTo(Oo);t.setAttribute("lineDistance",new Re(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(s),Dr.radius+=r,t.ray.intersectsSphere(Dr)===!1)return;nc.copy(s).invert(),Hs.copy(t.ray).applyMatrix4(nc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,f=n.index,d=n.attributes.position;if(f!==null){const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let M=h,p=_-1;M<p;M+=l){const m=f.getX(M),y=f.getX(M+1),b=Lr(this,t,Hs,c,m,y,M);b&&e.push(b)}if(this.isLineLoop){const M=f.getX(_-1),p=f.getX(h),m=Lr(this,t,Hs,c,M,p,_-1);m&&e.push(m)}}else{const h=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let M=h,p=_-1;M<p;M+=l){const m=Lr(this,t,Hs,c,M,M+1,M);m&&e.push(m)}if(this.isLineLoop){const M=Lr(this,t,Hs,c,_-1,h,_-1);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Fo.fromBufferAttribute(a,s),Oo.fromBufferAttribute(a,r),e.distanceSqToSegment(Fo,Oo,Aa,ic)>n)return;Aa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Aa);if(!(l<t.near||l>t.far))return{distance:l,point:ic.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const sc=new B,rc=new B;class Uh extends Nh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)sc.fromBufferAttribute(e,s),rc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sc.distanceTo(rc);t.setAttribute("lineDistance",new Re(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ml extends Bi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const oc=new pe,Ga=new Ds,Ir=new Oi,Nr=new B;class Fh extends qe{constructor(t=new $e,e=new Ml){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(s),Ir.radius+=r,t.ray.intersectsSphere(Ir)===!1)return;oc.copy(s).invert(),Ga.copy(t.ray).applyMatrix4(oc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,g=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),h=Math.min(l.count,o.start+o.count);for(let _=d,M=h;_<M;_++){const p=l.getX(_);Nr.fromBufferAttribute(g,p),ac(Nr,p,c,s,t,e,this)}}else{const d=Math.max(0,o.start),h=Math.min(g.count,o.start+o.count);for(let _=d,M=h;_<M;_++)Nr.fromBufferAttribute(g,_),ac(Nr,_,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ac(i,t,e,n,s,r,o){const a=Ga.distanceSqToPoint(i);if(a<e){const c=new B;Ga.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Sl extends cn{constructor(t=[],e=ji,n,s,r,o,a,c,l,f){super(t,e,n,s,r,o,a,c,l,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ka extends cn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class es extends cn{constructor(t,e,n=Xn,s,r,o,a=on,c=on,l,f=Mi,g=1){if(f!==Mi&&f!==_i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:g};super(d,s,r,o,a,c,f,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Jo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class yl extends es{constructor(t,e=Xn,n=ji,s,r,o=on,a=on,c,l=Mi){const f={width:t,height:t,depth:1},g=[f,f,f,f,f,f];super(t,t,e,n,s,r,o,a,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class bl extends cn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Je extends $e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],f=[],g=[];let d=0,h=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,s,o,2),_("x","z","y",1,-1,t,n,-e,s,o,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(f,3)),this.setAttribute("uv",new Re(g,2));function _(M,p,m,y,b,A,S,x,u,v,P){const w=A/u,T=S/v,L=A/2,U=S/2,I=x/2,k=u+1,Y=v+1;let Z=0,it=0;const Q=new B;for(let tt=0;tt<Y;tt++){const ut=tt*T-U;for(let Mt=0;Mt<k;Mt++){const At=Mt*w-L;Q[M]=At*y,Q[p]=ut*b,Q[m]=I,l.push(Q.x,Q.y,Q.z),Q[M]=0,Q[p]=0,Q[m]=x>0?1:-1,f.push(Q.x,Q.y,Q.z),g.push(Mt/u),g.push(1-tt/v),Z+=1}}for(let tt=0;tt<v;tt++)for(let ut=0;ut<u;ut++){const Mt=d+ut+k*tt,At=d+ut+k*(tt+1),O=d+(ut+1)+k*(tt+1),ct=d+(ut+1)+k*tt;c.push(Mt,At,ct),c.push(At,O,ct),it+=6}a.addGroup(h,it,P),h+=it,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Fn extends $e{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const f=[],g=[],d=[],h=[];let _=0;const M=[],p=n/2;let m=0;y(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(f),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(h,2));function y(){const A=new B,S=new B;let x=0;const u=(e-t)/n;for(let v=0;v<=r;v++){const P=[],w=v/r,T=w*(e-t)+t;for(let L=0;L<=s;L++){const U=L/s,I=U*c+a,k=Math.sin(I),Y=Math.cos(I);S.x=T*k,S.y=-w*n+p,S.z=T*Y,g.push(S.x,S.y,S.z),A.set(k,u,Y).normalize(),d.push(A.x,A.y,A.z),h.push(U,1-w),P.push(_++)}M.push(P)}for(let v=0;v<s;v++)for(let P=0;P<r;P++){const w=M[P][v],T=M[P+1][v],L=M[P+1][v+1],U=M[P][v+1];(t>0||P!==0)&&(f.push(w,T,U),x+=3),(e>0||P!==r-1)&&(f.push(T,L,U),x+=3)}l.addGroup(m,x,0),m+=x}function b(A){const S=_,x=new Nt,u=new B;let v=0;const P=A===!0?t:e,w=A===!0?1:-1;for(let L=1;L<=s;L++)g.push(0,p*w,0),d.push(0,w,0),h.push(.5,.5),_++;const T=_;for(let L=0;L<=s;L++){const I=L/s*c+a,k=Math.cos(I),Y=Math.sin(I);u.x=P*Y,u.y=p*w,u.z=P*k,g.push(u.x,u.y,u.z),d.push(0,w,0),x.x=k*.5+.5,x.y=Y*.5*w+.5,h.push(x.x,x.y),_++}for(let L=0;L<s;L++){const U=S+L,I=T+L;A===!0?f.push(I,I+1,U):f.push(I+1,I,U),v+=3}l.addGroup(m,v,A===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oi extends Fn{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new oi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ta extends $e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),f(),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(r.slice(),3)),this.setAttribute("uv",new Re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const b=new B,A=new B,S=new B;for(let x=0;x<e.length;x+=3)h(e[x+0],b),h(e[x+1],A),h(e[x+2],S),c(b,A,S,y)}function c(y,b,A,S){const x=S+1,u=[];for(let v=0;v<=x;v++){u[v]=[];const P=y.clone().lerp(A,v/x),w=b.clone().lerp(A,v/x),T=x-v;for(let L=0;L<=T;L++)L===0&&v===x?u[v][L]=P:u[v][L]=P.clone().lerp(w,L/T)}for(let v=0;v<x;v++)for(let P=0;P<2*(x-v)-1;P++){const w=Math.floor(P/2);P%2===0?(d(u[v][w+1]),d(u[v+1][w]),d(u[v][w])):(d(u[v][w+1]),d(u[v+1][w+1]),d(u[v+1][w]))}}function l(y){const b=new B;for(let A=0;A<r.length;A+=3)b.x=r[A+0],b.y=r[A+1],b.z=r[A+2],b.normalize().multiplyScalar(y),r[A+0]=b.x,r[A+1]=b.y,r[A+2]=b.z}function f(){const y=new B;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];const A=p(y)/2/Math.PI+.5,S=m(y)/Math.PI+.5;o.push(A,1-S)}_(),g()}function g(){for(let y=0;y<o.length;y+=6){const b=o[y+0],A=o[y+2],S=o[y+4],x=Math.max(b,A,S),u=Math.min(b,A,S);x>.9&&u<.1&&(b<.2&&(o[y+0]+=1),A<.2&&(o[y+2]+=1),S<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function h(y,b){const A=y*3;b.x=t[A+0],b.y=t[A+1],b.z=t[A+2]}function _(){const y=new B,b=new B,A=new B,S=new B,x=new Nt,u=new Nt,v=new Nt;for(let P=0,w=0;P<r.length;P+=9,w+=6){y.set(r[P+0],r[P+1],r[P+2]),b.set(r[P+3],r[P+4],r[P+5]),A.set(r[P+6],r[P+7],r[P+8]),x.set(o[w+0],o[w+1]),u.set(o[w+2],o[w+3]),v.set(o[w+4],o[w+5]),S.copy(y).add(b).add(A).divideScalar(3);const T=p(S);M(x,w+0,y,T),M(u,w+2,b,T),M(v,w+4,A,T)}}function M(y,b,A,S){S<0&&y.x===1&&(o[b]=y.x-1),A.x===0&&A.z===0&&(o[b]=S/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.vertices,t.indices,t.radius,t.detail)}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const f=n[s],d=n[s+1]-f,h=(o-f)/d;return(s+h)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Nt:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new B,s=[],r=[],o=[],a=new B,c=new pe;for(let h=0;h<=t;h++){const _=h/t;s[h]=this.getTangentAt(_,new B)}r[0]=new B,o[0]=new B;let l=Number.MAX_VALUE;const f=Math.abs(s[0].x),g=Math.abs(s[0].y),d=Math.abs(s[0].z);f<=l&&(l=f,n.set(1,0,0)),g<=l&&(l=g,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=t;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(oe(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(a,_))}o[h].crossVectors(s[h],r[h])}if(e===!0){let h=Math.acos(oe(r[0].dot(r[t]),-1,1));h/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(h=-h);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],h*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class El extends ai{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const f=Math.cos(this.aRotation),g=Math.sin(this.aRotation),d=c-this.aX,h=l-this.aY;c=d*f-h*g+this.aX,l=d*g+h*f+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Oh extends El{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Tl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,f,g){let d=(o-r)/l-(a-r)/(l+f)+(a-o)/f,h=(a-o)/f-(c-o)/(f+g)+(c-a)/g;d*=f,h*=f,s(o,a,d,h)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const lc=new B,cc=new B,wa=new Tl,Ra=new Tl,Ca=new Tl;class Bh extends ai{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new B){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,f;this.closed||a>0?l=s[(a-1)%r]:(cc.subVectors(s[0],s[1]).add(s[0]),l=cc);const g=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?f=s[(a+2)%r]:(lc.subVectors(s[r-1],s[r-2]).add(s[r-1]),f=lc),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(g),h),M=Math.pow(g.distanceToSquared(d),h),p=Math.pow(d.distanceToSquared(f),h);M<1e-4&&(M=1),_<1e-4&&(_=M),p<1e-4&&(p=M),wa.initNonuniformCatmullRom(l.x,g.x,d.x,f.x,_,M,p),Ra.initNonuniformCatmullRom(l.y,g.y,d.y,f.y,_,M,p),Ca.initNonuniformCatmullRom(l.z,g.z,d.z,f.z,_,M,p)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(l.x,g.x,d.x,f.x,this.tension),Ra.initCatmullRom(l.y,g.y,d.y,f.y,this.tension),Ca.initCatmullRom(l.z,g.z,d.z,f.z,this.tension));return n.set(wa.calc(c),Ra.calc(c),Ca.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new B().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function hc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function df(i,t){const e=1-i;return e*e*t}function pf(i,t){return 2*(1-i)*i*t}function mf(i,t){return i*i*t}function er(i,t,e,n){return df(i,t)+pf(i,e)+mf(i,n)}function gf(i,t){const e=1-i;return e*e*e*t}function _f(i,t){const e=1-i;return 3*e*e*i*t}function xf(i,t){return 3*(1-i)*i*i*t}function vf(i,t){return i*i*i*t}function nr(i,t,e,n,s){return gf(i,t)+_f(i,e)+xf(i,n)+vf(i,s)}class zh extends ai{constructor(t=new Nt,e=new Nt,n=new Nt,s=new Nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Nt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(nr(t,s.x,r.x,o.x,a.x),nr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gh extends ai{constructor(t=new B,e=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(nr(t,s.x,r.x,o.x,a.x),nr(t,s.y,r.y,o.y,a.y),nr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class kh extends ai{constructor(t=new Nt,e=new Nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hh extends ai{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vh extends ai{constructor(t=new Nt,e=new Nt,n=new Nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Nt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(er(t,s.x,r.x,o.x),er(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Al extends ai{constructor(t=new B,e=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new B){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(er(t,s.x,r.x,o.x),er(t,s.y,r.y,o.y),er(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wh extends ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Nt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],f=s[o>s.length-2?s.length-1:o+1],g=s[o>s.length-3?s.length-1:o+2];return n.set(hc(a,c.x,l.x,f.x,g.x),hc(a,c.y,l.y,f.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Nt().fromArray(s))}return this}}var Mf=Object.freeze({__proto__:null,ArcCurve:Oh,CatmullRomCurve3:Bh,CubicBezierCurve:zh,CubicBezierCurve3:Gh,EllipseCurve:El,LineCurve:kh,LineCurve3:Hh,QuadraticBezierCurve:Vh,QuadraticBezierCurve3:Al,SplineCurve:Wh});class ea extends ta{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ea(t.radius,t.detail)}}class Si extends $e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,f=c+1,g=t/a,d=e/c,h=[],_=[],M=[],p=[];for(let m=0;m<f;m++){const y=m*d-o;for(let b=0;b<l;b++){const A=b*g-r;_.push(A,-y,0),M.push(0,0,1),p.push(b/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const b=y+l*m,A=y+l*(m+1),S=y+1+l*(m+1),x=y+1+l*m;h.push(b,A,x),h.push(A,S,x)}this.setIndex(h),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(M,3)),this.setAttribute("uv",new Re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.width,t.height,t.widthSegments,t.heightSegments)}}class cr extends $e{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],f=[];let g=t;const d=(e-t)/s,h=new B,_=new Nt;for(let M=0;M<=s;M++){for(let p=0;p<=n;p++){const m=r+p/n*o;h.x=g*Math.cos(m),h.y=g*Math.sin(m),c.push(h.x,h.y,h.z),l.push(0,0,1),_.x=(h.x/e+1)/2,_.y=(h.y/e+1)/2,f.push(_.x,_.y)}g+=d}for(let M=0;M<s;M++){const p=M*(n+1);for(let m=0;m<n;m++){const y=m+p,b=y,A=y+n+1,S=y+n+2,x=y+1;a.push(b,A,x),a.push(A,S,x)}}this.setIndex(a),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Li extends $e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const f=[],g=new B,d=new B,h=[],_=[],M=[],p=[];for(let m=0;m<=n;m++){const y=[],b=m/n,A=o+b*a,S=t*Math.cos(A),x=Math.sqrt(t*t-S*S);let u=0;m===0&&o===0?u=.5/e:m===n&&c===Math.PI&&(u=-.5/e);for(let v=0;v<=e;v++){const P=v/e,w=s+P*r;g.x=-x*Math.cos(w),g.y=S,g.z=x*Math.sin(w),_.push(g.x,g.y,g.z),d.copy(g).normalize(),M.push(d.x,d.y,d.z),p.push(P+u,1-b),y.push(l++)}f.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const b=f[m][y+1],A=f[m][y],S=f[m+1][y],x=f[m+1][y+1];(m!==0||o>0)&&h.push(b,A,x),(m!==n-1||c<Math.PI)&&h.push(A,S,x)}this.setIndex(h),this.setAttribute("position",new Re(_,3)),this.setAttribute("normal",new Re(M,3)),this.setAttribute("uv",new Re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class vi extends $e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],f=[],g=[],d=new B,h=new B,_=new B;for(let M=0;M<=n;M++){const p=o+M/n*a;for(let m=0;m<=s;m++){const y=m/s*r;h.x=(t+e*Math.cos(p))*Math.cos(y),h.y=(t+e*Math.cos(p))*Math.sin(y),h.z=e*Math.sin(p),l.push(h.x,h.y,h.z),d.x=t*Math.cos(y),d.y=t*Math.sin(y),_.subVectors(h,d).normalize(),f.push(_.x,_.y,_.z),g.push(m/s),g.push(M/n)}}for(let M=1;M<=n;M++)for(let p=1;p<=s;p++){const m=(s+1)*M+p-1,y=(s+1)*(M-1)+p-1,b=(s+1)*(M-1)+p,A=(s+1)*M+p;c.push(m,y,A),c.push(y,b,A)}this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(f,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class wl extends $e{constructor(t=new Al(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new B,c=new B,l=new Nt;let f=new B;const g=[],d=[],h=[],_=[];M(),this.setIndex(_),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(d,3)),this.setAttribute("uv",new Re(h,2));function M(){for(let b=0;b<e;b++)p(b);p(r===!1?e:0),y(),m()}function p(b){f=t.getPointAt(b/e,f);const A=o.normals[b],S=o.binormals[b];for(let x=0;x<=s;x++){const u=x/s*Math.PI*2,v=Math.sin(u),P=-Math.cos(u);c.x=P*A.x+v*S.x,c.y=P*A.y+v*S.y,c.z=P*A.z+v*S.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=f.x+n*c.x,a.y=f.y+n*c.y,a.z=f.z+n*c.z,g.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=e;b++)for(let A=1;A<=s;A++){const S=(s+1)*(b-1)+(A-1),x=(s+1)*b+(A-1),u=(s+1)*b+A,v=(s+1)*(b-1)+A;_.push(S,x,v),_.push(x,u,v)}}function y(){for(let b=0;b<=e;b++)for(let A=0;A<=s;A++)l.x=b/e,l.y=A/s,h.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new wl(new Mf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Rs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(uc(s))s.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(uc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function pn(i){const t={};for(let e=0;e<i.length;e++){const n=Rs(i[e]);for(const s in n)t[s]=n[s]}return t}function uc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Sf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Xh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const Yh={clone:Rs,merge:pn};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends Bi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=bf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=Sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new ne().setHex(s.value);break;case"v2":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ee().fromArray(s.value);break;case"m4":this.uniforms[n].value=new pe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class qh extends Ui{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Cs extends Bi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=No,this.normalScale=new Nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zh extends Bi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Kh extends Bi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rl extends qe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Jh extends Rl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ne(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Pa=new pe,fc=new B,dc=new B;class $h{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Nt(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new Nt(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;fc.setFromMatrixPosition(t.matrixWorld),e.position.copy(fc),dc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Pa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Pa,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===As||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Pa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ur=new B,Fr=new yn,$n=new B;class Cl extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ur,Fr,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Fr,$n.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Ur,Fr,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ur,Fr,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Pi=new B,pc=new Nt,mc=new Nt;class Ln extends Cl{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=lr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lr*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z)}getViewSize(t,e){return this.getViewBounds(t,pc,mc),e.subVectors(mc,pc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(js*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Pl extends Cl{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=f*this.view.offsetY,c=a-f*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ef extends $h{constructor(){super(new Pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ha extends Rl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new Ef}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const _s=-90,xs=1;class Bo extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ln(_s,xs,t,e);s.layers=this.layers,this.add(s);const r=new Ln(_s,xs,t,e);r.layers=this.layers,this.add(r);const o=new Ln(_s,xs,t,e);o.layers=this.layers,this.add(o);const a=new Ln(_s,xs,t,e);a.layers=this.layers,this.add(a);const c=new Ln(_s,xs,t,e);c.layers=this.layers,this.add(c);const l=new Ln(_s,xs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===As)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,f]=this.children,g=t.getRenderTarget(),d=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=M,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,f),t.setRenderTarget(g,d,h),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Qh extends Ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const gc=new pe;class jh{constructor(t,e,n=0,s=1/0){this.ray=new Ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new $o,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Me("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gc),this}intersectObject(t,e=!0,n=[]){return Va(t,this,n,e),n.sort(_c),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Va(t[s],this,n,e);return n.sort(_c),n}}function _c(i,t){return i.distance-t.distance}function Va(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Va(r[o],t,e,!0)}}class Wa{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class tu extends yi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function xc(i,t,e,n){const s=Tf(n);switch(e){case ol:return i*t;case Yo:return i*t/s.components*s.byteLength;case qo:return i*t/s.components*s.byteLength;case Ni:return i*t*2/s.components*s.byteLength;case Zo:return i*t*2/s.components*s.byteLength;case al:return i*t*3/s.components*s.byteLength;case Vn:return i*t*4/s.components*s.byteLength;case Ko:return i*t*4/s.components*s.byteLength;case Zs:case Ks:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Js:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case so:case oo:return Math.max(i,16)*Math.max(t,8)/4;case io:case ro:return Math.max(i,8)*Math.max(t,8)/2;case ao:case lo:case ho:case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case co:case sr:case fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case go:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case xo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case bo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case To:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ao:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Co:case Po:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Do:case Lo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case rr:case Io:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tf(i){switch(i){case Sn:case nl:return{byteLength:1,components:1};case Ts:case il:case Yn:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case Xn:case Vo:case Nn:return{byteLength:4,components:1};case sl:case rl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ko}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ko);function eu(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Af(i){const t=new WeakMap;function e(a,c){const l=a.array,f=a.usage,g=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,f),a.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:g}}function n(a,c,l){const f=c.array,g=c.updateRanges;if(i.bindBuffer(l,a),g.length===0)i.bufferSubData(l,0,f);else{g.sort((h,_)=>h.start-_.start);let d=0;for(let h=1;h<g.length;h++){const _=g[d],M=g[h];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++d,g[d]=M)}g.length=d+1;for(let h=0,_=g.length;h<_;h++){const M=g[h];i.bufferSubData(l,M.start*f.BYTES_PER_ELEMENT,f,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=t.get(a);(!f||f.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rf=`#ifdef USE_ALPHAHASH
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
#endif`,Cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Df=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,If=`#ifdef USE_AOMAP
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
#endif`,Nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uf=`#ifdef USE_BATCHING
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
#endif`,Ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Of=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gf=`#ifdef USE_IRIDESCENCE
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
#endif`,kf=`#ifdef USE_BUMPMAP
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
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Jf=`#define PI 3.141592653589793
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
} // validated`,$f=`vec3 transformedNormal = objectNormal;
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
#endif`,Qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,td=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ed=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sd=`#ifdef USE_ENVMAP
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
#endif`,rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,od=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ud=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fd=`#ifdef USE_FOG
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
}`,pd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_d=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xd=`#ifdef USE_ENVMAP
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
#endif`,vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bd=`PhysicalMaterial material;
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
}`,Td=`
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
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
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,Cd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ld=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Id=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fd=`#if defined( USE_POINTS_UV )
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
#endif`,Od=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gd=`#if defined( USE_MORPHCOLORS )
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
#endif`,kd=`#ifdef USE_MORPHNORMALS
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
#endif`,Vd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yd=`#ifndef FLAT_SHADED
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
#endif`,Zd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kd=`#ifdef USE_NORMALMAP
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
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ep=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,np=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,op=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ap=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,up=`float getShadowMask() {
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
}`,fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,pp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mp=`#ifdef USE_SKINNING
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
#endif`,gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mp=`#ifdef USE_TRANSMISSION
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
#endif`,Sp=`#ifdef USE_TRANSMISSION
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ap=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wp=`uniform sampler2D t2D;
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cp=`uniform float backgroundBlurriness;
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`#include <common>
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
}`,Ip=`#if DEPTH_PACKING == 3200
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
}`,Np=`#define DISTANCE
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
}`,Up=`#define DISTANCE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`uniform float scale;
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
}`,zp=`uniform vec3 diffuse;
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
}`,Gp=`#include <common>
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
}`,kp=`uniform vec3 diffuse;
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
}`,Hp=`#define LAMBERT
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
}`,Vp=`#define LAMBERT
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
}`,Wp=`#define MATCAP
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
}`,Xp=`#define MATCAP
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
}`,Yp=`#define NORMAL
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
}`,qp=`#define NORMAL
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
}`,Zp=`#define PHONG
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
}`,Kp=`#define PHONG
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
}`,Jp=`#define STANDARD
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
}`,$p=`#define STANDARD
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
}`,Qp=`#define TOON
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
}`,jp=`#define TOON
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
}`,tm=`uniform float size;
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
}`,em=`uniform vec3 diffuse;
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
}`,nm=`#include <common>
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
}`,im=`uniform vec3 color;
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
}`,sm=`uniform float rotation;
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
}`,rm=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:wf,alphahash_pars_fragment:Rf,alphamap_fragment:Cf,alphamap_pars_fragment:Pf,alphatest_fragment:Df,alphatest_pars_fragment:Lf,aomap_fragment:If,aomap_pars_fragment:Nf,batching_pars_vertex:Uf,batching_vertex:Ff,begin_vertex:Of,beginnormal_vertex:Bf,bsdfs:zf,iridescence_fragment:Gf,bumpmap_pars_fragment:kf,clipping_planes_fragment:Hf,clipping_planes_pars_fragment:Vf,clipping_planes_pars_vertex:Wf,clipping_planes_vertex:Xf,color_fragment:Yf,color_pars_fragment:qf,color_pars_vertex:Zf,color_vertex:Kf,common:Jf,defaultnormal_vertex:$f,displacementmap_pars_vertex:Qf,displacementmap_vertex:jf,emissivemap_fragment:td,emissivemap_pars_fragment:ed,colorspace_fragment:nd,colorspace_pars_fragment:id,envmap_fragment:sd,envmap_common_pars_fragment:rd,envmap_pars_fragment:od,envmap_pars_vertex:ad,envmap_physical_pars_fragment:xd,envmap_vertex:ld,fog_vertex:cd,fog_pars_vertex:hd,fog_fragment:ud,fog_pars_fragment:fd,gradientmap_pars_fragment:dd,lightmap_pars_fragment:pd,lights_lambert_fragment:md,lights_lambert_pars_fragment:gd,lights_pars_begin:_d,lights_toon_fragment:vd,lights_toon_pars_fragment:Md,lights_phong_fragment:Sd,lights_phong_pars_fragment:yd,lights_physical_fragment:bd,lights_physical_pars_fragment:Ed,lights_fragment_begin:Td,lights_fragment_maps:Ad,lights_fragment_end:wd,lightprobes_pars_fragment:Rd,logdepthbuf_fragment:Cd,logdepthbuf_pars_fragment:Pd,logdepthbuf_pars_vertex:Dd,logdepthbuf_vertex:Ld,map_fragment:Id,map_pars_fragment:Nd,map_particle_fragment:Ud,map_particle_pars_fragment:Fd,metalnessmap_fragment:Od,metalnessmap_pars_fragment:Bd,morphinstance_vertex:zd,morphcolor_vertex:Gd,morphnormal_vertex:kd,morphtarget_pars_vertex:Hd,morphtarget_vertex:Vd,normal_fragment_begin:Wd,normal_fragment_maps:Xd,normal_pars_fragment:Yd,normal_pars_vertex:qd,normal_vertex:Zd,normalmap_pars_fragment:Kd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:$d,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:jd,opaque_fragment:tp,packing:ep,premultiplied_alpha_fragment:np,project_vertex:ip,dithering_fragment:sp,dithering_pars_fragment:rp,roughnessmap_fragment:op,roughnessmap_pars_fragment:ap,shadowmap_pars_fragment:lp,shadowmap_pars_vertex:cp,shadowmap_vertex:hp,shadowmask_pars_fragment:up,skinbase_vertex:fp,skinning_pars_vertex:dp,skinning_vertex:pp,skinnormal_vertex:mp,specularmap_fragment:gp,specularmap_pars_fragment:_p,tonemapping_fragment:xp,tonemapping_pars_fragment:vp,transmission_fragment:Mp,transmission_pars_fragment:Sp,uv_pars_fragment:yp,uv_pars_vertex:bp,uv_vertex:Ep,worldpos_vertex:Tp,background_vert:Ap,background_frag:wp,backgroundCube_vert:Rp,backgroundCube_frag:Cp,cube_vert:Pp,cube_frag:Dp,depth_vert:Lp,depth_frag:Ip,distance_vert:Np,distance_frag:Up,equirect_vert:Fp,equirect_frag:Op,linedashed_vert:Bp,linedashed_frag:zp,meshbasic_vert:Gp,meshbasic_frag:kp,meshlambert_vert:Hp,meshlambert_frag:Vp,meshmatcap_vert:Wp,meshmatcap_frag:Xp,meshnormal_vert:Yp,meshnormal_frag:qp,meshphong_vert:Zp,meshphong_frag:Kp,meshphysical_vert:Jp,meshphysical_frag:$p,meshtoon_vert:Qp,meshtoon_frag:jp,points_vert:tm,points_frag:em,shadow_vert:nm,shadow_frag:im,sprite_vert:sm,sprite_frag:rm},Dt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new Nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},Hn={basic:{uniforms:pn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:pn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ne(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:pn([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:pn([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:pn([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new ne(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:pn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:pn([Dt.points,Dt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:pn([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:pn([Dt.common,Dt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:pn([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:pn([Dt.sprite,Dt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:pn([Dt.common,Dt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:pn([Dt.lights,Dt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Hn.physical={uniforms:pn([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new ee},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const Or={r:0,b:0,g:0},om=new pe,nu=new ee;nu.set(-1,0,0,0,1,0,0,0,1);function am(i,t,e,n,s,r){const o=new ne(0);let a=s===!0?0:1,c,l,f=null,g=0,d=null;function h(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const A=y.backgroundBlurriness>0;b=t.get(b,A)}return b}function _(y){let b=!1;const A=h(y);A===null?p(o,a):A&&A.isColor&&(p(A,1),b=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(y,b){const A=h(b);A&&A.isCubeTexture?(l===void 0&&(l=new Se(new Je(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:Rs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,x,u){this.matrixWorld.copyPosition(u.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=A,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(om.makeRotationFromEuler(b.backgroundRotation)).transpose(),A.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nu),l.material.toneMapped=de.getTransfer(A.colorSpace)!==we,(f!==A||g!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=A,g=A.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Se(new Si(2,2),new Ui({name:"BackgroundMaterial",uniforms:Rs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=de.getTransfer(A.colorSpace)!==we,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(f!==A||g!==A.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=A,g=A.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,b){y.getRGB(Or,Xh(i)),e.buffers.color.setClear(Or.r,Or.g,Or.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),a=b,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,p(o,a)},render:_,addToRenderList:M,dispose:m}}function lm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(T,L,U,I,k){let Y=!1;const Z=g(T,I,U,L);r!==Z&&(r=Z,l(r.object)),Y=h(T,I,U,k),Y&&_(T,I,U,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,A(T,L,U,I),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function f(T){return i.deleteVertexArray(T)}function g(T,L,U,I){const k=I.wireframe===!0;let Y=n[L.id];Y===void 0&&(Y={},n[L.id]=Y);const Z=T.isInstancedMesh===!0?T.id:0;let it=Y[Z];it===void 0&&(it={},Y[Z]=it);let Q=it[U.id];Q===void 0&&(Q={},it[U.id]=Q);let tt=Q[k];return tt===void 0&&(tt=d(c()),Q[k]=tt),tt}function d(T){const L=[],U=[],I=[];for(let k=0;k<e;k++)L[k]=0,U[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:I,object:T,attributes:{},index:null}}function h(T,L,U,I){const k=r.attributes,Y=L.attributes;let Z=0;const it=U.getAttributes();for(const Q in it)if(it[Q].location>=0){const ut=k[Q];let Mt=Y[Q];if(Mt===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(Mt=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(Mt=T.instanceColor)),ut===void 0||ut.attribute!==Mt||Mt&&ut.data!==Mt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==I}function _(T,L,U,I){const k={},Y=L.attributes;let Z=0;const it=U.getAttributes();for(const Q in it)if(it[Q].location>=0){let ut=Y[Q];ut===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(ut=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(ut=T.instanceColor));const Mt={};Mt.attribute=ut,ut&&ut.data&&(Mt.data=ut.data),k[Q]=Mt,Z++}r.attributes=k,r.attributesNum=Z,r.index=I}function M(){const T=r.newAttributes;for(let L=0,U=T.length;L<U;L++)T[L]=0}function p(T){m(T,0)}function m(T,L){const U=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;U[T]=1,I[T]===0&&(i.enableVertexAttribArray(T),I[T]=1),k[T]!==L&&(i.vertexAttribDivisor(T,L),k[T]=L)}function y(){const T=r.newAttributes,L=r.enabledAttributes;for(let U=0,I=L.length;U<I;U++)L[U]!==T[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function b(T,L,U,I,k,Y,Z){Z===!0?i.vertexAttribIPointer(T,L,U,k,Y):i.vertexAttribPointer(T,L,U,I,k,Y)}function A(T,L,U,I){M();const k=I.attributes,Y=U.getAttributes(),Z=L.defaultAttributeValues;for(const it in Y){const Q=Y[it];if(Q.location>=0){let tt=k[it];if(tt===void 0&&(it==="instanceMatrix"&&T.instanceMatrix&&(tt=T.instanceMatrix),it==="instanceColor"&&T.instanceColor&&(tt=T.instanceColor)),tt!==void 0){const ut=tt.normalized,Mt=tt.itemSize,At=t.get(tt);if(At===void 0)continue;const O=At.buffer,ct=At.type,wt=At.bytesPerElement,Lt=ct===i.INT||ct===i.UNSIGNED_INT||tt.gpuType===Vo;if(tt.isInterleavedBufferAttribute){const xt=tt.data,Zt=xt.isInterleavedBuffer===!0?xt.stride:xt.itemSize,Le=tt.offset;if(xt.isInstancedInterleavedBuffer||xt.isInstancedBufferAttribute){for(let Ht=0;Ht<Q.locationSize;Ht++)m(Q.location+Ht,xt.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let Ht=0;Ht<Q.locationSize;Ht++)p(Q.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,O);for(let Ht=0;Ht<Q.locationSize;Ht++)b(Q.location+Ht,Mt/Q.locationSize,ct,ut,Zt*wt,(Le+Mt/Q.locationSize*Ht)*wt,Lt)}else{if(tt.isInstancedBufferAttribute){for(let xt=0;xt<Q.locationSize;xt++)m(Q.location+xt,tt.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let xt=0;xt<Q.locationSize;xt++)p(Q.location+xt);i.bindBuffer(i.ARRAY_BUFFER,O);for(let xt=0;xt<Q.locationSize;xt++)b(Q.location+xt,Mt/Q.locationSize,ct,ut,Mt*wt,Mt/Q.locationSize*xt*wt,Lt)}}else if(Z!==void 0){const ut=Z[it];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(Q.location,ut);break;case 3:i.vertexAttrib3fv(Q.location,ut);break;case 4:i.vertexAttrib4fv(Q.location,ut);break;default:i.vertexAttrib1fv(Q.location,ut)}}}}y()}function S(){P();for(const T in n){const L=n[T];for(const U in L){const I=L[U];for(const k in I){const Y=I[k];for(const Z in Y)f(Y[Z].object),delete Y[Z];delete I[k]}}delete n[T]}}function x(T){if(n[T.id]===void 0)return;const L=n[T.id];for(const U in L){const I=L[U];for(const k in I){const Y=I[k];for(const Z in Y)f(Y[Z].object),delete Y[Z];delete I[k]}}delete n[T.id]}function u(T){for(const L in n){const U=n[L];for(const I in U){const k=U[I];if(k[T.id]===void 0)continue;const Y=k[T.id];for(const Z in Y)f(Y[Z].object),delete Y[Z];delete k[T.id]}}}function v(T){for(const L in n){const U=n[L],I=T.isInstancedMesh===!0?T.id:0,k=U[I];if(k!==void 0){for(const Y in k){const Z=k[Y];for(const it in Z)f(Z[it].object),delete Z[it];delete k[Y]}delete U[I],Object.keys(U).length===0&&delete n[L]}}}function P(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:S,releaseStatesOfGeometry:x,releaseStatesOfObject:v,releaseStatesOfProgram:u,initAttributes:M,enableAttribute:p,disableUnusedAttributes:y}}function cm(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,f){f!==0&&(i.drawArraysInstanced(n,c,l,f),e.update(l,n,f))}function a(c,l,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,f);let d=0;for(let h=0;h<f;h++)d+=l[h];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function hm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const u=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(u){return!(u!==Vn&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(u){const v=u===Yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(u!==Sn&&u!==Nn&&!v&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(u){if(u==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";u="mediump"}return u==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const f=c(l);f!==l&&(Kt("WebGLRenderer:",l,"not supported, using",f,"instead."),l=f);const g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&g===!1;e.reversedDepthBuffer===!0&&g===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&g===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),x=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:g,maxTextures:h,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:A,maxSamples:S,samples:x}}function um(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ei,a=new ee,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,d){const h=g.length!==0||d||n!==0||s;return s=d,n=g.length,h},this.beginShadows=function(){r=!0,f(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,d){e=f(g,d,0)},this.setState=function(g,d,h){const _=g.clippingPlanes,M=g.clipIntersection,p=g.clipShadows,m=i.get(g);if(!s||_===null||_.length===0||r&&!p)r?f(null):l();else{const y=r?0:n,b=y*4;let A=m.clippingState||null;c.value=A,A=f(_,d,b,h);for(let S=0;S!==b;++S)A[S]=e[S];m.clippingState=A,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(g,d,h,_){const M=g!==null?g.length:0;let p=null;if(M!==0){if(p=c.value,_!==!0||p===null){const m=h+M*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,A=h;b!==M;++b,A+=4)o.copy(g[b]).applyMatrix4(y,a),o.normal.toArray(p,A),p[A+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,p}}class na extends Wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Sl(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Je(5,5,5),r=new Ui({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:Qi});r.uniforms.tEquirect.value=e;const o=new Se(s,r),a=e.minFilter;return e.minFilter===gi&&(e.minFilter=gn),new Bo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const vc=256,fm=3,dm=20,iu=256,su=16,pm=3,mm=new B,gm=new ne;class hr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Bo(1,10,null),this._boxMesh=new Se(new Je(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=mm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),f=this._getSourceTarget(!0);e>0&&(f.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,d=c.autoClearColor,h=c.autoClearDepth,_=c.autoClearStencil,M=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,M===null&&(t.background=c.getClearColor(gm));const p=new Bo(n,s,f);return p.position.copy(a),p.update(c,t),c.autoClear=g,c.autoClearColor=d,c.autoClearDepth=h,c.autoClearStencil=_,t.background=M,e>0&&(f.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(vc,Ah(t))}_fromTexture(t,e){t.mapping===ji||t.mapping===Es?this._setSize(t.image.length===0?vc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Mc(t,!1,!1),n=Math.log2(t)-fm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Mc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ji||t.mapping===Es?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Sc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=_m(),this._integrationMaterial=xm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/su);for(let o=0;o<=n;o++){const a=hr.lodToRoughness(o,n);if(o>n-pm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(iu*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=vm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Mc(i,t,e){return new na(i,{minFilter:gi,generateMipmaps:t,type:Yn,colorSpace:or,depthBuffer:e})}function ur(i,t,e){return new Ui({name:i,uniforms:t,vertexShader:se.cube_vert,fragmentShader:e,side:_n,blending:Qi,depthTest:!1,depthWrite:!1})}function _m(){return ur("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${iu}u

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
	`)}function xm(){return ur("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:su}},`

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
	`)}function vm(){return ur("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${dm}
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
	`)}function Sc(){return ur("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function yc(){return ur("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Mm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,h=!1){return d==null?null:h?o(d):r(d)}function r(d){if(d&&d.isTexture){const h=d.mapping;if(h===Hr||h===Vr)if(t.has(d)){const _=t.get(d).texture;return a(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const M=new na(_.height);return M.fromEquirectangularTexture(i,d),t.set(d,M),d.addEventListener("dispose",l),a(M.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const h=d.mapping,_=h===Hr||h===Vr,M=h===ji||h===Es;if(_||M){let p=e.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new hr(i)),p=_?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),p.texture;if(p!==void 0)return p.texture;{const y=d.image;return _&&y&&y.height>0||M&&y&&c(y)?(n===null&&(n=new hr(i)),p=_?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,e.set(d,p),d.addEventListener("dispose",f),p.texture):null}}}return d}function a(d,h){return h===Hr?d.mapping=ji:h===Vr&&(d.mapping=Es),d}function c(d){let h=0;const _=6;for(let M=0;M<_;M++)d[M]!==void 0&&h++;return h===_}function l(d){const h=d.target;h.removeEventListener("dispose",l);const _=t.get(h);_!==void 0&&(t.delete(h),_.dispose())}function f(d){const h=d.target;h.removeEventListener("dispose",f);const _=e.get(h);_!==void 0&&(e.delete(h),_.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function Sm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Qs("WebGLRenderer: "+n+" extension not supported."),s}}}function ym(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(_=>delete s[_]);function a(_){c(_.target)}function c(_){_.index!==null&&t.remove(_.index);for(const p in _.attributes)t.remove(_.attributes[p]);_.removeEventListener("dispose",a),delete s[_.id],o.unregister(_);const M=r.get(_);M&&(t.remove(M),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function l(_,M){return s[M.id]!==void 0||(M.addEventListener("dispose",a),s[M.id]=new WeakRef(M),o.register(M,M.id,M),e.memory.geometries++),M}function f(_){const M=_.attributes;for(const p in M)t.update(M[p],i.ARRAY_BUFFER)}function g(_){const M=_.index,p=_.attributes.position;let m=0;if(p===void 0)return;const y=M!==null?M.array.length:p.array.length/3-1,b=p.count>=65535?gl:ml,A=new b(Math.ceil(y/3)*6,1),S=A.array;if(M!==null){const u=M.array;m=M.version;for(let v=0,P=0;v<y;v+=3){const w=u[v+0],T=u[v+1],L=u[v+2];S[P++]=w,S[P++]=T,S[P++]=T,S[P++]=L,S[P++]=L,S[P++]=w}}else{m=p.version;for(let u=0,v=0;u<y;u+=3){const P=u+0,w=u+1,T=u+2;S[v++]=P,S[v++]=w,S[v++]=w,S[v++]=T,S[v++]=T,S[v++]=P}}A.version=m;const x=r.get(_);x&&t.remove(x),r.set(_,A)}function d(_){const M=r.get(_);if(M){const p=_.index;p!==null&&M.version<p.version&&g(_)}else g(_);return r.get(_)}function h(){for(const _ in s){const M=s[_].deref();M!==void 0&&c(M)}}return{get:l,update:f,getWireframeAttribute:d,dispose:h}}function bm(i,t,e){let n;function s(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function c(g,d){i.drawElements(n,d,r,g*o),e.update(d,n,1)}function l(g,d,h){h!==0&&(i.drawElementsInstanced(n,d,r,g*o,h),e.update(d,n,h))}function f(g,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,g,0,h);let M=0;for(let p=0;p<h;p++)M+=d[p];e.update(M,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=f}function Em(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Me("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tm(i,t,e){const n=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,g=f!==void 0?f.length:0;let d=n.get(a);if(d===void 0||d.count!==g){let P=function(){u.dispose(),n.delete(a),a.removeEventListener("dispose",P)};d!==void 0&&d.texture.dispose();const h=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,M=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let b=0;h===!0&&(b=1),_===!0&&(b=2),M===!0&&(b=3);let A=a.attributes.position.count*b,S=1;A>t.maxTextureSize&&(S=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const x=new Float32Array(A*S*4*g),u=new pl(x,A,S,g);u.type=Nn,u.needsUpdate=!0;const v=b*4;for(let w=0;w<g;w++){const T=p[w],L=m[w],U=y[w],I=A*S*4*w;for(let k=0;k<T.count;k++){const Y=k*v;h===!0&&(s.fromBufferAttribute(T,k),x[I+Y+0]=s.x,x[I+Y+1]=s.y,x[I+Y+2]=s.z,x[I+Y+3]=0),_===!0&&(s.fromBufferAttribute(L,k),x[I+Y+4]=s.x,x[I+Y+5]=s.y,x[I+Y+6]=s.z,x[I+Y+7]=0),M===!0&&(s.fromBufferAttribute(U,k),x[I+Y+8]=s.x,x[I+Y+9]=s.y,x[I+Y+10]=s.z,x[I+Y+11]=U.itemSize===4?s.w:1)}}d={count:g,texture:u,size:new Nt(A,S)},n.set(a,d),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let h=0;for(let M=0;M<l.length;M++)h+=l[M];const _=a.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Am(i,t,e,n,s){let r=new WeakMap;function o(l){const f=s.render.frame,g=l.geometry,d=t.get(l,g);if(r.get(d)!==f&&(t.update(d),r.set(d,f)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==f&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,f))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==f&&(h.update(),r.set(h,f))}return d}function a(){r=new WeakMap}function c(l){const f=l.target;f.removeEventListener("dispose",c),n.releaseStatesOfObject(f),e.remove(f.instanceMatrix),f.instanceColor!==null&&e.remove(f.instanceColor)}return{update:o,dispose:a}}const wm={[Ka]:"LINEAR_TONE_MAPPING",[Ja]:"REINHARD_TONE_MAPPING",[$a]:"CINEON_TONE_MAPPING",[Ho]:"ACES_FILMIC_TONE_MAPPING",[ja]:"AGX_TONE_MAPPING",[tl]:"NEUTRAL_TONE_MAPPING",[Qa]:"CUSTOM_TONE_MAPPING"};function Rm(i,t,e,n,s,r){const o=new Wn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const f=new $e;f.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new Re([0,2,0,0,2,0],2));const g=new qh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Se(f,g),h=new Pl(-1,1,1,-1,0,1);let _=null,M=null,p=!1,m,y=null,b=[],A=!1;this.setSize=function(S,x){o.setSize(S,x),a!==null&&a.setSize(S,x),c!==null&&c.setSize(S,x);for(let u=0;u<b.length;u++){const v=b[u];v.setSize&&v.setSize(S,x)}},this.setEffects=function(S){b=S,A=b.length>0&&b[0].isRenderPass===!0;const x=o.width,u=o.height;b.length>0&&a===null&&(a=new Wn(x,u,{type:Yn,depthBuffer:!1,stencilBuffer:!1}),c=new Wn(x,u,{type:Yn,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&b.some(P=>P.needsDepthTexture===!0);v!==(o.depthTexture!==null)&&(v===!0&&l===null&&(l=new es(x,u),r===!0&&(l.format=_i,l.type=ts)),o.dispose(),o.depthTexture=v?l:null,o.resolveDepthBuffer=v,o.storeMultisampledDepthBuffer=v);for(let P=0;P<b.length;P++){const w=b[P];w.setSize&&w.setSize(x,u),v&&w.needsDepthTexture===!0&&w.setDepthTexture&&w.setDepthTexture(l)}},this.begin=function(S,x){if(p||S.toneMapping===ri&&b.length===0)return!1;if(y=x,x!==null){const u=x.width,v=x.height;(o.width!==u||o.height!==v)&&this.setSize(u,v)}return A===!1&&S.setRenderTarget(o),m=S.toneMapping,S.toneMapping=ri,!0},this.hasRenderPass=function(){return A},this.end=function(S,x){S.toneMapping=m,p=!0;let u=o,v=a;for(let P=0;P<b.length;P++){const w=b[P];w.enabled!==!1&&(w.render(S,v,u,x),w.needsSwap!==!1&&(u=v,v=v===a?c:a))}if(_!==S.outputColorSpace||M!==S.toneMapping){_=S.outputColorSpace,M=S.toneMapping,g.defines={},de.getTransfer(_)===we&&(g.defines.SRGB_TRANSFER="");const P=wm[M];P&&(g.defines[P]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=u.texture,S.setRenderTarget(y),S.render(d,h),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),f.dispose(),g.dispose()}}const ru=new cn,ou=new es(1,1),au=new yl(1),lu=new pl,cu=new Dh,hu=new Sl,bc=[],Ec=[],Tc=new Float32Array(16),Ac=new Float32Array(9),wc=new Float32Array(4);function Ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=bc[s];if(r===void 0&&(r=new Float32Array(s),bc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Qe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function je(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ia(i,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Cm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2fv(this.addr,t),je(e,t)}}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;i.uniform3fv(this.addr,t),je(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4fv(this.addr,t),je(e,t)}}function Im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;wc.set(n),i.uniformMatrix2fv(this.addr,!1,wc),je(e,n)}}function Nm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;Ac.set(n),i.uniformMatrix3fv(this.addr,!1,Ac),je(e,n)}}function Um(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),je(e,t)}else{if(Qe(e,n))return;Tc.set(n),i.uniformMatrix4fv(this.addr,!1,Tc),je(e,n)}}function Fm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2iv(this.addr,t),je(e,t)}}function Bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3iv(this.addr,t),je(e,t)}}function zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4iv(this.addr,t),je(e,t)}}function Gm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2uiv(this.addr,t),je(e,t)}}function Hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3uiv(this.addr,t),je(e,t)}}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4uiv(this.addr,t),je(e,t)}}function sa(i){return i.version===0&&(i.compareFunction=hl,i.needsUpdate=!0),i}function Wm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=sa(ou):r=ru,e.setTexture2D(t||r,s)}function Xm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||cu,s)}function Ym(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=sa(au):r=hu,e.setTextureCube(t||r,s)}function qm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lu,s)}function Zm(i){switch(i){case 5126:return Cm;case 35664:return Pm;case 35665:return Dm;case 35666:return Lm;case 35674:return Im;case 35675:return Nm;case 35676:return Um;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return Gm;case 36294:return km;case 36295:return Hm;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return qm}}function Km(i,t){i.uniform1fv(this.addr,t)}function Jm(i,t){const e=Ls(t,this.size,2);i.uniform2fv(this.addr,e)}function $m(i,t){const e=Ls(t,this.size,3);i.uniform3fv(this.addr,e)}function Qm(i,t){const e=Ls(t,this.size,4);i.uniform4fv(this.addr,e)}function jm(i,t){const e=Ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function t0(i,t){const e=Ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function e0(i,t){const e=Ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function n0(i,t){i.uniform1iv(this.addr,t)}function i0(i,t){i.uniform2iv(this.addr,t)}function s0(i,t){i.uniform3iv(this.addr,t)}function r0(i,t){i.uniform4iv(this.addr,t)}function o0(i,t){i.uniform1uiv(this.addr,t)}function a0(i,t){i.uniform2uiv(this.addr,t)}function l0(i,t){i.uniform3uiv(this.addr,t)}function c0(i,t){i.uniform4uiv(this.addr,t)}function h0(i,t,e){const n=this.cache,s=t.length,r=ia(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),je(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=sa(ou):o=ru;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function u0(i,t,e){const n=this.cache,s=t.length,r=ia(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||cu,r[o])}function f0(i,t,e){const n=this.cache,s=t.length,r=ia(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),je(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=sa(au):o=hu;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function d0(i,t,e){const n=this.cache,s=t.length,r=ia(e,s);Qe(n,r)||(i.uniform1iv(this.addr,r),je(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||lu,r[o])}function p0(i){switch(i){case 5126:return Km;case 35664:return Jm;case 35665:return $m;case 35666:return Qm;case 35674:return jm;case 35675:return t0;case 35676:return e0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return s0;case 35669:case 35673:return r0;case 5125:return o0;case 36294:return a0;case 36295:return l0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return h0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return d0}}class m0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Zm(e.type)}}class g0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=p0(e.type)}}class _0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function Rc(i,t){i.seq.push(t),i.map[t.id]=t}function x0(i,t,e){const n=i.name,s=n.length;for(Da.lastIndex=0;;){const r=Da.exec(n),o=Da.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Rc(e,l===void 0?new m0(a,i,t):new g0(a,i,t));break}else{let g=e.map[a];g===void 0&&(g=new _0(a),Rc(e,g)),e=g}}}class qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);x0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Cc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const v0=37297;let M0=0;function S0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Pc=new ee;function y0(i){de._getMatrix(Pc,de.workingColorSpace,i);const t=`mat3( ${Pc.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case ar:return[t,"LinearTransferOETF"];case we:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Dc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+S0(i.getShaderSource(t),a)}else return r}function b0(i,t){const e=y0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const E0={[Ka]:"Linear",[Ja]:"Reinhard",[$a]:"Cineon",[Ho]:"ACESFilmic",[ja]:"AgX",[tl]:"Neutral",[Qa]:"Custom"};function T0(i,t){const e=E0[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Br=new B;function A0(){de.getLuminanceCoefficients(Br);const i=Br.x.toFixed(4),t=Br.y.toFixed(4),e=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function R0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function C0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ys(i){return i!==""}function Lc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(P0,D0)}function D0(i,t){const e=se[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Xa(e)}const L0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nc(i){return i.replace(L0,I0)}function I0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const N0={[qs]:"SHADOWMAP_TYPE_PCF",[vs]:"SHADOWMAP_TYPE_VSM"};function U0(i){return N0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const F0={[Es]:"ENVMAP_MODE_REFRACTION"};function O0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":F0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const B0={[Za]:"ENVMAP_BLENDING_MULTIPLY",[fh]:"ENVMAP_BLENDING_MIX",[dh]:"ENVMAP_BLENDING_ADD"};function z0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":B0[i.combine]||"ENVMAP_BLENDING_NONE"}function G0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=U0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",f=O0(e),g=z0(e),d=w0(e),h=R0(r),_=s.createProgram();let M,p,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,h].filter(Ys).join(`
`),M.length>0&&(M+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,h].filter(Ys).join(`
`),p.length>0&&(p+=`
`)):(M=[Uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,h,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),p=[Uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,h,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+f:"",e.envMap?"#define "+g:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?se.tonemapping_pars_fragment:"",e.toneMapping!==ri?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,b0("linearToOutputTexel",e.outputColorSpace),A0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),o=Xa(o),o=Lc(o,e),o=Ic(o,e),a=Xa(a),a=Lc(a,e),a=Ic(a,e),o=Nc(o),a=Nc(a),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,M=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,p=["#define varying in",e.glslVersion===Oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=m+M+o,b=m+p+a,A=Cc(s,s.VERTEX_SHADER,y),S=Cc(s,s.FRAGMENT_SHADER,b);s.attachShader(_,A),s.attachShader(_,S),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function x(w){if(i.debug.checkShaderErrors){const T=s.getProgramInfoLog(_)||"",L=s.getShaderInfoLog(A)||"",U=s.getShaderInfoLog(S)||"",I=T.trim(),k=L.trim(),Y=U.trim();let Z=!0,it=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,S);else{const Q=Dc(s,A,"vertex"),tt=Dc(s,S,"fragment");Me("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+I+`
`+Q+`
`+tt)}else I!==""?Kt("WebGLProgram: Program Info Log:",I):(k===""||Y==="")&&(it=!1);it&&(w.diagnostics={runnable:Z,programLog:I,vertexShader:{log:k,prefix:M},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(A),s.deleteShader(S),u=new qr(s,_),v=C0(s,_)}let u;this.getUniforms=function(){return u===void 0&&x(this),u};let v;this.getAttributes=function(){return v===void 0&&x(this),v};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,v0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=M0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=S,this}let k0=0;class H0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new V0(t),e.set(t,n)),n}}class V0{constructor(t){this.id=k0++,this.code=t,this.usedTimes=0}}function W0(i){return i===Ni||i===sr||i===rr}function X0(i,t,e,n,s,r){const o=new $o,a=new H0,c=new Set,l=[],f=new Map,g=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(u){return c.add(u),u===0?"uv":`uv${u}`}function _(u,v,P,w,T,L){const U=w.fog,I=T.geometry,k=u.isMeshStandardMaterial||u.isMeshLambertMaterial||u.isMeshPhongMaterial?w.environment:null,Y=u.isMeshStandardMaterial||u.isMeshLambertMaterial&&!u.envMap||u.isMeshPhongMaterial&&!u.envMap,Z=t.get(u.envMap||k,Y),it=d[u.type];let Q=n.precision;u.precision!==null&&(Q=n.getMaxPrecision(u.precision),Q!==u.precision&&Kt("WebGLProgram.getParameters:",u.precision,"not supported, using",Q,"instead."));const tt=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ut=tt!==void 0?tt.length:0;let Mt=0;I.morphAttributes.position!==void 0&&(Mt=1),I.morphAttributes.normal!==void 0&&(Mt=2),I.morphAttributes.color!==void 0&&(Mt=3);let At,O,ct,wt;if(it){const at=Hn[it];At=at.vertexShader,O=at.fragmentShader}else{At=u.vertexShader,O=u.fragmentShader;const at=a.getVertexShaderStage(u),ie=a.getFragmentShaderStage(u);a.update(u,at,ie),ct=at.id,wt=ie.id}const Lt=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Zt=T.isInstancedMesh===!0,Le=T.isBatchedMesh===!0,Ht=!!u.map,me=!!u.matcap,he=!!Z,re=he&&Z.isPMREMTexture===!0,Rt=!!u.aoMap,Pt=!!u.lightMap,Vt=!!u.bumpMap&&u.wireframe===!1,Wt=!!u.normalMap,ue=!!u.displacementMap,ve=!!u.emissiveMap,Fe=!!u.metalnessMap,Ie=!!u.roughnessMap,Ve=u.anisotropy>0,H=u.clearcoat>0,We=u.diffuseRoughness>0,ce=u.dispersion>0,ye=u.retroreflectivity>0,bt=u.iridescence>0,Jt=u.sheen>0,Xt=u.transmission>0,$t=Ve&&!!u.anisotropyMap,N=H&&!!u.clearcoatMap,R=H&&!!u.clearcoatNormalMap,q=H&&!!u.clearcoatRoughnessMap,st=We&&!!u.diffuseRoughnessMap,ht=bt&&!!u.iridescenceMap,vt=bt&&!!u.iridescenceThicknessMap,gt=Jt&&!!u.sheenColorMap,rt=Jt&&!!u.sheenRoughnessMap,lt=!!u.specularMap,St=!!u.specularColorMap,z=!!u.specularIntensityMap,ot=Xt&&!!u.transmissionMap,nt=Xt&&!!u.thicknessMap,dt=!!u.gradientMap,ft=!!u.alphaMap,pt=u.alphaTest>0,Ft=!!u.alphaHash,jt=!!u.extensions;let mt=ri;u.toneMapped&&(Lt===null||Lt.isXRRenderTarget===!0)&&(mt=i.toneMapping);const Gt=re?Z.isCompressedCubeTexture?Z.image[0].mipmaps:Z.mipmaps:null,Yt={shaderID:it,shaderType:u.type,shaderName:u.name,vertexShader:At,fragmentShader:O,defines:u.defines,customVertexShaderID:ct,customFragmentShaderID:wt,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:Q,batching:Le,batchingColor:Le&&T._colorsTexture!==null,instancing:Zt,instancingColor:Zt&&T.instanceColor!==null,instancingMorph:Zt&&T.morphTexture!==null,outputColorSpace:Lt===null?i.outputColorSpace:Lt.isXRRenderTarget===!0?Lt.texture.colorSpace:de.workingColorSpace,alphaToCoverage:!!u.alphaToCoverage,map:Ht,matcap:me,envMap:he,envMapMode:he&&Z.mapping,envMapPMREM:re,envMapMaxLod:re?Gt.length-1:null,envMapSize:re?Gt[0].width:null,aoMap:Rt,lightMap:Pt,bumpMap:Vt,normalMap:Wt,displacementMap:ue,emissiveMap:ve,normalMapObjectSpace:Wt&&u.normalMapType===gh,normalMapTangentSpace:Wt&&u.normalMapType===No,packedNormalMap:Wt&&u.normalMapType===No&&W0(u.normalMap.format),metalnessMap:Fe,roughnessMap:Ie,anisotropy:Ve,anisotropyMap:$t,clearcoat:H,clearcoatMap:N,clearcoatNormalMap:R,clearcoatRoughnessMap:q,diffuseRoughness:We,diffuseRoughnessMap:st,dispersion:ce,retroreflection:ye,iridescence:bt,iridescenceMap:ht,iridescenceThicknessMap:vt,sheen:Jt,sheenColorMap:gt,sheenRoughnessMap:rt,specularMap:lt,specularColorMap:St,specularIntensityMap:z,transmission:Xt,transmissionMap:ot,thicknessMap:nt,gradientMap:dt,opaque:u.transparent===!1&&u.blending===Ss&&u.alphaToCoverage===!1,alphaMap:ft,alphaTest:pt,alphaHash:Ft,combine:u.combine,mapUv:Ht&&h(u.map.channel),aoMapUv:Rt&&h(u.aoMap.channel),lightMapUv:Pt&&h(u.lightMap.channel),bumpMapUv:Vt&&h(u.bumpMap.channel),normalMapUv:Wt&&h(u.normalMap.channel),displacementMapUv:ue&&h(u.displacementMap.channel),emissiveMapUv:ve&&h(u.emissiveMap.channel),metalnessMapUv:Fe&&h(u.metalnessMap.channel),roughnessMapUv:Ie&&h(u.roughnessMap.channel),anisotropyMapUv:$t&&h(u.anisotropyMap.channel),clearcoatMapUv:N&&h(u.clearcoatMap.channel),clearcoatNormalMapUv:R&&h(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&h(u.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:st&&h(u.diffuseRoughnessMap.channel),iridescenceMapUv:ht&&h(u.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&h(u.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&h(u.sheenColorMap.channel),sheenRoughnessMapUv:rt&&h(u.sheenRoughnessMap.channel),specularMapUv:lt&&h(u.specularMap.channel),specularColorMapUv:St&&h(u.specularColorMap.channel),specularIntensityMapUv:z&&h(u.specularIntensityMap.channel),transmissionMapUv:ot&&h(u.transmissionMap.channel),thicknessMapUv:nt&&h(u.thicknessMap.channel),alphaMapUv:ft&&h(u.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Wt||Ve),vertexNormals:!!I.attributes.normal,vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!I.attributes.uv&&(Ht||ft),fog:!!U,useFog:u.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:u.wireframe===!1&&(u.flatShading===!0||I.attributes.normal===void 0&&Wt===!1&&(u.isMeshLambertMaterial||u.isMeshPhongMaterial||u.isMeshStandardMaterial||u.isMeshPhysicalMaterial)),sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:xt,skinning:T.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Mt,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:L.filter(at=>at.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:u.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:mt,decodeVideoTexture:Ht&&u.map.isVideoTexture===!0&&de.getTransfer(u.map.colorSpace)===we,decodeVideoTextureEmissive:ve&&u.emissiveMap.isVideoTexture===!0&&de.getTransfer(u.emissiveMap.colorSpace)===we,premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===fn,flipSided:u.side===_n,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionClipCullDistance:jt&&u.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&u.extensions.multiDraw===!0||Le)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()};return Yt.vertexUv1s=c.has(1),Yt.vertexUv2s=c.has(2),Yt.vertexUv3s=c.has(3),c.clear(),Yt}function M(u){const v=[];if(u.shaderID?v.push(u.shaderID):(v.push(u.customVertexShaderID),v.push(u.customFragmentShaderID)),u.defines!==void 0)for(const P in u.defines)v.push(P),v.push(u.defines[P]);return u.isRawShaderMaterial===!1&&(p(v,u),m(v,u),v.push(i.outputColorSpace)),v.push(u.customProgramCacheKey),v.join()}function p(u,v){u.push(v.precision),u.push(v.outputColorSpace),u.push(v.envMapMode),u.push(v.envMapPMREM),u.push(v.envMapMaxLod),u.push(v.envMapSize),u.push(v.mapUv),u.push(v.alphaMapUv),u.push(v.lightMapUv),u.push(v.aoMapUv),u.push(v.bumpMapUv),u.push(v.normalMapUv),u.push(v.displacementMapUv),u.push(v.emissiveMapUv),u.push(v.metalnessMapUv),u.push(v.roughnessMapUv),u.push(v.anisotropyMapUv),u.push(v.clearcoatMapUv),u.push(v.clearcoatNormalMapUv),u.push(v.clearcoatRoughnessMapUv),u.push(v.diffuseRoughnessMapUv),u.push(v.iridescenceMapUv),u.push(v.iridescenceThicknessMapUv),u.push(v.sheenColorMapUv),u.push(v.sheenRoughnessMapUv),u.push(v.specularMapUv),u.push(v.specularColorMapUv),u.push(v.specularIntensityMapUv),u.push(v.transmissionMapUv),u.push(v.thicknessMapUv),u.push(v.combine),u.push(v.fogExp2),u.push(v.sizeAttenuation),u.push(v.morphTargetsCount),u.push(v.numSunLights),u.push(v.numDirLights),u.push(v.numPointLights),u.push(v.numSpotLights),u.push(v.numSpotLightMaps),u.push(v.numHemiLights),u.push(v.numRectAreaLights),u.push(v.numSunLightShadows),u.push(v.numDirLightShadows),u.push(v.numPointLightShadows),u.push(v.numSpotLightShadows),u.push(v.numSpotLightShadowsWithMaps),u.push(v.numLightProbes),u.push(v.numLightProbeGrids),u.push(v.shadowMapType),u.push(v.toneMapping),u.push(v.numClippingPlanes),u.push(v.numClipIntersection),u.push(v.depthPacking)}function m(u,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.diffuseRoughness&&o.enable(25),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),u.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),u.push(o.mask)}function y(u){const v=d[u.type];let P;if(v){const w=Hn[v];P=Yh.clone(w.uniforms)}else P=u.uniforms;return P}function b(u,v){let P=f.get(v);return P!==void 0?++P.usedTimes:(P=new G0(i,v,u,s),l.push(P),f.set(v,P)),P}function A(u){if(--u.usedTimes===0){const v=l.indexOf(u);l[v]=l[l.length-1],l.pop(),f.delete(u.cacheKey),u.destroy()}}function S(u){a.remove(u)}function x(){a.dispose()}return{getParameters:_,getProgramCacheKey:M,getUniforms:y,acquireProgram:b,releaseProgram:A,releaseShaderCache:S,programs:l,dispose:x}}function Y0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function q0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Fc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Oc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function a(d,h,_,M,p,m){let y=i[t];return y===void 0?(y={id:d.id,object:d,geometry:h,material:_,materialVariant:o(d),groupOrder:M,renderOrder:d.renderOrder,z:p,group:m},i[t]=y):(y.id=d.id,y.object=d,y.geometry=h,y.material=_,y.materialVariant=o(d),y.groupOrder=M,y.renderOrder=d.renderOrder,y.z=p,y.group=m),t++,y}function c(d,h,_,M,p,m,y){y.reversedDepth===!0&&(p=-p);const b=a(d,h,_,M,p,m);_.transmission>0?n.push(b):_.transparent===!0?s.push(b):e.push(b)}function l(d,h,_,M,p,m){const y=a(d,h,_,M,p,m);_.transmission>0?n.unshift(y):_.transparent===!0?s.unshift(y):e.unshift(y)}function f(d,h){e.length>1&&e.sort(d||q0),n.length>1&&n.sort(h||Fc),s.length>1&&s.sort(h||Fc)}function g(){for(let d=t,h=i.length;d<h;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:f}}function Z0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Oc,i.set(n,[o])):s>=r.length?(o=new Oc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function K0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new B,color:new ne};break;case"SpotLight":e={position:new B,direction:new B,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function J0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let $0=0;function Q0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function j0(i){const t=new K0,e=J0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new pe,o=new pe;function a(l){let f=0,g=0,d=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let h=0,_=0,M=0,p=0,m=0,y=0,b=0,A=0,S=0,x=0,u=0,v=0,P=0,w=0;l.sort(Q0);for(let L=0,U=l.length;L<U;L++){const I=l[L],k=I.color,Y=I.intensity,Z=I.distance;let it=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ni?it=I.shadow.map.texture:it=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)f+=k.r*Y,g+=k.g*Y,d+=k.b*Y;else if(I.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(I.sh.coefficients[Q],Y);w++}else if(I.isSunLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const tt=I.shadow,ut=e.get(I);ut.shadowIntensity=tt.intensity,ut.shadowBias=tt.bias,ut.shadowNormalBias=tt.normalBias,ut.shadowRadius=tt.radius,ut.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[_]=ut,n.sunShadowMap[_]=it;const Mt=tt.getViewportCount();for(let At=0;At<Mt;At++)n.sunShadowMatrix[M+At]=tt.getMatrix(At),n.sunShadowCascade[M+At]=tt._cascadeData[At];M+=Mt,_++}n.sun[h]=Q,h++}else if(I.isDirectionalLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const tt=I.shadow,ut=e.get(I);ut.shadowIntensity=tt.intensity,ut.shadowBias=tt.bias,ut.shadowNormalBias=tt.normalBias,ut.shadowRadius=tt.radius,ut.shadowMapSize=tt.mapSize,n.directionalShadow[p]=ut,n.directionalShadowMap[p]=it,n.directionalShadowMatrix[p]=I.shadow.matrix,S++}n.directional[p]=Q,p++}else if(I.isSpotLight){const Q=t.get(I);Q.position.setFromMatrixPosition(I.matrixWorld),Q.color.copy(k).multiplyScalar(Y),Q.distance=Z,Q.coneCos=Math.cos(I.angle),Q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Q.decay=I.decay,n.spot[y]=Q;const tt=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,tt.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[y]=tt.matrix,I.castShadow){const ut=e.get(I);ut.shadowIntensity=tt.intensity,ut.shadowBias=tt.bias,ut.shadowNormalBias=tt.normalBias,ut.shadowRadius=tt.radius,ut.shadowMapSize=tt.mapSize,n.spotShadow[y]=ut,n.spotShadowMap[y]=it,u++}y++}else if(I.isRectAreaLight){const Q=t.get(I);Q.color.copy(k).multiplyScalar(Y),Q.halfWidth.set(I.width*.5,0,0),Q.halfHeight.set(0,I.height*.5,0),n.rectArea[b]=Q,b++}else if(I.isPointLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),Q.distance=I.distance,Q.decay=I.decay,I.castShadow){const tt=I.shadow,ut=e.get(I);ut.shadowIntensity=tt.intensity,ut.shadowBias=tt.bias,ut.shadowNormalBias=tt.normalBias,ut.shadowRadius=tt.radius,ut.shadowMapSize=tt.mapSize,ut.shadowCameraNear=tt.camera.near,ut.shadowCameraFar=tt.camera.far,n.pointShadow[m]=ut,n.pointShadowMap[m]=it,n.pointShadowMatrix[m]=I.shadow.matrix,x++}n.point[m]=Q,m++}else if(I.isHemisphereLight){const Q=t.get(I);Q.skyColor.copy(I.color).multiplyScalar(Y),Q.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[A]=Q,A++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=g,n.ambient[2]=d;const T=n.hash;(T.sunLength!==h||T.directionalLength!==p||T.pointLength!==m||T.spotLength!==y||T.rectAreaLength!==b||T.hemiLength!==A||T.numSunShadows!==_||T.numDirectionalShadows!==S||T.numPointShadows!==x||T.numSpotShadows!==u||T.numSpotMaps!==v||T.numLightProbes!==w)&&(n.sun.length=h,n.directional.length=p,n.spot.length=y,n.rectArea.length=b,n.point.length=m,n.hemi.length=A,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.pointShadowMatrix.length=x,n.spotShadow.length=u,n.spotShadowMap.length=u,n.spotLightMatrix.length=u+v-P,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=w,T.sunLength=h,T.directionalLength=p,T.pointLength=m,T.spotLength=y,T.rectAreaLength=b,T.hemiLength=A,T.numSunShadows=_,T.numDirectionalShadows=S,T.numPointShadows=x,T.numSpotShadows=u,T.numSpotMaps=v,T.numLightProbes=w,n.version=$0++)}function c(l,f){let g=0,d=0,h=0,_=0,M=0,p=0;const m=f.matrixWorldInverse;for(let y=0,b=l.length;y<b;y++){const A=l[y];if(A.isSunLight){const S=n.sun[g];S.direction.setFromMatrixPosition(A.matrixWorld),S.direction.transformDirection(m),g++}else if(A.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(A.isSpotLight){const S=n.spot[_];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),_++}else if(A.isRectAreaLight){const S=n.rectArea[M];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(A.width*.5,0,0),S.halfHeight.set(0,A.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),M++}else if(A.isPointLight){const S=n.point[h];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){const S=n.hemi[p];S.direction.setFromMatrixPosition(A.matrixWorld),S.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:n}}function Bc(i){const t=new j0(i),e=[],n=[],s=[];function r(g){f.camera=g,e.length=0,n.length=0,s.length=0}function o(g){g.isLightProbeGrid?s.push(g):e.push(g)}function a(g){n.push(g)}function c(){t.setup(e),s.sort((g,d)=>g.priority-d.priority||g.id-d.id)}function l(g){t.setupView(e,g)}const f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function tg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Bc(i),t.set(s,[a])):r>=o.length?(a=new Bc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const eg=`void main() {
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
}`,ig=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],sg=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],zc=new pe,Vs=new B,La=new B;function rg(i,t,e){let n=new ws;const s=new Nt,r=new Nt,o=new Oe,a=new Zh,c=new Kh,l={},f=e.maxTextureSize,g={[Ii]:_n,[_n]:Ii,[fn]:fn},d=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Nt},radius:{value:4}},vertexShader:eg,fragmentShader:ng}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const _=new $e;_.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Se(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qs;let m=this.type;this.render=function(x,u,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||x.length===0)return;this.type===qc&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qs);const P=i.getRenderTarget(),w=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Qi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=m!==this.type;U&&u.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=x.length;I<k;I++){const Y=x[I],Z=Y.shadow;if(Z===void 0){Kt("WebGLShadowMap:",Y,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const it=Z.getFrameExtents();s.multiply(it),r.copy(Z.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(r.x=Math.floor(f/it.x),s.x=r.x*it.x,Z.mapSize.x=r.x),s.y>f&&(r.y=Math.floor(f/it.y),s.y=r.y*it.y,Z.mapSize.y=r.y));const Q=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=Q,Z.map===null||U===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===vs){if(Y.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Wn(s.x,s.y,{format:Ni,type:Yn,minFilter:gn,magFilter:gn,generateMipmaps:!1}),Z.map.texture.name=Y.name+".shadowMap",Z.map.depthTexture=new es(s.x,s.y,Nn),Z.map.depthTexture.name=Y.name+".shadowMapDepth",Z.map.depthTexture.format=Mi,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=on,Z.map.depthTexture.magFilter=on}else Y.isPointLight?(Z.map=new na(s.x),Z.map.depthTexture=new yl(s.x,Xn)):(Z.map=new Wn(s.x,s.y),Z.map.depthTexture=new es(s.x,s.y,Xn)),Z.map.depthTexture.name=Y.name+".shadowMap",Z.map.depthTexture.format=Mi,this.type===qs?(Z.map.depthTexture.compareFunction=Q?cl:ll,Z.map.depthTexture.minFilter=gn,Z.map.depthTexture.magFilter=gn):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=on,Z.map.depthTexture.magFilter=on);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);const tt=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();Y.isPointLight!==!0&&Z.updateMatrices(Y,v);const ut=(Z.camera.layers.mask&4294967294)!==0?Z.camera.layers:v.layers;for(let Mt=0;Mt<tt;Mt++){const At=Z.getCamera(Mt);if(Y.isPointLight){const O=Z.camera,ct=Z.matrix,wt=Y.distance||O.far;wt!==O.far&&(O.far=wt,O.updateProjectionMatrix()),Vs.setFromMatrixPosition(Y.matrixWorld),O.position.copy(Vs),La.copy(O.position),La.add(ig[Mt]),O.up.copy(sg[Mt]),O.lookAt(La),O.updateMatrixWorld(),ct.makeTranslation(-Vs.x,-Vs.y,-Vs.z),zc.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(zc,O.coordinateSystem,O.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,Mt),i.clear();else{Mt===0&&(i.setRenderTarget(Z.map),i.clear());const O=Z.getViewport(Mt);o.set(r.x*O.x,r.y*O.y,r.x*O.z,r.y*O.w),L.viewport(o)}n=Z.getFrustum(Mt),A(u,v,At,Y,ut,this.type)}Z.isPointLightShadow!==!0&&this.type===vs&&y(Z,v),Z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(P,w,T)};function y(x,u){const v=t.update(M);d.defines.VSM_SAMPLES!==x.blurSamples&&(d.defines.VSM_SAMPLES=x.blurSamples,h.defines.VSM_SAMPLES=x.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),x.mapPass===null?x.mapPass=new Wn(s.x,s.y,{format:Ni,type:Yn}):(x.mapPass.width!==x.map.width||x.mapPass.height!==x.map.height)&&x.mapPass.setSize(x.map.width,x.map.height),d.uniforms.shadow_pass.value=x.map.depthTexture,d.uniforms.resolution.value.set(x.map.width,x.map.height),d.uniforms.radius.value=x.radius,i.setRenderTarget(x.mapPass),i.clear(),i.renderBufferDirect(u,null,v,d,M,null),h.uniforms.shadow_pass.value=x.mapPass.texture,h.uniforms.resolution.value.set(x.map.width,x.map.height),h.uniforms.radius.value=x.radius,i.setRenderTarget(x.map),i.clear(),i.renderBufferDirect(u,null,v,h,M,null)}function b(x,u,v,P){let w=null;const T=v.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(T!==void 0)w=T;else if(w=v.isPointLight===!0?c:a,i.localClippingEnabled&&u.clipShadows===!0&&Array.isArray(u.clippingPlanes)&&u.clippingPlanes.length!==0||u.displacementMap&&u.displacementScale!==0||u.alphaMap&&u.alphaTest>0||u.map&&u.alphaTest>0||u.alphaToCoverage===!0){const L=w.uuid,U=u.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let k=I[U];k===void 0&&(k=w.clone(),I[U]=k,u.addEventListener("dispose",S)),w=k}if(w.visible=u.visible,w.wireframe=u.wireframe,P===vs?w.side=u.shadowSide!==null?u.shadowSide:u.side:w.side=u.shadowSide!==null?u.shadowSide:g[u.side],w.alphaMap=u.alphaMap,w.alphaTest=u.alphaToCoverage===!0?.5:u.alphaTest,w.map=u.map,w.clipShadows=u.clipShadows,w.clippingPlanes=u.clippingPlanes,w.clipIntersection=u.clipIntersection,w.displacementMap=u.displacementMap,w.displacementScale=u.displacementScale,w.displacementBias=u.displacementBias,w.wireframeLinewidth=u.wireframeLinewidth,w.linewidth=u.linewidth,v.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const L=i.properties.get(w);L.light=v}return w}function A(x,u,v,P,w,T){if(x.visible===!1)return;if(x.layers.test(w)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&T===vs)&&(!x.frustumCulled||x.intersectsFrustum(n))){x.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,x.matrixWorld);const I=t.update(x),k=x.material;if(Array.isArray(k)){const Y=I.groups;for(let Z=0,it=Y.length;Z<it;Z++){const Q=Y[Z],tt=k[Q.materialIndex];if(tt&&tt.visible){const ut=b(x,tt,P,T);x.onBeforeShadow(i,x,u,v,I,ut,Q),i.renderBufferDirect(v,null,I,ut,x,Q),x.onAfterShadow(i,x,u,v,I,ut,Q)}}}else if(k.visible){const Y=b(x,k,P,T);x.onBeforeShadow(i,x,u,v,I,Y,null),i.renderBufferDirect(v,null,I,Y,x,null),x.onAfterShadow(i,x,u,v,I,Y,null)}}const U=x.children;for(let I=0,k=U.length;I<k;I++)A(U[I],u,v,P,w,T)}function S(x){x.target.removeEventListener("dispose",S);for(const v in l){const P=l[v],w=x.target.uuid;w in P&&(P[w].dispose(),delete P[w])}}}function og(i,t){function e(){let z=!1;const ot=new Oe;let nt=null;const dt=new Oe(0,0,0,0);return{setMask:function(ft){nt!==ft&&!z&&(i.colorMask(ft,ft,ft,ft),nt=ft)},setLocked:function(ft){z=ft},setClear:function(ft,pt,Ft,jt,mt){mt===!0&&(ft*=jt,pt*=jt,Ft*=jt),ot.set(ft,pt,Ft,jt),dt.equals(ot)===!1&&(i.clearColor(ft,pt,Ft,jt),dt.copy(ot))},reset:function(){z=!1,nt=null,dt.set(-1,0,0,0)}}}function n(){let z=!1,ot=!1,nt=null,dt=null,ft=null;return{setReversed:function(pt){if(ot!==pt){const Ft=t.get("EXT_clip_control");pt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT),ot=pt;const jt=ft;ft=null,this.setClear(jt)}},getReversed:function(){return ot},setTest:function(pt){pt?xt(i.DEPTH_TEST):Zt(i.DEPTH_TEST)},setMask:function(pt){nt!==pt&&!z&&(i.depthMask(pt),nt=pt)},setFunc:function(pt){if(ot&&(pt=Du[pt]),dt!==pt){switch(pt){case Zr:i.depthFunc(i.NEVER);break;case Kr:i.depthFunc(i.ALWAYS);break;case Jr:i.depthFunc(i.LESS);break;case bs:i.depthFunc(i.LEQUAL);break;case $r:i.depthFunc(i.EQUAL);break;case Qr:i.depthFunc(i.GEQUAL);break;case jr:i.depthFunc(i.GREATER);break;case to:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=pt}},setLocked:function(pt){z=pt},setClear:function(pt){ft!==pt&&(ft=pt,ot&&(pt=1-pt),i.clearDepth(pt))},reset:function(){z=!1,nt=null,dt=null,ft=null,ot=!1}}}function s(){let z=!1,ot=null,nt=null,dt=null,ft=null,pt=null,Ft=null,jt=null,mt=null;return{setTest:function(Gt){z||(Gt?xt(i.STENCIL_TEST):Zt(i.STENCIL_TEST))},setMask:function(Gt){ot!==Gt&&!z&&(i.stencilMask(Gt),ot=Gt)},setFunc:function(Gt,Yt,at){(nt!==Gt||dt!==Yt||ft!==at)&&(i.stencilFunc(Gt,Yt,at),nt=Gt,dt=Yt,ft=at)},setOp:function(Gt,Yt,at){(pt!==Gt||Ft!==Yt||jt!==at)&&(i.stencilOp(Gt,Yt,at),pt=Gt,Ft=Yt,jt=at)},setLocked:function(Gt){z=Gt},setClear:function(Gt){mt!==Gt&&(i.clearStencil(Gt),mt=Gt)},reset:function(){z=!1,ot=null,nt=null,dt=null,ft=null,pt=null,Ft=null,jt=null,mt=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let f={},g={},d={},h=new WeakMap,_=[],M=null,p=!1,m=null,y=null,b=null,A=null,S=null,x=null,u=null,v=new ne(0,0,0),P=0,w=!1,T=null,L=null,U=null,I=null,k=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,it=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=it>=1):Q.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=it>=2);let tt=null,ut={};const Mt=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),O=new Oe().fromArray(Mt),ct=new Oe().fromArray(At);function wt(z,ot,nt,dt){const ft=new Uint8Array(4),pt=i.createTexture();i.bindTexture(z,pt),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<nt;Ft++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(ot+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return pt}const Lt={};Lt[i.TEXTURE_2D]=wt(i.TEXTURE_2D,i.TEXTURE_2D,1),Lt[i.TEXTURE_CUBE_MAP]=wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Lt[i.TEXTURE_2D_ARRAY]=wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Lt[i.TEXTURE_3D]=wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),xt(i.DEPTH_TEST),o.setFunc(bs),Vt(!1),Wt(Na),xt(i.CULL_FACE),Rt(Qi);function xt(z){f[z]!==!0&&(i.enable(z),f[z]=!0)}function Zt(z){f[z]!==!1&&(i.disable(z),f[z]=!1)}function Le(z,ot){return d[z]!==ot?(i.bindFramebuffer(z,ot),d[z]=ot,z===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ot),z===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ht(z,ot){let nt=_,dt=!1;if(z){nt=h.get(ot),nt===void 0&&(nt=[],h.set(ot,nt));const ft=z.textures;if(nt.length!==ft.length||nt[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,Ft=ft.length;pt<Ft;pt++)nt[pt]=i.COLOR_ATTACHMENT0+pt;nt.length=ft.length,dt=!0}}else nt[0]!==i.BACK&&(nt[0]=i.BACK,dt=!0);dt&&i.drawBuffers(nt)}function me(z){return M!==z?(i.useProgram(z),M=z,!0):!1}const he={[Ki]:i.FUNC_ADD,[Kc]:i.FUNC_SUBTRACT,[Jc]:i.FUNC_REVERSE_SUBTRACT};he[$c]=i.MIN,he[Qc]=i.MAX;const re={[jc]:i.ZERO,[th]:i.ONE,[eh]:i.SRC_COLOR,[Ya]:i.SRC_ALPHA,[ah]:i.SRC_ALPHA_SATURATE,[rh]:i.DST_COLOR,[ih]:i.DST_ALPHA,[nh]:i.ONE_MINUS_SRC_COLOR,[qa]:i.ONE_MINUS_SRC_ALPHA,[oh]:i.ONE_MINUS_DST_COLOR,[sh]:i.ONE_MINUS_DST_ALPHA,[lh]:i.CONSTANT_COLOR,[ch]:i.ONE_MINUS_CONSTANT_COLOR,[hh]:i.CONSTANT_ALPHA,[uh]:i.ONE_MINUS_CONSTANT_ALPHA};function Rt(z,ot,nt,dt,ft,pt,Ft,jt,mt,Gt){if(z===Qi){p===!0&&(Zt(i.BLEND),p=!1);return}if(p===!1&&(xt(i.BLEND),p=!0),z!==Zc){if(z!==m||Gt!==w){if((y!==Ki||S!==Ki)&&(i.blendEquation(i.FUNC_ADD),y=Ki,S=Ki),Gt)switch(z){case Ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ir:i.blendFunc(i.ONE,i.ONE);break;case Ua:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Me("WebGLState: Invalid blending: ",z);break}else switch(z){case Ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ir:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ua:Me("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fa:Me("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Me("WebGLState: Invalid blending: ",z);break}b=null,A=null,x=null,u=null,v.set(0,0,0),P=0,m=z,w=Gt}return}ft=ft||ot,pt=pt||nt,Ft=Ft||dt,(ot!==y||ft!==S)&&(i.blendEquationSeparate(he[ot],he[ft]),y=ot,S=ft),(nt!==b||dt!==A||pt!==x||Ft!==u)&&(i.blendFuncSeparate(re[nt],re[dt],re[pt],re[Ft]),b=nt,A=dt,x=pt,u=Ft),(jt.equals(v)===!1||mt!==P)&&(i.blendColor(jt.r,jt.g,jt.b,mt),v.copy(jt),P=mt),m=z,w=!1}function Pt(z,ot){z.side===fn?Zt(i.CULL_FACE):xt(i.CULL_FACE);let nt=z.side===_n;ot&&(nt=!nt),Vt(nt),z.blending===Ss&&z.transparent===!1?Rt(Qi):Rt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const dt=z.stencilWrite;a.setTest(dt),dt&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),ve(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?xt(i.SAMPLE_ALPHA_TO_COVERAGE):Zt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(z){T!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),T=z)}function Wt(z){z!==Xc?(xt(i.CULL_FACE),z!==L&&(z===Na?i.cullFace(i.BACK):z===Yc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Zt(i.CULL_FACE),L=z}function ue(z){z!==U&&(Z&&i.lineWidth(z),U=z)}function ve(z,ot,nt){z?(xt(i.POLYGON_OFFSET_FILL),(I!==ot||k!==nt)&&(I=ot,k=nt,o.getReversed()&&(ot=-ot,nt=-nt),i.polygonOffset(ot,nt))):Zt(i.POLYGON_OFFSET_FILL)}function Fe(z){z?xt(i.SCISSOR_TEST):Zt(i.SCISSOR_TEST)}function Ie(z){z===void 0&&(z=i.TEXTURE0+Y-1),tt!==z&&(i.activeTexture(z),tt=z)}function Ve(z,ot,nt){nt===void 0&&(tt===null?nt=i.TEXTURE0+Y-1:nt=tt);let dt=ut[nt];dt===void 0&&(dt={type:void 0,texture:void 0},ut[nt]=dt),(dt.type!==z||dt.texture!==ot)&&(tt!==nt&&(i.activeTexture(nt),tt=nt),i.bindTexture(z,ot||Lt[z]),dt.type=z,dt.texture=ot)}function H(){const z=ut[tt];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function We(){try{i.compressedTexImage2D(...arguments)}catch(z){Me("WebGLState:",z)}}function ce(){try{i.compressedTexImage3D(...arguments)}catch(z){Me("WebGLState:",z)}}function ye(){try{i.texSubImage2D(...arguments)}catch(z){Me("WebGLState:",z)}}function bt(){try{i.texSubImage3D(...arguments)}catch(z){Me("WebGLState:",z)}}function Jt(){try{i.compressedTexSubImage2D(...arguments)}catch(z){Me("WebGLState:",z)}}function Xt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){Me("WebGLState:",z)}}function $t(){try{i.texStorage2D(...arguments)}catch(z){Me("WebGLState:",z)}}function N(){try{i.texStorage3D(...arguments)}catch(z){Me("WebGLState:",z)}}function R(){try{i.texImage2D(...arguments)}catch(z){Me("WebGLState:",z)}}function q(){try{i.texImage3D(...arguments)}catch(z){Me("WebGLState:",z)}}function st(z){return g[z]!==void 0?g[z]:i.getParameter(z)}function ht(z,ot){g[z]!==ot&&(i.pixelStorei(z,ot),g[z]=ot)}function vt(z){O.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),O.copy(z))}function gt(z){ct.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),ct.copy(z))}function rt(z,ot){let nt=l.get(ot);nt===void 0&&(nt=new WeakMap,l.set(ot,nt));let dt=nt.get(z);dt===void 0&&(dt=i.getUniformBlockIndex(ot,z.name),i.uniformBlockBinding(ot,dt,dt),nt.set(z,dt))}function lt(z,ot,nt){const ft=l.get(ot).get(z);c[ft]!==nt&&(i.bindBufferBase(i.UNIFORM_BUFFER,ft,nt),c[ft]=nt)}function St(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),f={},g={},tt=null,ut={},d={},c={},h=new WeakMap,_=[],M=null,p=!1,m=null,y=null,b=null,A=null,S=null,x=null,u=null,v=new ne(0,0,0),P=0,w=!1,T=null,L=null,U=null,I=null,k=null,O.set(0,0,i.canvas.width,i.canvas.height),ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:xt,disable:Zt,bindFramebuffer:Le,drawBuffers:Ht,useProgram:me,setBlending:Rt,setMaterial:Pt,setFlipSided:Vt,setCullFace:Wt,setLineWidth:ue,setPolygonOffset:ve,setScissorTest:Fe,activeTexture:Ie,bindTexture:Ve,unbindTexture:H,compressedTexImage2D:We,compressedTexImage3D:ce,texImage2D:R,texImage3D:q,pixelStorei:ht,getParameter:st,updateUBOMapping:rt,uniformBlockBinding:lt,texStorage2D:$t,texStorage3D:N,texSubImage2D:ye,texSubImage3D:bt,compressedTexSubImage2D:Jt,compressedTexSubImage3D:Xt,scissor:vt,viewport:gt,reset:St}}function ag(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Nt,f=new WeakMap,g=new Set;let d;const h=new WeakMap,_=new Set,M=new FinalizationRegistry(N=>_.delete(N));let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(N,R){return p?new OffscreenCanvas(N,R):Uo("canvas")}function y(N,R,q){let st=1;const ht=$t(N);if((ht.width>q||ht.height>q)&&(st=q/Math.max(ht.width,ht.height)),st<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const vt=Math.floor(st*ht.width),gt=Math.floor(st*ht.height);d===void 0&&(d=m(vt,gt));const rt=R?m(vt,gt):d;return rt.width=vt,rt.height=gt,rt.getContext("2d").drawImage(N,0,0,vt,gt),Kt("WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+vt+"x"+gt+")."),rt}else return"data"in N&&Kt("WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),N;return N}function b(N){return N.generateMipmaps}function A(N){i.generateMipmap(N)}function S(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(N,R,q,st,ht,vt=!1){if(N!==null){if(i[N]!==void 0)return i[N];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let gt;st&&(gt=t.get("EXT_texture_norm16"),gt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=R;if(R===i.RED&&(q===i.FLOAT&&(rt=i.R32F),q===i.HALF_FLOAT&&(rt=i.R16F),q===i.UNSIGNED_BYTE&&(rt=i.R8),q===i.UNSIGNED_SHORT&&gt&&(rt=gt.R16_EXT),q===i.SHORT&&gt&&(rt=gt.R16_SNORM_EXT)),R===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.R8UI),q===i.UNSIGNED_SHORT&&(rt=i.R16UI),q===i.UNSIGNED_INT&&(rt=i.R32UI),q===i.BYTE&&(rt=i.R8I),q===i.SHORT&&(rt=i.R16I),q===i.INT&&(rt=i.R32I)),R===i.RG&&(q===i.FLOAT&&(rt=i.RG32F),q===i.HALF_FLOAT&&(rt=i.RG16F),q===i.UNSIGNED_BYTE&&(rt=i.RG8),q===i.UNSIGNED_SHORT&&gt&&(rt=gt.RG16_EXT),q===i.SHORT&&gt&&(rt=gt.RG16_SNORM_EXT)),R===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RG8UI),q===i.UNSIGNED_SHORT&&(rt=i.RG16UI),q===i.UNSIGNED_INT&&(rt=i.RG32UI),q===i.BYTE&&(rt=i.RG8I),q===i.SHORT&&(rt=i.RG16I),q===i.INT&&(rt=i.RG32I)),R===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),q===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),q===i.UNSIGNED_INT&&(rt=i.RGB32UI),q===i.BYTE&&(rt=i.RGB8I),q===i.SHORT&&(rt=i.RGB16I),q===i.INT&&(rt=i.RGB32I)),R===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),q===i.UNSIGNED_INT&&(rt=i.RGBA32UI),q===i.BYTE&&(rt=i.RGBA8I),q===i.SHORT&&(rt=i.RGBA16I),q===i.INT&&(rt=i.RGBA32I)),R===i.RGB&&(q===i.UNSIGNED_SHORT&&gt&&(rt=gt.RGB16_EXT),q===i.SHORT&&gt&&(rt=gt.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),R===i.RGBA){const lt=vt?ar:de.getTransfer(ht);q===i.FLOAT&&(rt=i.RGBA32F),q===i.HALF_FLOAT&&(rt=i.RGBA16F),q===i.UNSIGNED_BYTE&&(rt=lt===we?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&gt&&(rt=gt.RGBA16_EXT),q===i.SHORT&&gt&&(rt=gt.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function u(N,R){let q;return N?R===null||R===Xn||R===ts?q=i.DEPTH24_STENCIL8:R===Nn?q=i.DEPTH32F_STENCIL8:R===Ts&&(q=i.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Xn||R===ts?q=i.DEPTH_COMPONENT24:R===Nn?q=i.DEPTH_COMPONENT32F:R===Ts&&(q=i.DEPTH_COMPONENT16),q}function v(N,R){return b(N)===!0||N.isFramebufferTexture&&N.minFilter!==on&&N.minFilter!==gn?Math.log2(Math.max(R.width,R.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?R.mipmaps.length:1}function P(N){const R=new WeakRef(N);n.get(N).__ref=R,_.add(R),M.register(N,R,R)}function w(N){const R=n.get(N).__ref;R!==void 0&&(_.delete(R),M.unregister(R))}function T(N){U(N.target)}function L(N){I(N.target)}function U(N){N.removeEventListener("dispose",T),w(N),Y(N),N.isVideoTexture&&f.delete(N),N.isHTMLTexture&&g.delete(N)}function I(N){N.removeEventListener("dispose",L),w(N),it(N)}function k(){for(const N of _){const R=N.deref();R!==void 0&&(R.isRenderTarget===!0?I(R):U(R))}_.clear(),g.clear()}function Y(N){const R=n.get(N);if(R.__webglInit===void 0)return;const q=N.source,st=h.get(q);if(st){const ht=st[R.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&Z(N),Object.keys(st).length===0&&h.delete(q)}n.remove(N)}function Z(N){const R=n.get(N);i.deleteTexture(R.__webglTexture);const q=N.source,st=h.get(q);delete st[R.__cacheKey],o.memory.textures--}function it(N){const R=n.get(N);R.__depthDisposeCallback&&R.__depthDisposeCallback();const q=N.depthTexture;if(q&&q.renderTarget===N&&U(q),N.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray(R.__webglFramebuffer[ht]))for(let vt=0;vt<R.__webglFramebuffer[ht].length;vt++)i.deleteFramebuffer(R.__webglFramebuffer[ht][vt]);else i.deleteFramebuffer(R.__webglFramebuffer[ht]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[ht])}else{if(Array.isArray(R.__webglFramebuffer))for(let ht=0;ht<R.__webglFramebuffer.length;ht++)i.deleteFramebuffer(R.__webglFramebuffer[ht]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let ht=0;ht<R.__webglColorRenderbuffer.length;ht++)R.__webglColorRenderbuffer[ht]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[ht]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const st=N.textures;for(let ht=0,vt=st.length;ht<vt;ht++){const gt=n.get(st[ht]);gt.__webglTexture&&(i.deleteTexture(gt.__webglTexture),o.memory.textures--),n.remove(st[ht])}n.remove(N)}let Q=0;function tt(){Q=0}function ut(){return Q}function Mt(N){Q=N}function At(){const N=Q;return N>=s.maxTextures&&Kt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),Q+=1,N}function O(N){const R=[];return R.push(N.wrapS),R.push(N.wrapT),R.push(N.wrapR||0),R.push(N.magFilter),R.push(N.minFilter),R.push(N.anisotropy),R.push(N.internalFormat),R.push(N.format),R.push(N.type),R.push(N.generateMipmaps),R.push(N.mipmapsAutoUpdate),R.push(N.premultiplyAlpha),R.push(N.flipY),R.push(N.unpackAlignment),R.push(N.colorSpace),R.join()}function ct(N,R){const q=n.get(N);if(N.isVideoTexture&&Jt(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&q.__version!==N.version){const st=N.image;if(st===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{Pt(q,N,R);return}}else N.isExternalTexture&&(q.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+R)}function wt(N,R){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){Pt(q,N,R);return}else N.isExternalTexture&&(q.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+R)}function Lt(N,R){const q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&q.__version!==N.version){Pt(q,N,R);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+R)}function xt(N,R){const q=n.get(N);if(N.version>0&&q.__version!==N.version){Vt(q,N,R);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+R)}const Zt={[eo]:i.REPEAT,[si]:i.CLAMP_TO_EDGE,[no]:i.MIRRORED_REPEAT},Le={[on]:i.NEAREST,[ph]:i.NEAREST_MIPMAP_NEAREST,[Xs]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Wr]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},Ht={[xh]:i.NEVER,[hl]:i.ALWAYS,[vh]:i.LESS,[ll]:i.LEQUAL,[Mh]:i.EQUAL,[cl]:i.GEQUAL,[Sh]:i.GREATER,[yh]:i.NOTEQUAL};function me(N,R){if(R.type===Nn&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===gn||R.magFilter===Wr||R.magFilter===Xs||R.magFilter===gi||R.minFilter===gn||R.minFilter===Wr||R.minFilter===Xs||R.minFilter===gi)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Zt[R.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Zt[R.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Zt[R.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,Le[R.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,Le[R.minFilter]),R.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Ht[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===on||R.minFilter!==Xs&&R.minFilter!==gi||R.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function he(N,R){let q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,R.addEventListener("dispose",T),P(R));const st=R.source;let ht=h.get(st);ht===void 0&&(ht={},h.set(st,ht));const vt=O(R);if(vt!==N.__cacheKey){ht[vt]===void 0&&(ht[vt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ht[vt].usedTimes++;const gt=ht[N.__cacheKey];gt!==void 0&&(ht[N.__cacheKey].usedTimes--,gt.usedTimes===0&&Z(R)),N.__cacheKey=vt,N.__webglTexture=ht[vt].texture}return q}function re(N,R,q){return Math.floor(Math.floor(N/q)/R)}function Rt(N,R,q,st){const vt=N.updateRanges;if(vt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,R.width,R.height,q,st,R.data);else{vt.sort((z,ot)=>z.start-ot.start);let gt=0;for(let z=1;z<vt.length;z++){const ot=vt[gt],nt=vt[z],dt=ot.start+ot.count,ft=re(nt.start,R.width,4),pt=re(ot.start,R.width,4);nt.start<=dt+1&&ft===pt&&re(nt.start+nt.count-1,R.width,4)===ft?ot.count=Math.max(ot.count,nt.start+nt.count-ot.start):(++gt,vt[gt]=nt)}vt.length=gt+1;const rt=e.getParameter(i.UNPACK_ROW_LENGTH),lt=e.getParameter(i.UNPACK_SKIP_PIXELS),St=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,R.width);for(let z=0,ot=vt.length;z<ot;z++){const nt=vt[z],dt=Math.floor(nt.start/4),ft=Math.ceil(nt.count/4),pt=dt%R.width,Ft=Math.floor(dt/R.width),jt=ft,mt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,pt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ft),e.texSubImage2D(i.TEXTURE_2D,0,pt,Ft,jt,mt,q,st,R.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,rt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,lt),e.pixelStorei(i.UNPACK_SKIP_ROWS,St)}}function Pt(N,R,q){let st=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(st=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(st=i.TEXTURE_3D);const ht=he(N,R),vt=R.source;e.bindTexture(st,N.__webglTexture,i.TEXTURE0+q);const gt=n.get(vt);if(vt.version!==gt.__version||ht===!0){if(e.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&R.image instanceof ImageBitmap)===!1){const mt=de.getPrimaries(de.workingColorSpace),Gt=R.colorSpace===mi?null:de.getPrimaries(R.colorSpace),Yt=R.colorSpace===mi||mt===Gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt)}e.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment);let lt=y(R.image,!1,s.maxTextureSize);lt=Xt(R,lt);const St=r.convert(R.format,R.colorSpace),z=r.convert(R.type);let ot=x(R.internalFormat,St,z,R.normalized,R.colorSpace,R.isVideoTexture);me(st,R);let nt;const dt=R.mipmaps,ft=R.isVideoTexture!==!0,pt=gt.__version===void 0||ht===!0,Ft=vt.dataReady,jt=v(R,lt);if(R.isDepthTexture)ot=u(R.format===_i,R.type),pt&&(ft?e.texStorage2D(i.TEXTURE_2D,1,ot,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,ot,lt.width,lt.height,0,St,z,null));else if(R.isDataTexture)if(dt.length>0){ft&&pt&&e.texStorage2D(i.TEXTURE_2D,jt,ot,dt[0].width,dt[0].height);for(let mt=0,Gt=dt.length;mt<Gt;mt++)nt=dt[mt],ft?Ft&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,z,nt.data):e.texImage2D(i.TEXTURE_2D,mt,ot,nt.width,nt.height,0,St,z,nt.data);R.generateMipmaps=!1}else ft?(pt&&e.texStorage2D(i.TEXTURE_2D,jt,ot,lt.width,lt.height),Ft&&Rt(R,lt,St,z)):e.texImage2D(i.TEXTURE_2D,0,ot,lt.width,lt.height,0,St,z,lt.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){ft&&pt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,ot,dt[0].width,dt[0].height,lt.depth);for(let mt=0,Gt=dt.length;mt<Gt;mt++)if(nt=dt[mt],R.format!==Vn)if(St!==null)if(ft){if(Ft)if(R.layerUpdates.size>0){const Yt=xc(nt.width,nt.height,R.format,R.type);for(const at of R.layerUpdates){const ie=nt.data.subarray(at*Yt/nt.data.BYTES_PER_ELEMENT,(at+1)*Yt/nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,at,nt.width,nt.height,1,St,ie)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,nt.width,nt.height,lt.depth,St,nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,mt,ot,nt.width,nt.height,lt.depth,0,nt.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Ft&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,mt,0,0,0,nt.width,nt.height,lt.depth,St,z,nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,mt,ot,nt.width,nt.height,lt.depth,0,St,z,nt.data);R.layerUpdates.size>0&&R.clearLayerUpdates()}else{ft&&pt&&e.texStorage2D(i.TEXTURE_2D,jt,ot,dt[0].width,dt[0].height);for(let mt=0,Gt=dt.length;mt<Gt;mt++)nt=dt[mt],R.format!==Vn?St!==null?ft?Ft&&e.compressedTexSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,nt.data):e.compressedTexImage2D(i.TEXTURE_2D,mt,ot,nt.width,nt.height,0,nt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Ft&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,nt.width,nt.height,St,z,nt.data):e.texImage2D(i.TEXTURE_2D,mt,ot,nt.width,nt.height,0,St,z,nt.data)}else if(R.isDataArrayTexture)if(ft){if(pt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,jt,ot,lt.width,lt.height,lt.depth),Ft)if(R.layerUpdates.size>0){const mt=xc(lt.width,lt.height,R.format,R.type);for(const Gt of R.layerUpdates){const Yt=lt.data.subarray(Gt*mt/lt.data.BYTES_PER_ELEMENT,(Gt+1)*mt/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Gt,lt.width,lt.height,1,St,z,Yt)}R.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,St,z,lt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ot,lt.width,lt.height,lt.depth,0,St,z,lt.data);else if(R.isData3DTexture)ft?(pt&&e.texStorage3D(i.TEXTURE_3D,jt,ot,lt.width,lt.height,lt.depth),Ft&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,St,z,lt.data)):e.texImage3D(i.TEXTURE_3D,0,ot,lt.width,lt.height,lt.depth,0,St,z,lt.data);else if(R.isFramebufferTexture){if(pt)if(ft)e.texStorage2D(i.TEXTURE_2D,jt,ot,lt.width,lt.height);else{let mt=lt.width,Gt=lt.height;for(let Yt=0;Yt<jt;Yt++)e.texImage2D(i.TEXTURE_2D,Yt,ot,mt,Gt,0,St,z,null),mt>>=1,Gt>>=1}}else if(R.isHTMLTexture){if("texElementImage2D"in i){const mt=i.canvas;if(mt.hasAttribute("layoutsubtree")||mt.setAttribute("layoutsubtree","true"),lt.parentNode!==mt){mt.appendChild(lt),g.add(R),mt.onpaint=Gt=>{const Yt=Gt.changedElements;for(const at of g)Yt.includes(at.image)&&(at.needsUpdate=!0)},mt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,lt);else{const Yt=i.RGBA,at=i.RGBA,ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Yt,at,ie,lt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(dt.length>0){if(ft&&pt){const mt=$t(dt[0]);e.texStorage2D(i.TEXTURE_2D,jt,ot,mt.width,mt.height)}for(let mt=0,Gt=dt.length;mt<Gt;mt++)nt=dt[mt],ft?Ft&&e.texSubImage2D(i.TEXTURE_2D,mt,0,0,St,z,nt):e.texImage2D(i.TEXTURE_2D,mt,ot,St,z,nt);R.generateMipmaps=!1}else if(ft){if(pt){const mt=$t(lt);e.texStorage2D(i.TEXTURE_2D,jt,ot,mt.width,mt.height)}Ft&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,z,lt)}else e.texImage2D(i.TEXTURE_2D,0,ot,St,z,lt);b(R)&&R.mipmapsAutoUpdate===!0&&A(st),gt.__version=vt.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function Vt(N,R,q){if(R.image.length!==6)return;const st=he(N,R),ht=R.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+q);const vt=n.get(ht);if(ht.version!==vt.__version||st===!0){e.activeTexture(i.TEXTURE0+q);const gt=de.getPrimaries(de.workingColorSpace),rt=R.colorSpace===mi?null:de.getPrimaries(R.colorSpace),lt=R.colorSpace===mi||gt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);const St=R.isCompressedTexture||R.image[0].isCompressedTexture,z=R.image[0]&&R.image[0].isDataTexture,ot=[];for(let at=0;at<6;at++)!St&&!z?ot[at]=y(R.image[at],!0,s.maxCubemapSize):ot[at]=z?R.image[at].image:R.image[at],ot[at]=Xt(R,ot[at]);const nt=ot[0],dt=r.convert(R.format,R.colorSpace),ft=r.convert(R.type);let pt=x(R.internalFormat,dt,ft,R.normalized,R.colorSpace);const Ft=R.isVideoTexture!==!0,jt=vt.__version===void 0||st===!0,mt=ht.dataReady;let Gt=v(R,nt);me(i.TEXTURE_CUBE_MAP,R);let Yt;if(R.isDepthTexture){if(pt=u(R.format===_i,R.type),jt)if(Ft)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,pt,nt.width,nt.height);else for(let at=0;at<6;at++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,pt,nt.width,nt.height,0,dt,ft,null)}else if(St){Ft&&jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,pt,nt.width,nt.height);for(let at=0;at<6;at++){Yt=ot[at].mipmaps;for(let ie=0;ie<Yt.length;ie++){const kt=Yt[ie];R.format!==Vn?dt!==null?Ft?mt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie,0,0,kt.width,kt.height,dt,kt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie,pt,kt.width,kt.height,0,kt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie,0,0,kt.width,kt.height,dt,ft,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie,pt,kt.width,kt.height,0,dt,ft,kt.data)}}}else{if(Yt=R.mipmaps,Ft&&jt){Yt.length>0&&Gt++;const at=$t(ot[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Gt,pt,at.width,at.height)}for(let at=0;at<6;at++)if(z){Ft?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,ot[at].width,ot[at].height,dt,ft,ot[at].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,pt,ot[at].width,ot[at].height,0,dt,ft,ot[at].data);for(let ie=0;ie<Yt.length;ie++){const tn=Yt[ie].image[at].image;Ft?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie+1,0,0,tn.width,tn.height,dt,ft,tn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie+1,pt,tn.width,tn.height,0,dt,ft,tn.data)}}else{Ft?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,dt,ft,ot[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,pt,dt,ft,ot[at]);for(let ie=0;ie<Yt.length;ie++){const kt=Yt[ie];Ft?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie+1,0,0,dt,ft,kt.image[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ie+1,pt,dt,ft,kt.image[at])}}}b(R)&&R.mipmapsAutoUpdate===!0&&A(i.TEXTURE_CUBE_MAP),vt.__version=ht.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function Wt(N,R,q,st,ht,vt){const gt=r.convert(q.format,q.colorSpace),rt=r.convert(q.type),lt=x(q.internalFormat,gt,rt,q.normalized,q.colorSpace),St=n.get(R),z=n.get(q);if(z.__renderTarget=R,!St.__hasExternalTextures){const ot=Math.max(1,R.width>>vt),nt=Math.max(1,R.height>>vt);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,vt,lt,ot,nt,R.depth,0,gt,rt,null):e.texImage2D(ht,vt,lt,ot,nt,0,gt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),bt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,st,ht,z.__webglTexture,0,ye(R)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,st,ht,z.__webglTexture,vt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(N,R,q){if(i.bindRenderbuffer(i.RENDERBUFFER,N),R.depthBuffer){const st=R.depthTexture,ht=st&&st.isDepthTexture?st.type:null,vt=u(R.stencilBuffer,ht),gt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;bt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(R),vt,R.width,R.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(R),vt,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,vt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,N)}else{const st=R.textures;for(let ht=0;ht<st.length;ht++){const vt=st[ht],gt=r.convert(vt.format,vt.colorSpace),rt=r.convert(vt.type),lt=x(vt.internalFormat,gt,rt,vt.normalized,vt.colorSpace);bt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(R),lt,R.width,R.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(R),lt,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,lt,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(N,R,q){const st=R.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ht=n.get(R.depthTexture);ht.__renderTarget=R;const vt=st?R.depthTexture.image[0]:R.depthTexture.image;(!ht.__webglTexture||vt.width!==R.width||vt.height!==R.height)&&(vt.width=R.width,vt.height=R.height,R.depthTexture.needsUpdate=!0),st?xt(R.depthTexture,0):ct(R.depthTexture,0);const gt=ht.__webglTexture,rt=ye(R),lt=st?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,St=R.depthTexture.format===_i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(R.depthTexture.format===Mi)bt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,lt,gt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,St,lt,gt,0);else if(R.depthTexture.format===_i)bt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,St,lt,gt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,St,lt,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Fe(N){const R=n.get(N),q=N.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==N.depthTexture){const st=N.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),st){const ht=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,st.removeEventListener("dispose",ht)};st.addEventListener("dispose",ht),R.__depthDisposeCallback=ht}R.__boundDepthTexture=st}if(N.depthTexture&&!R.__autoAllocateDepthBuffer)if(q)for(let st=0;st<6;st++)ve(R.__webglFramebuffer[st],N,st);else N.texture.mipmaps.length>0?ve(R.__webglFramebuffer[0],N,0):ve(R.__webglFramebuffer,N,0);else if(q){R.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[st]),R.__webglDepthbuffer[st]===void 0)R.__webglDepthbuffer[st]=i.createRenderbuffer(),ue(R.__webglDepthbuffer[st],N,!1);else{const ht=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=R.__webglDepthbuffer[st];i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,vt)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),ue(R.__webglDepthbuffer,N,!1);else{const ht=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,vt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(N,R,q){const st=n.get(N);R!==void 0&&Wt(st.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&Fe(N)}function Ve(N){const R=N.texture,q=n.get(N),st=n.get(R);N.addEventListener("dispose",L),P(N);const ht=N.textures,vt=N.isWebGLCubeRenderTarget===!0,gt=ht.length>1;if(gt||(st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture()),st.__version=R.version,o.memory.textures++),vt){q.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(R.mipmaps.length>0){q.__webglFramebuffer[rt]=[];for(let lt=0;lt<R.mipmaps.length;lt++)q.__webglFramebuffer[rt][lt]=i.createFramebuffer()}else q.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(R.mipmaps.length>0){q.__webglFramebuffer=[];for(let rt=0;rt<R.mipmaps.length;rt++)q.__webglFramebuffer[rt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(gt)for(let rt=0,lt=ht.length;rt<lt;rt++){const St=n.get(ht[rt]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&bt(N)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let rt=0;rt<ht.length;rt++){const lt=ht[rt];q.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[rt]);const St=r.convert(lt.format,lt.colorSpace),z=r.convert(lt.type),ot=x(lt.internalFormat,St,z,lt.normalized,lt.colorSpace,N.isXRRenderTarget===!0),nt=ye(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,ot,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,q.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(q.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(vt){e.bindTexture(i.TEXTURE_CUBE_MAP,st.__webglTexture),me(i.TEXTURE_CUBE_MAP,R);for(let rt=0;rt<6;rt++)if(R.mipmaps.length>0)for(let lt=0;lt<R.mipmaps.length;lt++)Wt(q.__webglFramebuffer[rt][lt],N,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,lt);else Wt(q.__webglFramebuffer[rt],N,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);b(R)?A(i.TEXTURE_CUBE_MAP):R.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,R.mipmaps.length-1),e.unbindTexture()}else if(gt){for(let rt=0,lt=ht.length;rt<lt;rt++){const St=ht[rt],z=n.get(St);let ot=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ot=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,z.__webglTexture),me(ot,St),Wt(q.__webglFramebuffer,N,St,i.COLOR_ATTACHMENT0+rt,ot,0),b(St)&&A(ot)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(rt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,st.__webglTexture),me(rt,R),R.mipmaps.length>0)for(let lt=0;lt<R.mipmaps.length;lt++)Wt(q.__webglFramebuffer[lt],N,R,i.COLOR_ATTACHMENT0,rt,lt);else Wt(q.__webglFramebuffer,N,R,i.COLOR_ATTACHMENT0,rt,0);b(R)?A(rt):R.mipmaps.length>0&&i.texParameteri(rt,i.TEXTURE_MAX_LEVEL,R.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&Fe(N)}function H(N){const R=N.textures;for(let q=0,st=R.length;q<st;q++){const ht=R[q];if(b(ht)&&ht.mipmapsAutoUpdate===!0){const vt=S(N),gt=n.get(ht).__webglTexture;e.bindTexture(vt,gt),A(vt),e.unbindTexture()}}}const We=[];function ce(N){if(N.samples>0){if(bt(N)===!1){const R=N.textures,q=N.width,st=N.height;let ht=i.COLOR_BUFFER_BIT;const vt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(N),rt=R.length>1;if(rt)for(let St=0;St<R.length;St++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let St=0;St<R.length;St++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[St]);const z=n.get(R[St]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,z,0)}i.blitFramebuffer(0,0,q,st,0,0,q,st,ht,i.NEAREST),c===!0&&(We.length=0,We.push(i.COLOR_ATTACHMENT0+St),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&We.push(vt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,We))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let St=0;St<R.length;St++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,gt.__webglColorRenderbuffer[St]);const z=n.get(R[St]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,z,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const R=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function ye(N){return Math.min(s.maxSamples,N.samples)}function bt(N){const R=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Jt(N){const R=o.render.frame;f.get(N)!==R&&(f.set(N,R),N.update())}function Xt(N,R){const q=N.colorSpace,st=N.format,ht=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||q!==or&&q!==mi&&(de.getTransfer(q)===we?(st!==Vn||ht!==Sn)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Me("WebGLTextures: Unsupported texture color space:",q)),R}function $t(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=At,this.resetTextureUnits=tt,this.getTextureUnits=ut,this.setTextureUnits=Mt,this.setTexture2D=ct,this.setTexture2DArray=wt,this.setTexture3D=Lt,this.setTextureCube=xt,this.rebindTextures=Ie,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Wt,this.useMultisampledRTT=bt,this.dispose=k}function uu(i,t){function e(n,s=mi){let r;const o=de.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===Wo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nl)return i.BYTE;if(n===il)return i.SHORT;if(n===Ts)return i.UNSIGNED_SHORT;if(n===Vo)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===Yn)return i.HALF_FLOAT;if(n===ol)return i.ALPHA;if(n===al)return i.RGB;if(n===Vn)return i.RGBA;if(n===Mi)return i.DEPTH_COMPONENT;if(n===_i)return i.DEPTH_STENCIL;if(n===Yo)return i.RED;if(n===qo)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===Zo)return i.RG_INTEGER;if(n===Ko)return i.RGBA_INTEGER;if(n===Zs||n===Ks||n===Js||n===$s)if(o===we)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===io||n===so||n===ro||n===oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ao||n===lo||n===co||n===ho||n===uo||n===sr||n===fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ao||n===lo)return o===we?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===co)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ho)return r.COMPRESSED_R11_EAC;if(n===uo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===sr)return r.COMPRESSED_RG11_EAC;if(n===fo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===Mo||n===So||n===yo||n===bo||n===Eo||n===To||n===Ao||n===wo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===po)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===go)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_o)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===So)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Eo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===To)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ao)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wo)return o===we?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ro||n===Co||n===Po)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ro)return o===we?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Po)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Do||n===Lo||n===rr||n===Io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Do)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const lg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cg=`
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

}`;class hg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new bl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ui({vertexShader:lg,fragmentShader:cg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new Si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ug extends yi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,f=null,g=null,d=null,h=null,_=null;const M=typeof XRWebGLBinding<"u",p=new hg,m={},y=e.getContextAttributes();let b=null,A=null;const S=[],x=[],u=new Nt;let v=null,P=null;const w=new Ln;w.viewport=new Oe;const T=new Ln;T.viewport=new Oe;const L=[w,T],U=new Qh;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let ct=S[O];return ct===void 0&&(ct=new Yr,S[O]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(O){let ct=S[O];return ct===void 0&&(ct=new Yr,S[O]=ct),ct.getGripSpace()},this.getHand=function(O){let ct=S[O];return ct===void 0&&(ct=new Yr,S[O]=ct),ct.getHandSpace()};function Y(O){const ct=x.indexOf(O.inputSource);if(ct===-1)return;const wt=S[ct];wt!==void 0&&(wt.update(O.inputSource,O.frame,l||o),wt.dispatchEvent({type:O.type,data:O.inputSource}))}function Z(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",it);for(let O=0;O<S.length;O++){const ct=x[O];ct!==null&&(x[O]=null,S[O].disconnect(ct))}I=null,k=null,p.reset();for(const O in m)delete m[O];if(t.setRenderTarget(b),h=null,d=null,g=null,s=null,A=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(u.width,u.height,!1),P!==null){const O=P.camera;O.fov=P.fov,O.zoom=P.zoom,O.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(O){l=O},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return g===null&&M&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",it),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(u),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Lt=null,xt=null;y.depth&&(xt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=y.stencil?_i:Mi,Lt=y.stencil?ts:Xn);const Zt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};g=this.getBinding(),d=g.createProjectionLayer(Zt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),A=new Wn(d.textureWidth,d.textureHeight,{format:Vn,type:Sn,depthTexture:new es(d.textureWidth,d.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const wt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),A=new Wn(h.framebufferWidth,h.framebufferHeight,{format:Vn,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),At.setContext(s),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function it(O){for(let ct=0;ct<O.removed.length;ct++){const wt=O.removed[ct],Lt=x.indexOf(wt);Lt>=0&&(x[Lt]=null,S[Lt].disconnect(wt))}for(let ct=0;ct<O.added.length;ct++){const wt=O.added[ct];let Lt=x.indexOf(wt);if(Lt===-1){for(let Zt=0;Zt<S.length;Zt++)if(Zt>=x.length){x.push(wt),Lt=Zt;break}else if(x[Zt]===null){x[Zt]=wt,Lt=Zt;break}if(Lt===-1)break}const xt=S[Lt];xt&&xt.connect(wt)}}function Q(O,ct){ct===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(ct.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let ct=O.near,wt=O.far;p.texture!==null&&(p.depthNear>0&&(ct=p.depthNear),p.depthFar>0&&(wt=p.depthFar)),U.near=T.near=w.near=ct,U.far=T.far=w.far=wt,(I!==U.near||k!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,k=U.far),U.layers.mask=O.layers.mask|6,w.layers.mask=U.layers.mask&-5,T.layers.mask=U.layers.mask&-3;const Lt=O.parent,xt=U.cameras;Q(U,Lt);for(let Zt=0;Zt<xt.length;Zt++)Q(xt[Zt],Lt);U.projectionMatrix.copy(w.projectionMatrix),U.projectionMatrixInverse.copy(w.projectionMatrixInverse),P===null&&O.isPerspectiveCamera&&(P={camera:O,fov:O.fov,zoom:O.zoom}),tt(O,U,Lt)};function tt(O,ct,wt){wt===null?O.matrix.copy(ct.matrixWorld):(O.matrix.copy(wt.matrixWorld),O.matrix.invert(),O.matrix.multiply(ct.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(ct.projectionMatrix),O.projectionMatrixInverse.copy(ct.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=lr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&h===null))return c},this.setFoveation=function(O){c=O,d!==null&&(d.fixedFoveation=O),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=O)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(O){return m[O]};let ut=null;function Mt(O,ct){if(f=ct.getViewerPose(l||o),_=ct,f!==null){const wt=f.views;h!==null&&(t.setRenderTargetFramebuffer(A,h.framebuffer),t.setRenderTarget(A));let Lt=!1;wt.length!==U.cameras.length&&(U.cameras.length=0,Lt=!0);for(let Ht=0;Ht<wt.length;Ht++){const me=wt[Ht];let he=null;if(h!==null)he=h.getViewport(me);else{const Rt=g.getViewSubImage(d,me);he=Rt.viewport,Ht===0&&(t.setRenderTargetTextures(A,Rt.colorTexture,Rt.depthStencilTexture),t.setRenderTarget(A))}let re=L[Ht];re===void 0&&(re=new Ln,re.layers.enable(Ht),re.viewport=new Oe,L[Ht]=re),re.matrix.fromArray(me.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(me.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(he.x,he.y,he.width,he.height),Ht===0&&(U.matrix.copy(re.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Lt===!0&&U.cameras.push(re)}const xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){g=n.getBinding();const Ht=g.getDepthInformation(wt[0]);Ht&&Ht.isValid&&Ht.texture&&p.init(Ht,s.renderState)}if(xt&&xt.includes("camera-access")&&M){t.state.unbindTexture(),g=n.getBinding();for(let Ht=0;Ht<wt.length;Ht++){const me=wt[Ht].camera;if(me){let he=m[me];he||(he=new bl,m[me]=he);const re=g.getCameraImage(me);he.sourceTexture=re}}}}for(let wt=0;wt<S.length;wt++){const Lt=x[wt],xt=S[wt];Lt!==null&&xt!==void 0&&xt.update(Lt,ct,l||o)}ut&&ut(O,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),_=null}const At=new eu;At.setAnimationLoop(Mt),this.setAnimationLoop=function(O){ut=O},this.dispose=function(){}}}const fg=new pe,fu=new ee;fu.set(-1,0,0,0,1,0,0,0,1);function dg(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Xh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,b,A){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),g(p,m)):m.isMeshPhongMaterial?(r(p,m),f(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&h(p,m,A)):m.isMeshMatcapMaterial?(r(p,m),_(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),M(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,y,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===_n&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===_n&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),b=y.envMap,A=y.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4(fg.makeRotationFromEuler(A)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(fu),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=b*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function f(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function g(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,y){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===_n&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function M(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function pg(i,t,e,n){let s={},r={};function o(y,b){const A=b.program;n.uniformBlockBinding(y,A,s[y.id])}function a(y,b){let A=s[y.id];A===void 0&&(_(y),A=c(y),s[y.id]=A,y.addEventListener("dispose",p));const S=b.program;n.updateUBOMapping(y,S);const x=t.render.frame;r[y.id]!==x&&(l(y),r[y.id]=x)}function c(y){const b=i.createBuffer(),A=y.__size,S=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,A,S),i.bindBuffer(i.UNIFORM_BUFFER,null),b}function l(y){const b=s[y.id],A=y.uniforms,S=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let x=0,u=A.length;x<u;x++){const v=A[x];if(Array.isArray(v))for(let P=0,w=v.length;P<w;P++)f(v[P],x,P,S);else f(v,x,0,S)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,b,A,S){if(d(y,b,A,S)===!0){const x=y.__offset,u=y.value;if(Array.isArray(u)){let v=0;for(let P=0;P<u.length;P++){const w=u[P],T=M(w,!0);g(w,y.__data,v),v+=T.storage/Float32Array.BYTES_PER_ELEMENT}}else g(u,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,b,A){typeof y=="number"||typeof y=="boolean"?b[A]=y:y.isMatrix3?(b[A]=y.elements[0],b[A+1]=y.elements[1],b[A+2]=y.elements[2],b[A+3]=0,b[A+4]=y.elements[3],b[A+5]=y.elements[4],b[A+6]=y.elements[5],b[A+7]=0,b[A+8]=y.elements[6],b[A+9]=y.elements[7],b[A+10]=y.elements[8],b[A+11]=0):ArrayBuffer.isView(y)?b.set(y.subarray(0,b.length-A),A):y.toArray(b,A)}function d(y,b,A,S){const x=y.value,u=b+"_"+A;if(Array.isArray(x)){S[u]===void 0&&(S[u]=[]);const v=S[u];let P=!1;for(let w=0;w<x.length;w++)h(x[w],v,w)===!0&&(P=!0);return P}return h(x,S,u)}function h(y,b,A){if(b[A]===void 0)return typeof y=="number"||typeof y=="boolean"?b[A]=y:ArrayBuffer.isView(y)?b[A]=y.slice():b[A]=y.clone(),!0;{const S=b[A];if(typeof y=="number"||typeof y=="boolean"){if(S!==y)return b[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(S.equals(y)===!1)return S.copy(y),!0}}return!1}function _(y){const b=y.uniforms;let A=0;const S=16;for(let u=0,v=b.length;u<v;u++){const P=Array.isArray(b[u])?b[u]:[b[u]];for(let w=0,T=P.length;w<T;w++){const L=P[w],U=Array.isArray(L.value)?L.value:[L.value],I=Array.isArray(b[u])||Array.isArray(L.value);let k=A;for(let Z=0,it=U.length;Z<it;Z++){const Q=U[Z],tt=M(Q,I),ut=A%S,Mt=ut%tt.boundary,At=ut+Mt;A+=Mt,At!==0&&S-At<tt.storage&&(A+=S-At),Z===0&&(k=A),A+=tt.storage}const Y=L.type==="int"?Int32Array:L.type==="uint"?Uint32Array:Float32Array;L.__data=new Y((A-k)/Float32Array.BYTES_PER_ELEMENT),L.__offset=k}}const x=A%S;return x>0&&(A+=S-x),y.__size=A,y.__cache={},this}function M(y,b){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=16,A.storage=48):y.isMatrix4?(A.boundary=16,A.storage=64):y.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",y),b===!0&&(A.boundary=16,A.storage=Math.ceil(A.storage/16)*16),A}function p(y){const b=y.target;b.removeEventListener("dispose",p),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:o,update:a,dispose:m}}const mg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qn=null;function gg(){return Qn===null&&(Qn=new _l(mg,16,16,Ni,Yn),Qn.name="DFG_LUT",Qn.minFilter=gn,Qn.magFilter=gn,Qn.wrapS=si,Qn.wrapT=si,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}class du{constructor(t={}){const{canvas:e=Eh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Sn}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=o;const M=h,p=new Set([Ko,Zo,qo]),m=new Set([Sn,Xn,Ts,ts,Wo,Xo]),y=new Uint32Array(4),b=new Int32Array(4),A={textures:[],min:[],max:[],resolution:[]};let S=null,x=null;const u=[],v=[];let P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let T=!1,L=null,U=null,I=null,k=null;this._outputColorSpace=mn;let Y=0,Z=0,it=null,Q=-1,tt=null;const ut=new Oe,Mt=new Oe;let At=null;const O=new ne(0);let ct=0,wt=e.width,Lt=e.height,xt=1,Zt=null,Le=null;const Ht=new Oe(0,0,wt,Lt),me=new Oe(0,0,wt,Lt);let he=!1;const re=new ws,Rt=new jo;let Pt=!1,Vt=!1;const Wt=new pe,ue=new B,ve=new Oe,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function Ve(){return it===null?xt:1}let H=n;function We(C,G){return e.getContext(C,G)}let ce,ye,bt,Jt,Xt,$t,N,R,q,st,ht,vt,gt,rt,lt,St,z,ot,nt,dt,ft,pt,Ft;try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:f,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ko}`),e.addEventListener("webglcontextlost",Gt,!1),e.addEventListener("webglcontextrestored",Yt,!1),e.addEventListener("webglcontextcreationerror",at,!1),H===null){const G="webgl2";if(H=We(G,C),H===null)throw We(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}jt()}catch(C){throw e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",Yt,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Me("WebGLRenderer: "+C.message),C}function jt(){ce=new Sm(H),ce.init(),ft=new uu(H,ce),ye=new hm(H,ce,t,ft),bt=new og(H,ce),ye.reversedDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),U=H.createFramebuffer(),I=H.createFramebuffer(),k=H.createFramebuffer(),Jt=new Em(H),Xt=new Y0,$t=new ag(H,ce,bt,Xt,ye,ft,Jt),N=new Mm(w),R=new Af(H),pt=new lm(H,R),q=new ym(H,R,Jt,pt),st=new Am(H,q,R,pt,Jt),ot=new Tm(H,ye,$t),lt=new um(Xt),ht=new X0(w,N,ce,ye,pt,lt),vt=new dg(w,Xt),gt=new Z0,rt=new tg(ce),z=new am(w,N,bt,st,_,c),St=new rg(w,st,ye),Ft=new pg(H,Jt,ye,bt),nt=new cm(H,ce,Jt),dt=new bm(H,ce,Jt),Jt.programs=ht.programs,w.capabilities=ye,w.extensions=ce,w.properties=Xt,w.renderLists=gt,w.shadowMap=St,w.state=bt,w.info=Jt}M!==Sn&&(P=new Rm(M,e.width,e.height,a,s,r));const mt=new ug(w,H);this.xr=mt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const C=ce.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ce.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return xt},this.setPixelRatio=function(C){C!==void 0&&(xt=C,this.setSize(wt,Lt,!1))},this.getSize=function(C){return C.set(wt,Lt)},this.setSize=function(C,G,j=!0){if(mt.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}wt=C,Lt=G,e.width=Math.floor(C*xt),e.height=Math.floor(G*xt),j===!0&&(e.style.width=C+"px",e.style.height=G+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(wt*xt,Lt*xt).floor()},this.setDrawingBufferSize=function(C,G,j){wt=C,Lt=G,xt=j,e.width=Math.floor(C*j),e.height=Math.floor(G*j),this.setViewport(0,0,C,G)},this.setEffects=function(C){if(M===Sn){Me("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let G=0;G<C.length;G++)if(C[G].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(ut)},this.getViewport=function(C){return C.copy(Ht)},this.setViewport=function(C,G,j,K){C.isVector4?Ht.set(C.x,C.y,C.z,C.w):Ht.set(C,G,j,K),bt.viewport(ut.copy(Ht).multiplyScalar(Ve()).round())},this.getScissor=function(C){return C.copy(me)},this.setScissor=function(C,G,j,K){C.isVector4?me.set(C.x,C.y,C.z,C.w):me.set(C,G,j,K),bt.scissor(Mt.copy(me).multiplyScalar(Ve()).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(C){bt.setScissorTest(he=C)},this.setOpaqueSort=function(C){Zt=C},this.setTransparentSort=function(C){Le=C},this.getClearColor=function(C){return C.copy(z.getClearColor())},this.setClearColor=function(){z.setClearColor(...arguments)},this.getClearAlpha=function(){return z.getClearAlpha()},this.setClearAlpha=function(){z.setClearAlpha(...arguments)},this.clear=function(C=!0,G=!0,j=!0){let K=0;if(C){let W=!1;if(it!==null){const Tt=it.texture.format;W=p.has(Tt)}if(W){const Tt=it.texture.type,Ot=m.has(Tt),yt=z.getClearColor(),Ct=z.getClearAlpha(),zt=yt.r,Qt=yt.g,te=yt.b;Ot?(y[0]=zt,y[1]=Qt,y[2]=te,y[3]=Ct,H.clearBufferuiv(H.COLOR,0,y)):(b[0]=zt,b[1]=Qt,b[2]=te,b[3]=Ct,H.clearBufferiv(H.COLOR,0,b))}else K|=H.COLOR_BUFFER_BIT}G&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),L=C},this.dispose=function(){e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",Yt,!1),e.removeEventListener("webglcontextcreationerror",at,!1),z.dispose(),gt.dispose(),rt.dispose(),$t.dispose(),Xt.dispose(),N.dispose(),st.dispose(),q.dispose(),pt.dispose(),Ft.dispose(),ht.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",Ge),mt.removeEventListener("sessionend",Te),ge.stop()};function Gt(C){C.preventDefault(),Ba("WebGLRenderer: Context Lost."),T=!0}function Yt(){Ba("WebGLRenderer: Context Restored."),T=!1;const C=Jt.autoReset,G=St.enabled,j=St.autoUpdate,K=St.needsUpdate,W=St.type;jt(),Jt.autoReset=C,St.enabled=G,St.autoUpdate=j,St.needsUpdate=K,St.type=W}function at(C){Me("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ie(C){const G=C.target;G.removeEventListener("dispose",ie),kt(G)}function kt(C){tn(C),Xt.remove(C)}function tn(C){const G=Xt.get(C).programs;G!==void 0&&(G.forEach(function(j){ht.releaseProgram(j)}),C.isShaderMaterial&&ht.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,j,K,W,Tt){G===null&&(G=Fe);const Ot=W.isMesh&&W.matrixWorld.determinantAffine()<0,yt=fr(C,G,j,K,W);bt.setMaterial(K,Ot);let Ct=j.index,zt=1;if(K.wireframe===!0){if(Ct=q.getWireframeAttribute(j),Ct===void 0)return;zt=2}const Qt=j.drawRange,te=j.attributes.position;let Ut=Qt.start*zt,ae=(Qt.start+Qt.count)*zt;Tt!==null&&(Ut=Math.max(Ut,Tt.start*zt),ae=Math.min(ae,(Tt.start+Tt.count)*zt)),Ct!==null?(Ut=Math.max(Ut,0),ae=Math.min(ae,Ct.count)):te!=null&&(Ut=Math.max(Ut,0),ae=Math.min(ae,te.count));const ze=ae-Ut;if(ze<0||ze===1/0)return;pt.setup(W,K,yt,j,Ct);let Ce,Ae=nt;if(Ct!==null&&(Ce=R.get(Ct),Ae=dt,Ae.setIndex(Ce)),W.isMesh)K.wireframe===!0?(bt.setLineWidth(K.wireframeLinewidth*Ve()),Ae.setMode(H.LINES)):Ae.setMode(H.TRIANGLES);else if(W.isLine){let Ze=K.linewidth;Ze===void 0&&(Ze=1),bt.setLineWidth(Ze*Ve()),W.isLineSegments?Ae.setMode(H.LINES):W.isLineLoop?Ae.setMode(H.LINE_LOOP):Ae.setMode(H.LINE_STRIP)}else W.isPoints?Ae.setMode(H.POINTS):W.isSprite&&Ae.setMode(H.TRIANGLES);if(W.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))Ae.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ze=W._multiDrawStarts,Bt=W._multiDrawCounts,en=W._multiDrawCount,_e=Ct?R.get(Ct).bytesPerElement:1,Jn=Xt.get(K).currentProgram.getUniforms();for(let nn=0;nn<en;nn++)Jn.setValue(H,"_gl_DrawID",nn),Ae.render(Ze[nn]/_e,Bt[nn])}else if(W.isInstancedMesh)Ae.renderInstances(Ut,ze,W.count);else if(j.isInstancedBufferGeometry){const Ze=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Bt=Math.min(j.instanceCount,Ze);Ae.renderInstances(Ut,ze,Bt)}else Ae.render(Ut,ze)};function zi(C,G,j,K){L!==null&&C.isNodeMaterial&&L.setObject(K,C),Pt===!0&&lt.setState(C,j,!1),C.transparent===!0&&C.side===fn&&C.forceSinglePass===!1?(C.side=_n,C.needsUpdate=!0,Ei(C,G,K),C.side=Ii,C.needsUpdate=!0,Ei(C,G,K),C.side=fn):Ei(C,G,K)}this.compile=function(C,G,j=null){j===null&&(j=C),L!==null&&L.renderStart(C,G,j),x=rt.get(j),x.init(G),v.push(x),j.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),C!==j&&C.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),x.setupLights(),L!==null&&L.updateLights(x.state.lightsArray),Vt=this.localClippingEnabled,Pt=lt.init(this.clippingPlanes,Vt),Pt===!0&&lt.setGlobalState(this.clippingPlanes,G),L!==null&&St.render(x.state.shadowsArray,j,G);const K=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Tt=W.material;if(Tt)if(Array.isArray(Tt))for(let Ot=0;Ot<Tt.length;Ot++){const yt=Tt[Ot];zi(yt,j,G,W),K.add(yt)}else zi(Tt,j,G,W),K.add(Tt)}),x=v.pop(),L!==null&&L.renderEnd(),K},this.compileAsync=function(C,G,j=null){const K=this.compile(C,G,j);return new Promise(W=>{function Tt(){if(K.forEach(function(Ot){const Ct=Xt.get(Ot).currentProgram;(Ct===void 0||Ct.isReady())&&K.delete(Ot)}),K.size===0){W(C);return}setTimeout(Tt,10)}ce.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Zn=null;function Is(C){Zn&&Zn(C)}function Ge(){ge.stop()}function Te(){ge.start()}const ge=new eu;ge.setAnimationLoop(Is),typeof self<"u"&&ge.setContext(self),this.setAnimationLoop=function(C){Zn=C,mt.setAnimationLoop(C),C===null?ge.stop():ge.start()},mt.addEventListener("sessionstart",Ge),mt.addEventListener("sessionend",Te),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){Me("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;L!==null&&L.renderStart(C,G);const j=mt.enabled===!0&&mt.isPresenting===!0,K=P!==null&&(it===null||j)&&P.begin(w,it);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(G),G=mt.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,G,it),x=rt.get(C,v.length),x.init(G),x.state.textureUnits=$t.getTextureUnits(),v.push(x),Wt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?Rt.setFromArrayCamera(G):re.setFromProjectionMatrix(Wt,Un,G.reversedDepth),Vt=this.localClippingEnabled,Pt=lt.init(this.clippingPlanes,Vt),S=gt.get(C,u.length),S.init(),u.push(S),this.info.render.frame++,mt.enabled===!0&&mt.isPresenting===!0){const Ot=w.xr.getDepthSensingMesh();Ot!==null&&bn(Ot,G,-1/0,w.sortObjects)}bn(C,G,0,w.sortObjects),S.finish(),L!==null&&L.updateLights(x.state.lightsArray),w.sortObjects===!0&&S.sort(Zt,Le),Ie=mt.enabled===!1||mt.isPresenting===!1||mt.hasDepthSensing()===!1,Ie&&z.addToRenderList(S,C),this.info.autoReset===!0&&this.info.reset(),Pt===!0&&lt.beginShadows();const W=x.state.shadowsArray;if(St.render(W,C,G),Pt===!0&&lt.endShadows(),(K&&P.hasRenderPass())===!1){const Ot=S.opaque,yt=S.transmissive;if(x.setupLights(),G.isArrayCamera){const Ct=G.cameras;if(yt.length>0)for(let zt=0,Qt=Ct.length;zt<Qt;zt++){const te=Ct[zt];Gi(Ot,yt,C,te)}Ie&&z.render(C);for(let zt=0,Qt=Ct.length;zt<Qt;zt++){const te=Ct[zt];On(S,C,te,te.viewport)}}else yt.length>0&&Gi(Ot,yt,C,G),Ie&&z.render(C),On(S,C,G)}it!==null&&Z===0&&($t.updateMultisampleRenderTarget(it),$t.updateRenderTargetMipmap(it)),K&&P.end(w),C.isScene===!0&&C.onAfterRender(w,C,G),pt.resetDefaultState(),Q=-1,tt=null,v.pop(),v.length>0?(x=v[v.length-1],$t.setTextureUnits(x.state.textureUnits),Pt===!0&&lt.setGlobalState(w.clippingPlanes,x.state.camera)):x=null,u.pop(),u.length>0?S=u[u.length-1]:S=null,L!==null&&L.renderEnd()};function bn(C,G,j,K){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLight)x.pushLight(C),C.castShadow&&x.pushShadow(C);else if(C.isSprite){const Ot=G.isArrayCamera?Rt:re;if(!C.frustumCulled||C.intersectsFrustum(Ot)){K&&ve.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Wt);const yt=st.update(C),Ct=C.material;Ct.visible&&S.push(C,yt,Ct,j,ve.z,null,G)}}else if(C.isMesh||C.isLine||C.isPoints){const Ot=G.isArrayCamera?Rt:re;if(!C.frustumCulled||C.intersectsFrustum(Ot)){const yt=st.update(C),Ct=C.material;if(K&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ve.copy(C.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),ve.copy(yt.boundingSphere.center)),ve.applyMatrix4(C.matrixWorld).applyMatrix4(Wt)),Array.isArray(Ct)){const zt=yt.groups;for(let Qt=0,te=zt.length;Qt<te;Qt++){const Ut=zt[Qt],ae=Ct[Ut.materialIndex];ae&&ae.visible&&S.push(C,yt,ae,j,ve.z,Ut,G)}}else Ct.visible&&S.push(C,yt,Ct,j,ve.z,null,G)}}}const Tt=C.children;for(let Ot=0,yt=Tt.length;Ot<yt;Ot++)bn(Tt[Ot],G,j,K)}function On(C,G,j,K){const{opaque:W,transmissive:Tt,transparent:Ot}=C;x.setupLightsView(j),Pt===!0&&lt.setGlobalState(w.clippingPlanes,j),K&&bt.viewport(ut.copy(K)),W.length>0&&Kn(W,G,j),Tt.length>0&&Kn(Tt,G,j),Ot.length>0&&Kn(Ot,G,j),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Gi(C,G,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[K.id]===void 0){const Ut=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");x.state.transmissionRenderTarget[K.id]=new Wn(1,1,{generateMipmaps:!0,type:Ut?Yn:Sn,minFilter:gi,samples:Math.max(4,ye.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:de.workingColorSpace})}const Tt=x.state.transmissionRenderTarget[K.id],Ot=K.viewport||ut;Tt.setSize(Ot.z*w.transmissionResolutionScale,Ot.w*w.transmissionResolutionScale);const yt=w.getRenderTarget(),Ct=w.getActiveCubeFace(),zt=w.getActiveMipmapLevel();w.setRenderTarget(Tt),w.getClearColor(O),ct=w.getClearAlpha(),ct<1&&w.setClearColor(16777215,.5),w.clear(),Ie&&z.render(j);const Qt=w.toneMapping;w.toneMapping=ri;const te=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),x.setupLightsView(K),Pt===!0&&lt.setGlobalState(w.clippingPlanes,K),Kn(C,j,K),$t.updateMultisampleRenderTarget(Tt),$t.updateRenderTargetMipmap(Tt),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let ae=0,ze=G.length;ae<ze;ae++){const Ce=G[ae],{object:Ae,geometry:Ze,material:Bt,group:en}=Ce;if(Bt.side===fn&&Ae.layers.test(K.layers)){const _e=Bt.side;Bt.side=_n,Bt.needsUpdate=!0,bi(Ae,j,K,Ze,Bt,en),Bt.side=_e,Bt.needsUpdate=!0,Ut=!0}}Ut===!0&&($t.updateMultisampleRenderTarget(Tt),$t.updateRenderTargetMipmap(Tt))}w.setRenderTarget(yt,Ct,zt),w.setClearColor(O,ct),te!==void 0&&(K.viewport=te),w.toneMapping=Qt}function Kn(C,G,j){const K=G.isScene===!0?G.overrideMaterial:null;for(let W=0,Tt=C.length;W<Tt;W++){const Ot=C[W],{object:yt,geometry:Ct,group:zt}=Ot;let Qt=Ot.material;Qt.allowOverride===!0&&K!==null&&(Qt=K),yt.layers.test(j.layers)&&bi(yt,G,j,Ct,Qt,zt)}}function bi(C,G,j,K,W,Tt){L!==null&&W.isNodeMaterial&&L.setObject(C,W),C.onBeforeRender(w,G,j,K,W,Tt),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(w,G,j,K,C,Tt),W.transparent===!0&&W.side===fn&&W.forceSinglePass===!1?(W.side=_n,W.needsUpdate=!0,w.renderBufferDirect(j,G,K,W,C,Tt),W.side=Ii,W.needsUpdate=!0,w.renderBufferDirect(j,G,K,W,C,Tt),W.side=fn):w.renderBufferDirect(j,G,K,W,C,Tt),C.onAfterRender(w,G,j,K,W,Tt)}function Ns(C){let G=0;for(const j of C)j.texture!==null&&G++;return G}function Ei(C,G,j){G.isScene!==!0&&(G=Fe);const K=Xt.get(C),W=x.state.lights,Tt=x.state.shadowsArray,Ot=W.state.version,yt=ht.getParameters(C,W.state,Tt,G,j,x.state.lightProbeGridArray),Ct=ht.getProgramCacheKey(yt);let zt=K.programs;K.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;const Qt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;K.envMap=N.get(C.envMap||K.environment,Qt),K.envMapRotation=K.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,zt===void 0&&(C.addEventListener("dispose",ie),zt=new Map,K.programs=zt,K.programVariants=new Map);let te=zt.get(Ct);if(te!==void 0){if(K.currentProgram===te&&K.lightsStateVersion===Ot)return Us(C,yt),te}else yt.uniforms=ht.getUniforms(C),L!==null&&C.isNodeMaterial&&L.build(C,j,yt),C.onBeforeCompile(yt,w),te=ht.acquireProgram(yt,Ct),zt.set(Ct,te),K.uniforms=yt.uniforms;const Ut=K.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ut.clippingPlanes=lt.uniform),Us(C,yt),K.needsLights=Xe(C),K.lightsStateVersion=Ot,K.needsLights&&(Ut.ambientLightColor.value=W.state.ambient,Ut.lightProbe.value=W.state.probe,Ut.sunLights.value=W.state.sun,Ut.sunLightShadows.value=W.state.sunShadow,Ut.directionalLights.value=W.state.directional,Ut.directionalLightShadows.value=W.state.directionalShadow,Ut.spotLights.value=W.state.spot,Ut.spotLightShadows.value=W.state.spotShadow,Ut.rectAreaLights.value=W.state.rectArea,Ut.ltc_1.value=W.state.rectAreaLTC1,Ut.ltc_2.value=W.state.rectAreaLTC2,Ut.pointLights.value=W.state.point,Ut.pointLightShadows.value=W.state.pointShadow,Ut.hemisphereLights.value=W.state.hemi,Ut.sunShadowMatrix.value=W.state.sunShadowMatrix,Ut.sunShadowCascade.value=W.state.sunShadowCascade,Ut.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ut.spotLightMatrix.value=W.state.spotLightMatrix,Ut.spotLightMap.value=W.state.spotLightMap,Ut.pointShadowMatrix.value=W.state.pointShadowMatrix),K.numLightProbeGrids=Ns(x.state.lightProbeGridArray),K.currentProgram=te,K.uniformsList=null,te}function li(C,G,j,K,W){const Tt=Xt.get(C),Ot=Tt.currentProgram.id+","+K+","+W;let yt=Tt.programVariants.get(Ot);return yt===void 0?(yt=Ei(C,G,j),Tt.programVariants.set(Ot,yt)):(Tt.currentProgram=yt,Tt.uniformsList=null,Tt.outputColorSpace=K,Tt.toneMapping=W),yt}function Bn(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=qr.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function Us(C,G){const j=Xt.get(C);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function fr(C,G,j,K,W){G.isScene!==!0&&(G=Fe),$t.resetTextureUnits();const Tt=G.fog,Ot=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,yt=it===null?w.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:de.workingColorSpace,Ct=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,zt=N.get(K.envMap||Ot,Ct),Qt=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,te=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ut=!!j.morphAttributes.position,ae=!!j.morphAttributes.normal,ze=!!j.morphAttributes.color;let Ce=ri;K.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ce=w.toneMapping);const Ae=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ze=Ae!==void 0?Ae.length:0,Bt=Xt.get(K),en=x.state.lights;if(Pt===!0&&(Vt===!0||C!==tt)){const Et=C===tt&&K.id===Q;lt.setState(K,C,Et)}let _e=!1,Jn=!1;K.version===Bt.__version?Bt.needsLights&&Bt.lightsStateVersion!==en.state.version||W.isBatchedMesh&&Bt.batching===!1||!W.isBatchedMesh&&Bt.batching===!0||W.isBatchedMesh&&Bt.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Bt.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Bt.instancing===!1||!W.isInstancedMesh&&Bt.instancing===!0||W.isSkinnedMesh&&Bt.skinning===!1||!W.isSkinnedMesh&&Bt.skinning===!0||W.isInstancedMesh&&Bt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Bt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Bt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Bt.instancingMorph===!1&&W.morphTexture!==null||Bt.envMap!==zt||K.fog===!0&&Bt.fog!==Tt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==lt.numPlanes||Bt.numIntersection!==lt.numIntersection)||Bt.vertexAlphas!==Qt||Bt.vertexTangents!==te||Bt.morphTargets!==Ut||Bt.morphNormals!==ae||Bt.morphColors!==ze||Bt.morphTargetsCount!==Ze||Bt.numLightProbeGrids!==Ns(x.state.lightProbeGridArray)?_e=!0:(Bt.outputColorSpace!==yt||Bt.toneMapping!==Ce)&&(Jn=!0):(_e=!0,Bt.__version=K.version);let nn=Bt.currentProgram;(_e===!0||Jn===!0)&&(nn=Jn===!0?li(K,G,W,yt,Ce):Ei(K,G,W),L&&K.isNodeMaterial&&L.onUpdateProgram(K,nn,Bt));let E=!1,D=!1,F=!1;const V=nn.getUniforms(),X=Bt.uniforms;if(bt.useProgram(nn.program)&&(E=!0,D=!0,F=!0),K.id!==Q&&(Q=K.id,D=!0),E||tt!==C){bt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),V.setValue(H,"projectionMatrix",C.projectionMatrix),V.setValue(H,"viewMatrix",C.matrixWorldInverse);const J=V.map.cameraPosition;J!==void 0&&J.setValue(H,ue.setFromMatrixPosition(C.matrixWorld)),ye.logarithmicDepthBuffer&&V.setValue(H,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&V.setValue(H,"isOrthographic",C.isOrthographicCamera===!0),tt!==C&&(tt=C,D=!0,F=!0)}if(Bt.needsLights&&(en.state.sunShadowMap.length>0&&V.setValue(H,"sunShadowMap",en.state.sunShadowMap,$t),en.state.directionalShadowMap.length>0&&V.setValue(H,"directionalShadowMap",en.state.directionalShadowMap,$t),en.state.spotShadowMap.length>0&&V.setValue(H,"spotShadowMap",en.state.spotShadowMap,$t),en.state.pointShadowMap.length>0&&V.setValue(H,"pointShadowMap",en.state.pointShadowMap,$t)),W.isSkinnedMesh){V.setOptional(H,W,"bindMatrix"),V.setOptional(H,W,"bindMatrixInverse");const Et=W.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),V.setValue(H,"boneTexture",Et.boneTexture,$t))}W.isBatchedMesh&&(V.setOptional(H,W,"batchingTexture"),V.setValue(H,"batchingTexture",W._matricesTexture,$t),V.setOptional(H,W,"batchingIdTexture"),V.setValue(H,"batchingIdTexture",W._indirectTexture,$t),V.setOptional(H,W,"batchingColorTexture"),W._colorsTexture!==null&&V.setValue(H,"batchingColorTexture",W._colorsTexture,$t));const _t=j.morphAttributes;if((_t.position!==void 0||_t.normal!==void 0||_t.color!==void 0)&&ot.update(W,j,nn),(D||Bt.receiveShadow!==W.receiveShadow)&&(Bt.receiveShadow=W.receiveShadow,V.setValue(H,"receiveShadow",W.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(X.envMapIntensity.value=G.environmentIntensity),X.dfgLUT!==void 0&&(X.dfgLUT.value=gg()),D){if(V.setValue(H,"toneMappingExposure",w.toneMappingExposure),Bt.needsLights&&Ne(X,F),Tt&&K.fog===!0&&vt.refreshFogUniforms(X,Tt),vt.refreshMaterialUniforms(X,K,xt,Lt,x.state.transmissionRenderTarget[C.id]),Bt.needsLights&&Bt.numLightProbeGrids>0){const Et=A;let J=0;for(const It of x.state.lightProbeGridArray)It.texture!==null&&(Et.textures[J]=It.texture,Et.min[J]=It.boundingBox.min,Et.max[J]=It.boundingBox.max,Et.resolution[J]=It.resolution,J++);for(const It in Et)Et[It].length=J;X.probesSH.value=Et.textures,X.probesMin.value=Et.min,X.probesMax.value=Et.max,X.probesResolution.value=Et.resolution}qr.upload(H,Bn(Bt),X,$t)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(qr.upload(H,Bn(Bt),X,$t),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&V.setValue(H,"center",W.center),V.setValue(H,"modelViewMatrix",W.modelViewMatrix),V.setValue(H,"normalMatrix",W.normalMatrix),V.setValue(H,"modelMatrix",W.matrixWorld),K.uniformsGroups!==void 0){const Et=K.uniformsGroups;for(let J=0,It=Et.length;J<It;J++){const be=Et[J];Ft.update(be,nn),Ft.bind(be,nn)}}return nn}function Ne(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.sunLights.needsUpdate=G,C.sunLightShadows.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function Xe(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(C,G,j){const K=Xt.get(C);K.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Xt.get(C.texture).__webglTexture=G,Xt.get(C.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,G){const j=Xt.get(C);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(C,G=0,j=0){it=C,Y=G,Z=j;let K=null,W=!1,Tt=!1;if(C){const yt=Xt.get(C);if(yt.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(H.FRAMEBUFFER,yt.__webglFramebuffer),ut.copy(C.viewport),Mt.copy(C.scissor),At=C.scissorTest,bt.viewport(ut),bt.scissor(Mt),bt.setScissorTest(At),Q=-1;return}else if(yt.__webglFramebuffer===void 0)$t.setupRenderTarget(C);else if(yt.__hasExternalTextures)$t.rebindTextures(C,Xt.get(C.texture).__webglTexture,Xt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Qt=C.depthTexture;if(yt.__boundDepthTexture!==Qt){if(Qt!==null&&Xt.has(Qt)&&(C.width!==Qt.image.width||C.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$t.setupDepthRenderbuffer(C)}}const Ct=C.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(Tt=!0);const zt=Xt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(zt[G])?K=zt[G][j]:K=zt[G],W=!0):C.samples>0&&$t.useMultisampledRTT(C)===!1?K=Xt.get(C).__webglMultisampledFramebuffer:Array.isArray(zt)?K=zt[j]:K=zt,ut.copy(C.viewport),Mt.copy(C.scissor),At=C.scissorTest}else ut.copy(Ht).multiplyScalar(xt).floor(),Mt.copy(me).multiplyScalar(xt).floor(),At=he;if(j!==0&&(K=U),bt.bindFramebuffer(H.FRAMEBUFFER,K)&&bt.drawBuffers(C,K),bt.viewport(ut),bt.scissor(Mt),bt.setScissorTest(At),W){const yt=Xt.get(C.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,yt.__webglTexture,j)}else if(Tt){const yt=G;for(let Ct=0;Ct<C.textures.length;Ct++){const zt=Xt.get(C.textures[Ct]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Ct,zt.__webglTexture,j,yt)}}else if(C!==null&&j!==0){const yt=Xt.get(C.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,yt.__webglTexture,j)}Q=-1};function Be(C){const G=Xt.get(C);return(G.__readFormat!==C.format||G.__readType!==C.type)&&(G.__readFormat=C.format,G.__readType=C.type,G.__formatReadable=ye.textureFormatReadable(C.format),G.__typeReadable=ye.textureTypeReadable(C.type)),G}this.readRenderTargetPixels=function(C,G,j,K,W,Tt,Ot,yt=0){if(!(C&&C.isWebGLRenderTarget)){Me("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Xt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ot!==void 0&&(Ct=Ct[Ot],Array.isArray(Ct)&&(Ct=Ct[0])),Ct){bt.bindFramebuffer(H.FRAMEBUFFER,Ct);try{const zt=C.textures[yt],Qt=zt.format,te=zt.type;C.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+yt);const Ut=Be(zt);if(Ut.__formatReadable===!1){Me("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ut.__typeReadable===!1){Me("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-K&&j>=0&&j<=C.height-W&&H.readPixels(G,j,K,W,ft.convert(Qt),ft.convert(te),Tt)}finally{const zt=it!==null?Xt.get(it).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(C,G,j,K,W,Tt,Ot,yt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Xt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ot!==void 0&&(Ct=Ct[Ot],Array.isArray(Ct)&&(Ct=Ct[0])),Ct)if(G>=0&&G<=C.width-K&&j>=0&&j<=C.height-W){bt.bindFramebuffer(H.FRAMEBUFFER,Ct);const zt=C.textures[yt],Qt=zt.format,te=zt.type;C.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+yt);const Ut=Be(zt);if(Ut.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ut.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ae=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,ae),H.bufferData(H.PIXEL_PACK_BUFFER,Tt.byteLength,H.STREAM_READ),H.readPixels(G,j,K,W,ft.convert(Qt),ft.convert(te),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const ze=it!==null?Xt.get(it).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,ze);const Ce=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Pu(H,Ce,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,ae),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Tt),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(ae),H.deleteSync(Ce),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,G=null,j=0){const K=Math.pow(2,-j),W=Math.floor(C.image.width*K),Tt=Math.floor(C.image.height*K),Ot=G!==null?G.x:0,yt=G!==null?G.y:0;$t.setTexture2D(C,0),H.copyTexSubImage2D(H.TEXTURE_2D,j,0,0,Ot,yt,W,Tt),bt.unbindTexture()},this.copyTextureToTexture=function(C,G,j=null,K=null,W=0,Tt=0){let Ot,yt,Ct,zt,Qt,te,Ut,ae,ze;const Ce=C.isCompressedTexture?C.mipmaps[Tt]:C.image;if(j!==null)Ot=j.max.x-j.min.x,yt=j.max.y-j.min.y,Ct=j.isBox3?j.max.z-j.min.z:1,zt=j.min.x,Qt=j.min.y,te=j.isBox3?j.min.z:0;else{const V=Math.pow(2,-W);Ot=Math.floor(Ce.width*V),yt=Math.floor(Ce.height*V),C.isDataArrayTexture?Ct=Ce.depth:C.isData3DTexture?Ct=Math.floor(Ce.depth*V):Ct=1,zt=0,Qt=0,te=0}K!==null?(Ut=K.x,ae=K.y,ze=K.z):(Ut=0,ae=0,ze=0);const Ae=ft.convert(G.format),Ze=ft.convert(G.type);let Bt;G.isData3DTexture?($t.setTexture3D(G,0),Bt=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?($t.setTexture2DArray(G,0),Bt=H.TEXTURE_2D_ARRAY):($t.setTexture2D(G,0),Bt=H.TEXTURE_2D),bt.activeTexture(H.TEXTURE0),bt.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),bt.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),bt.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const en=bt.getParameter(H.UNPACK_ROW_LENGTH),_e=bt.getParameter(H.UNPACK_IMAGE_HEIGHT),Jn=bt.getParameter(H.UNPACK_SKIP_PIXELS),nn=bt.getParameter(H.UNPACK_SKIP_ROWS),E=bt.getParameter(H.UNPACK_SKIP_IMAGES);bt.pixelStorei(H.UNPACK_ROW_LENGTH,Ce.width),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ce.height),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,zt),bt.pixelStorei(H.UNPACK_SKIP_ROWS,Qt),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,te);const D=C.isDataArrayTexture||C.isData3DTexture,F=G.isDataArrayTexture||G.isData3DTexture;if(C.isDepthTexture){const V=Xt.get(C),X=Xt.get(G),_t=Xt.get(V.__renderTarget),Et=Xt.get(X.__renderTarget);bt.bindFramebuffer(H.READ_FRAMEBUFFER,_t.__webglFramebuffer),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let J=0;J<Ct;J++)D&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Xt.get(C).__webglTexture,W,te+J),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Xt.get(G).__webglTexture,Tt,ze+J)),H.blitFramebuffer(zt,Qt,zt+Ot,Qt+yt,Ut,ae,Ut+Ot,ae+yt,H.DEPTH_BUFFER_BIT,H.NEAREST);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(W!==0||C.isRenderTargetTexture||Xt.has(C)){const V=Xt.get(C),X=Xt.get(G);bt.bindFramebuffer(H.READ_FRAMEBUFFER,I),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let _t=0;_t<Ct;_t++)D?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,V.__webglTexture,W,te+_t):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,V.__webglTexture,W),F?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,X.__webglTexture,Tt,ze+_t):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,X.__webglTexture,Tt),W!==0?H.blitFramebuffer(zt,Qt,zt+Ot,Qt+yt,Ut,ae,Ut+Ot,ae+yt,H.COLOR_BUFFER_BIT,H.NEAREST):F?H.copyTexSubImage3D(Bt,Tt,Ut,ae,ze+_t,zt,Qt,Ot,yt):H.copyTexSubImage2D(Bt,Tt,Ut,ae,zt,Qt,Ot,yt);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else F?C.isDataTexture||C.isData3DTexture?H.texSubImage3D(Bt,Tt,Ut,ae,ze,Ot,yt,Ct,Ae,Ze,Ce.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(Bt,Tt,Ut,ae,ze,Ot,yt,Ct,Ae,Ce.data):H.texSubImage3D(Bt,Tt,Ut,ae,ze,Ot,yt,Ct,Ae,Ze,Ce):C.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Tt,Ut,ae,Ot,yt,Ae,Ze,Ce.data):C.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Tt,Ut,ae,Ce.width,Ce.height,Ae,Ce.data):H.texSubImage2D(H.TEXTURE_2D,Tt,Ut,ae,Ot,yt,Ae,Ze,Ce);bt.pixelStorei(H.UNPACK_ROW_LENGTH,en),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,_e),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,Jn),bt.pixelStorei(H.UNPACK_SKIP_ROWS,nn),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,E),Tt===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(Bt),bt.unbindTexture()},this.initRenderTarget=function(C){Xt.get(C).__webglFramebuffer===void 0&&$t.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?$t.setTextureCube(C,0):C.isData3DTexture?$t.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?$t.setTexture2DArray(C,0):$t.setTexture2D(C,0),bt.unbindTexture()},this.resetState=function(){Y=0,Z=0,it=null,bt.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}const zr=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Ho,AddEquation:Ki,AddOperation:dh,AdditiveBlending:ir,AgXToneMapping:ja,AlphaFormat:ol,AlwaysCompare:hl,AlwaysDepth:Kr,AlwaysStencilFunc:_h,ArcCurve:Oh,ArrayCamera:Qh,BackSide:_n,BasicDepthPacking:mh,Box3:Fi,BoxGeometry:Je,BufferAttribute:xn,BufferGeometry:$e,ByteType:nl,Camera:Cl,CanvasTexture:ka,CatmullRomCurve3:Bh,CineonToneMapping:$a,ClampToEdgeWrapping:si,Color:ne,ColorManagement:de,ConeGeometry:oi,ConstantAlphaFactor:hh,ConstantColorFactor:lh,Controls:tu,CubeCamera:Bo,CubeDepthTexture:yl,CubeReflectionMapping:ji,CubeRefractionMapping:Es,CubeTexture:Sl,CubicBezierCurve:zh,CubicBezierCurve3:Gh,CullFaceBack:Na,CullFaceFront:Yc,CullFaceNone:Xc,Curve:ai,CustomBlending:Zc,CustomToneMapping:Qa,CylinderGeometry:Fn,Data3DTexture:Dh,DataArrayTexture:pl,DataTexture:_l,DepthFormat:Mi,DepthStencilFormat:_i,DepthTexture:es,DirectionalLight:Ha,DoubleSide:fn,DstAlphaFactor:ih,DstColorFactor:rh,DynamicDrawUsage:ul,EllipseCurve:El,EqualCompare:Mh,EqualDepth:$r,EquirectangularReflectionMapping:Hr,EquirectangularRefractionMapping:Vr,Euler:qn,EventDispatcher:yi,ExternalTexture:bl,Float32BufferAttribute:Re,FloatType:Nn,FogExp2:Qo,FrontSide:Ii,Frustum:ws,FrustumArray:jo,GLSL3:Oa,GreaterCompare:Sh,GreaterDepth:jr,GreaterEqualCompare:cl,GreaterEqualDepth:Qr,Group:Rn,HalfFloatType:Yn,HemisphereLight:Jh,IcosahedronGeometry:ea,ImageUtils:Ch,InstancedBufferAttribute:za,InstancedMesh:xl,IntType:Vo,KeepStencilOp:Xr,Layers:$o,LessCompare:vh,LessDepth:Jr,LessEqualCompare:ll,LessEqualDepth:bs,Light:Rl,LightShadow:$h,Line:Nh,LineBasicMaterial:vl,LineCurve:kh,LineCurve3:Hh,LineSegments:Uh,LinearFilter:gn,LinearMipmapLinearFilter:gi,LinearMipmapNearestFilter:Wr,LinearSRGBColorSpace:or,LinearToneMapping:Ka,LinearTransfer:ar,MOUSE:$i,Material:Bi,MathUtils:Di,Matrix3:ee,Matrix4:pe,MaxEquation:Qc,Mesh:Se,MeshBasicMaterial:ni,MeshDepthMaterial:Zh,MeshDistanceMaterial:Kh,MeshStandardMaterial:Cs,MinEquation:$c,MirroredRepeatWrapping:no,MixOperation:fh,MultiplyBlending:Fa,MultiplyOperation:Za,NearestFilter:on,NearestMipmapLinearFilter:Xs,NearestMipmapNearestFilter:ph,NeutralToneMapping:tl,NeverCompare:xh,NeverDepth:Zr,NoBlending:Qi,NoColorSpace:mi,NoToneMapping:ri,NormalBlending:Ss,NotEqualCompare:yh,NotEqualDepth:to,Object3D:qe,ObjectSpaceNormalMap:gh,OneFactor:th,OneMinusConstantAlphaFactor:uh,OneMinusConstantColorFactor:ch,OneMinusDstAlphaFactor:sh,OneMinusDstColorFactor:oh,OneMinusSrcAlphaFactor:qa,OneMinusSrcColorFactor:nh,OrthographicCamera:Pl,PCFShadowMap:qs,PCFSoftShadowMap:qc,PMREMGenerator:hr,PerspectiveCamera:Ln,Plane:ei,PlaneGeometry:Si,Points:Fh,PointsMaterial:Ml,PolyhedronGeometry:ta,QuadraticBezierCurve:Vh,QuadraticBezierCurve3:Al,Quaternion:yn,R11_EAC_Format:ho,RED_GREEN_RGTC2_Format:rr,RED_RGTC1_Format:Do,REVISION:ko,RG11_EAC_Format:sr,RGBAFormat:Vn,RGBAIntegerFormat:Ko,RGBA_ASTC_10x10_Format:To,RGBA_ASTC_10x5_Format:yo,RGBA_ASTC_10x6_Format:bo,RGBA_ASTC_10x8_Format:Eo,RGBA_ASTC_12x10_Format:Ao,RGBA_ASTC_12x12_Format:wo,RGBA_ASTC_4x4_Format:po,RGBA_ASTC_5x4_Format:mo,RGBA_ASTC_5x5_Format:go,RGBA_ASTC_6x5_Format:_o,RGBA_ASTC_6x6_Format:xo,RGBA_ASTC_8x5_Format:vo,RGBA_ASTC_8x6_Format:Mo,RGBA_ASTC_8x8_Format:So,RGBA_BPTC_Format:Ro,RGBA_ETC2_EAC_Format:co,RGBA_PVRTC_2BPPV1_Format:oo,RGBA_PVRTC_4BPPV1_Format:ro,RGBA_S3TC_DXT1_Format:Ks,RGBA_S3TC_DXT3_Format:Js,RGBA_S3TC_DXT5_Format:$s,RGBFormat:al,RGB_BPTC_SIGNED_Format:Co,RGB_BPTC_UNSIGNED_Format:Po,RGB_ETC1_Format:ao,RGB_ETC2_Format:lo,RGB_PVRTC_2BPPV1_Format:so,RGB_PVRTC_4BPPV1_Format:io,RGB_S3TC_DXT1_Format:Zs,RGFormat:Ni,RGIntegerFormat:Zo,RawShaderMaterial:qh,Ray:Ds,Raycaster:jh,RedFormat:Yo,RedIntegerFormat:qo,ReinhardToneMapping:Ja,RenderTarget:Ph,RepeatWrapping:eo,ReverseSubtractEquation:Jc,RingGeometry:cr,SIGNED_R11_EAC_Format:uo,SIGNED_RED_GREEN_RGTC2_Format:Io,SIGNED_RED_RGTC1_Format:Lo,SIGNED_RG11_EAC_Format:fo,SRGBColorSpace:mn,SRGBTransfer:we,Scene:Ih,ShaderChunk:se,ShaderLib:Hn,ShaderMaterial:Ui,ShortType:il,Sphere:Oi,SphereGeometry:Li,Spherical:Wa,SplineCurve:Wh,SrcAlphaFactor:Ya,SrcAlphaSaturateFactor:ah,SrcColorFactor:eh,StaticDrawUsage:bh,SubtractEquation:Kc,SubtractiveBlending:Ua,TOUCH:Ji,TangentSpaceNormalMap:No,Texture:cn,TextureSource:Jo,TorusGeometry:vi,Triangle:In,TubeGeometry:wl,UVMapping:el,Uint16BufferAttribute:ml,Uint32BufferAttribute:gl,UniformsLib:Dt,UniformsUtils:Yh,UnsignedByteType:Sn,UnsignedInt101111Type:rl,UnsignedInt248Type:ts,UnsignedInt5999Type:sl,UnsignedIntType:Xn,UnsignedShort4444Type:Wo,UnsignedShort5551Type:Xo,UnsignedShortType:Ts,VSMShadowMap:vs,Vector2:Nt,Vector3:B,Vector4:Oe,WebGLCoordinateSystem:Un,WebGLCubeRenderTarget:na,WebGLRenderTarget:Wn,WebGLRenderer:du,WebGLUtils:uu,WebGPUCoordinateSystem:As,WebXRController:Yr,ZeroFactor:jc,createCanvasElement:Eh,error:Me,log:Ba,warn:Kt,warnOnce:Qs},Symbol.toStringTag,{value:"Module"})),Gc={type:"change"},Dl={type:"start"},pu={type:"end"},Gr=new Ds,kc=new ei,_g=Math.cos(70*Di.DEG2RAD),Ke=new B,Mn=2*Math.PI,Ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ia=1e-6;class xg extends tu{constructor(t,e=null){super(t,e),this.state=Ee.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:Ji.ROTATE,TWO:Ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new yn,this._lastTargetPosition=new B,this._quat=new yn().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Wa,this._sphericalDelta=new Wa,this._scale=1,this._panOffset=new B,this._rotateStart=new Nt,this._rotateEnd=new Nt,this._rotateDelta=new Nt,this._panStart=new Nt,this._panEnd=new Nt,this._panDelta=new Nt,this._dollyStart=new Nt,this._dollyEnd=new Nt,this._dollyDelta=new Nt,this._dollyDirection=new B,this._mouse=new Nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Mg.bind(this),this._onPointerDown=vg.bind(this),this._onPointerUp=Sg.bind(this),this._onContextMenu=Rg.bind(this),this._onMouseWheel=Eg.bind(this),this._onKeyDown=Tg.bind(this),this._onTouchStart=Ag.bind(this),this._onTouchMove=wg.bind(this),this._onMouseDown=yg.bind(this),this._onMouseMove=bg.bind(this),this._interceptControlDown=Cg.bind(this),this._interceptControlUp=Pg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ee.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gc),this.update(),this.state=Ee.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ke.copy(e).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===Ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Mn:n>Math.PI&&(n-=Mn),s<-Math.PI?s+=Mn:s>Math.PI&&(s-=Mn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ke.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new B(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Gr.origin.copy(this.object.position),Gr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gr.direction))<_g?this.object.lookAt(this.target):(kc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gr.intersectPlane(kc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ia||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ia||this._lastTargetPosition.distanceToSquared(this.target)>Ia?(this.dispatchEvent(Gc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Mn/60*this.autoRotateSpeed*t:Mn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ke.setFromMatrixColumn(e,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,e){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(e,1):(Ke.setFromMatrixColumn(e,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ke.copy(s).sub(this.target);let r=Ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Mn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Mn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Mn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Nt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function vg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Mg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Sg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pu),this.state=Ee.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function yg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case $i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Ee.DOLLY;break;case $i.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ee.ROTATE}break;case $i.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Ee.PAN}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Dl)}function bg(i){switch(this.state){case Ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Eg(i){this.enabled===!1||this.enableZoom===!1||this.state!==Ee.NONE||(i.preventDefault(),this.dispatchEvent(Dl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(pu))}function Tg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Ag(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ji.ROTATE:if(this.enableRotate===!1){this.state=Ee.NONE;break}this._handleTouchStartRotate(i),this.state=Ee.TOUCH_ROTATE;break;case Ji.PAN:if(this.enablePan===!1){this.state=Ee.NONE;break}this._handleTouchStartPan(i),this.state=Ee.TOUCH_PAN;break;default:this.state=Ee.NONE}break;case 2:switch(this.touches.TWO){case Ji.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Ee.TOUCH_DOLLY_PAN;break;case Ji.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Ee.TOUCH_DOLLY_ROTATE;break;default:this.state=Ee.NONE}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Dl)}function wg(i){switch(this._trackPointer(i),this.state){case Ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Ee.NONE}}function Rg(i){this.enabled!==!1&&i.preventDefault()}function Cg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Pg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ws=new B;function Dn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Ws.copy(t),Ws[n]=0,Ws.normalize();const l=.5*o/(o+a),f=1-Ws.angleTo(i)/c;return Math.sign(Ws[e])===1?f*l:a/(o+a)+l+l*(1-f)}class zo extends Je{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new B,l=new B,f=new B(t,e,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,d=this.attributes.normal.array,h=this.attributes.uv.array,_=g.length/6,M=new B,p=.5/o;for(let m=0,y=0;m<g.length;m+=3,y+=2)switch(c.fromArray(g,m),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),g[m+0]=f.x*Math.sign(c.x)+l.x*r,g[m+1]=f.y*Math.sign(c.y)+l.y*r,g[m+2]=f.z*Math.sign(c.z)+l.z*r,d[m+0]=l.x,d[m+1]=l.y,d[m+2]=l.z,Math.floor(m/_)){case 0:M.set(1,0,0),h[y+0]=Dn(M,l,"z","y",r,n),h[y+1]=1-Dn(M,l,"y","z",r,e);break;case 1:M.set(-1,0,0),h[y+0]=1-Dn(M,l,"z","y",r,n),h[y+1]=1-Dn(M,l,"y","z",r,e);break;case 2:M.set(0,1,0),h[y+0]=1-Dn(M,l,"x","z",r,t),h[y+1]=Dn(M,l,"z","x",r,n);break;case 3:M.set(0,-1,0),h[y+0]=1-Dn(M,l,"x","z",r,t),h[y+1]=1-Dn(M,l,"z","x",r,n);break;case 4:M.set(0,0,1),h[y+0]=1-Dn(M,l,"x","y",r,t),h[y+1]=1-Dn(M,l,"y","x",r,e);break;case 5:M.set(0,0,-1),h[y+0]=Dn(M,l,"x","y",r,t),h[y+1]=1-Dn(M,l,"y","x",r,e);break}}static fromJSON(t){return new zo(t.width,t.height,t.depth,t.segments,t.radius)}}function ii(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new $e;c.morphTargetsRelative=a;let l=0;for(let f=0;f<i.length;++f){const g=i[f];let d=0,h=0;if(e!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in g.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(g.attributes[_]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(a!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in g.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;o[_]===void 0&&(o[_]=[]),o[_].push(g.morphAttributes[_]),h++}if(h!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(t){let _;if(e)_=g.index.count;else if(g.attributes.position!==void 0)_=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,_,f),l+=_}}if(e){let f=0;const g=[];for(let d=0;d<i.length;++d){const h=i[d].index;for(let _=0;_<h.count;++_)g.push(h.getX(_)+f);f+=i[d].attributes.position.count}c.setIndex(g)}for(const f in r){const g=Hc(r[f]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;c.setAttribute(f,g)}for(const f in o){const g=o[f][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[f]=[];for(let d=0;d<g;++d){const h=[];for(let M=0;M<o[f].length;++M)h.push(o[f][M][d]);const _=Hc(h);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;c.morphAttributes[f].push(_)}}}return c}function Hc(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const f=i[l];if(t===void 0&&(t=f.array.constructor),t!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=f.itemSize),e!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=f.gpuType),s!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=f.count*e}const o=new t(r),a=new xn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const f=i[l];if(f.isInterleavedBufferAttribute){const g=c/e;for(let d=0,h=f.count;d<h;d++)for(let _=0;_<e;_++){const M=f.getComponent(d,_);a.setComponent(d+g,_,M)}}else o.set(f.array,c);c+=f.count*e}return s!==void 0&&(a.gpuType=s),a}const Dg=128,Lg=8,Ig=-36.75,Ng=-28,Ug=10.5,Fg=12,Og={w:10,d:8.7,bottom:3.5,top:4.55},Bg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],De={capacity:Dg,columns:Lg,startX:Ig,startZ:Ng,spacingX:Ug,spacingZ:Fg,roof:Og,boxes:Bg};function ra(i){return Number.isInteger(i)&&i>=0&&i<De.capacity?{slot:i,x:De.startX+i%De.columns*De.spacingX,z:De.startZ-Math.floor(i/De.columns)*De.spacingZ}:null}function zg(i,t=i,e=null,n=De.capacity,s=.4,r=!1){const o=[],a=Math.min(i.x,t.x)-s,c=Math.max(i.x,t.x)+s,l=Math.min(i.z,t.z)-s,f=Math.max(i.z,t.z)+s,g=Math.max(0,Math.ceil((a-5.1-De.startX)/De.spacingX)),d=Math.min(De.columns-1,Math.floor((c+5.1-De.startX)/De.spacingX)),h=Math.max(0,Math.ceil((De.startZ-f-5.3)/De.spacingZ)),_=Math.min(Math.ceil(De.capacity/De.columns)-1,Math.floor((De.startZ-l+5.3)/De.spacingZ));for(let M=h;M<=_;M++)for(let p=g;p<=d;p++){const m=M*De.columns+p,y=ra(m);if(!(!y||m>=n)){for(const b of De.boxes)b.tag==="home-door"&&m===e||o.push({left:y.x+b.x-b.w/2,right:y.x+b.x+b.w/2,back:y.z+b.z-b.d/2,front:y.z+b.z+b.d/2,top:b.top,tag:b.tag});r&&o.push({left:y.x-De.roof.w/2,right:y.x+De.roof.w/2,back:y.z-De.roof.d/2,front:y.z+De.roof.d/2,bottom:De.roof.bottom,top:De.roof.top,tag:"home-roof"})}}return o}function Zi(i,t){return!!(t&&i&&(i.y??-.12)<De.roof.bottom&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function Gg({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new pe,f=new yn,g=new B(1,1,1),d=new pe().makeScale(0,0,0);let h=null,_=1,M=0,p=null;const m={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function y(T,L,U,I,k,Y="inside",Z=0){L=m[L]||L;let it=T;it.index&&(it=T.toNonIndexed(),T.dispose()),f.setFromEuler(new qn(0,0,Z)),it.applyMatrix4(l.compose(new B(U,I,k),f,g));const Q=`${Y}:${L}`;o.has(Q)||o.set(Q,{layer:Y,color:L,geometries:[]}),o.get(Q).geometries.push(it)}const b=(T,L,U,I,k,Y,Z,it="inside",Q=0)=>y(new Je(T,L,U),Z,I,k,Y,it,Q),A=(T,L,U,I,k,Y)=>y(new Fn(T,T,L,10),Y,U,I,k);function S(T,L,U,I,k){y(new Li(T,9,6),k,L,U,I)}b(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),b(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),b(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),b(9.2,.08,7.8,0,.16,0,"#c8a178");for(let T=-4.2;T<4.5;T+=.7)b(.018,.012,7.6,T,.21,0,"#ab8965");b(3,.22,1,0,-.04,4.3,"#d7c5a7"),b(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),b(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),b(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),b(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const T of[-2.7,2.7])b(4,3.45,.18,T,1.9,3.9,"#e7dec9","front");b(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),b(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),b(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const T of[-2.85,2.85]){b(2.35,1.55,.12,T,2.05,4.04,"#71948d","front");for(const L of[-1.2,0,1.2])b(.055,1.65,.14,T+L,2.05,4.12,"#cfbb8c","front");for(const L of[1.23,2.87])b(2.45,.065,.14,T,L,4.12,"#cfbb8c","front");b(.23,.5,.14,T<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const T of[-1,1])b(4.95,.22,8.65,T*2.37,3.98,0,"#47695f","roof",T*-.18),b(4.95,.12,.12,T*2.37,3.96,4.35,"#c1a771","roof",T*-.18);b(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const T of[-2,-.5,1])b(2.25,.06,1.25,2.5,4.08,T,"#29434f","roof",-.18);b(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),b(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),b(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),b(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),b(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),b(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),b(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),A(.05,.35,-3.85,1.05,-2.4,"#bda16a"),A(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),b(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let T=0;T<4;T++)b(1.65,.024,.03,-2.15,2.88+T*.045,-3.55,"#8d9e98");b(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),b(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),b(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const T of[.98,1.91])b(.05,.37,.08,3.29,T,-2.25,"#56746a");b(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),b(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),b(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),A(.035,.3,3.45,1.45,-1.08,"#baa371"),A(.18,.3,2.1,1.43,-.75,"#e8dcc3"),b(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),b(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),b(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),b(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),A(.2,.33,.85,.43,-3.15,"#eee9de"),b(.5,.5,.22,.85,.68,-3.65,"#eee9de"),b(.55,.12,.42,1.5,1,-2.1,"#eee9de"),A(.025,1.65,1.5,1.9,-3.65,"#baa371"),b(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),b(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),b(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const T of[1.55,4.05])b(.23,.57,1,T,.72,2.45,"#a7b3a0");b(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),b(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const T of[.7,1.7])b(.08,.4,.6,T,.48,1.4,"#8c7556");b(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),b(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),b(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),b(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let T=0;T<8;T++)b(.11,.32+T%2*.1,.22,-3.2+T*.17,1.65,3.45,T%2?"#879f93":"#e2ca9e");for(const T of[-4.9,4.9]){b(.08,.7,10,T,.19,.1,"#aa9270");for(const L of[-4.7,0,4.7])b(.13,1,.13,T,.36,L,"#aa9270")}for(const T of[-3.6,3.6])A(.29,.45,T,.14,4.65,"#b58a69"),S(.4,T,.68,4.65,"#78946e");for(const{layer:T,color:L,geometries:U}of o.values()){const I=ii(U,!1);U.forEach(Y=>Y.dispose()),e.add(I);const k=new xl(I,t(L),128);k.instanceMatrix.setUsage(ul),k.count=0,k.userData.residenceLayer=T,i.add(k),a.push(k)}o.clear();const x=new Je(1,1,1);e.add(x);const u=new Se(x,t("#b4c5ab"));u.userData.residenceGround=!0,i.add(u);const v=new Se(x,t("#e4dcc9"));i.add(v);function P(T){const L=ra(T);return{x:L.x,z:L.z}}function w(){const T=Math.max(M,s.reduce((U,I,k)=>I===null?U:k+1,0));_=Math.max(1,Math.ceil(T/8));for(const U of a){U.count=T;for(let I=0;I<T;I++){const k=s[I],Y=P(I);p!==null&&k!==p||k===null&&I>=M||k!==null&&k===(p??h)&&["roof","front"].includes(U.userData.residenceLayer)?U.setMatrixAt(I,d):U.userData.residenceLayer==="door"?U.setMatrixAt(I,l.compose(new B(Y.x-.65,0,Y.z+3.99),new yn().setFromAxisAngle(new B(0,1,0),c.has(k)?-Math.PI/2:0),g)):U.setMatrixAt(I,l.compose(new B(Y.x,0,Y.z),new yn,g))}U.instanceMatrix.needsUpdate=!0,U.computeBoundingSphere()}const L=_*12+4;u.scale.set(86,.3,L),u.position.set(0,-.55,-20-L/2),v.scale.set(1.5,.04,L),v.position.set(0,-.12,-20-L/2),u.visible=v.visible=T>0&&p===null}return{meshes:a,interior(T){p=r.has(T)?T:null,w()},slotFor:T=>r.get(T),setPlots(T){M=Math.min(128,Math.max(0,Number(T)||0)),w()},sync(T){const L=new Set(T.slice(0,128).map(U=>U.id));for(const[U,I]of r)L.has(U)||(s[I]=null,r.delete(U));for(const U of T.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(U.id)!==I&&(r.has(U.id)&&(s[r.get(U.id)]=null),r.delete(U.id))}for(const U of T.slice(0,128)){const I=U.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=U.id,r.set(U.id,I))}for(const U of[...L].sort((I,k)=>I-k))if(!r.has(U)){const I=s.indexOf(null);s[I]=U,r.set(U,I)}r.has(h)||(h=null),w()},select(T){h=r.has(T)?T:null,w()},setDoor(T,L){L?c.add(T):c.delete(T),w()},location(T){const L=r.get(T);return L===void 0?null:P(L)},bed(T){const L=this.location(T);return L?[L.x-2.05,.92,L.z-.5]:null},cameraBoxes(T){const L=this.location(T);if(!L)return[];const U=(k,Y,Z,it,Q)=>({left:L.x+k-Z/2,right:L.x+k+Z/2,back:L.z+Y-it/2,front:L.z+Y+it/2,top:Q}),I=[U(-4.6,0,.18,7.8,3.6),U(0,-3.9,9.4,.18,3.6),U(3.65,-2.78,1.05,.92,2.3),U(2.95,-.75,2.62,.95,1.3),U(2.8,2.45,2.6,1.2,1.3)];return T!==h&&I.push(U(4.6,0,.18,7.8,3.6),U(0,3.9,9.4,.18,3.6)),I},personForHit(T){return T?.object?.userData?.residenceLayer&&Number.isInteger(T.instanceId)?s[T.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-_*12,front:-20}},dispose(){a.forEach(T=>{T.dispose(),i.remove(T)}),i.remove(u,v),r.clear(),s.fill(null)}}}const kg={minX:-100,maxX:100,minZ:-216,maxZ:92},Hg={x:0,y:-.12,z:20},Vg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20},armory:{x:52,z:35,radius:5}},ti={bounds:kg,spawn:Hg,venues:Vg};function Wg(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=ti.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,f=!1,g=null,d=128;const h=(x,u=x,v=.3,P=!1)=>f?zg(x,u,g,d,Math.max(.4,v),P):[],_=x=>x.top<=wn.vault_height&&wn.vault_tags.includes(x.tag);function M(x,u,v=-.12,P=o,w=!1){return x>=t+P&&x<=e-P&&u>=n+P&&u<=s-P&&!i.concat(h({x,z:u},{x,z:u},P,w)).some(T=>!((_(T)||w)&&v>=T.top+.075||T.bottom!==void 0&&v+1.8<=T.bottom-.075)&&x>T.left-P&&x<T.right+P&&u>T.back-P&&u<T.front+P)}function p(x,u,v=o,P=!1){if(!M(u.x,u.z,u.y??-.12,v,P))return!1;for(const w of i.concat(h(x,u,v,P))){let T=0,L=1;for(const[U,I,k]of[["x",w.left-v,w.right+v],["z",w.back-v,w.front+v]]){const Y=u[U]-x[U];if(Math.abs(Y)<1e-8){if(x[U]<=I||x[U]>=k){T=2;break}}else{const Z=(I-x[U])/Y,it=(k-x[U])/Y;T=Math.max(T,Math.min(Z,it)),L=Math.min(L,Math.max(Z,it))}}if(T<=L&&L>0&&T<1){const U=x.y??-.12,I=u.y??-.12,k=U+(I-U)*Math.max(0,T),Y=U+(I-U)*Math.min(1,L);if((_(w)||P)&&Math.min(k,Y)>=w.top+.075||w.bottom!==void 0&&Math.max(k,Y)+1.8<=w.bottom-.075)continue;return!1}}return!0}function m(){if(!l){l=new Uint8Array(a*c).fill(1);for(let x=0;x<c;x++)for(let u=0;u<a;u++)(u===0||x===0||u===a-1||x===c-1)&&(l[x*a+u]=0);for(const x of i.concat(h({x:t,z:n},{x:e,z:s}))){const u=Math.max(0,Math.ceil((x.left-.4-t)/r)),v=Math.min(a-1,Math.floor((x.right+.4-t)/r)),P=Math.max(0,Math.ceil((x.back-.4-n)/r)),w=Math.min(c-1,Math.floor((x.front+.4-n)/r));for(let T=P;T<=w;T++)for(let L=u;L<=v;L++)l[T*a+L]=0}}}function y(x,u,v){const P=u.x-x.x,w=u.z-x.z,T=P*P+w*w;return v.every(L=>{const U=T?Math.max(0,Math.min(1,((L.x-x.x)*P+(L.z-x.z)*w)/T)):0;return Math.hypot(x.x+P*U-L.x,x.z+w*U-L.z)>=.62})}function b(x,u=null,v=[]){m();const P=Math.round((x.x-t)/r),w=Math.round((x.z-n)/r);let T=-1,L=1/0;for(let U=-6;U<=6;U++)for(let I=-6;I<=6;I++){const k=P+I,Y=w+U,Z=Y*a+k;if(k<0||Y<0||k>=a||Y>=c||!(u||l)[Z])continue;const it=(t+k*r-x.x)**2+(n+Y*r-x.z)**2;M(x.x,x.z)&&!p(x,{x:t+k*r,z:n+Y*r})||y(x,{x:t+k*r,z:n+Y*r},v)&&it<L&&(T=Z,L=it)}return T}function A(x){return{x:t+x%a*r,z:n+Math.floor(x/a)*r}}function S(x,u,v=[]){if(p(x,u)&&y(x,u,v))return[{x:u.x,z:u.z}];m();const P=v.length?l.slice():l;for(const tt of v){const ut=Math.round((tt.x-t)/r),Mt=Math.round((tt.z-n)/r);for(let At=-2;At<=2;At++)for(let O=-2;O<=2;O++){const ct=ut+O,wt=Mt+At;ct>=0&&wt>=0&&ct<a&&wt<c&&Math.hypot(t+ct*r-tt.x,n+wt*r-tt.z)<.76&&(P[wt*a+ct]=0)}}const w=b(x,P,v),T=b(u,P,v);if(w<0||T<0)return[];const L=[],U=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),k=new Uint8Array(a*c),Y=tt=>Math.abs(tt%a-T%a)+Math.abs(Math.floor(tt/a)-Math.floor(T/a));function Z(tt,ut){L.push({index:tt,score:ut});let Mt=L.length-1;for(;Mt>0;){const At=Mt-1>>1;if(L[At].score<=ut)break;[L[Mt],L[At]]=[L[At],L[Mt]],Mt=At}}function it(){const tt=L[0],ut=L.pop();if(L.length){L[0]=ut;let Mt=0;for(;;){let At=Mt,O=Mt*2+1,ct=O+1;if(O<L.length&&L[O].score<L[At].score&&(At=O),ct<L.length&&L[ct].score<L[At].score&&(At=ct),At===Mt)break;[L[Mt],L[At]]=[L[At],L[Mt]],Mt=At}}return tt.index}U[w]=0,Z(w,Y(w));let Q=0;for(;L.length&&Q++<a*c;){const tt=it();if(k[tt])continue;if(k[tt]=1,tt===T){const At=[];let O=tt;for(;O!==w;)At.push(A(O)),O=I[O];return At.reverse(),M(u.x,u.z)&&p(At.at(-1)||A(w),u)&&y(At.at(-1)||A(w),u,v)&&At.push({x:u.x,z:u.z}),M(x.x,x.z)&&At.unshift(A(w)),At}const ut=tt%a,Mt=Math.floor(tt/a);for(const[At,O]of[[1,0],[-1,0],[0,1],[0,-1]]){const ct=ut+At,wt=Mt+O,Lt=wt*a+ct;if(ct<0||wt<0||ct>=a||wt>=c||!P[Lt]||k[Lt]||!p(A(tt),A(Lt))||!y(A(tt),A(Lt),v))continue;const xt=U[tt]+1;xt<U[Lt]&&(U[Lt]=xt,I[Lt]=tt,Z(Lt,xt+Y(Lt)))}}return[]}return{configureHomes(x,u=null,v=d){f===!!x&&u===g&&v===d||(f=!!x,g=u,d=v,l=null)},withHomeAccess(x,u){if(!f||x===void 0||x===g)return u();const v=g,P=l;g=x,l=null;try{return u()}finally{g=v,l=P}},groundHeight(x,u=!1,v=o){const P=Math.round((x.x+36.75)/10.5),w=Math.round((-28-x.z)/12);let T=f&&P>=0&&P<8&&w>=0&&w*8+P<d&&Zi({...x,y:-.12},ra(w*8+P))?.22:-.12;for(const L of i.concat(h(x,x,v,u)))(_(L)||u)&&(x.y??-.12)>=L.top+.07&&x.x>L.left-v&&x.x<L.right+v&&x.z>L.back-v&&x.z<L.front+v&&(T=Math.max(T,L.top+.08));return T},boxes:()=>i.map(x=>({...x})),slide(x,u,v=o,P=!1){const w={...u,y:u.y??x.y};return p(x,w,v,P)?{x:u.x,z:u.z}:p(x,{...w,z:x.z},v,P)?{x:u.x,z:x.z}:p(x,{...w,x:x.x},v,P)?{x:x.x,z:u.z}:{x:x.x,z:x.z}},addBox(x,u,v,P,w="",T=2){i.push({left:v-x/2,right:v+x/2,back:P-u/2,front:P+u/2,top:T,tag:w}),l=null},cameraLimit(x,u,v=[]){let P=1;for(const w of i.concat(v)){let T=0,L=1;for(const[U,I,k]of[["x",w.left-.15,w.right+.15],["z",w.back-.15,w.front+.15],["y",-.3,w.top+.15]]){const Y=u[U]-x[U];if(Math.abs(Y)<1e-8){if(x[U]<I||x[U]>k){T=2;break}}else{const Z=(I-x[U])/Y,it=(k-x[U])/Y;T=Math.max(T,Math.min(Z,it)),L=Math.min(L,Math.max(Z,it))}}T<=L&&T>.01&&T<P&&(P=Math.max(.02,T-.015))}return P},free:M,segment:p,path:S,nearest(x){const u=b(x);return u<0?null:A(u)},move(x,u,v){const P=Math.hypot(u.x-x.x,u.z-x.z),w=P>0?Math.min(1,v/P):0,T={x:x.x+(u.x-x.x)*w,z:x.z+(u.z-x.z)*w};return p(x,T)?T:{x:x.x,z:x.z}}}}function Xg({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new Rn;i.add(a);const c=Rt=>(t.add(Rt),Rt);function l(Rt,Pt){const Vt=new Cs(Pt);return e.set("environment:"+Rt,Vt),Vt}const f=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),d=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),h=l("forest",{color:"#4c7262",roughness:1}),_=new Se(c(new Si(850,850)),f);_.rotation.x=-Math.PI/2,_.position.y=-1.3,a.add(_);const M=[],p=[],m=[],y=new pe,b=new yn;function A(Rt,Pt,Vt,Wt,ue,ve=1,Fe=1,Ie=1){const Ve=Rt.index?Rt.toNonIndexed():Rt;Ve!==Rt&&Rt.dispose(),Ve.applyMatrix4(y.compose(new B(Vt,Wt,ue),b,new B(ve,Fe,Ie))),Pt.push(Ve)}for(let Rt=0;Rt<20;Rt++){const Pt=Rt/20*Math.PI*2,Vt=Math.cos(Pt)*(155+Rt%3*18),Wt=-70+Math.sin(Pt)*230,ue=35+Rt%5*13,ve=25+Rt%4*9;A(new oi(ve,ue,7),M,Vt,ue/2-1.3,Wt,1.2,1,1),A(new oi(ve*.28,ue*.28,7),p,Vt,ue*.86-1.25,Wt,1.2,1,1)}for(let Rt=0;Rt<100;Rt++){const Pt=Rt%2?-1:1,Vt=Pt*(51+Rt%9*4),Wt=-210+Math.floor(Rt/2)*5.4,ue=3.5+Rt%4;A(new oi(1.3+Rt%3*.25,ue,6),m,Vt,ue/2-.8,Wt),Wt>=-22&&Wt<=92&&o?.addBox(2.6,2.6,Vt,Wt,"forest-tree",ue)}function S(Rt,Pt){const Vt=c(ii(Rt,!1));Rt.forEach(ue=>ue.dispose());const Wt=new Se(Vt,Pt);return a.add(Wt),Wt}const x=S(M,g),u=S(p,d),v=S(m,h),P=[];for(let Rt=0;Rt<14;Rt++)for(let Pt=0;Pt<4;Pt++)A(new Li(1,9,6),P,-100+Rt%7*32+(Pt-1.5)*4,29+Rt%4*4+Pt%2*1.5,-120+Math.floor(Rt/7)*165,7,3.2,4.8);const w=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),T=S(P,w),L=6e3,U=new Float32Array(L*3),I=new Float32Array(L*6),k=[];for(let Rt=0;Rt<L;Rt++)k.push({x:Rt*73.31%64-32,y:Rt*17.73%32,z:Rt*41.71%70-35});const Y=c(new $e);Y.setAttribute("position",new xn(U,3)),Y.setDrawRange(0,320);const Z=new Ml({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",Z);const it=new Fh(Y,Z);it.frustumCulled=!1,a.add(it);const Q=c(new $e);Q.setAttribute("position",new xn(I,3));const tt=new vl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",tt);const ut=new Uh(Q,tt);ut.frustumCulled=!1,a.add(ut);const Mt=c(new Si(260,24,48,4)),At=new Float32Array(Mt.attributes.position.count*3);for(let Rt=0;Rt<Mt.attributes.position.count;Rt++)new ne().setHSL(.38+Rt%49/49*.34,.75,.62).toArray(At,Rt*3);Mt.setAttribute("color",new xn(At,3));const O=new ni({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:fn,blending:ir});e.set("environment:aurora",O);const ct=new Se(Mt,O);ct.position.set(0,55,-235),a.add(ct);const wt=Mt.attributes.position.array.slice();let Lt={},xt=0,Zt="",Le="",Ht=!1,me=-60;const he={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function re(Rt){const Pt=Su(Lt,Date.now()+xt).mode;if(Pt===Zt&&Le===`${Lt.landscape}:${Rt}`)return;Zt=Pt,Le=`${Lt.landscape}:${Rt}`;const Vt=he[Lt.landscape]||he.alps;f.color.set(Vt[0]),g.color.set(Vt[1]),h.color.set(Vt[2]);const Wt=Pt==="aurora";i.background=new ne(Wt?"#102339":Rt?"#142730":Pt==="rain"?"#a6babd":Pt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new Qo(i.background,Pt==="mist"?.007:Pt==="rain"?.0035:.0013),n.intensity=Wt?.6:Pt==="rain"?1.35:Rt?1.65:2.7,s.intensity=Wt?1.6:Rt?2.05:2.6,r.intensity=Wt?1.8:1.1,w.color.set(Pt==="rain"?"#859c9f":"#f5f2e9"),Z.color.set("#ffffff"),Z.size=.13}return{configure(Rt={},Pt=!1){Lt=Rt.settings||{},Number.isFinite(Rt.server_ms)&&(xt=Rt.server_ms-Date.now()),Ht=Pt,x.visible=u.visible=Lt.mountains!==!1,T.visible=Lt.clouds!==!1;const Vt=Lt.precipitation||"heavy",Wt=Ht?900:Vt==="light"?650:Vt==="storm"?5800:3600;Y.setDrawRange(0,Wt),Q.setDrawRange(0,Wt*2),Le=""},update(Rt,{paused:Pt=!1,dark:Vt=!1,center:Wt=null}={}){re(Vt);const ue=Zt,ve=Pt?0:Rt/1e3;if(T.position.x=Pt?0:Math.sin(ve*.012)*9,it.visible=ue==="snow",ut.visible=ue==="rain",ct.visible=ue==="aurora",it.visible||ut.visible){const Fe=Y.drawRange.count,Ie=Wt?.x||0,Ve=Wt?.z||0;for(let H=0;H<Fe;H++){const We=k[H],ce=We.x+Ie+Math.sin(ve*.4+H)*(ue==="snow"?.55:.1),ye=(We.y-ve*(ue==="snow"?1.4:20)%32+32)%32,bt=We.z+Ve;if(ue==="snow")U[H*3]=ce,U[H*3+1]=ye,U[H*3+2]=bt;else{const Jt=H*6;I[Jt]=ce,I[Jt+1]=ye,I[Jt+2]=bt,I[Jt+3]=ce+.1,I[Jt+4]=ye-.9,I[Jt+5]=bt}}(ue==="snow"?Y:Q).attributes.position.needsUpdate=!0}if(ct.visible){const Fe=Mt.attributes.position.array;for(let Ie=0;Ie<Fe.length;Ie+=3)Fe[Ie+1]=wt[Ie+1]+Math.sin(wt[Ie]*.035+ve*.3)*5,Fe[Ie+2]=Math.cos(wt[Ie]*.02+ve*.17)*9;Mt.attributes.position.needsUpdate=!0}},extent(Rt){Rt!==me&&(me=Rt,v.scale.z=Math.max(1,Math.abs(Rt)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function Yg({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let S=-40;S<=-20;S+=2)for(let x=43;x<=59;x+=2)t(1.98,.025,1.98,S,-.18,x,(S+x)/2%2?"#e8dfcb":"#d1c6ac",0);for(const S of[-41.3,-18.7])t(.15,.09,20,S,-.1,51,"gold",0),t(.35,1.4,19.8,S,.45,51,"deep"),a.addBox(.35,19.8,S,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const S of[-40,-20])for(const x of[42.5,50.5,59.5])e(.35,.25,S,-.03,x,"gold"),e(.2,4.7,S,2.3,x,"white"),e(.38,.22,S,4.7,x,"gold"),a.addBox(.75,.75,S,x,"grand-bar-column",4.9);for(const S of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,S,"gold");for(const x of[-36,-24]){const u=new vi(2,.075,6,24,Math.PI);s(u,"gold",x,3.4,S)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const S of[41.65,42.3])t(15,.14,.7,-30,1.5+(S-41.65)*2,S,"wood");for(let S=0;S<14;S++){const x=-36.5+S;e(.11,.55,x,1.87,41.8,S%2?"#87b6a5":"#b89c68"),e(.04,.14,x,2.22,41.8,"gold")}for(const S of[-37,-34,-31,-28,-25,-22])e(.37,.16,S,.57,47.4,"deep"),e(.065,.8,S,.08,47.4,"gold"),e(.28,.06,S,-.12,47.4,"gold"),a.addBox(.75,.75,S,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[S,x,u]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,S,4.8,x,"gold"),s(new vi(u,.035,6,28),"gold",S,4,x,Math.PI/2);for(let v=0;v<12;v++){const P=v*Math.PI/6,w=S+Math.cos(P)*u,T=x+Math.sin(P)*u;e(.014,.46,w,3.75,T,"gold"),n(.09,.19,.09,w,3.47,T,"white")}}for(const S of[-38,-22])t(2.1,.65,5.1,S,.15,54,"#856c8c",.18),t(.3,1,5.2,S+(S<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,S,54,"velvet-booth",1.3),e(.68,.12,S+(S<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,S+(S<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,S+(S<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const f=["#87668e","#508a87","#b99c68","#5c708c"];for(let S=0;S<8;S++)for(let x=0;x<6;x++)t(1.04,.025,1.02,-33.7+S*1.06,.035,53.4+x*1.06,f[(S+x)%4],.015);for(const S of[-34.5,-25.5])t(.04,.06,6.6,S,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const S of[-31.4,-28.6])e(.57,.08,S,1.24,51.1,"black"),e(.15,.1,S,1.3,51.1,"gold");for(let S=0;S<6;S++)t(.1,.09,.22,-30.65+S*.25,1.26,51.3,"white",.01);for(const S of[-34.5,-25.5]){t(1,2.3,.8,S,1,51,"black");for(const x of[.45,1.35]){const u=new Fn(.31,.31,.05,12);s(u,"metal",S,x,51.43,Math.PI/2)}a.addBox(1,.8,S,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new Cs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const d=new ea(.62,2);c.add(d);const h=new Se(d,g);h.position.set(-30,4.6,56),i.add(h);const _=new ni({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:fn,blending:ir});l.set("rivage-beams",_);const M=new oi(1.5,3.4,10,1,!0);c.add(M);const p=[];for(const S of[-33,-27])for(const x of[54,58]){const u=new Se(M,_);u.position.set(S,2,x),u.userData.rivageEffect="beam",i.add(u),p.push(u)}const m=[],y=new ni({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",y);for(const[S,x,u,v,P,w,T]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const L=new Je(x,u,v);c.add(L);const U=new Se(L,y);U.position.set(P,w,T),U.userData.officeVenue=S,i.add(U),m.push(U)}const b=f.map(S=>{const x=o(S);return x.emissive.set(S),x});let A=!0;return{targets:m,setEnabled(S){A=!!S},update(S,{paused:x,energySaver:u}){x||(h.rotation.y=S/18e3);const v=x||u||!A;for(const P of p)P.visible=!v;for(let P=0;P<b.length;P++)b[P].emissiveIntensity=v?.13:.2+Math.sin(S/4500+P)*.05}}}function qg(i,t=ti.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1,c=!!t.air_access,l=t.y??-.12;const f=(h,_,M)=>Math.max(_,Math.min(M,h));function g(h,_={},M=0,p=[]){const m=f(Number(h)||0,0,.05);let y=Number(_.x)||0,b=Number(_.z)||0;r&&Date.now()>=o&&d(null);const A=Math.hypot(y,b);A>1&&(y/=A,b/=A),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const S=!!(_.boost&&A&&s),x=S?9:4.5;e.stamina=f(e.stamina+(S?-23:14)*m,0,100);const u=(Math.cos(M)*y-Math.sin(M)*b)*x,v=(-Math.sin(M)*y-Math.cos(M)*b)*x;e.vx=u,e.vz=v;const P=i.groundHeight?.(e,c,r?.radius||.3)??-.12;e.grounded&&(l=P),e.grounded&&e.y>P+.08&&(e.grounded=!1),!e.flight&&!a&&_.jump&&!n&&(e.grounded||e.jumps<wn.maximum_jumps)&&(e.vy=wn.jump_speed,e.grounded=!1,e.jumps++),n=!!_.jump;const w=e.y;if(e.flight)e.vy=(+!!_.jump-+!!_.descend)*wn.flight_speed,e.y=f(e.y+e.vy*m,P,wn.flight_maximum_y),e.grounded=!1;else if(a)e.y=Math.max(P,e.y-wn.landing_speed*m),e.vy=-4,e.y<=P&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0);else if(e.grounded)e.y=P;else{e.vy-=wn.gravity*m;const U=c?Math.min(wn.flight_maximum_y,Math.max(wn.maximum_y,l+wn.maximum_y+.12)):wn.maximum_y;e.y=e.vy>0?Math.min(U,e.y+e.vy*m):e.y+e.vy*m,e.y<=P&&(e.y=P,e.vy=0,e.grounded=!0,e.jumps=0)}let T=i.slide({...e,y:Math.min(w,e.y)},{x:e.x+u*m,y:e.y,z:e.z+v*m},r?.radius||.3,c);p.some(U=>e.y<(U.y??-.12)+1.8&&e.y+(r?.height||1.8)>(U.y??-.12)&&Math.hypot(T.x-U.x,T.z-U.z)<.62&&Math.hypot(T.x-U.x,T.z-U.z)<=Math.hypot(e.x-U.x,e.z-U.z)+1e-4)&&(T={x:e.x,z:e.z});const L=Math.hypot(T.x-e.x,T.z-e.z)>1e-4;if(e.x=T.x,e.z=T.z,c&&e.grounded){const U=i.groundHeight?.(e,!0,r?.radius||.3)??-.12;e.y>U+.08?e.grounded=!1:!e.flight&&e.y<=(i.groundHeight?.(e,!1)??-.12)+.12&&(c=!1)}return e.air_access=c,L&&(e.yaw=Math.atan2(u,v)),e.action=e.flight?"fly":a?"land":e.grounded?L?S?"run":"walk":"idle":"jump",{...e}}function d(h,_=1/0){!h&&e.flight&&(e.flight=!1,a=!e.grounded),r=h,o=_}return{step:g,setForm:d,toggleFlight(){return r?.fly?(e.flight=!e.flight,e.flight&&(c=!0),a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e,air_access:c}),reset(h){c=!!(h.air_access??c);const _=i.groundHeight?.(h,c,r?.radius||.3)??-.12;e={...e,...h,vx:0,vz:0,vy:0,jumps:0,grounded:(h.y??-.12)<=_+.01},l=_,a=!e.flight&&!e.grounded&&e.y>wn.maximum_y},face(h){e.yaw=Math.atan2(h.x-e.x,h.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function kr(i,t){const e=ti.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function Vc(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(p,m,y,b,A,S=0){S&&p.rotateZ(S),p.translate(y,b,A);const x=p.index?p.toNonIndexed():p;x!==p&&p.dispose();const u=new ne(m),v=new Float32Array(x.attributes.position.count*3);for(let P=0;P<v.length;P+=3)v[P]=u.r,v[P+1]=u.g,v[P+2]=u.b;x.setAttribute("color",new xn(v,3)),r.push(x)}const a=(p,m,y,b,A,S,x,u=0)=>o(new Je(p,m,y),b,A,S,x,u),c=(p,m,y,b,A,S,x=p)=>o(new Fn(x,p,m,10),y,b,A,S),{accent:l,hair:f,motif:g,accessory:d,hairStyle:h,shirt:_}=i;if(t==="head"){if(a(.49,.16,.45,f,0,.23,-.02),a(.45,h==="long"?.72:.29,.13,f,0,h==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(h))for(const p of[-1,1])a(.09,h==="long"?.6:.33,.32,f,p*.24,-.02,-.03);if(h==="spiky")for(let p=0;p<7;p++)o(new oi(.11,.27+p%3*.06,5),f,(p-3)*.066,.39+Math.sin(p)*.025,-.06,(p-3)*-.16);if(h==="split"&&a(.245,.18,.46,l,.123,.24,-.015),h==="side"&&a(.26,.25,.05,f,-.12,.08,.218,-.18),h==="ponytail"&&a(.27,.5,.25,f,0,-.15,-.37),d.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),d==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),d==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,_,0,.395,0)),d==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const p of[-1,1])a(.06,.33,.06,"#94745a",p*.3,.64,0,p*-.3),a(.15,.055,.06,"#94745a",p*.36,.72,0)}if(d==="bamboo"){const p=new Fn(.052,.052,.35,10);p.rotateZ(Math.PI/2),o(p,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(d==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),d==="goggles"||d==="glasses")for(const p of[-1,1])a(.19,.12,.06,l,p*.12,d==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",p*.12,d==="goggles"?.23:.04,.271);if(d==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const p of[-1,1])a(.12,.2,.08,"#aba2a6",p*.2,.31,0,p*-.35),a(.06,.055,.025,"#84aabb",p*.14,.07,.208)}if(d==="butterfly")for(const p of[-1,1])a(.18,.17,.045,l,p*.15,.31,-.12,p*.4);if(d==="earrings")for(const p of[-1,1])a(.045,.15,.035,"#e9d6bc",p*.26,-.19,.02);if(i.id==="naruto")for(const p of[-1,1])for(let m=0;m<3;m++)a(.08,.012,.01,"#9f7055",p*.15,-.055-m*.033,.208,p*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){a(.028,.53,.035,l,0,1.23,.19);for(const p of[-1,1])a(.14,.37,.04,l,p*.14,1.26,.19,p*.08);if(g==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let p=0;p<3;p++)a(.03,.03,.035,"#eee2ba",0,1.13+p*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let p=0;p<4;p++)for(let m=0;m<4;m++){const y=(m-1.5)*.112,b=1+p*.13;g==="checks"&&(p+m)%2===0&&a(.11,.127,.025,l,y,b,.19),g==="triangles"&&(p+m)%2===0&&o(new oi(.035,.065,3),l,y,b,.205),g==="clouds"&&p%2===0&&m%2===0&&(a(.13,.045,.03,l,y,b,.2),c(.04,.03,l,y,b+.035,.2))}if(g==="circle"&&o(new vi(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let p=0;p<3;p++)a(.32,.015,.02,"#b6a273",0,1.19+p*.07,.26)}else if(g==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const p of[-1,1])a(.12,.51,.07,l,p*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const p of[-1,1])a(.065,.52,.04,l,p*.1,1.23,.2,p*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(d))for(let p=0;p<(d==="swords"?3:1);p++){const m=.3+p*.06;a(.055,.83,.055,"#373d4a",m,.92,-.18,-.25),a(.09,.23,.07,l,m+.1,1.4,-.18,-.25)}if(d==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(d))for(const p of[-1,1])a(d==="gauntlets"?.27:.2,.2,.24,l,p*.37,.99,.05)}const M=ii(r,!1);return r.forEach(p=>p.dispose()),n.add(M),e.set(s,M),M}function Ms(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function Zg(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(Di.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(c>=.72&&o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const f=t.clone().add(new B(o.x*.4,l,o.z*.4));if(f.sub(t).clampLength(s,r).add(t),i.cameraLimit(t,f,n)>=.99)return f}return t.clone().add(new B(0,Di.clamp(6,s,r),0))}function Kg(){let i=null,t=!1,e=0,n=null;return{reset(){i=null,n=null,t=!1,e=0},resolve(s,r,o,a=[],c=3.6,l=35,f=1/30){const g=Di.clamp(Number(f)||.03333333333333333,.001,.06),d=Zg(s,r,o,a,c,l),h=d.sub(r),_=o.clone().sub(r).clampLength(c,l);if(h.distanceTo(_)>.05?(t=!0,e=0,n=h.clone()):t&&(e+=g,e<.35&&n?h.copy(n):(t=!1,n=null)),!i)i=h.clone();else{const p=h.clone().sub(i).multiplyScalar(1-Math.exp(-g*7));p.clampLength(0,Math.max(8,c*2)*g),i.add(p)}return i.clampLength(c,l),r.clone().add(i)}}}function Jg({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new Cs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,f,g,d,h]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"],["KAIA",52,32.9,!0,"armorer","#375976"]]){let p=function(b,A,S,x,u,v,P){let w=new Je(b,A,S).toNonIndexed();w.translate(x,u,v);const T=new ne(P),L=new Float32Array(w.attributes.position.count*3);for(let U=0;U<L.length;U+=3)T.toArray(L,U);w.setAttribute("color",new xn(L,3)),M.push(w)};const _=new Rn;_.position.set(l,-.12,f),_.userData.hospitality=d,i.add(_);const M=[];if(p(.49,.66,.32,0,1.15,0,h),p(.41,.45,.4,0,1.7,0,"#e4b492"),p(.46,.16,.45,0,1.96,-.02,g?"#51352e":"#29272d"),p(.46,g?.65:.27,.13,0,g?1.66:1.82,-.21,g?"#51352e":"#29272d"),g){for(const b of[-1,1])p(.07,.43,.29,b*.23,1.74,-.03,"#51352e"),p(.05,.025,.02,b*.13,1.65,.209,"#cf8790");p(.58,.3,.38,0,.81,0,h)}for(const b of[-1,1])p(.035,.04,.025,b*.1,1.73,.207,"#253b36"),p(.18,.65,.2,b*.14,.45,0,"#263e39"),p(.22,.13,.33,b*.14,.08,.06,"#1c2b28"),p(.16,.4,.2,b*.33,1.2,0,h),p(.15,.26,.16,b*.33,.9,.04,"#e4b492");p(.09,.025,.025,0,1.58,.21,"#b66c78"),(d==="hostess"||d==="bartender")&&(p(.3,.49,.035,0,1.02,.18,g?"#c6a971":"#253e38"),p(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),p(.1,.07,.04,0,1.44,.19,"#374941"),p(.45,.04,.3,.36,.89,.17,"#c5ab71"),p(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const m=ii(M,!1);M.forEach(b=>b.dispose()),e.add(m);const y=new Se(m,r);y.userData.officeVenue=d==="armorer"?"armory":d==="dj"?"disco":"bar",_.add(y),a.push(y),o.push(_),t.addBox(.68,.68,l,f,"hospitality-npc",2.1),d==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,f)}return{targets:a,update(c,l){o.forEach((f,g)=>{f.rotation.y=g<2?Math.sin((l?0:c)/4500+g)*.1:0,f.children[0].position.y=l?0:Math.sin(c/1800+g)*.018})}}}const jn=(i,t,e)=>i+(t-i)*e;function $g(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),f=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let g=r?o?.16:.06:0,d=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const h=[f,-f],_=[-f*.85,f*.85],M=[0,0],p=i.officeAnimation??={airborne:!1,landing:0};if(t?.action==="jump"){const y=Math.max(-1,Math.min(1,(t.vy??0)/7)),b=Math.max(0,y),A=Math.max(0,-y);g=-.1+A*.12,h[0]=.18+b*.4,h[1]=.24+b*.28,_[0]=-.65-b*.2,_[1]=-.6-A*.18,d=0,p.airborne=!0,p.landing=0}else p.airborne&&(p.airborne=!1,t?.grounded!==!1&&!["fly","land","rest"].includes(t?.action)&&(p.landing=.18));if(p.landing>0&&(p.landing=Math.max(0,p.landing-n),!a&&!s)){const y=Math.sin(p.landing/.18*Math.PI);d-=y*.09,g+=y*.06}t?.action==="fly"&&(g=.16,h.fill(.3),_.fill(.15),M[0]=-.12,M[1]=.12,d=0),t?.action==="land"&&(g=-.06,h.fill(.35),_.fill(-.3),d=0),a&&(g=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,d=c?.4:-.5,h.fill(c?0:-1.25),_.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(M[0]=-.3,M[1]=.3),s||(d+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(_[1]=-.8+(s?0:Math.sin(e*3)*.45),_[0]=-.3,g=.07),t?.action==="cast"&&(_[0]=t.skillPose==="beam"?-1.25:-.9,_[1]=-1.4,h[0]=-.12,h[1]=.2,g=.12),t?.action==="drink"&&(_[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(_[0]=-1),t?.action==="dance"&&(_[0]=-.8,_[1]=-.7,h[0]=s?0:Math.sin(e*2.4)*.2,h[1]=-h[0]),i.body.rotation.x=jn(i.body.rotation.x,g,l),i.body.position.y=jn(i.body.position.y,d,l),i.body.rotation.z=jn(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((y,b)=>{y.rotation.x=jn(y.rotation.x,h[b],l),y.rotation.z=jn(y.rotation.z,M[b],l)}),i.arms.forEach((y,b)=>{y.rotation.x=jn(y.rotation.x,_[b],l),y.rotation.z=jn(y.rotation.z,o?b?-.12:.12:0,l)}),i.head.rotation.x=jn(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=jn(i.head.rotation.y,0,l);const m=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(y=>y.scale.y=jn(y.scale.y,m,l)),{lying:c,moving:r}}function Qg(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(f=>Math.hypot(f.x-c,f.z-l)>.65)})))return s}return null}function Wc(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(d=>Math.hypot(d.x-a.x,d.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,f=c*c+l*l;if(f&&n.some(d=>{const h=Math.max(0,Math.min(1,((d.x-t.x)*c+(d.z-t.z)*l)/f));return Math.hypot(t.x+c*h-d.x,t.z+l*h-d.z)<.62&&h>0}))continue;const g=s?Qg(i,a,n):t.yaw||0;if(g!==null)return{...a,yaw:g}}return null}function jg(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function f(S,x=!1){const u=S+x;return o.has(u)||o.set(u,new i.MeshStandardMaterial({color:S,emissive:S,emissiveIntensity:x?.55:.13,roughness:.55,metalness:.18,transparent:x,opacity:x?.78:1,depthWrite:!x})),o.get(u)}function g(S,x,u,v,P,w,T=!1){r.add(x);const L=new i.Mesh(x,f(u,T));return L.position.set(v,P,w),S.add(L),L}const d=(S,x,u,v,P,w,T,L,U=!1)=>g(S,new i.BoxGeometry(x,u,v),P,w,T,L,U),h=(S,x,u,v,P,w,T,L,U=!1)=>{const I=g(S,new i.SphereGeometry(1,10,7),L,x,u,v,U);return I.scale.set(P,w,T),I},_=(S,x,u,v,P,w,T)=>g(S,new i.ConeGeometry(x,u,5),v,P,w,T,!0),M=(S,x,u)=>{const v=new i.Group;return v.position.set(S,x,u),s.add(v),v},p=t.color,m=t.accent||"#eddbff",y=t.dark||"#36214f";if(t.model==="susanoo"){d(s,1.75,1.65,.85,p,0,3.7,0),d(s,1.1,.65,.75,p,0,2.65,0);for(let P=0;P<5;P++)for(const w of[-1,1]){const T=d(s,.74,.055,.07,m,w*.4,3.15+P*.25,.46,!0);T.rotation.z=w*.18}d(s,1.45,.24,.95,y,0,2.5,0);for(let P=0;P<5;P++){const w=P*Math.PI*2/5,T=d(s,.85,1,.16,p,Math.sin(w)*.68,2.05,Math.cos(w)*.53);T.rotation.y=w,T.rotation.z=Math.sin(w)*.12}for(const P of[-1,1]){const w=M(P*.47,1.7,0);d(w,.52,1.1,.58,p,0,-.4,0),d(w,.64,.4,.7,y,0,-.8,.04),d(w,.48,.65,.56,p,0,-1.2,0),d(w,.6,.3,.95,p,0,-1.57,.2),l.push({node:w,side:P,kind:"leg"});const T=M(P*1.08,4.25,0);d(T,.6,1.1,.65,p,0,-.45,0),d(T,.75,.35,.85,m,0,.04,0),d(T,.64,.85,.65,y,0,-1.25,0),d(T,.58,.35,.55,p,0,-1.85,.07),l.push({node:T,side:P,kind:"arm"});for(let k=0;k<3;k++)d(s,.95,.16,.85,p,P*(1.03+k*.05),4.38-k*.17,0);const L=M(P*.72,4.35,-.43);L.userData.wingSide=P,a.push(L);const U=d(L,2.2,.24,.23,m,P*1,1.02,-.1,!0);U.rotation.z=P*.48;for(let k=0;k<3;k++)for(let Y=0;Y<(n?5:8);Y++){const Z=d(L,.48,1.2+k*.3,.12,p,P*(.55+Y*.37),.75-k*.56+Y*.12,-.12-k*.04,!0);Z.rotation.z=-P*.55}const I=_(L,.16,.55,m,P*2.2,1.7,-.1);I.rotation.z=-P*.8}const S=M(0,5.05,.02);d(S,.76,.85,.7,p,0,0,0),d(S,.53,.25,.45,y,0,-.25,.25);for(const P of[-1,1]){const w=d(S,.22,.07,.08,"#fff89e",P*.18,.04,.4,!0);w.rotation.z=-P*.25;const T=_(S,.17,.95,p,P*.42,.55,0);T.rotation.z=-P*.38}const x=_(S,.16,.63,m,0,-.02,.58);x.rotation.x=Math.PI/2;const u=d(S,.18,.22,.05,"#e7abff",0,.29,.39,!0);u.rotation.z=Math.PI/4;for(let P=-2;P<=2;P++){const w=_(S,.16,.8+Math.abs(P)*.1,p,P*.16,.85,-.08);w.rotation.z=-P*.15}const v=M(-1.15,2.28,.18);d(v,.14,.8,.14,y,0,0,0),d(v,.7,.1,.25,m,0,-.15,0),d(v,.24,2.4,.08,m,0,-1.4,0,!0),v.rotation.z=-.5,e==="itachi"&&(a.forEach(P=>P.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){h(s,0,2.1,-.12,1,1.35,.75,p),h(s,0,3.52,.35,.82,.78,.65,p),h(s,0,3.27,.98,.5,.27,.5,m),h(s,0,3.45,1.31,.19,.13,.13,y);for(const S of[-1,1]){const x=_(s,.39,1.3,p,S*.58,4.3,.14);x.rotation.z=-S*.22,d(s,.27,.1,.09,"#fff5c2",S*.38,3.66,.95,!0),d(s,.045,.14,.045,"#b93237",S*.38,3.66,1.01,!0);const u=d(s,.39,.1,.06,y,S*.48,3.56,.92);u.rotation.z=S*.4;const v=_(s,.08,.25,"#fff2c8",S*.23,3.11,1.18);v.rotation.z=Math.PI;for(let T=0;T<3;T++){const L=d(s,.65,.035,.04,y,S*.62,3.3-T*.12,1.02);L.rotation.z=S*(T-1)*.15}const P=M(S*.9,2.85,.1);h(P,0,-.4,.15,.33,.78,.35,p),h(P,0,-1.04,.33,.43,.22,.44,m),l.push({node:P,side:S,kind:"arm"});const w=M(S*.52,1.1,-.05);h(w,0,-.35,0,.4,.7,.4,p),h(w,0,-.85,.25,.5,.25,.6,m),l.push({node:w,side:S,kind:"leg"});for(let T=0;T<3;T++)_(P,.08,.28,y,(T-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let S=0;S<9;S++){const x=(S-4)*.42,u=M(Math.sin(x)*.25,1.6,-.6);u.rotation.y=x,u.userData.tailIndex=S;const v=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(U=>new i.Vector3(...U))),P=14,w=7,T=new i.TubeGeometry(v,P,.4,w,!1),L=T.attributes.position;for(let U=0;U<=P;U++){const I=v.getPointAt(U/P),k=1-.93*Math.pow(U/P,1.5);for(let Y=0;Y<=w;Y++){const Z=U*(w+1)+Y,it=new i.Vector3().fromBufferAttribute(L,Z).sub(I).multiplyScalar(k).add(I);L.setXYZ(Z,it.x,it.y,it.z)}}T.computeVertexNormals(),g(u,T,p,0,0,0,!0),c.push(u)}}else{if(t.model==="saiyan")for(let S=0;S<9;S++){const x=S*Math.PI*2/9,u=_(s,.13,.7,p,Math.sin(x)*.2,2.03,Math.cos(x)*.17);u.rotation.z=-Math.sin(x)*.7,u.rotation.x=Math.cos(x)*.6}if(t.model==="gear5"){for(let S=0;S<7;S++)h(s,Math.sin(S)*.2,1.91+Math.cos(S)*.07,Math.cos(S)*.13,.19,.16,.19,"#fff9ef");for(const S of[-1,1])for(let x=0;x<6;x++)h(s,S*(.35+x*.08),1.2+Math.sin(x)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const S=_(s,.12,.6,m,.19,1.96,.09);S.rotation.z=-.25;for(let x=0;x<6;x++){const u=d(s,.04,.12,.03,y,Math.sin(x)*.23,1.02+x*.09,.2);u.rotation.z=x*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),h(s,0,1.05,0,.42,.5,.29,p);for(const S of[-1,1]){const x=d(s,.06,.65,.06,m,S*.38,1.9,0);x.rotation.z=-S*.5}}if(t.model==="slayer")for(let S=0;S<8;S++){const x=_(s,.12,.5,p,Math.sin(S)*.42,.3+S*.14,Math.cos(S)*.35);x.rotation.z=Math.sin(S)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let S=0;S<8;S++){const x=d(s,.04,.38,.04,t.model==="icefire"&&S%2?"#ff9366":p,Math.sin(S)*.4,.35+S*.17,Math.cos(S)*.28,!0);x.rotation.z=S%2?.5:-.5}}const b=g(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),p,0,.06,0,!0);b.rotation.x=-Math.PI/2;function A(S){for(const u of[...S.children])u.isGroup&&A(u);const x=new Map;for(const u of[...S.children])if(u.isMesh){u.updateMatrix();const v=u.geometry.index?u.geometry.toNonIndexed():u.geometry.clone();v.applyMatrix4(u.matrix),x.has(u.material)||x.set(u.material,[]),x.get(u.material).push(v),S.remove(u),u.geometry.dispose(),r.delete(u.geometry)}for(const[u,v]of x){const P=ii(v,!1);v.forEach(w=>w.dispose()),r.add(P),S.add(new i.Mesh(P,u))}}return A(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(S,{flying:x=!1,moving:u=!1}={}){const v=n?0:S;a.forEach((P,w)=>{P.rotation.y=(w?1:-1)*(x?.18+Math.sin(v*3)*.2:1.25+Math.sin(v*1.3)*.04)}),c.forEach((P,w)=>{P.rotation.y=(w-4)*.42+Math.sin(v*1.8+w*.6)*.09,P.rotation.x=.12+Math.cos(v*1.2+w)*.09}),l.forEach(({node:P,side:w,kind:T})=>{P.rotation.x=x?T==="leg"?.3:-.25:u?Math.sin(v*7+(w<0?Math.PI:0))*(T==="leg"?.3:-.2):0})},dispose(){r.forEach(S=>S.dispose()),o.forEach(S=>S.dispose()),s.clear()}}}function t_({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[g,d]of c)g.visible=d;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const f=o.position.clone().sub(a.anchor);Ms(n),e.position.copy(a.position).add(f),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(f),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(f,g){if(f===r){o=g;return}l(),!(f===null||!g)&&(Ms(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:g.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=f,o=g,t.interior(f),i.background=s,i.fog=null,n.minDistance=2.6,n.maxDistance=8,n.target.copy(g.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const f of i.children)c.has(f)||c.set(f,f.visible),f.visible=!!(f.isLight||f===o||f.userData.residenceLayer||f.userData.officeAbility===r||f.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function e_(i,t){const e=new i.Group,n=new i.Group,s=[],r=[];e.visible=!1,e.userData.officeHologram=!0,t.add(e),e.add(n);const o=(x,u)=>{const v=new i.MeshBasicMaterial({color:x,transparent:!0,opacity:u,depthWrite:!1,side:i.DoubleSide});return r.push(v),v},a=o("#77e6ed",.75),c=o("#ddc38c",.85),l=o("#244f69",.12),f=o("#70dfe5",.09);f.blending=i.AdditiveBlending;const g=new i.PlaneGeometry(2.9,1.6),d=new i.BoxGeometry(1,1,.018),h=new i.TorusGeometry(.48,.014,4,40),_=new i.ConeGeometry(.95,1.6,12,1,!0);s.push(g,d,h,_);const M=new i.Mesh(g,l);n.add(M);const p=new Map([[a,[]],[c,[]]]),m=(x,u,v,P,w=a)=>p.get(w).push({x,y:u,w:v,h:P});for(const x of[-1.45,1.45]){m(x,0,.018,1.6);for(const u of[-.8,.8])m(x-Math.sign(x)*.15,u,.3,.03,c)}m(0,.8,2.9,.012),m(0,-.8,2.9,.012),m(-.55,.42,1.25,.035,c);for(let x=0;x<3;x++)m(-.34,.08-x*.23,1.65-x*.2,.018),m(-1.15,.08-x*.23,.08,.08,c);for(let x=0;x<24;x++){const u=x*Math.PI/12;m(.92+Math.cos(u)*.28,.1+Math.sin(u)*.28,.035,.035)}m(0,0,2.85,.025);let y=null;const b=new i.Matrix4;for(const[x,u]of p){const v=new i.InstancedMesh(d,x,u.length),P=new i.Matrix4;u.forEach((w,T)=>{P.makeScale(w.w,w.h,1),P.setPosition(w.x,w.y,.015),v.setMatrixAt(T,P)}),v.computeBoundingSphere(),n.add(v),x===a&&(y={mesh:v,index:u.length-1},v.instanceMatrix.setUsage(i.DynamicDrawUsage))}const A=new i.Mesh(h,a);A.rotation.x=-Math.PI/2,A.position.y=-1.1,e.add(A);const S=new i.Mesh(_,f);return S.rotation.z=Math.PI,S.position.y=-.85,e.add(S),{update(x,u,{time:v=0,height:P=1.8,reduced:w=!1}={}){return e.visible=!!x,x?(e.userData.officeAbility!==x.person.id&&e.traverse(T=>{T.isMesh&&(T.userData.officeHologramOwner=x.person.id)}),e.userData.officeAbility=x.person.id,e.position.copy(x.group.position),e.position.y+=P+1.55+(w?0:Math.sin(v*1.4)*.035),n.quaternion.copy(u.quaternion),A.rotation.z=w?0:v*.2,b.makeScale(2.85,.025,1),b.setPosition(0,w?0:Math.sin(v*.9)*.75,.03),y.mesh.setMatrixAt(y.index,b),y.mesh.instanceMatrix.needsUpdate=!0,e.position.clone().project(u)):(e.userData.officeAbility=null,null)},hide(){e.visible=!1,e.userData.officeAbility=null},dispose(){t.remove(e),s.forEach(x=>x.dispose()),r.forEach(x=>x.dispose())},root:e}}function n_(i,t){const e={box:new i.BoxGeometry(1,1,1),orb:new i.SphereGeometry(1,12,8),ring:new i.TorusGeometry(1,.04,5,28),tip:new i.ConeGeometry(.15,.6,6)},n=new Map,s=new Map,r=new Map,o=[],a=f=>(n.has(f)||n.set(f,new i.MeshBasicMaterial({color:(rs.weapons[f]||rs.specials[f]).color,transparent:!0,opacity:.8,depthWrite:!1})),n.get(f));function c(f,g,d,h,_){const M=new i.Mesh(e[g],a(d));return M.position.set(...h),M.scale.set(..._),f.add(M),M}function l(f){s.get(f)?.root.removeFromParent(),s.delete(f),r.delete(f)}return{observe(f,g,d,h=Date.now()){if(!d)return;const _=rs.weapons[g?.weapon]?g.weapon:null,M=s.get(f);if((M?.figure!==d||M?.kind!==_)&&(M?.root.removeFromParent(),s.delete(f),_)){const v=new i.Group,P=_==="sniper"?1.15:_==="pistol"?.45:.8;v.position.set(0,-.3,.14),c(v,"box",_,[0,0,.18],[.12,.16,P]),c(v,"box",_,[0,-.13,0],[.1,.25,.14]),_==="sniper"&&c(v,"box",_,[0,.15,.15],[.12,.12,.35]),v.traverse(w=>{w.isMesh&&(w.userData.personId=f)}),(d.arms?.[1]||d.body).add(v),s.set(f,{root:v,kind:_,figure:d})}const p=s.get(f);if(p&&(p.root.visible=!g?.form&&!["rest","play","drink","eat"].includes(g?.action)),!g?.shot_at||r.get(f)>=g.shot_at)return;r.set(f,g.shot_at);const m=g.shot_kind,y=g.shot_end;if(!(rs.weapons[m]||rs.specials[m])||!y||!["x","y","z"].every(v=>Number.isFinite(y[v]))||h-g.shot_at>2500)return;for(;o.length>=8;)t.remove(o.shift().root);const b=new i.Group,A=rs.specials[m]?(yu(g.form)?.height||2.2)*.55:1.2,S=d.group.position.clone().add(new i.Vector3(0,A,0)),x=new i.Vector3(y.x,y.y,y.z);b.position.copy(S),b.lookAt(x),b.userData.officeAbility=f,t.add(b);const u=new i.Group;if(b.add(u),m==="bijudama"){c(u,"orb",m,[0,0,0],[.8,.8,.8]);for(let v=0;v<3;v++)c(u,"ring",m,[0,0,0],[1,1,1]).rotation.set(v*.9,v*.6,0)}else if(c(u,"box",m,[0,0,0],[m==="indra_arrow"?.1:.035,m==="indra_arrow"?.1:.035,m==="indra_arrow"?2:.9]),m==="indra_arrow"){const v=c(u,"tip",m,[0,0,1.25],[2,2,2]);v.rotation.x=Math.PI/2;const P=c(b,"ring",m,[0,0,.6],[1.25,1.8,1]);P.rotation.y=Math.PI/2}o.push({root:b,projectile:u,origin:S,target:x,start:h,duration:m==="bijudama"?1100:m==="indra_arrow"?650:240,kind:m})},update(f=Date.now(),g=!1){for(let d=o.length-1;d>=0;d--){const h=o[d],_=f-h.start,M=Math.min(1,_/h.duration);if(_>h.duration+180){t.remove(h.root),o.splice(d,1);continue}h.projectile.position.z=h.origin.distanceTo(h.target)*M,!g&&h.kind==="bijudama"&&(h.projectile.rotation.z=_*.003),h.projectile.scale.setScalar(_>h.duration?Math.max(.1,1-(_-h.duration)/180):1)}},forget:l,dispose(){for(const f of s.keys())l(f);o.forEach(f=>t.remove(f.root)),o.length=0,Object.values(e).forEach(f=>f.dispose()),n.forEach(f=>f.dispose()),n.clear()},active:()=>o.length}}function s_({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},onHologramAnchor:c=()=>{},rendererFactory:l=d=>new du(d),controlsFactory:f=(d,h)=>new xg(d,h),getDate:g=()=>new Date}){const d=new Ih,h=new Ln(36,1,.1,1200),_=l({antialias:!0,alpha:!1,powerPreference:"low-power"});_.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),_.outputColorSpace=mn,_.toneMapping=Ho,_.toneMappingExposure=1.18,i.append(_.domElement);const M=f(h,_.domElement);M.enableDamping=!0,M.dampingFactor=.09,M.minDistance=8,M.maxDistance=650,M.minPolarAngle=.32,M.maxPolarAngle=1.28,M.target.set(0,0,0),M.enablePan=!0,M.panSpeed=.7,M.rotateSpeed=.55,M.enableKeys=!1;const p=new Jh("#fbf3dc","#526c61",2.8);d.add(p);const m=new Ha("#fff1cf",3.2);m.position.set(-12,25,15),d.add(m);const y=new Ha("#cce5ef",1.1);y.position.set(15,10,-10),d.add(y);const b=new Map,A=new Map,S=new Set,x=new Set,u=new Map,v=Wg(),P=Kg(),w=bu({THREE:zr,scene:d,navigation:v,reduced:()=>st||Ft,createModel:(E,D)=>jg(zr,E,{...D,reduced:st||Ft})}),T=e_(zr,d);let L=null,U=0;const I=n_(zr,d);let k={};function Y(E){if(E){for(const D of["hp","weapon","shield_until","respawn_id","shot_at","shot_kind","shot_end","attack_ready_at"])Object.hasOwn(E,D)&&(k[D]=E[D]);W()}}const Z={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function it(E){return b.has(E)||b.set(E,new Cs({color:Z[E]||E,roughness:E==="metal"?.4:.82,metalness:E==="gold"?.45:.02,...E==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:fn}:{}})),b.get(E)}const Q=new Je(1.1,.035,2.2);S.add(Q);const tt=new xl(Q,it("#c9b384"),24);tt.instanceMatrix.setUsage(ul),tt.count=0,tt.frustumCulled=!1,d.add(tt),tt.userData.officeRestMats=!0;const ut=new pe,Mt=new yn;function At(E,D,F,V,X,_t=0,Et=0,J=0){let It=E;E.index&&(It=E.toNonIndexed(),E.dispose()),Mt.setFromEuler(new qn(_t,Et,J)),It.applyMatrix4(new pe().compose(new B(F,V,X),Mt,new B(1,1,1))),A.has(D)||A.set(D,[]),A.get(D).push(It)}function O(E,D,F,V,X,_t,Et,J=.035,It=0){At(J>0?new zo(E,D,F,1,Math.min(J,E/3,D/3,F/3)):new Je(E,D,F),Et,V,X,_t,0,It)}function ct(E,D,F,V,X,_t,Et=E){At(new Fn(Et,E,D,12),_t,F,V,X)}function wt(E,D,F,V,X,_t,Et){const J=new Li(1,10,7);J.scale(E,D,F),At(J,Et,V,X,_t)}function Lt(E,D,F=1){v.addBox(.85*F,.85*F,E,D,"plant",2*F),ct(.4*F,.7*F,E,.35*F,D,"pot",.31*F),ct(.045*F,1.4*F,E,1.2*F,D,"oak");for(let V=0;V<5;V++){const X=V*2.4;wt(.48*F,.52*F,.25*F,E+Math.cos(X)*.3*F,(1.4+V*.15)*F,D+Math.sin(X)*.25*F,V%2?"leaf":"lightLeaf")}}function xt(E,D,F,V,X,_t,Et="#f2e8d5",J=0){const It=document.createElement("canvas");It.width=768,It.height=192;const be=It.getContext("2d");be.clearRect(0,0,768,192),be.fillStyle=Et,be.textAlign="center",be.font="500 66px Georgia",be.fillText(E,384,88),be.font="20px Arial",be.fillText(D,384,139);const Pe=new ka(It);Pe.colorSpace=mn,x.add(Pe);const et=new ni({map:Pe,transparent:!0,depthWrite:!1,side:fn}),$=new Si(F,F/4);S.add($);const ke=new Se($,et);ke.position.set(V,X,_t),ke.rotation.y=J,d.add(ke),b.set(`sign-${E}`,et)}O(86,.6,96,0,-.94,28,"base",.3),O(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),O(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const E of[-1,1]){O(54,.04,4,E*70,-.17,20,"#e6dfcc",0),O(4,.04,55,E*87,-.17,45,"#e6dfcc",0);for(let D=-20;D<92;D+=8)ct(.08,1.1,E*99,.35,D,"wood"),O(.08,.08,8,E*99,.7,D+4,"wood",0);for(const D of[34,58,80])O(3,.4,.9,E*92,.05,D,"wood",.06),v.addBox(3,.9,E*92,D,"trail-bench",.7),Lt(E*80,D,1);xt("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,E*58,1.7,18)}v.addBox(160,40,0,97,"water-boundary",.1),v.configureHomes(!0);for(const E of[-99,99])v.addBox(.2,114,E,35,"scenic-fence",1.2);v.addBox(202,.2,0,91,"scenic-boundary",1.2),O(85,.07,18,0,-.43,67,"#e4cfa5",.1),O(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let E=0;E<8;E++)O(120-E*8,.02,.13,0,-.57,79+E*2.8,"#c4ddd4",0);O(7,.07,24,0,-.4,60,"#e6dfcc",.1);const Zt=Yg({scene:d,box:O,cylinder:ct,orb:wt,bake:At,sign:xt,material:it,navigation:v,ownedGeometries:S,materials:b}),Le=Jg({scene:d,navigation:v,ownedGeometries:S,materials:b,sign:xt});O(8,.12,7,52,-.3,34,"metal"),O(6,1.2,.7,52,.48,34,"deep"),O(6,2.8,.2,52,1.2,31.6,"metal"),v.addBox(6,.7,52,34,"armory-counter",1.2),v.addBox(6,.2,52,31.6,"armory-wall",2.8),xt("ATLAS / ARMORY","KAIA / VIRTUAL EQUIPMENT",6,52,3.3,31.8);for(let E=0;E<4;E++)O(.8,.18,.2,50+E*1.3,.72,34,"gold"),O(.12,.15,.7,50+E*1.3,.72,34.3,"metal");for(let E=0;E<8;E++){const D=-36+E*3.7;O(1.5,.25,2.8,D,-.1,67,"white",.1),O(1.4,.17,1,D,.26,66,"sofa",.08),v.addBox(1.5,2.8,D,67,"beach-chair",.6),E%2===0&&(ct(.05,3,D+1.2,1,65,"gold"),At(new oi(1.8,.6,10),"white",D+1.2,2.7,65),v.addBox(.2,.2,D+1.2,65,"parasol",2.8))}O(19,.15,10,22,-.3,65,"wood",.1),xt("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const E of[16,22,28])ct(1.2,.13,E,.8,63,"white"),ct(.1,1,E,.2,63,"gold"),v.addBox(2.4,2.4,E,63,"terrace-table",.9);for(const E of[-10,-6,-2]){Lt(E,58,.9);for(let D=0;D<4;D++)wt(.15,.2,.15,E+(D-1.5)*.3,.9,58,"#c18b9c")}O(83,.08,4,0,-.44,20,"#e6dfcc",.12),O(6,.08,64,0,-.44,16,"#e6dfcc",.1),O(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const E of[-41,41])for(const D of[-15,-2,14,31,46])Lt(E,D,1.7),ct(.08,3.2,E+(E<0?1:-1),1.15,D+2,"gold"),wt(.22,.25,.22,E+(E<0?1:-1),2.85,D+2,"white");const Ht=[];function me(E,D,F,V){v.addBox(F,.12,E,D,"net",V);for(const X of[-F/2,F/2])ct(.055,V,E+X,V/2,D,"white");for(let X=.3;X<=V;X+=.22)O(F,.018,.025,E,X,D,"white",0);for(let X=-F/2;X<=F/2;X+=.4)O(.012,V-.3,.018,E+X,(V+.3)/2,D,"white",0)}function he(E,D,F=.16){const V=new Li(F,10,8);S.add(V);const X=new Se(V,it(D));X.userData.officeBall=E.id,d.add(X),Ht.push({mesh:X,game:E})}for(const E of Vi){const{x:D,z:F,id:V}=E;if(v.addBox(6,.14,D,F-(E.kind==="court"?6:4.2),"sign",1.2),O(E.kind==="court"?17:10,.12,E.kind==="court"?13:9,D,-.29,F,V==="tennis"?"#a77355":V==="badminton"?"#3b7e77":V==="basketball"?"#b99569":"#dce0ca",.14),O(6,1.1,.12,D,.65,F-(E.kind==="court"?6:4.2),"deep"),xt(E.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,D,.75,F-(E.kind==="court"?5.91:4.11)),V==="tennis"||V==="badminton"||V==="basketball"){for(const X of[-7,7])O(.045,.015,10.8,D+X,-.21,F,"white",0);for(const X of[-5.4,0,5.4])O(14,.015,.045,D,-.21,F+X,"white",0);if(V!=="basketball"){for(const X of[-5.7,5.7])O(.035,.015,10.8,D+X,-.2,F,"white",0);me(D,F,14,V==="badminton"?1.7:1.15),he(E,V==="tennis"?"#d9e56b":"white",V==="tennis"?.17:.12)}else{for(const X of[-1,1]){ct(.09,3.6,D,1.5,F+X*5,"metal"),O(2.3,1.35,.13,D,3.1,F+X*4.7,"white");const _t=new vi(.43,.045,6,20);At(_t,"#c67543",D,2.8,F+X*4.1,Math.PI/2)}he(E,"#bd6c32",.25)}}else if(V==="golf"){for(const X of[-6.5,6.5])v.addBox(.2,8,D+X,F,"golf-edge",.5);O(13,.12,8,D,-.15,F,"#69885c",.15);for(const X of[-6.5,6.5])O(.2,.35,8,D+X,-.05,F,"woodLight");for(let X=0;X<3;X++)ct(.22,.02,D-4+X*4,-.07,F+(X%2?2:-2),"black"),ct(.025,1.5,D-4+X*4,.65,F+(X%2?2:-2),"gold"),O(.8,.4,.03,D-3.6+X*4,1.25,F+(X%2?2:-2),"#c78362");he(E,"white",.12)}else if(V==="bowling"){for(const X of[-2.7,2.7])v.addBox(.35,11,D+X,F,"bowling-edge",.4);O(5,.09,11,D,-.13,F,"woodLight");for(const X of[-2.7,2.7])O(.35,.12,11,D+X,-.1,F,"oak");for(let X=0;X<4;X++)for(let _t=0;_t<=X;_t++){const Et=D+(_t-X/2)*.55,J=F-2-X*.5;ct(.14,.5,Et,.17,J,"white",.08),wt(.13,.14,.13,Et,.49,J,"white")}he(E,"#786397",.28)}else if(V==="arcade")for(const X of[-2.2,2.2]){v.addBox(2.1,1.6,D+X,F,"arcade",2.5),v.addBox(1.2,1.2,D+X,F+2,"seat",.7),O(2.1,2.6,1.6,D+X,1.1,F,"deep",.1),O(1.6,1.1,.05,D+X,1.7,F+.83,"screen");for(let _t=0;_t<5;_t++)O(.05,.6,.02,D+X+(_t-2)*.2,1.7,F+.87,_t%2?"#e8c877":"screenLine",0);ct(.18,.06,D+X,.9,F+1.1,"gold"),O(1.2,.45,1.2,D+X,.2,F+2,"sofa",.1)}else if(V==="archery"){v.addBox(5,.3,D,F-2,"archery-backstop",3.2),O(5,3.2,.25,D,1.2,F-2,"wood");for(let X=0;X<5;X++){const _t=new Fn(1.1-X*.21,1.1-X*.21,.03,24);At(_t,["white","#283e49","#73a7bf","#c36f60","gold"][X],D,1.6,F-1.82+X*.035,Math.PI/2)}O(5,.02,.12,D,-.18,F+2.8,"white",0)}else if(V==="darts"){v.addBox(5,.22,D,F-1.8,"dart-board",2.8),O(5,3,.22,D,1.25,F-1.8,"deep");for(let X=0;X<4;X++){const _t=new Fn(1.05-X*.23,1.05-X*.23,.025,24);At(_t,X%2?"white":"#bf6f59",D,1.6,F-1.64+X*.025,Math.PI/2)}}else{v.addBox(5.5,3.5,D,F,"game-table",1.3),O(5.5,.25,3.5,D,1,F,V==="pingpong"?"#4c7783":V==="billiards"?"#376a59":"woodLight",.1);for(const X of[-2.2,2.2])for(const _t of[-1.2,1.2])O(.18,1.1,.18,D+X,.4,F+_t,"oak");if(V==="pingpong"&&(me(D,F,5.5,1.45),he(E,"white",.1)),V==="uno")for(let X=0;X<16;X++){const _t=X%4;O(.32,.035,.48,D+(_t<2?-1.7+X%4*.3:1.4),1.16+X*.002,F+(_t%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][X%4],.02,X*.3)}if(V==="chess")for(let X=0;X<8;X++)for(let _t=0;_t<8;_t++)O(.34,.02,.34,D+(X-3.5)*.34,1.14,F+(_t-3.5)*.34,(X+_t)%2?"deep":"white",0),(_t<2||_t>5)&&ct(.075,.17,D+(X-3.5)*.34,1.24,F+(_t-3.5)*.34,_t<2?"white":"black");if(V==="billiards")for(let X=0;X<10;X++)wt(.12,.12,.12,D+Math.sin(X*2)*1.8,1.25,F+Math.cos(X)*.9,["gold","white","deep"][X%3]);if(V==="foosball")for(let X=0;X<5;X++){O(.045,.045,4.5,D-2+X,1.4,F,"metal",0);for(const _t of[-1,0,1])O(.2,.45,.18,D-2+X,1.48,F+_t,X%2?"#ba7864":"deep")}for(const X of[-1,1])O(4,.35,.8,D,.28,F+X*3.8,"sofa",.1),v.addBox(4,.8,D,F+X*3.8,"bench",.5)}}O(40.5,.6,28,0,-.6,0,"base",.22),O(39.8,.22,27.3,0,-.2,0,"edge",.1),O(39.4,.18,26.9,0,-.04,0,"floor",.08),O(37.8,.04,13.5,0,.07,-5.8,"stone",.05),O(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),O(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let E=-18;E<19;E+=1.9)O(.015,.015,12.4,E,.14,-5.8,"#c3cfbf",0);O(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),O(39.4,.22,.5,0,4.8,-13.25,"gold"),O(8,4.8,.18,0,2.35,-13.02,"deep");for(let E=0;E<21;E++)O(.06,4.6,.1,-3.8+E*.38,2.35,-12.87,"wood",.01);O(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),xt("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const E of[-15,-10,10,15]){O(4.1,2.9,.15,E,2.6,-13,"glass"),O(4.2,.08,.23,E,4.08,-12.85,"gold"),O(4.2,.12,.3,E,1.12,-12.85,"woodLight");for(const D of[-2,0,2])O(.055,2.9,.2,E+D,2.6,-12.86,"gold",0)}O(.13,2.8,10.8,0,1.55,-6.4,"glass"),O(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const E of[-11.8,-6.4,-1])O(.08,2.9,.08,0,1.5,E,"gold",0);O(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),O(.22,.08,25.7,-19.5,2.8,-.1,"gold"),O(.2,2.7,25.7,19.5,1.4,-.1,"glass"),O(.22,.08,25.7,19.5,2.8,-.1,"gold"),xt("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),xt("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function re(E,D,F){v.addBox(2.6,1.28,E,D,"desk",2.3),O(2.6,.15,1.28,E,1.31,D,"woodLight",.08);for(const V of[-1.03,1.03])O(.09,1.17,1.02,E+V,.66,D,"white"),O(.45,.08,.94,E+V,.15,D,"metal");O(1,.66,.08,E,1.91,D-.22,"metal"),O(.9,.54,.02,E,1.92,D-.166,"screen");for(let V=0;V<3;V++)O(.28+V*.12,.024,.025,E-.14+V*.04,2.03-V*.1,D-.149,"screenLine",0);ct(.07,.25,E,1.48,D-.2,"metal"),O(.45,.035,.25,E,1.405,D-.19,"metal"),O(.71,.035,.24,E,1.42,D+.32,"white"),ct(.09,.18,E+.9,1.49,D+.12,"deep"),O(.64,.17,.64,E,.66,D+1.02,F==="umum"?"sofa":"teal",.1),O(.65,.7,.12,E,1.08,D+1.33,F==="umum"?"sofa":"teal",.09),ct(.055,.5,E,.35,D+1.05,"metal"),O(.8,.06,.14,E,.15,D+1.05,"metal"),O(.14,.06,.8,E,.15,D+1.05,"metal")}const Rt={umum:[],operasional:[]};for(const E of["umum","operasional"])for(let D=0;D<4;D++)for(let F=0;F<4;F++){const V=(E==="umum"?-15:3.4)+F*3.75,X=-10.3+D*3.15;Rt[E].push([V,.18,X+1.03]),re(V,X,E)}for(const E of[-18.5,18.5]){O(.7,2.4,4.7,E,1.25,-8.4,"wood");for(let D=0;D<3;D++){O(.86,.06,4.8,E,.65+D*.69,-8.4,"gold");for(let F=0;F<8;F++)O(.5,.38+F%2*.12,.18,E,.88+D*.69,-10.3+F*.5,F%2?"white":"deep")}}O(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const E of[4.7,8,11.3]){O(15.8,.45,1.05,-8.7,.57,E,"sofa",.16),O(15.8,.9,.25,-8.7,.91,E-.62,"sofa",.12);for(let D=0;D<8;D++)O(1.72,.17,.95,-15.8+D*2.02,.86,E,D%3===0?"pillow":"sofa",.1);for(const D of[-16.7,-.7])O(.25,.68,1.35,D,.8,E,"sofa",.1)}for(const E of[-11.5,-5]){O(2.7,.13,1.2,E,.64,6.6,"woodLight",.12);for(const D of[-.9,.9])ct(.05,.48,E+D,.37,6.6,"gold");ct(.16,.22,E+.4,.81,6.6,"white")}O(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const E of[-11.5,-6.5])ct(.04,.5,E,.32,2.85,"gold");xt("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),O(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),O(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),O(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let E=0;E<23;E++)O(.055,1.15,.07,7.9+E*.4,.78,2.26,"woodLight",.01);O(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),O(.8,.55,.05,15.3,1.9,1.94,"black"),ct(.18,.24,14.1,1.64,1.5,"white"),ct(.18,.24,13.6,1.64,1.5,"white"),xt("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const E of[8,13.8])for(const D of[5.1,9.7]){ct(1.45,.12,E,1.05,D,"woodLight"),ct(.13,.92,E,.55,D,"gold"),ct(.68,.08,E,.12,D,"gold");for(const F of[-1.6,1.6])ct(.42,.14,E+F,.67,D,"deep"),ct(.055,.55,E+F,.34,D,"gold");ct(.18,.22,E+.4,1.22,D,"white"),ct(.22,.04,E-.3,1.14,D+.2,"white")}for(const[E,D,F]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])Lt(E,D,F);v.addBox(39.4,.32,0,-13.25,"wall",4.8),v.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const E of[-19.5,19.5])v.addBox(.2,25.7,E,-.1,"glass-wall",2.8);for(const E of[4.7,8,11.3])v.addBox(16.1,1.5,-8.7,E,"sofa",1.4);v.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),v.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const E of[8,13.8])for(const D of[5.1,9.7])v.addBox(2.9,2.9,E,D,"cafe-table",1.3);for(const E of[-18.5,18.5])v.addBox(.9,4.8,E,-8.4,"shelf",2.6);for(const E of[-11.5,-5])v.addBox(2.7,1.2,E,6.6,"lounge-table",.8);for(const[E,D]of A){const F=ii(D,!1);D.forEach(V=>V.dispose()),F&&(S.add(F),d.add(new Se(F,it(E))))}A.clear();const Pt=Gg({scene:d,material:it,ownedGeometries:S}),Vt=t_({scene:d,residences:Pt,camera:h,controls:M,background:new ne("#182c2a")}),Wt=Xg({scene:d,materials:b,ownedGeometries:S,sun:m,hemi:p,fill:y,navigation:v}),ue=document.createElement("canvas");ue.width=ue.height=128;const ve=ue.getContext("2d"),Fe=ve.createRadialGradient(64,64,7,64,64,64);Fe.addColorStop(0,"#16382f35"),Fe.addColorStop(1,"#16382f00"),ve.fillStyle=Fe,ve.fillRect(0,0,128,128);const Ie=new ka(ue);x.add(Ie);const Ve=new Si(66,49);S.add(Ve);const H=new ni({map:Ie,transparent:!0,depthWrite:!1});b.set("shadow",H);const We=new Se(Ve,H);We.rotation.x=-Math.PI/2,We.position.y=-.98,d.add(We);const ce=new Map,ye=new Map;function bt(E){if(ye.has(E))return ye.get(E);const D=[];if(E==="archery"){const V=new vi(.34,.025,5,16,Math.PI);V.rotateZ(-Math.PI/2),D.push(V.toNonIndexed()),V.dispose();const X=new Je(.035,.035,.85);X.translate(0,0,.1),D.push(X.toNonIndexed()),X.dispose()}else{const V=new Fn(.017,.03,E==="billiards"?1.65:1,6);V.rotateX(Math.PI/2),D.push(V.toNonIndexed()),V.dispose()}const F=ii(D,!1);return D.forEach(V=>V.dispose()),S.add(F),ye.set(E,F),F}function Jt(E,D,F,V,X){const _t=D+F.join(":");if(!ce.has(_t)){const J=D==="sphere"?new Li(F[0],10,8):new zo(...F,1,.06);ce.set(_t,J),S.add(J)}const Et=new Se(ce.get(_t),it(V));return Et.position.set(...X),E.add(Et),Et}const Xt=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],$t=new Map,N=new Cs({vertexColors:!0,roughness:.8});b.set("costume-vertex",N);function R(E){const D=new Rn;d.add(D);const F=Fl(E.avatar),V=wu(F.costume),X=(V?.style||F.style)==="feminine",_t=V?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[F.color]||Xt[E.id%Xt.length],Et=new Rn;D.add(Et);const J={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[F.skin],It=F.hair==="hijab"?_t:"#352c32";if(Jt(Et,"box",[X?.43:.5,.65,.33],_t,[0,1.17,0]).userData.avatarCloth=!0,!V&&F.outfit==="blazer"){Jt(Et,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Ue of[-1,1]){const He=Jt(Et,"box",[.07,.32,.035],"gold",[Ue*.12,1.33,.19]);He.rotation.z=Ue*.25}}!V&&F.outfit==="sport"&&Jt(Et,"box",[.32,.055,.02],"white",[0,1.3,.18]);const be=!V&&F.outfit==="dress"?Jt(Et,"box",[.6,.4,.44],_t,[0,.79,0]):null,Pe=new Rn;if(Pe.position.y=1.69,Et.add(Pe),Jt(Pe,"box",[.43,.46,.4],J,[0,0,0]),V){const Ue=new Se(Vc(V,"head",$t,S),N),He=new Se(Vc(V,"body",$t,S),N);Ue.userData.costumePart="head",He.userData.costumePart="body",Pe.add(Ue),Et.add(He)}else{const Ue="hair:"+F.hair;if(!ce.has(Ue)){const He=[[.47,.18,.44,0,.21,-.02],[.45,F.hair==="long"||F.hair==="hijab"?.67:.3,.12,0,F.hair==="long"||F.hair==="hijab"?-.12:.07,-.2]];if(F.hair!=="short")for(const Hi of[-1,1])He.push([.09,F.hair==="bob"?.4:.53,.32,Hi*.235,-.01,-.03]);const is=He.map(([Hi,mu,gu,_u,xu,vu])=>{const oa=new Je(Hi,mu,gu);oa.translate(_u,xu,vu);const Mu=oa.toNonIndexed();return oa.dispose(),Mu}),ss=ii(is,!1);is.forEach(Hi=>Hi.dispose()),ce.set(Ue,ss),S.add(ss)}Pe.add(new Se(ce.get(Ue),it(It)))}if(!V&&F.hair==="ponytail"&&Jt(Pe,"box",[.24,.53,.22],It,[0,-.02,-.35]),!V&&F.hair==="hijab"&&Jt(Et,"box",[.58,.18,.43],It,[0,1.44,-.04]),!ce.has("eyes")){const Ue=[-.095,.095].map(is=>{const ss=new Je(.035,.045,.025);ss.translate(is,.035,.205);const Hi=ss.toNonIndexed();return ss.dispose(),Hi}),He=ii(Ue,!1);Ue.forEach(is=>is.dispose()),ce.set("eyes",He),S.add(He)}const et=new Se(ce.get("eyes"),it("#263833"));Pe.add(et);const $=[et];if(Jt(Pe,"box",[.09,.02,.025],X?"#b96f78":"#9c6d58",[0,-.105,.21]),X)for(const Ue of[-.14,.14])Jt(Pe,"box",[.065,.025,.02],"#d39589",[Ue,-.065,.21]);if(F.accessory==="glasses"){for(const Ue of[-1,1])Jt(Pe,"box",[.15,.11,.025],"gold",[Ue*.105,.04,.224]),Jt(Pe,"box",[.11,.07,.025],J,[Ue*.105,.04,.24]);Jt(Pe,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(F.accessory==="headphones"){Jt(Pe,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Ue of[-1,1])Jt(Pe,"box",[.12,.2,.18],"deep",[Ue*.28,.07,0])}const ke=[];for(const Ue of[-.34,.34]){const He=new Rn;He.position.set(Ue,1.42,0),Et.add(He),Jt(He,"box",[.17,.4,.2],_t,[0,-.19,0]).userData.avatarCloth=!0,Jt(He,"box",[.15,.27,.16],J,[0,-.45,.05]),ke.push(He)}const an=[],En=[];for(const Ue of[-.14,.14]){const He=new Rn;He.position.set(Ue,.83,0),Et.add(He),Jt(He,"box",[.18,.64,.2],V?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,En.push(Jt(He,"box",[.23,.14,.34],V?.accent||(F.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),an.push(He)}const fe=Jt(ke[1],"sphere",[.12],"white",[0,-.49,.14]),xe=Jt(ke[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),Cn=new Rn;ke[1].add(Cn),Cn.position.set(0,-.48,.16),Jt(Cn,"box",[.04,.44,.05],"gold",[0,-.14,0]);const ln=new vi(.24,.025,6,16);S.add(ln),Cn.add(new Se(ln,it("white"))),Cn.rotation.x=Math.PI/2;const le=new Se(bt("billiards"),it("gold"));le.position.set(0,-.48,.35),ke[1].add(le),le.visible=!1;const sn=new cr(.5,.59,24);S.add(sn);const Ti=new ni({color:"#c5a061",side:fn});b.set(`ring-${E.id}`,Ti);const dn=new Se(sn,Ti);dn.rotation.x=-Math.PI/2,dn.position.y=.02,D.add(dn),dn.visible=!1;const qt=document.createElement("button");qt.type="button",qt.className="vo-avatar-label",qt.setAttribute("aria-pressed","false");const vn=document.createElement("i"),ci=document.createElement("span"),ns=document.createElement("small");qt.append(vn,ci,ns),t.append(qt);const ki=document.createElement("span");return ki.className="vo-speech",ki.hidden=!0,qt.append(ki),qt.addEventListener("click",()=>e(E.id)),D.traverse(Ue=>{Ue.isMesh&&(Ue.userData.personId=E.id)}),{group:D,body:Et,head:Pe,arms:ke,legs:an,shoes:En,eyes:$,skirt:be,cup:fe,plate:xe,racket:Cn,tool:le,bubble:ki,label:qt,dot:vn,name:ci,icon:ns,ring:dn,person:E,appearance:JSON.stringify(E.avatar),privateGeometry:ln,target:new B,phase:E.id*1.75}}let q=null,st=!1,ht=!0,vt=!1,gt=null,rt=0,lt=0,St=null,z=[],ot=null,nt=null,dt=null,ft="orbit",pt=null,Ft=!1,jt={};const mt=new Map,Gt=new Map;let Yt=null,at=null,ie=null,kt=null,tn={},zi=a,Zn=null,Is=()=>!1,Ge=null,Te=null,ge=null,bn=null,On=!1,Gi=null,Kn=!1,bi=null;const Ns=new cr(1.2,1.4,32);S.add(Ns);const Ei=new ni({color:"#e9be69",side:fn,transparent:!0,opacity:.85});b.set("pilot-guide",Ei);const li=new Se(Ns,Ei);li.rotation.x=-Math.PI/2,li.visible=!1,li.userData.pilotGuide=!0,d.add(li);const Bn=new Map,Us=[],fr={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},Ne=new B,Xe=new B;let Be=!1;function C(E){at&&ie&&!E.some(et=>et.id===at)&&(E=[...E,{...ie,home_slot:ge?.slot??ie.home_slot}]),v.configureHomes(!0,On?ge?.slot:null,Math.max(Gi??0,E.length,...E.map(et=>(et.home_slot??-1)+1))),z=E,Pt.sync(E),Wt.extent(Pt.bounds().back);const D=E.map(et=>{if(!dt?.connected||!dt.room||![dt.room.from,dt.room.to].includes(et.id)){const $=E.find(ke=>ke.is_me)?.id;return dt&&!dt.connected&&(et.id===$||et.meeting_with===$)?{...et,meeting_with:null,meeting_spot:null}:et}return{...et,state:"online",meeting_with:dt.room.from===et.id?dt.room.to:dt.room.from,meeting_spot:dt.room.spot}}),F=et=>et.id===q||et.id===pt||et.is_me||Yt&&[Yt.from,Yt.to].includes(et.id),V=[...D].sort((et,$)=>+!!F($)-+!!F(et)||+!!$.meeting_with-+!!et.meeting_with||{online:0,idle:1,offline:2}[et.state]-{online:0,idle:1,offline:2}[$.state]||et.id-$.id),X=[],_t={umum:0,operasional:0},Et=[],J=new Map;let It=0,be=0;for(const et of V){if(X.length>=24)break;et.state==="online"&&_t[et.department]>=16||(X.push(et),et.state==="online"&&_t[et.department]++)}const Pe=new Set(X.map(et=>et.id));for(const[et,$]of u)(!Pe.has(et)||$.appearance!==JSON.stringify(X.find(ke=>ke.id===et)?.avatar))&&(w.forget(et),I.forget(et),d.remove($.group),$.label.remove(),$.ring.geometry.dispose(),S.delete($.ring.geometry),$.privateGeometry.dispose(),S.delete($.privateGeometry),$.ring.material.dispose(),b.delete(`ring-${et}`),u.delete(et));_t.umum=_t.operasional=0;for(const et of X){let $=u.get(et.id),ke=!$;$||($=R(et),u.set(et.id,$));const an=$.game?.id,En=$.pose,fe=$.home?.clone(),xe=et.in_office===!1&&et.state!=="offline",Cn=xe?null:Bn.get(et.id)||et.pilot,ln=et.id===at&&kt?kt.state():Cn;$.person=et,$.pose=Tu(et,g());let le;$.game=Au(et,g());const sn=xe?null:mt.get(et.id)||et.recreation,Ti=!xe&&Yt&&Yt.status!=="pending"&&[Yt.from,Yt.to].includes(et.id);Ti?($.game=Vi.find(qt=>qt.id===Yt.kind)||$.game,$.pose="playing"):sn?.kind==="game"&&sn.until>Date.now()/1e3&&et.state!=="offline"&&($.game=Vi.find(qt=>qt.id===sn.destination)||$.game,$.pose="playing");const dn=sn&&(!sn.until||sn.until>Date.now()/1e3)&&fr[sn.destination];if($.destination=!!dn,dn&&!Ti&&et.state!=="offline"){$.pose=sn.kind==="drink"?"coffee":sn.kind==="food"?"eating":sn.kind==="dance"?"dancing":"resting",le=[dn[0]+et.id%5*1.6,dn[1],dn[2]+Math.floor(et.id%10/5)*1.3];const qt=v.nearest({x:le[0],z:le[2]});qt&&(le=[qt.x,le[1],qt.z]),$.group.rotation.y=Math.PI}else if(!xe&&et.meeting_with&&Number.isInteger(et.meeting_spot)&&!Ti){$.pose="meeting";const qt=et.id<et.meeting_with?-1:1;le=[-36+et.meeting_spot*6.5+qt*.9,-.12,20],$.facing=qt<0?Math.PI/2:-Math.PI/2}else if($.pose==="working")le=Rt[et.department][_t[et.department]++],$.group.rotation.y=Math.PI;else if($.pose==="playing"){const qt=J.get($.game.id)||0;J.set($.game.id,qt+1);const vn=qt%2?1:-1;le=[$.game.x+($.game.kind==="court"?vn*(3-Math.floor(qt/2)%3*1.7):Math.floor(qt/2)*.8),-.12,$.game.z+vn*($.game.kind==="court"?3.6:2.5)],$.group.rotation.y=vn<0?0:Math.PI}else if($.pose==="sleeping")le=Pt.bed(et.id),$.group.rotation.y=0;else if($.pose==="resting"){const qt=It++;le=[-15.8+qt%8*2.02,.12,4.7+Math.floor(qt/8)*3.3],$.group.rotation.y=0}else if(be<8){const qt=be++,vn=qt%4,ci=qt<4?1:-1;le=[(vn%2?13.8:8)+ci*1.65,.08,vn<2?5.1:9.7],$.group.rotation.y=ci*Math.PI/2}else{const qt=It++;le=[-15.8+qt%8*2.02,.12,4.7+Math.floor(qt/8)*3.3],$.group.rotation.y=0}if($.pose==="playing"&&$.game.id==="darts"&&(le=[$.game.x+(et.id%2?-1:1)*1.2,-.12,$.game.z+2.5]),["playing","meeting"].includes($.pose)&&!v.free(le[0],le[2])){const qt=v.nearest({x:le[0],z:le[2]});qt&&(le=[qt.x,le[1],qt.z])}if(($.pose==="playing"||dn)&&Et.some(qt=>Math.hypot(qt[0]-le[0],qt[2]-le[2])<.7))t:for(const qt of[.8,1.5,2.2])for(let vn=0;vn<12;vn++){const ci=le[0]+Math.cos(vn*Math.PI/6)*qt,ns=le[2]+Math.sin(vn*Math.PI/6)*qt;if(v.free(ci,ns)&&!Et.some(ki=>Math.hypot(ki[0]-ci,ki[2]-ns)<.7)){le=[ci,le[1],ns];break t}}if(ln&&et.state!=="offline"?(le=[ln.x,ln.y,ln.z],$.pose="manual",$.manual=!0,$.group.rotation.y=ln.yaw,$.waypoints=[]):$.manual=!1,Et.push(le),$.target.set(...le),$.home=$.target.clone(),(ke||$.manual&&et.id===at||En!==$.pose&&$.pose!=="meeting"&&!dn&&!Ti)&&$.group.position.copy($.target),!$.manual&&!ke&&($.pose==="playing"&&(an!==$.game.id||En!=="playing")||(dn||$.pose==="meeting")&&(!fe||fe.distanceTo($.home)>.1))){if(!v.free($.group.position.x,$.group.position.z)){const qt=v.nearest($.group.position)||v.nearest({x:0,z:21.5});qt&&$.group.position.set(qt.x,le[1],qt.z)}$.waypoints=v.withHomeAccess(Pt.slotFor(et.id),()=>v.path($.group.position,$.home)).map(qt=>new B(qt.x,le[1],qt.z))}else!["playing","meeting"].includes($.pose)&&!dn&&($.waypoints=[]);st&&$.pose==="meeting"&&($.group.position.copy($.home),$.group.rotation.y=$.facing,$.waypoints=[]),$.dot.className=`vo-dot ${et.state}`,$.name.textContent=et.name,$.icon.textContent=`${et.state==="offline"?"OFFLINE ":et.state==="idle"?"JEDA ":"ONLINE "}${$.pose==="meeting"?"💬":$.pose==="sleeping"?"☾ RUMAH":$.pose==="playing"?$.game.icon:$.pose==="coffee"?"☕":""}`,Ti&&Yt.bot&&et.id===Yt.to&&($.icon.textContent="OFFLINE · NPC "+$.game.icon),$.pose==="dancing"&&($.icon.textContent=(et.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),$.label.setAttribute("aria-label",`${et.name}, ${et.state==="online"?"online":et.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),$.cup.visible=$.pose==="coffee",$.plate.visible=$.pose==="eating",$.manual&&($.cup.visible=ln.action==="drink",$.plate.visible=ln.action==="eat",$.icon.textContent=(et.private?"PRIVAT · ":"ONLINE · ")+(ln.action==="run"?"BOOST":ln.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),$.racket.visible=$.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes($.game.id),$.tool.visible=$.pose==="playing"&&["billiards","archery","darts"].includes($.game.id),$.tool.visible&&($.tool.geometry=bt($.game.id)),$.shoes.forEach(qt=>{qt.visible=$.pose!=="sleeping"}),$.manual||$.eyes.forEach(qt=>{qt.scale.y=$.pose==="sleeping"?.18:1}),$.ring.visible=q===et.id,$.label.setAttribute("aria-pressed",String(q===et.id))}Pt.select(ot??(u.get(q)?.pose==="sleeping"?q:null)),W()}const G=new B;function j(){const E=i.getBoundingClientRect(),D=[];for(const F of[...u.values()].sort((V,X)=>+(X.person.id===q)-+(V.person.id===q))){if(F.pose==="sleeping"){const be=Pt.location(F.person.id);G.set(be.x,5.2,be.z+1)}else F.group.getWorldPosition(G),G.y+=(w.form(F.person.id)?.height||1.8)+.55;G.project(h);const V=(G.x+1)/2*E.width,X=(1-G.y)/2*E.height;if(Vt.active()&&F.person.id!==at){F.label.hidden=!0;continue}const _t=166,Et=27,J=D.some(be=>Math.abs(be.x-V)<_t&&Math.abs(be.y-X)<Et),It=G.z<1&&G.z>-1&&V>18&&V<E.width-18&&X>15&&X<E.height-65&&(!J||F.person.id===q);F.label.hidden=!It,It&&(F.label.style.transform=`translate(${V}px,${X}px) translate(-50%,-100%)`,D.push({x:V,y:X}))}}function K(E=0){if(gt=null,vt||!ht)return;if(E-rt<1e3/30&&!st){gt=requestAnimationFrame(K);return}const D=Math.min(.06,Math.max(.001,(E-rt)/1e3));rt=E,Be&&(h.position.lerp(Xe,.12),M.target.lerp(Ne,.12),h.position.distanceTo(Xe)<.04&&(h.position.copy(Xe),M.target.copy(Ne),Be=!1));let F=0;for(const J of u.values()){const It=st?0:E/1e3+J.phase;if(J.person.id===at&&kt){const et=Math.atan2(h.position.x-M.target.x,h.position.z-M.target.z),$=[...u.values()].filter(xe=>xe!==J&&xe.pose!=="sleeping").map(xe=>xe.group.position),ke=Is();let an=ke?{}:tn;if((an.x||an.z||an.jump)&&(Te=null,Ge=null),Te&&(Te.elapsed=(Te.elapsed||0)+D),Te?.elapsed>4&&(Te=null,zi({...kt.state(),restBlocked:!0})),Te&&!ke){const xe=kt.state();if(xe.grounded)if(Te.point||(Te.point=Wc(v,xe,Te.pose,$)),!Te.point)Te=null;else{const Cn=Te.point.x-xe.x,ln=Te.point.z-xe.z,le=Math.hypot(Cn,ln);if(le<.04)kt.face({x:xe.x+Math.sin(Te.point.yaw),z:xe.z+Math.cos(Te.point.yaw)}),Ge={action:"rest",pose:Te.pose,venue:Zi(xe,ge)?"home":["beach","garden","terrace","lounge","bar"].find(sn=>kr(xe,sn))||"campus"},Te=null,an={};else{const sn=Math.min(1,le/(4.5*D))/le;an={x:(Math.cos(et)*Cn-Math.sin(et)*ln)*sn,z:(-Math.sin(et)*Cn-Math.cos(et)*ln)*sn}}}}const En=w.modeState(at);(En?.id||null)!==bi&&(bi=En?.id||null,te("follow",at)),kt.setForm(w.form(at),En?.expires);const fe=kt.step(D,an,et,$);if(["walk","run","jump","fly","land"].includes(fe.action)&&(Ge=null),Ge&&Object.assign(fe,Ge),fe.transformation=En,fe.transformationCooldown=w.modeCooldown(at),fe.restPending=!!Te,J.group.position.set(fe.x,fe.y,fe.z),J.group.rotation.y=fe.yaw,J.manual=!0,J.pose="manual",J.home.copy(J.group.position),J.target.copy(J.group.position),Zn){const xe=Zn==="home"&&ge?{x:ge.x,z:ge.z+5}:ti.venues[Zn];xe&&(fe.target=Zn,fe.distance=Math.round(Math.hypot(fe.x-xe.x,fe.z-xe.z)))}if(fe.atHome=Zi(fe,ge),fe.nearDoor=!!(ge&&Math.hypot(fe.x-ge.x,fe.z-ge.z-3.9)<=2.8),fe.doorOpen=On,ge){const xe=Zi(fe,ge);xe!==Vt.active()&&(Ct(),Be=!1,Pt.select(xe?bn:null),xe&&(ft="follow",pt=at,M.enablePan=!1)),Vt.set(xe?bn:null,xe?J.group:null),fe.interior=xe}else fe.interior=!1;zi({...fe,...k,interior:Vt.active()}),J.icon.textContent=(J.person.private?"PRIVAT · ":"ONLINE · ")+(fe.action==="run"?"BOOST":fe.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(J.manual){const et=J.person.id===at&&kt?{...kt.state(),...k,...Ge||{}}:Bn.get(J.person.id)||J.person.pilot;if(I.observe(J.person.id,et,J),et?.weapon&&et.action==="idle"&&(J.arms[1].rotation.x=-.6),et&&J.person.id!==at){const fe=new B(et.x,et.y,et.z),xe=J.group.position.clone().lerp(fe,.35);et.respawn_id!==J.respawnId?(J.respawnId=et.respawn_id,J.group.position.copy(fe)):v.segment(J.group.position,xe,.3,!!(et.air_access||et.flight))?J.group.position.copy(xe):J.group.position.copy(fe),J.group.rotation.y=et.yaw}J.person.id!==at&&w.observe(J.person.id,et,J),J.flight=!!et?.flight,J.moving=["walk","run"].includes(et?.action);const $=w.pose(J.person.id),ke=$g(J,$&&!["walk","run","jump","fly","land","rest"].includes(et?.action)?{...et,action:"cast",skillPose:$}:et,{time:E/1e3+J.phase,dt:D,reduced:st}),an=et?.action==="play"?Vi.find(fe=>fe.id===et.venue):null;J.racket.visible=!!(an&&["tennis","badminton","pingpong","golf"].includes(an.id)),J.tool.visible=!!(an&&["billiards","archery","darts"].includes(an.id)),J.tool.visible&&(J.tool.geometry=bt(an.id)),J.cup.visible=et?.action==="drink",J.plate.visible=et?.action==="eat",et?.action==="rest"&&(J.icon.textContent=et.pose==="nap"?"ONLINE · TIDUR SANTAI":et.pose==="recline"?"ONLINE · REBAHAN":et.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const En=w.form(J.person.id);En&&(J.icon.textContent=(J.person.private?"PRIVAT · ":"ONLINE · ")+En.name+(et?.flight?" · TERBANG":"")),ke.lying&&(!Vt.active()||J.person.id===at)&&(ut.compose(new B(J.group.position.x+Math.sin(J.group.rotation.y)*.7,J.group.position.y+.035,J.group.position.z+Math.cos(J.group.rotation.y)*.7),J.group.quaternion,new B(1,1,1)),tt.setMatrixAt(F++,ut));continue}w.clearForm(J.person.id);const be=J.pose==="playing",Pe=!st&&(be||J.waypoints?.length>0);if(J.target.copy(J.home),be&&!J.waypoints?.length&&(J.target.x+=Math.sin(It*.65)*(J.game.kind==="court"?1.4:.18),J.target.z+=Math.cos(It*.5)*(J.game.kind==="court"?.3:.08)),J.waypoints?.length&&!st){const et=J.waypoints[0];J.group.position.distanceTo(et)<.015?J.waypoints.shift():(J.group.rotation.y=Math.atan2(et.x-J.group.position.x,et.z-J.group.position.z),Tt(J,et,D*3.2))}else be?Tt(J,J.target,st?0:D*1.4):J.pose==="meeting"?(Tt(J,J.home,st?0:D*3.2),J.group.rotation.y=J.facing):J.group.position.copy(J.home);J.legs.forEach((et,$)=>{et.rotation.x=Pe?Math.sin(It*4+$*Math.PI)*.32:J.pose==="working"||J.pose==="resting"?-1.1:0}),J.body.position.y=Math.sin(It*1.6)*(st?0:J.pose==="sleeping"?.007:.018),J.body.rotation.x=J.pose==="sleeping"?-Math.PI/2:0,J.body.rotation.z=be?Math.sin(It*1.5)*.07:0,J.head.rotation.x=J.pose==="sleeping"?0:Math.sin(It*.6)*(st?0:.025),J.arms[0].rotation.x=J.pose==="working"?-.65+Math.sin(It*5)*(st?0:.045):J.pose==="eating"?-1.05:.1,J.arms[1].rotation.x=J.pose==="working"?-.65+Math.sin(It*5+1)*(st?0:.045):J.pose==="coffee"?-1.2+Math.sin(It*1.2)*(st?0:.13):J.pose==="eating"?-.8+Math.sin(It*2)*(st?0:.13):.1,be&&(J.arms[1].rotation.x=-.6+Math.sin(It*2.3)*(st?0:.7),J.arms[0].rotation.x=-.25+Math.sin(It*2.3+1)*(st?0:.25)),J.pose==="dancing"&&!Pe&&(J.body.rotation.z=st?0:Math.sin(It*2.4)*.13,J.arms.forEach((et,$)=>{et.rotation.x=-.8+Math.sin(It*2.4+$)*(st?0:.5)}),J.legs.forEach((et,$)=>{et.rotation.x=st?0:Math.sin(It*2.4+$*Math.PI)*.25})),J.pose==="meeting"?(J.arms[1].rotation.x=-.2+Math.sin(It*1.7)*(st||Pe?0:.18),J.head.rotation.y=Math.sin(It*.7)*(st?0:.06)):J.head.rotation.y=0}tt.count=F,tt.instanceMatrix.needsUpdate=!0,w.update(Date.now(),kt?.state()),I.update(Date.now(),st||Ft);const V=u.get(pt);if(ft!=="orbit"&&V&&!Be){const It=V.group.position.clone().add(new B(0,w.form(pt)?.height*.55||(V.pose==="sleeping"?.25:1.3),V.pose==="sleeping"?-1.3:0)).clone().sub(M.target).multiplyScalar(1-Math.exp(-D*8.6));M.target.add(It),h.position.add(It)}Wt.update(E,{paused:st,dark:document.documentElement.classList.contains("dark"),center:M.target}),Zt.update(E,{paused:st,energySaver:Ft}),Le.update(E,st);for(const{mesh:J,game:It}of Ht){const be=st?0:E/1e3,et=[...u.values()].some($=>$.manual?($.person.id===at?Ge:Bn.get($.person.id)||$.person.pilot)?.action==="play"&&($.person.id===at?Ge:Bn.get($.person.id)||$.person.pilot)?.venue===It.id:!Ru(g())&&$.pose==="playing"&&$.game.id===It.id)?Math.sin(be*1.8):0;J.position.set(It.x+(It.id==="golf"?et*4:et*1.5),It.id==="pingpong"?1.45+Math.abs(et)*.65:It.id==="basketball"?.15+Math.abs(et)*2.2:It.id==="bowling"||It.id==="golf"?.06:.4+Math.abs(et)*2,It.z+et*(It.kind==="court"?4:1.3))}M.update();const X=h.position.clone(),_t=h.quaternion.clone();ft!=="orbit"&&V&&h.position.copy(P.resolve(v,M.target,X,Pt.cameraBoxes(pt),Vt.active()?2.6:w.form(pt)?.height*.85||(ft==="portrait"?2.8:3.8),Vt.active()?8:w.form(pt)?55:35,D)),h.lookAt(M.target),h.updateMatrixWorld(!0),St?St.copy(h):St=h.clone();const Et=T.update(u.get(L),h,{time:E/1e3,height:w.form(L)?.height||1.8,reduced:st||Ft});(st||E-U>100)&&(c(Et?{x:(Et.x+1)/2*i.clientWidth,y:(1-Et.y)/2*i.clientHeight,visible:Et.z>-1&&Et.z<1&&Math.abs(Et.x)<1&&Math.abs(Et.y)<1}:null),U=E),Vt.apply(),_.render(d,h),(st||E-lt>120||Be)&&(j(),lt=E),h.position.copy(X),h.quaternion.copy(_t),h.updateMatrixWorld(!0),(!st||Be||Te||kt?.moving()||kt&&kt.state().stamina<100||!Is()&&(Math.abs(tn.x||0)+Math.abs(tn.z||0)>0||tn.jump))&&W()}function W(){!vt&&ht&&gt===null&&(gt=requestAnimationFrame(K))}function Tt(E,D,F){const V=Pt.location(E.person.id),X=V&&Math.abs(E.group.position.x-V.x)<4.8&&Math.abs(E.group.position.z-V.z)<5;return!!X!=!!E.npcDoorOpen&&(E.npcDoorOpen=!!X,Pt.setDoor(E.person.id,!!X)),v.withHomeAccess(Pt.slotFor(E.person.id),()=>Ot(E,D,F))}function Ot(E,D,F){const V=v.move(E.group.position,D,F),X=Math.hypot(V.x-E.group.position.x,V.z-E.group.position.z),_t=[...u.values()].some(Et=>Et!==E&&Et.pose!=="sleeping"&&Math.hypot(V.x-Et.group.position.x,V.z-Et.group.position.z)<.62);if(_t||E.group.position.set(V.x,E.home.y,V.z),(_t||X<.001&&E.group.position.distanceTo(D)>.2)&&rt>=(E.repathAt||0)&&(E.pose==="meeting"||E.waypoints?.length)){E.repathAt=rt+1500;const Et=[...u.values()].filter(It=>It!==E&&It.pose!=="sleeping").map(It=>It.group.position),J=v.path(E.group.position,E.home,Et);J.length&&(E.waypoints=J.map(It=>new B(It.x,E.home.y,It.z)))}}function yt(){if(vt)return;const E=i.getBoundingClientRect();E.width<1||E.height<1||(_.setSize(E.width,E.height,!1),h.aspect=E.width/E.height,h.updateProjectionMatrix(),W())}function Ct(E=!0){ot=null;const D=nt;if(nt=null,!D||(Pt.select(null),!E))return;Ms(M);const F=u.get(D.followId)?.group.position,V=D.anchor&&F?F.clone().sub(D.anchor):new B;ft=D.mode,pt=D.followId,M.enablePan=D.pan,M.minDistance=D.min,M.maxDistance=D.max,h.fov=D.fov,h.updateProjectionMatrix(),h.position.copy(D.position).add(V),M.target.copy(D.target).add(V),Ne.copy(D.focus).add(V),Xe.copy(D.goal).add(V),Be=D.easing}function zt(E="all"){if(Vt.active()){te("follow",at);return}Ct(!1),Ms(M),ft="orbit",pt=null,h.fov=36,h.updateProjectionMatrix(),M.enablePan=!0,M.minDistance=8,M.maxDistance=650;const D=i.clientWidth<600,F={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const _t of Vi)F[_t.id]=[[_t.x,.3,_t.z],[_t.x+14,19,_t.z+22]];for(const[_t,Et]of Object.entries(fr))F[_t]=[Et,[Et[0]+12,19,Et[2]+22]];const[V,X]=F[E]||F.all;if(Ne.set(...V),Xe.set(...X),E==="all"||E==="residences"){const _t=Pt.bounds(),Et=E==="all"?76:_t.front,J=_t.right-_t.left,It=Et-_t.back;Ne.set(0,0,(Et+_t.back)/2);const be=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Pe=Math.min(Di.degToRad(h.fov/2),Math.atan(Math.tan(Di.degToRad(h.fov/2))*be)),et=Math.hypot(J,It)/2/Math.sin(Pe)*1.07;Xe.copy(new B(1,1.18,1.3).normalize().multiplyScalar(et).add(Ne))}else D&&Xe.sub(Ne).multiplyScalar(1.23).add(Ne);ot=null,Pt.select(u.get(q)?.pose==="sleeping"?q:null),st?(h.position.copy(Xe),M.target.copy(Ne),Be=!1):Be=!0,W()}function Qt(E){if(Vt.active()){te("follow",at);return}const D=Pt.location(E);D&&(Ms(M),nt||(nt={mode:ft,followId:pt,anchor:u.get(pt)?.group.position.clone(),position:h.position.clone(),target:M.target.clone(),focus:Ne.clone(),goal:Xe.clone(),easing:Be,fov:h.fov,min:M.minDistance,max:M.maxDistance,pan:M.enablePan}),ft="orbit",pt=null,M.enablePan=!0,M.minDistance=5,M.maxDistance=650,h.fov=36,h.updateProjectionMatrix(),ot=E,Pt.select(E),Ne.set(D.x,1.2,D.z),Xe.copy(Ne).add(new B(11,12,15)),i.clientWidth<600&&Xe.sub(Ne).multiplyScalar(1.23).add(Ne),st?(h.position.copy(Xe),M.target.copy(Ne),Be=!1):Be=!0,W())}function te(E,D=q){if(P.reset(),Vt.active()&&(E="follow",D=at),Ct(!1),Ms(M),E==="orbit"){ft="orbit",pt=null,h.fov=36,h.updateProjectionMatrix(),M.enablePan=!0,M.minDistance=5,M.maxDistance=650,W();return}!u.has(D)&&z.some(X=>X.id===D)&&(q=D,C(z));const F=u.get(D);if(!F)return;const V=w.form(D);ft=E==="portrait"?"portrait":"follow",pt=D,M.enablePan=!1,M.minDistance=Vt.active()?2.6:V?V.height*.85:ft==="portrait"?2.8:3.8,M.maxDistance=Vt.active()?8:V?55:35,h.fov=Vt.active()?58:44,h.updateProjectionMatrix(),Ne.copy(F.group.position).add(new B(0,F.pose==="sleeping"?.25:1.3,F.pose==="sleeping"?-1.3:0)),V&&(Ne.y=F.group.position.y+V.height*.55),Xe.copy(Ne).add(V?new B(V.height*.85,V.height*.65,V.height*1.1):ft==="portrait"?new B(1.8,.9,2.7):new B(4,2.5,5)),st?(h.position.copy(Xe),M.target.copy(Ne),Be=!1):Be=!0,W()}let Ut=null;const ae=new ni({transparent:!0,opacity:0,depthWrite:!1});b.set("game-hotspots",ae);for(const E of Vi){const D=new Je(6,1.4,.4),F=new Je(E.kind==="court"?16:9,.18,E.kind==="court"?12:7);D.translate(0,.7,-(E.kind==="court"?6:4.2)),F.translate(0,-.14,0);const V=D.toNonIndexed(),X=F.toNonIndexed(),_t=ii([V,X],!1);D.dispose(),F.dispose(),V.dispose(),X.dispose(),S.add(_t);const Et=new Se(_t,ae);Et.position.set(E.x,0,E.z),Et.userData.officeGame=E.id,d.add(Et),Us.push(Et)}const ze=new jh,Ce=new Nt,Ae=E=>{Ut=[E.clientX,E.clientY]},Ze=E=>{if(!Ut||Math.hypot(E.clientX-Ut[0],E.clientY-Ut[1])>6)return;Ut=null;const D=_.domElement.getBoundingClientRect();Ce.set((E.clientX-D.left)/D.width*2-1,-(E.clientY-D.top)/D.height*2+1),ze.setFromCamera(Ce,St||h);const F=ze.intersectObjects([...u.values()].map(X=>X.group).concat(Pt.meshes,Zt.targets,Le.targets,Us,w.targets(),T.root.visible?[T.root]:[]),!0)[0],V=Pt.personForHit(F);if(V===bn&&F?.object.userData.residenceLayer==="door"){o();return}V?(e(V),Qt(V)):F?.object.userData.officeHologramOwner?e(F.object.userData.officeHologramOwner):F?.object.userData.personId?e(F.object.userData.personId):F?.object.userData.officeVenue?s(F.object.userData.officeVenue):F?.object.userData.officeGame&&r(F.object.userData.officeGame)};function Bt(){const E=document.documentElement.classList.contains("dark");_.toneMappingExposure=E?1.02:1.18,Wt.configure(jt,Ft),W()}const en=new ResizeObserver(yt);en.observe(i);const _e=new MutationObserver(Bt);_e.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const Jn=E=>{E.preventDefault(),vt||n()};_.domElement.addEventListener("pointerdown",Ae),_.domElement.addEventListener("pointerup",Ze),_.domElement.addEventListener("webglcontextlost",Jn);const nn=()=>W();return M.addEventListener("change",nn),M.addEventListener("start",()=>{Be=!1}),Bt(),zt("all"),h.position.copy(Xe),M.target.copy(Ne),Be=!1,yt(),{setPeople:C,resize:yt,focusRoom:zt,visitHome:Qt,setCameraMode:te,combatState:Y,facePilot(E){const D=u.get(E);D&&kt&&kt.face(D.group.position)},respawnPilot(E){if(!kt)return;Vt.leave(),Ct(!1),w.forget(at),Kn=!1,bi=null,Ge=null,Te=null,tn={},k={},Y(E),kt.reset({...E,flight:!1,air_access:!1}),On=!1,v.configureHomes(!0,null,Gi??128),bn&&Pt.setDoor(bn,!1);const D=u.get(at);D&&D.group.position.set(E.x,E.y,E.z),te("follow",at),W()},showHologram(E){L=E!==null&&(E===bn||E===at||u.get(E)?.person.is_me)?E:null,L===null&&T.hide(),W()},collisionBoxes:()=>v.boxes(),setPilotReporter(E){zi=E},castSkill(E=0){const D=u.get(at);if(!D||!kt)return{error:"Aktifkan kendali avatar dahulu."};const F=Eu(Fl(D.person.avatar).costume)[E];return F?w.cooldown(at)?{error:`Pulihkan energi ${w.cooldown(at)} detik lagi.`}:F.type==="transform"&&(Vt.active()||!v.free(kt.state().x,kt.state().z,kt.state().y,F.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:F.type==="transform"&&w.modeCooldown(at)?{error:`Transformasi pulih dalam ${w.modeCooldown(at)} detik.`}:(Ge=null,Te=null,w.cast(at,F.id,D)?(W(),{skill:F.id,skill_id:globalThis.crypto.randomUUID(),name:F.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(E,D){if(!E||!kt)return;Y(E);const F=D?.receivedAt??Date.now(),V=D?.sentAt??F;if(Number.isFinite(E.updated_ms)&&w.clock(E.updated_ms-(V+F)/2,Math.max(0,F-V)),Kn&&E.form)return;E.form||(Kn=!1),w.observe(at,E,u.get(at),!0);const X=w.modeState(at);kt.setForm(w.form(at),X?.expires),W()},toggleFlight(){const E=kt?.toggleFlight();return W(),E},endTransformation(){Kn=!0,bi=null,w.clearForm(at),kt?.setForm(null),te("follow",at),W()},activeTransformation:()=>w.modeState(at),setPrivatePilotProfile(E){ie&&(ie={...ie,avatar:E},C(z.map(D=>D.id===ie.id?ie:D)))},setPilotGate(E){Is=E},reconcilePilot(E){kt&&(kt.reset(E),Ge=null,Te=null,tn={},W())},configureHome(E,D,F=null){bn=E,ge=D?ra(D.slot):null,Gi=Number.isInteger(F)?Math.min(128,F):null,Pt.setPlots(Gi??0)},canUseDoor(){const E=kt?.state();return!!(ge&&E&&(Zi(E,ge)||Math.hypot(E.x-ge.x,E.z-ge.z-3.9)<=2.8))},homeDoorOpen:()=>On,setHomeDoor(E){On!==!!E&&(On=!!E,v.configureHomes(!0,On?ge?.slot:null),bn&&Pt.setDoor(bn,On),W())},setRestPose(E){if(!kt)return!1;if(w.cancel(at),Te=null,Ge=null,tn={},!E)return W(),!0;if(!["sit","recline","nap","meditate"].includes(E))return!1;const D=kt.state(),F=[...u.values()].filter(X=>X.person.id!==at&&X.pose!=="sleeping").map(X=>X.group.position),V=D.grounded?Wc(v,D,E,F):null;return D.grounded&&!V?!1:(Te={pose:E,point:V},V&&Math.hypot(V.x-D.x,V.z-D.z)<.04&&(kt.face({x:D.x+Math.sin(V.yaw),z:D.z+Math.cos(V.yaw)}),Ge={action:"rest",pose:E,venue:Zi(D,ge)?"home":["beach","garden","terrace","lounge","bar"].find(X=>kr(D,X))||"campus"},Te=null),W(),!0)},setPilot(E,D,F=null){at=E,ie=F,k={},Y(D),kt=qg(v,D),C(z),te("follow",E),W()},releasePilot(){Vt.leave(),w.clearForm(at),Kn=!1,bi=null;const E=ie?.id;at=null,ie=null,kt=null,tn={},Ge=null,Te=null,Zn=null,li.visible=!1,C(z.filter(D=>D.id!==E))},setPilotInput(E){tn=E||{},W()},pilotState(){return kt?{...kt.state(),...k,...Ge||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){at&&(te("follow",at),i.focus?.({preventScroll:!0}))},setPeerPilots(E){Bn.clear();for(const D of E)D.id!==at&&Bn.set(D.id,D);C(z.map(D=>({...D,pilot:Bn.get(D.id)||null,in_office:Bn.has(D.id)||D.id===at})))},canInteract(E){return kr(kt?.state(),E)},guideTo(E){const D=E==="home"&&ge?{x:ge.x,z:ge.z+5}:ti.venues[E];if(Zn=D?E:null,li.visible=!!D,D){li.position.set(D.x,.025,D.z);const F=kt?.state();zi({...F,target:E,distance:F?Math.round(Math.hypot(D.x-F.x,D.z-F.z)):null}),W()}return D},interactNearest(){const E=kt?.state();if(!E)return!1;if(ge&&(Zi(E,ge)||Math.hypot(E.x-ge.x,E.z-ge.z-3.9)<=2.8))return o(),!0;const D=Object.keys(ti.venues).filter(F=>kr(E,F)).sort((F,V)=>Math.hypot(E.x-ti.venues[F].x,E.z-ti.venues[F].z)-Math.hypot(E.x-ti.venues[V].x,E.z-ti.venues[V].z))[0];return Vi.some(F=>F.id===D)?(r(D),!0):["bar","disco","beach","garden","terrace","lounge","armory"].includes(D)?(s(D),!0):!1},setRecreation(E,D){Number(E)===at&&D&&(Ge={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[D.kind]||"idle",venue:D.destination,pose:D.kind==="relax"?"sit":null}),mt.set(Number(E),D?{...D,until:D.until||Date.now()/1e3+900}:null),C(z)},setVenueEffects(E){Zt.setEnabled(E),W()},setGame(E){JSON.stringify(Yt)!==JSON.stringify(E)&&(Yt=E,at&&E?.status==="playing"&&[E.from,E.to].includes(at)?Ge={action:"play",venue:E.kind}:Ge?.action==="play"&&(Ge=null),C(z))},say(E,D){const F=u.get(Number(E));F&&(F.bubble.textContent=String(D||"").slice(0,350),F.bubble.hidden=!1,Gt.has(E)&&clearTimeout(Gt.get(E)),Gt.set(E,setTimeout(()=>{F.bubble.hidden=!0,Gt.delete(E),W()},1e4)),W())},configureWorld(E){jt=E||{},Wt.configure(jt,Ft),it("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[jt.settings?.landscape]||"#47695f"),W()},setEnergySaver(E){Ft=!!E,_.setPixelRatio(Ft?1:Math.min(window.devicePixelRatio||1,1.5)),Wt.configure(jt,Ft),yt()},setMeeting(E){dt=E,C(z)},meetingReady(){if(at&&dt?.connected&&dt.room){const D=u.get(dt.room.from),F=u.get(dt.room.to);if(!D||!F||D.group.position.distanceTo(F.group.position)>3)return!1;const V=F.group.position.x-D.group.position.x,X=F.group.position.z-D.group.position.z,_t=Math.hypot(V,X);return _t>.2&&(Math.sin(D.group.rotation.y)*V+Math.cos(D.group.rotation.y)*X)/_t>.45&&(-Math.sin(F.group.rotation.y)*V-Math.cos(F.group.rotation.y)*X)/_t>.45}const E=dt?.room;return!E||!dt.connected?!1:[E.from,E.to].every(D=>{const F=u.get(D);return F&&F.pose==="meeting"&&!F.waypoints?.length&&F.group.position.distanceTo(F.home)<.2&&Math.abs(F.group.rotation.y-F.facing)<.15})},select(E,D=!1){q!==E&&Ct(),q=E,E&&!u.has(E)&&z.some(V=>V.id===E)&&C(z);for(const[V,X]of u)X.ring.visible=V===E,X.label.setAttribute("aria-pressed",String(V===E));const F=u.get(E);if(Pt.select(ot??(F?.pose==="sleeping"?E:null)),F&&D&&at&&E!==at&&kt){kt.face(F.group.position),W();return}if(F&&D&&ft!=="orbit"){te(ft,E);return}if(F&&D&&F.pose==="sleeping"){Qt(E);return}F&&D&&(Ne.copy(F.target).add(new B(0,1,0)),Xe.copy(Ne).add(new B(11,11,14)),st?(h.position.copy(Xe),M.target.copy(Ne)):Be=!0),W()},zoom(E){if(!Number.isFinite(E)||E<=0)return;Be=!1;const D=h.position.clone().sub(M.target);D.setLength(Di.clamp(D.length()*E,M.minDistance,M.maxDistance)),h.position.copy(M.target).add(D),M.update(),W()},setPaused(E){if(st=E,st&&Be&&(h.position.copy(Xe),M.target.copy(Ne),Be=!1),st)for(const D of u.values())D.pose==="meeting"&&(D.group.position.copy(D.home),D.group.rotation.y=D.facing,D.waypoints=[]);gt!==null&&cancelAnimationFrame(gt),gt=null,W()},setVisible(E){ht=E,!E&&gt!==null?(cancelAnimationFrame(gt),gt=null):E&&(rt=0,yt(),W())},dispose(){vt=!0,gt!==null&&cancelAnimationFrame(gt),gt=null,en.disconnect(),_e.disconnect(),M.dispose(),Vt.dispose(),w.dispose(),T.dispose(),I.dispose();for(const E of Gt.values())clearTimeout(E);Gt.clear(),mt.clear(),_.domElement.removeEventListener("pointerdown",Ae),_.domElement.removeEventListener("pointerup",Ze),_.domElement.removeEventListener("webglcontextlost",Jn),Pt.dispose(),tt.dispose(),Wt.dispose();for(const E of S)E.dispose();for(const E of b.values())E.dispose();for(const E of x)E.dispose();u.forEach(E=>E.label.remove()),u.clear(),d.clear(),_.dispose(),_.forceContextLoss(),_.domElement.remove()}}}export{s_ as createOfficeScene};
