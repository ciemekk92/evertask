package com.predu.evertask.util;

import java.nio.charset.StandardCharsets;
import java.util.Random;

public class RandomToken {

    private RandomToken() {}

    private static final Random random = new Random();

    public static String generateRandomToken(int size) {
        byte[] arr = new byte[256];
        random.nextBytes(arr);

        String randomToken = new String(arr, StandardCharsets.UTF_8);
        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < randomToken.length(); i++) {
            char ch = randomToken.charAt(i);

            if (((ch >= 'a' && ch <= 'z')
                    || (ch >= 'A' && ch <= 'Z')
                    || (ch >= '0' && ch <= '9'))
                    && (size > 0)) {

                builder.append(ch);
                size--;
            }
        }

        return builder.toString();
    }
}
