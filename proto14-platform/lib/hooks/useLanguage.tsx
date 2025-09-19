'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '../data/translations';
import { Translation } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['ja']) => string;
  getTranslation: (translation: Translation) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: keyof typeof translations['ja']) => {
    return translations[language][key] || key;
  };

  const getTranslation = (translation: Translation) => {
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}