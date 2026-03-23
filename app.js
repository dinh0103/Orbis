var GENRE_COLORS={"Indie":"#818cf8","Electronic":"#fbbf24","R&B":"#f472b6","Pop":"#f9a8d4","Ambient":"#60a5fa","Lo-fi":"#34d399","Mixed":"#a78bfa"};
var GENRE_VIBES={"Indie":"softcore","Electronic":"grid","R&B":"velvet","Pop":"the surface","Ambient":"void","Lo-fi":"3am","Mixed":"somewhere between"};
var GENRE_LIST=["Indie","Electronic","R&B","Pop","Ambient","Lo-fi"];
var CLUSTER_CENTERS={"Indie":{x:0.22,y:0.20},"Electronic":{x:0.80,y:0.30},"R&B":{x:0.18,y:0.72},"Pop":{x:0.75,y:0.68},"Ambient":{x:0.45,y:0.12},"Lo-fi":{x:0.55,y:0.80},"Mixed":{x:0.88,y:0.50}};

// Color palette options for the user's own planet
var COLOR_OPTIONS=[
  "#a78bfa","#818cf8","#60a5fa","#34d399","#fbbf24","#f472b6",
  "#f87171","#fb923c","#e879f9","#38bdf8","#4ade80","#facc15",
  "#f9a8d4","#67e8f9","#a3e635","#c084fc"
];

// Gradient overlay styles: [stop1, stop2, blendMode]
var GRADIENT_STYLES={
  nebula:  {a:"#7c3aed88", b:"#06b6d488", blend:"screen"},
  aurora:  {a:"#10b98188", b:"#3b82f688", blend:"screen"},
  lava:    {a:"#ef444488", b:"#f97316aa", blend:"overlay"},
  ice:     {a:"#bfdbfe99", b:"#e0f2fe88", blend:"screen"},
  void:    {a:"#00000099", b:"#1e1b4b88", blend:"multiply"},
};

// Me planet customization state
var myColor="#a78bfa";
var myGradient=false;
var myGradStyle="nebula";
// Planet visual filters (applied via CSS filter on each planet svg)
var PL_BRIGHT=100,PL_SAT=100,PL_GLOW=50;
// Background filter state
var BG_HUE=0,BG_BRIGHT=100,BG_NEBULA=60;
var myHat="crown";
var myRing=false;

var HATS=[
  {id:"none",   label:"None"},
  {id:"crown",  label:"Crown"},
  {id:"wizard", label:"Wizard"},
  {id:"cowboy", label:"Cowboy"},
  {id:"halo",   label:"Halo"},
  {id:"party",  label:"Party"},
];

var USERS=[
  {id:0,me:true,name:"you",songs:41,genre:"Indie",connections:[1,7,9],likes:[],customTags:["bedroom", "melancholy", "folk"],initials:"ME",
   pos:{x:0.50,y:0.48},
   baseColor:null,gradient:null,
   playlist:[{t:"Motion Sickness",a:"Phoebe Bridgers",d:"3:25"},{t:"Savior Complex",a:"Phoebe Bridgers",d:"4:02"},{t:"Cigarette Daydreams",a:"Cage The Elephant",d:"3:32"},{t:"Atlas Hands",a:"Benjamin Francis Leftwich",d:"4:10"},{t:"Holocene",a:"Bon Iver",d:"5:37"}]},
    {id:1,name:"nova.wav",songs:34,genre:"Indie",connections:[0,3],likes:[],initials:"NW",
   baseColor:"#6366f1",customTags:["bedroom","indie folk"],baseColor2:"#06b6d4",gradAngle:120,gradient:"aurora",
   playlist:[{t:"Garden Song",a:"Phoebe Bridgers",d:"3:07"},{t:"Moon Song",a:"Phoebe Bridgers",d:"3:37"},{t:"Funeral",a:"Phoebe Bridgers",d:"4:10"},{t:"Kyoto",a:"Phoebe Bridgers",d:"2:54"},{t:"Savior Complex",a:"Phoebe Bridgers",d:"4:02"}]},
  {id:2,name:"solarflare",songs:58,genre:"Electronic",connections:[4],likes:[],customTags:["synth", "late night", "electronic"],initials:"SF",
   baseColor:"#f59e0b",baseColor2:"#ef4444",gradAngle:160,gradient:"lava",
   playlist:[{t:"Midnight City",a:"M83",d:"4:03"},{t:"Taro",a:"alt-J",d:"5:02"},{t:"Breezeblocks",a:"alt-J",d:"3:47"},{t:"Intro",a:"The xx",d:"2:07"},{t:"Crystalised",a:"The xx",d:"3:33"},{t:"Something Good",a:"alt-J",d:"4:23"}]},
  {id:3,name:"velvetfrq",songs:47,genre:"R&B",connections:[0,5],likes:[],customTags:["smooth", "slow burn", "silk"],initials:"VF",
   baseColor:"#e879f9",gradient:null,
   playlist:[{t:"Good Days",a:"SZA",d:"4:39"},{t:"Supermodel",a:"SZA",d:"3:49"},{t:"Essence",a:"Wizkid ft. Tems",d:"3:45"},{t:"Love Galore",a:"SZA",d:"4:25"},{t:"Normal Girl",a:"SZA",d:"3:18"}]},
  {id:4,name:"bassweight",songs:71,genre:"Electronic",connections:[2,5],likes:[],customTags:["bass heavy", "dark", "club"],initials:"BW",
   baseColor:"#f97316",baseColor2:"#1e1b4b",gradAngle:200,gradient:"void",
   playlist:[{t:"Strobe",a:"deadmau5",d:"10:37"},{t:"Scary Monsters",a:"Skrillex",d:"5:24"},{t:"Animals",a:"Martin Garrix",d:"5:37"},{t:"Levels",a:"Avicii",d:"5:38"},{t:"Lean On",a:"Major Lazer",d:"2:55"},{t:"Turn Down For What",a:"DJ Snake",d:"3:34"},{t:"Wake Me Up",a:"Avicii",d:"4:06"}]},
  {id:5,name:"cottonpink",songs:18,genre:"Pop",connections:[3,4],likes:[],customTags:["pop anthems", "feel good", "glossy"],initials:"CP",
   baseColor:"#fb7185",baseColor2:"#bae6fd",gradAngle:45,gradient:"ice",
   playlist:[{t:"Anti-Hero",a:"Taylor Swift",d:"3:20"},{t:"Cruel Summer",a:"Taylor Swift",d:"2:58"},{t:"Flowers",a:"Miley Cyrus",d:"3:20"}]},
  {id:6,name:"deepspace77",songs:62,genre:"Ambient",connections:[0,2],likes:[],customTags:["space", "meditation", "float"],initials:"DS",
   baseColor:"#38bdf8",baseColor2:"#7c3aed",gradAngle:135,gradient:"nebula",
   playlist:[{t:"An Ending",a:"Brian Eno",d:"4:04"},{t:"Weightless",a:"Marconi Union",d:"8:09"},{t:"Xtal",a:"Aphex Twin",d:"4:54"},{t:"Avril 14th",a:"Aphex Twin",d:"2:05"},{t:"Selected Ambient Works",a:"Aphex Twin",d:"5:14"},{t:"Here Comes the Sun",a:"George Harrison",d:"3:05"}]},
  {id:7,name:"driftcloud9",songs:22,genre:"Lo-fi",connections:[1],likes:[],initials:"DC",
   customTags:["rainy day","study"],baseColor:"#2dd4bf",gradient:null,spotifyId:null,
   playlist:[{t:"Snow",a:"Øneheart",d:"2:48"},{t:"alone",a:"Grentperez",d:"2:55"},{t:"Dreams",a:"Fleetwood Mac",d:"4:14"}]},
  {id:8,name:"spotifydemo",songs:50,genre:"Pop",connections:[],likes:[],customTags:["charts", "trending", "pop"],initials:"SP",
   baseColor:"#22c55e",baseColor2:"#06b6d4",gradAngle:90,gradient:"aurora",spotifyId:"37i9dQZF1DXcBWIGoYBM5M",
   playlist:[{t:"Open Spotify player",a:"Click to play",d:""}]},
  {id:9,name:"lunarsync",songs:29,genre:"Ambient",connections:[6],likes:[],customTags:["ambient", "midnight", "drift"],initials:"LS",
   baseColor:"#94a3b8",gradient:null,
   playlist:[{t:"Intro",a:"The xx",d:"2:07"},{t:"Crystalised",a:"The xx",d:"3:33"},{t:"On+On",a:"Erykah Badu",d:"4:12"}]},
  {id:10,name:"sungrazer",songs:44,genre:"Indie",connections:[1,7],likes:[],customTags:["folk", "sunshine", "road trip"],initials:"SG",
   baseColor:"#facc15",baseColor2:"#f97316",gradAngle:170,gradient:"lava",
   playlist:[{t:"Do I Wanna Know?",a:"Arctic Monkeys",d:"4:32"},{t:"505",a:"Arctic Monkeys",d:"4:13"},{t:"R U Mine?",a:"Arctic Monkeys",d:"3:21"},{t:"Why'd You Only Call Me When You're High?",a:"Arctic Monkeys",d:"2:42"}]},
  {id:11,name:"violetdepth",songs:67,genre:"Electronic",connections:[2],likes:[],customTags:["dark wave", "industrial", "intense"],initials:"VD",
   baseColor:"#7c3aed",baseColor2:"#0f172a",gradAngle:225,gradient:"void",
   playlist:[{t:"Strobe",a:"deadmau5",d:"10:37"},{t:"Teardrop",a:"Massive Attack",d:"5:29"},{t:"Teardrop",a:"Massive Attack",d:"5:29"},{t:"Angel",a:"Massive Attack",d:"6:17"}]},
  {id:12,name:"blushwave",songs:15,genre:"Lo-fi",connections:[5,7],likes:[],customTags:["soft", "gentle", "sleep"],initials:"BW",
   baseColor:"#fda4af",gradient:null,
   playlist:[{t:"Comptine d'un autre été",a:"Yann Tiersen",d:"2:38"},{t:"River Flows in You",a:"Yiruma",d:"3:52"}]},

  // ── Extended system ──
  {id:13,name:"prismhaus",songs:39,genre:"Electronic",connections:[2,4],likes:[],customTags:["techno", "rave", "pulse"],initials:"PH",
   baseColor:"#c084fc",baseColor2:"#06b6d4",gradAngle:80,gradient:"nebula",
   playlist:[{t:"Breathe",a:"Télépopmusik",d:"4:36"},{t:"Chillout",a:"Moderat",d:"5:12"},{t:"Bad Kingdom",a:"Moderat",d:"5:02"}]},
  {id:14,name:"dustorbit",songs:53,genre:"Indie",connections:[1,10],likes:[],customTags:["indie rock", "guitar", "grunge"],initials:"DO",
   baseColor:"#a8a29e",baseColor2:"#44403c",gradAngle:210,gradient:null,
   playlist:[{t:"Motion Picture Soundtrack",a:"Radiohead",d:"5:18"},{t:"Pyramid Song",a:"Radiohead",d:"4:48"},{t:"Exit Music",a:"Radiohead",d:"4:24"},{t:"How to Disappear",a:"Radiohead",d:"5:57"}]},
  {id:15,name:"reedlight",songs:27,genre:"R&B",connections:[3],likes:[],customTags:["r&b vibes", "romantic", "velvet"],initials:"RL",
   baseColor:"#f43f5e",baseColor2:"#fbbf24",gradAngle:150,gradient:"lava",
   playlist:[{t:"Pink + White",a:"Frank Ocean",d:"3:02"},{t:"Nights",a:"Frank Ocean",d:"5:07"},{t:"Self Control",a:"Frank Ocean",d:"4:10"}]},
  {id:16,name:"cloudpatch",songs:18,genre:"Ambient",connections:[6,9],likes:[],customTags:["calm", "sleep"],initials:"CP",
   baseColor:"#e0f2fe",baseColor2:"#7dd3fc",gradAngle:30,gradient:"ice",
   playlist:[{t:"Gymnopédie No.1",a:"Erik Satie",d:"3:05"},{t:"Experience",a:"Ludovico Einaudi",d:"4:58"}]},
  {id:17,name:"ghostfreq",songs:61,genre:"Electronic",connections:[11,2],likes:[],customTags:["cinematic", "sci-fi", "dark"],initials:"GF",
   baseColor:"#1e293b",baseColor2:"#8b5cf6",gradAngle:270,gradient:"void",
   playlist:[{t:"Blade Runner Blues",a:"Vangelis",d:"7:02"},{t:"Oxygène Pt.4",a:"Jean-Michel Jarre",d:"4:14"},{t:"Equinoxe Pt.5",a:"Jean-Michel Jarre",d:"3:59"}]},
  {id:18,name:"terrafolk",songs:33,genre:"Indie",connections:[10,14],likes:[],customTags:["acoustic", "folk", "campfire"],initials:"TF",
   baseColor:"#86efac",baseColor2:"#4ade80",gradAngle:100,gradient:null,
   playlist:[{t:"The House That Heaven Built",a:"Japandroids",d:"4:57"},{t:"Sprawl II",a:"Arcade Fire",d:"5:28"},{t:"Rebellion (Lies)",a:"Arcade Fire",d:"5:10"}]},
  {id:19,name:"magnetar",songs:78,genre:"Electronic",connections:[4,17],likes:[],initials:"MG",
   baseColor:"#fcd34d",customTags:["hype","dance","club"],baseColor2:"#f97316",gradAngle:190,gradient:"lava",
   playlist:[{t:"Technologic",a:"Daft Punk",d:"4:44"},{t:"Get Lucky",a:"Daft Punk",d:"6:09"},{t:"One More Time",a:"Daft Punk",d:"5:20"},{t:"Around the World",a:"Daft Punk",d:"7:07"},{t:"Harder Better Faster",a:"Daft Punk",d:"3:44"}]},
  {id:20,name:"ashveil",songs:24,genre:"Lo-fi",connections:[7,12],likes:[],customTags:["chill", "nostalgic", "lo-fi"],initials:"AV",
   baseColor:"#78716c",baseColor2:"#292524",gradAngle:310,gradient:null,
   playlist:[{t:"Yugen",a:"Nujabes",d:"4:28"},{t:"Feather",a:"Nujabes",d:"3:57"},{t:"Reflection Eternal",a:"Nujabes",d:"4:11"}]},
  {id:21,name:"neonrift",songs:46,genre:"R&B",connections:[3,15],likes:[],customTags:["late night", "r&b mood"],initials:"NR",
   baseColor:"#fb7185",baseColor2:"#c026d3",gradAngle:55,gradient:"nebula",
   playlist:[{t:"Do For Love",a:"2Pac",d:"4:33"},{t:"Redbone",a:"Childish Gambino",d:"5:27"},{t:"Stand Tall",a:"Childish Gambino",d:"2:39"}]},
  {id:22,name:"icecore",songs:41,genre:"Ambient",connections:[16,9],likes:[],customTags:["ice cold", "ambient", "deep"],initials:"IC",
   baseColor:"#bae6fd",baseColor2:"#e0f2fe",gradAngle:0,gradient:"ice",
   playlist:[{t:"Music for Airports 1/1",a:"Brian Eno",d:"17:19"},{t:"Thursday Afternoon",a:"Brian Eno",d:"60:59"}]},
  {id:23,name:"ferrowave",songs:55,genre:"Pop",connections:[5,8],likes:[],customTags:["pop hits", "dancing", "bright"],initials:"FW",
   baseColor:"#f9a8d4",baseColor2:"#a855f7",gradAngle:130,gradient:"aurora",
   playlist:[{t:"Espresso",a:"Sabrina Carpenter",d:"2:55"},{t:"Please Please Please",a:"Sabrina Carpenter",d:"3:06"},{t:"Feather",a:"Sabrina Carpenter",d:"2:46"}]},
  {id:24,name:"vantacore",songs:70,genre:"Electronic",connections:[17,11],likes:[],customTags:["dark", "experimental", "bass"],initials:"VC",
   baseColor:"#0f172a",baseColor2:"#312e81",gradAngle:240,gradient:"void",
   playlist:[{t:"Portal",a:"Burial",d:"5:43"},{t:"Archangel",a:"Burial",d:"5:47"},{t:"Shell of Light",a:"Burial",d:"5:03"},{t:"Near Dark",a:"Burial",d:"6:42"}]},
  {id:25,name:"solstice",songs:31,genre:"Indie",connections:[1,18],likes:[],customTags:["dreamy", "acoustic", "heartbreak"],initials:"SL",
   baseColor:"#fde68a",baseColor2:"#fb923c",gradAngle:175,gradient:"lava",
   playlist:[{t:"Eye of the Needle",a:"Sufjan Stevens",d:"3:17"},{t:"Death With Dignity",a:"Sufjan Stevens",d:"3:52"},{t:"Should Have Known Better",a:"Sufjan Stevens",d:"4:55"}]},
  {id:26,name:"mirella",songs:22,genre:"Pop",connections:[5,23],likes:[],customTags:["pop", "girly", "dance"],initials:"MI",
   baseColor:"#f0abfc",gradient:null,
   playlist:[{t:"Levitating",a:"Dua Lipa",d:"3:23"},{t:"Physical",a:"Dua Lipa",d:"3:13"},{t:"Don't Start Now",a:"Dua Lipa",d:"3:27"}]},
  {id:27,name:"subpolar",songs:48,genre:"Ambient",connections:[22,16],likes:[],customTags:["deep space", "meditative", "slow"],initials:"SP",
   baseColor:"#0ea5e9",baseColor2:"#6366f1",gradAngle:145,gradient:"nebula",
   playlist:[{t:"Stars of the Lid",a:"Stars of the Lid",d:"8:44"},{t:"And Their Refinement",a:"Stars of the Lid",d:"9:12"}]},
  {id:28,name:"groveyard",songs:36,genre:"R&B",connections:[21,3],likes:[],customTags:["soul", "smooth", "neo-soul"],initials:"GY",
   baseColor:"#854d0e",baseColor2:"#b45309",gradAngle:185,gradient:null,
   playlist:[{t:"The Sweetest Taboo",a:"Sade",d:"4:43"},{t:"Smooth Operator",a:"Sade",d:"4:58"},{t:"No Ordinary Love",a:"Sade",d:"6:01"}]},
  {id:29,name:"pulsewave",songs:63,genre:"Electronic",connections:[13,19],likes:[],customTags:["techno", "driving", "rave"],initials:"PW",
   baseColor:"#22d3ee",baseColor2:"#6366f1",gradAngle:95,gradient:"aurora",
   playlist:[{t:"Windowlicker",a:"Aphex Twin",d:"10:03"},{t:"Come to Daddy",a:"Aphex Twin",d:"5:08"},{t:"Alberto Balsalm",a:"Aphex Twin",d:"4:54"}]},
  {id:30,name:"fogline",songs:19,genre:"Lo-fi",connections:[20,7],likes:[],customTags:["foggy", "calm", "late night"],initials:"FL",
   baseColor:"#d6d3d1",gradient:null,
   playlist:[{t:"La Vie en Rose",a:"Édith Piaf",d:"3:06"},{t:"Clair de lune",a:"Debussy",d:"5:04"}]},
];

