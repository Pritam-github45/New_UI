// Plays /audio/birthday.mp3 if you add one; otherwise a built-in music-box "Happy Birthday" melody.
let ac,gain,audio,timer,muted=false;
const F={C:523.25,D:587.33,E:659.25,F:698.46,G:783.99,A:880,B:987.77,c:1046.5,d:1174.66,e:1318.5,f:1396.9,g:1568};
const M='G.5 G.5 A1 G1 c1 B2 G.5 G.5 A1 G1 d1 c2 G.5 G.5 g1 e1 c1 B1 A2 f.5 f.5 e1 c1 d1 c2'.split(' ');
function note(f,t,d){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;o.connect(g);g.connect(gain);
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d*1.6);o.start(t);o.stop(t+d*1.7)}
function loop(){let t=ac.currentTime+.1;for(const x of M){const d=parseFloat(x.slice(1))*.5;note(F[x[0]],t,d);t+=d}t+=.8;timer=setTimeout(loop,(t-ac.currentTime)*1000)}
export async function startMusic(){
 try{const r=await fetch('/audio/birthday.mp3',{method:'HEAD'});
  if(r.ok&&(r.headers.get('content-type')||'').startsWith('audio')){audio=new Audio('/audio/birthday.mp3');audio.loop=true;audio.volume=.7;await audio.play();return}}catch(e){}
 ac=new (window.AudioContext||window.webkitAudioContext)();gain=ac.createGain();gain.gain.value=.25;gain.connect(ac.destination);loop()}
export function toggleMute(){muted=!muted;if(audio)audio.muted=muted;if(gain)gain.gain.value=muted?0:.25;return muted}
