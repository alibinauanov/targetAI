import React, { useState } from 'react';
import { 
  Settings, 
  Link, 
  CheckCircle, 
  AlertCircle, 
  Facebook, 
  Chrome,
  BarChart3,
  Key,
  RefreshCw
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastSync?: string;
}

export default function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'meta',
      name: 'Meta Business',
      icon: Facebook,
      status: 'disconnected',
      description: 'Facebook и Instagram реклама'
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: Chrome,
      status: 'disconnected',
      description: 'Google Ads и YouTube кампании'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      icon: BarChart3,
      status: 'disconnected',
      description: 'Отслеживание конверсий и поведения'
    }
  ]);

  const [showApiForm, setShowApiForm] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<{[key: string]: string}>({});

  const handleConnect = (integrationId: string) => {
    setShowApiForm(integrationId);
  };

  const handleSaveApiKey = (integrationId: string) => {
    if (apiKeys[integrationId]) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const, lastSync: 'Только что' }
          : integration
      ));
      setShowApiForm(null);
      setApiKeys(prev => ({ ...prev, [integrationId]: '' }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Подключено';
      case 'error':
        return 'Ошибка';
      default:
        return 'Не подключено';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Settings className="h-6 w-6 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Настройки интеграций</h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Link className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Подключите рекламные аккаунты</h3>
              <p className="text-blue-700 text-sm">
                Для мониторинга кампаний в реальном времени необходимо подключить ваши рекламные аккаунты. 
                Данные будут синхронизироваться каждые 15 минут.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-1">
                          Последняя синхронизация: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <span className="text-sm font-medium text-gray-700">
                        {getStatusText(integration.status)}
                      </span>
                    </div>
                    {integration.status === 'connected' ? (
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <RefreshCw className="h-4 w-4" />
                        <span>Обновить</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Подключить
                      </button>
                    )}
                  </div>
                </div>

                {showApiForm === integration.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Key className="h-4 w-4 mr-2" />
                        API ключ для {integration.name}
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Введите ваш API ключ..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={apiKeys[integration.id] || ''}
                          onChange={(e) => setApiKeys(prev => ({ ...prev, [integration.id]: e.target.value }))}
                        />
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleSaveApiKey(integration.id)}
                            disabled={!apiKeys[integration.id]}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            Сохранить
                          </button>
                          <button
                            onClick={() => setShowApiForm(null)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Отмена
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Инструкции по получению API ключа доступны в документации платформы
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Важная информация</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• API ключи хранятся в зашифрованном виде</li>
            <li>• Данные синхронизируются каждые 15 минут</li>
            <li>• Поддерживается отслеживание до 100 активных кампаний</li>
            <li>• История данных сохраняется на 90 дней</li>
          </ul>
        </div>
      </div>
    </div>
  );
}