function getUserColors(u){
  if(u.me){var c=myColor;return[c,shiftHex(c,-35),shiftHex(c,-80)];}
  var c=u.baseColor||"#888";
  // If planet has two-color gradient, blend for the mid/dark tones
  if(u.baseColor2){
    var mid=lerpColor(c,u.baseColor2,.5);
    return[c,mid,shiftHex(u.baseColor2,-45)];
  }
  return[c,shiftHex(c,-35),shiftHex(c,-80)];
}
function getUserGradient(u){
  if(u.me)return myGradient?myGradStyle:null;
  return u.gradient||null;
}
function getUserColor2(u){
  if(u.me)return myGradient?myColor2:null;
  return u.baseColor2||null;
}
function getUserGradAngle(u){
  if(u.me)return myGradAngle||135;
  return u.gradAngle||135;
}

function lerpColor(h1,h2,t){
  var r1=parseInt(h1.slice(1,3),16),g1=parseInt(h1.slice(3,5),16),b1=parseInt(h1.slice(5,7),16);
  var r2=parseInt(h2.slice(1,3),16),g2=parseInt(h2.slice(3,5),16),b2=parseInt(h2.slice(5,7),16);
  var r=Math.round(r1+(r2-r1)*t),g=Math.round(g1+(g2-g1)*t),b=Math.round(b1+(b2-b1)*t);
  return '#'+('0'+r.toString(16)).slice(-2)+('0'+g.toString(16)).slice(-2)+('0'+b.toString(16)).slice(-2);
}
function shiftHex(hex,amt){
  var r=Math.max(0,Math.min(255,parseInt(hex.slice(1,3),16)+amt));
  var g=Math.max(0,Math.min(255,parseInt(hex.slice(3,5),16)+amt));
  var b=Math.max(0,Math.min(255,parseInt(hex.slice(5,7),16)+amt));
  return '#'+('0'+r.toString(16)).slice(-2)+('0'+g.toString(16)).slice(-2)+('0'+b.toString(16)).slice(-2);
}

var KEYWORD_MAP={"chill":["Lo-fi","Ambient"],"relax":["Lo-fi","Ambient"],"sleep":["Ambient"],"study":["Lo-fi","Ambient","Electronic"],"focus":["Lo-fi","Ambient","Electronic"],"dance":["Electronic","Pop"],"party":["Electronic","Pop","R&B"],"hype":["Electronic","R&B"],"edm":["Electronic"],"beats":["Electronic","Lo-fi"],"sad":["Indie","Lo-fi"],"emotional":["Indie","R&B"],"heartbreak":["Indie","R&B","Pop"],"vibe":["R&B","Lo-fi","Indie"],"smooth":["R&B","Lo-fi"],"guitar":["Indie"],"folk":["Indie"],"acoustic":["Indie","Lo-fi"],"mainstream":["Pop"],"hits":["Pop"],"radio":["Pop"],"atmospheric":["Ambient"],"space":["Ambient","Electronic"],"dreamy":["Ambient","Lo-fi"]};
var KEYWORD_SUGGESTIONS=["chill","dance","sad","study","hype","dreamy","vibe","party","acoustic","space"];
var PALETTE=[["#f87171","#dc2626","#450a0a"],["#4ade80","#16a34a","#052e16"],["#38bdf8","#0284c7","#0c4a6e"],["#e879f9","#a21caf","#4a044e"],["#fb923c","#ea580c","#431407"],["#a3e635","#65a30d","#1a2e05"]];

var MIN_R=26,MAX_R=60,MIN_S=18,MAX_S=71;
function radius(s){return MIN_R+((Math.min(s,MAX_S)-MIN_S)/(MAX_S-MIN_S))*(MAX_R-MIN_R);}

function pseudoRand(seed){
  // Simple deterministic float 0..1 from a seed integer
  var x=Math.sin(seed*9301+49297)*233280;
  return x-Math.floor(x);
}

function assignPositions(){
  var gc={};
  for(var i=0;i<USERS.length;i++){
    var u=USERS[i];if(u.pos)continue;
    var g=(u.genres&&u.genres[0])||u.genre;if(!gc[g])gc[g]=0;var idx=gc[g]++;
    var cc=CLUSTER_CENTERS[g]||{x:.5,y:.5};

    var seed=u.id*31+idx*17+(g.charCodeAt(0)*7);
    var r1=pseudoRand(seed);
    var r2=pseudoRand(seed+3);
    var r3=pseudoRand(seed+7);
    var r4=pseudoRand(seed+11);

      var angle=r1*Math.PI*2;

    // Random spread using square-root distribution so planets fill area evenly
      var minR=0.08, maxR=0.30;
    var spread=minR + Math.sqrt(r2)*(maxR-minR);

    // Every 3rd planet gets extra scatter to break up cluster density
    if(idx%3===2) spread+=r3*0.15;

    // 20% chance to scatter far into open space (inter-cluster roamers)
    if(r4<0.20){
      angle=r4*Math.PI*12; // different angle seeding
      spread=0.28+r3*0.25;
    }

    var px=cc.x+Math.cos(angle)*spread;
    var py=cc.y+Math.sin(angle)*spread;

    u.pos={x:Math.max(.05,Math.min(.95,px)),y:Math.max(.05,Math.min(.93,py))};
  }
  separatePlanets();
}
function separatePlanets(){
  for(var pass=0;pass<40;pass++){
    for(var i=0;i<USERS.length;i++){
      for(var j=i+1;j<USERS.length;j++){
        var a=USERS[i],b=USERS[j];
        var ri=radius(a.songs)/(W||800)*2.2,rj=radius(b.songs)/(W||800)*2.2,minD=ri+rj+0.028;
        var dx=b.pos.x-a.pos.x,dy=b.pos.y-a.pos.y,dist=Math.sqrt(dx*dx+dy*dy)||0.0001;
        if(dist<minD){var push=(minD-dist)/2,nx=dx/dist,ny=dy/dist;a.pos.x=a.pos.x-nx*push;a.pos.y=a.pos.y-ny*push;b.pos.x=b.pos.x+nx*push;b.pos.y=b.pos.y+ny*push;}
      }
    }
  }
}
assignPositions();

var root=document.getElementById('root');
var bgCanvas=document.getElementById('bg');
var planetsLayer=document.getElementById('planets-layer');
var W=0,H=0,stars=[];
var offsetX=0,offsetY=0,scale=1,MIN_SCALE=.3,MAX_SCALE=2.2;
var panDragging=false,panSX=0,panSY=0,panOX=0,panOY=0;
var searchQ='',activeKeyword=null,visibleIds=new Set();
var tick=0,openedUserId=-1,sidebarCollapsed=false,hatPickerOpen=false;
// Shooting stars
var shooters=[];
var SHOOTER_COLORS=['rgba(255,255,255,', 'rgba(180,200,255,', 'rgba(200,180,255,', 'rgba(255,220,180,'];
function spawnShooter(){
  if(!OPT_SHOOTING||!OPT_ANIM)return;
  var edge=Math.random()<.5;
  var angle=(Math.random()*60+10)*Math.PI/180; // mostly downward-right
  if(Math.random()<.5)angle=Math.PI-angle;     // or downward-left
  var sx=edge?Math.random()*W:-20;
  var sy=Math.random()*H*.5;
  var spd=(Math.random()*5+6)*scale;
  var len=(Math.random()*100+60)*scale;
  var col=SHOOTER_COLORS[Math.floor(Math.random()*SHOOTER_COLORS.length)];
  shooters.push({x:sx,y:sy,vx:Math.cos(angle)*spd,vy:Math.sin(angle)*spd,len:len,life:1,col:col,decay:Math.random()*.018+.012});
}
// Planet drift — each planet gets a tiny orbital offset over time
var DRIFT_OFFSETS={};
function getDriftOffset(id){
  if(!DRIFT_OFFSETS[id]){
    // Deterministic from id so stable across renders
    var r1=((id*7919+1)%997)/997;
    var r2=((id*6151+3)%997)/997;
    var r3=((id*3571+7)%997)/997;
    var r4=((id*4831+11)%997)/997;
    DRIFT_OFFSETS[id]={
      px:r1*Math.PI*2,           // x phase
      py:r2*Math.PI*2,           // y phase
      freqx:0.12+r3*0.14,        // x oscillation speed
      freqy:0.09+r4*0.11,        // y slightly different so orbit is elliptical
      rx:5+r1*7,                // x pixel radius (5–12px)
      ry:3+r2*5,                 // y pixel radius (3–8px)
    };
  }
  return DRIFT_OFFSETS[id];
}
var zoomDragging=false,zoomDragStartY=0,zoomDragStartScale=1;
// Settings
var settingsOpen=false;
var OPT_STARS=true,OPT_ANIM=true,OPT_VIBES=true,OPT_HATS=false,OPT_LINES=true,OPT_LABELS=true,OPT_SHOOTING=true,PLANET_LIMIT=12;
// Fixed background (presets removed)
var BG_BASE={bg:"#04040f",cloud1:"#12083a",cloud2:"#071428",cloud3:"#100828"};
// Random hats assigned to other users when OPT_HATS is on
var OTHER_HATS={};
var HAT_IDS_FOR_OTHERS=["crown","wizard","cowboy","halo","party","none"];
function getOtherHat(id){if(!OTHER_HATS[id])OTHER_HATS[id]=HAT_IDS_FOR_OTHERS[Math.floor(Math.random()*HAT_IDS_FOR_OTHERS.length)];return OTHER_HATS[id];}

function resize(){W=root.offsetWidth;H=root.offsetHeight;bgCanvas.width=W;bgCanvas.height=H;separatePlanets();makeStars();renderAll();}
function makeStars(){
  stars=[];if(!OPT_STARS)return;
  var cnt=600;
  for(var i=0;i<cnt;i++){
    // mix of tiny dots, mid stars, and rare big ones
    var tier=Math.random();
    var r,a;
    if(tier<0.65){r=Math.random()*.6+.15;a=Math.random()*.55+.2;}       // tiny dim
    else if(tier<0.92){r=Math.random()*.8+.4;a=Math.random()*.4+.45;}   // mid bright
    else{r=Math.random()*1.2+.9;a=Math.random()*.3+.65;}                 // rare large
    stars.push({x:(Math.random()-.12)*W*1.8,y:(Math.random()-.08)*H*1.8,r:r,a:a,tw:Math.random()*Math.PI*2,speed:Math.random()*.6+.4});
  }
}
function worldToScreen(wx,wy){var cx=W/2,cy=H/2;return{x:cx+(wx-cx+offsetX)*scale,y:cy+(wy-cy+offsetY)*scale};}
function getWorldPos(id){var u=getUserById(id);if(!u)return{x:0,y:0};var bp=u.pos||{x:.5,y:.5};return{x:bp.x*W*2.2-W*.6,y:bp.y*H*2.2-H*.6};}
function getPos(id){
  return worldToScreen(getWorldPos(id).x, getWorldPos(id).y);
}
function getDriftedPos(id){
  var base=getPos(id); // stable screen position
  if(OPT_ANIM){
    var u=getUserById(id);
    if(u&&!u.me){
      var d=getDriftOffset(id);
      // Lissajous-style elliptical drift in screen pixels
      var ox=Math.cos(tick*d.freqx+d.px)*d.rx*scale;
      var oy=Math.sin(tick*d.freqy+d.py)*d.ry*scale;
      return{x:base.x+ox, y:base.y+oy};
    }
  }
  return base;
}
function getUserById(id){for(var i=0;i<USERS.length;i++)if(USERS[i].id===id)return USERS[i];return null;}

function setScale(v){scale=Math.max(MIN_SCALE,Math.min(MAX_SCALE,v));updateZoomUI();}
function updateZoomUI(){document.getElementById('zoom-pct').textContent=Math.round(scale*100)+'%';var t=(scale-MIN_SCALE)/(MAX_SCALE-MIN_SCALE),trackH=document.getElementById('zoom-track').offsetHeight||90;document.getElementById('zoom-thumb').style.top=Math.round((1-t)*(trackH-10))+'px';}
document.getElementById('zoom-track').addEventListener('click',function(e){var rect=this.getBoundingClientRect();setScale(MIN_SCALE+(1-(e.clientY-rect.top)/this.offsetHeight)*(MAX_SCALE-MIN_SCALE));renderAll();});
document.getElementById('zoom-thumb').addEventListener('mousedown',function(e){e.stopPropagation();zoomDragging=true;zoomDragStartY=e.clientY;zoomDragStartScale=scale;});
document.addEventListener('mousemove',function(e){if(zoomDragging){var dz=-(e.clientY-zoomDragStartY)/(document.getElementById('zoom-track').offsetHeight||90)*(MAX_SCALE-MIN_SCALE);setScale(zoomDragStartScale+dz);renderAll();return;}if(panDragging){offsetX=panOX+(e.clientX-panSX)/scale;offsetY=panOY+(e.clientY-panSY)/scale;renderPlanets();}});
document.addEventListener('mouseup',function(){zoomDragging=false;panDragging=false;root.style.cursor='';});
document.getElementById('zoom-in').addEventListener('click',function(){setScale(scale+.15);renderAll();});
document.getElementById('zoom-out').addEventListener('click',function(){setScale(scale-.15);renderAll();});
root.addEventListener('wheel',function(e){e.preventDefault();setScale(scale+(e.deltaY>0?-.1:.1));renderAll();},{passive:false});

// ---- Hat drawing (compact — all hats stay small relative to planet) ----
// Scale factor: all hats use r * 0.42 max halfWidth and r * 0.38 max height above gap
var HAT_GAP=0.20; // gap as fraction of r

function drawCrown(cx,cy,r,c0){
  var gap=r*HAT_GAP, outerR=r+gap, hw=r*0.44, toothH=r*0.34;
  var maxA=Math.asin(Math.min(hw/outerR,.999));
  var bLx=cx+outerR*Math.sin(-maxA), bLy=cy-outerR*Math.cos(maxA);
  var bRx=cx+outerR*Math.sin(maxA),  bRy=bLy;
  var midY=cy-outerR;
  var peakM=midY-toothH, peakS=midY-toothH*0.55;
  var qi1=-maxA*0.45,qi2=maxA*0.45;
  var q1x=cx+outerR*Math.sin(qi1),q1y=cy-outerR*Math.cos(Math.abs(qi1));
  var q2x=cx+outerR*Math.sin(qi2),q2y=q1y;
  var lpx=cx+outerR*Math.sin(-maxA*0.75),lpy=cy-outerR*Math.cos(maxA*0.75);
  var rpx=cx+outerR*Math.sin(maxA*0.75), rpy=lpy;
  var d='M '+bLx+','+bLy+' L '+lpx+','+peakS+' L '+q1x+','+q1y+' L '+cx+','+peakM+' L '+q2x+','+q2y+' L '+rpx+','+peakS+' L '+bRx+','+bRy+' A '+outerR+','+outerR+' 0 0,0 '+bLx+','+bLy+' Z';
  var br=r*0.06;
  var out='<path d="'+d+'" fill="'+c0+'" stroke="'+c0+'bb" stroke-width="0.5" stroke-linejoin="round"/>';
  out+='<circle cx="'+lpx+'" cy="'+peakS+'" r="'+(br*1.15)+'" fill="'+c0+'"/><circle cx="'+lpx+'" cy="'+peakS+'" r="'+(br*.7)+'" fill="#fff" opacity=".9"/>';
  out+='<circle cx="'+cx+'" cy="'+peakM+'" r="'+(br*1.35)+'" fill="'+c0+'"/><circle cx="'+cx+'" cy="'+peakM+'" r="'+(br*.82)+'" fill="#fff" opacity=".94"/>';
  out+='<circle cx="'+rpx+'" cy="'+peakS+'" r="'+(br*1.15)+'" fill="'+c0+'"/><circle cx="'+rpx+'" cy="'+peakS+'" r="'+(br*.7)+'" fill="#fff" opacity=".9"/>';
  return out;
}

