// 'use client'
// import React from 'react';
// import dynamic from 'next/dynamic';

// const PigeonMap = dynamic(() => import('pigeon-maps'), { ssr: false });
// const { Marker } = dynamic(() => import('pigeon-maps'), { ssr: false });

// const MapComponent = () => {
//   const concessionarias = [
//     { nome: 'Concessionária 1', lat: 51.505, lon: -0.09 },
//     { nome: 'Concessionária 2', lat: 51.515, lon: -0.1 },
//     { nome: 'Concessionária 3', lat: 51.525, lon: -0.12 }
//   ];

//   return (
//     <div style={{ width: '100%', height: '500px' }}>
//       <PigeonMap center={[51.505, -0.09]} zoom={13}>
//         {concessionarias.map((concessionaria, index) => (
//           <Marker
//             key={index}
//             anchor={[concessionaria.lat, concessionaria.lon]}
//             payload={index}
//             onClick={() => alert(`Concessionária: ${concessionaria.nome}`)}
//           />
//         ))}
//       </PigeonMap>
//     </div>
//   );
// };

// export default MapComponent;
