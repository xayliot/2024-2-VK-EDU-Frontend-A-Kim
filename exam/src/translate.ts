import axios from 'axios';

interface TranslationResponse {
    translatedText: string;
    detectedSourceLanguage: string;
}

class Translator {
    private apiKey: string;
    private apiUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.apiUrl = '';
    }

    public async translate(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResponse> {
        try {
            const langpair = sourceLanguage 
                ? `${sourceLanguage}|${targetLanguage}` 
                : `Autodetect|${targetLanguage}`;
    
            const response = await axios.post(this.apiUrl, {
                q: text,
                langpair: langpair,
                key: this.apiKey,
            });
    
            const data = response.data.data.translations[0];
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