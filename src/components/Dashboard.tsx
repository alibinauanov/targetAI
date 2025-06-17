import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Eye, 
  MousePointer, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  BarChart3,
  Wifi
} from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  status = 'good'
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  status?: 'good' | 'bad';
}) => {
  const statusColors = {
    good: 'text-green-600 bg-green-50',
    bad: 'text-red-600 bg-red-50'
  };

  const changeColor = status === 'good' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {status === 'good' ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${changeColor}`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${statusColors[status]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ 
  label, 
  description,
  statusType
}: {
  label: string;
  description: string;
  statusType: 'good' | 'warning' | 'bad';
}) => {
  const statusConfig = {
    good: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    bad: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' }
  };

  const config = statusConfig[statusType];
  const Icon = config.icon;

  return (
    <div className={`flex items-start space-x-3 p-4 ${config.bg} rounded-lg`}>
      <Icon className={`h-5 w-5 ${config.color} mt-0.5`} />
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-medium text-gray-900">{label}</p>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const RNPCell = ({ percent }: { percent: string }) => {
  const numericPercent = parseFloat(percent.replace('%', ''));
  let colorClass = '';
  
  if (numericPercent <= 50) {
    colorClass = 'text-red-600';
  } else if (numericPercent <= 80) {
    colorClass = 'text-yellow-600';
  } else {
    colorClass = 'text-green-600';
  }

  return (
    <span className={`font-medium ${colorClass}`}>
      {percent}
    </span>
  );
};

const RNPTable = () => {
  const data = [
    { metric: 'Рекламный бюджет', plan: '$2,000', fact: '$494.03', percent: '24.70%' },
    { metric: 'Показы', plan: '195,122', fact: '49,040', percent: '25.13%' },
    { metric: 'Охваты', plan: '130,081', fact: '19,938', percent: '15.33%' },
    { metric: 'CTR %', plan: '1.15%', fact: '0.99%', percent: '86.00%' },
    { metric: 'Кол-во Кликов', plan: '2,244', fact: '485', percent: '21.61%' },
    { metric: 'Конверсия Клики-Лиды', plan: '20.79%', fact: '17.73%', percent: '85.29%' },
    { metric: 'Кол-во лидов', plan: '467', fact: '86', percent: '18.43%' },
    { metric: 'Конверсия в покупку', plan: '3%', fact: '33%', percent: '1010.10%' },
    { metric: 'Средний чек', plan: '$683', fact: '$616.22', percent: '90.22%' },
    { metric: 'Выручка', plan: '$10,245', fact: '$2,464.88', percent: '24.06%' },
    { metric: 'ROMI', plan: '412%', fact: '399%', percent: '96.77%' },
    { metric: 'CAC', plan: '$133.33', fact: '$123.51', percent: '92.63%' },
    { metric: 'CPL - Цена Лида', plan: '$4.29', fact: '$5.74', percent: '133.99%' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">РНП</h2>
        <p className="text-sm text-gray-600 mt-1">Показатели по дням - College Hub</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Метрика</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">План</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Факт</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% выполнения</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.metric}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.fact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <RNPCell percent={row.percent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель управления кампаниями</h1>
          <p className="text-gray-600 mt-1">Мониторинг активных кампаний и показателей эффективности - College Hub</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
            <Wifi className="h-4 w-4" />
            <span>Подключено</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Последнее обновление: 2 минуты назад</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Общие расходы"
          value="$494.03"
          change="соответствует плану"
          icon={DollarSign}
          status="good"
        />
        <MetricCard
          title="Показы"
          value="49,040"
          change="соответствует плану"
          icon={Eye}
          status="good"
        />
        <MetricCard
          title="CTR"
          value="0.99%"
          change="не соответствует плану"
          icon={MousePointer}
          status="bad"
        />
        <MetricCard
          title="Конверсия в покупку"
          value="33%"
          change="соответствует плану"
          icon={Users}
          status="good"
        />
      </div>

      {/* ROI and Campaign Status */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Проверка состояния кампаний
          </h2>
          <div className="space-y-4">
            <StatusItem
              label="Расходование бюджета"
              description="идет по плану"
              statusType="good"
            />
            <StatusItem
              label="UTM метки"
              description="установлены и в работе"
              statusType="good"
            />
            <StatusItem
              label="Показатель CTR"
              description="ниже нормы для ниши (1%). нужно поменять креативы"
              statusType="bad"
            />
            <StatusItem
              label="Модерация креативов"
              description="не представляет угрозы"
              statusType="good"
            />
            <StatusItem
              label="Соответствие метрик"
              description="Большинство метрик идет по плану, но есть над чем поработать"
              statusType="warning"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
            Показатели ROI
          </h2>
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-green-600 mb-2">399%</div>
              <p className="text-lg text-gray-900 font-semibold">ROI</p>
              <p className="text-sm text-gray-600 mt-2">
                Ваша реклама принесла вам <span className="font-semibold text-green-600">$1,971.17</span> прибыли
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Эта неделя</span>
                <span className="text-lg font-bold text-green-600">+18.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Прошлая неделя</span>
                <span className="text-lg font-bold text-blue-600">+15.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Среднее за месяц</span>
                <span className="text-lg font-bold text-purple-600">+22.1%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RNP Table */}
      <RNPTable />
    </div>
  );
}