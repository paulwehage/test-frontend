import React, { useEffect, useCallback, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as S from "./styles";

function LanguageSwitcher() {
  const [language, setLanguage] = useState('en');
  const { i18n } = useTranslation();
  
  const handleChange = useCallback(
    (op: string) => {
       i18n.changeLanguage(op) 
    },
    [i18n]
  );

  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  const getBrowserLanguage = useCallback(() => {
    const clientLanguage = window.navigator.language;
    switch (clientLanguage) {
      case 'en-US' || 'en':
        setLanguage('en');
        break;
      case 'de':
        setLanguage('de');
        break;
      default:
        setLanguage('en');
    }
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      getBrowserLanguage();
    }
  }, [getBrowserLanguage]);

  useEffect(() => {
    handleChange(language);
    localStorage.setItem('language', language);
  }, [handleChange, language]);
  const { t } = useTranslation();

  return (
    <S.LanguageSwitcher>
      <Select value={language} onChange={handleLanguage} >
        
          <MenuItem value="en">
            <S.LanguageOption >
              <img src="/assets/language/en.png" alt="English" />
              <span>{t('home.language.english')}</span>
            </S.LanguageOption>
          </MenuItem>
          <MenuItem value="de">
            <S.LanguageOption >
              <img src="/assets/language/de.png" alt="German" />
              <span>{t('home.language.german')}</span>
            </S.LanguageOption>
          </MenuItem>
        
        
      </Select>
    </S.LanguageSwitcher>
  );
}

export default LanguageSwitcher;
