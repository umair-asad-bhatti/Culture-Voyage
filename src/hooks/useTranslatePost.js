import { franc } from 'franc';
import { useState } from 'react'
import translate from 'translate';
// dont use this hook. This need to be updated first
function useTranslatePost(postDetail) {
    const [translatedtext, setTranslatedText] = useState('');
    const [detectedLanguageCode, setDetectedLanguageCode] = useState()

  
    const translatePost = async (text, detectedLanguageCode) => {
        console.log(detectedLanguageCode);
        if (detectedLanguageCode !== "eng") {
            try {
                const translateText = await translate(text, {
                    from: detectedLanguageCode,
                    to: "en",
                  });
                  setTranslatedText(translateText)
                console.log("Translated text:", translateText);
            } catch (error) {
                console.error("Translation failed:", error);
            }
        } else {
            console.log("Text is already in English:", text);
        }
    };
    return { translatePost, translatedtext, detectedLanguageCode, setDetectedLanguageCode }
}
export { useTranslatePost }