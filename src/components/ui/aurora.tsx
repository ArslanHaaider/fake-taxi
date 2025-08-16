'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = '',
}: AuroraProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const renderer = new Renderer({
      canvas: ref.current,
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      dpr: window.devicePixelRatio,
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform float u_blend;
      uniform float u_amplitude;
      uniform float u_speed;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float smoothNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        float time = u_time * u_speed;
        
        vec2 q = vec2(0.0);
        q.x = smoothNoise(st * 2.0 + time * 0.1);
        q.y = smoothNoise(st * 2.0 - time * 0.1);
        
        vec2 r = vec2(0.0);
        r.x = smoothNoise(st * 3.0 + q * 0.5 + time * 0.2);
        r.y = smoothNoise(st * 3.0 + q * 0.5 - time * 0.2);
        
        float f = smoothNoise(st * 4.0 + r * 0.25);
        
        vec3 color1 = u_color1;
        vec3 color2 = u_color2;
        vec3 color3 = u_color3;
        
        vec3 finalColor = mix(color1, color2, f);
        finalColor = mix(finalColor, color3, sin(time + st.x * 3.14159) * 0.5 + 0.5);
        
        float alpha = (f * 0.5 + 0.5) * u_blend * u_amplitude;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new Vec2(ref.current.clientWidth, ref.current.clientHeight) },
        u_color1: { value: colorStops[0].match(/[0-9a-f]{2}/gi)?.map(hex => parseInt(hex, 16) / 255) || [0.23, 0.16, 1.0] },
        u_color2: { value: colorStops[1].match(/[0-9a-f]{2}/gi)?.map(hex => parseInt(hex, 16) / 255) || [1.0, 0.58, 0.71] },
        u_color3: { value: colorStops[2].match(/[0-9a-f]{2}/gi)?.map(hex => parseInt(hex, 16) / 255) || [1.0, 0.2, 0.14] },
        u_blend: { value: blend },
        u_amplitude: { value: amplitude },
        u_speed: { value: speed },
      },
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    let animationId: number;
    const animate = (t: number) => {
      program.uniforms.u_time.value = t * 0.001;
      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (ref.current) {
        renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
        program.uniforms.u_resolution.value = new Vec2(ref.current.clientWidth, ref.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
    </div>
  );
}