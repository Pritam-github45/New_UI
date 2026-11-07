import {useState,useEffect,useMemo,useRef} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import confetti from 'canvas-confetti';
import {startMusic,toggleMute} from './music.js';

const NAME='Shilu';
const LETTER=`Hi Shilu,never lose that little spark, your innocent heart and the smile that makes you special. Keep laughing at silly things and finding happiness in little moments.

Never forget how precious you are. Keep shining and keep being you. Happy Birthday! 🌷💗`;
const CARDS=[1,2,3,4,5,6].map(i=>`/images/cards/card${i}.jpg`);
const ST=i=>`/images/stickers/s${i}.webp`;
const PHOTO=[0,1,3,4,5,6,7,8,9],DECO=[2,10,11,12,13,14];
const pop=(n=120,o={})=>confetti({particleCount:n,spread:80,origin:{y:.6},colors:['#f48fb1','#ffd3de','#fff','#ffc83d','#e0405f'],...o});
const fireworks=()=>{let c=0;const t=setInterval(()=>{pop(60,{spread:360,startVelocity:28,origin:{x:Math.random(),y:Math.random()*.5},ticks:90});if(++c>9)clearInterval(t)},450)};

function Floaters(){const items=useMemo(()=>Array.from({length:16},(_,i)=>({e:['💗','🌸','✨','🌷','🎀'][i%5],x:Math.random()*100,d:7+Math.random()*7,s:16+Math.random()*20,w:Math.random()*8})),[]);
 return <div className="floaters">{items.map((o,i)=><span key={i} style={{left:o.x+'%',fontSize:o.s,animationDuration:o.d+'s',animationDelay:o.w+'s'}}>{o.e}</span>)}</div>}

function Title({text,className=''}){return <h2 className={className} aria-label={text}>{[...text].map((c,i)=>
 <motion.span key={i} style={{display:'inline-block',whiteSpace:'pre'}} initial={{y:40,opacity:0,rotate:-12}} animate={{y:0,opacity:1,rotate:0}} transition={{delay:.3+i*.045,type:'spring',stiffness:300,damping:12}}>{c}</motion.span>)}</h2>}

const Btn=({children,...p})=><motion.button className="btn" initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} whileHover={{scale:1.06}} whileTap={{scale:.92}} transition={{type:'spring',stiffness:350,damping:14}} {...p}>{children}</motion.button>;

function Start({next}){return <div className="center">
 <motion.div animate={{rotate:[-6,6,-6],scale:[1,1.12,1]}} transition={{repeat:Infinity,duration:2.4}} style={{fontSize:90}}>🎂</motion.div>
 <Title text={`For ${NAME} 💗`} className="big"/><Btn onClick={next}>Tap to start</Btn></div>}

function Candle({next}){const [out,setOut]=useState(false);
 const blow=()=>{if(out)return;setOut(true);setTimeout(next,2800)};
 return <motion.div className="center candlebg" animate={{backgroundColor:out?'#fde3ea':'#2a1020'}} transition={{duration:1.6}}>
  <motion.p className="hint" style={{color:out?'#7a2646':'#ffe3ec'}} animate={{opacity:[1,.5,1]}} transition={{repeat:Infinity,duration:2}}>{out?'Your wish is on its way ✨':'Make a wish… then tap the candle 🕯️'}</motion.p>
  <motion.div className="candle" onClick={blow} whileTap={{scale:.96}} initial={{y:80,opacity:0}} animate={{y:0,opacity:1}}>
   {!out&&<motion.div className="flame" animate={{scaleY:[1,1.15,.9,1.1,1],scaleX:[1,.9,1.05,.95,1],rotate:[-3,3,-2,2,-3]}} transition={{repeat:Infinity,duration:.6}}/>}
   {!out&&<div className="halo"/>}
   {out&&[0,1,2].map(i=><motion.div key={i} className="smoke" initial={{opacity:.8,y:0,scale:.5}} animate={{opacity:0,y:-150,x:(i-1)*30,scale:3}} transition={{duration:2.2,delay:i*.25}}/>)}
  </motion.div><div className="plate"/>
  {!out&&<motion.div animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:1.2}} style={{fontSize:34,marginTop:20}}>👆</motion.div>}
 </motion.div>}

