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

/**
 * 肱川の流れをイメージした、セクション境界の波。
 * 2 枚の波を少し違う速さでゆっくり横に流す（動きの定義は globals.css の .wave）。
 */
export default function WaveEdge({ edge, fillClassName }: Props) {
  return (
    <div className={`wave ${edge === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px]'}`} aria-hidden="true">
      <svg
        className={`wave-back ${fillClassName}`}
        viewBox={`0 0 ${PERIOD * 2} ${HEIGHT}`}
        preserveAspectRatio="none"
      >
        <path d={wavePath(edge, 420, edge === 'bottom' ? 1.15 : 1.15)} />
      </svg>
      <svg className={fillClassName} viewBox={`0 0 ${PERIOD * 2} ${HEIGHT}`} preserveAspectRatio="none">
        <path d={wavePath(edge, 0, 0.85)} />
      </svg>
    </div>
  )
}
