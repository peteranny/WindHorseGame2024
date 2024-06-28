import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';

const GET_CHOICES = ({ fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }) => [
  (() => {
    const speeddiff = randomChoice([-1, -0.5, -0.3].filter(v => speed + v >= 1));
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

const Choices = ({ hasFinished, highlight, setHighlight, setQueue, fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }) => {
  const [interactionEnabled, setInteractionEnabled] = useState(false);

  const [choices, setChoices] = useState([]);
  const choosing = choices.length > 0
  const onChoose = useCallback((callback) => {
    if (!interactionEnabled) return;
    callback();
    setChoices([])
  }, [interactionEnabled]);

  useEffect(() => {
    if (!highlight || choosing) return;

    if (!hasFinished) {
      setInteractionEnabled(false);

      setTimeout(() => {
        setChoices(GET_CHOICES({ fp, setFp, setFpmax, speed, setSpeed, setSuperSec, setVelocityDiff, setGravity, hasHorse }).sort(() => Math.random() - 0.5).slice(0, 2));
      }, 1000)
    }

    setTimeout(() => {
      setHighlight(null);
      setQueue(queue => queue.filter(v => v !== highlight))
    }, 3000);
  }, [highlight, hasFinished]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("choices", "fadein", {hidden: !choosing})} onTouchStart={e => e.stopPropagation()} onAnimationEnd={() => setInteractionEnabled(true)}>
      {choices.map(({ desc, callback }, i) => <button key={i} className="choice" onClick={() => onChoose(callback)}>{desc}</button>)}
    </div>
  );
}

export default Choices;