function drawWizard(cx,cy,r,c0){
  var gap=r*HAT_GAP, outerR=r+gap;
  var bw=r*0.36, hatH=r*0.52;
  var ba=Math.asin(Math.min(bw/outerR,.999));
  var bY=cy-outerR*Math.cos(ba);
  var bLx=cx-bw, bRx=cx+bw;
  var tipX=cx+r*0.05, tipY=bY-hatH;
  var bRX=bw+r*0.1, bRY=r*0.1;
  // body
  var out='<polygon points="'+(bLx+r*.06)+','+bY+' '+(bRx-r*.06)+','+bY+' '+tipX+','+tipY+'" fill="'+c0+'" opacity=".9"/>';
  // brim
  out+='<ellipse cx="'+cx+'" cy="'+bY+'" rx="'+bRX+'" ry="'+bRY+'" fill="'+c0+'" opacity=".85"/>';
  // star
  var sy=tipY+hatH*0.48, sr=r*0.075;
  out+='<circle cx="'+cx+'" cy="'+sy+'" r="'+sr+'" fill="#fff" opacity=".85"/>';
  out+='<circle cx="'+cx+'" cy="'+sy+'" r="'+(sr*.5)+'" fill="'+c0+'"/>';
  return out;
}

function drawCowboy(cx,cy,r,c0){
  var gap=r*HAT_GAP, outerR=r+gap;
  var bw=r*0.58, cH=r*0.30, cW=r*0.30;
  var ba=Math.asin(Math.min(bw/outerR,.999));
  var bY=cy-outerR*Math.cos(ba);
  var topY=bY-cH;
  // Crown trapezoid
  var out='<path d="M '+(cx-cW)+','+bY+' Q '+(cx-cW*1.05)+','+(topY+cH*.35)+' '+(cx-cW*.52)+','+topY+' Q '+cx+','+(topY-cH*.1)+' '+(cx+cW*.52)+','+topY+' Q '+(cx+cW*1.05)+','+(topY+cH*.35)+' '+(cx+cW)+','+bY+' Z" fill="'+c0+'" opacity=".92"/>';
  // Wide curved brim left
  out+='<path d="M '+(cx-bw*1.12)+','+(bY+r*0.07)+' Q '+(cx-bw*.75)+','+(bY-r*0.03)+' '+(cx-cW)+','+bY+'" fill="none" stroke="'+c0+'" stroke-width="'+(r*.15)+'" stroke-linecap="round"/>';
  // Wide curved brim right
  out+='<path d="M '+(cx+bw*1.12)+','+(bY+r*0.07)+' Q '+(cx+bw*.75)+','+(bY-r*0.03)+' '+(cx+cW)+','+bY+'" fill="none" stroke="'+c0+'" stroke-width="'+(r*.15)+'" stroke-linecap="round"/>';
  // Band
  out+='<line x1="'+(cx-cW)+'" y1="'+bY+'" x2="'+(cx+cW)+'" y2="'+bY+'" stroke="#fff" stroke-width="'+(r*.055)+'" opacity=".3"/>';
  return out;
}

function drawHalo(cx,cy,r,c0){
  var gap=r*0.35;
  var hY=cy-r-gap;
  var hRx=r*0.48, hRy=r*0.11;
  var out='<ellipse cx="'+cx+'" cy="'+hY+'" rx="'+(hRx+r*.1)+'" ry="'+(hRy+r*.05)+'" fill="'+c0+'" opacity=".1"/>';
  out+='<ellipse cx="'+cx+'" cy="'+hY+'" rx="'+hRx+'" ry="'+hRy+'" fill="none" stroke="'+c0+'" stroke-width="'+(r*0.11)+'" opacity=".95"/>';
  out+='<ellipse cx="'+cx+'" cy="'+hY+'" rx="'+hRx+'" ry="'+hRy+'" fill="none" stroke="#fff" stroke-width="'+(r*0.035)+'" opacity=".55"/>';
  return out;
}

function drawParty(cx,cy,r,c0){
  var gap=r*HAT_GAP, outerR=r+gap;
  var bw=r*0.38, hatH=r*0.46;
  var ba=Math.asin(Math.min(bw/outerR,.999));
  var bY=cy-outerR*Math.cos(ba);
  var bLx=cx-bw, bRx=cx+bw;
  var tipX=cx-r*0.04, tipY=bY-hatH;
  var out='<polygon points="'+bLx+','+bY+' '+bRx+','+bY+' '+tipX+','+tipY+'" fill="'+c0+'" opacity=".88"/>';
  // stripes
  for(var s=0;s<2;s++){var t=(s+1)/3;out+='<line x1="'+(cx-bw*(1-t))+'" y1="'+(bY-(bY-tipY)*t*.9)+'" x2="'+(cx+bw*(1-t))+'" y2="'+(bY-(bY-tipY)*t*.9)+'" stroke="#fff" stroke-width="'+(r*.05)+'" opacity=".3"/>';}
  // pom
  out+='<circle cx="'+tipX+'" cy="'+tipY+'" r="'+(r*.11)+'" fill="#fff" opacity=".88"/>';
  // base
  out+='<ellipse cx="'+cx+'" cy="'+bY+'" rx="'+bw+'" ry="'+(r*.09)+'" fill="'+c0+'" opacity=".7"/>';
  return out;
}

function getHatSVG(hatId,cx,cy,r,c0){
  if(hatId==='crown')return drawCrown(cx,cy,r,c0);
  if(hatId==='wizard')return drawWizard(cx,cy,r,c0);
  if(hatId==='cowboy')return drawCowboy(cx,cy,r,c0);
  if(hatId==='halo')return drawHalo(cx,cy,r,c0);
  if(hatId==='party')return drawParty(cx,cy,r,c0);
  return '';
}

function buildHatPicker(){
  var opts=document.getElementById('hat-options');opts.innerHTML='';
  var ringTog=document.getElementById('tog-ring');
  if(ringTog)ringTog.className=myRing?'toggle on':'toggle';
  var ringTogPanel=document.getElementById('tog-ring-panel');
  if(ringTogPanel)ringTogPanel.className=myRing?'toggle on':'toggle';
  // Also populate inline hat options inside customize panel
  var inlineOpts=document.getElementById('inline-hat-options');
  if(inlineOpts){
    inlineOpts.innerHTML='';
    var pr2=11,pd2=pr2*2+8,pcy2=pd2/2+Math.round(pr2*0.65),ptH2=pd2+Math.round(pr2*0.65);
    for(var ii=0;ii<HATS.length;ii++){
      var hh=HATS[ii],iel=document.createElement('div');
      iel.style.cssText='background:rgba(255,255,255,.04);border:0.5px solid '+(myHat===hh.id?'rgba(167,139,250,.5)':'rgba(255,255,255,.08)')+';border-radius:7px;padding:4px 2px;cursor:pointer;text-align:center;transition:all .15s';
      var isvg='<svg width="'+pd2+'" height="'+ptH2+'" viewBox="0 0 '+pd2+' '+ptH2+'" xmlns="http://www.w3.org/2000/svg">';
      isvg+='<circle cx="'+pd2/2+'" cy="'+pcy2+'" r="'+pr2+'" fill="#a78bfa33" stroke="#a78bfa44" stroke-width="1"/>';
      if(hh.id!=='none')isvg+=getHatSVG(hh.id,pd2/2,pcy2,pr2,'#a78bfa');
      isvg+='</svg>';
      iel.innerHTML=isvg;
      (function(hid,el2){el2.addEventListener('click',function(e){e.stopPropagation();myHat=hid;buildHatPicker();renderPlanets();});})(hh.id,iel);
      inlineOpts.appendChild(iel);
    }
  }
  var pr=14;var pd=pr*2+12;var pcy=pd/2+Math.round(pr*0.65);var ptH=pd+Math.round(pr*0.65);
  for(var i=0;i<HATS.length;i++){
    var h=HATS[i],el=document.createElement('div');
    el.className='hat-opt'+(myHat===h.id?' selected':'');
    var svg='<svg width="'+pd+'" height="'+ptH+'" viewBox="0 0 '+pd+' '+ptH+'" xmlns="http://www.w3.org/2000/svg">';
    svg+='<circle cx="'+pd/2+'" cy="'+pcy+'" r="'+pr+'" fill="#a78bfa33" stroke="#a78bfa44" stroke-width="1"/>';
    if(h.id!=='none')svg+=getHatSVG(h.id,pd/2,pcy,pr,'#a78bfa');
    svg+='</svg>';
    el.innerHTML=svg+'<div class="hat-opt-label">'+h.label+'</div>';
    (function(hid,el2){el2.addEventListener('click',function(e){e.stopPropagation();myHat=hid;buildHatPicker();renderPlanets();});})(h.id,el);
    opts.appendChild(el);
  }
}
buildHatPicker();

// Ring toggle
function toggleRing(){
  myRing=!myRing;
  var tog=document.getElementById('tog-ring');
  if(tog)tog.className=myRing?'toggle on':'toggle';
  var togP=document.getElementById('tog-ring-panel');
  if(togP)togP.className=myRing?'toggle on':'toggle';
  renderPlanets();scheduleSave&&scheduleSave();
}
document.getElementById('ring-toggle-row').addEventListener('click',function(e){
  e.stopPropagation();toggleRing();
});
// Ring panel toggle
document.getElementById('tog-ring-panel').addEventListener('click',function(e){
  e.stopPropagation();toggleRing();
});

// Build color swatches
var myColor2="#60a5fa";
var myGradAngle=135;

// ── Color wheel drawing ──
function drawColorWheel(canvas, selectedHex){
  var ctx=canvas.getContext('2d');
  var sz=canvas.width, cx2=sz/2, cy2=sz/2;
  var outerR=sz/2-1, innerR=outerR*0.62;
  ctx.clearRect(0,0,sz,sz);

  // ── Hue ring (outer) ──
  var ringW=outerR-innerR;
  for(var a=0;a<360;a++){
    var s=a*Math.PI/180, e=(a+2)*Math.PI/180;
    ctx.beginPath();
    ctx.arc(cx2,cy2,outerR,s,e);
    ctx.arc(cx2,cy2,innerR,e,s,true);
    ctx.closePath();
    ctx.fillStyle='hsl('+a+',100%,50%)';
    ctx.fill();
  }
  // Ring border
  ctx.beginPath();ctx.arc(cx2,cy2,outerR,0,Math.PI*2);ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=.5;ctx.stroke();
  ctx.beginPath();ctx.arc(cx2,cy2,innerR,0,Math.PI*2);ctx.strokeStyle='rgba(0,0,0,.15)';ctx.lineWidth=.5;ctx.stroke();

  // ── Inner SV square ──
  // Parse selected color to get hue for the square
  var hsl=hexToHSL(selectedHex||'#a78bfa');
  var hue=hsl.h;
  var sqHalf=innerR*0.70;
  var sqX=cx2-sqHalf, sqY=cy2-sqHalf, sqW=sqHalf*2;

  // White→hue gradient (left=white, right=hue)
  var gH=ctx.createLinearGradient(sqX,sqY,sqX+sqW,sqY);
  gH.addColorStop(0,'#fff');gH.addColorStop(1,'hsl('+hue+',100%,50%)');
  ctx.fillStyle=gH;ctx.fillRect(sqX,sqY,sqW,sqW);
  // Black→transparent gradient (top=transparent, bottom=black)
  var gV=ctx.createLinearGradient(sqX,sqY,sqX,sqY+sqW);
  gV.addColorStop(0,'rgba(0,0,0,0)');gV.addColorStop(1,'rgba(0,0,0,1)');
  ctx.fillStyle=gV;ctx.fillRect(sqX,sqY,sqW,sqW);

  // Round clip the inner square
  ctx.save();ctx.globalCompositeOperation='destination-in';
  ctx.beginPath();ctx.arc(cx2,cy2,innerR-.5,0,Math.PI*2);ctx.fill();
  ctx.globalCompositeOperation='source-over';ctx.restore();

  // ── Cursors ──
  if(selectedHex&&selectedHex.length===7){
    // Hue ring cursor
    var hRad=hue*Math.PI/180;
    var hcR=(outerR+innerR)/2;
    var hcx=cx2+Math.cos(hRad)*hcR, hcy=cy2+Math.sin(hRad)*hcR;
    ctx.beginPath();ctx.arc(hcx,hcy,5,0,Math.PI*2);
    ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.arc(hcx,hcy,4,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,0,0,.5)';ctx.lineWidth=1;ctx.stroke();

    // SV square cursor
    var sv=hexToSV(selectedHex);
    var scx=sqX+sv.s*sqW, scy=sqY+(1-sv.v)*sqW;
    ctx.beginPath();ctx.arc(scx,scy,4.5,0,Math.PI*2);
    ctx.strokeStyle='#fff';ctx.lineWidth=1.8;ctx.stroke();
    ctx.beginPath();ctx.arc(scx,scy,3.5,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,0,0,.4)';ctx.lineWidth=1;ctx.stroke();
  }
}

function hexToHSL(hex){
  var r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,h=0,s=0,l=(max+min)/2;
  if(d){s=d/(1-Math.abs(2*l-1));if(max===r)h=((g-b)/d+6)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;}
  return{h:h,s:s,l:l};
}
function hexToSV(hex){
  var r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b);
  var v=max, s=max===0?0:(max-min)/max;
  return{s:s,v:v};
}
function hsvToHex(h,s,v){
  var c=v*s, x=c*(1-Math.abs((h/60)%2-1)), m=v-c, r2,g2,b2;
  if(h<60){r2=c;g2=x;b2=0;}else if(h<120){r2=x;g2=c;b2=0;}
  else if(h<180){r2=0;g2=c;b2=x;}else if(h<240){r2=0;g2=x;b2=c;}
  else if(h<300){r2=x;g2=0;b2=c;}else{r2=c;g2=0;b2=x;}
  var toH=function(v2){return('0'+Math.round((v2+m)*255).toString(16)).slice(-2);};
  return '#'+toH(r2)+toH(g2)+toH(b2);
}

