import axios, {Axios} from 'axios'

export class TranslateService {
    private static instance: TranslateService;
    private axios: Axios;

    static getInstance() {
        return this.instance || (this.instance = new this());
    }

    async voiceTranslate(transcriptValue: string) {
        const response = await this.axios.get('/translate/voice', {params: {text: transcriptValue}});
        return response.data;
    }
}