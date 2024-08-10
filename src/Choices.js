import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import usePrev from './usePrev';

const GET_CHOICES = ({ fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }) => [
  (() => {
    const speeddiff = [-5, -4, -3, -2, -1, -0.5, -0.3].find(v => speed + v >= 1);
    if (!speeddiff) return null;
    return {
      desc: fnum("橫移速度", "🥾", speeddiff),
      callback: () => setSpeed(s => Math.max(1, s + speeddiff)),
    }
  })(),
  (() => {
    const fpmaxdiff = randomChoice([5, 10]);
    return {
      desc: fnum("增加耐力", "💪", fpmaxdiff),
      callback: () => setFpmax(fpmax => fpmax + fpmaxdiff),
    }
  })(),
  (() => {
    const velocityDiffDiff = randomChoice([0.1, 0.3]);;
    return {
      desc: fnum("增加彈跳力", "🏀", velocityDiffDiff),
      callback: () => setVelocityDiff(velocityDiff => velocityDiff + velocityDiffDiff),
    }
  })(),
  (() => {
    const gravityDiff = 0.05;
    return {
      desc: fnum("增加重量", "🏋️", gravityDiff),
      callback: () => setGravity(gravity => gravity + gravityDiff),
    }
  })(),
  (() => {
    const fpdiff = randomChoice([-10, -20, -30].filter(v => fp + v >= 0));
    if (!fpdiff) return null;
    return {
      desc: fnum("減少疲憊", "😴", fpdiff),
      callback: () => setFp(fp => Math.max(0, fp + fpdiff)),
    }
  })(),
  (() => {
    if (!hasHorse) return null;
    const sec = randomChoice([10, 15, 20]);
    return {
      desc: fnum("無敵狀態", "🚀", sec, "秒"),
      callback: () => setSuperSec(sec),
    }
  })(),
].filter(v => !!v);

const randomChoice = (choices) => choices[Math.floor(Math.random() * choices.length)]
const fnum = (prefix, icon, n, suffix = '') => <div><p>{prefix}</p><p>{icon + "" + (n > 0 ? '+' : '') + n + suffix}</p></div>

const Choices = ({ justAcked, hasFinished, highlight, setHighlight, setQueue, windMomHelpDate, horseMomHelpDate, fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }) => {
  const [interactionEnabled, setInteractionEnabled] = useState(false);
  const [choosing, setChoosing] = useState(false);

  const [choices, setChoices] = useState([]);
  const onChoose = useCallback((callback) => {
    if (!interactionEnabled) return;
    callback();
    setChoices([])
    setChoosing(false);
  }, [interactionEnabled]);

  useEffect(() => {
    if ((highlight || justAcked) && !hasFinished) {
      setChoosing(true);
    }
  }, [highlight, justAcked, hasFinished]); // eslint-disable-line react-hooks/exhaustive-deps

  const prevWindMomHelpDate = usePrev(windMomHelpDate);
  const prevHorseMomHelpDate = usePrev(horseMomHelpDate);
  useEffect(() => {
    const windMomHelpDateChanged = prevWindMomHelpDate && prevWindMomHelpDate.getDate() && windMomHelpDate && windMomHelpDate.getDate() && prevWindMomHelpDate.getTime() !== windMomHelpDate.getTime();
    const horseMomHelpDateChanged = prevHorseMomHelpDate && prevHorseMomHelpDate.getDate() && horseMomHelpDate && horseMomHelpDate.getDate() && prevHorseMomHelpDate.getTime() !== horseMomHelpDate.getTime();
    if (windMomHelpDateChanged || horseMomHelpDateChanged) {
      setChoosing(true)
    }
  }, [prevHorseMomHelpDate, horseMomHelpDate, prevWindMomHelpDate, windMomHelpDate])

  useEffect(() => {
    if (!choosing) return;

    setInteractionEnabled(false);

    let delay = 0
    if (highlight) delay = 1000

    setTimeout(() => {
      setChoices(GET_CHOICES({ fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }).sort(() => Math.random() - 0.5).slice(0, 2));
    }, delay)
  }, [choosing]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!choosing || !highlight) return;

    setTimeout(() => {
      setHighlight(null);
      setQueue(queue => queue.filter(v => v !== highlight))
    }, 3000);
  }, [highlight, choosing]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("choices", "fadein", {hidden: !choosing})} onTouchStart={e => e.stopPropagation()} onAnimationEnd={() => setInteractionEnabled(true)}>
      {choices.map(({ desc, callback }, i) => <button key={i} className="choice" onClick={() => onChoose(callback)}>{desc}</button>)}
    </div>
  );
}

export default Choices;
