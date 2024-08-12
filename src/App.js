import React, { useState, useEffect, useCallback, useMemo } from 'react';
import cn from 'classnames';

import windWalk from './wind-walk-right.gif'
import windFly from './wind-fly-right.gif'
import windSleep from './wind-sleep.png'
import windLove from './wind-love-right.png'
import windPui from './wind-pui-right.png'
import windSad from './wind-sad-right.png'
import windSweat from './wind-sweat.png'
import horseWalk from './horse-walk-right.gif'
import horseStill from './horse-still-right.png'
import horseLove from './horse-love-right.png'
import horsemomWalk from './horsemom-walk-right.gif'
import horsemomStill from './horsemom-still-right.png'
import windmomWalk from './windmom-walk-right.gif'
import windmomStill from './windmom-still-right.png'
import homeEmpty from './home-empty.png'
import homeOccupied from './home.png'

import useStorage from './useStorage';
import useBackdropStyle from './useBackdropStyle'
import usePressToJump from './usePressToJump';
import './App.css';
import Finish from './Finish';
import Choices from './Choices';
import { FRAME_DURATION, PUI, ANSWERS, MILESTONES, COLORS, IMAGES, HORSE_LOVE, MOM_HELP_DATE_DIFF_MAX } from './constants';

const clamp = (min, max) => (v) => Math.min(max, Math.max(min, v));

const useWind = ({ jumpable, onJump, hasHorseArrived, homeArrived, velocityDiff, gravity }) => {
  const [top, setTop] = useState(100);
  const [velocity, setVelocity] = useState(0);

  const jump = useCallback(() => {
    if(!jumpable) return;

    setVelocity(v => v - velocityDiff);
    onJump();
  }, [jumpable, onJump, velocityDiff]);

  useEffect(() => {
    if (top >= 100 && velocity === 0) return;

    const timer = setInterval(() => {
      if (top + velocity <= 100) {
        setTop(top + velocity);
        setVelocity(v => v + gravity);
      } else {
        setTop(100);
        setVelocity(0);
      }
    }, FRAME_DURATION);
    return () => clearInterval(timer);
  }, [top, velocity, gravity]);

  return { top, left: homeArrived ? 65 : 0, jump };
}

const useFO = ({ speed, score: current, ackedGoodFo, ackGoodFo, setQueue, headingHome, onReset }) => {
  const getRandomTop = () => Math.random() * 70 + 10;
  const [top, setTop] = useState(getRandomTop());
  const [left, setLeft] = useState(100);
  const [visible, setVisible] = useState(true);
  const [scoreKey, setScoreKey] = useState('FO_SPAGHETTI');

  const foSpeed = 0.3

  useEffect(() => {
    const timer = setInterval(() => {
      if(left === 100) {
        setVisible(true);
      }

      if (left >= -50) {
        // moving to the left
        setLeft(left - speed - foSpeed);
      } else {
        // moved to the end and needs to reset
        setLeft(100);
        setTop(getRandomTop());
        setVisible(false);

        let keys = Object.keys(MILESTONES).filter(k => !!ANSWERS[k]).filter(k => current >= MILESTONES[k])
        if (headingHome) {
          const unacked = keys.filter(k => !ackedGoodFo(k))
          if (unacked.length > 0) {
            keys = unacked
          }
        }
        const key = keys[parseInt(Math.random() * keys.length)]
        setScoreKey(key);
        onReset();
      }
    }, FRAME_DURATION);
    return () => clearInterval(timer);
  }, [left, speed, ackedGoodFo, current, headingHome, onReset]);

  const hit = useCallback(() => {
    setVisible(false);
  }, []);

  const img = IMAGES[scoreKey]
  const acked = useMemo(() => ackedGoodFo(scoreKey), [ackedGoodFo, scoreKey])
  const ans = ANSWERS[scoreKey]
  const ack = useCallback(() => ackGoodFo(scoreKey), [ackGoodFo, scoreKey])
  const enqueue = useCallback(() => setQueue(q => [scoreKey, ...q].slice(0, 10)), [setQueue, scoreKey])
  const pui = PUI[scoreKey]
  const horseLove = HORSE_LOVE[scoreKey]

  return {top, left, img, visible, acked, ans, ack, enqueue, pui, horseLove, hit}
}

