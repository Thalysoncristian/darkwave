<template>
  <div class="wave-bg" aria-hidden="true">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          v-for="(points, i) in animatedLines"
          :key="i"
          :d="pointsToPath(points, i)"
          :stroke="color"
          stroke-width="1.1"
          :opacity="opacity"
          fill="none"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const width = 1200
const height = 420
const lines = 32 // Mais linhas para maior fidelidade
const pointsPerLine = 120 // Mais pontos por linha
const color = '#fff'
const opacity = 0.16
const lineGap = 11.5
const baseY = 30
const amp = 70

// Função para gerar um perfil central com "picos" irregulares
function generateProfile() {
  const arr = []
  for (let i = 0; i < pointsPerLine; i++) {
    // Pico central, suavidade nas bordas
    const t = i / (pointsPerLine - 1)
    const center = 0.5 - Math.abs(t - 0.5)
    // Ruído: mais forte no centro, menos nas bordas
    const noise = (Math.random() - 0.5) * 2 * Math.pow(center, 1.2) * amp
    arr.push(noise)
  }
  return arr
}

// Gera todas as linhas baseadas no perfil central
function generateLines() {
  const profile = generateProfile()
  const linesArr = []
  for (let l = 0; l < lines; l++) {
    const line = []
    for (let i = 0; i < pointsPerLine; i++) {
      // Cada linha é o perfil + leve variação
      const t = i / (pointsPerLine - 1)
      const center = 0.5 - Math.abs(t - 0.5)
      // Ruído extra para cada linha, mais forte no centro
      const offset = (Math.random() - 0.5) * 7 * Math.pow(center, 1.5)
      line.push(profile[i] + offset)
    }
    linesArr.push(line)
  }
  return linesArr
}

const baseLines = generateLines()
const animatedLines = ref(baseLines.map((line, l) => line.map((y, i) => [i, y])))

// Função para converter pontos em path SVG
function pointsToPath(points, lineIdx) {
  let d = ''
  for (let i = 0; i < points.length; i++) {
    const x = (width / (pointsPerLine - 1)) * i
    const y = baseY + lineIdx * lineGap + points[i][1]
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
  }
  return d
}

// Animação: "pulsar" orgânico, um pouco mais vivo
let animFrame
function animate() {
  const t = Date.now() * 0.001
  animatedLines.value = baseLines.map((line, l) =>
    line.map((baseY, i) => {
      const x = i
      const tNorm = i / (pointsPerLine - 1)
      const center = 0.5 - Math.abs(tNorm - 0.5)
      // Movimento mais vivo, mas ainda sutil
      const pulse = Math.sin(t * 1.1 + l * 0.22 + i * 0.13) * center * 13
      return [x, baseY + pulse]
    })
  )
  animFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.wave-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
svg {
  width: 100vw;
  height: auto;
  min-width: 900px;
  max-width: 1800px;
  min-height: 300px;
  max-height: 600px;
  display: block;
  margin: 0 auto;
  filter: blur(0.5px) contrast(1.1);
  user-select: none;
}
</style> 