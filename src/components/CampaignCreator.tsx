import React, { useState } from 'react';
import { Upload, FileText, Users, Zap, Download, CheckCircle, AlertTriangle, Image, Video, Grid3X3, BarChart3 } from 'lucide-react';

interface CampaignData {
  companyName: string;
  niche: string;
  audience: string;
  offer: string;
  adNetwork: string;
  adGoal: string;
  adFormat: string;
  adStyle: string;
  textStyle: string;
  fbReport: File | null;
  creativeType: 'static' | 'video' | null;
  files: File[];
  personaUpload: boolean | null;
  personaFile: File | null;
  selectedTemplates: string[];
}

interface GeneratedCampaign {
  adCopy: string[];
  audienceSegments: {
    title: string;
    details: string[];
  }[];
  budgetRecommendation: string[];
  campaignStructure: string[];
  tips: string[];
  creativeExamples: string[];
}

const CreativeTemplate = ({ 
  id, 
  title, 
  preview, 
  isSelected, 
  onSelect,
  imageUrl
}: {
  id: string;
  title: string;
  preview: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  imageUrl?: string;
}) => (
  <div 
    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
      isSelected 
        ? 'border-purple-500 bg-purple-50' 
        : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onSelect(id)}
  >
    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs text-gray-500 text-center p-2">{preview}</span>
      )}
    </div>
    <p className="text-sm font-medium text-center">{title}</p>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
    <div 
      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default function CampaignCreator() {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    companyName: '',
    niche: '',
    audience: '',
    offer: '',
    adNetwork: '',
    adGoal: '',
    adFormat: '',
    adStyle: '',
    textStyle: '',
    fbReport: null,
    creativeType: null,
    files: [],
    personaUpload: null,
    personaFile: null,
    selectedTemplates: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCampaignData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleFbReportUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCampaignData(prev => ({ ...prev, fbReport: file }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setCampaignData(prev => ({
      ...prev,
      selectedTemplates: prev.selectedTemplates.includes(templateId)
        ? prev.selectedTemplates.filter(id => id !== templateId)
        : [...prev.selectedTemplates, templateId]
    }));
  };

  const generateCampaign = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI processing with progress updates
    const progressSteps = [
      { progress: 15, delay: 500, message: 'Анализ целевой аудитории...' },
      { progress: 30, delay: 800, message: 'Генерация рекламных текстов...' },
      { progress: 50, delay: 1000, message: 'Создание структуры кампании...' },
      { progress: 70, delay: 800, message: 'Расчет бюджетных рекомендаций...' },
      { progress: 85, delay: 600, message: 'Проверка модерации Facebook...' },
      { progress: 100, delay: 500, message: 'Финализация кампании...' }
    ];

    for (const stepData of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, stepData.delay));
      setGenerationProgress(stepData.progress);
    }
    
    const campaign: GeneratedCampaign = {
      adCopy: [
        'Думал(а), поступить в топ вуз — это рандом? Ага, тоже так думали. College Hub — стратегия поступления за 7 дней. Работает. Проверено 👀',
        'Составь свой путь к вузу мечты. Без репетиторов. Без хаоса. За 7 дней. Или деньги вернут.',
        'Ваша дочь или сын мечтают учиться за границей? Поможем составить персональный план поступления за 7 дней. Или вернём деньги.',
        'Ребёнок не знает, с чего начать? С College Hub он получит пошаговую стратегию поступления и поддержку на каждом этапе.'
      ],
      audienceSegments: [
        {
          title: 'Лицо Влияющее на Решение (молодёжь 14–21)',
          details: [
            'Возраст: 14–21',
            'Гео: Казахстан, Кыргызстан',
            'Интересы: Study Abroad, NIS, КТЛ, Quantum, IELTS, TOEFL, SAT',
            'Поведение: Instagram Reels, TikTok, Telegram',
            'Язык: Русский, Казахский'
          ]
        },
        {
          title: 'Лицо Принимающее Решение (родители)',
          details: [
            'Возраст: 35–55',
            'Гео: Казахстан, Кыргызстан',
            'Интересы: Родительство, частные школы, репетиторы',
            'Платформы: Facebook Groups, Instagram',
            'Язык: Русский'
          ]
        }
      ],
      budgetRecommendation: [
        'Первый тест: Минимум 3 кампании: ЛВР + ЛПР + Lookalike или Broad',
        'В каждой — 2–3 креатива, 2 текста',
        'Бюджет на группу: от $5–10/день',
        'Итого старт: ~$20–30/день на весь аккаунт',
        'Через 3–5 дней отключаешь слабые креативы/тексты, заливаешь лучшее'
      ],
      campaignStructure: [
        'Lead Gen (лид-форма в FB/IG) — если нет готового сайта',
        'Traffic → Telegram / Quiz / WhatsApp — если общение в мессенджере',
        'Messages (Insta DMs) — если закрываешь вручную в директе',
        'ЛВР (подростки) — Reels / TikTok-style / мемный стиль',
        'ЛПР (родители) — экспертный подход / отзывы / гарантия',
        'Retargeting — все, кто смотрел 50%+ видео, открыл лид-форму'
      ],
      tips: [
        'Обязательно A/B тестировать стили: доверительный vs. экспертный',
        'Разделите кампании по ЦА. Не смешивай подростков и родителей в одной группе',
        'Добавьте лид-форму или quiz на лендинге, чтобы не гнать трафик впустую',
        'Собери Retargeting аудиторию по просмотрам 50%+ видео',
        'Собирайте видео-отзывы от первых юзеров — они потом легко превращаются в рекламу'
      ],
      creativeExamples: [
        'Отзыв клиента с 5 звездами',
        'Промо с гарантией возврата денег',
        'Статистика успешных поступлений'
      ]
    };
    
    setGeneratedCampaign(campaign);
    setIsGenerating(false);
    setStep(4);
  };

  const staticTemplates = [
    { 
      id: 'product-card', 
      title: 'Продуктовая карточка', 
      preview: 'Инфа про продукт + цена', 
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'testimonial', 
      title: 'Отзыв клиента', 
      preview: 'Текст отзыв от клиента', 
      imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'meme', 
      title: 'Мем', 
      preview: 'Развлекательный мем', 
      imageUrl: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'promo', 
      title: 'Промо-акция', 
      preview: 'Скидка на продукт', 
      imageUrl: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'before-after', 
      title: 'До / после', 
      preview: 'Эффект до и после использования продукта', 
      imageUrl: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'statistics', 
      title: 'Статистика', 
      preview: 'Цифры что показывают пользу продукта', 
      imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const videoTemplates = [
    { 
      id: 'video-testimonial', 
      title: 'Отзыв клиента', 
      preview: 'Видео/аудио отзыв', 
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 'video-meme', 
      title: 'Мем', 
      preview: 'Развлекательный мем что залетит', 
      imageUrl: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'video-before-after', 
      title: 'До / после', 
      preview: 'Эффект до и после использования продукта', 
      imageUrl: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'expertise', 
      title: 'Экспертность', 
      preview: 'Экспертное полезное видео', 
      imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' 
    },
    { 
      id: 'movie', 
      title: 'Фильм', 
      preview: 'Фильм', 
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const currentTemplates = campaignData.creativeType === 'static' ? staticTemplates : videoTemplates;

  const downloadAssets = () => {
    const files = [
      '/campaign.pdf',
      '/статика1.png',
      '/статика2.png',
      '/статика3.png'
    ];

    files.forEach(file => {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop() || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= num ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {num}
            </div>
            {num < 5 && <div className={`w-16 h-1 mx-2 ${step > num ? 'bg-purple-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Company Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Введите инфу про компанию</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.companyName} onChange={e => setCampaignData(prev => ({ ...prev, companyName: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ниша</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.niche} onChange={e => setCampaignData(prev => ({ ...prev, niche: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Целевая аудитория (ЛПР и ЛВР)</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.audience} onChange={e => setCampaignData(prev => ({ ...prev, audience: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ваш оффер</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.offer} onChange={e => setCampaignData(prev => ({ ...prev, offer: e.target.value }))} />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button onClick={() => setStep(2)} disabled={!campaignData.companyName || !campaignData.niche || !campaignData.audience || !campaignData.offer} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Далее</button>
          </div>
        </div>
      )}

      {/* Step 2: Ad Info */}
      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Введите инфу про желаемой рекламе</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Соцсеть</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.adNetwork} onChange={e => setCampaignData(prev => ({ ...prev, adNetwork: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цель рекламы</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.adGoal} onChange={e => setCampaignData(prev => ({ ...prev, adGoal: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Формат объявления</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.adFormat} onChange={e => setCampaignData(prev => ({ ...prev, adFormat: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Рекламный стиль</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.adStyle} onChange={e => setCampaignData(prev => ({ ...prev, adStyle: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Стиль текста</label>
              <input type="text" className="w-full p-4 border border-gray-300 rounded-lg" value={campaignData.textStyle} onChange={e => setCampaignData(prev => ({ ...prev, textStyle: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Отчет из Facebook кабинета</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                </span>
                <p className="text-gray-600 mb-2">Загрузите отчет из Facebook Ads Manager для анализа</p>
                <p className="text-sm text-gray-500 mb-4">Поддерживаются форматы: .csv, .xlsx, .xls</p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={e => setCampaignData(prev => ({ ...prev, fbReport: e.target.files?.[0] || null }))}
                  className="hidden"
                  id="fb-report-upload"
                />
                <label
                  htmlFor="fb-report-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Выбрать файл
                </label>
                {campaignData.fbReport && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-green-700 font-medium">{campaignData.fbReport.name}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Файл загружен и готов к анализу</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Назад</button>
            <button onClick={() => setStep(3)} disabled={!campaignData.adNetwork || !campaignData.adGoal || !campaignData.adFormat || !campaignData.adStyle || !campaignData.textStyle} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Далее</button>
          </div>
        </div>
      )}

      {/* Step 3: Creative Type */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Введите тип креатива</h2>
          <div className="flex gap-8 justify-center mt-8">
            <button onClick={() => setCampaignData(prev => ({ ...prev, creativeType: 'static' }))} className={`w-40 h-40 rounded-xl border-2 flex flex-col items-center justify-center text-lg font-semibold ${campaignData.creativeType === 'static' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>статика</button>
            <button onClick={() => setCampaignData(prev => ({ ...prev, creativeType: 'video' }))} className={`w-40 h-40 rounded-xl border-2 flex flex-col items-center justify-center text-lg font-semibold ${campaignData.creativeType === 'video' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>видео</button>
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Назад</button>
            <button onClick={() => setStep(4)} disabled={!campaignData.creativeType} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Далее</button>
          </div>
        </div>
      )}

      {/* Step 4: Persona Upload */}
      {step === 4 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Загрузить своего персонажа?</h2>
          <div className="flex gap-8 justify-center mt-8">
            <button onClick={() => setCampaignData(prev => ({ ...prev, personaUpload: false }))} className={`w-40 h-40 rounded-xl border-2 flex flex-col items-center justify-center text-lg font-semibold ${campaignData.personaUpload === false ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>Нет</button>
            <button onClick={() => setCampaignData(prev => ({ ...prev, personaUpload: true }))} className={`w-40 h-40 rounded-xl border-2 flex flex-col items-center justify-center text-lg font-semibold ${campaignData.personaUpload === true ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>Да</button>
          </div>
          {campaignData.personaUpload === true && (
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Загрузить материалы</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                </span>
                <p className="text-gray-600 mb-2">Загрузите файл с вашим персонажем</p>
                <input type="file" onChange={e => setCampaignData(prev => ({ ...prev, personaFile: e.target.files?.[0] || null }))} className="hidden" id="persona-upload" />
                <label htmlFor="persona-upload" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Выбрать файл
                </label>
                {campaignData.personaFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-green-700 font-medium">{campaignData.personaFile.name}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Файл загружен и готов к анализу</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {campaignData.personaUpload === false && (
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Выберите шаблоны креативов</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentTemplates.map(template => (
                  <CreativeTemplate
                    key={template.id}
                    id={template.id}
                    title={template.title}
                    preview={template.preview}
                    isSelected={campaignData.selectedTemplates.includes(template.id)}
                    onSelect={handleTemplateSelect}
                    imageUrl={template.imageUrl}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(3)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Назад</button>
            <button
              onClick={async () => {
                setIsGenerating(true);
                setGenerationProgress(0);
                await generateCampaign();
                setIsGenerating(false);
                setStep(5);
              }}
              disabled={campaignData.personaUpload === null || (campaignData.personaUpload && !campaignData.personaFile)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Далее
            </button>
          </div>
        </div>
      )}

      {/* Generation Progress (between 4 and 5) */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Создание кампании</h3>
              <p className="text-sm text-gray-600">ИИ анализирует данные и создает персональную кампанию</p>
            </div>
            <ProgressBar progress={generationProgress} />
            <p className="text-center text-sm text-gray-500">{generationProgress}% завершено</p>
          </div>
        </div>
      )}

      {/* Step 5: Final Result (Text, Creatives, Download, Restart) */}
      {step === 5 && generatedCampaign && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Информация для запуска кампании</h2>
              <button onClick={downloadAssets} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Скачать PDF</span>
              </button>
            </div>
            <div className="space-y-8">
              {/* Ad Copy */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Рекламные тексты</h3>
                <div className="space-y-3">
                  {generatedCampaign.adCopy.map((copy, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-800">• {copy}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Audience Segments */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Аудиторские сегменты</h3>
                <div className="space-y-4">
                  {generatedCampaign.audienceSegments.map((segment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{segment.title}:</h4>
                      <div className="space-y-1">
                        {segment.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-gray-700">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Budget Recommendations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Рекомендации по бюджету</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">— Первый тест:</p>
                  <div className="space-y-1">
                    {generatedCampaign.budgetRecommendation.map((rec, index) => (
                      <p key={index} className="text-sm text-gray-700">{rec}</p>
                    ))}
                  </div>
                </div>
              </div>
              {/* Campaign Structure */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Структура кампании</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">Ты строишь по цели: Лиды / Трафик / Сообщения / Конверсии (если есть лендинг)</p>
                  <p className="font-semibold text-gray-900 mb-2">На старте лучше:</p>
                  <div className="space-y-1">
                    {generatedCampaign.campaignStructure.slice(0, 3).map((structure, index) => (
                      <p key={index} className="text-sm text-gray-700">{structure}</p>
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900 mt-3 mb-2">— Рекомендация: начни с 2–3 отдельных кампаний:</p>
                  <div className="space-y-1">
                    {generatedCampaign.campaignStructure.slice(3).map((structure, index) => (
                      <p key={index} className="text-sm text-gray-700">{structure}</p>
                    ))}
                  </div>
                </div>
              </div>
              {/* Tips */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">5. Советы</h3>
                <div className="space-y-2">
                  {generatedCampaign.tips.map((tip, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">- {tip}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Creative Examples (step 5, always show images from public) */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">6. Как собранные креативы выглядят в линию по статике</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/статика1.png" alt="Креатив 1" className="w-full h-full object-contain rounded" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/статика2.png" alt="Креатив 2" className="w-full h-full object-contain rounded" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/статика3.png" alt="Креатив 3" className="w-full h-full object-contain rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setCampaignData({
                    companyName: '',
                    niche: '',
                    audience: '',
                    offer: '',
                    adNetwork: '',
                    adGoal: '',
                    adFormat: '',
                    adStyle: '',
                    textStyle: '',
                    fbReport: null,
                    creativeType: null,
                    files: [],
                    personaUpload: null,
                    personaFile: null,
                    selectedTemplates: []
                  });
                  setGeneratedCampaign(null);
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Начать заново
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generation Progress */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Создание кампании</h3>
              <p className="text-sm text-gray-600">ИИ анализирует данные и создает персональную кампанию</p>
            </div>
            <ProgressBar progress={generationProgress} />
            <p className="text-center text-sm text-gray-500">{generationProgress}% завершено</p>
          </div>
        </div>
      )}
    </div>
  );
}