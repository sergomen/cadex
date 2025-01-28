import "./App.css";
// import { Vector3 } from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

// type Cube = {
//   position: Vector3;
//   color: string;
//   size: Vector3;
// };

const Cube = ({ position, color, size }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      // console.log(ref.current); // Mesh {isObject3D: true, uuid: '3e3e59d4-9728-4d5e-ab06-33fce91bf956', name: '', type: 'Mesh', parent: Group, …}
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, color, size }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh
      position={position} 
      ref={ref}
      onPointerEnter={(e) => (e.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} wireframe />
    </mesh>
  );
};

const Torus = ({ position, color, size }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const TorusKnot = ({ position, color, size }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta * speed;
      ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};



const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} />
      <group position={[0, -1, 0]}>
        <Cube position={[-1, 0, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
      </group>
      <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"orange"} />
      <Torus position={[2, 0, 0]} size={[0.5, 0.1, 30, 30]} color={"blue"} />
      <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 30, 30]} color={"hotpink"} />
    </Canvas>
  );
};

export default App;
