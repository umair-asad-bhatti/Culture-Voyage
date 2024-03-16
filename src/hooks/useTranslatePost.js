import { franc } from 'franc';
import { useState } from 'react'
import Translate from 'translate';
// dont use this hook. This need to be updated first
function useTranslatePost(postDetail) {
    const [translatedtext, setTranslatedText] = useState('');
    const [detectedLanguageCode, setDetectedLanguageCode] = useState(franc(postDetail.Description))
    const translatePost = async (text, detectedLanguageCode) => {
        console.log(detectedLanguageCode);
        if (detectedLanguageCode !== "eng") {
            try {
                const translateText = await Translate(text, {
                    from: detectedLanguageCode,
                    to: "eng",
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