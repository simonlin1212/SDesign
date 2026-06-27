import { useEffect, useRef } from 'react'

// 自包含 WebGL 流动渐变背景(设计色在里面缓慢游动)。WebGL 失败时退回 CSS 渐变。
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;
  vec2 q = vec2(uv.x * asp, uv.y) * 1.5;
  float t = u_time * 0.05;

  float n = fbm(q + vec2(t, t * 0.6) + fbm(q * 1.4 - t * 0.8));

  vec3 base = vec3(0.030, 0.030, 0.055);    // #08080e
  vec3 indigo = vec3(0.369, 0.416, 0.823);  // #5e6ad2
  vec3 terra = vec3(0.788, 0.392, 0.259);   // #c96442
  vec3 emerald = vec3(0.243, 0.811, 0.557); // #3ecf8e
  vec3 orange = vec3(1.0, 0.353, 0.122);    // #ff5a1f

  vec3 col = base;
  col = mix(col, indigo, smoothstep(0.15, 0.95, n + uv.y * 0.25));
  col = mix(col, terra, smoothstep(0.45, 1.0, fbm(q * 1.2 + t * 1.4)) * 0.65);
  col = mix(col, emerald, smoothstep(0.55, 1.0, fbm(q + vec2(-t, t * 1.2))) * 0.35);
  col = mix(col, orange, pow(smoothstep(0.62, 1.0, n), 2.0) * 0.55);

  float d = distance(uv, vec2(0.5, 0.42));
  col *= 1.0 - d * 0.55;                     // 暗角
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015; // 微噪点防色带

  gl_FragColor = vec4(col, 1.0);
}`

export default function GradientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) return // CSS 兜底背景生效

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const start = performance.now()
    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 h-full w-full"
      style={{ background: 'radial-gradient(120% 90% at 30% 20%, #20204a 0%, #0d0d1c 45%, #08080e 100%)' }}
    />
  )
}
