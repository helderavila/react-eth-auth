import { useContext } from 'react';
import { MetaAuthContext } from '../context/MetaAuthContext';

export const useMetaAuth = () => useContext(MetaAuthContext)