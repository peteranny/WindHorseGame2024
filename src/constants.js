import foPeach from './fo-peach.png'
import foApple from './fo-apple.png'
import foPineapple from './fo-pineapple.png'
import foStrawberry from './fo-strawberry.png'
import foWatermelon from './fo-watermelon.png'
import foSpaghetti from './fo-spaghetti.png'
import foColdnoodle from './fo-coldnoodle.png'
import foIntervieweeHorse from './fo-interviewee-horse.png'
import foIntervieweeWind from './fo-interviewee-wind.png'
import foInterviewerHorse from './fo-interviewer-horse.png'
import foInterviewerWind from './fo-interviewer-wind.png'
import foManagerHorse from './fo-manager-horse.png'
import foManagerWind from './fo-manager-wind.png'
import foVoteWindHorse from './fo-vote-windhorse.png'
import foKiwiWind from './fo-kiwi-wind.png'
import foWhiteWind from './fo-white-wind.png'
import foNippleWind from './fo-nipple-wind.png'
import foMelonWind from './fo-melon-wind.png'
import foPsyduckWind from './fo-psyduck-wind.png'
import foSlowpokeHorse from './fo-slowpoke-horse.png'
import foGrapefruitWind from './fo-grapefruit-wind.png'
import foQuaxlyWind from './fo-quaxly-wind.png'
import foSparrowWind from './fo-sparrow-wind.png'
import foTangerineWind from './fo-tangerine-wind.png'
import foPartridgeWind from './fo-partridge-wind.png'
import foPlumbeousWind from './fo-plumbeous-wind.png'
import foRufousWind from './fo-rufous-wind.png'
import foThrushWind from './fo-thrush-wind.png'
import foTigerHorse from './fo-tiger-horse.png'
import foElephantHorse from './fo-elephant-horse.png'
import foHedgehogHorse from './fo-hedgehog-horse.png'
import foNightingleWind from './fo-nightingale-wind.png'

export const FRAME_DURATION = 50;

export const MILESTONES = {
  FO_SPAGHETTI: 0,
  FO_PEACH: 20,
  FO_COLDNOODLE: 28,
  FO_APPLE: 30,
  FO_PINEAPPLE: 35,
  FO_STRAWBERRY: 50,
  FO_WATERMELON: 55,
  HORSE: 100,
  FO_MANAGER_WIND: 110,
  FO_MANAGER_HORSE: 115,
  FO_INTERVIEWEE_HORSE: 130,
  FO_INTERVIEWEE_WIND: 135,
  FO_INTERVIEWER_HORSE: 140,
  FO_INTERVIEWER_WIND: 145,
  FO_VOTE_WINDHORSE: 160,
  FO_NIPPLE_WIND: 175,
  FO_QUAXLY_WIND: 190,
  FO_PSYDUCK_WIND: 195,
  FO_SLOWPOKE_HORSE: 200,
  FO_KIWI_WIND: 225,
  FO_THRUSH_WIND: 240,
  FO_TIGER_HORSE: 245,
  HORSEMOM: 250,
  FO_WHITE_WIND: 265,
  FO_MELON_WIND: 285,
  FO_GRAPEFRUIT_WIND: 310,
  FO_SPARROW_WIND: 320,
  FO_TANGERINE_WIND: 325,
  FO_PARTRIDGE_WIND: 340,
  FO_PLUMBEOUS_WIND: 342,
  FO_RUFOUS_WIN: 344,
  WINDMOM: 350,
  FO_HEDGEHOG_HORSE: 380,
  FO_ELEPHANT_HORSE: 400,
  FO_NIGHTINGALE_WIND: 450,
  ALL: 500,
}

export const COLORS = {
  WIND: '#ADC7DC',
  HORSE: '#B7C8BA',
  HORSEMOM: '#E2FE68',
  WINDMOM: '#C2A5E5',
  ALL: '#FFFFFF',
}