function initColorWheel(canvasId, previewId, hexId, getColor, setColor){
  var canvas=document.getElementById(canvasId);
  var preview=document.getElementById(previewId);
  var hexInput=document.getElementById(hexId);
  if(!canvas)return;
  var pressing=false;
  var _currentHue=hexToHSL(getColor()).h; // track hue separately for ring+square interaction
  function applyColor(hex){setColor(hex);if(hexInput)hexInput.value=hex;if(preview)preview.style.background=hex;drawColorWheel(canvas,hex);buildColorSection();renderPlanets();if(openedUserId===0)openPanel(getUserById(0));}
  function pick(e){
    var rect=canvas.getBoundingClientRect();
    var cx2=e.clientX-rect.left, cy2=e.clientY-rect.top;
    var dpr=canvas.width/rect.width;
    var px=cx2*dpr, py=cy2*dpr;
    var sz=canvas.width, ctr=sz/2;
    var outerR=ctr-1, innerR=outerR*0.62;
    var sqHalf=innerR*0.70;
    var dx=px-ctr, dy=py-ctr, dist=Math.sqrt(dx*dx+dy*dy);
    if(dist>=innerR&&dist<=outerR){
      // Clicked hue ring
      _currentHue=(Math.atan2(dy,dx)*180/Math.PI+360)%360;
      var sv=hexToSV(getColor());
      var hex=hsvToHex(_currentHue,sv.s,sv.v);
      applyColor(hex);
    } else if(dist<innerR){
      // Clicked SV square
      var sqX=ctr-sqHalf, sqY=ctr-sqHalf, sqW=sqHalf*2;
      var s=Math.max(0,Math.min(1,(px-sqX)/sqW));
      var v=Math.max(0,Math.min(1,1-(py-sqY)/sqW));
      var hex=hsvToHex(_currentHue,s,v);
      applyColor(hex);
    }
  }
  canvas.addEventListener('mousedown',function(e){pressing=true;pick(e);});
  canvas.addEventListener('mousemove',function(e){if(pressing)pick(e);});
  window.addEventListener('mouseup',function(){pressing=false;});
  canvas.addEventListener('touchstart',function(e){e.preventDefault();pressing=true;pick(e);},{passive:false});
  canvas.addEventListener('touchmove',function(e){e.preventDefault();if(pressing)pick(e);},{passive:false});
  window.addEventListener('touchend',function(){pressing=false;});
  if(hexInput){
    hexInput.addEventListener('input',function(){
      var v=this.value;if(/^#[0-9a-fA-F]{6}$/.test(v)){_currentHue=hexToHSL(v).h;applyColor(v);}
    });
  }
  drawColorWheel(canvas,getColor());
  if(preview)preview.style.background=getColor();
  if(hexInput)hexInput.value=getColor();
}

function buildColorSection(){
  // Draw wheels
  var w1=document.getElementById('color-wheel');
  var w2=document.getElementById('color-wheel2');
  if(w1)drawColorWheel(w1,myColor);
  if(w2){drawColorWheel(w2,myColor2);w2.style.opacity=myGradient?'1':'.4';}
  // Previews
  var p1=document.getElementById('color-preview'),p2=document.getElementById('color-preview2');
  if(p1)p1.style.background=myColor;
  if(p2)p2.style.background=myColor2;
  var h1=document.getElementById('color-hex'),h2=document.getElementById('color-hex2');
  if(h1)h1.value=myColor;
  if(h2)h2.value=myColor2;
  // Toggle
  var gc=document.getElementById('gradient-check');if(gc)gc.className=myGradient?'on':'';
  // Blend row
  var blendRow=document.getElementById('gradient-blend-row');
  if(blendRow)blendRow.style.display=myGradient?'block':'none';
  // Preview bar
  var prev=document.getElementById('grad-preview');
  if(prev)prev.style.background=myGradient?'linear-gradient('+myGradAngle+'deg,'+myColor+','+myColor2+')':myColor;
  document.querySelectorAll('.gstyle').forEach(function(g){g.className='gstyle'+(g.dataset.gs===myGradStyle?' active':'');});
}

// Init color wheels when panel opens (deferred so canvases exist in DOM)
var wheelsInited=false;
function ensureWheels(){
  if(wheelsInited)return;wheelsInited=true;
  initColorWheel('color-wheel','color-preview','color-hex',function(){return myColor;},function(v){myColor=v;document.documentElement.style.setProperty('--me-color',v);});
  initColorWheel('color-wheel2','color-preview2','color-hex2',function(){return myColor2;},function(v){if(myGradient)myColor2=v;});
}

// Update mini color preview in dropdown header
function updateColorMiniPreview(){
  var mini=document.getElementById('color-preview-mini');
  if(mini)mini.style.background=myGradient?'linear-gradient(135deg,'+myColor+','+myColor2+')':myColor;
}

// Dropdown toggle for color section
var colorSectionOpen=false;
document.getElementById('color-section-header').addEventListener('click',function(){
  colorSectionOpen=!colorSectionOpen;
  var body=document.getElementById('color-section-body');
  var chevron=document.getElementById('color-section-chevron');
  body.style.display=colorSectionOpen?'flex':'none';
  chevron.style.transform=colorSectionOpen?'rotate(180deg)':'';
  if(colorSectionOpen){setTimeout(ensureWheels,0);buildColorSection();}
});

buildColorSection();
document.getElementById('gradient-toggle').addEventListener('click',function(){
  myGradient=!myGradient;buildColorSection();renderPlanets();
  if(openedUserId===0)openPanel(getUserById(0));
});
document.querySelectorAll('.gstyle').forEach(function(g){
  g.addEventListener('click',function(e){e.stopPropagation();myGradStyle=g.dataset.gs;buildColorSection();renderPlanets();});
});
var angleSlider=document.getElementById('grad-angle');
if(angleSlider){
  angleSlider.addEventListener('input',function(){
    myGradAngle=parseInt(this.value);
    var av=document.getElementById('grad-angle-val');if(av)av.textContent=myGradAngle+'°';
    buildColorSection();renderPlanets();if(openedUserId===0)openPanel(getUserById(0));
  });
}

function makePlanetSVG(u,r){
  var p='p'+u.id;
  var hatExtra=Math.round(r*0.78); // always reserve space — planets don't shift on toggle
  var d=r*2+20,totalH=d+hatExtra;
  var cols=getUserColors(u);
  var c0=cols[0],c1=cols[1],c2=cols[2];
  var hasRing=u.me?myRing:(u.ring!==undefined?u.ring:u.songs>50);
  var cx=d/2,cy=d/2+hatExtra;

  var s='<defs>';
  s+='<radialGradient id="'+p+'g" cx="35%" cy="28%" r="70%"><stop offset="0%" stop-color="'+c0+'"/><stop offset="55%" stop-color="'+c1+'"/><stop offset="100%" stop-color="'+c2+'"/></radialGradient>';
  s+='<radialGradient id="'+p+'sh" cx="30%" cy="25%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,.32)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>';
  s+='<radialGradient id="'+p+'dk" cx="72%" cy="74%" r="58%"><stop offset="0%" stop-color="'+c2+'cc"/><stop offset="100%" stop-color="rgba(0,0,0,0)"/></radialGradient>';
  var uGrad=getUserGradient(u);
  var uColor2=getUserColor2(u);
  var hasLinearGrad=uColor2!=null;
  // Baked two-color linear gradient for planets that have baseColor2 (or me with gradient on)
  if(hasLinearGrad){
    var ang=getUserGradAngle(u);
    var rad=ang*Math.PI/180;
    var ux2=+(Math.cos(rad-Math.PI/2)*.5+.5).toFixed(4);
    var uy2=+(Math.sin(rad-Math.PI/2)*.5+.5).toFixed(4);
    var ux1=+(1-ux2).toFixed(4),uy1=+(1-uy2).toFixed(4);
    var gc1=u.me?myColor:c0;
    var gc2=u.me?myColor2:uColor2;
    s+='<linearGradient id="'+p+'col" x1="'+ux1+'" y1="'+uy1+'" x2="'+ux2+'" y2="'+uy2+'" gradientUnits="objectBoundingBox">';
    s+='<stop offset="0%" stop-color="'+gc1+'"/>';
    s+='<stop offset="100%" stop-color="'+gc2+'"/>';
    s+='</linearGradient>';
    s+='<radialGradient id="'+p+'sph" cx="35%" cy="28%" r="75%">';
    s+='<stop offset="0%" stop-color="rgba(255,255,255,.28)"/>';
    s+='<stop offset="60%" stop-color="rgba(0,0,0,0)"/>';
    s+='<stop offset="100%" stop-color="rgba(0,0,0,.38)"/>';
    s+='</radialGradient>';
  } else if(uGrad){
    var gs=GRADIENT_STYLES[uGrad]||GRADIENT_STYLES.nebula;
    s+='<linearGradient id="'+p+'ov" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="'+gs.a+'"/><stop offset="100%" stop-color="'+gs.b+'"/></linearGradient>';
  }
  // Ring clip paths: upper half (behind planet) and lower half (in front)
  if(hasRing){
    s+='<clipPath id="'+p+'rback"><rect x="'+(cx-r*2)+'" y="'+(cy-r*2)+'" width="'+(r*4)+'" height="'+(r*2)+'"/></clipPath>';
    s+='<clipPath id="'+p+'rfront"><rect x="'+(cx-r*2)+'" y="'+cy+'" width="'+(r*4)+'" height="'+(r*2)+'"/></clipPath>';
  }
  s+='<clipPath id="'+p+'cl"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/></clipPath></defs>';

  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*1.38)+'" fill="'+c1+'12"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*1.16)+'" fill="'+c1+'0d"/>';
  if(hasRing){
    var rw=r*1.62,rh=r*.22;
      s+='<g clip-path="url(#'+p+'rback)">';
    s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rw+'" ry="'+rh+'" fill="none" stroke="'+c0+'50" stroke-width="3.5"/>';
    s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rw*.78)+'" ry="'+(rh*.6)+'" fill="none" stroke="'+c1+'30" stroke-width="2"/>';
    s+='</g>';
  }
  s+='<g clip-path="url(#'+p+'cl)">';
  if(hasLinearGrad){
      var gc1b=u.me?myColor:c0;
    var gc2b=u.me?myColor2:(uColor2||c0);
    var midC=lerpColor(gc1b,gc2b,.5);
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'col)"/>';
    s+='<ellipse cx="'+cx+'" cy="'+(cy+r*.3)+'" rx="'+(r*.55)+'" ry="'+(r*.2)+'" fill="'+midC+'28"/>';
    s+='<ellipse cx="'+(cx+r*.18)+'" cy="'+(cy-r*.22)+'" rx="'+(r*.42)+'" ry="'+(r*.17)+'" fill="'+gc1b+'20"/>';
    s+='<ellipse cx="'+(cx-r*.22)+'" cy="'+(cy+r*.46)+'" rx="'+(r*.48)+'" ry="'+(r*.12)+'" fill="'+gc2b+'38"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'sph)"/>';
  } else {
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'g)"/>';
    s+='<ellipse cx="'+cx+'" cy="'+(cy+r*.3)+'" rx="'+(r*.55)+'" ry="'+(r*.2)+'" fill="'+c0+'22"/>';
    s+='<ellipse cx="'+(cx+r*.18)+'" cy="'+(cy-r*.22)+'" rx="'+(r*.42)+'" ry="'+(r*.17)+'" fill="'+c0+'18"/>';
    s+='<ellipse cx="'+(cx-r*.22)+'" cy="'+(cy+r*.46)+'" rx="'+(r*.48)+'" ry="'+(r*.12)+'" fill="'+c2+'4e"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'dk)"/>';
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'sh)"/>';
    if(uGrad){
      var gs2=GRADIENT_STYLES[uGrad]||GRADIENT_STYLES.nebula;
      s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="url(#'+p+'ov)" style="mix-blend-mode:'+gs2.blend+'" opacity=".7"/>';
    }
  }
  s+='</g>';
  if(hasRing){
    var rw=r*1.62,rh=r*.22;
    s+='<g clip-path="url(#'+p+'rfront)">';
    s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rw+'" ry="'+rh+'" fill="none" stroke="'+c0+'cc" stroke-width="3.5"/>';
    s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rw*.78)+'" ry="'+(rh*.6)+'" fill="none" stroke="'+c1+'55" stroke-width="2"/>';
    s+='</g>';
  }
  if(u.me){
    s+=getHatSVG(myHat,cx,cy,r,c0);
    s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+4)+'" fill="none" stroke="'+c0+(OPT_ANIM?'3a':'22')+'" stroke-width="1" stroke-dasharray="3 4"/>';
  } else if(OPT_HATS){
    var oh=getOtherHat(u.id);
    if(oh&&oh!=='none')s+=getHatSVG(oh,cx,cy,r,c0);
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+d+'" height="'+totalH+'" viewBox="0 0 '+d+' '+totalH+'" style="display:block;overflow:visible">'+s+'</svg>';
}

function computeVisible(){
  visibleIds=new Set();var q=searchQ.toLowerCase().trim();
  var isFiltering=q.length>0||activeKeyword;
  var kwG=null;if(q&&KEYWORD_MAP[q])kwG=KEYWORD_MAP[q];else if(activeKeyword&&KEYWORD_MAP[activeKeyword])kwG=KEYWORD_MAP[activeKeyword];

  // Build candidate list with match flag
  var candidates=[];
  for(var i=0;i<USERS.length;i++){
    var u=USERS[i];if(u.me)continue;
    if(u.userAdded){visibleIds.add(u.id);continue;}
    var uGenres=u.genres||[u.genre];
    var uVibes=(u.customTags||[]);
    var ms=true;
    if(isFiltering){
      if(kwG){ms=uGenres.some(function(g){return kwG.indexOf(g)>=0;});}
      else{ms=u.name.toLowerCase().indexOf(q)>=0
        ||uGenres.some(function(g){return g.toLowerCase().indexOf(q)>=0||(GENRE_VIBES[g]||'').toLowerCase().indexOf(q)>=0;})
        ||uVibes.some(function(t){return t.toLowerCase().indexOf(q)>=0;});}
    }
    if(ms)candidates.push(u);
  }

  if(isFiltering){
    // Show all matches when filtering
    candidates.forEach(function(u){visibleIds.add(u.id);});
  } else {
      var cx=W/2-offsetX*scale, cy=H/2-offsetY*scale; // approximate screen center in world
    candidates.sort(function(a,b){
      var pa=getPos(a.id),pb=getPos(b.id);
      var da=Math.sqrt(Math.pow(pa.x-W/2,2)+Math.pow(pa.y-H/2,2));
      var db=Math.sqrt(Math.pow(pb.x-W/2,2)+Math.pow(pb.y-H/2,2));
      return da-db;
    });
    for(var j=0;j<Math.min(candidates.length,PLANET_LIMIT);j++){
      visibleIds.add(candidates[j].id);
    }
  }
  visibleIds.add(0);
}

function renderPlanets(){
  computeVisible();planetsLayer.innerHTML='';
  for(var i=0;i<USERS.length;i++){
    var u=USERS[i];
    if(!visibleIds.has(u.id))continue;
    var r=radius(u.songs)*scale;
    var stablePos=getPos(u.id);
    var wrap=document.createElement('div');wrap.className='pw';wrap.dataset.uid=u.id;wrap.style.left=stablePos.x+'px';wrap.style.top=stablePos.y+'px';
    var svgWrap=document.createElement('div');
    svgWrap.style.position='relative';
    // Offset only the SVG by drift delta so label stays anchored
    // drift transform applied per-frame in updateDriftTransforms()
    svgWrap.innerHTML=makePlanetSVG(u,r);
    if(u.me&&OPT_ANIM){var sz=(r+18)*2;var mr=document.createElement('div');mr.className='me-pulse';mr.style.width=sz+'px';mr.style.height=sz+'px';svgWrap.appendChild(mr);}
    var svgEl=svgWrap.querySelector('svg');svgEl.style.cursor='pointer';
    svgEl.style.filter='brightness('+PL_BRIGHT+'%) saturate('+PL_SAT+'%)'+(PL_GLOW>0?' drop-shadow(0 0 '+(PL_GLOW*0.14)+'px '+getUserColors(u)[0]+(Math.round(PL_GLOW*1.2+100).toString(16))+')'  :'');
    if(u.me){
      (function(el,user){
        var mDragX,mDragY,mPosX,mPosY,mDidDrag=false;
        el.addEventListener('mousedown',function(e){
          mDragX=e.clientX;mDragY=e.clientY;
          mPosX=user.pos.x||0.48;mPosY=user.pos.y||0.46;
          mDidDrag=false;
          function onMove(ev){
            var dx=(ev.clientX-mDragX)/scale/(W*2.2);
            var dy=(ev.clientY-mDragY)/scale/(H*2.2);
            if(Math.abs(ev.clientX-mDragX)>4||Math.abs(ev.clientY-mDragY)>4)mDidDrag=true;
            if(!mDidDrag)return;
            user.pos={x:mPosX+dx,y:mPosY+dy};
            renderPlanets();
          }
          function onUp(){
            document.removeEventListener('mousemove',onMove);
            document.removeEventListener('mouseup',onUp);
            if(!mDidDrag){
              openPanel(user);
            }
          }
          document.addEventListener('mousemove',onMove);
          document.addEventListener('mouseup',onUp);
          e.stopPropagation();
        });
      })(svgEl,u);
    } else {
      (function(user,el){
        var dragStartX,dragStartY,dragStartPosX,dragStartPosY,didDrag=false;
        el.addEventListener('mousedown',function(e){
          if(!user.userAdded&&!user.me)return; // only draggable for your planets
          dragStartX=e.clientX;dragStartY=e.clientY;
          dragStartPosX=user.pos.x;dragStartPosY=user.pos.y;
          didDrag=false;
          el.style.cursor='grabbing';
          function onMove(ev){
            var dx=(ev.clientX-dragStartX)/scale/(W*2.2);
            var dy=(ev.clientY-dragStartY)/scale/(H*2.2);
            if(Math.abs(ev.clientX-dragStartX)>4||Math.abs(ev.clientY-dragStartY)>4)didDrag=true;
            if(!didDrag)return;
            user.pos.x=dragStartPosX+dx;
            user.pos.y=dragStartPosY+dy;
            renderPlanets();
          }
          function onUp(){
            el.style.cursor='pointer';
            document.removeEventListener('mousemove',onMove);
            document.removeEventListener('mouseup',onUp);
            if(!didDrag){e.stopPropagation();openPanel(user);}
            else{scheduleSave&&scheduleSave();}
          }
          document.addEventListener('mousemove',onMove);
          document.addEventListener('mouseup',onUp);
          e.stopPropagation();
        });
        el.addEventListener('click',function(e){
          if(!didDrag){e.stopPropagation();if(!user.userAdded)openPanel(user);}
        });
      })(u,svgEl);
    }
    wrap.appendChild(svgWrap);planetsLayer.appendChild(wrap);
  }
}
function renderAll(){renderPlanets();buildDiscovery();updateColorMiniPreview&&updateColorMiniPreview();if(currentUser)scheduleSave();}

function openHatPicker(e){
  var picker=document.getElementById('hat-picker');
  buildHatPicker();
  picker.style.display='flex';hatPickerOpen=true;
  var x=e.clientX,y=e.clientY,pw=205,ph=240;
  if(x+pw>W)x=W-pw-10;if(y+ph>H)y=H-ph-10;
  picker.style.left=x+'px';picker.style.top=y+'px';
}
document.getElementById('hat-picker').addEventListener('click',function(e){e.stopPropagation();});

