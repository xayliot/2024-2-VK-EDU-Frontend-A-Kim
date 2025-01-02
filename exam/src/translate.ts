import axios from 'axios';

interface TranslationResponse {
    translatedText: string;
    detectedSourceLanguage: string;
}

class Translator {

    public async translate(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResponse> {
        try {
            const langpair = sourceLanguage 
                ? `${sourceLanguage}|${targetLanguage}` 
                : `Autodetect|${targetLanguage}`;
            
            const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
            const response = await axios.get(apiUrl);
            
            const data = response.data.responseData;
            return {
                translatedText: data.translatedText,
                detectedSourceLanguage: data.detectedSourceLanguage,
            };
        } catch (error) {
            console.error(error);
            throw new Error('Translation failed');
        }
    }
}

export default Translator;