export const IMAGES = {
  FO_SPAGHETTI: foSpaghetti,
  FO_COLDNOODLE: foColdnoodle,
  FO_PEACH: foPeach,
  FO_APPLE: foApple,
  FO_PINEAPPLE: foPineapple,
  FO_STRAWBERRY: foStrawberry,
  FO_WATERMELON: foWatermelon,
  FO_INTERVIEWEE_HORSE: foIntervieweeHorse,
  FO_INTERVIEWEE_WIND: foIntervieweeWind,
  FO_INTERVIEWER_HORSE: foInterviewerHorse,
  FO_INTERVIEWER_WIND: foInterviewerWind,
  FO_MANAGER_HORSE: foManagerHorse,
  FO_MANAGER_WIND: foManagerWind,
  FO_VOTE_WINDHORSE: foVoteWindHorse,
  FO_KIWI_WIND: foKiwiWind,
  FO_WHITE_WIND: foWhiteWind,
  FO_NIPPLE_WIND: foNippleWind,
  FO_MELON_WIND: foMelonWind,
  FO_PSYDUCK_WIND: foPsyduckWind,
  FO_SLOWPOKE_HORSE: foSlowpokeHorse,
  FO_GRAPEFRUIT_WIND: foGrapefruitWind,
  FO_QUAXLY_WIND: foQuaxlyWind,
  FO_SPARROW_WIND: foSparrowWind,
  FO_TANGERINE_WIND: foTangerineWind,
  FO_PARTRIDGE_WIND: foPartridgeWind,
  FO_PLUMBEOUS_WIND: foPlumbeousWind,
  FO_RUFOUS_WIN: foRufousWind,
  FO_THRUSH_WIND: foThrushWind,
  FO_TIGER_HORSE: foTigerHorse,
  FO_ELEPHANT_HORSE: foElephantHorse,
  FO_HEDGEHOG_HORSE: foHedgehogHorse,
  FO_NIGHTINGALE_WIND: foNightingleWind,
}

export const ANSWERS = {
  FO_SPAGHETTI: '小風鐵板麵',
  FO_COLDNOODLE: '小馬涼麵',
  FO_PEACH: '小風媽水蜜桃',
  FO_APPLE: '小風小馬蘋果',
  FO_PINEAPPLE: '小風小馬鳳梨',
  FO_STRAWBERRY: '小風小馬草莓',
  FO_WATERMELON: '小風小馬西瓜',
  FO_INTERVIEWEE_HORSE: '職位說明書小馬',
  FO_INTERVIEWEE_WIND: '職位說明書小風',
  FO_INTERVIEWER_HORSE: '評價小馬',
  FO_INTERVIEWER_WIND: '評價小風',
  FO_MANAGER_HORSE: '主管小馬',
  FO_MANAGER_WIND: '主管小風',
  FO_VOTE_WINDHORSE: '問卷調查小風小馬',
  FO_KIWI_WIND: '奇異果小風',
  FO_WHITE_WIND: '銀喉圓尾山小風',
  FO_NIPPLE_WIND: '小風風頭小風',
  FO_MELON_WIND: '西瓜小風',
  FO_PSYDUCK_WIND: '可達鴨小風',
  FO_SLOWPOKE_HORSE: '呆呆獸小馬',
  FO_GRAPEFRUIT_WIND: '柚子小風',
  FO_QUAXLY_WIND: '小夫鴨',
  FO_SPARROW_WIND: '麻雀小風',
  FO_TANGERINE_WIND: '橘子小風',
  FO_PARTRIDGE_WIND: '竹雞小風',
  FO_PLUMBEOUS_WIND: '鉛色小風',
  FO_RUFOUS_WIN: '竹鳥小風',
  FO_THRUSH_WIND: '紫嘯鶇小風',
  FO_TIGER_HORSE: '小馬虎',
  FO_ELEPHANT_HORSE: '小馬象',
  FO_HEDGEHOG_HORSE: '刺蝟小馬',
  FO_NIGHTINGALE_WIND: '夜鶯小風',
}

export const PUI = {
  FO_PEACH: true,
  FO_APPLE: true,
  FO_PINEAPPLE: true,
  FO_STRAWBERRY: true,
  FO_WATERMELON: true,
  FO_INTERVIEWEE_HORSE: true,
  FO_INTERVIEWEE_WIND: true,
  FO_INTERVIEWER_HORSE: true,
  FO_INTERVIEWER_WIND: true,
  FO_MANAGER_HORSE: true,
  FO_MANAGER_WIND: true,
  FO_QUAXLY_WIND: true,
}

export const HORSE_LOVE = {
  FO_COLDNOODLE: true,
}

export const MOM_HELP_DATE_DIFF_MAX = 60 * 60 * 1000; // 1 hour