function addConnection(a,b){var ua=getUserById(a),ub=getUserById(b);if(!ua||!ub)return;if(ua.connections.indexOf(b)<0)ua.connections.push(b);if(ub.connections.indexOf(a)<0)ub.connections.push(a);}

function openPanel(u){
  openedUserId=u.id;
  var cols=getUserColors(u);
  document.getElementById('pav').style.background=cols[1]+'40';document.getElementById('pav').style.color=cols[0];document.getElementById('pav').textContent=u.initials;
  if(u.userAdded){
    var pnameEl=document.getElementById('pname');
    pnameEl.contentEditable='false';
    pnameEl.style.outline='none';
    pnameEl.style.borderBottom='none';
    pnameEl.style.cursor='';
    pnameEl.title='';
    var meDisplay2=currentUser?currentUser.username+' (you)':'Username (you)';
    pnameEl.textContent=meDisplay2;
    pnameEl.oninput=function(){
      u.name=pnameEl.textContent.trim().toLowerCase().slice(0,20)||'you';
      u.initials=u.name.slice(0,2).toUpperCase();
      renderPlanets();scheduleSave&&scheduleSave();
    };
    pnameEl.onblur=function(){
      pnameEl.contentEditable='false';
      pnameEl.style.borderBottom='none';pnameEl.style.cursor='';
    };
    pnameEl.onfocus=function(){pnameEl.style.borderBottom='0.5px dashed rgba(167,139,250,.5)';};
  } else {
    var pnameEl=document.getElementById('pname');
    pnameEl.contentEditable='false';pnameEl.style.borderBottom='none';pnameEl.style.cursor='';pnameEl.oninput=null;
    var meDisplay=currentUser?currentUser.username+' (you)':'Username (you)';
    pnameEl.textContent=u.me?meDisplay:u.name;
  }
  // For user-added planets with a Spotify ID, show playlist title cleanly (not the raw slug)
  var genres=u.genres||[u.genre];
  document.getElementById('pmeta').textContent=u.songs+' songs · '+genres.join(', ');
  // Render genre tags row

  var ar=document.getElementById('action-row'),lb=document.getElementById('like-btn'),cb=document.getElementById('connect-btn');
  var cs=document.getElementById('color-section');
  // Reset suggestions state when switching planets
  genreSuggestionsOpen=false;
  var sugPanel=document.getElementById('genre-suggestions');
  if(sugPanel)sugPanel.style.display='none';

  if(u.me){
    ar.style.display='none';cs.className='visible';buildColorSection();updateColorMiniPreview();
  } else {
    ar.style.display='flex';cs.className='';
    var me=USERS[0],isLiked=me.likes.indexOf(u.id)>=0,isConn=me.connections.indexOf(u.id)>=0;
    lb.className=isLiked?'liked':'';lb.textContent=isLiked?'♥ Liked':'♡ Like';
    if(isConn){cb.style.display='block';cb.className='connected';cb.textContent='✓ Connected';}
    else if(isLiked){cb.style.display='block';cb.className='';cb.textContent='⟶ Connect';}
    else{cb.style.display='none';}
    var spab=document.getElementById('sp-action-btn');
    if(spab){
      if(u.spotifyId){spab.style.display='flex';spab.href='https://open.spotify.com/playlist/'+u.spotifyId;}
      else{spab.style.display='none';}
    }
  }
  buildGenrePicker(u,false);
  // For user-added planets: show links to your other added planets
  var myPlanetsSection=document.getElementById('my-planets-section');
  if(!myPlanetsSection){
    myPlanetsSection=document.createElement('div');myPlanetsSection.id='my-planets-section';
    document.getElementById('pconn').parentNode.insertBefore(myPlanetsSection,document.getElementById('pconn'));
  }
  myPlanetsSection.innerHTML='';
  if(u.userAdded){
    var myOthers=USERS.filter(function(x){return x.userAdded&&x.id!==u.id;});
    if(myOthers.length){
      var h=document.createElement('div');h.style.cssText='font-size:9px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px';h.textContent='Your other planets';
      myPlanetsSection.appendChild(h);
      var chips=document.createElement('div');chips.style.cssText='display:flex;flex-wrap:wrap;gap:5px';
      myOthers.forEach(function(op){
        var isLinked=u.connections.indexOf(op.id)>=0||op.connections.indexOf(u.id)>=0;
        var chip=document.createElement('div');
        chip.style.cssText='display:flex;align-items:center;gap:5px;padding:4px 9px;border-radius:8px;border:0.5px solid '+(isLinked?'rgba(167,139,250,.35)':'rgba(255,255,255,.08)')+';background:'+(isLinked?'rgba(167,139,250,.1)':'rgba(255,255,255,.03)')+';cursor:pointer;font-size:10px;color:'+(isLinked?'#a78bfa':'rgba(255,255,255,.45)');
        var dot=document.createElement('span');dot.style.cssText='width:7px;height:7px;border-radius:50%;background:'+getUserColors(op)[0]+';flex-shrink:0';
        chip.appendChild(dot);
        var lbl=document.createElement('span');lbl.textContent=(op.playlistTitle||op.name).slice(0,16);chip.appendChild(lbl);
        if(isLinked){var tick=document.createElement('span');tick.textContent='✓';tick.style.cssText='font-size:9px;color:#a78bfa';chip.appendChild(tick);}
        chip.addEventListener('click',function(){
          // Toggle connection between this planet and the other
          var idxA=u.connections.indexOf(op.id),idxB=op.connections.indexOf(u.id);
          if(idxA>=0){u.connections.splice(idxA,1);if(idxB>=0)op.connections.splice(idxB,1);}
          else{u.connections.push(op.id);op.connections.push(u.id);}
          renderAll();scheduleSave&&scheduleSave();openPanel(u);
        });
        chips.appendChild(chip);
      });
      myPlanetsSection.appendChild(chips);
    }
  }
  var ps=document.getElementById('psongs');ps.innerHTML='';
  // Reset flex state from any previous Spotify embed
  ps.style.flex='';ps.style.minHeight='';ps.style.display='flex';ps.style.flexDirection='column';

  // For Spotify planets: show the playlist as a regular list + open button
  // For demo planets: show their hardcoded playlist
  // Either way, render song rows the same way
  var playlist=u.playlist||[];
  // Non-Spotify planets show their track list
  if(!u.spotifyId){
    for(var i=0;i<playlist.length;i++){
      var s=playlist[i];
      var row=document.createElement('div');row.className='srow';
      row.innerHTML='<span class="snum">'+(i+1)+'</span><div class="si"><div class="st">'+s.t+'</div><div class="sa">'+s.a+'</div></div><span class="sd">'+s.d+'</span>';
      ps.appendChild(row);
    }
  }

  // All Spotify planets get the full embed
  if(u.spotifyId){
    ps.innerHTML='';
    var embedWrap=document.createElement('div');
    embedWrap.style.cssText='border-radius:12px;overflow:hidden;flex:1;min-height:0;display:flex;flex-direction:column';
    var iframe=document.createElement('iframe');
    iframe.src='https://open.spotify.com/embed/playlist/'+u.spotifyId+'?utm_source=generator&theme=0';
    iframe.width='100%';iframe.height='100%';
    iframe.setAttribute('frameBorder','0');iframe.setAttribute('allowfullscreen','');
    iframe.setAttribute('allow','autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    iframe.setAttribute('loading','lazy');
    iframe.style.cssText='border-radius:12px;display:block;flex:1;min-height:0';
    embedWrap.appendChild(iframe);
    ps.style.flex='1';ps.style.minHeight='0';
    ps.appendChild(embedWrap);
  }
  var pc=document.getElementById('pconn');pc.innerHTML='';
  if(u.connections.length){var h4=document.createElement('h4');h4.textContent='Connected to';pc.appendChild(h4);var chips=document.createElement('div');for(var c=0;c<u.connections.length;c++){var cu=getUserById(u.connections[c]);if(!cu)continue;var chip=document.createElement('div');chip.className='cchip';var cc2=getUserColors(cu);chip.innerHTML='<span class="cdot" style="background:'+cc2[0]+'"></span>'+(cu.me?(currentUser?currentUser.username+' (you)':'Username (you)'):cu.name);(function(u2){chip.addEventListener('click',function(){openPanel(u2);});})(cu);chips.appendChild(chip);}pc.appendChild(chips);}
  // Stats and compare
  var stats=document.getElementById('stats-section');
  var cmpBtn=document.getElementById('compare-btn');
  if(u.me){stats.className='visible';buildStats();if(cmpBtn)cmpBtn.style.display='none';}
  else{stats.className='';var isConn2=USERS[0].connections.indexOf(u.id)>=0;if(cmpBtn)cmpBtn.style.display=isConn2?'block':'none';}
  document.getElementById('panel').classList.add('open');
}

document.getElementById('like-btn').addEventListener('click',function(){
  if(openedUserId<0||openedUserId===0)return;
  var me=USERS[0],u=getUserById(openedUserId);if(!u)return;
  var idx=me.likes.indexOf(openedUserId);
  if(idx>=0){me.likes.splice(idx,1);var ci=me.connections.indexOf(openedUserId);if(ci>=0)me.connections.splice(ci,1);var ci2=u.connections.indexOf(0);if(ci2>=0)u.connections.splice(ci2,1);}
  else{me.likes.push(openedUserId);}
  renderPlanets();openPanel(u);
});
document.getElementById('connect-btn').addEventListener('click',function(){
  if(this.className==='connected')return;
  var me=USERS[0],u=getUserById(openedUserId);if(!u||me.likes.indexOf(openedUserId)<0)return;
  addConnection(0,openedUserId);renderPlanets();openPanel(u);
});
document.getElementById('pcls').addEventListener('click',function(){document.getElementById('panel').classList.remove('open');});

// Sidebar drag-to-reposition
(function(){
  var sb=document.getElementById('sidebar');
  var header=document.getElementById('sb-header');
  var isDragging=false,startX=0,startY=0,startL=0,startT=0,didMove=false;

  header.addEventListener('mousedown',function(e){
    e.preventDefault();
    var rect=sb.getBoundingClientRect();
    isDragging=true;didMove=false;
    startX=e.clientX;startY=e.clientY;
    startL=rect.left;startT=rect.top;
    header.style.cursor='grabbing';
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  });
  function onMove(e){
    if(!isDragging)return;
    var dx=e.clientX-startX,dy=e.clientY-startY;
    if(Math.abs(dx)>3||Math.abs(dy)>3)didMove=true;
    var newL=Math.max(0,Math.min(window.innerWidth-sb.offsetWidth,startL+dx));
    var newT=Math.max(0,Math.min(window.innerHeight-sb.offsetHeight,startT+dy));
    sb.style.left=newL+'px';sb.style.top=newT+'px';sb.style.transform='none';
  }
  function onUp(){
    isDragging=false;header.style.cursor='grab';
    document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);
  }

  // Only toggle collapse if it was a click, not a drag
  header.addEventListener('click',function(){
    if(didMove)return;
    sidebarCollapsed=!sidebarCollapsed;
    document.getElementById('sb-body').classList.toggle('collapsed',sidebarCollapsed);
    document.getElementById('sb-toggle').textContent=sidebarCollapsed?'+':'−';
  });
})();

// ── Discovery engine ──
var DISCOVERY_REASONS=[
  function(u,me){
    var ug=u.genres||[u.genre],mg=me.genres||[me.genre];
    if(ug.some(function(g){return mg.indexOf(g)>=0;}))return 'same vibe as you';return null;
  },
  function(u,me){
    // friend-of-friend: connected to someone you're connected to
    for(var i=0;i<me.connections.length;i++){
      var friend=getUserById(me.connections[i]);
      if(friend&&friend.connections.indexOf(u.id)>=0)return 'known by '+friend.name;
    }return null;
  },
  function(u,me){
    // near genre cluster
    var myCC=CLUSTER_CENTERS[(me.genres&&me.genres[0])||me.genre],theirCC=CLUSTER_CENTERS[(u.genres&&u.genres[0])||u.genre];
    if(!myCC||!theirCC)return null;
    var dx=myCC.x-theirCC.x,dy=myCC.y-theirCC.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<0.28)return 'close in the universe';return null;
  },
  function(u){if(u.songs>55)return 'massive playlist';return null;},
  function(u,me){if(u.spotifyId&&me.likes.indexOf(u.id)<0)return 'has a real playlist';return null;},
];

var FALLBACK_REASONS=['orbiting nearby','trending in their cluster','popular in the universe','rising planet'];

function buildDiscovery(){
  var cards=document.getElementById('disc-cards');
  if(!cards)return;
  cards.innerHTML='';
  var me=USERS[0];
  var candidates=USERS.filter(function(u){
    return !u.me && me.connections.indexOf(u.id)<0 && visibleIds.has(u.id);
  });
  // Score each candidate
  var scored=candidates.map(function(u){
    var reasons=[];
    DISCOVERY_REASONS.forEach(function(fn){var r=fn(u,me);if(r)reasons.push(r);});
    var score=reasons.length + (u.spotifyId?1:0) + (u.songs>40?0.5:0);
    return{u:u,score:score,reason:reasons[0]||FALLBACK_REASONS[Math.floor(Math.random()*FALLBACK_REASONS.length)]};
  });
  // Shuffle then sort so there's some variety
  scored.sort(function(){return Math.random()-.5;});
  scored.sort(function(a,b){return b.score-a.score;});
  var picks=scored.slice(0,4);
  if(!picks.length){
    var empty=document.createElement('div');
    empty.style.cssText='font-size:9px;color:rgba(255,255,255,.22);text-align:center;padding:10px 0';
    empty.textContent='Nothing new to discover yet';
    cards.appendChild(empty);return;
  }
  picks.forEach(function(item){
    var u=item.u;
    var col=getUserColors(u)[0];
    var card=document.createElement('div');
    card.className='disc-card';
    var genreCol=GENRE_COLORS[u.genre]||col;
    card.innerHTML='<div class="disc-planet-row"><span class="disc-dot" style="background:'+col+';box-shadow:0 0 6px '+col+'66"></span><span class="disc-name">'+u.name+'</span></div>'
      +'<div class="disc-reason">'+item.reason+'</div>'
      +'<span class="disc-genre" style="background:'+genreCol+'18;color:'+genreCol+'">'+u.genre+'</span>';
    card.addEventListener('click',function(){
      // Pan camera to this planet
      var wp=getWorldPos(u.id);
      panTo(W/2-wp.x, H/2-wp.y, function(){openPanel(u);});
    });
    cards.appendChild(card);
  });
}

// Refresh button
document.getElementById('sb-refresh').addEventListener('click',function(){
  var icon=document.getElementById('sb-refresh-icon');
  icon.style.transform='rotate(360deg)';
  setTimeout(function(){icon.style.transform='';icon.style.transition='none';setTimeout(function(){icon.style.transition='';},50);},400);
  buildDiscovery();
});
var tagsEl=document.getElementById('search-tags');
for(var ki=0;ki<KEYWORD_SUGGESTIONS.length;ki++){
  var kw=KEYWORD_SUGGESTIONS[ki];var tag=document.createElement('span');tag.className='stag';tag.textContent=kw;
  (function(kwI,tagEl){tagEl.addEventListener('click',function(){if(activeKeyword===kwI){activeKeyword=null;tagEl.classList.remove('active');document.getElementById('search-input').value='';searchQ='';}else{document.querySelectorAll('.stag').forEach(function(t){t.classList.remove('active');});activeKeyword=kwI;tagEl.classList.add('active');document.getElementById('search-input').value=kwI;searchQ=kwI;}renderPlanets();});})(kw,tag);
  tagsEl.appendChild(tag);
}
document.getElementById('search-input').addEventListener('input',function(e){searchQ=e.target.value;activeKeyword=null;document.querySelectorAll('.stag').forEach(function(t){t.classList.remove('active');});renderPlanets();});

root.addEventListener('mousedown',function(e){if(zoomDragging)return;if(e.target.closest('svg')||e.target.closest('#panel')||e.target.closest('#topbar')||e.target.closest('#sidebar')||e.target.closest('#add-panel')||e.target.closest('#zoom-bar')||e.target.closest('#hat-picker')||e.target.closest('#settings-panel')||e.target.closest('#settings-btn')||e.target.closest('#auth-popup')||e.target.closest('#auth-btn')||e.target.closest('#activity-panel')||e.target.closest('#activity-btn')||e.target.closest('#compare-modal')||e.target.closest('#onboard-overlay')||e.target.closest('#help-btn')||e.target.closest('#recenter-btn'))return;panDragging=true;panSX=e.clientX;panSY=e.clientY;panOX=offsetX;panOY=offsetY;});
root.addEventListener('touchstart',function(e){var t=e.touches[0];panDragging=true;panSX=t.clientX;panSY=t.clientY;panOX=offsetX;panOY=offsetY;},{passive:true});

