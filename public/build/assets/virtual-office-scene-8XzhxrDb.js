import{m as Kn,w as gu,c as _u,g as Fi,s as xu,a as Dl,p as vu,b as Mu,d as Su,i as yu}from"./virtual-office-CkA_QFL7.js";const No="187",Wi={ROTATE:0,DOLLY:1,PAN:2},Vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gc=0,Ca=1,kc=2,Hs=1,Hc=2,ds=3,Ri=0,dn=1,ln=2,Xi=0,ms=1,Qs=2,Pa=3,Da=4,Vc=5,Hi=100,Wc=101,Xc=102,Yc=103,qc=104,Zc=200,Kc=201,Jc=202,$c=203,ka=204,Ha=205,Qc=206,jc=207,th=208,eh=209,nh=210,ih=211,sh=212,rh=213,oh=214,kr=0,Hr=1,Vr=2,_s=3,Wr=4,Xr=5,Yr=6,qr=7,Va=0,ah=1,lh=2,ei=0,Wa=1,Xa=2,Ya=3,Uo=4,qa=5,Za=6,Ka=7,Ja=300,qi=301,xs=302,Ur=303,Fr=304,Zr=1e3,ti=1001,Kr=1002,en=1003,ch=1004,Gs=1005,fn=1006,Or=1007,fi=1008,_n=1009,$a=1010,Qa=1011,vs=1012,Fo=1013,kn=1014,Dn=1015,Hn=1016,Oo=1017,Bo=1018,Zi=1020,ja=35902,tl=35899,el=1021,nl=1022,zn=1023,gi=1026,di=1027,zo=1028,Go=1029,Ci=1030,ko=1031,Ho=1033,Vs=33776,Ws=33777,Xs=33778,Ys=33779,Jr=35840,$r=35841,Qr=35842,jr=35843,to=36196,eo=37492,no=37496,io=37488,so=37489,js=37490,ro=37491,oo=37808,ao=37809,lo=37810,co=37811,ho=37812,uo=37813,fo=37814,po=37815,mo=37816,go=37817,_o=37818,xo=37819,vo=37820,Mo=37821,So=36492,yo=36494,bo=36495,Eo=36283,To=36284,tr=36285,Ao=36286,hh=3200,wo=0,uh=1,ui="",un="srgb",er="srgb-linear",nr="linear",Ae="srgb",Br=7680,fh=519,dh=512,ph=513,mh=514,il=515,gh=516,_h=517,sl=518,rl=519,xh=35044,ol=35048,La="300 es",Ln=2e3,Ms=2001;function bu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vh(){const i=Ro("canvas");return i.style.display="block",i}const Ll={};function Ia(...i){const t="THREE."+i.shift();console.log(t,...i)}function Mh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Kt(...i){i=Mh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function xe(...i){i=Mh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function qs(...i){const t=i.join(" ");t in Ll||(Ll[t]=!0,Kt(...i))}function Eu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Tu={[kr]:kr,[Vr]:Yr,[Wr]:Wr,[_s]:Xr,[Hr]:Hr,[Yr]:Vr,[qr]:qr,[Xr]:_s};class xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Il=1234567;const Zs=Math.PI/180,ir=180/Math.PI;function Es(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function oe(i,t,e){return Math.max(t,Math.min(e,i))}function al(i,t){return(i%t+t)%t}function Au(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function wu(i,t,e){return i!==t?(e-i)/(t-i):0}function Ks(i,t,e){return(1-e)*i+e*t}function Ru(i,t,e,n){return Ks(i,t,1-Math.exp(-e*n))}function Cu(i,t=1){return t-Math.abs(al(i,t*2)-t)}function Pu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Du(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Lu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Iu(i,t){return i+Math.random()*(t-i)}function Nu(i){return i*(.5-Math.random())}function Uu(i){i!==void 0&&(Il=i);let t=Il+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fu(i){return i*Zs}function Ou(i){return i*ir}function Bu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function zu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),p=o((t+n)/2),g=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*p,c*g,c*u,a*l);break;case"YZY":i.set(c*u,a*p,c*g,a*l);break;case"ZXZ":i.set(c*g,c*u,a*p,a*l);break;case"XZX":i.set(a*p,c*x,c*f,a*l);break;case"YXY":i.set(c*f,a*p,c*x,a*l);break;case"ZYZ":i.set(c*x,c*f,a*p,a*l);break;default:Kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ll(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function yh(i,t){if(t.constructor===Float32Array)return i;const e=ll(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function bh(i,t){if(t.constructor===Float32Array)return i;const e=ll(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Yi={DEG2RAD:Zs,RAD2DEG:ir,generateUUID:Es,clamp:oe,euclideanModulo:al,mapLinear:Au,inverseLerp:wu,lerp:Ks,damp:Ru,pingpong:Cu,smoothstep:Pu,smootherstep:Du,randInt:Lu,randFloat:Iu,randFloatSpread:Nu,seededRandom:Uu,degToRad:Fu,radToDeg:Ou,isPowerOfTwo:Bu,ceilPowerOfTwo:zu,floorPowerOfTwo:Sh,setQuaternionFromProperEuler:Gu,normalize:bh,denormalize:yh},wl=class wl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};wl.prototype.isVector2=!0;let Ot=wl;class xn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],p=n[s+2],g=n[s+3],u=r[o+0],f=r[o+1],x=r[o+2],S=r[o+3];if(g!==S||c!==u||l!==f||p!==x){let d=c*u+l*f+p*x+g*S;d<0&&(u=-u,f=-f,x=-x,S=-S,d=-d);let m=1-a;if(d<.9995){const y=Math.acos(d),E=Math.sin(y);m=Math.sin(m*y)/E,a=Math.sin(a*y)/E,c=c*m+u*a,l=l*m+f*a,p=p*m+x*a,g=g*m+S*a}else{c=c*m+u*a,l=l*m+f*a,p=p*m+x*a,g=g*m+S*a;const y=1/Math.sqrt(c*c+l*l+p*p+g*g);c*=y,l*=y,p*=y,g*=y}}t[e]=c,t[e+1]=l,t[e+2]=p,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],p=n[s+3],g=r[o],u=r[o+1],f=r[o+2],x=r[o+3];return t[e]=a*x+p*g+c*f-l*u,t[e+1]=c*x+p*u+l*g-a*f,t[e+2]=l*x+p*f+a*u-c*g,t[e+3]=p*x-a*g-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),p=a(s/2),g=a(r/2),u=c(n/2),f=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=u*p*g+l*f*x,this._y=l*f*g-u*p*x,this._z=l*p*x+u*f*g,this._w=l*p*g-u*f*x;break;case"YXZ":this._x=u*p*g+l*f*x,this._y=l*f*g-u*p*x,this._z=l*p*x-u*f*g,this._w=l*p*g+u*f*x;break;case"ZXY":this._x=u*p*g-l*f*x,this._y=l*f*g+u*p*x,this._z=l*p*x+u*f*g,this._w=l*p*g-u*f*x;break;case"ZYX":this._x=u*p*g-l*f*x,this._y=l*f*g+u*p*x,this._z=l*p*x-u*f*g,this._w=l*p*g+u*f*x;break;case"YZX":this._x=u*p*g+l*f*x,this._y=l*f*g+u*p*x,this._z=l*p*x-u*f*g,this._w=l*p*g-u*f*x;break;case"XZY":this._x=u*p*g-l*f*x,this._y=l*f*g-u*p*x,this._z=l*p*x+u*f*g,this._w=l*p*g+u*f*x;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],p=e[6],g=e[10],u=n+a+g;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(p-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>g){const f=2*Math.sqrt(1+n-a-g);this._w=(p-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>g){const f=2*Math.sqrt(1+a-n-g);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+p)/f}else{const f=2*Math.sqrt(1+g-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+p)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,p=e._w;return this._x=n*p+o*a+s*l-r*c,this._y=s*p+o*c+r*a-n*l,this._z=r*p+o*l+n*c-s*a,this._w=o*p-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),p=Math.sin(l);c=Math.sin(c*l)/p,e=Math.sin(e*l)/p,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Rl=class Rl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),p=2*(a*e-r*s),g=2*(r*n-o*e);return this.x=e+c*l+o*g-a*p,this.y=n+c*p+a*l-r*g,this.z=s+c*g+r*p-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ea.copy(this).projectOnVector(t),this.sub(ea)}reflect(t){return this.sub(ea.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Rl.prototype.isVector3=!0;let F=Rl;const ea=new F,Nl=new xn,Cl=class Cl{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const p=this.elements;return p[0]=t,p[1]=s,p[2]=a,p[3]=e,p[4]=r,p[5]=c,p[6]=n,p[7]=o,p[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],p=n[4],g=n[7],u=n[2],f=n[5],x=n[8],S=s[0],d=s[3],m=s[6],y=s[1],E=s[4],T=s[7],M=s[2],_=s[5],h=s[8];return r[0]=o*S+a*y+c*M,r[3]=o*d+a*E+c*_,r[6]=o*m+a*T+c*h,r[1]=l*S+p*y+g*M,r[4]=l*d+p*E+g*_,r[7]=l*m+p*T+g*h,r[2]=u*S+f*y+x*M,r[5]=u*d+f*E+x*_,r[8]=u*m+f*T+x*h,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8];return e*o*p-e*a*l-n*r*p+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8],g=p*o-a*l,u=a*c-p*r,f=l*r-o*c,x=e*g+n*u+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return t[0]=g*S,t[1]=(s*l-p*n)*S,t[2]=(a*n-s*o)*S,t[3]=u*S,t[4]=(p*e-s*c)*S,t[5]=(s*r-a*e)*S,t[6]=f*S,t[7]=(n*c-l*e)*S,t[8]=(o*e-n*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(na.makeScale(t,e)),this}rotate(t){return qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(na.makeRotation(-t)),this}translate(t,e){return qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Cl.prototype.isMatrix3=!0;let te=Cl;const na=new te,Ul=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fl=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ku(){const i={enabled:!0,workingColorSpace:er,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ae&&(s.r=pi(s.r),s.g=pi(s.g),s.b=pi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ae&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[er]:{primaries:t,whitePoint:n,transfer:nr,toXYZ:Ul,fromXYZ:Fl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:t,whitePoint:n,transfer:Ae,toXYZ:Ul,fromXYZ:Fl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const fe=ku();function pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ts;class Eh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ts===void 0&&(ts=Ro("canvas")),ts.width=t.width,ts.height=t.height;const s=ts.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ts}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=pi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(pi(e[n]/255)*255):e[n]=pi(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Hu=0;class Vo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Es(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ia(s[o].image)):r.push(ia(s[o]))}else r=ia(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Eh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}let Vu=0;const sa=new F;class rn extends xi{constructor(t=rn.DEFAULT_IMAGE,e=rn.DEFAULT_MAPPING,n=ti,s=ti,r=fn,o=fi,a=zn,c=_n,l=rn.DEFAULT_ANISOTROPY,p=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Es(),this.name="",this.source=new Vo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(sa).x}get height(){return this.source.getSize(sa).y}get depth(){return this.source.getSize(sa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ja)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zr:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case Kr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zr:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case Kr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Ja;rn.DEFAULT_ANISOTROPY=1;const Pl=class Pl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],p=c[4],g=c[8],u=c[1],f=c[5],x=c[9],S=c[2],d=c[6],m=c[10];if(Math.abs(p-u)<.01&&Math.abs(g-S)<.01&&Math.abs(x-d)<.01){if(Math.abs(p+u)<.1&&Math.abs(g+S)<.1&&Math.abs(x+d)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,T=(f+1)/2,M=(m+1)/2,_=(p+u)/4,h=(g+S)/4,v=(x+d)/4;return E>T&&E>M?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=_/n,r=h/n):T>M?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=_/s,r=v/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=h/r,s=v/r),this.set(n,s,r,e),this}let y=Math.sqrt((d-x)*(d-x)+(g-S)*(g-S)+(u-p)*(u-p));return Math.abs(y)<.001&&(y=1),this.x=(d-x)/y,this.y=(g-S)/y,this.z=(u-p)/y,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(oe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Pl.prototype.isVector4=!0;let Oe=Pl;class Th extends xi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new rn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Vo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends Th{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class cl extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ah extends rn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Io=class Io{constructor(t,e,n,s,r,o,a,c,l,p,g,u,f,x,S,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,p,g,u,f,x,S,d)}set(t,e,n,s,r,o,a,c,l,p,g,u,f,x,S,d){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=p,m[10]=g,m[14]=u,m[3]=f,m[7]=x,m[11]=S,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Io().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/es.setFromMatrixColumn(t,0).length(),r=1/es.setFromMatrixColumn(t,1).length(),o=1/es.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),p=Math.cos(r),g=Math.sin(r);if(t.order==="XYZ"){const u=o*p,f=o*g,x=a*p,S=a*g;e[0]=c*p,e[4]=-c*g,e[8]=l,e[1]=f+x*l,e[5]=u-S*l,e[9]=-a*c,e[2]=S-u*l,e[6]=x+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*p,f=c*g,x=l*p,S=l*g;e[0]=u+S*a,e[4]=x*a-f,e[8]=o*l,e[1]=o*g,e[5]=o*p,e[9]=-a,e[2]=f*a-x,e[6]=S+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*p,f=c*g,x=l*p,S=l*g;e[0]=u-S*a,e[4]=-o*g,e[8]=x+f*a,e[1]=f+x*a,e[5]=o*p,e[9]=S-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*p,f=o*g,x=a*p,S=a*g;e[0]=c*p,e[4]=x*l-f,e[8]=u*l+S,e[1]=c*g,e[5]=S*l+u,e[9]=f*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,x=a*c,S=a*l;e[0]=c*p,e[4]=S-u*g,e[8]=x*g+f,e[1]=g,e[5]=o*p,e[9]=-a*p,e[2]=-l*p,e[6]=f*g+x,e[10]=u-S*g}else if(t.order==="XZY"){const u=o*c,f=o*l,x=a*c,S=a*l;e[0]=c*p,e[4]=-g,e[8]=l*p,e[1]=u*g+S,e[5]=o*p,e[9]=f*g-x,e[2]=x*g-f,e[6]=a*p,e[10]=S*g+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wu,t,Xu)}lookAt(t,e,n){const s=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),yi.crossVectors(n,Mn),yi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),yi.crossVectors(n,Mn)),yi.normalize(),ar.crossVectors(Mn,yi),s[0]=yi.x,s[4]=ar.x,s[8]=Mn.x,s[1]=yi.y,s[5]=ar.y,s[9]=Mn.y,s[2]=yi.z,s[6]=ar.z,s[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],p=n[1],g=n[5],u=n[9],f=n[13],x=n[2],S=n[6],d=n[10],m=n[14],y=n[3],E=n[7],T=n[11],M=n[15],_=s[0],h=s[4],v=s[8],R=s[12],P=s[1],C=s[5],L=s[9],B=s[13],I=s[2],k=s[6],V=s[10],q=s[14],at=s[3],Q=s[7],z=s[11],nt=s[15];return r[0]=o*_+a*P+c*I+l*at,r[4]=o*h+a*C+c*k+l*Q,r[8]=o*v+a*L+c*V+l*z,r[12]=o*R+a*B+c*q+l*nt,r[1]=p*_+g*P+u*I+f*at,r[5]=p*h+g*C+u*k+f*Q,r[9]=p*v+g*L+u*V+f*z,r[13]=p*R+g*B+u*q+f*nt,r[2]=x*_+S*P+d*I+m*at,r[6]=x*h+S*C+d*k+m*Q,r[10]=x*v+S*L+d*V+m*z,r[14]=x*R+S*B+d*q+m*nt,r[3]=y*_+E*P+T*I+M*at,r[7]=y*h+E*C+T*k+M*Q,r[11]=y*v+E*L+T*V+M*z,r[15]=y*R+E*B+T*q+M*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],p=t[2],g=t[6],u=t[10],f=t[14],x=t[3],S=t[7],d=t[11],m=t[15],y=c*f-l*u,E=a*f-l*g,T=a*u-c*g,M=o*f-l*p,_=o*u-c*p,h=o*g-a*p;return e*(S*y-d*E+m*T)-n*(x*y-d*M+m*_)+s*(x*E-S*M+m*h)-r*(x*T-S*_+d*h)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],p=t[10];return e*(o*p-a*l)-n*(r*p-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],p=t[8],g=t[9],u=t[10],f=t[11],x=t[12],S=t[13],d=t[14],m=t[15],y=e*a-n*o,E=e*c-s*o,T=e*l-r*o,M=n*c-s*a,_=n*l-r*a,h=s*l-r*c,v=p*S-g*x,R=p*d-u*x,P=p*m-f*x,C=g*d-u*S,L=g*m-f*S,B=u*m-f*d,I=y*B-E*L+T*C+M*P-_*R+h*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return t[0]=(a*B-c*L+l*C)*k,t[1]=(s*L-n*B-r*C)*k,t[2]=(S*h-d*_+m*M)*k,t[3]=(u*_-g*h-f*M)*k,t[4]=(c*P-o*B-l*R)*k,t[5]=(e*B-s*P+r*R)*k,t[6]=(d*T-x*h-m*E)*k,t[7]=(p*h-u*T+f*E)*k,t[8]=(o*L-a*P+l*v)*k,t[9]=(n*P-e*L-r*v)*k,t[10]=(x*_-S*T+m*y)*k,t[11]=(g*T-p*_-f*y)*k,t[12]=(a*R-o*C-c*v)*k,t[13]=(e*C-n*R+s*v)*k,t[14]=(S*E-x*M-d*y)*k,t[15]=(p*M-g*E+u*y)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,p=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,p*a+n,p*c-s*o,0,l*c-s*a,p*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,p=o+o,g=a+a,u=r*l,f=r*p,x=r*g,S=o*p,d=o*g,m=a*g,y=c*l,E=c*p,T=c*g,M=n.x,_=n.y,h=n.z;return s[0]=(1-(S+m))*M,s[1]=(f+T)*M,s[2]=(x-E)*M,s[3]=0,s[4]=(f-T)*_,s[5]=(1-(u+m))*_,s[6]=(d+y)*_,s[7]=0,s[8]=(x+E)*h,s[9]=(d-y)*h,s[10]=(1-(u+S))*h,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=es.set(s[0],s[1],s[2]).length();const a=es.set(s[4],s[5],s[6]).length(),c=es.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Un.copy(this);const l=1/o,p=1/a,g=1/c;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=p,Un.elements[5]*=p,Un.elements[6]*=p,Un.elements[8]*=g,Un.elements[9]*=g,Un.elements[10]*=g,e.setFromRotationMatrix(Un),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Ln,c=!1){const l=this.elements,p=2*r/(e-t),g=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let x,S;if(c)x=r/(o-r),S=o*r/(o-r);else if(a===Ln)x=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===Ms)x=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=p,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=g,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ln,c=!1){const l=this.elements,p=2/(e-t),g=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let x,S;if(c)x=1/(o-r),S=o/(o-r);else if(a===Ln)x=-2/(o-r),S=-(o+r)/(o-r);else if(a===Ms)x=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=p,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=g,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=x,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Io.prototype.isMatrix4=!0;let de=Io;const es=new F,Un=new de,Wu=new F(0,0,0),Xu=new F(1,1,1),yi=new F,ar=new F,Mn=new F,Ol=new de,Bl=new xn;class Vn{constructor(t=0,e=0,n=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],p=s[9],g=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-p,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-g,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-oe(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-p,l),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-p,f),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ol,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Wo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yu=0;const zl=new F,ns=new xn,oi=new de,lr=new F,Ds=new F,qu=new F,Zu=new xn,Gl=new F(1,0,0),kl=new F(0,1,0),Hl=new F(0,0,1),Vl={type:"added"},Ku={type:"removed"},is={type:"childadded",child:null},ra={type:"childremoved",child:null};class Ye extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ye.DEFAULT_UP.clone();const t=new F,e=new Vn,n=new xn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new te}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,e){return ns.setFromAxisAngle(t,e),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(Gl,t)}rotateY(t){return this.rotateOnAxis(kl,t)}rotateZ(t){return this.rotateOnAxis(Hl,t)}translateOnAxis(t,e){return zl.copy(t).applyQuaternion(this.quaternion),this.position.add(zl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gl,t)}translateY(t){return this.translateOnAxis(kl,t)}translateZ(t){return this.translateOnAxis(Hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lr.copy(t):lr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(Ds,lr,this.up):oi.lookAt(lr,Ds,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(oi),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(xe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),is.child=t,this.dispatchEvent(is),is.child=null):xe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ku),ra.child=t,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,qu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Zu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,p=c.length;l<p;l++){const g=c[l];r(t.shapes,g)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),p=o(t.images),g=o(t.shapes),u=o(t.skeletons),f=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),p.length>0&&(n.images=p),g.length>0&&(n.shapes=g),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){const c=[];for(const l in a){const p=a[l];delete p.metadata,c.push(p)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ye.DEFAULT_UP=new F(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class yn extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ju={type:"move"};class zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const S of t.hand.values()){const d=e.getJointPose(S,n),m=this._getHandJoint(l,S);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const p=l.joints["index-finger-tip"],g=l.joints["thumb-tip"],u=p.position.distanceTo(g.position),f=.02,x=.005;l.inputState.pinching&&u>f+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ju)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new yn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},cr={h:0,s:0,l:0};function oa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ne{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=fe.workingColorSpace){if(t=al(t,1),e=oe(e,0,1),n=oe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=oa(o,r,t+1/3),this.g=oa(o,r,t),this.b=oa(o,r,t-1/3)}return fe.colorSpaceToWorking(this,s),this}setStyle(t,e=un){function n(r){r!==void 0&&parseFloat(r)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=un){const n=wh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pi(t.r),this.g=pi(t.g),this.b=pi(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return fe.workingToColorSpace(an.copy(this),t),Math.round(oe(an.r*255,0,255))*65536+Math.round(oe(an.g*255,0,255))*256+Math.round(oe(an.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.workingToColorSpace(an.copy(this),e);const n=an.r,s=an.g,r=an.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const p=(a+o)/2;if(a===o)c=0,l=0;else{const g=o-a;switch(l=p<=.5?g/(o+a):g/(2-o-a),o){case n:c=(s-r)/g+(s<r?6:0);break;case s:c=(r-n)/g+2;break;case r:c=(n-s)/g+4;break}c/=6}return t.h=c,t.s=l,t.l=p,t}getRGB(t,e=fe.workingColorSpace){return fe.workingToColorSpace(an.copy(this),e),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=un){fe.workingToColorSpace(an.copy(this),t);const e=an.r,n=an.g,s=an.b;return t!==un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(bi),this.setHSL(bi.h+t,bi.s+e,bi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(bi),t.getHSL(cr);const n=Ks(bi.h,cr.h,e),s=Ks(bi.s,cr.s,e),r=Ks(bi.l,cr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ne;ne.NAMES=wh;class Xo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ne(t),this.density=e}clone(){return new Xo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Rh extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Fn=new F,ai=new F,aa=new F,li=new F,ss=new F,rs=new F,Wl=new F,la=new F,ca=new F,ha=new F,ua=new Oe,fa=new Oe,da=new Oe;class Pn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Fn.subVectors(s,e),ai.subVectors(n,e),aa.subVectors(t,e);const o=Fn.dot(Fn),a=Fn.dot(ai),c=Fn.dot(aa),l=ai.dot(ai),p=ai.dot(aa),g=o*l-a*a;if(g===0)return r.set(0,0,0),null;const u=1/g,f=(l*c-a*p)*u,x=(o*p-a*c)*u;return r.set(1-f-x,x,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,li)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,li.x),c.addScaledVector(o,li.y),c.addScaledVector(a,li.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ua.setScalar(0),fa.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(t,e),fa.fromBufferAttribute(t,n),da.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ua,r.x),o.addScaledVector(fa,r.y),o.addScaledVector(da,r.z),o}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),ai.subVectors(t,e),Fn.cross(ai).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Fn.cross(ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Pn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Pn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Pn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ss.subVectors(s,n),rs.subVectors(r,n),la.subVectors(t,n);const c=ss.dot(la),l=rs.dot(la);if(c<=0&&l<=0)return e.copy(n);ca.subVectors(t,s);const p=ss.dot(ca),g=rs.dot(ca);if(p>=0&&g<=p)return e.copy(s);const u=c*g-p*l;if(u<=0&&c>=0&&p<=0&&c-p>0)return o=c/(c-p),e.copy(n).addScaledVector(ss,o);ha.subVectors(t,r);const f=ss.dot(ha),x=rs.dot(ha);if(x>=0&&f<=x)return e.copy(r);const S=f*l-c*x;if(S<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(n).addScaledVector(rs,a);const d=p*x-f*g;if(d<=0&&g-p>=0&&f-x>=0)return Wl.subVectors(r,s),a=(g-p)/(g-p+(f-x)),e.copy(s).addScaledVector(Wl,a);const m=1/(d+S+u);return o=S*m,a=u*m,e.copy(n).addScaledVector(ss,o).addScaledVector(rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Di{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,On):On.fromBufferAttribute(r,o),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hr.copy(n.boundingBox)),hr.applyMatrix4(t.matrixWorld),this.union(hr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),ur.subVectors(this.max,Ls),os.subVectors(t.a,Ls),as.subVectors(t.b,Ls),ls.subVectors(t.c,Ls),Ei.subVectors(as,os),Ti.subVectors(ls,as),Oi.subVectors(os,ls);let e=[0,-Ei.z,Ei.y,0,-Ti.z,Ti.y,0,-Oi.z,Oi.y,Ei.z,0,-Ei.x,Ti.z,0,-Ti.x,Oi.z,0,-Oi.x,-Ei.y,Ei.x,0,-Ti.y,Ti.x,0,-Oi.y,Oi.x,0];return!pa(e,os,as,ls,ur)||(e=[1,0,0,0,1,0,0,0,1],!pa(e,os,as,ls,ur))?!1:(fr.crossVectors(Ei,Ti),e=[fr.x,fr.y,fr.z],pa(e,os,as,ls,ur))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ci=[new F,new F,new F,new F,new F,new F,new F,new F],On=new F,hr=new Di,os=new F,as=new F,ls=new F,Ei=new F,Ti=new F,Oi=new F,Ls=new F,ur=new F,fr=new F,Bi=new F;function pa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bi.fromArray(i,r);const a=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),c=t.dot(Bi),l=e.dot(Bi),p=n.dot(Bi);if(Math.max(-Math.max(c,l,p),Math.min(c,l,p))>a)return!1}return!0}const Xe=new F,dr=new Ot;let $u=0;class pn extends xi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$u++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=xh,this.updateRanges=[],this.gpuType=Dn,this.version=0,this._normalizationScale=t!==void 0?ll(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):yh(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):bh(t,this.array)}}class hl extends pn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ul extends pn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class we extends pn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Qu=new Di,Is=new F,ma=new F;class Li{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Qu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ma.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(ma)),this.expandByPoint(Is.copy(t.center).sub(ma))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ju=0;const wn=new de,ga=new Ye,cs=new F,Sn=new Di,Ns=new Di,tn=new F;class Je extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bu(t)?ul:hl)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new te().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return wn.makeRotationFromQuaternion(t),this.applyMatrix4(wn),this}rotateX(t){return wn.makeRotationX(t),this.applyMatrix4(wn),this}rotateY(t){return wn.makeRotationY(t),this.applyMatrix4(wn),this}rotateZ(t){return wn.makeRotationZ(t),this.applyMatrix4(wn),this}translate(t,e,n){return wn.makeTranslation(t,e,n),this.applyMatrix4(wn),this}scale(t,e,n){return wn.makeScale(t,e,n),this.applyMatrix4(wn),this}lookAt(t){return ga.lookAt(t),ga.updateMatrix(),this.applyMatrix4(ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(Sn.min,Ns.min),Sn.expandByPoint(tn),tn.addVectors(Sn.max,Ns.max),Sn.expandByPoint(tn)):(Sn.expandByPoint(Ns.min),Sn.expandByPoint(Ns.max))}Sn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)tn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(tn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,p=a.count;l<p;l++)tn.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),tn.add(cs)),s=Math.max(s,n.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new pn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[],l=new Uint8Array(n.count);for(let R=0;R<n.count;R++)a[R]=new F,c[R]=new F;const p=new F,g=new F,u=new F,f=new Ot,x=new Ot,S=new Ot,d=new F,m=new F;function y(R,P,C){l[R]=l[P]=l[C]=1,p.fromBufferAttribute(n,R),g.fromBufferAttribute(n,P),u.fromBufferAttribute(n,C),f.fromBufferAttribute(r,R),x.fromBufferAttribute(r,P),S.fromBufferAttribute(r,C),g.sub(p),u.sub(p),x.sub(f),S.sub(f);const L=1/(x.x*S.y-S.x*x.y);isFinite(L)&&(d.copy(g).multiplyScalar(S.y).addScaledVector(u,-x.y).multiplyScalar(L),m.copy(u).multiplyScalar(x.x).addScaledVector(g,-S.x).multiplyScalar(L),a[R].add(d),a[P].add(d),a[C].add(d),c[R].add(m),c[P].add(m),c[C].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let R=0,P=E.length;R<P;++R){const C=E[R],L=C.start,B=C.count;for(let I=L,k=L+B;I<k;I+=3)y(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const T=new F,M=new F,_=new F,h=new F;function v(R){_.fromBufferAttribute(s,R),h.copy(_);const P=a[R];T.copy(P),T.sub(_.multiplyScalar(_.dot(P))).normalize(),M.crossVectors(h,P);const L=M.dot(c[R])<0?-1:1;o.setXYZW(R,T.x,T.y,T.z,L)}for(let R=0,P=n.count;R<P;++R)l[R]&&v(R);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,p=new F,g=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){const x=t.getX(u+0),S=t.getX(u+1),d=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,S),o.fromBufferAttribute(e,d),p.subVectors(o,r),g.subVectors(s,r),p.cross(g),a.fromBufferAttribute(n,x),c.fromBufferAttribute(n,S),l.fromBufferAttribute(n,d),a.add(p),c.add(p),l.add(p),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(S,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),p.subVectors(o,r),g.subVectors(s,r),p.cross(g),n.setXYZ(u+0,p.x,p.y,p.z),n.setXYZ(u+1,p.x,p.y,p.z),n.setXYZ(u+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)tn.fromBufferAttribute(t,e),tn.normalize(),t.setXYZ(e,tn.x,tn.y,tn.z)}toNonIndexed(){function t(a,c){const l=a.array,p=a.itemSize,g=a.normalized,u=new l.constructor(c.length*p);let f=0,x=0;for(let S=0,d=c.length;S<d;S++){a.isInterleavedBufferAttribute?f=c[S]*a.data.stride+a.offset:f=c[S]*p;for(let m=0;m<p;m++)u[x++]=l[f++]}return new pn(u,p,g)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Je,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let p=0,g=l.length;p<g;p++){const u=l[p],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],p=[];for(let g=0,u=l.length;g<u;g++){const f=l[g];p.push(f.toJSON(t.data))}p.length>0&&(s[c]=p,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const p=s[l];this.setAttribute(l,p.clone(e))}const r=t.morphAttributes;for(const l in r){const p=[],g=r[l];for(let u=0,f=g.length;u<f;u++)p.push(g[u].clone(e));this.morphAttributes[l]=p}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,p=o.length;l<p;l++){const g=o[l];this.addGroup(g.start,g.count,g.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _a=new F,tf=new F,ef=new te;class $n{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=_a.subVectors(n,e).cross(tf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(_a),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ef.getNormalMatrix(t),s=this.coplanarPoint(_a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let nf=0;class Ii extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=ms,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Ha,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Br,this.stencilZFail=Br,this.stencilZPass=Br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ne().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new $n().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ot().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const hi=new F,xa=new F,pr=new F,mr=new F;class Ts{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=hi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hi.copy(this.origin).addScaledVector(this.direction,e),hi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){xa.copy(t).add(e).multiplyScalar(.5),pr.copy(e).sub(t).normalize(),mr.copy(this.origin).sub(xa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(pr),a=mr.dot(this.direction),c=-mr.dot(pr),l=mr.lengthSq(),p=Math.abs(1-o*o);let g,u,f,x;if(p>0)if(g=o*c-a,u=o*a-c,x=r*p,g>=0)if(u>=-x)if(u<=x){const S=1/p;g*=S,u*=S,f=g*(g+o*u+2*a)+u*(o*g+u+2*c)+l}else u=r,g=Math.max(0,-(o*u+a)),f=-g*g+u*(u+2*c)+l;else u=-r,g=Math.max(0,-(o*u+a)),f=-g*g+u*(u+2*c)+l;else u<=-x?(g=Math.max(0,-(-o*r+a)),u=g>0?-r:Math.min(Math.max(-r,-c),r),f=-g*g+u*(u+2*c)+l):u<=x?(g=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(g=Math.max(0,-(o*r+a)),u=g>0?r:Math.min(Math.max(-r,-c),r),f=-g*g+u*(u+2*c)+l);else u=o>0?-r:r,g=Math.max(0,-(o*u+a)),f=-g*g+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(xa).addScaledVector(pr,u),f}intersectSphere(t,e){if(t.radius<0)return null;hi.subVectors(t.center,this.origin);const n=hi.dot(this.direction),s=hi.dot(hi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,p=1/this.direction.y,g=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),p>=0?(r=(t.min.y-u.y)*p,o=(t.max.y-u.y)*p):(r=(t.max.y-u.y)*p,o=(t.min.y-u.y)*p),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(a=(t.min.z-u.z)*g,c=(t.max.z-u.z)*g):(a=(t.max.z-u.z)*g,c=(t.min.z-u.z)*g),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,hi)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,p=a.z,g=t.x-o.x,u=t.y-o.y,f=t.z-o.z,x=e.x-o.x,S=e.y-o.y,d=e.z-o.z,m=n.x-o.x,y=n.y-o.y,E=n.z-o.z,T=Math.abs(c),M=Math.abs(l),_=Math.abs(p);let h,v,R,P,C,L,B,I,k,V,q,at;if(T>=M&&T>=_?(R=c,L=g,k=x,at=m,c>=0?(h=l,v=p,P=u,C=f,B=S,I=d,V=y,q=E):(h=p,v=l,P=f,C=u,B=d,I=S,V=E,q=y)):M>=_?(R=l,L=u,k=S,at=y,l>=0?(h=p,v=c,P=f,C=g,B=d,I=x,V=E,q=m):(h=c,v=p,P=g,C=f,B=x,I=d,V=m,q=E)):(R=p,L=f,k=d,at=E,p>=0?(h=c,v=l,P=g,C=u,B=x,I=S,V=m,q=y):(h=l,v=c,P=u,C=g,B=S,I=x,V=y,q=m)),R===0)return null;const Q=h/R,z=v/R,nt=1/R,pt=P-Q*L,Rt=C-z*L,j=B-Q*k,ft=I-z*k,Dt=V-Q*at,Nt=q-z*at,wt=Dt*ft-Nt*j,qt=pt*Nt-Rt*Dt,Le=j*Rt-ft*pt;if(s){if(wt<0||qt<0||Le<0)return null}else if((wt<0||qt<0||Le<0)&&(wt>0||qt>0||Le>0))return null;const Wt=wt+qt+Le;if(Wt===0)return null;const Vt=nt*(wt*L+qt*k+Le*at);return(Wt>0?Vt<0:Vt>0)?null:this.at(Vt/Wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qn extends Ii{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xl=new de,zi=new Ts,gr=new Li,Yl=new F,_r=new F,xr=new F,vr=new F,va=new F,Mr=new F,ql=new F,Sr=new F;class ve extends Ye{constructor(t=new Je,e=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Mr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const p=a[c],g=r[c];p!==0&&(va.fromBufferAttribute(g,t),o?Mr.addScaledVector(va,p):Mr.addScaledVector(va.sub(e),p))}e.add(Mr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),zi.copy(t.ray).recast(t.near),!(gr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(gr,Yl)===null||zi.origin.distanceToSquared(Yl)>(t.far-t.near)**2))&&(Xl.copy(r).invert(),zi.copy(t.ray).applyMatrix4(Xl),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,p=r.attributes.uv1,g=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,S=u.length;x<S;x++){const d=u[x],m=o[d.materialIndex],y=Math.max(d.start,f.start),E=Math.min(a.count,Math.min(d.start+d.count,f.start+f.count));for(let T=y,M=E;T<M;T+=3){const _=a.getX(T),h=a.getX(T+1),v=a.getX(T+2);s=yr(this,m,t,n,l,p,g,_,h,v),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(a.count,f.start+f.count);for(let d=x,m=S;d<m;d+=3){const y=a.getX(d),E=a.getX(d+1),T=a.getX(d+2);s=yr(this,o,t,n,l,p,g,y,E,T),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,S=u.length;x<S;x++){const d=u[x],m=o[d.materialIndex],y=Math.max(d.start,f.start),E=Math.min(c.count,Math.min(d.start+d.count,f.start+f.count));for(let T=y,M=E;T<M;T+=3){const _=T,h=T+1,v=T+2;s=yr(this,m,t,n,l,p,g,_,h,v),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(c.count,f.start+f.count);for(let d=x,m=S;d<m;d+=3){const y=d,E=d+1,T=d+2;s=yr(this,o,t,n,l,p,g,y,E,T),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}}function sf(i,t,e,n,s,r,o,a){let c;if(t.side===dn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Ri,a),c===null)return null;Sr.copy(a),Sr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Sr);return l<e.near||l>e.far?null:{distance:l,point:Sr.clone(),object:i}}function yr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,_r),i.getVertexPosition(c,xr),i.getVertexPosition(l,vr);const p=sf(i,t,e,n,_r,xr,vr,ql);if(p){const g=new F;Pn.getBarycoord(ql,_r,xr,vr,g),s&&(p.uv=Pn.getInterpolatedAttribute(s,a,c,l,g,new Ot)),r&&(p.uv1=Pn.getInterpolatedAttribute(r,a,c,l,g,new Ot)),o&&(p.normal=Pn.getInterpolatedAttribute(o,a,c,l,g,new F),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new F,materialIndex:0};Pn.getNormal(_r,xr,vr,u.normal),p.face=u,p.barycoord=g}return p}class fl extends rn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=en,p=en,g,u){super(null,o,a,c,l,p,s,r,g,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Na extends pn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const hs=new de,Zl=new de,br=[],Kl=new Di,rf=new de,Us=new ve,Fs=new Li;class dl extends ve{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Na(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,rf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),Kl.copy(t.boundingBox).applyMatrix4(hs),this.boundingBox.union(Kl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hs),Fs.copy(t.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(Fs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Us.geometry=this.geometry,Us.material=this.material,Us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(n),t.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hs),Zl.multiplyMatrices(n,hs),Us.matrixWorld=Zl,Us.raycast(t,br);for(let o=0,a=br.length;o<a;o++){const c=br[o];c.instanceId=r,c.object=this,e.push(c)}br.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Na(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new fl(new Float32Array(s*this.count),s,this.count,zo,Dn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Gi=new Li,of=new Ot(.5,.5),Er=new F;class Ss{constructor(t=new $n,e=new $n,n=new $n,s=new $n,r=new $n,o=new $n){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],p=r[4],g=r[5],u=r[6],f=r[7],x=r[8],S=r[9],d=r[10],m=r[11],y=r[12],E=r[13],T=r[14],M=r[15];if(s[0].setComponents(l-o,f-p,m-x,M-y).normalize(),s[1].setComponents(l+o,f+p,m+x,M+y).normalize(),s[2].setComponents(l+a,f+g,m+S,M+E).normalize(),s[3].setComponents(l-a,f-g,m-S,M-E).normalize(),n)s[4].setComponents(c,u,d,T).normalize(),s[5].setComponents(l-c,f-u,m-d,M-T).normalize();else if(s[4].setComponents(l-c,f-u,m-d,M-T).normalize(),e===Ln)s[5].setComponents(l+c,f+u,m+d,M+T).normalize();else if(e===Ms)s[5].setComponents(c,u,d,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gi)}intersectsSprite(t){Gi.center.set(0,0,0);const e=of.distanceTo(t.center);return Gi.radius=.7071067811865476+e,Gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Er.x=s.normal.x>0?t.max.x:t.min.x,Er.y=s.normal.y>0?t.max.y:t.min.y,Er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Er)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Jl=new de;class Yo{constructor(){this.coordinateSystem=Ln,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];Jl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ss),n[s].setFromProjectionMatrix(Jl,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Ss),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Yo().copy(this)}}class pl extends Ii{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Co=new F,Po=new F,$l=new de,Os=new Ts,Tr=new Li,Ma=new F,Ql=new F;class Ch extends Ye{constructor(t=new Je,e=new pl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Co.fromBufferAttribute(e,s-1),Po.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Co.distanceTo(Po);t.setAttribute("lineDistance",new we(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(s),Tr.radius+=r,t.ray.intersectsSphere(Tr)===!1)return;$l.copy(s).invert(),Os.copy(t.ray).applyMatrix4($l);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,p=n.index,u=n.attributes.position;if(p!==null){const f=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let S=f,d=x-1;S<d;S+=l){const m=p.getX(S),y=p.getX(S+1),E=Ar(this,t,Os,c,m,y,S);E&&e.push(E)}if(this.isLineLoop){const S=p.getX(x-1),d=p.getX(f),m=Ar(this,t,Os,c,S,d,x-1);m&&e.push(m)}}else{const f=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let S=f,d=x-1;S<d;S+=l){const m=Ar(this,t,Os,c,S,S+1,S);m&&e.push(m)}if(this.isLineLoop){const S=Ar(this,t,Os,c,x-1,f,x-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ar(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Co.fromBufferAttribute(a,s),Po.fromBufferAttribute(a,r),e.distanceSqToSegment(Co,Po,Ma,Ql)>n)return;Ma.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ma);if(!(l<t.near||l>t.far))return{distance:l,point:Ql.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const jl=new F,tc=new F;class Ph extends Ch{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)jl.fromBufferAttribute(e,s),tc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+jl.distanceTo(tc);t.setAttribute("lineDistance",new we(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ml extends Ii{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ec=new de,Ua=new Ts,wr=new Li,Rr=new F;class Dh extends Ye{constructor(t=new Je,e=new ml){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(s),wr.radius+=r,t.ray.intersectsSphere(wr)===!1)return;ec.copy(s).invert(),Ua.copy(t.ray).applyMatrix4(ec);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,g=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let x=u,S=f;x<S;x++){const d=l.getX(x);Rr.fromBufferAttribute(g,d),nc(Rr,d,c,s,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(g.count,o.start+o.count);for(let x=u,S=f;x<S;x++)Rr.fromBufferAttribute(g,x),nc(Rr,x,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function nc(i,t,e,n,s,r,o){const a=Ua.distanceSqToPoint(i);if(a<e){const c=new F;Ua.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class gl extends rn{constructor(t=[],e=qi,n,s,r,o,a,c,l,p){super(t,e,n,s,r,o,a,c,l,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fa extends rn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ki extends rn{constructor(t,e,n=kn,s,r,o,a=en,c=en,l,p=gi,g=1){if(p!==gi&&p!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:g};super(u,s,r,o,a,c,p,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class _l extends Ki{constructor(t,e=kn,n=qi,s,r,o=en,a=en,c,l=gi){const p={width:t,height:t,depth:1},g=[p,p,p,p,p,p];super(t,t,e,n,s,r,o,a,c,l),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class xl extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ke extends Je{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],p=[],g=[];let u=0,f=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(p,3)),this.setAttribute("uv",new we(g,2));function x(S,d,m,y,E,T,M,_,h,v,R){const P=T/h,C=M/v,L=T/2,B=M/2,I=_/2,k=h+1,V=v+1;let q=0,at=0;const Q=new F;for(let z=0;z<V;z++){const nt=z*C-B;for(let pt=0;pt<k;pt++){const Rt=pt*P-L;Q[S]=Rt*y,Q[d]=nt*E,Q[m]=I,l.push(Q.x,Q.y,Q.z),Q[S]=0,Q[d]=0,Q[m]=_>0?1:-1,p.push(Q.x,Q.y,Q.z),g.push(pt/h),g.push(1-z/v),q+=1}}for(let z=0;z<v;z++)for(let nt=0;nt<h;nt++){const pt=u+nt+k*z,Rt=u+nt+k*(z+1),j=u+(nt+1)+k*(z+1),ft=u+(nt+1)+k*z;c.push(pt,Rt,ft),c.push(Rt,j,ft),at+=6}a.addGroup(f,at,R),f+=at,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ke(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class In extends Je{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const p=[],g=[],u=[],f=[];let x=0;const S=[],d=n/2;let m=0;y(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(p),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(f,2));function y(){const T=new F,M=new F;let _=0;const h=(e-t)/n;for(let v=0;v<=r;v++){const R=[],P=v/r,C=P*(e-t)+t;for(let L=0;L<=s;L++){const B=L/s,I=B*c+a,k=Math.sin(I),V=Math.cos(I);M.x=C*k,M.y=-P*n+d,M.z=C*V,g.push(M.x,M.y,M.z),T.set(k,h,V).normalize(),u.push(T.x,T.y,T.z),f.push(B,1-P),R.push(x++)}S.push(R)}for(let v=0;v<s;v++)for(let R=0;R<r;R++){const P=S[R][v],C=S[R+1][v],L=S[R+1][v+1],B=S[R][v+1];(t>0||R!==0)&&(p.push(P,C,B),_+=3),(e>0||R!==r-1)&&(p.push(C,L,B),_+=3)}l.addGroup(m,_,0),m+=_}function E(T){const M=x,_=new Ot,h=new F;let v=0;const R=T===!0?t:e,P=T===!0?1:-1;for(let L=1;L<=s;L++)g.push(0,d*P,0),u.push(0,P,0),f.push(.5,.5),x++;const C=x;for(let L=0;L<=s;L++){const I=L/s*c+a,k=Math.cos(I),V=Math.sin(I);h.x=R*V,h.y=d*P,h.z=R*k,g.push(h.x,h.y,h.z),u.push(0,P,0),_.x=k*.5+.5,_.y=V*.5*P+.5,f.push(_.x,_.y),x++}for(let L=0;L<s;L++){const B=M+L,I=C+L;T===!0?p.push(I,I+1,B):p.push(I+1,I,B),v+=3}l.addGroup(m,v,T===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ni extends In{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ni(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qo extends Je{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),p(),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(r.slice(),3)),this.setAttribute("uv",new we(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const E=new F,T=new F,M=new F;for(let _=0;_<e.length;_+=3)f(e[_+0],E),f(e[_+1],T),f(e[_+2],M),c(E,T,M,y)}function c(y,E,T,M){const _=M+1,h=[];for(let v=0;v<=_;v++){h[v]=[];const R=y.clone().lerp(T,v/_),P=E.clone().lerp(T,v/_),C=_-v;for(let L=0;L<=C;L++)L===0&&v===_?h[v][L]=R:h[v][L]=R.clone().lerp(P,L/C)}for(let v=0;v<_;v++)for(let R=0;R<2*(_-v)-1;R++){const P=Math.floor(R/2);R%2===0?(u(h[v][P+1]),u(h[v+1][P]),u(h[v][P])):(u(h[v][P+1]),u(h[v+1][P+1]),u(h[v+1][P]))}}function l(y){const E=new F;for(let T=0;T<r.length;T+=3)E.x=r[T+0],E.y=r[T+1],E.z=r[T+2],E.normalize().multiplyScalar(y),r[T+0]=E.x,r[T+1]=E.y,r[T+2]=E.z}function p(){const y=new F;for(let E=0;E<r.length;E+=3){y.x=r[E+0],y.y=r[E+1],y.z=r[E+2];const T=d(y)/2/Math.PI+.5,M=m(y)/Math.PI+.5;o.push(T,1-M)}x(),g()}function g(){for(let y=0;y<o.length;y+=6){const E=o[y+0],T=o[y+2],M=o[y+4],_=Math.max(E,T,M),h=Math.min(E,T,M);_>.9&&h<.1&&(E<.2&&(o[y+0]+=1),T<.2&&(o[y+2]+=1),M<.2&&(o[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,E){const T=y*3;E.x=t[T+0],E.y=t[T+1],E.z=t[T+2]}function x(){const y=new F,E=new F,T=new F,M=new F,_=new Ot,h=new Ot,v=new Ot;for(let R=0,P=0;R<r.length;R+=9,P+=6){y.set(r[R+0],r[R+1],r[R+2]),E.set(r[R+3],r[R+4],r[R+5]),T.set(r[R+6],r[R+7],r[R+8]),_.set(o[P+0],o[P+1]),h.set(o[P+2],o[P+3]),v.set(o[P+4],o[P+5]),M.copy(y).add(E).add(T).divideScalar(3);const C=d(M);S(_,P+0,y,C),S(h,P+2,E,C),S(v,P+4,T,C)}}function S(y,E,T,M){M<0&&y.x===1&&(o[E]=y.x-1),T.x===0&&T.z===0&&(o[E]=M/2/Math.PI+.5)}function d(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qo(t.vertices,t.indices,t.radius,t.detail)}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const p=n[s],u=n[s+1]-p,f=(o-p)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Ot:new F);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new F,s=[],r=[],o=[],a=new F,c=new de;for(let f=0;f<=t;f++){const x=f/t;s[f]=this.getTangentAt(x,new F)}r[0]=new F,o[0]=new F;let l=Number.MAX_VALUE;const p=Math.abs(s[0].x),g=Math.abs(s[0].y),u=Math.abs(s[0].z);p<=l&&(l=p,n.set(1,0,0)),g<=l&&(l=g,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(oe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,x))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(oe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],f*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class vl extends ii{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const p=Math.cos(this.aRotation),g=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*p-f*g+this.aX,l=u*g+f*p+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Lh extends vl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ml(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,p,g){let u=(o-r)/l-(a-r)/(l+p)+(a-o)/p,f=(a-o)/p-(c-o)/(p+g)+(c-a)/g;u*=p,f*=p,s(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ic=new F,sc=new F,Sa=new Ml,ya=new Ml,ba=new Ml;class Ih extends ii{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new F){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,p;this.closed||a>0?l=s[(a-1)%r]:(sc.subVectors(s[0],s[1]).add(s[0]),l=sc);const g=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?p=s[(a+2)%r]:(ic.subVectors(s[r-1],s[r-2]).add(s[r-1]),p=ic),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(g),f),S=Math.pow(g.distanceToSquared(u),f),d=Math.pow(u.distanceToSquared(p),f);S<1e-4&&(S=1),x<1e-4&&(x=S),d<1e-4&&(d=S),Sa.initNonuniformCatmullRom(l.x,g.x,u.x,p.x,x,S,d),ya.initNonuniformCatmullRom(l.y,g.y,u.y,p.y,x,S,d),ba.initNonuniformCatmullRom(l.z,g.z,u.z,p.z,x,S,d)}else this.curveType==="catmullrom"&&(Sa.initCatmullRom(l.x,g.x,u.x,p.x,this.tension),ya.initCatmullRom(l.y,g.y,u.y,p.y,this.tension),ba.initCatmullRom(l.z,g.z,u.z,p.z,this.tension));return n.set(Sa.calc(c),ya.calc(c),ba.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function rc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function af(i,t){const e=1-i;return e*e*t}function lf(i,t){return 2*(1-i)*i*t}function cf(i,t){return i*i*t}function Js(i,t,e,n){return af(i,t)+lf(i,e)+cf(i,n)}function hf(i,t){const e=1-i;return e*e*e*t}function uf(i,t){const e=1-i;return 3*e*e*i*t}function ff(i,t){return 3*(1-i)*i*i*t}function df(i,t){return i*i*i*t}function $s(i,t,e,n,s){return hf(i,t)+uf(i,e)+ff(i,n)+df(i,s)}class Nh extends ii{constructor(t=new Ot,e=new Ot,n=new Ot,s=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ot){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(t,s.x,r.x,o.x,a.x),$s(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Uh extends ii{constructor(t=new F,e=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new F){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set($s(t,s.x,r.x,o.x,a.x),$s(t,s.y,r.y,o.y,a.y),$s(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Fh extends ii{constructor(t=new Ot,e=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Oh extends ii{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bh extends ii{constructor(t=new Ot,e=new Ot,n=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ot){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Js(t,s.x,r.x,o.x),Js(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sl extends ii{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Js(t,s.x,r.x,o.x),Js(t,s.y,r.y,o.y),Js(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zh extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ot){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],p=s[o>s.length-2?s.length-1:o+1],g=s[o>s.length-3?s.length-1:o+2];return n.set(rc(a,c.x,l.x,p.x,g.x),rc(a,c.y,l.y,p.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ot().fromArray(s))}return this}}var pf=Object.freeze({__proto__:null,ArcCurve:Lh,CatmullRomCurve3:Ih,CubicBezierCurve:Nh,CubicBezierCurve3:Uh,EllipseCurve:vl,LineCurve:Fh,LineCurve3:Oh,QuadraticBezierCurve:Bh,QuadraticBezierCurve3:Sl,SplineCurve:zh});class Zo extends qo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Zo(t.radius,t.detail)}}class _i extends Je{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,p=c+1,g=t/a,u=e/c,f=[],x=[],S=[],d=[];for(let m=0;m<p;m++){const y=m*u-o;for(let E=0;E<l;E++){const T=E*g-r;x.push(T,-y,0),S.push(0,0,1),d.push(E/a),d.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const E=y+l*m,T=y+l*(m+1),M=y+1+l*(m+1),_=y+1+l*m;f.push(E,T,_),f.push(T,M,_)}this.setIndex(f),this.setAttribute("position",new we(x,3)),this.setAttribute("normal",new we(S,3)),this.setAttribute("uv",new we(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _i(t.width,t.height,t.widthSegments,t.heightSegments)}}class sr extends Je{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],p=[];let g=t;const u=(e-t)/s,f=new F,x=new Ot;for(let S=0;S<=s;S++){for(let d=0;d<=n;d++){const m=r+d/n*o;f.x=g*Math.cos(m),f.y=g*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),x.x=(f.x/e+1)/2,x.y=(f.y/e+1)/2,p.push(x.x,x.y)}g+=u}for(let S=0;S<s;S++){const d=S*(n+1);for(let m=0;m<n;m++){const y=m+d,E=y,T=y+n+1,M=y+n+2,_=y+1;a.push(E,T,_),a.push(T,M,_)}}this.setIndex(a),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(l,3)),this.setAttribute("uv",new we(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class wi extends Je{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const p=[],g=new F,u=new F,f=[],x=[],S=[],d=[];for(let m=0;m<=n;m++){const y=[],E=m/n,T=o+E*a,M=t*Math.cos(T),_=Math.sqrt(t*t-M*M);let h=0;m===0&&o===0?h=.5/e:m===n&&c===Math.PI&&(h=-.5/e);for(let v=0;v<=e;v++){const R=v/e,P=s+R*r;g.x=-_*Math.cos(P),g.y=M,g.z=_*Math.sin(P),x.push(g.x,g.y,g.z),u.copy(g).normalize(),S.push(u.x,u.y,u.z),d.push(R+h,1-E),y.push(l++)}p.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const E=p[m][y+1],T=p[m][y],M=p[m+1][y],_=p[m+1][y+1];(m!==0||o>0)&&f.push(E,T,_),(m!==n-1||c<Math.PI)&&f.push(T,M,_)}this.setIndex(f),this.setAttribute("position",new we(x,3)),this.setAttribute("normal",new we(S,3)),this.setAttribute("uv",new we(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mi extends Je{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],p=[],g=[],u=new F,f=new F,x=new F;for(let S=0;S<=n;S++){const d=o+S/n*a;for(let m=0;m<=s;m++){const y=m/s*r;f.x=(t+e*Math.cos(d))*Math.cos(y),f.y=(t+e*Math.cos(d))*Math.sin(y),f.z=e*Math.sin(d),l.push(f.x,f.y,f.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),x.subVectors(f,u).normalize(),p.push(x.x,x.y,x.z),g.push(m/s),g.push(S/n)}}for(let S=1;S<=n;S++)for(let d=1;d<=s;d++){const m=(s+1)*S+d-1,y=(s+1)*(S-1)+d-1,E=(s+1)*(S-1)+d,T=(s+1)*S+d;c.push(m,y,T),c.push(y,E,T)}this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(p,3)),this.setAttribute("uv",new we(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class yl extends Je{constructor(t=new Sl(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new F,c=new F,l=new Ot;let p=new F;const g=[],u=[],f=[],x=[];S(),this.setIndex(x),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(f,2));function S(){for(let E=0;E<e;E++)d(E);d(r===!1?e:0),y(),m()}function d(E){p=t.getPointAt(E/e,p);const T=o.normals[E],M=o.binormals[E];for(let _=0;_<=s;_++){const h=_/s*Math.PI*2,v=Math.sin(h),R=-Math.cos(h);c.x=R*T.x+v*M.x,c.y=R*T.y+v*M.y,c.z=R*T.z+v*M.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=p.x+n*c.x,a.y=p.y+n*c.y,a.z=p.z+n*c.z,g.push(a.x,a.y,a.z)}}function m(){for(let E=1;E<=e;E++)for(let T=1;T<=s;T++){const M=(s+1)*(E-1)+(T-1),_=(s+1)*E+(T-1),h=(s+1)*E+T,v=(s+1)*(E-1)+T;x.push(M,_,v),x.push(_,h,v)}}function y(){for(let E=0;E<=e;E++)for(let T=0;T<=s;T++)l.x=E/e,l.y=T/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new yl(new pf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function ys(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(oc(s))s.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(oc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function hn(i){const t={};for(let e=0;e<i.length;e++){const n=ys(i[e]);for(const s in n)t[s]=n[s]}return t}function oc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function mf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Gh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}const kh={clone:ys,merge:hn};var gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Ii{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gf,this.fragmentShader=_f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=mf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new ne().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new te().fromArray(s.value);break;case"m4":this.uniforms[n].value=new de().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Hh extends Pi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class bs extends Ii{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wo,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Vh extends Ii{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Wh extends Ii{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class bl extends Ye{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Xh extends bl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ne(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ea=new de,ac=new F,lc=new F;class Yh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ss,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(ac),lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ea.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ea,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Ms||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Ea)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Cr=new F,Pr=new xn,Yn=new F;class El extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Cr,Pr,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,Yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Cr,Pr,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Pr,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ai=new F,cc=new Ot,hc=new Ot;class Cn extends El{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,cc,hc),e.subVectors(hc,cc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Tl extends El{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=p*this.view.offsetY,c=a-p*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class xf extends Yh{constructor(){super(new Tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Oa extends bl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new xf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const us=-90,fs=1;class Do extends Ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(us,fs,t,e);s.layers=this.layers,this.add(s);const r=new Cn(us,fs,t,e);r.layers=this.layers,this.add(r);const o=new Cn(us,fs,t,e);o.layers=this.layers,this.add(o);const a=new Cn(us,fs,t,e);a.layers=this.layers,this.add(a);const c=new Cn(us,fs,t,e);c.layers=this.layers,this.add(c);const l=new Cn(us,fs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,p]=this.children,g=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const S=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let d=!1;t.isWebGLRenderer===!0?d=t.state.buffers.depth.getReversed():d=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=S,t.setRenderTarget(n,5,s),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,p),t.setRenderTarget(g,u,f),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class qh extends Cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const uc=new de;class Zh{constructor(t,e,n=0,s=1/0){this.ray=new Ts(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Wo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):xe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uc),this}intersectObject(t,e=!0,n=[]){return Ba(t,this,n,e),n.sort(fc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ba(t[s],this,n,e);return n.sort(fc),n}}function fc(i,t){return i.distance-t.distance}function Ba(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ba(r[o],t,e,!0)}}class za{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Kh extends xi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function dc(i,t,e,n){const s=vf(n);switch(e){case el:return i*t;case zo:return i*t/s.components*s.byteLength;case Go:return i*t/s.components*s.byteLength;case Ci:return i*t*2/s.components*s.byteLength;case ko:return i*t*2/s.components*s.byteLength;case nl:return i*t*3/s.components*s.byteLength;case zn:return i*t*4/s.components*s.byteLength;case Ho:return i*t*4/s.components*s.byteLength;case Vs:case Ws:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Xs:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $r:case jr:return Math.max(i,16)*Math.max(t,8)/4;case Jr:case Qr:return Math.max(i,8)*Math.max(t,8)/2;case to:case eo:case io:case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case no:case js:case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case So:case yo:case bo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Eo:case To:return Math.ceil(i/4)*Math.ceil(t/4)*8;case tr:case Ao:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vf(i){switch(i){case _n:case $a:return{byteLength:1,components:1};case vs:case Qa:case Hn:return{byteLength:2,components:1};case Oo:case Bo:return{byteLength:2,components:4};case kn:case Fo:case Dn:return{byteLength:4,components:1};case ja:case tl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);function Jh(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Mf(i){const t=new WeakMap;function e(a,c){const l=a.array,p=a.usage,g=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,p),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:g}}function n(a,c,l){const p=c.array,g=c.updateRanges;if(i.bindBuffer(l,a),g.length===0)i.bufferSubData(l,0,p);else{g.sort((f,x)=>f.start-x.start);let u=0;for(let f=1;f<g.length;f++){const x=g[u],S=g[f];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++u,g[u]=S)}g.length=u+1;for(let f=0,x=g.length;f<x;f++){const S=g[f];i.bufferSubData(l,S.start*p.BYTES_PER_ELEMENT,p,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const p=t.get(a);(!p||p.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yf=`#ifdef USE_ALPHAHASH
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
#endif`,bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
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
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`#ifdef USE_BATCHING
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
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,If=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nf=`#ifdef USE_IRIDESCENCE
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
#endif`,Uf=`#ifdef USE_BUMPMAP
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
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wf=`#define PI 3.141592653589793
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
} // validated`,Xf=`vec3 transformedNormal = objectNormal;
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
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,td=`#ifdef USE_ENVMAP
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
#endif`,ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
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
#endif`,id=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,od=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ad=`#ifdef USE_GRADIENTMAP
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
}`,ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ud=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fd=`#ifdef USE_ENVMAP
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
#endif`,dd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_d=`PhysicalMaterial material;
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
#endif`,xd=`uniform sampler2D dfgLUT;
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
}`,vd=`
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
#endif`,Md=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yd=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ed=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Td=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pd=`#if defined( USE_POINTS_UV )
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
#endif`,Dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ld=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Id=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nd=`#if defined( USE_MORPHCOLORS )
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
#endif`,Ud=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fd=`#ifdef USE_MORPHTARGETS
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
#endif`,Od=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Vd=`#ifdef USE_NORMALMAP
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
#endif`,Wd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rp=`float getShadowMask() {
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
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
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
#endif`,lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cp=`#ifdef USE_SKINNING
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
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
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
#endif`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`uniform float backgroundBlurriness;
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
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
}`,wp=`#if DEPTH_PACKING == 3200
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
}`,Rp=`#define DISTANCE
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
}`,Cp=`#define DISTANCE
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,Up=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Op=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,zp=`#define MATCAP
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
}`,Gp=`#define NORMAL
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
}`,kp=`#define NORMAL
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
}`,Hp=`#define PHONG
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
}`,Vp=`#define PHONG
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
}`,Wp=`#define STANDARD
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
}`,Xp=`#define STANDARD
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
}`,Yp=`#define TOON
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
}`,qp=`#define TOON
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
}`,Zp=`uniform float size;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,Jp=`#include <common>
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
}`,$p=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,jp=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:Sf,alphahash_pars_fragment:yf,alphamap_fragment:bf,alphamap_pars_fragment:Ef,alphatest_fragment:Tf,alphatest_pars_fragment:Af,aomap_fragment:wf,aomap_pars_fragment:Rf,batching_pars_vertex:Cf,batching_vertex:Pf,begin_vertex:Df,beginnormal_vertex:Lf,bsdfs:If,iridescence_fragment:Nf,bumpmap_pars_fragment:Uf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:zf,color_fragment:Gf,color_pars_fragment:kf,color_pars_vertex:Hf,color_vertex:Vf,common:Wf,defaultnormal_vertex:Xf,displacementmap_pars_vertex:Yf,displacementmap_vertex:qf,emissivemap_fragment:Zf,emissivemap_pars_fragment:Kf,colorspace_fragment:Jf,colorspace_pars_fragment:$f,envmap_fragment:Qf,envmap_common_pars_fragment:jf,envmap_pars_fragment:td,envmap_pars_vertex:ed,envmap_physical_pars_fragment:fd,envmap_vertex:nd,fog_vertex:id,fog_pars_vertex:sd,fog_fragment:rd,fog_pars_fragment:od,gradientmap_pars_fragment:ad,lightmap_pars_fragment:ld,lights_lambert_fragment:cd,lights_lambert_pars_fragment:hd,lights_pars_begin:ud,lights_toon_fragment:dd,lights_toon_pars_fragment:pd,lights_phong_fragment:md,lights_phong_pars_fragment:gd,lights_physical_fragment:_d,lights_physical_pars_fragment:xd,lights_fragment_begin:vd,lights_fragment_maps:Md,lights_fragment_end:Sd,lightprobes_pars_fragment:yd,logdepthbuf_fragment:bd,logdepthbuf_pars_fragment:Ed,logdepthbuf_pars_vertex:Td,logdepthbuf_vertex:Ad,map_fragment:wd,map_pars_fragment:Rd,map_particle_fragment:Cd,map_particle_pars_fragment:Pd,metalnessmap_fragment:Dd,metalnessmap_pars_fragment:Ld,morphinstance_vertex:Id,morphcolor_vertex:Nd,morphnormal_vertex:Ud,morphtarget_pars_vertex:Fd,morphtarget_vertex:Od,normal_fragment_begin:Bd,normal_fragment_maps:zd,normal_pars_fragment:Gd,normal_pars_vertex:kd,normal_vertex:Hd,normalmap_pars_fragment:Vd,clearcoat_normal_fragment_begin:Wd,clearcoat_normal_fragment_maps:Xd,clearcoat_pars_fragment:Yd,iridescence_pars_fragment:qd,opaque_fragment:Zd,packing:Kd,premultiplied_alpha_fragment:Jd,project_vertex:$d,dithering_fragment:Qd,dithering_pars_fragment:jd,roughnessmap_fragment:tp,roughnessmap_pars_fragment:ep,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:lp,skinnormal_vertex:cp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:fp,tonemapping_pars_fragment:dp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:_p,uv_vertex:xp,worldpos_vertex:vp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:yp,backgroundCube_frag:bp,cube_vert:Ep,cube_frag:Tp,depth_vert:Ap,depth_frag:wp,distance_vert:Rp,distance_frag:Cp,equirect_vert:Pp,equirect_frag:Dp,linedashed_vert:Lp,linedashed_frag:Ip,meshbasic_vert:Np,meshbasic_frag:Up,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:Bp,meshmatcap_frag:zp,meshnormal_vert:Gp,meshnormal_frag:kp,meshphong_vert:Hp,meshphong_frag:Vp,meshphysical_vert:Wp,meshphysical_frag:Xp,meshtoon_vert:Yp,meshtoon_frag:qp,points_vert:Zp,points_frag:Kp,shadow_vert:Jp,shadow_frag:$p,sprite_vert:Qp,sprite_frag:jp},It={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Bn={basic:{uniforms:hn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:hn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new ne(0)},envMapIntensity:{value:1}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:hn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:hn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:hn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new ne(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:hn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:hn([It.points,It.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:hn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:hn([It.common,It.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:hn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:hn([It.sprite,It.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distance:{uniforms:hn([It.common,It.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distance_vert,fragmentShader:ie.distance_frag},shadow:{uniforms:hn([It.lights,It.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Bn.physical={uniforms:hn([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new te},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};const Dr={r:0,b:0,g:0},tm=new de,$h=new te;$h.set(-1,0,0,0,1,0,0,0,1);function em(i,t,e,n,s,r){const o=new ne(0);let a=s===!0?0:1,c,l,p=null,g=0,u=null;function f(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const T=y.backgroundBlurriness>0;E=t.get(E,T)}return E}function x(y){let E=!1;const T=f(y);T===null?d(o,a):T&&T.isColor&&(d(T,1),E=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(y,E){const T=f(E);T&&T.isCubeTexture?(l===void 0&&(l=new ve(new Ke(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:ys(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,_,h){this.matrixWorld.copyPosition(h.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(E.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($h),l.material.toneMapped=fe.getTransfer(T.colorSpace)!==Ae,(p!==T||g!==T.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,p=T,g=T.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ve(new _i(2,2),new Pi({name:"BackgroundMaterial",uniforms:ys(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=fe.getTransfer(T.colorSpace)!==Ae,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(p!==T||g!==T.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,p=T,g=T.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,E){y.getRGB(Dr,Gh(i)),e.buffers.color.setClear(Dr.r,Dr.g,Dr.b,E,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,E=1){o.set(y),a=E,d(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,d(o,a)},render:x,addToRenderList:S,dispose:m}}function nm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(C,L,B,I,k){let V=!1;const q=g(C,I,B,L);r!==q&&(r=q,l(r.object)),V=f(C,I,B,k),V&&x(C,I,B,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,T(C,L,B,I),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function p(C){return i.deleteVertexArray(C)}function g(C,L,B,I){const k=I.wireframe===!0;let V=n[L.id];V===void 0&&(V={},n[L.id]=V);const q=C.isInstancedMesh===!0?C.id:0;let at=V[q];at===void 0&&(at={},V[q]=at);let Q=at[B.id];Q===void 0&&(Q={},at[B.id]=Q);let z=Q[k];return z===void 0&&(z=u(c()),Q[k]=z),z}function u(C){const L=[],B=[],I=[];for(let k=0;k<e;k++)L[k]=0,B[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:I,object:C,attributes:{},index:null}}function f(C,L,B,I){const k=r.attributes,V=L.attributes;let q=0;const at=B.getAttributes();for(const Q in at)if(at[Q].location>=0){const nt=k[Q];let pt=V[Q];if(pt===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(pt=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(pt=C.instanceColor)),nt===void 0||nt.attribute!==pt||pt&&nt.data!==pt.data)return!0;q++}return r.attributesNum!==q||r.index!==I}function x(C,L,B,I){const k={},V=L.attributes;let q=0;const at=B.getAttributes();for(const Q in at)if(at[Q].location>=0){let nt=V[Q];nt===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(nt=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(nt=C.instanceColor));const pt={};pt.attribute=nt,nt&&nt.data&&(pt.data=nt.data),k[Q]=pt,q++}r.attributes=k,r.attributesNum=q,r.index=I}function S(){const C=r.newAttributes;for(let L=0,B=C.length;L<B;L++)C[L]=0}function d(C){m(C,0)}function m(C,L){const B=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;B[C]=1,I[C]===0&&(i.enableVertexAttribArray(C),I[C]=1),k[C]!==L&&(i.vertexAttribDivisor(C,L),k[C]=L)}function y(){const C=r.newAttributes,L=r.enabledAttributes;for(let B=0,I=L.length;B<I;B++)L[B]!==C[B]&&(i.disableVertexAttribArray(B),L[B]=0)}function E(C,L,B,I,k,V,q){q===!0?i.vertexAttribIPointer(C,L,B,k,V):i.vertexAttribPointer(C,L,B,I,k,V)}function T(C,L,B,I){S();const k=I.attributes,V=B.getAttributes(),q=L.defaultAttributeValues;for(const at in V){const Q=V[at];if(Q.location>=0){let z=k[at];if(z===void 0&&(at==="instanceMatrix"&&C.instanceMatrix&&(z=C.instanceMatrix),at==="instanceColor"&&C.instanceColor&&(z=C.instanceColor)),z!==void 0){const nt=z.normalized,pt=z.itemSize,Rt=t.get(z);if(Rt===void 0)continue;const j=Rt.buffer,ft=Rt.type,Dt=Rt.bytesPerElement,Nt=ft===i.INT||ft===i.UNSIGNED_INT||z.gpuType===Fo;if(z.isInterleavedBufferAttribute){const wt=z.data,qt=wt.isInterleavedBuffer===!0?wt.stride:wt.itemSize,Le=z.offset;if(wt.isInstancedInterleavedBuffer||wt.isInstancedBufferAttribute){for(let Wt=0;Wt<Q.locationSize;Wt++)m(Q.location+Wt,wt.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let Wt=0;Wt<Q.locationSize;Wt++)d(Q.location+Wt);i.bindBuffer(i.ARRAY_BUFFER,j);for(let Wt=0;Wt<Q.locationSize;Wt++)E(Q.location+Wt,pt/Q.locationSize,ft,nt,qt*Dt,(Le+pt/Q.locationSize*Wt)*Dt,Nt)}else{if(z.isInstancedBufferAttribute){for(let wt=0;wt<Q.locationSize;wt++)m(Q.location+wt,z.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let wt=0;wt<Q.locationSize;wt++)d(Q.location+wt);i.bindBuffer(i.ARRAY_BUFFER,j);for(let wt=0;wt<Q.locationSize;wt++)E(Q.location+wt,pt/Q.locationSize,ft,nt,pt*Dt,pt/Q.locationSize*wt*Dt,Nt)}}else if(q!==void 0){const nt=q[at];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(Q.location,nt);break;case 3:i.vertexAttrib3fv(Q.location,nt);break;case 4:i.vertexAttrib4fv(Q.location,nt);break;default:i.vertexAttrib1fv(Q.location,nt)}}}}y()}function M(){R();for(const C in n){const L=n[C];for(const B in L){const I=L[B];for(const k in I){const V=I[k];for(const q in V)p(V[q].object),delete V[q];delete I[k]}}delete n[C]}}function _(C){if(n[C.id]===void 0)return;const L=n[C.id];for(const B in L){const I=L[B];for(const k in I){const V=I[k];for(const q in V)p(V[q].object),delete V[q];delete I[k]}}delete n[C.id]}function h(C){for(const L in n){const B=n[L];for(const I in B){const k=B[I];if(k[C.id]===void 0)continue;const V=k[C.id];for(const q in V)p(V[q].object),delete V[q];delete k[C.id]}}}function v(C){for(const L in n){const B=n[L],I=C.isInstancedMesh===!0?C.id:0,k=B[I];if(k!==void 0){for(const V in k){const q=k[V];for(const at in q)p(q[at].object),delete q[at];delete k[V]}delete B[I],Object.keys(B).length===0&&delete n[L]}}}function R(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:P,dispose:M,releaseStatesOfGeometry:_,releaseStatesOfObject:v,releaseStatesOfProgram:h,initAttributes:S,enableAttribute:d,disableUnusedAttributes:y}}function im(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,p){p!==0&&(i.drawArraysInstanced(n,c,l,p),e.update(l,n,p))}function a(c,l,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,p);let u=0;for(let f=0;f<p;f++)u+=l[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function sm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const h=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(h){return!(h!==zn&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(h){const v=h===Hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(h!==_n&&h!==Dn&&!v&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const p=c(l);p!==l&&(Kt("WebGLRenderer:",l,"not supported, using",p,"instead."),l=p);const g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&g===!1;e.reversedDepthBuffer===!0&&g===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&g===!0&&Kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),_=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:g,maxTextures:f,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:T,maxSamples:M,samples:_}}function rm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new $n,a=new te,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(g,u){const f=g.length!==0||u||n!==0||s;return s=u,n=g.length,f},this.beginShadows=function(){r=!0,p(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,u){e=p(g,u,0)},this.setState=function(g,u,f){const x=g.clippingPlanes,S=g.clipIntersection,d=g.clipShadows,m=i.get(g);if(!s||x===null||x.length===0||r&&!d)r?p(null):l();else{const y=r?0:n,E=y*4;let T=m.clippingState||null;c.value=T,T=p(x,u,E,f);for(let M=0;M!==E;++M)T[M]=e[M];m.clippingState=T,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(g,u,f,x){const S=g!==null?g.length:0;let d=null;if(S!==0){if(d=c.value,x!==!0||d===null){const m=f+S*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(d===null||d.length<m)&&(d=new Float32Array(m));for(let E=0,T=f;E!==S;++E,T+=4)o.copy(g[E]).applyMatrix4(y,a),o.normal.toArray(d,T),d[T+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,d}}class Ko extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new gl(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ke(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:Xi});r.uniforms.tEquirect.value=e;const o=new ve(s,r),a=e.minFilter;return e.minFilter===fi&&(e.minFilter=fn),new Do(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const pc=256,om=3,am=20,Qh=256,jh=16,lm=3,cm=new F,hm=new ne;class rr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Do(1,10,null),this._boxMesh=new ve(new Ke(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=cm}=r,c=this._renderer;this._setSize(o);const l=this._allocateTarget(),p=this._getSourceTarget(!0);e>0&&(p.texture.mipmapsAutoUpdate=!1);const g=c.autoClear,u=c.autoClearColor,f=c.autoClearDepth,x=c.autoClearStencil,S=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,S===null&&(t.background=c.getClearColor(hm));const d=new Do(n,s,p);return d.position.copy(a),d.update(c,t),c.autoClear=g,c.autoClearColor=u,c.autoClearDepth=f,c.autoClearStencil=x,t.background=S,e>0&&(p.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(pc,Sh(t))}_fromTexture(t,e){t.mapping===qi||t.mapping===xs?this._setSize(t.image.length===0?pc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=mc(t,!1,!1),n=Math.log2(t)-om;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=mc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===qi||t.mapping===xs?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=gc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=um(),this._integrationMaterial=fm());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/jh);for(let o=0;o<=n;o++){const a=rr.lodToRoughness(o,n);if(o>n-lm)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{const c=a>0?Math.log2(e)+.5*Math.log2(6/(Qh*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=dm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function mc(i,t,e){return new Ko(i,{minFilter:fi,generateMipmaps:t,type:Hn,colorSpace:er,depthBuffer:e})}function or(i,t,e){return new Pi({name:i,uniforms:t,vertexShader:ie.cube_vert,fragmentShader:e,side:dn,blending:Xi,depthTest:!1,depthWrite:!1})}function um(){return or("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Qh}u

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
	`)}function fm(){return or("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:jh}},`

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
	`)}function dm(){return or("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${am}
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
	`)}function gc(){return or("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function _c(){return or("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function pm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ur||f===Fr)if(t.has(u)){const x=t.get(u).texture;return a(x,u.mapping)}else{const x=u.image;if(x&&x.height>0){const S=new Ko(x.height);return S.fromEquirectangularTexture(i,u),t.set(u,S),u.addEventListener("dispose",l),a(S.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const f=u.mapping,x=f===Ur||f===Fr,S=f===qi||f===xs;if(x||S){let d=e.get(u);const m=d!==void 0?d.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new rr(i)),d=x?n.fromEquirectangular(u,d):n.fromCubemap(u,d),d.texture.pmremVersion=u.pmremVersion,e.set(u,d),d.texture;if(d!==void 0)return d.texture;{const y=u.image;return x&&y&&y.height>0||S&&y&&c(y)?(n===null&&(n=new rr(i)),d=x?n.fromEquirectangular(u):n.fromCubemap(u),d.texture.pmremVersion=u.pmremVersion,e.set(u,d),u.addEventListener("dispose",p),d.texture):null}}}return u}function a(u,f){return f===Ur?u.mapping=qi:f===Fr&&(u.mapping=xs),u}function c(u){let f=0;const x=6;for(let S=0;S<x;S++)u[S]!==void 0&&f++;return f===x}function l(u){const f=u.target;f.removeEventListener("dispose",l);const x=t.get(f);x!==void 0&&(t.delete(f),x.dispose())}function p(u){const f=u.target;f.removeEventListener("dispose",p);const x=e.get(f);x!==void 0&&(e.delete(f),x.dispose())}function g(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function mm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&qs("WebGLRenderer: "+n+" extension not supported."),s}}}function gm(i,t,e,n){const s={},r=new WeakMap,o=new FinalizationRegistry(x=>delete s[x]);function a(x){c(x.target)}function c(x){x.index!==null&&t.remove(x.index);for(const d in x.attributes)t.remove(x.attributes[d]);x.removeEventListener("dispose",a),delete s[x.id],o.unregister(x);const S=r.get(x);S&&(t.remove(S),r.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,e.memory.geometries--}function l(x,S){return s[S.id]!==void 0||(S.addEventListener("dispose",a),s[S.id]=new WeakRef(S),o.register(S,S.id,S),e.memory.geometries++),S}function p(x){const S=x.attributes;for(const d in S)t.update(S[d],i.ARRAY_BUFFER)}function g(x){const S=x.index,d=x.attributes.position;let m=0;if(d===void 0)return;const y=S!==null?S.array.length:d.array.length/3-1,E=d.count>=65535?ul:hl,T=new E(Math.ceil(y/3)*6,1),M=T.array;if(S!==null){const h=S.array;m=S.version;for(let v=0,R=0;v<y;v+=3){const P=h[v+0],C=h[v+1],L=h[v+2];M[R++]=P,M[R++]=C,M[R++]=C,M[R++]=L,M[R++]=L,M[R++]=P}}else{m=d.version;for(let h=0,v=0;h<y;h+=3){const R=h+0,P=h+1,C=h+2;M[v++]=R,M[v++]=P,M[v++]=P,M[v++]=C,M[v++]=C,M[v++]=R}}T.version=m;const _=r.get(x);_&&t.remove(_),r.set(x,T)}function u(x){const S=r.get(x);if(S){const d=x.index;d!==null&&S.version<d.version&&g(x)}else g(x);return r.get(x)}function f(){for(const x in s){const S=s[x].deref();S!==void 0&&c(S)}}return{get:l,update:p,getWireframeAttribute:u,dispose:f}}function _m(i,t,e){let n;function s(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function c(g,u){i.drawElements(n,u,r,g*o),e.update(u,n,1)}function l(g,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,g*o,f),e.update(u,n,f))}function p(g,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,g,0,f);let S=0;for(let d=0;d<f;d++)S+=u[d];e.update(S,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=p}function xm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:xe("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function vm(i,t,e){const n=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,p=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,g=p!==void 0?p.length:0;let u=n.get(a);if(u===void 0||u.count!==g){let R=function(){h.dispose(),n.delete(a),a.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();const f=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let E=0;f===!0&&(E=1),x===!0&&(E=2),S===!0&&(E=3);let T=a.attributes.position.count*E,M=1;T>t.maxTextureSize&&(M=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const _=new Float32Array(T*M*4*g),h=new cl(_,T,M,g);h.type=Dn,h.needsUpdate=!0;const v=E*4;for(let P=0;P<g;P++){const C=d[P],L=m[P],B=y[P],I=T*M*4*P;for(let k=0;k<C.count;k++){const V=k*v;f===!0&&(s.fromBufferAttribute(C,k),_[I+V+0]=s.x,_[I+V+1]=s.y,_[I+V+2]=s.z,_[I+V+3]=0),x===!0&&(s.fromBufferAttribute(L,k),_[I+V+4]=s.x,_[I+V+5]=s.y,_[I+V+6]=s.z,_[I+V+7]=0),S===!0&&(s.fromBufferAttribute(B,k),_[I+V+8]=s.x,_[I+V+9]=s.y,_[I+V+10]=s.z,_[I+V+11]=B.itemSize===4?s.w:1)}}u={count:g,texture:h,size:new Ot(T,M)},n.set(a,u),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let S=0;S<l.length;S++)f+=l[S];const x=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Mm(i,t,e,n,s){let r=new WeakMap;function o(l){const p=s.render.frame,g=l.geometry,u=t.get(l,g);if(r.get(u)!==p&&(t.update(u),r.set(u,p)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==p&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,p))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==p&&(f.update(),r.set(f,p))}return u}function a(){r=new WeakMap}function c(l){const p=l.target;p.removeEventListener("dispose",c),n.releaseStatesOfObject(p),e.remove(p.instanceMatrix),p.instanceColor!==null&&e.remove(p.instanceColor)}return{update:o,dispose:a}}const Sm={[Wa]:"LINEAR_TONE_MAPPING",[Xa]:"REINHARD_TONE_MAPPING",[Ya]:"CINEON_TONE_MAPPING",[Uo]:"ACES_FILMIC_TONE_MAPPING",[Za]:"AGX_TONE_MAPPING",[Ka]:"NEUTRAL_TONE_MAPPING",[qa]:"CUSTOM_TONE_MAPPING"};function ym(i,t,e,n,s,r){const o=new Gn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null,l=null;const p=new Je;p.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new we([0,2,0,0,2,0],2));const g=new Hh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ve(p,g),f=new Tl(-1,1,1,-1,0,1);let x=null,S=null,d=!1,m,y=null,E=[],T=!1;this.setSize=function(M,_){o.setSize(M,_),a!==null&&a.setSize(M,_),c!==null&&c.setSize(M,_);for(let h=0;h<E.length;h++){const v=E[h];v.setSize&&v.setSize(M,_)}},this.setEffects=function(M){E=M,T=E.length>0&&E[0].isRenderPass===!0;const _=o.width,h=o.height;E.length>0&&a===null&&(a=new Gn(_,h,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),c=new Gn(_,h,{type:Hn,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&E.some(R=>R.needsDepthTexture===!0);v!==(o.depthTexture!==null)&&(v===!0&&l===null&&(l=new Ki(_,h),r===!0&&(l.format=di,l.type=Zi)),o.dispose(),o.depthTexture=v?l:null,o.resolveDepthBuffer=v,o.storeMultisampledDepthBuffer=v);for(let R=0;R<E.length;R++){const P=E[R];P.setSize&&P.setSize(_,h),v&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(l)}},this.begin=function(M,_){if(d||M.toneMapping===ei&&E.length===0)return!1;if(y=_,_!==null){const h=_.width,v=_.height;(o.width!==h||o.height!==v)&&this.setSize(h,v)}return T===!1&&M.setRenderTarget(o),m=M.toneMapping,M.toneMapping=ei,!0},this.hasRenderPass=function(){return T},this.end=function(M,_){M.toneMapping=m,d=!0;let h=o,v=a;for(let R=0;R<E.length;R++){const P=E[R];P.enabled!==!1&&(P.render(M,v,h,_),P.needsSwap!==!1&&(h=v,v=v===a?c:a))}if(x!==M.outputColorSpace||S!==M.toneMapping){x=M.outputColorSpace,S=M.toneMapping,g.defines={},fe.getTransfer(x)===Ae&&(g.defines.SRGB_TRANSFER="");const R=Sm[S];R&&(g.defines[R]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=h.texture,M.setRenderTarget(y),M.render(u,f),y=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),p.dispose(),g.dispose()}}const tu=new rn,eu=new Ki(1,1),nu=new _l(1),iu=new cl,su=new Ah,ru=new gl,xc=[],vc=[],Mc=new Float32Array(16),Sc=new Float32Array(9),yc=new Float32Array(4);function As(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xc[s];if(r===void 0&&(r=new Float32Array(s),xc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function $e(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Qe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Jo(i,t){let e=vc[t];e===void 0&&(e=new Int32Array(t),vc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function bm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;i.uniform2fv(this.addr,t),Qe(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if($e(e,t))return;i.uniform3fv(this.addr,t),Qe(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;i.uniform4fv(this.addr,t),Qe(e,t)}}function wm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Qe(e,t)}else{if($e(e,n))return;yc.set(n),i.uniformMatrix2fv(this.addr,!1,yc),Qe(e,n)}}function Rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Qe(e,t)}else{if($e(e,n))return;Sc.set(n),i.uniformMatrix3fv(this.addr,!1,Sc),Qe(e,n)}}function Cm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if($e(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Qe(e,t)}else{if($e(e,n))return;Mc.set(n),i.uniformMatrix4fv(this.addr,!1,Mc),Qe(e,n)}}function Pm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;i.uniform2iv(this.addr,t),Qe(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;i.uniform3iv(this.addr,t),Qe(e,t)}}function Im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;i.uniform4iv(this.addr,t),Qe(e,t)}}function Nm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if($e(e,t))return;i.uniform2uiv(this.addr,t),Qe(e,t)}}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if($e(e,t))return;i.uniform3uiv(this.addr,t),Qe(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if($e(e,t))return;i.uniform4uiv(this.addr,t),Qe(e,t)}}function $o(i){return i.version===0&&(i.compareFunction=rl,i.needsUpdate=!0),i}function Bm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=$o(eu):r=tu,e.setTexture2D(t||r,s)}function zm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||su,s)}function Gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=$o(nu):r=ru,e.setTextureCube(t||r,s)}function km(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||iu,s)}function Hm(i){switch(i){case 5126:return bm;case 35664:return Em;case 35665:return Tm;case 35666:return Am;case 35674:return wm;case 35675:return Rm;case 35676:return Cm;case 5124:case 35670:return Pm;case 35667:case 35671:return Dm;case 35668:case 35672:return Lm;case 35669:case 35673:return Im;case 5125:return Nm;case 36294:return Um;case 36295:return Fm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return km}}function Vm(i,t){i.uniform1fv(this.addr,t)}function Wm(i,t){const e=As(t,this.size,2);i.uniform2fv(this.addr,e)}function Xm(i,t){const e=As(t,this.size,3);i.uniform3fv(this.addr,e)}function Ym(i,t){const e=As(t,this.size,4);i.uniform4fv(this.addr,e)}function qm(i,t){const e=As(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zm(i,t){const e=As(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Km(i,t){const e=As(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jm(i,t){i.uniform1iv(this.addr,t)}function $m(i,t){i.uniform2iv(this.addr,t)}function Qm(i,t){i.uniform3iv(this.addr,t)}function jm(i,t){i.uniform4iv(this.addr,t)}function t0(i,t){i.uniform1uiv(this.addr,t)}function e0(i,t){i.uniform2uiv(this.addr,t)}function n0(i,t){i.uniform3uiv(this.addr,t)}function i0(i,t){i.uniform4uiv(this.addr,t)}function s0(i,t,e){const n=this.cache,s=t.length,r=Jo(e,s);$e(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=$o(eu):o=tu;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function r0(i,t,e){const n=this.cache,s=t.length,r=Jo(e,s);$e(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||su,r[o])}function o0(i,t,e){const n=this.cache,s=t.length,r=Jo(e,s);$e(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=$o(nu):o=ru;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function a0(i,t,e){const n=this.cache,s=t.length,r=Jo(e,s);$e(n,r)||(i.uniform1iv(this.addr,r),Qe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||iu,r[o])}function l0(i){switch(i){case 5126:return Vm;case 35664:return Wm;case 35665:return Xm;case 35666:return Ym;case 35674:return qm;case 35675:return Zm;case 35676:return Km;case 5124:case 35670:return Jm;case 35667:case 35671:return $m;case 35668:case 35672:return Qm;case 35669:case 35673:return jm;case 5125:return t0;case 36294:return e0;case 36295:return n0;case 36296:return i0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return a0}}class c0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hm(e.type)}}class h0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=l0(e.type)}}class u0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function bc(i,t){i.seq.push(t),i.map[t.id]=t}function f0(i,t,e){const n=i.name,s=n.length;for(Ta.lastIndex=0;;){const r=Ta.exec(n),o=Ta.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){bc(e,l===void 0?new c0(a,i,t):new h0(a,i,t));break}else{let g=e.map[a];g===void 0&&(g=new u0(a),bc(e,g)),e=g}}}class Gr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);f0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ec(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const d0=37297;let p0=0;function m0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Tc=new te;function g0(i){fe._getMatrix(Tc,fe.workingColorSpace,i);const t=`mat3( ${Tc.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(i)){case nr:return[t,"LinearTransferOETF"];case Ae:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ac(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+m0(i.getShaderSource(t),a)}else return r}function _0(i,t){const e=g0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const x0={[Wa]:"Linear",[Xa]:"Reinhard",[Ya]:"Cineon",[Uo]:"ACESFilmic",[Za]:"AgX",[Ka]:"Neutral",[qa]:"Custom"};function v0(i,t){const e=x0[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Lr=new F;function M0(){fe.getLuminanceCoefficients(Lr);const i=Lr.x.toFixed(4),t=Lr.y.toFixed(4),e=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function y0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function b0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ks(i){return i!==""}function wc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Rc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const E0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ga(i){return i.replace(E0,T0)}function T0(i,t){const e=ie[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Ga(e)}const A0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cc(i){return i.replace(A0,w0)}function w0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const R0={[Hs]:"SHADOWMAP_TYPE_PCF",[ds]:"SHADOWMAP_TYPE_VSM"};function C0(i){return R0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const P0={[xs]:"ENVMAP_MODE_REFRACTION"};function D0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":P0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const L0={[Va]:"ENVMAP_BLENDING_MULTIPLY",[ah]:"ENVMAP_BLENDING_MIX",[lh]:"ENVMAP_BLENDING_ADD"};function I0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":L0[i.combine]||"ENVMAP_BLENDING_NONE"}function N0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=C0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",p=D0(e),g=I0(e),u=S0(e),f=y0(r),x=s.createProgram();let S,d,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(S=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(ks).join(`
`),S.length>0&&(S+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(ks).join(`
`),d.length>0&&(d+=`
`)):(S=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),d=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+p:"",e.envMap?"#define "+g:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?ie.tonemapping_pars_fragment:"",e.toneMapping!==ei?v0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,_0("linearToOutputTexel",e.outputColorSpace),M0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=Ga(o),o=wc(o,e),o=Rc(o,e),a=Ga(a),a=wc(a,e),a=Rc(a,e),o=Cc(o),a=Cc(a),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,S=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,d=["#define varying in",e.glslVersion===La?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===La?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=m+S+o,E=m+d+a,T=Ec(s,s.VERTEX_SHADER,y),M=Ec(s,s.FRAGMENT_SHADER,E);s.attachShader(x,T),s.attachShader(x,M),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function _(P){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(x)||"",L=s.getShaderInfoLog(T)||"",B=s.getShaderInfoLog(M)||"",I=C.trim(),k=L.trim(),V=B.trim();let q=!0,at=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,M);else{const Q=Ac(s,T,"vertex"),z=Ac(s,M,"fragment");xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+Q+`
`+z)}else I!==""?Kt("WebGLProgram: Program Info Log:",I):(k===""||V==="")&&(at=!1);at&&(P.diagnostics={runnable:q,programLog:I,vertexShader:{log:k,prefix:S},fragmentShader:{log:V,prefix:d}})}s.deleteShader(T),s.deleteShader(M),h=new Gr(s,x),v=b0(s,x)}let h;this.getUniforms=function(){return h===void 0&&_(this),h};let v;this.getAttributes=function(){return v===void 0&&_(this),v};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,d0)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=p0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=M,this}let U0=0;class F0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new O0(t),e.set(t,n)),n}}class O0{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}}function B0(i){return i===Ci||i===js||i===tr}function z0(i,t,e,n,s,r){const o=new Wo,a=new F0,c=new Set,l=[],p=new Map,g=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(h){return c.add(h),h===0?"uv":`uv${h}`}function x(h,v,R,P,C,L){const B=P.fog,I=C.geometry,k=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?P.environment:null,V=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,q=t.get(h.envMap||k,V),at=u[h.type];let Q=n.precision;h.precision!==null&&(Q=n.getMaxPrecision(h.precision),Q!==h.precision&&Kt("WebGLProgram.getParameters:",h.precision,"not supported, using",Q,"instead."));const z=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,nt=z!==void 0?z.length:0;let pt=0;I.morphAttributes.position!==void 0&&(pt=1),I.morphAttributes.normal!==void 0&&(pt=2),I.morphAttributes.color!==void 0&&(pt=3);let Rt,j,ft,Dt;if(at){const Ct=Bn[at];Rt=Ct.vertexShader,j=Ct.fragmentShader}else{Rt=h.vertexShader,j=h.fragmentShader;const Ct=a.getVertexShaderStage(h),ue=a.getFragmentShaderStage(h);a.update(h,Ct,ue),ft=Ct.id,Dt=ue.id}const Nt=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),qt=C.isInstancedMesh===!0,Le=C.isBatchedMesh===!0,Wt=!!h.map,Vt=!!h.matcap,Qt=!!q,ee=Qt&&q.isPMREMTexture===!0,Et=!!h.aoMap,Xt=!!h.lightMap,se=!!h.bumpMap&&h.wireframe===!1,Jt=!!h.normalMap,me=!!h.displacementMap,Me=!!h.emissiveMap,Fe=!!h.metalnessMap,ge=!!h.roughnessMap,Ge=h.anisotropy>0,H=h.clearcoat>0,ae=h.diffuseRoughness>0,Se=h.dispersion>0,ye=h.retroreflectivity>0,bt=h.iridescence>0,Pe=h.sheen>0,zt=h.transmission>0,Tt=Ge&&!!h.anisotropyMap,N=H&&!!h.clearcoatMap,w=H&&!!h.clearcoatNormalMap,Y=H&&!!h.clearcoatRoughnessMap,ht=ae&&!!h.diffuseRoughnessMap,lt=bt&&!!h.iridescenceMap,St=bt&&!!h.iridescenceThicknessMap,dt=Pe&&!!h.sheenColorMap,rt=Pe&&!!h.sheenRoughnessMap,ot=!!h.specularMap,ut=!!h.specularColorMap,O=!!h.specularIntensityMap,st=zt&&!!h.transmissionMap,it=zt&&!!h.thicknessMap,yt=!!h.gradientMap,mt=!!h.alphaMap,xt=h.alphaTest>0,Ut=!!h.alphaHash,Mt=!!h.extensions;let ct=ei;h.toneMapped&&(Nt===null||Nt.isXRRenderTarget===!0)&&(ct=i.toneMapping);const gt=ee?q.isCompressedCubeTexture?q.image[0].mipmaps:q.mipmaps:null,$t={shaderID:at,shaderType:h.type,shaderName:h.name,vertexShader:Rt,fragmentShader:j,defines:h.defines,customVertexShaderID:ft,customFragmentShaderID:Dt,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:Q,batching:Le,batchingColor:Le&&C._colorsTexture!==null,instancing:qt,instancingColor:qt&&C.instanceColor!==null,instancingMorph:qt&&C.morphTexture!==null,outputColorSpace:Nt===null?i.outputColorSpace:Nt.isXRRenderTarget===!0?Nt.texture.colorSpace:fe.workingColorSpace,alphaToCoverage:!!h.alphaToCoverage,map:Wt,matcap:Vt,envMap:Qt,envMapMode:Qt&&q.mapping,envMapPMREM:ee,envMapMaxLod:ee?gt.length-1:null,envMapSize:ee?gt[0].width:null,aoMap:Et,lightMap:Xt,bumpMap:se,normalMap:Jt,displacementMap:me,emissiveMap:Me,normalMapObjectSpace:Jt&&h.normalMapType===uh,normalMapTangentSpace:Jt&&h.normalMapType===wo,packedNormalMap:Jt&&h.normalMapType===wo&&B0(h.normalMap.format),metalnessMap:Fe,roughnessMap:ge,anisotropy:Ge,anisotropyMap:Tt,clearcoat:H,clearcoatMap:N,clearcoatNormalMap:w,clearcoatRoughnessMap:Y,diffuseRoughness:ae,diffuseRoughnessMap:ht,dispersion:Se,retroreflection:ye,iridescence:bt,iridescenceMap:lt,iridescenceThicknessMap:St,sheen:Pe,sheenColorMap:dt,sheenRoughnessMap:rt,specularMap:ot,specularColorMap:ut,specularIntensityMap:O,transmission:zt,transmissionMap:st,thicknessMap:it,gradientMap:yt,opaque:h.transparent===!1&&h.blending===ms&&h.alphaToCoverage===!1,alphaMap:mt,alphaTest:xt,alphaHash:Ut,combine:h.combine,mapUv:Wt&&f(h.map.channel),aoMapUv:Et&&f(h.aoMap.channel),lightMapUv:Xt&&f(h.lightMap.channel),bumpMapUv:se&&f(h.bumpMap.channel),normalMapUv:Jt&&f(h.normalMap.channel),displacementMapUv:me&&f(h.displacementMap.channel),emissiveMapUv:Me&&f(h.emissiveMap.channel),metalnessMapUv:Fe&&f(h.metalnessMap.channel),roughnessMapUv:ge&&f(h.roughnessMap.channel),anisotropyMapUv:Tt&&f(h.anisotropyMap.channel),clearcoatMapUv:N&&f(h.clearcoatMap.channel),clearcoatNormalMapUv:w&&f(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&f(h.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ht&&f(h.diffuseRoughnessMap.channel),iridescenceMapUv:lt&&f(h.iridescenceMap.channel),iridescenceThicknessMapUv:St&&f(h.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&f(h.sheenColorMap.channel),sheenRoughnessMapUv:rt&&f(h.sheenRoughnessMap.channel),specularMapUv:ot&&f(h.specularMap.channel),specularColorMapUv:ut&&f(h.specularColorMap.channel),specularIntensityMapUv:O&&f(h.specularIntensityMap.channel),transmissionMapUv:st&&f(h.transmissionMap.channel),thicknessMapUv:it&&f(h.thicknessMap.channel),alphaMapUv:mt&&f(h.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Jt||Ge),vertexNormals:!!I.attributes.normal,vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(Wt||mt),fog:!!B,useFog:h.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:h.wireframe===!1&&(h.flatShading===!0||I.attributes.normal===void 0&&Jt===!1&&(h.isMeshLambertMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isMeshPhysicalMaterial)),sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:wt,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:pt,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:L.filter(Ct=>Ct.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:h.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:ct,decodeVideoTexture:Wt&&h.map.isVideoTexture===!0&&fe.getTransfer(h.map.colorSpace)===Ae,decodeVideoTextureEmissive:Me&&h.emissiveMap.isVideoTexture===!0&&fe.getTransfer(h.emissiveMap.colorSpace)===Ae,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===ln,flipSided:h.side===dn,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:Mt&&h.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&h.extensions.multiDraw===!0||Le)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return $t.vertexUv1s=c.has(1),$t.vertexUv2s=c.has(2),$t.vertexUv3s=c.has(3),c.clear(),$t}function S(h){const v=[];if(h.shaderID?v.push(h.shaderID):(v.push(h.customVertexShaderID),v.push(h.customFragmentShaderID)),h.defines!==void 0)for(const R in h.defines)v.push(R),v.push(h.defines[R]);return h.isRawShaderMaterial===!1&&(d(v,h),m(v,h),v.push(i.outputColorSpace)),v.push(h.customProgramCacheKey),v.join()}function d(h,v){h.push(v.precision),h.push(v.outputColorSpace),h.push(v.envMapMode),h.push(v.envMapPMREM),h.push(v.envMapMaxLod),h.push(v.envMapSize),h.push(v.mapUv),h.push(v.alphaMapUv),h.push(v.lightMapUv),h.push(v.aoMapUv),h.push(v.bumpMapUv),h.push(v.normalMapUv),h.push(v.displacementMapUv),h.push(v.emissiveMapUv),h.push(v.metalnessMapUv),h.push(v.roughnessMapUv),h.push(v.anisotropyMapUv),h.push(v.clearcoatMapUv),h.push(v.clearcoatNormalMapUv),h.push(v.clearcoatRoughnessMapUv),h.push(v.diffuseRoughnessMapUv),h.push(v.iridescenceMapUv),h.push(v.iridescenceThicknessMapUv),h.push(v.sheenColorMapUv),h.push(v.sheenRoughnessMapUv),h.push(v.specularMapUv),h.push(v.specularColorMapUv),h.push(v.specularIntensityMapUv),h.push(v.transmissionMapUv),h.push(v.thicknessMapUv),h.push(v.combine),h.push(v.fogExp2),h.push(v.sizeAttenuation),h.push(v.morphTargetsCount),h.push(v.numSunLights),h.push(v.numDirLights),h.push(v.numPointLights),h.push(v.numSpotLights),h.push(v.numSpotLightMaps),h.push(v.numHemiLights),h.push(v.numRectAreaLights),h.push(v.numSunLightShadows),h.push(v.numDirLightShadows),h.push(v.numPointLightShadows),h.push(v.numSpotLightShadows),h.push(v.numSpotLightShadowsWithMaps),h.push(v.numLightProbes),h.push(v.numLightProbeGrids),h.push(v.shadowMapType),h.push(v.toneMapping),h.push(v.numClippingPlanes),h.push(v.numClipIntersection),h.push(v.depthPacking)}function m(h,v){o.disableAll(),v.instancing&&o.enable(0),v.instancingColor&&o.enable(1),v.instancingMorph&&o.enable(2),v.matcap&&o.enable(3),v.envMap&&o.enable(4),v.normalMapObjectSpace&&o.enable(5),v.normalMapTangentSpace&&o.enable(6),v.clearcoat&&o.enable(7),v.iridescence&&o.enable(8),v.alphaTest&&o.enable(9),v.vertexColors&&o.enable(10),v.vertexAlphas&&o.enable(11),v.vertexUv1s&&o.enable(12),v.vertexUv2s&&o.enable(13),v.vertexUv3s&&o.enable(14),v.vertexTangents&&o.enable(15),v.anisotropy&&o.enable(16),v.alphaHash&&o.enable(17),v.batching&&o.enable(18),v.dispersion&&o.enable(19),v.retroreflection&&o.enable(24),v.diffuseRoughness&&o.enable(25),v.batchingColor&&o.enable(20),v.gradientMap&&o.enable(21),v.packedNormalMap&&o.enable(22),v.vertexNormals&&o.enable(23),h.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),v.numLightProbeGrids>0&&o.enable(22),v.hasPositionAttribute&&o.enable(23),h.push(o.mask)}function y(h){const v=u[h.type];let R;if(v){const P=Bn[v];R=kh.clone(P.uniforms)}else R=h.uniforms;return R}function E(h,v){let R=p.get(v);return R!==void 0?++R.usedTimes:(R=new N0(i,v,h,s),l.push(R),p.set(v,R)),R}function T(h){if(--h.usedTimes===0){const v=l.indexOf(h);l[v]=l[l.length-1],l.pop(),p.delete(h.cacheKey),h.destroy()}}function M(h){a.remove(h)}function _(){a.dispose()}return{getParameters:x,getProgramCacheKey:S,getUniforms:y,acquireProgram:E,releaseProgram:T,releaseShaderCache:M,programs:l,dispose:_}}function G0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function k0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Dc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,x,S,d,m){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:x,materialVariant:o(u),groupOrder:S,renderOrder:u.renderOrder,z:d,group:m},i[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=x,y.materialVariant=o(u),y.groupOrder=S,y.renderOrder=u.renderOrder,y.z=d,y.group=m),t++,y}function c(u,f,x,S,d,m,y){y.reversedDepth===!0&&(d=-d);const E=a(u,f,x,S,d,m);x.transmission>0?n.push(E):x.transparent===!0?s.push(E):e.push(E)}function l(u,f,x,S,d,m){const y=a(u,f,x,S,d,m);x.transmission>0?n.unshift(y):x.transparent===!0?s.unshift(y):e.unshift(y)}function p(u,f){e.length>1&&e.sort(u||k0),n.length>1&&n.sort(f||Dc),s.length>1&&s.sort(f||Dc)}function g(){for(let u=t,f=i.length;u<f;u++){const x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:g,sort:p}}function H0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Lc,i.set(n,[o])):s>=r.length?(o=new Lc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function V0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new ne};break;case"SpotLight":e={position:new F,direction:new F,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function W0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let X0=0;function Y0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function q0(i){const t=new V0,e=W0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new de,o=new de;function a(l){let p=0,g=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let f=0,x=0,S=0,d=0,m=0,y=0,E=0,T=0,M=0,_=0,h=0,v=0,R=0,P=0;l.sort(Y0);for(let L=0,B=l.length;L<B;L++){const I=l[L],k=I.color,V=I.intensity,q=I.distance;let at=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ci?at=I.shadow.map.texture:at=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)p+=k.r*V,g+=k.g*V,u+=k.b*V;else if(I.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(I.sh.coefficients[Q],V);P++}else if(I.isSunLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,nt=e.get(I);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize.copy(z.mapSize).multiply(z.getFrameExtents()),n.sunShadow[x]=nt,n.sunShadowMap[x]=at;const pt=z.getViewportCount();for(let Rt=0;Rt<pt;Rt++)n.sunShadowMatrix[S+Rt]=z.getMatrix(Rt),n.sunShadowCascade[S+Rt]=z._cascadeData[Rt];S+=pt,x++}n.sun[f]=Q,f++}else if(I.isDirectionalLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,nt=e.get(I);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,n.directionalShadow[d]=nt,n.directionalShadowMap[d]=at,n.directionalShadowMatrix[d]=I.shadow.matrix,M++}n.directional[d]=Q,d++}else if(I.isSpotLight){const Q=t.get(I);Q.position.setFromMatrixPosition(I.matrixWorld),Q.color.copy(k).multiplyScalar(V),Q.distance=q,Q.coneCos=Math.cos(I.angle),Q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Q.decay=I.decay,n.spot[y]=Q;const z=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,z.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[y]=z.matrix,I.castShadow){const nt=e.get(I);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,n.spotShadow[y]=nt,n.spotShadowMap[y]=at,h++}y++}else if(I.isRectAreaLight){const Q=t.get(I);Q.color.copy(k).multiplyScalar(V),Q.halfWidth.set(I.width*.5,0,0),Q.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=Q,E++}else if(I.isPointLight){const Q=t.get(I);if(Q.color.copy(I.color).multiplyScalar(I.intensity),Q.distance=I.distance,Q.decay=I.decay,I.castShadow){const z=I.shadow,nt=e.get(I);nt.shadowIntensity=z.intensity,nt.shadowBias=z.bias,nt.shadowNormalBias=z.normalBias,nt.shadowRadius=z.radius,nt.shadowMapSize=z.mapSize,nt.shadowCameraNear=z.camera.near,nt.shadowCameraFar=z.camera.far,n.pointShadow[m]=nt,n.pointShadowMap[m]=at,n.pointShadowMatrix[m]=I.shadow.matrix,_++}n.point[m]=Q,m++}else if(I.isHemisphereLight){const Q=t.get(I);Q.skyColor.copy(I.color).multiplyScalar(V),Q.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[T]=Q,T++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=It.LTC_FLOAT_1,n.rectAreaLTC2=It.LTC_FLOAT_2):(n.rectAreaLTC1=It.LTC_HALF_1,n.rectAreaLTC2=It.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=g,n.ambient[2]=u;const C=n.hash;(C.sunLength!==f||C.directionalLength!==d||C.pointLength!==m||C.spotLength!==y||C.rectAreaLength!==E||C.hemiLength!==T||C.numSunShadows!==x||C.numDirectionalShadows!==M||C.numPointShadows!==_||C.numSpotShadows!==h||C.numSpotMaps!==v||C.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=d,n.spot.length=y,n.rectArea.length=E,n.point.length=m,n.hemi.length=T,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=S,n.sunShadowCascade.length=S,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=_,n.pointShadowMap.length=_,n.pointShadowMatrix.length=_,n.spotShadow.length=h,n.spotShadowMap.length=h,n.spotLightMatrix.length=h+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,C.sunLength=f,C.directionalLength=d,C.pointLength=m,C.spotLength=y,C.rectAreaLength=E,C.hemiLength=T,C.numSunShadows=x,C.numDirectionalShadows=M,C.numPointShadows=_,C.numSpotShadows=h,C.numSpotMaps=v,C.numLightProbes=P,n.version=X0++)}function c(l,p){let g=0,u=0,f=0,x=0,S=0,d=0;const m=p.matrixWorldInverse;for(let y=0,E=l.length;y<E;y++){const T=l[y];if(T.isSunLight){const M=n.sun[g];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),g++}else if(T.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(T.isSpotLight){const M=n.spot[x];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),x++}else if(T.isRectAreaLight){const M=n.rectArea[S];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),S++}else if(T.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){const M=n.hemi[d];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),d++}}}return{setup:a,setupView:c,state:n}}function Ic(i){const t=new q0(i),e=[],n=[],s=[];function r(g){p.camera=g,e.length=0,n.length=0,s.length=0}function o(g){g.isLightProbeGrid?s.push(g):e.push(g)}function a(g){n.push(g)}function c(){t.setup(e),s.sort((g,u)=>g.priority-u.priority||g.id-u.id)}function l(g){t.setupView(e,g)}const p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Z0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ic(i),t.set(s,[a])):r>=o.length?(a=new Ic(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const K0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J0=`uniform sampler2D shadow_pass;
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
}`,$0=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Q0=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Nc=new de,Bs=new F,Aa=new F;function j0(i,t,e){let n=new Ss;const s=new Ot,r=new Ot,o=new Oe,a=new Vh,c=new Wh,l={},p=e.maxTextureSize,g={[Ri]:dn,[dn]:Ri,[ln]:ln},u=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:K0,fragmentShader:J0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const x=new Je;x.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new ve(x,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hs;let m=this.type;this.render=function(_,h,v){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||_.length===0)return;this.type===Hc&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Hs);const R=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Xi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=m!==this.type;B&&h.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=_.length;I<k;I++){const V=_[I],q=V.shadow;if(q===void 0){Kt("WebGLShadowMap:",V,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const at=q.getFrameExtents();s.multiply(at),r.copy(q.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(r.x=Math.floor(p/at.x),s.x=r.x*at.x,q.mapSize.x=r.x),s.y>p&&(r.y=Math.floor(p/at.y),s.y=r.y*at.y,q.mapSize.y=r.y));const Q=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Q,q.map===null||B===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ds){if(V.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Gn(s.x,s.y,{format:Ci,type:Hn,minFilter:fn,magFilter:fn,generateMipmaps:!1}),q.map.texture.name=V.name+".shadowMap",q.map.depthTexture=new Ki(s.x,s.y,Dn),q.map.depthTexture.name=V.name+".shadowMapDepth",q.map.depthTexture.format=gi,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=en,q.map.depthTexture.magFilter=en}else V.isPointLight?(q.map=new Ko(s.x),q.map.depthTexture=new _l(s.x,kn)):(q.map=new Gn(s.x,s.y),q.map.depthTexture=new Ki(s.x,s.y,kn)),q.map.depthTexture.name=V.name+".shadowMap",q.map.depthTexture.format=gi,this.type===Hs?(q.map.depthTexture.compareFunction=Q?sl:il,q.map.depthTexture.minFilter=fn,q.map.depthTexture.magFilter=fn):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=en,q.map.depthTexture.magFilter=en);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);const z=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();V.isPointLight!==!0&&q.updateMatrices(V,v);const nt=(q.camera.layers.mask&4294967294)!==0?q.camera.layers:v.layers;for(let pt=0;pt<z;pt++){const Rt=q.getCamera(pt);if(V.isPointLight){const j=q.camera,ft=q.matrix,Dt=V.distance||j.far;Dt!==j.far&&(j.far=Dt,j.updateProjectionMatrix()),Bs.setFromMatrixPosition(V.matrixWorld),j.position.copy(Bs),Aa.copy(j.position),Aa.add($0[pt]),j.up.copy(Q0[pt]),j.lookAt(Aa),j.updateMatrixWorld(),ft.makeTranslation(-Bs.x,-Bs.y,-Bs.z),Nc.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),q._frustum.setFromProjectionMatrix(Nc,j.coordinateSystem,j.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,pt),i.clear();else{pt===0&&(i.setRenderTarget(q.map),i.clear());const j=q.getViewport(pt);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),L.viewport(o)}n=q.getFrustum(pt),T(h,v,Rt,V,nt,this.type)}q.isPointLightShadow!==!0&&this.type===ds&&y(q,v),q.needsUpdate=!1}m=this.type,d.needsUpdate=!1,i.setRenderTarget(R,P,C)};function y(_,h){const v=t.update(S);u.defines.VSM_SAMPLES!==_.blurSamples&&(u.defines.VSM_SAMPLES=_.blurSamples,f.defines.VSM_SAMPLES=_.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),_.mapPass===null?_.mapPass=new Gn(s.x,s.y,{format:Ci,type:Hn}):(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)&&_.mapPass.setSize(_.map.width,_.map.height),u.uniforms.shadow_pass.value=_.map.depthTexture,u.uniforms.resolution.value.set(_.map.width,_.map.height),u.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(h,null,v,u,S,null),f.uniforms.shadow_pass.value=_.mapPass.texture,f.uniforms.resolution.value.set(_.map.width,_.map.height),f.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(h,null,v,f,S,null)}function E(_,h,v,R){let P=null;const C=v.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(C!==void 0)P=C;else if(P=v.isPointLight===!0?c:a,i.localClippingEnabled&&h.clipShadows===!0&&Array.isArray(h.clippingPlanes)&&h.clippingPlanes.length!==0||h.displacementMap&&h.displacementScale!==0||h.alphaMap&&h.alphaTest>0||h.map&&h.alphaTest>0||h.alphaToCoverage===!0){const L=P.uuid,B=h.uuid;let I=l[L];I===void 0&&(I={},l[L]=I);let k=I[B];k===void 0&&(k=P.clone(),I[B]=k,h.addEventListener("dispose",M)),P=k}if(P.visible=h.visible,P.wireframe=h.wireframe,R===ds?P.side=h.shadowSide!==null?h.shadowSide:h.side:P.side=h.shadowSide!==null?h.shadowSide:g[h.side],P.alphaMap=h.alphaMap,P.alphaTest=h.alphaToCoverage===!0?.5:h.alphaTest,P.map=h.map,P.clipShadows=h.clipShadows,P.clippingPlanes=h.clippingPlanes,P.clipIntersection=h.clipIntersection,P.displacementMap=h.displacementMap,P.displacementScale=h.displacementScale,P.displacementBias=h.displacementBias,P.wireframeLinewidth=h.wireframeLinewidth,P.linewidth=h.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=i.properties.get(P);L.light=v}return P}function T(_,h,v,R,P,C){if(_.visible===!1)return;if(_.layers.test(P)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&C===ds)&&(!_.frustumCulled||_.intersectsFrustum(n))){_.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,_.matrixWorld);const I=t.update(_),k=_.material;if(Array.isArray(k)){const V=I.groups;for(let q=0,at=V.length;q<at;q++){const Q=V[q],z=k[Q.materialIndex];if(z&&z.visible){const nt=E(_,z,R,C);_.onBeforeShadow(i,_,h,v,I,nt,Q),i.renderBufferDirect(v,null,I,nt,_,Q),_.onAfterShadow(i,_,h,v,I,nt,Q)}}}else if(k.visible){const V=E(_,k,R,C);_.onBeforeShadow(i,_,h,v,I,V,null),i.renderBufferDirect(v,null,I,V,_,null),_.onAfterShadow(i,_,h,v,I,V,null)}}const B=_.children;for(let I=0,k=B.length;I<k;I++)T(B[I],h,v,R,P,C)}function M(_){_.target.removeEventListener("dispose",M);for(const v in l){const R=l[v],P=_.target.uuid;P in R&&(R[P].dispose(),delete R[P])}}}function tg(i,t){function e(){let O=!1;const st=new Oe;let it=null;const yt=new Oe(0,0,0,0);return{setMask:function(mt){it!==mt&&!O&&(i.colorMask(mt,mt,mt,mt),it=mt)},setLocked:function(mt){O=mt},setClear:function(mt,xt,Ut,Mt,ct){ct===!0&&(mt*=Mt,xt*=Mt,Ut*=Mt),st.set(mt,xt,Ut,Mt),yt.equals(st)===!1&&(i.clearColor(mt,xt,Ut,Mt),yt.copy(st))},reset:function(){O=!1,it=null,yt.set(-1,0,0,0)}}}function n(){let O=!1,st=!1,it=null,yt=null,mt=null;return{setReversed:function(xt){if(st!==xt){const Ut=t.get("EXT_clip_control");xt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),st=xt;const Mt=mt;mt=null,this.setClear(Mt)}},getReversed:function(){return st},setTest:function(xt){xt?wt(i.DEPTH_TEST):qt(i.DEPTH_TEST)},setMask:function(xt){it!==xt&&!O&&(i.depthMask(xt),it=xt)},setFunc:function(xt){if(st&&(xt=Tu[xt]),yt!==xt){switch(xt){case kr:i.depthFunc(i.NEVER);break;case Hr:i.depthFunc(i.ALWAYS);break;case Vr:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Wr:i.depthFunc(i.EQUAL);break;case Xr:i.depthFunc(i.GEQUAL);break;case Yr:i.depthFunc(i.GREATER);break;case qr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=xt}},setLocked:function(xt){O=xt},setClear:function(xt){mt!==xt&&(mt=xt,st&&(xt=1-xt),i.clearDepth(xt))},reset:function(){O=!1,it=null,yt=null,mt=null,st=!1}}}function s(){let O=!1,st=null,it=null,yt=null,mt=null,xt=null,Ut=null,Mt=null,ct=null;return{setTest:function(gt){O||(gt?wt(i.STENCIL_TEST):qt(i.STENCIL_TEST))},setMask:function(gt){st!==gt&&!O&&(i.stencilMask(gt),st=gt)},setFunc:function(gt,$t,Ct){(it!==gt||yt!==$t||mt!==Ct)&&(i.stencilFunc(gt,$t,Ct),it=gt,yt=$t,mt=Ct)},setOp:function(gt,$t,Ct){(xt!==gt||Ut!==$t||Mt!==Ct)&&(i.stencilOp(gt,$t,Ct),xt=gt,Ut=$t,Mt=Ct)},setLocked:function(gt){O=gt},setClear:function(gt){ct!==gt&&(i.clearStencil(gt),ct=gt)},reset:function(){O=!1,st=null,it=null,yt=null,mt=null,xt=null,Ut=null,Mt=null,ct=null}}}const r=new e,o=new n,a=new s;let c={};const l=new WeakMap;let p={},g={},u={},f=new WeakMap,x=[],S=null,d=!1,m=null,y=null,E=null,T=null,M=null,_=null,h=null,v=new ne(0,0,0),R=0,P=!1,C=null,L=null,B=null,I=null,k=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,at=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(Q)[1]),q=at>=1):Q.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),q=at>=2);let z=null,nt={};const pt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),j=new Oe().fromArray(pt),ft=new Oe().fromArray(Rt);function Dt(O,st,it,yt){const mt=new Uint8Array(4),xt=i.createTexture();i.bindTexture(O,xt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<it;Ut++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(st+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return xt}const Nt={};Nt[i.TEXTURE_2D]=Dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Nt[i.TEXTURE_CUBE_MAP]=Dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[i.TEXTURE_2D_ARRAY]=Dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Nt[i.TEXTURE_3D]=Dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),wt(i.DEPTH_TEST),o.setFunc(_s),se(!1),Jt(Ca),wt(i.CULL_FACE),Et(Xi);function wt(O){p[O]!==!0&&(i.enable(O),p[O]=!0)}function qt(O){p[O]!==!1&&(i.disable(O),p[O]=!1)}function Le(O,st){return u[O]!==st?(i.bindFramebuffer(O,st),u[O]=st,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=st),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Wt(O,st){let it=x,yt=!1;if(O){it=f.get(st),it===void 0&&(it=[],f.set(st,it));const mt=O.textures;if(it.length!==mt.length||it[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,Ut=mt.length;xt<Ut;xt++)it[xt]=i.COLOR_ATTACHMENT0+xt;it.length=mt.length,yt=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,yt=!0);yt&&i.drawBuffers(it)}function Vt(O){return S!==O?(i.useProgram(O),S=O,!0):!1}const Qt={[Hi]:i.FUNC_ADD,[Wc]:i.FUNC_SUBTRACT,[Xc]:i.FUNC_REVERSE_SUBTRACT};Qt[Yc]=i.MIN,Qt[qc]=i.MAX;const ee={[Zc]:i.ZERO,[Kc]:i.ONE,[Jc]:i.SRC_COLOR,[ka]:i.SRC_ALPHA,[nh]:i.SRC_ALPHA_SATURATE,[th]:i.DST_COLOR,[Qc]:i.DST_ALPHA,[$c]:i.ONE_MINUS_SRC_COLOR,[Ha]:i.ONE_MINUS_SRC_ALPHA,[eh]:i.ONE_MINUS_DST_COLOR,[jc]:i.ONE_MINUS_DST_ALPHA,[ih]:i.CONSTANT_COLOR,[sh]:i.ONE_MINUS_CONSTANT_COLOR,[rh]:i.CONSTANT_ALPHA,[oh]:i.ONE_MINUS_CONSTANT_ALPHA};function Et(O,st,it,yt,mt,xt,Ut,Mt,ct,gt){if(O===Xi){d===!0&&(qt(i.BLEND),d=!1);return}if(d===!1&&(wt(i.BLEND),d=!0),O!==Vc){if(O!==m||gt!==P){if((y!==Hi||M!==Hi)&&(i.blendEquation(i.FUNC_ADD),y=Hi,M=Hi),gt)switch(O){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFunc(i.ONE,i.ONE);break;case Pa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Da:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:xe("WebGLState: Invalid blending: ",O);break}else switch(O){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pa:xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Da:xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:xe("WebGLState: Invalid blending: ",O);break}E=null,T=null,_=null,h=null,v.set(0,0,0),R=0,m=O,P=gt}return}mt=mt||st,xt=xt||it,Ut=Ut||yt,(st!==y||mt!==M)&&(i.blendEquationSeparate(Qt[st],Qt[mt]),y=st,M=mt),(it!==E||yt!==T||xt!==_||Ut!==h)&&(i.blendFuncSeparate(ee[it],ee[yt],ee[xt],ee[Ut]),E=it,T=yt,_=xt,h=Ut),(Mt.equals(v)===!1||ct!==R)&&(i.blendColor(Mt.r,Mt.g,Mt.b,ct),v.copy(Mt),R=ct),m=O,P=!1}function Xt(O,st){O.side===ln?qt(i.CULL_FACE):wt(i.CULL_FACE);let it=O.side===dn;st&&(it=!it),se(it),O.blending===ms&&O.transparent===!1?Et(Xi):Et(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const yt=O.stencilWrite;a.setTest(yt),yt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Me(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):qt(i.SAMPLE_ALPHA_TO_COVERAGE)}function se(O){C!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),C=O)}function Jt(O){O!==Gc?(wt(i.CULL_FACE),O!==L&&(O===Ca?i.cullFace(i.BACK):O===kc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):qt(i.CULL_FACE),L=O}function me(O){O!==B&&(q&&i.lineWidth(O),B=O)}function Me(O,st,it){O?(wt(i.POLYGON_OFFSET_FILL),(I!==st||k!==it)&&(I=st,k=it,o.getReversed()&&(st=-st,it=-it),i.polygonOffset(st,it))):qt(i.POLYGON_OFFSET_FILL)}function Fe(O){O?wt(i.SCISSOR_TEST):qt(i.SCISSOR_TEST)}function ge(O){O===void 0&&(O=i.TEXTURE0+V-1),z!==O&&(i.activeTexture(O),z=O)}function Ge(O,st,it){it===void 0&&(z===null?it=i.TEXTURE0+V-1:it=z);let yt=nt[it];yt===void 0&&(yt={type:void 0,texture:void 0},nt[it]=yt),(yt.type!==O||yt.texture!==st)&&(z!==it&&(i.activeTexture(it),z=it),i.bindTexture(O,st||Nt[O]),yt.type=O,yt.texture=st)}function H(){const O=nt[z];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ae(){try{i.compressedTexImage2D(...arguments)}catch(O){xe("WebGLState:",O)}}function Se(){try{i.compressedTexImage3D(...arguments)}catch(O){xe("WebGLState:",O)}}function ye(){try{i.texSubImage2D(...arguments)}catch(O){xe("WebGLState:",O)}}function bt(){try{i.texSubImage3D(...arguments)}catch(O){xe("WebGLState:",O)}}function Pe(){try{i.compressedTexSubImage2D(...arguments)}catch(O){xe("WebGLState:",O)}}function zt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){xe("WebGLState:",O)}}function Tt(){try{i.texStorage2D(...arguments)}catch(O){xe("WebGLState:",O)}}function N(){try{i.texStorage3D(...arguments)}catch(O){xe("WebGLState:",O)}}function w(){try{i.texImage2D(...arguments)}catch(O){xe("WebGLState:",O)}}function Y(){try{i.texImage3D(...arguments)}catch(O){xe("WebGLState:",O)}}function ht(O){return g[O]!==void 0?g[O]:i.getParameter(O)}function lt(O,st){g[O]!==st&&(i.pixelStorei(O,st),g[O]=st)}function St(O){j.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),j.copy(O))}function dt(O){ft.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),ft.copy(O))}function rt(O,st){let it=l.get(st);it===void 0&&(it=new WeakMap,l.set(st,it));let yt=it.get(O);yt===void 0&&(yt=i.getUniformBlockIndex(st,O.name),i.uniformBlockBinding(st,yt,yt),it.set(O,yt))}function ot(O,st,it){const mt=l.get(st).get(O);c[mt]!==it&&(i.bindBufferBase(i.UNIFORM_BUFFER,mt,it),c[mt]=it)}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),p={},g={},z=null,nt={},u={},c={},f=new WeakMap,x=[],S=null,d=!1,m=null,y=null,E=null,T=null,M=null,_=null,h=null,v=new ne(0,0,0),R=0,P=!1,C=null,L=null,B=null,I=null,k=null,j.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:wt,disable:qt,bindFramebuffer:Le,drawBuffers:Wt,useProgram:Vt,setBlending:Et,setMaterial:Xt,setFlipSided:se,setCullFace:Jt,setLineWidth:me,setPolygonOffset:Me,setScissorTest:Fe,activeTexture:ge,bindTexture:Ge,unbindTexture:H,compressedTexImage2D:ae,compressedTexImage3D:Se,texImage2D:w,texImage3D:Y,pixelStorei:lt,getParameter:ht,updateUBOMapping:rt,uniformBlockBinding:ot,texStorage2D:Tt,texStorage3D:N,texSubImage2D:ye,texSubImage3D:bt,compressedTexSubImage2D:Pe,compressedTexSubImage3D:zt,scissor:St,viewport:dt,reset:ut}}function eg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ot,p=new WeakMap,g=new Set;let u;const f=new WeakMap,x=new Set,S=new FinalizationRegistry(N=>x.delete(N));let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(N,w){return d?new OffscreenCanvas(N,w):Ro("canvas")}function y(N,w,Y){let ht=1;const lt=Tt(N);if((lt.width>Y||lt.height>Y)&&(ht=Y/Math.max(lt.width,lt.height)),ht<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const St=Math.floor(ht*lt.width),dt=Math.floor(ht*lt.height);u===void 0&&(u=m(St,dt));const rt=w?m(St,dt):u;return rt.width=St,rt.height=dt,rt.getContext("2d").drawImage(N,0,0,St,dt),Kt("WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+St+"x"+dt+")."),rt}else return"data"in N&&Kt("WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),N;return N}function E(N){return N.generateMipmaps}function T(N){i.generateMipmap(N)}function M(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(N,w,Y,ht,lt,St=!1){if(N!==null){if(i[N]!==void 0)return i[N];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let dt;ht&&(dt=t.get("EXT_texture_norm16"),dt||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let rt=w;if(w===i.RED&&(Y===i.FLOAT&&(rt=i.R32F),Y===i.HALF_FLOAT&&(rt=i.R16F),Y===i.UNSIGNED_BYTE&&(rt=i.R8),Y===i.UNSIGNED_SHORT&&dt&&(rt=dt.R16_EXT),Y===i.SHORT&&dt&&(rt=dt.R16_SNORM_EXT)),w===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(rt=i.R8UI),Y===i.UNSIGNED_SHORT&&(rt=i.R16UI),Y===i.UNSIGNED_INT&&(rt=i.R32UI),Y===i.BYTE&&(rt=i.R8I),Y===i.SHORT&&(rt=i.R16I),Y===i.INT&&(rt=i.R32I)),w===i.RG&&(Y===i.FLOAT&&(rt=i.RG32F),Y===i.HALF_FLOAT&&(rt=i.RG16F),Y===i.UNSIGNED_BYTE&&(rt=i.RG8),Y===i.UNSIGNED_SHORT&&dt&&(rt=dt.RG16_EXT),Y===i.SHORT&&dt&&(rt=dt.RG16_SNORM_EXT)),w===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(rt=i.RG8UI),Y===i.UNSIGNED_SHORT&&(rt=i.RG16UI),Y===i.UNSIGNED_INT&&(rt=i.RG32UI),Y===i.BYTE&&(rt=i.RG8I),Y===i.SHORT&&(rt=i.RG16I),Y===i.INT&&(rt=i.RG32I)),w===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),Y===i.UNSIGNED_INT&&(rt=i.RGB32UI),Y===i.BYTE&&(rt=i.RGB8I),Y===i.SHORT&&(rt=i.RGB16I),Y===i.INT&&(rt=i.RGB32I)),w===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),Y===i.UNSIGNED_INT&&(rt=i.RGBA32UI),Y===i.BYTE&&(rt=i.RGBA8I),Y===i.SHORT&&(rt=i.RGBA16I),Y===i.INT&&(rt=i.RGBA32I)),w===i.RGB&&(Y===i.UNSIGNED_SHORT&&dt&&(rt=dt.RGB16_EXT),Y===i.SHORT&&dt&&(rt=dt.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),w===i.RGBA){const ot=St?nr:fe.getTransfer(lt);Y===i.FLOAT&&(rt=i.RGBA32F),Y===i.HALF_FLOAT&&(rt=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(rt=ot===Ae?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&dt&&(rt=dt.RGBA16_EXT),Y===i.SHORT&&dt&&(rt=dt.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function h(N,w){let Y;return N?w===null||w===kn||w===Zi?Y=i.DEPTH24_STENCIL8:w===Dn?Y=i.DEPTH32F_STENCIL8:w===vs&&(Y=i.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===kn||w===Zi?Y=i.DEPTH_COMPONENT24:w===Dn?Y=i.DEPTH_COMPONENT32F:w===vs&&(Y=i.DEPTH_COMPONENT16),Y}function v(N,w){return E(N)===!0||N.isFramebufferTexture&&N.minFilter!==en&&N.minFilter!==fn?Math.log2(Math.max(w.width,w.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?w.mipmaps.length:1}function R(N){const w=new WeakRef(N);n.get(N).__ref=w,x.add(w),S.register(N,w,w)}function P(N){const w=n.get(N).__ref;w!==void 0&&(x.delete(w),S.unregister(w))}function C(N){B(N.target)}function L(N){I(N.target)}function B(N){N.removeEventListener("dispose",C),P(N),V(N),N.isVideoTexture&&p.delete(N),N.isHTMLTexture&&g.delete(N)}function I(N){N.removeEventListener("dispose",L),P(N),at(N)}function k(){for(const N of x){const w=N.deref();w!==void 0&&(w.isRenderTarget===!0?I(w):B(w))}x.clear(),g.clear()}function V(N){const w=n.get(N);if(w.__webglInit===void 0)return;const Y=N.source,ht=f.get(Y);if(ht){const lt=ht[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&q(N),Object.keys(ht).length===0&&f.delete(Y)}n.remove(N)}function q(N){const w=n.get(N);i.deleteTexture(w.__webglTexture);const Y=N.source,ht=f.get(Y);delete ht[w.__cacheKey],o.memory.textures--}function at(N){const w=n.get(N);w.__depthDisposeCallback&&w.__depthDisposeCallback();const Y=N.depthTexture;if(Y&&Y.renderTarget===N&&B(Y),N.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(w.__webglFramebuffer[lt]))for(let St=0;St<w.__webglFramebuffer[lt].length;St++)i.deleteFramebuffer(w.__webglFramebuffer[lt][St]);else i.deleteFramebuffer(w.__webglFramebuffer[lt]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[lt])}else{if(Array.isArray(w.__webglFramebuffer))for(let lt=0;lt<w.__webglFramebuffer.length;lt++)i.deleteFramebuffer(w.__webglFramebuffer[lt]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let lt=0;lt<w.__webglColorRenderbuffer.length;lt++)w.__webglColorRenderbuffer[lt]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[lt]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const ht=N.textures;for(let lt=0,St=ht.length;lt<St;lt++){const dt=n.get(ht[lt]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),o.memory.textures--),n.remove(ht[lt])}n.remove(N)}let Q=0;function z(){Q=0}function nt(){return Q}function pt(N){Q=N}function Rt(){const N=Q;return N>=s.maxTextures&&Kt("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),Q+=1,N}function j(N){const w=[];return w.push(N.wrapS),w.push(N.wrapT),w.push(N.wrapR||0),w.push(N.magFilter),w.push(N.minFilter),w.push(N.anisotropy),w.push(N.internalFormat),w.push(N.format),w.push(N.type),w.push(N.generateMipmaps),w.push(N.mipmapsAutoUpdate),w.push(N.premultiplyAlpha),w.push(N.flipY),w.push(N.unpackAlignment),w.push(N.colorSpace),w.join()}function ft(N,w){const Y=n.get(N);if(N.isVideoTexture&&Pe(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Y.__version!==N.version){const ht=N.image;if(ht===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{Xt(Y,N,w);return}}else N.isExternalTexture&&(Y.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+w)}function Dt(N,w){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){Xt(Y,N,w);return}else N.isExternalTexture&&(Y.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+w)}function Nt(N,w){const Y=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Y.__version!==N.version){Xt(Y,N,w);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+w)}function wt(N,w){const Y=n.get(N);if(N.version>0&&Y.__version!==N.version){se(Y,N,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+w)}const qt={[Zr]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[Kr]:i.MIRRORED_REPEAT},Le={[en]:i.NEAREST,[ch]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[Or]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},Wt={[dh]:i.NEVER,[rl]:i.ALWAYS,[ph]:i.LESS,[il]:i.LEQUAL,[mh]:i.EQUAL,[sl]:i.GEQUAL,[gh]:i.GREATER,[_h]:i.NOTEQUAL};function Vt(N,w){if(w.type===Dn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===fn||w.magFilter===Or||w.magFilter===Gs||w.magFilter===fi||w.minFilter===fn||w.minFilter===Or||w.minFilter===Gs||w.minFilter===fi)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,qt[w.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,qt[w.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,qt[w.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,Le[w.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,Le[w.minFilter]),w.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Wt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===en||w.minFilter!==Gs&&w.minFilter!==fi||w.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(N,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Qt(N,w){let Y=!1;N.__webglInit===void 0&&(N.__webglInit=!0,w.addEventListener("dispose",C),R(w));const ht=w.source;let lt=f.get(ht);lt===void 0&&(lt={},f.set(ht,lt));const St=j(w);if(St!==N.__cacheKey){lt[St]===void 0&&(lt[St]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),lt[St].usedTimes++;const dt=lt[N.__cacheKey];dt!==void 0&&(lt[N.__cacheKey].usedTimes--,dt.usedTimes===0&&q(w)),N.__cacheKey=St,N.__webglTexture=lt[St].texture}return Y}function ee(N,w,Y){return Math.floor(Math.floor(N/Y)/w)}function Et(N,w,Y,ht){const St=N.updateRanges;if(St.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,Y,ht,w.data);else{St.sort((O,st)=>O.start-st.start);let dt=0;for(let O=1;O<St.length;O++){const st=St[dt],it=St[O],yt=st.start+st.count,mt=ee(it.start,w.width,4),xt=ee(st.start,w.width,4);it.start<=yt+1&&mt===xt&&ee(it.start+it.count-1,w.width,4)===mt?st.count=Math.max(st.count,it.start+it.count-st.start):(++dt,St[dt]=it)}St.length=dt+1;const rt=e.getParameter(i.UNPACK_ROW_LENGTH),ot=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let O=0,st=St.length;O<st;O++){const it=St[O],yt=Math.floor(it.start/4),mt=Math.ceil(it.count/4),xt=yt%w.width,Ut=Math.floor(yt/w.width),Mt=mt,ct=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,xt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ut),e.texSubImage2D(i.TEXTURE_2D,0,xt,Ut,Mt,ct,Y,ht,w.data)}N.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,rt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function Xt(N,w,Y){let ht=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ht=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ht=i.TEXTURE_3D);const lt=Qt(N,w),St=w.source;e.bindTexture(ht,N.__webglTexture,i.TEXTURE0+Y);const dt=n.get(St);if(St.version!==dt.__version||lt===!0){if(e.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const ct=fe.getPrimaries(fe.workingColorSpace),gt=w.colorSpace===ui?null:fe.getPrimaries(w.colorSpace),$t=w.colorSpace===ui||ct===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t)}e.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let ot=y(w.image,!1,s.maxTextureSize);ot=zt(w,ot);const ut=r.convert(w.format,w.colorSpace),O=r.convert(w.type);let st=_(w.internalFormat,ut,O,w.normalized,w.colorSpace,w.isVideoTexture);Vt(ht,w);let it;const yt=w.mipmaps,mt=w.isVideoTexture!==!0,xt=dt.__version===void 0||lt===!0,Ut=St.dataReady,Mt=v(w,ot);if(w.isDepthTexture)st=h(w.format===di,w.type),xt&&(mt?e.texStorage2D(i.TEXTURE_2D,1,st,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,st,ot.width,ot.height,0,ut,O,null));else if(w.isDataTexture)if(yt.length>0){mt&&xt&&e.texStorage2D(i.TEXTURE_2D,Mt,st,yt[0].width,yt[0].height);for(let ct=0,gt=yt.length;ct<gt;ct++)it=yt[ct],mt?Ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,it.width,it.height,ut,O,it.data):e.texImage2D(i.TEXTURE_2D,ct,st,it.width,it.height,0,ut,O,it.data);w.generateMipmaps=!1}else mt?(xt&&e.texStorage2D(i.TEXTURE_2D,Mt,st,ot.width,ot.height),Ut&&Et(w,ot,ut,O)):e.texImage2D(i.TEXTURE_2D,0,st,ot.width,ot.height,0,ut,O,ot.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){mt&&xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,st,yt[0].width,yt[0].height,ot.depth);for(let ct=0,gt=yt.length;ct<gt;ct++)if(it=yt[ct],w.format!==zn)if(ut!==null)if(mt){if(Ut)if(w.layerUpdates.size>0){const $t=dc(it.width,it.height,w.format,w.type);for(const Ct of w.layerUpdates){const ue=it.data.subarray(Ct*$t/it.data.BYTES_PER_ELEMENT,(Ct+1)*$t/it.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Ct,it.width,it.height,1,ut,ue)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,it.width,it.height,ot.depth,ut,it.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,st,it.width,it.height,ot.depth,0,it.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else mt?Ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,it.width,it.height,ot.depth,ut,O,it.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,st,it.width,it.height,ot.depth,0,ut,O,it.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{mt&&xt&&e.texStorage2D(i.TEXTURE_2D,Mt,st,yt[0].width,yt[0].height);for(let ct=0,gt=yt.length;ct<gt;ct++)it=yt[ct],w.format!==zn?ut!==null?mt?Ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,it.width,it.height,ut,it.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,st,it.width,it.height,0,it.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?Ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,it.width,it.height,ut,O,it.data):e.texImage2D(i.TEXTURE_2D,ct,st,it.width,it.height,0,ut,O,it.data)}else if(w.isDataArrayTexture)if(mt){if(xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,st,ot.width,ot.height,ot.depth),Ut)if(w.layerUpdates.size>0){const ct=dc(ot.width,ot.height,w.format,w.type);for(const gt of w.layerUpdates){const $t=ot.data.subarray(gt*ct/ot.data.BYTES_PER_ELEMENT,(gt+1)*ct/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,gt,ot.width,ot.height,1,ut,O,$t)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,ut,O,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,st,ot.width,ot.height,ot.depth,0,ut,O,ot.data);else if(w.isData3DTexture)mt?(xt&&e.texStorage3D(i.TEXTURE_3D,Mt,st,ot.width,ot.height,ot.depth),Ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,ut,O,ot.data)):e.texImage3D(i.TEXTURE_3D,0,st,ot.width,ot.height,ot.depth,0,ut,O,ot.data);else if(w.isFramebufferTexture){if(xt)if(mt)e.texStorage2D(i.TEXTURE_2D,Mt,st,ot.width,ot.height);else{let ct=ot.width,gt=ot.height;for(let $t=0;$t<Mt;$t++)e.texImage2D(i.TEXTURE_2D,$t,st,ct,gt,0,ut,O,null),ct>>=1,gt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){const ct=i.canvas;if(ct.hasAttribute("layoutsubtree")||ct.setAttribute("layoutsubtree","true"),ot.parentNode!==ct){ct.appendChild(ot),g.add(w),ct.onpaint=gt=>{const $t=gt.changedElements;for(const Ct of g)$t.includes(Ct.image)&&(Ct.needsUpdate=!0)},ct.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ot);else{const $t=i.RGBA,Ct=i.RGBA,ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,$t,Ct,ue,ot)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(yt.length>0){if(mt&&xt){const ct=Tt(yt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,st,ct.width,ct.height)}for(let ct=0,gt=yt.length;ct<gt;ct++)it=yt[ct],mt?Ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,ut,O,it):e.texImage2D(i.TEXTURE_2D,ct,st,ut,O,it);w.generateMipmaps=!1}else if(mt){if(xt){const ct=Tt(ot);e.texStorage2D(i.TEXTURE_2D,Mt,st,ct.width,ct.height)}Ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,O,ot)}else e.texImage2D(i.TEXTURE_2D,0,st,ut,O,ot);E(w)&&w.mipmapsAutoUpdate===!0&&T(ht),dt.__version=St.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function se(N,w,Y){if(w.image.length!==6)return;const ht=Qt(N,w),lt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+Y);const St=n.get(lt);if(lt.version!==St.__version||ht===!0){e.activeTexture(i.TEXTURE0+Y);const dt=fe.getPrimaries(fe.workingColorSpace),rt=w.colorSpace===ui?null:fe.getPrimaries(w.colorSpace),ot=w.colorSpace===ui||dt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const ut=w.isCompressedTexture||w.image[0].isCompressedTexture,O=w.image[0]&&w.image[0].isDataTexture,st=[];for(let Ct=0;Ct<6;Ct++)!ut&&!O?st[Ct]=y(w.image[Ct],!0,s.maxCubemapSize):st[Ct]=O?w.image[Ct].image:w.image[Ct],st[Ct]=zt(w,st[Ct]);const it=st[0],yt=r.convert(w.format,w.colorSpace),mt=r.convert(w.type);let xt=_(w.internalFormat,yt,mt,w.normalized,w.colorSpace);const Ut=w.isVideoTexture!==!0,Mt=St.__version===void 0||ht===!0,ct=lt.dataReady;let gt=v(w,it);Vt(i.TEXTURE_CUBE_MAP,w);let $t;if(w.isDepthTexture){if(xt=h(w.format===di,w.type),Mt)if(Ut)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,xt,it.width,it.height);else for(let Ct=0;Ct<6;Ct++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,xt,it.width,it.height,0,yt,mt,null)}else if(ut){Ut&&Mt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,xt,it.width,it.height);for(let Ct=0;Ct<6;Ct++){$t=st[Ct].mipmaps;for(let ue=0;ue<$t.length;ue++){const ke=$t[ue];w.format!==zn?yt!==null?Ut?ct&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue,0,0,ke.width,ke.height,yt,ke.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue,xt,ke.width,ke.height,0,ke.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue,0,0,ke.width,ke.height,yt,mt,ke.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue,xt,ke.width,ke.height,0,yt,mt,ke.data)}}}else{if($t=w.mipmaps,Ut&&Mt){$t.length>0&&gt++;const Ct=Tt(st[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,xt,Ct.width,Ct.height)}for(let Ct=0;Ct<6;Ct++)if(O){Ut?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,st[Ct].width,st[Ct].height,yt,mt,st[Ct].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,xt,st[Ct].width,st[Ct].height,0,yt,mt,st[Ct].data);for(let ue=0;ue<$t.length;ue++){const De=$t[ue].image[Ct].image;Ut?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue+1,0,0,De.width,De.height,yt,mt,De.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue+1,xt,De.width,De.height,0,yt,mt,De.data)}}else{Ut?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,yt,mt,st[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,xt,yt,mt,st[Ct]);for(let ue=0;ue<$t.length;ue++){const ke=$t[ue];Ut?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue+1,0,0,yt,mt,ke.image[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,ue+1,xt,yt,mt,ke.image[Ct])}}}E(w)&&w.mipmapsAutoUpdate===!0&&T(i.TEXTURE_CUBE_MAP),St.__version=lt.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function Jt(N,w,Y,ht,lt,St){const dt=r.convert(Y.format,Y.colorSpace),rt=r.convert(Y.type),ot=_(Y.internalFormat,dt,rt,Y.normalized,Y.colorSpace),ut=n.get(w),O=n.get(Y);if(O.__renderTarget=w,!ut.__hasExternalTextures){const st=Math.max(1,w.width>>St),it=Math.max(1,w.height>>St);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,St,ot,st,it,w.depth,0,dt,rt,null):e.texImage2D(lt,St,ot,st,it,0,dt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,N),bt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,lt,O.__webglTexture,0,ye(w)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ht,lt,O.__webglTexture,St),e.bindFramebuffer(i.FRAMEBUFFER,null)}function me(N,w,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,N),w.depthBuffer){const ht=w.depthTexture,lt=ht&&ht.isDepthTexture?ht.type:null,St=h(w.stencilBuffer,lt),dt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;bt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(w),St,w.width,w.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(w),St,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,St,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,N)}else{const ht=w.textures;for(let lt=0;lt<ht.length;lt++){const St=ht[lt],dt=r.convert(St.format,St.colorSpace),rt=r.convert(St.type),ot=_(St.internalFormat,dt,rt,St.normalized,St.colorSpace);bt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye(w),ot,w.width,w.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye(w),ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(N,w,Y){const ht=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,N),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const lt=n.get(w.depthTexture);lt.__renderTarget=w;const St=ht?w.depthTexture.image[0]:w.depthTexture.image;(!lt.__webglTexture||St.width!==w.width||St.height!==w.height)&&(St.width=w.width,St.height=w.height,w.depthTexture.needsUpdate=!0),ht?wt(w.depthTexture,0):ft(w.depthTexture,0);const dt=lt.__webglTexture,rt=ye(w),ot=ht?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,ut=w.depthTexture.format===di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===gi)bt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,ot,dt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,ut,ot,dt,0);else if(w.depthTexture.format===di)bt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ut,ot,dt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,ut,ot,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Fe(N){const w=n.get(N),Y=N.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==N.depthTexture){const ht=N.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ht){const lt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ht.removeEventListener("dispose",lt)};ht.addEventListener("dispose",lt),w.__depthDisposeCallback=lt}w.__boundDepthTexture=ht}if(N.depthTexture&&!w.__autoAllocateDepthBuffer)if(Y)for(let ht=0;ht<6;ht++)Me(w.__webglFramebuffer[ht],N,ht);else N.texture.mipmaps.length>0?Me(w.__webglFramebuffer[0],N,0):Me(w.__webglFramebuffer,N,0);else if(Y){w.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ht]),w.__webglDepthbuffer[ht]===void 0)w.__webglDepthbuffer[ht]=i.createRenderbuffer(),me(w.__webglDepthbuffer[ht],N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=w.__webglDepthbuffer[ht];i.bindRenderbuffer(i.RENDERBUFFER,St),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,St)}}else if(N.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),me(w.__webglDepthbuffer,N,!1);else{const lt=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,St),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,St)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(N,w,Y){const ht=n.get(N);w!==void 0&&Jt(ht.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Fe(N)}function Ge(N){const w=N.texture,Y=n.get(N),ht=n.get(w);N.addEventListener("dispose",L),R(N);const lt=N.textures,St=N.isWebGLCubeRenderTarget===!0,dt=lt.length>1;if(dt||(ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture()),ht.__version=w.version,o.memory.textures++),St){Y.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(w.mipmaps.length>0){Y.__webglFramebuffer[rt]=[];for(let ot=0;ot<w.mipmaps.length;ot++)Y.__webglFramebuffer[rt][ot]=i.createFramebuffer()}else Y.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(w.mipmaps.length>0){Y.__webglFramebuffer=[];for(let rt=0;rt<w.mipmaps.length;rt++)Y.__webglFramebuffer[rt]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(dt)for(let rt=0,ot=lt.length;rt<ot;rt++){const ut=n.get(lt[rt]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),o.memory.textures++)}if(N.samples>0&&bt(N)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let rt=0;rt<lt.length;rt++){const ot=lt[rt];Y.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[rt]);const ut=r.convert(ot.format,ot.colorSpace),O=r.convert(ot.type),st=_(ot.internalFormat,ut,O,ot.normalized,ot.colorSpace,N.isXRRenderTarget===!0),it=ye(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,it,st,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,Y.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),me(Y.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(St){e.bindTexture(i.TEXTURE_CUBE_MAP,ht.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,w);for(let rt=0;rt<6;rt++)if(w.mipmaps.length>0)for(let ot=0;ot<w.mipmaps.length;ot++)Jt(Y.__webglFramebuffer[rt][ot],N,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ot);else Jt(Y.__webglFramebuffer[rt],N,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);E(w)?T(i.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),e.unbindTexture()}else if(dt){for(let rt=0,ot=lt.length;rt<ot;rt++){const ut=lt[rt],O=n.get(ut);let st=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(st=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,O.__webglTexture),Vt(st,ut),Jt(Y.__webglFramebuffer,N,ut,i.COLOR_ATTACHMENT0+rt,st,0),E(ut)&&T(st)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(rt=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,ht.__webglTexture),Vt(rt,w),w.mipmaps.length>0)for(let ot=0;ot<w.mipmaps.length;ot++)Jt(Y.__webglFramebuffer[ot],N,w,i.COLOR_ATTACHMENT0,rt,ot);else Jt(Y.__webglFramebuffer,N,w,i.COLOR_ATTACHMENT0,rt,0);E(w)?T(rt):w.mipmaps.length>0&&i.texParameteri(rt,i.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),e.unbindTexture()}N.depthBuffer&&Fe(N)}function H(N){const w=N.textures;for(let Y=0,ht=w.length;Y<ht;Y++){const lt=w[Y];if(E(lt)&&lt.mipmapsAutoUpdate===!0){const St=M(N),dt=n.get(lt).__webglTexture;e.bindTexture(St,dt),T(St),e.unbindTexture()}}}const ae=[];function Se(N){if(N.samples>0){if(bt(N)===!1){const w=N.textures,Y=N.width,ht=N.height;let lt=i.COLOR_BUFFER_BIT;const St=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(N),rt=w.length>1;if(rt)for(let ut=0;ut<w.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ut=0;ut<w.length;ut++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[ut]);const O=n.get(w[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,Y,ht,0,0,Y,ht,lt,i.NEAREST),c===!0&&(ae.length=0,ae.push(i.COLOR_ATTACHMENT0+ut),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&ae.push(St),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ae))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let ut=0;ut<w.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,dt.__webglColorRenderbuffer[ut]);const O=n.get(w[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,O,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&c){const w=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ye(N){return Math.min(s.maxSamples,N.samples)}function bt(N){const w=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Pe(N){const w=o.render.frame;p.get(N)!==w&&(p.set(N,w),N.update())}function zt(N,w){const Y=N.colorSpace,ht=N.format,lt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Y!==er&&Y!==ui&&(fe.getTransfer(Y)===Ae?(ht!==zn||lt!==_n)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):xe("WebGLTextures: Unsupported texture color space:",Y)),w}function Tt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(l.width=N.naturalWidth||N.width,l.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(l.width=N.displayWidth,l.height=N.displayHeight):(l.width=N.width,l.height=N.height),l}this.allocateTextureUnit=Rt,this.resetTextureUnits=z,this.getTextureUnits=nt,this.setTextureUnits=pt,this.setTexture2D=ft,this.setTexture2DArray=Dt,this.setTexture3D=Nt,this.setTextureCube=wt,this.rebindTextures=ge,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=Jt,this.useMultisampledRTT=bt,this.dispose=k}function ou(i,t){function e(n,s=ui){let r;const o=fe.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===Oo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Bo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ja)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$a)return i.BYTE;if(n===Qa)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===Fo)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===Hn)return i.HALF_FLOAT;if(n===el)return i.ALPHA;if(n===nl)return i.RGB;if(n===zn)return i.RGBA;if(n===gi)return i.DEPTH_COMPONENT;if(n===di)return i.DEPTH_STENCIL;if(n===zo)return i.RED;if(n===Go)return i.RED_INTEGER;if(n===Ci)return i.RG;if(n===ko)return i.RG_INTEGER;if(n===Ho)return i.RGBA_INTEGER;if(n===Vs||n===Ws||n===Xs||n===Ys)if(o===Ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jr||n===$r||n===Qr||n===jr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$r)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===to||n===eo||n===no||n===io||n===so||n===js||n===ro)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===to||n===eo)return o===Ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===no)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===io)return r.COMPRESSED_R11_EAC;if(n===so)return r.COMPRESSED_SIGNED_R11_EAC;if(n===js)return r.COMPRESSED_RG11_EAC;if(n===ro)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===oo||n===ao||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===xo||n===vo||n===Mo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===co)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ho)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===po)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===go)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_o)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===yo||n===bo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===So)return o===Ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eo||n===To||n===tr||n===Ao)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Eo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ig=`
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

}`;class sg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new xl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pi({vertexShader:ng,fragmentShader:ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ve(new _i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rg extends xi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,p=null,g=null,u=null,f=null,x=null;const S=typeof XRWebGLBinding<"u",d=new sg,m={},y=e.getContextAttributes();let E=null,T=null;const M=[],_=[],h=new Ot;let v=null,R=null;const P=new Cn;P.viewport=new Oe;const C=new Cn;C.viewport=new Oe;const L=[P,C],B=new qh;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ft=M[j];return ft===void 0&&(ft=new zr,M[j]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(j){let ft=M[j];return ft===void 0&&(ft=new zr,M[j]=ft),ft.getGripSpace()},this.getHand=function(j){let ft=M[j];return ft===void 0&&(ft=new zr,M[j]=ft),ft.getHandSpace()};function V(j){const ft=_.indexOf(j.inputSource);if(ft===-1)return;const Dt=M[ft];Dt!==void 0&&(Dt.update(j.inputSource,j.frame,l||o),Dt.dispatchEvent({type:j.type,data:j.inputSource}))}function q(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",at);for(let j=0;j<M.length;j++){const ft=_[j];ft!==null&&(_[j]=null,M[j].disconnect(ft))}I=null,k=null,d.reset();for(const j in m)delete m[j];if(t.setRenderTarget(E),f=null,u=null,g=null,s=null,T=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(h.width,h.height,!1),R!==null){const j=R.camera;j.fov=R.fov,j.zoom=R.zoom,j.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return g===null&&S&&(g=new XRWebGLBinding(s,e)),g},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",q),s.addEventListener("inputsourceschange",at),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(h),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Dt=null,Nt=null,wt=null;y.depth&&(wt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Dt=y.stencil?di:gi,Nt=y.stencil?Zi:kn);const qt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};g=this.getBinding(),u=g.createProjectionLayer(qt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),T=new Gn(u.textureWidth,u.textureHeight,{format:zn,type:_n,depthTexture:new Ki(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,Dt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Dt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Dt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new Gn(f.framebufferWidth,f.framebufferHeight,{format:zn,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Rt.setContext(s),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function at(j){for(let ft=0;ft<j.removed.length;ft++){const Dt=j.removed[ft],Nt=_.indexOf(Dt);Nt>=0&&(_[Nt]=null,M[Nt].disconnect(Dt))}for(let ft=0;ft<j.added.length;ft++){const Dt=j.added[ft];let Nt=_.indexOf(Dt);if(Nt===-1){for(let qt=0;qt<M.length;qt++)if(qt>=_.length){_.push(Dt),Nt=qt;break}else if(_[qt]===null){_[qt]=Dt,Nt=qt;break}if(Nt===-1)break}const wt=M[Nt];wt&&wt.connect(Dt)}}function Q(j,ft){ft===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ft.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ft=j.near,Dt=j.far;d.texture!==null&&(d.depthNear>0&&(ft=d.depthNear),d.depthFar>0&&(Dt=d.depthFar)),B.near=C.near=P.near=ft,B.far=C.far=P.far=Dt,(I!==B.near||k!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),I=B.near,k=B.far),B.layers.mask=j.layers.mask|6,P.layers.mask=B.layers.mask&-5,C.layers.mask=B.layers.mask&-3;const Nt=j.parent,wt=B.cameras;Q(B,Nt);for(let qt=0;qt<wt.length;qt++)Q(wt[qt],Nt);B.projectionMatrix.copy(P.projectionMatrix),B.projectionMatrixInverse.copy(P.projectionMatrixInverse),R===null&&j.isPerspectiveCamera&&(R={camera:j,fov:j.fov,zoom:j.zoom}),z(j,B,Nt)};function z(j,ft,Dt){Dt===null?j.matrix.copy(ft.matrixWorld):(j.matrix.copy(Dt.matrixWorld),j.matrix.invert(),j.matrix.multiply(ft.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ft.projectionMatrix),j.projectionMatrixInverse.copy(ft.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ir*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(B)},this.getCameraTexture=function(j){return m[j]};let nt=null;function pt(j,ft){if(p=ft.getViewerPose(l||o),x=ft,p!==null){const Dt=p.views;f!==null&&(t.setRenderTargetFramebuffer(T,f.framebuffer),t.setRenderTarget(T));let Nt=!1;Dt.length!==B.cameras.length&&(B.cameras.length=0,Nt=!0);for(let Wt=0;Wt<Dt.length;Wt++){const Vt=Dt[Wt];let Qt=null;if(f!==null)Qt=f.getViewport(Vt);else{const Et=g.getViewSubImage(u,Vt);Qt=Et.viewport,Wt===0&&(t.setRenderTargetTextures(T,Et.colorTexture,Et.depthStencilTexture),t.setRenderTarget(T))}let ee=L[Wt];ee===void 0&&(ee=new Cn,ee.layers.enable(Wt),ee.viewport=new Oe,L[Wt]=ee),ee.matrix.fromArray(Vt.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Vt.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Wt===0&&(B.matrix.copy(ee.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Nt===!0&&B.cameras.push(ee)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){g=n.getBinding();const Wt=g.getDepthInformation(Dt[0]);Wt&&Wt.isValid&&Wt.texture&&d.init(Wt,s.renderState)}if(wt&&wt.includes("camera-access")&&S){t.state.unbindTexture(),g=n.getBinding();for(let Wt=0;Wt<Dt.length;Wt++){const Vt=Dt[Wt].camera;if(Vt){let Qt=m[Vt];Qt||(Qt=new xl,m[Vt]=Qt);const ee=g.getCameraImage(Vt);Qt.sourceTexture=ee}}}}for(let Dt=0;Dt<M.length;Dt++){const Nt=_[Dt],wt=M[Dt];Nt!==null&&wt!==void 0&&wt.update(Nt,ft,l||o)}nt&&nt(j,ft),ft.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ft}),x=null}const Rt=new Jh;Rt.setAnimationLoop(pt),this.setAnimationLoop=function(j){nt=j},this.dispose=function(){}}}const og=new de,au=new te;au.set(-1,0,0,0,1,0,0,0,1);function ag(i,t){function e(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function n(d,m){m.color.getRGB(d.fogColor.value,Gh(i)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,y,E,T){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(d,m):m.isMeshLambertMaterial?(r(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(d,m),g(d,m)):m.isMeshPhongMaterial?(r(d,m),p(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(d,m),u(d,m),m.isMeshPhysicalMaterial&&f(d,m,T)):m.isMeshMatcapMaterial?(r(d,m),x(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),S(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(o(d,m),m.isLineDashedMaterial&&a(d,m)):m.isPointsMaterial?c(d,m,y,E):m.isSpriteMaterial?l(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,e(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===dn&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,e(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===dn&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,e(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,e(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const y=t.get(m),E=y.envMap,T=y.envMapRotation;E&&(d.envMap.value=E,d.envMapRotation.value.setFromMatrix4(og.makeRotationFromEuler(T)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(au),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,d.aoMapTransform))}function o(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform))}function a(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function c(d,m,y,E){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*y,d.scale.value=E*.5,m.map&&(d.map.value=m.map,e(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function l(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function p(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function g(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function u(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function f(d,m,y){d.ior.value=m.ior,m.diffuseRoughness>0&&(d.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(d.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,d.diffuseRoughnessMapTransform))),m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===dn&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.retroreflectivity>0&&(d.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,d.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,d.specularIntensityMapTransform))}function x(d,m){m.matcap&&(d.matcap.value=m.matcap)}function S(d,m){const y=t.get(m).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lg(i,t,e,n){let s={},r={};function o(y,E){const T=E.program;n.uniformBlockBinding(y,T,s[y.id])}function a(y,E){let T=s[y.id];T===void 0&&(x(y),T=c(y),s[y.id]=T,y.addEventListener("dispose",d));const M=E.program;n.updateUBOMapping(y,M);const _=t.render.frame;r[y.id]!==_&&(l(y),r[y.id]=_)}function c(y){const E=i.createBuffer(),T=y.__size,M=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(y){const E=s[y.id],T=y.uniforms,M=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let _=0,h=T.length;_<h;_++){const v=T[_];if(Array.isArray(v))for(let R=0,P=v.length;R<P;R++)p(v[R],_,R,M);else p(v,_,0,M)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,E,T,M){if(u(y,E,T,M)===!0){const _=y.__offset,h=y.value;if(Array.isArray(h)){let v=0;for(let R=0;R<h.length;R++){const P=h[R],C=S(P,!0);g(P,y.__data,v),v+=C.storage/Float32Array.BYTES_PER_ELEMENT}}else g(h,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function g(y,E,T){typeof y=="number"||typeof y=="boolean"?E[T]=y:y.isMatrix3?(E[T]=y.elements[0],E[T+1]=y.elements[1],E[T+2]=y.elements[2],E[T+3]=0,E[T+4]=y.elements[3],E[T+5]=y.elements[4],E[T+6]=y.elements[5],E[T+7]=0,E[T+8]=y.elements[6],E[T+9]=y.elements[7],E[T+10]=y.elements[8],E[T+11]=0):ArrayBuffer.isView(y)?E.set(y.subarray(0,E.length-T),T):y.toArray(E,T)}function u(y,E,T,M){const _=y.value,h=E+"_"+T;if(Array.isArray(_)){M[h]===void 0&&(M[h]=[]);const v=M[h];let R=!1;for(let P=0;P<_.length;P++)f(_[P],v,P)===!0&&(R=!0);return R}return f(_,M,h)}function f(y,E,T){if(E[T]===void 0)return typeof y=="number"||typeof y=="boolean"?E[T]=y:ArrayBuffer.isView(y)?E[T]=y.slice():E[T]=y.clone(),!0;{const M=E[T];if(typeof y=="number"||typeof y=="boolean"){if(M!==y)return E[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(M.equals(y)===!1)return M.copy(y),!0}}return!1}function x(y){const E=y.uniforms;let T=0;const M=16;for(let h=0,v=E.length;h<v;h++){const R=Array.isArray(E[h])?E[h]:[E[h]];for(let P=0,C=R.length;P<C;P++){const L=R[P],B=Array.isArray(L.value)?L.value:[L.value],I=Array.isArray(E[h])||Array.isArray(L.value);let k=T;for(let q=0,at=B.length;q<at;q++){const Q=B[q],z=S(Q,I),nt=T%M,pt=nt%z.boundary,Rt=nt+pt;T+=pt,Rt!==0&&M-Rt<z.storage&&(T+=M-Rt),q===0&&(k=T),T+=z.storage}const V=L.type==="int"?Int32Array:L.type==="uint"?Uint32Array:Float32Array;L.__data=new V((T-k)/Float32Array.BYTES_PER_ELEMENT),L.__offset=k}}const _=T%M;return _>0&&(T+=M-_),y.__size=T,y.__cache={},this}function S(y,E){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=16,T.storage=48):y.isMatrix4?(T.boundary=16,T.storage=64):y.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",y),E===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function d(y){const E=y.target;E.removeEventListener("dispose",d),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:o,update:a,dispose:m}}const cg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let qn=null;function hg(){return qn===null&&(qn=new fl(cg,16,16,Ci,Hn),qn.name="DFG_LUT",qn.minFilter=fn,qn.magFilter=fn,qn.wrapS=ti,qn.wrapT=ti,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}class lu{constructor(t={}){const{canvas:e=vh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:u=!1,outputBufferType:f=_n}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const S=f,d=new Set([Ho,ko,Go]),m=new Set([_n,kn,vs,Zi,Oo,Bo]),y=new Uint32Array(4),E=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]};let M=null,_=null;const h=[],v=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ei,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,L=null,B=null,I=null,k=null;this._outputColorSpace=un;let V=0,q=0,at=null,Q=-1,z=null;const nt=new Oe,pt=new Oe;let Rt=null;const j=new ne(0);let ft=0,Dt=e.width,Nt=e.height,wt=1,qt=null,Le=null;const Wt=new Oe(0,0,Dt,Nt),Vt=new Oe(0,0,Dt,Nt);let Qt=!1;const ee=new Ss,Et=new Yo;let Xt=!1,se=!1;const Jt=new de,me=new F,Me=new Oe,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function Ge(){return at===null?wt:1}let H=n;function ae(A,G){return e.getContext(A,G)}let Se,ye,bt,Pe,zt,Tt,N,w,Y,ht,lt,St,dt,rt,ot,ut,O,st,it,yt,mt,xt,Ut;try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:p,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${No}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",$t,!1),e.addEventListener("webglcontextcreationerror",Ct,!1),H===null){const G="webgl2";if(H=ae(G,A),H===null)throw ae(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Mt()}catch(A){throw e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),xe("WebGLRenderer: "+A.message),A}function Mt(){Se=new mm(H),Se.init(),mt=new ou(H,Se),ye=new sm(H,Se,t,mt),bt=new tg(H,Se),ye.reversedDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),B=H.createFramebuffer(),I=H.createFramebuffer(),k=H.createFramebuffer(),Pe=new xm(H),zt=new G0,Tt=new eg(H,Se,bt,zt,ye,mt,Pe),N=new pm(P),w=new Mf(H),xt=new nm(H,w),Y=new gm(H,w,Pe,xt),ht=new Mm(H,Y,w,xt,Pe),st=new vm(H,ye,Tt),ot=new rm(zt),lt=new z0(P,N,Se,ye,xt,ot),St=new ag(P,zt),dt=new H0,rt=new Z0(Se),O=new em(P,N,bt,ht,x,c),ut=new j0(P,ht,ye),Ut=new lg(H,Pe,ye,bt),it=new im(H,Se,Pe),yt=new _m(H,Se,Pe),Pe.programs=lt.programs,P.capabilities=ye,P.extensions=Se,P.properties=zt,P.renderLists=dt,P.shadowMap=ut,P.state=bt,P.info=Pe}S!==_n&&(R=new ym(S,e.width,e.height,a,s,r));const ct=new rg(P,H);this.xr=ct,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=Se.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Se.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return wt},this.setPixelRatio=function(A){A!==void 0&&(wt=A,this.setSize(Dt,Nt,!1))},this.getSize=function(A){return A.set(Dt,Nt)},this.setSize=function(A,G,et=!0){if(ct.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}Dt=A,Nt=G,e.width=Math.floor(A*wt),e.height=Math.floor(G*wt),et===!0&&(e.style.width=A+"px",e.style.height=G+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(Dt*wt,Nt*wt).floor()},this.setDrawingBufferSize=function(A,G,et){Dt=A,Nt=G,wt=et,e.width=Math.floor(A*et),e.height=Math.floor(G*et),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(S===_n){xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(nt)},this.getViewport=function(A){return A.copy(Wt)},this.setViewport=function(A,G,et,K){A.isVector4?Wt.set(A.x,A.y,A.z,A.w):Wt.set(A,G,et,K),bt.viewport(nt.copy(Wt).multiplyScalar(Ge()).round())},this.getScissor=function(A){return A.copy(Vt)},this.setScissor=function(A,G,et,K){A.isVector4?Vt.set(A.x,A.y,A.z,A.w):Vt.set(A,G,et,K),bt.scissor(pt.copy(Vt).multiplyScalar(Ge()).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(A){bt.setScissorTest(Qt=A)},this.setOpaqueSort=function(A){qt=A},this.setTransparentSort=function(A){Le=A},this.getClearColor=function(A){return A.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,et=!0){let K=0;if(A){let $=!1;if(at!==null){const At=at.texture.format;$=d.has(At)}if($){const At=at.texture.type,Bt=m.has(At),vt=O.getClearColor(),Lt=O.getClearAlpha(),Ht=vt.r,jt=vt.g,le=vt.b;Bt?(y[0]=Ht,y[1]=jt,y[2]=le,y[3]=Lt,H.clearBufferuiv(H.COLOR,0,y)):(E[0]=Ht,E[1]=jt,E[2]=le,E[3]=Lt,H.clearBufferiv(H.COLOR,0,E))}else K|=H.COLOR_BUFFER_BIT}G&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),et&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),L=A},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),O.dispose(),dt.dispose(),rt.dispose(),Tt.dispose(),zt.dispose(),N.dispose(),ht.dispose(),Y.dispose(),xt.dispose(),Ut.dispose(),lt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Wn),ct.removeEventListener("sessionend",Ji),bn.stop()};function gt(A){A.preventDefault(),Ia("WebGLRenderer: Context Lost."),C=!0}function $t(){Ia("WebGLRenderer: Context Restored."),C=!1;const A=Pe.autoReset,G=ut.enabled,et=ut.autoUpdate,K=ut.needsUpdate,$=ut.type;Mt(),Pe.autoReset=A,ut.enabled=G,ut.autoUpdate=et,ut.needsUpdate=K,ut.type=$}function Ct(A){xe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ue(A){const G=A.target;G.removeEventListener("dispose",ue),ke(G)}function ke(A){De(A),zt.remove(A)}function De(A){const G=zt.get(A).programs;G!==void 0&&(G.forEach(function(et){lt.releaseProgram(et)}),A.isShaderMaterial&&lt.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,et,K,$,At){G===null&&(G=Fe);const Bt=$.isMesh&&$.matrixWorld.determinantAffine()<0,vt=Tn(A,G,et,K,$);bt.setMaterial(K,Bt);let Lt=et.index,Ht=1;if(K.wireframe===!0){if(Lt=Y.getWireframeAttribute(et),Lt===void 0)return;Ht=2}const jt=et.drawRange,le=et.attributes.position;let Gt=jt.start*Ht,ce=(jt.start+jt.count)*Ht;At!==null&&(Gt=Math.max(Gt,At.start*Ht),ce=Math.min(ce,(At.start+At.count)*Ht)),Lt!==null?(Gt=Math.max(Gt,0),ce=Math.min(ce,Lt.count)):le!=null&&(Gt=Math.max(Gt,0),ce=Math.min(ce,le.count));const ze=ce-Gt;if(ze<0||ze===1/0)return;xt.setup($,K,vt,et,Lt);let Ce,Te=it;if(Lt!==null&&(Ce=w.get(Lt),Te=yt,Te.setIndex(Ce)),$.isMesh)K.wireframe===!0?(bt.setLineWidth(K.wireframeLinewidth*Ge()),Te.setMode(H.LINES)):Te.setMode(H.TRIANGLES);else if($.isLine){let qe=K.linewidth;qe===void 0&&(qe=1),bt.setLineWidth(qe*Ge()),$.isLineSegments?Te.setMode(H.LINES):$.isLineLoop?Te.setMode(H.LINE_LOOP):Te.setMode(H.LINE_STRIP)}else $.isPoints?Te.setMode(H.POINTS):$.isSprite&&Te.setMode(H.TRIANGLES);if($.isBatchedMesh)if(Se.get("WEBGL_multi_draw"))Te.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const qe=$._multiDrawStarts,kt=$._multiDrawCounts,b=$._multiDrawCount,D=Lt?w.get(Lt).bytesPerElement:1,U=zt.get(K).currentProgram.getUniforms();for(let W=0;W<b;W++)U.setValue(H,"_gl_DrawID",W),Te.render(qe[W]/D,kt[W])}else if($.isInstancedMesh)Te.renderInstances(Gt,ze,$.count);else if(et.isInstancedBufferGeometry){const qe=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,kt=Math.min(et.instanceCount,qe);Te.renderInstances(Gt,ze,kt)}else Te.render(Gt,ze)};function Re(A,G,et,K){L!==null&&A.isNodeMaterial&&L.setObject(K,A),Xt===!0&&ot.setState(A,et,!1),A.transparent===!0&&A.side===ln&&A.forceSinglePass===!1?(A.side=dn,A.needsUpdate=!0,Mi(A,G,K),A.side=Ri,A.needsUpdate=!0,Mi(A,G,K),A.side=ln):Mi(A,G,K)}this.compile=function(A,G,et=null){et===null&&(et=A),L!==null&&L.renderStart(A,G,et),_=rt.get(et),_.init(G),v.push(_),et.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(_.pushLight($),$.castShadow&&_.pushShadow($))}),A!==et&&A.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(_.pushLight($),$.castShadow&&_.pushShadow($))}),_.setupLights(),L!==null&&L.updateLights(_.state.lightsArray),se=this.localClippingEnabled,Xt=ot.init(this.clippingPlanes,se),Xt===!0&&ot.setGlobalState(this.clippingPlanes,G),L!==null&&ut.render(_.state.shadowsArray,et,G);const K=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const At=$.material;if(At)if(Array.isArray(At))for(let Bt=0;Bt<At.length;Bt++){const vt=At[Bt];Re(vt,et,G,$),K.add(vt)}else Re(At,et,G,$),K.add(At)}),_=v.pop(),L!==null&&L.renderEnd(),K},this.compileAsync=function(A,G,et=null){const K=this.compile(A,G,et);return new Promise($=>{function At(){if(K.forEach(function(Bt){const Lt=zt.get(Bt).currentProgram;(Lt===void 0||Lt.isReady())&&K.delete(Bt)}),K.size===0){$(A);return}setTimeout(At,10)}Se.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let Ee=null;function si(A){Ee&&Ee(A)}function Wn(){bn.stop()}function Ji(){bn.start()}const bn=new Jh;bn.setAnimationLoop(si),typeof self<"u"&&bn.setContext(self),this.setAnimationLoop=function(A){Ee=A,ct.setAnimationLoop(A),A===null?bn.stop():bn.start()},ct.addEventListener("sessionstart",Wn),ct.addEventListener("sessionend",Ji),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;L!==null&&L.renderStart(A,G);const et=ct.enabled===!0&&ct.isPresenting===!0,K=R!==null&&(at===null||et)&&R.begin(P,at);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(G),G=ct.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,G,at),_=rt.get(A,v.length),_.init(G),_.state.textureUnits=Tt.getTextureUnits(),v.push(_),Jt.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?Et.setFromArrayCamera(G):ee.setFromProjectionMatrix(Jt,Ln,G.reversedDepth),se=this.localClippingEnabled,Xt=ot.init(this.clippingPlanes,se),M=dt.get(A,h.length),M.init(),h.push(M),this.info.render.frame++,ct.enabled===!0&&ct.isPresenting===!0){const Bt=P.xr.getDepthSensingMesh();Bt!==null&&vi(Bt,G,-1/0,P.sortObjects)}vi(A,G,0,P.sortObjects),M.finish(),L!==null&&L.updateLights(_.state.lightsArray),P.sortObjects===!0&&M.sort(qt,Le),ge=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ge&&O.addToRenderList(M,A),this.info.autoReset===!0&&this.info.reset(),Xt===!0&&ot.beginShadows();const $=_.state.shadowsArray;if(ut.render($,A,G),Xt===!0&&ot.endShadows(),(K&&R.hasRenderPass())===!1){const Bt=M.opaque,vt=M.transmissive;if(_.setupLights(),G.isArrayCamera){const Lt=G.cameras;if(vt.length>0)for(let Ht=0,jt=Lt.length;Ht<jt;Ht++){const le=Lt[Ht];Rs(Bt,vt,A,le)}ge&&O.render(A);for(let Ht=0,jt=Lt.length;Ht<jt;Ht++){const le=Lt[Ht];ws(M,A,le,le.viewport)}}else vt.length>0&&Rs(Bt,vt,A,G),ge&&O.render(A),ws(M,A,G)}at!==null&&q===0&&(Tt.updateMultisampleRenderTarget(at),Tt.updateRenderTargetMipmap(at)),K&&R.end(P),A.isScene===!0&&A.onAfterRender(P,A,G),xt.resetDefaultState(),Q=-1,z=null,v.pop(),v.length>0?(_=v[v.length-1],Tt.setTextureUnits(_.state.textureUnits),Xt===!0&&ot.setGlobalState(P.clippingPlanes,_.state.camera)):_=null,h.pop(),h.length>0?M=h[h.length-1]:M=null,L!==null&&L.renderEnd()};function vi(A,G,et,K){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)et=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){const Bt=G.isArrayCamera?Et:ee;if(!A.frustumCulled||A.intersectsFrustum(Bt)){K&&Me.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Jt);const vt=ht.update(A),Lt=A.material;Lt.visible&&M.push(A,vt,Lt,et,Me.z,null,G)}}else if(A.isMesh||A.isLine||A.isPoints){const Bt=G.isArrayCamera?Et:ee;if(!A.frustumCulled||A.intersectsFrustum(Bt)){const vt=ht.update(A),Lt=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Me.copy(A.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Me.copy(vt.boundingSphere.center)),Me.applyMatrix4(A.matrixWorld).applyMatrix4(Jt)),Array.isArray(Lt)){const Ht=vt.groups;for(let jt=0,le=Ht.length;jt<le;jt++){const Gt=Ht[jt],ce=Lt[Gt.materialIndex];ce&&ce.visible&&M.push(A,vt,ce,et,Me.z,Gt,G)}}else Lt.visible&&M.push(A,vt,Lt,et,Me.z,null,G)}}}const At=A.children;for(let Bt=0,vt=At.length;Bt<vt;Bt++)vi(At[Bt],G,et,K)}function ws(A,G,et,K){const{opaque:$,transmissive:At,transparent:Bt}=A;_.setupLightsView(et),Xt===!0&&ot.setGlobalState(P.clippingPlanes,et),K&&bt.viewport(nt.copy(K)),$.length>0&&En($,G,et),At.length>0&&En(At,G,et),Bt.length>0&&En(Bt,G,et),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Rs(A,G,et,K){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[K.id]===void 0){const Gt=Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[K.id]=new Gn(1,1,{generateMipmaps:!0,type:Gt?Hn:_n,minFilter:fi,samples:Math.max(4,ye.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:fe.workingColorSpace})}const At=_.state.transmissionRenderTarget[K.id],Bt=K.viewport||nt;At.setSize(Bt.z*P.transmissionResolutionScale,Bt.w*P.transmissionResolutionScale);const vt=P.getRenderTarget(),Lt=P.getActiveCubeFace(),Ht=P.getActiveMipmapLevel();P.setRenderTarget(At),P.getClearColor(j),ft=P.getClearAlpha(),ft<1&&P.setClearColor(16777215,.5),P.clear(),ge&&O.render(et);const jt=P.toneMapping;P.toneMapping=ei;const le=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),_.setupLightsView(K),Xt===!0&&ot.setGlobalState(P.clippingPlanes,K),En(A,et,K),Tt.updateMultisampleRenderTarget(At),Tt.updateRenderTargetMipmap(At),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let ce=0,ze=G.length;ce<ze;ce++){const Ce=G[ce],{object:Te,geometry:qe,material:kt,group:b}=Ce;if(kt.side===ln&&Te.layers.test(K.layers)){const D=kt.side;kt.side=dn,kt.needsUpdate=!0,Nn(Te,et,K,qe,kt,b),kt.side=D,kt.needsUpdate=!0,Gt=!0}}Gt===!0&&(Tt.updateMultisampleRenderTarget(At),Tt.updateRenderTargetMipmap(At))}P.setRenderTarget(vt,Lt,Ht),P.setClearColor(j,ft),le!==void 0&&(K.viewport=le),P.toneMapping=jt}function En(A,G,et){const K=G.isScene===!0?G.overrideMaterial:null;for(let $=0,At=A.length;$<At;$++){const Bt=A[$],{object:vt,geometry:Lt,group:Ht}=Bt;let jt=Bt.material;jt.allowOverride===!0&&K!==null&&(jt=K),vt.layers.test(et.layers)&&Nn(vt,G,et,Lt,jt,Ht)}}function Nn(A,G,et,K,$,At){L!==null&&$.isNodeMaterial&&L.setObject(A,$),A.onBeforeRender(P,G,et,K,$,At),A.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(P,G,et,K,A,At),$.transparent===!0&&$.side===ln&&$.forceSinglePass===!1?($.side=dn,$.needsUpdate=!0,P.renderBufferDirect(et,G,K,$,A,At),$.side=Ri,$.needsUpdate=!0,P.renderBufferDirect(et,G,K,$,A,At),$.side=ln):P.renderBufferDirect(et,G,K,$,A,At),A.onAfterRender(P,G,et,K,$,At)}function Cs(A){let G=0;for(const et of A)et.texture!==null&&G++;return G}function Mi(A,G,et){G.isScene!==!0&&(G=Fe);const K=zt.get(A),$=_.state.lights,At=_.state.shadowsArray,Bt=$.state.version,vt=lt.getParameters(A,$.state,At,G,et,_.state.lightProbeGridArray),Lt=lt.getProgramCacheKey(vt);let Ht=K.programs;K.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?G.environment:null,K.fog=G.fog;const jt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;K.envMap=N.get(A.envMap||K.environment,jt),K.envMapRotation=K.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ht===void 0&&(A.addEventListener("dispose",ue),Ht=new Map,K.programs=Ht,K.programVariants=new Map);let le=Ht.get(Lt);if(le!==void 0){if(K.currentProgram===le&&K.lightsStateVersion===Bt)return Be(A,vt),le}else vt.uniforms=lt.getUniforms(A),L!==null&&A.isNodeMaterial&&L.build(A,et,vt),A.onBeforeCompile(vt,P),le=lt.acquireProgram(vt,Lt),Ht.set(Lt,le),K.uniforms=vt.uniforms;const Gt=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Gt.clippingPlanes=ot.uniform),Be(A,vt),K.needsLights=jo(A),K.lightsStateVersion=Bt,K.needsLights&&(Gt.ambientLightColor.value=$.state.ambient,Gt.lightProbe.value=$.state.probe,Gt.sunLights.value=$.state.sun,Gt.sunLightShadows.value=$.state.sunShadow,Gt.directionalLights.value=$.state.directional,Gt.directionalLightShadows.value=$.state.directionalShadow,Gt.spotLights.value=$.state.spot,Gt.spotLightShadows.value=$.state.spotShadow,Gt.rectAreaLights.value=$.state.rectArea,Gt.ltc_1.value=$.state.rectAreaLTC1,Gt.ltc_2.value=$.state.rectAreaLTC2,Gt.pointLights.value=$.state.point,Gt.pointLightShadows.value=$.state.pointShadow,Gt.hemisphereLights.value=$.state.hemi,Gt.sunShadowMatrix.value=$.state.sunShadowMatrix,Gt.sunShadowCascade.value=$.state.sunShadowCascade,Gt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Gt.spotLightMatrix.value=$.state.spotLightMatrix,Gt.spotLightMap.value=$.state.spotLightMap,Gt.pointShadowMatrix.value=$.state.pointShadowMatrix),K.numLightProbeGrids=Cs(_.state.lightProbeGridArray),K.currentProgram=le,K.uniformsList=null,le}function Ie(A,G,et,K,$){const At=zt.get(A),Bt=At.currentProgram.id+","+K+","+$;let vt=At.programVariants.get(Bt);return vt===void 0?(vt=Mi(A,G,et),At.programVariants.set(Bt,vt)):(At.currentProgram=vt,At.uniformsList=null,At.outputColorSpace=K,At.toneMapping=$),vt}function Ve(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=Gr.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Be(A,G){const et=zt.get(A);et.outputColorSpace=G.outputColorSpace,et.batching=G.batching,et.batchingColor=G.batchingColor,et.instancing=G.instancing,et.instancingColor=G.instancingColor,et.instancingMorph=G.instancingMorph,et.skinning=G.skinning,et.morphTargets=G.morphTargets,et.morphNormals=G.morphNormals,et.morphColors=G.morphColors,et.morphTargetsCount=G.morphTargetsCount,et.numClippingPlanes=G.numClippingPlanes,et.numIntersection=G.numClipIntersection,et.vertexAlphas=G.vertexAlphas,et.vertexTangents=G.vertexTangents,et.toneMapping=G.toneMapping}function Tn(A,G,et,K,$){G.isScene!==!0&&(G=Fe),Tt.resetTextureUnits();const At=G.fog,Bt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?G.environment:null,vt=at===null?P.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:fe.workingColorSpace,Lt=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ht=N.get(K.envMap||Bt,Lt),jt=K.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,le=!!et.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Gt=!!et.morphAttributes.position,ce=!!et.morphAttributes.normal,ze=!!et.morphAttributes.color;let Ce=ei;K.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Ce=P.toneMapping);const Te=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,qe=Te!==void 0?Te.length:0,kt=zt.get(K),b=_.state.lights;if(Xt===!0&&(se===!0||A!==z)){const Zt=A===z&&K.id===Q;ot.setState(K,A,Zt)}let D=!1,U=!1;K.version===kt.__version?kt.needsLights&&kt.lightsStateVersion!==b.state.version||$.isBatchedMesh&&kt.batching===!1||!$.isBatchedMesh&&kt.batching===!0||$.isBatchedMesh&&kt.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&kt.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&kt.instancing===!1||!$.isInstancedMesh&&kt.instancing===!0||$.isSkinnedMesh&&kt.skinning===!1||!$.isSkinnedMesh&&kt.skinning===!0||$.isInstancedMesh&&kt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&kt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&kt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&kt.instancingMorph===!1&&$.morphTexture!==null||kt.envMap!==Ht||K.fog===!0&&kt.fog!==At||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==ot.numPlanes||kt.numIntersection!==ot.numIntersection)||kt.vertexAlphas!==jt||kt.vertexTangents!==le||kt.morphTargets!==Gt||kt.morphNormals!==ce||kt.morphColors!==ze||kt.morphTargetsCount!==qe||kt.numLightProbeGrids!==Cs(_.state.lightProbeGridArray)?D=!0:(kt.outputColorSpace!==vt||kt.toneMapping!==Ce)&&(U=!0):(D=!0,kt.__version=K.version);let W=kt.currentProgram;(D===!0||U===!0)&&(W=U===!0?Ie(K,G,$,vt,Ce):Mi(K,G,$),L&&K.isNodeMaterial&&L.onUpdateProgram(K,W,kt));let X=!1,_t=!1,Ft=!1;const Z=W.getUniforms(),Pt=kt.uniforms;if(bt.useProgram(W.program)&&(X=!0,_t=!0,Ft=!0),K.id!==Q&&(Q=K.id,_t=!0),X||z!==A){bt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Z.setValue(H,"projectionMatrix",A.projectionMatrix),Z.setValue(H,"viewMatrix",A.matrixWorldInverse);const tt=Z.map.cameraPosition;tt!==void 0&&tt.setValue(H,me.setFromMatrixPosition(A.matrixWorld)),ye.logarithmicDepthBuffer&&Z.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Z.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,_t=!0,Ft=!0)}if(kt.needsLights&&(b.state.sunShadowMap.length>0&&Z.setValue(H,"sunShadowMap",b.state.sunShadowMap,Tt),b.state.directionalShadowMap.length>0&&Z.setValue(H,"directionalShadowMap",b.state.directionalShadowMap,Tt),b.state.spotShadowMap.length>0&&Z.setValue(H,"spotShadowMap",b.state.spotShadowMap,Tt),b.state.pointShadowMap.length>0&&Z.setValue(H,"pointShadowMap",b.state.pointShadowMap,Tt)),$.isSkinnedMesh){Z.setOptional(H,$,"bindMatrix"),Z.setOptional(H,$,"bindMatrixInverse");const Zt=$.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),Z.setValue(H,"boneTexture",Zt.boneTexture,Tt))}$.isBatchedMesh&&(Z.setOptional(H,$,"batchingTexture"),Z.setValue(H,"batchingTexture",$._matricesTexture,Tt),Z.setOptional(H,$,"batchingIdTexture"),Z.setValue(H,"batchingIdTexture",$._indirectTexture,Tt),Z.setOptional(H,$,"batchingColorTexture"),$._colorsTexture!==null&&Z.setValue(H,"batchingColorTexture",$._colorsTexture,Tt));const re=et.morphAttributes;if((re.position!==void 0||re.normal!==void 0||re.color!==void 0)&&st.update($,et,W),(_t||kt.receiveShadow!==$.receiveShadow)&&(kt.receiveShadow=$.receiveShadow,Z.setValue(H,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&G.environment!==null&&(Pt.envMapIntensity.value=G.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=hg()),_t){if(Z.setValue(H,"toneMappingExposure",P.toneMappingExposure),kt.needsLights&&Xn(Pt,Ft),At&&K.fog===!0&&St.refreshFogUniforms(Pt,At),St.refreshMaterialUniforms(Pt,K,wt,Nt,_.state.transmissionRenderTarget[A.id]),kt.needsLights&&kt.numLightProbeGrids>0){const Zt=T;let tt=0;for(const J of _.state.lightProbeGridArray)J.texture!==null&&(Zt.textures[tt]=J.texture,Zt.min[tt]=J.boundingBox.min,Zt.max[tt]=J.boundingBox.max,Zt.resolution[tt]=J.resolution,tt++);for(const J in Zt)Zt[J].length=tt;Pt.probesSH.value=Zt.textures,Pt.probesMin.value=Zt.min,Pt.probesMax.value=Zt.max,Pt.probesResolution.value=Zt.resolution}Gr.upload(H,Ve(kt),Pt,Tt)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Gr.upload(H,Ve(kt),Pt,Tt),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Z.setValue(H,"center",$.center),Z.setValue(H,"modelViewMatrix",$.modelViewMatrix),Z.setValue(H,"normalMatrix",$.normalMatrix),Z.setValue(H,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const Zt=K.uniformsGroups;for(let tt=0,J=Zt.length;tt<J;tt++){const Ue=Zt[tt];Ut.update(Ue,W),Ut.bind(Ue,W)}}return W}function Xn(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.sunLights.needsUpdate=G,A.sunLightShadows.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function jo(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(A,G,et){const K=zt.get(A);K.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),zt.get(A.texture).__webglTexture=G,zt.get(A.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:et,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const et=zt.get(A);et.__webglFramebuffer=G,et.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,et=0){at=A,V=G,q=et;let K=null,$=!1,At=!1;if(A){const vt=zt.get(A);if(vt.__useDefaultFramebuffer!==void 0){bt.bindFramebuffer(H.FRAMEBUFFER,vt.__webglFramebuffer),nt.copy(A.viewport),pt.copy(A.scissor),Rt=A.scissorTest,bt.viewport(nt),bt.scissor(pt),bt.setScissorTest(Rt),Q=-1;return}else if(vt.__webglFramebuffer===void 0)Tt.setupRenderTarget(A);else if(vt.__hasExternalTextures)Tt.rebindTextures(A,zt.get(A.texture).__webglTexture,zt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const jt=A.depthTexture;if(vt.__boundDepthTexture!==jt){if(jt!==null&&zt.has(jt)&&(A.width!==jt.image.width||A.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Tt.setupDepthRenderbuffer(A)}}const Lt=A.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(At=!0);const Ht=zt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ht[G])?K=Ht[G][et]:K=Ht[G],$=!0):A.samples>0&&Tt.useMultisampledRTT(A)===!1?K=zt.get(A).__webglMultisampledFramebuffer:Array.isArray(Ht)?K=Ht[et]:K=Ht,nt.copy(A.viewport),pt.copy(A.scissor),Rt=A.scissorTest}else nt.copy(Wt).multiplyScalar(wt).floor(),pt.copy(Vt).multiplyScalar(wt).floor(),Rt=Qt;if(et!==0&&(K=B),bt.bindFramebuffer(H.FRAMEBUFFER,K)&&bt.drawBuffers(A,K),bt.viewport(nt),bt.scissor(pt),bt.setScissorTest(Rt),$){const vt=zt.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,vt.__webglTexture,et)}else if(At){const vt=G;for(let Lt=0;Lt<A.textures.length;Lt++){const Ht=zt.get(A.textures[Lt]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Lt,Ht.__webglTexture,et,vt)}}else if(A!==null&&et!==0){const vt=zt.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,vt.__webglTexture,et)}Q=-1};function Ps(A){const G=zt.get(A);return(G.__readFormat!==A.format||G.__readType!==A.type)&&(G.__readFormat=A.format,G.__readType=A.type,G.__formatReadable=ye.textureFormatReadable(A.format),G.__typeReadable=ye.textureTypeReadable(A.type)),G}this.readRenderTargetPixels=function(A,G,et,K,$,At,Bt,vt=0){if(!(A&&A.isWebGLRenderTarget)){xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=zt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Bt!==void 0&&(Lt=Lt[Bt],Array.isArray(Lt)&&(Lt=Lt[0])),Lt){bt.bindFramebuffer(H.FRAMEBUFFER,Lt);try{const Ht=A.textures[vt],jt=Ht.format,le=Ht.type;A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+vt);const Gt=Ps(Ht);if(Gt.__formatReadable===!1){xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Gt.__typeReadable===!1){xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-K&&et>=0&&et<=A.height-$&&H.readPixels(G,et,K,$,mt.convert(jt),mt.convert(le),At)}finally{const Ht=at!==null?zt.get(at).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(A,G,et,K,$,At,Bt,vt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=zt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Bt!==void 0&&(Lt=Lt[Bt],Array.isArray(Lt)&&(Lt=Lt[0])),Lt)if(G>=0&&G<=A.width-K&&et>=0&&et<=A.height-$){bt.bindFramebuffer(H.FRAMEBUFFER,Lt);const Ht=A.textures[vt],jt=Ht.format,le=Ht.type;A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+vt);const Gt=Ps(Ht);if(Gt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Gt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ce=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,ce),H.bufferData(H.PIXEL_PACK_BUFFER,At.byteLength,H.STREAM_READ),H.readPixels(G,et,K,$,mt.convert(jt),mt.convert(le),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const ze=at!==null?zt.get(at).__webglFramebuffer:null;bt.bindFramebuffer(H.FRAMEBUFFER,ze);const Ce=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Eu(H,Ce,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,ce),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,At),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(ce),H.deleteSync(Ce),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,et=0){const K=Math.pow(2,-et),$=Math.floor(A.image.width*K),At=Math.floor(A.image.height*K),Bt=G!==null?G.x:0,vt=G!==null?G.y:0;Tt.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,et,0,0,Bt,vt,$,At),bt.unbindTexture()},this.copyTextureToTexture=function(A,G,et=null,K=null,$=0,At=0){let Bt,vt,Lt,Ht,jt,le,Gt,ce,ze;const Ce=A.isCompressedTexture?A.mipmaps[At]:A.image;if(et!==null)Bt=et.max.x-et.min.x,vt=et.max.y-et.min.y,Lt=et.isBox3?et.max.z-et.min.z:1,Ht=et.min.x,jt=et.min.y,le=et.isBox3?et.min.z:0;else{const Z=Math.pow(2,-$);Bt=Math.floor(Ce.width*Z),vt=Math.floor(Ce.height*Z),A.isDataArrayTexture?Lt=Ce.depth:A.isData3DTexture?Lt=Math.floor(Ce.depth*Z):Lt=1,Ht=0,jt=0,le=0}K!==null?(Gt=K.x,ce=K.y,ze=K.z):(Gt=0,ce=0,ze=0);const Te=mt.convert(G.format),qe=mt.convert(G.type);let kt;G.isData3DTexture?(Tt.setTexture3D(G,0),kt=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Tt.setTexture2DArray(G,0),kt=H.TEXTURE_2D_ARRAY):(Tt.setTexture2D(G,0),kt=H.TEXTURE_2D),bt.activeTexture(H.TEXTURE0),bt.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),bt.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),bt.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const b=bt.getParameter(H.UNPACK_ROW_LENGTH),D=bt.getParameter(H.UNPACK_IMAGE_HEIGHT),U=bt.getParameter(H.UNPACK_SKIP_PIXELS),W=bt.getParameter(H.UNPACK_SKIP_ROWS),X=bt.getParameter(H.UNPACK_SKIP_IMAGES);bt.pixelStorei(H.UNPACK_ROW_LENGTH,Ce.width),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ce.height),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,Ht),bt.pixelStorei(H.UNPACK_SKIP_ROWS,jt),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,le);const _t=A.isDataArrayTexture||A.isData3DTexture,Ft=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const Z=zt.get(A),Pt=zt.get(G),re=zt.get(Z.__renderTarget),Zt=zt.get(Pt.__renderTarget);bt.bindFramebuffer(H.READ_FRAMEBUFFER,re.__webglFramebuffer),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer);for(let tt=0;tt<Lt;tt++)_t&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,zt.get(A).__webglTexture,$,le+tt),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,zt.get(G).__webglTexture,At,ze+tt)),H.blitFramebuffer(Ht,jt,Ht+Bt,jt+vt,Gt,ce,Gt+Bt,ce+vt,H.DEPTH_BUFFER_BIT,H.NEAREST);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if($!==0||A.isRenderTargetTexture||zt.has(A)){const Z=zt.get(A),Pt=zt.get(G);bt.bindFramebuffer(H.READ_FRAMEBUFFER,I),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let re=0;re<Lt;re++)_t?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Z.__webglTexture,$,le+re):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Z.__webglTexture,$),Ft?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Pt.__webglTexture,At,ze+re):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Pt.__webglTexture,At),$!==0?H.blitFramebuffer(Ht,jt,Ht+Bt,jt+vt,Gt,ce,Gt+Bt,ce+vt,H.COLOR_BUFFER_BIT,H.NEAREST):Ft?H.copyTexSubImage3D(kt,At,Gt,ce,ze+re,Ht,jt,Bt,vt):H.copyTexSubImage2D(kt,At,Gt,ce,Ht,jt,Bt,vt);bt.bindFramebuffer(H.READ_FRAMEBUFFER,null),bt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Ft?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(kt,At,Gt,ce,ze,Bt,vt,Lt,Te,qe,Ce.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(kt,At,Gt,ce,ze,Bt,vt,Lt,Te,Ce.data):H.texSubImage3D(kt,At,Gt,ce,ze,Bt,vt,Lt,Te,qe,Ce):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,At,Gt,ce,Bt,vt,Te,qe,Ce.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,At,Gt,ce,Ce.width,Ce.height,Te,Ce.data):H.texSubImage2D(H.TEXTURE_2D,At,Gt,ce,Bt,vt,Te,qe,Ce);bt.pixelStorei(H.UNPACK_ROW_LENGTH,b),bt.pixelStorei(H.UNPACK_IMAGE_HEIGHT,D),bt.pixelStorei(H.UNPACK_SKIP_PIXELS,U),bt.pixelStorei(H.UNPACK_SKIP_ROWS,W),bt.pixelStorei(H.UNPACK_SKIP_IMAGES,X),At===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(kt),bt.unbindTexture()},this.initRenderTarget=function(A){zt.get(A).__webglFramebuffer===void 0&&Tt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Tt.setTextureCube(A,0):A.isData3DTexture?Tt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Tt.setTexture2DArray(A,0):Tt.setTexture2D(A,0),bt.unbindTexture()},this.resetState=function(){V=0,q=0,at=null,bt.reset(),xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}}const wa=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Uo,AddEquation:Hi,AddOperation:lh,AdditiveBlending:Qs,AgXToneMapping:Za,AlphaFormat:el,AlwaysCompare:rl,AlwaysDepth:Hr,AlwaysStencilFunc:fh,ArcCurve:Lh,ArrayCamera:qh,BackSide:dn,BasicDepthPacking:hh,Box3:Di,BoxGeometry:Ke,BufferAttribute:pn,BufferGeometry:Je,ByteType:$a,Camera:El,CanvasTexture:Fa,CatmullRomCurve3:Ih,CineonToneMapping:Ya,ClampToEdgeWrapping:ti,Color:ne,ColorManagement:fe,ConeGeometry:ni,ConstantAlphaFactor:rh,ConstantColorFactor:ih,Controls:Kh,CubeCamera:Do,CubeDepthTexture:_l,CubeReflectionMapping:qi,CubeRefractionMapping:xs,CubeTexture:gl,CubicBezierCurve:Nh,CubicBezierCurve3:Uh,CullFaceBack:Ca,CullFaceFront:kc,CullFaceNone:Gc,Curve:ii,CustomBlending:Vc,CustomToneMapping:qa,CylinderGeometry:In,Data3DTexture:Ah,DataArrayTexture:cl,DataTexture:fl,DepthFormat:gi,DepthStencilFormat:di,DepthTexture:Ki,DirectionalLight:Oa,DoubleSide:ln,DstAlphaFactor:Qc,DstColorFactor:th,DynamicDrawUsage:ol,EllipseCurve:vl,EqualCompare:mh,EqualDepth:Wr,EquirectangularReflectionMapping:Ur,EquirectangularRefractionMapping:Fr,Euler:Vn,EventDispatcher:xi,ExternalTexture:xl,Float32BufferAttribute:we,FloatType:Dn,FogExp2:Xo,FrontSide:Ri,Frustum:Ss,FrustumArray:Yo,GLSL3:La,GreaterCompare:gh,GreaterDepth:Yr,GreaterEqualCompare:sl,GreaterEqualDepth:Xr,Group:yn,HalfFloatType:Hn,HemisphereLight:Xh,IcosahedronGeometry:Zo,ImageUtils:Eh,InstancedBufferAttribute:Na,InstancedMesh:dl,IntType:Fo,KeepStencilOp:Br,Layers:Wo,LessCompare:ph,LessDepth:Vr,LessEqualCompare:il,LessEqualDepth:_s,Light:bl,LightShadow:Yh,Line:Ch,LineBasicMaterial:pl,LineCurve:Fh,LineCurve3:Oh,LineSegments:Ph,LinearFilter:fn,LinearMipmapLinearFilter:fi,LinearMipmapNearestFilter:Or,LinearSRGBColorSpace:er,LinearToneMapping:Wa,LinearTransfer:nr,MOUSE:Wi,Material:Ii,MathUtils:Yi,Matrix3:te,Matrix4:de,MaxEquation:qc,Mesh:ve,MeshBasicMaterial:Qn,MeshDepthMaterial:Vh,MeshDistanceMaterial:Wh,MeshStandardMaterial:bs,MinEquation:Yc,MirroredRepeatWrapping:Kr,MixOperation:ah,MultiplyBlending:Da,MultiplyOperation:Va,NearestFilter:en,NearestMipmapLinearFilter:Gs,NearestMipmapNearestFilter:ch,NeutralToneMapping:Ka,NeverCompare:dh,NeverDepth:kr,NoBlending:Xi,NoColorSpace:ui,NoToneMapping:ei,NormalBlending:ms,NotEqualCompare:_h,NotEqualDepth:qr,Object3D:Ye,ObjectSpaceNormalMap:uh,OneFactor:Kc,OneMinusConstantAlphaFactor:oh,OneMinusConstantColorFactor:sh,OneMinusDstAlphaFactor:jc,OneMinusDstColorFactor:eh,OneMinusSrcAlphaFactor:Ha,OneMinusSrcColorFactor:$c,OrthographicCamera:Tl,PCFShadowMap:Hs,PCFSoftShadowMap:Hc,PMREMGenerator:rr,PerspectiveCamera:Cn,Plane:$n,PlaneGeometry:_i,Points:Dh,PointsMaterial:ml,PolyhedronGeometry:qo,QuadraticBezierCurve:Bh,QuadraticBezierCurve3:Sl,Quaternion:xn,R11_EAC_Format:io,RED_GREEN_RGTC2_Format:tr,RED_RGTC1_Format:Eo,REVISION:No,RG11_EAC_Format:js,RGBAFormat:zn,RGBAIntegerFormat:Ho,RGBA_ASTC_10x10_Format:xo,RGBA_ASTC_10x5_Format:mo,RGBA_ASTC_10x6_Format:go,RGBA_ASTC_10x8_Format:_o,RGBA_ASTC_12x10_Format:vo,RGBA_ASTC_12x12_Format:Mo,RGBA_ASTC_4x4_Format:oo,RGBA_ASTC_5x4_Format:ao,RGBA_ASTC_5x5_Format:lo,RGBA_ASTC_6x5_Format:co,RGBA_ASTC_6x6_Format:ho,RGBA_ASTC_8x5_Format:uo,RGBA_ASTC_8x6_Format:fo,RGBA_ASTC_8x8_Format:po,RGBA_BPTC_Format:So,RGBA_ETC2_EAC_Format:no,RGBA_PVRTC_2BPPV1_Format:jr,RGBA_PVRTC_4BPPV1_Format:Qr,RGBA_S3TC_DXT1_Format:Ws,RGBA_S3TC_DXT3_Format:Xs,RGBA_S3TC_DXT5_Format:Ys,RGBFormat:nl,RGB_BPTC_SIGNED_Format:yo,RGB_BPTC_UNSIGNED_Format:bo,RGB_ETC1_Format:to,RGB_ETC2_Format:eo,RGB_PVRTC_2BPPV1_Format:$r,RGB_PVRTC_4BPPV1_Format:Jr,RGB_S3TC_DXT1_Format:Vs,RGFormat:Ci,RGIntegerFormat:ko,RawShaderMaterial:Hh,Ray:Ts,Raycaster:Zh,RedFormat:zo,RedIntegerFormat:Go,ReinhardToneMapping:Xa,RenderTarget:Th,RepeatWrapping:Zr,ReverseSubtractEquation:Xc,RingGeometry:sr,SIGNED_R11_EAC_Format:so,SIGNED_RED_GREEN_RGTC2_Format:Ao,SIGNED_RED_RGTC1_Format:To,SIGNED_RG11_EAC_Format:ro,SRGBColorSpace:un,SRGBTransfer:Ae,Scene:Rh,ShaderChunk:ie,ShaderLib:Bn,ShaderMaterial:Pi,ShortType:Qa,Sphere:Li,SphereGeometry:wi,Spherical:za,SplineCurve:zh,SrcAlphaFactor:ka,SrcAlphaSaturateFactor:nh,SrcColorFactor:Jc,StaticDrawUsage:xh,SubtractEquation:Wc,SubtractiveBlending:Pa,TOUCH:Vi,TangentSpaceNormalMap:wo,Texture:rn,TextureSource:Vo,TorusGeometry:mi,Triangle:Pn,TubeGeometry:yl,UVMapping:Ja,Uint16BufferAttribute:hl,Uint32BufferAttribute:ul,UniformsLib:It,UniformsUtils:kh,UnsignedByteType:_n,UnsignedInt101111Type:tl,UnsignedInt248Type:Zi,UnsignedInt5999Type:ja,UnsignedIntType:kn,UnsignedShort4444Type:Oo,UnsignedShort5551Type:Bo,UnsignedShortType:vs,VSMShadowMap:ds,Vector2:Ot,Vector3:F,Vector4:Oe,WebGLCoordinateSystem:Ln,WebGLCubeRenderTarget:Ko,WebGLRenderTarget:Gn,WebGLRenderer:lu,WebGLUtils:ou,WebGPUCoordinateSystem:Ms,WebXRController:zr,ZeroFactor:Zc,createCanvasElement:vh,error:xe,log:Ia,warn:Kt,warnOnce:qs},Symbol.toStringTag,{value:"Module"})),Uc={type:"change"},Al={type:"start"},cu={type:"end"},Ir=new Ts,Fc=new $n,ug=Math.cos(70*Yi.DEG2RAD),Ze=new F,gn=2*Math.PI,be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ra=1e-6;class fg extends Kh{constructor(t,e=null){super(t,e),this.state=be.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wi.ROTATE,MIDDLE:Wi.DOLLY,RIGHT:Wi.PAN},this.touches={ONE:Vi.ROTATE,TWO:Vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new xn,this._lastTargetPosition=new F,this._quat=new xn().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new za,this._sphericalDelta=new za,this._scale=1,this._panOffset=new F,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new F,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pg.bind(this),this._onPointerDown=dg.bind(this),this._onPointerUp=mg.bind(this),this._onContextMenu=yg.bind(this),this._onMouseWheel=xg.bind(this),this._onKeyDown=vg.bind(this),this._onTouchStart=Mg.bind(this),this._onTouchMove=Sg.bind(this),this._onMouseDown=gg.bind(this),this._onMouseMove=_g.bind(this),this._interceptControlDown=bg.bind(this),this._interceptControlUp=Eg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=be.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Uc),this.update(),this.state=be.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Ze.copy(e).sub(this.target),Ze.applyQuaternion(this._quat),this._spherical.setFromVector3(Ze),this.autoRotate&&this.state===be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=gn:n>Math.PI&&(n-=gn),s<-Math.PI?s+=gn:s>Math.PI&&(s-=gn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ze.setFromSpherical(this._spherical),Ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ze.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ir.origin.copy(this.object.position),Ir.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ir.direction))<ug?this.object.lookAt(this.target):(Fc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ir.intersectPlane(Fc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ra||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ra||this._lastTargetPosition.distanceToSquared(this.target)>Ra?(this.dispatchEvent(Uc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?gn/60*this.autoRotateSpeed*t:gn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ze.setFromMatrixColumn(e,0),Ze.multiplyScalar(-t),this._panOffset.add(Ze)}_panUp(t,e){this.screenSpacePanning===!0?Ze.setFromMatrixColumn(e,1):(Ze.setFromMatrixColumn(e,0),Ze.crossVectors(this.object.up,Ze)),Ze.multiplyScalar(t),this._panOffset.add(Ze)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ze.copy(s).sub(this.target);let r=Ze.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function dg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function pg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function mg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cu),this.state=be.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function gg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=be.DOLLY;break;case Wi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}break;case Wi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Al)}function _g(i){switch(this.state){case be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xg(i){this.enabled===!1||this.enableZoom===!1||this.state!==be.NONE||(i.preventDefault(),this.dispatchEvent(Al),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(cu))}function vg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Mg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vi.ROTATE:if(this.enableRotate===!1){this.state=be.NONE;break}this._handleTouchStartRotate(i),this.state=be.TOUCH_ROTATE;break;case Vi.PAN:if(this.enablePan===!1){this.state=be.NONE;break}this._handleTouchStartPan(i),this.state=be.TOUCH_PAN;break;default:this.state=be.NONE}break;case 2:switch(this.touches.TWO){case Vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=be.TOUCH_DOLLY_PAN;break;case Vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=be.TOUCH_DOLLY_ROTATE;break;default:this.state=be.NONE}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Al)}function Sg(i){switch(this._trackPointer(i),this.state){case be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=be.NONE}}function yg(i){this.enabled!==!1&&i.preventDefault()}function bg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Eg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const zs=new F;function Rn(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;zs.copy(t),zs[n]=0,zs.normalize();const l=.5*o/(o+a),p=1-zs.angleTo(i)/c;return Math.sign(zs[e])===1?p*l:a/(o+a)+l+l*(1-p)}class Lo extends Ke{constructor(t=1,e=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new F,l=new F,p=new F(t,e,n).divideScalar(2).subScalar(r),g=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,x=g.length/6,S=new F,d=.5/o;for(let m=0,y=0;m<g.length;m+=3,y+=2)switch(c.fromArray(g,m),l.copy(c),l.x-=Math.sign(l.x)*d,l.y-=Math.sign(l.y)*d,l.z-=Math.sign(l.z)*d,l.normalize(),g[m+0]=p.x*Math.sign(c.x)+l.x*r,g[m+1]=p.y*Math.sign(c.y)+l.y*r,g[m+2]=p.z*Math.sign(c.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/x)){case 0:S.set(1,0,0),f[y+0]=Rn(S,l,"z","y",r,n),f[y+1]=1-Rn(S,l,"y","z",r,e);break;case 1:S.set(-1,0,0),f[y+0]=1-Rn(S,l,"z","y",r,n),f[y+1]=1-Rn(S,l,"y","z",r,e);break;case 2:S.set(0,1,0),f[y+0]=1-Rn(S,l,"x","z",r,t),f[y+1]=Rn(S,l,"z","x",r,n);break;case 3:S.set(0,-1,0),f[y+0]=1-Rn(S,l,"x","z",r,t),f[y+1]=1-Rn(S,l,"z","x",r,n);break;case 4:S.set(0,0,1),f[y+0]=1-Rn(S,l,"x","y",r,t),f[y+1]=1-Rn(S,l,"y","x",r,e);break;case 5:S.set(0,0,-1),f[y+0]=Rn(S,l,"x","y",r,t),f[y+1]=1-Rn(S,l,"y","x",r,e);break}}static fromJSON(t){return new Lo(t.width,t.height,t.depth,t.segments,t.radius)}}function jn(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Je;c.morphTargetsRelative=a;let l=0;for(let p=0;p<i.length;++p){const g=i[p];let u=0,f=0;if(e!==(g.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const x in g.attributes){if(!n.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+'. All geometries must have compatible attributes; make sure "'+x+'" attribute exists among all geometries, or in none of them.'),null;r[x]===void 0&&(r[x]=[]),r[x].push(g.attributes[x]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". Make sure all geometries have the same number of attributes."),null;if(a!==g.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const x in g.morphAttributes){if(!s.has(x))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+".  .morphAttributes must be consistent throughout all geometries."),null;if(g.morphAttributes[x].length!==i[0].morphAttributes[x].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+'. All geometries must have the same number of morph targets for the "'+x+'" morph attribute.'),null;o[x]===void 0&&(o[x]=[]),o[x].push(g.morphAttributes[x]),f++}if(f!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". Make sure all geometries have the same number of morph attributes."),null;if(t){let x;if(e)x=g.index.count;else if(g.attributes.position!==void 0)x=g.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+p+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,x,p),l+=x}}if(e){let p=0;const g=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let x=0;x<f.count;++x)g.push(f.getX(x)+p);p+=i[u].attributes.position.count}c.setIndex(g)}for(const p in r){const g=Oc(r[p]);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" attribute."),null;c.setAttribute(p,g)}for(const p in o){const g=o[p][0].length;if(g!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[p]=[];for(let u=0;u<g;++u){const f=[];for(let S=0;S<o[p].length;++S)f.push(o[p][S][u]);const x=Oc(f);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+p+" morphAttribute."),null;c.morphAttributes[p].push(x)}}}return c}function Oc(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const p=i[l];if(t===void 0&&(t=p.array.constructor),t!==p.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=p.itemSize),e!==p.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=p.normalized),n!==p.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=p.gpuType),s!==p.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=p.count*e}const o=new t(r),a=new pn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const p=i[l];if(p.isInterleavedBufferAttribute){const g=c/e;for(let u=0,f=p.count;u<f;u++)for(let x=0;x<e;x++){const S=p.getComponent(u,x);a.setComponent(u+g,x,S)}}else o.set(p.array,c);c+=p.count*e}return s!==void 0&&(a.gpuType=s),a}const Tg=128,Ag=8,wg=-36.75,Rg=-28,Cg=10.5,Pg=12,Dg=[{x:0,z:-3.9,w:9.4,d:.18,top:3.6,tag:"home-back"},{x:-4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:4.6,z:0,w:.18,d:7.8,top:3.6,tag:"home-side"},{x:-2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:2.7,z:3.9,w:4,d:.18,top:3.6,tag:"home-front"},{x:0,z:3.9,w:1.3,d:.18,top:2.8,tag:"home-door"},{x:-2.05,z:-1.35,w:2.85,d:3.5,top:1.2,tag:"home-bed"},{x:-3.85,z:-2.4,w:.8,d:.75,top:1.6,tag:"home-nightstand"},{x:3.65,z:-2.78,w:1.05,d:.92,top:2.3,tag:"home-fridge"},{x:2.95,z:-.75,w:2.62,d:.95,top:1.3,tag:"home-kitchen"},{x:.95,z:-2.75,w:1.6,d:2.2,top:1.4,tag:"home-bathroom"},{x:2.8,z:2.45,w:2.8,d:1.15,top:1.4,tag:"home-sofa"},{x:1.2,z:1.4,w:1.4,d:.8,top:.9,tag:"home-table"},{x:-.05,z:1.2,w:.2,d:1.8,top:2.2,tag:"home-tv"},{x:-2.6,z:3.45,w:1.5,d:.4,top:2,tag:"home-books"},{x:-4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"},{x:4.9,z:.1,w:.08,d:10,top:1.1,tag:"home-fence"}],We={capacity:Tg,columns:Ag,startX:wg,startZ:Rg,spacingX:Cg,spacingZ:Pg,boxes:Dg};function Qo(i){return Number.isInteger(i)&&i>=0&&i<We.capacity?{slot:i,x:We.startX+i%We.columns*We.spacingX,z:We.startZ-Math.floor(i/We.columns)*We.spacingZ}:null}function Lg(i,t=i,e=null,n=We.capacity,s=.4){const r=[],o=Math.min(i.x,t.x)-s,a=Math.max(i.x,t.x)+s,c=Math.min(i.z,t.z)-s,l=Math.max(i.z,t.z)+s,p=Math.max(0,Math.ceil((o-5.1-We.startX)/We.spacingX)),g=Math.min(We.columns-1,Math.floor((a+5.1-We.startX)/We.spacingX)),u=Math.max(0,Math.ceil((We.startZ-l-5.3)/We.spacingZ)),f=Math.min(Math.ceil(We.capacity/We.columns)-1,Math.floor((We.startZ-c+5.3)/We.spacingZ));for(let x=u;x<=f;x++)for(let S=p;S<=g;S++){const d=x*We.columns+S,m=Qo(d);if(!(!m||d>=n))for(const y of We.boxes)y.tag==="home-door"&&d===e||r.push({left:m.x+y.x-y.w/2,right:m.x+y.x+y.w/2,back:m.z+y.z-y.d/2,front:m.z+y.z+y.d/2,top:y.top,tag:y.tag})}return r}function ki(i,t){return!!(t&&i&&Math.abs(i.x-t.x)<4.4&&Math.abs(i.z-t.z)<3.7)}function Ig({scene:i,material:t,ownedGeometries:e}){const s=Array(128).fill(null),r=new Map,o=new Map,a=[],c=new Set,l=new de,p=new xn,g=new F(1,1,1),u=new de().makeScale(0,0,0);let f=null,x=1,S=0,d=null;const m={"#cbbb9d":"#c1a771","#c8a178":"#a78a63","#ab8965":"#8c7055","#d7c5a7":"#e4dcc9","#e9dfca":"#e4dcc9","#ba9f6b":"#c1a771","#cfbb8c":"#c1a771","#f0cb83":"#edcd8a","#bca375":"#c1a771","#f4eddf":"#eee9de","#f8f0df":"#eee9de","#a38360":"#a78a63","#bda16a":"#c1a771","#f2eee5":"#eee9de","#e8e9de":"#eee9de","#a2b1a6":"#8d9e98","#56746a":"#47695f","#a78d6c":"#a78a63","#eee8d8":"#eee9de","#7c9994":"#71948d","#baa371":"#c1a771","#e8dcc3":"#eee9de","#b49a76":"#a78a63","#a58a64":"#a78a63","#8c7556":"#8c7055","#eee2c6":"#eee9de","#aa9270":"#a78a63","#879f93":"#91aaa1","#e2ca9e":"#c1a771"};function y(C,L,B,I,k,V="inside",q=0){L=m[L]||L;let at=C;at.index&&(at=C.toNonIndexed(),C.dispose()),p.setFromEuler(new Vn(0,0,q)),at.applyMatrix4(l.compose(new F(B,I,k),p,g));const Q=`${V}:${L}`;o.has(Q)||o.set(Q,{layer:V,color:L,geometries:[]}),o.get(Q).geometries.push(at)}const E=(C,L,B,I,k,V,q,at="inside",Q=0)=>y(new Ke(C,L,B),q,I,k,V,at,Q),T=(C,L,B,I,k,V)=>y(new In(C,C,L,10),V,B,I,k);function M(C,L,B,I,k){y(new wi(C,9,6),k,L,B,I)}E(10.3,.16,11.7,0,-.27,.2,"#a5ba9d"),E(10.3,.06,1.6,0,-.15,5.3,"#e4dcc9"),E(9.5,.3,8.1,0,-.03,0,"#cbbb9d"),E(9.2,.08,7.8,0,.16,0,"#c8a178");for(let C=-4.2;C<4.5;C+=.7)E(.018,.012,7.6,C,.21,0,"#ab8965");E(3,.22,1,0,-.04,4.3,"#d7c5a7"),E(2.4,.12,.6,0,-.18,4.95,"#e9dfca"),E(9.4,3.45,.18,0,1.9,-3.9,"#e7dec9","shell"),E(.18,3.45,7.8,-4.6,1.9,0,"#e7dec9","shell"),E(.18,3.45,7.8,4.6,1.9,0,"#e7dec9","front");for(const C of[-2.7,2.7])E(4,3.45,.18,C,1.9,3.9,"#e7dec9","front");E(1.4,.78,.18,0,3.25,3.9,"#e7dec9","front"),E(1.25,2.5,.1,.65,1.48,0,"#647d70","door"),E(.08,.36,.1,1.08,1.45,.08,"#ba9f6b","door");for(const C of[-2.85,2.85]){E(2.35,1.55,.12,C,2.05,4.04,"#71948d","front");for(const L of[-1.2,0,1.2])E(.055,1.65,.14,C+L,2.05,4.12,"#cfbb8c","front");for(const L of[1.23,2.87])E(2.45,.065,.14,C,L,4.12,"#cfbb8c","front");E(.23,.5,.14,C<0?-1:1,2.6,4.08,"#f0cb83","front")}for(const C of[-1,1])E(4.95,.22,8.65,C*2.37,3.98,0,"#47695f","roof",C*-.18),E(4.95,.12,.12,C*2.37,3.96,4.35,"#c1a771","roof",C*-.18);E(.18,.18,8.7,0,4.43,0,"#bca375","roof");for(const C of[-2,-.5,1])E(2.25,.06,1.25,2.5,4.08,C,"#29434f","roof",-.18);E(2.65,.4,3.25,-2.05,.46,-1.35,"#8c7055"),E(2.85,1.2,.18,-2.05,.89,-3.02,"#a5b2a1"),E(2.55,.22,3.05,-2.05,.77,-1.35,"#f4eddf"),E(2.18,.17,.65,-2.05,.94,-2.49,"#f8f0df"),E(2.57,.17,1.6,-2.05,1.04,-.62,"#91aaa1"),E(2.59,.03,.3,-2.05,1.14,.02,"#cfb786"),E(.8,.68,.75,-3.85,.56,-2.4,"#a38360"),T(.05,.35,-3.85,1.05,-2.4,"#bda16a"),T(.22,.3,-3.85,1.34,-2.4,"#edcd8a"),E(1.95,.48,.3,-2.15,3.02,-3.72,"#f2eee5");for(let C=0;C<4;C++)E(1.65,.024,.03,-2.15,2.88+C*.045,-3.55,"#8d9e98");E(.07,.035,.03,-1.42,3.08,-3.55,"#74bca6"),E(1.05,2.08,.92,3.65,1.25,-2.78,"#e8e9de"),E(1.02,.035,.04,3.65,1.58,-2.29,"#a2b1a6");for(const C of[.98,1.91])E(.05,.37,.08,3.29,C,-2.25,"#56746a");E(2.5,.95,.86,2.95,.7,-.75,"#a78d6c"),E(2.62,.1,.95,2.95,1.22,-.75,"#eee8d8"),E(.78,.035,.62,3.45,1.29,-.75,"#7c9994"),T(.035,.3,3.45,1.45,-1.08,"#baa371"),T(.18,.3,2.1,1.43,-.75,"#e8dcc3"),E(2.45,.65,.28,2.95,2.47,-3.65,"#b49a76"),E(1.45,.04,1.7,.95,.24,-2.72,"#a8beba"),E(.1,1.2,1.8,.16,.81,-2.72,"#dfd9c5"),E(1.5,1.2,.1,.95,.81,-1.8,"#dfd9c5"),T(.2,.33,.85,.43,-3.15,"#eee9de"),E(.5,.5,.22,.85,.68,-3.65,"#eee9de"),E(.55,.12,.42,1.5,1,-2.1,"#eee9de"),T(.025,1.65,1.5,1.9,-3.65,"#baa371"),E(3.2,.025,2.7,1.6,.23,1.65,"#d6c8af"),E(2.35,.42,.88,2.8,.51,2.45,"#a7b3a0"),E(2.35,.7,.22,2.8,.9,2.88,"#a7b3a0");for(const C of[1.55,4.05])E(.23,.57,1,C,.72,2.45,"#a7b3a0");E(.55,.35,.16,2.5,.88,2.65,"#d2b58c"),E(1.4,.1,.8,1.2,.72,1.4,"#a58a64");for(const C of[.7,1.7])E(.08,.4,.6,C,.48,1.4,"#8c7556");E(.4,.05,.28,1.1,.81,1.4,"#eee2c6"),E(.09,1.1,1.8,-.05,1.55,1.2,"#24443e"),E(.08,.85,1.5,.02,1.56,1.2,"#6a9b92"),E(1.5,1.25,.34,-2.6,.85,3.45,"#a78a63");for(let C=0;C<8;C++)E(.11,.32+C%2*.1,.22,-3.2+C*.17,1.65,3.45,C%2?"#879f93":"#e2ca9e");for(const C of[-4.9,4.9]){E(.08,.7,10,C,.19,.1,"#aa9270");for(const L of[-4.7,0,4.7])E(.13,1,.13,C,.36,L,"#aa9270")}for(const C of[-3.6,3.6])T(.29,.45,C,.14,4.65,"#b58a69"),M(.4,C,.68,4.65,"#78946e");for(const{layer:C,color:L,geometries:B}of o.values()){const I=jn(B,!1);B.forEach(V=>V.dispose()),e.add(I);const k=new dl(I,t(L),128);k.instanceMatrix.setUsage(ol),k.count=0,k.userData.residenceLayer=C,i.add(k),a.push(k)}o.clear();const _=new Ke(1,1,1);e.add(_);const h=new ve(_,t("#b4c5ab"));h.userData.residenceGround=!0,i.add(h);const v=new ve(_,t("#e4dcc9"));i.add(v);function R(C){const L=Qo(C);return{x:L.x,z:L.z}}function P(){const C=Math.max(S,s.reduce((B,I,k)=>I===null?B:k+1,0));x=Math.max(1,Math.ceil(C/8));for(const B of a){B.count=C;for(let I=0;I<C;I++){const k=s[I],V=R(I);d!==null&&k!==d||k===null&&I>=S||k!==null&&k===(d??f)&&["roof","front"].includes(B.userData.residenceLayer)?B.setMatrixAt(I,u):B.userData.residenceLayer==="door"?B.setMatrixAt(I,l.compose(new F(V.x-.65,0,V.z+3.99),new xn().setFromAxisAngle(new F(0,1,0),c.has(k)?-Math.PI/2:0),g)):B.setMatrixAt(I,l.compose(new F(V.x,0,V.z),new xn,g))}B.instanceMatrix.needsUpdate=!0,B.computeBoundingSphere()}const L=x*12+4;h.scale.set(86,.3,L),h.position.set(0,-.55,-20-L/2),v.scale.set(1.5,.04,L),v.position.set(0,-.12,-20-L/2),h.visible=v.visible=C>0&&d===null}return{meshes:a,interior(C){d=r.has(C)?C:null,P()},slotFor:C=>r.get(C),setPlots(C){S=Math.min(128,Math.max(0,Number(C)||0)),P()},sync(C){const L=new Set(C.slice(0,128).map(B=>B.id));for(const[B,I]of r)L.has(B)||(s[I]=null,r.delete(B));for(const B of C.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&r.get(B.id)!==I&&(r.has(B.id)&&(s[r.get(B.id)]=null),r.delete(B.id))}for(const B of C.slice(0,128)){const I=B.home_slot;Number.isInteger(I)&&I>=0&&I<128&&s[I]===null&&(s[I]=B.id,r.set(B.id,I))}for(const B of[...L].sort((I,k)=>I-k))if(!r.has(B)){const I=s.indexOf(null);s[I]=B,r.set(B,I)}r.has(f)||(f=null),P()},select(C){f=r.has(C)?C:null,P()},setDoor(C,L){L?c.add(C):c.delete(C),P()},location(C){const L=r.get(C);return L===void 0?null:R(L)},bed(C){const L=this.location(C);return L?[L.x-2.05,.92,L.z-.5]:null},cameraBoxes(C){const L=this.location(C);if(!L)return[];const B=(k,V,q,at,Q)=>({left:L.x+k-q/2,right:L.x+k+q/2,back:L.z+V-at/2,front:L.z+V+at/2,top:Q}),I=[B(-4.6,0,.18,7.8,3.6),B(0,-3.9,9.4,.18,3.6),B(3.65,-2.78,1.05,.92,2.3),B(2.95,-.75,2.62,.95,1.3),B(2.8,2.45,2.6,1.2,1.3)];return C!==f&&I.push(B(4.6,0,.18,7.8,3.6),B(0,3.9,9.4,.18,3.6)),I},personForHit(C){return C?.object?.userData?.residenceLayer&&Number.isInteger(C.instanceId)?s[C.instanceId]:null},bounds(){return{left:-43,right:43,back:-24-x*12,front:-20}},dispose(){a.forEach(C=>{C.dispose(),i.remove(C)}),i.remove(h,v),r.clear(),s.fill(null)}}}const Ng={minX:-100,maxX:100,minZ:-216,maxZ:92},Ug={x:0,y:-.12,z:20},Fg={tennis:{x:-32,z:-5,radius:9},badminton:{x:-32,z:12,radius:9},basketball:{x:32,z:-5,radius:9},golf:{x:32,z:12,radius:9},uno:{x:-30,z:28,radius:5.5},pingpong:{x:-18,z:28,radius:5.5},billiards:{x:-6,z:28,radius:5.5},chess:{x:6,z:28,radius:5.5},foosball:{x:18,z:28,radius:5.5},darts:{x:30,z:28,radius:5.5},arcade:{x:-12,z:41,radius:5.5},bowling:{x:12,z:41,radius:8},archery:{x:32,z:45,radius:8},bar:{x:-30,z:49,radius:15},disco:{x:-30,z:56,radius:6},beach:{x:-25,z:69,radius:20},garden:{x:-8,z:61,radius:7},terrace:{x:22,z:67,radius:10},lounge:{x:-12,z:9,radius:7},office:{x:0,z:0,radius:20}},Jn={bounds:Ng,spawn:Ug,venues:Fg};function Og(){const i=[],{minX:t,maxX:e,minZ:n,maxZ:s}=Jn.bounds,r=.5,o=.3,a=Math.round((e-t)/r)+1,c=Math.round((s-n)/r)+1;let l=null,p=!1,g=null,u=128;const f=(_,h=_,v=.3)=>p?Lg(_,h,g,u,Math.max(.4,v)):[],x=_=>_.top<=Kn.vault_height&&Kn.vault_tags.includes(_.tag);function S(_,h,v=-.12,R=o){return _>=t+R&&_<=e-R&&h>=n+R&&h<=s-R&&!i.concat(f({x:_,z:h},{x:_,z:h},R)).some(P=>!(x(P)&&v>=P.top+.075)&&_>P.left-R&&_<P.right+R&&h>P.back-R&&h<P.front+R)}function d(_,h,v=o){if(!S(h.x,h.z,h.y??-.12,v))return!1;for(const R of i.concat(f(_,h,v))){let P=0,C=1;for(const[L,B,I]of[["x",R.left-v,R.right+v],["z",R.back-v,R.front+v]]){const k=h[L]-_[L];if(Math.abs(k)<1e-8){if(_[L]<=B||_[L]>=I){P=2;break}}else{const V=(B-_[L])/k,q=(I-_[L])/k;P=Math.max(P,Math.min(V,q)),C=Math.min(C,Math.max(V,q))}}if(P<=C&&C>0&&P<1){const L=_.y??-.12,B=h.y??-.12;if(x(R)&&Math.min(L+(B-L)*Math.max(0,P),L+(B-L)*Math.min(1,C))>=R.top+.075)continue;return!1}}return!0}function m(){if(!l){l=new Uint8Array(a*c).fill(1);for(let _=0;_<c;_++)for(let h=0;h<a;h++)(h===0||_===0||h===a-1||_===c-1)&&(l[_*a+h]=0);for(const _ of i.concat(f({x:t,z:n},{x:e,z:s}))){const h=Math.max(0,Math.ceil((_.left-.4-t)/r)),v=Math.min(a-1,Math.floor((_.right+.4-t)/r)),R=Math.max(0,Math.ceil((_.back-.4-n)/r)),P=Math.min(c-1,Math.floor((_.front+.4-n)/r));for(let C=R;C<=P;C++)for(let L=h;L<=v;L++)l[C*a+L]=0}}}function y(_,h,v){const R=h.x-_.x,P=h.z-_.z,C=R*R+P*P;return v.every(L=>{const B=C?Math.max(0,Math.min(1,((L.x-_.x)*R+(L.z-_.z)*P)/C)):0;return Math.hypot(_.x+R*B-L.x,_.z+P*B-L.z)>=.62})}function E(_,h=null,v=[]){m();const R=Math.round((_.x-t)/r),P=Math.round((_.z-n)/r);let C=-1,L=1/0;for(let B=-6;B<=6;B++)for(let I=-6;I<=6;I++){const k=R+I,V=P+B,q=V*a+k;if(k<0||V<0||k>=a||V>=c||!(h||l)[q])continue;const at=(t+k*r-_.x)**2+(n+V*r-_.z)**2;S(_.x,_.z)&&!d(_,{x:t+k*r,z:n+V*r})||y(_,{x:t+k*r,z:n+V*r},v)&&at<L&&(C=q,L=at)}return C}function T(_){return{x:t+_%a*r,z:n+Math.floor(_/a)*r}}function M(_,h,v=[]){if(d(_,h)&&y(_,h,v))return[{x:h.x,z:h.z}];m();const R=v.length?l.slice():l;for(const z of v){const nt=Math.round((z.x-t)/r),pt=Math.round((z.z-n)/r);for(let Rt=-2;Rt<=2;Rt++)for(let j=-2;j<=2;j++){const ft=nt+j,Dt=pt+Rt;ft>=0&&Dt>=0&&ft<a&&Dt<c&&Math.hypot(t+ft*r-z.x,n+Dt*r-z.z)<.76&&(R[Dt*a+ft]=0)}}const P=E(_,R,v),C=E(h,R,v);if(P<0||C<0)return[];const L=[],B=new Float64Array(a*c).fill(1/0),I=new Int32Array(a*c).fill(-1),k=new Uint8Array(a*c),V=z=>Math.abs(z%a-C%a)+Math.abs(Math.floor(z/a)-Math.floor(C/a));function q(z,nt){L.push({index:z,score:nt});let pt=L.length-1;for(;pt>0;){const Rt=pt-1>>1;if(L[Rt].score<=nt)break;[L[pt],L[Rt]]=[L[Rt],L[pt]],pt=Rt}}function at(){const z=L[0],nt=L.pop();if(L.length){L[0]=nt;let pt=0;for(;;){let Rt=pt,j=pt*2+1,ft=j+1;if(j<L.length&&L[j].score<L[Rt].score&&(Rt=j),ft<L.length&&L[ft].score<L[Rt].score&&(Rt=ft),Rt===pt)break;[L[pt],L[Rt]]=[L[Rt],L[pt]],pt=Rt}}return z.index}B[P]=0,q(P,V(P));let Q=0;for(;L.length&&Q++<a*c;){const z=at();if(k[z])continue;if(k[z]=1,z===C){const Rt=[];let j=z;for(;j!==P;)Rt.push(T(j)),j=I[j];return Rt.reverse(),S(h.x,h.z)&&d(Rt.at(-1)||T(P),h)&&y(Rt.at(-1)||T(P),h,v)&&Rt.push({x:h.x,z:h.z}),S(_.x,_.z)&&Rt.unshift(T(P)),Rt}const nt=z%a,pt=Math.floor(z/a);for(const[Rt,j]of[[1,0],[-1,0],[0,1],[0,-1]]){const ft=nt+Rt,Dt=pt+j,Nt=Dt*a+ft;if(ft<0||Dt<0||ft>=a||Dt>=c||!R[Nt]||k[Nt]||!d(T(z),T(Nt))||!y(T(z),T(Nt),v))continue;const wt=B[z]+1;wt<B[Nt]&&(B[Nt]=wt,I[Nt]=z,q(Nt,wt+V(Nt)))}}return[]}return{configureHomes(_,h=null,v=u){p===!!_&&h===g&&v===u||(p=!!_,g=h,u=v,l=null)},withHomeAccess(_,h){if(!p||_===void 0||_===g)return h();const v=g,R=l;g=_,l=null;try{return h()}finally{g=v,l=R}},groundHeight(_){const h=Math.round((_.x+36.75)/10.5),v=Math.round((-28-_.z)/12);let R=p&&h>=0&&h<8&&v>=0&&ki(_,Qo(v*8+h))?.22:-.12;for(const P of i.concat(f(_)))x(P)&&(_.y??-.12)>=P.top+.07&&_.x>P.left-o&&_.x<P.right+o&&_.z>P.back-o&&_.z<P.front+o&&(R=Math.max(R,P.top+.08));return R},boxes:()=>i.map(_=>({..._})),slide(_,h,v=o){const R={...h,y:h.y??_.y};return d(_,R,v)?{x:h.x,z:h.z}:d(_,{...R,z:_.z},v)?{x:h.x,z:_.z}:d(_,{...R,x:_.x},v)?{x:_.x,z:h.z}:{x:_.x,z:_.z}},addBox(_,h,v,R,P="",C=2){i.push({left:v-_/2,right:v+_/2,back:R-h/2,front:R+h/2,top:C,tag:P}),l=null},cameraLimit(_,h,v=[]){let R=1;for(const P of i.concat(v)){let C=0,L=1;for(const[B,I,k]of[["x",P.left-.15,P.right+.15],["z",P.back-.15,P.front+.15],["y",-.3,P.top+.15]]){const V=h[B]-_[B];if(Math.abs(V)<1e-8){if(_[B]<I||_[B]>k){C=2;break}}else{const q=(I-_[B])/V,at=(k-_[B])/V;C=Math.max(C,Math.min(q,at)),L=Math.min(L,Math.max(q,at))}}C<=L&&C>.01&&C<R&&(R=Math.max(.02,C-.015))}return R},free:S,segment:d,path:M,nearest(_){const h=E(_);return h<0?null:T(h)},move(_,h,v){const R=Math.hypot(h.x-_.x,h.z-_.z),P=R>0?Math.min(1,v/R):0,C={x:_.x+(h.x-_.x)*P,z:_.z+(h.z-_.z)*P};return d(_,C)?C:{x:_.x,z:_.z}}}}function Bg({scene:i,ownedGeometries:t,materials:e,sun:n,hemi:s,fill:r,navigation:o=null}){const a=new yn;i.add(a);const c=Et=>(t.add(Et),Et);function l(Et,Xt){const se=new bs(Xt);return e.set("environment:"+Et,se),se}const p=l("grass",{color:"#a5b99a",roughness:1}),g=l("rock",{color:"#82958f",roughness:1,flatShading:!0}),u=l("snowcap",{color:"#ecefe7",roughness:1,flatShading:!0}),f=l("forest",{color:"#4c7262",roughness:1}),x=new ve(c(new _i(850,850)),p);x.rotation.x=-Math.PI/2,x.position.y=-1.3,a.add(x);const S=[],d=[],m=[],y=new de,E=new xn;function T(Et,Xt,se,Jt,me,Me=1,Fe=1,ge=1){const Ge=Et.index?Et.toNonIndexed():Et;Ge!==Et&&Et.dispose(),Ge.applyMatrix4(y.compose(new F(se,Jt,me),E,new F(Me,Fe,ge))),Xt.push(Ge)}for(let Et=0;Et<20;Et++){const Xt=Et/20*Math.PI*2,se=Math.cos(Xt)*(155+Et%3*18),Jt=-70+Math.sin(Xt)*230,me=35+Et%5*13,Me=25+Et%4*9;T(new ni(Me,me,7),S,se,me/2-1.3,Jt,1.2,1,1),T(new ni(Me*.28,me*.28,7),d,se,me*.86-1.25,Jt,1.2,1,1)}for(let Et=0;Et<100;Et++){const Xt=Et%2?-1:1,se=Xt*(51+Et%9*4),Jt=-210+Math.floor(Et/2)*5.4,me=3.5+Et%4;T(new ni(1.3+Et%3*.25,me,6),m,se,me/2-.8,Jt),Jt>=-22&&Jt<=92&&o?.addBox(2.6,2.6,se,Jt,"forest-tree",me)}function M(Et,Xt){const se=c(jn(Et,!1));Et.forEach(me=>me.dispose());const Jt=new ve(se,Xt);return a.add(Jt),Jt}const _=M(S,g),h=M(d,u),v=M(m,f),R=[];for(let Et=0;Et<14;Et++)for(let Xt=0;Xt<4;Xt++)T(new wi(1,9,6),R,-100+Et%7*32+(Xt-1.5)*4,29+Et%4*4+Xt%2*1.5,-120+Math.floor(Et/7)*165,7,3.2,4.8);const P=l("clouds",{color:"#f5f2e9",roughness:1,transparent:!0,opacity:.75,depthWrite:!1}),C=M(R,P),L=6e3,B=new Float32Array(L*3),I=new Float32Array(L*6),k=[];for(let Et=0;Et<L;Et++)k.push({x:Et*73.31%64-32,y:Et*17.73%32,z:Et*41.71%70-35});const V=c(new Je);V.setAttribute("position",new pn(B,3)),V.setDrawRange(0,320);const q=new ml({color:"#d9eef2",size:.11,transparent:!0,opacity:.65,depthWrite:!1,sizeAttenuation:!0});e.set("environment:particles",q);const at=new Dh(V,q);at.frustumCulled=!1,a.add(at);const Q=c(new Je);Q.setAttribute("position",new pn(I,3));const z=new pl({color:"#b7d4e5",transparent:!0,opacity:.47,depthWrite:!1});e.set("environment:rain-streaks",z);const nt=new Ph(Q,z);nt.frustumCulled=!1,a.add(nt);const pt=c(new _i(260,24,48,4)),Rt=new Float32Array(pt.attributes.position.count*3);for(let Et=0;Et<pt.attributes.position.count;Et++)new ne().setHSL(.38+Et%49/49*.34,.75,.62).toArray(Rt,Et*3);pt.setAttribute("color",new pn(Rt,3));const j=new Qn({vertexColors:!0,transparent:!0,opacity:.43,depthWrite:!1,side:ln,blending:Qs});e.set("environment:aurora",j);const ft=new ve(pt,j);ft.position.set(0,55,-235),a.add(ft);const Dt=pt.attributes.position.array.slice();let Nt={},wt=0,qt="",Le="",Wt=!1,Vt=-60;const Qt={alps:["#a5b99a","#82958f","#4c7262"],village:["#b5bb8d","#a39b87","#6b805c"],nordic:["#9dafaa","#7a919e","#3f6864"]};function ee(Et){const Xt=gu(Nt,Date.now()+wt).mode;if(Xt===qt&&Le===`${Nt.landscape}:${Et}`)return;qt=Xt,Le=`${Nt.landscape}:${Et}`;const se=Qt[Nt.landscape]||Qt.alps;p.color.set(se[0]),g.color.set(se[1]),f.color.set(se[2]);const Jt=Xt==="aurora";i.background=new ne(Jt?"#102339":Et?"#142730":Xt==="rain"?"#a6babd":Xt==="snow"?"#dce6e8":"#d6e7e8"),i.fog=new Xo(i.background,Xt==="mist"?.007:Xt==="rain"?.0035:.0013),n.intensity=Jt?.6:Xt==="rain"?1.35:Et?1.65:2.7,s.intensity=Jt?1.6:Et?2.05:2.6,r.intensity=Jt?1.8:1.1,P.color.set(Xt==="rain"?"#859c9f":"#f5f2e9"),q.color.set("#ffffff"),q.size=.13}return{configure(Et={},Xt=!1){Nt=Et.settings||{},Number.isFinite(Et.server_ms)&&(wt=Et.server_ms-Date.now()),Wt=Xt,_.visible=h.visible=Nt.mountains!==!1,C.visible=Nt.clouds!==!1;const se=Nt.precipitation||"heavy",Jt=Wt?900:se==="light"?650:se==="storm"?5800:3600;V.setDrawRange(0,Jt),Q.setDrawRange(0,Jt*2),Le=""},update(Et,{paused:Xt=!1,dark:se=!1,center:Jt=null}={}){ee(se);const me=qt,Me=Xt?0:Et/1e3;if(C.position.x=Xt?0:Math.sin(Me*.012)*9,at.visible=me==="snow",nt.visible=me==="rain",ft.visible=me==="aurora",at.visible||nt.visible){const Fe=V.drawRange.count,ge=Jt?.x||0,Ge=Jt?.z||0;for(let H=0;H<Fe;H++){const ae=k[H],Se=ae.x+ge+Math.sin(Me*.4+H)*(me==="snow"?.55:.1),ye=(ae.y-Me*(me==="snow"?1.4:20)%32+32)%32,bt=ae.z+Ge;if(me==="snow")B[H*3]=Se,B[H*3+1]=ye,B[H*3+2]=bt;else{const Pe=H*6;I[Pe]=Se,I[Pe+1]=ye,I[Pe+2]=bt,I[Pe+3]=Se+.1,I[Pe+4]=ye-.9,I[Pe+5]=bt}}(me==="snow"?V:Q).attributes.position.needsUpdate=!0}if(ft.visible){const Fe=pt.attributes.position.array;for(let ge=0;ge<Fe.length;ge+=3)Fe[ge+1]=Dt[ge+1]+Math.sin(Dt[ge]*.035+Me*.3)*5,Fe[ge+2]=Math.cos(Dt[ge]*.02+Me*.17)*9;pt.attributes.position.needsUpdate=!0}},extent(Et){Et!==Vt&&(Vt=Et,v.scale.z=Math.max(1,Math.abs(Et)/210))},dispose(){i.remove(a),i.fog=null,a.clear()}}}function zg({scene:i,box:t,cylinder:e,orb:n,bake:s,sign:r,material:o,navigation:a,ownedGeometries:c,materials:l}){t(23,.16,20,-30,-.29,51,"#263e39",.14);for(let M=-40;M<=-20;M+=2)for(let _=43;_<=59;_+=2)t(1.98,.025,1.98,M,-.18,_,(M+_)/2%2?"#e8dfcb":"#d1c6ac",0);for(const M of[-41.3,-18.7])t(.15,.09,20,M,-.1,51,"gold",0),t(.35,1.4,19.8,M,.45,51,"deep"),a.addBox(.35,19.8,M,51,"grand-bar-wall",1.3);t(23,4.4,.3,-30,1.75,41,"deep"),a.addBox(23,.3,-30,41,"bar-back-wall",4.2);for(const M of[-40,-20])for(const _ of[42.5,50.5,59.5])e(.35,.25,M,-.03,_,"gold"),e(.2,4.7,M,2.3,_,"white"),e(.38,.22,M,4.7,_,"gold"),a.addBox(.75,.75,M,_,"grand-bar-column",4.9);for(const M of[42.5,50.5,59.5]){t(20,.2,.35,-30,4.8,M,"gold");for(const _ of[-36,-24]){const h=new mi(2,.075,6,24,Math.PI);s(h,"gold",_,3.4,M)}}t(16,1.35,1.55,-30,.46,45,"oak"),t(16.5,.16,1.9,-30,1.2,45,"#f0e7d3"),t(15.7,.06,.045,-30,.87,45.81,"gold",0),a.addBox(16.5,1.9,-30,45,"marble-bar-counter",1.3);for(const M of[41.65,42.3])t(15,.14,.7,-30,1.5+(M-41.65)*2,M,"wood");for(let M=0;M<14;M++){const _=-36.5+M;e(.11,.55,_,1.87,41.8,M%2?"#87b6a5":"#b89c68"),e(.04,.14,_,2.22,41.8,"gold")}for(const M of[-37,-34,-31,-28,-25,-22])e(.37,.16,M,.57,47.4,"deep"),e(.065,.8,M,.08,47.4,"gold"),e(.28,.06,M,-.12,47.4,"gold"),a.addBox(.75,.75,M,47.4,"bar-stool",.7);r("MAISON DU RIVAGE","GRAND SALON / LA CARTE / WATERFRONT",15,-30,3.3,41.22);for(const[M,_,h]of[[-30,49,1.8],[-37,55,.8],[-23,55,.8]]){e(.025,1.7,M,4.8,_,"gold"),s(new mi(h,.035,6,28),"gold",M,4,_,Math.PI/2);for(let v=0;v<12;v++){const R=v*Math.PI/6,P=M+Math.cos(R)*h,C=_+Math.sin(R)*h;e(.014,.46,P,3.75,C,"gold"),n(.09,.19,.09,P,3.47,C,"white")}}for(const M of[-38,-22])t(2.1,.65,5.1,M,.15,54,"#856c8c",.18),t(.3,1,5.2,M+(M<-30?-.85:.85),.75,54,"#856c8c",.1),a.addBox(2.1,5.1,M,54,"velvet-booth",1.3),e(.68,.12,M+(M<-30?1.8:-1.8),.83,54,"gold"),e(.06,.9,M+(M<-30?1.8:-1.8),.32,54,"gold"),a.addBox(1.4,1.4,M+(M<-30?1.8:-1.8),54,"salon-table",.9);t(8.8,.12,6.4,-30,-.04,56,"black",.07);const p=["#87668e","#508a87","#b99c68","#5c708c"];for(let M=0;M<8;M++)for(let _=0;_<6;_++)t(1.04,.025,1.02,-33.7+M*1.06,.035,53.4+_*1.06,p[(M+_)%4],.015);for(const M of[-34.5,-25.5])t(.04,.06,6.6,M,.02,56,"gold",0);t(5.4,1.2,1.1,-30,.51,51.1,"black"),t(5.5,.12,1.2,-30,1.14,51.1,"gold"),a.addBox(5.5,1.2,-30,51.1,"dj-console",1.3);for(const M of[-31.4,-28.6])e(.57,.08,M,1.24,51.1,"black"),e(.15,.1,M,1.3,51.1,"gold");for(let M=0;M<6;M++)t(.1,.09,.22,-30.65+M*.25,1.26,51.3,"white",.01);for(const M of[-34.5,-25.5]){t(1,2.3,.8,M,1,51,"black");for(const _ of[.45,1.35]){const h=new In(.31,.31,.05,12);s(h,"metal",M,_,51.43,Math.PI/2)}a.addBox(1,.8,M,51,"club-speaker",2.2)}r("ÉCLIPSE","SOCIAL CLUB / MUSIC & DANCE",5,-30,2.7,51.82,"#e5c796"),t(1.2,1.5,.08,-19.1,.7,59,"deep"),r("LA CARTE","CLICK TO OPEN",1.1,-19.1,.9,59.06);const g=new bs({color:"#c6d4d0",metalness:.85,roughness:.16,flatShading:!0});l.set("rivage-disco-ball",g);const u=new Zo(.62,2);c.add(u);const f=new ve(u,g);f.position.set(-30,4.6,56),i.add(f);const x=new Qn({color:"#b694d0",transparent:!0,opacity:.035,depthWrite:!1,side:ln,blending:Qs});l.set("rivage-beams",x);const S=new ni(1.5,3.4,10,1,!0);c.add(S);const d=[];for(const M of[-33,-27])for(const _ of[54,58]){const h=new ve(S,x);h.position.set(M,2,_),h.userData.rivageEffect="beam",i.add(h),d.push(h)}const m=[],y=new Qn({transparent:!0,opacity:0,depthWrite:!1});l.set("rivage-hotspot",y);for(const[M,_,h,v,R,P,C]of[["bar",16,1.6,2,-30,.5,45],["bar",1.5,2,.25,-19.1,.9,59],["disco",5.5,1.4,1.4,-30,.6,51.1]]){const L=new Ke(_,h,v);c.add(L);const B=new ve(L,y);B.position.set(R,P,C),B.userData.officeVenue=M,i.add(B),m.push(B)}const E=p.map(M=>{const _=o(M);return _.emissive.set(M),_});let T=!0;return{targets:m,setEnabled(M){T=!!M},update(M,{paused:_,energySaver:h}){_||(f.rotation.y=M/18e3);const v=_||h||!T;for(const R of d)R.visible=!v;for(let R=0;R<E.length;R++)E[R].emissiveIntensity=v?.13:.2+Math.sin(M/4500+R)*.05}}}function Gg(i,t=Jn.spawn){let e={x:t.x,y:t.y??-.12,z:t.z,yaw:t.yaw||0,stamina:100,vx:0,vz:0,vy:0,grounded:!0,action:"idle",jumps:0,flight:!1},n=!1,s=!0,r=null,o=0,a=!1;const c=(g,u,f)=>Math.max(u,Math.min(f,g));function l(g,u={},f=0,x=[]){const S=c(Number(g)||0,0,.05);let d=Number(u.x)||0,m=Number(u.z)||0;r&&Date.now()>=o&&p(null);const y=Math.hypot(d,m);y>1&&(d/=y,m/=y),e.stamina<=5?s=!1:e.stamina>=30&&(s=!0);const E=!!(u.boost&&y&&s),T=E?9:4.5;e.stamina=c(e.stamina+(E?-23:14)*S,0,100);const M=(Math.cos(f)*d-Math.sin(f)*m)*T,_=(-Math.sin(f)*d-Math.cos(f)*m)*T;e.vx=M,e.vz=_;const h=i.groundHeight?.(e)??-.12;e.grounded&&e.y>h+.08&&(e.grounded=!1),!e.flight&&!a&&u.jump&&!n&&(e.grounded||e.jumps<Kn.maximum_jumps)&&(e.vy=Kn.jump_speed,e.grounded=!1,e.jumps++),n=!!u.jump;const v=e.y;e.flight?(e.vy=(+!!u.jump-+!!u.descend)*Kn.flight_speed,e.y=c(e.y+e.vy*S,h,Kn.flight_maximum_y),e.grounded=!1):a?(e.y=Math.max(h,e.y-Kn.landing_speed*S),e.vy=-4,e.y<=h&&(a=!1,e.grounded=!0,e.vy=0,e.jumps=0)):e.grounded?e.y=h:(e.vy-=Kn.gravity*S,e.y=Math.min(Kn.maximum_y,e.y+e.vy*S),e.y<=h&&(e.y=h,e.vy=0,e.grounded=!0,e.jumps=0));let R=i.slide({...e,y:Math.min(v,e.y)},{x:e.x+M*S,y:e.y,z:e.z+_*S},r?.radius||.3);x.some(C=>Math.hypot(R.x-C.x,R.z-C.z)<.62&&Math.hypot(R.x-C.x,R.z-C.z)<=Math.hypot(e.x-C.x,e.z-C.z)+1e-4)&&(R={x:e.x,z:e.z});const P=Math.hypot(R.x-e.x,R.z-e.z)>1e-4;return e.x=R.x,e.z=R.z,P&&(e.yaw=Math.atan2(M,_)),e.action=e.flight?"fly":a?"land":e.grounded?P?E?"run":"walk":"idle":"jump",{...e}}function p(g,u=1/0){!g&&e.flight&&(e.flight=!1,a=!e.grounded),r=g,o=u}return{step:l,setForm:p,toggleFlight(){return r?.fly?(e.flight=!e.flight,a=!e.flight&&!e.grounded,e.grounded=!1,e.vy=0,e.flight?"fly":"land"):!1},state:()=>({...e}),reset(g){e={...e,...g,vx:0,vz:0,vy:0,jumps:0,grounded:(g.y??-.12)<=(i.groundHeight?.(g)??-.12)+.01},a=!e.flight&&e.y>Kn.maximum_y,n=!1},face(g){e.yaw=Math.atan2(g.x-e.x,g.z-e.z)},moving:()=>!e.grounded||Math.hypot(e.vx,e.vz)>.01}}function Nr(i,t){const e=Jn.venues[t];return!!(i&&e&&Math.hypot(i.x-e.x,i.z-e.z)<=e.radius)}function Bc(i,t,e,n){const s=i.id+":"+t;if(e.has(s))return e.get(s);const r=[];function o(d,m,y,E,T,M=0){M&&d.rotateZ(M),d.translate(y,E,T);const _=d.index?d.toNonIndexed():d;_!==d&&d.dispose();const h=new ne(m),v=new Float32Array(_.attributes.position.count*3);for(let R=0;R<v.length;R+=3)v[R]=h.r,v[R+1]=h.g,v[R+2]=h.b;_.setAttribute("color",new pn(v,3)),r.push(_)}const a=(d,m,y,E,T,M,_,h=0)=>o(new Ke(d,m,y),E,T,M,_,h),c=(d,m,y,E,T,M,_=d)=>o(new In(_,d,m,10),y,E,T,M),{accent:l,hair:p,motif:g,accessory:u,hairStyle:f,shirt:x}=i;if(t==="head"){if(a(.49,.16,.45,p,0,.23,-.02),a(.45,f==="long"?.72:.29,.13,p,0,f==="long"?-.13:.07,-.22),["bob","long","side","split","ponytail"].includes(f))for(const d of[-1,1])a(.09,f==="long"?.6:.33,.32,p,d*.24,-.02,-.03);if(f==="spiky")for(let d=0;d<7;d++)o(new ni(.11,.27+d%3*.06,5),p,(d-3)*.066,.39+Math.sin(d)*.025,-.06,(d-3)*-.16);if(f==="split"&&a(.245,.18,.46,l,.123,.24,-.015),f==="side"&&a(.26,.25,.05,p,-.12,.08,.218,-.18),f==="ponytail"&&a(.27,.5,.25,p,0,-.15,-.37),u.includes("headband")&&(a(.49,.075,.045,"#303d4b",0,.13,.225),a(.22,.07,.025,"#c6cbd0",0,.13,.254),a(.055,.025,.01,"#4d6170",0,.13,.27)),u==="mask-headband"&&(a(.44,.18,.035,l,0,-.12,.22),a(.17,.07,.025,"#7e8d97",-.1,.09,.25,-.15)),u==="strawhat"&&(c(.43,.045,"#dac17e",0,.35,0),c(.29,.2,"#e3ce8d",0,.46,0,.23),c(.293,.055,x,0,.395,0)),u==="antlerhat"){c(.37,.05,l,0,.33,0),c(.28,.27,l,0,.46,0),a(.055,.17,.025,"#f1e8db",0,.46,.28),a(.17,.055,.025,"#f1e8db",0,.46,.29);for(const d of[-1,1])a(.06,.33,.06,"#94745a",d*.3,.64,0,d*-.3),a(.15,.055,.06,"#94745a",d*.36,.72,0)}if(u==="bamboo"){const d=new In(.052,.052,.35,10);d.rotateZ(Math.PI/2),o(d,"#88a970",0,-.1,.255),a(.08,.07,.03,l,.23,.23,-.03)}if(u==="turban"&&(c(.3,.17,l,0,.29,0),a(.39,.07,.46,"#d9d4c4",0,.34,0)),u==="goggles"||u==="glasses")for(const d of[-1,1])a(.19,.12,.06,l,d*.12,u==="goggles"?.23:.04,.235),a(.13,.07,.025,"#849d9a",d*.12,u==="goggles"?.23:.04,.271);if(u==="boarhood"){a(.52,.42,.43,"#95939c",0,.04,-.02),a(.2,.12,.12,"#c3a2a5",0,-.08,.24);for(const d of[-1,1])a(.12,.2,.08,"#aba2a6",d*.2,.31,0,d*-.35),a(.06,.055,.025,"#84aabb",d*.14,.07,.208)}if(u==="butterfly")for(const d of[-1,1])a(.18,.17,.045,l,d*.15,.31,-.12,d*.4);if(u==="earrings")for(const d of[-1,1])a(.045,.15,.035,"#e9d6bc",d*.26,-.19,.02);if(i.id==="naruto")for(const d of[-1,1])for(let m=0;m<3;m++)a(.08,.012,.01,"#9f7055",d*.15,-.055-m*.033,.208,d*.1)}else{if(a(.48,.08,.37,l,0,.89,0),["zipper","vest","jacket","suit","buttons"].includes(g)){a(.028,.53,.035,l,0,1.23,.19);for(const d of[-1,1])a(.14,.37,.04,l,d*.14,1.26,.19,d*.08);if(g==="suit"&&(a(.17,.44,.035,"#ded9c8",0,1.25,.2),a(.05,.29,.025,l,0,1.3,.23)),g==="buttons")for(let d=0;d<3;d++)a(.03,.03,.035,"#eee2ba",0,1.13+d*.12,.23)}if(g==="checks"||g==="triangles"||g==="clouds")for(let d=0;d<4;d++)for(let m=0;m<4;m++){const y=(m-1.5)*.112,E=1+d*.13;g==="checks"&&(d+m)%2===0&&a(.11,.127,.025,l,y,E,.19),g==="triangles"&&(d+m)%2===0&&o(new ni(.035,.065,3),l,y,E,.205),g==="clouds"&&d%2===0&&m%2===0&&(a(.13,.045,.03,l,y,E,.2),c(.04,.03,l,y,E+.035,.2))}if(g==="circle"&&o(new mi(.09,.018,5,16),l,0,1.22,.205),["sash","gi","kimono","harness","cross","hero","split","armor","butterfly","cape","fur"].includes(g))if(g==="armor"){a(.43,.33,.08,l,0,1.29,.21);for(let d=0;d<3;d++)a(.32,.015,.02,"#b6a273",0,1.19+d*.07,.26)}else if(g==="split")a(.23,.54,.04,l,.12,1.2,.19);else if(g==="cape")a(.65,.89,.07,l,0,1.14,-.23),a(.65,.15,.43,l,0,1.49,-.03);else if(g==="butterfly"){for(const d of[-1,1])a(.12,.51,.07,l,d*.24,1.22,.16);a(.6,.23,.08,l,0,.89,-.2)}else for(const d of[-1,1])a(.065,.52,.04,l,d*.1,1.23,.2,d*(g==="cross"?.52:.22));if(["sword","swords","backsword"].includes(u))for(let d=0;d<(u==="swords"?3:1);d++){const m=.3+d*.06;a(.055,.83,.055,"#373d4a",m,.92,-.18,-.25),a(.09,.23,.07,l,m+.1,1.4,-.18,-.25)}if(u==="neckmask"&&a(.46,.13,.41,"#bcc6c0",0,1.51,.02),["gloves","gauntlets","roundcuffs","bracelet"].includes(u))for(const d of[-1,1])a(u==="gauntlets"?.27:.2,.2,.24,l,d*.37,.99,.05)}const S=jn(r,!1);return r.forEach(d=>d.dispose()),n.add(S),e.set(s,S),S}function ps(i){const t=i.enableDamping;i.enableDamping=!1,i.update?.(),i.enableDamping=t}function kg(i,t,e,n=[],s=3.6,r=35){const o=e.clone().sub(t);(!Number.isFinite(o.lengthSq())||o.lengthSq()<.001)&&o.set(4,3,5),(o.length()<s||o.length()>r)&&o.setLength(Yi.clamp(o.length(),s,r));const a=t.clone().add(o),c=i.cameraLimit(t,a,n);if(c>=1)return a;if(o.length()*c>=s)return t.clone().addScaledVector(o,c);for(const l of[4.5,6,9]){const p=t.clone().add(new F(o.x*.4,l,o.z*.4));if(p.sub(t).clampLength(s,r).add(t),i.cameraLimit(t,p,n)>=.99)return p}return t.clone().add(new F(0,Yi.clamp(6,s,r),0))}function Hg({scene:i,navigation:t,ownedGeometries:e,materials:n,sign:s}){const r=new bs({vertexColors:!0,roughness:.78});n.set("hospitality",r);const o=[],a=[];for(const[c,l,p,g,u,f]of[["NIA",-38.7,49,!0,"hostess","#f1e5d0"],["CLARA",-21.3,49,!0,"hostess","#213f3b"],["ADRIEN",-30,43.2,!1,"bartender","#f0ebdf"],["DJ LUC",-30,49.7,!1,"dj","#4e445f"],["GUEST",-36,59.4,!0,"guest","#9e6c85"],["GUEST",-24,59.4,!1,"guest","#526b84"]]){let d=function(E,T,M,_,h,v,R){let P=new Ke(E,T,M).toNonIndexed();P.translate(_,h,v);const C=new ne(R),L=new Float32Array(P.attributes.position.count*3);for(let B=0;B<L.length;B+=3)C.toArray(L,B);P.setAttribute("color",new pn(L,3)),S.push(P)};const x=new yn;x.position.set(l,-.12,p),x.userData.hospitality=u,i.add(x);const S=[];if(d(.49,.66,.32,0,1.15,0,f),d(.41,.45,.4,0,1.7,0,"#e4b492"),d(.46,.16,.45,0,1.96,-.02,g?"#51352e":"#29272d"),d(.46,g?.65:.27,.13,0,g?1.66:1.82,-.21,g?"#51352e":"#29272d"),g){for(const E of[-1,1])d(.07,.43,.29,E*.23,1.74,-.03,"#51352e"),d(.05,.025,.02,E*.13,1.65,.209,"#cf8790");d(.58,.3,.38,0,.81,0,f)}for(const E of[-1,1])d(.035,.04,.025,E*.1,1.73,.207,"#253b36"),d(.18,.65,.2,E*.14,.45,0,"#263e39"),d(.22,.13,.33,E*.14,.08,.06,"#1c2b28"),d(.16,.4,.2,E*.33,1.2,0,f),d(.15,.26,.16,E*.33,.9,.04,"#e4b492");d(.09,.025,.025,0,1.58,.21,"#b66c78"),(u==="hostess"||u==="bartender")&&(d(.3,.49,.035,0,1.02,.18,g?"#c6a971":"#253e38"),d(.08,.06,.03,.12,1.4,.18,"#d8bd7d"),d(.1,.07,.04,0,1.44,.19,"#374941"),d(.45,.04,.3,.36,.89,.17,"#c5ab71"),d(.11,.17,.11,.34,.99,.17,"#e7e2d3"));const m=jn(S,!1);S.forEach(E=>E.dispose()),e.add(m);const y=new ve(m,r);y.userData.officeVenue=u==="dj"?"disco":"bar",x.add(y),a.push(y),o.push(x),t.addBox(.68,.68,l,p,"hospitality-npc",2.1),u==="hostess"&&s(c,"NPC / PELAYAN RIVAGE",2.2,l,2.4,p)}return{targets:a,update(c,l){o.forEach((p,g)=>{p.rotation.y=g<2?Math.sin((l?0:c)/4500+g)*.1:0,p.children[0].position.y=l?0:Math.sin(c/1800+g)*.018})}}}const Zn=(i,t,e)=>i+(t-i)*e;function Vg(i,t,{time:e=0,dt:n=1/30,reduced:s=!1}={}){const r=["walk","run"].includes(t?.action),o=t?.action==="run",a=t?.action==="rest",c=a&&["recline","nap"].includes(t.pose),l=s?1:1-Math.exp(-Math.max(.001,n)*16),p=r?Math.sin(e*(o?13:8))*(o?.78:.48):0;let g=r?o?.16:.06:0,u=r?Math.abs(Math.sin(e*(o?13:8)))*(o?.07:.035):s?0:Math.sin(e*1.8)*.012;const f=[p,-p],x=[-p*.85,p*.85],S=[0,0];t?.action==="jump"&&(g=-.12,f.fill(.5),x.fill(-.7),u=0),t?.action==="fly"&&(g=.16,f.fill(.3),x.fill(.15),S[0]=-.12,S[1]=.12,u=0),t?.action==="land"&&(g=-.06,f.fill(.35),x.fill(-.3),u=0),a&&(g=c?t.pose==="nap"?-Math.PI/2:-1.38:.04,u=c?.4:-.5,f.fill(c?0:-1.25),x.fill(c?-.08:t.pose==="meditate"?-.4:-.8),t.pose==="meditate"&&(S[0]=-.3,S[1]=.3),s||(u+=Math.sin(e*1.4)*.007)),t?.action==="play"&&(x[1]=-.8+(s?0:Math.sin(e*3)*.45),x[0]=-.3,g=.07),t?.action==="cast"&&(x[0]=t.skillPose==="beam"?-1.25:-.9,x[1]=-1.4,f[0]=-.12,f[1]=.2,g=.12),t?.action==="drink"&&(x[1]=-1.2+(s?0:Math.sin(e*1.8)*.08)),t?.action==="eat"&&(x[0]=-1),t?.action==="dance"&&(x[0]=-.8,x[1]=-.7,f[0]=s?0:Math.sin(e*2.4)*.2,f[1]=-f[0]),i.body.rotation.x=Zn(i.body.rotation.x,g,l),i.body.position.y=Zn(i.body.position.y,u,l),i.body.rotation.z=Zn(i.body.rotation.z,t?.action==="dance"&&!s?Math.sin(e*2.4)*.12:0,l),i.legs.forEach((m,y)=>{m.rotation.x=Zn(m.rotation.x,f[y],l),m.rotation.z=Zn(m.rotation.z,S[y],l)}),i.arms.forEach((m,y)=>{m.rotation.x=Zn(m.rotation.x,x[y],l),m.rotation.z=Zn(m.rotation.z,o?y?-.12:.12:0,l)}),i.head.rotation.x=Zn(i.head.rotation.x,c&&t.pose==="recline"?.2:0,l),i.head.rotation.y=Zn(i.head.rotation.y,0,l);const d=a&&t.pose==="nap"?.15:!s&&e%5.3<.12?.25:1;return i.eyes.forEach(m=>m.scale.y=Zn(m.scale.y,d,l)),{lying:c,moving:r}}function Wg(i,t,e=[]){for(let n=0;n<12;n++){const s=(t.yaw||0)+n*Math.PI/6;if([.2,.7,1.3,1.8].every(o=>[-.25,0,.25].every(a=>{const c=t.x+Math.sin(s)*o+Math.cos(s)*a,l=t.z+Math.cos(s)*o-Math.sin(s)*a;return i.free(c,l)&&e.every(p=>Math.hypot(p.x-c,p.z-l)>.65)})))return s}return null}function zc(i,t,e,n=[]){const s=["recline","nap"].includes(e);for(const r of[0,.8,1.6,2.4,3.2])for(let o=0;o<(r?16:1);o++){const a={...t,x:t.x+Math.sin(o*Math.PI/8)*r,z:t.z+Math.cos(o*Math.PI/8)*r};if(!i.free(a.x,a.z)||!i.segment(t,a)||n.some(u=>Math.hypot(u.x-a.x,u.z-a.z)<.65))continue;const c=a.x-t.x,l=a.z-t.z,p=c*c+l*l;if(p&&n.some(u=>{const f=Math.max(0,Math.min(1,((u.x-t.x)*c+(u.z-t.z)*l)/p));return Math.hypot(t.x+c*f-u.x,t.z+l*f-u.z)<.62&&f>0}))continue;const g=s?Wg(i,a,n):t.yaw||0;if(g!==null)return{...a,yaw:g}}return null}function Xg(i,t,{costume:e="none",reduced:n=!1}={}){const s=new i.Group,r=new Set,o=new Map,a=[],c=[],l=[];s.userData.transformationModel=t.model;function p(M,_=!1){const h=M+_;return o.has(h)||o.set(h,new i.MeshStandardMaterial({color:M,emissive:M,emissiveIntensity:_?.55:.13,roughness:.55,metalness:.18,transparent:_,opacity:_?.78:1,depthWrite:!_})),o.get(h)}function g(M,_,h,v,R,P,C=!1){r.add(_);const L=new i.Mesh(_,p(h,C));return L.position.set(v,R,P),M.add(L),L}const u=(M,_,h,v,R,P,C,L,B=!1)=>g(M,new i.BoxGeometry(_,h,v),R,P,C,L,B),f=(M,_,h,v,R,P,C,L,B=!1)=>{const I=g(M,new i.SphereGeometry(1,10,7),L,_,h,v,B);return I.scale.set(R,P,C),I},x=(M,_,h,v,R,P,C)=>g(M,new i.ConeGeometry(_,h,5),v,R,P,C,!0),S=(M,_,h)=>{const v=new i.Group;return v.position.set(M,_,h),s.add(v),v},d=t.color,m=t.accent||"#eddbff",y=t.dark||"#36214f";if(t.model==="susanoo"){u(s,1.75,1.65,.85,d,0,3.7,0),u(s,1.1,.65,.75,d,0,2.65,0);for(let R=0;R<5;R++)for(const P of[-1,1]){const C=u(s,.74,.055,.07,m,P*.4,3.15+R*.25,.46,!0);C.rotation.z=P*.18}u(s,1.45,.24,.95,y,0,2.5,0);for(let R=0;R<5;R++){const P=R*Math.PI*2/5,C=u(s,.85,1,.16,d,Math.sin(P)*.68,2.05,Math.cos(P)*.53);C.rotation.y=P,C.rotation.z=Math.sin(P)*.12}for(const R of[-1,1]){const P=S(R*.47,1.7,0);u(P,.52,1.1,.58,d,0,-.4,0),u(P,.64,.4,.7,y,0,-.8,.04),u(P,.48,.65,.56,d,0,-1.2,0),u(P,.6,.3,.95,d,0,-1.57,.2),l.push({node:P,side:R,kind:"leg"});const C=S(R*1.08,4.25,0);u(C,.6,1.1,.65,d,0,-.45,0),u(C,.75,.35,.85,m,0,.04,0),u(C,.64,.85,.65,y,0,-1.25,0),u(C,.58,.35,.55,d,0,-1.85,.07),l.push({node:C,side:R,kind:"arm"});for(let k=0;k<3;k++)u(s,.95,.16,.85,d,R*(1.03+k*.05),4.38-k*.17,0);const L=S(R*.72,4.35,-.43);L.userData.wingSide=R,a.push(L);const B=u(L,2.2,.24,.23,m,R*1,1.02,-.1,!0);B.rotation.z=R*.48;for(let k=0;k<3;k++)for(let V=0;V<(n?5:8);V++){const q=u(L,.48,1.2+k*.3,.12,d,R*(.55+V*.37),.75-k*.56+V*.12,-.12-k*.04,!0);q.rotation.z=-R*.55}const I=x(L,.16,.55,m,R*2.2,1.7,-.1);I.rotation.z=-R*.8}const M=S(0,5.05,.02);u(M,.76,.85,.7,d,0,0,0),u(M,.53,.25,.45,y,0,-.25,.25);for(const R of[-1,1]){const P=u(M,.22,.07,.08,"#fff89e",R*.18,.04,.4,!0);P.rotation.z=-R*.25;const C=x(M,.17,.95,d,R*.42,.55,0);C.rotation.z=-R*.38}const _=x(M,.16,.63,m,0,-.02,.58);_.rotation.x=Math.PI/2;const h=u(M,.18,.22,.05,"#e7abff",0,.29,.39,!0);h.rotation.z=Math.PI/4;for(let R=-2;R<=2;R++){const P=x(M,.16,.8+Math.abs(R)*.1,d,R*.16,.85,-.08);P.rotation.z=-R*.15}const v=S(-1.15,2.28,.18);u(v,.14,.8,.14,y,0,0,0),u(v,.7,.1,.25,m,0,-.15,0),u(v,.24,2.4,.08,m,0,-1.4,0,!0),v.rotation.z=-.5,e==="itachi"&&(a.forEach(R=>R.visible=!1),s.userData.variant="armored-itachi")}else if(t.model==="kurama"){f(s,0,2.1,-.12,1,1.35,.75,d),f(s,0,3.52,.35,.82,.78,.65,d),f(s,0,3.27,.98,.5,.27,.5,m),f(s,0,3.45,1.31,.19,.13,.13,y);for(const M of[-1,1]){const _=x(s,.39,1.3,d,M*.58,4.3,.14);_.rotation.z=-M*.22,u(s,.27,.1,.09,"#fff5c2",M*.38,3.66,.95,!0),u(s,.045,.14,.045,"#b93237",M*.38,3.66,1.01,!0);const h=u(s,.39,.1,.06,y,M*.48,3.56,.92);h.rotation.z=M*.4;const v=x(s,.08,.25,"#fff2c8",M*.23,3.11,1.18);v.rotation.z=Math.PI;for(let C=0;C<3;C++){const L=u(s,.65,.035,.04,y,M*.62,3.3-C*.12,1.02);L.rotation.z=M*(C-1)*.15}const R=S(M*.9,2.85,.1);f(R,0,-.4,.15,.33,.78,.35,d),f(R,0,-1.04,.33,.43,.22,.44,m),l.push({node:R,side:M,kind:"arm"});const P=S(M*.52,1.1,-.05);f(P,0,-.35,0,.4,.7,.4,d),f(P,0,-.85,.25,.5,.25,.6,m),l.push({node:P,side:M,kind:"leg"});for(let C=0;C<3;C++)x(R,.08,.28,y,(C-1)*.18,-1.19,.65).rotation.x=Math.PI/2}for(let M=0;M<9;M++){const _=(M-4)*.42,h=S(Math.sin(_)*.25,1.6,-.6);h.rotation.y=_,h.userData.tailIndex=M;const v=new i.CatmullRomCurve3([[0,0,0],[0,.5,-.6],[0,1.35,-1.3],[0,2.4,-2.1],[0,3,-3]].map(B=>new i.Vector3(...B))),R=14,P=7,C=new i.TubeGeometry(v,R,.4,P,!1),L=C.attributes.position;for(let B=0;B<=R;B++){const I=v.getPointAt(B/R),k=1-.93*Math.pow(B/R,1.5);for(let V=0;V<=P;V++){const q=B*(P+1)+V,at=new i.Vector3().fromBufferAttribute(L,q).sub(I).multiplyScalar(k).add(I);L.setXYZ(q,at.x,at.y,at.z)}}C.computeVertexNormals(),g(h,C,d,0,0,0,!0),c.push(h)}}else{if(t.model==="saiyan")for(let M=0;M<9;M++){const _=M*Math.PI*2/9,h=x(s,.13,.7,d,Math.sin(_)*.2,2.03,Math.cos(_)*.17);h.rotation.z=-Math.sin(_)*.7,h.rotation.x=Math.cos(_)*.6}if(t.model==="gear5"){for(let M=0;M<7;M++)f(s,Math.sin(M)*.2,1.91+Math.cos(M)*.07,Math.cos(M)*.13,.19,.16,.19,"#fff9ef");for(const M of[-1,1])for(let _=0;_<6;_++)f(s,M*(.35+_*.08),1.2+Math.sin(_)*.13,-.2,.13,.14,.12,"#fff9ef")}if(t.model==="demon"){const M=x(s,.12,.6,m,.19,1.96,.09);M.rotation.z=-.25;for(let _=0;_<6;_++){const h=u(s,.04,.12,.03,y,Math.sin(_)*.23,1.02+_*.09,.2);h.rotation.z=_*.6}}if(t.model==="monster"){s.scale.setScalar(1.65),f(s,0,1.05,0,.42,.5,.29,d);for(const M of[-1,1]){const _=u(s,.06,.65,.06,m,M*.38,1.9,0);_.rotation.z=-M*.5}}if(t.model==="slayer")for(let M=0;M<8;M++){const _=x(s,.12,.5,d,Math.sin(M)*.42,.3+M*.14,Math.cos(M)*.35);_.rotation.z=Math.sin(M)*.4}if(["hero","icefire","awakened"].includes(t.model))for(let M=0;M<8;M++){const _=u(s,.04,.38,.04,t.model==="icefire"&&M%2?"#ff9366":d,Math.sin(M)*.4,.35+M*.17,Math.cos(M)*.28,!0);_.rotation.z=M%2?.5:-.5}}const E=g(s,new i.TorusGeometry(t.model==="susanoo"?1.12:t.model==="kurama"?1:.55,.035,5,28),d,0,.06,0,!0);E.rotation.x=-Math.PI/2;function T(M){for(const h of[...M.children])h.isGroup&&T(h);const _=new Map;for(const h of[...M.children])if(h.isMesh){h.updateMatrix();const v=h.geometry.index?h.geometry.toNonIndexed():h.geometry.clone();v.applyMatrix4(h.matrix),_.has(h.material)||_.set(h.material,[]),_.get(h.material).push(v),M.remove(h),h.geometry.dispose(),r.delete(h.geometry)}for(const[h,v]of _){const R=jn(v,!1);v.forEach(P=>P.dispose()),r.add(R),M.add(new i.Mesh(R,h))}}return T(s),{root:s,wings:a,tails:c,limbs:l,height:t.height||2.3,replaceBody:["susanoo","kurama"].includes(t.model),update(M,{flying:_=!1,moving:h=!1}={}){const v=n?0:M;a.forEach((R,P)=>{R.rotation.y=(P?1:-1)*(_?.18+Math.sin(v*3)*.2:1.25+Math.sin(v*1.3)*.04)}),c.forEach((R,P)=>{R.rotation.y=(P-4)*.42+Math.sin(v*1.8+P*.6)*.09,R.rotation.x=.12+Math.cos(v*1.2+P)*.09}),l.forEach(({node:R,side:P,kind:C})=>{R.rotation.x=_?C==="leg"?.3:-.25:h?Math.sin(v*7+(P<0?Math.PI:0))*(C==="leg"?.3:-.2):0})},dispose(){r.forEach(M=>M.dispose()),o.forEach(M=>M.dispose()),s.clear()}}}function Yg({scene:i,residences:t,camera:e,controls:n,background:s}){let r=null,o=null,a=null;const c=new Map;function l(){if(r===null)return;for(const[g,u]of c)g.visible=u;c.clear(),t.interior(null),i.background=a.background,i.fog=a.fog;const p=o.position.clone().sub(a.anchor);ps(n),e.position.copy(a.position).add(p),e.fov=a.fov,e.updateProjectionMatrix(),n.target.copy(a.target).add(p),n.minDistance=a.min,n.maxDistance=a.max,r=null,o=null,a=null}return{set(p,g){if(p===r){o=g;return}l(),!(p===null||!g)&&(ps(n),a={background:i.background,fog:i.fog,position:e.position.clone(),target:n.target.clone(),anchor:g.position.clone(),fov:e.fov,min:n.minDistance,max:n.maxDistance},r=p,o=g,t.interior(p),i.background=s,i.fog=null,n.minDistance=1.7,n.maxDistance=8,n.target.copy(g.position).y+=1.2,e.position.copy(n.target).add({x:3.2,y:3.4,z:4}),e.fov=58,e.updateProjectionMatrix())},apply(){if(r!==null){i.background=s,i.fog=null;for(const p of i.children)c.has(p)||c.set(p,p.visible),p.visible=!!(p.isLight||p===o||p.userData.residenceLayer||p.userData.officeAbility===r||p.userData.officeRestMats)}},active:()=>r!==null,owner:()=>r,leave:l,dispose:l}}function qg(i,t){const e=new i.Group,n=new i.Group,s=[],r=[];e.visible=!1,e.userData.officeHologram=!0,t.add(e),e.add(n);const o=(T,M)=>{const _=new i.MeshBasicMaterial({color:T,transparent:!0,opacity:M,depthWrite:!1,side:i.DoubleSide});return r.push(_),_},a=o("#77e6ed",.6),c=o("#ddc38c",.85),l=o("#244f69",.18),p=o("#70dfe5",.035),g=new i.PlaneGeometry(2.9,1.6),u=new i.BoxGeometry(1,1,.018),f=new i.TorusGeometry(.48,.014,4,40),x=new i.ConeGeometry(.95,1.6,12,1,!0);s.push(g,u,f,x);const S=new i.Mesh(g,l);n.add(S);const d=new Map([[a,[]],[c,[]]]),m=(T,M,_,h,v=a)=>d.get(v).push({x:T,y:M,w:_,h});for(const T of[-1.45,1.45]){m(T,0,.018,1.6);for(const M of[-.8,.8])m(T-Math.sign(T)*.15,M,.3,.03,c)}m(0,.8,2.9,.012),m(0,-.8,2.9,.012),m(-.55,.42,1.25,.035,c);for(let T=0;T<3;T++)m(-.34,.08-T*.23,1.65-T*.2,.018),m(-1.15,.08-T*.23,.08,.08,c);for(const[T,M]of d){const _=new i.InstancedMesh(u,T,M.length),h=new i.Matrix4;M.forEach((v,R)=>{h.makeScale(v.w,v.h,1),h.setPosition(v.x,v.y,.015),_.setMatrixAt(R,h)}),_.computeBoundingSphere(),n.add(_)}const y=new i.Mesh(f,a);y.rotation.x=-Math.PI/2,y.position.y=-1.1,e.add(y);const E=new i.Mesh(x,p);return E.rotation.z=Math.PI,E.position.y=-.85,e.add(E),{update(T,M,{time:_=0,height:h=1.8,reduced:v=!1}={}){return e.visible=!!T,T?(e.userData.officeAbility!==T.person.id&&e.traverse(R=>{R.isMesh&&(R.userData.officeHologramOwner=T.person.id)}),e.userData.officeAbility=T.person.id,e.position.copy(T.group.position),e.position.y+=h+1.55+(v?0:Math.sin(_*1.4)*.035),n.quaternion.copy(M.quaternion),y.rotation.z=v?0:_*.2,e.position.clone().project(M)):(e.userData.officeAbility=null,null)},hide(){e.visible=!1,e.userData.officeAbility=null},dispose(){t.remove(e),s.forEach(T=>T.dispose()),r.forEach(T=>T.dispose())},root:e}}function Kg({host:i,labels:t,onSelect:e,onFailure:n,onVenue:s=()=>{},onGame:r=()=>{},onDoor:o=()=>{},onPilotState:a=()=>{},onHologramAnchor:c=()=>{},rendererFactory:l=u=>new lu(u),controlsFactory:p=(u,f)=>new fg(u,f),getDate:g=()=>new Date}){const u=new Rh,f=new Cn(36,1,.1,1200),x=l({antialias:!0,alpha:!1,powerPreference:"low-power"});x.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),x.outputColorSpace=un,x.toneMapping=Uo,x.toneMappingExposure=1.18,i.append(x.domElement);const S=p(f,x.domElement);S.enableDamping=!0,S.dampingFactor=.09,S.minDistance=8,S.maxDistance=650,S.minPolarAngle=.32,S.maxPolarAngle=1.28,S.target.set(0,0,0),S.enablePan=!0,S.panSpeed=.7,S.rotateSpeed=.55,S.enableKeys=!1;const d=new Xh("#fbf3dc","#526c61",2.8);u.add(d);const m=new Oa("#fff1cf",3.2);m.position.set(-12,25,15),u.add(m);const y=new Oa("#cce5ef",1.1);y.position.set(15,10,-10),u.add(y);const E=new Map,T=new Map,M=new Set,_=new Set,h=new Map,v=Og(),R=_u({THREE:wa,scene:u,navigation:v,reduced:()=>Tt||it,createModel:(b,D)=>Xg(wa,b,{...D,reduced:Tt||it})}),P=qg(wa,u);let C=null,L=0;const B={base:"#acb9ad",floor:"#f1ece0",edge:"#cebd9c",wood:"#b38b61",woodLight:"#d6b68a",oak:"#705b42",wall:"#e5e3d5",stone:"#c4cec5",deep:"#214b40",green:"#537d60",leaf:"#4a7750",lightLeaf:"#86a465",pot:"#e2d5bb",white:"#f5f0e5",metal:"#3c4d46",gold:"#b89c68",screen:"#173841",screenLine:"#62baaa",rug:"#dbd5bf",sofa:"#9eafa1",pillow:"#d2b48b",black:"#22322d",teal:"#87b6a5",glass:"#9ccfc6"};function I(b){return E.has(b)||E.set(b,new bs({color:B[b]||b,roughness:b==="metal"?.4:.82,metalness:b==="gold"?.45:.02,...b==="glass"?{transparent:!0,opacity:.16,depthWrite:!1,side:ln}:{}})),E.get(b)}const k=new Ke(1.1,.035,2.2);M.add(k);const V=new dl(k,I("#c9b384"),24);V.instanceMatrix.setUsage(ol),V.count=0,V.frustumCulled=!1,u.add(V),V.userData.officeRestMats=!0;const q=new de,at=new xn;function Q(b,D,U,W,X,_t=0,Ft=0,Z=0){let Pt=b;b.index&&(Pt=b.toNonIndexed(),b.dispose()),at.setFromEuler(new Vn(_t,Ft,Z)),Pt.applyMatrix4(new de().compose(new F(U,W,X),at,new F(1,1,1))),T.has(D)||T.set(D,[]),T.get(D).push(Pt)}function z(b,D,U,W,X,_t,Ft,Z=.035,Pt=0){Q(Z>0?new Lo(b,D,U,1,Math.min(Z,b/3,D/3,U/3)):new Ke(b,D,U),Ft,W,X,_t,0,Pt)}function nt(b,D,U,W,X,_t,Ft=b){Q(new In(Ft,b,D,12),_t,U,W,X)}function pt(b,D,U,W,X,_t,Ft){const Z=new wi(1,10,7);Z.scale(b,D,U),Q(Z,Ft,W,X,_t)}function Rt(b,D,U=1){v.addBox(.85*U,.85*U,b,D,"plant",2*U),nt(.4*U,.7*U,b,.35*U,D,"pot",.31*U),nt(.045*U,1.4*U,b,1.2*U,D,"oak");for(let W=0;W<5;W++){const X=W*2.4;pt(.48*U,.52*U,.25*U,b+Math.cos(X)*.3*U,(1.4+W*.15)*U,D+Math.sin(X)*.25*U,W%2?"leaf":"lightLeaf")}}function j(b,D,U,W,X,_t,Ft="#f2e8d5",Z=0){const Pt=document.createElement("canvas");Pt.width=768,Pt.height=192;const re=Pt.getContext("2d");re.clearRect(0,0,768,192),re.fillStyle=Ft,re.textAlign="center",re.font="500 66px Georgia",re.fillText(b,384,88),re.font="20px Arial",re.fillText(D,384,139);const Zt=new Fa(Pt);Zt.colorSpace=un,_.add(Zt);const tt=new Qn({map:Zt,transparent:!0,depthWrite:!1,side:ln}),J=new _i(U,U/4);M.add(J);const Ue=new ve(J,tt);Ue.position.set(W,X,_t),Ue.rotation.y=Z,u.add(Ue),E.set(`sign-${b}`,tt)}z(86,.6,96,0,-.94,28,"base",.3),z(85.5,.14,95.5,0,-.57,28,"#c6d4bc",.18),z(201,.1,115,0,-.25,35,"#a5b99a",.05);for(const b of[-1,1]){z(54,.04,4,b*70,-.17,20,"#e6dfcc",0),z(4,.04,55,b*87,-.17,45,"#e6dfcc",0);for(let D=-20;D<92;D+=8)nt(.08,1.1,b*99,.35,D,"wood"),z(.08,.08,8,b*99,.7,D+4,"wood",0);for(const D of[34,58,80])z(3,.4,.9,b*92,.05,D,"wood",.06),v.addBox(3,.9,b*92,D,"trail-bench",.7),Rt(b*80,D,1);j("SCENIC WALK","BOUNDED EXPLORATION / CAMPUS GATE",7,b*58,1.7,18)}v.addBox(160,40,0,97,"water-boundary",.1),v.configureHomes(!0);for(const b of[-99,99])v.addBox(.2,114,b,35,"scenic-fence",1.2);v.addBox(202,.2,0,91,"scenic-boundary",1.2),z(85,.07,18,0,-.43,67,"#e4cfa5",.1),z(160,.08,48,0,-.64,100,"#6ea6ad",.1);for(let b=0;b<8;b++)z(120-b*8,.02,.13,0,-.57,79+b*2.8,"#c4ddd4",0);z(7,.07,24,0,-.4,60,"#e6dfcc",.1);const ft=zg({scene:u,box:z,cylinder:nt,orb:pt,bake:Q,sign:j,material:I,navigation:v,ownedGeometries:M,materials:E}),Dt=Hg({scene:u,navigation:v,ownedGeometries:M,materials:E,sign:j});for(let b=0;b<8;b++){const D=-36+b*3.7;z(1.5,.25,2.8,D,-.1,67,"white",.1),z(1.4,.17,1,D,.26,66,"sofa",.08),v.addBox(1.5,2.8,D,67,"beach-chair",.6),b%2===0&&(nt(.05,3,D+1.2,1,65,"gold"),Q(new ni(1.8,.6,10),"white",D+1.2,2.7,65),v.addBox(.2,.2,D+1.2,65,"parasol",2.8))}z(19,.15,10,22,-.3,65,"wood",.1),j("LE BELVÉDÈRE","MOUNTAIN TERRACE",9,22,1.6,60.8);for(const b of[16,22,28])nt(1.2,.13,b,.8,63,"white"),nt(.1,1,b,.2,63,"gold"),v.addBox(2.4,2.4,b,63,"terrace-table",.9);for(const b of[-10,-6,-2]){Rt(b,58,.9);for(let D=0;D<4;D++)pt(.15,.2,.15,b+(D-1.5)*.3,.9,58,"#c18b9c")}z(83,.08,4,0,-.44,20,"#e6dfcc",.12),z(6,.08,64,0,-.44,16,"#e6dfcc",.1),z(78,.08,4,0,-.44,35,"#e6dfcc",.1);for(const b of[-41,41])for(const D of[-15,-2,14,31,46])Rt(b,D,1.7),nt(.08,3.2,b+(b<0?1:-1),1.15,D+2,"gold"),pt(.22,.25,.22,b+(b<0?1:-1),2.85,D+2,"white");const Nt=[];function wt(b,D,U,W){v.addBox(U,.12,b,D,"net",W);for(const X of[-U/2,U/2])nt(.055,W,b+X,W/2,D,"white");for(let X=.3;X<=W;X+=.22)z(U,.018,.025,b,X,D,"white",0);for(let X=-U/2;X<=U/2;X+=.4)z(.012,W-.3,.018,b+X,(W+.3)/2,D,"white",0)}function qt(b,D,U=.16){const W=new wi(U,10,8);M.add(W);const X=new ve(W,I(D));X.userData.officeBall=b.id,u.add(X),Nt.push({mesh:X,game:b})}for(const b of Fi){const{x:D,z:U,id:W}=b;if(v.addBox(6,.14,D,U-(b.kind==="court"?6:4.2),"sign",1.2),z(b.kind==="court"?17:10,.12,b.kind==="court"?13:9,D,-.29,U,W==="tennis"?"#a77355":W==="badminton"?"#3b7e77":W==="basketball"?"#b99569":"#dce0ca",.14),z(6,1.1,.12,D,.65,U-(b.kind==="court"?6:4.2),"deep"),j(b.name.toUpperCase(),"RECREATION / AVATAR SIMULATION",5.7,D,.75,U-(b.kind==="court"?5.91:4.11)),W==="tennis"||W==="badminton"||W==="basketball"){for(const X of[-7,7])z(.045,.015,10.8,D+X,-.21,U,"white",0);for(const X of[-5.4,0,5.4])z(14,.015,.045,D,-.21,U+X,"white",0);if(W!=="basketball"){for(const X of[-5.7,5.7])z(.035,.015,10.8,D+X,-.2,U,"white",0);wt(D,U,14,W==="badminton"?1.7:1.15),qt(b,W==="tennis"?"#d9e56b":"white",W==="tennis"?.17:.12)}else{for(const X of[-1,1]){nt(.09,3.6,D,1.5,U+X*5,"metal"),z(2.3,1.35,.13,D,3.1,U+X*4.7,"white");const _t=new mi(.43,.045,6,20);Q(_t,"#c67543",D,2.8,U+X*4.1,Math.PI/2)}qt(b,"#bd6c32",.25)}}else if(W==="golf"){for(const X of[-6.5,6.5])v.addBox(.2,8,D+X,U,"golf-edge",.5);z(13,.12,8,D,-.15,U,"#69885c",.15);for(const X of[-6.5,6.5])z(.2,.35,8,D+X,-.05,U,"woodLight");for(let X=0;X<3;X++)nt(.22,.02,D-4+X*4,-.07,U+(X%2?2:-2),"black"),nt(.025,1.5,D-4+X*4,.65,U+(X%2?2:-2),"gold"),z(.8,.4,.03,D-3.6+X*4,1.25,U+(X%2?2:-2),"#c78362");qt(b,"white",.12)}else if(W==="bowling"){for(const X of[-2.7,2.7])v.addBox(.35,11,D+X,U,"bowling-edge",.4);z(5,.09,11,D,-.13,U,"woodLight");for(const X of[-2.7,2.7])z(.35,.12,11,D+X,-.1,U,"oak");for(let X=0;X<4;X++)for(let _t=0;_t<=X;_t++){const Ft=D+(_t-X/2)*.55,Z=U-2-X*.5;nt(.14,.5,Ft,.17,Z,"white",.08),pt(.13,.14,.13,Ft,.49,Z,"white")}qt(b,"#786397",.28)}else if(W==="arcade")for(const X of[-2.2,2.2]){v.addBox(2.1,1.6,D+X,U,"arcade",2.5),v.addBox(1.2,1.2,D+X,U+2,"seat",.7),z(2.1,2.6,1.6,D+X,1.1,U,"deep",.1),z(1.6,1.1,.05,D+X,1.7,U+.83,"screen");for(let _t=0;_t<5;_t++)z(.05,.6,.02,D+X+(_t-2)*.2,1.7,U+.87,_t%2?"#e8c877":"screenLine",0);nt(.18,.06,D+X,.9,U+1.1,"gold"),z(1.2,.45,1.2,D+X,.2,U+2,"sofa",.1)}else if(W==="archery"){v.addBox(5,.3,D,U-2,"archery-backstop",3.2),z(5,3.2,.25,D,1.2,U-2,"wood");for(let X=0;X<5;X++){const _t=new In(1.1-X*.21,1.1-X*.21,.03,24);Q(_t,["white","#283e49","#73a7bf","#c36f60","gold"][X],D,1.6,U-1.82+X*.035,Math.PI/2)}z(5,.02,.12,D,-.18,U+2.8,"white",0)}else if(W==="darts"){v.addBox(5,.22,D,U-1.8,"dart-board",2.8),z(5,3,.22,D,1.25,U-1.8,"deep");for(let X=0;X<4;X++){const _t=new In(1.05-X*.23,1.05-X*.23,.025,24);Q(_t,X%2?"white":"#bf6f59",D,1.6,U-1.64+X*.025,Math.PI/2)}}else{v.addBox(5.5,3.5,D,U,"game-table",1.3),z(5.5,.25,3.5,D,1,U,W==="pingpong"?"#4c7783":W==="billiards"?"#376a59":"woodLight",.1);for(const X of[-2.2,2.2])for(const _t of[-1.2,1.2])z(.18,1.1,.18,D+X,.4,U+_t,"oak");if(W==="pingpong"&&(wt(D,U,5.5,1.45),qt(b,"white",.1)),W==="uno")for(let X=0;X<16;X++){const _t=X%4;z(.32,.035,.48,D+(_t<2?-1.7+X%4*.3:1.4),1.16+X*.002,U+(_t%2?-.9:.9),["#b85e55","#c7ac54","#4b797d","#719263"][X%4],.02,X*.3)}if(W==="chess")for(let X=0;X<8;X++)for(let _t=0;_t<8;_t++)z(.34,.02,.34,D+(X-3.5)*.34,1.14,U+(_t-3.5)*.34,(X+_t)%2?"deep":"white",0),(_t<2||_t>5)&&nt(.075,.17,D+(X-3.5)*.34,1.24,U+(_t-3.5)*.34,_t<2?"white":"black");if(W==="billiards")for(let X=0;X<10;X++)pt(.12,.12,.12,D+Math.sin(X*2)*1.8,1.25,U+Math.cos(X)*.9,["gold","white","deep"][X%3]);if(W==="foosball")for(let X=0;X<5;X++){z(.045,.045,4.5,D-2+X,1.4,U,"metal",0);for(const _t of[-1,0,1])z(.2,.45,.18,D-2+X,1.48,U+_t,X%2?"#ba7864":"deep")}for(const X of[-1,1])z(4,.35,.8,D,.28,U+X*3.8,"sofa",.1),v.addBox(4,.8,D,U+X*3.8,"bench",.5)}}z(40.5,.6,28,0,-.6,0,"base",.22),z(39.8,.22,27.3,0,-.2,0,"edge",.1),z(39.4,.18,26.9,0,-.04,0,"floor",.08),z(37.8,.04,13.5,0,.07,-5.8,"stone",.05),z(17.3,.055,12.8,-9.5,.1,-5.8,"#dce3d8",.1),z(17.3,.055,12.8,9.5,.1,-5.8,"#d1ddd3",.1);for(let b=-18;b<19;b+=1.9)z(.015,.015,12.4,b,.14,-5.8,"#c3cfbf",0);z(39.4,4.8,.32,0,2.35,-13.25,"wall",.04),z(39.4,.22,.5,0,4.8,-13.25,"gold"),z(8,4.8,.18,0,2.35,-13.02,"deep");for(let b=0;b<21;b++)z(.06,4.6,.1,-3.8+b*.38,2.35,-12.87,"wood",.01);z(6.8,2.2,.16,0,2.8,-12.7,"deep",.04),j("SIMONPR","PEKANBARU  /  CONNECTED WORKSPACE",6.2,0,3.05,-12.59);for(const b of[-15,-10,10,15]){z(4.1,2.9,.15,b,2.6,-13,"glass"),z(4.2,.08,.23,b,4.08,-12.85,"gold"),z(4.2,.12,.3,b,1.12,-12.85,"woodLight");for(const D of[-2,0,2])z(.055,2.9,.2,b+D,2.6,-12.86,"gold",0)}z(.13,2.8,10.8,0,1.55,-6.4,"glass"),z(.08,.08,10.9,0,2.98,-6.4,"gold",0);for(const b of[-11.8,-6.4,-1])z(.08,2.9,.08,0,1.5,b,"gold",0);z(.2,2.7,25.7,-19.5,1.4,-.1,"glass"),z(.22,.08,25.7,-19.5,2.8,-.1,"gold"),z(.2,2.7,25.7,19.5,1.4,-.1,"glass"),z(.22,.08,25.7,19.5,2.8,-.1,"gold"),j("UMUM","PROCUREMENT & COORDINATION",4.4,-10,4.35,-12.65,"#34584b"),j("OPERASIONAL","IDEAS & COLLABORATION",4.9,10,4.35,-12.65,"#34584b");function Le(b,D,U){v.addBox(2.6,1.28,b,D,"desk",2.3),z(2.6,.15,1.28,b,1.31,D,"woodLight",.08);for(const W of[-1.03,1.03])z(.09,1.17,1.02,b+W,.66,D,"white"),z(.45,.08,.94,b+W,.15,D,"metal");z(1,.66,.08,b,1.91,D-.22,"metal"),z(.9,.54,.02,b,1.92,D-.166,"screen");for(let W=0;W<3;W++)z(.28+W*.12,.024,.025,b-.14+W*.04,2.03-W*.1,D-.149,"screenLine",0);nt(.07,.25,b,1.48,D-.2,"metal"),z(.45,.035,.25,b,1.405,D-.19,"metal"),z(.71,.035,.24,b,1.42,D+.32,"white"),nt(.09,.18,b+.9,1.49,D+.12,"deep"),z(.64,.17,.64,b,.66,D+1.02,U==="umum"?"sofa":"teal",.1),z(.65,.7,.12,b,1.08,D+1.33,U==="umum"?"sofa":"teal",.09),nt(.055,.5,b,.35,D+1.05,"metal"),z(.8,.06,.14,b,.15,D+1.05,"metal"),z(.14,.06,.8,b,.15,D+1.05,"metal")}const Wt={umum:[],operasional:[]};for(const b of["umum","operasional"])for(let D=0;D<4;D++)for(let U=0;U<4;U++){const W=(b==="umum"?-15:3.4)+U*3.75,X=-10.3+D*3.15;Wt[b].push([W,.18,X+1.03]),Le(W,X,b)}for(const b of[-18.5,18.5]){z(.7,2.4,4.7,b,1.25,-8.4,"wood");for(let D=0;D<3;D++){z(.86,.06,4.8,b,.65+D*.69,-8.4,"gold");for(let U=0;U<8;U++)z(.5,.38+U%2*.12,.18,b,.88+D*.69,-10.3+U*.5,U%2?"white":"deep")}}z(17.5,.04,10.6,-9,.12,7.2,"rug",.18);for(const b of[4.7,8,11.3]){z(15.8,.45,1.05,-8.7,.57,b,"sofa",.16),z(15.8,.9,.25,-8.7,.91,b-.62,"sofa",.12);for(let D=0;D<8;D++)z(1.72,.17,.95,-15.8+D*2.02,.86,b,D%3===0?"pillow":"sofa",.1);for(const D of[-16.7,-.7])z(.25,.68,1.35,D,.8,b,"sofa",.1)}for(const b of[-11.5,-5]){z(2.7,.13,1.2,b,.64,6.6,"woodLight",.12);for(const D of[-.9,.9])nt(.05,.48,b+D,.37,6.6,"gold");nt(.16,.22,b+.4,.81,6.6,"white")}z(6.8,1.25,.12,-9,1.1,2.85,"white",.06);for(const b of[-11.5,-6.5])nt(.04,.5,b,.32,2.85,"gold");j("THE LOUNGE","GOOD COFFEE. BETTER CONVERSATIONS.",6.4,-9,1.2,2.95,"#527367"),z(10.6,.04,10,11.4,.13,7.3,"#d7c9af",.1),z(9.4,1.28,1.25,12.4,.75,1.6,"deep",.08),z(9.8,.14,1.5,12.4,1.43,1.6,"white",.06);for(let b=0;b<23;b++)z(.055,1.15,.07,7.9+b*.4,.78,2.26,"woodLight",.01);z(1.15,.93,.8,15.3,1.93,1.5,"metal",.09),z(.8,.55,.05,15.3,1.9,1.94,"black"),nt(.18,.24,14.1,1.64,1.5,"white"),nt(.18,.24,13.6,1.64,1.5,"white"),j("LE CAFÉ","RECHARGE & RECONNECT",4.2,12.4,.86,2.37);for(const b of[8,13.8])for(const D of[5.1,9.7]){nt(1.45,.12,b,1.05,D,"woodLight"),nt(.13,.92,b,.55,D,"gold"),nt(.68,.08,b,.12,D,"gold");for(const U of[-1.6,1.6])nt(.42,.14,b+U,.67,D,"deep"),nt(.055,.55,b+U,.34,D,"gold");nt(.18,.22,b+.4,1.22,D,"white"),nt(.22,.04,b-.3,1.14,D+.2,"white")}for(const[b,D,U]of[[-18,-11.6,1.1],[18,-11.6,1.1],[-1.6,-12,.8],[1.6,-12,.8],[-18,1.5,1.1],[18,1.5,1.1],[-18,11.5,1.3],[18,11.5,1.2],[3,3,.9],[3,11,.9]])Rt(b,D,U);v.addBox(39.4,.32,0,-13.25,"wall",4.8),v.addBox(.13,10.8,0,-6.4,"partition",2.9);for(const b of[-19.5,19.5])v.addBox(.2,25.7,b,-.1,"glass-wall",2.8);for(const b of[4.7,8,11.3])v.addBox(16.1,1.5,-8.7,b,"sofa",1.4);v.addBox(6.8,.15,-9,2.85,"lounge-sign",1.8),v.addBox(9.8,1.5,12.4,1.6,"coffee-counter",2.4);for(const b of[8,13.8])for(const D of[5.1,9.7])v.addBox(2.9,2.9,b,D,"cafe-table",1.3);for(const b of[-18.5,18.5])v.addBox(.9,4.8,b,-8.4,"shelf",2.6);for(const b of[-11.5,-5])v.addBox(2.7,1.2,b,6.6,"lounge-table",.8);for(const[b,D]of T){const U=jn(D,!1);D.forEach(W=>W.dispose()),U&&(M.add(U),u.add(new ve(U,I(b))))}T.clear();const Vt=Ig({scene:u,material:I,ownedGeometries:M}),Qt=Yg({scene:u,residences:Vt,camera:f,controls:S,background:new ne("#182c2a")}),ee=Bg({scene:u,materials:E,ownedGeometries:M,sun:m,hemi:d,fill:y,navigation:v}),Et=document.createElement("canvas");Et.width=Et.height=128;const Xt=Et.getContext("2d"),se=Xt.createRadialGradient(64,64,7,64,64,64);se.addColorStop(0,"#16382f35"),se.addColorStop(1,"#16382f00"),Xt.fillStyle=se,Xt.fillRect(0,0,128,128);const Jt=new Fa(Et);_.add(Jt);const me=new _i(66,49);M.add(me);const Me=new Qn({map:Jt,transparent:!0,depthWrite:!1});E.set("shadow",Me);const Fe=new ve(me,Me);Fe.rotation.x=-Math.PI/2,Fe.position.y=-.98,u.add(Fe);const ge=new Map,Ge=new Map;function H(b){if(Ge.has(b))return Ge.get(b);const D=[];if(b==="archery"){const W=new mi(.34,.025,5,16,Math.PI);W.rotateZ(-Math.PI/2),D.push(W.toNonIndexed()),W.dispose();const X=new Ke(.035,.035,.85);X.translate(0,0,.1),D.push(X.toNonIndexed()),X.dispose()}else{const W=new In(.017,.03,b==="billiards"?1.65:1,6);W.rotateX(Math.PI/2),D.push(W.toNonIndexed()),W.dispose()}const U=jn(D,!1);return D.forEach(W=>W.dispose()),M.add(U),Ge.set(b,U),U}function ae(b,D,U,W,X){const _t=D+U.join(":");if(!ge.has(_t)){const Z=D==="sphere"?new wi(U[0],10,8):new Lo(...U,1,.06);ge.set(_t,Z),M.add(Z)}const Ft=new ve(ge.get(_t),I(W));return Ft.position.set(...X),b.add(Ft),Ft}const Se=["#547a71","#557591","#ad8a62","#856c8c","#6f8362","#9e7270"],ye=new Map,bt=new bs({vertexColors:!0,roughness:.8});E.set("costume-vertex",bt);function Pe(b){const D=new yn;u.add(D);const U=Dl(b.avatar),W=Su(U.costume),X=(W?.style||U.style)==="feminine",_t=W?.shirt||{emerald:"#547a71",navy:"#405978",rose:"#b97988",cream:"#d3bc96",lavender:"#9682ae",terracotta:"#bb8265"}[U.color]||Se[b.id%Se.length],Ft=new yn;D.add(Ft);const Z={light:"#efd0ae",warm:"#dba77d",tan:"#bc8762",deep:"#895e46"}[U.skin],Pt=U.hair==="hijab"?_t:"#352c32";if(ae(Ft,"box",[X?.43:.5,.65,.33],_t,[0,1.17,0]).userData.avatarCloth=!0,!W&&U.outfit==="blazer"){ae(Ft,"box",[.15,.42,.035],"white",[0,1.29,.18]);for(const Ne of[-1,1]){const He=ae(Ft,"box",[.07,.32,.035],"gold",[Ne*.12,1.33,.19]);He.rotation.z=Ne*.25}}!W&&U.outfit==="sport"&&ae(Ft,"box",[.32,.055,.02],"white",[0,1.3,.18]);const re=!W&&U.outfit==="dress"?ae(Ft,"box",[.6,.4,.44],_t,[0,.79,0]):null,Zt=new yn;if(Zt.position.y=1.69,Ft.add(Zt),ae(Zt,"box",[.43,.46,.4],Z,[0,0,0]),W){const Ne=new ve(Bc(W,"head",ye,M),bt),He=new ve(Bc(W,"body",ye,M),bt);Ne.userData.costumePart="head",He.userData.costumePart="body",Zt.add(Ne),Ft.add(He)}else{const Ne="hair:"+U.hair;if(!ge.has(Ne)){const He=[[.47,.18,.44,0,.21,-.02],[.45,U.hair==="long"||U.hair==="hijab"?.67:.3,.12,0,U.hair==="long"||U.hair==="hijab"?-.12:.07,-.2]];if(U.hair!=="short")for(const Ui of[-1,1])He.push([.09,U.hair==="bob"?.4:.53,.32,Ui*.235,-.01,-.03]);const Qi=He.map(([Ui,hu,uu,fu,du,pu])=>{const ta=new Ke(Ui,hu,uu);ta.translate(fu,du,pu);const mu=ta.toNonIndexed();return ta.dispose(),mu}),ji=jn(Qi,!1);Qi.forEach(Ui=>Ui.dispose()),ge.set(Ne,ji),M.add(ji)}Zt.add(new ve(ge.get(Ne),I(Pt)))}if(!W&&U.hair==="ponytail"&&ae(Zt,"box",[.24,.53,.22],Pt,[0,-.02,-.35]),!W&&U.hair==="hijab"&&ae(Ft,"box",[.58,.18,.43],Pt,[0,1.44,-.04]),!ge.has("eyes")){const Ne=[-.095,.095].map(Qi=>{const ji=new Ke(.035,.045,.025);ji.translate(Qi,.035,.205);const Ui=ji.toNonIndexed();return ji.dispose(),Ui}),He=jn(Ne,!1);Ne.forEach(Qi=>Qi.dispose()),ge.set("eyes",He),M.add(He)}const tt=new ve(ge.get("eyes"),I("#263833"));Zt.add(tt);const J=[tt];if(ae(Zt,"box",[.09,.02,.025],X?"#b96f78":"#9c6d58",[0,-.105,.21]),X)for(const Ne of[-.14,.14])ae(Zt,"box",[.065,.025,.02],"#d39589",[Ne,-.065,.21]);if(U.accessory==="glasses"){for(const Ne of[-1,1])ae(Zt,"box",[.15,.11,.025],"gold",[Ne*.105,.04,.224]),ae(Zt,"box",[.11,.07,.025],Z,[Ne*.105,.04,.24]);ae(Zt,"box",[.08,.025,.02],"gold",[0,.05,.24])}if(U.accessory==="headphones"){ae(Zt,"box",[.53,.08,.28],"gold",[0,.32,-.02]);for(const Ne of[-1,1])ae(Zt,"box",[.12,.2,.18],"deep",[Ne*.28,.07,0])}const Ue=[];for(const Ne of[-.34,.34]){const He=new yn;He.position.set(Ne,1.42,0),Ft.add(He),ae(He,"box",[.17,.4,.2],_t,[0,-.19,0]).userData.avatarCloth=!0,ae(He,"box",[.15,.27,.16],Z,[0,-.45,.05]),Ue.push(He)}const nn=[],vn=[];for(const Ne of[-.14,.14]){const He=new yn;He.position.set(Ne,.83,0),Ft.add(He),ae(He,"box",[.18,.64,.2],W?.pants||"#35463f",[0,-.32,0]).userData.avatarCloth=!0,vn.push(ae(He,"box",[.23,.14,.34],W?.accent||(U.outfit==="sport"?"white":"#24352f"),[0,-.7,.07])),nn.push(He)}const pe=ae(Ue[1],"sphere",[.12],"white",[0,-.49,.14]),_e=ae(Ue[0],"box",[.35,.045,.24],"white",[0,-.43,.23]),An=new yn;Ue[1].add(An),An.position.set(0,-.48,.16),ae(An,"box",[.04,.44,.05],"gold",[0,-.14,0]);const sn=new mi(.24,.025,6,16);M.add(sn),An.add(new ve(sn,I("white"))),An.rotation.x=Math.PI/2;const he=new ve(H("billiards"),I("gold"));he.position.set(0,-.48,.35),Ue[1].add(he),he.visible=!1;const je=new sr(.5,.59,24);M.add(je);const Si=new Qn({color:"#c5a061",side:ln});E.set(`ring-${b.id}`,Si);const cn=new ve(je,Si);cn.rotation.x=-Math.PI/2,cn.position.y=.02,D.add(cn),cn.visible=!1;const Yt=document.createElement("button");Yt.type="button",Yt.className="vo-avatar-label",Yt.setAttribute("aria-pressed","false");const mn=document.createElement("i"),ri=document.createElement("span"),$i=document.createElement("small");Yt.append(mn,ri,$i),t.append(Yt);const Ni=document.createElement("span");return Ni.className="vo-speech",Ni.hidden=!0,Yt.append(Ni),Yt.addEventListener("click",()=>e(b.id)),D.traverse(Ne=>{Ne.isMesh&&(Ne.userData.personId=b.id)}),{group:D,body:Ft,head:Zt,arms:Ue,legs:nn,shoes:vn,eyes:J,skirt:re,cup:pe,plate:_e,racket:An,tool:he,bubble:Ni,label:Yt,dot:mn,name:ri,icon:$i,ring:cn,person:b,appearance:JSON.stringify(b.avatar),privateGeometry:sn,target:new F,phase:b.id*1.75}}let zt=null,Tt=!1,N=!0,w=!1,Y=null,ht=0,lt=0,St=null,dt=[],rt=null,ot=null,ut=null,O="orbit",st=null,it=!1,yt={};const mt=new Map,xt=new Map;let Ut=null,Mt=null,ct=null,gt=null,$t={},Ct=a,ue=null,ke=()=>!1,De=null,Re=null,Ee=null,si=null,Wn=!1,Ji=null,bn=!1,vi=null;const ws=new sr(1.2,1.4,32);M.add(ws);const Rs=new Qn({color:"#e9be69",side:ln,transparent:!0,opacity:.85});E.set("pilot-guide",Rs);const En=new ve(ws,Rs);En.rotation.x=-Math.PI/2,En.visible=!1,En.userData.pilotGuide=!0,u.add(En);const Nn=new Map,Cs=[],Mi={bar:[-32,-.12,49],disco:[-33,-.12,56],beach:[-35,-.12,69],garden:[-8,-.12,61],terrace:[17,-.12,67],lounge:[-14,.12,10]},Ie=new F,Ve=new F;let Be=!1;function Tn(b){Mt&&ct&&!b.some(tt=>tt.id===Mt)&&(b=[...b,{...ct,home_slot:Ee?.slot??ct.home_slot}]),v.configureHomes(!0,Wn?Ee?.slot:null,Math.max(Ji??0,b.length,...b.map(tt=>(tt.home_slot??-1)+1))),dt=b,Vt.sync(b),ee.extent(Vt.bounds().back);const D=b.map(tt=>{if(!ut?.connected||!ut.room||![ut.room.from,ut.room.to].includes(tt.id)){const J=b.find(Ue=>Ue.is_me)?.id;return ut&&!ut.connected&&(tt.id===J||tt.meeting_with===J)?{...tt,meeting_with:null,meeting_spot:null}:tt}return{...tt,state:"online",meeting_with:ut.room.from===tt.id?ut.room.to:ut.room.from,meeting_spot:ut.room.spot}}),U=tt=>tt.id===zt||tt.id===st||tt.is_me||Ut&&[Ut.from,Ut.to].includes(tt.id),W=[...D].sort((tt,J)=>+!!U(J)-+!!U(tt)||+!!J.meeting_with-+!!tt.meeting_with||{online:0,idle:1,offline:2}[tt.state]-{online:0,idle:1,offline:2}[J.state]||tt.id-J.id),X=[],_t={umum:0,operasional:0},Ft=[],Z=new Map;let Pt=0,re=0;for(const tt of W){if(X.length>=24)break;tt.state==="online"&&_t[tt.department]>=16||(X.push(tt),tt.state==="online"&&_t[tt.department]++)}const Zt=new Set(X.map(tt=>tt.id));for(const[tt,J]of h)(!Zt.has(tt)||J.appearance!==JSON.stringify(X.find(Ue=>Ue.id===tt)?.avatar))&&(R.forget(tt),u.remove(J.group),J.label.remove(),J.ring.geometry.dispose(),M.delete(J.ring.geometry),J.privateGeometry.dispose(),M.delete(J.privateGeometry),J.ring.material.dispose(),E.delete(`ring-${tt}`),h.delete(tt));_t.umum=_t.operasional=0;for(const tt of X){let J=h.get(tt.id),Ue=!J;J||(J=Pe(tt),h.set(tt.id,J));const nn=J.game?.id,vn=J.pose,pe=J.home?.clone(),_e=tt.in_office===!1&&tt.state!=="offline",An=_e?null:Nn.get(tt.id)||tt.pilot,sn=tt.id===Mt&&gt?gt.state():An;J.person=tt,J.pose=vu(tt,g());let he;J.game=Mu(tt,g());const je=_e?null:mt.get(tt.id)||tt.recreation,Si=!_e&&Ut&&Ut.status!=="pending"&&[Ut.from,Ut.to].includes(tt.id);Si?(J.game=Fi.find(Yt=>Yt.id===Ut.kind)||J.game,J.pose="playing"):je?.kind==="game"&&je.until>Date.now()/1e3&&tt.state!=="offline"&&(J.game=Fi.find(Yt=>Yt.id===je.destination)||J.game,J.pose="playing");const cn=je&&(!je.until||je.until>Date.now()/1e3)&&Mi[je.destination];if(J.destination=!!cn,cn&&!Si&&tt.state!=="offline"){J.pose=je.kind==="drink"?"coffee":je.kind==="food"?"eating":je.kind==="dance"?"dancing":"resting",he=[cn[0]+tt.id%5*1.6,cn[1],cn[2]+Math.floor(tt.id%10/5)*1.3];const Yt=v.nearest({x:he[0],z:he[2]});Yt&&(he=[Yt.x,he[1],Yt.z]),J.group.rotation.y=Math.PI}else if(!_e&&tt.meeting_with&&Number.isInteger(tt.meeting_spot)&&!Si){J.pose="meeting";const Yt=tt.id<tt.meeting_with?-1:1;he=[-36+tt.meeting_spot*6.5+Yt*.9,-.12,20],J.facing=Yt<0?Math.PI/2:-Math.PI/2}else if(J.pose==="working")he=Wt[tt.department][_t[tt.department]++],J.group.rotation.y=Math.PI;else if(J.pose==="playing"){const Yt=Z.get(J.game.id)||0;Z.set(J.game.id,Yt+1);const mn=Yt%2?1:-1;he=[J.game.x+(J.game.kind==="court"?mn*(3-Math.floor(Yt/2)%3*1.7):Math.floor(Yt/2)*.8),-.12,J.game.z+mn*(J.game.kind==="court"?3.6:2.5)],J.group.rotation.y=mn<0?0:Math.PI}else if(J.pose==="sleeping")he=Vt.bed(tt.id),J.group.rotation.y=0;else if(J.pose==="resting"){const Yt=Pt++;he=[-15.8+Yt%8*2.02,.12,4.7+Math.floor(Yt/8)*3.3],J.group.rotation.y=0}else if(re<8){const Yt=re++,mn=Yt%4,ri=Yt<4?1:-1;he=[(mn%2?13.8:8)+ri*1.65,.08,mn<2?5.1:9.7],J.group.rotation.y=ri*Math.PI/2}else{const Yt=Pt++;he=[-15.8+Yt%8*2.02,.12,4.7+Math.floor(Yt/8)*3.3],J.group.rotation.y=0}if(J.pose==="playing"&&J.game.id==="darts"&&(he=[J.game.x+(tt.id%2?-1:1)*1.2,-.12,J.game.z+2.5]),["playing","meeting"].includes(J.pose)&&!v.free(he[0],he[2])){const Yt=v.nearest({x:he[0],z:he[2]});Yt&&(he=[Yt.x,he[1],Yt.z])}if((J.pose==="playing"||cn)&&Ft.some(Yt=>Math.hypot(Yt[0]-he[0],Yt[2]-he[2])<.7))t:for(const Yt of[.8,1.5,2.2])for(let mn=0;mn<12;mn++){const ri=he[0]+Math.cos(mn*Math.PI/6)*Yt,$i=he[2]+Math.sin(mn*Math.PI/6)*Yt;if(v.free(ri,$i)&&!Ft.some(Ni=>Math.hypot(Ni[0]-ri,Ni[2]-$i)<.7)){he=[ri,he[1],$i];break t}}if(sn&&tt.state!=="offline"?(he=[sn.x,sn.y,sn.z],J.pose="manual",J.manual=!0,J.group.rotation.y=sn.yaw,J.waypoints=[]):J.manual=!1,Ft.push(he),J.target.set(...he),J.home=J.target.clone(),(Ue||J.manual&&tt.id===Mt||vn!==J.pose&&J.pose!=="meeting"&&!cn&&!Si)&&J.group.position.copy(J.target),!J.manual&&!Ue&&(J.pose==="playing"&&(nn!==J.game.id||vn!=="playing")||(cn||J.pose==="meeting")&&(!pe||pe.distanceTo(J.home)>.1))){if(!v.free(J.group.position.x,J.group.position.z)){const Yt=v.nearest(J.group.position)||v.nearest({x:0,z:21.5});Yt&&J.group.position.set(Yt.x,he[1],Yt.z)}J.waypoints=v.withHomeAccess(Vt.slotFor(tt.id),()=>v.path(J.group.position,J.home)).map(Yt=>new F(Yt.x,he[1],Yt.z))}else!["playing","meeting"].includes(J.pose)&&!cn&&(J.waypoints=[]);Tt&&J.pose==="meeting"&&(J.group.position.copy(J.home),J.group.rotation.y=J.facing,J.waypoints=[]),J.dot.className=`vo-dot ${tt.state}`,J.name.textContent=tt.name,J.icon.textContent=`${tt.state==="offline"?"OFFLINE ":tt.state==="idle"?"JEDA ":"ONLINE "}${J.pose==="meeting"?"💬":J.pose==="sleeping"?"☾ RUMAH":J.pose==="playing"?J.game.icon:J.pose==="coffee"?"☕":""}`,Si&&Ut.bot&&tt.id===Ut.to&&(J.icon.textContent="OFFLINE · NPC "+J.game.icon),J.pose==="dancing"&&(J.icon.textContent=(tt.state==="idle"?"JEDA":"ONLINE")+" · ÉCLIPSE ♫"),J.label.setAttribute("aria-label",`${tt.name}, ${tt.state==="online"?"online":tt.state==="idle"?"jeda di aplikasi":"tidak online"}. Lihat detail anggota.`),J.cup.visible=J.pose==="coffee",J.plate.visible=J.pose==="eating",J.manual&&(J.cup.visible=sn.action==="drink",J.plate.visible=sn.action==="eat",J.icon.textContent=(tt.private?"PRIVAT · ":"ONLINE · ")+(sn.action==="run"?"BOOST":sn.action==="jump"?"LOMPAT":"KENDALI SENDIRI")),J.racket.visible=J.pose==="playing"&&["tennis","badminton","pingpong","golf"].includes(J.game.id),J.tool.visible=J.pose==="playing"&&["billiards","archery","darts"].includes(J.game.id),J.tool.visible&&(J.tool.geometry=H(J.game.id)),J.shoes.forEach(Yt=>{Yt.visible=J.pose!=="sleeping"}),J.manual||J.eyes.forEach(Yt=>{Yt.scale.y=J.pose==="sleeping"?.18:1}),J.ring.visible=zt===tt.id,J.label.setAttribute("aria-pressed",String(zt===tt.id))}Vt.select(rt??(h.get(zt)?.pose==="sleeping"?zt:null)),A()}const Xn=new F;function jo(){const b=i.getBoundingClientRect(),D=[];for(const U of[...h.values()].sort((W,X)=>+(X.person.id===zt)-+(W.person.id===zt))){if(U.pose==="sleeping"){const re=Vt.location(U.person.id);Xn.set(re.x,5.2,re.z+1)}else U.group.getWorldPosition(Xn),Xn.y+=(R.form(U.person.id)?.height||1.8)+.55;Xn.project(f);const W=(Xn.x+1)/2*b.width,X=(1-Xn.y)/2*b.height;if(Qt.active()&&U.person.id!==Mt){U.label.hidden=!0;continue}const _t=166,Ft=27,Z=D.some(re=>Math.abs(re.x-W)<_t&&Math.abs(re.y-X)<Ft),Pt=Xn.z<1&&Xn.z>-1&&W>18&&W<b.width-18&&X>15&&X<b.height-65&&(!Z||U.person.id===zt);U.label.hidden=!Pt,Pt&&(U.label.style.transform=`translate(${W}px,${X}px) translate(-50%,-100%)`,D.push({x:W,y:X}))}}function Ps(b=0){if(Y=null,w||!N)return;if(b-ht<1e3/30&&!Tt){Y=requestAnimationFrame(Ps);return}const D=Math.min(.06,Math.max(.001,(b-ht)/1e3));ht=b,Be&&(f.position.lerp(Ve,.12),S.target.lerp(Ie,.12),f.position.distanceTo(Ve)<.04&&(f.position.copy(Ve),S.target.copy(Ie),Be=!1));let U=0;for(const Z of h.values()){const Pt=Tt?0:b/1e3+Z.phase;if(Z.person.id===Mt&&gt){const tt=Math.atan2(f.position.x-S.target.x,f.position.z-S.target.z),J=[...h.values()].filter(_e=>_e!==Z&&_e.pose!=="sleeping").map(_e=>_e.group.position),Ue=ke();let nn=Ue?{}:$t;if((nn.x||nn.z||nn.jump)&&(Re=null,De=null),Re&&(Re.elapsed=(Re.elapsed||0)+D),Re?.elapsed>4&&(Re=null,Ct({...gt.state(),restBlocked:!0})),Re&&!Ue){const _e=gt.state();if(_e.grounded)if(Re.point||(Re.point=zc(v,_e,Re.pose,J)),!Re.point)Re=null;else{const An=Re.point.x-_e.x,sn=Re.point.z-_e.z,he=Math.hypot(An,sn);if(he<.04)gt.face({x:_e.x+Math.sin(Re.point.yaw),z:_e.z+Math.cos(Re.point.yaw)}),De={action:"rest",pose:Re.pose,venue:ki(_e,Ee)?"home":["beach","garden","terrace","lounge","bar"].find(je=>Nr(_e,je))||"campus"},Re=null,nn={};else{const je=Math.min(1,he/(4.5*D))/he;nn={x:(Math.cos(tt)*An-Math.sin(tt)*sn)*je,z:(-Math.sin(tt)*An-Math.cos(tt)*sn)*je}}}}const vn=R.modeState(Mt);(vn?.id||null)!==vi&&(vi=vn?.id||null,vt("follow",Mt)),gt.setForm(R.form(Mt),vn?.expires);const pe=gt.step(D,nn,tt,J);if(["walk","run","jump","fly","land"].includes(pe.action)&&(De=null),De&&Object.assign(pe,De),pe.transformation=vn,pe.transformationCooldown=R.modeCooldown(Mt),pe.restPending=!!Re,Z.group.position.set(pe.x,pe.y,pe.z),Z.group.rotation.y=pe.yaw,Z.manual=!0,Z.pose="manual",Z.home.copy(Z.group.position),Z.target.copy(Z.group.position),ue){const _e=ue==="home"&&Ee?{x:Ee.x,z:Ee.z+5}:Jn.venues[ue];_e&&(pe.target=ue,pe.distance=Math.round(Math.hypot(pe.x-_e.x,pe.z-_e.z)))}if(pe.atHome=ki(pe,Ee),pe.nearDoor=!!(Ee&&Math.hypot(pe.x-Ee.x,pe.z-Ee.z-3.9)<=2.8),pe.doorOpen=Wn,Ee){const _e=ki(pe,Ee);_e!==Qt.active()&&($(),Be=!1,Vt.select(_e?si:null),_e&&(O="follow",st=Mt,S.enablePan=!1)),Qt.set(_e?si:null,_e?Z.group:null),pe.interior=_e}else pe.interior=!1;Ct({...pe,interior:Qt.active()}),Z.icon.textContent=(Z.person.private?"PRIVAT · ":"ONLINE · ")+(pe.action==="run"?"BOOST":pe.action==="jump"?"LOMPAT":"KENDALI SENDIRI")}if(Z.manual){const tt=Z.person.id===Mt&&gt?{...gt.state(),...De||{}}:Nn.get(Z.person.id)||Z.person.pilot;if(tt&&Z.person.id!==Mt){const pe=new F(tt.x,tt.y,tt.z),_e=Z.group.position.clone().lerp(pe,.35);v.segment(Z.group.position,_e)?Z.group.position.copy(_e):Z.group.position.copy(pe),Z.group.rotation.y=tt.yaw}Z.person.id!==Mt&&R.observe(Z.person.id,tt,Z),Z.flight=!!tt?.flight,Z.moving=["walk","run"].includes(tt?.action);const J=R.pose(Z.person.id),Ue=Vg(Z,J&&!["walk","run","jump","fly","land","rest"].includes(tt?.action)?{...tt,action:"cast",skillPose:J}:tt,{time:b/1e3+Z.phase,dt:D,reduced:Tt}),nn=tt?.action==="play"?Fi.find(pe=>pe.id===tt.venue):null;Z.racket.visible=!!(nn&&["tennis","badminton","pingpong","golf"].includes(nn.id)),Z.tool.visible=!!(nn&&["billiards","archery","darts"].includes(nn.id)),Z.tool.visible&&(Z.tool.geometry=H(nn.id)),Z.cup.visible=tt?.action==="drink",Z.plate.visible=tt?.action==="eat",tt?.action==="rest"&&(Z.icon.textContent=tt.pose==="nap"?"ONLINE · TIDUR SANTAI":tt.pose==="recline"?"ONLINE · REBAHAN":tt.pose==="meditate"?"ONLINE · MEDITASI":"ONLINE · BERSANTAI");const vn=R.form(Z.person.id);vn&&(Z.icon.textContent=(Z.person.private?"PRIVAT · ":"ONLINE · ")+vn.name+(tt?.flight?" · TERBANG":"")),Ue.lying&&(!Qt.active()||Z.person.id===Mt)&&(q.compose(new F(Z.group.position.x+Math.sin(Z.group.rotation.y)*.7,Z.group.position.y+.035,Z.group.position.z+Math.cos(Z.group.rotation.y)*.7),Z.group.quaternion,new F(1,1,1)),V.setMatrixAt(U++,q));continue}R.clearForm(Z.person.id);const re=Z.pose==="playing",Zt=!Tt&&(re||Z.waypoints?.length>0);if(Z.target.copy(Z.home),re&&!Z.waypoints?.length&&(Z.target.x+=Math.sin(Pt*.65)*(Z.game.kind==="court"?1.4:.18),Z.target.z+=Math.cos(Pt*.5)*(Z.game.kind==="court"?.3:.08)),Z.waypoints?.length&&!Tt){const tt=Z.waypoints[0];Z.group.position.distanceTo(tt)<.015?Z.waypoints.shift():(Z.group.rotation.y=Math.atan2(tt.x-Z.group.position.x,tt.z-Z.group.position.z),G(Z,tt,D*3.2))}else re?G(Z,Z.target,Tt?0:D*1.4):Z.pose==="meeting"?(G(Z,Z.home,Tt?0:D*3.2),Z.group.rotation.y=Z.facing):Z.group.position.copy(Z.home);Z.legs.forEach((tt,J)=>{tt.rotation.x=Zt?Math.sin(Pt*4+J*Math.PI)*.32:Z.pose==="working"||Z.pose==="resting"?-1.1:0}),Z.body.position.y=Math.sin(Pt*1.6)*(Tt?0:Z.pose==="sleeping"?.007:.018),Z.body.rotation.x=Z.pose==="sleeping"?-Math.PI/2:0,Z.body.rotation.z=re?Math.sin(Pt*1.5)*.07:0,Z.head.rotation.x=Z.pose==="sleeping"?0:Math.sin(Pt*.6)*(Tt?0:.025),Z.arms[0].rotation.x=Z.pose==="working"?-.65+Math.sin(Pt*5)*(Tt?0:.045):Z.pose==="eating"?-1.05:.1,Z.arms[1].rotation.x=Z.pose==="working"?-.65+Math.sin(Pt*5+1)*(Tt?0:.045):Z.pose==="coffee"?-1.2+Math.sin(Pt*1.2)*(Tt?0:.13):Z.pose==="eating"?-.8+Math.sin(Pt*2)*(Tt?0:.13):.1,re&&(Z.arms[1].rotation.x=-.6+Math.sin(Pt*2.3)*(Tt?0:.7),Z.arms[0].rotation.x=-.25+Math.sin(Pt*2.3+1)*(Tt?0:.25)),Z.pose==="dancing"&&!Zt&&(Z.body.rotation.z=Tt?0:Math.sin(Pt*2.4)*.13,Z.arms.forEach((tt,J)=>{tt.rotation.x=-.8+Math.sin(Pt*2.4+J)*(Tt?0:.5)}),Z.legs.forEach((tt,J)=>{tt.rotation.x=Tt?0:Math.sin(Pt*2.4+J*Math.PI)*.25})),Z.pose==="meeting"?(Z.arms[1].rotation.x=-.2+Math.sin(Pt*1.7)*(Tt||Zt?0:.18),Z.head.rotation.y=Math.sin(Pt*.7)*(Tt?0:.06)):Z.head.rotation.y=0}V.count=U,V.instanceMatrix.needsUpdate=!0,R.update(Date.now(),gt?.state());const W=h.get(st);if(O!=="orbit"&&W&&!Be){const Pt=W.group.position.clone().add(new F(0,R.form(st)?.height*.55||(W.pose==="sleeping"?.25:1.3),W.pose==="sleeping"?-1.3:0)).clone().sub(S.target).multiplyScalar(.25);S.target.add(Pt),f.position.add(Pt)}ee.update(b,{paused:Tt,dark:document.documentElement.classList.contains("dark"),center:S.target}),ft.update(b,{paused:Tt,energySaver:it}),Dt.update(b,Tt);for(const{mesh:Z,game:Pt}of Nt){const re=Tt?0:b/1e3,tt=[...h.values()].some(J=>J.manual?(J.person.id===Mt?De:Nn.get(J.person.id)||J.person.pilot)?.action==="play"&&(J.person.id===Mt?De:Nn.get(J.person.id)||J.person.pilot)?.venue===Pt.id:!yu(g())&&J.pose==="playing"&&J.game.id===Pt.id)?Math.sin(re*1.8):0;Z.position.set(Pt.x+(Pt.id==="golf"?tt*4:tt*1.5),Pt.id==="pingpong"?1.45+Math.abs(tt)*.65:Pt.id==="basketball"?.15+Math.abs(tt)*2.2:Pt.id==="bowling"||Pt.id==="golf"?.06:.4+Math.abs(tt)*2,Pt.z+tt*(Pt.kind==="court"?4:1.3))}S.update();const X=f.position.clone(),_t=f.quaternion.clone();O!=="orbit"&&W&&f.position.copy(kg(v,S.target,X,Vt.cameraBoxes(st),Qt.active()?1.7:R.form(st)?.height*.85||(O==="portrait"?2.8:3.8),Qt.active()?8:R.form(st)?55:35)),f.lookAt(S.target),f.updateMatrixWorld(!0),St?St.copy(f):St=f.clone();const Ft=P.update(h.get(C),f,{time:b/1e3,height:R.form(C)?.height||1.8,reduced:Tt||it});(Tt||b-L>100)&&(c(Ft?{x:(Ft.x+1)/2*i.clientWidth,y:(1-Ft.y)/2*i.clientHeight,visible:Ft.z>-1&&Ft.z<1&&Math.abs(Ft.x)<1&&Math.abs(Ft.y)<1}:null),L=b),Qt.apply(),x.render(u,f),(Tt||b-lt>120||Be)&&(jo(),lt=b),f.position.copy(X),f.quaternion.copy(_t),f.updateMatrixWorld(!0),(!Tt||Be||Re||gt?.moving()||gt&&gt.state().stamina<100||!ke()&&(Math.abs($t.x||0)+Math.abs($t.z||0)>0||$t.jump))&&A()}function A(){!w&&N&&Y===null&&(Y=requestAnimationFrame(Ps))}function G(b,D,U){const W=Vt.location(b.person.id),X=W&&Math.abs(b.group.position.x-W.x)<4.8&&Math.abs(b.group.position.z-W.z)<5;return!!X!=!!b.npcDoorOpen&&(b.npcDoorOpen=!!X,Vt.setDoor(b.person.id,!!X)),v.withHomeAccess(Vt.slotFor(b.person.id),()=>et(b,D,U))}function et(b,D,U){const W=v.move(b.group.position,D,U),X=Math.hypot(W.x-b.group.position.x,W.z-b.group.position.z),_t=[...h.values()].some(Ft=>Ft!==b&&Ft.pose!=="sleeping"&&Math.hypot(W.x-Ft.group.position.x,W.z-Ft.group.position.z)<.62);if(_t||b.group.position.set(W.x,b.home.y,W.z),(_t||X<.001&&b.group.position.distanceTo(D)>.2)&&ht>=(b.repathAt||0)&&(b.pose==="meeting"||b.waypoints?.length)){b.repathAt=ht+1500;const Ft=[...h.values()].filter(Pt=>Pt!==b&&Pt.pose!=="sleeping").map(Pt=>Pt.group.position),Z=v.path(b.group.position,b.home,Ft);Z.length&&(b.waypoints=Z.map(Pt=>new F(Pt.x,b.home.y,Pt.z)))}}function K(){if(w)return;const b=i.getBoundingClientRect();b.width<1||b.height<1||(x.setSize(b.width,b.height,!1),f.aspect=b.width/b.height,f.updateProjectionMatrix(),A())}function $(b=!0){rt=null;const D=ot;if(ot=null,!D||(Vt.select(null),!b))return;ps(S);const U=h.get(D.followId)?.group.position,W=D.anchor&&U?U.clone().sub(D.anchor):new F;O=D.mode,st=D.followId,S.enablePan=D.pan,S.minDistance=D.min,S.maxDistance=D.max,f.fov=D.fov,f.updateProjectionMatrix(),f.position.copy(D.position).add(W),S.target.copy(D.target).add(W),Ie.copy(D.focus).add(W),Ve.copy(D.goal).add(W),Be=D.easing}function At(b="all"){if(Qt.active()){vt("follow",Mt);return}$(!1),ps(S),O="orbit",st=null,f.fov=36,f.updateProjectionMatrix(),S.enablePan=!0,S.minDistance=8,S.maxDistance=650;const D=i.clientWidth<600,U={all:[[0,0,14],[86,90,125]],office:[[0,0,0],[34,31,42]],umum:[[-9,.5,-5],[11,22,22]],operasional:[[9,.5,-5],[28,21,24]],lounge:[[-3,.4,7],[17,23,31]],park:[[0,0,28],[56,65,96]]};for(const _t of Fi)U[_t.id]=[[_t.x,.3,_t.z],[_t.x+14,19,_t.z+22]];for(const[_t,Ft]of Object.entries(Mi))U[_t]=[Ft,[Ft[0]+12,19,Ft[2]+22]];const[W,X]=U[b]||U.all;if(Ie.set(...W),Ve.set(...X),b==="all"||b==="residences"){const _t=Vt.bounds(),Ft=b==="all"?76:_t.front,Z=_t.right-_t.left,Pt=Ft-_t.back;Ie.set(0,0,(Ft+_t.back)/2);const re=Math.max(.3,i.clientWidth/Math.max(1,i.clientHeight)),Zt=Math.min(Yi.degToRad(f.fov/2),Math.atan(Math.tan(Yi.degToRad(f.fov/2))*re)),tt=Math.hypot(Z,Pt)/2/Math.sin(Zt)*1.07;Ve.copy(new F(1,1.18,1.3).normalize().multiplyScalar(tt).add(Ie))}else D&&Ve.sub(Ie).multiplyScalar(1.23).add(Ie);rt=null,Vt.select(h.get(zt)?.pose==="sleeping"?zt:null),Tt?(f.position.copy(Ve),S.target.copy(Ie),Be=!1):Be=!0,A()}function Bt(b){if(Qt.active()){vt("follow",Mt);return}const D=Vt.location(b);D&&(ps(S),ot||(ot={mode:O,followId:st,anchor:h.get(st)?.group.position.clone(),position:f.position.clone(),target:S.target.clone(),focus:Ie.clone(),goal:Ve.clone(),easing:Be,fov:f.fov,min:S.minDistance,max:S.maxDistance,pan:S.enablePan}),O="orbit",st=null,S.enablePan=!0,S.minDistance=5,S.maxDistance=650,f.fov=36,f.updateProjectionMatrix(),rt=b,Vt.select(b),Ie.set(D.x,1.2,D.z),Ve.copy(Ie).add(new F(11,12,15)),i.clientWidth<600&&Ve.sub(Ie).multiplyScalar(1.23).add(Ie),Tt?(f.position.copy(Ve),S.target.copy(Ie),Be=!1):Be=!0,A())}function vt(b,D=zt){if(Qt.active()&&(b="follow",D=Mt),$(!1),ps(S),b==="orbit"){O="orbit",st=null,f.fov=36,f.updateProjectionMatrix(),S.enablePan=!0,S.minDistance=5,S.maxDistance=650,A();return}!h.has(D)&&dt.some(X=>X.id===D)&&(zt=D,Tn(dt));const U=h.get(D);if(!U)return;const W=R.form(D);O=b==="portrait"?"portrait":"follow",st=D,S.enablePan=!1,S.minDistance=Qt.active()?1.7:W?W.height*.85:O==="portrait"?2.8:3.8,S.maxDistance=Qt.active()?8:W?55:35,f.fov=Qt.active()?58:44,f.updateProjectionMatrix(),Ie.copy(U.group.position).add(new F(0,U.pose==="sleeping"?.25:1.3,U.pose==="sleeping"?-1.3:0)),W&&(Ie.y=U.group.position.y+W.height*.55),Ve.copy(Ie).add(W?new F(W.height*.85,W.height*.65,W.height*1.1):O==="portrait"?new F(1.8,.9,2.7):new F(4,2.5,5)),Tt?(f.position.copy(Ve),S.target.copy(Ie),Be=!1):Be=!0,A()}let Lt=null;const Ht=new Qn({transparent:!0,opacity:0,depthWrite:!1});E.set("game-hotspots",Ht);for(const b of Fi){const D=new Ke(6,1.4,.4),U=new Ke(b.kind==="court"?16:9,.18,b.kind==="court"?12:7);D.translate(0,.7,-(b.kind==="court"?6:4.2)),U.translate(0,-.14,0);const W=D.toNonIndexed(),X=U.toNonIndexed(),_t=jn([W,X],!1);D.dispose(),U.dispose(),W.dispose(),X.dispose(),M.add(_t);const Ft=new ve(_t,Ht);Ft.position.set(b.x,0,b.z),Ft.userData.officeGame=b.id,u.add(Ft),Cs.push(Ft)}const jt=new Zh,le=new Ot,Gt=b=>{Lt=[b.clientX,b.clientY]},ce=b=>{if(!Lt||Math.hypot(b.clientX-Lt[0],b.clientY-Lt[1])>6)return;Lt=null;const D=x.domElement.getBoundingClientRect();le.set((b.clientX-D.left)/D.width*2-1,-(b.clientY-D.top)/D.height*2+1),jt.setFromCamera(le,St||f);const U=jt.intersectObjects([...h.values()].map(X=>X.group).concat(Vt.meshes,ft.targets,Dt.targets,Cs,R.targets(),P.root.visible?[P.root]:[]),!0)[0],W=Vt.personForHit(U);if(W===si&&U?.object.userData.residenceLayer==="door"){o();return}W?(e(W),Bt(W)):U?.object.userData.officeHologramOwner?e(U.object.userData.officeHologramOwner):U?.object.userData.personId?e(U.object.userData.personId):U?.object.userData.officeVenue?s(U.object.userData.officeVenue):U?.object.userData.officeGame&&r(U.object.userData.officeGame)};function ze(){const b=document.documentElement.classList.contains("dark");x.toneMappingExposure=b?1.02:1.18,ee.configure(yt,it),A()}const Ce=new ResizeObserver(K);Ce.observe(i);const Te=new MutationObserver(ze);Te.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const qe=b=>{b.preventDefault(),w||n()};x.domElement.addEventListener("pointerdown",Gt),x.domElement.addEventListener("pointerup",ce),x.domElement.addEventListener("webglcontextlost",qe);const kt=()=>A();return S.addEventListener("change",kt),S.addEventListener("start",()=>{Be=!1}),ze(),At("all"),f.position.copy(Ve),S.target.copy(Ie),Be=!1,K(),{setPeople:Tn,resize:K,focusRoom:At,visitHome:Bt,setCameraMode:vt,showHologram(b){C=b!==null&&(b===si||b===Mt||h.get(b)?.person.is_me)?b:null,C===null&&P.hide(),A()},collisionBoxes:()=>v.boxes(),setPilotReporter(b){Ct=b},castSkill(b=0){const D=h.get(Mt);if(!D||!gt)return{error:"Aktifkan kendali avatar dahulu."};const U=xu(Dl(D.person.avatar).costume)[b];return U?R.cooldown(Mt)?{error:`Pulihkan energi ${R.cooldown(Mt)} detik lagi.`}:U.type==="transform"&&(Qt.active()||!v.free(gt.state().x,gt.state().z,gt.state().y,U.radius))?{error:"Cari area lapang di luar rumah sebelum berubah."}:U.type==="transform"&&R.modeCooldown(Mt)?{error:`Transformasi pulih dalam ${R.modeCooldown(Mt)} detik.`}:(De=null,Re=null,R.cast(Mt,U.id,D)?(A(),{skill:U.id,skill_id:globalThis.crypto.randomUUID(),name:U.name}):{error:"Efek belum siap."}):{error:"Jurus belum tersedia untuk kostum ini."}},syncPilot(b,D){if(!b||!gt)return;const U=D?.receivedAt??Date.now(),W=D?.sentAt??U;if(Number.isFinite(b.updated_ms)&&R.clock(b.updated_ms-(W+U)/2,Math.max(0,U-W)),bn&&b.form)return;b.form||(bn=!1),R.observe(Mt,b,h.get(Mt),!0);const X=R.modeState(Mt);gt.setForm(R.form(Mt),X?.expires),A()},toggleFlight(){const b=gt?.toggleFlight();return A(),b},endTransformation(){bn=!0,vi=null,R.clearForm(Mt),gt?.setForm(null),vt("follow",Mt),A()},activeTransformation:()=>R.modeState(Mt),setPrivatePilotProfile(b){ct&&(ct={...ct,avatar:b},Tn(dt.map(D=>D.id===ct.id?ct:D)))},setPilotGate(b){ke=b},reconcilePilot(b){gt&&(gt.reset(b),De=null,Re=null,$t={},A())},configureHome(b,D,U=null){si=b,Ee=D?Qo(D.slot):null,Ji=Number.isInteger(U)?Math.min(128,U):null,Vt.setPlots(Ji??0)},canUseDoor(){const b=gt?.state();return!!(Ee&&b&&(ki(b,Ee)||Math.hypot(b.x-Ee.x,b.z-Ee.z-3.9)<=2.8))},homeDoorOpen:()=>Wn,setHomeDoor(b){Wn!==!!b&&(Wn=!!b,v.configureHomes(!0,Wn?Ee?.slot:null),si&&Vt.setDoor(si,Wn),A())},setRestPose(b){if(!gt)return!1;if(R.cancel(Mt),Re=null,De=null,$t={},!b)return A(),!0;if(!["sit","recline","nap","meditate"].includes(b))return!1;const D=gt.state(),U=[...h.values()].filter(X=>X.person.id!==Mt&&X.pose!=="sleeping").map(X=>X.group.position),W=D.grounded?zc(v,D,b,U):null;return D.grounded&&!W?!1:(Re={pose:b,point:W},W&&Math.hypot(W.x-D.x,W.z-D.z)<.04&&(gt.face({x:D.x+Math.sin(W.yaw),z:D.z+Math.cos(W.yaw)}),De={action:"rest",pose:b,venue:ki(D,Ee)?"home":["beach","garden","terrace","lounge","bar"].find(X=>Nr(D,X))||"campus"},Re=null),A(),!0)},setPilot(b,D,U=null){Mt=b,ct=U,gt=Gg(v,D),Tn(dt),vt("follow",b),A()},releasePilot(){Qt.leave(),R.clearForm(Mt),bn=!1,vi=null;const b=ct?.id;Mt=null,ct=null,gt=null,$t={},De=null,Re=null,ue=null,En.visible=!1,Tn(dt.filter(D=>D.id!==b))},setPilotInput(b){$t=b||{},A()},pilotState(){return gt?{...gt.state(),...De||{}}:null},focusPilot(){i.focus?.({preventScroll:!0})},followPilot(){Mt&&(vt("follow",Mt),i.focus?.({preventScroll:!0}))},setPeerPilots(b){Nn.clear();for(const D of b)D.id!==Mt&&Nn.set(D.id,D);Tn(dt.map(D=>({...D,pilot:Nn.get(D.id)||null,in_office:Nn.has(D.id)||D.id===Mt})))},canInteract(b){return Nr(gt?.state(),b)},guideTo(b){const D=b==="home"&&Ee?{x:Ee.x,z:Ee.z+5}:Jn.venues[b];if(ue=D?b:null,En.visible=!!D,D){En.position.set(D.x,.025,D.z);const U=gt?.state();Ct({...U,target:b,distance:U?Math.round(Math.hypot(D.x-U.x,D.z-U.z)):null}),A()}return D},interactNearest(){const b=gt?.state();if(!b)return!1;if(Ee&&(ki(b,Ee)||Math.hypot(b.x-Ee.x,b.z-Ee.z-3.9)<=2.8))return o(),!0;const D=Object.keys(Jn.venues).filter(U=>Nr(b,U)).sort((U,W)=>Math.hypot(b.x-Jn.venues[U].x,b.z-Jn.venues[U].z)-Math.hypot(b.x-Jn.venues[W].x,b.z-Jn.venues[W].z))[0];return Fi.some(U=>U.id===D)?(r(D),!0):["bar","disco","beach","garden","terrace","lounge"].includes(D)?(s(D),!0):!1},setRecreation(b,D){Number(b)===Mt&&D&&(De={action:{drink:"drink",food:"eat",dance:"dance",relax:"rest"}[D.kind]||"idle",venue:D.destination,pose:D.kind==="relax"?"sit":null}),mt.set(Number(b),D?{...D,until:D.until||Date.now()/1e3+900}:null),Tn(dt)},setVenueEffects(b){ft.setEnabled(b),A()},setGame(b){JSON.stringify(Ut)!==JSON.stringify(b)&&(Ut=b,Mt&&b?.status==="playing"&&[b.from,b.to].includes(Mt)?De={action:"play",venue:b.kind}:De?.action==="play"&&(De=null),Tn(dt))},say(b,D){const U=h.get(Number(b));U&&(U.bubble.textContent=String(D||"").slice(0,350),U.bubble.hidden=!1,xt.has(b)&&clearTimeout(xt.get(b)),xt.set(b,setTimeout(()=>{U.bubble.hidden=!0,xt.delete(b),A()},1e4)),A())},configureWorld(b){yt=b||{},ee.configure(yt,it),I("#47695f").color.set({alps:"#47695f",village:"#936e53",nordic:"#566c80"}[yt.settings?.landscape]||"#47695f"),A()},setEnergySaver(b){it=!!b,x.setPixelRatio(it?1:Math.min(window.devicePixelRatio||1,1.5)),ee.configure(yt,it),K()},setMeeting(b){ut=b,Tn(dt)},meetingReady(){if(Mt&&ut?.connected&&ut.room){const D=h.get(ut.room.from),U=h.get(ut.room.to);if(!D||!U||D.group.position.distanceTo(U.group.position)>3)return!1;const W=U.group.position.x-D.group.position.x,X=U.group.position.z-D.group.position.z,_t=Math.hypot(W,X);return _t>.2&&(Math.sin(D.group.rotation.y)*W+Math.cos(D.group.rotation.y)*X)/_t>.45&&(-Math.sin(U.group.rotation.y)*W-Math.cos(U.group.rotation.y)*X)/_t>.45}const b=ut?.room;return!b||!ut.connected?!1:[b.from,b.to].every(D=>{const U=h.get(D);return U&&U.pose==="meeting"&&!U.waypoints?.length&&U.group.position.distanceTo(U.home)<.2&&Math.abs(U.group.rotation.y-U.facing)<.15})},select(b,D=!1){zt!==b&&$(),zt=b,b&&!h.has(b)&&dt.some(W=>W.id===b)&&Tn(dt);for(const[W,X]of h)X.ring.visible=W===b,X.label.setAttribute("aria-pressed",String(W===b));const U=h.get(b);if(Vt.select(rt??(U?.pose==="sleeping"?b:null)),U&&D&&Mt&&b!==Mt&&gt){gt.face(U.group.position),A();return}if(U&&D&&O!=="orbit"){vt(O,b);return}if(U&&D&&U.pose==="sleeping"){Bt(b);return}U&&D&&(Ie.copy(U.target).add(new F(0,1,0)),Ve.copy(Ie).add(new F(11,11,14)),Tt?(f.position.copy(Ve),S.target.copy(Ie)):Be=!0),A()},zoom(b){if(!Number.isFinite(b)||b<=0)return;Be=!1;const D=f.position.clone().sub(S.target);D.setLength(Yi.clamp(D.length()*b,S.minDistance,S.maxDistance)),f.position.copy(S.target).add(D),S.update(),A()},setPaused(b){if(Tt=b,Tt&&Be&&(f.position.copy(Ve),S.target.copy(Ie),Be=!1),Tt)for(const D of h.values())D.pose==="meeting"&&(D.group.position.copy(D.home),D.group.rotation.y=D.facing,D.waypoints=[]);Y!==null&&cancelAnimationFrame(Y),Y=null,A()},setVisible(b){N=b,!b&&Y!==null?(cancelAnimationFrame(Y),Y=null):b&&(ht=0,K(),A())},dispose(){w=!0,Y!==null&&cancelAnimationFrame(Y),Y=null,Ce.disconnect(),Te.disconnect(),S.dispose(),Qt.dispose(),R.dispose(),P.dispose();for(const b of xt.values())clearTimeout(b);xt.clear(),mt.clear(),x.domElement.removeEventListener("pointerdown",Gt),x.domElement.removeEventListener("pointerup",ce),x.domElement.removeEventListener("webglcontextlost",qe),Vt.dispose(),V.dispose(),ee.dispose();for(const b of M)b.dispose();for(const b of E.values())b.dispose();for(const b of _)b.dispose();h.forEach(b=>b.label.remove()),h.clear(),u.clear(),x.dispose(),x.forceContextLoss(),x.domElement.remove()}}}export{Kg as createOfficeScene};