const isHit = (wind, fo, hasHorse) => {
  const tolerance = 10;
  return fo.top > wind.top - tolerance &&
    fo.top < wind.top + tolerance + (hasHorse ? 10 : 0) &&
    fo.left > wind.left - tolerance &&
    fo.left < wind.left + tolerance;
}

const useCooldown = ({fpCooldownDate, setFpCooldownDate, fp, fpmax, setFp}) => {
  const cooldownSeconds = 3

  useEffect(() => {
    if (fp > 0) {
      if (fpCooldownDate) return;

      const date = new Date();
      date.setSeconds(date.getSeconds() + cooldownSeconds);
      setFpCooldownDate(date);
    } else {
      setFpCooldownDate(null);
    }
  }, [fp, fpCooldownDate, setFpCooldownDate]);

  const deductFpIfNeeded = useCallback(() => {
    if (!fpCooldownDate) return;

    const now = new Date();
    const diff = parseInt((now - fpCooldownDate) / (cooldownSeconds * 1000));
    if (!diff) return;

    setFp(fp => clamp(0, fpmax)(fp - diff));
    const date = new Date(now);
    date.setSeconds(date.getSeconds() + cooldownSeconds);
    setFpCooldownDate(date);
  }, [fpmax, fpCooldownDate, setFpCooldownDate, setFp]);

  useEffect(() => {
    deductFpIfNeeded();
    const timer = setInterval(deductFpIfNeeded, 1000);
    return () => clearInterval(timer);
  }, [deductFpIfNeeded]);

  return { fpCooldownDate }
}

const encrypt = (str) => {
  const keys = ['小風媽', '小馬媽', '小風小馬', '小風', '小馬']
  const key = keys.find(k => str.includes(k))
  if (!key) return str.replace(/./g, '＊')
  return str.split(key).map(s => s.replace(/./g, '＊')).join(key)
}