// Double-click blank space to create a new planet there
root.addEventListener('dblclick',function(e){
  if(e.target.closest('svg')||e.target.closest('#panel')||e.target.closest('#topbar')||e.target.closest('#sidebar')||e.target.closest('#add-panel')||e.target.closest('#zoom-bar')||e.target.closest('#hat-picker')||e.target.closest('#settings-panel')||e.target.closest('#settings-btn')||e.target.closest('#auth-popup')||e.target.closest('#auth-btn')||e.target.closest('#activity-panel')||e.target.closest('#activity-btn'))return;
  // Convert click position to world coords and spawn planet there
  var rect=root.getBoundingClientRect();
  var sx=e.clientX-rect.left, sy=e.clientY-rect.top;
  var cx=root.offsetWidth/2, cy=root.offsetHeight/2;
  var wx=(sx-cx)/scale+cx-offsetX;
  // Reverse worldToScreen: sx = cx + (wx - cx + offsetX)*scale  =>  wx = sx/scale - offsetX + cx*(1 - 1/scale)
  var wx = sx/scale - offsetX + cx*(1 - 1/scale);
  var wy = sy/scale - offsetY + cy*(1 - 1/scale);
  // Reverse getWorldPos: wx = pos.x*W*2.2 - W*0.6  =>  pos.x = (wx + W*0.6)/(W*2.2)
  var normX = (wx + root.offsetWidth*0.6) / (root.offsetWidth*2.2);
  var normY = (wy + root.offsetHeight*0.6) / (root.offsetHeight*2.2);
  var pal=PALETTE[nextPaletteIdx%PALETTE.length];nextPaletteIdx++;
  var genre=GENRE_LIST[Math.floor(Math.random()*GENRE_LIST.length)];
  var gradStyles=["nebula","aurora","lava","ice","void",null,null];
  var newU={id:nextId,name:currentUser?currentUser.username:'you',songs:Math.floor(Math.random()*40)+10,genre:genre,
    connections:[],likes:[],initials:(currentUser?currentUser.username:'you').slice(0,2).toUpperCase(),
    baseColor:myColor,baseColor2:myGradient?myColor2:null,gradAngle:myGradAngle||135,
    gradient:myGradient?myGradStyle:null,
    pos:{x:normX,y:normY},spotifyId:null,userAdded:true,
    playlist:[{t:'Track 1',a:'Artist A',d:'3:12'},{t:'Track 2',a:'Artist B',d:'4:05'}]};
  USERS.push(newU);nextId++;
  separatePlanets();renderPlanets();
  setTimeout(function(){openPanel(newU);},100);
});
document.addEventListener('touchmove',function(e){if(!panDragging)return;var t=e.touches[0];offsetX=panOX+(t.clientX-panSX)/scale;offsetY=panOY+(t.clientY-panSY)/scale;renderPlanets();},{passive:true});
document.addEventListener('touchend',function(){panDragging=false;});

var nextId=USERS.length,nextPaletteIdx=0;
function extractSpotifyId(url){
  // Handles: open.spotify.com/playlist/ID, spotify:playlist:ID, or bare ID
  var m=url.match(/playlist[/:]([A-Za-z0-9]+)/);
  return m?m[1]:null;
}

function spawnPlanet(name, songs, spotifyId, coverColor){
  var pal=PALETTE[nextPaletteIdx%PALETTE.length];nextPaletteIdx++;
  var baseColor=coverColor||pal[0];
  var genre=GENRE_LIST[Math.floor(Math.random()*GENRE_LIST.length)];
  var cc=CLUSTER_CENTERS[genre]||{x:.5,y:.5};
  var angle=Math.random()*Math.PI*2;
  var spread=0.12+Math.random()*0.22;
  var bp={x:Math.max(.06,Math.min(.94,cc.x+Math.cos(angle)*spread)),y:Math.max(.06,Math.min(.92,cc.y+Math.sin(angle)*spread))};
  // Inherit "you" planet's colors and style so all your planets look like yours
  var ownerName=currentUser?currentUser.username:'you';
  var playlistTitle=name&&name!==ownerName?name:null;
  var myPlanetColor=myColor;  // always use your current color
  // Generate placeholder tracks that look like real ones for duration calculation
  var fakeSongs=songs||Math.floor(Math.random()*30)+15;
  var fakePl=[];
  var avgMin=3+Math.floor(Math.random()*2);
  for(var fi=0;fi<Math.min(fakeSongs,8);fi++){
    var fm=avgMin+Math.floor(Math.random()*2),fs=Math.floor(Math.random()*60);
    fakePl.push({t:'Track '+(fi+1),a:'—',d:fm+':'+(fs<10?'0':'')+fs});
  }
  var newUser={id:nextId,name:ownerName,songs:fakeSongs,genre:genre,connections:[],likes:[],
    initials:ownerName.slice(0,2).toUpperCase(),
    baseColor:myPlanetColor,baseColor2:myGradient?myColor2:null,
    gradAngle:myGradAngle||135,gradient:myGradient?myGradStyle:null,
    pos:bp,spotifyId:spotifyId||null,owner:ownerName,playlistTitle:playlistTitle,
    playlist:fakePl};
  newUser.userAdded=true;
  USERS.push(newUser);nextId++;
  separatePlanets();renderPlanets();
  // Pan camera to the new planet so it's always visible
  setTimeout(function(){
    var wp=getWorldPos(newUser.id);
    panTo(W/2-wp.x, H/2-wp.y, function(){openPanel(newUser);});
  },120);
  return newUser;
}

document.getElementById('add-btn').addEventListener('click',function(){
  var input=document.getElementById('playlist-input');
  var val=input.value.trim();if(!val)return;
  var btn=document.getElementById('add-btn');
  var spotifyId=extractSpotifyId(val);

  if(spotifyId){
      var planet=spawnPlanet(null, Math.floor(Math.random()*60)+20, spotifyId, null);
    input.value='';
    // Then try to fetch the real name and update it
    btn.textContent='Fetching…';btn.style.opacity='.6';
    var oEmbedUrl='https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/'+spotifyId;
    fetch('https://corsproxy.io/?'+encodeURIComponent(oEmbedUrl))
      .then(function(r){return r.json();})
      .then(function(data){
        var name=(data.title||slug).slice(0,22).toLowerCase();
        planet.playlistTitle=name; // store playlist title, keep planet name as owner
        renderPlanets();
      })
      .catch(function(){/* keep slug name */})
      .finally(function(){
        btn.textContent='+ Add planet';btn.style.opacity='1';
      });
  } else {
    // Non-Spotify: plain name entry
    spawnPlanet(val, Math.floor(Math.random()*40)+15, null, null);
    input.value='';
  }
});

function drawBg(){
  var ctx=bgCanvas.getContext('2d');ctx.clearRect(0,0,W,H);if(OPT_ANIM)tick+=0.016;
  var bdef=BG_BASE;
  // Background fill with filter
  bgCanvas.style.filter='hue-rotate('+BG_HUE+'deg) brightness('+BG_BRIGHT+'%)';
  ctx.fillStyle=bdef.bg;ctx.fillRect(0,0,W,H);
  var gl=Object.keys(CLUSTER_CENTERS);
  var ni=BG_NEBULA/100;
  var clouds=[[.3,.4,bdef.cloud1,.15*ni],[.72,.28,bdef.cloud2,.12*ni],[.5,.72,bdef.cloud3,.1*ni]];
  for(var ci=0;ci<clouds.length;ci++){
    var cl=clouds[ci],gx2=cl[0]*W+offsetX*.12*scale,gy2=cl[1]*H+offsetY*.12*scale;
    var grad2=ctx.createRadialGradient(gx2,gy2,0,gx2,gy2,Math.min(W,H)*.5);
    var rgb2=cl[2].slice(1);var rr2=parseInt(rgb2.slice(0,2),16),gg2=parseInt(rgb2.slice(2,4),16),bb2=parseInt(rgb2.slice(4,6),16);
    grad2.addColorStop(0,'rgba('+rr2+','+gg2+','+bb2+','+cl[3]+')');grad2.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad2;ctx.fillRect(0,0,W,H);
  }
  // Genre glows
  for(var gi=0;gi<gl.length;gi++){
    var g=gl[gi],cc=CLUSTER_CENTERS[g],wp={x:cc.x*W*2.2-W*.6,y:cc.y*H*2.2-H*.6},sp=worldToScreen(wp.x,wp.y);
    var col=GENRE_COLORS[g]||'#fff',r2=parseInt(col.slice(1,3),16),g2=parseInt(col.slice(3,5),16),b2=parseInt(col.slice(5,7),16);
    var grad=ctx.createRadialGradient(sp.x,sp.y,0,sp.x,sp.y,Math.min(W,H)*.28*scale);
    grad.addColorStop(0,'rgba('+r2+','+g2+','+b2+',.06)');grad.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  }
  // Stars
  for(var i=0;i<stars.length;i++){
    var s=stars[i];
    var sx=((s.x+offsetX*.1*scale)%(W*1.85)+W*1.85)%(W*1.85)-W*.1;
    var sy=((s.y+offsetY*.1*scale)%(H*1.85)+H*1.85)%(H*1.85)-H*.1;
    if(sx<-4||sx>W+4||sy<-4||sy>H+4)continue;
    var spd=s.speed||1;
    var fl=OPT_ANIM?(0.7+Math.sin(tick*spd+s.tw)*0.3):1;
    var alpha=s.a*fl;
    ctx.beginPath();ctx.arc(sx,sy,s.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,'+alpha+')';ctx.fill();
    // Cross sparkle for larger stars
    if(s.r>1.1){
      var sp=s.r*2.5*fl;
      ctx.save();ctx.globalAlpha=alpha*.5;ctx.strokeStyle='#fff';ctx.lineWidth=.5;
      ctx.beginPath();ctx.moveTo(sx-sp,sy);ctx.lineTo(sx+sp,sy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(sx,sy-sp);ctx.lineTo(sx,sy+sp);ctx.stroke();
      ctx.restore();
    }
  }
  // Shooting stars
  if(OPT_SHOOTING&&OPT_ANIM){
    // Spawn new shooter randomly
    if(Math.random()<.004)spawnShooter();
    for(var si2=shooters.length-1;si2>=0;si2--){
      var sh=shooters[si2];
      sh.x+=sh.vx;sh.y+=sh.vy;sh.life-=sh.decay;
      if(sh.life<=0||sh.x>W+100||sh.x<-100||sh.y>H+60){shooters.splice(si2,1);continue;}
      var tailX=sh.x-sh.vx*(sh.len/Math.sqrt(sh.vx*sh.vx+sh.vy*sh.vy));
      var tailY=sh.y-sh.vy*(sh.len/Math.sqrt(sh.vx*sh.vx+sh.vy*sh.vy));
      var sg=ctx.createLinearGradient(tailX,tailY,sh.x,sh.y);
      sg.addColorStop(0,sh.col+'0)');
      sg.addColorStop(.6,sh.col+(sh.life*.4).toFixed(2)+')');
      sg.addColorStop(1,sh.col+(sh.life*.85).toFixed(2)+')');
      ctx.save();ctx.strokeStyle=sg;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(tailX,tailY);ctx.lineTo(sh.x,sh.y);ctx.stroke();
      // Bright head
      ctx.beginPath();ctx.arc(sh.x,sh.y,1.2,0,Math.PI*2);
      ctx.fillStyle=sh.col+(sh.life*.9).toFixed(2)+')';ctx.fill();
      ctx.restore();
    }
  }
  // Vibe labels
  if(OPT_VIBES){for(var gi=0;gi<gl.length;gi++){
    var g=gl[gi],cc=CLUSTER_CENTERS[g],wp={x:cc.x*W*2.2-W*.6,y:cc.y*H*2.2-H*.6},sp=worldToScreen(wp.x,wp.y);
    var topY=sp.y-90*scale; // fixed offset above cluster center — no planet dependency
    ctx.save();
    // Push label well above the highest planet in the cluster
    var labelY=topY-18*scale;
    var fontSize=Math.max(10,13*scale);
    var label=GENRE_VIBES[g]||g;
    var col=GENRE_COLORS[g]||'#fff';
    ctx.font='italic '+fontSize+'px sans-serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    // Measure text width for backdrop
    var tw=ctx.measureText(label).width;
    var pad=10*scale, ph=fontSize*0.75;
    // Dark backdrop pill for readability
    ctx.fillStyle='rgba(4,4,15,0.55)';
    var bx=sp.x-tw/2-pad, bw=tw+pad*2, br=ph*0.7;
    ctx.beginPath();
    ctx.roundRect?ctx.roundRect(bx,labelY-ph,bw,ph*2,br):ctx.rect(bx,labelY-ph,bw,ph*2);
    ctx.fill();
    // Colored text, more opaque
    ctx.fillStyle=col+'cc';
    ctx.fillText(label,sp.x,labelY);
    ctx.restore();
  }}
  if(OPT_LABELS){
    for(var li=0;li<USERS.length;li++){
      var lu=USERS[li];
      if(!visibleIds.has(lu.id))continue;
      var lpos=getPos(lu.id);
      var lr=radius(lu.songs)*scale;
      // hatExtra in the SVG is computed from the UNSCALED r, then rendered at scale
      // makePlanetSVG uses r = radius(songs)*scale as its r argument,
      // so hatExtra = round(lr * 0.78) in screen pixels.
      // The SVG total height = (lr*2+20) + hatExtra
      // .pw centered at lpos means:
      //   planet circle screen center = lpos.y + hatExtra/2
      // Label sits just below planet bottom:
      var hatExtraScaled = Math.round(lr * 0.78);
      var planetScreenCY = lpos.y + hatExtraScaled * 0.5;
      var maxDriftY = 8; // matches max ry in getDriftOffset
      var labelY = planetScreenCY + lr + maxDriftY + 6;
      var fontSize = Math.max(9, Math.min(13, lr*0.28 + 7*scale));
      ctx.save();
      ctx.font=(lu.me?'600 ':'')+fontSize+'px sans-serif';
      ctx.fillStyle=lu.me?getUserColors(lu)[0]+'cc':'rgba(255,255,255,.55)';
      ctx.textAlign='center';
      ctx.textBaseline='top';
      var meLabel=currentUser?currentUser.username+' (you)':'Username (you)';
      var labelText=lu.me||lu.userAdded?meLabel:lu.name;
      ctx.fillText(labelText, lpos.x, labelY);
      ctx.restore();
    }
  }

  var drawn={};
  if(OPT_LINES)for(var u=0;u<USERS.length;u++){var user=USERS[u];if(!user.me&&!visibleIds.has(user.id))continue;for(var c=0;c<user.connections.length;c++){var cid=user.connections[c],key=Math.min(user.id,cid)+'-'+Math.max(user.id,cid);if(drawn[key])continue;drawn[key]=true;var cu=getUserById(cid);if(!cu)continue;// Only draw if both endpoints are visible (or one is me)
if(!user.me&&!cu.me&&(!visibleIds.has(user.id)||!visibleIds.has(cu.id)))continue;if((user.me||cu.me)&&!visibleIds.has(user.me?cid:user.id))continue;var isMe=user.me||cu.me,p1=getPos(user.id),p2=getPos(cid);if(isMe){
  var segs=6,pts=[];
  for(var si=0;si<=segs;si++){var tt=si/segs,jx=si>0&&si<segs?Math.sin(si*1.9+p1.x*.008)*5*scale:0,jy=si>0&&si<segs?Math.cos(si*2.3+p1.y*.008)*5*scale:0;pts.push({x:p1.x+(p2.x-p1.x)*tt+jx,y:p1.y+(p2.y-p1.y)*tt+jy});}
  var col_me=getUserColors(USERS[0])[0];
  var col_them=getUserColors(user.me?cu:user)[0];
  // Gradient line from my color to their color
  var linGrad=ctx.createLinearGradient(pts[0].x,pts[0].y,pts[segs].x,pts[segs].y);
  linGrad.addColorStop(0,col_me+'55');
  linGrad.addColorStop(1,col_them+'55');
  ctx.save();ctx.strokeStyle=linGrad;ctx.lineWidth=1.0;ctx.setLineDash([3,6]);
  ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(var pi=1;pi<pts.length;pi++)ctx.lineTo(pts[pi].x,pts[pi].y);
  ctx.stroke();ctx.setLineDash([]);
  for(var pi=1;pi<pts.length-1;pi++){
    var dt=pi/segs;
    var dotCol=lerpColor(col_me,col_them,dt);
    ctx.beginPath();ctx.arc(pts[pi].x,pts[pi].y,1.6,0,Math.PI*2);ctx.fillStyle=dotCol+'99';ctx.fill();
  }
  // Cross spark at midpoint
  var mx=pts[3].x,my=pts[3].y;
  var midCol=lerpColor(col_me,col_them,.5);
  ctx.strokeStyle=midCol+'cc';ctx.lineWidth=.8;
  ctx.beginPath();ctx.moveTo(mx-4,my);ctx.lineTo(mx+4,my);ctx.stroke();
  ctx.beginPath();ctx.moveTo(mx,my-4);ctx.lineTo(mx,my+4);ctx.stroke();
  ctx.restore();
}else{
  // Non-me connections: subtle white gradient
  var wg=ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
  var c1w=getUserColors(user)[0],c2w=getUserColors(cu)[0];
  wg.addColorStop(0,c1w+'22');wg.addColorStop(.5,'rgba(255,255,255,.08)');wg.addColorStop(1,c2w+'22');
  ctx.save();ctx.strokeStyle=wg;ctx.lineWidth=.7;ctx.setLineDash([2,7]);
  ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();ctx.setLineDash([]);ctx.restore();
}}}
}

// Smooth animated camera pan
var panAnim=null;
function panTo(targetX, targetY, onDone){
  if(panAnim){cancelAnimationFrame(panAnim);panAnim=null;}
  var startX=offsetX, startY=offsetY;
  var dx=targetX-startX, dy=targetY-startY;
  var duration=600, start=null;
  function ease(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;} // easeInOutQuad
  var lastRender=-1;
  function step(ts){
    if(!start)start=ts;
    var t=Math.min((ts-start)/duration,1);
    var e=ease(t);
    offsetX=startX+dx*e;
    offsetY=startY+dy*e;
    // Only rebuild DOM planets every ~4 frames to keep it smooth
    if(ts-lastRender>64){renderPlanets();lastRender=ts;}
    if(t<1){panAnim=requestAnimationFrame(step);}
    else{renderPlanets();panAnim=null;if(onDone)onDone();}
  }
  requestAnimationFrame(step);
}

function updateDriftTransforms(){
  if(!OPT_ANIM)return;
  var els=planetsLayer.querySelectorAll('.pw');
  for(var i=0;i<els.length;i++){
    var uid=parseInt(els[i].dataset.uid);
    if(isNaN(uid)||uid===0)continue;
    var base=getPos(uid);
    var drifted=getDriftedPos(uid);
    var ddx=drifted.x-base.x, ddy=drifted.y-base.y;
    var svgW=els[i].querySelector('div');
    if(svgW)svgW.style.transform=ddx!==0||ddy!==0?'translate('+ddx.toFixed(1)+'px,'+ddy.toFixed(1)+'px)':'';
  }
}
function loop(){drawBg();updateDriftTransforms();requestAnimationFrame(loop);}

// ---- Settings panel init ----
function makeToggle(id,getter,setter){
  var el=document.getElementById(id);
  el.addEventListener('click',function(){
    setter(!getter());
    el.className=getter()?'toggle on':'toggle';
    renderAll();
  });
}
makeToggle('tog-stars',function(){return OPT_STARS;},function(v){OPT_STARS=v;makeStars();});
makeToggle('tog-anim',function(){return OPT_ANIM;},function(v){OPT_ANIM=v;root.classList.toggle('anim-off',!v);});
makeToggle('tog-vibes',function(){return OPT_VIBES;},function(v){OPT_VIBES=v;});
makeToggle('tog-hats',function(){return OPT_HATS;},function(v){OPT_HATS=v;});
makeToggle('tog-lines',function(){return OPT_LINES;},function(v){OPT_LINES=v;});
makeToggle('tog-shooting',function(){return OPT_SHOOTING;},function(v){OPT_SHOOTING=v;if(!v)shooters=[];});
makeToggle('tog-labels',function(){return OPT_LABELS;},function(v){OPT_LABELS=v;});

// Background sliders (presets removed, sliders kept)
function bindSlider(id,valId,unit,cb){
  var el=document.getElementById(id),val=document.getElementById(valId);
  if(!el)return;
  el.addEventListener('input',function(){val.textContent=this.value+unit;cb(parseInt(this.value));});
}

// Planet limit slider
var slider=document.getElementById('planet-limit-slider');
var sliderVal=document.getElementById('planet-limit-val');
slider.addEventListener('input',function(){
  PLANET_LIMIT=parseInt(this.value);
  sliderVal.textContent=PLANET_LIMIT>=30?'All':this.value;
  renderPlanets();
});

// Text size slider — use CSS custom property on root, then all text elements read it
var textSlider=document.getElementById('text-size-slider');
var textSizeVal=document.getElementById('text-size-val');
var BASE_FONT_SIZES=[
  // planet labels now on canvas['.sp-label',11],['.sp-sub',9],
  ['.disc-name',11],['.disc-reason',9],['.disc-genre',8],
  ['.af-text',10],['.af-time',9],['.stat-num',18],['.stat-label',8],
  ['.genre-bar-label',9],['.genre-bar-pct',9],['.st',11],['.sa',9],['.sd',9],
  ['#pname',13],['#pmeta',10],['#pgenre',9],['#connect-btn',11],['#like-btn',11],
  ['#compare-btn',11],['.compare-col-title',9],['.shared-tag',9],
  ['.snum',9],['.cchip',10],['.stag',9],
  ['#sb-title',9],['#sb-refresh-label',9],['.sp-section-title',9],
  ['#badge-name',10],['.auth-tab',10],['.auth-input',11],
  ['#auth-submit',12],['#auth-switch',10],['#auth-logo',15],
  ['#activity-title',9],['.activity-btn',10],['.onboard-text',11],
];
// Inject a <style> block for text scaling
var textStyleEl=document.createElement('style');textStyleEl.id='text-scale-style';
document.head.appendChild(textStyleEl);
function applyTextSize(pct){
  var scale=pct/100;
  var rules=BASE_FONT_SIZES.map(function(pair){
    return pair[0]+'{font-size:'+(pair[1]*scale).toFixed(1)+'px!important}';
  });
  textStyleEl.textContent=rules.join('\n');
}
textSlider.addEventListener('input',function(){
  var pct=parseInt(this.value);
  textSizeVal.textContent=pct+'%';
  applyTextSize(pct);
});

// Settings button toggle
document.getElementById('settings-btn').addEventListener('click',function(e){
  e.stopPropagation();
  settingsOpen=!settingsOpen;
  document.getElementById('settings-panel').classList.toggle('open',settingsOpen);
});
document.getElementById('sp-close').addEventListener('click',function(e){
  e.stopPropagation();
  settingsOpen=false;document.getElementById('settings-panel').classList.remove('open');
});
root.addEventListener('click',function(e){
  if(settingsOpen&&!e.target.closest('#settings-panel')&&!e.target.closest('#settings-btn')){
    settingsOpen=false;document.getElementById('settings-panel').classList.remove('open');
  }
  if(hatPickerOpen&&!e.target.closest('#hat-picker')){
    document.getElementById('hat-picker').style.display='none';hatPickerOpen=false;
  }
});
document.getElementById('settings-panel').addEventListener('click',function(e){e.stopPropagation();});

// ─────────────────────────────────────────
// AUTH SYSTEM (localStorage demo)
// ─────────────────────────────────────────
var currentUser=null; // {email, username, color, hat, color2, gradient, gradAngle, connections, likes, planets}

function dbGet(key){try{var v=localStorage.getItem('gfm_'+key);return v?JSON.parse(v):null;}catch(e){return null;}}
function dbSet(key,val){try{localStorage.setItem('gfm_'+key,JSON.stringify(val));}catch(e){}}
function dbAccounts(){return dbGet('accounts')||{};}
function dbSaveAccounts(a){dbSet('accounts',a);}

function hashPass(p){
  var h=0;for(var i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0;}
  return h.toString(36);
}

function authError(msg){var el=document.getElementById('auth-error');el.textContent=msg;el.style.display='block';}
function authClearError(){document.getElementById('auth-error').style.display='none';}

var authMode='login'; // 'login' | 'signup'

document.getElementById('tab-login').addEventListener('click',function(){
  authMode='login';
  document.getElementById('tab-login').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');
  document.getElementById('auth-username').style.display='none';
  document.getElementById('auth-submit').textContent='Sign in';
  document.getElementById('auth-switch').innerHTML='Don\'t have an account? <span id="auth-switch-link">Create one</span>';
  rebindSwitch();authClearError();
});
document.getElementById('tab-signup').addEventListener('click',function(){
  authMode='signup';
  document.getElementById('tab-signup').classList.add('active');
  document.getElementById('tab-login').classList.remove('active');
  document.getElementById('auth-username').style.display='block';
  document.getElementById('auth-submit').textContent='Create account';
  document.getElementById('auth-switch').innerHTML='Already have an account? <span id="auth-switch-link">Sign in</span>';
  rebindSwitch();authClearError();
});

function rebindSwitch(){
  var el=document.getElementById('auth-switch-link');
  if(el)el.addEventListener('click',function(){
    if(authMode==='login')document.getElementById('tab-signup').click();
    else document.getElementById('tab-login').click();
  });
}
rebindSwitch();

document.getElementById('auth-submit').addEventListener('click',function(){
  authClearError();
  var email=document.getElementById('auth-email').value.trim().toLowerCase();
  var pass=document.getElementById('auth-password').value;
  if(!email||!pass){authError('Please fill in all fields.');return;}
  if(!email.includes('@')){authError('Enter a valid email address.');return;}
  var accounts=dbAccounts();

  if(authMode==='signup'){
    var uname=document.getElementById('auth-username').value.trim().toLowerCase().replace(/[^a-z0-9._-]/g,'');
    if(!uname||uname.length<2){authError('Username must be at least 2 characters.');return;}
    if(uname.length>20){authError('Username too long (max 20 chars).');return;}
    if(accounts[email]){authError('An account with that email already exists.');return;}
    // Check username uniqueness
    for(var k in accounts){if(accounts[k].username===uname){authError('That username is taken.');return;}}
    var newAcc={email:email,username:uname,passHash:hashPass(pass),
      color:'#a78bfa',color2:'#60a5fa',gradient:false,gradAngle:135,gradStyle:'nebula',hat:'crown',
      connections:[],likes:[],addedPlanets:[]};
    accounts[email]=newAcc;
    dbSaveAccounts(accounts);
    loginAs(newAcc);
  } else {
    var acc=accounts[email];
    if(!acc){authError('No account found with that email.');return;}
    if(acc.passHash!==hashPass(pass)){authError('Incorrect password.');return;}
    loginAs(acc);
  }
});

// Enter key submits
['auth-email','auth-username','auth-password'].forEach(function(id){
  var el=document.getElementById(id);
  if(el)el.addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('auth-submit').click();});
});

