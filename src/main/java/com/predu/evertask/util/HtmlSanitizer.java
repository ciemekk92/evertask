package com.predu.evertask.util;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

/**
 * HTML sanitizer class
 */
public class HtmlSanitizer {

    private HtmlSanitizer() {
    }

    private static final String STYLE_ATTRIBUTE = "style";
    private static final Safelist safelist = new Safelist(Safelist.basicWithImages())
            .addTags("div")
            .addAttributes("a", STYLE_ATTRIBUTE)
            .addAttributes("b", STYLE_ATTRIBUTE)
            .addAttributes("blockquote", STYLE_ATTRIBUTE)
            .addAttributes("cite", STYLE_ATTRIBUTE)
            .addAttributes("code", STYLE_ATTRIBUTE)
            .addAttributes("dd", STYLE_ATTRIBUTE)
            .addAttributes("del", STYLE_ATTRIBUTE)
            .addAttributes("div", STYLE_ATTRIBUTE)
            .addAttributes("dl", STYLE_ATTRIBUTE)
            .addAttributes("dt", STYLE_ATTRIBUTE)
            .addAttributes("em", STYLE_ATTRIBUTE)
            .addAttributes("i", STYLE_ATTRIBUTE)
            .addAttributes("img", STYLE_ATTRIBUTE)
            .addAttributes("ins", STYLE_ATTRIBUTE)
            .addAttributes("li", STYLE_ATTRIBUTE)
            .addAttributes("ol", STYLE_ATTRIBUTE)
            .addAttributes("p", STYLE_ATTRIBUTE)
            .addAttributes("pre", STYLE_ATTRIBUTE)
            .addAttributes("q", STYLE_ATTRIBUTE)
            .addAttributes("small", STYLE_ATTRIBUTE)
            .addAttributes("span", STYLE_ATTRIBUTE)
            .addAttributes("strong", STYLE_ATTRIBUTE)
            .addAttributes("sub", STYLE_ATTRIBUTE)
            .addAttributes("sup", STYLE_ATTRIBUTE)
            .addAttributes("u", STYLE_ATTRIBUTE)
            .addAttributes("ul", STYLE_ATTRIBUTE)
            .addProtocols("img", "src", "http", "https", "data");

    /**
     * <p>Method allowing to sanitize HTML input from malicious code, to prevent XSS attacks.</p>
     * <strong>Allowed tags:</strong> a, b, blockquote, br, cite, code, dd, div, dl, dt, em, i, img,
     * li, ol, p, pre, q, small, span, strike, strong, sub, sup, u, ul
     *
     * @param input HTML input string
     * @return HTML output string with unnecessary tags removed.
     */
    public static String sanitize(String input) {
        return Jsoup.clean(input, HtmlSanitizer.safelist);
    }
}