const App = () => {
  const {
    score, setScore,
    speed, setSpeed,
    fp, setFp,
    fpmax, setFpmax,
    fpCooldownDate, setFpCooldownDate,
    ackedGoodFo, ackGoodFo, ackedGoodFos,
    queue, setQueue,
    velocityDiff, setVelocityDiff,
    gravity, setGravity,
    horseMomHelpDate, setHorseMomHelpDate,
    windMomHelpDate, setWindMomHelpDate,
    resetStorage, data,
  } = useStorage();

  const hasHorse = score >= MILESTONES.HORSE;
  const [horseArrived, setHorseArrived] = useState(false);

  const hasHorsemom = score >= MILESTONES.HORSEMOM;
  const hasWindmom = score >= MILESTONES.WINDMOM;

  const headingHome = score >= MILESTONES.ALL
  const hasAckedAllFos = useMemo(() => {
    let A = new Set(Object.keys(MILESTONES).filter(k => !!ANSWERS[k]));
    let B = new Set(ackedGoodFos);
    let diff = new Set([...A].filter(x => !B.has(x))).size;
    return diff === 0;
  }, [ackedGoodFos]);
  const hasHome = headingHome && hasAckedAllFos
  const [homeArrived, setHomeArrived] = useState(false);
  const [hasArrivedHome, setArrivedHome] = useState(false);

  const [superDueDate, setSuperDueDate] = useState(null);
  const setSuperSec = useCallback((sec) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + sec);
    setSuperDueDate(date);
    setTimeout(() => setSuperDueDate(null), sec * 1000);
  }, [setSuperDueDate]);
  const isSuper = superDueDate && new Date() < superDueDate;

  const onJump = useCallback(() => !isSuper && setFp(h => clamp(0, fpmax)(h + 1)), [fpmax, setFp, isSuper])
  const w = useWind({ jumpable: fp < fpmax, onJump, hasHorseArrived: hasHorse && horseArrived, homeArrived: hasHome && homeArrived && (!hasHorse || horseArrived), velocityDiff, gravity });

  const hasFinished = hasArrivedHome && w.top >= 100
  const sleeping = (!homeArrived || !horseArrived) && fp >= fpmax;
  const [justAcked, setJustAcked] = useState(false);
  const onFoReset = useCallback(() => setJustAcked(false), []);
  const fo = useFO({ speed: sleeping ? 0 : speed, score, ackedGoodFo, ackGoodFo, setQueue, headingHome, onReset: onFoReset });
  const { press, pressed } = usePressToJump({jump: w.jump, duration: FRAME_DURATION, hasFinished});

  const [isLove, setLove] = useState(false);
  const [isPui, setPui] = useState(false);
  const [isSad, setSad] = useState(false);

  const [dialog, setDialog] = useState(null);
  const [dialogTop, setDialogTop] = useState(0);

  useCooldown({fp, fpmax, setFp, fpCooldownDate, setFpCooldownDate})

  useEffect(() => {
    if (fo.visible && isHit(w, fo, hasHorse)) {
      fo.hit();
      if (!fo.acked) {
        if (prompt('請輸入它的名字', encrypt(fo.ans)) !== fo.ans) {
          alert('答錯了')
          setSad(true);
          setTimeout(() => setSad(false), 2000);
          return
        }
        fo.ack()
        setJustAcked(true);
      }

      fo.enqueue()

      setDialog(fo.ans);
      setDialogTop(fo.top);
      setTimeout(() => setDialog(null), 2000);

      setScore(s => s + 0.5);
      setSpeed(s => s + 0.04);
      setFp(h => clamp(0, fpmax)(h - (fo.score || 0)))

      if (fo.pui) {
        setPui(true);
        setTimeout(() => setPui(false), 500);
      } else {
        setLove(true);
        setTimeout(() => setLove(false), 500);
      }
    }
  }, [w, fo, fpmax, setFpmax, setScore, setSpeed, setFp, hasHorse]);

  const windImg = useMemo(() => {
    if (isLove) return windLove
    if (isPui) return windPui
    if (isSad) return windSad
    if (w.top < 100) return windFly
    if (sleeping) return windSleep
    return windWalk
  }, [isLove, isPui, isSad, w.top, sleeping])

  const horseImg = useMemo(() => {
    if (!horseArrived) return horseWalk
    if (w.top < 100) {
      if (isPui || (isLove && fo.horseLove)) return horseLove
      return horseStill
    }
    if (fp < fpmax) return horseWalk;
    return horseStill
  }, [fp, fpmax, horseArrived, w.top, isPui, isLove, fo.horseLove])

  const reset = useCallback((e) => {
    e.preventDefault()

    const updatedJson = window.prompt(`Reset?\n\n${JSON.stringify(data, null, 2)}`, JSON.stringify(data))
    if (updatedJson === null) return;
    try {
      const updatedData = JSON.parse(updatedJson);
      resetStorage(updatedData)
    } catch {
      alert('Invalid')
    }
  }, [resetStorage, data])

  const backdropStyle = useBackdropStyle();

  const [highlight, setHighlight] = useState(null);
  useEffect(() => {
    const highlight = queue.find(el => queue.filter(v => v===el).length >= 3)
    setHighlight(highlight)
  }, [queue])

  const now = new Date();
  const hasHorseMomChoices = horseArrived && horseMomHelpDate && (now >= horseMomHelpDate)
  const hasWindMomChoices = horseArrived && windMomHelpDate && (now >= windMomHelpDate)

  const handleClickHorseMom = useCallback(() => {
    if (hasHorseMomChoices) {
      setHorseMomHelpDate(new Date(new Date().getTime() + MOM_HELP_DATE_DIFF_MAX * Math.random()));
    }
  }, [hasHorseMomChoices, setHorseMomHelpDate])

  const handleClickWindMom = useCallback(() => {
    if (hasWindMomChoices) {
      setWindMomHelpDate(new Date(new Date().getTime() + MOM_HELP_DATE_DIFF_MAX * Math.random()));
    }
  }, [hasWindMomChoices, setWindMomHelpDate])

  useEffect(() => {
    if (hasHorsemom && !horseMomHelpDate) {
      setHorseMomHelpDate(new Date());
    }
  }, [hasHorsemom, horseMomHelpDate, setHorseMomHelpDate])

  useEffect(() => {
    if (hasWindmom && !windMomHelpDate) {
      setWindMomHelpDate(new Date());
    }
  }, [hasWindmom, windMomHelpDate, setWindMomHelpDate])

  return (
   <div className="App" onTouchStart={press} onTouchEnd={pressed} onTouchCancel={pressed}>
      <MiniMap score={score} />
      <div className={cn("fp", { danger: sleeping }, { pulse: isLove || isPui })} style={{height: `${fp/fpmax*100}%`}} />
      <div className={"sky"}>
        <div className={cn("backdrop", { paused: sleeping || homeArrived })} style={backdropStyle} />
        <div className={cn("home", { hidden: !hasHome })} onAnimationEnd={() => setHomeArrived(true)}>
          <img src={hasFinished ? homeOccupied : homeEmpty} alt="fo" />
        </div>
        <div className="score" onClick={reset}>{score.toFixed(1)}</div>
        <div className={cn("windmom", { hidden: !hasWindmom, hasChoices: hasWindMomChoices })} onClick={handleClickWindMom}>
          <img src={horseArrived && (sleeping || homeArrived) ? windmomStill : windmomWalk} alt="windmom" />
        </div>
        <div className={cn("wind", { hidden: hasFinished, super: isSuper })} style={{top: `${w.top}%`, left: `${w.left}%`}} onTransitionEnd={e => e.propertyName === 'left' && setArrivedHome(true)}>
          <img src={windImg} alt="wind" />
          <img src={windSweat} alt="sweat" className={cn("sweat", { hidden: fp/fpmax < 0.5 })} />
          <img src={windSweat} alt="sweat" className={cn("sweat", { hidden: fp/fpmax < 0.8 })} style={{ top: '10px', left: '-10px' }} />
          <img src={windSweat} alt="sweat" className={cn("sweat", { hidden: fp/fpmax < 0.95 })} style={{ left: '15px' }} />
        </div>
        <div className={cn("horse", { hidden: !hasHorse || hasFinished })} style={ horseArrived ? {top: `${w.top}%`, left: `${w.left}%`} : { top: '100%' }} onAnimationEnd={() => setHorseArrived(true)}>
          <img src={horseImg} alt="horse" />
        </div>
        <div className={cn("horsemom", { hidden: !hasHorsemom, hasChoices: hasHorseMomChoices })} onClick={handleClickHorseMom}>
          <img src={horseArrived && (sleeping || homeArrived) ? horsemomStill : horsemomWalk} alt="horsemom" />
        </div>
        <div className={cn("fo", { hidden: !fo.visible, locked: !fo.acked })} style={{top: `${fo.top}%`, left: `${fo.left}%`}}>
          <img src={fo.img} alt="fo" />
        </div>
        <div className={cn("dialog", { hidden: !dialog})} style={{top: `${dialogTop}%`, left: '20%'}}>
          {dialog}
        </div>
      </div>
      <Queue queue={queue} highlight={highlight} />
      <div className={cn("ground", { paused: sleeping || homeArrived })} style={{animationDuration: `${120/speed}s`}}></div>
      <Choices justAcked={justAcked} hasFinished={hasFinished} setQueue={setQueue} highlight={highlight} setHighlight={setHighlight} horseMomHelpDate={horseMomHelpDate} windMomHelpDate={windMomHelpDate} fp={fp} setFp={setFp} setFpmax={setFpmax} speed={speed} setSpeed={setSpeed} setSuperSec={setSuperSec} setVelocityDiff={setVelocityDiff} setGravity={setGravity} hasHorse={hasHorse} />
      <Finish className={{hidden: !hasFinished}} />
   </div>
  );
}