function loginAs(acc){
  currentUser=acc;
  dbSet('session',acc.email);

  // Update "me" planet with account's saved customization
  var me=USERS[0];
  me.name=acc.username;
  me.initials=acc.username.slice(0,2).toUpperCase();
  // Restore saved connections and likes
  if(acc.connections&&acc.connections.length)me.connections=acc.connections.slice();
  if(acc.likes&&acc.likes.length)me.likes=acc.likes.slice();

  // Apply saved planet appearance
  myColor=acc.color||'#a78bfa';
  myColor2=acc.color2||'#60a5fa';
  myGradient=acc.gradient||false;
  myGradAngle=acc.gradAngle||135;
  myGradStyle=acc.gradStyle||'nebula';
  myHat=acc.hat||'crown';
  myRing=acc.ring||false;
  document.documentElement.style.setProperty('--me-color',myColor);

  // Restore any planets the user added
  if(acc.addedPlanets&&acc.addedPlanets.length){
    acc.addedPlanets.forEach(function(p){
      if(!USERS.find(function(u){return u.id===p.id;})){
        USERS.push(p);if(p.id>=nextId)nextId=p.id+1;
      }
    });
  }

  // Hide auth button/popup, show badge
  document.getElementById('auth-btn').style.display='none';
  document.getElementById('auth-popup').classList.remove('open');
  document.getElementById('user-badge').style.display='flex';
  showBadge(acc);
  separatePlanets();renderAll();buildHatPicker();buildColorSection();
  wheelsInited=false; // reset so wheels redraw on next panel open
}

function showBadge(acc){
  var badge=document.getElementById('user-badge');
  badge.style.display='flex';
  var av=document.getElementById('badge-avatar');
  av.textContent=acc.username.slice(0,2).toUpperCase();
  av.style.background=(acc.color||'#a78bfa')+'33';
  av.style.color=acc.color||'#a78bfa';
  document.getElementById('badge-name').textContent=acc.username;
}

function saveUserState(){
  if(!currentUser)return;
  var me=USERS[0];
  currentUser.color=myColor;currentUser.color2=myColor2;
  currentUser.gradient=myGradient;currentUser.gradAngle=myGradAngle;currentUser.gradStyle=myGradStyle;
  currentUser.hat=myHat;currentUser.ring=myRing;
  currentUser.connections=me.connections.slice();
  currentUser.likes=me.likes.slice();
  // Save added planets (non-original, non-me)
  // Save all non-me non-demo planets the user added
  currentUser.addedPlanets=USERS.filter(function(u){return u.userAdded;}).map(function(u){return{id:u.id,name:u.name,songs:u.songs,genre:u.genre,genres:u.genres||[u.genre],customTags:u.customTags||[],connections:u.connections.slice(),likes:u.likes.slice(),initials:u.initials,baseColor:u.baseColor,baseColor2:u.baseColor2||null,gradAngle:u.gradAngle||135,gradient:u.gradient||null,pos:u.pos,spotifyId:u.spotifyId||null,userAdded:true,playlist:u.playlist.slice()};});
var _unused=USERS.filter(function(u){
    return !u.me && u.id>=nextId-USERS.filter(function(x){return !x.me&&x.id<9;}).length-8;
  }).map(function(u){
    return {id:u.id,name:u.name,songs:u.songs,genre:u.genre,connections:u.connections.slice(),
      likes:u.likes.slice(),initials:u.initials,baseColor:u.baseColor,baseColor2:u.baseColor2||null,
      gradAngle:u.gradAngle||135,gradient:u.gradient||null,pos:u.pos,
      spotifyId:u.spotifyId||null,
      playlist:u.playlist.slice()};
  });
  var accounts=dbAccounts();
  accounts[currentUser.email]=currentUser;
  dbSaveAccounts(accounts);
}

// Auto-save whenever user makes changes
var _saveTimer=null;
function scheduleSave(){clearTimeout(_saveTimer);_saveTimer=setTimeout(saveUserState,800);}

// Patch key state changes to auto-save

document.getElementById('badge-logout').addEventListener('click',function(e){
  e.stopPropagation();
  saveUserState();
  currentUser=null;
  dbSet('session',null);
  // Reset me planet
  USERS[0].name='you';USERS[0].initials='ME';USERS[0].connections=[1,3,6];USERS[0].likes=[];
  myColor='#a78bfa';myColor2='#60a5fa';myGradient=false;myHat='crown';
  document.documentElement.style.setProperty('--me-color',myColor);
  document.getElementById('user-badge').style.display='none';
  document.getElementById('user-badge').style.display='none';
  document.getElementById('auth-btn').style.display='flex';
  document.getElementById('auth-email').value='';
  document.getElementById('auth-password').value='';
  authClearError();
});

// Auth corner button toggle
document.getElementById('auth-btn').addEventListener('click',function(e){
  e.stopPropagation();
  var popup=document.getElementById('auth-popup');
  popup.classList.toggle('open');
});

// Close popup when clicking outside
root.addEventListener('click',function(e){
  var popup=document.getElementById('auth-popup');
  if(popup.classList.contains('open')&&!e.target.closest('#auth-popup')&&!e.target.closest('#auth-btn')){
    popup.classList.remove('open');
  }
});
document.getElementById('auth-popup').addEventListener('click',function(e){e.stopPropagation();});

// Auto-login from saved session
(function(){
  var savedEmail=dbGet('session');
  if(savedEmail){var accounts=dbAccounts();var acc=accounts[savedEmail];if(acc){loginAs(acc);return;}}
})();

// ─────────────────────────────────────────
// ACTIVITY FEED
// ─────────────────────────────────────────
var PAGE_LOAD_TIME=Date.now();
function relTime(secsAgo){
  var t=Math.floor((Date.now()-PAGE_LOAD_TIME)/1000)+secsAgo;
  if(t<60)return t+'s ago';
  if(t<3600)return Math.floor(t/60)+'m ago';
  return Math.floor(t/3600)+'h ago';
}
var ACTIVITY_OFFSETS=[120,300,720,1080,1860,2640,3660,3900,7200,10800,14400,18000];
var ACTIVITY_EVENTS=[
  {text:["<span>deepspace77</span>","liked your planet"],color:"#60a5fa",off:0},
  {text:["<span>velvetfrq</span>","connected with <span>cottonpink</span>"],color:"#f472b6",off:1},
  {text:["<span>solarflare</span>","added a new playlist"],color:"#fbbf24",off:2},
  {text:["<span>nova.wav</span>","connected with <span>you</span>"],color:"#6366f1",off:3},
  {text:["<span>bassweight</span>","liked <span>solarflare</span>'s planet"],color:"#f97316",off:4},
  {text:["<span>lunarsync</span>","joined the galaxy"],color:"#94a3b8",off:5},
  {text:["<span>magnetar</span>","connected with <span>violetdepth</span>"],color:"#fcd34d",off:6},
  {text:["<span>driftcloud9</span>","liked your planet"],color:"#2dd4bf",off:7},
  {text:["<span>pulsewave</span>","added a Spotify playlist"],color:"#22d3ee",off:8},
  {text:["<span>ghostfreq</span>","connected with <span>vantacore</span>"],color:"#1e293b",off:9},
  {text:["<span>blushwave</span>","joined the galaxy"],color:"#fda4af",off:10},
  {text:["<span>ferrowave</span>","liked <span>cottonpink</span>'s planet"],color:"#f9a8d4",off:11},
];

