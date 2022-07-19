package com.predu.evertask.util;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

/**
 * HTML sanitizer class
 */
public class HtmlSanitizer {

    private static final String CLASS_ATTRIBUTE = "class";
    private static final Safelist safelist = new Safelist(Safelist.basicWithImages())
            .addAttributes("a", CLASS_ATTRIBUTE)
            .addAttributes("b", CLASS_ATTRIBUTE)
            .addAttributes("blockquote", CLASS_ATTRIBUTE)
            .addAttributes("cite", CLASS_ATTRIBUTE)
            .addAttributes("code", CLASS_ATTRIBUTE)
            .addAttributes("dd", CLASS_ATTRIBUTE)
            .addAttributes("dl", CLASS_ATTRIBUTE)
            .addAttributes("dt", CLASS_ATTRIBUTE)
            .addAttributes("em", CLASS_ATTRIBUTE)
            .addAttributes("i", CLASS_ATTRIBUTE)
            .addAttributes("img", CLASS_ATTRIBUTE)
            .addAttributes("li", CLASS_ATTRIBUTE)
            .addAttributes("ol", CLASS_ATTRIBUTE)
            .addAttributes("p", CLASS_ATTRIBUTE)
            .addAttributes("pre", CLASS_ATTRIBUTE)
            .addAttributes("q", CLASS_ATTRIBUTE)
            .addAttributes("small", CLASS_ATTRIBUTE)
            .addAttributes("span", CLASS_ATTRIBUTE)
            .addAttributes("strike", CLASS_ATTRIBUTE)
            .addAttributes("strong", CLASS_ATTRIBUTE)
            .addAttributes("sub", CLASS_ATTRIBUTE)
            .addAttributes("sup", CLASS_ATTRIBUTE)
            .addAttributes("u", CLASS_ATTRIBUTE)
            .addAttributes("ul", CLASS_ATTRIBUTE);

    /**
     * <p>Method allowing to sanitize HTML input from malicious code, to prevent XSS attacks.</p>
     * <strong>Allowed tags:</strong> a, b, blockquote, br, cite, code, dd, dl, dt, em, i, img,
     * li, ol, p, pre, q, small, span, strike, strong, sub, sup, u, ul
     *
     * @param input HTML input string
     * @return HTML output string with unnecessary tags removed.
     */
    public static String sanitize(String input) {
        return Jsoup.clean(input, HtmlSanitizer.safelist);
    }
}
