import React, { useState } from 'react';
import Header from './components/Header';
import CampaignCreator from './components/CampaignCreator';
import Dashboard from './components/Dashboard';
import IntegrationSettings from './components/IntegrationSettings';
import { PlusCircle, BarChart3, Settings } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard' | 'settings'>('create');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <PlusCircle className="inline h-4 w-4 mr-2" />
              Создать кампанию
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="inline h-4 w-4 mr-2" />
              Панель управления
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="inline h-4 w-4 mr-2" />
              Интеграции
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="py-8">
        {activeTab === 'create' && <CampaignCreator />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'settings' && <IntegrationSettings />}
      </main>
    </div>
  );
}

export default App;