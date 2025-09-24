import React, { createContext, useContext, useState, useEffect } from 'react';
import { pipelineAPI } from '../services/api';
import { useAuth } from './AuthContext';

const PipelineContext = createContext();

export const usePipeline = () => {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  return context;
};

export const PipelineProvider = ({ children }) => {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipelineIndex, setSelectedPipelineIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { isAuthenticated, isInitialized } = useAuth();

  // Fetch pipelines from backend - only when authenticated
  const fetchPipelines = async () => {
    // Don't fetch if not authenticated or already initialized
    if (!isAuthenticated || hasInitialized) {
      console.log('🔄 PipelineContext: Skipping fetch - not authenticated or already initialized');
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔄 PipelineContext: Fetching pipelines from backend...');
      const response = await pipelineAPI.getAll();
      console.log('✅ PipelineContext: Backend response received');
      
      if (response.data && response.data.pipelines) {
        console.log('🔄 PipelineContext: Processing pipeline data...');
        const formattedPipelines = response.data.pipelines.map(p => ({
          id: p.id,
          name: p.name,
          stages: p.stages.map(s => s.label),
          isDefault: p.isDefault
        }));
        
        setPipelines(formattedPipelines);
        
        // Set default pipeline
        const defaultIndex = formattedPipelines.findIndex(p => p.isDefault);
        if (defaultIndex !== -1) {
          setSelectedPipelineIndex(defaultIndex);
        }
        
        setHasInitialized(true);
        console.log('✅ PipelineContext: Pipelines loaded successfully');
      } else {
        console.log('🔄 PipelineContext: No pipeline data, setting defaults');
        setDefaultPipelines();
      }
    } catch (error) {
      console.error('❌ PipelineContext: Error fetching pipelines:', error);
      setDefaultPipelines();
    } finally {
      setIsLoading(false);
    }
  };

  // Set default pipelines
  const setDefaultPipelines = () => {
    const defaultPipelines = [{
      id: 1,
      name: 'Sales Pipeline',
      stages: ['Initial Contact', 'Discussions', 'Decision Making', 'Contract Discussion', 'Deal - won', 'Deal - lost'],
      isDefault: true
    }];
    setPipelines(defaultPipelines);
    setSelectedPipelineIndex(0);
    setHasInitialized(true);
  };

  // Update pipelines
  const updatePipelines = (newPipelines) => {
    setPipelines(newPipelines);
  };

  // Add new pipeline
  const addPipeline = (pipeline) => {
    setPipelines(prev => [...prev, pipeline]);
  };

  // Update specific pipeline
  const updatePipeline = (index, updatedPipeline) => {
    setPipelines(prev => prev.map((p, i) => i === index ? updatedPipeline : p));
  };

  // Delete pipeline
  const deletePipeline = (index) => {
    setPipelines(prev => prev.filter((_, i) => i !== index));
  };



  // Initial fetch - only when authentication is ready
  useEffect(() => {
    if (isInitialized && isAuthenticated && !hasInitialized) {
      console.log('🔄 PipelineContext: Authentication ready, fetching pipelines...');
      fetchPipelines();
    }
  }, [isInitialized, isAuthenticated, hasInitialized]);

  const value = {
    pipelines,
    selectedPipelineIndex,
    isLoading,
    setSelectedPipelineIndex,
    updatePipelines,
    addPipeline,
    updatePipeline,
    deletePipeline,
    fetchPipelines,

  };

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  );
}; 