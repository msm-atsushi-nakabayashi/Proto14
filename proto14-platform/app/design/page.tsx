'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { caseStudies, partners, pastSuppliers } from '@/lib/data/mockData';
import { ArrowLeft, Brain, History, Users, Award, ChevronRight, Star, Building, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DesignPage() {
  const { t, getTranslation } = useLanguage();
  const [currentView, setCurrentView] = useState<'menu' | 'cases' | 'partners' | 'past'>('menu');

  const menuItems = [
    { id: 'ai', icon: Brain, label: 'menu_ai', view: 'menu' },
    { id: 'case', icon: Award, label: 'menu_case_study', view: 'cases' },
    { id: 'partner', icon: Users, label: 'menu_partner_list', view: 'partners' },
    { id: 'past', icon: History, label: 'menu_past_suppliers', view: 'past' },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Link>
      </div>

      {currentView === 'menu' ? (
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold mb-2">{t('initial_title')}</h1>
          <p className="text-gray-600 mb-8">{t('initial_subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.view as 'menu' | 'cases' | 'partners' | 'past')}
                  className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <span className="ml-4 text-lg font-medium text-gray-700">
                      {t(item.label as keyof typeof t)}
                    </span>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      ) : currentView === 'cases' ? (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView('menu')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold">{t('menu_case_study')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={study.img}
                  alt={getTranslation(study.title)}
                  className="w-full h-48 object-cover bg-gray-200"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {getTranslation(study.title)}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>用途: {getTranslation(study.details.application)}</p>
                    <p>サービス: {getTranslation(study.details.service)}</p>
                    <p>材料: {getTranslation(study.details.material)}</p>
                    <p>納期: {getTranslation(study.details.lead_time)}</p>
                    <p>サイズ: {study.details.size}</p>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    詳細を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : currentView === 'partners' ? (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView('menu')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold">{t('menu_partner_list')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="ml-4 font-semibold text-gray-800">
                    {getTranslation(partner.name)}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {getTranslation(partner.description)}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  見積依頼
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView('menu')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold">{t('menu_past_suppliers')}</h2>
          </div>

          <div className="space-y-6">
            {pastSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 mr-4">
                        {getTranslation(supplier.name)}
                      </h3>
                      <div className="flex items-center">
                        {renderStars(supplier.satisfaction)}
                        <span className="ml-2 text-sm text-gray-600">
                          {supplier.satisfaction}.0
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {getTranslation(supplier.description)}
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                      <p className="text-sm text-gray-700 italic">
                        &quot;{getTranslation(supplier.comment)}&quot;
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - {getTranslation(supplier.author)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">見積回数</p>
                        <p className="font-semibold">{supplier.stats.quote}回</p>
                      </div>
                      <div>
                        <p className="text-gray-500">発注回数</p>
                        <p className="font-semibold">{supplier.stats.order}回</p>
                      </div>
                      <div>
                        <p className="text-gray-500">納期遅延率</p>
                        <p className="font-semibold">{supplier.stats.late}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">クレーム率</p>
                        <p className="font-semibold">{supplier.stats.claim}</p>
                      </div>
                    </div>
                  </div>
                  <button className="ml-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    見積依頼
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}