function buildActivityFeed(){
  var list=document.getElementById('activity-list');if(!list)return;
  list.innerHTML='';
  ACTIVITY_EVENTS.forEach(function(ev){
    var item=document.createElement('div');item.className='af-item';
    item.innerHTML='<div class="af-dot" style="background:'+ev.color+'"></div>'
      +'<div class="af-text">'+ev.text.join(' ')+'</div>'
      +'<div class="af-time">'+relTime(ACTIVITY_OFFSETS[ev.off||0])+'</div>';
    list.appendChild(item);
  });
}

var activityOpen=false;
document.getElementById('activity-btn').addEventListener('click',function(e){
  e.stopPropagation();
  activityOpen=!activityOpen;
  document.getElementById('activity-panel').classList.toggle('open',activityOpen);
  if(activityOpen){buildActivityFeed();document.getElementById('activity-dot').classList.remove('pulse');}
});
document.getElementById('activity-panel').addEventListener('click',function(e){e.stopPropagation();});
// Show pulse dot after 3s to hint there's activity
setTimeout(function(){document.getElementById('activity-dot').classList.add('pulse');},3000);

// ─────────────────────────────────────────
// LISTENING STATS (shown on own planet panel)
// ─────────────────────────────────────────
function buildStats(){
  var sec=document.getElementById('stats-section');if(!sec)return;
  sec.innerHTML='';
  var me=USERS[0];
  // Compute stats from connections, likes, songs
  var connCount=me.connections.length;
  var likeCount=me.likes.length;
  var totalSongs=me.songs||41;
  // Mock genre breakdown based on connected planets
  var genreCounts={};
  me.connections.forEach(function(cid){var cu=getUserById(cid);if(cu)genreCounts[cu.genre]=(genreCounts[cu.genre]||0)+1;});
  genreCounts['Indie']=(genreCounts['Indie']||0)+2; // include own
  var totalG=Object.values(genreCounts).reduce(function(a,b){return a+b;},0)||1;
  var genres=Object.keys(genreCounts).sort(function(a,b){return genreCounts[b]-genreCounts[a];}).slice(0,4);

  // Stat cards
  var row1=document.createElement('div');row1.className='stats-row';
  [[totalSongs,'songs'],[connCount,'connections'],[likeCount,'likes'],['12d','streak']].forEach(function(d){
    var card=document.createElement('div');card.className='stat-card';
    card.innerHTML='<div class="stat-num">'+d[0]+'</div><div class="stat-label">'+d[1]+'</div>';
    row1.appendChild(card);
  });
  sec.appendChild(row1);

  // Genre bars
  var barsDiv=document.createElement('div');barsDiv.style.cssText='margin-top:4px';
  genres.forEach(function(g){
    var pct=Math.round((genreCounts[g]/totalG)*100);
    var col=GENRE_COLORS[g]||'#a78bfa';
    var row=document.createElement('div');row.className='genre-bar-row';
    row.innerHTML='<div class="genre-bar-label">'+GENRE_VIBES[g]+'</div>'
      +'<div class="genre-bar-track"><div class="genre-bar-fill" style="width:'+pct+'%;background:'+col+'"></div></div>'
      +'<div class="genre-bar-pct">'+pct+'%</div>';
    barsDiv.appendChild(row);
  });
  sec.appendChild(barsDiv);

  // Streak row
  var streakDiv=document.createElement('div');streakDiv.id='streak-row';
  streakDiv.innerHTML='<div id="streak-icon">🔥</div><div id="streak-text"><span>12 day</span> listening streak · top genre: <span>'+(GENRE_VIBES[genres[0]]||'softcore')+'</span></div>';
  sec.appendChild(streakDiv);
}

// ─────────────────────────────────────────
// PLAYLIST COMPARISON
// ─────────────────────────────────────────
function openCompare(userA, userB){
  var modal=document.getElementById('compare-modal');
  modal.classList.add('open');
  document.getElementById('compare-col-a').textContent=userA.name+' (you)';
  document.getElementById('compare-col-b').textContent=userB.name;

  // Build song lists
  function buildList(el, playlist){
    el.innerHTML='';
    playlist.forEach(function(s,i){
      var row=document.createElement('div');row.className='srow';row.style.marginBottom='4px';
      row.innerHTML='<span class="snum">'+(i+1)+'</span><div class="si"><div class="st">'+s.t+'</div><div class="sa">'+s.a+'</div></div>';
      el.appendChild(row);
    });
  }
  buildList(document.getElementById('compare-list-a'), userA.playlist);
  buildList(document.getElementById('compare-list-b'), userB.playlist);

  // Find shared artists
  var artistsA=userA.playlist.map(function(s){return s.a.toLowerCase();});
  var artistsB=userB.playlist.map(function(s){return s.a.toLowerCase();});
  var sharedArtists=artistsA.filter(function(a){return artistsB.indexOf(a)>=0;});

  // Genre match
  var sameGenre=userA.genre===userB.genre;
  var genreScore=sameGenre?40:20;
  var artistScore=Math.min(sharedArtists.length*15,40);
  var connScore=userA.connections.indexOf(userB.id)>=0?20:0;
  var matchPct=Math.min(genreScore+artistScore+connScore,99);

  document.getElementById('compare-pct').textContent=matchPct+'%';

  // Shared tags
  var tags=document.getElementById('compare-shared-tags');tags.innerHTML='';
  var sharedItems=[].concat(
    sharedArtists.slice(0,3),
    sameGenre?[GENRE_VIBES[userA.genre]||userA.genre]:[],
    matchPct>60?['similar energy']:[]
  );
  if(!sharedItems.length)sharedItems=['no direct overlaps — but opposites attract'];
  sharedItems.forEach(function(tag){
    var t=document.createElement('span');t.className='shared-tag';t.textContent=tag;tags.appendChild(t);
  });
}

document.getElementById('compare-close').addEventListener('click',function(){
  document.getElementById('compare-modal').classList.remove('open');
});
document.getElementById('compare-modal').addEventListener('click',function(e){
  if(e.target===this)this.classList.remove('open');
});
document.getElementById('compare-btn').addEventListener('click',function(){
  if(openedUserId>=0&&openedUserId!==0){
    openCompare(USERS[0],getUserById(openedUserId));
  }
});

// ─────────────────────────────────────────
// ONBOARDING
// ─────────────────────────────────────────
var OB_STEPS=[
  {text:"Welcome to <strong>Orbis</strong> — your music universe. Each planet is a user with their own playlist and vibe.",target:null,pos:'center'},
  {text:"This is <strong>your planet</strong>. Click it to customize your color, hat, and see your listening stats.",target:'#root',pos:'center-planet'},
  {text:"The <strong>Discover</strong> panel suggests planets to explore. Drag it anywhere on screen to reposition it.",target:'#sidebar',pos:'right'},
  {text:"<strong>Search</strong> by name, genre, or mood keywords like 'chill' or 'hype' to filter the galaxy.",target:'#topbar',pos:'below'},
  {text:"Paste a <strong>Spotify playlist link</strong> to spawn a real planet. You can drag your own planets to reposition them.",target:'#add-panel',pos:'above'},
];
var obStep=0;

function showOnboardStep(i){
  if(i>=OB_STEPS.length){closeOnboard();return;}
  obStep=i;
  var step=OB_STEPS[i];
  var overlay=document.getElementById('onboard-overlay');
  overlay.classList.add('active');
  document.getElementById('onboard-step').textContent='Step '+(i+1)+' of '+OB_STEPS.length;
  document.getElementById('onboard-text').innerHTML=step.text;
  document.getElementById('onboard-next').textContent=i===OB_STEPS.length-1?'Done ✓':'Next →';

  // Dots
  var dots=document.getElementById('onboard-dots');dots.innerHTML='';
  OB_STEPS.forEach(function(_,di){var d=document.createElement('div');d.className='ob-dot'+(di===i?' active':'');dots.appendChild(d);});

  // Spotlight + card position
  var spotlight=document.getElementById('onboard-spotlight');
  var card=document.getElementById('onboard-card');
  if(step.pos==='center'||!step.target){
    spotlight.style.cssText='width:0;height:0;top:50%;left:50%;border-radius:0;box-shadow:0 0 0 9999px rgba(0,0,0,.72)';
    card.style.cssText='top:50%;left:50%;transform:translate(-50%,-40%)';
  } else {
    var el=document.querySelector(step.target);
    if(el){
      var r=el.getBoundingClientRect();
      var pad=10;
      spotlight.style.cssText='left:'+(r.left-pad)+'px;top:'+(r.top-pad)+'px;width:'+(r.width+pad*2)+'px;height:'+(r.height+pad*2)+'px;border-radius:14px;box-shadow:0 0 0 9999px rgba(0,0,0,.72)';
      // Position card below or to the right
      if(step.pos==='below'){card.style.cssText='top:'+(r.bottom+16)+'px;left:'+Math.max(10,r.left)+'px;transform:none';}
      else if(step.pos==='above'){card.style.cssText='bottom:'+(window.innerHeight-r.top+16)+'px;left:50%;transform:translateX(-50%)';}
      else if(step.pos==='right'){card.style.cssText='top:'+(r.top)+'px;left:'+(r.right+14)+'px;transform:none';}
      else{card.style.cssText='top:50%;left:50%;transform:translate(-50%,-40%)';}
    }
  }
}

function closeOnboard(){
  document.getElementById('onboard-overlay').classList.remove('active');
  localStorage.setItem('orbis_onboarded','1');
}

document.getElementById('onboard-next').addEventListener('click',function(){showOnboardStep(obStep+1);});
document.getElementById('onboard-skip').addEventListener('click',closeOnboard);
document.getElementById('help-btn').addEventListener('click',function(e){e.stopPropagation();showOnboardStep(0);});

// Auto-show onboarding once
if(!localStorage.getItem('orbis_onboarded')){
  setTimeout(function(){showOnboardStep(0);},1200);
}

// ─────────────────────────────────────────
// Hook stats + compare into openPanel
// ─────────────────────────────────────────

// Close activity on outside click
root.addEventListener('click',function(e){
  if(activityOpen&&!e.target.closest('#activity-panel')&&!e.target.closest('#activity-btn')){
    activityOpen=false;document.getElementById('activity-panel').classList.remove('open');
  }
});

// ─────────────────────────────────────────
// GENRE & TAG PICKER
// ─────────────────────────────────────────
var USER_CUSTOM_KEYWORDS={}; // {keyword: [genres]}

var genreSuggestionsOpen=false;

function buildGenrePicker(u, editOpen){
  var uGenres=u.genres||(u.genres=[u.genre]);
  var isOwn=u.me||u.userAdded;
  var display=document.getElementById('genre-tags-display');
  if(!display)return;
  display.innerHTML='';

  // Render all genre + custom chips together
  function makeChip(label, col, clickSearch, removeFn){
    var chip=document.createElement('span');
    chip.style.cssText='display:inline-flex;align-items:center;gap:4px;font-size:9px;padding:3px 9px;border-radius:20px;background:'+col+'15;color:'+col+';border:0.5px solid '+col+'35;cursor:pointer;transition:all .15s;user-select:none;white-space:nowrap;flex-shrink:0';
    function updateChipActive(){
      var isActive=(searchQ&&(searchQ===label.toLowerCase()||searchQ===label));
      chip.style.background=isActive?col+'35':col+'15';
      chip.style.borderColor=isActive?col+'70':col+'35';
      chip.style.fontWeight=isActive?'600':'400';
    }
    updateChipActive();
    chip.addEventListener('mouseenter',function(){if(!(searchQ&&(searchQ===label.toLowerCase()||searchQ===label)))this.style.background=col+'28';});
    chip.addEventListener('mouseleave',function(){updateChipActive();});
    if(removeFn&&isOwn){
      // show × on hover when in edit mode
      var lbl=document.createElement('span');lbl.textContent=label;chip.appendChild(lbl);
      var x=document.createElement('span');x.textContent='×';x.style.cssText='font-size:10px;opacity:0;transition:opacity .15s;color:'+col;chip.appendChild(x);
      chip.addEventListener('mouseenter',function(){x.style.opacity='0.7';});
      chip.addEventListener('mouseleave',function(){x.style.opacity='0';});
      x.addEventListener('click',function(e){e.stopPropagation();removeFn();});
      chip.addEventListener('click',function(){clickSearch();});
    } else {
      chip.textContent=label;
      chip.addEventListener('click',function(){clickSearch();});
    }
    return chip;
  }

  uGenres.forEach(function(g){
    var col=GENRE_COLORS[g]||'#a78bfa';
    display.appendChild(makeChip(
      GENRE_VIBES[g]||g, col,
      function(){
        var si=document.getElementById('search-input');
        if(searchQ===g.toLowerCase()){
          // toggle off
          searchQ='';if(si)si.value='';activeKeyword=null;
        } else {
          searchQ=g.toLowerCase();if(si)si.value=g;activeKeyword=null;
        }
        computeVisible();renderPlanets();
        buildGenrePicker(getUserById(openedUserId),false);
      },
      null
    ));
  });

  (u.customTags||[]).forEach(function(t){
    display.appendChild(makeChip(
      t,'#a78bfa',
      function(){
        var si=document.getElementById('search-input');
        if(searchQ===t){
          searchQ='';if(si)si.value='';activeKeyword=null;
        } else {
          searchQ=t;if(si)si.value=t;activeKeyword=null;
        }
        computeVisible();renderPlanets();
        buildGenrePicker(getUserById(openedUserId),false);
      },
      isOwn?function(){var i=(u.customTags||[]).indexOf(t);if(i>=0)u.customTags.splice(i,1);buildGenrePicker(u,true);scheduleSave&&scheduleSave();}:null
    ));
  });

  // + circle button (yours only)
  if(isOwn){
    var addBtn=document.createElement('span');
    addBtn.id='genre-add-circle';
    addBtn.style.cssText='display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;border:0.5px dashed rgba(167,139,250,.4);color:rgba(167,139,250,.6);font-size:14px;cursor:pointer;transition:all .15s;flex-shrink:0;line-height:1';
    addBtn.textContent='+';
    addBtn.title='Add genre or tag';
    addBtn.addEventListener('mouseenter',function(){this.style.background='rgba(167,139,250,.1)';this.style.color='#a78bfa';});
    addBtn.addEventListener('mouseleave',function(){this.style.background='';this.style.color='rgba(167,139,250,.6)';});
    addBtn.addEventListener('click',function(e){
      e.stopPropagation();
      genreSuggestionsOpen=!genreSuggestionsOpen;
      var sug=document.getElementById('genre-suggestions');
      if(sug)sug.style.display=genreSuggestionsOpen?'flex':'none';
      addBtn.textContent=genreSuggestionsOpen?'×':'+';
      if(genreSuggestionsOpen)buildSuggestions(u);
    });
    display.appendChild(addBtn);
  }

  // Genre suggestions panel
  var sug=document.getElementById('genre-suggestions');
  if(sug)sug.style.display=(isOwn&&editOpen)?'flex':'none';
  if(isOwn&&editOpen)buildSuggestions(u);
}

function buildSuggestions(u){
  var uGenres=u.genres||[u.genre];
  var container=document.getElementById('genre-picker-all');
  if(!container)return;
  container.innerHTML='';
  GENRE_LIST.forEach(function(g){
    var col=GENRE_COLORS[g]||'#a78bfa';
    var btn=document.createElement('div');
    btn.className='gpick'+(uGenres.indexOf(g)>=0?' selected':'');
    if(uGenres.indexOf(g)>=0){btn.style.cssText='border-color:'+col+'50;color:'+col+';background:'+col+'15';}
    btn.textContent=GENRE_VIBES[g]||g;
    btn.addEventListener('click',function(){
      u.genres=[g];u.genre=g;
      buildGenrePicker(u,true);renderPlanets();scheduleSave&&scheduleSave();
    });
    container.appendChild(btn);
  });
  // custom tags remove list
  var clist=document.getElementById('custom-tags-list');
  if(clist){clist.innerHTML='';(u.customTags||[]).forEach(function(t){
    var chip=document.createElement('div');chip.className='ctag';
    chip.innerHTML=t+' <span style="font-size:11px">×</span>';
    chip.addEventListener('click',function(){var i=(u.customTags||[]).indexOf(t);if(i>=0)u.customTags.splice(i,1);buildGenrePicker(u,true);scheduleSave&&scheduleSave();});
    clist.appendChild(chip);
  });}
}

// Custom tag add button
document.getElementById('custom-keyword-add').addEventListener('click',function(){
  var input=document.getElementById('custom-keyword-input');
  var val=input.value.trim().toLowerCase().slice(0,20);
  if(!val)return;
  var u=getUserById(openedUserId);if(!u)return;
  u.customTags=u.customTags||[];
  if(u.customTags.indexOf(val)<0)u.customTags.push(val);
  input.value='';
  buildGenrePicker(u,false);openPanel(u);scheduleSave&&scheduleSave();
});
document.getElementById('custom-keyword-input').addEventListener('keydown',function(e){
  if(e.key==='Enter')document.getElementById('custom-keyword-add').click();
});

// Recenter button
document.getElementById('recenter-btn').addEventListener('click',function(e){
  e.stopPropagation();
  var wp=getWorldPos(0);
  panTo(W/2-wp.x, H/2-wp.y, null);
});

resize();window.addEventListener('resize',resize);loop();updateZoomUI();
