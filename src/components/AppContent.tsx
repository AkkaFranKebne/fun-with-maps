import React from 'react';
import { MyMap } from './Map';

const apikey = import.meta.env.VITE_HERE_MAP_API_KEY;
export const AppContent: React.FC = () => <div className='content'>{apikey && <MyMap apikey={apikey} />}</div>;