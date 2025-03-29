// src/components/TerraformControls.tsx

import React from 'react';
import useTerraform from '../hooks/useTerraform';

interface TerraformControlsProps {
  service: string;
}

const TerraformControls: React.FC<TerraformControlsProps> = ({ service }) => {
  const { deploy, destroy, loading, error } = useTerraform();

  const handleDeploy = async () => {
    const data = await deploy(service);
    // data contiene la respuesta tipada de DeployResponse si todo salió bien
  };

  const handleDestroy = async () => {
    const data = await destroy(service);
    // data contiene la respuesta tipada de DestroyResponse si todo salió bien
  };

  return (
    <div>
      <button onClick={handleDeploy} disabled={loading}>
        {loading ? 'Procesando...' : 'Deploy'}
      </button>
      <button onClick={handleDestroy} disabled={loading}>
        {loading ? 'Procesando...' : 'Destroy'}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </div>
  );
};

export default TerraformControls;
