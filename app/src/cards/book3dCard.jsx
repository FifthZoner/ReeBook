import React from 'react';
import { Gltf, OrbitControls, PerspectiveCamera } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber';



export default function book3dCard(){
    return(
    <div className=" text-white p-12">
        <Canvas style={{height: "400px"}}>
            <ambientLight intensity={4}/>
            <pointLight position={[-1, 0, 2]} intensity={10}/>
            <OrbitControls autoRotate={true} autoRotateSpeed={5} enableZoom={false} enableRotate={false}/>
            <Gltf src="../../public/models/book.glb" rotation={[0,-90,0]} scale={22}/>
        </Canvas>   
    </div>
    );
}