const Queue = ({ queue, highlight }) => {
  const [isNewQueue, setNewQueue] = useState(false);
  useEffect(() => setNewQueue(true), [queue])
  const reversed = useMemo(() => queue.reduce((arr, e) => [e, ...arr], []), [queue])
  return (
    <div className="queue">
      {reversed.map((key, i) => <img key={i} className={cn({ fadein: isNewQueue && i === reversed.length - 1, highlight: highlight === key })} src={IMAGES[key]} alt={key} onAnimationEnd={() => setNewQueue(false)} />)}
    </div>
  )
}

const MiniMap = ({ score }) => {
  const keys = ['WIND', ...Object.keys(MILESTONES)]
  keys.reverse()
  return (
    <div className="minimap">
      {keys.map(k => {
        const isWind = k === "WIND"
        const hidden = isWind ? false : score >= MILESTONES[k]
        const position = Math.max(0, Math.min(isWind ? score : MILESTONES[k], MILESTONES.ALL))
        const backgroundColor = COLORS[k]
        if (backgroundColor) {
          // bigger indicator
          return <div key={k} className={cn("mini", { hidden, wind: isWind })} style={{left: `${position/MILESTONES.ALL*100}%`, backgroundColor }} />
        } else {
          // thin indicator
          return <div key={k} className={cn("cut", { hidden })} style={{left: `${position/MILESTONES.ALL*100}%`}} />
        }
      })}
    </div>
  )
}

export default App;
