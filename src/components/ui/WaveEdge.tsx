type Props = {
  /** セクションのどちらの端に置くか */
  edge: 'top' | 'bottom'
  /** 波の塗り色（隣のセクションの背景色に合わせる）例: "fill-paper" */
  fillClassName: string
}

const PERIOD = 1200 // 1 周期の幅。横に 2 周期ぶん並べ、半分だけ流して継ぎ目なく繰り返す
const HEIGHT = 100

/** ゆるやかな川面の線。周期の整数倍の波だけを重ねて、左右の端がつながるようにする */
function riverY(x: number, shift: number, scale: number) {
  const t = ((x + shift) / PERIOD) * Math.PI * 2
  return 52 + scale * (22 * Math.sin(t) + 10 * Math.sin(2 * t + 1.3) + 5 * Math.sin(3 * t + 0.6))
}

function wavePath(edge: Props['edge'], shift: number, scale: number) {
  const points: string[] = []
  for (let x = 0; x <= PERIOD * 2; x += 20) {
    points.push(`${x},${riverY(x, shift, scale).toFixed(1)}`)
  }
  const base = edge === 'bottom' ? HEIGHT : 0
  return `M0,${base} L${points.join(' L')} L${PERIOD * 2},${base} Z`
}

// 奥から手前へ 3 枚。奥ほど薄く・ゆっくり流し、川面の重なりを出す（速さと濃さは globals.css の .wave-layer-*）
const LAYERS = [
  { shift: 760, scale: 1.2 },
  { shift: 380, scale: 1.0 },
  { shift: 0, scale: 0.8 },
]

/**
 * 肱川の流れをイメージした、セクション境界の波。
 * 重ねた波を少しずつ違う速さでゆっくり横に流す（動きの定義は globals.css の .wave）。
 */
// 開くたびに波の位置を変える。各層の流れの開始位置を乱数でずらす（表示前に実行されるので、ずれる瞬間は見えない）。
// 「動きを減らす」設定で流れが止まっているときは、止まる位置だけを乱数で変える。
const randomizeScript = `(function(){var w=document.currentScript&&document.currentScript.previousElementSibling;if(!w)return;var s=w.querySelectorAll('svg');for(var i=0;i<s.length;i++){var c=getComputedStyle(s[i]),d=parseFloat(c.animationDuration)||0,r=Math.random();if(c.animationName==='none'||!d){s[i].style.transform='translateX('+(-r*50)+'%)'}else{s[i].style.animationDelay=(-r*d)+'s'}}})()`

export default function WaveEdge({ edge, fillClassName }: Props) {
  return (
    <>
      <div className={`wave ${edge === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px]'}`} aria-hidden="true">
        {LAYERS.map((layer, i) => (
          <svg
            key={i}
            suppressHydrationWarning
            className={`wave-layer-${i + 1} ${fillClassName}`}
            viewBox={`0 0 ${PERIOD * 2} ${HEIGHT}`}
            preserveAspectRatio="none"
          >
            <path d={wavePath(edge, layer.shift, layer.scale)} />
          </svg>
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: randomizeScript }} />
    </>
  )
}
