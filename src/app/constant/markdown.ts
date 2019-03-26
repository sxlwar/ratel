import { EmojiService } from '../providers/emoji.service';
import { MarkedOptions } from 'marked';
import { MarkedRenderer } from 'ngx-markdown';

/**
 * @description Generate renderer function for markdown configuration;
 */
const generateEmojiRender = (wrap: string, emojiService: EmojiService, flexLayout = false) => (content: string) => {
    const regexp = /:\w+:/;

    if (regexp.test(content)) {
        let result: any[];
        let str = content;
        const reg = /:\w+:/g;

        while ((result = reg.exec(content)) !== null) {
            str = str.replace(regexp, `<span style="${emojiService.getStyle(result[0])}"></span>`);
        }

        return `<${wrap} style="${flexLayout ? 'display: flex; align-items: center;' : ''}">${str}</${wrap}>`;
    } else {
        return `<${wrap}>${content}</${wrap}>`;
    }
};

/**
 * @description For ngx-markdown;
 */
export function markedOptionsFactory(emojiService: EmojiService): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.blockquote = (text: string) => {
        return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
    };

    renderer.paragraph = generateEmojiRender('p', emojiService, true);

    renderer.tablecell = generateEmojiRender('td', emojiService);

    return {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
    };
}
