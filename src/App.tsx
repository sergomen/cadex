import './App.css';
// import { Vector3 } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// type Cube = {
//   position: Vector3;
//   color: string;
//   size: Vector3;
// };

const Cube = ({position, color, size}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
    }
  });

  return (
    <mesh position={position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
  )
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} />
      <group position={[0, -1, 0]}>
        <Cube position={[-1, 0, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
      </group>
    </Canvas>
  )
}

export default App;
