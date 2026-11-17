/* Original, dependency-free status-effect icon generator for Delta Force Skills.
 * The generator uses geometric symbols, not photographs or third-party game screenshots.
 * Run with Node.js 18+: node tools/generate_effect_icons.js
 */
"use strict";
const W=32,H=32;
const ICONS = [
"carry_boost","catdad_armor_reduced","catdad_downed","catdad_hiss_slow","character_framework",
"continuous_healing","corrosion","fatigue_removal","hackclaw_flash_blind","hackclaw_interference",
"hearing_amplification","hela","item_weakness","large_aim_penalty","large_aim_speed",
"large_fire_rate","large_interaction_speed","large_item_use_speed","large_reload_speed",
"laughing_mania_i","laughing_mania_ii","laughing_mania_iii","manba_blinded",
"medium_reload_speed","morse_flash_blind","morse_sonar_revealed","morse_strong_shock",
"nikaidou_core","nikaidou_correction","nikaidou_doomed","nikaidou_rift_stacks",
"nox_crippled","nox_delayed_wound","nox_flashed","nox_stealth","pain_relief",
"raptor_action_pause","raptor_electromagnetic_interference","raptor_hummingbird_marked",
"sedation","small_aim_speed","small_interaction_speed","small_item_use_speed",
"sonic_shock","stamina_boost","stamina_capacity","stinger_downed","stinger_smoke_regen",
"stinger_stim_heal","stinger_stim_suppression","stun","tempest_disarmed",
"tempest_emergency_downed","tempest_explosive_spine","toxik_adrenaline",
"toxik_firefly_interference","toxik_tear_gas_blind","vlinder_healing_dust",
"vlinder_medical_waste_interference","vlinder_plasma_injected",
"vlinder_rescue_protection","vlinder_vital_downed","vyron_powered","webbed"
];
const COLORS={bg:[12,20,30,255], border:[41,57,72,255], ink:[238,244,249,255],
good:[57,205,155,255],bad:[242,99,101,255],warn:[250,190,79,255],
tech:[78,171,244,255],magic:[181,139,246,255]};
function colorFor(n){
 if(/heal|regen|stamina|boost|rescue|plasma|capacity|fatigue_removal|correction|powered|protection/.test(n))return COLORS.good;
 if(/downed|wound|corrosion|crippled|weak|stun|blind|flashed|doomed|pain|disarmed|penalty|suppression|explosive/.test(n))return COLORS.bad;
 if(/sonar|shock|electro|interference|hearing|firefly|smoke|gas|flash/.test(n))return COLORS.warn;
 if(/stealth|invis|hiss|shadow|rift|mania|hela/.test(n))return COLORS.magic;
 return COLORS.tech;
}
function shapeFor(n){
 if(/catdad_/.test(n))return "cat";
 if(/downed|wound|crippled|disarmed|penalty|stun|item_weakness/.test(n))return "person";
 if(/heal|pain|rescue|plasma|sedation/.test(n))return "cross";
 if(/boost|speed|stamina|powered|reload|interaction|fire_rate|item_use/.test(n))return "arrow";
 if(/blind|flash|firefly|strong_shock|sonic_shock/.test(n))return "burst";
 if(/sonar|hearing|reveal|marked/.test(n))return "radar";
 if(/stealth|invis|concealment/.test(n))return "eye";
 if(/webbed/.test(n))return "web";
 if(/corrosion|medical_waste|adrenaline|suppression|toxic|tear_gas/.test(n))return "flask";
 if(/armor|shield|protection/.test(n))return "shield";
 if(/electro|interference|power|nikaidou|core/.test(n))return "bolt";
 if(/mania|hela/.test(n))return "skull";
 if(/action_pause|delayed/.test(n))return "clock";
 return "diamond";
}
function drawIcon(name){
 const pixels=new Uint8Array(W*H*4), accent=colorFor(name);
 function point(x,y,c){x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=W||y>=H)return;const k=(y*W+x)*4;for(let i=0;i<4;i++)pixels[k+i]=c[i];}
 function rect(x,y,w,h,c){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)point(xx,yy,c);}
 function line(x0,y0,x1,y1,c,wide=1){let dx=Math.abs(x1-x0),dy=Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,err=dx-dy;while(true){rect(Math.round(x0-wide/2),Math.round(y0-wide/2),wide,wide,c);if(x0===x1&&y0===y1)break;let e=2*err;if(e>-dy){err-=dy;x0+=sx}if(e<dx){err+=dx;y0+=sy}}}
 function disk(x,y,r,c){for(let yy=Math.floor(y-r);yy<=y+r;yy++)for(let xx=Math.floor(x-r);xx<=x+r;xx++)if((xx-x)**2+(yy-y)**2<=r*r)point(xx,yy,c);}
 function ring(x,y,r,c){for(let a=0;a<360;a+=3){let t=a*Math.PI/180;point(x+Math.cos(t)*r,y+Math.sin(t)*r,c)}}
 function poly(pts,c){let min=Math.floor(Math.min(...pts.map(p=>p[1]))),max=Math.ceil(Math.max(...pts.map(p=>p[1])));for(let y=min;y<=max;y++)for(let x=0;x<W;x++){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))inside=!inside}if(inside)point(x,y,c)}}
 const ink=COLORS.ink;
 // Rounded, opaque backing makes the symbols legible in light and dark Minecraft GUIs.
 rect(4,2,24,28,COLORS.border);rect(2,5,28,22,COLORS.border);
 rect(5,3,22,26,COLORS.bg);rect(3,6,26,20,COLORS.bg);
 rect(6,4,20,1,accent);rect(4,7,1,18,accent);rect(27,7,1,18,accent);
 const symbol=shapeFor(name);
 switch(symbol){
 case "cat":
   poly([[7,13],[8,7],[13,11],[19,11],[24,7],[25,14],[24,21],[20,25],[12,25],[8,21]],accent);
   disk(12,17,1.8,COLORS.bg);disk(20,17,1.8,COLORS.bg);poly([[14,20],[18,20],[16,22]],COLORS.bg);
   line(8,22,3,20,ink);line(24,22,29,20,ink);break;
 case "person":
   disk(14,10,4,ink);line(13,15,17,21,accent,4);line(16,20,8,23,ink,3);
   line(16,20,23,24,ink,3);line(15,16,22,15,accent,3);line(7,25,25,25,accent);break;
 case "cross":
   rect(13,7,6,18,accent);rect(7,13,18,6,accent);rect(15,9,2,14,ink);rect(9,15,14,2,ink);break;
 case "arrow":
   poly([[16,6],[24,16],[20,16],[20,24],[12,24],[12,16],[8,16]],accent);
   line(16,10,16,21,ink,2);break;
 case "burst":
   poly([[15,6],[18,12],[24,8],[22,15],[28,16],[22,19],[24,25],[17,22],[13,27],[12,20],[5,23],[9,16],[5,12],[13,13]],accent);
   disk(16,17,3,ink);break;
 case "radar":
   ring(16,16,10,accent);ring(16,16,6,accent);disk(16,16,2,ink);
   line(16,16,23,9,ink,2);break;
 case "eye":
   poly([[5,17],[10,11],[16,9],[22,11],[27,17],[22,22],[16,24],[10,22]],accent);
   disk(16,17,5,ink);disk(16,17,3,COLORS.bg);break;
 case "web":
   for(let r of [4,8,11])ring(16,17,r,accent);
   for(let a=0;a<360;a+=45){let t=a*Math.PI/180;line(16,17,Math.round(16+11*Math.cos(t)),Math.round(17+11*Math.sin(t)),ink);}
   break;
 case "flask":
   rect(13,7,6,9,ink);rect(11,6,10,2,ink);
   poly([[12,15],[20,15],[24,24],[8,24]],accent);line(10,21,22,21,ink);break;
 case "shield":
   poly([[16,5],[25,9],[24,18],[20,24],[16,27],[12,24],[8,18],[7,9]],accent);
   poly([[16,10],[21,12],[21,18],[16,23],[11,18],[11,12]],ink);break;
 case "bolt":
   poly([[18,5],[10,17],[16,17],[13,27],[24,13],[18,13]],accent);
   line(15,16,20,13,ink);break;
 case "skull":
   disk(16,14,9,accent);rect(11,18,10,6,accent);disk(12,15,2,COLORS.bg);disk(20,15,2,COLORS.bg);
   rect(15,20,2,3,COLORS.bg);break;
 case "clock":
   ring(16,16,10,accent);line(16,16,16,9,ink,2);line(16,16,21,19,ink,2);
   disk(16,16,2,accent);break;
 default:
   poly([[16,5],[27,16],[16,27],[5,16]],accent);poly([[16,10],[22,16],[16,22],[10,16]],ink);break;
 }
 // A tiny deterministic corner code differentiates related effects without text.
 let hash=2166136261;for(const ch of name){hash^=ch.charCodeAt(0);hash=Math.imul(hash,16777619)>>>0}
 for(let k=0;k<3;k++)if((hash>>k)&1)rect(9+k*5,27,3,2,accent);
 return pixels;
}
function adler(bytes){let a=1,b=0;for(const v of bytes){a=(a+v)%65521;b=(b+a)%65521}return ((b<<16)|a)>>>0}
function crc32(bytes){let crc=0xffffffff;for(const v of bytes){crc^=v;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}return (crc^0xffffffff)>>>0}
function u32(n){return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255]}
function chunk(type,data){const tag=[...type].map(c=>c.charCodeAt(0));return [...u32(data.length),...tag,...data,...u32(crc32([...tag,...data]))]}
function createPng(name){
 const pix=drawIcon(name),raw=[];for(let y=0;y<H;y++){raw.push(0);for(let x=0;x<W;x++)for(let c=0;c<4;c++)raw.push(pix[(y*W+x)*4+c])}
 const bytes=[0x78,0x01],len=raw.length;
 // DEFLATE stored block, no compression dependency.
 bytes.push(0x01,len&255,(len>>8)&255,(~len)&255,((~len)>>8)&255,...raw,...u32(adler(raw)));
 return new Uint8Array([137,80,78,71,13,10,26,10,...chunk("IHDR",[...u32(W),...u32(H),8,6,0,0,0]),...chunk("IDAT",bytes),...chunk("IEND",[])]);
}
function encodeBase64(b){const abc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",out=[];for(let i=0;i<b.length;i+=3){const a=b[i],x=i+1<b.length?b[i+1]:0,y=i+2<b.length?b[i+2]:0;out.push(abc[a>>2],abc[((a&3)<<4)|(x>>4)],i+1<b.length?abc[((x&15)<<2)|(y>>6)]:"=",i+2<b.length?abc[y&63]:"=")}return out.join("")}
if(typeof module!=="undefined"&&module.exports)module.exports={ICONS,createPng,encodeBase64};
if(typeof process!=="undefined"&&process.argv[1]&&process.argv[1].endsWith("generate_effect_icons.js")&&typeof require!=="undefined"&&require.main===module){
 const fs=require("node:fs"),path=require("node:path"),out=path.resolve(__dirname,"../src/main/resources/assets/dealt_force_skills/textures/mob_effect");
 fs.mkdirSync(out,{recursive:true});for(const name of ICONS)fs.writeFileSync(path.join(out,name+".png"),createPng(name));console.log("Generated "+ICONS.length+" original effect icons in "+out);
}
