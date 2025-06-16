import React, { useState } from 'react';
import { Upload, FileText, Users, Zap, Download, CheckCircle, AlertTriangle, Image, Video, Grid3X3, BarChart3 } from 'lucide-react';

interface CampaignData {
  offer: string;
  audience: string;
  files: File[];
  fbReport: File | null;
  creativeFormat: 'image' | 'video' | null;
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
    offer: '',
    audience: '',
    files: [],
    fbReport: null,
    creativeFormat: null,
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
      imageUrl: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.jpeg?auto=compress&cs=tinysrgb&w=400' 
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

  const currentTemplates = campaignData.creativeFormat === 'image' ? staticTemplates : videoTemplates;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= num ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {num}
            </div>
            {num < 4 && <div className={`w-16 h-1 mx-2 ${step > num ? 'bg-purple-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Введите информацию про компанию, оффер и аудиторию</h2>
          <p className="text-gray-600 mb-6">Расскажите о вашем продукте и целевой аудитории</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название компании
              </label>
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Введите название вашей компании..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваше предложение (оффер)
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Опишите ваш продукт/услугу и что вы предлагаете..."
                value={campaignData.offer}
                onChange={(e) => setCampaignData(prev => ({ ...prev, offer: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Целевая аудитория
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Опишите вашу целевую аудиторию, демографию, интересы..."
                value={campaignData.audience}
                onChange={(e) => setCampaignData(prev => ({ ...prev, audience: e.target.value }))}
              />
            </div>

            {/* Facebook Report Upload Block */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Отчет из Facebook кабинета
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Загрузите отчет из Facebook Ads Manager для анализа
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Поддерживаются форматы: .csv, .xlsx, .xls
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFbReportUpload}
                  className="hidden"
                  id="fb-report-upload"
                />
                <label
                  htmlFor="fb-report-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Выбрать файл отчета
                </label>
                {campaignData.fbReport && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">
                        {campaignData.fbReport.name}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Файл загружен и готов к анализу
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Важно:</strong> Отчет из Facebook кабинета необходим для создания точной аналитики и рекомендаций по оптимизации кампаний
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Совет:</strong> Чем подробнее вы опишете ваш оффер и аудиторию, тем точнее будет сгенерированная кампания
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!campaignData.offer || !campaignData.audience}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Далее: Выбор формата
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Creative Format Selection */}
      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Выберите подходящий формат</h2>
          <p className="text-gray-600 mb-6">Какой тип креативов лучше всего подходит для вашего продукта?</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                campaignData.creativeFormat === 'image' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCampaignData(prev => ({ ...prev, creativeFormat: 'image' }))}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                <Image className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Статика</h3>
              <p className="text-sm text-gray-600 text-center">Изображения, инфографика, карусели</p>
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-500">Загрузить свои креативы</span>
              </div>
            </div>

            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                campaignData.creativeFormat === 'video' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCampaignData(prev => ({ ...prev, creativeFormat: 'video' }))}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-lg mb-4 mx-auto">
                <Video className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Видео</h3>
              <p className="text-sm text-gray-600 text-center">Демо продукта, отзывы, анимация</p>
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-500">Загрузить свои креативы</span>
              </div>
            </div>
          </div>

          {campaignData.creativeFormat && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Загрузите ваши {campaignData.creativeFormat === 'image' ? 'изображения' : 'видео'}
              </p>
              <input
                type="file"
                multiple
                accept={campaignData.creativeFormat === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
              >
                Выбрать файлы
              </label>
              {campaignData.files.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Загружено файлов: {campaignData.files.length}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Назад
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!campaignData.creativeFormat}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Далее: Выбор шаблонов
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Template Selection */}
      {step === 3 && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Выберите подходящий шаблон</h2>
          <p className="text-gray-600 mb-6">Выберите один или несколько шаблонов для вашей кампании</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {currentTemplates.map((template) => (
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

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Выбрано шаблонов:</strong> {campaignData.selectedTemplates.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Рекомендуется выбрать 2-3 шаблона для A/B тестирования
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Подтвердите</h3>
            <p className="text-sm text-yellow-700">
              Выбранный шаблон и все введенная информация будут использованы для генерации кампании
            </p>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Назад
            </button>
            <button
              onClick={generateCampaign}
              disabled={campaignData.selectedTemplates.length === 0 || isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Создание кампании...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Собрать кампанию</span>
                </>
              )}
            </button>
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

      {/* Step 4: Generated Campaign Results */}
      {step === 4 && generatedCampaign && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Получаете PDF с информацией для запуска</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Скачать PDF</span>
              </button>
            </div>

            {/* Moderation Check */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">✅ Модерацию Фейсбука соответствует</span>
              </div>
            </div>

            {/* Campaign Content */}
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

              {/* Creative Examples */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">6. Как собранные креативы выглядят в линию по статике</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/assets/статика1.png" alt="Креатив 1" className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/assets/статика2.png" alt="Креатив 2" className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                    <img src="/assets/статика3.png" alt="Креатив 3" className="w-full h-full object-cover rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setCampaignData({
                    offer: '',
                    audience: '',
                    files: [],
                    fbReport: null,
                    creativeFormat: null,
                    selectedTemplates: []
                  });
                  setGeneratedCampaign(null);
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Создать новую кампанию
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}