function Cake({lit}){return <div className="cake">
 <motion.div className="c1" initial={{y:-500,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',bounce:.5,delay:.1}}/>
 <motion.div className="c2" initial={{y:-500,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',bounce:.5,delay:.3}}/>
 <motion.div className="berries" initial={{scale:0}} animate={{scale:1}} transition={{delay:.8,type:'spring'}}>🍓 🍓 🍓</motion.div>
 {[30,50,70].map((l,i)=><motion.div key={i} className="cc" style={{left:l+'%'}} initial={{y:-300,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.7+i*.15,type:'spring'}}>
  {lit&&<motion.i animate={{scaleY:[1,1.2,.9,1],rotate:[-4,4,-4]}} transition={{repeat:Infinity,duration:.5}}/>}</motion.div>)}
</div>}

function CakeStage({next}){const [cut,setCut]=useState(false);
 const doCut=()=>{if(cut)return;setCut(true);setTimeout(()=>pop(160),1100)};
 return <div className="center">
  <Title text={`Happy Birthday, ${NAME}! 🎉`} className="mid"/>
  <div className="cakewrap" onClick={doCut}>
   <div style={{clipPath:'polygon(0 0,74% 0,74% 100%,0 100%)'}}><Cake lit={false}/></div>
   <motion.div style={{position:'absolute',inset:0,clipPath:'polygon(74% 0,100% 0,100% 100%,74% 100%)'}} animate={cut?{x:46,y:10,rotate:8}:{}} transition={{delay:.9,type:'spring',stiffness:80}}><Cake lit={false}/></motion.div>
   <motion.div className="knife" initial={{opacity:0}} animate={cut?{opacity:[0,1,1,0],y:[-90,-20,150,150],rotate:[-25,0,0,0]}:{opacity:0}} transition={{duration:1.1,times:[0,.15,.75,1]}}>🔪</motion.div>
  </div><div className="plate" style={{width:300}}/>
  <p className="hint">{cut?'Yummy! 🍰':'Tap the cake to cut it 🍰'}</p>
  {cut&&<Btn onClick={next}>Next →</Btn>}
 </div>}

function OnlyForYou({next}){const [k,setK]=useState(1);
 const rots=useMemo(()=>CARDS.map(()=>(Math.random()-.5)*8),[]);
 const nx=()=>{if(k<6){setK(k+1);pop(50,{origin:{y:.4}})}else next()};
 return <div className="center">
  <Title text="Only for you 💗" className="mid"/>
  <div className="stack">{CARDS.slice(0,k).map((s,i)=>
   <motion.img key={i} src={s} alt="" initial={{y:-900,rotate:-35,opacity:0}} animate={{y:0,rotate:rots[i],opacity:1,scale:i===k-1?1:.97}} transition={{type:'spring',stiffness:110,damping:13}}/>)}</div>
  <div className="dots">{CARDS.map((_,i)=><motion.i key={i} animate={{scale:i<k?1.3:1,background:i<k?'#7a2646':'#f0b6c8'}}/>)}</div>
  <Btn onClick={nx}>{k<6?'Next →':'Our memories →'}</Btn></div>}

function Gallery({next}){const order=useMemo(()=>{const o=[];PHOTO.forEach((p,i)=>{o.push(p);if(DECO[i]!==undefined)o.push(DECO[i])});return o},[]);
 return <div className="center scroll">
  <Title text="A Gallery of Memories 🌸" className="mid"/>
  <div className="gal">{order.map((id,j)=>{const r=(j%2?1:-1)*(2+(j*7%5));
   return <motion.img key={id} src={ST(id)} alt="" className={DECO.includes(id)?'d':''} initial={{scale:0,rotate:r*6,opacity:0}} animate={{scale:1,rotate:r,opacity:1}} transition={{delay:.5+j*.2,type:'spring',stiffness:200,damping:11}}
    whileHover={{scale:1.1,rotate:0}} whileTap={{scale:1.15,rotate:[r,-8,8,0]}}/>})}</div>
  <Btn onClick={next}>One last thing 🌷</Btn></div>}

function Typewriter({text,go}){const [n,setN]=useState(0);useEffect(()=>{if(!go)return;const t=setInterval(()=>setN(v=>v<text.length?v+1:v),45);return()=>clearInterval(t)},[go]);return <span>{[...text].slice(0,n).join('')}</span>}

function Tulips({next}){const [open,setOpen]=useState(false);
 const doOpen=()=>{setOpen(true);pop(100,{origin:{y:.4}})};
 return <div className="center tulipbg">
  <Title text="The Last Surprise 🌷" className="mid"/>
  <motion.div className="env" animate={{y:open?40:0}} transition={{duration:1,delay:.4}}>
   <div className="eb"/>
   <motion.div className="el" initial={false} animate={{y:open?-130:0,height:open?270:170,zIndex:open?6:2}} transition={{delay:.9,duration:1.1,type:'spring',stiffness:60,damping:14}}><p><Typewriter text={LETTER} go={open}/></p></motion.div>
   <div className="ep"/>
   <motion.div className="ef" initial={false} animate={{rotateX:open?180:0,zIndex:open?1:4}} transition={{duration:.8}}/>
   <motion.div className="seal" animate={open?{scale:0,opacity:0}:{scale:[1,1.15,1]}} transition={open?{duration:.3}:{repeat:Infinity,duration:1.2}}>♥</motion.div>
  </motion.div>
  {!open&&<div className="bottombtn"><Btn onClick={doOpen}>Open your final surprise 💌</Btn></div>}
  {open&&<motion.div className="bottombtn" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:6}}><Btn onClick={next}>Party where…? 🎉</Btn></motion.div>}
  <div className="tuls">{[0,1,2,3,4,5,6].map(i=><motion.span key={i} style={{left:i*15+'%'}} initial={{y:100,opacity:0}} animate={{y:0,opacity:1,rotate:[-6,6,-6]}} transition={{y:{delay:i*.2,type:'spring'},rotate:{repeat:Infinity,duration:3+i*.3}}}>🌷</motion.span>)}</div>
 </div>}

function Party({replay}){useEffect(()=>{const t=setTimeout(fireworks,1200);return()=>clearTimeout(t)},[]);
 return <div className="center partybg">
  <motion.img src="/images/party.png" alt="Party where?!" className="party" initial={{scale:.5,opacity:0,filter:'blur(20px)'}} animate={{scale:1,opacity:1,filter:'blur(0px)'}} transition={{duration:1.8,ease:'easeOut'}}/>
  <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3}}><Btn onClick={replay}>Replay 🔁</Btn></motion.div></div>}

export default function App(){const [s,setS]=useState(0);const [m,setM]=useState(false);const started=useRef(false);
 const next=()=>setS(v=>v+1);
 const begin=()=>{if(!started.current){started.current=true;startMusic()}next()};
 const v=[<Start next={begin}/>,<Candle next={next}/>,<CakeStage next={next}/>,<OnlyForYou next={next}/>,<Gallery next={next}/>,<Tulips next={next}/>,<Party replay={()=>setS(1)}/>];
 return <div className="app"><Floaters/>
  {s>0&&<button className="mute" onClick={()=>setM(toggleMute())}>{m?'🔇':'🔊'}</button>}
  <AnimatePresence mode="wait"><motion.section key={s} className="stage" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.06,filter:'blur(8px)'}} transition={{duration:.6}}>{v[s]}</motion.section></AnimatePresence></div>}
